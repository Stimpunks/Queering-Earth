#!/usr/bin/env node
/**
 * make-specimen.mjs — download the candidate faces and build /specimen, a scratch page
 * for judging a font picker on the actual sheet.
 *
 * THIS IS A SCRATCH TOOL AND /specimen IS A SCRATCH PAGE. It lives in a subdirectory so
 * the root-scanning gates never see it, carries `noindex`, and is not in `sitemap.xml`.
 * Delete both once the choice is made — a specimen kept after the decision becomes a
 * second, stale account of what the site's type is.
 *
 * THE LICENCE TRAVELS HERE TOO. Every face is fetched with its own licence file where
 * upstream has one, and the ones that do not are reported as such rather than quietly
 * shipped. That rule was just paid for on the two production faces; a scratch page is
 * not an exemption from it.
 *
 *     node tools/make-specimen.mjs
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'specimen');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
           '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const GL = 'https://gitlab.com/bye-bye-binary';

/* Each candidate says WHY it is a candidate, because a picker of pretty fonts is not
   what was asked for. The note is the argument; the file is only the evidence. */
const SHEET_ONE = [
  { id: 'fraunces', family: 'Fraunces', local: 'fonts/fraunces-latin.woff2', fmt: 'woff2',
    by: 'Undercase Type, Phaedra Charles, Flavia Zimbardi', licence: 'OFL-1.1',
    role: 'display', kind: 'baseline',
    note: 'What the sheet already uses. Its WONK axis exposes deviant letterforms as a setting you turn up — deviation as a control rather than a defect.' },
  { id: 'newsreader', family: 'Newsreader', local: 'fonts/newsreader-latin.woff2', fmt: 'woff2',
    by: 'Production Type', licence: 'OFL-1.1', role: 'body', kind: 'baseline',
    note: 'What you are reading now. The comparison every other body option has to win against.' },

  { id: 'redaction-inclusive', family: 'Redaction Inclusive', fmt: 'woff2',
    url: `${GL}/redaction-inclusive/-/raw/HEAD/fonts/webfonts/Redaction-Inclusive-Regular.woff2`,
    licenceUrl: `${GL}/redaction-inclusive/-/raw/HEAD/OFL.txt`,
    by: 'Bye Bye Binary, after Redaction by Jeremy Mickel / MCKL', licence: 'OFL-1.1',
    role: 'both', kind: 'erasure',
    note: 'Redaction was drawn for Titus Kaphar and Reginald Dwayne Betts’ project on the carceral state — a face about what gets taken out. Bye Bye Binary then added inclusive glyphs to it. Type about erasure, re-cut to say what the grammar refuses.' },

  { id: 'unormative-fraktur', family: 'Unormative Fraktur', fmt: 'opentype',
    url: `${GL}/unormative-fraktur/-/raw/HEAD/otf/UnormativeFraktur.otf`,
    licenceUrl: `${GL}/unormative-fraktur/-/raw/HEAD/OFL.txt`,
    by: 'Bye Bye Binary', licence: 'OFL-1.1', role: 'display', kind: 'othered',
    note: 'Blackletter is the othered Latin script — coded archaic, banned by the Nazis in 1941 for being “Jewish letters”. Recut here as “unormative”. The most loaded option on the page, and it should be argued about.' },

  { id: 'enby-gertrude', family: 'Enby Gertrude', fmt: 'opentype',
    url: `${GL}/enby-gertrude/-/raw/HEAD/otf/Enby_Gertrude_roman.otf`,
    licenceUrl: `${GL}/enby-gertrude/-/raw/HEAD/README.md`,
    by: 'Bye Bye Binary', licence: 'stated in the README, no separate licence file upstream',
    role: 'display', kind: 'inclusive',
    note: 'A non-binary cut of Gertrude. The name is the thesis.' },

  { id: 'insolente', family: 'Insolente', fmt: 'opentype',
    url: `${GL}/insolente/-/raw/HEAD/otf/Insolente-Regular.otf`,
    licenceUrl: `${GL}/insolente/-/raw/HEAD/README.md`,
    by: 'Bye Bye Binary', licence: 'stated in the README, no separate licence file upstream',
    role: 'display', kind: 'attitude',
    note: 'Insolent. Mientjes’ “attitude in the face of conformity”, named outright.' },

  { id: 'love', family: 'BBB Love', fmt: 'opentype',
    url: `${GL}/bbb-love-and-rage/-/raw/HEAD/otf/BBBLove%26Rage-LOVE.otf`,
    licenceUrl: `${GL}/bbb-love-and-rage/-/raw/HEAD/LICENSE_CUTE.md`,
    by: 'Bye Bye Binary', licence: 'LICENSE_CUTE', role: 'display', kind: 'attitude',
    note: 'Love and Rage ship as two cuts of one family. A typeface that makes you choose which one the sentence is in.' },
  { id: 'rage', family: 'BBB Rage', fmt: 'opentype',
    url: `${GL}/bbb-love-and-rage/-/raw/HEAD/otf/BBBLove%26Rage-RAGE.otf`,
    licenceUrl: `${GL}/bbb-love-and-rage/-/raw/HEAD/LICENSE_CUTE.md`,
    by: 'Bye Bye Binary', licence: 'LICENSE_CUTE', role: 'display', kind: 'attitude',
    note: 'The other cut. Same family, opposite temperature.' },

  { id: 'atkinson', family: 'Atkinson Hyperlegible', fmt: 'woff2', google: 'Atkinson+Hyperlegible',
    licenceUrl: 'https://raw.githubusercontent.com/google/fonts/main/ofl/atkinsonhyperlegible/OFL.txt',
    by: 'Braille Institute of America', licence: 'OFL-1.1', role: 'body', kind: 'legibility',
    note: 'Drawn for low vision by maximising how unlike each other the letters are. It refuses the modernist ideal of harmonious uniformity in favour of letters that insist on being themselves — which is the same refusal, arrived at from the other direction.' },

  { id: 'comic-neue', family: 'Comic Neue', fmt: 'woff2', google: 'Comic+Neue',
    licenceUrl: 'https://raw.githubusercontent.com/google/fonts/main/ofl/comicneue/OFL.txt',
    by: 'Craig Rozynski', licence: 'OFL-1.1', role: 'body', kind: 'provocation',
    note: 'The redrawn Comic Sans. Universally derided, quietly relied on by many dyslexic readers, and completely unbothered about looking serious. Included to be argued with, not to be safe.' },
];

