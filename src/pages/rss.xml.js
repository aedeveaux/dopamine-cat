import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  );

  return rss({
    title: 'The Dopamine Cat',
    description: 'Big ideas. Better tools.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.excerpt,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}/`,
    })),
  });
}
