import { test, expect, type Page } from "@playwright/test";

/** Scroll The Line's track to a 0–1 progress and let the rAF loop catch up. */
async function travel(page: Page, p: number) {
  await page.evaluate((progress) => {
    const track = document.querySelector<HTMLElement>(".au-line__track")!;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + progress * (track.offsetHeight - window.innerHeight) + 1);
  }, p);
  await page.waitForTimeout(300);
}

test.describe("aubade — overnight sleeper landing page", () => {
  test("loads with one h1, the slogan and the primary nav", async ({ page }) => {
    await page.goto("/aubade");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Leave at dusk\.\s*Wake somewhere else\./);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeAttached();
    await expect(page.locator("html")).toHaveAttribute("data-au-motion", "live");
  });

  test("the window: scroll becomes travel, legs change, the clock runs, the Simplon goes dark", async ({ page }) => {
    await page.goto("/aubade");
    const stage = page.locator(".au-stage");
    await expect(stage).toHaveAttribute("data-running", "true");

    await travel(page, 0.1);
    await expect(stage).toHaveAttribute("data-leg", "dusk");
    // Halfway from Paris 19:12 to Dijon 20:51.
    await expect(page.locator(".au-stage__clock")).toHaveText(/^20:0[0-3]$/);
    const shiftA = await stage.evaluate((el) => el.style.getPropertyValue("--au-s1"));

    await travel(page, 0.3);
    await expect(stage).toHaveAttribute("data-leg", "forest");
    const shiftB = await stage.evaluate((el) => el.style.getPropertyValue("--au-s1"));
    expect(shiftA).not.toEqual(shiftB);

    await travel(page, 0.49);
    await expect(stage).toHaveAttribute("data-leg", "tunnel");
    await expect(page.locator(".au-stage__plaque")).toContainText("The Simplon");
    expect(Number(await stage.evaluate((el) => el.style.getPropertyValue("--au-enter")))).toBe(1);

    await travel(page, 1);
    await expect(stage).toHaveAttribute("data-leg", "dawn");
    await expect(page.locator(".au-stage__clock")).toHaveText("09:48");
    await expect(page.locator(".au-stage__km")).toHaveText("1,128 km");
  });

  test("the travel slider and arrow keys drive the same line", async ({ page }) => {
    await page.goto("/aubade");
    await travel(page, 0.02);
    const range = page.getByLabel("Travel the line");
    await range.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".au-stage")).toHaveAttribute("data-leg", "forest", { timeout: 4000 });
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".au-stage")).toHaveAttribute("data-leg", "tunnel", { timeout: 4000 });
    await page.getByRole("button", { name: "Previous leg" }).click();
    await expect(page.locator(".au-stage")).toHaveAttribute("data-leg", "forest", { timeout: 4000 });
  });

  test("reveals flip to data-in on scroll", async ({ page }) => {
    await page.goto("/aubade");
    const title = page.locator("#berths-title");
    await expect(title).not.toHaveAttribute("data-in", "true");
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveAttribute("data-in", "true");
    const card = page.locator(".au-berths__item").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute("data-in", "true");
  });

  test("berth cards lift on hover and pre-select the form", async ({ page }) => {
    await page.goto("/aubade");
    const card = page.locator(".au-berth").nth(2);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const before = await card.evaluate((el) => getComputedStyle(el).transform);
    await card.hover();
    await page.waitForTimeout(700);
    const after = await card.evaluate((el) => getComputedStyle(el).transform);
    expect(after).not.toEqual(before);

    await page.locator('[data-berth="couchette"]').click();
    await expect(page.locator('input[name="berth"][value="couchette"]')).toBeChecked();
    await expect(page.locator('input[name="guests"][value="2"]')).toBeDisabled();
    await expect(page.locator('input[name="guests"][value="1"]')).toBeChecked();
  });

  test("departures switch month and hand a date to the form", async ({ page }) => {
    await page.goto("/aubade#departures");
    await page.getByRole("tab", { name: /December 2026/ }).click();
    await expect(page.getByRole("tabpanel")).toContainText("Réveillon dinner on board");
    await expect(page.getByRole("tab", { name: /December 2026/ })).toHaveAttribute("aria-selected", "true");
    await page.getByRole("tab", { name: /December 2026/ }).press("ArrowRight");
    await expect(page.getByRole("tab", { name: /January 2027/ })).toHaveAttribute("aria-selected", "true");

    const reserve = page.locator("[data-departure]").first();
    const id = await reserve.getAttribute("data-departure");
    await reserve.click();
    await expect(page.locator('select[name="departure"]')).toHaveValue(id!);
  });

  test("the form validates, loads, then issues a stamped ticket with no network request", async ({ page }) => {
    let external = false;
    page.on("request", (req) => {
      if (!req.url().startsWith("http://localhost")) external = true;
    });
    await page.goto("/aubade#reserve");
    const submit = page.locator(".au-btn--submit");
    await submit.click();
    await expect(page.locator(".au-error")).toHaveCount(2);
    await expect(page.locator('input[name="name"]')).toBeFocused();
    await expect(page.locator('input[name="name"]')).toHaveAttribute("aria-invalid", "true");

    await page.fill('input[name="name"]', "Inès Marchetti");
    await page.fill('input[name="email"]', "ines@example.com");
    await expect(page.locator(".au-error")).toHaveCount(0);
    await submit.click();
    await expect(submit).toHaveAttribute("data-loading", "true");
    await expect(page.locator(".au-ticket")).toHaveAttribute("data-state", "issued", { timeout: 4000 });
    await expect(page.getByRole("status")).toContainText("Your berth is held");
    await expect(page.getByRole("status")).toContainText("ines@example.com");
    expect(external).toBe(false);

    await page.getByRole("button", { name: "Reserve another berth" }).click();
    await expect(page.locator(".au-ticket")).toHaveAttribute("data-state", "preview");
  });

  test("hash links land on their sections", async ({ page }) => {
    await page.goto("/aubade");
    for (const id of ["berths", "dining", "night", "departures", "reserve"]) {
      await page.goto(`/aubade#${id}`);
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 });
    }
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("the menu opens, traps Escape and closes on a link", async ({ page }) => {
      await page.goto("/aubade");
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      const menu = page.locator("#au-menu");
      await expect(menu).toHaveAttribute("data-open", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("data-open", "false");
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

      await page.getByRole("button", { name: "Open menu" }).click();
      await menu.getByRole("link", { name: /Departures/ }).click();
      await expect(menu).toHaveAttribute("data-open", "false");
    });

    test("the window still pins and the page never scrolls sideways", async ({ page }) => {
      await page.goto("/aubade");
      await expect(page.locator(".au-stage")).toHaveAttribute("data-running", "true");
      await travel(page, 0.7);
      await expect(page.locator(".au-stage")).toHaveAttribute("data-leg", "lake");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("the window never mounts its loop; five finished legs and every reveal are visible", async ({ page }) => {
      await page.goto("/aubade");
      await expect(page.locator("html")).toHaveAttribute("data-au-motion", "static");
      await expect(page.locator(".au-stage")).not.toHaveAttribute("data-running", "true");
      await expect(page.locator(".au-line__track")).toBeHidden();
      await expect(page.locator(".au-line__leg")).toHaveCount(5);
      await expect(page.locator(".au-line__leg").nth(2)).toContainText("The Simplon");
      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden).toBe(0);
    });
  });
});
