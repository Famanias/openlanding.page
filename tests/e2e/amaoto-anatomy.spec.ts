import { test, expect, type Page } from "@playwright/test";
const parts = [
  { id: "ribs", name: "Bamboo ribs" },
  { id: "stretchers", name: "Stretchers" },
  { id: "runner", name: "Runner ring" },
  { id: "thread", name: "Thread lacing" },
  { id: "canopy", name: "Washi paper" },
  { id: "handle", name: "Turned handle" },
];
async function enter(page: Page, reduced = true) {
  await page.emulateMedia({
    reducedMotion: reduced ? "reduce" : "no-preference",
  });
  await page.goto("/amaoto#structure");
  await expect(page.locator(".am-canvas")).toHaveAttribute(
    "data-inspection",
    "overview",
    { timeout: 20000 },
  );
}
for (const width of [1440, 390])
  test(`Anatomy freely inspects all six parts at ${width}px`, async ({
    page,
  }) => {
    test.slow();
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await enter(page);
    const stage = page.locator(".am-canvas");
    await expect(stage).toHaveAttribute("data-explode", "0.000");
    await page.screenshot({
      path: test.info().outputPath(`${width}-overview.png`),
    });
    for (const part of parts) {
      await page.locator(`[data-part="${part.id}"]`).click();
      await expect(stage).toHaveAttribute("data-inspection", part.id);
      await expect(
        page.getByRole("heading", { name: part.name, exact: true }),
      ).toBeVisible();
      await expect(page.locator(`[data-hotspot="${part.id}"]`)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(stage).toHaveAttribute("data-camera-settled", "true", {
        timeout: 20_000,
      });
      await page.screenshot({
        path: test.info().outputPath(`${width}-${part.id}.png`),
      });
    }
    await page.getByRole("button", { name: "Back to overview" }).click();
    await expect(stage).toHaveAttribute("data-inspection", "overview");
    await expect(stage).toHaveAttribute("data-reveal", "false");
    expect(errors).toEqual([]);
  });
test("Anatomy actions change the object and support immediate reduced-motion inspection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await enter(page);
  const stage = page.locator(".am-canvas");
  await page.locator('[data-hotspot="ribs"]').click();
  const all = await stage.locator("canvas").screenshot();
  await page.getByRole("button", { name: "Emphasise one rib" }).click();
  await expect(stage).toHaveAttribute("data-rib", "4");
  const one = await stage.locator("canvas").screenshot();
  expect(all.equals(one)).toBe(false);
  await page.locator('[data-part="thread"]').click();
  await page.getByRole("button", { name: "Trace a tie" }).click();
  await expect(
    page.getByRole("button", { name: "Trace a tie" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator('[data-part="canopy"]').click();
  await page.getByRole("button", { name: "Underneath", exact: true }).click();
  await expect(stage).toHaveAttribute("data-side", "underneath");
  await page.getByRole("button", { name: "Reveal structure" }).click();
  await expect(stage).toHaveAttribute("data-reveal", "true");
  await page.getByRole("slider", { name: "Pull the runner" }).fill("0.4");
  await expect(stage).toHaveAttribute("data-open", "0.400");
  await page.locator('[data-part="thread"]').focus();
  await expect(stage).toHaveAttribute("data-inspection", "canopy");
  await page.keyboard.press("Enter");
  await expect(stage).toHaveAttribute("data-inspection", "thread");
  await page.keyboard.press("Escape");
  await expect(stage).toHaveAttribute("data-inspection", "overview");
  await expect(stage).toHaveAttribute("data-open", "1.000");
});
test("Anatomy cancels demonstrations and hands the scene back on chapter exit", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await enter(page, false);
  const stage = page.locator(".am-canvas");
  await page.locator('[data-part="stretchers"]').click();
  await page.getByRole("button", { name: "Move the linkage" }).click();
  await expect(stage).toHaveAttribute("data-action", "linkage");
  await page.getByRole("slider", { name: "Pull the runner" }).fill("0.37");
  await expect(stage).toHaveAttribute("data-action", "none");
  await expect(stage).toHaveAttribute("data-open", "0.370");
  await page.evaluate(() => window.scrollBy({ top: 100, behavior: "instant" }));
  await expect(stage).toHaveAttribute("data-open", "0.370");
  await page.locator('[data-part="thread"]').click();
  await page.getByRole("button", { name: "Trace a tie" }).click();
  await expect(stage).toHaveAttribute("data-action", "trace");
  await page.locator('[data-part="handle"]').click();
  await expect(stage).toHaveAttribute("data-action", "none");
  await page.getByRole("button", { name: "Turn the view" }).click();
  await expect(stage).toHaveAttribute("data-action", "turn");
  await page
    .locator("#light")
    .evaluate((el) =>
      window.scrollTo({
        top: (el as HTMLElement).offsetTop,
        behavior: "instant",
      }),
    );
  await expect(stage).toHaveAttribute("data-inspection", "inactive");
  await expect(page.locator("[data-inspector-overlay]")).toBeHidden();
  await page
    .locator("#structure")
    .evaluate((el) =>
      window.scrollTo({
        top: (el as HTMLElement).offsetTop,
        behavior: "instant",
      }),
    );
  await expect(stage).toHaveAttribute("data-inspection", "overview");
  await expect(stage).toHaveAttribute("data-action", "none");
  await expect(stage).toHaveAttribute("data-reveal", "false");
});
test("Anatomy projected runner drag does not orbit or select another part", async ({
  page,
}) => {
  test.slow();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await enter(page, false);
  const stage = page.locator(".am-canvas");
  await page.locator('[data-part="runner"]').click();
  await expect(stage).toHaveAttribute("data-camera-settled", "true", {
    timeout: 20_000,
  });
  const d = await page.locator('[data-marker-line="runner"]').getAttribute("d");
  const numbers = d!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  const [x, y] = numbers;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 25, y + 90, { steps: 8 });
  await page.mouse.up();
  await expect
    .poll(async () => Number(await stage.getAttribute("data-open")))
    .toBeLessThan(0.95);
  await expect(stage).toHaveAttribute("data-orbit", "0.000");
  await expect(stage).toHaveAttribute("data-inspection", "runner");
});
