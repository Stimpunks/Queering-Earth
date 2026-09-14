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
 *   - **The port is chosen, not assumed, and then OWNERSHIP IS PROVED.** This used to
 *     read "the port must be free before the spawn" and refuse outright if anything
 *     answered. That was right about the danger and wrong about the remedy: the three
 *     numbers this repo asks for are Star Stuff's as well, so the refusal fired on a
 *     neighbouring checkout doing nothing wrong, and a full sweep here could not run
 *     while one ran there. Now a busy port is stepped over — see the ladder below — and
 *     once the endpoint answers, the listening process is walked up its parent chain to
 *     our own child. A gate that attaches to a stranger's browser is the house's own
 *     recurring fault, and this proves it has not rather than hoping.
 *   - **The process we spawned must still be alive when the endpoint answers.** The old
 *     poll swallowed every fetch failure and fell out of its loop silently, so a Chrome
 *     that died on launch produced a sweep of nothing rather than an error.
 *
 * It also removes the temp profile on the way out, which no copy did.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import net from 'node:net';

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
/* ── choosing a port ───────────────────────────────────────────────────────────
 *
 * THE THREE PORTS THIS REPO ASKS FOR ARE STAR STUFF'S TOO, AND THAT IS WHY THE
 * ORIGINAL DISASTER HAPPENED AT ALL. The gates were ported from there and the port
 * numbers came with them, comments and all: 9412 is check-contrast in both repos,
 * 9413 is overlap here and check-sheets there, 9414 is width here and both
 * check-forced-colors and check-overlap there. Two checkouts on one laptop cannot
 * run their rendering gates at the same time, and the symptom reads as a broken gate
 * rather than as a busy port. Measured 2026-09-14, when a live Star Stuff run held
 * 9414 and a full sweep here refused.
 *
 * STAR STUFF IS NOT EDITED FROM THIS REPO, so the fix is entirely on our side: the
 * number a gate passes in is now a PREFERENCE, not a requirement. If it is taken we
 * step to the next one in this gate's own ladder and say so.
 *
 * THE LADDER IS +100 A STEP, SO THE THREE GATES NEVER CHASE EACH OTHER. Scanning
 * 9412 → 9413 would walk contrast straight onto overlap's port and cascade the whole
 * row by one; 9412 → 9512 → 9612 keeps each gate in its own column, and the port a
 * run lands on still says which gate it belongs to.
 *
 * THE PRECEDENT IS ALREADY HERE. `.claude/launch.json` stopped hardcoding 8766 for
 * exactly this reason — a second session could not preview the site at all while the
 * first held it — and the dev server takes its port from the environment. This is the
 * same decision for the gates.
 *
 * AND THE GUARANTEE GETS STRONGER RATHER THAN WEAKER. The old rule was "refuse if
 * anything answers", which prevented attaching to a stranger's browser by refusing to
 * run. Moving to a free port prevents it by never being on a port anybody else holds —
 * and `ownsPort()` below then PROVES the listener is our own child before a single
 * page is measured, which the refusal never did. */

/* Can we actually bind it? `portHolder` only answers for something speaking CDP, and
   a port held by anything else — a dev server, another language's debugger — would
   pass that test and then defeat the spawn with a confusing error. */
function bindable(port) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.once('error', () => resolve(false));
    s.once('listening', () => s.close(() => resolve(true)));
    s.listen(port, '127.0.0.1');
  });
}

/* Who holds it, and is it a live run or something left behind? THIS IS THE
   DISTINCTION A HUMAN GETS WRONG UNDER PRESSURE — the difference between a headless
   Chrome whose parent is still running (somebody else's sweep, in progress, leave it
   alone) and one whose parent is gone (an orphan, safe to kill). Best effort: if the
   tools are not there we simply say less rather than guessing. */
