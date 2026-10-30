import { expect, test } from '@playwright/test';

test.describe('Synapxe template (/synapxe)', () => {
  test('renders the page, header, hero and sections', async ({ page }) => {
    await page.goto('/synapxe');

    // Title and Brand
    await expect(page).toHaveTitle(/Synapxe/i);
    await expect(page.getByRole('link', { name: /synapxe/i })).toBeVisible();

    // Verify system telemetry in header
    await expect(page.getByText(/SECTOR 09/i)).toBeVisible();

    // Navigation links in header
    const nav = page.getByRole('navigation', { name: 'Primary Navigation' });
    await expect(nav).toBeAttached();
    await expect(page.getByRole('link', { name: '[01 // SHELLS]' })).toBeAttached();
    await expect(page.getByRole('link', { name: '[02 // FABRIC LAB]' })).toBeAttached();
    await expect(page.getByRole('link', { name: '[03 // LOADOUT BUILDER]' })).toBeAttached();
    await expect(page.getByRole('link', { name: '[04 // BIOMETRIC FIT]' })).toBeAttached();

    // Verify main sections are present in DOM
    await expect(page.locator('#shells-grid')).toBeAttached();
    await expect(page.locator('#fabric-lab')).toBeAttached();
    await expect(page.locator('#loadout-builder')).toBeAttached();
    await expect(page.locator('#biometric-fit')).toBeAttached();
  });

  test('switches currency dynamically across the page', async ({ page }) => {
    await page.goto('/synapxe');

    // Default USD
    await expect(page.getByRole('button', { name: 'USD $' })).toBeVisible();

    // Switch to JPY
    await page.getByRole('button', { name: 'JPY ¥' }).click();
    await expect(page.locator('body')).toContainText('¥');

    // Switch to EUR
    await page.getByRole('button', { name: 'EUR €' }).click();
    await expect(page.locator('body')).toContainText('€');
  });

  test('filters product archive by category tabs', async ({ page }) => {
    await page.goto('/synapxe');

    // Filter to Outer Shells
    const shellsTab = page.getByRole('tab', { name: /OUTER SHELLS/i });
    await shellsTab.click();

    // Should display shells products and hide bottoms/gear
    await expect(page.getByTestId('product-card-JKT-01A')).toBeVisible();
    await expect(page.getByTestId('product-card-JKT-02B')).toBeVisible();
    await expect(page.getByTestId('product-card-VST-03C')).toBeVisible();
    await expect(page.getByTestId('product-card-PNT-04A')).not.toBeVisible();

    // Switch back to All
    const allTab = page.getByRole('tab', { name: /ALL ARCHIVE/i });
    await allTab.click();
    await expect(page.getByTestId('product-card-PNT-04A')).toBeVisible();
  });

  test('configures loadout and deploys bundle to cart', async ({ page }) => {
    await page.goto('/synapxe');

    // Locate Loadout Builder deploy button
    const deployBtn = page.getByRole('button', { name: /DEPLOY FULL LOADOUT TO CART/i });
    await deployBtn.scrollIntoViewIfNeeded();
    await deployBtn.click();

    // Cart drawer should open
    const cartDrawer = page.getByRole('dialog', { name: 'Hardware Loadout Cart Drawer' });
    await expect(cartDrawer).toBeVisible();
    await expect(cartDrawer.getByText(/ENCRYPTED HARDWARE MANIFEST/i)).toBeVisible();

    // Apply valid promo code CYBER26
    const promoInput = page.locator('#promo-terminal-input');
    await promoInput.fill('CYBER26');
    await page.getByRole('button', { name: '[APPLY]' }).click();
    await expect(cartDrawer.getByText(/PROTOCOL DISCOUNT/i)).toBeVisible();

    // Initiate encrypted checkout
    const checkoutBtn = page.getByRole('button', { name: /INITIATE ENCRYPTED CHECKOUT/i });
    await checkoutBtn.click();

    // Checkout modal appears with tracking hash
    await expect(page.getByText(/ORDER CONFIRMED \/\/ SECTOR 09/i)).toBeVisible();
    await expect(page.getByText(/TRACKING HASH:/i)).toBeVisible();

    // Dismiss checkout modal
    await page.getByRole('button', { name: /ACKNOWLEDGE & RETURN/i }).click();
    await expect(cartDrawer).not.toBeVisible();
  });

  test('verifies NFC chip in Tyvek footer', async ({ page }) => {
    await page.goto('/synapxe');

    // Scroll to footer NFC verifier
    const nfcInput = page.locator('#nfc-verifier-input');
    await nfcInput.scrollIntoViewIfNeeded();
    await nfcInput.fill('JKT-01A');

    const verifyBtn = page.getByRole('button', { name: /VERIFY CHIP/i });
    await verifyBtn.click();

    // Result badge appears
    await expect(page.getByText(/AUTHENTICATED \/\/ GENUINE SYNAPXE UNIT/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test('reveals the archive and section panels once as they enter view', async ({ page }) => {
    await page.goto('/synapxe');
    const firstCard = page.getByTestId('product-card-JKT-01A');
    await expect(firstCard).toHaveAttribute('data-sx-state', 'pending');
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toHaveAttribute('data-sx-state', 'visible');
    await expect(firstCard).toHaveCSS('opacity', '1');

    const labHeading = page.locator('#fabric-lab [data-sx-reveal="heading"]');
    await expect(labHeading).toHaveAttribute('data-sx-state', 'pending');
    await labHeading.scrollIntoViewIfNeeded();
    await expect(labHeading).toHaveAttribute('data-sx-state', 'visible');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(firstCard).toHaveAttribute('data-sx-state', 'visible');
    await expect(labHeading).toHaveAttribute('data-sx-state', 'visible');
  });

  test('reveals pending content immediately if reduced motion is enabled', async ({ page }) => {
    await page.goto('/synapxe');
    const labHeading = page.locator('#fabric-lab [data-sx-reveal="heading"]');
    await expect(labHeading).toHaveAttribute('data-sx-state', 'pending');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(labHeading).toHaveAttribute('data-sx-state', 'visible');
    await expect(page.locator('[data-sx-state="pending"]')).toHaveCount(0);
    await expect(page.locator('.sx-hero-load').first()).toHaveCSS('animation-name', 'none');
  });

  test('makes an off-screen control visible immediately when it receives focus', async ({ page }) => {
    await page.goto('/synapxe');
    const panel = page.locator('#footer-verifier');
    await expect(panel).toHaveAttribute('data-sx-state', 'pending');
    await page.locator('#nfc-verifier-input').focus();
    await expect(panel).toHaveAttribute('data-sx-state', 'visible');
    await expect(panel).toHaveCSS('opacity', '1');
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('keeps the page visible and the hero rain still', async ({ page }) => {
      await page.goto('/synapxe');
      await expect(page.locator('[data-sx-state="pending"]')).toHaveCount(0);
      await expect(page.getByTestId('product-card-JKT-01A')).toHaveCSS('opacity', '1');
      await page.waitForTimeout(300);
      const rainIsEmpty = await page.getByTestId('hero-rain-canvas').evaluate((canvas: HTMLCanvasElement) => {
        const context = canvas.getContext('2d');
        if (!context) return false;
        return !context.getImageData(0, 0, canvas.width, canvas.height).data.some((value) => value !== 0);
      });
      expect(rainIsEmpty).toBe(true);
    });
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('leaves the archive and section content readable', async ({ page }) => {
      await page.goto('/synapxe');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByTestId('product-card-JKT-01A')).toHaveCSS('opacity', '1');
      await expect(page.locator('#fabric-lab [data-sx-reveal="heading"]')).toHaveCSS('opacity', '1');
    });
  });
});
