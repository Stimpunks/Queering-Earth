# Decisions

What is settled, what is open, and the reasoning for each — so the same question is not
re-litigated in three weeks.

----

## Open

### The wordmark and the tagline

The masthead currently reads **Queering.Earth** with **"Post-normal possibilities."** under
it. Both are provisional.

The tagline is Helen Edgar's own phrase from the founding brainstorm, chosen because it is
short and it is ours. The attribution question it raised is **settled** — the masthead now
credits Nick Walker, see below. The *wording* of both wordmark and tagline is still open. It replaced the working tagline
— "Subverting, defying, disrupting, and liberating oneself from all forms of normativity
(props Nick Walker)" — which is a **paraphrase of Walker wearing his name**. See
`ATTRIBUTIONS.md` for the full reasoning and for how the page handles Walker now.

Changing either is one line in `index.html`. Whatever replaces them, the paraphrase problem
does not come back: quote him exactly, or write our own line.

### Whether Helen gets a static CMS

**Deferred, with a named trigger.** Not now, for three reasons:

1. The design intent — queering the zine itself, playing with graphic font layout, each
   piece interpreting its own subject — is what a CMS structurally cannot hold. A CMS earns
   its cost when content is uniform and layout is fixed. Here the layout **is** the argument.
2. Netlify Identity's git-gateway is being sunset, so Decap or Sveltia means standing up
   GitHub OAuth ourselves, writing a schema for a content model that does not exist yet, and
   adding a build step to a site that has none.
3. The zero-cost path already works: Helen edits files in the GitHub web editor, opens a
   pull request, and Netlify posts a deploy preview URL on it. She sees the real page at a
   real URL before it goes live. Star Stuff runs 192 pages this way with no CMS.

**The trigger:** the first repeating, uniform content type — a series where every entry has
the same sections in the same order. Then Sveltia CMS, and not before.

**The question still worth asking Helen:** is the friction *publishing*, or *authoring*? If
she writes prose and a session builds the artifact around it, no CMS touches that problem.

### Which edition a sheet reads, when the work was revised

Opened by the Woolf verification below, and it is a real design question rather than a
pedantic one.

*On Being Ill* exists in two authorial states. Woolf published it in *The New Criterion* in
January 1926 and revised it for the Hogarth Press edition of 1930, which she and Leonard
printed and hand-set themselves. The revisions are not typographical. In the first paragraph
alone she changed "brings to **light**" to "brings to **view**," "uprooted in us **in** the
act of sickness" to "**by** the act of sickness," cut "**and infinitely more**," and opened
out two lists from commas into her own *and…and…and*:

| 1926, *The New Criterion* | 1930, Hogarth Press |
|---|---|
| with love, battle, and jealousy | with love and battle and jealousy |
| is null, negligible and non-existent | is null, and negligible and non-existent |

**So the label's "date of the original" is not one field for a revised work.** A sheet that
mounts *On Being Ill* is mounting one of two texts, and the date, the wording, and the
publisher move together. Three ways to handle it and none is obviously right yet:

1. **Name the edition on the label** and quote only from it — the cheapest, and it makes the
   choice visible instead of silent.
2. **Read the revision itself as the subject.** A writer opening her commas into *and…and…and*
   between one printing and the next, four years later, in type she set with her own hands, is
   a queering of her own sentence. That is a sheet, not a footnote.
3. **Show both**, side by side, and let the reader do the work. Riskiest to lay out, most
   honest to the material, and the most "no hard facts for everything" of the three.

Worth settling with Helen, because it decides what the Woolf sheet *is*.

**A second sheet has now hit the same question, 2026-09-08.** `promises-like-pie-crust.html`
mounts Rossetti's *Promises like Pie-crust*, whose 1896 first printing has a **colon** at line
20 where every circulating copy has a full stop. Both sheets ended up doing **1 and 2 together**:
name the printing on the label, quote only from it, *and* make the difference between printings
a section of the sheet. Two for two is a pattern, not yet a rule — but the next sheet that reads
a revised or posthumously-printed work should assume this is the house answer unless Helen and
Ryan decide otherwise, and option 3 (both texts side by side) still has no worked example.

Rossetti's case adds a wrinkle Woolf's did not have. Woolf revised her own text, so **both**
states are authorial and the question is which of her two you mean. Rossetti died before the poem
was printed at all: the 1896 text is her brother's transcription of her notebook, so the earliest
printing is not certified to be her hand, and the sheet has to say so rather than resting the
finding on "the older text wins."

### Woolf's "resonant and porous" line, on More Realms

