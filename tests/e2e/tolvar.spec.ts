import { expect, test, type Page } from "@playwright/test";

const ROUTE = "/templates/tolvar";

/** Scrolls so an element's top sits near the top of the viewport, then lets the scroll frame land. */
async function scrollToSection(page: Page, selector: string, offset = 100) {
  await page.evaluate(
    ([sel, off]) => {
      const node = document.querySelector(sel as string);
      if (!node) throw new Error(`missing ${sel}`);
      window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - (off as number), behavior: "instant" });
    },
    [selector, offset] as const,
  );
}

const good = { firstName: "Ana", lastName: "Lindqvist", email: "ana@example.com", phone: "(218) 555-0199" };

async function fillEstimate(page: Page, values: Partial<typeof good>) {
  for (const [name, value] of Object.entries(values)) await page.locator(`[name="${name}"]`).fill(value);
}

test.describe("tolvar", () => {
  test("opens on the hero with one h1, the renamed brand and no trace of the source business", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/20\+ Years of\s+Reliable Excavation\./);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-tv-header]")).toHaveAttribute("data-state", "top");
    await expect(page.getByRole("link", { name: /\(218\) 555-0142/ }).first()).toHaveAttribute("href", "tel:+12185550142");
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const word of ["menke", "dearborn", "camden point", "missouri"]) expect(text).not.toContain(word);
  });

  test("the four work tabs switch panels by click and by arrow key", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#work");
    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(4);
    await expect(page.getByRole("tab", { name: /Cut/ })).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#tv-panel-cut")).toHaveAttribute("data-state", "active");

    await page.getByRole("tab", { name: /Pipe/ }).click();
    await expect(page.locator("#tv-panel-pipe")).toHaveAttribute("data-state", "active");
    await expect(page.locator("#tv-panel-cut")).toHaveAttribute("data-state", "before");
    await expect(page.locator("#tv-panel-haul")).toHaveAttribute("data-state", "after");
    await expect(page.locator("#tv-panel-pipe")).toContainText("Water Lines");

    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /Haul/ })).toBeFocused();
    await expect(page.locator("#tv-panel-haul")).toHaveAttribute("data-state", "active");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /Cut/ })).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(page.getByRole("tab", { name: /Haul/ })).toHaveAttribute("aria-selected", "true");
  });

  test("all twenty services are on the page", async ({ page }) => {
    await page.goto(ROUTE);
    await expect(page.locator(".tv-service-name")).toHaveCount(20);
  });

  test("quoting a kind of work carries it down to the estimate form", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#work");
    await page.getByRole("tab", { name: /Fill/ }).click();
    await page.locator('[data-tv-quote="fill"]').click();
    await expect(page.locator('input[name="kind"][value="fill"]')).toBeChecked();
  });

  test("the job log filters, counts and opens a photo viewer that steps and closes", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#log");
    const count = page.locator("[data-tv-count]");
    await expect(count).toHaveText("All 22 jobs");
    await expect(page.locator(".tv-job")).toHaveCount(22);

    await page.locator('[data-tv-filter="pipe"]').click();
    await expect(page.locator('[data-tv-filter="pipe"]')).toHaveAttribute("aria-pressed", "true");
    await expect(count).toHaveText("4 of 22 jobs");
    await expect(page.locator(".tv-job")).toHaveCount(4);

    await page.locator(".tv-job-open").first().click();
    const viewer = page.locator("dialog.tv-viewer");
    await expect(viewer).toHaveAttribute("open", "");
    await expect(viewer.locator(".tv-viewer-no")).toContainText("1 of 4");
    await page.keyboard.press("ArrowRight");
    await expect(viewer.locator(".tv-viewer-no")).toContainText("2 of 4");
    await viewer.getByRole("button", { name: "Previous job" }).click();
    await viewer.getByRole("button", { name: "Previous job" }).click();
    await expect(viewer.locator(".tv-viewer-no")).toContainText("4 of 4");
    await page.keyboard.press("Escape");
    await expect(viewer).not.toHaveAttribute("open", "");
  });

  test("the crew accordion opens one position at a time", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#crew");
    const laborer = page.getByRole("button", { name: /Laborer/ });
    const foreman = page.getByRole("button", { name: /Foreman/ });
    await expect(laborer).toHaveAttribute("aria-expanded", "true");
    await foreman.click();
    await expect(foreman).toHaveAttribute("aria-expanded", "true");
    await expect(laborer).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("Five years leading a crew")).toBeVisible();
  });

  test("the estimate form blocks an empty request and focuses the first bad field", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#estimate");
    await page.getByRole("button", { name: "Send my request" }).click();
    await expect(page.locator('[name="firstName"]')).toBeFocused();
    await expect(page.locator('[name="firstName"]')).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#tv-email-error")).toHaveText(/email/i);
    await expect(page.locator("[data-tv-form]")).toHaveAttribute("data-status", "idle");

    await fillEstimate(page, { ...good, email: "ana@" });
    await page.getByRole("button", { name: "Send my request" }).click();
    await expect(page.locator('[name="email"]')).toBeFocused();
    await expect(page.locator('[name="firstName"]')).toHaveAttribute("aria-invalid", "false");
  });

  test("a good request writes a ticket without any network call, and can be reset", async ({ page }) => {
    const posts: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") posts.push(request.url());
    });
    await page.goto(ROUTE);
    await scrollToSection(page, "#estimate");
    await page.locator(".tv-kind", { hasText: "Pipe" }).click();
    await fillEstimate(page, good);
    await page.getByRole("button", { name: "Send my request" }).click();

    const shell = page.locator("[data-tv-form]");
    await expect(shell).toHaveAttribute("data-status", "sent");
    const done = page.locator("[data-tv-done]");
    await expect(done).toContainText("Ticket written, Ana.");
    await expect(done).toContainText("T-0199");
    await expect(done).toContainText("Pipe");
    expect(posts).toEqual([]);

    await done.getByRole("button", { name: "Send another" }).click();
    await expect(shell).toHaveAttribute("data-status", "idle");
    await expect(page.locator('[name="firstName"]')).toHaveValue("");
  });

  test("scrolling moves the level bubble, hides the bar going down and brings it back going up", async ({ page }) => {
    await page.goto(ROUTE);
    const header = page.locator("[data-tv-header]");
    await expect.poll(() => page.evaluate(() => document.documentElement.style.getPropertyValue("--tv-progress"))).toBe("0");
    await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-state", "hidden");
    await expect.poll(() => page.evaluate(() => Number(getComputedStyle(document.documentElement).getPropertyValue("--tv-progress")))).toBeGreaterThan(0.05);
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-state", "pinned");
  });

  test("reveals flip to data-in as their section scrolls into view", async ({ page }) => {
    await page.goto(ROUTE);
    const title = page.locator("#tv-yard-title");
    await expect(title).toHaveAttribute("data-in", "false");
    await scrollToSection(page, "#yard", 200);
    await expect(title).toHaveAttribute("data-in", "true");
  });

  test("nav links mark the section being read", async ({ page }) => {
    await page.goto(ROUTE);
    await scrollToSection(page, "#yard", 60);
    await expect(page.locator('[data-tv-link="yard"]')).toHaveAttribute("aria-current", "true");
    await expect(page.locator('[data-tv-link="work"]')).not.toHaveAttribute("aria-current", "true");
  });
});

