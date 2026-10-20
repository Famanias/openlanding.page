import { test, expect } from "@playwright/test";

test("index lists the three templates", async ({ page }) => {
  await page.goto("/");
  for (const [name, href] of [
    ["Orrery", "/orrery"],
    ["Cairn", "/cairn"],
    ["KŌJI", "/koji"],
  ]) {
    await expect(page.getByRole("link", { name })).toHaveAttribute("href", href);
  }
});

// Temporary (removed in Task 18): proves the heavy client deps load in a production build.
test("heavy client dependencies load", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-deps="ok"]')).toBeAttached({ timeout: 5_000 });
});
