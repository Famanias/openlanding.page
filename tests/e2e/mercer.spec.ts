import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const shots = path.resolve(".openlanding-page/mercer/shots");

test("desktop renders a compiled, colored WebGL knot and its complete hero", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/mercer");
  await expect(page).toHaveTitle("Jules Mercer // Creative Developer Portfolio");
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "running");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("IMAGINE.");
  const canvas = page.locator("canvas[data-mercer-renderer]");
  await expect(canvas).toHaveCount(1);
  await expect(page.locator(".jm-fps")).toContainText(/\d+ FPS/);
  const webgl = await canvas.evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    const context = canvas.getContext("webgl2");
    return { error: context?.getError(), ratio: canvas.width / canvas.clientWidth };
  });
  expect(webgl.error).toBe(0);
  expect(webgl.ratio).toBeLessThanOrEqual(1.51);
  await page.getByRole("button", { name: "Pause animation" }).click();
  const pixels = await sharp(await canvas.screenshot()).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let cyan = 0;
  let lime = 0;
  for (let index = 0; index < pixels.data.length; index += pixels.info.channels) {
    const [r, g, b] = pixels.data.subarray(index, index + 3);
    if (g > 90 && b > 90 && r < g * 0.7) cyan++;
    if (r > 70 && g > 90 && b < g * 0.55) lime++;
  }
  expect(cyan).toBeGreaterThan(500);
  expect(lime).toBeGreaterThan(500);
  await mkdir(shots, { recursive: true });
  await page.screenshot({ path: path.join(shots, "desktop-1440.png"), fullPage: true, animations: "disabled" });
  expect(errors).toEqual([]);
});

test("pause holds the frame, pointer parallax is bounded, and resizing retains the canvas", async ({ page }) => {
  await page.goto("/mercer");
  const stage = page.locator(".jm-stage");
  await expect(stage).toHaveAttribute("data-state", "running");
  await page.mouse.move(900, 250);
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(stage).toHaveAttribute("data-state", "paused");
  const canvas = stage.locator("canvas");
  const first = await canvas.screenshot();
  await page.mouse.move(0, 0);
  const second = await canvas.screenshot();
  expect(first.equals(second)).toBe(true);
  await page.getByRole("button", { name: "Play animation" }).click();
  await expect(stage).toHaveAttribute("data-state", "running");
  await page.setViewportSize({ width: 900, height: 700 });
  await expect(canvas).toHaveCount(1);
  await expect.poll(() => canvas.evaluate((element) => {
    const drawing = element as HTMLCanvasElement;
    return Math.abs(drawing.width / drawing.height - drawing.clientWidth / drawing.clientHeight);
  })).toBeLessThan(0.01);
  await page.getByRole("button", { name: "Pause animation" }).click();
  await mkdir(shots, { recursive: true });
  await page.screenshot({ path: path.join(shots, "laptop-900.png"), fullPage: true, animations: "disabled" });
});

test("project and about controls open native dialogs, pause rendering and return focus", async ({ page }) => {
  await page.goto("/mercer");
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "running");
  const explore = page.getByRole("button", { name: "EXPLORE PROJECTS", exact: true });
  await explore.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "paused");
  await dialog.getByRole("button", { name: /SHIFT SYSTEM/ }).click();
  await expect(dialog.getByRole("heading")).toHaveText("SHIFT SYSTEM");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(explore).toBeFocused();
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "running");
  await page.getByRole("button", { name: "ABOUT ME", exact: true }).click();
  await expect(dialog.getByRole("heading")).toContainText("Design in mind.");
  await dialog.getByRole("button", { name: "Close details" }).click();
  await expect(dialog).not.toBeVisible();
});

test("context loss displays the fallback and restoration resumes the same scene", async ({ page }) => {
  await page.goto("/mercer");
  const stage = page.locator(".jm-stage");
  await expect(stage).toHaveAttribute("data-state", "running");
  const extension = await page.locator("canvas").evaluateHandle((element) => (element as HTMLCanvasElement).getContext("webgl2")?.getExtension("WEBGL_lose_context"));
  await extension.evaluate((extension) => {
    if (!extension) throw new Error("Context loss extension unavailable");
    extension.loseContext();
  });
  await expect(stage).toHaveAttribute("data-state", "lost");
  await expect(page.locator(".jm-knot-fallback")).toBeVisible();
  await extension.evaluate((extension) => extension?.restoreContext());
  await expect(stage).toHaveAttribute("data-state", "running");
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("reduced motion never mounts WebGL and a preference change cleans up the renderer", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/mercer");
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "static");
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".jm-knot-fallback")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "running");
  await expect(page.locator("canvas")).toHaveCount(1);
  const removedCanvas = await page.locator("canvas").elementHandle();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "static");
  await expect.poll(() => removedCanvas?.evaluate((element) => (element as HTMLCanvasElement).getContext("webgl2")?.isContextLost())).toBe(true);
});

test("mobile navigation, touch layout and project strip have no document overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/mercer");
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "running");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByLabel("Toggle navigation").click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await nav.getByRole("button", { name: "about", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav).not.toBeVisible();
  await page.getByRole("button", { name: "Pause animation" }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await mkdir(shots, { recursive: true });
  await page.screenshot({ path: path.join(shots, "mobile-390.png"), fullPage: true, animations: "disabled" });
});

test("a blocked WebGL context leaves the complete static design visible", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = new Proxy(original, {
      apply(target, receiver: HTMLCanvasElement, args: unknown[]) {
        return args[0] === "webgl2" ? null : Reflect.apply(target, receiver, args);
      },
    });
  });
  await page.goto("/mercer");
  await expect(page.locator(".jm-stage")).toHaveAttribute("data-state", "unavailable");
  await expect(page.locator(".jm-knot-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("without JavaScript the headline and procedural drawing are visible", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("/mercer");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".jm-knot-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await context.close();
});