/* ── The second sheet ─────────────────────────────────────────────────────────────
   The families named in conversation that the first sheet could not carry, and two
   corrections to that conversation: `amiamie` and `lucioles` do not exist under those
   names — they were recalled wrongly and are not here. `baskervvol` and `homoneta` do.

   It leans on the Bye Bye Binary families whose NAMES are the argument: French has no
   neutral form, so `-le`, `-es`, `-e`, `-te` endings are what an inclusive suffix looks
   like when it is drawn rather than argued. And on Velvetyne, taken from their GitHub
   because velvetyne.fr timed out on every request from here — worth knowing before
   anything depends on that domain. */
const SHEET_TWO = [
  { id: 'baskervvol', family: 'BBB Baskervvol', fmt: 'opentype',
    url: `${GL}/baskervvol/-/raw/HEAD/otf/BBBBaskervvol-Regular.otf`,
    licenceUrl: `${GL}/baskervvol/-/raw/HEAD/2024_BBB_CUTE-EN.pdf`, licenceExt: 'pdf',
    by: 'Bye Bye Binary', licence: 'CUTE (Collective Use, Transformation, Emancipation)',
    role: 'both', kind: 'inclusive',
    note: 'A Baskerville carrying inclusive ligatures — the one I most wanted on the first sheet and could not find, because the repo hides its OTFs behind two hundred UFO glyph folders. Baskerville is about as canonical as a text face gets; recutting it to say what the grammar refuses is the argument made inside the canon rather than against it.' },

  { id: 'homoneta', family: 'Homoneta', fmt: 'opentype',
    url: `${GL}/homoneta/-/raw/HEAD/otf/Homoneta-Italic.otf`,
    licenceUrl: `${GL}/homoneta/-/raw/HEAD/Licence-CUTE-fr.pdf`, licenceExt: 'pdf',
    by: 'Bye Bye Binary', licence: 'CUTE, French text only', role: 'display', kind: 'inclusive',
    note: 'Italic only, which makes it a face with no upright to be measured against. Worth noticing that this is the one candidate whose licence upstream is in French alone.' },

  { id: 'adelphe', family: 'Adelphe', fmt: 'opentype',
    url: `${GL}/adelphe/-/raw/HEAD/otf/Adelphe-FlorealBold.otf`,
    licenceUrl: `${GL}/adelphe/-/raw/HEAD/README.md`,
    by: 'Bye Bye Binary', licence: 'stated in the README, no separate licence file upstream',
    role: 'display', kind: 'inclusive',
    note: '“Adelphe” is the French neutral for sibling — the word coined because frère and sœur leave nowhere to stand. The cut here is Floréal, after the revolutionary calendar’s month of flowering, which lands oddly well on a herbarium sheet.' },

  { id: 'bbb-karrik', family: 'BBB Karrik', fmt: 'opentype',
    url: `${GL}/bbb-karrik/-/raw/HEAD/otf/BBB_Karrik.otf`,
    licenceUrl: `${GL}/bbb-karrik/-/raw/HEAD/README.md`,
    by: 'Bye Bye Binary, after Karrik by Jean-Baptiste Morizot and Lucas Le Bihan',
    licence: 'stated in the README, no separate licence file upstream',
    role: 'body', kind: 'inclusive',
    note: 'Karrik is a deliberately irregular grotesque — letterforms that refuse to be regularised. Recut with inclusive glyphs. Of everything across both sheets this is the most plausible BODY face that is also making an argument.' },

  { id: 'coxinelle', family: 'Coxinel·le', fmt: 'opentype',
    url: `${GL}/coxinel-le/-/raw/HEAD/otf/Coxinelle-Black.otf`,
    licenceUrl: `${GL}/coxinel-le/-/raw/HEAD/Licence.pdf`, licenceExt: 'pdf',
    by: 'Bye Bye Binary', licence: 'CUTE', role: 'display', kind: 'inclusive',
    note: 'The repository is called coxinel-le, and the interpunct in the name is the inclusive marker itself — the typographic mark French uses to hold two endings at once, promoted from punctuation to the name of the thing.' },

  { id: 'ouvrieres', family: 'Ouvrières', fmt: 'opentype',
    url: `${GL}/ouvrieres/-/raw/HEAD/fonts/font-formations/Ouvrieres-agricultrices.otf`,
    licenceUrl: `${GL}/ouvrieres/-/raw/HEAD/2024_BBB_CUTE-EN.pdf`, licenceExt: 'pdf',
    by: 'Bye Bye Binary', licence: 'CUTE', role: 'display', kind: 'attitude',
    note: 'Women workers, in the feminine plural, and this cut is agricultrices — farm workers. Labour and gender in the same word, and the only candidate whose name is about work.' },

  { id: 'sporting', family: 'Sporting Grotesque', fmt: 'opentype',
    url: 'https://raw.githubusercontent.com/velvetyne/Sporting-Grotesque/HEAD/fonts/SportingGrotesque-Bold.otf',
    licenceUrl: 'https://raw.githubusercontent.com/velvetyne/Sporting-Grotesque/HEAD/LICENSE.txt',
    by: 'Lucas Le Bihan, Velvetyne', licence: 'OFL-1.1', role: 'display', kind: 'attitude',
    note: 'Velvetyne’s best-known face: a grotesque that will not sit still, with letterforms that look drawn rather than drafted. A libre foundry that treats type as commons rather than product.' },

  { id: 'trickster', family: 'Trickster', fmt: 'opentype',
    url: 'https://raw.githubusercontent.com/velvetyne/Trickster/HEAD/fonts/Trickster-Reg.otf',
    licenceUrl: 'https://raw.githubusercontent.com/velvetyne/Trickster/HEAD/LICENSE.txt',
    by: 'Jean-Baptiste Morizot, Velvetyne', licence: 'OFL-1.1', role: 'display', kind: 'attitude',
    note: 'Named for the figure that crosses every boundary it meets and belongs to no category — which is a fair description of what is being asked of a face here.' },

  { id: 'victorianna', family: 'Victorianna', fmt: 'opentype',
    url: 'https://raw.githubusercontent.com/velvetyne/Victorianna/HEAD/fonts/VictoriannaThin_Desktop_OTF/VTF%20victorianna%20thin.otf',
    licenceUrl: 'https://raw.githubusercontent.com/velvetyne/Victorianna/HEAD/LICENSE.txt',
    by: 'Velvetyne', licence: 'OFL-1.1', role: 'display', kind: 'othered',
    note: 'A Victorian display face, libre. The one candidate that could pass for what a herbarium plate was actually lettered in — which makes it the opposite proposition to the rest: not a face that argues with the sheet, but one that agrees with it so completely it might be a period reproduction.' },

  { id: 'resistance', family: 'Résistance Générale', fmt: 'woff2',
    url: 'https://raw.githubusercontent.com/velvetyne/resistance-generale/HEAD/fonts/webfonts/resistance_generale-webfont.woff2',
    licenceUrl: 'https://raw.githubusercontent.com/velvetyne/resistance-generale/HEAD/LICENSE.txt',
    by: 'Velvetyne', licence: 'OFL-1.1', role: 'display', kind: 'attitude',
    note: 'General resistance. A poster face, drawn to be shouted rather than read — so judge it on the masthead line and ignore the paragraph.' },
];

