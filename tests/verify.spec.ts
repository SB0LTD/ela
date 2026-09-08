import { test, expect } from "@playwright/test";

const SITE = "https://elahealing.web.app";

test("music and contact sections render", async ({ page }) => {
  await page.goto(SITE, { waitUntil: "domcontentloaded" });
  await page.locator("#music").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "tests/screenshots/music.png" });

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "tests/screenshots/contact.png" });

  await expect(page.getByText("My journey began with a voice")).toBeVisible();
  await expect(page.getByText("Let's connect")).toBeVisible();
});
