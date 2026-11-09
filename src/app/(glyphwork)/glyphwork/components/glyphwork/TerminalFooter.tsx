'use client';

import React, { useState } from 'react';
import {
  VariableAxesState,
  buildFontVariationSettings,
  validateSpecimenEmail,
} from '../../utils/typographyLogic';

interface TerminalFooterProps {
  axes: VariableAxesState;
  onJumpToHeroLab: () => void;
  onSelectGlyph: (glyph: string, scrollToInspector?: boolean) => void;
}

const FOOTER_COLUMNS = [
  {
    heading: '01 // FONTS',
    links: [
      { label: 'All Specimens', href: '#hero-lab' },
      { label: 'Retail', href: '#specimen-modes' },
      { label: 'Custom Type', href: '#applications' },
      { label: 'Licensing & EULA', href: '#foundry-licensing' },
      { label: 'Desktop & Web', href: '#foundry-licensing' },
    ],
  },
  {
    heading: '02 // ACADEMICS',
    links: [
      { label: 'The Journal', href: '#specimen-modes' },
      { label: 'Specimen Booklets', href: '#applications' },
      { label: 'Type Workshops', href: '#glyph-inspector' },
      { label: 'Archives', href: '#glyph-inspector' },
    ],
  },
  {
    heading: '03 // STUDIO',
    links: [
      { label: 'About', href: '#foundry-licensing' },
      { label: 'Contact', href: '#terminal-footer' },
      { label: 'Custom Commissions', href: '#foundry-licensing' },
      { label: 'Media Kit', href: '#applications' },
    ],
  },
  {
    heading: '04 // SOCIALS',
    links: [
      { label: 'Instagram ↗', href: '#terminal-footer' },
      { label: 'Are.na ↗', href: '#terminal-footer' },
      { label: 'Discord ↗', href: '#terminal-footer' },
      { label: 'GitHub ↗', href: '#terminal-footer' },
    ],
  },
];

const PlusTick: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    aria-hidden="true"
    className={`pointer-events-none select-none ${className}`}
  >
    <line x1="9" y1="0" x2="9" y2="18" stroke="#111111" strokeWidth="1.2" />
    <line x1="0" y1="9" x2="18" y2="9" stroke="#111111" strokeWidth="1.2" />
  </svg>
);