function describeHolder(port) {
  try {
    const pid = execFileSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split('\n')[0];
    if (!pid) return null;
    const ppid = execFileSync('ps', ['-o', 'ppid=', '-p', pid],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    let parentAlive = false;
    try {
      execFileSync('ps', ['-o', 'pid=', '-p', ppid], { stdio: 'ignore' });
      parentAlive = Number(ppid) > 1;
    } catch { parentAlive = false; }
    return { pid, parentAlive };
  } catch {
    return null;
  }
}

/* Is the thing listening on this port our own child, or a descendant of it? Chrome's
   --headless=new spawns a helper that holds the socket, so the listening pid is
   routinely not the pid we spawned — walking up the parent chain is what makes this
   an ownership proof rather than a guess. */
function ownsPort(port, ourPid) {
  try {
    const listener = execFileSync('lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().split('\n')[0];
    if (!listener) return null;
    for (let pid = Number(listener), hops = 0; pid > 1 && hops < 12; hops++) {
      if (pid === ourPid) return true;
      const ppid = execFileSync('ps', ['-o', 'ppid=', '-p', String(pid)],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (!ppid) return false;
      pid = Number(ppid);
    }
    return false;
  } catch {
    return null;   /* tools missing: unknown, not "no" */
  }
}

export async function launchChrome(PREFERRED, label) {
  /* THE NUMBER IS A PREFERENCE. Ten rungs is far more than anybody needs and it is
     bounded so a laptop with something odd going on fails loudly instead of hanging. */
  let PORT = null;
  for (let k = 0; k < 10; k++) {
    const candidate = PREFERRED + k * 100;
    if (!(await bindable(candidate))) {
      if (k === 0) {
        const held = await portHolder(candidate);
        const who = describeHolder(candidate);
        console.error(
          `\n${label}: 127.0.0.1:${candidate} is busy` +
          (held ? `, answering CDP as ${held}` : '') + '.'
        );
        if (who) {
          console.error(
            who.parentAlive
              ? `  pid ${who.pid}, and its parent is still running — this looks like a LIVE run\n` +
                '  in another checkout. Leave it alone; this gate is moving to its own port.'
              : `  pid ${who.pid}, and its parent is gone — this looks like an ORPHAN.\n` +
                `  Safe to kill if it is headless with a profile under /tmp:  kill ${who.pid}`
          );
        }
        console.error(`  Find it:  lsof -nP -iTCP:${candidate} -sTCP:LISTEN`);
      }
      continue;
    }
    PORT = candidate;
    if (k > 0) console.error(`  ${label} is using ${PORT} instead.\n`);
    break;
  }
  if (PORT === null) {
    console.error(
      `\nREFUSING TO RUN — ${label} could not find a free debugging port in ten tries,\n` +
      `  from ${PREFERRED} upward in steps of 100. Nothing was measured, which is the\n` +
      '  point: a gate that cannot own its browser must not measure in somebody else\'s.'
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
    if (await portHolder(PORT)) {
      /* THE PORT WAS FREE A MOMENT AGO, WHICH IS NOT THE SAME AS THE ANSWER BEING
         OURS. Between the bind test and the spawn there is a gap, and the whole
         history of this file is a gate measuring in a browser it did not launch. So
         the listener is walked up its parent chain to our own child before anything
         is measured. `null` means lsof or ps was not there to ask — unknown, which
         is reported and allowed, because refusing on a missing tool would make the
         gates unrunnable somewhere rather than safer. */
      const ours = ownsPort(PORT, chrome.pid);
      if (ours === false) {
        await dispose();
        console.error(
          `\nREFUSING TO RUN — ${label} found something other than its own browser on\n` +
          `  127.0.0.1:${PORT} after launching. Nothing was measured. This is the exact\n` +
          '  shape of the five-day orphan: a sweep in a stranger\'s browser reports PASS.'
        );
        process.exit(1);
      }
      if (ours === null) {
        console.error(`  ${label}: could not confirm the browser on ${PORT} is ours (lsof/ps unavailable).`);
      }
      return { chrome, dispose, port: PORT };
    }
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
