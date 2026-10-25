import { expect, test } from "@playwright/test";

test.describe("NULO optical lab", () => {
  test("focus dial responds to keyboard and mode controls", async ({ page }) => {
    await page.goto("/nulo");
    await expect(page.getByRole("heading", { name: "Tune your view." })).toBeVisible();
    const dial = page.getByRole("slider", { name: "Calibration focus dial" });
    await dial.focus();
    await page.keyboard.press("ArrowRight");
    await expect(dial).toHaveAttribute("aria-valuenow", "0");
    await page.getByRole("button", { name: "Street", exact: true }).click();
    await expect(dial).toHaveAttribute("aria-valuetext", "street calibration");
    await expect(page.locator(".nu-dial__readout strong")).toHaveText("street");
  });

  test("fitting request validates locally and shows a reference", async ({ page }) => {
    await page.goto("/nulo#fitting");
    await page.getByRole("button", { name: /Send the request/ }).click();
    await expect(page.getByRole("alert")).toHaveCount(3);
    await page.getByLabel("Your name").fill("Mina Park");
    await page.getByLabel("Email").fill("mina@example.com");
    await page.getByLabel("Fold 02").check({ force: true });
    await page.getByLabel("What should we tune? (optional)").fill("Moving between studio and train.");
    await page.getByRole("button", { name: /Send the request/ }).click();
    await expect(page.getByRole("status")).toContainText("We’ve got the signal", { timeout: 4000 });
    await expect(page.getByText(/^reference \/ NU-[A-Z0-9]{4}$/)).toBeVisible();
  });

  test("stays within a touch viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/nulo");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  });

  test("keeps the content readable without JavaScript", async ({ browser }, testInfo) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: testInfo.project.use.baseURL });
    try {
      const page = await context.newPage();
      await page.goto("/nulo");
      await expect(page.getByRole("heading", { name: "Tune your view." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "A fitting is a small ritual." })).toBeVisible();
      await expect(page.getByLabel("Your name")).toBeVisible();
    } finally {
      await context.close();
    }
  });
});
