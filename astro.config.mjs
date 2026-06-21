// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// Update this to your production domain before deploying.
const SITE = "https://portfolio.akashgaur.workers.dev";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],

  vite: {
    // Cast avoids a Vite-version type clash between @tailwindcss/vite and Astro's bundled Vite.
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  build: {
    inlineStylesheets: "auto",
  },

  adapter: cloudflare()
});