import { expect, test } from "@playwright/test";

test.describe("VOLUME ZERO acoustic architecture showcase", () => {
  test("loads the field with the chamber story and navigation", async ({ page }) => {
    await page.goto("/volume-zero");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Rooms that let\s*sound arrive whole\./);
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeAttached();
    await expect(page.getByText("Tune the silence between sounds.").first()).toBeVisible();
  });

  test("surface tabs and listener range update the live telemetry", async ({ page }) => {
    await page.goto("/volume-zero#chamber");
    const chamber = page.locator("#chamber");
    await expect(chamber).toBeVisible();
    await chamber.getByRole("tab", { name: /Honed stone/ }).click();
    await expect(chamber.locator(".vz-chamber__readout")).toContainText("Honed stone");
    await chamber.getByLabel("Listener position").fill("0.9");
    await expect(chamber.locator("output")).toHaveText("90%");
  });

  test("commission form validates and transitions to a local success state", async ({ page }) => {
    await page.goto("/volume-zero#commission");
    const form = page.locator(".vz-form");
    await form.getByRole("button", { name: "Send the brief" }).click();
    await expect(form.getByText("Name is required.")).toBeVisible();
    await expect(form.getByText("Email is required.")).toBeVisible();
    await form.locator("#vz-name").fill("Mara Fielding");
    await form.locator("#vz-email").fill("mara@example.com");
    await form.getByRole("button", { name: "Send the brief" }).click();
    await expect(page.locator("[data-vz-success]")).toContainText("Field reserved.");
  });

  test("mobile navigation opens and the page has no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/volume-zero");
    const menu = page.getByRole("button", { name: "Toggle navigation" });
    await menu.click();
    const mobileNav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(mobileNav.getByRole("link", { name: "Chamber", exact: true })).toBeVisible();
    await mobileNav.getByRole("link", { name: "Chamber", exact: true }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("keeps the SVG fallback and all reveal content visible", async ({ page }) => {
      await page.goto("/volume-zero");
      await expect(page.locator(".vz-chamber__fallback")).toBeVisible();
      await expect(page.locator(".vz-chamber__canvas")).not.toHaveAttribute("data-backend");
      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((element) => getComputedStyle(element).opacity !== "1").length);
      expect(hidden).toBe(0);
    });
  });
});
