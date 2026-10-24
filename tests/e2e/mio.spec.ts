import { expect, test } from "@playwright/test";

test.describe("Mio Hazuki's illustrated commission portfolio", () => {
  test("opens the harbor, lifts its lantern, and pauses the scene", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/mio");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("A little wonder,made just for you.");
    await expect(page.locator(".mh-harbor")).toBeVisible();
    await expect(page.locator(".mh-hero img,.mh-hero canvas,.mh-hero video")).toHaveCount(0);
    await page.waitForFunction(() => document.querySelector(".mh-site")?.getAttribute("style")?.includes("--lantern-y"));
    await page.mouse.wheel(0, 450);
    await expect.poll(() => page.locator(".mh-site").evaluate(el => parseFloat((el as HTMLElement).style.getPropertyValue("--lantern-y")))).toBeLessThan(-30);
    await page.getByRole("button", { name: "Pause scenery motion" }).click();
    await expect(page.locator(".mh-site")).toHaveAttribute("data-paused", "true");
    await expect.poll(() => page.locator(".mh-site").evaluate(el => (el as HTMLElement).style.getPropertyValue("--lantern-y"))).toBe("0px");
    await page.getByRole("button", { name: "Play scenery motion" }).click();
    expect(errors).toEqual([]);
  });

  test("filters artwork and supports a keyboard-accessible work dialog", async ({ page }) => {
    await page.goto("/mio#work");
    await page.getByRole("button", { name: "Characters", exact: true }).click();
    await expect(page.locator(".mh-work-open")).toHaveCount(1);
    const work = page.getByRole("button", { name: "View The cloud keeper" });
    await work.focus(); await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toHaveText("The cloud keeper");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(work).toBeFocused();
    await page.getByRole("button", { name: "All work", exact: true }).click();
    await expect(page.locator(".mh-work-open")).toHaveCount(4);
    await page.locator(".mh-work-open").first().hover();
    await expect(page.locator(".mh-art-view").first()).toHaveCSS("opacity", "1");
  });

  test("preselects a price, validates the brief, and honestly prepares a local success", async ({ page }) => {
    await page.goto("/mio");
    await page.locator('a[data-mh-package="moment"]').click();
    await expect(page).toHaveURL(/#inquiry$/);
    await expect(page.getByLabel("What are you dreaming of?")).toHaveValue("moment");
    await page.getByRole("button", { name: "Let's make a little magic" }).click();
    await expect(page.getByLabel("What should I call you?")).toBeFocused();
    await expect(page.locator(".mh-error")).toHaveCount(3);
    await page.getByLabel("What should I call you?").fill("Rin");
    await page.getByLabel("Where can I find you?").fill("rin@example.com");
    await page.getByLabel("Tell me a little about your idea").fill("A little illustration of my sister and her cat at our childhood seaside station.");
    const submissions: string[] = [];
    page.on("request", request => { if (request.method() === "POST") submissions.push(request.url()); });
    await page.getByRole("button", { name: "Let's make a little magic" }).click();
    await expect(page.getByRole("button", { name: "Gathering your daydream…" })).toBeDisabled();
    const success = page.locator(".mh-form-success");
    await expect(success).toBeVisible();
    await expect(success).toBeFocused();
    await expect(success).toContainText("Your message hasn't been sent or stored");
    await page.getByRole("button", { name: "Copy my commission brief" }).click();
    await expect(page.getByRole("button", { name: "Brief copied" })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("A little moment");
    expect(submissions).toEqual([]);
    await page.getByRole("button", { name: "Start another idea" }).click();
    await expect(page.getByRole("form", { name: "Commission inquiry" })).toBeVisible();
  });

  test("supports deep links, disclosures, and progressive reveals", async ({ page }) => {
    await page.goto("/mio?commission=world#inquiry");
    await expect(page.getByLabel("What are you dreaming of?")).toHaveValue("world");
    const question = page.getByText("Can I use my illustration commercially?", { exact: true });
    await question.click();
    await expect(page.locator(".mh-faq-item").nth(1)).toHaveAttribute("open", "");
    for (const section of [".mh-about", ".mh-pricing", ".mh-process"]) {
      const reveal = page.locator(section).locator("[data-mh-reveal]").first();
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveAttribute("data-in", "true");
    }
  });

  test("closes on a coded harbor footer whose links all reach real sections", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/mio");
    const footer = page.locator("footer.mh-footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator(".mh-footer-art")).toBeVisible();
    await expect(footer.locator("img,canvas,video")).toHaveCount(0);
    await expect(footer.locator(".mh-footer-scene")).toHaveAttribute("data-visible", "true");
    const hrefs = await footer.locator(".mh-footer-link").evaluateAll(links => links.map(link => link.getAttribute("href")));
    expect(hrefs).toHaveLength(6);
    for (const href of hrefs) await expect(page.locator(`main ${href}`)).toHaveCount(1);
    await footer.getByRole("link", { name: "Start a commission brief" }).click();
    await expect(page).toHaveURL(/#inquiry$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
  });

  test("keeps a 390px touch layout navigable with visible artwork and prices", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage(); await page.goto("/mio");
    await page.getByLabel("Open navigation").click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Commissions", exact: true }).click();
    await expect(page.locator(".mh-mobile-menu")).not.toHaveAttribute("open", "");
    await expect(page).toHaveURL(/#commissions$/);
    await expect(page.locator(".mh-price")).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
    await page.getByLabel("Open navigation").click();
    await page.keyboard.press("Escape");
    await expect(page.getByLabel("Open navigation")).toBeFocused();
    await context.close();
  });

  test("offers a complete static experience with reduced motion and with JavaScript off", async ({ browser }) => {
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", javaScriptEnabled });
      const page = await context.newPage(); await page.goto("/mio");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator(".mh-work-open")).toHaveCount(4);
      for (const reveal of await page.locator("[data-mh-reveal]").all()) {
        await expect(reveal).toHaveCSS("opacity", "1");
        await expect(reveal).toHaveCSS("clip-path", "none");
      }
      await expect(page.locator(".mh-clouds").first()).toHaveCSS("animation-name", "none");
      await expect(page.locator(".mh-footer-lantern")).toHaveCSS("animation-name", "none");
      await expect(page.locator(".mh-footer-art")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
      if (!javaScriptEnabled) await expect(page.getByRole("form")).not.toBeVisible();
      await context.close();
    }
  });
});
