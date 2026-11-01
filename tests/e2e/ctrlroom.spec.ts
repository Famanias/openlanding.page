import { test, expect } from "@playwright/test";

test.describe("CTRL/ROOM template (/ctrlroom)", () => {
  test("renders hero, brand header, desktop OS, and hardware view", async ({ page }) => {
    await page.goto("/ctrlroom");

    // Title & Header Wordmark
    await expect(page).toHaveTitle(/CTRL\/ROOM/i);
    await expect(page.getByRole("link", { name: "CTRL/ROOM", exact: true })).toBeVisible();

    // Hero Heading
    await expect(page.getByRole("heading", { level: 1 })).toContainText("WELCOME TO YOUR CONTROL ROOM.");

    // Anchor Sections
    await expect(page.locator("#desktop-stage")).toBeAttached();
    await expect(page.locator("#section-deck-lab")).toBeAttached();
    await expect(page.locator("#section-action-library")).toBeAttached();
    await expect(page.locator("#section-profiles")).toBeAttached();
    await expect(page.locator("#section-device-info")).toBeAttached();
  });

  test("desktop stage has open default windows and interacts with deck keys", async ({ page }) => {
    await page.goto("/ctrlroom?autostart=1");

    const desktopStage = page.locator("#desktop-stage");
    await expect(desktopStage).toBeVisible();

    // Verify Deck Lab is open in the desktop stage
    await expect(page.getByText("DECK LAB // 15-KEY MATRIX (5×3)")).toBeVisible();

    // Click on Slot 01 in the Deck Lab
    const slot1Btn = page.getByRole("button", { name: /Slot 01|START REC/i }).first();
    await expect(slot1Btn).toBeVisible();
    await slot1Btn.click();

    // Verify simulated status updates
    await expect(page.locator("body")).toContainText("SIMULATED");
  });
});
