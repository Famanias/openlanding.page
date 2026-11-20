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

export const ForegroundLedge = React.memo(
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
        LAYER_REVEAL_STROKES.foreground,
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

      // 1. Right-side sunlit terrace plateau
      drawPaintedMass(
        ctx,
        [
          [1030, 822],
          [1390, 775],
          [1760, 778],
          [2060, 795],
          [2060, 1020],
          [1340, 1015],
          [1015, 882],
        ],
        {
          baseTopColor: '#DFB696',
          baseBottomColor: '#B86948',
          strokeColor: '#A9593A',
          highlightColor: '#EDD1B7',
          shadowColor: '#5B3128',
          strataAngleDeg: 8,
          strokeDensity: 30,
          dryness: 0.5,
          seed: 3109,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1035, 822],
          [1345, 858],
          [1690, 888],
        ],
        {
          width: 34,
          color: '#5C3128',
          secondaryColor: '#914831',
          opacity: 0.85,
          bristles: 22,
          dryness: 0.48,
          taperStart: 0.14,
          taperEnd: 0.22,
          seed: 3137,
        }
      );

      // 2. Sunlit central promontory path
      drawPaintedMass(
        ctx,
        [
          [812, 834],
          [1035, 822],
          [1285, 868],
          [1685, 962],
          [2060, 1045],
          [2060, 1170],
          [1340, 1170],
          [945, 938],
          [808, 848],
        ],
        {
          baseTopColor: '#ECD3BC',
          baseBottomColor: '#D49E7A',
          strokeColor: '#C58662',
          highlightColor: '#F5E4D2',
          shadowColor: '#8E4B35',
          strataAngleDeg: 13,
          strokeDensity: 26,
          dryness: 0.52,
          seed: 3203,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [822, 838],
          [1050, 866],
          [1365, 938],
          [1730, 1038],
        ],
        {
          width: 24,
          color: '#F3E3D0',
          secondaryColor: '#E6C6A8',
          opacity: 0.8,
          bristles: 18,
          dryness: 0.55,
          taperStart: 0.08,
          taperEnd: 0.24,
          seed: 3229,
        }
      );

      // 3. Craggy dark-umber & terracotta foreground cliff drop-off
      drawPaintedMass(
        ctx,
        [
          [435, 1170],
          [635, 1015],
          [742, 938],
          [784, 888],
          [812, 835],
          [942, 875],
          [1118, 934],
          [1575, 1085],
          [1795, 1170],
        ],
        {
          baseTopColor: '#8C452F',
          baseBottomColor: '#301A17',
          strokeColor: '#4A2823',
          highlightColor: '#BA6644',
          shadowColor: '#231311',
          strataAngleDeg: -38,
          strokeDensity: 44,
          dryness: 0.44,
          seed: 3307,
          fringeEdgeColor: '#3B201C',
        }
      );

      drawPaintedMass(
        ctx,
        [
          [808, 842],
          [958, 886],
          [1128, 940],
          [1105, 1005],
          [1065, 1068],
          [1048, 1170],
          [612, 1170],
          [720, 1020],
          [765, 935],
        ],
        {
          baseTopColor: '#432420',
          baseBottomColor: '#261412',
          strokeColor: '#341C19',
          highlightColor: '#6D392A',
          shadowColor: '#1B0E0D',
          strataAngleDeg: 112,
          strokeDensity: 30,
          dryness: 0.42,
          seed: 3347,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [812, 845],
          [762, 932],
          [655, 1020],
          [490, 1135],
        ],
        {
          width: 52,
          color: DESERT_PALETTE.terracotta,
          secondaryColor: '#8E4630',
          opacity: 0.9,
          bristles: 24,
          dryness: 0.48,
          taperStart: 0.1,
          seed: 3373,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [842, 868],
          [785, 955],
          [695, 1060],
          [585, 1155],
        ],
        {
          width: 34,
          color: '#9F4E34',
          secondaryColor: '#C87853',
          opacity: 0.72,
          bristles: 18,
          dryness: 0.56,
          seed: 3389,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [812, 838],
          [945, 882],
          [1105, 934],
          [1360, 1025],
          [1675, 1135],
        ],
        {
          width: 24,
          color: '#2B1715',
          secondaryColor: '#4B2822',
          opacity: 0.92,
          bristles: 18,
          dryness: 0.38,
          taperStart: 0.05,
          taperEnd: 0.14,
          seed: 3407,
        }
      );

      // 4. Foreground lower-center & lower-right stepped rock slabs
      drawPaintedMass(
        ctx,
        [
          [1025, 1170],
          [1055, 1062],
          [1082, 995],
          [1104, 944],
          [1245, 992],
          [1395, 1044],
          [1675, 1145],
          [1675, 1170],
        ],
        {
          baseTopColor: '#C67652',
          baseBottomColor: '#7A3D2C',
          strokeColor: '#9E4F35',
          highlightColor: '#E1AE8B',
          shadowColor: '#3A1F1B',
          strataAngleDeg: 18,
          strokeDensity: 30,
          dryness: 0.46,
          seed: 3457,
          fringeEdgeColor: '#5B3027',
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1105, 945],
          [1065, 1035],
          [1028, 1140],
        ],
        {
          width: 42,
          color: '#462621',
          secondaryColor: '#8B4530',
          opacity: 0.88,
          bristles: 22,
          dryness: 0.56,
          seed: 3473,
        }
      );
      drawDryBrushStroke(
        ctx,
        [
          [1092, 956],
          [1155, 1015],
          [1120, 1125],
        ],
        {
          width: 34,
          color: '#B86443',
          secondaryColor: '#693427',
          opacity: 0.78,
          bristles: 18,
          dryness: 0.6,
          seed: 3491,
        }
      );

      drawPaintedMass(
        ctx,
        [
          [1435, 922],
          [1495, 872],
          [1795, 912],
          [2060, 962],
          [2060, 1170],
          [1645, 1170],
          [1415, 995],
        ],
        {
          baseTopColor: '#C4734F',
          baseBottomColor: '#693427',
          strokeColor: '#984B32',
          highlightColor: '#DFB08C',
          shadowColor: '#351D1A',
          strataAngleDeg: 14,
          strokeDensity: 34,
          dryness: 0.44,
          seed: 3511,
          fringeEdgeColor: '#3D211D',
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1415, 972],
          [1685, 1042],
          [2050, 1132],
        ],
        {
          width: 46,
          color: '#341D1A',
          secondaryColor: '#5B3128',
          opacity: 0.9,
          bristles: 24,
          dryness: 0.46,
          taperStart: 0.14,
          seed: 3557,
        }
      );

      drawDryBrushStroke(
        ctx,
        [
          [1485, 878],
          [1755, 912],
          [2045, 962],
        ],
        {
          width: 20,
          color: '#E7C3A4',
          secondaryColor: '#D49A74',
          opacity: 0.84,
          bristles: 16,
          dryness: 0.48,
          seed: 3583,
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
        data-layer="foreground-ledge"
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

ForegroundLedge.displayName = 'ForegroundLedge';
