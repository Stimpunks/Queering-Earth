---
name: start-draft
description: Put a new sheet, or a rewrite of an existing one, on the drafts branch at a real address so Helen can read and annotate it before it is published. Use when Ryan says "start a draft", "new draft", "draft a sheet on X", "I want Helen to look at this first", "rewrite /on-being-ill as a draft", or asks for a review link. Handles every git step; ends by printing the URL to send her.
---

# start-draft

**Helen reviews at a real address, and neither GitHub nor editing HTML is a route she can
use.** This skill puts a page on the `drafts` branch, where it is served by Netlify at a
permanent hostname with the annotation layer switched on. See *A draft is reviewed at a real
address* in `CLAUDE.md` for why it works this way.

**One draft at a time is the assumption.** Nothing enforces it, but `publish-draft` has to be
told which one if there are two, and there is no reason to run two.

## Steps

1. **Is there already a draft?**

   ```bash
   node tools/draft.mjs
   ```

   If it reports one, stop and ask Ryan whether to publish it, throw it away (see
   `save-draft`), or genuinely run two at once. Do not start a second silently.

2. **THE WORKING TREE MUST BE CLEAN BEFORE ANY BRANCH SWITCH.** `git switch` carries
   uncommitted changes across to the other branch when the files match, which means edits
   meant for `main` silently arrive on `drafts`. This happened during the session that built
   this workflow.

   ```bash
   git status --short
   ```

   Anything listed: commit it on `main` first, or ask Ryan. Never stash and hope.

3. **Go to the branch and bring it up to date with the published site.**

   ```bash
   git switch drafts && git merge main -m "Bring the drafts branch up to date with main"
   ```

   **Main merges INTO drafts and never the other way.** The branch carries an
   `X-Robots-Tag: noindex` in `_headers` that must never reach production — see the comment
   in that file. Publishing takes the file, not the branch.

   A conflict here will be in `_headers`: keep both sides — main's changes *and* the
   branch-only noindex block.

4. **Decide which kind of draft this is**, and say which you have concluded:

   - **A rewrite of a published sheet.** The file already exists on the branch. Edit it in
     place, at its own filename, so the draft is byte-identical to what will ship.
   - **A new sheet.** There is no template, on purpose — a skeleton page would be a second
     copy of markup every sheet already carries. **Copy the nearest existing sheet** and
     gut it: `cp on-being-ill.html <slug>.html`, then replace the title, the meta
     description, the canonical, the `og:` block, the masthead and the body. Delete the
     accession stamp, the provenance line and the JSON-LD — **those are accession, and a
     draft is not accessioned.** Keep the controls tray, the footer, and the empty
     `.qe-contents` / `.qe-rail` containers with their `<ol></ol>` and `hidden` attribute.

   **Check the slug against the repo root before choosing it.** macOS is case-insensitive, so
   a slug matching a root file — `decisions`, `attributions`, `readme` — would make
   `make-markdown.mjs` overwrite its own source. `CLAUDE.md` records this.

5. **Add the draft block**, immediately after the viewport meta:

   ```html
   <!-- DRAFT. Delete these three lines to publish. Guarded by check-metadata.mjs check 10. -->
   <meta name="robots" content="noindex, nofollow">
   <script src="drafts/review.js" defer></script>
   ```

   Relative, not root-relative, like every other asset reference here.

6. **Check the markup**, which is the one gate that matters on a draft:

   ```bash
   node tools/check-markup.mjs --check <slug>.html
   ```

   The accession gates are *supposed* to fail on a draft — the missing `301!`, the missing
   card, the missing `<loc>` are the accession checklist reported by name. Do not chase them
   now. This one is different: three generators parse this HTML with regexes and assume
   every tag closes.

7. **Commit and push.**

   ```bash
   git add <slug>.html && git commit -m "Draft: <title>" && git push
   ```

8. **Print the URL and tell Ryan it is Helen's link.** Netlify builds in about twenty
   seconds.

   ```bash
   node tools/draft.mjs
   ```

9. **Go back to main** so the next session does not start on the branch by accident:

   ```bash
   git switch main
   ```

## What a draft deliberately does not have

No accession stamp, no `.qe-provenance` line, no card on the plate, no `_redirects` rule, no
`sitemap.xml` entry, no group in `tools/pages.mjs`, no register entry, no social card, no
JSON-LD. **All of that is accession and all of it happens in `publish-draft`.** A sheet that
is still being argued about has not been accessioned, and giving it a stamp before it is
would be a gold join on a sheet nobody corrected.

**Attribution is the exception and it is not deferred.** If the draft quotes anybody, run the
`credit-source` skill while writing it, not at publication. A quotation checked at the last
minute is a quotation checked under pressure.
