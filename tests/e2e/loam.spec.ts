import { expect, test, type Page } from '@playwright/test';

// Headless Chromium needs SwiftShader allowed explicitly for WebGL2 in CI/headless environments.
test.use({
  launchOptions: {
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  },
});

async function openLoamExperience(page: Page) {
  await page.goto('/loam');
  await expect(page.locator('html')).toHaveAttribute(
    'data-loam-mode',
    'experience',
    { timeout: 30_000 },
  );
  await expect(
    page.locator("[data-testid='loam-webgl-canvas'] canvas"),
  ).toHaveCount(1);
}

test.describe('LOAM 3D experience (motion enabled)', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the page loads and the canvas mounts over the static fallback', async ({
    page,
  }) => {
    await openLoamExperience(page);

    // Fallback root is present in the DOM but made inert and visually hidden while 3D is active
    const fallbackRoot = page.locator('#loam-specimen-root');
    await expect(fallbackRoot).toBeAttached();
    await expect(fallbackRoot).toHaveAttribute('inert', '');

    // WebGL Canvas exists and is rendered
    const canvas = page.locator("[data-testid='loam-webgl-canvas'] canvas");
    await expect(canvas).toBeVisible();

    // Initial Chapter 01 UI is visible
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /01 — The fruit/,
    );
    await expect(page.locator('#top').getByText('What you see is the smallest part.')).toBeVisible();

    // Sunlight slider is accessible and interactive
    const sunSlider = page.getByTestId('sunlight-slider');
    await expect(sunSlider).toBeVisible();
    await expect(page.getByTestId('sunlight-time-label')).toBeVisible();
  });

  test('keyboard chapter stepping navigates chapters including chapter 04 two rest points', async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await openLoamExperience(page);

    // Ensure focus is on the document body so keyboard shortcuts dispatch to scrollTimeline
    await page.evaluate(() => document.body.focus());

    // Step to Chapter 02
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /02 — Under the cap/,
      { timeout: 10_000 },
    );

    // Step to Chapter 03
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /03 — Breaking ground/,
      { timeout: 10_000 },
    );

    // Step to Chapter 04 - Rest point 4a (close on clump)
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /04 — The network/,
      { timeout: 10_000 },
    );
    await expect(page.locator('[data-active-chapter]')).toHaveAttribute(
      'data-sub-rest',
      '4a',
      { timeout: 10_000 },
    );
    // In 4a, clump is inspectable
    await expect(
      page.getByRole('button', { name: /inspect mycelium clump/i }),
    ).toBeVisible();

    // Step forward inside Chapter 04 to Rest point 4b (wide network)
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /04 — The network/,
      { timeout: 10_000 },
    );
    await expect(page.locator('[data-active-chapter]')).toHaveAttribute(
      'data-sub-rest',
      '4b',
      { timeout: 10_000 },
    );

    // Step to Chapter 05
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /05 — The material/,
      { timeout: 10_000 },
    );
    await expect(
      page.getByRole('button', { name: /inspect packaging tray/i }),
    ).toBeVisible();

    // Step to Chapter 06
    await page.keyboard.press('ArrowDown');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /06 — Return/,
      { timeout: 10_000 },
    );

    // Step backwards back to Chapter 05
    await page.keyboard.press('ArrowUp');
    await expect(page.getByTestId('chapter-marker')).toHaveText(
      /05 — The material/,
      { timeout: 10_000 },
    );
  });

  test('keyboard inspect supports button trigger, Enter, arrows, and Escape', async ({
    page,
  }) => {
    await openLoamExperience(page);

    // In Chapter 01, hero mushroom inspect button is available
    const inspectBtn = page.getByRole('button', { name: /inspect mushroom/i });
    await expect(inspectBtn).toBeVisible();

    // Focus inspect button and press Enter to toggle inspect mode
    await inspectBtn.focus();
    await page.keyboard.press('Enter');

    // Inspect mode is engaged
    const overlay = page.locator('[data-inspect-phase]');
    await expect(overlay).toHaveAttribute('data-inspect-phase', 'inspecting', {
      timeout: 5_000,
    });
    await expect(
      page.getByText('Drag or use Arrow keys to rotate specimen'),
    ).toBeVisible();

    // Arrow keys rotate specimen
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowUp');

    // Escape exits inspect mode smoothly
    await page.keyboard.press('Escape');
    await expect(overlay).not.toHaveAttribute('data-inspect-phase', 'inspecting', {
      timeout: 5_000,
    });
  });

  test('sample kit form validation and success interaction', async ({
    page,
  }) => {
    test.setTimeout(60_000);
    await openLoamExperience(page);

    // Jump directly to chapter 6 (press '6' key)
    await page.evaluate(() => document.body.focus());
    await page.keyboard.press('6');
    await expect(page.getByTestId('chapter-marker')).toHaveText(/06 — Return/, {
      timeout: 10_000,
    });

    // Form is visible
    const form = page.locator('#top').getByRole('form', { name: /request a sample kit/i });
    await expect(form).toBeVisible();

    // Submit empty form to trigger validation errors
    const submitBtn = form.getByRole('button', { name: /request sample kit/i });
    await submitBtn.click();

    // Validation alerts appear
    await expect(form.getByText('Please enter your name')).toBeVisible();
    await expect(form.getByText(/Please enter your work email/i)).toBeVisible();
    await expect(form.getByText(/Please enter your company/i)).toBeVisible();

    // Fill valid inputs
    await form.getByLabel(/^name/i).fill('Elena Vance');
    await form.getByLabel(/^work email/i).fill('elena@fieldcraft.co');
    await form.getByLabel(/^company/i).fill('Fieldcraft Design');
    await form.getByRole('radio', { name: 'Panels' }).click();
    await form.getByLabel(/^note/i).fill('Evaluating custom packaging inserts.');

    // Submit valid form
    await submitBtn.click();

    // Success screen with animated sprouting mushroom appears
    await expect(page.getByRole('status')).toBeVisible();
    await expect(page.getByText(/something’s growing/i)).toBeVisible();
    await expect(page.getByText(/elena@fieldcraft\.co/i)).toBeVisible();
  });
});

