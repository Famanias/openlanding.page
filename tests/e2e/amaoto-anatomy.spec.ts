import { test, expect } from "@playwright/test";
import { enterAnatomy, choosePart, go } from "./amaoto.helpers";
const parts = [
  { id: "ribs", name: "Bamboo ribs" },
  { id: "stretchers", name: "Stretchers" },
  { id: "runner", name: "Runner ring" },
  { id: "thread", name: "Thread lacing" },
  { id: "canopy", name: "Washi paper" },
  { id: "handle", name: "Turned handle" },
];
for (const width of [1440, 390])
  test(`Anatomy freely inspects all six parts at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await enterAnatomy(page);
    const stage = page.locator(".am-canvas");
    await expect(stage).toHaveAttribute("data-explode", "0.000");
    for (const part of parts) {
      await choosePart(page, part.id);
      await expect(
        page.getByRole("heading", { name: part.name, exact: true }),
      ).toBeVisible();
      await expect(stage).toHaveAttribute("data-camera-settled", "true", {
        timeout: 20000,
      });
      await test.info().attach(part.id, {
        body: await page.screenshot(),
        contentType: "image/png",
      });
    }
    await page.keyboard.press("Escape");
    await expect(page.locator(".am-page")).toHaveAttribute("data-tool", "none");
    await expect(stage).toHaveAttribute("data-inspection", "overview");
    await expect(stage).toHaveAttribute("data-reveal", "false");
    expect(errors).toEqual([]);
  });
test("Anatomy actions change the object and reduced motion retains all part descriptions", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await enterAnatomy(page);
  const stage = page.locator(".am-canvas");
  await choosePart(page, "ribs");
  await page.getByRole("button", { name: "Emphasise one rib" }).click();
  await expect(stage).toHaveAttribute("data-rib", "4");
  await choosePart(page, "thread");
  await page.getByRole("button", { name: "Trace a tie" }).click();
  await expect(stage).toHaveAttribute("data-action", "trace");
  await choosePart(page, "canopy");
  await page.getByRole("button", { name: "Underneath", exact: true }).click();
  await expect(stage).toHaveAttribute("data-side", "underneath");
  await page.getByRole("button", { name: "Reveal structure" }).click();
  await expect(stage).toHaveAttribute("data-reveal", "true");
  await page.getByRole("slider", { name: "Pull the runner" }).fill("0.4");
  await expect(stage).toHaveAttribute("data-open", "0.400");
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-world-mode",
    "static",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  for (const part of parts)
    await expect(page.locator(".am-anatomy-fallback")).toContainText(part.name);
});
test("Anatomy cancels demonstrations and hands the scene back on chapter exit", async ({
  page,
}) => {
  test.setTimeout(90000);
  await enterAnatomy(page);
  const stage = page.locator(".am-canvas");
  await choosePart(page, "stretchers");
  await page.getByRole("button", { name: "Move the linkage" }).click();
  await expect(stage).toHaveAttribute("data-action", "linkage");
  await page.getByRole("slider", { name: "Pull the runner" }).fill("0.37");
  await expect(stage).toHaveAttribute("data-action", "none");
  await expect(stage).toHaveAttribute("data-open", "0.370");
  const y = await page.evaluate(() => scrollY);
  await page.mouse.move(500, 400);
  await page.mouse.wheel(0, 600);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(y);
  await choosePart(page, "handle");
  await page
    .getByRole("button", { name: "Turn the view", exact: true })
    .click();
  await expect(stage).toHaveAttribute("data-action", "turn");
  await go(page, 0.66);
  await expect(page.locator(".am-page")).toHaveAttribute("data-tool", "none");
  await expect(page.locator("html")).not.toHaveAttribute(
    "style",
    /overflow: hidden/,
  );
  await expect(stage).toHaveAttribute("data-inspection", "inactive");
  await go(page, 0.18);
  await expect(stage).toHaveAttribute("data-inspection", "overview");
  await expect(stage).toHaveAttribute("data-action", "none");
});
test("Anatomy projected runner drag does not orbit or select another part", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await enterAnatomy(page);
  const stage = page.locator(".am-canvas");
  await choosePart(page, "runner");
  await expect(stage).toHaveAttribute("data-camera-settled", "true", {
    timeout: 20000,
  });
  const d = (await page
    .locator('[data-marker-line="runner"]')
    .getAttribute("d"))!;
  const [x, y] = d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 25, y + 90, { steps: 8 });
  await page.mouse.up();
  await expect
    .poll(async () => Number(await stage.getAttribute("data-open")))
    .toBeLessThan(0.95);
  await expect(stage).toHaveAttribute("data-orbit", "0.000");
  await expect(stage).toHaveAttribute("data-inspection", "runner");
  await page.locator(".am-canvas").focus();
  const rotation = await stage.getAttribute("data-inspect-rotation");
  await page.keyboard.press("ArrowRight");
  await expect(stage).not.toHaveAttribute("data-inspect-rotation", rotation!);
  await page.keyboard.press("Escape");
  await expect(page.locator(".am-page")).toHaveAttribute(
    "data-inspect-phase",
    "idle",
    { timeout: 5000 },
  );
});
