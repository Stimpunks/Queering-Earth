#!/usr/bin/env node
/**
 * make-whats-new.mjs — the listing on /whats-new: every page, newest first.
 *
 * WHY THIS EXISTS
 * `/feed.xml` has shipped since the agent-readiness pass and NOTHING ON THE SITE
 * LINKED TO IT. It was in every head as rel=alternate and on every response as a
 * `Link:` header, so a feed reader that had already been handed a URL could find it
 * and a person could not. A feed with no human twin is a feed for machines only,
 * which is not what a feed is for. Star Stuff pairs `whats-new.html` with `feed.xml`
 * deliberately — the same answer for people and for readers — and this is that pair,
 * built the way this house builds things.
 *
 * IT ALSO OWNS `/feed.xml`, AND THAT IS THE POINT OF THE PAIR. The page and the feed
 * are ONE list in two formats — the same pages, the same order, the same dates, out of
 * the same pass — so a reader who subscribes and a reader who visits cannot be told
 * different things. `make-markdown.mjs` writes the OTHER feed, `/register.xml`, from the
 * register's accessions, because that list is a different list and deserves to be
 * subscribable separately: somebody following the work wants to know a sheet was
 * mounted, and somebody auditing us wants to know a label was corrected. One feed
 * carrying both made the second invisible inside the first.
 *
 * THE GUESSABLE NAME GOES TO THE PAGES FEED. `/feed.xml` is what a reader's tooling
 * tries when it is guessing, and the pages are what most subscribers mean by a feed.
 * The register's is named for what the site already calls that page.
 *
 * IT IS A NEW AXIS, NOT A SECOND COPY OF ONE THAT EXISTS. Every index here is
 * EDITORIAL order: `tools/pages.mjs` sets the order a reader should meet the pages,
 * `/the-plate` cards the sheets in accession number, `.qe-furniture` lists the rest by
 * group. The register is the only chronological view and its unit is the ACCESSION —
 * an event — across 40,000 words. Nothing anywhere answered *what is here, and when
 * did it arrive*, which is the one question a returning reader has.
 *
 * ── WHERE THE DATE COMES FROM, AND WHY IT IS CHECKED ──────────────────────────
 *
 * THE REGISTER CANNOT ANSWER IT, which was found by measuring rather than assumed.
 * `Mounted` is the register's word for anything added TO a page, not for a page coming
 * into existence: `/design` carries five Mounted entries, `/two-cohabitating-modes`
 * six, the home page ten — and `/privacy` carries NONE, because nothing was ever
 * mounted on it. Earliest-Mounted-wins would have dated four pages by accident and one
 * not at all.
 *
 * So the date is the commit that added the file — `git log --diff-filter=A` on the
 * current path, which is the honest answer to *when did this URL go live*. That is a
 * MEASUREMENT of the repository, not a second hand-kept copy of an authored fact, and
 * it has the same standing as check-width.mjs measuring a rendered box.
 *
 * AND IT IS GATED AGAINST THE AUTHORED FACT WHEREVER ONE EXISTS. Eleven sheets carry
 * an accession stamp with a `datetime`, and twelve pages carry a `.qe-provenance` line
 * with another. All of them agree with git today — checked before a line of this was
 * written, all three values for all twelve pages. This tool THROWS on a disagreement,
 * which is what turns the measurement into a checked invariant: the day somebody
 * back-dates a stamp or re-creates a file, the site stops being able to say two things.
 * Neither source alone could do that. The stamp cannot date `/privacy`; git cannot know
 * what we meant.
 *
 * ── WHERE THE WORDS COME FROM ─────────────────────────────────────────────────
 *
 * NOT TYPED, and not lifted from the gloss. `.qe-furniture` holds the one-sentence
 * gloss of every page that is not a reading, and CLAUDE.md forbids repeating it —
 * that is the rule a collection page is held to. So the summary here is the page's own
 * `<meta name="description">`, which is exactly what `/llms.txt` already publishes one
 * line per page from. One authored sentence, two derived views, no third copy.
 *
 * The kind and the number come from the PLATE, which `check-card-order.mjs` already
 * names as the authority for both and already verifies. The corrections come from the
 * register's `data-sheet` tokens, which are stated on every entry and never inferred,
 * for the reason the register's own index states them: an index that silently misfiles
 * a correction is the worst bug this site can ship.
 *
 * ── IT WRITES BETWEEN MARKERS, AND THAT IS A DELIBERATE DEPARTURE ─────────────
 *
 * Star Stuff generates the whole of `whats-new.html` from a template inside its tool,
 * and its own CLAUDE.md records what that cost: a repo-wide sweep added a skip link to
 * all 197 pages, the next build rebuilt this one from the template, AND THE SKIP LINK
 * WAS GONE WITH THE TOOL REPORTING A CLEAN BUILD. A generated page does not conflict,
 * it reverts.
 *
 * So this follows `make-records.mjs` instead: the page is authored, its listing is
 * generated between two comments, and a sweep that touches every page touches this one
 * and keeps its edit. The cost is that the page's furniture is hand-kept like every
 * other page's, which is the same cost every other page here already pays.
 *
 * USAGE
 *     node tools/make-whats-new.mjs           # rewrite the listing and /feed.xml
 *     node tools/make-whats-new.mjs --check   # non-zero exit if it is stale
 *
 * Run it after mounting anything, BEFORE make-markdown.mjs — the listing is inside the
 * landmark, so `whats-new.md` is derived from this tool's output. `check-metadata.mjs`
 * runs it in that order and fails when the page is stale.
 *
 * Local dev tool. Netlify does not run it. Node 22+, no dependencies.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { decode } from './html.mjs';
import { GROUPS, COLLECTION_OF } from './pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = 'whats-new.html';
const START = '<!-- generated:arrivals:start -->';
const END = '<!-- generated:arrivals:end -->';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const longDate = (day) => {
  const [y, m, d] = day.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const COUNTS = ['no', 'once', 'twice', 'three times', 'four times', 'five times',
  'six times', 'seven times', 'eight times', 'nine times', 'ten times'];
const times = (n) => COUNTS[n] ?? `${n} times`;

/* ── the pages ─────────────────────────────────────────────────────────────────
 * Same discovery as make-markdown.mjs: every .html at the root that is content. The
 * error page is not content and has no address, so it cannot have arrived. */
