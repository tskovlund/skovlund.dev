import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sortOrder: z.number(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    icon: z.string(),
    iconColor: z.string(),
  }),
});

export const collections = { blog, projects };
