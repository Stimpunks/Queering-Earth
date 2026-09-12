#!/usr/bin/env node
/**
 * check.mjs — regenerate, then run every gate, in the order and the shape that
 * makes a one-page edit cost a minute instead of twenty.
 *
 * ── WHY THIS EXISTS, MEASURED RATHER THAN FELT ──────────────────────────────────
 * Shipping the lilac coda — a move of one block inside one page — took over twenty
 * minutes of checking. Timed afterwards, on this machine, the whole apparatus is:
 *
 *     four generators          4.8s      six offline gates        5.6s
 *     check-overlap   (27pp)    40s      check-overlap   (4pp)    ~15s
 *     check-contrast  (27pp)    53s      check-contrast  (4pp)    ~20s
 *     check-width     (27pp)   4:22      check-width     (4pp)     48s
 *
 * **`check-width` is three quarters of the bill**, because it renders 27 pages × 10
 * typefaces × 4 widths × 2 papers. Nothing that is not Chrome costs ten seconds.
 *
 * Three things made twenty minutes out of six, and this file removes all three:
 *
 *   1. **The three Chrome gates were run one after another**, though they take
 *      separate debugging ports (9412/9413/9414) FOR THE EXPRESS PURPOSE of running
 *      at once — `cdp.mjs` has said so since it was written. In parallel the full
 *      sweep is 4:32, because the two cheap ones finish inside width's shadow.
 *   2. **All 27 pages were swept for a change to one.** All three already take
 *      positional file arguments through `resolveTargets`; nobody had to write
 *      anything for this, it just had to be passed.
 *   3. **`check-width` was run three times** — once in a loop whose pipe threw away
 *      the exit code, once again to read that exit code, once more after a second
 *      edit. Only the third was verification.
 *
 * ── THE SCOPE IS DERIVED FROM GIT, AFTER THE GENERATORS RUN ─────────────────────
 * That order is load-bearing and it is the whole reason this is a tool and not a
 * shell alias. `make-records` and `make-whats-new` write into pages a human did not
 * touch — this change moved `index.html` by hand and `what-is-settled.html` and
 * `search.html` by generation — so asking git FIRST would scope the sweep to the
 * edit and miss the pages the edit caused. Generate, then ask what moved.
 *
 * ── SCOPING IS A DECLARED LIST, NEVER AN INFERENCE ──────────────────────────────
 * Same shape as `check-cache.mjs`'s two lists and for the same reason: nothing in a
 * file's bytes says whether it can move a page it is not named in. A stylesheet edit
 * reaches all 27 pages; a paragraph moved inside one sheet reaches one. **Guessing
 * that from the diff is how a scoped run becomes this house's own recurring fault** —
 * the sweep that measures 8% of itself and looks exactly like a clean one. So the
 * couplings are written down with their reasons below, and anything not on a list is
 * page-local by declaration. **A new shared asset needs a line in one of them.**
 *
 * A full sweep is always available and always correct: `--all`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ── The generators, in the one order that works ──────────────────────────────
   The record pages are an input to the search index and the Markdown; the
   what's-new listing sits inside the landmark both of those read. Out of order, a
   stale record page reports as a stale `.md` — the symptom pointing at the wrong
   tool. `check-metadata.mjs` checks them in this order for the same reason. */
const GENERATORS = ['make-records.mjs', 'make-whats-new.mjs', 'make-search-index.mjs', 'make-markdown.mjs'];

/* ── The offline gates ────────────────────────────────────────────────────────
   Six seconds for all six, and every one of them asks a question about the site as
   a whole — is every page in the sitemap, does every twin have a redirect, is every
   derived file current. **Scoping these would save nothing and could only lose
   something**, so they always run over everything. */
const OFFLINE = [
  ['check-markup.mjs', ['--check']],
  ['check-sitemap.mjs', ['--check']],
  ['check-metadata.mjs', []],
  ['check-cache.mjs', []],
  ['check-addresses.mjs', []],
  ['check-card-order.mjs', ['--check']],
];

/* ── The rendering gates ──────────────────────────────────────────────────────
   Each on its own port, so all three run together. `check-width.mjs` has no
   `--check` flag by design: a gate whose default is to pass has not shipped. */
const RENDER = [
  ['check-contrast.mjs', ['--check']],
  ['check-overlap.mjs', ['--check']],
  ['check-width.mjs', []],
];

/* ── Coupling, declared ───────────────────────────────────────────────────────
   SITEWIDE: a change here can move any page, so the sweep cannot be narrowed. */
const SITEWIDE = [
  ['queering.css', 'the palette, the layout and the print sheet — every page is set by it'],
  ['queering.js', 'the rail, the contents list and the controls tray, built at runtime on every page'],
  ['tools/font-files.json', 'the picker\'s face list, which check-width sweeps one face at a time'],
  ['fonts/', 'a face\'s metrics move every line box on the site'],
  ['tools/reveal.mjs', 'it decides what the gates can see; a change here changes every measurement'],
  ['tools/cdp.mjs', 'the instrument itself'],
  ['tools/check-', 'a gate that changed must be re-run over everything it certifies'],
  ['tools/check.mjs', 'this runner'],
];

