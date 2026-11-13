import { expect, test } from "@playwright/test";

test("the hero hands off to a draggable, controllable photo reel", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const hero = page.locator(".aw-hero-stage");
  await expect(hero).toHaveAttribute("data-pinned", "true");
  await page.evaluate(() => window.scrollTo({ top: 430, behavior: "instant" }));
  await expect.poll(() => page.locator(".aw-hero-frame").evaluate((element) => getComputedStyle(element).opacity)).not.toBe("1");
  expect(Math.abs((await hero.boundingBox())?.y ?? 999)).toBeLessThan(3);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => page.locator(".aw-hero-frame").evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.99);

  const reel = page.locator(".aw-reel-viewport");
  await reel.scrollIntoViewIfNeeded();
  await expect(reel).toHaveAttribute("data-live", "true");
  await expect(reel.locator('.aw-reel-card[data-original="true"]')).toHaveCount(5);
  await expect(reel.getByRole("figure")).toHaveCount(5);
  expect(await reel.locator('.aw-reel-card[aria-hidden="true"][inert]').count()).toBeGreaterThanOrEqual(10);
  await page.getByRole("button", { name: "Pause gallery" }).click();
  await expect(page.getByRole("button", { name: "Play gallery" })).toBeVisible();
  const track = page.locator(".aw-reel-track");
  const x = () => track.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  const before = await x();
  await page.getByRole("button", { name: "Next photo" }).click();
  await expect.poll(x).toBeLessThan(before - 50);
  const afterButton = await x();
  const box = await reel.boundingBox();
  if (!box) throw new Error("The photo reel has no bounds");
  await page.mouse.move(box.x + box.width * 0.65, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5, { steps: 8 });
  await page.mouse.up();
  await expect.poll(x).toBeLessThan(afterButton - 20);
  await page.getByRole("button", { name: "Play gallery" }).click();
  await expect(page.getByRole("button", { name: "Pause gallery" })).toBeVisible();
  const onPlay = await x();
  await expect.poll(async () => Math.abs((await x()) - onPlay)).toBeGreaterThan(5);
});

test("the photo reel wraps continuously in both directions and keeps its place on resize", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const reel = page.locator(".aw-reel-viewport");
  await reel.scrollIntoViewIfNeeded();
  await expect(reel).toHaveAttribute("data-live", "true");
  await page.getByRole("button", { name: "Pause gallery" }).click();
  const track = page.locator(".aw-reel-track");
  const getX = () => track.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  const period = Number(await reel.getAttribute("data-period"));
  const first = reel.locator('.aw-reel-card[data-original="true"]').first();
  const width = (await first.boundingBox())?.width;
  if (!width || !period) throw new Error("Carousel measurements are missing");
  const step = width + 16;
  const cyclicDistance = (a: number, b: number, cycle: number) => Math.abs((((a - b + cycle / 2) % cycle) + cycle) % cycle - cycle / 2);
  const initial = await getX();
  for (let i = 1; i <= 6; i++) {
    await page.getByRole("button", { name: "Next photo" }).click();
    await expect.poll(async () => cyclicDistance(await getX(), initial - step * i, period)).toBeLessThan(1.5);
  }
  for (let i = 5; i >= 0; i--) {
    await page.getByRole("button", { name: "Previous photo" }).click();
    await expect.poll(async () => cyclicDistance(await getX(), initial - step * i, period)).toBeLessThan(1.5);
  }
  await page.getByRole("button", { name: "Next photo" }).click();
  await expect.poll(async () => cyclicDistance(await getX(), initial - step, period)).toBeLessThan(1.5);
  const phaseBefore = (-await getX() - period) / period;
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect.poll(async () => Number(await reel.getAttribute("data-period"))).not.toBe(period);
  const resizedPeriod = Number(await reel.getAttribute("data-period"));
  const phaseAfter = (-await getX() - resizedPeriod) / resizedPeriod;
  expect(Math.abs(phaseAfter - phaseBefore)).toBeLessThan(0.02);
  await expect(reel.getByRole("figure")).toHaveCount(5);
});

test("autoplay continues in one direction through the loop seam", async ({ page }) => {
  await page.clock.install();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const reel = page.locator(".aw-reel-viewport");
  await reel.scrollIntoViewIfNeeded();
  await expect(reel).toHaveAttribute("data-live", "true");
  await page.getByRole("button", { name: "Pause gallery" }).click();
  await page.getByRole("button", { name: "Play gallery" }).click();
  const track = page.locator(".aw-reel-track");
  const getX = () => track.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  const period = Number(await reel.getAttribute("data-period"));
  const beforeCycle = await getX();
  const phase = ((-beforeCycle - period) % period + period) % period;
  await page.clock.fastForward(Math.max(0, Math.floor((period - phase - 8) / 24 * 1000)));
  const beforeSeam = await getX();
  await page.clock.fastForward(800);
  const afterSeam = await getX();
  const delta = (((afterSeam - beforeSeam + period / 2) % period) + period) % period - period / 2;
  expect(delta).toBeLessThan(-5);
  expect(delta).toBeGreaterThan(-35);
});

