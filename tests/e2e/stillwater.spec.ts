import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

test("gallery card opens Stillwater and downloads the standalone document", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("searchbox").fill("Stillwater");
  const card = page.locator("article").filter({ hasText: "Stillwater" });
  await expect(card).toBeVisible();
  await expect(card.getByRole("link", { name: "Stillwater", exact: true })).toHaveAttribute("href", "/templates/stillwater");
  await expect.poll(() => card.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await card.getByRole("button", { name: "Copy prompt", exact: true }).click();
  await expect(card.getByRole("button", { name: "Copied prompt", exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("private coastal sanctuaries");

  const downloadEvent = page.waitForEvent("download");
  await card.getByRole("button", { name: "Download HTML", exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("stillwater.html");
  const downloaded = await readFile((await download.path())!, "utf8");
  const canonical = await readFile(path.join(process.cwd(), "public/downloads/stillwater.html"), "utf8");
  expect(downloaded).toBe(canonical);
});

test("live route serves the downloadable page and keeps the inquiry local", async ({ page, request }) => {
  const response = await request.get("/stillwater");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/html");
  expect(await response.text()).toBe(await readFile(path.join(process.cwd(), "public/downloads/stillwater.html"), "utf8"));

  await page.goto("/stillwater");
  await expect(page.locator("h1")).toContainText("Another");
  await page.locator('[data-retreat="sera"]').click();
  await expect(page.locator("#retreat-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#retreat-dialog")).toBeHidden();
  await page.locator('[data-retreat="sera"]').click();
  await page.locator("#dialog-inquire").click();
  await expect(page.locator("#destination")).toHaveValue("Casa Sera");
  await expect(page.locator("#destination")).toBeFocused();

  await page.locator("#arrival").fill("2027-07-15");
  await page.locator("#departure").fill("2027-07-14");
  await page.locator("#guests").selectOption("2");
  await page.locator("#name").fill("A Guest");
  await page.locator("#email").fill("guest@example.com");
  const postRequests: string[] = [];
  page.on("request", (req) => { if (req.method() !== "GET") postRequests.push(req.url()); });
  await page.locator('#inquiry-form button[type="submit"]').click();
  await expect(page.locator("#form-status")).toHaveText("Departure must be after arrival.");
  await page.locator("#departure").fill("2027-07-20");
  await page.locator("#name").fill("   ");
  await page.locator('#inquiry-form button[type="submit"]').click();
  await expect(page.locator("#form-status")).toHaveText("Enter your name to preview your inquiry.");
  await page.locator("#name").fill("A Guest");
  await page.locator('#inquiry-form button[type="submit"]').click();
  await expect(page.locator("#inquiry-preview")).toContainText("Nothing has been sent");
  expect(postRequests).toEqual([]);
});

test("mobile controls and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/stillwater");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await page.locator('[data-feature="architecture"]').click();
  await expect(page.locator("#feature-title")).toHaveText("Made to belong.");
  await page.locator('[data-story="1"]').click();
  await expect(page.locator("#journal-title")).toHaveText("The beauty of an unhurried morning.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect(await page.locator(".hero-image").evaluate((image) => Number.parseFloat(getComputedStyle(image).animationDuration))).toBeLessThan(0.01);
});

test("standalone page has a no-script navigation fallback", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/stillwater");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".no-script-nav")).toBeVisible();
  await expect(page.locator("#inquiry-form noscript p")).toContainText("Enable JavaScript");
  await expect(page.locator("#inquiry-form noscript p")).toBeVisible();
  await context.close();
});