const NOT_CONTENT = new Set(['404.html']);
const files = (await readdir(ROOT)).filter((f) => f.endsWith('.html') && !NOT_CONTENT.has(f)).sort();

/* The order a reader should meet the pages, flattened — the tiebreaker inside one
 * day. Two pages committed in the same commit have no chronological order at all, so
 * the only order that exists for them is the editorial one, which pages.mjs holds. */
const EDITORIAL = GROUPS.flatMap(([, slugs]) => slugs);

const pages = [];
const unborn = [];          // listed as arriving today, because git has never seen them
for (const f of files) {
  const html = await readFile(join(ROOT, f), 'utf8');
  const grab = (re) => (re.exec(html) || [])[1];
  const slug = f.replace(/\.html$/, '');

  const canonical = grab(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) throw new Error(`${f}: no rel=canonical, so there is no address to list`);
  const title = decode(grab(/<title>([^<]+)<\/title>/) ?? '')
    .replace(/\s+— Queering Earth$/, '').trim();
  const description = decode(grab(/<meta name="description" content="([^"]+)"/) ?? '');
  if (!title) throw new Error(`${f}: no title`);
  if (!description) throw new Error(`${f}: no meta description, so there is no line to list it with`);

  /* When this URL went live. */
  const iso = execFileSync('git',
    ['log', '--diff-filter=A', '--reverse', '--format=%aI', '--', f],
    { cwd: ROOT, encoding: 'utf8' }).split('\n')[0].trim();

  /* A PAGE BEING WRITTEN RIGHT NOW HAS NO COMMIT THAT ADDED IT, and refusing to list it
   * would mean no page could ever be mounted and listed in one pass. So an uncommitted
   * page arrives TODAY, loudly, and the next run after the commit takes git's answer.
   *
   * THIS IS SELF-HEALING RATHER THAN AN OVERRIDE, and that is the whole reason it is
   * allowed here. Nothing is written down: build on one day and commit on the next and
   * git disagrees, the next run silently corrects the listing, and check-metadata.mjs
   * reports the committed copy STALE in the meantime. A hand-kept date table would have
   * had to be right forever; this has to be right once, and says when it is guessing. */
  const guessed = !iso;
  /* LOCAL, NOT UTC. git's %aI is the author's own offset and the register is written in
   * local days, so toISOString() here dated a page 12 September while it was still the
   * 11th at the desk — a day ahead of the accession that mounts it. Caught on the first
   * run, which is the argument for running a new tool before believing it. */
  const now = new Date();
  const local = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const day = guessed ? local : iso.slice(0, 10);
  if (guessed) unborn.push(f);

  /* THE GATE. Both authored dates, where the page carries them, against the measured
   * one. A disagreement means the site is about to say two things about one day. */
  const stamp = grab(/<span class="qe-stamp-date">Accessioned <time datetime="([^"]+)"/);
  const prov = grab(/<p class="qe-provenance[^"]*">[\s\S]*?Mounted[\s\S]*?<time datetime="([^"]+)"/);
  for (const [what, authored] of [['accession stamp', stamp], ['provenance line', prov]]) {
    if (authored && authored !== day)
      throw new Error(`${f}: the ${what} says ${authored} and the commit that added the file `
        + `says ${day}. One of them is wrong, and until they agree this page cannot say either.`);
  }

  pages.push({
    slug, file: f, href: canonical.replace('https://queering.earth', '') || '/',
    title, description, day,
    rank: EDITORIAL.indexOf(slug),
    group: COLLECTION_OF.get(slug)?.group ?? null,
    collection: COLLECTION_OF.get(slug)?.collection ?? null,
  });
}