const SHEETS = [
  { file: 'index.html', title: 'Font specimen', candidates: SHEET_ONE,
    other: { file: 'more.html', label: 'Second sheet: Baskervvol, Velvetyne, and the inclusive suffixes' },
    blurb: 'Candidates for a font picker, set in this site&rsquo;s own palette at its own sizes, on its own paper.' },
  { file: 'more.html', title: 'Font specimen, second sheet', candidates: SHEET_TWO,
    other: { file: 'index.html', label: 'First sheet: Redaction Inclusive, Unormative Fraktur, Atkinson' },
    blurb: 'The families named in conversation that the first sheet could not carry &mdash; the Bye Bye Binary faces whose names are the inclusive endings themselves, and Velvetyne, whose own site timed out on every request so these come from their GitHub.' },
];

await mkdir(join(OUT, 'fonts'), { recursive: true });

/* HEAD rather than a branch name in every URL: half these repositories are on `main`
   and half on `master`, and pinning either is a URL that breaks on the next candidate. */
const get = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${r.status} for ${url}`);
  return Buffer.from(await r.arrayBuffer());
};

console.log();
for (const sheet of SHEETS) {
const rows = [];
console.log(`  ── ${sheet.file} ──`);
for (const c of sheet.candidates) {
  let buf, file;
  if (c.local) {
    buf = await readFile(join(ROOT, c.local));
    file = `../${c.local}`;                       // reuse the production face, do not copy it
    rows.push({ ...c, file, bytes: buf.length, licenceFile: null });
    console.log(`  ${c.family.padEnd(24)} ${String(Math.round(buf.length / 1024)).padStart(4)} KB  (already self-hosted)`);
    continue;
  }
  if (c.google) {
    const css = await (await fetch(
      `https://fonts.googleapis.com/css2?family=${c.google}&display=swap`,
      { headers: { 'User-Agent': UA } })).text();
    const m = /\/\* latin \*\/[\s\S]*?url\((https:[^)]+)\)/.exec(css) || /url\((https:[^)]+)\)/.exec(css);
    if (!m) throw new Error(`${c.family}: no woff2 in the Google CSS`);
    buf = await get(m[1]);
  } else {
    buf = await get(c.url);
  }
  if (buf.length < 2000) throw new Error(`${c.family} came back ${buf.length} bytes — refusing a stub`);
  const ext = c.fmt === 'woff2' ? 'woff2' : 'otf';
  file = `fonts/${c.id}.${ext}`;
  await writeFile(join(OUT, file), buf);

  let licenceFile = null;
  if (c.licenceUrl) {
    /* Some upstreams publish the licence only as a PDF. Ship it as it is rather than
       transcribing it, because a transcription of a licence is not the licence. */
    licenceFile = `fonts/${c.id}-LICENCE.${c.licenceExt ?? 'txt'}`;
    await writeFile(join(OUT, licenceFile), await get(c.licenceUrl));
  }
  rows.push({ ...c, file, bytes: buf.length, licenceFile });
  console.log(`  ${c.family.padEnd(24)} ${String(Math.round(buf.length / 1024)).padStart(4)} KB  ` +
              `${licenceFile ? 'licence fetched' : 'LICENCE NOT FETCHED — check upstream'}`);
}

