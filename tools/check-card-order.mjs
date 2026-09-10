#!/usr/bin/env node
/**
 * check-card-order.mjs — does each card grid run in the order it claims to, and do
 * the copies of one sheet's card agree with each other?
 *
 * WHY THIS EXISTS
 * On 2026-09-09 the plate on `index.html` ran 1, 2, 3, 4, 5, 6, 8, 7. Sheet No. 8
 * had been mounted, carded, logged and stamped, and its card was appended after the
 * last `li` rather than placed at its number. The sentence above the plate still
 * said "Seven sheets, so far" — a hand-written count beside a list that grows.
 * Looking for the same fault elsewhere found it: `the-tempest.html` listed its
 * siblings 4, 1, 2, 3, 6, 7, 8.
 *
 * ALL SEVEN EXISTING GATES PASSED BOTH, and none was wrong to. `check-markup.mjs`
 * reads card structure, and the structure was perfect — every wrap held one anchor,
 * every anchor was in a list item. Contrast measured colour, overlap measured
 * position, metadata measured freshness, addresses measured routing, cache measured
 * headers, sitemap measured the manifest. **Order is none of those things**, and a
 * grid in the wrong order looks exactly like a grid in the right one unless somebody
 * reads the numbers down the page and compares them.
 *
 * The house rule is to port a Star Stuff gate when the failure it catches becomes
 * possible here. It did not become possible; it happened, twice, in one afternoon.
 *
 * WHAT IS DIFFERENT FROM THE UPSTREAM TOOL — read this before changing anything
 * Star Stuff checks ascending order **within each series**, because
 * `collection-easter-eggs.html` interleaves Zine and Field Guide numbers on purpose
 * and one merged sequence would fail a page for doing what it means to do.
 *
 * THIS SITE HAS NO SERIES. There is one accession sequence and the kind chip is a
 * label on it: No. 1 is a Reading, No. 2 an Essay, No. 8 a Wall, and they ascend
 * together as one run. Porting the series split unchanged would have been worse
 * than not porting the gate at all — No. 8 is a Wall and No. 7 a Reading, so
 * `1, 2, 3, 4, 5, 6, 8, 7` is two perfectly ascending series, and the gate would
 * have certified **the exact plate that prompted it**. One sequence per grid, and
 * the kind is never allowed to partition it.
 *
 * WHY THIS IS A SOURCE CHECK — the third browser-free gate
 * Cards here are static markup: the numbers are in the file, in document order, and
 * nothing builds or sorts them at runtime. So this needs no Chrome and no
 * dependencies, which puts it beside `check-markup.mjs` and `check-sitemap.mjs`
 * rather than beside the two that drive a browser. The finding aid's results are the
 * one thing on this site built at runtime, and it renders no cards.
 *
 * WHAT IT CHECKS
 *
 * 1. ASCENDING WITHIN A GRID. Inside each `.qe-plate-grid` and `.qe-elsewhere-grid`,
 *    the cards carrying `No. <digits>` must appear in ascending order. One sequence.
 *
 *    Gaps are not faults and are never reported. Every sibling nav omits the sheet
 *    it sits on, so `1, 2, 3, 4, 6, 7, 8` is exactly right on Sheet No. 5. Only the
 *    direction is checked.
 *
 *    Cards with no number are skipped by this rule and counted in the summary. The
 *    cabinet's own cards put a slug where a sheet puts its number — "the cabinet",
 *    "the changelog", "the front" — and there is no mechanical answer to where the
 *    colophon belongs relative to the register.
 *
 * 2. CARDS OUTSIDE ANY GRID are counted and reported, never silently skipped. A card
 *    no grid contains is a card this gate cannot check, and a gate whose denominator
 *    shrinks in silence reads green while measuring less. If that number is ever
 *    non-zero the grid selector has drifted.
 *
 * 3. EVERY CARD FOR ONE PAGE AGREES ABOUT THAT PAGE. A sheet's number and kind are
 *    written out once per page that cards it — ten copies of one fact, and this
 *    repo's whole argument is that the copy is what rots. **Rule 1 is only as good
 *    as the numbers it sorts**: a grid ordered by a wrong number ascends perfectly.
 *
 *    It earned its place on its first honest run, which is the same way the upstream
 *    tool earned its second check. `404.html` called `/coming-to-terms` a Reading —
 *    it is Ryan's own essay, and the plate says Essay — and called
 *    `/monotropa-uniflora` a Reading, where the plate says Wall. Separately, the
 *    No. 8 accession wrote its kinds with articles ("A reading", "An essay",
 *    "A wall") against bare nouns on every card that came before it.
 *
 *    THE PLATE IS THE AUTHORITY, not the majority. `index.html` is the page whose
 *    subject is what this cabinet holds; a vote among sibling navs would let a fault
 *    copied onto seven pages outrank the one page that is supposed to be right.
 *
 * WHAT IT DELIBERATELY DOES NOT CHECK
 *
 * NOT the plate against `tools/pages.mjs`. They agree today and it is tempting, but
 * they are two different facts: the number records **when a sheet was accessioned**
 * and `pages.mjs` records **the order a reader should meet the pages**. Mount Sheet
 * No. 9 and decide it reads best third, and the two diverge legitimately. Coupling
 * them would turn an editorial decision into a build failure.
 *
 * NOT whether unnumbered cards are in a sensible order. There is no mechanical
 * answer, and inventing one would be this tool asserting an editorial preference.
 *
 * NOT the order of `.qe-furniture` on the home page. It is a `dl` of the cabinet's
 * own pages, it carries no numbers, and its order is four sentences somebody chose.
 *
 * USAGE
 *     node tools/check-card-order.mjs              # every root .html
 *     node tools/check-card-order.mjs index.html   # just these
 *     node tools/check-card-order.mjs --check      # non-zero exit on failure
 *     node tools/check-card-order.mjs --verbose    # every problem, not the first 8
 *
 * `--check` IS LOAD-BEARING, as on the contrast and overlap gates. A plain run
 * reports and exits 0, so a gate invoked without it is advice. Both were shipped
 * that way here once and the mistake is cheap to repeat.
 *
 * Local dev tool. Netlify does not run it. Node 22+, no Chrome, no dependencies.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(REPO);

const args = process.argv.slice(2);
const gating = args.includes('--check');
const verbose = args.includes('--verbose');
const named = args.filter((a) => !a.startsWith('--'));

const targets = named.length
  ? named
  : fs.readdirSync(REPO).filter((f) => f.endsWith('.html')).sort();

if (!targets.length) {
  console.log('No pages to check.');
  process.exit(0);
}

const MAX_SHOWN = 8;

/* The page whose subject is what the cabinet holds. Rule 3 measures every other
   page against this one rather than against a majority — see the header. */
