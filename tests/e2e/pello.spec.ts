import { test, expect } from "@playwright/test";

test.describe("Pello original finance template", () => {
  test("a plan accounts for the full balance and carries its goal into signup", async ({ page }) => {
    await page.goto("/pello");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Make room foryour next big thing.");
    await page.getByRole("radio", { name: /A softer landing/ }).check();
    await expect.poll(() => page.locator(".pel-transfer-dot").evaluate(el => Number(el.getAnimations()[0]?.effect?.getTiming().duration ?? 0))).toBeGreaterThanOrEqual(200);
    await expect(page.locator('output[aria-label="Everyday living allocation"]')).toHaveText("$1,080");
    await expect(page.locator('output[aria-label="A rainy day allocation"]')).toHaveText("$1,080");
    await expect(page.locator('output[aria-label="Weekend away allocation"]')).toHaveText("$240");
    const range = page.getByRole("slider", { name: "Weekend contribution" });
    await range.focus();
    await range.press("End");
    await expect(page.locator('output[aria-label="Weekend away allocation"]')).toHaveText("$1,200");
    await expect(page.locator('output[aria-label="Everyday living allocation"]')).toHaveText("$120");
    await page.getByRole("link", { name: "Make this my starting point" }).click();
    await expect(page).toHaveURL(/plan=steady&goal=1200#begin$/);
    await expect(page.locator(".pel-signup-plan")).toContainText("A softer landing");
  });

  test("form validation and the local welcome preserve the selected plan", async ({ page }) => {
    await page.goto("/pello?plan=adventure&goal=840#begin");
    const email = page.getByRole("textbox", { name: "Your email address" });
    await expect(email).toBeEnabled();
    await email.fill("not-an-email");
    await page.getByRole("button", { name: "Make room for what’s next" }).click();
    await expect(page.locator("#pel-email-error")).toContainText("Enter an email address");
    await email.fill("hello@example.com");
    await page.getByRole("button", { name: "Make room for what’s next" }).click();
    await expect(page.locator(".pel-welcome")).toContainText("Something to look forward to");
    await expect(page.locator(".pel-welcome")).toContainText("$840");
    await expect(page.locator(".pel-welcome")).toContainText("No email was sent or stored");
    await expect(page.locator(".pel-welcome")).toBeFocused();
    await page.getByRole("button", { name: "Try a different beginning" }).click();
    await expect(email).toBeFocused();
  });

  test("section motion, story changes and legal dialogs remain functional", async ({ page }) => {
    await page.goto("/pello");
    await expect(page.locator("#pel-site")).toHaveAttribute("data-paused", "false");
    await expect(page.locator("#living [data-reveal]").first()).toHaveAttribute("data-in", "false");
    await page.locator("#living").scrollIntoViewIfNeeded();
    await expect(page.locator("#living [data-reveal]").first()).toHaveAttribute("data-in", "true");
    for (const reveal of [".pel-journal-story-0 [data-reveal=wipe]", ".pel-product-heading [data-reveal=mask]", ".pel-product-phone"]) {
      await page.locator(reveal).evaluate(el => el.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(page.locator(reveal)).toHaveAttribute("data-in", "true");
    }
    await page.getByRole("button", { name: /Daniel’s perspective/ }).click();
    await expect(page.locator('.pel-quote[data-active="true"]')).toContainText("rainy day fund");
    await page.getByText("Does trying the planner move real money?", { exact: true }).click();
    await expect(page.locator("details[open]")).toContainText("No. The planner uses a sample balance");
    await page.getByRole("link", { name: "Privacy", exact: true }).click();
    await expect(page.locator("dialog.pel-legal")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("link", { name: "Privacy", exact: true })).toBeFocused();
    const images = await page.locator("img[data-asset]").evaluateAll(nodes => nodes.map(node => (node as HTMLImageElement).getAttribute("data-asset")));
    expect(new Set(images).size).toBe(5);
  });

  test("390px touch navigation and planner do not overflow", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto("/pello");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.locator("#pel-menu")).toBeVisible();
    await page.locator("#pel-menu").getByRole("link", { name: /Find your balance/ }).click();
    await expect(page.locator("#pel-menu")).not.toBeVisible();
    await page.getByRole("radio", { name: /Something to look forward to/ }).check();
    await expect(page.locator('output[aria-label="Weekend away allocation"]')).toHaveText("$840");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
    await context.close();
  });

  test("reduced motion shows every reveal and stops spatial animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/pello");
    const hidden = await page.locator("[data-reveal]").evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).opacity !== "1" || getComputedStyle(node).clipPath !== "none").length);
    expect(hidden).toBe(0);
    expect(await page.locator(".pel-product-note").evaluate(node => getComputedStyle(node).animationName)).toBe("none");
  });

  test("no JavaScript keeps the complete page and balanced example visible", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto("/pello");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('output[aria-label="Everyday living allocation"]')).toHaveText("$1,200");
    expect(await page.locator("[data-reveal]").evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === "1"))).toBe(true);
    await expect(page.getByRole("textbox", { name: "Your email address" })).toBeDisabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  });
});
