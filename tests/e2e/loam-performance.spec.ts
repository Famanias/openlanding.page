import { expect, test } from '@playwright/test';

test.use({
  viewport: { width: 800, height: 600 },
  deviceScaleFactor: 2,
  launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu'] },
});

declare global {
  interface Window {
    loamGPU: { hold: boolean; draws: number; fences: number };
    __LOAM_TEST__: { setProgress: (progress: number) => void };
  }
}

test('keeps scroll UI responsive under GPU backpressure and stops drawing while hidden', async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    window.loamGPU = { hold: false, draws: 0, fences: 0 };
    const wait = WebGL2RenderingContext.prototype.clientWaitSync;
    WebGL2RenderingContext.prototype.clientWaitSync = function (...args) {
      return window.loamGPU.hold ? this.TIMEOUT_EXPIRED : wait.apply(this, args);
    };
    const fence = WebGL2RenderingContext.prototype.fenceSync;
    WebGL2RenderingContext.prototype.fenceSync = function (...args) {
      window.loamGPU.fences++;
      return fence.apply(this, args);
    };
    for (const key of ['drawArrays', 'drawElements', 'drawArraysInstanced', 'drawElementsInstanced'] as const) {
      const draw = WebGL2RenderingContext.prototype[key];
      Object.defineProperty(WebGL2RenderingContext.prototype, key, { configurable: true, value: function (this: WebGL2RenderingContext, ...args: number[]) {
        window.loamGPU.draws++;
        return Reflect.apply(draw, this, args);
      } });
    }
  });
  await page.goto('/loam');
  await page.waitForFunction(() => window.__LOAM_TEST__ && window.loamGPU.fences > 0);
  const canvas = page.locator('[data-testid="loam-webgl-canvas"] canvas');
  expect(await canvas.evaluate((element: HTMLCanvasElement) => element.width * element.height)).toBeLessThanOrEqual(1_000_000);
  await page.evaluate(() => { window.loamGPU.hold = true; window.__LOAM_TEST__.setProgress(0.83); });
  await expect(page.getByTestId('chapter-marker')).toContainText('The material');
  const held = await page.evaluate(() => window.loamGPU.draws);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.loamGPU.draws)).toBe(held);
  await page.evaluate(() => { window.loamGPU.hold = false; });
  await expect.poll(() => page.evaluate(() => window.loamGPU.draws)).toBeGreaterThan(held);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const hidden = await page.evaluate(() => window.loamGPU.draws);
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => window.loamGPU.draws)).toBe(hidden);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(() => page.evaluate(() => window.loamGPU.draws)).toBeGreaterThan(hidden);
});
