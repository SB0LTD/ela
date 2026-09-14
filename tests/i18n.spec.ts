import { test, expect } from "@playwright/test";

const SITE = "https://elahealing.web.app";

const cases = [
  { lng: "en", heading: "I didn't choose", dir: "ltr" },
  { lng: "he", heading: "תמיד האמנתי", dir: "rtl" },
  { lng: "ru", heading: "Я не выбирала", dir: "ltr" },
];

for (const c of cases) {
  test(`renders ${c.lng} with dir=${c.dir}`, async ({ page }) => {
    await page.goto(`${SITE}/?lng=${c.lng}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // html dir + lang correct
    const dir = await page.evaluate(() => document.documentElement.dir);
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(dir).toBe(c.dir);
    expect(lang).toBe(c.lng);

    // hero heading translated
    await expect(page.locator("h1")).toContainText(c.heading);

    await page.screenshot({ path: `tests/screenshots/hero-${c.lng}.png` });
  });
}
