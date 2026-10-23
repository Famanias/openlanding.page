/**
 * Automated video preview capture for openlandingpage templates.
 * Records smooth programmatic scroll using Playwright and encodes to web-optimized MP4 with ffmpeg.
 *
 * Usage:
 *   npx tsx scripts/capture-gallery-clips.ts [origin] [slug]
 * Examples:
 *   npx tsx scripts/capture-gallery-clips.ts http://localhost:3000 orrery
 *   npx tsx scripts/capture-gallery-clips.ts http://localhost:3000
 */

import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync, unlinkSync } from "node:fs";
import path from "node:path";
import { TEMPLATES } from "../src/app/(index)/data/templates";

const encodeFfmpeg = (args: string[]): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"], windowsHide: true });
    let stderr = "";
    child.stderr.on("data", (data: Buffer) => {
      stderr += data.toString();
    });
    child.on("error", (err) => reject(new Error(`ffmpeg execution error: ${err.message}`)));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg failed (exit ${code}): ${stderr.slice(-1000)}`));
    });
  });

async function main() {
  const args = process.argv.slice(2);
  let originStr = "http://localhost:3100";
  let targetSlug: string | undefined;

  for (const arg of args) {
    if (arg.startsWith("http://") || arg.startsWith("https://")) {
      originStr = arg;
    } else {
      targetSlug = arg;
    }
  }

  const origin = new URL(originStr);
  const outputDir = path.resolve("public/gallery/clips");
  const stagingDir = path.resolve("public/gallery/clips/.staging");

  mkdirSync(outputDir, { recursive: true });
  mkdirSync(stagingDir, { recursive: true });

  const templatesToProcess = targetSlug
    ? TEMPLATES.filter((t) => t.slug === targetSlug)
    : TEMPLATES;

  if (templatesToProcess.length === 0) {
    console.error(`No template found matching slug: ${targetSlug}`);
    process.exit(1);
  }

  console.log(`Starting automated video preview capture (${templatesToProcess.length} template(s)) against ${origin.origin}...`);

  const browser = await chromium.launch({ headless: true });
  let hasFailures = false;

  try {
    for (const template of templatesToProcess) {
      console.log(`Recording preview for ${template.slug}...`);
      const context = await browser.newContext({
        viewport: { width: 960, height: 600 },
        recordVideo: {
          dir: stagingDir,
          size: { width: 960, height: 600 },
        },
      });

      const page = await context.newPage();

      try {
        const targetUrl = new URL(`/${template.slug}`, origin).href;
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 25000 });
        await page.evaluate(async () => {
          await document.fonts?.ready;
        });

        // 1. Initial pause at top so hero entrance animations play
        await page.waitForTimeout(500);

        // 2. Smoothly scroll down the page driven from Node so Playwright's video recorder captures frames
        const totalHeight = await page.evaluate(() =>
          Math.min(document.documentElement.scrollHeight - window.innerHeight, 3000)
        );

        if (totalHeight > 80) {
          const steps = 30;
          const stepDelay = 50; // 30 * 50ms = 1.5 seconds smooth travel
          for (let i = 1; i <= steps; i++) {
            const progress = i / steps;
            const ease =
              progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            await page.evaluate((y) => window.scrollTo(0, y), Math.round(ease * totalHeight));
            await page.waitForTimeout(stepDelay);
          }
        } else {
          // If page doesn't scroll (keynote/deck), capture ambient motion
          await page.waitForTimeout(1800);
        }

        // 3. Short hold at the bottom of the scroll
        await page.waitForTimeout(300);

        // 4. Close page to finalize Playwright's recorded webm
        await page.close();
        const video = page.video();
        const rawWebmPath = await video?.path();

        if (!rawWebmPath || !existsSync(rawWebmPath)) {
          throw new Error("Playwright did not output a video file");
        }

        const finalMp4Path = path.join(outputDir, `${template.slug}.mp4`);

        // 5. Transcode with ffmpeg into web-optimized H.264 MP4
        await encodeFfmpeg([
          "-hide_banner",
          "-loglevel", "error",
          "-nostdin",
          "-y",
          "-i", rawWebmPath,
          "-an",
          "-c:v", "libx264",
          "-preset", "veryfast",
          "-crf", "24",
          "-pix_fmt", "yuv420p",
          "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
          "-movflags", "+faststart",
          finalMp4Path,
        ]);

        // Clean up temporary webm file
        try {
          unlinkSync(rawWebmPath);
        } catch {}

        console.log(`✓ Saved ${finalMp4Path}`);
      } catch (err) {
        hasFailures = true;
        console.error(`✗ Error recording ${template.slug}:`, err);
        try {
          await page.close();
        } catch {}
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
    try {
      rmSync(stagingDir, { recursive: true, force: true });
    } catch {}
  }

  if (hasFailures) {
    process.exitCode = 1;
  } else {
    console.log("All requested video previews captured successfully!");
  }
}

void main().catch((err) => {
  console.error("Fatal error in capture script:", err);
  process.exitCode = 1;
});
