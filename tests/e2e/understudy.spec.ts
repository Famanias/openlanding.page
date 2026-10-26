import { test, expect, type Page } from "@playwright/test";

/** Scroll so that a held scene sits at progress `p` (0..1). */
async function toProgress(page: Page, selector: string, p: number) {
  await page.evaluate(({ selector, p }) => {
    const el = document.querySelector<HTMLElement>(selector)!;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + (el.offsetHeight - innerHeight) * p);
  }, { selector, p });
  await page.waitForTimeout(250);
}

const clipOf = (page: Page) => page.locator(".us-house").evaluate((el) => getComputedStyle(el).clipPath);

test.describe("Understudy", () => {
  test("the push-in: the arch opens to the whole screen and the dark house takes the chrome", async ({ page }) => {
    await page.goto("/understudy");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Your first job,\s*rehearsed\./);
    await page.waitForTimeout(400);
    const rest = await clipOf(page);
    expect(rest).toMatch(/^inset\(/);
    await expect(page.locator("html")).toHaveAttribute("data-us-dock", "light");

    await toProgress(page, ".us-hero", 0.3);
    const opening = await clipOf(page);
    expect(opening).not.toBe(rest);

    await toProgress(page, ".us-hero", 0.75);
    expect(await clipOf(page)).toMatch(/inset\(0px( 0px)*( round 0px)?/);
    await expect(page.locator("html")).toHaveAttribute("data-us-dock", "dark");
    await expect(page.locator(".us-house__h")).toBeVisible();
    // the lens rows are placed by script and drift
    const item = page.locator(".us-house__row").first().locator(".us-house__item").first();
    const a = await item.getAttribute("style");
    await page.waitForTimeout(300);
    expect(await item.getAttribute("style")).not.toBe(a);
  });

  test("the parts ring drifts in an endless loop, holds on hover and pause, drags, and steps", async ({ page }) => {
    await page.goto("/understudy");
    await page.evaluate(() => document.getElementById("parts")!.scrollIntoView({ behavior: "instant" }));
    await page.mouse.move(700, 40);
    const track = page.locator(".us-parts__track");
    await expect(track).toHaveAttribute("data-ring", "on");
    const xs = () => page.locator(".us-part-slot").evaluateAll((els) => els.map((el) => new DOMMatrix(getComputedStyle(el).transform).m41));

    // it drifts right to left on its own
    const a = await xs();
    await page.waitForTimeout(800);
    const b = await xs();
    expect(b[0]).toBeLessThan(a[0] - 10);

    // it loops: every card stays within one slot of the edges of the ring, however far it travels
    const slot = await page.locator(".us-part").first().evaluate((el) => (el as HTMLElement).offsetWidth + 16);
    const band = (await page.locator(".us-parts__band").boundingBox())!;
    await page.mouse.move(band.x + band.width - 40, band.y + band.height / 2);
    for (let i = 0; i < 4; i++) {
      await page.mouse.down();
      await page.mouse.move(band.x + 40, band.y + band.height / 2, { steps: 6 });
      await page.mouse.up();
      await page.mouse.move(band.x + band.width - 40, band.y + band.height / 2);
    }
    const looped = await xs();
    for (const x of looped) {
      expect(x).toBeGreaterThanOrEqual(-slot - 1);
      expect(x).toBeLessThan(looped.length * slot - slot + 1);
    }
    // a drag never opens a card
    await expect(page.locator('.us-part[data-flipped="true"]')).toHaveCount(0);

    // hover brings it to a stop
    await page.waitForTimeout(1800);
    const h1 = await xs();
    await page.waitForTimeout(500);
    const h2 = await xs();
    expect(Math.abs(h2[0] - h1[0])).toBeLessThan(2);

    // pause holds it after the pointer leaves; next glides one card along
    await page.getByRole("button", { name: "Pause the parts" }).click();
    await expect(page.getByRole("button", { name: "Pause the parts" })).toHaveAttribute("aria-pressed", "true");
    await page.waitForTimeout(700);
    const p1 = await xs();
    await page.waitForTimeout(500);
    expect(Math.abs((await xs())[0] - p1[0])).toBeLessThan(2);
    await page.getByRole("button", { name: "Next part" }).click();
    await page.waitForTimeout(1200);
    const n = await xs();
    const moved = ((p1[0] - n[0]) % (looped.length * slot) + looped.length * slot) % (looped.length * slot);
    expect(Math.abs(moved - slot)).toBeLessThan(4);
  });

  test("parts filter by field, refill the ring, and turn over to their brief", async ({ page }) => {
    await page.goto("/understudy");
    await page.evaluate(() => document.getElementById("parts")!.scrollIntoView({ behavior: "instant" }));
    const track = page.locator(".us-parts__track");
    const chips = page.getByRole("group", { name: "Fields" });
    await chips.getByRole("button", { name: "Design" }).click();
    await expect(chips.getByRole("button", { name: "Design" })).toHaveAttribute("aria-pressed", "true");
    // two design parts for readers; repeated, hidden copies fill the ring on screen
    await expect(track.locator(".us-part-slot:not([data-copy])")).toHaveCount(2);
    expect(await track.locator(".us-part-slot[data-copy]").count()).toBeGreaterThan(0);
    await expect(track.locator(".us-part-slot[data-copy]").first()).toHaveAttribute("aria-hidden", "true");
    await chips.getByRole("button", { name: "Design" }).press("ArrowRight");
    await expect(chips.getByRole("button", { name: "Growth" })).toHaveAttribute("aria-pressed", "true");
    await expect(chips.getByRole("button", { name: "Growth" })).toBeFocused();

    // keyboard: tabbing to a card holds the ring and brings the card into view
    const card = track.locator(".us-part-slot:not([data-copy]) .us-part").first();
    const flip = card.getByRole("button", { name: /Read the brief for Growth Marketer/ });
    await flip.focus();
    await page.waitForTimeout(900);
    const box = (await card.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(1280 + 1);
    await flip.click();
    await expect(card).toHaveAttribute("data-flipped", "true");
    await expect(card.getByRole("button", { name: "Back to the card" })).toBeFocused();
    await card.getByRole("link", { name: "Rehearse this part" }).click();
    const sheet = page.getByRole("dialog", { name: "Book your first call time." });
    await expect(sheet).toHaveAttribute("data-open", "true");
    await expect(sheet.getByLabel("The part")).toHaveValue("growth-marketer");
  });

  test("Start validates, books a call time without any request, and resets", async ({ page }) => {
    const requests: string[] = [];
    await page.goto("/understudy");
    page.on("request", (r) => { if (r.method() !== "GET") requests.push(r.url()); });
    await page.getByRole("button", { name: "Start", exact: true }).click();
    const sheet = page.getByRole("dialog", { name: "Book your first call time." });
    await expect(sheet).toHaveAttribute("data-open", "true");
    await expect(sheet.getByLabel("Your name")).toBeFocused();

    await sheet.getByRole("button", { name: "Book my call time" }).click();
    await expect(sheet.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
    await expect(sheet.getByText("Tell us what to put on your call sheet.")).toBeVisible();
    await expect(sheet.getByLabel("Your name")).toBeFocused();

    await sheet.getByLabel("Your name").fill("Maya Ortiz");
    await sheet.getByLabel("Email").fill("maya@example");
    await sheet.getByRole("button", { name: "Book my call time" }).click();
    await expect(sheet.getByLabel("Email")).toBeFocused();
    await sheet.getByLabel("Email").fill("maya@example.com");
    await sheet.getByLabel("The part").selectOption("product-analyst");
    await sheet.getByRole("button", { name: "Book my call time" }).click();
    await expect(sheet.getByRole("button", { name: /Book my call time/ })).toHaveAttribute("aria-busy", "true");
    await expect(sheet.locator('[role="status"]')).toHaveText("You’re on the call sheet, Maya.");
    await expect(sheet).toHaveAttribute("data-status", "done");
    await expect(sheet.locator(".us-ticket__k")).toHaveText(/Call sheet · US-[A-Z2-9]{4}/);
    await expect(sheet.locator(".us-ticket")).toContainText("Parcelpost");
    expect(requests).toEqual([]);

    await sheet.getByRole("button", { name: "Book another part" }).click();
    await expect(sheet).toHaveAttribute("data-status", "idle");
    await expect(sheet.getByLabel("Your name")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(sheet).toHaveAttribute("data-open", "false");
    await expect(page.getByRole("button", { name: "Start", exact: true })).toBeFocused();
  });

  test("Ask answers a typed question after a typing beat", async ({ page }) => {
    await page.goto("/understudy");
    await page.getByRole("button", { name: "Ask Understudy a question" }).click();
    const sheet = page.getByRole("dialog", { name: "Ask Understudy" });
    await expect(sheet.getByRole("textbox")).toBeFocused();
    await sheet.getByRole("textbox").fill("how many hours a week is it?");
    await sheet.getByRole("textbox").press("Enter");
    await expect(sheet.locator(".us-bubble--typing")).toBeVisible();
    await expect(sheet.locator(".us-bubble--us").last()).toContainText("About 10 hours a week");
    await sheet.getByRole("button", { name: "How much does it cost?" }).click();
    await expect(sheet.locator(".us-bubble--us").last()).toContainText("$89 a month");
  });

  test("the menu slides to the current scene and goes to another", async ({ page }) => {
    await page.goto("/understudy");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu.getByRole("link", { name: /The studio/ })).toHaveAttribute("aria-current", "location");
    await menu.getByRole("link", { name: /Casting/ }).click();
    await expect(menu).toHaveAttribute("data-open", "false");
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById("casting")!.getBoundingClientRect().top))).toBeLessThan(4);
  });

  test("reveals flip on scroll; the thread draws; callbacks, the odometer and the contract follow the scroll", async ({ page }) => {
    await page.goto("/understudy");
    const scene = page.locator(".us-sc").nth(1);
    const win = scene.locator(".us-win");
    await expect(win).not.toHaveAttribute("data-in", "true");
    await scene.scrollIntoViewIfNeeded();
    await expect(win).toHaveAttribute("data-in", "true");
    await expect(scene.locator(".us-sc__t [data-reveal='mask']")).toHaveAttribute("data-in", "true");
    // the lead-in from the held line to the rail is fully drawn (computed as a percentage of its length)
    const offset = await page.locator(".us-thread__lead path").evaluate((el) => parseFloat(getComputedStyle(el).strokeDashoffset));
    expect(offset).toBeLessThan(5);

    await toProgress(page, ".us-casting", 0.05);
    await expect(page.locator(".us-cast__co[data-on]")).toHaveCount(0);
    await toProgress(page, ".us-casting", 0.5);
    const some = await page.locator(".us-cast__co[data-on]").count();
    expect(some).toBeGreaterThan(2);
    expect(some).toBeLessThan(10);
    await toProgress(page, ".us-casting", 0.95);
    await expect(page.locator(".us-cast__co[data-on]")).toHaveCount(10);
    await expect(page.locator(".us-casting")).toHaveAttribute("data-full", "");
    await expect(page.locator(".us-odo__col").first()).toHaveAttribute("style", /--d: ?1/);

    await toProgress(page, ".us-contract", 0.05);
    const sealBefore = await page.locator(".us-deal__seal").evaluate((el) => getComputedStyle(el).scale);
    await toProgress(page, ".us-contract", 0.95);
    await expect.poll(() => page.locator(".us-deal__seal").evaluate((el) => getComputedStyle(el).scale)).toBe("1");
    expect(sealBefore).not.toBe("1");
  });

  test("buttons respond to hover and press", async ({ page }) => {
    await page.goto("/understudy#pricing");
    await toProgress(page, ".us-contract", 1);
    const cta = page.getByRole("link", { name: "Book your first call time" });
    const fill = () => cta.evaluate((el) => getComputedStyle(el, "::before").transform);
    const rest = await fill();
    await cta.hover();
    await expect.poll(fill).not.toBe(rest);
    const box = await cta.boundingBox();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.mouse.down();
    await expect.poll(() => cta.evaluate((el) => getComputedStyle(el).transform)).not.toBe("none");
    await page.mouse.up();
  });
});

