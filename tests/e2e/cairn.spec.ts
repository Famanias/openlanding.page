import { test, expect, type Page } from "@playwright/test";

async function scrollToChapters(page: Page, where: "top" | "bottom") {
  await page.evaluate((w) => {
    const chapters = document.querySelector<HTMLElement>("[data-chapters]")!;
    const top = chapters.getBoundingClientRect().top + window.scrollY;
    const y = w === "top" ? top - window.innerHeight : top + chapters.offsetHeight;
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }, where);
  await page.waitForTimeout(400);
}

test.describe("Cairn ascent", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("the meter reads base camp at the start and the summit at the end", async ({ page }) => {
    await page.goto("/cairn");
    await scrollToChapters(page, "top");
    await expect(page.getByTestId("altitude-readout")).toHaveText("5,000 M");
    await scrollToChapters(page, "bottom");
    await expect(page.getByTestId("altitude-readout")).toHaveText("8,611 M");
    await expect(page.getByTestId("active-camp")).toHaveText("Summit");
  });
});
