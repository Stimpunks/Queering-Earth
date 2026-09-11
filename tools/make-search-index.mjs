#!/usr/bin/env node
/**
 * make-search-index.mjs — derive /search-index.json, the only thing /search reads.
 *
 * WHY THIS EXISTS
 * Search on a static site is either somebody else's server or a file. This site makes
 * no third-party request and /privacy says so in a gate, so it is a file. Everything
 * else follows from the two rules the rest of the derived layer already follows:
 * nothing here is typed, and every record comes from the page's own `main` landmark —
 * the same landmark the SKS mirror and the Markdown siblings read, so a result can
 * never quote a sentence the page does not contain.
 *
 * THE UNIT IS A SECTION, NOT A PAGE. Every `h2` on this site carries an authored id,
 * bought and paid for by the "addresses are cheap" rule. That investment is what makes
 * a search result worth landing on: `/wild-nights#compass` puts a reader at the
 * paragraph, and a bare `/wild-nights` puts them at the top of nine thousand words.
 *
 * A QUOTATION IS NEVER CROPPED, AND THAT IS THE WHOLE POINT OF THIS FILE.
 * The characteristic failure here is not an invented source, it is a TIGHTENED one — a
 * definition trimmed to fit, the attribution left attached. A conventional search
 * snippet is a trimming machine: twenty words around the match, an ellipsis either
 * side, no maker, no citation. Pointed at a site made of quotations it manufactures
 * exactly the artefact ATTRIBUTIONS.md exists to prevent, at a rate of one per result.
 *
 * So quoted text is indexed apart from ours:
 *   · A `blockquote` becomes one whole record with its `cite` and its `figcaption`
 *     carried along, and /search renders all three or none. It is never windowed.
 *   · An inline `q` stays in our prose, because its attribution is the sentence
 *     around it — but its character range is recorded, and the snippet window is
 *     widened to cover any quotation it would otherwise cut into.
 *
 * WHAT IS DELIBERATELY LEFT OUT
 *   · `del` — the struck half of a restored attribution. Plain text has no vocabulary
 *     for "this is what we got WRONG", so an indexed `del` would surface a corrected
 *     attribution as though it were the live one. The correction is still findable:
 *     the register describes it in ordinary prose, which is indexed, and that is the
 *     right place to land. (Checked rather than assumed — the site's one `del` is
 *     PROSPERO, and /the-tempest says Prospero thirteen times in prose besides.)
 *   · `ul.qe-plate-grid` — the home page's eight cards. Every word in them is another
 *     sheet's title, so indexing them makes each sheet match twice and the worse of
 *     the two matches is the one that is not the sheet. Same reasoning that puts
 *     `.qe-elsewhere` outside the landmark. The plate is READ here, though — as the
 *     manifest it is. It is where each sheet's number, kind, maker line and one-line
 *     note come from, so a result card can be headed "No. 6 · The Swell and the Dwell,
 *     Emily Dickinson" without one word of it being typed a second time.
 *   · `svg`, `.qe-anchor`, `.qe-sr`, `nav.qe-contents`, `nav.qe-sheet-index` — the same
 *     furniture make-markdown.mjs drops, for the same reasons.
 *   · /search itself. A search page in its own index is noise.
 *
 * THE REGISTER IS FILED APART. /changelog is 25,359 words, 28% of the site, and mostly
 * accession prose — flat-ranked it would bury the sheets on any query naming a maker.
 * Its records are `.qe-entry` units carrying the entry's own kind chip and name, plus
 * one record per accession for its notes, and /search reports them under their own
 * heading below the sheets. Front matter and back matter, again.
 *
 * Run it by hand like make-images.py, commit the output, and check-metadata.mjs fails
 * when it is stale.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { decode, attrs, tokenize, stripComments, mainOf } from './html.mjs';
import { GROUPS, REGISTER } from './pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://queering.earth';

/* Not content, or not indexable. 404 has no address; search must not index itself. */
const NOT_CONTENT = new Set(['404.html', 'search.html']);

