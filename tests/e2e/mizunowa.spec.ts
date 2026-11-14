import { expect, test } from "@playwright/test";

test.describe("MIZUNOWA", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully", async ({ page }) => {
    await page.goto("/templates/mizunowa");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/templates/mizunowa");
    await expect(page.locator("body")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

    // The seam rings and the season scene are wider than a phone; they must stay clipped once reached.
    await page.locator("#seasons").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/templates/mizunowa");
    await expect(page.locator("body")).toBeVisible();

    for (const id of ["koi", "walk", "seasons", "questions", "plan"]) {
      const heading = page.locator(`#${id} h2`).first();
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
    // The walk is fully drawn rather than waiting on scroll.
    await expect(page.locator("#walk")).not.toHaveAttribute("data-live", "true");
  });

  test("picking a koi opens its field note, one at a time", async ({ page }) => {
    await page.goto("/templates/mizunowa");
    const notes = page.locator(".mnw-koi-note");
    await notes.first().scrollIntoViewIfNeeded();
    await expect(notes).toHaveCount(4);

    await notes.nth(1).click();
    await expect(notes.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("A figure of eight, crossing its own wake.")).toBeVisible();

    await notes.nth(2).click();
    await expect(notes.nth(1)).toHaveAttribute("aria-pressed", "false");
    await expect(notes.nth(2)).toHaveAttribute("aria-pressed", "true");

    await notes.nth(2).click();
    await expect(notes.nth(2)).toHaveAttribute("aria-pressed", "false");
  });

  test("feeding the koi from the keyboard is announced", async ({ page }) => {
    await page.goto("/templates/mizunowa");
    const feed = page.getByRole("button", { name: "Feed the koi" });
    await feed.scrollIntoViewIfNeeded();
    await feed.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#koi [aria-live]").last()).toContainText("Koi food dropped");
  });

  test("scrolling the walk moves through the three stops", async ({ page }) => {
    await page.goto("/templates/mizunowa");
    const stops = page.locator(".mnw-walk-stop");
    await stops.first().scrollIntoViewIfNeeded();
    await expect(page.locator("#walk")).toHaveAttribute("data-live", "true");

    await stops.nth(2).evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(stops.nth(2)).toHaveClass(/is-active/);
    await expect(page.locator(".mnw-walk-marker").nth(2)).toHaveClass(/is-reached/);

    // A map marker steps back to its stop.
    await page.getByRole("button", { name: "Go to stop 01, Pond edge" }).click();
    await expect(stops.first()).toHaveClass(/is-active/);
  });

  test("the season picker changes the note by click and by arrow key", async ({ page }) => {
    await page.goto("/templates/mizunowa");
    const picker = page.getByRole("radiogroup", { name: "Choose a season" });
    await picker.scrollIntoViewIfNeeded();
    const name = page.locator(".mnw-season-name");
    await expect(name).toHaveText("Spring");

    await page.getByRole("radio", { name: "Autumn" }).click();
    await expect(name).toHaveText("Autumn");
    await expect(page.getByRole("radio", { name: "Autumn" })).toHaveAttribute("aria-checked", "true");
    await expect(page.locator(".mnw-season-band")).toHaveAttribute("data-season", "autumn");

    await page.keyboard.press("ArrowRight");
    await expect(name).toHaveText("Winter");
    await expect(page.getByRole("radio", { name: "Winter" })).toBeFocused();
  });

  test("questions open one at a time", async ({ page }) => {
    await page.goto("/templates/mizunowa");
    const items = page.locator(".mnw-faq-item");
    await items.first().scrollIntoViewIfNeeded();

    await items.nth(1).locator("summary").click();
    await expect(items.nth(1)).toHaveAttribute("open", "");
    await items.nth(4).locator("summary").click();
    await expect(items.nth(4)).toHaveAttribute("open", "");
    await expect(items.nth(1)).not.toHaveAttribute("open", "");
  });
});
