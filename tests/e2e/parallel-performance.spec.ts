import { expect, test } from '@playwright/test';

declare global {
  interface Window {
    parallelContextRequests: WebGLContextAttributes[];
  }
}

// Exercise WebGL lifecycle without putting load on the host GPU.
test.use({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
  launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu'] },
});

test('keeps workflow context stable and uses a bounded, low-power drawing buffer', async ({ page }) => {
  test.setTimeout(90_000);
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const contexts = new WeakSet<object>();
    const requests: WebGLContextAttributes[] = [];
    Object.assign(window, { parallelContextRequests: requests });
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      const context = original.apply(this, args);
      if ((args[0] === 'webgl2' || args[0] === 'webgl') && context && !contexts.has(context)) {
        contexts.add(context);
        requests.push((args[1] ?? {}) as WebGLContextAttributes);
      }
      return context;
    } as typeof original;
  });
  await page.goto('/parallel');
  // Wait for hydration before scrolling; Lenis initializes from the current viewport.
  await expect(page.getByTestId('parallel-webgl-canvas')).toBeVisible();
  const workflow = page.getByTestId('workflow-3d-viewport');
  await workflow.scrollIntoViewIfNeeded();
  await expect(workflow.locator('canvas')).toBeVisible();
  await page.waitForTimeout(2_000);
  const requests = () => page.evaluate(() => window.parallelContextRequests);
  const before = (await requests()).length;
  await page.waitForTimeout(1_500);
  expect((await requests()).length, 'projection updates must not recreate the scene').toBe(before);
  const options = await requests();
  const renderers = options.filter((entry) => entry.powerPreference);
  expect(renderers.length).toBeGreaterThanOrEqual(2);
  expect(renderers.every((entry) => entry.powerPreference === 'low-power')).toBe(true);
  expect(renderers.every((entry) => !entry.antialias && !entry.preserveDrawingBuffer)).toBe(true);
  for (const canvas of await page.locator('canvas').all()) {
    const pixels = await canvas.evaluate((element: HTMLCanvasElement) => element.width * element.height);
    expect(pixels).toBeLessThanOrEqual(1_000_000);
  }
});
