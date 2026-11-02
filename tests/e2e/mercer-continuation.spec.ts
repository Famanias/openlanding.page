import { expect, test } from "@playwright/test";

test("the copied continuation begins at Selected Work and keeps the original hero", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/mercer");
  const continuation = page.locator('#jm-continuation[data-continuation-ready="true"]');
  await expect(continuation).toBeAttached();
  await expect(continuation.locator(":scope > section").first()).toHaveAttribute("id", "jm-work");
  await expect(continuation.getByText("02 / SELECTED WORK", { exact: true })).toBeAttached();
  await expect(page.locator("#jm-about")).toHaveCount(0);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator(".jm-headline")).toContainText("IMAGINE.");
  await expect(continuation.locator("canvas")).toHaveCount(3);
  await expect(continuation.locator("#jm-contact")).toBeAttached();
  await expect(continuation.locator("#jm-footer")).toBeAttached();
  expect(errors).toEqual([]);
});

test("all three copied studies draw their own canvases and expand inline details", async ({ page }) => {
  await page.goto("/mercer");
  await expect(page.locator('#jm-continuation[data-continuation-ready="true"]')).toBeAttached();
  for (const id of ["jm-project-one", "jm-project-two", "jm-project-three"]) {
    const study = page.locator(`#${id}`);
    await study.scrollIntoViewIfNeeded();
    const canvas = study.locator("canvas");
    expect(await canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL().length)).toBeGreaterThan(5000);
    const toggle = study.getByRole("button", { name: "Explore this study" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(study.locator(".jmc-case-details")).toHaveAttribute("aria-hidden", "false");
    await toggle.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(study.locator(".jmc-case-details")).toHaveAttribute("aria-hidden", "true");
  }
});

test("a study pauses on an actual frame and resumes its authored animation", async ({ page }) => {
  await page.goto("/mercer#jm-project-one");
  await expect(page.locator('#jm-continuation[data-continuation-ready="true"]')).toBeAttached();
  const study = page.locator("#jm-project-one");
  const playback = study.locator("button.jmc-play");
  await playback.click();
  await expect(playback).toHaveAttribute("aria-pressed", "true");
  const canvas = study.locator("canvas");
  const paused = await canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL());
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  expect(await canvas.evaluate((element, previous) => (element as HTMLCanvasElement).toDataURL() === previous, paused)).toBe(true);
  await playback.click();
  await expect(playback).toHaveAttribute("aria-pressed", "false");
  await expect.poll(() => canvas.evaluate((element, previous) => (element as HTMLCanvasElement).toDataURL() !== previous, paused)).toBe(true);
});

test("project navigation, copy email and footer anchors remain functional", async ({ page }) => {
  await page.goto("/mercer#jm-work");
  await expect(page.locator('#jm-continuation[data-continuation-ready="true"]')).toBeAttached();
  const navigation = page.getByRole("navigation", { name: "Jump between projects" });
  await navigation.getByRole("link", { name: "02", exact: true }).click();
  await expect(page).toHaveURL(/#jm-project-two$/);
  await expect(navigation.getByRole("link", { name: "02", exact: true })).toHaveAttribute("aria-current", "true");
  const copy = page.locator("#jm-copy-email");
  await copy.click();
  await expect(copy).toContainText("COPIED");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("jules@example.com");
  expect(await page.locator('#jm-continuation a[href^="#"]').evaluateAll((links) => links.every((link) => document.getElementById((link as HTMLAnchorElement).hash.slice(1))))).toBe(true);
  await page.getByRole("link", { name: "Top of continuation" }).click();
  await expect(page).toHaveURL(/#jm-work$/);
});

test("the copied sections fit mobile viewports and retain visible content without JavaScript", async ({ page, browser, baseURL }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/mercer");
  await expect(page.locator('#jm-continuation[data-continuation-ready="true"]')).toBeAttached();
  for (const id of ["jm-work", "jm-project-two", "jm-project-three", "jm-contact", "jm-footer"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto("/mercer#jm-work");
    await expect(staticPage.locator("#jm-work-title")).toBeVisible();
    await expect(staticPage.locator("#jm-contact-title")).toBeVisible();
  } finally { await context.close(); }
});
