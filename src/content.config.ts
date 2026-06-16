import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  categories: z.array(z.string()).default(['学习']),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
  markmap: z.boolean().optional()
});

const posts = defineCollection({ type: 'content', schema: postSchema });
const drafts = defineCollection({ type: 'content', schema: postSchema });

export const collections = { posts, drafts };
