import { test, expect } from "@playwright/test";

test.describe("Orrery deck (desktop)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("arrow keys advance slides, update the counter and the hash", async ({ page }) => {
    await page.goto("/orrery");
    const counter = page.getByTestId("slide-counter");
    await expect(counter).toHaveText("01 / 10");
    await page.keyboard.press("ArrowDown");
    await expect(counter).toHaveText("02 / 10");
    await page.waitForTimeout(700);
    await page.keyboard.press("ArrowDown");
    await expect(counter).toHaveText("03 / 10");
    await expect(page).toHaveURL(/#orrery$/);
  });

  test("a slide hash deep-links to that slide", async ({ page }) => {
    await page.goto("/orrery#security");
    await expect(page.getByTestId("slide-counter")).toHaveText("09 / 10");
  });

  test("the chapter rail jumps to a chapter", async ({ page }) => {
    await page.goto("/orrery");
    await page.getByRole("navigation", { name: "Chapters" }).getByRole("button", { name: /Pricing/ }).click();
    await expect(page.getByTestId("slide-counter")).toHaveText("08 / 10");
  });
});
