'use client';

import React, { useState } from 'react';
import { PAPER_PALETTE } from '../src/utils/paperTextures';

interface PaperCloudsProps {
  cloudsUnfoldRef: (el: SVGGElement | null) => void;
  registerCloudRef: (index: number, el: SVGGElement | null) => void;
  shadowsEnabled: boolean;
  interactive: boolean;
  resetToken: number;
}

interface CloudSpec {
  id: string;
  label: string;
  x: number;
  y: number;
  scale: number;
  /** Bottom warm peach-buff base cardstock */
  basePath: string;
  /** Middle cream-peach layered sheet */
  midPath: string;
  /** Crisp top ivory scrolling layer */
  topPath: string;
  /** Inner curled scroll detail cutout */
  spiralPath: string;
}

/**
 * Four handcrafted Japanese kumo (ornamental curling cloud) paper cutouts
 * positioned to match the exact composition of the reference artwork.
 */
const CLOUDS: CloudSpec[] = [
  {
    // 1. Upper-left cloud floating above the pale sage mountain
    id: 'cloud-upper-left',
    label: 'Upper left ornamental paper cloud',
    x: 215,
    y: 44,
    scale: 1.0,
    basePath:
      'M 0 68 C 36 60, 62 48, 92 36 C 118 24, 146 26, 174 34 C 186 12, 222 2, 248 20 C 266 32, 266 52, 250 62 C 282 54, 314 54, 344 64 C 314 78, 286 76, 258 84 C 230 92, 198 98, 162 84 C 134 74, 108 92, 74 88 C 44 84, 22 76, 0 68 Z',
    midPath:
      'M 12 66 C 44 58, 70 46, 98 37 C 124 28, 152 30, 178 40 C 190 20, 220 12, 240 26 C 254 36, 254 52, 240 60 C 272 54, 302 56, 330 64 C 300 74, 276 72, 248 79 C 222 86, 194 90, 162 78 C 136 69, 110 84, 78 82 C 50 80, 30 72, 12 66 Z',
    topPath:
      'M 26 65 C 58 58, 86 48, 112 42 C 138 36, 162 42, 184 52 C 194 34, 218 26, 232 36 C 242 44, 238 58, 224 62 C 252 58, 284 59, 312 64 C 282 70, 258 68, 234 74 C 210 80, 188 82, 160 72 C 134 62, 110 75, 82 74 C 58 73, 40 69, 26 65 Z',
    spiralPath:
      'M 218 52 C 212 52, 208 46, 212 41 C 216 36, 226 37, 229 44 C 232 52, 224 62, 212 61 C 198 60, 192 48, 198 38',
  },
  {
    // 2. Upper-mid-left cloud overlapping the pale sage peak and lower-left sun edge
    id: 'cloud-mid-left',
    label: 'Center left cloud overlapping mountain peak',
    x: 495,
    y: 112,
    scale: 0.96,
    basePath:
      'M 0 58 C 36 52, 68 48, 94 38 C 118 28, 134 32, 152 40 C 162 18, 194 6, 218 22 C 234 33, 236 50, 222 58 C 254 54, 288 58, 318 68 C 286 76, 256 76, 226 80 C 196 84, 166 86, 138 74 C 112 62, 86 78, 56 72 C 30 68, 14 63, 0 58 Z',
    midPath:
      'M 14 57 C 46 52, 74 47, 100 39 C 122 32, 138 35, 156 44 C 166 26, 192 16, 212 28 C 224 36, 224 50, 212 57 C 242 54, 274 58, 302 66 C 274 72, 246 72, 218 76 C 192 79, 164 80, 140 69 C 116 58, 90 72, 62 68 C 38 64, 24 60, 14 57 Z',
    topPath:
      'M 28 56 C 58 51, 86 48, 110 42 C 130 37, 148 42, 164 50 C 174 34, 194 26, 206 36 C 214 42, 212 52, 200 56 C 228 54, 256 58, 282 64 C 256 68, 232 68, 208 71 C 184 74, 160 74, 140 64 C 118 54, 94 65, 68 62 C 48 60, 36 58, 28 56 Z',
    spiralPath:
      'M 192 48 C 187 48, 184 43, 188 39 C 192 35, 200 36, 202 42 C 204 49, 197 56, 187 55 C 176 54, 172 44, 177 36',
  },
  {
    // 3. Upper-right prominent double-scroll cloud
    id: 'cloud-upper-right',
    label: 'Upper right ornamental scroll cloud',
    x: 958,
    y: 16,
    scale: 1.05,
    basePath:
      'M 0 60 C 32 54, 62 46, 94 34 C 114 26, 134 30, 152 38 C 164 10, 202 -2, 230 14 C 246 24, 254 40, 248 52 C 266 36, 294 34, 314 48 C 334 62, 356 64, 384 68 C 350 82, 316 84, 284 82 C 254 80, 230 98, 192 96 C 158 94, 134 78, 102 82 C 66 86, 30 72, 0 60 Z',
    midPath:
      'M 16 59 C 46 53, 74 45, 102 36 C 122 29, 140 34, 158 42 C 170 18, 202 8, 224 22 C 238 31, 244 45, 236 56 C 256 42, 284 42, 302 54 C 320 65, 344 66, 368 69 C 338 78, 308 80, 278 78 C 250 76, 228 91, 194 89 C 162 87, 138 72, 108 76 C 74 80, 40 68, 16 59 Z',
    topPath:
      'M 34 58 C 64 53, 90 46, 114 40 C 134 34, 152 40, 168 48 C 178 28, 202 20, 218 32 C 228 39, 228 52, 218 59 C 240 48, 268 49, 284 58 C 302 67, 326 68, 348 70 C 320 75, 294 76, 268 74 C 242 72, 224 83, 194 81 C 166 79, 144 66, 116 70 C 86 73, 56 64, 34 58 Z',
    spiralPath:
      'M 204 46 C 198 46, 194 40, 198 34 C 203 28, 214 30, 216 38 C 219 48, 208 58, 194 56 C 180 54, 174 42, 181 30 M 266 60 C 261 60, 258 55, 262 51 C 266 47, 274 49, 275 55 C 276 61, 268 67, 258 65',
  },
  {
    // 4. Mid-right curling cloud nestled in front of the dusty blue mountain
    id: 'cloud-mid-right',
    label: 'Mid right curling paper cloud',
    x: 828,
    y: 196,
    scale: 0.94,
    basePath:
      'M 0 58 C 30 56, 58 46, 86 36 C 108 28, 128 34, 144 42 C 156 18, 188 8, 212 22 C 230 33, 236 52, 224 64 C 240 60, 256 62, 268 68 C 244 76, 218 78, 192 84 C 164 90, 134 86, 106 76 C 78 66, 52 80, 24 72 C 12 68, 4 63, 0 58 Z',
    midPath:
      'M 12 58 C 40 55, 66 46, 92 38 C 114 31, 132 37, 148 45 C 160 25, 186 16, 206 28 C 220 36, 224 52, 214 62 C 228 59, 242 61, 252 66 C 232 72, 210 74, 186 79 C 162 84, 134 80, 110 71 C 84 62, 58 74, 32 68 C 22 65, 16 61, 12 58 Z',
    topPath:
      'M 26 57 C 52 54, 76 47, 100 41 C 120 36, 138 42, 154 50 C 164 34, 186 27, 198 36 C 208 43, 208 55, 198 61 C 212 60, 224 61, 234 65 C 216 69, 198 70, 178 74 C 156 78, 134 74, 112 66 C 90 58, 66 67, 42 63 C 34 61, 29 59, 26 57 Z',
    spiralPath:
      'M 184 48 C 178 48, 175 43, 179 38 C 183 34, 192 35, 194 42 C 196 50, 188 57, 177 55 C 166 53, 163 43, 169 35',
  },
];

