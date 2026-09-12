/* drafts/review.js — a draft-only annotation layer, so a reviewer can mark a sheet
 * up without a GitHub account and without touching markup.
 *
 * WHY THIS EXISTS. The review path recorded in DECISIONS.md was "she edits in the
 * GitHub web editor and opens a pull request", and that path does not work for the
 * person it was written for. Reading a draft never needed an account — a deploy URL
 * is a URL — but GIVING FEEDBACK did, and a PR comment thread was the whole of the
 * answer. This is the replacement: click a paragraph, type a note, press Copy, paste
 * the result wherever the two of you already talk.
 *
 * IT NEVER SHIPS. A page includes this with one line, and publishing that page means
 * deleting that line. `check-metadata.mjs` check 10 is the guard and it uses the
 * site's own definition of published: a page listed in `sitemap.xml` may not
 * reference this file. A draft is not in the sitemap, so a draft branch stays green;
 * the moment the page is accessioned the gate demands the line be gone.
 *
 * IT WRITES WORDS, AND THAT IS A CARVE-OUT FROM THE HOUSE RULE RATHER THAN AN
 * OVERSIGHT. `queering.js` may never create words; `queering-search.js` clones
 * templates authored in `search.html` rather than writing labels of its own. Both
 * rules exist because a second copy of the site's prose is the copy that rots. The
 * words here are instrument labels on a page that will never be published, and
 * deleting the one include line removes every one of them. Requiring authored
 * templates instead would put a block of markup in every draft, which is the thing
 * this is meant to spare everybody.
 *
 * NOTHING LEAVES THE BROWSER. Notes live in `localStorage` under a key built at
 * runtime from the path, and the only way out is the reviewer's own clipboard. There
 * is no endpoint, no account and no third party — this site makes no third-party
 * request and a review tool is not the place to start. The key is deliberately absent
 * from `/privacy`: that policy describes what queering.earth does to a reader, and
 * check 10 is what makes it true that this can never run there.
 *
 * ANNOTATING IS A MODE, AND IT IS OFF UNTIL ASKED FOR. A reviewer should meet the
 * sheet as a reader first, which is the entire reason for reviewing at a real address
 * instead of in a document. Armed, every eligible block grows a real, visible, focusable
 * control — never a hover target, per the house rule that hover hands a feature to mice
 * and to nobody else. The cost is ~80 extra tab stops while armed and none when not.
 *
 * A QUOTATION IS ONE BLOCK. A `blockquote` takes a single note rather than one per
 * line inside it, which is the same instinct as the finding aid's refusal to crop one.
 *
 * COLOUR IS MEASURED, BECAUSE NO GATE MEASURES THIS. `check-contrast.mjs` sweeps root
 * pages and this furniture is built at runtime on a page it never sees. Every pair
 * here was computed against both grounds before it was written: ink on card is 15.26:1
 * in daylight and 13.39:1 in the cabinet, moss on card 8.35:1 and 7.53:1, rust on card
 * 7.52:1 and 7.57:1. `--qe-paper-deep` is NOT used as a ground for text — moss and rust
 * measure 6.90:1 and 6.21:1 on it in daylight, which is the recessed panel this house
 * already withdrew once.
 */
