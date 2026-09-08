import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./tests/results",
  fullyParallel: true,
  timeout: 60000,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "https://ela.web.app",
    screenshot: "on",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 14"] } },
  ],
});
