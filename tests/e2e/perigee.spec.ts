import { expect, test, type Page } from '@playwright/test';

test.use({
  launchOptions: {
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  },
});

async function openPerigeeExperience(page: Page) {
  await page.goto('/perigee');
  await expect(page.locator('html')).toHaveAttribute(
    'data-perigee-mode',
    'experience',
    { timeout: 30_000 },
  );
  await expect(page.locator("[data-testid='black-hole-canvas']")).toHaveCount(1);
}

test.describe('PERIGEE 3D experience (motion enabled)', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the page loads and the black hole canvas mounts with telemetry bar', async ({
    page,
  }) => {
    await openPerigeeExperience(page);

    const fallbackRoot = page.locator('#perigee-fallback-root');
    await expect(fallbackRoot).toBeAttached();

    const canvas = page.locator("[data-testid='black-hole-canvas']");
    await expect(canvas).toBeVisible();

    // Initial Chapter 01 UI is visible
    await expect(page.getByTestId('chapter-marker')).toHaveText(/01 — The Shadow/);
    await expect(page.getByTestId('telemetry-readout')).toContainText('r = 38.00 Rs');
    await expect(page.getByTestId('upper-center-narrative-header')).toBeVisible();
  });

  test('chapter stepper buttons navigate cleanly to chapters', async ({ page }) => {
    await openPerigeeExperience(page);

    // Click Chapter 04 (The Photon Sphere)
    const ch4Btn = page.getByRole('button', { name: 'Chapter 04: The Photon Sphere' });
    await expect(ch4Btn).toBeVisible();
    await ch4Btn.click();

    await expect(page.getByTestId('chapter-marker')).toContainText('04 — The Photon Sphere');

    // Click Chapter 06 (Polar Escape)
    const ch6Btn = page.getByRole('button', { name: 'Chapter 06: Polar Escape' });
    await expect(ch6Btn).toBeVisible();
    await ch6Btn.click();

    await expect(page.getByTestId('chapter-marker')).toContainText('06 — Polar Escape');
    await expect(page.getByTestId('observation-console')).toBeVisible();
  });

  test('audio toggle button is accessible and updates aria-pressed', async ({ page }) => {
    await openPerigeeExperience(page);

    const audioBtn = page.getByRole('button', { name: /telemetry audio/i });
    await expect(audioBtn).toBeVisible();
    await expect(audioBtn).toHaveAttribute('aria-pressed', 'false');

    await audioBtn.click();
    await expect(audioBtn).toHaveAttribute('aria-pressed', 'true');

    await audioBtn.click();
    await expect(audioBtn).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('PERIGEE static fallback (reduced motion)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('renders static fallback telemetry log under reduced motion', async ({ page }) => {
    await page.goto('/perigee');

    const fallbackRoot = page.locator('#perigee-fallback-root');
    await expect(fallbackRoot).toBeVisible();

    await expect(page.locator('h1')).toContainText('At the edge of curved spacetime');
    await expect(page.getByText('INBOUND GEODESIC LOGBOOK')).toBeVisible();
    await expect(page.getByText('PRIMARY RELATIVISTIC BOUNDARIES & SIGNATURES')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Request Observation Window' })).toBeVisible();
  });
});
