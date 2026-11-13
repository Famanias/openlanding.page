import { expect, test } from "@playwright/test";

test.describe("DATUM landing template", () => {
  test("desktop interactive Z-stack, keyboard controls, Budget Lab, and local Access brief", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    // Permanent redirect from /datum -> /templates/datum
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/datum", { waitUntil: "networkidle" });
    await expect(page).toHaveURL(/\/templates\/datum$/);
    await expect(page.getByRole("heading", { level: 1, name: /Every frame, dissected\./i })).toBeVisible();

    // Header pill starts hidden over Hero
    await expect(page.locator(".dt-nav-pill")).toHaveAttribute("data-visible", "false");

    // Verify SVG hero preview pass selector syncs with state
    const heroPlate = page.locator(".dt-hero-plate");
    await heroPlate.getByRole("button", { name: /03 Shadows/i }).click();
    await expect(heroPlate).toContainText("Z-STACK PREVIEW // 03");

    // Scroll into #dissection -> --explode advances and WebGL mounts on fine pointer
    const dissection = page.locator("#dissection");
    await dissection.scrollIntoViewIfNeeded();
    const region = page.getByRole("region", { name: /Interactive 3D five-pass render pipeline stack/i });
    await region.dispatchEvent("pointerenter");
    await expect(page.locator("#dissection .dt-stage-card")).toHaveAttribute("data-phase", "live", {
      timeout: 8000,
    });
    await expect(page.locator('canvas[data-datum-renderer="true"]')).toHaveAttribute("data-live", "true");

    // Step rail + card isolation + HUD controls
    const stepRail = page.getByRole("navigation", { name: "Render pass rail" });
    await stepRail.getByRole("button", { name: /02 Normals/i }).click();
    await expect(page.locator("#dissection .dt-stage-id")).toContainText("STAGE // 02 · NORMALS");

    await page.locator("#dt-pass-bloom").getByRole("button", { name: /Isolate in 3D|Pass Isolated/i }).click();
    await expect(page.locator("#dissection .dt-stage-id")).toContainText("STAGE // 04 · BLOOM / FX");

    await page.getByRole("button", { name: "Explode Z-Stack" }).click();
    await expect(page.locator("#dissection .dt-stage-card")).toHaveAttribute("data-exploded", "true");

    await page.getByRole("button", { name: "Wireframe" }).click();
    await expect(page.locator("#dissection .dt-stage-card")).toHaveAttribute("data-wireframe", "true");

    // Keyboard controls on 3D region
    await region.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#dissection .dt-stage-id")).toContainText("STAGE // 05 · COMPOSITE");
    await page.keyboard.press("r");
    await expect(page.locator("#dissection .dt-stage-id")).toContainText("STAGE // 01 · GEOMETRY");
    await expect(page.locator("#dissection .dt-stage-card")).toHaveAttribute("data-exploded", "false");

    // Budget Lab interactive GPU budget & bottleneck math
    const budget = page.locator("#budget");
    await budget.scrollIntoViewIfNeeded();
    await expect(budget.locator(".dt-meter-value")).toContainText("11.1");

    // Disable Shadows pass (3.8 ms base) -> drops to 7.3 ms
    await budget.getByRole("switch", { name: /03 Shadows/i }).click();
    await expect(budget.locator(".dt-meter-value")).toContainText("7.3");

    // Re-enable Shadows, push resolution scale high & switch to 120 Hz -> triggers Amber OVER BUDGET
    await budget.getByRole("switch", { name: /03 Shadows/i }).click();
    await budget.getByRole("button", { name: "120 Hz (8.3 ms)" }).click();
    const scaleSlider = budget.getByRole("slider", { name: "Resolution scale" });
    await scaleSlider.fill("1.5");
    await expect(budget.locator(".dt-status-pill")).toHaveAttribute("data-over", "true");
    await expect(budget.locator(".dt-status-pill")).toContainText("OVER BUDGET");

    // Shader kernel tab switching
    await budget.getByRole("tab", { name: "05" }).click();
    await expect(budget.locator(".dt-kernel-meta")).toContainText("fs_aces_composite()");

    // Architecture & Footer reveals visible on scroll
    await page.locator("#architecture").scrollIntoViewIfNeeded();
    await expect(page.locator("#dt-arch-heading")).toBeVisible();

    // Access form validation -> fill -> stamped receipt -> local download -> reset
    const access = page.locator("#access");
    await access.scrollIntoViewIfNeeded();
    await access.getByRole("button", { name: "Generate Local Brief" }).click();
    await expect(page.getByText("Enter your name.")).toBeVisible();
    await expect(page.getByText("Enter a valid work email.")).toBeVisible();

    await access.getByRole("radio", { name: "WebGL2" }).click();
    await access.getByLabel("Engineer name").fill("Ada Lovelace");
    await access.getByLabel("Work email").fill("ada@datum.dev");
    await access.getByLabel("Target scene or bottleneck").fill("Shadow cascade PCF tuning");
    await access.getByRole("button", { name: "Generate Local Brief" }).click();

    const wrap = access.locator(".dt-access-form-wrap");
    await expect(wrap).toHaveAttribute("data-state", "success", { timeout: 4000 });
    await expect(wrap.locator(".dt-ref")).toHaveText(/^DT-[A-Z0-9]{6}$/);
    await expect(wrap.locator(".dt-success")).toContainText("it has not been sent");

    const downloadPromise = page.waitForEvent("download");
    await wrap.getByRole("button", { name: /Download Brief/i }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/^datum-brief-dt-[a-z0-9]{6}\.txt$/);

    await wrap.getByRole("button", { name: "New Configuration" }).click();
    await expect(wrap).toHaveAttribute("data-state", "idle");

    expect(errors).toEqual([]);
  });

  test("reduced motion keeps all content visible and never mounts WebGL", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/templates/datum", { waitUntil: "networkidle" });

    await expect(page.locator('canvas[data-datum-renderer="true"]')).toHaveCount(0);
    await expect(page.locator("#dissection .dt-stage-badge")).toContainText("STATIC SCHEMATIC");

    await page.locator("#architecture").scrollIntoViewIfNeeded();
    const opacities = await page.locator("[data-reveal]").evaluateAll((nodes) =>
      nodes.map((node) => Number.parseFloat(getComputedStyle(node).opacity)),
    );
    expect(opacities.every((value) => value > 0.5)).toBe(true);

    await context.close();
  });

  test("no-JS renders complete page copy and vector pipeline fallback", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto("/templates/datum", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { level: 1, name: /Every frame, dissected\./i })).toBeVisible();
    await expect(page.locator("#dissection svg.dt-pipeline-svg")).toBeVisible();
    await expect(page.locator("#budget .dt-meter-value")).toContainText("11.1");
    await expect(page.locator("#access")).toContainText("Current Workbench State");

    await context.close();
  });

  test("mobile 390px has no horizontal overflow, defers WebGL behind tap-to-launch, and drawer works", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await page.goto("/templates/datum", { waitUntil: "networkidle" });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    // Coarse touch screens keep SVG poster until visitor taps Launch 3D Stack
    await page.locator("#dissection").scrollIntoViewIfNeeded();
    await expect(page.locator('canvas[data-datum-renderer="true"][data-live="true"]')).toHaveCount(0);
    const launchBtn = page.getByRole("button", { name: "Launch 3D Stack" });
    await expect(launchBtn).toBeVisible();
    await launchBtn.click();
    await expect(page.locator('canvas[data-datum-renderer="true"]')).toHaveAttribute("data-live", "true", {
      timeout: 8000,
    });

    // Mobile drawer opens and closes on Escape
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const menuToggle = page.getByRole("button", { name: "Open menu" });
    await menuToggle.click();
    await expect(page.locator("#dt-menu")).toHaveAttribute("data-open", "true");
    await page.keyboard.press("Escape");
    await expect(page.locator("#dt-menu")).toHaveAttribute("data-open", "false");

    await context.close();
  });
});
