'use client';

import React from 'react';
import {
  VariableAxesState,
  buildFontVariationSettings,
  formatTrackingCss,
} from '../../utils/typographyLogic';

interface ApplicationsShowcaseProps {
  specimenText: string;
  axes: VariableAxesState;
  onApplyApplicationAxes: (axesPartial: Partial<VariableAxesState>, sampleWord?: string) => void;
}

export const ApplicationsShowcase: React.FC<ApplicationsShowcaseProps> = ({
  specimenText,
  axes,
  onApplyApplicationAxes,
}) => {
  const variationSettings = buildFontVariationSettings(axes);
  const trackingCss = formatTrackingCss(axes.tracking);

  return (
    <section
      id="applications"
      aria-label="Physical Typeface Applications Poster and Packaging"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Minimal Section Header */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex items-center justify-between gap-4 gw-mono text-[11px]">
        <span className="font-bold tracking-[0.04em]">04 // APPLICATIONS</span>
        <span className="text-[#111111]/65">PRINT &amp; ARCHIVAL EDITIONS</span>
      </div>

      {/* Asymmetric Two-Piece Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left Composition (7 cols): Exhibition Poster */}
        <article className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-5">
          <div className="relative w-full overflow-hidden border border-[#111111] bg-[#1C1B1A]">
            <img
              src="/templates/glyphwork/glyphwork/02-application-poster.webp"
              alt="A0 silkscreen poster mounted with steel clips on architectural concrete wall"
              referrerPolicy="no-referrer"
              className="w-full h-[480px] sm:h-[600px] object-cover object-center block"
            />

            {/* Minimal Live Variable Type Badge at Bottom-Left */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F7F7F0]/95 border border-[#111111] px-4 py-2.5 pointer-events-none">
              <div
                className="text-[24px] sm:text-[32px] leading-none text-[#111111] uppercase truncate"
                style={{
                  fontFamily: 'var(--gw-font-specimen)',
                  fontVariationSettings: variationSettings,
                  letterSpacing: trackingCss,
                }}
              >
                {specimenText || 'GLYPHWORK'}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 gw-mono text-[11px]">
            <span>01. A0 Silkscreen Exhibition Poster</span>
            <button
              type="button"
              onClick={() =>
                onApplyApplicationAxes(
                  { weight: 860, width: 142, tracking: -12, slant: 5 },
                  'KUNSTHALLE'
                )
              }
              className="underline decoration-1 underline-offset-4 hover:text-[#F02F83] cursor-pointer whitespace-nowrap"
            >
              Apply Poster Axes ↗
            </button>
          </div>
        </article>

        {/* Right Composition (5 cols): Archival Packaging */}
        <article className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between gap-5">
          <div className="relative w-full overflow-hidden border border-[#111111] bg-[#E5E4DE]">
            <img
              src="/templates/glyphwork/glyphwork/03-application-packaging.webp"
              alt="Archival collector clamshell box and magenta-edged specimen sheets"
              referrerPolicy="no-referrer"
              className="w-full h-[480px] sm:h-[600px] object-cover object-center block"
            />

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F7F7F0]/95 border border-[#111111] px-4 py-2.5 pointer-events-none">
              <div
                className="text-[20px] sm:text-[26px] leading-none text-[#111111] truncate"
                style={{
                  fontFamily: 'var(--gw-font-specimen)',
                  fontVariationSettings: variationSettings,
                  letterSpacing: trackingCss,
                }}
              >
                {specimenText || 'GLYPHWORK'} — 090
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 gw-mono text-[11px]">
            <span>02. Archival Specimen Box Set</span>
            <button
              type="button"
              onClick={() =>
                onApplyApplicationAxes(
                  { weight: 520, width: 82, tracking: 14, slant: 0 },
                  'MONOGRAPH'
                )
              }
              className="underline decoration-1 underline-offset-4 hover:text-[#6E57D5] cursor-pointer whitespace-nowrap"
            >
              Apply Box Axes ↗
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
