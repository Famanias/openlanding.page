import { test, expect } from "@playwright/test";
test("AMAOTO hero reframes the complete umbrella when its canvas narrows", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 901, height: 1000 });
  await page.goto("/amaoto#top");
  for (const viewport of [
    { width: 901, height: 1000 },
    { width: 1024, height: 768 },
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-open",
      "1.000",
      { timeout: 20000 },
    );
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-camera-settled",
      "true",
    );
    await page.screenshot({
      path: test.info().outputPath(`hero-${viewport.width}.png`),
    });
  }
  expect(errors).toEqual([]);
});

for (const chapter of [
  { id: "canopy", index: "3" },
  { id: "making", index: "4" },
])
  test(`AMAOTO ${chapter.id} keeps the full umbrella framed after resize`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 901, height: 1000 });
    await page.goto(`/amaoto#${chapter.id}`);
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-ready",
      "true",
      { timeout: 20000 },
    );
    for (const viewport of [
      { width: 901, height: 1000 },
      { width: 1024, height: 768 },
      { width: 1440, height: 1000 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.locator(`#${chapter.id}`).evaluate((el) =>
        window.scrollTo({
          top: (el as HTMLElement).offsetTop,
          behavior: "instant",
        }),
      );
      await expect(page.locator(".am-page")).toHaveAttribute(
        "data-chapter",
        chapter.index,
        { timeout: 20000 },
      );
      await expect(page.locator(".am-canvas")).toHaveAttribute(
        "data-camera-settled",
        "true",
        { timeout: 20000 },
      );
      await page.screenshot({
        path: test.info().outputPath(`${chapter.id}-${viewport.width}.png`),
      });
    }
  });
test("AMAOTO Making keeps separated parts framed during its scroll sequence", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 901, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/amaoto#making");
  await expect(page.locator(".am-canvas")).toHaveAttribute(
    "data-ready",
    "true",
    { timeout: 20000 },
  );
  for (const fraction of [0.4, 0.75]) {
    await page.evaluate((t) => {
      const a = document.getElementById("making")!,
        b = document.getElementById("commission")!;
      window.scrollTo({
        top:
          a.offsetTop +
          (a.dataset.pinned === "true"
            ? Number.parseFloat(
                a.style.getPropertyValue("--am-making-distance"),
              )
            : b.offsetTop - a.offsetTop) *
            t,
        behavior: "instant",
      });
    }, fraction);
    await expect(page.locator(".am-page")).toHaveAttribute(
      "data-chapter",
      "4",
      { timeout: 20000 },
    );
    await expect
      .poll(async () =>
        Number(await page.locator(".am-canvas").getAttribute("data-explode")),
      )
      .toBeGreaterThan(0.5);
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-camera-settled",
      "true",
      { timeout: 20000 },
    );
    await page.screenshot({
      path: test.info().outputPath(`making-separated-${fraction}.png`),
    });
  }
});
