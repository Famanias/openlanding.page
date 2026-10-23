import { test, expect } from "@playwright/test";

test("search, provider, category, reset and URL hydration work together", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "OpenAI", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(8);
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
  await expect(page.locator("article")).toHaveCount(22);
  await expect(page.getByRole("searchbox")).toHaveValue("");
});

test("all model families return real matching templates", async ({ page }) => {
  await page.goto("/");
  for (const [model, count] of [["Claude", 9], ["Gemini", 4], ["Other", 1]] as const) {
    await page.getByRole("button", { name: model, exact: true }).click();
    await expect(page.locator("article")).toHaveCount(count);
  }
});

test("preview is twice the original aspect height and moves on hover", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("article").first();
  const preview = card.locator(".template-preview");
  const box = await preview.boundingBox();
  expect(box!.height / box!.width).toBeCloseTo(1.25, 1);
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
  await expect(page.locator("article")).toHaveCount(22);
  await page.evaluate(() => { history.pushState(null, "", "?model=gemini&q=bathys"); dispatchEvent(new PopStateEvent("popstate")); });
  await expect(page.getByRole("searchbox")).toHaveValue("bathys");
  await expect(page.locator("article")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator("article")).toHaveCount(22);
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
