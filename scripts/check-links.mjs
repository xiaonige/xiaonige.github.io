import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const allowExternal = /^(https?:|mailto:|tencent:|#|javascript:)/i;
let failed = false;
let checked = 0;

async function existsForUrl(url) {
  const clean = decodeURI(url.split('#')[0].split('?')[0]);
  if (!clean || clean === '/') return true;
  if (!clean.startsWith('/')) return true;
  const rel = clean.replace(/^\//, '');
  const candidates = [path.join(dist, rel), path.join(dist, rel, 'index.html')];
  return (await Promise.all(candidates.map(async (p) => fs.access(p).then(() => true).catch(() => false)))).some(Boolean);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) await checkFile(p);
  }
}

async function checkFile(file) {
  const html = await fs.readFile(file, 'utf8');
  const attrs = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map((m) => m[1]);
  for (const url of attrs) {
    if (allowExternal.test(url)) continue;
    checked++;
    if (!(await existsForUrl(url))) {
      failed = true;
      console.error(`${path.relative(dist, file)} -> missing ${url}`);
    }
  }
}

await walk(dist);
console.log(`Checked ${checked} internal links/assets.`);
if (failed) process.exit(1);
console.log('Link check OK.');
