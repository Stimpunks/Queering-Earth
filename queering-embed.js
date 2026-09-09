/* queering-embed.js — turns an authored link into a click-to-load player.
 *
 * A THIRD FILE, for the reason queering-search.js is a third file. The boundary on
 * queering.js is that nothing there may put content on a page; this script's entire
 * job is to put SOMEBODY ELSE'S content on a page, which is the strongest possible
 * version of the thing that boundary prohibits. Widening the boundary to fit would
 * have cost the boundary.
 *
 * IT CREATES NO WORDS. Every word a reader sees — the label, the note naming the
 * third party, the caption — is authored in index.html. Even the player's accessible
 * name is authored: it is read from data-embed-title rather than written here.
 *
 * NOTHING IS FETCHED FROM ANOTHER ORIGIN UNTIL THE READER ASKS. The served page
 * contains a poster we drew and a plain link to YouTube. With this script, that link
 * stops navigating and becomes a play control that swaps the poster for the player
 * in place. Without it, the link still works and takes the reader to YouTube. Both
 * paths are a request the reader chose to make, which is the same footing as every
 * other outbound link on this site, and /privacy describes it either way.
 *
 * youtube-nocookie.com is deliberate: the same player, without the cookies YouTube
 * would otherwise set before anybody pressed play. It is not "no tracking" and
 * /privacy does not claim that it is.
 */
(function () {
  var facades = document.querySelectorAll('[data-embed-id]');
  if (!facades.length) return;

  Array.prototype.forEach.call(facades, function (fig) {
    var link = fig.querySelector('.qe-embed-go');
    var stage = fig.querySelector('.qe-embed-stage');
    if (!link || !stage) return;

    /* The reader who never clicks must be left with the served markup untouched, so
       the only thing done up front is to say that the control now acts in place. */
    link.setAttribute('role', 'button');

    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;  /* let a new tab be a new tab */
      e.preventDefault();

      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + fig.dataset.embedId
                + '?autoplay=1&rel=0&modestbranding=1';
      frame.title = fig.dataset.embedTitle || '';   /* authored in the markup, not here */
      frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      frame.className = 'qe-embed-frame';

      stage.replaceChildren(frame);
      fig.classList.add('qe-embed--playing');
      frame.focus();
    });
  });
})();
