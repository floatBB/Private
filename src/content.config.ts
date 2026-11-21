import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合：放在 src/content/posts/ 下的 .md / .mdx 文件
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // 草稿：true 的文章不会出现在列表和构建产物里
    draft: z.boolean().default(false),
    // 网页后台（Decap CMS）用来生成文件名的字段，站内不使用
    slug: z.string().optional(),
  }),
});

export const collections = { posts };
