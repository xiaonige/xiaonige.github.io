// Build the single GitHub Pages artifact used by Actions deployment:
//   <root>/          -> formal site (no drafts), equivalent to build:formal
//   <root>/astro-preview/ -> preview site (drafts included), URL-prefixed
// Also writes .nojekyll so GitHub Pages serves files verbatim.
//
// Output directory: .actions-artifact  (uploaded by actions/upload-pages-artifact)
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { prefixPreview, PREVIEW_BASE } from './preview-prefix.mjs';

const out = path.resolve('.actions-artifact');

async function run(cmd, args, env) {
  execFileSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } });
}

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

// 1) Clean output.
await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });

// 2) Formal build -> artifact root.
console.log('>>> Building formal site...');
run('npm', ['run', 'build:formal']);
await copyDir(path.resolve('dist'), out);

// 3) Preview build (drafts included) -> artifact/astro-preview/.
console.log('>>> Building preview site (drafts included)...');
run('npm', ['run', 'build:preview']);
const previewStage = path.resolve('.preview-stage');
await fs.rm(previewStage, { recursive: true, force: true });
await copyDir(path.resolve('dist'), previewStage);
await prefixPreview(previewStage);
await fs.writeFile(
  path.join(previewStage, 'PREVIEW_README.txt'),
  `Astro preview build. This subdirectory is for testing only and does not replace the main site.\nBase path: ${PREVIEW_BASE}\n`,
);
await copyDir(previewStage, path.join(out, 'astro-preview'));
await fs.rm(previewStage, { recursive: true, force: true });

// 4) Bypass Jekyll processing.
await fs.writeFile(path.join(out, '.nojekyll'), '');

console.log(`Actions artifact ready at ${out}`);
console.log('  /                 formal site');
console.log(`  ${PREVIEW_BASE}          preview site (drafts)`);
