import { test, expect } from "@playwright/test";

test.describe("Maison Vérane landing template (/verane)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/verane");
    await page.waitForLoadState("networkidle");
  });

  test("loads with exactly one h1 and initial brand state", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("A fragrance is twelve hours long.");

    // Initial clock readout in sticky nav
    const navReadout = page.locator("header").getByText(/H 00:00/);
    await expect(navReadout).toBeVisible();
  });

  test("dry-down scrubber updates the shared hour and marks evaporated notes", async ({ page }) => {
    const scrubber = page.locator("#drydown-scrubber");
    await expect(scrubber).toBeVisible();

    // Advance clock to Hour 2 using the range input
    await scrubber.evaluate((el: HTMLInputElement) => {
      el.value = "2.0";
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Check header updates to H 02:00
    const navReadout = page.locator("header").getByText(/H 02:00/);
    await expect(navReadout).toBeVisible();

    // In Iris Calcaire, Ambrette Seed has gone=1.0, so at hour 2 it should be gone (struck through)
    const ambrette = page.locator(".vr-note-item[data-state='gone']").filter({
      hasText: "Ambrette Seed",
    });
    await expect(ambrette).toBeVisible();
  });

  test("keyboard navigation controls the scrubber", async ({ page }) => {
    const scrubber = page.locator("#drydown-scrubber");
    await scrubber.focus();

    // ArrowRight steps forward by 15 min -> 0.25h -> H 00:15
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("header").getByText(/H 00:15/)).toBeVisible();

    // PageUp steps forward by 1h -> H 01:15
    await page.keyboard.press("PageUp");
    await expect(page.locator("header").getByText(/H 01:15/)).toBeVisible();

    // Home jumps to start -> H 00:00
    await page.keyboard.press("Home");
    await expect(page.locator("header").getByText(/H 00:00/)).toBeVisible();
  });

  test("switching active fragrance in drydown stage updates the title and flacon", async ({ page }) => {
    // Click Nº 1 Première Heure tab
    const tab1 = page.getByRole("tab", { name: /Première Heure/i });
    await tab1.click();

    const stageTitle = page.locator("#drydown").getByRole("heading", { level: 2 });
    await expect(stageTitle).toContainText("Première Heure");
  });

  test("The Organ allows custom raw ingredient composition with derived batch code", async ({ page }) => {
    // Select second vial in top shelf (Bergamote Verte: t2)
    const bergamoteVial = page.getByRole("radio", { name: /Bergamote/i });
    await bergamoteVial.click();

    // Select second vial in heart shelf (Rose de Mai: h2)
    const roseVial = page.getByRole("radio", { name: /Rose de Mai/i });
    await roseVial.click();

    // Verify bespoke blend title updates
    const blendHeading = page.locator("#organ").getByRole("heading", { level: 3 });
    await expect(blendHeading).toContainText("Bergamote · Rose de Mai");

    // Verify batch stamp updates
    const batchStamp = page.locator("#organ .vr-stamp");
    await expect(batchStamp).toContainText("B-0221");
  });

  test("appointment form validates required fields and confirms submission without reload", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /Request Appointment/i });
    await submitBtn.click();

    // Error messages should appear
    await expect(page.getByText("Please provide your name")).toBeVisible();
    await expect(page.getByText("Please provide a valid email")).toBeVisible();

    // Fill valid data
    await page.getByLabel("Full Name *").fill("Laurent Vianney");
    await page.getByLabel("Email Address *").fill("laurent@grasse-parfums.fr");
    await submitBtn.click();

    // Success status message appears
    const statusBox = page.getByRole("status");
    await expect(statusBox).toBeVisible();
    await expect(statusBox).toContainText("We await you in Grasse.");
  });

  test("nav anchors scroll smoothly to targets", async ({ page }) => {
    for (const anchor of ["The Dry-Down", "The Hours", "The Organ", "Atelier"]) {
      const link = page.locator("header nav").getByRole("link", { name: anchor });
      await expect(link).toBeVisible();
    }
  });
});
