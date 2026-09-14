---
name: sync
description: Bring this checkout up to date with GitHub and make every derived file current again. Use when Ryan or Helen says "sync", "pull", "get the latest", "update my checkout", "catch me up", "what's landed", or before starting or shipping anything. Handles the pull, the regeneration, the conflict cases and the branch model, and reports what the other person shipped — so neither of them types a git command.
---

# sync

**Two people push here now, and `main` deploys to queering.earth.** This skill is the whole
of the git side of that. Run it **before starting a sheet** and **again before publishing
one**; `publish-draft` assumes it.

**What it is actually for.** A pull is not a merge conflict and produces no warning, and it
still leaves every generated file describing a site that no longer exists: `search-index.json`
cannot find the sheet that landed while you worked, `/whats-new` and `feed.xml` do not list
it, `/ledger` is missing its credit rows, and **`_headers` carries no CSP hash for the inline
snippet those pages ship** — which is the before-first-paint block refused on every page, so
a reader who asked for the cabinet gets the daylight sheet. **Pulling without regenerating is
the failure this skill exists to make impossible.**

---

## Steps

### 1. Say where we are, before touching anything

```bash
git status -sb | head -1
git stash list
node tools/draft.mjs
```

Report in plain words: which branch, N behind / M ahead, whether there is uncommitted work,
and which drafts are in flight. **Never start by assuming the tree is clean** — the common
case here is being mid-sheet.

**Which branch matters, because there are three kinds.** `main` is the published site.
`drafts` is a base and not a place to work. `draft/<slug>` is one draft. **This skill updates
the branch you are on** and never switches for you.

### 2. Pull, carrying any work in progress

```bash
git pull --rebase --autostash
```

`--autostash` is what makes this safe with a dirty tree: git stashes, rebases, and pops. **Do
not stash by hand.**

- **Nothing to pull?** Say so and skip to step 5 — the gates still cost seconds, but there is
  nothing to regenerate.
- **The pop conflicted?** The work is **not lost** — it is in `git stash list`. Say that
  first, then resolve by reading the files.
- **The rebase stopped on a conflict?** Step 3.

### 3. Conflicts: a derived file is asked, never read

A derived file is a **copy**, and two copies disagreeing is settled by asking the thing they
are copies of. If any of these conflict, take either side — step 4 replaces the contents
anyway:

`search-index.json` · `llms.txt` · `llms-full.txt` · `feed.xml` · `register.xml` ·
the generated blocks of `whats-new.html`, `ledger.html` and `what-is-settled.html` ·
**the `.md` sibling of any page**

```bash
git checkout --ours <file>
git add <file>
```

`search-index.json` is 1.5 MB on one line and `.gitattributes` makes git refuse to merge it,
so it will always land here. **That is the mechanism working, not a problem.**

**A `.md` IS DERIVED ONLY IF A PAGE OF THAT NAME EXISTS.** `ATTRIBUTIONS.md`, `DECISIONS.md`,
`CLAUDE.md`, `README.md` and `ONBOARDING.md` are **sources** — and `ATTRIBUTIONS.md` is the
one that generates `/ledger`. Resolve it as derived and **a draft's credit rows vanish while
every page still reads perfectly**, which is this house's characteristic failure arriving
through a merge nobody looked at.

**`_headers` is half authored and half generated.** The CSP block between the markers is
`make-csp`'s and step 4 rewrites it. Everything else is authored — and on `drafts` or a
`draft/<slug>` branch that includes the `X-Robots-Tag: noindex` on `/*`, which **must survive
the merge and must never reach `main`**. Keep both sides: the branch's noindex, and main's
changes to the rest.

Everything else is real content and is read, not resolved mechanically. The four that
actually collide:

- **`changelog.html`** — two accessions at the top of the register. Keep both, newest first,
  and **move `· latest` so exactly one carries it**. `check-markup.mjs` fails if two do, or
  if a date increases down the page.