export const TerminalFooter: React.FC<TerminalFooterProps> = ({
  axes,
  onJumpToHeroLab,
  onSelectGlyph,
}) => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<{
    valid?: boolean;
    message?: string;
  } | null>(null);

  const variationSettings = buildFontVariationSettings({
    ...axes,
    weight: Math.max(700, axes.weight),
    width: Math.max(120, axes.width),
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateSpecimenEmail(email);
    if (!res.valid) {
      setEmailStatus({ valid: false, message: res.error });
    } else {
      setEmailStatus({
        valid: true,
        message: `DISPATCH CONFIRMED [${res.dispatchCode}] — PDF SPECIMEN & TRIAL .WOFF2 SENT TO ${email.trim().toUpperCase()}`,
      });
      setEmail('');
    }
  };

  const footerLetters = [
    { char: 'G', color: '#F02F83' }, // Spectral Magenta matching footer-reference.webp
    { char: 'L', color: '#111111' },
    { char: 'Y', color: '#111111' },
    { char: 'P', color: '#111111' },
    { char: 'H', color: '#111111' },
    { char: 'W', color: '#6E57D5' }, // Electric Violet matching footer-reference.webp
    { char: 'O', color: '#111111' },
    { char: 'R', color: '#111111' },
    { char: 'K', color: '#111111' },
  ];

  return (
    <footer
      id="terminal-footer"
      aria-label="Terminal Specimen Footer"
      className="w-full lg:pr-[52px] bg-[#F7F7F0] text-[#111111] select-none"
    >
      {/* 1. Top Utility Strip Line matching footer-reference.webp */}
      <div className="px-5 sm:px-8 py-3 border-b border-[#111111] flex flex-wrap items-center justify-between gap-4 gw-mono text-[12px] sm:text-[13px] font-medium tracking-[0.04em]">
        <span>SECT. 05 // TERMINAL FOOTER</span>
        <span>GLYPHWORK ©</span>
        <span>OPENLANDING TEMPLATE COLLECTION No. 090</span>
      </div>

      {/* 2. Type Testing Area Callout + Specimen Newsletter Dispatch Line */}
      <div className="px-5 sm:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-3 lg:border-r border-[#111111] pr-4">
          <button
            type="button"
            onClick={onJumpToHeroLab}
            className="text-left gw-mono text-[18px] sm:text-[22px] leading-[1.18] tracking-[0.02em] text-[#111111] hover:text-[#F02F83] transition-colors cursor-pointer"
          >
            <span className="block">TYPE TESTING AREA</span>
            <span className="block">TRY THE SYSTEM</span>
          </button>
        </div>

        <div className="lg:col-span-9 pl-0 lg:pl-4">
          <form
            onSubmit={handleEmailSubmit}
            noValidate
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4">
              <label
                htmlFor="gw-footer-email"
                className="gw-mono text-[20px] sm:text-[26px] lg:text-[28px] tracking-[0.01em] text-[#111111] whitespace-nowrap shrink-0"
              >
                ENTER EMAIL FOR SPECIMENS
              </label>

              <div className="relative flex-1 flex items-center border-b-2 border-dashed border-[#111111] pb-1">
                <input
                  id="gw-footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailStatus) setEmailStatus(null);
                  }}
                  placeholder="studio@domain.ch"
                  aria-label="Enter email for specimens"
                  className="w-full bg-transparent border-0 focus:outline-none gw-mono text-[16px] sm:text-[20px] text-[#111111] placeholder:text-[#111111]/35 pr-10"
                />
                <button
                  type="submit"
                  aria-label="Submit email for specimen dispatch"
                  className="p-1 text-[#F02F83] hover:scale-110 transition-transform cursor-pointer shrink-0"
                >
                  {/* Magenta Cursor Arrow Icon matching footer-reference.webp */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#F02F83"
                    aria-hidden="true"
                  >
                    <path d="M4 2L20 13L12 15L9 22L4 2Z" />
                  </svg>
                </button>
              </div>
            </div>

            {emailStatus && (
              <div
                role="status"
                className={`gw-mono text-[11px] font-semibold ${
                  emailStatus.valid ? 'text-[#6E57D5]' : 'text-[#F02F83]'
                }`}
              >
                {emailStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* 3. Giant Concluding Specimen Word with Cap-Height, X-Height & Baseline Overlays */}
      <div className="relative w-full py-4 sm:py-6 overflow-hidden">
        {/* Top Coordinate Notations (+ 0.24, Crosshairs) */}
        <div className="px-5 sm:px-8 mb-1 flex items-center justify-between gw-mono text-[12px] font-medium text-[#111111]">
          <div className="flex items-center gap-16 sm:gap-28">
            <span>+ 0.24</span>
            <PlusTick />
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" stroke="#111111" strokeWidth="1.2" />
            <line x1="11" y1="0" x2="11" y2="22" stroke="#111111" strokeWidth="1" />
            <line x1="0" y1="11" x2="22" y2="11" stroke="#111111" strokeWidth="1" />
          </svg>
          <div className="flex items-center gap-16 sm:gap-28">
            <PlusTick />
            <span>+ 0.24</span>
          </div>
        </div>

        {/* Giant Specimen Container */}
        <div className="relative w-full py-1">
          {/* Upper Cap-Height Guide (#F02F83) + Secondary Cap line (#6E57D5) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[8%] h-[1.5px] bg-[#F02F83] z-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[15%] h-[1.5px] bg-[#6E57D5] z-20"
          >
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1 ml-5 sm:ml-8 -translate-y-5 inline-block">
              Cap-height
            </span>
          </div>

          {/* Middle X-Height Guide (#6E57D5) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[41%] h-[1.5px] bg-[#6E57D5] z-20 flex justify-between"
          >
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1 ml-5 sm:ml-8 -translate-y-5 inline-block">
              X-height
            </span>
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#6E57D5] bg-[#F7F7F0]/90 px-1 mr-5 sm:mr-8 -translate-y-5 inline-block">
              x-height
            </span>
          </div>

          {/* Bottom Baseline Guide (#F02F83) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 bottom-[10%] h-[1.5px] bg-[#F02F83] z-20"
          >
            <span className="gw-mono text-[11px] sm:text-[13px] text-[#F02F83] bg-[#F7F7F0]/90 px-1 ml-5 sm:ml-8 -translate-y-5 inline-block">
              Baseline
            </span>
          </div>

          {/* Giant GLYPHWORK Specimen Word with Magenta G and Electric Violet W */}
          <div
            className="w-full px-4 sm:px-8 py-2 flex items-baseline justify-between leading-[0.84] tracking-[-0.03em] relative z-10"
            style={{
              fontFamily: 'var(--gw-font-specimen)',
              fontVariationSettings: `'wght' ${Math.round(Math.max(700, axes.weight))}, 'wdth' 102, 'slnt' 0, 'opsz' 144`,
              fontSize: 'clamp(2.35rem, 11.4vw, 11.8rem)',
              transform: 'scaleY(1.36)',
              transformOrigin: 'center center',
            }}
          >
            {footerLetters.map((item, idx) => (
              <button
                key={`${item.char}-${idx}`}
                type="button"
                onClick={() => onSelectGlyph(item.char, true)}
                aria-label={`Inspect footer specimen glyph ${item.char}`}
                className="bg-transparent border-0 p-0 m-0 leading-[0.84] cursor-pointer hover:opacity-85 transition-opacity focus-visible:outline-2 focus-visible:outline-[#F02F83]"
                style={{ color: item.color }}
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Coordinate Notations (+ 0.24, 1000 EM, + 0.24) */}
        <div className="px-5 sm:px-8 mt-1 flex items-center justify-between gw-mono text-[12px] font-medium text-[#111111]">
          <div className="flex flex-col items-start gap-1">
            <span>+ 0.24</span>
            <PlusTick />
          </div>
          <span className="text-[13px] tracking-[0.05em]">1000 EM</span>
          <div className="flex flex-col items-end gap-1">
            <span>+ 0.24</span>
            <PlusTick />
          </div>
        </div>
      </div>

      {/* 4. Four Editorial Link Columns + STAY INDEPENDENT Acid Yellow Stamp */}
      <div className="px-5 sm:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
        {FOOTER_COLUMNS.map((col, idx) => (
          <div
            key={col.heading}
            className={`relative flex flex-col justify-between ${
              idx > 0 ? 'lg:border-l lg:border-[#111111] lg:pl-8' : 'lg:pr-6'
            }`}
          >
            <div>
              <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.01em] text-[#111111] mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[20px] sm:text-[24px] leading-[1.28] text-[#111111] hover:text-[#F02F83] transition-colors inline-block"
                      style={{
                        fontFamily: 'var(--gw-font-specimen)',
                        fontVariationSettings: "'wght' 500, 'wdth' 105, 'slnt' 0, 'opsz' 48",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tilted Acid-Yellow STAY INDEPENDENT Stamp in Column 04 */}
            {idx === 3 && (
              <div className="mt-6 lg:mt-4 self-start sm:self-end">
                <span className="inline-block bg-[#E5F56B] text-[#111111] border border-[#111111]/20 px-4 py-1.5 text-[16px] sm:text-[18px] font-semibold tracking-[0.02em] -rotate-3 shadow-xs">
                  STAY INDEPENDENT
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 5. Bottom Calibration Bar with Coordinates, Millimeter Grid & 4 Color Swatches */}
      <div className="px-5 sm:px-8 py-3 border-t border-[#111111] flex flex-wrap items-center justify-between gap-4 gw-mono text-[10px] sm:text-[11px] text-[#111111]">
        <div className="leading-tight">
          <div>Fine specimen specs</div>
          <div>Coordinates: 10px + 100 EM</div>
        </div>

        <div className="hidden sm:block tracking-[0.25em] font-medium">
          01 02 03 04 05 06 07
        </div>

        {/* Fine Millimeter Grid Ruler Strip */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center gap-4 text-[#111111]/70"
        >
          <div className="flex items-center">
            <span className="mr-1">⌖</span>
            <div className="flex border-y border-[#111111]/40 h-3.5 divide-x divide-[#111111]/40">
              {Array.from({ length: 22 }).map((_, i) => (
                <span key={i} className="w-1.5 h-full block" />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-1">#</span>
            <div className="flex border-y border-[#111111]/40 h-3.5 divide-x divide-[#111111]/40">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="w-1.5 h-full block" />
              ))}
            </div>
          </div>
        </div>

        {/* Locked 4-Color Foundry Calibration Swatches */}
        <div
          aria-label="Foundry Color Calibration Swatches"
          className="flex items-center gap-1.5"
        >
          <span
            title="Spectral Magenta #F02F83"
            className="w-6 h-6 bg-[#F02F83] block border border-[#111111]/20"
          />
          <span
            title="Electric Violet #6E57D5"
            className="w-6 h-6 bg-[#6E57D5] block border border-[#111111]/20"
          />
          <span
            title="Acid Yellow #E5F56B"
            className="w-6 h-6 bg-[#E5F56B] block border border-[#111111]/20"
          />
          <span
            title="Ink Black #111111"
            className="w-6 h-6 bg-[#111111] block border border-[#111111]/20"
          />
        </div>
      </div>
    </footer>
  );
};
