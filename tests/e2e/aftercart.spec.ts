import { test, expect } from "@playwright/test";

test.describe("AFTERCART Shopify care page", () => {
  test("rebalances the health console when a care track is selected", async ({ page }) => {
    await page.goto("/aftercart");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Keep your shop ready.");
    const console = page.locator(".ac-health-console");
    await expect(console.getByRole("heading", { level: 2 })).toHaveText("Needs a closer look.");
    await page.getByRole("button", { name: /Speed/ }).click();
    await expect(console.getByRole("heading", { level: 2 })).toHaveText("Ready to tune.");
    await expect(console.locator(".ac-ring strong")).toHaveText("86");
    await expect(console.locator(".ac-console-ticket")).toContainText("Trim the path");
  });

  test("validates and completes the local booking flow", async ({ page }) => {
    await page.goto("/aftercart#call");
    await page.getByRole("button", { name: /Book a care call/ }).last().click();
    await expect(page.getByText("Add your name.")).toBeVisible();
    await page.getByLabel("Conversion / product paths").check();
    await page.getByLabel("Your name").fill("Mina Park");
    await page.getByLabel("Work email").fill("mina@example.com");
    await page.getByLabel("Shop name").fill("Kindred Goods");
    await page.getByRole("button", { name: /Book a care call/ }).last().click();
    await expect(page.getByRole("heading", { name: /Good\. We have a starting point/ })).toBeVisible();
    await expect(page.getByText("nothing was sent", { exact: false })).toBeVisible();
  });

  test("keeps the mobile menu and page within the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/aftercart");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("link", { name: "Store health" }).last()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("shows every reveal under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/aftercart");
    const reveals = page.locator("[data-ac-reveal]");
    for (let index = 0; index < await reveals.count(); index += 1) {
      await expect(reveals.nth(index)).toBeVisible();
    }
  });

  test("keeps the story readable without scripting", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`${test.info().project.use.baseURL}/aftercart`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Store health", { exact: true }).first()).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeVisible();
    await context.close();
  });
});
