import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { prefixPreview, PREVIEW_BASE } from './preview-prefix.mjs';

const pub = '/root/workspace/xiaonige.github.io';
const dist = path.resolve('dist');
const target = path.join(pub, 'astro-preview');
const msg = process.argv.slice(2).join(' ') || '更新 Astro 预览';

execFileSync('npm', ['run', 'build:preview'], { stdio: 'inherit' });

await fs.rm(target, { recursive: true, force: true });
await fs.mkdir(target, { recursive: true });
await copyDir(dist, target);
await prefixPreview(target);
await fs.writeFile(
  path.join(target, 'PREVIEW_README.txt'),
  `Astro preview build. This subdirectory is for testing only and does not replace the main xiaonige.github.io site.\nBase path: ${PREVIEW_BASE}\n`,
);
execFileSync('git', ['-C', pub, 'add', 'astro-preview'], { stdio: 'inherit' });
try {
  execFileSync('git', ['-C', pub, 'commit', '-m', msg], { stdio: 'inherit' });
} catch {
  console.log('No preview changes to commit.');
}
execFileSync('git', ['-C', pub, 'push', 'origin', 'master'], { stdio: 'inherit' });
console.log('Preview published: https://xiaonige.github.io/astro-preview/');

async function copyDir(src, dst) {
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) { await fs.mkdir(d, { recursive: true }); await copyDir(s, d); }
    else await fs.copyFile(s, d);
  }
}
