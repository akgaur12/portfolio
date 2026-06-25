# 16 — Development Workflow & Coding Standards

## Prerequisites

- **Node.js** 18.20.8+, 20.3+, or 22+ (Astro 5 requirement). No version is pinned in the repo;
  use a current LTS.
- **npm** (a `package-lock.json` is committed; prefer `npm ci` for clean installs).

## First-time setup

```bash
git clone <repo-url>
cd portfolio
npm install        # or: npm ci  (exact lockfile install)
npm run dev        # http://localhost:4321
```

## Day-to-day commands

| Command | Use |
| ------- | --- |
| `npm run dev` | Local dev server with hot reload. |
| `npm run build` | Type-check + production build into `dist/`. Run before pushing. |
| `npm run preview` | Serve the built `dist/` to verify production output. |
| `npm run astro -- sync` | Regenerate `.astro/` content types if they feel stale. |
| `npm run astro -- add <integration>` | Add an Astro integration via the CLI. |

## Common workflows

### Update text/identity
Edit `src/data/site.ts` (name, title, summary, email, socials, nav, résumé/OG paths, form key).
No component changes needed.

### Add / edit a project
1. Create `src/content/projects/<slug>.md` with schema-valid frontmatter
   (see [06 — Content & Data Models](./06-content-and-data-models.md)).
2. Set `order` (ascending) and optionally `featured: true`.
3. `npm run dev` — schema errors appear immediately.

### Add work experience / skills / credentials
Edit the matching array in `src/data/experience.ts`, `src/data/skills.ts`, or
`src/data/credentials.ts`. The TypeScript types enforce the shape.

### Re-skin the site
Edit the `@theme` tokens in `src/styles/global.css` (colours/fonts). To change fonts, also update
the Google Fonts `<link>` in `BaseLayout.astro:29-32`. See [08 — Styling](./08-styling-design-system.md).

### Re-order page sections
Edit the order of components in `src/pages/index.astro:14-24`.

### Add a new section
1. Create `src/components/sections/MySection.astro`, wrapping content in
   `ui/Section.astro` with a unique `id`.
2. Import + place it in `index.astro`.
3. If it should appear in the nav, add a `{ label, href: "#id" }` entry to `navLinks` in `site.ts`
   (the `href` id **must** match the section `id` for scroll-spy/navigation).

### Add/replace assets
Drop files in `public/` and reference them by absolute path (`/file.ext`). Remember asset paths in
data files are plain strings — verify they resolve (no build-time check).

## Coding standards & conventions

These are **observed conventions** in the codebase (there is no enforced linter/formatter config):

### General
- **TypeScript strict** everywhere; honour the existing types — extend the `type` declarations in
  `src/data/*.ts` rather than using `any`.
- **Path alias** `@/*` for all `src` imports (`@/components/...`, `@/data/...`). Don't use long
  relative paths.
- **2-space indentation**, double-quoted strings, semicolons — match the existing files.
- Keep **content out of components**: copy belongs in `data/` or `content/`, not hard-coded in
  markup. (Exceptions currently exist — `About.astro`'s `focus` list and `Hero`'s prose — treat
  those as candidates to migrate, not patterns to copy.)

### Astro components
- **Sections take no props** and import their own data; keep `index.astro` a clean ordered list.
- Use `ui/Section.astro` for any new content section (consistent header + anchor + spacing).
- Frontmatter (build-time) for data shaping; `<script is:inline>` only for genuine client behaviour.

### Styling
- Prefer **Tailwind utilities** inline; promote a pattern to a component class in `global.css`
  (`@layer components`) only when it repeats meaningfully.
- Always provide **dark-mode variants** (`dark:`) for colours.
- Reference brand/accent via Tailwind colour utilities (`bg-brand-600`, etc.) so token changes
  propagate.

### Client scripts
- Wrap in an IIFE, **null-guard** all DOM lookups, and prefer `IntersectionObserver` over scroll
  handlers.
- Respect `prefers-reduced-motion` for anything animated.
- Mark interactive controls with appropriate `aria-*`.

### Accessibility
- Every icon-only control needs an `aria-label`.
- Every `<img>` needs meaningful `alt`.
- Preserve the skip link, landmarks, and focus-visible styling.

## Git workflow

- Commit messages follow **Conventional Commits** (`feat:`, `chore:`) — see history:
  `feat: assemble home page and add README`, `chore: scaffold Astro project…`. Continue this style.
- `dist/`, `.astro/`, `node_modules/`, and `.env*` are git-ignored — never commit build output or
  generated types.
- Run `npm run build` locally before pushing so type/schema errors are caught early (there is no
  CI gate yet — see [14 — CI/CD](./14-build-deployment-cicd.md)).

## Recommended (not yet present) tooling
Adding these would formalise the conventions above:
- **Prettier** (`prettier-plugin-astro`) for formatting.
- **ESLint** (`eslint-plugin-astro`) for linting.
- **`.nvmrc`** + `engines` field to pin Node.
- A pre-commit hook (husky + lint-staged) running `astro check`.

See [Issues & Recommendations](./issues-and-recommendations.md) for rationale and priority.
