import { test, expect } from "@playwright/test";

test.describe("HANDOFF conversion page", () => {
  test("routes a brief and shows local success", async ({ page }) => {
    await page.goto("/handoff");
    await expect(page.getByRole("heading", { name: /Stop chasing every lead/i })).toBeVisible();
    await page.getByRole("link", { name: /Get matched/i }).first().click();
    await page.getByLabel("Follow-up + sales ops").check();
    await page.getByLabel("Name").fill("Mina Park");
    await page.getByLabel("Work email").fill("mina@example.com");
    await page.getByRole("button", { name: /Send the brief/i }).click();
    await expect(page.getByText("Brief received.")).toBeVisible();
  });

  test("shows all content with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/handoff");
    await expect(page.locator("[data-hf-reveal]").first()).toBeVisible();
  });
});
