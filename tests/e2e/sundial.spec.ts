import { test, expect } from "@playwright/test";

test.describe("sundial — roast-curve landing page", () => {
  test("loads with one h1 and the hero copy", async ({ page }) => {
    await page.goto("/sundial");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Every batch has a curve/);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  });

  test("hash navigation reaches every chapter", async ({ page }) => {
    await page.goto("/sundial");
    for (const hash of ["roast", "lots", "brew", "subscribe", "wholesale"]) {
      await page.locator(`#${hash}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${hash}`)).toBeVisible();
    }
  });

  test("scrubber drives the readouts and responds to End", async ({ page }) => {
    await page.goto("/sundial#roast");
    const scrubber = page.getByLabel(/scrub the roast/i);
    await scrubber.waitFor({ state: "visible" });
    // Let the smooth hash-scroll settle before driving the clock, otherwise the
    // pinned-section scroll handler overwrites keyboard input.
    await page.waitForTimeout(1200);

    // Drag to the end via keyboard: End key jumps to the drop.
    await scrubber.focus();
    await page.keyboard.press("End");
    await expect(scrubber).toHaveValue("690");
    // Development reads ~24.3% at the drop (24.35% exactly, one decimal shown).
    await expect(page.locator(".sd-readouts")).toContainText("24.");

    // Home returns to charge.
    await page.keyboard.press("Home");
    await expect(scrubber).toHaveValue("0");
  });

  test("stage changes are announced politely", async ({ page }) => {
    await page.goto("/sundial#roast");
    const scrubber = page.getByLabel(/scrub the roast/i);
    await scrubber.waitFor({ state: "visible" });
    await page.waitForTimeout(1200); // let the hash-scroll settle first
    await scrubber.focus();
    await page.keyboard.press("End");
    await expect(page.getByText(/Stage 6 of 6: Drop/)).toBeAttached();
  });

  test("brew bench switches recipes", async ({ page }) => {
    await page.goto("/sundial#brew");
    await page.getByRole("tab", { name: "Aeropress" }).click();
    await expect(page.getByRole("tabpanel")).toContainText("Forgiving, syrupy");
    await page.getByRole("tab", { name: "Espresso" }).click();
    await expect(page.getByRole("tabpanel")).toContainText("1:2.1");
  });

  test("wholesale form validates then succeeds without a network request", async ({ page }) => {
    let requested = false;
    page.on("request", (req) => {
      if (!req.url().startsWith("http://localhost")) requested = true;
    });

    await page.goto("/sundial#wholesale");
    await page.getByRole("button", { name: "Send wholesale enquiry" }).click();
    await expect(page.getByText("Tell us who we're talking to.")).toBeVisible();

    await page.getByLabel(/Your name/i).fill("Dana Okafor");
    await page.getByLabel(/Business/i).fill("Third Place Café");
    await page.getByLabel(/Email/i).fill("dana@thirdplace.cafe");
    await page.getByRole("button", { name: "Send wholesale enquiry" }).click();

    await expect(page.getByRole("status")).toContainText("wholesale enquiry for Third Place Café");
    expect(requested).toBe(false);
  });

  test("subscribe and lots render typed content", async ({ page }) => {
    await page.goto("/sundial#lots");
    await expect(page.getByRole("heading", { name: "Kayon Mountain" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gichathaini AA" })).toBeVisible();
    await page.goto("/sundial#subscribe");
    await expect(page.getByText("Most ordered")).toBeVisible();
    // Pricing is per delivery (bags), never a monthly subscription.
    await expect(page.getByText("/ delivery", { exact: true })).toHaveCount(3);
    await expect(page.getByText("/ month")).toHaveCount(0);
    await expect(page.getByText("EVERY 2 WEEKS · 2 × 340 G")).toBeVisible();
  });

  test("on a phone the roast stage renders in flow, not pinned", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/sundial#roast");
    const outer = page.locator("#roast");
    await expect(outer).toHaveAttribute("data-mode", "flow");
    // The static stage log is present and readable.
    await expect(page.getByRole("list", { name: /stage log/i })).toBeVisible();
    // Nav links collapse; the CTA stays.
    await expect(page.getByRole("link", { name: "Order bags" }).first()).toBeVisible();
  });
});
