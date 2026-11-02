import { expect, test } from "@playwright/test";

test.describe("Ines Vale — Independent Photographer", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads the portfolio with headline and primary navigation", async ({ page }) => {
    await page.goto("/inesvale");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("The beauty between moments");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByText("INDEPENDENT PHOTOGRAPHER")).toBeVisible();
  });

  test("hero slide step navigation advances slides", async ({ page }) => {
    await page.goto("/inesvale");
    const nextButton = page.getByRole("button", { name: "Next featured photograph" });
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await expect(page.getByText("02 — 06")).toBeVisible();
  });

  test("archive category filters update active selection", async ({ page }) => {
    await page.goto("/inesvale#archive");
    const portraitsTab = page.getByRole("button", { name: /Portraits/i });
    await portraitsTab.click();
    await expect(portraitsTab).toHaveAttribute("aria-pressed", "true");
  });

  test("inquiry form validates required inputs and handles client draft", async ({ page }) => {
    await page.goto("/inesvale#inquire");
    const submitBtn = page.getByRole("button", { name: /OPEN EMAIL DRAFT/i });
    await submitBtn.click();
    await expect(page.getByText("Please share your name or studio.")).toBeVisible();

    await page.locator("#inquiry-name").fill("Elena Rostova");
    await page.locator("#inquiry-email").fill("elena@rostova-art.org");
    await page.locator("#inquiry-message").fill("We would like to commission an editorial monograph series.");
    await submitBtn.click();
    await expect(page.getByRole("status")).toContainText("Email draft prepared for Elena Rostova");
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/inesvale");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/inesvale");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#stories")).toBeVisible();
    await expect(page.locator("#archive")).toBeVisible();
    await expect(page.locator("#closer-look")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#notes")).toBeVisible();
    await expect(page.locator("#inquire")).toBeVisible();
  });
});
