#!/usr/bin/env node
/**
 * make-markdown.mjs — derive the Markdown source endpoints, /llms.txt and /llms-full.txt.
 *
 * WHY THIS EXISTS
 * The spec's `markdown-source-endpoints` and `/llms.txt` items both want the site's
 * prose available as Markdown so an agent fetches source instead of parsing HTML.
 * Both are `recommended`. Shipping them naively would break the strongest rule in
 * `CLAUDE.md`: **two copies of the same words drift, and the accessible one is always
 * the copy that rots.** A hand-written `.md` beside every sheet is exactly that.
 *
 * So nothing here is typed. Every `.md` file, and both index files, are DERIVED from
 * the page's own `<main>` landmark — the same landmark the SKS mirror reads, so the
 * Markdown and the mirror can never disagree about what a page says. This is the
 * `make-images.py` pattern: a tool run by hand, its output committed, and a gate
 * (`check-markdown.mjs`) that fails when the output is stale.
 *
 * WHAT IT IS NOT
 * It is not a general HTML-to-Markdown converter and must not become one. It handles
 * the element vocabulary these twelve pages actually use, and THROWS on a tag it does
 * not know rather than silently dropping content. A converter that quietly discards an
 * element is how a Markdown copy comes to say less than the page — which is the drift
 * this file exists to prevent, arriving by a different door.
 *
 * WHAT IS DELIBERATELY DROPPED
 *   - `<svg>` — the botanical art is decoration; its aria-label is for a screen reader
 *     on the page, not a fact about the reading.
 *   - `.qe-anchor` and `.qe-sr` — the section mark and its screen-reader name are
 *     navigation furniture, and `§ Link to this section` in prose is noise.
 *   - `nav.qe-contents` — derived at runtime from the page's own headings, so it is
 *     empty in the served HTML and would be a second copy of the headings if it were not.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { decode, attrs, tokenize, stripComments } from './html.mjs';
import { GROUPS } from './pages.mjs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://queering.earth';

/* The entity table, the tokenizer and attrs() live in ./html.mjs, shared with
 * make-search-index.mjs. One table, so a letter taught to one tool is taught to both. */

