import { test, expect } from "@playwright/test";
import { openStandalone } from "./open";

const slugs: string[] = /* SLUGS */[];
const graphics:string[]=/* GRAPHICS */[];
for (const slug of slugs) {
  test(`${slug}: offline runtime, images and mobile reduced-motion layout`, async ({ page }) => {
    if(graphics.includes(slug)){
      test.setTimeout(90_000);
      // Dedicated graphics tests exercise the live GPU. This suite covers assets and the static mode.
      await page.emulateMedia({reducedMotion:"reduce"});
    }
    const errors: string[] = [];
    const requests: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("request", request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
    await openStandalone(page, `/${slug}`);
    await expect(page.locator("h1:visible").first()).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const progress of [0.25, 0.5, 0.75, 1]) {
      await page.evaluate(p => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * p, behavior: "instant" }), progress);
      await page.waitForTimeout(100);
    }
    await page.locator("img").evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = "eager"; }));
    await expect.poll(() => page.locator("img").evaluateAll(images => (images as HTMLImageElement[]).filter(image => !image.complete || image.naturalWidth === 0).map(image => image.alt))).toEqual([]);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator("h1:visible").first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(requests).toEqual([]);
    expect(errors).toEqual([]);
  });
  test(`${slug}: offline content without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ offline: true, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await openStandalone(page, `/${slug}`);
      await expect(page.locator("h1:visible").first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    } finally { await context.close(); }
  });
}
