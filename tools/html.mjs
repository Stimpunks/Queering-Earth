/**
 * html.mjs — the shared parts of reading these pages as text.
 *
 * WHY THIS EXISTS
 * `make-markdown.mjs` had all of this to itself until `make-search-index.mjs`
 * needed the same four things: strip the comments, tokenize the tags, decode the
 * entities, read the attributes. Copying them would have put a second entity table
 * in the tree, and an entity table is a lookup that one tool teaches and the other
 * does not — so the day somebody quotes a new letter, the Markdown gets it and the
 * search index throws, or worse, the other way round. That is the drift both those
 * tools exist to prevent, arriving through the tools themselves.
 *
 * Nothing here decides what an element MEANS. That is the caller's job, and the two
 * callers disagree on purpose: Markdown keeps a <del>/<ins> pair as HTML, and the
 * search index reads only the <ins> side, because a reader searching for a name
 * should not be led to the attribution we got wrong.
 */

/* Every named entity these pages actually use, plus a few near neighbours. The lookup is
 * CASE-SENSITIVE on purpose: the sheets quote Old English and Old Norse, so `&THORN;` (Þ)
 * and `&thorn;` (þ) are different letters, and a tolower() fallback would silently
 * lowercase a proper noun in a quotation. On this site that is not a typo, it is a
 * misquotation. Anything absent throws rather than passing through. */
export const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', middot: '·',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
  laquo: '«', raquo: '»', deg: '°', sect: '§',
  times: '×', frac12: '½', rarr: '→', larr: '←',
  // Old English and Old Norse, as quoted on the sheets.
  thorn: 'þ', THORN: 'Þ', eth: 'ð', ETH: 'Ð',
  aelig: 'æ', AElig: 'Æ', oelig: 'œ', OElig: 'Œ',
  // Latin-1 letters that turn up in names and titles.
  agrave: 'à', Agrave: 'À', aacute: 'á', Aacute: 'Á',
  auml: 'ä', Auml: 'Ä', aring: 'å', Aring: 'Å',
  eacute: 'é', Eacute: 'É', egrave: 'è', Egrave: 'È',
  iacute: 'í', Iacute: 'Í', oacute: 'ó', Oacute: 'Ó',
  ouml: 'ö', Ouml: 'Ö', oslash: 'ø', Oslash: 'Ø',
  uacute: 'ú', Uacute: 'Ú', uuml: 'ü', Uuml: 'Ü',
  ccedil: 'ç', Ccedil: 'Ç', ntilde: 'ñ', Ntilde: 'Ñ',
  szlig: 'ß', thinsp: ' ', ensp: ' ', emsp: ' ', shy: '­',
};

export function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&([a-z][a-z0-9]*);/gi, (m, name) => {
      const v = ENTITIES[name];
      if (v === undefined) throw new Error(`unknown entity &${name}; — add it to ENTITIES rather than letting it through`);
      return v;
    });
}

/* A COMMENT IS NEVER CONTENT, and stripping it is not a tidiness pass. The stylesheet
 * and the sheets document their own traps in comments, and those comments quote markup —
 * the note in flower-codes.html explaining that positioning goes on the outer group and
 * the animation on the inner one contains a literal one, which a tokenizer reads as an
 * element. Strip before parsing, always. */
export const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

export function attrs(raw) {
  const out = {};
  for (const m of raw.matchAll(/([a-zA-Z-]+)(?:="([^"]*)")?/g)) if (m[1]) out[m[1].toLowerCase()] = m[2] ?? '';
  return out;
}

/** Split HTML into `{ text }` and `{ close, tag, raw, self }` tokens, in order. */
export function tokenize(html) {
  const tokens = [];
  let i = 0;
  // Quoted attribute values come FIRST in the alternation so an apostrophe or a `>`
  // inside a double-quoted value cannot end the tag early.
  for (const m of html.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>])*?)(\/?)>/g)) {
    if (m.index > i) tokens.push({ text: html.slice(i, m.index) });
    tokens.push({ close: m[1] === '/', tag: m[2].toLowerCase(), raw: m[3], self: m[4] === '/' });
    i = m.index + m[0].length;
  }
  if (i < html.length) tokens.push({ text: html.slice(i) });
  return tokens;
}

/** The one landmark the SKS mirror reads, and the only part of a page that is content. */
export function mainOf(html, file) {
  const m = /<main[^>]*>([\s\S]*?)<\/main>/.exec(stripComments(html));
  if (!m) throw new Error(`${file}: no main landmark`);
  return m[1];
}
