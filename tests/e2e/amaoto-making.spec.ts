import { test, expect } from "@playwright/test";
import { openWorld, go, assertSlot } from "./amaoto.helpers";
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
for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 },
])
  test(`Making holds its full composition through all ten steps at ${viewport.width}px`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize(viewport);
    await openWorld(page, 0.86);
    const buttons = page.locator(".am-making-strip button");
    await expect(buttons).toHaveCount(10);
    for (const step of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 6, 4, 2, 0]) {
      await buttons.nth(step).click();
      await expect(page.locator(".am-page")).toHaveAttribute(
        "data-tool",
        "making",
      );
      await expect(buttons.nth(step)).toHaveAttribute("aria-current", "step");
      await expect(page.locator(".am-canvas")).toHaveAttribute(
        "data-highlight",
        parts[step],
      );
      await assertSlot(page);
    }
    await page.getByRole("button", { name: /Return to story/ }).click();
    await expect(page.locator(".am-page")).toHaveAttribute("data-tool", "none");
    await go(page, 1);
    await expect(page.getByLabel("Name", { exact: true })).toBeVisible();
  });
test("Making preserves its step and locked stage through resize", async ({
  page,
}) => {
  await openWorld(page, 0.86);
  await page.locator(".am-making-strip button").nth(6).click();
  const progress = await page
    .getByRole("slider", { name: "Making progress" })
    .inputValue();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.locator(".am-page")).toHaveAttribute("data-tool", "making");
  await expect
    .poll(async () =>
      Number(
        await page
          .getByRole("slider", { name: "Making progress" })
          .inputValue(),
      ),
    )
    .toBeCloseTo(Number(progress), 2);
  await assertSlot(page);
  await page.getByRole("slider", { name: "Making progress" }).fill("0.23");
  await expect
    .poll(async () =>
      Number(
        await page
          .getByRole("slider", { name: "Making progress" })
          .inputValue(),
      ),
    )
    .toBeCloseTo(0.23, 2);
});
test("Making keeps reduced-motion and no-JavaScript reading intact", async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/amaoto#making");
  await expect(page.locator("#making li")).toHaveCount(10);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(
    page.getByText("Split the bamboo", { exact: true }),
  ).toBeVisible();
  const c = await browser.newContext({ javaScriptEnabled: false });
  const p = await c.newPage();
  await p.goto("/amaoto#making");
  await expect(p.locator("#making li")).toHaveCount(10);
  await expect(p.getByText("Listen for rain", { exact: true })).toBeVisible();
  await c.close();
});
