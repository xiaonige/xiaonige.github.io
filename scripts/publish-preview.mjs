import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const pub = '/root/workspace/xiaonige.github.io';
const dist = path.resolve('dist');
const target = path.join(pub, 'astro-preview');
const msg = process.argv.slice(2).join(' ') || '更新 Astro 预览';

execFileSync('npm', ['run', 'build:preview'], { stdio: 'inherit' });

await fs.rm(target, { recursive: true, force: true });
await fs.mkdir(target, { recursive: true });
await copyDir(dist, target);
await prefixPreview(target);
await fs.writeFile(path.join(target, 'PREVIEW_README.txt'), 'Astro preview build. This subdirectory is for testing only and does not replace the main xiaonige.github.io site.\n');
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

async function prefixPreview(root) {
  const files = [];
  await collect(root, files);
  for (const file of files) {
    let s = await fs.readFile(file, 'utf8');
    s = s.replace(/fetch\(['"]\/search\.xml['"]\)/g, "fetch('/astro-preview/search.xml')");
    s = s.replace(/fetch\(['"]\/site-data\.json['"]\)/g, "fetch('/astro-preview/site-data.json')");
    s = s.replace(/href="\//g, 'href="/astro-preview/');
    s = s.replace(/src="\//g, 'src="/astro-preview/');
    s = s.replace(/content="\//g, 'content="/astro-preview/');
    s = s.replace(/url\('\//g, "url('/astro-preview/");
    s = s.replace(/url\("\//g, 'url("/astro-preview/');
    s = s.replace(/url\(\//g, 'url(/astro-preview/');
    s = s.replace(/<url>\//g, '<url>/astro-preview/');
    s = s.replace(/<link>\//g, '<link>/astro-preview/');
    s = s.replace(/<guid>\//g, '<guid>/astro-preview/');
    s = s.replace(/&#34;\//g, '&#34;/astro-preview/');
    s = s.replace(/&quot;\//g, '&quot;/astro-preview/');
    s = s.replace(/"\//g, '"/astro-preview/');
    s = s.replace(/https:\/\/xiaonige\.github\.io\//g, 'https://xiaonige.github.io/astro-preview/');
    while (s.includes('/astro-preview/astro-preview/')) s = s.replaceAll('/astro-preview/astro-preview/', '/astro-preview/');
    await fs.writeFile(file, s, 'utf8');
  }
}
async function collect(dir, out) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await collect(p, out);
    else if (/\.(html|xml|css|json|js)$/.test(e.name)) out.push(p);
  }
}