/* NARROWER than sitewide: an asset only some pages fetch. Its pages join the scope
   rather than forcing a full sweep. */
const SCOPED_ASSET = [
  ['queering-search.js', ['search.html'], 'loaded by /search alone'],
];

const args = process.argv.slice(2);
const ALL = args.includes('--all');
const named = args.filter((a) => !a.startsWith('--'));

const run = (cmd, cmdArgs) =>
  new Promise((resolve) => {
    const started = Date.now();
    const child = spawn('node', [path.join(ROOT, 'tools', cmd), ...cmdArgs], { cwd: ROOT });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    child.on('close', (code) => resolve({ cmd, code, out, secs: (Date.now() - started) / 1000 }));
  });

const say = (name, r) =>
  console.log(`  ${r.code === 0 ? 'ok  ' : 'FAIL'}  ${name.padEnd(24)} ${r.secs.toFixed(1)}s`);

/* Everything git knows has moved: staged, unstaged and untracked, plus the far side
   of a rename. Untracked matters — a NEW page is the case most in need of measuring
   and the one a `git diff` alone would miss entirely. */
function changedPaths() {
  const raw = execFileSync('git', ['status', '--porcelain=v1', '-z'], { cwd: ROOT, encoding: 'utf8' });
  const fields = raw.split('\0').filter(Boolean);
  const out = [];
  for (let i = 0; i < fields.length; i++) {
    const entry = fields[i];
    const status = entry.slice(0, 2);
    out.push(entry.slice(3));
    /* A rename in -z form is two records: the new path on this line, the old path in
       the very next field with no status of its own. */
    if (status.includes('R')) { i += 1; if (fields[i]) out.push(fields[i]); }
  }
  return out;
}

async function main() {
  const t0 = Date.now();
  let failed = 0;

  console.log('\nGenerating — records, arrivals, search index, Markdown.');
  for (const g of GENERATORS) {
    const r = await run(g, []);
    if (r.code !== 0) {
      console.log(r.out);
      console.error(`\nFAIL — ${g} did not finish. Nothing was checked.`);
      process.exit(1);
    }
    say(g, r);
  }

  /* ── decide the scope ─────────────────────────────────────────────────────── */
  let scope = null;           // null means every page
  let why = '';
  if (ALL) {
    why = 'asked for with --all';
  } else if (named.length) {
    scope = named;
    why = 'named on the command line';
  } else {
    const changed = changedPaths();
    const sitewide = SITEWIDE.filter(([f]) => changed.some((c) => c.startsWith(f)));
    if (sitewide.length) {
      why = `${sitewide[0][0]} changed — ${sitewide[0][1]}`;
    } else {
      const pages = changed.filter((c) => c.endsWith('.html') && !c.includes('/'));
      for (const [asset, adds] of SCOPED_ASSET) {
        if (changed.some((c) => c === asset)) pages.push(...adds);
      }
      scope = [...new Set(pages)].sort();
      why = 'the pages git says moved, plus anything declared to move with them';
    }
  }

  console.log(`\nOffline gates — all ${OFFLINE.length}, over every page.`);
  for (const [cmd, a] of OFFLINE) {
    const r = await run(cmd, a);
    if (r.code !== 0) { failed++; console.log(r.out); }
    say(cmd, r);
  }

  /* ── the three rendering gates, together ──────────────────────────────────── */
  if (scope && scope.length === 0) {
    console.log('\nRendering gates — SKIPPED: no page changed, so there is nothing on screen to measure.');
    console.log('  (Run with --all to sweep anyway.)');
  } else {
    const targets = scope ?? [];
    console.log(
      `\nRendering gates — all ${RENDER.length} at once, over ` +
      (scope ? `${scope.length} page(s): ${scope.join(', ')}` : 'every page') + `.\n  Scope: ${why}.`
    );
    const results = await Promise.all(RENDER.map(([cmd, a]) => run(cmd, [...a, ...targets])));
    for (const r of results) {
      if (r.code !== 0) { failed++; console.log(r.out); }
      say(r.cmd, r);
    }
  }

  const secs = ((Date.now() - t0) / 1000).toFixed(1);
  if (failed) {
    console.error(`\nFAIL — ${failed} gate(s) reported a problem. Full output above. ${secs}s.`);
    process.exit(1);
  }
  console.log(
    `\nPASS — everything regenerated and every gate clear in ${secs}s.` +
    (scope ? `\n  ${scope.length} page(s) measured on screen and on paper. A scoped run is not a full sweep:` +
             '\n  `node tools/check.mjs --all` before anything that touches how the site is built.' : '')
  );
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
