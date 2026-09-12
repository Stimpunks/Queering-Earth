---
name: publish-draft
description: Accession the draft in progress — take the file onto main, strip the draft block, work the accession checklist, run the full sweep, and push it live to queering.earth. Use when Ryan says "publish the draft", "ship it", "Helen has signed off", "mount the sheet", or "put the draft live". Handles every git step and drives the editorial ones.
---

# publish-draft

Publishing is **accession**, not a merge. The draft stops being a draft and becomes a sheet
in the cabinet, which means a number, a card, a stamp, a provenance line, a register entry
and an address — the checklist `CLAUDE.md` states as *mount it, card it, log it, file it,
stamp it, route it, crumb it, group it, rail it*. This skill runs the git and drives the rest;
**it cannot do the editorial half alone** and must not pretend to.

## Before anything

1. **Which draft, and is it saved?**

   ```bash
   node tools/draft.mjs && git status --short
   ```

   Two drafts: ask which. Uncommitted changes on `drafts`: run `save-draft` first, so the
   version being published is the version Helen read.

2. **Has Helen actually signed off?** Ask if it has not been said. This skill puts words on a
   public site under two organisations' names.

3. **The tree must be clean before switching branches.** `git switch` carries uncommitted
   changes across, which is how edits land on the wrong branch.

## Take the file

```bash
git switch main && git checkout drafts -- <draft>.html
```

**THE FILE, NEVER THE BRANCH.** `git merge drafts` is wrong twice: it would publish every
other draft on the branch at once, and it would carry the branch's `X-Robots-Tag: noindex`
onto production, dropping every page on the site out of every index. `CLAUDE.md` and the
comment in `_headers` both say so.

Then **delete the three-line draft block** — the comment, the `robots` meta and the
`review.js` script. `check-metadata.mjs` check 10 will stop the build if you forget, but do
it here rather than relying on the gate.

## The accession checklist

**Say which of these apply and which do not, and why.** A rewrite of a published sheet needs
far fewer than a new one.

### A new sheet

- **Route it.** A forced `301!` for the `.html` twin in `_redirects`, in the enumerated list.
- **Mount it.** A `<loc>` in `sitemap.xml`, extensionless.
- **Group it.** An entry in `tools/pages.mjs`, in the right drawer. `make-markdown.mjs`
  throws on a page in no group.
- **Card it.** A card on the plate in `index.html` with its number and kind, **and a card on
  every page that cards its siblings.** The plate is the authority; `check-card-order.mjs`
  checks the rest against it.
- **Stamp it.** `.qe-stamp` in a `.qe-accession-block`, carrying the real sheet number and
  mounting date. Both must be entries in the register — an invented accession number is the
  worst place on this site for a fact nobody can check.
- **Its provenance line.** `.qe-provenance` inside `<main>`, `Mounted <date>. Not yet
  corrected.` for a sheet that arrives clean.
- **Crumb it.** `.qe-crumbs` in the masthead, stopping at the drawer, never naming the page
  itself.
- **Rail it.** The empty `.qe-contents` and `.qe-rail` containers, each with `<ol></ol>` and
  `hidden`. Both are derived at runtime; without the empty `ol` they come up blank.
- **JSON-LD**, authored, with `author` (who wrote our reading) and `about.author` (who made
  the thing read) kept apart. `check-metadata.mjs` refuses the conflation.
- **A social card.** An `og_card(...)` line in `tools/make-images.py`, re-run it, and point
  `og:image` and `twitter:image` at the result.
- **Listed, if it is not a reading.** A line in `.qe-furniture` on the home page and in the
  footer row. A reading is carded; everything else is listed.

### A rewrite of a published sheet

- **The provenance line gains a correction**, linked to the register entry that made it.
- **Its `.qe-stamp` does not change.** A stamp records accession, not revision.
- **Nothing about routing, carding, grouping or the sitemap moves**, because the address did
  not.

### Both

- **Log it.** An accession in `changelog.html`, **at the top, anchored on
  `<div class="qe-register" id="latest">` — never relative to the last entry you wrote.**
  Two sessions appending on one evening once put four accessions below four older ones, each
  locally correct and the page globally wrong.
- **Move `· latest`** off the previous accession and onto the new one, in the same edit.
- **File it.** `data-sheet` on every `.qe-entry`, stated and never inferred.
- **Attribution.** Run `credit-source` over every quotation the sheet carries if it has not
  already been run. This is the site's one stated correctness requirement.

## Then the machinery

```bash
node tools/make-records.mjs && node tools/make-whats-new.mjs && node tools/make-search-index.mjs && node tools/make-markdown.mjs
```

That order is load-bearing — `check-metadata.mjs` checks them in it, and out of order a
stale record page reports as a stale `.md`, which points at the wrong tool.

```bash
node tools/check.mjs --all
```

**`--all`, not a scoped run.** A new page is the case most in need of measuring, and this one
has never been through a rendering gate. Expect about five minutes. **Do not commit until it
passes**, and read what fails rather than working around it.

## Ship it

```bash
git add -A && git commit && git push
```

Write the message in house voice: what arrived, what it argues, and anything that was got
wrong on the way and corrected. End it with the attribution line the session was given.

## Put the branch back in step

The draft page still exists on `drafts` in its pre-publication form. Make the branch's copy
identical to the published one **before** merging, so there is nothing to resolve:

```bash
git switch drafts && git checkout main -- <draft>.html && git commit -m "Published; take main's version" && git merge main -m "Bring the drafts branch up to date with main" && git push && git switch main
```

For a **new** sheet the file is now a published page sitting on the branch, which is correct
— the branch carries a full copy of the site. For a **rewrite**, the same. Either way
`tools/draft.mjs` will report no draft in progress, because the marker is gone.

A conflict in this merge will be in `_headers`: **keep both sides** — main's changes and the
branch-only noindex block.

## Verify at the edge

```bash
curl -sI https://queering.earth/<slug> | grep -iE "^HTTP|x-robots-tag"
curl -sI https://queering.earth/<slug>.html | grep -iE "^HTTP|location"
```

The first must be `200` with **no** `x-robots-tag` — its presence would mean the branch
header reached production and the whole site has dropped out of every index. The second must
be a single `301` to the extensionless address.

```bash
node tools/check-addresses.mjs --live
```

Run it after any `_redirects` change: a redirect loop is how that file fails, and a loop is
invisible offline.
