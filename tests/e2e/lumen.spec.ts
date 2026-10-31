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
  await page.goto("/lumen");
  const glass = page.getByTestId("footer-glass");
  const meshResponse = page.waitForResponse((response) => response.url().includes("/templates/lumen/footer-glass-mesh.glb"));
  await page.locator("footer").scrollIntoViewIfNeeded();
  expect((await meshResponse).ok()).toBe(true);
  await expect(glass).toHaveAttribute("data-ready", "true", { timeout: 30_000 });
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


test("the page halo continues beyond its SVG viewport when zoomed out", async ({ page }) => {
  await page.setViewportSize({ width: 4500, height: 1700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
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
  const clip = { x: 0, y: Math.max(0, Math.floor(box.y) - 250), width: 4500, height: 240 };
  const withHalo = await sharp(await page.screenshot({ clip })).removeAlpha().raw().toBuffer();
  await halo.evaluate((element) => (element as SVGElement).style.setProperty("display", "none", "important"));
  await page.waitForTimeout(500);
  const withoutHalo = await sharp(await page.screenshot({ clip })).removeAlpha().raw().toBuffer();

  let changedPixels = 0;
  for (let i = 0; i < withHalo.length; i += 3) {
    const difference = Math.abs(withHalo[i] - withoutHalo[i])
      + Math.abs(withHalo[i + 1] - withoutHalo[i + 1])
      + Math.abs(withHalo[i + 2] - withoutHalo[i + 2]);
    if (difference > 6) changedPixels++;
  }
  expect(changedPixels).toBeGreaterThan(100);
});
