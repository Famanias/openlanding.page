import { test, expect } from "@playwright/test";

test("STAR RIOT renders brand lockup, hero, sections, and interactive features", async ({ page }) => {
  await page.goto("/starriot");

  // Check header and brand lockup
  await expect(page.getByRole("link", { name: /STAR RIOT Home/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /TONIGHT,\s*WE GO\s*SUPERNOVA/i })).toBeVisible();

  // Check all core sections exist
  await expect(page.locator("#manifesto")).toBeVisible();
  await expect(page.locator("#nights")).toBeVisible();
  await expect(page.locator("#the-sound")).toBeVisible();
  await expect(page.locator("#the-space")).toBeVisible();
  await expect(page.locator("#faq")).toBeVisible();
  await expect(page.locator("#guestlist")).toBeVisible();

  // Test interactive DJ deck buttons
  const synthiaBtn = page.getByRole("button", { name: /LUNA VEX/i });
  await synthiaBtn.click();
  await expect(page.locator("#live-deck-status")).toContainText("LUNA VEX");

  // Test guestlist form submission
  await page.locator("#guest-name").fill("Cosmic Dancer");
  await page.locator("#guest-email").fill("dancer@starriot.club");
  await page.getByRole("button", { name: /GENERATE DEMO CLUB PASS/i }).click();

  // Check demo pass confirmation
  await expect(page.locator("#demo-pass-confirmation")).toBeVisible();
  await expect(page.locator("#pass-code-value")).toContainText("SR-COSM-");
});

test("STAR RIOT mobile viewport has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/starriot");
  await expect(page.getByRole("link", { name: /STAR RIOT Home/i })).toBeVisible();

  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasOverflow).toBe(false);
});
