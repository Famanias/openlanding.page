import { test, expect, type Page } from "@playwright/test";
const parts = [
  "ribs",
  "ribs",
  "handle",
  "handle",
  "stretchers",
  "runner",
  "canopy",
  "canopy",
  "thread",
  "thread",
];
async function scene(page: Page) {
  return page
    .locator("#making")
    .evaluate((el) => ({
      start: (el as HTMLElement).offsetTop,
      distance: Number.parseFloat(
        (el as HTMLElement).style.getPropertyValue("--am-making-distance"),
      ),
    }));
}
async function go(page: Page, progress: number) {
  const { start, distance } = await scene(page);
  await page.evaluate(
    ({ start, distance, progress }) =>
      window.scrollTo({
        top: start + distance * progress,
        behavior: "instant",
      }),
    { start, distance, progress },
  );
}
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
])
  test(`Making holds its full composition through all ten steps at ${viewport.width}px`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/amaoto#making");
    await expect(page.locator("#making")).toHaveAttribute(
      "data-pinned",
      "true",
      { timeout: 20000 },
    );
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-ready",
      "true",
      { timeout: 20000 },
    );
    await go(page, 0.05);
    await expect(page.locator("#making")).toHaveAttribute("data-step", "1");
    const first = (await page.locator(".am-making ol").boundingBox())!,
      stage = (await page.locator(".am-canvas").boundingBox())!;
    expect(first.y).toBeGreaterThan(0);
    expect(first.y + first.height).toBeLessThanOrEqual(viewport.height - 12);
    for (let step = 0; step < 10; step++) {
      await go(page, (step + 0.5) / 10);
      await expect(page.locator("#making")).toHaveAttribute(
        "data-step",
        String(step + 1),
      );
      await expect(
        page.locator('.am-making li[aria-current="step"]'),
      ).toHaveText(new RegExp(`0?${step + 1}`));
      await expect(page.locator(".am-canvas")).toHaveAttribute(
        "data-highlight",
        parts[step],
      );
      const frame = await page.locator(".am-making-frame").boundingBox(),
        list = await page.locator(".am-making ol").boundingBox(),
        canvas = await page.locator(".am-canvas").boundingBox();
      expect(Math.abs(frame!.y)).toBeLessThan(2);
      expect(Math.abs(list!.y - first.y)).toBeLessThan(2);
      expect(Math.abs(canvas!.y - stage.y)).toBeLessThan(2);
      if ([0, 4, 9].includes(step))
        await page.screenshot({
          path: test
            .info()
            .outputPath(`making-${viewport.width}-step-${step + 1}.png`),
        });
    }
    for (const step of [8, 4, 0]) {
      await go(page, (step + 0.5) / 10);
      await expect(page.locator("#making")).toHaveAttribute(
        "data-step",
        String(step + 1),
      );
    }
    const { start, distance } = await scene(page);
    await page.evaluate(
      ({ start, distance }) =>
        window.scrollTo({
          top: start + distance + innerHeight + 50,
          behavior: "instant",
        }),
      { start, distance },
    );
    await expect(page.locator(".am-page")).toHaveAttribute("data-chapter", "5");
    await expect(page.locator("#making")).toHaveAttribute(
      "data-holding",
      "false",
    );
    await go(page, 0.95);
    await expect(page.locator("#making")).toHaveAttribute("data-step", "10");
    await expect(page.locator(".am-making-frame")).toBeInViewport();
  });
test("Making preserves its step on resize and provides unpinned reduced-motion/short-screen fallbacks", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/amaoto#making");
  await expect(page.locator("#making")).toHaveAttribute("data-pinned", "true", {
    timeout: 20000,
  });
  await go(page, 0.55);
  await expect(page.locator("#making")).toHaveAttribute("data-step", "6");
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator("#making")).toHaveAttribute("data-step", "6");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("#making")).toHaveAttribute("data-pinned", "false");
  const before = (await page.locator(".am-making-frame").boundingBox())!.y;
  await page.evaluate(() => window.scrollBy({ top: 100, behavior: "instant" }));
  const after = (await page.locator(".am-making-frame").boundingBox())!.y;
  expect(after).toBeLessThan(before - 90);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 667 });
  await expect(page.locator("#making")).toHaveAttribute("data-pinned", "false");
  await expect(page.locator(".am-making li")).toHaveCount(10);
});
test("Making keeps direct Commission links and no-JavaScript reading intact", async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/amaoto#commission");
  await expect(page.locator(".am-page")).toHaveAttribute("data-chapter", "5", {
    timeout: 20000,
  });
  const context = await browser.newContext({ javaScriptEnabled: false }),
    plain = await context.newPage();
  await plain.goto("/amaoto#making");
  await expect(plain.locator(".am-making li")).toHaveCount(10);
  await expect(plain.locator(".am-making-frame")).toHaveCSS(
    "position",
    "relative",
  );
  await context.close();
});
