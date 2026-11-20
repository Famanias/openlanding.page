'use client';

import React from 'react';

interface PaperCastShadowProps {
  /** SVG path `d` string to cast a soft multi-tier directional paper shadow */
  d: string;
  /** Effective shadow strength (0 = hidden, 1 = normal, up to 1.8) */
  strength: number;
  /** Shadow tint matching cardstock depth (warm brown or deep forest) */
  color?: string;
  /** Depth separation multiplier (1 = close contact, 1.8 = elevated sheet) */
  elevation?: number;
}

/**
 * Ultra-fast, silky-smooth 3-tier feathered vector paper cast shadow.
 * Casts consistently from upper-left illumination toward down-right (+dx, +dy)
 * with zero SVG Gaussian blur rasterization stalls, keeping 60fps across all hardware.
 */
export const PaperCastShadow: React.FC<PaperCastShadowProps> = ({
  d,
  strength,
  color = '#291E16',
  elevation = 1,
}) => {
  if (strength <= 0.005) return null;
  const s = Math.min(1.8, Math.max(0, strength));
  const e = elevation;

  return (
    <g pointerEvents="none">
      {/* Wide ambient soft penumbra */}
      <path
        d={d}
        fill={color}
        opacity={Number((0.065 * s).toFixed(3))}
        transform={`translate(${(9.5 * e).toFixed(1)}, ${(14.5 * e).toFixed(1)})`}
      />
      {/* Mid diffused cast shadow */}
      <path
        d={d}
        fill={color}
        opacity={Number((0.125 * s).toFixed(3))}
        transform={`translate(${(5.2 * e).toFixed(1)}, ${(8.2 * e).toFixed(1)})`}
      />
      {/* Crisp contact shadow lip near paper cut edge */}
      <path
        d={d}
        fill={color}
        opacity={Number((0.21 * s).toFixed(3))}
        transform={`translate(${(2.4 * e).toFixed(1)}, ${(3.8 * e).toFixed(1)})`}
      />
    </g>
  );
};
