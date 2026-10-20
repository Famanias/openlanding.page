import { test, expect } from "@playwright/test";

test.describe("KŌJI reservation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("a valid reservation shows the success state without a network request", async ({ page }) => {
    await page.goto("/koji#reserve");
    const form = page.locator("form");
    const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
    await form.getByLabel("Date").fill(tomorrow);
    await form.getByLabel("Seating").selectOption("20:45");
    await form.getByLabel("Guests").selectOption("2");
    await form.getByLabel("Name").fill("Aiko Tanaka");
    await form.getByLabel("Email").fill("aiko@example.jp");
    const requests: string[] = [];
    page.on("request", (r) => {
      if (!/\.(woff2?|png|webp|avif|svg|css|js|mp4)(\?|$)/.test(r.url())) requests.push(r.url());
    });
    await form.getByRole("button", { name: "Hold my seats" }).click();
    await expect(page.getByText("Your seats are held. A confirmation will follow by email.")).toBeVisible();
    expect(requests).toEqual([]);
  });

  test("the signage strip carries the restaurant's facts", async ({ page }) => {
    await page.goto("/koji");
    await expect(page.getByText("OPEN 18:00–23:00")).toBeVisible();
    await expect(page.getByText("12 SEATS")).toBeVisible();
  });
});

test.describe("KŌJI hero dish (reduced motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows the static poster and no canvas", async ({ page }) => {
    await page.goto("/koji");
    await expect(page.locator("#dish [data-asset='hero-dish-poster']")).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.locator("#dish canvas")).toHaveCount(0);
  });
});

test.describe("KŌJI hero dish (3D)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("renders the real-time dish", async ({ page }) => {
    await page.goto("/koji");
    await expect(page.locator('#dish canvas[data-ready="true"]')).toBeAttached({ timeout: 8_000 });
  });
});
