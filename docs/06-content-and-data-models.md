# 06 — Content Collections & Data Models

This project has **no database**. Its "data layer" is two complementary mechanisms:

1. **Typed TypeScript data modules** in `src/data/` — for structured lists (experience, skills,
   education, achievements, certifications, identity).
2. **An Astro Content Collection** in `src/content/projects/` — for projects, each a Markdown
   file with schema-validated YAML frontmatter.

Think of the **content collection schema as the closest thing to a database schema** in this
project: it defines the shape, types, defaults, and validation rules for every project record.

---

## The Projects content collection

### Schema definition (`src/content.config.ts`)

```ts
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    problem: z.string(),
    architecture: z.string(),
    highlights: z.array(z.string()),
    tech: z.array(z.string()),
    tags: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    githubUi: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const collections = { projects };
```

- **Loader:** the `glob` loader (Astro's content-layer loader) ingests every `**/*.md` under
  `src/content/projects`. The file's slug/id derives from its filename.
- **Validation:** Zod validates each file's frontmatter **at build time**. A missing required
  field, a wrong type, or a malformed URL **fails the build** — this is the project's data
  integrity guarantee.

### Field reference (the "table schema")

| Field | Type | Required | Default | Meaning |
| ----- | ---- | -------- | ------- | ------- |
| `title` | string | ✅ | — | Project name (card heading). |
| `tagline` | string | ✅ | — | One-line description under the title. |
| `featured` | boolean | — | `false` | If `true`, the card spans both grid columns and shows a ★ Featured chip. |
| `order` | number | — | `99` | Sort key, **ascending** (lower = shown first). |
| `problem` | string | ✅ | — | Text for the "Problem" panel. |
| `architecture` | string | ✅ | — | Text for the "Architecture" panel. |
| `highlights` | string[] | ✅ | — | Bullet points in the collapsible "Key achievements" list. |
| `tech` | string[] | ✅ | — | Tech-stack chips in the card footer. |
| `tags` | string[] | — | `[]` | Small category chips near the title. |
| `github` | URL string | — | — | Primary/backend repo link. |
| `githubUi` | URL string | — | — | Secondary UI repo link (renders a "UI" labelled button). |
| `demo` | URL string | — | — | Live demo link. |
| *(body)* | Markdown | — | — | Prose after frontmatter. **Currently authored but not rendered** — see note below. |

> **Body rendering note:** Each project file has a Markdown body (e.g.
> `prompt-tokenizer.md:26-27`), but `Projects.astro` only consumes `p.data.*` (frontmatter) and
> never calls `render()` to output the body. The prose is therefore authored-but-unused today.
> See [Issues & Recommendations](./issues-and-recommendations.md).

### How it's consumed

```ts
// src/components/sections/Projects.astro:5
const all = (await getCollection("projects")).sort((a, b) => a.data.order - b.data.order);
```

`getCollection("projects")` returns fully-typed entries (`{ id, data, body, … }`). Sorting is by
`order` ascending, so a project with `order: 1` precedes one with `order: 2`.

### Existing project records

| File | title | order | featured | tags | links |
| ---- | ----- | ----- | -------- | ---- | ----- |
| `prompt-tokenizer.md` | PromptTokenizer | 1 | ✅ | GenAI, Backend, Full-Stack | `demo` |
| `ai-chat-app.md` | AIChatApp | 2 | ✅ | GenAI, Backend | `github`, `githubUi` |

### Adding a new project

1. Create `src/content/projects/<slug>.md`.
2. Add frontmatter satisfying the schema (all required fields present, URLs valid).
3. Set `order` to position it; set `featured: true` for a full-width card.
4. Run `npm run dev` — a schema violation surfaces immediately as a build error.

```md
---
title: My New Project
tagline: One-line pitch.
order: 3
problem: What problem it solves.
architecture: How it's built.
highlights:
  - "Headline achievement one."
  - "Headline achievement two."
tech: ["Python", "FastAPI"]
tags: ["Backend"]
github: "https://github.com/you/repo"
---

Optional prose body.
```

---

## Typed data modules (`src/data/`)

These are plain TypeScript modules — type-checked by `tsc`/`astro check` but **not** runtime
schema-validated (unlike the content collection).

### `site.ts` — identity, socials, navigation

- **`site`** (`as const`, `:1-19`): `name`, `title`, `tagline`, `summary`, `location`,
  `availability`, `email`, `phone`, `resumeUrl`, `web3formsKey`, `url`, `ogImage`.
- **`SocialLink`** type + **`socials`** array (`:21-49`): `{ label, href, icon }` — `icon` is a
  24×24 SVG path string. Entries: GitHub, LinkedIn, Medium, Email.
- **`navLinks`** (`as const`, `:52-60`): in-page anchor links `{ label, href: "#id" }`. **The
  `href` ids must match section `id`s** for scroll-spy and navigation to work.

```ts
export type SocialLink = { label: string; href: string; icon: string };
```

### `experience.ts` — work history

```ts
export type Role = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  blurb?: string;
  highlights: { title: string; points: string[]; tech?: string[] }[];
};
export const experience: Role[];
```

Two roles (Software Developer, Software Developer Intern), each with highlight groups of bullet
points and optional tech chips. `current: true` drives the green "Current" marker and chip.

### `skills.ts` — skill groups

```ts
export type SkillGroup = {
  category: string;
  id: string;       // "short id used for filtering" (no filter UI exists yet)
  icon: string;     // 24×24 path
  skills: string[];
};
export const skillGroups: SkillGroup[];
```

Eight groups (GenAI & LLMs, LLM Ops & Serving, Backend, Databases, ML & Data, Languages,
DevOps & Tools, Visualization). Icons reference a private `ICONS` map (`skills.ts:10-24`).

### `credentials.ts` — education, achievements, certifications

Three types and three exported arrays:

```ts
export type Education = { institution; credential; period; score; logo };
export type Achievement = { title; detail; year; kind: "award"|"research"|"hackathon"|"exam" };
export type Certification = { name; issuer?; year?; image };
```

- **`education`** — three entries (B.Tech + two school records), each with a `/`-rooted logo path.
- **`achievements`** — three entries; `kind` selects an icon/label in `Achievements.astro`.
- **`certifications`** — five entries; `image` points to a file under `public/certificates/`.

> **Asset-path coupling:** `logo` and `image` are plain strings pointing into `public/`. They are
> not validated against the filesystem at build time — a typo produces a broken image at runtime.

---

## Data validation summary

| Source | Validated how | When | On failure |
| ------ | ------------- | ---- | ---------- |
| `src/content/projects/*.md` frontmatter | **Zod schema** (`content.config.ts`) | Build time | **Build error** |
| `src/data/*.ts` | TypeScript types + `astro check` | Build time (type-check) | Type error fails `npm run build` |
| Asset path strings (logos, certs, og image) | Not validated | — | Broken `<img>` at runtime |
| Project body Markdown | Parsed but not rendered | — | Silently unused |

## Type generation

Astro generates `.astro/content.d.ts` (git-ignored) from the schema, which is what gives
`getCollection("projects")` and `entry.data` their precise types. If editor types lag behind a
schema change, run `npm run astro -- sync`.
