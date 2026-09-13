#!/usr/bin/env node
/**
 * draft.mjs — which page is the draft, and where does a reviewer read it?
 *
 * ONE DERIVATION, BECAUSE THREE SKILLS ASK THE SAME QUESTION. `start-draft`,
 * `save-draft` and `publish-draft` all need to know which file on the `drafts`
 * branch is the thing being worked on. Written out three times it would be three
 * answers the day one of them was edited — the drift this repo warns about, in the
 * one place where getting it wrong means publishing the wrong page.
 *
 * THE DRAFT IS IDENTIFIED BY ITS MARKER, NOT BY A NAME KEPT SOMEWHERE. A draft is a
 * root page on the `drafts` branch carrying the three-line draft block, which is the
 * same fact `check-metadata.mjs` check 10 keys on. No state file, nothing to get out
 * of step, and nothing to remember between sessions. The marker is the deleted-on-
 * publish line, so a page stops being a draft at exactly the moment it is published.
 *
 * IT READS THE BRANCH THROUGH GIT, so it is correct from `main`, from `drafts`, or
 * from a worktree, without switching anything or caring what is checked out.
 *
 * ONE EXCEPTION, DECLARED. `review-practice.html` carries the marker for ever: it is
 * the page a reviewer learns the tool on, it lives only on this branch, and it is
 * never published. Left underclared it would be reported as the current draft every
 * time, which is the reading that makes this tool useless rather than merely wrong.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const BRANCH = 'refs/heads/drafts';
/* MATCH THE INCLUDE, NOT THE NAME — the third time in one day. `check-metadata.mjs`
 * check 10 shipped with the bare string and fired on /changelog and /what-is-settled
 * the moment the feature was written up on them; so did this, an hour later, from the
 * same instinct. On a site that documents its own build, ANY gate or tool matching a
 * filename matches the prose about that filename. Prose writes `&lt;script` or wraps
 * the name in a `code` span, so the unescaped tag is the discriminator. */
const MARKER = '<script[^>]*src="[^"]*drafts/review\\.js';
const HOST = 'https://drafts--queering-earth.netlify.app';

/** Never a draft, however it is marked. Each entry says why. */
const NOT_A_DRAFT = new Map([
  ['review-practice.html', 'the practice sheet a reviewer learns the tool on; branch-only, never published'],
]);

/* stderr is CAPTURED RATHER THAN INHERITED, so a handled failure stays handled.
 * `git cat-file -e` on a path that is new prints `fatal: path ... exists on disk,
 * but not in refs/heads/main` — which is the ANSWER to isRevision(), not an error,
 * and it was being printed to the reader in the middle of the tool's own output
 * every time a new-page draft was started. It is still on the error object if an
 * unexpected failure ever needs reporting. */
/** The same pattern as a JS regex, from the same string, so a generator and this tool
 *  can never disagree about what a draft is. ERE and JS agree on this much syntax. */
export const DRAFT_INCLUDE = new RegExp(MARKER);

/**
 * Is the page at this path a draft?
 *
 * THE GENERATORS ASK THIS AND THEY MUST, because a draft breaks all three of them. Every
 * one reads every root `.html`: `make-whats-new.mjs` throws on a page with no
 * `rel=canonical`, `make-markdown.mjs` throws on a page in no group in `pages.mjs`, and
 * `make-search-index.mjs` would index prose nobody has agreed to publish. A draft has
 * none of those things BY DESIGN — they are accession, and a draft is not accessioned —
 * so the generators could not be run on the drafts branch at all, which took
 * `check-metadata.mjs` down with them and left the branch unable to check anything but
 * its markup.
 *
 * IT ASKS THE FILE AND NOT GIT, which is the difference from `currentDrafts()` above: a
 * generator is looking at a working tree, not at a branch, and it wants the answer for
 * the bytes in front of it.
 */
export function isDraftPage(path) {
  try { return DRAFT_INCLUDE.test(readFileSync(path, 'utf8')); } catch { return false; }
}

let publishedCache = null;

/** What `sitemap.xml` lists, as filenames. The site's own manifest of published addresses. */
function publishedSet(root) {
  if (publishedCache) return publishedCache;
  let xml = '';
  try { xml = readFileSync(join(root, 'sitemap.xml'), 'utf8'); } catch { /* no manifest, no published pages */ }
  publishedCache = new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''))
      .map((a) => (a === '/' ? 'index.html' : a.replace(/^\//, '') + '.html'))
  );
  return publishedCache;
}

/**
 * THE definition, and the one every tool should ask: a draft carries the marker AND the
 * manifest does not list it.
 *
 * BOTH HALVES ARE LOAD-BEARING, and the marker-only version was written first and was
 * wrong in two directions at once. It disarmed `check-metadata.mjs` check 10 — a
 * published page that kept its draft block is precisely what that check exists to catch,
 * and a marker-only filter drops it from the list before the check can see it. And it
 * made the generators throw on that same page with a message about `llms.txt` groups:
 * `make-markdown.mjs` skipped it as a draft, `pages.mjs` still named it, and the error a
 * reader got pointed at the wrong thing entirely. Proved by putting the block on a
 * published page and watching both happen.
 */
export function isDraft(root, file) {
  return !publishedSet(root).has(file) && isDraftPage(join(root, file));
}

const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

/** The address a page answers at, house style: extensionless, index at the root. */
const addressOf = (f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''));

/** git grep, with "no matches" treated as the empty answer it is rather than a failure. */
function grepFor(args) {
  try {
    return git('grep', ...args)
      .split('\n').filter(Boolean)
      .map((l) => (l.startsWith(BRANCH + ':') ? l.slice(BRANCH.length + 1) : l))
      .filter((f) => !f.includes('/'));            // root pages only, as everything here is
  } catch (e) {
    if (e.status === 1) return [];                 // git grep: no matches
    throw e;
  }
}

