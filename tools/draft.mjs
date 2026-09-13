#!/usr/bin/env node
/**
 * draft.mjs — which branches hold drafts, which page each one is, and what publishing
 * one of them may take with it.
 *
 * ONE BRANCH PER DRAFT, since 2026-09-13. Both drafts used to live together on `drafts`,
 * and that shared branch produced, in one afternoon: a conflict in `ATTRIBUTIONS.md`
 * between two people's ledger rows, a published page (`/ledger`) left stale on the branch
 * by somebody else's edit, and a publish checklist that offered one person the other
 * person's page. None of those are mistakes anybody made. They are what a shared branch
 * is.
 *
 * `drafts` IS NOW A BASE AND NOT A PLACE TO WORK. It carries the branch furniture and
 * nothing else: the `X-Robots-Tag: noindex` block in `_headers`, which must never reach
 * `main`, and `review-practice.html`. Every draft branch is cut from it and inherits both.
 * Nothing is drafted on it.
 *
 * THE PER-BRANCH MODEL MADE THIS TOOL SIMPLER RATHER THAN HARDER. Scope used to be
 * derived by commit archaeology — a file belongs to this draft if a commit that touched
 * this draft's page also touched it — because two drafts' changes were interleaved on one
 * branch. With one draft to a branch the question is just "what differs from main",
 * minus the furniture, and the contested-file case cannot arise at all.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PREFIX = 'draft/';
const BASE = 'drafts';
const HOST_SUFFIX = '--queering-earth.netlify.app';

/* MATCH THE INCLUDE, NOT THE NAME. On a site that documents its own build, anything
 * matching a filename matches the prose about that filename — `check-metadata.mjs`
 * check 10 shipped with the bare string and fired on /changelog and /what-is-settled,
 * and this tool did the same an hour later. Prose writes `&lt;script` or wraps the name
 * in a `code` span, so the unescaped tag is the discriminator. */
const MARKER = '<script[^>]*src="[^"]*drafts/review\\.js';
export const DRAFT_INCLUDE = new RegExp(MARKER);

/** Never a draft page, however it is marked. Each entry says why. */
const NOT_A_DRAFT = new Map([
  ['review-practice.html', 'the practice sheet a reviewer learns the tool on; branch furniture, never published'],
]);

/** Carried by every draft branch and never publishable. Each entry says why. */
const FURNITURE = new Map([
  ['_headers', 'carries the branch-only X-Robots-Tag: noindex, which must never reach main'],
  ...NOT_A_DRAFT,
]);

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const addressOf = (f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''));

const PROJECT = 'queering-earth';
/* Netlify's own limit, from its branch-deploy dialog: "Your project name and branch name
 * combined have a character limit of 61." The subdomain is <branch>--<project>, so the
 * project eats 14 of it and `draft-` another 6 — leaving 39 characters for a slug.
 * `a-waste-garden-flowering-at-its-will` would be 36, so the real sheet names here fit,
 * but not by a wide margin. A branch over the limit gets no deploy URL, which would look
 * exactly like the branch simply not building. */
const LABEL_LIMIT = 61;

/** Netlify's branch subdomain: every run of non-alphanumerics becomes one dash. */
export const slugFor = (branch) =>
  branch.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const hostFor = (branch) => 'https://' + slugFor(branch) + HOST_SUFFIX;

/** Does this branch name fit in a Netlify subdomain? */
export function labelFits(branch) {
  const label = `${slugFor(branch)}--${PROJECT}`;
  return { ok: label.length <= LABEL_LIMIT, length: label.length, limit: LABEL_LIMIT, label };
}

