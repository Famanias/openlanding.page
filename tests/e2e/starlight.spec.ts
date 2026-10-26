import { expect, test } from "@playwright/test";

test.describe("starlight", () => {
  test("renders the WebGL landing page and local form states", async ({ page }) => {
    await page.goto("/starlight");
    await expect(page.getByRole("heading", { name: /Build worlds from the pixel out/i })).toBeVisible();
    await expect(page.locator("canvas.stl-canvas--journey")).toHaveAttribute("aria-label", "A realistic WebGL instrument morphing through eclipse, aperture, passage and alignment");
    await page.locator("#stl-email").fill("bad");
    await page.getByRole("button", { name: /Get the starter/i }).click();
    await expect(page.locator("#stl-email-error")).toContainText("Enter a valid email");
    await page.locator("#stl-email").fill("hello@studio.com");
    await page.getByRole("button", { name: /Get the starter/i }).click();
    await expect(page.getByText("Your WebGL starter is ready.")).toBeVisible();
    await page.locator(".stl-chapter-rail a[href='#stl-chapter-2']").click();
    await expect(page.locator(".stl-journey-overlay strong")).toHaveText("Passage");
  });
});
