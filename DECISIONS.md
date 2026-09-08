# Decisions

What is settled, what is open, and the reasoning for each — so the same question is not
re-litigated in three weeks.

----

## Open

### The wordmark and the tagline

The masthead currently reads **Queering.Earth** with **"Post-normal possibilities."** under
it. Both are provisional.

The tagline is Helen Edgar's own phrase from the founding brainstorm, chosen because it is
short and it is ours. **The claim originally recorded here — that it "carries no attribution
risk" — was wrong, and is corrected below.** It replaced the working tagline
— "Subverting, defying, disrupting, and liberating oneself from all forms of normativity
(props Nick Walker)" — which is a **paraphrase of Walker wearing his name**. See
`ATTRIBUTIONS.md` for the full reasoning and for how the page handles Walker now.

Changing either is one line in `index.html`. Whatever replaces them, the paraphrase problem
does not come back: quote him exactly, or write our own line.

### The tagline is one hyphen from Nick Walker's book subtitle

Found on 2026-09-07 while building the *Coming to Terms* sheet, in our own glossary entry for
*neuroqueer*, and then verified against neuroqueer.com.

Walker's book is *Neuroqueer Heresies: Notes on the Neurodiversity Paradigm, Autistic
Empowerment, and **Postnormal Possibilities***. Our masthead reads **Post-normal
possibilities.** One hyphen apart, on a site whose home page quotes Walker, about the subject
of Walker's book.

That is not proof of borrowing. Helen wrote the phrase in the founding brainstorm, and
*post-normal* has its own separate lineage in post-normal science — Funtowicz and Ravetz,
early 1990s — which is worth checking properly before anyone leans on it. But "it carries no
attribution risk" is not a sentence this file can keep. The risk is the one `ATTRIBUTIONS.md`
was written for: our phrase, somebody else's book, and no line on the page saying which is
which.

**Three ways out, and the choice is Helen's and Ryan's, not a session's:**

1. **Keep it and credit the resonance** — a line somewhere that Walker got there first, which
   costs nothing and closes the question permanently.
2. **Keep it and say nothing**, on the grounds that Helen arrived at it independently and
   post-normal predates them both. Defensible, and it stays defensible only for as long as
   nobody notices the subtitle.
3. **Change it.**

What is *not* available is leaving the file asserting there is no risk here. That part is now
fixed regardless of what happens to the tagline.

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

### Woolf's "resonant and porous" line, on More Realms

Still open, and still not ours to fix. [Monotropa Uniflora and Monotropism](https://morerealms.com/monotropa-uniflora-and-monotropism/)
quotes Woolf's mind as "resonant and porous… naturally creative, incandescent and undivided,"
attributed to Woolf 1929 *as cited in* Popova 2021 rather than to *A Room of One's Own*
itself. A primary cited to a secondary is the exact shape `ATTRIBUTIONS.md` exists to catch.
Hers to correct on her own site; ours to check against the book before any sheet reuses it.

----

## Settled

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