/* Subtrees that never reach the index. `del` is the editorial one — see the head note. */
const SKIP_TAGS = new Set(['svg', 'script', 'style', 'button', 'del']);
const SKIP_CLASS = new Set(['qe-anchor', 'qe-sr', 'qe-contents', 'qe-sheet-index', 'qe-entry-index', 'qe-plate-grid',
  /* Controls, not sentences. Inert without their script and empty in the served HTML. */
  'qe-find', 'qe-found',
  /* THE MASTHEAD IS THE SHEET'S OWN NAMEPLATE, and indexing it made every opener's
     snippet read "Queering Earth Sheet · a reading The Army of the Upright Specimen
     On Being Ill…" — the home link, the kicker and the title run together as though
     they were a sentence. Nothing is lost: the title is already the page's title and
     carries a weight of 6, the kicker is already the page's kind, and the home link is
     navigation, which is the one thing this landmark is supposed not to contain. The
     herbarium label BELOW the masthead stays in, because Specimen, Maker and First
     printed are facts about the object and among the best things to search for. */
  'qe-masthead',
  /* THE ACCESSION STAMP IS THE MASTHEAD FAILURE AGAIN, one component further down.
     Indexed, it puts eight near-identical records carrying the site's own name into
     the aid — "Queering Earth Sheet No. 4 Accessioned 8 Sep 2026" — which is what a
     search for "Queering Earth" would then mostly return. Nothing is lost, for the
     same reason the masthead loses nothing: the provenance line it sits beside says
     "Mounted 8 September 2026" in ordinary prose and IS indexed, and every sheet
     number is written out across the register's own entries. A stamp is the sheet
     restating its accession in the object's own form, not a new fact to find. It
     stays in the Markdown sibling, where there is no ranking to crowd. */
  'qe-stamp']);

/* Anything that separates words. Everything else is inline and must not, or
 * "port</em><em>Done" becomes one token. */
const BLOCK = new Set(['p', 'div', 'section', 'header', 'footer', 'article', 'aside',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot',
  'tr', 'th', 'td', 'caption', 'nav', 'hr', 'br', 'img', 'main', 'picture', 'source',
  /* INDEXED, NOT SKIPPED. /what-is-settled carries a shell block, and a searcher
     looking for `netlify` or a hook name should find the page that runs it. The
     alternative was the skip list, which would have been the quieter choice and the
     wrong one: a command in the decision log is content, and this is the file that
     refuses to let a copy say less than its page. */
  /* A DISCLOSURE IS FLATTENED, NOT DROPPED. No page inside the landmark uses one today
     — Sheet No. 11's content warning did for a draft and does not now, because a closed
     details leaves child rects in the layout and check-overlap.mjs reads them as text on
     text on paper. These stay taught anyway: the failure mode this converter is built
     against is silently dropping content, and a summary dropped from a content warning
     is the worst version of that. Block boundaries, so the summary lands on its own line
     and the detail follows it whole. */
  'details', 'summary',
  'pre']);

/* Inline elements this prose actually uses. Unknown tags THROW, for make-markdown's
 * reason: a converter that silently drops an element is how a derived copy comes to
 * say less than the page. */
const INLINE = new Set(['strong', 'b', 'em', 'i', 'cite', 'dfn', 'var', 'code', 'kbd',
  'q', 'ins', 'span', 'time', 'small', 'abbr', 'mark', 'sup', 'sub', 'a']);

/* ── reading one page ─────────────────────────────────────────────────────────── */

/**
 * Walk a page's main landmark into records.
 *
 * The walker has one piece of state worth naming: `sink`, which says where text is
 * currently going. Prose, a quotation, a quotation's source line, or a register
 * entry's name are four different destinations, and a `figcaption` is the interesting
 * case — it is a source line when its figure held a quotation and ordinary prose when
 * it captioned a plate. The figure stack knows which, because on these pages the
 * blockquote always precedes the caption.
 */
