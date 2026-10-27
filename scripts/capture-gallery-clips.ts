/**
 * Automated video preview capture for openlandingpage templates.
 * Records smooth programmatic scroll or interactive deck journeys using Playwright
 * and encodes to web-optimized MP4 with ffmpeg.
 *
 * Usage:
 *   bun run preview flori
 *   bun run preview flori, nulo, aftercart
 *   bun run preview flori nulo aftercart
 *   bun run preview all
 *   bun run preview --origin http://localhost:3000 flori
 */

import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TEMPLATES } from "../src/app/(index)/data/templates";

export interface ParsedCliArgs {
  origin: URL;
  requestedSlugs: string[];
  unknownSlugs: string[];
  isAll: boolean;
}

/**
 * Parses CLI arguments supporting single slugs, comma-separated lists,
 * space-separated lists, and optional --origin URL.
 */
export function parseCliArgs(rawArgs: string[], validSlugs: string[] = []): ParsedCliArgs {
  let originStr = "http://localhost:3000";
  const rawTokens: string[] = [];

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === "--origin" && rawArgs[i + 1]) {
      originStr = rawArgs[++i];
    } else if (arg.startsWith("--origin=")) {
      originStr = arg.split("=")[1];
    } else if (arg.startsWith("http://") || arg.startsWith("https://")) {
      originStr = arg;
    } else {
      rawTokens.push(arg);
    }
  }

  // Normalize tokens by splitting on commas and whitespace, removing empties
  const cleanedTokens = rawTokens
    .join(" ")
    .split(/[,\s]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const isAll = cleanedTokens.includes("all");
  const validSet = new Set(validSlugs.map((s) => s.toLowerCase()));

  const requestedSlugs: string[] = [];
  const unknownSlugs: string[] = [];

  if (isAll) {
    requestedSlugs.push(...validSlugs);
  } else {
    for (const token of cleanedTokens) {
      if (validSet.size === 0 || validSet.has(token)) {
        if (!requestedSlugs.includes(token)) {
          requestedSlugs.push(token);
        }
      } else {
        if (!unknownSlugs.includes(token)) {
          unknownSlugs.push(token);
        }
      }
    }
  }

  return {
    origin: new URL(originStr),
    requestedSlugs,
    unknownSlugs,
    isAll,
  };
}

/**
 * Checks if the dev server at the given origin is responsive.
 */
export async function checkServer(origin: URL): Promise<boolean> {
  try {
    const res = await fetch(origin.href, { signal: AbortSignal.timeout(3000) });
    return res.status < 500;
  } catch {
    return false;
  }
}

/**
 * Synchronizes templates.ts with public/gallery/clips/*.mp4 so newly captured
 * preview clips immediately display on gallery cards.
 */
export function syncTemplatesConfig(
  templatesFilePath = path.resolve("src/app/(index)/data/templates.ts"),
  clipsDir = path.resolve("public/gallery/clips")
): { activeSlugs: string[]; missingSlugs: string[] } {
  if (!existsSync(templatesFilePath) || !existsSync(clipsDir)) {
    return { activeSlugs: [], missingSlugs: [] };
  }

  const content = readFileSync(templatesFilePath, "utf8");

  // Determine which templates have valid .mp4 files on disk
  const existingClips = new Set(
    readdirSync(clipsDir)
      .filter((file) => file.endsWith(".mp4"))
      .map((file) => file.replace(/\.mp4$/, ""))
  );

  // Read all slugs from RAW_TEMPLATES in templates.ts
  const slugMatches = Array.from(content.matchAll(/slug:\s*"([^"]+)"/g)).map((m) => m[1]);
  const uniqueSlugs = Array.from(new Set(slugMatches));

  const activeSlugs = uniqueSlugs.filter((slug) => existingClips.has(slug));
  const missingSlugs = uniqueSlugs.filter((slug) => !existingClips.has(slug));

  let replacement: string;
  if (missingSlugs.length === 0) {
    replacement = `videoClip: template.videoClip ?? \`/gallery/clips/\${template.slug}.mp4\`,`;
  } else {
    const conditions = missingSlugs.map((s) => `template.slug === "${s}"`).join(" || ");
    replacement = `videoClip: template.videoClip ?? (${conditions} ? undefined : \`/gallery/clips/\${template.slug}.mp4\`),`;
  }

  const targetPattern = /videoClip:\s*(?:template\.videoClip\s*\?\?|\([^)]*\)\s*\?\s*undefined\s*:\s*template\.videoClip\s*\?\?)[^,]+,/;

  if (targetPattern.test(content)) {
    const updatedContent = content.replace(targetPattern, replacement);
    if (updatedContent !== content) {
      writeFileSync(templatesFilePath, updatedContent, "utf8");
    }
  } else {
    console.warn("Could not find videoClip pattern in templates.ts to synchronize.");
  }

  return { activeSlugs, missingSlugs };
}

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

