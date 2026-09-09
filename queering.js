/* queering.js — the view controls and the contents list. It may derive navigation
 * from the DOM; it may never create words.
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

  /* ── on this sheet
   *
   * Built from the page's own <h2>s, never typed. See the long note in
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

  var contents = document.querySelector('.qe-contents');
  if (contents) {
    var list = contents.querySelector('ol');
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

    /* Hidden in the markup so a reader without this script never sees an empty
       ruled box, and still hidden if the page asked for contents and has no
       headings to put in them — which is a markup mistake, and showing an empty
       list is not how to report it. */
    if (made) contents.hidden = false;
  }
})();
