import { test, expect } from "@playwright/test";

test.describe("Nico Park — Product Design Portfolio", () => {
  test("renders the hero masthead and primary navigation", async ({ page }) => {
    await page.goto("/nicopark");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByLabel("nico park. home")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("DESIGN SHOULD FEEL GOOD");
    await expect(page.getByRole("link", { name: /LET'S CONNECT/i })).toBeVisible();
  });

  test("interacts with the LOOP Anatomy exploded view and part inspection", async ({ page }) => {
    await page.goto("/nicopark");
    const anatomy = page.locator("#anatomy");
    await anatomy.scrollIntoViewIfNeeded();
    await expect(anatomy).toBeVisible();

    // Toggle exploded mode
    const explodeBtn = anatomy.getByRole("button", { name: /EXPLODED VIEW|ASSEMBLED/i });
    await explodeBtn.click();

    // Select different anatomy part buttons
    const dialBtn = anatomy.getByRole("button", { name: /DIAL/i });
    if (await dialBtn.isVisible()) {
      await dialBtn.click();
      await expect(anatomy).toContainText("Rotary encoder");
    }
  });

  test("opens and closes case study details in Selected Work", async ({ page }) => {
    await page.goto("/nicopark");
    const work = page.locator("#work");
    await work.scrollIntoViewIfNeeded();
    await expect(work).toBeVisible();

    // Open first case study deep dive modal
    const viewButtons = work.getByRole("button", { name: /READ FULL CASE STUDY|VIEW CASE STUDY/i });
    if (await viewButtons.first().isVisible()) {
      await viewButtons.first().click();
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
      // Close modal
      const closeBtn = modal.getByRole("button", { name: /CLOSE/i });
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    }
  });

  test("validates and handles contact inquiry form", async ({ page }) => {
    await page.goto("/nicopark");
    const contact = page.locator("#contact");
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeVisible();

    // Submit empty form to trigger validation
    const submitBtn = contact.getByRole("button", { name: /SEND INQUIRY/i });
    await submitBtn.click();
    await expect(contact.getByText(/Name must be at least 2 characters|Please enter a valid work email/i).first()).toBeVisible();

    // Fill valid data
    await contact.getByPlaceholder("e.g. Elena Vance").fill("Elena Vance");
    await contact.getByPlaceholder("e.g. elena@teenage-atelier.io").fill("elena@teenage-atelier.io");
    await contact.getByPlaceholder(/Tell me a bit about what you're making/i).fill("We are building a tactile handheld device and would love your design expertise.");

    // Submit again
    await submitBtn.click();
    await expect(contact.getByText(/READY TO SEND|OPEN EMAIL CLIENT/i)).toBeVisible();
  });

  test("supports reduced motion mode without breaking layout", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/nicopark");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#anatomy")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });
});