export async function captureGalleryClips(rawArgs: string[]): Promise<void> {
  const validSlugs = TEMPLATES.map((t) => t.slug);
  const parsed = parseCliArgs(rawArgs, validSlugs);

  if (parsed.unknownSlugs.length > 0) {
    console.warn(`\n⚠️  Warning: Unknown template slug(s): ${parsed.unknownSlugs.join(", ")}`);
  }

  if (parsed.requestedSlugs.length === 0) {
    const clipsDir = path.resolve("public/gallery/clips");
    const existingClips = existsSync(clipsDir)
      ? new Set(readdirSync(clipsDir).filter((f) => f.endsWith(".mp4")).map((f) => f.replace(/\.mp4$/, "")))
      : new Set<string>();
    const missing = validSlugs.filter((s) => !existingClips.has(s));

    console.log(`\nUsage: bun run preview <template-slug> [...]`);
    console.log(`Examples:`);
    console.log(`  bun run preview flori`);
    console.log(`  bun run preview flori, nulo, aftercart`);
    console.log(`  bun run preview all`);
    if (missing.length > 0) {
      console.log(`\nTemplates missing video previews (${missing.length}): ${missing.join(", ")}`);
    } else {
      console.log(`\nAll ${validSlugs.length} templates currently have video previews!`);
    }
    return;
  }

  // Check if dev server is up
  const isServerRunning = await checkServer(parsed.origin);
  if (!isServerRunning) {
    console.error(`\n❌ Error: Dev server is not responding at ${parsed.origin.origin}`);
    console.error(`Please start your local server in another terminal first:`);
    console.error(`  bun run dev\n`);
    process.exit(1);
  }

  const outputDir = path.resolve("public/gallery/clips");
  const stagingDir = path.resolve("public/gallery/clips/.staging");

  mkdirSync(outputDir, { recursive: true });
  mkdirSync(stagingDir, { recursive: true });

  const templatesToProcess = TEMPLATES.filter((t) => parsed.requestedSlugs.includes(t.slug));

  console.log(`\n🎬 Starting video preview capture for ${templatesToProcess.length} template(s) against ${parsed.origin.origin}...`);

  const browser = await chromium.launch({ headless: true });
  let hasFailures = false;
  const completed: string[] = [];

  try {
    for (let index = 0; index < templatesToProcess.length; index++) {
      const template = templatesToProcess[index];
      const countLabel = `[${index + 1}/${templatesToProcess.length}]`;
      console.log(`\n${countLabel} Recording preview for ${template.title} (${template.slug})...`);

      const context = await browser.newContext({
        viewport: { width: 1440, height: 810 },
        recordVideo: {
          dir: stagingDir,
          size: { width: 1280, height: 720 },
        },
      });

      const page = await context.newPage();

      try {
        const targetUrl = new URL(`/${template.slug}`, parsed.origin).href;
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
          // Alpine Reel loop: Wait for cinematic sweep, advance peaks, return to Everest
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
          // Standard full top-to-bottom (header to footer, then back to header) loop
          await page.waitForTimeout(1000);

          const totalDistance = (await page.evaluate(
            "Math.max(0, document.documentElement.scrollHeight - window.innerHeight)"
          )) as number;

          if (totalDistance > 80) {
            await page.evaluate(`
              new Promise((resolve) => {
                document.documentElement.style.scrollBehavior = 'auto';
                document.body.style.scrollBehavior = 'auto';

                const getFullDistance = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
                let distance = Math.max(${totalDistance}, getFullDistance());
                const speed = 0.6; // 600 px/s constant velocity
                const bottomHold = 800; // Hold at the footer

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

            await page.waitForTimeout(300);
          } else {
            await page.waitForTimeout(1500);
            await page.keyboard.press("ArrowDown").catch(() => {});
            await page.waitForTimeout(2000);
            await page.keyboard.press("ArrowUp").catch(() => {});
            await page.waitForTimeout(1500);
          }
        }

        await page.close();
        const video = page.video();
        const rawWebmPath = await video?.path();

        if (!rawWebmPath || !existsSync(rawWebmPath)) {
          throw new Error("Playwright did not output a video file");
        }

        const finalMp4Path = path.join(outputDir, `${template.slug}.mp4`);

        // Transcode with ffmpeg into web-optimized H.264 MP4
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

        try {
          unlinkSync(rawWebmPath);
        } catch {}

        completed.push(template.slug);
        console.log(`  ✓ Saved: public/gallery/clips/${template.slug}.mp4`);
      } catch (err) {
        hasFailures = true;
        console.error(`  ✗ Error recording ${template.slug}:`, err);
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

  // Automatically wire generated clips into templates.ts
  if (completed.length > 0) {
    const { activeSlugs, missingSlugs } = syncTemplatesConfig();
    console.log(`\n⚡ Synchronized gallery template data:`);
    console.log(`   ${activeSlugs.length} templates with active video previews in gallery.`);
    if (missingSlugs.length > 0) {
      console.log(`   ${missingSlugs.length} remaining without clips: ${missingSlugs.join(", ")}`);
    }
  }

  if (hasFailures) {
    process.exitCode = 1;
  } else {
    console.log(`\n🎉 All ${completed.length} requested video preview(s) captured successfully!`);
  }
}

// Execute when run directly via CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  void captureGalleryClips(process.argv.slice(2)).catch((err) => {
    console.error("Fatal error in preview script:", err);
    process.exit(1);
  });
}