const escapeMd = (s) => s.replace(/([\\`*_[\]])/g, '\\$1');

/* Inline elements wrap text; block elements break it. Anything else throws.
 *
 * `kind` exists because emphasis nests in this prose and Markdown's does not. A
 * <cite> inside a <figcaption> produced `*Virginia Woolf, *On Being Ill*, 1930.*` —
 * four asterisks with no unambiguous reading, so the citation rendered wrong in the
 * one place a citation must not. Markers are emitted only on the 0->1 and 1->0
 * transitions, tracked per kind, so the outermost wins and the inner is absorbed. */
const INLINE = {
  strong: { kind: 'strong' }, b: { kind: 'strong' },
  em: { kind: 'em' }, i: { kind: 'em' }, cite: { kind: 'em' },
  dfn: { kind: 'em' }, var: { kind: 'em' },
  code: { kind: 'code' }, kbd: { kind: 'code' },
  q: { open: '\u201c', close: '\u201d' },
  /* A CORRECTION KEEPS ITS HTML. Markdown has `~~strikethrough~~` and no counterpart
   * for <ins>, so a del/ins pair would flatten into "old new" with nothing saying which
   * is which. On this site that pair is `<del>PROSPERO</del><ins>Miranda, First Folio,
   * 1623</ins>` — a restored attribution, the kintsugi seam, the single most important
   * distinction the prose makes. Markdown permits inline HTML, so these stay elements
   * rather than lose the difference between what we got wrong and what is true. */
  del: { open: '<del>', close: '</del>' }, ins: { open: '<ins>', close: '</ins>' },
  span: {}, time: {}, small: {}, abbr: {}, mark: {},
  sup: { open: '^' }, sub: { open: '~' },
};
const MARK = { em: '*', strong: '**', code: '`' };
const SKIP_TAGS = new Set(['svg', 'script', 'style', 'button']);
const BLOCK = new Set(['p', 'div', 'section', 'header', 'footer', 'article', 'aside',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot',
  'tr', 'th', 'td', 'caption', 'nav', 'hr', 'br', 'img', 'main', 'a', 'colgroup', 'col',
  'picture', 'source']);

/** Convert one <main> inner HTML to Markdown. */
function toMarkdown(html, file) {
  const tokens = tokenize(stripComments(html));

  let out = '';
  let skipDepth = 0, skipTag = null;
  const stack = [];
  const listStack = [];          // { ordered, n }
  let inHeading = 0, quoteDepth = 0, link = null, cells = null, rowIsHeader = false, tableDepth = 0;
  const depth = { em: 0, strong: 0, code: 0 };

  const atLineStart = () => out === '' || out.endsWith('\n');
  const nl = (n) => { const have = /\n*$/.exec(out)[0].length; out += '\n'.repeat(Math.max(0, n - have)); };
  const prefix = () => '> '.repeat(quoteDepth) + (listStack.length ? '  '.repeat(listStack.length - 1) : '');

  for (const t of tokens) {
    if (skipDepth > 0) {
      if (!t.text && t.tag === skipTag) skipDepth += t.close ? -1 : t.self ? 0 : 1;
      if (skipDepth === 0) skipTag = null;
      continue;
    }

    if (t.text !== undefined) {
      let s = decode(t.text);
      if (!/\S/.test(s)) { if (!atLineStart() && /\s/.test(s)) out += ' '; continue; }
      s = s.replace(/\s+/g, ' ');
      if (atLineStart()) { s = s.replace(/^ /, ''); out += prefix(); }
      out += cells ? s : escapeMd(s);
      continue;
    }

    const a = attrs(t.raw);
    const cls = (a.class || '').split(/\s+/);

    // Subtrees that never reach the Markdown.
    /* `.qe-find` and `.qe-found` join the contents nav for the same reason it is here:
     * both are empty or inert in the served HTML, and neither has a Markdown
     * counterpart. A search field is a control, not a sentence — rendering it as one
     * would put a placeholder and a button label into the prose an agent fetches, and
     * the thing it actually searches is listed in full further down the same page. */
    if (!t.close && (SKIP_TAGS.has(t.tag) || cls.includes('qe-anchor') || cls.includes('qe-sr') ||
        cls.includes('qe-find') || cls.includes('qe-found') ||
        (t.tag === 'nav' && cls.includes('qe-contents')))) {
      if (!t.self) { skipDepth = 1; skipTag = t.tag; }
      continue;
    }

    if (INLINE[t.tag]) {
      const spec = INLINE[t.tag];
      let mark = '';
      if (spec.kind) {
        // Only the outermost pair of a given kind writes its marker.
        if (t.close) { depth[spec.kind]--; if (depth[spec.kind] === 0) mark = MARK[spec.kind]; }
        else { if (depth[spec.kind] === 0) mark = MARK[spec.kind]; depth[spec.kind]++; }
      } else {
        mark = (t.close ? spec.close : spec.open) ?? '';
      }
      if (mark) { if (atLineStart() && !t.close) out += prefix(); out += mark; }
      continue;
    }

    if (!BLOCK.has(t.tag)) throw new Error(`${file}: unhandled tag <${t.tag}> — teach the converter or it will silently drop content`);

    switch (t.tag) {
      // <picture> is a wrapper and <source> is a void element. NEITHER goes through the
      // skip machinery: that tracks a closing tag, and `<source>` never has one, so
      // skipping it would swallow the rest of the document. They emit nothing and the
      // <img> inside the picture produces the Markdown image, as it did before.
      case 'picture': break;
      case 'source': break;
      case 'br':
        // A newline inside a table cell ends the row, so a <br> in a <td> silently
        // split one line of Dickinson across two rows and left a one-pipe orphan.
        // GFM reads <br> as a line break inside a cell; outside a table it is a newline.
        if (cells !== null) out += '<br>'; else nl(1);
        break;
      case 'hr': nl(2); out += prefix() + '---'; nl(2); break;
      case 'img': {
        if (!('alt' in a)) throw new Error(`${file}: <img> with no alt`);
        nl(2);
        out += `${prefix()}![${escapeMd(decode(a.alt))}](${a.src})`;
        nl(2);
        break;
      }
      case 'a': {
        if (t.close) { out += `](${link})`; link = null; }
        else { if (atLineStart()) out += prefix(); out += '['; link = (a.href || '').replace(/^\//, `${ORIGIN}/`); }
        break;
      }
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': {
        const level = +t.tag[1];
        if (t.close) { inHeading = 0; nl(2); }
        else { nl(2); out += prefix() + '#'.repeat(level) + ' '; inHeading = level; }
        break;
      }
      case 'blockquote': {
        if (t.close) { quoteDepth--; nl(2); } else { nl(2); quoteDepth++; }
        break;
      }
      case 'ul': case 'ol': {
        if (t.close) { listStack.pop(); nl(2); }
        else { nl(2); listStack.push({ ordered: t.tag === 'ol', n: 0 }); }
        break;
      }
      case 'li': {
        if (t.close) nl(1);
        else {
          const l = listStack[listStack.length - 1] ?? { ordered: false, n: 0 };
          l.n++;
          nl(1);
          out += '> '.repeat(quoteDepth) + '  '.repeat(Math.max(0, listStack.length - 1)) +
                 (l.ordered ? `${l.n}. ` : '- ');
        }
        break;
      }
      case 'dl': if (t.close) nl(2); else nl(2); break;
      case 'dt': if (t.close) { out += '**'; nl(1); } else { nl(2); out += prefix() + '**'; } break;
      case 'dd': if (t.close) nl(2); else { nl(1); out += prefix() + ': '; } break;
      case 'table': {
        if (t.close) { tableDepth--; nl(2); } else { nl(2); tableDepth++; }
        break;
      }
      case 'caption': if (t.close) nl(2); else { nl(1); out += prefix(); } break;
      case 'tr': {
        if (t.close) {
          // NO trailing ' |' here: each <th>/<td> close already wrote its own, and
          // emitting one per row too produced a phantom third column and a separator
          // row that disagreed with the header about how many columns there are.
          nl(1);
          if (rowIsHeader) { out += prefix() + '|' + ' --- |'.repeat(cells); nl(1); }
          cells = null; rowIsHeader = false;
        } else { nl(1); out += prefix() + '|'; cells = 0; rowIsHeader = false; }
        break;
      }
      case 'th': case 'td': {
        if (t.close) out += ' |';
        else { out += (cells === 0 ? ' ' : ' '); cells++; if (t.tag === 'th') rowIsHeader = true; }
        break;
      }
      case 'figcaption': if (t.close) nl(2); else { nl(2); out += prefix(); } break;
      // thead/tbody/tfoot/colgroup/col are structure, not content. A blank line between
      // the separator row and the first body row ends the table, so inside a table these
      // close up to a single newline.
      case 'thead': case 'tbody': case 'tfoot': case 'colgroup': case 'col':
        nl(tableDepth > 0 ? 1 : 2); break;
      default: // p, div, section, header, figure, nav, main, article, aside
        nl(2);
    }
  }

  // caption/figcaption emit a closing '*' via their own close branch; tidy stray artefacts.
  return out
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s+/, '')
    .replace(/\s+$/, '') + '\n';
}

/* ── read the pages ───────────────────────────────────────────────────────────── */
const NOT_CONTENT = new Set(['404.html']);
const files = (await readdir(ROOT)).filter((f) => f.endsWith('.html') && !NOT_CONTENT.has(f)).sort();

const sitemap = await readFile(join(ROOT, 'sitemap.xml'), 'utf8');
const lastmodFor = (url) => {
  const re = new RegExp(`<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>([^<]+)</lastmod>`);
  return (re.exec(sitemap) || [])[1] ?? null;
};

const pages = [];
for (const f of files) {
  const html = await readFile(join(ROOT, f), 'utf8');
  const grab = (re) => (re.exec(html) || [])[1];
  const slug = f.replace(/\.html$/, '');
  const canonical = grab(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) throw new Error(`${f}: no rel=canonical, so there is no URL to put in the frontmatter`);
  // COMMENTS OUT FIRST, for the same reason the converter strips them: a comment that
  // names a tag with angle brackets is indistinguishable from the tag to a regex. This
  // file's own head comment mentioned the landmark and the extractor matched inside it,
  // taking the <head> as the page body. Fixed in both places rather than one.
  const main = /<main[^>]*>([\s\S]*?)<\/main>/.exec(html.replace(/<!--[\s\S]*?-->/g, ''));
  if (!main) throw new Error(`${f}: no <main> landmark`);
  pages.push({
    slug, file: f, canonical,
    title: decode(grab(/<title>([^<]+)<\/title>/)).replace(/\s+\u2014 Queering Earth$/, ''),
    description: decode(grab(/<meta name="description" content="([^"]+)"/) ?? ''),
    updated: lastmodFor(canonical),
    markdown: toMarkdown(main[1], f),
  });
}

/* ── write the .md siblings ───────────────────────────────────────────────────── */
const yaml = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
for (const p of pages) {
  const body = `---
title: ${yaml(p.title)}
url: ${yaml(p.canonical)}
updated: ${yaml(p.updated ?? '')}
description: ${yaml(p.description)}
licence: "CC-BY-SA-4.0"
licence_url: "https://creativecommons.org/licenses/by-sa/4.0/"
attribution_ledger: "https://github.com/Stimpunks/Queering-Earth/blob/main/ATTRIBUTIONS.md"
generated_by: "tools/make-markdown.mjs from the page's own <main> landmark"
---

${p.markdown}`;
  await writeFile(join(ROOT, `${p.slug}.md`), body);
}

/* ── /llms.txt ────────────────────────────────────────────────────────────────── */
const bySlug = new Map(pages.map((p) => [p.slug, p]));
let llms = `# Queering Earth

> Post-normal possibilities. Reading art, literature, poetry, politics, people, and history
> through a queering lens, and asking what else any of it could have been. A collaboration
> between the Stimpunks Foundation and More Realms. Sibling site to Star Stuff
> (https://starstuff.earth/), which is built on science where this is built on the
> humanities, myth, and the canon.

Everything here is CC BY-SA 4.0 and meant to be read, quoted, and reused. **The one thing
we ask is the thing this site is about: get the attribution right.** Nearly every page
carries somebody else's words, and the citation is the only evidence a reader has. Every
quotation is traced to a primary source in ATTRIBUTIONS.md, and every correction we have
made to one is public in the accession register at ${ORIGIN}/changelog.

Each page below has a Markdown source at the same address with \`.md\` appended, derived
from the page's own \`<main>\` landmark. This file and those are generated by
tools/make-markdown.mjs; nothing here is hand-kept.
`;
for (const [heading, slugs] of GROUPS) {
  llms += `\n## ${heading}\n\n`;
  for (const slug of slugs) {
    const p = bySlug.get(slug);
    if (!p) throw new Error(`llms.txt group "${heading}" names ${slug}, which is not a page`);
    const md = p.canonical.replace(/\/$/, '/index') + '.md';
    llms += `- [${p.title}](${p.canonical}): ${p.description} [Markdown](${md})\n`;
  }
}
const grouped = new Set(GROUPS.flatMap(([, s]) => s));
const ungrouped = pages.filter((p) => !grouped.has(p.slug));
if (ungrouped.length) throw new Error(`these pages are in no llms.txt group: ${ungrouped.map((p) => p.slug).join(', ')}`);

llms += `\n## Optional\n\n- [Attribution ledger](https://github.com/Stimpunks/Queering-Earth/blob/main/ATTRIBUTIONS.md): every quotation, whose it is, and the day somebody read the primary and confirmed the wording.
- [Decisions](https://github.com/Stimpunks/Queering-Earth/blob/main/DECISIONS.md): the reasoning behind every settled and open question about this site.
- [Spec audit](${ORIGIN}/AUDIT.md): this site measured against The Website Specification.
`;
await writeFile(join(ROOT, 'llms.txt'), llms);

/* ── /llms-full.txt ───────────────────────────────────────────────────────────── */
let full = `# Queering Earth — full text\n\n> Every page on the site, concatenated. Generated by tools/make-markdown.mjs.\n> CC BY-SA 4.0. Attribution matters here more than anywhere: see ATTRIBUTIONS.md.\n`;
for (const [heading, slugs] of GROUPS)
  for (const slug of slugs) {
    const p = bySlug.get(slug);
    full += `\n\n---\n\n# ${p.title}\n\n${p.canonical}\n${heading} · updated ${p.updated ?? 'unknown'}\n\n${p.markdown}`;
  }
await writeFile(join(ROOT, 'llms-full.txt'), full);

/* ── /feed.xml ────────────────────────────────────────────────────────────────
 * The spec's machine-readable-formats item wants a feed, and the register already IS
 * one: an accession is a dated group with a headline and a permanent address. Derived
 * from changelog.html, so it cannot disagree with the register it summarises. Items
 * are accessions, not entries — grouping by accession is the register's own unit. */
const MONTHS = ['January','February','March','April','May','June','July','August',
                'September','October','November','December'];
const registerHtml = await readFile(join(ROOT, 'changelog.html'), 'utf8');
const items = [];
for (const m of registerHtml.matchAll(
  /<section class="qe-accession"[^>]*>([\s\S]*?)<\/section>/g)) {
  const sec = m[1];
  const dateRaw = (/<p class="qe-accession-date">([^<]+)<\/p>/.exec(sec) || [])[1];
  const h2 = /<h2 id="([^"]+)">([\s\S]*?)<\/h2>/.exec(sec);
  if (!dateRaw || !h2) throw new Error('an accession has no date or no addressed heading');
  const dm = /^\s*(\d{4})\s*&middot;\s*(\d{1,2})\s+([A-Za-z]+)/.exec(dateRaw);
  if (!dm) throw new Error(`cannot read the accession date "${dateRaw}"`);
  const month = MONTHS.indexOf(dm[3]);
  if (month < 0) throw new Error(`unknown month in "${dateRaw}"`);
  const date = new Date(Date.UTC(+dm[1], month, +dm[2], 12));
  const strip = (h) => decode(h.replace(/<a class="qe-anchor"[\s\S]*?<\/a>/g, '')
                               .replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
  const kinds = [...sec.matchAll(/<span class="qe-tag qe-tag--[a-z]+">([^<]+)<\/span>/g)]
    .map((k) => k[1]);
  const names = [...sec.matchAll(/<span class="qe-entry-name">([\s\S]*?)<\/span>/g)]
    .map((n) => strip(n[1]));
  items.push({
    title: strip(h2[2]),
    link: `${ORIGIN}/changelog#${h2[1]}`,
    date,
    body: names.map((n, i) => `${kinds[i] ?? 'Entry'}: ${n}`).join('\n'),
  });
}
const xmlEsc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Queering Earth \u2014 the accession register</title>
    <link>${ORIGIN}/changelog</link>
    <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Every sheet as it was mounted, every plate that came off again, and every label we corrected. Generated from the register itself by tools/make-markdown.mjs.</description>
    <language>en</language>
    <copyright>CC BY-SA 4.0</copyright>
    <lastBuildDate>${(items[0]?.date ?? new Date()).toUTCString()}</lastBuildDate>
${items.map((it) => `    <item>
      <title>${xmlEsc(it.title)}</title>
      <link>${it.link}</link>
      <guid isPermaLink="true">${it.link}</guid>
      <pubDate>${it.date.toUTCString()}</pubDate>
      <description>${xmlEsc(it.body)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`;
await writeFile(join(ROOT, 'feed.xml'), feed);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`;
console.log(`\n  ${pages.length} page(s) -> Markdown\n`);
for (const p of pages) console.log(`  ${(p.slug + '.md').padEnd(30)} ${kb(p.markdown).padStart(9)}`);
console.log(`\n  ${'llms.txt'.padEnd(30)} ${kb(llms).padStart(9)}`);
console.log(`  ${'llms-full.txt'.padEnd(30)} ${kb(full).padStart(9)}`);
console.log(`  ${'feed.xml'.padEnd(30)} ${kb(feed).padStart(9)}  ${items.length} accession(s)`);
console.log('\nWrote the Markdown siblings, both index files and the feed. Commit them.');
