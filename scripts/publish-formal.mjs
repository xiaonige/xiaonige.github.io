import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const pub = '/root/workspace/xiaonige.github.io';
const dist = path.resolve('dist');
const msg = process.argv.slice(2).join(' ') || '更新 Astro 正式站';
const preserve = new Set(['.git', '.gitignore', 'astro-preview']);

execFileSync('npm', ['run', 'build:formal'], { stdio: 'inherit' });

await syncRoot(dist, pub);
await fs.writeFile(path.join(pub, '.nojekyll'), '');

validate(pub);

execFileSync('git', ['-C', pub, 'status', '--short'], { stdio: 'inherit' });
execFileSync('git', ['-C', pub, 'add', '-A'], { stdio: 'inherit' });
try {
  execFileSync('git', ['-C', pub, 'commit', '-m', msg], { stdio: 'inherit' });
} catch {
  console.log('No formal site changes to commit.');
}
execFileSync('git', ['-C', pub, 'push', 'origin', 'master'], { stdio: 'inherit' });
console.log('Formal site published: https://xiaonige.github.io/');

async function syncRoot(srcRoot, dstRoot) {
  const src = path.resolve(srcRoot);
  const dst = path.resolve(dstRoot);
  await assertDir(src);
  await assertDir(dst);

  for (const entry of await fs.readdir(dst, { withFileTypes: true })) {
    if (preserve.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    try {
      await fs.access(srcPath);
    } catch {
      await remove(path.join(dst, entry.name));
    }
  }

  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (preserve.has(entry.name)) continue;
    await remove(d);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

function validate(root) {
  for (const rel of ['index.html', 'archives/index.html', 'search.xml', 'rss.xml', 'sitemap.xml', 'site-data.json', 'robots.txt']) {
    execFileSync('test', ['-f', path.join(root, rel)], { stdio: 'inherit' });
  }
  execFileSync('test', ['-d', path.join(root, 'astro-preview')], { stdio: 'inherit' });
  execFileSync('test', ['-f', path.join(root, '.gitignore')], { stdio: 'inherit' });
  execFileSync('sh', ['-c', `! test -e ${quote(path.join(root, 'drafts'))}`], { stdio: 'inherit' });
}

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function remove(target) {
  await fs.rm(target, { recursive: true, force: true });
}

async function assertDir(target) {
  const stat = await fs.stat(target);
  if (!stat.isDirectory()) throw new Error(`${target} is not a directory`);
}


function quote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}
