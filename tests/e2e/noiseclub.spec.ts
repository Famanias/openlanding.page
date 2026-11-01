import { test, expect } from "@playwright/test";

test("NOISE CLUB renders narrative chapters and interactive rhythm lab", async ({ page }) => {
  await page.goto("/noiseclub");

  // Check header and title
  await expect(page.getByRole("link", { name: "NOISE CLUB®" }).first()).toBeVisible();
  await expect(page.getByText("THE WORLD IS").first()).toBeVisible();
  await expect(page.getByText("YOUR SAMPLE").first()).toBeVisible();

  // Check all chapters exist
  await expect(page.locator("#the-signal")).toBeVisible();
  await expect(page.locator("#hear-everything")).toBeVisible();
  await expect(page.locator("#capture-it")).toBeVisible();
  await expect(page.locator("#chop-it-up")).toBeVisible();
  await expect(page.locator("#build-a-beat")).toBeVisible();
  await expect(page.locator("#break-the-rules")).toBeVisible();
  await expect(page.locator("#take-the-noise")).toBeVisible();

  // Check interactive sequencer in Chapter 04
  const sequencer = page.locator("#build-a-beat");
  await sequencer.scrollIntoViewIfNeeded();
  await expect(sequencer.getByRole("button", { name: /START SEQUENCER|STOP SEQUENCER/i })).toBeVisible();

  // Check hardware illustration in Chapter 00
  await expect(page.locator("#the-signal svg").first()).toBeVisible();
});

test("NOISE CLUB mobile viewport has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/noiseclub");
  await expect(page.getByRole("link", { name: "NOISE CLUB®" }).first()).toBeVisible();

  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasOverflow).toBe(false);
});
