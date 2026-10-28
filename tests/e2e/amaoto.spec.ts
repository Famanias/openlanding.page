import { test, expect } from "@playwright/test";
import sharp from "sharp";

test.describe("AMAOTO", () => {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
    { width: 600, height: 960 },
    { width: 768, height: 1024 },
    { width: 820, height: 1180 },
  ]) {
    test(`umbrella stays visible throughout the story at ${viewport.width}px`, async ({
      page,
    }) => {
      test.slow(); // Compare WebGL screenshots across every chapter.
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/amaoto");
      const canvas = page.locator(".am-canvas canvas");
      await expect(canvas).toBeVisible({ timeout: 20_000 });

      for (const id of [
        "top",
        "structure",
        "light",
        "canopy",
        "making",
        "commission",
      ]) {
        await page.locator(`#${id}`).evaluate((section) => {
          window.scrollTo({
            top: (section as HTMLElement).offsetTop,
            behavior: "instant",
          });
        });
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            ),
        );
        const bounds = await canvas.boundingBox();
        expect(bounds, `${id}: canvas exists`).not.toBeNull();
        expect(
          bounds!.y + bounds!.height,
          `${id}: canvas remains in the viewport`,
        ).toBeGreaterThan(0);
        expect(bounds!.y, `${id}: canvas remains in the viewport`).toBeLessThan(
          viewport.height,
        );

        // A canvas can be in the viewport yet completely covered by a section.
        // Hiding it must change the rendered pixels to prove the model is visible.
        const shown = await page.screenshot();
        await test.info().attach(`chapter-${id}-${viewport.width}`, {
          body: shown,
          contentType: "image/png",
        });
        await canvas.evaluate((element) => {
          element.style.visibility = "hidden";
        });
        const hidden = await page.screenshot();
        const anchor = await page
          .locator(`#${id} [data-stage-anchor]`)
          .boundingBox();
        if (viewport.width <= 900) {
          expect(bounds!.y).toBeGreaterThanOrEqual(60);
          expect(bounds!.height).toBeLessThan(
            viewport.height * (viewport.width > 600 ? 0.55 : 0.42),
          );
          if (viewport.width > 600 && id !== "structure")
            expect(bounds!.height).toBeGreaterThan(viewport.height * 0.44);
        } else if (anchor) {
          const controls = await page
            .locator(`#${id} button, #${id} input, #${id} .am-chapter-copy`)
            .evaluateAll((elements) =>
              elements.map((el) => el.getBoundingClientRect().toJSON()),
            );
          for (const control of controls) {
            const overlapWidth =
              Math.min(bounds!.x + bounds!.width, control.right) -
              Math.max(bounds!.x, control.left);
            const overlapHeight =
              Math.min(bounds!.y + bounds!.height, control.bottom) -
              Math.max(bounds!.y, control.top);
            expect(
              overlapWidth > 2 && overlapHeight > 2,
              `${id}: model has its own space beside content`,
            ).toBe(false);
          }
        }
        await canvas.evaluate((element) => {
          element.style.visibility = "";
        });
        const [before, after] = await Promise.all([
          sharp(shown).removeAlpha().raw().toBuffer(),
          sharp(hidden).removeAlpha().raw().toBuffer(),
        ]);
        let changedPixels = 0;
        for (let i = 0; i < before.length; i += 3) {
          if (
            Math.abs(before[i] - after[i]) +
              Math.abs(before[i + 1] - after[i + 1]) +
              Math.abs(before[i + 2] - after[i + 2]) >
            30
          )
            changedPixels++;
        }
        expect(
          changedPixels,
          `${id}: umbrella is painted above the section background`,
        ).toBeGreaterThan(100);
      }
    });
  }

  test("renders the wagasa story and commission form", async ({ page }) => {
    await page.goto("/amaoto");
    await expect(
      page.getByRole("heading", { name: /The sound of rain/i }),
    ).toBeVisible();
    await expect(page.locator("canvas")).toBeVisible({ timeout: 20_000 });
    await page.getByRole("link", { name: /Reserve a commission/i }).click();
    await expect(page.locator("#commission")).toBeVisible();
    await page.getByRole("button", { name: /Reserve a commission/i }).click();
    await expect(page.getByText("Add your name")).toBeVisible();
  });

  test("part callouts and canopy controls are keyboard reachable", async ({
    page,
  }) => {
    await page.goto("/amaoto#structure");
    await page
      .getByRole("button", { name: "Bamboo ribs", exact: true })
      .click();
    await expect(page.getByText(/Forty bowed bamboo ribs/i)).toBeVisible();
    await page.locator("#sun").fill("-45");
    await page.getByRole("radio", { name: /Dusk indigo/i }).click();
    await expect(
      page.getByRole("radio", { name: /Dusk indigo/i }),
    ).toHaveAttribute("aria-checked", "true");
  });
});

