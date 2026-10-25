import { test, expect } from "@playwright/test";

test.describe("SEREIN Bureau vertical landing page", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads as a continuous header-to-footer page with section anchors", async ({ page }) => {
    await page.goto("/serein");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Small weather");
    await expect(page.locator(".sr-reader")).toHaveCount(0);
    await expect(page.locator(".sr-landing-section")).toHaveCount(6);
    await page.getByRole("link", { name: "The forecast", exact: true }).click();
    await expect(page.locator("#forecast")).toBeInViewport();
    expect(new URL(page.url()).hash).toBe("#forecast");
  });

  test("forecast tabs change the reading in place", async ({ page }) => {
    await page.goto("/serein#forecast");
    await expect(page.locator("#forecast")).toBeInViewport();
    await expect(page.getByRole("tab", { name: /FIRST LIGHT/ })).toHaveAttribute("aria-selected", "true");
    await page.getByRole("tab", { name: /HIGH FRONT/ }).click();
    await expect(page.getByRole("tab", { name: /HIGH FRONT/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".sr-forecast-strip__copy h3")).toHaveText("Wind in the paper");
    await page.getByRole("tab", { name: /LAST LIGHT/ }).click();
    await expect(page.locator(".sr-forecast-strip__copy h3")).toHaveText("The line opens");
  });
});

test.describe("SEREIN Bureau dispatch", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("validates and confirms locally without a network request", async ({ page }) => {
    await page.goto("/serein#subscribe");
    await page.getByRole("button", { name: "Join the dispatch" }).click();
    await expect(page.getByText("Enter a valid email")).toBeVisible();
    await page.locator("#serein-name").fill("Ada Observer");
    await page.locator("#serein-email").fill("ada@example.com");
    const requests: string[] = [];
    page.on("request", (request) => {
      if (!/\.(woff2?|png|webp|avif|svg|css|js)(\?|$)/.test(request.url())) requests.push(request.url());
    });
    await page.getByRole("button", { name: "Join the dispatch" }).click();
    await expect(page.getByText("Weather, on its way.")).toBeVisible();
    expect(requests).toEqual([]);
  });
});

test.describe("SEREIN Bureau responsive flow", () => {
  test("phone layout exposes all sections without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/serein");
    await expect(page.locator(".sr-landing-section")).toHaveCount(6);
    await expect(page.locator("[inert]")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await page.goto("/serein#notes");
    await expect(page.locator("#notes")).toBeInViewport();
  });

  test("reduced motion keeps the complete vertical page visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/serein");
    await expect(page.locator(".sr-landing-section")).toHaveCount(6);
    await expect(page.locator(".sr-forecast-strip__tab").first()).toBeVisible();
    await expect(page.locator(".sr-intro h1")).toBeVisible();
  });
});
