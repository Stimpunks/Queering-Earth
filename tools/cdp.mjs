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
 * WHAT IS NOT HERE: each gate launches its own Chrome and keeps its own `main()`.
 * That is a dozen lines of `spawn` boilerplate duplicated on purpose — it is
 * entangled with each gate's reporting, and moving it would risk a working
 * measurement to save repetition that carries no footgun.
 */
import fs from 'node:fs';
import path from 'node:path';

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
