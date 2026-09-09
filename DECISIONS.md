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

### Three quotations on More Realms, checked because a sheet reused them (2026-09-09)

**Not ours to fix, and now specific enough to be fixable.** The open Woolf item that stood here
since 2026-09-08 said "ours to check against the book before any sheet reuses it." Sheet No. 8
reuses it, so it got checked, along with everything else on the page it follows. Ryan supplied
*A Room of One's Own* and *The Letters of Emily Dickinson*; the results split three ways.

**1. Woolf's "resonant and porous" — the wording is right. Closed.** Verified in the book
(chapter VI, pp. 148–149, Hogarth 1929). The phrase is Woolf's, the ellipsis is honest, nothing
was tightened. The only fault was citing it to Popova rather than to Woolf, and our sheet cites
the book. **One nuance we kept and she may want:** the sentence is Woolf guessing at what
*Coleridge* meant, and it is hedged twice — "Perhaps the androgynous mind…", "He meant,
perhaps…". Quoting from "the androgynous mind is resonant and porous" quietly promotes a
speculation to a definition.

**2. The Mary Oliver epigraph is in the wrong book and is trimmed. Open, hers.** It appears on
at least two More Realms posts (*Monotropa Uniflora and Monotropism*, *Mossy Minds &
Monotropism*) and on autisticrealms.com, as *"Attention without feeling, is only a report."* —
Mary Oliver, *Upstream: Selected Essays* (2016). It is **not in *Upstream***; Ryan owns it and
looked. It is in ***Our World*** (Beacon Press, 2007), and the full passage is *"Attention
without feeling, I began to learn, is only a report. An openness — an empathy — was necessary
if the attention was to matter."* Three words gone from the middle, and the whole second
sentence gone — the sentence that says what attention needs instead. **The quotation as it
circulates states the problem and drops the answer.** Full working in `ATTRIBUTIONS.md`.

**3. The Dickinson letter has drifted three characters. Open, hers, and very minor.** Against
Letter 997 in the *Letters*: a dash where there is a full stop, `child` for `Child`, and an
inserted `the` in "enhances the mystery". Nobody did it on purpose; it is what happens to a
quotation copied from a copy. It is worth a line only because the sheet's subject is that
Dickinson's punctuation and capitals were regularised by her editors, and this is the same
drift, on the same writer, in a friendly source, in 2026.

**Where these live, for a session in the More Realms repo:**
`site/morerealms-com/posts/monotropa-uniflora-and-monotropism.md`,
`site/morerealms-com/posts/mossy-minds-monotropism.md`,
`site/autisticrealms-com/posts/mossy-minds-monotropism.md`, and the "resonant and porous"
citation also appears in `neuroqueering-time-bergson-deleuze-and-monotropism-an-exploration.md`
on both her domains. **Never edited from this repo.**

----

## Settled

### check-overlap is ported, and two faults in it were found on the way (2026-09-09)

Ported from Star Stuff because a corner-floated accession stamp was designed, measured and
**refused** partly because nothing here could see it land on the prose. Refusing a design
for want of a gate is a reason to build the gate, and the gate now catches that exact
design — 7 collisions on Sheet No. 2, `span.qe-stamp-no "Sheet No. 2"` sitting on the
masthead's own `a "Queering Earth"`. That is how it was proved rather than assumed.

**Not a copy.** `REVEAL`/`UNREVEAL` were extracted to `tools/reveal.mjs` and the Chrome
client to `tools/cdp.mjs`, both shared with `check-contrast.mjs`. REVEAL is the one that
mattered: it is the list of things a page builds at runtime, it is editorial, it GROWS, and
its own comment tells the next author to add to it. Two copies is a component one gate
learns and the other does not — the failure `html.mjs` and `pages.mjs` already exist to
prevent. `cdp.mjs` earns its place on `evaluated()` alone, which turns an in-page exception
into a loud failure instead of a flawless report about a page nothing measured. **Both
extractions were proved output-neutral**: `check-contrast --check` printed a byte-identical
report before and after.

**TWO FAULTS IN THE IMPORTED TOOL, both fixed here and neither reported upstream from this
repo**, because Star Stuff is not edited from a session in this one:

1. **The clip walk started at `el.parentElement`**, so an element clipping its **own**
   overflowing text was never a clip host and the fault was invisible. Found by probing why
   `.qe-sr` produced no phantom clip: it is a 1px box with `overflow:hidden` holding a
   288×39px line of text, and nothing reported it because the walk stepped over the very
   element doing the clipping. Fixed to start at the element. On this site it changes no
   finding today — the only `overflow:hidden` in the stylesheet is `.qe-sr`'s own, and that
   is excluded as invisible — but it is what makes the `clipped` proof possible at all, and
   the proof names `span.qe-provenance-label` as its own clip host.
2. **`locate()` reported `page` for the case the gate exists to catch.** It walked up the
   ancestor chain looking for a preceding heading, and an absolutely positioned block is a
   child of `main`, so the one finding that most needed an address got none. Now it walks
   backwards over real document order and returns the nearest authored heading id — which
   always exists here, because every `h2` carries one by house rule.

**Three things about this site that changed the port:**

- **There is not one rendered `text` element in any page.** The art is 535 paths, 381
  groups and 160 ellipses and circles, named by `aria-label` and `title`. That is *never an
  image of text* showing up in a place nobody expected it. So `svg-vs-svg` and `svg-vs-html`
  — the two faults that motivated the tool upstream — cannot fire here. They are kept
  regardless, and the reasoning inverts the usual rule: this is one sweep with three labels,
  not three checks, and dropping the SVG half would stop the sweep *measuring* SVG text. The
  day a sheet carries a label, the gate would report a clean page it never looked at. Proved
  by injecting labels, and the file says so rather than implying they were battle-tested.
- **`.qe-sr` is excluded as not-ink, and the first draft of that note was wrong.** It
  claimed the exclusion suppressed phantoms "113 times". It suppresses none today: remove it
  and the sweep adds 113 boxes and still reports zero. Those invisible 288×39px rects happen
  to miss everything on these fourteen pages, which is **position luck and not structure** —
  one moved heading from being noisy. Kept, because measuring text no eye can see is
  measuring the wrong thing.
- **The `.qe-skip` exemption was removed after testing it.** It went in on the strength of
  Star Stuff's note, where the equivalent skip link fires on 5 of its first 7 pages. With
  the list empty this site still reports zero clips, because `.qe-skip` here has no clipping
  ancestor to be outside of. **An exemption that exempts nothing is a named hole a real clip
  can fall into, and it reads as evidence somebody checked.**

**Rotation needed nothing, which is worth knowing rather than rediscovering.** This site
leans type in fifteen places, and `getClientRects()` on rotated text returns the axis-aligned
box of the rotated quad — the stamp's bottom line is 11px of type whose AABB is 29px at 7
degrees. `INK_RATIO` already handles it: the shrink takes `min(rect.height, em × 0.8)`, so an
inflated AABB is discarded in favour of the em box. The imported constant was already the
defence. If a component ever leans far enough for that to stop holding, the fix is to measure
the rotated quad, not to widen the tolerance until the noise stops.

**Print is the real gap and it is a live one.** Star Stuff defers this to `check-sheets.mjs`;
this repo has no paper gate at all, and paper is the medium this house has already been burned
by — 44 of 46 pages printing blank. No print collision has been observed here, which is the
only reason it is not in the port, and it is the obvious next addition.

### The accession stamp says Queering Earth, and the fade is on the ring (2026-09-09)

Ryan saw the oval stamp on a scanned sheet from the Ada Hayden Herbarium at Iowa State
University and asked whether we could do the same, faded, for the sense of age. Two things
were genuinely open and were put to him; both answers below are his.

**What the stamp claims custody on behalf of: Queering Earth alone.** The Iowa stamp names
an institution and its parent, so the obvious move was Stimpunks and More Realms on the
lower line. Two custodians also did not fit the oval — at that size the line crossed its
own ring — but the layout was not the argument. A stamp asserts a single custodian, this
site is a collaboration between two organisations, and *Queering Earth* is the one name
true of the whole of it. The two are credited where credit is a sentence and not a mark.

**What goes in the lower line: the accession date.** The alternative was the custodians,
per the reference stamp. The date makes the mark an accession record rather than a
nameplate, which is the entire justification for having it.

**The number had to be real and it happens to be.** Ada Hayden's 497892 is a row somebody
can go and read. A six-digit number invented here would be a gold join on a sheet nobody
corrected, and on a site whose one stated correctness requirement is attribution that is
the worst available place for that failure. The sheet number and the mounting date are
both entries in the register, so the stamp asserts nothing new — and no sheet stated its
own number inside its own landmark before today, so it duplicates nothing either.

