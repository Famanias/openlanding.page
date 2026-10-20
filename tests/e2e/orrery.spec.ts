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

test.describe("Orrery orbit diagram", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("builds to its final step on the orrery slide", async ({ page }) => {
    await page.goto("/orrery#orrery");
    await expect(page.locator('[data-orbit-step="4"]')).toBeAttached({ timeout: 3_000 });
  });
});

test.describe("Orrery orbit diagram (reduced motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("renders fully built immediately", async ({ page }) => {
    await page.goto("/orrery#orrery");
    await expect(page.locator('[data-orbit-step="4"]')).toBeAttached({ timeout: 500 });
  });
});

test.describe("Orrery demo form", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("a valid submission shows the success state without a network request", async ({ page }) => {
    await page.goto("/orrery#cta");
    const requests: string[] = [];
    await page.getByLabel("Name").fill("Ada Lovelace");
    await page.getByLabel("Work email").fill("ada@studio.co");
    await page.getByLabel("Company").fill("Analytical Studio");
    page.on("request", (r) => {
      if (!/\.(woff2?|png|webp|avif|svg|css|js)(\?|$)/.test(r.url())) requests.push(r.url());
    });
    await page.locator("form").getByRole("button", { name: "Book a demo" }).click();
    await expect(page.getByText("Thanks — we'll be in touch within one working day.")).toBeVisible();
    expect(requests).toEqual([]);
  });

  test("invalid fields show inline errors", async ({ page }) => {
    await page.goto("/orrery#cta");
    await page.locator("form").getByRole("button", { name: "Book a demo" }).click();
    await expect(page.getByText("Enter a work email")).toBeVisible();
  });

  test("keys typed inside a form field don't change slides", async ({ page }) => {
    await page.goto("/orrery#cta");
    const counter = page.getByTestId("slide-counter");
    await expect(counter).toHaveText("10 / 10");
    await page.getByLabel("Work email").focus();
    for (const key of ["ArrowUp", "Space", "PageUp", "ArrowLeft"]) {
      await page.keyboard.press(key);
      await page.waitForTimeout(150);
    }
    await expect(counter).toHaveText("10 / 10");
  });
});

test.describe("Orrery deep links are reliable", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("a hash lands on its slide on every load, not just most", async ({ page }) => {
    for (let i = 0; i < 15; i++) {
      await page.goto(`/orrery?run=${i}#cta`);
      await expect(page.getByTestId("slide-counter"), `load ${i}`).toHaveText("10 / 10", { timeout: 3_000 });
    }
  });
});
