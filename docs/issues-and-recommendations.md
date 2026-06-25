# Issues & Recommendations

A structured audit of the codebase as of the documentation date. Each finding includes severity,
impact, affected files, root-cause analysis, recommended solution, estimated effort, and priority.

> **Context for severity:** this is a **static personal-portfolio site** with no backend, database,
> auth, or sensitive runtime data. Severities are calibrated to that context — there are no
> "Critical" production-outage or data-breach risks here. "High" means *most likely to cause a
> visible defect, a missed lead, or a notable SEO/quality problem*.

## Severity & priority legend
- **Severity:** Critical · High · Medium · Low — risk/impact if left unaddressed.
- **Priority:** P1 (do first) · P2 · P3 · P4 — recommended order, factoring effort vs. value.
- **Effort:** XS (<30 min) · S (≤2 h) · M (≤1 day) · L (>1 day).

---

## Summary table

| # | Finding | Category | Severity | Effort | Priority |
| - | ------- | -------- | -------- | ------ | -------- |
| 1 | No automated tests | Testing | High | M | P1 |
| 2 | No CI/CD pipeline | DevOps | High | S | P1 |
| 3 | Domain duplicated across 3 files (no single source) | Maintainability | Medium | XS | P1 |
| 4 | Project Markdown bodies authored but never rendered | Bug/Feature gap | Medium | S | P2 |
| 5 | Asset paths are unchecked strings | Reliability | Medium | M | P2 |
| 6 | Contact form: weak email validation + `novalidate` | Bug | Medium | XS | P2 |
| 7 | Lightbox lacks focus trap / focus restore | Accessibility | Medium | S | P2 |
| 8 | Google Fonts is a third-party runtime dependency | Performance/Privacy | Medium | S | P2 |
| 9 | Skill `id` "filter" capability is dead code | Code smell | Low | XS | P3 |
| 10 | No linter / formatter / Node pinning | Maintainability | Medium | S | P2 |
| 11 | Duplicated GitHub icon path + social/contact patterns | DRY/Code smell | Low | S | P3 |
| 12 | No HTTP security headers (host-side) | Security | Medium | S | P2 |
| 13 | Content hard-coded in components (About/Hero) | Maintainability | Low | S | P3 |
| 14 | Footer copyright year is build-time, not current | Bug (minor) | Low | XS | P3 |
| 15 | Theme ignores OS preference; no cross-tab sync | UX | Low | S | P3 |
| 16 | All deps under `dependencies`; no `devDependencies` | Hygiene | Low | XS | P4 |
| 17 | No dependency vulnerability scanning | Security | Low | XS | P3 |
| 18 | `og:image` lacks dimensions/alt; OG image must exist | SEO | Low | XS | P3 |
| 19 | Carousel logic untestable (inline, not extracted) | Maintainability | Low | S | P3 |
| 20 | `dist/` contains stray/extra asset variants | Hygiene | Low | XS | P4 |

---

## Detailed findings

### 1. No automated test suite
- **Category:** Testing / coverage gap
- **Severity:** High · **Priority:** P1 · **Effort:** M
- **Affected:** entire repo (no test files, no runner in `package.json`).
- **Impact:** The most complex client logic (certificate carousel, contact form success/error/
  network branches, theme persistence, scroll-spy) can regress silently. Only type-checking and
  Zod validation guard the build.
- **Root cause:** Project scaffolded without a test setup; static type-checking treated as
  "enough".
- **Recommended solution:** Add Vitest (unit) + Playwright (E2E) + `@axe-core/playwright` (a11y).
  Prioritise E2E for the carousel and contact form. See [docs/15-testing.md](./15-testing.md) for a
  concrete plan and `package.json` scripts.
- **Notes:** Pairs with finding #2 — tests are only valuable if run automatically.

### 2. No CI/CD pipeline
- **Category:** DevOps / automation
- **Severity:** High · **Priority:** P1 · **Effort:** S
- **Affected:** repo root (no `.github/workflows/`).
- **Impact:** Nothing automatically verifies `npm run build` (type + schema validation) on push/PR;
  a broken build can be merged. No automated dependency scanning.
