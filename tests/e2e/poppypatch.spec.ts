import { expect, test } from "@playwright/test";

test.describe("Poppy Patch landing page template (/poppypatch)", () => {
  test("loads the landing page with accessible brand elements and headline", async ({ page }) => {
    await page.goto("/poppypatch");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Fresh kitchen-grown mushrooms");
    await expect(page.getByText("poppy patch").first()).toBeVisible();
  });

  test("shopping bag drawer opens, updates quantities, and closes with Escape", async ({ page }) => {
    await page.goto("/poppypatch");

    // Default bag count is 1
    const bagBtn = page.getByRole("button", { name: /Open shopping bag/ });
    await expect(bagBtn).toBeVisible();
    await bagBtn.click();

    // Drawer is now open
    const drawerTitle = page.getByRole("heading", { name: "Your Growing Bag" });
    await expect(drawerTitle).toBeVisible();

    // Increment item quantity
    const plusBtn = page.getByRole("button", { name: /Increase quantity/ }).first();
    await plusBtn.click();
    await expect(page.getByRole("button", { name: /Open shopping bag \(2 items\)/ })).toBeVisible();

    // Press Escape to close drawer
    await page.keyboard.press("Escape");
    await expect(drawerTitle).toBeHidden();
  });

  test("kit details dialog opens and can be dismissed", async ({ page }) => {
    await page.goto("/poppypatch");

    // Click quick details on the first kit
    const detailBtn = page.getByRole("button", { name: /View details for The First Sprout Kit/ });
    await detailBtn.scrollIntoViewIfNeeded();
    await detailBtn.click();

    // Dialog is visible
    const modalHeading = page.getByRole("heading", { name: /The First Sprout Kit — \$34/ });
    await expect(modalHeading).toBeVisible();

    // Close with close button
    await page.getByRole("button", { name: "Close kit details dialog" }).click();
    await expect(modalHeading).toBeHidden();
  });

  test("countertop conditions estimator updates harvest speed dynamically", async ({ page }) => {
    await page.goto("/poppypatch");

    const tempSlider = page.getByLabel("Kitchen Countertop Temperature (°F)");
    await tempSlider.scrollIntoViewIfNeeded();
    await tempSlider.fill("78");

    // Should reflect fast growth or updated days
    await expect(page.getByText(/Harvest Window/)).toBeVisible();
  });

  test("newsletter subscription validates email input", async ({ page }) => {
    await page.goto("/poppypatch");

    const emailInput = page.getByPlaceholder("your.name@domain.com");
    await emailInput.scrollIntoViewIfNeeded();

    // Submit empty or invalid
    await emailInput.fill("invalid-email");
    await page.getByRole("button", { name: "JOIN THE PATCH" }).click();
    await expect(page.getByRole("alert")).toContainText("valid email");

    // Submit valid
    await emailInput.fill("gardener@example.com");
    await page.getByRole("button", { name: "JOIN THE PATCH" }).click();
    await expect(page.getByText("Welcome to the patch!")).toBeVisible();
  });

  test("mobile view keeps content readable without horizontal overflow", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/poppypatch");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);

    await context.close();
  });
});
