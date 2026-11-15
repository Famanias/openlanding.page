import { expect, test, type Page } from "@playwright/test";

const ROUTE = "/templates/elsewhere";

/** Scrolls so an element's top sits a fraction of the way down the viewport, then lets the engine's frame land. */
async function scrollToFraction(page: Page, selector: string, fraction: number) {
  await page.evaluate(
    ([sel, f]) => {
      const node = document.querySelector(sel as string);
      if (!node) throw new Error(`missing ${sel}`);
      const top = node.getBoundingClientRect().top + window.scrollY - window.innerHeight * (f as number);
      window.scrollTo({ top, behavior: "instant" });
    },
    [selector, fraction] as const,
  );
}

/** Scrolls a fraction of the way through the pinned threshold section's scrub distance. */
async function scrollThreshold(page: Page, progress: number) {
  await page.evaluate((p) => {
    const section = document.querySelector<HTMLElement>("[data-ew-threshold]");
    if (!section) throw new Error("missing threshold");
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (section.offsetHeight - window.innerHeight) * p, behavior: "instant" });
  }, progress);
}

/** Resolves once the scroll position has stopped changing (Lenis eases wheel input on desktop). */
async function settleScroll(page: Page) {
  await page.waitForFunction(
    () =>
      new Promise<boolean>((resolve) => {
        const y = window.scrollY;
        setTimeout(() => resolve(Math.abs(window.scrollY - y) < 1), 160);
      }),
  );
}

