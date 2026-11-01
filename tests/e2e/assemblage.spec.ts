import { test, expect, type Locator } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 }, launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] } });
const ready = async (studio: Locator) => {
  await expect(studio).toHaveAttribute("data-as-scene-ready", "true", { timeout: 20_000 });
  await expect(studio).toHaveAttribute("data-as-scene-settled", "true", { timeout: 20_000 });
};
const separated = (studio: Locator) => studio.evaluate(node => {
  const bounds: { left: number; right: number; top: number; bottom: number; opacity: number }[] = JSON.parse((node as HTMLElement).dataset.asMaterialBounds ?? "[]");
  const visible = bounds.filter(bound => bound.opacity > .1);
  return visible.length >= 2 && visible.every((a, index) => visible.slice(index + 1).every(b => a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top));
});

test("clockwise drift never stops and slows during and after manual interaction", async ({ page }) => {
  await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero'); await ready(hero);
  await expect(hero).toHaveAttribute('data-as-autoplay', 'clockwise');
  const initial = Number(await hero.getAttribute('data-as-carousel-position'));
  await page.waitForTimeout(1200);
  const cruising = Number(await hero.getAttribute('data-as-carousel-position'));
  expect(cruising).toBeLessThan(initial - .06);
  await expect(hero).toHaveAttribute('data-as-carousel-index', '3', { timeout: 7000 });
  await expect(hero).toHaveAttribute('data-selected', 'signal');
  expect(Number(await hero.getAttribute('data-as-carousel-position'))).toBeLessThan(-.5);
  const bounds = (await hero.locator('.as-studio-surface').boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2); await page.mouse.down();
  await page.waitForTimeout(900);
  const slowSpeed = Number(await hero.getAttribute('data-as-drift-speed'));
  expect(slowSpeed).toBeLessThan(0); expect(Math.abs(slowSpeed)).toBeLessThan(.12);
  const held = Number(await hero.getAttribute('data-as-carousel-position'));
  await page.waitForTimeout(700);
  expect(Number(await hero.getAttribute('data-as-carousel-position'))).toBeLessThan(held - .005);
  await page.mouse.up(); await ready(hero);
  const released = Number(await hero.getAttribute('data-as-carousel-position'));
  await page.waitForTimeout(900);
  expect(Number(await hero.getAttribute('data-as-carousel-position'))).toBeLessThan(released - .008);
  expect(Math.abs(Number(await hero.getAttribute('data-as-drift-speed')))).toBeLessThan(.12);
});

test("gesture-only carousel keeps keyboard selection synchronized without bottom controls", async ({ page }) => {
  await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero'); await ready(hero);
  await hero.locator('.as-studio-surface').press('ArrowRight');
  await expect(hero).toHaveAttribute('data-selected', 'image'); await ready(hero);
  await expect(hero).toHaveAttribute('data-as-carousel-index', '1');
  await hero.locator('.as-studio-surface').press('ArrowLeft'); await ready(hero);
  await hero.locator('.as-studio-surface').press('ArrowLeft'); await ready(hero);
  await expect(hero).toHaveAttribute('data-selected', 'signal');
  await expect(hero).toHaveAttribute('data-as-carousel-index', '3');
  await expect(hero.getByRole('button')).toHaveCount(0);
  await expect(hero.locator('.as-studio-toolbar, .as-studio-instruction, .as-studio-swatches')).toHaveCount(0);
  const surface = hero.locator('.as-studio-surface'); await surface.focus();
  await page.keyboard.press('ArrowRight'); await ready(hero); await expect(hero).toHaveAttribute('data-selected', 'paper');
  await page.keyboard.press('End'); await ready(hero); await expect(hero).toHaveAttribute('data-selected', 'signal');
  await page.keyboard.press('Home'); await ready(hero); await expect(hero).toHaveAttribute('data-selected', 'paper');
  await hero.locator('.as-studio-surface').evaluate(node => { for (let index = 0; index < 3; index++) node.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); });
  await ready(hero); await expect(hero).toHaveAttribute('data-selected', 'signal');
});

test("dragging moves the carousel continuously and release snaps to a material", async ({ page }) => {
  await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero'); await ready(hero);
  const bounds = (await hero.locator('.as-studio-surface').boundingBox())!;
  const x = bounds.x + bounds.width / 2, y = bounds.y + bounds.height / 2;
  const before = Number(await hero.getAttribute('data-as-carousel-position'));
  await page.mouse.move(x, y); await page.mouse.down();
  for (let i = 1; i <= 8; i++) { await page.mouse.move(x - i * 34, y); await page.waitForTimeout(40); }
  await expect(hero).toHaveAttribute('data-as-dragging', 'true');
  const held = await hero.getAttribute('data-as-carousel-position'); expect(Number(held) - before).toBeGreaterThan(.5);
  await page.waitForTimeout(150); await page.mouse.up(); await ready(hero);
  const phase = Number(await hero.getAttribute('data-as-carousel-position'));
  const index = ((Math.round(phase) % 4) + 4) % 4;
  await expect(hero).toHaveAttribute('data-selected', ['paper', 'image', 'ink', 'signal'][index]);
  await expect(hero).toHaveAttribute('data-as-carousel-index', String(index));
  expect(Math.abs(phase - Math.round(phase))).toBeLessThan(.2);
  await expect.poll(() => separated(hero)).toBe(true);
});