/* ── kind and number, from the plate ──────────────────────────────────────────── */
const indexHtml = await readFile(join(ROOT, 'index.html'), 'utf8');
const plate = new Map();
const gridStart = indexHtml.indexOf('<ul class="qe-plate-grid">');
if (gridStart < 0) throw new Error('index.html has no plate grid, so nothing says what kind a sheet is');
const grid = indexHtml.slice(gridStart, indexHtml.indexOf('</ul>', gridStart));
for (const m of grid.matchAll(
  /<a class="card" href="([^"]+)">[\s\S]*?<span class="qe-card-kind">([^<]+)<\/span>\s*<span class="qe-card-no">([^<]+)<\/span>/g)) {
  /* Two forms of the number on purpose: the raw one still carries `&nbsp;` and goes
   * into the page, where the plate's own markup uses it; the decoded one goes into the
   * feed, where `&nbsp;` is not one of XML's five predefined entities. */
  plate.set(m[1], { kind: decode(m[2]).trim(), no: m[3].trim(), noText: decode(m[3]).trim() });
}
if (!plate.size) throw new Error('the plate carded nothing — the card markup has changed shape');

/* ── corrections, from the register ───────────────────────────────────────────── */
const registerHtml = await readFile(join(ROOT, 'changelog.html'), 'utf8');
const mends = new Map();          // slug -> [{ id, day }], newest first
for (const m of registerHtml.matchAll(/<section class="qe-accession"[^>]*>([\s\S]*?)<\/section>/g)) {
  const sec = m[1];
  const dateRaw = (/<p class="qe-accession-date">([^<]+)<\/p>/.exec(sec) || [])[1] ?? '';
  const id = (/<h2 id="([^"]+)">/.exec(sec) || [])[1];
  const dm = /^\s*(\d{4})\s*&middot;\s*(\d{1,2})\s+([A-Za-z]+)/.exec(dateRaw);
  if (!id || !dm) throw new Error(`an accession has no addressed heading or no readable date: "${dateRaw}"`);
  const day = `${dm[1]}-${String(MONTHS.indexOf(dm[3]) + 1).padStart(2, '0')}-${String(+dm[2]).padStart(2, '0')}`;

  /* A CORRECTION IS `Re-determined` OR `Label corrected`, AND `Mounted` IS NOT ONE.
   * The register's four kinds are event kinds; only two of them are a page being put
   * right. `Cabinet` is housekeeping and is not a correction to any sheet either. */
  for (const e of sec.matchAll(/<div class="qe-entry qe-entry--(redet|label)"[^>]*data-sheet="([^"]*)"/g)) {
    for (const slug of e[2].split(/\s+/).filter(Boolean)) {
      if (!mends.has(slug)) mends.set(slug, []);
      mends.get(slug).push({ id, day });
    }
  }
}

