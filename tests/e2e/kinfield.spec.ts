import { expect, test } from "@playwright/test";

const route = process.env.KINFIELD_TEST_PATH ?? "/templates/kinfield";

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test("section titles wait until they are deeper in view at " + viewport.width + "px", async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(route);
    const intro = page.locator(".kf-atlas-header .kf-scroll-copy").first();
    await page.waitForTimeout(800);
    const position = async (fraction: number) => {
      await intro.evaluate((element, visibleFraction) => {
        const transform = getComputedStyle(element).transform;
        const shift = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
        const top = element.getBoundingClientRect().top + scrollY - shift;
        window.scrollTo({ top: top - innerHeight * visibleFraction, behavior: "instant" });
      }, fraction);
    };
    await position(0.8);
    await page.waitForTimeout(800);
    await expect(intro).toHaveCSS("opacity", "0.9");
    await position(0.6);
    await expect.poll(() => intro.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
    await expect(intro).toHaveCSS("opacity", "1");
  });

  test("section introductions wait until they enter the viewport at " + viewport.width + "px", async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(route);
    const intro = page.locator(".kf-atlas-header .kf-scroll-copy").first();
    await page.waitForTimeout(800);
    await intro.evaluate((element) => {
      const top = element.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: top - innerHeight - 30, behavior: "instant" });
    });
    await page.waitForTimeout(800);
    const waiting = await intro.evaluate((element) => ({
      top: element.getBoundingClientRect().top,
      opacity: Number(getComputedStyle(element).opacity),
      transform: getComputedStyle(element).transform,
    }));
    expect(waiting.top).toBeGreaterThan(viewport.height);
    expect(waiting.opacity).toBeLessThan(0.98);
    expect(waiting.transform).not.toBe("none");

    await intro.evaluate((element) => {
      const top = element.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: top - innerHeight * 0.55, behavior: "instant" });
    });
    await expect.poll(() => intro.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
    await expect(intro).toHaveCSS("opacity", "1");
  });

  test("the program sheet keeps moving while visible at " + viewport.width + "px", async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(route);
    await page.waitForTimeout(800);
    const schedule = page.locator(".kf-schedule");
    const place = async (fraction: number) => {
      await schedule.evaluate((element, position) => {
        const rect = element.getBoundingClientRect();
        const matrix = getComputedStyle(element).transform;
        const shift = matrix === "none" ? 0 : new DOMMatrixReadOnly(matrix).m42;
        window.scrollTo({ top: rect.top + scrollY - shift - innerHeight * position, behavior: "instant" });
      }, fraction);
      await page.waitForTimeout(100);
      return schedule.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
      });
    };
    const early = await place(0.6);
    const later = await place(0.1);
    expect(early).toBeGreaterThan(later + 8);
    expect(later).toBeLessThan(5);
  });
}

test("the hero holds its first pose for three times the previous scroll distance", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  const secondPose = page.locator(".kf-pose-1");
  await page.evaluate(() => window.scrollTo({ top: innerHeight * 0.54, behavior: "instant" }));
  await page.waitForTimeout(120);
  expect(await secondPose.evaluate((element) => Number(getComputedStyle(element).opacity))).toBeLessThan(0.02);
  await page.evaluate(() => window.scrollTo({ top: innerHeight * 0.59, behavior: "instant" }));
  await expect.poll(() => secondPose.evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.1);
  await page.evaluate(() => window.scrollTo({ top: innerHeight * 0.7, behavior: "instant" }));
  await expect.poll(() => secondPose.evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.95);
});

test("atlas changes routine by zone and level, and resets", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "hips", exact: false }).last().click();
  await page.getByRole("button", { name: "experienced", exact: true }).click();
  await expect(page.getByText("Deep supported hip transitions")).toBeVisible();
  await expect(page.locator(".kf-routine")).toContainText("12 MIN");
  await page.getByRole("button", { name: "experienced", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByText("Standing hip hinges")).toBeVisible();
  await page.getByRole("button", { name: /Reset atlas/ }).click();
  await expect(page.getByText("Slow shoulder rolls")).toBeVisible();
});

test("class selection carries into a validated local preview", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: /Range Lab/ }).click();
  await expect(page.getByLabel("01 / CHOOSE YOUR PRACTICE")).toHaveValue("range");
  await page.getByRole("button", { name: "Review your preview" }).click();
  await expect(page.locator("#kf-date-error")).toContainText("Choose a date");
  const date = new Date(); date.setDate(date.getDate() + 1);
  const day = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  await page.getByLabel("02 / CHOOSE A DATE").fill(day);
  await page.getByRole("button", { name: "Review your preview" }).click();
  await expect(page.getByText("Preview only — no reservation made.")).toBeVisible();
  await expect(page.locator(".kf-review-details")).toContainText("Range Lab");
  await page.getByRole("button", { name: /Slow Strength/ }).click();
  await expect(page.getByText("Preview only — no reservation made.")).toBeHidden();
  await expect(page.locator(".kf-review-details")).toContainText("Slow Strength");
  await page.getByRole("button", { name: "Review your preview" }).click();
  await page.getByRole("button", { name: /Adjust your selection/ }).click();
  await expect(page.getByText("Preview only — no reservation made.")).toBeHidden();
});

