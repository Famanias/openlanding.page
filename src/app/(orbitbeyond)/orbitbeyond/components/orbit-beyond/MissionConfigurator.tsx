'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, RotateCcw, Sparkles } from 'lucide-react';
import {
  DEFAULT_MISSION_PLAN,
  deriveMissionDetails,
  formatMissionBriefText,
  type MissionPlan,
  type MissionStyle,
  type PartySize,
  type TripNights,
} from '../../lib/orbit-beyond/mission';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { GlassButton } from './GlassButton';
import { MissionPreviewDialog } from './MissionPreviewDialog';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

gsap.registerPlugin(ScrollTrigger);

export interface MissionConfiguratorProps {
  plan: MissionPlan;
  onChangePlan: React.Dispatch<React.SetStateAction<MissionPlan>>;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export function MissionConfigurator({
  plan,
  onChangePlan,
  headingRef,
}: MissionConfiguratorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [inlineCopied, setInlineCopied] = useState(false);

  const details = deriveMissionDetails(plan);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !consoleRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        consoleRef.current,
        { rotateX: 4, y: 24, transformPerspective: 1200 },
        {
          rotateX: 0,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'top 25%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const setStyle = (style: MissionStyle) => {
    onChangePlan((prev) => ({ ...prev, style }));
  };

  const setParty = (party: PartySize) => {
    onChangePlan((prev) => ({ ...prev, party }));
  };

  const setNights = (nights: TripNights) => {
    onChangePlan((prev) => ({ ...prev, nights }));
  };

  const toggleRoverWalk = () => {
    onChangePlan((prev) => ({ ...prev, roverWalk: !prev.roverWalk }));
  };

  const handleReset = () => {
    onChangePlan(DEFAULT_MISSION_PLAN);
  };

  const handleQuickCopy = async () => {
    const text = formatMissionBriefText(plan);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Fallback copy');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setInlineCopied(true);
    window.setTimeout(() => setInlineCopied(false), 3000);
  };

  const previewImage =
    plan.style === 'crater' || plan.roverWalk
      ? ORBIT_ASSETS.lunarRoverExcursion
      : ORBIT_ASSETS.habitatInterior;

  return (
    <section
      id="mission-configurator"
      ref={sectionRef}
      aria-labelledby="configurator-heading"
      className="relative w-full bg-[#030812] py-20 sm:py-28 overflow-clip"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Heading & Mandatory Visible Qualifier */}
        <div className="mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-hud-mono text-xs tracking-[0.22em] text-[#8DE9FF] uppercase mb-2.5">
              05 · YOUR MISSION
            </p>
            <h2
              id="configurator-heading"
              ref={headingRef}
              tabIndex={-1}
              className="font-display-sans text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] text-[#EDF6FD] uppercase leading-[1.04] focus:outline-none"
            >
              MAKE THE WEEKEND YOURS.
            </h2>
          </div>

          <p className="font-hud-mono text-[11px] tracking-[0.16em] text-[#F6C98C] uppercase">
            ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS.
          </p>
        </div>

        {/* Embedded Rounded Liquid-Glass Mission Console */}
        <div
          ref={consoleRef}
          className="liquid-glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 lg:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left High-Contrast Live Mission Preview (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[360px] rounded-[26px] border border-white/12 bg-[#091525] overflow-hidden flex flex-col justify-between p-6">
              <img
                src={previewImage}
                alt={
                  plan.style === 'crater'
                    ? 'Crater Explorer surface excursion with rover and astronauts on the lunar rim.'
                    : 'Earthrise Retreat lunar habitat interior and observation window.'
                }
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(3,8,18,0.6) 0%, rgba(3,8,18,0.18) 45%, rgba(3,8,18,0.9) 100%)',
                }}
              />

              {/* Top Status Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#8DE9FF] uppercase">
                  {details.styleCode}
                </span>
                <span className="liquid-glass rounded-full px-3.5 py-1.5 font-hud-mono text-[11px] tracking-[0.18em] text-[#EDF6FD] uppercase">
                  CONCEPT DEMO / NO BOOKING CREATED
                </span>
              </div>

              {/* Dynamic SVG Orbital Profile Visualization & Summary Line */}
              <div className="relative z-10 mt-auto pt-12">
                <svg
                  viewBox="0 0 600 110"
                  className="w-full h-auto overflow-visible"
                  aria-hidden="true"
                >
                  <line
                    x1="20"
                    y1="90"
                    x2="580"
                    y2="90"
                    stroke="rgba(237, 246, 253, 0.2)"
                    strokeWidth="1"
                  />
                  <path
                    d={
                      plan.style === 'crater'
                        ? 'M 40 90 Q 300 10, 560 90'
                        : 'M 40 90 Q 300 40, 560 90'
                    }
                    fill="none"
                    stroke="#8DE9FF"
                    strokeWidth="2.2"
                    strokeDasharray={plan.nights === 3 ? 'none' : '6 4'}
                  />
                  {plan.roverWalk && (
                    <path
                      d="M 390 90 Q 465 52, 540 90"
                      fill="none"
                      stroke="#F6C98C"
                      strokeWidth="1.8"
                    />
                  )}
                  {Array.from({ length: plan.party }).map((_, idx) => {
                    const cx = 180 + idx * (240 / Math.max(1, plan.party));
                    const cy = plan.style === 'crater' ? 50 : 65;
                    return (
                      <circle
                        key={idx}
                        cx={cx}
                        cy={cy}
                        r="5"
                        fill="#EDF6FD"
                        stroke="#178CFA"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>

                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3 border-t border-white/12 pt-4">
                  <h3 className="font-display-sans text-2xl font-bold text-[#EDF6FD] uppercase">
                    {details.styleLabel}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 font-hud-mono text-xs text-[#8DE9FF]">
                    <span>{details.partyLabel}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                    <span>{details.durationLabel}</span>
                    <span aria-hidden="true" className="text-white/30">·</span>
                    <span className="text-[#F6C98C]">
                      {plan.roverWalk ? 'ROVER EVA' : 'DOME ONLY'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Minimal Configuration Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                {/* Control 1: Mission Style */}
                <fieldset>
                  <legend className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#AAB7C4] uppercase mb-2">
                    MISSION STYLE
                  </legend>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        { id: 'earthrise', label: 'EARTHRISE RETREAT' },
                        { id: 'crater', label: 'CRATER EXPLORER' },
                      ] as const
                    ).map((option) => {
                      const active = plan.style === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setStyle(option.id)}
                          className={`rounded-[16px] py-3 px-3.5 text-center font-hud-mono text-xs font-bold tracking-[0.12em] uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                            active
                              ? 'bg-[#178CFA]/25 border border-[#8DE9FF] text-[#EDF6FD]'
                              : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Control 2: Party Size */}
                <fieldset>
                  <legend className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#AAB7C4] uppercase mb-2">
                    PARTY SIZE
                  </legend>
                  <div className="grid grid-cols-3 gap-2.5">
                    {([1, 2, 4] as const).map((count) => {
                      const active = plan.party === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setParty(count)}
                          className={`rounded-[16px] py-3 px-4 font-hud-mono text-xs font-semibold tracking-[0.16em] uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                            active
                              ? 'bg-[#178CFA] text-[#EDF6FD] border border-[#8DE9FF]'
                              : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                          }`}
                        >
                          {count} {count === 1 ? 'GUEST' : 'GUESTS'}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Control 3: Duration */}
                <fieldset>
                  <legend className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#AAB7C4] uppercase mb-2">
                    DURATION
                  </legend>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(
                      [
                        { nights: 2, label: '2 NIGHTS' },
                        { nights: 3, label: '3 NIGHTS' },
                      ] as const
                    ).map((item) => {
                      const active = plan.nights === item.nights;
                      return (
                        <button
                          key={item.nights}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setNights(item.nights)}
                          className={`rounded-[16px] py-3 px-4 text-center font-hud-mono text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                            active
                              ? 'bg-[#178CFA]/25 border border-[#8DE9FF] text-[#EDF6FD]'
                              : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Control 4: Optional Guided Rover Walk */}
                <div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={plan.roverWalk}
                    aria-label="Guided Rover Walk"
                    onClick={toggleRoverWalk}
                    className={`w-full flex items-center justify-between gap-4 rounded-[16px] px-4 py-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] ${
                      plan.roverWalk
                        ? 'bg-[#178CFA]/20 border border-[#8DE9FF]/70 text-[#EDF6FD]'
                        : 'bg-white/[0.03] border border-white/10 text-[#AAB7C4] hover:text-[#EDF6FD]'
                    }`}
                  >
                    <span className="font-hud-mono text-xs font-bold tracking-[0.16em] uppercase">
                      GUIDED ROVER WALK
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full font-hud-mono text-[11px] font-semibold uppercase ${
                        plan.roverWalk
                          ? 'bg-[#178CFA] text-[#EDF6FD]'
                          : 'bg-white/10 text-[#AAB7C4]'
                      }`}
                    >
                      {plan.roverWalk ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Console Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <GlassButton
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => setPreviewOpen(true)}
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>PREVIEW MY MISSION</span>
                </GlassButton>

                <div className="grid grid-cols-2 gap-3">
                  <GlassButton
                    type="button"
                    variant="glass"
                    size="sm"
                    onClick={handleQuickCopy}
                    className="w-full"
                  >
                    {inlineCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#8DE9FF]" />
                        <span>BRIEF COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#8DE9FF]" />
                        <span>QUICK COPY BRIEF</span>
                      </>
                    )}
                  </GlassButton>

                  <GlassButton
                    type="button"
                    variant="subtle"
                    size="sm"
                    onClick={handleReset}
                    className="w-full"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>RESET</span>
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Mission Summary Modal */}
      <MissionPreviewDialog
        open={previewOpen}
        plan={plan}
        onClose={() => setPreviewOpen(false)}
        onReset={handleReset}
      />
    </section>
  );
}
