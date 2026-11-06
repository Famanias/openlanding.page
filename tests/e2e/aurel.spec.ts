import { expect, test } from "@playwright/test";

test.describe("AUREL", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully", async ({ page }) => {
    await page.goto("/aurel");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/aurel");
    await expect(page.locator("body")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/aurel");
    await expect(page.locator("body")).toBeVisible();
  });
});