test.describe("tolvar on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("the menu opens, traps Escape, and a link closes it", async ({ page }) => {
    await page.goto(ROUTE);
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.locator("#tv-menu");
    await expect(menu).toHaveAttribute("data-open", "true");
    await expect(page.locator("html")).toHaveClass(/tv-locked/);
    await menu.getByRole("link", { name: /Gallery/ }).click();
    await expect(menu).toHaveAttribute("data-open", "false");
    await expect(page.locator("html")).not.toHaveClass(/tv-locked/);
  });

  test("nothing overflows sideways and the tabs still work by tap", async ({ page }) => {
    await page.goto(ROUTE);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await scrollToSection(page, "#work");
    await page.getByRole("tab", { name: /Haul/ }).tap();
    await expect(page.locator("#tv-panel-haul")).toHaveAttribute("data-state", "active");
  });
});

test.describe("tolvar with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("every reveal is visible without scrolling to it, and smooth scroll never loads", async ({ page }) => {
    await page.goto(ROUTE);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter((node) => {
        const style = getComputedStyle(node);
        return Number(style.opacity) < 1 || (style.clipPath !== "none" && style.clipPath !== "inset(0px)");
      }).length,
    );
    expect(hidden).toBe(0);
    await page.waitForTimeout(1800);
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    await expect(page.locator(".tv-hero-title")).toBeVisible();
  });
});
