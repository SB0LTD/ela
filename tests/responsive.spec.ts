import { test } from "@playwright/test";

const SITE = "https://elahealing.web.app";

const sizes = [
  { name: "iphone-se", w: 375, h: 667 },
  { name: "iphone-14", w: 390, h: 844 },
  { name: "iphone-pro-max", w: 430, h: 932 },
  { name: "ipad-mini", w: 768, h: 1024 },
];

async function scrollThrough(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let i = 0; i < h; i += 300) { window.scrollTo(0, i); await delay(90); }
    window.scrollTo(0, 0);
    await delay(300);
  });
}

for (const s of sizes) {
  test(`responsive ${s.name} EN`, async ({ page }) => {
    await page.setViewportSize({ width: s.w, height: s.h });
    await page.goto(`${SITE}/?lng=en`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);
    // Check for horizontal overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    await scrollThrough(page);
    await page.screenshot({ path: `tests/screenshots/resp-${s.name}.png`, fullPage: true });
    if (overflow) console.log(`[${s.name}] HORIZONTAL OVERFLOW detected`);
  });
}

test("responsive iphone-14 HE", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${SITE}/?lng=he`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await scrollThrough(page);
  await page.screenshot({ path: "tests/screenshots/resp-iphone-14-he.png", fullPage: true });
});
