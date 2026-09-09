---
title: "What this site knows about you"
url: "https://queering.earth/privacy"
updated: "2026-09-09"
description: "Almost nothing, and here is the whole of it: two view preferences your own browser keeps, and the server log our host writes. No analytics, no cookies, no third-party requests, no forms."
licence: "CC-BY-SA-4.0"
licence_url: "https://creativecommons.org/licenses/by-sa/4.0/"
attribution_ledger: "https://github.com/Stimpunks/Queering-Earth/blob/main/ATTRIBUTIONS.md"
generated_by: "tools/make-markdown.mjs from the page's own <main> landmark"
---

[Queering Earth](https://queering.earth/)

# What this site knows about you

Almost nothing, and this is the whole of it.

This is the privacy policy, and it is short because there is little to describe. This site is a folder of files on a web host. It runs no analytics, sets no cookies, has no accounts, no comments, and no advertising, and it makes **no requests to anybody else’s server**. There is one field on the whole site, on [the finding aid](https://queering.earth/search), and it never submits anywhere — see below. Two things nevertheless happen when you read a page, and both are below.

Last updated 9 September 2026. Any change to this page gets an entry in [the accession register](https://queering.earth/changelog), the same as a correction to a sheet — so “we may update this policy from time to time” is not something we have to ask you to accept on trust.

## What your own browser keeps

Two values, in your browser’s local storage, put there only if you press one of the two controls at the top of every page:

**`qe-ground`**
: Which ground you asked for — the daylight sheet or the cabinet. Holds the word `daylight` or `cabinet`, and nothing else.

**`qe-plain`**
: Whether you asked for plain view, which switches off the display faces, the wonk, the rotation and the motion. Holds `1`, or is absent.

**Neither is a cookie and neither is ever sent anywhere.** Local storage is not attached to requests the way a cookie is; these two values stay in the browser that wrote them, on the device that wrote them. We cannot read them, and nothing on this site tries to. Clearing your site data removes them and the page goes back to following your system’s own light or dark preference.

They identify nobody. There is no visitor id here, random or otherwise, and no way to recognise a returning reader.

## What the host sees

The site is served by [Netlify](https://www.netlify.com/), which acts as our hosting processor. Asking any web server for a page necessarily tells it who is asking, so Netlify’s access logs record **your IP address, your browser’s user-agent string, and which address you requested**. Under the GDPR an IP address is personal data, which is why this page exists at all.

We do not use those logs for analytics and we do not build anything from them. The lawful basis is **legitimate interests** — serving the site and keeping it up. **We do not set or control their retention period**, and we would rather say that plainly than name a number we cannot enforce; Netlify’s own [privacy notice](https://www.netlify.com/privacy/) governs what it keeps and for how long.

## What is deliberately not here

- **No analytics of any kind.** No page-view counter, no tag manager, no heatmap, no session recording. We do not know how many people read this.
- **No cookies.** The word `document.cookie` does not appear anywhere in this site’s code, which is why there is no consent banner: there is nothing to consent to, and a banner would be theatre.
- **No third-party requests.** Until 9 September 2026 the pages loaded their two typefaces from Google’s font CDN, which told Google your IP address and user agent on every page load, before you had read a word. **The fonts are now served from this domain** and that request is gone. It was the only one.
- **No accounts and no comments**, and **nothing that submits**. There is exactly one place on this site to type: the search field on [the finding aid](https://queering.earth/search). It has no server behind it. What you type is matched against a file your browser has already downloaded, inside your browser, and it is never sent anywhere — not to us, because there is no us to send it to. Until 9 September 2026 this line said there was nowhere on the site to type anything at all; the field is new and the line was corrected in the same change that added it, which is [in the register](https://queering.earth/changelog#a-2026-09-09-search).
- **No advertising, and nothing sold or shared.** There is no commercial arrangement here to share anything under.

## What you search for

[The finding aid](https://queering.earth/search) searches this whole site, and **it does the searching in your browser**. Your browser fetches one file from this domain — `search-index.json`, the text of every page — and everything after that happens on your machine. There is no search server, no search API, and no third party involved, so the request our host logs is a request for that one file and nothing about what you were looking for.

**The search term is not in the address, and that is deliberate.** The usual way to make a search shareable is `?q=`, which is part of the URL a browser sends — so every term anybody typed would be written into the hosting log described above. Here it goes after the `#` instead: `/search#q=lavender`. **Browsers never send the part after the `#` to a server.** The link is still shareable and still bookmarkable, and the word you searched for reaches nobody, including us.

Nothing about a search is remembered. There is no history of recent searches, nothing added to local storage, and the two values described at the top of this page are still the only two things this site stores.

One thing worth being plain about, since it is the general case and not ours: **your browser’s own address bar may remember the address, fragment and all.** That is your browser’s history on your own device, not something this site does or can see — but on a shared machine it is the copy that would tell somebody what you looked up.

## Links to other places

Nearly every sheet cites its sources, so the pages are full of links out — to journals, archives, libraries, and the writers we are reading. **Following one of those takes you somewhere we do not control**, and that site will see you arrive under its own policy, not this one.

The one thing we do about it: every response here sends `Referrer-Policy: strict-origin-when-cross-origin`, so a site you click through to is told that you came from `queering.earth` and is *not* told which page you were reading. Which sheet you had open is nobody else’s business.

## Your rights, and why most of them have nothing to work on

Under the UK and EU GDPR you have the right to access your personal data, to have it corrected or erased, to restrict or object to its processing, to portability, and to complain to a supervisory authority. Those rights are real and we are not qualifying them.

**But we hold no store of reader data for them to reach.** There is no database, no mailing list, and no account. The only personal data connected to your reading of this site is in a hosting log we do not own, and we could not find your record in it if you asked, because we have nothing to match you against. If you want that log addressed, Netlify is the party who holds it.

If you are in the UK you can complain to the [Information Commissioner’s Office](https://ico.org.uk/); elsewhere in Europe, to your own national authority.

## Who we are

Queering Earth is a collaboration between the [Stimpunks Foundation](https://stimpunks.org/) and [More Realms](https://morerealms.com/), who are the joint controllers for anything described above. For a privacy question, or for anything else about this site, either of those sites will reach us, and [the repository’s issues](https://github.com/Stimpunks/Queering-Earth/issues) are the fastest route — that is where corrections to the sheets are raised too, and they are answered in public.

**Not legal advice, and not written by a lawyer.** This page describes what the code does, and it was checked against the code rather than adapted from a template. If it is wrong about a fact, that is a correction and it belongs in [the register](https://queering.earth/changelog) — [say so](https://github.com/Stimpunks/Queering-Earth/issues) and it will be.
