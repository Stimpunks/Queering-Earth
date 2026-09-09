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
  **A new sheet needs a rule.** Mount it, card it, log it, file it, **route it**.

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

**`/privacy` claims there are no third-party requests, so `check-metadata.mjs` enforces
it.** A privacy policy is a binding statement of practice; a claim about this code that
only a human remembers is a claim that will eventually be false. The gate reads the
attributes that make a browser *fetch* — `link rel=stylesheet|preconnect|preload`,
`script src`, `img`, `source`, `iframe` — and **exempts `<a href>`**, because a link the
reader chooses to follow is not a request the page made. On a site that cites everything,
that distinction is the whole difference between a usable gate and a useless one.

**Identical coverage, one fewer party.** All three subsets Google served are kept, with
Google's own `unicode-range` values, so glyph coverage did not change — verified by
measuring text metrics against the still-Google-served live site and getting the same
numbers to three decimals. Neither family has a **greek** subset, so the Sappho on
`/flower-codes` renders in a system fallback and always did.

`serve.mjs` needs the type for anything the site serves. It was missing `.avif` and
`.woff2`; production sends `nosniff`, so a type this server guesses is one the live site
cannot recover from.

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
the sheet is the copy that will drift. All seven sheets carry `--mended` today, because all
seven have been corrected; the unmended state is real and is waiting for Sheet No. 8.

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

Run before shipping. All five are browser-free or Chrome-only; nothing needs `npm install`,
and the default path of every one of them is offline.

```bash
node tools/check-markup.mjs     # parser-rewriting markup, duplicate ids, exactly one <main>
node tools/check-sitemap.mjs    # every page listed once, every entry resolves
node tools/check-contrast.mjs   # 7:1 in BOTH grounds and under print emulation, two tiers
node tools/check-addresses.mjs  # one address per page: a forced 301! per .html twin
node tools/check-metadata.mjs   # derived files current, JSON-LD agreeing, credit correct
```

**`check-metadata.mjs` regenerates into memory and compares**, so staleness is exact
rather than an `mtime` guess. Its one non-freshness check is the one that matters most:
a page must not name the same person as its own `author` and as `about.author`. The
first is who wrote our reading, the second is who made the thing read, and collapsing
them tells every agent on the web that we wrote Woolf.

**`check-addresses.mjs --live` probes the deployed site**, which no other gate does. Run it
after any change to `_redirects`, because **a redirect loop is how that file fails** and a
loop is invisible offline. It asserts each twin is a single hop and not a chain.

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
