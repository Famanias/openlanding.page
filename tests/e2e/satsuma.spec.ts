import { test, expect, type Page } from "@playwright/test";

/** translateX of every wheel card (its left edge, in px). */
async function lefts(page: Page): Promise<number[]> {
  return page.$$eval(".sa-card", (els) =>
    els.map((e) => {
      const m = /translate3d\(([-\d.]+)px,\s*([-\d.]+)px/.exec((e as HTMLElement).style.transform);
      return m ? Number(m[1]) : Number.NaN;
    }),
  );
}

async function heights(page: Page): Promise<number[]> {
  return page.$$eval(".sa-card", (els) => els.map((e) => parseFloat((e as HTMLElement).style.height)));
}

/** Index of the card whose centre sits nearest the middle of a 1440-wide frame. */
async function centreCard(page: Page): Promise<number> {
  const [xs, widths] = await Promise.all([lefts(page), page.$$eval(".sa-card", (els) => els.map((e) => parseFloat((e as HTMLElement).style.width)))]);
  let best = 0;
  xs.forEach((x, i) => {
    if (Math.abs(x + widths[i] / 2 - 720) < Math.abs(xs[best] + widths[best] / 2 - 720)) best = i;
  });
  return best;
}

test.use({ viewport: { width: 1440, height: 1080 } });

test.describe("satsuma — short-reel marketplace landing page", () => {
  test("loads with one h1, the primary nav and a live wheel of ten cards", async ({ page }) => {
    await page.goto("/satsuma");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Reels that land,\s*made by hand\./);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeAttached();
    await expect(page.locator("html")).toHaveAttribute("data-sa-motion", "live");
    await expect(page.locator(".sa-wheel")).toHaveAttribute("data-ready", "true");
    await expect(page.locator(".sa-card")).toHaveCount(10);
    // Every card is a rounded quad, recomputed in JS.
    const clips = await page.$$eval(".sa-card", (els) => els.map((e) => (e as HTMLElement).style.clipPath));
    for (const c of clips) expect(c).toContain("path(");
  });

  test("the wheel is a cylinder: the middle is upright, the rim is taller", async ({ page }) => {
    await page.goto("/satsuma");
    await page.waitForTimeout(2600); // the wheel assembles from a flat row into its arc
    const mid = await centreCard(page);
    const hs = await heights(page);
    const xs = await lefts(page);
    expect(hs[mid]).toBeGreaterThan(275);
    expect(hs[mid]).toBeLessThan(295);
    const rim = xs.map((x, i) => ({ x, h: hs[i] })).filter((c) => c.x > 1150 && c.x < 1440);
    expect(rim.length).toBeGreaterThan(0);
    for (const c of rim) expect(c.h).toBeGreaterThan(hs[mid] + 40);
  });

  test("the row drifts right to left on its own", async ({ page }) => {
    await page.goto("/satsuma");
    await page.waitForTimeout(2600);
    const mid = await centreCard(page);
    const a = (await lefts(page))[mid];
    await page.waitForTimeout(1000);
    const b = (await lefts(page))[mid];
    expect(b - a).toBeLessThan(-30);
    expect(b - a).toBeGreaterThan(-90);
  });

  test("dragging follows the pointer, a fling coasts, then the drift carries on", async ({ page }) => {
    await page.goto("/satsuma");
    await page.waitForTimeout(2600);
    const mid = await centreCard(page);
    const wheel = page.locator(".sa-wheel");
    await expect(wheel).toHaveCSS("cursor", "grab");

    // A slow, held drag follows 1:1 (the centre card moves ~300px).
    const start = (await lefts(page))[mid];
    await page.mouse.move(720, 700);
    await page.mouse.down();
    await expect(wheel).toHaveAttribute("data-dragging", "true");
    await expect(wheel).toHaveCSS("cursor", "grabbing");
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(720 + i * 30, 700);
      await page.waitForTimeout(40);
    }
    await page.waitForTimeout(250); // hold still so the release velocity is zero
    const held = (await lefts(page))[mid];
    expect(held - start).toBeGreaterThan(260);
    expect(held - start).toBeLessThan(340);
    await page.mouse.up();
    await expect(wheel).toHaveAttribute("data-dragging", "false");

    // A quick fling keeps moving after release, decaying.
    await page.mouse.move(400, 700);
    await page.mouse.down();
    for (let i = 1; i <= 6; i++) {
      await page.mouse.move(400 - i * 60, 700);
      await page.waitForTimeout(12);
    }
    await page.mouse.up();
    const r0 = (await lefts(page))[mid];
    await page.waitForTimeout(150);
    const r1 = (await lefts(page))[mid];
    await page.waitForTimeout(400);
    const r2 = (await lefts(page))[mid];
    expect(r1).toBeLessThan(r0 - 20); // flung left, still coasting
    expect(r2).toBeLessThan(r1 - 20);
    expect(r1 - r0).toBeLessThan(0);
    // ...and once the fling is spent the slow drift remains (about 50 units a second).
    await page.waitForTimeout(3500);
    const s0 = (await lefts(page))[mid];
    await page.waitForTimeout(1000);
    const s1 = (await lefts(page))[mid];
    expect(s1 - s0).toBeGreaterThan(-90);
    expect(s1 - s0).toBeLessThan(-25);
  });

  test("arrow keys nudge the wheel, and the hero has no pause button", async ({ page }) => {
    await page.goto("/satsuma");
    await page.waitForTimeout(2600);
    await expect(page.getByRole("button", { name: /pause reels|play reels/i })).toHaveCount(0);
    const mid = await centreCard(page);
    await page.locator(".sa-wheel").focus();
    const before = (await lefts(page))[mid];
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(250);
    expect((await lefts(page))[mid]).toBeGreaterThan(before + 20);
  });

  test("the hero copy sits where the frame says", async ({ page }) => {
    await page.goto("/satsuma");
    await page.waitForTimeout(2600);
    const box = async (sel: string) => (await page.locator(sel).boundingBox())!;
    await expect(page.getByText("Loved by")).toHaveCount(0);
    // The hero's marks: a turning seal, a leaf sprig and a trust line; no hand-written notes or arrows.
    await expect(page.locator(".sa-seal")).toBeVisible();
    await expect(page.locator(".sa-sprig")).toBeVisible();
    await expect(page.locator(".sa-trust")).toHaveText(/Free to brief/);
    await expect(page.locator(".sa-note, .sa-doodle")).toHaveCount(0);
    const turning = await page.locator(".sa-seal__ring").evaluate((el) => getComputedStyle(el).animationName);
    expect(turning).toBe("sa-turn");
    const h1 = await box(".sa-h1");
    expect(Math.round(h1.y)).toBeGreaterThanOrEqual(174);
    expect(Math.round(h1.y)).toBeLessThanOrEqual(178);
    // Centred in the frame.
    expect(Math.abs(h1.x + h1.width / 2 - 720)).toBeLessThan(2);
    const cta = await box(".sa-cta");
    expect(Math.round(cta.x)).toBe(626);
    expect(Math.round(cta.y)).toBe(901);
    // The CTA is a pill on a satsuma plate that it settles down onto on hover.
    const plate = await box(".sa-cta__plate");
    expect(Math.round(plate.width)).toBe(190);
    const btnBefore = await box(".sa-cta .sa-btn");
    expect(btnBefore.x).toBeLessThan(plate.x + (plate.width - btnBefore.width) / 2 - 3);
    await page.locator(".sa-cta .sa-btn").hover();
    await page.waitForTimeout(900);
    const btnAfter = await box(".sa-cta .sa-btn");
    expect(btnAfter.x).toBeGreaterThan(btnBefore.x + 4);
    expect(btnAfter.y).toBeGreaterThan(btnBefore.y + 4);
    await expect(page.locator(".sa-cta__ring")).toHaveCount(0);
    const login = await box(".sa-header__login");
    expect(Math.round(login.x)).toBe(1211);
  });

  test("reveals flip to data-in on scroll and cards react to the pointer", async ({ page }) => {
    await page.goto("/satsuma");
    const title = page.locator("#sa-makers-h");
    await expect(title).not.toHaveAttribute("data-in", "true");
    await title.scrollIntoViewIfNeeded();
    await expect(title).toHaveAttribute("data-in", "true");
    const grid = page.locator(".sa-makers__grid");
    await grid.scrollIntoViewIfNeeded();
    await expect(grid).toHaveAttribute("data-in", "true");
    await page.waitForTimeout(1600);

    const card = page.locator(".sa-maker").nth(1);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const before = await card.evaluate((el) => getComputedStyle(el).transform);
    await card.hover({ position: { x: 40, y: 40 } });
    await page.waitForTimeout(700);
    const after = await card.evaluate((el) => getComputedStyle(el).transform);
    expect(after).not.toEqual(before);
  });

  test("pack buttons and maker links pre-fill the brief form", async ({ page }) => {
    await page.goto("/satsuma");
    await page.locator('[data-pack="whole"]').click();
    await expect(page.locator('input[name="pack"][value="whole"]')).toBeChecked();
    await page.locator('[data-maker="Hana Sato"]').click();
    await expect(page.locator('textarea[name="note"]')).toHaveValue(/Hana Sato/);
  });

  test("the brief validates, loads, then confirms with no network request", async ({ page }) => {
    let external = false;
    page.on("request", (req) => {
      if (!req.url().startsWith("http://localhost")) external = true;
    });
    await page.goto("/satsuma#brief");
    const submit = page.getByRole("button", { name: "Make a Reel" }).last();
    await submit.click();
    await expect(page.locator(".sa-field__error")).toHaveCount(3);
    await expect(page.locator('input[name="brand"]')).toBeFocused();
    await expect(page.locator('input[name="brand"]')).toHaveAttribute("aria-invalid", "true");

    await page.fill('input[name="brand"]', "Fernhill Plants");
    await page.fill('input[name="email"]', "hello@fernhill.example");
    await page.selectOption('select[name="category"]', "Houseplants");
    await expect(page.locator(".sa-field__error")).toHaveCount(0);
    await submit.click();
    await expect(submit).toHaveAttribute("data-loading", "true");
    await expect(page.locator(".sa-brief__card")).toHaveAttribute("data-phase", "success", { timeout: 4000 });
    await expect(page.locator(".sa-done")).toBeVisible();
    await expect(page.locator(".sa-done__title")).toHaveText("Brief received.");
    await expect(page.locator(".sa-done__body")).toContainText("hello@fernhill.example");
    await expect(page.locator(".sa-done__ref")).toHaveText(/^SA-H[0-9A-Z]{4}$/);
    expect(external).toBe(false);

    await page.getByRole("button", { name: "Send another brief" }).click();
    await expect(page.locator(".sa-brief__card")).toHaveAttribute("data-phase", "idle");
  });

  test("nav links glide to their sections and the hash follows", async ({ page }) => {
    await page.goto("/satsuma");
    for (const id of ["makers", "how", "packs", "brief"]) {
      await page.goto(`/satsuma#${id}`);
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 });
    }
  });

  test.describe("on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("the menu opens, closes on Escape and on a link; the wheel is a 250px band", async ({ page }) => {
      await page.goto("/satsuma");
      await expect(page.locator(".sa-wheel")).toHaveAttribute("data-ready", "true");
      const band = await page.locator(".sa-wheel").boundingBox();
      expect(Math.round(band!.height)).toBe(250);
      expect(band!.width).toBeGreaterThan(380);

      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      const menu = page.locator("#sa-menu");
      await expect(menu).toHaveAttribute("data-open", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("data-open", "false");
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

      await page.getByRole("button", { name: "Open menu" }).click();
      await menu.getByRole("link", { name: /Packs/ }).click();
      await expect(menu).toHaveAttribute("data-open", "false");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("a swipe on the wheel spins it without scrolling the page sideways", async ({ page }) => {
      await page.goto("/satsuma");
      await page.waitForTimeout(2600);
      const xs0 = await lefts(page);
      const box = (await page.locator(".sa-wheel").boundingBox())!;
      await page.touchscreen.tap(box.x + 20, box.y + 20); // touch events are wired; a tap must not throw
      expect((await lefts(page)).length).toBe(xs0.length);
    });
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("no entrance, no drift, no video; every reveal and stroke is visible", async ({ page }) => {
      await page.goto("/satsuma");
      await expect(page.locator("html")).toHaveAttribute("data-sa-motion", "static");
      await expect(page.locator(".sa-wheel")).toHaveAttribute("data-ready", "true");
      await expect(page.locator(".sa-card__video")).toHaveCount(0);

      // The wheel is finished (full cylinder) and holds still.
      const mid = await centreCard(page);
      const hs = await heights(page);
      expect(Math.max(...hs)).toBeGreaterThan(hs[mid] + 40);
      const a = (await lefts(page))[mid];
      await page.waitForTimeout(800);
      expect(Math.abs((await lefts(page))[mid] - a)).toBeLessThan(0.5);

      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden).toBe(0);
      const undrawn = await page.$$eval(".sa-draw", (els) => els.filter((e) => getComputedStyle(e).strokeDashoffset !== "0px" && getComputedStyle(e).strokeDashoffset !== "0").length);
      expect(undrawn).toBe(0);
      const scenes = await page.$$eval(".sa-a", (els) => els.filter((e) => getComputedStyle(e).animationName !== "none").length);
      expect(scenes).toBe(0);
    });

    test("dragging still works, without a coast", async ({ page }) => {
      await page.goto("/satsuma");
      await expect(page.locator(".sa-wheel")).toHaveAttribute("data-ready", "true");
      const mid = await centreCard(page);
      const a = (await lefts(page))[mid];
      await page.mouse.move(720, 700);
      await page.mouse.down();
      for (let i = 1; i <= 6; i++) await page.mouse.move(720 - i * 40, 700);
      await page.mouse.up();
      await page.waitForTimeout(100);
      const b = (await lefts(page))[mid];
      expect(a - b).toBeGreaterThan(200);
      await page.waitForTimeout(500);
      expect(Math.abs((await lefts(page))[mid] - b)).toBeLessThan(1);
    });
  });

  test.describe("with JavaScript disabled", () => {
    test.use({ javaScriptEnabled: false });

    test("the finished page is readable: copy, wheel, sections", async ({ page }) => {
      await page.goto("/satsuma");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".sa-card").first()).toBeVisible();
      await expect(page.locator("#packs")).toBeAttached();
      const hidden = await page.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
      expect(hidden).toBe(0);
    });
  });
});
