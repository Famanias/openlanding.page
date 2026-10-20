import { test, expect } from "@playwright/test";
import { TEMPLATE_PATHS } from "./templates";

test.use({ reducedMotion: "reduce" });

for (const path of TEMPLATE_PATHS) {
  test(`${path}: every heading is visible with reduced motion`, async ({ page }) => {
    await page.goto(path);
    const headings = page.locator("h1, h2");
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const heading = headings.nth(i);
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      const opacity = await heading.evaluate((el) => {
        let node: Element | null = el;
        let value = 1;
        while (node) {
          value *= Number(getComputedStyle(node).opacity);
          node = node.parentElement;
        }
        return value;
      });
      expect(opacity, `heading ${i} opacity`).toBeGreaterThan(0.5);
    }
  });
}
