#!/usr/bin/env node
/**
 * check-overlap.mjs — finds text sitting on top of other text at render size.
 *
 * PORTED from Star Stuff on 2026-09-09, where it exists because a zine shipped with
 * three real collisions that a person found by squinting at a screenshot. The house
 * rule is to port a check when the failure it catches becomes possible here, and it
 * became possible the same afternoon: a corner-floated accession stamp was designed,
 * measured, and REFUSED partly because nothing in this repo could see it land on the
 * prose. Refusing a design for want of a gate is a reason to build the gate.
 *
 * The measurement is Star Stuff's, near enough verbatim, because the geometry is not
 * site-specific. What follows is what changed, and why.
 *
 * ── 1. THIS SITE HAS NO RENDERED SVG TEXT, AND THAT IS THE INTERESTING PART ──────
 * Not one `text` element in any page here. The botanical art is 535 paths, 381 groups
 * and 160 ellipses and circles, and it is named to a screen reader by `aria-label` and
 * `title` — neither of which paints a glyph. That is a consequence of a house rule:
 * NEVER AN IMAGE OF TEXT. So the two fault kinds that motivated this tool on Star
 * Stuff — a diagram label on another diagram label, and a diagram label on the prose —
 * cannot fire on this site today.
 *
 * They are kept anyway, and the reasoning is the reverse of the usual one. A check
 * that cannot fail is a check nobody reads, and this repo runs six gates rather than
 * eleven for exactly that reason. But this is not a separate check: it is one
 * positional sweep with three labels on its findings, and DROPPING the SVG half would
 * mean the sweep stops measuring SVG text — so the day a sheet does carry a label, the
 * gate reports a clean page it never looked at. That is the "8% of itself" failure the
 * contrast gate already paid for. Measuring costs nothing; not measuring costs the
 * next sheet. The two SVG kinds were proved by INJECTING a label rather than by any
 * real page, and this comment is here so nobody mistakes them for battle-tested.
 *
 * ── 2. `.qe-sr` IS INVISIBLE AND STAR STUFF'S TEST CANNOT SEE THAT ──────────────
 * Its `hidden()` checks `display:none`, `visibility:hidden` and `opacity:0`. The
 * visually-hidden pattern here uses none of them: `.qe-sr` is a 1px box with
 * `overflow:hidden` and `clip-path: inset(50%)`, holding real text like "Link to this
 * section" — 113 of them across the site, one per section address. Unhandled, every
 * one is a large phantom box: the element is 1×1, but the text node's own Range rect
 * measures 288×39px at 32px type, sitting over real layout. It is excluded from the
 * measurement, because it is not ink.
 *
 * MEASURED, and the first version of this note was wrong. It claimed the exclusion
 * suppressed phantom collisions and phantom clips "113 times". It suppresses NEITHER
 * today: removing `.qe-sr` from the list adds 113 boxes and still reports zero of
 * both. No phantom clip because the clip walk never consulted the element's own
 * overflow (fixed below, and that is a fault in the imported tool rather than here).
 * No phantom collision because 113 invisible 288×39 rects happen not to intersect
 * anything on these fourteen pages — which is POSITION LUCK AND NOT STRUCTURE. The
 * exclusion stays because measuring text no eye can see is measuring the wrong thing,
 * and the pass that makes it look unnecessary is one moved heading from being noisy.
 *
 * DECLARED, not sniffed: a rule like "ignore anything with clip-path" is how a real
 * clip disappears the day somebody uses clip-path for a decorative mask.
 *
 * ── 3. ROTATION, WHICH THIS SITE DOES FIFTEEN TIMES ─────────────────────────────
 * `getClientRects()` on rotated text returns the axis-aligned bounding box of the
 * rotated quad, which is much taller than the glyphs: the accession stamp's bottom
 * line is 11px of type whose AABB is 29px once the stamp leans 7 degrees. Left alone
 * that would invent collisions everywhere the type leans, which on this site is the
 * masthead titles, the slips and every stamp.
 *
 * INK_RATIO already fixes it, and this is worth knowing rather than rediscovering:
 * the shrink takes `min(rect.height, em × INK_RATIO)` centred in the line box, so an
 * inflated AABB is discarded in favour of the em box and a leaning line is measured
 * at its type size. Horizontal inflation is real but tiny — 151.0px of text becomes
 * 151.3px at 7 degrees. Nothing needed adding; the imported constant was already the
 * defence. If a future component leans far enough for that to stop holding, the fix
 * is to measure the rotated quad, not to widen the tolerance until the noise stops.
 *
 * ── 4. IT SHARES ITS PLUMBING, ON PURPOSE ───────────────────────────────────────
 * REVEAL and UNREVEAL come from `tools/reveal.mjs` and the Chrome client from
 * `tools/cdp.mjs`, both extracted from `check-contrast.mjs` in this same pass rather
 * than copied. REVEAL matters most: it is the list of things a page builds at runtime,
 * it is editorial, it GROWS, and its own comment tells the next author to add to it.
 * Two copies of that list is a component one gate learns and the other does not —
 * the exact failure the shared entity table and the shared page order exist to
 * prevent. The extraction was proved output-neutral: `check-contrast --check`
 * printed a byte-identical report before and after.
 *
 * ── WHAT IT REPORTS ─────────────────────────────────────────────────────────────
 *   html-vs-html   two pieces of page text on each other. Reachable here through
 *                  absolute positioning (7 places), a transform (15) or a negative
 *                  margin (3). This is the kind the corner-floated stamp would have
 *                  produced, and the only kind with a live instance to prove.
 *   svg-vs-svg     two labels in one drawing. No instance on this site — see 1.
 *   svg-vs-html    a drawing's label on the prose. No instance on this site — see 1.
 *   clipped        text outside the box that cuts it off, so the reader gets a
 *                  sentence with the end sliced away. Not a collision, but the same
 *                  fault — text landing where it does not fit — and the same
 *                  measurement finds it.
 *
 * ── 5. IT MEASURES PAPER, WHICH THE UPSTREAM TOOL DOES NOT ──────────────────────
 * Added the same day as the port. Star Stuff defers print collisions to its
 * `check-sheets.mjs`; this repo has no paper gate at all, and paper is the medium this
 * house has already been burned by — 44 of 46 pages once printed blank there.
 *
 * THE VIEWPORT MOVES, and that is the whole point rather than a detail.
 * `check-contrast.mjs` emulates print media at 1280px and is right to: it measures
 * colour, and colour does not reflow. A collision is a position. This stylesheet sets
 * `main { max-width: none }` in print, so the text runs the full width of the sheet —
 * measuring that at 1280px measures a line length no printer produces. The counts show
 * it: `/changelog` is 4,884 boxes on screen, 3,567 on Letter and 3,604 on A4.
 *
 * BOTH PAPERS, because picking one width and calling it "print" is the same mistake
 * this pass exists to fix, 22px smaller. Letter and A4 differ by that much and it is
 * enough to rewrap a line and move a hand-placed mark, as those two counts show.
 *
 * REVEAL IS UNDONE FIRST. `reveal.mjs` says why in its own header: the print
 * stylesheet reveals a different state, and measuring a screen-only class left
 * switched on is how Star Stuff invented 257 print failures on one page. Proved in
 * both directions — a screen-only collision reports 7 on screen and 0 on paper; a
 * print-only collision reports 0 on screen and 3 on each paper.
 *
 * AND THE EMPTY-PASS GUARD IS PER PASS, which turns out to catch the original
 * disaster. A page whose print stylesheet renders nothing measures zero boxes on
 * paper while measuring hundreds on screen — and is reported as NOT MEASURED rather
 * than as clean. Verified with `@media print { body { display: none } }`: the run
 * fails, names the page, and names which passes were blank. The 44-blank-pages fault
 * would not have survived this gate.
 *
 * ── WHAT IT DOES NOT MEASURE ────────────────────────────────────────────────────
 *   · PAGINATION, and this is the honest limit of the paper pass. Chrome's print
 *     emulation reflows to the width but does not break the document into sheets, so
 *     a collision that exists only because two blocks land either side of a page
 *     break is invisible here. `break-inside: avoid` on `.qe-accession-block` exists
 *     because pagination is real. Getting at it means extracting text positions from
 *     `Page.printToPDF` output, which is a different tool rather than a flag on this
 *     one. What this pass covers is the print stylesheet's LAYOUT at paper width.
 *   · ONE VIEWPORT, 1280×900, the width `check-contrast.mjs` uses, so a run is
 *     reproducible and the media queries resolve the same way every time. A collision
 *     that only happens at 380px is real and this will not see it. The cabinet ground
 *     is not swept either: it is a palette swap and moves nothing.
 *   · TEXT OVER ARTWORK. A leaf through a word is a legibility judgement about a
 *     drawing, and CLAUDE.md is right that a person has to look at a plate.
 *
 * USAGE
 *   node tools/check-overlap.mjs                 # every *.html in the repo root
 *   node tools/check-overlap.mjs on-being-ill.html
 *   node tools/check-overlap.mjs --check         # exit non-zero on any collision
 *
 * `--check` is the gating mode, matching its siblings, and it is load-bearing: a plain
 * run reports and exits 0. CLAUDE.md left that flag off the contrast gate once and the
 * whole two-tier apparatus shipped as advice.
 *
 * BASELINE: 0, over all 14 pages in all three passes — 28,882 text boxes. Keep it
 * there. A gate that ships with a non-zero baseline has to be read past to reach the
 * real number, and then it stops being read.
 *
 * Requires: Google Chrome. Node 22+ for the global WebSocket. Netlify never runs it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { REVEAL, UNREVEAL } from './reveal.mjs';
import { CHROME, withPage as withPageOnPort, evaluated, sleep, settle, resolveTargets } from './cdp.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 9413; // 9411 the search index, 9412 the contrast gate — one each, so they run together
const CHECK = process.argv.includes('--check');
const VERBOSE = process.argv.includes('--verbose');
const VIEWPORT = { width: 1280, height: 900 };

/* Paper, as a CONTENT box rather than a sheet: the sheet less Chrome's default 0.4in
   margin on each side, at 96 CSS px to the inch. Letter is 8.5×11in → 7.7×10.2in of
   content; A4 is 8.27×11.69in → 7.47×10.89in. The two differ by 22px of width, which
   is exactly the size of difference that reflows a line and moves a hand-placed mark. */
