# 01 — Project Overview & Objectives

## What this project is

This repository contains the **personal portfolio website of Akash Gaur**, a GenAI & Backend
Engineer. It is a single-page, statically-generated marketing/résumé site that presents the
owner's professional identity: summary, work experience, projects, skills, achievements,
certifications, education, and a contact form.

- **Package name:** `akash-gaur-portfolio` (`package.json:2`)
- **Version:** `1.0.0`
- **Description:** "Personal portfolio of Akash Gaur — GenAI & Backend Engineer." (`package.json:5`)
- **Production domain (placeholder):** `https://portfolio.akashgaur.workers.dev` (`astro.config.mjs:7`, `src/data/site.ts:17`)

## Primary objectives

The README frames the project's quality bar explicitly: *"A fast, SEO-optimized, accessible
personal portfolio."* Translating that into concrete objectives:

1. **Performance** — Ship as little JavaScript as possible. Astro produces static HTML with **no
   client-side UI framework**; interactivity is added through a handful of small vanilla
   `<script is:inline>` blocks. CSS is inlined where small (`astro.config.mjs:14`).
2. **SEO** — Full meta tags, Open Graph, Twitter cards, JSON-LD structured data
   (`Person` + `WebSite`), a canonical URL, and an auto-generated sitemap.
3. **Accessibility (a11y)** — Semantic landmarks, a skip-to-content link, ARIA states on
   interactive controls, visible focus rings, and respect for `prefers-reduced-motion`.
4. **Maintainability via content/code separation** — All copy lives in typed data files and
   schema-validated Markdown, so updating the site never requires touching component markup.
5. **Easy re-theming** — A small set of CSS custom properties (design tokens) controls the
   entire visual identity.

## Target audience (of the site)

Recruiters, hiring managers, and engineering peers evaluating the owner for **GenAI / backend
engineering roles**. The contact section explicitly states openness to such roles and relocation
(`src/components/sections/Contact.astro:14`).

## Target audience (of this documentation)

- **New developers** taking over or contributing to the site.
- **The owner**, returning months later to update content or re-skin.
- **Reviewers** auditing quality, security, or performance.

## Scope

### In scope
- A single page (`/`) assembled from nine sections.
- Static content management through data files and a Markdown content collection.
- Client-side niceties: dark/light theme, scroll reveal animations, scroll-spy nav, a hero
  typing effect, a certificate carousel + lightbox, and an AJAX contact form.

### Out of scope / non-goals
- **No backend / server.** Output is static (`output` defaults to static; no adapter configured).
- **No database.** Content collections + typed TS files replace a database (see
  [06 — Content & Data Models](./06-content-and-data-models.md)).
- **No authentication/authorization.** There are no user accounts or protected routes
  (see [12 — Security](./12-security.md)).
- **No client UI framework** (no React/Vue/Svelte islands are used in the source, although the
  toolchain could support them).

## Key characteristics at a glance

| Property | Value |
| -------- | ----- |
| Rendering | Static Site Generation (SSG) at build time |
| Pages | 1 route (`/`) → `dist/index.html` |
| Client JS framework | None (vanilla inline scripts only) |
| Styling | Tailwind CSS v4 utilities + a small component layer |
| Content source | `src/data/*.ts` (typed) + `src/content/projects/*.md` (schema-validated) |
| Dynamic data at runtime | None — fully pre-rendered |
| External runtime calls | Google Fonts CSS/files; Web3Forms (only on form submit) |
| Deploy target | Any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages) |

## Where to go next

- To understand **how it all fits together**, read [02 — Architecture](./02-architecture.md).
- To understand **what powers it**, read [03 — Technology Stack](./03-tech-stack.md).
- To **start editing**, jump to [16 — Development Workflow](./16-development-workflow.md).
