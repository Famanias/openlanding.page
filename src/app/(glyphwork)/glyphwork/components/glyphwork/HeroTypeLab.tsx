'use client';

import React, { useRef } from 'react';
import {
  CaseMode,
  SpecimenMode,
  VariableAxesState,
  applyCaseTransform,
  buildFontVariationSettings,
  computeGuideMetrics,
  formatTrackingCss,
} from '../../utils/typographyLogic';
import { VariableControls } from './VariableControls';

interface HeroTypeLabProps {
  text: string;
  headlineText: string;
  paragraphText: string;
  mode: SpecimenMode;
  caseMode: CaseMode;
  axes: VariableAxesState;
  selectedGlyph: string;
  canUndo: boolean;
  fontLoaded: boolean;
  onTextChange: (newText: string) => void;
  onHeadlineChange: (newHeadline: string) => void;
  onParagraphChange: (newParagraph: string) => void;
  onAxisChange: (axis: keyof VariableAxesState, value: number) => void;
  onModeChange: (mode: SpecimenMode) => void;
  onSelectGlyph: (glyph: string, scrollToInspector?: boolean) => void;
  onUndo: () => void;
  onReset: () => void;
  onNavigateLicensing: () => void;
}

const CrosshairMark: React.FC<{ filled?: boolean; className?: string }> = ({
  filled = false,
  className = '',
}) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <circle cx="11" cy="11" r="7" stroke="#111111" strokeWidth="1.2" />
    {filled && <circle cx="11" cy="11" r="3.5" fill="#111111" />}
    <line x1="11" y1="0" x2="11" y2="22" stroke="#111111" strokeWidth="1" />
    <line x1="0" y1="11" x2="22" y2="11" stroke="#111111" strokeWidth="1" />
  </svg>
);

