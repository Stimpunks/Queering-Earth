#!/usr/bin/env node
/**
 * check-width.mjs — no page scrolls sideways, on screen or on paper.
 *
 * NATIVE, NOT PORTED, and it exists because the failure happened. `/changelog`
 * measured a 414px document at a 375px viewport; `/ledger` 812px at 320 and 943 at
 * 768; `/what-is-settled` 425. All three had been live since the day each was
 * mounted, and ALL EIGHT EXISTING GATES PASSED THEM. That is the same bar
 * `check-cache.mjs` cleared: a fault that reached production, not a fault somebody
 * imagined. A check that cannot fail is a check nobody reads — this one could have
 * failed on three of twenty-five pages the hour before it was written.
 *
 * ── WHY NO EXISTING GATE SEES IT ────────────────────────────────────────────────
 * `check-overlap.mjs` is the only other tool that knows where anything is, and it
 * asks a DIFFERENT question: is this text on top of that text. Text running past the
 * right margin is on top of nothing at all — there is nothing out there. Its clip
 * walk does not catch it either, because the document is not a clipping container:
 * it grows. And its screen pass is 1280px, where none of the three faults exists.
 *
 * ── WHY IT WILL FAIL AGAIN, WHICH IS THE REAL ARGUMENT ──────────────────────────
 * This is not a one-off that a careful edit retires. The strings that break a line
 * box are DOIs, archive.org identifiers, sha256 masters, SKS file paths and hook
 * URLs — and `ATTRIBUTIONS.md` grows one or more of them every time the
 * `credit-source` skill records a source, `DECISIONS.md` every time a session
 * settles something, and `make-records.mjs` pours both onto a page. The hazard is
 * attached to the routine workflow, so the guard is too.
 *
 * ── IT MEASURES PAPER, AND PAPER IS WHERE THE TEXT WAS ACTUALLY LOST ────────────
 * On screen an over-wide string is a nuisance: the reader swipes. On paper there is
 * no swiping and `@media print` deliberately sets `.qe-editions-scroll { overflow-x:
 * visible }`, so `/ledger` put 802px of content on a 717px A4 sheet and the two
 * master hashes ran off the edge of the provenance table. Text off the sheet on a
 * site whose predecessor shipped 44 of 46 pages printing blank is the house fault,
 * and this is the first gate here that can say so.
 *
 * ── WHAT IT DOES NOT DO ─────────────────────────────────────────────────────────
 * It does not report every box past the edge, only the widest text run and its
 * element, because the document width is ONE number and a list of forty boxes that
 * all sit downstream of one unbreakable hash is a list nobody triages. It does not
 * measure vertical overflow — a page is meant to be tall.
 *
 * Excluded from the measurement, DECLARED rather than sniffed, exactly as the
 * overlap gate declares its own: anything inside a container that clips (a real
 * `overflow-x: auto` box is the house answer for wide BLOCK content, and text inside
 * one is content the reader can reach), and `.qe-sr`, which is 1px of clipped box
 * holding a 288px text run that no eye and no printer ever sees.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { REVEAL, UNREVEAL } from './reveal.mjs';
import { CHROME, withPage as withPageOnPort, evaluated, sleep, settle, resolveTargets } from './cdp.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 9414; // 9411 search index, 9412 contrast, 9413 overlap — one each, so they run together
const withPage = (url, fn) => withPageOnPort(PORT, url, fn);

/* 320 IS THE FLOOR AND IT IS NOT ARBITRARY: WCAG 1.4.10 asks that content reflow to
   320 CSS px without two-dimensional scrolling, which is 1280 at the 400% zoom the
   same criterion names. 375 is the phone this house already measures controls at.
   768 and 1280 are here because `/ledger` failed at 768 — a fault that only exists
   on a phone is a guess, and this one was not. */
const SCREENS = [320, 375, 768, 1280];

/* Chrome's default print margin is 0.4in a side, so the content box is the sheet
   less 0.8in. Both papers, for the reason the overlap gate takes both: picking one
   and calling it print is the same mistake 22px smaller. */
const PAPERS = [['Letter', 739], ['A4', 717]];

const TOL = 0.5; // sub-pixel: a 320.0000001px document is not a finding

const MEASURE = (cfg) => {
  const de = document.documentElement;
  const vw = de.clientWidth;

  /* STARTS AT THE ELEMENT, not its parent — the same correction this repo already
     made to the imported overlap gate. An element that clips its OWN overflowing
     text is a clip host, and beginning the walk one level up misses every one. */
  const contained = (el) => {
    for (let a = el; a && a !== de; a = a.parentElement) {
      if (getComputedStyle(a).overflowX !== 'visible') return true;
      for (const sel of cfg.INVISIBLE) if (a.matches && a.matches(sel)) return true;
    }
    return false;
  };

  /* THE WIDEST RUN, NOT THE RIGHTMOST ONE, AND THE FIRST DRAFT GOT THIS WRONG.
     An unbreakable string pushes its whole line, so the run ending furthest right
     is usually the innocent tail after it — the first honest run pointed at
     ", not out of a reading of the source." when the culprit was the 349px `code`
     span before it. A gate that names the wrong words is a gate somebody edits the
     wrong words to satisfy. The widest overflowing run is the long string itself. */
  let culprit = null;
  let runs = 0;
  let boxes = 0;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    if (!n.nodeValue.trim()) continue;
    const par = n.parentElement;
    if (!par || contained(par)) continue;
    const r = document.createRange();
    r.selectNodeContents(n);
    for (const rect of r.getClientRects()) {
      if (!rect.width && !rect.height) continue;
      boxes++;
      const right = rect.right + window.scrollX;
      if (right <= vw + cfg.TOL) continue;
      runs++;
      if (!culprit || rect.width > culprit.width) {
        culprit = {
          width: +rect.width.toFixed(1),
          right: +right.toFixed(1),
          el: par.tagName.toLowerCase() + (par.className ? '.' + String(par.className).trim().split(/\s+/).join('.') : ''),
          text: n.nodeValue.trim().replace(/\s+/g, ' ').slice(0, 72),
        };
      }
    }
  }
  return JSON.stringify({ scrollWidth: de.scrollWidth, clientWidth: vw, runs, boxes, culprit });
};

