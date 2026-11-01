'use client';

import React from 'react';

/**
 * Original 2D pixel-art sprite matrices and components for WARP & WANDER.
 * Protagonist: Pip, an original small caped mapmaker carrying a lantern-shaped compass.
 * Palette strictly adheres to the WARP & WANDER exclusive color tokens:
 *  I = #23244F (Twilight Indigo)
 *  F = #2F644F (Fern Forest)
 *  G = #FFD06A (Golden Nectar)
 *  C = #FF907A (Coral Bloom)
 *  D = #FFF1D3 (Daylight Cream)
 *  L = #6DDCC5 (Lagoon Mist)
 *  M = #604A79 (Mulberry Shadow)
 */

const PIXEL_COLOR_MAP: Record<string, string> = {
  I: '#23244F',
  F: '#2F644F',
  G: '#FFD06A',
  C: '#FF907A',
  D: '#FFF1D3',
  L: '#6DDCC5',
  M: '#604A79',
};

// 14x16 logical pixel grid for Pip the Mapmaker
const PIP_FRAMES: Record<'idle0' | 'idle1' | 'walk0' | 'walk1' | 'jump' | 'celebrate', string[]> = {
  idle0: [
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC.....',
    '..CCCCCCCC..G.',
    '.CCCCCCCCCCGGG',
    '.CCCIIIICCC.G.',
    '.CC.IIII.CC...',
    '....IIII......',
    '....IIII......',
    '...FF..FF.....',
    '...FF..FF.....',
    '..............',
  ],
  idle1: [
    '..............',
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC...G.',
    '..CCCCCCCC.GGG',
    '.CCCCCCCCCC.G.',
    '.CCCIIIICCC...',
    '....IIII......',
    '....IIII......',
    '...FF..FF.....',
    '...FF..FF.....',
    '..............',
  ],
  walk0: [
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC..G..',
    '..CCCCCCCCGGG.',
    '.CCCCCCCCCCG..',
    '.CCCIIIICCC...',
    '....IIII......',
    '...II..II.....',
    '..FF....FF....',
    '..FF....FF....',
    '..............',
    '..............',
  ],
  walk1: [
    '....GGGG......',
    '...GGGGGG.....',
    '..IIIIIIII....',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '...CCCCCC...G.',
    '..CCCCCCCC.GGG',
    '.CCCCCCCCCC.G.',
    '.CCCIIIICCC...',
    '....IIII......',
    '....IIII......',
    '....FF.FF.....',
    '...FF...FF....',
    '..............',
    '..............',
  ],
  jump: [
    '....GGGG...G..',
    '...GGGGGG.GGG.',
    '..IIIIIIII.G..',
    '..IDDDDDDI....',
    '..IDIDDIDI....',
    '..IDDDDDDI....',
    '..CCCCCCCC....',
    '.CCCCCCCCCC...',
    'CCC.IIII.CCC..',
    '....IIII......',
    '...II..II.....',
    '..FF....FF....',
    '..............',
    '..............',
    '..............',
    '..............',
  ],
  celebrate: [
    '.....GG....G..',
    '...GGGGGG.GGG.',
    '..IIIIIIII.L..',
    '..IDDDDDDI....',
    '..IDGDDGDI....',
    '..IDDDDDDI....',
    '.CCCCCCCCCC...',
    'CCCCCCCCCCCC..',
    'CC..IIII..CC..',
    '....IIII......',
    '...II..II.....',
    '..FF....FF....',
    '..............',
    '..............',
    '..............',
    '..............',
  ],
};

/**
 * Draw Pip directly onto a 2D Canvas context at (x, y) using nearest-neighbor logical pixels.
 */
export function drawPipSpriteToCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale = 3,
  pose: 'idle' | 'walk' | 'jump' | 'celebrate' = 'idle',
  frameTick = 0,
  facing: 'left' | 'right' = 'right',
  scaleX = 1,
  scaleY = 1
): void {
  let frameKey: keyof typeof PIP_FRAMES = 'idle0';
  if (pose === 'idle') {
    frameKey = frameTick % 2 === 0 ? 'idle0' : 'idle1';
  } else if (pose === 'walk') {
    frameKey = frameTick % 2 === 0 ? 'walk0' : 'walk1';
  } else if (pose === 'jump') {
    frameKey = 'jump';
  } else {
    frameKey = 'celebrate';
  }

  const rows = PIP_FRAMES[frameKey];
  const width = 14 * scale;
  const height = 16 * scale;

  ctx.save();
  ctx.translate(Math.round(x + width / 2), Math.round(y + height));
  ctx.scale((facing === 'left' ? -1 : 1) * scaleX, scaleY);
  ctx.translate(-Math.round(width / 2), -height);

  // Subtle ground shadow
  ctx.fillStyle = 'rgba(35, 36, 79, 0.45)';
  ctx.fillRect(scale * 2, height - scale * 2, scale * 10, scale * 2);

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === '.') continue;
      ctx.fillStyle = PIXEL_COLOR_MAP[ch] || '#FFF1D3';
      ctx.fillRect(c * scale, r * scale, scale, scale);
    }
  }

  // Lantern compass aura glow
  ctx.fillStyle = 'rgba(255, 208, 106, 0.28)';
  ctx.fillRect(10 * scale, 6 * scale, 5 * scale, 5 * scale);

  ctx.restore();
}

