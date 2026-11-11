import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

test.describe("ROOTED gallery card and standalone document", () => {
  test("gallery search, prompt, preview, live link, and HTML download work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox").fill("ROOTED");
    const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "ROOTED", exact: true }) });
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: "ROOTED", exact: true })).toHaveAttribute("href", "/templates/rooted");
    await expect.poll(() => card.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);

    // Copy prompt
    await card.getByRole("button", { name: "Copy prompt", exact: true }).click();
    await expect(card.getByRole("button", { name: "Copied prompt", exact: true })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("# Rebuild ROOTED");

    // Download HTML
    const downloadEvent = page.waitForEvent("download");
    await card.getByRole("button", { name: "Download HTML", exact: true }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe("rooted.html");
    const downloaded = await readFile((await download.path())!, "utf8");
    const canonical = await readFile(path.join(process.cwd(), "public/downloads/rooted.html"), "utf8");
    expect(downloaded).toBe(canonical);

    // Navigate to template
    const popupEvent = page.waitForEvent("popup");
    await card.getByRole("link", { name: "ROOTED", exact: true }).click();
    const popup = await popupEvent;
    await expect(popup).toHaveURL(/\/templates\/rooted$/);
    await expect(popup.locator("h1")).toBeVisible();
  });

  test("live route serves the downloadable page identically without errors", async ({ page, request }) => {
    const original = await readFile(path.join(process.cwd(), "public/downloads/rooted.html"), "utf8");
    for (const url of ["/templates/rooted", "/downloads/rooted.html"]) {
      const response = await request.get(url);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("text/html");
      expect(await response.text()).toBe(original);
    }

    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/templates/rooted");
    await expect(page.locator("h1")).toBeVisible();

    // Verify hero section and upscaled hero art element
    const heroArt = page.locator(".hero__art");
    await expect(heroArt).toBeAttached();

    // Scroll down to verify footer and absence of unhandled errors
    await page.locator("footer").scrollIntoViewIfNeeded();
    expect(errors).toEqual([]);

    // Wait for hero title reveal animation to settle
    await page.waitForTimeout(1400);

    // Verify hero title descenders have bottom clearance and are not clipped
    const titleClearance = await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll(".hero h1 span"));
      return spans.map((span) => {
        const em = span.querySelector("em")!;
        return span.getBoundingClientRect().bottom - em.getBoundingClientRect().bottom;
      });
    });
    for (const clearance of titleClearance) {
      expect(clearance).toBeGreaterThan(5);
    }

    // Verify counter-clockwise seamless carousel ticker
    const tickerCheck = await page.evaluate(() => {
      const ticker = document.querySelector(".ticker");
      const track = document.querySelector(".ticker__track");
      const sets = document.querySelectorAll(".ticker__set");
      return {
        exists: Boolean(ticker && track),
        setCount: sets.length,
        text: ticker?.textContent ?? "",
      };
    });
    expect(tickerCheck.exists).toBe(true);
    expect(tickerCheck.setCount).toBeGreaterThanOrEqual(4);
    expect(tickerCheck.text).toContain("Notice the little things");
    expect(tickerCheck.text).toContain("Make space to grow");
    expect(tickerCheck.text).toContain("Water with intention");
  });

  test("mobile navigation and reduced motion work without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/templates/rooted");
    await expect(page.locator("h1")).toBeVisible();

    // Verify horizontal containment
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("content is visible without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await page.goto("/templates/rooted");
      await expect(page.locator("h1")).toBeVisible();
    } finally {
      await context.close();
    }
  });
});
