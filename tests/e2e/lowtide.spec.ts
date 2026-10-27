import { expect, test, type Page } from "@playwright/test";

// Headless Chromium needs SwiftShader allowed explicitly for WebGL2 (launch options must be file-level).
test.use({ launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] } });

async function openNight(page: Page) {
  await page.goto("/lowtide");
  await expect(page.locator("html")).toHaveAttribute("data-lt-mode", "experience", { timeout: 30_000 });
  return page.getByRole("slider", { name: "Night clock" });
}

test.describe("LOWTIDE night (motion on)", () => {
  test.use({ reducedMotion: "no-preference" });

  test("mounts the 3D night over the tide table", async ({ page }) => {
    await openNight(page);
    await expect(page.locator("canvas.lt-canvas")).toHaveCount(1);
    await expect(page.locator(".lt-table")).toBeAttached();
  });

  test("the moon dial steps between low tides from the keyboard", async ({ page }) => {
    const dial = await openNight(page);
    await dial.focus();
    await page.keyboard.press("ArrowRight");
    await expect(dial).toHaveAttribute("aria-valuetext", /^00:40/);
    await page.keyboard.press("ArrowRight");
    await expect(dial).toHaveAttribute("aria-valuetext", /^02:15/);
    await expect(page.locator(".lt-announcer")).toContainText("Second low tide");
  });

  test("Space steps the night from the page but not from a focused control", async ({ page }) => {
    const dial = await openNight(page);
    await page.getByRole("button", { name: "Sound" }).focus();
    await page.keyboard.press("Space");
    await page.waitForTimeout(400);
    await expect(dial).toHaveAttribute("aria-valuetext", /^23:04/);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.keyboard.press("Space");
    await expect(dial).toHaveAttribute("aria-valuetext", /^00:40/);
  });

  test("a reload comes back to the same low tide", async ({ page }) => {
    const dial = await openNight(page);
    await page.getByRole("button", { name: /^Fourth low tide/ }).click();
    await expect(page.locator(".lt-announcer")).toContainText("Fourth low tide");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-lt-mode", "experience", { timeout: 30_000 });
    await expect(dial).toHaveAttribute("aria-valuetext", /^05:25/);
  });

  test("dawn draws your night, keeps it as an image and takes the pre-order", async ({ page }) => {
    test.setTimeout(120_000); // the full night renders slowly under software WebGL
    await openNight(page);
    await page.getByRole("button", { name: /^Dawn/ }).click();
    const finale = page.locator(".lt-finale");
    await expect(finale).toBeVisible({ timeout: 15_000 });
    await finale.getByLabel("Bedtime").fill("23:00");
    await finale.getByLabel("Wake by").fill("06:45");
    await expect(finale.locator(".lt-calc__wake")).toHaveText("06:30");
    const download = page.waitForEvent("download");
    await finale.getByRole("button", { name: "Keep your night" }).click();
    expect((await download).suggestedFilename()).toBe("lowtide-night-2300-0645.png");
    await finale.getByLabel("Email").fill("sleeper@example.com");
    await finale.getByLabel("Ring size").selectOption("9");
    await finale.getByRole("radio", { name: "Driftwood" }).check();
    await finale.getByRole("button", { name: "Reserve my ring" }).click();
    await expect(finale.getByText("See you at low tide.")).toBeVisible();
  });

  test("while the engine boots, the visible tide table still takes clicks", async ({ page }) => {
    // hold the moon texture so the engine never finishes booting
    await page.route("**/moon-2048.jpg", () => new Promise(() => {}));
    await page.goto("/lowtide");
    await expect(page.locator("canvas.lt-canvas")).toHaveCount(1, { timeout: 15_000 });
    const form = page.locator(".lt-dawn form");
    await form.scrollIntoViewIfNeeded();
    await form.getByRole("button", { name: "Reserve my ring" }).click({ timeout: 5_000 });
    await expect(form.locator(".lt-field__error")).toHaveCount(3);
  });

  test("a small scroll back at dawn keeps what the visitor typed", async ({ page }) => {
    test.setTimeout(120_000);
    await openNight(page);
    await page.getByRole("button", { name: /^Dawn/ }).click();
    const finale = page.locator(".lt-finale");
    await expect(finale).toBeVisible({ timeout: 15_000 });
    await finale.getByLabel("Email").fill("keep@example.com");
    await page.mouse.move(720, 160);
    await page.mouse.wheel(0, -40);
    await page.waitForTimeout(2500);
    await expect(finale.getByLabel("Email")).toHaveValue("keep@example.com");
  });

  test("holding the moon dial still keeps the night where it is", async ({ page }) => {
    const dial = await openNight(page);
    const box = (await dial.boundingBox())!;
    // a point on the arc at about p = 0.3 (DIAL: 132px, centre 66, radius 50, arc from 210° over 240°)
    const a = ((210 - 240 * 0.3) * Math.PI) / 180;
    const at = (r: number) => ({ x: box.x + ((66 + r * Math.cos(a)) / 132) * box.width, y: box.y + ((66 - r * Math.sin(a)) / 132) * box.height });
    await page.mouse.move(at(50).x, at(50).y);
    await page.mouse.down();
    await page.mouse.move(at(50).x + 1, at(50).y + 1);
    await page.waitForTimeout(300);
    const held = await dial.getAttribute("aria-valuetext");
    await page.waitForTimeout(1500);
    await expect(dial).toHaveAttribute("aria-valuetext", held!);
    await page.mouse.up();
  });

  test("resizing the window keeps the visitor at the same low tide", async ({ page }) => {
    const dial = await openNight(page);
    await page.getByRole("button", { name: /^Fourth low tide/ }).click();
    await expect(page.locator(".lt-announcer")).toContainText("Fourth low tide");
    await page.setViewportSize({ width: 1280, height: 600 });
    await page.waitForTimeout(2500);
    await expect(dial).toHaveAttribute("aria-valuetext", /^05:25/);
  });

  test("scrolling during a settle wins over the settle", async ({ page }) => {
    await openNight(page);
    await page.mouse.move(700, 450);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(900); // the night starts settling back to high tide
    await page.mouse.wheel(0, 900);
    await expect(page.locator(".lt-announcer")).toContainText("First low tide", { timeout: 10_000 });
  });
});

