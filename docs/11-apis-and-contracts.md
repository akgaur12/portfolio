# 11 — APIs, Endpoints & Contracts

## There are no internal API endpoints

This is a **static site**. It does not define any server routes, API handlers, or `src/pages/api/*`
files. There is no request/response lifecycle on the project's own infrastructure — the host
simply serves pre-built files.

What *does* exist as "contracts":

1. **Static HTTP routes** the build produces.
2. **One outbound API contract** (Web3Forms).
3. **Build-time data contracts** (the content-collection schema and TS types).
4. **Outbound metadata contracts** (JSON-LD, sitemap, robots).

---

## 1. Static routes (the public surface)

| Route | Served file | Source |
| ----- | ----------- | ------ |
| `/` | `dist/index.html` | `src/pages/index.astro` |
| `/sitemap-index.xml` | `dist/sitemap-index.xml` | `@astrojs/sitemap` |
| `/sitemap-0.xml` | `dist/sitemap-0.xml` | `@astrojs/sitemap` |
| `/robots.txt` | `dist/robots.txt` | `public/robots.txt` |
| `/favicon.svg`, `/profile.jpg`, `/og-image.png`, `/Akash-Gaur-Resume.pdf`, `/*-logo.*`, `/certificates/*` | copied verbatim | `public/` |

All routes are **GET**, return static content, and require no authentication. In-page navigation
(`#about`, `#projects`, …) are client-side anchors within `/`, not separate routes.

---

## 2. Outbound API contract — Web3Forms

The only programmatic API interaction. Full detail in
[10 — External Integrations](./10-external-integrations.md); summarised here as a contract.

**Request**
```
POST https://api.web3forms.com/submit
Content-Type: application/json
Accept: application/json
```
| Field | Type | Source |
| ----- | ---- | ------ |
| `access_key` | string | `site.web3formsKey` |
| `subject` | string | `"Portfolio enquiry from <name>"` |
| `name` | string | form input (trimmed, required) |
| `email` | string | form input (trimmed, required) |
| `message` | string | form input (trimmed, required) |
| `botcheck` | honeypot | hidden checkbox value |

**Response**
```jsonc
{ "success": boolean, "message": string }
```
Client behaviour: `success === true` → success UI + reset; else → error UI
(`Contact.astro:138-145`).

---

## 3. Build-time data contracts

These are enforced by the compiler/Zod rather than at runtime, but they are the project's strongest
"contracts" — violating them **fails the build**.

### Projects collection schema
Defined in `src/content.config.ts`; documented field-by-field in
[06 — Content & Data Models](./06-content-and-data-models.md). Each `*.md` frontmatter is the
"payload" validated against this schema.

### TypeScript data types
`Role` (`experience.ts`), `SkillGroup` (`skills.ts`), `Education`/`Achievement`/`Certification`
(`credentials.ts`), `SocialLink` (`site.ts`). These constrain the shape of every data array and are
checked by `astro check`.

### Component prop contracts
| Component | Props |
| --------- | ----- |
| `BaseLayout` | `{ title?, description?, image? }` |
| `SEO` | `{ title?, description?, image? }` |
| `ui/Section` | `{ id, eyebrow, title, subtitle?, class?, headerClass? }` |

---

## 4. Outbound metadata contracts

| Artifact | Format | Consumer | Source |
| -------- | ------ | -------- | ------ |
| Open Graph tags | `<meta property="og:*">` | Social link previews | `SEO.astro:50-56` |
| Twitter Card tags | `<meta name="twitter:*">` | Twitter/X previews | `SEO.astro:58-62` |
| JSON-LD `Person` + `WebSite` | `application/ld+json` | Search engines (rich results) | `SEO.astro:19-41,65-66` |
| Sitemap | XML | Crawlers | `@astrojs/sitemap` |
| robots policy | text | Crawlers | `public/robots.txt` |

---

## Adding endpoints later (if needed)

If the project ever needs real server logic (e.g. a self-hosted contact handler):

1. Add a server adapter (`@astrojs/node`, `@astrojs/vercel`, etc.) and set `output: "server"` or
   use per-route `export const prerender = false`.
2. Create `src/pages/api/<name>.ts` exporting `GET`/`POST` handlers.
3. Introduce real environment variables (`import.meta.env` / `.env`) for secrets — at which point
   the [Configuration](./07-configuration.md) and [Security](./12-security.md) docs would need
   updating.

Today, none of this exists — keep that in mind before searching for an API layer.
