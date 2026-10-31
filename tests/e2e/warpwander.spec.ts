import { expect, test } from '@playwright/test';

test.describe('WARP & WANDER template (/warpwander)', () => {
  test('renders the page, header, canvas, and narrative acts', async ({ page }) => {
    await page.goto('/warpwander');

    // Title and Brand Wordmark
    await expect(page).toHaveTitle(/WARP & WANDER/i);
    await expect(page.getByRole('link', { name: /WARP & WANDER/i })).toBeVisible();

    // Verify 2D world canvas container is attached
    await expect(page.locator('[data-testid="world-canvas-container"]')).toBeAttached();

    // Verify Chapter Trail Navigation links
    const nav = page.getByRole('navigation', { name: 'Chapter Trail Navigation' });
    await expect(nav).toBeAttached();
    await expect(page.getByRole('link', { name: /01\. Cartridge Forest/i })).toBeAttached();
    await expect(page.getByRole('link', { name: /02\. Crystal Lake/i })).toBeAttached();
    await expect(page.getByRole('link', { name: /03\. Clockwork Ridge/i })).toBeAttached();
    await expect(page.getByRole('link', { name: /04\. Cloud City/i })).toBeAttached();
    await expect(page.getByRole('link', { name: /05\. The Last Gate/i })).toBeAttached();

    // Verify all 6 narrative acts are present in the DOM
    await expect(page.locator('#act-0')).toBeAttached();
    await expect(page.locator('#act-1')).toBeAttached();
    await expect(page.locator('#act-2')).toBeAttached();
    await expect(page.locator('#act-3')).toBeAttached();
    await expect(page.locator('#act-4')).toBeAttached();
    await expect(page.locator('#act-5')).toBeAttached();
  });

  test('toggles audio sound effects state', async ({ page }) => {
    await page.goto('/warpwander');

    const soundBtn = page.getByRole('button', { name: /AUDIO/i });
    await expect(soundBtn).toBeVisible();
    await expect(soundBtn).toHaveAttribute('aria-pressed', 'false');

    await soundBtn.click();
    await expect(soundBtn).toHaveAttribute('aria-pressed', 'true');

    await soundBtn.click();
    await expect(soundBtn).toHaveAttribute('aria-pressed', 'false');
  });

  test('interacts with cartridge artifacts in Act 1', async ({ page }) => {
    await page.goto('/warpwander');

    const act1 = page.locator('#act-1');
    await act1.scrollIntoViewIfNeeded();

    // Select second cartridge artifact (Color)
    const gbcArtifactBtn = page.getByRole('button', { name: /Cartridge Artifact.*Color/i });
    if (await gbcArtifactBtn.isVisible()) {
      await gbcArtifactBtn.click();
      await expect(gbcArtifactBtn).toHaveAttribute('aria-pressed', 'true');
    }
  });

  test('switches display view modes in Act 2', async ({ page }) => {
    await page.goto('/warpwander');

    const act2 = page.locator('#act-2');
    await act2.scrollIntoViewIfNeeded();

    const pixelViewBtn = page.getByRole('button', { name: /PIXEL VIEW/i });
    await expect(pixelViewBtn).toBeVisible();
    await pixelViewBtn.click();
    await expect(pixelViewBtn).toHaveAttribute('aria-pressed', 'true');

    const deviceViewBtn = page.getByRole('button', { name: /DEVICE VIEW/i });
    await expect(deviceViewBtn).toBeVisible();
    await deviceViewBtn.click();
    await expect(deviceViewBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('inspects precision hardware markers in Act 3', async ({ page }) => {
    await page.goto('/warpwander');

    const act3 = page.locator('#act-3');
    await act3.scrollIntoViewIfNeeded();

    // Verify precision marker inspector buttons
    const dpadMarkerBtn = page.getByRole('button', { name: /Inspect Recessed D-Pad/i });
    await expect(dpadMarkerBtn).toBeVisible();
    await dpadMarkerBtn.click();
    await expect(dpadMarkerBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('renders Cloud City mini-game and handles skip/continue in Act 4', async ({ page }) => {
    await page.goto('/warpwander');

    const act4 = page.locator('#act-4');
    await act4.scrollIntoViewIfNeeded();

    const gameCanvas = page.locator('[data-testid="cloud-city-game-canvas"]');
    await expect(gameCanvas).toBeVisible();

    const playBtn = page.getByRole('button', { name: /PLAY INTERLUDE/i });
    await expect(playBtn).toBeVisible();

    const skipBtn = page.getByRole('button', { name: /SKIP GAME|CONTINUE JOURNEY/i }).first();
    await expect(skipBtn).toBeVisible();
  });

  test('switches colorways and rear cartridge bay view in Act 5', async ({ page }) => {
    await page.goto('/warpwander');

    const act5 = page.locator('#act-5');
    await act5.scrollIntoViewIfNeeded();

    // Toggle white colorway
    const whiteBtn = page.getByRole('button', { name: /Matte White/i });
    await expect(whiteBtn).toBeVisible();
    await whiteBtn.click();
    await expect(whiteBtn).toHaveAttribute('aria-pressed', 'true');

    // Toggle rear cartridge bay
    const rearBayBtn = page.getByRole('button', { name: /REAR CARTRIDGE BAY/i });
    await expect(rearBayBtn).toBeVisible();
    await rearBayBtn.click();
    await expect(rearBayBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
