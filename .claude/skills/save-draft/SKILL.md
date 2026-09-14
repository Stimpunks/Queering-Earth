---
name: save-draft
description: Commit and push a draft on its own draft branch so the review URL updates, without touching the published site. Use when Ryan or Helen says "save the draft", "push the draft", "update the draft", "send it back for review", or has finished a round of edits on a draft. Also covers bringing main's changes into a draft branch — "catch the draft up", "merge main in", "the draft is behind" — and throwing a draft away.
---

# save-draft

Commits whatever is on the draft branch and pushes it, so the address Helen has
bookmarked shows the new version about twenty seconds later. **Nothing here can reach
queering.earth** — the branch is never merged out.

## Steps

1. **Find the draft and make sure there is one.**

   ```bash
   node tools/draft.mjs
   ```

   Nothing in progress means the edits are probably on `main` by mistake. Stop and ask.

2. **If you are on `main`, the tree must be clean before switching.** `git switch` carries
   uncommitted changes to the other branch; that is how edits meant for one branch arrive on
   the other. Check first, always:

   ```bash
   git branch --show-current && git status --short
   ```

   **Each draft has its own branch, named `draft/<slug>`.** `node tools/draft.mjs` lists
   them all with their pages and URLs. Nothing is drafted on `drafts` itself, which is a
   base carrying only the noindex header and the practice page.

   Already on the draft branch with the draft's own changes uncommitted: that is the normal case,
   carry on.

3. **Is the branch behind `main`?** Only worth asking when the draft wants something that
   has landed since — a new gate, a stylesheet rule, a shared asset. See **Bringing main's
   changes in** below; it has to happen with a clean tree, so commit the draft's own work
   first. If the draft does not need anything from `main`, leave it behind and carry on.

4. **Check the markup, and then whatever else is cheap and applies.**

   ```bash
   node tools/check-markup.mjs --check <draft>.html
   ```

   Markup is the one that always matters: `make-markdown`, `make-search-index` and
   `make-records` all parse this HTML with regexes and assume every tag closes — an
   unclosed `section` once swallowed a whole register entry silently.

   **The three rendering gates take a file argument and are worth running on a draft**,
   because they measure the page rather than the accession:

   ```bash
   node tools/check-contrast.mjs --check <draft>.html
   node tools/check-width.mjs <draft>.html
   node tools/check-overlap.mjs --check <draft>.html
   ```

   **`check-metadata.mjs` also runs on the branch now**, since the generators skip drafts.
   It will not check the draft itself — a draft has no canonical, no group and no
   accession, all by design — but it confirms the draft has not broken anything else,
   which matters the moment a draft touches a shared asset like `queering.css` or adds a
   plate. It names what it skipped.

   **The accession gates are still supposed to fail** and chasing them wastes the session:
   the missing `301!`, the missing card and the missing `<loc>` are the checklist, not
   defects. **Do not run `tools/check.mjs`** — its scoping and its four-minute sweep belong
   at publication.

5. **Commit and push.** Ask for a message if the change is not obvious from the diff;
   otherwise say what moved.

   ```bash
   git add -A && git commit -m "Draft: <what changed>" && git push
   ```

6. **Confirm and hand back the URL.**

   ```bash
   node tools/draft.mjs
   ```

   Say plainly that the review link is unchanged and will show the new version shortly.
   **The notes survive** — they are keyed to the page's address in the reviewer's own
   browser, not to the version — and any note whose paragraph you rewrote will re-attach and
   say *the text here has changed since this note was written*. Nothing is lost, but say so,
   because the reviewer may have been commenting on the sentence that just went.

7. **Return to main** unless the next thing is more drafting:

   ```bash
   git switch main
   ```

## Bringing main's changes in

**`main` merges INTO a draft branch and never the other way.** The branch carries the
`X-Robots-Tag: noindex` that must never reach production; publishing takes the file.

**The tree must be clean first**, so commit the draft's own work before merging rather than
after — a merge into a dirty tree is how a draft's half-finished paragraph ends up inside a
merge commit.

```bash
git fetch origin && git rev-list --count HEAD..origin/main   # how far behind, 0 means skip this
git merge main -m "Bring draft/<slug> up to date with main"
```

### EXPECT A CONFLICT IN THE GENERATED FILES, AND NEVER RESOLVE IT BY HAND

`search-index.json` is the usual one; `ledger.html`, `whats-new.html`, `register.xml`,
`llms-full.txt` and the `.md` siblings can all do it. **They are derived, so neither side is
the answer and hand-editing one is editing a build output.**

**Picking main's copy is the trap, and it is silent.** A draft that quotes anybody has its
rows in `ATTRIBUTIONS.md` on this branch and nowhere else, so `/ledger` here legitimately
differs from `/ledger` on `main`. Take main's generated copy and **the draft's credit rows
vanish from the branch** while every page still reads perfectly — which is this site's
characteristic failure, a missing attribution, produced by a merge nobody looked at.

Clear the marker with either side, then let the generators decide:

```bash
git checkout --theirs search-index.json && git add search-index.json
node tools/make-records.mjs && node tools/make-whats-new.mjs && node tools/make-search-index.mjs && node tools/make-markdown.mjs && node tools/make-csp.mjs
```

**The regeneration IS the resolution.** Whatever the generators write is correct for this
branch by construction, because they read this branch's sources.

Then prove the thing that was actually at risk, rather than assuming it:

```bash
grep -c '<the draft title>' ATTRIBUTIONS.md ledger.html    # the two must agree and be non-zero
```

### Then check what the merge brought

```bash
node tools/check-markup.mjs --check      # every page: the new gate may be newer than this branch
node tools/make-csp.mjs --check          # the policy must cover this branch's page count
node tools/check-cache.mjs
```

**`make-csp --check` is the one worth understanding.** The policy hashes the before-paint
snippet on every page, and a draft page is a page — if it reports a different hash or refuses,
the draft's snippet has drifted from the house's and the branch deploy would flash the wrong
ground at its reviewer. It reports the page count, which should be main's plus this branch's
own pages.

**And confirm the noindex survived**, because that is the one header this whole arrangement
depends on:

```bash
awk '/^\/[^ ]*$/{p=$0} /^  X-Robots-Tag/{print p"  ->  "$0}' _headers
```

`/*` must be listed. If the merge conflicted in `_headers`, **keep both sides** — main's
changes and the branch-only noindex block.

Commit the merge and push; the review URL rebuilds as usual.

## Throwing a draft away

A draft that is not going to be published should be deleted rather than left on the branch,
where `tools/draft.mjs` will keep reporting it as in progress.

```bash
git push origin --delete draft/<slug> && git branch -D draft/<slug> && git switch main
```

Deleting the branch takes the draft with it, which is the point of one branch per draft.
**`review-practice.html` lives on the `drafts` base and is not yours to delete** — it is the
page a reviewer learns the tool on, and `tools/draft.mjs` declares it as furniture.

## What this never does

It does not touch `main`, does not run the full sweep, and does not add a register entry. A
draft has not been accessioned, so there is nothing to record yet. All of that is
`publish-draft`.

**It regenerates in exactly one case and that is not an exception to the above.** Merging
`main` in conflicts the derived files, and running the generators is how such a conflict is
resolved correctly — it is not a build step bolted onto saving a draft. A save that did not
merge writes no generated file, and running the generators for any other reason here is
publication work happening early.
