'use client';

import React, { useMemo, useState } from 'react';
import { Check, Copy, RotateCcw, Sun, ArrowDown } from 'lucide-react';
import {
  ARRANGEMENT_PATTERNS,
  ConfiguratorState,
  MATERIAL_FINISHES,
  TILE_SHAPES,
  TileShapeId,
  TessellatedTile,
  calculateAcousticMetrics,
  formatSpecificationSummary,
  generateWallTessellation,
  getMaterialSpec,
  getShapeSpec,
  rotateTileOrientation,
} from '../domain/tesseraSystem';
import { MagneticButton } from './InteractivePrimitives';
import { playTactileClick } from '../utils/acousticAudio';

interface ProductConfiguratorProps {
  config: ConfiguratorState;
  onChangeConfig: React.Dispatch<React.SetStateAction<ConfiguratorState>>;
  onResetConfig: () => void;
  onTransferToInquiry: (summaryText: string, areaSqM: number) => void;
}

/**
 * Renders an authentic raking-light architectural relief tile SVG for each of the 4 shapes.
 */
const SculptedTileGraphic: React.FC<{
  shape: TileShapeId;
  tile: TessellatedTile;
  primaryHex: string;
  highlightHex: string;
  shadowHex: string;
  accentHex: string;
  lightAngleDeg: number;
}> = ({
  shape,
  tile,
  primaryHex,
  highlightHex,
  shadowHex,
  accentHex,
  lightAngleDeg,
}) => {
  // Compute effective light vector relative to tile's rotation
  const effectiveAngleRad = ((lightAngleDeg - tile.rotation) * Math.PI) / 180;
  const lx = Math.cos(effectiveAngleRad);
  const ly = Math.sin(effectiveAngleRad);

  const upperLit = ly < 0.25;
  const leftLit = lx < 0;

  const faceTop = upperLit ? highlightHex : shadowHex;
  const faceBottom = upperLit ? shadowHex : highlightHex;
  const faceLeft = leftLit ? highlightHex : primaryHex;
  const faceRight = leftLit ? shadowHex : highlightHex;

  if (shape === 'fluted-ridge') {
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <rect width="100" height="100" fill={shadowHex} />
        {[0, 1, 2, 3, 4].map((rib) => {
          const x = rib * 20;
          return (
            <g key={rib}>
              <rect x={x} y="0" width="9" height="100" fill={faceLeft} />
              <rect x={x + 9} y="0" width="7" height="100" fill={primaryHex} />
              <rect x={x + 16} y="0" width="4" height="100" fill={shadowHex} />
            </g>
          );
        })}
        {/* Subtle cross-baffle bronze cleat detail */}
        <circle cx="12" cy="12" r="2.6" fill={accentHex} />
        <circle cx="88" cy="88" r="2.6" fill={accentHex} opacity="0.6" />
      </svg>
    );
  }

  if (shape === 'beveled-prism') {
    const apexX = 64;
    const apexY = 38;
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        {/* 4 oblique pyramid-prism facets meeting at asymmetric apex */}
        <polygon points={`0,0 100,0 ${apexX},${apexY}`} fill={faceTop} />
        <polygon points={`100,0 100,100 ${apexX},${apexY}`} fill={faceRight} />
        <polygon points={`100,100 0,100 ${apexX},${apexY}`} fill={faceBottom} />
        <polygon points={`0,100 0,0 ${apexX},${apexY}`} fill={faceLeft} />
        {/* Acoustic micro-slot channel along primary ridge */}
        <line
          x1="0"
          y1="100"
          x2={apexX}
          y2={apexY}
          stroke={accentHex}
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
        <circle cx={apexX} cy={apexY} r="2.4" fill={accentHex} />
      </svg>
    );
  }

  if (shape === 'parabolic-dish') {
    const gradId = `dish-${tile.key}-${Math.round(lightAngleDeg)}`;
    const cx = 50 - lx * 14;
    const cy = 50 - ly * 14;
    return (
      <svg
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${tile.rotation}deg)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={gradId} cx={`${cx}%`} cy={`${cy}%`} r="62%">
            <stop offset="0%" stopColor={shadowHex} />
            <stop offset="68%" stopColor={primaryHex} />
            <stop offset="100%" stopColor={highlightHex} />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={primaryHex} />
        <polygon points="0,0 100,0 88,12 12,12" fill={faceTop} opacity="0.65" />
        <polygon points="0,100 100,100 88,88 12,88" fill={faceBottom} opacity="0.65" />
        <circle
          cx="50"
          cy="50"
          r="37"
          fill={`url(#${gradId})`}
          stroke={accentHex}
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="50" r="11" fill={shadowHex} opacity="0.85" />
        <circle cx="50" cy="50" r="3" fill={accentHex} />
      </svg>
    );
  }

  // 'slotted-louver'
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${tile.rotation}deg)` }}
      className="w-full h-full transition-transform duration-300 ease-out"
      aria-hidden="true"
    >
      <rect width="100" height="100" fill={shadowHex} />
      {/* Solid beveled frame left + angled deep acoustic louvers right */}
      <polygon points="0,0 44,0 36,100 0,100" fill={faceLeft} />
      {[12, 32, 52, 72].map((yPos) => (
        <g key={yPos}>
          <polygon
            points={`42,${yPos} 96,${yPos - 4} 96,${yPos + 8} 40,${yPos + 12}`}
            fill={upperLit ? highlightHex : primaryHex}
          />
          <line
            x1="42"
            y1={yPos}
            x2="96"
            y2={yPos - 4}
            stroke={accentHex}
            strokeOpacity="0.45"
            strokeWidth="1"
          />
        </g>
      ))}
      <circle cx="14" cy="14" r="2.5" fill={accentHex} />
    </svg>
  );
};

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  config,
  onChangeConfig,
  onResetConfig,
  onTransferToInquiry,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSpecPreview, setShowSpecPreview] = useState(false);

  const tiles = useMemo(() => generateWallTessellation(config), [config]);
  const metrics = useMemo(() => calculateAcousticMetrics(config), [config]);
  const shapeSpec = getShapeSpec(config.shape);
  const materialSpec = getMaterialSpec(config.material);
  const specSummary = useMemo(
    () => formatSpecificationSummary(config, metrics),
    [config, metrics],
  );

  const handleTileClick = (tile: TessellatedTile) => {
    playTactileClick(320);
    const nextRot = rotateTileOrientation(tile.rotation);
    onChangeConfig((prev) => ({
      ...prev,
      customRotations: {
        ...prev.customRotations,
        [tile.key]: nextRot,
      },
    }));
  };

  const handleCopySpec = async () => {
    playTactileClick(290);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(specSummary);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = specSummary;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setShowSpecPreview(true);
    window.setTimeout(() => setCopied(false), 2800);
  };

  const customOverrideCount = Object.keys(config.customRotations).length;

  return (
    <section
      id="configurator"
      className="py-24 sm:py-32 bg-[#111419] border-t border-slate-200/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
              <span>06. Interactive Architectural Studio</span>
              <span aria-hidden="true">·</span>
              <span>CSI 09 84 33 Specification Builder</span>
            </div>
            <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.25rem)] leading-[1.1] font-normal text-[#F8FAFC]">
              Compose your elevation and verify acoustic absorption in real time.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playTactileClick(180);
                onResetConfig();
                setCopied(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md bg-[#0B0D10] text-[#CBD5E1] border border-slate-200/15 hover:border-[#C89D66] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C89D66]" />
              <span>Reset Installation</span>
            </button>

            <MagneticButton
              variant="primary"
              onClick={handleCopySpec}
              className="py-2 px-4 text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Specification Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Configuration</span>
                </>
              )}
            </MagneticButton>
          </div>
        </div>

        {/* Main Studio Grid: Left Live Sculptural Elevation Preview (7 cols) + Right Parameter Controls (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Elevation Wall Canvas & Acoustic Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-7 space-y-5">
              {/* Top Elevation Dimension & Raking Light Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/10">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#94A3B8]">
                  <span className="text-[#F1F5F9] font-medium">
                    {metrics.wallWidthMeters}m × {metrics.wallHeightMeters}m Elevation
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{metrics.tileCount} Modules</span>
                  {customOverrideCount > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#E2C399]">
                        {customOverrideCount} Rotated
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Sun className="w-3.5 h-3.5 text-[#C89D66]" aria-hidden="true" />
                  <label
                    htmlFor="raking-light-slider"
                    className="text-xs font-mono-tabular text-[#94A3B8] whitespace-nowrap"
                  >
                    Grazing Light: {config.lightAngleDeg}°
                  </label>
                  <input
                    id="raking-light-slider"
                    type="range"
                    min={15}
                    max={165}
                    value={config.lightAngleDeg}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({
                        ...prev,
                        lightAngleDeg: Number(e.target.value),
                      }))
                    }
                    className="arch-slider w-24"
                  />
                </div>
              </div>

              {/* Interactive Sculptural Tile Wall Matrix */}
              <div className="py-3 flex items-center justify-center min-h-[300px] sm:min-h-[360px]">
                <div
                  data-testid="configurator-wall-grid"
                  style={{
                    gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
                  }}
                  className="grid gap-1.5 sm:gap-2 w-full max-w-[600px] p-3 sm:p-4 rounded-lg bg-[#141820] border border-slate-200/15 shadow-2xl"
                >
                  {tiles.map((tile) => (
                    <button
                      key={tile.key}
                      type="button"
                      data-cursor="ROTATE 90°"
                      aria-label={`Tile column ${tile.col + 1} row ${tile.row + 1}, rotated ${tile.rotation} degrees. Click to rotate 90 degrees.`}
                      onClick={() => handleTileClick(tile)}
                      className="aspect-square w-full overflow-hidden rounded-[2px] border border-black/40 hover:border-[#C89D66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] transition-transform active:scale-95 cursor-pointer"
                    >
                      <SculptedTileGraphic
                        shape={config.shape}
                        tile={tile}
                        primaryHex={materialSpec.primaryHex}
                        highlightHex={materialSpec.highlightHex}
                        shadowHex={materialSpec.shadowHex}
                        accentHex={materialSpec.accentHex}
                        lightAngleDeg={config.lightAngleDeg}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8] pt-3 border-t border-slate-200/10">
                <span>
                  Tip: Click or select any individual module above to rotate its facet
                  by 90°.
                </span>
                <button
                  type="button"
                  onClick={() => setShowSpecPreview((prev) => !prev)}
                  className="text-xs font-mono-tabular text-[#E2C399] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showSpecPreview ? 'Hide CSI Summary' : 'Preview CSI Summary'}
                </button>
              </div>

              {/* Live Copyable CSI Specification Text Output */}
              {showSpecPreview && (
                <pre
                  data-testid="csi-spec-output"
                  className="bg-[#111419] border border-[#C89D66]/35 rounded-lg p-4 text-xs font-mono-tabular text-[#E2E8F0] whitespace-pre-wrap leading-relaxed overflow-x-auto"
                >
                  {specSummary}
                </pre>
              )}
            </div>

            {/* Live Acoustic & Structural Performance Readout */}
            <div className="bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-[11px] text-[#64748B]">System NRC Rating</div>
                  <div
                    data-testid="metric-nrc"
                    className="font-mono-tabular text-2xl font-medium text-[#E2C399] mt-0.5"
                  >
                    {metrics.nrc.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B]">Total Absorption</div>
                  <div
                    data-testid="metric-sabins"
                    className="font-mono-tabular text-2xl font-medium text-[#F8FAFC] mt-0.5"
                  >
                    {metrics.sabinsMetric} m²
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B]">Chamber RT60 Shift</div>
                  <div className="font-mono-tabular text-lg sm:text-xl font-medium text-[#F8FAFC] mt-1">
                    {metrics.rt60UntreatedSec}s → {metrics.rt60TreatedSec}s
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#64748B]">Coverage &amp; Mass</div>
                  <div className="font-mono-tabular text-lg sm:text-xl font-medium text-[#F8FAFC] mt-1">
                    {metrics.wallAreaSqM} m² · {metrics.totalMassKg} kg
                  </div>
                </div>
              </div>

              {/* Live 6-Band Frequency Bar Strip */}
              <div className="pt-4 border-t border-slate-200/10">
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8] mb-2.5">
                  <span>Predicted Sound Absorption by Octave Band (ISO 354)</span>
                  <span>-{metrics.rt60ReductionPercent}% Reverberation</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {metrics.frequencyAbsorption.map((band) => (
                    <div key={band.hz} className="space-y-1">
                      <div className="h-2 w-full bg-[#161A21] rounded-full overflow-hidden">
                        <div
                          style={{ width: `${Math.round(band.alpha * 100)}%` }}
                          className="h-full bg-[#C89D66] transition-all duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#94A3B8]">
                        <span>{band.hz >= 1000 ? `${band.hz / 1000}k` : band.hz}</span>
                        <span className="text-[#F1F5F9]">{band.alpha.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Configuration Controls Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#0B0D10] border border-slate-200/12 rounded-xl p-5 sm:p-7 space-y-7">
            {/* Step 1: Tile Geometry */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  01. MODULE GEOMETRY
                </span>
                <span className="text-xs font-mono-tabular text-[#E2C399]">
                  {shapeSpec.depthMm} mm Relief
                </span>
              </div>
              <div
                role="radiogroup"
                aria-label="Select Tile Shape"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {TILE_SHAPES.map((shape) => {
                  const active = config.shape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        playTactileClick(240);
                        onChangeConfig((prev) => ({ ...prev, shape: shape.id }));
                      }}
                      className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                        active
                          ? 'bg-[#161A21] border-[#C89D66] text-[#F8FAFC]'
                          : 'bg-[#111419] border-slate-200/10 text-[#94A3B8] hover:border-slate-200/30 hover:text-[#F1F5F9]'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#F8FAFC]">
                        {shape.name}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-1">
                        {shape.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Material Finish */}
            <div className="space-y-3 pt-5 border-t border-slate-200/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  02. ARCHITECTURAL FINISH
                </span>
                <span className="text-xs font-medium text-[#F1F5F9]">
                  {materialSpec.name}
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Select Material Finish"
                className="grid grid-cols-5 gap-2.5"
              >
                {MATERIAL_FINISHES.map((mat) => {
                  const active = config.material === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={mat.name}
                      onClick={() => {
                        playTactileClick(260);
                        onChangeConfig((prev) => ({ ...prev, material: mat.id }));
                      }}
                      className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                        active
                          ? 'bg-[#161A21] border-[#C89D66]'
                          : 'bg-[#111419] border-slate-200/10 hover:border-slate-200/30'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          background: `radial-gradient(circle at 32% 30%, ${mat.highlightHex}, ${mat.primaryHex} 65%, ${mat.shadowHex})`,
                        }}
                        className="w-8 h-8 rounded-full border border-white/15"
                      />
                      <span className="text-[10px] text-center text-[#CBD5E1] truncate w-full">
                        {mat.name.split(' ')[1] || mat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Tessellation Pattern */}
            <div className="space-y-3 pt-5 border-t border-slate-200/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tabular text-[#94A3B8]">
                  03. TESSELLATION PATTERN
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label="Select Arrangement Pattern"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {ARRANGEMENT_PATTERNS.map((pat) => {
                  const active = config.pattern === pat.id;
                  return (
                    <button
                      key={pat.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        playTactileClick(275);
                        onChangeConfig((prev) => ({
                          ...prev,
                          pattern: pat.id,
                          customRotations: {},
                        }));
                      }}
                      className={`text-left p-3 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] ${
                        active
                          ? 'bg-[#161A21] border-[#C89D66] text-[#F8FAFC]'
                          : 'bg-[#111419] border-slate-200/10 text-[#94A3B8] hover:border-slate-200/30 hover:text-[#F1F5F9]'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold text-[#F8FAFC]">
                        {pat.name}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-1">
                        {pat.architecturalIntent}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Elevation Matrix Dimensions */}
            <div className="space-y-4 pt-5 border-t border-slate-200/10">
              <span className="block text-xs font-mono-tabular text-[#94A3B8]">
                04. WALL MATRIX DIMENSIONS (600 MM MODULES)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-tabular">
                    <label htmlFor="wall-cols-slider" className="text-[#CBD5E1]">
                      Columns
                    </label>
                    <span className="text-[#E2C399]">
                      {config.columns} ({metrics.wallWidthMeters}m)
                    </span>
                  </div>
                  <input
                    id="wall-cols-slider"
                    type="range"
                    min={4}
                    max={10}
                    value={config.columns}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({
                        ...prev,
                        columns: Number(e.target.value),
                      }))
                    }
                    className="arch-slider w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-tabular">
                    <label htmlFor="wall-rows-slider" className="text-[#CBD5E1]">
                      Rows
                    </label>
                    <span className="text-[#E2C399]">
                      {config.rows} ({metrics.wallHeightMeters}m)
                    </span>
                  </div>
                  <input
                    id="wall-rows-slider"
                    type="range"
                    min={3}
                    max={6}
                    value={config.rows}
                    onChange={(e) =>
                      onChangeConfig((prev) => ({
                        ...prev,
                        rows: Number(e.target.value),
                      }))
                    }
                    className="arch-slider w-full"
                  />
                </div>
              </div>
            </div>

            {/* Action Footer inside Configurator */}
            <div className="pt-5 border-t border-slate-200/10 flex flex-col gap-2.5">
              <MagneticButton
                variant="primary"
                onClick={() => {
                  onTransferToInquiry(specSummary, metrics.wallAreaSqM);
                  document.getElementById('inquire')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full justify-center"
              >
                Attach Specification to Sample Dossier
                <ArrowDown className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
