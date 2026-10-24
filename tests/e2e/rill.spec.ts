import { test, expect } from "@playwright/test";

test.describe("RILL watershed story", () => {
  test("loads the image-led field story and ecosystem footer", async ({ page }) => {
    await page.goto("/rill");
    await expect(page.getByRole("heading", { name: "Read the land. Keep the rain." })).toBeVisible();
    await expect(page.locator('[data-asset="hero-ridge"]')).toBeVisible();
    await expect(page.getByRole("img", { name: /ecosystem line drawing/i })).toBeVisible();
    await expect(page.getByText("Keep water in the ground.")).toBeVisible();
  });

  test("keeps the rain gauge, phase and water budget in sync", async ({ page }) => {
    await page.goto("/rill");
    const gauge = page.getByLabel("Rainfall in millimetres");
    await gauge.fill("42");
    await expect(page.locator(".rl-header__rain-value")).toHaveText("42 mm");
    await expect(page.locator(".rl-land__hud-value")).toContainText("42");
    await expect(page.locator(".rl-budget")).toHaveAttribute("data-status", "ready");
    await expect(page.locator(".rl-land__phase")).toContainText("storage");
    await gauge.press("End");
    await expect(page.locator(".rl-land__phase")).toContainText("root zone");
  });

  test("validates and completes a field-walk request locally", async ({ page }) => {
    await page.goto("/rill");
    await page.locator("#field-walk").scrollIntoViewIfNeeded();
    await page.getByLabel("Your name").fill("Mara Chen");
    await page.getByLabel("Farm or field").fill("Cienega Fields");
    await page.getByLabel("Email").fill("mara@");
    await page.getByLabel("Acres").fill("14");
    await page.getByRole("button", { name: /request a field walk/i }).click();
    await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Enter a valid email.")).toBeVisible();
    await page.getByLabel("Email").fill("mara@example.com");
    await page.getByLabel("What should the field hold?").fill("Hold the next storm in the root zone.");
    await page.getByRole("button", { name: /request a field walk/i }).click();
    await expect(page.getByText("Reading the field")).toBeVisible();
    await expect(page.getByRole("heading", { name: "The field is on the map." })).toBeVisible({ timeout: 2000 });
  });

  test("keeps the full story visible under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/rill");
    await expect(page.locator(".rl-land__stage")).toHaveCSS("position", "relative");
    await expect(page.getByRole("heading", { name: "Read the land. Keep the rain." })).toBeVisible();
    await expect(page.getByLabel("Rainfall in millimetres")).toBeVisible();
    const hidden = await page.locator("[data-reveal]").evaluateAll((nodes) => nodes.filter((node) => Number(getComputedStyle(node).opacity) < 0.5 || getComputedStyle(node).visibility === "hidden").length);
    expect(hidden).toBe(0);
  });

  test("keeps content and the form available without scripting", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/rill");
    await expect(page.getByRole("heading", { name: "Read the land. Keep the rain." })).toBeVisible();
    await expect(page.locator(".rl-land__fallback-list")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await context.close();
  });
});

