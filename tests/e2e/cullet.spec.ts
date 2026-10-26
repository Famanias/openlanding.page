import { test, expect, type Page } from "@playwright/test";

/** Scroll so that a held scene sits at progress `p` (0..1). */
async function toProgress(page: Page, selector: string, p: number) {
  await page.evaluate(({ selector, p }) => {
    const el = document.querySelector<HTMLElement>(selector)!;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + (el.offsetHeight - innerHeight) * p);
  }, { selector, p });
  await page.waitForTimeout(350);
}

const toSection = (page: Page, id: string) =>
  page.evaluate((id) => document.getElementById(id)!.scrollIntoView({ behavior: "instant" }), id);

/** The DOM over the WebGL slab is homography-mapped, so pointer at its box instead of letting Playwright scroll. */
async function pointAt(page: Page, selector: string, click = false) {
  const b = (await page.locator(selector).boundingBox())!;
  if (click) await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
  else await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
}

test.describe("Cullet", () => {
  test("the slab: one heading, eleven cut shards, and the WebGL glass taking over on idle", async ({ page }) => {
    await page.goto("/cullet");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Designed\s+in glass\./);
    await expect(page.locator(".fc-poster__set").first().locator(".fc-shard")).toHaveCount(11);
    await expect(page.locator(".fc-hero")).toHaveAttribute("data-gl", "on", { timeout: 20_000 });
    // the DOM stays for selection: the headline is still real text, mapped onto the glass
    const transform = await page.locator(".fc-slab__panel").evaluate((el) => getComputedStyle(el).transform);
    expect(transform).toMatch(/^matrix3d\(/);
    await expect(page.locator(".fc-slab__title")).toContainText("in glass.");
  });

  test("scrolling cleaves the slab and reveals the next chapter behind it", async ({ page }) => {
    await page.goto("/cullet");
    await page.waitForTimeout(400);
    const shard = page.locator(".fc-poster__set").first().locator(".fc-shard").nth(5);
    const rest = await shard.evaluate((el) => getComputedStyle(el).transform);
    await toProgress(page, ".fc-hero", 0.5);
    const cleave = Number(await page.locator(".fc-hero").evaluate((el) => el.style.getPropertyValue("--cleave")));
    expect(cleave).toBeGreaterThan(0.3);
    await expect(page.locator(".fc-hero")).toHaveAttribute("data-cleaving", "");
    expect(await shard.evaluate((el) => getComputedStyle(el).transform)).not.toBe(rest);
    const under = Number(await page.locator(".fc-hero__under").evaluate((el) => getComputedStyle(el).opacity));
    expect(under).toBeGreaterThan(0.2);
    // the header arrives once the slab is gone
    await toProgress(page, ".fc-hero", 1);
    await page.mouse.wheel(0, -40);
    await expect(page.locator("html")).toHaveAttribute("data-fc-chrome", /on|tucked/);
  });

  test("Read paper shatters the glass into a note; Back and Escape put it back and return focus", async ({ page }) => {
    await page.goto("/cullet");
    await page.waitForTimeout(600);
    await pointAt(page, "[data-paper-open]", true);
    const paper = page.getByRole("dialog", { name: /Dispersion in a single forward pass/ });
    await expect(paper).toBeVisible();
    await expect(page.locator(".fc-hero")).toHaveAttribute("data-state", "paper");
    await expect(page.getByRole("button", { name: /Back/ })).toBeFocused();
    await expect(page.locator(".fc-slab")).toHaveAttribute("inert", "");
    await page.keyboard.press("Escape");
    await expect(paper).toBeHidden();
    await expect(page.locator(".fc-hero")).toHaveAttribute("data-state", "assembled");
    await expect(page.locator("[data-paper-open]")).toBeFocused();

    await pointAt(page, "[data-paper-open]", true);
    await page.getByRole("button", { name: /Back/ }).click();
    await expect(paper).toBeHidden();
  });

  test("the five terms step with the scroll, the rail follows, and the rail jumps", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/cullet");
    const terms = page.locator(".fc-term");
    await toProgress(page, ".fc-terms", 0.05);
    await expect(terms.nth(0)).toHaveAttribute("data-active", "");
    await toProgress(page, ".fc-terms", 0.45);
    await expect(terms.nth(2)).toHaveAttribute("data-active", "");
    await expect(terms.nth(0)).not.toHaveAttribute("data-active", "");
    await expect(page.getByRole("button", { name: /Dispersion/ })).toHaveAttribute("aria-current", "step");
    // the active term's rays draw
    const offset = () => terms.nth(2).locator("[pathLength]").first().evaluate((el) => Number(getComputedStyle(el).strokeDashoffset.replace("px", "")));
    await expect.poll(offset).toBeLessThan(0.05);
    await page.getByRole("button", { name: /Roughness/ }).click();
    await expect(terms.nth(4)).toHaveAttribute("data-active", "", { timeout: 4000 });
  });

  test("the sampler: dials rewrite the glTF, presets light up, and a library card loads into it", async ({ page }) => {
    await page.goto("/cullet");
    await toSection(page, "sampler");
    const quartz = page.getByRole("group", { name: "Presets" }).getByRole("button", { name: "Frosted quartz" });
    await expect(quartz).toHaveAttribute("aria-pressed", "true");

    const ior = page.getByRole("slider", { name: "Index of refraction" });
    // the dials are native ranges: End goes to the top, arrows step by 0.01
    await ior.focus();
    await page.keyboard.press("End");
    await expect(page.locator(".fc-dial__value").first()).toHaveText("2.40");
    for (let i = 0; i < 30; i++) await page.keyboard.press("ArrowLeft");
    await expect(page.locator(".fc-dial__value").first()).toHaveText("2.10");
    await expect(page.locator(".fc-readout__code")).toContainText('"ior": 2.1');
    await expect(page.locator(".fc-readout__ln[data-hot]")).toContainText('"ior"');
    await expect(quartz).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".fc-dials__abbe")).toContainText("Custom glass");
    // the drawn preview bends further
    const bend = await page.locator(".fc-sampler__stage").evaluate((el) => el.style.getPropertyValue("--bend"));
    expect(parseFloat(bend)).toBeGreaterThan(30);

    await page.getByRole("group", { name: "Presets" }).getByRole("button", { name: "Sapphire" }).click();
    await expect(page.locator(".fc-readout__code")).toContainText('"ior": 1.77');

    await toSection(page, "materials");
    await page.getByRole("link", { name: /Open in studio.*Dense flint/ }).click();
    await expect(page.getByRole("group", { name: "Presets" }).getByRole("button", { name: "Dense flint" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".fc-readout__head")).toContainText("dense-flint.gltf");
    await expect.poll(() => page.evaluate(() => document.getElementById("sampler")!.getBoundingClientRect().top)).toBeLessThan(200);

    await page.getByRole("button", { name: "Copy JSON" }).click();
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  });

  test("pricing switches cadence with a sliding pill and rolls the price", async ({ page }) => {
    await page.goto("/cullet");
    await toSection(page, "pricing");
    const studio = page.locator("#fc-cut-studio");
    await expect(studio.locator(".fc-cut__amount")).toHaveText("$24");
    await page.getByRole("radio", { name: /Yearly/ }).click();
    await expect(page.getByRole("radio", { name: /Yearly/ })).toHaveAttribute("aria-checked", "true");
    await expect(studio.locator(".fc-cut__amount")).toHaveText("$19");
    await expect(page.locator(".fc-toggle")).toHaveAttribute("style", /--at:\s*1/);
  });

  test("the seat form validates, focuses the first error, then cleaves into a glass check with no request", async ({ page }) => {
    await page.goto("/cullet");
    await toSection(page, "open");
    const requests: string[] = [];
    page.on("request", (r) => { if (r.method() !== "GET") requests.push(r.url()); });

    await page.getByRole("button", { name: /Request a seat/ }).click();
    await expect(page.getByLabel("Work email")).toBeFocused();
    await expect(page.getByText("Add the email your seat should go to.")).toBeVisible();
    await expect(page.getByText("Pick what you'll use glass for.")).toBeVisible();

    await page.getByLabel("Work email").fill("ines@kettleandray.studio");
    await expect(page.getByText("Add the email your seat should go to.")).toBeHidden();
    await page.getByRole("radio", { name: "3D & motion" }).check();
    await page.getByLabel("Team size").selectOption("2–10");
    await page.getByRole("button", { name: /Request a seat/ }).click();
    await expect(page.getByRole("button", { name: /Cutting your seat/ })).toBeDisabled();
    await expect(page.getByText("Your seat is cut.")).toBeVisible();
    await expect(page.locator(".fc-seat__done")).toContainText("Dense flint");
    await expect(page.locator(".fc-seat__done")).toBeFocused();
    expect(requests).toEqual([]);

    await page.getByRole("button", { name: "Request another seat" }).click();
    await expect(page.getByLabel("Work email")).toHaveValue("");
  });

  test("reveals flip as they arrive, and hover and press respond", async ({ page }) => {
    await page.goto("/cullet");
    const card = page.locator("#fc-mat-sapphire");
    await expect(card).not.toHaveAttribute("data-in", "true");
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute("data-in", "true");
    await page.waitForTimeout(900);
    const lift = () => card.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);
    await card.hover();
    await expect.poll(lift).toBeLessThan(-3);
    await expect(page.locator("#fc-mat-crown-silica")).toHaveCSS("opacity", "0.72");
    await toSection(page, "workflow");
    await expect(page.locator(".fc-flow__line")).toHaveAttribute("data-in", "true");
  });

  test("reduced motion: no WebGL, nothing held or hidden, every term readable", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/cullet");
    await page.waitForTimeout(2500);
    await expect(page.locator(".fc-hero")).not.toHaveAttribute("data-gl", "on");
    await expect(page.locator(".fc-hero__stage")).toHaveCSS("position", "relative");
    for (const el of await page.locator("[data-reveal]").all()) {
      expect(Number(await el.evaluate((n) => getComputedStyle(n).opacity))).toBe(1);
    }
    await expect(page.locator(".fc-term")).toHaveCount(5);
    for (const term of await page.locator(".fc-term__name").all()) await expect(term).toBeVisible();
    await toSection(page, "sampler");
    await expect(page.locator(".fc-sampler__stage")).not.toHaveAttribute("data-glass", "on");
    await ctx.close();
  });

  test("phone: the glass waits for a tap, the menu opens and closes, and nothing overflows", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await page.goto("/cullet");
    await expect(page.getByRole("button", { name: "Light the glass" })).toBeVisible();
    await page.waitForTimeout(1200);
    await expect(page.locator(".fc-hero")).not.toHaveAttribute("data-gl", "on");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

    await toSection(page, "workflow");
    await page.mouse.wheel(0, -60);
    await page.evaluate(() => document.documentElement.setAttribute("data-fc-chrome", "on"));
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.locator("#fc-menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await ctx.close();
  });
});
