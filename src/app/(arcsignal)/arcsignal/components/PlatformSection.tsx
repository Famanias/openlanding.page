'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  FileText,
  Database,
  Brain,
  Wrench,
  UserCheck,
  CheckCircle2,
  XCircle,
  LayoutGrid,
  GitMerge,
  Users,
  Cpu,
  Activity,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import {
  WORKFLOW_STAGES,
  WorkflowStageSpec,
  PipelineSimulationState,
  PipelineAction,
  getStageBadge,
  RoutingPreference,
  getModelForPreference,
  RouteModelId,
  ExperienceMode,
} from '../utils/signalLogic';

export type PlatformTabId = 'builder' | 'trace' | 'routing';
export type SidebarItemId =
  | 'workspace'
  | 'workflows'
  | 'agents'
  | 'models'
  | 'observability'
  | 'settings';

export interface PlatformSectionProps {
  simState: PipelineSimulationState;
  onDispatchSim: (action: PipelineAction) => void;
  selectedStageIndex: number;
  onSelectStageIndex: (idx: number, isManualUserClick?: boolean) => void;
  routingPreference: RoutingPreference;
  onSelectRoutingPreference: (pref: RoutingPreference) => void;
  onSyncRouteModel?: (model: RouteModelId) => void;
  experienceMode?: ExperienceMode;
  platformScrollProgress?: number;
  reducedMotion?: boolean;
}

