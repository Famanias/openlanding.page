/** Run against a production server: bunx tsx scripts/capture-gallery-previews.ts http://localhost:3100 */
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { TEMPLATES } from "../src/app/(index)/data/templates";

async function main() {
  const origin = new URL(process.argv[2] ?? "http://localhost:3100");
  if (!/^https?:$/.test(origin.protocol)) throw new Error("Use an HTTP(S) origin.");
  const output = path.resolve("public/gallery");
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch();
  let failed = false;
  try {
    for (const template of TEMPLATES) {
      const page = await browser.newPage({ viewport: { width: 880, height: 495 }, reducedMotion: template.slug === "xibalba" ? "no-preference" : "reduce" });
      try {
        const response = await page.goto(new URL(`/${template.slug}`, origin).href, { waitUntil: "networkidle" });
        if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
        // Use production pages so developer overlays never enter the captures.
        if (await page.locator("nextjs-portal").count()) throw new Error("Use next start instead of next dev.");
        await page.evaluate(async () => { await document.fonts.ready; });
        await page.waitForTimeout(template.slug === "xibalba" ? 8000 : 350);
        const capture = await page.screenshot();
        await sharp(capture).webp({ quality: 80 }).toFile(path.join(output, `${template.slug}.webp`));
        console.log(`Captured ${template.slug}`);
      } catch (error) {
        failed = true;
        console.error(`Failed to capture ${template.slug}:`, error);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  if (failed) process.exitCode = 1;
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
