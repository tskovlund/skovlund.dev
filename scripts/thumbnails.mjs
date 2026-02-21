/**
 * Generate card thumbnail images for project covers.
 *
 * Two modes:
 * - Playwright capture: navigates to a URL and clips a region
 * - Static crop: crops a region from an existing image file
 *
 * Usage: node scripts/thumbnails.mjs
 * Requires: dev server running at localhost:4321 (for Playwright captures)
 */

import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DEV_SERVER = "http://localhost:4321";
const VIEWPORT = { width: 1280, height: 800 };
const DEVICE_SCALE_FACTOR = 2;
const THUMBNAIL_SIZE = 400;

function projectPath(name, suffix) {
  return join(ROOT, `src/content/projects/${name}/cover${suffix}.png`);
}

/** Capture a thumbnail from a live page via Playwright. */
async function captureFromPage(browser, options) {
  const { name, url, clip, colorScheme, theme, suffix } = options;
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    colorScheme: theme,
  });
  const page = await context.newPage();

  if (colorScheme) {
    await page.addInitScript(
      ({ schemeId, themeMode }) => {
        localStorage.setItem("colorScheme", schemeId);
        localStorage.setItem("theme", themeMode);
      },
      { schemeId: colorScheme, themeMode: theme },
    );
  }

  await page.goto(`${DEV_SERVER}${url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const outputPath = projectPath(name, suffix);
  mkdirSync(dirname(outputPath), { recursive: true });
  await page.screenshot({ path: outputPath, clip });
  console.log(`  captured: src/content/projects/${name}/cover${suffix}.png`);
  await context.close();
}

/** Crop a thumbnail from an existing image file using sharp. */
async function cropFromFile(options) {
  const { name, source, crop, suffix } = options;
  const sourcePath = join(ROOT, source);
  const outputPath = projectPath(name, suffix);
  mkdirSync(dirname(outputPath), { recursive: true });

  await sharp(sourcePath)
    .extract({
      left: crop.x,
      top: crop.y,
      width: crop.width,
      height: crop.height,
    })
    .resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE)
    .png()
    .toFile(outputPath);

  console.log(`  cropped: src/content/projects/${name}/cover${suffix}.png`);
}

async function main() {
  const browser = await chromium.launch();

  // --- skovlund-dev: hero area from homepage ---
  console.log("\nskovlund-dev:");
  for (const [theme, suffix] of [
    ["dark", ""],
    ["light", "-light"],
  ]) {
    await captureFromPage(browser, {
      name: "skovlund-dev",
      url: "/",
      clip: { x: 170, y: 50, width: 400, height: 400 },
      colorScheme: "tokyo-night",
      theme,
      suffix,
    });
  }

  // --- miles-vps: dark from Uptime Kuma (dark bg), light from Grafana (white content) ---
  console.log("\nmiles-vps:");
  await cropFromFile({
    name: "miles-vps",
    source: "src/content/projects/miles-vps/uptime-kuma.png",
    crop: { x: 60, y: 80, width: 1300, height: 1300 },
    suffix: "",
  });
  await cropFromFile({
    name: "miles-vps",
    source: "src/content/projects/miles-vps/grafana-dashboard.png",
    crop: { x: 380, y: 200, width: 1300, height: 1300 },
    suffix: "-light",
  });

  // --- nix-config: capture from GitHub repo page ---
  console.log("\nnix-config:");
  for (const [theme, suffix] of [
    ["dark", ""],
    ["light", "-light"],
  ]) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      colorScheme: theme,
    });
    const page = await context.newPage();
    await page.goto("https://github.com/tskovlund/nix-config", {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(1000);

    const outputPath = projectPath("nix-config", suffix);
    mkdirSync(dirname(outputPath), { recursive: true });
    // Clip the file tree showing repo structure
    await page.screenshot({
      path: outputPath,
      clip: { x: 5, y: 125, width: 460, height: 460 },
    });
    console.log(
      `  captured: src/content/projects/nix-config/cover${suffix}.png`,
    );
    await context.close();
  }

  // --- advent-of-code: capture from adventofcode.com calendar ---
  console.log("\nadvent-of-code:");
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      colorScheme: "dark",
    });
    const page = await context.newPage();
    await page.goto("https://adventofcode.com", {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(1000);

    const outputPath = projectPath("advent-of-code", "");
    mkdirSync(dirname(outputPath), { recursive: true });
    // Clip the ASCII art calendar with day numbers
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 550, height: 550 },
    });
    console.log(`  captured: src/content/projects/advent-of-code/cover.png`);
    await context.close();
  }

  await browser.close();
  console.log("\nDone!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
