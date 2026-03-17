import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    type: z.enum(['brain science', 'tools', 'squirrels', 'story']).default('story'),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    readTime: z.string(),
  }),
});

export const collections = { blog };