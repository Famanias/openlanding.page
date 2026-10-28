import { expect, type Page } from "@playwright/test";
export async function openWorld(page: Page, p = 0) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/amaoto");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-world-mode",
    "cinematic",
    { timeout: 45000 },
  );
  await page.waitForFunction(
    () => typeof window.__amaotoScrollTo === "function",
  );
  await go(page, p);
}
export async function go(page: Page, p: number) {
  await page.evaluate((v) => window.__amaotoScrollTo!(v), p);
  await expect
    .poll(async () =>
      Math.abs(
        Number(await page.locator(".am-canvas").getAttribute("data-progress")) -
          p,
      ),
    )
    .toBeLessThan(0.0005);
}
export async function enterAnatomy(page: Page) {
  await openWorld(page, 0.18);
  await page
    .getByRole("button", { name: "Inspect the structure", exact: true })
    .click();
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-inspect-phase",
    "engaged",
  );
}
export async function choosePart(page: Page, id: string) {
  const mobile = await page.evaluate(() => innerWidth <= 900);
  await page
    .locator(
      `${mobile ? ".am-sheet-parts" : ".am-inspector-navigation"} [data-part="${id}"]`,
    )
    .click();
  await expect(page.locator(".am-canvas")).toHaveAttribute(
    "data-inspection",
    id,
  );
}
export async function assertSlot(page: Page) {
  // Canvas dimensions change before the next RAF publishes the new virtual slot.
  await expect
    .poll(async () =>
      page.locator(".am-canvas").evaluate((el) => {
        const r = JSON.parse((el as HTMLElement).dataset.stageRect!);
        const canvas = el.getBoundingClientRect();
        return (
          canvas.width === innerWidth &&
          canvas.height === innerHeight &&
          r.left >= -1 &&
          r.top >= 0 &&
          r.left + r.width <= innerWidth + 1 &&
          r.top + r.height <= innerHeight + 1
        );
      }),
    )
    .toBe(true);
  const state = await page.locator(".am-canvas").evaluate((el) => ({
    canvas: el.getBoundingClientRect().toJSON(),
    slot: JSON.parse((el as HTMLElement).dataset.stageRect!),
    opacity: getComputedStyle(el).opacity,
  }));
  const v = page.viewportSize()!;
  expect(state.canvas.width).toBe(v.width);
  expect(state.canvas.height).toBe(v.height);
  expect(state.opacity).toBe("1");
  expect(state.slot.left).toBeGreaterThanOrEqual(-1);
  expect(state.slot.top).toBeGreaterThanOrEqual(0);
  expect(state.slot.left + state.slot.width).toBeLessThanOrEqual(v.width + 1);
  expect(state.slot.top + state.slot.height).toBeLessThanOrEqual(v.height + 1);
  return state.slot;
}
