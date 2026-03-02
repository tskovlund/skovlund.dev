/**
 * Record a video cycling through all color schemes on the homepage.
 *
 * Opens the settings panel to show the color scheme switcher, then clicks
 * each scheme button live. The typewriter animation runs continuously
 * throughout, visible in the recording.
 *
 * Usage: pnpm build && pnpm preview & node scripts/record-themes.mjs
 *
 * Requires: preview server running at localhost:4321, ffmpeg for MP4 conversion
 * Output: scripts/output/theme-cycle.mp4
 */

import { chromium } from "playwright";
import { mkdirSync, readdirSync, renameSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const PREVIEW_SERVER = "http://localhost:4321";
const OUTPUT_DIR = join(ROOT, "scripts", "output");
const VIEWPORT = { width: 1280, height: 800 };

const SCHEMES = [
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

/** How long to dwell on each scheme (ms). */
const DWELL_MS = 1500;

/** How long to let the page settle after navigation/mode toggle. */
const SETTLE_MS = 1000;

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
    recordVideo: {
      dir: OUTPUT_DIR,
      size: VIEWPORT,
    },
  });

  const page = await context.newPage();

  // Start in dark mode with Tokyo Night
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
    localStorage.setItem("colorScheme", "tokyo-night");
  });

  await page.goto(`${PREVIEW_SERVER}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(SETTLE_MS);

  console.log("Recording theme cycle...\n");

  // Let the typewriter animation run for a bit on the default theme
  console.log("  Letting typewriter settle...");
  await page.waitForTimeout(DWELL_MS);

  // Open the settings panel to show the color scheme switcher
  console.log("  Opening settings panel...");
  await page.click("[data-settings-trigger]");
  await page.waitForTimeout(500);

  // Cycle through all schemes in dark mode by clicking the real buttons
  for (const scheme of SCHEMES) {
    console.log(`  dark: ${scheme}`);
    await page.click(`[data-scheme-button="${scheme}"]`);
    await page.waitForTimeout(DWELL_MS);
  }

  // Switch to light mode via the real theme button
  console.log("\n  Switching to light mode...");
  await page.click('[data-theme-button="light"]');
  await page.waitForTimeout(SETTLE_MS);

  // Show a selection of light schemes
  const lightSchemes = [
    "tokyo-night",
    "gruvbox",
    "catppuccin",
    "rose-pine",
    "everforest",
    "solarized",
  ];

  for (const scheme of lightSchemes) {
    console.log(`  light: ${scheme}`);
    await page.click(`[data-scheme-button="${scheme}"]`);
    await page.waitForTimeout(DWELL_MS);
  }

  // Return to dark Tokyo Night to close the loop
  console.log("\n  Returning to dark Tokyo Night...");
  await page.click('[data-theme-button="dark"]');
  await page.waitForTimeout(300);
  await page.click('[data-scheme-button="tokyo-night"]');
  await page.waitForTimeout(DWELL_MS);

  // Close context to finalize the video
  await context.close();
  await browser.close();

  // Find the generated webm (Playwright gives it a random name)
  const webmFile = readdirSync(OUTPUT_DIR).find((file) =>
    file.endsWith(".webm"),
  );
  if (!webmFile) {
    console.error("No webm file found in output directory");
    process.exit(1);
  }

  const webmPath = join(OUTPUT_DIR, webmFile);
  const mp4Path = join(OUTPUT_DIR, "theme-cycle.mp4");

  // Convert to MP4 for Twitter/X compatibility
  console.log("\nConverting to MP4...");
  try {
    execSync(
      `ffmpeg -y -i "${webmPath}" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart "${mp4Path}"`,
      { stdio: "inherit" },
    );
    unlinkSync(webmPath);
    console.log(`\nDone! Video saved to: scripts/output/theme-cycle.mp4`);
  } catch {
    // ffmpeg not available — keep the webm
    const renamedPath = join(OUTPUT_DIR, "theme-cycle.webm");
    renameSync(webmPath, renamedPath);
    console.log(`\nffmpeg not found — webm saved to: ${renamedPath}`);
    console.log(
      "Convert manually: ffmpeg -i theme-cycle.webm -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p theme-cycle.mp4",
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