const PAPERS = [
  ['letter', Math.round(7.7 * 96), Math.round(10.2 * 96)],
  ['a4', Math.round(7.47 * 96), Math.round(10.89 * 96)],
];
const withPage = (url, fn) => withPageOnPort(PORT, url, fn);

const MEASURE = String.raw`((cfg) => {
  const { INK_RATIO, MIN_OVERLAP, MIN_PX, CLIP_TOL, OFFSCREEN, INVISIBLE } = cfg;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  /* ── boxes ────────────────────────────────────────────────────────────────
     One entry per rendered line fragment of text. Each carries the font size it
     is set in, because every tolerance below is scaled to it: 2px of overlap is a
     catastrophe at 5.5px type and invisible at 72px. */
  const boxes = [];

  const clean = (s) => String(s).replace(/\s+/g, ' ').trim();

  /* Shrink a line box to the ink it plausibly contains. See the header: the line
     box includes half-leading, which is empty space the next element is entitled
     to occupy, and trusting it flags .cover-corner-label on all 40 zine covers. */
  const push = (rect, em, el, text, kind) => {
    if (!rect || rect.width <= 0 || rect.height <= 0) return;
    if (em < MIN_PX) return;
    const h = Math.min(rect.height, em * INK_RATIO);
    const cy = rect.top + rect.height / 2;
    boxes.push({
      l: rect.left, r: rect.right, t: cy - h / 2, b: cy + h / 2,
      em, el, kind,
      /* Which exclusive-accordion panel this box is inside, if any. data-ss-name
         is what reveal.mjs leaves behind when it dissolves an HTML exclusive
         accordion so both members can be measured; the live attribute is name.
         Read both, so this is right whether or not the page was revealed. */
      excl: el.closest ? el.closest('details[data-ss-name], details[name]') : null,
      text: clean(text).slice(0, 46),
    });
  };

  const exclName = (d) => d.getAttribute('data-ss-name') || d.getAttribute('name');

  const hidden = (el) => {
    /* INVISIBLE first, and it has to be a selector test rather than a style test.
       The visually-hidden pattern here is a 1px box with overflow:hidden and
       clip-path:inset(50%) — none of display:none, visibility:hidden or opacity:0,
       so the three checks below all say "visible" about text no eye ever sees.
       Unhandled it is both a phantom collision and a phantom clip, 113 times.
       Sniffing for clip-path instead would silently swallow a REAL clip the day
       somebody uses clip-path as a decorative mask, so the list is declared. */
    if (INVISIBLE.some((q) => el.closest && el.closest(q))) return true;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return true;
      if (parseFloat(cs.opacity) === 0) return true;
    }
    return false;
  };

  /* ── 1. HTML text nodes ───────────────────────────────────────────────────
     Nodes, not elements. An element box is the wrong shape twice over: it spans
     the full column width when the text does not (the .cover-issue false positive
     that made the prototype unusable), and it contains its descendants' boxes, so
     every <span> in a <p> is a guaranteed hit. A text node's Range rects are the
     glyphs and nothing else. */
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!clean(n.textContent)) continue;
    const el = n.parentElement;
    if (!el || el.namespaceURI === SVG_NS) continue; // SVG handled below, with its own geometry
    if (el.closest('script,style,title,head')) continue;
    if (hidden(el)) continue;
    const em = parseFloat(getComputedStyle(el).fontSize);
    const range = document.createRange();
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) push(r, em, el, n.textContent, 'html');
  }

  /* ── 2. SVG text ──────────────────────────────────────────────────────────
     <text>, not <tspan>: a tspan's rect is contained by its parent text's, so
     measuring both guarantees a self-hit on every multi-tspan label in the repo.
     getBoundingClientRect on SVG text is already the glyph bbox — no Range needed
     — but it is scaled by the viewBox, so the em size has to be scaled with it or
     every tolerance below is computed in the wrong units. */
  for (const svg of document.querySelectorAll('svg')) {
    if (hidden(svg)) continue;
    const sr = svg.getBoundingClientRect();
    if (!sr.width || !sr.height) continue;
    const vb = svg.viewBox && svg.viewBox.baseVal;
    const scale = vb && vb.width ? sr.width / vb.width : 1;
    for (const t of svg.querySelectorAll('text')) {
      const text = clean(t.textContent);
      if (!text) continue;
      if (hidden(t)) continue;
      const em = parseFloat(getComputedStyle(t).fontSize) * scale;
      push(t.getBoundingClientRect(), em, t, text, 'svg');
    }
  }

  /* ── 3. pairwise ──────────────────────────────────────────────────────────
     Sorted by top edge and swept, so the inner loop breaks as soon as a box
     starts below the current one's bottom. Brute force is O(n²) on pages with
     3,000 text fragments; the sweep makes a full-repo run seconds rather than
     minutes, and gives the identical answer because the comparison requires
     vertical overlap anyway. */
  boxes.sort((a, b) => a.t - b.t);

  const hits = [];
  for (let i = 0; i < boxes.length; i++) {
    const a = boxes[i];
    for (let j = i + 1; j < boxes.length; j++) {
      const b = boxes[j];
      if (b.t >= a.b) break; // sorted: nothing after this can overlap a vertically

      /* Tolerance scaled to the smaller type. A 2px intrusion is most of a 5.5px
         label and nothing at all on a 72px cover title. Both axes must clear it:
         glyph overhang from kerning, italics and letter-spacing routinely puts a
         sliver of one box inside another on pages that are perfectly fine. */
      const tol = Math.max(0.75, MIN_OVERLAP * Math.min(a.em, b.em));
      const dx = Math.min(a.r, b.r) - Math.max(a.l, b.l);
      if (dx <= tol) continue;
      const dy = Math.min(a.b, b.b) - Math.max(a.t, b.t);
      if (dy <= tol) continue;

      /* Same element twice is a wrapped line, not a collision, and a text node
         next to its own inline sibling on the same line is normal flow. Only
         genuinely separate boxes count. */
      if (a.el === b.el) continue;

      /* TWO MEMBERS OF ONE EXCLUSIVE ACCORDION CANNOT BOTH BE ON SCREEN, so text
         in one landing on text in the other is a state no reader reaches. HTML's
         name on a details element is that guarantee — opening one closes the
         rest, natively and without script — and it is what the controls tray uses
         to keep the reading settings and the drawers menu off each other when
         JavaScript is off. reveal.mjs has to dissolve the group to measure both
         panels at all, which is exactly what invents the pair this skips.

         DECLARED BY THE MARKUP RATHER THAN LISTED HERE, which is the bar the
         INVISIBLE list sets: this is not "ignore overlapping panels", it is "these
         two elements are spec-guaranteed never to be open together". A panel that
         stops being exclusive stops being exempt, in the same edit. */
      if (a.excl && b.excl && a.excl !== b.excl &&
          exclName(a.excl) === exclName(b.excl)) continue;

      hits.push({
        kind: a.kind === b.kind ? a.kind + '-vs-' + b.kind : 'svg-vs-html',
        a: a.text, b: b.text,
        aSel: sel(a.el), bSel: sel(b.el),
        dx: Math.round(dx * 10) / 10, dy: Math.round(dy * 10) / 10,
        where: locate(a.el),
      });
    }
  }

  /* ── 4. clipped ───────────────────────────────────────────────────────────
     Text running outside something that cuts it off. Two hosts count, and both
     are real: the nearest ancestor that actually computes overflow hidden/clip,
     and — for SVG text — the <svg> viewport itself, which clips by UA default
     once it has a viewBox. A hand-placed label at y=168 in a 340-unit box stays
     inside; the same label in a 120-unit box is sliced, and nothing else here
     would say so.

     The tolerance is a fraction of the type size, not a pixel count, because the
     thing it has to absorb scales with the type: getBBox reports the glyph ADVANCE
     box, which includes side bearings — empty space inside the box that no ink
     occupies. A monospace quote mark's trailing bearing is a sixth of an em of
     nothing. CLIP_TOL sits between the two cases actually measured here rather
     than being picked: the-lines-we-drew-zine.html lost 0.86em off the left of
     "light-years" and the reader got "ight-years", while
     why-difference-comes-first-zine.html had 0.22em of a closing quote's bearing
     past the edge with the glyph itself intact. */
  const clipped = [];
  let offscreen = 0;
  const CLIP = new Set(['hidden', 'clip']);
  for (const box of boxes) {
    const el = box.el;
    let host = null;
    if (box.kind === 'svg') {
      /* A viewBox'd <svg> clips at its viewport by UA default, so it is a clip host
         unless the page explicitly said overflow:visible — which several diagrams
         here do, on purpose, to let a stroke breathe past the edge. Honour that. */
      const svg = el.ownerSVGElement;
      if (svg && svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width) {
        const cs = getComputedStyle(svg);
        if (CLIP.has(cs.overflowX) || CLIP.has(cs.overflowY)) host = svg;
      }
    }
    if (!host) {
      /* STARTS AT THE ELEMENT, not its parent. The imported version began the walk at
         el.parentElement, so an element that clips its OWN overflowing text was never
         a clip host and the fault was invisible. Found here by probing why .qe-sr
         produced no phantom clip: it is a 1px box with overflow:hidden holding a
         288x39px line of text, and nothing reported it because the walk stepped over
         the very element doing the clipping. .qe-sr is excluded as invisible anyway,
         so this changes no finding on this site today - the only overflow:hidden in
         the stylesheet is .qe-sr's own. It changes what happens the day a real
         component clips its own words. Recorded in DECISIONS.md for upstream. */
      for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (CLIP.has(cs.overflowX) || CLIP.has(cs.overflowY)) { host = n; break; }
      }
    }
    if (!host) continue;
    const h = host.getBoundingClientRect();
    if (!h.width || !h.height) continue;
    const out = Math.max(h.left - box.l, box.r - h.right, h.top - box.t, box.b - h.bottom);
    if (out > Math.max(1, CLIP_TOL * box.em)) {
      /* Offscreen by design — see OFFSCREEN below. Counted, never silently dropped:
         a clip this tool stops reporting is a clip nobody is looking for. */
      if (OFFSCREEN.some((q) => el.closest && el.closest(q))) { offscreen++; continue; }
      clipped.push({
        text: box.text, sel: sel(el), by: Math.round(out * 10) / 10,
        em: Math.round((out / box.em) * 100) / 100,
        host: sel(host), where: locate(el),
      });
    }
  }

  function sel(el) {
    if (!el || !el.tagName) return '?';
    const c = el.getAttribute && el.getAttribute('class');
    const cls = c && typeof c === 'string' ? '.' + c.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return el.tagName.toLowerCase() + cls;
  }
  function locate(el) {
    /* Star Stuff locates a finding on a paged .spread. Nothing here is paged, so the
       useful answer is the nearest heading a reader can actually be SENT to, and on
       this site one always exists: every h2 carries an authored id by house rule, for
       exactly this purpose. A section nobody can link to is a section nobody can cite.

       Walked backwards over real document order rather than up the ancestor chain.
       The first version did the latter and reported 'page' for the very case this gate
       was built for: an absolutely positioned block is a CHILD of main, so it has no
       heading among its ancestors' previous siblings, and the finding that most needed
       an address was the one that got none. */
    let best = null;
    for (const h of document.querySelectorAll('h1[id],h2[id],h3[id],h4[id]'))
      if (el.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING) best = h;
    if (best) return '#' + best.id;
    const sec = el.closest && el.closest('section[aria-labelledby],section[id]');
    const id = sec && (sec.id || sec.getAttribute('aria-labelledby'));
    return id ? '#' + id : 'page';
  }

  return JSON.stringify({ boxes: boxes.length, hits, clipped, offscreen });
})`;
/* The tuning, in one place and named, because these numbers are the whole difference
   between a gate and a noise generator, and the next person to widen one should have
   to read the comment above it. Imported unchanged from Star Stuff except INVISIBLE.

   INK_RATIO   fraction of font-size treated as glyph height inside the line box.
               0.8 is about cap-height plus descender for Fraunces and Newsreader.
               It is also, unexpectedly, this site's defence against rotation — see
               note 3 in the header. Higher flags half-leading; lower misses real hits.
   MIN_OVERLAP required intersection in BOTH axes, as a fraction of the smaller font
               size. 0.22 clears kerning and italic overhang.
   MIN_PX      ignore type below this. Nothing readable is under 3px.
   CLIP_TOL    how far outside a clipping box text may sit, as a fraction of its own
               font size, before it counts as cut off. Absorbs the glyph advance box's
               side bearings, which are empty space no ink occupies.
   INVISIBLE   text that is not ink at all. `.qe-sr` is the visually-hidden pattern —
               a 1px box, overflow hidden, clip-path inset(50%) — carrying the section
               addresses' "Link to this section" and the search field's labels. 113 of
               them. Excluded from the measurement, not from the report, because a
               phantom is worse than a silence: it teaches the reader to skip the gate.
   OFFSCREEN   text SUPPOSED to sit outside its box, so a clip is the feature. The bar
               for an entry is a decision somebody wrote down with a reason, never a
               pattern a page can fall into — and deliberately no rule like "ignore
               anything positioned off the viewport", which is how a real clip
               disappears by acquiring a position property.

               EMPTY, AND THAT WAS TESTED RATHER THAN ASSUMED. `.qe-skip` was in it on
               the strength of Star Stuff's note, where the equivalent skip link fires
               the clip check on 5 of its first 7 pages. Removed after measuring: with
               the list empty this site still reports zero clips, because `.qe-skip`
               here has no clipping ancestor to be outside of. An exemption that
               exempts nothing is not free — it is a named hole a real clip can fall
               into later, and it reads as evidence that somebody checked. */
