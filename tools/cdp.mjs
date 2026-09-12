/**
 * cdp.mjs — the headless-Chrome plumbing the two rendering gates share.
 *
 * SHARED FOR ONE REASON, and it is `evaluated()`. A `Runtime.evaluate` result is
 * double-wrapped — the CDP result carrying the JS result — so the value sits at
 * `.result.result.value`, and reading `.result.value` yields undefined, which
 * `JSON.parse` turns into a crash a long way from its cause. Worse, an in-page
 * exception comes back as `exceptionDetails` with no value at all, and swallowing
 * that reports a flawless zero-failure sweep of a page nothing measured. That trap
 * is documented below and it belongs in one file, not one per gate.
 *
 * `settle()` is here for the same kind of reason: it waits on a CONDITION and not on
 * a clock, because a sibling script already lost that race on LOCAL FILES — one build
 * emitted 629 records where the builds either side gave 637, exit code 0, no warning.
 *
 * `withPage` takes its debugging port as an argument rather than closing over one,
 * because the two gates deliberately run on different ports so they can run at once.
 *
 * THE SPAWN IS HERE NOW, AND THIS HEADER USED TO ARGUE THE OPPOSITE. It said each
 * gate should keep its own `spawn` because the duplication "carries no footgun."
 * **That clause was false, and it was false in production.** Each copy spawned
 * Chrome, then polled `/json/version` until SOMETHING answered — and on 7 September
 * an orphaned headless Chrome from a neighbouring project's probe script took port
 * 9414 and never let go. Every `check-width.mjs` run from that day to 12 September
 * bound nothing, attached to that five-day-old browser, measured 27 pages in Chrome
 * 152.0.7977.77 while .84 was installed, killed its own portless process on the way
 * out, and **reported PASS with no sign whatsoever.** Five such orphans were up, one
 * per interrupted probe, and 303 temp profiles with them.
 *
 * So `launchChrome()` is the one place that opens a browser here, and it refuses two
 * ways a sweep can be measured in something we did not start:
 *
 *   - **The port must be free BEFORE the spawn.** If anything answers there, the run
 *     stops and names what answered rather than driving it. A gate that attaches to a
 *     stranger's browser is the house's own recurring fault — a page that checks 8% of
 *     itself reports zero failures and looks exactly like a clean one.
 *   - **The process we spawned must still be alive when the endpoint answers.** The old
 *     poll swallowed every fetch failure and fell out of its loop silently, so a Chrome
 *     that died on launch produced a sweep of nothing rather than an error.
 *
 * It also removes the temp profile on the way out, which no copy did.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

export const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => fs.existsSync(p));

if (!CHROME) {
  console.error('No Chrome/Chromium found. Install Google Chrome, or edit the CHROME list.');
  process.exit(1);
}

/* ─── minimal CDP client ──────────────────────────────────────────────────────
   Same shape as build-search-index.mjs, with one difference worth keeping in mind:
   send() here resolves with the WHOLE message, not m.result. So a Runtime.evaluate
   value sits at .result.result.value — the CDP result wrapping the JS result. Read
   .result.value and you get undefined, which JSON.parse turns into a confusing
   crash a long way from the cause. checkedValue() below does the unwrapping in one
   place so nobody has to remember. */
