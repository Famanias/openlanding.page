'use client';

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import {
  LIVING_BRUSH_STROKES,
  evaluateLivingStroke,
  type LivingBrushStrokeSpec,
} from '../systems/LivingBrushSystem';
import { SCENE_BLEED_X, SCENE_BLEED_Y } from '../utils/sceneLayout';

export interface LivingBrushUpdateOptions {
  hatchingProgress: number;
  brushEnabled: boolean;
  brushActivity: number;
  motionIntensity: number;
  geologicalScrollReveal: number;
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  pointerEnabled: boolean;
}

export interface LivingBrushOverlayHandle {
  update: (t: number, options: LivingBrushUpdateOptions) => void;
}

interface LivingBrushOverlayProps {
  layer: 'canyonMid' | 'cliffWall' | 'foreground';
}

const LAYER_BOUNDS: Record<
  'canyonMid' | 'cliffWall' | 'foreground',
  { x: number; y: number; w: number; h: number }
> = {
  canyonMid: { x: -40, y: 380, w: 1490, h: 660 },
  cliffWall: { x: 1200, y: 0, w: 800, h: 760 },
  foreground: { x: 540, y: 820, w: 1460, h: 320 },
};

/**
 * Renders directional living geological brushstrokes grouped to their matching
 * 2.5D depth plane with tight bounding boxes and dirty-checked DOM updates.
 */
export const LivingBrushOverlay = React.memo(
  forwardRef<LivingBrushOverlayHandle, LivingBrushOverlayProps>(
    ({ layer }, ref) => {
      const strokes = useMemo<LivingBrushStrokeSpec[]>(
        () => LIVING_BRUSH_STROKES.filter((s) => s.layer === layer),
        [layer]
      );
      const bounds = LAYER_BOUNDS[layer];

      const pathRefs = useRef<Array<SVGPathElement | null>>([]);
      const lastStateRef = useRef<Array<string>>([]);

      useImperativeHandle(ref, () => ({
        update: (t: number, options: LivingBrushUpdateOptions) => {
          for (let i = 0; i < strokes.length; i++) {
            const pathEl = pathRefs.current[i];
            if (!pathEl) continue;
            const spec = strokes[i];
            const res = evaluateLivingStroke(spec, t, options);

            const dashOffset = (spec.length * (1 - res.drawFraction)).toFixed(0);
            const opStr = res.opacity.toFixed(2);
            const wStr = (spec.strokeWidth * res.widthScale).toFixed(1);
            const sig = `${dashOffset}|${opStr}|${wStr}`;
            if (lastStateRef.current[i] === sig) continue;
            lastStateRef.current[i] = sig;

            pathEl.style.strokeDashoffset = dashOffset;
            pathEl.style.opacity = opStr;
            pathEl.style.strokeWidth = wStr;
          }
        },
      }));

      return (
        <svg
          viewBox={`${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`}
          className="pointer-events-none absolute"
          style={{
            left: SCENE_BLEED_X + bounds.x,
            top: SCENE_BLEED_Y + bounds.y,
            width: bounds.w,
            height: bounds.h,
          }}
          data-layer={`living-brush-${layer}`}
          aria-hidden="true"
        >
          {strokes.map((spec, idx) => (
            <path
              key={spec.id}
              ref={(el) => {
                pathRefs.current[idx] = el;
              }}
              d={spec.d}
              fill="none"
              stroke={spec.color}
              strokeWidth={spec.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${spec.length} ${spec.length + 20}`}
              strokeDashoffset={spec.length}
              style={{ opacity: 0 }}
            />
          ))}
        </svg>
      );
    }
  )
);

LivingBrushOverlay.displayName = 'LivingBrushOverlay';
