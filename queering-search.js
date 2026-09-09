/* queering-search.js — the finding aid, and only on /search.
 *
 * WHY THIS IS NOT IN queering.js
 * That file's boundary is that it may derive navigation from the DOM and may never
 * create words. A contents list is headings already in the served HTML; a search
 * result is a sentence from ANOTHER page put onto this one, which is past that line
 * however carefully it is done. Widening the boundary to fit would have cost the
 * boundary. So the capability lives here, on the one page that has it, and the reader
 * of a sheet never downloads a word of it — nor the third of a megabyte of index.
 *
 * WHAT IT NEVERTHELESS WILL NOT DO
 * It writes no label. Every word a reader sees here is authored in search.html, in the
 * templates after the footer, and this file clones them and fills the derived parts.
 * The register's index already works this way, cloning an entry's own kind chip rather
 * than rebuilding one, so the index cannot call an entry something the entry does not.
 *
 * THE FIELD IS HIDDEN UNTIL THIS RUNS, and that is two decisions at once. A form
 * present without its script would submit to this address with the query in the URL,
 * which writes every search term into the host's access log — on a site about
 * queerness, illness and naming yourself, that is not a small thing. And /search
 * carries the whole cabinet as ordinary links in its served HTML, so a reader without
 * this script gets a real finding aid rather than a dead field. Same idiom as the
 * contents list, doing a second job.
 *
 * WHICH IS ALSO WHY THE QUERY LIVES AFTER THE `#`. A fragment is never sent to a
 * server, so the search term is shareable and bookmarkable and reaches nobody. There
 * is no `?q=`, and there must not be one.
 *
 * A QUOTATION IS NEVER CROPPED. The whole feature is built around it; see the long
 * note in tools/make-search-index.mjs. Here it is two rules: a matched blockquote is
 * rendered whole with its source or not at all, and the window that crops OUR prose is
 * widened to clear any inline quotation it would otherwise cut into.
 *
 * NO MOTION. Botanical art draws itself on because growth is the site's idiom for
 * arriving; a list that rewrites itself on every keystroke is not growing, and
 * animating it would be movement next to text a reader is trying to read.
 */
