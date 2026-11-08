import { expect, test } from "@playwright/test";

test.describe("patchbay", () => {
  test("renders the page and defaults to Full-stack", async ({ page }) => {
    await page.goto("/templates/patchbay");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("One engineer from");
    await expect(page.getByRole("radio", { name: /Full-stack/ })).toHaveAttribute("aria-checked", "true");
  });

  test("clicking a jack switches the role and re-ranks projects", async ({ page }) => {
    await page.goto("/templates/patchbay");
    const aiJack = page.getByRole("radio", { name: /AI/ });
    await aiJack.click();
    await expect(aiJack).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Models in production");

    // In AI role, Marginalia is ranked first
    const firstProject = page.locator("#work .pby-card").first();
    await expect(firstProject.getByRole("heading", { level: 3 })).toHaveText("Marginalia");

    // Switching to UX/UI ranks Fieldnote first
    const designJack = page.getByRole("radio", { name: /UX\/UI/ });
    await designJack.click();
    await expect(designJack).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Clear flows");
    const firstDesignProject = page.locator("#work .pby-card").first();
    await expect(firstDesignProject.getByRole("heading", { level: 3 })).toHaveText("Fieldnote");
  });

  test("deep link ?role=web activates web front-end role directly", async ({ page }) => {
    await page.goto("/templates/patchbay?role=web");
    await expect(page.getByRole("radio", { name: /Web/ })).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Interfaces that feel");
  });

  test("patch bay keyboard navigation navigates with arrow keys", async ({ page }) => {
    await page.goto("/templates/patchbay");
    const fullstackJack = page.getByRole("radio", { name: /Full-stack/ });
    await fullstackJack.focus();
    await page.keyboard.press("ArrowRight");
    const aiJack = page.getByRole("radio", { name: /AI/ });
    await expect(aiJack).toHaveAttribute("aria-checked", "true");
    await expect(aiJack).toBeFocused();
  });

  test("contact form validates input, then displays success ticket and download", async ({ page }) => {
    await page.goto("/templates/patchbay#contact");
    const submitBtn = page.getByRole("button", { name: "Prepare my brief" });
    await submitBtn.click();
    await expect(page.getByText("Tell me who's writing.")).toBeVisible();

    await page.getByLabel("Your name").fill("Alex Vance");
    await page.getByLabel("Email").fill("alex@blackmesa.test");
    await page.getByLabel("What are you building?").fill("We need an evaluation suite and latency tracing harness for our agent pipeline.");
    await submitBtn.click();

    const success = page.locator(".pby-success");
    await expect(success).toBeVisible({ timeout: 4000 });
    await expect(page.locator(".pby-success-ref")).toHaveText(/^Ticket PB-[0-9A-Z]{6}$/);
    await expect(page.getByRole("button", { name: "Download brief" })).toBeVisible();
  });

  test("reveals flip to data-in on scroll", async ({ page }) => {
    await page.goto("/templates/patchbay");
    const processStep = page.locator("#process [data-reveal]").first();
    await processStep.scrollIntoViewIfNeeded();
    await expect(processStep).toHaveAttribute("data-in", "true");
  });

  test("renders finished layout under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/templates/patchbay");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });
});
