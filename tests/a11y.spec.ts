import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// ---------------------------------------------------------------------------
// Structural a11y tests — WCAG 2.1 AA (blocking in CI)
// ---------------------------------------------------------------------------

const PAGES = ["/", "/about", "/blog", "/projects", "/shelf"];

for (const path of PAGES) {
  test(`${path} has no a11y violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .disableRules(["color-contrast"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

// ---------------------------------------------------------------------------
// Color contrast audit — all 12 schemes × 2 modes (non-blocking)
//
// Most editor color schemes (Tokyo Night, Nord, Catppuccin, etc.) were designed
// for code readability in dark editors, not WCAG AA compliance. We use official
// palette colors faithfully — failing contrast ratios are inherent to the
// upstream palettes, not mapping errors on our part.
//
// Gruvbox is the accessible choice and passes both modes. The remaining schemes
// are offered as-is for users who prefer their editor aesthetic. This is a
// deliberate design decision.
//
// Run with: pnpm test:contrast
// ---------------------------------------------------------------------------

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
    test(`contrast: ${scheme} ${mode}`, async ({ page }) => {
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
