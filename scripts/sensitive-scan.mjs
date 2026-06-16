import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const scanDirs = ['src/content/posts', 'src/content/drafts'];
const forbidden = [
  /infypower/i,
  /飞充网/i,
  /fycev/i,
  /com\.infypower/i,
  /com\/infypower/i,
  /mgmt-api/i,
  /ces-core/i,
  /ces-admin/i,
  /dev-ocpp/i,
  /dev-aodc/i,
  /dev-mese/i,
  /dev-eschg/i,
  /dev-ihebs/i,
  /dev-ykc/i,
  /dev-dlt/i
];
let failed = false;
for (const dir of scanDirs) {
  await scan(path.join(root, dir));
}
if (failed) {
  console.error('Sensitive scan failed. Refuse to build.');
  process.exit(1);
}
console.log('Sensitive scan OK.');

async function scan(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) await scan(p);
      else if (/\.(md|mdx|astro|ts|js)$/.test(entry.name)) {
        const text = await fs.readFile(p, 'utf8');
        const lines = text.split(/\r?\n/);
        lines.forEach((line, idx) => {
          for (const re of forbidden) {
            if (re.test(line)) {
              failed = true;
              console.error(`${path.relative(root, p)}:${idx + 1}: ${line}`);
            }
          }
        });
      }
    }
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}