const CFG = {
  INK_RATIO: 0.8, MIN_OVERLAP: 0.22, MIN_PX: 3, CLIP_TOL: 0.25,
  INVISIBLE: ['.qe-sr'],
  OFFSCREEN: [],
};

async function main() {
  const files = resolveTargets(ROOT);

  const chrome = spawn(
    CHROME,
    ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
     `--user-data-dir=${path.join(fs.mkdtempSync('/tmp/qe-overlap-'), 'profile')}`, 'about:blank'],
    { stdio: 'ignore' }
  );
  for (let i = 0; i < 60; i++) {
    try { await fetch(`http://127.0.0.1:${PORT}/json/version`); break; } catch { await sleep(250); }
  }

  const results = [];
  const unread = [];
  try {
    for (const f of files) {
      try {
        const out = await withPage(`file://${path.join(ROOT, f)}`, async (send) => {
          const measure = async (what) => evaluated(
            await send('Runtime.evaluate',
              { expression: `(${MEASURE})(${JSON.stringify(CFG)})`, returnByValue: true }),
            what
          );
          const viewport = (w, h) => send('Emulation.setDeviceMetricsOverride',
            { width: w, height: h, deviceScaleFactor: 1, mobile: false });

          await viewport(VIEWPORT.width, VIEWPORT.height);
          const n = await settle(send);
          if (n === null) return null;

          /* SCREEN, with the runtime components revealed: /search builds its whole
             result UI at load and would otherwise be an empty div. */
          evaluated(await send('Runtime.evaluate', { expression: REVEAL, returnByValue: true }), 'reveal');
          const screen = await measure('screen measure');

          /* PAPER. UNREVEAL FIRST, and this is not tidiness — reveal.mjs says so in
             its own header. The print stylesheet reveals a DIFFERENT state, and
             measuring a screen-only class left switched on is how Star Stuff invented
             257 print failures on one page. */
          evaluated(await send('Runtime.evaluate', { expression: UNREVEAL, returnByValue: true }), 'unreveal');
          await send('Emulation.setEmulatedMedia', { media: 'print' });

          /* AND THE VIEWPORT MOVES, which is the whole reason this pass exists and the
             one place it departs from check-contrast.mjs. That gate emulates print
             media at 1280px and is right to: it measures colour, and colour does not
             reflow. Overlap is a position. In print this stylesheet sets
             `main { max-width: none }`, so the text runs the full width of the paper
             — measuring that at 1280px measures a line length no printer produces and
             a layout no reader ever sees.
             BOTH PAPERS, because hardcoding one width and calling it "print" would be
             the same mistake this pass exists to fix, 22px smaller. Chrome's default
             print margin is 0.4in a side, so the content box is the sheet less 0.8in. */
          const paper = {};
          for (const [name, w, h] of PAPERS) {
            await viewport(w, h);
            await sleep(250);
            paper[name] = await measure(`${name} measure`);
          }

          await send('Emulation.setEmulatedMedia', { media: '', features: [] });
          await viewport(VIEWPORT.width, VIEWPORT.height);
          return { screen, paper };
        });
        if (out === null) { unread.push([f, 'never settled']); continue; }
        /* A page that measured NOTHING is a broken run, not a clean page — the lesson
           every tool in this repo learned separately. It gates with the others, and it
           is checked PER PASS: a print pass that measured nothing while the screen
           pass measured 4,787 boxes is the exact silent success this guards against. */
        const empty = [['screen', out.screen], ...Object.entries(out.paper)]
          .filter(([, o]) => !o || !o.boxes).map(([k]) => k);
        if (empty.length) { unread.push([f, `measured 0 text boxes in: ${empty.join(', ')}`]); continue; }
        results.push([f, out]);
      } catch (e) {
        unread.push([f, String(e.message || e).slice(0, 90)]);
      }
    }
  } finally {
    chrome.kill();
  }

  // ── report ──────────────────────────────────────────────────────────────────
  /* Each page is one line per PASS THAT FOUND SOMETHING, plus one summary line. The
     alternative — three lines per page always — is 42 lines of "ok" to read past on a
     clean run, and a gate nobody reads is a gate that does not work. But a pass is
     never silently omitted from the totals: the counts below sum every pass. */
  const passes = (o) => [['screen', o.screen], ...Object.entries(o.paper)];
  const tally = (o) => passes(o).reduce((a, [, p]) => a + p.hits.length + p.clipped.length, 0);

  console.log();
  for (const [f, o] of results) {
    const n = tally(o);
    const boxSummary = passes(o).map(([k, p]) => `${k} ${p.boxes}`).join(' · ');
    console.log(`  ${f.padEnd(42)} ${n ? 'FAIL' : 'ok  '}   ${boxSummary}`);
    for (const [name, p] of passes(o)) {
      for (const h of p.hits)
        console.log(`      [${name}] ${h.kind}  ${h.dx}×${h.dy}px at ${h.where}\n        ${h.aSel} "${h.a}"\n        ${h.bSel} "${h.b}"`);
      for (const c of p.clipped)
        console.log(`      [${name}] clipped  ${c.by}px (${c.em}em) outside ${c.host} at ${c.where}\n        ${c.sel} "${c.text}"`);
    }
  }

  const sum = (fn) => results.reduce((a, [, o]) => a + passes(o).reduce((b, [, p]) => b + fn(p), 0), 0);
  const hits = sum((p) => p.hits.length);
  const clipped = sum((p) => p.clipped.length);
  const boxes = sum((p) => p.boxes);
  const offscreen = sum((p) => p.offscreen || 0);

  /* PER PASS, because one number hides which medium is broken — and print is the
     medium this house has been burned by. */
  console.log(`\n${results.length} page(s) · ${boxes.toLocaleString()} text boxes measured across ${1 + PAPERS.length} pass(es)`);
  for (const [name] of [['screen'], ...PAPERS.map((p) => [p[0]])]) {
    const h = results.reduce((a, [, o]) => a + (passes(o).find(([k]) => k === name)?.[1].hits.length ?? 0), 0);
    const c = results.reduce((a, [, o]) => a + (passes(o).find(([k]) => k === name)?.[1].clipped.length ?? 0), 0);
    const w = name === 'screen' ? `${VIEWPORT.width}×${VIEWPORT.height}` : PAPERS.find((x) => x[0] === name).slice(1).join('×');
    console.log(`  ${name.padEnd(8)} ${w.padEnd(10)} ${h} collision(s), ${c} clipped`);
  }

  /* On its own line, like the contrast gate's exemption counts: a number folded into
     a total is a number nobody reads, and a list that grows is a list somebody can
     question. */
  if (offscreen)
    console.log(`${offscreen} text box(es) sit outside their container BY DESIGN and are exempt (${CFG.OFFSCREEN.join(', ')}).`);
  if (VERBOSE)
    console.log(`${CFG.INVISIBLE.join(', ')} is excluded from the measurement entirely: visually-hidden text is not ink.`);

  if (unread.length) {
    console.error(`\n${unread.length} page(s) WERE NOT MEASURED. Nothing above counts for these:`);
    for (const [f, why] of unread) console.error(`  ${f.padEnd(44)} ${why}`);
  }

  const problems = hits + clipped;
  if (CHECK) {
    if (unread.length) {
      console.error(`\nFAIL — ${unread.length} page(s) not measured; the run is incomplete.`);
      process.exit(1);
    }
    if (problems) {
      console.error(
        `\nFAIL — ${problems} place(s) where text lands on other text, or outside the box\n` +
        'that clips it. Move the text; do not shrink it until it happens to miss.'
      );
      process.exit(1);
    }
    console.log('\nPASS — no text sits on other text, and nothing is clipped by its own container.');
    process.exit(0);
  }
  if (problems) console.log(`\n${problems} problem(s). Run with --check to make this a ship-blocker.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
