import { test, expect as baseExpect } from '@playwright/test';

test.setTimeout(60000);
const expect = baseExpect.configure({ timeout: 15000 });

test.describe('SAVEPOINT milestones 1–6', () => {
  test('all ten cartridges navigate, wrap and round-trip without leaked canvases', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/savepoint');
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
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
      if (index === 0) {
        await page.keyboard.press('Shift+Tab');
        await expect(page.getByRole('dialog').getByRole('button', { name: /^NEXT CARTRIDGE/ })).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.getByRole('button', { name: 'BACK TO ARCHIVE' })).toBeFocused();
      }
      if (index === 2) await page.keyboard.press('Escape');
      else await page.getByRole('button', { name: 'BACK TO ARCHIVE' }).click();
      await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
      await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeFocused();
      await expect(page.locator('.archive-canvas')).toHaveCount(1);
      await page.keyboard.press('ArrowRight');
    }
    expect(errors).toEqual([]);
  });

  test('drag snaps without booting and Escape can cancel an unfinished intro', async ({ page }) => {
    await page.goto('/savepoint');
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    const canvas = await page.locator('.archive-canvas').boundingBox();
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
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
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
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    const supported = await page.locator('.archive-canvas').evaluate(element => {
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
    await expect(page).toHaveURL(/game=mossheart/);
    await page.goBack();
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await page.goForward();
    await expect(page.locator('#world-title')).toHaveText('Mossheart');
    await page.getByRole('button', { name: 'BACK TO ARCHIVE' }).click();
    await page.locator('.archive-canvas').evaluate(element => (element as HTMLCanvasElement & { restoreSavepointContext: () => void }).restoreSavepointContext());
    await expect(page.locator('.motion-fallback')).toHaveCount(0);
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    await expect(page.locator('.archive-canvas')).toHaveCount(1);
  });

  test('catalog filters preserve matching artwork and select the requested shelf cartridge', async ({ page }) => {
    await page.goto('/savepoint');
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'INDEX', exact: true }).click();
    await expect(page.locator('.catalog-entry')).toHaveCount(10);
    const expectations = [
      ['EXPLORATION', ['lost-signal', 'mossheart', 'deep-current']],
      ['MYSTERY & HORROR', ['dead-channel', 'ghost-frequency']],
      ['ACTION & ARCADE', ['turbo-saints', 'neon-ruins', 'sunken-arcade']],
      ['STRATEGY & FANTASY', ['mossheart', 'moon-relay', 'paper-kingdom']],
    ] as const;
    for (const [filter, ids] of expectations) {
      await page.getByRole('button', { name: filter, exact: true }).click();
      await expect(page.locator('.catalog-entry')).toHaveCount(ids.length);
      for (const id of ids) {
        const entry = page.locator(`[data-game="${id}"]`);
        await expect(entry.locator('.catalog-world')).toHaveAttribute('src', `/templates/savepoint/world-${id}.webp`);
        await expect(entry.locator('.catalog-label')).toHaveAttribute('src', `/templates/savepoint/label-${id}.png`);
      }
    }
    await page.getByRole('button', { name: 'Select Paper Kingdom on shelf' }).click();
    await expect(page.locator('.caption h2')).toHaveText('Paper Kingdom');
    await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeFocused();
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(3);
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
  });

  test('catalog boot runs the physical sequence and returns to the selected world', async ({ page }) => {
    const phases: string[] = [];
    await page.exposeFunction('recordSavepointPhase', (phase: string) => phases.push(phase));
    await page.goto('/savepoint');
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    await page.evaluate(() => {
      const main = document.querySelector('main')!;
      new MutationObserver(() => {
        void (window as unknown as { recordSavepointPhase: (phase: string) => Promise<void> }).recordSavepointPhase(main.getAttribute('data-phase')!);
      }).observe(main, { attributes: true, attributeFilter: ['data-phase'] });
    });
    await page.getByRole('button', { name: 'Insert and boot Ghost Frequency', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#world-title')).toHaveText('Ghost Frequency');
    for (const phase of ['extracting', 'console-entering', 'aligning', 'inserting', 'booting', 'screen-expanding', 'game-detail']) expect(phases).toContain(phase);
    await expect(page.locator('.editorial-content')).toHaveAttribute('inert', '');
    await page.keyboard.press('Escape');
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await expect(page.locator('.caption h2')).toHaveText('Ghost Frequency');
    await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeFocused();
  });

  test('hardware presets, wireframe, manifesto and footer are functional', async ({ page }) => {
    await page.goto('/savepoint');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'THE DECK', exact: true }).click();
    const canvas = page.locator('.inspection-canvas');
    await expect(canvas).toHaveAttribute('data-scene-ready', 'true');
    await page.getByRole('button', { name: /TOP-LOADING SLOT CAVITY/ }).click();
    await expect(canvas).toHaveAttribute('data-angle', '1');
    await expect(page.locator('.inspection-copy')).toContainText('recessed guides');
    await page.getByRole('button', { name: /WIREFRAME/ }).click();
    await expect(canvas).toHaveAttribute('data-wireframe', 'true');
    await page.getByRole('button', { name: /VENTED POLYMER CHASSIS/ }).click();
    await expect(canvas).toHaveAttribute('data-angle', '3');
    await page.getByRole('contentinfo').getByRole('link', { name: 'MANIFEST', exact: true }).click();
    await expect(page.locator('#manifest-title')).toBeInViewport();
    await page.getByRole('button', { name: 'RETURN TO THE CARTRIDGES' }).click();
    await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeFocused();
    await expect(canvas).toHaveAttribute('data-rendering', 'false');
    await expect(page.locator('.inspection-canvas')).toHaveCount(1);
  });

  test('all five viewport sizes show complete sections without overflow or missing media', async ({ page }) => {
    const errors: string[] = [], missing: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) missing.push(`${response.status()} ${response.url()}`); });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/savepoint');
    for (const [width, height] of [[1920, 1080], [1366, 768], [1024, 768], [768, 1024], [390, 844]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeInViewport();
      for (const selector of ['#the-deck', '#manifest', '#index', '.site-footer']) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${selector}`).toBe(true);
      }
    }
    for (const entry of await page.locator('.catalog-entry').all()) await entry.scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('.catalog-world').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    expect(errors).toEqual([]);
    expect(missing).toEqual([]);
  });

  test('touch and reduced motion support catalog boot without a custom cursor', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/savepoint');
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    await page.getByRole('button', { name: 'Insert and boot Deep Current', exact: true }).tap();
    await expect(page.locator('#world-title')).toHaveText('Deep Current');
    await expect(page.locator('.custom-cursor')).toBeHidden();
    await page.getByRole('button', { name: 'BACK TO ARCHIVE' }).tap();
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await context.close();
  });

  test('a native horizontal touch swipe browses and releases without booting', async ({ browser, baseURL }) => {
    // Keep raw CDP gestures isolated: Edge suppresses later compatibility clicks even on a minimal page.
    const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/savepoint');
    await expect(page.locator('.archive-canvas')).toHaveAttribute('data-scene-ready', 'true');
    const bounds = await page.locator('.archive-canvas').boundingBox();
    if (!bounds) throw new Error('Touch archive canvas has no bounds');
    const session = await context.newCDPSession(page);
    const x = bounds.x + bounds.width / 2 + 70, y = bounds.y + bounds.height / 2;
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let index = 1; index <= 8; index++) await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - index * 20, y }] });
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect(page.locator('.caption h2')).not.toHaveText('Lost Signal');
    await expect(page.locator('main')).toHaveAttribute('data-phase', 'archive');
    await expect(page.getByRole('button', { name: 'BOOT THIS GAME' })).toBeEnabled();
    await expect(page.locator('.custom-cursor')).toBeHidden();
    await context.close();
  });

  test('all ten detail worlds contain their own lore, telemetry and approved world plate', async ({ page }) => {
    await page.goto('/savepoint?game=lost-signal');
    const ids = ['lost-signal', 'mossheart', 'turbo-saints', 'dead-channel', 'moon-relay', 'neon-ruins', 'paper-kingdom', 'deep-current', 'ghost-frequency', 'sunken-arcade'];
    const descriptions = new Set<string>();
    for (const id of ids) {
      await expect(page).toHaveURL(new RegExp(`game=${id}`));
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.locator('.world-plate')).toHaveCSS('background-image', new RegExp(`world-${id}\\.webp`));
      await expect(page.locator('.world-notes p')).toHaveCount(2);
      const text = await page.locator('.description').innerText();
      expect(text.length).toBeGreaterThan(100);
      descriptions.add(text);
      await expect(page.locator('.archive-data')).toContainText('ROM');
      await page.getByRole('dialog').getByRole('button', { name: /^NEXT CARTRIDGE/ }).click();
    }
    expect(descriptions.size).toBe(10);
  });
});
