import fs from 'node:fs/promises';
import path from 'node:path';

const sourceDir = '/root/workspace/xiaonige-blog/source/_posts';
const targetDir = path.resolve('src/content/posts');
await fs.mkdir(targetDir, { recursive: true });

const files = (await fs.readdir(sourceDir)).filter((f) => f.endsWith('.md'));
for (const file of files) {
  const full = path.join(sourceDir, file);
  const raw = await fs.readFile(full, 'utf8');
  const { data, body } = parseFrontMatter(raw);
  const slug = slugFromFile(file);
  const normalized = normalizeFrontMatter(data);
  const out = stringifyFrontMatter(normalized) + '\n' + body.trimStart();
  await fs.writeFile(path.join(targetDir, `${slug}.md`), out, 'utf8');
  console.log(`migrated ${file} -> ${slug}.md`);
}

function slugFromFile(file) {
  return file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function parseFrontMatter(text) {
  if (!text.startsWith('---')) return { data: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end < 0) return { data: {}, body: text };
  const yaml = text.slice(3, end).trim();
  const body = text.slice(text.indexOf('\n', end + 1) + 1);
  const data = {};
  const lines = yaml.split(/\r?\n/);
  let key = null;
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) {
      key = m[1];
      const value = m[2].trim();
      data[key] = value ? unquote(value) : [];
      continue;
    }
    const item = line.match(/^\s*-\s*(.*)$/);
    if (item && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(unquote(item[1].trim()));
    }
  }
  return { data, body };
}

function normalizeFrontMatter(data) {
  const out = {
    title: String(data.title || 'Untitled'),
    date: formatDate(data.date || new Date()),
    categories: arrayify(data.categories?.length ? data.categories : ['学习']),
    tags: arrayify(data.tags)
  };
  if (data.cover) out.cover = String(data.cover);
  if (data.description) out.description = String(data.description);
  if (data.markmap) out.markmap = String(data.markmap) === 'true' || data.markmap === true;
  return out;
}

function stringifyFrontMatter(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${item}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function arrayify(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}

function formatDate(value) {
  if (value instanceof Date) return value.toISOString().replace('T', ' ').slice(0, 19);
  return String(value).replace('T', ' ').replace(/\.\d+Z?$/, '').slice(0, 19);
}

function unquote(value) {
  return value.replace(/^['"]|['"]$/g, '');
}
