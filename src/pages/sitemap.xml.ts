import { getPosts, getPostUrl } from '@/lib/posts';

export async function GET(context) {
  const site = context.site?.toString().replace(/\/$/, '') || 'https://xiaonige.github.io';
  const posts = await getPosts();
  const staticPages = ['/', '/archives/', '/tags/', '/categories/', '/about/', '/search.xml', '/rss.xml'];
  const urls = [
    ...staticPages.map((path) => ({ loc: `${site}${path}`, lastmod: new Date().toISOString().slice(0, 10) })),
    ...posts.map((post) => ({ loc: `${site}${getPostUrl(post)}`, lastmod: post.data.updated?.toISOString().slice(0, 10) || post.data.date.toISOString().slice(0, 10) }))
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
