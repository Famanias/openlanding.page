import { test, expect } from "@playwright/test";
import { TEMPLATES } from "../../src/app/(index)/data/templates";
import { modelFamily } from "../../src/app/(index)/data/filters";

test("search, provider, category, reset and URL hydration work together", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "OpenAI", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(TEMPLATES.filter((template) => modelFamily(template.model) === "openai").length);
  await page.getByRole("tab", { name: /^3D(?:\s|\()/ }).click();
  await expect(page.locator("article")).toHaveCount(TEMPLATES.filter((template) => modelFamily(template.model) === "openai" && template.categories.includes("3d")).length);
  await page.getByRole("searchbox").fill("trace");
  await expect(page.locator("article")).toHaveCount(1);
  await expect(page).toHaveURL(/q=trace/);
  await page.reload();
  await expect(page.getByRole("searchbox")).toHaveValue("trace");
  await expect(page.locator("article")).toHaveCount(1);
  await page.getByRole("button", { name: "Claude", exact: true }).click();
  await expect(page.getByText("No templates found.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters", exact: true }).click();
  await expect(page.locator("article")).toHaveCount(TEMPLATES.length);
  await expect(page.getByRole("searchbox")).toHaveValue("");
});

test("all model families return real matching templates", async ({ page }) => {
  await page.goto("/");

  for (const [model, family] of [["Claude", "claude"], ["OpenAI", "openai"], ["Gemini", "gemini"]] as const) {

    await page.getByRole("button", { name: model, exact: true }).click();
    await expect(page.locator("article")).toHaveCount(TEMPLATES.filter((template) => modelFamily(template.model) === family).length);
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
  await expect(page.locator("article")).toHaveCount(TEMPLATES.length);
  await page.evaluate(() => { history.pushState(null, "", "?model=gemini&q=bathys"); dispatchEvent(new PopStateEvent("popstate")); });
  await expect(page.getByRole("searchbox")).toHaveValue("bathys");
  await expect(page.locator("article")).toHaveCount(1);
  await page.goBack();
  await expect(page.locator("article")).toHaveCount(TEMPLATES.length);
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

