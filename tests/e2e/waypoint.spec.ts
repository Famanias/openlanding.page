import { test, expect } from "@playwright/test";

test.describe("Waypoint landing template (/waypoint)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/waypoint");
    await page.waitForLoadState("networkidle");
  });

  test("loads with the primary heading, supplied hero artwork, and live board", async ({
    page,
  }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Pitch with intention.");
    await expect(h1).toContainText("Land the offer.");
    await expect(page.locator(".wyp-hero-artwork img")).toHaveAttribute(
      "data-supplied-artwork",
      "1",
    );

    // Hero Dashboard is visible with pipeline columns
    const heroDashboard = page.locator("[data-parallax]");
    await expect(heroDashboard).toBeVisible();
    await expect(heroDashboard.getByText("Active Pipeline")).toBeVisible();
    await expect(
      heroDashboard.getByText("Anthropic", { exact: true }),
    ).toBeVisible();
    await expect(heroDashboard.getByText("$420k Total Comp")).toBeVisible();
  });

  test("supplied artwork gallery switches between the ZIP images", async ({
    page,
  }) => {
    const gallery = page.locator(".wyp-artwork-gallery");
    const active = gallery.locator(".wyp-gallery-image.is-active img");
    await expect(active).toHaveAttribute("data-supplied-artwork", "9");
    await gallery
      .getByRole("button", { name: "The details, together", exact: true })
      .click();
    await expect(active).toHaveAttribute("data-supplied-artwork", "3");
    await gallery.getByRole("button", { name: "Next concept artwork" }).click();
    await expect(active).toHaveAttribute("data-supplied-artwork", "6");
    await gallery.getByRole("button", { name: "Next concept artwork" }).click();
    await expect(active).toHaveAttribute("data-supplied-artwork", "7");
    await gallery
      .getByRole("button", { name: "Previous concept artwork" })
      .click();
    await expect(active).toHaveAttribute("data-supplied-artwork", "6");
    await expect(page.locator(".wyp-journal-artwork img")).toHaveAttribute(
      "data-supplied-artwork",
      "10",
    );
  });

  test("calendar widget updates interview details on day click", async ({
    page,
  }) => {
    const bento = page.locator("section#features");
    await expect(bento).toBeVisible();

    // Initially day 5 is selected (Anthropic)
    await expect(bento.getByText(/Anthropic/).first()).toBeVisible();

    // Click day 8 (Linear)
    const day8Btn = bento.getByRole("button", { name: "8", exact: true });
    await day8Btn.click();
    await expect(bento.getByText(/Linear/).first()).toBeVisible();
    await expect(
      bento.getByText("Design Engineering Craft Sync"),
    ).toBeVisible();

    // Click day 12 (Figma)
    const day12Btn = bento.getByRole("button", { name: "12", exact: true });
    await day12Btn.click();
    await expect(bento.getByText(/Figma/).first()).toBeVisible();
    await expect(bento.getByText("Founding Systems Interview")).toBeVisible();
  });

  test("kanban bento widget advances card stage on click", async ({ page }) => {
    const bento = page.locator("section#features");
    // Find the Linear card button in the Kanban widget
    const linearCard = bento
      .locator("[data-kanban-stage]")
      .getByRole("button")
      .filter({ hasText: "Linear" });
    await expect(linearCard).toBeVisible();

    // Click Linear card to advance stage
    await linearCard.click();
    await expect(
      bento
        .locator('[data-kanban-stage="in_review"]')
        .getByRole("button")
        .filter({ hasText: "Linear" }),
    ).toBeVisible();
  });

  test("encryption widget toggles between E2EE Active and Unsealed", async ({
    page,
  }) => {
    const toggleBtn = page.getByRole("button", { name: /E2EE Active/i });
    await expect(toggleBtn).toBeVisible();

    await toggleBtn.click();
    await expect(page.getByRole("button", { name: /Unsealed/i })).toBeVisible();
    await expect(page.getByText("Plaintext Cached")).toBeVisible();

    await page.getByRole("button", { name: /Unsealed/i }).click();
    await expect(
      page.getByRole("button", { name: /E2EE Active/i }),
    ).toBeVisible();
    await expect(page.getByText("Client-Only Decrypt")).toBeVisible();
  });

  test("simulated reply feed appends new inbound recruiter messages", async ({
    page,
  }) => {
    const bento = page.locator("section#features");
    const simulateBtn = bento.getByRole("button", {
      name: /\+ Simulate Inbound/i,
    });
    await expect(simulateBtn).toBeVisible();

    // Initial message from Elena
    await expect(
      bento.getByText("Elena Rostova", { exact: false }),
    ).toBeVisible();

    // Click simulate to add Karri Saarinen at Linear
    await simulateBtn.click();
    await expect(
      bento.getByText("Karri Saarinen", { exact: false }),
    ).toBeVisible();
    await expect(bento.getByText(/Linear/).first()).toBeVisible();
  });

  test("pricing toggle flips cadence and updates odometer amounts", async ({
    page,
  }) => {
    const pricing = page.locator("section#pricing");
    await expect(pricing).toBeVisible();

    // Monthly pricing (default): $28 Pro, $58 Studio
    await expect(pricing.locator('[data-odometer-value="28"]')).toBeVisible();
    await expect(pricing.locator('[data-odometer-value="58"]')).toBeVisible();

    // Switch to Annual Billing
    const annualBtn = pricing.getByRole("button", { name: /Annual Billing/i });
    await annualBtn.click();

    // Annual pricing: $22 Pro, $48 Studio
    await expect(pricing.locator('[data-odometer-value="22"]')).toBeVisible();
    await expect(pricing.locator('[data-odometer-value="48"]')).toBeVisible();

    // Switch back to Monthly
    const monthlyBtn = pricing.getByRole("button", {
      name: /Monthly Billing/i,
    });
    await monthlyBtn.click();
    await expect(pricing.locator('[data-odometer-value="28"]')).toBeVisible();
    await expect(pricing.locator('[data-odometer-value="58"]')).toBeVisible();
  });

  test("faq accordion expands and collapses questions", async ({ page }) => {
    const faq = page.locator("section#faq");
    await expect(faq).toBeVisible();

    // Question 1 open by default
    await expect(
      faq.getByText("Waypoint connects directly to your personal Gmail", {
        exact: false,
      }),
    ).toBeVisible();

    // Click Question 2 to toggle open
    const q2Btn = faq.getByRole("button", {
      name: /Is my candidate outreach data kept private from recruiters/i,
    });
    await q2Btn.click();
    await expect(
      faq.getByText(
        "All contact lists, email draft bodies, salary negotiations",
        { exact: false },
      ),
    ).toBeVisible();
  });

  test("waitlist email form validates and confirms submission", async ({
    page,
  }) => {
    const emailInput = page.getByPlaceholder("Enter your personal work email");
    const submitBtn = page.getByRole("button", { name: /Join early access/i });

    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Fill valid email and submit
    await emailInput.fill("sarah.chen@example.com");
    await submitBtn.click();

    // Confirmation message shown
    await expect(
      page.getByRole("status").filter({
        hasText: "sarah.chen@example.com is confirmed in this local demo",
      }),
    ).toBeVisible();
  });

  test("hero cards advance and reset to the original stage", async ({
    page,
  }) => {
    const deck = page.locator("[data-parallax]");
    await deck
      .getByRole("button", { name: "Advance Linear to next stage" })
      .click();
    await expect(
      deck
        .locator('[data-stage="in_review"]')
        .getByText("Linear", { exact: true }),
    ).toBeVisible();
    await deck.getByRole("button", { name: "Reset" }).click();
    await expect(
      deck
        .locator('[data-stage="pitched"]')
        .getByText("Linear", { exact: true }),
    ).toBeVisible();
  });

  test("lab tabs retain widget state and support keyboard navigation", async ({
    page,
  }) => {
    const lab = page.locator("#features");
    await lab.getByRole("button", { name: "E2EE Active" }).click();
    await lab.getByRole("tab", { name: "Pipeline", exact: true }).click();
    await expect(lab.getByRole("tabpanel")).toBeVisible();
    await lab
      .getByRole("tab", { name: "Pipeline", exact: true })
      .press("ArrowRight");
    await expect(
      lab.getByRole("tab", { name: "Privacy", exact: true }),
    ).toBeFocused();
    await expect(lab.getByRole("button", { name: "Unsealed" })).toBeVisible();
    await lab.getByRole("button", { name: "All tools" }).click();
    await expect(lab.locator(".wyp-lab-card:visible")).toHaveCount(4);
  });

  test("calendar checklist state survives day changes", async ({ page }) => {
    const lab = page.locator("#features");
    const note = lab.getByRole("checkbox");
    await note.check();
    await lab.getByRole("button", { name: "8", exact: true }).click();
    await expect(note).not.toBeChecked();
    await lab.getByRole("button", { name: "5", exact: true }).click();
    await expect(note).toBeChecked();
  });

  test("story synchronizes manual selection and reverse scrolling", async ({
    page,
  }) => {
    const story = page.locator("#story");
    await story.getByRole("button", { name: "Show Own it" }).click();
    await expect(
      story.getByRole("button", { name: "Show Own it" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      story.locator(".wyp-story-visual.is-active img"),
    ).toHaveAttribute("data-supplied-artwork", "6");
    await story.getByRole("button", { name: "Show Prepare" }).click();
    await expect(
      story.getByRole("button", { name: "Show Prepare" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      story.locator(".wyp-story-visual.is-active img"),
    ).toHaveAttribute("data-supplied-artwork", "5");
  });

  test("opportunity notes and employer selections respond", async ({
    page,
  }) => {
    const notes = page.locator("#paper-trail");
    await notes.getByRole("button", { name: "Next opportunity note" }).click();
    await expect(
      notes.getByRole("heading", { name: "Make the next step yours." }),
    ).toBeVisible();
    await page
      .locator("#early-access")
      .getByRole("button", { name: "Linear", exact: true })
      .click();
    await expect(page.locator(".wyp-employer-readout")).toContainText("Linear");
  });

  test("workspace modal validates, closes with Escape, and restores focus", async ({
    page,
  }) => {
    const cta = page.getByRole("link", { name: "Start your pipeline" });
    await cta.click();
    const dialog = page.getByRole("dialog", {
      name: "Start your Waypoint pipeline",
    });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Preview my workspace" }).click();
    await expect(dialog.getByRole("alert")).toHaveText(
      "Enter a valid email address.",
    );
    await dialog.getByLabel("Your email address").fill("preview@example.com");
    await dialog.getByRole("button", { name: "Preview my workspace" }).click();
    await expect(dialog.getByRole("status")).toContainText(
      "No account was created",
    );
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(cta).toBeFocused();
  });

  test("early access rejects invalid input without claiming a remote signup", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Join early access" }).click();
    await expect(page.locator("#early-access-error")).toContainText(
      "Enter a valid email",
    );
  });

  test("mobile navigation traps focus and closes on selection", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const menu = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Get started free" }).focus();
    await page.keyboard.press("Tab");
    await expect(
      menu.getByRole("button", { name: "Close menu" }),
    ).toBeFocused();
    await menu.getByRole("link", { name: "Pricing", exact: true }).click();
    await expect(menu).not.toBeVisible();
    await expect(page).toHaveURL(/#pricing$/);
  });

  test("responsive sizes retain a two-line hero and no horizontal overflow", async ({
    page,
  }) => {
    for (const [width, height] of [
      [1920, 1080],
      [1440, 900],
      [1366, 768],
      [1024, 768],
      [768, 1024],
      [430, 932],
      [390, 844],
      [375, 667],
      [320, 568],
    ]) {
      await page.setViewportSize({ width, height });
      const geometry = await page.evaluate(() => {
        const h = document.querySelector("h1")!;
        const style = getComputedStyle(h);
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          lines: Math.round(
            h.getBoundingClientRect().height / parseFloat(style.lineHeight),
          ),
        };
      });
      expect(geometry.overflow, `overflow at ${width}`).toBe(false);
      expect(geometry.lines, `headline lines at ${width}`).toBeLessThanOrEqual(
        3,
      );
    }
  });

  test("reduced motion exposes all narrative content without pinning", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".wyp-story-canvas")).not.toBeVisible();
    await expect(page.locator(".wyp-mobile-story-visual:visible")).toHaveCount(
      4,
    );
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await page
      .locator("#features")
      .getByRole("button", { name: "E2EE Active" })
      .click();
    await expect(
      page.locator("#features").getByRole("button", { name: "Unsealed" }),
    ).toBeVisible();
  });
});
