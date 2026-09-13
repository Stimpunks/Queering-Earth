# Queering Earth

Reading the world through a queering lens — art, literature, poetry, politics, people, and
history — and asking what else any of it could have been.

A collaboration between the [Stimpunks Foundation](https://stimpunks.org/) and
[More Realms](https://morerealms.com/). Sibling site to [Star Stuff](https://starstuff.earth/).

**Live at [queering.earth](https://queering.earth/).** Pushing to `main` deploys; pull
requests get their own preview URL.

## New here?

Read [`ONBOARDING.md`](ONBOARDING.md) and open this folder in Claude Code. You will not need
to write HTML or type a git command.

## Running it locally

No build step, no dependencies, nothing to install.

```bash
node tools/serve.mjs 8766
```

**Use the server, never an opened file.** Addresses here are extensionless —
`on-being-ill.html` on disk is `/on-being-ill` on the web — and that mapping is something a
server does.

## Checks

One command regenerates everything derived and runs all nine gates, scoped to what moved:

```bash
node tools/check.mjs          # about 25s for a one-page edit
node tools/check.mjs --all    # the whole site, about 5 minutes
```

The nine can be run singly — markup, sitemap, contrast, addresses, metadata, cache, overlap,
card order and width. `CLAUDE.md` says what each one exists to catch, and which failure paid
for it.

## Layout

| | |
|---|---|
| `index.html` | the home page; every page is a self-contained file at the repo root |
| `queering.css` | palette tokens (`--qe-*`), type, layout, botanical art, print sheet |
| `queering.js` | the view controls, the contents list, and the drift rail |
| `tools/` | the local server, four generators, nine gates, and the SKS search bridge |
| `.claude/skills/` | drafting, publishing, attribution, and library search |
| `ONBOARDING.md` | the way in for a new collaborator |
| `CLAUDE.md` | the rules |
| `DECISIONS.md` | what is settled, what is open, and why |
| `ATTRIBUTIONS.md` | the quotation ledger — source, link, verification date |

## Drafts

Unpublished sheets live on the long-lived `drafts` branch, served at their own address with
an annotation layer switched on, so a draft can be read and commented on without an account.
Publishing takes the file onto `main`; the branch is never merged.

## Licence

Words and art [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
