---
name: sks-search
description: Search the Stimpunks Knowledge System (SKS) — our own published pages, Helen Edgar's sites, Ryan's Readwise highlights, extracted PDFs, notes and bookmarks — from Queering Earth. Use when the question is "where have we said X", "what do we hold on X", "has Helen written about X", "is the primary source already on disk", or when checking whether a reading, a quotation, or an attribution already exists in the library. Finding only; never a citation.
allowed-tools: Bash(tools/sks-search.sh:*), Grep, Glob, Read
---

# sks-search

Queering Earth is one repo. **SKS is the library behind it** — a separate project at
`~/Documents/Claude/Projects/Stimpunks Knowledge System` holding ~19,900 indexed files
under [qmd](https://github.com/tobi/qmd), a local hybrid search engine (BM25 + vectors +
reranker, all on-device — no network, no API key).

Invoke it through the wrapper, from anywhere in this repo:

```bash
tools/sks-search.sh search "exact phrase" -n 12        # BM25, fastest
tools/sks-search.sh query "an idea, described loosely" # hybrid + rerank
tools/sks-search.sh search "term" -c highlights -n 10  # one collection
tools/sks-search.sh get '#4a68ee'                      # full source, by docid
tools/sks-search.sh status                             # index health + freshness
```

The wrapper exists because qmd's index is project-local with no `--root` flag, and run
from the wrong directory it prints `No results found.` and **exits 0**. A silent empty
result is worse than a crash: the caller concludes the library holds nothing and moves on.
See the header comment in `tools/sks-search.sh`.

## The one rule: this is a finding tool, not a source

**A qmd hit is a pointer, not a citation.** SKS says so in its own `CLAUDE.md`, Star Stuff
says so in its copy of this skill, and this site inherits it unchanged.

- **Find with SKS.** Where did we say this, what do we hold on it, who has written about
  it, is the primary already on disk.
- **Verify elsewhere.** The book, paper, essay, poem, or talk. A hit here is never the
  authority for a quotation or an attribution — **least of all when the hit is our own
  prior wording**, which is how an error gets confirmed instead of caught.

**This site is more exposed to that failure than Star Stuff is, not less.** Reading Woolf
or Le Guin or Walker through a queering lens means quoting people constantly, and a site
built on interpretation has no experiment to fall back on when a quotation drifts. Star
Stuff's worked example is the standing warning: Kevin Kelly's altered rendering of Brian
Eno's *scenius* reached our glossary, spread to five files, and nearly reached a zine.
Every one of those five would have "confirmed" the wrong wording. The book settled it.

## Collections

Counts as of 2026-09-07 (`tools/sks-search.sh status` has the live numbers).

| Collection | Files | What it is | Use it for |
|---|---|---|---|
| `site` | ~2,040 | stimpunks.org, starstuff.earth, cavendish.app **and Helen's two sites**, mirrored as Markdown | what we've published; prior art; Helen's own framing and whom *she* credits |
| `highlights` | ~1,460 | Ryan's Readwise export | **check here before hunting a book on the web** — the primary may already be on disk |
| `library` | ~450 | extracted text from the PDFs and epubs in SKS `raw/` | long-form sources we already hold |
| `notes` | ~10,980 | Ryan's live Ulysses workspace | drafts and thinking-in-progress; churns daily |
| `raindrop` | ~4,230 | fetched page text from bookmarks; coverage partial by design | leads to chase, nothing more |
| `wiki` | ~620 | AI-written index over `raw/`, including concept pages | orientation only — **concept pages are never citable** |
| `projects` | ~117 | Markdown mirrored from our own project repos | our own unpublished project writing |

## Four traps, all of them silent

1. **`get`/`multi-get` resolve on basename and can return a different file.** Asking for
   `site/stimpunks.org/glossary/tendril-theory.md` returns `wiki/concepts/tendril-theory.md`
   — AI-written synthesis, the one page type we may never cite. Reproduced on qmd 2.5.3; the
   wrapper warns, it cannot prevent. **Address hits by the `#docid` from the search result,
   and check the header of what you opened.**
2. **`qmd://` URIs are slugified, not filesystem paths** (`stimpunks.org` → `stimpunks-org`,
   spaces → `-`). `--full-path` is ignored on `search`/`query` in 2.5.3 whatever the bundled
   qmd skill says. Use `Grep`/`Glob` against the real directory when you need the actual file.
3. **The index goes stale, and staleness looks like absence.** It reflects the last
   `qmd update && qmd embed`, not the disk — `notes` churns daily, `highlights` and
   `raindrop` lag. Run `status` before concluding nothing exists, and fall back to `Grep`.
   **An empty result is not evidence.**
4. **Snippets are leads.** Fetch the full source with `get '#docid'` before quoting or
   drawing a conclusion. Don't reason from the search excerpt.

## Citing, when a hit does lead somewhere citable

- A `site/` hit cites the canonical `url:` in its frontmatter, not the mirrored path.
  Attribute Helen Edgar's two domains to **her**, never to us.
- A `library/` hit is *derived extracted text* — cite the real source in its `source:`
  frontmatter, never a `.qmd/` path.
- A `wiki/concepts/` hit is never cited at all.
- A `highlights/` hit points at a book or article — cite **that**, and confirm the wording
  against the work itself, since a highlight is a transcription.

## Writing back

**Don't.** SKS is a separate repo with its own conventions and its own `CLAUDE.md`. Read
from it; never edit it from a Queering Earth session. When something here turns up an error
living in an SKS file or on stimpunks.org, record the paths in this repo's `DECISIONS.md`
as an open item and leave the fix to a session in that repo.
