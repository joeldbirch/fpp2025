import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    pageTitle: z.string().optional(),
    draft: z.boolean().optional(),
    sidebar: z.array(z.string()).optional(),
  }),
})

const sidebar = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sidebar' }),
  schema: z.object({
    title: z.string(),
    template: z.enum(['SidebarText', 'SidebarGallery']).optional(),
  }),
})

export const collections = { pages, sidebar }
