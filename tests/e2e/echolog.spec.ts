import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

test.describe("ECHOLOG gallery card and standalone document", () => {
  test("gallery search, prompt, preview, live link, and HTML download work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox").fill("ECHOLOG");
    const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "ECHOLOG", exact: true }) });
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: "ECHOLOG", exact: true })).toHaveAttribute("href", "/templates/echolog");
    await expect.poll(() => card.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);

    // Copy prompt
    await card.getByRole("button", { name: "Copy prompt", exact: true }).click();
    await expect(card.getByRole("button", { name: "Copied prompt", exact: true })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("# Rebuild ECHOLOG");

    // Download HTML
    const downloadEvent = page.waitForEvent("download");
    await card.getByRole("button", { name: "Download HTML", exact: true }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe("echolog.html");
    const downloaded = await readFile((await download.path())!, "utf8");
    const canonical = await readFile(path.join(process.cwd(), "public/downloads/echolog.html"), "utf8");
    expect(downloaded).toBe(canonical);

    // Navigate to template
    const popupEvent = page.waitForEvent("popup");
    await card.getByRole("link", { name: "ECHOLOG", exact: true }).click();
    const popup = await popupEvent;
    await expect(popup).toHaveURL(/\/templates\/echolog$/);
    await expect(popup.locator("h1")).toBeVisible();
  });

  test("live route serves the downloadable page identically without errors", async ({ page, request }) => {
    const original = await readFile(path.join(process.cwd(), "public/downloads/echolog.html"), "utf8");
    for (const url of ["/templates/echolog", "/downloads/echolog.html"]) {
      const response = await request.get(url);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("text/html");
      expect(await response.text()).toBe(original);
    }

    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/templates/echolog");
    await expect(page.locator("h1")).toBeVisible();

    // Verify sections and handset hosts
    const phoneHosts = page.locator(".ec-phone-host");
    await expect(phoneHosts.first()).toBeVisible();
    expect(await phoneHosts.count()).toBe(6);

    // Verify sound field canvas
    const fieldCanvas = page.locator(".ec-sound-field");
    await expect(fieldCanvas.first()).toBeVisible();

    // Verify soundscape switcher
    const rainBtn = page.locator('[data-soundscape-mode="rain"]');
    const cityBtn = page.locator('[data-soundscape-mode="city"]');
    const morningBtn = page.locator('[data-soundscape-mode="morning"]');
    await expect(rainBtn).toBeVisible();
    await expect(rainBtn).toHaveAttribute("aria-pressed", "true");

    await cityBtn.click();
    await expect(cityBtn).toHaveAttribute("aria-pressed", "true");
    await expect(rainBtn).toHaveAttribute("aria-pressed", "false");

    await morningBtn.click();
    await expect(morningBtn).toHaveAttribute("aria-pressed", "true");
    await expect(cityBtn).toHaveAttribute("aria-pressed", "false");

    // Scroll to footer and verify no unhandled runtime exceptions
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(errors).toEqual([]);
  });

  test("recorder simulator and local concept form operate client-side", async ({ page }) => {
    await page.goto("/templates/echolog");

    // Recorder simulator button
    const simBtn = page.locator("#record-sim-btn");
    await simBtn.scrollIntoViewIfNeeded();
    await expect(simBtn).toBeVisible();
    await simBtn.click();

    // Local form validation
    const form = page.locator("#footer-concept-form");
    if (await form.count() > 0) {
      await form.scrollIntoViewIfNeeded();
      const postRequests: string[] = [];
      page.on("request", (req) => {
        if (req.method() !== "GET") postRequests.push(req.url());
      });

      const submitBtn = form.locator('button[type="submit"]');
      await submitBtn.click();
      const feedback = page.locator("#footer-form-feedback");
      await expect(feedback).toBeVisible();
      expect(postRequests).toEqual([]);
    }
  });

  test("mobile navigation supports Escape and reduced motion has no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/templates/echolog");
    await expect(page.locator("h1")).toBeVisible();

    // Mobile menu toggle
    const toggle = page.locator("#mobile-menu-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    // Viewport width containment
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("content is visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await page.goto("/templates/echolog");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("#memories, #record, #soundscape").first()).toBeVisible();
    } finally {
      await context.close();
    }
  });
});