**The fade could not go on the letters, and this was measured before anything was drawn.**
`--qe-lichen` is 2.15:1 on paper — the figure this repo already uses as its injected
`FAIL` — and `--qe-verdigris` is 3.42:1. Neither clears 7:1 or the 4.5:1 large-text floor,
so no token here can make a letter faint and permissible at any size. The letters are
`--qe-moss` and the age is carried entirely by the ring. That is the standing house rule,
and it turns out to be what a real understamped impression looks like anyway: the outline
breaks long before the letterforms do. Nothing was traded away to get the ink legal.

**Three things were found by looking rather than by any gate**, and all three are the
reason to keep looking:

- `mix-blend-mode: multiply` is the whole washed-out effect and it **erases the stamp in
  the cabinet**, because multiply darkens towards the ground and in the drawer the ground
  is the dark thing. `check-contrast.mjs` reported `PASS` and exit 0 on that version —
  verified deliberately, by putting the bug back. It composites computed colour pairs and
  has no concept of a blend mode. This is a third documented blind spot beside the
  `::marker` and the texture, and it is now a token, `--qe-stamp-blend`.
- **Ring clearance was measured against the wrong reference twice.** An ellipse narrows
  fastest at its poles, so what matters is its half-width at the *far edge* of the top and
  bottom line boxes, not at their centres. At the centre the mark looked to have 20px of
  room; at the edge it had −1px, and the letters grazed the ring on screen.
- **The two-column layout only ever took its fallback.** The mark is 207px and the
  provenance line wanted 20rem beside it — 558px against a 34rem measure — so the row
  wrapped at every width the site has. The stamp stacks, which is where a real sheet
  carries it.

**The corner-floated version was refused.** A stamp belongs in the corner of a real sheet,
and an absolutely positioned one lands on the prose at a narrow width, at 400% zoom, or
under a long heading — which nothing here can currently see happen. Star Stuff has
`check-overlap` for exactly that, and the house rule is to port a check when its failure
becomes possible. Not floating the stamp is cheaper than porting the gate.

**The stamp is not a link and not indexed.** The provenance line beside it already points
at the accession, so linking the number is a second tab stop landing on the same anchor.
And indexed, eight stamps put eight near-identical records carrying the site's own name
into the finding aid — which is precisely why `.qe-masthead` is already skipped. It stays
in the Markdown siblings, where there is no ranking to crowd.

### Search is a page, a file, and a refusal (2026-09-09)

Ryan asked for search. Three things were genuinely open and were put to him; all three
answers below are his.

**Where it lives: a `/search` sheet, and only there.** A field in the masthead of every
page has better discovery and costs a markup change on thirteen pages and an argument about
whether the field is furniture or content. Inline live search everywhere was the third
option and the worst fit: it fetches 368 KB of index for every reader who never searches,
and it puts other sheets' words inside a sheet. One page, linked from every footer.

**What the index does with quoted text: indexed, marked, never snippet-cropped.** This was
the real question. A conventional snippet — twenty words either side, an ellipsis at each
end, no maker — is a fine convention on a page of prose and a *machine for producing the
tightened source* when pointed at eighty-two mounted quotations. It would have manufactured
the exact artefact `ATTRIBUTIONS.md` exists to prevent, once per result, at scale, for the
rest of the site's life. So `blockquote`s are whole records rendered entire with maker and
citation, and short quotations inside our prose keep their character ranges so the crop
widens around them. The rejected middle option was "crop like any prose"; the rejected safe
option was "index our own words only", which would have made *Miranda*, *Fr269* and every
line of Dickinson unsearchable on a site that is largely about them.

**How the register ranks: a separate, secondary group.** `/changelog` is 25,359 words, 28%
of the site. Flat-ranked it buries the sheets on any query naming a writer; excluded, every
correction becomes unfindable by word. Its entries come under their own heading below the
sheets. This is the register's own front-matter/back-matter distinction, applied to it.

**Consequences that were not obvious going in**, each of which is now a rule in `CLAUDE.md`:

- **`/privacy` said there was nowhere on this site to type anything.** True when written
  that morning; false a few hours later by our own hand. A binding statement of practice
  has to be re-read against the code every time the code grows a capability, and the gate
  that enforces the third-party claim cannot see a sentence like that one.
- **The query goes in the fragment.** `?q=` is sent to the server, so search terms would be
  written into the hosting log `/privacy` describes. Fragments are not sent. The form is
  also hidden until its script runs, because a form without its script would submit a query
  string and undo the decision — and hiding it is what makes the generated manifest, rather
  than a dead field, what a reader without JavaScript sees.
- **The highlight could not be a wash, and could not be marigold.** Two independent
  failures. Marigold at 0.30 composites to 11.2:1 on paper and 6.94:1 in the drawer, and no
  alpha clears 7:1 there, because lightening a dark ground moves it *towards* light ink.
  And marigold is the seam token: a search hit is not a repair, and gold spent on one is
  what makes real mends unfindable. It is a verdigris rule under the word, which costs the
  ink nothing in either ground.
- **The contrast gate could not see any of it.** Every result component is built at
  runtime, so `/search` measured 193 clean elements and zero of the ones that matter. The
  gate's `REVEAL` hook now clones the page's own templates. Two findings fell out of
  writing it: this file had been running `check-contrast.mjs` **without `--check`**, which
  makes it a report that exits 0 — so the entire 7:1 tier had shipped as advice — and our
  own reply poem on `/wild-nights` was being flattened into prose and cropped mid-line,
  which the never-crop rule did not reach because the words are ours.

**Rejected: a hosted search service.** Never seriously on the table. The site makes no
third-party request and `/privacy` is gated on it.

**Rejected: putting it in `queering.js`.** Its boundary is that it may derive navigation
from the DOM and may never create words. A result is a sentence from another page put onto
this one. The boundary was worth more than the convenience, so the code is a third file
loaded by one page — and it still writes no label: every word is authored in `search.html`
as a `<template>` and cloned, the way the register's index clones an entry's own chip.

**Open: nothing about ranking has been tuned against real use.** Weights are heading 8,
entry name 8, page title 6, quotation source 2, prose and quotation text 1, with every term
required to appear. That is a guess that reads well on the queries we tried. It is worth
revisiting when there is any evidence, and there is no analytics here to produce any.

### The shared assets are not fingerprinted, and the cache is bounded instead (2026-09-09)

The spec's `cache-control` item gives one clean answer — `max-age=31536000, immutable` — and
it is available only to URLs carrying a content hash. `queering.css` and `queering.js` carry
their own names, because there is no build step, so the clean answer is off the table and
what is left is a choice between two imperfect ones.

**Not fingerprinting.** The machinery would be a generator that renames both files by content
hash and rewrites the reference in all twelve pages, plus a gate to catch a page pointing at
a hash that no longer exists. Every commit touching the stylesheet would then churn twelve
HTML files, which makes the diff of a one-line palette fix unreadable — and the register
depends on those diffs being legible. **The prize is 31 KB over the wire, brotli'd.** That is
not a trade worth making at this size, and it can be made later without undoing anything:
adding fingerprints is a strictly additive change to a tool that does not exist yet.

**So the cache is bounded instead: five minutes.** Chosen for the shape of a visit rather than
the size of the file. A reader moving through several sheets in one sitting revalidates once
instead of once per sheet, and a bad stylesheet reaches everyone within five minutes rather
than being stuck in caches with no way to bust it. **That bound is the whole point.** This
site's characteristic failure is a palette or print change that breaks pages silently — Star
Stuff shipped 44 of 46 pages that printed blank — so an unbustable stylesheet is a worse
exposure here than a slow one.

`stale-while-revalidate` is deliberately **not** on those two, though it is on the plates. The
HTML is `must-revalidate` and therefore always fresh; a stylesheet one visit behind it would
render a change that adds a class and its rule together as an unstyled page for that visit.
Staleness is only safe where the stale copy cannot disagree with the fresh HTML.

**And the plates get thirty days without `immutable`.** Their bodies will almost certainly
never change: `annales-lugduno-batavi-1863-tab4-gonystylus-miquelianus.jpg` names one plate in
one volume, and tab 4 of the 1863 Annales is not going to be re-cut. But *almost certainly*
is not what `immutable` means. It tells a browser the body can never change, on a filename a
better scan could overwrite, and asserting a fact we cannot enforce is the same failure as a
gold seam on a sheet nobody corrected. **Thirty days is a claim we can keep.** If a plate is
ever rescanned, the honest move is a new filename — but nothing forces that, which is exactly
why the promise is not made.

