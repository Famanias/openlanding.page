import { test, expect } from "@playwright/test";
import { openWorld, go, assertSlot } from "./amaoto.helpers";
test("AMAOTO hero reframes the complete umbrella when its virtual stage narrows", async ({
  page,
}) => {
  test.setTimeout(90000);
  await openWorld(page, 0.1);
  for (const viewport of [
    { width: 901, height: 1000 },
    { width: 1024, height: 768 },
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await go(page, 0.1);
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-fits-whole",
      "true",
    );
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-camera-settled",
      "true",
      { timeout: 20000 },
    );
    await assertSlot(page);
    await test.info().attach(String(viewport.width), {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  }
});
for (const chapter of [
  { id: "canopy", p: 0.66, index: "3" },
  { id: "making", p: 0.86, index: "4" },
])
  test(`AMAOTO ${chapter.id} keeps the full umbrella framed after resize`, async ({
    page,
  }) => {
    test.setTimeout(90000);
    await openWorld(page, chapter.p);
    for (const viewport of [
      { width: 901, height: 1000 },
      { width: 1024, height: 768 },
      { width: 1440, height: 1000 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await go(page, chapter.p);
      await expect(page.locator(".am-page")).toHaveAttribute(
        "data-active-chapter",
        chapter.index,
      );
      await expect(page.locator(".am-canvas")).toHaveAttribute(
        "data-fits-whole",
        "true",
      );
      await assertSlot(page);
      await test.info().attach(String(viewport.width), {
        body: await page.screenshot(),
        contentType: "image/png",
      });
    }
  });
test("AMAOTO Making keeps separated parts framed during its reversible sequence", async ({
  page,
}) => {
  await openWorld(page, 0.86);
  for (const step of [0, 3, 7, 9, 3, 0]) {
    await page.locator(".am-making-strip button").nth(step).click();
    await expect(page.locator(".am-canvas")).toHaveAttribute(
      "data-fits-whole",
      "true",
    );
    await assertSlot(page);
    if (step === 0)
      await expect
        .poll(async () =>
          Number(await page.locator(".am-canvas").getAttribute("data-explode")),
        )
        .toBeGreaterThan(0.5);
  }
});
