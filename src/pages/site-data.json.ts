import { getPosts, getWordCount } from '@/lib/posts';
export async function GET() {
  const posts = await getPosts();
  const totalWords = posts.reduce((sum, post) => sum + getWordCount(post.body || ''), 0);
  return new Response(JSON.stringify({ posts: posts.length, totalWords }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