export const PipSpriteBadge: React.FC<{
  pose?: 'idle' | 'walk' | 'jump' | 'celebrate';
  size?: number;
  className?: string;
}> = ({ pose = 'idle', size = 56, className = '' }) => {
  const frameKey =
    pose === 'jump' ? 'jump' : pose === 'celebrate' ? 'celebrate' : pose === 'walk' ? 'walk0' : 'idle0';
  const rows = PIP_FRAMES[frameKey];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 16"
      className={`ww-pixelated pixelated shrink-0 ${className}`}
      aria-label="Pip the caped mapmaker carrying a lantern compass"
      role="img"
    >
      {rows.map((row, rIdx) =>
        row.split('').map((ch, cIdx) => {
          if (ch === '.') return null;
          return (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={cIdx}
              y={rIdx}
              width={1}
              height={1}
              fill={PIXEL_COLOR_MAP[ch]}
            />
          );
        })
      )}
    </svg>
  );
};

export const PixelCompassIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    className={`ww-pixelated pixelated shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect x="4" y="0" width="4" height="1" fill="#FFD06A" />
    <rect x="5" y="1" width="2" height="1" fill="#FFD06A" />
    <rect x="3" y="2" width="6" height="1" fill="#FFD06A" />
    <rect x="2" y="3" width="8" height="6" fill="#23244F" />
    <rect x="1" y="4" width="1" height="4" fill="#FFD06A" />
    <rect x="10" y="4" width="1" height="4" fill="#FFD06A" />
    <rect x="2" y="2" width="1" height="1" fill="#FFD06A" />
    <rect x="9" y="2" width="1" height="1" fill="#FFD06A" />
    <rect x="2" y="9" width="8" height="1" fill="#FFD06A" />
    <rect x="3" y="10" width="6" height="1" fill="#FFD06A" />
    {/* Compass needle: Coral North, Lagoon South */}
    <rect x="5" y="4" width="2" height="2" fill="#FF907A" />
    <rect x="5" y="6" width="2" height="2" fill="#6DDCC5" />
    <rect x="5" y="5" width="2" height="2" fill="#FFF1D3" />
  </svg>
);

export const CartridgeArtifactSprite: React.FC<{
  accentColor: string;
  glyphPattern: number[][];
  discovered: boolean;
  frame?: number;
}> = ({ accentColor, glyphPattern, discovered, frame = 0 }) => {
  const pulseLift = frame % 2 === 0 ? 0 : -1;

  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 16 16"
      className="ww-pixelated pixelated shrink-0"
      aria-hidden="true"
    >
      <g transform={`translate(0, ${pulseLift})`}>
        {/* Outer cartridge silhouette */}
        <rect x="3" y="1" width="9" height="1" fill={accentColor} />
        <rect x="2" y="2" width="12" height="12" fill="#23244F" />
        <rect x="3" y="2" width="10" height="11" fill={discovered ? accentColor : '#604A79'} />
        {/* Grip grooves at top left/right */}
        <rect x="3" y="3" width="2" height="1" fill="#23244F" />
        <rect x="11" y="3" width="2" height="1" fill="#23244F" />
        {/* Recessed label window */}
        <rect x="4" y="5" width="8" height="7" fill="#23244F" />
        {/* Invented abstract rune glyph inside cartridge */}
        {glyphPattern.map((row, r) =>
          row.map((cell, c) =>
            cell === 1 ? (
              <rect
                key={`${r}-${c}`}
                x={5 + c}
                y={6 + r}
                width={1}
                height={1}
                fill={discovered ? '#FFF1D3' : accentColor}
              />
            ) : null
          )
        )}
        {/* Bottom connector pins */}
        <rect x="4" y="13" width="1" height="1" fill="#FFD06A" />
        <rect x="6" y="13" width="1" height="1" fill="#FFD06A" />
        <rect x="9" y="13" width="1" height="1" fill="#FFD06A" />
        <rect x="11" y="13" width="1" height="1" fill="#FFD06A" />
      </g>
      {/* Sparkle corners when discovered */}
      {discovered && (
        <>
          <rect x="1" y="1" width="1" height="1" fill="#FFD06A" />
          <rect x="14" y="2" width="1" height="1" fill="#6DDCC5" />
          <rect x="1" y="13" width="1" height="1" fill="#FF907A" />
        </>
      )}
    </svg>
  );
};