test("AMAOTO unfurls from a closed first frame and gives controls real scene state", async ({
  page,
}) => {
  test.setTimeout(180_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const clockStart = Date.now();
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(clockStart + 100);
  await page.goto("/amaoto");
  await page.locator('.am-page[data-chapter="0"]').waitFor();
  await page.locator('.am-canvas[data-ready="true"]').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.clock.runFor(64);
  const stage = page.locator(".am-canvas");
  await expect(stage).toHaveAttribute("data-open", /0\.0\d\d/);
  await test.info().attach("hero-closed", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
  await page.clock.runFor(1800);
  await expect
    .poll(async () => Number(await stage.getAttribute("data-open")))
    .toBeGreaterThan(0.3);
  await test.info().attach("hero-unfurl", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
  await page.clock.runFor(1800);
  await expect(stage).toHaveAttribute("data-open", "1.000", { timeout: 12000 });
  await test.info().attach("hero-open", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
  await page.clock.resume();
  await expect(
    page.getByRole("button", { name: "Rain sound: off" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.locator("#structure").evaluate((el) =>
    window.scrollTo({
      top: (el as HTMLElement).offsetTop,
      behavior: "instant",
    }),
  );
  // Chapter entry resets inspection; wait for its UI before moving the runner.
  await expect(page.locator(".am-anatomy-ui")).toBeVisible();
  await expect(stage).toHaveAttribute("data-explode", "0.000");
  for (const open of [0, 0.25, 0.6, 1]) {
    await page
      .getByRole("slider", { name: "Pull the runner" })
      .fill(String(open));
    await expect(stage).toHaveAttribute("data-open", open.toFixed(3));
    await test.info().attach(`rig-${open}`, {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  }
  await page.getByRole("button", { name: "Runner ring", exact: true }).click();
  await expect(stage).toHaveAttribute("data-highlight", "runner");
  await expect(page.locator('[data-hotspot="runner"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator("#light").evaluate((el) =>
    window.scrollTo({
      top: (el as HTMLElement).offsetTop,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".am-page")).toHaveAttribute("data-chapter", "2");
  const litPaper = await stage.locator("canvas").screenshot();
  await page.locator("#sun").fill("-45");
  await expect(stage).toHaveAttribute("data-sun", "-45");
  const movedSun = await stage.locator("canvas").screenshot();
  expect(
    litPaper.equals(movedSun),
    "sun angle changes the rendered paper",
  ).toBe(false);
  await page.getByRole("checkbox", { name: "Rain on the roof" }).check();
  await expect
    .poll(async () => Number(await stage.getAttribute("data-rain")))
    .toBeGreaterThan(0.5);
  await page.getByRole("radio", { name: "Dusk indigo" }).click();
  await expect(stage).toHaveAttribute("data-colour", "#2B3A55");
  await page.evaluate(() => window.scrollBy({ top: -40, behavior: "instant" }));
  await page.getByRole("button", { name: "Rain sound: off" }).click();
  await expect(
    page.getByRole("button", { name: "Rain sound: on" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Rain sound: on" }).click();
  expect(errors).toEqual([]);
});

test("AMAOTO no-JavaScript story remains readable", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/amaoto");
  await expect(
    page.getByRole("heading", { name: /The sound of rain/ }),
  ).toBeVisible();
  await expect(page.locator(".am-poster")).toBeVisible();
  await expect(page.locator(".am-anatomy-fallback")).toContainText(
    "Dark knots tie paper, rib and rim into a single skin.",
  );
  await expect(page.locator(".am-inspector-detail")).toBeHidden();
  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  await context.close();
});

test("AMAOTO raycasting follows the unfolded paper outside its closed bounds", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/amaoto");
  const stage = page.locator(".am-canvas");
  await expect(stage).toHaveAttribute("data-open", "1.000", {
    timeout: 20_000,
  });
  const box = (await stage.boundingBox())!;
  await page.mouse.click(box.x + box.width * 0.35, box.y + box.height * 0.4);
  await expect(page.locator('[data-part="canopy"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("AMAOTO handoffs never paint a stage across readable desktop copy", async ({
  page,
}) => {
  test.setTimeout(180000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const viewport of [
    { width: 1024, height: 768 },
    { width: 1024, height: 700 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/amaoto");
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-ready",
      "true",
      { timeout: 20000 },
    );
    const starts = await page
      .locator("#top,#structure,#light,#canopy,#making,#commission")
      .evaluateAll((els) => els.map((el) => (el as HTMLElement).offsetTop));
    for (let chapter = 0; chapter < 5; chapter++)
      for (const fraction of [0.45, 0.65, 0.8, 0.92, 0.8, 0.65, 0.45]) {
        await page.evaluate(
          (y) => window.scrollTo({ top: y, behavior: "instant" }),
          starts[chapter] + (starts[chapter + 1] - starts[chapter]) * fraction,
        );
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() =>
                requestAnimationFrame(() => resolve()),
              ),
            ),
        );
        const state = await page.locator(".am-canvas").evaluate((el) => {
          const r = el.getBoundingClientRect();
          return {
            opacity: Number(getComputedStyle(el).opacity),
            left: r.left,
            top: r.top,
            width: r.width,
            height: r.height,
          };
        });
        if (state.opacity > 0.01) {
          const blocks = await page
            .locator(".am-chapter-copy,.am-control")
            .evaluateAll((els) =>
              els
                .map((el) => el.getBoundingClientRect().toJSON())
                .filter((r) => r.bottom > 0 && r.top < innerHeight),
            );
          for (const r of blocks)
            expect(
              state.left < r.right &&
                state.left + state.width > r.left &&
                state.top < r.bottom &&
                state.top + state.height > r.top,
            ).toBe(false);
        }
      }
  }
});
