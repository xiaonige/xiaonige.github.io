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

export function getDateParts(date: Date) {
  const [year, month, day] = date.toISOString().slice(0, 10).split('-');
  return { year, month, day };
}

export function getPostUrl(post: Post) {
  const { year, month, day } = getDateParts(post.data.date);
  return `/${year}/${month}/${day}/${getSlug(post)}/`;
}

export function formatDate(date: Date) {
  const { year, month, day } = getDateParts(date);
  return `${year}-${month}-${day}`;
}

export function getPlainText(body = '') {
  return body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*_`\-[\](){}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getExcerpt(body = '', max = 120) {
  const text = getPlainText(body);
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function getWordCount(body = '') {
  const text = getPlainText(body);
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = (text.replace(/[\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  return cjk + words;
}

export function getReadingMinutes(body = '') {
  return Math.max(1, Math.ceil(getWordCount(body) / 450));
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

export function getAdjacentPosts(posts: Post[], current: Post) {
  const index = posts.findIndex((p) => p.id === current.id);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined
  };
}

export function getRelatedPosts(posts: Post[], current: Post, limit = 3) {
  const currentTags = new Set(current.data.tags || []);
  const currentCats = new Set(current.data.categories || []);
  return posts
    .filter((p) => p.id !== current.id)
    .map((post) => {
      const tagScore = (post.data.tags || []).filter((t) => currentTags.has(t)).length * 2;
      const catScore = (post.data.categories || []).filter((c) => currentCats.has(c)).length;
      return { post, score: tagScore + catScore };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map((item) => item.post);
}
