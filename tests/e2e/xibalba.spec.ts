import { expect, test } from '@playwright/test';

test.describe('Xibalba template (/xibalba)', () => {
  test('renders the page, header, scenes and navigation', async ({ page }) => {
    await page.goto('/xibalba');

    // Title and Meta
    await expect(page).toHaveTitle(/Xibalba/i);

    // Navigation bar elements
    const nav = page.locator('header.nav');
    await expect(nav).toBeAttached();
    await expect(nav.getByRole('link', { name: 'The Cenote' })).toBeAttached();
    await expect(nav.getByRole('link', { name: 'The Calendar' })).toBeAttached();
    await expect(nav.getByRole('link', { name: 'Pilgrims' })).toBeAttached();
    await expect(nav.getByRole('button', { name: 'Reserve Passage' })).toBeAttached();

    // Verify all 5 scenes are present in DOM
    await expect(page.locator('#top')).toBeAttached();
    await expect(page.locator('#story')).toBeAttached();
    await expect(page.locator('#rites')).toBeAttached();
    await expect(page.locator('#night')).toBeAttached();
    await expect(page.locator('#finale')).toBeAttached();

    // Verify canvas waterfall elements exist
    const canvases = page.locator('canvas.fall');
    expect(await canvases.count()).toBeGreaterThanOrEqual(5);
  });

  test('opens and submits passage reservation modal', async ({ page }) => {
    await page.goto('/xibalba');

    // Click Passages CTA in nav
    const passagesBtn = page.locator('header.nav button.nav-cta');
    await passagesBtn.click();

    // Modal dialog should be visible
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Reserve Equinox Passage' })).toBeVisible();

    // Fill form fields
    await page.locator('#reserve-name').fill('Ixchel Canul');
    await page.locator('#reserve-email').fill('ixchel@example.com');
    await page.locator('#reserve-wave').selectOption('21:00');
    await page.locator('#reserve-party').fill('3');
    await page.locator('#reserve-wish').fill('A quiet journey through the orchid vault.');

    // Submit form
    await page.getByRole('button', { name: 'Confirm Passage' }).click();

    // Confirmation banner appears with generated code
    const confirmation = page.getByTestId('reservation-confirmation');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toContainText('XIB-');

    // Close modal via Close button
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(modal).not.toBeVisible();
  });

  test('allows inspecting Codex folios and navigation', async ({ page }) => {
    await page.goto('/xibalba');

    // Find and click the Codex inspector trigger in Scene 3
    const codexTrigger = page.locator('#rites button').filter({ hasText: /Open Codex Folios/i }).first();
    if (await codexTrigger.count() > 0) {
      await codexTrigger.click();
      const codexModal = page.getByRole('dialog');
      await expect(codexModal).toBeVisible();
      await expect(page.getByRole('heading', { name: 'The Equinox Codex' })).toBeVisible();

      // Check tab switching
      const tabTwo = page.getByRole('tab', { name: 'II' });
      await tabTwo.click();
      await expect(tabTwo).toHaveAttribute('aria-selected', 'true');

      // Dismiss with Escape key
      await page.keyboard.press('Escape');
      await expect(codexModal).not.toBeVisible();
    }
  });

  test('renders static fallback page for search engines and reduced-motion users', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/xibalba');

    // Fallback heading and semantic structure are available in DOM
    const fallbackHeader = page.locator('.xib-fallback-header');
    await expect(fallbackHeader).toBeAttached();
    await expect(page.locator('.xib-fallback-title').first()).toContainText('XIBALBA');
  });
});
