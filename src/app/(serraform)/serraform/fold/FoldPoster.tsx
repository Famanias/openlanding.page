'use client';

import React, { useId, useMemo } from 'react';
import { mixHex } from './color';
import { DEFAULT_DESIGN, PALETTE, ViewId, ViewState } from './config';
import { deriveFold, formatMeters } from './geometry';
import { projectFold } from './projection';

interface FoldPosterProps {
  opening: number;
  baseHex?: string;
  view?: ViewState | ViewId;
  width?: number;
  height?: number;
  showBracket?: boolean;
  className?: string;
  ariaHidden?: boolean;
}

function shadeHex(
  baseHex: string,
  shade: number,
  kind: 'felt' | 'top' | 'cap' | 'foot',
): { fill: string; stroke: string } {
  if (kind === 'foot') {
    const f = 0.72 + shade * 0.34;
    return {
      fill: `rgb(${Math.min(255, Math.round(75 * f))}, ${Math.min(255, Math.round(32 * f))}, ${Math.min(255, Math.round(42 * f))})`,
      stroke: PALETTE.oxblood,
    };
  }

  const shadowHex = mixHex(baseHex, '#201014', 0.28);
  const highlightHex = mixHex(baseHex, '#FFFCF8', 0.22);

  if (kind === 'top') {
    return { fill: highlightHex, stroke: shadowHex };
  }

  const t = Math.max(0, Math.min(1, (shade - 0.56) / 0.44));
  const fill =
    t < 0.55
      ? mixHex(shadowHex, baseHex, t / 0.55)
      : mixHex(baseHex, highlightHex, (t - 0.55) / 0.45);

  return { fill, stroke: shadowHex };
}

export const FoldPoster: React.FC<FoldPosterProps> = ({
  opening,
  baseHex = DEFAULT_DESIGN.baseHex,
  view = 'quarter',
  width = 900,
  height = 640,
  showBracket = true,
  className = '',
  ariaHidden = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const shadowGradId = `srf-shadow-${uid}`;
  const aspect = width / height;

  const { pose, projected } = useMemo(() => {
    const p = deriveFold(opening);
    const proj = projectFold(p, view, aspect, width, height);
    return { pose: p, projected: proj };
  }, [opening, view, aspect, width, height]);

  const spanText = formatMeters(pose.metrics.outerSpan);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block w-full h-full select-none ${className}`}
      role={ariaHidden ? undefined : 'img'}
      aria-hidden={ariaHidden || undefined}
      aria-label={
        ariaHidden
          ? undefined
          : `Fold 16 freestanding felt divider at ${Math.round(pose.opening)}% opening, outer span ${spanText}`
      }
    >
      <defs>
        <radialGradient id={shadowGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={PALETTE.oxblood} stopOpacity="0.24" />
          <stop offset="62%" stopColor={PALETTE.oxblood} stopOpacity="0.09" />
          <stop offset="100%" stopColor={PALETTE.oxblood} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={PALETTE.rose} />

      <ellipse
        cx={projected.shadowEllipse.cx}
        cy={projected.shadowEllipse.cy}
        rx={projected.shadowEllipse.rx}
        ry={projected.shadowEllipse.ry}
        fill={`url(#${shadowGradId})`}
      />

      <g strokeLinejoin="round">
        {projected.faces.map((face, idx) => {
          const pts = face.points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
          const { fill, stroke } = shadeHex(baseHex, face.shade, face.kind);
          return (
            <polygon
              key={idx}
              points={pts}
              fill={fill}
              stroke={stroke}
              strokeWidth={face.kind === 'top' ? 0.6 : 0.75}
              strokeOpacity={face.kind === 'foot' ? 0.65 : 0.28}
            />
          );
        })}
      </g>

      {showBracket && projected.spanBracket.visible && (
        <g stroke={PALETTE.oxblood} strokeWidth="1.2" fill="none" opacity="0.72">
          <line
            x1={projected.spanBracket.leftX}
            y1={projected.spanBracket.y}
            x2={projected.spanBracket.rightX}
            y2={projected.spanBracket.y}
          />
          <line
            x1={projected.spanBracket.leftX}
            y1={projected.spanBracket.y - 6}
            x2={projected.spanBracket.leftX}
            y2={projected.spanBracket.y + 6}
          />
          <line
            x1={projected.spanBracket.rightX}
            y1={projected.spanBracket.y - 6}
            x2={projected.spanBracket.rightX}
            y2={projected.spanBracket.y + 6}
          />
        </g>
      )}
    </svg>
  );
};
