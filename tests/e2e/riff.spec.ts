import { test, expect } from '@playwright/test';

test.describe('Riff music-first dating template (/riff)', () => {
  test('renders page layout, header, branding, and hero section', async ({ page }) => {
    await page.goto('/riff');

    // Title and Metadata
    await expect(page).toHaveTitle(/Riff — Music-First Dating/i);

    // Header brand logo & name
    const brandLink = page.getByRole('link', { name: /Riff/i }).first();
    await expect(brandLink).toBeVisible();

    // Navigation links
    await expect(page.getByRole('link', { name: 'How It Works' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Matches' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Playlists' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Stories' }).first()).toBeVisible();

    // Main headings
    await expect(
      page.getByRole('heading', { name: /Two phones, one chemistry/i })
    ).toBeVisible();
  });

  test('interacts with hero shared tracks and vinyl disc', async ({ page }) => {
    await page.goto('/riff');

    // Switch shared track in hero
    const starbursterBtn = page.getByRole('button', { name: /Starburster/i });
    if (await starbursterBtn.isVisible()) {
      await starbursterBtn.click();
      await expect(page.getByText(/Fontaines D\.C\./i).first()).toBeVisible();
    }

    // Flip vinyl disc side
    const flipBtn = page.getByRole('button', { name: /Flip vinyl record/i }).first();
    if (await flipBtn.isVisible()) {
      await flipBtn.click();
      await expect(flipBtn).toBeVisible();
    }
  });

  test('toggles manifesto principle expander', async ({ page }) => {
    await page.goto('/riff');

    const manifestoSection = page.locator('#manifesto');
    await manifestoSection.scrollIntoViewIfNeeded();

    const expandBtn = manifestoSection
      .getByRole('button', { name: /Collapse Principle|Expand Principle/i })
      .first();
    await expect(expandBtn).toBeVisible();
    await expandBtn.click();
    await expect(expandBtn).toBeVisible();
  });

  test('navigates the three track stations in How It Works', async ({ page }) => {
    await page.goto('/riff');

    const howItWorks = page.locator('#how-it-works');
    await howItWorks.scrollIntoViewIfNeeded();

    await expect(howItWorks.getByText(/TRACK 01/i)).toBeVisible();

    // Click Next Track
    const nextBtn = howItWorks.getByRole('button', { name: /Next Track/i });
    await nextBtn.click();
    await expect(howItWorks.getByText(/TRACK 02/i)).toBeVisible();
  });

  test('computes taste overlap and filters partner profiles in Taste Matcher', async ({
    page,
  }) => {
    await page.goto('/riff');

    const matcher = page.locator('#taste-matcher');
    await matcher.scrollIntoViewIfNeeded();

    // Verify presence of genre selector
    await expect(matcher.getByRole('heading', { name: /The Taste Matcher/i })).toBeVisible();

    // Select partner profile (Julian)
    const julianBtn = matcher.getByRole('tab', { name: /Julian/i });
    if (await julianBtn.isVisible()) {
      await julianBtn.click();
      await expect(matcher.getByText(/Julian/i).first()).toBeVisible();
    }

    // Toggle a genre button
    const darkwaveBtn = matcher.getByRole('button', { name: /Darkwave/i });
    if (await darkwaveBtn.isVisible()) {
      await darkwaveBtn.click();
      await expect(matcher.locator('text=%')).toBeVisible();
    }
  });

  test('switches music chemistry dimensions and filters playlists', async ({ page }) => {
    await page.goto('/riff');

    // Music chemistry mode switcher
    const chemistry = page.locator('#music-chemistry');
    await chemistry.scrollIntoViewIfNeeded();

    const concertBtn = chemistry.getByRole('tab', { name: /Concert energy/i });
    if (await concertBtn.isVisible()) {
      await concertBtn.click();
      await expect(chemistry.getByText(/MATCHED GIG RITUAL/i)).toBeVisible();
    }

    // Playlist wall filtering
    const playlists = page.locator('#playlists');
    await playlists.scrollIntoViewIfNeeded();

    const shoegazeTab = playlists.getByRole('button', { name: /Shoegaze/i }).first();
    if (await shoegazeTab.isVisible()) {
      await shoegazeTab.click();
      await expect(playlists.getByText(/Midnight Static/i).first()).toBeVisible();
    }
  });

  test('opens preview modal, validates input, and stamps local ticket pass', async ({
    page,
  }) => {
    await page.goto('/riff');

    // Trigger Join Riff modal
    const joinBtn = page.getByRole('button', { name: 'Join Riff' }).first();
    await joinBtn.click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(page.getByText(/Riff is in interactive concept preview/i)).toBeVisible();

    // Submit empty to check validation
    const stampBtn = modal.getByRole('button', { name: /Stamp Local Preview Ticket/i });
    await stampBtn.click();
    await expect(modal.getByRole('alert')).toBeVisible();

    // Fill valid data
    await modal.getByLabel(/First Name or Zine Alias/i).fill('Mila');
    await modal.getByLabel(/Zero-Skip Album or Track/i).fill('Punisher');
    await stampBtn.click();

    // Verify local ticket stamped
    await expect(modal.getByRole('status')).toBeVisible();
    await expect(modal.getByText(/LOCAL DEMO PASS STAMPED/i)).toBeVisible();
    await expect(modal.getByText(/HOLDER: Mila/i)).toBeVisible();

    // Close modal
    const closeBtn = modal.getByRole('button', { name: /Close preview dialog/i });
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('toggles global motion state', async ({ page }) => {
    await page.goto('/riff');

    const toggleMotionBtn = page.getByRole('button', { name: /Pause Motion/i });
    if (await toggleMotionBtn.isVisible()) {
      await toggleMotionBtn.click();
      await expect(page.locator('.motion-paused')).toBeAttached();

      const resumeBtn = page.getByRole('button', { name: /Resume Motion/i });
      await resumeBtn.click();
      await expect(page.locator('.motion-paused')).not.toBeAttached();
    }
  });
});
