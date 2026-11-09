'use client';

import React from 'react';
import {
  CaseMode,
  SPECIMEN_PRESETS,
  SpecimenMode,
  VariableAxesState,
  applyCaseTransform,
  buildFontVariationSettings,
  formatTrackingCss,
} from '../../utils/typographyLogic';

interface SpecimenModesProps {
  text: string;
  headlineText: string;
  paragraphText: string;
  mode: SpecimenMode;
  caseMode: CaseMode;
  axes: VariableAxesState;
  onModeChange: (mode: SpecimenMode) => void;
  onCaseModeChange: (caseMode: CaseMode) => void;
  onTextChange: (newText: string) => void;
  onHeadlineChange: (newHeadline: string) => void;
  onParagraphChange: (newParagraph: string) => void;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
  onApplyPreset: (presetId: string) => void;
  onSelectGlyph: (glyph: string, scrollToInspector?: boolean) => void;
}

const WATERFALL_CUTS = [
  { label: '150 · Condensed', wght: 150, wdth: 65, slnt: 0, sample: 'Archival Typometry 1968–2026' },
  { label: '500 · Extended', wght: 500, wdth: 132, slnt: 4, sample: 'Swiss Grid & Parametric Interpolation' },
  { label: '900 · Ultra Display', wght: 900, wdth: 148, slnt: 0, sample: 'GLYPHWORK SPECIMEN 090' },
];

export const SpecimenModes: React.FC<SpecimenModesProps> = ({
  text,
  headlineText,
  paragraphText,
  mode,
  caseMode,
  axes,
  onModeChange,
  onCaseModeChange,
  onTextChange,
  onHeadlineChange,
  onParagraphChange,
  onAxisChange,
  onApplyPreset,
}) => {
  const variationSettings = buildFontVariationSettings(axes);
  const trackingCss = formatTrackingCss(axes.tracking);

  return (
    <section
      id="specimen-modes"
      aria-label="Specimen Modes and Type Testing Environment"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Single Clean Control Bar */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex flex-wrap items-center justify-between gap-4 gw-mono text-[11px]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold tracking-[0.04em]">02 // TYPE TESTER</span>

          <div
            role="group"
            aria-label="Specimen Mode Selector"
            className="flex border border-[#111111] divide-x divide-[#111111]"
          >
            {(
              [
                { id: 'display', label: 'Display' },
                { id: 'headline', label: 'Headline' },
                { id: 'paragraph', label: 'Paragraph' },
              ] as Array<{ id: SpecimenMode; label: string }>
            ).map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onModeChange(item.id)}
                  aria-pressed={active}
                  className={`py-1 px-3 transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#F02F83] text-[#F7F7F0] font-semibold'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div
            role="group"
            aria-label="Case Mode Selector"
            className="flex border border-[#111111] divide-x divide-[#111111]"
          >
            {(
              [
                { id: 'preserve', label: 'Aa' },
                { id: 'upper', label: 'AA' },
                { id: 'lower', label: 'aa' },
              ] as Array<{ id: CaseMode; label: string }>
            ).map((c) => {
              const active = caseMode === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCaseModeChange(c.id)}
                  aria-pressed={active}
                  aria-label={`Set case mode to ${c.id}`}
                  className={`px-2.5 py-1 cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#E5F56B] text-[#111111] font-bold'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SPECIMEN_PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.id)}
              className="px-2.5 py-1 border border-[#111111]/35 hover:border-[#111111] hover:bg-[#E5F56B] transition-colors cursor-pointer whitespace-nowrap"
            >
              Preset 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Generous Open Editable Specimen Stage */}
      <div className="px-5 sm:px-8 lg:px-12 py-12 sm:py-16 border-b border-[#111111]">
        {mode === 'display' && (
          <div className="w-full">
            <label htmlFor="gw-section2-display-input" className="sr-only">
              Section 2 Editable Display String
            </label>
            <input
              id="gw-section2-display-input"
              type="text"
              value={applyCaseTransform(text, caseMode)}
              aria-label="Section 2 Editable Display String"
              spellCheck={false}
              onChange={(e) => onTextChange(e.target.value)}
              className="w-full bg-transparent border-0 focus:outline-none text-[#111111] leading-[0.9]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                letterSpacing: trackingCss,
                fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              }}
            />
          </div>
        )}

        {mode === 'headline' && (
          <div className="w-full">
            <label htmlFor="gw-section2-headline-input" className="sr-only">
              Section 2 Editable Headline Specimen
            </label>
            <textarea
              id="gw-section2-headline-input"
              rows={2}
              value={applyCaseTransform(headlineText, caseMode)}
              aria-label="Section 2 Editable Headline Specimen"
              spellCheck={false}
              onChange={(e) => onHeadlineChange(e.target.value)}
              className="w-full bg-transparent border-0 focus:outline-none text-[#111111] resize-none leading-[1.04]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                letterSpacing: trackingCss,
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              }}
            />
          </div>
        )}

        {mode === 'paragraph' && (
          <div className="max-w-4xl">
            <label htmlFor="gw-section2-paragraph-input" className="sr-only">
              Section 2 Editable Paragraph Specimen
            </label>
            <textarea
              id="gw-section2-paragraph-input"
              rows={4}
              value={applyCaseTransform(paragraphText, caseMode)}
              aria-label="Section 2 Editable Paragraph Specimen"
              spellCheck={false}
              onChange={(e) => onParagraphChange(e.target.value)}
              className="w-full bg-transparent border-0 focus:outline-none text-[#111111] resize-none leading-[1.5]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
                letterSpacing: trackingCss,
                fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
              }}
            />
          </div>
        )}
      </div>

      {/* Minimal 3-Row Visual Waterfall */}
      <div className="divide-y divide-[#111111]">
        {WATERFALL_CUTS.map((cut) => (
          <div
            key={cut.label}
            onClick={() => {
              onAxisChange('weight', cut.wght);
              onAxisChange('width', cut.wdth);
              onAxisChange('slant', cut.slnt);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onAxisChange('weight', cut.wght);
                onAxisChange('width', cut.wdth);
                onAxisChange('slant', cut.slnt);
              }
            }}
            aria-label={`Apply waterfall preset ${cut.label}`}
            className="px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[#E5F56B]/45 transition-colors cursor-pointer"
          >
            <span className="gw-mono text-[11px] text-[#111111]/60 shrink-0 sm:w-44">
              {cut.label}
            </span>
            <span
              className="text-[24px] sm:text-[36px] leading-tight text-[#111111] truncate flex-1"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: `'wght' ${cut.wght}, 'wdth' ${cut.wdth}, 'slnt' ${-cut.slnt}, 'opsz' 96`,
              }}
            >
              {applyCaseTransform(cut.sample, caseMode)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