(function () {
  var main = document.querySelector('main');
  if (!main) return;

  var PREFIX = 'qe-review-';           /* assembled, never a literal — see the note above */
  var key = PREFIX + (location.pathname.replace(/\/$/, '') || '/index');

  /* ── storage ──────────────────────────────────────────────────────────────── */

  function load() {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(notes) {
    try { localStorage.setItem(key, JSON.stringify(notes)); } catch (e) {}
  }

  var notes = load();

  /* ── what can take a note ─────────────────────────────────────────────────────
   * Outermost wins, so a `blockquote` is one target and the `p` inside it is not,
   * and an `li` is one target rather than the paragraph it wraps. Derived lists are
   * excluded: a note on the contents list is a note on a copy of a heading. */

  var SEL = 'p, li, blockquote, h1, h2, h3, h4, figcaption, dl, pre';
  var SKIP = '.qe-review-ui, .qe-contents, .qe-entry-index, .qe-sheet-index, .qe-rail, .qe-crumbs';

  function blocks() {
    var all = Array.prototype.slice.call(main.querySelectorAll(SEL)).filter(function (el) {
      return !el.closest(SKIP) && el.textContent.replace(/\s+/g, '').length > 1;
    });
    return all.filter(function (el) {
      return !all.some(function (o) { return o !== el && o.contains(el); });
    });
  }

  function textOf(el) {
    var c = el.cloneNode(true);
    Array.prototype.forEach.call(c.querySelectorAll('.qe-anchor, .qe-sr, .qe-review-ui'), function (n) {
      n.remove();
    });
    return c.textContent.replace(/\s+/g, ' ').trim();
  }

  function snippetOf(el) {
    var t = textOf(el);
    return t.length > 110 ? t.slice(0, 110).replace(/\s+\S*$/, '') + '…' : t;
  }

  /* The nearest authored section above the block. Ids here are topical and permanent
     by house rule, which is exactly what a note needs to point at. */
  function sectionOf(el) {
    var heads = Array.prototype.slice.call(main.querySelectorAll('h2[id]'));
    var best = null;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i] === el) { best = heads[i]; break; }
      if (heads[i].compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) best = heads[i];
    }
    return best ? { id: best.id, label: textOf(best) } : null;
  }

  /* ── re-attaching a note after the draft has been edited ──────────────────────
   * Snippet first, position second. A note whose text has been rewritten under it is
   * marked as drifted rather than dropped: silently losing a reviewer's note is worse
   * than showing it in the wrong place, and it still exports. */

  function attach() {
    var bs = blocks();
    var byText = {};
    bs.forEach(function (el, i) { var s = snippetOf(el); if (!(s in byText)) byText[s] = i; });

    notes.forEach(function (n) {
      var i = byText[n.snippet];
      if (i === undefined) {
        i = (n.idx < bs.length) ? n.idx : -1;
        n.drifted = true;
      } else {
        n.drifted = false;
      }
      n.el = i >= 0 ? bs[i] : null;
    });
  }

  /* ── the furniture ────────────────────────────────────────────────────────────── */

  var style = document.createElement('style');
  style.textContent = [
    '.qe-review{margin:var(--qe-space-4) auto;max-width:34rem;padding:var(--qe-space-3);',
      'background:var(--qe-card);border:1px solid var(--qe-rule);border-radius:var(--qe-corner-b);',
      'color:var(--qe-ink);font-family:var(--qe-body),Georgia,serif;font-size:1rem;line-height:1.55}',
    '.qe-review h2{font-size:1.05rem;margin:0 0 var(--qe-space-1);color:var(--qe-ink)}',
    '.qe-review p{margin:0 0 var(--qe-space-2);color:var(--qe-moss);font-size:0.95rem}',
    '.qe-review-acts{display:flex;flex-wrap:wrap;gap:var(--qe-space-2)}',
    '.qe-review button,.qe-review-ui button,button.qe-review-ui{font:inherit;font-size:0.95rem;color:var(--qe-ink);',
      'background:var(--qe-card);border:1px solid var(--qe-rule);border-radius:var(--qe-corner-chip);',
      'padding:0.62rem 0.9rem;cursor:pointer;min-height:44px}',
    '.qe-review button[aria-pressed="true"]{border-color:var(--qe-rust);border-width:2px}',
    '.qe-review-count{color:var(--qe-ink);font-size:0.95rem;align-self:center}',
    /* armed: a dashed edge is the house mark for provisional, and it is a rule, not ink */
    'html.qe-review-on .qe-review-target{outline:1px dashed var(--qe-rust);outline-offset:4px}',
    '.qe-review-add{display:block;width:-moz-fit-content;width:fit-content;margin:0 0 var(--qe-space-2) auto;',
      'font-size:0.9rem;padding:0.62rem 0.8rem}',
    '.qe-review-form{margin:var(--qe-space-1) 0 var(--qe-space-2);display:flex;flex-direction:column;gap:var(--qe-space-1)}',
    '.qe-review-form textarea{font:inherit;font-size:1rem;line-height:1.55;color:var(--qe-ink);',
      'background:var(--qe-card);border:1px solid var(--qe-rule);border-radius:var(--qe-corner-a);',
      'padding:var(--qe-space-1);min-height:6rem;width:100%;box-sizing:border-box}',
    '.qe-review-form div{display:flex;gap:var(--qe-space-1)}',
    '.qe-review-note{margin:var(--qe-space-1) 0 var(--qe-space-2);padding:var(--qe-space-1) var(--qe-space-2);',
      'background:var(--qe-card);border-left:3px solid var(--qe-rust);border-radius:var(--qe-corner-chip);',
      'font-family:var(--qe-body),Georgia,serif;font-size:1rem;line-height:1.55;color:var(--qe-ink)}',
    '.qe-review-note p{margin:0 0 var(--qe-space-1);white-space:pre-wrap}',
    '.qe-review-note .qe-review-meta{color:var(--qe-moss);font-size:0.9rem}',
    '@media print{.qe-review,.qe-review-ui{display:none!important}',
      'html.qe-review-on .qe-review-target{outline:none}}'
  ].join('');
  document.head.appendChild(style);

  var banner = document.createElement('section');
  banner.className = 'qe-review';
  banner.setAttribute('aria-label', 'Draft review');
  banner.innerHTML =
    '<h2>This is a draft, and it is not published.</h2>' +
    '<p>Turn on <strong>Annotate</strong>, then press <em>Note</em> beside any paragraph to leave a ' +
    'comment. Your notes stay in this browser until you press <strong>Copy my notes</strong> — ' +
    'nothing is sent anywhere, and nobody else can see them until you paste them somewhere.</p>' +
    '<div class="qe-review-acts">' +
      '<button type="button" id="qe-review-arm" aria-pressed="false">Annotate</button>' +
      '<button type="button" id="qe-review-copy">Copy my notes</button>' +
      '<button type="button" id="qe-review-clear">Delete my notes</button>' +
      '<span class="qe-review-count" id="qe-review-count"></span>' +
    '</div>';
  main.parentNode.insertBefore(banner, main);

  var armBtn = banner.querySelector('#qe-review-arm');
  var copyBtn = banner.querySelector('#qe-review-copy');
  var clearBtn = banner.querySelector('#qe-review-clear');
  var countEl = banner.querySelector('#qe-review-count');

  /* ── drawing ──────────────────────────────────────────────────────────────────── */

  function clear() {
    Array.prototype.forEach.call(document.querySelectorAll('.qe-review-ui'), function (n) { n.remove(); });
    Array.prototype.forEach.call(document.querySelectorAll('.qe-review-target'), function (n) {
      n.classList.remove('qe-review-target');
    });
  }

  function ui(tag, cls) {
    var el = document.createElement(tag);
    el.className = 'qe-review-ui' + (cls ? ' ' + cls : '');
    return el;
  }

  function after(el, node) { el.parentNode.insertBefore(node, el.nextSibling); }

  function openForm(el, existing) {
    var form = ui('div', 'qe-review-form');
    var box = document.createElement('textarea');
    box.value = existing ? existing.text : '';
    box.setAttribute('aria-label', 'Your note on: ' + snippetOf(el));
    var row = document.createElement('div');
    var ok = document.createElement('button');
    ok.type = 'button'; ok.textContent = existing ? 'Save changes' : 'Save note';
    var no = document.createElement('button');
    no.type = 'button'; no.textContent = 'Cancel';
    row.appendChild(ok); row.appendChild(no);
    form.appendChild(box); form.appendChild(row);
    after(el, form);
    box.focus();

    ok.addEventListener('click', function () {
      var text = box.value.trim();
      if (!text) { no.click(); return; }
      if (existing) {
        existing.text = text;
        existing.at = new Date().toISOString();
      } else {
        notes.push({
          id: String(Date.now()) + Math.random().toString(36).slice(2, 6),
          section: sectionOf(el),
          snippet: snippetOf(el),
          idx: blocks().indexOf(el),
          text: text,
          at: new Date().toISOString()
        });
      }
      save(notes);
      draw();
    });

    no.addEventListener('click', function () { draw(); });
  }

  function draw() {
    clear();
    attach();

    notes.forEach(function (n) {
      if (!n.el) return;
      var box = ui('div', 'qe-review-note');
      var p = document.createElement('p');
      p.textContent = n.text;
      var meta = document.createElement('p');
      meta.className = 'qe-review-meta';
      meta.textContent = (n.section ? 'On “' + n.section.label + '” · ' : '')
        + (n.drifted ? 'the text here has changed since this note was written · ' : '')
        + new Date(n.at).toLocaleString();
      var acts = document.createElement('div');
      var edit = document.createElement('button');
      edit.type = 'button'; edit.textContent = 'Edit this note';
      var del = document.createElement('button');
      del.type = 'button'; del.textContent = 'Delete this note';
      acts.appendChild(edit); acts.appendChild(del);
      box.appendChild(p); box.appendChild(meta); box.appendChild(acts);
      after(n.el, box);

      edit.addEventListener('click', function () { clear(); openForm(n.el, n); });
      del.addEventListener('click', function () {
        notes = notes.filter(function (o) { return o.id !== n.id; });
        save(notes);
        draw();
      });
    });

    if (document.documentElement.classList.contains('qe-review-on')) {
      blocks().forEach(function (el) {
        el.classList.add('qe-review-target');
        var b = ui('button', 'qe-review-add');
        b.type = 'button';
        b.textContent = 'Note';
        b.setAttribute('aria-label', 'Leave a note on: ' + snippetOf(el));
        after(el, b);
        b.addEventListener('click', function () { clear(); openForm(el, null); });
      });
    }

    countEl.textContent = notes.length === 1 ? '1 note' : notes.length + ' notes';
    copyBtn.disabled = clearBtn.disabled = notes.length === 0;
  }

  /* ── getting them out ─────────────────────────────────────────────────────────── */

  function asText() {
    var title = (document.querySelector('main h1') || {}).textContent || document.title;
    var out = ['Notes on ' + title.replace(/\s+/g, ' ').trim(),
               location.href,
               new Date().toLocaleString() + ' · ' + notes.length + (notes.length === 1 ? ' note' : ' notes'),
               ''];
    notes.forEach(function (n, i) {
      out.push((i + 1) + '. ' + (n.section ? 'Under “' + n.section.label + '”' : 'Before the first heading')
        + (n.section && n.section.id ? '  ' + location.origin + location.pathname + '#' + n.section.id : ''));
      out.push('   the text: “' + n.snippet + '”' + (n.drifted ? '  [this text has since changed]' : ''));
      out.push('   ' + n.text.split('\n').join('\n   '));
      out.push('');
    });
    return out.join('\n');
  }

  copyBtn.addEventListener('click', function () {
    var text = asText();
    var done = function () {
      copyBtn.textContent = 'Copied — now paste it to Ryan';
      setTimeout(function () { copyBtn.textContent = 'Copy my notes'; }, 4000);
    };
    /* The clipboard can be refused, and a reviewer who has just typed forty notes must
       not lose them to a permission prompt. The fallback hands the text over selected. */
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); });
    } else {
      fallback(text);
    }
  });

  function fallback(text) {
    var box = document.createElement('textarea');
    box.value = text;
    box.setAttribute('aria-label', 'Your notes — copy this text');
    box.style.cssText = 'width:100%;min-height:14rem;font:inherit';
    var wrap = ui('div', 'qe-review-form');
    wrap.appendChild(box);
    banner.appendChild(wrap);
    box.focus();
    box.select();
  }

  clearBtn.addEventListener('click', function () {
    if (!window.confirm('Delete all ' + notes.length + ' of your notes on this page? This cannot be undone.')) return;
    notes = [];
    save(notes);
    draw();
  });

  armBtn.addEventListener('click', function () {
    var on = document.documentElement.classList.toggle('qe-review-on');
    armBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    armBtn.textContent = on ? 'Stop annotating' : 'Annotate';
    draw();
  });

  draw();
})();
