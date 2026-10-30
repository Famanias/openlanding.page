import { test, expect } from "@playwright/test";

test("search, provider, category, reset and URL hydration work together", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "OpenAI", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(20);
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
  await expect(page.locator("article")).toHaveCount(43);
  await expect(page.getByRole("searchbox")).toHaveValue("");
});

test("all model families return real matching templates", async ({ page }) => {
  await page.goto("/");

  for (const [model, count] of [["Claude", 17], ["OpenAI", 20], ["Gemini", 6]] as const) {

    await page.getByRole("button", { name: model, exact: true }).click();
    await expect(page.locator("article")).toHaveCount(count);
  }
});

test("gallery previews show still hero screenshots", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("article").first();
  const preview = card.locator(".template-preview");
  const box = await preview.boundingBox();
  expect(box!.height / box!.width).toBeCloseTo(9 / 16, 2);
  await expect(card.locator("img")).toBeVisible();
  await expect(page.locator(".template-preview video")).toHaveCount(0);
  await card.hover();
  await expect(card.locator("img")).toHaveCSS("transform", "none");
});

test("keyboard shortcut, clear, and browser history resynchronize the search", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("searchbox")).toBeFocused();
  await page.getByRole("searchbox").fill("keytu");
  await expect(page.locator("article")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.locator("article")).toHaveCount(43);
  await page.evaluate(() => { history.pushState(null, "", "?model=gemini&q=bathys"); dispatchEvent(new PopStateEvent("popstate")); });
  await expect(page.getByRole("searchbox")).toHaveValue("bathys");
  await expect(page.locator("article")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator("article")).toHaveCount(43);
});

test("mobile retains search and still previews", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("searchbox")).toBeVisible();
  await page.locator("article").first().hover();
  expect(await page.locator("article img").first().evaluate((img) => getComputedStyle(img).animationName)).toBe("none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

