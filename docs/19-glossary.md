# 19 — Glossary

Definitions of the key concepts, tools, and project-specific terms used throughout this codebase
and documentation.

## Project-specific terms

| Term | Meaning |
| ---- | ------- |
| **Section** | A top-level content block on the page (Hero, About, Experience, …). Most wrap `ui/Section.astro`. |
| **Section shell** | `ui/Section.astro` — the reusable wrapper providing eyebrow + title + subtitle + anchor `id`. |
| **Eyebrow** | The small mono, uppercase, brand-coloured label above a section title (`.section-eyebrow`). |
| **Design token** | A CSS custom property in `@theme` (e.g. `--color-brand-500`) that drives the visual identity. |
| **Reveal** | The scroll-triggered fade-up animation applied to `[data-reveal]` elements. |
| **Scroll-spy** | The behaviour that highlights the nav link for the section currently in view. |
| **Honeypot** | The hidden `botcheck` field in the contact form used to trap spam bots. |
| **Featured project** | A project with `featured: true`; its card spans the full grid width. |
| **Placeholder** | A value (domain, OG image, résumé, phone, form key) that must be replaced before deploy. |

## Astro / framework concepts

| Term | Meaning |
| ---- | ------- |
| **Astro** | The static-site framework/SSG used here. Compiles `.astro` components to HTML at build time. |
| **`.astro` component** | A file with build-time **frontmatter** (`---` fenced JS/TS) + an HTML-like **template**. |
| **Frontmatter (component)** | The `---`-fenced script at the top of an `.astro` file; runs at **build time** only. |
| **Frontmatter (Markdown)** | The YAML block at the top of a `.md` file; here, validated by the collection schema. |
| **Slot** | Astro's content-projection mechanism (`<slot/>`); `BaseLayout` and `Section` use it. |
| **Layout** | A component that wraps page content (`BaseLayout.astro`) — owns `<html>`/`<head>`. |
| **Content Collection** | Astro's typed, schema-validated content system; here, the `projects` collection. |
| **`getCollection`** | Astro API returning typed entries of a collection (`getCollection("projects")`). |
| **`glob` loader** | The content-layer loader that ingests files matching a pattern into a collection. |
| **`is:inline`** | Directive telling Astro to emit a `<script>`/`<style>` verbatim (no bundling/processing). |
| **`set:html`** | Directive that injects raw HTML (bypasses escaping); used for JSON-LD here. |
| **`define:vars`** | Directive passing build-time values into an inline script (used for the form key). |
| **`Astro.site`** | The `site` URL from `astro.config.mjs`, used to build absolute/canonical URLs. |
| **`Astro.props`** | The props object passed to a component. |
| **Integration** | An Astro plugin (here, `@astrojs/sitemap`). |
| **SSG** | Static Site Generation — pages rendered to HTML at build time, not per request. |
| **SSR** | Server-Side Rendering — rendering per request on a server. **Not used here.** |
| **Island** | An interactive, hydrated component embedded in static HTML. **Not used here** (vanilla scripts instead). |
| **Prerender** | Rendering a route to static HTML at build (default for all routes in this project). |

## Tooling & language

| Term | Meaning |
| ---- | ------- |
| **TypeScript (strict)** | Statically-typed JS; this project extends `astro/tsconfigs/strict`. |
| **Zod** | Schema-validation library (bundled via `astro:content`) used to validate project frontmatter. |
| **Vite** | The bundler/dev-server Astro uses internally; hosts the Tailwind plugin. |
| **Tailwind CSS v4** | Utility-first CSS framework; configured in CSS (`@theme`), no JS config file. |
| **`@theme`** | Tailwind v4 directive defining design tokens that become utilities + CSS variables. |
| **`@custom-variant`** | Tailwind v4 directive defining a custom variant (here, class-based `dark`). |
| **`@layer`** | CSS cascade-layer grouping (`base`, `components`) used in `global.css`. |
| **`@apply`** | Tailwind directive that inlines utility classes into a custom class. |
| **`astro check`** | The type-checker (`@astrojs/check`) run as the first half of `npm run build`. |
| **`npm ci`** | Clean, lockfile-exact install — preferred in CI. |

## Web / browser concepts

| Term | Meaning |
| ---- | ------- |
| **`IntersectionObserver`** | Browser API to detect when elements enter the viewport (reveal + scroll-spy). |
| **`localStorage`** | Browser key-value store; persists the theme choice. |
| **`prefers-reduced-motion`** | OS/browser setting; honoured to disable animations. |
| **`prefers-color-scheme`** | OS/browser light/dark preference. |
| **`display=swap`** | Font-loading strategy: show fallback text immediately, swap to web font when ready. |
| **`preconnect`** | Resource hint that opens an early connection to a host (font CDN). |
| **Canonical URL** | The authoritative URL for a page (`<link rel="canonical">`) — SEO de-duplication. |
| **Open Graph (OG)** | Meta tags controlling link previews on social platforms. |
| **JSON-LD** | JSON-based Schema.org structured data for rich search results. |
| **`rel="noopener noreferrer"`** | Link attributes preventing tab-nabbing and referrer leakage on `target="_blank"`. |
| **Honeypot** | An anti-spam technique using a hidden field bots tend to fill. |

## External services

| Term | Meaning |
| ---- | ------- |
| **Web3Forms** | Third-party form-to-email service; receives contact submissions (no backend needed). |
| **Access key** | The public Web3Forms identifier selecting the destination inbox (`site.web3formsKey`). |
| **Google Fonts** | CDN serving Inter, Sora, JetBrains Mono at runtime. |

## Domain abbreviations (from content)

These appear in the portfolio content; defined for documentation completeness.

| Term | Meaning |
| ---- | ------- |
| **GenAI** | Generative AI. |
| **LLM** | Large Language Model. |
| **RAG** | Retrieval-Augmented Generation. |
| **MCP** | Model Context Protocol (secure tool integration for LLM agents). |
| **vLLM** | A high-throughput LLM inference/serving engine. |
| **SSE** | Server-Sent Events (streaming). |
| **JWT** | JSON Web Token (auth — referenced in project content, not in this site). |
| **MITS** | Madhav Institute of Technology & Science (the owner's university). |
