import { expect, test } from "@playwright/test";

test.describe("starlight", () => {
  test("is archived and returns 404", async ({ page }) => {
    const response = await page.goto("/starlight");
    expect(response?.status()).toBe(404);
  });
});