export const PaperClouds: React.FC<PaperCloudsProps> = ({
  cloudsUnfoldRef,
  registerCloudRef,
  shadowsEnabled,
  interactive,
  resetToken,
}) => {
  const [cloudState, setCloudState] = useState<{
    token: number;
    hovered: string | null;
    pinned: Record<string, boolean>;
  }>({ token: resetToken, hovered: null, pinned: {} });

  const hoveredCloud = cloudState.token === resetToken ? cloudState.hovered : null;
  const pinnedClouds = cloudState.token === resetToken ? cloudState.pinned : {};

  const setHoveredCloud = (next: string | null | ((prev: string | null) => string | null)) => {
    setCloudState((prev) => {
      const curHovered = prev.token === resetToken ? prev.hovered : null;
      const curPinned = prev.token === resetToken ? prev.pinned : {};
      const resolved = typeof next === 'function' ? next(curHovered) : next;
      return { token: resetToken, hovered: resolved, pinned: curPinned };
    });
  };

  const toggleCloudPin = (id: string) => {
    if (!interactive) return;
    setCloudState((prev) => {
      const curHovered = prev.token === resetToken ? prev.hovered : null;
      const curPinned = prev.token === resetToken ? prev.pinned : {};
      return {
        token: resetToken,
        hovered: curHovered,
        pinned: { ...curPinned, [id]: !curPinned[id] },
      };
    });
  };

  return (
    <g ref={cloudsUnfoldRef} id="kirigami-clouds">
      {CLOUDS.map((cloud, idx) => {
        const isExpanded = interactive && (hoveredCloud === cloud.id || Boolean(pinnedClouds[cloud.id]));

        return (
          <g
            key={cloud.id}
            ref={(el) => registerCloudRef(idx, el)}
            id={cloud.id}
            className={interactive ? 'kirigami-interactive-cloud' : undefined}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? `${cloud.label} — hover or click to separate paper layers` : undefined}
            aria-pressed={interactive ? Boolean(pinnedClouds[cloud.id]) : undefined}
            onMouseEnter={() => interactive && setHoveredCloud(cloud.id)}
            onMouseLeave={() => interactive && setHoveredCloud((prev) => (prev === cloud.id ? null : prev))}
            onClick={() => toggleCloudPin(cloud.id)}
            onKeyDown={(e) => {
              if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleCloudPin(cloud.id);
              }
            }}
          >
            <g transform={`translate(${cloud.x}, ${cloud.y}) scale(${cloud.scale})`}>
              {/* Base terracotta-peach cardstock layer with crisp multi-step cast shadow */}
              <g
                style={{
                  transition: 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isExpanded ? 'translate(5px, 6px)' : 'translate(0px, 0px)',
                }}
              >
                {shadowsEnabled && (
                  <>
                    <path d={cloud.basePath} fill="#3B291C" opacity={0.11} transform="translate(8, 12)" />
                    <path d={cloud.basePath} fill="#3B291C" opacity={0.18} transform="translate(4, 7)" />
                  </>
                )}
                <path d={cloud.basePath} fill={PAPER_PALETTE.cloudBase} />
              </g>

              {/* Middle warm cream layer */}
              <g
                style={{
                  transition: 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isExpanded ? 'translate(-2px, -3px)' : 'translate(0px, 0px)',
                }}
              >
                {shadowsEnabled && (
                  <path d={cloud.midPath} fill="#9A7254" opacity={0.28} transform="translate(2.5, 3.5)" />
                )}
                <path d={cloud.midPath} fill={PAPER_PALETTE.cloudMid} />
              </g>

              {/* Top crisp ivory cardstock layer with upper-left rim highlight & spiral relief */}
              <g
                style={{
                  transition: 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isExpanded ? 'translate(-7px, -9px)' : 'translate(0px, 0px)',
                }}
              >
                {shadowsEnabled && (
                  <path d={cloud.topPath} fill="#A37C5F" opacity={0.26} transform="translate(2, 3)" />
                )}
                <path
                  d={cloud.topPath}
                  fill={PAPER_PALETTE.cloudTop}
                  stroke={PAPER_PALETTE.cloudRim}
                  strokeWidth={1.2}
                />
                <path
                  d={cloud.spiralPath}
                  fill="none"
                  stroke="#C99B78"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  opacity={0.78}
                />
                <path
                  d={cloud.spiralPath}
                  fill="none"
                  stroke={PAPER_PALETTE.cloudRim}
                  strokeWidth={1.1}
                  strokeLinecap="round"
                  transform="translate(-1.2, -1.2)"
                  opacity={0.9}
                />
              </g>
            </g>
          </g>
        );
      })}
    </g>
  );
};
