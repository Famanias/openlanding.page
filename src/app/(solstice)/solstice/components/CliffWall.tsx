'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { DESERT_PALETTE } from '../utils/desertPalette';
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
} from '../utils/sceneLayout';
import {
  LAYER_REVEAL_STROKES,
  type RevealableLayerHandle,
} from '../systems/PaintingRevealTimeline';

export const CliffWall = React.memo(
  forwardRef<RevealableLayerHandle>((_, ref) => {
    const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const lastProgressRef = useRef<number>(-1);
    const pendingProgressRef = useRef<number>(1);

    const renderToDisplay = (progress: number) => {
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

      renderDirectionalBrushReveal(
        ctx,
        source,
        LAYER_REVEAL_STROKES.cliffWall,
        quantized,
        LAYER_CANVAS_SCALE,
        SCENE_BLEED_X,
        SCENE_BLEED_Y
      );
    };

    useImperativeHandle(ref, () => ({
      applyReveal: renderToDisplay,
    }));

    useEffect(() => {
      const source = document.createElement('canvas');
      source.width = LAYER_CANVAS_W;
      source.height = LAYER_CANVAS_H;
      const ctx = source.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, LAYER_CANVAS_W, LAYER_CANVAS_H);
      ctx.save();
      ctx.scale(LAYER_CANVAS_SCALE, LAYER_CANVAS_SCALE);
      ctx.translate(SCENE_BLEED_X, SCENE_BLEED_Y);

      // 1. Continuous monolith backing + rear mesa tower
      drawPaintedMass(
        ctx,
        [
          [1308, -90],
          [1635, -90],
          [1610, 560],
          [1315, 560],
          [1248, 412],
          [1272, 344],
          [1296, 286],
          [1288, 224],
          [1306, 152],
          [1298, 72],
          [1312, 0],
        ],
        {
          baseTopColor: '#DFB38D',
          baseBottomColor: '#BE734C',
          strokeColor: '#AC6040',
          highlightColor: '#EED2B7',
          shadowColor: '#6D3729',
          strataAngleDeg: 87,
          strokeDensity: 34,
          dryness: 0.46,
          seed: 2101,
          fringeEdgeColor: '#B56B49',
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1338, -75],
          [1330, 115],
          [1326, 265],
          [1312, 375],
        ],
        {
          width: 36,
          color: '#EBC9AB',
          secondaryColor: '#D69A73',
          opacity: 0.74,
          bristles: 22,
          dryness: 0.52,
          seed: 2129,
        }
      );

      // 2. Towering foreground right cliff mass
      drawPaintedMass(
        ctx,
        [
          [1535, -90],
          [2060, -90],
          [2060, 585],
          [1415, 595],
          [1445, 455],
          [1495, 315],
          [1528, 175],
          [1552, 42],
        ],
        {
          baseTopColor: '#D18158',
          baseBottomColor: DESERT_PALETTE.terracottaDeep,
          strokeColor: '#984A31',
          highlightColor: '#E6B48C',
          shadowColor: '#48251F',
          strataAngleDeg: 103,
          strokeDensity: 46,
          dryness: 0.46,
          seed: 2309,
          fringeEdgeColor: '#5B3027',
        }
      );

      // 3. Dramatic vertical charcoal-umber fissure chasm
      drawPaintedMass(
        ctx,
        [
          [1435, -90],
          [1585, -90],
          [1550, 145],
          [1505, 315],
          [1455, 455],
          [1352, 558],
          [1315, 515],
          [1392, 360],
          [1432, 205],
          [1426, 55],
        ],
        {
          baseTopColor: '#3B2320',
          baseBottomColor: '#291715',
          strokeColor: '#4A2B26',
          highlightColor: '#7A5144',
          shadowColor: '#1E100F',
          strataAngleDeg: 103,
          strokeDensity: 26,
          dryness: 0.44,
          seed: 2203,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1515, 210],
          [1448, 385],
          [1362, 520],
          [1275, 610],
        ],
        {
          width: 56,
          color: '#341D1A',
          secondaryColor: '#5B352D',
          opacity: 0.75,
          bristles: 24,
          dryness: 0.56,
          taperEnd: 0.36,
          seed: 2221,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1466, -75],
          [1464, 52],
          [1458, 142],
        ],
        {
          width: 11,
          color: '#F3E7D6',
          secondaryColor: '#E5CAAE',
          opacity: 0.8,
          bristles: 9,
          dryness: 0.56,
          taperEnd: 0.38,
          seed: 2237,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1618, -75],
          [1582, 130],
          [1522, 345],
          [1455, 505],
        ],
        {
          width: 56,
          color: '#E8BA92',
          secondaryColor: '#D49168',
          opacity: 0.8,
          bristles: 24,
          dryness: 0.48,
          taperEnd: 0.28,
          seed: 2341,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1845, -75],
          [1795, 115],
          [1715, 295],
          [1630, 415],
        ],
        {
          width: 48,
          color: '#43231E',
          secondaryColor: '#773D2D',
          opacity: 0.88,
          bristles: 22,
          dryness: 0.5,
          seed: 2383,
        }
      );

      drawPaintedMass(
        ctx,
        [
          [1818, 215],
          [1940, 135],
          [2060, 115],
          [2060, 462],
          [1708, 505],
          [1758, 360],
        ],
        {
          baseTopColor: '#482721',
          baseBottomColor: '#271513',
          strokeColor: '#371E1A',
          highlightColor: '#8B4A37',
          shadowColor: '#1E100E',
          strataAngleDeg: 112,
          strokeDensity: 26,
          dryness: 0.46,
          seed: 2417,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1395, 545],
          [1640, 468],
          [1880, 405],
          [2048, 382],
        ],
        {
          width: 58,
          color: '#2F1916',
          secondaryColor: '#5B3128',
          opacity: 0.92,
          bristles: 26,
          dryness: 0.5,
          taperStart: 0.16,
          taperEnd: 0.08,
          seed: 2459,
        }
      );

      // 4. Lower-right layered canyon shelves
      drawPaintedMass(
        ctx,
        [
          [1340, 560],
          [1660, 468],
          [2060, 425],
          [2060, 855],
          [1175, 855],
          [1235, 725],
          [1300, 652],
        ],
        {
          baseTopColor: '#D48F68',
          baseBottomColor: '#9C4C33',
          strokeColor: '#89442F',
          highlightColor: '#E6BA96',
          shadowColor: '#3B201C',
          strataAngleDeg: -10,
          strokeDensity: 46,
          dryness: 0.44,
          seed: 2521,
          fringeEdgeColor: '#4A2821',
        }
      );

      const lowerCliffBands: Array<{
        points: Array<[number, number]>;
        lightYOffset: number;
        width: number;
        seed: number;
      }> = [
        {
          points: [
            [1375, 565],
            [1680, 505],
            [2050, 455],
          ],
          lightYOffset: -16,
          width: 36,
          seed: 2601,
        },
        {
          points: [
            [1308, 635],
            [1640, 575],
            [2050, 520],
          ],
          lightYOffset: -18,
          width: 42,
          seed: 2633,
        },
        {
          points: [
            [1245, 708],
            [1590, 648],
            [2050, 590],
          ],
          lightYOffset: -18,
          width: 46,
          seed: 2663,
        },
        {
          points: [
            [1205, 772],
            [1545, 720],
            [2050, 668],
          ],
          lightYOffset: -16,
          width: 40,
          seed: 2693,
        },
      ];

      for (const band of lowerCliffBands) {
        drawDryBrushStroke(
          ctx,
          band.points.map(([x, y]) => [x, y + band.lightYOffset]),
          {
            width: band.width * 0.56,
            color: '#E6BD9B',
            secondaryColor: '#D69972',
            opacity: 0.86,
            bristles: 20,
            dryness: 0.44,
            taperStart: 0.16,
            seed: band.seed,
          }
        );

        drawDryBrushStroke(ctx, band.points, {
          width: band.width,
          color: '#341D1A',
          secondaryColor: '#693528',
          opacity: 0.88,
          bristles: 24,
          dryness: 0.48,
          taperStart: 0.2,
          seed: band.seed + 7,
        });
      }

      ctx.restore();

      sourceCanvasRef.current = source;
      lastProgressRef.current = -1;
      renderToDisplay(pendingProgressRef.current);
    }, []);

    return (
      <div
        className="pointer-events-none absolute inset-0"
        data-layer="cliff-wall"
        aria-hidden="true"
      >
        <canvas
          ref={displayCanvasRef}
          width={LAYER_CANVAS_W}
          height={LAYER_CANVAS_H}
          className="h-full w-full"
        />
      </div>
    );
  })
);

CliffWall.displayName = 'CliffWall';
