/**
 * Generate screenshots for project pages using Playwright.
 *
 * Usage: node scripts/screenshots.mjs
 *
 * Requires: dev server running at localhost:4321
 */

import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DEV_SERVER = "http://localhost:4321";
const VIEWPORT = { width: 1280, height: 800 };

/** Helper: ensure directory exists, take screenshot, log path. */
async function capture(page, outputPath, options = {}) {
  const fullPath = join(ROOT, outputPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  await page.screenshot({ path: fullPath, ...options });
  console.log(`  captured: ${outputPath}`);
}

async function main() {
  const browser = await chromium.launch();

  // --- skovlund.dev: dark mode homepage ---
  console.log("\nskovlund.dev dark mode:");
  const darkContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const darkPage = await darkContext.newPage();
  await darkPage.goto(`${DEV_SERVER}/`, { waitUntil: "networkidle" });
  await darkPage.waitForTimeout(1000);
  await capture(
    darkPage,
    "src/content/projects/skovlund-dev/homepage-dark.png",
  );

  // About page dark
  await darkPage.goto(`${DEV_SERVER}/about`, { waitUntil: "networkidle" });
  await darkPage.waitForTimeout(500);
  await capture(darkPage, "src/content/projects/skovlund-dev/about-dark.png");
  await darkContext.close();

  // --- skovlund.dev: light mode homepage ---
  console.log("\nskovlund.dev light mode:");
  const lightContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const lightPage = await lightContext.newPage();
  await lightPage.goto(`${DEV_SERVER}/`, { waitUntil: "networkidle" });
  await lightPage.waitForTimeout(1000);
  await capture(
    lightPage,
    "src/content/projects/skovlund-dev/homepage-light.png",
  );
  await lightContext.close();

  // --- Color scheme showcase (dark mode, different schemes) ---
  console.log("\nColor scheme screenshots:");
  const schemes = [
    "tokyo-night",
    "gruvbox",
    "nord",
    "rose-pine",
    "catppuccin",
    "kanagawa",
  ];

  for (const scheme of schemes) {
    const schemeContext = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      colorScheme: "dark",
    });
    const schemePage = await schemeContext.newPage();

    // Set localStorage before navigating so the theme applies on load
    await schemePage.addInitScript((schemeId) => {
      localStorage.setItem("colorScheme", schemeId);
      localStorage.setItem("theme", "dark");
    }, scheme);

    await schemePage.goto(`${DEV_SERVER}/`, { waitUntil: "networkidle" });
    await schemePage.waitForTimeout(800);
    await capture(
      schemePage,
      `src/content/projects/skovlund-dev/scheme-${scheme}.png`,
    );
    await schemeContext.close();
  }

  // --- miles-vps: Uptime Kuma status page ---
  console.log("\nmiles-vps external screenshots:");
  const uptimeContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const uptimePage = await uptimeContext.newPage();
  try {
    await uptimePage.goto("https://status.skovlund.dev/status/all", {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await uptimePage.waitForTimeout(2000);
    await capture(uptimePage, "src/content/projects/miles-vps/uptime-kuma.png");
  } catch (error) {
    console.log(`  skipped uptime-kuma: ${error.message}`);
  }
  await uptimeContext.close();

  await browser.close();
  console.log("\nDone!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