test("mobile navigation, portrait controls and layout work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await page.getByRole("button", { name: "Portrait 2" }).click();
  await expect(page.getByRole("button", { name: "Portrait 2" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("button", { name: "Open chapter navigation" })).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("the desktop portrait opens with scroll and reverses", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  const portrait = page.locator(".kf-hero-image");
  const start = await portrait.evaluate((element) => getComputedStyle(element).clipPath);
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  await page.evaluate((distance) => window.scrollTo(0, distance), hero!.height - 900);
  await expect.poll(() => portrait.evaluate((element) => getComputedStyle(element).clipPath)).not.toBe(start);
  await expect.poll(() => page.locator(".kf-pose-2").evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.9);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => portrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe(start);
});

test("the portrait catches up immediately to fast forward and reverse scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  const portrait = page.locator(".kf-hero-image");
  const clipInsets = () => portrait.evaluate((element) => {
    const inset = getComputedStyle(element).clipPath.split("round")[0];
    return Math.max(...(inset.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number));
  });
  await page.evaluate((distance) => window.scrollTo(0, distance), hero!.height - 900);
  await page.waitForTimeout(100);
  expect(await clipInsets()).toBeLessThan(1);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  expect(await clipInsets()).toBeGreaterThan(19);
});

test("hero side panels leave with the portrait and return when scrolling back", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  await page.evaluate((distance) => window.scrollTo(0, distance), hero!.height - 900);
  await page.waitForTimeout(100);
  const left = page.locator(".kf-manifesto");
  const right = page.locator(".kf-hero-ledger");
  expect(await left.evaluate((element) => element.getBoundingClientRect().right)).toBeLessThanOrEqual(0);
  expect(await right.evaluate((element) => element.getBoundingClientRect().left)).toBeGreaterThanOrEqual(1440);
  await expect(left).toHaveCSS("visibility", "hidden");
  await expect(right).toHaveCSS("visibility", "hidden");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  await expect(left).toHaveCSS("visibility", "visible");
  await expect(right).toHaveCSS("visibility", "visible");
});

test("focus stays visible when a focused hero link leaves the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  await page.locator(".kf-manifesto a").first().focus();
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  await page.evaluate((distance) => window.scrollTo(0, distance), hero!.height - 900);
  await expect(page.getByRole("button", { name: "Open chapter navigation" })).toBeFocused();
});

test("chapter links place keyboard focus at their destination", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  await page.getByRole("link", { name: "Explore the practice" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#practice")).toBeFocused();
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  await page.getByRole("dialog").getByRole("link", { name: /Session preview/ }).click();
  await expect(page.locator("#session")).toBeFocused();
});

test("a short desktop viewport can scroll past the hero without a long sticky hold", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 600 });
  await page.goto(route);
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  expect(hero!.height).toBeLessThanOrEqual(620);
  await page.getByRole("link", { name: "Explore the practice" }).click();
  await expect(page.getByRole("heading", { name: /There is no/ })).toBeVisible();
});

test("deep links, focus, and the atlas survive resizing and a reduced-motion change", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route + "#session");
  const date = page.getByLabel("02 / CHOOSE A DATE");
  await expect(date).toHaveAttribute("min", /^\d{4}-\d{2}-\d{2}$/);
  await date.fill("2099-12-31");
  await date.focus();
  await expect(date).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(date).toBeVisible();
  await expect(date).toHaveValue("2099-12-31");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Select hips" }).click();
  await expect(page.getByText("Supported hip circles")).toBeVisible();
  await expect.poll(() => page.locator(".kf-atlas").evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  await expect.poll(() => page.locator(".kf-atlas-header .kf-scroll-copy").first().evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("preserves session choices made before client hydration completes", async ({ page }) => {
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => { releaseScripts = resolve; });
  await page.route("**/_next/static/**/*.js*", async (route) => {
    await scriptsReady;
    await route.continue();
  });
  try {
    await page.goto(route + "#session", { waitUntil: "commit" });
    const date = page.getByLabel("02 / CHOOSE A DATE");
    const classSelect = page.getByLabel("01 / CHOOSE YOUR PRACTICE");
    await expect(date).toBeVisible();
    await expect(date).not.toHaveAttribute("min", /^\d{4}-\d{2}-\d{2}$/);
    await date.fill("2099-12-31");
    await classSelect.selectOption("range");
    releaseScripts();
    await expect(date).toHaveAttribute("min", /^\d{4}-\d{2}-\d{2}$/);
    await expect(date).toHaveValue("2099-12-31");
    await expect(classSelect).toHaveValue("range");
    await expect(page.locator(".kf-review-details")).toContainText("2099-12-31");
    await expect(page.locator(".kf-review-details")).toContainText("Range Lab");
  } finally {
    releaseScripts();
  }
});

test("reduced motion and no JavaScript leave the content readable", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(route);
  await expect(page.getByText("Move in your")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Get to know/ })).toBeVisible();
  const intro = page.locator(".kf-practice-intro .kf-scroll-copy").first();
  await expect(intro).toHaveCSS("opacity", "1");
  await expect(intro).toHaveCSS("transform", "none");
  await expect(page.getByText(/no reservation is made/i).first()).toBeVisible();
  await context.close();
});

test("without JavaScript the desktop hero does not hold a long static scroll", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(route);
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  expect(hero!.height).toBeLessThanOrEqual(900);
  await expect(page.getByRole("heading", { name: /Move in your own rhythm/ })).toBeVisible();
  await context.close();
});
