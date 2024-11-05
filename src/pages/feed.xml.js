import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const project = await getCollection('project');
  return rss({
    title: 'Randy\'s Portfolio',
    description: 'Feed for my Blog and Project posts.',
    stylesheet: false,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
    canonicalUrl: 'https://randymfournier.github.io/atomic-atom',
  });
}
