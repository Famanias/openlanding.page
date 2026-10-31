import React, { useEffect, useRef, useState } from 'react';
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

export const GlassWorkspace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltPlaneRef = useRef<HTMLDivElement>(null);
  const inputPanelRef = useRef<HTMLDivElement>(null);
  const processingPanelRef = useRef<HTMLDivElement>(null);
  const outputPanelRef = useRef<HTMLDivElement>(null);
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

  // Opening GSAP Choreography (Phases C, D, E, F)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveSubStep('route');
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setIsDemoPlaying(false);
        },
      });

      setIsDemoPlaying(true);

      // Phase C: Glass panels assemble from shallow depth
      tl.fromTo(
        inputPanelRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65 },
        0.15
      )
        .fromTo(
          processingPanelRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75 },
          0.32
        )
        .fromTo(
          outputPanelRef.current,
          { opacity: 0, y: 26, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          0.5
        );

      // Phase D: SVG connectors draw themselves
      if (connector1Ref.current && connector2Ref.current) {
        tl.fromTo(
          [connector1Ref.current, connector2Ref.current],
          { strokeDashoffset: 320, opacity: 0.2 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.75, stagger: 0.2 },
          0.65
        );
      }

      // Phase E: Deterministic Processing Demonstration (Classify -> Summarize -> Route)
      tl.call(() => setActiveSubStep('classify'), [], 1.1)
        .call(() => setActiveSubStep('summarize'), [], 1.75)
        .call(() => setActiveSubStep('route'), [], 2.4);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triggerManualDemoWalkthrough = () => {
    if (isDemoPlaying) return;
    setIsDemoPlaying(true);
    setSelectedStage('input');
    setActiveSubStep('classify');

    window.setTimeout(() => {
      setSelectedStage('processing');
      setActiveSubStep('classify');
    }, 550);

    window.setTimeout(() => {
      setActiveSubStep('summarize');
    }, 1150);

    window.setTimeout(() => {
      setActiveSubStep('route');
    }, 1750);

    window.setTimeout(() => {
      setSelectedStage('output');
      setIsDemoPlaying(false);
    }, 2400);
  };

  // Controlled pointer parallax (+/- 3.5 deg max)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltPlaneRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = (-yRatio * 5).toFixed(2);
    const tiltY = (xRatio * 6).toFixed(2);

    tiltPlaneRef.current.style.setProperty('--tilt-x', `${tiltX}deg`);
    tiltPlaneRef.current.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handlePointerLeave = () => {
    if (!tiltPlaneRef.current) return;
    tiltPlaneRef.current.style.setProperty('--tilt-x', '2deg');
    tiltPlaneRef.current.style.setProperty('--tilt-y', '-4deg');
  };

  const handleStageSelect = (stage: WorkspaceStageId) => {
    setSelectedStage((prev) => (prev === stage ? null : stage));
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

        <button
          type="button"
          onClick={triggerManualDemoWalkthrough}
          disabled={isDemoPlaying}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/85 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#1E2432] shadow-xs hover:bg-white disabled:opacity-60 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
        >
          <Play className="h-3 w-3 fill-current" aria-hidden="true" />
          <span>{isDemoPlaying ? 'Stepping workflow...' : 'Step Through Flow'}</span>
        </button>
      </div>

      {/* 2.5D Perspective Stage Container */}
      <div className="workspace-perspective-stage relative min-h-[540px] w-full">
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
          {/* PANEL 01 — INPUT (Upper-Left in 2.5D space) */}
          <div
            ref={inputPanelRef}
            role="button"
            tabIndex={0}
            aria-pressed={selectedStage === 'input'}
            aria-label="Stage 01 Input: Incoming Work. Click to inspect stage."
            onClick={() => handleStageSelect('input')}
            onMouseEnter={() => setHoveredStage('input')}
            onMouseLeave={() => setHoveredStage(null)}
            onFocus={() => setHoveredStage('input')}
            onBlur={() => setHoveredStage(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageSelect('input');
              }
            }}
            className={`lg:w-[74%] rounded-2xl p-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
              effectiveStage === 'input' ? 'glass-panel-active' : 'glass-panel'
            } ${getPanelDepthClass('input', 'panel-depth-input')}`}
          >
            <div className="flex items-center justify-between border-b border-[#1E2432]/8 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#657187]">
                  01 — INPUT
                </span>
                <span aria-hidden="true" className="text-[#657187]">·</span>
                <span className="text-xs font-semibold text-[#1E2432]">
                  Incoming Work
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#657187]">
                4 SOURCES
              </span>
            </div>

            {/* Interactive Source Task Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-1.5" onClick={(e) => e.stopPropagation()}>
              {WORKSPACE_SCENARIOS.map((item) => {
                const isSelected = item.id === activeScenarioId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveScenarioId(item.id);
                      setSelectedStage('input');
                    }}
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

          {/* SVG Connector Bridge 1: Input -> AI Processing */}
          <div className="relative -my-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 520 34" fill="none" className="h-8 w-full">
              <path
                ref={connector1Ref}
                d="M 160 2 C 160 20, 290 14, 290 32"
                stroke="#8E7CE8"
                strokeWidth={effectiveStage === 'input' || effectiveStage === 'processing' ? '2.5' : '1.75'}
                strokeDasharray="320"
                strokeLinecap="round"
              />
              <path
                d="M 160 2 C 160 20, 290 14, 290 32"
                stroke="#1E2432"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="svg-signal-line"
              />
              <circle cx="160" cy="4" r="3.5" fill="#8E7CE8" />
              <circle cx="290" cy="30" r="4" fill="#5B8DEF" />
            </svg>
          </div>

          {/* PANEL 02 — AI PROCESSING (Central Largest Prominent Glass Panel) */}
          <div
            ref={processingPanelRef}
            role="button"
            tabIndex={0}
            aria-pressed={selectedStage === 'processing'}
            aria-label="Stage 02 AI Processing: Classify, Summarize, Route. Click to inspect stage."
            onClick={() => handleStageSelect('processing')}
            onMouseEnter={() => setHoveredStage('processing')}
            onMouseLeave={() => setHoveredStage(null)}
            onFocus={() => setHoveredStage('processing')}
            onBlur={() => setHoveredStage(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageSelect('processing');
              }
            }}
            className={`lg:ml-auto lg:mr-2 lg:w-[88%] rounded-2xl p-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
              effectiveStage === 'processing' ? 'glass-panel-active' : 'glass-panel-active'
            } ${getPanelDepthClass('processing', 'panel-depth-processing')}`}
          >
            <div className="flex items-center justify-between border-b border-[#1E2432]/10 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#252C43]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold text-[#657187]">
                  02 — AI PROCESSING
                </span>
                <span aria-hidden="true" className="text-[#657187]">·</span>
                <span className="text-xs font-semibold text-[#1E2432]">
                  AI Workflow
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#5BA59A] font-medium">
                DETERMINISTIC FLOW
              </span>
            </div>

            {/* Three sequential AI Workflow steps: Classify -> Summarize -> Route */}
            <div className="mt-3.5 space-y-2" onClick={(e) => e.stopPropagation()}>
              {/* Step 1: Classify */}
              <div
                onClick={() => {
                  setActiveSubStep('classify');
                  setSelectedStage('processing');
                }}
                className={`rounded-xl p-3 transition-all cursor-pointer border ${
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
              </div>

              {/* Step 2: Summarize */}
              <div
                onClick={() => {
                  setActiveSubStep('summarize');
                  setSelectedStage('processing');
                }}
                className={`rounded-xl p-3 transition-all cursor-pointer border ${
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
              </div>

              {/* Step 3: Route */}
              <div
                onClick={() => {
                  setActiveSubStep('route');
                  setSelectedStage('processing');
                }}
                className={`rounded-xl p-3 transition-all cursor-pointer border ${
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
              </div>
            </div>
          </div>

          {/* SVG Connector Bridge 2: AI Processing -> Output */}
          <div className="relative -my-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 520 34" fill="none" className="h-8 w-full">
              <path
                ref={connector2Ref}
                d="M 310 2 C 310 20, 390 14, 390 32"
                stroke="#5B8DEF"
                strokeWidth={effectiveStage === 'processing' || effectiveStage === 'output' ? '2.5' : '1.75'}
                strokeDasharray="320"
                strokeLinecap="round"
              />
              <path
                d="M 310 2 C 310 20, 390 14, 390 32"
                stroke="#5BA59A"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="svg-signal-line-delayed"
              />
              <circle cx="310" cy="4" r="3.5" fill="#5B8DEF" />
              <circle cx="390" cy="30" r="4" fill="#5BA59A" />
            </svg>
          </div>

          {/* PANEL 03 — OUTPUT (Lower-Right in 2.5D space) */}
          <div
            ref={outputPanelRef}
            role="button"
            tabIndex={0}
            aria-pressed={selectedStage === 'output'}
            aria-label="Stage 03 Output: Organized Results ready for review. Click to inspect stage."
            onClick={() => handleStageSelect('output')}
            onMouseEnter={() => setHoveredStage('output')}
            onMouseLeave={() => setHoveredStage(null)}
            onFocus={() => setHoveredStage('output')}
            onBlur={() => setHoveredStage(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageSelect('output');
              }
            }}
            className={`lg:ml-auto lg:w-[80%] rounded-2xl p-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
              effectiveStage === 'output' ? 'glass-panel-active' : 'glass-panel'
            } ${getPanelDepthClass('output', 'panel-depth-output')}`}
          >
            <div className="flex items-center justify-between border-b border-[#1E2432]/8 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#657187]">
                  03 — OUTPUT
                </span>
                <span aria-hidden="true" className="text-[#657187]">·</span>
                <span className="text-xs font-semibold text-[#1E2432]">
                  Organized Results
                </span>
              </div>
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
