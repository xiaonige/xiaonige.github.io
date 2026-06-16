import fs from 'node:fs/promises';
import path from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run promote:draft -- <slug>');
  process.exit(2);
}
const draft = path.resolve(`src/content/drafts/${slug}.md`);
const post = path.resolve(`src/content/posts/${slug}.md`);
try { await fs.access(draft); } catch { console.error(`Draft not found: ${draft}`); process.exit(1); }
try { await fs.access(post); console.error(`Post already exists: ${post}`); process.exit(1); } catch {}
let text = await fs.readFile(draft, 'utf8');
text = text.replace(/\ndraft:\s*true\s*\n/i, '\n');
await fs.rename(draft, post);
await fs.writeFile(post, text, 'utf8');
console.log(`Promoted draft to post: ${slug}`);
console.log('Next: npm run build, review dist, then publish preview/formal site.');
