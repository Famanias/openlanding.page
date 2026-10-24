import { test, expect } from "@playwright/test";

test.describe("HIYAS expedition planner", () => {
  test("loads the route room and footer scene", async ({ page }) => {
    await page.goto("/hiyas");
    await expect(page.getByRole("heading", { name: "Plan the line. Earn the summit." })).toBeVisible();
    await expect(page.locator('[data-asset="hero-route"]')).toBeVisible();
    await expect(page.locator(".hy-footer__wordmark")).toHaveText("HIYAS");
    await expect(page.locator('[data-asset="footer-mountain"]')).toBeVisible();
    await expect(page.getByText("The fourteen", { exact: true }).first()).toBeVisible();
  });

  test("changes peak, days and support, then locks the route plan", async ({ page }) => {
    await page.goto("/hiyas");
    await page.locator("#planner").scrollIntoViewIfNeeded();
    await page.locator(".hy-planner__peak").filter({ hasText: "K2" }).click();
    await page.getByLabel("Planning days").fill("34");
    await page.getByLabel("Support mode").selectOption("private");
    await expect(page.locator(".hy-planner__summary strong")).toContainText("8,611");
    await expect(page.locator(".hy-planner__summary p")).toContainText("34 planning days");
    await page.getByRole("button", { name: /lock this plan/i }).click();
    await expect(page.getByRole("button", { name: /plan locked/i })).toBeVisible();
  });

  test("validates and completes an inquiry locally", async ({ page }) => {
    await page.goto("/hiyas");
    await page.locator("#inquiry").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /request a consultation/i }).click();
    await expect(page.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
    await page.getByLabel("Your name").fill("Mara Chen");
    await page.getByLabel("Email").fill("mara@example.com");
    await page.getByRole("textbox", { name: "Peak" }).fill("Everest");
    await page.getByLabel("Planning days").fill("21");
    await page.getByLabel("What should we know?").fill("I want to understand the route before choosing a season.");
    await page.getByRole("button", { name: /request a consultation/i }).click();
    await expect(page.getByRole("heading", { name: "Your route is on the board." })).toBeVisible({ timeout: 2000 });
  });

  test("keeps content complete under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/hiyas");
    await expect(page.getByRole("heading", { name: "Plan the line. Earn the summit." })).toBeVisible();
    await expect(page.getByLabel("Planning days")).toBeVisible();
    const hidden = await page.locator("[data-reveal]").evaluateAll((nodes) => nodes.filter((node) => Number(getComputedStyle(node).opacity) < .5 || getComputedStyle(node).visibility === "hidden").length);
    expect(hidden).toBe(0);
  });

  test("keeps the peak index and inquiry form available without scripting", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/hiyas");
    await expect(page.getByRole("heading", { name: "Plan the line. Earn the summit." })).toBeVisible();
    await expect(page.getByText("Everest", { exact: true }).first()).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await context.close();
  });

  test("displays all 10 images and both video clips without placeholders", async ({ page }) => {
    await page.goto("/hiyas");

    const expectedImages = [
      "hero-route",
      "planner-profile",
      "peak-everest",
      "peak-k2",
      "support-rope",
      "camp-night",
      "field-note-01",
      "field-note-02",
      "field-note-03",
      "footer-mountain",
    ];

    for (const key of expectedImages) {
      const el = page.locator(`[data-asset="${key}"]`);
      await expect(el).toBeAttached();
      await expect(page.locator(`.hy-media-slot[data-asset="${key}"]`)).toHaveCount(0);
      const img = page.locator(`picture[data-asset="${key}"] img`);
      await expect(img).toBeAttached();
    }

    const expectedClips = ["route-dawn", "camp-wind"];
    for (const clip of expectedClips) {
      const video = page.locator(`[data-clip="${clip}"] video`);
      await expect(video).toBeAttached();
      const source = page.locator(`[data-clip="${clip}"] video source`);
      await expect(source).toHaveAttribute("src", `/templates/hiyas/clips/${clip}.mp4`);
    }
  });
});

