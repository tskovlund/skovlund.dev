import process from "node:process";

import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://skovlund.dev",
  // Astro 7 defaults to "jsx", which collapses whitespace between inline
  // elements. Pinned to the pre-v7 behavior to keep prose spacing intact.
  compressHTML: true,
  markdown: {
    // Astro 7 renders Markdown with Sätteri by default, which ignores
    // remark/rehype plugins. The unified processor keeps them running.
    processor: unified({
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { rel: ["noopener", "noreferrer"], target: "_blank" },
        ],
      ],
    }),
    shikiConfig: {
      theme: "css-variables",
    },
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
