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

  **The extension is not an address, so each `.html` twin must 301 away.** Stating the rule
  and cleaning the manifest is not enough: Netlify shadows a redirect with a real file, so
  `/on-being-ill.html` served a byte-identical page at an address the house style says does
  not exist, for as long as the site has been up. `_redirects` carries a forced `301!` per
  page, enumerated so a missing one is reportable by name, and `check-addresses.mjs` is the
  guard — the only one here that knows what the edge answers rather than what the files say.
  **A new sheet needs a rule.** Mount it, card it, log it, file it, stamp it, **route it**,
  **crumb it**, and **group it** — `tools/pages.mjs` is the one place the page order lives, and
  `make-markdown.mjs` throws on a page in no group, which is the reminder. Everything
  the finding aid shows is derived from there and from the sheet's own landmark, so a
  grouped sheet needs nothing else to be searchable.

  **This also means the site cannot be browsed over `file://`, and that is the trade.** Star
  Stuff can be, because it writes document-relative links with the extension (`index.html`);
  every link here is root-relative and extensionless, so `href="/"` resolves to your
  filesystem root and `href="/on-being-ill"` names a file that does not exist on disk. Making
  the links relative would not fix it — nothing is named `on-being-ill`. The mapping is a
  thing a server does, which is what `tools/serve.mjs:52` exists for. **Use the dev server
  locally, never an opened file.**

  Shared assets — `queering.css`, `queering.js`, the two favicons, the touch icon — are
  included by **relative** URL so they resolve under any address; `og:image`, `twitter:image`,
  `og:url`, and `rel="canonical"` must stay **absolute**. `check-addresses.mjs` guards the
  first half. The three icons were root-relative until 2026-09-09, which is one rule applied
  two ways and the reason the guard exists.
- Two shared assets, included by relative URL:
  - **`queering.css`** — the **canonical palette tokens** (`--qe-*`, the single source of
    truth for every recurring colour), the type stack, the shared layout, the botanical
    art styles, and the print sheet.
  - **`queering.js`** — the view controls (plain view, and the ground), the
    contents list, and the drift rail. **`queering-search.js` is a third file, loaded only by `/search`**,
    because a result is a sentence from *another* page put onto this one, which is past
    the boundary below however carefully it is done — and widening the boundary to fit
    would have cost the boundary. It writes no label either: every word a searcher sees
    is authored in `search.html`, in `<template>`s after the footer, and cloned. **It may derive navigation from the DOM; it may never create
    words.** That boundary replaced "the two view controls, and nothing else" on
    2026-09-09: a count of features is a rule that gets quietly broken the first
    time a third thing is worth having, and the prohibition that matters — nothing
    here puts content on a page — is stronger stated as a boundary.
- Local render checks: `node tools/serve.mjs 8766`, or the Browser pane via
  `.claude/launch.json`. `serve.mjs` roots itself at the repo, not at `process.cwd()`, so it
  is correct from any directory. **The launch config names no port**: it sets `autoPort` and
  the server takes `PORT` from the environment, because the config used to hardcode 8766 and
  a second session could then not preview the site at all while the first held it. An
  explicit argument still wins, which is why the command above is unchanged. Nothing on the
  site cares which port it is — every asset reference is relative or root-relative, and
  `check-addresses.mjs` enforces that.

## Rules — do not break these

### The palette lives in `queering.css`, and pages alias it

A page that wants a colour uses a `--qe-*` token. It does not write a hex. This is not
tidiness: Star Stuff shipped 44 of 46 pages that **printed blank** because they hardcoded
colours the print sheet could not reach. `tools/check-contrast.mjs` measures both media.

