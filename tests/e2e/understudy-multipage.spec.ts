import { expect, test } from "@playwright/test";

test.describe("Understudy multi-page expansion", () => {
  test("top masthead navigates across all 5 studio pages and dynamic CMS part detail", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto("/templates/understudy/parts");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Every part in the/);
    const maxPropSize = await page.locator("svg.us-card-prop").evaluateAll((els) =>
      Math.max(...els.map((e) => Math.max(e.getBoundingClientRect().width, e.getBoundingClientRect().height)))
    );
    expect(maxPropSize).toBeLessThanOrEqual(40);

    // Filter by Design + search for Figma
    await page.getByRole("group", { name: "Filter parts by field" }).getByRole("button", { name: "Design" }).click();
    await page.getByLabel("Search parts by role, tool, or studio").fill("Figma");
    await expect(page.getByText("Showing 1 of 10 studio parts")).toBeVisible();

    // Open CMS Part detail page
    await page.getByRole("link", { name: /Full brief/ }).click();
    await expect(page).toHaveURL(/\/templates\/understudy\/parts\/product-designer/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Product Designer");

    // Dock audition button pre-selects part from CMS detail page
    await page.getByRole("button", { name: /Rehearse this part/ }).click();
    const sheet = page.getByRole("dialog", { name: "Book your first call time." });
    await expect(sheet).toHaveAttribute("data-open", "true");
    await expect(sheet.getByLabel("The part")).toHaveValue("product-designer");
    await page.keyboard.press("Escape");

    // Visit Method, Casting, Tuition via TopBar links
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Method" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Learn the part");
    await page.getByLabel("Search questions").fill("89");
    await expect(page.getByText("How much does it cost?")).toBeVisible();

    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Casting" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("You rehearse.");
    await page.getByRole("group", { name: "Filter companies by sector" }).getByRole("button", { name: "Fintech" }).click();
    await expect(page.getByText("Halcyon Bank")).toBeVisible();

    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Tuition" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Built to get you");
    await expect(page.getByRole("heading", { name: "$89 / mo" })).toBeVisible();

    expect(errors).toEqual([]);
  });

  for (const [width, height] of [[768, 1024], [390, 844]]) {
    test(`subpages have zero horizontal overflow at ${width}x${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      for (const route of ["/templates/understudy/parts", "/templates/understudy/parts/ai-engineer", "/templates/understudy/method", "/templates/understudy/casting", "/templates/understudy/tuition"]) {
        await page.goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `overflow on ${route}`).toBeLessThanOrEqual(0);
      }
    });
  }
});
