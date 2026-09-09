#!/usr/bin/env node
/* Minimal static file server for local render checks — the print and contrast
   passes need the site served, because opening a file:// URL drops the relative
   stylesheet and queering.js. Local dev tool. Netlify does not run it.

   ROOT IS THE REPO, NOT THE WORKING DIRECTORY.
   Star Stuff's copy of this file roots at process.cwd(), which quietly serves
   whatever directory you happened to start it from — a wrong-directory run looks
   exactly like a site with every page missing. Deriving the root from the script's
   own location makes `node /abs/path/tools/serve.mjs` correct from anywhere, which
   is what a Browser-pane launch config and a check script both need. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 8766;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  // AVIF was missing until 2026-09-09, so the local server sent the plates as
  // application/octet-stream and the browser sniffed them. Production sets
  // X-Content-Type-Options: nosniff, so a type this server gets wrong is a type the
  // live site cannot recover from — and <picture> does NOT fall through to the next
  // <source> when one fails to decode; the choice is made on type, before the fetch.
  '.avif': 'image/avif',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  try {
    let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    // Keep the server inside ROOT: normalize, then reject anything climbing out.
    const path = normalize(join(ROOT, rel));
    if (!path.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }

    let target = path;
    try { if ((await stat(target)).isDirectory()) target = join(target, 'index.html'); }
    catch { /* fall through to the .html retry below */ }

    let body;
    try {
      body = await readFile(target);
    } catch {
      // Netlify serves clean URLs, so /changelog must answer as changelog.html.
      target = path + '.html';
      body = await readFile(target);
    }
    res.writeHead(200, {
      'content-type': TYPES[extname(target)] || 'application/octet-stream',
      'cache-control': 'no-store',
    }).end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found');
  }
}).listen(PORT, () => console.log(`serving ${ROOT} at http://localhost:${PORT}`));