**Contrast target is 7:1, not 4.5:1** — the [Stimpunks house style guide](https://stimpunks.org/fieldguide/editorial/style-guide/)
asks for it. Every text token in `queering.css` clears it against the ground; the three
that are text (`--qe-ink` 14.3:1, `--qe-moss` 7.8:1, `--qe-rust` 7.0:1 in daylight; 12.8:1,
7.2:1, 7.3:1 in the cabinet) are chosen for it. The decorative tokens — lichen, verdigris,
marigold, coral, violet, and the two lilacs — **are not for text**, in either ground.

**`check-contrast.mjs` gates at the house 7:1** (4.5:1 for large text) as of 2026-09-09, in
two tiers reported apart: under WCAG AA is `FAIL`, between AA and 7:1 is `UNDER`, and both
exit non-zero. `--aa` drops to AA only and says loudly that it did — use it to put an
argument for a specific colour on the record, not to get a run to go green.

**A component built at runtime is invisible to it unless `REVEAL` builds one.** `/search`
measured 193 clean elements while every colour a searcher actually reads — the chips,
the marks, the snippet, the mounted quotation — sat in the other zero. The gate's own
comment asked for this in advance: *a page that checks the 8% of itself that happens to
be visible reports zero failures and looks exactly like a clean one.* `REVEAL` now
clones the page's own result templates, so the real markup is measured under the real
stylesheet. **A new runtime component needs a line there.**

**A TARGET IS THE INTERACTIVE AREA, NOT THE INK, AND NOTHING HERE MEASURES IT.**
WCAG 2.5.5 asks 44×44 CSS px and 2.5.8 asks 24×24. The ground control shipped at
**53×25** on a 375px phone — one pixel over the floor — and no gate noticed, because
contrast is the only thing measured. Grow the hit area behind a control rather than
enlarging its ink: `.qe-controls > *::after` is an absolutely positioned box with
`min-width`/`min-height: 44px`, which leaves the design alone. **A new control needs
one, and needs measuring after** — check that no two hit areas overlap and that each
still receives its own tap.

**What it still cannot see, so measure these by hand.** A `::marker` is not an element with
its own text, which is how the register's entry bullets sat at 2.15:1 unreported — the rule
that catches them is editorial: **the colour goes on the rule and never on the glyph**. A
**texture**, because the tool composites computed colour pairs; see the patina rule below.
And a **blend mode**, which is the same limitation from a third direction: the accession
stamp's `mix-blend-mode: multiply` is the whole washed-out effect on paper and **erases the
mark in the cabinet**, because multiply darkens towards the ground and in the drawer the
ground is the dark thing. The gate reported `PASS` and exit 0 on that version — confirmed
by putting the bug back, not assumed. **A pass is not permission for any of the three.**

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

**The accession stamp is the same fact in the object's own form.** `.qe-stamp` sits in one
`.qe-accession-block` with the provenance line, above it, on all eight readings and on no
cabinet page — a stamp is for an accessioned specimen, not for the drawer. Four rules, each
already paid for:

- **The number is real or there is no stamp.** It carries the sheet number and the mounting
  date, both of them entries in the register. An invented accession number would be a gold
  join on a sheet nobody corrected, in the worst possible place for that failure.
- **The fade is on the ring and never on the glyph.** Measured before it was drawn: lichen
  is 2.15:1 on paper and verdigris 3.42:1, so no token here makes a letter faint and legal
  at any size. Letters are `--qe-moss`; the age is two ovals with a wedge lifted out of
  each, and a rotation authored per sheet. A real understamped impression reads that way
  too — the outline breaks long before the letterforms do.
- **`--qe-stamp-blend` is a token because it differs between the grounds and is not a
  colour** — the fourth time that lesson has arrived, after the wash, the shade and the
  flesh. See the contrast gate's blind spots above.
- **It stays in flow and it is not a link.** A corner-floated stamp lands on the prose, which
  is why `check-overlap.mjs` was ported the same day — and that gate now catches the refused
  design, which is how it was proved. The provenance line beside it already points at the
  accession, so a linked number is a second tab stop going nowhere new.
  It is skipped in `search-index.json` for the reason `.qe-masthead` is, and kept in the `.md`.

**A new sheet needs a stamp**, alongside its card, its provenance line and its register entry.

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
- **Decoration stays saturated.** 7:1 is a rule for letters; lifting the decorative seven to
  it turns every flower chalky. `--qe-lilac-pale` goes **darker** in the drawer, not lighter,
  because in daylight it is the recessed thing — a wash under a wing.
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

### Default to the device; let the reader say otherwise in the moment

`/the reading settings` — the **Reading** disclosure beside the two view controls —
carries **Reduce motion**, **More contrast**, **Looser lines**, **Text size** and
**Typeface**. Added 2026-09-10.

**The typeface picker offers nine faces, and none of them is loaded until it is picked.**
An `@font-face` is a declaration; the file is fetched when a rule using that family first
meets rendered text. Thirty-two faces are declared and a reader who picks none downloads
three, so the picker needed no lazy-loading machinery — the mechanism is the cascade.

**Four set both faces; five set only the display, and that split is a constraint.**
Victorianna ships Thin alone and is unreadable at reading size. Redaction Inclusive,
Insolente, Trickster and Sporting Grotesque have **no italic at all**, and this site is
built out of citations — setting one as the reading face would put a faux slant on every
`<cite>`. `sets_body` in the manifest is that fact, not a preference.

**A COMPONENT MAY MIX THE TWO TYPE ROLES; IT MAY NEVER NAME A FAMILY.** The picker works
by reassigning `--qe-display` and `--qe-body` on `html`, so a `font-family: 'Victorianna'`
written into a component is a face **none of the nine options can reach** — nine controls,
and one block ignoring every one of them. The legitimate mix is between the two roles: the
default gives Fraunces against Newsreader, the five display-only faces give the reader's
pick against Newsreader, and the four that set both collapse to one face at several sizes.
**That last row is the point rather than a shortfall** — a reader who asked for one typeface
gets one, and the setting degrades into their choice instead of overriding it. What survives
in every row is the play that was never a family: size, weight, colour, indent, lean, and
SOFT and WONK where the picked face has them.

**Exactly two things hardcode a family, and both are the same licence.**
`.qe-drift-word--flat` and `.qe-broadside .w-form` set the reader's own **system face**
because the system face *means* something — an institution's typeface is whatever the form
was printed in. **Semantic, not decorative:** "it would look fun" is not this licence, and a
third hardcoded family added for looks retires the reasoning behind the first two. Both
jokes disappear in plain view, where every face is that face, and that is correct.

**`tools/make-fonts.mjs` owns all of it** — the faces, the `@font-face` blocks, the
`html.qe-font-*` class rules, the licence files, the designer credits and the manifest,
generated from one table so the stylesheet cannot declare a family the picker does not
offer. **The option list lives in the markup on twenty pages**, so
`check-metadata.mjs` compares the two: an option with no face behind it offers a
typeface that will not load, a face with no option is weight nobody can reach, and both
are silent. **Narrowing the nine is exactly when that happens** — re-run the tool, edit
the options, and let the gate tell you if they disagree.

**CUTE is not the OFL and six of the nine are under it.** It permits use, modification
and commercial use, and says outright it is "not technically compatible with any FLOSS
license to date". It governs **fonts, not the documents they set**, so nothing here is
relicensed. Three conditions bind: credit the designers **and link the source**; ship
complete files, not lone extracted faces; and **never subset a CUTE face** — deleting
the post-binary characters or the OpenType features that activate them is forbidden, so
those six ship whole while the two house faces are cut to latin. Its donation is a
condition, met at the "for an association" tier on 2026-09-10.

**Not every setting is a yes or a no.** Text size has two steps, so its row is a native
`<select>` whose stored values are `larger` and `largest`. The class is `qe-<key>-<state>`
either way, so the stylesheet and the gate see one shape. Its first option — *your
device's size* — is worth the extra control on its own: for the checkboxes, "follow the
device" is the unstated absence of a choice, and here it is a thing the reader can see
and pick.

**Text size goes up only, and that is a house rule.** The style guide sets body text at
18–20px and the sheet is `1.19rem`. A *smaller* option would take it under that floor.
A reader who wants less turns their own browser down — which works, because
`html { font-size: 100% }` and all 129 type sizes are `rem`, so the sheet already
follows the browser's default. The steps are percentages **of that**, not replacements
for it.

**The argument for it, since it cuts against "just respect the system":** implementing
`prefers-reduced-motion` and `prefers-contrast` perfectly still only reaches readers who
know those switches exist, and most have never opened that menu. A setting chosen once,
months ago, also cannot know that today is a bad day. **Accessibility needs are dynamic.**
So the media query is the default and the panel is the override.

**The stored value is three-state, and that is the part to get right.** Absent means
*follow the device* — not *off*. Only an explicit `on`/`off` overrides, which is what lets
*Follow my device again* hand a reader back rather than freezing today's answer forever.
The class is written **only** for an override, so with nothing stored the stylesheet's own
media query decides and the no-JavaScript answer and the JavaScript answer are the same.

**Every reading setting must be additive** — more contrast, more space, less motion.
Nothing here may *lower* a ratio, because `check-contrast.mjs` measures the two grounds
and cannot see a class it was never told about. A setting that could reduce contrast needs
the gate taught about it first.

**A new key must be named on `/privacy`.** `check-metadata.mjs` finds them two ways —
literal `getItem('qe-x')` calls and the `html.qe-x-<state>` classes in the stylesheet —
where `<state>` is **any** word, not just `on`/`off`: the pattern knew only the booleans
until text size arrived, and would have let its key go undocumented one setting after the
check was written. It caught `qe-textsize` the moment it was widened.
because the reading settings build their keys from a table and appear as no literal at all.
The policy is a binding statement; a key it does not list is a key it is wrong about.

**It is a native `<details>`, and it must stay one.** A hand-built menu needs focus
trapping, a roving tabindex, `aria-expanded` kept in sync and an Escape handler, and
getting any of it wrong would make the accessibility panel the least accessible thing on
the sheet. Escape and click-away are the only additions, and both are conveniences over
something that already works.

**`forced-colors` is NOT in the panel and cannot be.** It reports an operating-system
state — the browser substituting the reader's own palette for everything we declared — and
a page can only respond to it. That is the point of it. `@media (forced-colors: active)`
repairs the places the substitution takes a boundary away: the card hover, which was a
background change and nothing else; the edges that leaned on a `box-shadow`; and focus,
which must track `Highlight` rather than our rust. The botanical art is *allowed* to be
forced — colour is not information in a drawing of a leaf.

### Motion is growth, and it is gated

Botanical art draws itself on — stems first, then leaves and wings unfurling. The reduced
state is the **finished drawing**, never a missing one.

**The gating inverted on 2026-09-10 and the rule survived the change.** It used to be that
every animation lived inside `@media (prefers-reduced-motion: no-preference)`. That cannot
express *the reader asked for motion on a device that asks to reduce it*, which the reading
settings need. So motion is now **off by default** — `--qe-draw`, `--qe-unfurl`,
`--qe-stamp-anim` are `none` and `--qe-sprout-start` is `1` in `:root` — and exactly two
things switch it on: the media query, and `html.qe-motion-on`. **The timings live once in
`--qe-anim-*`; the two blocks only map them**, so a cubic-bezier cannot drift between them.

The rule that replaced "never put an `opacity: 0` outside that query" is stronger and says
why: **the default must be the finished drawing.** A reader with no CSS variables, no
JavaScript, or a device asking for reduced motion gets a complete drawing because that is
what `:root` says, not because a query wrapped the rules. One place needs a hand: an
un-animated stem would stay hidden behind its own `stroke-dashoffset`, so the static state
puts it back to `0`.

One trap, already paid for: **a CSS `transform` animation overrides an SVG `transform`
attribute on the same element.** Positioning goes on an outer `<g>`, the animation on an
inner `<g class="sprout">`. Getting this wrong collapses every sprout onto the origin.

### One drawing is not a masthead, and it is an homage with a caption

The moth at the foot of `/#queering-is-a-verb` puts the **Earth where Nick Walker's cover
puts a brain**, in Ezra Furman's lilac and black. It is the only drawing here that is
neither a masthead nor a corner vine, and the only one with a caption. **The caption is
the point:** an uncredited homage on a site that publishes an attribution ledger is the
exact failure the ledger exists to prevent, so both debts are named on the page and in
`ATTRIBUTIONS.md`. It wears `.qe-botanical` as well as `.qe-moth`, so the growth motion is
inherited rather than restated — a second copy is a second thing to keep in step with
`prefers-reduced-motion`.

Four rules, each paid for by drawing it wrong first:

- **THE COASTLINES ARE PROJECTED, NOT DRAWN.** Three passes of hand-drawn continents came
  out as symmetrical blobs either side of a central meridian — a Rorschach card, which is
  to say **a brain**, which is the one thing the middle of this drawing must not read as.
  They are coarse lat/lon outlines through an orthographic projection centred on 25° W,
  12° N, far-side points pushed onto the limb rather than folded back across the disc.
  **Africa has to be unmistakable at a 40px radius**, because that is the size it ships at.
- **It has no tails.** Four tries: straight down they read as legs, swept out as a bracket,
  curled in as a moustache, merged into the hindwing path as a boot. A broad fanned
  hindwing and a feathered antenna are what say *moth*; the cover's tails say *swallowtail*,
  which we are not. The caption carries that reference so the drawing need not fake it.
- **Bands run across the wing, never along the outer margin.** A band chasing the outside of
  the outline sits off the wing entirely and paints onto the paper — invisible in review,
  because lilac on vellum at four pixels looks like nothing at all.
- **A screenshot taken too early photographs an animation that has not happened.** Every
  wing is inside a `.sprout`, so the first four review shots showed a moth with no wings.
  Anything capturing a drawing here waits out `0.55s + i × 0.075s` plus the unfurl.

**The second lilac drawing is the plant itself** — *Syringa vulgaris* from Ryan's yard,
above the footer on the home page, with Eliot's four lines mounted over it and the credit
for *Lilac Wine* under it. Four rules, again paid for by drawing it wrong:

- **The vase habit is the read.** Many slender stems from one clump, bare for the lower
  third, fanning into a dome half again as tall as they are. Two drafts inverted that
  proportion and produced a hand fan.
- **Even coverage needs a stratified grid.** Rings leave the middle hollow and read as a
  wreath; uniform random sampling clumps into two lobes with a hole between them, which
  is what forty random points look like. **Do not reach for random when you mean even.**
- **A panicle is a mass, not a chain.** Eleven big puffs along an axis read as grapes.
- **`use` DOES NOT WORK HERE, and it looks like it should.** Outer stylesheet selectors
  do not cross into a `use` shadow tree — only inherited properties do — so every cloned
  leaf and floret fell back to black while the definition still looked right. It saved
  20KB raw, which is a fraction of a kilobyte once compressed. **The drawing is 85KB raw
  and 9KB over the wire**; repetitive markup is nearly free to a compressor, so measure
  the compressed size before optimising the raw one.

**A CLASS WITH NO RULE RENDERS BLACK AND NO GATE HERE CATCHES IT.** It happened twice in
one afternoon — a generator emitting `puff-pale` the stylesheet did not know, and the
`use` experiment above. `check-classes` is therefore the next port from Star Stuff; see
`DECISIONS.md`. Until it lands, **look at a render before believing a drawing is styled.**

**A `@media print` block must come after the base rules it overrides.** Same specificity
means source order decides, and the bush's caption printed moss-green because the print
block sat above it.

### The machine-readable layer is generated, and the credit line is authored

`tools/make-markdown.mjs` writes **a `.md` beside every page, `/llms.txt`,
`/llms-full.txt`, and `/feed.xml`** — all derived, none typed. Each `.md` comes from that
page's own `<main>`, the same landmark the SKS mirror reads, so the Markdown an agent
fetches cannot disagree with the page. The feed comes from the register's own accessions.
Run it by hand like `make-images.py`, commit the output, and `check-metadata.mjs` fails
when it is stale.

**The converter throws on a tag it does not know rather than dropping it.** A converter
that silently discards an element is how a Markdown copy comes to say less than the page,
which is the drift the generator exists to prevent arriving by another door. Teach it the
tag. Two things it deliberately keeps: **`<del>` and `<ins>` stay as HTML**, because a
restored attribution is the one distinction Markdown has no vocabulary for, and losing it
would flatten *what we got wrong* and *what is true* into one line.

**`tools/make-search-index.mjs` writes `search-index.json` and the manifest inside
`/search`**, from the same landmark, and it is the one generated view where **quoted
text is held apart from ours**. A `blockquote` becomes a whole record with its `cite`
and its caption; a short quotation inside our prose keeps its character range, so the
crop can be widened around it. That separation is the feature: a search snippet is a
trimming machine, and pointed at eighty-two mounted quotations it manufactures the
tightened source `ATTRIBUTIONS.md` exists to prevent, one per result. **A retracted
attribution is not indexed** — only the restored half of a `del`/`ins` pair — because
plain text cannot say *this is the reading we got wrong*.

**`tools/make-records.mjs` runs the other way, and that is the design.** Every other
generator here reads a page and writes Markdown beside it. This one reads
`ATTRIBUTIONS.md` and `DECISIONS.md` and writes the bodies of **`/ledger`** and
**`/what-is-settled`** between markers, because those two are working documents — the
`credit-source` skill appends to the ledger, every session that settles something
appends to the other, and making the page the source would mean editing a ledger entry
in HTML, which is how a ledger stops being kept. Either direction is fine; two
hand-kept copies is not. It throws on a line it cannot classify and then **proves no
block was dropped**, comparing words with the whitespace removed.

**THE ADDRESSES ARE NOT `/attributions` AND `/decisions`, AND THAT IS A FILESYSTEM FACT.**
macOS is case-insensitive: `/decisions` would be `decisions.html`, `make-markdown.mjs`
writes a `.md` beside every page, and `decisions.md` **is** `DECISIONS.md`. The
generator would have overwritten its own source with a round-tripped copy, silently, on
the first run. Verified with a temp directory before anything was written. **Check this
before adding any page whose slug matches a repo-root file.**

**Run the generators in order: `make-records` → `make-search-index` → `make-markdown`.**
The record pages are an input to the other two, and `search.html`'s manifest is an input
to its own `.md`. `check-metadata.mjs` checks them in that order for the same reason —
otherwise a stale record page reports as a stale `.md`, which is the symptom and points
at the wrong tool.

**`tools/html.mjs` and `tools/pages.mjs` are shared, and that is the point of them.**
**`check-markup.mjs` was not using the shared one and grew a third entity table** — six
entries, no `&middot;`, found when a new check asked it for one and got the raw entity
back. It imports `decode` from `html.mjs` now. If a tool here needs an entity, teach the
shared table; the fact that a private six-line version *works* is how the drift starts.
The entity table is case-sensitive because the sheets quote Old English, so a second
copy is a letter one generator learns and the other does not; the page order is
editorial, so a second copy is a sheet announced to agents and missing from the
reader's index. One of each, imported by both generators.

**JSON-LD is authored per page, not generated**, because `author` and `about.author` are
an editorial judgment: who wrote our reading, and who made the thing being read. The gate
checks the mechanical fields against the page and refuses the conflation. **A new sheet
needs a block, and needs the two credited apart.**

**NEVER WRITE AN ANGLE-BRACKET TAG NAME IN A COMMENT NEAR THE HEAD.** A comment that says
`<main>` is indistinguishable from the landmark to a regex, and a comment naming `<g>` is
indistinguishable from an SVG group. Both were paid for here in one afternoon: the second
broke the art converter, and the first made a `<main>` extractor match inside the comment
and take the `<head>` as the page body. **The SKS mirror reads that landmark too.** Write
the name without brackets.

### An easter egg may hide the door; it may never hide the room

`.qe-modes-link` is the fox-and-hedgehog mark in the controls tray — the **only unlabelled
control there**, and the one route into `/two-cohabitating-modes` that a reader finds rather
than is told about. This file forbids a hover-gated section mark because hover hands a feature
to mice and to nobody else, so an unlabelled control needs a reason it is not that fault.

**The reason is that nothing is withheld.** What is hidden is the *route*, never the
destination: the page is in every footer row as **Modes**, in `.qe-furniture` on the home page
with a gloss, in `sitemap.xml`, in `tools/pages.mjs`, in `/llms.txt` and in the finding aid —
and the link's **accessible name is real text in the DOM at all times**, so a screen reader
announces it exactly as it announces *Search*. A sighted mouse user is the only reader who has
to wonder what the drawing is for, and the same route is in the footer of the page they are on.

**So: an easter egg here may make a route discoverable rather than announced. It may never be
the only route, and it may never be the only name.**

**It does not animate, and the loupe is the reason** — the rail sprig and the moth draw
themselves on because they are botanical art; nothing in the instrument tray moves.

**Both animals face the same way, and nose to nose is the refused design.** A fox facing a
hedgehog is a predator facing prey, which is the one thing a mark for a page about two modes
*cohabiting* must not say. Two profiles in one orientation are a plate of two specimens, which
is this site's idiom and carries no narrative. Heads-only was drawn and refused too: a spiny
dome at head scale is a **rising sun**. And sixteen short spines on the dome's own normal,
because eight long ones are a stegosaurus — the lilac panicle's lesson, arriving again.
**Do not reach for a handful of big marks when you mean a texture.**

### ADDING A CONTROL TO THE TRAY IS A MEASUREMENT, NOT A MARKUP EDIT

`.qe-controls` is `flex-wrap: wrap` as of 2026-09-10, and the wrap is not cosmetic. **At 375px
the four existing controls filled the row exactly** — first item at x 20, last ending at x 355
inside a 20px gutter, nothing to spare — and the row is `justify-content: flex-end`, so a fifth
item **overflows off the LEFT edge** and takes the document's `scrollWidth` with it. That is the
horizontal body scroll the layout rule forbids outright.

**Nothing measures this.** `check-overlap.mjs` catches text on text, not a flex row running out
of room; the tray had been full since the Reading disclosure shipped and no gate said so. So a
new control is measured at 375px before and after, along with its hit area and its neighbours'
— see the target rule above. Hiding a control below a breakpoint is not the fix: it withholds
the feature on the devices most people read on.

**AND A PANEL HUNG OFF ITS OWN CONTROL MOVES WHEN A CONTROL IS ADDED — THE ONE THAT MOVES IS
THE OLD ONE.** The rule above was right about the row and silent about the overlay. The reading
panel was `right: 0` on its own summary from the day it shipped, which made its position a
function of **how many controls sit to its right**; it cleared the measure by 31px at 1280px,
and the drawers control moved it 81px left and landed 50px of it on the lede on eight pages.
`check-overlap.mjs` caught it; nothing else would have, and no care about the *new* control
could have predicted it. **Both panels hang off `.qe-controls` now**, whose right edge is the
gutter at every width, so a seventh control cannot move either — and the 44px hit box moves
onto the summary, because `.qe-controls > *::after` only works on a positioned child.

**TWO OVERLAY PANELS IN ONE TRAY CAN BOTH BE OPEN WITH JAVASCRIPT OFF.** A `details` toggles
natively and the close-the-other convenience is script. They share `name="qe-tray"` — HTML's
exclusive accordion — so opening one closes the other with no script at all. **That costs both
rendering gates a line each**: `reveal.mjs` dissolves the group before opening or one panel is
measured shut, and `check-overlap.mjs` then knows two members of one exclusive accordion can
never be on screen together. A third disclosure in the tray joins the group and needs neither
line changed; a panel that stops being exclusive stops being exempt, in the same edit.

### The site makes no third-party request, and /privacy says so

`fonts/` holds Fraunces and Newsreader, self-hosted since 2026-09-09 and generated by
**`tools/make-fonts.mjs`** with the `@font-face` block written into `queering.css`
between markers. Before that, every page pulled both faces from Google's CDN, which
disclosed each reader's IP address and user agent to Google **before a word was read** —
the only third-party request the site made, and the pattern a Munich court ruled against
in 2022.

**`/privacy` describes exactly what this site can reach, so `check-metadata.mjs`
enforces it.** A privacy policy is a binding statement of practice; a claim about this code that
only a human remembers is a claim that will eventually be false. The gate reads the
attributes that make a browser *fetch* — `link rel=stylesheet|preconnect|preload`,
`script src`, `img`, `source`, `iframe` — and **exempts `<a href>`**, because a link the
reader chooses to follow is not a request the page made. On a site that cites everything,
that distinction is the whole difference between a usable gate and a useless one.

**Since 2026-09-09 there is exactly ONE thing here that can reach a third party**, and it
is opt-in: a click-to-load recording of Eliot at the foot of the home page. The served
markup holds a poster we drew and a plain link; `queering-embed.js` upgrades that link
into a player on a press. Four rules hold it honest, and **the gate now enforces three of
them because section 7 read only markup and would have passed this page**:

- **Every third-party origin our own scripts mention must be NAMED on `/privacy`.** Not
  forbidden — named. It caught a real fault immediately: the script contacts
  `www.youtube-nocookie.com` and the policy named the bare domain.
- **A `data-embed-id` facade must carry a plain link to the same video**, which is the
  no-script path and the reason the request counts as one the reader chose.
- **No `iframe` in any served page.** An iframe in the markup is a request made on the
  reader's behalf before they pressed anything.
- **The poster is drawn, never fetched.** YouTube's thumbnail would be a request to
  `i.ytimg.com` on every load — the Google-fonts failure wearing a hat.

**A capability that binds the privacy page is a capability that must move the privacy
page in the SAME commit.** Five statements there stopped being true the afternoon this
shipped, including "It was the only one," and a policy that is false for a week has been
published false for a week. `/privacy` also refuses to call `youtube-nocookie.com`
anonymous, because it is not: no cookies and no tracking are different claims.

**Identical coverage, one fewer party.** All three subsets Google served are kept, with
Google's own `unicode-range` values, so glyph coverage did not change — verified by
measuring text metrics against the still-Google-served live site and getting the same
numbers to three decimals. Neither family has a **greek** subset, so the Sappho on
`/flower-codes` renders in a system fallback and always did.

`serve.mjs` needs the type for anything the site serves. It was missing `.avif` and
`.woff2`; production sends `nosniff`, so a type this server guesses is one the live site
cannot recover from.

### Nothing the markup depends on may outlive the markup in cache

Every page is `max-age=0, must-revalidate`, and **so are `queering.css`, `queering.js` and
`queering-search.js`**, because markup and the rules that style it ship in one commit. The
stylesheet was `max-age=300` until 2026-09-09, which meant that for five minutes after any
deploy a returning reader got the new markup with the old rules — and that is not
hypothetical: the accession stamp shipped and rendered as a paragraph of three unstyled
spans, which is how the window was found. `_headers` carries the reasoning beside each rule.

**The invariant is the thing to keep, not the numbers.** An asset the served HTML depends on
must not be cacheable for longer than that HTML. Anything derived from the pages is included:
`search-index.json` was ten minutes and could hand a searcher a snippet quoting a sentence no
longer on the page it cites. Fingerprinting would license long caches and is refused for a
stated reason — it would churn twelve HTML files per stylesheet edit and cost this register
its legible diffs. See `DECISIONS.md`.

**`must-revalidate` and `stale-if-error` cancel** — RFC 9111 forbids serving a stale
`must-revalidate` response, and the head of `_headers` says so. Which one a file gets is a
real decision: the stylesheet fails when the page fails, so resilience buys it nothing and it
takes `must-revalidate`; the search index is fetched *after* the page renders, so it takes
plain `max-age=0` and keeps `stale-if-error`.

**`check-cache.mjs` is the guard, and which assets are coupled is DECLARED in it.** Two lists,
each entry carrying why — because the inference is available, plausible and wrong: nothing in a
file's bytes says whether its content knows about markup, and `queering.js` and a `.woff2` are
both static files fetched by every page. It also reads `fetch()` calls in our own scripts,
because `search-index.json` is reached from `queering-search.js` and appears in no attribute on
any page — an HTML-only scan would have missed the very file that prompted the gate. **A new
asset needs a line in one of the two lists**; the gate fails on one in neither, which is the
reminder. `--live` probes the edge and checks the precedence model rather than the policy.

### Python touches pixels; Node does everything else

**That boundary replaced "the one Python tool here" on 2026-09-09**, when the plates
needed transcoding. The reason behind the old sentence was never the count — it was that
something has to rasterise and nothing may need `npm install`. Same correction the
`queering.js` rule already took: a count is a rule that gets quietly broken the first
time a second thing is worth having.

- **`tools/make-images.py`** *draws* from the palette: `favicon.ico`,
  `apple-touch-icon.png`, `images/og-*.png`.
- **`tools/make-plates.py`** *re-encodes* somebody else's scan: AVIF and WebP for every
  plate, at the css width the figure is displayed at and its 2x, **never upscaled past
  the scan**. `.qe-plate` is `23rem` = 368px and never reflows wider; `.qe-plate-wide` is
  `34rem` = 544px. The ladder follows those measurements, so `sizes` needs no media
  guesswork. The original JPEG stays as the `img` fallback and the archival copy — the
  filename is the provenance.

**A new plate needs its variants and a `<picture>`.** `check-metadata.mjs` fails on a
bare `img` in a plate figure, on a missing variant, on a `srcset` that disagrees with
`tools/plate-variants.json`, and — the silent one — **on a scan whose bytes no longer
match the hash it was encoded from.** Replace a scan without re-running the tool and
nearly every reader gets AVIF of the old one while the JPEG nobody fetches shows the new.

**`serve.mjs` must know every type the site serves.** It had no `.avif` entry, so it sent
`application/octet-stream` and the browser sniffed it — invisible locally, because there
is no `nosniff` there. Production sends `nosniff` on `/*`, and **`<picture>` does not fall
through to the next `<source>` when one fails to decode**: the choice is made on `type`,
before the fetch. A type this server gets wrong is one the live site cannot recover from.

### Icons and social cards are generated, not hand-made

`favicon.ico`, `apple-touch-icon.png` and every `images/og-*.png` come out of
**`tools/make-images.py`**, for the reason above. It reads the `--qe-*` values straight out of `queering.css`,
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
the sheet is the copy that will drift. Eight of the nine sheets carry `--mended`, because
eight have been corrected — Sheet No. 8 was predicted to arrive clean and did not. **The
unmended state finally shipped on 2026-09-10 with Sheet No. 9**: a solid hairline, moss ink,
reading `Mounted 10 September 2026. Not yet corrected.` It had never rendered before that
day, which is why it was the thing to check by hand rather than copy off a neighbour — and
that is still the advice for the next new state, not for this one.

**A NEW ACCESSION GOES AT THE TOP OF THE REGISTER, ANCHORED ON `<div class="qe-register"
id="latest">` — NEVER RELATIVE TO THE LAST ENTRY YOU WROTE.** The register runs newest
first, so the top is a fixed address and the previous accession is not. Anchoring on your
own last entry is correct for exactly as long as nobody else adds one, and it produced a
wrong page on 2026-09-09: two sessions appended to this file all evening, each inserting
above the last accession *it* had written, and four accessions ended up below four older
ones. **Both sessions were locally correct and the page was globally wrong.** The fixed
anchor cannot do that, whoever else is editing.

**Move `· latest` in the same edit**, off the accession that had it and onto the new one.
`check-markup.mjs` fails if the marker is not on the first accession, or if two carry it,
or if a date increases down the page — but **within one day the order is editorial and
nothing can verify it**, so the anchor is the only thing keeping it right. `/changelog#latest`
is a published address that depends on this.

Four kinds of entry, each with one accent token spent on a rule and **never on the letters** —
`Mounted`, `Re-determined`, `Label corrected`, `Cabinet`. Group by accession, not by commit: a
sheet, its corrections, and the CSS it needed are one dated entry. See `DECISIONS.md` for why
it is a register rather than a list of releases.

### Addresses are cheap; a contents list is furniture

**These are two separate decisions and the first version of this rule conflated them.**

- **Every `<h2>` on every page gets an authored `id` and a `.qe-anchor`.** No threshold. A
  section a reader cannot link to is a section nobody can cite, and the register was italicising
  three home-page section names it had no way to reach.
- **EVERY SHEET HAS A CONTENTS LIST**, as of 2026-09-09, plus `/design`, `/mission`,
  `/ledger`, `/what-is-settled` and `/two-cohabitating-modes` — thirteen pages. Three of the eight sheets were missing one
  for no reason anybody could reconstruct: Nos. 1, 2 and 7, at 2,045 to 3,098 words against
  2,495 to 5,018 on the five that had one. **The page still declares it by including the
  container** — nothing derives it from a word count, because which pages want one is
  editorial. What changed is that the answer for a *sheet* is now always yes.
- **THE "MORE THAN TWO HEADINGS" THRESHOLD IS RETIRED**, on Ryan's call, 2026-09-09. It was
  the stated reason `/ledger` and `/what-is-settled` shipped without one, and it measures the
  wrong thing: **the reader's problem on a 20,000-word page is length, not heading count.**
  Two entries that save twenty screens of scrolling are worth more than seven that save two.
  The question is only ever *is this page long enough to want one*.
- **Retiring it found a real omission.** `/privacy` is 2,058 words with eight headings and had
  no list — longer than `/on-being-ill` at 2,045, which has one. It has one now.
- **EVERY PAGE HAS ONE EXCEPT TWO, and both exceptions are structural rather than a
  threshold.** `/404` is an error page with two headings and 329 words, and the home page's
  own content *is* a contents list — the plate of eight numbered cards — so a second one
  above it would put two competing navigational lists on one page and the one a reader wants
  is the plate. **Length is no longer a reason to decline either**, as of 2026-09-09:
  `/search` has one at 1,307 words, the shortest page here that is not the error page.
- **Three thresholds were tried and all three are retired**, which is the pattern worth
  remembering rather than any one of them: *more than two headings*, *the block must not be
  too tall*, and *the page must be long enough*. Each measured the list instead of the reader.
  What is left is the structural question — **does this page already have a better index of
  itself?** — and only the home page answers yes.

**The home page is the case that separates them.** Its own content *is* a contents list — the
plate of eight numbered cards — so a `.qe-contents` above the prose would put two competing
navigational lists on one page, and the one a reader wants is the plate. It is also the
shortest page on the site at 1,362 words. **Addresses yes, contents no**, and `/#what-grows-here`
is now a direct address for the plate itself.

### A long page's contents list is derived while its addresses are authored

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
- **Nonsticky, in the body, straight after the lede — NOT before the first heading.** Those
  are different places and five of the ten lists prove it: `/wild-nights` carries nineteen
  blocks of opening prose between its list and its first `<h2>`, `/invention-of-normal`
  thirteen. The list is front matter for the sections; the lede is not a section.
  **THERE IS EXACTLY ONE EXCEPTION AND IT IS `/search`.** Straight after the lede there put
  the search input at 970px on an 866px viewport — **below the fold, on the one page whose
  whole purpose is that input.** Its list sits below the form and the results instead,
  immediately before the sections it names, and the input is back at 804px. Measured, moved,
  re-measured; the screenshot of the broken version looked entirely reasonable, because a
  screenshot of the top of a page always does. A reader with results in front of them is not
  looking for a contents list.
  **How `/coming-to-terms` stopped being the other exception is the useful part.** It had no
  lede and all six headings in its 2026 commentary, so its list sat
  after the register note — the only place it could sit without misrepresenting the page.
  The fix was not to move the list but to give the sheet what it was missing: a lede, and a
  heading for the essay. **The heading is Ryan's own phrase**, taken from the anecdote inside
  the essay, because a heading invented for somebody else's text is a piece of us wearing
  their voice. **A note that says "everything above" binds itself to a position**, so it had
  to be rebound to a section the moment anything sat above the essay — see `DECISIONS.md`. NN/g couples rail↔sticky; the body is
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
  `.qe-contents`' own heading, and any `<h2>` with no id. **A list must not contain its
  own heading, and that is the whole of the exclusion** — `.qe-contents` and `.qe-rail`
  are one derivation shown twice, so the label on the thing doing the listing is not a
  section of the page.
- **THE ENTRY INDEX'S HEADING IS NOT EXCLUDED, AND GENERALISING TO "ANY `<h2>` IN A
  `nav`" WAS WRONG.** That version was written, shipped and reverted the same hour: it
  also dropped `/ledger`'s index of all 55 entries out of the rail, and on a 130KB page
  a link straight to that index is the most useful thing in it. **A destination inside
  a `nav` is still a destination.** The two cases look identical and are not — one is a
  list pointing at itself, the other is a list pointing somewhere a reader wants to go.
- **Both views derive from one `sectionHeads()`.** They did not, and changing one broke
  the other silently: `measureTicks` re-derived the set with the older exclusion, counted
  three headings against the rail's two, hit its own length guard and simply stopped
  drawing the tick scale. **A guard that fails safe still fails.**
- **`/changelog` HAS ONE AS OF 2026-09-09, reversing the entry that said it must not.** The
  old reasoning was measured and correct about its own number and wrong about what the number
  meant: a register's accession headline is a sentence by design, its 33 labels average 140
  characters, and the block measures **2,322px — 4.8 screens before the first entry**. That
  was read as disqualifying. It is not. **The page is 40,408 words, about 120 screens**, so
  the list costs 2.7 screens to save up to a hundred, which is the trade a contents list
  exists to make. The same correction as retiring the two-heading threshold, from the other
  end: heading *count* was the wrong measure there, block *height* is the wrong measure here.
  **Page length is the question in both.**
- **Columns were tried and do not help, measured rather than assumed:** 2,322px in one
  column, 2,213 in two, 2,302 in three. Narrowing a column makes a 140-character sentence
  wrap proportionally more, so width traded for wraps is a wash. **Labels stay verbatim** —
  truncating one is this site's characteristic failure applied to itself, and a short second
  label is the drift.
- **The register keeps `.qe-sheet-index` as back matter as well**, and the two do different
  jobs: the contents list is chronological, by accession, and the index files the same
  entries by which sheet they happened to. Its one-line pointer came out, because the
  contents list's last item is now a link to it and two adjacent links to one place read as
  a mistake.

### The rail is the same headings as an instrument, not as front matter

`.qe-rail` is fixed in the left margin above **64rem** and absent below it, on every page
but `/changelog`. Same derivation as `.qe-contents` through one builder in `queering.js`,
so **a new page needs the empty `nav` and its `aria-label`** and nothing else — mount it,
list it, log it, file it, route it, group it, crumb it, **rail it**.

**Both lists show on the seven pages that have a contents list, and that is authored.**
The rule above refuses two competing navigational lists on the home page and it still
holds: a contents list is read once, in sequence, in the measure; a rail is glanced at
from the middle of a sheet. Only one of them is for reading. **So the rail must stay
unmistakably not-the-list** — smaller, moss rather than rust, unnumbered, unlabelled, out
past the measure. Ryan's call, over the recommendation to hide one; see `DECISIONS.md`.

**The register does not get one**, for the reason it has no contents list: 28 headings
averaging 147 characters is a four-thousand-pixel column, and truncating is the failure
this site is organised against.

**IT COLLAPSES TO TICKS AND THE HEADINGS COME UP ON HOVER**, which is not what the
no-scroll-spy rule refuses: a spy tracks the reader down the page unprompted and forever,
and this moves only when a reader asks. **The labels stay in flow at `opacity: 0`** rather
than floating in absolutely positioned pills, and that is load-bearing rather than
stylistic — pills would lie over one another the moment `REVEAL` turned them on, and
`check-overlap.mjs` would report every label sitting on the next. In flow, the revealed
state is the expanded rail already measured clean. The price is an uneven tick pitch,
because a row is as tall as its own label.

**THE TICKS ARE A SCALE DRAWING OF THE SHEET, AND THE LEAN IS NOT.** Each tick is as long
as its section is tall, normalised across the page and set by `queering.js` — so a long
tick means a long section, on every page, always. **That is the licence for it.** A tick
whose length varies looks like it encodes something, and this house refuses decoration
that asserts a fact it does not have — a gold join on a sheet nobody corrected. So it had
better encode the thing it looks like. The per-tick lean, up to 3.2° walked by the golden
angle, claims nothing at all and is therefore free to be ornament: it is the wonk axis
already running on this site's type, applied to a rule instead of a letter.

**They part company in plain view, and that split is the rule to keep.** `html.plain` drops
the lean with every other decorative thing and **keeps the lengths**, because plain view
removes decoration and has never removed information.

**Measured after `document.fonts.ready`**, since a webfont swap moves section extents and a
rail measured against the fallback is measuring the wrong sheet. Nothing else needs
re-measuring: `main` is capped at 34rem and the rail only exists above 64rem, so the
measure never reflows while the rail is on screen. A page whose sections are all the same
height gets a flat 22px rather than a stretched range, because there is no scale to draw
and inventing one would be the fault above.

**THE RAIL ENDS IN A TERMINUS, AND THAT IS THE ONLY ORNAMENT IT GETS.** `.qe-rail-sprig`
is two leaves and a bud continuing the rail's own rule at its foot — not a mark beside the
rail but the end of the line the rail already draws, which is why it is pulled back by the
nav's padding to meet the border. **A scatter of marks around the rail was drawn and
refused**: a cluster at the head lands in the top-left, where a reader's eye starts and
where the skip link appears on focus, and it makes the rail's decoration the first thing
on the page. This component's whole licence is Ma. See `DECISIONS.md`.

**It wears `.qe-botanical`, so the motion is inherited rather than restated** — the stem
draws itself on, the leaves unfurl, already gated on `prefers-reduced-motion` and already
kept-but-stilled in plain view. Only the size is new, exactly as with the moth. It takes
`--qe-moss` and so follows the ground with no cabinet rule of its own.

**NO GATE HERE MEASURES A DRAWING AGAINST TEXT.** `check-overlap.mjs` catches text on text,
so an ornament in the margin is unguarded — which is the argument for keeping this one
small and *inside the rail's own box*, where the rail's measured clearance already covers
it, and against anything free-floating. **A new mark out here needs measuring by hand.**

**HOVER-GATING IS LICENSED HERE BY FOUR THINGS AT ONCE, AND REMOVING ANY ONE BREAKS IT.**
This file forbids a hover-gated section mark because hover hands a feature to mice and to
nobody else. The rail is exempt only because nothing is withheld: the heading text is in
the DOM at all times so a screen reader always has the link name; `:focus-within` raises
it for a keyboard; `@media (hover: none)` never collapses it where hover does not exist;
and `html.plain` never collapses it either.

**64rem IS MEASURED, AND THE 77rem IT SHIPPED AT WAS A SUM AGAINST A BLOCK THAT IS NOT
THERE.** Two corrections, and the second is the one to remember. First: the rail and the
page are both derived from the centre line, so the gap between them is **constant at every
width** — the breakpoint was only ever measuring the rail sliding off the left edge, which
is why the left is now pinned with `max()`. Second: the old sum reserved room for
`.qe-wide` at 46rem, and **`.qe-wide` widens nothing on screen** — see below. Measured instead
of calculated, the leftmost thing inside `main` on the art-heavy sheets is 277–288px at
1024px against a rail ending at 172px, so the real clearance is ~108px and not the 24px
being protected. Below the breakpoint the rail is gone rather than squeezed, which is what
keeps WCAG 1.4.10 satisfied at 400% zoom. `check-overlap.mjs` measures screen at 1280px,
so **the rail is live in that pass** and a collision is reportable.

**`.qe-wide` NARROWS ON PAPER AND WIDENS NOTHING ON SCREEN.** The old layout note claimed
two blocks break the measure, the masthead and the provocation, and it was wrong twice
over: **the masthead has never carried the class**, and a `max-width: 46rem` child of a
`main` capped at 34rem constrains nothing. Measured on screen, the provocation is 448px —
the content box every other block gets.

**"It does nothing" was the overcorrection, and it shipped before being checked.**
`@media print` sets `main { max-width: none }`, so on paper this rule is the only thing
holding the provocation in: it **caps** a block that would otherwise run the full sheet,
and centres it. Measured in that condition — 0px of effect at 717px of printable width
(A4 at Chrome's default margins), 3px at 739px (Letter), 80px at 816px. Its real effect
scales with the printer's margins and is invisible at the defaults.

**Left in place deliberately.** Whether the provocation should break the measure on screen
is a design decision about how this site looks, not a bug to sweep up, and nothing should
quietly answer it by widening the masthead on the way past. Open in `DECISIONS.md`.

**It sits outside the landmark, so no generator sees it** — re-running all three changed
no byte.

**BUILT AT RUNTIME IS FREE; HIDDEN IS NOT, AND THOSE ARE DIFFERENT THINGS.** Both Chrome
gates load over `file://` and `queering.js` is included by relative URL, so it runs — the
always-visible first draft of this rail was measured in full with no help at all.
Collapsing the labels to `opacity: 0` put all 109 of them straight back into the blind
spot, and `tools/reveal.mjs` carries the line that brings them out. Proved both ways with
a probe colour: with the line, 109 failures caught; without it, a clean `PASS` and 218
elements silently dropped. **`REVEAL` is for a fetch or a hidden state — never for
anything merely built at runtime.**

**STACKED TARGETS TAKE REAL PADDING, NOT THE `::after` BOX.** The hit-area rule above was
followed with the wrong instrument and then the wrong arithmetic in one pass: the
`.qe-controls` technique would have overlapped every box so the topmost took every tap,
and the padding was then set from a 1rem line and shipped **31.1px** targets under a
comment claiming 44. A 0.82rem line at 1.35 is 17.71px; 0.83rem either side is 44.3px.
**Measure the rendered box, and check no two hit areas overlap.**

### `/changelog#latest` is a permanent address for a moving target

The register runs newest first, so **the top of the register is the latest by
definition**. `id="latest"` sits on `.qe-register` itself, and the jump under the lede
points at it. **A link to the newest accession's own id would be a hand-kept pointer at
a moving target** — stale the next time anything is mounted, in the file that exists to
record that kind of failure. This cannot go stale because nothing about it is a copy of
anything, and it needs no script, which a derived `href` would have.

**It sits directly under the lede because anywhere lower is off the screen.** After the
register's housekeeping note it measured 1,587px on an 866px viewport; under the lede,
680px. Second time in one evening a link was put somewhere reasonable-looking and
measured out of sight, after the finding aid's search box.

**`check-markup.mjs` guards the order this depends on**, and a new accession must keep
it: dates must not increase down the page, and **exactly one accession carries
`· latest`, the first one**. Within a single day the order is editorial and unverifiable
— but which section is newest is a claim the page makes out loud, and a claim can be
checked. It exists because two sessions appended to this file at once, each anchoring on
the last accession *it* had written, and four accessions ended up below four older ones
with the marker five sections down. **Both were locally correct and the page was
globally wrong** — the card-order fault a third time, in the one file that gate does not
read.

### A contents list is front matter; an index is back matter

`.qe-sheet-index` on `/changelog` files the same entries by **what they happened to** rather
than by date, at the **foot** of the page. That distinction is the whole reason the contents
list failed there and the index does not: front matter delays every reader, back matter
delays none. A one-line pointer up by the legend is how a book does it.

- **Which sheet an entry concerns is stated, never inferred.** Every `.qe-entry` carries
  `data-sheet`, a token list (two tokens where an entry genuinely touched two sheets).
  Deriving it from links inside an entry fails on the evidence — the Dickinson accession
  links three sheets and concerns one — and **an index that silently misfiles a correction is
  the worst bug this site can ship.**
- **Groups are authored; only the filing is derived.** Group headings, sheet numbers and
  their order live in `changelog.html`, because they are editorial words and `queering.js`
  may not write words. The script clones the entry's existing name and its existing kind
  chip, so the index cannot call an entry something the entry does not call itself.
- **`check-markup.mjs` guards it**, because the failure is silent: a typo'd slug matches no
  group, drops out of the index, and leaves the register reading perfectly. It validates
  every token against the pages that exist plus `the-site`, flags an empty declaration, and
  flags a group nothing files into — the same typo caught from both ends.
- **A new entry needs its `data-sheet`** in the same pass that writes it. Mount it, card it,
  log it, **file it**.

### Back to the top is a link, and its arrowhead is a seed head

`.qe-totop` closes every footer: real text reading **Scroll to top**, a drawn mark under it,
the whole thing one `<a href="#main">`. **No script** — an anchor already scrolls, and
`scroll-behavior` is set once at the top of `queering.css` and switched off under reduced
motion, so smoothness is inherited rather than restated.

**The arrowhead is a seed head, and that is the whole trick.** A chevron laid over grass is a
UI arrow in a costume. This site's own idiom for "up" is growth — stems draw themselves on
from the ground — so two tall blades simply arc up and meet at the middle stem's head, and
the silhouette is an arrow already. Nothing is imported and nothing is faked. **Drawn wrong
first**: the earlier version put two short awns on the head and read as a small figure with
its arms up.

**The words carry the meaning; the drawing carries none.** The mark is `aria-hidden`, the
link is named by real text, and a reader who sees only grass has lost an ornament rather than
a control — the same split as the rail's ticks and its lean.

**`main` GAINED `tabindex="-1"` AND THAT IS NOT COSMETIC.** Two in-page links now aim at that
landmark, and a landmark that cannot take focus leaves a keyboard reader's focus in the
footer while the page scrolls to the top — their next Tab resumes from the bottom. Proved
after: activating the link scrolls 9,952px and moves focus to `main`, so Tab resumes at the
top of the content. **The skip link has wanted this since it was written.**

### A page that is not a reading is listed on the home page, not carded

The plate names readings. Everything else is listed at the **foot of the home page** in
`.qe-furniture`: a `<dl>`, a name and one sentence of gloss, **no card**. A card would
file it with the eight readings, and none of these is a reading of anything. It is the
**bare** tier from the three-surface rule above, and **back matter** for the reason the
register's index is — furniture at the top of the home page delays every reader to reach
what they came for.

**THERE ARE TWO LISTS, AND WHICH ONE A PAGE GOES IN IS THE FIRST QUESTION TO ASK.**

| list | holds | today |
|---|---|---|
| **The founding papers** | why this cabinet exists and what it is for — stance | `/mission`, `/manifesto`, `/two-cohabitating-modes` |
| **The cabinet itself** | how it is made, recorded, searched, and what it knows about you | `/design`, `/changelog`, `/search`, `/ledger`, `/what-is-settled`, `/privacy` |

Purpose above plumbing. **The split is precedented, not invented** — Star Stuff already
divides *What this project is* from *How it is made, and how it is checked*, and our
existing list maps onto that second group one for one, **privacy included**. Four other
names were considered for the first list and all four refused with reasons; `DECISIONS.md`
keeps them so the question is not reopened from scratch. **`/mission` is the first page in
it, and it is an index of aims rather than an argument** — see `DECISIONS.md` for why the
genre is load-bearing and not a stylistic preference.

**The cabinet list's heading is the name `tools/pages.mjs` already uses.** That group has
been called *The cabinet itself* since the finding aid shipped, and `/search`'s manifest
and `/llms.txt` show it to readers and to agents. A second name for a set that has one is
drift, and this is the file that keeps warning about it.

**A NEW PAGE HERE NEEDS A LINE IN ONE OF THE TWO LISTS**, and nothing derives it: those
sentences are authored, and `queering.js` may not write words. So such a page is mount it,
**list it**, log it, file it, route it, group it, card it for social, and give it a
JSON-LD block — no plate number, no accession stamp, no `.qe-provenance`, because a stamp
is for a specimen.

**EACH LIST IS A DRAWER, AND SINCE 2026-09-11 EACH DRAWER HAS A PAGE.** `/the-founding-papers`,
`/the-cabinet-itself`, and `/the-plate` for the readings — the three groups `tools/pages.mjs`
has always held, given addresses, reachable from the **Drawers** menu in the controls tray and
from the breadcrumb on every member. **Each group's collection page is the first entry in its
own group** in `pages.mjs`, so the reader's index, `/llms.txt` and the finding aid's manifest
stay one derivation. `index` is in no drawer: the home page is above the scheme, not inside it.

**THIS IS NOT THE COLLECTION DECISION `DECISIONS.md` DEFERS.** That one defers **runs** — three
sheets sharing a lens, named retroactively — and its trigger is untouched. The
`collection-*.html` namespace stays empty for it, which is what keeps `check-markup.mjs`'s
ported badge check stood down and armed. These three are structural, and **nothing is sorted
into them**: two hold the pages that are not readings, the third holds every reading there is.
That is also why the word *Drawers* is allowed here after *six drawers* was refused as a
taxonomy — no sheet is single-filed.

**A COLLECTION PAGE MUST NOT REPEAT THE GLOSS.** The one-sentence gloss of every page lives
once, in `.qe-furniture`. A collection page's line says what the member is **for** and where it
sits against its neighbours — a different sentence with a different job — and the page says on
its own face that the gloss is on the front of the cabinet. `/the-plate` takes the same rule
from the other side: **reduced cards only**, kind and number and title, the form the sibling
navs already use, and no card notes. A collection page earns its keep with what exists nowhere
else — the three sheet kinds, the signed/unsigned rule, what the build checks.

**A COLLECTION PAGE'S LINE IN ITS LIST IS THE POINTER AT THE HEAD OF THE SECTION IT COLLECTS**,
never a `<dt>` inside it — otherwise *The cabinet itself* appears in its own list and the
recursion has to be explained to a reader. Each of the three sections ends its intro with
**About this drawer**. And **a collection page gets no sibling nav**: the drawers menu lists the
other two at the top of every page with the current one marked, so a `.qe-elsewhere` carding the
same three is the two-competing-lists fault this file already refuses on the home page.

**EVERY MEMBER OF A DRAWER CARRIES A BREADCRUMB**, `.qe-crumbs`, which replaced `.qe-home` and
the group name that seven kickers carried as dead plain text. It **stops at the drawer and never
names the page it is on** — the `h1` is the next thing in the masthead, so a third crumb is the
title printed twice a line apart. The JSON-LD carries all three items as a `breadcrumb` property
**inside the page's one existing block**, because `check-metadata.mjs` requires exactly one. The
separator is drawn in CSS so it cannot join the accessible name, reach the Markdown, or be
selected into a quotation. It sits in `.qe-masthead` inside `<main>` — allowed for the reason
`.qe-contents` is, and skipped by the search index there, so it reaches the `.md` and not the
finding aid. **`/404` and `/` get none**: a trail on the error page would claim the address the
reader asked for belongs to a drawer. **Measure a third crumb if one ever arrives** — nothing
here measures a hit area.

**EVERY FOOTER IS THE SAME FOUR BLOCKS, AS OF 2026-09-09**: a row of short links, the
collaboration line, that page's own licence sentence, and — on the eight sheets — one
sentence pointing at `/ledger`. **The home page is the exception and keeps a bare footer**,
because `.qe-furniture` sits two paragraphs above it with all nine of these pages and their
glosses, and a row of the same links directly beneath is two lists of one thing.

**A NAV LABEL AND A PAGE NAME ARE DIFFERENT REGISTERS.** The row says *Colophon*, *Register*,
*Decisions*; those pages call themselves *How this site is made*, *The accession register*,
*What is settled, and what is open*. That is allowed for a row of links and is **not** allowed
for the group headings above — a second name for a *set* that has one is drift, a short label
for a *link* is not. *Decisions* points at `/what-is-settled`, and the address stays that way
for the filesystem reason recorded in this file.

**THE THREE DRAWERS ARE IN THE ROW AND THEIR LABELS ARE NOT SHORTENED**, as of 2026-09-11, and
that is the licence above running out. *The founding papers* and *The cabinet itself* are the
names of **sets** — the same words in `tools/pages.mjs`, on the home page, in `/llms.txt`, in
the drawers menu and on the collection page's own `h1`. A short label for one of those is the
second name for a set that this file refuses everywhere else. They sit directly after
*Queering Earth*, which is the level they are: the home page, then the drawers, then the pages
they collect.

**THE ROW WRAPS NOW, AND A SINGLE LINE WAS NEVER THE INVARIANT.** Thirteen links give two lines
at 1280 and 768, four at 375, six at 320. What has to hold is that no two padded targets on
adjacent wrapped lines can touch, which is what `line-height: 2.9` is for. **Measured after,
because nothing here measures a hit area**: no overlaps at any of the four widths, every target
past 44px in both directions, `scrollWidth` equal to the viewport. **Remeasure when a link is
added** — this is the only place on the site where a dozen targets sit side by side.

**The glosses live once, in `.qe-furniture`.** They used to be restated on fifteen footers:
five authored sentences across sixteen pages is eighty copies free to drift, and they had.
**Two pages were missing from every footer on the site** — `/ledger` and `/what-is-settled`
had addresses, were listed on the home page, and were reachable from no footer at all.

**Sourcing on a sheet is one sentence pointing at the ledger, and it does NOT go in the
provenance line.** `.qe-provenance` is accession history — mounted when, corrected how often,
each clause linked to the register entry that did it — and it is identical in shape across
all eight sheets, which is what makes it scannable. Which copy we read is a different fact
with a different lifecycle, and it already has two homes: the specimen block at the head of
the sheet, and `/ledger`.

**The target is the line, not the letters.** A `<dt>` that is entirely a link is not an
inline link inside a sentence, so WCAG 2.5.8's inline exception does not cover it. Padding
takes each to 45px and it is netted out of the spacing scale — see the hit-area rule above,
and **measure a new entry**, because no gate here does.

### A record page indexes its own entries, and the index is derived at runtime

`/ledger` and `/what-is-settled` each carry a `.qe-entry-index` at the **foot**, filled
by `queering.js` from that page's own `<h2>`s and `<h3>`s, with a one-line pointer up in
the front matter. Three things about it are load-bearing:

- **A contents list is the wrong component and both pages prove it.** `.qe-contents`
  derives from `<h2>`s, and a record page has two. Back matter, for the reason the
  register's index is back matter: front matter delays every reader.
- **THE SERVED CONTAINER IS EMPTY.** Generated into the HTML, an index of 121 headings
  would hand the SKS mirror and `search-index.json` a second copy of every one — the
  exact double-indexing the contents list is built at runtime to avoid. Both generators
  skip `nav.qe-entry-index` so the `.md` does not announce a list it has no room for.
- **The group headings are derived, unlike the register's.** That is not a relaxation of
  *`queering.js` may never create words*: these labels are clones of `<h2>`s already on
  the page, the same standing the contents list has. The register's groups are authored
  because a sheet's name appears nowhere else. **A group heading here is a `<p>`, not a
  heading** — re-entering the outline would give the page a shadow contents of
  duplicates, which is worse for a rotor than no index at all.

**It needs no `REVEAL` line, and that was checked by counting.** `reveal.mjs` is for a
fetch or a hidden state, and this ships hidden — but the drift rail's `if (r.hidden)
continue` only makes sense if `queering.js` has already run under the gate, so a
component that unhides itself is measured without help. `/ledger` went 1,782 → 1,845
measured elements with the index in, and its print count did not move.

### The finding aid searches in the reader's browser, and refuses to crop a quotation

`/search` is the site's one client-rendered page, and three decisions keep it honest.

- **A quotation is shown whole with its source, or not at all.** Our own commentary is
  cropped and marked as cropped; a window that would cut into a short quotation set
  inside our prose is widened until it does not. The generator records those ranges and
  **proves them** — it slices the finished text at each offset and throws unless it gets
  back what it wrote. The first version recorded offsets against a string it tidied
  afterwards, so every fence sat four to fifteen characters downstream of what it
  guarded. A guard reporting success while pointing at the wrong words is worse than
  none. **Our own verse counts**: `div.qe-verse` is a whole block too, wearing the label
  the sheet gives it, because a poem flattened into a cropped paragraph is the same
  defect and the words being ours only means it is our poem being mangled.
- **The query lives after the `#`, never in a query string.** A `?q=` is sent to the
  server, so every term anybody typed would land in the hosting log — on a site about
  queerness, illness and naming yourself, the most revealing thing here by a distance.
  **The form is hidden in the markup and revealed by its script**, so a reader without
  JavaScript cannot submit one by accident, and gets the generated manifest of the whole
  cabinet instead — which is also what the mirror indexes, because a landmark holding an
  empty results div says nothing.
- **`/privacy` describes it, because a field made two of its sentences false.** It said
  there was nowhere on this site to type anything. A page that binds us is a page to
  check against the code every time the code grows a capability.

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

### The AI-crawler policy is permission, stated in the form a machine parses

`robots.txt` names the training crawlers and the retrieval crawlers explicitly and
**allows all of them**, with `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, and
`_headers` sends `tdm-reservation: 0`. That is a decision Ryan made on 2026-09-09 and it
is consistent by design: a reservation of `1` beside a CC BY-SA licence would be a
contradiction someone would eventually have to resolve.

**The answer is yes and the ask is attribution.** So the same pass that granted the
permission put the citation trail where a machine can reach it — a `.md` per page,
`ATTRIBUTIONS.md` for every quotation, `/changelog` for every correction, and an Agent
Skill at `/.well-known/agent-skills/` whose main subject is how to cite this site and how
to tell a checkable fact from a reading. **Re-digest the skill when you edit it**;
`check-metadata.mjs` fails on a stale hash, because a wrong digest reads as tampering.

### SKS is read-only from here

`tools/sks-search.sh` and the `sks-search` skill search the Stimpunks Knowledge System.
**A hit is a pointer, never a citation.** Never edit SKS from a session in this repo; record
anything that needs fixing there in `DECISIONS.md` instead.

## The checks

Run before shipping. All eight are browser-free or Chrome-only; nothing needs `npm install`,
and the default path of every one of them is offline.

Regenerate first, in this order — `check-metadata.mjs` fails on any of them being stale:

```bash
node tools/make-records.mjs && node tools/make-search-index.mjs && node tools/make-markdown.mjs
```

```bash
node tools/check-markup.mjs --check      # parser-rewriting markup, duplicate ids, exactly one <main>
node tools/check-sitemap.mjs --check     # every page listed once, every entry resolves
node tools/check-contrast.mjs --check   # 7:1 in BOTH grounds and under print emulation, two tiers
node tools/check-addresses.mjs          # one address per page: a forced 301! per .html twin
node tools/check-metadata.mjs           # derived files current, JSON-LD agreeing, credit correct
node tools/check-cache.mjs              # no markup-coupled asset outliving the markup
node tools/check-overlap.mjs --check    # no text on text, on screen and on paper, nothing clipped
node tools/check-card-order.mjs --check # every grid ascends, every card agrees with the plate
```

**`--check` is load-bearing on the contrast gate and this file left it off until
2026-09-09.** Without it the tool is a report that prints its findings and exits 0, so
the whole two-tier apparatus described above shipped as advice. Verified both ways
rather than read off the source: the marigold wash below reports `FAIL — 8 element(s)`
and exits 1 with the flag, and exits 0 without it.

**`check-metadata.mjs` regenerates into memory and compares**, so staleness is exact
rather than an `mtime` guess. Its one non-freshness check is the one that matters most:
a page must not name the same person as its own `author` and as `about.author`. The
first is who wrote our reading, the second is who made the thing read, and collapsing
them tells every agent on the web that we wrote Woolf.

**`check-addresses.mjs --live` probes the deployed site**, which no other gate does. Run it
after any change to `_redirects`, because **a redirect loop is how that file fails** and a
loop is invisible offline. It asserts each twin is a single hop and not a chain.

Star Stuff has three more (`check-classes`, `check-sheets`, `check-embeds`).
**Port one when the failure it catches becomes possible here** — not before. A check that
cannot fail is a check nobody reads. `check-cache.mjs` is native and exists because the
failure happened, which is the same bar.

**`check-card-order.mjs` was ported on 2026-09-09**, and it did not clear that bar so much
as fall over it: the plate shipped `1–6, 8, 7` and a sibling nav shipped `4, 1, 2, 3`, and
all seven other gates passed both. Three things about the port are load-bearing:

- **A PORT IS A REWRITE WHEN THE ORIGINAL ENCODES AN ASSUMPTION THIS SITE DOES NOT SHARE.**
  Upstream checks ascending order *within each series*, because a collection there
  interleaves Zine and Field Guide numbers on purpose. **This site has no series** — one
  accession run, with the kind chip as a label on it. Ported unchanged, No. 8 being a Wall
  and No. 7 a Reading makes the broken plate two perfectly ascending series, and the gate
  would have certified the exact page that prompted it. Proved by patching the split back
  in and watching it report `ok`, not by reading the code.
- **The plate is the authority for a sheet's number and kind, and it is not a vote.**
  Rule 1 is only as good as the numbers it sorts. The first honest run found fifteen cards
  disagreeing with `index.html`, including `/coming-to-terms` filed as a Reading when it is
  Ryan's own essay. A majority among sibling navs would have let a fault copied onto seven
  pages outrank the one page whose subject is what the cabinet holds. Where the plate is
  silent — it does not card itself — the copies must still agree with each other, and that
  is reported once per address rather than once per page.
- **It does not check the plate against `tools/pages.mjs`, on purpose.** They agree today
  and they are two different facts: the number says when a sheet was accessioned, the group
  says the order a reader should meet the pages. Mount Sheet No. 9 and decide it reads best
  third and they diverge legitimately. Coupling them would make an editorial decision a
  build failure.

**A new card needs its number in the right place and its kind copied from the plate**, and
a new sheet needs a card on every page that cards its siblings.

**`check-overlap.mjs` was ported on 2026-09-09**, because a corner-floated accession stamp
was designed, measured and refused partly for want of it — and refusing a design for want of
a gate is a reason to build the gate. Three things about the port are worth knowing:

- **`--check` is load-bearing**, as on the contrast gate. A plain run reports and exits 0.
- **The two SVG kinds have no instance on this site** and cannot fire: there is not one
  `text` element in any page here, because *never an image of text*. They are kept because
  dropping them would stop the sweep MEASURING SVG text, so the day a sheet carries a label
  the gate would report a page it never looked at. Proved by injection, not by a real page.
- **`.qe-sr` is excluded as not-ink, and that exclusion is precarious rather than
  load-bearing.** Removing it adds 113 boxes and still reports zero — those invisible
  288×39px rects happen to miss everything on these fourteen pages. Position luck, one moved
  heading from being noisy.

**Two faults in the imported tool were found and fixed here**, and both are recorded in
`DECISIONS.md` because Star Stuff is not edited from this repo: its clip walk started at
`el.parentElement`, so an element clipping its **own** overflowing text was never a clip
host, and its `locate()` reported `page` for precisely the absolutely-positioned case the
gate exists to catch.

**It measures paper, which the upstream tool does not.** Star Stuff defers print collisions
to its `check-sheets.mjs`; this repo has no paper gate, and paper is the medium this house has
already been burned by. Three passes: screen at 1280×900, then Letter and A4 at their content
widths (the sheet less Chrome's 0.4in default margins).

- **The viewport moves, and that is the point.** `check-contrast.mjs` emulates print media at
  1280px and is right to — colour does not reflow. A collision is a position, and print sets
  `main { max-width: none }`, so measuring paper at 1280px measures a line length no printer
  produces. `/changelog` is 4,884 boxes on screen, 3,567 on Letter, 3,604 on A4.
- **Both papers**, because picking one width and calling it print is the same mistake 22px
  smaller — and those two counts show 22px is enough to rewrap a line.
- **REVEAL is undone before the paper passes**, per `reveal.mjs`'s own header. Proved both
  ways: a screen-only collision reports 7 on screen and 0 on paper, a print-only one 0 on
  screen and 3 on each paper.
- **The empty-pass guard is per pass, and it catches the original disaster.** A page whose
  print stylesheet renders nothing measures zero boxes on paper while measuring hundreds on
  screen, and is reported NOT MEASURED rather than clean. **44 of 46 pages printing blank
  would not survive this gate.**

**What it still cannot see is pagination.** Chrome's print emulation reflows to the width but
does not break the document into sheets, so a collision that exists only because two blocks
land either side of a page break is invisible. `break-inside: avoid` on `.qe-accession-block`
is there because pagination is real. Reaching it means text positions out of
`Page.printToPDF`, which is a different tool and not a flag on this one.

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
