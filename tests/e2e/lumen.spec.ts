import { test, expect } from "@playwright/test";
import sharp from "sharp";

test("LUMEN renders hero, glass workspace, and playbook download form", async ({ page }) => {
  await page.goto("/lumen");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Make repetitive work");
  await expect(page.locator("#workspace-hero")).toBeVisible();
  await expect(page.locator("#inside-playbook")).toBeVisible();
  await expect(page.locator("#how-it-works")).toBeVisible();
  await expect(page.locator("#faq")).toBeVisible();
  await expect(page.locator("#hero-download-form")).toBeVisible();
});

test("footer glass animates near the viewport and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const meshResponse = page.waitForResponse((response) => response.url().includes("/templates/lumen/footer-glass-mesh.glb"));
  await page.goto("/lumen");
  const glass = page.getByTestId("footer-glass");
  await glass.scrollIntoViewIfNeeded();
  await expect(glass).toHaveAttribute("data-ready", "true", { timeout: 30_000 });
  expect((await meshResponse).ok()).toBe(true);
  await expect(glass.locator('[data-mode="live"] canvas')).toBeAttached();

  if (await page.evaluate(() => CSS.supports("animation-timeline", "view()"))) {
    const before = await glass.evaluate((element) => getComputedStyle(element).transform);
    await page.evaluate(() => window.scrollBy({ top: -280, behavior: "instant" }));
    await expect.poll(() => glass.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(glass.locator("canvas")).toHaveCount(0);
  await expect(glass.locator("img")).toHaveCSS("opacity", "1");
  await expect(glass).toHaveCSS("transform", "none");
});


test("the page halo stays continuous at extreme zoom", async ({ browser, baseURL }) => {
  test.setTimeout(60_000);
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 7600, height: 2400 },
    deviceScaleFactor: 0.25,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto("/lumen");
    await page.locator("#final-download").scrollIntoViewIfNeeded();
    await page.addStyleTag({
      content: ".landing-content, .page-atmosphere__glass > :not(.page-atmosphere__sculpture-halo-c) { visibility: hidden !important; }",
    });
    await page.waitForTimeout(500);

    const halo = page.locator(".page-atmosphere__sculpture-halo-c");
    const box = await halo.boundingBox();
    expect(box).not.toBeNull();
    if (!box) return;
    const clip = { x: 0, y: Math.max(0, Math.floor(box.y) - 650), width: 7600, height: 640 };
    const capture = async () => sharp(await page.screenshot({ clip })).removeAlpha().raw().toBuffer();
    const visible = await capture();
    await halo.evaluate((element) => (element as SVGElement).style.setProperty("overflow", "hidden"));
    await page.waitForTimeout(500);
    const clipped = await capture();
    await halo.evaluate((element) => (element as SVGElement).style.setProperty("display", "none", "important"));
    await page.waitForTimeout(500);
    const withoutHalo = await capture();

    let visiblePixels = 0;
    let clippedPixels = 0;
    for (let i = 0; i < visible.length; i += 3) {
      const difference = (image: Buffer) => Math.abs(image[i] - withoutHalo[i])
        + Math.abs(image[i + 1] - withoutHalo[i + 1])
        + Math.abs(image[i + 2] - withoutHalo[i + 2]);
      if (difference(visible) > 6) visiblePixels++;
      if (difference(clipped) > 6) clippedPixels++;
    }
    expect(visiblePixels).toBeGreaterThan(100);
    expect(clippedPixels).toBe(0);
  } finally {
    await context.close();
  }
});
