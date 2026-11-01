import { test, expect } from "@playwright/test";

declare global {
  interface Window { crCLS: number; }
}

test.describe("CTRL/ROOM template (/ctrlroom)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("renders hero, brand header, desktop OS, and hardware view", async ({ page }) => {
    await page.goto("/ctrlroom");

    // Title & Header Wordmark
    await expect(page).toHaveTitle(/CTRL\/ROOM/i);
    await expect(page.getByRole("link", { name: "CTRL/ROOM", exact: true })).toBeVisible();

    // Hero Heading
    await expect(page.getByRole("heading", { level: 1 })).toContainText("WELCOME TO YOUR CONTROL ROOM.");

    // Anchor Sections
    await expect(page.locator("#desktop-stage")).toBeAttached();
    await expect(page.locator("#section-deck-lab")).toBeAttached();
    await expect(page.locator("#section-action-library")).toBeAttached();
    await expect(page.locator("#section-profiles")).toBeAttached();
    await expect(page.locator("#section-device-info")).toBeAttached();
  });

  test("desktop stage has open default windows and interacts with deck keys", async ({ page }) => {
    await page.goto("/ctrlroom?autostart=1");

    const desktopStage = page.locator("#desktop-stage");
    await expect(desktopStage).toBeVisible();

    // Verify Deck Lab is open in the desktop stage
    await expect(page.locator('[data-cr-window="deck-lab"]').getByRole('heading', { name: 'DECK LAB — 15-KEY SIMULATOR' })).toBeVisible();

    // Click on Slot 01 in the Deck Lab
    const slot1Btn = page.locator('[data-cr-window="deck-lab"]').getByTestId('deck-slot-0');
    await expect(slot1Btn).toBeVisible();
    await slot1Btn.click();

    // Verify simulated status updates
    await expect(page.locator("body")).toContainText("SIMULATED");
  });
});

