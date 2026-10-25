import { expect, test } from "@playwright/test";

test.describe("Valence — Lead Generation & Capture Pages showcase", () => {
  test("unlatches the Stage 01 Splash Gate and updates the capsule dossier depth", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/valence");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Three capture gates.",
    );

    // Select EMEA cohort in the Splash Gate
    const emeaRadio = page.getByRole("radio", { name: /EMEA & UK/i });
    await emeaRadio.click();
    await expect(emeaRadio).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("#splash")).toContainText(/3\.6× higher trust/i);

    // Click the Splash Gate Enter button
    await page.getByTestId("splash-enter-btn").click();
    await expect(page.locator("[data-unseal-percent]")).toHaveAttribute(
      "data-unseal-percent",
      "40",
    );
    expect(errors).toEqual([]);
  });

  test("validates the Stage 02 Squeeze Page single-field form and unlocks Chapter 02 without network calls", async ({
    page,
  }) => {
    const postRequests: string[] = [];
    page.on("request", (req) => {
      if (req.method() === "POST") postRequests.push(req.url());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/valence#squeeze");

    // Submit empty squeeze form -> shows validation message
    await page.getByRole("button", { name: /Unlock 14-Page Digest/i }).click();
    await expect(page.locator("#vl-squeeze-error")).toContainText(
      "Enter your work email",
    );

    // Fill valid email and submit
    await page.locator("#vl-squeeze-email").fill("alex@valence.io");
    await page.getByRole("button", { name: /Unlock 14-Page Digest/i }).click();

    const successPanel = page.getByTestId("squeeze-success-panel");
    await expect(successPanel).toBeVisible();
    await expect(successPanel).toContainText("PASS SQ-26-");
    await expect(page.locator("[data-unseal-percent]")).toHaveAttribute(
      "data-unseal-percent",
      "70",
    );
    expect(postRequests).toEqual([]);
  });

  test("filters the Gated Asset Preview and mints a Stage 03 B2B Lead Capture Dossier Key", async ({
    page,
  }) => {
    const postRequests: string[] = [];
    page.on("request", (req) => {
      if (req.method() === "POST") postRequests.push(req.url());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/valence#preview");

    // Filter benchmark by 1,000+ company size
    await page.getByRole("button", { name: "1,000+", exact: true }).click();
    await expect(page.locator("#preview")).toContainText("4.4×");

    // Switch to Chapter 03 (requires lead-gen)
    await page.getByRole("tab", { name: /CH · 03/i }).click();
    await expect(page.locator("#preview")).toContainText("REQUIRES LEAD-GEN");

    // Scroll to Stage 03 Lead Capture form and validate empty errors
    const submitBtn = page.getByRole("button", {
      name: /Unseal Full Dossier & Mint Key/i,
    });
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    await expect(page.locator("#vl-err-name")).toHaveText("Add your full name.");
    await expect(page.locator("#vl-err-email")).toHaveText(
      "Enter a valid work email address.",
    );
    await expect(page.locator("#vl-err-company")).toHaveText(
      "Add your company or team name.",
    );

    // Fill all required fields and submit
    await page.locator("#vl-lead-name").fill("Elena Vance");
    await page.locator("#vl-lead-email").fill("elena@acmecloud.io");
    await page.locator("#vl-lead-company").fill("Acme Cloud");
    await submitBtn.click();

    const dossierSuccess = page.getByTestId("lead-capture-success-panel");
    await expect(dossierSuccess).toBeVisible();
    await expect(dossierSuccess).toContainText("KEY VL-2026-");
    await expect(page.locator("[data-unseal-percent]")).toHaveAttribute(
      "data-unseal-percent",
      "100",
    );
    expect(postRequests).toEqual([]);
  });

  test("supports 390px touch layout, mobile stages dialog, and zero horizontal overflow", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto("/valence");

    const toggle = page.getByRole("button", {
      name: /Open capture stages menu/i,
    });
    await toggle.click();
    const dialog = page.getByRole("dialog", {
      name: /Funnel capture stages navigation/i,
    });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(390);
    await context.close();
  });

  test("renders a finished static state under prefers-reduced-motion and with JavaScript disabled", async ({
    browser,
  }) => {
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        reducedMotion: "reduce",
        javaScriptEnabled,
      });
      const page = await context.newPage();
      await page.goto("/valence");

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByTestId("valence-capsule-svg")).toBeVisible();
      // Heavy 3D WebGL canvas must never mount under reduced motion
      await expect(page.getByTestId("valence-3d-canvas")).toHaveCount(0);

      for (const reveal of await page.locator("[data-reveal]").all()) {
        await expect(reveal).toHaveCSS("opacity", "1");
      }

      await context.close();
    }
  });
});
