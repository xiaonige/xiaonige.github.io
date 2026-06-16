import { getPosts, getPostUrl, getExcerpt } from '@/lib/posts';

export async function GET() {
  const posts = await getPosts();
  const entries = posts.map((post) => `
    <entry>
      <title>${escapeXml(post.data.title)}</title>
      <link href="${getPostUrl(post)}"/>
      <url>${getPostUrl(post)}</url>
      <content type="html"><![CDATA[${getExcerpt(post.body || '', 500)}]]></content>
    </entry>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="utf-8"?>\n<search>\n${entries}\n</search>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}

function escapeXml(input: string) {
  return input.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
}
