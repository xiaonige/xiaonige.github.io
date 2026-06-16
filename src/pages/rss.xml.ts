import { site } from '@/lib/site';
import { getPosts, getPostUrl, getExcerpt } from '@/lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  const origin = context.site?.toString().replace(/\/$/, '') || 'https://xiaonige.github.io';
  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${origin}${getPostUrl(post)}</link>
      <guid>${origin}${getPostUrl(post)}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.description || getExcerpt(post.body || '', 180))}</description>
    </item>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${escapeXml(site.title)}</title><description>${escapeXml(site.description)}</description><link>${origin}</link>${items}\n</channel></rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
}

function escapeXml(input: string) {
  return input.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
}
