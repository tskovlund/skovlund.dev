import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Color contrast audit for all 12 schemes × 2 modes = 24 variants.
 *
 * Run with: pnpm test:contrast
 *
 * These tests are NOT blocking in CI — they exist to audit contrast compliance
 * and track which schemes need work. When a scheme is fixed, its test passes
 * and you can remove it from KNOWN_FAILURES.
 */

const COLOR_SCHEMES = [
  "tokyo-night",
  "gruvbox",
  "nord",
  "rose-pine",
  "catppuccin",
  "kanagawa",
  "everforest",
  "dracula",
  "solarized",
  "monokai",
  "horizon",
  "night-owl",
];

const MODES = ["light", "dark"] as const;

interface ContrastFailure {
  element: string;
  ratio: number;
  required: string;
  fg: string;
  bg: string;
}

for (const scheme of COLOR_SCHEMES) {
  for (const mode of MODES) {
    test(`${scheme} ${mode}`, async ({ page }) => {
      await page.goto("/");

      await page.evaluate(
        ({ scheme, isDark }) => {
          document.documentElement.setAttribute("data-color-scheme", scheme);
          document.documentElement.classList.toggle("dark", isDark);
        },
        { scheme, isDark: mode === "dark" },
      );

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .include("body")
        .analyze();

      const contrastViolations = results.violations.filter(
        (violation) => violation.id === "color-contrast",
      );

      if (contrastViolations.length > 0) {
        const summary: ContrastFailure[] = contrastViolations.flatMap(
          (violation) =>
            violation.nodes.map((node) => ({
              element: node.html.slice(0, 80),
              ratio: node.any?.[0]?.data?.contrastRatio,
              required: node.any?.[0]?.data?.expectedContrastRatio,
              fg: node.any?.[0]?.data?.fgColor,
              bg: node.any?.[0]?.data?.bgColor,
            })),
        );
        expect(
          contrastViolations,
          `${summary.length} contrast failures:\n${JSON.stringify(summary, null, 2)}`,
        ).toEqual([]);
      }
    });
  }
}
