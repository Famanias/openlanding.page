import { test, expect, chromium } from "@playwright/test";
import { openWorld, go, assertSlot } from "./amaoto.helpers";
const rests = [0, 0.18, 0.45, 0.66, 0.72, 0.86, 1],
  chapters = [0, 1, 2, 3, 3, 4, 5];
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
  { width: 600, height: 960 },
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
])
  test(`AMAOTO umbrella stays visible throughout the story at ${viewport.width}px`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize(viewport);
    await openWorld(page);
    for (let i = 0; i < rests.length; i++) {
      await go(page, rests[i]);
      await expect(page.locator(".am-page")).toHaveAttribute(
        "data-active-chapter",
        String(chapters[i]),
      );
      await assertSlot(page);
      await expect(page.locator(".am-canvas canvas")).toBeVisible();
      const counts = JSON.parse(
        (await page.locator(".am-canvas").getAttribute("data-world-counts"))!,
      );
      expect(counts).toHaveLength(6);
      await test.info().attach(`rest-${rests[i]}`, {
        body: await page.screenshot(),
        contentType: "image/png",
      });
    }
  });
test("AMAOTO renders the wagasa story and commission form", async ({
  page,
}) => {
  await openWorld(page, 1);
  await expect(
    page.getByRole("heading", { name: "Made for the weather ahead." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reserve a commission" }).click();
  await expect(page.getByText("Add your name")).toBeVisible();
  await page.getByLabel("Name", { exact: true }).fill("Aiko");
  await page.getByLabel("Email", { exact: true }).fill("aiko@example.com");
  await page.getByLabel("Occasion", { exact: true }).fill("Rain in Nagano");
  await page.getByRole("button", { name: "Reserve a commission" }).click();
  await expect(page.getByText("Your umbrella is on the bench.")).toBeVisible();
});
test("AMAOTO part callouts and canopy controls are keyboard reachable", async ({
  page,
}) => {
  await openWorld(page, 0.66);
  const swatch = page.getByRole("radio", { name: "Dusk indigo" });
  await swatch.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".am-canvas")).toHaveAttribute(
    "data-colour",
    "#2B3A55",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Vermilion" })).toBeFocused();
  await expect(page.locator(".am-canvas")).toHaveAttribute(
    "data-colour",
    "#C8412B",
  );
  await page.getByRole("slider", { name: "Time of day", exact: true }).focus();
  const chapter = await page
    .locator(".am-page")
    .getAttribute("data-active-chapter");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-active-chapter",
    chapter!,
  );
});
test("AMAOTO unfurls from a closed first frame and gives controls real scene state", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await openWorld(page, 0);
  const stage = page.locator(".am-canvas");
  await expect(stage).toHaveAttribute("data-open", "0.000");
  await go(page, 0.04);
  await expect
    .poll(async () => Number(await stage.getAttribute("data-open")))
    .toBeGreaterThan(0.3);
  await go(page, 0.1);
  await expect(stage).toHaveAttribute("data-open", "1.000");
  await go(page, 0.66);
  const slider = page.getByRole("slider", { name: "Time of day", exact: true });
  await slider.fill("0");
  await expect(stage).toHaveAttribute("data-time-of-day", "0");
  const dusk = await page
    .locator(".am-page")
    .evaluate((el) => (el as HTMLElement).style.getPropertyValue("--page-bg"));
  const before = await stage.locator("canvas").screenshot();
  await slider.fill("1");
  await expect(stage).toHaveAttribute("data-time-of-day", "1");
  const after = await stage.locator("canvas").screenshot();
  expect(before.equals(after)).toBe(false);
  expect(
    await page
      .locator(".am-page")
      .evaluate((el) =>
        (el as HTMLElement).style.getPropertyValue("--page-bg"),
      ),
  ).not.toBe(dusk);
  await expect(stage).toHaveAttribute("data-transmission", "0.350");
  await expect(
    page.getByRole("button", { name: "Atelier sound: off" }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Atelier sound: off" }).click();
  await expect(
    page.getByRole("button", { name: "Atelier sound: on" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Atelier sound: on" }).click();
  expect(errors).toEqual([]);
});
test("AMAOTO no-JavaScript story remains readable", async ({ browser }) => {
  const c = await browser.newContext({ javaScriptEnabled: false });
  const p = await c.newPage();
  await p.goto("/amaoto");
  for (const id of [
    "top",
    "structure",
    "light",
    "canopy",
    "making",
    "commission",
  ])
    await expect(p.locator(`#${id} h1,#${id} h2`)).toBeVisible();
  await expect(p.locator(".am-poster")).toBeVisible();
  await expect(p.locator(".am-anatomy-fallback")).toContainText(
    "Dark knots tie paper, rib and rim into a single skin.",
  );
  await expect(p.getByLabel("Name", { exact: true })).toBeVisible();
  await c.close();
});
test("AMAOTO raycasting follows the unfolded paper outside its closed bounds", async ({
  page,
}) => {
  await openWorld(page, 0.18);
  await assertSlot(page);
  const path = (await page
    .locator('[data-marker-line="canopy"]')
    .getAttribute("d"))!;
  const [x, y] = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  await page.mouse.click(x, y);
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-inspect-phase",
    "engaged",
  );
});
for (const viewport of [
  { width: 1024, height: 768 },
  { width: 1024, height: 700 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
])
  test(`AMAOTO stays opaque and clears copy at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize(viewport);
    await openWorld(page);
    for (const p of [
      0.125, 0.14, 0.155, 0.315, 0.33, 0.345, 0.565, 0.58, 0.595, 0.765, 0.78,
      0.795, 0.915, 0.93, 0.945, 0.93, 0.78, 0.58, 0.33, 0.14,
    ]) {
      await go(page, p);
      await assertSlot(page);
    }
    for (const p of [0, 0.18, 0.66, 0.72, 0.86, 1]) {
      await go(page, p);
      const slot = await assertSlot(page);
      const index = Number(
        await page.locator(".am-page").getAttribute("data-active-chapter"),
      );
      const ids = [
        "top",
        "structure",
        "light",
        "canopy",
        "making",
        "commission",
      ];
      const r = await page
        .locator(
          index === 1 ? ".am-tool-sheet" : `#${ids[index]} .am-chapter-copy`,
        )
        .boundingBox();
      expect(r).not.toBeNull();
      expect(
        slot.left < r!.x + r!.width &&
          slot.left + slot.width > r!.x &&
          slot.top < r!.y + r!.height &&
          slot.top + slot.height > r!.y,
      ).toBe(false);
    }
  });
test("AMAOTO steps, snaps on idle and does not intercept form keys", async ({
  page,
}) => {
  test.setTimeout(60000);
  await openWorld(page, 0.18);
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
  });
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-active-chapter",
    "2",
  );
  await page.keyboard.press("4");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-active-chapter",
    "3",
  );
  await page.getByRole("button", { name: "Next chapter rest" }).click();
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-sub-rest",
    "street",
  );
  await go(page, 0.49);
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.dispatchEvent(new Event("scroll"));
  });
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          Math.abs(
            scrollY /
              (document.querySelector<HTMLElement>(".am-world-track")!
                .offsetHeight -
                innerHeight) -
              0.45,
          ),
        ),
      { timeout: 6000 },
    )
    .toBeLessThan(0.009);
  await go(page, 1);
  await page.getByLabel("Name", { exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-active-chapter",
    "5",
  );
});
test("AMAOTO gust responds in the street rest", async ({ page }) => {
  await openWorld(page, 0.72);
  const v = page.viewportSize()!;
  await page.mouse.click(v.width * 0.72, v.height * 0.68);
  await expect(page.locator(".am-canvas")).toHaveAttribute("data-gust", "1");
  await page.mouse.click(v.width * 0.65, v.height * 0.72);
  await expect(page.locator(".am-canvas")).toHaveAttribute("data-gust", "2");
});
test("AMAOTO reduced motion is a complete static story with working DOM controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/amaoto");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-fallback",
    "reduced-motion",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  for (const id of [
    "top",
    "structure",
    "light",
    "canopy",
    "making",
    "commission",
  ])
    await expect(page.locator(`#${id} h1,#${id} h2`)).toBeVisible();
  await page
    .getByRole("slider", { name: "Time of day", exact: true })
    .fill("0");
  await expect(
    page.getByRole("slider", { name: "Time of day", exact: true }),
  ).toHaveAttribute("aria-valuetext", "Dusk (0%)");
  await page.getByRole("radio", { name: "Dusk indigo" }).click();
  await expect(
    page.getByRole("radio", { name: "Dusk indigo" }),
  ).toHaveAttribute("aria-checked", "true");
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
});
test("AMAOTO context loss restores the complete static reading page", async ({
  page,
}) => {
  await openWorld(page, 0.66);
  await page.locator(".am-canvas canvas").evaluate((el) => {
    const gl = (el as HTMLCanvasElement).getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  });
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-world-mode",
    "static",
  );
  await expect(page.locator(".am-poster")).toBeVisible();
  await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
});
test("AMAOTO software GL keeps the full story with lighter worlds", async ({
  baseURL,
}) => {
  test.setTimeout(90000);
  const b = await chromium.launch({
    headless: true,
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto(new URL("/amaoto", baseURL!).href);
  await expect(p.locator(".am-page")).toHaveAttribute(
    "data-world-mode",
    "cinematic",
    { timeout: 45000 },
  );
  await p.evaluate(() => window.__amaotoScrollTo!(0.72));
  await expect(p.locator(".am-canvas")).toHaveAttribute(
    "data-quality",
    "software",
  );
  const counts = JSON.parse(
    (await p.locator(".am-canvas").getAttribute("data-world-counts"))!,
  );
  expect(counts.find((c: { world: string }) => c.world === "street").rain).toBe(
    1200,
  );
  expect(
    counts.find((c: { world: string }) => c.world === "paper").fibres,
  ).toBe(300);
  await b.close();
});
