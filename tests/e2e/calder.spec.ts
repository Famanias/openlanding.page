import { test, expect, type Page } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

/** Document offset of the pinned brief and the length of its runway. */
async function runway(page: Page) {
  return page.locator("#argument").evaluate((el) => ({ top: el.getBoundingClientRect().top + window.scrollY, run: (el as HTMLElement).offsetHeight - window.innerHeight }));
}

async function clauseProgress(page: Page): Promise<number[]> {
  return page.$$eval(".cr-clause", (els) => els.map((e) => Number((e as HTMLElement).style.getPropertyValue("--p") || "1")));
}

async function scrollTo(page: Page, y: number) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(250);
}

test.describe("calder — law-firm landing page: the brief that drafts itself", () => {
  test("loads with one h1, the primary nav and live motion", async ({ page }) => {
    await page.goto("/calder");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Hard decisions,\s*argued well\./);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeAttached();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("data-cr-motion", "live");
    await expect(page.locator(".cr-hero__strip")).toContainText("212 555 0187");
  });

  test("the hero rises line by line through its masks on load", async ({ page }) => {
    await page.goto("/calder");
    const lines = page.locator(".cr-h1 .cr-line__in");
    await expect(lines).toHaveCount(2);
    const names = await lines.evaluateAll((els) => els.map((e) => getComputedStyle(e).animationName));
    expect(names).toEqual(["cr-mask", "cr-mask"]);
    const seal = await page.locator(".cr-hero__seal .cr-seal__ring").evaluate((el) => getComputedStyle(el).animationName);
    expect(seal).toBe("cr-turn");
  });

  test("reveals flip to data-in on scroll, and cards react to the pointer", async ({ page }) => {
    await page.goto("/calder");
    const title = page.locator("#cr-matters-h");
    await expect(title).not.toHaveAttribute("data-in", "true");
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveAttribute("data-in", "true");

    const grid = page.locator(".cr-counts");
    await grid.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2800); // staggered cascade finishes and its delay is dropped
    const second = page.locator(".cr-count").nth(1);
    const first = page.locator(".cr-count").nth(0);
    await second.hover({ position: { x: 80, y: 80 } });
    // The hovered card lifts; its neighbours dim.
    await expect.poll(() => second.evaluate((el) => getComputedStyle(el).transform)).not.toBe("none");
    await expect.poll(() => first.evaluate((el) => Number(getComputedStyle(el).opacity))).toBeLessThan(0.8);
  });

  test("the brief is pinned and writes itself clause by clause, then the seal presses", async ({ page }) => {
    await page.goto("/calder");
    const section = page.locator("#argument");
    await expect(section).toHaveAttribute("data-pin", "1");
    const { top, run } = await runway(page);
    expect(run).toBeGreaterThan(2000); // a long runway to scrub through
    const step = (i: number) => page.locator(`.cr-step[data-i="${i}"]`);

    await scrollTo(page, top + run * 0.06);
    let p = await clauseProgress(page);
    expect(p[0]).toBeGreaterThan(0);
    expect(p[0]).toBeLessThan(1);
    expect(p[3]).toBe(0);
    await expect(step(0)).toHaveAttribute("data-state", "active");
    await expect(page.locator("[data-page]")).toHaveText("p. 1 of 4");
    await expect(section).toHaveAttribute("data-sealed", "false");

    await scrollTo(page, top + run * 0.6);
    p = await clauseProgress(page);
    expect(p[0]).toBe(1);
    expect(p[1]).toBe(1);
    expect(p[3]).toBe(0);
    await expect(step(2)).toHaveAttribute("data-state", "active");
    await expect(step(1)).toHaveAttribute("data-state", "past");
    await expect(step(3)).toHaveAttribute("data-state", "next");
    await expect(page.locator("[data-page]")).toHaveText("p. 3 of 4");

    // Words are ghosts until written: the first clause's early words are solid, its late words are not.
    await scrollTo(page, top + run * 0.06);
    const words = await page.$$eval(".cr-clause[data-i='0'] .cr-w", (els) => els.map((e) => Number(getComputedStyle(e).opacity)));
    expect(words[0]).toBeGreaterThan(0.9);
    expect(words[words.length - 1]).toBeLessThan(0.3);

    await scrollTo(page, top + run);
    await expect(section).toHaveAttribute("data-sealed", "true");
    await expect(page.locator("[data-page]")).toHaveText("p. 4 of 4");
    expect(await clauseProgress(page)).toEqual([1, 1, 1, 1]);
    const seal = page.locator(".cr-brief__seal");
    await expect(seal).toHaveCSS("opacity", "1");

    // Scrolling back un-presses it (a reversible transition, not a one-shot): the whole thing is scrubbed.
    await scrollTo(page, top + run * 0.3);
    await expect(section).toHaveAttribute("data-sealed", "false");
    await expect(seal).toHaveCSS("opacity", "0");
  });

  test("the header tucks away on the way down and returns on the way up", async ({ page }) => {
    await page.goto("/calder");
    const header = page.locator(".cr-header");
    await expect(header).toHaveAttribute("data-state", "top");
    await scrollTo(page, 200);
    await expect(header).toHaveAttribute("data-state", "compact");
    await scrollTo(page, 1400);
    await expect(header).toHaveAttribute("data-state", "hidden");
    await scrollTo(page, 1200);
    await expect(header).not.toHaveAttribute("data-state", "hidden");
  });

  test("nav links go to their sections and the active underline follows", async ({ page }) => {
    await page.goto("/calder");
    for (const id of ["matters", "argument", "counsel", "questions", "file"]) {
      await page.goto(`/calder#${id}`);
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 });
    }
    await page.goto("/calder#counsel");
    await expect(page.locator('.cr-nav a[data-nav="counsel"]')).toHaveAttribute("aria-current", "location");
    await expect(page.locator(".cr-nav")).toHaveCSS("--ix-o", "1");
  });

  test("the questions open one at a time", async ({ page }) => {
    await page.goto("/calder");
    const buttons = page.locator(".cr-acc__item button");
    await buttons.first().scrollIntoViewIfNeeded();
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("region", { name: /fees structured/i })).toBeVisible();
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "false");
  });

  test("'Ask about this' pre-selects the matter in the filing form", async ({ page }) => {
    await page.goto("/calder");
    await page.locator(".cr-count__ask").nth(1).click();
    await expect(page.locator('select[name="matter"]')).toHaveValue("Commercial disputes");
  });

  test("the form validates, loads, then the seal presses; no network request", async ({ page }) => {
    let external = false;
    page.on("request", (req) => {
      if (!req.url().startsWith("http://localhost")) external = true;
    });
    await page.goto("/calder#file");
    const submit = page.getByRole("button", { name: "File this matter" });
    await submit.click();
    await expect(page.locator(".cr-field__error")).toHaveCount(4);
    await expect(page.locator('input[name="name"]')).toBeFocused();
    await expect(page.locator('input[name="name"]')).toHaveAttribute("aria-invalid", "true");
    // Invalid fields shake once.
    const shake = await page.locator(".cr-field").first().evaluate((el) => getComputedStyle(el).animationName);
    expect(shake).toMatch(/cr-shake-[ab]/);

    await page.fill('input[name="name"]', "Ines Alvarez");
    await page.fill('input[name="email"]', "ines@example.com");
    await page.selectOption('select[name="matter"]', "Employment & executive matters");
    await page.fill('textarea[name="message"]', "My co-founder wants to leave and we have no agreement.");
    await expect(page.locator(".cr-field__error")).toHaveCount(0);

    await submit.click();
    await expect(submit).toHaveAttribute("data-loading", "true");
    await expect(page.locator(".cr-file__card")).toHaveAttribute("data-phase", "success", { timeout: 4000 });
    await expect(page.locator(".cr-done__title")).toHaveText("Filed, Ines.");
    await expect(page.locator(".cr-done__docket")).toHaveText(/^CR-26-\d{4}$/);
    await expect(page.locator(".cr-done__body")).toContainText("ines@example.com");
    await expect(page.locator(".cr-file__card .cr-done__seal")).toHaveCSS("animation-name", "cr-press");
    expect(external).toBe(false);

    await page.getByRole("button", { name: "File another matter" }).click();
    await expect(page.locator(".cr-file__card")).toHaveAttribute("data-phase", "idle");
    await expect(page.locator('input[name="name"]')).toHaveValue("");
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("the menu opens, traps focus, closes on Escape and on a link; the brief is a plain document", async ({ page }) => {
      await page.goto("/calder");
      await expect(page.locator("#argument")).not.toHaveAttribute("data-pin", "1");
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      const menu = page.locator("#cr-menu");
      await expect(menu).toHaveAttribute("data-open", "true");
      await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("data-open", "false");
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

      await page.getByRole("button", { name: "Open menu" }).click();
      await menu.getByRole("link", { name: /Counsel/ }).click();
      await expect(menu).toHaveAttribute("data-open", "false");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("every clause is fully written with no pinned stage", async ({ page }) => {
      await page.goto("/calder");
      const dim = await page.$$eval(".cr-w", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(dim).toBe(0);
      const sticky = await page.locator(".cr-arg__stage").evaluate((el) => getComputedStyle(el).position);
      expect(sticky).not.toBe("sticky");
    });
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("no load sequence, no pinning, no loops; everything visible and finished", async ({ page }) => {
      await page.goto("/calder");
      await expect(page.locator("html")).toHaveAttribute("data-cr-motion", "static");

      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden).toBe(0);
      const masked = await page.$$eval(".cr-line__in", (els) => els.filter((e) => getComputedStyle(e).transform !== "none").length);
      expect(masked).toBe(0);
      const clipped = await page.$$eval("[data-reveal='wipe'] > *", (els) => els.filter((e) => getComputedStyle(e).clipPath !== "none" && !getComputedStyle(e).clipPath.startsWith("inset(0px)")).length);
      expect(clipped).toBe(0);

      const running = await page.$$eval(".cr-load, .cr-seal__ring, .cr-marquee__track, .cr-hero__glow", (els) =>
        els.filter((e) => getComputedStyle(e).animationName !== "none").length,
      );
      expect(running).toBe(0);

      // The brief is a finished document: not pinned, every word solid, the seal in place.
      await expect(page.locator("#argument")).not.toHaveAttribute("data-pin", "1");
      const sticky = await page.locator(".cr-arg__stage").evaluate((el) => getComputedStyle(el).position);
      expect(sticky).not.toBe("sticky");
      const ghosts = await page.$$eval(".cr-w", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(ghosts).toBe(0);
      await expect(page.locator(".cr-brief__seal")).toHaveCSS("opacity", "1");

      // Nothing moves, but colour and opacity still ease (fewer and gentler, not zero).
      const moving = await page.$$eval(".cr-count, .cr-btn, .cr-acc__panel, .cr-menu", (els) =>
        els.filter((e) => getComputedStyle(e).transitionProperty.split(",").some((p) => /transform|clip-path|grid-template-rows/.test(p))).length,
      );
      expect(moving).toBe(0);

      // Smooth scroll never mounts.
      await page.waitForTimeout(500);
      expect(await page.evaluate(() => "__crLenis" in window)).toBe(false);
    });

    test("the form still works and still confirms", async ({ page }) => {
      await page.goto("/calder#file");
      await page.fill('input[name="name"]', "Ines Alvarez");
      await page.fill('input[name="email"]', "ines@example.com");
      await page.selectOption('select[name="matter"]', "Trusts & estates");
      await page.fill('textarea[name="message"]', "We need to plan succession for the company.");
      await page.getByRole("button", { name: "File this matter" }).click();
      await expect(page.locator(".cr-file__card")).toHaveAttribute("data-phase", "success", { timeout: 3000 });
    });
  });

  test.describe("with JavaScript disabled", () => {
    test.use({ javaScriptEnabled: false });

    test("the finished page is readable: copy, every clause, every answer", async ({ page }) => {
      await page.goto("/calder");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".cr-clause").first()).toBeVisible();
      const dim = await page.$$eval(".cr-w", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(dim).toBe(0);
      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden).toBe(0);
      await expect(page.locator(".cr-acc__panel p").last()).toBeVisible();
      await expect(page.locator("#file")).toBeAttached();
    });
  });
});
