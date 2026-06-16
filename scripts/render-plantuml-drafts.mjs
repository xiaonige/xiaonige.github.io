import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const draftsDir = path.resolve('src/content/drafts');
const outRoot = path.resolve('public/generated/plantuml');
const manifest = {};
await fs.mkdir(outRoot, { recursive: true });

const files = await fs.readdir(draftsDir).catch(() => []);
for (const file of files.filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const full = path.join(draftsDir, file);
  const text = await fs.readFile(full, 'utf8');
  const blocks = [...text.matchAll(/```plantuml\s*\n([\s\S]*?)```/g)].map((m) => m[1].trim());
  if (!blocks.length) continue;
  const dir = path.join(outRoot, slug);
  await fs.mkdir(dir, { recursive: true });
  manifest[slug] = [];
  for (let i = 0; i < blocks.length; i++) {
    const source = blocks[i];
    const hash = crypto.createHash('sha1').update(source).digest('hex').slice(0, 12);
    const filename = `${String(i + 1).padStart(2, '0')}-${hash}.svg`;
    const out = path.join(dir, filename);
    try {
      await fs.access(out);
    } catch {
      const res = await fetch('https://kroki.io/plantuml/svg', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: source
      });
      if (!res.ok) throw new Error(`Kroki render failed ${res.status} for ${file} block ${i + 1}`);
      const svg = await res.text();
      await fs.writeFile(out, svg, 'utf8');
    }
    manifest[slug].push({ index: i + 1, src: `/generated/plantuml/${slug}/${filename}`, hash });
    console.log(`plantuml ${slug} #${i + 1} -> ${filename}`);
  }
}
await fs.writeFile(path.join(outRoot, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log(`PlantUML manifest written: ${Object.keys(manifest).length} draft(s).`);
