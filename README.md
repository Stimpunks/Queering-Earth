# Queering Earth

Reading the world through a queering lens — art, literature, poetry, politics, people, and
history — and asking what else any of it could have been.

A collaboration between the [Stimpunks Foundation](https://stimpunks.org/) and
[More Realms](https://morerealms.com/). Sibling site to [Star Stuff](https://starstuff.earth/).

**Live at [queering.earth](https://queering.earth/).** Pushing to `main` deploys; pull
requests get their own preview URL.

## Running it locally

No build step, no dependencies. Static HTML served as-is by Netlify.

```bash
node tools/serve.mjs 8766
```

## Checks

```bash
node tools/check-markup.mjs     # markup the browser silently rewrites; exactly one <main>
node tools/check-sitemap.mjs    # every page listed once, every entry resolves
node tools/check-contrast.mjs   # WCAG contrast on screen and under print emulation (needs Chrome)
```

## Layout

| | |
|---|---|
| `index.html` | the home page; every page is a self-contained file at the repo root |
| `queering.css` | palette tokens (`--qe-*`), type, layout, botanical art, print sheet |
| `queering.js` | the plain-view control |
| `tools/` | local server, the three checks, and the SKS search bridge |
| `CLAUDE.md` | the rules |
| `DECISIONS.md` | what is settled, what is open, and why |
| `ATTRIBUTIONS.md` | the quotation ledger — source, link, verification date |

## Licence

Words and art [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
