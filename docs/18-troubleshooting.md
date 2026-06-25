# 18 — Troubleshooting Guide

Common problems, their likely causes, and fixes. Organised by symptom.

---

## Build & type errors

### `astro check` fails with a type error
- **Cause:** a `.astro` or `.ts` file violates a type (often a data array not matching its `type`).
- **Fix:** read the reported file:line; align the value with the declared `type` in
  `src/data/*.ts`. Don't paper over with `any` — extend the type if the shape legitimately changed.

### Build fails with a content-collection / Zod error
- **Cause:** a project Markdown file's frontmatter violates `src/content.config.ts` (missing
  required field, wrong type, malformed URL in `github`/`githubUi`/`demo`).
- **Fix:** the error names the file and field. Ensure all required fields exist
  (`title`, `tagline`, `problem`, `architecture`, `highlights`, `tech`) and URLs are absolute
  (`https://…`). See [06 — Content & Data Models](./06-content-and-data-models.md).

### `Cannot find module '@/…'` / alias not resolving
- **Cause:** editor or tool not honouring the `@/*` path alias.
- **Fix:** confirm `tsconfig.json` `paths` is intact; restart the TS server / editor. Astro/Vite
  read the same `tsconfig`.

### Types for `getCollection` look wrong / stale
- **Cause:** generated `.astro/` types out of date after a schema edit.
- **Fix:** `npm run astro -- sync`, then restart the dev server / TS server.

---

## Dev server / tooling

### `npm run dev` fails to start or shows engine warnings
- **Cause:** unsupported Node version (Astro 5 needs 18.20.8+/20.3+/22+).
- **Fix:** switch to a supported LTS (`nvm use 22`). There's no `.nvmrc`, so set it manually.

### Port 4321 already in use
- **Fix:** `astro dev --port 3000`, or stop the other process.

### Changes not reflected
- **Fix:** hard-reload; if editing `.astro/`-affecting content, run `astro sync`. Never edit
  `dist/` — it's overwritten each build.

---

## Visual / runtime issues

### Flash of wrong theme on load
- **Cause:** the pre-paint theme script in `BaseLayout.astro:37-44` was moved/removed, or runs too
  late.
- **Fix:** keep it inline in `<head>` *before* the body; it must not be deferred or bundled.

### Theme doesn't persist / doesn't toggle
- **Cause:** `localStorage` blocked (private mode/extensions), or the toggle script didn't bind.
- **Fix:** check the console; verify `#theme-toggle` exists and `ThemeToggle.astro` script ran.

### Nav highlighting (scroll-spy) is wrong or dead
- **Cause:** a `navLinks` `href="#id"` doesn't match any section `id`.
- **Fix:** make ids agree (`site.ts` `navLinks` ↔ section component `id`). Each nav id needs a real
  `<section id="…">`.

### Clicking a nav link scrolls under the sticky header
- **Cause:** missing scroll offset.
- **Fix:** ensure `scroll-padding-top` (`global.css:59`) and the section's `scroll-mt-24`
  (`Section.astro:13`) are present.

### Scroll-reveal elements stay invisible
- **Cause:** JS error before the reveal observer runs, or content marked `data-reveal` but the
  script bailed.
- **Fix:** check console. Note: under `prefers-reduced-motion`, CSS forces them visible — if they're
  invisible with motion on, the observer didn't attach.

### Profile image / logos / certificates don't show
- **Cause:** asset path string doesn't match a file in `public/` (these aren't build-checked).
- **Fix:** verify the path in `site.ts`/`credentials.ts` exactly matches a file under `public/`
  (case-sensitive on most hosts). The hero has an initials fallback; others just break.

### Certificate carousel misaligned or stuck
- **Cause:** card width/gap measurement off after a layout change, or `perView` breakpoints edited.
- **Fix:** review `Certifications.astro:122-161`; the transform uses measured card width + computed
  gap. Resize is debounced (150ms) — wait a beat after resizing.

### Lightbox won't close with keyboard / focus escapes it
- **Cause:** known limitation — no focus trap/restore implemented.
- **Fix (workaround):** Escape and backdrop-click do close it. For a real fix, add focus trapping
  (see [Issues & Recommendations](./issues-and-recommendations.md)).

---

## Contact form

### Submissions don't arrive
- **Causes & fixes:**
  - Wrong/placeholder `web3formsKey` → set your own key in `site.ts:16`.
  - Web3Forms outage/rate limit → check the status line message; retry later.
  - Submission flagged as spam → check spam folder; ensure the honeypot field isn't being
    auto-filled by an extension.
- **Diagnose:** open DevTools → Network → inspect the `POST api.web3forms.com/submit` response
  (`success` field + message).

### Form always says "Please fill in every field"
- **Cause:** a field `name` was changed so `FormData.get(...)` returns null.
- **Fix:** keep input `name` attributes as `name`/`email`/`message` (matched in
  `Contact.astro:113-115`).

### CORS / network error on submit
- **Cause:** network failure or blocked request (ad-blocker, offline).
- **Fix:** the script catches this and shows "Network error…"; verify connectivity and that
  `api.web3forms.com` isn't blocked.

---

## Deployment

### Canonical/OG/sitemap URLs point to `portfolio.akashgaur.workers.dev` placeholder
- **Cause:** the domain wasn't updated everywhere.
- **Fix:** set the real domain in **all three**: `astro.config.mjs:7`, `site.ts:17`,
  `public/robots.txt`. See [07 — Configuration](./07-configuration.md).

### Social preview image is broken
- **Cause:** `public/og-image.png` missing or not 1200×630.
- **Fix:** rasterise `scripts/og-image.svg` to `public/og-image.png`.

### Assets 404 on a sub-path deployment (e.g. GitHub Pages project site)
- **Cause:** the site is served from `/repo/` but assets assume root.
- **Fix:** set Astro `base` in `astro.config.mjs` and reference assets accordingly, or deploy to a
  root domain.

---

## Quick diagnostic commands

```bash
npm run build            # surfaces all type + schema errors at once
npm run preview          # reproduce production behaviour locally
npm run astro -- sync    # regenerate content types
node -v                  # confirm a supported Node version
```
