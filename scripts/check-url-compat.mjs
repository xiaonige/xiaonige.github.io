import fs from 'node:fs/promises';
import path from 'node:path';

const checks = [
  {
    label: '2026 published URLs',
    oldRoot: '/root/workspace/xiaonige.github.io/2026',
    newRoot: path.resolve('dist/2026'),
    prefix: '/2026',
    mode: 'exact'
  },
  {
    label: 'selected 2023 migrated URLs',
    required: ['/2023/12/27/qiu-tu-jian-shen/'],
    newRoot: path.resolve('dist/2023'),
    prefix: '/2023',
    mode: 'required-only'
  }
];

let failed = false;
for (const check of checks) {
  const newUrls = await collectUrls(check.newRoot, check.prefix);
  if (check.mode === 'exact') {
    const oldUrls = await collectUrls(check.oldRoot, check.prefix);
    const missing = [...oldUrls].filter((u) => !newUrls.has(u));
    const extra = [...newUrls].filter((u) => !oldUrls.has(u));
    console.log(`${check.label}: old=${oldUrls.size}, new=${newUrls.size}`);
    if (missing.length) {
      console.error(`Missing old URLs for ${check.label}:`);
      for (const u of missing) console.error(`  ${u}`);
      failed = true;
    }
    if (extra.length) {
      console.log(`New-only URLs for ${check.label}:`);
      for (const u of extra) console.log(`  ${u}`);
    }
  } else {
    const missing = check.required.filter((u) => !newUrls.has(u));
    console.log(`${check.label}: required=${check.required.length}, new=${newUrls.size}`);
    if (missing.length) {
      console.error(`Missing required migrated URLs for ${check.label}:`);
      for (const u of missing) console.error(`  ${u}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log('URL compatibility OK for configured current pages.');

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
