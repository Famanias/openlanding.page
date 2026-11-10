import { expect, test } from "@playwright/test";
const route = process.env.GRANDSTAND_TEST_PATH ?? "/templates/grandstand";

test("seat picker supports keyboard selection, limits, reset, and a local receipt", async ({ page }) => {
  await page.goto(`${route}#seats`);
  const seat = page.getByRole("button", { name: /Centre, row A, seat 1,/ });
  await seat.focus();
  await page.keyboard.press("Enter");
  await expect(seat).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Remove Centre · A1" })).toBeVisible();
  await page.getByRole("button", { name: "Preview your ticket" }).click();
  const dialog = page.getByRole("dialog", { name: "A NIGHT IMAGINED." });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/No seats have been reserved/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Clear selection" }).click();
  await expect(seat).toHaveAttribute("aria-pressed", "false");
});

test("section zoom and the alternative controls work on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${route}#seats`);
  await page.getByRole("button", { name: "Left", exact: true }).click();
  await expect(page.locator(".gs-map")).toHaveAttribute("viewBox", "15 38 190 255");
  await page.getByText("Choose by section, row and seat").click();
  await page.getByRole("combobox", { name: "Section" }).selectOption("Centre");
  await page.getByRole("combobox", { name: "Row" }).selectOption("B");
  await page.getByRole("combobox", { name: "Seat" }).selectOption("2");
  await page.getByRole("button", { name: "Add seat" }).click();
  await expect(page.getByRole("button", { name: "Remove Centre · B2" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Navigation" })).not.toBeVisible();
});

test("the selected production carries through to the sample ticket", async ({ page }) => {
  await page.goto(`${route}#season`);
  await page.getByRole("button", { name: /A ROOM OF ECHOES/ }).click();
  await expect(page.getByLabel("Your sample ticket")).toContainText("A Room of Echoes");
});

test("the curtain follows scroll and returns when scrolling back", async ({ page }) => {
  await page.goto(route);
  const cue = page.locator("[data-curtain]");
  const box = await cue.boundingBox();
  expect(box).not.toBeNull();
  const viewport = await page.evaluate(() => innerHeight);
  await page.evaluate(({ top, distance }) => window.scrollTo({ top: top + distance * 0.8, behavior: "instant" }), { top: box!.y, distance: box!.height - viewport });
  await expect.poll(() => cue.evaluate((element) => Number(getComputedStyle(element).getPropertyValue("--gs-cue")))).toBeGreaterThan(0.7);
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), box!.y);
  await expect.poll(() => cue.evaluate((element) => Number(getComputedStyle(element).getPropertyValue("--gs-cue")))).toBeLessThan(0.1);
});

test("reduced motion leaves the curtain open with JavaScript enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route);
  await expect(page.locator(".gs-curtain-left")).toBeHidden();
  await expect(page.getByRole("heading", { name: "A LITTLE CLOSER TO THE STORY." })).toBeVisible();
});

test("reduced motion and no JavaScript leave the page readable", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(route);
  await expect(page.getByRole("heading", { name: "TONIGHT BEGINS HERE." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A LITTLE CLOSER TO THE STORY." })).toBeVisible();
  await context.close();
});
