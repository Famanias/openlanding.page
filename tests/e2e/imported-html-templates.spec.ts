import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const imports = [
  { slug: "cirro", title: "CIRRO", menu: "#menuButton", section: "#manifesto" },
  { slug: "orova", title: "OROVA", menu: "#mobileToggle", section: "#manifesto" },
  { slug: "vyra", title: "VYRA", menu: "#menu-toggle", section: "#manifesto" },
  { slug: "auven", title: "AUVEN", menu: "#menuToggle", section: "#about" },
  { slug: "nema", title: "NEMA", menu: "#navToggle", section: "#how" },
  { slug: "velora", title: "VELORA", menu: "#menuToggle", section: "#how" },
] as const;

for (const template of imports) {
  test.describe(template.title, () => {
    test("gallery search, prompt, preview, live link, and HTML download work", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("searchbox").fill(template.title);
      const card = page.locator("article").filter({ has: page.getByRole("heading", { name: template.title, exact: true }) });
      await expect(card).toBeVisible();
      await expect(card.getByRole("link", { name: template.title, exact: true })).toHaveAttribute("href", `/${template.slug}`);
      await expect.poll(() => card.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
      await card.getByRole("button", { name: "Copy prompt", exact: true }).click();
      await expect(card.getByRole("button", { name: "Copied prompt", exact: true })).toBeVisible();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(`# Rebuild ${template.title}`);

      const event = page.waitForEvent("download");
      await card.getByRole("button", { name: "Download HTML", exact: true }).click();
      const download = await event;
      expect(download.suggestedFilename()).toBe(`${template.slug}.html`);
      expect(await readFile((await download.path())!, "utf8")).toBe(
        await readFile(path.join(process.cwd(), "public/downloads", `${template.slug}.html`), "utf8"),
      );
      const popupEvent = page.waitForEvent("popup");
      await card.getByRole("link", { name: template.title, exact: true }).click();
      const popup = await popupEvent;
      await expect(popup).toHaveURL(new RegExp(`/${template.slug}$`));
      await expect(popup.locator("h1")).toBeVisible();
    });

    test("live route and download return the same original HTML without runtime errors", async ({ page, request }) => {
      const original = await readFile(path.join(process.cwd(), "public/downloads", `${template.slug}.html`), "utf8");
      for (const url of [`/${template.slug}`, `/downloads/${template.slug}.html`]) {
        const response = await request.get(url);
        expect(response.ok()).toBe(true);
        expect(response.headers()["content-type"]).toContain("text/html");
        expect(await response.text()).toBe(original);
      }
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(`/${template.slug}`);
      await expect(page.locator("h1")).toBeVisible();
      await page.locator("#contact, #final, #app, #plans, footer, .site-footer").first().scrollIntoViewIfNeeded();
      expect(errors).toEqual([]);
    });

    test("phone navigation supports Escape and reduced motion has no horizontal overflow", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${template.slug}`);
      await expect(page.locator("h1")).toBeVisible();
      const menu = page.locator(template.menu);
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    });

    test("content is visible without JavaScript", async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
      try {
        const page = await context.newPage();
        await page.goto(`/${template.slug}`);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator(template.section)).toBeVisible();
      } finally {
        await context.close();
      }
    });
  });
}

test("CIRRO growth lab, project dialog, and local inquiry work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/cirro");
  await page.locator('[data-case="fuse"]').click();
  await expect(page.locator("#caseDialog")).toBeVisible();
  await expect(page.locator("#caseDialogTitle")).toHaveText("FUSE");
  await page.keyboard.press("Escape");
  await expect(page.locator("#caseDialog")).toBeHidden();
  const signal = await page.locator("#metricSignal").textContent();
  await page.locator('[data-creative="bold"]').click();
  await expect(page.locator('[data-creative="bold"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#metricSignal")).not.toHaveText(signal!);
  await page.locator("#runTest").click();
  await expect(page.locator("#labStatus")).toContainText("UPDATED");
  await page.locator("#openBrief").click();
  await page.locator('#briefForm [name="name"]').fill("A Visitor");
  await page.locator('#briefForm [name="project"]').fill("Explore a creative growth strategy.");
  await page.locator('#briefForm button[type="submit"]').click();
  await expect(page.locator("#briefAck")).toContainText("No message was sent");
});

test("OROVA project viewer and expertise accordion work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/orova");
  await page.locator(".project-button").first().click();
  await expect(page.locator("#projectViewer")).toBeVisible();
  await expect(page.locator("#viewerTitle")).toHaveText("A study in form.");
  await page.locator("#viewerNext").click();
  await expect(page.locator("#viewerTitle")).toHaveText("A little more color.");
  await page.keyboard.press("Escape");
  await expect(page.locator("#projectViewer")).toBeHidden();
  await page.locator(".service-button").nth(1).click();
  await expect(page.locator(".service-button").nth(1)).toHaveAttribute("aria-expanded", "true");
});

test("VYRA studio presets, library filters, pricing, and local waitlist work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/vyra");
  await page.locator('[data-field="1"]').click();
  await expect(page.locator('[data-field="1"]')).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-character="Focus"]').click();
  await expect(page.locator('[data-character="Focus"]')).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-filter="Ambient"]').click();
  await expect(page.locator('.preset-card:not([hidden])')).not.toHaveCount(0);
  expect(await page.locator('.preset-card:not([hidden])').evaluateAll(cards => cards.every(card => (card as HTMLElement).dataset.cat === "Ambient"))).toBe(true);
  const paidPrice = page.locator('[data-month]').nth(1);
  const annualPrice = await paidPrice.getAttribute("data-year");
  await page.locator('[data-cycle="annual"]').click();
  await expect(paidPrice).toHaveText(annualPrice!);
  await page.locator("#waitlist-email").fill("visitor@example.com");
  await page.locator('#waitlist button[type="submit"]').click();
  await expect(page.locator("#form-message")).toContainText("no details have been submitted or saved");
});

test("AUVEN capability explorer and local inquiry work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/auven");
  await page.locator('.cap-option[data-cap="1"]').click();
  await expect(page.locator("#capCount")).toHaveText("02 / 04");
  await expect(page.locator("#capName")).toHaveText("BUSINESS OPERATIONS");
  await page.locator("#contactName").fill("Visitor");
  await page.locator("#contactEmail").fill("visitor@example.com");
  await page.locator("#contactInterest").fill("Global customer operations inquiry.");
  await page.locator('#contactForm button[type="submit"]').click();
  await expect(page.locator("#contactStatus")).toContainText("inquiry has not been sent");
});

test("NEMA conversation chips, artifact dialog, and research tabs work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/nema");
  await page.locator('.suggestions button[data-demo="brand"]').click();
  await expect(page.locator("#demoQuestion")).toContainText("identity for a thoughtful new design studio");
  await page.locator("#openArtifact").click();
  await expect(page.locator("#artifactModal")).toHaveClass(/open/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#artifactModal")).not.toHaveClass(/open/);
  await page.locator('.research-tabs button[data-research="1"]').click();
  await expect(page.locator("#researchHeading")).toHaveText("Light changes the room.");
  await page.locator("#earlyEmail").fill("visitor@example.com");
  await page.locator('#earlyForm button[type="submit"]').click();
  await expect(page.locator("#earlyFeedback")).toContainText("nothing was submitted or saved");
});

test("VELORA exchange calculator, flow steps, and local signup work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/velora");
  const initialReceive = await page.locator("#receiveAmount").inputValue();
  await page.locator("#sendAmount").fill("2500");
  await expect(page.locator("#receiveAmount")).not.toHaveValue(initialReceive);
  await page.locator('.flow-tab[data-flow="1"]').click();
  await expect(page.locator("#flowTitle")).toHaveText("Clarity looks good.");
  await page.locator("[data-open-signup]").first().click();
  await expect(page.locator("#signupModal")).toBeVisible();
  await page.locator("#signupEmail").fill("visitor@example.com");
  await page.locator('#signupForm button[type="submit"]').click();
  await expect(page.locator("#signupSuccess")).toBeVisible();
  await expect(page.locator("#signupSuccess")).toContainText("not created an account or transmitted");
  await page.keyboard.press("Escape");
  await expect(page.locator("#signupModal")).toBeHidden();
});