test.describe("elsewhere", () => {
  test("opens at the road's end with full signal and the whole trail ahead", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Past the last bar\s+of signal\./);
    await expect(page.locator("[data-ew-readout]")).toHaveText("1,900 m to the door");
    await expect(page.locator("[data-ew-meter]")).toHaveAttribute("data-bars", "4");
    await expect(page.locator("[data-ew-header]")).toHaveAttribute("data-state", "top");
  });

  test("walking the trail counts the metres down and drops the signal bar by bar", async ({ page }) => {
    await page.goto(ROUTE);
    const readout = page.locator("[data-ew-readout]");
    const meter = page.locator("[data-ew-meter]");

    await scrollToFraction(page, "#post-cedar-gate", 0.5);
    await expect(page.locator("#post-cedar-gate")).toHaveAttribute("data-reached", "true");
    await expect(page.locator("#post-plank-bridge")).toHaveAttribute("data-reached", "false");
    await expect(meter).toHaveAttribute("data-bars", "2");
    await expect(readout).toHaveText(/^1,4\d0 m to the door$/);
    // the sign stays up on the way in, even though we just scrolled down
    await expect(page.locator("[data-ew-header]")).toHaveAttribute("data-state", "pinned");

    await scrollToFraction(page, "#post-plank-bridge", 0.5);
    await expect(meter).toHaveAttribute("data-bars", "0");
    await expect(page.locator("[data-ew-walked]")).toHaveText(/^9\d0 m$/);

    await scrollToFraction(page, "#post-the-door", 0.3);
    await expect(readout).toHaveText("At the door");
    await expect(page.locator("#post-the-door")).toHaveAttribute("data-reached", "true");

    // and it is reversible
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(readout).toHaveText("1,900 m to the door");
    await expect(meter).toHaveAttribute("data-bars", "4");
  });

  test("the threshold pins and pushes through the door into the room", async ({ page }) => {
    await page.goto(ROUTE);
    const stage = page.locator("[data-ew-stage]");
    const interior = page.locator(".ew-th-interior");

    await scrollThreshold(page, 0);
    await expect(stage).toHaveCSS("position", "sticky");
    await expect(stage).toHaveAttribute("data-beat", "0");
    await expect(interior).toHaveCSS("opacity", "0");
    await expect(page.getByRole("heading", { name: "The light is already on." })).toBeVisible();

    await scrollThreshold(page, 0.5);
    await expect(stage).toHaveAttribute("data-beat", "1");
    const midScale = await stage.evaluate((node) => Number(getComputedStyle(node).getPropertyValue("--ew-ws")));
    expect(midScale).toBeGreaterThan(1.5);

    await scrollThreshold(page, 1);
    await expect(stage).toHaveAttribute("data-beat", "2");
    await expect(interior).toHaveCSS("opacity", "1");
    await expect(interior).toHaveCSS("clip-path", "inset(0px)");
    await expect(page.locator(".ew-th-boughs")).toHaveCSS("opacity", "0");
    await expect(page.getByText("Now sit down.")).toBeVisible();
    await expect(page.locator("[data-ew-readout]")).toHaveText("Inside");
  });

  test("the season buttons change the plate, the facts and the booking quote", async ({ page }) => {
    await page.goto(ROUTE);
    await page.locator(".ew-season").scrollIntoViewIfNeeded();
    const season = page.locator(".ew-season");
    await expect(season).toHaveAttribute("data-season", "green");

    await page.getByText("Amber", { exact: true }).click();
    await expect(season).toHaveAttribute("data-season", "amber");
    await expect(season).toHaveAttribute("data-dir", "forward");
    await expect(page.locator(".ew-season-plate[data-active='true'] img")).toHaveAttribute("data-asset", "cabin-amber");
    await expect(page.locator(".ew-season-month")).toContainText("October");
    await expect(page.locator("#ew-month")).toHaveValue("10");
    // the booking panel further down follows the ruler
    await expect(page.locator("#ew-stay-month")).toHaveValue("10");
    await expect(page.locator(".ew-quote-total-value")).toHaveText("$840");

    await page.getByText("Green", { exact: true }).click();
    await expect(season).toHaveAttribute("data-dir", "back");
    await expect(page.locator(".ew-quote-total-value")).toHaveText("$765");
  });

  test("the month ruler works from the keyboard and announces the month", async ({ page }) => {
    await page.goto(ROUTE);
    const ruler = page.getByRole("slider", { name: "Month on the ruler" });
    await ruler.scrollIntoViewIfNeeded();
    await ruler.focus();
    await expect(ruler).toHaveAttribute("aria-valuetext", "May, green season");
    for (let i = 0; i < 4; i++) await page.keyboard.press("ArrowRight");
    await expect(ruler).toHaveAttribute("aria-valuetext", "September, amber season");
    await expect(page.locator(".ew-season")).toHaveAttribute("data-season", "amber");
    await page.keyboard.press("End");
    await expect(ruler).toHaveAttribute("aria-valuetext", "December, white season");
    await expect(page.locator(".ew-season-facts")).toContainText("$285");
  });

  test("the stay panel steps nights within two and seven and re-prices", async ({ page }) => {
    await page.goto(`${ROUTE}#stay`);
    const total = page.locator(".ew-quote-total-value");
    const more = page.getByRole("button", { name: "One night more" });
    const fewer = page.getByRole("button", { name: "One night fewer" });
    await expect(total).toHaveText("$765");
    await more.click();
    await expect(total).toHaveText("$1,005");
    await fewer.click();
    await fewer.click();
    await expect(total).toHaveText("$525");
    await expect(fewer).toBeDisabled();
    await page.locator("#ew-stay-month").selectOption("1");
    await expect(total).toHaveText("$615");
    await expect(page.locator(".ew-season")).toHaveAttribute("data-season", "white");
  });

  test("the hold form validates, then turns into a key tag without sending anything", async ({ page }) => {
    const requests: string[] = [];
    await page.goto(`${ROUTE}#stay`);
    page.on("request", (request) => {
      if (request.method() !== "GET") requests.push(request.url());
    });
    const submit = page.getByRole("button", { name: "Request the key" });
    await submit.click();
    await expect(page.getByText("Tell us whose name goes on the lockbox.")).toBeVisible();
    await expect(page.getByText("We need an address for the lockbox code.")).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeFocused();

    await page.getByLabel("Your name").fill("Mina Ito");
    await page.getByLabel("Email for the lockbox code").fill("mina@");
    await submit.click();
    await expect(page.getByText("That address doesn't look complete.")).toBeVisible();
    await page.getByLabel("Email for the lockbox code").fill("mina@example.com");
    await submit.click();

    await expect(page.locator(".ew-hold")).toHaveAttribute("data-state", "success", { timeout: 4000 });
    await expect(page.locator(".ew-tag-ref")).toHaveText(/^EW-[0-9A-Z]{6}$/);
    await expect(page.locator(".ew-tag")).toContainText("The light will be on, Mina.");
    await expect(page.locator(".ew-tag")).toContainText("nothing was sent");
    expect(requests).toEqual([]);

    await page.getByRole("button", { name: "Hold different dates" }).click();
    await expect(page.locator(".ew-hold")).toHaveAttribute("data-state", "idle");
    await expect(page.getByLabel("Your name")).toHaveValue("");
  });

  test("reveals flip to data-in on scroll", async ({ page }) => {
    await page.goto(ROUTE);
    const fact = page.locator(".ew-room-fact").first();
    await expect(fact).toHaveAttribute("data-in", "false");
    await fact.scrollIntoViewIfNeeded();
    await expect(fact).toHaveAttribute("data-in", "true");
    const wipe = page.locator(".ew-room-figure");
    await expect(wipe).toHaveAttribute("data-reveal", "wipe");
    await wipe.scrollIntoViewIfNeeded();
    await expect(wipe).toHaveAttribute("data-in", "true");
  });

  test("the nav marks the section you are in and the sign steps aside once inside", async ({ page }) => {
    await page.goto(ROUTE);
    const navbar = page.locator("[data-ew-navbar]");
    await expect(navbar).toHaveAttribute("data-active", "none");
    await scrollToFraction(page, "#room", 0.2);
    await expect(navbar).toHaveAttribute("data-active", "room");
    await expect(page.locator("[data-ew-nav='room']")).toHaveAttribute("aria-current", "true");
    await page.mouse.wheel(0, 600);
    await expect(page.locator("[data-ew-header]")).toHaveAttribute("data-state", "hidden");
    // smooth scrolling is still easing toward the first target: let it land before turning round
    await settleScroll(page);
    await page.mouse.wheel(0, -300);
    await expect(page.locator("[data-ew-header]")).toHaveAttribute("data-state", "pinned");
  });

  test("hash links land on their section and the skip link is the first stop", async ({ page }) => {
    await page.goto(`${ROUTE}#seasons`);
    await expect(page.locator("#seasons")).toBeInViewport();
    await page.goto(ROUTE);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to the walk in" })).toBeFocused();
  });

  test("phone: the menu opens with a focus trap, closes with Escape, and nothing needs hover", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ROUTE);
    await expect(page.locator(".ew-nav")).toBeHidden();
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.locator("#ew-menu");
    await expect(menu).toHaveAttribute("data-open", "true");
    await expect(menu.getByRole("link", { name: /The walk in/ })).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("data-open", "false");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // the readout is visible without hover, and the cabin tag's label is dropped rather than cover the copy
    await expect(page.locator("[data-ew-readout]")).toBeVisible();
    await expect(page.locator(".ew-hero-tag-label")).toBeHidden();
  });
});

