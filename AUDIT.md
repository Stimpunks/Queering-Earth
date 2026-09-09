# AUDIT.md — queering.earth against The Website Specification

A findings document, not a fix list. Nothing here has been changed on the site; each
finding names what is true today, what the spec asks for, and where the spec says it.

## What was audited

**Target:** https://queering.earth/ — 11 pages, live, checked against the deployed site and
this repo together. Header findings come from the live edge; markup findings from the files.

**Instrument:** [The Website Specification](https://specification.website/) via its MCP
server, spec state **as of 2026-08-21** (the `latest` date its `get_changes` reports).
Audit run **2026-09-09**.

**Scope, as chosen:** the whole `required` tier — 36 items across ten categories — plus all
21 `agent-readiness` items at every status. `recommended` items in the other nine categories
were not audited, so the absence of a finding below is not a pass for them.

**This file is served.** The repo root *is* the site with no build step, so this document
is public at `https://queering.earth/AUDIT.md`, alongside `CLAUDE.md`, `DECISIONS.md`,
`ATTRIBUTIONS.md`, and `README.md`, which have always been. Written accordingly. The two
findings whose disclosure was worth minding — the missing embedding policy and the short
HSTS — were closed before this file went up; see the remediation notes on each.

**This file is not a sheet.** It is a working document at the repo root, so it takes no
social card, no register entry, no `.qe-provenance` line, and no `sitemap.xml` entry. Those
belong to pages. Anything we *change* in response to a finding gets all four by the usual
rule — mount it, card it, log it, file it.

## The standing rule

**The spec is a floor and the house style is a ceiling. It can raise a bar here; it can
never lower one.**

The clearest case is contrast. The spec's [colour contrast](https://specification.website/spec/accessibility/color-contrast/)
page is WCAG-aligned, so its bar is AA. `tools/check-contrast.mjs` gates at the
[Stimpunks house 7:1](https://stimpunks.org/fieldguide/editorial/style-guide/) in both
grounds and under print emulation. If a future finding reads "AA is sufficient here," that
is a fact about the spec's floor and not permission to relax the gate.

The same asymmetry applies wherever the spec's advice and `CLAUDE.md` disagree about
decoration, texture, or plain view. The spec does not know that texture under text defeats
`check-contrast.mjs`, and it is not entitled to a vote on it.

## Summary

### `required` tier — 36 items

| | count |
|---|---|
| **Findings** | **8** — 5 remediated 2026-09-09, 3 open |
| Passing, verified | 22 |
| Not applicable, with reasons | 5 |
| Deferred — needs field data | 1 |

### `agent-readiness` — 21 items

| status | count | state |
|---|---|---|
| `required` | 1 | 1 finding (`stable-urls`, also counted above) |
| `recommended` | 8 | 6 absent, 2 partial |
| `optional` | 12 | all absent — no finding, listed for the record |

---

## Findings — `required` tier

Ordered by how much they cost, not by category.

### 1. Every sheet answers 200 at two addresses

`stable-urls` (required) · `redirects` (required)
· [stable-urls](https://specification.website/spec/agent-readiness/stable-urls/) (updated 2026-05-29)
· [redirects](https://specification.website/spec/seo/redirects/)

> **Remediated 2026-09-09.** `_redirects` now carries a forced `301!` for each of the ten
> sheets and for `/index.html`, enumerated rather than globbed so a sheet without a rule is
> reportable by name. **The `!` is the load-bearing part** — Netlify shadows a redirect with
> a real file, so an unforced rule would never fire.
>
> **`tools/check-addresses.mjs` is the gate this finding argued for**, and the only one here
> that knows what the edge answers rather than what the files say. Offline by default like
> the other three; `--live` probes the deployed site, because a redirect loop is how
> `_redirects` fails and a loop is invisible offline. All six detectors were made to fail
> before the gate was trusted.
>
> The two related items also closed: the two favicons and the touch icon are now
> document-relative, matching `queering.css` and `queering.js` and guarded against
> regression, and the sheet index no longer points at `/index`. **The `file://` browsing
> problem has no fix and is the trade** — nothing on disk is named `on-being-ill`, so
> relative links would not help; extensionless addresses need a server. `CLAUDE.md` now says
> so.

**This is the same defect `_redirects` was written to fix, one layer down.**

That file already records the hostname version, found on Star Stuff 2026-08-15: *"all four of
its addresses answered HTTP 200 with the same ETag — byte-identical documents at four URLs,
which is a duplicate-content problem and an ambiguity about which address is the real one."*
The hostname case was fixed on 2026-09-07. The path case was never noticed.

```
/on-being-ill        200  etag "2f131b1b8f2ec102629d0544fa10a984-ssl"  26718 bytes
/on-being-ill.html   200  etag "2f131b1b8f2ec102629d0544fa10a984-ssl"  26718 bytes
```

Identical ETag, identical length. All ten non-index sheets do this — `/changelog` and
`/changelog.html`, `/wild-nights` and `/wild-nights.html`, and so on for every one.

`CLAUDE.md` states the intent plainly: *"Addresses are extensionless."* `check-sitemap.mjs`
enforces it in the manifest and reports "locs still carrying .html — none." Every
`rel="canonical"` points at the extensionless form. **The intent is stated, the manifest is
clean, the canonical tags are right, and the `.html` twin still serves.**

The canonical tag mitigates this for search engines and for nothing else. An agent that
resolves `/on-being-ill.html` caches that address; a reader who copies it shares it; a
citation that carries it is a citation to an address the house style says does not exist.
The spec's own list of common mistakes includes *"Letting trailing slashes serve different
content from non-trailing slashes"* — the same class of ambiguity, and it asks for
canonicalisation by 301.

The home page has its own version. `/index.html` answers `200` with the same ETag as `/`,
so the plate is reachable at two addresses too. `/index` answers `301` to `/` — correct, but
it means the sheet index's own `<a href="/index">` link takes a one-hop redirect the spec
says to flatten where you control both ends, and we control both ends.

*Where the fix would go:* `_redirects`, alongside the hostname rule that already documents
the reasoning. Not `check-sitemap.mjs` — it is already correct and already passing. Worth a
new gate that probes the served site rather than the manifest, since this is precisely the
failure no file-level check can see.

### 2. No clickjacking policy at all

`frame-ancestors` (required) · [spec](https://specification.website/spec/security/frame-ancestors/) (updated 2026-05-29)

> **Remediated 2026-09-09.** `_headers` now sends `Content-Security-Policy: frame-ancestors
> 'none'` and `X-Frame-Options: DENY` on every response. The finding is kept below rather
> than deleted, because a correction is a record here and not an erasure. **The policy
> carries `frame-ancestors` and nothing else deliberately** — a `default-src` or `script-src`
> without `'unsafe-inline'` would kill the inline before-first-paint snippet in every head
> and flash the wrong ground at the reader who chose the other one. The reasoning is in
> `_headers` beside the rule.

No CSP and no `X-Frame-Options` anywhere — not in `_headers`, not in any page, not from
Netlify's defaults. Verified: `curl -sI https://queering.earth/ | grep -iE 'frame-ancestors|x-frame-options'` returns nothing.

The spec asks for both, defaulting to refusal:

```
Content-Security-Policy: frame-ancestors 'none'
X-Frame-Options: DENY
```

The usual argument for this item is session theft, and it does not apply here — the site has
no login, no forms, and no authenticated action to hijack. **The reason it matters on this
site is attribution.** Anyone can frame a sheet inside their own chrome and present it as
theirs. A site whose stated correctness requirement is that credit reaches the right
originator is currently embeddable, unattributed, by anyone. The spec's instruction covers
it without needing the security argument: *send them even on pages that "wouldn't make sense"
framed.*

### 3. The 404 leaves the herbarium

`error-pages` (required) · [spec](https://specification.website/spec/resilience/error-pages/) (updated 2026-07-09)

> **Remediated 2026-09-09.** `404.html` carries the masthead, both view toggles, the
> before-first-paint snippet, the footer, and all eight cards. The drawing is an empty
> mount — a stem with nothing at its tip.
>
> **Fixing it introduced the soft 404 this item leads with**, and the new gate caught it:
> `404.html` is a real file, so `/404` and `/404.html` answered 200 with the error page.
> Two rewrites in `_redirects` serve it with a 404 status instead, verified not to loop.
>
> Both other gates carry a named exception rather than a silent skip — `NOT_CONTENT` in
> `check-sitemap`, `NOT_ADDRESSED` in `check-addresses` — and the address gate is now
> *stricter* about the page than the rule it excuses: it asserts the file exists, that a
> nonexistent address serves our page rather than Netlify's, and that neither `/404` nor
> `/404.html` answers anything but 404.
>
> The 500 remains unreachable by construction, as noted below.

The **status code is right** — `curl -I https://queering.earth/definitely-not-a-page` returns
`404`, so this is not a soft 404, which is the failure the spec cares most about.

The **page is Netlify's default**. A reader who mistypes a sheet address gets a teal
`--colorRgbFacetsTeal600` page with a system font stack and no way back — no nav, no plate,
no ground toggle, no indication they were ever on this site. The spec asks for a page that
matches the site, explains the problem in plain language, keeps navigation so the reader can
carry on, and offers a route onward.

There is no `404.html` in the repo. `_redirects` has no status override.

*A note on the 500:* the spec asks for that page too. On a static Netlify site with no build
step and no application layer there is no code path that can produce one — the edge either
serves a file or does not. Recording it as unreachable-by-construction rather than missing.

### 4. HSTS is short and does not cover subdomains

`hsts` (required) · [spec](https://specification.website/spec/security/hsts/) (updated 2026-07-01)

> **Remediated 2026-09-09.** `_headers` now sends
> `Strict-Transport-Security: max-age=63072000; includeSubDomains`, overriding Netlify's
> default. The subdomain audit the spec asks for was run first and came out clean. **No
> `preload`**, per the spec and the list operator's own advice.

```
current:  strict-transport-security: max-age=31536000
spec:     Strict-Transport-Security: max-age=63072000; includeSubDomains
```

Two gaps: one year rather than two, and no `includeSubDomains`. What is there is Netlify's
default, not something `_headers` sets — so this is a header the repo does not currently own.

The spec's caution about `includeSubDomains` is to audit subdomains first, because an
HTTP-only subdomain breaks the moment you ship it. Checked: `www.queering.earth` answers
`301` to `https://queering.earth/`, so it is HTTPS-capable, and there are no others. The
audit the spec asks for comes out clean.

The spec is also explicit that **`preload` should be left off** — the preload list's own
operator now discourages it. Don't add it.

### 5. Fifteen plates, all JPEG

`image-optimization` (required) · [spec](https://specification.website/spec/performance/image-optimization/) (rewritten 2026-08-08)

Everything else about the images is right, and worth saying before the finding: all 15
`<img>` elements carry explicit `width` and `height`, `loading="lazy"`, `decoding="async"`,
and genuinely descriptive alt text — the Dickinson manuscript's alt runs to a full
description of the leaf, the ruling, and the hand. That is better than most sites manage.

The gap is format. All 15 are `.jpg`, there is no `<picture>` element anywhere, and no AVIF
or WebP exists. Payload runs 108 KB–350 KB per plate;
`dickinson-1861-wild-nights-houghton-ms-am-1118-3-38b.jpg` is 320 KB and
`waterhouse-1916-miranda-the-tempest.jpg` is 350 KB.

This item was **rewritten on 2026-08-08**, which is inside the window this audit covers: AVIF
reached Baseline widely available on 2026-07-25, and the page now says to **encode AVIF
first** rather than treat it as an enhancement layered over WebP. The `<picture>` fallback
chain stays, because "widely available" describes browser versions shipped in the last thirty
months and not the ones people are running.

*Where this collides with a house rule:* `tools/make-images.py` is the one Python tool here,
justified because it has to rasterise and nothing may need `npm install`. Encoding AVIF is
the same kind of job. Whether the plates go through it or stay hand-placed is a real
decision, not a mechanical fix.

### 6. Nothing is cached, including the things that never change

`cache-control` (required) · [spec](https://specification.website/spec/performance/cache-control/)

Every asset gets the same header:

```
queering.css         cache-control: public,max-age=0,must-revalidate
queering.js          cache-control: public,max-age=0,must-revalidate
images/og-index.png  cache-control: public,max-age=0,must-revalidate
favicon.svg          cache-control: public,max-age=0,must-revalidate
sitemap.xml          cache-control: public,max-age=0,must-revalidate
robots.txt           cache-control: public,max-age=0,must-revalidate
```

The spec asks for `immutable` with `max-age=31536000` on fingerprinted assets, and short or
no-cache on HTML. **The HTML is right.** The rest is Netlify's default, and it revalidates
the botanical plates — files that have not changed since they were scanned and never will —
on every visit.

The honest complication: **nothing here is fingerprinted.** `queering.css`, not
`queering.a1b2c3.css`. That is downstream of "no build step," which is a deliberate
architectural choice, and it means a long `max-age` on the stylesheet would strand readers on
a stale sheet after a palette change with no way to bust it.

So this splits. The plates in `images/` are content-addressed by their own filenames — an
1863 lithograph plate 4 is not going to be re-cut — and can take a long `max-age`
immediately. `queering.css` and `queering.js` cannot, until either they are fingerprinted or
a shorter revalidating window is chosen deliberately. Recording it as one finding with two
different answers rather than pretending the whole thing is one switch.

### 7. No privacy policy

`privacy-policy` (required) · [spec](https://specification.website/spec/privacy/privacy-policy/) (updated 2026-05-29)

There is no policy page and no footer link to one.

**This is the finding I am least certain belongs on the required tier for this site, and I
want the reasoning visible rather than the verdict.** The spec's trigger is *"If you collect
any personal data — names, email addresses, IP addresses, cookies tied to a user, form
submissions."* Taking that clause by clause against what this site actually does:

- No analytics, no tag manager, no third-party script of any kind.
- No forms, so no submissions.
- No cookies. `document.cookie` appears nowhere.
- Two `localStorage` keys, `qe-plain` and `qe-ground`, holding the reader's own view
  choices. Never transmitted, never read by anything but the page that set it.
- **IP addresses are logged by Netlify as a hosting processor**, which is the one clause that
  does land. Serving a page over HTTP means receiving an address.

So the honest answer is "yes, minimally, via the host, and nothing else." That is enough to
put the item in scope under GDPR Art. 13 — but it makes almost all of the spec's required
disclosure list inapplicable, which is itself the point. The spec's own list of common
mistakes leads with *"Copy-pasted boilerplate that mentions practices you do not have"*, and
a generic policy here would be exactly that, on a site whose stated standard is that we do
not tighten or generalise a claim to make it fit.

*What the fix looks like:* a short, true page — controller identity and contact, the one
processor, the two `localStorage` keys and what they hold, no analytics stated as a fact
rather than an omission, and a visible last-updated date. Shorter than the spec's list,
because most of the list is honestly empty. This one is Ryan's and Helen's call, not a
mechanical fix, and it is the finding most worth disagreeing with me about.

### 8. `cookie-consent` — see above

`cookie-consent` (required) · [spec](https://specification.website/spec/privacy/cookie-consent/)

Filed as **not applicable**, with the reasoning recorded here because it is a judgment and
not an absence.

The two `localStorage` keys are "similar storage" under ePrivacy, so the question is real.
They are exempt: both are strictly necessary to deliver a preference the reader explicitly
asked for by pressing a control, they persist nothing but that choice, and they identify
nobody. That is the functional-storage exemption, not a loophole.

Worth noting that the site's architecture makes this exemption *load-bearing* rather than
incidental: `CLAUDE.md` requires the stored preference to be applied before first paint,
because deferring it *"flashes the wrong page: the decorated one at the reader who turned it
off, or the daylight sheet at the reader who asked for the cabinet."* A consent gate in front
of that would break the accessibility feature it exists to serve. **No banner. There is
nothing to consent to, and adding one would make the site worse.**

---

## Findings — `agent-readiness`

The category the spec itself says moves fastest, and the one this site has most to gain from:
a site built to be quoted and cited, currently legible to agents only as HTML.

### Absent, `recommended`

| item | status | state |
|---|---|---|
| [`llms-txt`](https://specification.website/spec/agent-readiness/llms-txt/) | recommended | No `/llms.txt` — 404. Reached **v2 on 2026-08-21**, inside this audit's window: the file must now be advertised with `rel="describedby"`, not left at the root to be guessed at. |
| [`link-headers`](https://specification.website/spec/agent-readiness/link-headers/) | recommended | No `Link` header on any response. Nothing advertises the sitemap, and there is nothing else yet to advertise. |
| [`structured-data-for-agents`](https://specification.website/spec/agent-readiness/structured-data-for-agents/) | recommended | **No JSON-LD on any of the 11 pages.** Verified: no `application/ld+json` anywhere. |
| [`markdown-source-endpoints`](https://specification.website/spec/agent-readiness/markdown-source-endpoints/) | recommended | No `.md` sibling for any page, no `Accept: text/markdown` negotiation, no `rel="alternate"` link. |
| [`robots-for-ai-crawlers`](https://specification.website/spec/agent-readiness/robots-for-ai-crawlers/) | recommended | `robots.txt` has `User-agent: *` / `Allow: /` and the sitemap line. No named AI crawler has an explicit rule. |
| [`agent-skills-discovery`](https://specification.website/spec/agent-readiness/agent-skills-discovery/) | recommended | No `/.well-known/` directory at all. There is no `/.well-known/agent-skills/index.json`. |

Two of these are worth more than a table row.

**`structured-data-for-agents` is the biggest single gap in this category.** The spec's list
of types reads like an inventory of what these pages already are: `Article` for the sheets,
`Person` and `Organization` as nested references, `BreadcrumbList` for the plate, `WebSite`
on the home page. The sheets carry facts an agent currently has to infer from prose — who
wrote a quoted line, when it was published, which edition it came from, what licence the
sheet is under. `ATTRIBUTIONS.md` already holds that data in a form a human can check. The
spec's binding constraint here is *"mirror what is visible on the page"* — which this site
can satisfy more easily than most, because the attributions are already on the sheets rather
than asserted behind them.

**`robots-for-ai-crawlers` is a finding about explicitness, not permission.** The site's
stance is already generous and already decided — `robots.txt` says so in a comment:
*"Everything here is meant to be read, quoted, and reused (CC BY-SA 4.0)."* The gap is that
this is a sentence addressed to humans, in a file read by machines. No named crawler has a
rule, and the CC BY-SA position is nowhere in machine-readable form. Two `optional` items
below exist precisely to state it.

### Absent, `optional` — no finding, recorded for the record

`llms-full-txt`, `content-signals`, `tdmrep`, `web-bot-auth`, `mcp-and-tool-discovery`,
`a2a-agent-cards`, `dns-aid`, `agentic-resource-discovery`, `nlweb`, `webmcp`, `okf-bundle`,
`schemamap` — all absent, none a failure.

Three are worth a second look, and only because of what this site is:

- **`content-signals` and `tdmrep`** are the machine-readable form of the CC BY-SA position
  the site already holds. Cheap, and they say out loud what the comment says quietly.
- **`llms-full-txt`** is described by the spec as *"useful for small sites, costly for large
  ones."* Eleven pages is small.

### Partial

- **`machine-readable-formats`** (recommended) — `sitemap.xml` is present and clean. **No
  feed of any kind**, and `changelog.html` is the obvious candidate: an accession register
  that gains an entry per sheet is a feed with the wrong content type. No `rel="alternate"`
  link in any `<head>`.
- **`agent-readiness-overview`** (recommended) — the underlying qualities it names are
  mostly in place already (clean semantics, one `<main>`, authored ids, real headings, no
  client-side rendering). What is missing is every machine-readable endpoint listed above.

---

## Passing — verified, 22 of 36

Recorded so the next delta check has a baseline to diff against, rather than re-deriving it.

**foundations (5/5)** — `doctype`, `html-lang`, `meta-charset`, `meta-viewport`, `title`. All
11 pages: `<!doctype html>` first, `lang="en"`, UTF-8, `width=device-width, initial-scale=1`
with scaling never disabled, exactly one non-empty unique `<title>`.

**seo (1/3)** — `heading-hierarchy`. One `<h1>` per page inside `<main>`, then `<h2>` and
`<h3>`, no skipped levels on any page. (`redirects` and `meta-robots`: see below and above.)

**accessibility (11/14)**
- `color-contrast` — **0 failures across 11,343 measured text elements** in daylight, cabinet
  and print emulation, and 0 under the house 7:1. Exceeds the spec's AA bar by design.
- `image-alt-text` — 15/15 `<img>` with descriptive alt.
- `skip-links` — present on all 11 pages, first focusable element, 164×55px when revealed.
- `focus-indicators` — `:focus-visible` with `outline: 3px solid var(--qe-rust)` and
  `outline-offset: 2px`. **Zero occurrences of `outline: none` or `outline: 0` in the
  stylesheet**, which is the spec's named top failure.
- `semantic-html` — exactly one `<main>` per page, gated by `check-markup.mjs`; `.qe-elsewhere`
  nav correctly outside it.
- `keyboard-navigation` — 36 focusable elements, DOM order matches visual order, no positive
  `tabindex` anywhere, no traps. Tab order verified in-browser: skip link → Cabinet → Plain
  view → content.
- `link-text` — no "click here", "read more", "here", "more", "link", or "this" as a whole
  link label anywhere.
- `document-language` and `lang-attribute` — **unusually thorough.** Inline `lang` on 26
  spans across five languages: `ang` (Old English, 14), `grc-Latn` (5), `non` (Old Norse, 3),
  `fr` (2), `grc` (2). WCAG 3.1.2 satisfied at a level most sites never reach.
- `reduced-motion` — all motion inside `@media (prefers-reduced-motion: no-preference)`, and
  the one `opacity: 0` is inside that query (`queering.css:468`), so the reduced state is the
  finished drawing. Matches the `CLAUDE.md` rule exactly.
- `data-tables` — 4 tables across 3 sheets, every one with a `<caption>`, `<th>` cells, and
  `scope` attributes.
- `touch-target-size` — see the exception note below.

**security (3/5)** — `https-tls` (HTTP/2, TLS, `http://` → 301 → `https://`),
`x-content-type-options` (`nosniff`, set by `_headers`), and `cookie-attributes` (N/A).

**performance (1/4)** — `compression`. Brotli confirmed on CSS: `content-encoding: br`.

**seo — `meta-robots`** — public pages correctly carry no `noindex`; there is no staging,
admin, or thin content that needs one. Implicit `index, follow` is the correct policy here.

**i18n (1/1)** — `lang-attribute`, as above.

## Passes by exception — do not "fix" this

**`touch-target-size`** (required) · [spec](https://specification.website/spec/accessibility/touch-target-size/)

`.qe-anchor` — the `§` section link added in the last two commits — measures **10.98 × 39.5
px**. Its width is under the WCAG 2.2 SC 2.5.8 minimum of 24px, so **any automated checker
will flag it, and it is not a failure.**

It passes on the spacing exception, measured rather than assumed. A 24px circle centred on
the anchor intersects no other target's circle: nearest other target centre is 80.4px away at
desktop width and **50.4px at 375px mobile**, against the 24px the exception requires. It
also plausibly qualifies for the inline exception, sitting within an `<h2>` line of
non-target text — but the spacing exception alone settles it, so that argument is not needed.

The two view controls clear the minimum outright: ground toggle 52.95 × 25.07px, plain-view
toggle 102.05 × 36.15px. Both fall short of the 44×44 *enhanced* target (SC 2.5.5, AAA), which
is not required and is not counted as a finding. **The ground toggle clears the minimum by
1.07px** — worth knowing before anyone reduces its padding.

*Recorded here because this is the shape of thing a later reader deletes in good faith.*

## Not applicable, with reasons — 5

| item | why |
|---|---|
| `form-labels` | No `<form>` and no form control on any page. |
| `form-errors` | Same. |
| `captions-and-transcripts` | No `<video>` and no `<audio>` anywhere. The botanical art is inline SVG and static plates. |
| `cookie-attributes` | No cookies. `document.cookie` appears nowhere in the repo. |
| `cookie-consent` | See finding 8 — exempt functional storage, and a banner would break a first-paint accessibility feature. |

## Deferred — needs data this audit cannot produce — 1

**`core-web-vitals`** (required) · [spec](https://specification.website/spec/performance/core-web-vitals/)

The spec's bar is LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 **at the 75th percentile of real
users**. That is field data. A local render cannot produce it, and a lab number would be a
different measurement wearing the same name.

What can be said from the files: every `<img>` carries explicit `width` and `height`, which
is the main CLS defence; there is no client-side rendering, no web font loaded over the
network, no third-party script, and no layout that reflows after paint. The structural risks
are absent. **The measurement is still owed** — via Search Console's Core Web Vitals report
or a CrUX query once the domain has traffic, which it may not yet have two days after going
live.

Also informational, from the 2026-08-21 change to `https-tls`: the spec's cipher checklist
now asks for **hybrid post-quantum key agreement** (`X25519MLKEM768`). That is Netlify's TLS
termination, not a repo setting — nothing to fix here, worth knowing it is now on the list
and is someone else's configuration.

## Next delta check

The spec is hand-curated and changes often, and a **status promotion can fail a
previously-passing site**. Two items in this audit were rewritten inside the last month
(`image-optimization` 2026-08-08, `llms-txt` and `https-tls` 2026-08-21), which is the case
for checking the delta rather than the whole thing.

**Spec state at this audit: `2026-08-21`.**

Next run: `get_changes({ since: "2026-08-21" })`, then re-audit only the topics it returns.
Do not re-audit from scratch, and do not trust a cached copy of the spec. A sensible cadence
is monthly, or at the start of any fresh audit.

Two things to check before concluding the spec has a gap: `https://specification.website/considered/`
lists standards deliberately left out, each with the condition that would reverse the
decision. And the `recommended` tier outside `agent-readiness` has not been audited at all —
that is the obvious second pass.
