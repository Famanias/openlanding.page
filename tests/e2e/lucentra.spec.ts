import { expect, test } from "@playwright/test";

test.describe("LUCENTRA", () => {
  test("is archived and returns 404", async ({ page }) => {
    const response = await page.goto("/lucentra");
    expect(response?.status()).toBe(404);
  });
});
