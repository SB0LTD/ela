import { test } from "@playwright/test";

const SITE = process.env.SITE_URL || "https://elahealing.web.app";

test("full page - desktop", async ({ page }) => {
  await page.goto(SITE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let i = 0; i < h; i += 500) { window.scrollTo(0, i); await delay(120); }
    window.scrollTo(0, 0);
    await delay(400);
  });
  await page.screenshot({ path: "tests/screenshots/full-desktop.png", fullPage: true });
});

test("above fold - desktop", async ({ page }) => {
  await page.goto(SITE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "tests/screenshots/hero-desktop.png" });
});

test("full page - mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(SITE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let i = 0; i < h; i += 500) { window.scrollTo(0, i); await delay(120); }
    window.scrollTo(0, 0);
    await delay(400);
  });
  await page.screenshot({ path: "tests/screenshots/full-mobile.png", fullPage: true });
});