test.describe('LOAM static fallback (reduced motion)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('reduced motion renders the complete specimen sheet with all copy and no canvas', async ({
    page,
  }) => {
    await page.goto('/loam');

    // 3D canvas must NEVER mount
    await expect(page.locator('canvas')).toHaveCount(0);
    await expect(page.locator('html')).toHaveAttribute(
      'data-loam-mode',
      'specimen',
    );

    // Specimen sheet is visible and interactive
    const root = page.locator('#loam-specimen-root');
    await expect(root).toBeVisible();
    await expect(root).not.toHaveAttribute('inert');

    // All chapter copy is present in order
    await expect(page.getByText('01 — The fruit')).toBeVisible();
    await expect(page.getByText('What you see is the smallest part.')).toBeVisible();

    await expect(page.getByText('02 — Under the cap')).toBeVisible();
    await expect(page.getByText('A mushroom is only the fruit.')).toBeVisible();

    await expect(page.getByText('03 — Breaking ground')).toBeVisible();
    await expect(page.getByText('Beneath leaf litter and moss.')).toBeVisible();
    await expect(page.getByText('Tangled roots give way to dark, living earth.')).toBeVisible();

    await expect(page.getByText('04 — The network')).toBeVisible();
    await expect(
      page.getByText('Miles of living thread under every step.'),
    ).toBeVisible();

    await expect(page.getByText('05 — The material')).toBeVisible();
    await expect(page.getByText('Guided into form.')).toBeVisible();

    await expect(page.locator('#loam-specimen-root').getByText('06 — Return').first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Request a sample kit' }),
    ).toBeVisible();

    // Reference specimen plates are rendered with WebP images
    const plates = root.locator('img');
    await expect(plates).toHaveCount(8);
    await expect(plates.first()).toHaveAttribute(
      'src',
      '/templates/loam/references/mushroom-front.webp',
    );
  });
});

test.describe('LOAM static fallback (no JavaScript)', () => {
  test.use({ javaScriptEnabled: false });

  test('no-JS renders the complete server-rendered specimen sheet', async ({
    page,
  }) => {
    await page.goto('/loam');

    // No canvas
    await expect(page.locator('canvas')).toHaveCount(0);

    // Specimen sheet is server-rendered and visible
    const root = page.locator('#loam-specimen-root');
    await expect(root).toBeVisible();
    await expect(
      page.getByText('What you see is the smallest part.'),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Request a sample kit' }),
    ).toBeVisible();
  });
});
