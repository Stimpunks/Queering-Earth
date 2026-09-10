/**
 * reveal.mjs — put the page into the state a reader actually sees, then put it back.
 *
 * SHARED, so there is one copy, for the reason `html.mjs` and `pages.mjs` are shared.
 * Two gates measure rendered pages: `check-contrast.mjs` asks what colour the text is
 * and `check-overlap.mjs` asks where it is, and BOTH are blind to anything the served
 * HTML does not paint. That blindness is identical, and the list of things to unhide is
 * editorial — it grows whenever a page learns to build part of itself at runtime.
 *
 * A SECOND COPY WOULD BE A COMPONENT ONE GATE LEARNS AND THE OTHER DOES NOT, which is
 * the exact failure the shared entity table and the shared page order exist to prevent.
 * The comment inside REVEAL already says "ADD IT HERE" to whoever grows the next
 * runtime component; with two copies that instruction is followed once and the other
 * gate reports a clean sweep of markup it never saw.
 *
 * REVEAL is screen-only and must be undone before a print pass — the print stylesheet
 * reveals a different state, and measuring the class left on is how Star Stuff invented
 * 257 print failures on one page. UNREVEAL restores exactly what REVEAL touched and
 * nothing else, which is why every intervention is marked rather than inferred.
 */

/* ─────────────────────────────────────────────────────────────────────────────
   Reveal everything that holds text before measuring.

   This is not cosmetic. A paged zine shows one .spread at a time (.spread.active;
   the rest are display:none), and field guides render their entries collapsed
   (.entry.open .entry-notes { display:block }). Measure the page as it first
   loads and you measure spread 1 of 12 — every other spread reports zero failures
   because it reported nothing at all. That is the same shape of bug as the
   search-index coverage gap: a page that checks 8% of itself looks exactly like a
   clean one.

   The print pass gets this for free (the shared sheet reveals every spread for
   paper) — it is the *screen* pass that would otherwise be nearly blind.

   Animations are killed rather than waited out: a fadeIn keyframe caught mid-flight
   reports opacity 0, which this tool skips as invisible, which would silently drop
   text from the count.

   This is a SCREEN-ONLY intervention, and it is undone before the print pass. The
   print stylesheet does its own revealing (.spread and .field-grid .entry-notes),
   and it reveals a *different* state: elements-field-guide.html gives .entry.open a
   hardcoded rgba(15,15,42,0.98), which no reader ever sees on paper because nothing
   adds .open when printing. Leaving the class on invented 257 print failures on
   that page alone. Measure the state that actually reaches the medium.
   ───────────────────────────────────────────────────────────────────────────── */