/** Every draft branch, local or on the remote, deduplicated. */
export function draftBranches() {
  const out = new Set();
  for (const ref of ['refs/heads', 'refs/remotes/origin']) {
    let lines = '';
    try { lines = git('for-each-ref', '--format=%(refname:strip=2)', ref + '/' + PREFIX + '*'); }
    catch { continue; }
    for (const l of lines.split('\n').filter(Boolean)) {
      out.add(ref.startsWith('refs/remotes') ? l.replace(/^origin\//, '') : l);
    }
  }
  return [...out].sort();
}

/** The draft page on a branch: the root page carrying the marker. */
export function pageOn(branch) {
  let hits = [];
  try {
    hits = git('grep', '-lE', MARKER, branch, '--', '*.html')
      .split('\n').filter(Boolean)
      .map((l) => l.slice(l.indexOf(':') + 1))
      .filter((f) => !f.includes('/') && !NOT_A_DRAFT.has(f));
  } catch (e) {
    if (e.status !== 1) throw e;
  }
  return hits.sort()[0] ?? null;
}

/**
 * What publishing this branch takes.
 *
 * EVERYTHING THAT DIFFERS FROM MAIN, MINUS THE FURNITURE. A draft that grew a component
 * needs its rules in `queering.css`; one that quotes anybody needs its rows in
 * `ATTRIBUTIONS.md`; a new plate needs its variants and the manifest. None of that lives
 * in the page, and taking only the page publishes a sheet whose styles do not exist —
 * this house's characteristic failure, reached by a new road.
 */
export function scopeFor(branch) {
  let changed = [];
  try {
    /* TWO DOTS, NOT THREE. `main...branch` diffs the MERGE BASE against the branch, so a
       change that has since landed on main by another route is still listed even though
       the two tips now agree — `tools/make-whats-new.mjs` was offered that way, identical
       on both sides. Two dots compares the tips, which is the question being asked: what
       would actually change if this branch's version were taken. */
    changed = git('diff', '--name-only', 'main', branch).split('\n').filter(Boolean);
  } catch { /* no such branch */ }

  const take = [], derived = [], refused = [];
  for (const f of changed.sort()) {
    if (FURNITURE.has(f)) refused.push([f, FURNITURE.get(f)]);
    else if (isDerived(f)) derived.push(f);
    else take.push(f);
  }
  return { take, derived, refused };
}

/**
 * Written by a generator, so publishing rebuilds it from the sources above.
 *
 * DECLARED RATHER THAN INFERRED, the two-list shape `check-cache.mjs` and `check.mjs`
 * already use: nothing in a file's bytes says whether a tool wrote it. Listing these as
 * things to take is not wrong so much as noise, and a checklist with noise in it is one
 * people skim — which matters when the list is what keeps two people out of each other's
 * work.
 */
const DERIVED = [
  /^(llms|llms-full)\.txt$/,                    // the agent indexes
  /^(feed|register)\.xml$/,                     // the two feeds
  /^search-index\.json$/,                       // the finding aid's index
  /^(ledger|what-is-settled|whats-new)\.html$/,  // authored pages with generated bodies
];

/* A `.md` IS DERIVED ONLY IF A PAGE OF THAT NAME EXISTS, which is a test rather than a
   list. `make-markdown.mjs` writes a sibling beside every page, so `on-being-ill.md` is
   generated — but `ATTRIBUTIONS.md`, `DECISIONS.md`, `CLAUDE.md` and `README.md` are
   SOURCES, and ATTRIBUTIONS.md is the one that generates `/ledger`. A bare `\.md$` rule
   filed it as derived and would have left a draft's ledger rows behind at publication,
   silently, with the page shipping and the credit missing. */
const isDerived = (f) => {
  if (DERIVED.some((re) => re.test(f))) return true;
  if (!f.endsWith('.md') || f.includes('/')) return false;
  return existsSync(join(process.cwd(), f.replace(/\.md$/, '.html')))
      || existsSync(join(ROOT, f.replace(/\.md$/, '.html')));
};

/* ── the predicate the generators ask ──────────────────────────────────────────
 * A draft has no canonical, no group in pages.mjs and no accession, all by design, so
 * `make-whats-new`, `make-markdown` and `make-search-index` would each throw or index
 * prose nobody has published. */

export function isDraftPage(path) {
  try { return DRAFT_INCLUDE.test(readFileSync(path, 'utf8')); } catch { return false; }
}

let publishedCache = null;
function publishedSet(root) {
  if (publishedCache) return publishedCache;
  let xml = '';
  try { xml = readFileSync(join(root, 'sitemap.xml'), 'utf8'); } catch { /* no manifest */ }
  publishedCache = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''))
      .map((a) => (a === '/' ? 'index.html' : a.replace(/^\//, '') + '.html'))
  );
  return publishedCache;
}

/**
 * A draft is a page carrying the marker that the manifest does not list.
 *
 * BOTH HALVES ARE LOAD-BEARING. Filtering on the marker alone disarms `check-metadata.mjs`
 * check 10 — a published page that kept its draft block is exactly what that check exists
 * to catch, and a marker-only filter drops it before the check can see it — and it makes
 * `make-markdown.mjs` throw on that same page with a message about `llms.txt` groups.
 * Proved by putting the block on a published page and watching both happen.
 */
export function isDraft(root, file) {
  return !publishedSet(root).has(file) && isDraftPage(join(root, file));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, arg] = process.argv.slice(2);

  if (cmd === 'scope') {
    if (!arg) { console.error(`\nUsage: node tools/draft.mjs scope ${PREFIX}<slug>\n`); process.exit(2); }
    const { take, derived, refused } = scopeFor(arg);
    if (!take.length && !derived.length && !refused.length) {
      console.error(`\nNothing differs between main and ${arg} — is that a branch?\n`); process.exit(1);
    }
    console.log(`\nPublishing ${arg} takes:\n`);
    for (const f of take) console.log('  take      ' + f);
    for (const [f, why] of refused) console.log(`  never     ${f}  — ${why}`);
    if (derived.length) {
      console.log('\n  Regenerated on main once the sources above are taken — do not take these:\n');
      for (const f of derived) console.log('  derived   ' + f);
    }
    console.log();
    process.exit(0);
  }

  const branches = draftBranches();
  if (!branches.length) {
    console.log(`\nNo draft branches. Start one with the start-draft skill.`);
    console.log(`(Draft branches are named ${PREFIX}<slug> and cut from ${BASE}.)\n`);
    process.exit(0);
  }

  console.log(`\n${branches.length} draft branch${branches.length > 1 ? 'es' : ''}:\n`);
  for (const b of branches) {
    const page = pageOn(b);
    console.log(`  branch    ${b}`);
    console.log(`  page      ${page ?? '(none carrying the draft block)'}`);
    if (page) console.log(`  read it   ${hostFor(b)}${addressOf(page)}`);
    const fit = labelFits(b);
    if (!fit.ok)
      console.log(`  WARNING   the Netlify subdomain would be ${fit.length} characters and the ` +
                  `limit is ${fit.limit} — this branch gets no deploy URL, which looks exactly ` +
                  `like it simply never built. Rename it shorter.`);
    console.log();
  }
}