const AUTHORITY = 'index.html';

/* Deliberately empty, and deliberately present.
   The bar for an entry is the bar `ALLOWED_UNORDERED` sets upstream and the bar the
   contrast gate sets for its exemptions: an exemption is a decision somebody wrote
   down with a reason, never a mechanism to fall into. Key is "<page>#<grid index>",
   value is the reason. No pattern matching, on purpose — a grid that genuinely wants
   a non-numeric order is worth one named line here, and a list that grows is a list
   somebody can question. */
const ALLOWED_UNORDERED = {
  // 'some-page.html#0': 'why this grid is ordered by something other than its numbers',
};

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * Blank the contents of script, style and comments, keeping the string the same
 * length so every offset stays valid.
 *
 * Not defensive tidying. This register quotes its own markup constantly — the
 * accession explaining the plate grid contains the words `.qe-plate-grid` inside a
 * code element — and a comment naming a tag is indistinguishable from the tag to a
 * regex, which is a lesson this repo has already paid for twice in one afternoon.
 * Blanking comments also stops a commented-out list from unbalancing the depth walk.
 */
function mask(src) {
  const blank = (s) => ' '.repeat(s.length);
  return src
    .replace(/<script\b[\s\S]*?<\/script>/gi, blank)
    .replace(/<style\b[\s\S]*?<\/style>/gi, blank)
    .replace(/<!--[\s\S]*?-->/g, blank);
}

