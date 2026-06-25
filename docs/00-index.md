# Akash Gaur Portfolio — Technical Documentation

Welcome to the complete technical documentation for the **Akash Gaur Portfolio** project: a
fast, statically-rendered personal portfolio built with **Astro 5**, **TypeScript (strict)**,
and **Tailwind CSS v4**.

This documentation is written to take a developer with **no prior knowledge** of the project
from zero to productive, and to serve as a **long-term reference** for maintainers.

> **One-line summary:** A zero-backend, content-driven, single-page static site that compiles
> to plain HTML/CSS with a few small inline `<script>` enhancements. The only runtime network
> dependencies are Google Fonts and a third-party form-submission API (Web3Forms).

---

## How this book is organised

| #  | Document | What it covers |
| -- | -------- | -------------- |
| 00 | **[Index](./00-index.md)** | This page — the map of the documentation. |
| 01 | [Project Overview & Objectives](./01-project-overview.md) | What the project is, who it's for, goals, scope, non-goals. |
| 02 | [Architecture, System Design & Data Flow](./02-architecture.md) | High-level architecture, build-time vs. runtime, rendering model, data-flow & sequence diagrams. |
| 03 | [Technology Stack & Dependencies](./03-tech-stack.md) | Every dependency, why it's there, version constraints, the toolchain. |
| 04 | [Directory & File Structure](./04-directory-structure.md) | Annotated walkthrough of every directory and file. |
| 05 | [Core Modules & Components](./05-components.md) | Every `.astro` component, its props, responsibilities, and relationships. |
| 06 | [Content Collections & Data Models](./06-content-and-data-models.md) | The Projects collection schema (the project's "database"), data files, and their TypeScript types. |
| 07 | [Configuration & Environment](./07-configuration.md) | `astro.config.mjs`, `tsconfig.json`, the path alias, "environment variables", placeholders to replace. |
| 08 | [Styling & Design System](./08-styling-design-system.md) | Tailwind v4 setup, design tokens, theme, component classes, dark mode. |
| 09 | [Client-Side Behaviour & Interactivity](./09-client-side-behavior.md) | Every inline script: theme bootstrap, scroll-reveal, header/scroll-spy, hero typing, certificate carousel/lightbox, contact form. |
| 10 | [External Integrations & Services](./10-external-integrations.md) | Web3Forms, Google Fonts, `@astrojs/sitemap`, JSON-LD, robots.txt. |
| 11 | [APIs, Endpoints & Contracts](./11-apis-and-contracts.md) | The (lack of) internal endpoints, the outbound Web3Forms contract, and the static routes produced. |
| 12 | [Security Considerations](./12-security.md) | Threat surface of a static site, the public Web3Forms key, honeypot, headers, secrets. |
| 13 | [SEO, Accessibility & Performance](./13-seo-accessibility-performance.md) | Meta/OpenGraph/Twitter/JSON-LD, a11y patterns, performance tactics & optimisations. |
| 14 | [Build, Deployment & CI/CD](./14-build-deployment-cicd.md) | The build pipeline, `dist/` output, hosting options, and a recommended CI/CD setup. |
| 15 | [Testing Strategy & Coverage](./15-testing.md) | What testing exists today (type-checking only) and a recommended testing strategy. |
| 16 | [Development Workflow & Coding Standards](./16-development-workflow.md) | Local setup, day-to-day workflow, conventions, how to add content/components. |
| 17 | [Feature-wise Implementation Details](./17-feature-implementation.md) | Each user-facing feature traced end-to-end through the code. |
| 18 | [Troubleshooting Guide](./18-troubleshooting.md) | Common problems and fixes. |
| 19 | [Glossary](./19-glossary.md) | Definitions of key concepts and terminology. |
| —  | **[Issues & Recommendations](./issues-and-recommendations.md)** | Audit: bugs, code smells, security/perf/scalability concerns, missing tests, refactors — each with severity, impact, root cause, fix, effort, and priority. |

---

## Quick start (TL;DR)

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:4321
npm run build    # type-check (astro check) + build static site to dist/
npm run preview  # serve the production build locally
```

- **Edit content, not components.** Copy lives in `src/data/*.ts` and `src/content/projects/*.md`.
- **Re-skin the whole site** by changing CSS variables under `@theme` in `src/styles/global.css`.
- **Before deploying**, replace the placeholders listed in [07 — Configuration](./07-configuration.md#placeholders-to-replace-before-deploy).

---

## Conventions used in this documentation

- File references are given as `path:line` (e.g. `src/data/site.ts:16`) so they are clickable in
  most editors.
- Diagrams use [Mermaid](https://mermaid.js.org/) fenced code blocks (```mermaid). They render
  natively on GitHub and in many Markdown viewers.
- "Build-time" means code that runs in Node during `astro build`/`astro dev`. "Runtime" / "client"
  means code that runs in the visitor's browser. This distinction is central to understanding an
  Astro project — see [02 — Architecture](./02-architecture.md).
