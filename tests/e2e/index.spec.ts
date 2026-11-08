import { test, expect } from "@playwright/test";
import {TEMPLATES,getTemplateCategories} from "../../src/app/(index)/data/templates";

test.describe("openlandingpage gallery index", () => {
  test("index lists representative templates with valid links to live sites", async ({ page }) => {
    await page.goto("/");

    const expectedTemplates = [
      { name: "Orrery", href: "/templates/orrery", model: "Claude Opus 5.5 High" },
      { name: "KEYTU", href: "/templates/keytu", model: "Claude Opus 5.5 High" },
      { name: "KŌJI", href: "/templates/koji", model: "Claude Opus 5.5 High" },
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
    const pending = TEMPLATES.filter(template => !template.hasDownload);
    await expect(page.locator('button[aria-label="Download HTML"][disabled]')).toHaveCount(pending.length);
    if (pending.length) {
      const pendingDownload = page.locator("article").filter({has:page.locator(`h3 a[href="/templates/${pending[0].slug}"]`)}).getByRole("button",{name:"Download HTML",exact:true});
      await expect(pendingDownload).toHaveAttribute("title","HTML coming soon");
    }
  });

  test("category filter chips filter templates and update result counter", async ({page}) => {
    await page.goto("/");
    const total=TEMPLATES.length;
    await expect(page.locator("article")).toHaveCount(total);
    await expect(page.getByText(`Showing ${total} of ${total} templates`)).toBeVisible();
    for(const [category,label] of [["3d",/^3D/],["deck",/^Deck/],["editorial",/^Editorial/]] as const){
      await page.getByRole("tab",{name:label}).click();
      const expected=TEMPLATES.filter(template=>getTemplateCategories(template).includes(category));
      await expect(page.locator("article")).toHaveCount(expected.length);
      await expect(page.getByText(`Showing ${expected.length} of ${total} templates`)).toBeVisible();
      await expect(page.locator(`article h3 a[href="/templates/${expected[0].slug}"]`)).toBeVisible();
      await page.getByRole("button",{name:/reset category filters/i}).click();
      await expect(page.locator("article")).toHaveCount(total);
    }
    await page.getByRole("tab",{name:/^3D/}).click();
    await page.getByRole("tab",{name:/^All/}).click();
    await expect(page.locator("article")).toHaveCount(total);
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

  test("reduced motion keeps still previews stable on hover",async({page})=>{
    await page.goto("/");
    const card=page.locator("article").filter({has:page.locator('h3 a[href="/templates/koji"]')});
    const image=card.locator("img");
    const source=await image.getAttribute("src");
    await card.hover();
    await expect(card.locator("video")).toHaveCount(0);
    await expect(image).toHaveAttribute("src",source!);
    await expect(image).toBeVisible();
  });
});
