import { test, expect, type Page } from "@playwright/test";

const HEADING = "Marked for keeps.";

async function hydrated(page: Page) {
  // The sheet controller marks itself live after hydration (only where the live layout applies).
  await expect(page.locator("#sheet")).toHaveAttribute("data-live", "true");
}

async function scrollSheet(page: Page, progress: number) {
  await page.evaluate((p) => {
    const sheet = document.getElementById("sheet")!;
    const top = sheet.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + (sheet.offsetHeight - window.innerHeight) * p);
  }, progress);
}

const mark = (page: Page, n: number) => page.locator(`[data-loop="${n}"]`).evaluate((el) => Number(getComputedStyle(el).getPropertyValue("--mark") || "0"));

test.describe("CHINAGRAPH contact sheet", () => {
  test("sweeps the roll, loops the six selects and counts frames", async ({ page }) => {
    await page.goto("/chinagraph");
    await hydrated(page);
    await expect(page.getByRole("heading", { level: 1, name: HEADING })).toBeVisible();
    await expect(page.locator(".cg-frame")).toHaveCount(12);
    await expect(page.locator(".cg-loop")).toHaveCount(6);
    expect(await mark(page, 2)).toBe(0);

    await scrollSheet(page, 0.36);
    await expect.poll(() => mark(page, 2)).toBe(1);
    await expect.poll(() => mark(page, 12)).toBe(0);
    await expect(page.locator(".cg-frame[data-under]")).toHaveCount(1);
    await expect(page.locator(".cg-sheet__cue [data-frame-counter]")).toHaveText(/Frame 0[5-7] \/ 12/);

    await scrollSheet(page, 0.7);
    await expect.poll(() => mark(page, 12)).toBe(1);
  });

  test("enlarges frame 02 into Look 01 and stacks the looks", async ({ page }) => {
    await page.goto("/chinagraph");
    await hydrated(page);
    await scrollSheet(page, 0.97);
    await expect.poll(() => page.locator("#sheet").evaluate((el) => Number(getComputedStyle(el).getPropertyValue("--cg-enlarge")))).toBeGreaterThan(0.99);

    // One viewport into the looks Look 01 holds; two viewports in, Look 02 has arrived.
    await page.evaluate(() => {
      const stack = document.querySelector(".cg-looks__stack")!;
      window.scrollTo(0, stack.getBoundingClientRect().top + window.scrollY + window.innerHeight * 2.05);
    });
    await expect(page.locator(".cg-looks__stack")).toHaveAttribute("data-active", "1");
    await expect(page.getByRole("heading", { name: "Work Jacket", exact: true })).toBeVisible();
    await expect(page.locator(".cg-header [data-frame-counter]")).toHaveText("Frame 04 / 12");
    const flash = await page.locator('[data-look="1"]').evaluate((el) => Number(getComputedStyle(el).getPropertyValue("--flash")));
    expect(flash).toBe(0);
  });

  test("adds a piece to the bag", async ({ page }) => {
    await page.goto("/chinagraph");
    await hydrated(page);
    await page.locator("#shop").scrollIntoViewIfNeeded();
    const card = page.locator("#product-cg-01");
    const add = card.getByRole("button", { name: /pick a size/i });
    await expect(add).toBeDisabled();
    await expect(card.getByRole("radio", { name: /44/ })).toBeDisabled();
    await card.locator(".cg-product__media").hover();
    await card.getByRole("radio", { name: "48" }).check();
    await card.getByRole("button", { name: /add to bag · £640/i }).click();
    await expect(card.getByRole("button", { name: /in the bag/i })).toBeVisible({ timeout: 2000 });
    await expect(page.locator(".cg-bag__count")).toHaveText("1");
    // The header comes back after an add, even though we scrolled down to the shop.
    await expect(page.locator(".cg-header")).not.toHaveAttribute("data-state", "hidden");
    await expect(page.locator(".cg-bag__count")).toBeInViewport();

    await card.getByRole("button", { name: /on model/i }).click();
    await expect(card).toHaveAttribute("data-on-model", "true");

    await page.locator(".cg-bag__button").click();
    await expect(page.locator("#cg-bag-panel")).toBeVisible();
    await expect(page.locator("#cg-bag-panel")).toContainText("Box Coat, navy melton");
    await expect(page.locator("#cg-bag-panel")).toContainText("£640");
    await page.keyboard.press("Escape");
    await expect(page.locator("#cg-bag-panel")).toBeHidden();
  });

  test("reveals sections on scroll", async ({ page }) => {
    await page.goto("/chinagraph");
    await hydrated(page);
    const head = page.locator("#cloth .cg-cloth__intro");
    await expect(head).toHaveAttribute("data-in", "false");
    await page.locator("#cloth").scrollIntoViewIfNeeded();
    await expect(head).toHaveAttribute("data-in", "true");
  });

  test("validates and completes a printed-sheet request locally", async ({ page }) => {
    await page.goto("/chinagraph");
    await hydrated(page);
    await page.locator("#request").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /post me the sheet/i }).click();
    await expect(page.getByText("Who should we address it to?")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Name" })).toBeFocused();
    await page.getByRole("textbox", { name: "Name" }).fill("Ada Okafor");
    await page.getByRole("textbox", { name: "Email" }).fill("ada@studio-okafor.co.uk");
    await page.getByRole("textbox", { name: "Street address" }).fill("14 Chatham Place");
    await page.getByRole("textbox", { name: "City" }).fill("London");
    await page.getByRole("combobox", { name: "Country" }).selectOption("United Kingdom");
    await page.getByRole("radio", { name: "I stock it" }).check();
    await page.getByRole("button", { name: /post me the sheet/i }).click();
    await expect(page.locator(".cg-submit")).toHaveAttribute("data-state", "sending");
    await expect(page.getByRole("heading", { name: "It's on the drying line." })).toBeVisible({ timeout: 3000 });
    await expect(page.locator(".cg-slip")).toContainText(/No\. \d{4}/);
  });

  test("shows the finished, marked sheet under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/chinagraph");
    await expect(page.locator(".cg-sheet__stage")).toHaveCSS("position", "relative");
    await expect(page.locator(".cg-look").first()).toHaveCSS("position", "relative");
    const dashes = await page.locator(".cg-loop path").evaluateAll((paths) => paths.map((p) => getComputedStyle(p).strokeDashoffset));
    expect(dashes.every((d) => d === "0" || d === "0px")).toBe(true);
    const hidden = await page.locator("[data-reveal]").evaluateAll((nodes) => nodes.filter((node) => Number(getComputedStyle(node).opacity) < 0.5).length);
    expect(hidden).toBe(0);
    await expect(page.getByRole("heading", { name: "Car Coat", exact: true })).toBeVisible();
  });

  test("keeps every look and the form without scripting", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/chinagraph");
    await expect(page.getByRole("heading", { level: 1, name: HEADING })).toBeVisible();
    await expect(page.locator(".cg-look")).toHaveCount(6);
    await page.getByRole("heading", { name: "DB Suit", exact: true }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "DB Suit", exact: true })).toBeVisible();
    await page.locator("#request").scrollIntoViewIfNeeded();
    await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
    await context.close();
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("fits the viewport, toggles the on-model view by tap and opens the menu", async ({ page }) => {
      await page.goto("/chinagraph");
      await hydrated(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
      const board = await page.locator(".cg-board").boundingBox();
      expect(board!.y + board!.height).toBeLessThanOrEqual(844);
      await page.getByRole("button", { name: "Open menu" }).tap();
      await expect(page.locator("#cg-menu")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#cg-menu")).toBeHidden();
      await page.locator("#product-cg-02").scrollIntoViewIfNeeded();
      await page.locator("#product-cg-02").getByRole("button", { name: /on model/i }).tap();
      await expect(page.locator("#product-cg-02")).toHaveAttribute("data-on-model", "true");
    });
  });
});
