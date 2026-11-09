import { expect, test } from "@playwright/test";

const route = process.env.KINFIELD_TEST_PATH ?? "/templates/kinfield";

test("atlas changes routine by zone and level, and resets", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: "hips", exact: false }).last().click();
  await page.getByRole("button", { name: "experienced", exact: true }).click();
  await expect(page.getByText("Deep supported hip transitions")).toBeVisible();
  await expect(page.locator(".kf-routine")).toContainText("12 MIN");
  await page.getByRole("button", { name: "experienced", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByText("Standing hip hinges")).toBeVisible();
  await page.getByRole("button", { name: /Reset atlas/ }).click();
  await expect(page.getByText("Slow shoulder rolls")).toBeVisible();
});

test("class selection carries into a validated local preview", async ({ page }) => {
  await page.goto(route);
  await page.getByRole("button", { name: /Range Lab/ }).click();
  await expect(page.getByLabel("01 / CHOOSE YOUR PRACTICE")).toHaveValue("range");
  await page.getByRole("button", { name: "Review your preview" }).click();
  await expect(page.locator("#kf-date-error")).toContainText("Choose a date");
  const date = new Date(); date.setDate(date.getDate() + 1);
  const day = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  await page.getByLabel("02 / CHOOSE A DATE").fill(day);
  await page.getByRole("button", { name: "Review your preview" }).click();
  await expect(page.getByText("Preview only — no reservation made.")).toBeVisible();
  await expect(page.locator(".kf-review-details")).toContainText("Range Lab");
  await page.getByRole("button", { name: /Slow Strength/ }).click();
  await expect(page.getByText("Preview only — no reservation made.")).toBeHidden();
  await expect(page.locator(".kf-review-details")).toContainText("Slow Strength");
  await page.getByRole("button", { name: "Review your preview" }).click();
  await page.getByRole("button", { name: /Adjust your selection/ }).click();
  await expect(page.getByText("Preview only — no reservation made.")).toBeHidden();
});

test("mobile navigation, portrait controls and layout work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await page.getByRole("button", { name: "Portrait 2" }).click();
  await expect(page.getByRole("button", { name: "Portrait 2" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Open chapter navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("button", { name: "Open chapter navigation" })).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("the desktop portrait opens with scroll and reverses", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route);
  await page.waitForTimeout(1400);
  const portrait = page.locator(".kf-hero-image");
  const start = await portrait.evaluate((element) => getComputedStyle(element).clipPath);
  const hero = await page.locator(".kf-hero").boundingBox();
  expect(hero).not.toBeNull();
  await page.evaluate((distance) => window.scrollTo(0, distance), hero!.height - 900);
  await expect.poll(() => portrait.evaluate((element) => getComputedStyle(element).clipPath)).not.toBe(start);
  await expect.poll(() => page.locator(".kf-pose-2").evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.9);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => portrait.evaluate((element) => getComputedStyle(element).clipPath)).toBe(start);
});

test("reduced motion and no JavaScript leave the content readable", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(route);
  await expect(page.getByText("Move in your")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Get to know/ })).toBeVisible();
  await expect(page.getByText(/no reservation is made/i).first()).toBeVisible();
  await context.close();
});
