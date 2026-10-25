import { test, expect } from "@playwright/test";

test("search, provider, category, reset and URL hydration work together", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "OpenAI", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(14);
  await page.getByRole("tab", { name: "3D & WebGPU" }).click();
  await expect(page.locator("article")).toHaveCount(4);
  await page.getByRole("searchbox").fill("trace");
  await expect(page.locator("article")).toHaveCount(1);
  await expect(page).toHaveURL(/q=trace/);
  await page.reload();
  await expect(page.getByRole("searchbox")).toHaveValue("trace");
  await expect(page.locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "Claude", exact: true }).click();
  await expect(page.getByText("No templates found.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(29);
  await expect(page.getByRole("searchbox")).toHaveValue("");
});

test("all model families return real matching templates", async ({ page }) => {
  await page.goto("/");
  for (const [model, count] of [["Claude", 10], ["Gemini", 4], ["Other", 1]] as const) {
    await page.getByRole("button", { name: model, exact: true }).click();
    await expect(page.locator("article")).toHaveCount(count);
  }
});

test("preview shows the full 16:9 video and screenshot moves on hover", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("article").first();
  const preview = card.locator(".template-preview");
  const box = await preview.boundingBox();
  expect(box!.height / box!.width).toBeCloseTo(9 / 16, 2);
  await expect(card.locator("video")).toHaveCSS("object-fit", "contain");
  await card.hover();
  await expect(card).toHaveAttribute("data-previewing", "true");
  await expect.poll(() => card.locator("img").evaluate((img) => getComputedStyle(img).transform)).not.toBe("none");
  await expect(card.getByRole("button", { name: /preview/i })).toHaveCount(0);
  await page.getByRole("searchbox").hover();
  await expect(card).toHaveAttribute("data-previewing", "false");
  await expect(card.locator("img")).toHaveCSS("transform", "none");
});

test("keyboard shortcut, clear, and browser history resynchronize the search", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("searchbox")).toBeFocused();
  await page.getByRole("searchbox").fill("sundial");
  await expect(page.locator("article")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.locator("article")).toHaveCount(29);
  await page.evaluate(() => { history.pushState(null, "", "?model=gemini&q=bathys"); dispatchEvent(new PopStateEvent("popstate")); });
  await expect(page.getByRole("searchbox")).toHaveValue("bathys");
  await expect(page.locator("article")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator("article")).toHaveCount(29);
});

test("reduced motion disables image pan and mobile retains search", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("searchbox")).toBeVisible();
  await page.locator("article").first().hover();
  expect(await page.locator("article img").first().evaluate((img) => getComputedStyle(img).animationName)).toBe("none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test("visible videos autoplay without hover, pause offscreen, and resume", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("article").first();
  const video = card.locator("video");
  await expect(card).toHaveAttribute("data-previewing", "false");
  await expect(card).toHaveAttribute("data-playing", "true");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted && el.loop && el.playsInline)).toBe(true);
  await card.hover();
  await page.getByRole("searchbox").hover();
  await expect(card).toHaveAttribute("data-playing", "true");
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);

  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await expect(card).toHaveAttribute("data-playing", "false");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await expect(card).toHaveAttribute("data-playing", "true");
});

test("autoplay responds to motion preferences and tab visibility", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("article").first();
  const video = card.locator("video");
  await expect(card).toHaveAttribute("data-playing", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await expect(video).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false);
});

test("every gallery video stays muted at zero volume, including after resume", async ({ page }) => {
  await page.goto("/");
  const videos = page.locator(".template-video");
  await expect(videos).toHaveCount(26);
  const allSilent = () => videos.evaluateAll(elements => elements.every(element => {
    const video = element as HTMLVideoElement;
    return video.muted && video.defaultMuted && video.volume === 0;
  }));
  await expect.poll(allSilent).toBe(true);
  await videos.first().evaluate((video: HTMLVideoElement) => {
    video.volume = 1;
    video.muted = false;
  });
  await expect.poll(allSilent).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect.poll(() => videos.first().evaluate((video: HTMLVideoElement) => video.paused)).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => videos.first().evaluate((video: HTMLVideoElement) => video.paused)).toBe(false);
  await expect.poll(allSilent).toBe(true);
});

test("touch devices autoplay visible previews without a tap", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  try {
    const page = await context.newPage();
    await page.goto(test.info().project.use.baseURL + "/");
    const card = page.locator("article").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute("data-playing", "true");
    await expect(card).toHaveAttribute("data-previewing", "false");
    await expect.poll(() => card.locator("video").evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  } finally {
    await context.close();
  }
});
