import { test, expect } from "@playwright/test";

test("renders the page, title, header, hero and main landmarks", async ({ page }) => {
  await page.goto("/parallel");

  // Title and Brand
  await expect(page).toHaveTitle(/PARALLEL/i);
  await expect(page.getByRole("link", { name: "PARALLEL", exact: true })).toBeVisible();

  // Primary heading
  await expect(page.getByRole("heading", { level: 1 })).toContainText("See what happens next.");

  // Explore simulation button using testid
  const exploreBtn = page.getByTestId("hero-explore-cta");
  await expect(exploreBtn).toBeVisible();

  // Click Explore simulation to enter interactive hero mode
  await exploreBtn.click();

  // Verify interactive chapter navigation appears
  await expect(page.getByRole("button", { name: /01\s+Explore/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /02\s+Systems/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /03\s+Disrupt/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /04\s+Simulate/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /05\s+Explain/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /06\s+Outcome/i })).toBeVisible();

  // Verify request demo section landmark exists
  await expect(page.locator("#request-demo")).toBeVisible();
});

test("supports autostart to open directly into Simulate mode", async ({ page }) => {
  await page.goto("/parallel?autostart=1");

  // Verify simulation mode active
  await expect(page.locator("main")).toHaveAttribute("data-hero-mode", "simulate");

  // Verify simulation controls are visible
  await expect(page.locator(".par-slider").first()).toBeVisible();
});

test("validates the demo request form fields", async ({ page }) => {
  await page.goto("/parallel");

  const submitBtn = page.getByTestId("submit-demo-btn");
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click({ force: true });

  // Error messages should appear for required empty inputs
  await expect(page.getByText("Please enter your full name.")).toBeVisible();
});

test("respects reduced-motion preference without crashing", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/parallel");

  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("See what happens next.");
});
