import { test, expect } from "@playwright/test";

test.describe("AMAOTO", () => {
  test("renders the wagasa story and commission form", async ({ page }) => {
    await page.goto("/amaoto");
    await expect(page.getByRole("heading", { name: /The sound of rain/i })).toBeVisible();
    await expect(page.locator("canvas")).toBeVisible();
    await page.getByRole("link", { name: /Reserve a commission/i }).click();
    await expect(page.locator("#commission")).toBeVisible();
    await page.getByRole("button", { name: /Reserve a commission/i }).click();
    await expect(page.getByText("Add your name")).toBeVisible();
  });

  test("part callouts and canopy controls are keyboard reachable", async ({ page }) => {
    await page.goto("/amaoto#structure");
    await page.getByRole("button", { name: /Bamboo ribs/i }).click();
    await expect(page.getByText(/Forty bowed bamboo ribs/i)).toBeVisible();
    await page.locator("#sun").fill("-45");
    await page.getByRole("radio", { name: /Dusk indigo/i }).click();
    await expect(page.getByRole("radio", { name: /Dusk indigo/i })).toHaveAttribute("aria-checked", "true");
  });
});
