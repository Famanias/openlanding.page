import { test, expect } from "@playwright/test";

test.describe("OPENHOUSE conversion flow", () => {
  test("keeps one clear action and opens the threshold form", async ({ page }) => {
    await page.goto("/openhouse");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Turn more first clicks into good conversations.");
    await expect(page.getByRole("navigation")).toHaveCount(0);

    const heroForm = page.locator("#booking");
    await heroForm.getByRole("radio", { name: "Fill my calendar" }).check();
    await expect(page.locator(".oh-door-status i")).toHaveCSS("background-color", "rgb(216, 107, 74)");

    await heroForm.getByLabel("Your name (required)").fill("Maya");
    await heroForm.getByLabel("Work email (required)").fill("maya@example.com");
    await heroForm.getByRole("button", { name: "Book my 20-minute call" }).click();

    await expect(page.getByRole("button", { name: "Door is open" }).first()).toBeVisible();
    await expect(page.getByText("Nothing was sent; this template is not connected yet.").first()).toBeVisible();
  });

  test("shows useful content on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/openhouse");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /Book my 20-minute call/ }).last()).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
  });
});
