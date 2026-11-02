import { expect, test } from "@playwright/test";

test.describe("nexus landing page", () => {
  test("renders hero headline, tactile visuals, and essential sections", async ({ page }) => {
    await page.goto("/nexus");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Marketing that");
    await expect(heading).toContainText("human.");

    // Check main sections exist
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#process")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#testimonials")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // Verify sections with data-reveal gain is-inview and opacity 1 on scroll
    for (const sectionId of ["#about", "#services", "#process", "#work", "#testimonials", "#contact"]) {
      const section = page.locator(sectionId);
      await section.scrollIntoViewIfNeeded();
      const reveal = section.locator("[data-reveal]").first();
      await expect(reveal).toHaveClass(/is-inview/);
      await expect(reveal).toHaveCSS("opacity", "1");
    }
  });

  test("interactive controls: principle tabs, services drawers, and testimonials carousel", async ({
    page,
  }) => {
    await page.goto("/nexus");

    // 1. Manifesto Principle Tabs
    const manifesto = page.locator("#about");
    await manifesto.scrollIntoViewIfNeeded();
    const feelingTab = page.getByRole("tab", { name: /MADE WITH FEELING/i });
    await feelingTab.click();
    await expect(manifesto.locator("#manifesto-note-text")).toContainText("People remember how a brand made them feel");

    // 2. Services craft notes drawer
    const services = page.locator("#services");
    await services.scrollIntoViewIfNeeded();
    const serviceToggle = services.locator(".nx-service-toggle").first();
    await expect(serviceToggle).toHaveAttribute("aria-expanded", "false");
    await serviceToggle.click();
    await expect(serviceToggle).toHaveAttribute("aria-expanded", "true");
    await expect(services.locator(".nx-service-drawer").first()).toBeVisible();

    // 3. Testimonials carousel navigation
    const testimonials = page.locator("#testimonials");
    await testimonials.scrollIntoViewIfNeeded();
    await expect(page.locator("#quote-counter")).toContainText("Note 01 of 03");
    await page.locator("#testimonial-next").click();
    await expect(page.locator("#quote-counter")).toContainText("Note 02 of 03");
  });

  test("work filtering and case study modal reader", async ({ page }) => {
    await page.goto("/nexus");
    const work = page.locator("#work");
    await work.scrollIntoViewIfNeeded();

    // Filter by campaigns
    await page.getByRole("button", { name: "Campaigns" }).click();
    await expect(page.locator('[data-project-id="loom"]')).toBeVisible();
    await expect(page.locator('[data-project-id="solstice"]')).toBeHidden();

    // Open Case Study Modal
    await page.locator('[data-project-id="loom"] .nx-work-open-btn').click();
    const modal = page.locator("#project-modal");
    await expect(modal).toBeVisible();
    await expect(page.locator("#modal-project-title")).toContainText("The Living Thread Almanac");

    // Close modal via close button
    await page.locator("#modal-close-btn").click();
    await expect(modal).toBeHidden();
  });

  test("project seed brief form validates inputs and generates mailto note", async ({ page }) => {
    await page.goto("/nexus#contact");
    const contact = page.locator("#contact");
    await contact.scrollIntoViewIfNeeded();

    // Submit empty form to trigger validation
    await page.getByRole("button", { name: "PREPARE STUDIO NOTE" }).click();
    await expect(page.locator("#error-name")).toHaveClass(/is-visible/);
    await expect(page.locator("#error-email")).toHaveClass(/is-visible/);
    await expect(page.locator("#error-message")).toHaveClass(/is-visible/);

    // Fill valid data
    await page.locator("#brief-name").fill("Clara Vance");
    await page.locator("#brief-email").fill("clara@solstice-apothecary.example");
    await page.locator("#brief-company").fill("Solstice Apothecary");
    await page.locator("#brief-message").fill("We want to craft an heirloom botanical almanac for slow mornings.");

    await page.getByRole("button", { name: "PREPARE STUDIO NOTE" }).click();

    // Check result preview card
    const resultBox = page.locator("#brief-result");
    await expect(resultBox).toHaveClass(/is-visible/);
    await expect(page.locator("#brief-preview-text")).toContainText("Clara Vance (Solstice Apothecary)");
    await expect(page.locator("#brief-mailto-link")).toHaveAttribute("href", /^mailto:hello@nexus-studio\.example/);
  });

  test("mobile viewport and reduced motion support", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/nexus");

    // Header mobile menu toggle
    const toggle = page.locator("#mobile-menu-open");
    await expect(toggle).toBeVisible();
    await toggle.click();
    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toHaveClass(/is-open/);

    await page.locator("#mobile-menu-close").click();
    await expect(panel).not.toHaveClass(/is-open/);

    // Page content remains within horizontal bounds
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);

    await context.close();
  });

  test("readable and visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/nexus");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();

    await context.close();
  });
});
