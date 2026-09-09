---
title: "The accession register"
url: "https://queering.earth/changelog"
updated: "2026-09-09"
description: "The changelog for Queering Earth: every sheet as it was mounted, every plate that came off again, and every label we corrected — including the attributions we got wrong and exactly how they were fixed."
licence: "CC-BY-SA-4.0"
licence_url: "https://creativecommons.org/licenses/by-sa/4.0/"
attribution_ledger: "https://github.com/Stimpunks/Queering-Earth/blob/main/ATTRIBUTIONS.md"
generated_by: "tools/make-markdown.mjs from the page's own <main> landmark"
---

[Queering Earth](https://queering.earth/)

Register · the changelog

# The accession register

A herbarium keeps a register: a ledger of every specimen as it entered the collection, and of every annotation slip pinned to a sheet afterwards — a name re-read off the plate, a locality corrected, an identification withdrawn. This is that book for this site. It is backfilled from the whole commit history and kept up from here.

It records four kinds of change: a **sheet mounted**, a sheet **re-determined** — reworked enough that what it shows is different — a **label corrected**, and work on the **cabinet**, meaning the site itself. Typo passes and small tidying are left out. Anything that changes what a sheet *claims* is in.

The full working — every quotation, whose it is, where it came from, and the day somebody read the primary and confirmed the wording — is in `ATTRIBUTIONS.md`; the reasoning behind every settled and open question is in `DECISIONS.md`. Both are in [the repository](https://github.com/Stimpunks/Queering-Earth), which is the source of truth for this site. If something on a sheet is wrong, it belongs in this register. [Say so](https://github.com/Stimpunks/Queering-Earth/issues), and it will be.

Why the corrections are in the ledger and not in a drawer

Our sibling site [Star Stuff](https://starstuff.earth/) risks a wrong fact. This site risks a wrong *attribution* — a definition trimmed to fit a masthead, an object quietly generalized, a paraphrase left wearing somebody’s name. Nearly every page here carries somebody else’s words, and the citation is the only evidence a reader has.

So the errors are entries like any other. A byline that put Helen Edgar’s name on prose she did not write. A journal citation handed to us with the wrong issue and the wrong pages. A caption that said Miranda had never seen anybody but her father and Caliban, when the play has her half-remembering four or five women. Each one is named below with what it said, what it says now, and how it was caught. The working has always been in the repository. **This page is the account of it that a reader can actually reach.**

[Index by sheet](#qe-index-h) — the same entries filed by what they happened to, at the foot of the page.

- Mounted
- Re-determined
- Label corrected
- Cabinet

2026 · 9 September · latest

## The site was measured against somebody else’s specification, and the first thing it found was a defect this cabinet had already named, already fixed one layer up, and never thought to look for underneath

Audited against [The Website Specification](https://specification.website/) — the whole `required` tier, thirty-six items across ten categories, plus all twenty-one `agent-readiness` items at every status. Eight required findings, twenty-two verified passes, five items that genuinely do not apply here, and one that needs field data this site may not have yet two days after going live. The full working is in `AUDIT.md` in [the repository](https://github.com/Stimpunks/Queering-Earth), and it is a findings document rather than a fix list.

**The largest finding was ours twice over, and it is closed below.** Every sheet answers `200` at two addresses — `/on-being-ill` and `/on-being-ill.html`, byte-identical, same `ETag`. That is exactly the shape `\_redirects` describes in its own comments, found on Star Stuff on 15 August and fixed here for the hostnames on 7 September: “byte-identical documents at four URLs, which is a duplicate-content problem and an ambiguity about which address is the real one.” We wrote that down, fixed the hostname layer, and did not check the path layer. The house rule says addresses are extensionless, `check-sitemap.mjs` confirms no `.html` reaches the manifest, and every `rel="canonical"` points the right way — and the `.html` twin serves anyway, because **no file-level guard can see what the edge actually answers.** A guard that probes the served site was the thing this audit said we were missing, and there is one now.

CabinetThe plates are AVIF now, and the manuscript that cost 312 KB costs 34

Thirteen scans went out as JPEG only, with no `picture` element and no modern format — 2.4 MB of lithographs, every one of them larger than it needed to be. They now ship AVIF and WebP through a fallback chain, and **the numbers are not marginal**: Dickinson’s manuscript leaf drops from 312 KB to 34 at twice the display size and 12 at once, the Hughes from 330 to 100, the Waterhouse from 341 to 150. A reader on a retina screen now fetches AVIF and never touches a JPEG at all.

**The widths are measured rather than guessed, and that is what keeps the ladder short.** A plate is displayed at a *fixed* css width — `.qe-plate` is `23rem` and never reflows wider, `.qe-plate-wide` is the measure at `34rem` — so each scan needs exactly that width and its 2x, and `sizes` needs no guesswork about viewports. Nothing is ever upscaled past the scan: inventing pixels an 1863 lithograph never had would make the plate look worse *and* the file bigger, which is both halves of wrong.

**Quality was looked at, not inferred from a number.** The hard cases here are not the paintings — they are Dickinson’s pen and the engraved caption on Cooke’s fungi plate, because fine line work is what a lossy encoder loses first. Both were cropped at 1:1 against the resized source and compared side by side: indistinguishable, with the blue rules of her writing paper and the words “AGARICUS (LEPIOTA.) SISTRATUS. Fries.” intact. The measurements agreed — 36.9 to 40.7 — but the crops are the reason we believe it.

**The near miss is the part worth keeping.** `tools/serve.mjs` had no `.avif` entry, so the local server was sending the plates as `application/octet-stream` and the browser was quietly sniffing them — which works locally, because there is no `nosniff` there. Production sends `nosniff` on everything, and **a `picture` element does not fall through to its next source when one fails to decode**: the choice is made on the declared type, before the fetch. A wrong content type would have broken every plate on the site with no fallback to catch it. So the variants shipped one commit *ahead* of the markup, purely to confirm that Netlify types them `image/avif` before anything depended on it. It does.

`tools/make-plates.py` is a second Python tool, and **`CLAUDE.md` stopped counting.** Its rule was “the one Python tool here”, and the reason behind that sentence was never the number — it was that something has to rasterise and nothing may need `npm install`. It is a boundary now: Python touches pixels, Node does everything else. `make-images.py` *draws* from the palette; this one *re-encodes* somebody else’s scan, and folding them together would have muddled both. That is the same correction the `queering.js` rule already took, for the same reason.

Five new detectors in `check-metadata.mjs`, all made to fail before being trusted, and one of them is the quiet kind: **a scan whose bytes no longer match the hash it was encoded from.** Replace a plate with a better scan and forget to re-run the tool, and nearly every reader gets AVIF of the *old* scan while the JPEG nobody fetches shows the new one — two versions of a specimen on one sheet, and nothing looking broken. Mount it, card it, log it, file it, route it, **and encode it.**

CabinetThirty days for the plates, five minutes for the stylesheet, and a promise we declined to make

Every response carried the same header, so **2.4 MB of scanned lithographs was revalidated on every visit** — thirteen plates that have not changed since somebody photographed them and never will. They now cache for thirty days. **The half of this that was already right is worth naming:** the spec’s recommendation for HTML is `public, max-age=0, must-revalidate`, which is exactly what Netlify was sending. It is written into `\_headers` now so it is a decision we own rather than a default we inherited.

**The plates get thirty days and not a year, because `immutable` is a promise this site cannot keep.** That directive tells a browser the body can never change, and the spec reserves it for URLs carrying a content hash. Ours carry descriptive names: `annales-lugduno-batavi-1863-tab4-gonystylus-miquelianus.jpg` names one plate in one volume, and tab 4 of the 1863 *Annales* is not going to be re-cut. But *almost certainly never* is not what the word means, and a better scan could overwrite that filename tomorrow. **Asserting a fact we cannot enforce is the same failure as a gold seam on a sheet nobody corrected.** Thirty days is a claim we can keep.

`queering.css` and `queering.js` get **five minutes**, and the number is chosen for the shape of a visit rather than the size of the file. A reader moving through several sheets in one sitting revalidates once instead of once per sheet; a bad stylesheet reaches everyone within five minutes instead of sitting in caches with no way to bust it. **That bound is the point.** This site’s characteristic failure is a palette or print change that breaks pages silently — Star Stuff shipped forty-four of forty-six pages that printed *blank* — so an unbustable stylesheet is a worse exposure here than a slow one.

`stale-while-revalidate` is on the plates and deliberately **not** on those two. The HTML is always fresh, so a stylesheet one visit behind it would render a change that adds a class and its rule together as an unstyled page for that visit. **Staleness is only safe where the stale copy cannot disagree with the fresh HTML.** And `stale-if-error` now covers everything that is not `must-revalidate`, so a Netlify incident leaves the plates showing rather than broken — the two directives are never paired, because RFC 9111 cancels them and the spec calls that out by name.

**Not fingerprinting the two shared assets is a decision and not an omission**, and it is written up in `DECISIONS.md`. The clean answer the spec offers — a year and `immutable` — is available only to a content-hashed URL, which would mean a generator that renames both files and rewrites the reference in twelve pages. Every palette fix would then churn twelve HTML files and make its own diff unreadable, and **this register depends on those diffs being legible.** The prize is thirty-one kilobytes over the wire. It can be reconsidered later without undoing any of this.

CabinetThe site now says out loud, to machines, the permission it had only ever said to people — and puts the citation trail within reach of anything that takes it up

`robots.txt` has always opened with one sentence: “Everything here is meant to be read, quoted, and reused (CC BY-SA 4.0).” **It was a sentence addressed to humans, in a file read by machines.** Every training and retrieval crawler is now named and allowed explicitly, with `Content-Signal: search=yes, ai-input=yes, ai-train=yes`, and every response carries `tdm-reservation: 0`. Nothing about the policy changed; it stopped being an inference. A reservation of `1` beside a CC BY-SA licence would have been a contradiction somebody eventually has to resolve, and probably not in our favour.

**The answer is yes, and the ask is attribution — so the same pass built the trail.** Granting permission to mine a site whose one correctness requirement is credit, without making the credit reachable, would be the generous half of a decision and not the whole of it. So: a Markdown source beside every page, an index at `/llms.txt`, the whole site at `/llms-full.txt`, a feed of this register, JSON-LD on every page, and an Agent Skill at `/.well-known/agent-skills/` whose main subject is how to cite this place and how to tell a checkable fact from a reading.

**Nothing in the Markdown is typed.** `tools/make-markdown.mjs` derives each `.md` from that page’s own `main` landmark — the same landmark the mirror reads, so the copy an agent fetches cannot disagree with the page — and derives the feed from this register’s own accessions. The rule it is built around is the bluntest one in `CLAUDE.md`: two copies of the same words drift, and the accessible one is always the copy that rots. The converter *throws* on a tag it has not been taught rather than dropping it, because a converter that quietly discards an element is that same drift arriving by another door.

**One thing it refuses to flatten.** `<del>` and `<ins>` stay as HTML in the Markdown instead of becoming `~~strikethrough~~` and nothing, because the one pair on this site is `PROSPERO` struck through and *Miranda, First Folio, 1623* written in — a restored attribution, the kintsugi seam. Markdown has no counterpart for `<ins>`, so the pair would have read as “old new” with nothing saying which was which. Losing the difference between what we got wrong and what is true is not a formatting compromise here.

**The JSON-LD is authored and not generated, and this is the reason.** Every sheet’s label already distinguishes the *Maker* — who made the thing being read — from *Read by*, who wrote our reading of it. In the structured data that is `about.author` against `author`, and the two are now stated separately on every sheet: *The Army of the Upright* is by Helen Edgar and Ryan Boren, *about* a work by Virginia Woolf. Collapsing them would tell every agent on the web that we wrote Woolf. `check-metadata.mjs` refuses the conflation outright, which makes it the first gate here that checks an *attribution* rather than a fact about a file. Where a page states no reader, no author is asserted at all.

Two traps paid for, and they were the same trap twice in one afternoon. **A comment that names a tag in angle brackets is indistinguishable from that tag to a regex.** The note in `flower-codes.html` explaining that positioning goes on the outer `g` and the animation on the inner one made the converter refuse the page; then a comment added to every head, explaining the new discovery links, said `main` in brackets and made a `main`-landmark extractor match *inside the comment* and take the head as the page body. The mirror reads that landmark too. Fixed on both sides — comments stripped before parsing, and the brackets taken out of the comments — and written into `CLAUDE.md` so it is not paid for a third time.

CabinetA mistyped address no longer ejects the reader from the herbarium, and fixing it introduced a soft 404 the new gate caught

**The status code was always right.** This was never a soft 404 — a wrong address answered `404` from the day the domain was attached, which is the half of the spec’s error-page requirement that actually matters to a machine. The half it failed was the half a person sees: the body was Netlify’s default, a teal system-font page with no plate, no nav, no ground toggle, and nothing to say the reader had ever been here. `404.html` now carries the masthead, both view controls, the before-first-paint snippet, the footer, and all eight cards, so a character out of place lands somewhere you can carry on from.

The drawing is **an empty mount**: a stem mounted diagonally across the sheet, six leaves thinning as they climb, and nothing at the tip. The herbarium version of a 404 is the sheet whose specimen is not on it. The first attempt was a tall narrow sprig that filled a sixth of its viewBox, which at `width: 100%` scaled into one enormous vertical stroke — a reminder that these drawings are sized by their box and not by their content. `--len` is the measured path length, 496, read off `getTotalLength()` rather than guessed.

**Fixing the page introduced the exact fault the spec item leads with.** `404.html` is a real file, so `/404` and `/404.html` both answered `200` with the error page — a soft 404, at two addresses, created by closing a finding about error pages. `check-addresses.mjs --live` reported both within a minute of the deploy, which is the first time a gate here has caught a regression the same pass that shipped it. Two rewrites in `\_redirects` serve the page with a `404` status instead; the self-reference does not loop, and that was verified rather than assumed.

Two gates objected to the page for reasons that are wrong for an error page, and both now carry **a named exception rather than a silent skip**. `check-sitemap` has `NOT\_CONTENT`, because an error page has no address to list and a listed URL that errors is a coverage fault. `check-addresses` has `NOT\_ADDRESSED`, and is *stricter* about the page than the rule it excuses it from: it asserts the file exists at all, that a nonexistent address serves *our* page and not Netlify’s, and that neither `/404` nor `/404.html` answers anything but `404`. Both are allow-lists, so a third entry is a decision somebody makes and reviews.

Three omissions, each argued beside itself in the file rather than here. **No `rel="canonical"`**, because the page is served at every unmatched address and a canonical would tell a crawler that every wrong URL on the site is one real page. **`noindex`**, because the page is thin by design and the spec asks for an explicit policy rather than an implicit one. **No social card**, because a new *sheet* needs one and this is furniture that should never be shared on purpose — a broken link that unfurls as a bare link is telling the truth. No provenance line and no contents list either, which is how `/` and `/design` already behave: furniture is not a sheet.

CabinetOne address per sheet at last, and a fourth gate that asks the site instead of the files

**Netlify shadows a redirect with a real file, and `on-being-ill.html` is a real file.** That is the whole mechanism, and it is why writing the rule down four times over did not enforce it: the house style says addresses are extensionless, `check-sitemap.mjs` reported “locs still carrying .html — none”, every `rel="canonical"` pointed the right way, and `check-markup.mjs` had nothing to say. All four were correct. **None of them can see what the edge answers.** `\_redirects` now carries a forced `301!` for each of the ten sheets and for `/index.html`, enumerated rather than globbed so that a sheet without a rule is reportable by name.

**The site was already redirecting the misspelled extension and serving the correct one.** Netlify got every near miss on its own — `/on-being-ill/` with the trailing slash and `/on-being-ill.HTML` in the wrong case both `301` here properly, because neither has a file to hide behind. Only the exact-case extension did. That is how this sat unnoticed from the day the domain was attached: the defect was invisible precisely where the file system agreed with the request.

`tools/check-addresses.mjs` is the fourth gate and **the only one that knows what the edge answers**. Offline by default, like the other three: it reads `\_redirects` against the pages on disk and reports a missing rule, an unforced one, a wrong target, a stale one, an internal address carrying `.html`, and a root-relative asset. With `--live` it goes and asks the site, because **a redirect loop is how this file fails** and a loop cannot be seen offline. All six detectors were made to fail before the gate was believed — an unforced rule reported as “needs 301! — on-being-ill.html is a real file and shadows an unforced rule”, which is the failure that would otherwise look green.

Two smaller inconsistencies went with it, both found by Ryan browsing the files locally rather than by any check. The **two favicons and the touch icon were root-relative** while `queering.css` and `queering.js` were not — one rule applied two ways, and now guarded. And the index at the foot of this page pointed at `/index`, which took a needless hop and was a third address for the plate. **The local-browsing question has no fix and that is the trade:** nothing on disk is named `on-being-ill`, so relative links would not help either. Extensionless addresses need a server, which is what `tools/serve.mjs` is for, and `CLAUDE.md` now says so instead of leaving it to be rediscovered.

CabinetTwo response headers the site had simply never sent, and a policy that carries exactly one directive on purpose

**Nothing here said who was allowed to frame a sheet.** No content policy, no `X-Frame-Options`, not from this repository and not from Netlify’s defaults. The usual argument for that header is session theft, and it does not apply to this site: there is no login, no form, and no authenticated action to hijack. **The reason it matters here is attribution.** Anybody could load a sheet inside their own chrome and present it as theirs — on a site whose one stated correctness requirement is that credit reaches the person it belongs to. `frame-ancestors 'none'` and `DENY` now, together, because the older header is what very old browsers still read.

The transport header was Netlify’s default and a year short: `max-age=31536000` with no `includeSubDomains`. It is two years and the subdomain flag now. The spec asks for the subdomain audit before that flag ships, because one HTTP-only subdomain breaks the moment it does — `www` answers `301` over HTTPS and there is nothing else under the name, so the audit came out clean. **No `preload`**, and that is the current advice rather than an omission: the preload list’s own operator now discourages it, browsers auto-upgrade plain HTTP regardless, and getting a domain off the list takes months.

**The content policy carries `frame-ancestors` and nothing else, and that is the trap worth writing down.** Every page has an inline `<script>` in its head — the snippet that applies both stored view preferences before first paint — and inline style throughout. A `default-src` or `script-src` added here without `'unsafe-inline'` would kill that snippet, and the page would flash the decorated sheet at the reader who turned decoration off, or the daylight sheet at the reader who asked for the cabinet. A hardening pass that looks like an improvement and breaks an accessibility feature is the failure this note exists to prevent. The reasoning is in `\_headers` beside the rule, not only here.

2026 · 9 September

## Fifteen panels wore the specimen’s clothes, twenty-five margin values passed for a hand-kept register, and the site’s gold was being spent on the least interesting thing that happens to a sheet

Prompted by Ryan reading on wabi-sabi in web design, and by a scoring of this site against the seven aesthetic principles that article names. Six of the seven were already here — two of them, *fukinsei* and *datsuzoku*, more thoroughly than the article states them. *Seijaku*, the quiet, was measurably the weakest. And the list circulating as “the seven principles of wabi-sabi” turns out to be Hisamatsu Shin’ichi’s seven characteristics of **Zen art**, relabelled somewhere in transmission — with the third of them, the one about age, glossed in the design advice with **no age left in it**. That is why “patina” recurs in that literature without ever becoming a principle, and this accession is mostly about that hole. The [colophon](https://queering.earth/design) now carries the scoring, and says what we can and cannot vouch for in the thing we are borrowing.

MountedEvery sheet now says when it was mounted and how often it has been corrected since

**The patina was already here and only we could see it.** This register has recorded a re-determination or a corrected label for every one of the seven sheets, and not one sheet said so on its own face. A herbarium sheet carries its annotation slips *on the sheet* — that is what makes an old sheet look old, and it is information rather than ornament.

So the foot of each sheet carries `.qe-provenance`: the mounting date, the count of label corrections and re-determinations since, and a link from each clause to the entry here that did it. It is inside `<main>`, unlike the sibling nav, because a sheet’s own accession history is content about that sheet and the mirror should have it.

**Age you can read beats age you can only see.** It is true, it is checkable, it survives plain view and paper and a screen reader and 400% zoom because it is a sentence, and it accrues on its own as this page grows. Every alternative considered — a noise tile, a grain filter, a torn edge — was a picture of age drawn over the words.

All seven sheets came out mended, so the seam is on all seven and today it distinguishes nothing. That is a fact about this site rather than a fault in the device, and inventing an unmended sheet to make the gold mean something would be the exact failure the rule below forbids. Sheet No. 8 will arrive clean.

Re-determinedThe gold moved off mounting and onto the mend, and the drawing at the top of this page moved with it

**Kintsugi is not that the crack shows.** It is that the most precious material in the workshop is spent on the break. Read that way, this register had its taxonomy backwards: `--qe-marigold`, the site’s gold, marked **Mounted** — the routine intake — and the corrections got cooler colours.

Two tokens swapped. **Mounted** takes `--qe-lichen`, because mounting a sheet is the ordinary event. **Re-determined** takes `--qe-marigold`, because a re-determination is the largest correction a register records: the specimen turned out to be a different thing. **Label corrected** keeps `--qe-coral`, the smaller mend. On a site that publishes a ledger of its own mistakes, spending the gold on *we got this wrong and fixed it* is an argument rather than a decoration.

The vine at the top of this page is the legend — four blooms in the four kinds’ colours, in the order the legend gives them — so its second and third flowers changed too. A legend that no longer matches the thing it explains is worse than no legend.

The unclassed default for an entry and a chip is now `--qe-rule` and not an accent, so a mistyped class reads as plain instead of quietly passing for one of the four. `--qe-verdigris` leaves the register and keeps its other jobs: the green carnation, and the second butterfly.

CabinetThree surfaces, because fifteen components were sharing one and a reader could only rank them by reading the label

`background: var(--qe-card)` appeared fifteen times in the stylesheet, thirteen of them with the same `1px` rule and the same `2px` radius. So the specimen, the mounting label, our own closing commentary and a housekeeping note were **the same object to the eye**. That is a defect in visual hierarchy and not a matter of taste: a reader cannot tell somebody else’s words from ours by looking, only by reading the label.

Three surfaces now, and a new panel takes the one that says what it is. **Bare** — space only — for our own commentary, which is the default. **Ruled** — `--qe-card` in a hairline box — for an object mounted here. **Ruled off** — hairlines above and below, no fill — for the ledger’s own housekeeping. `.qe-restaged` went bare, `.qe-untidy` and `.qe-register-note` went ruled off, and *ruled* now means something.

**The third tier is rules and not a tint, and that is a measurement.** A recessed `--qe-paper-deep` panel was tried first. In daylight it drops `--qe-moss` to 6.90:1 and `--qe-rust` to 6.21:1 — both under the house 7:1 and both over WCAG AA, so `check-contrast.mjs`, which gates at AA, **would have passed it silently**. That is the gap this file has had logged as open since yesterday, arriving as a real near-miss rather than a hypothetical.

Label correctedDropping a fill from two panels took their list markers down to 3.89:1, and the fix was the rule this stylesheet already states everywhere else

Moving `.qe-untidy` off the card ground moved its bullets from 4.17:1 to **3.89:1**. A bullet nobody can find is a list without a list in it. Checking the neighbours turned up the larger version of the same thing: the register’s own entry bullets were drawn in each kind’s accent, which measures **2.15:1 for lichen** and 2.40:1 for marigold on paper.

Both fixed by the rule this stylesheet states in five other places: **the colour goes on the rule and never on the glyph.** The markers took `--qe-moss`, a text token at 7.80:1, and the accent stayed where it already was — the entry’s left rule and the chip’s underline. `.qe-untidy` gained a coral dashed rule in exchange, at 3.89:1, which clears the 3:1 a graphical object is held to.

Neither of these was a regression the guard could report: a `::marker` is not an element with text, so nothing measures it. Found by measuring by hand, which is the only thing that has ever found this class of fault here.

CabinetSpace is a scale now, because twenty-five unrelated margin values do not read as a hand-kept register — they read as noise

The sheet used twenty-five distinct margin values: 2, 2.5, 1.5, 0.7, 2.75, 3, 1.75, 2.25, 2.4, 2.2rem and more. **Asymmetry only reads as asymmetry against a norm.** This site’s whole typographic argument is deviation — the wonk axis, the leaning slips, the four corner sprigs each drawn for its own corner — and twenty-five arbitrary gaps flatten the deviations that were actually authored.

One line of body text is `1.19rem × 1.65 = 1.96rem`, and `--qe-space-\*` is quarter-lines of it. The page was already nearly on that scale by ear: the three commonest values were 2rem, 2.5rem and 1.5rem, and quantizing moved most gaps by one to three pixels. The scale governs the space *between* blocks; inside a block the hand is still allowed. Paragraph spacing went from 1.35rem to 1.47rem, which is the one deliberate loosening.

Three corner profiles as well, spread so that no two panels a reader sees together are cornered alike: **a sheet handled a hundred times does not have four identical corners**, and thirteen components carried the same radius on all four of theirs. It is a radius, so it costs nothing in contrast and nothing on paper. That is *koko* for the price of a token.

CabinetThe foxing was pinned to the window while the paper moved under it, and all nine sheets were stained identically

The paper wash was `position: fixed`, so the stains held still as the sheet scrolled past them, which is the one thing a stain does not do. It is `absolute` now, against a `position: relative` body, so the foxing belongs to the sheet and travels with it.

The four stain positions were also hardcoded, so every sheet on the site was foxed in exactly the same four places. **Nature does not repeat its foxing.** They are `--qe-fox-\*` tokens now, stated per page in the markup — the same idiom as `--rot` on a slip, because a stain is a fact about one piece of paper and not about the site. The front page keeps the original four as the fallback.

**Still not texture, and that is now a written rule.** The research this came from recommends a noise tile and a `blur(0.5px) contrast(1.1)` filter. Both are refused. A noise tile varies effective background luminance per pixel, and `check-contrast.mjs` composites against computed colour pairs — **it cannot see a texture at all**, so a grain under body text would pass every guard here and fail real readers. Foxing goes on the ground, the tape, the sprigs and the rules, and never under a letter.

MountedLong sheets carry a contents list, every section has an address you can share, and the register has the addresses but not the list

**On this sheet** — the within-page twin of *Elsewhere on the plate* — now sits after the lede on the five longest sheets and on the colophon. Every `<h2>` on those pages, and every accession on this one, carries a small `§` beside it that is a link to itself, so a reader can send somebody straight to [a word missing from the copy you will find](https://queering.earth/wild-nights#missing-word) or to [the wabi-sabi section](https://queering.earth/design#wabi-sabi).

**The list is derived and the addresses are authored, and the split is the whole design.** A hand-kept contents list is a second copy of every heading, and the oldest rule here is that two copies drift and the accessible one rots — so the list is built from the page’s own headings and never typed. But an id derived the same way would die the moment anybody reworded a heading, taking every link a reader had shared with it. So the ids are short, topical, and *written in the markup* — `#eden`, `#the-colon`, `#quetelet` — the way a slip’s angle is written there. **The permanent thing is authored, the label is computed, and nothing is written twice.**

In the body, not a rail: the empty margins either side of the measure are the negative space the entry above spent its whole argument clearing. Not sticky, which also keeps it out of the way at 400% zoom. Not an accordion, and no highlight that follows the scroll — **no new motion**, the same rule this register already holds. `:target` marks where a reader *landed* instead, drawn in the gutter so arriving at a heading does not shift the words sideways.

The section mark is **always visible rather than revealed on hover**, because a hover affordance is one handed to mouse users and to nobody else.

CabinetEvery section on the site has an address now, and the home page still has no contents list, because its contents list is the plate

Asked directly: should the front page have a contents list? **No, and the reason is that it already has one.** The plate of eight numbered cards *is* this site’s table of contents, so a list of the page’s own prose sections stacked above it would be two navigational lists competing on one page — and the one a reader arriving at the front door wants is the plate. It is also the shortest page here, at 1,362 words.

**But the two things shipped together and they are separate decisions.** Addresses are cheap: an id and a small section mark, no threshold, no furniture. A contents list is furniture and has to earn its place. Conflating them left four pages — the plate, and Sheets No. 1, 2 and 7 — with no way to link to any section on them.

The evidence was sitting on this page. **Three entries above italicise the names of front-page sections and could not link to one of them** — [*What grows here*](https://queering.earth/#what-grows-here), [*The type plays, and the words do not move*](https://queering.earth/#the-type-plays), [*Queering is a verb*](https://queering.earth/#queering-is-a-verb) — while linking happily to a section of the colophon two entries away. The attribution ledger named three more. All six are links now.

Twenty-five addresses added across the four pages. Nothing gained a contents list, and `/#what-grows-here` is now a direct address for the plate of sheets, which is a useful thing to be able to hand somebody.

Mounted[The Preferred Flower of Life](https://queering.earth/monotropa-uniflora) — Sheet No. 8, and the first that is a wall rather than a reading

*Monotropa uniflora*, the ghost pipe: a plant carrying no chlorophyll that feeds entirely through fungal networks, named by Linnaeus in 1753 for the single turn of its stem, pressed into Emily Dickinson’s herbarium, and called by her “the preferred flower of life”. Two hundred and thirty-eight years after the naming, Dinah Murray and Jeanette Buirski reached for the same Greek root to describe a mind whose attention runs in one deep channel. Following [Helen Edgar’s essay](https://morerealms.com/monotropa-uniflora-and-monotropism/), written for the fifth anniversary of Murray’s death.

**A wall is a third kind of sheet, and the difference is not decoration.** A reading has an order and arrives somewhere; a wall has a *chorus*, and its argument is made by accumulation. Seven people across 273 years stood in front of one specimen and each saw something the others could not. A herbarium sheet that has been in a cabinet long enough looks exactly like that: a specimen, and a stack of determination slips in different hands, every one signed.

Which is also the one thing that did not transfer from the zine walls this was modelled on. **Those work by unattributed declaration** — a wall of statements, deliberately unsourced, which is right for a manifesto and impossible here, where the citation is the product. So the wall is either our own words or labelled slips, and never a blur of the two.

**The drawing is the first on this site with no leaf in it**, and the absence is the argument: every other panel here is green because every other specimen photosynthesises. Two drafts were discarded against the drawing rules — one stood the pipes on a single thread, which is the baseline rule 1 forbids, and one drew them upright, which loses the *one turn* the genus is named for.

**The biology is deliberately absent, and that is the shelf division doing real work.** Myco-heterotrophy has numbers attached and belongs to [Star Stuff](https://starstuff.earth/symbioses-field-guide.html), which risks a wrong fact. This sheet has the naming, the letter, the poem, the editor, and the word. The mounting label carries a *Biology* row saying where it went — the first time the two sites have split one subject on purpose.

Label correctedA much-quoted Mary Oliver sentence is in the wrong book and is missing the half that answers it, and it took owning both books to find out

The essay this sheet follows opens on “Attention without feeling, is only a report.” credited to Mary Oliver’s *Upstream* (2016). **It is not in *Upstream*.** Ryan owns the book and looked. It is in *Our World* (2007), nine years earlier, and the passage runs: “Attention without feeling, I began to learn, is only a report. An openness — an empathy — was necessary if the attention was to matter.”

Two things happened to it. Three words went from the middle — *I began to learn* — which turns something Oliver came to over time into an aphorism she hands down. And **the entire second sentence went**, which is the one that says what attention needs instead. **The version in circulation states the problem and drops the answer.**

**It survived because it was uncheckable.** A reader who wanted to verify it would have opened *Upstream*, not found it, and assumed they had missed it. Finding this needed somebody who owned both books and was willing to conclude the citation was wrong rather than that they had looked badly.

Our sheet quotes both sentences, cites *Our World*, and says on its face that this is not where the line is usually credited. **Not corrected on More Realms from here** — that is Helen’s page and hers to change; the paths are in the decision log.

Re-determinedWoolf’s “resonant and porous” is exactly right, and it is Woolf guessing at what Coleridge meant

An open question since 8 September, closed because a sheet finally reused the line. Ryan put *A Room of One’s Own* in the library and it was read there: chapter VI, pp. 148–149. **The wording is Woolf’s, the ellipsis is honest, and nothing had been tightened** — the only fault was a primary cited to a secondary, and our sheet cites the book.

One nuance came out of reading it in place. The sentence is “He meant, perhaps, that the androgynous mind is resonant and porous…”, and two sentences earlier the *he* is named: “Coleridge certainly did not mean, when he said that a great mind is androgynous…”. So the line is **Woolf speculating about another critic, hedged twice**. Quoting it from *the androgynous mind* onward promotes a guess to a definition. Small, and exactly the shape this site watches for, so the sheet quotes from *He meant, perhaps* and names Coleridge in the caption.

The Dickinson letter came back with three characters of drift as well — a dash for a full stop, a lowercased *Child*, an inserted *the*. Nobody did it on purpose and it is what happens to a quotation copied from a copy. It is recorded because this sheet’s own subject is that Dickinson’s punctuation and capitals were regularised by her first editors, and here is the same drift, on the same writer, in 2026.

Label correctedA 2005 paper’s byline deadnames its third author, and a citation generated from the record repeats it

Monotropism was set out in Murray, Lesser and Lawson’s 2005 paper in *Autism*. **Its third author is Wenn Lawson**, a trans man who has published under Wenn for years. The journal record, Crossref, and every citation manager that reads them still carry the 2005 byline, so **a citation generated automatically deadnames him.**

Reproducing a publisher’s record over a living author’s own name is not neutral accuracy — it is a database outranking a person, and on a site about queering normativity it would be a poor place to let that pass without comment. The sheet cites him as Wenn Lawson, states what the byline says so the paper stays findable, and explains why in a sentence. Helen’s essay already does this correctly and is where we saw it done.

CabinetThe card generator reported a hand-kept list of files rather than the files it wrote, and the new card went missing from its own summary

The social card for Sheet No. 8 generated correctly and **did not appear in the run’s summary**, because that summary iterated a hardcoded tuple of filenames nobody had added a line to. Noticed by eye.

Harmless in that direction and not in the other: the same list would print a complete-looking report while a card had **silently failed to generate**. The summary now enumerates what was actually written and prints a count, so a new card reports itself.

The card also needed its own drawing. The stock sprig puts leaves in lichen and three coloured heads on a stem, which is right for every other card here and **exactly wrong for the one plant defined by having neither**. A card showing green leaves on the ghost pipe is the card arguing with the page.

MountedThe register is indexed by sheet at the foot of the page, because a contents list is front matter and an index is back matter

This ledger is written **by accession**, which is by date, because a sheet, its corrections and the CSS it needed are one dated event. That is the right unit to *write* in and the wrong one to *look something up* in — a reader here is usually asking what happened to one sheet, and its entries are scattered across sixteen dates. [Index by sheet](#qe-index-h) is the same entries filed the other way.

**The distinction the attempt above missed is that a contents list is front matter and an index is back matter.** That is the whole reason one measured badly here and the other does not: front matter delays every reader, and back matter delays none. The index sits at the foot of the page, where a bound volume has always kept one, and a single line up by the legend points down at it. The first accession is back to where it was.

**Which sheet an entry concerns is stated in the markup, never guessed from its links.** Deriving it would have been quick and wrong: the Dickinson accession links three sheets and concerns one, so incidental cross-references would have filed corrections under sheets they have nothing to do with. On a site whose whole risk is a wrong attribution, **an index that silently misfiles a correction is the worst thing we could ship**. So all seventy-three entries were read one at a time and each declares its own sheet. Two of them genuinely belong to two — the byline rule changed Sheet No. 4 and gave No. 1 a second reader in one stroke — so seventy-three entries file as seventy-five lines.

**The groups are ours and only the filing is the machine’s.** Every heading, sheet number and the order they appear in are written into this page, because they are editorial words. The script clones each entry’s existing name and its existing kind chip and puts them under the group the entry declares — nothing composed, nothing summarised, nothing truncated, so **the index cannot call an entry something the entry does not call itself**. The group headings were checked against each sheet’s own title and against the plate’s cards rather than typed from memory.

CabinetA fourth guard, because a mistyped sheet name drops an entry out of the index and leaves the page reading perfectly

The failure this needed protecting from is the silent kind. A typo in an entry’s declared sheet does not throw and does not show: the entry matches no group, **vanishes out of the index**, and the register above it still reads exactly right. On a page whose subject is corrections, an index that quietly loses one is the fault least likely to be noticed and worst to have.

`check-markup.mjs` now validates every declared sheet against the pages that actually exist, reports an empty declaration, and reports a group that nothing files into — which catches the same typo from the other end, since a misspelling breaks the match in both directions at once.

**Made to fail before it was believed**, which is now four for four on this site’s guards: a typo’d entry, an emptied declaration and a stale group were each introduced on purpose and each reported with a line number and a non-zero exit, then reverted and the clean tree re-run.

One layout attempt was thrown away on measurement, too. The index lines were first a wrapping flex row with the kind chip beside the name. A chip plus an entry name is wider than the measure almost every time, so **every single line put its chip alone on a row above itself** and the index came to 6,726px for no extra information. Ordinary inline flow — the chip opening the line, the name wrapping beneath it — is 5,502px, and is what an index entry has looked like since long before any of this.

CabinetThe register looked like the strongest case for a contents list and measured as the worst one, so it was built, measured, and taken out again

This is the longest page on the site — sixteen thousand words — so it got the contents list first. Then it was measured. **An accession headline here is a sentence**, which is this register’s own design decision written down where it was made, so the labels average **148 characters** against 22 to 34 on a sheet. The block came out **1,293px** against 319 to 510 everywhere else, and it pushed the first entry three and a half screens down the page.

Both ways to shrink it were closed. **Truncating a label is this site’s characteristic failure applied to itself.** Writing a short label beside each headline is the second copy that drifts. So the register keeps its section marks and its sixteen addresses, and has no contents list. **Removed after measuring, rather than kept because it had been built.**

**What this page actually wants is an index by sheet, and that is left open rather than approximated.** A reader here is usually asking what happened to one sheet, and the accessions are grouped by date. Gathering a sheet’s entries across accessions is a real editorial decision, not a layout one, and the measurement above is precisely the argument against reaching for the nearest component instead.

MountedThe colophon scores this site against the seven principles, including the two it fails, and names what it cannot vouch for in them

A new section on [the colophon](https://queering.earth/design): what wabi-sabi is, which of the seven principles this sheet actually manages, and which two it was weak on. **Six of the seven were here by accident** — a herbarium sheet is already foxed paper, a faded specimen, a hand-lettered label and a mount that has been handled — so the honest framing is that we found the vocabulary after the fact and it told us which one we had been getting wrong.

The two failures are named rather than dressed up. *Seijaku*, the quiet, was **a measurable defect and not a mood**: fifteen components sharing one surface and twenty-five unrelated margin values. *Koko*, the weathered one, we had **nothing for at all** — every candidate was a picture of age painted over the words.

And a panel of what we cannot vouch for in the borrowed thing itself, because a section that scores a site against seven principles owes the reader the provenance of the seven. **They are not wabi-sabi’s.** They are Hisamatsu Shin’ichi’s seven characteristics of *Zen art*, from a 1971 book **we have not read**, reaching us through a peer-reviewed paper that cites it. The page says all of that on its face.

Label correctedThis entry claimed a source swapped one principle for another, which was written from memory and is not established

The note at the head of this accession, and the decision log with it, stated flatly that the design advice *names shibui in the slot where Hisamatsu names koko* — and that the swap is what dropped the aging out of the principle. **That is not established.** At least one rendering of Hisamatsu’s seven gives *shibui/shibumi* for that characteristic itself, glossed “lofty dryness”, which is the same sense the *koko* renderings carry. Which term is Hisamatsu’s cannot be settled without the book, and we do not have the book.

**It was written from memory before anything was checked**, and it was caught by the sentence immediately after it, which said to verify against Hisamatsu before any of this reached public copy. Writing the colophon section was the moment that check came due.

What survives is the part that is checkable against two texts a reader can open: whatever the term should be, **the design advice glosses its third principle with no age in it**. That needs no ruling on anybody’s vocabulary. Corrected here, in the decision log, and in the attribution ledger — where the citation for the paper was re-pinned from **Crossref’s own record** rather than a search summary, for the reason the Wassell entry on this page already records.

Label correctedOur own foundation published the line this site’s gold seam is built on, four months before we reinvented a near copy of it

The kintsugi device described above — the gold spent on a correction rather than on a mounting — was designed this morning from a general reading of kintsugi, and every note, commit message and entry described it in our own words: *the gold goes on the mend*. A library search then turned up [Stimpunks Foundation’s own page on kintsugi](https://stimpunks.org/2026/05/06/infodumplings-kintsugi-and-finding-the-gold-within-you/), published 6 May 2026, saying “The cracks are where the gold goes.”

Nobody took anything from anybody. But **a house phrase already existed and we had reinvented a near copy of it**, and the version about to ship read as though the idea started in a stylesheet. Over-crediting others and under-claiming for ourselves is the safe direction, and that applies to our own colleagues at least as much as to strangers. The colophon now cites theirs and calls ours the small version.

**Their page also supplied the argument the section was missing.** “Masking is the opposite of Kintsugi.” That sentence is what makes this device belong on a site about queering normativity rather than being borrowed warmth: a site about the cost of passing for typical cannot then file its own corrections where only the maintainers can read them. **A hidden correction is a masked one** — which is the argument for this register, arriving from Stimpunks rather than from a design blog. The sentence is theirs; the application to an accession register is ours; the page says which is which.

CabinetThe guard now measures the number this house publishes, and it was raised on the day the gap was nearly spent

The style guide asks for **7:1**. For this site’s whole life `check-contrast.mjs` gated at **4.5:1** — WCAG AA — with an entry in the decision log saying so and a line in the working notes warning, in as many words, not to cite the script as evidence of the house standard. **A stated principle nobody measures is a wish.**

The wish got called in this morning. The recessed panel described two entries above drops moss to **6.90:1** and rust to **6.21:1** in daylight, and **passed the guard clean**, because 6.21 clears AA. It was built, measured by hand, and thrown away — but it would have shipped on a day when nobody thought to measure by hand.

So the gate moved, in **two tiers reported apart**. Under AA reads `FAIL` and means illegible. Between AA and 7:1 reads `UNDER` and means readable, and beneath the number this site publishes. Both exit non-zero; one count would have hidden which kind had just landed, and they are different bugs. `--aa` drops to AA and prints a line saying the house target is not being measured — so that an argument for a particular colour is an argument somebody makes on the record, rather than a two-line edit nobody reviews.

**It cost nothing, which is the argument for doing it today.** All **9,142** text elements on the ten pages clear 7:1 in both grounds and under print emulation, so the gate could be raised without a single colour changing. Raised later it would have arrived tangled with whatever it first caught.

**Made to fail before it was believed**, the same way the cabinet pass was: the recessed panel was put back and reported 6.90 and 6.21 as `UNDER`; a 2.15:1 colour was injected and reported as `FAIL` on the other tier; `--aa` passed the same tree and said why. Exit codes checked on all three. Then reverted.

Two blind spots are now written into the tool’s own header rather than left to be rediscovered. **A `::marker` is not an element with text**, so nothing measures it — that is how the bullets in the entry above sat at 2.15:1. And **a texture is invisible to it entirely**, because it composites computed colour pairs. A pass here is not permission for either.

Label correctedThe wash was made to tile so that no long sheet had clean paper through the middle, and it drew a visible line across the page at every repeat

The first version of the entry above claimed the wash *tiles down long pages at a 150rem period, far enough apart that a reader never meets the repeat*. Ryan met the repeat immediately, on the sheet, and said so: “I can see lines at the color transitions of the background.”

**The cause is arithmetic and not blending.** `transparent 70%` puts a gradient’s edge at 0.7 of its radius, so in a 2400px tile the stain at `8%` reaches 278px *above* the tile’s top edge and the one at `96%` reaches 352px below its bottom. Both were cut off square at the boundary, and a cut-off gradient meets the next copy of itself as a step. No amount of softening fixes a step.

Any fix that kept the tile would have had to constrain every page’s stain positions to a safe band inside it — **a trap laid for whoever writes the next sheet**, in exchange for an even cast on the two pages long enough to want one. So the tile is gone. Four stains over the whole sheet, and **a long sheet is sparsely foxed, which is what a big sheet of foxed paper looks like**. The spots do not multiply to fill it. The claim that a reader would never meet the repeat was the sort of thing this register exists to catch, and it was wrong within the hour.

2026 · 8 September

## The sheet has a second ground, and it is the drawer shut rather than the lamp switched off

A dark ground was refused once, in the entry for Sheet No. 5, on the grounds that this site has one ground and it is paper. That entry stands as a description of what it refused — a generic inverted palette arriving with a draft — and the decision has been amended rather than reversed. The cabinet is a herbarium object: dark warm brown, the drawer a sheet is filed in, and the dark-ground plate whose specimens are printed on near-black so that pale forms read.

CabinetBrown rather than green, and the reason is measurable rather than a preference

**A dark green ground takes the separation out of the colours this site is built from.** Moss, lichen, and verdigris share their hue with it, and every accent measures worse against it than against brown for no gain: moss text at 7.1:1 rather than 7.2, rust at 6.2:1 rather than 7.3. Push the green to a real forest tone and nothing but cream clears 7:1 at all. **A green ground makes green unusable**, which is a plain result and not a matter of taste.

**Brown was already the palette’s ground and nobody had noticed.** The dark-ground botanical print that prompted this is drawn in cream, sage, marigold, and coral on near-black — which is `--qe-ink`, `--qe-lichen`, `--qe-marigold`, and `--qe-coral` as they already stood. The five decorative tokens are therefore carried across unchanged and **deliberately still saturated**. Only ink, moss, and rust are lifted, to 12.8:1, 7.2:1, and 7.3:1. Lifting the decoration to the same target was tried first and turns every flower chalky: **7:1 is a rule for letters**, and the brightness belongs to the text.

It earns the mounted plates as well. The scans on these sheets are cream vellum, and cream vellum on dark brown reads as a plate lying lit on a shelf. On green it reads as a plate pasted onto green.

CabinetA card is lighter than the page in daylight and would be darker than it here, which is a trap and not a taste

**The contrast target has to be measured against the lightest surface any text sits on, and on a dark ground that is not the page.** In daylight `--qe-card` is lighter than `--qe-paper`, so text on a card gains contrast and the page is the worst case. Invert the palette and keep the instinct — a card lifted above the ground — and text on a card *loses* contrast instead. Solving 7:1 against a lifted panel drags rust to `#eab1a3`, a pale pink with no rust left in it.

**So the cabinet’s cards are recessed**, the ground is the lightest surface again, rust stays an ember, and the lift is carried by the hairline the cards already had. It reads better than the lifted version anyway: compartments in a drawer rather than paper stacked on wood.

Three things were not token flips and are now tokens, which is the same lesson the print sheet taught in 2026: the foxed-paper wash (`--qe-wash-a` through `-d`), the shadow a lifted sheet casts (`--qe-shade`, a near-black that did nothing on a near-black ground), and **the pale flesh of a specimen** (`--qe-flesh`). The last was the visible bug: a mushroom’s stipe was filled with `--qe-paper-deep`, which it only ever matched by coincidence, so on the dark ground the stems of the four mushrooms on [Sheet No. 4](https://queering.earth/invention-of-normal) became holes and the caps floated. They are cream now, which is what the dark-ground plate does with them.

CabinetA discreet control, a machine that decides when nobody has, and paper that is daylight whatever either of them says

**The ground is a class on `<html>`, the palette is entirely in `queering.css`, and the words do not know what they are lying on** — the same shape as plain view, and for the same reason. Every hex has one copy: the cabinet values are defined once as `--qe-cab-\*` and the two switch rules carry nothing but aliases of them, so a drifted switch is a missing ground and never a wrong colour.

**Three states, one word.** With no stored choice the machine decides, from CSS alone and with no script involved, so a reader who has never touched the control still gets the ground their machine asked for. The control then names the ground they can *see* rather than a preference they have not expressed, and clicking it writes the other one down; the stored choice wins over the machine in both directions. It is the quieter of the two controls on purpose — plain view changes what the page *is* and keeps the pill, this changes what the page is lying on and gets a word and a hairline. Its label is restored before first paint by the inline snippet in every `<head>`, which now carries both preferences: deferred to `queering.js` it would flash the daylight sheet at somebody who asked for the cabinet.

**Paper is daylight, always.** Both switches are `@media screen`, so the print sheet cannot inherit a ground and a reader in the cabinet who hits Print gets ink on white.

Label correctedTwo claims about this site’s own measurements were describing the daylight sheet only, and one of them was describing a check that does not exist

**The design page said three tokens clear 7:1 “against the paper”, and quoted 14.3:1, 7.8:1, and 7.0:1 without saying what they were against.** True of one ground out of two. The prose now says “against the ground”, those three ratios are labelled *on paper*, and a new section carries the cabinet’s own numbers. The swatch chips needed no change at all: they are drawn with the tokens rather than with copies of them, so they restate themselves in whichever ground you are reading in.

**And the contrast checker gates at WCAG AA, not at 7:1.** `CLAUDE.md` puts the 7:1 target and `tools/check-contrast.mjs` in the same breath, which reads as though the script enforces the house target; it measures every element and fails them at 4.5:1, or 3:1 for large text. The 7:1 figure is held by hand-chosen tokens and by nothing else. That was found by breaking a token on purpose to see the new pass fail, watching it pass at 6.0:1, and going to look at why — which is the argument for the exercise. It is **logged and not fixed**: raising the gate is a separate job with its own list of things it would newly fail, and doing it inside this entry would have buried it.

CabinetThe guard measures both grounds, and it was made to fail before it was believed

`tools/check-contrast.mjs` measured one palette on screen and one on paper. Two grounds are two palettes, so it now runs the screen measurement again under `prefers-color-scheme: dark` — 2,840 more text elements, and the pass that would notice a cabinet card drifting back up above the ground. **The print pass now runs with the dark preference deliberately left set**, so a regression that let the cabinet reach paper lands as black-on-brown in the pass that already gates.

**A new pass that reports without gating is decoration**, and this one nearly was: the failure total it feeds counted screen and print only, so the cabinet column would have printed its numbers and never stopped a ship. Both are in the gate now, and the pass was verified by lifting `--qe-cab-ink` to a value near the ground and watching 1,675 cabinet failures appear against zero on screen and zero in print.

`tools/make-images.py` reads the palette out of `queering.css` with a search for each token name, which returns whichever copy appears first in the file. Two palettes in one stylesheet make that a loaded gun: reordering the sheet would silently turn every social card brown. The lookup is anchored to the `:root` block that holds the daylight values — **a social card is a herbarium sheet, not the drawer it is filed in** — and every generated file is byte-for-byte what it was.

2026 · 8 September

## A first-person account that ends the moment two words fit had nothing under it about what a word that fits is for, and the writers who answer that were gathered on Stimpunks pages that are a finding aid and not a citation

The [Coming to Terms](https://queering.earth/coming-to-terms) sheet carried Ryan Boren’s 2022 essay with every other writer’s words stripped out of it, which left it thin. A treatment on labels is now mounted below the essay: the copia, the smorgasbord, the arrangement of building materials, and the direction of travel that decides whether a word is invention or classification.

MountedSix sections below the essay, on what a label buys and what it charges

**The frame is Ryan’s own:** labels as a copia and a smorgasbord that you mix and match and self-apply. *Copia* is the rhetorician’s word for abundance — you generate the range before you choose — and [Jordynn Jack](https://doi.org/10.1080/07491409.2012.667519) pointed it at gender in 2012. [Sonny Jane Wise](https://www.livedexperienceeducator.com/blog/theneurodiversitysmorgasbord) set the same shape as a plate you fill yourself, and [Florence Ashley](https://doi.org/10.1093/mind/fzac071) supplies the sentence that stops it becoming a free-for-all: people arrange similar building materials differently, and an arrangement is not a lie.

**The hinge is the direction of travel.** [Ira David Socol](https://web.archive.org/web/20210304193914/http://blogs.slj.com/bowllansblog/2009/05/12/using-correct-language-and-people-first-by-ira-david-socol/), writing in 2009, puts it in one line: only when people get to choose their own labels does any of this build anything. A word you reach for and the same word handed to you on a form are not one object in two coats — one is invention, the other is classification, and classification runs one way. [Nick Walker](https://neuroqueer.com/neuroqueer-an-introduction/) built that direction into the grammar, the verb before the adjective, which is the sheet’s conclusion in his words rather than ours: nobody can diagnose you with a practice.

**And the bill is real, which the sheet says at the same length as the case for.** [Helen Edgar](https://autisticrealms.com/inclusion-needs-recognition-not-erasure-a-neurodiversity-affirming-approach/) aims the complaint at the right object — take the word away and the gate is still there, only the key is gone — and refuses to choose between labels as barrier and labels as liberation. The last word goes to [a writer shedding theirs](https://autisticltd.co.uk/2024/03/04/shedding-my-labels/), and to the order of that sentence: the shedding comes first, the privilege named second, and the privilege is having had the words at all.

Label correctedThe mounting label described a sheet that carried one text, and it now carries two

The label read “The essay as published, with the quotations from other writers taken out. Ryan’s words are unchanged.” True of the sheet as it was, and false the moment anything was added under it. The label now names the second text and the month it was appended, and carries a new **Appended** line beside **Written**, so the two dates on the sheet cannot be read as one.

**The seam is marked on the page as well as in the label.** A note between the two texts says where the 2022 essay stops and the 2026 treatment starts. On a sheet whose whole subject is a word that fitted at a particular moment, letting four years of hindsight run on unbroken from the first-person account would have quietly improved the past.

CabinetEvery quotation named to the copy it was read in, and a rule about our own library corrected in the middle of applying it

The material was gathered from three Stimpunks pages, which is where it lives and is not where it can be cited from. **Every quotation was then read in the work it came from** — Wise’s post, Ashley’s published PDF, the Internet Archive’s capture of Socol’s 2009 guest post at an address that no longer resolves, Walker’s own page, Helen’s post, and the shedding post. Three originals keep spellings ours would not: “Each of us are”, “pathologizing” with a z, and “reveling” with one l.

**One line was cut and then put back, and the rule that cut it was the thing at fault.** “Language is not a set menu, it’s a buffet” is a transcription of speech from a video by The Leftist Cooks, taken down by Ryan and published on the glossary. It came out of the first draft because the caption track returns nothing and the wording could not be re-checked. **That is a reason to label a quotation, not to bin it** — a spoken line has no printing to go back to, only somebody’s ear, and the citation names the video, the channel and the date. It is on the sheet with the transcription attributed in the caption.

**So the ledger’s rule about our own library has been narrowed to what it was actually for.** It exists to stop *our own prose* — a gloss, a summary, a paraphrase — being read back later as somebody else’s wording. A direct quotation Ryan transcribed from a paper he read and published with a citation to that paper is not that; it is a first-hand reading with the source named. Papers get rented and access lapses. **Re-reading is an upgrade, not a precondition**, and the citation is the thing that has to be right.

**The gap was named on the sheet, and then it closed.** Jack’s *Gender Copia* is closed access and is held nowhere we could reach; every hit in our own library was one of *our own* pages quoting it, which is five witnesses that are one witness. The section shipped its first draft describing her argument and saying in the same breath that it was describing rather than quoting. **Then Ryan put a scan of the printed article in the library**, and the section was rewritten to quote her: the copia passage from page 3 as a specimen, the array of terms, and the four verbs from the Conclusions.

**And the print pages punctuate her differently from the digital text.** Our glossary carries `masculine=feminine`, `sex=gender`, `male=female`, `nature=culture`, `symbolic=embodied`. The printed pages carry a solidus in every one of those places. **Neither is a mistake and this is not a correction of anybody** — a slash rendering as an equals sign is ordinary publisher typesetting, the title of the same article is *Sex/Gender* in both, and the words are identical throughout. It is the [Woolf trap](https://queering.earth/on-being-ill) in miniature: two real editions, and a quotation that is only right once it is attached to the copy it came from. This sheet quotes the print pages because the print pages are what was read, and the caption says so. **Neither text is to be tidied against the other.**

2026 · 8 September

## The most-quoted sentence about lavender and Abraham Lincoln is word for word what Carl Sandburg wrote, and the man it describes is Joshua Speed

Sheet No. 7 reads violet, pansy, green carnation, and lavender as one process caught at four moments: a description becomes a code, the code is read by the people it was meant to escape, and what is left is a name in somebody else’s mouth. Four public-domain plates, two of which are the wrong object and say so.

Mounted[A Waste Garden, Flowering at Its Will](https://queering.earth/flower-codes) — Sheet No. 7

The set of four is [Sarah Prager’s](https://daily.jstor.org/four-flowering-plants-decidedly-queered/), gathered for JSTOR Daily in January 2020, and the sheet says so in its second section rather than its footnotes. **What is ours is the reading:** that a worn code fails by succeeding. It works until enough people use it, and the number of people who make it useful is the number who make it legible from outside. Then it is not a code, it is a charge — a word a newspaper can print and a court can enter into evidence — and the last move available is to wear it anyway, in the open, until it goes back to being a description.

The title is line 3 of Lord Alfred Douglas’s *Two Loves*, published in *The Chameleon* in December 1894 and read out against Wilde at the Old Bailey four months later. **The poem opens in a garden that already has the violets in it** — “white lilies / A few, and crocuses, and violets / Purple or pale” — which is the sheet’s own connection and not Prager’s. Quoting Alcaeus on Sappho in Wharton’s 1885 rendering, Douglas, the 1906 shorthand reports of the trial, Sandburg’s 1926 first edition, and Prager twice.

**The sheet is as careful about what it does not say.** Wilde’s green carnations at *Lady Windermere’s Fan*, George Chauncey’s pansy craze, the Lavender Scare, and the Lavender Menace action are all named as Prager’s or her sources’, quoted as hers where quoted at all, and not repeated as ours. A note on the page says the gap is deliberate and sends the reader to her.

Re-determinedThe streak of lavender belongs to Joshua Speed, and only the referent has moved

The sentence travels as Sandburg on Lincoln: “A streak of lavender ran through him; he had spots soft as May violets.” Page 265 of the 1926 first volume opens Chapter 54 with it, and the subject of the paragraph is **Joshua Speed**. Sandburg extends the figure to Lincoln in the next sentence but one — different words — and on page 266 gives it to “these two men” together.

**Nothing was fabricated and no word was altered.** The author, the book and the year are right, and Sandburg did say it of Lincoln, so the claim the sentence is usually deployed to support survives the correction whole. Only the *him* slipped, and the *him* is the entire meaning: a sentence about two young men who told each other their secrets in Springfield is a different sentence from a sentence about a president. **This is the failure named in `CLAUDE.md` as this site’s characteristic one, found in the wild rather than in our own drafts.** Prager names Speed in her very next sentence and her book is partly about him; this is compression in a much-retold line, and the sheet says so in as many words rather than scoring a point.

**The corroboration rule fired before an error this time, not after one.** Three Internet Archive copies were read first and all three agreed — and all three were scanned at the same centre, which is one pipeline and therefore one witness. That is exactly the trap the Dickinson entry below records, where two copies from the same library agreed on a broken piece of type. The passage was re-read in the University of British Columbia Library’s copy, scanned at the University of Toronto, before a word of it was published.

CabinetTwo of the four plates are the wrong object, and both captions say so

**The violet mounted is the wrong species.** Sappho’s violet is the Mediterranean *Viola odorata*; the plate is *Viola pedata*, the American birdfoot violet, photographed for a New York state museum survey in 1918, because that is the public-domain violet plate we had. The caption carries the correction on the page — “The plant is the genus, not the poem” — and a note at the foot of the sheet asks readers for a better plate. It is logged as open in the ledger, and the fix is one line of markup the day a *Viola odorata* plate turns up.

**The carnations are the wrong colour and there is no right one.** A green carnation is a white carnation stood in dye, so no botanical plate of the flower Wilde’s friends wore exists or could — which turns out to be a fair description of the code itself, and the caption says that too. The other two plates, the 1896 pansy and the Hulme lavender, are simply the right flowers.

The sheet’s header drawing is the four plants of the front page’s new border, drawn at size and growing out of one ground line, in the order the sheet reads them. All nine stem `--len` values are the measured `getTotalLength()`: three were declared short on the first pass, which is invisible in the finished drawing and leaves the stroke permanently unfinished in the animation.

2026 · 8 September

## Four flowers people wore when saying it in words was dangerous, drawn onto the corners of the plate of sheets

Front-page furniture. The plate of sheets in [*What grows here*](https://queering.earth/#what-grows-here) now sits inside a ruled frame with a botanical sprig on each corner: violet, pansy, green carnation, lavender.

CabinetThe border is an argument, and the line under it says whose set of four this is

**Violet, pansy, green carnation and lavender were all worn or sent as signals**, at times and places where saying it in words was dangerous. Drawing them onto the corners of the plate puts the site’s subject into the site’s own furniture rather than into another paragraph about it. The four are gathered as a set by Sarah Prager in [*Four Flowering Plants That Have Been Decidedly Queered*](https://daily.jstor.org/four-flowering-plants-decidedly-queered/) (JSTOR Daily, 29 January 2020), and the line under the frame credits her for the gathering.

**It credits her for the gathering and nothing else.** Her specific claims — Wilde’s buttonhole in 1892, Sandburg’s “streak of lavender”, the violets in *The Captive*, the Lavender Menace action — are hers and her sources’, and none of them has been read back to a primary here. So the page asserts none of them. If these four ever become a sheet, that reading comes first.

**Two things a sheet would have to say out loud, found while looking for plates.** The obvious public-domain violet plate is *Viola pedata*, an American species photographed for a New York state museum survey — not Sappho’s violet. And **no plate anywhere shows the flower Wilde’s friends wore**: a green carnation is a white one stood in dye, so every carnation plate in existence is the wrong colour. Mounting one under that name would be exactly the quiet generalization this ledger exists to catch. The plates were previewed and held back for that reason, among others.

CabinetThe frame is CSS and the corners are SVG, and the plate nearly became a list again

A four-sided vine drawn as one stretched SVG shears at its corners at every window size. A border on the wrapper never distorts, and four fixed-ratio sprigs pinned to it ride along at any width. Each sprig is drawn natively for its own corner rather than mirrored into place, because **a mirrored bottom corner hangs its flowers upside down** — fine as wallpaper, wrong on a herbarium sheet. The vine arms end in a tendril curl; a blunt round cap at full stroke width reads as a cut twig.

**The frame bleeds out into the gutter by exactly its own padding.** Padding it inward instead left the grid 387px, which is under the 417px that two 12.5rem tracks and a gap need, and the plate silently collapsed to one column — **a stack of cards, which is a list, not a plate.** That is the identical failure `.qe-plate-grid`’s own comment already records from the day the grid was written, and it still caught this change. Under 30rem the sprigs come in flush with the frame: hung outside it, the violets were clipped by the viewport at 390px.

Every new fill — four flowers and a narrow leaf — went into the print sheet’s line-art rule the day it was written rather than the day it failed, which is the standing debt from the 44 pages that printed blank on [Star Stuff](https://starstuff.earth/). The twelve stem `--len` values are measured `getTotalLength()`, not declared, which is the correction the Dickinson entry below already had to make once.

2026 · 8 September

## A heading that says the type plays was set in the same even measure as every other heading, which is a claim arguing against itself

Front-page typography only. Nothing a sheet claims about a text has changed.

CabinetThe heading performs its own sentence, and the verb carries the axis wherever it is a heading

**[*The type plays, and the words do not move*](https://queering.earth/#the-type-plays) is now set per word.** The softness rises across the first half and two words sit a degree off the line — and *do not move* is the one phrase set flat and straight, at `SOFT 0, WONK 0`. The heading demonstrates both halves of what it says rather than asserting them in an even line. Per word, never per letter: a heading cut into letter spans is one line to the eye and a stutter to a screen reader.

**The verb gets the axis at its full extent.** *Queering* in [*Queering is a verb*](https://queering.earth/#queering-is-a-verb) and *queer* in [*To queer is to adapt*](https://queering.earth/#to-queer-is-to-adapt) now run at `SOFT 100` against the heading’s own 40. Every `h2` here already sets `WONK 1`, so the deviation a reader can actually see is carried by the softness — in roman, WONK alone moves too few glyphs to register at heading size, which is the same reason the type specimen on [the colophon](https://queering.earth/design) is set in italic.

Two rules in `queering.css`, reusing the `.w` idiom the cut-out line already had, and both switched off under `html.plain` along with everything else decorative. The rotation is dropped below 30rem, where a leaning word collides with its neighbour instead of leaning away from it — the guard the leaning title on [Sheet No. 5](https://queering.earth/the-tempest) already needed.

2026 · 8 September

## Higginson wrote “let us alter as little as possible” and then printed Dickinson’s poem with eight of its nine dashes gone — and the copy a reader will find today has lost a word out of the line that asks to be moored

Sheet No. 6 reads *Wild nights – Wild nights!* as co-regulation and answers it with a poem of Ryan’s. It mounts the Houghton leaf in facsimile, which makes it the first plate here that is licensed rather than public domain.

Mounted[The Swell and the Dwell](https://queering.earth/wild-nights) — Sheet No. 6

Twelve lines, three finite verbs, and every one of them a conditional: *Were I*, *should be*, *Might I but*. Nothing in the poem takes place. The sheet reads that as the grammar of [limerence](https://stimpunks.org/glossary/limerence/) in Dorothy Tennov’s strict sense — the desire to be desired, defined by uncertainty — and reads the imagery as the clearest description of [co-regulation](https://stimpunks.org/glossary/co-regulation/) anybody wrote before the word existed: the winds are not stilled, they are made *futile*, and what makes them futile is a place and company rather than a temperament.

The compass and the chart are the instruments you need in water you do not know — continuous correction, checked and rechecked — which is masking described as equipment. Dickinson does not say they were wrong. She says they are *done with*. Quoting Janae Elisabeth, Hogenkamp, Sanghavi and Natri, Helen Edgar twice, Kapp and six co-authors, Nick Walker for Margaret Price’s [bodymind](https://stimpunks.org/glossary/bodymind/), and Helen Edgar again for Deb Dana’s [glimmers](https://stimpunks.org/glossary/glimmers/).

**The sheet carries a second poem, and it is ours.** Thirty-two lines of Ryan’s, written for a person rather than a readership, mounted at his request. `queering.css` gained a `.qe-verse` component so that our verse and a dead poet’s verse can never be mistaken for one another: the specimen keeps a solid moss rule on the left and the display face, the reply gets a rust rule on top and the body face in italic, and a label that says whose words they are in words rather than in CSS.

Re-determinedThe poem in general circulation is missing the word *but*, and the page that prints it names no edition

The [Poetry Foundation](https://www.poetryfoundation.org/poems/44087/wild-nights-wild-nights-269) prints Franklin, credits the edition, and is right. The [Academy of American Poets](https://poets.org/poem/wild-nights-wild-nights-249) prints a composite: the dashes restored, so it is not 1891; *heart*, *compass*, *chart* and *sea* still lower case, so it is not the manuscript; a comma in “Ah, the sea!” that is in neither; “Wild Nights” capitalized where neither the leaf nor 1891 capitalizes it. And line 11 reads **Might I moor**.

*Might I but moor* is a plea with a limit written into it — *if I could only*, asking for the smallest possible version of the thing. *Might I moor* is a request for permission to dock. **A poem that asks to be moored has had the hinge taken out of the asking**, and the page carries no editor, no edition and no date, only “This poem is in the public domain,” which is true of the poem and says nothing about the text. Read out of the live page on 8 September 2026.

This is the third time the register has caught this shape. [Woolf](https://queering.earth/on-being-ill) had two texts and both were hers; [Rossetti](https://queering.earth/promises-like-pie-crust) has a colon in her first printing where every circulating copy has a full stop. **Name the printing, or do not quote.**

Re-determinedWhat 1891 did to the leaf, and the one change that is not a tidy

Page 97 of *Poems, Second Series* takes nine dashes down to one — the em dash closing line 6, and even that has acquired a comma in front of it. Four of her capitals come down: Heart, Compass, Chart, Sea. *Eden* keeps its capital, because *Eden* is a proper noun in anybody’s grammar and the other four were only proper nouns in hers. Three exclamation marks and three commas arrive. Three further differences are the volume’s typography rather than editing — a two-line drop cap, the inset second line that the drop cap causes, and a space before every exclamation mark, which is the same French spacing as the 1896 Rossetti volume.

**The lineation is the exception and it deserves better than it usually gets.** Dickinson wrote “Might I but moor –” and ran out of leaf, so “Tonight –” went on the line below. Franklin records that division and reads through it; Todd and Higginson set what was in front of them. **One editor reproduced the poem and the other reproduced the leaf, and both are defensible.** The sheet says so rather than scoring a point.

Higginson’s letter of 21 April 1891 was read on page 127 of Millicent Todd Bingham’s *Ancestors’ Brocades* (1945) — rendered as an image and the type read, because that page’s OCR mangles the ampersand and the footnote marker. He is frightened of the poem, calls her a “virgin recluse” five years after her death, and prints it anyway: “Yet what a loss to omit it! Indeed it is not to be omitted.” **The sheet does not claim he made the changes** — nothing read here establishes whether the pointing is his, Todd’s or the compositor’s, and pinning it on the man whose letter survives would be convenient rather than true.

Label correctedTwo scans agreed with each other and were both wrong, because they came out of the same library

Page 97 was read in three separately scanned copies. In the first two, line 11 reads **mocr** instead of *moor* — a broken piece of type, unambiguous at native resolution, identical in both. Both are digitised from **University of California Libraries** holdings. The University of Toronto copy has the word intact.

**The sheet nearly reported a press defect as a variant reading.** The Rossetti entry in the ledger says its colon was checked in “two separately scanned copies”, and it happened to be two libraries — which made the phrase read as sufficient when it is not. The rule is now written down in both `ATTRIBUTIONS.md` and `DECISIONS.md`: **corroboration means a different physical copy, from a different holding institution, digitised by a different pipeline.** Two of those three is not enough. No guard can catch this; nothing on disk knows which library scanned which item.

Label correctedThree citations in the first draft of this sheet were written from memory, and one of them was an invented DOI

Caught before the sheet shipped, and logged because the third one is worse than anything the register has carried yet. The Hogenkamp paper was cited as `10.3389/fpsyg.2025.1546642` — a **fabricated DOI**, plausible-looking, for a paper that is actually in *Autism in Adulthood* at `10.1177/25739581261433443`. **An invented identifier does not fail; it resolves to somebody else’s work.** The Nick Walker interview was cited as `aut.2021.29014.njw`; the registered DOI is `aut.2020.29014.njw`, for an article published in 2021. And the Trauma Geek essay had the wrong Medium slug, when the right one was sitting in the glossary page we had already read.

Every DOI on the sheet is now resolved through DOI content negotiation, with title, authors, journal, volume, issue, pages and year read off the registered record; the interview also gained **Dora M. Raymaker** as its interviewer, which the registered record supplies and memory had dropped. **A DOI, a slug, a volume number and a page range are claims like any other.**

This is the third register entry about a bad reference field, and it sharpens the standing note on `check-references.mjs` without quite firing it — that note says to write the link-resolver half *if a third bad citation ships*, and none of these three shipped. But the case is stronger than the note assumed. **Both wrong DOIs return 404 from the DOI resolver**, checked: an invented identifier is mechanically detectable in a way that a wrong volume number is not, which is the first citation error on this site a guard could actually have caught. The Medium slug would not have been — that host answers a script with a 403 whether the URL is real or not, and a checker that reads 403 as broken would cry wolf on half the references here. **If the resolver half gets written, it can be trusted about DOIs and must be advisory about everything else.**

CabinetA licensed plate for the first time, a title that breaks its own convention, and punctuation added to a poem of ours

- **The facsimile is CC BY-NC-ND 3.0, not public domain.** The first thing mounted here that is licensed rather than free. The credit is the archive’s required form, the site is non-commercial, and the file is unaltered because it was requested from *Harvard’s own IIIF service* at the width we wanted — so the only derivative was made by the rightsholder’s server. Mounting the 1891 printed page instead was considered and rejected: it is unambiguously public domain and it is the wrong object, because **you cannot show what the printers did to the leaf with a picture of the printing.**
- **The title is Ryan’s phrase, not Dickinson’s** — the first exception to the rule that a reading is titled from its specimen. Three titles out of the poem were on the table. None of them holds both halves of the sheet, because her poem only has the swell in it.
- **The reply got punctuation and nothing else.** Five full stops and five commas; no word, line break or capital touched, including the lower-case continuation lines, which turn out to be consistent across all eight stanzas and are therefore prosody rather than typing. Disclosed in the sheet’s label, itemised in the ledger, and named here — because **an unmarked edit of our own text is the same failure as an unmarked edit of somebody else’s**, and the site just happens to be the injured party.
- **The header drawing is water.** One line rises out of the lower left and breaks in a curl at the upper right; one lies almost flat across the foot and curls too, because it is water and not a ground line. The two moths are deliberately together rather than in opposite corners — the poem under them is about reciprocation. Three of the twenty `--len` values were declared short on the first pass, which is invisible in the finished drawing and obvious in the animation; all twenty are now the measured `getTotalLength()`.

2026 · 8 September

## A scholar cut her own sentence down to fit a later argument, marked every cut, and in doing so demonstrated the thing the sentence says

The front page gained two sections on Pamela Demory’s *Queer/Adaptation*. One of the two quotations is a quotation of the other, five years apart, by the same person.

MountedTwo sections on the front page: *To queer is to adapt* and *The sentence adapts itself*

Nick Walker gave this site the verb. Demory gives it the motion: “To queer, then, may be to adapt; to adapt is to queer.” Written in adaptation studies rather than in neurodiversity, and arriving at the same place from the other road — “queer as a verb, as a doing rather than a being”. It is a description of what every sheet here already does to a canonical text, and its useful insistence is that doing it is not a lesser act than writing the original.

Quoting Demory’s [*Queer/Adaptation: An Introduction*](https://link.springer.com/chapter/10.1007/978-3-030-05306-2_1) (Palgrave Macmillan, 2019) at three places on pages 1 and 3, her [*Queering Emily Dickinson for the Millennial Age*](https://link.springer.com/chapter/10.1007/978-3-031-50832-5_10) (Palgrave Macmillan, 2024) once, and Linda Hutcheon at one remove, named on the page as quoted by Demory. Also on the page: the sheet count in *What grows here*, which had said three since Sheet No. 3 and now says five.

CabinetThe second quotation is a trimmed version of the first, and that is why both are on the page

In 2024 Demory quotes her own 2019 sentence and cuts it: *to evolve, to repeat, imitate, parody, make new* gone, *but also to turn* gone, and *to adapt is to queer* — the half that ran the other way — gone. Every fragment that survives is verbatim, and every cut is marked with an ellipsis.

**This is the failure mode of this site, performed correctly.** `ATTRIBUTIONS.md` exists because the characteristic error here is not an invented source but a tightened one: a sentence trimmed to fit, with somebody else’s name left attached. What makes Demory’s trim an adaptation rather than a misquotation is that you can see where the scissors went. The front page now says that in as many words, which is a better argument for the ledger than the ledger can make for itself.

Label correctedHalf of one quotation on this page has not been read against its primary, and the ledger says so

The 2019 chapter is held in full and every word taken from it was read in place. The 2024 chapter is paywalled and is not held. Its quoted-within fragments are still verified — they are checkable against the 2019 primary, fragment by fragment, and they check out — but Demory’s own 2024 framing sentence around them reached this site as a transcription, not as a page anybody here has read.

Everything checkable about it was checked: title, author, book, editors, series, publisher, and year, all against Springer’s record. The sentence itself is logged in `ATTRIBUTIONS.md` as verified in halves, with the unread half named. **A quotation we believe and a quotation we have read are two different things, and the register is where the difference gets written down rather than forgotten.**

2026 · 8 September

## An editor in 1733 decided Miranda’s hardest speech was not credible coming from her, moved it into her father’s mouth, and three centuries of editions followed him

Sheet No. 5 reads Shakespeare’s *The Tempest* alongside Waterhouse’s 1916 canvas. The layout came from Helen Edgar’s own Claude session and was adopted as she sent it; two citations in it did not survive checking.

Mounted[Miranda: To Be Wondered With](https://queering.earth/the-tempest) — Sheet No. 5

Miranda’s name is Shakespeare’s coinage, built on the Latin *mirari*, to wonder at. The sheet turns the preposition: not wondered *at*, which the play does to her constantly, but wondered *with*. Six quotations from the play, the boy player who first performed her, the speech Lewis Theobald reassigned, and the chain of everybody who has staged her since.

Quoting the play in the Arden text, and Judith Butler, Sara Ahmed, Alison Kafer, Aldous Huxley, Nick Walker, Ann Thompson, Jessica Slights and David Kathman by reference. The Theobald reassignment was confirmed at two independent sources: the Folger edition prints the speech as Miranda’s, and the Shakespeare Navigators note gives Theobald’s own reasoning — that a three-year-old could not have taught Caliban to speak.

**Same editor, same 1733 edition as Sheet No. 4.** Theobald put *weird* back into *Macbeth* over Shakespeare’s *weyward* in volume 5 of [the same Works](https://queering.earth/invention-of-normal). Two sheets now turn on one eighteenth-century editor deciding what a woman could plausibly have said.

Label correctedTwo citations in the incoming draft, wrong before the sheet was ever built

The draft’s reference list put Kathman’s “How old were Shakespeare’s boy actors?” in *Shakespeare Survey* **59**. It is volume **58** (2005); the pages, 220–246, were right. And Ann Thompson’s chapter was credited to an editor named **K. Chedzoy**. The editor is **Kate Chedgzoy** — the draft had dropped a letter out of her surname. Both corrected before the sheet shipped.

This is the failure the register already carries once: [a journal citation handed to us with the wrong issue and the wrong pages](#a-2026-09-08-rossetti). It arrives the same way every time — inside a reference list that looks finished, in a field nobody reads twice. **A volume number is a claim like any other and gets checked like one.**

A third entry credited Helen Edgar’s *Wyrd, Weird, and the Invention of Normal* to *Queering Earth*, at an address on this site that does not exist. Her essay was published at [More Realms](https://morerealms.com/becoming-weird-wyrd-normality/) in July 2026; this site published a reading of it. The reference now points at her publication, which is the byline rule from the entry below applied to a bibliography: **naming ourselves as the publisher of prose she wrote is the same elision as putting her name over prose she did not.**

CabinetFour devices from Helen’s draft, kept — and its colours, not kept

The draft arrived as a self-contained page with its own palette written in hex. The typography survived and the hexes did not: `queering.css` gained a *restaging* section in which every colour aliases a `--qe-\*` token. The leaning title, the wobbling section heads, the chain of stagers and the staging labels are all hers.

- **The chain is an `<ol>`.** It arrived as a row of spans with `→` between them — five decorative arrows read aloud as words. The order is the content, so it is a list, and the arrows are drawn by CSS with an empty alt string.
- **The correction uses `<del>` and `<ins>`,** which is what Theobald actually did. It arrived as a `line-through` on a `<span>` — invisible to a screen reader, which would have erased the one device on the sheet that *is* an argument about erasure.
- **The struck name is moss with a coral rule through it,** not coral letters at 0.65 opacity, which is how the draft had it and which fails 7:1 twice over. The colour goes on the strike, never on the letters.
- **The plate is the scan already on disk.** The draft hot-linked Wikimedia with a JavaScript `onerror` fallback reading “Plate to be inserted — source a high-resolution scan before publishing”. Waterhouse’s *Miranda* was mounted on Sheet No. 4 the same day, alt text and provenance already verified, so the sheet mounts the local file and the fallback is gone.

Both chains carry “you, reading this” on the end, which is the sheet’s own argument about itself and not a flourish.

2026 · 8 September

## A site that publishes a ledger of everyone else’s words was keeping the account of its own mistakes in a file only we could read

Four sheets in, the corrections had piled up in the repository and nowhere else. This page is the fix.

CabinetThe register itself

Backfilled from the full commit history, cross-read against `ATTRIBUTIONS.md` and `DECISIONS.md` so that every correction named here is the one those files record. Linked from the footer of every page, next to the colophon.

It is drawn as a register rather than as a list of version numbers because that is what this site already is: things collected, mounted, labelled, and sometimes relabelled. The four kinds of entry are the four things that happen to a herbarium sheet.

2026 · 8 September

## A sheet shipped with Helen Edgar’s name over prose she did not write — she declined the credit, and the answer had been written in our own colophon before the sheet was made

Sheet No. 4 reads Helen Edgar’s *Wyrd, Weird, and the Invention of Normal*: before *weird* meant strange, *wyrd* meant fate, and the thing that got invented in between was normal.

Mounted[Wyrd, Weird, and the Invention of Normal](https://queering.earth/invention-of-normal) — Sheet No. 4

A reading of Helen’s More Realms essay, with the word’s own drift down the page: *wyrd* as what comes to be, *weird* as the Fates’ own word, and *weird* as odd-looking and disturbingly different, which is where it arrives around 1820.

Quoting Alby Stone, Karen Bek-Pedersen, Mark Fisher, Robert Chapman, Eve Tuck and K. Wayne Yang, Elliot Wassell, Megan Ingram and Kai Jacobsen, and Ombre Tarragnat; describing Susan Schoon Eberly’s work on changelings and the folklore of disability without quoting it, because the article is paywalled and was not read here. Public-domain texts on the sheet: *The Wanderer*, *Völuspá* 20, *Tam Lin* (Child 39A), and Yeats’ *The Stolen Child*. The Old English gloss is ours and is labelled as ours — translators do not agree on *ārǣd*, and picking one rendering silently is picking a reading.

Label correctedThe byline. It shipped wrong, and it was corrected on Helen’s word

The sheet first carried a **Written by — Helen Edgar** row, because the argument, the sources, and the reading list are all hers. The draft flagged the risk and shipped anyway with a caveat row underneath instead of a fix. Helen read it and declined: “I can’t take any credit beyond you reading my weird stuff.”

She is right, and [the colophon](https://queering.earth/design) had already written the answer down: a label carries “the date of the reading, and who read it”, and “a specimen is collected, not written.” That is an authorship model, not a glossary entry. The label now reads **Specimen** — Helen’s essay; **Maker** — Helen Edgar; **Read by** — Ryan Boren. Nothing about the quotations changed; they were always marked and linked.

The rule for every sheet from here: a living person gets **Maker** for what they made and **Read by** for what they read, and never **Written by** for prose they did not write. Crediting the house instead — “by Queering Earth” — was on the table and was rejected: naming an institution where a person belongs is the same elision as naming a person where an institution belongs. **A caveat row under a wrong byline is not a fix. It is the wrong byline with a footnote.**

Re-determinedThe sheet’s kind changed from essay to reading, and No. 1 gained a second reader

Knock-on from the byline rule, applied the same day. Under that grammar the Wyrd sheet is a reading, not an essay, so the kicker, the plate card, three sibling navs, and the social card all changed to say so. [The Army of the Upright](https://queering.earth/on-being-ill)’s **Read by** row went from Helen alone to Helen and Ryan.

One thing left untidy on purpose: this sheet keeps Helen’s title rather than taking a phrase out of the specimen the way the other readings do. If a session wants to tidy that, the title is the change and the address can stay.

MountedTwo paintings, chosen by Helen Edgar

Edward Robert Hughes, *Midsummer Eve* (c. 1908), and John William Waterhouse, *Miranda — The Tempest* (1916). Both public domain on the artists’ dates; both captions say she picked them, because on this site choosing the plate is a real contribution with a real name on it — and this is the sheet on which a real contribution had just been credited to the wrong kind of row.

The Hughes plate first sat between *He was convicted of manslaughter* and *So: no romanticising the fae on this sheet*, which split two sentences that answer each other and made a charming fairy painting the punchline to Bridget Cleary’s murder. It now opens the section instead. **Where a plate sits is an argument, not a layout preference.**

Label correctedA journal citation we were handed had the wrong issue and the wrong pages

The brief for the sheet gave Elliot Wassell’s paper on Autistic joy as *Disability & Society*, 41(3), 1–26, 2025. The article’s own first page gives volume 41, **issue 1**, pages **236–261**, **2026**. 2025 is the online-first date, and “1–26” is the give-away of a citation copied out of an unpaginated online-first PDF.

Corrected here. Recorded as an open item for a session in the knowledge-system repository, because if that citation is sitting in notes elsewhere it needs the same correction — and this site does not edit that repository.

Label correctedTwo captions checked against the primary rather than against the picture

- The Waterhouse caption said Miranda had **never seen anybody but her father and Caliban**. Wrong — she also half-remembers “four or five women once that tended me”. And it placed the brave-new-world speech “four scenes later”, which is four *acts*. Both fixed against the text of the play.
- The Bridget Cleary paragraph said she was **burned to death by her own husband and relatives** and named no verdict. The relatives’ role and the cause of death are both contested in the record; the sentence was narrowed to what is not. She died 15 March 1895 at Ballyvadlea, County Tipperary; her husband maintained she was a changeling; nine people were charged; he was convicted of manslaughter.

**A caption is a claim like any other and gets checked like one.** Alt text on both paintings was written from looking at the images, not from the catalogue record — descriptions inherited from a catalogue record describe the catalogue record.

Label correctedA scholar’s conclusion that cuts against the sheet, kept on the sheet

Three quotations reach the Weird Sisters section *through* Karen Bek-Pedersen’s article rather than from Holinshed, the First Folio, and Theobald themselves, and every caption says so with her page number: a secondary source that says it is quoting is still a secondary source, and the reader is owed the chain.

Her own argument is that Shakespeare wrote *weyward* deliberately, that his three women are witches rather than Fates, and that Theobald’s 1733 emendation “bypasses Shakespeare altogether” — which is inconvenient for a sheet about reclaiming the Weird Sisters. It is quoted twice and gets its own item in *What this sheet will not tidy*. **Taking a scholar’s evidence and leaving her conclusion behind is the worst version of the paraphrase failure, because every individual quotation is exact and the page still lies.**

CabinetThe paste-up: a zine wall built out of herbarium furniture

Ryan’s brief was “take inspiration from zine walls”, and the obvious risk in it is that a photocopied flyposted wall and a Victorian specimen sheet are not the same object. What made it work was noticing that they are: both are things cut out, laid down at an angle, and fixed where they overlap — one with masking tape, one with gummed linen strips. So `.qe-wall`, `.qe-drift`, and `.qe-cutup` are built from the card, the rule, and the accent colour the site already owned, rather than importing a second visual language. No new motion: the drawing at the top grows, the wall does not.

- **The wall shipped as one column at every window size.** Two 13.5rem tracks plus the gap need 452px and the measure gives 448, so it silently collapsed into a stack of slips — a list, not a wall — and it looked deliberate. Found by reading the computed `grid-template-columns` in the browser, not by looking at the page. Now 12.5rem.
- **The word-drift rail became a column rather than a third exception to the measure.** Three states across 448px give 136px each, which will not carry the gloss under each word. The rail runs down the sheet instead. One fewer exception is worth more than one better timeline.
- `.qe-cutup` uses inline-block, not flex. With flex items the scissored words look identical and copy out as `oddifficultimmature`.
- `.qe-plate-wide` came back, exactly as the note about deleting it said it would — Waterhouse’s *Miranda* is 138cm across, and inside the portrait cap the foundering ship was a smudge in the corner.

CabinetThe colophon says how these sheets are drafted

A new section, [Who reads, and who writes](https://queering.earth/design): these sheets are drafted in Claude Code sessions and edited by whoever is on the **Read by** row. Asked and answered as one honest section in the colophon and nothing in the labels — a label is about the reading, not the tooling, and a tool cannot carry responsibility, which is what a byline is. **A site that keeps a ledger of everyone else’s words owes an account of where its own came from.**

2026 · 8 September

## Two grey woodcuts came off a colour sheet, and the drawing above them was rebuilt twice before it stopped standing to attention

Both changes are about looks rather than accuracy, and both turned out to be the sheet’s own argument correcting the page.

Re-determinedColour over subject matter: three chromolithographs replace two Darwin woodcuts

Sheet No. 3 first mounted two figures from Charles Darwin’s *Climbing Plants*, chosen because the sheet’s argument is about holding on without merging and Fig. 13 is a tendril spiralling in two directions at once. Ryan: “The black and white tendril illustrations are a little underwhelming. Let’s drop the tendril requirement and go for colour.” He is right about the page — a herbarium sheet in daylight is a *colour* object, and two grey rectangles of 1876 line-block sat on it like photocopies.

Replaced by three chromolithographs from *Annales Musei Botanici Lugduno-Batavi* volume 1 (1863), all lithographed by Emrik & Binger of Haarlem, each with a different draughtsman; and, in the section on what a fruiting body is for, a hand-coloured plate from M. C. Cooke’s *Illustrations of British Fungi*. **Nothing about the Darwin verification was wrong.** His reversed spiral is still on the sheet, still credited, quoted and linked instead of mounted, and the section reads no worse for it — the idea survived as prose.

The rule this settled: on this site a plate is chosen for how it looks on the sheet first and for what it depicts second. **An illustration that has to be explained before it earns its place is not earning its place.**

Label correctedA digitiser’s metadata disagreed with the corner of the plate, for the third time

The Biodiversity Heritage Library’s Flickr tags on Tab. IV carry `taxonomy:binomial=Gonystylus macrophyllus`. The plate itself says **GONYSTYLUS MIQUELIANUS, T. ET B.**, and that is what the sheet cites. The two may well be synonyms in current taxonomy — a question for a botanist, not for us — but the object’s own printed name is the object’s own printed name.

Third case on this site: a wrong Fitch on a neighbouring Curtis’s plate, metadata naming the wrong Darwin as the artist of his son’s drawings, and now this. **Standing note, now with three cases behind it: read the corner. Every time.** The volume itself was pinned by fetching the same Internet Archive leaf number from all four volumes of the serial and comparing them, because the plate numbering restarts each volume and “Tab. IV” on its own identifies nothing.

Re-determinedThe header drawing, rebuilt twice, and the first version was a fault rather than a preference

**v1** was five upright stems, evenly spaced, on one flat baseline — the argument of the sheet drawn literally. Helen: “can we have squiggles and swirly bits so it isn’t all linear? may be add some mushrooms or something”. A sheet whose thesis is counter-narratives following their own rhythms had a drawing in military formation at the top of it. No guard can catch that: the markup was valid and the tokens were correct.

**v3** is Art Nouveau, to Helen’s brief — flowing curved vines, spiralling tendrils, organic scrollwork, asymmetrical, nothing rigid. What that actually required: no baseline and no roots, so nothing can line up; every terminal curling back on itself, because a curve that merely stops is the thing this drawing is not; and a taller canvas, because filigree needs vertical room or the curls close into blobs.

The part that nearly got missed: the vines landed in v3 while the flowers and mushrooms were *still v1’s* — six-ellipse daisies and flat domes on sticks. Against sinuous linework they read worse than they had against straight stems, because they were now the only rigid things on the panel. **A style note about line is also a style note about form.** Blooms became five sinuous petals at uneven spacings; caps got an undulating margin over a bent tapering stipe.

One trap paid for here and worth stating: `--len` on a stem is its real measured length, read out of the live page. A declared length shorter than the actual one turns the dash into a repeating pattern and the vine draws itself on with gaps in it — invisible in the finished drawing, visible only while it grows. Three paths were short on the first pass.

2026 · 8 September

## The first printing of *Promises like Pie-crust* ends line 20 with a colon, every copy in circulation ends it with a full stop, and the line is the one about breaking the chain

Sheet No. 3 reads Christina Rossetti’s poem of 20 April 1861 next to a 2026 paper on supporting Autistic adults’ intimate lives.

Mounted[The Die Uncast](https://queering.earth/promises-like-pie-crust) — Sheet No. 3

Rossetti’s poem entire, from its first printing in *New Poems by Christina Rossetti, Hitherto Unpublished or Uncollected* (Macmillan, 1896), beside three passages of analysis and six participant quotations from Monique Huysamen, Chris Hatton, and Marianthi Kourti’s *Embrace Difference, Challenge Normativity* in *Feminism & Psychology*, and Amanda Van Slyke’s definition of solo polyamory.

Label correctedThe colon at line 20, read in two separately scanned copies

The 1896 page 131 reads *I should fret to break the chain **:***. The Poetry Archive, and every web copy checked, read it with a full stop. Every other mark in the poem matches: 1896 has two full stops in twenty-four lines, the circulating text has three, and eight lines end in colons in both.

The difference is grammatical. A full stop closes the thought and makes “Let us be the friends we were” a fresh proposal; the colon makes the friendship the *consequence* of what precedes the mark.

**Both pages were rendered as images and the type read, because the finding is a single punctuation mark and a text extractor is not evidence about one.** Then a second physical copy — a different library, a different digitiser, a different pipeline — was read independently, and the mark, the alternating indent, and the date line agree in both. So the colon is the edition’s, not one library’s smudge.

What is *not* claimed: nobody here has seen her manuscript, so this is the earliest reading we can put our eyes on rather than a certified authorial one, and nothing on the sheet says anybody changed the mark on purpose. Three features of the 1896 page are the volume’s typography and not hers — French spacing before every colon, a drop cap, and a full-capitals title — and all three are normalised on the sheet and said out loud on it.

Label correctedThe proverb in the title has no owner here, on purpose

“Promises and pie-crust are made to be broken” was proverbial before Rossetti used it. The attribution in circulation runs to Swift’s *Polite Conversation* (1738), which nobody here has read in a primary, and secondary sources record printed uses earlier still. The sheet therefore names no originator for the saying, and the ledger says not to improve that by adding Swift’s name off a quotation site.

Label correctedTwo elisions kept lower-case, and one character normalised with the reason written down

- Two of the authors’ sentences are quoted from their middles, where the original lead-in is a framing clause. **The lower-case letters are kept** rather than raised to capitals, and the captions say so. Raising them is the small tightening that makes a clause look like a sentence somebody wrote.
- One participant’s quotation is printed in the article with a lower-case `l` in place of every `I` — five times, and nowhere else in twenty-three pages. It is in the printed article, not an extraction artifact: the page was rendered as an image to be sure. **The sheet prints `I`**, because a run of stray `l`s reads as our typo and is spoken aloud as “el” by a screen reader, and no word is changed by fixing it. Recorded so nobody corrects the sheet back against the PDF, and nobody quotes the `l`s as a finding about her.
- Participants are credited the way the paper credits them — pseudonym, age, gender, sexuality, *and focus group*. The group is part of the identification the study gives them and is not ours to drop.
- The paper writes “autistic” in lower case throughout; house style is **Autistic**. Quotations keep their authors’ usage, our prose uses ours, and the sheet’s footer says so, because an unexplained inconsistency looks like carelessness.

Label correctedA definition that circulates without a name got its name back

The sheet’s definition of solo polyamory is Amanda Van Slyke’s, and the author was read off the page rather than assumed from the site. It circulates widely with nobody’s name on it, and it has one. No publication date is given on that page, so none is asserted here — and the ledger says not to infer one from a sitemap or a feed.

CabinetVerse gets a shared component, and every line is its own element

`.qe-poem` lives in the shared stylesheet rather than in the page, because poems will recur here and the second one would otherwise copy the first one’s CSS and then drift from it. A poem’s line breaks are the object being mounted: reflowed into prose it is a different poem.

- Every line is its own block element, not a `<br>`-separated run. A `<br>` among the lines breaks child counting, so an indent driven by an even/odd rule silently re-indents the whole poem the moment a line is added — the indent is a class the markup states outright instead. And the 1896 alternating indent is a fact about that setting, not a decorative rhythm to apply to any poem.
- A hanging indent on every line, so a line too long for the measure is visibly a wrap and can never be mistaken for a line the poet wrote.
- The type steps down under 26rem, and this is the one place on the site it may: seven of the twenty-four lines wrapped on a 375px viewport at the body size, and a poem read at that ratio is being read as prose. Verified at 24 lines, 0 wraps.
- On paper, a stanza never splits across a page break.

CabinetA sheet is titled from a phrase in the specimen, and the filename names the work

`on-being-ill` is *The Army of the Upright*; `promises-like-pie-crust` is *The Die Uncast*. The split is deliberate: **the filename is the address a reader searching for the source will guess, and the title is what the sheet found in it.** An essay written by us is titled by us, so the convention applies only to a reading.

2026 · 7 September

## The site was linking to one address and declaring a different one canonical, and nobody would have found it by reading the repository

CabinetAddresses on this site are extensionless

Netlify’s Pretty URLs post-processing is on by default and rewrites internal links to strip `.html`. So the served page said `/coming-to-terms` while the repository said `coming-to-terms.html`, and every canonical tag and sitemap entry said `.html`. **Found by reading the served page rather than the repository**, while checking that something else had deployed.

Two ways out were on the table — turn the setting off, or adopt what it produces. Ryan chose to adopt it: canonical tags, `og:url`, the sitemap, and every internal link now say the extensionless form, and nothing is rewritten on the way out any more because there is nothing left to strip. What it costs is that the filename and the address no longer match, which is now said out loud in the repository’s own guidance instead of left for the next session to discover. The sitemap check was changed to fail on a `.html` address, and the failure was verified by putting one back.

Cabinet[How this site is made](https://queering.earth/design) — the colophon

What the herbarium model means here, what biophilic design survives translation to a website, the five words this site uses for its own parts — specimen, sheet, label, plate, card — the palette with its measured contrast ratios, the type and its deviation axis, plain view, the drawings, and the borrowed plates with their sources.

CabinetSheets link to each other, outside the page’s main landmark

Until then a sheet’s only internal link was back to the plate, so a reader arriving from a search result had exactly one way onward. Each sheet now ends with *Elsewhere on the plate*. It sits **after** the `<main>` element on purpose: the knowledge-system mirror takes page content from that landmark and nowhere else, so navigation placed inside it would be indexed as that sheet’s own content. No guard can catch that — the markup is valid and the landmark is correct.

2026 · 7 September

## The phrase on the masthead turned out to be one hyphen away from the subtitle of a book we quote on the same page

The first two sheets went up and were mounted on the plate as numbered cards.

Mounted[The Army of the Upright](https://queering.earth/on-being-ill) — Sheet No. 1

Virginia Woolf’s *On Being Ill*, read from the 1930 Hogarth Press edition — the edition of 250 signed copies whose type Woolf set herself.

Mounted[Coming to Terms](https://queering.earth/coming-to-terms) — Sheet No. 2

Ryan Boren on a lifetime of looking for a word that fits. The one kind of sheet where **Written by** is the right row: his own finished text, unchanged, and the label says so.

Label correctedThe masthead credits Nick Walker, and the decision log stopped claiming there was no risk

The tagline is **Post-normal possibilities.** The subtitle of Walker’s *Neuroqueer Heresies* is *Notes on the Neurodiversity Paradigm, Autistic Empowerment, and Postnormal Possibilities* — one hyphen apart, on a site that quotes him on its home page, about the subject of his book.

Helen wrote the phrase in the founding brainstorm and may well have arrived at it herself; *post-normal* also has a separate lineage in post-normal science that nobody here has checked against a primary. **So this is not a finding of borrowing. It is a finding that our own decision log was asserting there was no risk here when there plainly is one**, and that assertion was corrected. The masthead now reads *after Nick Walker*, linked to the book, with the full account in the section where he is already quoted. “After” was chosen over “his phrase”, which would take the coinage off Helen, and over silence, which was defensible only until a reader noticed the subtitle.

Label correctedThe paraphrase that did not ship, and the pronouns that did

The working tagline was “Subverting, defying, disrupting, and liberating oneself from all forms of normativity,” credited to Walker. **It is not his sentence.** His parenthetical glosses *queering*, and his object is specific: “neuronormativity and heteronormativity.” Generalizing his object while keeping his name on the words would have put our paraphrase in his mouth on the masthead. The page now quotes him exactly, names the two normativities he named, and says plainly that carrying the verb further out is our extension.

Separately: **Nick Walker uses he/him.** The home page, the ledger, and the decision log were all written with she/her and were corrected together, on Ryan Boren’s word — he works alongside Walker, and a person’s stated preference outranks a stale third-party page. The ledger records why not to “fix” this back by checking a website: Walker’s own about page carries no pronouns at all.

Label correctedWoolf verified *ahead of* the sheet, because this trap does not survive verification-after-drafting

Woolf published *On Being Ill* in *The New Criterion* in January 1926 and revised it for Hogarth in 1930. **Both texts are hers.** 1926 reads “with love, battle, and jealousy” where 1930 reads “with love and battle and jealousy”; there are four more differences in the same paragraph.

The 1926 commas look exactly like a modern editor tidying Woolf’s polysyndeton. They are not — they are her own earlier sentence, and the *and…and…and* is her later one. Had we “corrected” either against the other we would have produced a quotation that is wrong while looking more careful than the alternative. **On a site built on re-reading, a wrong edition is a wrong attribution: name the edition, or do not quote.** Our own library holds a note carrying the 1926 wording under a title that names no edition, with OCR damage in the body. It is a pointer. It is not quotable.

MountedPlate 511, *The Floral Magazine* v.9 (1870), and the first metadata error

A hand-coloured lithograph of two orchid blooms on Sheet No. 2. **The artist’s name was read off the plate rather than out of the catalogue record**, and that turned out to matter: the plate is signed *Worthington G. Smith, F.L.S. del et lith* in the bottom-left corner, and the Biodiversity Heritage Library’s Flickr tags on a neighbouring plate credit a “Walter Wood Fitch” who did not illustrate it — the illustrator in that period was Walter Hood Fitch. **A digitiser’s metadata is a finding aid. The object carries its own attribution in the corner.**

CabinetThe plate, the favicon, and the social cards

The front page became *the* plate: the sheet the others are mounted on, as numbered cards with a coloured tape strip across the top of each. Card class names were taken from Star Stuff on purpose rather than invented again.

Icons and cards are generated from the shared stylesheet’s own token values, so they cannot drift from the palette. Two traps paid for in the favicon: **a doubled hyphen inside an XML comment made the whole SVG fail to parse** — it looked fine, served with the right content type, and decoded as nothing — and **a favicon is judged at 16px, not at 64**, where a tilted leaf reads as a diagonal stroke and anything filled in lichen has too little contrast on paper to be a shape at all.

2026 · 7 September

## For six minutes at a time the site looked deployed: a green dashboard, auto-publishing on, and a commit several pushes stale

The site was planted and the domain went live the same day. Between those two things, three separate wrong answers about why pushes were doing nothing.

CabinetThe site is planted

The home page, the palette as tokens in one stylesheet, plain view as a class over one document, three guard scripts, and the bridge to the knowledge system for finding — never for citing.

- **The ground is paper, and it is the other end of the day from Star Stuff.** The strongest differentiation from a night-sky site is not the same site in green.
- **Fraunces as the display face**, because it carries a `WONK` axis — letterforms that deviate from the norm, exposed as a setting. A site about queering normativity setting its masthead with the deviation axis turned up is the argument made in the type.
- **Plain view is a class, never a second page.** Helen asked for a plain access version; the alternative — a decorated page and a separate accessible page — drifts, and the accessible copy is always the one that rots.
- **Three guard scripts came over from Star Stuff and five did not**: markup, sitemap, and contrast pass here; the other five catch failures this site cannot yet have. A check that cannot fail is a check nobody reads.
- The local server roots itself at the repository rather than at whatever directory it was started from. Star Stuff’s copy does the latter, where a wrong-directory run looks exactly like a site with every page missing.

CabinetContinuous deployment, and the trap that made pushes silently not deploy

Static files, no build command, no publish subdirectory — the repository root is the site. Deploy previews on pull requests are left on deliberately: a pull request produces the real page at a real address before anything reaches the live site, which is the review path for anyone editing through the GitHub web editor rather than a Claude session.

**Creating the project through the API does not wire continuous deployment, and nothing you can do from the API fixes it.** The first deploy works, the dashboard shows a green light and “Auto publishing is on”, and there is no webhook, no deploy key, and no status-check hooks. It looks exactly like success. Three answers were recorded and two of them were wrong before the third stuck:

- Re-sending the repository configuration leaves the deploy key null and kicks a one-off build of current `HEAD` — a trap of its own, because that stray deploy looks like the link repairing itself.
- A hand-made GitHub webhook pointed at Netlify’s hook endpoint, matching Star Stuff’s exactly. GitHub delivers, Netlify answers **204 OK**, and builds nothing. Verified twice. Netlify only honours a hook it created and recorded on its own side. **This entry was written as a fix, corrected, and then corrected again** — the first correction was also wrong.
- Concluding anything from a short poll of the deploys API. It lags, and it lags by minutes. Give it three before calling a push ignored.

The only fix is `netlify init --force` in the repository, which provisions the webhook, the deploy key, and the status-check hooks together and needs a browser grant, so a human runs it once. The two commands that tell a wired project from a deaf one are written down, because the dashboard will not tell you.

Cabinet`queering.earth` is live

The site was built for a week against a domain that did not resolve, with two things held back until it did: the host redirect, which would otherwise have sent the only working address to one that does not answer, and the entry in the knowledge-system mirror’s site map, which fetches over the network and would have failed the sync. Both switched on when the domain answered.

CabinetThe content model: a sheet mounts a specimen and carries our label

Settled the same day the first sheet was drafted, and it is the site’s attribution discipline drawn in the layout instead of left to a reader’s good faith. The specimen is somebody else’s — the essay, the painting, the word. **The label is where we speak.** Their words are in the specimen; ours are on the label; the line between the two is a fact about the page and not a promise about our behaviour.

## Index by sheet

The register is kept by accession, which is by date. This is the same entries filed the other way — everything that has happened to one sheet, gathered. Each line lands on the accession that records it.

### [The Army of the Upright](https://queering.earth/on-being-ill) Sheet No. 1

### [Coming to Terms](https://queering.earth/coming-to-terms) Sheet No. 2

### [The Die Uncast](https://queering.earth/promises-like-pie-crust) Sheet No. 3

### [Wyrd, Weird, and the Invention of Normal](https://queering.earth/invention-of-normal) Sheet No. 4

### [Miranda: To Be Wondered With](https://queering.earth/the-tempest) Sheet No. 5

### [The Swell and the Dwell](https://queering.earth/wild-nights) Sheet No. 6

### [A Waste Garden, Flowering at Its Will](https://queering.earth/flower-codes) Sheet No. 7

### [The Preferred Flower of Life](https://queering.earth/monotropa-uniflora) Sheet No. 8

### [Queering.Earth](https://queering.earth/) the plate

### [How this site is made](https://queering.earth/design) the colophon

### [The accession register](https://queering.earth/changelog) this page

### The site itself the cabinet