export const PlatformSection: React.FC<PlatformSectionProps> = ({
  simState,
  onDispatchSim,
  selectedStageIndex,
  onSelectStageIndex,
  routingPreference,
  onSelectRoutingPreference,
  onSyncRouteModel,
  platformScrollProgress = 0.4,
  reducedMotion = false,
}) => {
  const [activeTab, setActiveTab] = useState<PlatformTabId>('builder');
  const [activeSidebar, setActiveSidebar] = useState<SidebarItemId>('workflows');
  const [openAccordion, setOpenAccordion] = useState<
    Record<'inputs' | 'tools' | 'policies' | 'trace', boolean>
  >({
    inputs: false,
    tools: false,
    policies: false,
    trace: true,
  });

  // In running/awaiting_approval mode, inspector follows the active simulation stage; in idle/paused, follows selectedStageIndex (which also responds to scroll preview unless manually locked)
  const displayedStageIdx =
    simState.status === 'running' || simState.status === 'awaiting_approval'
      ? simState.activeStageIndex
      : selectedStageIndex;

  // Coherent badge state so completed/active/pending badges match displayedStageIdx during idle scroll-preview or manual inspection
  const effectiveSimForBadges: PipelineSimulationState =
    simState.status === 'idle'
      ? { status: 'idle', activeStageIndex: displayedStageIdx }
      : simState;

  const currentStage: WorkflowStageSpec =
    WORKFLOW_STAGES[displayedStageIdx] || WORKFLOW_STAGES[2];
  const currentBadge = getStageBadge(displayedStageIdx, effectiveSimForBadges);
  const currentRoutingInfo = getModelForPreference(routingPreference);

  // Stage-synchronized packet position along the 6-stage pipeline bus
  const stageProgressPercent = Math.min(
    100,
    Math.max(0, (displayedStageIdx / (WORKFLOW_STAGES.length - 1)) * 100)
  );
  const stageBusPacketX = 56 + (displayedStageIdx / (WORKFLOW_STAGES.length - 1)) * 568;

  // Scene 3 subtle interface assembly progress as section enters viewport
  const entryEase = reducedMotion
    ? 1
    : Math.min(1, Math.max(0, (platformScrollProgress + 0.15) * 1.6));

  const toggleAccordion = (key: 'inputs' | 'tools' | 'policies' | 'trace') => {
    setOpenAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, current: PlatformTabId) => {
    const order: PlatformTabId[] = ['builder', 'trace', 'routing'];
    const idx = order.indexOf(current);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = order[(idx + 1) % order.length];
      setActiveTab(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = order[(idx - 1 + order.length) % order.length];
      setActiveTab(prev);
    }
  };

  const handleSidebarClick = (item: SidebarItemId) => {
    setActiveSidebar(item);
    if (item === 'workflows' || item === 'workspace' || item === 'agents') {
      setActiveTab('builder');
    } else if (item === 'observability') {
      setActiveTab('trace');
    } else if (item === 'models') {
      setActiveTab('routing');
    }
  };

  const handlePreferenceChange = (pref: RoutingPreference) => {
    onSelectRoutingPreference(pref);
    if (onSyncRouteModel) {
      const info = getModelForPreference(pref);
      onSyncRouteModel(info.modelId);
    }
  };

  const renderStageIcon = (id: WorkflowStageSpec['id'], isHighlighted: boolean) => {
    const cls = `h-5 w-5 ${isHighlighted ? 'text-[#F3F4FA]' : 'text-[#9DA7C7]'}`;
    switch (id) {
      case 'trigger':
        return <FileText className={cls} aria-hidden="true" />;
      case 'context':
        return <Database className={cls} aria-hidden="true" />;
      case 'plan':
        return <Brain className={cls} aria-hidden="true" />;
      case 'execute':
        return <Wrench className={cls} aria-hidden="true" />;
      case 'review':
        return <UserCheck className={cls} aria-hidden="true" />;
      case 'result':
        return <CheckCircle2 className={cls} aria-hidden="true" />;
    }
  };

  return (
    <section
      id="platform"
      aria-labelledby="platform-heading"
      className="relative w-full py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT EDITORIAL COLUMN (35% width -> 4 cols) */}
          <div className="relative z-20 flex flex-col items-start lg:col-span-4">
            <p className="font-mono-tech text-xs sm:text-[13px] font-medium uppercase tracking-[0.22em] text-[#9DA7C7] mb-5">
              02 / INSIDE THE PLATFORM
            </p>

            <h2
              id="platform-heading"
              className="font-display font-bold uppercase tracking-[-0.025em] text-[#F3F4FA] leading-[0.98] text-[clamp(2.25rem,4.2vw,4.1rem)] mb-7"
            >
              <span className="line-mask">
                <span className="line-mask-inner">FROM INPUT</span>
              </span>
              <span className="line-mask">
                <span className="line-mask-inner">TO INTELLIGENCE.</span>
              </span>
            </h2>

            {/* Accessible Tablist matching Reference 03 */}
            <div
              role="tablist"
              aria-label="Platform Views"
              className="inline-flex items-center rounded-full border border-[#9DA7C7]/25 bg-[#11172A]/90 p-1 mb-7 gap-0.5 max-w-full overflow-x-auto"
            >
              {(
                [
                  { id: 'builder', label: 'WORKFLOW BUILDER' },
                  { id: 'trace', label: 'EXECUTION TRACE' },
                  { id: 'routing', label: 'MODEL ROUTING' },
                ] as { id: PlatformTabId; label: string }[]
              ).map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`platform-tab-${tab.id}`}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    aria-controls={`platform-panel-${tab.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                    className={`rounded-full px-3 py-1.5 font-mono-tech text-[10px] font-medium uppercase tracking-[0.08em] transition-all whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                      isSelected
                        ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF] shadow-[0_0_20px_rgba(165,138,255,0.45)]'
                        : 'text-[#9DA7C7] hover:text-[#F3F4FA] border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <p className="text-base sm:text-lg leading-[1.6] text-[#9DA7C7] max-w-[38ch] mb-8">
              Design workflows, coordinate specialized agents, and see every decision as it happens.
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveTab('builder');
                onDispatchSim({ type: 'RUN' });
              }}
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-outline whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
            >
              <span>RUN INTERACTIVE PIPELINE</span>
              <ArrowUpRight className="h-4 w-4 text-[#A58AFF] btn-arrow-icon" aria-hidden="true" />
            </button>
          </div>

          {/* RIGHT WORKSPACE SIMULATION WINDOW (65% width -> 8 cols) */}
          <div className="relative z-10 lg:col-span-8">
            {/* Signal Anchors for Master Continuous SVG Path */}
            <div
              data-signal-anchor="platform-entry"
              className="pointer-events-none absolute right-[26%] top-[2%] h-2 w-2"
              aria-hidden="true"
            />
            <div
              data-signal-anchor="platform-plan-node"
              className="pointer-events-none absolute left-[46%] top-[48%] h-2 w-2"
              aria-hidden="true"
            />
            <div
              data-signal-anchor="platform-exit"
              className="pointer-events-none absolute left-[8%] bottom-[16%] h-2 w-2"
              aria-hidden="true"
            />

            <div className="rounded-2xl border border-[#A58AFF]/35 bg-[#0C0F1B]/95 shadow-[0_28px_80px_rgba(4,6,15,0.92),0_0_40px_rgba(151,127,255,0.12)] overflow-hidden">
              {/* Main 3-Column Application Body */}
              <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[460px]">
                {/* 1. LEFT WORKSPACE NAVIGATION RAIL (2 cols) */}
                <aside
                  aria-label="Workspace Navigation"
                  style={{
                    transform: reducedMotion
                      ? undefined
                      : `translate3d(${(1 - entryEase) * -10}px, 0, 0)`,
                    transition: 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="xl:col-span-2 border-b xl:border-b-0 xl:border-r border-[#9DA7C7]/16 bg-[#11172A]/75 p-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Brand Header inside App Window */}
                    <div className="flex items-center gap-2 px-2 py-1.5 mb-4">
                      <img
                        src="/templates/arcsignal/arc-signal-mark.svg"
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        className="h-4 w-4"
                      />
                      <span className="font-mono-tech text-[11px] font-semibold tracking-[0.14em] text-[#F3F4FA]">
                        ARC &amp; SIGNAL
                      </span>
                    </div>

                    {/* Sidebar Buttons */}
                    <div className="flex xl:flex-col gap-1 overflow-x-auto pb-1 xl:pb-0">
                      {(
                        [
                          { id: 'workspace', label: 'Workspace', icon: LayoutGrid },
                          { id: 'workflows', label: 'Workflows', icon: GitMerge },
                          { id: 'agents', label: 'Agents', icon: Users },
                          { id: 'models', label: 'Models', icon: Cpu },
                          { id: 'observability', label: 'Observability', icon: Activity },
                          { id: 'settings', label: 'Settings', icon: Settings },
                        ] as { id: SidebarItemId; label: string; icon: React.FC<{ className?: string }> }[]
                      ).map((nav) => {
                        const Icon = nav.icon;
                        const isCurrent = activeSidebar === nav.id;
                        return (
                          <button
                            key={nav.id}
                            type="button"
                            onClick={() => handleSidebarClick(nav.id)}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] ${
                              isCurrent
                                ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF]/35'
                                : 'text-[#9DA7C7] hover:text-[#F3F4FA] hover:bg-[#171D32]/50 border border-transparent'
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5 text-[#A58AFF]" />
                            <span>{nav.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="hidden xl:block pt-4 border-t border-[#9DA7C7]/12 font-mono-tech text-[10px] text-[#9299B4]">
                    <div>ENV: SANDBOX_DEMO</div>
                    <div className="text-[#A58AFF] mt-0.5">ILLUSTRATIVE DATA</div>
                  </div>
                </aside>

                {/* 2. CENTRAL CANVAS / TAB PANEL AREA (7 cols) */}
                <div className="xl:col-span-7 flex flex-col justify-between bg-dot-matrix relative border-b xl:border-b-0 xl:border-r border-[#9DA7C7]/16">
                  {/* Top Pipeline Header + Simulation Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#9DA7C7]/14 bg-[#0C0F1B]/80">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-base sm:text-lg font-semibold text-[#F3F4FA]">
                          Customer Resolution Pipeline
                        </h3>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#A58AFF]">
                          · Interactive Demo
                        </span>
                      </div>
                      {activeSidebar === 'settings' && (
                        <p className="font-mono-tech text-[11px] text-[#9DA7C7] mt-0.5">
                          Policy Mode: Strict deterministic schema + human review gate (#GOV-04) enabled.
                        </p>
                      )}
                      {activeSidebar === 'agents' && (
                        <p className="font-mono-tech text-[11px] text-[#9DA7C7] mt-0.5">
                          Active Crew: Ingress Gateway · Knowledge Retriever · Reasoning Agent · Tool Worker
                        </p>
                      )}
                    </div>

                    {/* Run / Pause / Reset Simulation Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDispatchSim({ type: 'RUN' })}
                        disabled={
                          simState.status === 'running' ||
                          simState.status === 'awaiting_approval'
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#A58AFF]/20 hover:bg-[#A58AFF]/35 active:scale-95 disabled:opacity-45 border border-[#A58AFF]/50 px-3 py-1.5 font-mono-tech text-[11px] font-medium text-[#F3F4FA] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF]"
                      >
                        <Play className="h-3 w-3 text-[#D4C9FF]" aria-hidden="true" />
                        <span>Run Demo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDispatchSim({ type: 'PAUSE' })}
                        disabled={simState.status !== 'running'}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#171D32] hover:bg-[#171D32]/80 active:scale-95 disabled:opacity-45 border border-[#9DA7C7]/25 px-2.5 py-1.5 font-mono-tech text-[11px] text-[#9DA7C7] hover:text-[#F3F4FA] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
                      >
                        <Pause className="h-3 w-3" aria-hidden="true" />
                        <span>Pause</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDispatchSim({ type: 'RESET' });
                          onSelectStageIndex(2, true);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#171D32] hover:bg-[#171D32]/80 active:scale-95 border border-[#9DA7C7]/25 px-2.5 py-1.5 font-mono-tech text-[11px] text-[#9DA7C7] hover:text-[#F3F4FA] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
                      >
                        <RotateCcw className="h-3 w-3" aria-hidden="true" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* TAB PANEL 1: WORKFLOW BUILDER */}
                  {activeTab === 'builder' && (
                    <div
                      id="platform-panel-builder"
                      role="tabpanel"
                      aria-labelledby="platform-tab-builder"
                      className="relative flex-1 flex flex-col justify-center p-5 sm:p-6 overflow-visible"
                    >
                      {/* Background multi-strand luminous curve + horizontal stage bus passing behind 03 / PLAN */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 680 280"
                        className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
                      >
                        <defs>
                          <linearGradient id="wf-signal" x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5367F9" stopOpacity="0.65" />
                            <stop offset="50%" stopColor="#F3F4FA" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="#A58AFF" stopOpacity="0.78" />
                          </linearGradient>
                          <linearGradient id="wf-stage-bus" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5367F9" stopOpacity="0.85" />
                            <stop offset="60%" stopColor="#A58AFF" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="#F3F4FA" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                          {/* Multi-strand diagonal signal stream */}
                          <path
                            d="M 18 215 C 180 215, 290 215, 345 140 C 395 70, 420 28, 454 14"
                            stroke="rgba(151,127,255,0.22)"
                            strokeWidth="18"
                          />
                          <path
                            d="M 14 209 C 176 209, 286 209, 341 134 C 391 64, 416 22, 450 10"
                            stroke="rgba(83,103,249,0.62)"
                            strokeWidth="1.35"
                          />
                          <path
                            d="M 18 215 C 180 215, 290 215, 345 140 C 395 70, 420 28, 454 14"
                            stroke="url(#wf-signal)"
                            strokeWidth="2.8"
                          />
                          <path
                            d="M 22 223 C 184 223, 294 221, 351 146 C 401 76, 426 34, 460 18"
                            stroke="rgba(212,201,255,0.52)"
                            strokeWidth="1.25"
                          />

                          {/* Horizontal 6-stage execution bus connecting Stage 01 to Stage 06 */}
                          <line
                            x1="56"
                            y1="140"
                            x2="624"
                            y2="140"
                            stroke="rgba(157, 167, 199, 0.20)"
                            strokeWidth="2"
                            strokeDasharray="4 6"
                          />
                          <line
                            x1="56"
                            y1="140"
                            x2={stageBusPacketX}
                            y2="140"
                            stroke="url(#wf-stage-bus)"
                            strokeWidth="3.2"
                            style={{ transition: 'x2 320ms cubic-bezier(0.22, 1, 0.36, 1)' }}
                          />
                        </g>

                        {/* Stage-Synchronized Optical Packet on Pipeline Bus */}
                        <g
                          style={{
                            transform: `translate(${stageBusPacketX}px, 140px)`,
                            transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                          }}
                        >
                          <circle
                            cx="0"
                            cy="0"
                            r={simState.status === 'awaiting_approval' ? 16 : 11}
                            fill={
                              simState.status === 'awaiting_approval'
                                ? 'rgba(212, 201, 255, 0.42)'
                                : 'rgba(165, 138, 255, 0.34)'
                            }
                          />
                          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
                        </g>
                      </svg>

                      {/* 6-Stage Horizontal Pipeline Nodes */}
                      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                        {WORKFLOW_STAGES.map((stage, idx) => {
                          const isSelected = displayedStageIdx === idx;
                          const badge = getStageBadge(idx, effectiveSimForBadges);
                          const isCompleted = badge === 'Completed';
                          const isAwaiting = badge === 'Awaiting approval';
                          const isRejected = badge === 'Rejected';

                          return (
                            <button
                              key={stage.id}
                              type="button"
                              onClick={() => onSelectStageIndex(idx, true)}
                              aria-pressed={isSelected}
                              className={`group relative flex flex-col items-center text-center rounded-xl p-3 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C9FF] ${
                                isSelected
                                  ? 'bg-[#171D32]/95 border-2 border-[#A58AFF] shadow-[0_0_28px_rgba(165,138,255,0.45)] -translate-y-0.5 scale-[1.02]'
                                  : isAwaiting
                                  ? 'bg-[#171D32]/90 border border-[#D4C9FF] shadow-[0_0_18px_rgba(212,201,255,0.35)]'
                                  : isRejected
                                  ? 'bg-[#2A1424]/90 border border-rose-400/60'
                                  : 'bg-[#11172A]/90 border border-[#9DA7C7]/24 hover:border-[#A58AFF]/60'
                              }`}
                            >
                              <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#9DA7C7] mb-2">
                                {stage.shortCode}
                              </span>

                              <div
                                className={`h-10 w-10 rounded-lg flex items-center justify-center mb-2 border transition-colors ${
                                  isSelected
                                    ? 'bg-[#A58AFF]/25 border-[#D4C9FF]/60'
                                    : isCompleted
                                    ? 'bg-[#5367F9]/20 border-[#A58AFF]/40'
                                    : 'bg-[#0C0F1B]/70 border-[#9DA7C7]/20'
                                }`}
                              >
                                {renderStageIcon(stage.id, isSelected)}
                              </div>

                              <span className="text-[11px] font-medium text-[#F3F4FA] leading-tight mb-1">
                                {stage.subtitle}
                              </span>

                              <span
                                className={`font-mono-tech text-[9px] uppercase tracking-wider mt-auto pt-1 ${
                                  isAwaiting
                                    ? 'text-[#D4C9FF]'
                                    : isRejected
                                    ? 'text-rose-300'
                                    : isSelected
                                    ? 'text-[#A58AFF]'
                                    : 'text-[#9299B4]'
                                }`}
                              >
                                {badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Human Review Gate Banner when simulation pauses at 05 / REVIEW */}
                      {simState.status === 'awaiting_approval' && (
                        <div
                          role="region"
                          aria-label="Human Review Checkpoint Gate"
                          className="relative z-20 mt-5 rounded-xl bg-[#171D32] border border-[#A58AFF] p-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(165,138,255,0.3)]"
                        >
                          <div>
                            <div className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#D4C9FF]">
                              CHECKPOINT 05 / REVIEW — HUMAN APPROVAL REQUIRED
                            </div>
                            <p className="text-xs text-[#9DA7C7] mt-0.5">
                              Staged CRM update + $750 SLA credit requires explicit operator sign-off
                              before final execution.
                            </p>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                onDispatchSim({ type: 'APPROVE' });
                                onSelectStageIndex(5, true);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#A58AFF] hover:bg-[#977FFF] text-[#0C0F1B] font-mono-tech text-xs font-semibold px-4 py-2 cursor-pointer"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onDispatchSim({ type: 'REJECT' });
                                onSelectStageIndex(4, true);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#11172A] hover:bg-rose-950/60 text-rose-200 border border-rose-400/40 font-mono-tech text-xs font-semibold px-4 py-2 cursor-pointer"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {simState.status === 'rejected' && (
                        <div className="relative z-20 mt-4 rounded-xl bg-[#1D1222] border border-rose-400/45 px-4 py-3 flex items-center justify-between gap-3">
                          <span className="font-mono-tech text-xs text-rose-200">
                            STATUS: STOPPED / REJECTED AT STAGE 05 (REVIEW). No external CRM mutation committed.
                          </span>
                          <button
                            type="button"
                            onClick={() => onDispatchSim({ type: 'RESET' })}
                            className="font-mono-tech text-xs underline text-[#D4C9FF] cursor-pointer"
                          >
                            Reset Pipeline
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB PANEL 2: EXECUTION TRACE */}
                  {activeTab === 'trace' && (
                    <div
                      id="platform-panel-trace"
                      role="tabpanel"
                      aria-labelledby="platform-tab-trace"
                      className="flex-1 p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-xs uppercase tracking-wider text-[#A58AFF]">
                          DEMO TRACE // ILLUSTRATIVE EXECUTION LOG
                        </span>
                        <span className="font-mono-tech text-[11px] text-[#9DA7C7]">
                          TOTAL SAMPLE LATENCY: 1,185 ms
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-[#9DA7C7]/20 bg-[#11172A]/90">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-[#9DA7C7]/15 font-mono-tech text-[10px] uppercase text-[#9DA7C7]">
                              <th className="py-2.5 px-3">Stage</th>
                              <th className="py-2.5 px-3">Role / Endpoint</th>
                              <th className="py-2.5 px-3">Duration</th>
                              <th className="py-2.5 px-3">State</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#9DA7C7]/10 text-xs">
                            {WORKFLOW_STAGES.map((st, idx) => {
                              const badge = getStageBadge(idx, effectiveSimForBadges);
                              const isCurrent = displayedStageIdx === idx;
                              return (
                                <tr
                                  key={st.id}
                                  onClick={() => onSelectStageIndex(idx, true)}
                                  className={`cursor-pointer transition-colors ${
                                    isCurrent
                                      ? 'bg-[#171D32] text-[#F3F4FA]'
                                      : 'text-[#9DA7C7] hover:bg-[#171D32]/50'
                                  }`}
                                >
                                  <td className="py-2.5 px-3 font-mono-tech font-medium text-[#F3F4FA]">
                                    {st.shortCode}
                                  </td>
                                  <td className="py-2.5 px-3">{st.agentOrRole}</td>
                                  <td className="py-2.5 px-3 font-mono-tech">
                                    {st.durationMs > 0 ? `${st.durationMs} ms` : 'Human Gate'}
                                  </td>
                                  <td className="py-2.5 px-3 font-mono-tech text-[11px] text-[#A58AFF]">
                                    {badge}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-[11px]">
                        <div className="rounded-lg bg-[#11172A] border border-[#9DA7C7]/20 p-3">
                          <div className="text-[#9DA7C7] text-[10px] mb-1">
                            SAMPLE INPUT ({currentStage.shortCode})
                          </div>
                          <code className="text-[#D4C9FF] break-all">{currentStage.sampleInputPayload}</code>
                        </div>
                        <div className="rounded-lg bg-[#11172A] border border-[#9DA7C7]/20 p-3">
                          <div className="text-[#9DA7C7] text-[10px] mb-1">
                            SAMPLE OUTPUT ({currentStage.shortCode})
                          </div>
                          <code className="text-[#F3F4FA] break-all">{currentStage.sampleOutputPayload}</code>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB PANEL 3: MODEL ROUTING */}
                  {activeTab === 'routing' && (
                    <div
                      id="platform-panel-routing"
                      role="tabpanel"
                      aria-labelledby="platform-tab-routing"
                      className="flex-1 p-5 flex flex-col justify-between gap-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-tech text-xs uppercase tracking-wider text-[#A58AFF]">
                          SIMULATED ROUTING POLICY PREFERENCE
                        </span>
                        <div
                          role="group"
                          aria-label="Routing Preference"
                          className="inline-flex rounded-lg border border-[#9DA7C7]/25 bg-[#11172A] p-1 gap-1"
                        >
                          {(
                            [
                              { id: 'latency', label: 'Latency' },
                              { id: 'balance', label: 'Balance' },
                              { id: 'reasoning', label: 'Reasoning quality' },
                            ] as { id: RoutingPreference; label: string }[]
                          ).map((p) => {
                            const active = routingPreference === p.id;
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => handlePreferenceChange(p.id)}
                                aria-pressed={active}
                                className={`rounded px-3 py-1 font-mono-tech text-[11px] transition-colors cursor-pointer ${
                                  active
                                    ? 'bg-[#A58AFF] text-[#0C0F1B] font-semibold'
                                    : 'text-[#9DA7C7] hover:text-[#F3F4FA]'
                                }`}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3 Simulated Model Endpoints */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(
                          [
                            {
                              pref: 'latency' as RoutingPreference,
                              name: 'Model A — Fast',
                              desc: 'High-throughput synthesis & classification.',
                              sampleLatency: '64 ms avg',
                            },
                            {
                              pref: 'balance' as RoutingPreference,
                              name: 'Model B — Balanced',
                              desc: 'Multi-step tool calling & structured orchestration.',
                              sampleLatency: '240 ms avg',
                            },
                            {
                              pref: 'reasoning' as RoutingPreference,
                              name: 'Model C — Reasoning',
                              desc: 'Deep verification & complex policy diagnostics.',
                              sampleLatency: '820 ms avg',
                            },
                          ]
                        ).map((ep) => {
                          const isSelected = routingPreference === ep.pref;
                          return (
                            <button
                              key={ep.name}
                              type="button"
                              onClick={() => handlePreferenceChange(ep.pref)}
                              aria-pressed={isSelected}
                              className={`text-left rounded-xl p-4 border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#171D32] border-[#A58AFF] shadow-[0_0_24px_rgba(165,138,255,0.3)]'
                                  : 'bg-[#11172A]/85 border-[#9DA7C7]/20 hover:border-[#A58AFF]/50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="font-display font-semibold text-sm text-[#F3F4FA]">
                                  {ep.name}
                                </span>
                                {isSelected && (
                                  <span className="font-mono-tech text-[9px] uppercase text-[#D4C9FF]">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#9DA7C7] mb-3">{ep.desc}</p>
                              <div className="font-mono-tech text-[10px] text-[#A58AFF]">
                                {ep.sampleLatency} (illustrative)
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="rounded-xl bg-[#11172A]/90 border border-[#9DA7C7]/20 p-3.5">
                        <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#D4C9FF] mb-1">
                          ACTIVE ROUTE RATIONALE · {currentRoutingInfo.endpointName} (
                          {currentRoutingInfo.badge})
                        </div>
                        <p className="text-xs text-[#9DA7C7]">{currentRoutingInfo.rationale}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. RIGHT NODE INSPECTOR PANE (3 cols) matching Reference 03 */}
                <aside
                  aria-label="Stage Node Inspector"
                  className="xl:col-span-3 bg-[#11172A]/85 p-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Metadata Header */}
                    <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#9299B4] mb-3">
                      <span>NODE INSPECTOR</span>
                      <span className="text-[#A58AFF]">SYS.MOMENTUM / A&amp;S_02</span>
                    </div>

                    {/* Selected Stage Summary Card matching Reference 03 ("Reasoning Agent") */}
                    <div className="rounded-xl bg-[#171D32] border border-[#9DA7C7]/25 p-3.5 mb-3">
                      <div className="font-display text-sm font-semibold text-[#F3F4FA] mb-1.5">
                        {currentStage.agentOrRole}
                      </div>
                      <div className="font-mono-tech text-[10px] tracking-wider text-[#9DA7C7] flex items-center gap-2 mb-1">
                        <span>STATUS /</span>
                        <span className="text-[#F3F4FA] font-semibold uppercase">
                          {currentBadge}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-[#A58AFF] shadow-[0_0_8px_#A58AFF]" />
                      </div>
                      <div className="font-mono-tech text-[10px] tracking-wider text-[#9DA7C7]">
                        MODEL / <span className="text-[#F3F4FA]">{currentStage.modelConfig}</span>
                      </div>
                    </div>

                    {/* Expandable Accordion Sections: Inputs, Tools, Policies */}
                    <div className="flex flex-col gap-2 mb-3">
                      {(
                        [
                          { key: 'inputs', label: 'Inputs', items: currentStage.inputs },
                          { key: 'tools', label: 'Tools', items: currentStage.tools },
                          { key: 'policies', label: 'Policies', items: currentStage.policies },
                        ] as const
                      ).map((sec) => {
                        const isOpen = openAccordion[sec.key];
                        return (
                          <div
                            key={sec.key}
                            className="rounded-lg bg-[#171D32]/75 border border-[#9DA7C7]/20 overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => toggleAccordion(sec.key)}
                              aria-expanded={isOpen}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#F3F4FA] hover:bg-[#171D32] cursor-pointer focus:outline-none"
                            >
                              <span>{sec.label}</span>
                              <ChevronDown
                                className={`h-3.5 w-3.5 text-[#9DA7C7] transition-transform ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <ul className="px-3 pb-2.5 pt-1 text-[11px] text-[#9DA7C7] space-y-1 border-t border-[#9DA7C7]/12">
                                {sec.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-[#A58AFF]">·</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Execution Trace Box inside Inspector matching Reference 03 */}
                    <div className="rounded-xl bg-[#171D32]/85 border border-[#9DA7C7]/22 p-3">
                      <div className="text-xs font-medium text-[#F3F4FA] mb-2">Execution trace</div>
                      <div className="space-y-1.5 font-mono-tech text-[10px]">
                        {currentStage.traceLogs.map((log, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-[#9299B4] shrink-0">{log.time}</span>
                            <span className="text-[#F3F4FA]">{log.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>

              {/* BOTTOM EXECUTION TRACE PROGRESS STRIP (01 - 06) matching Reference 03 */}
              <div className="border-t border-[#9DA7C7]/18 bg-[#0C0F1B]/95 px-6 py-4 overflow-visible">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#F3F4FA]">
                    EXECUTION TRACE
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#9DA7C7]">
                    STAGE 0{displayedStageIdx + 1} OF 06 SELECTED
                  </span>
                </div>

                <div className="relative flex items-center justify-between gap-2 px-3 py-3 overflow-visible">
                  {/* Track Container spanning exactly from center of 01 (left-[40px]) to center of 06 (right-[40px]) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[40px] right-[40px] top-[26px] h-[2px] bg-[#9DA7C7]/20"
                  >
                    <div
                      className="relative h-[2.5px] -mt-[0.25px] bg-gradient-to-r from-[#5367F9] via-[#A58AFF] to-[#D4C9FF] shadow-[0_0_12px_#A58AFF] transition-all duration-300"
                      style={{
                        width: `${stageProgressPercent}%`,
                      }}
                    >
                      {/* Stage-Synchronized Traveling Packet Head on the Trace Track */}
                      <span
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white ${
                          simState.status === 'awaiting_approval'
                            ? 'h-3.5 w-3.5 shadow-[0_0_18px_5px_rgba(212,201,255,0.95)] animate-pulse'
                            : 'h-2.5 w-2.5 shadow-[0_0_12px_3px_rgba(165,138,255,0.85)]'
                        }`}
                      />
                    </div>
                  </div>

                  {WORKFLOW_STAGES.map((st, idx) => {
                    const isActiveOrPassed = idx <= displayedStageIdx;
                    const isCurrent = idx === displayedStageIdx;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => onSelectStageIndex(idx, true)}
                        aria-label={`Select stage ${st.indexLabel} ${st.title}`}
                        aria-pressed={isCurrent}
                        className="relative z-10 flex flex-col items-center gap-1.5 min-w-[56px] cursor-pointer focus:outline-none group"
                      >
                        <span
                          className={`h-7 w-7 rounded-full flex items-center justify-center font-mono-tech text-[11px] font-semibold transition-all ${
                            isCurrent
                              ? 'bg-[#A58AFF] text-[#0C0F1B] border-2 border-[#F3F4FA] shadow-[0_0_20px_4px_rgba(165,138,255,0.75)] scale-110'
                              : isActiveOrPassed
                              ? 'bg-[#171D32] text-[#F3F4FA] border border-[#A58AFF]'
                              : 'bg-[#11172A] text-[#9DA7C7] border border-[#9DA7C7]/30 group-hover:border-[#A58AFF]/60'
                          }`}
                        >
                          {st.indexLabel}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            isCurrent ? 'text-[#F3F4FA]' : 'text-[#9DA7C7]'
                          }`}
                        >
                          {st.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
