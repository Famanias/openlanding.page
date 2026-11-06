'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, ShieldCheck, Activity, GitBranch, Cpu } from 'lucide-react';
import {
  CapabilityId,
  RouteModelId,
  RoutingPreference,
  ExperienceMode,
} from '../utils/signalLogic';

export interface CapabilitiesSectionProps {
  selectedCapability: CapabilityId;
  onSelectCapability: (id: CapabilityId) => void;
  selectedRouteModel: RouteModelId;
  onSelectRouteModel: (model: RouteModelId) => void;
  onSyncRoutingPreference?: (pref: RoutingPreference) => void;
  onHoverCapabilityChange?: (id: CapabilityId | null) => void;
  experienceMode?: ExperienceMode;
  capabilitiesScrollProgress?: number;
  reducedMotion?: boolean;
}

const OBSERVE_EVENTS = [
  {
    id: '01',
    time: '00:00.04',
    label: 'Execution event',
    detail: 'Ingress request req_01H9X validated; context window hydrated (4 chunks, 118ms).',
    latency: '42 ms',
  },
  {
    id: '02',
    time: '00:00.18',
    label: 'Connected log',
    detail: 'Reasoning agent selected Model B (Balanced); tool policy pre-check passed.',
    latency: '146 ms',
  },
  {
    id: '03',
    time: '00:00.49',
    label: 'Tool invocation',
    detail: 'Sandboxed CRM staging draft created; awaiting governance checkpoint sign-off.',
    latency: '290 ms',
  },
  {
    id: '04',
    time: '00:00.62',
    label: 'Trace committed',
    detail: 'Deterministic execution snapshot archived with immutable audit hash.',
    latency: '64 ms',
  },
];

