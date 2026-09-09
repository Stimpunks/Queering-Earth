#!/usr/bin/env node
/**
 * check-addresses.mjs — does the SERVED site agree with the house address rule?
 *
 * WHY THIS EXISTS
 * The other three gates read files. This one is about what the edge answers, and
 * it exists because that turned out to be a different question.
 *
 * On 2026-09-09 an audit against The Website Specification found every sheet
 * answering 200 at two addresses — `/on-being-ill` and `/on-being-ill.html`,
 * byte-identical, the same ETag. That is the path-level version of the defect
 * `_redirects` already described for hostnames, found on Star Stuff on 15 August
 * and fixed here on 7 September. We wrote the reasoning down and did not look one
 * layer down.
 *
 * What makes it worth a gate is how thoroughly the existing checks passed it:
 *
 *   - `CLAUDE.md` states that addresses are extensionless.
 *   - `check-sitemap.mjs` reported "locs still carrying .html — none."
 *   - every `rel="canonical"` pointed at the extensionless form.
 *   - `check-markup.mjs` had nothing to say, correctly.
 *
 * All four were right. NONE OF THEM CAN SEE WHAT THE EDGE ANSWERS. The manifest
 * was clean, the intent was documented, and the twin served anyway — because
 * Netlify shadows a redirect with a real file, and `on-being-ill.html` is a real
 * file. A guard that reads the repo can never catch that. This one has to know
 * about `_redirects`, and with `--live` it goes and asks the site.
 *
 * WHAT IT CHECKS
 *
 * Offline, by default — no network, like the other three:
 *
 * 1. RULE MISSING — a page with no forced 301 from its `.html` twin. This is the
 *    realistic future failure: Sheet No. 9 gets mounted, carded, logged and filed,
 *    and nobody adds the redirect. Enumerated rules rather than a glob is what
 *    makes this reportable by name.
 * 2. RULE UNFORCED — a rule without `!`. Netlify lets the real file win, so the
 *    rule is present, looks right, and never fires. The worst kind of green.
 * 3. RULE STALE — a rule whose target page does not exist.
 * 4. RULE WRONG — a rule pointing somewhere other than its own extensionless form.
 * 5. LINK EXTENSION — an internal link, canonical, or og:url carrying `.html`.
 * 6. ASSET ROOT-RELATIVE — a stylesheet, script, or icon referenced as `/thing`
 *    instead of `thing`. Not a served-site defect; it breaks `file://` browsing,
 *    which is how this was noticed, and it means one rule is applied two ways.
 *    `CLAUDE.md` says the shared assets are included by relative URL; the three
 *    icons quietly were not.
 *
 * With `--live`, additionally, over the network:
 *
 * 7. every extensionless address answers 200;
 * 8. every `.html` twin answers 301 to it, in ONE hop, no chain and no loop;
 * 9. an address that does not exist answers 404 AND serves OUR page, not Netlify's
 *    default. This is the only way to catch `404.html` being deleted or renamed:
 *    the site keeps working, the status stays correct, and the reader silently
 *    leaves the herbarium for a teal Netlify page.
 * 10. `/404` and `/404.html` do NOT answer 200. An error page reachable at its own
 *    address with a success status is a SOFT 404 — the exact fault the spec's
 *    error-pages item leads with, and one we would otherwise have introduced by
 *    fixing the page.
 *
 * `--live` is opt-in because the default gate must stay offline and browser-free.
 * A redirect loop is the way this fix fails, so run `--live` after deploying it.
 */

import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Root at the repo, not at process.cwd(), so this is correct from any directory.
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://queering.earth';

const args = process.argv.slice(2);
const live = args.includes('--live');
const gating = !args.includes('--no-gate');

const problems = [];
const fail = (kind, detail) => problems.push({ kind, detail });

/* The error page has no address, so it takes no redirect rule and no sitemap entry.
 * It is not exempt from being CHECKED — see the ERROR PAGE section below, which is
 * stricter about it than the rule it is excused from. */
const NOT_ADDRESSED = new Set(['404']);

const files = (await readdir(ROOT)).filter((f) => f.endsWith('.html')).sort();
const pages = files.map((f) => f.replace(/\.html$/, ''));
const sheets = pages.filter((p) => p !== 'index' && !NOT_ADDRESSED.has(p));

// ── the redirect table ────────────────────────────────────────────────────────
const redirects = await readFile(join(ROOT, '_redirects'), 'utf8');
const rules = redirects
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.split(/\s+/))
  .filter((p) => p.length >= 2 && p[0].startsWith('/'))
  .map(([from, to, status]) => ({ from, to, status: status ?? '', forced: (status ?? '').endsWith('!') }));

const byFrom = new Map(rules.map((r) => [r.from, r]));

for (const p of sheets) {
  const want = `/${p}.html`;
  const r = byFrom.get(want);
  if (!r) {
    fail('missing', `${want} has no rule — the .html twin will answer 200 beside /${p}`);
    continue;
  }
  if (!r.forced)
    fail('unforced', `${want} -> ${r.to} is "${r.status}" and needs 301! — ${p}.html is a real file and shadows an unforced rule`);
  if (r.to !== `/${p}`) fail('wrong', `${want} points at ${r.to}, not /${p}`);
}

const idx = byFrom.get('/index.html');
if (!idx) fail('missing', '/index.html has no rule — the plate will answer 200 at two addresses');
else {
  if (!idx.forced) fail('unforced', `/index.html -> ${idx.to} is "${idx.status}" and needs 301!`);
  if (idx.to !== '/') fail('wrong', `/index.html points at ${idx.to}, not /`);
}

