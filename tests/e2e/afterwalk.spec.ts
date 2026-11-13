import { expect, test } from "@playwright/test";

test("filters walks and makes a truthful local card", async ({ page }) => {
  await page.goto("/templates/afterwalk");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Good things");
  await page.getByRole("button", { name: "An hour or less" }).click();
  await expect(page.getByRole("heading", { name: "The riverside ramble" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Park & pastry" })).toBeVisible();
  await page.getByRole("button", { name: "Choose Park & pastry" }).click();
  await expect(page.getByLabel("Your kind of walk")).toHaveValue("park");
  await page.getByLabel("Your first name").fill("Sam");
  await page.getByRole("button", { name: "Make my walk card" }).click();
  await expect(page.getByRole("status").filter({ hasText: "See you out there" })).toContainText("Sam");
  await expect(page.getByRole("status").filter({ hasText: "See you out there" })).toContainText("No meetup is booked");
});

test("mobile menu, narrow layout, and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/templates/afterwalk");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "The walks" }).click();
  await expect(page).toHaveURL(/#walks/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  for (const element of await page.locator("[data-reveal]").all()) await expect(element).toBeVisible();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("shows the content and a truthful form fallback", async ({ page }) => {
    await page.goto("/templates/afterwalk");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#plan noscript p")).toBeVisible();
    await expect(page.locator("#plan noscript p")).toContainText("The walk card needs JavaScript.");
    await expect(page.getByRole("heading", { name: "Park & pastry" })).toBeVisible();
  });
});
