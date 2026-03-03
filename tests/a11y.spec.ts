import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/about", "/blog", "/projects", "/shelf"];

// Color contrast is disabled until all 12 color schemes are audited for
// WCAG AA compliance in both light and dark modes. Structural, ARIA, and
// semantic rules remain active.
const DISABLED_RULES = ["color-contrast"];

for (const path of PAGES) {
  test(`${path} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .disableRules(DISABLED_RULES)
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
