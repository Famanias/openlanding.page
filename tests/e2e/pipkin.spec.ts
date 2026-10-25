import { expect, test, type Page } from "@playwright/test";

/** Waits until the page has hydrated (the progress leaf writes this on mount) so scrolling and clicks land. */
async function ready(page: Page) {
  await page.waitForFunction(() => document.documentElement.dataset.pkScrolled !== undefined);
}

/** Scrolls so the pinned trip is `frac` (0..1) of the way through. */
async function scrollTrip(page: Page, frac: number) {
  await page.evaluate((f) => {
    const t = document.querySelector("#trip") as HTMLElement;
    const top = t.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + f * (t.offsetHeight - window.innerHeight));
  }, frac);
}

const stop = (page: Page) => page.locator(".pk-stage").getAttribute("data-stop");

test.describe("Pipkin: the order-to-doorstep jam shop", () => {
  test("loads with its headline, no errors and a pinned trip", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin");
    await ready(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cooked Tuesday. At your door Friday.");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#trip")).toHaveAttribute("data-mode", "scrub");
    await expect(page.locator(".pk-tv-layer")).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test("scrolling walks the jar through all five stops and announces each", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin");
    await ready(page);
    await expect(page.locator("#trip")).toHaveAttribute("data-mode", "scrub");
    const titles = ["Ding. Your order is on the kitchen phone.", "Tuesday, the big pot goes on.", "Lidded, labelled, tucked in tissue.", "The courier picks up at four.", "Knock, knock. Lid off."];
    for (let i = 0; i < 5; i++) {
      await scrollTrip(page, i / 4);
      await expect.poll(() => stop(page)).toBe(String(i));
      await expect(page.locator(".pk-caption .pk-h3")).toHaveText(titles[i]);
      await expect(page.locator(".pk-tv-layer")).toHaveAttribute("data-stop", String(i));
      await expect(page.locator(".pk-rail-btn[data-active='true']")).toContainText(String(i + 1));
    }
    // the route fills as you go and the live region is polite
    const p = await page.locator(".pk-stage").evaluate((el) => parseFloat((el as HTMLElement).style.getPropertyValue("--p")));
    expect(p).toBeGreaterThan(0.95);
    await expect(page.locator(".pk-caption")).toHaveAttribute("aria-live", "polite");
  });

  test("the jam level, box and lid follow the stop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin");
    await ready(page);
    await expect(page.locator("#trip")).toHaveAttribute("data-mode", "scrub");
    const level = () => page.locator(".pk-tv-layer .pk-jar-fill").first().evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);
    await scrollTrip(page, 0.36);
    await expect.poll(level).toBeLessThan(2); // full jar while the pot scene is centred: no downward offset
    await scrollTrip(page, 0);
    await expect.poll(level).toBeGreaterThan(100); // empty jar: pushed down by ~112px
    await scrollTrip(page, 1);
    await expect.poll(() => page.locator(".pk-tv-box").evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });

  test("deep links to a stop and the rail jumps to one", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin#trip-4");
    await ready(page);
    await expect(page.locator("#trip")).toHaveAttribute("data-mode", "scrub");
    await expect.poll(() => stop(page), { timeout: 10_000 }).toBe("3");
    await page.getByRole("button", { name: /Cooking/ }).click();
    await expect.poll(() => stop(page), { timeout: 10_000 }).toBe("1");
    await expect(page).toHaveURL(/#trip-2$/);
  });

  test("reveals flip to data-in on scroll and the header reacts", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin");
    await ready(page);
    const head = page.locator("#shelf [data-reveal]").first();
    await expect(head).toHaveAttribute("data-in", "false");
    await page.evaluate(() => document.getElementById("shelf")!.scrollIntoView());
    await expect(head).toHaveAttribute("data-in", "true");
    await expect(page.locator("html")).toHaveAttribute("data-pk-scrolled", "true");
    await page.mouse.wheel(0, 600);
    await expect(page.locator("html")).toHaveAttribute("data-pk-dir", "down");
    await expect(page.locator("html")).not.toHaveClass(/lenis-scrolling/); // let the smooth scroll finish before reversing
    await page.mouse.wheel(0, -300);
    await expect(page.locator("html")).toHaveAttribute("data-pk-dir", "up");
  });

  test("cards lift on hover and buttons squash on press", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin");
    await ready(page);
    await page.evaluate(() => document.getElementById("shelf")!.scrollIntoView());
    const card = page.locator(".pk-card").first();
    await card.hover();
    await expect.poll(() => card.evaluate((el) => getComputedStyle(el).getPropertyValue("--lift").trim())).toBe("-8px");
    await expect.poll(() => page.locator(".pk-card").nth(1).evaluate((el) => getComputedStyle(el).opacity)).toBe("0.62");
    const add = page.getByRole("button", { name: /Add to box.*Strawberry & Basil/ });
    const box = (await add.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await expect.poll(() => add.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a)).toBeLessThan(0.99);
    await page.mouse.up();
  });

  test("builds a box: shelf and stepper share one box, totals update, ordering shows a ticket without a request", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const posts: string[] = [];
    page.on("request", (r) => { if (r.method() === "POST") posts.push(r.url()); });
    await page.goto("/pipkin");
    await ready(page);
    await page.evaluate(() => document.getElementById("shelf")!.scrollIntoView());
    await page.getByRole("button", { name: /Add to box.*Plum & Lavender/ }).click();
    await page.getByRole("button", { name: /Add to box.*Peach & Chamomile/ }).click();
    await expect(page.getByRole("link", { name: /Box\s*2\s*jars in your box/ })).toBeVisible();

    await page.evaluate(() => document.getElementById("box")!.scrollIntoView());
    await expect(page.locator(".pk-slot[data-filled='true']")).toHaveCount(2);
    await expect(page.locator(".pk-sum-total dd")).toHaveText("$24"); // 18 + $6 shipping under 6 jars
    for (let i = 0; i < 4; i++) await page.getByRole("button", { name: "Add one Meyer Lemon Marmalade" }).click();
    await expect(page.locator(".pk-sum-total dd")).toHaveText("$50"); // 6 jars: $54 - $4, free shipping
    await expect(page.getByText("Free", { exact: true })).toBeVisible();

    // a seventh jar grows the box to 12 and says so
    await page.getByRole("button", { name: "Add one Pear & Vanilla Bean" }).click();
    await expect(page.getByRole("radio", { name: "12 jars" })).toBeChecked();
    await expect(page.locator(".pk-box-notice")).toContainText("grew");

    // shrinking trims jars and says so
    await page.locator(".pk-seg-opt", { hasText: "3 jars" }).click();
    await expect(page.locator(".pk-slot[data-filled='true']")).toHaveCount(3);
    await expect(page.locator(".pk-box-notice")).toContainText("Trimmed");

    await page.getByRole("button", { name: /Place order/ }).click();
    await expect(page.locator(".pk-btn[data-loading='true']")).toBeVisible();
    const ticket = page.locator(".pk-ticket");
    await expect(ticket).toContainText("Order #0413 placed");
    await expect(ticket).toBeVisible();
    await page.getByRole("button", { name: "Start another" }).click();
    await expect(page.locator(".pk-slot[data-filled='true']")).toHaveCount(0);
    expect(posts).toEqual([]);
  });

  test("the Friday list validates, shakes, and confirms locally", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const posts: string[] = [];
    page.on("request", (r) => { if (r.method() === "POST") posts.push(r.url()); });
    await page.goto("/pipkin#list");
    await ready(page);
    await page.getByRole("button", { name: "Join the list" }).click();
    await expect(page.locator(".pk-err:not(:empty)")).toHaveCount(3);
    await expect(page.getByLabel("First name", { exact: true })).toBeFocused();
    await expect(page.locator(".pk-field[data-error='true']").first()).toHaveCSS("animation-name", /pk-shake-/);
    await page.getByLabel("First name", { exact: true }).fill("Ada");
    await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
    await page.getByLabel("Plum", { exact: true }).check();
    await page.getByRole("button", { name: "Join the list" }).click();
    await expect(page.locator(".pk-list")).toHaveAttribute("data-status", "done", { timeout: 5000 });
    await expect(page.locator(".pk-done")).toContainText("Thanks, Ada.");
    await expect(page.locator(".pk-done")).toContainText("Plum & Lavender");
    expect(posts).toEqual([]);
  });

  test("keyboard: the FAQ opens with Enter and the skip link works", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pipkin");
    await ready(page);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to the trip" })).toBeFocused();
    await page.evaluate(() => document.getElementById("faq")!.scrollIntoView());
    const second = page.getByRole("button", { name: "How long does a jar keep?" });
    await second.focus();
    await page.keyboard.press("Enter");
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("button", { name: "When does my order actually ship?" })).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("region", { name: "How long does a jar keep?" })).toBeVisible();
  });
});