test.describe("Understudy with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing is held or hidden, and the house is a plain section", async ({ page }) => {
    await page.goto("/understudy");
    await page.waitForTimeout(300);
    await expect(page.locator("html")).toHaveAttribute("data-us-motion", "static");
    expect(await clipOf(page)).toBe("none");
    const heroHeight = await page.locator(".us-hero").evaluate((el) => (el as HTMLElement).offsetHeight / innerHeight);
    expect(heroHeight).toBeLessThan(2.5);
    for (const el of await page.locator("[data-reveal]").all()) {
      const { opacity, translate, scale } = await el.evaluate((n) => getComputedStyle(n));
      expect(Number(opacity)).toBe(1);
      expect(translate === "none" || translate === "0px").toBe(true);
      expect(scale === "none" || scale === "1").toBe(true);
    }
    await expect(page.locator(".us-cast__co")).toHaveCount(10);
    for (const chip of await page.locator(".us-cast__co").all()) expect(Number(await chip.evaluate((n) => getComputedStyle(n).opacity))).toBe(1);
    expect(await page.locator(".us-house__item").first().getAttribute("style")).toBeNull();
    // the parts ring doesn't run: a plain row that scrolls natively, and no pause control
    await expect(page.locator(".us-parts__track")).not.toHaveAttribute("data-ring", "on");
    expect(await page.locator(".us-part-slot").first().getAttribute("style")).not.toContain("translate3d");
    await expect(page.getByRole("button", { name: "Pause the parts" })).toHaveCount(0);
    expect(await page.locator(".us-deal__seal").evaluate((el) => getComputedStyle(el).scale)).toBe("none");
  });
});

test.describe("Understudy without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the page is finished: headline, the house, the parts and the contract", async ({ page }) => {
    await page.goto("/understudy");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".us-house__h")).toBeVisible();
    await expect(page.locator(".us-part")).toHaveCount(10);
    await expect(page.getByRole("heading", { name: "Built to get you cast." })).toBeVisible();
    expect(await clipOf(page)).toBe("none");
  });
});

test.describe("Understudy on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("the dock, the menu and the held scenes work by touch", async ({ page }) => {
    await page.goto("/understudy");
    await expect(page.locator(".us-dock")).toBeVisible();
    await page.getByRole("button", { name: "Menu" }).tap();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: /Pricing/ }).tap();
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById("pricing")!.getBoundingClientRect().top))).toBeLessThan(4);
    const { scrollWidth, width } = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, width: window.innerWidth }));
    expect(scrollWidth).toBeLessThanOrEqual(width);
    await toProgress(page, ".us-hero", 0.8);
    await expect(page.locator(".us-house__h")).toBeVisible();
  });
});
