---
name: publish-draft
description: Accession a draft — take its files from its draft branch onto main, strip the draft block, work the accession checklist, run the full sweep, push it live to queering.earth, and delete the branch. Use when Ryan or Helen says "publish the draft", "ship it", "the review is in", "mount the sheet", or "put the draft live". Handles every git step and drives the editorial ones.
---

# publish-draft

Publishing is **accession**, not a merge. The draft stops being a draft and becomes a sheet
in the cabinet, which means a number, a card, a stamp, a provenance line, a register entry
and an address — the checklist `CLAUDE.md` states as *mount it, card it, log it, file it,
stamp it, route it, crumb it, group it, rail it*. This skill runs the git and drives the rest;
**it cannot do the editorial half alone** and must not pretend to.

## Before anything

1. **Which branch?**

   ```bash
   node tools/draft.mjs && git status --short
   ```

   Each draft has its own branch, `draft/<slug>`. Uncommitted changes on it: run
   `save-draft` first, so what is published is what the reviewer read.

2. **Has the author signed off?** Ask if it has not been said. This puts words on a public
   site under two organisations' names, and on a sheet written by somebody else it is their
   call and not the publisher's.

3. **The tree must be clean before switching branches.** `git switch` carries uncommitted
   changes across, which is how edits land on the wrong branch.

## Take the files

```bash
node tools/draft.mjs scope draft/<slug>
```

It prints four things:

- **take** — this draft's page and any shared source it grew: `queering.css` for a new
  component, `ATTRIBUTIONS.md` for its ledger rows, a plate and the manifest for a new
  figure. **Taking only the page publishes a sheet whose styles do not exist**, which is
  this house's characteristic failure — 44 pages that printed blank.
- **derived** — regenerated on `main` once the sources are taken, so do not take them.
- **never** — branch furniture: `_headers`, whose noindex must never reach `main`, and
  `review-practice.html`.

```bash
git switch main && git checkout draft/<slug> -- <each take line, by name>
```

**Named one by one and never as a wildcard.** `git checkout draft/<slug> -- .` would take
`_headers` and drop the whole site out of every index.

**NEVER `git merge draft/<slug>`.** Publishing takes files. A merge carries the furniture.

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

**The branch has done its job, so delete it.** That is the whole gain of one branch per
draft: nothing has to be put back in step, because nothing is shared.

```bash
git push origin --delete draft/<slug> && git branch -D draft/<slug>
```

**DELETING THE BRANCH DOES NOT DELETE THE DEPLOY. Go and remove it in Netlify.** This skill
used to say the review URL went with the branch and that there was nothing to do in the
dashboard. Measured 2026-09-14, minutes after Sheet No. 14 was published and its branch
deleted from both ends: `draft-known-and-felt-and-seen--queering-earth.netlify.app` answered
**200**, still serving the pre-publication draft with its review layer, and a full copy of
the site beside it.

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://draft-<slug>--queering-earth.netlify.app/<slug>
```

**404 means it is gone. 200 means a superseded draft is still live at a link people have.**
It is not a crawling problem — the deploy inherited `X-Robots-Tag: noindex` from `drafts`,
which is that header earning its keep a second time — it is a *reader* problem: anybody
holding the review link reads a version that no longer exists and may annotate it. Delete
that branch deploy in the Netlify UI. **Nothing here can do it and no gate can see it**,
which puts it in the same small class as the bookmarklet: a check a person has to run.

**Then bring the base forward**, so the next draft is cut from something current:

```bash
git switch drafts && git merge main -m "Bring the drafts base up to date with main" && git push && git switch main
```

A conflict there will be in `_headers`: **keep both sides** — main's changes and the
branch-only noindex block.

**A conflict in a GENERATED file is a different thing and must not be resolved by hand** —
`search-index.json`, `/ledger`, `/whats-new`, `register.xml`, the `.md` siblings. Neither
side is the answer. Clear the marker with either, re-run the four generators and
`make-csp`, and commit what they write: **the regeneration is the resolution**. This one
matters here more than anywhere, because at publication the draft's ledger rows have just
moved to `main` and a hand-picked side can leave the two copies disagreeing about who was
credited.

### Catch the other drafts up

Publishing is the only thing that makes an in-flight draft stale, so this is the moment to
level them rather than leaving it to whoever opens one next and merges under time pressure.

```bash
node tools/draft.mjs
```

For each branch still listed, `save-draft`'s **Bringing main's changes in** is the procedure
and this skill does not repeat it. The one thing worth knowing before you start: **the
conflict will be `search-index.json`, and it is generated.** Neither side is the answer — a
draft's ledger rows live only on its branch, so taking main's copy drops that draft's credits
silently while every page still reads perfectly. Clear the marker with either side, re-run
the generators, and commit what they write. **The regeneration is the resolution.**

Check afterwards that both survived: the draft's own rows and the ones the new sheet just
put on `main`.

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
