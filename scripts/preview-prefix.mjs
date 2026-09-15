// Shared helper: rewrite an Astro build so it can live under /astro-preview/
// instead of the site root. Used by publish-preview.mjs (local publish) and
// build-actions-artifact.mjs (GitHub Actions deployment).
import fs from 'node:fs/promises';
import path from 'node:path';

export const PREVIEW_BASE = '/astro-preview/';

export async function prefixPreview(root) {
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
    while (s.includes('/astro-preview/astro-preview/')) {
      s = s.replaceAll('/astro-preview/astro-preview/', '/astro-preview/');
    }
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
