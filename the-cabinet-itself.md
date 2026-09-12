---
title: "The cabinet itself"
url: "https://queering.earth/the-cabinet-itself"
updated: "2026-09-11"
description: "The working pages of queering.earth: the colophon, the register, the ledger, the decisions, the finding aid and the privacy page — what each is for, and what the build checks about them."
licence: "CC-BY-SA-4.0"
licence_url: "https://creativecommons.org/licenses/by-sa/4.0/"
attribution_ledger: "https://github.com/Stimpunks/Queering-Earth/blob/main/ATTRIBUTIONS.md"
generated_by: "tools/make-markdown.mjs from the page's own <main> landmark"
---

1. [Queering Earth](https://queering.earth/)

Drawer

# The cabinet itself

Eight pages that are not specimens. How the cabinet is made, what it has recorded, how to look through it, and what it knows about you — which is very nearly nothing.

## The eight pages

Each line says what the page is *for*, in the order the work actually happens: the rules, then the record, then the ways back in, then what it costs you. What each page contains is glossed once, on the [front of the cabinet](https://queering.earth/#the-cabinet-itself), and is not restated here.

**[How this site is made](https://queering.earth/design)**
: Where the rules are written down, each with the reason it exists, so it can be argued with rather than merely obeyed.

**[The accession register](https://queering.earth/changelog)**
: Where every change to the cabinet is recorded as it happens — including, especially, the labels we got wrong.

**[What has arrived, and when](https://queering.earth/whats-new)**
: The same record as the register, reduced to its spine: what is here and the day it turned up, with no reasoning at all. It is also the list the feed carries.

**[The attribution ledger](https://queering.earth/ledger)**
: Where every quotation is traced back to the work somebody actually held, with the day they held it. The debts, kept in public.

**[What we quote, and why we may](https://queering.earth/how-we-quote)**
: Where the standard for quoting work still in copyright is set, so a reader can see the judgement being made rather than take it on trust.

**[What is settled, and what is open](https://queering.earth/what-is-settled)**
: Where the reasoning is kept, including the designs that were refused, so the same question is not re-argued from scratch in three weeks.

**[Find a word in the cabinet](https://queering.earth/search)**
: The way back in when you remember a phrase and not a page. It runs in your own browser and tells us nothing.

**[What this site knows about you](https://queering.earth/privacy)**
: What all of the above costs you, which is very nearly nothing — stated in enough detail to be checkable, and checked by the build.

## Why these eight are one drawer

Because they are all answers to the same question: **how do you know any of this is true?** The rules are published so you can see what we hold ourselves to. The register is published so you can see where we failed it, and the arrivals list so you can see the shape of that record without reading forty thousand words of it. The ledger is published so you can go and check a quotation against the thing it came from, and the quoting policy so you can see on what basis we took it. The decisions are published so you can see what was refused and why. The finding aid is how you reach any of it, and the privacy page is the accounting for what that reaching costs.

None of them is a reading of anything, which is why none of them is carded or numbered. [The founding papers](https://queering.earth/the-founding-papers) are the other half of the same distinction, from the other side: purpose above plumbing, and this drawer is the plumbing.

## What the build checks about this drawer

More of it than you would expect, and on purpose — a claim that only a person remembers is a claim that will eventually be false.

- [The privacy page](https://queering.earth/privacy) is a binding statement about what this site can reach, so the build reads every attribute that makes a browser fetch something and fails if the page and the code disagree. It also fails if a browser-storage key exists that the policy does not name.
- [The ledger](https://queering.earth/ledger) and [the decisions](https://queering.earth/what-is-settled) are generated from the working files a session actually edits, and the build fails when either page has fallen behind its source. Two hand-kept copies is the one arrangement ruled out.
- [The register](https://queering.earth/changelog) runs newest first, and the build fails if a date increases down the page, if the latest marker is not on the top entry, or if an entry files itself to a sheet that does not exist.
- [The finding aid](https://queering.earth/search) is built from the same landmark the pages publish, and it refuses to crop a quotation: a mounted quotation comes back whole with its source, or it does not come back.

The rest of it — the contrast in both grounds and on paper, the addresses, the cache rules, the card order, whether any text sits on any other text — is in [the colophon](https://queering.earth/design), which is the page that explains the machinery it is itself checked by.
