# Welcome to Queering Earth

This is the way in for a new collaborator. It is written for you and for the Claude Code session sitting beside you — read it together, and let the session run the commands.

**Queering Earth** reads the world through a queering lens — art, literature, poetry, politics, people, and history — and asks what else any of it could have been. It is a collaboration between the [Stimpunks Foundation](https://stimpunks.org/) and [More Realms](https://morerealms.com/), and it is live at [queering.earth](https://queering.earth/).

**You are a full collaborator, not a reviewer.** Ryan Boren and Helen Edgar both draft, both review, and both publish. There is no tier, no approval queue, and no branch you are kept off. What follows is plumbing, and it is the last plumbing you will have to think about.

## What you need, once, in about twenty minutes

**You have Claude Code already.** Open this repository as a folder in it and everything below is something you can ask for rather than type. When a step names a command, your session can run it — the repository ships a pre-approved list, so most of them will not even stop to ask.

**1. Git.** macOS ships it behind the developer tools. Ask your session to run `git --version`; if macOS offers to install something, say yes and wait.

**2. Node 22 or newer.** The site has no build step and no dependencies — nothing here ever needs `npm install` — but the tools that check the site are Node scripts. Ask your session to run `node --version`. If that comes back empty or below 22, install the LTS release from [nodejs.org](https://nodejs.org/) and run it again.

**3. Access to the repository.** Ryan adds you as a collaborator on `Stimpunks/Queering-Earth`; GitHub emails you an invitation and you accept it in the browser. That is the only time you will see GitHub.

**4. Sign in to GitHub from the machine, once.** Install the GitHub CLI if it is missing (`brew install gh`, or ask your session), then run `gh auth login` and choose **GitHub.com**, **HTTPS**, and **Login with a web browser**. It gives you a code, opens the browser, and you approve it there. **Never paste a password or a token into the chat**, and never ask Claude to type one for you — that is the one thing a session here will refuse, and it is right to.

**5. Clone the repository.**

```bash
gh repo clone Stimpunks/Queering-Earth ~/Documents/GitHub/Queering-Earth
```

That path is worth matching, because the repository's own rules name it.

## Look at the site before you change anything

```bash
node tools/serve.mjs
```

Then open the address it prints. **Do not open the HTML files directly** — every address on this site is extensionless (`on-being-ill.html` on disk is `/on-being-ill` on the web) and that mapping is something a server does. A page opened as a file will look broken, and nothing is wrong.

## How the work actually happens

**You never write HTML and you never type a git command.** You say what a sheet is, what it argues, and which words are quoted; the session writes the markup, runs the generators, runs the checks, and handles every branch and commit. That is the whole arrangement, and it is why this is worth setting up at all.

Six skills do the recurring work. You invoke them by describing what you want, not by name.

| skill | say something like |
|---|---|
| **sync** | *"Catch me up"* — pulls what Ryan pushed, rebuilds everything derived, and says what landed |
| **start-draft** | *"Start a draft on Bishop's 'One Art'"* — puts a page on the drafts branch and prints a review URL |
| **save-draft** | *"Save the draft"* — commits, pushes, and the same URL updates |
| **publish-draft** | *"Publish the draft"* — accessions the sheet and puts it live |
| **credit-source** | *"Who actually said this?"* — verifies an attribution against the primary and logs it |
| **sks-search** | *"Have we written about this before?"* — searches our own library before the open web |

**Sync first, always.** Two people push here, so your checkout is a guess until you ask. It is
also the one command that repairs what a plain pull leaves broken — every generated file still
describing the site as it was before the other person's sheet landed.

**A sheet's normal life:** sync, start a draft, work on it, send the review URL to the other collaborator, they annotate it in the page itself and send the notes back, save, repeat, publish. The review layer is built into the draft — every block grows a **Note** button, the notes live only in that reader's own browser, and **Copy my notes** hands them back as plain text. No account, no pull request, nothing to install.

## The three things this house cares about most

**Attribution is a correctness requirement.** The characteristic failure here is not an invented source — it is a *tightened* one: a line trimmed to fit, an object quietly generalised, the attribution left attached. **If we changed the words, they are ours.** Credit the concept, quote the original exactly, or write our own line. `ATTRIBUTIONS.md` records every quotation and which copy we read.

**The checks are one command.** `node tools/check.mjs` regenerates everything derived and runs all nine gates, scoped to what you changed — about twenty-five seconds for a one-page edit. `node tools/check.mjs --all` sweeps the whole site in about five minutes. Run it before publishing; your session will.

**Some files are generated and must not be hand-edited.** Every `.md` beside a page, `llms.txt`, `feed.xml`, `register.xml`, `search-index.json` and parts of three pages are written by tools in `tools/`. Edit the page, re-run the generator. A check will tell you if you forget.

## You cannot really break this

Everything is in git, so nothing is lost and everything is reversible. Drafts live on their own branch, carry `noindex`, and are not part of the published site. The gates fail loudly and by name.

**One command still asks you every time, on purpose: `git push` to `main`.** That is the step that deploys to queering.earth, and it is the only outward-facing, hard-to-take-back thing in the workflow. Everything else the tools need is pre-approved in `.claude/settings.json` so you are not interrupted forty times a sweep.

## What only a person can decide

The session can measure contrast, balance tags, and check a hash. It cannot decide whether a reading is true, whose name belongs on a byline, or whether a sentence is the one you meant. **The byline is per-sheet and it is a name, not an institution** — "Helen Edgar", "Ryan Boren", or both. Say which, because a session will not guess.

## Where the rules live

| file | what it is |
|---|---|
| `CLAUDE.md` | the rules, in detail — your session reads this so you do not have to |
| `DECISIONS.md` | what is settled, what is open, and why each thing was decided that way |
| `ATTRIBUTIONS.md` | the quotation ledger — source, link, verification date |
| `README.md` | the short version of the layout and the checks |

**A good first session is a real one.** Pick something you have wanted to write, say *"start a draft on it"*, and let the session carry the rest.
