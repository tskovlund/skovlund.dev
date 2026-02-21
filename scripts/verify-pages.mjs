import { chromium } from "playwright";
const browser = await chromium.launch();

// Dark mode
const darkContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});
const darkPage = await darkContext.newPage();

await darkPage.goto("http://localhost:4321/projects", {
  waitUntil: "networkidle",
});
await darkPage.waitForTimeout(1000);
await darkPage.screenshot({ path: "/tmp/projects-dark.png", fullPage: true });

await darkPage.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await darkPage.waitForTimeout(1000);
await darkPage.screenshot({ path: "/tmp/homepage-dark.png", fullPage: true });

await darkContext.close();

// Light mode
const lightContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});
const lightPage = await lightContext.newPage();

await lightPage.goto("http://localhost:4321/projects", {
  waitUntil: "networkidle",
});
await lightPage.waitForTimeout(1000);
await lightPage.screenshot({ path: "/tmp/projects-light.png", fullPage: true });

await lightPage.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await lightPage.waitForTimeout(1000);
await lightPage.screenshot({ path: "/tmp/homepage-light.png", fullPage: true });

await lightContext.close();

await browser.close();
console.log(
  "done — check /tmp/projects-{dark,light}.png and /tmp/homepage-{dark,light}.png",
);
