---
name: save-draft
description: Commit and push the draft in progress so the review URL updates, without touching the published site. Use when Ryan says "save the draft", "push the draft", "update the draft", "send that to Helen again", or has finished a round of edits on a draft. Also covers throwing a draft away.
---

# save-draft

Commits whatever is on the `drafts` branch and pushes it, so the address Helen has
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

   Already on `drafts` with the draft's own changes uncommitted: that is the normal case,
   carry on.

3. **Check the markup, and then whatever else is cheap and applies.**

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

4. **Commit and push.** Ask Ryan for a message if the change is not obvious from the diff;
   otherwise say what moved.

   ```bash
   git add -A && git commit -m "Draft: <what changed>" && git push
   ```

5. **Confirm and hand back the URL.**

   ```bash
   node tools/draft.mjs
   ```

   Say plainly that Helen's link is unchanged and will show the new version shortly. **Her
   notes survive** — they are keyed to the page's address in her own browser, not to the
   version — and any note whose paragraph you rewrote will re-attach and say *the text here
   has changed since this note was written*. Nothing is lost, but tell Ryan, because she may
   have been commenting on the sentence he just deleted.

6. **Return to main** unless the next thing is more drafting:

   ```bash
   git switch main
   ```

## Throwing a draft away

A draft that is not going to be published should be deleted rather than left on the branch,
where `tools/draft.mjs` will keep reporting it as in progress.

```bash
git switch drafts && git rm <draft>.html && git commit -m "Abandon the draft of <title>" && git push && git switch main
```

**`review-practice.html` is not a draft and must not be deleted this way.** It is the page a
reviewer learns the tool on; `tools/draft.mjs` declares it as an exception with its reason.

## What this never does

It does not touch `main`, does not regenerate anything, does not run the full sweep, and does
not add a register entry. A draft has not been accessioned, so there is nothing to record
yet. All of that is `publish-draft`.
