import fs from 'node:fs/promises';
import path from 'node:path';

const oldRoot = '/root/workspace/xiaonige.github.io/2026';
const newRoot = path.resolve('dist/2026');
const oldUrls = await collectUrls(oldRoot, '/2026');
const newUrls = await collectUrls(newRoot, '/2026');
const missing = [...oldUrls].filter((u) => !newUrls.has(u));
const extra = [...newUrls].filter((u) => !oldUrls.has(u));
console.log(`Old 2026 URLs: ${oldUrls.size}`);
console.log(`New 2026 URLs: ${newUrls.size}`);
if (missing.length) {
  console.error('Missing old URLs in Astro dist:');
  for (const u of missing) console.error(`  ${u}`);
  process.exitCode = 1;
}
if (extra.length) {
  console.log('New-only URLs:');
  for (const u of extra) console.log(`  ${u}`);
}
if (!missing.length) console.log('URL compatibility OK for current 2026 pages.');

async function collectUrls(root, prefix) {
  const set = new Set();
  async function walk(dir) {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name === 'index.html') {
        const rel = path.relative(root, path.dirname(p)).split(path.sep).join('/');
        set.add(`${prefix}/${rel ? rel + '/' : ''}`);
      }
    }
  }
  await walk(root);
  return set;
}
