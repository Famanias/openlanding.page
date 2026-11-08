import { expect, test } from '@playwright/test';

for (const mode of ['reduced motion', 'without JavaScript'] as const) {
  test.describe(`3D template mobile layout ${mode}`, () => {
    test.use({
      viewport: { width: 390, height: 844 },
      javaScriptEnabled: mode !== 'without JavaScript',
      reducedMotion: mode === 'reduced motion' ? 'reduce' : 'no-preference',
    });

    test('SYNAPXE keeps header controls and fabric telemetry inside the viewport', async ({ page }) => {
      await page.goto('/synapxe');

      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewportWidth);

      for (const control of [
        page.getByRole('group', { name: 'Currency Selector' }),
        page.getByRole('button', { name: /LOADOUT BAG/ }),
        page.getByTestId('fabric-weather-telemetry'),
      ]) {
        const box = await control.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewportWidth);
      }
    });

    test('PERIGEE restores a wrapping, normal-flow fallback', async ({ page }) => {
      await page.goto('/perigee');
      const fallback = page.locator('#perigee-fallback-root');
      await expect(fallback).toBeVisible();
      await expect(fallback).toHaveCSS('position', 'static');
      await expect(fallback).toHaveCSS('white-space', 'normal');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
      await expect(fallback.getByRole('heading', { name: 'Request Observation Window' })).toBeVisible();
    });
  });
}
