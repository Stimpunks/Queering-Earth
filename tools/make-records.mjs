#!/usr/bin/env node
/**
 * make-records.mjs — gives the two working records an address, without making a
 * second copy of either.
 *
 * WHY THIS EXISTS
 * `/mission` claims the site works in public with the working-out left in, and it
 * pointed at `ATTRIBUTIONS.md` and `DECISIONS.md` on GitHub, because those two were
 * reachable no other way. An aim whose receipt is on somebody else's website is the
 * thinnest receipt on that page. So they get addresses here.
 *
 * THE DIRECTION IS BACKWARDS FROM EVERY OTHER GENERATOR IN THIS DIRECTORY, and that
 * is the whole design. `make-markdown.mjs` reads a page's own landmark and writes the
 * Markdown beside it: HTML is the source, Markdown is derived. Here the Markdown is
 * the source and the HTML is derived, because those two files are working documents —
 * the `credit-source` skill appends to the ledger, and every session that decides
 * something appends to the other. Making the page the source would mean editing a
 * ledger entry in HTML, which is how a ledger stops being kept.
 *
 * Either direction is fine. What is not fine is two hand-kept copies, which is the
 * rule this house repeats more than any other, and the reason this tool exists rather
 * than a pair of transcribed pages.
 *
 * ── THE SLUGS ARE NOT /attributions AND /decisions, AND THAT IS NOT A PREFERENCE ──
 *
 * macOS is case-insensitive by default. A page at `/decisions` is `decisions.html`,
 * and `make-markdown.mjs` writes `<name>.md` beside every page — so it would write
 * `decisions.md`, WHICH IS THE SAME FILE AS `DECISIONS.md`. The generator would
 * silently overwrite its own source with a round-tripped copy of itself, on the first
 * run, with no error. `attributions.md` and `ATTRIBUTIONS.md` collide the same way.
 *
 * Checked before a line of this was written, by creating `AAA.md` in a temp directory
 * and asking for `aaa.md`. The addresses are `/ledger` — the site's own name for the
 * first file in every footer it appears in — and `/what-is-settled`, which is the
 * second file's own opening line. Neither collides.
 *
 * ── WHAT IT REFUSES TO DO ──
 *
 * THROWS ON A LINE IT DOES NOT RECOGNISE, for the reason `make-markdown.mjs` throws on
 * a tag it does not know: a converter that silently drops a construct is how a copy
 * comes to say less than its source, which is the drift the generator exists to
 * prevent arriving by another door. Here the stakes are higher in one direction — a
 * dropped line in the ledger is a quotation with no visible attribution.
 *
 * AND IT PROVES IT, rather than trusting the parser. Every block's plain text is
 * checked against the rendered plain text before anything is written; a block whose
 * words do not survive the round trip stops the run. Same discipline as the search
 * index's offset fences, which were recorded against a string that was tidied
 * afterwards and pointed four to fifteen characters downstream of what they guarded.
 *
 * ── HEADING IDS ──
 *
 * The house rule is that an id is AUTHORED and a label is derived, because a slug dies
 * when somebody rewords the heading and every shared link dies with it. That rule is
 * written for h2s on hand-authored pages and cannot be met by a generator: there are
 * ~120 entry headings between these two files and nowhere in Markdown to author an id.
 *
 * So: `### Title {#anchor}` is honoured where it is written, and a slug of the title is
 * used where it is not. The escape hatch is there so a heading whose address somebody
 * has actually shared can be pinned in the source, one line, without a schema. Entry
 * headings here are also the most stable text in either file — they name a person and
 * a work — and the alternative was no address at all for 120 entries.
 *
 * USAGE
 *     node tools/make-records.mjs            # rewrite both pages between the markers
 *     node tools/make-records.mjs --check    # non-zero exit if either is stale
 *
 * Run it after editing either source, like `make-markdown.mjs`, and commit the result.
 * `check-metadata.mjs` fails when a page is stale, so a forgotten run is caught.
 *
 * Local dev tool. Netlify does not run it. Node 22+, no dependencies.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(REPO);

const gating = process.argv.includes('--check');

/* The two records, their pages, and the reason each address is what it is. */
export const RECORDS = [
  {
    source: 'ATTRIBUTIONS.md',
    page: 'ledger.html',
    // NOT /attributions: attributions.md === ATTRIBUTIONS.md on a case-insensitive
    // filesystem, and make-markdown.mjs would overwrite the source. See the header.
    address: '/ledger',
  },
  {
    source: 'DECISIONS.md',
    page: 'what-is-settled.html',
    // NOT /decisions, for the same collision. The slug is this file's own first line.
    address: '/what-is-settled',
  },
];

