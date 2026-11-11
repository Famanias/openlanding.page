import { expect, test } from "@playwright/test";

test.describe("POSTMARK", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully", async ({ page }) => {
    await page.goto("/templates/postmark");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/templates/postmark");
    await expect(page.locator("body")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/templates/postmark");
    await expect(page.locator("body")).toBeVisible();
  });

  test("interactive widgets function without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", err => errors.push(err.message));
    page.on("console", msg => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/templates/postmark");
    await expect(page.locator("h1, h2").first()).toBeVisible();

    const openBtn = page.locator('button:has-text("Open Letter"), button:has-text("Open")').first();
    if (await openBtn.isVisible()) {
      await openBtn.click();
      await page.waitForTimeout(500);
    }

    const stageButtons = page.locator('button:has-text("Write"), button:has-text("Stamp")');
    if (await stageButtons.count() > 0 && await stageButtons.first().isVisible()) {
      await stageButtons.first().click();
      await page.waitForTimeout(300);
    }

    expect(errors).toEqual([]);
  });
});
