import { test } from "@playwright/test";

const SITE = "https://elahealing.web.app";

async function scrollThrough(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let i = 0; i < h; i += 400) { window.scrollTo(0, i); await delay(120); }
    window.scrollTo(0, 0);
    await delay(400);
  });
}

test("full desktop EN", async ({ page }) => {
  await page.goto(`${SITE}/?lng=en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await scrollThrough(page);
  await page.screenshot({ path: "tests/screenshots/review-full-en.png", fullPage: true });
});

test("sections EN", async ({ page }) => {
  await page.goto(`${SITE}/?lng=en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  for (const id of ["approach", "offerings", "proof", "music", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `tests/screenshots/review-${id}.png` });
  }
});

test("full desktop HE", async ({ page }) => {
  await page.goto(`${SITE}/?lng=he`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await scrollThrough(page);
  await page.screenshot({ path: "tests/screenshots/review-full-he.png", fullPage: true });
});

test("full mobile EN", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${SITE}/?lng=en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await scrollThrough(page);
  await page.screenshot({ path: "tests/screenshots/review-mobile-en.png", fullPage: true });
});