const START = '<!-- generated:record:start -->';
const END = '<!-- generated:record:end -->';

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A heading's address: `{#authored}` if written, otherwise a slug of the title. */
function headingId(text) {
  const explicit = /\{#([A-Za-z][\w-]*)\}\s*$/.exec(text);
  if (explicit) return { id: explicit[1], title: text.slice(0, explicit.index).trim(), authored: true };
  const id = text
    .toLowerCase()
    .replace(/[`*_[\]()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)
    .replace(/-+$/, '');
  return { id, title: text, authored: false };
}

/**
 * Inline Markdown, in one pass and in an order that matters.
 *
 * Code spans come out FIRST and go back in LAST, because these files quote markup
 * constantly — `<dt>`, `<main>`, `<loc>` — and emphasis characters inside a code span
 * are code, not emphasis. Escaping happens between the two, so a quoted tag renders as
 * text rather than becoming an element in the page it is describing.
 *
 * THE PLACEHOLDER FENCE IS A LITERAL NUL BYTE, U+0000, AND IT HAS TO BE SOMETHING NO
 * SOURCE TEXT CAN CONTAIN. A printable fence is a fence these files will eventually
 * quote: this is a repository whose prose is ABOUT its own markup, so every obvious
 * candidate — a brace, a pipe, a private-use glyph — is one an entry may legitimately
 * write inside a code span, and the day it does, a placeholder gets restored into the
 * middle of somebody's sentence. NUL cannot appear in the Markdown, so the fence
 * cannot be forged.
 *
 * THE PRICE IS THAT `grep` TREATS THIS FILE AS BINARY AND PRINTS NOTHING. Eight NULs
 * live here and in `mdText()` below, and `file` calls the result "binary data", so a
 * plain `grep -n 'const ' make-records.mjs` SUCCEEDS SILENTLY WITH NO OUTPUT — which
 * reads exactly like a file that does not contain what you are looking for. It cost a
 * session real time on 2026-09-13, three searches deep, before `file` was run.
 *
 * USE `grep -a`, or read the file with a tool that does not sniff. The same applies to
 * an edit script that matches on these lines: the "spaces" around the index are NULs,
 * so a pattern typed from what the terminal SHOWS will never match. Both facts are in
 * DECISIONS.md as well, because the next person to be caught by this will be grepping
 * the repo rather than reading this file.
 */
/**
 * Resolve `*` emphasis with a STACK, not with two regexes.
 *
 * THE REGEX PAIR IT REPLACED SHIPPED OVERLAPPING TAGS, and nothing saw it for as long
 * as these pages have existed. `**Robert Earl Hardy, *A Deeper Blue*** ` gave
 * `<strong>Robert Earl Hardy, <em>A Deeper Blue</strong></em>` — the bold regex is
 * non-greedy, so it took the first two of the three closing asterisks and left the
 * third for the italic pass, which then closed the two in the wrong order. Eight
 * passages across `/ledger` and `/what-is-settled` were built that way. Found on
 * 2026-09-11 by `check-markup.mjs`'s new balance check, which is exactly the kind of
 * fault that gate was added for: the browser silently repairs it, so the pages looked
 * right and every other check passed.
 *
 * The old comment was correct that emphasis nests here and wrong that two ordered
 * passes can read it. `**A *b* C**` happens to work; `**A, *b***` cannot, because the
 * closing run is ambiguous to a regex and is not ambiguous to a stack.
 *
 * FLANKING IS WHAT DISAMBIGUATES A RUN, and it is CommonMark's rule reduced to the one
 * case this corpus has: a run may CLOSE only if the character before it is not a space,
 * and may OPEN only if the character after it is not a space. That is what tells
 * `*A **B***` (italic holding bold) from `**A, *B***` (bold holding italic) — the two
 * shapes both appear in these files, so neither can be assumed.
 *
 * It still THROWS rather than emitting a stray asterisk, same as before, and now also
 * throws when a run is left open at the end of the line.
 */
function emphasis(s, md) {
  let out = '';
  const stack = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] !== '*') { out += s[i++]; continue; }

    let j = i;
    while (j < s.length && s[j] === '*') j++;
    let n = j - i;

    const before = i > 0 ? s[i - 1] : '';
    const after = j < s.length ? s[j] : '';
    const canClose = before !== '' && !/\s/.test(before);
    const canOpen = after !== '' && !/\s/.test(after);

    /* Close innermost-first, which is the only order that can produce well-formed
       markup, and is what the two-regex version got wrong. */
    if (canClose) {
      while (n > 0 && stack.length && stack[stack.length - 1] <= n) {
        const len = stack.pop();
        out += len === 2 ? '</strong>' : '</em>';
        n -= len;
      }
    }
    if (n > 0) {
      if (!canOpen) throw new Error(`unbalanced emphasis: ${md.slice(0, 90)}`);
      while (n >= 2) { out += '<strong>'; stack.push(2); n -= 2; }
      if (n === 1) { out += '<em>'; stack.push(1); }
    }
    i = j;
  }
  if (stack.length) throw new Error(`unclosed emphasis: ${md.slice(0, 90)}`);
  return out;
}

function inline(md) {
  const spans = [];
  let s = md.replace(/`([^`]+)`/g, (_, code) => {
    spans.push(code);
    return ` ${spans.length - 1} `;
  });

  s = escapeHtml(s);

  // Links before emphasis: a title may be emphasised inside the bracket.
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, text, href) => `<a href="${href}">${text}</a>`);
  if (/\]\(/.test(s)) throw new Error(`unconvertible link (only absolute http links are handled): ${md.slice(0, 90)}`);

  /* STRIKETHROUGH BEFORE EMPHASIS, for the reason links go before it: a struck
   * passage may hold emphasis, and the `<del>` has to sit outside it.
   *
   * IT SHIPPED AS LITERAL TILDES AND NOTHING SAW IT. `DECISIONS.md` strikes reason 3
   * of the CMS deferral with a pair of double tildes, this converter did not know the
   * syntax, and `/what-is-settled` published the fences as text — on the page whose
   * whole job is to show what was retracted, a retraction reading as a typo. Every
   * gate passed it, because no gate here reads prose.
   *
   * A SINGLE TILDE IS NOT STRIKETHROUGH AND HAS TO SURVIVE. `DECISIONS.md` uses one
   * for *approximately* five times — ~100, ~60px, ~896px, ~108px, ~120 — so the run
   * must be exactly two, and the flanking rule is GFM's: no space inside the fences.
   * `[\s\S]` rather than `.` because the one real pair in the corpus opens on one
   * source line and closes on the next, and a block arrives here already joined.
   *
   * It throws on an unclosed run, as `emphasis()` does, rather than emitting a stray
   * fence — a fence reaching the reader is the exact failure this replaces. */
  s = s.replace(/~~(?=\S)([\s\S]+?)(?<=\S)~~/g, '<del>$1</del>');
  if (s.includes('~~')) throw new Error(`unclosed strikethrough: ${md.slice(0, 90)}`);

  s = emphasis(s, md);

  return s.replace(/ (\d+) /g, (_, i) => `<code>${escapeHtml(spans[+i])}</code>`);
}

/**
 * Strip markup from a Markdown fragment, for the round-trip proof.
 *
 * ASTERISKS ONLY, NEVER UNDERSCORES. `_` is not emphasis in these two files and the
 * converter leaves it alone: the ledger credits a study's participants by the
 * pseudonyms the paper gives them, which look like `Photon Pulse_he_him`. Stripping
 * underscores here made the proof disagree with a converter that was right, which is
 * the more dangerous of the two failures — a guard that cries wolf gets relaxed.
 */
function mdText(s) {
  /* A code span is protected here for the same reason it is in `inline()`, and for
     the same reason underscores are left alone: `--qe-space-*` is a token name, and
     stripping its asterisk made the proof demand text the converter was right not to
     produce. The proof has to model the converter, not approximate it. */
  const spans = [];
  let t = s.replace(/`([^`]+)`/g, (_, code) => {
    spans.push(code);
    return ` ${spans.length - 1} `;
  });
  t = t
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/~~/g, '')
    .replace(/\*/g, '');
  return t
    .replace(/ (\d+) /g, (_, i) => spans[+i])
    .replace(/\s+/g, ' ')
    .trim();
}

/** Strip tags from generated HTML, for the other side of the proof. */
const htmlText = (s) =>
  s.replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Markdown to HTML, block by block.
 *
 * Every line must belong to a recognised block or the run stops. There is no
 * pass-through branch on purpose: a line nobody taught this tool about is a line that
 * would otherwise vanish from the page while remaining in the source, which is exactly
 * the divergence the tool is built to make impossible.
 */
function convert(md, file) {
  const lines = md.split('\n');
  const out = [];
  const blocks = [];        // [{ md, html }] for the proof
  const ids = new Map();    // id -> the heading that claimed it
  let i = 0;
  let seenH1 = false;

  const push = (sourceLines, html) => {
    out.push(html);
    blocks.push({ md: sourceLines.join(' '), html });
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    // The source's own title. The page carries an authored h1 already, so a second one
    // would fail check-markup's "exactly one h1 inside the landmark" rule.
    if (/^# /.test(line)) {
      if (seenH1) throw new Error(`${file}:${i + 1}: a second top-level heading — the page has one h1 and this would make two`);
      seenH1 = true;
      i++;
      continue;
    }

    const h = /^(#{2,3}) (.+)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const { id, title, authored } = headingId(h[2].trim());
      /* TWO HEADINGS CANNOT SHARE AN ADDRESS. check-markup.mjs catches a duplicate id
         and would catch this, but it reports a symptom on a generated file; the fault
         is two entry titles that slug the same, and only this tool knows both of them.
         Fix it by pinning one with `{#anchor}` in the source. */
      if (ids.has(id)) throw new Error(`${file}:${i + 1}: two headings claim #${id}\n    ${ids.get(id)}\n    ${title}\n    Pin one in the source with {#some-other-anchor}.`);
      ids.set(id, title);
      const inner = inline(title);
      /* The stripped TITLE, not the raw heading: `{#anchor}` is an address, not words,
         and handing the proof the syntax made it demand text the page is right not to
         show — the same mistake the bullet, the pipes and the underscores made. */
      push([title], `<h${level} id="${id}">${inner} <a class="qe-anchor" href="#${id}"><span class="qe-sr">Link to this section</span></a></h${level}>`);
      i++;
      continue;
    }

    if (/^#{4,} /.test(line)) throw new Error(`${file}:${i + 1}: heading deeper than h3 — decide what it should be rather than letting it flatten`);

    if (/^-{3,}$|^\*{3,}$|^_{3,}$/.test(line.trim())) {
      out.push('<hr>');
      i++;
      continue;
    }

    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const body = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) body.push(lines[i++]);
      if (i >= lines.length) throw new Error(`${file}: unclosed fenced block`);
      i++;
      /* The fence's language is read and deliberately not emitted. There is no
         syntax highlighter on this site, so `class="language-bash"` would be a class
         with no rule — the exact thing this house has shipped twice by accident. The
         variable stays so the parser still consumes the token rather than treating
         it as content. */
      void lang;
      push(body, `<pre><code>${escapeHtml(body.join('\n'))}</code></pre>`);
      continue;
    }

    if (/^>/.test(line)) {
      const src = [];
      const paras = [[]];
      while (i < lines.length && /^>/.test(lines[i])) {
        const t = lines[i].replace(/^>\s?/, '');
        src.push(t);
        if (t.trim() === '') paras.push([]);
        else paras[paras.length - 1].push(t);
        i++;
      }
      const html = `<blockquote>${paras.filter((p) => p.length).map((p) => `<p>${inline(p.join(' '))}</p>`).join('')}</blockquote>`;
      push(src, html);
      continue;
    }

    if (/^\|/.test(line)) {
      const rows = [];
      const src = [];
      while (i < lines.length && /^\|/.test(lines[i])) { src.push(lines[i]); rows.push(lines[i]); i++; }
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      if (rows.length < 2 || !/^[|\s:-]+$/.test(rows[1])) throw new Error(`${file}:${i}: a table with no header separator`);
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      const html =
        '<div class="qe-editions-scroll"><table class="qe-editions"><thead><tr>' +
        head.map((c) => `<th scope="col">${inline(c)}</th>`).join('') +
        '</tr></thead><tbody>' +
        body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('') +
        '</tbody></table></div>';
      /* Cells, not rows: the separator row is syntax and the pipes are not words. */
      push([...head, ...body.flat()], html);
      continue;
    }

    const listMark = /^(\s*)([-*]|\d+\.) (.*)$/.exec(line);
    if (listMark) {
      const ordered = /\d/.test(listMark[2]);
      const items = [];
      const src = [];
      while (i < lines.length) {
        const m = /^(\s*)([-*]|\d+\.) (.*)$/.exec(lines[i]);
        if (m) {
          if (/\d/.test(m[2]) !== ordered) break;   // a different list starts here
          items.push([m[3]]);
          src.push(lines[i]);
          i++;
          // continuation lines: indented, or a bare wrapped line under the item
          while (i < lines.length && lines[i].trim() !== '' && !/^(\s*)([-*]|\d+\.) /.test(lines[i]) &&
                 !/^[#>|`]/.test(lines[i]) && !/^-{3,}$/.test(lines[i].trim())) {
            items[items.length - 1].push(lines[i].trim());
            src.push(lines[i]);
            i++;
          }
        } else if (lines[i].trim() === '' &&
                   /^(\s*)([-*]|\d+\.) /.test(lines[i + 1] ?? '')) {
          i++;                                       // a loose list: blank line between items
        } else break;
      }
      const tag = ordered ? 'ol' : 'ul';
      const start = ordered ? +/^(\d+)\./.exec(listMark[2] + ' ')[1] : 1;
      const startAttr = ordered && start !== 1 ? ` start="${start}"` : '';
      /* The proof compares words, not syntax, so it is handed the item TEXT rather
         than the source lines — otherwise every list fails on its own bullet. */
      push(items.map((it) => it.join(' ')), `<${tag}${startAttr}>${items.map((it) => `<li>${inline(it.join(' '))}</li>`).join('')}</${tag}>`);
      continue;
    }

    if (/^\s+\S/.test(line)) throw new Error(`${file}:${i + 1}: an indented line outside any list or fence — if it is code, fence it; if it is prose, unindent it\n    ${line.slice(0, 80)}`);

    // A paragraph: this line plus every following line until a blank or a new block.
    const para = [];
    const src = [];
    while (i < lines.length && lines[i].trim() !== '' &&
           !/^#{1,6} |^>|^\||^```|^\s*([-*]|\d+\.) /.test(lines[i]) &&
           !/^-{3,}$|^\*{3,}$/.test(lines[i].trim())) {
      para.push(lines[i].trim());
      src.push(lines[i]);
      i++;
    }
    if (!para.length) throw new Error(`${file}:${i + 1}: a line this tool cannot classify\n    ${line.slice(0, 80)}`);
    push(src, `<p>${inline(para.join(' '))}</p>`);
  }

  /* THE PROOF. Every block's words must survive into the rendered text. A parser that
     reports success while having dropped a clause is worse than one that crashes. */
  /* COMPARED WITH THE WHITESPACE REMOVED, deliberately. Tags are word boundaries in
     the source and not in the output — `<li>a</li><li>b</li>` reads as "ab" — so a
     space-sensitive comparison fails on every multi-item list while nothing has
     actually been lost. Dropping whitespace from both sides makes the check about the
     one thing it is for: whether the characters survived. */
  const squash = (s) => s.replace(/\s+/g, '');
  for (const b of blocks) {
    const want = squash(mdText(b.md));
    const got = squash(htmlText(b.html));
    if (want && !got.includes(want.slice(0, Math.min(want.length, 400)))) {
      throw new Error(`${file}: a block did not survive conversion\n    source:   ${want.slice(0, 120)}\n    rendered: ${got.slice(0, 120)}`);
    }
  }

  return out.join('\n');
}

