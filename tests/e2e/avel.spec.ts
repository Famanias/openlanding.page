import { test, expect } from "@playwright/test";

test("model selector changes the example and demo signup validates locally", async ({ page }) => {
  await page.goto("/avel");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("More room for");
  await page.getByRole("button", { name: /Avel Spark/ }).click();
  await expect(page.getByText("Give me a fresh idea for our launch.")).toBeVisible();
  await expect(page.getByRole("button", { name: /Avel Spark/ })).toHaveAttribute("aria-pressed", "true");
  await page.locator("#avl-email").fill("not-an-email");
  await page.locator(".avl-form button[type=submit]").click();
  await expect(page.locator("#avl-email-error")).toContainText("valid email");
  await page.locator("#avl-email").fill("hello@example.com");
  await page.locator(".avl-form button[type=submit]").click();
  await expect(page.getByRole("status")).toContainText("No email was sent or stored");
});

test("orbit rotates counterclockwise, pauses when reduced motion is requested", async ({ page }) => {
  await page.goto("/avel");
  const orbit = page.locator(".avl-orbit");
  await orbit.scrollIntoViewIfNeeded();
  await expect(orbit).toHaveCSS("animation-name", "avl-rotate");
  const finalTransform = await orbit.evaluate((element) => {
    const animation = element.getAnimations()[0];
    const keyframes = (animation.effect as KeyframeEffect).getKeyframes();
    return keyframes[keyframes.length - 1].transform;
  });
  expect(finalTransform).toBe("rotate(-360deg)");
  await page.getByLabel("Pause rotation").check();
  await expect(orbit).toHaveCSS("animation-play-state", "paused");
  await page.getByLabel("Pause rotation").uncheck();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(orbit).toHaveCSS("animation-name", "none");
});

test("phone layout and no-JavaScript content remain visible", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/avel");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: /A mind for/ })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await context.close();
});
