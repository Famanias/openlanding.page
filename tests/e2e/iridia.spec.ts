import { test, expect } from "@playwright/test";

test.describe("IRIDIA — 3D Prismatic Pavilion Landing Page", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("loads the 3D prismatic space with headline and navigation", async ({ page }) => {
    await page.goto("/iridia");

    // Semantic H1 check
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveText("The spatial architecture of kinetic light.");

    // Navigation and mark
    await expect(page.getByRole("navigation", { name: "Primary Navigation" })).toBeVisible();
    await expect(page.locator(".ir-spatial-viewport")).toBeVisible();
  });

  test("interacts with Spectral Synthesizer presets and sliders", async ({ page }) => {
    await page.goto("/iridia");

    const synth = page.locator("#synthesizer");
    await synth.scrollIntoViewIfNeeded();
    await expect(synth).toBeVisible();

    // Verify preset tabs
    const borealisTab = page.getByRole("tab", { name: "Deep Borealis" });
    await expect(borealisTab).toBeVisible();
    await borealisTab.click();
    await expect(borealisTab).toHaveAttribute("aria-selected", "true");

    // Check wavelength update in SVG readout
    await expect(synth.getByText("532 nm")).toBeVisible();

    // Switch to Supernova
    const supernovaTab = page.getByRole("tab", { name: "Supernova" });
    await supernovaTab.click();
    await expect(supernovaTab).toHaveAttribute("aria-selected", "true");
    await expect(synth.getByText("410 nm")).toBeVisible();

    // Test slider interaction
    const dispSlider = page.getByLabel("Refractive Index");
    await dispSlider.fill("1.75");
    await expect(synth.getByText("1.750")).toBeVisible();

    // Copy CSS button
    const copyBtn = page.getByRole("button", { name: /Copy CSS Code/i });
    await copyBtn.click();
    await expect(page.getByText("Copied to Clipboard")).toBeVisible();
  });

  test("interacts with 3D Exploded Layer Dissection", async ({ page }) => {
    await page.goto("/iridia");

    const dissection = page.locator("#dissection");
    await dissection.scrollIntoViewIfNeeded();
    await expect(dissection).toBeVisible();

    // Inspect layers using tab
    const nematicTab = page.getByRole("tab", { name: /02 · Nematic/i });
    await expect(nematicTab).toBeVisible();
    await nematicTab.click();

    await expect(page.getByRole("heading", { name: /02 · Nematic Liquid Gradient Lattice/i })).toBeVisible();
  });

  test("submits commission form with validation and success feedback", async ({ page }) => {
    await page.goto("/iridia");

    const commSec = page.locator("#commission");
    await commSec.scrollIntoViewIfNeeded();

    const submitBtn = page.getByRole("button", { name: /Transmit Commission Specification/i });
    await submitBtn.click();

    // Validation errors should appear
    await expect(page.getByRole("alert").first()).toBeVisible();

    // Fill valid data
    await page.locator("#comm-name").fill("Dr. Hélène Vane");
    await page.locator("#comm-email").fill("helene@architecture-basel.ch");
    await page.locator("#comm-scale").selectOption("pavilion");
    await page.locator("#comm-band").selectOption("solar");

    // Set future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateStr = futureDate.toISOString().split("T")[0];
    await page.locator("#comm-date").fill(dateStr);

    await submitBtn.click();

    // Success status should be visible
    const status = page.getByRole("status");
    await expect(status).toBeVisible();
    await expect(status.getByRole("heading", { name: "Commission Dossier Transmitted" })).toBeVisible();
  });

  test("renders gracefully under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/iridia");

    const stage = page.locator(".ir-spatial-stage");
    await expect(stage).toBeVisible();
    const transform = await stage.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transform).toBe("none");
  });

  test("renders on mobile at 375px without horizontal scroll overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/iridia");

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // 1px rounding tolerance
  });
});
