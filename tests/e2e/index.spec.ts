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
