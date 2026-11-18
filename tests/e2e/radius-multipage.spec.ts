import { expect, test } from "@playwright/test";

test.describe("RADIUS multi-page expansion", () => {
  test("navigates across all 6 top-level routes and dynamic CMS field notes", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));

    // 1. Bike engineering page & finish switcher
    await page.goto("/templates/radius/bike");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Every street/);
    await page.getByRole("group", { name: "Select frame finish" }).getByRole("button", { name: "Tangerine" }).click();
    await expect(page.getByText("RD-02 · SIGNAL COAT")).toBeVisible();

    // 2. Accessories preset switcher
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Accessories" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Built for the load/);
    await page.getByRole("group", { name: "Select modular setup preset" }).getByRole("button", { name: "Market Carry" }).click();
    await expect(page.getByText("KIT / 02").first()).toBeVisible();

    // 3. Field Notes CMS index + filtering + detail article
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Field notes" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Notes from/);
    await page.getByRole("group", { name: "Filter field notes by category" }).getByRole("button", { name: "Routes" }).click();
    await expect(page.getByText("SHOWING 2 OF 6 DISPATCHES")).toBeVisible();
    await page.getByRole("link", { name: /Read note/ }).first().click();
    await expect(page).toHaveURL(/\/templates\/radius\/journal\//);
    await expect(page.getByText("FIELD TAKEAWAYS")).toBeVisible();

    // 4. Fit & Service interactive checklist
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Fit & service" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Set it up/);
    await page.getByRole("button", { name: /Tire pressure/ }).click();
    await page.getByRole("button", { name: /Lever feel/ }).click();
    await expect(page.getByText("2 / 6 VERIFIED")).toBeVisible();

    // 5. Reserve preview page
    await page.goto("/templates/radius/reserve");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Ready when/);
    await page.getByLabel("Your name").fill("Sam Commuter");
    await page.getByLabel("Email address").fill("sam@example.com");
    await page.getByRole("button", { name: "Preview interest" }).click();
    await expect(page.getByRole("status")).toContainText("Nothing was sent or saved");

    expect(errors).toEqual([]);
  });

  for (const [width, height] of [[768, 1024], [390, 844]]) {
    test(`subpages fit phone and tablet viewports cleanly at ${width}x${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      for (const route of [
        "/templates/radius/bike",
        "/templates/radius/accessories",
        "/templates/radius/journal",
        "/templates/radius/journal/crossing-the-cut-line",
        "/templates/radius/fit-service",
        "/templates/radius/reserve",
      ]) {
        await page.goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `overflow on ${route}`).toBeLessThanOrEqual(0);
      }
    });
  }
});
