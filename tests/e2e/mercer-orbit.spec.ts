import { expect, test, type Locator } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Compare artwork only: this region excludes the terminal, telemetry and playback controls.
async function artworkFrame(canvas: Locator) {
  await canvas.scrollIntoViewIfNeeded();
  const box = (await canvas.boundingBox())!;
  const page = canvas.page();
  // Use one viewport coordinate system for both desktop and scrolled touch emulation.
  const png = await page.screenshot();
  const metadata = await sharp(png).metadata();
  const scale = metadata.width! / page.viewportSize()!.width;
  return sharp(png).extract({ left: Math.floor((box.x + box.width * 0.46) * scale), top: Math.floor((box.y + box.height * 0.25) * scale), width: Math.floor(box.width * 0.36 * scale), height: Math.floor(box.height * 0.42 * scale) }).removeAlpha().raw().toBuffer();
}

test("the knot rotates by dragging, moves with Shift+drag, and resets without snapping back on release", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/mercer");
  const stage = page.locator(".jm-stage");
  await expect(stage).toHaveAttribute("data-state", "running");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await page.getByRole("button", { name: "Reset view" }).click();
  const canvas = stage.locator("canvas");
  const original = await artworkFrame(canvas);
  const box = (await canvas.boundingBox())!;
  const x = box.x + box.width * 0.65;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await expect(stage).toHaveAttribute("data-dragging", "true");
  await page.mouse.move(x - 180, y + 70, { steps: 12 });
  await page.mouse.up();
  await expect(stage).toHaveAttribute("data-dragging", "false");
  const rotated = await artworkFrame(canvas);
  expect(rotated.equals(original)).toBe(false);
  await page.mouse.move(4, 4);
  expect((await artworkFrame(canvas)).equals(rotated)).toBe(true);
  await page.getByRole("button", { name: "Reset view" }).click();
  expect((await artworkFrame(canvas)).equals(original)).toBe(true);

  await page.mouse.move(x, y);
  await page.keyboard.down("Shift");
  await page.mouse.down();
  await page.mouse.move(x + 80, y + 30, { steps: 8 });
  await page.mouse.up();
  await page.keyboard.up("Shift");
  expect((await artworkFrame(canvas)).equals(original)).toBe(false);
  await page.getByRole("button", { name: "Reset view" }).click();
  expect((await artworkFrame(canvas)).equals(original)).toBe(true);

  // Release outside the original canvas must end the captured gesture cleanly.
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(4, 4, { steps: 8 });
  await page.mouse.up();
  await expect(stage).toHaveAttribute("data-dragging", "false");
  await page.getByRole("button", { name: "Reset view" }).click();
  expect((await artworkFrame(canvas)).equals(original)).toBe(true);
  await page.getByRole("button", { name: "Play animation" }).click();
  await expect(stage).toHaveAttribute("data-state", "running");
});

test("keyboard controls turn and move the knot, clamp extreme tilts, and reset with R", async ({ page }) => {
  await page.goto("/mercer");
  const stage = page.locator(".jm-stage");
  await expect(stage).toHaveAttribute("data-state", "running");
  await page.getByRole("button", { name: "Pause animation" }).click();
  const canvas = stage.locator("canvas");
  const interaction = page.getByRole("group", { name: "Interactive torus knot" });
  await interaction.focus();
  await interaction.press("r");
  const original = await artworkFrame(canvas);
  await interaction.press("ArrowLeft");
  const turned = await artworkFrame(canvas);
  expect(turned.equals(original)).toBe(false);
  const browserShortcutAllowed = await interaction.evaluate((element) => element.dispatchEvent(new KeyboardEvent("keydown", { key: "r", ctrlKey: true, bubbles: true, cancelable: true })));
  expect(browserShortcutAllowed).toBe(true);
  expect((await artworkFrame(canvas)).equals(turned)).toBe(true);
  await interaction.press("r");
  expect((await artworkFrame(canvas)).equals(original)).toBe(true);
  await interaction.press("Shift+ArrowRight");
  expect((await artworkFrame(canvas)).equals(original)).toBe(false);
  await interaction.press("Home");
  expect((await artworkFrame(canvas)).equals(original)).toBe(true);
  for (let step = 0; step < 16; step++) await interaction.press("ArrowUp");
  const tilted = await artworkFrame(canvas);
  let lit = 0;
  for (let index = 0; index < tilted.length; index += 3) if (tilted[index + 1] > 75) lit++;
  expect(lit).toBeGreaterThan(300);
  const shots = path.resolve(".openlanding-page/mercer/shots");
  await mkdir(shots, { recursive: true });
  await page.screenshot({ path: path.join(shots, "dragged-knot-desktop.png"), animations: "disabled" });
  await interaction.press("r");
  expect((await artworkFrame(canvas)).equals(original)).toBe(true);
});

test("touch dragging rotates the knot while vertical swipes retain native page scrolling", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  try {
    const page = await context.newPage();
    await page.goto("/mercer");
    const stage = page.locator(".jm-stage");
    await expect(stage).toHaveAttribute("data-state", "running");
    await page.getByRole("button", { name: "Pause animation" }).tap();
    await page.getByRole("button", { name: "Reset view" }).tap();
    const canvas = stage.locator("canvas");
    const original = await artworkFrame(canvas);
    let box = (await canvas.boundingBox())!;
    const session = await context.newCDPSession(page);
    const x = box.x + box.width * 0.65;
    const y = box.y + box.height * 0.4;
    const scrollBefore = await page.evaluate(() => scrollY);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await expect(stage).toHaveAttribute("data-dragging", "true");
    for (let step = 1; step <= 8; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - step * 12, y }] });
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(stage).toHaveAttribute("data-dragging", "false");
    expect((await artworkFrame(canvas)).equals(original)).toBe(false);
    expect(await page.evaluate(() => scrollY)).toBe(scrollBefore);
    const shots = path.resolve(".openlanding-page/mercer/shots");
    await mkdir(shots, { recursive: true });
    await page.screenshot({ path: path.join(shots, "dragged-knot-mobile.png"), animations: "disabled" });

    box = (await canvas.boundingBox())!;
    const startY = box.y + box.height * 0.5;
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: startY }] });
    for (let step = 1; step <= 8; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: startY - step * 20 }] });
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scrollBefore + 20);
    await expect(stage).toHaveAttribute("data-dragging", "false");
  } finally { await context.close(); }
});
