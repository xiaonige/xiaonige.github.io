import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getSlug(post: Post) {
  return post.id.replace(/\.mdx?$/, '');
}

export function getPostUrl(post: Post) {
  const d = post.data.date;
  const { year, month, day } = getDateParts(post.data.date);
  return `/${year}/${month}/${day}/${getSlug(post)}/`;
}

export function getDateParts(date: Date) {
  // Astro content dates may be parsed as UTC depending on YAML/date shape.
  // Use ISO parts to keep permalink stable and avoid server timezone drift.
  const [year, month, day] = date.toISOString().slice(0, 10).split('-');
  return { year, month, day };
}

export function formatDate(date: Date) {
  const { year, month, day } = getDateParts(date);
  return `${year}-${month}-${day}`;
}

export function getExcerpt(body = '', max = 120) {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`\-[\]()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'zh-CN'));
}
