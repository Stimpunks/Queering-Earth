/* queering.js — the plain-view control, and nothing else.
 *
 * Plain view is a class on <html>, not a second document. Everything decorative
 * is switched off in queering.css under `html.plain`, so the words never move
 * and there is only ever one copy of them to keep correct.
 *
 * The stored preference is ALSO read by a tiny inline script in each page's
 * <head>, before first paint. This file cannot do that job: by the time a
 * deferred script runs, a reader who turned the decoration off has already been
 * shown it. The duplication is deliberate — the inline copy is the one that
 * prevents the flash, this one is the one that handles the click.
 */
(function () {
  var btn = document.getElementById('qe-plain');
  if (!btn) return;

  var root = document.documentElement;

  function paint() {
    var on = root.classList.contains('plain');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent = on ? 'Full view' : 'Plain view';
  }

  btn.addEventListener('click', function () {
    var on = root.classList.toggle('plain');
    /* Private browsing and blocked site data both throw here. Losing the
       preference is survivable; losing the button is not. */
    try { localStorage.setItem('qe-plain', on ? '1' : '0'); } catch (e) {}
    paint();
  });

  paint();
})();
