'use client';

import React, { useState } from 'react';
import {
  VariableAxesState,
  buildFontVariationSettings,
  computeLiveGlyphMetrics,
} from '../../utils/typographyLogic';

interface GlyphInspectorProps {
  selectedGlyph: string;
  axes: VariableAxesState;
  onSelectGlyph: (glyph: string) => void;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
}

const INSPECTOR_CHAR_SET = [
  'G', 'L', 'Y', 'P', 'H', 'W', 'O', 'R', 'K',
  'A', 'B', 'F', 'r', 'g', 'a', 'e', '0', '1',
];

export const GlyphInspector: React.FC<GlyphInspectorProps> = ({
  selectedGlyph,
  axes,
  onSelectGlyph,
}) => {
  const [showGuides, setShowGuides] = useState(true);

  const metrics = computeLiveGlyphMetrics(selectedGlyph, axes);
  const variationSettings = buildFontVariationSettings(axes);

  return (
    <section
      id="glyph-inspector"
      aria-label="Glyph Construction Microscope and Inspector"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Clean Section Header */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex items-center justify-between gap-4 gw-mono text-[11px]">
        <span className="font-bold tracking-[0.04em]">03 // GLYPH INSPECTOR</span>
        <button
          type="button"
          onClick={() => setShowGuides((v) => !v)}
          aria-pressed={showGuides}
          className={`px-2.5 py-0.5 border text-[11px] cursor-pointer transition-colors ${
            showGuides
              ? 'bg-[#111111] text-[#E5F56B] border-[#111111]'
              : 'bg-transparent text-[#111111] border-[#111111]/40'
          }`}
        >
          {showGuides ? '[×] Guides' : '[ ] Guides'}
        </button>
      </div>

      {/* Main 12-Column Microscope Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left Column (7 cols): Giant Glyph Viewport */}
        <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden p-6 bg-[#F7F7F0]">
          {showGuides && (
            <img
              src="/templates/glyphwork/glyphwork/glyph-specimen.svg"
              alt="Glyphwork technical specimen measurement grid overlay"
              referrerPolicy="no-referrer"
              className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-90"
            />
          )}

          {/* Giant Live HTML Variable Glyph with Clean Minimal Node Points */}
          <div className="relative z-10 flex items-center justify-center">
            <span
              data-testid="inspector-giant-glyph"
              className="select-none leading-none text-[#111111] block"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                fontSize: 'clamp(15rem, 25vw, 23rem)',
                transform:
                  axes.slant > 10
                    ? `skewX(${-(axes.slant - 10).toFixed(1)}deg)`
                    : undefined,
              }}
            >
              {metrics.char}
            </span>

            {showGuides &&
              metrics.nodeCoordinates.map((node) => (
                <div
                  key={node.id}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-20"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <span
                    className={`w-3 h-3 block border border-[#111111] ${
                      node.type === 'extremum'
                        ? 'bg-[#E5F56B]'
                        : node.type === 'off-curve'
                        ? 'bg-[#F02F83] rounded-full'
                        : 'bg-[#6E57D5] rounded-full'
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Column (5 cols): Clean Character Selector + Concise Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#111111]">
          {/* 18-Glyph Selector Grid */}
          <div className="p-6 sm:p-8">
            <div className="gw-mono text-[11px] text-[#111111]/60 mb-3">
              SELECT GLYPH
            </div>

            <div
              role="group"
              aria-label="Glyph Inspector Character Matrix"
              className="grid grid-cols-6 border-t border-l border-[#111111]"
            >
              {INSPECTOR_CHAR_SET.map((ch) => {
                const isSelected = metrics.char === ch;
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => onSelectGlyph(ch)}
                    aria-label={`Inspect glyph ${ch}`}
                    aria-pressed={isSelected}
                    className={`h-12 border-r border-b border-[#111111] flex items-center justify-center text-[20px] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5F56B] text-[#111111] font-bold'
                        : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111] hover:text-[#F7F7F0]'
                    }`}
                    style={{
                      fontFamily: 'var(--gw-font-specimen)',
                      fontVariationSettings: variationSettings,
                    }}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Concise Glyph Specs */}
          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="gw-mono text-[11px] text-[#F02F83] font-semibold">
                {metrics.unicode}
              </div>
              <h3
                className="text-[28px] sm:text-[34px] leading-tight text-[#111111] mt-1"
                style={{
                  fontFamily: 'var(--gw-font-specimen)',
                  fontVariationSettings: "'wght' 740, 'wdth' 115, 'slnt' 0, 'opsz' 72",
                }}
              >
                {metrics.name}
              </h3>
            </div>

            <dl className="grid grid-cols-3 border-t border-[#111111] pt-4 gw-mono text-[11px] gap-4">
              <div>
                <dt className="text-[#111111]/55">ADVANCE</dt>
                <dd className="text-[16px] font-bold mt-0.5">{metrics.effectiveAdvanceEm} EM</dd>
              </div>
              <div>
                <dt className="text-[#111111]/55">BEARINGS</dt>
                <dd className="text-[16px] font-bold mt-0.5">
                  {metrics.effectiveLsb} / {metrics.effectiveRsb}
                </dd>
              </div>
              <div>
                <dt className="text-[#111111]/55">NODES</dt>
                <dd className="text-[16px] font-bold mt-0.5">{metrics.bezierNodes}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