await writeFile(join(OUT, sheet.file.replace('.html', '') + '-candidates.json'),
                JSON.stringify(rows, null, 2) + '\n');

/* ── the page ──────────────────────────────────────────────────────────────────
   It links ../queering.css, so the palette, the wash, the corner profiles and the
   spacing scale are not approximations of the sheet — they ARE the sheet. Each
   candidate then overrides only --qe-display and --qe-body inside its own block,
   which is exactly what a picker would do, so what you judge here is what you would
   get. The ground toggle is the real class the real site switches on. */
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const faces = rows.map((r) => `@font-face {
  font-family: '${r.family} Spec';
  src: url(${r.file}) format('${r.fmt}');
  font-display: swap;
}`).join('\n');

const KINDS = {
  baseline: 'What the sheet uses now',
  erasure: 'Type about what was taken out',
  othered: 'The othered script',
  inclusive: 'Glyphs the grammar refuses',
  attitude: 'Attitude, named outright',
  legibility: 'Letters that insist on being themselves',
  provocation: 'Included to be argued with',
};

const LEDE = 'Woolf wrote the essay about illness that English did not have, complained inside it that English could not hold one, and then went back four years later and quietly made her own sentences stranger.';
const QUOTE = 'Wild nights &ndash; Wild nights!';

