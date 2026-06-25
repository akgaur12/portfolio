# 07 — Configuration & Environment

## Configuration files at a glance

| File | Controls |
| ---- | -------- |
| `astro.config.mjs` | Site URL, integrations (sitemap), Vite/Tailwind plugin, build/inlining behaviour. |
| `tsconfig.json` | TypeScript strictness + the `@/*` path alias. |
| `src/styles/global.css` (`@theme`) | Design tokens (colours, fonts, animation) — see [08](./08-styling-design-system.md). |
| `src/data/site.ts` | Runtime/app "settings": identity, URLs, contact key. |
| `public/robots.txt` | Crawler policy + sitemap URL. |
| `.gitignore` | What stays out of version control. |

## `astro.config.mjs`

```js
const SITE = "https://portfolio.akashgaur.workers.dev";

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
  build: { inlineStylesheets: "auto" },
});
```

| Option | Effect | Notes |
| ------ | ------ | ----- |
| `site` | Base URL for canonical links (`SEO.astro:16`) and the sitemap. | **Placeholder** — change to the real domain. |
| `integrations: [sitemap()]` | Emits `sitemap-index.xml` + `sitemap-0.xml` at build. | Uses `site` as the base. |
| `vite.plugins: [tailwindcss()]` | Runs Tailwind v4 in the Vite pipeline. | The `@type {any}` cast avoids a Vite type-version clash (see inline comment, `:14`). |
| `build.inlineStylesheets: "auto"` | Inline small CSS into HTML, externalise large CSS. | Reduces render-blocking requests for small payloads. |

Default behaviours that are **not** overridden (and therefore in effect):
- **Output mode:** `static` (no adapter configured) → pure SSG.
- **Dev server:** `http://localhost:4321`.
- **Build output:** `dist/`.

## `tsconfig.json`

```jsonc
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": { "paths": { "@/*": ["./src/*"] } }
}
```

- **`extends: astro/tsconfigs/strict`** — strict null checks, `noImplicitAny`, etc.
- **`paths: { "@/*": ["./src/*"] }`** — the alias used throughout (`@/components/...`,
  `@/data/...`, `@/layouts/...`, `@/styles/...`). Both `tsc` and the Astro/Vite resolver honour it.
- **`include` of `.astro/types.d.ts`** wires in generated content-collection types.

## Environment variables

**There are none in use.** This project has no `.env`, no `import.meta.env.*` reads in the source,
and no server runtime. Astro's standard env vars (`import.meta.env.PROD`, `DEV`, `BASE_URL`, etc.)
are available but unused.

`.env`, `.env.production` are listed in `.gitignore:13-15` purely defensively — should secrets be
introduced later, they won't be committed.

### Why there are no secrets to manage
The one credential-like value — the **Web3Forms access key** — is **public by design** and lives
in plain source (`site.ts:16`). It only identifies which inbox receives form submissions; it is
not a secret. See [12 — Security](./12-security.md).

## `src/data/site.ts` as a config module

`site.ts` doubles as the app's settings object. Keys that behave like configuration:

| Key | Used by | Purpose |
| --- | ------- | ------- |
| `url` | `SEO.astro` (fallback for canonical/OG) | Production base URL. |
| `ogImage` | `SEO.astro` | Path to the social-share image. |
| `resumeUrl` | `Header.astro:38,81` | Résumé download link. |
| `web3formsKey` | `Contact.astro:96` | Web3Forms inbox identifier. |
| `email` | `SEO.astro`, `socials` | Contact email + JSON-LD. |
| `phone` | (declared; not rendered anywhere) | Masked placeholder `+91 xxxxxxxxxx`. |

## Placeholders to replace before deploy

Per the README and the inline comments, replace these before going live:

1. **Domain** — set the real URL in **three** places that must agree:
   - `astro.config.mjs:7` (`SITE`)
   - `src/data/site.ts:17` (`url`)
   - `public/robots.txt` (the `Sitemap:` line)
2. **OG image** — ensure `public/og-image.png` (1200×630) exists; path set in `site.ts:18`
   (`ogImage`). Source SVG: `scripts/og-image.svg`.
3. **Résumé PDF** — ensure `public/Akash-Gaur-Resume.pdf` exists; path set in `site.ts:13`.
4. **Phone** — `site.ts:11` is masked (`+91 xxxxxxxxxx`); fill in if desired (note: it is not
   currently rendered anywhere in the UI).
5. **Web3Forms key** — `site.ts:16` should point to *your* inbox key from
   [web3forms.com](https://web3forms.com).

> **Single-source-of-truth gap:** the domain is duplicated across three files. There is no shared
> constant — changing one and forgetting the others causes inconsistent canonical/sitemap/robots
> URLs. Flagged in [Issues & Recommendations](./issues-and-recommendations.md).

## `.gitignore` summary

Ignored: `dist/` (build output), `.astro/` (generated types), `node_modules/`, npm/yarn/pnpm debug
logs, `.env` / `.env.production`, `.DS_Store`, and editor dirs (`.vscode/*` except
`extensions.json`, `.idea/`).
