import { test, expect } from "@playwright/test";
test.describe("NOMI glass workspace",()=>{test("launches phone states and submits a walkthrough request",async({page})=>{await page.goto("/nomi");await expect(page.getByRole("heading",{name:/Make every lesson feel looked after/i})).toBeVisible();await page.locator("#launch").scrollIntoViewIfNeeded();await page.getByRole("button",{name:/Schedule/i}).click();await expect(page.locator(".nm-app-card strong")).toContainText("Your week, with room");await page.getByRole("link",{name:/Book a demo/i}).click();await page.getByLabel("Your name").fill("Alex Morgan");await page.getByLabel("Studio email").fill("alex@studio.com");await page.getByLabel("Students you support").selectOption("1–25");await page.getByRole("button",{name:/Request a walkthrough/i}).click();await expect(page.getByText("We’ll make room.")).toBeVisible()});test("keeps the phone readable with reduced motion",async({page})=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/nomi");await expect(page.locator(".nm-phone").first()).toBeVisible();await expect(page.locator("h1")).toBeVisible()})});

test.describe("NOMI light workspace motion", () => {
  test("reveals content as it scrolls into view and shows the launch stage pinned", async ({ page }) => {
    await page.goto("/nomi");
    const rows = page.locator(".nm-rows");
    await expect(rows).not.toHaveAttribute("data-in", "true");
    await page.locator("#studios").scrollIntoViewIfNeeded();
    await expect(rows).toHaveAttribute("data-in", "true");
    await expect(page.getByRole("heading", { name: "Close the loop." })).toBeVisible();
  });

  test("choosing a moment from the rail moves the stage and keeps it there", async ({ page }) => {
    await page.goto("/nomi");
    await page.locator("#launch").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Payments/i }).click();
    await expect(page.locator(".nm-app-card strong")).toContainText("Everything settled");
    await expect(page.getByRole("button", { name: /Payments/i })).toHaveAttribute("aria-pressed", "true");
    await page.waitForTimeout(1800);
    await expect(page.locator(".nm-app-card strong")).toContainText("Everything settled");
    await expect(page.locator(".nm-stage")).toHaveAttribute("data-scene", "payments");
  });

  test("the header hides on the way down and returns on the way up", async ({ page }) => {
    await page.goto("/nomi");
    const header = page.locator("[data-nm-header]");
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, 900);
    await expect(header).toHaveAttribute("data-hidden", "true");
    await page.mouse.wheel(0, -300);
    await expect(header).toHaveAttribute("data-hidden", "false");
  });

  test("a bad email shakes the field and explains itself, and nothing is claimed as sent", async ({ page }) => {
    await page.goto("/nomi");
    await page.locator("#demo").scrollIntoViewIfNeeded();
    await page.getByLabel("Your name").fill("Alex Morgan");
    await page.getByLabel("Studio email").fill("alex");
    await page.getByRole("button", { name: /Request a walkthrough/i }).click();
    await expect(page.getByLabel("Studio email")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Add a studio email so we know where to reply.")).toBeVisible();
    await page.getByLabel("Studio email").fill("alex@studio.com");
    await page.getByRole("button", { name: /Request a walkthrough/i }).click();
    await expect(page.getByText("Nothing was sent: this template’s form is not connected yet.")).toBeVisible();
  });

  test("the live tag follows what the visitor types", async ({ page }) => {
    await page.goto("/nomi");
    await page.locator("#demo").scrollIntoViewIfNeeded();
    await page.getByLabel("Your name").fill("Alex Morgan");
    await expect(page.locator(".nm-tag")).toContainText("Alex Morgan");
  });

  test("with reduced motion every reveal is already showing and the stage is not pinned", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/nomi");
    const hidden = await page.locator("[data-nm-reveal]").evaluateAll((els) => els.filter((el) => Number(getComputedStyle(el).opacity) < 1 || getComputedStyle(el).visibility === "hidden").length);
    expect(hidden).toBe(0);
    await expect(page.locator(".nm-stage")).toHaveCSS("position", "static");
    await expect(page.locator(".nm-offer")).toBeVisible();
  });

  test("without scripting the headline, the offer and the form are all there", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/nomi");
    await expect(page.getByRole("heading", { name: /Make every lesson feel looked after/i })).toBeVisible();
    await expect(page.locator(".nm-offer")).toBeVisible();
    await expect(page.getByLabel("Studio email")).toBeVisible();
    await context.close();
  });
});
