'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { DESERT_PALETTE, hexToRgba } from '../utils/desertPalette';
import {
  drawDryBrushStroke,
  drawGouacheWash,
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

export const CanyonLayers = React.memo(
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
        LAYER_REVEAL_STROKES.canyonMid,
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

      // 1. Upper-mid stepped canyon strata
      drawPaintedMass(
        ctx,
        [
          [605, 690],
          [695, 646],
          [808, 632],
          [842, 578],
          [948, 566],
          [978, 514],
          [1082, 488],
          [1112, 444],
          [1202, 412],
          [1235, 382],
          [1415, 365],
          [1520, 585],
          [1340, 810],
          [580, 810],
        ],
        {
          baseTopColor: '#D99E77',
          baseBottomColor: DESERT_PALETTE.terracotta,
          strokeColor: '#A95639',
          highlightColor: '#E9C6A6',
          shadowColor: '#6B3528',
          strataAngleDeg: -3,
          strokeDensity: 36,
          dryness: 0.48,
          seed: 1201,
          fringeEdgeColor: '#A25337',
        }
      );

      const strataShelves: Array<{
        x1: number;
        x2: number;
        y: number;
        thickness: number;
        tilt: number;
        seed: number;
      }> = [
        { x1: 1120, x2: 1380, y: 446, thickness: 18, tilt: -6, seed: 1301 },
        { x1: 1030, x2: 1360, y: 492, thickness: 22, tilt: -4, seed: 1317 },
        { x1: 940, x2: 1355, y: 538, thickness: 26, tilt: -3, seed: 1331 },
        { x1: 830, x2: 1335, y: 586, thickness: 30, tilt: -2, seed: 1357 },
        { x1: 710, x2: 1280, y: 636, thickness: 32, tilt: -1, seed: 1381 },
        { x1: 635, x2: 1215, y: 682, thickness: 28, tilt: 1, seed: 1409 },
      ];

      for (const shelf of strataShelves) {
        drawDryBrushStroke(
          ctx,
          [
            [shelf.x1, shelf.y],
            [(shelf.x1 + shelf.x2) * 0.5, shelf.y + shelf.tilt * 0.5],
            [shelf.x2, shelf.y + shelf.tilt],
          ],
          {
            width: shelf.thickness * 0.55,
            color: '#EBCBAE',
            secondaryColor: '#DFB695',
            opacity: 0.86,
            bristles: 18,
            dryness: 0.44,
            taperStart: 0.18,
            taperEnd: 0.14,
            seed: shelf.seed,
          }
        );

        drawDryBrushStroke(
          ctx,
          [
            [shelf.x1 - 12, shelf.y + shelf.thickness * 0.48],
            [
              (shelf.x1 + shelf.x2) * 0.5,
              shelf.y + shelf.thickness * 0.5 + shelf.tilt * 0.5,
            ],
            [shelf.x2 + 8, shelf.y + shelf.thickness * 0.52 + shelf.tilt],
          ],
          {
            width: shelf.thickness * 0.86,
            color: DESERT_PALETTE.terracotta,
            secondaryColor: DESERT_PALETTE.burntSienna,
            opacity: 0.9,
            bristles: 22,
            dryness: 0.46,
            taperStart: 0.22,
            taperEnd: 0.14,
            seed: shelf.seed + 3,
          }
        );

        drawDryBrushStroke(
          ctx,
          [
            [shelf.x1 + 14, shelf.y + shelf.thickness * 0.86],
            [
              (shelf.x1 + shelf.x2) * 0.52,
              shelf.y + shelf.thickness * 0.87 + shelf.tilt * 0.5,
            ],
            [shelf.x2, shelf.y + shelf.thickness * 0.83 + shelf.tilt],
          ],
          {
            width: shelf.thickness * 0.5,
            color: DESERT_PALETTE.deepUmber,
            secondaryColor: DESERT_PALETTE.charcoalUmber,
            opacity: 0.85,
            bristles: 16,
            dryness: 0.54,
            taperStart: 0.28,
            taperEnd: 0.18,
            seed: shelf.seed + 9,
          }
        );
      }

      drawDryBrushStroke(
        ctx,
        [
          [1145, 528],
          [1235, 520],
          [1312, 528],
        ],
        {
          width: 44,
          color: '#371F1C',
          secondaryColor: '#583028',
          opacity: 0.9,
          bristles: 20,
          dryness: 0.36,
          taperStart: 0.14,
          taperEnd: 0.18,
          seed: 1451,
        }
      );

      // 2. Seamless sunlit middle valley plateau & descending path
      const plateauGrad = ctx.createLinearGradient(420, 700, 1280, 860);
      plateauGrad.addColorStop(0, '#E8CBB3');
      plateauGrad.addColorStop(0.55, '#E4C2A6');
      plateauGrad.addColorStop(0.82, '#D7A88A');
      plateauGrad.addColorStop(1, hexToRgba('#C27D5B', 0));

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(375, 728);
      ctx.quadraticCurveTo(640, 692, 980, 704);
      ctx.quadraticCurveTo(1195, 712, 1345, 675);
      ctx.lineTo(1320, 845);
      ctx.quadraticCurveTo(960, 885, 560, 895);
      ctx.lineTo(390, 820);
      ctx.closePath();
      ctx.fillStyle = plateauGrad;
      ctx.fill();
      ctx.restore();

      const valleySweeps: Array<[number, number, number, number, string, number]> = [
        [410, 718, 1220, 710, '#EED6BF', 32],
        [460, 745, 1270, 735, '#E2BE9F', 38],
        [520, 778, 1290, 760, '#D49E7C', 42],
        [620, 812, 1280, 788, '#C88966', 38],
        [740, 838, 1220, 822, '#E9CEB6', 34],
      ];
      valleySweeps.forEach(([x1, y1, x2, y2, col, w], i) => {
        drawDryBrushStroke(
          ctx,
          [
            [x1, y1],
            [(x1 + x2) * 0.5, (y1 + y2) * 0.5 + (i % 2 === 0 ? -5 : 4)],
            [x2, y2],
          ],
          {
            width: w,
            color: col,
            secondaryColor: '#D6A888',
            opacity: 0.62,
            bristles: 22,
            dryness: 0.58,
            taperStart: 0.22,
            taperEnd: 0.34,
            seed: 1520 + i * 29,
          }
        );
      });

      drawGouacheWash(
        ctx,
        [
          [1455, 355],
          [1315, 505],
          [1145, 640],
          [930, 775],
        ],
        {
          width: 92,
          color: '#46302C',
          opacity: 0.34,
          passes: 5,
          seed: 1567,
        }
      );
      drawDryBrushStroke(
        ctx,
        [
          [1440, 380],
          [1285, 535],
          [1100, 672],
          [910, 785],
        ],
        {
          width: 52,
          color: '#3A2724',
          secondaryColor: '#6D524A',
          opacity: 0.42,
          bristles: 22,
          dryness: 0.66,
          taperStart: 0.12,
          taperEnd: 0.45,
          seed: 1583,
        }
      );

      // 3. Lower-left overhanging rim & sweeping diagonal slopes
      drawPaintedMass(
        ctx,
        [
          [-140, 1020],
          [85, 912],
          [310, 812],
          [372, 725],
          [595, 738],
          [825, 755],
          [860, 875],
          [630, 1085],
          [390, 1170],
          [-140, 1170],
        ],
        {
          baseTopColor: '#DFB698',
          baseBottomColor: '#BA6D4B',
          strokeColor: '#A9593B',
          highlightColor: '#ECD3BC',
          shadowColor: '#5B3128',
          strataAngleDeg: -26,
          strokeDensity: 38,
          dryness: 0.5,
          seed: 1621,
          fringeEdgeColor: '#984B32',
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [-120, 995],
          [110, 895],
          [350, 788],
        ],
        {
          width: 44,
          color: '#BD6E4B',
          secondaryColor: '#8E4934',
          opacity: 0.8,
          bristles: 26,
          dryness: 0.58,
          taperStart: 0.08,
          taperEnd: 0.25,
          seed: 1663,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [-100, 1058],
          [155, 945],
          [425, 818],
        ],
        {
          width: 60,
          color: '#A55336',
          secondaryColor: '#693428',
          opacity: 0.86,
          bristles: 24,
          dryness: 0.46,
          taperStart: 0.05,
          taperEnd: 0.22,
          seed: 1697,
        }
      );

      drawGouacheWash(
        ctx,
        [
          [240, 1130],
          [485, 975],
          [715, 862],
          [890, 795],
        ],
        {
          width: 195,
          color: '#E5C6AE',
          opacity: 0.58,
          passes: 6,
          seed: 1721,
        }
      );
      drawDryBrushStroke(
        ctx,
        [
          [340, 1110],
          [545, 965],
          [740, 855],
        ],
        {
          width: 95,
          color: '#D5A07D',
          secondaryColor: '#E8CBB3',
          opacity: 0.55,
          bristles: 24,
          dryness: 0.62,
          taperStart: 0.18,
          taperEnd: 0.25,
          seed: 1733,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [364, 726],
          [485, 742],
          [618, 746],
          [758, 744],
        ],
        {
          width: 14,
          color: '#341D1A',
          secondaryColor: '#56312A',
          opacity: 0.92,
          bristles: 14,
          dryness: 0.35,
          taperStart: 0.06,
          taperEnd: 0.3,
          seed: 1753,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [408, 748],
          [535, 766],
          [675, 762],
          [795, 756],
        ],
        {
          width: 40,
          color: '#3D221E',
          secondaryColor: '#5E342B',
          opacity: 0.88,
          bristles: 22,
          dryness: 0.48,
          taperStart: 0.1,
          taperEnd: 0.36,
          seed: 1777,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [402, 738],
          [382, 795],
          [358, 845],
        ],
        {
          width: 20,
          color: '#3B211D',
          secondaryColor: '#6D3A2B',
          opacity: 0.88,
          bristles: 14,
          dryness: 0.45,
          taperStart: 0.08,
          taperEnd: 0.32,
          seed: 1789,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [475, 818],
          [545, 792],
          [612, 782],
        ],
        {
          width: 30,
          color: '#3D221E',
          secondaryColor: '#6A3A2D',
          opacity: 0.84,
          bristles: 16,
          dryness: 0.42,
          seed: 1801,
        }
      );

      ctx.restore();

      sourceCanvasRef.current = source;
      lastProgressRef.current = -1;
      renderToDisplay(pendingProgressRef.current);
    }, []);

    return (
      <div
        className="pointer-events-none absolute inset-0"
        data-layer="canyon-mid"
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

CanyonLayers.displayName = 'CanyonLayers';
