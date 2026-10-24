import { expect, test } from "@playwright/test";

test.describe("Alpine Reel", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("lands on Everest and opens a peak dossier", async ({ page }) => {
    await page.goto("/alpine-reel");
    await page.waitForTimeout(3400);
    await expect(page.locator(".arl-readout")).toContainText("Mount Everest");
    await expect(page.locator(".arl-indicator")).toContainText("01");

    await page.locator('.arl-slide[data-copy="2"][data-active="true"] .arl-explore').click({ force: true });
    await expect(page.locator('.arl-details[data-open="true"]')).toBeVisible();
    await expect(page.locator(".arl-details__description")).toContainText("Death Zone");
    await expect(page.locator('.arl-slide[data-open="true"]')).toHaveCount(1);
    await expect
      .poll(() => page.locator('.arl-slide[data-open="true"] .arl-slide__inner').evaluate((el) => getComputedStyle(el).transform))
      .toMatch(/^matrix3d\(/);

    await page.keyboard.press("Escape");
    await expect(page.locator('.arl-details[data-open="true"]')).toHaveCount(0);
    await expect(page.locator('.arl-slide[data-open="true"]')).toHaveCount(0);
  });

  test("shows visible cursor and allows scrolling inside the explore card", async ({ page }) => {
    await page.goto("/alpine-reel");
    await page.waitForTimeout(3400);
    await page.locator('.arl-slide[data-copy="2"][data-active="true"] .arl-explore').click({ force: true });
    const details = page.locator('.arl-details[data-open="true"]');
    await expect(details).toBeVisible();
    // Wait for the 700ms slide-in door transition to complete
    await page.waitForTimeout(800);

    // The cursor inside the explore card must be visible (default/pointer, not none)
    const cursor = await details.evaluate((el) => getComputedStyle(el).cursor);
    expect(cursor).toBe("default");
    const scrollCursor = await page.locator(".arl-details__scroll").evaluate((el) => getComputedStyle(el).cursor);
    expect(scrollCursor).toBe("default");
    const bodyCursor = await page.locator(".arl-details__body").evaluate((el) => getComputedStyle(el).cursor);
    expect(bodyCursor).toBe("default");
    const closeCursor = await page.locator(".arl-details__close").evaluate((el) => getComputedStyle(el).cursor);
    expect(closeCursor).toBe("pointer");

    // Scrolling down inside the explore card
    const scrollContainer = page.locator(".arl-details__scroll");
    await scrollContainer.hover();
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(400);
    const scrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
    expect(scrollTop).toBeGreaterThan(0);
    // The cinema reel should not have navigated while scrolling inside the explore card
    await expect(page.locator(".arl-readout")).toContainText("Mount Everest");
  });

  test("advances with the arrow key", async ({ page }) => {
    await page.goto("/alpine-reel");
    await page.waitForTimeout(3400);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(850);
    await expect(page.locator(".arl-readout")).toContainText("K2");
  });

  // The slide whose frame is nearest the viewport centre: what the visitor is actually looking at.
  const centredSlide = (page: import("@playwright/test").Page) =>
    page.evaluate(() => {
      const cx = window.innerWidth / 2;
      let best: { d: number; el: Element } | null = null;
      document.querySelectorAll(".arl-slide").forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - cx);
        if (!best || d < best.d) best = { d, el };
      });
      const el = (best as { el: Element } | null)?.el;
      const img = el?.querySelector("img");
      return { title: el?.querySelector("h2")?.textContent ?? null, imageLoaded: Boolean(img && img.complete && img.naturalWidth > 0) };
    });

  test("steps back from Everest to Shishapangma with its image and content", async ({ page }) => {
    await page.goto("/alpine-reel");
    await page.waitForTimeout(3400);
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(".arl-readout")).toContainText("Shishapangma");
    await page.waitForTimeout(1200);
    expect(await centredSlide(page)).toEqual({ title: "ShishaPangma", imageLoaded: true });
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1200);
    expect((await centredSlide(page)).title).toBe("MountEverest");
  });

  test("walks the whole loop backward and forward without an empty frame", async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto("/alpine-reel");
    await page.waitForTimeout(3400);
    for (const direction of ["ArrowLeft", "ArrowRight"]) {
      for (let step = 0; step < 15; step += 1) {
        await page.keyboard.press(direction);
        await page.waitForTimeout(900);
        const seen = await centredSlide(page);
        expect(seen.title, `${direction} step ${step + 1}`).not.toBeNull();
        expect(seen.imageLoaded, `${direction} step ${step + 1}`).toBe(true);
      }
    }
  });

  test("stays readable on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/alpine-reel");
    await page.waitForTimeout(500);
    await expect(page.locator(".arl-reel")).toHaveCSS("overflow", "clip");
    await expect(page.locator('.arl-slide[data-copy="2"][data-active="true"] .arl-explore')).toBeVisible();
  });

  test("reduced motion skips the entrance", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/alpine-reel");
    await expect(page.locator(".arl-readout")).toContainText("Mount Everest");
    await expect(page.locator('.arl-slide[data-copy="2"][data-active="true"] .arl-slide__content')).toHaveCSS("opacity", "1");
  });
});