const CFG = { TOL, INVISIBLE: ['.qe-sr'] };

async function main() {
  const files = resolveTargets(ROOT);

  const chrome = spawn(
    CHROME,
    ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`,
     `--user-data-dir=${path.join(fs.mkdtempSync('/tmp/qe-width-'), 'profile')}`, 'about:blank'],
    { stdio: 'ignore' }
  );
  for (let i = 0; i < 60; i++) {
    try { await fetch(`http://127.0.0.1:${PORT}/json/version`); break; } catch { await sleep(250); }
  }

  const findings = [];
  const unread = [];
  try {
    for (const f of files) {
      try {
        const out = await withPage(`file://${path.join(ROOT, f)}`, async (send) => {
          const viewport = (w) => send('Emulation.setDeviceMetricsOverride',
            { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
          const measure = async (what) => {
            await sleep(200);
            return evaluated(await send('Runtime.evaluate',
              { expression: `(${MEASURE})(${JSON.stringify(CFG)})`, returnByValue: true }), what);
          };

          await viewport(SCREENS[SCREENS.length - 1]);
          if (await settle(send) === null) return null;

          /* REVEALED, because a panel that is shut is a panel this gate cannot see
             push the document — and this house has already been bitten once by an
             overlay whose position was a function of how many controls sat beside
             it. `/search` builds its whole result UI at runtime too. */
          evaluated(await send('Runtime.evaluate', { expression: REVEAL, returnByValue: true }), 'reveal');
          const passes = [];
          for (const w of SCREENS) { await viewport(w); passes.push([`screen ${w}`, w, await measure(`screen ${w}`)]); }

          /* UNREVEAL BEFORE PAPER, per reveal.mjs's own header: the print stylesheet
             reveals a DIFFERENT state, and measuring a screen-only class left on is
             how 257 print failures were invented upstream. */
          evaluated(await send('Runtime.evaluate', { expression: UNREVEAL, returnByValue: true }), 'unreveal');
          await send('Emulation.setEmulatedMedia', { media: 'print' });
          for (const [name, w] of PAPERS) { await viewport(w); passes.push([`paper ${name}`, w, await measure(`paper ${name}`)]); }
          await send('Emulation.setEmulatedMedia', { media: '', features: [] });
          return passes;
        });
        if (out === null) { unread.push([f, 'never settled']); continue; }
        /* A PASS THAT MEASURED NOTHING IS A BROKEN RUN, NOT A CLEAN PAGE — checked
           per pass, because a print pass measuring zero while the screen pass
           measured thousands is exactly the silent success this house has paid for
           before. 44 of 46 pages printing blank would be reported here, not passed. */
        const empty = out.filter(([, , m]) => !m || !m.boxes).map(([k]) => k);
        if (empty.length) { unread.push([f, `measured 0 text boxes in: ${empty.join(', ')}`]); continue; }
        for (const [name, w, m] of out) {
          if (m.scrollWidth > m.clientWidth + TOL || m.runs) findings.push([f, name, w, m]);
        }
      } catch (e) {
        unread.push([f, String(e.message || e).slice(0, 90)]);
      }
    }
  } finally {
    chrome.kill();
  }

  console.log();
  for (const [f, name, w, m] of findings) {
    const over = Math.max(0, m.scrollWidth - m.clientWidth);
    console.log(`${f}  ${name}`);
    console.log(`  document is ${m.scrollWidth}px in a ${m.clientWidth}px box — ${over}px of sideways scroll, ${m.runs} text run(s) past the edge`);
    if (m.culprit) console.log(`  widest run: <${m.culprit.el}> ${m.culprit.width}px wide, ending at ${m.culprit.right} past an edge of ${w} — ${JSON.stringify(m.culprit.text)}`);
  }

  if (unread.length) {
    console.error(`\n${unread.length} page(s) WERE NOT MEASURED. Nothing above counts for these:`);
    for (const [f, why] of unread) console.error(`  ${f.padEnd(44)} ${why}`);
  }

  /* NO `--check` FLAG, DELIBERATELY. Two gates here shipped as a report that printed
     its findings and exited 0, and the contrast one stayed advice for as long as
     this file forgot the flag. A gate whose default is to pass is a gate that has
     not shipped. This one fails when it finds something, always. */
  if (unread.length) {
    console.error(`\nFAIL — ${unread.length} page(s) not measured; the run is incomplete.`);
    process.exit(1);
  }
  if (findings.length) {
    console.error(
      `\nFAIL — ${findings.length} pass(es) scroll sideways. Give the long string a place to break\n` +
      '(`overflow-wrap: anywhere` reaches paper; `break-word` does not shrink a table column),\n' +
      'or put a genuine BLOCK inside its own `overflow-x: auto` box. Do not shrink the type.'
    );
    process.exit(1);
  }
  console.log(`PASS — ${files.length} page(s), ${SCREENS.length} screen width(s) and ${PAPERS.length} paper(s): nothing scrolls sideways, nothing runs past the sheet.`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