const cards = rows.map((r) => `
  <section class="spec" style="--qe-display: '${r.family} Spec', Georgia, serif; --qe-body: '${r.family} Spec', Georgia, serif">
    <header class="spec-head">
      <p class="spec-kind">${esc(KINDS[r.kind] || r.kind)}</p>
      <h2>${esc(r.family)}</h2>
      <p class="spec-meta"><strong>${esc(r.by)}</strong> &middot; ${esc(r.licence)}${
        r.licenceFile ? ` &middot; <a href="${r.licenceFile}">licence</a>` : ''
      } &middot; ${Math.round(r.bytes / 1024)}&nbsp;KB${
        r.role === 'body' ? ' &middot; proposed for body' : r.role === 'display' ? ' &middot; proposed for display' : ' &middot; could do either'
      }</p>
      <p class="spec-note">${r.note}</p>
    </header>
    <p class="spec-display">Queering<span class="spec-dot">.</span>Earth</p>
    <p class="spec-quote">${QUOTE}</p>
    <p class="spec-body">${LEDE}</p>
    <p class="spec-small">Specimen &middot; Maker &middot; First printed &middot; Read by &mdash; 0123456789 &mdash; \u00e6\u00fe\u00f0 &\u0153 fi ffl</p>
  </section>`).join('\n');

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(sheet.title)} &mdash; a scratch page for Queering Earth</title>
<meta name="robots" content="noindex, nofollow">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../queering.css">
<style>
${faces}

/* Scratch styling only. Everything that matters — the palette, the wash, the corners,
   the spacing scale — comes from ../queering.css, unaltered. */
.spec-bar { display: flex; gap: 0.85rem; justify-content: flex-end; align-items: center;
  padding: 0.9rem var(--qe-gutter) 0; }
.spec-bar button { font-family: var(--qe-body); font-size: 0.85rem; color: var(--qe-moss);
  background: transparent; border: 1px solid var(--qe-rule); border-radius: 999px;
  padding: 0.35rem 0.9rem; cursor: pointer; }
.spec-bar button:focus-visible { outline: 3px solid var(--qe-rust); outline-offset: 2px; }
.spec-intro { max-width: var(--qe-measure); margin: 0 auto; padding: 0 var(--qe-gutter); }
.spec { max-width: var(--qe-measure); margin: var(--qe-space-8) auto; padding: 0 var(--qe-gutter); }
.spec + .spec { border-top: 1px solid var(--qe-rule); padding-top: var(--qe-space-6); }
.spec-head { font-family: var(--qe-body-fallback, "Newsreader"), Georgia, serif; }
.spec-kind { font-family: "Newsreader", Georgia, serif; font-size: 0.78rem;
  letter-spacing: 0.09em; text-transform: uppercase; color: var(--qe-moss); margin: 0 0 0.3rem; }