test("a manual drag keeps autoplay enabled until the visitor pauses it", async ({ page }) => {
  await page.clock.install();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const reel = page.locator(".aw-reel-viewport");
  await reel.scrollIntoViewIfNeeded();
  await expect(reel).toHaveAttribute("data-live", "true");
  const box = await reel.boundingBox();
  if (!box) throw new Error("The photo reel has no bounds");
  await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5, { steps: 8 });
  await page.mouse.up();
  await expect(page.getByRole("button", { name: "Pause gallery" })).toBeVisible();
  await page.mouse.move(1, 1);
  await page.clock.fastForward(3000);
  const track = page.locator(".aw-reel-track");
  const getX = () => track.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  const before = await getX();
  await page.clock.fastForward(2000);
  const after = await getX();
  const period = Number(await reel.getAttribute("data-period"));
  const delta = (((after - before + period / 2) % period) + period) % period - period / 2;
  expect(delta).toBeLessThan(-20);
  await page.getByRole("button", { name: "Pause gallery" }).click();
  const stoppedAt = await getX();
  await page.clock.fastForward(2000);
  expect(Math.abs((await getX()) - stoppedAt)).toBeLessThan(1);
});

test("keyboard focus pauses the carousel for accessible navigation", async ({ page }) => {
  await page.clock.install();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const reel = page.locator(".aw-reel-viewport");
  await reel.scrollIntoViewIfNeeded();
  await expect(reel).toHaveAttribute("data-live", "true");
  await page.keyboard.press("Tab");
  await page.getByRole("button", { name: "Pause gallery" }).focus();
  await expect(page.getByRole("button", { name: "Pause gallery" })).toBeFocused();
  await page.clock.fastForward(200);
  const track = page.locator(".aw-reel-track");
  const getX = () => track.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
  const before = await getX();
  await page.clock.fastForward(2000);
  expect(Math.abs((await getX()) - before)).toBeLessThan(1);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Previous photo" })).toBeFocused();
});

test("filters walks and makes a truthful local card", async ({ page }) => {
  await page.goto("/templates/afterwalk");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Good things");
  await page.getByRole("button", { name: "An hour or less" }).click();
  await expect(page.getByRole("heading", { name: "The riverside ramble" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Park & pastry" })).toBeVisible();
  await page.getByRole("button", { name: "Choose Park & pastry" }).click();
  await expect(page.getByLabel("Your kind of walk")).toHaveValue("park");
  await page.getByLabel("Your first name").fill("Sam");
  await page.getByRole("button", { name: "Make my walk card" }).click();
  await expect(page.getByRole("status").filter({ hasText: "See you out there" })).toContainText("Sam");
  await expect(page.getByRole("status").filter({ hasText: "See you out there" })).toContainText("No meetup is booked");
});

test("loaded walk photos reveal when their cards enter the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const art = page.locator(".aw-walk-art");
  await expect(art).toHaveCount(3);
  await expect(art.first()).toHaveAttribute("data-motion-ready", "true");
  await page.locator(".aw-walk-grid").scrollIntoViewIfNeeded();
  await expect.poll(() => art.evaluateAll((elements) => elements.every((element) => {
    const image = element.querySelector("img");
    return image?.complete && image.naturalWidth > 0;
  }))).toBe(true);
  await expect.poll(() => art.evaluateAll((elements) => elements.map((element) => (element as HTMLElement).dataset.in)), { timeout: 2500 }).toEqual(["true", "true", "true"]);
  await expect.poll(() => art.evaluateAll((elements) => elements.every((element) => ["none", "inset(0px)"].includes(getComputedStyle(element).clipPath))), { timeout: 3000 }).toBe(true);
  await page.getByRole("button", { name: "After work" }).click();
  await expect(art).toHaveCount(2);
  await page.getByRole("button", { name: "All walks" }).click();
  await expect(art).toHaveCount(3);
  await expect.poll(() => art.evaluateAll((elements) => elements.every((element) => {
    const image = element.querySelector("img");
    return image?.complete && image.naturalWidth > 0 && ["none", "inset(0px)"].includes(getComputedStyle(element).clipPath);
  })), { timeout: 3000 }).toBe(true);
  const companyPhoto = page.locator(".aw-together-image");
  await companyPhoto.scrollIntoViewIfNeeded();
  await expect(companyPhoto).toHaveAttribute("data-in", "true", { timeout: 2500 });
});

test("each walk photo reveals when reached on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk");
  const cards = page.locator(".aw-walk-card");
  const art = page.locator(".aw-walk-art");
  for (let index = 0; index < 3; index++) {
    await cards.nth(index).scrollIntoViewIfNeeded();
    await expect(art.nth(index)).toHaveAttribute("data-in", "true", { timeout: 2500 });
    await expect.poll(() => art.nth(index).evaluate((element) => {
      const image = element.querySelector("img");
      return !!image && image.complete && image.naturalWidth > 0 && ["none", "inset(0px)"].includes(getComputedStyle(element).clipPath);
    }), { timeout: 3000 }).toBe(true);
  }
});

