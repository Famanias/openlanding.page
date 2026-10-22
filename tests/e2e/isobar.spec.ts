import { test, expect } from "@playwright/test";

test.describe("ISOBAR — pressure membrane", () => {
  test("loads the field and follows the transect", async ({ page }) => {
    const shaderErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && /THREE\.WebGLProgram|Shader Error/.test(message.text())) shaderErrors.push(message.text());
    });
    await page.goto("/isobar");
    await page.waitForTimeout(500);
    expect(shaderErrors, "the procedural field must compile without shader errors").toEqual([]);
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Shape the atmosphere.");
    await expect(page.locator("#transects")).toBeAttached();
    await page.locator("#transects").scrollIntoViewIfNeeded();
    await expect(page.getByText("Cross-section")).toBeVisible();
    await expect(page.locator(".iso-chamber[data-active='true']")).toBeVisible();
  });

  test("reseeds the field and validates the commission form", async ({ page }) => {
    await page.goto("/isobar");
    const initial = await page.locator(".iso-readout__meta").textContent();
    await page.getByRole("button", { name: /Reseed membrane/ }).click();
    await expect(page.locator(".iso-readout__meta")).not.toHaveText(initial ?? "");
    await page.locator("#invitation").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Send a signal" }).click();
    await expect(page.getByText("Add your name.")).toBeVisible();
    await page.getByLabel("Name").fill("Mara Ito");
    await page.getByLabel("Work email").fill("mara@example.com");
    await page.getByLabel("What is moving?").fill("A living lobby field");
    await page.getByLabel("First signal").fill("Make weather visible");
    await page.getByRole("button", { name: "Send a signal" }).click();
    await expect(page.getByText("Your field is on the map.")).toBeVisible();
  });

  test("makes transects and weather-map controls interactive", async ({ page }) => {
    await page.goto("/isobar");
    await page.locator("#transects").scrollIntoViewIfNeeded();
    const chambers = page.locator(".iso-chamber");
    await expect(chambers).toHaveCount(4);
    await chambers.nth(2).click();
    await expect(chambers.nth(2)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".iso-chamber[data-active='true'] .iso-chamber__name")).toHaveText("Cross-section");

    const density = page.getByLabel("Density");
    await density.fill("91");
    await expect(page.locator("output[for='iso-density']")).toHaveText("91%");
    await expect(page.getByText(/frequency/)).toBeVisible();
  });

  test("keeps content visible with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/isobar");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".iso-field canvas")).toHaveCount(0);
  });
});
