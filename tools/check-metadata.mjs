#!/usr/bin/env node
/**
 * check-metadata.mjs — does the machine-readable layer still agree with the pages?
 *
 * WHY THIS EXISTS
 * The agent-readiness pass added a second description of this site: a `.md` beside every
 * page, `/llms.txt`, `/llms-full.txt`, `/feed.xml`, a JSON-LD block per page, and an
 * Agent Skill with a digest. Every one of those is a copy of something, and
 * `CLAUDE.md` is blunt about copies: **two copies of the same words drift, and the
 * accessible one is always the copy that rots.**
 *
 * The generator answers half of that — nothing is typed, so nothing can be typed wrong.
 * It does not answer the other half: a generator's output is only true until somebody
 * edits a page and does not re-run it. Then the site says one thing and the Markdown an
 * agent fetches says another, and the site looks perfect. That is the failure this file
 * exists to make loud.
 *
 * WHAT IT CHECKS
 *
 * 1. STALE — a generated file that is not what the generator would write today. Checked
 *    by regenerating into memory and comparing, so the test is exact rather than a
 *    timestamp heuristic. `mtime` would be wrong the first time somebody touches a file
 *    without changing it, and silently right when a change reverts.
 * 2. DIGEST — `/.well-known/agent-skills/index.json` claims a sha256 for SKILL.md.
 *    A stale digest is worse than none: it tells an agent the file it just fetched has
 *    been tampered with.
 * 3. JSON-LD — every page has exactly one block, it parses, and its `url` matches the
 *    page's own `rel=canonical` while `headline`/`name` matches the page's `<title>`.
 *    JSON-LD is authored, so this is the guard that keeps an authored copy honest.
 * 4. LD ATTRIBUTION — a page with an `about.author` must not name that person as the
 *    page's own `author`. **This is the one check here that is about correctness rather
 *    than freshness.** `author` is who wrote our reading; `about.author` is who made the
 *    thing being read. Collapsing them would tell every agent on the web that we wrote
 *    Woolf, which is the exact misattribution this whole site is organised against.
 * 5. DISCOVERY — every page carries `rel=describedby` to /llms.txt and a
 *    `rel=alternate` pointing at its own `.md`, and that target exists.
 * 6. PLATES — every plate figure is a `<picture>` with an AVIF and a WebP source whose
 *    srcset widths match the manifest, every variant file exists, and every source scan
 *    still hashes to what `tools/plate-variants.json` recorded. **The scan hash is the
 *    one that matters**: replacing a plate with a better scan and forgetting to re-run
 *    `make-plates.py` leaves the page serving AVIF of the OLD scan to nearly every
 *    reader while the JPEG fallback nobody fetches shows the new one. Nothing looks
 *    broken and the two disagree.
 *
 * 7. THIRD PARTY — no page may FETCH from another origin. /privacy states that this
 *    site makes no third-party requests, and a privacy policy is a binding statement,
 *    so the claim is enforced here rather than trusted. Until 2026-09-09 it would have
 *    failed: the pages pulled two typefaces from Google's font CDN, disclosing every
 *    reader's IP and user agent before a word was read. Anchor hrefs are exempt — a
 *    link the reader chooses to follow is not a request the page made.
 * 8. FONTS — every self-hosted face exists, still hashes to what it was downloaded as,
 *    and is referenced by the generated @font-face block. A missing woff2 falls back to
 *    a system serif silently, which is a typographic regression nobody would notice in
 *    a diff.
 *
 * (1), (6) and (8) are all freshness, which is why they live in one gate: every derived
 * artefact here — Markdown, indexes, feed, the search index, the finding aid's manifest,
 * plate variants — is only true until somebody edits a source and does not re-run the
 * tool. The search index is the newest and fails the most quietly: a reworded heading
 * leaves /search pointing at a name no page uses, and the page still reads perfectly.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const gating = !process.argv.includes('--no-gate');
const problems = [];
const fail = (kind, detail) => problems.push({ kind, detail });

const NOT_CONTENT = new Set(['404.html']);
const files = (await readdir(ROOT)).filter((f) => f.endsWith('.html') && !NOT_CONTENT.has(f)).sort();

/* ── 1. staleness, by regenerating and comparing ───────────────────────────────
 * The generator writes files. To compare without clobbering, snapshot the generated
 * files, run it, compare, and restore anything it changed — then report. */
