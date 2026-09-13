import { test, expect } from "@playwright/test";

const SITE = "https://elahealing.web.app";

test("language dropdown opens and switches", async ({ page }) => {
  await page.goto(SITE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // Open the dropdown
  await page.getByRole("button", { name: "Select language" }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "tests/screenshots/lang-open.png" });

  // Options visible
  await expect(page.getByRole("option", { name: /English/ })).toBeVisible();
  await expect(page.getByRole("option", { name: /עברית/ })).toBeVisible();
  await expect(page.getByRole("option", { name: /Русский/ })).toBeVisible();

  // Switch to Hebrew
  await page.getByRole("option", { name: /עברית/ }).click();
  await page.waitForTimeout(800);
  const dir = await page.evaluate(() => document.documentElement.dir);
  expect(dir).toBe("rtl");
  await page.screenshot({ path: "tests/screenshots/lang-he-active.png" });
});
