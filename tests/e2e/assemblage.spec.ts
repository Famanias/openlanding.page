import { test, expect, type Locator } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 }, launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] } });
const ready = async (studio: Locator) => {
  await expect(studio).toHaveAttribute("data-as-scene-ready", "true", { timeout: 20_000 });
  await expect(studio).toHaveAttribute("data-as-scene-settled", "true", { timeout: 20_000 });
};
const position = (studio: Locator, id: string) => studio.evaluate((node, id) => Number((node as HTMLElement).style.getPropertyValue(`--as-${id}-x`)), id);

test("the paper renders past its div on a viewport-wide transparent canvas without blocking the CTA", async ({ page }) => {
  await page.goto("/assemblage");
  const hero = page.locator('.as-studio--hero'); await ready(hero);
  const surface = (await hero.locator('.as-studio-surface').boundingBox())!;
  const canvas = (await hero.locator('canvas').boundingBox())!;
  const width = await page.evaluate(() => document.documentElement.clientWidth);
  expect(canvas.x).toBeCloseTo(0);
  expect(canvas.width).toBe(width);
  expect(canvas.y).toBeLessThan(surface.y - 150);
  expect(canvas.height).toBeGreaterThan(surface.height + 300);
  await expect(hero.locator('canvas')).toHaveCSS('pointer-events', 'none');
  await hero.getByRole('button', { name: 'Signal', exact: true }).click();
  await hero.locator('.as-studio-surface').focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  await ready(hero);
  await page.getByRole('link', { name: 'Request a material study', exact: true }).click();
  await expect(page).toHaveURL(/#request$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
});

test("unpacks and recomposes the live paper scene", async ({ page }) => {
  const errors: string[] = []; page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/assemblage");
  const hero = page.locator('.as-studio--hero'); await ready(hero);
  const before = await position(hero, "ink");
  await hero.getByRole("button", { name: /Unpack/ }).click();
  await expect(hero).toHaveAttribute("data-mode", "unpack");
  await expect.poll(() => position(hero, "ink")).toBeLessThan(before - .7);
  await hero.getByRole("button", { name: "Recompose hero collage" }).click();
  await ready(hero); await expect(hero).toHaveAttribute("data-mode", "compose");
  await expect(page.locator(".as-hero-runway")).toHaveCSS("height", "1575px");
  expect(errors).toEqual([]);
});

test("raycast dragging moves real sheets and the keyboard can reposition a picked sheet", async ({ page }) => {
  await page.goto("/assemblage");
  const hero = page.locator('.as-studio--hero'); await ready(hero);
  const bounds = (await hero.locator('.as-studio-surface').boundingBox())!;
  const before = await hero.evaluate(node => ["paper", "image", "ink", "signal"].map(id => Number((node as HTMLElement).style.getPropertyValue(`--as-${id}-x`))));
  const x = bounds.x + bounds.width / 2 - 45, y = bounds.y + bounds.height / 2 + 70;
  await page.mouse.move(x, y); await page.mouse.down();
  await page.mouse.move(x + 90, y - 30, { steps: 8 });
  await expect(hero).toHaveAttribute("data-as-dragging", "true");
  await page.mouse.up(); await expect(hero).toHaveAttribute("data-as-dragging", "false");
  await ready(hero);
  const after = await hero.evaluate(node => ["paper", "image", "ink", "signal"].map(id => Number((node as HTMLElement).style.getPropertyValue(`--as-${id}-x`))));
  expect(after.some((value, index) => Math.abs(value - before[index]) > .2)).toBe(true);
  await hero.getByRole("button", { name: "Ink", exact: true }).click(); await ready(hero);
  const ink = await position(hero, "ink");
  await hero.locator('.as-studio-surface').focus(); await page.keyboard.press("ArrowRight");
  await expect.poll(() => position(hero, "ink")).toBeGreaterThan(ink + .15);
});

test("workshop tabs, spread and lighting control the scene while preserving panel geometry", async ({ page }) => {
  await page.goto("/assemblage#materials");
  const workshop = page.locator('.as-studio--workshop'); await ready(workshop);
  const tabs = page.getByRole("tab"); await tabs.first().focus(); await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused(); await expect(workshop).toHaveAttribute("data-selected", "ink");
  await expect(page.getByRole("tabpanel")).toContainText("Words with a weight");
  const height = (await page.locator('.as-material-details').boundingBox())!.height;
  await page.keyboard.press("End"); await expect(workshop).toHaveAttribute("data-selected", "signal");
  expect((await page.locator('.as-material-details').boundingBox())!.height).toBe(height);
  const before = await position(workshop, "paper");
  await workshop.getByRole("slider", { name: /Spread/ }).focus(); await page.keyboard.press("End");
  await expect(workshop.getByRole("slider", { name: /Spread/ })).toHaveValue("100");
  await expect.poll(() => position(workshop, "paper")).toBeLessThan(before - .3);
  await ready(workshop);
  const image = await workshop.locator('canvas').screenshot();
  await workshop.getByRole("slider", { name: /Move the light/ }).focus(); await page.keyboard.press("End");
  await expect(workshop.getByRole("slider", { name: /Move the light/ })).toHaveValue("100");
  await page.waitForTimeout(250);
  expect((await workshop.locator('canvas').screenshot()).equals(image)).toBe(false);
});

test("the pinned method visual assembles across three reversible scroll chapters", async ({ page }) => {
  await page.goto("/assemblage#process");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#process')).toHaveAttribute("data-as-process-live", "");
  const transforms: string[] = [];
  for (const index of [0, 1, 2, 0]) {
    await page.locator('.as-step-grid').evaluate((node, index) => {
      const bounds = node.getBoundingClientRect();
      scrollTo({ top: scrollY + bounds.top + (index + .5) * bounds.height / 3 - innerHeight / 2, behavior: "instant" });
    }, index);
    await expect(page.locator('#process')).toHaveAttribute("data-as-stage", String(index));
    transforms.push(await page.locator('[data-as-method-piece="0"]').evaluate(node => getComputedStyle(node).transform));
    expect((await page.locator('.as-process-visual').boundingBox())!.y).toBeGreaterThan(80);
  }
  expect(transforms[0]).not.toBe(transforms[1]); expect(transforms[1]).not.toBe(transforms[2]);
  const numbers = (value: string) => value.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  numbers(transforms[0]).forEach((value, index) => expect(Math.abs(value - numbers(transforms[3])[index])).toBeLessThan(1));
});

test("reduced motion keeps the scene controllable and avoids pinning", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/assemblage");
  const hero = page.locator('.as-studio--hero'); await ready(hero);
  await hero.getByRole("button", { name: /Unpack/ }).click();
  await expect.poll(() => position(hero, "ink")).toBeLessThan(-1);
  await expect(page.locator('#process')).not.toHaveAttribute("data-as-process-live");
  await expect(page.locator('.as-hero')).toHaveCSS("position", "relative");
  expect(await page.locator('[data-as-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === "1"))).toBe(true);
});

test("no WebGL and no JavaScript both retain authored artwork and readable content", async ({ browser }) => {
  const context = await browser.newContext(); const page = await context.newPage();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/assemblage");
  await expect(page.locator('.as-studio--hero')).toHaveAttribute("data-as-scene-fallback", "true");
  await expect(page.locator('.as-studio--hero .as-studio-fallback')).toHaveCSS("opacity", "1");
  await page.locator('.as-studio--hero').getByRole('button', { name: /Unpack/ }).click();
  await expect(page.locator('.as-studio--hero')).toHaveAttribute("data-mode", "unpack");
  await context.close();
  const noScript = await browser.newContext({ javaScriptEnabled: false }); const staticPage = await noScript.newPage();
  await staticPage.goto('/assemblage'); await expect(staticPage.locator('h1')).toBeVisible();
  await staticPage.locator('.as-faq summary').first().click(); await expect(staticPage.locator('.as-faq-answer').first()).toBeVisible();
  expect(await staticPage.locator('[data-as-reveal]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === "1"))).toBe(true);
  await noScript.close();
});

test.describe("touch", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test("taps the controls without capturing native vertical scrolling", async ({ page, context }) => {
    await page.goto('/assemblage');
    const hero = page.locator('.as-studio--hero'); await hero.scrollIntoViewIfNeeded(); await ready(hero);
    await hero.getByRole('button', { name: /Unpack/ }).tap(); await expect(hero).toHaveAttribute('data-mode', 'unpack');
    await hero.getByRole('button', { name: 'Ink', exact: true }).tap(); await expect(hero).toHaveAttribute('data-selected', 'ink');
    await hero.locator('canvas').scrollIntoViewIfNeeded();
    const bounds = (await hero.locator('.as-studio-surface').boundingBox())!;
    const x = bounds.x + bounds.width / 2, y = Math.min(650, bounds.y + bounds.height * .65);
    const start = await page.evaluate(() => scrollY);
    const client = await context.newCDPSession(page);
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let i = 1; i <= 8; i++) await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - i * 24 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(start + 40);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    await expect(page.locator('.as-hero')).toHaveCSS('position', 'relative');
  });
});
