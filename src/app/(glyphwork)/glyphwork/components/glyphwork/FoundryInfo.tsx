'use client';

import React, { useState } from 'react';
import {
  LICENSE_TIERS,
  LicenseTierId,
  VariableAxesState,
  buildFontVariationSettings,
  calculateLicenseQuote,
} from '../../utils/typographyLogic';

interface FoundryInfoProps {
  axes: VariableAxesState;
  onJumpToHeroLab: () => void;
}

export const FoundryInfo: React.FC<FoundryInfoProps> = ({
  axes,
  onJumpToHeroLab,
}) => {
  const [selectedTier, setSelectedTier] = useState<LicenseTierId>('desktop-web');
  const [seatIdx, setSeatIdx] = useState<number>(0);
  const [commissionedNote, setCommissionedNote] = useState<string | null>(null);

  const quote = calculateLicenseQuote(selectedTier, seatIdx, false);
  const variationSettings = buildFontVariationSettings(axes);

  return (
    <section
      id="foundry-licensing"
      aria-label="Foundry Manifesto and Licensing Specification"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] border-b border-[#111111]"
    >
      {/* Clean Section Header */}
      <div className="px-5 sm:px-8 py-3.5 border-b border-[#111111] flex items-center justify-between gap-4 gw-mono text-[11px]">
        <span className="font-bold tracking-[0.04em]">05 // FOUNDRY &amp; LICENSING</span>
        <span className="text-[#111111]/65">PERPETUAL LICENSE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left Column (5 cols): Concise Studio Statement */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-8">
          <div className="space-y-4">
            <h2
              className="text-[32px] sm:text-[42px] leading-[0.98] text-[#111111]"
              style={{
                fontFamily: 'var(--gw-font-specimen)',
                fontVariationSettings: variationSettings,
              }}
            >
              Swiss precision engineered for live variable environments.
            </h2>
            <p className="gw-mono text-[12px] leading-relaxed text-[#111111]/75">
              Designed in Zürich on a 1000-unit master grid. Delivered in variable WOFF2, TTF, and 18 static OTF cuts.
            </p>
          </div>

          <div className="pt-4 border-t border-[#111111]/30 flex items-center justify-between gw-mono text-[11px]">
            <span>ZÜRICH · GENEVA</span>
            <button
              type="button"
              onClick={onJumpToHeroLab}
              className="underline decoration-1 underline-offset-4 hover:text-[#F02F83] cursor-pointer"
            >
              Back to Type Lab ↑
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Streamlined 3-Row Licensing Picker */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div
            role="radiogroup"
            aria-label="License Tier Selection"
            className="border-t border-[#111111] divide-y divide-[#111111]"
          >
            {LICENSE_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setCommissionedNote(null);
                  }}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedTier(tier.id);
                      setCommissionedNote(null);
                    }
                  }}
                  className={`py-4 px-4 transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#E5F56B] text-[#111111]'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  <div>
                    <div
                      className="text-[20px] sm:text-[22px] leading-tight font-semibold"
                      style={{
                        fontFamily: 'var(--gw-font-specimen)',
                        fontVariationSettings: "'wght' 700, 'wdth' 110, 'slnt' 0, 'opsz' 48",
                      }}
                    >
                      {tier.name}
                    </div>
                    <div className="gw-mono text-[11px] text-[#111111]/70 mt-0.5">
                      {tier.rights[0]} · {tier.rights[1]}
                    </div>
                  </div>

                  <div className="gw-mono text-[22px] font-bold shrink-0">
                    ${tier.basePrice}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compact Seat Selector + Checkout Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div
              role="group"
              aria-label="Workstation Seat Tier"
              className="flex border border-[#111111] divide-x divide-[#111111] gw-mono text-[11px]"
            >
              {[
                { idx: 0, label: '1–5 Seats' },
                { idx: 1, label: '6–25 Seats' },
                { idx: 2, label: '26–100 Seats' },
              ].map((s) => (
                <button
                  key={s.idx}
                  type="button"
                  onClick={() => {
                    setSeatIdx(s.idx);
                    setCommissionedNote(null);
                  }}
                  aria-pressed={seatIdx === s.idx}
                  className={`py-2 px-3 cursor-pointer transition-colors whitespace-nowrap ${
                    seatIdx === s.idx
                      ? 'bg-[#111111] text-[#E5F56B] font-bold'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#111111]/10'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="gw-mono text-[26px] font-bold">
                {quote.formattedTotal}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCommissionedNote(
                    `License selected: ${quote.tier.name} (${quote.formattedTotal}) — Ready for download.`
                  )
                }
                className="px-5 py-2.5 bg-[#111111] text-[#F7F7F0] hover:bg-[#F02F83] gw-mono text-[12px] font-bold tracking-[0.04em] transition-colors cursor-pointer whitespace-nowrap"
              >
                Acquire License ↗
              </button>
            </div>
          </div>

          {commissionedNote && (
            <div
              role="status"
              className="p-3 border border-[#111111] bg-[#E5F56B] text-[#111111] gw-mono text-[11px]"
            >
              {commissionedNote}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
