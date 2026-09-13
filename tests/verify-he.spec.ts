import { test, expect } from "@playwright/test";

const SITE = "https://elahealing.web.app";

test("Hebrew — offerings, music, contact render", async ({ page }) => {
  await page.goto(`${SITE}/?lng=he`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  await page.locator("#offerings").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "tests/screenshots/he-offerings.png" });
  await expect(page.getByText("פרקטיקות שתומכות בך")).toBeVisible();

  await page.locator("#music").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "tests/screenshots/he-music.png" });

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: "tests/screenshots/he-contact.png" });
  await expect(page.getByText("בואו נתחבר")).toBeVisible();
});
