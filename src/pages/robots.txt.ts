export async function GET() {
  return new Response(`User-agent: *\nAllow: /\nDisallow: /drafts/\nSitemap: https://xiaonige.github.io/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
