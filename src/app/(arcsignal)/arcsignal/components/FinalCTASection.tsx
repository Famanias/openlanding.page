'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react';
import { ExperienceMode, getConvergedStreamCount } from '../utils/signalLogic';

export interface FinalCTASectionProps {
  onOpenDemo: () => void;
  onOpenInfoModal: (
    topic: 'resources' | 'documentation' | 'about' | 'privacy' | 'social'
  ) => void;
  reducedMotion?: boolean;
  experienceMode?: ExperienceMode;
  syncPulseActive?: boolean;
  ctaScrollProgress?: number;
}

interface ReactorChannelSpec {
  id: number;
  code: string;
  name: string;
  angleLabel: string;
  mainPath: string;
  leftStrand: string;
  rightStrand: string;
  entryPort: { x: number; y: number };
  phaseOffset: number;
}

const REACTOR_CHANNELS: ReactorChannelSpec[] = [
  {
    id: 0,
    code: 'CH_01',
    name: 'Models & Endpoints Stream',
    angleLabel: 'Upper Primary Spine',
    mainPath: 'M 195 14 C 258 75, 345 148, 365 235',
    leftStrand: 'M 190 18 C 252 80, 340 152, 365 235',
    rightStrand: 'M 201 10 C 264 70, 350 144, 365 235',
    entryPort: { x: 325, y: 174 },
    phaseOffset: 0.0,
  },
  {
    id: 1,
    code: 'CH_02',
    name: 'Autonomous Agent Mesh',
    angleLabel: 'Upper Right Intake',
    mainPath: 'M 718 58 L 545 58 C 435 58, 380 140, 365 235',
    leftStrand: 'M 718 53 L 545 53 C 432 53, 376 136, 365 235',
    rightStrand: 'M 718 63 L 545 63 C 439 63, 384 144, 365 235',
    entryPort: { x: 422, y: 152 },
    phaseOffset: 0.22,
  },
  {
    id: 2,
    code: 'CH_03',
    name: 'Governed Tool Execution',
    angleLabel: 'Mid Right Intake',
    mainPath: 'M 718 146 L 535 146 C 440 146, 390 185, 365 235',
    leftStrand: 'M 718 141 L 535 141 C 438 141, 387 181, 365 235',
    rightStrand: 'M 718 151 L 535 151 C 443 151, 393 189, 365 235',
    entryPort: { x: 432, y: 192 },
    phaseOffset: 0.45,
  },
  {
    id: 3,
    code: 'CH_04',
    name: 'Isolated Tenant Knowledge',
    angleLabel: 'Lower Right Intake',
    mainPath: 'M 632 384 C 538 308, 438 208, 365 235',
    leftStrand: 'M 636 379 C 542 303, 441 203, 365 235',
    rightStrand: 'M 627 389 C 533 313, 434 213, 365 235',
    entryPort: { x: 430, y: 248 },
    phaseOffset: 0.67,
  },
  {
    id: 4,
    code: 'CH_05',
    name: 'Telemetry & Audit Feed',
    angleLabel: 'Lateral Calibration Feed',
    mainPath: 'M 692 246 L 530 246 C 455 246, 405 240, 365 235',
    leftStrand: 'M 692 242 L 530 242 C 455 242, 405 237, 365 235',
    rightStrand: 'M 692 250 L 530 250 C 455 250, 405 243, 365 235',
    entryPort: { x: 436, y: 241 },
    phaseOffset: 0.84,
  },
];

