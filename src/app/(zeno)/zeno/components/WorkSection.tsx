'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData, workSectionContent, ProjectItem } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem['id'] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cobaltWaveRef = useRef<SVGPathElement>(null);
  const violetSpineRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  const auren = projectsData[0];
  const morrow = projectsData[1];

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Opposing horizontal / vertical headline mask reveal
      gsap.fromTo(
        '.work-line-inner',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Auren enters from lower-left
      gsap.fromTo(
        '.work-world-auren',
        { x: -32, y: 36, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Morrow enters from above-right with slight settle
      gsap.fromTo(
        '.work-world-morrow',
        { x: 32, y: -28, rotation: 0.8, opacity: 0 },
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scroll-synced cobalt ribbon drawing while keeping continuous violet spine unbroken
      if (cobaltWaveRef.current) {
        const len = cobaltWaveRef.current.getTotalLength?.() || 1400;
        gsap.set(cobaltWaveRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len * 0.75,
        });
        gsap.to(cobaltWaveRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="relative w-full min-h-screen py-20 sm:py-24 lg:py-28 flex flex-col justify-start"
    >
      {/* Live SVG Studio Archive Grid, Cobalt/Violet Ribbon, & Continuous Signal Path */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1143"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
      >
        <defs>
          <linearGradient id="workCobaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A60F8" />
            <stop offset="50%" stopColor="#5B6EFB" />
            <stop offset="100%" stopColor="#9D86FF" />
          </linearGradient>
        </defs>

        {/* Top-right Concentric Registration Rings */}
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

        {/* Wide Twisting Cobalt/Lilac Ribbon connecting Auren House & Morrow Field */}
        <path
          ref={cobaltWaveRef}
          d="M 920 520 C 1020 385, 1170 330, 1295 385 C 1415 440, 1455 510, 1340 650 C 1235 775, 1140 825, 1030 825 L 1540 825 C 1690 825, 1775 720, 1745 585"
          fill="none"
          stroke="url(#workCobaltGrad)"
          strokeWidth={hoveredProject ? '48' : '42'}
          strokeLinecap="round"
          className="transition-all duration-500"
          opacity="0.92"
        />

        {/* Continuous Vertical Violet Signal Spine:
            Enters at x=978, y=0 (meeting Expertise's bottom x=978),
            curves to x=1322 and exits straight down at x=1322, y=1143 to meet ContactSection */}
        <path
          ref={violetSpineRef}
          d="M 978 0 L 978 22 Q 978 44 1002 44 L 1298 44 Q 1322 44 1322 68 L 1322 1143"
          fill="none"
          stroke="#A58AFF"
          strokeWidth="2.2"
          strokeOpacity="0.88"
        />
        <circle cx="1322" cy="155" r="9" fill="#A58AFF" />
        <circle cx="1322" cy="1055" r="10" fill="#A58AFF" />
      </svg>

      <div className="relative z-10 w-full px-[clamp(22px,3.125%,60px)]">
        {/* Top Section Header Block */}
        <div className="relative z-20 max-w-[1180px] mb-6 lg:mb-2">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2 sm:mb-3">
            <p className="text-[13px] sm:text-[15px] font-grotesk tracking-[0.07em] uppercase text-[#A58AFF]">
              {workSectionContent.eyebrow}
            </p>
            <span className="hidden md:inline-block text-[11px] font-grotesk tracking-[0.14em] uppercase text-[#7E7B8A] lg:mr-[22%]">
              {workSectionContent.archiveLabel}
            </span>
          </div>

          <h2
            id="work-heading"
            className="zeno-display-work uppercase text-[#F2F0EB] select-none mb-3 sm:mb-4"
          >
            <span className="block overflow-hidden pt-2 sm:pt-3 pb-1 sm:pb-2">
              <span className="work-line-inner block">WORK THAT</span>
            </span>
            <span className="block overflow-hidden pt-2 sm:pt-3 pb-1 sm:pb-2">
              <span className="work-line-inner block">
                CHANGES{' '}
                <em className="zeno-accent-italic not-italic font-editorial italic pr-2">
                  PERSPECTIVE.
                </em>
              </span>
            </span>
          </h2>

          <p className="text-[16px] sm:text-[19px] md:text-[20px] font-grotesk text-[#A89FE0] max-w-[640px]">
            {workSectionContent.subtitle}
          </p>
        </div>

        {/* Asymmetric Two-World Case Study Composition with Transparent Cutout Collages */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end mt-8 sm:mt-12 lg:mt-14 perspective-stage">
          {/* PROJECT 01: AUREN HOUSE (Spans 7 of 12 cols, sits wider and lower on left-center) */}
          <article
            onMouseEnter={() => setHoveredProject(auren.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="work-world-auren lg:col-span-7 flex flex-col pt-2 lg:pt-12 relative"
          >
            {/* Archive Micro-Caption above Auren */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99]">
                {workSectionContent.archiveLabel}
              </span>
              <span className="text-[11px] font-grotesk tracking-[0.12em] uppercase text-[#8E8B99]">
                {auren.archiveStamp}
              </span>
            </div>

            {/* Interactive Transparent Cutout Collage Trigger */}
            <div
              onClick={() => onSelectProject(auren)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${auren.title} case study`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(auren);
                }
              }}
              className="zeno-focus group relative w-full aspect-[1130/500] cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-1.5"
            >
              <picture className="w-full h-full block">
                <source srcSet={auren.artwork} type="image/webp" />
                <img
                  src={auren.artwork.replace(/\.webp/, '.png')}
                  alt={auren.artworkAlt}
                  width={1130}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-center cutout-shadow-world select-none transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                />
              </picture>
            </div>

            {/* Project 01 Live Metadata & CTA Row matching reference 03 */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-[21px] sm:text-[24px] md:text-[26px] font-grotesk font-normal tracking-[0.01em] uppercase text-[#F2F0EB]">
                  <button
                    type="button"
                    onClick={() => onSelectProject(auren)}
                    className="zeno-focus text-left hover:text-[#A58AFF] transition-colors cursor-pointer"
                  >
                    {auren.title}
                  </button>
                </h3>
                <p className="text-[12px] sm:text-[13.5px] font-grotesk tracking-[0.06em] uppercase text-[#D8CFF2] mt-0.5">
                  {auren.disciplines}
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] font-grotesk text-[#96939F] max-w-[490px] xl:max-w-[560px] mt-1.5 leading-relaxed">
                  {auren.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectProject(auren)}
                className="zeno-focus group inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-grotesk font-medium tracking-[0.08em] uppercase text-[#B5A3FF] hover:text-[#F2F0EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 border-b border-transparent hover:border-[#F2F0EB]"
              >
                <span>EXPLORE PROJECT</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </button>
            </div>
          </article>

          {/* PROJECT 02: MORROW FIELD (Spans 5 of 12 cols, rises higher on right with tall transparent poster stack) */}
          <article
            onMouseEnter={() => setHoveredProject(morrow.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="work-world-morrow lg:col-span-5 flex flex-col relative"
          >
            {/* Interactive Transparent Cutout Collage Trigger */}
            <div
              onClick={() => onSelectProject(morrow)}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${morrow.title} case study`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(morrow);
                }
              }}
              className="zeno-focus group relative w-full lg:w-[88%] lg:ml-auto aspect-[605/809] cursor-pointer transition-transform duration-500 ease-out hover:-translate-y-2"
            >
              <picture className="w-full h-full block">
                <source srcSet={morrow.artwork} type="image/webp" />
                <img
                  src={morrow.artwork.replace(/\.webp$/, '.png')}
                  alt={morrow.artworkAlt}
                  width={605}
                  height={809}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-top cutout-shadow-world select-none transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                />
              </picture>
            </div>

            {/* Project 02 Live Metadata & CTA Row matching reference 03 */}
            <div className="mt-4 w-full lg:w-[88%] lg:ml-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="text-[21px] sm:text-[24px] md:text-[26px] font-grotesk font-normal tracking-[0.01em] uppercase text-[#F2F0EB]">
                  <button
                    type="button"
                    onClick={() => onSelectProject(morrow)}
                    className="zeno-focus text-left hover:text-[#A58AFF] transition-colors cursor-pointer"
                  >
                    {morrow.title}
                  </button>
                </h3>
                <p className="text-[12px] sm:text-[13.5px] font-grotesk tracking-[0.06em] uppercase text-[#D8CFF2] mt-0.5">
                  {morrow.disciplines}
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] font-grotesk text-[#96939F] max-w-[440px] xl:max-w-[500px] mt-1.5 leading-relaxed">
                  {morrow.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectProject(morrow)}
                className="zeno-focus group inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-grotesk font-medium tracking-[0.08em] uppercase text-[#B5A3FF] hover:text-[#F2F0EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 border-b border-transparent hover:border-[#F2F0EB]"
              >
                <span>EXPLORE PROJECT</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
