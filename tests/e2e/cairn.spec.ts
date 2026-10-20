import { test, expect, type Page } from "@playwright/test";

async function scrollToChapters(page: Page, where: "top" | "bottom") {
  await page.evaluate((w) => {
    const chapters = document.querySelector<HTMLElement>("[data-chapters]")!;
    const top = chapters.getBoundingClientRect().top + window.scrollY;
    const y = w === "top" ? top - window.innerHeight : top + chapters.offsetHeight;
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }, where);
  await page.waitForTimeout(400);
}

test.describe("Cairn ascent", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("the meter reads base camp at the start and the summit at the end", async ({ page }) => {
    await page.goto("/cairn");
    await scrollToChapters(page, "top");
    await expect(page.getByTestId("altitude-readout")).toHaveText("5,000 M");
    await scrollToChapters(page, "bottom");
    await expect(page.getByTestId("altitude-readout")).toHaveText("8,611 M");
    await expect(page.getByTestId("active-camp")).toHaveText("Summit");
  });
});

test.describe("Cairn reload mid-climb", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("reloading halfway down restores a matching readout and camp", async ({ page }) => {
    await page.goto("/cairn");
    await page.evaluate(() => {
      const chapters = document.querySelector<HTMLElement>("[data-chapters]")!;
      const top = chapters.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + chapters.offsetHeight * 0.5, behavior: "instant" as ScrollBehavior });
    });
    await page.waitForTimeout(300);
    await page.reload();
    await page.waitForTimeout(800);
    const expected = await page.evaluate(() => {
      // The camp whose chapter top has passed the underside of the top bar.
      const line = 68.5;
      const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-camp]"));
      const reached = chapters.filter((c) => c.getBoundingClientRect().top <= line);
      return { name: reached.at(-1)?.dataset.campName ?? "", scrollY: window.scrollY };
    });
    expect(expected.scrollY).toBeGreaterThan(1000);
    await expect(page.getByTestId("active-camp")).toHaveText(new RegExp(`^${expected.name}$`, "i"));
  });
});

test.describe("Cairn shell showcase", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("the colourway swatches switch the hero image from the keyboard", async ({ page }) => {
    await page.goto("/cairn#c3");
    const group = page.getByRole("radiogroup", { name: /colourway/i });
    await group.getByRole("radio", { name: "Black" }).focus();
    await page.keyboard.press("ArrowRight"); // navy
    await page.keyboard.press("ArrowRight"); // white
    await expect(group.getByRole("radio", { name: "White" })).toBeChecked();
    await expect(page.getByTestId("colourway-image").locator("[data-asset]").last()).toHaveAttribute(
      "data-asset",
      "product-shell-white",
    );
  });

  test("the shell's spec sheet lists its waterproof rating", async ({ page }) => {
    await page.goto("/cairn#c3");
    const sheet = page.getByRole("group", { name: "Summit Shell 3L specifications" });
    await expect(sheet.getByText("28,000 mm", { exact: true })).toBeVisible();
  });
});

test.describe("Cairn summit", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("a lookbook hotspot reveals the product it marks", async ({ page }) => {
    await page.goto("/cairn#summit");
    const first = page.getByTestId("lookbook").getByRole("button", { name: /^Show / }).first();
    const productName = (await first.getAttribute("aria-label"))!.replace(/^Show /, "");
    await first.click();
    await expect(page.getByTestId("lookbook").getByRole("heading", { name: productName })).toBeVisible();
  });

  test("a valid signup shows the success state without a network request", async ({ page }) => {
    await page.goto("/cairn#summit");
    const requests: string[] = [];
    await page.getByLabel("Email").fill("climber@cairn.equipment");
    page.on("request", (r) => {
      if (!/\.(woff2?|png|webp|avif|svg|css|js)(\?|$)/.test(r.url())) requests.push(r.url());
    });
    await page.getByRole("button", { name: "Join the expedition list" }).click();
    await expect(page.getByText("You're on the list.")).toBeVisible();
    expect(requests).toEqual([]);
  });
});

// ─── Final-review fixes ───
test.describe("Cairn screen-reader announcements", () => {
  test("the altitude number is not a live region; only the camp name is", async ({ page }) => {
    await page.goto("/cairn");
    await expect(page.getByTestId("altitude-readout")).not.toHaveAttribute("aria-live", /.+/);
    await expect(page.getByTestId("active-camp")).toHaveAttribute("aria-live", "polite");
  });
});

test.describe("Cairn lookbook drag", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("a mouse drag moves the strip with the pointer", async ({ page }) => {
    await page.goto("/cairn#summit");
    const track = page.locator(".crn-lookbook__track");
    const box = (await track.boundingBox())!;
    const y = box.y + box.height * 0.9; // below the hotspots
    await page.mouse.move(box.x + box.width * 0.7, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.7 - 120, y, { steps: 6 });
    const mid = await track.evaluate((t) => t.scrollLeft);
    await page.mouse.up();
    expect(mid).toBeGreaterThan(80);
  });
});
