import { test, expect } from "@playwright/test";

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
