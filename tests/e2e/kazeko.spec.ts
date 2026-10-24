import { test, expect } from "@playwright/test";

test.describe("Studio Kazeko", () => {
  test("explores a film and restores focus when its notes close", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/kazeko");
    await expect(page.locator("h1")).toContainText("A little wonder.");
    await page.getByRole("link", { name: "Step into our stories" }).click();
    const film = page.getByRole("button", { name: "Explore The Last Light" });
    await film.click();
    const dialog = page.getByRole("dialog", { name: "The Last Light" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("A fictional film concept");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(film).toBeFocused();
    expect(errors).toEqual([]);
  });

  test("scrubs from pencil to colour, preserves manual choices, and supports range keys", async ({ page }) => {
    await page.goto("/kazeko#process");
    await page.getByRole("button", { name: "01 Pencil" }).click();
    await expect(page.locator(".kz-scene-player")).toHaveAttribute("data-phase", "Pencil");
    await expect(page.getByRole("slider", { name: "Sketch to colour progress" })).toHaveValue("0");
    const range = page.getByRole("slider", { name: "Sketch to colour progress" });
    await range.focus();
    await range.press("End");
    await expect(page.locator(".kz-scene-player")).toHaveAttribute("data-phase", "Life");
    await page.getByRole("button", { name: "02 Colour" }).click();
    await page.mouse.wheel(0, 100);
    await expect(range).toHaveValue("55");
    await expect(page.getByRole("button", { name: "02 Colour" })).toHaveAttribute("aria-pressed", "true");
    await page.setViewportSize({ width: 1100, height: 800 });
    await expect(range).toHaveValue("55");
    await expect(page.getByRole("button", { name: "Resume scroll animation" })).toBeVisible();
  });

  test("scroll changes the drawing, reveals sections, and pauses ambient animation", async ({ page }) => {
    await page.goto("/kazeko");
    await expect(page.locator(".kz-site")).toHaveAttribute("data-ready", "true");
    const process = page.locator(".kz-process");
    const midpoint = await process.evaluate((node) => node.getBoundingClientRect().top + window.scrollY + ((node as HTMLElement).offsetHeight - innerHeight) * .55);
    await page.evaluate((y) => window.scrollTo(0, y), midpoint);
    await expect(page.locator(".kz-scene-player")).toHaveAttribute("data-phase", "Colour");
    await expect(page.locator("#process [data-kz-reveal]").first()).toHaveAttribute("data-in", "true");
    await page.getByRole("button", { name: "Pause ambient animation" }).click();
    await expect(page.locator(".kz-site")).toHaveAttribute("data-paused", "true");
  });

  test("validates a local brief, focuses success, and downloads the text without posting", async ({ page }) => {
    const posts: string[] = [];
    page.on("request", (request) => { if (request.method() === "POST") posts.push(request.url()); });
    await page.goto("/kazeko#contact");
    await page.getByRole("button", { name: "Start a conversation" }).click();
    await expect(page.getByLabel("Your name", { exact: true })).toBeFocused();
    await expect(page.getByText("What should we call you?")).toBeVisible();
    await page.getByLabel("Your name", { exact: true }).fill("Aki Tanaka");
    await page.getByLabel("Email address").fill("aki@example.com");
    await page.getByLabel("What’s the story you’d like to tell?").fill("A little film about a paper bird finding its way home.");
    await page.getByRole("button", { name: "Start a conversation" }).click();
    await expect(page.getByRole("button", { name: "Gathering your thoughts…" })).toBeDisabled();
    await expect(page.getByRole("status")).toContainText("nothing has been sent");
    await expect(page.getByRole("status")).toBeFocused();
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download your brief" }).click();
    expect((await download).suggestedFilename()).toBe("kazeko-project-brief.txt");
    expect(posts).toEqual([]);
  });

  test("fits 390px touch and provides a trapped, dismissible navigation menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/kazeko");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("dialog", { name: "Navigation", exact: true })).toBeVisible();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Our craft/ }).click();
    await expect(page.getByRole("dialog", { name: "Navigation", exact: true })).not.toBeVisible();
    await expect(page).toHaveURL(/#process$/);
    await expect(page.locator(".kz-process-sticky")).toHaveCSS("position", "relative");
    await page.getByRole("button", { name: "01 Pencil" }).click();
    await expect(page.getByRole("slider")).toHaveValue("0");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });

  test("reduced motion keeps content visible with no sticky drawing or ambient movement", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/kazeko");
    const hidden = await page.locator("[data-kz-reveal]").evaluateAll((nodes) => nodes.filter((node) => getComputedStyle(node).opacity === "0" || getComputedStyle(node).visibility === "hidden").length);
    expect(hidden).toBe(0);
    await expect(page.locator(".kz-process-sticky")).toHaveCSS("position", "static");
    await expect(page.locator(".kz-hero .kz-clouds")).toHaveCSS("animation-name", "none");
    await expect(page.getByRole("button", { name: "Animation disabled by your motion preference" })).toBeDisabled();
  });

  test("real touch input opens film notes and controls the drawing without hover", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    const page = await context.newPage();
    await page.goto(`${test.info().project.use.baseURL}/kazeko`);
    await page.getByRole("button", { name: "Explore The Last Light" }).tap();
    await expect(page.getByRole("dialog", { name: "The Last Light" })).toBeVisible();
    await page.getByRole("button", { name: "Close film details" }).tap();
    await page.getByRole("button", { name: "02 Colour" }).tap();
    await expect(page.getByRole("slider")).toHaveValue("55");
    expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
    await context.close();
  });

  test("without JavaScript the story, concept art, and contact fallback remain visible", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/kazeko");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#studio h2")).toBeVisible();
    await expect(page.getByText("This demonstration form needs JavaScript")).toBeVisible();
    await expect(page.locator(".kz-process-art")).toBeVisible();
    await context.close();
  });
});