/**
 * Find every card grid and return its [start, end) span, by balanced list depth
 * rather than "up to the next grid". The crude version gives the right answer on
 * today's pages because no page has two grids — which is precisely the kind of
 * accident that stops being true the day one does.
 */
function gridSpans(src) {
  const spans = [];
  const open = /<ul\b[^>]*class="[^"]*\bqe-(?:plate|elsewhere)-grid\b[^"]*"[^>]*>/g;
  let m;
  while ((m = open.exec(src))) {
    const bodyStart = m.index + m[0].length;
    let depth = 1;
    const tag = /<(\/?)ul\b[^>]*>/g;
    tag.lastIndex = bodyStart;
    let t;
    let end = src.length;
    while ((t = tag.exec(src))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) {
        end = t.index;
        break;
      }
    }
    spans.push([bodyStart, end]);
    open.lastIndex = end;
  }
  return spans;
}

/** Pull the ordered card records out of a source span. */
function cardsIn(src, from, to) {
  const seg = src.slice(from, to);
  const out = [];
  /* check-markup.mjs guarantees no anchor nests inside another, so the first
     closing tag is this card's own. */
  const re = /<a\b[^>]*class="[^"]*\bcard\b[^"]*"[^>]*href="([^"]*)"[\s\S]*?<\/a>/g;
  let m;
  while ((m = re.exec(seg))) {
    /* The closing quote matters: `qe-card-note` starts with `qe-card-no`. */
    const noSpan = /class="qe-card-no"[^>]*>([\s\S]*?)<\//.exec(m[0]);
    const kindSpan = /class="qe-card-kind"[^>]*>([\s\S]*?)<\//.exec(m[0]);
    const label = noSpan ? decode(noSpan[1]) : '';
    /* Only "No. <digits>" is a number. The cabinet's cards put a slug in the same
       slot — "the cabinet", "the front" — and those carry no position. */
    const parsed = /^No\.\s*(\d+)$/.exec(label);
    out.push({
      href: m[1],
      label,
      kind: kindSpan ? decode(kindSpan[1]) : null,
      number: parsed ? Number(parsed[1]) : null,
    });
  }
  return out;
}

/* ── pass one: read every page ────────────────────────────────────────────────── */

const pages = new Map(); // file -> { spans, cards per grid, allCards }
for (const file of targets) {
  let src;
  try {
    src = mask(fs.readFileSync(file, 'utf8'));
  } catch {
    pages.set(file, { unread: true });
    continue;
  }
  const spans = gridSpans(src);
  const allCards = cardsIn(src, 0, src.length);
  if (!spans.length && !allCards.length) continue; // not a card-bearing page
  pages.set(file, {
    grids: spans.map(([a, b]) => cardsIn(src, a, b)),
    allCards,
  });
}

/* What the authority page says each address is. Built before anything is judged, so
   a page can be measured against the plate whether it is scanned before or after it.
   READ FROM DISK EVEN WHEN THE PLATE IS NOT A TARGET, so that
   `check-card-order.mjs the-tempest.html` still checks that sheet against the plate
   rather than reporting NOT MEASURED at somebody running one file. */
const authority = new Map();
let authorityCards = null;
if (pages.has(AUTHORITY) && !pages.get(AUTHORITY).unread) {
  authorityCards = pages.get(AUTHORITY).allCards;
} else {
  try {
    const src = mask(fs.readFileSync(AUTHORITY, 'utf8'));
    authorityCards = cardsIn(src, 0, src.length);
  } catch {
    authorityCards = null;
  }
}
for (const c of authorityCards ?? []) {
  if (!authority.has(c.href)) authority.set(c.href, c);
}

