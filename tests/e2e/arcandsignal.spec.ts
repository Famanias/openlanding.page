import { expect, test } from "@playwright/test";

test("the fictional company carousel rotates counterclockwise and can be paused", async ({ page }) => {
  await page.goto("/arcandsignal");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("great momentum");
  const orbit = page.locator(".asc-orbit-shell");
  const track = page.locator(".asc-orbit-track");
  await orbit.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(orbit).toHaveAttribute("data-visible", "true");
  await expect(track).toHaveCSS("animation-play-state", "running");
  const angle = () => track.evaluate((node) => {
    const matrix = new DOMMatrix(getComputedStyle(node).transform);
    return Math.atan2(matrix.b, matrix.a);
  });
  const before = await angle();
  await page.waitForTimeout(350);
  expect(await angle()).toBeLessThan(before);
  const control = page.getByRole("button", { name: "Pause rotation" });
  await control.click();
  await expect(orbit).toHaveAttribute("data-paused", "true");
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Resume rotation" }).click();
  await expect(orbit).toHaveAttribute("data-paused", "false");
  await page.mouse.move(0, 0);
  await expect(track).toHaveCSS("animation-play-state", "running");
});

test("phone and reduced-motion views keep content visible", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/arcandsignal");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".asc-orbit-track")).toHaveCSS("animation-name", "none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await context.close();
});

test("the page remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/arcandsignal");
  await expect(page.getByRole("heading", { name: /Clarity meets/ })).toBeVisible();
  await expect(page.getByText("Fictional company examples:")).toHaveCount(1);
  await expect(page.locator(".asc-orbit-control")).toBeHidden();
  await context.close();
});

test("jumping past a section cannot leave its content hidden", async ({ page }) => {
  await page.goto("/arcandsignal");
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(page.locator(".asc-case").first()).toHaveAttribute("data-in", "true");
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.locator(".asc-case").first()).toBeVisible();
});
