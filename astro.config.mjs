import process from "node:process";

import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://skovlund.dev",
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { rel: ["noopener", "noreferrer"], target: "_blank" },
      ],
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        "simple-icons": [
          "github",
          "linkedin",
          "x",
          "instagram",
          "bluesky",
          "substack",
          "nixos",
          "adventofcode",
        ],
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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("smplr")) return "smplr";
          },
        },
      },
    },
  },
});
