import { test, expect } from "@playwright/test";

test.describe("openlandingpage gallery index", () => {
  test("index lists the three templates with valid links to live sites", async ({ page }) => {
    await page.goto("/");

    const expectedTemplates = [
      { name: "Orrery", href: "/orrery", model: "Claude Opus 5.5 High" },
      { name: "KEYTU", href: "/keytu", model: "Claude Opus 5.5 High" },
      { name: "KŌJI", href: "/koji", model: "Claude Opus 5.5 High" },
    ];

    for (const { name, href, model } of expectedTemplates) {
      const card = page.locator("article").filter({ hasText: name });
      await expect(card).toBeVisible();

      // Verify model tag in the top-left of the preview frame
      const modelTag = card.getByTestId("model-tag");
      await expect(modelTag).toHaveText(new RegExp(model));

      // Verify the title link inside the card
      const titleLink = card.getByRole("link", { name, exact: true });
      await expect(titleLink).toHaveAttribute("href", href);

      // Verify the preview link inside the 16:10 frame
      const previewLink = card.getByRole("link", {
        name: new RegExp(`Open live ${name} template in new tab`, "i"),
      });
      await expect(previewLink).toHaveAttribute("href", href);
    }
  });

  test("copying prompt writes PROMPT.md content to clipboard and displays Copied feedback", async ({ page }) => {
    await page.goto("/");

    const orreryCard = page.locator("article").filter({ hasText: "Orrery" });
    await expect(orreryCard).toBeVisible();

    const copyPromptBtn = orreryCard.getByRole("button", { name: /copy prompt/i });
    await expect(copyPromptBtn).toBeVisible();

    await copyPromptBtn.click();

    // Assert button feedback updates to "Copied prompt"
    const copiedPromptBtn = orreryCard.getByRole("button", { name: /copied prompt/i });
    await expect(copiedPromptBtn).toBeVisible();
    await expect(copiedPromptBtn).toHaveAttribute("data-copied", "true");

    // Assert clipboard contains the prompt markdown
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain("Orrery");
    expect(clipboardText).toContain("rebuild \"Orrery\"");
  });

  test("Download HTML saves standalone content and preserves the clipboard", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => navigator.clipboard.writeText("Keep my clipboard"));
    const card = page.locator("article").filter({ hasText: "ALPINE REEL" });
    const downloadPromise = page.waitForEvent("download");
    await card.getByRole("button", { name: "Download HTML", exact: true }).click();
    await expect(card.getByRole("button", { name: "Downloaded HTML", exact: true })).toBeVisible();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("alpine-reel.html");
    const { readFile } = await import("node:fs/promises");
    const html = await readFile((await download.path())!, "utf8");
    expect(html).toContain("<h1");
    expect(html).not.toContain("/_next/");
    expect(html).not.toContain("<base ");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("Keep my clipboard");
    await expect(page.locator("article").filter({ hasText: "Orrery" }).getByRole("button", { name: "Download HTML", exact: true })).toHaveCount(0);
  });

  test("category filter chips filter templates and update result counter", async ({ page }) => {
    await page.goto("/");

    // Initially all 43 templates are displayed
    await expect(page.locator("article")).toHaveCount(43);
    await expect(page.getByText("Showing 43 of 43 templates")).toBeVisible();

    // Click category chip "3D & WebGPU"
    const webgpuTab = page.getByRole("tab", { name: /3D & WebGPU/i });
    await expect(webgpuTab).toBeVisible();
    await webgpuTab.click();

    // Assert only 3D & WebGPU templates are visible (KŌJI, TRACE, VECTOR/90, Noctiluca, IRIDIA, ISOBAR, VOLUME ZERO, Cullet)
    await expect(page.locator("article")).toHaveCount(10);
    await expect(page.locator("article").filter({ hasText: "KŌJI" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "TRACE" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "VECTOR/90" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "Noctiluca" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "IRIDIA" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "ISOBAR" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "VOLUME ZERO" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "Orrery" })).toHaveCount(0);
    await expect(page.locator("article").filter({ hasText: "KEYTU" })).toHaveCount(0);

    // Counter updates to "Showing 10 of 43 templates"
    await expect(page.getByText("Showing 10 of 43 templates")).toBeVisible();

    // Click "Reset filters" button (aria-label="Reset category filters")
    const resetBtn = page.getByRole("button", { name: /reset category filters/i });
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // All 43 return
    await expect(page.locator("article")).toHaveCount(43);
    await expect(page.getByText("Showing 43 of 43 templates")).toBeVisible();

    // Also test clicking the "All" tab after filtering
    const keynoteTab = page.getByRole("tab", { name: /Keynote & Deck/i });
    await keynoteTab.click();
    await expect(page.locator("article")).toHaveCount(2);
    await expect(page.getByText("Showing 2 of 43 templates")).toBeVisible();

    // The editorial category holds WOWFLUTTER and SEREIN
    await page.getByRole("tab", { name: /Editorial Magazine/i }).click();
    await expect(page.locator("article")).toHaveCount(2);
    await expect(page.locator("article").filter({ hasText: "WOWFLUTTER" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "SEREIN Bureau" })).toBeVisible();

    const allTab = page.getByRole("tab", { name: /^All/i });
    await allTab.click();
    await expect(page.locator("article")).toHaveCount(43);
    await expect(page.getByText("Showing 43 of 43 templates")).toBeVisible();
  });

  test("mobile viewport at 375px has zero horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
});

test.describe("reduced motion behavior", () => {
  test.use({ reducedMotion: "reduce" });

  test("reduced motion suppresses hover video", async ({ page }) => {
    await page.goto("/");

    const kojiCard = page.locator("article").filter({ hasText: "KŌJI" });
    await expect(kojiCard).toBeVisible();

    const video = kojiCard.locator("video");
    // Under prefers-reduced-motion: reduce, TemplateCard suppresses video with motion-reduce:hidden
    await expect(video).toBeAttached();
    await expect(video).toBeHidden();

    // Trigger hover over the card
    await kojiCard.hover();

    // Assert video remains hidden and is not playing
    await expect(video).toBeHidden();
    const isPaused = await video.evaluate((el: HTMLVideoElement) => el.paused);
    expect(isPaused).toBe(true);
  });
});
