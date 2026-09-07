# CLAUDE.md — Queering Earth

Guidance for Claude Code working in this repository.

## What this project is

**Queering Earth** (queering.earth, not yet live) reads the world through a queering lens —
art, literature, poetry, politics, people, and history — and asks what else any of it could
have been. It is a collaboration between the **Stimpunks Foundation** and **More Realms**
(https://morerealms.com/), Helen Edgar's site.

**Tagline: *Post-normal possibilities*** — Helen Edgar's phrase, on the masthead. Provisional;
see `DECISIONS.md`.

It is the sibling of **Star Stuff** (https://starstuff.earth/), and the two divide the shelf
on purpose:

| | Star Stuff | Queering Earth |
|---|---|---|
| built on | science | the humanities, myth, and the canon |
| method | evidence, fact-checked to the primary | interpretation, cited to the primary |
| the look | night sky — void, purple, cyan, starfield | daylight herbarium — vellum, ink, moss, rust |
| the risk | a wrong fact | a wrong attribution |

**"There are no hard facts here for everything" is the design brief, not a lowered bar.**
Room left open for the reader is the product. It does not extend to quotations, which are
held to the same standard as anything on Star Stuff, and arguably a stricter one — see
`ATTRIBUTIONS.md`.

## Source of truth & deployment

- **This git repo IS the source of truth.** Cloned at `~/Documents/GitHub/Queering-Earth`.
- Pushing to `main` deploys via **Netlify** — project `queering-earth` on the Stimpunks
  team, serving **https://queering.earth/**. Static files, **no build step**, no publish
  subdirectory: the repo root is the site. The `.netlify.app` hostname 301s to the custom
  domain via `_redirects`; cite the custom domain, never the Netlify one.
- **Pull requests get their own preview URL.** That is the review path for anyone editing
  through the GitHub web editor rather than a Claude session — the real page at a real
  address before it reaches `main`.
- **`queering.earth` went live 2026-09-07.** Both things that were waiting on it are done:
  the host redirect in `_redirects` is enabled, and the domain is in the SKS site mirror's
  `SITES` map, so `sync-site --all` mirrors this site into `site/queering.earth/`.
- **After editing files, always finish by giving the user the git commands** to ship:

  ```bash
  git add <files>
  git commit -m "<message>"
  git push
  ```

## Architecture

- Every page is a **self-contained HTML file** at the repo root, reachable at its own path.
  `index.html` is the landing page.
- Two shared assets, included by relative URL:
  - **`queering.css`** — the **canonical palette tokens** (`--qe-*`, the single source of
    truth for every recurring colour), the type stack, the shared layout, the botanical
    art styles, and the print sheet.
  - **`queering.js`** — the plain-view control, and nothing else.
- Local render checks: `node tools/serve.mjs 8766`, or the Browser pane via
  `.claude/launch.json`. `serve.mjs` roots itself at the repo, not at `process.cwd()`, so it
  is correct from any directory.

## Rules — do not break these

### The palette lives in `queering.css`, and pages alias it

A page that wants a colour uses a `--qe-*` token. It does not write a hex. This is not
tidiness: Star Stuff shipped 44 of 46 pages that **printed blank** because they hardcoded
colours the print sheet could not reach. `tools/check-contrast.mjs` measures both media.

**Contrast target is 7:1, not 4.5:1** — the [Stimpunks house style guide](https://stimpunks.org/fieldguide/editorial/style-guide/)
asks for it. Every text token in `queering.css` clears it against `--qe-paper`; the three
that are text (`--qe-ink` 14.3:1, `--qe-moss` 7.8:1, `--qe-rust` 7.0:1) are chosen for it.
The decorative tokens — lichen, verdigris, marigold, coral, violet — **are not for text.**

### The ground is paper. Keep the two sites unmistakable

Star Stuff is a night sky. This is a herbarium sheet in daylight: warm vellum, dark ink line
art, saturated jewel accents, specimens arranged like a Victorian plate. Green is the ground
note — moss and lichen and oxidized copper, not a logo green. **"The same site in green" is
the failure mode.** If a change makes this page look like Star Stuff with the hue rotated,
it is wrong.

### Plain view is a stylesheet. There is never a second document

The type on this site plays: it leans, it deviates, it refuses to sit on the line. That is
the argument, and it lives **entirely in CSS**, layered over ordinary semantic HTML.

- **Never an image of text.** Never a decorative copy and an accessible copy.
- Everything decorative switches off under `html.plain` — the wonk, the rotation, the
  display faces, the paper wash, the motion.
- Every page gets the toggle, and the inline `<head>` snippet that applies the stored
  preference **before first paint**. Deferring it to `queering.js` flashes the decorated
  page at the reader who turned it off.
- **Two copies of the same words drift, and the accessible one is always the copy that
  rots.** That is the whole reason for this rule.

### Motion is growth, and it is gated

Botanical art draws itself on — stems first, then leaves and wings unfurling. All of it sits
inside `@media (prefers-reduced-motion: no-preference)`, so the reduced state is the
**finished drawing**, never a missing one. Never put an `opacity: 0` outside that query.

One trap, already paid for: **a CSS `transform` animation overrides an SVG `transform`
attribute on the same element.** Positioning goes on an outer `<g>`, the animation on an
inner `<g class="sprout">`. Getting this wrong collapses every sprout onto the origin.

### Every page needs exactly one `<main>`, and the sitemap is the manifest

Both are load-bearing for the **SKS site mirror**, which takes page content from the
`<main>` landmark **and nowhere else** and skips any page without one — deliberately, because
the alternative is nav furniture indexed as content. It reads the page list from
`sitemap.xml`. `tools/check-markup.mjs` and `tools/check-sitemap.mjs` enforce both.

If a page ever renders content client-side, the mirror will need a published extraction
index the way starstuff.earth publishes `search-index.json`. Prefer server-rendered content.

### Attribution is a correctness requirement

See `ATTRIBUTIONS.md` and the `credit-source` skill. The characteristic failure here is not
an invented source — it is a *tightened* one: a definition trimmed to fit a masthead, an
object quietly generalized, the attribution left attached. **If we changed the words, they
are ours.** Credit the concept, quote the original exactly, or write our own line.

### SKS is read-only from here

`tools/sks-search.sh` and the `sks-search` skill search the Stimpunks Knowledge System.
**A hit is a pointer, never a citation.** Never edit SKS from a session in this repo; record
anything that needs fixing there in `DECISIONS.md` instead.

## The checks

Run before shipping. All three are browser-free or Chrome-only; nothing needs `npm install`.

```bash
node tools/check-markup.mjs     # parser-rewriting markup, duplicate ids, exactly one <main>
node tools/check-sitemap.mjs    # every page listed once, every entry resolves
node tools/check-contrast.mjs   # WCAG contrast on screen AND under print emulation
```

Star Stuff has five more (`check-classes`, `check-overlap`, `check-sheets`, `check-embeds`,
`check-card-order`). **Port one when the failure it catches becomes possible here** — not
before. A check that cannot fail is a check nobody reads.

## House voice

Everything public-facing follows the **Stimpunks Editorial Voice**
(`editorial-voice.md` in the Stimpunks Knowledge System). Hard rules: capitalize
**Autistic** and **Disabled**, use **identity-first language**, em-dashes with spaces on
both sides, Oxford comma always, body text 18–20px, line spacing ≥1.5, contrast 7:1.
Preserve original capitalization and wording inside quotations, even where it differs from
house style.