**Amended the same day, after the five minutes fired.** The accession stamp shipped, and a
reader holding the previous stylesheet got the new markup with none of its rules — a
paragraph of three unstyled spans where an oval should have been. The paragraph above
predicted that event in those words and priced it as acceptable. It is not, and the entry's
own reasoning is what overturns it: if this site's characteristic failure is a change that
breaks pages silently, then a five-minute window in which every reader sees exactly that is
the wrong bound, not a safe one.

**What was missing was a third option, not a better answer to the two.** The choice above is
posed as fingerprinting versus a bounded cache, and both refusals still stand — fingerprinting
would churn twelve HTML files per CSS edit and cost the register its legible diffs. But
`max-age=0, must-revalidate` on the two shared assets, the same policy the HTML already has,
was never weighed. It needs no generator, no rewritten pages and no gate, so it costs nothing
the refusal above was protecting, and it closes the skew to zero rather than to five minutes.
It is also *more* bustable than 300 seconds, which was the stated priority.

The cost is the one thing the five minutes bought: a reader moving through several sheets
revalidates once per sheet instead of once per sitting. That is a conditional request
returning 304 with an empty body, issued alongside the revalidation the HTML is already
doing. Measured against the deployed site on the day of the amendment: the conditional
request comes back `304` with a zero-byte body in 0.23s, against 33 KB brotli'd for the
full response. Correctness is worth the round trip. (The 31 KB above was accurate when
the entry was written and the stylesheet has grown since — it is left as it stood.)

**No `stale-if-error` on those two, and the mechanical reason has a matching one.** RFC 9111
forbids serving a stale `must-revalidate` response, so the pairing cancels. It would also buy
nothing: the HTML is `must-revalidate` and fails closed, so when the origin is unreachable
there is no document for a held-back stylesheet to apply itself to. **They fail exactly when
the page they belong to fails**, which is what makes matching the HTML coherent rather than
merely consistent.

**`search-index.json` had the same defect and takes a different fix.** It was
`max-age=600`, and it is *derived from the sheets* — so it is precisely the case this
entry's own rule excludes, staleness where the stale copy can disagree with the fresh HTML.
After a prose edit it could hand a searcher a snippet quoting a sentence no longer on the
page it cites, which on this site is the failure that matters most. It is now `max-age=0`
**without** `must-revalidate`, which is not an oversight: zero removes the skew, and leaving
the stricter directive off is what keeps `stale-if-error` legal. That resilience is worth
having here and not on the stylesheet, because the index is fetched *after* the page has
rendered, by a reader who has typed something. The document exists either way, so a finding
aid a few minutes behind genuinely is better than one that fails closed — the judgement the
original note made, and it survives. `queering-search.js` clones templates authored in
`search.html`, so it is skewable against the markup the way the stylesheet is and follows it.

Revisit when either file is fingerprinted for another reason, or when a conditional request
per sheet is measurably costing something.

### Sheet No. 8 is a wall, which is a third kind of sheet (2026-09-09)