const CAPABILITY_ORDER: CapabilityId[] = ['orchestrate', 'route', 'observe', 'govern'];

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  selectedCapability,
  onSelectCapability,
  selectedRouteModel,
  onSelectRouteModel,
  onSyncRoutingPreference,
  onHoverCapabilityChange,
  capabilitiesScrollProgress = 0.35,
  reducedMotion = false,
}) => {
  const [hoveredCapability, setHoveredCapability] = useState<CapabilityId | null>(null);
  const [selectedObserveEvent, setSelectedObserveEvent] = useState<string>('01');
  const [userPickedObserveEvent, setUserPickedObserveEvent] = useState<boolean>(false);
  const [governApproved, setGovernApproved] = useState<boolean>(true);
  const [orchestrateFanoutMode, setOrchestrateFanoutMode] = useState<'parallel' | 'sequential'>('parallel');
  const [routePulseKey, setRoutePulseKey] = useState<number>(0);
  const [cardTilt, setCardTilt] = useState<{ cap: CapabilityId | null; rx: number; ry: number }>({
    cap: null,
    rx: 0,
    ry: 0,
  });

  const activeCap = hoveredCapability || selectedCapability;

  // When scrolling through Scene 2 (0.50 - 0.75 is Observe), advance the timeline preview unless user manually clicked an event
  useEffect(() => {
    if (userPickedObserveEvent || activeCap !== 'observe') return;
    const localProgress = Math.min(1, Math.max(0, (capabilitiesScrollProgress - 0.5) / 0.25));
    const idx = Math.min(3, Math.floor(localProgress * 4));
    setSelectedObserveEvent(OBSERVE_EVENTS[idx].id);
  }, [capabilitiesScrollProgress, activeCap, userPickedObserveEvent]);

  const activeObserveItem =
    OBSERVE_EVENTS.find((ev) => ev.id === selectedObserveEvent) || OBSERVE_EVENTS[0];

  // Trigger a visible route-handoff packet pulse whenever the active capability or route model changes
  useEffect(() => {
    setRoutePulseKey((prev) => prev + 1);
  }, [activeCap, selectedRouteModel]);

  const handleHoverCap = (cap: CapabilityId | null) => {
    setHoveredCapability(cap);
    if (!cap) {
      setCardTilt({ cap: null, rx: 0, ry: 0 });
    }
    if (onHoverCapabilityChange) {
      onHoverCapabilityChange(cap);
    }
  };

  const handleCardPointerMove = (e: React.MouseEvent<HTMLDivElement>, cap: CapabilityId) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({
      cap,
      rx: -ny * 3.2,
      ry: nx * 3.2,
    });
  };

  const handleExploreCapabilitiesClick = () => {
    const nextIdx = (CAPABILITY_ORDER.indexOf(selectedCapability) + 1) % CAPABILITY_ORDER.length;
    const nextCap = CAPABILITY_ORDER[nextIdx];
    onSelectCapability(nextCap);
    const cellEl = document.getElementById(`cap-cell-${nextCap}`);
    if (cellEl) {
      cellEl.focus({ preventScroll: true });
    }
  };

  const handleModelClick = (model: RouteModelId) => {
    onSelectCapability('route');
    onSelectRouteModel(model);
    if (onSyncRoutingPreference) {
      if (model === 'model-1') onSyncRoutingPreference('latency');
      if (model === 'model-2') onSyncRoutingPreference('balance');
      if (model === 'model-3') onSyncRoutingPreference('reasoning');
    }
  };

  // Internal 2x2 Quadrant Branch Path from Central Entry Hub (495, 195) to Active Module
  const getQuadrantBranchPath = (cap: CapabilityId) => {
    switch (cap) {
      case 'orchestrate':
        return 'M 495 195 C 430 195, 365 135, 250 135';
      case 'route':
        return 'M 495 195 C 575 195, 645 140, 745 140';
      case 'observe':
        return 'M 495 195 C 430 245, 365 415, 250 415';
      case 'govern':
        return 'M 495 195 C 575 245, 645 415, 745 415';
    }
  };

  // Shared Active Outline translation coordinates on the 2x2 grid (Scene 2 requirement)
  const sharedOutlinePosition =
    activeCap === 'orchestrate'
      ? { xPercent: 0, yPercent: 0 }
      : activeCap === 'route'
      ? { xPercent: 100, yPercent: 0 }
      : activeCap === 'observe'
      ? { xPercent: 0, yPercent: 100 }
      : { xPercent: 100, yPercent: 100 };

  const activeStepIndex = CAPABILITY_ORDER.indexOf(activeCap);

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative w-full py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT EDITORIAL COLUMN (38% width -> 5 cols) */}
          <div className="relative z-20 flex flex-col items-start lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-mono-tech text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-[#9DA7C7] mb-5">
              01 / THE CONTROL PLANE
            </p>

            <h2
              id="capabilities-heading"
              className="font-display font-bold uppercase tracking-[-0.025em] text-[#F3F4FA] leading-[0.98] text-[clamp(2.35rem,4.6vw,4.35rem)] mb-6"
            >
              <span className="line-mask">
                <span className="line-mask-inner">ONE SYSTEM.</span>
              </span>
              <span className="line-mask">
                <span className="line-mask-inner text-signal-gradient">EVERY</span>
              </span>
              <span className="line-mask">
                <span className="line-mask-inner">POSSIBILITY.</span>
              </span>
            </h2>

            <p className="text-base sm:text-lg leading-[1.6] text-[#9DA7C7] max-w-[42ch] mb-8">
              From the first request to the final result, coordinate every decision across your AI
              stack.
            </p>

            <button
              type="button"
              onClick={handleExploreCapabilitiesClick}
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-outline whitespace-nowrap shrink-0 cursor-pointer mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
            >
              <span>EXPLORE CAPABILITIES</span>
              <ArrowUpRight className="h-4 w-4 text-[#A58AFF] btn-arrow-icon" aria-hidden="true" />
            </button>

            {/* Thin 4-Step Control Plane Progress Rule & Module Index (Scene 2) */}
            <div className="w-full max-w-md mb-4">
              <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.16em] text-[#9DA7C7] mb-2">
                <span>SIGNAL SEQUENCE // 0{activeStepIndex + 1} OF 04</span>
                <span className="text-[#D4C9FF] uppercase">{activeCap}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Control Plane Sequence">
                {CAPABILITY_ORDER.map((cid, idx) => {
                  const isCurrent = activeCap === cid;
                  const isPassed = idx <= activeStepIndex;
                  return (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => onSelectCapability(cid)}
                      className="group flex flex-col gap-1.5 text-left cursor-pointer focus:outline-none"
                    >
                      <span className="h-1 w-full rounded-full bg-[#171D32] overflow-hidden">
                        <span
                          className={`block h-full rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'w-full bg-gradient-to-r from-[#A58AFF] to-[#F3F4FA] shadow-[0_0_8px_#A58AFF]'
                              : isPassed
                              ? 'w-full bg-[#5367F9]/75'
                              : 'w-0 bg-transparent'
                          }`}
                        />
                      </span>
                      <span
                        className={`font-mono-tech text-[10px] uppercase tracking-wider transition-colors ${
                          isCurrent ? 'text-[#F3F4FA] font-semibold' : 'text-[#9299B4] group-hover:text-[#9DA7C7]'
                        }`}
                      >
                        0{idx + 1} {cid}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Selected Capability Inspector Readout */}
            <div
              className="w-full max-w-md rounded-xl bg-[#11172A]/90 border border-[#9DA7C7]/22 p-5 shadow-[0_14px_34px_rgba(5,7,14,0.65)]"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#9DA7C7]/15">
                <span className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#A58AFF]">
                  ACTIVE MODULE // {activeCap.toUpperCase()}
                </span>
                <span className="font-mono-tech text-[11px] text-[#9DA7C7]">
                  INTERACTIVE TOPOLOGY
                </span>
              </div>
              {activeCap === 'orchestrate' && (
                <p className="text-xs sm:text-sm text-[#9DA7C7] leading-relaxed">
                  Mode: <strong className="text-[#F3F4FA] uppercase">{orchestrateFanoutMode}</strong>{' '}
                  multi-agent fan-out. Decomposes complex requests across specialized planner and
                  retriever workers before deterministic synthesis.
                </p>
              )}
              {activeCap === 'route' && (
                <p className="text-xs sm:text-sm text-[#9DA7C7] leading-relaxed">
                  Active Endpoint:{' '}
                  <strong className="text-[#F3F4FA] uppercase">
                    {selectedRouteModel === 'model-1'
                      ? 'MODEL 1 (Fast Stream)'
                      : selectedRouteModel === 'model-2'
                      ? 'MODEL 2 (Balanced Optimal)'
                      : 'MODEL 3 (Deep Reasoning)'}
                  </strong>
                  . Dynamically selects the optimal intelligence per task policy.
                </p>
              )}
              {activeCap === 'observe' && (
                <p className="text-xs sm:text-sm text-[#9DA7C7] leading-relaxed">
                  Selected Sample Event <strong className="text-[#F3F4FA]">#{activeObserveItem.id}</strong> (
                  {activeObserveItem.latency}): {activeObserveItem.detail}
                </p>
              )}
              {activeCap === 'govern' && (
                <p className="text-xs sm:text-sm text-[#9DA7C7] leading-relaxed">
                  Human Review Checkpoint:{' '}
                  <strong className="text-[#F3F4FA]">
                    {governApproved ? 'APPROVED & VERIFIED' : 'PAUSED FOR OPERATOR SIGN-OFF'}
                  </strong>
                  . Enforces granular permission matrices on every tool action.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT 2x2 CONNECTED CAPABILITY TOPOLOGY (62% width -> 7 cols) */}
          <div className="relative z-10 lg:col-span-7">
            {/* Entry & Exit Signal Anchors for the Document-Level Continuous SVG Route */}
            <div
              data-signal-anchor="capabilities-entry"
              className="pointer-events-none absolute left-[48%] top-[28%] h-2 w-2"
              aria-hidden="true"
            />
            <div
              data-signal-anchor="capabilities-route-node"
              className="pointer-events-none absolute right-[12%] top-[26%] h-2 w-2"
              aria-hidden="true"
            />
            <div
              data-signal-anchor="capabilities-exit"
              className="pointer-events-none absolute left-[18%] bottom-[4%] h-2 w-2"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-[#9DA7C7]/22 bg-[#0C0F1B]/85 overflow-hidden shadow-[0_24px_64px_rgba(4,6,14,0.85)]">
              {/* Shared Traveling Active Module Outline on Desktop 2x2 Grid (Scene 2) */}
              <div
                aria-hidden="true"
                data-testid="capabilities-shared-outline"
                className="pointer-events-none hidden md:block absolute left-0 top-0 z-30 w-1/2 h-1/2 rounded-xl border-2 border-[#A58AFF] shadow-[inset_0_0_38px_rgba(165,138,255,0.22),0_0_24px_rgba(165,138,255,0.28)]"
                style={{
                  transform: `translate3d(${sharedOutlinePosition.xPercent}%, ${sharedOutlinePosition.yPercent}%, 0)`,
                  transition: reducedMotion
                    ? 'none'
                    : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />

              {/* Internal 2x2 Optical Branching Manifold Overlay */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 560"
                className="pointer-events-none absolute inset-0 z-20 hidden md:block w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="cap-branch-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F3F4FA" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#A58AFF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#5367F9" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                {/* Standby guide filaments + active branch to all 4 capability quadrants */}
                {CAPABILITY_ORDER.map((cid) => {
                  const isFocused = activeCap === cid;
                  const branchD = getQuadrantBranchPath(cid);
                  const destPt =
                    cid === 'orchestrate'
                      ? { x: 250, y: 135 }
                      : cid === 'route'
                      ? { x: 745, y: 140 }
                      : cid === 'observe'
                      ? { x: 250, y: 415 }
                      : { x: 745, y: 415 };

                  return (
                    <g key={cid} fill="none" strokeLinecap="round">
                      <path
                        d={branchD}
                        stroke={
                          isFocused ? 'rgba(165, 138, 255, 0.25)' : 'rgba(157, 167, 199, 0.08)'
                        }
                        strokeWidth={isFocused ? '11' : '3'}
                      />
                      <path
                        d={branchD}
                        stroke={
                          isFocused ? 'url(#cap-branch-grad)' : 'rgba(157, 167, 199, 0.18)'
                        }
                        strokeWidth={isFocused ? '2.4' : '1'}
                        strokeDasharray={isFocused ? undefined : '4 6'}
                      />
                      {isFocused && (
                        <>
                          <circle
                            cx={destPt.x}
                            cy={destPt.y}
                            r="9"
                            fill="rgba(212, 201, 255, 0.35)"
                          />
                          <circle cx={destPt.x} cy={destPt.y} r="3.5" fill="#FFFFFF" />
                        </>
                      )}
                    </g>
                  );
                })}
                {/* Central Topology Router Hub Collar at (495, 195) */}
                <circle
                  cx="495"
                  cy="195"
                  r="11"
                  fill="#0B0F1D"
                  stroke="rgba(165, 138, 255, 0.65)"
                  strokeWidth="1.5"
                />
                <circle cx="495" cy="195" r="4.5" fill="#F3F4FA" />
              </svg>

              {/* ========================================================= */}
              {/* QUADRANT 01: ORCHESTRATE                                  */}
              {/* ========================================================= */}
              <div
                id="cap-cell-orchestrate"
                tabIndex={0}
                role="button"
                aria-label="01 Orchestrate capability"
                aria-pressed={selectedCapability === 'orchestrate'}
                onClick={() => onSelectCapability('orchestrate')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCapability('orchestrate');
                  }
                }}
                onMouseEnter={() => handleHoverCap('orchestrate')}
                onMouseMove={(e) => handleCardPointerMove(e, 'orchestrate')}
                onMouseLeave={() => handleHoverCap(null)}
                style={{
                  transform:
                    cardTilt.cap === 'orchestrate'
                      ? `perspective(900px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`
                      : undefined,
                }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 border-b border-[#9DA7C7]/18 md:border-r transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A58AFF] ${
                  activeCap === 'orchestrate'
                    ? 'bg-[#171D32]/82 opacity-100'
                    : 'bg-[#11172A]/45 opacity-80 hover:opacity-100 hover:bg-[#171D32]/45'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span
                    className={`font-display text-sm sm:text-base tracking-[0.08em] uppercase ${
                      activeCap === 'orchestrate'
                        ? 'font-semibold text-[#F3F4FA]'
                        : 'font-medium text-[#9DA7C7]'
                    }`}
                  >
                    01 / ORCHESTRATE
                  </span>
                  <div className="text-right font-mono-tech text-[10px] leading-tight text-[#9299B4]">
                    <div>SYS.MOMENTUM</div>
                    <div className="text-[#A58AFF]">A&amp;S_02</div>
                  </div>
                </div>

                {/* Interactive Multi-Agent Fan-Out Diagram matching Reference 02 Q1 */}
                <div className="relative my-3 h-[175px] w-full flex items-center justify-center">
                  <svg viewBox="0 0 360 165" className="w-full h-full overflow-visible">
                    <g
                      fill="none"
                      strokeLinecap="round"
                      stroke={
                        activeCap === 'orchestrate'
                          ? '#A58AFF'
                          : 'rgba(157, 167, 199, 0.35)'
                      }
                      strokeWidth={activeCap === 'orchestrate' ? '1.85' : '1.2'}
                    >
                      {activeCap === 'orchestrate' && (
                        <g stroke="rgba(165, 138, 255, 0.24)" strokeWidth="7">
                          <path d="M 78 82 C 105 82, 110 42, 136 42" />
                          <path d="M 78 82 C 105 82, 110 124, 136 124" />
                          <path d="M 254 24 C 282 24, 286 82, 312 82" />
                          <path d="M 254 64 C 280 64, 286 82, 312 82" />
                        </g>
                      )}
                      <path d="M 78 82 C 105 82, 110 42, 136 42" />
                      <path d="M 78 82 C 105 82, 110 124, 136 124" />
                      <path d="M 168 42 C 192 42, 196 24, 222 24" />
                      <path d="M 168 42 C 192 42, 196 64, 222 64" />
                      <path d="M 168 124 C 194 124, 196 64, 222 64" strokeDasharray="3 3" />
                      <path d="M 168 124 C 192 124, 196 104, 222 104" />
                      <path d="M 168 124 C 192 124, 196 144, 222 144" />
                      <path d="M 254 24 C 282 24, 286 82, 312 82" />
                      <path d="M 254 64 C 280 64, 286 82, 312 82" />
                      <path d="M 254 104 C 280 104, 286 82, 312 82" />
                      <path d="M 254 144 C 282 144, 286 82, 312 82" />
                    </g>

                    {/* INPUT Pill */}
                    <g
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCapability('orchestrate');
                        setOrchestrateFanoutMode((m) =>
                          m === 'parallel' ? 'sequential' : 'parallel'
                        );
                      }}
                      className="cursor-pointer"
                    >
                      <rect
                        x="10"
                        y="66"
                        width="68"
                        height="32"
                        rx="16"
                        fill="#171D32"
                        stroke={activeCap === 'orchestrate' ? '#A58AFF' : 'rgba(157,167,199,0.4)'}
                        strokeWidth="1.2"
                      />
                      <text
                        x="44"
                        y="86"
                        textAnchor="middle"
                        fill="#F3F4FA"
                        fontSize="10"
                        className="font-mono-tech"
                        letterSpacing="1.2"
                      >
                        INPUT
                      </text>
                    </g>

                    {/* 2 Intermediate Coordinator Nodes */}
                    {[42, 124].map((cy, idx) => (
                      <g key={idx}>
                        <rect
                          x="136"
                          y={cy - 14}
                          width="32"
                          height="28"
                          rx="6"
                          fill="#171D32"
                          stroke={activeCap === 'orchestrate' ? '#A58AFF' : 'rgba(157,167,199,0.35)'}
                        />
                        <circle
                          cx="152"
                          cy={cy - 4}
                          r={activeCap === 'orchestrate' ? '3.2' : '2.5'}
                          fill={activeCap === 'orchestrate' ? '#FFFFFF' : '#D4C9FF'}
                        />
                        <line x1="145" y1={cy + 5} x2="159" y2={cy + 5} stroke="#9DA7C7" strokeWidth="1.5" />
                      </g>
                    ))}

                    {/* 4 Specialized Agent Nodes */}
                    {[24, 64, 104, 144].map((cy, idx) => (
                      <g key={idx}>
                        <rect
                          x="222"
                          y={cy - 13}
                          width="32"
                          height="26"
                          rx="6"
                          fill="#171D32"
                          stroke={activeCap === 'orchestrate' ? '#D4C9FF' : 'rgba(157,167,199,0.35)'}
                        />
                        <line x1="229" y1={cy - 3} x2="246" y2={cy - 3} stroke="#A58AFF" strokeWidth="1.4" />
                        <line x1="229" y1={cy + 4} x2="241" y2={cy + 4} stroke="#9DA7C7" strokeWidth="1.2" />
                      </g>
                    ))}

                    {/* Final Recombined Node + Active Synthesis Packet */}
                    <rect
                      x="312"
                      y="67"
                      width="32"
                      height="30"
                      rx="7"
                      fill="#171D32"
                      stroke={activeCap === 'orchestrate' ? '#D4C9FF' : 'rgba(157,167,199,0.4)'}
                      strokeWidth="1.4"
                    />
                    <circle
                      cx="328"
                      cy="82"
                      r={activeCap === 'orchestrate' ? '6' : '5'}
                      stroke="#A58AFF"
                      strokeWidth="1.5"
                      fill={activeCap === 'orchestrate' ? 'rgba(212,201,255,0.45)' : 'none'}
                    />
                    {activeCap === 'orchestrate' && (
                      <circle cx="328" cy="82" r="2.8" fill="#FFFFFF" />
                    )}
                  </svg>
                </div>

                {/* Bottom Caption */}
                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-wide text-[#F3F4FA] uppercase">
                      01 / ORCHESTRATE
                    </h3>
                    <p className="text-sm text-[#9DA7C7] mt-1">
                      Build coordinated multi-agent workflows.
                    </p>
                  </div>
                  <GitBranch className="h-4 w-4 text-[#A58AFF] shrink-0 mb-1" aria-hidden="true" />
                </div>
              </div>

              {/* ========================================================= */}
              {/* QUADRANT 02: ROUTE                                        */}
              {/* ========================================================= */}
              <div
                id="cap-cell-route"
                tabIndex={0}
                role="button"
                aria-label="02 Route capability"
                aria-pressed={selectedCapability === 'route'}
                onClick={() => onSelectCapability('route')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCapability('route');
                  }
                }}
                onMouseEnter={() => handleHoverCap('route')}
                onMouseMove={(e) => handleCardPointerMove(e, 'route')}
                onMouseLeave={() => handleHoverCap(null)}
                style={{
                  transform:
                    cardTilt.cap === 'route'
                      ? `perspective(900px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`
                      : undefined,
                }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 border-b border-[#9DA7C7]/18 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A58AFF] ${
                  activeCap === 'route'
                    ? 'bg-[#171D32]/85 opacity-100'
                    : 'bg-[#11172A]/45 opacity-80 hover:opacity-100 hover:bg-[#171D32]/45'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span
                    className={`font-display text-sm sm:text-base tracking-[0.08em] uppercase ${
                      activeCap === 'route'
                        ? 'font-semibold text-[#F3F4FA]'
                        : 'font-medium text-[#9DA7C7]'
                    }`}
                  >
                    02 / ROUTE
                  </span>
                  <div className="text-right font-mono-tech text-[10px] leading-tight text-[#9299B4]">
                    <div>SYS.MOMENTUM</div>
                    <div className="text-[#A58AFF]">A&amp;S_02</div>
                  </div>
                </div>

                {/* Interactive 3-Model Routing Selector + Multi-Strand Luminous Signal Split */}
                <div className="relative my-3 h-[175px] w-full flex flex-col justify-between">
                  <svg
                    viewBox="0 0 360 170"
                    className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
                    aria-hidden="true"
                  >
                    <g fill="none" strokeLinecap="round">
                      {selectedRouteModel === 'model-1' && (
                        <>
                          <path
                            d="M 15 95 C 50 76, 70 76, 95 76 C 135 76, 150 28, 195 28"
                            stroke="rgba(165,138,255,0.28)"
                            strokeWidth="12"
                          />
                          <path
                            d="M 15 92 C 50 73, 70 73, 95 73 C 135 73, 150 25, 195 25"
                            stroke="rgba(83,103,249,0.75)"
                            strokeWidth="1.2"
                          />
                        </>
                      )}
                      {selectedRouteModel === 'model-2' && (
                        <>
                          <path
                            d="M 15 95 C 50 76, 70 76, 95 76 L 195 76"
                            stroke="rgba(165,138,255,0.28)"
                            strokeWidth="12"
                          />
                          <path
                            d="M 15 92 C 50 73, 70 73, 95 73 L 195 73"
                            stroke="rgba(83,103,249,0.75)"
                            strokeWidth="1.2"
                          />
                        </>
                      )}
                      {selectedRouteModel === 'model-3' && (
                        <>
                          <path
                            d="M 15 95 C 50 76, 70 76, 95 76 C 135 76, 150 126, 195 126"
                            stroke="rgba(165,138,255,0.28)"
                            strokeWidth="12"
                          />
                          <path
                            d="M 15 98 C 50 79, 70 79, 95 79 C 135 79, 150 129, 195 129"
                            stroke="rgba(83,103,249,0.75)"
                            strokeWidth="1.2"
                          />
                        </>
                      )}

                      <path
                        d="M 15 95 C 50 76, 70 76, 95 76 C 135 76, 150 28, 195 28"
                        stroke={
                          selectedRouteModel === 'model-1' ? '#F3F4FA' : 'rgba(165,138,255,0.32)'
                        }
                        strokeWidth={selectedRouteModel === 'model-1' ? '2.8' : '1.4'}
                      />
                      <path
                        d="M 15 95 C 50 76, 70 76, 95 76 L 195 76"
                        stroke={
                          selectedRouteModel === 'model-2' ? '#F3F4FA' : 'rgba(165,138,255,0.32)'
                        }
                        strokeWidth={selectedRouteModel === 'model-2' ? '3.0' : '1.4'}
                      />
                      <path
                        d="M 15 95 C 50 76, 70 76, 95 76 C 135 76, 150 126, 195 126"
                        stroke={
                          selectedRouteModel === 'model-3' ? '#F3F4FA' : 'rgba(165,138,255,0.32)'
                        }
                        strokeWidth={selectedRouteModel === 'model-3' ? '2.8' : '1.4'}
                      />

                      <path
                        d="M 305 28 L 338 28 L 338 126 L 305 126"
                        stroke="rgba(157,167,199,0.38)"
                        strokeWidth="1.3"
                      />
                    </g>

                    {/* Active Route Packet Head at Selected Model Port */}
                    <circle
                      key={`pkt-${routePulseKey}`}
                      cx="192"
                      cy={
                        selectedRouteModel === 'model-1'
                          ? 28
                          : selectedRouteModel === 'model-2'
                          ? 76
                          : 126
                      }
                      r="5.5"
                      fill="#FFFFFF"
                    />
                    <circle
                      cx="192"
                      cy={
                        selectedRouteModel === 'model-1'
                          ? 28
                          : selectedRouteModel === 'model-2'
                          ? 76
                          : 126
                      }
                      r="11"
                      fill="rgba(212,201,255,0.42)"
                    />

                    <circle cx="95" cy="76" r="5" fill="#D4C9FF" />
                    <circle cx="95" cy="76" r="10" fill="rgba(165,138,255,0.3)" />
                    <circle cx="338" cy="76" r="6" fill="#F3F4FA" />
                    <circle cx="338" cy="76" r="13" fill="rgba(165,138,255,0.38)" />
                  </svg>

                  {/* Clickable Model Endpoint Buttons (MODEL 1, MODEL 2, MODEL 3) */}
                  <div className="relative z-10 ml-auto mr-7 flex flex-col gap-3 w-[132px] pt-1">
                    {(
                      [
                        { id: 'model-1', label: 'MODEL 1' },
                        { id: 'model-2', label: 'MODEL 2' },
                        { id: 'model-3', label: 'MODEL 3' },
                      ] as { id: RouteModelId; label: string }[]
                    ).map((m) => {
                      const isSel = selectedRouteModel === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModelClick(m.id);
                          }}
                          aria-pressed={isSel}
                          className={`flex items-center justify-center gap-2 rounded-full py-1.5 px-3 font-mono-tech text-[11px] tracking-wider uppercase transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                            isSel
                              ? 'bg-gradient-to-r from-[#9B82FF] to-[#5367F9] text-[#F3F4FA] border border-[#D4C9FF] shadow-[0_0_20px_rgba(151,127,255,0.6)]'
                              : 'bg-[#11172A]/90 text-[#9DA7C7] border border-[#9DA7C7]/35 hover:text-[#F3F4FA] hover:border-[#A58AFF]'
                          }`}
                        >
                          <Cpu className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Route Status Mini-Tile matching Reference 02 Q2 */}
                  <div className="relative z-10 w-[182px] rounded-lg bg-[#11172A]/95 border border-[#9DA7C7]/25 px-3 py-2 shadow-md -mt-6">
                    <div className="font-mono-tech text-[9px] uppercase tracking-wider text-[#9DA7C7]">
                      ROUTE STATUS:
                    </div>
                    <div className="font-mono-tech text-[10px] font-semibold text-[#F3F4FA] tracking-wider">
                      ACTIVE / A&amp;S_OPT ({selectedRouteModel.toUpperCase()})
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-wide text-[#F3F4FA] uppercase">
                      02 / ROUTE
                    </h3>
                    <p className="text-sm text-[#9DA7C7] mt-1">
                      Send every task to the right intelligence.
                    </p>
                  </div>
                  <Activity className="h-4 w-4 text-[#A58AFF] shrink-0 mb-1" aria-hidden="true" />
                </div>
              </div>

              {/* ========================================================= */}
              {/* QUADRANT 03: OBSERVE                                      */}
              {/* ========================================================= */}
              <div
                id="cap-cell-observe"
                tabIndex={0}
                role="button"
                aria-label="03 Observe capability"
                aria-pressed={selectedCapability === 'observe'}
                onClick={() => onSelectCapability('observe')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCapability('observe');
                  }
                }}
                onMouseEnter={() => handleHoverCap('observe')}
                onMouseMove={(e) => handleCardPointerMove(e, 'observe')}
                onMouseLeave={() => handleHoverCap(null)}
                style={{
                  transform:
                    cardTilt.cap === 'observe'
                      ? `perspective(900px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`
                      : undefined,
                }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#9DA7C7]/18 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A58AFF] ${
                  activeCap === 'observe'
                    ? 'bg-[#171D32]/82 opacity-100'
                    : 'bg-[#11172A]/45 opacity-80 hover:opacity-100 hover:bg-[#171D32]/45'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span
                    className={`font-display text-sm sm:text-base tracking-[0.08em] uppercase ${
                      activeCap === 'observe'
                        ? 'font-semibold text-[#F3F4FA]'
                        : 'font-medium text-[#9DA7C7]'
                    }`}
                  >
                    03 / OBSERVE
                  </span>
                  <div className="text-right font-mono-tech text-[10px] leading-tight text-[#9299B4]">
                    <div>SYS.MOMENTUM</div>
                    <div className="text-[#A58AFF]">A&amp;S_02</div>
                  </div>
                </div>

                {/* Interactive Timeline & Sample Events Diagram matching Reference 02 Q3 */}
                <div className="my-3 flex flex-col justify-between h-[175px]">
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[#9DA7C7] uppercase">
                      TIMELINE
                    </span>
                    <div className="flex items-center gap-3 flex-1 max-w-[230px] relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#A58AFF]/45" />
                      {OBSERVE_EVENTS.map((ev) => {
                        const isEvSelected = selectedObserveEvent === ev.id;
                        return (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCapability('observe');
                              setUserPickedObserveEvent(true);
                              setSelectedObserveEvent(ev.id);
                            }}
                            aria-label={`Inspect sample event ${ev.id}: ${ev.label}`}
                            aria-pressed={isEvSelected}
                            className={`relative z-10 flex flex-col items-center gap-1 cursor-pointer focus:outline-none ${
                              isEvSelected ? 'scale-110' : 'opacity-75 hover:opacity-100'
                            }`}
                          >
                            <span className="font-mono-tech text-[10px] text-[#9DA7C7]">
                              {ev.id}
                            </span>
                            <span
                              className={`h-3 w-3 rounded-full border transition-all ${
                                isEvSelected
                                  ? 'bg-[#D4C9FF] border-[#F3F4FA] shadow-[0_0_10px_#A58AFF]'
                                  : 'bg-[#171D32] border-[#A58AFF]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stepped Event Callout Tree */}
                  <div className="pl-6 py-2 flex flex-col gap-1.5 font-mono-tech text-[11px]">
                    <div className="flex items-center gap-2 text-[#F3F4FA]">
                      <span className="inline-block w-4 h-[1px] bg-[#A58AFF]" />
                      <span className="text-[#A58AFF]">»</span>
                      <span>{activeObserveItem.label}</span>
                      <span className="text-[#9DA7C7] text-[10px]">({activeObserveItem.latency})</span>
                    </div>
                    <p className="text-[11px] text-[#9DA7C7] font-sans pl-6 line-clamp-2">
                      {activeObserveItem.detail}
                    </p>
                  </div>

                  {/* Bottom Sample Metric Sparkboxes */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#9299B4]">
                      SAMPLE EVENTS
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="rounded bg-[#11172A] border border-[#9DA7C7]/25 px-2.5 py-1.5 w-[104px]">
                        <div className="font-mono-tech text-[9px] text-[#9DA7C7] mb-1">
                          LATENCY
                        </div>
                        <svg viewBox="0 0 80 16" className="w-full h-3.5" aria-hidden="true">
                          <path
                            d="M0 14 Q 15 6, 30 10 T 60 5 L 80 9 L 80 16 L 0 16 Z"
                            fill="rgba(165,138,255,0.28)"
                          />
                          <path
                            d="M0 14 Q 15 6, 30 10 T 60 5 L 80 9"
                            fill="none"
                            stroke={activeCap === 'observe' ? '#F3F4FA' : '#A58AFF'}
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="rounded bg-[#11172A] border border-[#9DA7C7]/25 px-2.5 py-1.5 w-[92px]">
                        <div className="font-mono-tech text-[9px] text-[#9DA7C7] mb-1">
                          TRACE DENSITY
                        </div>
                        <div className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
                          {[35, 60, 45, 90, 75, 50, 85, 65, 95, 55].map((v, i) => (
                            <span
                              key={i}
                              className="w-[3px] bg-[#A58AFF]/75 rounded-t"
                              style={{ height: `${Math.round((v / 100) * 14)}px` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="font-display text-lg font-semibold tracking-wide text-[#F3F4FA] uppercase">
                    03 / OBSERVE
                  </h3>
                  <p className="text-sm text-[#9DA7C7] mt-1">
                    Understand every decision and outcome.
                  </p>
                </div>
              </div>

              {/* ========================================================= */}
              {/* QUADRANT 04: GOVERN (#architecture anchor target as well) */}
              {/* ========================================================= */}
              <div
                id="architecture"
                tabIndex={0}
                role="button"
                aria-label="04 Govern capability"
                aria-pressed={selectedCapability === 'govern'}
                onClick={() => onSelectCapability('govern')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCapability('govern');
                  }
                }}
                onMouseEnter={() => handleHoverCap('govern')}
                onMouseMove={(e) => handleCardPointerMove(e, 'govern')}
                onMouseLeave={() => handleHoverCap(null)}
                style={{
                  transform:
                    cardTilt.cap === 'govern'
                      ? `perspective(900px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`
                      : undefined,
                }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#A58AFF] ${
                  activeCap === 'govern'
                    ? 'bg-[#171D32]/82 opacity-100'
                    : 'bg-[#11172A]/45 opacity-80 hover:opacity-100 hover:bg-[#171D32]/45'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <span
                    className={`font-display text-sm sm:text-base tracking-[0.08em] uppercase ${
                      activeCap === 'govern'
                        ? 'font-semibold text-[#F3F4FA]'
                        : 'font-medium text-[#9DA7C7]'
                    }`}
                  >
                    04 / GOVERN
                  </span>
                  <div className="text-right font-mono-tech text-[10px] leading-tight text-[#9299B4]">
                    <div>SYS.MOMENTUM</div>
                    <div className="text-[#A58AFF]">A&amp;S_03</div>
                  </div>
                </div>

                {/* Permission Matrix + Human Review Gate matching Reference 02 Q4 */}
                <div className="my-3 flex items-center justify-between gap-3 h-[175px]">
                  <div className="flex-1 rounded-xl bg-[#11172A]/95 border border-[#9DA7C7]/25 p-3">
                    <div className="grid grid-cols-4 items-center gap-1 pb-2 mb-2 border-b border-[#9DA7C7]/15 font-mono-tech text-[10px] text-[#9DA7C7]">
                      <span className="col-span-2">POLICY SCOPE</span>
                      <span className="text-center">READ</span>
                      <span className="text-center">EXEC</span>
                    </div>
                    {[
                      { label: 'Model Invocation', r: true, x: true },
                      { label: 'Tool Execution', r: true, x: governApproved },
                      { label: 'Automated Checkpoints', r: true, x: governApproved },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-4 items-center gap-1 py-1.5 text-[11px] text-[#F3F4FA] border-b last:border-b-0 border-[#9DA7C7]/10"
                      >
                        <span className="col-span-2 truncate text-[#9DA7C7]">{row.label}</span>
                        <span className="flex justify-center">
                          <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-[#A58AFF]/20 text-[#D4C9FF]">
                            <Check className="h-3 w-3" />
                          </span>
                        </span>
                        <span className="flex justify-center">
                          <span
                            className={`inline-flex h-4 w-4 items-center justify-center rounded ${
                              row.x
                                ? 'bg-[#A58AFF]/25 text-[#D4C9FF]'
                                : 'bg-[#9DA7C7]/10 text-[#9299B4]'
                            }`}
                          >
                            {row.x ? <Check className="h-3 w-3" /> : '–'}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Human Review Gate Toggle */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCapability('govern');
                        setGovernApproved((prev) => !prev);
                      }}
                      aria-pressed={governApproved}
                      className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                        governApproved
                          ? 'bg-[#171D32] border-[#A58AFF] text-[#D4C9FF] shadow-[0_0_18px_rgba(165,138,255,0.55)]'
                          : 'bg-[#11172A] border-[#9DA7C7]/40 text-[#9DA7C7]'
                      }`}
                      title="Toggle sample human review gate state"
                    >
                      <ShieldCheck className="h-5 w-5" />
                    </button>
                    <span className="font-mono-tech text-[10px] text-center leading-tight text-[#9DA7C7]">
                      human
                      <br />
                      review gate
                    </span>
                    <span
                      className={`font-mono-tech text-[9px] uppercase tracking-wider ${
                        governApproved ? 'text-[#A58AFF]' : 'text-[#9299B4]'
                      }`}
                    >
                      {governApproved ? 'APPROVED' : 'HOLD'}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="font-display text-lg font-semibold tracking-wide text-[#F3F4FA] uppercase">
                    04 / GOVERN
                  </h3>
                  <p className="text-sm text-[#9DA7C7] mt-1">
                    Stay in control of critical actions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