test("visible sheets stay separate across all four centered materials", async ({ page }) => {
  await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero'); await ready(hero);
  for (let index = 0; index < 4; index++) {
    await expect.poll(() => separated(hero)).toBe(true);
    await hero.locator('.as-studio-surface').press('ArrowRight'); await ready(hero);
  }
});

test("the viewport-wide canvas retains full bleed and passes clicks through to the CTA", async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero'); await ready(hero);
  const surface = (await hero.locator('.as-studio-surface').boundingBox())!, canvas = (await hero.locator('canvas').boundingBox())!;
  expect(canvas.x).toBeCloseTo(0); expect(canvas.width).toBe(await page.evaluate(() => document.documentElement.clientWidth));
  expect(canvas.height).toBeGreaterThan(surface.height + 300); await expect(hero.locator('canvas')).toHaveCSS('pointer-events', 'none');
  await page.getByRole('link', { name: 'Request a material study', exact: true }).click(); await expect(page).toHaveURL(/#request$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0); expect(errors).toEqual([]);
});

test("workshop tabs, keyboard, spacing and lighting share the carousel selection", async ({ page }) => {
  await page.goto('/assemblage#materials'); const workshop = page.locator('.as-studio--workshop'); await ready(workshop);
  const tabs = page.getByRole('tab'); await tabs.first().focus(); await page.keyboard.press('ArrowDown'); await ready(workshop);
  await expect(workshop).toHaveAttribute('data-selected', 'ink'); await expect(workshop).toHaveAttribute('data-as-carousel-index', '2');
  const height = (await page.locator('.as-material-details').boundingBox())!.height;
  await workshop.locator('.as-studio-surface').press('ArrowRight'); await ready(workshop);
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true'); await expect(page.getByRole('tabpanel')).toContainText('One sharp colour');
  expect((await page.locator('.as-material-details').boundingBox())!.height).toBe(height);
  const image = await workshop.locator('canvas').screenshot();
  await workshop.getByRole('slider', { name: /Space between/ }).focus(); await page.keyboard.press('End'); await ready(workshop);
  await expect(workshop.getByRole('slider', { name: /Space between/ })).toHaveValue('100');
  expect((await workshop.locator('canvas').screenshot()).equals(image)).toBe(false);
  const lit = await workshop.locator('canvas').screenshot();
  await workshop.getByRole('slider', { name: /Move the light/ }).focus(); await page.keyboard.press('End'); await ready(workshop);
  expect((await workshop.locator('canvas').screenshot()).equals(lit)).toBe(false);
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

test("reduced motion retains carousel navigation without spring animation or pinning", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/assemblage');
  const hero = page.locator('.as-studio--hero'); await ready(hero);
  await hero.locator('.as-studio-surface').press('ArrowRight'); await ready(hero);
  await expect(hero).toHaveAttribute('data-as-carousel-position', '1.0000');
  await expect(page.locator('#process')).not.toHaveAttribute('data-as-process-live');
  await expect(page.locator('.as-hero')).toHaveCSS('position', 'relative');
});

test("no WebGL uses the native scroll-snap carousel and no JavaScript keeps every sheet", async ({ browser }) => {
  const context = await browser.newContext(); const page = await context.newPage();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes('webgl')) return null; return original.apply(this, args);
    } as typeof original;
  });
  await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero');
  await expect(hero).toHaveAttribute('data-as-scene-fallback', 'true');
  await hero.locator('.as-studio-surface').press('ArrowRight'); await expect(hero).toHaveAttribute('data-selected', 'image');
  await expect.poll(() => hero.locator('.as-studio-fallback').evaluate(node => Math.round(node.scrollLeft / node.clientWidth))).toBe(1);
  await context.close();
  const noScript = await browser.newContext({ javaScriptEnabled: false }); const staticPage = await noScript.newPage();
  await staticPage.goto('/assemblage'); await expect(staticPage.locator('h1')).toBeVisible();
  await expect(staticPage.locator('.as-studio--hero .as-studio-slide')).toHaveCount(4);
  await expect(staticPage.locator('.as-studio--hero .as-studio-fallback')).toHaveCSS('overflow-x', 'auto');
  await staticPage.locator('.as-faq summary').first().click(); await expect(staticPage.locator('.as-faq-answer').first()).toBeVisible();
  await noScript.close();
});

test.describe('touch', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  test('horizontal swipes select a sheet while vertical swipes scroll the page', async ({ page, context }) => {
    await page.goto('/assemblage'); const hero = page.locator('.as-studio--hero'); await hero.scrollIntoViewIfNeeded(); await ready(hero);
    const client = await context.newCDPSession(page);
    const swipe = async (horizontal: boolean) => {
      const bounds = (await hero.locator('.as-studio-surface').boundingBox())!;
      const x = horizontal ? 280 : 195, y = Math.min(620, bounds.y + bounds.height * .5);
      await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let i = 1; i <= 8; i++) {
        await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - (horizontal ? i * 23 : 0), y: y - (horizontal ? 0 : i * 23) }] });
        await page.waitForTimeout(25);
      }
      await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    await swipe(true); await ready(hero); await expect(hero).not.toHaveAttribute('data-selected', 'paper');
    await expect.poll(() => separated(hero)).toBe(true);
    const start = await page.evaluate(() => scrollY); await swipe(false);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(start + 40);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  });
});