Still open, and still not ours to fix. [Monotropa Uniflora and Monotropism](https://morerealms.com/monotropa-uniflora-and-monotropism/)
quotes Woolf's mind as "resonant and porous… naturally creative, incandescent and undivided,"
attributed to Woolf 1929 *as cited in* Popova 2021 rather than to *A Room of One's Own*
itself. A primary cited to a secondary is the exact shape `ATTRIBUTIONS.md` exists to catch.
Hers to correct on her own site; ours to check against the book before any sheet reuses it.

----

## Settled

### Addresses on this site are extensionless (2026-09-07)

`https://queering.earth/on-being-ill`, not `/on-being-ill.html`. The file on disk is still
`on-being-ill.html` — only the address changed.

**Why the question came up.** Netlify's **Pretty URLs** post-processing is on by default and
rewrites internal links to strip `.html`, so the served page said `href='/coming-to-terms'`
while the repo said `href="coming-to-terms.html"` and every canonical tag and sitemap entry
said `.html`. The site linked to one address and declared a different one canonical. Found by
reading the served page rather than the repo, while checking that the sibling nav had deployed.

Two ways out were on the table: turn the setting off, or adopt what it produces. **Ryan chose
to adopt it.** So canonical tags, `og:url`, `sitemap.xml`, and every internal link now say the
extensionless form, and the repo describes what Netlify actually serves. Nothing is rewritten
on the way out any more, because there is nothing left to strip.

**What this costs.** The filename and the address no longer match, which the "every page is a
file at its own path" line in `CLAUDE.md` used to be able to claim literally. That line now says
so explicitly rather than leaving the next session to discover it.

**`tools/check-sitemap.mjs` enforces it.** A `<loc>` carrying `.html` now fails instead of
passing quietly by resolving to a real file — verified by putting one back and watching it
fail. `tools/serve.mjs` needed no change: it already retried `<path>.html` for clean URLs, with
a comment saying why.

**Still true, and fine:** `/on-being-ill.html` also answers 200. Nothing links to it and its
canonical points away, so it is an unlinked alias rather than a competing address. Forcing it
to 301 would take one `_redirects` line per sheet, which is a per-sheet chore forever; not
worth it unless the alias starts showing up somewhere it matters.

### Sheets link to each other, outside `<main>`, with less on the card (2026-09-07)

Until now a sheet's only internal link was `/`. A reader arriving on the Woolf sheet from a
search result had exactly one way onward: back to the plate. Each sheet now ends with
**Elsewhere on the plate**, carrying the other sheets as the plate's own cards.

Two decisions inside that, both of which would be easy to get wrong later.

**It sits outside `<main>`.** Not tidiness — the SKS mirror takes page content from the
`<main>` landmark *and nowhere else*, deliberately, so that navigation furniture is not
indexed as content. A sibling card inside `main` would index "Coming to Terms" as part of the
Woolf sheet, in the mirror and in anything built on it. `tools/check-markup.mjs` cannot catch
this: the markup is valid and the landmark is correct. The comment in the markup says so at
the point where somebody would move it.

**The sibling cards carry kind, number, and title — no description.** The plate is the record;
these are a reference to it. With two sheets that reads as restraint. At ten it is the whole
point: repeating each card's description on every other sheet is ninety copies of a sentence
free to drift from the one on the plate, which is the *two copies drift* failure the plain-view
rule exists to prevent, wearing a different hat. Titles duplicate, and a title is already
repeated in the target's `<title>` and `<h1>`, so it is the one string the site cannot avoid
holding twice.

**`auto-fill`, not `auto-fit`.** With a single sibling, `auto-fit` collapses the empty track and
stretches one card across the whole measure, which reads as a banner. `auto-fill` keeps the
track and the card keeps its size. The plate itself stays `auto-fit`, because there two cards
*should* fill the width.

What this does **not** do is give each sheet its own mark. That was the other reading of the
suggestion that started this, and it is deferred: a per-sheet emblem is ornament until a reader
needs to tell sheets apart at a glance rather than by reading the title, which is five or six
sheets away. Every mark is then a hand-drawn asset forever, so it should be earned first.

### The plate uses Star Stuff's card class names, on purpose (2026-09-07)

`index.html` now mounts the sheets as numbered cards. The box is `<div class="card-wrap">`
and the link is `<a class="card">` — **Star Stuff's names, deliberately adopted**, which
reverses this repo's standing default of not importing its habits.

The reason is narrow and it is the same test `CLAUDE.md` sets for porting a check: the failure
became possible here. `tools/check-markup.mjs` already carries a card-wrap rule — it came over
with the file — and until this commit it could not fire, because there were no cards. It
guards the failure that shipped twice on Star Stuff: a new wrap opened before the previous one
closed, so the second card renders *inside* the first card's box, sharing one border. Valid
markup, invisible to every other check.

Writing our own class names would have produced a lookalike the guard cannot see, and the
guard is `div`-and-class-specific by design. **Verified live rather than assumed**: nesting
the second wrap made `check-markup` fail with both the nested-wrap message and an unclosed-wrap
message, and restoring it went quiet. A check nobody has seen fail is a check nobody trusts.

Two smaller things settled with it:

- **The cards are a `<ul>`**, with the guarded `div.card-wrap` inside each `<li>`. Screen
  readers announce "list, 2 items"; the guard counts divs and is indifferent to the list.
- **`minmax(12.5rem, 1fr)`, not 14rem.** The measure leaves 452px inside the gutters and two
  14rem tracks plus the gap need 466, so at 14rem the plate silently collapsed to one column at
  *every* window size — a stack, which is a list, not a plate. It looked deliberate. Found by
  reading the computed `grid-template-columns` in the browser rather than by looking at it.

### The masthead credits Nick Walker for the phrase (2026-09-07)

Our tagline is **"Post-normal possibilities."** Walker's book is *Neuroqueer Heresies: Notes
on the Neurodiversity Paradigm, Autistic Empowerment, and **Postnormal Possibilities***. One
hyphen apart, on a site that quotes him on its home page, about the subject of his book.
Found while building the *Coming to Terms* sheet, in our own glossary entry for *neuroqueer*,
and verified against neuroqueer.com.

**Ryan's call: credit him, on the masthead.** It now reads *after Nick Walker*, linked to the
book, with the full explanation in the "Queering is a verb" section where Walker already
appears.

**Why crediting was the right of the three options.** Helen may well have arrived at the
phrase herself — she wrote it in the founding brainstorm — and *post-normal* has a genuine
separate lineage in post-normal science, coined by Silvio Funtowicz and Jerome Ravetz in
"Science for the post-normal age," *Futures*, September 1993 (checked 2026-09-07, so the file
no longer carries that as an unverified aside). None of that makes the collision invisible.
The page therefore says the true and generous thing — *he published it first* — and claims
nothing about the route the phrase took to get here.

**The wording on the page is deliberately "after."** Not "his phrase," which would take the
coinage away from Helen, and not silence, which was the option that stayed defensible only
until somebody noticed the subtitle. *After* is the form poetry uses for exactly this, and it
is the only one of the three that is true no matter which way the origin actually ran.

This settles the attribution question and **not** the wording of the tagline itself, which
stays open above as Helen's and Ryan's.

### A sheet is a reading or an essay, and the label flexes (2026-09-07)

The model settled below assumed the specimen is somebody else's — Woolf's essay, a painting, a
word. *Coming to Terms* is Ryan's own essay, so there is no external specimen to mount, and the
question is whether that needs a second page type.

**It does not.** It needs the label to flex, which a description list does for free:

| a reading | an essay |
|---|---|
| Specimen, Maker, This text | Written by, Written, First published |
| Read / Read by | This text / Terms |

The kicker above the title says which — "Sheet · a reading" or "Sheet · an essay" — and that
is the whole distinction. Both are sheets, both carry a label, both keep our words and other
people's visibly apart. On an essay the specimen is simply the terms it is about, which for a
herbarium site is the right shape anyway: a word collected, pressed, and compared against
others until one of them fits.

**One rule the essay case adds.** When a sheet reprints something published elsewhere, the
label says what was changed. *Coming to Terms* drops the block quotations from other writers
that the original carries, so its label says so and says the author's own words are unchanged.
An unmarked edit of our own published text is the same failure as an unmarked edit of somebody
else's — the site just happens to be the injured party.

### What Queering Earth is for: a reading becomes an artifact (2026-09-07)

**More Realms is where Helen thinks in prose. Queering Earth is where a reading becomes an
artifact** — the sheet interprets its own subject, which is the one thing a WordPress
template structurally cannot do and a hand-built page can.

Ryan's call, and explicitly provisional: *at least to start, and we are not sure of the shape
yet.* Recorded because it unblocks the second sheet, not because it is final. If it turns out
that the artifact-making is not what distinguishes the two sites, this is the entry to come
back and overturn.

### The label carries a byline, and the byline names who read it (2026-09-07)

Helen's voice and Ryan's voice, individually, and occasionally both. So the byline is
per-sheet and it is a name, not an institution — "Helen Edgar," "Ryan Boren," or both, on the
label of the sheet they read.

This is the house voice's rule applied in the type rather than in a policy: name whose "we"
you are centering. It also means a sheet may be written in the first person singular, which
Star Stuff never is, and that difference is a feature of this site rather than a lapse.

### The label carries dates — starting with the date of the reading (2026-09-07)

Undecided in principle, decided in practice: **start with the date in the label.** A date is
one line to add now and a guess to retrofit later, so the cheap direction is to have it.

A site about re-reading should show that a reading happened on a day, and that another day
would have produced a different one. What the label does about the *original's* date when a
work was revised is a separate and now-open question — see above.

### The content model: a sheet mounts a specimen and carries our label (2026-09-07)

**A piece is a sheet. The specimen is what it mounts. The label is what we say.**

The herbarium distinction is load-bearing, not decorative. The **specimen** is the thing
collected and it is somebody else's — Woolf's essay, Brontë's novel, the Rothko, the word.
The **sheet** is our page. The **label** is the small block of type where we speak, and it
is explicitly ours: subject, maker, date of the original, date of the reading, and who read
it. Everything below the label is free, because the sheet interprets its own subject — the
design intent Helen actually named in the brainstorm, and the reason a template was never
going to hold this site.

That split also does the attribution work `ATTRIBUTIONS.md` exists to force. Their words sit
in the specimen. Ours sit on the label. The line between the two is drawn in the layout
instead of being left to a reader's good faith.

Concretely: flat paths at the repo root, `on-being-ill.html`, no prefix and no type suffix.
The index is a plate — cards laid out like a Victorian specimen sheet, which is already the
home page's visual language. `.qe-specimen` and `.qe-specimen-label` are in `queering.css`
today, screen and print rules both, so the vocabulary and the stylesheet are the same
argument.

**No collections yet, and the trigger is named.** Helen already writes in sequences — the
*Re-worlding Neurodiversity* / *When the Ecology Fractures* / *Autistic Burnout Recovery*
run is Parts 1 through 3 — but she names them *afterward*, once Part 1 is already published.
Declaring a collection at n=1 is a promise on the page that nothing has been written to keep
yet, and an unfilled run reads as abandonment rather than as patience.

> **The trigger: the third sheet that shares a lens.** Then a run, and not before.

Note that this is the *same* trigger as the CMS question above, seen from the other side: a
run is the first repeating, uniform content type. When we add one, Sveltia comes up for
discussion in the same week. That is not a coincidence to be surprised by later.

**Print: no separate print artifact.** Star Stuff has nine broadsides because it has 101
zines and an earned print practice. Here the paper version is not a translation of the web
page — a herbarium sheet is *already* a printed object, so the sheet is the native form and
the screen is the preview. The `@media print` block in `queering.css` is the print form, and
`tools/check-contrast.mjs` measures it. Revisit when there is a specific sheet somebody
wants to hand to a person.

**What we rejected, and why it is written down.** Two other shapes were real candidates.

- **Runs from day one**, using Helen's own verb — *reiteration*, from the brainstorm. Right
  about where this ends up and wrong about when, for the reason above. Its vocabulary is
  kept in reserve.
- **Six drawers** — *art · literature · poetry · politics · people · history*, which is
  Helen's own line from the brainstorm read as a taxonomy. Rejected twice over: six drawers
  and one page is five visible promises we are not keeping, and a browsable taxonomy is the
  most conventional move on offer from a site whose whole question is who decides the
  categories. It also forces single filing on a piece like *On Being Ill*, which wants
  Literature and People and Politics at once.

**And Star Stuff's taxonomy was not imported.** Zine, field guide, broadside, collection,
glimmer wire — 101, 24, 9, 16, and a dated dispatch. That vocabulary was earned across 195
pages. Adopting it here would be inheriting the answers to questions this site has not asked.

**One caveat, stated rather than buried.** "Specimen" pins things, and mounting a Disabled
woman's essay on illness to a card is worth saying out loud. The specimen/label split is
what makes it sit right: we are not pinning Woolf, we are mounting her essay and signing our
own reading. If it still reads wrong to Helen, *reiteration* is the fallback noun and the
structure survives the swap unchanged — the model is the split, not the word.

**Settled pending Helen's read of the noun.** The structure is decided. The vocabulary has
one open substitution in it.

### `queering.earth` is not registered — build anyway (2026-09-07)

`whois.nic.earth` returns "No Data Found". Registering it is Ryan's, and a purchase. Nothing
else waits on it: the site deploys to its `.netlify.app` hostname and the domain attaches
later.

**Two things must NOT be switched on until the domain resolves.** The host redirect in
`_redirects` would send the only working address to one that does not answer — a site that is
simply down. And adding this domain to the SKS mirror's `SITES` map would fail that sync,
because the mirror fetches over the network.

### Netlify: continuous deployment from the repo, matching Star Stuff (2026-09-07)

Project `queering-earth` on the Stimpunks team (id `4115815c-5811-4df6-8f6f-9598e85d2d72`),
wired to `Stimpunks/Queering-Earth` on `main` through the same GitHub App installation Star
Stuff and Cavendish Cards use. No build command, no publish subdirectory — the repo root is
the site, exactly as Star Stuff is configured.

**Deploy previews on pull requests are left on**, and that is the point rather than a
default: it is the review path for anyone editing through the GitHub web editor, and it is
the reason the CMS question above can stay deferred. A pull request produces the real page at
a real URL before anything reaches `main`.

`.netlify/` is git-ignored — it holds the local link state, not configuration.

**Creating the project through the Netlify API does not wire continuous deployment, and
nothing you can do from the API fixes it.** `createSiteInTeam` with an `installation_id`
produces correct build settings and a working first deploy — Netlify clones through the
GitHub App fine — and then no webhook, no deploy key, and no Netlify-side
`github_app_checks` hooks. Pushes are ignored while the dashboard shows a green light and
"Auto publishing is on" above a commit several pushes stale. It looks exactly like success.

Three things were tried and none of them work:

1. **`updateSite` with the repo block again.** Leaves `deploy_key_id: None` and zero
   Netlify-side hooks. It *does* kick a one-off build of current `HEAD`, which is a trap of
   its own — that stray deploy looks like the link repairing itself.
2. **A hand-made GitHub webhook** pointed at `https://api.netlify.com/hooks/github`, matching
   Star Stuff's exactly (JSON, seven events, no secret). GitHub delivers, Netlify answers
   **204 OK**, and builds nothing. Verified twice: a push delivered at 23:29:59 had produced
   no deploy six minutes later. Netlify only honours a hook it created and recorded on its
   own side.
3. Concluding anything from a short poll of `netlify api listSiteDeploys`. It lags, and it
   lags by minutes. Give it three before calling a push ignored.

**The only fix is `netlify init --force` in this repo**, answering *Authorize with GitHub
through app.netlify.com*, then an empty build command and `.` as the deploy directory. It
provisions the webhook, the deploy key, and the status-check hooks together. It needs a
browser OAuth grant, so a human runs it once.

**How to tell a wired project from a deaf one** — the dashboard will not tell you:

```bash
gh api repos/Stimpunks/Queering-Earth/hooks --jq 'length'
netlify api getSite --data '{"site_id":"4115815c-5811-4df6-8f6f-9598e85d2d72"}' \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["build_settings"]["deploy_key_id"])'
```

Star Stuff answers `1` and a key id. A `0` and a `None` mean pushes are going nowhere.

### The look: daylight herbarium, not green Star Stuff (2026-09-07)

The strongest differentiation from a night-sky site is not the same site in green — it is the
other end of the day. Warm vellum ground, dark ink line art, jewel accents, specimens laid
out like a Victorian plate. It matches the antiquarian-sticker-book reference Helen named,
and it makes the two sites unmistakable at a glance. Recorded as a rule in `CLAUDE.md`.

### Fraunces as the display face (2026-09-07)

Fraunces carries a `WONK` axis — letterforms that deviate from the norm, exposed as a
setting. A site about queering normativity setting its masthead with the deviation axis
turned up is the argument made in the type. Body face is Newsreader. Both are Google Fonts
variable families with real fallback stacks.

### Plain view is a class, never a second page (2026-09-07)

Helen asked for "a plain access version if doing that." Built as `html.plain` toggling a
stylesheet over one document, with the stored preference applied inline before first paint.
The alternative — a decorated page and a separate accessible page — drifts, and the
accessible copy is always the one that rots.

### Three guard scripts ported from Star Stuff, five left behind (2026-09-07)

`check-markup`, `check-sitemap`, and `check-contrast` came over and pass on `index.html`.
`check-classes`, `check-overlap`, `check-sheets`, `check-embeds`, and `check-card-order`
did not: they catch failures this site cannot yet have. Port one when its failure becomes
possible. A check that cannot fail is a check nobody reads.

### `serve.mjs` roots at the repo, not at `process.cwd()` (2026-09-07)

Star Stuff's copy serves whatever directory it was started from, so a wrong-directory run
looks exactly like a site with every page missing. This copy derives its root from the
script's own location.

### Verse gets a shared component, and every line is its own element (2026-09-08)

Added for the Rossetti sheet. `.qe-poem` lives in `queering.css` rather than in the page,
because poems are going to recur here and the second one would otherwise copy the first one's
CSS and then drift from it.

**A poem's line breaks are the object being mounted.** Reflowed into prose it is a different
poem, so the component does three things a `<blockquote>` would not:

1. **Every line is a `<span class="l">` set to `display: block`.** Not a `<br>`-separated run.
   Two reasons. A `<br>` interleaved among spans breaks `nth-child` counting, so an indent
   driven by an even/odd rule silently re-indents the whole poem the moment somebody adds or
   removes a line — the indent is a class the markup states outright instead. And a run broken
   only by `<br>` gives a wrapped long line nothing to hang from.
2. **A hanging indent on every line**, so that a line too long for the measure is visibly a
   wrap and can never be mistaken for a line the poet wrote.
3. **`.l-in` reproduces the source printing's alternating indent.** That class is a fact about
   the 1896 setting and nothing else — see `ATTRIBUTIONS.md`. It is not a decorative rhythm to
   apply to any poem.

**The type steps down at narrow widths, and this is the one place on the site it may.** Seven
of Rossetti's twenty-four lines wrapped on a 375px viewport at the body size, and a poem read
at that ratio is being read as prose. `.qe-poem .qe-stanza` drops to `0.98em` under 26rem, which
fits all twenty-four. It is a relative size, so browser zoom still scales it, and the hanging
indent remains as the safety net when a longer poem needs it. Verified: 24 lines, 0 wraps,
no horizontal overflow, at 375px and at desktop.

Stanzas get `break-inside: avoid` on paper. A stanza split across a page break is the one thing
this component must not do.

### A sheet is titled from a phrase in the specimen (2026-09-08)

`on-being-ill.html` is "The Army of the Upright". `promises-like-pie-crust.html` is
"The Die Uncast". Both titles are lifted from the work being read; both filenames name the work
instead. That split is now deliberate and worth keeping: **the filename is the address a reader
searching for the source will guess, and the title is what the sheet found in it.** An essay
written by us is titled by us — `coming-to-terms.html` is "Coming to Terms" — so the convention
only applies to a reading.

### The header art is Art Nouveau, and it took Helen three notes (2026-09-08)

The Rossetti sheet's drawing was rebuilt twice after review, and the reasons are worth keeping
because the first version looked *fine* and was wrong.

**v1 — five upright stems, evenly spaced, on one flat baseline.** Each plant separate, no
shared stem, one colour each: the argument of the sheet drawn literally. Helen: *"can we have
squiggles and swirly bits so it isn't all linear? may be add some mushrooms or something"*.
She was right, and it was a **fault, not a preference**. A sheet whose thesis is
"counter-narratives following their own rhythms and temporalities" had a drawing in military
formation at the top of it. No guard can catch that; the markup was valid and the tokens were
correct.

**v2 — scattered, coiled, with fungi.** Different root heights, fern croziers, tendrils, three
mushrooms. Better, still built out of upright stems.

**v3 — Art Nouveau, and the real answer.** Helen's brief: *"ornate swirling botanical style,
with flowing curved vines, spiraling tendrils, and organic scrollwork instead of straight or
geometric lines… asymmetrical, flowing composition… delicate filigree-like branches winding
around… no rigid or angular shapes. Not linear — alive, sprouting in all directions with
flow."* What that actually required:

1. **No baseline and no roots.** One whiplash vine enters at the lower left and sweeps up
   across the panel; everything else hangs off it. There is no ground to stand on, so nothing
   can line up.
2. **Every terminal curls.** Vines, tendrils and scrolls all end in a spiral turning back on
   itself. A curve that merely stops is the thing this drawing is not.
3. **The shapes had to change too, and this is the part that nearly got missed.** The flowing
   linework landed in v3 while the *flowers and mushrooms were still v1's* — six-ellipse
   daisies and flat domes on sticks with one horizontal rule for gills. Against sinuous vines
   they read worse than they had against straight stems, because now they were the only rigid
   things on the panel. Blooms are five sinuous petals at uneven spacings; caps have an
   undulating margin over a tapering bent stipe; `.gills` was deleted outright. **A style note
   about line is also a style note about form.**
4. **A taller canvas.** 560×260, up from 434×156. Filigree needs vertical room or the curls
   close into blobs.

**The motion model needed no change and got better.** Every vine, tendril and volute is a
`.stem`, so it draws itself on, and a long S-curve unrolling is what that animation was always
for — v1's short uprights were the hard case, not this. Leaves, blooms, fungi and moths are
`.sprout` groups. Verified after the rebuild: 16 stems, 28 sprouts, plain view shows the
complete drawing with nothing hidden and no dash offsets, and the only `opacity: 0` in the
stylesheet is inside `@keyframes qe-unfurl`, which reduced motion never runs.

**`--len` is measured, not estimated.** Each path's `--len` is its real `getTotalLength()`,
read out of the live DOM and written back. A declared length shorter than the actual one turns
the dash into a repeating pattern and the vine draws on with gaps in it — three paths were
short on the first pass and it is invisible in the finished state, only in the animation. **If
you edit a `d`, re-measure that path.**

### Landscape plates wanted `.qe-plate-wide`, and then did not (2026-09-08)

Added and removed the same day, and worth recording because the next landscape plate will want
it back. `.qe-plate` caps at 23rem, which is right for a portrait plate and useless for a
landscape one: Darwin's Bryonia tendril was 1000px of fine woodcut across 520px of height, and
at 350px wide its two counter-turning spirals closed into a smudge. `.qe-plate-wide` raised the
cap to `var(--qe-measure)` and no further — the reading column stays the limit on this site.

Then the two black-and-white Darwin woodcuts came off the sheet (see below) and it had no users
left. **A CSS modifier nobody applies is dead code, the same way a guard that cannot fail is a
check nobody reads**, so it went. If a landscape plate ever lands here again, the rule is one
line: `.qe-plate-wide { max-width: var(--qe-measure); }`.

### Colour over subject matter for mounted plates (2026-09-08)

The Rossetti sheet first mounted two Darwin tendril woodcuts, chosen because the sheet's
argument is about holding on without merging. Ryan: *"The black and white tendril illustrations
are a little underwhelming. Let's drop the tendril requirement and go for colour."* He is right
about the page. A herbarium sheet in daylight is a **colour** object, and two grey rectangles of
1876 line-block sat on it like photocopies — the site's own model was arguing against them, and
no amount of subject-matter aptness fixes that.

**What replaced them:** three chromolithographs from *Annales Musei Botanici Lugduno-Batavi*
volume 1 (1863), picked by Ryan off the BHL Flickr stream. All three are Emrik & Binger of
Haarlem, each with a different draughtsman, and they sit on the vellum as if they were always
meant to.

**The lesson generalises, so it is written down here rather than left in a commit message:**
on this site the plate is chosen for how it looks on the sheet first and for what it depicts
second. An illustration that has to be explained before it earns its place is not earning its
place. **The idea can survive as prose** — Darwin's reversed spiral is still on the sheet, still
credited, still doing the same work, quoted and linked instead of mounted, and the section reads
no worse for it.

### The paste-up: a zine wall in a herbarium register (2026-09-08)

Ryan, briefing the Wyrd sheet: *"For this piece, play with the typography. Take inspiration
from Zine walls."* The risk in that brief is obvious — a photocopied flyposted wall and a
Victorian specimen sheet are not the same object, and grafting one onto the other gets you
Star Stuff with grain on it, which is the palette rule's failure mode wearing a different hat.

**What made it work was noticing they are the same object.** A zine wall and a herbarium sheet
are both things cut out, laid down at an angle, and fixed where they overlap. One uses masking
tape and the other uses gummed linen strips. So the new section in `queering.css` builds the
wall out of furniture the site already owns — the card, the rule, the accent colour that is
already the tape on a plate card — rather than importing a second visual language.

Three components, all of them CSS over ordinary semantic HTML:

- **`.qe-wall` / `.qe-slip`** — a grid of tilted `<figure>`s, each a short quotation with its
  citation, with a tape strip in an accent token. Used twice: four hands on the Weird Sisters
  across 435 years, and three findings on Autistic joy.
- **`.qe-drift`** — an `<ol>` of three states of one word. It is the essay's spine as an
  object.
- **`.qe-cutup`** — a ransom-note line of scissored words, used once, for the labels that get
  pasted onto people who do not fit.

**Rotation is stated per element in the markup as `--rot`.** Same reasoning as `.qe-poem .l-in`:
an `nth-child` rule silently re-angles the whole wall the moment a slip is added or removed, and
a slip's angle is a fact about that slip.

**`.qe-cutup` uses inline-block, not flex, and that is load-bearing.** With flex items the
words look identical and copy out — and get mirrored into SKS — as `oddifficultimmature`.
Inline-block keeps the whitespace between them as real text nodes.

**No new motion.** The site's one motion idiom is growth, and slips settling onto a wall is a
different idiom. The header drawing animates; the wall does not. Adding a second motion
vocabulary for one page is how a design system starts to have dialects.

### The third slip is set in the reader's system face (2026-09-08)

In `.qe-drift`, the two older states of the word are Fraunces with the WONK axis on. The third
— *weird* meaning "odd-looking, strange, disturbingly different", from about 1820 — is
`.qe-drift-word--flat`, set in `system-ui`. When the word stops meaning fate and starts meaning
deviation, it is being spoken by an institution, and an institution's typeface is whatever the
form was printed in.

It is the one place on the site where a hardcoded font stack is deliberate rather than a
mistake. The joke disappears in plain view, where every face is that face, and **that is
correct**: plain view drops decoration, and this is decoration. The slip's own gloss says out
loud what the typography is doing, so a reader who cannot see it is not missing the argument.

### The measure held, and the drift rail became a column (2026-09-08)

The rail wants to be read across, as a timeline. Three states across the 448px measure give
136px each, which is not enough for the gloss under each word; two across gives an orphan.

The tempting fix was a third exception to the measure — `main` is capped at `--qe-measure`, and
only the masthead and the provocation break it today. **It was not taken.** The rail runs down
the sheet instead, at `minmax(16rem, 1fr)`, which inside 448px is always one column. It is still
a sequence; that is what the `<ol>` is for. One fewer exception is worth more than one better
timeline.

**Related, and caught by measuring rather than by looking:** `.qe-wall` first shipped at
`minmax(13.5rem, 1fr)`. Two 13.5rem tracks plus the 1.25rem gap need 452px and the measure gives
448, so the wall silently collapsed to **one column at every window size** — a stack of slips,
which is a list, not a wall, and it looked deliberate. This is the identical failure the plate
grid shipped at 14rem, already recorded above. Found the same way, by reading the computed
`grid-template-columns` in the browser. It is now 12.5rem, the same number the plate grid landed
on, for the same arithmetic.

### The Wyrd sheet mounts no plate (2026-09-08)

Every sheet so far carries at least one BHL chromolithograph. This one carries none, and that is
a choice rather than an omission. **The paste-up is the image.** A Victorian botanical plate
dropped into a page whose argument is being made by tilted paper slips and cut-out words would
be competing with it, and "colour over subject matter" (above) is a rule about which plate to
pick, not a requirement that every sheet have one.

If a plate is added later, it wants to go in *The child they said was swapped* and it wants to be
fungi — a fairy ring is a mushroom ring — and it should be picked off the BHL stream the way the
others were rather than hunted to fit the argument.

### The Wyrd sheet's byline is Helen's, and the label carries the caveat (2026-09-08)

Ryan: *"Give the byline for this essay to Helen."* The sheet does. But most of the sentences on
it were not written by her — it is built out from her More Realms essay, with her published
sentences quoted and linked and the rest new.

**So the `This text` row of the label is not decoration.** It reads: *Helen's published
sentences appear as quotations, marked and linked; the sheet around them is new, and hers to
sign.* A byline plus unmarked new prose is exactly the paraphrase-as-quotation failure at page
scale, and this row is the thing that keeps it honest. See `ATTRIBUTIONS.md`. **The sheet wants
Helen's read before it reaches `main`.**

### Bek-Pedersen's conclusion stayed on the sheet (2026-09-08)

The Weird Sisters section quotes Karen Bek-Pedersen's transcriptions of Holinshed, the First
Folio and Theobald. Her own argument is that Shakespeare wrote *weyward* on purpose, that his
three women are witches rather than Fates, and that Theobald's 1733 emendation "bypasses
Shakespeare altogether" — which is inconvenient for a sheet about reclaiming the Weird Sisters.

It is quoted anyway, twice, and it gets its own item in *What this sheet will not tidy*.
**Taking a scholar's evidence and leaving her conclusion behind is the worst version of the
paraphrase failure, because every individual quotation is exact and the page still lies.**

### An open item for a session in the SKS repo (2026-09-08)

Not to be fixed from here. The brief for this sheet carried the citation *Wassell, E. (2025).
Experiences of autistic joy. Disability & Society, 41(3), 1–26.* The article's own first page
gives **41(1), 236–261, 2026**; 2025 is the online-first date and "1–26" is the page range of
an unpaginated online-first PDF. Both the issue and the pages are wrong.

Queering Earth's own copy is corrected. If that citation is sitting in SKS notes, on
stimpunks.org, or in anything of Helen's, it wants the same correction — from a session in that
repo.
