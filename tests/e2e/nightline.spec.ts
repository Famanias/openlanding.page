import { expect, test } from "@playwright/test";

test.describe("NIGHTLINE", () => {
  test("moves through the line and validates the night desk", async ({ page }) => {
    await page.goto("/nightline");
    await expect(page.getByRole("heading", { name: /Take the long way/i })).toBeVisible();
    await page.getByRole("link", { name: /Find your night/i }).click();
    await expect(page).toHaveURL(/#book$/);
    await page.getByRole("button", { name: /Show me the line/i }).click();
    await expect(page.getByText("Add your name", { exact: true })).toBeVisible();
    await page.getByLabel("Name").fill("Mina");
    await page.getByLabel("Work email").fill("mina@studio.eu");
    await page.getByLabel("Departure city").fill("Paris");
    await page.getByRole("button", { name: /Show me the line/i }).click();
    await expect(page.getByText(/Your night is/)).toBeVisible();
  });

  test("compiles the window shader and clears fog under the pointer", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
    await page.goto("/nightline");
    const canvas = page.locator("canvas.nli-webgl");
    await expect(canvas).toHaveCount(1);
    await page.waitForTimeout(400);
    expect(await canvas.getAttribute("data-fallback")).toBeNull();
    const sample = () => canvas.evaluate((el) => {
      const c = el as HTMLCanvasElement;
      const copy = document.createElement("canvas");
      copy.width = c.width; copy.height = c.height;
      return new Promise<number>((resolve) => requestAnimationFrame(() => {
        const ctx = copy.getContext("2d")!;
        ctx.drawImage(c, 0, 0);
        const { data } = ctx.getImageData(Math.floor(c.width / 2) - 8, Math.floor(c.height / 2) - 8, 16, 16);
        let sum = 0; for (let i = 0; i < data.length; i += 4) sum += data[i] + data[i + 1] + data[i + 2];
        resolve(sum / (data.length / 4));
      }));
    });
    const viewport = page.viewportSize()!;
    const before = await sample();
    for (let i = 0; i <= 12; i++) await page.mouse.move(viewport.width * (0.35 + i * 0.025), viewport.height / 2);
    await page.waitForTimeout(120);
    expect(await sample()).not.toBeCloseTo(before, 1);
    expect(errors).toEqual([]);
  });

  test("never mounts WebGL when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      (window as unknown as { __glRequests: number }).__glRequests = 0;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
        if (type === "webgl2" || type === "webgl") (window as unknown as { __glRequests: number }).__glRequests++;
        return (original as (...args: unknown[]) => unknown).call(this, type, ...rest) as never;
      } as typeof original;
    });
    await page.goto("/nightline");
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => (window as unknown as { __glRequests: number }).__glRequests)).toBe(0);
  });

  test("keeps all content visible in reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/nightline");
    await expect(page.locator("[data-reveal]").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Wake on/i })).toBeVisible();
  });
});
