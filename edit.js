/* edit.js — change the words on a page and copy out a patch somebody can apply.
 *
 * WHY THIS AND NOT A CMS. Decap, Sveltia and Tina are git-backed CMSes over a content
 * model: collections of files with named fields. This site has no content model. A sheet
 * carries eighty to a hundred and twenty hand-drawn SVG elements, eight to thirteen
 * authored section ids, forty to seventy inline style attributes seeding its own foxing
 * and stamp rotation, and JSON-LD whose `about.author` is an editorial judgement about who
 * made the thing being read. There are no fields to put in a schema — the layout IS the
 * argument, which is the standing reason in DECISIONS.md, stated as a measurement.
 *
 * The need underneath the CMS question is smaller and quite tractable: change some words
 * on a page without editing raw HTML. That is this.
 *
 * NOTHING IS SHIPPED TO READERS. No page includes this file. It is injected by a
 * bookmarklet, so a normal visit fetches nothing extra and no page markup changes at all —
 * which matters on a site that self-hosts its fonts to avoid one third-party request and
 * revalidates every asset on every visit.
 *
 * IT CANNOT SAVE, AND THAT IS THE DESIGN RATHER THAN A SHORTFALL. Saving from the browser
 * would need a token in the page, which is the account problem the CMS question was trying
 * to avoid. It produces a patch instead: the exact HTML before and the exact HTML after,
 * per block. **An exact before-string means applying it is verifiable** — a session does a
 * string replacement and it either matches the file or fails loudly, rather than half
 * matching and quietly mangling a sentence.
 *
 * WHAT IT REFUSES TO EDIT IS THE MOST IMPORTANT PART OF IT. Quotations, their captions and
 * their citations are not editable here, and the page says so where you try. This site's
 * characteristic failure is not an invented source — it is a TIGHTENED one, a sentence
 * trimmed to fit and the attribution left attached. A convenience tool that let anybody
 * reword a mounted quotation in two clicks would be a machine for producing exactly that.
 * Accession facts — the stamp and the provenance line — are refused for the same reason in
 * a different key: they are records, and a record you can edit in a browser is not one.
 */
