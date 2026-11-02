import { expect, test } from '@playwright/test';

test.describe('Razorline template (/razorline)', () => {
  test('renders the page, header, hero and sections', async ({ page }) => {
    await page.goto('/razorline');

    // Title and Brand
    await expect(page).toHaveTitle(/RAZORLINE/i);
    await expect(page.getByRole('link', { name: /RAZORLINE Home/i })).toBeVisible();

    // Navigation links in header
    const nav = page.getByRole('navigation', { name: 'Primary Navigation' });
    await expect(nav).toBeAttached();
    await expect(page.getByRole('link', { name: 'FOOTWEAR' })).toBeAttached();
    await expect(page.getByRole('link', { name: 'TECHNOLOGY' })).toBeAttached();
    await expect(page.getByRole('link', { name: 'ATHLETES' })).toBeAttached();
    await expect(page.getByRole('link', { name: 'JOURNAL' })).toBeAttached();

    // Verify main sections
    await expect(page.locator('#top')).toBeAttached();
    await expect(page.locator('#footwear')).toBeAttached();
    await expect(page.locator('#breakaway')).toBeAttached();
    await expect(page.locator('#technology')).toBeAttached();
    await expect(page.locator('#athletes')).toBeAttached();
    await expect(page.locator('#lookbook')).toBeAttached();
    await expect(page.locator('#journal')).toBeAttached();
  });

  test('switches colorway finish in hero section', async ({ page }) => {
    await page.goto('/razorline');

    // Default Voltage
    const cobaltBtn = page.getByRole('button', { name: 'COBALT' });
    await expect(cobaltBtn).toBeVisible();
    await cobaltBtn.click();

    // Expect Cobalt to become pressed
    await expect(cobaltBtn).toHaveAttribute('aria-pressed', 'true');

    // Switch to Shadow
    const shadowBtn = page.getByRole('button', { name: 'SHADOW' });
    await shadowBtn.click();
    await expect(shadowBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('selects size, adds shoe to bag, and opens cart drawer', async ({ page }) => {
    await page.goto('/razorline');

    // Find footwear collection
    const footwearSec = page.locator('#footwear');
    await footwearSec.scrollIntoViewIfNeeded();

    // Click on size 11.0 for first shoe
    const sizeBtn = page.getByRole('button', { name: /RL-01 VOLTAGE size US 11.0/i });
    await sizeBtn.click();
    await expect(sizeBtn).toHaveAttribute('aria-pressed', 'true');

    // Add to bag
    const addBtn = page.getByRole('button', { name: /ADD TO BAG · US 11.0/i });
    await addBtn.click();

    // Cart drawer should open
    const cartDrawer = page.getByRole('dialog');
    await expect(cartDrawer).toBeVisible();
    await expect(cartDrawer.getByText(/RL-01 VOLTAGE/i)).toBeVisible();
    await expect(cartDrawer.getByText(/SIZE: US 11.0/i)).toBeVisible();

    // Close cart drawer
    await page.getByRole('button', { name: 'Close shopping bag' }).click();
    await expect(cartDrawer).not.toBeVisible();
  });

  test('validates email signup in launch footer', async ({ page }) => {
    await page.goto('/razorline');

    // Scroll to footer input
    const emailInput = page.locator('#launch-email-input');
    await emailInput.scrollIntoViewIfNeeded();

    // Attempt submit with empty or invalid email
    const submitBtn = page.getByRole('button', { name: /JOIN DISPATCH/i });
    await submitBtn.click();

    // Error alert appears
    await expect(page.locator('#launch-email-error')).toBeVisible();

    // Fill valid email
    await emailInput.fill('athlete@razorline.lab');
    await submitBtn.click();

    // Success banner appears
    await expect(page.getByText(/RL-01 DISPATCH CONFIRMED/i)).toBeVisible();
  });

  test('opens and closes quick view modal', async ({ page }) => {
    await page.goto('/razorline');

    // Click SPEC SHEET + in hero
    const specSheetBtn = page.getByRole('button', { name: /SPEC SHEET \+/i });
    await specSheetBtn.click();

    // Modal dialog opens
    const modal = page.getByRole('dialog', { name: /RL-01 Technical Specification/i });
    await expect(modal).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: 'Close specification modal' }).click();
    await expect(modal).not.toBeVisible();
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('renders with static layout and no animations', async ({ page }) => {
      await page.goto('/razorline');
      await expect(page.locator('#top')).toBeVisible();
      await expect(page.locator('#footwear')).toBeAttached();
    });
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('leaves main layout and headlines readable', async ({ page }) => {
      await page.goto('/razorline');
      await expect(page.locator('#top')).toBeVisible();
      await expect(page.getByText(/BREAK/i).first()).toBeVisible();
    });
  });
});