/* ── write, or check ──────────────────────────────────────────────────────────── */

let stale = 0;
const report = [];

for (const rec of RECORDS) {
  const md = fs.readFileSync(rec.source, 'utf8');
  const page = fs.readFileSync(rec.page, 'utf8');

  const a = page.indexOf(START);
  const b = page.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    throw new Error(`${rec.page}: the generated region markers are missing or out of order`);
  }

  const body = convert(md, rec.source);
  const next = page.slice(0, a + START.length) + '\n' + body + '\n' + page.slice(b);

  const changed = next !== page;
  if (changed) {
    if (gating) stale++;
    else fs.writeFileSync(rec.page, next);
  }

  const headings = (body.match(/<h[23] /g) || []).length;
  report.push({
    source: rec.source,
    page: rec.page,
    address: rec.address,
    lines: md.split('\n').length,
    headings,
    bytes: Buffer.byteLength(body),
    changed,
  });
}

for (const r of report) {
  console.log(
    `  ${r.source.padEnd(20)} -> ${r.page.padEnd(22)} ${String(r.lines).padStart(5)} lines  ` +
      `${String(r.headings).padStart(3)} headings  ${(r.bytes / 1024).toFixed(1).padStart(7)} KB  ` +
      (r.changed ? (gating ? 'STALE' : 'rewritten') : 'current')
  );
}

if (gating && stale) {
  console.log(`\nFAIL — ${stale} record page(s) no longer match their source. Run: node tools/make-records.mjs`);
  process.exit(1);
}
console.log(
  gating
    ? '\nPASS — both record pages match the Markdown they are generated from.'
    : '\nWrote the record pages. Commit them.'
);