/* ── pass two: judge ──────────────────────────────────────────────────────────── */

let totalProblems = 0;
let pagesWithProblems = 0;
let totalGrids = 0;
let totalCards = 0;
let totalNumbered = 0;
let totalUnnumbered = 0;
let totalOrphans = 0;
let exemptGrids = 0;
let checkedPages = 0;

for (const [file, page] of pages) {
  if (page.unread) {
    console.log(`  ${file.padEnd(30)} UNREAD  could not be read`);
    totalProblems++;
    pagesWithProblems++;
    continue;
  }
  checkedPages++;

  const problems = [];
  let pageCards = 0;
  let pageNumbered = 0;
  let pageUnnumbered = 0;
  let inGrids = 0;

  page.grids.forEach((cards, gi) => {
    totalGrids++;
    pageCards += cards.length;
    inGrids += cards.length;

    const key = `${file}#${gi}`;
    if (key in ALLOWED_UNORDERED) {
      exemptGrids++;
      return;
    }

    /* ONE sequence. See the header for why splitting it by kind would have passed
       the very plate this gate was written for. */
    const seq = [];
    for (const c of cards) {
      if (c.number === null) {
        pageUnnumbered++;
        continue;
      }
      pageNumbered++;
      seq.push(c);
    }

    for (let i = 1; i < seq.length; i++) {
      if (seq[i].number < seq[i - 1].number) {
        problems.push(
          `out of order   grid ${gi} · No. ${seq[i].number} follows No. ${seq[i - 1].number}` +
            `\n                       ${seq[i].href}` +
            `\n                       order in this grid: ${seq.map((c) => c.number).join(', ')}`
        );
      }
    }
  });

  /* Rule 3. The plate is not measured against itself. */
  if (file !== AUTHORITY) {
    for (const c of page.allCards) {
      const truth = authority.get(c.href);
      if (!truth) continue; // an address the plate does not card — nothing to disagree with
      if (c.number !== null && truth.number !== null && c.number !== truth.number) {
        problems.push(
          `disagrees      ${c.href} is No. ${c.number} here and No. ${truth.number} on the plate` +
            '\n                       rule 1 sorts by these, so a wrong number ascends perfectly'
        );
      }
      if (c.kind && truth.kind && c.kind !== truth.kind) {
        problems.push(
          `disagrees      ${c.href} is “${c.kind}” here and “${truth.kind}” on the plate`
        );
      }
    }
  }

  /* Cards no grid claimed. Reported rather than shrugged at: an uncheckable card is
     not a passing card. */
  const orphans = page.allCards.length - inGrids;
  if (orphans > 0) {
    totalOrphans += orphans;
    pageCards += orphans;
    problems.push(
      `outside a grid ${orphans} card(s) sit outside any card grid and were not order-checked — ` +
        'the grid selector has drifted'
    );
  }

  totalCards += pageCards;
  totalNumbered += pageNumbered;
  totalUnnumbered += pageUnnumbered;

  const shown = verbose ? problems : problems.slice(0, MAX_SHOWN);
  console.log(
    `  ${file.padEnd(30)} ${problems.length ? 'FAIL' : 'ok  '}  ` +
      `${String(page.grids.length).padStart(2)} grid(s)  ${String(pageCards).padStart(3)} cards  ` +
      `${String(pageNumbered).padStart(3)} numbered`
  );
  for (const p of shown) console.log(`      ${p}`);
  if (problems.length > shown.length) {
    console.log(`      … and ${problems.length - shown.length} more (run with --verbose)`);
  }

  totalProblems += problems.length;
  if (problems.length) pagesWithProblems++;
}

/* ── rule 3, second half: the addresses the plate does not card ───────────────── */

