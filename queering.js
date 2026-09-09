/* queering.js — the two view controls, and nothing else.
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
})();