export async function withPage(PORT, fileUrl, fn) {
  const t = await (
    await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(fileUrl)}`, { method: 'PUT' })
  ).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((res) => {
      const i = ++id;
      pending.set(i, res);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    }
  };
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });
  try {
    return await fn(send);
  } finally {
    try { ws.close(); } catch {}
    await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {});
  }
}

/* Unwrap Runtime.evaluate, and fail loudly. A JS exception inside the page comes
   back as exceptionDetails with no value at all; swallowing that would report a
   perfect zero-failure page for a page we never measured. */
export function evaluated(msg, what) {
  const r = msg && msg.result;
  if (!r || r.exceptionDetails) {
    throw new Error(
      `${what} threw in-page: ${JSON.stringify(r && r.exceptionDetails).slice(0, 600)}`
    );
  }
  if (!r.result || r.result.value === undefined) {
    throw new Error(`${what} returned no value: ${JSON.stringify(msg).slice(0, 600)}`);
  }
  return JSON.parse(r.result.value);
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Wait on a CONDITION, never on a clock.
 *
 * This was `await sleep(1300)` with the comment "let the client-rendered field
 * guides paint", which is a guess dressed as a wait. `build-search-index.mjs`,
 * two files away, already lost exactly this race **on local files**: one build
 * emitted 629 records where the builds either side gave 637 — eight records gone,
 * exit code 0, no warning. Whatever protects that script protects this one.
 *
 * Measured before changing it: three runs over the three heaviest client-rendered
 * field guides returned identical counts every time, so the sleep was not
 * currently losing. This is insurance against the day a page gets heavier, not a
 * fix for a live fault.
 *
 * Returns the settled text length, 0 for a genuinely empty document, or null if
 * it never settled. It does NOT throw: this tool sweeps 79 pages, and aborting at
 * page 30 to report one bad page would throw away the other 49 results.
 */
export async function settle(send) {
  let last = -1;
  for (let i = 0; i < 100; i++) {
    const p = evaluated(
      await send('Runtime.evaluate', {
        expression:
          'JSON.stringify({r:document.readyState,n:document.body?document.body.textContent.length:0})',
        returnByValue: true,
      }),
      'readiness probe'
    );
    if (p.r === 'complete' && p.n === last) return p.n;
    last = p.n;
    await sleep(150);
  }
  return null;
}

/**
 * Open a headless Chrome this process owns, on a port nothing else holds.
 *
 * Returns `{ chrome, dispose }`. Call `dispose()` in a `finally` — it kills the
 * browser AND removes the temp profile, which the three hand-rolled copies of this
 * never did: 303 of them were sitting in /tmp when this was written.
 *
 * `label` names the gate, for the profile directory and for the error text a reader
 * gets when the port is busy. The prefix is `qe-` for every gate here; the contrast
 * gate carried `ss-` from the day it was ported and that is why a cleanup sweep for
 * this project's leavings had to know a second project's prefix.
 */
export async function launchChrome(PORT, label) {
  const held = await portHolder(PORT);
  if (held) {
    console.error(
      `\nREFUSING TO RUN — something is already listening on 127.0.0.1:${PORT}, which is ` +
      `${label}'s debugging port.\n` +
      `  It answers as: ${held}\n` +
      `  This is not our browser. Attaching to it would measure these pages in a browser\n` +
      `  this run did not launch, at whatever version and state it happens to be in — and\n` +
      `  the sweep would report PASS regardless. That is exactly how this check was\n` +
      `  silently driving a five-day-old orphan until 12 September 2026.\n\n` +
      `  Find it:  lsof -nP -iTCP:${PORT} -sTCP:LISTEN\n` +
      `  Orphans from an interrupted probe are safe to kill; they are headless and their\n` +
      `  profiles live in /tmp.`
    );
    process.exit(1);
  }

  const profile = fs.mkdtempSync(path.join('/tmp', `qe-${label}-`));
  const chrome = spawn(
    CHROME,
    ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
     `--user-data-dir=${path.join(profile, 'profile')}`, 'about:blank'],
    { stdio: 'ignore' }
  );

  /* AWAITED, because `kill()` only SENDS a signal. The first version removed the
     profile on the next line and left 25 directories behind in one evening: Chrome was
     still flushing, and on macOS unlinking an open file succeeds while the process
     happily recreates it. Wait for the child to be gone, then remove — with a bounded
     wait, since a gate must not hang on a browser that will not die. */
  const dispose = async () => {
    try { chrome.kill(); } catch { /* already gone */ }
    if (chrome.exitCode === null && chrome.signalCode === null) {
      await Promise.race([
        new Promise((r) => chrome.once('exit', r)),
        sleep(3000).then(() => { try { chrome.kill('SIGKILL'); } catch { /* gone */ } }),
      ]);
    }
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* not ours to insist on */ }
  };

  for (let i = 0; i < 60; i++) {
    /* A dead child is the case the old poll could not see: it swallowed the fetch
       failure, ran out of tries, and returned as though Chrome were up. */
    if (chrome.exitCode !== null || chrome.signalCode !== null) {
      dispose();
      console.error(`\nFAIL — ${label}'s Chrome exited before it opened a debugging port. Nothing was measured.`);
      process.exit(1);
    }
    if (await portHolder(PORT)) return { chrome, dispose };
    await sleep(250);
  }
  await dispose();
  console.error(`\nFAIL — ${label}'s Chrome never opened port ${PORT} within 15s. Nothing was measured.`);
  process.exit(1);
}

/* The browser string if anything answers CDP on this port, else null. Short timeout:
   a free port refuses at once, and we are about to wait on a spawn anyway. */
async function portHolder(PORT) {
  try {
    const r = await fetch(`http://127.0.0.1:${PORT}/json/version`, { signal: AbortSignal.timeout(1000) });
    const v = await r.json();
    return v.Browser || 'an unidentified CDP endpoint';
  } catch {
    return null;
  }
}

export function resolveTargets(ROOT) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (!args.length) {
    return fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
  }
  return args.map((a) => {
    const rel = path.relative(ROOT, path.resolve(a));
    const inRoot = path.join(ROOT, path.basename(a));
    if (fs.existsSync(path.resolve(a))) return rel;
    if (fs.existsSync(inRoot)) return path.basename(a);
    console.error(`No such file: ${a}`);
    process.exit(1);
  });
}