(function () {
  if (window.__qeEdit) { window.__qeEdit.focus(); return; }

  var main = document.querySelector('main');
  if (!main) { alert('No <main> on this page — nothing to edit.'); return; }

  var KEY = 'qe-edits:' + location.pathname;      /* assembled; see the note in /privacy */
  var EDITABLE = 'p, li, h1, h2, h3, h4, dd';

  /* Each refusal carries the reason a reader is shown when they try. */
  var REFUSED = [
    ['blockquote, .qe-specimen, .qe-verse', 'a quotation is not edited here — change it in the source, with the original in front of you'],
    ['figcaption, cite', 'this is an attribution, and it is not edited in a browser'],
    ['.qe-stamp, .qe-provenance, .qe-label', 'this is an accession record, not prose'],
    ['.qe-contents, .qe-rail, .qe-crumbs, .qe-entry-index, .qe-sheet-index', 'this list is built from the page and cannot be edited directly'],
  ];

  function refusalFor(el) {
    for (var i = 0; i < REFUSED.length; i++) if (el.closest(REFUSED[i][0])) return REFUSED[i][1];
    return null;
  }

  function blocks() {
    var all = Array.prototype.slice.call(main.querySelectorAll(EDITABLE));
    return all.filter(function (el) {
      return !el.closest('.qe-edit-ui') && el.textContent.replace(/\s+/g, '').length > 1
          && !all.some(function (o) { return o !== el && o.contains(el); });
    });
  }

  /* ── the record of what changed ──────────────────────────────────────────────
   * Keyed by the block's ORIGINAL html, which is also what the patch quotes, so a block
   * edited twice still reports one before and one after rather than a chain. */
  var edits = {};
  try { edits = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(edits)); } catch (e) {} }

  function sectionOf(el) {
    var heads = Array.prototype.slice.call(main.querySelectorAll('h2[id]')), best = null;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i] === el) { best = heads[i]; break; }
      if (heads[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) best = heads[i];
    }
    return best ? best.id : null;
  }

  /* ── furniture ───────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.qe-edit-bar{position:sticky;top:0;z-index:9999;margin:0 0 var(--qe-space-4);padding:var(--qe-space-2) var(--qe-space-3);',
      'background:var(--qe-card);border-bottom:2px solid var(--qe-rust);color:var(--qe-ink);',
      'font-family:var(--qe-body),Georgia,serif;font-size:0.95rem;line-height:1.5;',
      'display:flex;flex-wrap:wrap;gap:var(--qe-space-2);align-items:center}',
    '.qe-edit-bar strong{color:var(--qe-ink)}',
    '.qe-edit-bar button{font:inherit;font-size:0.95rem;color:var(--qe-ink);background:var(--qe-card);',
      'border:1px solid var(--qe-rule);border-radius:var(--qe-corner-chip);padding:0.62rem 0.9rem;',
      'cursor:pointer;min-height:44px}',
    '.qe-edit-count{color:var(--qe-moss)}',
    'html.qe-editing main p[data-qe-edit],html.qe-editing main li[data-qe-edit],',
    'html.qe-editing main h1[data-qe-edit],html.qe-editing main h2[data-qe-edit],',
    'html.qe-editing main h3[data-qe-edit],html.qe-editing main h4[data-qe-edit],',
    'html.qe-editing main dd[data-qe-edit]{outline:1px dashed var(--qe-lichen);outline-offset:5px;cursor:text}',
    'html.qe-editing [data-qe-edit]:focus{outline:2px solid var(--qe-rust);outline-offset:5px;background:var(--qe-card)}',
    'html.qe-editing [data-qe-changed]{outline:2px solid var(--qe-rust);outline-offset:5px}',
    '.qe-edit-why{position:fixed;left:50%;transform:translateX(-50%);bottom:1.5rem;z-index:10000;max-width:30rem;',
      'background:var(--qe-card);border:1px solid var(--qe-rust);border-radius:var(--qe-corner-a);',
      'padding:var(--qe-space-2) var(--qe-space-3);color:var(--qe-ink);',
      'font-family:var(--qe-body),Georgia,serif;font-size:0.95rem;line-height:1.5}',
    '@media print{.qe-edit-bar,.qe-edit-why{display:none!important}}'
  ].join('');
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.className = 'qe-edit-bar qe-edit-ui';
  bar.innerHTML =
    '<strong>Editing this page.</strong> Click any paragraph and change the words. ' +
    'Nothing is saved to the site — press <strong>Copy my edits</strong> and paste them to Ryan or into a Claude session.' +
    '<button type="button" id="qe-edit-copy">Copy my edits</button>' +
    '<button type="button" id="qe-edit-reset">Undo all</button>' +
    '<button type="button" id="qe-edit-stop">Stop editing</button>' +
    '<span class="qe-edit-count" id="qe-edit-count"></span>';
  main.parentNode.insertBefore(bar, main);

  var why = null;
  function explain(text) {
    if (why) why.remove();
    why = document.createElement('div');
    why.className = 'qe-edit-why qe-edit-ui';
    why.setAttribute('role', 'status');
    why.textContent = text;
    document.body.appendChild(why);
    setTimeout(function () { if (why) { why.remove(); why = null; } }, 6000);
  }

  var countEl = bar.querySelector('#qe-edit-count');
  function paint() {
    var n = Object.keys(edits).length;
    countEl.textContent = n === 1 ? '1 edit' : n + ' edits';
    bar.querySelector('#qe-edit-copy').disabled = n === 0;
    bar.querySelector('#qe-edit-reset').disabled = n === 0;
  }

  /* ── arm the page ────────────────────────────────────────────────────────── */
  document.documentElement.classList.add('qe-editing');

  blocks().forEach(function (el, i) {
    var refusal = refusalFor(el);
    if (refusal) {
      el.addEventListener('click', function () { explain(refusal); });
      return;
    }
    el.dataset.qeEdit = String(i);
    el.dataset.qeOriginal = el.innerHTML;
    el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'true');

    /* Paste arrives as plain text. A paste from a word processor otherwise brings its own
       fonts and colours into a sheet whose palette is a single source of truth. */
    el.addEventListener('paste', function (e) {
      e.preventDefault();
      document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text'));
    });

    /* Enter would split the block into two. This changes words; it does not restructure a
       page, and a new paragraph is a thing somebody should write in the source. */
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); explain('Enter is off here — this changes words, it does not add paragraphs.'); }
    });

    el.addEventListener('input', function () {
      var before = el.dataset.qeOriginal, after = el.innerHTML;
      if (after === before) { delete edits[before]; delete el.dataset.qeChanged; }
      else { edits[before] = { after: after, section: sectionOf(el), tag: el.tagName.toLowerCase() }; el.dataset.qeChanged = '1'; }
      persist(); paint();
    });
  });

  /* Anything already edited in a previous sitting goes back onto the page. */
  blocks().forEach(function (el) {
    var rec = edits[el.dataset.qeOriginal];
    if (rec) { el.innerHTML = rec.after; el.dataset.qeChanged = '1'; }
  });

  /* ── getting them out ────────────────────────────────────────────────────── */
  function asText() {
    var keys = Object.keys(edits);
    var out = ['Edits to ' + location.pathname,
               location.href,
               new Date().toLocaleString() + ' · ' + keys.length + (keys.length === 1 ? ' edit' : ' edits'),
               '',
               'HOW TO APPLY THESE',
               '',
               'BEFORE and AFTER are the block with HTML entities DECODED, because that is what',
               'a browser gives back. The file itself is mixed — it holds both `&mdash;` and a raw',
               'em dash — so these will not match it byte for byte and are not meant to.',
               '',
               '  1. In the file named above, find the block whose text, with entities decoded,',
               '     equals BEFORE exactly.',
               '  2. If there is no such block, STOP and say so. Do not apply a near match.',
               '  3. Replace its contents with AFTER, writing entities the way the rest of',
               '     that file writes them.',
               '  4. Then run: node tools/check-markup.mjs --check <that file>',
               ''];
    keys.forEach(function (before, i) {
      var rec = edits[before];
      out.push('--- edit ' + (i + 1) + (rec.section ? '  ·  section #' + rec.section : '') + '  ·  <' + rec.tag + '>');
      out.push('BEFORE');
      out.push(before);
      out.push('AFTER');
      out.push(rec.after);
      out.push('');
    });
    return out.join('\n');
  }

  bar.querySelector('#qe-edit-copy').addEventListener('click', function () {
    var text = asText(), btn = this;
    var done = function () {
      btn.textContent = 'Copied — now paste it';
      setTimeout(function () { btn.textContent = 'Copy my edits'; }, 4000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); });
    else fallback(text);
  });

  function fallback(text) {
    var box = document.createElement('textarea');
    box.className = 'qe-edit-ui';
    box.value = text;
    box.setAttribute('aria-label', 'Your edits — copy this text');
    box.style.cssText = 'width:100%;min-height:16rem;font:inherit';
    bar.appendChild(box); box.focus(); box.select();
  }

  bar.querySelector('#qe-edit-reset').addEventListener('click', function () {
    if (!window.confirm('Undo all ' + Object.keys(edits).length + ' edits on this page?')) return;
    blocks().forEach(function (el) {
      if (el.dataset.qeOriginal !== undefined) { el.innerHTML = el.dataset.qeOriginal; delete el.dataset.qeChanged; }
    });
    edits = {}; persist(); paint();
  });

  bar.querySelector('#qe-edit-stop').addEventListener('click', function () { location.reload(); });

  window.__qeEdit = { focus: function () { bar.scrollIntoView({ block: 'start' }); } };
  paint();
})();
