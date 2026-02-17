import process from "node:process";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

export default defineConfig({
  site: "https://skovlund.dev",
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        "simple-icons": ["github", "linkedin", "x", "instagram", "bluesky"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.COMMIT_SHA": JSON.stringify(
        process.env.COMMIT_SHA || "",
      ),
    },
  },
});
