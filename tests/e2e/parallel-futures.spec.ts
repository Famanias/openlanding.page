import { expect, test } from '@playwright/test';

// This SVG comparison must remain usable even when WebGL is unavailable.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (args[0] === 'webgl' || args[0] === 'webgl2') return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto('/parallel');
  await page.getByTestId('futures-synchronized-timeline').scrollIntoViewIfNeeded();
});

test('synchronizes both cities, isolates interventions and supports paired inspection', async ({ page }) => {
  const section = page.getByTestId('section-parallel-futures');
  await expect(section.getByRole('img', { name: /2.5D isometric city simulation/ })).toHaveCount(2);
  await expect(section.locator('canvas')).toHaveCount(0);
  await expect(page.getByTestId('futures-clock-display')).toContainText('08:45');
  const baseline = page.getByTestId('baseline-metric-delay');
  const alternative = page.getByTestId('alternative-metric-delay');
  const beforeBaseline = await baseline.innerText();
  const beforeAlternative = await alternative.innerText();
  await page.getByTestId('futures-intervention-increase_transit').click();
  await expect(alternative).not.toHaveText(beforeAlternative);
  await expect(baseline).toHaveText(beforeBaseline);
  await page.getByTestId('futures-checkpoint-430').click();
  await expect(page.getByTestId('futures-clock-display')).toContainText('07:10');
  await expect(alternative).toHaveText(await baseline.innerText());
  await page.getByTestId('futures-checkpoint-525').click();
  await page.getByTestId('inspect-entity-FINANCIAL_CBD').click();
  await expect(page.getByTestId('futures-paired-inspector').locator('h4')).toContainText(/Financial/i);
  await expect(page.getByTestId('futures-synthetic-disclosure')).toContainText('Synthetic data');
});

test('supports split, focus, replay, reset and hidden-page playback pause', async ({ page }) => {
  const toggle = page.getByTestId('futures-split-toggle');
  await toggle.click();
  await expect(toggle).toHaveText('Split Futures');
  await page.getByTestId('futures-zoom-toggle').click();
  await expect(page.getByTestId('futures-zoom-toggle')).toContainText('Zoom: Crossings');
  await page.getByTestId('futures-replay-split').click();
  await expect(toggle).toHaveText('Merge View');
  await expect(page.getByTestId('futures-clock-display')).toContainText('08:45');
  await page.getByTestId('futures-reset-view').click();
  await expect(page.getByTestId('futures-zoom-toggle')).toHaveText('Focus Crossings');
  const clock = page.getByTestId('futures-clock-display');
  await page.getByTestId('futures-timeline-play').click();
  await expect(clock).not.toHaveText('08:45');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(250);
  const paused = await clock.innerText();
  await page.waitForTimeout(500);
  await expect(clock).toHaveText(paused);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(clock).not.toHaveText(paused);
});

test('offers mobile Future A/B views without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const section = page.getByTestId('section-parallel-futures');
  await section.getByRole('button', { name: 'Future B', exact: true }).click();
  await expect(page.getByTestId('parallel-future-baseline')).toBeHidden();
  await expect(page.getByTestId('parallel-future-alternative')).toBeVisible();
  await section.getByRole('button', { name: 'Future A', exact: true }).click();
  await expect(page.getByTestId('parallel-future-baseline')).toBeVisible();
  await expect(page.getByTestId('parallel-future-alternative')).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('replays the split with motion and pauses it while the page is hidden', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByTestId('futures-replay-split').click();
  const clock = page.getByTestId('futures-clock-display');
  await expect(clock).not.toHaveText('08:45');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  const paused = await clock.innerText();
  await page.waitForTimeout(400);
  await expect(clock).toHaveText(paused);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(clock).toHaveText('08:45', { timeout: 6000 });
  await expect(page.getByTestId('futures-split-toggle')).toHaveText('Merge View');
});
