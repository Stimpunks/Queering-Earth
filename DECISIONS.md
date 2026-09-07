# Decisions

What is settled, what is open, and the reasoning for each — so the same question is not
re-litigated in three weeks.

----

## Open

### The wordmark and the tagline

The masthead currently reads **Queering.Earth** with **"Post-normal possibilities."** under
it. Both are provisional.

The tagline is Helen Edgar's own phrase from the founding brainstorm, chosen because it is
short, it is ours, and it carries no attribution risk. It replaced the working tagline
— "Subverting, defying, disrupting, and liberating oneself from all forms of normativity
(props Nick Walker)" — which is a **paraphrase of Walker wearing her name**. See
`ATTRIBUTIONS.md` for the full reasoning and for how the page handles Walker now.

Changing either is one line in `index.html`. Whatever replaces them, the paraphrase problem
does not come back: quote her exactly, or write our own line.

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

### The content model

Undecided on purpose. What the pieces are called, whether they come in collections, whether
there is a print form, whether Helen's Woolf reiterations are a series or a one-off. All of
it gets easier to answer with a real page at a real URL to argue with.

----

## Settled

### `queering.earth` is not registered — build anyway (2026-09-07)

`whois.nic.earth` returns "No Data Found". Registering it is Ryan's, and a purchase. Nothing
else waits on it: the site deploys to its `.netlify.app` hostname and the domain attaches
later.

**Two things must NOT be switched on until the domain resolves.** The host redirect in
`_redirects` would send the only working address to one that does not answer — a site that is
simply down. And adding this domain to the SKS mirror's `SITES` map would fail that sync,
because the mirror fetches over the network.

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
