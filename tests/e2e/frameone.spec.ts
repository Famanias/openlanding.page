import { expect, test } from "@playwright/test";

test("a frame opens the reel and Escape returns focus to its origin", async ({ page }) => {
  await page.goto("/templates/frameone");
  const origin = page.locator("[data-frame]").nth(5);
  const neighbor = page.locator("[data-frame]").nth(4);
  await page.waitForTimeout(1600);
  const originBefore = await origin.boundingBox();
  const neighborBefore = await neighbor.boundingBox();
  await origin.focus();
  await origin.press("Enter");
  const viewer = page.getByRole("dialog", { name: /project viewer/i });
  await expect(viewer).toBeVisible();
  await page.waitForTimeout(700);
  const originDuring = await origin.boundingBox();
  const neighborDuring = await neighbor.boundingBox();
  expect(Math.abs(originDuring!.x - originBefore!.x)).toBeLessThan(1);
  expect(Math.abs(neighborDuring!.x - neighborBefore!.x)).toBeGreaterThan(2);
  const firstTitle = await viewer.locator("[data-project-title]").textContent();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.locator("[data-project-title]")).not.toHaveText(firstTitle ?? "");
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(origin).toBeFocused();
});

test("the viewer starts with the exposure that was selected", async ({ page }) => {
  await page.goto("/templates/frameone");
  const frame = page.locator("[data-frame]").nth(4);
  const selectedAsset = await frame.locator("..").locator("[data-asset]").first().getAttribute("data-asset");
  await frame.click();
  await expect(page.getByRole("dialog", { name: /project viewer/i }).locator("[data-asset]").first()).toHaveAttribute("data-asset", selectedAsset!);
});

test("work categories and local inquiry respond to input", async ({ page }) => {
  await page.goto("/templates/frameone");
  await page.getByRole("button", { name: "Commercial", exact: true }).click();
  await expect(page.locator("#work")).toContainText("An Object in Daylight");
  await page.getByRole("button", { name: /prepare inquiry/i }).click();
  await expect(page.getByText(/enter your name/i)).toBeVisible();
  await page.getByLabel("Name").fill("Ari Vale");
  await page.getByLabel("Email").fill("ari@example.com");
  await page.getByLabel("Project details").fill("A short film about the coast.");
  await page.getByRole("button", { name: /prepare inquiry/i }).click();
  await expect(page.getByRole("status")).toContainText(/not been sent/i);
});

test("phone viewer has visible controls and does not autoplay", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/templates/frameone");
  const headline = await page.locator(".fo-headline-frame").boundingBox();
  const firstFrame = await page.locator("[data-frame]").first().boundingBox();
  expect(firstFrame!.y).toBeGreaterThanOrEqual(headline!.y + headline!.height - 1);
  await page.locator("[data-frame]").first().click();
  const viewer = page.getByRole("dialog", { name: /project viewer/i });
  await expect(viewer.getByRole("button", { name: /next project/i })).toBeVisible();
  await expect(viewer.getByRole("button", { name: /play sequence/i })).toBeVisible();
  const controls = await viewer.getByRole("button", { name: /next project/i }).boundingBox();
  expect(controls!.y + controls!.height).toBeLessThanOrEqual(844);
  await expect(viewer).toContainText(/muted/i);
});

test("proof-sheet lighting and tilt respond to a fine pointer without tilting contact frames", async ({ page }) => {
  await page.goto("/templates/frameone");
  const proof = page.locator(".fo-proof-card").first();
  await proof.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const before = await proof.evaluate((element) => getComputedStyle(element).transform);
  const box = await proof.boundingBox();
  await page.mouse.move(box!.x + box!.width * 0.8, box!.y + box!.height * 0.25);
  await expect.poll(() => proof.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
  await expect(proof.locator(".fo-proof-card__glow")).toHaveCSS("opacity", "0.6");
  const frame = page.locator("[data-frame]").first();
  await frame.scrollIntoViewIfNeeded();
  await frame.hover();
  const matrix = await frame.locator("..").evaluate((element) => {
    const value = new DOMMatrix(getComputedStyle(element).transform);
    return [value.m13, value.m23, value.m31, value.m32];
  });
  expect(matrix).toEqual([0, 0, 0, 0]);
});

test("reduced motion leaves content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/templates/frameone");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-frame]").first()).toBeVisible();
  await page.locator("[data-frame]").first().click();
  await expect(page.getByRole("dialog", { name: /project viewer/i })).toBeVisible();
});

test("the page remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/templates/frameone");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("All projects in this portfolio are fictional.").first()).toBeVisible();
  await expect(page.getByRole("button", { name: /prepare inquiry/i })).toBeDisabled();
  await expect(page.getByText(/enable javascript to prepare/i)).toBeVisible();
  await context.close();
});
