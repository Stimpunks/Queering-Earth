---
name: credit-source
description: Attribute a concept, phrase, quotation, or coinage to its true originator across this repo. Use when Ryan or Helen says "credit X for Y", "add an attribution", "who coined this", "who said this", "audit attributions", or when a page is about to quote somebody. Finds every occurrence, verifies the real source against the primary, adds a house-style citation, and logs it in ATTRIBUTIONS.md.
---

# credit-source

**Attribution is a correctness requirement on this site, not a courtesy.** Queering Earth
re-reads other people's work — art, literature, poetry, politics, people, history — so
almost every page will carry somebody else's words. A site built on interpretation has no
experiment to fall back on when a quotation drifts. The citation *is* the evidence.

## Steps

0. **Search the library first** (see the `sks-search` skill). Two questions, one command each:
   ```bash
   tools/sks-search.sh search "the phrase" -c highlights -n 10   # is the primary already on disk?
   tools/sks-search.sh search "the phrase" -c site,notes -n 12   # what have we already published?
   ```
   The first can save an afternoon — Ryan's Readwise export holds ~1,460 sources, and the
   book you are about to hunt on the web may already be there. The second tells you **which
   wording we have been repeating**, which is the thing you are actually auditing. It is a
   finding step: nothing it returns is a citation, and our own prior wording least of all.

1. **Find every occurrence in this repo.** `grep -rni` the phrase across every `.html` and
   `.md` file, not just the page you were pointed at. A quotation that is wrong in one place
   is usually wrong in three.

2. **Verify against the primary.** The book, the paper, the essay, the poem — on the web or
   on disk. Fetch the actual page and read the sentence in context.
   **A secondary source that says it is quoting is still a secondary source.** Kevin Kelly
   introduced Brian Eno's *scenius* definition with "His actual definition is:" and then
   altered three words; that rendering is now the one in circulation, including on
   stimpunks.org.
   When auditing a person — Helen Edgar especially — read their own writing
   (morerealms.com, autisticrealms.com) to see whom *they* credit.

3. **Watch for the paraphrase-as-quotation.** This site's characteristic failure is not
   inventing a source, it is *tightening* one. A definition trimmed to fit a masthead, an
   object generalized from "neuronormativity and heteronormativity" to "all forms of
   normativity" — the attribution stays attached and the words stop being theirs.
   **If we changed the words, they are ours.** Say so on the page: credit the concept, quote
   the original exactly, or write our own line. Never a fourth thing.

4. **Add the attribution in house style** at each occurrence — inline credit plus a full
   citation with a working link. Where a circulating version differs from the primary, say
   so on the page rather than silently preferring the right one.

5. **Audit the propagation.** Search **fragments, not whole sentences**: drift produces
   hybrids that an exact-phrase search misses. Sweep this repo and SKS both:
   ```bash
   grep -rni "distinctive fragment" --include="*.html" --include="*.md" .
   tools/sks-search.sh search '"distinctive fragment"' -n 20
   ```
   Fix what lives here. For anything in SKS or on stimpunks.org, record the paths in
   `DECISIONS.md` as an open item and leave the fix to a session in that repo — **never edit
   SKS from here.**

6. **Log it in `ATTRIBUTIONS.md`** — the ledger of quotation → source → verification date.

## Principle

Over-crediting others and under-claiming for ourselves is the safe direction. When unsure
about a coinage, verify rather than let a plausible attribution stand. Fix the attribution
*everywhere* it appears, not only where it was flagged.

**Our own library is where a misquotation hides best.** Five internal copies of a wrong
quote feel like five confirmations, and searching the garden keeps returning them. Use SKS
to find how far something has spread; go to the primary to find out whether it is right.
