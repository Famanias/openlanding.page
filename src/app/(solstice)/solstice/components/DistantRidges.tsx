'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { DESERT_PALETTE, hexToRgba } from '../utils/desertPalette';
import {
  drawDryBrushStroke,
  drawPaintedMass,
  renderDirectionalBrushReveal,
} from '../utils/brushTextures';
import {
  LAYER_CANVAS_H,
  LAYER_CANVAS_SCALE,
  LAYER_CANVAS_W,
  SCENE_BLEED_X,
  SCENE_BLEED_Y,
  createSeededRandom,
} from '../utils/sceneLayout';
import {
  LAYER_REVEAL_STROKES,
  type RevealableLayerHandle,
} from '../systems/PaintingRevealTimeline';

interface DistantRidgesProps {
  cloudWashRef: React.RefObject<HTMLDivElement | null>;
  hazeOpacity: number;
}

function drawSoftCloudSweep(
  ctx: CanvasRenderingContext2D,
  points: Array<[number, number]>,
  color: string,
  baseRadius: number,
  opacity: number,
  angleDeg: number,
  seed: number
) {
  const rand = createSeededRandom(seed);
  const rad = (angleDeg * Math.PI) / 180;

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const puffs = Math.max(6, Math.ceil(dist / 38));

    for (let s = 0; s <= puffs; s++) {
      const f = s / puffs;
      const globalT = (i + f) / (points.length - 1);
      const env = Math.sin(Math.PI * Math.pow(globalT, 0.85));
      const rx = x0 + (x1 - x0) * f + (rand() - 0.5) * 28;
      const ry = y0 + (y1 - y0) * f + (rand() - 0.5) * 24;
      const rMajor = baseRadius * (1.2 + rand() * 0.75) * (0.45 + 0.65 * env);
      const rMinor = baseRadius * (0.34 + rand() * 0.22) * (0.45 + 0.65 * env);
      const puffAlpha = opacity * (0.35 + rand() * 0.55) * (0.3 + 0.7 * env);

      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(rad + (rand() - 0.5) * 0.12);
      ctx.scale(1, rMinor / rMajor);

      const g = ctx.createRadialGradient(0, 0, rMajor * 0.08, 0, 0, rMajor);
      g.addColorStop(0, hexToRgba(color, puffAlpha));
      g.addColorStop(0.55, hexToRgba(color, puffAlpha * 0.45));
      g.addColorStop(1, hexToRgba(color, 0));

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, rMajor, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

export const DistantRidges = React.memo(
  forwardRef<RevealableLayerHandle, DistantRidgesProps>(
    ({ cloudWashRef, hazeOpacity }, ref) => {
      const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
      const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
      const lastProgressRef = useRef<number>(-1);
      const pendingProgressRef = useRef<number>(1);

      const renderToDisplay = (progress: number) => {
        const disp = displayCanvasRef.current;
        const src = sourceCanvasRef.current;
        if (!disp || !src) {
          pendingProgressRef.current = progress;
          return;
        }
        const quantized = progress <= 0.002 ? 0 : progress >= 0.998 ? 1 : progress;
        if (Math.abs(quantized - lastProgressRef.current) < 0.004) return;
        lastProgressRef.current = quantized;

        const ctx = disp.getContext('2d');
        if (ctx) {
          renderDirectionalBrushReveal(
            ctx,
            src,
            LAYER_REVEAL_STROKES.distantRidges,
            quantized,
            LAYER_CANVAS_SCALE,
            SCENE_BLEED_X,
            SCENE_BLEED_Y
          );
        }
      };

      useImperativeHandle(ref, () => ({
        applyReveal: renderToDisplay,
      }));

      useEffect(() => {
        const src = document.createElement('canvas');
        src.width = LAYER_CANVAS_W;
        src.height = LAYER_CANVAS_H;
        const wctx = src.getContext('2d');
        if (wctx) {
          wctx.save();
          wctx.scale(LAYER_CANVAS_SCALE, LAYER_CANVAS_SCALE);
          wctx.translate(SCENE_BLEED_X, SCENE_BLEED_Y);

          drawSoftCloudSweep(
            wctx,
            [
              [-90, 680],
              [240, 565],
              [620, 445],
              [980, 325],
              [1285, 225],
            ],
            '#D9B89F',
            125,
            0.14,
            -21,
            701
          );
          drawSoftCloudSweep(
            wctx,
            [
              [-110, 775],
              [190, 668],
              [545, 572],
              [860, 448],
              [1185, 295],
            ],
            '#CFA88D',
            148,
            0.17,
            -22,
            733
          );
          drawSoftCloudSweep(
            wctx,
            [
              [-60, 725],
              [265, 610],
              [585, 512],
              [910, 398],
            ],
            DESERT_PALETTE.chalkCream,
            92,
            0.22,
            -20,
            769
          );
          drawDryBrushStroke(
            wctx,
            [
              [18, 635],
              [230, 558],
              [520, 472],
              [880, 355],
              [1215, 240],
            ],
            {
              width: 34,
              color: '#D5B298',
              secondaryColor: '#E7D1BE',
              opacity: 0.22,
              bristles: 16,
              dryness: 0.72,
              taperStart: 0.25,
              taperEnd: 0.35,
              seed: 811,
            }
          );
          drawSoftCloudSweep(
            wctx,
            [
              [-110, 860],
              [160, 765],
              [440, 690],
              [725, 610],
            ],
            '#DFC4AE',
            110,
            0.16,
            -18,
            853
          );
          drawPaintedMass(
            wctx,
            [
              [560, 720],
              [740, 628],
              [910, 585],
              [1090, 495],
              [1270, 395],
              [1380, 405],
              [1360, 725],
              [560, 755],
            ],
            {
              baseTopColor: '#E7CBB4',
              baseBottomColor: '#D6AE91',
              strokeColor: '#CA9B7B',
              highlightColor: '#F0DEC9',
              shadowColor: '#B88467',
              strataAngleDeg: -10,
              strokeDensity: 18,
              dryness: 0.62,
              seed: 912,
            }
          );

          drawSoftCloudSweep(
            wctx,
            [
              [-90, 940],
              [220, 830],
              [520, 755],
              [820, 705],
            ],
            '#E3C7B0',
            115,
            0.2,
            -16,
            947
          );
          wctx.restore();
        }

        sourceCanvasRef.current = src;
        lastProgressRef.current = -1;
        renderToDisplay(pendingProgressRef.current);
      }, []);

      return (
        <div
          className="pointer-events-none absolute inset-0"
          data-layer="distant-ridges"
          aria-hidden="true"
        >
          <div
            ref={cloudWashRef}
            className="solstice-ambient-layer absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: Math.min(1.15, Math.max(0.28, hazeOpacity)),
            }}
          >
            <canvas
              ref={displayCanvasRef}
              width={LAYER_CANVAS_W}
              height={LAYER_CANVAS_H}
              className="h-full w-full"
            />
          </div>
        </div>
      );
    }
  )
);

DistantRidges.displayName = 'DistantRidges';
