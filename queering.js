/* queering.js — the view controls, the contents list and the drift rail. It may
 * derive navigation from the DOM; it may never create words.
 *
 * That boundary replaced an earlier one, "the two view controls, and nothing else",
 * on 2026-09-09. A count of features is a rule that gets quietly broken the first
 * time a third thing is worth having; a boundary says what the file is FOR. The
 * prohibition that actually matters is unchanged and is stronger stated this way:
 * nothing here may put content on a page. `.qe-contents` is built from headings
 * that are already in the served HTML, so a reader without this script loses a
 * shortcut and loses no words.
 *
 * Plain view is a class on <html>, not a second document. Everything decorative
 * is switched off in queering.css under `html.plain`, so the words never move
 * and there is only ever one copy of them to keep correct.
 *
 * The ground is the same shape of idea: `html.cabinet` and `html.daylight` are
 * classes, the palette they switch lives entirely in queering.css, and the words
 * do not know which ground they are lying on.
 *
 * The stored preferences are ALSO read by a tiny inline script in each page's
 * <head>, before first paint. This file cannot do that job: by the time a
 * deferred script runs, a reader who turned the decoration off — or who asked
 * for the dark ground — has already been shown the other thing. The duplication
 * is deliberate: the inline copy prevents the flash, this one handles the click.
 */
