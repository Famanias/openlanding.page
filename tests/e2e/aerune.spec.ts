import { expect, test } from "@playwright/test";

test("the building timeline keeps the diagram and simulated readings in sync", async ({ page }) => {
  await page.goto("/templates/aerune");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("air");
  await expect(page.getByText("Example readings", { exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: /meeting peak/i }).click();
  await expect(page.locator("[data-reading='co2']")).toHaveText("980");
  await expect(page.locator("[data-air-scene]")).toHaveAttribute("data-air-scene", "1");
  const slider = page.getByRole("slider", { name: /building day/i });
  await slider.focus();
  await slider.press("End");
  await expect(page.locator("[data-reading='co2']")).toHaveText("530");
});

test("the inquiry validates and presents a local preview", async ({ page }) => {
  await page.goto("/templates/aerune#request");
  await page.getByRole("button", { name: /prepare demo request/i }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await page.getByLabel("Your name").fill("Mika Ito");
  await page.getByLabel("Work email").fill("mika@example.com");
  await page.getByRole("button", { name: /prepare demo request/i }).click();
  await expect(page.getByRole("status")).toContainText("not been sent");
});

test("the mobile experience works without hover and has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/templates/aerune");
  await page.getByRole("button", { name: /open menu/i }).click();
  await expect(page.getByRole("navigation", { name: /mobile/i })).toBeVisible();
  await page.getByRole("navigation", { name: /mobile/i }).getByRole("link", { name: "The live demo", exact: true }).click();
  await page.getByRole("button", { name: /evening/i }).click();
  await expect(page.locator("[data-reading='co2']")).toHaveText("530");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("reduced motion and no JavaScript keep the page readable", async ({ browser, page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/templates/aerune");
  await expect(page.locator("[data-reveal]").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /air through the day/i })).toBeVisible();
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/templates/aerune");
  await expect(staticPage.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(staticPage.getByRole("heading", { name: /air through the day/i })).toBeVisible();
  await context.close();
});
