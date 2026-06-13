# Akash Gaur — Portfolio

A fast, SEO-optimized, accessible personal portfolio built with **Astro 5**, **TypeScript**, and **Tailwind CSS v4**. Static-rendered, dark/light mode, scroll animations, and content-collection-driven projects.

## Tech stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Astro 5 (static output)                             |
| Language       | TypeScript (strict)                                 |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)           |
| Content        | Astro Content Collections (`src/content/projects/`) |
| Contact form   | Web3Forms (no backend — submissions emailed to you) |
| SEO            | Meta + OpenGraph + Twitter + JSON-LD + `@astrojs/sitemap` |
| Fonts          | Sora (display) · Inter (body) · JetBrains Mono (code) |

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:4321)
npm run build    # type-check (astro check) + production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── components/
│   ├── SEO.astro            # meta tags + JSON-LD structured data
│   ├── Header.astro         # sticky nav, scroll-spy, mobile menu
│   ├── Footer.astro
│   ├── ThemeToggle.astro    # dark/light toggle (persists to localStorage)
│   ├── ui/Section.astro     # shared section shell (eyebrow + title)
│   └── sections/            # Hero, About, Experience, Projects, Skills,
│                            # Achievements, Certifications, Education, Contact
├── content/
│   └── projects/*.md        # one markdown file per project (schema-validated)
├── content.config.ts        # projects collection schema
├── data/                    # typed content: site, experience, skills, credentials
├── layouts/BaseLayout.astro # <head>, fonts, theme bootstrap, scroll-reveal
├── pages/index.astro        # single-page assembly (section order lives here)
└── styles/global.css        # design tokens, theme, component classes
public/
├── certificates/            # certification images shown in the Certifications section
├── favicon.svg
├── profile.jpg              # hero/about portrait
└── robots.txt
```

## Customization

### Content
All copy lives in plain data files — no need to touch components:

- **Personal info, socials, nav, stats** → `src/data/site.ts`
- **Work experience** → `src/data/experience.ts`
- **Skills (with filtering)** → `src/data/skills.ts`
- **Education, achievements, certifications** → `src/data/credentials.ts`
- **Projects** → add/edit markdown in `src/content/projects/`. Each file's
  frontmatter is validated against the schema in `content.config.ts`
  (`featured`, `order`, `problem`, `architecture`, `highlights`, `tech`, `tags`,
  `github`, `demo`). Lower `order` = shown first; `featured: true` spans full width.

### Design tokens
Colours, fonts and animations are defined in `src/styles/global.css` under
`@theme`. Change `--color-brand-*` / `--color-accent-*` to re-skin the whole site.

## Before you deploy — replace these placeholders

1. **Domain** — set the real URL in `astro.config.mjs` (`SITE`), `src/data/site.ts`
   (`url`), and `public/robots.txt` (sitemap line).
2. **OG image** — add `public/og-image.png` (1200×630) for social link previews
   (path set in `site.ts` → `ogImage`).
3. **Résumé PDF** — add `public/Akash-Gaur-Resume.pdf` (path set in `site.ts` → `resumeUrl`).
4. **Phone** — the number in `site.ts` is masked; fill in the real one if desired.
5. **Contact form** — wired to [Web3Forms](https://web3forms.com). Drop your own
   free access key into `src/data/site.ts` (`web3formsKey`) so submissions land in
   your inbox. The key is public by design — it only identifies the receiving inbox.

## Deployment

Static output in `dist/` — host anywhere:

- **Netlify / Vercel / Cloudflare Pages**: build command `npm run build`, publish `dist`.
- **GitHub Pages**: serve the `dist/` folder.

## Accessibility & performance

- Semantic landmarks, skip-to-content link, `aria` states on interactive controls.
- Respects `prefers-reduced-motion` (disables animations and smooth scroll).
- Theme set before first paint (no flash of wrong theme).
- Fonts loaded with `display=swap`; CSS inlined where small; no client framework JS.