test.describe("LOWTIDE tide table (reduced motion)", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows the whole night as a finished page, with no 3D canvas", async ({ page }) => {
    await page.goto("/lowtide");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Let the tide go out.");
    await expect(page.locator("h2")).toHaveCount(6);
    await expect(page.getByRole("heading", { name: "We wake you on the outgoing tide." })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute("data-lt-mode", "table");
  });

  test("works out the smart-wake moment for your night", async ({ page }) => {
    await page.goto("/lowtide");
    const calc = page.locator(".lt-dawn .lt-calc");
    await calc.getByLabel("Bedtime").fill("00:00");
    await calc.getByLabel("Wake by").fill("07:00");
    await expect(calc.locator(".lt-calc__wake")).toHaveText("07:00");
    await calc.getByLabel("Bedtime").fill("23:00");
    await calc.getByLabel("Wake by").fill("06:45");
    await expect(calc.locator(".lt-calc__wake")).toHaveText("06:30");
    await calc.getByLabel("Wake by").fill("23:00");
    await expect(calc.getByRole("alert")).toHaveText("Bedtime and wake time can't match.");
  });

  test("validates the pre-order and lands on the success state", async ({ page }) => {
    await page.goto("/lowtide");
    const form = page.locator(".lt-dawn form");
    await form.getByRole("button", { name: "Reserve my ring" }).click();
    await expect(form.locator(".lt-field__error")).toHaveCount(3);
    await expect(form.getByLabel("Email")).toBeFocused();
    await form.getByLabel("Email").fill("sleeper@example.com");
    await form.getByLabel("Ring size").selectOption("9");
    await form.getByRole("radio", { name: "Tidewater" }).check();
    await form.getByRole("button", { name: "Reserve my ring" }).click();
    await expect(page.getByText("See you at low tide.")).toBeVisible();
  });
});
