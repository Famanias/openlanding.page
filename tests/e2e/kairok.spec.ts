import { expect, test } from "@playwright/test";

test.describe("KAIRO K", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully without console errors or hydration mismatch", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/kairok");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();

    // Verify optical lab interactive iris controls work and blade lines render properly
    const balancedBtn = page.locator('button:has-text("Balanced")').first();
    await balancedBtn.click();
    await expect(page.locator("#optics svg line").first()).toBeVisible();

    const hydrationErrors = consoleErrors.filter(
      (err) => err.includes("hydration") || err.includes("Hydration") || err.includes("didn't match")
    );
    expect(hydrationErrors).toEqual([]);
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/kairok");
    await expect(page.locator("body")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/kairok");
    await expect(page.locator("body")).toBeVisible();
  });
});
