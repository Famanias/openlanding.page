'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { DESERT_PALETTE, hexToRgba } from '../utils/desertPalette';
import {
  drawDryBrushStroke,
  renderSunPigmentReveal,
} from '../utils/brushTextures';
import {
  LAYER_CANVAS_H,
  LAYER_CANVAS_SCALE,
  LAYER_CANVAS_W,
  SCENE_BLEED_X,
  SCENE_BLEED_Y,
  createSeededRandom,
} from '../utils/sceneLayout';
import type { RevealableLayerHandle } from '../systems/PaintingRevealTimeline';

interface DesertSunProps {
  sunWashRef: React.RefObject<HTMLDivElement | null>;
  hazeOpacity: number;
}

export const DesertSun = React.memo(
  forwardRef<RevealableLayerHandle, DesertSunProps>(
    ({ sunWashRef, hazeOpacity }, ref) => {
      const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
      const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
      const veilSvgRef = useRef<SVGSVGElement | null>(null);
      const hazeOpacityRef = useRef<number>(hazeOpacity);
      const lastProgressRef = useRef<number>(-1);
      const pendingProgressRef = useRef<number>(1);

      const renderToDisplay = useCallback((progress: number) => {
        const display = displayCanvasRef.current;
        const source = sourceCanvasRef.current;
        if (!display || !source) {
          pendingProgressRef.current = progress;
          return;
        }
        const quantized = progress <= 0.002 ? 0 : progress >= 0.998 ? 1 : progress;
        if (Math.abs(quantized - lastProgressRef.current) < 0.004) return;
        lastProgressRef.current = quantized;

        const ctx = display.getContext('2d');
        if (!ctx) return;

        renderSunPigmentReveal(
          ctx,
          source,
          quantized,
          LAYER_CANVAS_SCALE,
          SCENE_BLEED_X,
          SCENE_BLEED_Y
        );

        if (veilSvgRef.current) {
          veilSvgRef.current.style.opacity = String(
            Math.min(1, 0.78 * hazeOpacityRef.current * quantized)
          );
        }
      }, []);

      useImperativeHandle(
        ref,
        () => ({
          applyReveal: renderToDisplay,
        }),
        [renderToDisplay]
      );

      useEffect(() => {
        // Pre-render the rich matte gouache sun disc onto a cached offscreen bitmap ONCE
        const source = document.createElement('canvas');
        source.width = LAYER_CANVAS_W;
        source.height = LAYER_CANVAS_H;
        const ctx = source.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, LAYER_CANVAS_W, LAYER_CANVAS_H);
        ctx.save();
        ctx.scale(LAYER_CANVAS_SCALE, LAYER_CANVAS_SCALE);
        ctx.translate(SCENE_BLEED_X, SCENE_BLEED_Y);

        const cx = 468;
        const cy = 486;
        const r = 166;
        const rand = createSeededRandom(31415);

        // Subtle warm paper diffusion around the sun
        const halo = ctx.createRadialGradient(cx, cy, r * 0.82, cx, cy, r * 1.42);
        halo.addColorStop(0, hexToRgba('#E7C88E', 0.2));
        halo.addColorStop(0.55, hexToRgba('#EFE0C4', 0.08));
        halo.addColorStop(1, hexToRgba('#F3E9DA', 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.42, 0, Math.PI * 2);
        ctx.fill();

        // Smooth organic matte gouache sun disc
        ctx.save();
        ctx.beginPath();
        const steps = 180;
        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const microTooth =
            Math.sin(angle * 5 + 0.4) * 0.7 +
            Math.cos(angle * 11 - 0.9) * 0.45 +
            (rand() - 0.5) * 0.35;
          const rr = r + microTooth;
          const px = cx + Math.cos(angle) * rr;
          const py = cy + Math.sin(angle) * rr;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const discGrad = ctx.createLinearGradient(
          cx - r * 0.25,
          cy - r,
          cx + r * 0.15,
          cy + r
        );
        discGrad.addColorStop(0, '#E3B970');
        discGrad.addColorStop(0.42, DESERT_PALETTE.sunMid);
        discGrad.addColorStop(0.72, '#DFBE86');
        discGrad.addColorStop(1, '#E6CFA9');
        ctx.fillStyle = discGrad;
        ctx.fill();

        ctx.clip();

        // Soft cloudy pigment blooms inside the sun
        for (let i = 0; i < 14; i++) {
          const bx = cx + (rand() - 0.5) * r * 1.6;
          const by = cy + (rand() - 0.5) * r * 1.6;
          const br = 45 + rand() * 75;
          const g = ctx.createRadialGradient(bx, by, 4, bx, by, br);
          const col = by > cy + 25 ? '#EFE0CA' : '#D5A75E';
          g.addColorStop(0, hexToRgba(col, by > cy + 25 ? 0.22 : 0.12));
          g.addColorStop(1, hexToRgba(col, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fill();
        }

        // Delicate curved misty dry-brush veil cutting gently across the lower sun
        drawDryBrushStroke(
          ctx,
          [
            [cx - r - 30, cy + 72],
            [cx - 20, cy + 44],
            [cx + r + 30, cy + 8],
          ],
          {
            width: 68,
            color: '#EFE4D3',
            secondaryColor: '#E8D5C1',
            opacity: 0.45,
            bristles: 20,
            dryness: 0.55,
            taperStart: 0.2,
            taperEnd: 0.2,
            seed: 4211,
          }
        );

        // Soft atmospheric dissolution along the bottom third of the sun
        const lowerFade = ctx.createLinearGradient(
          cx,
          cy + 15,
          cx + 10,
          cy + r + 15
        );
        lowerFade.addColorStop(0, hexToRgba('#F3E9DA', 0));
        lowerFade.addColorStop(0.55, hexToRgba('#ECDBC6', 0.48));
        lowerFade.addColorStop(1, hexToRgba('#E3CBB5', 0.78));
        ctx.fillStyle = lowerFade;
        ctx.fillRect(cx - r - 12, cy, r * 2 + 24, r + 24);

        ctx.restore();
        ctx.restore();

        sourceCanvasRef.current = source;
        lastProgressRef.current = -1;
        renderToDisplay(pendingProgressRef.current);
      }, [renderToDisplay]);

      // Keep veil opacity synced when hazeOpacity changes after reveal completes
      useEffect(() => {
        hazeOpacityRef.current = hazeOpacity;
        if (veilSvgRef.current && lastProgressRef.current >= 0) {
          veilSvgRef.current.style.opacity = String(
            Math.min(1, 0.78 * hazeOpacity * lastProgressRef.current)
          );
        }
      }, [hazeOpacity]);

      return (
        <div
          className="pointer-events-none absolute inset-0"
          data-layer="desert-sun"
          aria-hidden="true"
        >
          <div
            ref={sunWashRef}
            className="solstice-ambient-layer absolute inset-0 origin-[27%_45%]"
          >
            <canvas
              ref={displayCanvasRef}
              width={LAYER_CANVAS_W}
              height={LAYER_CANVAS_H}
              className="h-full w-full"
            />
          </div>

          <svg
            ref={veilSvgRef}
            viewBox="-140 -90 2200 1260"
            className="absolute inset-0 h-full w-full transition-opacity duration-300"
            style={{ opacity: 0 }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="solstice-sun-veil"
                x1="0%"
                y1="74%"
                x2="72%"
                y2="24%"
              >
                <stop offset="0%" stopColor="#F4EBDD" stopOpacity="0.58" />
                <stop offset="48%" stopColor="#EFE2D0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#F4EBDD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M -130 705 C 160 610, 480 515, 790 420 C 1020 350, 1180 285, 1310 245 L 1310 385 C 1060 465, 760 565, 420 675 C 190 750, 10 805, -130 845 Z"
              fill="url(#solstice-sun-veil)"
            />
          </svg>
        </div>
      );
    }
  )
);

DesertSun.displayName = 'DesertSun';