const GENERATED = [
  ...files.map((f) => f.replace(/\.html$/, '.md')),
  'llms.txt', 'llms-full.txt', 'feed.xml',
];
const { writeFile } = await import('node:fs/promises');

/** Snapshot, run the generator, compare, put the tree back, and report. */
async function freshness(tool, outputs) {
  const was = new Map();
  for (const g of outputs) {
    try { was.set(g, await readFile(join(ROOT, g), 'utf8')); }
    catch { fail('stale', `${g} does not exist — run: node tools/${tool}`); }
  }
  if (was.size !== outputs.length) return;

  await promisify(execFile)(process.execPath, [join(ROOT, 'tools', tool)], { cwd: ROOT });
  for (const [g, old] of was) {
    const now = await readFile(join(ROOT, g), 'utf8');
    if (now !== old) {
      fail('stale', `${g} is not what the generator writes today — run: node tools/${tool}`);
      await writeFile(join(ROOT, g), old); // leave the tree as we found it
    }
  }
}

await freshness('make-markdown.mjs', GENERATED);

/* THE SEARCH INDEX AND THE FINDING AID'S MANIFEST, and search.html is the one on this
 * list that is not wholly generated. Its prose is authored and its manifest is written
 * in between two markers, the make-fonts.mjs idiom — so a stale one is a page whose
 * index of the cabinet disagrees with the cabinet. That fails in the direction nobody
 * checks: the sheet still reads perfectly, and it points at a heading that has been
 * reworded or a section that no longer exists. Comparing the whole file catches a
 * drifted manifest and leaves the authored prose alone, because the generator only
 * ever rewrites what is between the markers. */
await freshness('make-search-index.mjs', ['search-index.json', 'search.html']);

/* ── 2. the Agent Skill digest ─────────────────────────────────────────────────── */
const SKILL = '.well-known/agent-skills/queering-earth/SKILL.md';
const INDEX = '.well-known/agent-skills/index.json';
try {
  const skill = await readFile(join(ROOT, SKILL));
  const index = JSON.parse(await readFile(join(ROOT, INDEX), 'utf8'));
  const want = 'sha256:' + createHash('sha256').update(skill).digest('hex');
  const entry = (index.skills ?? []).find((s) => s.name === 'queering-earth');
  if (!entry) fail('digest', `${INDEX} lists no skill named queering-earth`);
  else if (entry.digest !== want)
    fail('digest', `${INDEX} claims ${entry.digest.slice(0, 22)}… but SKILL.md hashes to ${want.slice(0, 22)}… — a wrong digest reads as tampering`);
} catch (e) {
  fail('digest', `cannot verify the Agent Skill digest: ${e.message}`);
}

/* ── 3–5. per page ─────────────────────────────────────────────────────────────── */
const exists = async (p) => { try { await stat(join(ROOT, p)); return true; } catch { return false; } };

