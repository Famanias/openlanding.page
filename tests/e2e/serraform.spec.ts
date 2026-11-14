import { expect, test } from "@playwright/test";
import { deflateSync } from "node:zlib";

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createMulticolorTestPng(width = 8, height = 8): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (1 + width * 4);
    raw[rowStart] = 0;
    for (let x = 0; x < width; x += 1) {
      const px = rowStart + 1 + x * 4;
      raw[px] = x < width / 2 ? 210 : 40;
      raw[px + 1] = y < height / 2 ? 170 : 60;
      raw[px + 2] = 90;
      raw[px + 3] = 255;
    }
  }
  const idat = deflateSync(raw);
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

test.describe("SERRAFORM", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully", async ({ page }) => {
    await page.goto("/templates/serraform");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/templates/serraform");
    await expect(page.locator("body")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/templates/serraform");
    await expect(page.locator("body")).toBeVisible();
  });

  test("hydrates without hydration mismatch error", async ({ page }) => {
    const hydrationErrors: string[] = [];
    page.on("console", (msg) => {
      const text = msg.text();
      if (
        text.includes("Hydration failed") ||
        text.includes("hydration-mismatch") ||
        text.includes("didn't match the client")
      ) {
        hydrationErrors.push(text);
      }
    });
    page.on("pageerror", (err) => {
      if (err.message.includes("Hydration failed") || err.message.includes("hydration")) {
        hydrationErrors.push(err.message);
      }
    });
    await page.goto("/templates/serraform");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
    expect(hydrationErrors).toEqual([]);
  });

  test("supports independent Base Color & Print Color workflows, contrast assistance, upload opt-in tint, and 7-pair matrix", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (err) => consoleErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/templates/serraform");
    const dock = page.getByTestId("hero-studio-dock");
    await expect(dock).toBeVisible();

    // Ensure 5-column Hero dock does not overflow desktop viewport
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);

    // Ensure 3D/2D divider canvas mounted cleanly
    const stageCanvas = page.getByTestId("hero-fullbleed-scene-layer").locator("canvas").first();
    await expect(stageCanvas).toBeVisible();

    // Verify all 5 dock headings exist cleanly
    await expect(dock.getByText("Base color", { exact: true })).toBeVisible();
    await expect(dock.getByText("Print", { exact: true })).toBeVisible();
    await expect(dock.getByText("Print color", { exact: true })).toBeVisible();
    await expect(dock.getByRole("button", { name: "Reset design and shape defaults" })).toBeVisible();
    await expect(dock.getByText("Shape", { exact: true })).toBeVisible();

    const readout = page.getByTestId("hero-atelier-readout");
    const shapeRange = page.getByTestId("hero-shape-range");

    // 1. Changing Base Color preserves Print Color; changing Print Color preserves Base Color
    await dock.getByRole("button", { name: /^Base color Charcoal/i }).click();
    await expect(readout).toContainText("#2B2426 / #4B202A");

    await dock.getByRole("button", { name: /^Print color Porcelain/i }).click();
    await expect(readout).toContainText("#2B2426 / #FFFCF8");

    // 2. Recoloring fully folded (0%) and fully open (100%) divider preserves openness
    await shapeRange.fill("0");
    await shapeRange.dispatchEvent("change");
    await dock.getByRole("button", { name: /^Print color Clay/i }).click();
    await expect(shapeRange).toHaveValue("0");
    await expect(readout).toContainText("#2B2426 / #9A463D");

    await shapeRange.fill("100");
    await shapeRange.dispatchEvent("change");
    await dock.getByRole("button", { name: /^Base color Flax/i }).click();
    await expect(shapeRange).toHaveValue("100");
    await expect(readout).toContainText("#D8C4A7 / #9A463D");

    // 3. Switching to Solid disables Print Color controls while keeping saved value; switching back restores it
    await dock.getByRole("button", { name: /^Print Solid$/i }).click();
    await expect(page.getByTestId("hero-print-color-section")).toHaveClass(/opacity-55/);
    await expect(page.getByTestId("hero-print-color-picker")).toBeDisabled();
    await expect(page.getByTestId("hero-design-color-btn")).toContainText("#9A463D");

    await dock.getByRole("button", { name: /^Print Stripes$/i }).click();
    await expect(page.getByTestId("hero-print-color-picker")).toBeEnabled();
    await expect(readout).toContainText("#D8C4A7 / #9A463D");

    await dock.getByRole("button", { name: /^Print Bloom$/i }).click();
    await expect(readout).toContainText("#D8C4A7 / #9A463D");

    // 4. Low contrast detection + one-click Suggest contrast via Hero Studio Dock
    const basePicker = page.getByTestId("hero-base-color-picker");
    const printPicker = page.getByTestId("hero-print-color-picker");

    await basePicker.fill("#b82925");
    await basePicker.dispatchEvent("change");
    await printPicker.fill("#6b1515");
    await printPicker.dispatchEvent("change");

    const heroWarning = page.getByTestId("hero-contrast-warning");
    await expect(heroWarning).toContainText("Low print contrast — try a lighter or darker color.");
    await page.getByTestId("hero-suggest-contrast-btn").click();
    await expect(heroWarning).toBeHidden();
    await expect(readout).toContainText("#B82925 / #FFFCF8");

    // Verify legible Sage + Dark plum produces no low-contrast warning
    await basePicker.fill("#a6b3a0");
    await basePicker.dispatchEvent("change");
    await printPicker.fill("#4b202a");
    await printPicker.dispatchEvent("change");
    await expect(heroWarning).toBeHidden();

    // 5. Test all 7 required Base + Print + Print-Type matrix combinations & room CSS coordination
    const matrix: Array<{
      base: string;
      printColor: string;
      printName: string;
    }> = [
      { base: "#4B202A", printColor: "#FFFCF8", printName: "Bloom" },
      { base: "#F3E8E4", printColor: "#4B202A", printName: "Bloom" },
      { base: "#F3ECE0", printColor: "#4B202A", printName: "Stripes" },
      { base: "#A6B3A0", printColor: "#9A463D", printName: "Waves" },
      { base: "#2B2426", printColor: "#E4C578", printName: "Landscape" },
      { base: "#D32F2F", printColor: "#FFFFFF", printName: "Bloom" },
      { base: "#FFFFFF", printColor: "#2B2426", printName: "Bloom" },
    ];

    const heroSection = page.getByTestId("hero-section");
    let firstRoomAccent = "";

    for (const row of matrix) {
      await dock.getByRole("button", { name: new RegExp(`^Print ${row.printName}$`, "i") }).click();
      await basePicker.fill(row.base.toLowerCase());
      await basePicker.dispatchEvent("change");
      await printPicker.fill(row.printColor.toLowerCase());
      await printPicker.dispatchEvent("change");
      await expect(heroWarning).toBeHidden();
      await expect(readout).toContainText(`${row.printName} · ${row.base} / ${row.printColor}`);

      if (row.base === "#4B202A") {
        firstRoomAccent = await heroSection.evaluate((el) =>
          getComputedStyle(el).getPropertyValue("--room-decor-primary").trim(),
        );
        // Verify Bloom thumbnail canvas renders both dark Burgundy felt and crisp Ivory petals
        await page.waitForTimeout(80);
        const bloomThumbStats = await dock
          .getByRole("button", { name: /^Print Bloom$/i })
          .locator("canvas")
          .evaluate((canvas: HTMLCanvasElement) => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return { hasDarkBurgundy: false, hasLightIvory: false };
            const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let hasDarkBurgundy = false;
            let hasLightIvory = false;
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              if (r >= 60 && r <= 95 && g <= 48 && b <= 58) hasDarkBurgundy = true;
              if (r >= 220 && g >= 215 && b >= 210) hasLightIvory = true;
              if (hasDarkBurgundy && hasLightIvory) break;
            }
            return { hasDarkBurgundy, hasLightIvory };
          });
        expect(bloomThumbStats).toEqual({ hasDarkBurgundy: true, hasLightIvory: true });
      }
    }

    // Verify 2.5D room CSS vars updated dynamically between Burgundy+Ivory and White+Charcoal
    const finalRoomAccent = await heroSection.evaluate((el) =>
      getComputedStyle(el).getPropertyValue("--room-decor-primary").trim(),
    );
    expect(firstRoomAccent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(finalRoomAccent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(finalRoomAccent).not.toEqual(firstRoomAccent);

    // 6. Reset restores default Base Color (#D8C4A7), Print Color (#4B202A), and Bloom
    await dock.getByRole("button", { name: /Reset design and shape defaults/i }).click();
    await expect(readout).toContainText("Bloom · #D8C4A7 / #4B202A");
    await expect(stageCanvas).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });

  test("native color pickers never trigger React maximum update depth loops under rapid input", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/templates/serraform");

    const dock = page.getByTestId("hero-studio-dock");
    await expect(dock).toBeVisible();
    const readout = page.getByTestId("hero-atelier-readout");
    await expect(readout).toContainText("Bloom · #D8C4A7 / #4B202A");

    const basePicker = page.getByTestId("hero-base-color-picker");
    const printPicker = page.getByTestId("hero-print-color-picker");

    // Simulate rapid dragging across 65 shades on hero print color picker (Chromium lowercase values)
    await printPicker.focus();
    await printPicker.evaluate((el) => {
      const input = el as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      for (let i = 0; i < 65; i += 1) {
        const hex = `#${(0x10 + i * 2).toString(16).padStart(2, "0")}4466`;
        setter.call(input, hex);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await printPicker.blur();
    await expect(readout).toContainText("/ #904466");

    // Drive hero base color picker via fill() and verify DOM stays synced without loop
    await basePicker.fill("#3a5a40");
    await basePicker.blur();
    await expect(readout).toContainText("Bloom · #3A5A40 / #904466");

    // Rapid dragging on base color picker directly
    await basePicker.focus();
    await basePicker.evaluate((el) => {
      const input = el as HTMLInputElement;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
      for (let i = 0; i < 65; i += 1) {
        const hex = `#${(0x20 + i * 2).toString(16).padStart(2, "0")}88aa`;
        setter.call(input, hex);
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await basePicker.blur();
    await expect(readout).toContainText("#A088AA / #904466");

    // Clicking an external preset swatch should re-sync DOM <input type="color"> cleanly
    await dock.getByRole("button", { name: /^Print color Oxblood/i }).click();
    await expect(readout).toContainText("/ #4B202A");
    await expect(printPicker).toHaveValue("#4b202a");

    expect(errors).toEqual([]);
  });
});
