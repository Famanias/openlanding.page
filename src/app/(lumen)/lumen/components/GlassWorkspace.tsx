'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import {
  Mail,
  FileText,
  CheckSquare,
  Mic,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Play,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import {
  WorkspaceStageId,
  ProcessingSubStep,
  WORKSPACE_SCENARIOS,
  getStageCaption,
} from '../utils/workflowLogic';
import { WorkspacePlaybackController } from '../motion/workspacePlayback';
import { HERO_DEMO_BEATS } from '../motion/timings';

interface GlassWorkspaceProps {
  introConsumedRef?: React.RefObject<boolean>;
}

export const GlassWorkspace: React.FC<GlassWorkspaceProps> = ({ introConsumedRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltPlaneRef = useRef<HTMLDivElement>(null);

  // Entrance wrappers (owned strictly by GSAP entrance timeline)
  const inputEntranceRef = useRef<HTMLDivElement>(null);
  const processingEntranceRef = useRef<HTMLDivElement>(null);
  const outputEntranceRef = useRef<HTMLDivElement>(null);

  // Inner inspection panels (owned by component state & CSS .panel-depth-*)
  const inputPanelRef = useRef<HTMLDivElement>(null);
  const processingPanelRef = useRef<HTMLDivElement>(null);
  const outputPanelRef = useRef<HTMLDivElement>(null);

  // Connectors
  const connector1Ref = useRef<SVGPathElement>(null);
  const connector2Ref = useRef<SVGPathElement>(null);

  const [selectedStage, setSelectedStage] = useState<WorkspaceStageId | null>(null);
  const [hoveredStage, setHoveredStage] = useState<WorkspaceStageId | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('emails');
  const [activeSubStep, setActiveSubStep] = useState<ProcessingSubStep>('classify');
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [artworkFallback, setArtworkFallback] = useState<boolean>(false);

  const effectiveStage = hoveredStage ?? selectedStage;
  const currentScenario =
    WORKSPACE_SCENARIOS.find((s) => s.id === activeScenarioId) || WORKSPACE_SCENARIOS[0];

  const playbackRef = useRef<WorkspacePlaybackController>(
    new WorkspacePlaybackController(introConsumedRef)
  );

  const traceConnector = useCallback((path: SVGPathElement | null, durationSec = 0.45) => {
    if (!path) return;
    try {
      const len = path.getTotalLength ? path.getTotalLength() : 320;
      gsap.fromTo(
        path,
        { strokeDasharray: `${len} ${len}`, strokeDashoffset: len, opacity: 0.4 },
        { strokeDashoffset: 0, opacity: 1, duration: durationSec, ease: 'power2.out' }
      );
    } catch {
      // SVG not mounted in test / jsdom
    }
  }, []);

  // Finite sequence runner
  const runSequence = useCallback(
    (scenarioId: string) => {
      setIsDemoPlaying(true);
      playbackRef.current.startPlayback(
        scenarioId,
        (step) => {
          setActiveSubStep(step);
          if (step === 'classify') {
            traceConnector(connector1Ref.current, 0.4);
          } else if (step === 'route') {
            traceConnector(connector2Ref.current, 0.4);
          }
        },
        () => {
          setIsDemoPlaying(false);
        }
      );
    },
    [traceConnector]
  );

  // Initial authoring entrance (runs once per App lifetime when 25% visible)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedQuery.matches) {
      setActiveSubStep('route');
      playbackRef.current.consumeIntro();
      return;
    }

    if (!playbackRef.current.shouldPlayIntro()) {
      setActiveSubStep('route');
      return;
    }

    let observer: IntersectionObserver | null = null;
    let gsapCtx: gsap.Context | null = null;

    const startEntranceAnimation = () => {
      gsapCtx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            if (inputEntranceRef.current) inputEntranceRef.current.style.willChange = 'auto';
            if (processingEntranceRef.current) processingEntranceRef.current.style.willChange = 'auto';
            if (outputEntranceRef.current) outputEntranceRef.current.style.willChange = 'auto';
          },
        });

        // 0-640ms: Glass panels settle from shallow depth on outer entrance wrappers
        tl.fromTo(
          inputEntranceRef.current,
          { opacity: 0.5, y: 16, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.52 },
          HERO_DEMO_BEATS.panelsStart
        )
          .fromTo(
            processingEntranceRef.current,
            { opacity: 0.5, y: 16, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.52 },
            HERO_DEMO_BEATS.panelsStart + HERO_DEMO_BEATS.panelsStagger
          )
          .fromTo(
            outputEntranceRef.current,
            { opacity: 0.5, y: 16, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.52 },
            HERO_DEMO_BEATS.panelsStart + HERO_DEMO_BEATS.panelsStagger * 2
          );

        // Run the finite demonstration sequence
        runSequence(activeScenarioId);
      }, containerRef);
    };

    const playback = playbackRef.current;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting && playback.shouldPlayIntro()) {
            observer?.disconnect();
            observer = null;
            startEntranceAnimation();
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(container);
    } else {
      startEntranceAnimation();
    }

    return () => {
      observer?.disconnect();
      gsapCtx?.revert();
      playback.dispose(false);
    };
  }, [activeScenarioId, runSequence]);

  // User actions cancel playback immediately without stale callbacks
  const handleStageSelect = (stage: WorkspaceStageId) => {
    playbackRef.current.cancelPlayback('user-stage-select', true);
    setIsDemoPlaying(false);
    setSelectedStage((prev) => (prev === stage ? null : stage));
  };

  const handleScenarioSelect = (scenarioId: string) => {
    playbackRef.current.cancelPlayback('user-scenario-change', true);
    setIsDemoPlaying(false);
    setActiveScenarioId(scenarioId);
    setSelectedStage('input');
    setActiveSubStep('classify');
  };

  const handleManualReplay = () => {
    playbackRef.current.cancelPlayback('replay-restart', false);
    setSelectedStage(null);
    runSequence(activeScenarioId);
  };

  // Controlled pointer parallax (+/- 2 deg max relative to resting 2deg X, -4deg Y)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!tiltPlaneRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = (2 + -yRatio * 2).toFixed(2);
    const tiltY = (-4 + xRatio * 2).toFixed(2);

    tiltPlaneRef.current.style.setProperty('--tilt-x', `${tiltX}deg`);
    tiltPlaneRef.current.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handlePointerLeave = () => {
    if (!tiltPlaneRef.current) return;
    tiltPlaneRef.current.style.setProperty('--tilt-x', '2deg');
    tiltPlaneRef.current.style.setProperty('--tilt-y', '-4deg');
  };

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'emails':
        return <Mail className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
      case 'documents':
        return <FileText className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
      case 'tasks':
        return <CheckSquare className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
      default:
        return <Mic className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
    }
  };

  const getPanelDepthClass = (stage: WorkspaceStageId, baseClass: string) => {
    if (!effectiveStage) return baseClass;
    if (effectiveStage === stage) return `${baseClass} panel-depth-focused z-30`;
    return `${baseClass} panel-depth-recessed opacity-80 z-10`;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full select-none"
    >
      {/* Top Interactive Stage Controls Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div
          role="group"
          aria-label="Inspect workflow stage"
          className="flex items-center gap-1 rounded-xl border border-white/80 bg-white/65 p-1 shadow-xs backdrop-blur-md"
        >
          {(
            [
              { id: 'input', label: '01 Input' },
              { id: 'processing', label: '02 AI Processing' },
              { id: 'output', label: '03 Output' },
            ] as { id: WorkspaceStageId; label: string }[]
          ).map((tab) => {
            const isActive = selectedStage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleStageSelect(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#252C43] text-white shadow-xs'
                    : 'text-[#657187] hover:text-[#1E2432] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Replay Demonstration Button (Always enabled, restarts sequence cleanly) */}
        <button
          type="button"
          onClick={handleManualReplay}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#1E2432] shadow-xs hover:bg-white transition-all cursor-pointer"
        >
          <Play className="h-3.5 w-3.5 text-[#5BA59A]" aria-hidden="true" />
          <span>{isDemoPlaying ? 'Restarting Demo...' : 'Replay Demo'}</span>
        </button>
      </div>

      {/* 2.5D Stage Viewport */}
      <div className="workspace-perspective-stage relative min-h-[520px] rounded-3xl border border-white/90 bg-gradient-to-br from-white/70 via-white/50 to-white/35 p-5 sm:p-7 shadow-xs backdrop-blur-md overflow-hidden">
        {/* Background Decorative Glass Artwork Asset */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 z-0 flex items-center justify-center opacity-55"
        >
          <img
            src={
              artworkFallback
                ? '/assets/aistudio/glass-workspace-art_d86f62af.png'
                : '/assets/aistudio/glass-workspace-art_25aec004.svg'
            }
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setArtworkFallback(true)}
            className="h-full max-h-[540px] w-full object-contain"
          />
        </div>

        {/* Tilted Spatial Plane */}
        <div
          ref={tiltPlaneRef}
          className="workspace-tilt-plane relative z-10 flex flex-col gap-3"
        >
          {/* PANEL 01 — ENTRANCE WRAPPER (GSAP owns this wrapper) */}
          <div ref={inputEntranceRef} className="workspace-entrance-wrapper lg:w-[74%]">
            {/* PANEL 01 — INPUT (Inner inspection panel) */}
            <div
              ref={inputPanelRef}
              onMouseEnter={() => setHoveredStage('input')}
              onMouseLeave={() => setHoveredStage(null)}
              className={`rounded-2xl p-4 ${
                effectiveStage === 'input' ? 'glass-panel-active' : 'glass-panel'
              } ${getPanelDepthClass('input', 'panel-depth-input')}`}
            >
              <div className="flex items-center justify-between border-b border-[#1E2432]/8 pb-2.5">
                <button
                  type="button"
                  aria-pressed={selectedStage === 'input'}
                  aria-label="Stage 01 Input: Incoming Work. Click to inspect stage."
                  onClick={() => handleStageSelect('input')}
                  className="flex items-center gap-2 cursor-pointer rounded-lg p-1 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
                >
                  <span className="font-mono text-[11px] font-semibold text-[#657187]">
                    01 — INPUT
                  </span>
                  <span aria-hidden="true" className="text-[#657187]">·</span>
                  <span className="text-xs font-semibold text-[#1E2432]">
                    Incoming Work
                  </span>
                </button>
                <span className="font-mono text-[11px] text-[#657187]">
                  4 SOURCES
                </span>
              </div>

              {/* Interactive Source Task Buttons */}
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {WORKSPACE_SCENARIOS.map((item) => {
                  const isSelected = item.id === activeScenarioId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleScenarioSelect(item.id)}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/95 text-[#1E2432] shadow-xs border border-[#252C43]/20 font-semibold'
                          : 'bg-white/55 text-[#657187] hover:bg-white/80 hover:text-[#1E2432] border border-transparent'
                      }`}
                    >
                      {getScenarioIcon(item.id)}
                      <span className="truncate">{item.categoryLabel}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2.5 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 text-xs">
                <span className="font-medium text-[#1E2432] truncate">
                  {currentScenario.title}
                </span>
                <span className="ml-2 font-mono text-[10px] text-[#657187] whitespace-nowrap shrink-0">
                  {currentScenario.sourceMeta}
                </span>
              </div>
            </div>
          </div>

          {/* SVG Connector Bridge 1: Input -> AI Processing */}
          <div className="relative -my-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 520 34" fill="none" className="h-8 w-full">
              <path
                ref={connector1Ref}
                d="M 160 2 C 160 20, 290 14, 290 32"
                stroke="#8E7CE8"
                strokeWidth={effectiveStage === 'input' || effectiveStage === 'processing' ? '2.5' : '1.75'}
                strokeLinecap="round"
              />
              <circle cx="160" cy="4" r="3.5" fill="#8E7CE8" />
              <circle cx="290" cy="30" r="4" fill="#5B8DEF" />
            </svg>
          </div>

          {/* PANEL 02 — ENTRANCE WRAPPER (GSAP owns this wrapper) */}
          <div ref={processingEntranceRef} className="workspace-entrance-wrapper lg:ml-auto lg:mr-2 lg:w-[88%]">
            {/* PANEL 02 — AI PROCESSING (Inner inspection panel) */}
            <div
              ref={processingPanelRef}
              onMouseEnter={() => setHoveredStage('processing')}
              onMouseLeave={() => setHoveredStage(null)}
              className={`rounded-2xl p-5 ${
                effectiveStage === 'processing' ? 'glass-panel-active' : 'glass-panel-active'
              } ${getPanelDepthClass('processing', 'panel-depth-processing')}`}
            >
              <div className="flex items-center justify-between border-b border-[#1E2432]/10 pb-3">
                <button
                  type="button"
                  aria-pressed={selectedStage === 'processing'}
                  aria-label="Stage 02 AI Processing: Classify, Summarize, Route. Click to inspect stage."
                  onClick={() => handleStageSelect('processing')}
                  className="flex items-center gap-2 cursor-pointer rounded-lg p-1 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
                >
                  <Cpu className="h-4 w-4 text-[#252C43]" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-semibold text-[#657187]">
                    02 — AI PROCESSING
                  </span>
                  <span aria-hidden="true" className="text-[#657187]">·</span>
                  <span className="text-xs font-semibold text-[#1E2432]">
                    AI Workflow
                  </span>
                </button>
                <span className="font-mono text-[11px] text-[#5BA59A] font-medium">
                  DETERMINISTIC FLOW
                </span>
              </div>

              {/* Three sequential AI Workflow steps: Classify -> Summarize -> Route */}
              <div className="mt-3.5 space-y-2">
                {/* Step 1: Classify */}
                <button
                  type="button"
                  onClick={() => {
                    playbackRef.current.cancelPlayback('user-stage-select', true);
                    setIsDemoPlaying(false);
                    setActiveSubStep('classify');
                    setSelectedStage('processing');
                  }}
                  className={`w-full rounded-xl p-3 text-left transition-all cursor-pointer border ${
                    activeSubStep === 'classify'
                      ? 'bg-white/95 border-[#D8D0F7] shadow-xs'
                      : 'bg-white/65 border-white/70 hover:bg-white/85'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1E2432]">1. Classify</span>
                    <span className="font-mono text-[11px] text-[#657187]">
                      {currentScenario.classification.intent} · {currentScenario.classification.priority}
                    </span>
                  </div>
                </button>

                {/* Step 2: Summarize */}
                <button
                  type="button"
                  onClick={() => {
                    playbackRef.current.cancelPlayback('user-stage-select', true);
                    setIsDemoPlaying(false);
                    setActiveSubStep('summarize');
                    setSelectedStage('processing');
                  }}
                  className={`w-full rounded-xl p-3 text-left transition-all cursor-pointer border ${
                    activeSubStep === 'summarize'
                      ? 'bg-white/95 border-[#C9DAFA] shadow-xs'
                      : 'bg-white/65 border-white/70 hover:bg-white/85'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1E2432]">2. Summarize</span>
                    <span className="font-mono text-[11px] text-[#657187]">Key Context Extracted</span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#657187] leading-relaxed">
                    {currentScenario.summaryBullets[0]}
                  </p>
                </button>

                {/* Step 3: Route */}
                <button
                  type="button"
                  onClick={() => {
                    playbackRef.current.cancelPlayback('user-stage-select', true);
                    setIsDemoPlaying(false);
                    setActiveSubStep('route');
                    setSelectedStage('processing');
                  }}
                  className={`w-full rounded-xl p-3 text-left transition-all cursor-pointer border ${
                    activeSubStep === 'route'
                      ? 'bg-white/95 border-[#F6DCCA] shadow-xs'
                      : 'bg-white/65 border-white/70 hover:bg-white/85'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1E2432]">3. Route</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#1E2432]">
                      <span>{currentScenario.routeDestination}</span>
                      <ArrowRight className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* SVG Connector Bridge 2: AI Processing -> Output */}
          <div className="relative -my-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 520 34" fill="none" className="h-8 w-full">
              <path
                ref={connector2Ref}
                d="M 310 2 C 310 20, 390 14, 390 32"
                stroke="#5BA59A"
                strokeWidth={effectiveStage === 'processing' || effectiveStage === 'output' ? '2.5' : '1.75'}
                strokeLinecap="round"
              />
              <circle cx="310" cy="4" r="3.5" fill="#5B8DEF" />
              <circle cx="390" cy="30" r="4" fill="#5BA59A" />
            </svg>
          </div>

          {/* PANEL 03 — ENTRANCE WRAPPER (GSAP owns this wrapper) */}
          <div ref={outputEntranceRef} className="workspace-entrance-wrapper lg:ml-auto lg:w-[80%]">
            {/* PANEL 03 — OUTPUT (Inner inspection panel) */}
            <div
              ref={outputPanelRef}
              onMouseEnter={() => setHoveredStage('output')}
              onMouseLeave={() => setHoveredStage(null)}
              className={`rounded-2xl p-4 ${
                effectiveStage === 'output' ? 'glass-panel-active' : 'glass-panel'
              } ${getPanelDepthClass('output', 'panel-depth-output')}`}
            >
              <div className="flex items-center justify-between border-b border-[#1E2432]/8 pb-2.5">
                <button
                  type="button"
                  aria-pressed={selectedStage === 'output'}
                  aria-label="Stage 03 Output: Organized Results ready for review. Click to inspect stage."
                  onClick={() => handleStageSelect('output')}
                  className="flex items-center gap-2 cursor-pointer rounded-lg p-1 hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
                >
                  <span className="font-mono text-[11px] font-semibold text-[#657187]">
                    03 — OUTPUT
                  </span>
                  <span aria-hidden="true" className="text-[#657187]">·</span>
                  <span className="text-xs font-semibold text-[#1E2432]">
                    Organized Results
                  </span>
                </button>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5BA59A]">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Ready for review</span>
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-white/80 p-2.5">
                  <div className="text-[11px] font-mono text-[#657187]">DRAFT SUMMARY</div>
                  <div className="mt-0.5 text-xs font-semibold text-[#1E2432] line-clamp-1">
                    {currentScenario.outputDraft.summaryTitle}
                  </div>
                </div>
                <div className="rounded-xl bg-white/80 p-2.5">
                  <div className="text-[11px] font-mono text-[#657187]">PRIORITIZED TASK</div>
                  <div className="mt-0.5 text-xs font-semibold text-[#1E2432] line-clamp-1">
                    {currentScenario.outputDraft.prioritizedTask}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span className="text-[#1E2432] truncate">
                    {currentScenario.outputDraft.preparedResponse}
                  </span>
                </div>
                <span className="ml-2 font-mono text-[10px] text-[#657187] whitespace-nowrap shrink-0">
                  {currentScenario.outputDraft.reviewStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Live Stage Caption */}
      <div
        role="status"
        aria-live="polite"
        className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-xs backdrop-blur-md"
      >
        <div className="flex items-center gap-2.5">
          <Layers className="h-4 w-4 text-[#252C43] shrink-0" aria-hidden="true" />
          <span className="font-medium text-[#1E2432]">
            {getStageCaption(effectiveStage)}
          </span>
        </div>
        {effectiveStage && (
          <button
            type="button"
            onClick={() => setSelectedStage(null)}
            className="font-mono text-[11px] font-medium text-[#657187] hover:text-[#1E2432] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reset view
          </button>
        )}
      </div>
    </div>
  );
};
