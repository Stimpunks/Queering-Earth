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

[Straight to the latest accession](#latest) — the register runs newest first, so that is the top of it. The list below is every accession in the same order.

It records four kinds of change: a **sheet mounted**, a sheet **re-determined** — reworked enough that what it shows is different — a **label corrected**, and work on the **cabinet**, meaning the site itself. Typo passes and small tidying are left out. Anything that changes what a sheet *claims* is in.

The full working — every quotation, whose it is, where it came from, and the day somebody read the primary and confirmed the wording — is in `ATTRIBUTIONS.md`; the reasoning behind every settled and open question is in `DECISIONS.md`. Both are in [the repository](https://github.com/Stimpunks/Queering-Earth), which is the source of truth for this site. If something on a sheet is wrong, it belongs in this register. [Say so](https://github.com/Stimpunks/Queering-Earth/issues), and it will be.

Why the corrections are in the ledger and not in a drawer

Our sibling site [Star Stuff](https://starstuff.earth/) risks a wrong fact. This site risks a wrong *attribution* — a definition trimmed to fit a masthead, an object quietly generalized, a paraphrase left wearing somebody’s name. Nearly every page here carries somebody else’s words, and the citation is the only evidence a reader has.

So the errors are entries like any other. A byline that put Helen Edgar’s name on prose she did not write. A journal citation handed to us with the wrong issue and the wrong pages. A caption that said Miranda had never seen anybody but her father and Caliban, when the play has her half-remembering four or five women. Each one is named below with what it said, what it says now, and how it was caught. The working has always been in the repository. **This page is the account of it that a reader can actually reach.**

- Mounted
- Re-determined
- Label corrected
- Cabinet

2026 · 10 September · latest

## Sheet No. 10, on a disability invented because nobody had it, and the readers who do

Ryan’s, from his own reading of Sami Schalk on Octavia E. Butler. Schalk calls hyperempathy “a nonrealist disability that is both mental and physical in origin and manifestation”; Ryan’s note said only “Except, it’s quite real for many Autistic people, including myself,” and asked for a sheet. Four faults surfaced in the sourcing before a word of it was written, and three of them were ours.

MountedThe argument is not that Schalk is wrong, and finding the version that is not cheap took the whole research pass

*Bodyminds Reimagined* chapter 3 is the best thing written about hyperempathy. It clears four “totalizing” readings out of the way, refuses the gift narrative that Lauren Olamina herself refuses in the text, and names the pull behind that narrative exactly — “a liberal compensatory desire to recast disability as ‘specialness’”. **The sheet endorses nearly all of it, and says so in its own words rather than leaving the endorsement implied.**

The argument is with one clause and what rests on it. Schalk’s protective mechanism is that hyperempathy “is not a disability we recognize in our current reality”, so a reader cannot overlay a stereotype they already hold. **That protection is bought with unfamiliarity, which means it is only available to a reader who does not have the thing.** For an Autistic reader it inverts: we do overlay, we cannot help it, and what we overlay is a life rather than a preconception. A claim whose truth depends on who is holding it is this site’s own method turned on a book we admire.

**Schalk names autism in the same paragraph**, by way of Stuart Murray, as the recognised disability whose cultural familiarity gets it flattened. The two claims sit one sentence apart: autism is the familiar thing that gets stereotyped, hyperempathy the unfamiliar thing that cannot be.

**And the fairest account of how it happened is the most damning thing on the sheet, and it is not about Schalk.** *Bodyminds Reimagined* is 2018. The study that put Autistic hyper-empathy on the record says, in 2024, that “there has been limited theoretical and empirical work looking at this as a specific phenomenon worthy of study in its own right.” Autistic people had been saying it for decades; the journals had not written it down. A scrupulous scholar reading the literature as it stood could conclude in good faith that there was no real-world equivalent, because the equivalent was community knowledge and community knowledge was not yet citable. **That gap is the epistemic injustice the chapter is otherwise so good on, arriving from behind and taking the premise.**

MountedOne sprig drawn twice and translated, because a mirrored pair says reflection and this is not a reflection

The masthead is a single cut sprig emitted twice: the left copy in solid ink, the right copy in outline only, identical in geometry and displaced. **The solid copy is the event and the hollow copy is the sensation**, so reading order is causation — the thing happens on the left and is felt again on the right, in a body it did not happen to. Butler’s own gloss is on the sheet: “I get a lot of grief that doesn’t belong to me, and that isn’t real. But it hurts.”

**Translated and never mirrored, which is the one thing that could not slip.** A mirrored pair either side of a meridian is the Rorschach read [the moth](https://queering.earth/#queering-is-a-verb) already paid for three times, and it would have said *reflection* — wrong twice over, because mirror-touch is not a reflection but a recurrence in another body. The displacement is also deliberately not axis-aligned, so the second copy cannot read as a shadow. Nothing here casts anything.

The hollow copy is `.rib`: `fill: none` on a `--qe-moss` stroke, which is exactly the ghost this drawing needed and is already reached by the print sheet and by the forced-colours block. **No new art class, so no new gap in either.** Both copies take `--qe-moss` and neither needs a cabinet rule.

Two things the generator had to be told. **A left-pointing leaf must not wear `.sprout-leaf`**, whose `transform-origin` is the fill-box left edge — a leaf pointing left would unfurl from its tip instead of from where it joins the stem, so the three left leaves are plain `.sprout`. And **both offsets are baked into every coordinate**, because a CSS transform animation overrides an SVG transform attribute on the same element and would collapse all twelve sprouts onto the origin. Leaves sit on the stem’s own normal at five parameters, each rotated toward the tip so none is square to the stem; square leaves read as a fishbone. Bounding box asserted rather than eyeballed: x 84.0 to 475.8, y 32.0 to 227.0 inside 560 × 260.

**The two stems ink on together and that is a limitation, not a choice.** `.stem` has no per-element delay hook and inventing one would mean a new class. The echo is carried by the leaves instead: the solid sprig’s five unfurl, then the hollow sprig’s five.

Label correctedA quotation arrived under the wrong Butler novel, at a page number that was not a page number

The brief cited “Hyperempathy syndrome is a delusional disorder, after all… it hurts like hell” as *Parable of the Sower*, p. 330. **It is *Parable of the Talents*, p. 9.**

**A tooling fault and nobody’s transcription.** The Kindle file for *Sower* carries a publisher’s preview of *Talents* after the novel ends and marks the join nowhere. Highlights run past it; the last line of *Sower* is “decided to call this place Acorn”, and everything after that is the second book — Jarret, Asha Vere, the funeral verses. A Readwise export is titled for the file, so highlights from two books arrive under one heading.

**The visible tell is a page counter that stops.** The reader shows “Page 330 of 330” at 85% of the file, because the print-page map covers *Sower* only and then repeats its own last page. So “p. 330” was not a page number at all, and **re-titling alone would have left a citation wrong in a harder way to catch** — right book, plausible number, no relation to the text. The real page came off the standalone *Talents*, whose own counter reads 9 of 394 under a running head that says so.

The general shape is the part worth keeping: **an appended preview is a second work inside one file**, and every tool in the chain takes the file as the unit — page map, export title, highlight location. A citation is only as good as the assumption that one file is one book, and that assumption is quietly false at the end of most ebooks sold today.

Label correctedThe empathy study is a 2024 article behind a 2023 DOI, and its accepted manuscript is not quotable

Everything convenient said 2023: the DOI slug `aut.2023.0001`, and the repository deposit record for the accepted manuscript. **The issue is 2024.** Kimber, Verrier and Connolly, *Autism in Adulthood* 6, no. 3 (2024), pp. 321–330, Mary Ann Liebert, Inc. Corroborated in Crossref and in the NLM’s PubMed record before it was written down, and then read off the article.

**Second instance of a pattern, so it is now a rule rather than a note.** The first was *Experiences of autistic joy*, where 2025 was the online-first date and the issue was 2026. **Online-first year is not issue year, and a DOI slug is not a date.** A paper newly cited here takes its volume, issue, pages and year from a bibliographic database — never from the PDF, the DOI, or a repository deposit.

**Cite Mary Ann Liebert and not SAGE.** Crossref returns SAGE because SAGE acquired the journal after publication; the article’s own first page says Liebert. Name the imprint on the artefact, which is the reasoning that already makes a sheet name the printing it read.

**The accepted manuscript corroborates the substance and may not supply a word of the wording.** It is the authors’ British-spelled pre-copy-edit text, and the differences are not all orthographic: the Conclusion is a different sentence, “but to better bridge the gap” against “but also better bridge the gap”. Anybody assuming the two states differed only in `-ise` and `-ize` would have quoted it wrong while feeling careful.

**And the version of record disagrees with itself on the headline figure**, which is the detail most likely to be tidied by a later hand: “Seventy-eight percent” in the Results at p. 325, “seventy eight percent” where the Discussion restates it at p. 326. The sheet quotes the Results occurrence, and any sheet quoting both must reproduce both forms.

**The participants are quoted with no identifiers at all** — no pseudonym, number or demographic tag. The ledger elsewhere credits study participants by the names their paper gives them; here there are none, so the sheet’s caption says the anonymity is the paper’s and not our omission. Those two look identical on the page and needed telling apart.

Label correctedTwo glossary pages of our own splice two Butler passages ninety pages apart into one quotation

Found while checking prior art, and **it is on stimpunks.org rather than here**, so it is recorded in [the decision log](https://queering.earth/what-is-settled) for a session in that repository and left alone from this one.

The *Canary* and *Very Grand Emotions* glossary pages both present “I wish I could find other people who have it, and live among them. A biological conscience is better than no conscience at all” and “Maybe it’s like my sharing: One more weirdness…” as a single blockquote under a single citation. They are about ninety pages apart and in the wrong order.

**The splice changes the meaning.** In context Lauren is comparing her emerging Earthseed conviction to her hyperempathy — the “one more weirdness… that I’m stuck with” is the religion, and hyperempathy is what she measures it against. Joined to the biological-conscience line it reads as though the weirdness she is stuck with is the conscience itself. Every word is Butler’s, every sentence is exact, and the quotation says something Butler did not: **this house’s characteristic failure, living on our own site.** This sheet quotes the two separately or not at all.

MountedA section that argues against the sheet it is on

*What this sheet will not tidy* carries five items, and two of them are load-bearing rather than decorative. **Butler’s hyperempathy is a drug injury and Autistic neurology is not** — Lauren has it because her mother abused Paracetco before she was born, and there is a well-supplied market for readings that would let that parallel drift into an aetiology. The sheet says on the page that the parallel is to what the condition does and how it is treated, never to where it came from.

And **Lauren says it is not a power, which cuts against this sheet as hard as against the critics Schalk corrects.** If defending Autistic hyper-empathy turns it into a superpower, the defence has performed Schalk’s “liberal compensatory desire to recast disability as ‘specialness’” in the act of citing her against it. So the strongest line the sheet mounts is not the biological conscience but the question four pages into the sequel — “So why do I miss it now?” — where Butler, in a dream that has finally switched the thing off, argues against her own harshest description of it. **You cannot subtract it and still have Lauren.** That is the claim Autistic people make when they decline to be cured, and nobody had to bring it to the text.

2026 · 10 September

## Sheet No. 9, on a definition recited for a beast nobody has seen, and on the coiner an empty word leaves behind

Helen’s idea, from John C. Brady’s two-part reading of *Logique du sens* in Epoché — she asked for a sheet on names, labels, and how things get coined, and said the Deleuze–Carroll link “may be a stretch”. It is not: Deleuze makes the identification himself, on p. 31 of the French. Ryan proposed it as a complement to [Sheet No. 2](https://queering.earth/coming-to-terms), which asks whether a label fits; this one asks where the label came from.

MountedThe primary was not in the house, and the answer was the French rather than a summary

*The Logic of Sense* is not sold as an ebook and Ryan does not have it, so the first plan was to build on Brady and correct the sheet later against Deleuze. **That plan was wrong and the reason is worth keeping.** Build-now-verify-later is fine when the later edit is an *upgrade* to a citation that was honest when it shipped; it is not fine when the later edit could change what the sheet *claims*, and a section resting on Deleuze’s theory of sense sourced entirely to somebody’s summary of it is the second kind.

**The original was reachable the whole time.** *Logique du sens* (Minuit, 1969) is openly readable at the Internet Archive; the two scans of Mark Lester’s English are restricted to print-disabled patrons. So the sheet quotes the French primary and **every English rendering on it is ours, labelled a gloss rather than a translation** — the same treatment the wyrd half-line gets on [Sheet No. 4](https://queering.earth/invention-of-normal). Quoting Lester’s English through Brady would have put a translator’s authored choices in Deleuze’s mouth at a page number nobody here could open.

**Four quotations were read off the page images and not off a text layer**, because this scan’s optical transcription drops accents and breaks words across lines. Pages 31, 60, 64 and 65, each confirmed by its running head. The page numbers are the French ones and will not match an English copy, which the sheet says out loud.

What the primary added that a summary could not: Deleuze grants that *Snark* is a portmanteau of *shark* and *snake* and then says it is one “secondairement ou accessoirement” only — the packing is not what the word does. **A paraphrase reading “Deleuze calls the Snark a portmanteau word” would have been true and would have lost the argument**, which is this site’s characteristic failure in one clause.

MountedFive mounting straps and no specimen, after the diagonal version was drawn, measured, and thrown away

The masthead is the herbarium furniture with the plant absent: five gummed paper bands across the sheet, squared off at their inner ends, and one narrow channel running down through all five where a stem would have been strapped. **Nothing may ever be added in the middle**, which is the note left in the markup.

**Three passes put the straps along a rising diagonal and all three failed, for a reason worth writing down.** Each strap sat perpendicular to a cubic Bézier, so the five gaps lay exactly on one curve — correct as geometry, and on the page it read as ten scattered tick marks. **Five dashes 15 units wide and 100 units apart will not join into a line however precisely they are aligned.** Horizontal straps stacked at five heights put every gap at nearly the same x, about 34 units wide, so the vacancy is one column the eye takes in at a glance. The first draft before that had rounded inner ends and looked like a tray of pills; square inner ends are what make a channel a channel.

Built from `.stem`, `.rib` and `.sprout` and nothing else, so it adds no gap in the print sheet and none in forced colours. `--len` on all ten bands is the real `getTotalLength()` read off the live DOM, and the bounding box is asserted rather than eyeballed: x 40.2 to 509.7, y 29.1 to 231.1 inside 560 × 260. No `.sprout` carries a transform attribute, because a CSS transform animation would override it and collapse every strap onto the origin.

MountedThe unmended provenance line ships for the first time, on the ninth sheet

All eight earlier sheets carry `--mended`, because all eight have been corrected — Sheet No. 8 was predicted to arrive clean and did not. `CLAUDE.md` has been saying for a while that the unmended state **had still never shipped** and was therefore the one to check by hand rather than copy off a neighbour. It has now shipped: solid hairline, moss ink, reading “Mounted 10 September 2026. Not yet corrected.” Checked in both grounds.

The stamp reads Sheet No. 9 and its `mix-blend-mode` resolves to `multiply` on paper and `normal` in the cabinet, which is the token doing the job it was made for — multiply darkens towards the ground, and in the drawer the ground is the dark thing.

MountedTwo of Henry Holiday’s 1876 engravings, one of which is an empty square and the other of which is the Snark wearing a wig

Ryan asked whether any public-domain art would fit and pointed at Plate 6. Two others fit far better, and both change what the sheet can argue rather than illustrating what it already said.

**The Ocean-Chart is Deleuze’s *case vide*, drawn ninety-three years early.** A heavy rule enclosing nothing, with every term of reference a chart can carry — latitude, longitude, meridian, equator, both poles, zenith, nadir, a Scale of Miles that is five dots — arranged around the outside of the blank. It sits in [the section on the empty square](https://queering.earth/five-unmistakable-marks#the-empty-square), facing Deleuze’s “une place sans occupant”, and it comes with Carroll’s crew being *grateful* for it in the same Fit as the five marks: “he’s bought us the best— / A perfect and absolute blank!”

**The Barrister’s Dream is the only depiction of the Snark in the book, and there is no animal in it.** A wig on top of drapery, a hand holding a brief, papers lettered *Trespass*, *Libel* and *Contempt*. Nine illustrations for a poem about hunting a creature, and the creature appears once, in someone else’s dream, dressed as a lawyer. It closes [the section on the definition delivered before the thing](https://queering.earth/five-unmistakable-marks#the-marks).

**Two dates in each caption, because the scan and the engraving are different objects** — Holiday cut these for the 1876 first edition and the paper photographed is a Macmillan printing of 1931. And **the stored originals are downsampled, which departs from this file’s own rule** that the JPEG is the archival copy: the Commons masters are 4.9 and 8.3 MB against 116–341 KB for every other plate here, and an `img` fallback is the one image path no `srcset` protects. They are stored at 2,176 px, twice the 1,088 px top rung, so the largest variant is a clean 2:1 downsample. The masters stay at Commons with their dimensions and hashes in [the ledger](https://queering.earth/ledger).

**A claim on Sheet No. 8 stopped being true and was corrected in the same commit.** It said every mounted image on this site is a public-domain botanical print or painting. Two wood engravings and, before them, a manuscript leaf say otherwise; it now says every mounted image is public domain and names the kinds.

Label correctedThe story everybody tells about Carroll refusing the Boojum drops three words, and the three words are the point

Ryan asked for the 1898 article to be found. It was: *The Academy* No. 1343, 29 January 1898, vol. 53, pp. 128–129, openly readable at the Internet Archive, signed by Holiday twelve days after Carroll died. **Reading it did not confirm what the sheet had been carrying as an unverified report. It corrected it.**

Every secondary account says Carroll rejected Holiday’s Boojum as “inadmissible”, which reads as distaste. Holiday wrote that Carroll called it “a delightful monster, but that it was inadmissible”. **He liked the drawing and refused it anyway**, to keep the creature unimaginable — “All his descriptions of the Boojum were quite unimaginable, and he wanted the creature to remain so.” That is not distaste, it is an author protecting a vacancy on purpose, and it is the sheet’s whole subject. **A tightened source, found in the wild, in the version of the story everyone repeats.**

**The scan’s text layer would have reproduced the same error by another route.** Its OCR of this page renders “Mr. Dodgson” as “Mr. ey” and loses “delightful monster” entirely, so an automated read of the primary would have reported the short version as verified. **The page image is the source and the text layer is a finding aid** — the rule the Deleuze quotations already ran on, now paid for a second time and by a different mechanism.

Holiday also supplies the fact that reorders the sheet: **the last line came first.** Carroll was walking alone one evening when “For the Snark was a Boojum, you see,” arrived in his head, and “the poem was written up to them”. So the hunt was built backwards to reach a word that meant nothing — which is what [the closing section](https://queering.earth/five-unmistakable-marks#the-vanishing) now says, against the section on [a series running short](https://queering.earth/five-unmistakable-marks#one-more-desire).

CabinetA half-hour reading of the poem is linked and not embedded, and the reader is named

Robert Garrison read the whole poem for LibriVox — 29 minutes 24 seconds — and released it into the public domain. It is in the sheet’s label block as a link.

**A player was considered and declined on capability grounds, not taste.** It would need a second encoding, because Ogg Vorbis alone is unreliable in Safari and nothing here transcodes audio; a MIME type taught to `serve.mjs`, which has no audio entry and would send `application/octet-stream` under `nosniff` — the `.avif` trap for the third time; a rule in `\_headers`; a line in `check-cache.mjs`; and 18 MB in a repository smaller than that. **`/privacy` exempts `a href`** because a link the reader chooses to follow is not a request the page made, so the link costs nothing and adds no capability at all.

**He is credited as the performer rather than as a licence.** Somebody read a poem aloud for half an hour; filing that under “a public-domain recording” on a sheet about coinages losing their coiners would have been the sheet doing the thing it condemns, one section below the place it condemns it.

Label correctedA sentence of Carroll’s preface is quoted around rather than repaired

Project Gutenberg’s transcription of the 1876 preface reads “leave it unsettled which you will first”, which appears to want a word. Whether the gap is Carroll’s or the transcriber’s is not established here, so **the quotation starts after it** and the sheet says why at the foot. Silently inserting the word that makes a sentence read better is the tightening this cabinet is organised against, and it is no less so when the source is out of copyright and the fix looks obvious.

**Lévi-Strauss is still quoted at one remove** — his *floating signifier* reached us inside Deleuze’s book, and his 1950 introduction to the work of Marcel Mauss has not been read here. The sheet says so.

**Asasumasu’s post was going to be described rather than quoted, and Ryan asked for it to be read.** That was right, and reading it changed the sheet rather than decorating it: she explains the coinage as an act of widening — the words in use had no room for more ways of having a brain — and then defends the word’s emptiness as the specification, “not another damn tool of exclusion”. **Her sentences make the sheet’s own argument better than our paraphrase of them did**, which is the case for reading a source rather than summarising it, put more plainly than the Deleuze entry above manages.

Two facts only a reading could produce, both now on the sheet and in [the ledger](https://queering.earth/ledger). **The post is signed *Neurodivergent K of Radical Neurodivergence Speaking*, not *Kassiane Asasumasu***, and the identification of the two is Helen’s glossary’s rather than ours. And **Tumblr publishes no absolute date for it** — only “Posted 11 years ago”, read on 10 September 2026 — so it is cited undated with the timestamp and the reading date recorded, rather than with the 2015 our arithmetic would give. Her wording is kept exactly, ampersand, lowercase and profanity included.

CabinetThe masthead’s own borrowed coinage is now a section of a sheet, not just a ledger entry

A sheet arguing that coinages get separated from their coiners has to show its own working, so [one section is about this site](https://queering.earth/five-unmistakable-marks#our-own-masthead): *Post-normal possibilities* is Helen’s phrase from the founding brainstorm, one hyphen from the end of Nick Walker’s subtitle, with a third lineage in post-normal science nobody here has read in the primary. The masthead says *after Nick Walker* — not *his phrase*, which would take the coinage off Helen, and not silence, which is how it shipped at first.

Nothing about the credit changed. What changed is that the reasoning is now on a sheet a reader will actually meet, instead of only in [the ledger](https://queering.earth/ledger) where it was logged on 7 September.

2026 · 10 September

## A crooked tree for the sheet that says queering is adaptation, and the stump of the straight one beside it

At Ryan’s note, after the monologue Tom Waits speaks in *Wristcutters: A Love Story*. It went into [To queer is to adapt](https://queering.earth/#to-queer-is-to-adapt) rather than the typography section, because that section already says queering something is “to make it strange or odd” and the monologue answers it: the crooked one is the tree still standing, “growing strong and growing strange”.

MountedThe drawing is the pair, because a crooked tree on its own is only a picture of a crooked tree

**The stump is the argument.** Waits’ story is not about a bent tree; it is about what happened to the straight one that spent its life narrating the bent one’s deficiency. So the plate is two trees: on the left, all that is left of the straight one — a flat cut and two growth rings, and no leaf on it. On the right the crooked one, whole and in leaf, its lowest branch reaching back over the space where its neighbour used to be.

**The first two drafts were not crooked.** They swung the bezier *handles* wide and left the trunk’s endpoints where they started, which reads as a wavy sapling — a tree that has second thoughts and corrects them. The endpoints zigzag now, thirty units of lateral lurch a segment, and never come back to the vertical. **A trunk that corrects itself is a straight tree with extra steps**, which is the note left in the markup for whoever redraws it.

Built entirely from classes this stylesheet already has — `.stem`, `.rib`, `.leaf`, `.sprout` — so **it adds no new gap in the print sheet and none in forced colours**. That was the reason for the constraint rather than a happy result of it: a new art class needs a new print rule reaching it by name, and a fill the print sheet cannot reach is how Star Stuff printed forty-four blank pages. Only `.trunk` and `.ground-line` are new, and both are scoped to this drawing, like the lilac bush’s.

`--len` on every stem is the length measured off `getTotalLength()`. The trunk was declared at 255 and is 270, and a declared length shorter than the real one makes the dash pattern repeat — the branch draws itself on with gaps in it. Checked in all four states the site owes: the trunk inks in `--qe-ink` on paper and inverts to the pale cabinet ink on the dark ground, and both plain view and reduced motion report `stroke-dashoffset: 0` with the leaves at full opacity, which is the finished drawing and never a missing one.

Label correctedFour words have an author, and we do not know whose these are

The caption quotes four words — “growing strong and growing strange” — and the easy caption would have read “Tom Waits” and left a reader to assume he wrote what he said. **That is this site’s characteristic failure in miniature:** an attribution true about the speaking, silent about the writing, and left to be read as a claim about both.

What is established: the monologue is spoken by Tom Waits as Kneller in *Wristcutters: A Love Story* (2006), written and directed by Goran Dukić, adapted from Etgar Keret’s *Kneller’s Happy Campers*. **What is not established is who wrote it.** It is widely repeated that Waits improvised the speech and that claim was not found in any primary source — not an interview with Waits, not with Dukić, not the published screenplay. It may equally be Dukić’s writing, or descend from Keret.

So it is logged **Open** in `ATTRIBUTIONS.md` rather than Verified, the caption says *spoken by* and claims nothing about authorship, and the caption says on its face that the question is unsettled. A drawing would not have needed the answer at all; quoting four words is what put the site on the hook for it.

2026 · 10 September

## Nine typefaces a reader can set the sheet in, six of them drawing letters that exist because the grammar refused the person

Ryan asked what fonts *queer design* — after Robin Mientjes by way of Paul Soulellis: “an attitude in the face of conformity, an attitude in the sea of passivity, an attitude to say yes when others say no.” Twenty candidates went onto two specimen sheets; nine were kept. **Six are from [Bye Bye Binary](https://gitlab.com/bye-bye-binary)**, a collective drawing glyphs for inclusive and non-binary French. The rest are from Velvetyne and the Braille Institute.

MountedA typeface picker where four options set the reading face and five only set the headings, and that split is a constraint rather than a taste

**Thirty-two faces are declared and a reader who picks none downloads three.** That is the whole reason nine options cost nothing: an `@font-face` is a declaration, and the file behind it is fetched only when a rule using that family first meets rendered text. So the picker needed no lazy-loading machinery — the mechanism was already in the cascade. Pick BBB Baskervvol and exactly its three cuts arrive; pick nothing and the sheet is what it always was.

**Four of the nine set both faces and five set only the display, and it is not a preference.** Victorianna ships a Thin cut alone and is unreadable at reading size — that was visible on the specimen before anybody chose it. Redaction Inclusive, Insolente, Trickster and Sporting Grotesque have *no italic at all*, and this site is built out of citations: setting one of them as the reading face would put a faux slant on every `<cite>` on every sheet. So those five change the headings and leave Newsreader to read, and the four with a real italic — BBB Baskervvol, Adelphe, Coxinelle, Atkinson Hyperlegible — do both.

**Three of them had been shown in the wrong weight.** The first specimen set Adelphe in Floréal Bold, Coxinel·le in Black and Sporting Grotesque in Bold, because those filenames sorted first in their repositories. Two full text families were presented as heavy display faces. Regular, Italic and Bold here, which is the difference between offering a typeface and offering whatever came out of a directory listing first.

The faces, the class rules and the manifest are generated from one table by `tools/make-fonts.mjs`, so the stylesheet cannot declare a family the picker does not offer or the reverse. And because the option list lives in the markup on eighteen pages while the faces live in one table, **`check-metadata.mjs` now compares the two** — an option with no face behind it offers a reader a typeface that will not load, and a face with no option is weight nobody can reach. Both are silent, and narrowing the nine is exactly when they would happen. Proved by offering a face that does not exist and watching it be named.

CabinetCUTE is not the OFL, and reading it is what turned up two faults in our own house

Six of the nine are under **CUTE — Conditions d’Utilisation Typographiques Engageantes**. It permits use, copying, redistribution, modification and commercial use, and states outright that it is “not technically compatible with any FLOSS license to date”, taking a position “radically and deliberately inconsistent” with them. **It is explicit that it governs fonts and not the documents they set** — its own example is that a book typeset in a CUTE font is not governed by CUTE — so nothing on this site is relicensed by using them.

Three of its conditions bind us. **Credit the designers and link the original publication source** — the first specimen named the collective in plain text with no link, which is half of it. **Share complete files** rather than lone extracted faces. And **do not delete the post-binary characters or the OpenType features that activate them**, which forbids subsetting: the six CUTE faces ship whole while the two house faces are cut to the latin subset. Its donation is a *condition* and not a suggestion; Stimpunks met it at the “for an association” tier.

**Reading a licence properly is what found the faults at home.** Sourcing these candidates meant reading nine licences, and that turned up two of our own: the house faces had been redistributed for a day with no licence file beside them, and the colophon credited both of them to a search engine rather than to **Undercase Type, Phaedra Charles and Flavia Zimbardi**, and **Production Type**. Every credit on this site is now fetched from upstream metadata rather than typed, which is the same standard the quotations are held to — and the reason it was worth reading the licence rather than assuming a font is a font.

2026 · 10 September

## The device decides, and the reader may say otherwise: three reading settings, and a motion rule that had to be turned inside out to allow the second answer

Prompted by Ryan asking whether the site supported forced colours and whether the accessibility settings buried in system menus could be surfaced on the page. **The answer to the first was no** — not one `@media (forced-colors: active)` anywhere — and it was outside the audit’s stated scope rather than missed by it, which is the one time a scope caveat has actually earned its keep here. The answer to the second was an argument, and the argument was lost: “respect the system setting” only reaches the readers who know the system setting exists. **Default to the device; allow configuration in the moment.**

Label correctedThe fonts were redistributed for a day with no licence beside them, and their designers were credited to a search engine

**Self-hosting the two faces on 9 September stopped the site disclosing every reader’s address to Google, and introduced a licensing fault in the same move.** Both are under the SIL Open Font Licence, which requires the licence text to accompany the fonts *wherever they are redistributed* — and a public repository serving `woff2` over HTTP is redistribution. For a day they had none. `fonts/Fraunces-OFL.txt` and `fonts/Newsreader-OFL.txt` are there now, each family’s own file with its own copyright line, because a generic copy of the licence carrying somebody else’s copyright would be a gesture at compliance rather than compliance.

**And the colophon credited both faces to a search engine.** It linked “Fraunces” and “Newsreader” to their Google Fonts pages and named nobody. On a site whose one stated correctness requirement is that credit reaches the person it belongs to, that is the fault it exists to catch, committed against the people whose letters every word here is set in. **Fraunces is by Undercase Type, Phaedra Charles and Flavia Zimbardi. Newsreader is by Production Type.** Both are now on [the colophon](https://queering.earth/design), in `ATTRIBUTIONS.md`, and in a `fonts/README.md` so the provenance is legible to anyone who opens the folder.

**The names are read out of upstream metadata, not out of anybody’s memory.** `tools/make-fonts.mjs` fetches each family’s `OFL.txt` and its `METADATA.pb` and refuses to write a licence file it cannot recognise as an OFL, or a credit with no designer in it. So the attribution cannot drift from the files actually being served, which is the same standard every quotation on every sheet is held to. `check-metadata.mjs` fails if a family’s licence file goes missing or its designer is unrecorded — proved by moving one out of the way.

The occasion was Ryan asking what a font picker might hold: faces that queer the design, after Robin Mientjes by way of Paul Soulellis — “an attitude in the face of conformity”. Sourcing candidates for that meant reading licences, which is what turned this up. **The candidates are set out on two sheets, at `/specimen` and `/specimen/more`**, in this site’s palette at its own sizes on its own paper, weighted heavily towards [Bye Bye Binary](https://gitlab.com/bye-bye-binary), a collective drawing glyphs for inclusive and non-binary French — letterforms that exist because the grammar refused the person. It is a scratch page: `noindex`, absent from the sitemap, and **to be deleted once the choice is made**, because a specimen kept after the decision becomes a second, stale account of what the type is. Twenty candidates across the two, each fetched with its licence — several of the Bye Bye Binary families publish theirs as a PDF, shipped as-is because a transcription of a licence is not the licence, and two state their terms only in a README and are marked as such rather than assumed into the OFL. **Two families named in that conversation turned out not to exist under the names given** — `amiamie` and `lucioles` were recalled wrongly and are on neither sheet, which is the ordinary way an attribution from memory fails here.

Label correctedThe panel shipped unable to open, and every test that passed had bypassed the thing that was broken

**It went out not working.** Ryan pressed *Reading* on the live site and nothing happened. Inside `.qe-controls` — the flex row the controls sit in — a real click over the summary arrives with `event.target` set to the `DETAILS` rather than the `SUMMARY`, so the disclosure never toggles. Positioning the summary lifts it into the hit test and the click lands. One rule, and it is commented, because a rule that looks redundant is exactly what a working fix for this looks like.

**What is established is narrower than an explanation, and the comment says so.** A pristine `<details>` in `<body>` opens on a real click; the same one inside this flex row does not; nor does one with no content at all, so it is not the content slot; making the `DETAILS` static does not help, so it is not the positioned parent. Positioning the `SUMMARY` fixes it every time. The mechanism is not proved and is not asserted.

**The interesting part is why the verification passed.** Every check run before shipping used `summary.click()`, which dispatches a click directly at the element and *skips hit testing entirely* — the one thing that was broken. The screenshot that showed the panel open had been taken after setting `open = true` from the console. Both are green lights on a control no reader can operate. Two earlier clicks in the same session landed on the wrong button because the pane’s screenshot frame is 800px wide while the page is 593, and both were read as evidence rather than as a mis-aimed click.

**The rule that comes out of it:** a control is not verified until a real pointer has operated it. A synthetic `.click()` proves the handler runs; it proves nothing about whether anybody can reach the handler. The keyboard path could not be verified here at all — a pristine details at body level does not respond to a synthesised Enter either, so the harness was the limit rather than the site. It was written down as unverified rather than as passing, and **Ryan confirmed it on the live site the same day**: Tab reaches the control and Enter opens it. Recorded here because “I could not check this” is only honest for as long as it stays true.

MountedReduce motion, more contrast and looser lines, each starting from what the device already asks for

**The case against putting these on the page is a good one, and it is wrong here.** A site reimplementing a setting the operating system already has only helps the readers who find the widget, and it shifts the work of configuring accessibility onto the person who needs it. That argument is why *plain view* was defensible and a settings menu was not: plain view turns off *this sheet’s* wonk and rotation and display faces, which no system setting could know about.

What it misses is that **most people have never opened that menu.** Implementing `prefers-reduced-motion` perfectly still only catches the readers who have already been to System Settings and found the switch. And a preference set once, months ago, cannot know that today is a migraine day — **access needs move during a day**, which is not a subtlety for a site made by two Disabled people. So the media query is the default and the panel is the override, in that order.

**The stored value is three-state, and that is the whole design.** Absent does not mean *off*; it means *follow the device*. Only an explicit `on` or `off` writes a class, so with nothing stored the stylesheet’s own media query decides and the answer without JavaScript is the same answer as with it. *Follow my device again* removes all three keys and hands the reader back to their own machine, rather than freezing today’s answer as though it were permanent.

**Reduce motion is deliberately not plain view.** Ryan’s point, and he is right: you might want the motion gone and want to keep the display faces, the wonk and the leaning slips. They were one control because motion was one of the things decoration happened to include, not because they are one preference.

It is a native `<details>`, and it must stay one. A hand-built menu needs focus trapping, a roving tabindex, `aria-expanded` kept in sync and an Escape handler, and getting any of that wrong would make **the accessibility panel the least accessible thing on the sheet.** The browser ships all of it. Escape and click-away are the only additions and both are conveniences over something already working. Every word in it is authored in the markup; the script sets checked states and classes and writes nothing.

CabinetText size, which the sheet already followed — and the first setting that is not a yes or a no

**The first option is not a no-op, and that is the whole reason it is worth showing.** `html` is set to `font-size: 100%`, which inherits whatever size the reader’s browser is already set to, and every one of the 129 type sizes on this sheet is in `rem` — not one in `px`. So are the spacing scale and the measure. Raising the root therefore moves the line height, the gaps and the 66-character measure together, rather than swelling the words inside a box that stays where it was.

**Larger only, and that is a house rule rather than a shortcut.** The style guide puts body text at 18–20px and this sheet sits at `1.19rem`, which is 19px on a default browser. A *smaller* option would take it under that floor, so the panel does not offer one. A reader who wants less turns their own browser down and the sheet follows — which is precisely what the first option names.

It is a `<select>` because two steps is not a checkbox, and native for the same reason the panel is a native `<details>`. It also makes something visible that was implicit: for the three checkboxes, “follow your device” is the *absence* of a stored value and a reader has no way to see it. Here it is an option they can choose by name.

**The gate caught this key one setting after it was written, which is the point of it.** The storage check found settings by their `html.qe-\*-on` and `-off` classes, and text size stores `larger` and `largest` — so the pattern would have let `qe-textsize` go undocumented on `/privacy` while reporting green. Widened to any state, it failed immediately and by name. A check written for the cases that existed is a check with a blind spot for the next one.

Verified the way the last one should have been: a real click opened the panel, the control was confirmed to be the top hit target at the point a reader would press — the check that would have caught last night’s bug — and a real keypress moved it through both steps, 16px to 18 to 20, with the class, the storage and the reset button following. A real click on *Follow my device again* put all four back.

Re-determinedMotion is off by default now, and the rule that guarded it came out of the change stronger than it went in

Every animation on this site lived inside `@media (prefers-reduced-motion: no-preference)`, and the rule beside it read: “the reduced state is the finished drawing, never a missing one. Never put an `opacity: 0` outside that query.” That structure is correct and it **cannot express the second answer** — a reader who asked for motion on a device that asks to reduce it. There is no way to add a class to a media query.

So the gating inverted. **Motion is now off in `:root`**: `--qe-draw` and its siblings are `none`, `--qe-sprout-start` is `1`, and exactly two things switch them on — the media query, and `html.qe-motion-on`. The timings are written once in `--qe-anim-\*` and the two blocks only *map* them, because a duplicated cubic-bezier is a drift waiting to happen and a duplicated mapping is three lines that either work or obviously do not.

**The rule that replaced the old one is stronger, and it says why rather than what.** Not “never put an `opacity: 0` outside that query” but **the default must be the finished drawing** — so a reader with no CSS variables, no JavaScript, or a device asking for less motion gets a complete drawing because that is what `:root` says, not because a query happened to wrap the rules. One place needed a hand: an un-animated stem would have stayed invisible behind its own `stroke-dashoffset`, so the static state puts it back to zero. Verified in the browser in both directions, and the reduced state reports `animation: none` with `stroke-dashoffset: 0px`.

CabinetForced colours, which is the one setting here that is not ours to offer — and a gate that makes /privacy name every key the site keeps

**There is no toggle for forced colours and there cannot be.** It reports an operating-system state — Windows Contrast Themes and its kin substituting the reader’s own palette for everything we declared — and a page can only respond to it. That is the point of the feature: the reader’s choice outranks the site’s. It sits beside *More contrast* in the panel as the thing the panel deliberately does not contain.

Most of this sheet survived the substitution already, on decisions taken for other reasons: every control is a real `<button>` with a real border, and **the register’s four kinds carry words as well as an accent**, so a palette that flattens their colours does not flatten their meaning. The rule that put the colour on the rule and never on the glyph paid a debt it was not taken out for. What needed repair was the card hover, which was a background change and nothing else and therefore vanished outright; the edges that leaned on a `box-shadow`; and focus, which now tracks `Highlight` rather than our rust. The botanical art is *allowed* to be forced — colour is not information in a drawing of a leaf, and the spec reserves opting out for the case where the colour *is* the information.

**Three new keys meant `/privacy` was one edit away from being wrong about its own site**, which is the failure this register exists for. So the policy names them, and a gate now enforces that it always will: every `qe-\*` key the site reads or writes must appear on that page. It finds them two ways, because one is not enough — literal `getItem` calls, and the `html.qe-\*-on` classes in the stylesheet, since the reading settings build their keys from a table and appear as no string literal anywhere. Proved by adding an undocumented setting and watching it be named in the failure. It is the sibling of the third-party-origin check mounted yesterday: **not forbidden, named.**

2026 · 9 September

## The manifesto, adapted under its own licence — and a tightened quotation found on our own foundation’s page while sourcing it

The founding papers had one page in them. [The second](https://queering.earth/manifesto) is the argument the aims rest on, adapted from the [Neuroqueer Learning Spaces Manifesto](https://stimpunks.org/projects/neuroqueer-learning-spaces/manifesto/) — a nine-author community document under CC BY-SA 4.0, initiated by the two people who make this site. **Sourcing one quotation for it turned up a drift in our own house.**

Label correctedOne preposition and an undeclared ellipsis, in the version of Max Alexander this site was handed

Ryan supplied the *Playful Manifesto* quotation as “a translation of my world *into* yours….This is a protest of the notion that there is any correct way to live”, which is what [stimpunks.org](https://stimpunks.org/projects/neuroqueer-learning-spaces/manifesto/) carries. **Alexander wrote *to* yours**, and three sentences stand between that one and the protest.

**A translation *to* somebody is offered; a translation *into* them is done to them.** One word, and the image inverts. The ellipsis is the more ordinary fault: compressing is defensible, doing it with `….` and no note is how a reader comes to believe two sentences are adjacent.

**So the sheet quotes the opening whole and says on its face that the circulating version is tightened, naming our own page as where we found it.** A ledger that only catches other people’s tightening is not a ledger, it is a defence. The fix on stimpunks.org is one word and a fuller quotation; that is not this repository and is [recorded as an open item](https://queering.earth/what-is-settled) rather than acted on, the same way an SKS finding is.

MountedTwo quotations that cannot be verified, carried anyway, with the transcription named instead of the tape

Nick Walker on *weirding* comes from a recorded panel nobody here has listened to; Grada Kilomba’s *Who Can Speak?* from a 2016 book nobody here has opened. Both reach the page through the NQLS manifesto’s rendering. **This file’s own rule permits that** — *where the primary is not reachable, quote it with the citation attached and name whose transcription it is* — and both figcaptions name the transcription rather than the source, in bold, on the page rather than only in the ledger.

**The Kilomba excerpt is two contiguous lines out of twenty-odd, and contiguous matters more than short.** Picking the most striking lines from across the passage would have produced a tightened Kilomba on the page whose subject is tightening. Two that sit together elide nothing inside the quotation, and quoting the passage entire would be a substantial reproduction of a copyrighted work to make a two-line point.

Walker’s definition of *neuroqueer* as a verb is already on the home page and verified at source. This extends the same move to *weird*, which is what [Sheet No. 4](https://queering.earth/invention-of-normal) is about: *wyrd* was demoted from fate to defect, and turning *weird* back into a verb is that history running the other way.

CabinetTwo of the nine authors wrote this page, which is exactly why the credit is not a formality

It would be easy to treat a document Ryan and Helen initiated as theirs to carry across without ceremony. **Nine people wrote it.** The foot of the sheet names every contributor and the licence, in the page rather than only in the ledger, and says plainly that what happened here is an adaptation: no sentence carried over verbatim, the argument taken off learning spaces and pointed at reading.

**Share-alike is the reason this exists and the reason it is not the end of anything.** CC BY-SA 4.0 is why the adaptation is permitted, and the same clause is why anybody may do this again to our page.

**It does not restate the home page**, which was the risk the mission page was shaped to avoid. The home page explains what queering is; the aims list what we are for and where each is kept; this argues why any of it follows. Three genres, one subject, no duplicated paragraphs.

2026 · 9 September

## A new accession goes at the top, anchored on the register, and this one proves it

The entry below records four accessions ending up in the wrong order and the two assertions added to catch it. **Neither assertion can see the case that caused it** — within a single day the order is editorial and nothing mechanical can verify it. This is the part that closes: a written rule about *where the insert goes*.

CabinetThe fixed anchor cannot go wrong whoever else is editing; the relative one is correct only while nobody is

**Anchor on `<div class="qe-register" id="latest">`, never on the last accession you wrote.** The register runs newest first, so the top is a fixed address and the previous entry is not. Inserting above your own last entry is right for exactly as long as nobody else adds one — which was true every day this register has existed until this evening, when two sessions appended to it for three hours. Ryan asked for the rule; it is in `CLAUDE.md` beside the checklist a session reads before writing an entry, rather than only here where it would be read afterwards.

**The marker moves in the same edit.** `· latest` comes off whatever holds it and goes on the new entry, and `check-markup.mjs` refuses a page where it is not on the first accession. That gate plus this rule cover the two halves: the gate catches a marker in the wrong place, the anchor stops an entry landing in one.

**This entry was inserted by the rule it describes**, anchored on the register div with the marker moved off the section below. Which is the smallest possible test, and better than none.

2026 · 9 September

## A way straight to the newest accession, and the discovery that it was not where the page said it was

The contents list added an hour ago put the newest accession 4.8 screens down, so [a jump](#latest) was wanted. Building it exposed something worse: **the register was out of chronological order and had been for the whole evening.**

MountedThe address is on the register, not on the newest accession, which is what makes it permanent

**A link to the newest entry’s own id would be a hand-kept pointer at a moving target** — stale the next time anything is mounted, in the file that exists to record exactly that kind of failure. The register runs newest first, so *the top of the register* is the latest by definition. `#latest` sits on the register itself and cannot go stale, because nothing about it is a copy of anything. It needs no script, which a derived `href` would have, and it gives the newest accession a permanent shareable address for the first time.

**It sits directly under the lede, and that took a measurement.** Placed after the register’s own housekeeping note it landed at 1,587px on an 866px viewport — below the fold, which is no use to somebody arriving to see what changed. Under the lede it is at 680px. **Second time today a link was put somewhere reasonable-looking and measured out of sight**, after the finding aid’s search box.

Label correctedFour accessions written after 22:43 were sitting below four written before it

**Two sessions were appending to this file at the same time**, and each anchored its insert on the last accession *it* had written. Both were locally correct; the page was globally wrong. The four accessions from 22:43 onwards sat beneath the four from 20:46 to 22:33, and `· latest` was on the fifth section down. Re-ordered against the commit timestamps rather than against anybody’s memory.

**This is the card-order fault again, in the one file that gate does not look at** — the third time today that a list correct in every part has been wrong as a whole. And it now matters more than it did this morning, because `#latest` is a published address that depends on the order being right.

CabinetTwo assertions on the register’s order, and only one of them would have caught this

`check-markup.mjs` now checks that accession dates do not increase down the page, and that **exactly one accession is marked `latest` and it is the first**. The date check is worth having and was blind to this: every accession that day carries the same date. **The marker check is the one that bites.** Within a single day the order is editorial and nothing can verify it — but which section is newest is a claim the page makes out loud, and a claim can be checked. Both were made to fail before being believed, the first by putting this evening’s actual fault back.

**It also turned up a third entity table.** This gate carried its own six-entity decoder, which did not know `&middot;` and handed the date check back a raw entity. `tools/html.mjs` was written to stop precisely that — “an entity table is a lookup that one tool teaches and the other does not” — and the gate simply was not using it. It imports the shared one now, which throws on anything it does not know rather than passing it through, and all seventeen pages still pass.

2026 · 9 September

## The finding aid gets one too, and three thresholds in a row turn out to have been the same mistake

Every page on this site now carries a contents list except two, and neither of those declines on a threshold. **The pattern is worth more than any of the three rules it replaced.**

CabinetThree thresholds tried, three retired, each measuring the list instead of the reader

**They went in this order, over about two hours.** *More than two headings* — retired, because two entries that save twenty screens beat seven that save two. *The block must not be too tall* — retired, because 2,322px against a 120-screen page is a bargain and the comparison that decides it is the block against its own page. *The page must be long enough* — retired now, with [the finding aid](https://queering.earth/search) at 1,307 words.

**Each of the three measured the list. None of them measured the reader.** What is left is structural and has one instance: *does this page already have a better index of itself?* The home page answers yes — its plate of eight numbered cards is a contents list, and a second one above it would put two competing lists on one page. The error page is an error page. **Everything else has one.**

Label correctedStraight after the lede put the search box below the fold, on the page that is a search box

The house puts a contents list directly under the lede, and following that here pushed the input to **970px on an 866px viewport** — out of sight on load, on the one page whose entire purpose is that field. **Caught by measuring rather than by looking**, which matters: the screenshot looked perfectly reasonable, because a screenshot of the top of a page always does.

It sits below the form and the results now, immediately before the sections it lists, and the input is back at **804px**. A reader with results in front of them is not looking for a contents list; a reader scrolling past them is. **The exception is recorded rather than left as a quirk of one file**, because the next person to tidy this page will otherwise move it back.

2026 · 9 September

## This register now has the contents list an earlier entry measured, refused, and wrote a rule against

Ryan asked for it. The old refusal was **right about its number and wrong about what the number meant** — which is a more interesting way to be wrong than simply not having measured.

Re-determinedBlock height was the wrong measure, the same way heading count was the wrong measure an hour ago

**The figures, re-measured rather than quoted.** Thirty-three accession headlines averaging 140 characters; the list renders **2,322px** and puts the first entry **4.8 screens** down. Both worse than the 1,293px and three and a half screens that got it refused, because ten accessions have been added since.

**And it does not matter, because the page is 40,408 words.** That is roughly a hundred and twenty screens. A list that costs 2.7 of them to reach any one of thirty-three accessions directly is the trade a contents list exists to make. The refusal compared the block against other pages’ blocks; the comparison that decides it is the block against *its own page*. **This is the two-heading threshold’s mistake from the other end** — count was the wrong measure there, height is the wrong measure here, and page length is the question in both.

**Columns were tried and do not help.** 2,322px in one column, 2,213 in two, 2,302 in three. Narrowing a column makes a 140-character sentence wrap proportionally more, so width traded for wraps is a wash. Measured in the browser before the CSS was considered, and then not written. **The labels stay verbatim**: truncating one is this site’s characteristic failure applied to itself, and a short second label is the drift the derivation exists to prevent.

**Both indexes stay, and they do different jobs.** The contents list is chronological, by accession, at the top; [the index by sheet](#qe-index-h) is at the foot and files the same entries by what they happened to. Front matter and back matter, which is how a bound volume carries both. The one-line pointer that used to sit by the legend came out — the contents list’s last item is a link to that index, and two adjacent links to one place read as a mistake even when both are right.

2026 · 9 September

## A feature was mistaken for a fault, removed, and put back within the hour

The rail on [the ledger](https://queering.earth/ledger) read “Verified · Open · Every attribution on this page” — the third of those being the index’s own heading, listing itself inside the navigation beside it. **Two components built in parallel, each correct on its own.** The rail excludes `.qe-contents` by name; the entry index arrived as a second navigation block inside the landmark and nothing knew to skip it.

Label correctedThe test is the element now, not the class, so the next navigation block needs no line

**A heading that labels a navigation block is not a section of the page.** That was always the rule; it was written down as `.qe-contents` because that was the only case when it was written. **A list of class names is a rule that gets quietly broken by the next component** — the same shape as “the two view controls, and nothing else” and “the one Python tool here”, both of which this file has already had to correct into boundaries. Every navigational block on this site is a `nav`, including the rail and the index themselves, so the element is the test.

**Proved in both directions rather than one.** The ledger’s rail is “Verified · Open” and its entry index still fills 53 and 2; [Sheet No. 1](https://queering.earth/on-being-ill)’s contents list and rail are unchanged at seven each. A fix to a shared derivation that is only checked on the page that was broken is a fix that breaks fourteen others quietly.

**Worth recording as a hazard rather than only as a bug.** Both components were built the same afternoon in two sessions against one working tree, and neither was wrong about its own page. The failure lives in the seam, which is the one place a gate here does not look: `check-markup.mjs` validates the served markup, and this list does not exist until a script runs.

Re-determinedIt was not a fault. Ryan liked the rail pointing at the index, and a destination inside a nav is still a destination

**The entry above determined a feature to be a bug, and the determination was wrong.** The rail on [the ledger](https://queering.earth/ledger) listed “Every attribution on this page”, this session called it self-announcement and removed it, and Ryan said plainly that he had found it useful. He is right: on a page of 130KB, a link from the rail straight down to an index of all fifty-five entries is the most useful thing in it.

**Two cases that look identical and are not.** A contents list containing “On this sheet” is a list pointing at itself. A rail containing “Every attribution on this page” is a list pointing somewhere a reader wants to go. Collapsing both into “any heading inside a nav” was a generalisation that read as principled and cost a feature; the honest rule is narrower and older — **a list must not contain its own heading**, and `.qe-contents` and `.qe-rail` are one derivation shown twice.

**The reversal is the entry, not a quiet edit to the one above it.** That entry stands as written, because a register that revises its own determinations in place is a register that cannot be checked — which is the argument this whole page is built on. This is the third re-determination here and the first where the thing re-determined was our own judgement rather than a source.

MountedAnd the two record pages got the contents list they could not have had an hour earlier

**The re-determination above is what made this possible**, which is a pleasant way for a mistake to end. With two `h2`s a contents list on [the ledger](https://queering.earth/ledger) would have read *Verified* and *Open* and told a reader nothing — the stated reason both record pages went without one when they shipped. With the entry index’s heading back in the derivation it lists three, and the third is a jump straight to all fifty-five entries.

**The standalone pointer came out in the same pass.** It said “every entry is listed by name in the index at the foot of this page” and sat immediately above a contents list whose third item is a link to exactly that. Two links to one place, adjacent, is the kind of thing that reads as a mistake even when both are correct.

Twelve of seventeen pages carried one at that point, and checking which four declined turned up [a page with eight headings and no list](https://queering.earth/privacy).

CabinetThe two-heading threshold is retired, because it measured the wrong thing

**Ryan’s call, and it is the right one.** “A contents list needs more than two headings” was the stated reason both record pages shipped without one, and it counts the wrong quantity: **the reader’s problem on a twenty-thousand-word page is length, not heading count.** Two entries that save twenty screens of scrolling are worth more than seven that save two. The question is only ever whether the page is long enough to want one.

**Retiring a rule is a good moment to check what it was hiding.** [The privacy page](https://queering.earth/privacy) is 2,058 words with eight headings and had no list — longer than [Sheet No. 1](https://queering.earth/on-being-ill) at 2,045, which has one. It was never a decision, just a page nobody counted. It has one now.

**Four pages still decline and not one of them declines on heading count.** The error page; the home page, whose plate is already a contents list; this register, whose accession headlines average 148 characters and measured 1,293px against 319 to 510 elsewhere — it gets its index as back matter instead; and [the finding aid](https://queering.earth/search) at 1,307 words, the shortest page here that is not an error page and well under the 2,045 of the shortest page that has one.

Label correctedThe removal also broke the rail’s tick scale in the quietest way available, because the derivation existed twice

**Found by checking the deployed file rather than the local one.** The live `queering.js` carried the new `nav` test *and* the old class-name test, which meant a second copy of the same derivation somewhere else in the file. It was in `measureTicks`, which sizes the rail’s ticks to the sections they stand for.

**It failed safe and therefore silently.** That function re-derived the heading set with the old exclusion, counted three against the rail’s two, and hit its own `heads.length !== items.length` guard — so on both record pages the ticks were simply never measured. No error, nothing visibly broken, a rail of default-sized marks where a scale drawing belonged. **A guard that fails safe still fails.**

**One derivation, one place.** Both callers now use a single `sectionHeads()`, so there is no second copy left to fall behind. Verified on both pages afterwards: the ledger’s ticks read 32.0px and 9.0px — correctly saying that *Verified* holds fifty-three entries and *Open* holds two — and Sheet No. 1’s seven are unchanged.

2026 · 9 September

## The two longest pages on the site could not be surveyed without reading all of them

A reader wanting to know whether the ledger holds an entry on Rossetti had one option: scroll 130KB of it. Both record pages now carry **an index of their own entries** at the foot — 55 on [the ledger](https://queering.earth/ledger), 71 on [the decision log](https://queering.earth/what-is-settled) — with a one-line pointer up in the front matter, the way a bound volume does it.

MountedBack matter again, and built at runtime for the reason the contents list is

**A contents list was the wrong reach and this page already knows why.** `.qe-contents` derives from a page’s `h2`s, and both records have two — it would have shown *Verified* and *Open* and delayed every reader to say nothing. What a reader wants is the entries. So it is the register’s `.qe-sheet-index` shape a second time: **back matter, ruled off, at the foot**, because front matter costs every reader and back matter costs none.

**Generated into the HTML it would have double-indexed all 121 headings.** The SKS mirror and `search-index.json` both read the landmark, and a list of every heading sitting beside those headings is a second copy of each — the exact reason the contents list is built at runtime rather than written down. So the served container is empty, `queering.js` fills it, and both generators skip it so the `.md` does not announce a list it has no room for.

**The group headings are derived here, where the register’s are authored.** That is the one real difference between the two indexes and it is not a relaxation: the register’s groups are sheet names, which are editorial words `queering.js` may not write, whereas these groups are the page’s own `h2`s and every label is a clone of text the reader can see above it. Nothing is composed, summarised or truncated — the same standing the contents list has.

**A group heading is a paragraph and not a heading**, which looks like a downgrade and is the opposite. These are clones of headings the reader has already passed; putting them back into the outline would give the page a shadow contents made of duplicates, which is worse for a screen reader’s rotor than having none. It wears `.qe-index-sheet`, so it still looks like what it is.

CabinetNo line in REVEAL, and that was checked rather than assumed

`reveal.mjs` says in its own comment that it is “for a fetch or a hidden state, not for anything merely built at runtime”, and this component ships hidden — which reads like a case for it. It is not: the drift rail’s `if (r.hidden) continue` is only sensible if `queering.js` has already run under the gate, so anything that unhides *itself* is measured without help. **Confirmed by counting rather than by reading the source:** `/ledger` went from 1,782 measured elements to 1,845 with the index in, and its print count did not move, because the index is `display: none` on paper.

**Two columns above 34rem, one below.** Fifty-five short names in a single column is a screen and a half of nothing but links with the measure wasted on them; two columns of wrapped link text on a phone is a column of three-word fragments. The divider is a `column-rule` rather than a gap, because a bare gap between two lists of links reads as one ragged list. `check-overlap.mjs` was the thing to watch here and reports zero collisions across all three passes.

One spacing fault came out of looking: `.qe-index-link` is shaped for the register, where the pointer is the last thing before the entries and needs no bottom margin. Here the body follows it immediately, so the line read as the opening of the paragraph beneath it.

2026 · 9 September

## Two pages of this cabinet had addresses, were listed on the home page, and were reachable from the foot of nothing

The footers had drifted into three shapes: fifteen carrying the cabinet pages as authored gloss sentences, one carrying a short row of three, and the home page carrying none by design. **The inconsistency was the symptom; the defect underneath it was that [the ledger](https://queering.earth/ledger) and [the decision log](https://queering.earth/what-is-settled) appeared in no footer at all**, two days after they were given addresses. Every footer is now a row of short links, the collaboration line, that page’s own licence sentence, and on the sheets one sentence pointing at the ledger — 32 to 98 words where there were 107 to 226.

CabinetEighty copies of five sentences, and the one place they were supposed to live

Each cabinet page was introduced in the footer by an authored one-line gloss. **Five sentences restated across sixteen pages is eighty copies of editorial prose, every one of them free to drift**, and drift is what happened — which is how two pages could go missing from all of them at once without anybody noticing. The glosses still exist, once, in the furniture list on the home page, which is where this cabinet already said those sentences live.

**The row uses short names, and that is a second name for those pages.** It says *Colophon*, *Register*, *Decisions*; the pages call themselves [How this site is made](https://queering.earth/design), [The accession register](https://queering.earth/changelog) and [What is settled, and what is open](https://queering.earth/what-is-settled). A row of links and a page title are different registers, and the rule against a second name is about the group headings, where a name identifies a set. The addresses are unchanged.

The home page keeps its bare footer: its furniture list sits two paragraphs above, with the same seven pages and their glosses, and a row of the same links directly beneath would be two lists of one thing.

CabinetWhere a sheet says which copy it read, and why that is not the provenance line

Six sheets carried a paragraph of sourcing in the footer — which printing, how many scans, which page. The question was whether it belonged in **the provenance line** instead. It does not, and the reason is worth writing down: **provenance here is accession history** — when the sheet was mounted, how often its label has been corrected, each clause linked to the entry that did it. It is identical in shape on all eight sheets, and that sameness is what lets a reader scan it.

**Which copy we read is a different fact with a different life.** It is about the works the sheet reads rather than the sheet’s life in this collection, and putting it in the provenance line would bury the *mounted, corrected twice* pattern under prose that changes from sheet to sheet. It also already has two homes: the specimen block at the head of every sheet, and the ledger.

So the footer keeps one sentence — every quotation here was read in the work it comes from, and is logged in the ledger — and the trail stays where it was. What is lost is detail like *read in three separately scanned copies*, which is in the ledger, and which the sheets saying it were saying for the third time.

2026 · 9 September

## A way back to the top, drawn as growth rather than as a chevron

Every footer now ends in a link back to the top of the page: the words *Scroll to top*, a small stand of grass under them, and no script at all — an anchor already scrolls, and this site’s smooth scrolling was gated on reduced motion the day it was written.

CabinetThe arrowhead is a seed head, because a chevron laid over grass is an interface arrow in a costume

The ask was grasses whose taller stems form an arrow pointing up. **A chevron drawn over grass is an interface arrow wearing a costume**, and this cabinet already has its own word for *up*: growth, stems drawing themselves on from the ground. So two tall blades arc up and converge at the middle stem’s seed head, and the silhouette is an arrow without one being drawn.

**The first attempt put two short awns on the head and read as a small figure with its arms raised.** It was looked at, and redrawn — which is what this cabinet’s rule about judging a drawing at the size it ships at is for. The words carry the meaning either way: the drawing is hidden from the accessibility tree, the link is named by real text, and a reader who sees only grass has lost an ornament rather than a control.

Label correctedThe landmark could not take focus, and the skip link had wanted it to since the day it was written

Two links now aim at the page’s main landmark: the skip link at the top and this one at the foot. **A landmark that cannot take focus leaves a keyboard reader’s focus where it was while the page scrolls somewhere else** — press the new link and the page goes to the top while the next Tab resumes at the bottom of the page you just left. It has been true of the skip link since it shipped, and it is invisible to anyone using a mouse, which is why nobody had noticed.

The landmark now takes `tabindex="-1"`, which keeps it out of the tab order and lets a fragment link hand it focus. Verified rather than assumed: activating the footer link scrolls 9,952 pixels, sets the address, and moves focus to the landmark, so the next Tab starts at the top of the reading.

2026 · 9 September

## Sheet No. 2 had no lede and an essay with no heading, so its own contents list could not name the reason it exists

When every sheet got a contents list, [this one](https://queering.earth/coming-to-terms) could not have a normal one: all six of its headings were in the 2026 commentary, and Ryan’s 2022 essay above them was unheaded, so a list at the top would have named six sections beginning a fifth of the way down and said nothing about the essay. **That was left open rather than patched, because giving the essay a heading is a decision about Ryan’s text and not a defect to sweep up.** He has now taken it.

Label correctedA heading in the author’s own words, and a note that stopped being true the moment anything sat above the essay

The essay is now a section called **Against My Grind**, and **the phrase is Ryan’s own** — it is lifted from the anecdote inside it, where he writes of the ways norms went against his grind. A heading invented for somebody else’s text would be a small piece of us wearing their voice, which is the failure [the ledger](https://queering.earth/ledger) exists to catch; a heading taken from the text is the text naming itself. The essay’s words are still untouched.

**The note below it said “everything above is the essay”, and that stopped being true in the same edit.** A lede and a heading now sit above it, and neither is his 2022 writing. The note names the section instead of the position, and says in as many words which parts are ours — a claim that binds is a claim to move in the commit that breaks it, which is the fourth time this cabinet has learned that and the first time on a sheet rather than [the privacy page](https://queering.earth/privacy).

With a lede and seven headings the sheet is now shaped like every other, so **its contents list moved back to where every other sheet keeps one** — straight after the lede, at a twelfth of the way down the page rather than a fifth. The exception it needed a week ago no longer exists, and the note describing that exception has gone with it.

2026 · 9 September

## The plate was eight screens down its own home page and there was no way back up to it

Every heading here has had an authored address since the contents list was built, and [the plate](https://queering.earth/#what-grows-here) and [the cabinet](https://queering.earth/#the-cabinet-itself) were reachable all along — by anyone who already knew the address. **A link nobody can find is close to a link that does not exist**, which is the objection this house makes to an untraceable quotation, arriving as a navigation problem. There is now a rail in the left margin on every page but this one: a column of short rules that becomes the page’s own headings when a pointer or a keyboard enters it.

CabinetTwo contents lists on one screen, on purpose, and the argument for why they are not the same object

This file already refuses a contents list for the home page because **two competing navigational lists is a defect**, and the rail plainly puts a second list beside the first on seven pages. The refusal stands and does not reach this: the contents list is **front matter** — read once, in sequence, in the measure, before the sheet begins. The rail is an **instrument**, glanced at from the middle of a sheet nine thousand words in. The home-page defect was two lists competing *to be read*; only one of these is for reading. **Ryan’s call, against the recommendation to hide one**, and the design work went into making them unmistakably different objects rather than into hiding either: the rail is smaller, mossy rather than rust, unnumbered, unlabelled, and out past the measure in space no line of text occupies.

It is unlabelled because a visible heading would be a third copy of the words *On this sheet* and the one free to drift. The `aria-label` is authored in the markup, once per page, and `queering.js` still writes no words — one builder now fills either container, because a second loop would be a second place for the three heading exclusions to be got right.

**The register is the page that does not get one**, for the reason it has no contents list either: twenty-eight headings averaging 147 characters, longest 226. In a 12rem column with no truncation allowed that is a four-thousand-pixel rail. [The same measurement that sent this page’s index to the foot](#a-2026-09-09-patina) keeps the rail off it.

CabinetThe rule that says grow the hit area was followed with the wrong instrument, and then with the wrong arithmetic

Two mistakes in the one rule this house wrote down because no gate enforces it. **The instrument first:** the view controls grow their targets with an absolutely positioned 44px box behind each control, and reaching for it here would have been wrong — rail links are *stacked*, so the boxes would overlap, the topmost would take every tap, and the rule asking for 44px would have produced a rail where most entries could not be pressed at all. Stacked targets take real padding.

**Then the arithmetic.** The padding was set from the measurements of a 1rem line and shipped 44px in a comment above targets that measured **31.1px** — a control whose own note explains the failure, committing it. Found by measuring the rendered box rather than by reading the rule back, which is the whole reason this site measures. A 0.82rem line at 1.35 is 17.71px, so the padding is 0.83rem either side and the box is 44.3px. Verified after: no two hit areas overlap, and the tallest rail on the site — [the colophon](https://queering.earth/design) at fourteen entries, 690px — still clears a 900px viewport before the clamp scrolls it.

The rail lives outside the landmark, so **no generator changed a single byte** when all three were re-run — checked rather than assumed.

CabinetBuilt at runtime is free; hidden is not, and the rail was both in the same afternoon

The rail shipped showing every label all the time, and **needed nothing from `tools/reveal.mjs`** — both Chrome gates load over `file://` and `queering.js` is fetched by relative URL, so it runs and the labels were measured like any other text. That was proved rather than assumed, by putting a 2.9:1 colour on the contents list and watching the contrast gate report exactly one failure per heading on seven pages.

**Then it was collapsed to hover, and all 109 labels went into the blind spot at once.** A gate skips what it cannot see, and `opacity: 0` is invisible. Proved both ways with a probe colour on the rail: **with** the new reveal line, 109 failures caught; **without** it, a clean `PASS` and 218 elements silently dropped from the count. The distinction is the thing worth keeping — `REVEAL` is for a **fetch** or a **hidden state**, and never for anything merely built at runtime.

**The labels are left in flow at zero opacity rather than floated in pills, and that is what makes the reveal safe for the other gate.** Pills would let the ticks sit at an even pitch, as they do on the page this was modelled on — and the moment the reveal turned them on for measurement they would lie over one another, so `check-overlap.mjs` would report every label sitting on the next. In flow, what the gates measure is the expanded rail that was already clean at 1280px. The pitch is uneven instead, because a row is as tall as its own label: one row on the home page, three on [the waste garden](https://queering.earth/flower-codes).

Label correctedThe rail would not appear for the person who asked for it, and the number keeping it away had been reserving room for a block that is not there

It shipped appearing above 1232px. Ryan uses a browser whose tab sidebar takes its width out of the viewport, so a laptop was arriving under that and **the rail he had just asked for never appeared at all.** Lowering the number turned into finding out it had never been derived correctly.

**The breakpoint was never measuring clearance.** The rail and the page are both derived from the same centre line, so the gap between them is constant at every width — widening the window moves both outwards together and buys the prose nothing. The only thing that fails as the window narrows is the rail sliding off the left edge, so the left is now pinned rather than computed from the centre, which turns that failure into “stops moving”.

**And the sum was holding back 288px for `.qe-wide`, which widens nothing on screen.** This site’s own notes said two blocks break the measure — the masthead and the provocation. Neither does: the masthead never carried the class, and `.qe-wide` asks for 46rem inside a `main` capped at 34rem, where a max-width larger than its parent constrains nothing. The provocation renders at 448px, like every other block, and has done since the rule was written. **Nobody can miss a block that was never wider**, which is why it survived this long on a site with eight gates. It is left alone rather than changed, because widening the provocation is a decision about how this looks and [the decision log](https://queering.earth/what-is-settled) is where that belongs.

Measured rather than calculated, which is what should have happened first: at 1024px the leftmost thing inside the landmark across the art-heavy sheets is 277–288px against a rail ending at 172px, so the real clearance is about 108px where the old sum was defending 24. **The rail now appears above 1024px, 208px better than it shipped**, checked on both sides of the boundary.

CabinetThe rail’s ticks became a scale drawing of the sheet, because an imperfection with no norm behind it just reads as an accident

Collapsed, the rail was a column of identical rules at an uneven pitch — uneven because a row is as tall as its own label. Ryan’s read was that this was an imperfection worth leaning into. **The trouble with leaning into it as it stood is that asymmetry only reads as asymmetry against a norm**, and with nothing else varying the pitch read as an accident rather than a hand.

So the ticks were given the norm to deviate from, and the deviation is **inherited from the sheet rather than invented**: each tick is now as long as its section is tall, normalised across the page. The rail is a small scale drawing of the document, and you can see which section is the long one before reading a word. On [the Dickinson sheet](https://queering.earth/wild-nights) the longest section draws 32px and the shortest 9px, monotonic across all eight.

**That it means something is the licence for it, not a bonus.** A tick whose length varies looks like it encodes something, and this cabinet refuses decoration asserting a fact it does not have — a gold join on a sheet nobody corrected. Four treatments were drawn against the real stylesheet before choosing, and the one that varied length *without* meaning was refused for precisely that reason. **The lean beside it claims nothing**, which is what leaves it free to be ornament: up to 3.2 degrees, walked by the golden angle so the same sheet draws the same rail every time rather than rolling dice on each visit.

**The two part company in plain view: the lean goes, the lengths stay.** Plain view removes decoration and has never removed information, and splitting one effect into an honest half and an ornamental half is what makes that line drawable at all.

CabinetThe rail’s rule ends in a leaf now, and the doodles that were asked for were drawn and refused

The question was whether small doodles above, below or around the rail would add to the handwritten feel — asked with the risk already named: that it might spend the negative space. **Both arrangements were drawn and looked at, and the scatter was the wrong one.** A cluster at the head of the rail lands in the top-left corner of the page, which is where a reader’s eye starts and where the skip link appears on focus, and it makes the rail’s decoration the first thing anyone sees. This component is unlabelled precisely so that margin stays empty; filling it spends the thing that made the rail acceptable.

**What survives is the version that is not an addition at all.** The rail’s rule already reads as a stem, and a stem that simply stops is the only unbotanical thing about it. It now ends in a terminus — two leaves and a bud, continuing the line rather than sitting beside it, pulled back past the nav’s padding to meet the border. Twenty-eight pixels, stroke only, in moss. It occupies margin nothing else wanted and puts no second object on the page.

It wears `.qe-botanical`, so the growth is inherited rather than restated: the stem draws itself on and the leaves unfurl, both already gated on reduced motion and already kept-but-stilled in plain view. Only the size is new, [exactly as with the moth](https://queering.earth/#queering-is-a-verb). Because it takes a palette token it follows the ground with no cabinet rule of its own, which was checked in both.

**That no gate here measures a drawing against text is the reason it is small.** `check-overlap.mjs` catches text sitting on text, so an ornament in the margin is guarded by nothing at all and could drift onto the measure at some width without a word being said. Keeping the mark inside the rail’s own box means the clearance already measured for the rail covers it too. Anything free-floating would need measuring by hand at every breakpoint, which is a standing cost this cabinet has not agreed to pay for decoration.

Label correctedThis register said a rule did nothing, having measured it on screen and never on paper

The entry above went out saying `.qe-wide` *does nothing*. **That was an overcorrection and it was published three times before anyone checked paper.** The first claim — that two blocks break the measure — was reasoned from a rule and was wrong. The second was measured on screen and then generalised to every medium, which is the same fault wearing better clothes.

`@media print` sets `main { max-width: none }`, so on a printed sheet that rule is the only thing holding the provocation in: **it caps a block that would otherwise run the full width**, and centres it. The class does not widen — on the one medium where it is live, it narrows. Reproducing the print condition and measuring: no effect at all at 717px of printable width, 3px at 739px, 80px at 816px. Its effect scales with the printer’s margins and is invisible at the defaults, which is why nothing ever looked wrong.

**The lesson arrives here from a third direction.** [The colophon](https://queering.earth/design) already says paper is a medium this house has been burned by, and both browser gates measure it separately for exactly this reason: paper is not a wider screen. The notes in `queering.css` and the guidance file now describe the rule as the paper-only narrowing it is, and the rule itself is unchanged — whether the provocation should break the measure on screen stays a design question rather than a defect.

CabinetThree sheets had no contents list and no reason for not having one

[No. 1](https://queering.earth/on-being-ill), [No. 2](https://queering.earth/coming-to-terms) and [No. 7](https://queering.earth/flower-codes) were missing their *On this sheet* list. They run 2,045 to 3,098 words against 2,495 to 5,018 on the five that had one, **so the bar the existing sheets set was already cleared** and the gap was an oversight rather than a decision. All eight sheets carry one now. The opt-in stays in the markup: nothing derives a contents list from a word count, because which pages want one is editorial, and the pages that still decline all have a reason on the record.

**“After the lede” turned out not to mean “before the first heading”**, which was checked before anything was placed. Five of the existing lists carry opening prose after them — [the Dickinson sheet](https://queering.earth/wild-nights) nineteen blocks, [the Quetelet sheet](https://queering.earth/invention-of-normal) thirteen. A contents list is front matter for the sections, and the lede is not a section.

**No. 2 puts its list somewhere no other sheet does, and that is authored.** It has no lede, and all six of its headings are in the 2026 commentary — the 2022 essay above them is unheaded and stays that way, because the note directly above it says Ryan’s words are unchanged and a heading dropped into them would not be. A list at the top would name six sections that begin a fifth of the way down and say nothing at all about the essay, which is the reason the sheet exists. It sits immediately after that note instead, where the sheet says out loud that it is changing hands, and maps exactly what follows it.

2026 · 9 September

## The ledger and the decision log had no addresses, so the aim that pointed at them was the thinnest receipt on the mission page

[Aim 12](https://queering.earth/mission) says this site works in public with the working-out left in, and it pointed at two files on GitHub, because that was the only way to reach them. **An aim whose receipt is on somebody else’s website is not much of a receipt.** [The attribution ledger](https://queering.earth/ledger) and [the decision log](https://queering.earth/what-is-settled) are now pages here — generated from the Markdown rather than retyped from it, because two hand-kept copies is the failure this whole house is organised against.

MountedA generator that runs backwards, because the Markdown is the thing being kept and the page is the copy

**Every other generator here reads a page and writes Markdown beside it.** This one reads Markdown and writes the page, and the direction is the design: those two files are working documents. The `credit-source` skill appends to the ledger; every session that settles something appends to the other. Making the page the source would mean editing a ledger entry in HTML, **which is how a ledger stops being kept.** Either direction is fine; two hand-kept copies is not.

**It throws on a line it does not recognise, and then proves it did not drop one.** Every block’s words are checked against the rendered text before anything is written — whitespace removed on both sides, because tags are word boundaries in the source and not in the output. That proof caught four faults in its own author on the way here, and three of them were the proof being wrong rather than the converter: it stripped a bullet, a table’s pipes, and then the underscores out of `Photon Pulse\_he\_him`, a study participant’s pseudonym the converter was right to leave alone. **A guard that cries wolf gets relaxed**, so the proof was made to model the converter rather than approximate it.

The real fault it found was `\*\*The lower-case \*g\* is kept\*\*` in the ledger — emphasis nested inside emphasis, where the inner pair is a letter being quoted. The first pass refused the nesting instead of reading it.

CabinetThe addresses are not /attributions and /decisions, and that is a filesystem fact rather than a preference

**macOS is case-insensitive by default.** A page at `/decisions` is `decisions.html`, and `make-markdown.mjs` writes a `.md` beside every page — so it would have written `decisions.md`, **which is the same file as `DECISIONS.md`**. The generator would have silently overwritten its own source with a round-tripped copy of itself, on the first run, with no error and nothing to restore from but git. `attributions.md` collides with `ATTRIBUTIONS.md` the same way.

Checked before a line was written, by creating `AAA.md` in a temp directory and asking for `aaa.md`. The addresses are [`/ledger`](https://queering.earth/ledger) — the site’s own name for that file in every footer it appears in — and [`/what-is-settled`](https://queering.earth/what-is-settled), which is the other file’s own opening line.

Label correctedThe finding aid was describing a smaller cabinet than it searches

Its lede named the eight sheets, the colophon, the privacy policy and the register. It now also searches the aims, every attribution we have traced and every decision we have written down, so the sentence was false the moment the index was rebuilt. **This is the third time a page that binds us has had to move in the same commit as the capability that changed it** — after the privacy page twice. The pattern is the lesson: a claim only a human remembers is a claim that will eventually be false.

**The index roughly doubled, and that is a real cost stated rather than hidden.** 154 KB gzipped to 249 KB. It is fetched after the page renders and carries `max-age=0`, so an unchanged index is a 304 and no bytes move — the increase is paid when it changes, not on every visit. Both records were indexed rather than only the ledger, because a decision nobody can search is close to a decision nobody published.

CabinetBoth walkers learned a tag on the same afternoon, and one of them had to learn not to tidy

The decision log carries one shell block, so `make-markdown.mjs` and `make-search-index.mjs` both threw on `pre` — the throw-rather-than-drop rule working exactly as intended, in two tools, within a minute of each other. **The Markdown converter needed more than the tag.** Its text handler collapses whitespace and escapes punctuation, which is right everywhere except inside a fence: the first output put a shell command and its continuation on one line with backslashes through the quoting. A fenced block is the one place in Markdown where neither pass is wanted.

The search walker indexes the block rather than skipping it. Skipping was the quieter choice and the wrong one — a command in the decision log is content, and a searcher looking for the deploy hook should find the page that runs it.

2026 · 9 September

## A cabinet that publishes an attribution ledger, a privacy policy and a register of its own errors had never written down what any of it was for

There was a page for what the cabinet holds, a page for how it is made, a page for everything we have got wrong, and a page for what the site knows about you. **There was no page saying what we are trying to do.** That absence is not neutral, and this site already knows why: a project with no stated aim is a project whose aims can drift with nobody able to point at the drift, which is the objection it makes to a quotation nobody can trace and a number nobody can re-derive. [Sheet-less, numberless, and now written down.](https://queering.earth/mission)

MountedThirteen aims, each naming the page already keeping it — and, for each, the observation that would falsify it

**The genre is the whole defence against duplication.** The home page already carries 611 words of manifesto across three sections. A mission written as an argument would have restated most of it, and two copies of the same words drift — the rule this house repeats more than any other. So this is *an index of commitments with receipts*, which structurally cannot duplicate an argument: every aim ends by naming where it is already being practised, and an aim with no page keeping it would be visible as a hole. The form is [Star Stuff’s](https://starstuff.earth/mission), adopted deliberately; the aims are this site’s own and several have no counterpart there.

**An aim you cannot fail is not an aim.** The last section is a table pairing each aim with a condition somebody outside could observe, with no access to what we meant. **Most of them are not hypothetical.** The working tagline was once a paraphrase of Nick Walker wearing his name. Tuck and Yang were carried from settler colonialism to masking and the sheet nearly let their authority cover the move. And the plate said “Seven sheets” above eight cards — a count in our prose nobody could re-derive, which is the last row of that table, committed on this site, this week.

**What it refuses to claim.** Stimpunks’ first programme is direct financial support to individuals, and a section says plainly that this site does none of it and should not be counted as though it did. No sheet here has paid anybody’s rent. The honest claim for a cabinet of readings is narrower and is stated at that width.

It is **the first page in a second list** at the foot of the home page. *The founding papers* is why the cabinet exists; *The cabinet itself* is how it is made and what it knows about you. Purpose above plumbing, and the split is Star Stuff’s too — see the entry below for the day the first list was built.

MountedTwo quotations from our own two organisations, held to the standard everybody else’s words are held to

The page quotes the Stimpunks Foundation’s mission and Helen Edgar’s own landing page rather than paraphrasing either, because **the paraphrase is where a mission goes soft** and paraphrase-wearing-a-name is the failure the ledger exists to prevent. Both were read from the primary the day they were mounted, and both are logged.

**Reading the primary found something, as usual.** Two wordings of the Stimpunks mission sit on the same page — the statement block says the foundation builds tools that *support* people to live with dignity, challenge dehumanizing systems and design environments that honor difference as strength; the Mission Compass further down says *enables* people to live with dignity and stops. We quoted the longer, and the ledger records the discrepancy, because a reader who checks will find both and an unrecorded discrepancy is how a ledger loses its value.

**Their capitalisation and their spelling are kept.** House style capitalises Autistic and Disabled and spells *honour*; the quotation does neither. A quotation is not the place to apply house style, and this is the site that says so.

**And one of their sentences turned out to be about Sheet No. 4.** Stimpunks’ mission says “We enable the weird, feral, chaotic, and magical people.” [Sheet No. 4](https://queering.earth/invention-of-normal) is the history of that word being demoted from *wyrd*, meaning fate, to a name for people who do not fit. The sheet was not written to illustrate the mission; the collision was found by reading the mission properly, which is the argument for reading primaries in one sentence.

CabinetThe Markdown converter now honours a list’s start attribute, because thirteen aims in four groups renumbered themselves four times

The aims run as one sequence across four group headings, which is four `ol` elements with `start` on three of them. The converter ignored the attribute, so the page said thirteen aims numbered 1 to 13 and `/mission.md` said 1–3, 1–5, 1–3, 1–2. **A converter that silently drops an attribute is the same drift as one that silently drops a tag**, which is the rule that already makes it throw on an unknown element — it arrived by the other door. It now reads `start` and throws if it is not a number.

Two components were added for the page and both are the **bare** tier: the one-sentence statement, and the aims list. The statement is *not* a blockquote — nothing is being quoted, it is the site speaking, and marking our own words as a quotation is the mistake most of these rules exist to avoid. The aims use native `ol` numbering rather than a counter on a pseudo-element, so a screen reader announces the position, and **no colour goes on the marker**: a `::marker` is invisible to the contrast gate, which is exactly how this register’s own entry bullets once sat at 2.15:1 unreported.

2026 · 9 September

## An eighth gate, ported the same day the failure it catches happened twice — and its first honest run found fifteen more

The house rule is to port a Star Stuff check when the failure it catches becomes *possible* here. `check-card-order.mjs` did not clear that bar; it cleared a higher one. The plate shipped out of sequence, a sibling nav shipped out of sequence, and **all seven existing gates passed both** — correctly, because order is not colour, position, freshness, routing, structure, headers or the manifest, and a grid in the wrong order looks exactly like a grid in the right one.

CabinetThe upstream tool would have certified the exact plate that prompted it, and finding that out was most of the port

**Star Stuff checks ascending order *within each series***, because one of its collections interleaves Zine and Field Guide numbers on purpose and a single merged sequence would fail a page for doing what it means to do. **This site has no series.** There is one accession run and the kind chip is a label on it — No. 1 a Reading, No. 2 an Essay, No. 8 a Wall — and they ascend together.

**Ported unchanged, that split would have been worse than no gate.** No. 8 is a Wall and No. 7 is a Reading, so `1, 2, 3, 4, 5, 6, 8, 7` is two perfectly ascending series. **Proved rather than reasoned about:** the broken plate was put back, the series split was patched into the tool, and it reported `ok · 0 problem(s)` on it. Then the split came out and the same plate reported `No. 7 follows No. 8`. A port is a rewrite when the thing being ported encodes an assumption the new site does not share.

**Every rule was made to fail before it was believed.** Rule 1 on the restored plate; rule 2 by dropping a card outside every grid; the empty-authority guard by breaking the card selector on the plate and watching it report NOT MEASURED rather than clean — the overlap gate’s empty-pass lesson arriving in a second tool. **And `--check` both ways**, because that flag has now been load-bearing and missing twice in this repo: exit 1 with it, exit 0 without.

Label correctedFifteen cards called a sheet something the plate does not call it, including an essay filed as a reading

A sheet’s number and kind are written out once on every page that cards it — ten copies of one fact, which is the drift this site names in every rule it has. So the gate got a third rule: **every card must agree with the plate about the sheet it points at.** Rule 1 is only as good as the numbers it sorts, and a grid ordered by a wrong number ascends perfectly.

**It found two mislabels and thirteen drifts on its first run.** `/404` called [Sheet No. 2](https://queering.earth/coming-to-terms) a “Reading” — it is Ryan’s own essay, and the plate says Essay — and called [Sheet No. 8](https://queering.earth/monotropa-uniflora) a “Reading” where the plate says Wall. Separately, the No. 8 accession wrote its kind chips with articles, “A wall” on seven pages and “A reading” and “An essay” throughout its own sibling nav, against bare nouns on the fifty cards that came before. All fifteen now say what the plate says.

**The plate is the authority, not the majority.** A vote among sibling navs would have let “A wall”, copied onto seven pages, outrank the one page whose subject is what this cabinet holds.

**And where the plate is silent, the copies must still agree with each other.** The plate does not card itself, so nothing could arbitrate `/` being a “Plate” on one nav and “The plate” on another; that is reported apart, once per address rather than once per page, because printing it twice invites somebody to fix whichever file they read first. No other kind chip here carries an article, so it is “Plate”.

CabinetWhat it refuses to check, and the one that looks most like an omission

**It does not check the plate against `tools/pages.mjs`.** They agree today and the temptation is obvious, but they are two different facts: the number records *when a sheet was accessioned* and `pages.mjs` records *the order a reader should meet the pages*. Mount Sheet No. 9 and decide it reads best third, and the two diverge legitimately. Coupling them would turn an editorial decision into a build failure.

It also declines to order the unnumbered cards — there is no mechanical answer to where the colophon belongs relative to the register — and it says so in the summary rather than quietly leaving six cards out of the denominator.

2026 · 9 September

## The plate said seven and carried eight, and two of them were in the wrong order — on the one page whose job is to say what is here

Sheet No. 8 was mounted, carded and logged, and the sentence above the plate was left saying “Seven sheets, so far.” The card went in at the end of the list rather than in its place, so the plate ran 1–6, 8, 7. **Neither is a hard fact getting away from us; both are the register’s own bookkeeping getting away from us**, which on a site that publishes an accession register is the more embarrassing of the two.

Label correctedEight, and in order — the count above the plate and the sequence on it

**The count is a hand-written number beside a list that grows.** Every other statement of the same fact was already right: `/search` says “the eight sheets”, `/404` says “the eight sheets”, and `tools/pages.mjs` has held all eight in order since the sheet was mounted. One sentence in `index.html` disagreed with all three, and it is the sentence a first-time reader meets first.

**The order was an append.** A new card belongs where its number belongs, and this one was added after the last `li` instead. It is invisible in a review of the diff — the markup is valid, the card is correct, and the number is right on the card itself — and obvious the moment anybody reads the plate downward.

Label correctedThe same fault, found by looking for it: one sibling nav ran 4, 1, 2, 3

Having found the plate out of sequence, the obvious question was whether anything else was, so all fourteen pages were counted rather than the one that had been reported. **[Sheet No. 5](https://queering.earth/the-tempest) listed its siblings 4, 1, 2, 3, 6, 7, 8.** Every other page was already ascending. The card is now in its place.

**This is the failure `check-card-order` exists to catch on Star Stuff, and this repo has not ported it.** The rule here is to port a gate when the failure it catches becomes possible; it has now happened twice in one afternoon, in two files, and neither instance broke a single one of the seven gates. The ordering truth is already written down and machine-readable — `tools/pages.mjs` — so the check has something to compare against. **Recorded here rather than quietly fixed**, because a correction that leaves the gate unbuilt is a correction waiting to be made again.

2026 · 9 September

## The four pages that are not specimens were only ever in the footer, which is where a site puts what it hopes nobody needs

The plate names eight readings and nothing else, so [how the site is made](https://queering.earth/design), [this register](https://queering.earth/changelog), [the finding aid](https://queering.earth/search) and [the privacy page](https://queering.earth/privacy) lived in the footer of every page and in no page’s content. **A site that publishes an attribution ledger and a privacy policy should not file both under fine print.** They now have a section of their own at the foot of the home page, under the name [the group already had](https://queering.earth/#the-cabinet-itself) in `tools/pages.mjs` — so the plate, the finding aid’s manifest and `/llms.txt` call this set the same thing rather than three things.

MountedA list with no cards, because a card would say these were readings and none of them is a reading of anything

**The bare tier, and that is the whole design.** Space only, no fill, no box — the surface this house reserves for the cabinet talking in its own voice. Fifteen components once shared one card treatment here and a reader could only rank them by reading the label; giving the furniture the plate’s clothes would be that defect deliberately reintroduced. The plate does the ranking, and this list agrees with it by declining to compete.

**Back matter, not front matter.** It sits last inside `main`, where the links it replaces already were. That is the correction the register paid for when a contents list at the top of this page delayed its first entry by three and a half screens: furniture at the top costs every reader, furniture at the foot costs none. The home page’s own content is a contents list already.

**A description list, because each entry is a name and a gloss on it.** The Markdown converter writes a term and its definition, so the copy an agent fetches at `/index.md` keeps the pairing instead of flattening into loose lines. It is inside `main` rather than beside the sibling nav for the reason the contents list may be: a list of the site’s own pages on the site’s own index page cannot be one sheet’s navigation indexed as another sheet’s content.

CabinetThe target is the line and not the letters, which is the rule the ground control shipped one pixel over

A `dt` that is entirely a link is not an inline link inside a sentence, so WCAG 2.5.8’s inline exception does not cover it — and the ink alone is 23px tall. Padding takes each target to **45px**, which is 2.5.5’s figure rather than the 24px floor. It grows into the gap above the description instead of pushing the entries apart, so the list did not get taller to get reachable, and the next target starts a whole description later, so no two can touch. **Measured afterwards**, because nothing in the seven gates measures a hit area and a number nobody checked is a number.

**The padding is also spacing, so the scale is taken net of it.** 0.7rem inside an entry and a full `--qe-space-3` between two — two to one, which groups the pairs by eye with no rule drawn anywhere. Left uncompensated the list would have started 11px below where every other block on the page starts, and an unauthored deviation makes the authored ones mean less.

**The home page’s footer lost the four links and no other page did.** On this page they are two paragraphs above; everywhere else the footer is still the way there. One page, one list of the same four things.

2026 · 9 September

## A site that had spent a day removing its only third-party request mounted a YouTube player, and the whole of the work was making that honest

Ryan and Helen listen to Eliot read *The Waste Land* together, and a site about reading things closely is a strange place to make somebody leave in order to hear one. So there is now a recording under the lilac. **It cost a sentence this site had been proud of.** `/privacy` said, of the Google fonts removed that morning, “It was the only one.” That is no longer true, and the honest replacement is not a smaller boast but a more precise claim: *reading* a page makes no third-party request, and there is exactly one place where you can choose to make one.

MountedA facade, not an embed: the served page holds a drawing and a link, and nothing reaches Google until somebody presses play

**Measured rather than asserted.** On load, the set of non-local hosts the page contacts is `\[\]` — empty. After the press it is exactly one, `www.youtube-nocookie.com`, which is the host `/privacy` names. Both figures came out of a headless run reading `performance.getEntriesByType('resource')`, not out of a reading of the source.

**The poster is drawn, not fetched.** YouTube’s own thumbnail would have been a request to `i.ytimg.com` on every page load, before anybody pressed anything — which is exactly the Google-fonts failure this site had just spent a day removing, wearing a different hat. It is a scatter of the same lilac florets as the bush above it.

**Without JavaScript the control is an ordinary link** to the video, and pressing it goes to YouTube. With the script it stops navigating and swaps the player in place. Both are a request the reader chose, which is the same footing as every other outbound link here — and that link is also what survives into the Markdown copy, so an agent reading `/index.md` gets the address rather than a hole where a player was.

**A third script, for the reason there was a second one.** `queering.js` may never put content on a page; this script’s entire job is to put somebody else’s content on one. Widening that boundary to fit would have cost the boundary. It creates no words either — even the player’s accessible name is read from `data-embed-title` in the markup rather than written in the script.

CabinetThe gate now reads our JavaScript, because section 7 looked only at markup and a script is where a third party would actually appear

`check-metadata.mjs` has enforced “no page may fetch from another origin” since the fonts came home, and it did it by scanning HTML attributes. **That check would have reported this page perfectly clean.** The request lives in a script, and a gate that cannot see the place the failure would occur is a gate that certifies the failure. Three assertions were added, and each was **made to fail before being believed**:

**Every third-party origin our own scripts mention must be named on `/privacy`.** Not forbidden — named. Proved by renaming the host on the privacy page and watching the run go red. It found a real fault on its first honest run, too: the script contacts `www.youtube-nocookie.com` and the policy named the bare domain, so the policy was one subdomain away from being wrong about its own site.

**A facade must stay a facade.** An element carrying `data-embed-id` must have a plain link to the same video beside it — that link is the no-script path and the reason the request counts as chosen — and the served page must contain no `iframe` at all. Proved by deleting the link, and again by adding an iframe. The second turns out to fail *twice*: the Markdown converter throws on the unknown tag before the new check is even reached, which is the converter’s “teach me or I will drop content” rule catching a privacy regression by accident.

**The contrast gate caught the other one.** The player’s subtitle was `--qe-moss` on `--qe-paper-deep`: **6.9:1**, clearing WCAG AA and missing the house 7:1 by a tenth. That is the same surface this site already removed a recessed panel over, and it is the third time `--qe-paper-deep` has done this. The line is `--qe-ink` now, and the hierarchy is carried by size and weight, which is what should have carried it in the first place.

Label correctedFive statements on the privacy page stopped being true on the same afternoon, and all five were corrected in the change that broke them

The absolute claim appeared in the lede, in the deliberately-not-here list, in the JSON-LD description and in three social descriptions. **A privacy policy is a binding statement of practice**, so a change that makes one false and fixes it next week has published a false one for a week. All of them moved in the same commit, and the page gained [a section of its own](https://queering.earth/privacy#the-embed) describing what pressing play actually costs.

**What that section refuses to say is the part worth noting.** `youtube-nocookie.com` is Google’s privacy-enhanced player domain and it does not set advertising cookies on load. It is *not* anonymous: the IP address still reaches Google. “No cookies” and “no tracking” are different claims, and describing the first as the second is the sort of comfortable imprecision this page exists to avoid. It says so in those words.

This is the second time the finding aid’s lesson has been applied — a page that binds us is a page to re-check against the code every time the code grows a capability — and the first time the *gate* was extended rather than just the prose. A claim only a human remembers is a claim that will eventually be false.

2026 · 9 September

## A lilac bush from Ryan’s own yard, standing above the footer, and the song under it belongs to a man almost nobody names

Drawn from a photograph of the shrubs in Ryan’s garden, and mounted because the site had just borrowed a colour and had nothing of the actual plant in it. It closes the home page the way a plate closes a chapter. Ezra Furman, whose song gave the site those two colours, has said what they are for: “So I wrote this theme song for us, and gave us some gang colors: lilac and black.” Us, there, is trans women, and the statement around that sentence is about being ready to defend one another’s lives. [Furman, in *Clash*](https://www.clashmusic.com/news/ezra-furmans-lilac-and-black-is-a-trans-rallying-cry/). The flower on this page is not a decoration borrowed from a song; it is the plant the colours were named after, growing in somebody’s yard.

MountedThe vase habit is the whole read, and two drafts got it wrong in the same way

**A lilac is many slender woody stems from one clump at ground level**, bare for the lower third, fanning into a dome half again as tall as they are. Both of the first two drafts put the bare stems at more than half the height and produced a *hand fan* — a shape that is unmistakably not a shrub, and unmistakably not this shrub. The proportion was eventually measured off the photograph rather than guessed.

**The dome’s underside arches**, low on the flanks and high in the middle, so the bare stems show through the centre exactly as they do in the photograph. One function in the markup defines that arch, and both the trunk tips and the flower placement obey it — two copies of that curve would drift, and the drift would be a bush whose trunks stop in mid-air.

**Placement of the flowers went through three schemes.** Rings left the middle hollow and read as a wreath. Uniform random sampling clumped into two lobes with a hole between them, which is what forty random points actually look like and why nobody should reach for random when they mean *even*. Staggered rows inside the ellipse give even coverage by construction, and that is the version here.

**A panicle is a mass, not a chain.** A lilac thyrse is a dense cone of hundreds of tiny four-lobed florets; the first attempt strung eleven large puffs along an axis and read as a bunch of grapes. It is drawn now as a triangular scatter stippled between the three lilacs, with a few four-lobed florets laid over it for texture. Drawing every real floret would be thousands of elements for a shape a reader sees as one thing.

CabinetEighty-five kilobytes of markup, nine over the wire — and the trick that would have shrunk it breaks the styling silently

The drawing is about seven hundred circles. Raw, it is **85KB**; compressed, which is how every response here is actually served, it is **nine**, because markup this repetitive is very nearly free to a compressor. The home page went from 43KB to 143KB raw and from about 7KB to **22KB** over the wire. Measured before it shipped rather than assumed either way.

**The obvious optimisation was tried and reverted.** Defining the leaf and the floret once and referencing them cut 20KB raw — and rendered every cloned leaf and floret in *black*. Outer stylesheet selectors do not cross into a `use` shadow tree; only inherited properties do, so `.leaf` and `.floret` simply stopped matching while the definitions themselves still looked perfectly correct. That is a fraction of a kilobyte compressed in exchange for a styling path that fails silently, and the comment in `queering.css` now says so, because the next person to look at seven hundred circles will have the same idea.

**A class with no rule renders black, and nothing here catches that.** An earlier pass had the generator emitting `puff-pale` while the stylesheet only knew `puff` and `puff-deep`: a third of every flower cluster came out in solid black, and it was found by looking. Star Stuff’s `check-classes` is the gate for exactly this, and it is the strongest candidate for the next port — the failure it catches is now known to be possible here, which is this repository’s stated bar.

**In print the mass becomes an engraving.** Every floret prints as an open circle in line, and the tone comes from how densely they overlap rather than from ink coverage — which keeps the design sheet’s claim that these drawings print as line work true, and looks better than the three flat greys the screen fills would have made. Checked under print emulation, where a second fault turned up: the print block sat *above* the base rule at equal specificity, so the caption printed moss-green. Source order decided it, and the print block now comes last.

MountedHelen hears Eliot the instant anybody says lilac, so the plate got the four lines that come with the flower

“April is the cruellest month, breeding / Lilacs out of the dead land” — the opening of *The Waste Land*, and Helen’s immediate association with the word. It is a useful one to have standing over this drawing, because it files the flower on the *cruel* side of the season: lilacs as what the dead land produces, memory and desire stirred up together, spring as an imposition rather than a mercy. A page that has just spent a paragraph on gang colours and one on a torch song is well served by a third reading that refuses to be consoling.

**1922, so it is public domain in the United States**, and four lines can be mounted whole rather than trimmed — which matters on a site whose stated risk is the tightened quotation. The wording was checked against [Project Gutenberg’s transcription](https://www.gutenberg.org/ebooks/1321) of the 1922 text rather than taken from memory; [the Poetry Foundation’s copy](https://www.poetryfoundation.org/poems/47311/the-waste-land), which is what the citation links, refuses automated requests. “Cruellest” keeps its British spelling, as the house rule requires inside a quotation.

Label correctedLilac Wine is James Shelton’s, and the caption says so before it names either singer

The song reached this site the way it reaches most people — through [Nina Simone](https://en.wikipedia.org/wiki/Wild_Is_the_Wind_(Nina_Simone_album)) and [Jeff Buckley](https://en.wikipedia.org/wiki/Grace_(Jeff_Buckley_album)). It is neither of theirs. **James Shelton wrote words and music in 1950**, for a Broadway revue called *Dance Me a Song* that ran a few weeks, where Hope Foye introduced it. Eartha Kitt recorded it in 1953, thirteen years before Simone and forty-one before Buckley.

**This is the site’s characteristic failure in its most ordinary form** — not an invented source, an *absorbed* one. A cover so much better known than its original that the original stops being mentioned is the same motion as a definition trimmed to fit a masthead: the work survives, the maker falls off it. So the caption names Shelton first and calls Simone and Buckley readings, which is what they are, and is also the argument this whole site is built on. One song, read three ways.

2026 · 9 September

## A moth with the Earth where its body should be, in somebody else’s two colours, and the hardest part was stopping the middle of it from looking like a brain

Ryan’s, and it is two borrowings at once. The cover of Nick Walker’s *Neuroqueer Heresies* sets a human brain where a swallowtail’s body would be; Ezra Furman’s *Lilac and Black* supplies the palette and the line the palette comes wrapped in — “We wear the lilac and black”. Put the Earth where the brain was and you have this site’s name as a drawing. Both debts are stated in the figure’s own caption, which is the only version of this that is defensible here.

MountedThe drawing is at the foot of a section rather than at the top of a page, which is the first time anything here has been

Every other drawing on this site sits above the prose as a masthead, or in a corner as a vine. This one closes [Queering is a verb](https://queering.earth/#queering-is-a-verb), because that is the section it is an argument about: Walker’s coinage, our extension of it, and a picture that performs the extension rather than restating it. The header spray at the top of the home page is untouched — it was never the thing to replace.

**The surface is bare.** Space only, no fill, no box: it is our own drawing with our own caption under it, which is the default tier and not an object mounted from elsewhere. The one dark-ground version drafted for review was refused for that reason as much as any other — a black card on a vellum sheet is a fourth surface, and the three-surface rule exists so that a reader can rank a panel without reading its label.

**It wears `.qe-botanical` as well as `.qe-moth`, and that is deliberate.** The growth motion, the stroke-drawn stems and the unfurling sprouts are all written once; only the fills are new. A second copy of that idiom is a second thing to keep in step with `prefers-reduced-motion`, and the reduced state has to be the finished drawing in both.

CabinetTwo new decorative tokens, because a wash and the thing washed onto it cannot be one value

`--qe-lilac` takes the forewing, `--qe-lilac-pale` the hindwing and the sea of the globe, and both have `--qe-cab-\*` counterparts aliased through both ground switches. The decorative five is a decorative seven now, and the sentence on [the palette sheet](https://queering.earth/design#palette) that counted them has been recounted — a number in prose that nothing checks is a number that goes stale silently, and this one had been true since the site shipped.

**The pale one goes *darker* in the drawer, not lighter.** That is the gating-surface inversion arriving in a component with no text in it: in daylight the wash is the recessed thing under the wing, and lifting it in the cabinet would have it out-shouting the ink line. Neither token is for text in either ground, so 7:1 does not apply — there is not a letter anywhere in the drawing.

**Black is `--qe-ink`, so the black inverts.** In daylight the outline and the continents are near-black on vellum; in the drawer they are cream. The song says lilac and black and the drawer says otherwise, and the drawer wins, because the alternative is a literal black line on dark brown that nobody can see. The one version that would have kept the black in both grounds was the black card, and it lost on the surface rule above.

The print sheet flattens the wings to line work like every other drawing here, with one exception written into the rule: **the continents keep their fill.** Flatten those along with the wings and the globe stops being the Earth and becomes a ruled circle.

CabinetThe coastlines are projected rather than drawn, because three passes of hand-drawn continents kept reading as a brain

**This is the funniest available failure and the least acceptable one.** The drawing quotes a book cover that has a brain in the middle of it. Hand-drawn continents — three separate attempts at them — came out as a pair of symmetrical dark blobs either side of a central meridian, which is a Rorschach card, which is to say: a brain. A picture whose whole point is that the Earth is where the brain was cannot have a middle that reads as the thing it replaced.

So the coastlines are coarse lat/lon outlines put through an orthographic projection centred on 25° west and 12° north — the Atlantic view, the only one where the Americas and Africa are both legible. Points on the far side are pushed out onto the limb rather than folded back across the disc, which is what a continent going round the edge actually looks like. **The foreshortening is Earth’s and not ours**, and Africa is unmistakable at a forty-pixel radius, which is the size that matters.

**It has no tails, after four attempts at them.** Hanging straight down they read as legs; swept outward, as a bracket; curled inward, as a moustache; integrated into the hindwing path, as a boot. What actually says *moth* is a broad fanned hindwing and a feathered antenna, both of which it has. The cover’s tails say *swallowtail*, which we are not, and the caption carries that reference instead of the drawing pretending to.

One thing the review process itself taught: **the first four screenshots showed no wings at all.** Every wing is inside a `.sprout`, which starts at `opacity: 0` and unfurls on a delay, so a screenshot taken half a second after load is a photograph of an animation that has not happened. The growth gating is correct and the reviewer was wrong; noting it because the next person to check a drawing here will hit the same thing.

2026 · 9 September

## A real herbarium stamps its sheets with an accession number that is a row in a ledger, which is the whole reason this one could have it and most of the work was proving the ink was legal

Prompted by Ryan noticing the oval stamp on a scanned sheet from the Ada Hayden Herbarium at Iowa State University — the institution’s name around the ring, its parent below, and **497892** across the middle. The suggestion was that a faded one would add to the sense of age, and it does. What it cost was a measurement, because *faded* and **7:1** are the same argument from opposite ends.

MountedEvery sheet is stamped, and the fade is on the ring because no colour here can make a letter faint and legal

**The faded look was measured before anything was drawn, and every candidate failed.** `--qe-lichen` is **2.15:1** on paper — the exact figure this repository already uses as the injected value that a contrast run must report as `FAIL`, and the same one the register’s entry bullets sat at unreported. `--qe-verdigris` is 3.42:1. Neither clears 7:1, and neither clears the 4.5:1 large-text floor either, so there is no size at which a pale green letter becomes permissible here.

So the letters are `--qe-moss` at 7.8:1 in daylight and 7.2:1 in the drawer, and **the age is carried entirely by the ring**: two ovals with a wedge lifted out of each, and a few degrees of rotation authored per sheet. That is this cabinet’s standing rule — the colour goes on the rule and never on the glyph — and it turns out to be what a real understamped impression looks like anyway. **The outline breaks long before the letterforms do.** Nothing was given up to get the ink legal.

**The number is real, which is the only reason there is a stamp at all.** Ada Hayden’s 497892 is a row in a ledger somebody can go and read. A six-digit number invented here to look convincing would be a gold join on a sheet nobody corrected — decoration asserting a fact — and it would be the worst possible place for that failure, on a site whose one stated correctness requirement is attribution. What is real here is the sheet’s number and the day it was mounted, both of them entries on this page.

**It says Queering Earth alone.** The obvious move was to name Stimpunks and More Realms the way the Iowa stamp names its parent institution, and two custodians do not fit the oval — at that size the lower line crossed its own ring. The layout is not the argument, though: a stamp asserts a single custodian, this site is a collaboration, and “Queering Earth” is the one name that is true of the whole of it. The two organisations are credited where credit is a sentence rather than a mark.

**No sheet named its own number anywhere inside its landmark before today.** Other sheets’ cards say it, from outside `main` where the mirror cannot see them, and this register says it constantly. So the stamp adds a fact rather than making a second copy of one, and there is no drift surface: it sits in one block with `.qe-provenance`, which states the same accession in words. The stamp is not a link, either. The provenance line beside it already points at the accession that put the sheet up, and a second tab stop landing on the same anchor a few millimetres away goes nowhere new.

CabinetThe washed-out effect is a blend mode, the blend mode erases the stamp in the drawer, and the contrast gate reported it clean

`mix-blend-mode: multiply` is what makes the mark look stamped rather than printed: the sheet’s own foxing comes up through the ink the way it does through a real impression. On the dark ground **it took a mark measuring 7.2:1 down to very nearly nothing** — multiply darkens towards the ground, and in the cabinet the ground is the dark thing. Caught by looking at it in the drawer.

**This is a blind spot in `check-contrast.mjs` and not an oversight in it.** The tool composites computed colour pairs, so it saw `--qe-moss` on `--qe-cab-paper` and reported the figure that pair measures. It has no concept of a blend mode, and it never will without becoming a screenshot differ. It joins the two exemptions already written down: a `::marker`, which is not an element with text of its own, and a texture, which varies luminance per pixel. **A pass is not permission, and this is the third way to earn a false one.**

The fix is a token rather than a second selector, because this is the fourth time that lesson has arrived. `--qe-stamp-blend` is `multiply` in `:root` and `normal` through both ground switches — the same shape the foxed-paper wash, the shadow a lifted sheet casts and the pale flesh of a specimen all ended up in, each of them a property that differs between the grounds and is not a colour. **Two selectors carrying one decision is two selectors that drift.**

**The mark is in flow, at the head of the provenance line, and the corner version was refused.** A stamp belongs in a corner of a real sheet, and an absolutely positioned one lands on the prose — at a narrow width, at 400% zoom, or under a long heading — which nothing in this repository can currently see happen. Star Stuff has `check-overlap` for exactly that, and the house rule is to port a check when the failure it catches becomes possible here. **Not floating the stamp is cheaper than porting the gate**, and the accession block reads better as one object regardless.

Label correctedThe stylesheet was cached for five minutes longer than the markup that needed it, and the first reader of the stamp saw the consequence

**The stamp shipped and Ryan could not see it.** The markup was live and correct, the stylesheet on the server was live and correct, and the browser had one of each from either side of the deploy: a paragraph of three unstyled spans where an oval should have been. A force reload fixed it, which is the signature. **Every page here revalidates on every visit; `queering.css` was cached for three hundred seconds.** For five minutes after any deploy, a returning reader got new markup with the old rules.

**The comment in `\_headers` predicted this exact event, in these words:** “a change that adds a class and its rule together would render unstyled for one visit.” It was a known, deliberate trade, and the entry in `DECISIONS.md` that made it is careful and mostly right — fingerprinting the assets really would churn twelve HTML files per stylesheet edit and cost this register the legible diffs it depends on. That refusal stands.

**What was missing was a third option rather than a better answer to the two.** The choice was posed as *fingerprint* against *bound the cache*, and nobody weighed giving the shared assets the same `max-age=0, must-revalidate` the HTML already has. It needs no generator, no rewritten pages and no gate, so it costs nothing the refusal was protecting; it closes the window to zero rather than to five minutes; and it is *more* bustable than three hundred seconds, which was the stated priority. The price is one conditional request per visit that returns `304` with an empty body, alongside the revalidation the page is already doing.

**The reason this is coherent and not merely tidy: they fail when the page fails.** No `stale-if-error` on the stylesheet — RFC 9111 forbids pairing it with `must-revalidate`, and it would buy nothing anyway, because the HTML fails closed and an unreachable origin leaves no document for a held-back stylesheet to apply itself to.

**`search-index.json` had the same defect and needed the opposite directive.** It was ten minutes, and it is derived from the sheets — so it is exactly the case the old note's own rule excluded: staleness where the stale copy can disagree with the fresh HTML. After a prose edit it could hand a searcher a snippet quoting a sentence that is no longer on the page it cites, and on this site that is the worst available failure. It is `max-age=0` now **without** `must-revalidate`, which is deliberate: zero removes the skew, and omitting the stricter directive is what keeps `stale-if-error` legal. The index is fetched *after* the page has rendered, by a reader who has typed something, so the document exists either way and a finding aid a few minutes behind is better than one that fails closed. That judgement was in the original note and it survives.

CabinetA seventh gate, ported because a design was refused for want of it — and it measures paper, which the tool it came from does not

**The stamp belongs in the corner of a real sheet and it is not in the corner of these.** An absolutely positioned mark lands on the prose at a narrow width, at 400% zoom, or under a long heading, and nothing here could see that happen. Star Stuff has `check-overlap.mjs` for exactly it, and the house rule is to port a check when its failure becomes possible. **Refusing a design for want of a gate is a reason to build the gate**, so it is ported — and the first thing it did was catch the refused design: seven collisions on [Sheet No. 2](https://queering.earth/coming-to-terms), with the stamp’s own “Sheet No. 2” sitting on the masthead’s “Queering Earth”.

**It is not a copy.** The reveal step and the browser client were lifted out of `check-contrast.mjs` into two shared files rather than duplicated. The reveal step is the one that mattered: it is the list of things a page builds at runtime, it is editorial, it grows, and its own comment tells the next author to add to it — so two copies would be a component one gate learns and the other does not, which is the failure the shared entity table already exists to prevent. Both extractions were proved to change nothing: the contrast gate printed a byte-identical report before and after.

**Two faults in the imported tool turned up on the way, and both are now fixed here.** Its clip check walked upwards from an element’s *parent*, so an element clipping its *own* overflowing text was never treated as the thing doing the clipping. And the function that says *where* a collision is reported “page” for absolutely positioned blocks — the precise case the gate exists to catch, given no address. Both are recorded in `DECISIONS.md`, because Star Stuff is not edited from a session in this repository.

**Two of its four findings cannot fire here, and that is a house rule showing up somewhere nobody expected.** There is not one rendered `text` element in any page on this site: the botanical art is 535 paths, 381 groups and 160 ellipses and circles, named to a screen reader by `aria-label`. That is *never an image of text*, and it means the two faults that motivated this tool upstream — a drawing’s label on another label, and a label on the prose — have no instance to find. They are kept anyway: dropping them would stop the sweep *measuring* SVG text, and the day a sheet carries a label the gate would report a clean page it never looked at. They were proved by injecting labels, and the file says so rather than letting them pass for tested.

**An exemption was removed for exempting nothing.** The skip link went on the ignore list on the strength of the upstream note, where its equivalent fires on five of seven pages. Tested here, the list is empty and the count is still zero, because this site’s skip link has no clipping ancestor to be outside of. An exemption that exempts nothing is a named hole a real fault can fall into, and worse, it reads as evidence that somebody checked.

**It measures paper too, which the tool it came from does not.** Star Stuff hands print collisions to a paper gate; this repository has none, and paper is the medium this house has already been burned by — forty-four of forty-six pages once printed blank. Three passes now: the screen, then US Letter and A4 at the width a sheet actually leaves for content.

**The viewport moves, and that is the whole reason the pass is worth having.** The contrast gate emulates print media at desktop width and is right to, because it measures colour and colour does not reflow. A collision is a *position*. In print this stylesheet lets `main` run the full width of the sheet, so measuring paper at desktop width measures a line length no printer produces. The counts say it plainly: this page is 4,884 pieces of text on screen, 3,567 on Letter, 3,604 on A4. **Both papers, because those last two numbers differ** — twenty-two pixels is enough to rewrap a line and move a hand-placed mark, so picking one and calling it “print” would be this pass’s own mistake at a smaller scale.

**And the guard against measuring nothing is per pass, which turns out to catch the original disaster.** A stylesheet that renders nothing on paper measures zero there while measuring hundreds on screen — and the run reports the page as *not measured*, naming which passes came back blank, rather than reporting it clean. **Forty-four pages printing blank would not survive this gate.** That was not why the guard was written, which is the pleasant kind of accident.

**Pagination is the honest limit.** Print emulation reflows to the width but does not break a document into sheets, so a collision that exists only because two blocks land either side of a page break is still invisible. `break-inside: avoid` on the accession block is there because pagination is real. Reaching it means pulling text positions out of a generated PDF, which is a different tool and not a flag on this one.

CabinetA sixth gate, because a comment in a config file predicted this failure and a comment cannot fail a build

**The five existing gates were all green while the stamp rendered as three unstyled spans.** Correctly green: `check-markup` reads tags, `check-sitemap` reads the manifest, `check-contrast` composites colours, `check-metadata` regenerates the derived layer, and `check-addresses` — the one that already probes the edge — asks about redirects. **A cache policy is invisible to every one of them.** So is a blend mode, which is the other thing that went wrong today; that one has no mechanical answer and is written down instead.

`tools/check-cache.mjs` asks one question: **can a reader be served new markup with an old asset?** Four checks offline — an asset outliving the pages that fetch it, an asset nobody has ruled on, `must-revalidate` paired with a `stale-` directive that RFC 9111 makes it cancel, and a rule left behind by a rename — and with `--live` it asks the site, which is the only thing that actually knows.

**It does not flatten everything to zero, and a version that did would have been switched off within a week.** The rule is the one this register already stated: staleness is safe only where the stale copy cannot disagree with the fresh HTML. A stylesheet knows the class names and can disagree. A derived index can disagree with the page it cites. *A font cannot* — it has no knowledge of structure, and a year of caching on the faces is correct. So the plates keep their thirty days and the faces their year.

**Which assets are coupled is declared and never inferred**, for the reason an entry’s `data-sheet` is declared: the inference is available, plausible and wrong. Nothing in a file’s bytes or its extension says whether its content knows about markup — `queering.js` and `fonts/newsreader-latin.woff2` are both static files fetched by every page, and only one of them can contradict a class that shipped this morning. Two lists, each entry carrying its reason, and the gate fails on an asset in neither.

**It reads our own scripts, because an HTML scan would have missed the file that prompted it.** `search-index.json` is reached by a `fetch` inside `queering-search.js` and appears in no attribute on any page. Proved rather than assumed: with the index put back to ten minutes the gate names it, and that finding is reachable only through the script.

**All five detectors were made to fail before the gate was believed**, and the first attempt at proving the main one was a false pass — the edit meant to loosen the stylesheet had loosened the catch-all rule with it, so the pages moved too and there was genuinely no skew. The test was wrong, not the gate, and a gate whose green run has never been earned is worth nothing. Two findings were then regrouped: one wrong line covering sixty-five plates reported sixty-five times, and one wrong stylesheet policy reported once per page. **A defect described fourteen times hides the next one.**

CabinetThe finding aid does not index the stamp, which is the masthead decision arriving one component further down

Indexed, eight stamps put eight near-identical records **carrying the site’s own name** into the aid — “Queering Earth Sheet No. 4 Accessioned 8 Sep 2026” — which is most of what a search for “Queering Earth” would then return. That is precisely why `.qe-masthead` is already skipped, and the reasoning transfers without amendment.

**Nothing becomes unfindable.** The provenance line beside each stamp says “Mounted 8 September 2026” in ordinary prose and is indexed; every sheet number is written out across this register’s own entries. A stamp is the sheet restating its accession in the object’s own form, not a new fact to find. It stays in the Markdown sibling, where there is no ranking for it to crowd — an agent reading `/on-being-ill.md` gets the transcription the way a herbarium record would carry it.

2026 · 9 September

## A cabinet made almost entirely of other people’s sentences grew a search field, which is a machine for trimming other people’s sentences, and most of the work was teaching it when to refuse

**A conventional search snippet is this site’s characteristic failure, industrialised.** Twenty words either side of the match, an ellipsis at each end, no maker and no citation — pointed at a page of prose that is a perfectly good convention, and pointed at eighty-two mounted quotations it manufactures exactly the artefact `ATTRIBUTIONS.md` exists to prevent, once per result. The whole feature is built around refusing to do that, and everything below follows from it.

MountedA finding aid that will show you a whole quotation or none of it

**Quoted text is indexed apart from ours, and the two are treated differently on purpose.** A `blockquote` becomes one record carrying its `cite` and its caption, and a result that matches inside one renders the quotation entire with its maker attached — never a window onto it. Our own commentary *is* cropped, because it is ours and the rest of it is one click away. Where one of our sentences has a short quotation set inside it, the crop widens rather than cut in: the generator records the character range of all 190 of them, and the window grows until nothing is half-covered.

**Those ranges are proved rather than trusted, and the first version of them was wrong.** Offsets were recorded while the prose was being built and the prose was tidied afterwards, so every fence sat between four and fifteen characters downstream of the quotation it was supposed to protect — a guard reporting success while pointing at the wrong words, which is worse than no guard. The prose is now canonical as it is written and nothing may rewrite it later, and the generator slices the finished text at each recorded offset and throws unless it gets back exactly the characters it wrote. That check was made to fail before it was believed: offsets nudged by three characters, `changelog.html` reported by name, exit code 1.

**The register is filed second, and the register is why.** At 25,359 words it is more than a quarter of the site, so ranked flat it would bury the sheets on any search naming a writer. Its entries come under their own heading below the sheets, wearing the kind chip they already wear. The same page’s own finding — that an accession headline is a sentence by design and averages 148 characters — is why the new sheet points at the register rather than reprinting its eighteen headlines.

**An attribution we have retracted is not searchable.** Plain text has no vocabulary for *this is the reading we got wrong*, so an indexed `del` would surface a corrected attribution as though it were the live one — the same flattening that keeps `del` and `ins` as HTML in the Markdown siblings. Checked rather than assumed: the site’s one struck attribution is “PROSPERO”, and [the Miranda sheet](https://queering.earth/the-tempest) says Prospero thirteen times in prose besides, so nothing became unfindable. The correction itself is findable here, in ordinary words, which is where it should be read.

**The sheet carries the whole cabinet as ordinary HTML**, page by page and section by section, generated into it between two markers the way the typefaces are written into the stylesheet. That is what a reader without JavaScript gets, and what the mirror indexes: [the finding aid](https://queering.earth/search) is the site’s one client-rendered page, and a landmark holding an empty results div would have said nothing to either. Nobody types that list, so no heading in it can drift from the heading it names.

CabinetThe finding aid was nine thousand words down, and the control that fixes that is a drawing of a pocket lens

**Search shipped reachable only from the footer**, which on [Sheet No. 6](https://queering.earth/wild-nights) is nine thousand words below the fold — and most arrivals here are not by way of the plate. A shared link or a search result drops a reader straight onto a sheet. So it sits in the control cluster at the top of all fourteen pages now, which is also where it belongs by argument rather than by convenience: **Search, Cabinet and Plain view are three ways of looking**, and that cluster is the instrument tray. It is outside the landmark, so nothing about it reaches the Markdown, the search index or the mirror — verified by regenerating and getting zero changed files.

**The first proposal was to hide it in the header illustration**, as a magnifier resting on a flower, and it was measured rather than argued about. An `a` inside SVG is a real link and is keyboard-focusable — that part works. On a 375px phone the masthead art renders at 335px for a 470-unit viewBox, so **one viewBox unit is 0.713 css pixels**: a flower is drawn at 29 units and lands at 21px, and a link wrapped round one measured **12×12**. Reaching 44px would need a 62-unit invisible disc — larger than the biggest element in the whole drawing and 37% of its height, swallowing the blooms either side. Two further faults would have followed: the stems are `fill: none` and so are not hit-tested at all, and a keyboard user would land on an unlabelled shape in the middle of a picture, which is the same objection this cabinet already makes to hover-gated section marks.

**The loupe survived the argument, at a size where it can be seen.** A botanist’s folding pocket lens, drawn at 22px beside the word. Sixteen candidates were rendered between 16 and 90px and looked at, which is the lesson `favicon.svg` already paid for twice, and the drawing was wrong twice before it was right — both times in a way only looking could catch.

**Below about 20px two overlapping outlines go muddy**, so each part is filled with the paper and occludes what is behind it rather than crossing it. That fixed the mud and left a worse fault, which **Ryan spotted and the person drawing it had not**: “the two parts don’t look hinged together.” They were a teardrop case with a plain ring beside it and nothing reaching up to the rivet — two shapes that happened to touch. **Both parts are teardrops with their apex at the pin now**, rotated apart about that single point, which is what the object actually does. The last correction was that two equal lobes read as a wishbone rather than an instrument: the case is the fatter of the two and the lens ring smaller, as they are in the hand. **The word carries the meaning regardless**, so the drawing only has to be handsome and unmistakably a thing a botanist would have in a pocket.

**And the ground control was 53×25.** Found while measuring the other thing. WCAG 2.5.5 asks 44×44 and 2.5.8 asks 24×24, both of the *interactive* area rather than the visible mark — so it was one pixel over the floor and far under the number this site holds itself to on contrast everywhere else. Enlarging the ink would have made the quieter control loud, which its own note in the stylesheet asks not to happen, so the hit area is grown behind all three instead. Measured after: Search 72×44, Cabinet 53×44, Plain view 102×44, no two overlapping, each receiving its own tap, and the skip link still winning on top where it crosses them.

Label correctedThe privacy policy said there was nowhere on this site to type anything, and then there was

[The policy](https://queering.earth/privacy) is a binding statement of practice, which is why `check-metadata.mjs` enforces the third-party claim in it rather than trusting anybody’s memory. It also carried a sentence no gate can see: “There is nowhere on this site to type anything, so there is nothing you could submit.” True when it was written on 9 September and false a few hours later, in the same afternoon, by us.

**So the field was designed around the sentence rather than the sentence rewritten around the field.** The searching happens in the reader’s browser against a file it has already fetched from this domain; there is no search server and no third party, and the policy now has a section of its own saying so. Nothing is remembered between visits, and the two view preferences remain the only two things this site stores.

**The query is in the fragment, not a query string, and that is the part worth keeping.** The ordinary way to make a search shareable is `?q=` — which a browser sends, so every term anybody typed would land in the hosting log the policy describes two sections earlier. On a site about queerness, illness and naming yourself, that log would be the most revealing thing here by a wide margin. Browsers never send the part after the `#`, so `/search#q=lavender` is shareable, bookmarkable, and reaches nobody. The form is also hidden until its script runs, because a form without its script would submit to this address *with* a query string and undo the whole decision.

CabinetThe gold stayed on the mend, and the mark that says “found” went onto a rule

The first draft highlighted a match the way everything highlights a match: a wash of marigold behind the word. **It failed twice, and each failure is one of this cabinet’s own rules arriving in a new component.**

**It failed the drawer, by measurement.** Marigold at 0.30 over `--qe-paper` composites to 11.2:1 against the ink and passes comfortably. The same wash over `--qe-cab-paper` composites to 6.94:1, and every alpha above it is worse — because lightening a dark ground moves it *towards* light ink. That is the gating-surface inversion the stylesheet already warns about for cards, met again from the other side. No alpha of marigold clears 7:1 in the cabinet.

**And it failed the seam rule, which is the one that mattered.** `--qe-marigold` is spent on mends: a re-determination, a restored attribution, the provenance line of a corrected sheet. A search hit is not a repair, and a gold mark on a page nobody corrected is decoration asserting a fact — the failure that makes the real mends unfindable. So the mark is a **rule under the word and nothing behind it**, in verdigris, which nothing else here has claimed. The colour goes on the rule and never on the glyph, and the ink keeps 14.3:1 and 12.8:1 untouched in both grounds with no compositing left to measure.

**The new capability is not in `queering.js`.** That file may derive navigation from the DOM and may never create words, and a result is a sentence from another page put onto this one, however carefully. Widening the boundary to fit would have cost the boundary — so the search code lives in its own file loaded by the one page that needs it, and a reader of a sheet downloads neither it nor the 357 KB index. It still writes no label of its own: every word a searcher sees is authored in `search.html` and cloned, the way the index by sheet clones an entry’s existing chip.

**Two entity tables became one, and one page order became one.** The new generator needed the same tokenizer, the same comment stripping and the same case-sensitive entity table the Markdown generator has — and that table is the reason: it knows `&THORN;` from `&thorn;` because the sheets quote Old English, and a second copy would be a lookup one tool learns and the other does not. Both now read from `tools/html.mjs`, and the editorial page order that `/llms.txt` and the new manifest both need lives once in `tools/pages.mjs`. The refactor was proved by the freshness gate: it regenerates and compares, so a green run is a byte-identical run.

2026 · 9 September

## The site was measured against somebody else’s specification, and the first thing it found was a defect this cabinet had already named, already fixed one layer up, and never thought to look for underneath

Audited against [The Website Specification](https://specification.website/) — the whole `required` tier, thirty-six items across ten categories, plus all twenty-one `agent-readiness` items at every status. Eight required findings, twenty-two verified passes, five items that genuinely do not apply here, and one that needs field data this site may not have yet two days after going live. The full working is in `AUDIT.md` in [the repository](https://github.com/Stimpunks/Queering-Earth), and it is a findings document rather than a fix list.

**The largest finding was ours twice over, and it is closed below.** Every sheet answers `200` at two addresses — `/on-being-ill` and `/on-being-ill.html`, byte-identical, same `ETag`. That is exactly the shape `\_redirects` describes in its own comments, found on Star Stuff on 15 August and fixed here for the hostnames on 7 September: “byte-identical documents at four URLs, which is a duplicate-content problem and an ambiguity about which address is the real one.” We wrote that down, fixed the hostname layer, and did not check the path layer. The house rule says addresses are extensionless, `check-sitemap.mjs` confirms no `.html` reaches the manifest, and every `rel="canonical"` points the right way — and the `.html` twin serves anyway, because **no file-level guard can see what the edge actually answers.** A guard that probes the served site was the thing this audit said we were missing, and there is one now.

MountedA privacy policy, and the one third-party request it would have had to confess

**The audit was wrong about this site, and writing the policy is what found it out.** The finding recorded “no analytics, no tag manager, no third-party script of any kind” — accurate about *scripts*, and misleading as a claim about privacy. Every page loaded Fraunces and Newsreader from Google’s font CDN, which told Google each reader’s IP address and user agent *before a word was read*. It was the only third-party request the site made, and it is the pattern a Munich court ruled against in 2022. Nobody had put it in a privacy policy because there was no privacy policy to put it in.

**So the flow is gone rather than disclosed.** Both faces are served from this domain now, generated by `tools/make-fonts.mjs`, keeping all three of the subsets Google served and Google’s own `unicode-range` values so that glyph coverage did not change by a single codepoint. That was checked rather than assumed: text metrics measured on the self-hosted build against the still-Google-served live site came back identical to three decimal places — 734.047, 752.711, 1855.906 — so the substitution is exact and the `WONK` axis that is this site’s whole typographic argument survives it.

**The old argument for hot-linking a font CDN died in 2020**, when browsers partitioned the HTTP cache per site to stop exactly this kind of cross-site tracking. A reader never arrived with Google’s copy already cached; every site paid for its own either way. The CDN was buying nothing but the data flow.

[The policy](https://queering.earth/privacy) is short because there is little to describe, and it names the two things that do happen: the two view preferences your own browser keeps and never sends anywhere, and the access log Netlify writes, which we do not use for anything and whose retention we do not control — **said plainly rather than dressed up with a number we cannot enforce.** No cookies, so no consent banner; there is nothing to consent to and a banner would be theatre. And a note on the outbound links, since nearly every sheet is made of citations: the one thing we do about them is `Referrer-Policy: strict-origin-when-cross-origin`, so a site you click through to learns that you came from here and *not* which sheet you had open.

**The claim is enforced, not remembered.** A privacy policy is a binding statement of practice, and “this site makes no third-party requests” is a claim about code that would eventually go stale in somebody’s memory. `check-metadata.mjs` now fails on any attribute that makes a browser fetch from another origin — and **exempts `a href`**, because a link a reader chooses to follow is not a request the page made. On a site built out of citations that distinction is the difference between a gate that works and one that would have to be switched off.

One item on the spec’s required list is **deliberately absent**: a postal address. The policy names the two organisations and points at their own sites and this repository’s issues, which is where corrections already go and where they are answered in public. That gap is written down in `AUDIT.md` as outstanding rather than presented as complete. And the page says on its face that it was not written by a lawyer: it describes what the code does, and it was checked against the code rather than adapted from a template — which is the same standard the sheets are held to.

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

### [The Five Unmistakable Marks](https://queering.earth/five-unmistakable-marks) Sheet No. 9

### [Other People Who Have It](https://queering.earth/other-people-who-have-it) Sheet No. 10

### [Find a word in the cabinet](https://queering.earth/search) the finding aid

### [Queering.Earth](https://queering.earth/) the plate

### [What this cabinet is for](https://queering.earth/mission) the founding papers

### [Nothing here was inevitable](https://queering.earth/manifesto) the founding papers

### [The attribution ledger](https://queering.earth/ledger) every quotation traced

### [What is settled, and what is open](https://queering.earth/what-is-settled) the decision log

### [How this site is made](https://queering.earth/design) the colophon

### [The accession register](https://queering.earth/changelog) this page

### The site itself the cabinet
