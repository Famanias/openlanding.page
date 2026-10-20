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

test.describe("KŌJI food flight", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("without clips, the five scene stills render as a static sequence", async ({ page, request }) => {
    const clip = await request.head("/templates/koji/clips/dive-1.mp4");
    test.skip(clip.ok(), "clips are present; the scrubbed flight is tested instead");
    await page.goto("/koji#omakase");
    const flight = page.locator('#flight [data-flight="static"]');
    await expect(flight.locator("[data-asset^='flight-']")).toHaveCount(5);
  });

  test("with clips, scrolling through the flight advances the video", async ({ page, request }) => {
    const clip = await request.head("/templates/koji/clips/dive-1.mp4");
    test.skip(!clip.ok(), "clips not generated yet");
    await page.goto("/koji");
    await page.evaluate(() => {
      const f = document.querySelector<HTMLElement>("#flight")!;
      window.scrollTo({ top: f.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.6, behavior: "instant" as ScrollBehavior });
    });
    await expect
      .poll(() => page.evaluate(() => Math.max(...Array.from(document.querySelectorAll("#flight video")).map((v) => (v as HTMLVideoElement).currentTime))), { timeout: 8_000 })
      .toBeGreaterThan(0);
  });

  test("the engine and its clips wait until the visitor scrolls near the flight", async ({ page, request }) => {
    const clip = await request.head("/templates/koji/clips/dive-1.mp4");
    test.skip(!clip.ok(), "clips not generated yet");
    const fetched: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/templates/koji/clips/")) fetched.push(r.url());
    });
    await page.goto("/koji");
    await page.waitForTimeout(2000);
    expect(fetched).toEqual([]);
    await expect(page.locator(".sw-root")).toHaveCount(0);
    await page.locator("#flight").scrollIntoViewIfNeeded();
    await expect(page.locator(".sw-root")).toHaveCount(1, { timeout: 5_000 });
  });
});

test.describe("KŌJI food flight on phones", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("every route dot has an accessible name", async ({ page, request }) => {
    const clip = await request.head("/templates/koji/clips/dive-1.mp4");
    test.skip(!clip.ok(), "clips not generated yet");
    await page.goto("/koji");
    await page.locator("#flight").scrollIntoViewIfNeeded();
    const dots = page.locator(".sw-route__dot");
    await expect(dots).toHaveCount(5, { timeout: 5_000 });
    for (const name of ["Sakizuke", "Mukōzuke", "Yakimono", "Nimono", "Shokuji"]) {
      await expect(page.getByRole("button", { name, exact: true })).toHaveCount(1);
    }
  });
});

test.describe("KŌJI hero dish on phones", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

  test("waits for a tap before loading 3D", async ({ page }) => {
    await page.goto("/koji");
    await expect(page.locator("#dish [data-asset='hero-dish-poster']")).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.locator("#dish canvas")).toHaveCount(0);
    await page.getByRole("button", { name: "View the dish in 3D" }).click();
    await expect(page.locator('#dish canvas[data-ready="true"]')).toBeAttached({ timeout: 10_000 });
  });
});

test.describe("KŌJI food flight (reduced motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("never mounts the scrub engine", async ({ page, request }) => {
    const clip = await request.head("/templates/koji/clips/dive-1.mp4");
    test.skip(!clip.ok(), "only meaningful once clips exist");
    await page.goto("/koji#omakase");
    await page.waitForTimeout(2000);
    await expect(page.locator(".sw-root")).toHaveCount(0);
    await expect(page.locator('#flight [data-flight="static"]')).toBeVisible();
    // A detached engine would still leave its scroll listener (and animation loop) on window.
    const cdp = await page.context().newCDPSession(page);
    const { result } = await cdp.send("Runtime.evaluate", { expression: "window" });
    const { listeners } = await cdp.send("DOMDebugger.getEventListeners", { objectId: result.objectId! });
    const scroll = listeners.filter((l) => l.type === "scroll");
    expect(scroll).toHaveLength(0);
  });
});
