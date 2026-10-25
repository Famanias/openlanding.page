import { test, expect } from "@playwright/test";

test.describe("Flori flower club", () => {
  test("hero postcards travel around the fan, pause on hover, and stop offscreen", async ({ page }) => {
    await page.goto("/flori");
    const carousel = page.getByRole("region", { name: "Flower postcards" });
    const slot = carousel.locator(".fl-postcard-slot").nth(2);
    await expect(carousel.locator(".fl-postcards")).toHaveAttribute("data-carousel", "true");
    const before = await slot.getAttribute("style");
    await expect.poll(() => slot.getAttribute("style")).not.toBe(before);
    const movingCard = await carousel.locator(".fl-postcard").nth(2).boundingBox();
    await page.mouse.move(movingCard!.x + movingCard!.width / 2, movingCard!.y + movingCard!.height / 2);
    await page.waitForTimeout(600);
    const hovered = await slot.getAttribute("style");
    await page.waitForTimeout(300);
    expect(await slot.getAttribute("style")).toBe(hovered);
    await page.mouse.move(10, 10);
    await expect.poll(() => slot.getAttribute("style")).not.toBe(hovered);
    await page.locator("#flowers").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const offscreen = await slot.getAttribute("style");
    await page.waitForTimeout(300);
    expect(await slot.getAttribute("style")).toBe(offscreen);
  });

  test("carousel buttons and dragging work without activating the card link", async ({ page }) => {
    await page.goto("/flori");
    const carousel = page.getByRole("region", { name: "Flower postcards" });
    const slot = carousel.locator(".fl-postcard-slot").nth(2);
    await carousel.getByRole("button", { name: "Pause flower carousel" }).click();
    await page.waitForTimeout(600);
    const paused = await slot.getAttribute("style");
    await page.mouse.move(10, 10);
    await page.waitForTimeout(300);
    expect(await slot.getAttribute("style")).toBe(paused);
    await carousel.getByRole("button", { name: "Next flowers" }).focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => slot.getAttribute("style")).not.toBe(paused);
    await page.waitForTimeout(700);
    const beforeDrag = await slot.getAttribute("style");
    const card = carousel.locator(".fl-postcard").nth(3);
    const bounds = await card.boundingBox();
    await page.mouse.move(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
    await page.mouse.down();
    await page.mouse.move(bounds!.x + bounds!.width / 2 - 100, bounds!.y + bounds!.height / 2, { steps: 8 });
    await page.mouse.up();
    expect(await slot.getAttribute("style")).not.toBe(beforeDrag);
    await expect(page).toHaveURL(/\/flori$/);
  });

  test("bouquet controls carry a chosen feeling and price into signup", async ({ page }) => {
    await page.goto("/flori#compose");
    const composer = page.locator("#compose");
    await composer.getByLabel("Sunbeam", { exact: true }).check();
    await composer.getByLabel("Something lovely £34", { exact: true }).check();
    await expect(composer.locator(".fl-botanical")).toHaveAttribute("data-feeling", "sunbeam");
    await expect(composer.locator(".fl-composer-summary")).toContainText("£34");
    await composer.getByRole("link", { name: "That’s my bunch" }).click();
    await expect(page).toHaveURL(/\?feeling=sunbeam&size=lovely#join/);
    await expect(page.locator("#fl-join-feeling")).toHaveValue("sunbeam");
    await expect(page.locator("#fl-join-size")).toHaveValue("lovely");
    await expect(page.locator("#join")).toBeInViewport();
    await page.reload();
    await expect(page.locator("#fl-join-size")).toHaveValue("lovely");
    await expect(page.locator("#join")).toBeInViewport();
  });

  test("validation, preparing and confirmation states work without sending personal data", async ({ page }) => {
    await page.goto("/flori?feeling=wildthing&size=abundant#join");
    await expect(page.locator("html")).toHaveAttribute("data-fl-motion", "live");
    const sent: string[] = [];
    page.on("request", (request) => { if (request.method() === "POST") sent.push(request.url()); });
    await page.getByRole("button", { name: "Count me in", exact: true }).click();
    await expect(page.locator("#fl-name")).toBeFocused();
    await expect(page.locator("#fl-email")).toHaveAttribute("aria-invalid", "true");
    await page.getByLabel("Your first name", { exact: true }).fill("Lena");
    await page.getByLabel("Your email address", { exact: true }).fill("lena@example.com");
    await page.getByRole("button", { name: "Count me in", exact: true }).click();
    await expect(page.getByRole("button", { name: "Gathering your little hello…" })).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Hello, Lena." })).toBeVisible();
    await expect(page.locator(".fl-success")).toContainText("£48");
    await expect(page.locator(".fl-success")).toContainText("wild thing");
    await expect(page.locator(".fl-success")).toBeFocused();
    expect(sent).toEqual([]);
    await page.getByRole("button", { name: "Try another little bunch" }).click();
    await expect(page.locator("#fl-name")).toBeFocused();
  });

  test("scroll gathering, reveal, hover, press, and pause have visible feedback", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/flori");
    await expect(page.locator("html")).toHaveAttribute("data-fl-motion", "live");
    await page.waitForTimeout(1800);
    const card = page.locator(".fl-postcard").nth(2);
    const before = await card.evaluate((el) => getComputedStyle(el).transform);
    const movingCard = await card.boundingBox();
    await page.mouse.move(movingCard!.x + movingCard!.width / 2, movingCard!.y + movingCard!.height / 2);
    await expect.poll(() => card.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
    const button = page.locator(".fl-hero-bottom .fl-button");
    await button.hover();
    await page.mouse.down();
    await expect.poll(() => button.evaluate((el) => getComputedStyle(el).transform)).toMatch(/matrix\(0\.9/);
    await page.mouse.move(10, 10); await page.mouse.up();
    await page.locator("#flowers").scrollIntoViewIfNeeded();
    await expect(page.locator(".fl-collection-grid [data-reveal]").first()).toHaveAttribute("data-in", "true");
    await expect(page.locator(".fl-section-heading [data-reveal=mask]")).toHaveAttribute("data-in", "true");
    await page.locator("#compose").scrollIntoViewIfNeeded();
    await page.evaluate(() => { const el = document.getElementById("compose")!; scrollTo(0, el.offsetTop - innerHeight * .3); });
    await expect.poll(() => page.locator("#compose").evaluate((el) => Number(el.style.getPropertyValue("--fl-gather")))).toBeGreaterThan(.8);
    await expect(page.locator(".fl-header")).toHaveAttribute("data-compact", "true");
    await page.locator("#club").scrollIntoViewIfNeeded();
    await expect(page.locator(".fl-story-art")).toHaveAttribute("data-in", "true");
    await page.getByRole("button", { name: "Pause little movements" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-fl-paused", "true");
  });

  test("phone menu traps focus, closes on Escape, and controls work by keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/flori");
    const toggle = page.getByRole("button", { name: "Open navigation" });
    await toggle.click();
    await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();
    await page.keyboard.press("Shift+Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("dialog")))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await page.goto("/flori#compose");
    const daydream = page.getByRole("radio", { name: "Daydream", exact: true });
    await daydream.focus(); await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: "Sunbeam", exact: true })).toBeChecked();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  });

  test("reduced motion shows finished content without smooth scrolling", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/flori");
    await expect(page.locator("html")).toHaveAttribute("data-fl-motion", "reduced");
    expect(await page.evaluate(() => document.documentElement.classList.contains("lenis"))).toBe(false);
    for (const item of await page.locator("[data-reveal]").all()) {
      expect(await item.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
      expect(await item.evaluate((el) => getComputedStyle(el).clipPath)).toBe("none");
    }
    expect(await page.locator(".fl-hero-seal > svg").evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    const slot = page.locator(".fl-postcard-slot").nth(2);
    const still = await slot.getAttribute("style");
    await page.waitForTimeout(350);
    expect(await slot.getAttribute("style")).toBe(still);
    await page.getByRole("button", { name: "Next flowers" }).click();
    expect(await slot.getAttribute("style")).not.toBe(still);
    await page.locator("#compose").scrollIntoViewIfNeeded();
    expect(await page.locator("[data-gather=true] .fl-stem").first().evaluate((el) => getComputedStyle(el).transform)).toBe("none");
  });

  test("without JavaScript the illustrations, copy and contact fallback stay visible", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto("/flori");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".fl-postcard").nth(2)).toBeVisible();
    await expect(page.locator(".fl-form-fallback")).toBeVisible();
    await expect(page.locator(".fl-form-panel")).toBeHidden();
    expect(await page.locator('a[href*="#"]').evaluateAll((links) => links.every((link) => {
      const href = new URL((link as HTMLAnchorElement).href);
      return !href.hash || Boolean(document.getElementById(href.hash.slice(1)));
    }))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
    await context.close();
  });

  test("the keyboard skip link transfers focus into the flower collection", async ({ page }) => {
    await page.goto("/flori");
    await expect(page.locator("html")).toHaveAttribute("data-fl-motion", "live");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to the flowers" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#flowers")).toBeFocused();
  });
});
