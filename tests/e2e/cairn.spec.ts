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

test.describe("Cairn reload mid-climb", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("reloading halfway down restores a matching readout and camp", async ({ page }) => {
    await page.goto("/cairn");
    await page.evaluate(() => {
      const chapters = document.querySelector<HTMLElement>("[data-chapters]")!;
      const top = chapters.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + chapters.offsetHeight * 0.5, behavior: "instant" as ScrollBehavior });
    });
    await page.waitForTimeout(300);
    await page.reload();
    await page.waitForTimeout(800);
    const expected = await page.evaluate(() => {
      // The camp whose chapter top has passed the underside of the top bar.
      const line = 68.5;
      const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-camp]"));
      const reached = chapters.filter((c) => c.getBoundingClientRect().top <= line);
      return { name: reached.at(-1)?.dataset.campName ?? "", scrollY: window.scrollY };
    });
    expect(expected.scrollY).toBeGreaterThan(1000);
    await expect(page.getByTestId("active-camp")).toHaveText(new RegExp(`^${expected.name}$`, "i"));
  });
});