for (const r of rules) {
  const m = /^\/(.+)\.html$/.exec(r.from);
  if (m && !pages.includes(m[1])) fail('stale', `${r.from} has a rule but no such page exists`);
}

// ── the error page ───────────────────────────────────────────────────────────
// Netlify falls back to its own default the moment this file is gone, and nothing
// else here would notice: every address still resolves and every status is right.
if (!files.includes('404.html'))
  fail('errorpage', '404.html is missing — Netlify will serve its own default page');

// ── the markup ────────────────────────────────────────────────────────────────
for (const f of files) {
  const s = await readFile(join(ROOT, f), 'utf8');

  for (const m of s.matchAll(/(?:href|content)="((?:\/|https:\/\/queering\.earth\/)[^"]*\.html(?:#[^"]*)?)"/g))
    fail('extension', `${f} — ${m[1]} carries .html; addresses are extensionless`);

  for (const m of s.matchAll(/(?:href|src)="(\/[^"]*\.(?:css|js|svg|ico|png|jpg))"/g))
    fail('asset', `${f} — ${m[1]} is root-relative; shared assets are included by relative URL`);
}

// ── the served site, on request ───────────────────────────────────────────────
let probed = 0;
if (live) {
  const head = async (url) => {
    const res = await fetch(url, { method: 'HEAD', redirect: 'manual' });
    return { status: res.status, location: res.headers.get('location') };
  };
  for (const p of sheets) {
    probed += 2;
    const clean = await head(`${ORIGIN}/${p}`);
    if (clean.status !== 200) fail('live', `/${p} answered ${clean.status}, expected 200`);

    const twin = await head(`${ORIGIN}/${p}.html`);
    if (twin.status !== 301)
      fail('live', `/${p}.html answered ${twin.status}, expected 301 — the twin is still being served`);
    else if (twin.location !== `${ORIGIN}/${p}` && twin.location !== `/${p}`)
      fail('live', `/${p}.html redirects to ${twin.location}, expected /${p}`);
    else {
      const hop = await head(twin.location.startsWith('http') ? twin.location : ORIGIN + twin.location);
      if (hop.status !== 200)
        fail('live', `/${p}.html -> ${twin.location} -> ${hop.status}: chain or loop, not a single hop`);
    }
  }
  // An address that cannot exist must answer 404 with OUR page.
  probed += 3;
  const missUrl = `${ORIGIN}/no-such-sheet-${Date.now()}`;
  const miss = await fetch(missUrl, { redirect: 'manual' });
  if (miss.status !== 404) fail('live', `a nonexistent address answered ${miss.status}, expected 404`);
  const body = await miss.text();
  if (!body.includes('No such sheet'))
    fail('live', 'a nonexistent address did not serve our 404 page — Netlify default is back');

  // ...and the error page must not be a soft 404 at its own path.
  for (const at of ['/404', '/404.html']) {
    const r = await head(ORIGIN + at);
    // Asserting 404 rather than "not 200": a 5xx here means the self-referential
    // rewrite in _redirects is broken, which a not-200 test would wave through.
    if (r.status !== 404)
      fail('live', `${at} answered ${r.status}, expected 404 — 200 is a soft 404, 5xx is a broken rewrite`);
  }

  probed += 2;
  const root = await head(`${ORIGIN}/`);
  if (root.status !== 200) fail('live', `/ answered ${root.status}, expected 200`);
  const home = await head(`${ORIGIN}/index.html`);
  if (home.status !== 301) fail('live', `/index.html answered ${home.status}, expected 301`);
}

// ── report ────────────────────────────────────────────────────────────────────
const line = (label, value) => console.log(`  ${label.padEnd(38)} ${value}`);
console.log(`\n  _redirects · ${rules.length} rule(s)${live ? ` · ${probed} live probe(s)` : ''}\n`);
line('pages', `${pages.length}`);
line('sheets needing a rule', `${sheets.length}`);
line('mode', live ? 'offline + live' : 'offline (pass --live to probe the site)');
console.log();

for (const [kind, label] of [
  ['missing', 'pages with no redirect rule'],
  ['unforced', 'rules missing the forcing !'],
  ['wrong', 'rules pointing at the wrong target'],
  ['stale', 'rules for pages that do not exist'],
  ['errorpage', 'custom error page missing'],
  ['extension', 'internal addresses carrying .html'],
  ['asset', 'root-relative asset references'],
  ['live', 'served-site disagreements'],
]) {
  if (kind === 'live' && !live) continue;
  const hits = problems.filter((p) => p.kind === kind);
  line(label, hits.length ? `${hits.length}` : 'none');
  for (const h of hits) console.log(`      ${h.detail}`);
}

console.log(`\n${pages.length} page(s) · ${rules.length} rule(s) · ${problems.length} problem(s)`);

if (problems.length) {
  console.log(
    gating
      ? '\nFAIL — the served site does not agree with the house address rule.\n' +
          'The costly one is a missing or unforced rule: the manifest stays clean, every\n' +
          'canonical stays right, the other three gates stay green, and the .html twin\n' +
          'serves a byte-identical page at an address that is not supposed to exist.'
      : '\nRun without --no-gate to make this a ship-blocker.'
  );
} else {
  console.log(
    live
      ? 'PASS — one address per page, in the repo and on the site, each twin a single 301.'
      : 'PASS — every page has a forced rule, no address carries .html, no asset is root-relative.'
  );
}

process.exit(gating && problems.length ? 1 : 0);
