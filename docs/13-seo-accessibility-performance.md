# 13 — SEO, Accessibility & Performance

These three concerns are first-class objectives of the project (per the README). This page
inventories exactly what's implemented for each.

---

## SEO

All SEO output is centralised in **`src/components/SEO.astro`**, rendered once via `BaseLayout`.

### Tag inventory (`SEO.astro:44-66`)

| Tag | Value / source |
| --- | -------------- |
| `<title>` | `"${site.name} — ${site.title}"` (overridable via prop) |
| `meta description` | `site.summary` (overridable) |
| `link canonical` | `new URL(Astro.url.pathname, Astro.site ?? site.url)` |
| `meta author` | `site.name` |
| `meta robots` | `index, follow` |
| Open Graph | `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (absolute) |
| Twitter | `twitter:card=summary_large_image`, `twitter:title/description/image` |
| JSON-LD | `Person` + `WebSite` (`application/ld+json`) |

### Structured data (JSON-LD)
- **`Person`** (`:19-34`): name, jobTitle, email, url, postal address, `alumniOf`, `worksFor`,
  `knowsAbout[]`, and `sameAs[]` (socials minus Email).
- **`WebSite`** (`:36-41`): site name + url.

### Canonical & absolute URLs
Computed from `Astro.site` (the configured `site` in `astro.config.mjs`) with a fallback to
`site.url`. **Correct deployment requires `astro.config.mjs`'s `site` to be the real domain** —
otherwise canonical and OG image URLs point at the placeholder.

### Sitemap & robots
- `@astrojs/sitemap` emits `sitemap-index.xml` + `sitemap-0.xml`.
- `public/robots.txt` allows all crawlers and points to the sitemap.

### Document basics
- `<html lang="en">` (`BaseLayout.astro:17`).
- `theme-color` meta for light/dark (`:23-24`).
- `<meta name="generator">` set to Astro's version.

> **SEO gaps:** the social-share image is referenced but must exist as `public/og-image.png`
> (1200×630); the `og:image` lacks explicit `og:image:width/height` and `alt`. Minor — see
> [Issues & Recommendations](./issues-and-recommendations.md).

---

## Accessibility (a11y)

| Feature | Implementation |
| ------- | -------------- |
| **Skip-to-content link** | `BaseLayout.astro:56-60` — visually hidden until focused, jumps to `#main`. |
| **Semantic landmarks** | `<header>`, `<main id="main">`, `<footer>`, `<nav aria-label=…>`, `<section>`, `<article>`, `<figure>`. |
| **Labelled nav** | `aria-label="Primary"`, `"Mobile"`, `"Footer"` distinguish the nav regions. |
| **Icon-only buttons labelled** | `aria-label` on theme toggle, menu button, social links, carousel controls, lightbox close. |
| **Menu state** | Hamburger toggles `aria-expanded` (`Header.astro:53,112`). |
| **Visible focus ring** | `:focus-visible { outline … outline-brand-500 }` (`global.css:80-82`). |
| **Decorative elements hidden** | Background glow + cursor marked `aria-hidden` (`BaseLayout.astro:48`, `Hero.astro:57`). |
| **Reduced motion** | CSS + JS both honour `prefers-reduced-motion` (see [08](./08-styling-design-system.md) & [09](./09-client-side-behavior.md)). |
| **Modal semantics** | Lightbox uses `role="dialog"` + `aria-modal="true"` + `aria-label`, closable with Escape. |
| **Image alt text** | All `<img>` have meaningful `alt` (portrait, logos, certificate names). |
| **Color scheme** | `color-scheme` set for native control theming. |

### Known a11y gaps
- **No focus trap / focus restoration** in the certificate lightbox — keyboard users can tab out of
  the open modal, and focus isn't returned to the trigger on close.
- **Color contrast** of some muted slate text on translucent backgrounds is not verified against
  WCAG AA.
- Tracked in [Issues & Recommendations](./issues-and-recommendations.md).

---

## Performance

The architecture is performance-first; concrete tactics:

| Tactic | Where | Benefit |
| ------ | ----- | ------- |
| **No client UI framework** | whole project | Near-zero JS payload; only tiny inline scripts. |
| **Static pre-rendering** | SSG output | Instant TTFB from CDN; fully cacheable. |
| **CSS inlining (auto)** | `astro.config.mjs:14` | Small CSS inlined → fewer render-blocking requests. |
| **Font `preconnect`** | `BaseLayout.astro:27-28` | Warms TLS to font hosts. |
| **`display=swap`** | font `<link>` | No invisible-text flash; text paints immediately. |
| **Theme set pre-paint** | `BaseLayout.astro:37-44` | No flash-of-wrong-theme reflow. |
| **`IntersectionObserver`** for reveal & scroll-spy | reveal/header scripts | Avoids expensive scroll handlers; observers disconnect after use (reveal). |
| **Passive scroll listener** | `Header.astro:100` | Non-blocking scroll handling. |
| **Lazy images** | certificates, logos use `loading="lazy"` | Defer offscreen image loads. |
| **Eager hero image** | `Hero.astro:26` `loading="eager"` | Prioritise the above-the-fold portrait. |
| **Debounced resize** | carousel (`:172-180`) | Avoid layout thrash on resize. |
| **`will-change-transform`** | cert track | Hints the compositor for smooth sliding. |

### Performance considerations / opportunities
- **Google Fonts is a third-party runtime dependency** — self-hosting (e.g. `@fontsource`) would
  remove an external round-trip and a privacy concern.
- **Three font families × multiple weights** is a non-trivial font payload; subsetting or trimming
  weights would help.
- Images are served at their source resolution (no `astro:assets` optimisation pipeline / responsive
  `srcset`); large certificate JPEGs/PNGs could be optimised.
- See [Issues & Recommendations](./issues-and-recommendations.md) for prioritised perf items.

## How to measure

```bash
npm run build && npm run preview     # serve the real output
# Then run Lighthouse (Chrome DevTools) against http://localhost:4321
```
Validate: Performance, Accessibility, Best Practices, SEO. Also test with JS disabled (content
should remain fully readable) and with `prefers-reduced-motion` enabled (animations off).
