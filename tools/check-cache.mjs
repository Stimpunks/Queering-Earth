#!/usr/bin/env node
/**
 * check-cache.mjs — can a reader be served new markup with an old asset?
 *
 * WHY THIS EXISTS
 * On 2026-09-09 the accession stamp shipped and did not appear. The markup was live
 * and right; the stylesheet on the server was live and right; the browser held one of
 * each from either side of the deploy, and rendered a paragraph of three unstyled
 * spans where an oval should have been. Every page here is `max-age=0,
 * must-revalidate`. `queering.css` was `max-age=300`. For five minutes after any
 * deploy, a returning reader got the new markup with the old rules.
 *
 * The comment in `_headers` PREDICTED that in those words — "a change that adds a
 * class and its rule together would render unstyled for one visit" — and priced it as
 * acceptable. So this is not a gate for an unforeseen failure. It is a gate for a
 * foreseen one that was written down, accepted, and then cost an afternoon anyway,
 * which is the argument for making it mechanical: a comment cannot fail a build.
 *
 * None of the five existing gates can see it. check-markup reads tags, check-sitemap
 * reads the manifest, check-contrast composites colours, check-metadata regenerates
 * derived files, and check-addresses — the one that probes the edge — asks about
 * redirects. A cache policy is invisible to every one of them.
 *
 * THE INVARIANT, and it is not "everything must be max-age=0"
 * The rule `DECISIONS.md` already states is the right one: **staleness is safe only
 * where the stale copy cannot disagree with the fresh HTML.** A stylesheet can
 * disagree with markup — it knows the class names. A derived index can disagree with
 * the page it cites. A font cannot: it has no knowledge of structure, and a year of
 * caching on it is correct. So this gate does NOT flatten every asset to zero, and a
 * version of it that did would be turned off within a week.
 *
 * WHICH ASSETS ARE COUPLED IS DECLARED, NEVER INFERRED, for the reason the register's
 * `data-sheet` is declared: the inference is available, plausible, and wrong. Nothing
 * in a file's bytes or its extension says whether its content is coupled to markup —
 * `queering.js` and `fonts/newsreader-latin.woff2` are both static files fetched by
 * every page, and only one of them can contradict a class that shipped this morning.
 * The two lists below are that judgement, and check 2 is what stops a new asset
 * quietly missing them.
 *
 * WHAT IT CHECKS
 *
 * Offline, by default — no network, like four of the five:
 *
 * 1. SKEW — a markup-coupled asset whose freshness lifetime exceeds that of any page
 *    referencing it. This is the failure that happened.
 * 2. UNDECLARED — an asset a page fetches that appears in neither list, so nobody has
 *    ruled on whether it can disagree with the markup. The realistic future failure:
 *    a second stylesheet or a third script arrives, inherits a policy from `/*` or
 *    from a new rule nobody thought about, and no reader can see whether that is safe.
 * 3. CONTRADICTION — `must-revalidate` alongside `stale-if-error` or
 *    `stale-while-revalidate`. RFC 9111 forbids serving a stale `must-revalidate`
 *    response, so the pair cancels. `_headers` warns about this twice in prose, and
 *    the current policy deliberately depends on getting it right: `search-index.json`
 *    omits `must-revalidate` *in order* to keep `stale-if-error` legal. A future pass
 *    that "tidies" that by adding the stricter directive would silently delete the
 *    resilience it was chosen for.
 * 4. ORPHAN — an exact-path rule in `_headers` with no file on disk. Rename an asset
 *    and its policy stays behind, pointing at nothing, while the asset itself silently
 *    falls through to `/*`.
 *
 * With `--live` it goes and asks the site, which is the only thing that actually knows:
 *
 * 5. SERVED — the `Cache-Control` the edge returns disagrees with what `_headers`
 *    resolves to here. That guards the precedence model below rather than the policy.
 *
 * PRECEDENCE. Netlify merges headers across matching rules by NAME, and for one name
 * the most specific pattern wins outright — verified against the deployed site rather
 * than read off a doc page: `/images/og-index.png` comes back with the images policy
 * and no trace of the `must-revalidate` that `/*` sets. Specificity here is the count
 * of literal characters in the pattern, ties broken by file order. `--live` is the
 * authority; this is the model.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const live = args.includes('--live');
const gating = !args.includes('--no-gate');
const ORIGIN = 'https://queering.earth';

/* ── the declaration ───────────────────────────────────────────────────────────
 * COUPLED: its content knows about the markup, so a stale copy can contradict a page
 * that shipped in the same commit. These must not outlive the pages that fetch them.
 * DECOUPLED: it cannot contradict markup, and each one says why it cannot. Patterns
 * are matched as prefixes when they end in `*`. */
