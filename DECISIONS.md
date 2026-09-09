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

**Open, and left open on purpose: the register wants an index by sheet, not a contents list.**
What a reader of `/changelog` wants is usually "what happened to sheet X", and the accessions
are grouped by date. That is a different artifact, it needs a real editorial decision about
how a sheet's entries are gathered across accessions, and approximating it with a contents
list is what the measurement just talked us out of.

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