/* ── group by day, newest first ───────────────────────────────────────────────── */
pages.sort((a, b) => (a.day === b.day ? a.rank - b.rank : a.day < b.day ? 1 : -1));
const days = [];
for (const p of pages) {
  if (!days.length || days[days.length - 1].day !== p.day) days.push({ day: p.day, items: [] });
  days[days.length - 1].items.push(p);
}

/* ── the listing ──────────────────────────────────────────────────────────────── */
const listing = days.map((d) => {
  const items = d.items.map((p) => {
    const card = plate.get(p.href);
    const mine = mends.get(p.slug) ?? [];

    /* The kind line. A sheet says what the plate says it is and carries its number;
     * a page that is not a reading says which drawer it is in, because it has no kind
     * and no number and a made-up one would be a gold join on a sheet nobody corrected. */
    const kind = card
      ? `<span class="qe-arrival-kind">${esc(card.kind)}</span> <span class="qe-arrival-no">${card.no}</span>`
      : `<span class="qe-arrival-kind qe-arrival-kind--cabinet">${p.group ? esc(p.group) : 'The front of the cabinet'}</span>`;

    /* The mend. Its words are the provenance line's own, so a reader meets one
     * vocabulary; the link lands on the most recent accession that did it, and the
     * sheet's own provenance line — one hop away through the title — carries a link
     * per correction. */
    const mend = mine.length
      ? `<a class="qe-arrival-mend" href="/changelog#${mine[0].id}">Corrected ${times(mine.length)} since</a>`
      : '<span class="qe-arrival-mend qe-arrival-mend--clean">Not yet corrected</span>';

    return `
        <li class="qe-arrival">
          <a class="qe-arrival-title" href="${p.href}">${esc(p.title)}</a>
          <p class="qe-arrival-sum">${esc(p.description)}</p>
          <p class="qe-arrival-meta">${kind} <span class="qe-arrival-sep" aria-hidden="true">&middot;</span> ${mend}</p>
        </li>`;
  }).join('');

  return `
      <section class="qe-arrival-day">
        <h3 id="d-${d.day}"><time datetime="${d.day}">${longDate(d.day)}</time> <a class="qe-anchor" href="#d-${d.day}"><span class="qe-sr">Link to this day</span></a></h3>
        <ul class="qe-arrivals">${items}
        </ul>
      </section>`;
}).join('');

const block = `${START}
    <div class="qe-arrival-list">${listing}
    </div>
    ${END}`;

/* ── /feed.xml ─────────────────────────────────────────────────────────
 * The same list as the page, in RSS. Built in this pass and from this data, so the two
 * cannot disagree — which is the whole reason the page and the feed come out of one
 * tool rather than two.
 *
 * `lastBuildDate` IS THE NEWEST ITEM'S DATE AND NOT THE CLOCK. A feed that changed on
 * every run would report STALE seconds after a clean write, which is the fault Star
 * Stuff's derived build hit for exactly this reason. Nothing here is a function of now.
 *
 * Entities are decoded to real characters before XML escaping: `&mdash;` is NOT one of
 * XML's five predefined entities and a reader is entitled to reject the document over
 * it. `decode()` is the shared table in html.mjs, so a letter taught to one generator
 * is taught to this one. */
