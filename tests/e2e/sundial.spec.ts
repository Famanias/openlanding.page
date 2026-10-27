import { test, expect } from "@playwright/test";

test.describe("sundial", () => {
  test("is archived and returns 404", async ({ page }) => {
    const response = await page.goto("/sundial");
    expect(response?.status()).toBe(404);
  });
});
