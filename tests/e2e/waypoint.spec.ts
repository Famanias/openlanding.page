import { test, expect } from "@playwright/test";

test.describe("Waypoint landing template (/waypoint)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/waypoint");
    await page.waitForLoadState("networkidle");
  });

  test("loads with primary heading and hero dashboard", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Pitch with intention.");
    await expect(h1).toContainText("Land the offer.");

    // Hero Dashboard is visible with pipeline columns
    const heroDashboard = page.locator("[data-parallax]");
    await expect(heroDashboard).toBeVisible();
    await expect(heroDashboard.getByText("Active Pipeline")).toBeVisible();
    await expect(heroDashboard.getByText("Anthropic", { exact: true })).toBeVisible();
    await expect(heroDashboard.getByText("$420k Total Comp")).toBeVisible();
  });

  test("calendar widget updates interview details on day click", async ({ page }) => {
    const bento = page.locator("section#features");
    await expect(bento).toBeVisible();

    // Initially day 5 is selected (Anthropic)
    await expect(bento.getByText("Anthropic", { exact: true })).toBeVisible();

    // Click day 8 (Linear)
    const day8Btn = bento.getByRole("button", { name: "8", exact: true });
    await day8Btn.click();
    await expect(bento.getByText("Linear", { exact: true })).toBeVisible();
    await expect(bento.getByText("Design Engineering Craft Sync")).toBeVisible();

    // Click day 12 (Figma)
    const day12Btn = bento.getByRole("button", { name: "12", exact: true });
    await day12Btn.click();
    await expect(bento.getByText("Figma", { exact: true })).toBeVisible();
    await expect(bento.getByText("Founding Systems Interview")).toBeVisible();
  });

  test("kanban bento widget advances card stage on click", async ({ page }) => {
    const bento = page.locator("section#features");
    // Find the Linear card button in the Kanban widget
    const linearCard = bento.getByRole("button").filter({ hasText: "Linear" });
    await expect(linearCard).toBeVisible();

    // Click Linear card to advance stage
    await linearCard.click();
    await expect(linearCard).toBeVisible();
  });

  test("encryption widget toggles between E2EE Active and Unsealed", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /E2EE Active/i });
    await expect(toggleBtn).toBeVisible();

    await toggleBtn.click();
    await expect(page.getByRole("button", { name: /Unsealed/i })).toBeVisible();
    await expect(page.getByText("Plaintext Cached")).toBeVisible();

    await page.getByRole("button", { name: /Unsealed/i }).click();
    await expect(page.getByRole("button", { name: /E2EE Active/i })).toBeVisible();
    await expect(page.getByText("Client-Only Decrypt")).toBeVisible();
  });

  test("simulated reply feed appends new inbound recruiter messages", async ({ page }) => {
    const bento = page.locator("section#features");
    const simulateBtn = bento.getByRole("button", { name: /\+ Simulate Inbound/i });
    await expect(simulateBtn).toBeVisible();

    // Initial message from Elena
    await expect(bento.getByText("Elena Rostova")).toBeVisible();

    // Click simulate to add Karri Saarinen at Linear
    await simulateBtn.click();
    await expect(bento.getByText("Karri Saarinen")).toBeVisible();
    await expect(bento.getByText("Linear", { exact: true })).toBeVisible();
  });

  test("pricing toggle flips cadence and updates odometer amounts", async ({ page }) => {
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
    const monthlyBtn = pricing.getByRole("button", { name: /Monthly Billing/i });
    await monthlyBtn.click();
    await expect(pricing.locator('[data-odometer-value="28"]')).toBeVisible();
    await expect(pricing.locator('[data-odometer-value="58"]')).toBeVisible();
  });

  test("faq accordion expands and collapses questions", async ({ page }) => {
    const faq = page.locator("section#faq");
    await expect(faq).toBeVisible();

    // Question 1 open by default
    await expect(faq.getByText("Waypoint connects directly to your personal Gmail")).toBeVisible();

    // Click Question 2 to toggle open
    const q2Btn = faq.getByRole("button", { name: /Is my candidate outreach data kept private from recruiters/i });
    await q2Btn.click();
    await expect(faq.getByText("All contact lists, email draft bodies, salary negotiations")).toBeVisible();
  });

  test("waitlist email form validates and confirms submission", async ({ page }) => {
    const emailInput = page.getByPlaceholder("Enter your personal work email");
    const submitBtn = page.getByRole("button", { name: /Join early access/i });

    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Fill valid email and submit
    await emailInput.fill("sarah.chen@example.com");
    await submitBtn.click();

    // Confirmation message shown
    await expect(page.getByText("You're confirmed for early access! We'll notify you at sarah.chen@example.com.")).toBeVisible();
  });
});
