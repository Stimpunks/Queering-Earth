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

- Every page is a **self-contained HTML file** at the repo root. `index.html` is the landing
  page.
- **Addresses are extensionless**: `on-being-ill.html` on disk is `/on-being-ill` on the web.
  Write internal links, canonical tags, `og:url`, and `sitemap.xml` entries that way — a
  `<loc>` carrying `.html` fails `check-sitemap`. The filename and the address deliberately
  do not match; see `DECISIONS.md` for why.
- Two shared assets, included by relative URL:
  - **`queering.css`** — the **canonical palette tokens** (`--qe-*`, the single source of
    truth for every recurring colour), the type stack, the shared layout, the botanical
    art styles, and the print sheet.
  - **`queering.js`** — the view controls (plain view, and the ground) and the
    contents list. **It may derive navigation from the DOM; it may never create
    words.** That boundary replaced "the two view controls, and nothing else" on
    2026-09-09: a count of features is a rule that gets quietly broken the first
    time a third thing is worth having, and the prohibition that matters — nothing
    here puts content on a page — is stronger stated as a boundary.
- Local render checks: `node tools/serve.mjs 8766`, or the Browser pane via
  `.claude/launch.json`. `serve.mjs` roots itself at the repo, not at `process.cwd()`, so it
  is correct from any directory.

## Rules — do not break these

### The palette lives in `queering.css`, and pages alias it

A page that wants a colour uses a `--qe-*` token. It does not write a hex. This is not
tidiness: Star Stuff shipped 44 of 46 pages that **printed blank** because they hardcoded
colours the print sheet could not reach. `tools/check-contrast.mjs` measures both media.

