import { expect, test } from '@playwright/test';

test.describe('Cyberpunk template (/cyberpunk)', () => {
  test('renders the page, header, hero and sections', async ({ page }) => {
    await page.goto('/cyberpunk');

    // Title and Brand
    await expect(page).toHaveTitle(/KINETIX \/\/ ARCHIVE/i);
    await expect(page.getByRole('link', { name: 'KINETIX // ARCHIVE™' })).toBeVisible();

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
    await page.goto('/cyberpunk');

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
    await page.goto('/cyberpunk');

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
    await page.goto('/cyberpunk');

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
    await page.goto('/cyberpunk');

    // Scroll to footer NFC verifier
    const nfcInput = page.locator('#nfc-verifier-input');
    await nfcInput.scrollIntoViewIfNeeded();
    await nfcInput.fill('JKT-01A');

    const verifyBtn = page.getByRole('button', { name: /VERIFY CHIP/i });
    await verifyBtn.click();

    // Result badge appears
    await expect(page.getByText(/AUTHENTICATED \/\/ GENUINE KINETIX ARCHIVE UNIT/i)).toBeVisible({
      timeout: 5000,
    });
  });
});
