import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    problem: z.string(),
    architecture: z.string(),
    highlights: z.array(z.string()),
    tech: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    githubUi: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const collections = { projects };
