import { test, expect } from "@playwright/test";

test("MORTA renders its collection and demonstration commission form", async ({ page }) => {
  await page.goto("/morta");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Wear what");
  await expect(page.getByRole("heading", { name: "Reliquary", exact: true })).toBeVisible();
  await expect(page.locator('img[src^="/templates/morta/"]')).toHaveCount(6);
  await expect(page.locator("#commissions")).toBeVisible();
});
