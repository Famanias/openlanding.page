import { test, expect } from '@playwright/test';

test.describe('SAVEPOINT milestones 1–4', () => {
  test('all ten cartridges navigate, wrap and round-trip without leaked canvases', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/savepoint');
    await expect(page.locator('canvas')).toHaveAttribute('data-scene-ready', 'true');
    const titles = ['Lost Signal', 'Mossheart', 'Turbo Saints', 'Dead Channel', 'Moon Relay', 'Neon Ruins', 'Paper Kingdom', 'Deep Current', 'Ghost Frequency', 'Sunken Arcade'];
    for (const title of titles) {
      await expect(page.locator('.caption h2')).toHaveText(title);
      await page.getByRole('button', { name: 'Next cartridge', exact: true }).click();
    }
    await expect(page.locator('.caption h2')).toHaveText('Lost Signal');
    for (let index = 0; index < 3; index++) {
      await page.getByRole('button', { name: 'BOOT THIS GAME' }).click();
      if (index === 1) await page.getByRole('button', { name: 'SKIP INTRO' }).click();
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(/game=/);
      if (index === 2) await page.keyboard.press('Escape');
      else await page.getByRole('button', { name: 'BACK TO ARCHIVE' }).click();
      await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
      await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeFocused();
      await expect(page.locator('canvas')).toHaveCount(1);
      await page.keyboard.press('ArrowRight');
    }
    expect(errors).toEqual([]);
  });

  test('drag snaps without booting and Escape can cancel an unfinished intro', async ({ page }) => {
    await page.goto('/savepoint');
    await expect(page.locator('canvas')).toHaveAttribute('data-scene-ready', 'true');
    const canvas = await page.locator('canvas').boundingBox();
    if (!canvas) throw new Error('Archive canvas has no bounds');
    await page.mouse.move(canvas.x + canvas.width / 2, canvas.y + canvas.height / 2);
    await page.mouse.down();
    await page.mouse.move(canvas.x + canvas.width / 2 - 180, canvas.y + canvas.height / 2, { steps: 12 });
    await page.mouse.up();
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await expect(page.locator('.caption h2')).not.toHaveText('Lost Signal');
    await page.getByRole('button', { name: 'BOOT THIS GAME' }).click();
    await page.keyboard.press('Escape');
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeEnabled();
  });

  test('deep links and browser history restore the corresponding world', async ({ page }) => {
    await page.goto('/savepoint?game=moon-relay');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('#world-title')).toHaveText('Moon Relay');
    await page.getByRole('dialog').getByRole('button', { name: /^NEXT CARTRIDGE/ }).click();
    await expect(page.locator('#world-title')).toHaveText('Neon Ruins');
    await page.goBack();
    await expect(page.locator('#world-title')).toHaveText('Moon Relay');
    await page.goForward();
    await expect(page.locator('#world-title')).toHaveText('Neon Ruins');
    await page.getByRole('button', { name: 'BACK TO ARCHIVE' }).click();
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await expect(page.locator('.caption h2')).toHaveText('Neon Ruins');
  });

  test('mobile reduced motion keeps controls visible and supports immediate boot', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/savepoint');
    await expect(page.locator('canvas')).toHaveAttribute('data-scene-ready', 'true');
    await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.caption h2')).toHaveText('Sunken Arcade');
    await page.getByRole('button', { name: 'BOOT THIS GAME' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
  });

  test('context loss keeps the image archive usable and restoration recreates one scene', async ({ page }) => {
    await page.goto('/savepoint');
    await expect(page.locator('canvas')).toHaveAttribute('data-scene-ready', 'true');
    const supported = await page.locator('canvas').evaluate(element => {
      const canvas = element as HTMLCanvasElement & { restoreSavepointContext?: () => void };
      const extension = canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context');
      if (!extension) return false;
      canvas.restoreSavepointContext = () => extension.restoreContext();
      extension.loseContext();
      return true;
    });
    test.skip(!supported, 'Browser does not provide the WebGL context-loss test extension');
    await expect(page.locator('.motion-fallback')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.caption h2')).toHaveText('Mossheart');
    await page.getByRole('button', { name: 'BOOT THIS GAME' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'BACK TO ARCHIVE' }).click();
    await page.locator('canvas').evaluate(element => (element as HTMLCanvasElement & { restoreSavepointContext: () => void }).restoreSavepointContext());
    await expect(page.locator('.motion-fallback')).toHaveCount(0);
    await expect(page.locator('canvas')).toHaveAttribute('data-scene-ready', 'true');
    await expect(page.locator('canvas')).toHaveCount(1);
  });
});
