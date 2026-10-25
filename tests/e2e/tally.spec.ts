import { expect, test } from "@playwright/test";

test.describe("TALLY — Shopify service-counter landing page", () => {
  test("renders the counter hero, rings the counter bell, and stamps the hero stub", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tally");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Sell your hours");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("like your goods.");

    const bellBtn = page.getByRole("button", { name: /Ring Bell & Stamp/i });
    await bellBtn.click();
    await expect(page.locator(".tl-hero-ticket")).toHaveAttribute("data-stamped", "true");

    // Pause and resume counter motion
    const pauseBtn = page.locator(".tl-header-pause");
    await pauseBtn.click();
    await expect(page.locator("html")).toHaveAttribute("data-tl-paused", "true");
    await pauseBtn.click();
    await expect(page.locator("html")).toHaveAttribute("data-tl-paused", "false");

    expect(errors).toEqual([]);
  });

  test("switches archetypes, updates deposit math, tears the claim stub, and carries setup to the form", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tally#ledger");

    // Switch to Bicycle Repair Bay archetype
    await page.getByRole("tab", { name: /Bicycle Repair Bay/i }).click();
    await expect(page.locator(".tl-ticket-shop")).toHaveText("Spoke & Pawl Cycleworks");

    // Switch checkout deposit split to 25%
    await page.getByRole("button", { name: "25% Deposit" }).click();
    await expect(page.locator(".tl-ticket-serial")).toHaveText("TLY-26-2025");

    // Tear the customer claim stub
    const tearBtn = page.getByRole("button", { name: /Stamp & Tear Claim Stub/i });
    await tearBtn.click();
    await expect(page.locator(".tl-perforated-ticket")).toHaveAttribute("data-detached", "true");
    await expect(page.locator(".tl-runway")).toHaveAttribute("data-stop", "04");

    // Carry setup to the onboarding form
    await page.getByRole("link", { name: /Use This Counter Setup/i }).click();
    await expect(page).toHaveURL(/#open-counter$/);
    await expect(page.getByLabel("Primary service archetype")).toHaveValue("cycle");
  });

  test("toggles service modes and opens/closes a merchant receipt modal with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tally#modes");

    const posToggle = page.getByRole("button", { name: "Shopify POS Bench" }).first();
    await posToggle.click();
    await expect(page.locator('.tl-mode-snippet[data-view="pos"]').first()).toBeVisible();

    const receiptBtn = page.getByRole("button", { name: /Inspect Receipt #TLY-26-1050/i });
    await receiptBtn.scrollIntoViewIfNeeded();
    await receiptBtn.click();

    const dialog = page.locator(".tl-receipt-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Hem & Haw Denim Atelier");

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(receiptBtn).toBeFocused();
  });

  test("validates the counter onboarding form locally and stamps a Trial Pass without network requests", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tally#open-counter");

    const postRequests: string[] = [];
    page.on("request", (req) => {
      if (req.method() === "POST") postRequests.push(req.url());
    });

    // Submit empty form to trigger validation
    await page.getByRole("button", { name: /Stamp & Issue Trial Pass/i }).click();
    await expect(page.locator(".tl-error")).toHaveCount(3);
    await expect(page.getByLabel("Shopify store or workshop name")).toBeFocused();

    // Fill valid merchant details
    await page.getByLabel("Shopify store or workshop name").fill("Loom & Selvage Co.");
    await page.getByLabel("Merchant email address").fill("hello@loomselvage.shop");
    await page.getByLabel("What service or bench workflow are you putting on Shopify?").fill(
      "Chain-stitch denim hemming, darning repairs, and 30-minute custom pin fittings."
    );

    await page.getByRole("button", { name: /Stamp & Issue Trial Pass/i }).click();

    const passRegion = page.getByRole("region", { name: "Issued Merchant Trial Pass" });
    await expect(passRegion).toBeVisible();
    await expect(passRegion).toContainText("Loom & Selvage Co.");
    await expect(passRegion).toContainText("no network request was sent");
    expect(postRequests).toEqual([]);

    // Reset to configure another counter
    await page.getByRole("button", { name: "Configure Another Counter" }).click();
    await expect(page.getByRole("form", { name: "Open your service counter" })).toBeVisible();
  });

  test("supports a 390px touch layout with accessible mobile navigation and zero horizontal overflow", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto("/tally");

    await page.getByRole("button", { name: "Open navigation" }).click();
    const dialog = page.locator(".tl-mobile-dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);

    await context.close();
  });

  test("delivers a complete, visible static experience under reduced motion and with JavaScript disabled", async ({ browser }) => {
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
        javaScriptEnabled,
      });
      const page = await context.newPage();
      await page.goto("/tally");

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const reveals = await page.locator("[data-reveal]").all();
      expect(reveals.length).toBeGreaterThan(5);
      for (const el of reveals) {
        await expect(el).toHaveCSS("opacity", "1");
      }

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(390);
      await context.close();
    }
  });
});