/* The plate cards the eight sheets and nothing else, so it can say nothing about the
   cabinet's own pages — and `/` is carded by two sibling navs as "Plate" on one and
   "The plate" on the other, which the authority pass cannot see because the plate
   does not card itself.
 *
 * Where there is no authority there is still an obligation: every copy of one fact
 * must agree with every other copy. Reported apart from the per-page findings and
 * counted once per address rather than once per page, because "these two disagree"
 * is one fact about two files and printing it twice would invite somebody to fix
 * whichever page they happened to read first. */
const variants = new Map(); // href -> field -> value -> Set<file>
for (const [file, page] of pages) {
  if (page.unread) continue;
  for (const c of page.allCards) {
    if (authority.has(c.href)) continue;
    if (!variants.has(c.href)) variants.set(c.href, { kind: new Map(), label: new Map() });
    const v = variants.get(c.href);
    for (const field of ['kind', 'label']) {
      const val = c[field];
      if (val === null || val === '') continue;
      if (!v[field].has(val)) v[field].set(val, new Set());
      v[field].get(val).add(file);
    }
  }
}

const crossProblems = [];
for (const [href, v] of [...variants].sort()) {
  for (const field of ['kind', 'label']) {
    if (v[field].size < 2) continue;
    const shown = [...v[field]]
      .map(([val, files]) => `“${val}” on ${[...files].sort().join(', ')}`)
      .join('\n                       ');
    crossProblems.push(
      `${href} is carded with ${v[field].size} different ${field}s, and the plate does not card it,\n` +
        `                       so nothing can arbitrate — pick one:\n                       ${shown}`
    );
  }
}
if (crossProblems.length) {
  console.log(`\n  cards the plate does not arbitrate`);
  for (const p of crossProblems) console.log(`      disagrees      ${p}`);
  totalProblems += crossProblems.length;
}

/* Everything measured is printed as a number, for the reason every tool in here
   prints one: "no problems" reads identically whether the grids were walked or the
   selector matched nothing at all. */
console.log(
  `\n${totalGrids} grid(s) across ${checkedPages} card-bearing page(s) of ${targets.length} · ` +
    `${totalCards} card(s) · ${totalNumbered} numbered, ${totalUnnumbered} unnumbered · ` +
    `${totalProblems} problem(s)`
);

if (!authority.size) {
  console.log(
    `NOT MEASURED — ${AUTHORITY} carded nothing${authorityCards === null ? ' (it could not be read)' : ''}, so rule 3\n` +
      '               compared every page against an empty plate and could not have failed.\n' +
      '               Same guard as the overlap gate’s empty pass: a check that measured\n' +
      '               nothing must not read like a check that found nothing.'
  );
  totalProblems++;
} else {
  console.log(`${authority.size} address(es) carded on ${AUTHORITY} are the authority for number and kind.`);
}
if (totalUnnumbered) {
  console.log(
    `${totalUnnumbered} card(s) carry a slug rather than a number and are not order-checked ` +
      '(the colophon, the register, the finding aid, the plate itself).'
  );
}
if (exemptGrids) {
  console.log(`${exemptGrids} grid(s) exempt by name in ALLOWED_UNORDERED.`);
}
if (totalOrphans) {
  console.log(`${totalOrphans} card(s) were outside every grid and went unchecked.`);
}

if (totalProblems) {
  console.log(
    gating
      ? `\nFAIL — ${totalProblems} problem(s) on ${pagesWithProblems} page(s). Nothing on the live page\n` +
          'looks broken, which is exactly why this needs a gate: a plate out of sequence, or a\n' +
          'sheet its neighbours misname, reads as a clean page to every other check here.'
      : '\nRun with --check to make this gate a ship.'
  );
} else {
  console.log(
    'PASS — every card grid ascends as one sequence, every card agrees with the plate\n' +
      '       about a sheet’s number and kind, and no card sits outside a grid where it\n' +
      '       could not be checked.'
  );
}

process.exit(gating && totalProblems ? 1 : 0);
