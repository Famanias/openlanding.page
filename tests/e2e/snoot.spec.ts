import { expect, test, type Page } from "@playwright/test";

const ROUTE = "/templates/snoot";

/** Scrolls a fraction of the way through the pinned check-up section's scrub distance. */
async function scrollCheckup(page: Page, progress: number) {
  await page.evaluate((p) => {
    const section = document.querySelector<HTMLElement>("#checkup");
    if (!section) throw new Error("missing #checkup");
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (section.offsetHeight - window.innerHeight) * p, behavior: "instant" });
  }, progress);
}

async function scrollToSection(page: Page, selector: string, offset = 120) {
  await page.evaluate(
    ([sel, off]) => {
      const node = document.querySelector(sel as string);
      if (!node) throw new Error(`missing ${sel}`);
      window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - (off as number), behavior: "instant" });
    },
    [selector, offset] as const,
  );
}

test.describe("snoot", () => {
  test("opens on the hero with one h1, the header at rest and the tagline", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(/Every check-up,\s*nose to tail\./);
    await expect(page.locator("[data-sn-header]")).toHaveAttribute("data-state", "top");
    await expect(page.getByRole("link", { name: /Fetch an appointment/ }).first()).toHaveAttribute("href", "#book");
  });

  test("booping Frank's nose counts, reacts and sneezes on the fifth boop", async ({ page }) => {
    await page.goto(ROUTE);
    const nose = page.getByRole("button", { name: "Boop me: Frank's nose" });
    const boop = page.locator(".sn-boop");
    await expect(boop).toHaveAttribute("data-beat", "rest");
    await nose.click();
    await expect(boop).toHaveAttribute("data-beat", "a");
    await expect(page.locator(".sn-boop-count")).toContainText("1,285 boops today");
    await expect(page.locator(".sn-boop-count")).toContainText("1 from you");
    for (let i = 0; i < 4; i++) await nose.click();
    await expect(boop).toHaveAttribute("data-sneeze", "true");
    await expect(page.locator(".sn-boop-bubble")).toHaveText("Achoo!");
  });

  test("scrolling walks the stethoscope from nose to tail and stamps the all clear", async ({ page }) => {
    await page.goto(ROUTE);
    const stage = page.locator("[data-ck-stage]");
    await scrollCheckup(page, 0.02);
    await expect(stage).toHaveAttribute("data-chapter", "nose");
    await expect(page.locator("#ck-nose")).toHaveAttribute("data-state", "active");

    await scrollCheckup(page, 0.24);
    await expect(stage).toHaveAttribute("data-chapter", "heart");
    await expect(page.locator("#ck-nose")).toHaveAttribute("data-state", "before");
    await expect(page.locator("#ck-tail")).toHaveAttribute("data-state", "after");
    await expect(page.locator("[data-ck-live]")).toHaveText(/92 bpm/);
    await expect(page.locator("[data-ck-count]")).toHaveText("03");
    await expect(stage).toHaveAttribute("data-done", "false");

    await scrollCheckup(page, 1);
    await expect(stage).toHaveAttribute("data-chapter", "tail");
    await expect(stage).toHaveAttribute("data-done", "true");
    // the track really moved: the examined point is far along Frank's body
    const tx = await page.locator("[data-ck-track]").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
    expect(tx).toBeLessThan(-500);
  });

  test("the rail jumps to a chapter", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollCheckup(page, 0.02);
    await page.locator('[data-ck-jump="3"]').click();
    await expect(page.locator("[data-ck-stage]")).toHaveAttribute("data-chapter", "belly", { timeout: 5000 });
    await expect(page.locator('[data-ck-jump="3"]')).toHaveAttribute("aria-current", "step");
  });

  test("species tabs switch by click and by arrow key", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#patients");
    await expect(page.getByRole("tab", { name: "Dogs" })).toHaveAttribute("aria-selected", "true");
    await page.getByRole("tab", { name: "Cats" }).click();
    await expect(page.locator("#sn-panel-cat")).toHaveAttribute("data-state", "active");
    await expect(page.locator("#sn-panel-dog")).toHaveAttribute("data-state", "before");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: "Rabbits" })).toBeFocused();
    await expect(page.locator("#sn-panel-rabbit")).toHaveAttribute("data-state", "active");
    await page.keyboard.press("End");
    await expect(page.getByRole("tab", { name: "Small & scaly" })).toHaveAttribute("aria-selected", "true");
  });

  test("plans re-price for pets and yearly billing, and a tag flips", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#plans");
    await expect(page.locator('[data-sn-price="pup"]')).toHaveText(/£16/);
    await page.getByRole("button", { name: "One more pet" }).click();
    await expect(page.locator("[data-sn-pets]")).toContainText("2 pets");
    await expect(page.locator('[data-sn-price="pup"]')).toHaveText(/£30/);
    await page.locator('[data-sn-billing="yearly"]').click();
    await expect(page.locator('[data-sn-price="pup"]')).toHaveText(/£25/);
    await page.getByRole("button", { name: "What's in Grown-up" }).click();
    await expect(page.locator('[data-plan="grown"] .sn-tag')).toHaveAttribute("data-flipped", "true");
    await page.getByRole("button", { name: "Back to Grown-up price" }).click();
    await expect(page.locator('[data-plan="grown"] .sn-tag')).toHaveAttribute("data-flipped", "false");
  });

  test("the booking form flags missing fields, then books and shows the dog tag", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#book");
    await page.getByRole("button", { name: "Fetch an appointment" }).click();
    await expect(page.locator("#sn-err-petName")).toHaveText(/Who's coming in/);
    await expect(page.locator('[name="petName"]')).toBeFocused();

    await page.locator('[name="petName"]').fill("Biscuit");
    await page.locator("label.sn-chip").filter({ hasText: /^Dog$/ }).click();
    await expect(page.locator(`input[name="species"][value="dog"]`)).toBeChecked();
    await page.locator('[name="reason"]').selectOption("checkup");
    await page.locator("label.sn-day").first().click();
    await page.locator('[name="owner"]').fill("Mara Ilunga");
    await page.locator('[name="contact"]').fill("mara@example.com");
    await page.getByRole("button", { name: "Fetch an appointment" }).click();
    await expect(page.locator(".sn-booking")).toHaveAttribute("data-phase", "sending");
    await expect(page.locator(".sn-booking")).toHaveAttribute("data-phase", "done");
    await expect(page.locator("[data-sn-summary]")).toHaveText(/^Biscuit · Check-up · \w{3} \d{1,2} \w{3}$/);
    await expect(page.getByRole("status", { name: "Booking confirmed" })).toBeFocused();
    await page.getByRole("button", { name: "Book another pet" }).click();
    await expect(page.locator(".sn-booking")).toHaveAttribute("data-phase", "idle");
  });

  test("reveals flip to in-view on scroll", async ({ page }) => {
    await page.goto(ROUTE);
    const heading = page.locator("#sn-team-title");
    await expect(heading).toHaveAttribute("data-in", "false");
    await scrollToSection(page, "#team", 0);
    await expect(heading).toHaveAttribute("data-in", "true");
  });

  test("the header hides on scroll down and returns on scroll up", async ({ page }) => {
    await page.goto(ROUTE);
    const header = page.locator("[data-sn-header]");
    // the open-now sign only fills in after hydration, so the scroll listeners are attached by then
    await expect(page.locator("[data-sn-open]")).not.toHaveAttribute("data-open", "unknown");
    await page.mouse.move(600, 400);
    await page.mouse.wheel(0, 1600);
    await expect(header).toHaveAttribute("data-state", "hidden");
    // let Lenis finish easing down, or the upward wheel only shortens the downward glide
    await page.waitForFunction(() => new Promise<boolean>((resolve) => { const y = window.scrollY; setTimeout(() => resolve(Math.abs(window.scrollY - y) < 1), 200); }));
    await page.mouse.wheel(0, -400);
    await expect(header).toHaveAttribute("data-state", "scrolled");
  });
});

test.describe("snoot on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("no horizontal overflow, the menu opens and closes, and the ball waits for a tap", async ({ page }) => {
    await page.goto(ROUTE);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(page.locator("#sn-menu")).toHaveAttribute("data-open", "true");
    await page.keyboard.press("Escape");
    await expect(page.locator("#sn-menu")).toHaveAttribute("data-open", "false");
    await scrollToSection(page, "#book");
    await expect(page.locator(".sn-ball")).toHaveAttribute("data-mode", "poster");
    await expect(page.getByRole("button", { name: "Tap to play fetch" })).toBeVisible();
  });
});

test.describe("snoot with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows every reveal, lays the check-up out statically and never mounts the 3D ball", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.locator("[data-sn-ball-canvas]")).toHaveCount(0);
    const stage = page.locator("[data-ck-stage]");
    expect(await stage.evaluate((el) => getComputedStyle(el).position)).not.toBe("sticky");
    for (const id of ["nose", "ears", "heart", "belly", "paws", "tail"]) await expect(page.locator(`#ck-${id}`)).toBeVisible();
    const hidden = await page.evaluate(
      () => [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter((el) => getComputedStyle(el).opacity === "0").length,
    );
    expect(hidden).toBe(0);
  });
});
