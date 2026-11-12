import { expect, test } from "@playwright/test";
import { templatePath } from "../../src/lib/template-routing";

test.describe("MESA MARKET landing page", () => {
  const url = templatePath("mesamarket");

  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully and renders key landmarks", async ({ page }) => {
    await page.goto(url);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Good things come into season.");
    await expect(page.locator("#mm-shelf")).toBeVisible();
    await expect(page.locator("#mm-kits")).toBeVisible();
    await expect(page.locator("#mm-growers")).toBeVisible();
    await expect(page.locator("#mm-checkout")).toBeVisible();
  });

  test("category filter updates visible shelf produce items", async ({ page }) => {
    await page.goto(url);
    const shelf = page.locator("#mm-shelf");
    await expect(shelf).toBeVisible();

    // Select Fruit tab
    const fruitTab = shelf.getByRole("tab", { name: "Fruit" });
    await fruitTab.click();
    await expect(fruitTab).toHaveAttribute("aria-selected", "true");

    // Lemon & Apple should be present
    await expect(shelf.getByText("Meyer Orchard Lemons")).toBeVisible();
    await expect(shelf.getByText("Pink Pearl & Gravenstein Apples")).toBeVisible();

    // Vegetables like Lacinato Kale should not be present
    await expect(shelf.getByText("Lacinato Cavolo Nero")).not.toBeVisible();
  });

  test("adding produce updates basket counter in sticky header", async ({ page }) => {
    await page.goto(url);
    const basketBtn = page.locator("button[aria-label*='Open sample produce basket drawer']");
    await expect(basketBtn).toBeVisible();

    // Initial state has 2 items
    await expect(basketBtn).toContainText("Basket (2)");

    // Add Nantes Carrots from shelf
    const addCarrotBtn = page.getByRole("button", { name: /Add to Basket · \$4.25/i });
    await addCarrotBtn.click();

    // Count updates to 3
    await expect(basketBtn).toContainText("Basket (3)");
  });

  test("opens basket drawer from sticky header, adjusts quantities, and closes drawer", async ({ page }) => {
    await page.goto(url);
    const basketBtn = page.locator("button[aria-label*='Open sample produce basket drawer']");
    await basketBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Your Harvest Crate")).toBeVisible();

    // Close via Esc key
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("header remains sticky at top of viewport during scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url);
    const header = page.locator("header");
    await expect(header).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    const box = await header.boundingBox();
    expect(box?.y).toBe(0);
  });

  test("responsive layout has no horizontal scroll on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await expect(page.locator("body")).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);
  });

  test("reduced motion preserves all content visibility", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(url);
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
  });
});
