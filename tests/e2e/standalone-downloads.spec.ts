import { test, expect } from "@playwright/test";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { STANDALONE_SLUGS } from "../../scripts/standalone/config";
import { TEMPLATES } from "../../src/app/(index)/data/templates";

async function sha256(file: string) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}

// Export eligibility does not publish a gallery download. Test only enabled buttons.
for (const slug of STANDALONE_SLUGS.filter(slug => TEMPLATES.some(template => template.slug === slug && template.hasDownload))) {
  test(`${slug}: gallery downloads the verified standalone document`, async ({ page }) => {
    // Embedded video exports approach 90 MB; allow their native download to finish.
    test.setTimeout(120_000);
    const template = TEMPLATES.find(item => item.slug === slug)!;
    await page.goto("/");
    await page.getByRole("searchbox").fill(template.title);
    const card = page.locator("article").filter({ has: page.locator(`h3 a[href="/templates/${slug}"]`) });
    const button = card.getByRole("button", { name: "Download HTML", exact: true });
    await expect(button).toBeEnabled();
    const event = page.waitForEvent("download");
    await button.click();
    const download = await event;
    expect(download.suggestedFilename()).toBe(`${slug}.html`);
    const [downloadHash, publicHash] = await Promise.all([
      sha256((await download.path())!),
      sha256(`public/downloads/${slug}.html`),
    ]);
    expect(downloadHash).toBe(publicHash);
  });
}
