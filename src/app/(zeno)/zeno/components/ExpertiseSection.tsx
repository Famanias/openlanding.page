'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expertiseContent, servicesData, ServiceItem } from '../data/services';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseSectionProps {
  onOpenApproach: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  onOpenApproach,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<ServiceItem['id']>('strategy');
  const sectionRef = useRef<HTMLElement>(null);
  const violetSpineRef = useRef<SVGPathElement>(null);
  const cobaltRibbonRef = useRef<SVGPathElement>(null);
  const lilacBridgeRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  const activeService =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline & left column reveal
      gsap.fromTo(
        '.exp-line-inner',
        { yPercent: 102 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Four service nodes enter from 4 distinct directional vectors
      const vectors = [
        { selector: '.service-node-strategy', x: -28, y: -22 },
        { selector: '.service-node-identity', x: 28, y: -22 },
        { selector: '.service-node-campaigns', x: -28, y: 24 },
        { selector: '.service-node-digital', x: 28, y: 24 },
      ];

      vectors.forEach((v, idx) => {
        gsap.fromTo(
          v.selector,
          { x: v.x, y: v.y, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: idx * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // SVG ribbons draw with scroll progress while keeping continuous violet spine unbroken
      [cobaltRibbonRef.current, lilacBridgeRef.current].forEach(
        (pathEl) => {
          if (!pathEl) return;
          const len = pathEl.getTotalLength?.() || 1200;
          gsap.set(pathEl, {
            strokeDasharray: len,
            strokeDashoffset: len * 0.75,
          });
          gsap.to(pathEl, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 0.5,
            },
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      aria-labelledby="expertise-heading"
      className="relative w-full lg:aspect-[1920/1143] flex flex-col justify-center py-16 sm:py-20 lg:py-16 overflow-hidden"
    >
      {/* Continuous Background SVG Signal Spine & Registration Rings */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1143"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
      >
        {/* Top-right decorative concentric registration circles */}
        <circle
          cx="1725"
          cy="210"
          r="172"
          fill="none"
          stroke="rgba(242,240,235,0.22)"
          strokeWidth="1.2"
        />
        <circle
          cx="1725"
          cy="210"
          r="148"
          fill="none"
          stroke="rgba(242,240,235,0.14)"
          strokeWidth="1"
        />

        {/* Continuous Vertical Violet Signal Spine:
            Enters at x=978, y=0 (from Hero), curves to x=1322 through the diagram,
            and curves back to x=978, y=1143 at bottom to meet Selected Work's M 978 0 */}
        <path
          ref={violetSpineRef}
          d="M 978 0 L 978 24 Q 978 46 1000 46 L 1296 46 Q 1322 46 1322 72 L 1322 1068 Q 1322 1094 1296 1094 L 1000 1094 Q 978 1094 978 1118 L 978 1143"
          fill="none"
          stroke="#A58AFF"
          strokeWidth="2.2"
          strokeOpacity="0.88"
        />
      </svg>

      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Text Column (5 of 12 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <p className="text-[13px] sm:text-[15px] font-grotesk tracking-[0.07em] uppercase text-[#A58AFF] mb-5 sm:mb-6">
            {expertiseContent.eyebrow}
          </p>

          <h2
            id="expertise-heading"
            className="zeno-display-section uppercase text-[#F2F0EB] select-none mb-7 sm:mb-9"
          >
            <span className="block overflow-hidden pb-1">
              <span className="exp-line-inner block">
                GOOD{' '}
                <em className="zeno-accent-italic not-italic font-editorial italic pr-2">
                  IDEAS
                </em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="exp-line-inner block">AREN’T</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="exp-line-inner block">
                ACCIDENTS<span className="text-[#A58AFF] inline-block ml-0.5">.</span>
              </span>
            </span>
          </h2>

          <p className="text-[17px] sm:text-[19px] md:text-[21px] leading-[1.45] font-grotesk text-[#A89FE0] max-w-[460px] xl:max-w-[540px] mb-8 sm:mb-10">
            {expertiseContent.body}
          </p>

          <button
            type="button"
            onClick={onOpenApproach}
            className="zeno-focus group inline-flex items-center gap-2.5 text-[13px] sm:text-[15px] font-grotesk font-semibold tracking-[0.08em] uppercase text-[#F2F0EB] border-b-[2px] border-[#F2F0EB] pb-1.5 hover:text-[#A58AFF] hover:border-[#A58AFF] transition-colors cursor-pointer mb-10"
          >
            <span>{expertiseContent.ctaLabel}</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </button>

          {/* Live Interactive Active Node Details Readout */}
          <div
            aria-live="polite"
            className="w-full max-w-[460px] xl:max-w-[540px] pt-6 border-t border-[#F2F0EB]/18 transition-all duration-300"
          >
            <div className="flex items-center justify-between text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF] mb-2">
              <span>ACTIVE DISCIPLINE // {activeService.label}</span>
              <span className="text-[#96939F]">{activeService.archiveCode}</span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-[#F2F0EB]/90 leading-relaxed mb-4">
              {activeService.extendedDesc}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[#96939F]">
              {activeService.capabilities.map((cap, idx) => (
                <React.Fragment key={cap}>
                  {idx > 0 && <span aria-hidden="true" className="text-[#A58AFF]">·</span>}
                  <span className="text-[#D8CFF2]">{cap}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interactive 2x2 Connected Editorial Map (7 of 12 cols on desktop) */}
        <div className="lg:col-span-7 relative">
          {/* Diagram Top Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99]">
              {expertiseContent.diagramHeader}
            </span>
            <span className="text-[11px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99] hidden sm:inline">
              SELECT NODE TO INSPECT [01–04]
            </span>
          </div>

          {/* Outer Coordinate Grid Box matching reference 02 */}
          <div className="relative border border-[#F2F0EB]/20 bg-[#111117]/60 p-4 sm:p-7 md:p-9">
            {/* Vertical Side Micro-Annotations */}
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -left-6 top-6 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              SERVICES
            </span>
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              S 26° 18&apos;
            </span>
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -left-6 bottom-6 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              STUDIO ARCHIVE
            </span>
            <span
              aria-hidden="true"
              className="writing-vertical hidden xl:block absolute -right-6 bottom-8 text-[10px] tracking-[0.18em] uppercase text-[#7E7B8A] select-none"
            >
              STUDIO ARCHIVE
            </span>

            {/* Live SVG Coordinate Grid, Cobalt Looping Ribbon, Lilac Diagonal Bridge, and Active Nodes */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 820"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
            >
              <defs>
                <linearGradient id="cobaltRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4A60F8" />
                  <stop offset="55%" stopColor="#5367F9" />
                  <stop offset="100%" stopColor="#6979FF" />
                </linearGradient>
                <linearGradient id="lilacRibbonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9C84FF" />
                  <stop offset="100%" stopColor="#7C68F8" />
                </linearGradient>
              </defs>

              {/* Coordinate Grid Hairlines (vertical spine is provided by the continuous outer violet path at cx=478) */}
              <line x1="0" y1="410" x2="1000" y2="410" stroke="rgba(242,240,235,0.22)" strokeWidth="1" />
              <line x1="242" y1="0" x2="242" y2="820" stroke="rgba(242,240,235,0.10)" strokeWidth="1" />
              <line x1="742" y1="0" x2="742" y2="820" stroke="rgba(242,240,235,0.10)" strokeWidth="1" />

              {/* Concentric Wireframe Arcs inside the coordinate box centered on the spine (cx=478) */}
              <circle
                cx="478"
                cy="410"
                r="310"
                fill="none"
                stroke="rgba(242,240,235,0.20)"
                strokeWidth="1.15"
              />
              <circle
                cx="478"
                cy="410"
                r="105"
                fill="none"
                stroke="rgba(242,240,235,0.18)"
                strokeWidth="1"
              />

              {/* Crosshair markers (+) at axes */}
              <text x="-18" y="415" fill="rgba(242,240,235,0.45)" fontSize="18">+</text>
              <text x="1008" y="415" fill="rgba(242,240,235,0.45)" fontSize="18">+</text>

              {/* Thick Cobalt Looping Ribbon behind the 4 discipline artworks (matching reference 02) */}
              <path
                ref={cobaltRibbonRef}
                d="M 92 590 C 28 470, 52 340, 175 280 C 310 215, 420 205, 515 268 C 615 335, 710 355, 835 355 C 945 355, 965 495, 865 568 C 755 648, 595 628, 390 628"
                fill="none"
                stroke="url(#cobaltRibbonGrad)"
                strokeWidth={activeServiceId === 'strategy' || activeServiceId === 'digital' ? '46' : '40'}
                strokeLinecap="round"
                className="transition-all duration-500"
                opacity="0.95"
              />

              {/* Secondary Lilac S-Curve Bridge crossing center */}
              <path
                ref={lilacBridgeRef}
                d="M 380 578 C 455 530, 460 440, 492 362 C 525 282, 598 242, 668 232"
                fill="none"
                stroke="url(#lilacRibbonGrad)"
                strokeWidth={activeServiceId === 'identity' || activeServiceId === 'campaigns' ? '34' : '28'}
                strokeLinecap="round"
                className="transition-all duration-500"
                opacity="0.92"
              />

              {/* Top & Bottom border violet spine nodes pinned to the exact box border (y=0 and y=820 at cx=478) */}
              <circle cx="478" cy="0" r="8" fill="#A58AFF" />
              <circle cx="478" cy="820" r="8" fill="#A58AFF" />

              {/* Center Intersection Node on the S-bridge aligned with x=1322 spine (cx=478) */}
              <circle
                cx="478"
                cy="410"
                r="19"
                fill="#5367F9"
                stroke="#1E2030"
                strokeWidth="5"
              />
              {/* Left loop violet node */}
              <circle
                cx="66"
                cy="410"
                r="15"
                fill="#A58AFF"
                opacity={activeServiceId === 'strategy' ? 1 : 0.78}
              />
              {/* Right loop violet node */}
              <circle
                cx="918"
                cy="410"
                r="16"
                fill="#A58AFF"
                opacity={activeServiceId === 'digital' ? 1 : 0.78}
              />
            </svg>

            {/* 2x2 Connected Discipline Modules */}
            <div
              role="group"
              aria-label="ZENO four core creative disciplines"
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-12"
            >
              {servicesData.map((service) => {
                const isSelected = activeServiceId === service.id;
                const isTopRow = service.labelPosition === 'above';

                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveServiceId(service.id)}
                    onMouseEnter={() => setActiveServiceId(service.id)}
                    className={`service-node-${service.id} zeno-focus group text-left flex flex-col ${
                      isTopRow ? 'justify-start' : 'justify-end'
                    } transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'opacity-100 -translate-y-1.5'
                        : 'opacity-82 hover:opacity-100 hover:-translate-y-1'
                    }`}
                  >
                    {/* Top Row Labels sit ABOVE artwork (01 Strategy & 02 Identity) */}
                    {isTopRow && (
                      <div className="mb-3.5 pr-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[18px] sm:text-[21px] font-grotesk font-medium tracking-[0.02em] uppercase transition-colors ${
                              isSelected ? 'text-[#F2F0EB]' : 'text-[#F2F0EB]/85'
                            }`}
                          >
                            {service.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                              isSelected
                                ? 'bg-[#A58AFF] scale-125'
                                : 'bg-[#F2F0EB]/30 scale-75'
                            }`}
                          />
                        </div>
                        <p className="text-[14px] sm:text-[15.5px] font-grotesk text-[#C8C4D4] mt-0.5">
                          {service.shortDesc}
                        </p>
                      </div>
                    )}

                    {/* Artwork Frame */}
                    <div
                      className={`relative w-full aspect-[410/300] overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? 'ring-1 ring-[#A58AFF]/70 shadow-[0_20px_40px_rgba(0,0,0,0.65)]'
                          : 'ring-1 ring-[#F2F0EB]/12'
                      }`}
                    >
                      <img
                        src={service.artwork}
                        alt={service.artworkAlt}
                        width={410}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover crop-blend-card transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Bottom Row Labels sit BELOW artwork (03 Campaigns & 04 Digital) */}
                    {!isTopRow && (
                      <div className="mt-3.5 pr-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[18px] sm:text-[21px] font-grotesk font-medium tracking-[0.02em] uppercase transition-colors ${
                              isSelected ? 'text-[#F2F0EB]' : 'text-[#F2F0EB]/85'
                            }`}
                          >
                            {service.label}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                              isSelected
                                ? 'bg-[#A58AFF] scale-125'
                                : 'bg-[#F2F0EB]/30 scale-75'
                            }`}
                          />
                        </div>
                        <p className="text-[14px] sm:text-[15.5px] font-grotesk text-[#C8C4D4] mt-0.5">
                          {service.shortDesc}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
