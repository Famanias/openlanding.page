'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  HeroCoreCanvas,
  CoreHotspotId,
  ProjectedCoreAnchors,
} from './HeroCoreCanvas';
import { ExperienceMode, WorkflowRunStatus } from '../utils/signalLogic';

export interface HeroSectionProps {
  selectedHotspot: CoreHotspotId;
  onSelectHotspot: (id: CoreHotspotId) => void;
  onHoverHotspotChange?: (id: CoreHotspotId | null) => void;
  onOpenDemo: () => void;
  scrollProgress: number;
  heroScrollProgress?: number;
  reducedMotion: boolean;
  experienceMode?: ExperienceMode;
  syncPulseActive?: boolean;
  routeTriggerCount?: number;
  onProjectedAnchorsChange: (anchors: ProjectedCoreAnchors) => void;
  workflowStatus: WorkflowRunStatus;
  activeStageIndex: number;
}

const HOTSPOT_DETAILS: Record<
  CoreHotspotId,
  {
    label: string;
    portCode: string;
    routingMode: string;
    summary: string;
    metricLabel: string;
    bars: number[];
  }
> = {
  models: {
    label: 'MODELS',
    portCode: 'PORT_M01 // INGRESS_SYNC',
    routingMode: 'ACTIVE / OPTIMAL',
    summary: 'Dynamic multi-endpoint routing across fast, balanced, and deep-reasoning models.',
    metricLabel: '3 ENDPOINTS READY · AUTO-FALLBACK',
    bars: [35, 58, 42, 76, 64, 92, 48, 84, 70, 95, 62, 88],
  },
  agents: {
    label: 'AGENTS',
    portCode: 'PORT_A02 // MESH_BUS',
    routingMode: 'COORDINATED / SYNC',
    summary: 'Specialized planner, retriever, and execution agents operating on shared state.',
    metricLabel: '4 AGENT ROLES · DETERMINISTIC HANDOFF',
    bars: [50, 72, 65, 88, 78, 94, 82, 60, 86, 90, 74, 96],
  },
  tools: {
    label: 'TOOLS',
    portCode: 'PORT_T03 // SANDBOX_IO',
    routingMode: 'SANDBOXED / VERIFIED',
    summary: 'Schema-validated function invocations for CRM, ticketing, and system probes.',
    metricLabel: '6 SCOPED TOOLS · DRY-RUN GATED',
    bars: [44, 62, 80, 56, 74, 86, 68, 92, 58, 78, 84, 90],
  },
  data: {
    label: 'DATA',
    portCode: 'PORT_D04 // VECTOR_VAULT',
    routingMode: 'ISOLATED / GROUNDED',
    summary: 'Tenant-scoped hybrid vector and entitlement graph retrieval with zero PII leakage.',
    metricLabel: 'TENANT ISOLATION · PII REDACTED',
    bars: [64, 48, 76, 84, 52, 90, 72, 68, 94, 80, 66, 92],
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedHotspot,
  onSelectHotspot,
  onHoverHotspotChange,
  onOpenDemo,
  scrollProgress,
  heroScrollProgress = 0,
  reducedMotion,
  experienceMode = 'idle',
  syncPulseActive = false,
  routeTriggerCount = 0,
  onProjectedAnchorsChange,
  workflowStatus,
  activeStageIndex,
}) => {
  const [hoveredHotspot, setHoveredHotspot] = useState<CoreHotspotId | null>(null);
  const [localHotspotCoords, setLocalHotspotCoords] = useState<
    Record<CoreHotspotId, { x: number; y: number }>
  >({
    models: { x: 240, y: 155 },
    agents: { x: 520, y: 255 },
    tools: { x: 470, y: 445 },
    data: { x: 280, y: 485 },
  });

  // Scene 0 Opening Sequence State (0 -> 1 over ~1.8s on initial mount, or immediate if reducedMotion/deep-scrolled)
  const [bootPhase, setBootPhase] = useState<'initializing' | 'routing' | 'ready'>(
    reducedMotion ? 'ready' : 'initializing'
  );
  const [bootDotCount, setBootDotCount] = useState<number>(reducedMotion ? 6 : 1);
  const [primaryBtnOffset, setPrimaryBtnOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [secondaryBtnOffset, setSecondaryBtnOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const manifoldPathRef = useRef<SVGPathElement | null>(null);
  const [heroPacketPt, setHeroPacketPt] = useState<{ x: number; y: number }>({ x: 346, y: 464 });

  useEffect(() => {
    if (reducedMotion || (typeof window !== 'undefined' && window.scrollY > 120)) {
      setBootPhase('ready');
      setBootDotCount(6);
      return;
    }

    const t1 = window.setTimeout(() => setBootPhase('routing'), 520);
    const t2 = window.setTimeout(() => setBootPhase('ready'), 1280);
    const dotInterval = window.setInterval(() => {
      setBootDotCount((c) => (c < 6 ? c + 1 : 6));
    }, 210);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearInterval(dotInterval);
    };
  }, [reducedMotion]);

  // Compute deterministic Hero-local packet position along the manifold -> output route during scroll & idle
  useEffect(() => {
    const pathEl = manifoldPathRef.current;
    if (!pathEl) return;
    try {
      const total = pathEl.getTotalLength();
      const t = Math.min(1, Math.max(0, heroScrollProgress * 1.35 + (bootPhase === 'ready' ? 0.32 : 0.08)));
      const pt = pathEl.getPointAtLength(t * total);
      setHeroPacketPt({ x: pt.x, y: pt.y });
    } catch {
      // ignore in non-DOM
    }
  }, [heroScrollProgress, bootPhase, selectedHotspot]);

  const activeCategory = hoveredHotspot || selectedHotspot;
  const currentDetail = HOTSPOT_DETAILS[activeCategory];

  // Scene 0 telemetry handoff status text
  const displayedRoutingMode =
    bootPhase === 'initializing'
      ? 'INITIALIZING // SYNC_00'
      : bootPhase === 'routing'
      ? 'ROUTING // CALIBRATING'
      : currentDetail.routingMode;

  const handleHover = (id: CoreHotspotId | null) => {
    setHoveredHotspot(id);
    if (onHoverHotspotChange) {
      onHoverHotspotChange(id);
    }
  };

  const handleAnchorsUpdate = (anchors: ProjectedCoreAnchors) => {
    setLocalHotspotCoords(anchors.hotspots);
    onProjectedAnchorsChange(anchors);
  };

  const handleExplorePlatform = () => {
    const el = document.getElementById('platform');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Scene 1 scroll-scrubbed transforms (reversible, smooth, never obscuring text)
  const clampedHeroScroll = Math.min(1, Math.max(0, heroScrollProgress));
  const headlineShiftY = reducedMotion ? 0 : clampedHeroScroll * -18;
  const orbitTranslateX = reducedMotion ? 0 : clampedHeroScroll * 16;
  const orbitTranslateY = reducedMotion ? 0 : clampedHeroScroll * -20;
  const outerRingAngle = -22 + (reducedMotion ? 0 : clampedHeroScroll * 18);
  const innerRingAngle = (reducedMotion ? 0 : -clampedHeroScroll * 24);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative min-h-[min(calc(100vh-72px),820px)] flex items-center w-full overflow-x-clip pt-8 pb-16 lg:pt-12 lg:pb-24"
    >
      {/* Scene 0 Opening Traveling Light Sweep across the Architectural Field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hero-grid-sweep"
      />

      <div className="mx-auto w-full max-w-[1480px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT COLUMN: Editorial Hero Copy (5 cols) */}
          <div
            className="relative z-20 flex flex-col items-start lg:col-span-5"
            style={{
              transform: `translate3d(0, ${headlineShiftY}px, 0)`,
              transition: reducedMotion ? 'none' : 'transform 120ms linear',
            }}
          >
            <p className="font-mono-tech text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-[#9DA7C7] mb-5">
              THE INTELLIGENCE ORCHESTRATION LAYER
            </p>

            {/* Scene 0 Masked Line-by-Line Typography + SYNC. Tracking Compression */}
            <h1
              id="hero-heading"
              className="font-display font-bold uppercase tracking-[-0.025em] text-[#F3F4FA] leading-[0.96] text-[clamp(2.85rem,5.6vw,5.35rem)] mb-7"
            >
              <span className="line-mask">
                <span
                  className="line-mask-inner"
                  style={{
                    transform:
                      bootPhase === 'initializing' && !reducedMotion
                        ? 'translate3d(0, 14%, 0)'
                        : 'translate3d(0, 0%, 0)',
                  }}
                >
                  INTELLIGENCE,
                </span>
              </span>
              <span className="line-mask mt-1">
                <span
                  className="line-mask-inner"
                  style={{
                    transform:
                      bootPhase === 'initializing' && !reducedMotion
                        ? 'translate3d(0, 18%, 0)'
                        : 'translate3d(0, 0%, 0)',
                  }}
                >
                  IN{' '}
                  <span
                    className="text-signal-gradient inline-block"
                    style={{
                      letterSpacing:
                        bootPhase === 'initializing' && !reducedMotion ? '0.06em' : '-0.025em',
                      transition: 'letter-spacing 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    SYNC.
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-[19px] leading-[1.6] text-[#9DA7C7] max-w-[48ch] mb-9 font-normal">
              Connect models, agents, tools, and data in one orchestration layer built for clarity,
              control, and scale.
            </p>

            {/* Primary & Secondary CTAs with Restrained Magnetic Attraction */}
            <div className="flex flex-wrap items-center gap-4 mb-12 lg:mb-16">
              <button
                type="button"
                onClick={handleExplorePlatform}
                onMouseMove={(e) => handleMagneticMove(e, setPrimaryBtnOffset)}
                onMouseLeave={() => setPrimaryBtnOffset({ x: 0, y: 0 })}
                style={{
                  transform: `translate3d(${primaryBtnOffset.x}px, ${primaryBtnOffset.y}px, 0)`,
                }}
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-primary whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF]"
              >
                <span>EXPLORE PLATFORM</span>
                <ArrowUpRight className="h-4 w-4 btn-arrow-icon" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                onMouseMove={(e) => handleMagneticMove(e, setSecondaryBtnOffset)}
                onMouseLeave={() => setSecondaryBtnOffset({ x: 0, y: 0 })}
                style={{
                  transform: `translate3d(${secondaryBtnOffset.x}px, ${secondaryBtnOffset.y}px, 0)`,
                }}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-outline whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
              >
                <span>BOOK A DEMO</span>
              </button>
            </div>

            {/* Bottom Microline + 4 Hotspot Indicator Dots */}
            <div className="flex flex-col gap-3 pt-2 border-t border-[#9DA7C7]/15 w-full max-w-md">
              <p className="font-mono-tech text-[11px] sm:text-xs tracking-[0.2em] text-[#9299B4] uppercase">
                ONE CONTROL PLANE. EVERY INTELLIGENT WORKFLOW.
              </p>
              <div className="flex items-center gap-2.5" role="group" aria-label="Core layer indicator">
                {(['models', 'agents', 'tools', 'data'] as CoreHotspotId[]).map((id) => {
                  const isActive = activeCategory === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onSelectHotspot(id)}
                      onMouseEnter={() => handleHover(id)}
                      onMouseLeave={() => handleHover(null)}
                      aria-label={`Inspect ${id} orchestration branch`}
                      aria-pressed={selectedHotspot === id}
                      className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'w-6 bg-[#F3F4FA] shadow-[0_0_8px_#A58AFF]'
                          : 'w-2 bg-[#9DA7C7]/35 hover:bg-[#9DA7C7]/70'
                      }`}
                    />
                  );
                })}
                <span className="ml-2 font-mono-tech text-[11px] text-[#A58AFF] uppercase tracking-wider">
                  [{currentDetail.label} · {experienceMode.toUpperCase()}]
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 2.5D Three.js Intelligence Engine + Intake/Output Port Routing & Live DOM Overlays (7 cols) */}
          <div className="relative z-10 lg:col-span-7 flex flex-col items-center justify-center">
            <div
              className="relative w-full h-[420px] sm:h-[540px] lg:h-[640px]"
              style={{
                transform: `translate3d(${orbitTranslateX}px, ${orbitTranslateY}px, 0)`,
                transition: reducedMotion ? 'none' : 'transform 120ms linear',
              }}
            >
              {/* Isometric Architectural Underlay, Intake/Output Port Manifold, & Leader Line SVG */}
              <svg
                aria-hidden="true"
                viewBox="0 0 760 640"
                className="pointer-events-none absolute inset-0 h-full w-full z-10 overflow-visible"
              >
                <defs>
                  <linearGradient id="hero-ingress-grad" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F3F4FA" stopOpacity="0.96" />
                    <stop offset="45%" stopColor="#A58AFF" stopOpacity="0.92" />
                    <stop offset="100%" stopColor="#5367F9" stopOpacity="0.88" />
                  </linearGradient>
                  <radialGradient id="hero-core-backdrop" cx="56%" cy="48%" r="42%">
                    <stop offset="0%" stopColor="#7C62F5" stopOpacity="0.22" />
                    <stop offset="55%" stopColor="#263366" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#0C0F1B" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="hero-gunmetal-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#465380" stopOpacity="0.72" />
                    <stop offset="50%" stopColor="#1D2542" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#0D1224" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="hero-optical-arc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4C9FF" stopOpacity="0.78" />
                    <stop offset="55%" stopColor="#8A6FFF" stopOpacity="0.62" />
                    <stop offset="100%" stopColor="#4658D2" stopOpacity="0.48" />
                  </linearGradient>
                </defs>

                {/* Radial Core Aura */}
                <circle cx="430" cy="305" r="250" fill="url(#hero-core-backdrop)" />

                {/* Isometric diamond calibration frame & instrumentation tracks */}
                <g stroke="rgba(157, 167, 199, 0.14)" strokeWidth="1" fill="none">
                  <polygon points="430,25 735,295 430,575 125,295" />
                  <polygon points="430,80 680,295 430,520 180,295" strokeDasharray="4 6" />
                  <line x1="80" y1="335" x2="290" y2="335" />
                  <line x1="560" y1="340" x2="725" y2="340" />
                  <line x1="540" y1="115" x2="660" y2="115" />
                </g>

                {/* 2.5D High-Contrast Gunmetal & Recessed Aperture Underlay (uncoils subtly with Scene 1 scroll) */}
                <g
                  transform={`translate(430, 305) rotate(${outerRingAngle}) scale(1, ${
                    0.84 + clampedHeroScroll * 0.04
                  })`}
                >
                  {/* Outer calibration tracks */}
                  <circle r="244" fill="none" stroke="rgba(165, 138, 255, 0.22)" strokeWidth="1.1" />
                  <circle
                    r="222"
                    fill="none"
                    stroke="rgba(157, 167, 199, 0.24)"
                    strokeWidth="1.1"
                    strokeDasharray="6 8"
                  />

                  {/* Deep 2.5D Extruded Side-Wall Shadow */}
                  <circle
                    cx="-14"
                    cy="18"
                    r="196"
                    fill="#070A14"
                    stroke="rgba(83, 103, 249, 0.3)"
                    strokeWidth="2"
                  />

                  {/* Outer Gunmetal Segmented Structural Housing */}
                  <circle
                    r="188"
                    fill="none"
                    stroke="url(#hero-gunmetal-ring)"
                    strokeWidth="26"
                    strokeDasharray="320 65 200 70 260 60"
                  />

                  {/* Selective Optical Waveguide Arcs */}
                  <circle
                    cx="3"
                    cy="-3"
                    r="175"
                    fill="none"
                    stroke="url(#hero-optical-arc)"
                    strokeWidth="18"
                    strokeDasharray="220 180 190 210"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="3"
                    cy="-3"
                    r="186"
                    fill="none"
                    stroke="#D4C9FF"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                    strokeDasharray="215 185 185 215"
                  />

                  {/* Counter-rotating Inner Mechanical Chamber on Scroll */}
                  <g transform={`rotate(${innerRingAngle})`}>
                    <circle
                      cx="-9"
                      cy="12"
                      r="144"
                      fill="#080C18"
                      stroke="rgba(157, 167, 199, 0.28)"
                      strokeWidth="1.5"
                    />
                    <circle
                      r="134"
                      fill="none"
                      stroke="url(#hero-gunmetal-ring)"
                      strokeWidth="22"
                      strokeDasharray="195 48 175 52 180 55"
                    />

                    {/* Deep Recessed Central Chamber (dark obsidian stepped tunnel) */}
                    <circle
                      cx="-7"
                      cy="9"
                      r="102"
                      fill="#050811"
                      stroke="rgba(165, 138, 255, 0.35)"
                      strokeWidth="1.5"
                    />
                    <circle
                      r="88"
                      fill="none"
                      stroke="rgba(157, 167, 199, 0.42)"
                      strokeWidth="14"
                      strokeDasharray="5 7"
                    />
                    <circle
                      cx="-5"
                      cy="6"
                      r="70"
                      fill="#04060D"
                      stroke="rgba(165, 138, 255, 0.48)"
                      strokeWidth="1.4"
                    />
                    <circle
                      cx="-3"
                      cy="4"
                      r="44"
                      fill="#03040A"
                      stroke="rgba(83, 103, 249, 0.55)"
                      strokeWidth="1.6"
                    />
                    <circle
                      r="20"
                      fill="#0B1022"
                      stroke="#A58AFF"
                      strokeOpacity="0.8"
                      strokeWidth="1.5"
                    />
                  </g>
                </g>

                {/* ===================================================================== */}
                {/* PORT-CONNECTED OPTICAL INTAKE, PERIMETER MANIFOLD & OUTPUT STREAMS    */}
                {/* ===================================================================== */}
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {/* 1. Upper-Right Primary Multi-Strand Intake -> Intake Port Collar (554, 132) */}
                  <path
                    d="M 744 34 C 675 48, 612 84, 554 132"
                    stroke="rgba(151, 127, 255, 0.22)"
                    strokeWidth="18"
                  />
                  <path
                    d="M 744 30 C 672 44, 608 80, 554 132"
                    stroke="rgba(83, 103, 249, 0.62)"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M 744 38 C 678 52, 616 88, 554 132"
                    stroke="rgba(165, 138, 255, 0.58)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 744 34 C 675 48, 612 84, 554 132"
                    stroke="url(#hero-ingress-grad)"
                    strokeWidth="3.2"
                  />

                  {/* 2. Secondary Auxiliary Intake Stream -> Aux Intake Port Collar (504, 98) */}
                  <path
                    d="M 654 18 C 598 42, 548 68, 504 98"
                    stroke="rgba(151, 127, 255, 0.18)"
                    strokeWidth="14"
                  />
                  <path
                    d="M 654 18 C 598 42, 548 68, 504 98"
                    stroke="url(#hero-ingress-grad)"
                    strokeWidth="2.4"
                  />

                  {/* 3. Internal Curved Perimeter Routing Manifold */}
                  <path
                    d="M 554 132 C 445 72, 305 118, 266 238 C 234 338, 278 418, 346 464"
                    stroke={
                      activeCategory === 'models' || activeCategory === 'data'
                        ? 'rgba(212, 201, 255, 0.78)'
                        : 'rgba(151, 127, 255, 0.28)'
                    }
                    strokeWidth={
                      activeCategory === 'models' || activeCategory === 'data' ? '2.6' : '1.5'
                    }
                    strokeDasharray="8 5"
                  />
                  <path
                    d="M 554 132 C 618 215, 608 355, 522 432 C 464 484, 398 486, 346 464"
                    stroke={
                      activeCategory === 'agents' || activeCategory === 'tools'
                        ? 'rgba(212, 201, 255, 0.78)'
                        : 'rgba(83, 103, 249, 0.32)'
                    }
                    strokeWidth={
                      activeCategory === 'agents' || activeCategory === 'tools' ? '2.6' : '1.5'
                    }
                    strokeDasharray="8 5"
                  />

                  {/* Continuous Measured Route Path for Scene 1 Scroll-Driven Packet Handoff */}
                  <path
                    ref={manifoldPathRef}
                    d="M 554 132 C 618 215, 608 355, 522 432 C 464 484, 398 486, 346 464 C 314 514, 286 558, 258 601.6"
                    stroke="none"
                    fill="none"
                  />

                  {/* 4. Output Port Collar (346, 464) -> Global Handoff Anchor (258, 601.6) */}
                  <path
                    d="M 346 464 C 314 514, 286 558, 258 601.6"
                    stroke="rgba(151, 127, 255, 0.24)"
                    strokeWidth="18"
                  />
                  <path
                    d="M 342 462 C 310 512, 282 556, 258 601.6"
                    stroke="rgba(83, 103, 249, 0.65)"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M 350 466 C 318 516, 290 560, 258 601.6"
                    stroke="rgba(212, 201, 255, 0.55)"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M 346 464 C 314 514, 286 558, 258 601.6"
                    stroke="url(#hero-ingress-grad)"
                    strokeWidth="3.2"
                  />
                </g>

                {/* Scene 1 Scroll-Driven Handoff Packet along the Hero Manifold -> Output Route */}
                <g>
                  <circle
                    cx={heroPacketPt.x}
                    cy={heroPacketPt.y}
                    r="12"
                    fill="rgba(212, 201, 255, 0.36)"
                  />
                  <circle cx={heroPacketPt.x} cy={heroPacketPt.y} r="3.8" fill="#FFFFFF" />
                </g>

                {/* Physical Intake & Output Port Collars (Machined Rings + Diagnostic LEDs) */}
                <g>
                  {/* Primary Intake Port Collar (554, 132) */}
                  <circle
                    cx="554"
                    cy="132"
                    r="11"
                    fill="#11172A"
                    stroke="#A58AFF"
                    strokeWidth="1.8"
                  />
                  <circle cx="554" cy="132" r="6" fill="rgba(165, 138, 255, 0.35)" />
                  <circle cx="554" cy="132" r="3" fill="#F3F4FA" />

                  {/* Auxiliary Intake Port Collar (504, 98) */}
                  <circle
                    cx="504"
                    cy="98"
                    r="8"
                    fill="#11172A"
                    stroke="rgba(165, 138, 255, 0.7)"
                    strokeWidth="1.4"
                  />
                  <circle cx="504" cy="98" r="2.5" fill="#D4C9FF" />

                  {/* Primary Output Port Collar (346, 464) */}
                  <circle
                    cx="346"
                    cy="464"
                    r="12"
                    fill="#11172A"
                    stroke="#D4C9FF"
                    strokeWidth="2"
                  />
                  <circle cx="346" cy="464" r="6.5" fill="rgba(212, 201, 255, 0.38)" />
                  <circle cx="346" cy="464" r="3.2" fill="#F3F4FA" />
                </g>

                {/* Architectural 4x4 Dot Matrix Accents */}
                {[
                  { ox: 675, oy: 165 },
                  { ox: 675, oy: 525 },
                  { ox: 205, oy: 495 },
                ].map((grid, gIdx) => (
                  <g key={gIdx} fill="rgba(157, 167, 199, 0.28)">
                    {[0, 1, 2, 3].map((r) =>
                      [0, 1, 2, 3].map((c) => (
                        <circle
                          key={`${r}-${c}`}
                          cx={grid.ox + c * 9}
                          cy={grid.oy + r * 9}
                          r="1.15"
                        />
                      ))
                    )}
                  </g>
                ))}

                {/* Technical Coordinate & Port Callouts */}
                <g
                  className="font-mono-tech"
                  fill="rgba(157, 167, 199, 0.65)"
                  fontSize="10"
                  letterSpacing="1.4"
                >
                  <text x="572" y="128">INTAKE // P_01</text>
                  <text x="572" y="142" fill="rgba(165, 138, 255, 0.8)">
                    {currentDetail.portCode}
                  </text>
                  <text x="120" y="326">SYS.MOMENTUM</text>
                  <text x="120" y="348" fill="rgba(165, 138, 255, 0.75)">
                    A&amp;S_01
                  </text>
                  <text x="655" y="355">45.92 / 12.01</text>
                  <text x="366" y="472" fill="rgba(212, 201, 255, 0.8)">
                    OUT_PORT // SYNC
                  </text>
                </g>

                {/* Dynamic Leader Lines from HTML Hotspot Pills to Projected 3D Engine Ports */}
                <g strokeWidth="1.2" fill="none" className="hidden sm:block">
                  {/* MODELS leader line */}
                  <polyline
                    points={`198,154 242,154 ${Math.round(localHotspotCoords.models.x)},${Math.round(
                      localHotspotCoords.models.y
                    )}`}
                    stroke={activeCategory === 'models' ? '#D4C9FF' : 'rgba(157,167,199,0.42)'}
                  />
                  <circle
                    cx={localHotspotCoords.models.x}
                    cy={localHotspotCoords.models.y}
                    r={activeCategory === 'models' ? 4.5 : 2.5}
                    fill="#D4C9FF"
                  />

                  {/* AGENTS leader line */}
                  <polyline
                    points={`652,250 610,250 ${Math.round(localHotspotCoords.agents.x)},${Math.round(
                      localHotspotCoords.agents.y
                    )}`}
                    stroke={activeCategory === 'agents' ? '#D4C9FF' : 'rgba(157,167,199,0.42)'}
                  />
                  <circle
                    cx={localHotspotCoords.agents.x}
                    cy={localHotspotCoords.agents.y}
                    r={activeCategory === 'agents' ? 4.5 : 2.5}
                    fill="#D4C9FF"
                  />

                  {/* TOOLS leader line */}
                  <polyline
                    points={`632,482 575,482 ${Math.round(localHotspotCoords.tools.x)},${Math.round(
                      localHotspotCoords.tools.y
                    )}`}
                    stroke={activeCategory === 'tools' ? '#D4C9FF' : 'rgba(157,167,199,0.42)'}
                  />
                  <circle
                    cx={localHotspotCoords.tools.x}
                    cy={localHotspotCoords.tools.y}
                    r={activeCategory === 'tools' ? 4.5 : 2.5}
                    fill="#D4C9FF"
                  />

                  {/* DATA leader line */}
                  <polyline
                    points={`322,568 272,568 ${Math.round(localHotspotCoords.data.x)},${Math.round(
                      localHotspotCoords.data.y
                    )}`}
                    stroke={activeCategory === 'data' ? '#D4C9FF' : 'rgba(157,167,199,0.42)'}
                  />
                  <circle
                    cx={localHotspotCoords.data.x}
                    cy={localHotspotCoords.data.y}
                    r={activeCategory === 'data' ? 4.5 : 2.5}
                    fill="#D4C9FF"
                  />
                </g>
              </svg>

              {/* Real-Time Procedural 2.5D Three.js Intelligence Engine */}
              <HeroCoreCanvas
                selectedHotspot={selectedHotspot}
                hoveredHotspot={hoveredHotspot}
                scrollProgress={scrollProgress}
                reducedMotion={reducedMotion}
                experienceMode={experienceMode}
                syncPulseActive={syncPulseActive}
                routeTriggerCount={routeTriggerCount}
                onProjectedAnchorsChange={handleAnchorsUpdate}
              />

              {/* Desktop Floating HTML Hotspot Buttons around the 3D Engine */}
              <div className="hidden sm:block">
                <button
                  type="button"
                  onClick={() => onSelectHotspot('models')}
                  onMouseEnter={() => handleHover('models')}
                  onMouseLeave={() => handleHover(null)}
                  onFocus={() => handleHover('models')}
                  onBlur={() => handleHover(null)}
                  aria-pressed={selectedHotspot === 'models'}
                  className={`absolute left-[14%] top-[21%] z-30 rounded-full px-4 py-1.5 font-mono-tech text-xs uppercase tracking-[0.16em] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                    activeCategory === 'models'
                      ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF] shadow-[0_0_18px_rgba(165,138,255,0.45)]'
                      : 'bg-[#0C0F1B]/90 text-[#9DA7C7] border border-[#9DA7C7]/35 hover:text-[#F3F4FA] hover:border-[#A58AFF]/70'
                  }`}
                >
                  MODELS
                </button>

                <button
                  type="button"
                  onClick={() => onSelectHotspot('agents')}
                  onMouseEnter={() => handleHover('agents')}
                  onMouseLeave={() => handleHover(null)}
                  onFocus={() => handleHover('agents')}
                  onBlur={() => handleHover(null)}
                  aria-pressed={selectedHotspot === 'agents'}
                  className={`absolute right-[3%] top-[36%] z-30 rounded-full px-4 py-1.5 font-mono-tech text-xs uppercase tracking-[0.16em] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                    activeCategory === 'agents'
                      ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF] shadow-[0_0_18px_rgba(165,138,255,0.45)]'
                      : 'bg-[#0C0F1B]/90 text-[#9DA7C7] border border-[#9DA7C7]/35 hover:text-[#F3F4FA] hover:border-[#A58AFF]/70'
                  }`}
                >
                  AGENTS
                </button>

                <button
                  type="button"
                  onClick={() => onSelectHotspot('tools')}
                  onMouseEnter={() => handleHover('tools')}
                  onMouseLeave={() => handleHover(null)}
                  onFocus={() => handleHover('tools')}
                  onBlur={() => handleHover(null)}
                  aria-pressed={selectedHotspot === 'tools'}
                  className={`absolute right-[5%] bottom-[21%] z-30 rounded-full px-4 py-1.5 font-mono-tech text-xs uppercase tracking-[0.16em] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                    activeCategory === 'tools'
                      ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF] shadow-[0_0_18px_rgba(165,138,255,0.45)]'
                      : 'bg-[#0C0F1B]/90 text-[#9DA7C7] border border-[#9DA7C7]/35 hover:text-[#F3F4FA] hover:border-[#A58AFF]/70'
                  }`}
                >
                  TOOLS
                </button>

                <button
                  type="button"
                  onClick={() => onSelectHotspot('data')}
                  onMouseEnter={() => handleHover('data')}
                  onMouseLeave={() => handleHover(null)}
                  onFocus={() => handleHover('data')}
                  onBlur={() => handleHover(null)}
                  aria-pressed={selectedHotspot === 'data'}
                  className={`absolute left-[42%] bottom-[8%] z-30 rounded-full px-4 py-1.5 font-mono-tech text-xs uppercase tracking-[0.16em] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                    activeCategory === 'data'
                      ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF] shadow-[0_0_18px_rgba(165,138,255,0.45)]'
                      : 'bg-[#0C0F1B]/90 text-[#9DA7C7] border border-[#9DA7C7]/35 hover:text-[#F3F4FA] hover:border-[#A58AFF]/70'
                  }`}
                >
                  DATA
                </button>
              </div>

              {/* Live Telemetry HUD Cards matching Reference 01 lower-left of Engine */}
              <div className="hidden sm:flex flex-col gap-3 absolute left-[2%] bottom-[16%] z-30 w-[268px]">
                {/* Tile 1: Routing Status */}
                <div className="rounded-xl bg-[#11172A]/92 border border-[#9DA7C7]/24 p-3.5 shadow-[0_12px_30px_rgba(5,7,14,0.8)]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[#9DA7C7] uppercase">
                      ROUTING STATUS:
                    </span>
                    <span className="font-mono-tech text-[10px] tracking-[0.12em] text-[#A58AFF] uppercase">
                      {currentDetail.label}
                    </span>
                  </div>
                  <p className="font-mono-tech text-xs font-semibold text-[#F3F4FA] tracking-wider mb-2.5">
                    {displayedRoutingMode}
                  </p>
                  <p className="text-[11px] leading-snug text-[#9DA7C7] mb-3">
                    {currentDetail.summary}
                  </p>
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#6EE7B7]" />
                      <span className="h-2 w-2 rounded-full bg-[#A58AFF]" />
                      <span className="h-2 w-2 rounded-full bg-[#5367F9]/60" />
                      <span className="h-2 w-2 rounded-full bg-[#9DA7C7]/30" />
                    </div>
                    <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
                      {currentDetail.bars.map((h, i) => (
                        <span
                          key={i}
                          className="w-[2.5px] rounded-t bg-[#9DA7C7]/65 transition-all duration-300"
                          style={{ height: `${Math.round((h / 100) * 16)}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tile 2: Workflow Execution Status */}
                <div className="rounded-xl bg-[#11172A]/92 border border-[#9DA7C7]/24 p-3.5 shadow-[0_12px_30px_rgba(5,7,14,0.8)]">
                  <p className="font-mono-tech text-[10px] tracking-[0.14em] text-[#9DA7C7] uppercase mb-0.5">
                    WORKFLOW EXECUTION:
                  </p>
                  <p className="font-mono-tech text-xs font-semibold text-[#F3F4FA] tracking-wider mb-2.5">
                    {workflowStatus === 'idle'
                      ? '6 STAGES CONNECTED'
                      : `STAGE 0${activeStageIndex + 1} · ${workflowStatus.toUpperCase()}`}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2, 3, 4, 5].map((idx) => {
                        const isLit =
                          bootPhase === 'ready'
                            ? idx <= activeStageIndex
                            : idx < bootDotCount;
                        return (
                          <React.Fragment key={idx}>
                            <span
                              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                                isLit ? 'bg-[#A58AFF]' : 'bg-[#9DA7C7]/30'
                              }`}
                            />
                            {idx < 5 && <span className="w-2 h-[1px] bg-[#9DA7C7]/30" />}
                          </React.Fragment>
                        );
                      })}
                    </div>
                    <svg className="w-16 h-4" viewBox="0 0 64 16" fill="none" aria-hidden="true">
                      <path
                        d="M2 14 C14 14, 18 4, 28 8 C38 12, 44 2, 54 6 L62 14 Z"
                        fill="rgba(165, 138, 255, 0.28)"
                      />
                      <path
                        d="M2 14 C14 14, 18 4, 28 8 C38 12, 44 2, 54 6 L62 12"
                        stroke="#A58AFF"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stable DOM Handoff Anchor (`hero.coreOutput`) for the Master Multi-Strand Route */}
              <div
                data-signal-anchor="hero-exit"
                className="pointer-events-none absolute left-[33.95%] bottom-[6%] h-2 w-2"
                aria-hidden="true"
              />
            </div>

            {/* Mobile Compact Hotspot Selector Chips beneath the Engine */}
            <div className="sm:hidden w-full mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-4 gap-2" role="group" aria-label="Select Core Layer">
                {(['models', 'agents', 'tools', 'data'] as CoreHotspotId[]).map((id) => {
                  const active = selectedHotspot === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onSelectHotspot(id)}
                      aria-pressed={active}
                      className={`py-2 px-2 rounded-lg font-mono-tech text-[11px] uppercase tracking-wider border text-center ${
                        active
                          ? 'bg-[#171D32] text-[#F3F4FA] border-[#A58AFF]'
                          : 'bg-[#11172A] text-[#9DA7C7] border-[#9DA7C7]/25'
                      }`}
                    >
                      {id}
                    </button>
                  );
                })}
              </div>
              <div className="rounded-xl bg-[#11172A] border border-[#9DA7C7]/20 p-3.5">
                <div className="flex items-center justify-between text-xs font-mono-tech mb-1">
                  <span className="text-[#9DA7C7]">ROUTING: {currentDetail.label}</span>
                  <span className="text-[#A58AFF]">{displayedRoutingMode}</span>
                </div>
                <p className="text-xs text-[#9DA7C7]">{currentDetail.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
