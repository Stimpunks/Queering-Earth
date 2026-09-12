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
  ['The plate', ['the-plate',
                 'on-being-ill', 'coming-to-terms', 'promises-like-pie-crust', 'invention-of-normal',
                 'the-tempest', 'wild-nights', 'flower-codes', 'monotropa-uniflora',
                 'five-unmistakable-marks', 'other-people-who-have-it',
                 'gloomy-sunflowers', 'most-quiet-need']],
  ['The founding papers', ['the-founding-papers', 'mission', 'manifesto', 'two-cohabitating-modes']],
  ['The cabinet itself', ['index', 'the-cabinet-itself',
                          'design', 'changelog', 'whats-new', 'search', 'ledger', 'how-we-quote',
                          'what-is-settled', 'privacy']],
];

/**
 * The collection page at the head of each group, keyed by the group's heading.
 *
 * EACH GROUP'S FIRST ENTRY IS ITS OWN INDEX, and that is the whole of the mapping —
 * `the-plate` leads the plate, `the-founding-papers` leads the founding papers,
 * and `the-cabinet-itself` sits under `index` in the cabinet because the home page
 * is the front of the cabinet and the collection page is the drawer inside it.
 *
 * DERIVED FROM GROUPS RATHER THAN LISTED AGAIN, because a second list is a second
 * answer to one question. What is authored here is the address; the membership is
 * whatever GROUPS says, which is the same list the breadcrumbs, the drawers menu,
 * /llms.txt and the finding aid's manifest all read.
 */
export const COLLECTIONS = new Map([
  ['The plate', 'the-plate'],
  ['The founding papers', 'the-founding-papers'],
  ['The cabinet itself', 'the-cabinet-itself'],
]);

/** Which collection a page belongs to: slug -> { group, collection }. A collection
 *  page maps to itself, which is what lets a breadcrumb stop at the collection and
 *  the drawers menu mark the current drawer. `index` is in no collection — the home
 *  page is above the scheme, not inside it. */
export const COLLECTION_OF = new Map();
for (const [heading, slugs] of GROUPS) {
  const collection = COLLECTIONS.get(heading);
  if (!collection) continue;
  for (const slug of slugs) {
    if (slug === 'index') continue;
    COLLECTION_OF.set(slug, { group: heading, collection });
  }
}

/** The register keeps its own back matter, and the finding aid defers to it. */
export const REGISTER = 'changelog';