.spec h2 { font-family: "Newsreader", Georgia, serif; font-size: 1.35rem; margin: 0 0 0.35rem; color: var(--qe-ink); }
.spec-meta { font-family: "Newsreader", Georgia, serif; font-size: 0.85rem; color: var(--qe-moss); margin: 0 0 0.6rem; }
.spec-note { font-family: "Newsreader", Georgia, serif; font-size: 0.95rem; line-height: 1.6;
  color: var(--qe-ink); margin: 0 0 var(--qe-space-4); }
.spec-display { font-family: var(--qe-display); font-size: clamp(2.2rem, 7vw, 3.6rem);
  line-height: 1.05; margin: 0 0 var(--qe-space-2); color: var(--qe-ink);
  font-variation-settings: 'SOFT' 60, 'WONK' 1; }
.spec-dot { color: var(--qe-rust); }
.spec-quote { font-family: var(--qe-display); font-size: 1.6rem; line-height: 1.3;
  margin: 0 0 var(--qe-space-3); color: var(--qe-moss); }
.spec-body { font-family: var(--qe-body); font-size: 1.19rem; line-height: 1.65;
  margin: 0 0 var(--qe-space-2); color: var(--qe-ink); }
.spec-small { font-family: var(--qe-body); font-size: 0.9rem; line-height: 1.5;
  color: var(--qe-moss); margin: 0; }
</style>
<script>try{var g=localStorage.getItem('qe-ground');if(g==='cabinet'||g==='daylight')document.documentElement.classList.add(g)}catch(e){}</script>
</head>
<body>

<div class="spec-bar">
  <button type="button" id="ground">Cabinet</button>
</div>

<main class="spec-intro">
  <h1 style="font-family:'Newsreader',Georgia,serif">${esc(sheet.title)}</h1>
  <p style="font-family:'Newsreader',Georgia,serif;font-size:1.19rem;line-height:1.65">
    ${sheet.blurb} Each block overrides only <code>--qe-display</code> and
    <code>--qe-body</code>, which is exactly what a picker would do &mdash; so what you see
    here is what you would get. Toggle the ground; body text is 1.19rem at 1.65, the same as
    a sheet.
  </p>
  <p style="font-family:'Newsreader',Georgia,serif;font-size:1.05rem;line-height:1.6">
    &rarr; <a href="${sheet.other.file}">${sheet.other.label}</a>
  </p>
  <p style="font-family:'Newsreader',Georgia,serif;font-size:0.95rem;line-height:1.6;color:var(--qe-moss)">
    <strong>This is a scratch page.</strong> It is <code>noindex</code>, it is not in
    <code>sitemap.xml</code>, and it should be deleted once the choice is made &mdash; a specimen
    kept after the decision is a second, stale account of what the site&rsquo;s type is.
    Regenerate with <code>node tools/make-specimen.mjs</code>. Licences were fetched with the
    files; two families state their terms only in a README and are marked as such, which needs
    reading before either ships.
  </p>
</main>

${cards}

<script>
  var b = document.getElementById('ground'), r = document.documentElement;
  var inCab = function () {
    return r.classList.contains('cabinet') ||
      (!r.classList.contains('daylight') && matchMedia('(prefers-color-scheme: dark)').matches);
  };
  var paint = function () { b.textContent = inCab() ? 'Daylight' : 'Cabinet'; };
  b.addEventListener('click', function () {
    var next = inCab() ? 'daylight' : 'cabinet';
    r.classList.remove('cabinet', 'daylight'); r.classList.add(next);
    try { localStorage.setItem('qe-ground', next); } catch (e) {}
    paint();
  });
  paint();
</script>
</body>
</html>
`;
await writeFile(join(OUT, sheet.file), page);
console.log(`  wrote specimen/${sheet.file} — ${rows.length} candidate(s), ` +
            `${(rows.reduce((n, r) => n + r.bytes, 0) / 1048576).toFixed(2)} MB\n`);
}

console.log('View /specimen/ and /specimen/more — and delete the folder once the choice is made.');