test.describe("elsewhere reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("every reveal is visible, nothing pins, and the readout still works", async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForTimeout(600);
    const hidden = await page.$$eval("[data-reveal], .ew-line > span", (nodes) =>
      nodes.filter((node) => {
        const style = getComputedStyle(node);
        return style.opacity === "0" || (style.transform !== "none" && style.transform !== "matrix(1, 0, 0, 1, 0, 0)");
      }).length,
    );
    expect(hidden).toBe(0);
    await expect(page.locator("[data-ew-stage]")).not.toHaveCSS("position", "sticky");
    await expect(page.locator("[data-ew-hero]")).toHaveCSS("position", "relative");
    await expect(page.locator(".ew-th-boughs")).toBeHidden();
    await expect(page.locator(".ew-th-interior img")).toBeVisible();
    await expect(page.locator(".ew-hero-mist")).toBeHidden();
    await expect(page.locator(".ew-marquee-set").nth(1)).toBeHidden();
    // scrubbed values are never written
    const heroVar = await page.locator(".ew-approach").evaluate((node) => node.style.getPropertyValue("--ew-hero"));
    expect(heroVar).toBe("");

    await scrollToFraction(page, "#post-plank-bridge", 0.5);
    await expect(page.locator("[data-ew-meter]")).toHaveAttribute("data-bars", "0");
  });
});

test.describe("elsewhere without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the whole page reads as a finished static document", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-ew-stage]")).not.toHaveCSS("position", "sticky");
    await expect(page.locator(".ew-th-interior img")).toBeVisible();
    await expect(page.getByText("Now sit down.")).toBeVisible();
    await expect(page.locator("#post-the-door")).toBeVisible();
    await expect(page.locator(".ew-room-fact").first()).toHaveCSS("opacity", "1");
    await expect(page.getByRole("heading", { name: "Hold the cabin." })).toBeVisible();
  });
});
