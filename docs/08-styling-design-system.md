# 08 — Styling & Design System

All styling lives in a single stylesheet: **`src/styles/global.css`** (imported once by
`BaseLayout.astro:2`). It uses **Tailwind CSS v4**, which is configured *in CSS* (no
`tailwind.config.js`). Components style themselves with Tailwind utility classes plus a small set
of reusable component classes defined here.

## File structure of `global.css`

```css
@import "tailwindcss";                              /* 1. pull in Tailwind v4 */
@custom-variant dark (&:where(.dark, .dark *));     /* 2. class-based dark mode */
@theme { … }                                        /* 3. design tokens */
@keyframes fade-up { … }                            /* 4. animation */
@layer base { … }                                   /* 5. element defaults */
@layer components { … }                             /* 6. reusable classes */
[data-reveal] { … }                                 /* 7. scroll-reveal styles */
@media (prefers-reduced-motion) { … }               /* 8. motion-off overrides */
@media (min-width: 768px) { ::-webkit-scrollbar … } /* 9. custom scrollbar */
```

## 1. Tailwind import & 2. Dark mode strategy

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

- Tailwind v4 is enabled with a single `@import`.
- **Dark mode is class-based**: the `dark:` variant applies when an element is (or is inside) an
  element with class `dark`. The `.dark` class is toggled on `<html>` by the theme scripts
  (`ThemeToggle.astro`, `BaseLayout.astro`). `:where(...)` keeps specificity at zero so `dark:`
  utilities don't unexpectedly out-rank others.

## 3. Design tokens (`@theme`)

This is the **single place to re-skin the site**. Tokens become Tailwind theme values *and* CSS
custom properties.

```css
@theme {
  --font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", monospace;

  /* Brand: electric indigo → cyan */
  --color-brand-50 … --color-brand-900;   /* indigo ramp (#eef2ff … #312e81) */
  --color-accent-400/500/600;             /* cyan (#22d3ee / #06b6d4 / #0891b2) */

  --animate-fade-up: fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

| Token group | Drives | Change to… |
| ----------- | ------ | ---------- |
| `--color-brand-*` | Primary accents: buttons, links, rings, gradients, eyebrows | Re-skin the dominant colour. |
| `--color-accent-*` | Secondary accents in gradients/glows | Re-skin the secondary colour. |
| `--font-display` | All headings (`h1–h4`) + logos | Change the display typeface. |
| `--font-sans` | Body text | Change the body typeface. |
| `--font-mono` | Code/eyebrow/chip mono text | Change the monospace typeface. |
| `--animate-fade-up` | Hero staggered entrance animation | Tune the intro motion. |

> Because brand/accent are defined as the full Tailwind colour scales, every `bg-brand-600`,
> `text-accent-500`, `from-brand-500`, etc. across the components automatically follows a token
> change. Re-theming is genuinely a few-line edit.

## 4. Animation

```css
@keyframes fade-up { from { opacity:0; transform: translateY(1.25rem) } to { opacity:1; transform:none } }
```
Referenced via the `--animate-fade-up` token (used inline in `Hero.astro` via
`style="animation: var(--animate-fade-up); animation-delay: …"`).

## 5. Base layer (`@layer base`)

| Rule | Effect |
| ---- | ------ |
| `:root { color-scheme: light }` / `:root.dark { color-scheme: dark }` | Native form/scrollbar theming. |
| `html { scroll-behavior: smooth; scroll-padding-top: 5rem; … }` | Smooth anchor scrolling; offset so sticky header doesn't cover targets. |
| `body { @apply bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-300 }` | Light/dark page surface + text. |
| `h1,h2,h3,h4` | Display font, stronger colour, `text-wrap: balance`. |
| `::selection` | Brand-tinted text selection. |
| `:focus-visible` | Brand outline ring for keyboard users (a11y). |

## 6. Component layer (`@layer components`)

Reusable classes consumed throughout the components:

| Class | Definition (essence) | Used for |
| ----- | -------------------- | -------- |
| `.container-page` | `mx-auto w-full max-w-6xl px-5 sm:px-8` | Consistent page gutter/width. |
| `.text-gradient` | brand→accent clipped gradient text | Highlighted words in headlines. |
| `.card` | rounded, bordered, translucent, blurred surface (light+dark) | Skill/achievement/education cards. |
| `.chip` | small rounded pill | Tags, tech labels, years, scores. |
| `.btn` / `.btn-primary` / `.btn-ghost` | shared button base + filled/outline variants | CTAs, résumé button, submit. |
| `.section-eyebrow` | mono, uppercase, tracked, brand-coloured label | Section header eyebrows. |

> These classes use `@apply`, so they're just Tailwind utilities bundled under a name — there's no
> custom CSS to maintain beyond the declarations here.

## 7. Scroll-reveal styles

```css
[data-reveal] { opacity:0; transform: translateY(1.5rem); transition: … var(--reveal-delay,0ms) }
[data-reveal].is-visible { opacity:1; transform:none }
```

Elements tagged `data-reveal` start hidden + shifted, then animate in when JS adds `.is-visible`
(see `BaseLayout.astro:69-90`). `--reveal-delay` (set inline per element) staggers siblings.

## 8. Reduced-motion handling (accessibility)

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto }
  [data-reveal] { opacity:1 !important; transform:none !important; transition:none }
  *, *::before, *::after { animation-duration:.001ms !important; … transition-duration:.001ms !important }
}
```

This is the CSS half of the motion strategy. The JS half: the reveal and typing scripts **bail
out entirely** when `prefers-reduced-motion: reduce` matches (`BaseLayout.astro:71`,
`Hero.astro:153`). Together they ensure content is fully visible and static for motion-sensitive
users.

## 9. Custom scrollbar

On screens ≥768px, a subtle brand-tinted WebKit scrollbar replaces the default
(`global.css:162-175`).

## Scoped styles

Only one component ships scoped `<style>`: `Hero.astro` (`:106-145`) — the typing cursor blink,
the rotating profile-ring animation, and their reduced-motion overrides. Everything else styles
inline with utilities.

## How to make common visual changes

| Goal | Do this |
| ---- | ------- |
| Change the accent colour everywhere | Edit `--color-brand-*` (and/or `--color-accent-*`) in `@theme`. |
| Change fonts | Edit `--font-*` tokens **and** the Google Fonts `<link>` in `BaseLayout.astro:29-32`. |
| Adjust page max width | Edit `.container-page` (`max-w-6xl`). |
| Restyle all buttons | Edit `.btn-primary` / `.btn-ghost`. |
| Change card look | Edit `.card`. |
| Speed up / slow down reveals | Edit the `[data-reveal]` transition + per-element `--reveal-delay`. |
