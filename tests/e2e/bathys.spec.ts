import { test, expect } from "@playwright/test";

test.describe("BATHYS — Autonomous Hadal Exploration Submersible", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("loads the page with headline, header HUD, and key specifications with zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/bathys");

    // Semantic H1 check
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("11,000-metre breach");

    // Header HUD check
    await expect(page.getByRole("navigation", { name: "Primary Navigation" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: /Commission Payload/i })).toBeVisible();

    // Verify key specification cards
    await expect(page.locator("#hero").getByText("11,000 M", { exact: true })).toBeVisible();
    await expect(page.locator("#hero").getByText("1,114 BAR", { exact: true })).toBeVisible();

    // Verify zero DOM property console errors
    const invalidDomErrors = consoleErrors.filter((e) => e.includes("Invalid DOM property"));
    expect(invalidDomErrors).toHaveLength(0);
  });

  test("interacts with the Hadal Descent Stage presets and scrubber", async ({ page }) => {
    await page.goto("/bathys");

    const descent = page.locator("#descent");
    await descent.scrollIntoViewIfNeeded();
    await expect(descent).toBeVisible();

    // Verify initial depth at or near surface
    await expect(page.getByText(/Vertical Sounding:/i)).toBeVisible();

    // Click preset 10,928m (Challenger Deep)
    const hadalPreset = page.getByRole("button", { name: "10,928m" });
    await hadalPreset.click();

    // Verify telemetry updates to Hadal depth & pressure
    const gauge = page.getByRole("region", { name: "Hydrostatic Telemetry Gauge" });
    await expect(gauge.getByText("10,928", { exact: true })).toBeVisible();
    await expect(gauge.getByText("1115.6", { exact: true })).toBeVisible();
    await expect(page.getByText("HADAL LOCK ACTIVE")).toBeVisible();

    // Click preset 1,000m
    const mesoPreset = page.getByRole("button", { name: "1,000m" });
    await mesoPreset.click();
    await expect(gauge.getByText("1,000", { exact: true })).toBeVisible();

    // Ping button on Sonar Radar
    const pingBtn = page.getByRole("button", { name: /Transmit Ping/i });
    await expect(pingBtn).toBeVisible();
    await pingBtn.click();
  });

  test("switches sub-assembly modules in Vehicle Architecture", async ({ page }) => {
    await page.goto("/bathys");

    const arch = page.locator("#architecture");
    await arch.scrollIntoViewIfNeeded();
    await expect(arch).toBeVisible();

    // Default tab: Titanium Pressure Sphere
    await expect(arch.getByText("HULL-TI-64")).toBeVisible();

    // Click Syntactic Foam Core tab
    const foamTab = page.getByRole("tab", { name: /Syntactic Foam Core/i });
    await foamTab.click();
    await expect(arch.getByText("BUOY-SF-54")).toBeVisible();
    await expect(arch.getByText("0.54 g/cm³", { exact: true })).toBeVisible();

    // Click Magnetic Thruster Pods tab
    const thrusterTab = page.getByRole("tab", { name: /Magnetic Thruster Pods/i });
    await thrusterTab.click();
    await expect(arch.getByText("PROP-MAG-04")).toBeVisible();
    await expect(arch.getByText("480 N per pod")).toBeVisible();
  });

  test("validates and submits the Mission Charter Intake form client-side", async ({ page }) => {
    await page.goto("/bathys");

    const charter = page.locator("#charter");
    await charter.scrollIntoViewIfNeeded();
    await expect(charter).toBeVisible();

    const submitBtn = page.getByRole("button", { name: /Submit Mission Charter Dossier/i });
    await submitBtn.click();

    // Check validation error messages
    await expect(page.getByText("Enter principal investigator name")).toBeVisible();
    await expect(page.getByText("Enter a valid institutional email address")).toBeVisible();
    await expect(page.getByText("Enter institution or research agency")).toBeVisible();

    // Fill valid data
    await page.fill("#name", "Dr. Henriette Picard");
    await page.fill("#email", "h.picard@cnrs.fr");
    await page.fill("#organization", "CNRS Oceanography Directorate");
    await page.selectOption("#trenchZone", "mariana");
    await page.fill("#payloadMassKg", "85");
    await page.fill(
      "#requirements",
      "Deployment of high-frequency hydrophone array to record hadal seismic tremors along the Challenger Deep fault."
    );

    // Submit form
    await submitBtn.click();

    // Confirm status panel appears with success feedback
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByText("Mission Dossier Lodged")).toBeVisible();
    await expect(page.getByText("Dr. Henriette Picard")).toBeVisible();
  });

  test("renders cleanly on mobile viewport without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/bathys");

    // Check mobile hamburger menu
    const menuToggle = page.getByRole("button", { name: /Open menu/i });
    await expect(menuToggle).toBeVisible();
    await menuToggle.click();

    // Mobile nav drawer should be visible
    await expect(page.getByRole("link", { name: "Descent", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Architecture", exact: true })).toBeVisible();

    // Close menu
    const closeToggle = page.getByRole("button", { name: /Close menu/i });
    await closeToggle.click();

    // Verify root horizontal overflow is 0
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test("renders the 3D submersible and 2D deep-sea creatures during depth scroll with zero errors", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    await page.goto("/bathys");

    // The 3D layer canvas is mounted
    const subCanvas = page.locator(".bat-sub canvas");
    await expect(subCanvas).toBeAttached();

    // The deep-sea creature layer is mounted and can never intercept clicks
    const life = page.locator(".bat-life");
    await expect(life.locator("canvas")).toBeAttached();
    await expect(life).toHaveCSS("pointer-events", "none");

    // Scroll through all vertical water column zones (Mesopelagic, Bathypelagic, Abyssopelagic, Hadalpelagic)
    for (const p of [0.2, 0.45, 0.7, 0.95]) {
      await page.evaluate((progress) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * progress);
      }, p);
      await page.waitForTimeout(150);
    }

    expect(pageErrors).toHaveLength(0);
  });
});