const xmlEsc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const asDate = (day) => {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
};
const ORIGIN = 'https://queering.earth';

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Queering Earth \u2014 what has arrived</title>
    <link>${ORIGIN}/whats-new</link>
    <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Every page in the cabinet as it arrives \u2014 the sheets and the pages that are not sheets, newest first. The register's own accessions, including every correction, are a separate feed at ${ORIGIN}/register.xml. Generated from the pages themselves by tools/make-whats-new.mjs.</description>
    <language>en</language>
    <copyright>CC BY-SA 4.0</copyright>
    <lastBuildDate>${asDate(pages[0]?.day ?? days[0].day).toUTCString()}</lastBuildDate>
${pages.map((p) => {
  const card = plate.get(p.href);
  const what = card ? `${card.kind} \u00b7 ${card.noText}` : (p.group ?? 'The front of the cabinet');
  return `    <item>
      <title>${xmlEsc(p.title)}</title>
      <link>${ORIGIN}${p.href}</link>
      <guid isPermaLink="true">${ORIGIN}${p.href}</guid>
      <pubDate>${asDate(p.day).toUTCString()}</pubDate>
      <category>${xmlEsc(what)}</category>
      <description>${xmlEsc(p.description)}</description>
    </item>`;
}).join('\n')}
  </channel>
</rss>
`;

/* ── write, or check ──────────────────────────────────────────────────────────── */
const page = await readFile(join(ROOT, PAGE), 'utf8');
const a = page.indexOf(START);
const b = page.indexOf(END);
if (a < 0 || b < 0) throw new Error(`${PAGE} has no ${START} / ${END} pair to write between`);
const next = page.slice(0, a) + block + page.slice(b + END.length);

const feedPath = join(ROOT, 'feed.xml');
const feedNow = await readFile(feedPath, 'utf8').catch(() => null);

if (process.argv.includes('--check')) {
  let bad = false;
  if (next !== page) { console.error(`  STALE  ${PAGE} — run: node tools/make-whats-new.mjs`); bad = true; }
  if (feedNow !== feed) { console.error('  STALE  feed.xml — run: node tools/make-whats-new.mjs'); bad = true; }
  if (bad) process.exit(1);
  console.log(`  ok     ${PAGE} and feed.xml are current (${pages.length} pages, ${days.length} days)`);
} else {
  await writeFile(join(ROOT, PAGE), next);
  await writeFile(feedPath, feed);
  console.log(`\n  ${pages.length} page(s) over ${days.length} day(s), newest first\n`);
  for (const d of days)
    console.log(`  ${longDate(d.day).padEnd(20)} ${d.items.map((p) => p.slug).join(', ')}`);
  const mended = pages.filter((p) => (mends.get(p.slug) ?? []).length).length;
  console.log(`\n  ${mended} of ${pages.length} pages have been corrected since they arrived.`);
  if (unborn.length) {
    console.log(`\n  NOT YET COMMITTED, so dated today rather than from git:`);
    for (const f of unborn) console.log(`    ${f}`);
    console.log('  Commit them, then run this again — git\'s answer wins and the listing');
    console.log('  will correct itself if the two days differ.');
  }
  console.log(`\n  ${'feed.xml'.padEnd(20)} ${(Buffer.byteLength(feed) / 1024).toFixed(1)} KB  ${pages.length} item(s)`);
  console.log(`\nWrote the listing into ${PAGE} between the markers, and /feed.xml beside it.`);
  console.log('Run make-markdown.mjs next — whats-new.md is derived from what this just wrote.');
}