(function () {
  var form = document.getElementById('qe-find');
  if (!form) return;

  var input = document.getElementById('qe-q');
  var panel = document.getElementById('qe-found');
  var count = document.getElementById('qe-found-count');
  var list = document.getElementById('qe-found-results');
  var tpl = function (id) {
    var t = document.getElementById(id);
    return t.content.firstElementChild.cloneNode(true);
  };

  /* The field exists only where this file does. */
  form.hidden = false;

  /* ── folding ────────────────────────────────────────────────────────────────
   *
   * STRICTLY ONE CHARACTER IN, ONE CHARACTER OUT. Matches are found in the folded
   * text and then marked in the original, so any fold that changed a string's length
   * would put every highlight after it in the wrong place — and, worse, would move the
   * fences that keep the crop out of a quotation. NFD normalisation is the obvious
   * tool here and is exactly the one that cannot be used: it turns one character into
   * two. So the fold is built per character and anything that would not come back as a
   * single character is left alone.
   */
  var FOLD = {};
  var PUNCT = { '’': "'", '‘': "'", '“': '"', '”': '"',
                '–': ' ', '—': ' ', ' ': ' ', ' ': ' ',
                ' ': ' ', ' ': ' ', '­': ' ' };

  function foldChar(ch) {
    var f = FOLD[ch];
    if (f !== undefined) return f;
    var out = ch.toLowerCase();
    if (Array.from(out).length !== 1) out = ch;      // Turkish dotted I and its kin
    if (PUNCT[out]) out = PUNCT[out];
    else if (out.normalize) {
      var d = out.normalize('NFD');
      if (d.length > 1 && /[a-z0-9]/.test(d.charAt(0))) out = d.charAt(0);
    }
    FOLD[ch] = out;
    return out;
  }

  function fold(s) {
    var out = '', i;
    for (i = 0; i < s.length; i++) out += foldChar(s.charAt(i));
    return out;
  }

  /* A word is letters and digits. Dashes fold to spaces above, so Dickinson's spaced
     en dashes separate words rather than welding them. */
  var WORD = /[^\s!-\/:-@\[-`{-~¡-¿ -⁯]/;

  /* WHERE A CROP MAY LAND, which is not the same question. An apostrophe is ASCII
     punctuation and so not a word character — right for tokenizing, and wrong for
     snapping a window, because it let a crop end inside a contraction and print
     "…s rest the guise" where the sheet says "Let's rest the guise". The window walks
     outward over an apostrophe and a hyphen too.

     Carving those out of the negated class above was the obvious move and the wrong
     one: it left the CURLY apostrophe a boundary, and this runs on the ORIGINAL text,
     where every apostrophe on the site is curly. Said outright instead, which is also
     the version somebody can check by reading it. */
  function inWord(c) { return WORD.test(c) || c === "'" || c === '\u2019' || c === '-'; }

  /* ── the index ─────────────────────────────────────────────────────────────── */

  var data = null, state = 'cold';

  function prepare(ix) {
    var i, j, r;
    for (i = 0; i < ix.records.length; i++) {
      r = ix.records[i];
      r.f = fold(r.text);
      r.fh = fold(r.heading || '');
      r.fn = fold(r.name || '');
      r.ft = fold(ix.pages[r.page].title + ' ' + (ix.pages[r.page].sub || ''));
      for (j = 0; j < r.quotes.length; j++) {
        r.quotes[j].f = fold(r.quotes[j].text);
        r.quotes[j].fs = fold(r.quotes[j].source || '');
      }
    }
    return ix;
  }

  function load() {
    if (state !== 'cold') return Promise.resolve(data);
    state = 'loading';
    /* Relative, so it resolves under whichever address served this page — the house
       rule for every shared asset, and check-addresses.mjs is its guard. */
    return fetch('search-index.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (ix) { data = prepare(ix); state = 'ready'; return data; })
      .catch(function () { state = 'broken'; return null; });
  }

  /* ── the query ─────────────────────────────────────────────────────────────── */

  /** Split into prefix terms and quoted phrases. A phrase is matched entire. */
  function parse(raw) {
    var terms = [], q = fold(raw), i = 0, ch, buf = '';
    while (i < q.length) {
      ch = q.charAt(i);
      if (ch === '"') {
        var end = q.indexOf('"', i + 1);
        if (end < 0) end = q.length;
        var phrase = q.slice(i + 1, end).replace(/\s+/g, ' ').trim();
        if (phrase) terms.push({ s: phrase, phrase: true });
        i = end + 1;
        continue;
      }
      if (WORD.test(ch)) { buf += ch; i++; continue; }
      if (buf) { terms.push({ s: buf, phrase: false }); buf = ''; }
      i++;
    }
    if (buf) terms.push({ s: buf, phrase: false });
    return terms;
  }

  /**
   * Every place `term` occurs in the folded `hay`, as [start, end] pairs.
   * A bare term matches at the START of a word, so typing "dick" finds Dickinson
   * while "ick" does not find it. A phrase matches wherever it begins a word.
   */
  function hits(hay, term) {
    var out = [], at = 0, i;
    if (!term.s) return out;
    while ((i = hay.indexOf(term.s, at)) !== -1) {
      at = i + 1;
      if (i > 0 && WORD.test(hay.charAt(i - 1))) continue;   // mid-word: not a match
      out.push([i, i + term.s.length]);
    }
    return out;
  }

  var WEIGHT = { heading: 8, name: 8, title: 6, source: 2, text: 1, quote: 1 };

  function score(r, terms) {
    var total = 0, k, t, n, j, q, qhit, all = true;
    var marks = { text: [], quotes: {} };

    for (k = 0; k < terms.length; k++) {
      t = terms[k];
      n = 0;

      var inText = hits(r.f, t);
      n += inText.length * WEIGHT.text;
      marks.text = marks.text.concat(inText);

      n += hits(r.fh, t).length * WEIGHT.heading;
      n += hits(r.fn, t).length * WEIGHT.name;
      n += hits(r.ft, t).length * WEIGHT.title;

      for (j = 0; j < r.quotes.length; j++) {
        q = r.quotes[j];
        qhit = hits(q.f, t);
        n += qhit.length * WEIGHT.quote;
        n += hits(q.fs, t).length * WEIGHT.source;
        if (qhit.length) {
          if (!marks.quotes[j]) marks.quotes[j] = [];
          marks.quotes[j] = marks.quotes[j].concat(qhit);
        }
      }

      /* EVERY term must land somewhere in the record. Two words narrows. */
      if (!n) { all = false; break; }
      total += n;
    }

    if (!all) return null;
    marks.text.sort(function (a, b) { return a[0] - b[0]; });
    return { score: total, marks: marks };
  }

  /* ── the crop, and the fences that bound it ────────────────────────────────── */

  var WINDOW = 280;

  /**
   * A window of `text` around its first match.
   *
   * THE WIDENING IS THE POINT. `fenced` holds the character range of every inline
   * quotation in this prose, recorded by the generator and proved there against the
   * text it fences. A window that straddles one is grown to contain it whole, and
   * growing can straddle another, so it repeats until nothing is half-covered. The
   * alternative is the failure this site is organised against: somebody else's
   * sentence, trimmed to fit our box, with our ellipsis standing in for their words.
   */
  function crop(text, fenced, marks) {
    var first = marks.length ? marks[0][0] : 0;
    var start = Math.max(0, first - Math.floor(WINDOW / 3));
    var end = Math.min(text.length, start + WINDOW);
    var moved = true, i, f;

    while (moved) {
      moved = false;
      for (i = 0; i < fenced.length; i++) {
        f = fenced[i];
        if (f[1] <= start || f[0] >= end) continue;          // clear of the window
        if (f[0] < start) { start = f[0]; moved = true; }
        if (f[1] > end) { end = f[1]; moved = true; }
      }
    }

    while (start > 0 && inWord(text.charAt(start - 1))) start--;
    while (end < text.length && inWord(text.charAt(end))) end++;

    return { text: text.slice(start, end), from: start,
             lead: start > 0, tail: end < text.length };
  }

  /** Paint `text` into `node`, wrapping each range in a mark. Text nodes only. */
  function paint(node, text, marks, offset) {
    var at = 0, i, a, b, m;
    for (i = 0; i < marks.length; i++) {
      a = marks[i][0] - offset;
      b = marks[i][1] - offset;
      if (b <= 0 || a >= text.length) continue;
      if (a < at) continue;                                  // overlapping terms
      if (a > at) node.appendChild(document.createTextNode(text.slice(at, a)));
      m = document.createElement('mark');
      m.textContent = text.slice(Math.max(a, 0), Math.min(b, text.length));
      node.appendChild(m);
      at = Math.min(b, text.length);
    }
    if (at < text.length) node.appendChild(document.createTextNode(text.slice(at)));
  }

  /* ── rendering ─────────────────────────────────────────────────────────────── */

  var ELLIPSIS = '…';

  function render(r, hit) {
    var page = data.pages[r.page];
    var el = tpl('qe-tpl-result');
    var no = el.querySelector('.qe-result-no');
    var link = el.querySelector('.qe-result-link');
    var where = el.querySelector('.qe-result-in');
    var snip = el.querySelector('.qe-result-snip');
    var j, q;

    /* The register names itself by its entry; a sheet names itself by its section. */
    if (r.kind) {
      no.className = 'qe-tag qe-tag--' + kindClass(r.kind);
      no.textContent = r.kind;
      link.textContent = r.name;
    } else {
      if (page.no) no.textContent = page.no; else no.remove();
      link.textContent = r.heading || page.title;
    }
    link.setAttribute('href', page.url + (r.id ? '#' + r.id : ''));

    /* The second line says which sheet a section belongs to, and who made the thing
       being read. A register row gets neither: its group heading already says where it
       is, and repeating "The accession register" under every one of six results is a
       line that carries nothing. An opener has no heading, so its link is already the
       page title and the line would repeat that too. */
    var context = '';
    if (!page.register) {
      if (r.heading) context = page.title;
      if (page.sub) context += (context ? ' · ' : '') + page.sub;
    }
    if (context) where.textContent = context; else where.remove();

    if (hit.marks.text.length) {
      var c = crop(r.text, r.quoted, hit.marks.text);
      if (c.lead) snip.appendChild(document.createTextNode(ELLIPSIS));
      paint(snip, c.text, hit.marks.text, c.from);
      if (c.tail) snip.appendChild(document.createTextNode(ELLIPSIS));
    } else {
      snip.remove();
    }

    /* WHOLE, WITH ITS SOURCE, OR NOT AT ALL. */
    for (j = 0; j < r.quotes.length; j++) {
      if (!hit.marks.quotes[j]) continue;
      q = r.quotes[j];
      var fig = tpl('qe-tpl-quote');
      var bq = fig.querySelector('blockquote');
      var cap = fig.querySelector('figcaption');
      /* OUR OWN VERSE SAYS SO. The template's label is authored for the ordinary case —
         somebody else's words, quoted here. The reply poem on /wild-nights is ours, and
         calling that a quotation would be a misattribution running the other way, so it
         wears the label the sheet already gives it, carried through the index rather
         than composed. */
      if (q.label) fig.querySelector('.qe-specimen-label').textContent = q.label;
      if (q.cite) bq.setAttribute('cite', q.cite);
      paint(bq, q.text, hit.marks.quotes[j], 0);
      if (q.source) cap.textContent = q.source; else cap.remove();
      el.appendChild(fig);
    }

    return el;
  }

  /* The register's four kinds, so a result wears the chip the entry wears. Derived
     from the entry's own word — nothing here decides what kind an entry is. */
  function kindClass(kind) {
    var k = fold(kind);
    if (k.indexOf('re-determined') === 0) return 'redet';
    if (k.indexOf('label') === 0) return 'label';
    if (k.indexOf('mounted') === 0) return 'mounted';
    if (k.indexOf('cabinet') === 0) return 'cabinet';
    return 'plain';
  }

  function group(id, rows) {
    var sec = tpl(id);
    var into = sec.querySelector('.qe-result-list');
    for (var i = 0; i < rows.length; i++) into.appendChild(render(rows[i].r, rows[i].hit));
    return sec;
  }

  /* ── running one search ────────────────────────────────────────────────────── */

  var showing = '';

  function run(raw) {
    var query = raw.trim();

    if (!query) {
      showing = '';
      panel.hidden = true;
      list.textContent = '';
      count.textContent = '';
      return;
    }
    if (query === showing) return;
    showing = query;

    load().then(function (ix) {
      if (showing !== query) return;                         // a later keystroke won
      panel.hidden = false;
      list.textContent = '';
      count.textContent = '';

      if (!ix) { count.appendChild(tpl('qe-tpl-broken')); return; }

      var terms = parse(query);
      if (!terms.length) { panel.hidden = true; showing = ''; return; }

      var sheets = [], register = [], i, r, hit;
      for (i = 0; i < ix.records.length; i++) {
        r = ix.records[i];
        hit = score(r, terms);
        if (!hit) continue;
        (ix.pages[r.page].register ? register : sheets).push({ r: r, hit: hit, score: hit.score });
      }

      /* Highest first; document order breaks a tie, because that is the order somebody
         chose to put these words in. */
      var byScore = function (a, b) { return b.score - a.score; };
      sheets.sort(byScore);
      register.sort(byScore);

      if (!sheets.length && !register.length) {
        var none = tpl('qe-tpl-none');
        none.querySelector('.qe-result-term').textContent = query;
        list.appendChild(none);
        return;
      }

      var line = tpl('qe-tpl-count');
      line.querySelector('.qe-count-sheets').textContent = sheets.length;
      line.querySelector('.qe-count-register').textContent = register.length;
      line.querySelector('.qe-result-term').textContent = query;
      count.appendChild(line);

      if (sheets.length) list.appendChild(group('qe-tpl-sheets', sheets));
      if (register.length) list.appendChild(group('qe-tpl-register', register));
    });
  }

  /* ── wiring ────────────────────────────────────────────────────────────────── */

  /* The query lives in the fragment, so it is shareable and reaches no server. */
  function fromHash() {
    var h = location.hash.replace(/^#/, '');
    if (h.indexOf('q=') !== 0) return null;
    try { return decodeURIComponent(h.slice(2).replace(/\+/g, ' ')); } catch (e) { return null; }
  }

  function toHash(q) {
    var want = q ? '#q=' + encodeURIComponent(q) : '';
    if ((location.hash || '') === want) return;
    /* replaceState, not a new entry: typing eight characters should not cost a reader
       eight presses of Back to leave the page. */
    if (history.replaceState) history.replaceState(null, '', location.pathname + (want || location.search));
    else if (want) location.hash = want;
  }

  var timer = null;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () { run(input.value); toHash(input.value.trim()); }, 120);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();                                      // never a query string
    clearTimeout(timer);
    run(input.value);
    toHash(input.value.trim());
  });

  window.addEventListener('hashchange', function () {
    var q = fromHash();
    if (q !== null && q !== input.value) { input.value = q; run(q); }
  });

  var initial = fromHash();
  if (initial) { input.value = initial; run(initial); }
})();
