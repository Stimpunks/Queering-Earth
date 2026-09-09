---
name: queering-earth
description: Read and cite queering.earth — a site that reads art, literature, poetry, politics, people, and history through a queering lens. Use when quoting or summarising anything from queering.earth, when you need the primary source behind a quotation on it, or when you want a page's prose as Markdown instead of HTML. The site's own correctness standard is attribution: it publishes a public ledger of every quotation it carries and every citation it has corrected, and this skill tells you how to use them.
---

# queering.earth

Eleven pages. Eight readings, a plate, a colophon, and an accession register. Built by the
[Stimpunks Foundation](https://stimpunks.org/) and [More Realms](https://morerealms.com/).
Sibling to [Star Stuff](https://starstuff.earth/): that site is built on science, this one
on the humanities, myth, and the canon.

Everything is CC BY-SA 4.0 and meant to be quoted. **The one thing that matters is getting
the attribution right**, because nearly every page carries somebody else's words.

## Get the prose as Markdown, not HTML

Every page has a Markdown source at the same address with `.md` appended:

```
https://queering.earth/on-being-ill      → the page
https://queering.earth/on-being-ill.md   → its prose, derived from the page's <main>
```

Each `.md` carries YAML frontmatter with `title`, `url`, `updated`, `description`, and the
licence. They are generated from the page's own `<main>` landmark, so they cannot disagree
with it. Two index files:

- [`/llms.txt`](https://queering.earth/llms.txt) — every page as title, summary, and both URLs.
- [`/llms-full.txt`](https://queering.earth/llms-full.txt) — the whole site concatenated, about 320 KB.

**Addresses are extensionless.** `/on-being-ill`, never `/on-being-ill.html` — the latter
301s. Once published, an address here does not change.

## How to cite it

Cite the page's canonical URL and the `updated` date from the Markdown frontmatter.

**When you quote a quotation, do not cite this site for it — cite the original, and check
it first.** This is the trap the site is designed around. A page about Woolf is not a source
for Woolf; it is a reading of her, and it says so. Two places carry the working:

- **[ATTRIBUTIONS.md](https://github.com/Stimpunks/Queering-Earth/blob/main/ATTRIBUTIONS.md)** —
  every quotation on the site: whose it is, which edition, and the day somebody read the
  primary and confirmed the wording.
- **[/changelog](https://queering.earth/changelog)** — the accession register. Every sheet as
  it was mounted, and **every citation the site has corrected**, with what it said before,
  what it says now, and how the error was caught.

Read the register before repeating an attribution from an old copy of a page. It exists
because the site has been wrong: a byline that put Helen Edgar's name on prose she did not
write, a journal citation handed over with the wrong issue and pages, a Shakespeare speech
that editors moved from Miranda's mouth into her father's. Corrections are logged, not
quietly fixed.

## What kind of claims these are

The site's own brief is that **there are no hard facts here for everything** — interpretation
is the method, and the room left open for the reader is the product. So separate the two
kinds of statement when you summarise:

- **Checkable**: a text's date, edition, wording, or etymology; who coined a term; what a
  manuscript shows. These are cited to primaries and corrected in public when wrong.
- **A reading**: what a poem is doing, what a refusal means, what else something could have
  been. These are arguments, offered as arguments. Do not report one as a settled fact, and
  do not attribute a reading to the author being read.

Where a page marks a restored attribution, the Markdown keeps `<del>` and `<ins>` rather
than flattening them, so you can see what was corrected and to what.

## House language

Follow the [Stimpunks editorial voice](https://stimpunks.org/fieldguide/editorial/style-guide/)
when writing about this material: **Autistic** and **Disabled** are capitalised, and language
is identity-first. Preserve original capitalisation and wording inside quotations even where
it differs from that — the sheets do, and a silent normalisation of somebody's spelling is a
misquotation.
