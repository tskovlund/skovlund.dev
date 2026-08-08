import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const CONTENT_PATTERN = "**/*.{md,mdx}";

const blog = defineCollection({
  loader: glob({ pattern: CONTENT_PATTERN, base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: CONTENT_PATTERN, base: "./src/content/projects" }),
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