function readPage(html, file, { isRegister }) {
  const tokens = tokenize(stripComments(mainOf(html, file)));
  const records = [];

  let sectionId = '', sectionHeading = '', pendingId = '';
  const blank = (extra) => ({ id: sectionId, heading: sectionHeading, text: '', quoted: [], quotes: [], ...extra });
  let cur = blank();

  const commit = () => {
    cur.text = cur.text.replace(/\s+$/, '');   // TRAILING ONLY: a leading trim shifts every fence
    if (cur.text || cur.quotes.length || cur.name) records.push(cur);
  };

  let sink = 'prose';
  let heading = '', quote = '', source = '', name = '';
  let quoteCite = '';
  const figures = [];              // { quotes: [indices into cur.quotes] }
  let entryDepth = -1, divDepth = 0;   // register: which </div> closes the entry
  let verseDepth = -1, verseLabel = '', inVerseLabel = false;   // our own verse: likewise
  const qBufs = [];                // open inline quotations: { at, text }, the second
                                   // field purely so the offset can be proved rather than trusted
  let skipDepth = 0, skipTag = null;

  /* PROSE IS CANONICAL AS IT IS BUILT, and this is the whole reason the ranges can be
     trusted. The first version collapsed whitespace and trimmed at commit time — after
     the inline-quotation offsets had been recorded against the uncollapsed string — so
     every fence sat somewhere between four and fifteen characters downstream of the
     quotation it was supposed to protect, and the crop would have cut into the very
     thing the fence exists to keep whole. Nothing may rewrite this string later. */
  const write = (s) => {
    if (sink !== 'prose') {
      if (sink === 'quote') quote += s;
      else if (sink === 'source') source += s;
      else if (sink === 'heading') heading += s;
      else if (sink === 'name') name += s;
      return;
    }
    if (!cur.text || /\s$/.test(cur.text)) s = s.replace(/^\s+/, '');
    if (!s) return;
    cur.text += s;
    for (const b of qBufs) b.text += s;   // the proof, kept alongside
  };
  /* A newline inside a quotation is a line of verse or a paragraph and must survive;
     everywhere else a boundary is just a space. */
  const gap = () => write(sink === 'quote' ? '\n' : ' ');

  for (const t of tokens) {
    if (skipDepth > 0) {
      if (!t.text && t.tag === skipTag) skipDepth += t.close ? -1 : t.self ? 0 : 1;
      if (skipDepth === 0) skipTag = null;
      continue;
    }

    if (t.text !== undefined) {
      if (!/\S/.test(t.text)) { if (/\s/.test(t.text)) write(' '); continue; }
      write(decode(t.text).replace(/[^\S\n]+/g, ' '));
      continue;
    }

    const a = attrs(t.raw);
    const cls = (a.class || '').split(/\s+/).filter(Boolean);

    if (!t.close && (SKIP_TAGS.has(t.tag) || cls.some((c) => SKIP_CLASS.has(c)))) {
      if (!t.self) { skipDepth = 1; skipTag = t.tag; }
      continue;
    }

    if (t.tag === 'div') divDepth += t.close ? -1 : 1;

    /* ── the register's own unit */
    if (isRegister && !t.close && cls.includes('qe-entry')) {
      commit();
      cur = blank({ kind: '', name: '', sheets: (a['data-sheet'] || '').split(/\s+/).filter(Boolean) });
      entryDepth = divDepth;
      continue;
    }
    if (isRegister && t.close && t.tag === 'div' && entryDepth === divDepth + 1) {
      commit();
      cur = blank();
      entryDepth = -1;
      continue;
    }
    if (isRegister && cls.includes('qe-tag') && !t.close) { sink = 'name'; name = ''; continue; }
    if (isRegister && cls.includes('qe-entry-name') && !t.close) { cur.kind = name.trim(); sink = 'name'; name = ''; continue; }
    if (isRegister && t.close && t.tag === 'span' && sink === 'name') {
      if (cur.kind) { cur.name = name.trim(); sink = 'prose'; }
      continue;
    }

    /* A CLOSING TAG CARRIES NO ATTRIBUTES, so the id has to be held from the opening
       one. Reading it off the close silently gave every register entry an empty
       anchor and sent 88 results to the top of a 25,000-word page. */
    if (t.tag === 'h2') {
      if (!t.close) {
        if (!('id' in a)) throw new Error(`${file}: an h2 in the landmark has no id — a section nobody can link to is a result nobody can land on`);
        commit(); pendingId = a.id; sink = 'heading'; heading = '';
      } else {
        sectionId = pendingId;
        sectionHeading = heading.replace(/\s+/g, ' ').trim();
        sink = 'prose'; cur = blank();
      }
      continue;
    }

    /* OUR OWN VERSE IS STILL VERSE. `div.qe-verse` holds the reply poem on
       /wild-nights — Ryan's and Helen's words, not a quotation, so the never-crop rule
       does not reach it on its own. It reached it anyway: flattened into prose, its
       32 lines ran together into one paragraph and a crop landed mid-line. A poem
       misrepresented as a paragraph is the same class of defect as a quotation
       misrepresented by a window, and the fact that these words are ours makes it OUR
       poem being mangled rather than somebody else's. So it is a whole block like a
       quotation, keeping its line breaks, named by the label it already carries. */
    if (t.tag === 'div' && (cls.includes('qe-verse') || verseDepth >= 0)) {
      if (!t.close && cls.includes('qe-verse')) {
        sink = 'quote'; quote = ''; quoteCite = ''; verseLabel = '';
        verseDepth = divDepth;
        continue;
      }
      if (t.close && verseDepth === divDepth + 1) {
        var vt = quote.replace(/[^\S\n]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
        if (vt) cur.quotes.push({ text: vt, cite: '', source: '', label: verseLabel.trim() });
        verseDepth = -1; sink = 'prose';
        continue;
      }
    }
    /* The label is the block's own name, authored on the sheet. Out of the verse text
       and into the record, so /search can call the block what the sheet calls it.
       A CLOSING TAG CARRIES NO ATTRIBUTES — the second time in this file. Matching the
       class on the close never fires, so the sink stayed on the label and swallowed all
       32 lines of the poem, and the block came out empty rather than wrong, which is
       why it showed up as nothing rather than as a mistake. Held open by a flag, like
       the heading above. */
    if (cls.includes('qe-verse-label') && verseDepth >= 0 && !t.close) { sink = 'name'; name = ''; inVerseLabel = true; continue; }
    if (inVerseLabel && t.close && t.tag === 'span') { verseLabel = name; sink = 'quote'; inVerseLabel = false; continue; }

    if (t.tag === 'blockquote') {
      if (t.close) {
        const text = quote.replace(/[^\S\n]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
        if (text) {
          cur.quotes.push({ text, cite: quoteCite, source: '' });
          if (figures.length) figures[figures.length - 1].quotes.push(cur.quotes.length - 1);
        }
        sink = 'prose';
      } else { sink = 'quote'; quote = ''; quoteCite = a.cite || ''; }
      continue;
    }

    if (t.tag === 'figure') {
      if (t.close) figures.pop(); else figures.push({ quotes: [] });
      gap();
      continue;
    }

    if (t.tag === 'figcaption') {
      const fig = figures[figures.length - 1];
      const isSource = fig && fig.quotes.length;
      if (!t.close) {
        if (isSource) { sink = 'source'; source = ''; } else gap();
      } else if (isSource) {
        const s = source.replace(/\s+/g, ' ').trim();
        /* One caption, several blockquotes: the Hogenkamp figure quotes two paragraphs
           as one blockquote, but /flower-codes stacks two. The caption cites all of them. */
        for (const i of fig.quotes) if (!cur.quotes[i].source) cur.quotes[i].source = s;
        fig.quotes.length = 0;
        sink = 'prose';
      } else gap();
      continue;
    }

    /* An inline quotation stays in our prose — its attribution is the sentence around
       it — but the window that crops that prose must not cut through it. */
    if (t.tag === 'q' && sink === 'prose') {
      if (t.close) {
        const q = qBufs.pop();
        if (q) {
          const to = cur.text.length;
          /* THE RANGE PROVES ITSELF. Slicing the finished prose at the recorded offsets
             must return exactly the characters that were written while the quotation was
             open. Anything else means something rewrote the string behind the offset, and
             a fence in the wrong place is worse than no fence: it guarantees the crop
             lands inside a quotation while reporting that it did not. */
          if (cur.text.slice(q.at, to) !== q.text)
            throw new Error(`${file}: an inline quotation's fence does not match its text — ` +
              `recorded [${q.at},${to}] as ${JSON.stringify(cur.text.slice(q.at, to))} ` +
              `but wrote ${JSON.stringify(q.text)}`);
          if (q.text.trim()) cur.quoted.push([q.at, to]);
        }
      } else qBufs.push({ at: cur.text.length, text: '' });
      continue;
    }

    /* A line of verse. `span.l` is a line break inside a stanza, not a word boundary. */
    if (t.tag === 'span' && cls.includes('l') && !t.close && sink === 'quote') {
      if (quote.trim()) write('\n');
      continue;
    }

    if (INLINE.has(t.tag)) continue;
    if (!BLOCK.has(t.tag)) throw new Error(`${file}: unhandled tag ${t.tag} — teach the walker or it will silently drop content`);
    gap();
  }

  commit();
  return records;
}

/* ── the home plate, read as the manifest it is ───────────────────────────────── */

/** Each card's kind, number, maker line and note, keyed by the slug it points at. */
function readPlate(html) {
  const grid = /<ul class="qe-plate-grid">([\s\S]*?)<\/ul>/.exec(stripComments(html));
  if (!grid) throw new Error('index.html has no plate grid — the result cards get their numbers from it');
  const text = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
  const cards = new Map();
  for (const m of grid[1].matchAll(/<a class="card" href="([^"]+)">([\s\S]*?)<\/a>/g)) {
    const grab = (c) => {
      const g = new RegExp(`<span class="${c}">([\\s\\S]*?)</span>`).exec(m[2]);
      return g ? text(g[1]) : '';
    };
    cards.set(m[1].replace(/^\//, ''), {
      kind: grab('qe-card-kind'), no: grab('qe-card-no'),
      sub: grab('qe-card-sub'), note: grab('qe-card-note'),
    });
  }
  if (!cards.size) throw new Error('the plate grid parsed to zero cards');
  return cards;
}

/* ── build ────────────────────────────────────────────────────────────────────── */

const files = (await readdir(ROOT)).filter((f) => f.endsWith('.html') && !NOT_CONTENT.has(f)).sort();
const plate = readPlate(await readFile(join(ROOT, 'index.html'), 'utf8'));

const pages = [];
const records = [];

for (const f of files) {
  const html = await readFile(join(ROOT, f), 'utf8');
  const grab = (re) => (re.exec(html) || [])[1];
  const slug = f.replace(/\.html$/, '');
  const canonical = grab(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) throw new Error(`${f}: no rel=canonical, so a result has no address to link to`);

  const card = plate.get(slug) ?? {};
  const isRegister = slug === REGISTER;

  pages.push({
    slug,
    url: canonical.slice(ORIGIN.length) || '/',
    title: decode(grab(/<title>([^<]+)<\/title>/)).replace(/\s+—\s*Queering Earth$/, ''),
    description: decode(grab(/<meta name="description" content="([^"]+)"/) ?? ''),
    /* The card's own words where the plate has one, the page's kicker where it does
       not. Neither is typed here; both already exist and are read. */
    kind: card.kind || decode(grab(/<p class="qe-kicker">([^<]+)<\/p>/) ?? '').replace(/^Sheet\s*·\s*/, '').trim(),
    no: card.no || '',
    sub: card.sub || '',
    note: card.note || '',
    register: isRegister,
  });

  const page = pages.length - 1;
  for (const r of readPage(html, f, { isRegister })) records.push({ page, ...r });
}

const index = {
  generated_by: 'tools/make-search-index.mjs, from each page\'s own main landmark. Do not hand-edit.',
  licence: 'CC-BY-SA-4.0',
  attribution_ledger: `${ORIGIN}/changelog`,
  origin: ORIGIN,
  pages,
  records,
};

await writeFile(join(ROOT, 'search-index.json'), JSON.stringify(index) + '\n');

/* ── the manifest written into /search ────────────────────────────────────────
 *
 * WHY THE SEARCH PAGE CARRIES A LIST AT ALL
 * The searching runs in the reader's browser, which makes /search the site's one
 * client-rendered page — the case CLAUDE.md names and tells us to prefer away from,
 * because the SKS mirror takes content from the landmark and a landmark holding an
 * empty results div says nothing. It is also the case a reader with no JavaScript
 * lands in. Both get the same answer: the served HTML carries the whole cabinet,
 * page by page and section by section, as ordinary links.
 *
 * WRITTEN IN BETWEEN MARKERS, NOT TYPED. A hand-kept list of every heading on the
 * site is the second copy this repo is organised against, and it is the copy that
 * would rot — a reworded heading would leave the finding aid pointing at a name the
 * page no longer uses. The marker idiom is make-fonts.mjs's, and check-metadata.mjs
 * catches a stale one the same way it catches a stale .md.
 *
 * THE REGISTER CONTRIBUTES ITS ACCESSIONS, NOT ITS ENTRIES. Eighteen dated headlines
 * are a finding aid; eighty-eight entry names underneath them are the register
 * reprinted, and the register already files those itself at its own foot.
 */
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MARK_OPEN = '<!-- BEGIN generated manifest — tools/make-search-index.mjs writes this. Do not edit. -->';
const MARK_CLOSE = '<!-- END generated manifest -->';

let manifest = '\n';
const byslug = new Map(pages.map((p, i) => [p.slug, i]));

for (const [groupName, slugs] of GROUPS) {
  const inGroup = slugs.filter((slug) => byslug.has(slug));
  if (!inGroup.length) continue;   // /search is in a group and out of its own index
  manifest += `  <h3 class="qe-manifest-group">${esc(groupName)}</h3>\n  <ul class="qe-manifest">\n`;

  for (const slug of inGroup) {
    const i = byslug.get(slug);
    const p = pages[i];
    manifest += `    <li>\n      <p class="qe-manifest-head">`;
    if (p.no) manifest += `<span class="qe-manifest-no">${esc(p.no)}</span> `;
    manifest += `<a href="${p.url}">${esc(p.title)}</a>`;
    if (p.kind) manifest += ` <span class="qe-manifest-kind">${esc(p.kind)}</span>`;
    manifest += `</p>\n`;
    if (p.sub) manifest += `      <p class="qe-manifest-sub">${esc(p.sub)}</p>\n`;

    /* THE REGISTER IS POINTED AT, NOT REPRINTED, and this is the register's own
       finding. Its accession headlines are sentences by design — they average 148
       characters — which is exactly why /changelog refused a contents list and grew
       a back-matter index instead. Listing all eighteen here would import that
       defect into the one page whose whole job is to be scannable, and it would
       reprint a list the register already keeps two better ways. */
    if (slug === REGISTER) {
      const n = records.filter((r) => r.page === i && r.kind).length;
      manifest += `      <p class="qe-manifest-sub">${n} entries across ` +
        `${new Set(records.filter((r) => r.page === i).map((r) => r.id)).size} accessions, ` +
        `each one dated on <a href="${p.url}">the register itself</a> and filed by sheet in ` +
        `<a href="${p.url}#qe-index-h">its index</a>. They are searchable above.</p>\n`;
      manifest += `    </li>\n`;
      continue;
    }

    const seen = new Set();
    manifest += `      <ul class="qe-manifest-sections">\n`;
    for (const r of records) {
      if (r.page !== i || !r.id || seen.has(r.id)) continue;
      seen.add(r.id);
      /* ALWAYS the page's own address, never a bare fragment. Special-casing the home
         page to '' produced "#what-this-is", which from /search resolves to /search.
         CLAUDE.md writes that address out in full for this reason: /#what-grows-here. */
      manifest += `        <li><a href="${p.url}#${r.id}">${esc(r.heading)}</a></li>\n`;
    }
    manifest += `      </ul>\n    </li>\n`;
  }
  manifest += '  </ul>\n';
}
manifest += '  ';

const searchPath = join(ROOT, 'search.html');
const searchHtml = await readFile(searchPath, 'utf8');
const open = searchHtml.indexOf(MARK_OPEN);
const close = searchHtml.indexOf(MARK_CLOSE);
if (open < 0 || close < 0 || close < open)
  throw new Error('search.html has lost its manifest markers — the finding aid is written between them');
await writeFile(searchPath,
  searchHtml.slice(0, open + MARK_OPEN.length) + manifest + searchHtml.slice(close));

/* ── report ───────────────────────────────────────────────────────────────────── */
const bytes = Buffer.byteLength(JSON.stringify(index));
const words = records.reduce((n, r) => n + r.text.split(/\s+/).filter(Boolean).length, 0);
const quotes = records.reduce((n, r) => n + r.quotes.length, 0);
const inline = records.reduce((n, r) => n + r.quoted.length, 0);

console.log(`\n  ${pages.length} page(s) -> ${records.length} record(s)\n`);
for (const p of pages) {
  const mine = records.filter((r) => pages[r.page] === p);
  console.log(`  ${p.slug.padEnd(24)} ${String(mine.length).padStart(3)} record(s)  ` +
              `${String(mine.reduce((n, r) => n + r.quotes.length, 0)).padStart(3)} quotation(s)`);
}
console.log(`\n  ${words.toLocaleString()} words of ours, ${quotes} whole quotation(s) kept whole, ` +
            `${inline} inline quotation(s) fenced off from the crop`);
console.log(`  search-index.json  ${(bytes / 1024).toFixed(1)} KB uncompressed\n`);
console.log('Wrote the search index. Commit it.');
