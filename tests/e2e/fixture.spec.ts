import { test, expect, type Page } from "@playwright/test";

const HEADING = "Your shop, fitted out properly.";

async function hydrated(page: Page) {
  // The scene controller and the studio chip only touch the DOM after hydration.
  await expect(page.locator(".fx-header__status")).toHaveAttribute("data-open", /true|false/);
}

async function scrollScene(page: Page, progress: number) {
  await page.evaluate((p) => {
    const scene = document.getElementById("fit-out")!;
    const top = scene.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + (scene.offsetHeight - window.innerHeight) * p);
  }, progress);
}

test.describe("FIXTURE fit-out", () => {
  test("starts as an empty shell and fits out stage by stage until the sign flips", async ({ page }) => {
    await page.goto("/fixture");
    await hydrated(page);
    const scene = page.locator("#fit-out");
    await expect(page.getByRole("heading", { level: 1, name: HEADING })).toBeVisible();
    await expect(scene).toHaveAttribute("data-stage", "0");
    await expect(page.locator(".fx-window__url-temp")).toBeVisible();

    await scrollScene(page, 0.3);
    await expect(scene).toHaveAttribute("data-stage", "2");
    await expect(scene).toHaveAttribute("data-reached", "1 2");
    await expect(page.locator(".fx-store-nav__brand")).toHaveCSS("opacity", "1");

    await scrollScene(page, 0.88);
    await expect(scene).toHaveAttribute("data-stage", "5");
    await expect(scene).toHaveAttribute("data-reached", "1 2 3 4 5");
    await expect(page.locator('[data-readout="load"]')).toHaveText("1.2");
    await expect.poll(async () => Number(await page.locator('[data-readout="orders"]').textContent())).toBeGreaterThan(0);
    await expect(page.locator(".fx-sign__face--open")).toBeVisible();
  });

  test("jumps to a stage from the fit-out sheet", async ({ page }) => {
    await page.goto("/fixture");
    await hydrated(page);
    await scrollScene(page, 0.16);
    const scene = page.locator("#fit-out");
    await expect(scene).toHaveAttribute("data-stage", "1");
    await page.locator('a[data-goto="4"]').click();
    await expect(scene).toHaveAttribute("data-stage", "4", { timeout: 4000 });
    await expect(page.locator('[data-row="4"] .fx-sheet__detail p')).toBeVisible();
  });

  test("reveals sections on scroll", async ({ page }) => {
    await page.goto("/fixture");
    await hydrated(page);
    const head = page.locator("#prices .fx-section-head");
    await expect(head).toHaveAttribute("data-in", "false");
    await page.locator("#prices").scrollIntoViewIfNeeded();
    await expect(head).toHaveAttribute("data-in", "true");
  });

  test("adds a price tag to the brief and books a walk-through locally", async ({ page }) => {
    await page.goto("/fixture");
    await hydrated(page);
    await page.locator("#prices").scrollIntoViewIfNeeded();
    const add = page.getByRole("button", { name: /add to brief theme build/i });
    // Hover the tag first: a hovered card must stay put under its own button.
    await page.locator(".fx-tag").nth(1).hover({ position: { x: 40, y: 40 } });
    await add.click();
    await expect(add).toHaveAttribute("aria-pressed", "true");

    await page.locator("#book").scrollIntoViewIfNeeded();
    await expect(page.getByRole("checkbox", { name: /theme/i })).toBeChecked();

    await page.getByRole("button", { name: /book the walk-through/i }).click();
    await expect(page.getByText("Tell us who to ask for.")).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeFocused();

    await page.getByLabel("Your name").fill("Ines Vos");
    await page.getByLabel("Email").fill("ines@fennelandclay.com");
    await page.getByLabel("Store address").fill("fennelandclay.com");
    await page.getByRole("radio", { name: "€6–12k" }).check();
    await page.getByRole("button", { name: /book the walk-through/i }).click();
    await expect(page.locator(".fx-submit")).toHaveAttribute("data-state", "sending");
    await expect(page.getByRole("heading", { name: "You're on the schedule." })).toBeVisible({ timeout: 3000 });
    await expect(page.locator(".fx-slip__head")).toContainText(/FX-\d{4}-[A-Z0-9]{2}/);
    await expect(page.locator(".fx-slip").getByText("fennelandclay.com", { exact: true })).toBeVisible();
    await expect(add).toHaveAttribute("aria-pressed", "true");
  });

  test("switches case studies by keyboard and compares before and after", async ({ page }) => {
    await page.goto("/fixture");
    await hydrated(page);
    await page.locator("#work").scrollIntoViewIfNeeded();
    const first = page.getByRole("tab", { name: /fennel & clay/i });
    await first.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("tab", { name: /ritual roast/i })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("Ritual Roast");
    await page.getByRole("button", { name: "Before", exact: true }).click();
    await expect(page.getByRole("button", { name: "Before", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".fx-metric").first()).toHaveAttribute("data-better", "false");
  });

  test("toggles care plan billing and the FAQ", async ({ page }) => {
    await page.goto("/fixture");
    await hydrated(page);
    await page.locator("#plans").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /annual/i }).click();
    await expect(page.locator(".fx-plan__amount").nth(1)).toHaveText("€350");
    await page.locator("#faq").scrollIntoViewIfNeeded();
    const question = page.getByRole("button", { name: /why flat prices/i });
    await question.click();
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("button", { name: /already have a shopify store/i })).toHaveAttribute("aria-expanded", "false");
  });

  test("shows the finished shop under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fixture");
    await hydrated(page);
    await expect(page.locator(".fx-scene__stage")).toHaveCSS("position", "relative");
    await expect(page.locator(".fx-sign__face--open")).toBeVisible();
    await expect(page.locator('[data-readout="load"]')).toHaveText("1.2");
    await expect(page.locator(".fx-store-nav__brand")).toHaveCSS("opacity", "1");
    const hidden = await page.locator("[data-reveal]").evaluateAll((nodes) => nodes.filter((node) => Number(getComputedStyle(node).opacity) < 0.5).length);
    expect(hidden).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
  });

  test("keeps content and the form available without scripting", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/fixture");
    await expect(page.getByRole("heading", { level: 1, name: HEADING })).toBeVisible();
    await expect(page.locator(".fx-sign__face--open")).toBeVisible();
    await expect(page.locator('[data-row="3"] .fx-sheet__detail p')).toBeVisible();
    await page.locator("#book").scrollIntoViewIfNeeded();
    await expect(page.getByLabel("Email")).toBeVisible();
    await context.close();
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("fits the viewport and opens the menu", async ({ page }) => {
      await page.goto("/fixture");
      await hydrated(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.tap();
      await expect(page.locator("#fx-menu")).toBeVisible();
      await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(page.locator("#fx-menu")).toBeHidden();
      await expect(page.locator("#fit-out")).toHaveAttribute("data-stage", "0");
    });
  });
});