(function () {
  var root = document.documentElement;

  /* Losing a stored preference is survivable; losing a button is not. Private
     browsing and blocked site data both throw on read as well as write. */
  function remember(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  /* ── plain view */

  var plainBtn = document.getElementById('qe-plain');
  if (plainBtn) {
    var paintPlain = function () {
      var on = root.classList.contains('plain');
      plainBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      plainBtn.textContent = on ? 'Full view' : 'Plain view';
    };

    plainBtn.addEventListener('click', function () {
      remember('qe-plain', root.classList.toggle('plain') ? '1' : '0');
      paintPlain();
    });

    paintPlain();
  }

  /* ── the ground
   *
   * Three states, one button. With neither class set the system decides, which
   * is the state a reader who has never touched this arrives in — so the button
   * reports the ground they can SEE, not a preference they have not expressed,
   * and clicking it writes the opposite one down. The stored choice then wins
   * over the system in both directions.
   */

  var groundBtn = document.getElementById('qe-ground');
  if (groundBtn) {
    /* matchMedia is old enough to assume, but a media query the browser does not
       know answers `matches: false`, which is the daylight ground — the right way
       to be wrong. */
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    var inCabinet = function () {
      if (root.classList.contains('cabinet')) return true;
      if (root.classList.contains('daylight')) return false;
      return prefersDark.matches;
    };

    var paintGround = function () {
      var dark = inCabinet();
      groundBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      groundBtn.textContent = dark ? 'Daylight' : 'Cabinet';
    };

    groundBtn.addEventListener('click', function () {
      var toCabinet = !inCabinet();
      root.classList.toggle('cabinet', toCabinet);
      root.classList.toggle('daylight', !toCabinet);
      remember('qe-ground', toCabinet ? 'cabinet' : 'daylight');
      paintGround();
    });

    /* A reader whose machine flips at sunset, and who has never chosen, gets the
       new ground from CSS on its own — but the button would sit there naming the
       ground they just left. */
    if (prefersDark.addEventListener) {
      prefersDark.addEventListener('change', paintGround);
    }

    paintGround();
  }

  /* ── on this sheet, and in the margin
   *
   * Two views of one derivation: the contents list inside the measure, and the
   * drift rail out in the left margin above 64rem. Both are built from the page's
   * own <h2>s, never typed. See the long note in
   * queering.css for why a hand-kept contents list is the one thing this site's
   * oldest rule forbids.
   *
   * A PAGE OPTS IN by including the container. There is no word-count threshold
   * here deciding for it: which sheets are long enough to want contents is an
   * editorial call, stated in the markup like every other fact on this site.
   *
   * THREE HEADINGS MUST NOT LAND IN THE LIST, and none of them is caught by a
   * guard:
   *   · `.qe-elsewhere h2` — the sibling nav's own heading, which lives OUTSIDE
   *     <main>. Scoping the query to main is what excludes it.
   *   · `.qe-contents h2` — this component's own heading, which is inside main
   *     and would otherwise list itself.
   *   · any <h2> without an id, because there would be nothing to link to.
   *
   * THE LABEL IS THE HEADING, VERBATIM. The <h2> is cloned and its section mark
   * removed before the text is read — no truncation, no shortened restatement. On
   * a sheet whose headings are quotations the list reads as a strange poem, and on
   * /changelog it reads as sixteen full sentences. Both are the heading doing its
   * job. A shortened label would be a second copy of the words, free to drift, and
   * a truncated one would be this site's characteristic failure applied to itself.
   */

  /* ONE BUILDER, TWO CONTAINERS. The contents list and the drift rail are the
   * same derivation — this page's own <h2>s, in document order, labelled with
   * their own words — shown twice in two registers. A second loop would be a
   * second place for the three exclusions below to be got right, and the one
   * that fell behind would be the one nobody was looking at.
   *
   * Both containers hold an empty <ol> in the served markup and both stay hidden
   * until this fills them, so a reader without this script sees neither an empty
   * ruled box nor an empty rail.
   */
  function fillHeadings(container) {
    var list = container.querySelector('ol');
    if (!list) return 0;

    var heads = document.querySelectorAll('main h2[id]');
    var made = 0;

    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      if (h.closest('.qe-contents')) continue;

      /* Clone rather than read textContent off the live heading: the section mark
         is a child of it, and its accessible name would arrive in the label. */
      var copy = h.cloneNode(true);
      var mark = copy.querySelector('.qe-anchor');
      if (mark) mark.remove();
      var label = copy.textContent.replace(/\s+/g, ' ').trim();
      if (!label) continue;

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href', '#' + h.id);
      a.textContent = label;
      li.appendChild(a);
      list.appendChild(li);
      made++;
    }

    if (made) container.hidden = false;
    return made;
  }

  var contents = document.querySelector('.qe-contents');
  if (contents) fillHeadings(contents);

  /* The rail lives OUTSIDE <main>, which is what keeps it out of the mirror, out
     of search-index.json and out of every .md — and is why it needed no line in
     either generator's skip list. It is hidden in the markup for the same reason
     the contents list is. */
  var rail = document.querySelector('.qe-rail');
  if (rail) fillHeadings(rail);

  /* ── index by sheet
   *
   * The register is kept by accession, which is by date, because a sheet, its
   * corrections and the CSS it needed are one dated event. That is the right unit
   * to WRITE in and the wrong one to look something up in: a reader here is
   * usually asking what happened to one sheet, and its entries are scattered
   * across sixteen dates. So the same entries are filed the other way, once, at
   * the foot of the page.
   *
   * BACK MATTER, and that distinction is the thing this page got wrong before. A
   * contents list is front matter and belongs at the top; an INDEX is back matter
   * and belongs at the end. Reaching for a contents list here produced a 1,293px
   * block that delayed the first entry by three and a half screens. An index at
   * the end delays nobody and is where a bound volume has always kept one.
   *
   * THE GROUPS AND THEIR ORDER ARE AUTHORED; ONLY THE FILING IS DERIVED. Every
   * group, its heading, its sheet number and the order they appear in are written
   * in changelog.html, because those are editorial words and this file may not
   * write words. What happens here is only sorting: an entry's name is cloned out
   * of the entry it already lives in, and its kind chip is cloned too. Nothing is
   * composed, nothing is summarised, nothing is truncated.
   *
   * WHICH SHEET AN ENTRY CONCERNS IS STATED, NOT INFERRED. Each entry carries
   * `data-sheet`. Deriving it from the links inside an entry was tried on paper
   * and fails: the Dickinson accession links three sheets and concerns one, so
   * incidental cross-references would file corrections under sheets they have
   * nothing to do with. On a site whose whole risk is a wrong attribution, an
   * index that silently misfiles a correction is the worst available bug, so the
   * association is authored and check-markup.mjs validates every token of it.
   *
   * AN EMPTY GROUP STAYS HIDDEN. A sheet with no entries is a sheet nothing has
   * happened to, and an empty heading under it reads as a fault.
   */

  var index = document.querySelector('.qe-sheet-index');
  if (index) {
    var groups = index.querySelectorAll('.qe-index-group');
    var filled = 0;

    for (var g = 0; g < groups.length; g++) {
      var group = groups[g];
      var slug = group.getAttribute('data-sheet');
      var into = group.querySelector('ul');
      var count = 0;

      var entries = document.querySelectorAll('.qe-entry[data-sheet]');
      for (var e = 0; e < entries.length; e++) {
        var entry = entries[e];
        /* Split on whitespace: an entry may concern two sheets — the byline rule
           changed Sheet No. 4 and gave No. 1 a second reader in one stroke — and
           it belongs under both rather than under whichever is listed first. */
        var owns = entry.getAttribute('data-sheet').split(/\s+/);
        if (owns.indexOf(slug) === -1) continue;

        var accession = entry.closest('.qe-accession');
        var heading = accession && accession.querySelector('h2[id]');
        if (!heading) continue;

        var nameEl = entry.querySelector('.qe-entry-name');
        if (!nameEl) continue;
        var name = nameEl.cloneNode(true);
        var stray = name.querySelector('.qe-anchor');
        if (stray) stray.remove();
        var label = name.textContent.replace(/\s+/g, ' ').trim();
        if (!label) continue;

        var li = document.createElement('li');

        /* The kind chip, cloned rather than rebuilt, so the index cannot end up
           calling an entry something the entry does not call itself. */
        var chip = entry.querySelector('.qe-tag');
        if (chip) li.appendChild(chip.cloneNode(true));

        var a = document.createElement('a');
        a.setAttribute('href', '#' + heading.id);
        a.textContent = label;
        li.appendChild(a);

        into.appendChild(li);
        count++;
      }

      if (count) { group.hidden = false; filled++; }
    }

    if (filled) index.hidden = false;
  }
})();
