import { expect, test } from "@playwright/test";

test.describe("archived templates", () => {
  const archived = [
    { slug: "starlight", name: "starlight lab" },
    { slug: "spaceedu", name: "spaceedu" },
    { slug: "lucentra", name: "lucentra" },
    { slug: "morrow", name: "morrow" },
    { slug: "sundial", name: "sundial" },
  ];

  for (const { slug, name } of archived) {
    test(`${name} (/${slug}) is not accessible and returns 404`, async ({ page }) => {
      const response = await page.goto(`/${slug}`);
      expect(response?.status()).toBe(404);
    });

    test(`${name} is not visible in the gallery`, async ({ page }) => {
      await page.goto("/");
      await expect(page.locator(`a[href="/${slug}"]`)).toHaveCount(0);
    });
  }
});