- **`index.html`** — two cards at the tail of the plate. Keep both, then read the result: a
  card can land inside the previous card's `.card-wrap`, which is valid markup and renders as
  one shared box. **`check-card-order.mjs` in step 4 catches the numbering**, not that.
- **`sitemap.xml`** — two rows. Keep both.
- **`DECISIONS.md` / `ATTRIBUTIONS.md`** — two entries at the top of the same section. Keep
  both. One line per paragraph in these two files; do not re-wrap what you did not write.

Then `git rebase --continue`.

### 4. Make every derived file current, and check the merged tree

```bash
node tools/check.mjs
```

Five generators in dependency order, then every gate, scoped to what moved. **A rebase can
produce a tree neither person ever had**, which is exactly what the gates are for. About 25s
when a page moved, seconds when none did; `--all` before anything that touches how the site
is built.

**Read the result, do not just take the exit code:**

- **No files changed** — the normal case. The other person regenerated before pushing.
- **Files changed after a clean pull** — their push was incomplete, and **the live site is
  serving a stale index or feed right now**. Say so plainly and commit the fix in step 6. It
  is not a reproach; it is what this step is for.
- **A gate fails on code you did not write** — say whose commit introduced it
  (`git log -1 --format='%an' -S'<the broken bit>' -- <file>`) rather than quietly fixing
  somebody's work, then offer to fix it.

### 5. On a draft branch, bring `main` in only if the draft needs it

```bash
git merge main
```

**The generated files will conflict and the regeneration is the resolution** — clear the
marker with either side, re-run step 4, commit what the generators write. `/ledger` is the
one to be careful with, for the reason in step 3.

Then confirm the branch still protects itself:

```bash
node tools/draft.mjs
```

**If it says DANGER, stop and fix it before anything else.** It means that branch's `_headers`
has no `/*` noindex rule, so its deploy is a fully crawlable copy of the published site.

**NOTHING EVER MERGES TOWARD `main`.** Not `drafts`, not a `draft/<slug>` branch, not "just
this once to save a step". That `X-Robots-Tag: noindex` on production drops every page on the
site out of every index, and it is silent. **Publication takes files, and `publish-draft` is
the skill that does it.**

### 6. Report, then commit only what regeneration produced

Tell them what landed as editorial news rather than as a git log:

```bash
git log --oneline <before>..HEAD
git diff --name-status <before>..HEAD -- '*.html' | grep '^A'
grep -o 'qe-card-no">No\.&nbsp;[0-9]*' index.html | sed 's/.*;//' | sort -n | tail -1
```

Say which sheets are new and what each one is, which labels were corrected, and what the next
free sheet number is now. **If they are drafting under a number that has just been taken, lead
with that** — renumbering is free before a push and painful after it.

Then:

- **Derived files changed in step 4** → commit them, with a message naming whose sheet they
  were stale for, and **offer** to push.
- **Local commits waiting** (`ahead N`) → say so. On a draft branch that is `save-draft`; on
  `main` it is a push that deploys, so ask before doing it.
- **Nothing changed** → say the checkout is current, in one line. A sync that found nothing
  should not produce a summary.

---

## Notes

- **Never push as a side effect.** Syncing is pulling. A push to `main` deploys to
  queering.earth, and that is a deliberate act with a skill of its own.
- **Never `git reset --hard`, `git checkout .`, or `git stash drop`.** If the tree is in a
  state this skill cannot resolve, stop and describe it. Uncommitted work on a sheet is not
  in git's history and cannot be recovered from it.
- **Never rewrite a commit that is already on the remote**, `--amend` included. The other
  person has it.
- **Never resolve a conflict by picking the side that makes the gates pass.** The gates check
  shape, and a dropped attribution is the right shape.
- The reasoning is `CLAUDE.md` → *Two people work here*, *What a session knows on one machine*,
  and *A draft is reviewed at a real address*.
