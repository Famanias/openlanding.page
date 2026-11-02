import { expect, test } from '@playwright/test';

test.describe('Halo Desk template (/halodesk)', () => {
  test('renders the page, header, hero and primary sections', async ({ page }) => {
    await page.goto('/halodesk');

    // Title and Brand
    await expect(page).toHaveTitle(/Halo Desk/i);
    await expect(page.getByText('Halo Desk').first()).toBeVisible();

    // Primary Hero Headline
    await expect(
      page.getByRole('heading', { name: /Organize your work without losing your calm/i })
    ).toBeVisible();

    // Main navigation and CTAs
    await expect(page.getByRole('button', { name: /Download for Desktop/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Demo/i })).toBeVisible();

    // Key interactive sections are present in DOM
    await expect(page.locator('#home')).toBeAttached();
    await expect(page.locator('#system')).toBeAttached();
    await expect(page.locator('#workflow')).toBeAttached();
    await expect(page.locator('#lab')).toBeAttached();
    await expect(page.locator('#templates')).toBeAttached();
    await expect(page.locator('#details')).toBeAttached();
    await expect(page.locator('#pricing')).toBeAttached();
  });

  test('toggles interactive feature chips in the hero', async ({ page }) => {
    await page.goto('/halodesk');

    // Hero chips: Tasks, Calendar, Focus Mode, Notes
    const tasksChip = page.getByRole('button', { name: 'Tasks', exact: true });
    const calendarChip = page.getByRole('button', { name: 'Calendar', exact: true });
    const focusChip = page.getByRole('button', { name: 'Focus Mode', exact: true });
    const notesChip = page.getByRole('button', { name: 'Notes', exact: true });

    await expect(tasksChip).toBeVisible();
    await expect(calendarChip).toBeVisible();
    await expect(focusChip).toBeVisible();
    await expect(notesChip).toBeVisible();

    // Click Calendar chip
    await calendarChip.click();
    await expect(calendarChip).toHaveAttribute('aria-pressed', 'true');

    // Click Focus Mode chip
    await focusChip.click();
    await expect(focusChip).toHaveAttribute('aria-pressed', 'true');
    await expect(calendarChip).toHaveAttribute('aria-pressed', 'false');
  });

  test('interacts with the hero desktop app task list', async ({ page }) => {
    await page.goto('/halodesk');

    // Find the first task checkbox and toggle completion
    const firstTask = page.locator('button[aria-label^="Mark \\""]').first();
    await expect(firstTask).toBeVisible();
    await firstTask.click();

    // Quick task input field
    const quickInput = page.getByPlaceholder(/Add a calm task.../i);
    await expect(quickInput).toBeVisible();
    await quickInput.fill('Review team goals');
    await quickInput.press('Enter');

    // Verify the newly created task appears
    await expect(page.getByText('Review team goals')).toBeVisible();
  });

  test('switches Feature Lab tabs', async ({ page }) => {
    await page.goto('/halodesk');

    const labSection = page.locator('#lab');
    await labSection.scrollIntoViewIfNeeded();

    // Lab tabs: Tasks, Calendar, Focus, Notes
    const focusTab = labSection.getByRole('button', { name: /Focus Mode/i });
    await focusTab.click();
    await expect(focusTab).toHaveAttribute('aria-selected', 'true');

    const notesTab = labSection.getByRole('button', { name: /Notes/i });
    await notesTab.click();
    await expect(notesTab).toHaveAttribute('aria-selected', 'true');
  });

  test('applies a preset template to the planner', async ({ page }) => {
    await page.goto('/halodesk');

    const templatesSection = page.locator('#templates');
    await templatesSection.scrollIntoViewIfNeeded();

    // Apply template button on one of the cards
    const applyBtn = templatesSection.getByRole('button', { name: /Apply to preview/i }).first();
    await expect(applyBtn).toBeVisible();
    await applyBtn.click();

    // Should indicate applied or active
    await expect(templatesSection.getByText(/Applied to preview/i).first()).toBeVisible();
  });

  test('opens and submits early access download modal with validation', async ({ page }) => {
    await page.goto('/halodesk');

    // Click download button
    const downloadBtn = page.getByRole('button', { name: /Download for Desktop/i }).first();
    await downloadBtn.click();

    // Modal opens
    const modal = page.getByRole('dialog', { name: /Download Halo Desk/i });
    await expect(modal).toBeVisible();

    // Attempt submitting with empty email
    const submitBtn = modal.getByRole('button', { name: /Get early build/i });
    await submitBtn.click();
    await expect(modal.getByText(/Please enter a valid email address/i)).toBeVisible();

    // Enter valid email
    const emailInput = modal.getByPlaceholder(/you@company.com/i);
    await emailInput.fill('developer@example.com');
    await submitBtn.click();

    // Success confirmation appears
    await expect(modal.getByText(/You're on the list/i)).toBeVisible();

    // Close modal
    const closeBtn = modal.getByRole('button', { name: /Close dialog/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test.describe('with reduced motion', () => {
    test.use({ reducedMotion: 'reduce' });

    test('renders with all content immediately visible and intact', async ({ page }) => {
      await page.goto('/halodesk');
      await expect(
        page.getByRole('heading', { name: /Organize your work without losing your calm/i })
      ).toBeVisible();
      await expect(page.locator('#home')).toBeVisible();
      await expect(page.locator('#system')).toBeVisible();
      await expect(page.locator('#lab')).toBeVisible();
    });
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('preserves readable editorial content and layout', async ({ page }) => {
      await page.goto('/halodesk');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('#system')).toBeVisible();
      await expect(page.locator('#workflow')).toBeVisible();
    });
  });
});
