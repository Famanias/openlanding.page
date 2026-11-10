import { expect, test } from "@playwright/test";

test.describe("RADIUS", () => {
  test("build choices update the same view and reset independently", async ({ page }) => {
    await page.goto("/templates/radius");
    await expect(page.getByRole("heading", { level: 1, name: "Every street is yours." })).toBeVisible();
    await page.getByRole("radio", { name: "Tangerine" }).check();
    await expect(page.locator(".rd-build__bike-image[data-previous='true']")).toHaveCount(1);
    await expect(page.locator(".rd-build__bike-image[data-previous='true']")).toHaveCSS("clip-path", "inset(0px)");
    await page.getByRole("radio", { name: /Gravel/ }).check();
    await page.getByRole("checkbox", { name: /Rear rack/ }).check();
    await page.getByRole("checkbox", { name: /Front basket/ }).check();
    await page.getByRole("checkbox", { name: /Lights/ }).check();
    await expect(page.locator(".rd-build__summary-text")).toContainText(/Tangerine.*gravel.*rack.*basket.*lights/i);
    await expect(page.locator(".rd-build__bike-image[data-previous='true']")).toHaveCount(0);
    await expect(page.locator(".rd-build__bike-image[data-active='true'] img")).toHaveAttribute("alt", /tangerine/i);
    for (const part of ["rack", "basket", "lights", "tire"]) {
      await expect(page.locator(`.rd-build__part--${part}`)).toHaveAttribute("data-active", "true");
    }
    await page.getByRole("button", { name: /Reset build/ }).click();
    await expect(page.getByRole("radio", { name: "Graphite" })).toBeChecked();
    await expect(page.getByRole("radio", { name: /City/ })).toBeChecked();
    await expect(page.getByRole("checkbox", { name: /Rear rack/ })).not.toBeChecked();
    await expect(page.locator(".rd-build__summary-text")).toContainText(/no accessories/i);
  });

  test("terrain is keyboard operable and the interest form is an honest local preview", async ({ page }) => {
    await page.goto("/templates/radius#ride");
    const slider = page.getByRole("slider", { name: /Change the terrain/ });
    await expect(slider).toBeEnabled();
    await slider.focus();
    await page.keyboard.press("End");
    await expect(slider).toHaveAttribute("aria-valuetext", "Rougher ground");
    await expect(page.getByRole("button", { name: "ROUGH" })).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Preview interest" }).click();
    await expect(page.locator("#rd-name-error")).toBeVisible();
    await page.getByLabel("Your name").fill("Mina Rider");
    await page.getByLabel("Email address").fill("mina@example.com");
    await page.getByRole("button", { name: "Preview interest" }).click();
    await expect(page.getByRole("status")).toContainText("Nothing was sent or saved");
    await page.getByRole("button", { name: /Try the form again/ }).click();
    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(page.locator(".rd-interest__form")).toHaveAttribute("data-in", "true");
  });

  test("phone layout keeps the bike and controls inside the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/templates/radius");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    const bike = await page.locator(".rd-hero-bike img").boundingBox();
    expect(bike).not.toBeNull();
    expect(bike!.x).toBeGreaterThanOrEqual(0);
    expect(bike!.x + bike!.width).toBeLessThanOrEqual(390);
    await page.getByLabel("Menu", { exact: true }).click();
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
  });

  test("the diagonal billboard responds to scrolling", async ({ page }) => {
    await page.goto("/templates/radius");
    await page.waitForTimeout(1400);
    const before = await page.locator(".rd-hero-field").evaluate(node => getComputedStyle(node).clipPath);
    await page.evaluate(() => window.scrollTo(0, 350));
    await expect.poll(() => page.locator(".rd-hero-field").evaluate(node => getComputedStyle(node).clipPath)).not.toBe(before);
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await expect.poll(() => page.locator(".rd-hero").evaluate(node => getComputedStyle(node).getPropertyValue("--rd-unfold-top").trim())).toBe("0%");
    await expect.poll(() => page.locator(".rd-hero").evaluate(node => getComputedStyle(node).getPropertyValue("--rd-unfold-bottom").trim())).toBe("0%");
    const wipe = page.locator(".rd-blueprint");
    await wipe.scrollIntoViewIfNeeded();
    await expect(wipe).toHaveAttribute("data-in", "true");
    const drawing = page.locator(".rd-exp-footer [data-reveal='draw']");
    await drawing.scrollIntoViewIfNeeded();
    await expect(drawing).toHaveAttribute("data-in", "true");
  });
});

test("reduced motion exposes every reveal", async ({ browser }) => {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto("/templates/radius");
  const hidden = await page.locator("[data-reveal]").evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).opacity === "0" || getComputedStyle(node).clipPath === "inset(0px 100% 0px 0px)").length);
  expect(hidden).toBe(0);
  await page.getByRole("radio", { name: "Tangerine" }).check();
  await expect(page.locator(".rd-build__bike-image[data-previous='true']")).toHaveCount(0);
  await page.close();
});

test("without JavaScript the page and model remain visible", async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 320, height: 700 } });
  await page.goto("/templates/radius");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".rd-build__bike-image[data-active='true'] img")).toBeVisible();
  await expect(page.getByRole("radio", { name: "Tangerine" })).toBeDisabled();
  await expect(page.locator(".rd-build__noscript")).toHaveText("Enable JavaScript to change the build.");
  await expect(page.getByRole("slider", { name: /Change the terrain/ })).toBeDisabled();
  await expect(page.locator(".rd-terrain noscript .rd-terrain__help")).toContainText("interactive when JavaScript is enabled");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.close();
});