export const HeroTypeLab: React.FC<HeroTypeLabProps> = ({
  text,
  headlineText,
  paragraphText,
  mode,
  caseMode,
  axes,
  canUndo,
  onTextChange,
  onHeadlineChange,
  onParagraphChange,
  onAxisChange,
  onModeChange,
  onUndo,
  onReset,
  onNavigateLicensing,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const displayString = applyCaseTransform(text || 'GLYPHWORK', caseMode);
  const guideMetrics = computeGuideMetrics(axes, displayString.length);
  const variationSettings = buildFontVariationSettings(axes);
  const trackingCss = formatTrackingCss(axes.tracking);

  const charCount = Math.max(4, displayString.length);
  const dynamicVw = Math.min(
    13.2,
    (116 / charCount) * (112 / Math.max(70, axes.width))
  );

  const handleFocusSpecimen = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  return (
    <section
      id="hero-lab"
      aria-label="Hero Live Specimen Laboratory"
      className="relative min-h-screen w-full lg:pr-[52px] flex flex-col justify-between bg-[#F7F7F0] text-[#111111] border-b border-[#111111] overflow-hidden"
    >
      {/* Top Row: Upper-left GLYPHWORK Foundry Stamp */}
      <div className="w-full px-5 sm:px-8 pt-5 sm:pt-6 flex items-start justify-between gap-4 z-20">
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="relative border border-[#111111] px-2.5 py-1 bg-[#F7F7F0]">
            <span
              aria-hidden="true"
              className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-[#111111]"
            />
            <h1
              className="block text-[24px] sm:text-[28px] leading-none tracking-[-0.02em] text-[#111111] select-none m-0 font-normal"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: "'wght' 760, 'wdth' 62, 'slnt' 0, 'opsz' 144",
              }}
            >
              GLYPHWORK
            </h1>
          </div>

          <div className="gw-mono text-[11px] sm:text-[12px] leading-[1.35] tracking-[0.03em] text-[#111111]">
            <div>INDIE TYPE FOUNDRY [EST 2024]</div>
            <div>OPENLANDING COLLECTION 090</div>
          </div>
        </div>
      </div>

      {/* Center Stage: Full-Viewport Giant Editable Variable Specimen + Guide Rails */}
      <div className="relative flex-1 flex flex-col justify-center my-2 sm:my-4 py-4 sm:py-6">
        <div className="relative w-full pt-12 pb-8 sm:pt-16 sm:pb-10">
          {/* CAP-HEIGHT GUIDE LINE (#F02F83) */}
          <div
            aria-hidden="true"
            className="gw-animate-guide pointer-events-none absolute left-0 right-0 h-[1.5px] bg-[#F02F83] z-20 transition-all duration-150 flex items-center justify-between px-5 sm:px-8"
            style={{ top: '18%' }}
          >
            <span className="gw-mono text-[11px] sm:text-[12px] text-[#F02F83] font-medium bg-[#F7F7F0]/90 pr-2 -translate-y-3.5">
              {guideMetrics.capHeightLabel}
            </span>
            <span className="hidden sm:inline gw-mono text-[11px] text-[#111111]/80 bg-[#F7F7F0]/90 px-2 -translate-y-3.5">
              {guideMetrics.coordinateReadout}
            </span>
            <div className="flex items-center gap-2 bg-[#F7F7F0]/90 pl-2 -translate-y-4 pointer-events-auto">
              <button
                type="button"
                onClick={handleFocusSpecimen}
                className="gw-mono text-[11px] text-[#111111] hover:text-[#F02F83] transition-colors cursor-pointer"
              >
                [EDITABLE TEST STRING]
              </button>
              <CrosshairMark filled />
            </div>
          </div>

          {/* X-HEIGHT GUIDE LINE (#6E57D5) */}
          <div
            aria-hidden="true"
            className="gw-animate-guide pointer-events-none absolute left-0 right-0 h-[1.5px] bg-[#6E57D5] z-20 transition-all duration-150"
            style={{ top: '40%' }}
          >
            <span className="gw-mono text-[11px] sm:text-[12px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1.5 ml-5 sm:ml-8 -translate-y-4 inline-block">
              {guideMetrics.xHeightLabel}
            </span>
          </div>

          {/* BASELINE GUIDE LINE (#6E57D5) */}
          <div
            aria-hidden="true"
            className="gw-animate-guide pointer-events-none absolute left-0 right-0 h-[1.5px] bg-[#6E57D5] z-20 transition-all duration-150"
            style={{ top: '74%' }}
          >
            <span className="gw-mono text-[11px] sm:text-[12px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1.5 ml-5 sm:ml-8 -translate-y-4 inline-block">
              {guideMetrics.baselineLabel}
            </span>
          </div>

          {/* Left & Right Vertical Bounding Dotted Lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden sm:block absolute top-[12%] bottom-[16%] left-[8.5%] border-l border-dashed border-[#111111]/45 z-10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none hidden sm:block absolute top-[12%] bottom-[16%] right-[5.5%] border-r border-dashed border-[#111111]/45 z-10"
          />

          {/* Subtle Node Callouts & Crosshairs matching header-reference.webp */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex items-center gap-1 absolute left-[17%] top-[45%] z-20 gw-mono text-[10px] text-[#111111]"
          >
            <span>nodes</span>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex items-center gap-1 absolute left-[38%] top-[57%] z-20 gw-mono text-[10px] text-[#111111]"
          >
            <span>nodes</span>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:flex items-center gap-1 absolute left-[68.5%] bottom-[21%] z-20 gw-mono text-[10px] text-[#111111]"
          >
            <span>nodes</span>
          </div>

          <CrosshairMark className="hidden md:block absolute left-[6.2%] top-[47%]" />
          <CrosshairMark className="hidden md:block absolute right-[3.2%] top-[47%]" />

          {/* LIVE EDITABLE SPECIMEN STAGE */}
          <div className="gw-animate-hero relative z-10 w-full px-4 sm:px-10 flex items-center justify-center">
            {mode === 'display' && (
              <div className="w-full flex items-center justify-center py-6 sm:py-10">
                <label htmlFor="gw-hero-specimen-input" className="sr-only">
                  Editable Display Specimen String
                </label>
                <input
                  ref={inputRef}
                  id="gw-hero-specimen-input"
                  type="text"
                  value={displayString}
                  aria-label="Editable Display Specimen String"
                  spellCheck={false}
                  autoComplete="off"
                  onChange={(e) => onTextChange(e.target.value)}
                  className="w-full text-center bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F02F83]/60 text-[#111111] p-0 m-0 leading-[0.82] selection:bg-[#E5F56B] selection:text-[#111111]"
                  style={{
                    fontFamily: 'var(--gw-font-specimen)',
                    fontVariationSettings: variationSettings,
                    letterSpacing: trackingCss,
                    fontSize: `clamp(2.35rem, ${dynamicVw.toFixed(2)}vw, 12.6rem)`,
                    transform: `scaleY(1.64)${
                      axes.slant > 10
                        ? ` skewX(${-(axes.slant - 10).toFixed(1)}deg)`
                        : ''
                    }`,
                    transformOrigin: 'center center',
                  }}
                />
              </div>
            )}

            {mode === 'headline' && (
              <div className="w-full max-w-[1240px] mx-auto py-6">
                <label htmlFor="gw-hero-headline-input" className="sr-only">
                  Editable Headline Specimen Text
                </label>
                <textarea
                  id="gw-hero-headline-input"
                  rows={2}
                  value={applyCaseTransform(headlineText, caseMode)}
                  aria-label="Editable Headline Specimen Text"
                  spellCheck={false}
                  onChange={(e) => onHeadlineChange(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F02F83]/60 text-[#111111] resize-none leading-[1.02] text-left"
                  style={{
                    fontFamily: 'var(--gw-font-specimen)',
                    fontVariationSettings: variationSettings,
                    letterSpacing: trackingCss,
                    fontSize: 'clamp(2.25rem, 4.8vw, 4.75rem)',
                  }}
                />
              </div>
            )}

            {mode === 'paragraph' && (
              <div className="w-full max-w-[1040px] mx-auto py-6">
                <label htmlFor="gw-hero-paragraph-input" className="sr-only">
                  Editable Paragraph Specimen Text
                </label>
                <textarea
                  id="gw-hero-paragraph-input"
                  rows={3}
                  value={applyCaseTransform(paragraphText, caseMode)}
                  aria-label="Editable Paragraph Specimen Text"
                  spellCheck={false}
                  onChange={(e) => onParagraphChange(e.target.value)}
                  className="w-full bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F02F83]/60 text-[#111111] resize-none leading-[1.45]"
                  style={{
                    fontFamily: 'var(--gw-font-specimen)',
                    fontVariationSettings: variationSettings,
                    letterSpacing: trackingCss,
                    fontSize: 'clamp(1.25rem, 2.2vw, 2rem)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Minimal Coordinate Marks below Baseline matching header-reference.webp */}
          <div className="w-full px-5 sm:px-8 mt-3 flex items-center justify-between gw-mono text-[11px]">
            <CrosshairMark filled />
            <CrosshairMark className="hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-[#111111]/85">{guideMetrics.coordinateReadout}</span>
              <CrosshairMark filled />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Row + Compact Mode/Undo/Reset + 4-Cell Instrument Strip */}
      <div className="w-full z-20">
        <div className="px-5 sm:px-8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 gw-mono">
            <div>
              <button
                type="button"
                onClick={handleFocusSpecimen}
                className="text-[13px] sm:text-[15px] font-medium tracking-[0.04em] text-[#111111] hover:text-[#F02F83] transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>TRY THE TYPEFACE</span>
                <span aria-hidden="true">———</span>
                <span className="underline decoration-1 underline-offset-4">
                  [ CLICK TO TEST RUN ] ↗
                </span>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={onNavigateLicensing}
                className="text-[13px] sm:text-[15px] font-medium tracking-[0.04em] text-[#111111] hover:text-[#6E57D5] transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>LICENSING FROM $49</span>
                <span aria-hidden="true">↘</span>
              </button>
            </div>
          </div>

          {/* Quiet Inline Mode + Undo/Reset Controls */}
          <div className="flex items-center gap-2 flex-wrap gw-mono text-[11px]">
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
                  className={`px-2.5 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#111111] text-[#E5F56B] border-[#111111] font-semibold'
                      : 'bg-transparent text-[#111111] border-[#111111]/30 hover:border-[#111111]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <span aria-hidden="true" className="text-[#111111]/30 mx-0.5">
              ·
            </span>

            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              aria-label="Undo last specimen or axis change"
              className={`px-2.5 py-1 border transition-colors whitespace-nowrap ${
                canUndo
                  ? 'border-[#111111] text-[#111111] hover:bg-[#E5F56B] cursor-pointer'
                  : 'border-[#111111]/20 text-[#111111]/35 cursor-not-allowed'
              }`}
            >
              Undo
            </button>
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset all variable font axes and specimen string"
              className="px-2.5 py-1 border border-[#111111] text-[#111111] hover:bg-[#F02F83] hover:text-[#F7F7F0] hover:border-[#F02F83] transition-colors cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Full-Width Bottom 4-Slider Instrument Strip */}
        <VariableControls axes={axes} onAxisChange={onAxisChange} />
      </div>
    </section>
  );
};
