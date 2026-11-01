'use client';

import React, { useEffect, useRef } from 'react';
import {
  PALETTE,
  PARALLAX_RATIOS,
  WORLD_TOTAL_WIDTH,
  scrollProgressToWorldX,
  interpolateSkyPalette,
  getTerrainHeightAtX,
  lerpHexColor,
} from '../../lib/world/worldMap';
import { drawPipSpriteToCanvas } from '../sprites/PixelArtSprites';

interface WorldCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  discoveredArtifactsCount: number;
  miniGameCompleted: boolean;
}

/**
 * Continuous 2D Pixel-Art Side-Scrolling World Renderer.
 * - Single scene renderer using native Canvas 2D with nearest-neighbor quantization.
 * - Correlates vertical document scroll with horizontal camera X translation across 6 acts.
 * - Respects prefers-reduced-motion and ResizeObserver without React re-renders on scroll frames.
 */
export const WorldCanvas: React.FC<WorldCanvasProps> = ({
  scrollProgressRef,
  reducedMotion,
  discoveredArtifactsCount,
  miniGameCompleted,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotionRef = useRef(reducedMotion);
  const discoveredRef = useRef(discoveredArtifactsCount);
  const miniGameRef = useRef(miniGameCompleted);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    discoveredRef.current = discoveredArtifactsCount;
  }, [discoveredArtifactsCount]);

  useEffect(() => {
    miniGameRef.current = miniGameCompleted;
  }, [miniGameCompleted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const PIXEL = 4; // Logical 4px grid unit for crisp 16-bit aesthetic

    const updateDimensions = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = false;
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(document.documentElement);

    let rafId = 0;
    let lastProgress = scrollProgressRef.current;
    let walkActivityTimer = 0;
    let facingDir: 'left' | 'right' = 'right';
    let smoothedWorldX = scrollProgressToWorldX(scrollProgressRef.current);

    const snap = (val: number) => Math.floor(val / PIXEL) * PIXEL;

    const drawPixelGear = (
      cx: number,
      cy: number,
      radius: number,
      angleRad: number,
      fillHex: string,
      coreHex: string
    ) => {
      ctx.fillStyle = fillHex;
      const r = snap(radius);
      ctx.fillRect(snap(cx - r), snap(cy - r * 0.65), snap(r * 2), snap(r * 1.3));
      ctx.fillRect(snap(cx - r * 0.65), snap(cy - r), snap(r * 1.3), snap(r * 2));

      // 8 rotating teeth stepped to pixel grid
      for (let i = 0; i < 8; i++) {
        const a = angleRad + (i * Math.PI) / 4;
        const tx = snap(cx + Math.cos(a) * (r + PIXEL * 2));
        const ty = snap(cy + Math.sin(a) * (r + PIXEL * 2));
        ctx.fillRect(tx - PIXEL * 2, ty - PIXEL * 2, PIXEL * 4, PIXEL * 4);
      }

      // Inner hub
      ctx.fillStyle = coreHex;
      ctx.fillRect(snap(cx - r * 0.35), snap(cy - r * 0.35), snap(r * 0.7), snap(r * 0.7));
    };

    const renderFrame = (timestamp: number) => {
      const progress = scrollProgressRef.current;
      const targetWorldX = scrollProgressToWorldX(progress);
      const isReduced = reducedMotionRef.current;

      if (isReduced) {
        smoothedWorldX = targetWorldX;
      } else {
        smoothedWorldX += (targetWorldX - smoothedWorldX) * 0.22;
      }

      const deltaProgress = progress - lastProgress;
      if (Math.abs(deltaProgress) > 0.0004) {
        walkActivityTimer = 0.25;
        facingDir = deltaProgress >= 0 ? 'right' : 'left';
      } else {
        walkActivityTimer = Math.max(0, walkActivityTimer - 0.016);
      }
      lastProgress = progress;

      // Discrete sprite frame clock (6 steps per second)
      const spriteTick = isReduced ? 0 : Math.floor(timestamp / 180);

      // 1. CONTINUOUS SKY & HORIZON BANDS (Zero vertical/horizontal section seams)
      const skyColors = interpolateSkyPalette(smoothedWorldX);
      const skyBands = 10;
      const bandHeight = Math.ceil(height / skyBands / PIXEL) * PIXEL;

      for (let b = 0; b < skyBands; b++) {
        const t = b / (skyBands - 1);
        const bandColor =
          t < 0.7
            ? lerpHexColor(skyColors.skyTop, skyColors.skyBottom, t / 0.7)
            : lerpHexColor(skyColors.skyBottom, skyColors.horizonGlow, (t - 0.7) / 0.3);
        ctx.fillStyle = bandColor;
        ctx.fillRect(0, b * bandHeight, width, bandHeight + PIXEL);
      }

      const baselineY = snap(height * 0.87);

      // 2. FAR SKY LAYER (0.15x Parallax) — Sun/Moon Orb, Stars, Pixel Clouds
      const skyOffset = snap(smoothedWorldX * PARALLAX_RATIOS.farSky);
      const sunX = snap(width * 0.72 - (skyOffset % (width * 1.4)) + width * 0.3);
      const sunY = snap(height * 0.18);

      // Stepped Pixel Sun Disk in Golden Nectar & Daylight Cream
      ctx.fillStyle = 'rgba(255, 208, 106, 0.28)';
      ctx.fillRect(sunX - PIXEL * 16, sunY - PIXEL * 12, PIXEL * 32, PIXEL * 24);
      ctx.fillRect(sunX - PIXEL * 12, sunY - PIXEL * 16, PIXEL * 24, PIXEL * 32);
      ctx.fillStyle = PALETTE.goldenNectar;
      ctx.fillRect(sunX - PIXEL * 10, sunY - PIXEL * 8, PIXEL * 20, PIXEL * 16);
      ctx.fillRect(sunX - PIXEL * 8, sunY - PIXEL * 10, PIXEL * 16, PIXEL * 20);
      ctx.fillStyle = PALETTE.daylightCream;
      ctx.fillRect(sunX - PIXEL * 6, sunY - PIXEL * 6, PIXEL * 12, PIXEL * 12);

      // Drifting Original Stepped Clouds
      const cloudDrift = isReduced ? 0 : snap((timestamp * 0.012) % 1200);
      for (let i = 0; i < 9; i++) {
        const cx =
          snap(((i * 340 - skyOffset + cloudDrift) % (width + 420)) + (width + 420)) %
            (width + 420) -
          210;
        const cy = snap(height * 0.11 + (i % 3) * 44);
        const cw = (14 + (i % 3) * 6) * PIXEL;
        ctx.fillStyle = i % 2 === 0 ? PALETTE.daylightCream : PALETTE.goldenNectar;
        ctx.fillRect(cx, cy, cw, PIXEL * 3);
        ctx.fillRect(cx + PIXEL * 2, cy - PIXEL * 2, cw - PIXEL * 4, PIXEL * 2);
      }

      // 3. DISTANT MOUNTAINS LAYER (0.30x Parallax) — Mulberry Shadow & Twilight Indigo Peaks
      const mountainOffset = snap(smoothedWorldX * PARALLAX_RATIOS.mountains);
      for (let m = -1; m < Math.ceil(width / 240) + 2; m++) {
        const worldPeakIndex = Math.floor((mountainOffset + m * 240) / 240);
        const mx = snap(m * 240 - (mountainOffset % 240));
        const peakHeight = snap(120 + ((Math.abs(worldPeakIndex * 73) % 5) * 28));
        const steps = Math.floor(peakHeight / (PIXEL * 3));

        ctx.fillStyle =
          Math.abs(worldPeakIndex) % 2 === 0 ? PALETTE.mulberryShadow : PALETTE.twilightIndigo;
        for (let s = 0; s < steps; s++) {
          const stepY = baselineY - peakHeight + s * PIXEL * 3;
          const halfSpan = (s + 2) * PIXEL * 3;
          ctx.fillRect(mx + 120 - halfSpan, stepY, halfSpan * 2, PIXEL * 3);
        }
      }

      // 4. MIDGROUND WORLD LANDMARKS (0.58x Parallax) — Act-Specific Connected Scenery
      const midOffset = snap(smoothedWorldX * PARALLAX_RATIOS.midground);

      // Act 0 Midground: Daybreak Stone Archway & Hanging Vines (worldX ~ 0..700)
      const archScreenX = snap(520 - midOffset);
      if (archScreenX > -320 && archScreenX < width + 320) {
        ctx.fillStyle = PALETTE.mulberryShadow;
        ctx.fillRect(archScreenX, baselineY - 168, PIXEL * 8, 168);
        ctx.fillRect(archScreenX + PIXEL * 24, baselineY - 168, PIXEL * 8, 168);
        ctx.fillRect(archScreenX - PIXEL * 3, baselineY - 184, PIXEL * 38, PIXEL * 5);
        ctx.fillStyle = PALETTE.fernForest;
        ctx.fillRect(archScreenX + PIXEL * 2, baselineY - 180, PIXEL * 12, PIXEL * 8);
        ctx.fillRect(archScreenX + PIXEL * 24, baselineY - 156, PIXEL * 4, PIXEL * 18);
      }

      // Act 1 Midground: Oversized Round-Leaf Enchanted Trees & Teal Streams (worldX ~ 600..1500)
      for (let t = 0; t < 7; t++) {
        const treeX = snap(640 + t * 145 - midOffset);
        if (treeX > -200 && treeX < width + 200) {
          const trunkH = 96 + (t % 3) * 24;
          ctx.fillStyle = PALETTE.twilightIndigo;
          ctx.fillRect(treeX + PIXEL * 7, baselineY - trunkH, PIXEL * 5, trunkH);
          ctx.fillStyle = PALETTE.fernForest;
          ctx.fillRect(treeX, baselineY - trunkH - PIXEL * 12, PIXEL * 19, PIXEL * 14);
          ctx.fillRect(treeX + PIXEL * 3, baselineY - trunkH - PIXEL * 16, PIXEL * 13, PIXEL * 4);
          ctx.fillStyle = t % 2 === 0 ? PALETTE.goldenNectar : PALETTE.lagoonMist;
          ctx.fillRect(treeX + PIXEL * 4, baselineY - trunkH - PIXEL * 16, PIXEL * 11, PIXEL * 2);
        }
      }

      // Act 2 Midground: Crystal Lake Shimmering Geometric Reflections (worldX ~ 1150..1850)
      const lakeStartX = snap(1120 - midOffset);
      const lakeWidth = snap(720);
      if (lakeStartX + lakeWidth > -100 && lakeStartX < width + 100) {
        ctx.fillStyle = PALETTE.lagoonMist;
        ctx.fillRect(lakeStartX, baselineY - PIXEL * 3, lakeWidth, PIXEL * 18);

        for (let r = 0; r < 14; r++) {
          const rx = snap(lakeStartX + 36 + r * 48);
          const ry = snap(baselineY + ((r + spriteTick) % 3) * PIXEL * 3);
          ctx.fillStyle = (r + spriteTick) % 2 === 0 ? PALETTE.daylightCream : PALETTE.goldenNectar;
          ctx.fillRect(rx, ry, PIXEL * 5, PIXEL);
          ctx.fillRect(rx + PIXEL, ry - PIXEL, PIXEL * 3, PIXEL * 3);
        }
      }

      // Act 3 Midground: Clockwork Ridge Rotating Brass Gears & Mechanical Lift (worldX ~ 1700..2400)
      const ridgeBaseX = snap(1820 - midOffset);
      if (ridgeBaseX > -400 && ridgeBaseX < width + 400) {
        const gearAngle = isReduced ? 0 : (timestamp * 0.0012) % (Math.PI * 2);
        drawPixelGear(
          ridgeBaseX + 120,
          baselineY - 92,
          36,
          gearAngle,
          PALETTE.goldenNectar,
          PALETTE.twilightIndigo
        );
        drawPixelGear(
          ridgeBaseX + 196,
          baselineY - 56,
          26,
          -gearAngle * 1.3,
          PALETTE.coralBloom,
          PALETTE.twilightIndigo
        );
        drawPixelGear(
          ridgeBaseX + 270,
          baselineY - 116,
          42,
          gearAngle * 0.8,
          PALETTE.mulberryShadow,
          PALETTE.goldenNectar
        );

        ctx.fillStyle = PALETTE.twilightIndigo;
        ctx.fillRect(ridgeBaseX + 340, baselineY - 180, PIXEL * 3, 180);
        ctx.fillRect(ridgeBaseX + 384, baselineY - 180, PIXEL * 3, 180);
        const liftProgress = Math.max(0, Math.min(1, (smoothedWorldX - 3000) / 900));
        const liftY = snap(baselineY - 32 - liftProgress * 110);
        ctx.fillStyle = PALETTE.goldenNectar;
        ctx.fillRect(ridgeBaseX + 332, liftY, 68, PIXEL * 3);
      }

      // Act 4 Midground: Cloud City Floating Platforms & Wind Currents (worldX ~ 2350..3000)
      const cloudCityX = snap(2420 - midOffset);
      if (cloudCityX > -400 && cloudCityX < width + 400) {
        for (let c = 0; c < 5; c++) {
          const platX = snap(cloudCityX + c * 115);
          const platY = snap(baselineY - 76 - (c % 3) * 34);
          ctx.fillStyle = PALETTE.daylightCream;
          ctx.fillRect(platX, platY, PIXEL * 18, PIXEL * 4);
          ctx.fillStyle = PALETTE.lagoonMist;
          ctx.fillRect(platX + PIXEL * 2, platY + PIXEL * 4, PIXEL * 14, PIXEL * 2);
        }
      }

      // Act 5 Midground: The Last Gate Luminous Chamber Pillars (worldX ~ 2950..3600)
      const gateX = snap(3120 - midOffset);
      if (gateX > -400 && gateX < width + 400) {
        ctx.fillStyle = PALETTE.goldenNectar;
        ctx.fillRect(gateX, baselineY - 210, PIXEL * 7, 210);
        ctx.fillRect(gateX + 180, baselineY - 210, PIXEL * 7, 210);
        ctx.fillRect(gateX - 16, baselineY - 226, 240, PIXEL * 5);
        ctx.fillStyle = 'rgba(255, 241, 211, 0.16)';
        ctx.fillRect(gateX + 28, 0, 152, baselineY);
      }

      // 5. WALKABLE GROUND & FOREGROUND PATH (0.85x Parallax)
      const groundScroll = snap(smoothedWorldX * PARALLAX_RATIOS.walkableGround);
      const tileStride = PIXEL * 8;
      const cols = Math.ceil(width / tileStride) + 3;

      for (let col = -1; col < cols; col++) {
        const screenX = snap(col * tileStride - (groundScroll % tileStride));
        const tileWorldX =
          ((screenX - width * 0.5) / PARALLAX_RATIOS.walkableGround) + smoothedWorldX;
        const elev = getTerrainHeightAtX(tileWorldX);
        const topY = snap(baselineY - elev);

        const isLake = tileWorldX >= 2050 && tileWorldX <= 2900;
        const isSanctuary = tileWorldX >= 5000;

        ctx.fillStyle = isSanctuary
          ? PALETTE.goldenNectar
          : isLake
          ? PALETTE.lagoonMist
          : PALETTE.fernForest;
        ctx.fillRect(screenX, topY, tileStride, PIXEL * 3);

        ctx.fillStyle = PALETTE.twilightIndigo;
        ctx.fillRect(screenX, topY + PIXEL * 3, tileStride, height - topY);

        ctx.fillStyle = PALETTE.mulberryShadow;
        ctx.fillRect(
          screenX + PIXEL * 2,
          topY + PIXEL * ((Math.abs(col) % 2) * 3 + 5),
          PIXEL * 4,
          PIXEL * 2
        );
      }

      // 6. PIP THE MAPMAKER ON THE CENTER-BOTTOM SCENIC TRAIL
      const pipScreenX = snap(width * 0.52);
      const pipElev = getTerrainHeightAtX(smoothedWorldX);
      const pipFeetY = snap(baselineY - pipElev);
      const pipPose: 'idle' | 'walk' | 'jump' | 'celebrate' =
        smoothedWorldX >= 5400 || miniGameRef.current
          ? 'celebrate'
          : walkActivityTimer > 0.02
          ? 'walk'
          : 'idle';

      drawPipSpriteToCanvas(
        ctx,
        pipScreenX - 21,
        pipFeetY - 46,
        3,
        pipPose,
        spriteTick,
        facingDir
      );

      // Trail Milepost Sign beside Pip in Act 0
      const signX = snap(pipScreenX + 64 - groundScroll * 0.35);
      if (signX > -60 && signX < width + 60) {
        ctx.fillStyle = PALETTE.goldenNectar;
        ctx.fillRect(signX + PIXEL * 3, baselineY - 36, PIXEL * 2, 36);
        ctx.fillStyle = PALETTE.coralBloom;
        ctx.fillRect(signX, baselineY - 48, PIXEL * 10, PIXEL * 4);
      }

      // 7. FOREGROUND FOLIAGE SILHOUETTES (1.0x Parallax)
      const fgOffset = snap(smoothedWorldX * PARALLAX_RATIOS.foreground);
      for (let f = 0; f < 8; f++) {
        const fx =
          snap(((f * 420 - fgOffset) % (width + 420)) + (width + 420)) % (width + 420) - 120;
        const fy = height - PIXEL * 6;
        ctx.fillStyle = PALETTE.fernForest;
        ctx.fillRect(fx, fy, PIXEL * 14, PIXEL * 6);
        ctx.fillRect(fx + PIXEL * 3, fy - PIXEL * 3, PIXEL * 8, PIXEL * 3);
      }

      // Software-friendly frame scheduling: fast when scrolling, relaxed 12fps sprite cadence when idle
      const isScrolling = Math.abs(targetWorldX - smoothedWorldX) > 1 || walkActivityTimer > 0;
      const delayMs = isReduced ? 250 : isScrolling ? 16 : 90;
      timerId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(renderFrame);
      }, delayMs);
    };

    let timerId = 0;
    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [scrollProgressRef]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      data-testid="world-canvas-container"
    >
      <canvas ref={canvasRef} className="w-full h-full block ww-pixelated pixelated" />
      {/* Subtle atmospheric vignette leaving the pixel landscape vivid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(35,36,79,0.32) 0%, rgba(35,36,79,0.12) 55%, rgba(35,36,79,0.42) 100%)',
        }}
      />
    </div>
  );
};
