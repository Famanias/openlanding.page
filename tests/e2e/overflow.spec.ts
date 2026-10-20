import { test, expect } from "@playwright/test";
import { TEMPLATE_PATHS } from "./templates";

test.use({ viewport: { width: 375, height: 812 } });

for (const path of ["/", ...TEMPLATE_PATHS]) {
  test(`${path}: no horizontal page overflow at 375px`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
  });
}
