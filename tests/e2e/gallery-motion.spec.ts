import { test, expect } from "@playwright/test";

test("gallery controls keep one accessible label and show copy success", async ({ page }) => {
  await page.goto("/");
  const explore = page.getByRole("link", { name: "Explore the templates", exact: true });
  await expect(explore).toBeVisible();
  await explore.hover();
  await expect.poll(() => explore.locator(".action-label-track").evaluate(el => getComputedStyle(el).transform)).not.toBe("none");
  const card = page.locator(".template-card").filter({ hasText: "Orrery" });
  const copy = card.locator('button[title="Copy prompt"]');
  await copy.click();
  await expect(copy).toHaveAccessibleName("Copied prompt");
  await expect(copy.locator(".copy-icon-success")).toHaveCSS("opacity", "1");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Orrery");
  await expect(copy).toHaveAccessibleName("Copy prompt");
  await expect(copy.locator(".copy-icon-default")).toHaveCSS("opacity", "1");
});

test("rapid category changes settle on the current selection and keyboard stays immediate", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "3D & WebGPU" }).click();
  await page.getByRole("tab", { name: "Keynote & Deck" }).click();
  await page.getByRole("tab", { name: /^All/ }).click();
await expect(page.locator(".template-card")).toHaveCount(39);
  await expect(page.locator("[role=tab][aria-selected=true]")).toHaveAccessibleName(/^All/);
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Keynote & Deck" })).toBeFocused();
  await expect(page.locator("#gallery")).toHaveAttribute("data-instant-motion", "true");
  await expect(page.locator(".template-card")).toHaveCount(2);
  await expect(page.locator(".template-card").first()).toHaveCSS("transition-duration", "0s");
  await expect(page.getByRole("tab", { name: "Keynote & Deck" })).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Control+k");
  await page.getByRole("searchbox").fill("orrery");
  await page.keyboard.press("Escape");
  await expect(page.locator("#gallery")).toHaveAttribute("data-instant-motion", "true");
});

test("pending copy and failure recover without a stuck success state", async ({ page }) => {
  let releaseRequest!: () => void;
  const pendingRequest = new Promise<void>(resolve => { releaseRequest = resolve; });
  await page.route(url => url.pathname === "/orrery" || url.pathname.endsWith("/copy/orrery.md"), async route => {
    await pendingRequest;
    await route.fulfill({ status: 503, body: "Unavailable" });
  });
  await page.goto("/");
  const card = page.locator(".template-card").filter({ hasText: "Orrery" });
  const copy = card.getByRole("button", { name: "Download template", exact: true });
  try {
    await copy.click();
    await expect(copy).toBeDisabled();
    await expect(copy.locator(".copy-spinner")).toHaveCSS("opacity", "1");
  } finally {
    releaseRequest();
  }
  await expect(card.getByRole("alert")).toBeVisible();
  await expect(copy).toBeEnabled();
  await expect(copy.locator(".copy-spinner")).toHaveCSS("opacity", "0");
});

test("reduced motion keeps controls stationary and feedback readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const explore = page.getByRole("link", { name: "Explore the templates", exact: true });
  await explore.hover();
  await expect(explore).toHaveCSS("transform", "none");
  await expect(explore.locator(".action-label-track")).toHaveCSS("transform", "none");
  const card = page.locator(".template-card").first();
  await card.hover();
  await expect(card).toHaveCSS("translate", /^(none|0px)$/);
  await card.getByRole("button", { name: "Copy prompt", exact: true }).click();
  await expect(card.locator(".copy-icon-success").first()).toHaveCSS("opacity", "1");
  await expect(card.locator(".copy-icon-success").first()).toHaveCSS("transform", "none");
  await expect(page.locator(".scroll-progress")).toBeHidden();
});

test("mobile touch has no hover lift or horizontal overflow", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto(test.info().project.use.baseURL + "/");
  await page.getByRole("tab", { name: "3D & WebGPU" }).tap();
  await expect(page.locator(".template-card")).toHaveCount(7);
  await expect(page.getByRole("tab", { name: "3D & WebGPU" })).toHaveCSS("transform", "none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await context.close();
});