test("a live reduced-motion preference disables the pin and reel without losing the selected walk", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/templates/afterwalk#walks");
  await expect(page.locator(".aw-hero-stage")).toHaveAttribute("data-pinned", "true");
  await page.getByRole("button", { name: "Choose Park & pastry" }).click();
  await expect(page.getByLabel("Your kind of walk")).toHaveValue("park");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".aw-hero-stage")).toHaveAttribute("data-pinned", "false");
  await expect(page.locator(".aw-reel-viewport")).toHaveAttribute("data-live", "false");
  await expect(page.getByLabel("Your kind of walk")).toHaveValue("park");
  await expect(page.locator(".aw-scroll-progress")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".aw-hero-stage")).toHaveAttribute("data-pinned", "true");
  await expect(page.getByLabel("Your kind of walk")).toHaveValue("park");
  await page.setViewportSize({ width: 1440, height: 701 });
  await expect(page.locator(".aw-hero-stage")).toHaveAttribute("data-pinned", "false");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".aw-hero-stage")).toHaveAttribute("data-pinned", "true");
});

test("deep links, history, and rapid reverse scrolling leave the page readable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/templates/afterwalk");
  await page.getByRole("link", { name: "Find your kind of walk" }).first().click();
  await expect(page).toHaveURL(/#walks/);
  await expect(page.getByRole("heading", { name: "A walk for any kind of day." })).toBeInViewport();
  await page.goBack();
  await expect(page).not.toHaveURL(/#walks/);
  await page.goForward();
  await expect(page).toHaveURL(/#walks/);
  for (const fraction of [0.75, 0.5, 0.25, 0]) {
    await page.evaluate((value) => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * value, behavior: "instant" }), fraction);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile menu, narrow layout, and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/templates/afterwalk");
  await expect(page.locator(".aw-hero-stage")).toHaveAttribute("data-pinned", "false");
  await expect(page.locator(".aw-reel-viewport")).toHaveAttribute("data-live", "false");
  await expect(page.getByRole("button", { name: "Pause gallery" })).toHaveCount(0);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "The walks" }).click();
  await expect(page).toHaveURL(/#walks/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  for (const element of await page.locator("[data-reveal]").all()) await expect(element).toBeVisible();
  await page.getByRole("button", { name: "Next photo" }).click();
  await expect.poll(() => page.locator(".aw-reel-viewport").evaluate((element) => element.scrollLeft)).toBeGreaterThan(100);
  const reel = page.locator(".aw-reel-viewport");
  await expect(reel.locator(".aw-reel-card")).toHaveCount(5);
  await reel.evaluate((element) => { element.scrollLeft = element.scrollWidth - element.clientWidth; });
  await page.getByRole("button", { name: "Next photo" }).click();
  await expect.poll(() => reel.evaluate((element) => element.scrollLeft)).toBe(0);
  await page.setViewportSize({ width: 375, height: 700 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test.describe("touch photo reel", () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  test("horizontal drag moves the photos while vertical gestures can scroll the page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/templates/afterwalk");
    const reel = page.locator(".aw-reel-viewport");
    await reel.scrollIntoViewIfNeeded();
    await expect(reel).toHaveAttribute("data-live", "true");
    await page.getByRole("button", { name: "Pause gallery" }).click();
    const box = await reel.boundingBox();
    if (!box) throw new Error("The touch photo reel has no bounds");
    const track = page.locator(".aw-reel-track");
    const x = () => track.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41);
    const before = await x();
    const touch = await page.context().newCDPSession(page);
    const y = box.y + box.height * 0.5;
    await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 300, y }] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 250, y }] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 175, y }] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(x).toBeLessThan(before - 30);
    const beforeScroll = await page.evaluate(() => window.scrollY);
    await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 180, y: y + 70 }] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 180, y: y - 40 }] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 180, y: y - 100 }] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(beforeScroll + 20);
    await touch.detach();
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("shows the content and a truthful form fallback", async ({ page }) => {
    await page.goto("/templates/afterwalk");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#plan noscript p")).toBeVisible();
    await expect(page.locator("#plan noscript p")).toContainText("The walk card needs JavaScript.");
    await expect(page.locator(".aw-reel-viewport")).toHaveAttribute("data-live", "false");
    await expect(page.locator(".aw-reel-card")).toHaveCount(5);
    await expect(page.getByRole("heading", { name: "The long way looks good on you." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Park & pastry" })).toBeVisible();
  });
});
