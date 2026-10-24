import { test, expect } from "@playwright/test";

test.describe("HIYAS expedition planner", () => {
  test("keeps camps and routes fixed across support modes for all fourteen peaks", async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto("/hiyas");
    const support = page.locator("#planner select");
    const geometry = async () => {
      // Flush the support change and any SVG measurement effect before comparing.
      await page.evaluate(() => new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }));
      return page.locator(".hy-mountain-silhouette").evaluate((svg) => ({
        route: svg.querySelector(".hy-silhouette__route")?.getAttribute("d"),
        camps: Array.from(svg.querySelectorAll(".hy-silhouette__camp")).map((camp) => {
          const marker = camp.querySelector(".hy-silhouette__camp-inner");
          return {
            name: camp.querySelector(".hy-silhouette__camp-title")?.textContent,
            altitude: camp.querySelector(".hy-silhouette__camp-elevation")?.textContent,
            x: marker?.getAttribute("cx"),
            y: marker?.getAttribute("cy"),
          };
        }),
      }));
    };

    for (let index = 0; index < 14; index += 1) {
      const peak = page.locator(".hy-planner__peak").nth(index + 1);
      const name = await peak.locator(".hy-planner__peak-name").innerText();
      await peak.click();
      await support.selectOption("guided");
      const fixed = await geometry();
      expect(fixed.camps).toHaveLength(4);
      for (const mode of ["route", "private", "guided"]) {
        await support.selectOption(mode);
        expect(await geometry(), `${name}: ${mode} support must not move camps`).toEqual(fixed);
      }
      await page.locator(".hy-planner__lock").click();
      await support.selectOption("private");
      expect(await geometry(), `${name}: changing a locked plan must not move camps`).toEqual(fixed);
      await expect(page.locator(".hy-planner__summary p")).toContainText("private expedition support");
    }
  });

  test("shows fourteen shaded mountains without losing the current expedition", async ({ page }) => {
    await page.goto("/hiyas");
    await page.locator(".hy-planner__peak").filter({ hasText: "K2" }).click();
    await page.locator("#planner select").selectOption("private");
    await page.getByRole("button", { name: /lock this plan/i }).click();
    const all = page.getByRole("button", { name: /00 All mountains/ });
    await all.click();

    const overview = page.getByRole("group", { name: "All fourteen mountain profiles" });
    await expect(all).toHaveAttribute("aria-pressed", "true");
    await expect(overview.getByRole("button")).toHaveCount(14);
    await expect(overview.locator("image")).toHaveCount(14);
    const shades = await overview.locator("feColorMatrix").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("values")));
    expect(new Set(shades).size).toBe(14);
    await expect(page.locator(".hy-planner__summary")).toContainText("K2");
    await expect(page.locator(".hy-planner__summary")).toContainText("45–55 days");
    await page.getByRole("button", { name: "Return to K2" }).click();
    await expect(page.locator(".hy-silhouette__summit-marker")).toBeVisible();

    await all.click();
    await overview.getByRole("button", { name: "Plan Manaslu, 8,163 metres" }).click();
    await expect(page.locator(".hy-mountain-silhouette")).toHaveAttribute("aria-label", /Manaslu/);
    await expect(page.locator(".hy-planner__summary p")).toContainText("35–45 days");
    await expect(page.locator("#planner select")).toHaveValue("private");

    await all.click();
    await page.locator("#peaks .hy-peak-row").filter({ hasText: "Everest" }).click();
    await expect(overview).toHaveCount(0);
    await expect(page.locator(".hy-mountain-silhouette")).toHaveAttribute("aria-label", /Everest/);
  });

  test("keeps all fourteen mountain choices readable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hiyas");
    await page.getByRole("button", { name: /00 All mountains/ }).click();
    const overview = page.getByRole("group", { name: "All fourteen mountain profiles" });
    await expect(overview.getByRole("button")).toHaveCount(14);
    const firstRelief = await overview.locator("svg").first().boundingBox();
    expect(firstRelief?.width).toBeGreaterThan(100);
    expect(firstRelief?.height).toBeLessThan(180);
    const last = overview.getByRole("button", { name: "Plan Shishapangma, 8,027 metres" });
    await last.scrollIntoViewIfNeeded();
    await expect(last).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await last.click();
    await expect(page.locator(".hy-mountain-silhouette")).toHaveAttribute("aria-label", /Shishapangma/);
  });

  test("replaces the planner slider with fixed expedition and summit-push estimates", async ({ page }) => {
    await page.goto("/hiyas");
    const planner = page.locator("#planner");
    await expect(planner.getByRole("slider")).toHaveCount(0);
    const cases = [
      ["Everest", "50–60 days", "4–6 days"],
      ["K2", "45–55 days", "5–7 days"],
      ["Cho Oyu", "30–40 days", "3–5 days"],
      ["Manaslu", "35–45 days", "4–6 days"],
    ];
    for (const [name, expedition, summitPush] of cases) {
      await planner.locator(".hy-planner__peak").filter({ hasText: name }).click();
      await expect(planner.locator('[data-duration="expedition"]')).toHaveText(expedition);
      await expect(planner.locator('[data-duration="summit-push"]')).toHaveText(summitPush);
      await expect(page.locator(".hy-header__plan")).toContainText(`${name} / ${expedition}`);
    }
    await planner.getByLabel("Support mode").selectOption("private");
    await expect(planner.locator('[data-duration="expedition"]')).toHaveText("35–45 days");
    await planner.getByRole("button", { name: /00 All mountains/ }).click();
    await expect(planner.locator('[data-peak="everest"]')).toContainText("50–60 days");
    await expect(planner.locator('[data-peak="shishapangma"]')).toContainText("30–40 days");
  });

  test("loads the route room and footer scene", async ({ page }) => {
    await page.goto("/hiyas");
    await expect(page.getByRole("heading", { name: "Plan the line. Earn the summit." })).toBeVisible();
    await expect(page.locator('[data-asset="hero-route"]')).toBeVisible();
    await expect(page.locator(".hy-footer__wordmark")).toHaveText("HIYAS");
    await expect(page.locator('[data-asset="footer-mountain"]')).toBeVisible();
    await expect(page.getByText("The fourteen", { exact: true }).first()).toBeVisible();
  });

  test("changes peak estimates and support, then locks the route plan", async ({ page }) => {
    await page.goto("/hiyas");
    await page.locator("#planner").scrollIntoViewIfNeeded();
    await expect(page.locator(".hy-mountain-silhouette")).toHaveAttribute("aria-label", /Everest/i);

    await page.locator(".hy-planner__peak").filter({ hasText: "K2" }).click();
    await expect(page.locator(".hy-mountain-silhouette")).toHaveAttribute("aria-label", /K2/i);
    await expect(page.locator(".hy-silhouette__meta-title")).toContainText("K2");

    await page.getByLabel("Support mode").selectOption("private");
    await expect(page.locator(".hy-planner__summary strong")).toContainText("8,611");
    await expect(page.locator(".hy-planner__summary p")).toContainText("45–55 days");
    await page.getByRole("button", { name: /lock this plan/i }).click();
    await expect(page.getByRole("button", { name: /plan locked/i })).toBeVisible();
    await expect(page.locator(".hy-silhouette__meta-status")).toContainText("Plan locked");
    await expect(page.locator(".hy-silhouette__summit-marker")).toBeVisible();
  });

  test("validates and completes an inquiry locally", async ({ page }) => {
    await page.goto("/hiyas");
    await page.locator("#inquiry").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /request a consultation/i }).click();
    await expect(page.getByLabel("Your name")).toHaveAttribute("aria-invalid", "true");
    await page.getByLabel("Your name").fill("Mara Chen");
    await page.getByLabel("Email").fill("mara@example.com");
    await page.getByRole("textbox", { name: "Peak" }).fill("Everest");
    await page.getByLabel("Planning days").fill("21");
    await page.getByLabel("What should we know?").fill("I want to understand the route before choosing a season.");
    await page.getByRole("button", { name: /request a consultation/i }).click();
    await expect(page.getByRole("heading", { name: "Your route is on the board." })).toBeVisible({ timeout: 2000 });
  });

  test("keeps content complete under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/hiyas");
    await expect(page.getByRole("heading", { name: "Plan the line. Earn the summit." })).toBeVisible();
    await expect(page.locator('[data-duration="expedition"]')).toHaveText("50–60 days");
    const hidden = await page.locator("[data-reveal]").evaluateAll((nodes) => nodes.filter((node) => Number(getComputedStyle(node).opacity) < .5 || getComputedStyle(node).visibility === "hidden").length);
    expect(hidden).toBe(0);
  });

  test("keeps the peak index and inquiry form available without scripting", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/hiyas");
    await expect(page.getByRole("heading", { name: "Plan the line. Earn the summit." })).toBeVisible();
    await expect(page.getByText("Everest", { exact: true }).first()).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await context.close();
  });

  test("displays all 10 images and both video clips without placeholders", async ({ page }) => {
    await page.goto("/hiyas");

    const expectedImages = [
      "hero-route",
      "planner-profile",
      "peak-everest",
      "peak-k2",
      "support-rope",
      "camp-night",
      "field-note-01",
      "field-note-02",
      "field-note-03",
      "footer-mountain",
    ];

    for (const key of expectedImages) {
      const el = page.locator(`[data-asset="${key}"]`);
      await expect(el).toBeAttached();
      await expect(page.locator(`.hy-media-slot[data-asset="${key}"]`)).toHaveCount(0);
      const img = page.locator(`picture[data-asset="${key}"] img`);
      await expect(img).toBeAttached();
    }

    const expectedClips = ["route-dawn", "camp-wind"];
    for (const clip of expectedClips) {
      const video = page.locator(`[data-clip="${clip}"] video`);
      await expect(video).toBeAttached();
      const source = page.locator(`[data-clip="${clip}"] video source`);
      await expect(source).toHaveAttribute("src", `/templates/hiyas/clips/${clip}.mp4`);
    }
  });
});