**Contrast target is 7:1, not 4.5:1** — the [Stimpunks house style guide](https://stimpunks.org/fieldguide/editorial/style-guide/)
asks for it. Every text token in `queering.css` clears it against the ground; the three
that are text (`--qe-ink` 14.3:1, `--qe-moss` 7.8:1, `--qe-rust` 7.0:1 in daylight; 12.8:1,
7.2:1, 7.3:1 in the cabinet) are chosen for it. The decorative tokens — lichen, verdigris,
marigold, coral, violet — **are not for text**, in either ground.

**`check-contrast.mjs` gates at the house 7:1** (4.5:1 for large text) as of 2026-09-09, in
two tiers reported apart: under WCAG AA is `FAIL`, between AA and 7:1 is `UNDER`, and both
exit non-zero. `--aa` drops to AA only and says loudly that it did — use it to put an
argument for a specific colour on the record, not to get a run to go green.

**What it still cannot see, so measure these by hand.** A `::marker` is not an element with
its own text, which is how the register's entry bullets sat at 2.15:1 unreported — the rule
that catches them is editorial: **the colour goes on the rule and never on the glyph**. And a
**texture**, because the tool composites computed colour pairs; see the patina rule below. A
pass is not permission for either.

### A new panel picks one of three surfaces

Fifteen components once shared `--qe-card` + a 1px `--qe-rule` box + a 2px radius, so a
specimen, our own commentary and a housekeeping note were the same object to the eye. A
reader could only rank them by reading the label — a **visual hierarchy** defect, not a
matter of taste. Pick the surface that says what the panel is:

| tier | treatment | for |
|---|---|---|
| **bare** | space only, no fill, no box | our own commentary — the default |
| **ruled** | `--qe-card` inside a `--qe-rule` box | an object mounted here |
| **ruled off** | hairlines above and below, no fill | the ledger's own housekeeping |

**The third tier is rules and not a tint**, and that is a measurement — see the note above.
Dashed hairlines mean provisional (`.qe-untidy`).

### Space is a scale, and the deviations are the point

One line of body text is `1.19rem × 1.65 = 1.96rem`; `--qe-space-1` … `--qe-space-8` are
quarter-lines of it. **Asymmetry only reads as asymmetry against a norm** — this sheet once
carried twenty-five unrelated margin values, which flattens the deviations that *are*
authored. The scale governs the space **between** blocks; inside a block the hand is
allowed. Corners come from `--qe-corner-a/-b/-c` (and `--qe-corner-chip`): three profiles,
none square and no two alike, spread so no two panels a reader sees together match.

### Patina is a record, and the gold goes on the mend

**Age on this site is `.qe-provenance`** — the line at the foot of every sheet saying when it
was mounted and how often it has been corrected since, each clause linked to the register
entry that did it. Inside `<main>`, unlike `.qe-elsewhere`: a sheet's own accession history is
content about that sheet. **A new sheet needs one**, alongside its card and its register
entry.

**`--qe-marigold` is the seam token.** It marks a re-determination in the register, the join
in a restored attribution (`.qe-correction`), and the provenance line of a corrected sheet;
`--qe-lichen` carries the routine event of mounting. Kintsugi is not that the crack shows —
it is that the most precious material is spent on the break. **A seam requires an actual
repair in the register.** A gold join on a sheet nobody corrected is decoration asserting a
fact, which is the same failure as an image of text, and it makes the real mends unfindable.

**TEXTURE NEVER GOES UNDER TEXT.** A noise tile or a `blur()`/`contrast()` filter varies
effective background luminance per pixel; `check-contrast.mjs` composites computed colour
pairs and cannot see it at all, so grain under body text passes every guard here and fails
real readers. Foxing goes on the ground, the tape, the sprigs and the rules. The wash is four
gradients at token alpha, `position: absolute` so it scrolls with the paper, seeded per page
with `--qe-fox-a` … `--qe-fox-d` in the markup — a stain is a fact about one sheet.

### The ground is paper, and its other state is the cabinet

Star Stuff is a night sky. This is a herbarium sheet in daylight: warm vellum, dark ink line
art, saturated jewel accents, specimens arranged like a Victorian plate. Green is the ground
note — moss and lichen and oxidized copper, not a logo green. **"The same site in green" is
the failure mode.** If a change makes this page look like Star Stuff with the hue rotated,
it is wrong.

**Dark mode is `--qe-cab-*`, and it is the drawer shut, not the lamp switched off** — dark
warm brown, the dark-ground Victorian plate. **Not dark green**: green ground shares its hue
with moss, lichen and verdigris and measures worse for every accent. Values live once in
`:root`; the two `@media screen` switch rules carry only aliases. Three rules that are easy
to get wrong:

- **The gating surface is the lightest thing text sits on, and inverting flips which that
  is.** In daylight a card is lighter than the page. In the cabinet the cards are
  **recessed** so the page stays the worst case — lift one and rust has to go pale pink to
  clear 7:1.
- **Decoration stays saturated.** 7:1 is a rule for letters; lifting the decorative five to
  it turns every flower chalky.
- **Paper is daylight always.** Both switches are `@media screen`. Anything that is a
  daylight object by nature — the print sheet, the social cards — must not reach the cabinet
  palette.

### Plain view is a stylesheet. There is never a second document

The type on this site plays: it leans, it deviates, it refuses to sit on the line. That is
the argument, and it lives **entirely in CSS**, layered over ordinary semantic HTML.

- **Never an image of text.** Never a decorative copy and an accessible copy.
- Everything decorative switches off under `html.plain` — the wonk, the rotation, the
  display faces, the paper wash, the motion.
- Every page gets both toggles, and the inline `<head>` snippet that applies **both**
  stored preferences **before first paint**. Deferring either to `queering.js` flashes the
  wrong page: the decorated one at the reader who turned it off, or the daylight sheet at
  the reader who asked for the cabinet.
- **Two copies of the same words drift, and the accessible one is always the copy that
  rots.** That is the whole reason for this rule.

### Motion is growth, and it is gated

Botanical art draws itself on — stems first, then leaves and wings unfurling. All of it sits
inside `@media (prefers-reduced-motion: no-preference)`, so the reduced state is the
**finished drawing**, never a missing one. Never put an `opacity: 0` outside that query.

One trap, already paid for: **a CSS `transform` animation overrides an SVG `transform`
attribute on the same element.** Positioning goes on an outer `<g>`, the animation on an
inner `<g class="sprout">`. Getting this wrong collapses every sprout onto the origin.

### Icons and social cards are generated, not hand-made

`favicon.ico`, `apple-touch-icon.png` and every `images/og-*.png` come out of
**`tools/make-images.py`** — the one Python tool here, because it has to rasterise and
nothing may need `npm install`. It reads the `--qe-*` values straight out of `queering.css`,
so the cards cannot drift from the palette. **The lookup is anchored to the `:root` block on
purpose**: a social card is a herbarium sheet, not the drawer it is filed in, and an
unanchored search would return whichever palette appeared first in the file.

**A new sheet needs a new card.** Add an `og_card(...)` line, re-run `python3 tools/make-images.py`,
and point the page's `og:image` and `twitter:image` at it. A sheet that ships without one
falls back to nothing and shares as a bare link.

`favicon.svg` is hand-written and carries the same mark. Two traps, both already paid for:

- **SVG is XML, and XML forbids a doubled hyphen inside a comment.** The first draft of
  `favicon.svg` named the palette tokens with their CSS prefixes in a comment, which made the
  file fail to parse *entirely* — it looked perfectly fine, served with the right content
  type, and decoded as nothing. Test it (`xml.dom.minidom.parse`) rather than reading it.
- **A favicon is judged at 16px, not at 64.** Two earlier marks looked good large and died
  small: a tilted leaf reads as a diagonal stroke, and anything filled in `--qe-lichen` has too
  little contrast on `--qe-paper` to be a shape at all. Render candidates at 16 and compare.

### A new sheet needs a register entry, too

`changelog.html` is the site's **accession register** — the public log of every sheet as it was
mounted, every plate that came off again, and every label we corrected. **Mount it, card it,
log it.** A sheet that lands without an entry is the same omission as one that lands without a
social card, and it is the omission that matters more: this site publishes an attribution
ledger, and a correction nobody can read is a correction that only exists for us.

A sheet also needs its **`.qe-provenance` line**, and a correction logged here needs that line
updated — the count on the sheet and the entries on this page are two views of one fact, and
the sheet is the copy that will drift. All seven sheets carry `--mended` today, because all
seven have been corrected; the unmended state is real and is waiting for Sheet No. 8.

Four kinds of entry, each with one accent token spent on a rule and **never on the letters** —
`Mounted`, `Re-determined`, `Label corrected`, `Cabinet`. Group by accession, not by commit: a
sheet, its corrections, and the CSS it needed are one dated entry. See `DECISIONS.md` for why
it is a register rather than a list of releases.

### A long page gets contents, and the list is derived while the addresses are authored

`.qe-contents` — **On this sheet**, the within-page twin of `.qe-elsewhere`. A page opts in
by including the empty `<nav>`; `queering.js` fills it from that page's own `<h2>`s.

- **Never type the list.** A hand-kept contents list is a second copy of every heading, and
  the copy that rots. Deriving it also means the served HTML carries no list, so the mirror
  never indexes a heading twice — which is why this may sit inside `<main>` where
  `.qe-elsewhere` may not: that rule stops *one* sheet's nav being indexed as *another*
  sheet's content, and a self-referential list cannot do that.
- **Authored ids, derived labels.** Each `<h2>` carries a short *topical* id written in the
  markup — `#eden`, `#the-colon`, `#wabi-sabi` — **not a slug of its own title.** A slug dies
  when anybody rewords the heading, and every link a reader shared dies with it. The
  permanent thing is authored; the label is computed; nothing is written twice.
- **Nonsticky, in the body, straight after the lede.** NN/g couples rail↔sticky; the body is
  right here because the margins either side of the measure are the negative space the
  spacing work cleared, and sticky eats viewport height at 400% zoom (WCAG 1.4.10).
- **No scroll-spy, no accordion.** Open at first paint, always. `:target` marks where a
  reader *landed*, which is the case a shared link creates, and costs no motion.
- **The section mark is always visible, never hover-gated** — hover hands the feature to
  mice and to nobody else. The `§` is drawn with an empty alt string (the chain-arrow
  device) and named by a `.qe-sr` span, so it announces as "Link to this section". **The
  real space before the `<a>` in the markup is load-bearing**: without it the heading's
  accessible name computes as "…the windsLink to this section", because CSS margin is not
  whitespace.
- **Three headings must not land in the list and no guard catches any of them:**
  `.qe-elsewhere h2` (outside `<main>` — scoping the query to main is what excludes it),
  `.qe-contents`' own heading, and any `<h2>` with no id.
- **Not on `/changelog`**, which looks like the strongest case and is not. A register's
  accession headline is a sentence by design, so its labels average 148 characters against
  22–34 on a sheet: the block measured 1,293px against 319–510px elsewhere and delayed the
  first entry by three and a half screens. Truncating a label is this site's characteristic
  failure applied to itself, and a short second label is the drift. The register keeps its
  section marks and its addresses. An index **by sheet** is what it actually wants, and that
  is logged open rather than approximated with this component.

### Every page needs exactly one `<main>`, and the sitemap is the manifest

Both are load-bearing for the **SKS site mirror**, which takes page content from the
`<main>` landmark **and nowhere else** and skips any page without one — deliberately, because
the alternative is nav furniture indexed as content. It reads the page list from
`sitemap.xml`. `tools/check-markup.mjs` and `tools/check-sitemap.mjs` enforce both.

**Navigation belongs outside `<main>`.** The sibling nav at the foot of each sheet
(`.qe-elsewhere`) sits after `</main>` for exactly this reason — inside it, one sheet's
navigation is indexed as another sheet's content. No guard can catch that: the markup is valid
and the landmark is correct.

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
node tools/check-contrast.mjs   # 7:1 in BOTH grounds and under print emulation, two tiers
```

Star Stuff has five more (`check-classes`, `check-overlap`, `check-sheets`, `check-embeds`,
`check-card-order`). **Port one when the failure it catches becomes possible here** — not
before. A check that cannot fail is a check nobody reads.

And **make a new gate fail before believing it.** The 7:1 tier was proved by putting the
recessed `--qe-paper-deep` panel back and confirming it reported 6.90:1 and 6.21:1 as `UNDER`,
by injecting a 2.15:1 colour and confirming that reported as `FAIL` on the other tier, and by
checking both exit codes — then reverting. A guard nobody has watched fail is a guard nobody
should trust.

## House voice

Everything public-facing follows the **Stimpunks Editorial Voice**
(`editorial-voice.md` in the Stimpunks Knowledge System). Hard rules: capitalize
**Autistic** and **Disabled**, use **identity-first language**, em-dashes with spaces on
both sides, Oxford comma always, body text 18–20px, line spacing ≥1.5, contrast 7:1.
Preserve original capitalization and wording inside quotations, even where it differs from
house style.
