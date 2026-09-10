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
  and **group it** — `tools/pages.mjs` is the one place the page order lives, and
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
  - **`queering.js`** — the view controls (plain view, and the ground) and the
    contents list. **`queering-search.js` is a third file, loaded only by `/search`**,
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

### Motion is growth, and it is gated

Botanical art draws itself on — stems first, then leaves and wings unfurling. All of it sits
inside `@media (prefers-reduced-motion: no-preference)`, so the reduced state is the
**finished drawing**, never a missing one. Never put an `opacity: 0` outside that query.

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

**`tools/html.mjs` and `tools/pages.mjs` are shared, and that is the point of them.**
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
the sheet is the copy that will drift. All eight sheets carry `--mended` today, because all
eight have been corrected — Sheet No. 8 was predicted to arrive clean and did not. **The
unmended state has still never shipped**, so it is the state to check by hand when a sheet
is mounted, not one you can copy off a neighbour.

Four kinds of entry, each with one accent token spent on a rule and **never on the letters** —
`Mounted`, `Re-determined`, `Label corrected`, `Cabinet`. Group by accession, not by commit: a
sheet, its corrections, and the CSS it needed are one dated entry. See `DECISIONS.md` for why
it is a register rather than a list of releases.

### Addresses are cheap; a contents list is furniture

**These are two separate decisions and the first version of this rule conflated them.**

- **Every `<h2>` on every page gets an authored `id` and a `.qe-anchor`.** No threshold. A
  section a reader cannot link to is a section nobody can cite, and the register was italicising
  three home-page section names it had no way to reach.
- **A contents list goes only on a page long enough to want one**, and the page declares that
  by including the container. Six pages have one; five do not.

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
  section marks and its addresses, and gets `.qe-sheet-index` instead — see below.

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
| **The founding papers** | why this cabinet exists and what it is for — stance | *not built; nothing in it yet* |
| **The cabinet itself** | how it is made, recorded, searched, and what it knows about you | `/design`, `/changelog`, `/search`, `/privacy` |

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

**The four links left the home page's footer and no other page's.** On the home page they
are two paragraphs above it; everywhere else the footer is still the way there.

**The target is the line, not the letters.** A `<dt>` that is entirely a link is not an
inline link inside a sentence, so WCAG 2.5.8's inline exception does not cover it. Padding
takes each to 45px and it is netted out of the spacing scale — see the hit-area rule above,
and **measure a new entry**, because no gate here does.

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

```bash
node tools/check-markup.mjs             # parser-rewriting markup, duplicate ids, exactly one <main>
node tools/check-sitemap.mjs            # every page listed once, every entry resolves
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
