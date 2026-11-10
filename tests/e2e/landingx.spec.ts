import { test, expect } from "@playwright/test";

test("the work index filters real projects and keeps each empty image slot at 16:9", async ({ page }) => {
  await page.goto("/landingx");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Your idea deserves");
  await expect(page.locator(".lx-project")).toHaveCount(6);
  const size = await page.locator(".lx-project-media").first().boundingBox();
  expect(size).not.toBeNull();
  expect(size!.width / size!.height).toBeCloseTo(16 / 9, 1);
  await page.getByRole("button", { name: "Product", exact: true }).click();
  await expect(page.locator(".lx-project")).toHaveCount(2);
  await expect(page.locator(".lx-index-count")).toHaveText("SHOWING 02 / 06");
  await expect(page.locator("#lx-project-grid").getByRole("link", { name: "Explore the Avel landing page" })).toHaveAttribute("href", "/avel");
  await page.getByRole("button", { name: "All work" }).click();
  await expect(page.locator(".lx-project")).toHaveCount(6);
});

test("all six project previews load in the work index", async ({ page }) => {
  await page.goto("/templates/landingx#work");
  const images = page.locator("#lx-project-grid img");
  await expect(images).toHaveCount(6);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test("the starter brief can be copied", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/landingx#start");
  await page.getByRole("button", { name: /Copy brief/ }).click();
  await expect(page.getByRole("status")).toContainText("Copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Create a landing page template");
});

test("scroll reveals and reduced motion keep every section visible", async ({ page }) => {
  await page.goto("/landingx");
  const processStep = page.locator(".lx-steps article").first();
  await processStep.scrollIntoViewIfNeeded();
  await expect(processStep).toHaveAttribute("data-in", "true");
  expect(Number(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--lx-progress")))).toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/landingx");
  const reveals = page.locator("[data-reveal]");
  const count = await reveals.count();
  for (let i = 0; i < count; i++) {
    await expect(reveals.nth(i)).toBeVisible();
  }
});

test("phone and no-JavaScript views keep the complete index visible", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/landingx");
  await expect(page.locator(".lx-project")).toHaveCount(6);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
