// Visual-review helper: node scripts/screenshots.mjs <path> <outDir> [hash,hash,...]
// Expects a production server on http://localhost:3100 (npm run build && npm run start -- -p 3100).
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const [, , path = "/", outDir = "artifacts", hashList = ""] = process.argv;
const hashes = hashList ? hashList.split(",") : [""];
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 375, height: 812 }],
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: name === "mobile" ? 2 : 1 });
  for (const hash of hashes) {
    await page.goto(`http://localhost:3100${path}${hash ? `#${hash}` : ""}`, { waitUntil: "networkidle" });
    if (name === "mobile" && hash) await page.locator(`#${hash}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(2600);
    const file = `${outDir}/${name}-${hash || "top"}.png`;
    await page.screenshot({ path: file, fullPage: false });
    console.log(file);
  }
  await page.close();
}
await browser.close();