for (const f of files) {
  const html = await readFile(join(ROOT, f), 'utf8');
  const grab = (re) => (re.exec(html) || [])[1];
  const canonical = grab(/<link rel="canonical" href="([^"]+)"/);
  const title = (grab(/<title>([^<]+)<\/title>/) ?? '')
    .replace(/&mdash;/g, '—').replace(/&rsquo;/g, '’').replace(/&amp;/g, '&')
    .replace(/\s+— Queering Earth$/, '').trim();
  const slug = f.replace(/\.html$/, '');

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) { fail('jsonld', `${f} has ${blocks.length} JSON-LD blocks, expected exactly 1`); }
  else {
    let ld;
    try { ld = JSON.parse(blocks[0][1]); }
    catch (e) { fail('jsonld', `${f} JSON-LD does not parse: ${e.message}`); ld = null; }
    if (ld) {
      if (ld.url !== canonical) fail('jsonld', `${f} JSON-LD url is ${ld.url}, canonical is ${canonical}`);
      const name = ld.headline ?? ld.name;
      if (name !== title) fail('jsonld', `${f} JSON-LD names it "${name}", <title> says "${title}"`);
      if (!ld.license) fail('jsonld', `${f} JSON-LD has no license`);

      const ours = (Array.isArray(ld.author) ? ld.author : ld.author ? [ld.author] : []).map((a) => a.name);
      const theirs = ld.about?.author?.name;
      if (theirs && ours.includes(theirs))
        fail('attribution', `${f} names ${theirs} as the page's own author AND as the author of the work it is about — ` +
          `that says we wrote it. "author" is who wrote our reading; "about.author" is who made the thing read.`);
    }
  }

  if (!/<link rel="describedby" href="\/llms\.txt"/.test(html))
    fail('discovery', `${f} has no rel=describedby to /llms.txt — llms.txt v2's one hard requirement`);

  if (!/<link rel="alternate" href="\/feed\.xml" type="application\/rss\+xml"/.test(html))
    fail('discovery', `${f} does not link /feed.xml — the spec asks for the feed in <head>, not only in a Link header`);

  const alt = grab(/<link rel="alternate" href="([^"]+)" type="text\/markdown"/);
  const wantMd = canonical?.replace(/\/$/, '/index') + '.md';
  if (!alt) fail('discovery', `${f} has no rel=alternate pointing at its Markdown source`);
  else if (alt !== wantMd) fail('discovery', `${f} rel=alternate is ${alt}, expected ${wantMd}`);
  else if (!(await exists(`${slug}.md`))) fail('discovery', `${f} advertises ${alt} but ${slug}.md is not in the repo`);
}

/* ── 6. the plates ────────────────────────────────────────────────────────────── */
let plateCount = 0;
try {
  const manifest = JSON.parse(await readFile(join(ROOT, 'tools', 'plate-variants.json'), 'utf8'));

  for (const [name, entry] of Object.entries(manifest)) {
    const buf = await readFile(join(ROOT, 'images', name)).catch(() => null);
    if (!buf) { fail('plates', `images/${name} is in the manifest but not in the repo`); continue; }
    const have = createHash('sha256').update(buf).digest('hex');
    if (have !== entry.sha256)
      fail('plates', `images/${name} has changed since it was encoded — run: python3 tools/make-plates.py`);
    for (const v of entry.variants)
      if (!(await exists(`images/${v}`)))
        fail('plates', `images/${v} is missing — run: python3 tools/make-plates.py`);
  }

  for (const f of files) {
    const html = (await readFile(join(ROOT, f), 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
    for (const fig of html.matchAll(/<figure class="([^"]*qe-plate[^"]*)"[^>]*>([\s\S]*?)<\/figure>/g)) {
      const block = fig[2];
      const img = /<img\b[^>]*>/.exec(block);
      if (!img) continue;
      plateCount++;
      const src = /src="images\/([^"]+)\.jpg"/.exec(img[0]);
      if (!src) { fail('plates', `${f}: a plate figure's img is not one of the scans in images/`); continue; }
      const stem = src[1];
      const entry = manifest[`${stem}.jpg`];
      if (!entry) { fail('plates', `${f}: ${stem}.jpg has no manifest entry — run: python3 tools/make-plates.py`); continue; }

      if (!/<picture>/.test(block)) {
        fail('plates', `${f}: the ${stem} figure is a bare <img> with no <picture> — no reader gets AVIF`);
        continue;
      }
      for (const type of ['avif', 'webp']) {
        const srcset = new RegExp(`<source type="image/${type}" srcset="([^"]+)"`).exec(block);
        if (!srcset) { fail('plates', `${f}: the ${stem} picture has no ${type} source`); continue; }
        const declared = srcset[1].split(',').map((s) => s.trim().split(/\s+/)[1]).join(',');
        const wanted = entry.widths.map((w) => `${w}w`).join(',');
        if (declared !== wanted)
          fail('plates', `${f}: ${stem} ${type} srcset offers ${declared}, the manifest has ${wanted}`);
      }
      for (const attr of ['width', 'height', 'alt', 'loading', 'decoding'])
        if (!new RegExp(`\\b${attr}=`).test(img[0]))
          fail('plates', `${f}: the ${stem} img lost its ${attr} attribute in the <picture> rewrite`);
    }
  }
} catch (e) {
  fail('plates', `cannot verify the plates: ${e.message}`);
}

