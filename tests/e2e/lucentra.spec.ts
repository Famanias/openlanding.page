import { expect, test } from "@playwright/test";

test.describe("LUCENTRA calibration studio", () => {
  test("loads the hero and the calibration bench", async ({ page }) => {
    await page.goto("/lucentra");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Tune the surface.");
    await expect(page.getByText("One specimen. Four decisions.")).toBeVisible();
    await page.locator("#bench").scrollIntoViewIfNeeded();
    await expect(page.locator(".lc-bench__panel")).toBeVisible();
  });

  test("the bench range and presets update the live readout", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/lucentra#bench");
    const range = page.getByLabel("Scrub the sample");
    await range.fill("0.66");
    await expect(page.locator(".lc-bench__panel")).toHaveAttribute("data-phase", "spectral");
    await page.getByRole("button", { name: /Blue Hour/ }).click();
    await expect(page.locator(".lc-preset[data-active='true']")).toContainText("Blue Hour");
  });

  test("the local brief validates and transitions to success", async ({ page }) => {
    await page.goto("/lucentra#access");
    const form = page.locator("form");
    await form.getByRole("button", { name: "Hold a bench" }).click();
    await expect(form.getByText("Add your name.")).toBeVisible();
    await form.getByLabel("Name").fill("Mira Chen");
    await form.getByLabel("Work email").fill("mira@example.com");
    await form.getByRole("button", { name: "Hold a bench" }).click();
    await expect(page.locator(".lc-success")).toContainText("Your bench is held.");
  });

  test("the phone layout has no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/lucentra");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });
    test("keeps reveal content visible", async ({ page }) => {
      await page.goto("/lucentra");
      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((element) => getComputedStyle(element).opacity !== "1").length);
      expect(hidden).toBe(0);
    });
  });
});
