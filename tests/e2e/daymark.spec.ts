import { test, expect } from "@playwright/test";
test("daylight controls and local inquiry", async ({ page }) => {
  await page.goto("/templates/daymark");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("A brighter");
  await page.getByLabel("Time of day").fill("900");
  await expect(page.getByText("15:00", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Seasonal variation" }).click();
  await page.getByRole("button", { name: "Winter" }).click();
  await expect(page.getByText(/Winter changes/)).toBeVisible();
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await page.getByLabel("Name", { exact: true }).fill("Alex");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("What are you imagining?").fill("A study of my roof");
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByText(/inquiry was not sent/i)).toBeVisible();
});

test("keyboard, reduced motion and no-script content", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/templates/daymark");
  const slider = page.getByLabel("Time of day");
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("735");
  await expect(page.locator(".dm-study-inner")).toHaveCSS("position", "static");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.getByRole("button", { name: "Start a conversation" }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await context.close();
  const noScript = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noScript.newPage();
  await staticPage.goto("/templates/daymark");
  await expect(staticPage.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(staticPage.getByText(/Enable JavaScript/)).toBeVisible();
  await noScript.close();
});