/* ── 7. no third-party requests ────────────────────────────────────────────────
 * Only the attributes that make the browser fetch something. `<a href>` is excluded on
 * purpose, and so are meta values: og:image naming our own origin is a declaration,
 * not a fetch. */
const FETCHING = /<(?:link|script|img|source|iframe|video|audio|embed|object)\b[^>]*>/g;
for (const f of [...files, '404.html']) {
  const html = (await readFile(join(ROOT, f), 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
  for (const tag of html.match(FETCHING) ?? []) {
    // A <link> only fetches for some rel values; canonical/describedby/alternate declare.
    if (/^<link/.test(tag) && !/rel="(?:stylesheet|preconnect|preload|dns-prefetch|modulepreload|prefetch|prerender)"/.test(tag))
      continue;
    for (const m of tag.matchAll(/(?:href|src|srcset|data)="([^"]+)"/g))
      for (const url of m[1].split(/[,\s]+/))
        if (/^(?:https?:)?\/\//.test(url) && !/^https:\/\/queering\.earth\//.test(url))
          fail('thirdparty', `${f} fetches from another origin: ${url} — /privacy says it does not`);
  }
}

/* ── 8. the self-hosted faces ─────────────────────────────────────────────────── */
try {
  const fonts = JSON.parse(await readFile(join(ROOT, 'tools', 'font-files.json'), 'utf8'));
  const sheet = await readFile(join(ROOT, 'queering.css'), 'utf8');
  for (const [file, meta] of Object.entries(fonts)) {
    const buf = await readFile(join(ROOT, 'fonts', file)).catch(() => null);
    if (!buf) { fail('fonts', `fonts/${file} is missing — run: node tools/make-fonts.mjs`); continue; }
    if (createHash('sha256').update(buf).digest('hex') !== meta.sha256)
      fail('fonts', `fonts/${file} is not the file it was downloaded as — run: node tools/make-fonts.mjs`);
    if (!sheet.includes(`url(fonts/${file})`))
      fail('fonts', `fonts/${file} exists but no @font-face in queering.css references it`);
  }
  for (const m of sheet.matchAll(/url\(fonts\/([^)]+)\)/g))
    if (!fonts[m[1]]) fail('fonts', `queering.css references fonts/${m[1]}, which is not in the manifest`);
} catch (e) {
  fail('fonts', `cannot verify the self-hosted faces: ${e.message}`);
}

/* ── report ────────────────────────────────────────────────────────────────────── */
const line = (l, v) => console.log(`  ${l.padEnd(42)} ${v}`);
console.log(`\n  ${files.length} page(s) · ${GENERATED.length} generated file(s) · ${plateCount} plate figure(s)\n`);
for (const [kind, label] of [
  ['stale', 'generated files out of date'],
  ['digest', 'Agent Skill digest problems'],
  ['jsonld', 'JSON-LD disagreeing with its page'],
  ['attribution', 'JSON-LD misattributions'],
  ['discovery', 'missing or wrong discovery links'],
  ['plates', 'plate encoding or markup problems'],
  ['thirdparty', 'third-party requests'],
  ['fonts', 'self-hosted face problems'],
]) {
  const hits = problems.filter((p) => p.kind === kind);
  line(label, hits.length ? `${hits.length}` : 'none');
  for (const h of hits) console.log(`      ${h.detail}`);
}
console.log(`\n${files.length} page(s) · ${problems.length} problem(s)`);
if (problems.length) {
  console.log(gating
    ? '\nFAIL — the machine-readable layer no longer describes the site.\n' +
      'A stale .md is the quiet one: the page is right, the copy an agent fetches is\n' +
      'wrong, and nothing on the site looks broken. A JSON-LD misattribution is the\n' +
      'loud one: it tells every agent on the web that we wrote somebody else’s work.'
    : '\nRun without --no-gate to make this a ship-blocker.');
} else {
  console.log('PASS — every generated file current, every JSON-LD block agrees with its page,\n' +
    '       every reading credited to its reader and every work to its maker.');
}
process.exit(gating && problems.length ? 1 : 0);
