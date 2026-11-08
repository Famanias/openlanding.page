import { test, expect } from "@playwright/test";

test("NOISE CLUB renders narrative chapters and interactive rhythm lab", async ({ page }) => {
  await page.goto("/noiseclub");

  // Check header and title
  await expect(page.getByRole("link", { name: "NOISE CLUB®" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/THE\s*WORLD\s*IS\s*YOUR\s*SAMPLE/);

  // Check all chapters exist
  await expect(page.locator("#the-signal")).toBeVisible();
  await expect(page.locator("#hear-everything")).toBeVisible();
  await expect(page.locator("#capture-it")).toBeVisible();
  await expect(page.locator("#chop-it-up")).toBeVisible();
  await expect(page.locator("#build-a-beat")).toBeVisible();
  await expect(page.locator("#break-the-rules")).toBeVisible();
  await expect(page.locator("#take-the-noise")).toBeVisible();

  // Check interactive sequencer in Chapter 04
  const sequencer = page.locator("#build-a-beat");
  await sequencer.scrollIntoViewIfNeeded();
  await expect(sequencer.getByRole("button", { name: /PLAY 16-STEP LOOP|STOP SEQUENCER/i })).toBeVisible();

  // Check hardware illustration in Chapter 00
  await expect(page.locator("#the-signal svg").first()).toBeVisible();
});

test("NOISE CLUB mobile viewport has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/noiseclub");
  await expect(page.getByRole("link", { name: "NOISE CLUB®" }).first()).toBeVisible();

  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(hasOverflow).toBe(false);
});


for (const javaScriptEnabled of [true, false]) {
  test(`waveforms fit a phone with JavaScript ${javaScriptEnabled ? "enabled" : "disabled"}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
    try {
      const page = await context.newPage();
      await page.goto("/noiseclub");
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    } finally { await context.close(); }
  });
}


test("the sequencer schedules native synthesized audio after opt-in", async ({ page }) => {
  await page.addInitScript(() => {
    Reflect.set(window, "__noiseAudioStarts", 0);
    const start = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args) {
      start.apply(this, args);
      if (this.context.state === "running") Reflect.set(window, "__noiseAudioStarts", Reflect.get(window, "__noiseAudioStarts") + 1);
    };
  });
  await page.goto("/noiseclub");
  expect(await page.evaluate(() => Reflect.get(window, "__noiseAudioStarts"))).toBe(0);
  await page.getByRole("button", { name: "PLAY 16-STEP LOOP", exact: true }).click();
  await expect(page.getByRole("button", { name: "STOP SEQUENCER", exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => Reflect.get(window, "__noiseAudioStarts"))).toBeGreaterThan(0);
  await page.getByRole("button", { name: "STOP SEQUENCER", exact: true }).click();
  await expect(page.getByRole("button", { name: "PLAY 16-STEP LOOP", exact: true })).toBeVisible();
});