export const REVEAL = String.raw`(() => {
  const st = document.createElement('style');
  st.id = 'qe-contrast-still';
  st.textContent = '*,*::before,*::after{animation:none !important;transition:none !important}';
  document.head.appendChild(st);
  /* Mark what we touch, so UNREVEAL puts back exactly this and nothing else. */
  /* Star Stuff reveals paged .spread zines and collapsed field-guide .entry blocks
     here. This site has neither yet. When it grows a page that hides text behind a
     class, ADD IT HERE — a page that checks the 8% of itself that happens to be
     visible reports zero failures and looks exactly like a clean one. */
  let spreads = 0, entries = 0, results = 0;
  for (const d of document.querySelectorAll('details:not([open])')) {
    d.open = true; d.setAttribute('data-ss-revealed', 'details'); entries++;
  }

  /* THE DRIFT RAIL, whose labels sit at opacity 0 until a pointer or a keyboard
     brings them up. That is the hidden-state case this comment block asks for, and
     it arrived one component after the note was written: the rail ships 109 links
     across fifteen pages and every one of them is invisible to a gate that skips
     what it cannot see. An earlier, always-visible draft of the same component
     needed nothing here, which is the distinction worth keeping — REVEAL is for a
     fetch or a hidden state, not for anything merely built at runtime.

     THE LABELS ARE LEFT IN FLOW BY THE STYLESHEET SO THAT THIS IS SAFE FOR BOTH
     GATES. Revealing them changes no geometry: the rail measured here is the same
     expanded rail check-overlap.mjs measures at 1280px, rather than a stack of
     absolutely positioned pills laid over one another, which is what this would
     have had to switch on had the labels floated. */
  let rails = 0;
  for (const r of document.querySelectorAll('.qe-rail')) {
    if (r.hidden) continue;
    r.classList.add('qe-rail-open');
    r.setAttribute('data-ss-revealed', 'qe-rail-open');
    rails++;
  }

  /* THE FINDING AID, whose entire result UI is built at runtime and is therefore
     invisible to this gate as the page is served. That is the case the paragraph
     above describes, and it is the worst version of it: /search measures 193 clean
     elements and every colour a searcher actually reads — the chips, the marks, the
     snippet, the mounted quotation, the count line — is in the other 0.
     PROVEN NECESSARY rather than added on principle: the first draft of that mark
     was a marigold wash that measures 11.2:1 on paper and 6.94:1 in the drawer, and
     nothing here would have said so.
     The templates are the page's own, so this measures the real markup under the real
     stylesheet. It does not run queering-search.js — it cannot, over file://, because
     the index is fetched — and it does not need to: what is under test is the CSS. */
  const tpl = (id) => { const t = document.getElementById(id); return t && t.content.firstElementChild.cloneNode(true); };
  const found = document.getElementById('qe-found');
  if (found && document.getElementById('qe-tpl-result')) {
    const form = document.getElementById('qe-find');
    if (form) { form.hidden = false; form.setAttribute('data-ss-revealed', 'hidden'); }
    /* A value rather than the placeholder: an input's own text is a measurable node
       and its placeholder is not. The placeholder takes --qe-moss, measured on this
       ground everywhere else on the page. */
    const q = document.getElementById('qe-q');
    if (q) q.value = 'lavender';

    found.hidden = false;
    found.setAttribute('data-ss-revealed', 'hidden');

    const count = document.getElementById('qe-found-count');
    const line = tpl('qe-tpl-count');
    line.querySelector('.qe-count-sheets').textContent = '4';
    line.querySelector('.qe-count-register').textContent = '3';
    line.querySelector('.qe-result-term').textContent = 'lavender';
    line.setAttribute('data-ss-injected', '1');
    count.appendChild(line);

    const into = document.getElementById('qe-found-results');
    const row = (chip, no, link, where, snip, quote, label) => {
      const el = tpl('qe-tpl-result');
      const n = el.querySelector('.qe-result-no');
      if (chip) { n.className = 'qe-tag qe-tag--' + chip; n.textContent = chip; }
      else if (no) n.textContent = no; else n.remove();
      el.querySelector('.qe-result-link').textContent = link;
      el.querySelector('.qe-result-in').textContent = where;
      const s = el.querySelector('.qe-result-snip');
      s.textContent = '\u2026a cropped window of our own prose, with ';
      const m = document.createElement('mark');
      m.textContent = snip;
      s.appendChild(m);
      s.appendChild(document.createTextNode(' marked inside it\u2026'));
      if (quote) {
        const f = tpl('qe-tpl-quote');
        if (label) f.querySelector('.qe-specimen-label').textContent = label;
        const b = f.querySelector('blockquote');
        b.textContent = 'A whole quotation, never a window onto one, with ';
        const bm = document.createElement('mark');
        bm.textContent = snip;
        b.appendChild(bm);
        b.appendChild(document.createTextNode(' marked inside it.'));
        f.querySelector('figcaption').textContent = 'The maker, the work, the printing, and where we read it.';
        el.appendChild(f);
      }
      return el;
    };

    const sheets = tpl('qe-tpl-sheets');
    const sl = sheets.querySelector('.qe-result-list');
    sl.appendChild(row(null, 'No. 7', 'A section heading, addressed', 'The sheet it is on \u00b7 the maker of the work', 'lavender', true));
    sl.appendChild(row(null, 'No. 6', 'A section with our own verse in it', 'The sheet it is on', 'lavender', true, 'In reply'));
    sheets.setAttribute('data-ss-injected', '1');
    into.appendChild(sheets);

    /* All four register kinds, because each spends a different accent on its rule. */
    const reg = tpl('qe-tpl-register');
    const rl = reg.querySelector('.qe-result-list');
    for (const k of ['mounted', 'redet', 'label', 'cabinet'])
      rl.appendChild(row(k, null, 'An entry name, as the entry names itself', '', 'lavender', false));
    reg.setAttribute('data-ss-injected', '1');
    into.appendChild(reg);

    const none = tpl('qe-tpl-none');
    none.querySelector('.qe-result-term').textContent = 'a word nothing matches';
    none.setAttribute('data-ss-injected', '1');
    into.appendChild(none);

    results = into.querySelectorAll('.qe-result').length;
  }

  return JSON.stringify({ spreads, entries, results, rails });
})()`;

export const UNREVEAL = String.raw`(() => {
  let n = 0;
  /* Injected nodes go first: they are inside the containers the next loop re-hides. */
  for (const el of document.querySelectorAll('[data-ss-injected]')) { el.remove(); n++; }
  for (const el of document.querySelectorAll('[data-ss-revealed]')) {
    const what = el.getAttribute('data-ss-revealed');
    if (what === 'details') el.open = false;
    else if (what === 'hidden') el.hidden = true;
    else el.classList.remove(what);
    el.removeAttribute('data-ss-revealed');
    n++;
  }
  return JSON.stringify({ restored: n });
})()`;
