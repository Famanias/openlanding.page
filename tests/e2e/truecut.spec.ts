import { expect, test } from "@playwright/test";

test.describe("TRUECUT Works conversion flow", () => {
  test("shows proof media, lets visitors choose a scope, and stamps a site visit", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/truecut");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("See the work. Book the next step.");
    await expect(page.locator("[data-video]")).toHaveCount(2);
    await expect(page.locator("[data-asset]").first()).toBeVisible();
    await expect(page.locator(".tc-hero-actions").getByRole("link", { name: /Book a site visit/ })).toBeInViewport();

    await page.locator(".tc-cap-card").nth(1).getByRole("button").click();
    await expect(page.getByRole("radio", { name: "Controls & automation" })).toBeChecked();

    await page.locator("#book").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Stamp my site visit" }).click();
    await expect(page.getByText("Add your name.")).toBeVisible();
    await expect(page.getByText("Enter a work email.")).toBeVisible();

    await page.getByLabel("Your name").fill("Maya");
    await page.getByLabel("Work email").fill("maya@example.com");
    await page.getByRole("radio", { name: "Controls & automation" }).check();
    await page.getByRole("button", { name: "Stamp my site visit" }).click();
    await expect(page.getByRole("status")).toContainText("Site visit requested");
    await expect(page.getByText("TC-CONT")).toBeVisible();
  });

  test("keeps all content visible under reduced motion and fits a phone", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/truecut");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /Book a site visit/ }).first()).toBeVisible();
    const visible = await page.locator("[data-tc-reveal]").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).opacity === "1"));
    expect(visible).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    for (const selector of [".tc-header-inner", ".tc-hero-copy"]) {
      const bounds = await page.locator(selector).boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(16);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(374);
    }
    for (const frame of await page.locator(".tc-video-frame").all()) {
      await expect(frame.locator(".tc-video-poster")).toBeVisible();
      expect(await frame.locator("video").evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
    }
  });

  test("keeps posters and content readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/truecut");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('[data-video="hero-site-reel"] [data-asset]')).toBeVisible();
    await expect(page.locator(".tc-video-control:visible")).toHaveCount(0);
    await context.close();
  });
});