- **Root cause:** Not set up at scaffolding.
- **Recommended solution:** Add the GitHub Actions workflow in
  [docs/14-build-deployment-cicd.md](./14-build-deployment-cicd.md#cicd--recommended-setup):
  `npm ci` → `npm run build` (→ tests once they exist). Enable Dependabot.
- **Effort note:** A single "build on PR" job is ~20 minutes and immediately valuable.

### 3. Production domain duplicated across three files
- **Category:** Maintainability / configuration
- **Severity:** Medium · **Priority:** P1 · **Effort:** XS
- **Affected:** `astro.config.mjs:7`, `src/data/site.ts:17`, `public/robots.txt`.
- **Impact:** Changing the domain in one place but not the others yields inconsistent canonical
  URLs, OG image URLs, and sitemap/robots pointers — an SEO/correctness hazard.
- **Root cause:** No single source of truth; `robots.txt` is a static file that can't import config.
- **Recommended solution:** Treat `astro.config.mjs`'s `site` as canonical; in `SEO.astro` already
  prefers `Astro.site`, so derive `site.url` from it where possible. Generate `robots.txt` via
  `@astrojs/sitemap`'s built-in robots option (or an endpoint) instead of a static file, so the
  domain comes from `site`. At minimum, document the three-file rule prominently (done in
  [docs/07-configuration.md](./07-configuration.md)).

### 4. Project Markdown bodies are authored but never rendered
- **Category:** Bug / unfinished feature
- **Severity:** Medium · **Priority:** P2 · **Effort:** S
- **Affected:** `src/content/projects/*.md` (body text), `src/components/sections/Projects.astro`.
- **Impact:** Writers add prose bodies expecting them to appear; they never do (only frontmatter is
  used). Wasted content / misleading authoring model.
- **Root cause:** `Projects.astro` consumes only `p.data.*` and never calls the entry's
  `render()`.
- **Recommended solution:** Either (a) render the body (e.g. in an expandable detail / project
  modal) via `const { Content } = await entry.render()`, or (b) remove the bodies and document that
  only frontmatter is used. Decide intentionally.

### 5. Asset paths are unchecked string literals
- **Category:** Reliability / robustness
- **Severity:** Medium · **Priority:** P2 · **Effort:** M
- **Affected:** `src/data/credentials.ts` (`logo`, `image`), `src/data/site.ts`
  (`ogImage`, `resumeUrl`), section components referencing `public/`.
- **Impact:** A typo or renamed/missing file produces a broken image/link **at runtime** with no
  build error (case-sensitivity on Linux hosts makes this easy to hit).
- **Root cause:** Assets live in `public/` and are referenced as plain strings, bypassing Astro's
  asset pipeline and type checks.
- **Recommended solution:** Import images through `astro:assets` / `src/assets` so missing files
  fail the build and images get optimisation/`srcset`. Alternatively add a small build-time script
  asserting every referenced path exists in `public/`.

### 6. Contact form: weak email validation and disabled native validation
- **Category:** Bug / input validation
- **Severity:** Medium · **Priority:** P2 · **Effort:** XS
- **Affected:** `src/components/sections/Contact.astro:29` (`novalidate`), `:113-119`.
- **Impact:** `novalidate` disables the browser's built-in `type="email"` checking; the JS only
  checks non-emptiness, so `"abc"` passes as an email. Malformed leads / bounced replies.
- **Root cause:** `novalidate` was added to take over validation, but the JS validation doesn't
  cover format.
- **Recommended solution:** Add a regex/`input.checkValidity()` email check before submit, or remove
  `novalidate` and let the native validation run alongside the JS guard.

### 7. Certificate lightbox lacks focus management
- **Category:** Accessibility
- **Severity:** Medium · **Priority:** P2 · **Effort:** S
- **Affected:** `src/components/sections/Certifications.astro:86-108,187-223`.
- **Impact:** Keyboard/screen-reader users can tab out of the open modal, and focus isn't moved into
  it on open or restored to the triggering card on close — a WCAG 2.4.3 / dialog-pattern gap.
- **Root cause:** Modal implements `role="dialog"`/`aria-modal` and Escape-to-close, but no focus
  trap or focus save/restore.
- **Recommended solution:** On open, store `document.activeElement`, move focus to the close button,
  and trap Tab within the dialog; on close, restore focus. ~30–60 lines of vanilla JS.

### 8. Google Fonts as a third-party runtime dependency
- **Category:** Performance / privacy
- **Severity:** Medium · **Priority:** P2 · **Effort:** S
- **Affected:** `src/layouts/BaseLayout.astro:26-32`.
- **Impact:** Every page load fetches CSS + font files from Google (extra round-trips; sends visitor
  IP/UA to Google — a GDPR consideration in some jurisdictions). Render depends on a third party.
- **Root cause:** Convenience of the Google Fonts `<link>`.
- **Recommended solution:** Self-host via `@fontsource/{inter,sora,jetbrains-mono}` (or
  `astro-font`), subset to used weights, and `preload` the critical font. Removes the external
  dependency and improves privacy + performance.

### 9. Skill-group `id` "filter" capability is unused
- **Category:** Code smell / dead capability
- **Severity:** Low · **Priority:** P3 · **Effort:** XS
- **Affected:** `src/data/skills.ts:4` (comment "short id used for filtering"), `Skills.astro`.
- **Impact:** Misleading — the field implies a filtering UI that doesn't exist; future devs may
  hunt for it.
- **Root cause:** Planned feature not implemented (or removed).
- **Recommended solution:** Either implement skill filtering using the ids, or update the comment to
  reflect that `id` is currently just a stable key.

### 10. No linter, formatter, or Node version pinning
- **Category:** Maintainability / tooling
- **Severity:** Medium · **Priority:** P2 · **Effort:** S
- **Affected:** repo root (no ESLint/Prettier config, no `.nvmrc`, no `engines`).
- **Impact:** Style drifts across contributors; no automated catch for common mistakes; Node version
  ambiguity can cause "works on my machine" build differences.
- **Root cause:** Not configured at scaffolding.
- **Recommended solution:** Add Prettier (`prettier-plugin-astro`), ESLint (`eslint-plugin-astro`),
  an `.nvmrc` (e.g. `22`), and an `engines.node` field. Optionally a husky pre-commit hook running
  `astro check`.

### 11. Duplicated icon/markup patterns (DRY)
- **Category:** Code smell / duplication
- **Severity:** Low · **Priority:** P3 · **Effort:** S
- **Affected:** GitHub icon path in both `src/data/site.ts:32` and
  `src/components/sections/Projects.astro:7-8`; the social-link `<a>` block duplicated between
  `Hero.astro:86-99` and `Footer.astro:14-28`; the availability pill duplicated between
  `Hero.astro` and `Contact.astro`.
- **Impact:** Edits must be made in multiple places; risk of divergence.
- **Root cause:** No shared icon module / small presentational components.
- **Recommended solution:** Extract a single `icons.ts` (or an `<Icon>` component) and a
  `<SocialLinks>` / `<AvailabilityPill>` component.

### 12. No HTTP security headers
- **Category:** Security (host-side)
- **Severity:** Medium · **Priority:** P2 · **Effort:** S
- **Affected:** deployment/host config (not in repo).
- **Impact:** Missing CSP/HSTS/`X-Content-Type-Options`/`Referrer-Policy` leaves standard hardening
  on the table.
- **Root cause:** A static site can't set response headers; they must be configured at the host, and
  no host config (e.g. `netlify.toml`, `_headers`, `vercel.json`) is committed.
- **Recommended solution:** Add a `public/_headers` (Cloudflare/Netlify) or host config with the
  header set in [docs/12-security.md](./12-security.md#http-security-headers). Note CSP must permit
  the inline scripts (hash/nonce them or scope appropriately) and the fonts/Web3Forms origins.

### 13. Some content hard-coded in components
- **Category:** Maintainability
- **Severity:** Low · **Priority:** P3 · **Effort:** S
- **Affected:** `src/components/sections/About.astro:4-44` (focus list + four bio paragraphs),
  `src/components/sections/Hero.astro` (prose), `Achievements.astro:5-10` (`kindMeta`).
- **Impact:** Violates the project's own "content lives in data" principle; editing copy requires
  touching components.
- **Root cause:** Convenience during build-out.
- **Recommended solution:** Move the About bio + focus list into `src/data/` (e.g. extend `site.ts`
  or a new `about.ts`). Keep presentational maps (`kindMeta`) where they are.

### 14. Footer copyright year is the build year
- **Category:** Bug (minor / correctness)
- **Severity:** Low · **Priority:** P3 · **Effort:** XS
- **Affected:** `src/components/Footer.astro:3` (`new Date().getFullYear()` at build time).
- **Impact:** If the site is built once and not rebuilt, the year goes stale on Jan 1. For a static
  site this is the expected trade-off, but worth noting.
- **Root cause:** Year computed at build time (correct for SSG, but frozen until next build).
- **Recommended solution:** Accept it (rebuild yearly), or compute the year client-side in a tiny
  inline script if a perpetually-current year matters.

### 15. Theme ignores OS preference; no cross-tab sync
- **Category:** UX
- **Severity:** Low · **Priority:** P3 · **Effort:** S
- **Affected:** `src/layouts/BaseLayout.astro:37-44`, `src/components/ThemeToggle.astro`.
- **Impact:** First-time visitors with an OS dark preference still get light mode (only an explicit
  prior choice triggers dark). Theme changes don't sync across open tabs.
- **Root cause:** Bootstrap reads only `localStorage.theme === "dark"`; no `prefers-color-scheme`
  fallback and no `storage` event listener.
- **Recommended solution:** Default to `prefers-color-scheme` when no stored choice exists; add a
  `window.addEventListener("storage", …)` to sync tabs. Keep it inline/pre-paint to avoid flashes.

### 16. All dependencies under `dependencies`
- **Category:** Hygiene
- **Severity:** Low · **Priority:** P4 · **Effort:** XS
- **Affected:** `package.json:11-18`.
- **Impact:** Conceptually incorrect (these are build-time tools), though harmless for a static site
  since nothing ships to clients from `node_modules`.
- **Root cause:** Scaffolding placed everything in `dependencies`.
- **Recommended solution:** Move build/dev tooling (`@astrojs/check`, `typescript`, possibly the
  Tailwind packages) to `devDependencies` for clarity.

### 17. No dependency vulnerability scanning
- **Category:** Security / supply chain
- **Severity:** Low · **Priority:** P3 · **Effort:** XS
- **Affected:** repo (no Dependabot / `npm audit` in CI).
- **Impact:** Vulnerable (mostly build-time) dependencies could go unnoticed. Lower blast radius
  because deps aren't shipped to the browser.
- **Root cause:** Not configured.
- **Recommended solution:** Enable Dependabot and/or add `npm audit --audit-level=high` to CI
  (pairs with finding #2).

### 18. OG image robustness & metadata
- **Category:** SEO
- **Severity:** Low · **Priority:** P3 · **Effort:** XS
- **Affected:** `src/data/site.ts:18`, `src/components/SEO.astro:56`, `public/og-image.png`.
- **Impact:** If `public/og-image.png` is absent, social previews break. Missing
  `og:image:width/height` and `og:image:alt` slightly reduce preview quality/accessibility.
- **Root cause:** Image is a referenced static file (not build-validated — see #5), and only the
  base `og:image` tag is emitted.
- **Recommended solution:** Ensure the file exists (rasterise `scripts/og-image.svg`), and add
  `og:image:width=1200`, `og:image:height=630`, `og:image:alt` in `SEO.astro`.

### 19. Carousel logic is inline and untestable
- **Category:** Maintainability / testability
- **Severity:** Low · **Priority:** P3 · **Effort:** S
- **Affected:** `src/components/sections/Certifications.astro:111-185`.
- **Impact:** The non-trivial paging math (`perView`, `maxIndex`, index wrap, transform) lives in an
  inline IIFE — not unit-testable and not type-checked.
- **Root cause:** `is:inline` script with logic inlined.
- **Recommended solution:** Extract the pure math into a small typed module imported by a regular
  (bundled) script, so it can be unit-tested (supports finding #1).

### 20. `dist/` contains stray asset variants
- **Category:** Hygiene
- **Severity:** Low · **Priority:** P4 · **Effort:** XS
- **Affected:** `dist/` (e.g. `profile_.jpg` present in a prior build but not in `public/`).
- **Impact:** None for visitors (`dist/` is regenerated), but indicates an old artifact lingered.
- **Root cause:** `dist/` not cleaned between builds, or an asset was renamed in `public/`.
- **Recommended solution:** Treat `dist/` as fully disposable; ensure the build cleans it (Astro
  does on build) and that the deploy uploads a fresh build. No source change needed.

---

## Recommended remediation order

1. **P1 (foundational):** #2 CI build-on-PR → #1 tests (carousel + contact form first) → #3 domain
   single-source.
2. **P2 (quality & correctness):** #6 email validation, #4 project bodies decision, #7 lightbox
   focus, #10 lint/format/Node pin, #12 security headers, #8 self-host fonts, #5 asset checking.
3. **P3 (polish & hygiene):** #9, #11, #13, #14, #15, #17, #18, #19.
4. **P4 (cosmetic):** #16, #20.

## What's already done well (for balance)
- Clean **content/code separation** for most data; schema-validated projects.
- Strong **accessibility baseline** (skip link, landmarks, ARIA, focus-visible, reduced-motion).
- **Performance-first** architecture (no client framework, CSS inlining, lazy images, observers).
- **Defensive client scripts** (null guards, graceful fallbacks, image `onerror`).
- **Type-safe** throughout with a strict `tsconfig` and a build that fails on type/schema errors.
- Good **outbound-link hygiene** (`rel="noopener noreferrer"`).
