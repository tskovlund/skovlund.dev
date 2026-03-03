import { defineConfig } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: `http://localhost:${PORT}`,
  },

  webServer: {
    command: `pnpm preview --host 0.0.0.0 --port ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
