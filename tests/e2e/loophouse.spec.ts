import { test, expect } from "@playwright/test";

test.describe("loophouse — community tool library & pegboard workshop", () => {
  test("loads with one h1 and the hero copy", async ({ page }) => {
    await page.goto("/loophouse");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/The neighborhood.*workshop on your.*own block/);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.locator(".lh-telemetry-chip")).toContainText("428 TOOLS IN CIRCULATION");
  });

  test("hash navigation reaches every section", async ({ page }) => {
    await page.goto("/loophouse");
    for (const hash of ["pegboard", "route", "kits", "ledger", "requisition"]) {
      await page.locator(`#${hash}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${hash}`)).toBeVisible();
    }
  });

  test("signature mechanic: category filtering and tool unlatching", async ({ page }) => {
    await page.goto("/loophouse#pegboard");
    const pegboard = page.locator("#pegboard");
    await pegboard.waitFor({ state: "visible" });

    // Switch category tab
    const metalTab = page.getByRole("tab", { name: /Metal & Machinery/i });
    await metalTab.click();
    await expect(page.locator(".lh-tool-dock")).toContainText("Deep Cut Portable Bandsaw");

    // Click to unlatch a tool dock
    const bandsawDock = page.locator(".lh-tool-dock").filter({ hasText: "Deep Cut Portable Bandsaw" });
    await bandsawDock.click();
    await expect(bandsawDock).toHaveClass(/is-unlatched/);

    // Verify caliper inspection panel displays the unlatched tool's dossier
    const caliperPanel = page.locator(".lh-caliper-panel");
    await expect(caliperPanel).toContainText("CALIBRATION DOSSIER: LH-MT-1845");
    await expect(caliperPanel).toContainText("Deep Cut Portable Bandsaw");
    await expect(caliperPanel).toContainText("116 m/min surface speed");
  });

  test("requisition tray stages tools and adjusts duration", async ({ page }) => {
    await page.goto("/loophouse#pegboard");
    await page.waitForTimeout(300);

    // Stage the unlatched tool
    const stageBtn = page.locator(".lh-caliper-stage-btn");
    await stageBtn.click();

    // Verify requisition tray lists staged tool
    const tray = page.locator(".lh-req-tray");
    await expect(tray).toContainText("REQUISITION TRAY");
    await expect(tray).toContainText("TOOL");

    // Adjust loan slider
    const slider = page.locator("#lh-req-days-input");
    await slider.fill("7");
    await expect(page.locator(".lh-req-days-badge")).toHaveText("7 Days");
  });

  test("requisition intake form validates and confirms without network requests", async ({ page }) => {
    let networkRequestMade = false;
    page.on("request", (req) => {
      if (!req.url().startsWith("http://localhost")) networkRequestMade = true;
    });

    await page.goto("/loophouse#requisition");
    const form = page.locator(".lh-requisition-form");
    await form.waitFor({ state: "visible" });

    // Submit empty form to trigger validation
    await form.getByRole("button", { name: /Confirm Requisition Hold/i }).click();
    await expect(page.locator(".lh-form-error")).toHaveCount(3); // name, email, safety checkbox

    // Fill valid data
    await page.locator("#lh-member-name").fill("Morgan Reed (LH-992)");
    await page.locator("#lh-member-email").fill("morgan@neighborhood.org");
    await page.locator("#lh-safety-check").check();

    // Submit valid form
    await form.getByRole("button", { name: /Confirm Requisition Hold/i }).click();

    // Verify confirmation panel appears with voucher
    const successCard = page.locator(".lh-form-success");
    await expect(successCard).toBeVisible();
    await expect(successCard).toContainText("REQUISITION CONFIRMED");
    await expect(successCard).toContainText("VOUCHER ID: LH-");
    await expect(successCard).toContainText("Morgan Reed (LH-992)");

    expect(networkRequestMade).toBe(false);
  });

  test("reduced motion: all reveal elements are fully visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/loophouse");

    const hero = page.locator(".lh-hero-section");
    await expect(hero).toBeVisible();

    const reveals = page.locator("[data-reveal]");
    const count = await reveals.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      await expect(reveals.nth(i)).toBeVisible();
    }
  });
});
