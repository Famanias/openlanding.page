'use client';
import React from 'react';
import { PrecisionFeatureMarker } from '../../lib/world/worldMap';

/**
 * Crisp, non-pixelated studio hardware visualization of the real Analogue Pocket.
 * Per Section 3 & Section 8:
 * - Product representations remain sharp studio renders, never passed through a pixel filter.
 * - Contrast between the 16-bit pixel world and the physically real Analogue Pocket is intentional.
 * - Never displays unlicensed commercial video game screenshots on the screen.
 */

interface AnaloguePocketHardwareProps {
  variant: 'hero-portal' | 'display-comparison' | 'precision-inspector' | 'sanctuary-reveal';
  colorway?: 'black' | 'white';
  displayViewMode?: 'pixel' | 'device';
  activeMarkerId?: PrecisionFeatureMarker['id'];
  onSelectMarker?: (id: PrecisionFeatureMarker['id']) => void;
  markers?: PrecisionFeatureMarker[];
  showRearSlot?: boolean;
}

export const AnaloguePocketHardware: React.FC<AnaloguePocketHardwareProps> = ({
  variant,
  colorway = 'black',
  displayViewMode = 'device',
  activeMarkerId = 'dpad',
  onSelectMarker,
  markers = [],
  showRearSlot = false,
}) => {
  const isWhite = colorway === 'white';
  const shellFill = isWhite ? '#F3F2EE' : '#18181B';
  const shellEdge = isWhite ? '#D6D3CD' : '#2E2E34';
  const controlFill = isWhite ? '#E5E4DF' : '#232329';
  const controlStroke = isWhite ? '#C7C4BC' : '#383842';
  const labelText = isWhite ? '#78756E' : '#71717A';

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Act 0 Pixel Portal Archway Cut-Out Frame when variant === 'hero-portal' */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-700 ${
          variant === 'hero-portal'
            ? 'p-5 sm:p-7 bg-[#23244F]/95 border-4 border-[#FFD06A] shadow-[0_12px_0_0_#151633]'
            : 'p-4'
        }`}
      >
        {variant === 'hero-portal' && (
          <>
            {/* Stepped Pixel Portal Corner Tiles */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#FFD06A]" aria-hidden="true" />
            <div className="absolute top-2 left-2 text-[11px] ww-font-hud font-hud uppercase tracking-wider text-[#FFD06A]">
              PORTAL · REAL HARDWARE
            </div>
          </>
        )}

        {/* Crisp High-Resolution Studio Render of Analogue Pocket */}
        <div className="relative w-[250px] sm:w-[288px] aspect-[10/16.8] flex items-center justify-center">
          {/* Ambient Studio Halo behind physical device */}
          <div
            className="absolute inset-4 rounded-3xl opacity-45 blur-xl pointer-events-none"
            style={{
              background:
                variant === 'display-comparison' && displayViewMode === 'pixel'
                  ? 'radial-gradient(circle, #6DDCC5 0%, transparent 70%)'
                  : 'radial-gradient(circle, #FFD06A 0%, #FF907A 45%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          <svg
            viewBox="0 0 300 504"
            className="w-full h-full drop-shadow-[0_24px_32px_rgba(12,13,30,0.75)]"
            role="img"
            aria-label={`Analogue Pocket portable handheld in Matte ${isWhite ? 'White' : 'Black'}`}
          >
            <defs>
              <linearGradient id={`shellGrad-${colorway}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isWhite ? '#FAF9F5' : '#242429'} />
                <stop offset="50%" stopColor={shellFill} />
                <stop offset="100%" stopColor={isWhite ? '#DFDDD7' : '#101013'} />
              </linearGradient>

              <linearGradient id="gorillaGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2030" />
                <stop offset="45%" stopColor="#0C0D14" />
                <stop offset="100%" stopColor="#141622" />
              </linearGradient>

              <linearGradient id="glassSheen" x1="0%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                <stop offset="35%" stopColor="rgba(255,255,255,0.03)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {!showRearSlot ? (
              /* ================= FRONT STUDIO HARDWARE VIEW ================= */
              <g>
                {/* Outer Precision ABS Enclosure */}
                <rect
                  x="18"
                  y="12"
                  width="264"
                  height="480"
                  rx="26"
                  ry="26"
                  fill={`url(#shellGrad-${colorway})`}
                  stroke={shellEdge}
                  strokeWidth="2.5"
                />

                {/* Subtle inner chamfer highlight */}
                <rect
                  x="22"
                  y="16"
                  width="256"
                  height="472"
                  rx="23"
                  ry="23"
                  fill="none"
                  stroke={isWhite ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth="1"
                />

                {/* Side Power & Volume physical buttons on left edge */}
                <rect x="14" y="92" width="4" height="24" rx="1.5" fill={shellEdge} />
                <rect x="14" y="128" width="4" height="18" rx="1.5" fill={shellEdge} />
                <rect x="14" y="152" width="4" height="18" rx="1.5" fill={shellEdge} />

                {/* Custom Gorilla Glass 3.5" Lens Bezel */}
                <rect
                  x="32"
                  y="26"
                  width="236"
                  height="218"
                  rx="12"
                  ry="12"
                  fill="url(#gorillaGlass)"
                  stroke="#09090D"
                  strokeWidth="2"
                />

                {/* Active 3.5-inch 1600x1440 (10:9 ratio) High-PPI LCD Viewport */}
                <g transform="translate(46, 40)">
                  <rect x="0" y="0" width="208" height="187" rx="3" fill="#23244F" />

                  {variant === 'display-comparison' && displayViewMode === 'pixel' ? (
                    /* PIXEL VIEW: 10x Integer-Scaled Subpixel Matrix Demonstration */
                    <g>
                      <rect x="0" y="0" width="208" height="187" fill="#191A3B" />
                      {/* Magnified 1600x1440 subpixel grid lattice */}
                      {Array.from({ length: 13 }).map((_, row) =>
                        Array.from({ length: 14 }).map((__, col) => {
                          const isLit =
                            (row + col) % 3 === 0 ||
                            (row >= 4 && row <= 8 && col >= 4 && col <= 9);
                          const cellColor =
                            row === 6 && col === 7
                              ? '#FFD06A'
                              : (row + col) % 4 === 0
                              ? '#6DDCC5'
                              : isLit
                              ? '#FF907A'
                              : '#2F644F';
                          return (
                            <g key={`${row}-${col}`} transform={`translate(${col * 14 + 7}, ${row * 14 + 4})`}>
                              <rect
                                x="0"
                                y="0"
                                width="12"
                                height="12"
                                fill={cellColor}
                                opacity={isLit ? 0.95 : 0.35}
                              />
                              {/* Individual sub-pixel RGB/aperture lines */}
                              <rect x="1" y="1" width="3" height="10" fill="rgba(255,255,255,0.18)" />
                            </g>
                          );
                        })
                      )}
                      <rect
                        x="10"
                        y="148"
                        width="188"
                        height="28"
                        rx="3"
                        fill="rgba(35, 36, 79, 0.92)"
                        stroke="#6DDCC5"
                        strokeWidth="1.5"
                      />
                      <text
                        x="104"
                        y="166"
                        textAnchor="middle"
                        fill="#FFF1D3"
                        fontSize="10"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        10× INTEGER SCALE · 615 PPI
                      </text>
                    </g>
                  ) : (
                    /* DEVICE VIEW: Crisp Original WARP & WANDER Horizon Artwork on Screen */
                    <g>
                      {/* Warm sky gradient inside screen */}
                      <rect x="0" y="0" width="208" height="65" fill="#23244F" />
                      <rect x="0" y="65" width="208" height="45" fill="#604A79" />
                      <rect x="0" y="110" width="208" height="42" fill="#FFD06A" />
                      {/* Sun disk */}
                      <circle cx="104" cy="98" r="24" fill="#FFF1D3" />
                      {/* Layered mountain silhouettes */}
                      <polygon points="0,125 48,88 96,125" fill="#23244F" />
                      <polygon points="64,125 128,76 190,125" fill="#604A79" />
                      <polygon points="140,125 182,92 208,125" fill="#23244F" />
                      {/* Foreground Fern Forest & Lagoon reflection */}
                      <rect x="0" y="125" width="208" height="32" fill="#2F644F" />
                      <rect x="0" y="157" width="208" height="30" fill="#6DDCC5" opacity="0.85" />
                      {/* Crisp vector badge on screen */}
                      <rect
                        x="28"
                        y="18"
                        width="152"
                        height="24"
                        rx="4"
                        fill="rgba(35,36,79,0.85)"
                        stroke="#FFD06A"
                        strokeWidth="1"
                      />
                      <text
                        x="104"
                        y="34"
                        textAnchor="middle"
                        fill="#FFF1D3"
                        fontSize="9.5"
                        fontFamily="JetBrains Mono, monospace"
                        letterSpacing="1"
                      >
                        3.5&quot; · 1600 × 1440 LCD
                      </text>
                    </g>
                  )}

                  {/* Optical Laminated Gorilla Glass Diagonal Sheen */}
                  <polygon points="0,0 135,0 65,187 0,187" fill="url(#glassSheen)" />
                </g>

                {/* Subtle Screen Bezel Branding */}
                <text
                  x="150"
                  y="237"
                  textAnchor="middle"
                  fill={isWhite ? '#71717A' : '#52525B'}
                  fontSize="7.5"
                  fontFamily="DM Sans, sans-serif"
                  letterSpacing="2.5"
                >
                  ANALOGUE POCKET
                </text>

                {/* ================= PHYSICAL CONTROLS SECTION ================= */}
                {/* Left: Iconic Recessed Cross Directional Pad */}
                <g
                  transform="translate(78, 326)"
                  className={
                    variant === 'precision-inspector' && activeMarkerId === 'dpad'
                      ? 'opacity-100'
                      : 'opacity-95'
                  }
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="42"
                    fill={isWhite ? '#ECEAE4' : '#141418'}
                    stroke={
                      variant === 'precision-inspector' && activeMarkerId === 'dpad'
                        ? '#FFD06A'
                        : controlStroke
                    }
                    strokeWidth={
                      variant === 'precision-inspector' && activeMarkerId === 'dpad' ? '2.5' : '1'
                    }
                  />
                  {/* Cross arms */}
                  <rect
                    x="-13"
                    y="-34"
                    width="26"
                    height="68"
                    rx="4"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  <rect
                    x="-34"
                    y="-13"
                    width="68"
                    height="26"
                    rx="4"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Center Seamless Cover over Cross Intersection */}
                  <rect x="-12" y="-12" width="24" height="24" fill={controlFill} />
                  {/* Central Pivot Dish */}
                  <circle cx="0" cy="0" r="6" fill={isWhite ? '#DCD9D0' : '#1B1B21'} />
                  {/* Directional micro-ticks */}
                  <rect x="-1.5" y="-28" width="3" height="7" rx="1" fill={labelText} />
                  <rect x="-1.5" y="21" width="3" height="7" rx="1" fill={labelText} />
                  <rect x="-28" y="-1.5" width="7" height="3" rx="1" fill={labelText} />
                  <rect x="21" y="-1.5" width="7" height="3" rx="1" fill={labelText} />
                </g>

                {/* Right: Four Precision Action Face Buttons (Diamond Layout) */}
                <g transform="translate(220, 324)">
                  {variant === 'precision-inspector' && activeMarkerId === 'buttons' && (
                    <circle
                      cx="0"
                      cy="0"
                      r="48"
                      fill="none"
                      stroke="#FFD06A"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                  )}
                  {/* Top Button (X) */}
                  <circle
                    cx="0"
                    cy="-27"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Bottom Button (B) */}
                  <circle
                    cx="0"
                    cy="27"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Left Button (Y) */}
                  <circle
                    cx="-27"
                    cy="0"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                  {/* Right Button (A) */}
                  <circle
                    cx="27"
                    cy="0"
                    r="13.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.5"
                  />
                </g>

                {/* Bottom Center: Three Pill System Buttons (SELECT, ANALOGUE, START) */}
                <g transform="translate(150, 424)">
                  <rect
                    x="-42"
                    y="-5"
                    width="20"
                    height="9"
                    rx="4.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.2"
                  />
                  <rect
                    x="-11"
                    y="-6"
                    width="22"
                    height="11"
                    rx="5.5"
                    fill={controlFill}
                    stroke="#FFD06A"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="22"
                    y="-5"
                    width="20"
                    height="9"
                    rx="4.5"
                    fill={controlFill}
                    stroke={controlStroke}
                    strokeWidth="1.2"
                  />
                </g>

                {/* Bottom Right: Precision Machined Speaker Grille Perforations */}
                <g transform="translate(206, 444)">
                  {Array.from({ length: 3 }).map((_, r) =>
                    Array.from({ length: 6 }).map((__, c) => (
                      <circle
                        key={`spk-${r}-${c}`}
                        cx={c * 7}
                        cy={r * 7}
                        r="1.6"
                        fill={isWhite ? '#A19E95' : '#09090C'}
                      />
                    ))
                  )}
                </g>

                {/* Bottom Edge USB-C & Status LED */}
                <circle cx="115" cy="488" r="2" fill="#6DDCC5" />
                <rect x="138" y="489" width="24" height="3" rx="1.5" fill="#09090C" />
              </g>
            ) : (
              /* ================= REAR CARTRIDGE BAY & SHOULDER TRIGGERS VIEW ================= */
              <g>
                <rect
                  x="18"
                  y="12"
                  width="264"
                  height="480"
                  rx="26"
                  ry="26"
                  fill={`url(#shellGrad-${colorway})`}
                  stroke={shellEdge}
                  strokeWidth="2.5"
                />
                {/* Recessed Multi-Format Cartridge Bay */}
                <rect
                  x="48"
                  y="18"
                  width="204"
                  height="168"
                  rx="10"
                  fill={isWhite ? '#E2E0D8' : '#111115'}
                  stroke={controlStroke}
                  strokeWidth="2"
                />
                {/* Physical Classic Cartridge Seated in Slot */}
                <rect
                  x="62"
                  y="10"
                  width="176"
                  height="156"
                  rx="6"
                  fill="#2F644F"
                  stroke="#FFD06A"
                  strokeWidth="2"
                />
                <rect x="78" y="28" width="144" height="68" rx="4" fill="#23244F" />
                <text
                  x="150"
                  y="60"
                  textAnchor="middle"
                  fill="#FFD06A"
                  fontSize="11"
                  fontFamily="Pixelify Sans, monospace"
                >
                  PHYSICAL CARTRIDGE BAY
                </text>
                <text
                  x="150"
                  y="78"
                  textAnchor="middle"
                  fill="#FFF1D3"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  GB · GBC · GBA + ADAPTERS
                </text>

                {/* Sculpted Left & Right Shoulder Triggers */}
                <rect
                  x="22"
                  y="194"
                  width="68"
                  height="26"
                  rx="6"
                  fill={controlFill}
                  stroke={controlStroke}
                  strokeWidth="1.5"
                />
                <rect
                  x="210"
                  y="194"
                  width="68"
                  height="26"
                  rx="6"
                  fill={controlFill}
                  stroke={controlStroke}
                  strokeWidth="1.5"
                />
                <text
                  x="150"
                  y="320"
                  textAnchor="middle"
                  fill={labelText}
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="2"
                >
                  DUAL FPGA HARDWARE CORE
                </text>
              </g>
            )}
          </svg>

          {/* Interactive Precision Feature Hotspots for Act 3 (Clockwork Ridge) */}
          {variant === 'precision-inspector' &&
            markers.map((marker) => {
              const isSelected = marker.id === activeMarkerId;
              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => onSelectMarker?.(marker.id)}
                  style={{
                    left: `${marker.coordinates.xPercent}%`,
                    top: `${marker.coordinates.yPercent}%`,
                  }}
                  aria-label={`Inspect ${marker.label}`}
                  aria-pressed={isSelected}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center ww-font-hud font-hud text-xs font-bold transition-transform cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFD06A] text-[#23244F] border-2 border-[#23244F] scale-110 shadow-[0_4px_0_0_#151633]'
                      : 'bg-[#23244F]/95 text-[#FFF1D3] border-2 border-[#FFD06A] hover:scale-105'
                  }`}
                >
                  {marker.code.replace('M-', '')}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