export function currentDrafts() {
  const hits = new Set(grepFor(['-lE', MARKER, BRANCH, '--', '*.html']));

  /* THE WORKING TREE COUNTS WHEN IT IS THE BRANCH'S OWN, and leaving it out was a real
     fault found by walking the workflow rather than reading it. A draft that has been
     written but not yet committed lives nowhere in `refs/heads/drafts`, so the committed
     scan alone reported "no draft in progress" for the whole of `start-draft` and for the
     FIRST `save-draft` — which is the one run where the skill is told to stop and ask.
     `--untracked` is the half that matters: a brand-new sheet is not in the index either. */
  if (onDraftsBranch()) for (const f of grepFor(['-lE', '--untracked', MARKER, '--', '*.html'])) hits.add(f);

  return [...hits].filter((f) => !NOT_A_DRAFT.has(f)).sort();
}

function onDraftsBranch() {
  try { return git('branch', '--show-current').trim() === 'drafts'; } catch { return false; }
}

/** Is this draft a revision of a page that is already published, or a new one? */
export function isRevision(file) {
  try {
    git('cat-file', '-e', `refs/heads/main:${file}`);
    return true;
  } catch { return false; }
}

/**
 * What publishing ONE draft may take with it.
 *
 * WRITTEN THE DAY A SECOND PERSON STARTED A SECOND DRAFT, which turned a sentence in
 * `publish-draft` from loose into dangerous. It said: ask `git diff --stat main...drafts`
 * what moved, and "everything that comes back is in scope". With one draft on the branch
 * that was true. With two it offers you the other person's page and the other person's
 * edits to shared files, at the exact moment somebody is working through a checklist and
 * inclined to trust the tool.
 *
 * SCOPE IS DERIVED FROM COMMITS, NOT FROM THE BRANCH DIFF. A file is this draft's if it
 * was touched by a commit that also touched this draft's page. Everything else on the
 * branch is somebody else's, or is branch furniture that must never travel.
 *
 * IT REPORTS RATHER THAN DECIDES on a file both drafts have touched. That is a genuine
 * collision between two people's work and the answer is a conversation, not a heuristic.
 */
export function scopeFor(file) {
  const commits = git('log', '--format=%H', 'main..drafts', '--', file).split('\n').filter(Boolean);
  const filesOf = (c) => git('show', '--pretty=', '--name-only', c).split('\n').filter(Boolean);

  const mine = new Set();
  for (const c of commits) for (const f of filesOf(c)) mine.add(f);

  const others = new Set();
  for (const d of currentDrafts()) {
    if (d === file) continue;
    for (const c of git('log', '--format=%H', 'main..drafts', '--', d).split('\n').filter(Boolean))
      for (const f of filesOf(c)) others.add(f);
  }

  const NEVER = new Map([
    ['_headers', 'carries the branch-only X-Robots-Tag: noindex, which must never reach main'],
    ...[...NOT_A_DRAFT].map(([f, why]) => [f, why]),
  ]);

  /* A COMMIT TOUCHED IT IS NOT THE SAME AS IT STILL DIFFERS. The zine setting was added
     to queering.css and then taken out again, so that file is byte-identical to main and
     taking it would be a no-op — but it was listed, because a commit on this draft had
     touched it. A publish checklist that names files needing nothing is a checklist
     somebody stops reading. */
  const differs = (f) => {
    try { git('diff', '--quiet', 'main', '--', f); return false; } catch { return true; }
  };

  const take = [], contested = [], refused = [];
  for (const f of [...mine].sort()) {
    if (NEVER.has(f)) refused.push([f, NEVER.get(f)]);
    else if (others.has(f)) contested.push([f, 'also touched by another draft on this branch']);
    else if (differs(f)) take.push(f);
  }
  const theirs = [...others].filter((f) => !mine.has(f) && !NEVER.has(f)).sort();
  return { take, contested, refused, theirs };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, arg] = process.argv.slice(2);

  if (cmd === 'scope') {
    const file = arg;
    if (!file) { console.error('\nUsage: node tools/draft.mjs scope <draft>.html\n'); process.exit(2); }
    const { take, contested, refused, theirs } = scopeFor(file);
    console.log(`\nPublishing ${file} takes:\n`);
    for (const f of take) console.log('  take      ' + f);
    for (const [f, why] of contested) console.log(`  ASK       ${f}  — ${why}`);
    for (const [f, why] of refused)   console.log(`  never     ${f}  — ${why}`);
    if (theirs.length) {
      console.log('\nNot yours — another draft on this branch owns these:\n');
      for (const f of theirs) console.log('  leave     ' + f);
    }
    if (contested.length)
      console.log('\nA contested file is a real collision between two people\'s work.\n' +
                  'Stop and agree what to do with it rather than picking one side here.');
    console.log();
    process.exit(0);
  }

  const drafts = currentDrafts();

  if (!drafts.length) {
    console.log('\nNo draft in progress on the drafts branch.');
    console.log('Start one with the start-draft skill.\n');
    process.exit(0);
  }

  console.log(`\n${drafts.length} draft${drafts.length > 1 ? 's' : ''} in progress:\n`);
  for (const f of drafts) {
    console.log(`  file      ${f}`);
    console.log(`  kind      ${isRevision(f) ? 'a revision of a page that is already published' : 'a new page'}`);
    console.log(`  read it   ${HOST}${addressOf(f)}`);
    console.log();
  }

  if (drafts.length > 1)
    console.log('More than one at a time is allowed and is not the usual case —\n' +
                'publish-draft must be told which one.\n');
}