const COUPLED = new Map([
  ['/queering.css', 'the palette, the layout and every class name the sheets use'],
  ['/queering.js', 'derives the contents list and the sheet index from the markup it is given'],
  ['/queering-search.js', 'clones result templates authored in search.html'],
  ['/queering-embed.js', 'reads the facade\'s data-embed-* attributes out of index.html'],
  ['/search-index.json', 'derived from the sheets; a stale copy can quote a sentence no longer on the page it cites'],
  /* Draft-only, and it never appears on a published page — check-metadata.mjs check 10 is
     the guard. It is declared anyway: it reads the draft's own blocks and writes controls
     against them, so a stale copy on a draft branch would anchor a reviewer's notes to
     markup that has moved. It inherits `max-age=0, must-revalidate` from `/*`. */
  ['/drafts/review.js', 'anchors a reviewer\'s notes to the blocks of the draft it is reading'],
]);
const DECOUPLED = new Map([
  ['/fonts/*', 'glyph outlines; a face has no knowledge of structure or class names'],
  ['/images/*', 'somebody else\'s scan and our generated cards; bytes fixed under a descriptive name'],
  ['/favicon.ico', 'a mark, not a document'],
  ['/favicon.svg', 'a mark, not a document'],
  ['/apple-touch-icon.png', 'a mark, not a document'],
]);

const problems = [];
const fail = (kind, detail) => problems.push({ kind, detail });

/* ── parse _headers ────────────────────────────────────────────────────────────── */
const raw = await readFile(join(ROOT, '_headers'), 'utf8');
const rules = [];
for (const [i, l] of raw.split('\n').entries()) {
  const line = l.replace(/#.*$/, '');
  if (!line.trim()) continue;
  if (/^\S/.test(line)) rules.push({ pattern: line.trim(), headers: new Map(), line: i + 1 });
  else if (rules.length) {
    const m = /^\s+([A-Za-z0-9-]+)\s*:\s*(.+)$/.exec(line);
    if (m) rules.at(-1).headers.set(m[1].toLowerCase(), m[2].trim());
  }
}

const matches = (pattern, path) =>
  pattern.endsWith('/*') ? path.startsWith(pattern.slice(0, -1))
  : pattern === '/*' ? true
  : pattern === path;
const specificity = (p) => p.replace(/\*/g, '').length;

/** The Cache-Control the edge should send for a path, under the model above. */
function policyFor(path) {
  let best = null;
  for (const r of rules) {
    if (!r.headers.has('cache-control') || !matches(r.pattern, path)) continue;
    if (!best || specificity(r.pattern) >= specificity(best.pattern)) best = r;
  }
  return best ? { value: best.headers.get('cache-control'), pattern: best.pattern } : null;
}

/** Freshness lifetime in seconds. no-store/no-cache are zero; s-maxage wins for a CDN. */
function freshness(cc) {
  const d = cc.toLowerCase();
  if (/\bno-store\b|\bno-cache\b/.test(d)) return 0;
  const s = /\bs-maxage=(\d+)/.exec(d);
  if (s) return +s[1];
  const m = /\bmax-age=(\d+)/.exec(d);
  return m ? +m[1] : Infinity;   // no max-age at all is a heuristic lifetime: unbounded
}

/* ── what each page fetches ────────────────────────────────────────────────────── */
const NOT_A_PAGE = new Set();
const files = (await readdir(ROOT)).filter((f) => f.endsWith('.html')).sort();
const FETCHING = /<(?:link|script|img|source|iframe|video|audio|embed|object)\b[^>]*>/g;
const FETCHING_REL = /rel="(?:stylesheet|preload|modulepreload|prefetch|prerender|icon|apple-touch-icon)"/;

/** address of a page file, house style: extensionless, index at the root */
const addressOf = (f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''));

const refs = new Map();   // served path -> Set of page addresses fetching it
const note = (path, page) => {
  if (!refs.has(path)) refs.set(path, new Set());
  refs.get(path).add(page);
};

