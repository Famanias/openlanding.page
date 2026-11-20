'use client';

import React from 'react';
import { PAPER_PALETTE } from '../src/utils/paperTextures';

interface PaperSunProps {
  sunRef: (el: SVGGElement | null) => void;
  shadowStrength: number;
}

export const PaperSkyBackdrop: React.FC = () => {
  return (
    <g id="kirigami-sky-backdrop">
      {/* Overscanned warm ivory cardstock sheet so parallax/unfold never shows empty borders */}
      <rect
        x={-160}
        y={-120}
        width={1920}
        height={1140}
        fill="url(#grad-sky-paper)"
      />
      {/* Subtle warm radial peach sunlight wash around the upper-center sun */}
      <ellipse
        cx={805}
        cy={175}
        rx={520}
        ry={300}
        fill="url(#grad-sun-halo)"
        opacity={0.72}
      />
    </g>
  );
};

export const PaperSun: React.FC<PaperSunProps> = ({
  sunRef,
  shadowStrength,
}) => {
  const s = Math.min(1.8, Math.max(0, shadowStrength));
  return (
    <g ref={sunRef} id="kirigami-sun">
      {/* Soft feathered cast shadow on sky paper */}
      {s > 0.005 && (
        <g pointerEvents="none">
          <circle cx={811} cy={169} r={124} fill="#5C3B28" opacity={Number((0.06 * s).toFixed(3))} />
          <circle cx={806} cy={163} r={123} fill="#5C3B28" opacity={Number((0.11 * s).toFixed(3))} />
          <circle cx={803} cy={158} r={122.5} fill="#6B422C" opacity={Number((0.18 * s).toFixed(3))} />
        </g>
      )}
      {/* Recessed cardstock thickness rim */}
      <circle
        cx={802.5}
        cy={156.5}
        r={122.5}
        fill={PAPER_PALETTE.sunDeep}
        opacity={0.68}
      />
      {/* Main muted terracotta-peach paper sun disc */}
      <circle
        cx={800}
        cy={154}
        r={122}
        fill="url(#grad-sun-disc)"
      />
      {/* Crisp upper-left sunlit cardstock cut-edge highlight */}
      <path
        d="M 696 218 A 122 122 0 0 1 886 68"
        fill="none"
        stroke={PAPER_PALETTE.sunHighlight}
        strokeWidth={2.4}
        strokeLinecap="round"
        opacity={0.85}
      />
    </g>
  );
};
