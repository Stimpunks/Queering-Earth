/**
 * pages.mjs — the order a reader should meet these pages, and how they group.
 *
 * AUTHORED, not derived. These are editorial words and an editorial sequence: which
 * pages are readings and which are the cabinet's own furniture is a judgement, and
 * the order inside each group is the order somebody chose. Nothing can compute it.
 *
 * SHARED, so there is one copy. `make-markdown.mjs` builds /llms.txt from this and
 * `make-search-index.mjs` builds the finding aid's manifest from it. Kept separately
 * they would drift, and the drift would be silent in the worst direction: a new sheet
 * added to one and not the other is a sheet that is announced to agents and missing
 * from the reader's index, or the reverse.
 *
 * A NEW SHEET GOES IN A GROUP. make-markdown.mjs throws on a page in none, which is
 * the reminder.
 *
 * THE LAST TWO GROUPS ARE NOT ONE GROUP, and the split is the editorial judgement
 * this file exists to hold. `The founding papers` is why the cabinet exists; `The
 * cabinet itself` is how it is made, recorded, searched, and what it knows about
 * the reader. Purpose above plumbing. The same two headings are the two lists at
 * the foot of the home page, so a page filed in the wrong one here is announced to
 * agents under a heading that disagrees with the one a reader sees.
 */
export const GROUPS = [
  ['The readings', ['on-being-ill', 'coming-to-terms', 'promises-like-pie-crust', 'invention-of-normal',
                    'the-tempest', 'wild-nights', 'flower-codes', 'monotropa-uniflora',
                    'five-unmistakable-marks', 'other-people-who-have-it']],
  ['The founding papers', ['mission', 'manifesto']],
  ['The cabinet itself', ['index', 'design', 'changelog', 'search', 'ledger', 'what-is-settled', 'privacy']],
];

/** The register keeps its own back matter, and the finding aid defers to it. */
export const REGISTER = 'changelog';
