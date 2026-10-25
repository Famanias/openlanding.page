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
  let originStr = "http://localhost:3000";
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
        viewport: { width: 1440, height: 810 },
        recordVideo: {
          dir: stagingDir,
          size: { width: 1280, height: 720 },
        },
      });

      const page = await context.newPage();

      try {
        const targetUrl = new URL(`/${template.slug}`, origin).href;
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 25000 });
        await page.evaluate("document.fonts ? document.fonts.ready : Promise.resolve()");

        if (template.slug === "orrery") {
          // Orrery Keynote deck loop: Slide 1 -> Slide 2 -> Slide 3 -> Slide 2 -> Slide 1
          await page.waitForTimeout(2500);
          await page.keyboard.press("ArrowDown").catch(() => {});
          await page.waitForTimeout(2800);
          await page.keyboard.press("ArrowDown").catch(() => {});
          await page.waitForTimeout(2800);
          await page.keyboard.press("ArrowUp").catch(() => {});
          await page.waitForTimeout(1800);
          await page.keyboard.press("ArrowUp").catch(() => {});
          await page.waitForTimeout(2500);
        } else if (template.slug === "wowflutter") {
          // Wowflutter Book reader loop: Cover -> turn spread -> return to Cover
          await page.waitForTimeout(2500);
          await page.keyboard.press("ArrowRight").catch(() => {});
          await page.waitForTimeout(3000);
          await page.keyboard.press("ArrowLeft").catch(() => {});
          await page.waitForTimeout(2500);
        } else if (template.slug === "alpine-reel") {
          // Alpine Reel loop: Wait for cinematic fast-forward sweep to settle on Everest (~3.5s),
          // advance through peaks (K2, Kangchenjunga), then step back to Everest
          await page.waitForTimeout(3600);
          await page.keyboard.press("ArrowRight").catch(() => {});
          await page.waitForTimeout(2800);
          await page.keyboard.press("ArrowRight").catch(() => {});
          await page.waitForTimeout(2800);
          await page.keyboard.press("ArrowLeft").catch(() => {});
          await page.waitForTimeout(1800);
          await page.keyboard.press("ArrowLeft").catch(() => {});
          await page.waitForTimeout(2500);
        } else if (template.slug === "satoyama") {
          // Satoyama picture book loop: Welcome -> Landscape -> Rhythm -> Landscape -> Welcome
          await page.waitForTimeout(2400);
          await page.keyboard.press("ArrowRight").catch(() => {});
          await page.waitForTimeout(2800);
          await page.keyboard.press("ArrowRight").catch(() => {});
          await page.waitForTimeout(2800);
          await page.keyboard.press("ArrowLeft").catch(() => {});
          await page.waitForTimeout(1800);
          await page.keyboard.press("ArrowLeft").catch(() => {});
          await page.waitForTimeout(2400);
        } else {
          // Full top-to-bottom (header to footer, then back to header) loop
          // 1. Initial pause at top so header and hero entrance animations play
          await page.waitForTimeout(1000);

          // Get the exact full scroll distance to reach the footer
          const totalDistance = (await page.evaluate(
            "Math.max(0, document.documentElement.scrollHeight - window.innerHeight)"
          )) as number;

          if (totalDistance > 80) {
            // Constant 600 px/s scroll: from header all the way to footer, hold, then back to header
            await page.evaluate(`
              new Promise((resolve) => {
                document.documentElement.style.scrollBehavior = 'auto';
                document.body.style.scrollBehavior = 'auto';

                const getFullDistance = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
                let distance = Math.max(${totalDistance}, getFullDistance());
                const speed = 0.6; // 600 px/s = 0.6 px/ms constant velocity
                const bottomHold = 800; // Hold at the footer so footer/CTA is clearly seen

                const t0 = performance.now();
                const stepDown = (now) => {
                  distance = Math.max(distance, getFullDistance());
                  const elapsed = now - t0;
                  const currentY = Math.min(distance, Math.round(elapsed * speed));
                  window.scrollTo(0, currentY);
                  if (currentY < distance) {
                    requestAnimationFrame(stepDown);
                  } else {
                    const finalBottom = window.scrollY;
                    // Hold at footer
                    setTimeout(() => {
                      const t1 = performance.now();
                      const stepUp = (nowUp) => {
                        const elapsedUp = nowUp - t1;
                        const returnY = Math.max(0, Math.round(finalBottom - elapsedUp * speed));
                        window.scrollTo(0, returnY);
                        if (returnY > 0) {
                          requestAnimationFrame(stepUp);
                        } else {
                          window.scrollTo(0, 0);
                          resolve();
                        }
                      };
                      requestAnimationFrame(stepUp);
                    }, bottomHold);
                  }
                };
                requestAnimationFrame(stepDown);
              })
            `);

            // Short hold at the header before ending
            await page.waitForTimeout(300);
          } else {
            // Deck fallback: advance slide then return to Slide 1
            await page.waitForTimeout(1500);
            await page.keyboard.press("ArrowDown").catch(() => {});
            await page.waitForTimeout(2000);
            await page.keyboard.press("ArrowUp").catch(() => {});
            await page.waitForTimeout(1500);
          }
        }

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