test.describe("Pipkin on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("has no horizontal overflow, a focus-trapped menu, and touch-safe effects", async ({ page }) => {
    await page.goto("/pipkin");
    await ready(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0);
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.tap();
    await expect(page.locator(".pk-menu")).toHaveAttribute("data-open", "true");
    await expect(page.getByRole("link", { name: "The trip" }).last()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".pk-menu")).toHaveAttribute("data-open", "false");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    // pointer effects stay off on touch and Lenis never mounts
    await expect(page.locator("html.lenis")).toHaveCount(0);
    await page.evaluate(() => document.getElementById("shelf")!.scrollIntoView());
    expect(await page.locator(".pk-card").first().evaluate((el) => (el as HTMLElement).style.getPropertyValue("--rx"))).toBe("");
  });

  test("the trip still scrubs on a touch viewport", async ({ page }) => {
    await page.goto("/pipkin");
    await ready(page);
    await expect(page.locator("#trip")).toHaveAttribute("data-mode", "scrub");
    await scrollTrip(page, 0.75);
    await expect.poll(() => stop(page)).toBe("3");
  });
});

test.describe("Pipkin with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("stacks the five scenes, shows every reveal, and mounts no engines", async ({ page }) => {
    await page.goto("/pipkin");
    await ready(page);
    await expect(page.locator("#trip")).toHaveAttribute("data-mode", "flow");
    await expect(page.locator(".pk-scene")).toHaveCount(5);
    await expect(page.locator(".pk-tv-layer")).toHaveCount(5); // one static jar per scene, no overlay scrubber
    await expect(page.locator(".pk-scene-copy").first()).toBeVisible();
    await expect(page.locator("html.lenis")).toHaveCount(0);
    const hidden = await page.locator("[data-reveal]").evaluateAll((els) =>
      els.filter((el) => {
        const s = getComputedStyle(el);
        return s.opacity === "0" || s.clipPath.includes("100%");
      }).length,
    );
    expect(hidden).toBe(0);
    const hiddenWords = await page.locator(".pk-wi").evaluateAll((els) => els.filter((el) => new DOMMatrix(getComputedStyle(el).transform).m42 > 4).length);
    expect(hiddenWords).toBe(0);
    expect(await page.locator(".pk-marquee-track").first().evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  });
});
