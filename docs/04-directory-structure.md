# 04 — Directory & File Structure

## Top-level layout

```
portfolio/
├── astro.config.mjs        # Astro config: site URL, sitemap integration, Tailwind, build opts
├── tsconfig.json           # TypeScript config (strict preset + @/* path alias)
├── package.json            # Scripts + dependencies
├── package-lock.json       # Locked dependency tree (committed for reproducible installs)
├── .gitignore              # Ignores dist/, .astro/, node_modules/, .env*, editor dirs
├── README.md               # Human-facing quick start + customization guide
├── public/                 # Static assets copied verbatim into dist/
├── scripts/                # One-off authoring helpers (not part of the build)
├── src/                    # All source code
├── .astro/                 # Generated types & content store (git-ignored)
├── dist/                   # Build output (git-ignored)
└── node_modules/           # Dependencies (git-ignored)
```

## `src/` — the source tree

```
src/
├── content.config.ts            # Projects content-collection schema (Zod)
├── pages/
│   └── index.astro              # The single page; assembles all sections in order
├── layouts/
│   └── BaseLayout.astro         # <html>/<head>, fonts, theme bootstrap, header/footer, reveal
├── components/
│   ├── SEO.astro                # <title>, meta, OG/Twitter, JSON-LD
│   ├── Header.astro             # Sticky nav, mobile menu, scroll-spy
│   ├── Footer.astro             # Footer nav + socials + copyright
│   ├── ThemeToggle.astro        # Dark/light toggle button + persistence
│   ├── ui/
│   │   └── Section.astro        # Shared section shell (eyebrow + title + subtitle + slot)
│   └── sections/
│       ├── Hero.astro           # Full-height intro with typing effect (no Section shell)
│       ├── About.astro          # Bio + focus-area list
│       ├── Experience.astro     # Timeline of roles + highlight cards
│       ├── Projects.astro       # Project cards from the content collection
│       ├── Skills.astro         # Skill group cards
│       ├── Achievements.astro   # Achievement cards (icon by kind)
│       ├── Certifications.astro # Carousel + lightbox of certificate images
│       ├── Education.astro      # Education entries with institution logos
│       └── Contact.astro        # Contact form (Web3Forms) + headline
├── data/
│   ├── site.ts                  # Identity, socials, nav links, contact keys
│   ├── experience.ts            # Work history (Role[])
│   ├── skills.ts                # Skill groups + shared icon paths
│   └── credentials.ts           # Education, achievements, certifications
├── content/
│   └── projects/
│       ├── ai-chat-app.md       # One project (frontmatter validated by content.config.ts)
│       └── prompt-tokenizer.md
└── styles/
    └── global.css               # Tailwind import, design tokens (@theme), component classes
```

### What goes where (mental model)

| If you want to change… | Edit… |
| ---------------------- | ----- |
| Name, title, summary, email, socials, nav, résumé/OG paths, form key | `src/data/site.ts` |
| Work experience entries | `src/data/experience.ts` |
| Skill categories & skills | `src/data/skills.ts` |
| Education / achievements / certifications | `src/data/credentials.ts` |
| Projects shown | Add/edit Markdown in `src/content/projects/` |
| Section order on the page | `src/pages/index.astro` |
| Colours, fonts, animations | `@theme` block in `src/styles/global.css` |
| Reusable button/card/chip styles | `@layer components` in `src/styles/global.css` |
| `<head>` / fonts / theme bootstrap | `src/layouts/BaseLayout.astro` |
| SEO meta / structured data | `src/components/SEO.astro` |

## `public/` — verbatim static assets

Anything in `public/` is copied to the site root unchanged (referenced as `/filename`).

```
public/
├── favicon.svg                  # Site favicon (referenced in BaseLayout)
├── profile.jpg                  # Hero/about portrait
├── og-image.png                 # 1200×630 social-share image (referenced via site.ogImage)
├── Akash-Gaur-Resume.pdf        # Résumé (linked from Header + mobile menu)
├── robots.txt                   # Crawler directives + sitemap pointer
├── mits-logo.jpeg               # Education logo (MITS)
├── soe-logo.jpg                 # Education logo (School of Excellence)
└── certificates/                # Certificate images shown in the Certifications carousel
    ├── Prompt-Engineering-for-Developers.jpg
    ├── Machine-Learning.png
    ├── Complete-Python-Programming.jpg
    ├── Introduction-To-Programming-In-C.jpg
    └── Paper-ID-97-Certificate-ISCMCTR.jpg
```

> Asset paths are referenced by string in data files (e.g. `logo: "/mits-logo.jpeg"` in
> `credentials.ts:16`, `image: "/certificates/..."`). These strings are **not** type-checked
> against the filesystem — a typo yields a broken image at runtime, not a build error. See
> [Issues & Recommendations](./issues-and-recommendations.md).

## `scripts/` — authoring helpers

```
scripts/
└── og-image.svg    # Hand-authored 1200×630 SVG source for the OG image
```

This SVG is the **design source** for the social-share image. It is not run by the build; it's a
template you can rasterise to `public/og-image.png`. Note it references the brand token colours
(`#6366f1`, `#06b6d4`, etc.) so it stays visually consistent with the site.

## `.astro/` — generated (git-ignored)

Astro generates this directory; it is **not** committed (`.gitignore:4`). Contents seen locally:

| File | Purpose |
| ---- | ------- |
| `content.d.ts` | Generated TypeScript types for the `projects` collection (gives `getCollection` its types). |
| `data-store.json` | Cached parsed content-collection data. |
| `types.d.ts`, `content-*.mjs`, `settings.json`, `collections/` | Astro internal generated artifacts. |

Regenerated automatically by `astro dev`/`astro build`/`astro sync`. If types feel stale, run
`npm run astro -- sync`.

## `dist/` — build output (git-ignored)

Produced by `npm run build` (`.gitignore:2`). Contains the deployable static site:

```
dist/
├── index.html              # The rendered page
├── _astro/                 # Hashed CSS (and any JS) bundles
├── sitemap-index.xml       # Sitemap index (from @astrojs/sitemap)
├── sitemap-0.xml           # URL set
├── robots.txt              # Copied from public/
├── favicon.svg, profile.jpg, *-logo.*, certificates/  # Copied assets
└── …
```

> Observed in the current `dist/` are `profile_.jpg` and a missing-from-`public/` variant; the
> canonical, tracked assets live in `public/`. Treat `dist/` as disposable — never edit it by hand.

## Files that intentionally do **not** exist

Knowing what's absent prevents fruitless searching:

- **No `tailwind.config.js`** — Tailwind v4 is configured in `global.css` via `@theme`.
- **No `.env` / `.env.example`** — there are no build-time secrets; the only "key" is the public
  Web3Forms key hard-coded in `site.ts`. `.env*` is git-ignored as a precaution (`.gitignore:14-15`).
- **No `src/pages/api/*`** — there are no server endpoints (static output).
- **No test files, no CI config** (`.github/workflows`), no linter/formatter config.
