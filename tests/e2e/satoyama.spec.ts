import { expect, test } from "@playwright/test";

test("picture book turns chapters, follows direct links, and preserves browser history", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Let’s wander a while" }).click();
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
  await page.getByRole("button", { name: "Chapter 4: Little adventures", exact: true }).click();
  await expect(page).toHaveURL(/#little-adventures$/);
  await page.goBack();
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
  await page.goto("/satoyama#the-seasons");
  await expect(page.getByRole("tab", { name: /Spring/ })).toBeVisible();
});

test("keyboard navigation clamps book edges without stealing buttons", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await page.locator('main').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
  await page.keyboard.press("End");
  await expect(page.getByRole("button", { name: "Next chapter", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Previous chapter", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator('#until-next-time')).toHaveAttribute("data-state", "active");
  await page.keyboard.press("Enter");
  await expect(page.locator('#the-seasons')).toHaveAttribute("data-state", "active");
});

test("mouse wheel scrolling turns chapters forward and backward", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await expect(page.locator('#welcome')).toHaveAttribute("data-state", "active");

  await page.mouse.wheel(0, 100);
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");

  await page.mouse.wheel(0, 100);
  await expect(page.locator('#a-slower-rhythm')).toHaveAttribute("data-state", "active");

  await page.mouse.wheel(0, -100);
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
});

test("activities animate in either direction and loop", async ({ page }) => {
  await page.goto("/satoyama#little-adventures");
  const carousel = page.locator('.st-carousel');
  await expect(carousel).toHaveAttribute("data-index", "0");
  await carousel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(carousel).toHaveAttribute("data-index", "1");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(carousel).toHaveAttribute("data-index", "4");
  await expect(page.locator('.st-carousel-track')).toHaveCSS('transition-property', 'transform');
});

test("season tabs are keyboard operable and recolour the valley", async ({ page }) => {
  await page.goto("/satoyama#the-seasons");
  await page.getByRole("tab", { name: /Spring/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Summer/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("song of cicadas");
  await page.keyboard.press("End");
  await expect(page.locator('.st-seasons')).toHaveAttribute("data-season", "3");
  await expect(page.getByRole("tabpanel")).toContainText("quiet has a season");
});

test("every chapter and every season is painted as its own scene", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  const labels = await page.locator(".st-scene").evaluateAll((scenes) => scenes.map((scene) => scene.getAttribute("aria-label")));
  expect(labels).toHaveLength(9);
  expect(new Set(labels).size).toBe(9);
  await page.goto("/satoyama#the-seasons");
  await expect(page.locator('#the-seasons')).toHaveAttribute("data-state", "active");
  await expect(page.locator('.st-season-layer[data-on="true"] .st-scene-spring')).toBeVisible();
  await page.getByRole("tab", { name: /Autumn/ }).click();
  await expect(page.locator('.st-season-layer[data-on="true"] .st-scene-autumn')).toBeVisible();
  await expect(page.locator('.st-season-layer[data-on="true"]')).toHaveCount(1);
});

test("landscape animation pauses and reduced motion keeps content visible", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Pause landscape animation" }).click();
  await expect(page.locator('#welcome .st-clouds')).toHaveCSS("animation-play-state", "paused");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('#welcome .st-clouds')).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Next chapter", exact: true }).click();
  await expect(page.locator('#the-landscape h2')).toBeVisible();
});

test("phone layout has no horizontal overflow across all chapters and supports swipe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  for (let i = 1; i <= 6; i++) {
    await page.getByRole("button", { name: new RegExp(`^Chapter ${i}:`) }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto("/satoyama#little-adventures");
  const carousel = page.locator('.st-carousel');
  await expect(carousel).toHaveAttribute("data-index", "0");
  await carousel.evaluate(element => {
    const start = new Touch({ identifier: 1, target: element, clientX: 300, clientY: 400 });
    const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 400 });
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [end] }));
  });
  await expect(carousel).toHaveAttribute("data-index", "1");
  await expect(page.locator('#little-adventures')).toHaveAttribute("data-state", "active");
});

test("without JavaScript all chapters remain readable in document flow", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/satoyama");
  for (const id of ["welcome", "the-landscape", "a-slower-rhythm", "little-adventures", "the-seasons", "until-next-time"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator(`#${id}`)).toHaveCSS("position", "relative");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
