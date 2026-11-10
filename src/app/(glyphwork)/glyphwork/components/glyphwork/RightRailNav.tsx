'use client';

import React from 'react';

export type NavSectionId =
  | 'hero-lab'
  | 'specimen-modes'
  | 'glyph-inspector'
  | 'applications'
  | 'foundry-licensing'
  | 'terminal-footer';

interface RightRailNavProps {
  activeSection: NavSectionId;
  selectedGlyph: string;
  onSelectSection: (sectionId: NavSectionId) => void;
  onSelectGlyphChip: (glyph: string) => void;
}

const RAIL_GLYPH_CHIPS = ['F', 'r', 'A', 'B', 'K'];

export const RightRailNav: React.FC<RightRailNavProps> = ({
  activeSection,
  selectedGlyph,
  onSelectSection,
  onSelectGlyphChip,
}) => {
  return (
    <>
      {/* Desktop Fixed Right Vertical Instrument Rail */}
      <aside
        aria-label="Typographic Instrument Rail Navigation"
        className="hidden lg:flex fixed top-0 right-0 bottom-0 w-[52px] bg-[#F7F7F0] border-l border-[#111111] z-40 select-none flex-row"
      >
        {/* Left Track: Vertical Section Labels & Glyph Chips */}
        <nav
          aria-label="Primary Sections and Specimen Chips"
          className="w-[34px] h-full flex flex-col justify-between border-r border-[#111111]/40 text-[#111111]"
        >
          {/* 01/SPECIMENS */}
          <button
            type="button"
            onClick={() => onSelectSection('hero-lab')}
            aria-label="Navigate to 01 Specimens Hero Lab"
            aria-current={activeSection === 'hero-lab' ? 'location' : undefined}
            className={`w-full flex-1 flex items-center justify-center border-b border-[#111111]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'hero-lab'
                ? 'bg-[#E5F56B] text-[#111111] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              01/SPECIMENS
            </span>
          </button>

          {/* 02/VARIABLE */}
          <button
            type="button"
            onClick={() => onSelectSection('specimen-modes')}
            aria-label="Navigate to 02 Variable Modes"
            aria-current={
              activeSection === 'specimen-modes' || activeSection === 'glyph-inspector'
                ? 'location'
                : undefined
            }
            className={`w-full flex-1 flex items-center justify-center border-b border-[#111111]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'specimen-modes' || activeSection === 'glyph-inspector'
                ? 'bg-[#F02F83] text-[#F7F7F0] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              02/VARIABLE
            </span>
          </button>

          {/* Single Glyph Chip F */}
          <button
            type="button"
            onClick={() => onSelectGlyphChip('F')}
            aria-label="Inspect glyph F in Glyph Microscope"
            className={`w-full h-[38px] flex items-center justify-center border-b border-[#111111]/40 text-[16px] font-bold transition-colors cursor-pointer ${
              selectedGlyph === 'F'
                ? 'bg-[#E5F56B] text-[#111111]'
                : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#E5F56B]/60'
            }`}
          >
            F
          </button>

          {/* 03/FOUNDRY */}
          <button
            type="button"
            onClick={() => onSelectSection('applications')}
            aria-label="Navigate to 03 Foundry Applications"
            aria-current={activeSection === 'applications' ? 'location' : undefined}
            className={`w-full flex-1 flex items-center justify-center border-b border-[#111111]/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'applications'
                ? 'bg-[#6E57D5] text-[#F7F7F0] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              03/FOUNDRY
            </span>
          </button>

          {/* Glyph Specimen Chips r, A, B, K */}
          <div className="flex flex-col border-b border-[#111111]/40">
            {RAIL_GLYPH_CHIPS.slice(1).map((chip) => {
              const isSelected = selectedGlyph === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => onSelectGlyphChip(chip)}
                  aria-label={`Inspect glyph ${chip} in Glyph Microscope`}
                  className={`w-full h-[34px] flex items-center justify-center border-b last:border-b-0 border-[#111111]/30 text-[15px] font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5F56B] text-[#111111]'
                      : chip === 'r'
                      ? 'bg-[#111111]/10 text-[#111111] hover:bg-[#E5F56B]/70'
                      : 'bg-[#F7F7F0] text-[#111111] hover:bg-[#E5F56B]/70'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* 04/LICENSING */}
          <button
            type="button"
            onClick={() => onSelectSection('foundry-licensing')}
            aria-label="Navigate to 04 Licensing and Terminal"
            aria-current={
              activeSection === 'foundry-licensing' || activeSection === 'terminal-footer'
                ? 'location'
                : undefined
            }
            className={`w-full flex-1 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F02F83] ${
              activeSection === 'foundry-licensing' || activeSection === 'terminal-footer'
                ? 'bg-[#E5F56B] text-[#111111] font-semibold'
                : 'hover:bg-[#111111]/5'
            }`}
          >
            <span className="gw-mono gw-vertical-rl text-[11px] tracking-[0.08em] whitespace-nowrap">
              04/LICENSING
            </span>
          </button>
        </nav>

        {/* Right Track: Continuous Precision Millimeter Ruler Ticks */}
        <div
          aria-hidden="true"
          className="w-[18px] h-full flex flex-col justify-between py-1 bg-[#F7F7F0] overflow-hidden"
        >
          {Array.from({ length: 96 }).map((_, idx) => {
            const isMajor = idx % 5 === 0;
            return (
              <div key={idx} className="w-full flex justify-end items-center pr-0.5">
                <span
                  className={`block bg-[#111111] ${
                    isMajor ? 'w-[11px] h-[1.5px]' : 'w-[6px] h-[1px] opacity-75'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile / Tablet Compact Instrument Strip (<= 44px height, respecting 15% sticky cap) */}
      <header
        aria-label="Mobile Instrument Section Bar"
        className="lg:hidden sticky top-0 left-0 right-0 h-10 bg-[#F7F7F0]/95 backdrop-blur-xs border-b border-[#111111] z-40 flex items-center justify-between px-3"
      >
        <button
          type="button"
          onClick={() => onSelectSection('hero-lab')}
          className="gw-mono text-[11px] font-bold tracking-tight border border-[#111111] px-1.5 py-0.5 bg-[#F7F7F0] text-[#111111] whitespace-nowrap shrink-0"
        >
          GLYPHWORK
        </button>

        <nav
          aria-label="Mobile Section Links"
          className="flex items-center gap-1 overflow-x-auto no-scrollbar"
        >
          {[
            { id: 'hero-lab' as NavSectionId, label: '01/LAB' },
            { id: 'specimen-modes' as NavSectionId, label: '02/MODES' },
            { id: 'glyph-inspector' as NavSectionId, label: '03/GLYPH' },
            { id: 'foundry-licensing' as NavSectionId, label: '04/LICENSE' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              className={`gw-mono text-[10px] px-2 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeSection === item.id
                  ? 'bg-[#111111] text-[#E5F56B] font-semibold'
                  : 'text-[#111111] hover:bg-[#111111]/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  );
};
