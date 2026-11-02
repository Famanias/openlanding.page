"use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, RefreshCw } from 'lucide-react';
import { AnatomyPart } from '../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onSelectProject: (projectId: 'loop' | 'forma' | 'kindred', openModal?: boolean) => void;
  onInspectAnatomyPart: (partId: AnatomyPart['id'], explode?: boolean) => void;
  onActivateAppDemo: () => void;
  onOpenAsteriskLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onSelectProject,
  onInspectAnatomyPart,
  onActivateAppDemo,
  onOpenAsteriskLab
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hx: 50, hy: 50 });
  const [hoveredCallout, setHoveredCallout] = useState<string | null>(null);
  const [miniAppPlaying, setMiniAppPlaying] = useState(true);
  const [miniPanelToggle, setMiniPanelToggle] = useState(true);
  const [miniTactileToggle, setMiniTactileToggle] = useState(false);
  const [asteriskHovered, setAsteriskHovered] = useState(false);

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Math.round(-ny * 5 * 10) / 10,
      ry: Math.round(nx * 5 * 10) / 10,
      hx: Math.round((nx + 0.5) * 100),
      hy: Math.round((ny + 0.5) * 100)
    });
  };

  const handleStagePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 50 });
  };

  return (
    <section
      id="top"
      aria-label="Introduction and Featured Modular Showcase"
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-5 pb-8 lg:pt-7 lg:pb-10"
    >
      {/* Main Above-the-Fold Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-stretch">
        {/* LEFT COLUMN (Cols 1-6): Kicker, Giant Display Title, Lead Statement, Dual CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-between py-1 lg:pr-4">
          <div>
            {/* Eyebrow Kicker */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <p className="font-condensed font-semibold text-[15px] sm:text-[17px] tracking-[0.04em] uppercase text-[#191919]">
                INDEPENDENT PRODUCT DESIGNER / BASED EVERYWHERE
              </p>
            </div>

            {/* Giant Uppercase Heavy Condensed Display Title */}
            <h1 className="font-display uppercase select-text tracking-[-0.015em] text-[72px] sm:text-[104px] md:text-[122px] xl:text-[134px] leading-[0.89] mb-6 sm:mb-8">
              <span className="block text-[#191919]">DESIGN</span>
              <span className="block text-[#191919]">SHOULD</span>
              <span className="block text-[#3049F0]">FEEL GOOD.</span>
            </h1>

            {/* Supporting Two-Line Statement */}
            <p className="text-[20px] sm:text-[26px] xl:text-[29px] leading-[1.28] font-medium text-[#191919] tracking-[-0.02em] max-w-[28ch] mb-8 sm:mb-10">
              I turn complex problems into simple, thoughtful experiences people love using.
            </p>
          </div>

          {/* Primary CTA & Secondary Link Row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
            <button
              type="button"
              onClick={() => {
                onSelectProject('loop', false);
                onNavigate('work');
              }}
              className="group relative inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 sm:py-[18px] rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-[18px] sm:text-[21px] tracking-[0.03em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#ff5f46] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="font-condensed font-bold text-[18px] sm:text-[21px] tracking-[0.03em] uppercase text-[#191919] underline decoration-2 underline-offset-[6px] hover:text-[#3049F0] hover:decoration-[#3049F0] transition-colors whitespace-nowrap shrink-0 py-2"
            >
              MORE ABOUT ME
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (Cols 7-12): Dominant Lavender LOOP Stage + 3 Vertically Stacked Modules */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-4 items-stretch">
          {/* Dominant Lavender Panel (8 of 12 cols on right grid) */}
          <div
            onPointerMove={handleStagePointerMove}
            onPointerLeave={handleStagePointerLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            }}
            className="sm:col-span-8 relative bg-[#D4C7FB] border-2 border-[#191919] rounded-[24px] p-4 sm:p-5 flex flex-col justify-between min-h-[460px] sm:min-h-[545px] overflow-hidden transition-transform duration-200 ease-out"
          >
            {/* Full-bleed Seamless Photorealistic LOOP Hardware Stage */}
            <button
              type="button"
              onClick={() => onSelectProject('loop', true)}
              aria-label="Open 01 LOOP Industrial Design Case Study"
              className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3049F0]"
            >
              <img
                src="/templates/nicopark/loop-hero.webp"
                alt="LOOP portable music device in coral-orange polycarbonate with a frosted clear circular acrylic dial and lilac tactile controls"
                width={808}
                height={1088}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-[1.015]"
              />
              {/* Subtle specular sweep over the clear acrylic dial */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <span className="animate-specular-sweep absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </span>
            </button>

            {/* Top-left Kicker inside Lavender Tile */}
            <div className="relative z-20 flex items-start justify-between pointer-events-none">
              <div className="font-condensed font-semibold text-[14px] sm:text-[15px] leading-[1.15] tracking-[0.03em] uppercase text-[#191919]">
                <div>01 /</div>
                <div>FEATURED PROJECT</div>
              </div>
            </div>

            {/* Central Real Interactive SVG/HTML Callout Overlay Layer */}
            <div className="relative my-auto w-full h-[360px] sm:h-[430px] pointer-events-none">
              {/* Accessible SVG Leader Lines matching screenshot geometry */}
              <svg
                viewBox="0 0 400 440"
                className="pointer-events-none absolute inset-0 w-full h-full z-10"
                aria-hidden="true"
              >
                {/* Top-right: EXPLODED VIEW leader */}
                <polyline
                  points="282,66 300,48 318,48"
                  fill="none"
                  stroke={hoveredCallout === 'cover' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'cover' ? '1.8' : '1.1'}
                />
                {/* Top-right: TACTILE DIAL leader */}
                <polyline
                  points="296,82 318,82"
                  fill="none"
                  stroke={hoveredCallout === 'dial' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'dial' ? '1.8' : '1.1'}
                />
                {/* Right-lower: SUB-ASSEMBLY leader */}
                <polyline
                  points="298,236 326,264 326,314"
                  fill="none"
                  stroke={hoveredCallout === 'buttons' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'buttons' ? '1.8' : '1.1'}
                />
                {/* Bottom-right: USB-C PORT leader */}
                <polyline
                  points="246,336 268,356 292,356"
                  fill="none"
                  stroke={hoveredCallout === 'usb' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'usb' ? '1.8' : '1.1'}
                />
                {/* Bottom-left: EXPLODED VIEW leader */}
                <polyline
                  points="72,296 38,328 38,382"
                  fill="none"
                  stroke={hoveredCallout === 'cover-left' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'cover-left' ? '1.8' : '1.1'}
                />
                <polyline
                  points="132,366 96,400 84,400"
                  fill="none"
                  stroke="#191919"
                  strokeWidth="1.1"
                />
                {/* Bottom-left: USB-C PORT leader */}
                <polyline
                  points="182,358 120,418 108,418"
                  fill="none"
                  stroke={hoveredCallout === 'usb-left' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'usb-left' ? '1.8' : '1.1'}
                />
              </svg>

              {/* Interactive Callout Buttons positioned around the LOOP device */}
              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('cover')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('cover', true)}
                className="pointer-events-auto absolute z-20 top-[8.5%] right-[0.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect Exploded View in Section 03"
              >
                EXPLODED VIEW
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('dial')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('dial', true)}
                className="pointer-events-auto absolute z-20 top-[16.5%] right-[1.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect Tactile Dial in Section 03"
              >
                TACTILE DIAL
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('buttons')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('buttons', true)}
                className="pointer-events-auto absolute z-20 top-[71.5%] right-[0.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect Sub-Assembly in Section 03"
              >
                SUB-ASSEMBLY
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('usb')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('usb', true)}
                className="pointer-events-auto absolute z-20 top-[78.5%] right-[4.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect USB-C Port in Section 03"
              >
                USB-C PORT
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('cover-left')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('cover', true)}
                className="pointer-events-auto absolute z-20 bottom-[8.5%] left-[1.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
              >
                EXPLODED VIEW
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('usb-left')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('usb', true)}
                className="pointer-events-auto absolute z-20 bottom-[3%] left-[9%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
              >
                USB-C PORT
              </button>
            </div>

            {/* Bottom-right Tilted Butter-Yellow Product Tag Sticker */}
            <div className="relative z-20 flex justify-end mt-1">
              <button
                type="button"
                onClick={() => onSelectProject('loop', true)}
                className="group bg-[#F7E36B] border border-[#191919]/30 shadow-xs px-3.5 py-2.5 rounded-[10px] -rotate-6 hover:rotate-0 transition-transform duration-200 text-left cursor-pointer"
              >
                <div className="font-condensed font-extrabold text-[22px] leading-none tracking-tight text-[#191919]">
                  LOOP
                </div>
                <div className="font-condensed font-semibold text-[10px] leading-[1.15] tracking-[0.04em] uppercase text-[#191919] mt-0.5">
                  <div>PERSONAL AUDIO</div>
                  <div>PRODUCT DESIGN — 2026</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Stacked Column (4 of 12 cols on right grid): 3 Interactive Tiles */}
          <div className="sm:col-span-4 flex flex-col justify-between gap-4">
            {/* Tile 1: Butter-Yellow APPARATUS UI / 02 // LOOP APP */}
            <div className="flex-1 bg-[#F7E36B] border-2 border-[#191919] rounded-[22px] p-3.5 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex items-start justify-between gap-1">
                <div className="font-condensed font-bold text-[13px] leading-[1.15] tracking-[0.02em] uppercase text-[#191919]">
                  <div>APPARATUS UI</div>
                  <div className="font-normal">02 · LOOP APP</div>
                </div>
                <button
                  type="button"
                  onClick={onActivateAppDemo}
                  aria-label="Open interactive LOOP App preview"
                  className="text-[11px] font-condensed font-bold uppercase underline text-[#191919] hover:text-[#3049F0] cursor-pointer"
                >
                  LIVE UI ↗
                </button>
              </div>

              {/* Mini Handheld LOOP App Device Mockup with Live Controls */}
              <div
                onClick={onActivateAppDemo}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onActivateAppDemo();
                  }
                }}
                aria-label="Interactive LOOP App mini controller — click to open full preview"
                className="mt-2 ml-auto w-[78%] bg-[#F4DC58] border-2 border-[#191919] rounded-t-[18px] rounded-b-[10px] p-2.5 shadow-inner cursor-pointer"
              >
                <div className="flex items-center justify-between text-[8px] font-mono-tech font-bold text-[#191919] mb-1.5">
                  <span>74</span>
                  <span className="tracking-widest">LOOP</span>
                  <span>≡</span>
                </div>
                {/* Play/Pause & Waveform Row */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[8px] font-mono-tech">144</span>
                  <span className="text-[8px]">••||•</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMiniAppPlaying((p) => !p);
                    }}
                    aria-label={miniAppPlaying ? 'Pause mini waveform' : 'Play mini waveform'}
                    className="w-5 h-5 rounded-full bg-[#191919] text-[#F7E36B] flex items-center justify-center text-[8px] font-bold"
                  >
                    {miniAppPlaying ? '❚❚' : '▶'}
                  </button>
                  <span className="text-[8px]">•||•</span>
                  <span className="text-[8px] font-mono-tech">441</span>
                </div>
                {/* Mini Dial + Toggle Switches */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full border-[1.5px] border-[#191919] border-dashed flex items-center justify-center">
                    <div
                      className={`w-2.5 h-0.5 bg-[#191919] origin-center transition-transform duration-300 ${
                        miniAppPlaying ? 'rotate-45' : '-rotate-45'
                      }`}
                    />
                  </div>
                  <div className="space-y-1 text-[7px] font-condensed uppercase">
                    <div className="flex items-center justify-end gap-1">
                      <span>Panel</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMiniPanelToggle((p) => !p);
                        }}
                        aria-label="Toggle mini panel mode"
                        className={`w-6 h-3 rounded-full border border-[#191919] flex items-center px-0.5 ${
                          miniPanelToggle ? 'bg-[#191919] justify-end' : 'bg-transparent justify-start'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            miniPanelToggle ? 'bg-[#F7E36B]' : 'bg-[#191919]'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <span>Tactile</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMiniTactileToggle((p) => !p);
                        }}
                        aria-label="Toggle mini tactile mode"
                        className={`w-6 h-3 rounded-full border border-[#191919] flex items-center px-0.5 ${
                          miniTactileToggle ? 'bg-[#191919] justify-end' : 'bg-transparent justify-start'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            miniTactileToggle ? 'bg-[#F7E36B]' : 'bg-[#191919]'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Animated Equalizer Bars */}
                <div className="flex items-center justify-center gap-[2px] h-5 my-1">
                  {[35, 65, 90, 45, 80, 100, 55, 40, 85, 95, 50, 75, 60, 35].map((h, idx) => (
                    <span
                      key={idx}
                      style={{
                        height: miniAppPlaying ? `${h}%` : '25%'
                      }}
                      className="w-[2px] bg-[#191919] rounded-full transition-all duration-300"
                    />
                  ))}
                </div>
                {/* Bottom Pill Bar */}
                <div className="flex items-center justify-between pt-1 border-t border-[#191919]/20">
                  <span className="px-1.5 py-0.5 rounded-full bg-[#191919] text-[#F7E36B] text-[7px] font-mono-tech">
                    0 SCENE
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full border border-[#191919] flex items-center justify-center text-[8px]">
                    +
                  </span>
                </div>
              </div>
            </div>

            {/* Tile 2: Off-White TECHNICAL WIREFRAME / 03 // SCHEMATIC */}
            <button
              type="button"
              onClick={() => onInspectAnatomyPart('cover', true)}
              className="flex-1 bg-[#F8F7F2] border-2 border-[#191919] rounded-[22px] p-3.5 flex flex-col justify-between text-left group hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3049F0]"
            >
              <div className="font-condensed font-bold text-[13px] leading-[1.15] tracking-[0.02em] uppercase text-[#191919]">
                <div>TECHNICAL WIREFRAME</div>
                <div className="font-normal">03 · SCHEMATIC</div>
              </div>

              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 220 120"
                  className="w-full max-w-[185px] h-auto overflow-visible"
                  aria-hidden="true"
                >
                  {/* Outer CAD Frame */}
                  <rect
                    x="20"
                    y="16"
                    width="160"
                    height="84"
                    rx="10"
                    fill="none"
                    stroke="#191919"
                    strokeWidth="1.2"
                  />
                  {/* Inner Viewport Rect */}
                  <rect
                    x="32"
                    y="24"
                    width="136"
                    height="68"
                    rx="3"
                    fill="none"
                    stroke="#191919"
                    strokeWidth="1"
                  />
                  {/* Diagonal Construction Crosshairs */}
                  <line x1="32" y1="24" x2="168" y2="92" stroke="#191919" strokeWidth="1" />
                  <line x1="32" y1="92" x2="168" y2="24" stroke="#191919" strokeWidth="1" />
                  {/* Cobalt Blue Dimension & Flow Vectors */}
                  <polyline
                    points="100,45 135,10 192,10 192,56 172,56"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                    className="transition-all duration-300 group-hover:stroke-[2.2]"
                  />
                  <polyline
                    points="104,41 100,45 105,46"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                  />
                  <polyline
                    points="176,53 172,56 176,59"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                  />
                  {/* Vertical & Bottom Dimension Callout */}
                  <polyline
                    points="100,58 100,110 150,110 150,96"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                  />
                  <polyline
                    points="48,78 48,104 100,104"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
            </button>

            {/* Tile 3: Coral BRAND SYMBOL with Bold Black 8-Arm Asterisk */}
            <button
              type="button"
              onClick={onOpenAsteriskLab}
              onMouseEnter={() => setAsteriskHovered(true)}
              onMouseLeave={() => setAsteriskHovered(false)}
              className="flex-1 bg-[#FF735D] border-2 border-[#191919] rounded-[22px] p-3.5 flex flex-col justify-between text-left group hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3049F0]"
            >
              <div className="font-condensed font-bold text-[13px] leading-[1.15] tracking-[0.02em] uppercase text-[#191919]">
                BRAND SYMBOL
              </div>

              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 120 120"
                  className={`w-24 h-24 sm:w-28 sm:h-28 text-[#191919] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    asteriskHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'
                  }`}
                  aria-hidden="true"
                >
                  <g stroke="currentColor" strokeWidth="14" strokeLinecap="butt">
                    <line x1="60" y1="10" x2="60" y2="110" />
                    <line x1="10" y1="60" x2="110" y2="60" />
                    <line x1="24.6" y1="24.6" x2="95.4" y2="95.4" />
                    <line x1="95.4" y1="24.6" x2="24.6" y2="95.4" />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Editorial Ticker / Rule */}
      <div className="mt-8 lg:mt-10 pt-4 border-t-2 border-[#191919] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Featured projects quick index"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] sm:text-[18px] lg:text-[20px] font-condensed tracking-[0.02em] uppercase text-[#191919]"
        >
          <button
            type="button"
            onClick={() => {
              onSelectProject('loop', false);
              onNavigate('work');
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#3049F0] transition-colors cursor-pointer"
          >
            <span>01 /</span>
            <strong className="font-extrabold">LOOP</strong>
            <span>— INDUSTRIAL DESIGN</span>
          </button>

          <span aria-hidden="true" className="text-[#191919] text-sm">
            ✦
          </span>

          <button
            type="button"
            onClick={() => {
              onSelectProject('forma', false);
              onNavigate('work');
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#3049F0] transition-colors cursor-pointer"
          >
            <span>02 /</span>
            <strong className="font-extrabold">FORMA</strong>
            <span>— DIGITAL PRODUCT</span>
          </button>

          <span aria-hidden="true" className="text-[#191919] text-sm">
            ✦
          </span>

          <button
            type="button"
            onClick={() => {
              onSelectProject('kindred', false);
              onNavigate('work');
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#3049F0] transition-colors cursor-pointer"
          >
            <span>03 /</span>
            <strong className="font-extrabold">KINDRED</strong>
            <span>— BRAND EXPERIENCE</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('work')}
          className="group inline-flex items-center gap-2 font-condensed font-semibold text-[15px] sm:text-[16px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] transition-colors cursor-pointer shrink-0 self-end md:self-auto"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          <RefreshCw className="w-5 h-5 ml-1 animate-slow-spin text-[#191919]" />
        </button>
      </div>
    </section>
  );
};