Ryan asked for a zine wall, pointing at [Stimpunks' zine
walls](https://stimpunks.org/library/zine-walls/) and at the Fraunces specimen site. One thing
in the format does not transfer and it decided the whole design.

**A Stimpunks zine wall works by unattributed declaration.** Its own page calls it "a wall of
declarations", and the pull quotes on *Learning at the Edges* are deliberately set apart with
no source. That is right for a manifesto and is the one move this site cannot make, because
here the citation *is* the product. So a wall here is one of two things and mixing them is the
failure: **our own declarations**, which are ours and need no source, or **a chorus of labelled
slips**. We built the second, because the herbarium already invented it — a sheet that has been
in a cabinet long enough carries a stack of determination slips in different hands, every one
signed.

**So "a wall" joins "a reading" and "an essay" as a sheet kind.** The distinction is not
decoration: a reading has an order and arrives somewhere; **a wall has a chorus**, and its
argument is made by accumulation. The subject has to deserve that — Monotropa uniflora does,
because seven people across 273 years looked at one specimen and each saw something the others
could not.

**No new visual language.** `.qe-wall`, `.qe-slip`, `.qe-drift` and `.qe-cutup` were built for
Sheet No. 4 and are reused unchanged. Wabi-sabi adds one rule the Stimpunks walls do not need:
**the wall must not be uniform.** Twelve slips at twelve angles on an even grid is a pattern,
not a paste-up, so sizes and weights differ because the *sources* differ — a Latin binomial
does not get what a letter gets, and neither gets what a poem gets.

**Which principles bore on it.** *Fukinsei* is the whole device. *Kanso* kept the biology off
the sheet. *Yūgen* is why the wall is open at first paint and nothing reveals on scroll.
*Koko* is in the specimen rather than the styling: the plant is pale, ephemeral, lives on
decay, and blackens when touched.

**The shelf division did real work here.** Star Stuff already has the mechanism — its Symbioses
field guide entry *Nourished in the Dark* covers myco-heterotrophy, no chlorophyll, carbon
taken and none given back. That is a wrong-fact risk and theirs. Ours is the naming, the
letter, the poem's edition history, the editor, and the word. **The sheet links across rather
than re-explaining**, and the label carries a `Biology` row saying where it went. This is the
first sheet where the two sites explicitly divide one subject.

**The drawing is the first on this site with no leaf in it**, and that absence is the argument:
every other panel here is green because every other specimen photosynthesises. The bells and
bracts are `--qe-flesh`, the token written for "the pale flesh of a specimen — a mushroom's
stipe, a cut stem", which turned out to have been waiting for this plant. Two drafts were
thrown away against the documented drawing rules: the first put the pipes standing on a single
long thread, which is the baseline rule 1 forbids, and the second drew the stems nearly upright
so the bells sat on top — which loses the *one turn* the genus is named for. The threads now
cross at opposing pitches and the crowns are offset hard sideways.

**No plate, and the sheet says so.** Every mounted image here is public domain, and there is no
public-domain *Monotropa uniflora* print in hand. The Dickinson manuscript is licensed, modern
photographs are in copyright, and Todd's painted panel — the object at the centre of the letter
— could not be cleared. Same treatment as the wrong violet on Sheet No. 7: the gap is named on
the page and a reader is asked for a better plate.

### Star Stuff's field guides have no per-entry addresses (2026-09-09, open, theirs)

Noticed while linking Sheet No. 8 across to the Symbioses guide. The SKS mirror of that page
carries a convenience link of the form `symbioses-field-guide.html#monotropa`, and **that
anchor does not exist on the served page** — the whole document has exactly one id, `#grid`,
and the twelve entries are rendered into it client-side from data.

So our sheet links to the page rather than to the entry, which is correct but coarser than we
wanted. It is also the situation `CLAUDE.md` already warns about in the other direction: *"If a
page ever renders content client-side, the mirror will need a published extraction index."*
Over there it means a reader cannot be sent to one partnership, and a citation cannot address
one either.

**Not ours to fix** — `starstuff.earth` is a separate repo. Recorded here so that a session in
that repo has the finding, and so the next Queering Earth sheet that wants to cite one field
guide entry knows it cannot yet. Worth adding: **their page already links to Helen Edgar's
Monotropa essay**, so both sites arrived at it independently, and the cross-link now runs both
ways.

### The social-card report enumerated a hand-kept list (2026-09-09)

`make-images.py` generated the new card correctly and **did not report it**, because its
closing summary iterated a hardcoded tuple of filenames that nobody had added a line to. Caught
by eye, not by a guard.

Harmless in that direction and not in the other: the same hand-kept list would report a
complete-looking run while a card had **silently failed to generate**, which is precisely the
class of failure this repo keeps building checks for. The report now enumerates what `og_card`
actually wrote and prints a count, so a new card reports itself and a missing one is visible.

Also added: a `ghost_pipes` sprig, because the generic one draws leaves in lichen and heads in
three accents. On the one sheet whose entire argument is a plant with no chlorophyll and no
foliage, **the stock card was arguing with the page** — the same fault as a legend that no
longer matches its own drawing.


### The register is indexed by sheet, and the association is authored (2026-09-09)

The open item from the contents work, closed the same day. `/changelog` is written **by
accession**, which is by date, because a sheet, its corrections and the CSS it needed are one
dated event. That is the right unit to *write* in and the wrong one to *look something up*
in: a reader is usually asking what happened to one sheet, and its entries are scattered
across sixteen dates.

**The distinction the first attempt missed: a contents list is front matter, an index is back
matter.** That is why a table of contents measured so badly here (1,293px at the top,
delaying the first entry by three and a half screens) and why an index does not: it sits at
the foot of the page, where a bound volume has always kept one, and delays nobody. One line
up by the legend points down at it. The register's own first accession is back to 1,839px
from the top.

**Which sheet an entry concerns is stated in the markup, never inferred.** Each `.qe-entry`
carries `data-sheet`. Deriving it from the links inside an entry was considered and fails on
the evidence: the Dickinson accession links `/on-being-ill`, `/promises-like-pie-crust` and
`/wild-nights` and concerns only the last, so incidental cross-references would file
corrections under sheets they have nothing to do with. **On a site whose whole risk is a
wrong attribution, an index that silently misfiles a correction is the worst bug available**,
so the association is authored — 73 entries, read one at a time — and guarded.

Two entries legitimately belong to two sheets and carry both tokens, which is why the field
is a token list rather than a single value: the byline rule changed Sheet No. 4 and gave
No. 1 a second reader in one stroke, and today's correction about the seven principles
touched the colophon and this register together. 73 entries file as 75 index lines.

**What is authored and what is derived.** Every group, its heading, its sheet number, and the
order the groups appear in are written in `changelog.html` — those are editorial words, and
`queering.js` may not write words. The script only *files*: it clones an entry's existing
name and its existing kind chip and puts them under the group the entry declares. Nothing is
composed, summarised or truncated, so the index cannot end up calling an entry something the
entry does not call itself. The group labels were checked against each sheet's own `<h1>` and
against the plate's cards rather than typed from memory.

**A guard, because the failure is silent.** A typo'd slug does not throw and does not show:
the entry matches no group, drops out of the index, and the register above it still reads
perfectly. `check-markup.mjs` now validates every `data-sheet` token against the pages that
exist (plus the literal `the-site`), reports an empty declaration, and reports a group that
nothing files into — which catches the same typo from the other end. **Made to fail before it
was believed**, per the standing rule: a typo'd entry slug, an emptied declaration, and a
stale group each reported with a line number and exit 1; then reverted and the clean tree
re-run.

**One layout attempt discarded on measurement.** The index items were first a wrapping flex
line, chip beside name. A chip plus an entry name exceeds the measure almost every time, so
every single item put its chip alone on a row above itself and the index came to 6,726px for
no extra information. Ordinary inline flow — chip opening the line, name wrapping beneath —
is 5,502px and is what an index entry has always looked like anyway.

**The one redundancy left in.** A sheet's `Mounted` entry is named after the sheet, so it
restates the group heading directly beneath it. Fixing that would mean rewriting entry names
in the register, which is editing the record to suit an index built on top of it. The index
defers to the record.


### Contents on the long sheets: derived list, authored addresses (2026-09-09)

Ryan wanted to see what is coming on a long sheet, jump around it, and share deep links to
headings. Three axes were on the table from [NN/g's guide](https://www.nngroup.com/articles/table-of-contents/):
rail vs body, sticky vs nonsticky, top vs in-body.

**The three are really two.** NN/g couples the first two — *"If the table of contents is…in a
left or right rail…then the table of contents should be…sticky. In the main body…nonsticky."*
So the choice is rail-or-body and sticky follows. Top it calls the "safe choice".

**Body, nonsticky, straight after the lede.** A rail would fill the margins either side of
the 34rem measure, and those margins are the negative space the spacing work had just spent
an accession clearing. Sticky also eats viewport height at 400% zoom, which is a WCAG 1.4.10
problem this site does not need to invent. NN/g's own testing adds that "many users failed to
notice the sticky table of contents" on mobile. Placed after the lede rather than before it,
so the sheet's opening sentence still comes first.

**Which principles actually bear, and which do not.** *Kanso* and *seijaku* are genuinely
against a rail: permanent furniture, and furniture that never leaves the screen. *Yūgen* gives
one hard rule — open at first paint, never an accordion, which is the register's existing
"a ledger you have to open is a ledger nobody reads". **And *fukinsei* mildly favours a
rail**, since an off-centre two-column composition is more asymmetric than a centred one; it
was overridden rather than pretended into agreement. *Koko* and *shizen* are neutral here.
Stacking all seven onto one side would have been the tightening this site keeps logging.

**The two decisions that mattered more, and NN/g covers neither.**

**1. The list is derived from the DOM, never typed.** A hand-kept contents list is a second
copy of every heading, and this repo's oldest rule is that two copies drift and the
accessible one rots. With no build step that leaves client generation, and three good things
fall out: it is *not content* (every heading is fully server-rendered; the script only
reflects them), the served HTML carries no list so **the SKS mirror never indexes a heading
twice**, and losing the script loses a shortcut and no words.

That last point is also why this may live inside `<main>` when `.qe-elsewhere` may not. The
outside-`<main>` rule exists to stop *one* sheet's navigation being indexed as *another*
sheet's content — a cross-page contamination. A self-referential list of this page's own
headings cannot cause it, and since the list is never in the served HTML the question is
moot anyway.

**2. The ids are authored, not slugified.** This is the half that breaks quietly. An id
derived from heading text dies the moment anybody rewords the heading, and every link a
reader shared dies with it. So each `<h2>` carries a short *topical* id stated in the markup
— `#eden`, `#the-colon`, `#quetelet`, `#wabi-sabi` — the way `--rot` is a fact about a slip.
**The permanent thing is authored, the derived thing is computed, and nothing is written
twice.** `check-markup.mjs` already guards duplicate ids, so the guard for this existed
before the feature did.

**The section mark, and the trade it takes.** A `§` beside each heading, linking to it.
Always visible rather than revealed on hover, because hover hands the affordance to mouse
users and to nobody else — no keyboard, no touch. The glyph is drawn with an empty alt string
(the chain-arrow device) and the link is named by a visually hidden span, so it announces as
"Link to this section". **That does append four words to every heading's accessible name**,
which is the accepted cost and is what MDN and GitHub do; the alternative is the affordance
not existing for most people. A **real space before the `<a>`** in the markup is load-bearing:
without it the name computes as "…the windsLink to this section", because CSS margin is not
whitespace. Found by reading the accessibility tree, not by looking at the page.

**No scroll-spy.** NN/g says highlighting the current section helps. It also means a scroll
listener, a mark that moves, and a second thing on screen that never settles — against the
register's standing "no new motion". `:target` marks where a reader *landed*, which is the
case a shared link actually creates, and it is drawn in the gutter with absolute positioning
so arriving at a heading does not **shift** it: a border-left plus padding would move the
words sideways at the end of a smooth scroll, the one moment a reader is looking straight at
them.

**Not on `/changelog`, and this is the decision worth keeping.** The register is the longest
page on the site (16,052 words) and looked like the strongest case. Built and measured, it
was the worst: its labels average **148 characters** against 22–34 on a sheet, so the block
came out **1,293px** against 319–510px everywhere else, and it pushed the first accession
three and a half screens down. The cause is not a bug — a register's accession headline *is*
a sentence, which is that component's own written design decision.

Both ways to shrink it were forbidden. **Truncating a label is this site's characteristic
failure applied to itself.** **A short second label beside each heading is the drift.** So the
register keeps its section marks and its sixteen addresses — deep links there work, which was
half of what was asked — and has no contents list. Removed after measuring rather than
shipped because it had been built.

**The register wanted an index by sheet, not a contents list — built the same day.** What a
reader of `/changelog` wants is usually "what happened to sheet X", and the accessions are
grouped by date. See the entry below; the short version is that **a contents list is front
matter and an index is back matter**, and reaching for the first when the page wanted the
second is what produced the 1,293px block.

**A wrinkle flagged and deliberately not solved.** On the sheets the headings are often
quotations, so the Tempest's contents reads *Assembled, not born · A household of three · O,
I have suffered with those that I saw suffer · Abhorred slave · O, brave new world*. That is
lovely and it is **not scannable**, which is NN/g's whole purpose for the thing. The fix is
not a second short label — it is better headings, and rewriting headings on shipped sheets is
an editorial call rather than a design one. Named here so it is a choice rather than an
oversight.

**One rule amended rather than smuggled past.** `CLAUDE.md` said `queering.js` was "the two
view controls, and nothing else". This breaks that, so the rule became a boundary instead of
a tally: **it may derive navigation from the DOM; it may never create words.** A count of
features is a rule that gets quietly broken the first time a third thing is worth having.


### Three surfaces, a spacing scale, and patina as a record (2026-09-09)

Prompted by Ryan reading on wabi-sabi in web design and asking how this site scores against
the seven aesthetic principles that literature names. Six of the seven were already here;
two — *fukinsei* (asymmetry) and *datsuzoku* (freedom from convention) — more thoroughly
than the sources state them. Four decisions came out of the exercise.

**One sourcing note first, because it shaped everything after it.** The list circulating as
"the seven principles of wabi-sabi" is Hisamatsu Shin'ichi's seven characteristics of **Zen
art**, from *Zen and the Fine Arts* (Kodansha International, 1971). Zen aesthetics and
wabi-sabi overlap and are not the same thing, so the relabelling happened in transmission.
The third of the seven — the one about age — is where the transmission frays, and the design
advice glosses it with **no age in it at all**, which is why "patina" recurs in that
literature without ever resolving into a principle. This accession is mostly about that hole.

**Corrected the same day — the first version of this paragraph overclaimed.** It stated
flatly that the popular list *names shibui where Hisamatsu names koko*, and that the swap is
what dropped the aging. **That is not established.** At least one rendering of Hisamatsu's
seven gives *shibui/shibumi* for that characteristic itself, glossed "lofty dryness" — the
same sense the *koko* renderings carry. The confident version was written from memory before
anything was checked, and the instruction two sentences later to *verify against Hisamatsu
before any of this reaches public copy* is what caught it, when the colophon section was
written and the checking actually happened. **The paragraph above is the part that survives
verification**, because it is a claim about two texts a reader can open rather than a ruling
on Hisamatsu's vocabulary. Full working, with the citation pinned from Crossref, is in
`ATTRIBUTIONS.md`; the register entry is corrected too.

We use *koko* as the term for the weathered principle, on the warrant of the peer-reviewed
paper we have the seven from, and the colophon says the renderings disagree and that we
cannot settle it from here. **We have read neither Hisamatsu nor Koren**, and the page says
so rather than implying a lineage.

**1. A panel picks one of three surfaces: bare, ruled, ruled off.** `--qe-card` appeared
fifteen times in `queering.css`, thirteen of them with the same 1px rule and 2px radius, so
a specimen, our own commentary, and a housekeeping note were indistinguishable by surface.
That is a hierarchy defect and not an aesthetic one. `.qe-restaged` went bare,
`.qe-untidy` and `.qe-register-note` went ruled off, and *ruled* now means "somebody handed
this to us."

**The third tier is hairlines and not a recessed tint, and that is the interesting part.**
A `--qe-paper-deep` fill was the obvious answer and was tried first. In daylight it drops
`--qe-moss` to 6.90:1 and `--qe-rust` to 6.21:1 — under the house 7:1, over WCAG AA, and
therefore **passed `check-contrast.mjs` clean**. This is the open item logged the day before
(the guard gates at AA, the 7:1 target is held by hand-chosen tokens and nothing else)
arriving as a real near-miss. **It closed the same day**: the gate was raised to 7:1 in two
tiers, and the site passed it without a colour changing. See that entry below.

A second thing the guard cannot see turned up in the same pass: **a `::marker` is not an
element with text, so nothing measures it.** Dropping `.qe-untidy`'s fill took its bullets
from 4.17:1 to 3.89:1, and checking the neighbours found the register's own entry bullets
drawn in each kind's accent — 2.15:1 for lichen, 2.40:1 for marigold on paper. Both fixed
by the rule the stylesheet already states five times over: **the colour goes on the rule and
never on the glyph.** Markers took `--qe-moss` at 7.80:1.

**2. Space is a scale.** Twenty-five distinct margin values shipped. The argument is not
tidiness — it is that **asymmetry only reads as asymmetry against a norm**, and this site's
entire typographic case is deviation. Twenty-five arbitrary gaps read as noise and flatten
the deviations that were authored. `--qe-space-*` is quarter-lines of the 1.96rem body line;
the page was already close by ear, so quantizing moved most gaps by one to three pixels.
Paragraph spacing went 1.35rem → 1.47rem, the one deliberate loosening. The scale governs
space **between** blocks only.

Three corner profiles for the same reason, none square and no two alike: a sheet handled a
hundred times does not have four identical corners. It is a radius, so it is free in both
contrast and print. *Koko* for the price of a token.

**3. Patina is a record, not a texture — `.qe-provenance`.** The register had already logged
a correction or a re-determination for **every one of the seven sheets**, and no sheet said
so on its own face. The foot of each sheet now carries its mounting date and its correction
counts, each clause linked to the entry here that did it. Inside `<main>`, so the mirror has
it. It is true, checkable, accrues on its own, and survives plain view, paper, a screen
reader and 400% zoom, because it is a sentence.

Every alternative on the table was a picture of age drawn over the words. The research
recommends a noise tile and `filter: blur(0.5px) contrast(1.1)`; both refused. **Texture
never goes under text**, and the reason is the one above: a grain varies effective background
luminance per pixel, and the guard composites computed colour pairs. Grain under body text
would pass every check here.

What *was* taken from the texture advice: the wash is no longer `position: fixed` — the
stains held still while the paper scrolled past them — and its four positions are now
`--qe-fox-*` tokens stated per page, because all nine sheets were foxed in identically the
same four places. Same idiom as `--rot` on a slip: a stain is a fact about one sheet.

**The wash does not tile, and one draft that did shipped a visible line.** It was tiled at a
150rem period so that a long sheet would not have clean paper through the middle, with a note
claiming a reader would never meet the repeat. Ryan met it on the first sheet he looked at.
The cause is arithmetic: `transparent 70%` puts a gradient's edge at 0.7 of its radius, so in
a 2400px tile a stain at `8%` reaches 278px above the tile's top and one at `96%` reaches
352px past its bottom, both cut off square — and a cut-off gradient meets the next copy of
itself as a step, which no softening repairs. **Keeping the tile would have meant constraining
every future page's stain positions to a safe band inside it**, which is a trap for whoever
writes the next sheet, bought in exchange for an even cast on the two pages long enough to
want one. Four stains over the whole sheet instead. A long sheet is sparsely foxed; spots do
not multiply to fill a bigger sheet.

**4. The gold goes on the mend.** Kintsugi is not that the crack shows; it is that the most
precious material in the workshop is spent on the break. Read that way the register's
taxonomy was backwards — `--qe-marigold` marked **Mounted**, the routine intake. Two tokens
swapped: Mounted takes `--qe-lichen`, Re-determined takes `--qe-marigold` (the largest
correction a register records — the specimen turned out to be a different thing), Label
corrected keeps `--qe-coral`. `.qe-correction`'s left rule became marigold and gained a gold
seam *through* the joint rather than down the edge, with coral kept on the strike: the strike
is the break, the join is the mend. The unclassed default became `--qe-rule` rather than an
accent, so a mistyped class reads as plain. `--qe-verdigris` leaves the register.

The masthead vine on `/changelog` **is** the legend — four blooms in the four kinds' colours
in legend order — so its second and third flowers changed with the tokens. A legend that no
longer matches what it explains is worse than no legend.

**The constraint that makes this honest: a seam requires a repair that is actually in the
register.** No rule derives `--mended`; the class is written on a sheet whose entries exist.
A gold join on an uncorrected sheet is decoration asserting a fact — the same failure as an
image of text — and it would make the real mends unfindable. All seven sheets carry the seam
today, so it currently distinguishes nothing; that is a fact about this site rather than a
fault in the device, and Sheet No. 8 will arrive clean.

**What was considered and not done.** A deckle edge via `border-image` (a picture of an
edge, and it fights the print sheet). Per-corner foxing spots on card edges (texture, one
step from the thing refused above). Deliberately mis-set `opsz` on small caps to imitate a
rephotographed plate (too subtle to be worth a token, and it fights `font-optical-sizing:
auto`). Varying the gap between register accessions to imitate uneven intake (fights the
scale it was just given, and the register's flatness is the ledger being a ledger).


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
book, with the full explanation in [Queering is a verb](https://queering.earth/#queering-is-a-verb) where Walker already
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

### The Wyrd sheet mounts two plates, and Helen picked them (2026-09-08)

**Superseding the entry that stood here**, which said this sheet carried no plate because the
paste-up was the image, and guessed that if one were ever added it would want to be fungi in
the changeling section.

Half right. A plate did want to go in the changeling section. It is not fungi:

- **Edward Robert Hughes, *Midsummer Eve* (c. 1908)** — watercolour and gouache, a woman bent
  over a ring of lantern-carrying fairies in a dark wood. Opens *The child they said was
  swapped*.
- **John William Waterhouse, *Miranda — The Tempest* (1916)** — oil, a woman on a rocky shore
  watching a ship founder. Sits in *That which does not belong*, next to Fisher.

**Both were chosen by Helen Edgar, and the captions say so.** That is not politeness. On a sheet
whose whole credit question was settled two entries down, "chosen by" is a real contribution
with a real name on it, and it is the kind of thing that evaporates from a page if nobody writes
it down.

They vindicate the rule they were picked under: **colour first, subject second.** Neither had to
be justified before it earned its place. Both happen to be apt as well, which is a bonus and not
the criterion.

**Placement was changed once, and the reason is worth keeping.** The Hughes plate first sat
between *He was convicted of manslaughter* and *So: no romanticising the fae on this sheet* —
which split two sentences that answer each other, and made a charming fairy painting the
punchline to Bridget Cleary's murder. It now opens the section instead: fairy country, then what
the belief actually did, then the refusal. **Where a plate sits is an argument, not a layout
preference.**

### `.qe-plate-wide` came back, exactly as the note said it would (2026-09-08)

The entry above records adding and removing `.qe-plate-wide` the same day, and closes: *"If a
landscape plate ever lands here again, the rule is one line: `.qe-plate-wide { max-width:
var(--qe-measure); }`."*

One landed. Waterhouse's *Miranda* is 138cm across, and inside `.qe-plate`'s 23rem cap the
foundering ship was a smudge in the corner. The class is back, and it is that line, plus a
`5in` cap on paper so a wide plate still cannot take a sheet of its own.

**This is the decision log paying for itself**, and it is the argument against deleting entries
about things that got removed. The removal note took thirty seconds to write and saved the next
session from re-deriving the cap, re-arguing the case, and probably picking a different number.

### Sheets have labels, not bylines — settled (2026-09-08)

**Superseding the entry that stood here for about an hour**, which said the Wyrd sheet's byline
was Helen's and the `This text` row carried the caveat. It shipped that way, Helen read it and
declined the credit, and the correction is worth keeping in full because the answer was already
written down in our own colophon before the sheet was made.

`design.html` defines a label as *"subject, maker, the date of the original, the date of the
reading, and who read it,"* and adds *"a specimen is collected, not written."* **That is an
authorship model, not a glossary entry.** A sheet is a reading. The person who made the thing
being read goes on `Maker`; the person answerable for the reading goes on `Read by`. The Woolf
and Rossetti sheets do this correctly. The Wyrd sheet reached for a `Written by` row and broke
it, and no caveat underneath a wrong byline fixes a wrong byline.

**The rule, for every sheet from here:**

- A **living person gets `Maker` for what they made and `Read by` for what they read.** Never
  `Written by` for prose they did not write.
- `Written by` is legitimate on exactly one kind of sheet: one that republishes somebody's own
  finished text, like `coming-to-terms`, where Ryan's words are unchanged and the label says so.
- **Crediting the institution instead is worse, not better.** "By Queering Earth" was on the
  table and was rejected: naming a house where a person belongs is the same elision as naming a
  person where a house belongs, and this site does not do it anywhere else.

Helen's own words for it, which are better than ours: *"I can't take any credit beyond you
reading my weird stuff."* That sentence is the `Read by` row.

**Knock-on, applied the same day.** The sheet's kind changed from *essay* to *reading* — kicker,
plate card, three sibling navs, the social card's kicker — because under this grammar that is
what it is. `on-being-ill`'s `Read by` row went from Helen alone to Helen and Ryan, on Ryan's
word. The sheet keeps Helen's title rather than taking one of its own, which is the one place
this is untidy: every other reading has its own name (*The Army of the Upright*, *The Die
Uncast*) with the specimen's title on the label. **If a session wants to tidy that, the title is
the change and the address can stay** — `/invention-of-normal` does not have to match.

### How the drafting is disclosed: the colophon, not the label (2026-09-08)

These sheets are drafted in Claude Code sessions and edited by whoever is on the `Read by` row.
Ryan's call, asked and answered: **one honest section in `design.html`, and nothing in the
labels.**

The argument for a per-sheet row was that this site treats provenance as a correctness
requirement and publishes an attribution ledger, so leaving a link in the chain unstated is the
one thing that would undercut the ledger if it surfaced later. The argument that won is that
**the label is about the reading, not the tooling** — a tool does not get a row, because a
byline is responsibility and a tool cannot carry any — and that the colophon is where this site
already explains how it is made.

So the disclosure is a section, *Who reads, and who writes*, and it is not buried or hedged: it
names the drafting, names who directs and edits it, and points at the public ledger. **The
reason it exists at all is written into it** — a site that keeps a ledger of everyone else's
words owes an account of where its own came from. If a future session is tempted to trim that
section for length, that sentence is the one to keep.

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

### The changelog is an accession register, and it is a page rather than a file (2026-09-08)

`/changelog` exists. Star Stuff has kept one since it started; this site had four sheets, a
ledger of everyone else's words, and a growing list of its own corrections — all of it visible
only to somebody with the repo cloned. **A site that publishes an attribution ledger owes the
account of its own mistakes to readers, not just to sessions.**

**Why a register and not a list of releases.** Star Stuff's changelog is a timeline of dated
releases tagged *New piece*, *Revised*, *Fact-check*, *Site*, and porting that shape wholesale
would have been the palette rule's failure mode in a new place: the same page with the hue
rotated. A herbarium already has this document. The accession register is the bound ledger of
every specimen as it entered the collection and of every annotation slip pinned to a sheet
afterwards — a re-determination, a corrected locality, an identification withdrawn. So the four
kinds of entry are the four things that happen to a herbarium sheet, and they map one to one
onto Star Stuff's four without borrowing its words:

| Star Stuff | here | what it means |
|---|---|---|
| New piece | **Mounted** | a sheet, or a plate, went on |
| Revised | **Re-determined** | reworked enough that what it shows is different |
| Fact-check | **Label corrected** | an attribution fixed, ours included |
| Site | **Cabinet** | the stylesheet, the tools, the deployment |

**The tag chips do not use the accent tokens as text.** Each kind carries one of the decorative
five, and the token is spent on the chip's bottom rule and the entry's left hairline — never on
the letters, which are `--qe-moss` like every other small-caps line here. This is the rule from
`CLAUDE.md` applied to a component that *wants* colour-as-meaning: the colour sorts, and the
words are readable on their own, which is also why the print sheet takes the chips to black and
lets the border carry the shape. Verified: `check-contrast` measures 377 text elements on this
page, 0 failures on screen and 0 under print emulation.

**Corrections are entries, not an appendix.** Six of the entries in the backfill are our own
errors — the byline Helen declined, the Wassell citation we were handed, the Miranda caption,
the Bridget Cleary sentence, the Walker paraphrase, the pronouns. Each says what it claimed,
what it says now, and how it was caught. The page's own note says why they are in the ledger
rather than in a drawer, and the sentence to keep if anybody trims it is that on this site the
citation is the only evidence a reader has.

**The list markers use `::marker`, not a `::before` glyph.** Star Stuff's entry bullets are a
`content: '★'`, which puts a decorative character into the accessibility tree. Colouring the
native marker gets the same result with nothing to read out.

**Backfilled from the commit history, cross-read against this file and `ATTRIBUTIONS.md`**, so
that every correction named on the page is one of those two files' own findings rather than a
retelling. It groups by accession rather than by commit: the Wyrd sheet, its byline correction,
its two plates, and the paste-up CSS are one dated entry, because that is one thing that
happened.

**Linked from the footer of every page**, on the line under the colophon — the same treatment
the colophon gets, and for the same reason: it is about the site rather than on the plate, so
it does not take a card and a number. It is not in `Elsewhere on the plate` either. Non-sheet
pages do not carry that nav.

**Keeping it up is now part of shipping a sheet.** A sheet that lands without a register entry
is the same omission as a sheet that lands without a social card, and it is worth the same
line in `CLAUDE.md`: mount it, card it, log it.

### The Miranda sheet's address names the play, not the phrase (2026-09-08)

`the-tempest.html` is "Miranda: To Be Wondered With", which follows the convention set out
above: **the filename is the address a reader searching for the source will guess, and the
title is what the sheet found in it.** A reader who wants this sheet is looking for the play.

**The title is Helen's, kept verbatim, and it is not lifted from the specimen.** Sheet No. 4
left exactly this untidy on purpose, with a note saying a later session could tidy it. This
sheet makes the same choice for a better reason: *To Be Wondered With* is a deliberate
one-preposition turn on Shakespeare's own coinage, which the sheet's second paragraph
explains. It is a reading of the specimen rather than a quotation from it, and swapping in a
phrase of the play's would delete the argument the title is making.

### Helen's Claude laid out Sheet No. 5, and we kept the typography and threw away the hexes (2026-09-08)

The Miranda sheet arrived as a finished self-contained page from Helen Edgar's own Claude
session — its own `:root` palette in hex, its own dark-mode block, its own toggle script. The
instruction was to adopt the text as written and keep the heading typography and the staging
labels. What that meant in practice:

**Kept.** The leaning title (`h1 .qe-lean`, one word tilted left and one tilted right in
rust), the wobbling section heads (`h2 .qe-wobble`), rust section heads with a hairline under
them, the small letterspaced staging labels (`.qe-block-label`), the chain of everybody who
has staged Miranda, the dashed "will not tidy" panel, and the struck-and-rewritten speaker
prefix. All of it is in a *restaging* section of `queering.css` and every colour aliases a
`--qe-*` token.

**Dropped.** The hexes, the `prefers-color-scheme` block, and the per-page toggle script.
This site has one ground and it is paper: a dark mode is not a missing feature here, it is the
other site. The draft's `body.plain` became `html.plain`, which is where the class actually
goes.

> **Amended 2026-09-08 — the ground has a second state, and this entry was right about what
> it refused.** See *The cabinet is the drawer shut, not the lamp switched off* below. What
> arrived with the draft was a generic inverted palette in hex with its own toggle script,
> and every word above about *that* still holds. What is shipped now is a herbarium object
> reached from the tokens: the daylight sheet is still the canonical ground and still the
> default in print, in the social cards, and for anyone whose machine has no opinion.

**Three things the draft got wrong, all of them accessibility rather than taste:**

- **The chain was a row of spans with `→` between them.** Five decorative arrows in the
  accessibility tree, read aloud as words, on a device whose whole content is *the order*. It
  is an `<ol>` now and the arrows are drawn with `content: "→" / ""`.
- **The correction was `text-decoration: line-through` on a `<span>`.** A screen reader gets
  nothing from that, so the one device on the sheet that *is* an argument about a woman's words
  being erased would have been erased for exactly the readers most likely to care. `<del>` and
  `<ins>` are what an editor reassigning a speech actually did.
- **The struck name was coral at `opacity: 0.65`.** That fails 7:1 twice over. It is moss
  letters with a coral `text-decoration-color` now — the colour on the rule and never on the
  word, which is the rule the register's tags already follow.

**The plate was a hot-link with a placeholder under it.** The draft pointed at Wikimedia's
`Special:FilePath` with a JavaScript `onerror` fallback reading "Plate to be inserted … source
a high-resolution scan before publishing." Waterhouse's *Miranda* had been mounted on Sheet
No. 4 that same morning, so the scan, the alt text and the provenance already existed and the
sheet mounts the local file. **A draft that ships a placeholder is a draft that ships a
placeholder** — the fallback text reads as finished furniture and would have gone live saying
"see note to Helen."

**Two citation errors and one attribution error came in with the draft** and are recorded in
`ATTRIBUTIONS.md` and in the register: Kathman's volume (59 → 58), Chedgzoy's surname
(Chedzoy → Chedgzoy), and Helen's own essay cited with *Queering Earth* as its publisher at a
URL that does not resolve. The last is the byline rule from Sheet No. 4 running in the other
direction, and it is the one worth remembering: **an attribution can be wrong by claiming too
much for us, not only by claiming too much for somebody else.**

### The header art is wind, and the first wave was clipped (2026-09-08)

Sea holly on a ledge, every stem, leaf and tendril bent the same way. The subject is a person
bent by other people's weather, so the drawing leans rather than standing up straight; three
heads on one crown are the household of three.

Two things were rebuilt. The plant was first drawn at about half the scale it needed and sat
in the lower right of the frame with two thirds of the viewBox empty. And a breaking wave in
the lower left **curled down to y 252 in a viewBox that ends at 238** — the crest, which was
the entire point of it, was silently clipped off the bottom and the remainder read as a stray
squiggle sitting on the ground line. It is two tendrils out of the same crown now, running
low along the ledge and curling at the ends, which is Helen's "squiggles and swirly bits"
note and the same device the Wyrd sheet uses. **An SVG that overruns its viewBox does not
error; it just quietly stops drawing.**

### Not ported: a check for citation fields (2026-09-08)

Two of the three attribution errors on this sheet were **wrong numbers and a dropped letter
inside a reference list** — a volume number and a surname. That is now twice the register has
carried a citation handed to us with the wrong issue. It is tempting to write
`check-references.mjs`.

**Not yet, and the reason is the standing rule:** port a check when the failure it catches
becomes possible to catch mechanically. Nothing on disk knows that Kathman is volume 58; the
only way to find that is to read Cambridge's listing, which is a human or a web fetch and not
a gate. A check could plausibly verify that every `.qe-references` entry is *shaped* like a
citation and that every URL in one resolves — the Edgar URL would have been caught by the
second half of that. **If a third bad citation ships, write the link-resolver half.** A check
that cannot fail is a check nobody reads, and a check that can only verify punctuation is
worse: it would have passed all three of these.

**Addendum, 2026-09-08, from the Dickinson sheet.** Three more bad references, all caught
before shipping, so the trigger above has still not fired — but two of them were **invented
DOIs**, and both return **404 from the DOI resolver**. That is the first citation error on this
site a guard could actually have caught, and it is worth knowing that the DOI half is the
trustworthy half: `https://doi.org/<doi>` with `Accept: application/vnd.citationstyles.csl+json`
returns the registered title, authors, journal, volume, issue, pages and year, so a checker can
verify the whole field rather than merely that it resolves. **The general URL half cannot be
trusted the same way** — Medium, doi.org's own publisher redirects, the Poetry Foundation and
Harvard all answer a script with 403 or 202 whether the URL is good or not, so a checker reading
those as broken would cry wolf on most of the references here. If the check gets written: hard
failure on DOIs, advisory at most on everything else.

### Sheet No. 6 is titled from Ryan's phrase, not from the specimen (2026-09-08)

**The first exception to the convention above**, made on Ryan's call with the alternatives in
front of him. *A sheet is a reading or an essay* settled that a reading takes its title from a
phrase in the work it reads — `on-being-ill` is "The Army of the Upright", `promises-like-pie-crust`
is "The Die Uncast". The Dickinson sheet was offered three titles out of the poem —
**Done with the Compass**, **Rowing in Eden**, **A Heart in Port** — and one out of Ryan's own
prose, and he picked **The Swell and the Dwell**.

**It is the right call and the convention survives it.** The reason a reading is titled from
the specimen is that the title should say what the sheet *found*. This sheet mounts two poems:
Dickinson's and Ryan's reply. "The swell and the dwell of relational tides" is the sentence in
which the reading actually happens — it is the frame that lets the poem be about
co-regulation — and no line of Dickinson's holds both halves of it, because her poem only has
the swell in it. **A title out of the specimen would have named half the sheet.**

So the rule now reads: **a reading is titled from a phrase in the specimen unless the reading's
own hinge sentence is somewhere else, in which case it is titled from that.** The address still
names the work — `/wild-nights` — which is the half of the split that was always doing the
navigational work.

### Our own verse gets a component, and it is rust where the specimen is moss (2026-09-08)

`.qe-verse` in `queering.css`, added for the Dickinson sheet, which is the first one to mount a
poem of ours next to a poem of somebody else's.

**`.qe-poem` could not be reused and it was not close.** It wraps a `<blockquote>` with a
`cite` and a citation in the `figcaption`, because it mounts a specimen. Ryan's reply is not a
quotation of anybody, has no source to cite, and putting it in a blockquote would have made the
markup say it was somebody else's — on the one site whose stated risk is a wrong attribution.

**The distinction is carried by the two things a reader sees first, and both alias tokens:**

| | the specimen | our reply |
|---|---|---|
| rule | moss, solid, on the **left** | rust, on **top** |
| face | the display face, Fraunces | the body face, Newsreader, italic |

**And it is never carried by styling alone.** `.qe-verse-label` says whose words these are in
words — "In reply — Ryan Boren" — so plain view, a screen reader, a print-out and a
stylesheet-less render all still say it. That is the same rule as the `<del>`/`<ins>` fix on the
Miranda sheet: **a distinction that only exists in CSS does not exist.**

Every line is its own `<span class="l">` with a hanging indent, for the reasons already written
down under *Verse gets a shared component*. There is deliberately **no `.l-in`**: the
alternating indent is a fact about Rossetti's 1896 compositor and has no business in our verse.

### A licensed plate, for the first time (2026-09-08)

Every plate on this site until now has been public domain and said so. The Dickinson facsimile
is **CC BY-NC-ND 3.0**, from the Emily Dickinson Archive, and Ryan asked for it by name.

**Mounted, with the three conditions met deliberately rather than incidentally** — attribution
in the caption in the archive's required form, a non-commercial site, and the file unaltered
because it was requested from *Harvard's own IIIF service* at the width we wanted, so the only
derivative was made by the rightsholder's own server. `ATTRIBUTIONS.md` carries the detail and
the instruction not to resize the file locally.

**What was considered and rejected:** mounting the 1891 printed page instead, which is
unambiguously public domain and which we had already read in three copies. It would have been
the safe choice and it would have been the wrong object — **the sheet's argument is about what
the printers did to the leaf, and you cannot show that with a picture of the printing.**

**The precedent this sets, stated so it does not have to be re-argued:** a licensed image may
be mounted here when the licence permits our use, the conditions are met in the markup rather
than in good intentions, and the sheet says on its face that the plate is licensed rather than
free. The default is still public domain. **We take a rightsholder at their word on a
photograph of a flat public-domain original rather than arguing Bridgeman at them**, and that
is a decision about how this site behaves, not a legal opinion.

### Ryan's verse got punctuation and nothing else, and three places say so (2026-09-08)

His brief: *"Don't revise my writing above except to give the verse proper poetic
formatting/punctuation."* Five terminal full stops and five commas were added, and **not one
word, line break or capital was touched** — including the lower-case continuation lines, which
turn out to be consistent across all eight stanzas and are therefore prosody rather than
typing.

**The change is disclosed in three places, on purpose:** a `Reply in verse` row in the sheet's
label, a full itemised list in `ATTRIBUTIONS.md`, and the register entry. The reason is the
rule the `coming-to-terms` label already sets — **an unmarked edit of our own published text is
the same failure as an unmarked edit of somebody else's, and the site just happens to be the
injured party.** A verse written for one person and mounted on a public plate is exactly the
case where that rule earns its keep.

### Corroboration means a different library, not a different file (2026-09-08)

The Rossetti entry in `ATTRIBUTIONS.md` says its colon was verified in "two separately scanned
copies", and it happened to be two different libraries. **The Dickinson sheet nearly shipped a
broken piece of type as a variant reading**, because the first two scans of page 97 of *Poems,
Second Series* both come out of University of California Libraries holdings and both show line
11 as `mocr` instead of `moor`. They agree. They are one witness.

The University of Toronto copy has the word intact, and the sheet now reports the defect as a
defect. **The rule, written down because "two scans" reads as sufficient and is not:
corroboration means a different physical copy, from a different holding institution, digitised
by a different pipeline.** Two of those three is not enough.

**This is not a candidate for a guard script.** Nothing on disk knows which library scanned
which Internet Archive item, and the identifier suffix that gave it away — `dickrich` on both —
is a convention, not a contract. It is a reading rule, and the place for it is here and in the
ledger.

### The cabinet is the drawer shut, not the lamp switched off (2026-09-08)

Ryan asked what a dark mode here would be, having seen a dark-ground botanical print, and
the answer that survived contact with the measurements was **dark warm brown**, called the
cabinet. `changelog.html` had already been using the word for a year as its fourth entry
kind, which is how we knew the idea had a place to live.

**A dark green ground was the obvious first guess and it is the wrong one, for a reason that
is measurable rather than a matter of taste.** Green ground shares its hue with moss, lichen
and verdigris — three of the tokens the site is built from — and every accent measures worse
against it for no gain: moss text 7.1:1 against brown's 7.2, rust 6.2:1 against brown's 7.3.
Pushed to a real forest tone (`#223026`) nothing but cream clears 7:1 at all. **A green
ground makes green unusable.** It also reads as a stock eco dark theme, which is the "same
site in green" failure the palette rules already name, arriving from the other direction.

**Brown was the palette's ground all along.** The print that prompted this draws its
specimens in cream, sage, marigold and coral on near-black — `--qe-ink`, `--qe-lichen`,
`--qe-marigold`, `--qe-coral` as they already stood. The decorative five cross over
unchanged, and **deliberately still saturated**: lifting them to 7:1 was tried first and
turns every flower chalky. **7:1 is a rule for letters.** Only ink, moss and rust move.

**The inversion worth writing down: in daylight a card is lighter than the page, so the page
is the worst case for contrast; on a dark ground a lifted card is the worst case instead.**
Keeping the "cards lift" instinct and solving 7:1 against a lifted panel drags rust to
`#eab1a3`, a pale pink with no rust in it. The cabinet's cards are **recessed**, which puts
the ground back as the lightest surface, keeps rust an ember, and reads better anyway —
compartments in a drawer.

**Every hex has one copy.** The cabinet values are defined once as `--qe-cab-*` inside
`:root`; the two switch rules — `@media screen and (prefers-color-scheme: dark)` on
`:root:not(.daylight)`, and `@media screen` on `:root.cabinet` — contain nothing but aliases
of them. There are two switch rules because **CSS cannot set a class from a media query**,
and the alias indirection is what makes that duplication safe: a drifted switch is a missing
ground, never a wrong colour. Both are `@media screen`, so **paper is daylight always** and
the print sheet cannot inherit a ground.

**Three things were not token flips**, and all three are now tokens rather than literals:
the foxed-paper wash, the drop shadow (a near-black that vanishes on a near-black ground),
and `--qe-flesh`, the pale flesh of a specimen. The last was a real bug: a mushroom's stipe
was filled with `--qe-paper-deep`, a colour it matched only by coincidence, so on the dark
ground four mushroom stems became holes.

**The toggle is three states behind one word, and it is the quieter of the two controls.**
Plain view changes what the page *is* and keeps the pill; this changes what the page is lying
on, so it is a word and a hairline. With neither class set the machine decides *in CSS with
no script involved* — which is the reason the media query was kept instead of letting the
pre-paint snippet resolve everything and collapsing the stylesheet to one block. A reader
with light sensitivity and no JavaScript is exactly the reader who should not be handed the
bright page. The button therefore names the ground the reader can **see**, not a preference
they have not expressed, and clicking writes the opposite one down.

**And a check that only reports is decoration.** The new cabinet pass in
`tools/check-contrast.mjs` was wired to print a column before it was wired into the failure
total, which would have made it exactly the "check nobody reads" this repo keeps warning
about. It is in the gate, and it was verified by breaking a token on purpose.

### `tools/check-contrast.mjs` gates at WCAG AA, not at the house 7:1 (2026-09-08, **closed 2026-09-09**)

Found while trying to make the new cabinet pass fail: a card lifted to 6.0:1 sailed through.
`CLAUDE.md` names the 7:1 target and `check-contrast.mjs` in the same breath, which reads as
though the script enforces the house standard. It did not — `needFor()` returned 4.5, or 3.0
for large text, and the summary line said AA in as many words. **The 7:1 figure was held by
hand-chosen tokens and by nothing else.**

Logged and deliberately not fixed at the time: raising the gate needed a run to find out what
it newly failed, a decision about the decorative-adjacent text that would surface, and
possibly a two-tier report rather than a single threshold. Doing it inside the cabinet work
would have buried both.

**Closed the next day, and the reason it closed cheaply is that the wish got called in.** The
recessed `--qe-paper-deep` panel built during the surfaces work drops `--qe-moss` to 6.90:1
and `--qe-rust` to 6.21:1 in daylight and **passed this script clean**. That is the predicted
failure, arriving in the working tree rather than in a hypothetical.

Each of the three worries turned out to be answerable:

- **What does it newly fail?** Nothing. All 9,142 text elements clear 7:1 (4.5:1 large) in
  both grounds and under print emulation. The gate could be raised without a single colour
  changing — which is the whole argument for raising it now rather than later, when it would
  arrive tangled with whatever it first caught.
- **The decorative-adjacent text.** Did not surface, because this site already keeps colour on
  rules and off letters. The two faults of that kind found the same day — the register's
  `::marker` bullets at 2.15:1, and `.qe-untidy`'s at 3.89:1 — are **invisible to this tool
  either way**: a `::marker` is not an element with its own text, so nothing measures it. That
  is now written into the tool's header and `CLAUDE.md` as a known blind spot rather than left
  to be rediscovered.
- **Two tiers or one threshold?** Two, reported apart. Under AA is `FAIL` and is illegible;
  between AA and 7:1 is `UNDER` and is readable-but-under-the-house-number. Both exit
  non-zero. Folding them into one count would hide which kind just landed, and they are
  genuinely different bugs.

`--aa` gates at AA only and prints a line saying the house target is not being measured in
that run. It exists so that an argument for a specific colour is an argument somebody makes
on the record, rather than a two-line edit to `needFor()` that nobody reviews.

**Verified by making it fail before believing it**, which is this repo's rule for a new gate:
the recessed panel was put back and reported 6.90:1 and 6.21:1 as `UNDER` with exit 1; a
2.15:1 colour was injected and reported as `FAIL` on the other tier with exit 1; `--aa` passed
the same tree with exit 0 and said why. Then reverted, and the clean tree re-run.

**One thing this does not fix.** A pass here is still not evidence about texture. The tool
composites computed colour pairs, so grain under body text passes every number in it. That is
a rule in `CLAUDE.md`, enforced by nothing, and it is the next thing on this list to become
possible the day somebody reaches for a background image.