test.describe('CTRL/ROOM motion and interaction', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('boot hands off to masked text and hardware without layout shifts', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.crCLS = 0;
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!shift.hadRecentInput) window.crCLS += shift.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto('/ctrlroom');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-boot', 'ready');
    await expect(page.locator('.cr-boot')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('WELCOME TO YOUR CONTROL ROOM.');
    await expect(page.locator('.cr-hero-copy .cr-word-in').first()).toHaveCSS('animation-name', 'cr-word-arrive');
    await expect(page.locator('.cr-hero-hardware [aria-label^="Hardware preview key"]:visible')).toHaveCount(15);
    await expect.poll(() => page.evaluate(() => window.crCLS)).toBeLessThan(0.02);
    expect(errors).toEqual([]);
  });

  test('scroll drives hardware departure, section reveals and navigation progress', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-motion', 'live');
    await page.evaluate(() => window.scrollTo(0, 240));
    await expect.poll(() => page.locator('.cr-hero-hardware').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBeGreaterThan(0);
    const profiles = page.locator('#section-profiles');
    await profiles.scrollIntoViewIfNeeded();
    await expect(page.locator('.cr-header-nav a[href="#section-profiles"]')).toHaveAttribute('aria-current', 'location');
    await expect(profiles.locator('[data-cr-armed]')).toHaveCount(0);
    const progress = await page.locator('.cr-nav-progress').evaluate(el => getComputedStyle(el).transform);
    expect(progress).not.toBe('matrix(0, 0, 0, 1, 0, 0)');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(profiles.locator('[data-cr-armed]')).toHaveCount(0);
  });

  test('primary button follows a fine pointer and settles on leave', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-motion', 'live');
    const button = page.getByRole('button', { name: 'OPEN CTRL/ROOM OS', exact: true });
    await button.hover({ position: { x: 20, y: 14 } });
    await expect.poll(() => button.evaluate(el => (el as HTMLElement).style.translate)).not.toBe('');
    await page.mouse.move(4, 100);
    await expect.poll(() => button.evaluate(el => (el as HTMLElement).style.translate)).toBe('');
  });

  test('windows minimize, restore and close with the workspace still operational', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    const deck = page.locator('[data-cr-window="deck-lab"]');
    await deck.getByRole('button', { name: /^Minimize / }).click();
    await expect(deck).toHaveCount(0);
    await page.getByRole('button', { name: /DECK LAB \[MIN\]/ }).click();
    await expect(deck).toBeVisible();
    const handle = deck.locator('.cr-window-titlebar');
    const box = await handle.boundingBox();
    expect(box).toBeTruthy();
    await page.mouse.move(box!.x + 80, box!.y + 15);
    await page.mouse.down();
    await page.mouse.move(box!.x + 120, box!.y + 60, { steps: 5 });
    await page.mouse.up();
    await expect.poll(async () => (await handle.boundingBox())!.y).toBeGreaterThan(box!.y + 20);
    await deck.getByRole('button', { name: /^Close / }).click();
    await expect(deck).toHaveCount(0);
    await page.getByRole('button', { name: /DECK LAB/, exact: false }).filter({ hasText: /^DECK LAB$/ }).last().click();
    await expect(deck).toBeVisible();
    await deck.getByTestId('deck-slot-0').click();
    await expect(deck).toContainText('SIMULATED');
  });

  test('profile switching updates all keys and repeated changes settle', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    const deck = page.locator('[data-cr-window="deck-lab"]');
    await deck.getByRole('button', { name: 'LIVE', exact: true }).click();
    await expect(deck.locator('[data-cr-scanning="true"]')).toHaveCount(15);
    await deck.getByRole('button', { name: 'EVERYDAY', exact: true }).click();
    await expect(deck.locator('[data-cr-scanning="false"]')).toHaveCount(15);
    await expect(deck).toContainText('EVERYDAY');
  });

  test('hardware dialog traps focus, closes on Escape and restores its trigger', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    const zoom = page.locator('.cr-hero').getByRole('button', { name: 'ZOOM HARDWARE' });
    for (let i = 0; i < 2; i++) {
      await zoom.click();
      const dialog = page.getByRole('dialog', { name: 'Stream Deck MK.2 Hardware Inspection Lightbox' });
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Shift+Tab');
      expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(zoom).toBeFocused();
    }
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('edited profiles keep their keys through the animated confirmation dialog', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    const deck = page.locator('[data-cr-window="deck-lab"]');
    await deck.getByLabel('CUSTOM KEY LABEL', { exact: true }).fill('MY CUT');
    await deck.getByRole('button', { name: 'LIVE', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Switch from STUDIO to LIVE?' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'KEEP EDITS & SWITCH' }).click();
    await expect(dialog).not.toBeVisible();
    await deck.getByRole('button', { name: 'STUDIO', exact: true }).click();
    await expect(deck.getByLabel('CUSTOM KEY LABEL', { exact: true })).toHaveValue('MY CUT');
  });

  test('keyboard focus reveals every nested ancestor before interaction', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-motion', 'live');
    const button = page.locator('.cr-profile-card').last().getByRole('button');
    expect(await button.evaluate(el => {
      (el as HTMLElement).focus({ preventScroll: true });
      let ancestor: Element | null = el;
      while (ancestor) {
        if (ancestor.hasAttribute('data-cr-armed')) return false;
        if (ancestor.hasAttribute('data-cr-reveal') && (getComputedStyle(ancestor).opacity !== '1' || getComputedStyle(ancestor).transform !== 'none')) return false;
        ancestor = ancestor.parentElement;
      }
      return true;
    })).toBe(true);
    await expect(button).toBeFocused();
  });

  test('skip link moves keyboard focus past the header', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-motion', 'live');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#cr-main')).toBeFocused();
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('main')))).toBe(true);
  });

  test('early modal cancellation fades from its current opacity', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-boot', 'ready');
    const result = await page.locator('.cr-hero').evaluate(async hero => {
      const frame = () => new Promise(requestAnimationFrame);
      const zoom = Array.from(hero.querySelectorAll('button')).find(el => el.textContent?.includes('ZOOM HARDWARE'))!;
      zoom.click(); await frame(); await frame();
      const dialog = hero.querySelector<HTMLDialogElement>('dialog')!;
      const before = Number(getComputedStyle(dialog).opacity);
      dialog.querySelector<HTMLButtonElement>('[aria-label="Close hardware zoom modal"]')!.click();
      await frame();
      return { before, after: Number(getComputedStyle(dialog).opacity) };
    });
    expect(result.before).toBeLessThan(0.95);
    expect(result.after).toBeLessThanOrEqual(result.before + 0.05);
    await expect(page.locator('.cr-hero dialog')).not.toHaveAttribute('open', '');
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('every rapid profile switch starts a fresh scan', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-boot', 'ready');
    const result = await page.locator('[data-cr-window="deck-lab"]').evaluate(async deck => {
      const frame = () => new Promise(requestAnimationFrame);
      const choose = (name: string) => Array.from(deck.querySelectorAll('button')).find(el => el.textContent?.trim() === name)!.click();
      choose('LIVE'); await frame(); await frame();
      const first = deck.querySelector('.cr-animate-grid-scan')!;
      await new Promise(resolve => setTimeout(resolve, 220));
      const before = Number(first.getAnimations()[0].currentTime);
      choose('EVERYDAY'); await frame(); await frame();
      const second = deck.querySelector('.cr-animate-grid-scan')!;
      return { replaced: first !== second, before, after: Number(second.getAnimations()[0].currentTime) };
    });
    expect(result.replaced).toBe(true);
    expect(result.after).toBeLessThan(result.before);
  });

  test('hardware inspection keeps ready glyphs and writes tilt directly to its plane', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-boot', 'ready');
    await page.locator('.cr-hero').getByRole('button', { name: /45.*STAND ANGLE/ }).click();
    const key = page.locator('.cr-hero .cr-hardware-stage [aria-label^="Hardware preview key"] > div').first();
    expect(await key.evaluate(el => el.getAnimations().length)).toBe(0);
    const stage = page.locator('.cr-hero .cr-hardware-stage');
    await stage.hover({ position: { x: 20, y: 25 } });
    await expect.poll(() => stage.locator('.cr-hardware-angle').evaluate(el => (el as HTMLElement).style.transform)).toContain('perspective');
    expect(await stage.evaluate(el => (el as HTMLElement).style.getPropertyValue('--cr-rx'))).toBe('');
    expect(await page.locator('.cr-hero [aria-label^="Hardware preview key"]').first().evaluate(el => getComputedStyle(el).transitionProperty)).not.toContain('all');
  });

  test('maximize and interrupted restore keep spatial continuity', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-boot', 'ready');
    const deck = page.locator('[data-cr-window="deck-lab"]');
    await deck.scrollIntoViewIfNeeded();
    await expect(page.locator('#desktop-stage > div')).toHaveCSS('transform', 'none');
    const result = await deck.evaluate(async windowEl => {
      const surface = windowEl.querySelector<HTMLElement>('.cr-window-surface')!;
      const frame = () => new Promise(requestAnimationFrame);
      const original = surface.getBoundingClientRect().width;
      windowEl.querySelector<HTMLButtonElement>('[title="Expand"]')!.click();
      await frame(); await frame();
      const expandedTarget = windowEl.getBoundingClientRect().width;
      const during = surface.getBoundingClientRect().width;
      windowEl.querySelector<HTMLButtonElement>('[title="Restore"]')!.click();
      await frame(); await frame();
      return { original, expandedTarget, during, restoredDuring: surface.getBoundingClientRect().width };
    });
    expect(result.during).toBeLessThan(result.expandedTarget - 10);
    expect(Math.abs(result.restoredDuring - result.during)).toBeLessThan(80);
    await expect.poll(() => deck.locator('.cr-window-surface').evaluate(el => el.getBoundingClientRect().width)).toBeCloseTo(result.original, 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await deck.getByRole('button', { name: /^Expand / }).click();
    expect(await deck.locator('.cr-window-surface').evaluate(el => el.getAnimations().length)).toBe(0);
  });

  test('save feedback confirms a persisted layout and returns to its resting state', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    const deck = page.locator('[data-cr-window="deck-lab"]');
    await deck.getByLabel('CUSTOM KEY LABEL', { exact: true }).fill('SAVED CUT');
    const save = deck.locator('[data-cr-save-state]');
    await save.click();
    await expect(save).toHaveAttribute('data-cr-save-state', 'saved');
    await expect(save).toHaveAccessibleName('Demo saved locally');
    await expect(save).toHaveAttribute('data-cr-save-state', 'idle');
    await page.reload();
    await expect(deck.getByLabel('CUSTOM KEY LABEL', { exact: true })).toHaveValue('SAVED CUT');
  });

  test('blocked browser storage reports failure without a success animation', async ({ page }) => {
    await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Storage blocked', 'QuotaExceededError'); }; });
    await page.goto('/ctrlroom?autostart=1');
    const deck = page.locator('[data-cr-window="deck-lab"]');
    await deck.locator('[data-cr-save-state]').click();
    await expect(deck.locator('[data-cr-save-state]')).toHaveAttribute('data-cr-save-state', 'error');
    await expect(deck.locator('p[role="status"]')).toHaveText('Save failed. Allow browser storage and try again.');
    await expect(deck.locator('p[role="status"]')).toBeVisible();
    await expect(deck).not.toContainText('SAVED TO BROWSER STORAGE @');
  });

  test('live reduced motion settles content and removes spatial effects', async ({ page }) => {
    await page.goto('/ctrlroom?autostart=1');
    await page.evaluate(() => window.scrollTo(0, 220));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-motion', 'static');
    await expect(page.locator('[data-cr-armed]')).toHaveCount(0);
    await expect(page.locator('.cr-hero-hardware')).toHaveCSS('transform', 'none');
    await expect(page.locator('.cr-hero .cr-word-in').first()).toHaveCSS('animation-name', 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(page.locator('.cr-shell')).toHaveAttribute('data-cr-motion', 'live');
  });
});

for (const width of [390, 768]) {
  test(`touch navigation and app switching work at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 844 }, hasTouch: true, isMobile: true });
    const page = await context.newPage();
    await page.goto('/ctrlroom?autostart=1');
    await page.getByRole('button', { name: 'Open navigation' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation', exact: true });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('link', { name: 'Desktop OS', exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page.getByRole('tab', { name: 'DECK LAB' })).toBeVisible();
    await page.getByRole('tab', { name: 'RUN LOG' }).click();
    await expect(page.getByRole('tabpanel')).toContainText('SIMULATION EVENT STREAM');
    await page.getByRole('tab', { name: 'DECK LAB' }).click();
    await page.getByRole('tabpanel').getByTestId('deck-slot-0').tap();
    await expect(page.getByRole('tabpanel')).toContainText('SIMULATED');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await context.close();
  });
}

test('server content and section links remain visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/ctrlroom');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.cr-boot')).not.toBeVisible();
  await page.getByRole('navigation', { name: 'Page sections' }).getByRole('link', { name: 'Profiles', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'ONE DEVICE. MANY WAYS TO WORK.' })).toBeInViewport();
  await context.close();
});