for (const f of files) {
  if (NOT_A_PAGE.has(f)) continue;
  const page = addressOf(f);
  const html = (await readFile(join(ROOT, f), 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
  const scripts = [];
  for (const tag of html.match(FETCHING) ?? []) {
    if (/^<link/.test(tag) && !FETCHING_REL.test(tag)) continue;   // describedby/alternate declare
    for (const m of tag.matchAll(/(?:href|src|srcset)="([^"]+)"/g))
      for (const item of m[1].split(',')) {
        const url = item.trim().split(/\s+/)[0];
        if (!url || /^(?:https?:)?\/\//.test(url) || /^(?:data|mailto|#)/.test(url)) continue;
        const path = url.startsWith('/') ? url : '/' + url.replace(/^\.\//, '');
        note(path.split(/[?#]/)[0], page);
        if (/\.m?js$/.test(path)) scripts.push(path);
      }
  }
  // AND WHAT THOSE SCRIPTS FETCH AT RUNTIME. search-index.json is reached by
  // fetch('search-index.json') inside queering-search.js and appears in no attribute
  // on any page — an HTML-only scan would have missed the very file this gate was
  // built after fixing.
  for (const s of scripts) {
    const js = await readFile(join(ROOT, s.slice(1)), 'utf8').catch(() => null);
    if (js === null) { fail('undeclared', `${page} loads ${s}, which is not in the repo`); continue; }
    for (const m of js.matchAll(/\bfetch\(\s*['"]([^'"]+)['"]/g)) {
      const u = m[1];
      if (/^(?:https?:)?\/\//.test(u)) continue;
      note((u.startsWith('/') ? u : '/' + u).split(/[?#]/)[0], page);
    }
  }
}

/* ── 1 & 2. skew, and anything undeclared ─────────────────────────────────────── */
const declared = (p) => {
  for (const k of COUPLED.keys()) if (matches(k, p)) return 'coupled';
  for (const k of DECOUPLED.keys()) if (matches(k, p)) return 'decoupled';
  return null;
};

for (const [path, pages] of [...refs].sort()) {
  const kind = declared(path);
  if (!kind) {
    fail('undeclared', `${path} is fetched by ${[...pages].sort()[0]}${pages.size > 1 ? ` and ${pages.size - 1} other page(s)` : ''}` +
      ` and is in neither list in check-cache.mjs — rule on whether a stale copy can contradict the markup`);
    continue;
  }
  if (kind !== 'coupled') continue;

  const asset = policyFor(path);
  if (!asset) { fail('skew', `${path} is markup-coupled and no _headers rule sets its Cache-Control`); continue; }
  const a = freshness(asset.value);

  // ONE PROBLEM PER ASSET, not one per page. A single wrong policy on the stylesheet
  // is one defect in one line of `_headers`, and reporting it fourteen times buries
  // the second finding under the first. The tightest page is the one named, because
  // that is the bound the asset actually has to meet.
  let tightest = null;
  for (const page of [...pages].sort()) {
    const pol = policyFor(page);
    if (!pol) { fail('skew', `${page} has no Cache-Control rule, so ${path} cannot be compared to it`); continue; }
    const p = freshness(pol.value);
    if (tightest === null || p < tightest.p) tightest = { page, p };
  }
  if (tightest && a > tightest.p) {
    const why = COUPLED.get([...COUPLED.keys()].find((k) => matches(k, path)));
    fail('skew', `${path} is fresh for ${a}s but the ${pages.size} page(s) fetching it for ${tightest.p}s` +
      ` (tightest: ${tightest.page}) — a reader can hold new markup with the old file. It is coupled because it is ${why}.` +
      ` Set it to ${policyFor(tightest.page).value} in _headers.`);
  }
}

/* ── 3. must-revalidate cancels stale-* ───────────────────────────────────────── */
for (const r of rules) {
  const cc = r.headers.get('cache-control');
  if (!cc) continue;
  const stale = /\bstale-(?:if-error|while-revalidate)\b/.exec(cc.toLowerCase());
  if (/\bmust-revalidate\b/.test(cc.toLowerCase()) && stale)
    fail('contradiction', `${r.pattern} (_headers:${r.line}) pairs must-revalidate with ${stale[0]} —` +
      ` RFC 9111 forbids serving a stale must-revalidate response, so the two cancel`);
}

/* ── 4. a rule for a path that is not there ───────────────────────────────────── */
for (const r of rules) {
  if (r.pattern.includes('*') || r.pattern.endsWith('/')) continue;
  const onDisk = r.pattern.slice(1);
  const exists = await stat(join(ROOT, onDisk)).then(() => true).catch(() => false);
  const isPage = files.includes(onDisk + '.html') || r.pattern === '/';
  if (!exists && !isPage)
    fail('orphan', `${r.pattern} (_headers:${r.line}) has a rule and no file — the policy stayed behind after a rename`);
}

/* ── 5. what the edge actually sends ──────────────────────────────────────────── */
let probed = 0;
const disagreements = new Map();
if (live) {
  const targets = [...new Set([...refs.keys(), ...files.filter((f) => !NOT_A_PAGE.has(f)).map(addressOf)])].sort();
  for (const path of targets) {
    const expected = policyFor(path);
    if (!expected) continue;
    let got;
    try {
      const res = await fetch(ORIGIN + path, { method: 'HEAD', redirect: 'manual' });
      got = res.headers.get('cache-control');
      probed++;
    } catch (e) { fail('served', `${path} could not be probed: ${e.message}`); continue; }
    const norm = (v) => (v ?? '').toLowerCase().replace(/\s+/g, '');
    if (norm(got) !== norm(expected.value)) {
      // GROUPED BY THE RULE THAT CAUSED IT, for the reason the skew check is grouped by
      // asset: one edited line in `_headers` disagrees with the edge at every path its
      // pattern covers, and `/images/*` covers sixty-five of them. Sixty-five lines
      // describing one defect hide the next one.
      const key = `${expected.pattern}\u0000${expected.value}\u0000${got}`;
      const seen = disagreements.get(key);
      if (seen) seen.n++;
      else disagreements.set(key, { pattern: expected.pattern, want: expected.value, got, example: path, n: 1 });
    }
  }
  for (const d of disagreements.values())
    fail('served', `${d.pattern} — _headers resolves to "${d.want}", the site sends "${d.got}"` +
      ` (${d.n} path(s), e.g. ${d.example}). Deployed yet?`);
}

/* ── report ───────────────────────────────────────────────────────────────────── */
const line = (label, value) => console.log(`  ${label.padEnd(38)} ${value}`);
console.log(`\n  _headers · ${rules.length} rule(s)${live ? ` · ${probed} live probe(s)` : ''}\n`);
line('pages', `${files.filter((f) => !NOT_A_PAGE.has(f)).length}`);
line('assets fetched by a page', `${refs.size}`);
line('markup-coupled', `${[...refs.keys()].filter((p) => declared(p) === 'coupled').length}`);
line('mode', live ? 'offline + live' : 'offline (pass --live to probe the site)');
console.log();

for (const [kind, label] of [
  ['skew', 'assets outliving the markup'],
  ['undeclared', 'assets nobody has ruled on'],
  ['contradiction', 'directives that cancel each other'],
  ['orphan', 'rules for files that do not exist'],
  ['served', 'served-site disagreements'],
]) {
  if (kind === 'served' && !live) continue;
  const hits = problems.filter((p) => p.kind === kind);
  line(label, hits.length ? `${hits.length}` : 'none');
  for (const h of hits) console.log(`      ${h.detail}`);
}

console.log(`\n${refs.size} asset(s) · ${rules.length} rule(s) · ${problems.length} problem(s)`);

if (problems.length) {
  console.log(
    gating
      ? '\nFAIL — a reader can be served new markup with an old asset.\n' +
        'This is the failure that shipped the accession stamp as three unstyled spans:\n' +
        'the markup was right, the served file was right, and the browser held one of\n' +
        'each from either side of a deploy. No other gate here can see a cache policy.'
      : '\nRun without --no-gate to make this a ship-blocker.'
  );
} else {
  console.log(
    live
      ? 'PASS — no markup-coupled asset outlives the pages that fetch it, in the repo\n       and on the site, and every asset a page fetches has been ruled on.'
      : 'PASS — no markup-coupled asset outlives the pages that fetch it, every asset a\n       page fetches has been ruled on, and no directive cancels another.'
  );
}

process.exit(gating && problems.length ? 1 : 0);
