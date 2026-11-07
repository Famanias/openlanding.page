import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { STANDALONE_SLUGS } from "../../scripts/standalone/config";
import { TEMPLATES } from "../../src/app/(index)/data/templates";

for (const slug of STANDALONE_SLUGS) {
  test(`${slug}: gallery downloads the verified standalone document`, async ({ page }) => {
    const template = TEMPLATES.find(item => item.slug === slug)!;
    await page.goto("/");
    await page.getByRole("searchbox").fill(template.title);
    const card = page.locator("article").filter({ has: page.locator(`h3 a[href="/${slug}"]`) });
    const button = card.getByRole("button", { name: "Download HTML", exact: true });
    await expect(button).toBeEnabled();
    const event = page.waitForEvent("download");
    await button.click();
    const download = await event;
    expect(download.suggestedFilename()).toBe(`${slug}.html`);
    expect(await fs.readFile((await download.path())!, "utf8")).toBe(await fs.readFile(`public/downloads/${slug}.html`, "utf8"));
  });
}