const OUTGOING_UNIFIED_PATH =
  'M 365 235 C 352 332, 315 372, 205 372 C 110 372, 62 405, 42 462';

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenDemo,
  onOpenInfoModal,
  reducedMotion = false,
  syncPulseActive = false,
  ctaScrollProgress = 0.85,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<number>(0);
  const [hoveredCTA, setHoveredCTA] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [primaryMagnetic, setPrimaryMagnetic] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [secondaryMagnetic, setSecondaryMagnetic] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Scene 4 scroll-driven stream convergence count (1..5)
  const connectedStreamCount = reducedMotion
    ? 5
    : getConvergedStreamCount(ctaScrollProgress);

  // Reactor animation state (staggered intake packets, aperture rotation, fusion wave, output packet)
  const channelPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const outputPathRef = useRef<SVGPathElement | null>(null);
  const [reactorClock, setReactorClock] = useState<{
    intakePoints: { x: number; y: number; progress: number }[];
    outputPoint: { x: number; y: number; progress: number };
    fusionPulse: number;
    apertureAngle: number;
  }>({
    intakePoints: REACTOR_CHANNELS.map(() => ({ x: 365, y: 235, progress: 0.5 })),
    outputPoint: { x: 205, y: 372, progress: 0.5 },
    fusionPulse: 0,
    apertureAngle: 0,
  });

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    const start = performance.now();

    const stepReactor = (now: number) => {
      const t = (now - start) * 0.001;
      const speed = hoveredCTA || syncPulseActive ? 0.38 : 0.24;

      const intakePoints = REACTOR_CHANNELS.map((ch, idx) => {
        const prog = (t * speed + ch.phaseOffset) % 1;
        const pathEl = channelPathRefs.current[idx];
        if (pathEl) {
          try {
            const len = pathEl.getTotalLength();
            const pt = pathEl.getPointAtLength(prog * len);
            return { x: pt.x, y: pt.y, progress: prog };
          } catch {
            // fallback
          }
        }
        return { x: ch.entryPort.x, y: ch.entryPort.y, progress: prog };
      });

      const outProg = (t * (speed * 1.15)) % 1;
      let outputPoint = { x: 205, y: 372, progress: outProg };
      if (outputPathRef.current) {
        try {
          const outLen = outputPathRef.current.getTotalLength();
          const pt = outputPathRef.current.getPointAtLength(outProg * outLen);
          outputPoint = { x: pt.x, y: pt.y, progress: outProg };
        } catch {
          // fallback
        }
      }

      // Controlled periodic convergence pulse once streams synchronize
      const cyclePhase = (t * 0.25) % 1;
      const rawFusion =
        cyclePhase > 0.74 ? Math.sin(((cyclePhase - 0.74) / 0.26) * Math.PI) : 0;
      const fusionPulse = hoveredCTA || syncPulseActive ? Math.max(0.68, rawFusion) : rawFusion;

      setReactorClock({
        intakePoints,
        outputPoint,
        fusionPulse,
        apertureAngle: (t * 11) % 360,
      });

      rafId = requestAnimationFrame(stepReactor);
    };

    rafId = requestAnimationFrame(stepReactor);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, hoveredCTA, syncPulseActive]);

  const handleMagneticMove = (
    e: React.MouseEvent<HTMLButtonElement>,
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 6.5;
    const dy = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 5;
    setter({ x: dx, y: dy });
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('hello@arcandsignal.example').catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleExplorePlatform = () => {
    const el = document.getElementById('platform');
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const activeChannel = REACTOR_CHANNELS[selectedBranch] || REACTOR_CHANNELS[0];
  const scrollRotorDegrees = reducedMotion ? 0 : ctaScrollProgress * 32;
  const asOneProgress = Math.min(1, Math.max(0.35, connectedStreamCount / 5));

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative w-full pt-24 pb-12 lg:pt-32 overflow-hidden"
    >
      {/* Subtle radial convergence glow matching Reference 04 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[18%] h-[560px] w-[560px] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(165,138,255,0.34) 0%, rgba(83,103,249,0.18) 50%, rgba(12,15,27,0) 75%)',
        }}
      />

      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        {/* MAIN CTA SPLIT ROW */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 pb-20 lg:pb-28">
          {/* LEFT EDITORIAL COLUMN (5 cols) */}
          <div className="relative z-20 flex flex-col items-start lg:col-span-5">
            <p className="font-mono-tech text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-[#9DA7C7] mb-5">
              03 / WHAT&apos;S NEXT
            </p>

            <h2
              id="cta-heading"
              className="font-display font-bold uppercase tracking-[-0.025em] text-[#F3F4FA] leading-[0.98] text-[clamp(2.45rem,4.8vw,4.5rem)] mb-6"
            >
              <span className="line-mask">
                <span className="line-mask-inner">MAKE EVERY</span>
              </span>
              <span className="line-mask">
                <span className="line-mask-inner">MODEL MOVE</span>
              </span>
              <span className="line-mask mt-1">
                <span
                  className="line-mask-inner text-as-one-glow"
                  style={{
                    opacity: 0.55 + asOneProgress * 0.45,
                    letterSpacing: `${(1 - asOneProgress) * 0.04 - 0.025}em`,
                  }}
                >
                  AS ONE.
                </span>
              </span>
            </h2>

            <p className="text-base sm:text-lg leading-[1.6] text-[#9DA7C7] max-w-[44ch] mb-9">
              Bring your AI systems together. Build with more clarity, run with more control, and
              move from experimentation to execution.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onOpenDemo}
                onMouseEnter={() => setHoveredCTA(true)}
                onMouseMove={(e) => handleMagneticMove(e, setPrimaryMagnetic)}
                onMouseLeave={() => {
                  setHoveredCTA(false);
                  setPrimaryMagnetic({ x: 0, y: 0 });
                }}
                onFocus={() => setHoveredCTA(true)}
                onBlur={() => setHoveredCTA(false)}
                style={{
                  transform: `translate3d(${primaryMagnetic.x}px, ${primaryMagnetic.y}px, 0)`,
                }}
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-primary whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF]"
              >
                <span>BOOK A DEMO</span>
                <ArrowUpRight className="h-4 w-4 btn-arrow-icon" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleExplorePlatform}
                onMouseEnter={() => setHoveredCTA(true)}
                onMouseMove={(e) => handleMagneticMove(e, setSecondaryMagnetic)}
                onMouseLeave={() => {
                  setHoveredCTA(false);
                  setSecondaryMagnetic({ x: 0, y: 0 });
                }}
                style={{
                  transform: `translate3d(${secondaryMagnetic.x}px, ${secondaryMagnetic.y}px, 0)`,
                }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-outline whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
              >
                <span>EXPLORE THE PLATFORM</span>
              </button>
            </div>

            <p className="font-mono-tech text-[11px] sm:text-xs tracking-[0.2em] text-[#9299B4] uppercase">
              YOUR INTELLIGENCE. ONE CONNECTED SYSTEM.
            </p>
          </div>

          {/* RIGHT CONVERGENCE REACTOR GRAPHIC (7 cols — Scene 4 Multi-Stream Convergence) */}
          <div className="relative z-10 lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center">
              {/* Target Anchor for the Master Continuous SVG Signal */}
              <div
                data-signal-anchor="cta-convergence"
                className="pointer-events-none absolute left-[48%] top-[48%] h-2 w-2"
                aria-hidden="true"
              />

              <svg
                viewBox="0 0 760 480"
                className="w-full h-full overflow-visible"
                aria-label="Optical Convergence Reactor"
              >
                <defs>
                  <radialGradient id="cta-nexus-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F3F4FA" stopOpacity="0.82" />
                    <stop offset="28%" stopColor="#D4C9FF" stopOpacity="0.48" />
                    <stop offset="65%" stopColor="#5367F9" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#0C0F1B" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="cta-chamber-well" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#05070F" stopOpacity="0.98" />
                    <stop offset="70%" stopColor="#0D1224" stopOpacity="0.94" />
                    <stop offset="100%" stopColor="#1D2646" stopOpacity="0.88" />
                  </radialGradient>

                  <linearGradient id="cta-branch-grad" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5367F9" stopOpacity="0.42" />
                    <stop offset="62%" stopColor="#A58AFF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F3F4FA" stopOpacity="1" />
                  </linearGradient>

                  <linearGradient id="cta-output-grad" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="35%" stopColor="#D4C9FF" stopOpacity="0.96" />
                    <stop offset="75%" stopColor="#8E72FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#5367F9" stopOpacity="0.82" />
                  </linearGradient>
                </defs>

                {/* Architectural Grid Axes behind Reactor */}
                <g stroke="rgba(157,167,199,0.09)" strokeWidth="1">
                  <line x1="365" y1="10" x2="365" y2="470" />
                  <line x1="60" y1="235" x2="720" y2="235" />
                </g>

                {/* 1. Outer Calibration Ring & Concentric Measurement Rings */}
                <circle
                  cx="365"
                  cy="235"
                  r="216"
                  fill="none"
                  stroke="rgba(42, 53, 92, 0.72)"
                  strokeWidth="8"
                  strokeDasharray="190 36 120 28 240 42"
                  strokeLinecap="round"
                />
                <circle
                  cx="365"
                  cy="235"
                  r="216"
                  fill="none"
                  stroke="rgba(165, 138, 255, 0.25)"
                  strokeWidth="1.2"
                  strokeDasharray="190 36 120 28 240 42"
                  strokeLinecap="round"
                />

                {[192, 166, 142, 118, 96, 76].map((r, idx) => (
                  <circle
                    key={r}
                    cx="365"
                    cy="235"
                    r={r}
                    fill="none"
                    stroke={idx % 2 === 0 ? 'rgba(165,138,255,0.24)' : 'rgba(157,167,199,0.14)'}
                    strokeWidth={idx === 1 ? '1.5' : '1'}
                    strokeDasharray={idx === 0 || idx === 3 ? '4 8' : undefined}
                  />
                ))}

                {/* Radial Precision Calibration Ticks around r=192 */}
                <g
                  stroke="rgba(157, 167, 199, 0.28)"
                  strokeWidth="1"
                  transform={`translate(365, 235) rotate(${Math.round(scrollRotorDegrees * 0.35 * 100) / 100}) translate(-365, -235)`}
                >
                  {Array.from({ length: 36 }).map((_, idx) => {
                    const deg = idx * 10;
                    const innerR = idx % 3 === 0 ? 182 : 186;
                    const outerR = 192;
                    return (
                      <line
                        key={deg}
                        x1={365 + innerR}
                        y1={235}
                        x2={365 + outerR}
                        y2={235}
                        transform={`rotate(${deg}, 365, 235)`}
                      />
                    );
                  })}
                </g>

                {/* Micro Technical Readout Labels on Reactor Perimeter */}
                <g className="font-mono-tech" fontSize="9.5" fill="rgba(157, 167, 199, 0.72)">
                  <text x="196" y="88" letterSpacing="1.5">
                    REACTOR // A&amp;S_CONV_04
                  </text>
                  <text x="438" y="96" letterSpacing="1.5" fill="rgba(212, 201, 255, 0.88)">
                    STREAMS SYNCHRONIZED [0{connectedStreamCount}/05]
                  </text>
                </g>

                {/* Small Technical Axis Nodes on the Concentric Rings */}
                {[192, 166, 142].map((r) => (
                  <g
                    key={`nodes-${r}`}
                    fill="#0D1224"
                    stroke="rgba(165,138,255,0.52)"
                    strokeWidth="1.2"
                  >
                    <circle cx={365 - r} cy="235" r="3.5" />
                    <circle cx="365" cy={235 - r} r="3.5" />
                  </g>
                ))}

                {/* 2. Routed Multi-Strand Optical Intake Channels (5 Staggered Channels) */}
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {REACTOR_CHANNELS.map((ch, idx) => {
                    const isConnected = idx < connectedStreamCount;
                    const isFocused = selectedBranch === idx;
                    return (
                      <g
                        key={ch.id}
                        opacity={isConnected ? 1 : 0.25}
                        style={{ transition: 'opacity 360ms ease' }}
                      >
                        {/* Base Channel Halo */}
                        <path
                          d={ch.mainPath}
                          stroke={
                            isFocused
                              ? 'rgba(165, 138, 255, 0.34)'
                              : 'rgba(151, 127, 255, 0.18)'
                          }
                          strokeWidth={isFocused ? '16' : '12'}
                        />
                        {/* Left & Right Parallel Fiber Strands */}
                        <path
                          d={ch.leftStrand}
                          stroke="rgba(83, 103, 249, 0.58)"
                          strokeWidth={isFocused ? '1.4' : '1.05'}
                        />
                        <path
                          d={ch.rightStrand}
                          stroke="rgba(212, 201, 255, 0.46)"
                          strokeWidth={isFocused ? '1.3' : '1.0'}
                        />
                        {/* Primary Crisp Intake Filament */}
                        <path
                          ref={(el) => {
                            channelPathRefs.current[idx] = el;
                          }}
                          d={ch.mainPath}
                          stroke="url(#cta-branch-grad)"
                          strokeWidth={isFocused ? '3.4' : '2.2'}
                        />
                        {/* Machined Entry-Port Collar on Reactor Outer Ring */}
                        <circle
                          cx={ch.entryPort.x}
                          cy={ch.entryPort.y}
                          r={isFocused ? 6.5 : 5}
                          fill="#0B0F1D"
                          stroke={isFocused ? '#F3F4FA' : '#A58AFF'}
                          strokeWidth="1.5"
                        />
                        <circle
                          cx={ch.entryPort.x}
                          cy={ch.entryPort.y}
                          r="2.2"
                          fill={isConnected ? '#F3F4FA' : '#9DA7C7'}
                        />
                      </g>
                    );
                  })}

                  {/* 5. Unified Output Stream (Higher Coherent Density than Individual Inputs) */}
                  <path
                    d={OUTGOING_UNIFIED_PATH}
                    stroke="rgba(165, 138, 255, 0.34)"
                    strokeWidth={18 + connectedStreamCount * 1.2}
                  />
                  <path
                    d="M 365 235 C 346 326, 310 364, 202 364 C 106 364, 56 398, 36 456"
                    stroke="rgba(83, 103, 249, 0.78)"
                    strokeWidth="1.65"
                  />
                  <path
                    d="M 365 235 C 358 338, 320 380, 208 380 C 116 380, 68 412, 48 466"
                    stroke="rgba(212, 201, 255, 0.72)"
                    strokeWidth="1.5"
                  />
                  <path
                    ref={outputPathRef}
                    d={OUTGOING_UNIFIED_PATH}
                    stroke="url(#cta-output-grad)"
                    strokeWidth={3.2 + (connectedStreamCount / 5) * 1.2}
                  />
                  {/* Machined Lower-Left Output Port Collar */}
                  <circle
                    cx="352"
                    cy="298"
                    r="6.5"
                    fill="#0B0F1D"
                    stroke="#F3F4FA"
                    strokeWidth="1.6"
                  />
                  <circle cx="352" cy="298" r="2.6" fill="#FFFFFF" />
                </g>

                {/* Staggered Incoming Light Packets & Unified Outgoing Packet */}
                {!reducedMotion && (
                  <g>
                    {reactorClock.intakePoints.map((pt, idx) => {
                      if (idx >= connectedStreamCount) return null;
                      return (
                        <g key={`in-pkt-${idx}`}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="9"
                            fill="rgba(212, 201, 255, 0.36)"
                          />
                          <circle cx={pt.x} cy={pt.y} r="3.2" fill="#FFFFFF" />
                        </g>
                      );
                    })}
                    {/* High-density unified output packet */}
                    <circle
                      cx={reactorClock.outputPoint.x}
                      cy={reactorClock.outputPoint.y}
                      r="13"
                      fill="rgba(212, 201, 255, 0.45)"
                    />
                    <circle
                      cx={reactorClock.outputPoint.x}
                      cy={reactorClock.outputPoint.y}
                      r="4.2"
                      fill="#FFFFFF"
                    />
                  </g>
                )}

                {/* 3. Central 2.5D Lens Chamber & 4. Internal 6-Petal Fusion Aperture */}
                <circle
                  cx="365"
                  cy="235"
                  r={112 + reactorClock.fusionPulse * 16 + connectedStreamCount * 1.8}
                  fill="url(#cta-nexus-glow)"
                />

                {/* Expanding Harmonic Convergence Pulse Ring */}
                {reactorClock.fusionPulse > 0.05 && (
                  <circle
                    cx="365"
                    cy="235"
                    r={46 + reactorClock.fusionPulse * 68}
                    fill="none"
                    stroke="rgba(243, 244, 250, 0.65)"
                    strokeWidth={2.2 - reactorClock.fusionPulse * 1.4}
                  />
                )}

                {/* Stepped Dark Obsidian & Gunmetal Chamber Housing */}
                <circle
                  cx="365"
                  cy="235"
                  r="58"
                  fill="url(#cta-chamber-well)"
                  stroke="#36436E"
                  strokeWidth="2.2"
                />
                <circle
                  cx="365"
                  cy="235"
                  r="46"
                  fill="#05070F"
                  stroke="rgba(165, 138, 255, 0.45)"
                  strokeWidth="1.4"
                  strokeDasharray="18 6"
                />

                {/* Internal 6-Segment Rotating Optical Fusion Aperture (scroll + calm idle alignment) */}
                <g
                  transform={`translate(365, 235) rotate(${
                    reactorClock.apertureAngle + scrollRotorDegrees
                  })`}
                >
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const deg = idx * 60;
                    const isSectorLit =
                      idx < connectedStreamCount ||
                      idx === selectedBranch ||
                      reactorClock.fusionPulse > 0.35;
                    return (
                      <g key={deg} transform={`rotate(${deg})`}>
                        <path
                          d="M 14 -6 L 34 -11 L 38 -3 L 16 4 Z"
                          fill={isSectorLit ? 'rgba(165, 138, 255, 0.72)' : '#182039'}
                          stroke={isSectorLit ? '#F3F4FA' : '#3C4A78'}
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Inner High-Index Optical Singularity Lens (compresses slightly at full 5-stream lock) */}
                <circle
                  cx="365"
                  cy="235"
                  r={18 + reactorClock.fusionPulse * 3.5}
                  fill="rgba(165, 138, 255, 0.38)"
                  stroke="#D4C9FF"
                  strokeWidth="1.5"
                />
                <circle
                  cx="365"
                  cy="235"
                  r={7.5 + reactorClock.fusionPulse * 2}
                  fill="#F3F4FA"
                />
              </svg>

              {/* Interactive Convergence Branch Selector Strip */}
              <div className="absolute bottom-2 right-2 flex flex-wrap items-center gap-1.5 bg-[#11172A]/90 border border-[#9DA7C7]/22 rounded-full px-3 py-1.5">
                <span className="font-mono-tech text-[10px] text-[#9DA7C7] mr-1">
                  CONVERGED STREAM:
                </span>
                {REACTOR_CHANNELS.slice(0, 4).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranch(b.id)}
                    aria-pressed={selectedBranch === b.id}
                    className={`rounded-full px-2.5 py-0.5 font-mono-tech text-[10px] transition-colors cursor-pointer ${
                      selectedBranch === b.id
                        ? 'bg-[#A58AFF] text-[#0C0F1B] font-semibold'
                        : 'text-[#9DA7C7] hover:text-[#F3F4FA]'
                    }`}
                  >
                    0{b.id + 1}
                  </button>
                ))}
                <span className="font-mono-tech text-[10px] text-[#D4C9FF] ml-1 hidden sm:inline">
                  {activeChannel.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SCENE 5: STRUCTURED FOOTER LANDING WITH ENERGETIC DIVIDING LINE   */}
        {/* ================================================================= */}
        <footer
          aria-label="Site Footer"
          className="relative z-20 border-t border-[#9DA7C7]/18 pt-12 pb-6"
        >
          {/* Energetic Strand Transitioning into Footer Top Dividing Line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[-1px] h-[2px] rounded-full bg-gradient-to-r from-[#D4C9FF] via-[#A58AFF] to-transparent shadow-[0_0_14px_#A58AFF]"
            style={{
              width: `${Math.min(100, Math.max(22, ctaScrollProgress * 92))}%`,
              transition: reducedMotion ? 'none' : 'width 260ms linear',
            }}
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12">
            {/* Brand Column (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-start">
              <a
                href="#top"
                className="flex items-center gap-3 text-[#F3F4FA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] rounded mb-3"
              >
                <img
                  src="/templates/arcsignal/arc-signal-mark.svg"
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="h-7 w-7"
                />
                <span className="font-display text-xl font-semibold tracking-[0.06em] uppercase">
                  ARC &amp; SIGNAL
                </span>
              </a>
              <p className="font-mono-tech text-[11px] tracking-[0.18em] text-[#9299B4] uppercase">
                THE INTELLIGENCE ORCHESTRATION LAYER
              </p>
            </div>

            {/* Links Columns: PLATFORM / EXPLORE / COMPANY (5 cols) */}
            <div className="md:col-span-5 grid grid-cols-3 gap-6">
              <div>
                <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#9299B4] mb-3.5">
                  PLATFORM
                </h3>
                <ul className="space-y-2.5 text-sm text-[#9DA7C7]">
                  <li>
                    <a href="#top" className="hover:text-[#F3F4FA] transition-colors">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#capabilities" className="hover:text-[#F3F4FA] transition-colors">
                      Capabilities
                    </a>
                  </li>
                  <li>
                    <a href="#architecture" className="hover:text-[#F3F4FA] transition-colors">
                      Architecture
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#9299B4] mb-3.5">
                  EXPLORE
                </h3>
                <ul className="space-y-2.5 text-sm text-[#9DA7C7]">
                  <li>
                    <a href="#platform" className="hover:text-[#F3F4FA] transition-colors">
                      Solutions
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoModal('resources')}
                      className="hover:text-[#F3F4FA] transition-colors cursor-pointer text-left"
                    >
                      Resources
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoModal('documentation')}
                      className="hover:text-[#F3F4FA] transition-colors cursor-pointer text-left"
                    >
                      Documentation
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#9299B4] mb-3.5">
                  COMPANY
                </h3>
                <ul className="space-y-2.5 text-sm text-[#9DA7C7]">
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoModal('about')}
                      className="hover:text-[#F3F4FA] transition-colors cursor-pointer text-left"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenDemo}
                      className="hover:text-[#F3F4FA] transition-colors cursor-pointer text-left"
                    >
                      Contact
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onOpenInfoModal('privacy')}
                      className="hover:text-[#F3F4FA] transition-colors cursor-pointer text-left"
                    >
                      Privacy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Contact Box (3 cols) matching Reference 04 */}
            <div className="md:col-span-3">
              <div className="rounded-xl bg-[#11172A]/90 border border-[#9DA7C7]/22 p-4">
                <div className="font-mono-tech text-[11px] uppercase tracking-[0.15em] text-[#F3F4FA] mb-1.5">
                  LET&apos;S CONNECT
                </div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs sm:text-sm text-[#9DA7C7] truncate">
                    hello@arcandsignal.example
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy example contact email"
                    className="inline-flex items-center gap-1 rounded bg-[#171D32] px-2 py-1 font-mono-tech text-[10px] text-[#D4C9FF] hover:bg-[#A58AFF]/25 cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-4 font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#9299B4]">
                  <button
                    type="button"
                    onClick={() => onOpenInfoModal('social')}
                    className="hover:text-[#F3F4FA] transition-colors cursor-pointer"
                  >
                    LINKEDIN
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenInfoModal('social')}
                    className="hover:text-[#F3F4FA] transition-colors cursor-pointer"
                  >
                    GITHUB
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Back to Top Bar */}
          <div className="border-t border-[#9DA7C7]/14 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] tracking-[0.16em] text-[#9299B4] uppercase">
            <span>© 2026 ARC &amp; SIGNAL. CONCEPT PLATFORM.</span>
            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1.5 text-[#9DA7C7] hover:text-[#F3F4FA] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] rounded px-2 py-1"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3.5 w-3.5 text-[#A58AFF]" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};
