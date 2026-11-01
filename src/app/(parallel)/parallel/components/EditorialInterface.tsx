'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  CAUSAL_SEQUENCE,
  HERO_MODES,
  InfrastructureLayerId,
  useParallelStore,
} from '../store/useParallelStore';
import { InterventionStrategy } from '../simulation/engine';
import { HeroMode } from '../simulation/cameraMath';
import {
  DemoRequestInput,
  ValidationResult,
  validateDemoRequest,
} from '../simulation/validation';
import { ParallelWorldCanvas } from '../rendering/ParallelWorldCanvas';
import { DeferredScene } from '../rendering/DeferredScene';
import {
  WorkflowTwinCanvas,
  ProjectedHubCoord,
} from '../rendering/WorkflowTwinCanvas';
import {
  WORKFLOW_HUBS,
  WORKFLOW_LAYERS,
  WorkflowStageIndex,
  computeWorkflowStageChoreography,
} from '../simulation/workflowTwinMath';
import { WebGLFallbackView } from './WebGLFallbackView';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function formatMinutesToClock(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

interface EditorialInterfaceProps {
  webglFailed: boolean;
  onWebGLFailure: () => void;
  onScrollToSection: (sectionId: string) => void;
}

const LAYER_DESCRIPTIONS: Record<
  InfrastructureLayerId,
  {
    title: string;
    code: string;
    color: string;
    metricLabel: string;
    summary: string;
    bulletPoints: string[];
  }
> = {
  mobility: {
    title: 'Mobility Corridors & Signal Graph',
    code: 'LAYER 01 // MOBILITY',
    color: '#E85D36',
    metricLabel: '40 Directed Corridors · 3 River Crossings',
    summary:
      'Tracks commuter and transit flow across arterial bridges, signalized collectors, and dynamic bus lanes using BPR impedance curves.',
    bulletPoints: [
      'Meridian Central Bridge carries 42% of baseline cross-river commuter volume.',
      'West Harbor Bypass Viaduct and East Innovation Crossing provide reserve bypass capacity.',
    ],
  },
  energy: {
    title: 'Substation Distribution & Load Balance',
    code: 'LAYER 02 // ENERGY',
    color: '#38BDF8',
    metricLabel: '312 MW Peak Urban Load · 6 District Feeders',
    summary:
      'Couples traction power, electric bus depot charging, and commercial HVAC demand across six interconnected district substations.',
    bulletPoints: [
      'South Substation (145 MW) balances automated harbor cranes and electrified transit corridors.',
      'Dynamic load shedding prevents transformer saturation during rerouting surges.',
    ],
  },
  logistics: {
    title: 'Freight & Cold-Chain Distribution',
    code: 'LAYER 03 // LOGISTICS',
    color: '#D99B26',
    metricLabel: '1,240 Daily Dispatch Windows · 4 Priority Hubs',
    summary:
      'Models time-critical hospital, cold-chain, and port container dispatches from West Harbor to northern distribution terminals.',
    bulletPoints: [
      'Rerouted freight avoids CBD collector bottlenecks when time-window slotting is active.',
      'Preserves 98.4% hospital and cold-chain SLA compliance during arterial closures.',
    ],
  },
};

const HOW_IT_WORKS_STEPS = [
  {
    num: '01',
    stage: 'Understand',
    headline: 'See the whole system.',
    copy: 'Bring infrastructure, movement, operations, and constraints into a single living model.',
    detail:
      'Ingest road topologies, transit schedules, substation capacities, and freight corridors into a unified spatial graph where every dependency is explicit.',
    metric: '215 structures · 40 directed corridors · 3 coupled layers',
  },
  {
    num: '02',
    stage: 'Simulate',
    headline: 'Explore what could change.',
    copy: 'Introduce disruptions, test interventions, and run alternative scenarios before acting.',
    detail:
      'Close a primary arterial crossing, surge commuter demand, or reallocate transit headways—and watch cascading effects propagate across the city in real time.',
    metric: 'Deterministic 16-hour horizon · 15-minute resolution',
  },
  {
    num: '03',
    stage: 'Decide',
    headline: 'Move forward with clarity.',
    copy: 'Compare outcomes, understand trade-offs, and choose the strongest path.',
    detail:
      'Evaluate side-by-side performance across travel delay, corridor congestion, and completed deliveries with a verifiable causal audit trail.',
    metric: 'Side-by-side baseline vs. intervention verification',
  },
];

const INDUSTRY_SOLUTIONS = [
  {
    index: '01',
    id: 'Mobility',
    title: 'Mobility',
    headline: 'Coordinate multi-modal transport before gridlock forms.',
    copy: 'Model traffic, transit, closures, and changing demand across complex transport networks.',
    metrics: [
      { label: 'Corridor Delay Reduction', value: '-54%' },
      { label: 'Transit Mode Shift', value: '+14.8%' },
      { label: 'Signal Reroute Latency', value: '< 45ms' },
    ],
    focusNodes: ['Meridian Central Bridge', 'West Bypass Viaduct', 'CBD Transit Loop'],
  },
  {
    index: '02',
    id: 'Energy',
    title: 'Energy',
    headline: 'Balance grid load and electrified fleet demand across districts.',
    copy: 'Understand how load, generation, and infrastructure constraints affect resilience.',
    metrics: [
      { label: 'Feeder Peak Shaving', value: '28.4 MW' },
      { label: 'Substation Margin', value: '99.2%' },
      { label: 'Depot Charge Sync', value: '6 Districts' },
    ],
    focusNodes: ['South Harbor Substation', 'CBD Traction Feeder', 'East Tech Microgrid'],
  },
  {
    index: '03',
    id: 'Logistics',
    title: 'Logistics',
    headline: 'Protect critical freight and cold-chain SLA windows.',
    copy: 'Test routing, hub performance, and supply continuity under changing conditions.',
    metrics: [
      { label: 'On-Time Cold-Chain SLA', value: '98.4%' },
      { label: 'Completed Deliveries', value: '+310 / day' },
      { label: 'Hub Queue Variance', value: '-41%' },
    ],
    focusNodes: ['West Harbor Container Port', 'East Hospital Hub', 'South Industrial Consolidation'],
  },
  {
    index: '04',
    id: 'Infrastructure',
    title: 'Infrastructure',
    headline: 'Stress-test capital projects and maintenance closures.',
    copy: 'Evaluate long-term investments, disruptions, and cascading system effects.',
    metrics: [
      { label: 'Closure Scenarios Tested', value: '100+ deterministic' },
      { label: 'Cross-System Visibility', value: '3 Layers' },
      { label: 'Decision Auditability', value: '5-Stage Causal' },
    ],
    focusNodes: ['Arterial Bridge Retrofit', 'Embankment Expansion', 'Regional Freight Ring'],
  },
];

const EXPLAINABILITY_CHAIN = [
  {
    step: '01',
    label: 'Bridge closure',
    nodeCode: 'NODE // SEC-04',
    location: 'Meridian Central Bridge (All 6 Lanes)',
    delta: '-140 veh/min cross-river capacity',
    explanation:
      'An unscheduled structural lockdown at 07:30 severs the primary central arterial linking the Southern Port and Industrial zone to the northern Financial Core.',
  },
  {
    step: '02',
    label: 'Reduced road capacity',
    nodeCode: 'NODE // CAP-42',
    location: 'Cross-River Corridor & Approach Ramps',
    delta: '-42% total river crossing throughput',
    explanation:
      'Total cross-river capacity drops by 42%. Volume-to-capacity ratios on the central approach ramps surge past 1.35 within 15 minutes of closure.',
  },
  {
    step: '03',
    label: 'Traffic redistribution',
    nodeCode: 'NODE // RTE-09',
    location: 'West Viaduct & East Innovation Crossing',
    delta: '+68% diverted flow onto secondary crossings',
    explanation:
      'In Baseline Future A, uncoordinated drivers flood secondary collector streets. In Coordinated Future B, PARALLEL pre-weights graph impedances to balance flow across the West and East crossings.',
  },
  {
    step: '04',
    label: 'Nearby congestion',
    nodeCode: 'NODE // CBD-14',
    location: 'Midtown Crosstown & Docklands Arterial',
    delta: '58% speed degradation in unmitigated baseline',
    explanation:
      'Without adaptive signal timing and transit boost, diverted queues spill back into northern collector intersections, locking up CBD and Docklands corridors.',
  },
  {
    step: '05',
    label: 'Delivery delays',
    nodeCode: 'NODE // LOG-05',
    location: 'East Civic & Hospital Distribution Hub',
    delta: '14.2 min faster arrival with coordinated response',
    explanation:
      'By isolating freight corridors and shifting commuter load onto high-frequency transit, PARALLEL preserves hospital and cold-chain delivery windows across the city.',
  },
];

export const EditorialInterface: React.FC<EditorialInterfaceProps> = ({
  webglFailed,
  onWebGLFailure,
  onScrollToSection,
}) => {
  const heroState = useParallelStore((s) => s.heroState);
  const heroMode = useParallelStore((s) => s.heroMode);
  const invisibleLayer = useParallelStore((s) => s.invisibleLayer);
  const comparisonBias = useParallelStore((s) => s.comparisonBias);
  const mobileActiveFuture = useParallelStore((s) => s.mobileActiveFuture);
  const scenarioParams = useParallelStore((s) => s.scenarioParams);
  const simTimeMinutes = useParallelStore((s) => s.simTimeMinutes);
  const isPlaying = useParallelStore((s) => s.isPlaying);
  const causalStepIndex = useParallelStore((s) => s.causalStepIndex);
  const cutawayMode = useParallelStore((s) => s.cutawayMode);
  const selectedEntity = useParallelStore((s) => s.selectedEntity);
  const isStageExpanded = useParallelStore((s) => s.isStageExpanded);
  const simDrawerOpen = useParallelStore((s) => s.simDrawerOpen);
  const projectedLabels = useParallelStore((s) => s.projectedLabels);
  const world = useParallelStore((s) => s.world);
  const timeline = useParallelStore((s) => s.timeline);

  const setHeroState = useParallelStore((s) => s.setHeroState);
  const setHeroMode = useParallelStore((s) => s.setHeroMode);
  const setInvisibleLayer = useParallelStore((s) => s.setInvisibleLayer);
  const setComparisonBias = useParallelStore((s) => s.setComparisonBias);
  const setMobileActiveFuture = useParallelStore((s) => s.setMobileActiveFuture);
  const setTrafficDemand = useParallelStore((s) => s.setTrafficDemand);
  const setTransitCapacity = useParallelStore((s) => s.setTransitCapacity);
  const setIntervention = useParallelStore((s) => s.setIntervention);
  const setBridgeClosed = useParallelStore((s) => s.setBridgeClosed);
  const setSimTimeMinutes = useParallelStore((s) => s.setSimTimeMinutes);
  const togglePlay = useParallelStore((s) => s.togglePlay);
  const resetSimulation = useParallelStore((s) => s.resetSimulation);
  const setCausalStepIndex = useParallelStore((s) => s.setCausalStepIndex);
  const setCutawayMode = useParallelStore((s) => s.setCutawayMode);
  const setSelectedEntity = useParallelStore((s) => s.setSelectedEntity);
  const setStageExpanded = useParallelStore((s) => s.setStageExpanded);
  const setSimDrawerOpen = useParallelStore((s) => s.setSimDrawerOpen);
  const resetCameraView = useParallelStore((s) => s.resetCameraView);
  const getCurrentSnapshots = useParallelStore((s) => s.getCurrentSnapshots);

  const { snapshotA, snapshotB } = getCurrentSnapshots();
  const activeModeMeta =
    HERO_MODES.find((m) => m.id === heroMode) || HERO_MODES[0];

  // Adaptive navbar theme state (dark over WebGL hero, warm-light over landing page)
  const [isLightNav, setIsLightNav] = useState(false);

  // Interactive states for light landing page sections
  const [activeHowStep, setActiveHowStep] = useState<number>(0);
  const [workflowWebglFailed, setWorkflowWebglFailed] = useState<boolean>(false);
  const [workflowSelectedHubId, setWorkflowSelectedHubId] = useState<string | null>(null);
  const [workflowHoveredHubId, setWorkflowHoveredHubId] = useState<string | null>(null);
  const [workflowLayerFilter, setWorkflowLayerFilter] = useState<
    'all' | 'mobility' | 'energy' | 'logistics'
  >('all');
  const [workflowResetTick, setWorkflowResetTick] = useState<number>(0);
  const [workflowReplayTick, setWorkflowReplayTick] = useState<number>(0);
  const [workflowProjectedHubs, setWorkflowProjectedHubs] = useState<
    Record<string, ProjectedHubCoord>
  >({});

  const activeWorkflowChoreo = computeWorkflowStageChoreography(activeHowStep, {
    focusedHubId: workflowSelectedHubId || workflowHoveredHubId,
  });
  const activeWorkflowHub = WORKFLOW_HUBS.find(
    (h) => h.id === (workflowSelectedHubId || workflowHoveredHubId)
  );

  const [futuresSplitSpread, setFuturesSplitSpread] = useState<number>(1);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState<number>(0);
  const [activeExplainIdx, setActiveExplainIdx] = useState<number>(0);

  // Demo Request Form State
  const [formInput, setFormInput] = useState<DemoRequestInput>({
    fullName: '',
    workEmail: '',
    company: '',
    industry: '',
    modelingGoal: '',
  });
  const [validation, setValidation] = useState<ValidationResult>({
    valid: false,
    errors: {},
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const fullNameInputRef = useRef<HTMLInputElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const landingRootRef = useRef<HTMLDivElement | null>(null);

  // Initialize Lenis smooth scrolling + navbar theme listener + GSAP entrance/scroll animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const onScroll = () => {
      const threshold = Math.max(320, window.innerHeight * 0.72);
      setIsLightNav(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hero entrance choreography
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.hero-entrance-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Manifesto section reveal
      gsap.fromTo(
        '.manifesto-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#manifesto',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.manifesto-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '#manifesto',
            start: 'top 75%',
          },
        }
      );

      // Capabilities cards stagger reveal
      gsap.fromTo(
        '.capability-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#capabilities',
            start: 'top 78%',
          },
        }
      );

      // Parallel Futures section reveal
      gsap.fromTo(
        '.futures-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#parallel-futures',
            start: 'top 78%',
          },
        }
      );
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      window.removeEventListener('scroll', onScroll);
      ctx.revert();
    };
  }, []);

  const handleFieldChange = (field: keyof DemoRequestInput, value: string) => {
    const next = { ...formInput, [field]: value };
    setFormInput(next);
    if (touched[field]) {
      setValidation(validateDemoRequest(next));
    }
  };

  const handleFieldBlur = (field: keyof DemoRequestInput) => {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    setValidation(validateDemoRequest(formInput));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = {
      fullName: true,
      workEmail: true,
      company: true,
      industry: true,
    };
    setTouched(allTouched);
    const res = validateDemoRequest(formInput);
    setValidation(res);
    if (res.valid) {
      setSubmitted(true);
    }
  };

  const handleOpenInteractiveSimulation = (targetMode: HeroMode = 'explore') => {
    setHeroMode(targetMode);
    setHeroState('interactive');
    const heroEl = document.getElementById('hero');
    if (heroEl && window.scrollY > 80) {
      heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCloseInteractiveSimulation = () => {
    setHeroState('cinematic');
  };

  const handleJumpToDemoForm = () => {
    if (isStageExpanded) {
      setStageExpanded(false);
    }
    onScrollToSection('request-demo');
    window.setTimeout(() => {
      fullNameInputRef.current?.focus();
    }, 650);
  };

  const delaySaved = (
    snapshotA.metrics.avgTravelDelayMin - snapshotB.metrics.avgTravelDelayMin
  ).toFixed(1);
  const extraDeliveries =
    snapshotB.metrics.completedDeliveries -
    snapshotA.metrics.completedDeliveries;
  const congestionDeltaPct = Math.round(
    snapshotA.metrics.congestionIndex - snapshotB.metrics.congestionIndex
  );

  const causalStep = CAUSAL_SEQUENCE[causalStepIndex];
  const activeLayerMeta = LAYER_DESCRIPTIONS[invisibleLayer];
  const activeIndustry = INDUSTRY_SOLUTIONS[activeIndustryIdx];
  const activeExplainNode = EXPLAINABILITY_CHAIN[activeExplainIdx];

  return (
    <div className="relative w-full min-h-screen bg-[#101315] text-[#F6F5F1] selection:bg-[#E85D36] selection:text-[#F6F5F1]">
      {/* =====================================================================
          1. ADAPTIVE GLOBAL NAVIGATION BAR (Dark over Hero -> Warm-Light over Page)
         ===================================================================== */}
      <header
        data-testid="global-navbar"
        data-nav-theme={isLightNav && !isStageExpanded ? 'light' : 'dark'}
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300 ${
          isLightNav && !isStageExpanded
            ? 'bg-[#F6F5F1]/92 backdrop-blur-md border-b border-[#171A1C]/10 text-[#171A1C]'
            : 'bg-[#101315]/55 backdrop-blur-md border-b border-[#F6F5F1]/10 text-[#F6F5F1]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-5 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onScrollToSection('hero');
              }}
              className="flex items-center gap-2.5 font-display font-bold tracking-[0.18em] text-sm uppercase focus:outline-none"
            >
              <span className="w-2.5 h-2.5 bg-[#E85D36] inline-block" />
              <span>PARALLEL</span>
            </a>
            <span
              className={`hidden xl:inline-block font-mono text-[11px] tracking-[0.14em] uppercase ${
                isLightNav && !isStageExpanded
                  ? 'text-[#666D70]'
                  : 'text-[#9CA3AF]'
              }`}
            >
              DECISION INTELLIGENCE PLATFORM
            </span>
          </div>

          <nav
            aria-label="Primary Page Sections"
            className="hidden md:flex items-center gap-7 text-xs font-medium tracking-[0.06em]"
          >
            <button
              type="button"
              onClick={() => onScrollToSection('capabilities')}
              className={`transition-colors cursor-pointer ${
                isLightNav && !isStageExpanded
                  ? 'text-[#24282B] hover:text-[#E85D36]'
                  : 'text-[#F6F5F1]/80 hover:text-[#F6F5F1]'
              }`}
            >
              Platform
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('how-it-works')}
              className={`transition-colors cursor-pointer ${
                isLightNav && !isStageExpanded
                  ? 'text-[#24282B] hover:text-[#E85D36]'
                  : 'text-[#F6F5F1]/80 hover:text-[#F6F5F1]'
              }`}
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('solutions')}
              className={`transition-colors cursor-pointer ${
                isLightNav && !isStageExpanded
                  ? 'text-[#24282B] hover:text-[#E85D36]'
                  : 'text-[#F6F5F1]/80 hover:text-[#F6F5F1]'
              }`}
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('manifesto')}
              className={`transition-colors cursor-pointer ${
                isLightNav && !isStageExpanded
                  ? 'text-[#24282B] hover:text-[#E85D36]'
                  : 'text-[#F6F5F1]/80 hover:text-[#F6F5F1]'
              }`}
            >
              About
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {heroState === 'interactive' && !isLightNav && (
              <button
                type="button"
                onClick={handleCloseInteractiveSimulation}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-[#F6F5F1]/25 text-[#F6F5F1] hover:border-[#E85D36] hover:text-[#E85D36] transition-colors cursor-pointer"
              >
                <span>× Close simulation</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleJumpToDemoForm}
              className={`px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase transition-colors cursor-pointer ${
                isLightNav && !isStageExpanded
                  ? 'bg-[#171A1C] text-[#F6F5F1] hover:bg-[#E85D36]'
                  : 'bg-[#F6F5F1] text-[#101315] hover:bg-[#E85D36] hover:text-[#F6F5F1]'
              }`}
            >
              Request demo
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. ENVIRONMENT A — FULL-BLEED CINEMATIC DARK WEBGL HERO (#hero)
         ===================================================================== */}
      <section
        id="hero"
        data-testid="hero-section"
        className={
          isStageExpanded
            ? 'fixed inset-0 z-50 w-screen h-screen bg-[#101315] overflow-hidden'
            : 'relative w-full min-h-[700px] h-screen bg-[#101315] overflow-hidden'
        }
      >
        {/* Full-bleed edge-to-edge 3D procedural city canvas */}
        <div
          id="hero-stage-container"
          data-testid="webgl-stage-container"
          className="absolute inset-0 w-full h-full z-0"
        >
          {webglFailed ? (
            <WebGLFallbackView />
          ) : (
            <ParallelWorldCanvas onWebGLFailure={onWebGLFailure} />
          )}
        </div>

        {/* Subtle atmospheric lighting gradients to protect typography contrast without hiding the 3D city */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 ${
            heroState === 'cinematic' ? 'opacity-100' : 'opacity-50'
          }`}
          style={{
            background:
              'radial-gradient(circle at 50% 44%, rgba(16,19,21,0.38) 0%, rgba(16,19,21,0.58) 55%, rgba(16,19,21,0.82) 100%)',
          }}
        />

        {/* -------------------------------------------------------------------
            HERO STATE 1: DEFAULT CINEMATIC MARKETING OVERLAY
           ------------------------------------------------------------------- */}
        <div
          ref={heroOverlayRef}
          data-testid="hero-cinematic-overlay"
          aria-hidden={heroState !== 'cinematic'}
          className={`relative z-20 w-full h-full flex flex-col justify-between pt-24 pb-8 px-6 lg:px-12 pointer-events-none transition-all duration-500 ${
            heroState === 'cinematic'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-6 pointer-events-none'
          }`}
        >
          {/* Top spacer for layout balance */}
          <div className="hidden sm:flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-[#F6F5F1]/65">
            <span>MERIDIAN METROPOLITAN DIGITAL TWIN</span>
            <span>LIVE SPATIAL ENGINE</span>
          </div>

          {/* Center Monumental Typography & Dual CTAs */}
          <div className="my-auto max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="hero-entrance-item inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-5 bg-[#101315]/70 backdrop-blur-md border border-[#F6F5F1]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D36]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#F6F5F1]">
                AI DECISION INTELLIGENCE
              </span>
            </div>

            <h1 className="hero-entrance-item font-display font-bold text-4xl sm:text-6xl lg:text-[74px] text-[#F6F5F1] tracking-[-0.035em] leading-[0.98] mb-5 drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
              See what happens next.
            </h1>

            <p className="hero-entrance-item text-base sm:text-lg lg:text-xl text-[#F6F5F1]/85 max-w-xl leading-relaxed mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              One world. Countless possibilities. Better-informed decisions.
            </p>

            <div className="hero-entrance-item flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
              <button
                type="button"
                data-testid="hero-explore-cta"
                onClick={() => handleOpenInteractiveSimulation('explore')}
                className="px-6 py-3.5 bg-[#E85D36] hover:bg-[#ff6b42] text-[#F6F5F1] font-display font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all cursor-pointer shadow-[0_12px_32px_rgba(232,93,54,0.35)]"
              >
                Explore simulation
              </button>
              <button
                type="button"
                data-testid="hero-demo-cta"
                onClick={handleJumpToDemoForm}
                className="px-6 py-3.5 bg-[#101315]/75 hover:bg-[#F6F5F1]/15 text-[#F6F5F1] border border-[#F6F5F1]/30 hover:border-[#F6F5F1] backdrop-blur-md font-display font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] transition-all cursor-pointer"
              >
                Request a demo
              </button>
            </div>
          </div>

          {/* Bottom Edge Metadata & Scroll Cue */}
          <div className="flex items-end justify-between gap-4 pt-4 border-t border-[#F6F5F1]/12">
            <div className="flex items-center gap-4 pointer-events-auto">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#F6F5F1]/80">
                MODEL 001 / URBAN SYSTEM
              </span>
              <span className="hidden md:inline-block font-mono text-[11px] text-[#9CA3AF]">
                · 6 DISTRICTS · 215 BUILDINGS · 3 INFRASTRUCTURE LAYERS
              </span>
            </div>

            <button
              type="button"
              onClick={() => onScrollToSection('manifesto')}
              className="pointer-events-auto inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#F6F5F1]/85 hover:text-[#E85D36] transition-colors cursor-pointer"
            >
              <span>SCROLL TO DISCOVER</span>
              <span className="inline-block animate-bounce text-[#E85D36]">↓</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            HERO STATE 2: FULL-BLEED INTERACTIVE SIMULATION WORKSPACE TAKEOVER
           ------------------------------------------------------------------- */}
        <div
          data-testid="hero-interactive-workspace"
          aria-hidden={heroState !== 'interactive'}
          className={`absolute inset-0 z-30 pointer-events-none transition-all duration-500 ${
            heroState === 'interactive'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none invisible'
          }`}
        >
          {/* Top-Left Mode Status & Top-Right Close / View Controls */}
          <div className="absolute top-20 left-4 right-4 lg:left-8 lg:right-8 flex items-start justify-between gap-3 pointer-events-none">
            <div className="pointer-events-auto bg-[#101315]/88 backdrop-blur-md border border-[#F6F5F1]/15 px-3.5 py-2.5 max-w-md">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#E85D36]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E85D36]">
                  MODE {activeModeMeta.num} // {activeModeMeta.label.toUpperCase()} —{' '}
                  {activeModeMeta.chapterTitle.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#F6F5F1]/85 leading-snug">
                {activeModeMeta.summary}
              </p>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={resetCameraView}
                className="px-3 py-2 bg-[#101315]/85 backdrop-blur-md border border-[#F6F5F1]/18 hover:border-[#F6F5F1]/45 text-[11px] font-mono uppercase tracking-[0.12em] text-[#F6F5F1] transition-colors cursor-pointer"
              >
                Reset View
              </button>
              <button
                type="button"
                onClick={() => setStageExpanded(!isStageExpanded)}
                className="hidden sm:inline-flex px-3 py-2 bg-[#101315]/85 backdrop-blur-md border border-[#F6F5F1]/18 hover:border-[#E85D36] text-[11px] font-mono uppercase tracking-[0.12em] text-[#F6F5F1] transition-colors cursor-pointer"
              >
                {isStageExpanded ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
              <button
                type="button"
                data-testid="close-simulation-btn"
                onClick={handleCloseInteractiveSimulation}
                className="px-3.5 py-2 bg-[#E85D36] hover:bg-[#ff6b42] text-[#F6F5F1] text-[11px] font-mono font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
              >
                × Close simulation
              </button>
            </div>
          </div>

          {/* MODE 01: EXPLORE — Restrained instruction & quick district jump bar */}
          {heroMode === 'explore' && (
            <div
              data-testid="mode-explore-overlay"
              className="absolute bottom-24 left-4 right-4 lg:left-8 lg:right-8 flex flex-wrap items-center justify-between gap-2 pointer-events-none"
            >
              <div className="pointer-events-auto bg-[#101315]/85 backdrop-blur-md border border-[#F6F5F1]/15 px-3.5 py-2 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D8A61]" />
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#F6F5F1]">
                  Drag to explore · Select a district
                </span>
              </div>

              <div className="pointer-events-auto hidden sm:flex flex-wrap items-center gap-1.5 bg-[#101315]/85 backdrop-blur-md border border-[#F6F5F1]/15 p-1.5">
                {world.districts
                  .filter((d) => d.id !== 'central_park')
                  .map((dist) => {
                    const isSelected = selectedEntity?.id === dist.id;
                    return (
                      <button
                        key={dist.id}
                        type="button"
                        onClick={() =>
                          setSelectedEntity({
                            type: 'district',
                            id: dist.id,
                            title: dist.name,
                            subtitle: dist.code,
                            detail: dist.purpose,
                            metric: `Baseline Load: ${dist.baselineDemandMw} MW`,
                            worldPos: {
                              x: dist.center.x,
                              y: 1.5,
                              z: dist.center.z,
                            },
                          })
                        }
                        className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#E85D36] text-[#F6F5F1]'
                            : 'text-[#9CA3AF] hover:text-[#F6F5F1] hover:bg-[#F6F5F1]/10'
                        }`}
                      >
                        {dist.name.split(' ')[0]}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* MODE 02: SYSTEMS — Infrastructure Layer Switcher & Dedicated Panel */}
          {heroMode === 'systems' && (
            <div
              data-testid="mode-systems-overlay"
              className="absolute top-36 right-4 lg:right-8 w-[calc(100%-2rem)] sm:w-80 pointer-events-auto bg-[#101315]/90 backdrop-blur-md border border-[#F6F5F1]/18 p-4"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#9CA3AF] mb-2">
                SELECT INFRASTRUCTURE LAYER
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3.5">
                {(['mobility', 'energy', 'logistics'] as InfrastructureLayerId[]).map(
                  (layerId) => {
                    const active = invisibleLayer === layerId;
                    return (
                      <button
                        key={layerId}
                        type="button"
                        data-testid={`layer-btn-${layerId}`}
                        onClick={() => setInvisibleLayer(layerId)}
                        className={`py-2 px-2 text-[11px] font-mono uppercase tracking-[0.1em] border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#E85D36] text-[#F6F5F1] border-[#E85D36] font-semibold'
                            : 'bg-[#171A1C]/90 text-[#9CA3AF] border-[#F6F5F1]/15 hover:text-[#F6F5F1]'
                        }`}
                      >
                        {layerId}
                      </button>
                    );
                  }
                )}
              </div>

              <div className="border-t border-[#F6F5F1]/12 pt-3">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1"
                  style={{ color: activeLayerMeta.color }}
                >
                  {activeLayerMeta.code}
                </div>
                <h2 className="font-display font-semibold text-sm text-[#F6F5F1] mb-1">
                  {activeLayerMeta.title}
                </h2>
                <div className="font-mono text-[11px] text-[#F6F5F1]/80 mb-2">
                  {activeLayerMeta.metricLabel}
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed mb-2.5">
                  {activeLayerMeta.summary}
                </p>
                <ul className="space-y-1.5 border-t border-[#F6F5F1]/10 pt-2">
                  {activeLayerMeta.bulletPoints.map((pt, i) => (
                    <li
                      key={i}
                      className="text-[11px] text-[#F6F5F1]/85 leading-snug flex items-start gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: activeLayerMeta.color }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* MODE 02: Projected 3D Infrastructure Node Badges */}
          {heroMode === 'systems' &&
            world.infrastructure
              .filter((inf) => inf.layer === invisibleLayer)
              .map((inf) => {
                const proj = projectedLabels[inf.id];
                if (!proj || !proj.visible) return null;
                return (
                  <button
                    key={inf.id}
                    type="button"
                    onClick={() =>
                      setSelectedEntity({
                        type: 'infrastructure',
                        id: inf.id,
                        title: inf.name,
                        subtitle: `${inf.layer.toUpperCase()} NODE · ${inf.capacityLabel}`,
                        detail: inf.dependencySummary,
                        metric: `Connected: ${inf.connectedNodeIds.join(', ')}`,
                        worldPos: { x: inf.x, y: 4.5, z: inf.z },
                      })
                    }
                    style={{
                      transform: `translate3d(${proj.x}px, ${proj.y}px, 0)`,
                    }}
                    className="pointer-events-auto absolute top-0 left-0 -translate-x-1/2 -translate-y-full px-2.5 py-1 bg-[#101315]/90 border border-[#F6F5F1]/25 hover:border-[#E85D36] text-left transition-colors cursor-pointer hidden sm:block"
                  >
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#E85D36]">
                      {inf.id}
                    </div>
                    <div className="text-[11px] font-medium text-[#F6F5F1] whitespace-nowrap">
                      {inf.name}
                    </div>
                  </button>
                );
              })}

          {/* MODE 03: DISRUPT — Bridge Closure & Reality-Splitting Overview */}
          {heroMode === 'disrupt' && (
            <div
              data-testid="mode-disrupt-overlay"
              className="absolute inset-x-4 bottom-24 lg:inset-x-8 flex flex-col gap-3 pointer-events-none"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3">
                {/* Left Label: Baseline */}
                <div className="pointer-events-auto bg-[#101315]/90 backdrop-blur-md border-l-2 border-[#D94E3E] border-y border-r border-[#F6F5F1]/15 px-4 py-3 sm:max-w-xs">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#D94E3E] font-semibold">
                      Baseline
                    </span>
                    <span className="font-mono text-[11px] text-[#F6F5F1]">
                      {snapshotA.metrics.avgTravelDelayMin}m delay
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-snug">
                    Unmitigated Meridian Bridge closure: severe queue spillback across CBD & Harbor corridors.
                  </p>
                </div>

                {/* Center Minimal Context */}
                <div className="pointer-events-auto bg-[#101315]/90 backdrop-blur-md border border-[#F6F5F1]/18 px-4 py-3 text-center self-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E85D36] mb-1">
                    07:30 ARTERIAL FRACTURE
                  </div>
                  <div className="font-display font-semibold text-sm text-[#F6F5F1] mb-2">
                    One disruption. Two possible futures.
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setComparisonBias(-0.75)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase border cursor-pointer ${
                        comparisonBias < -0.2
                          ? 'bg-[#D94E3E] text-[#F6F5F1] border-[#D94E3E]'
                          : 'border-[#F6F5F1]/15 text-[#9CA3AF] hover:text-[#F6F5F1]'
                      }`}
                    >
                      Focus Baseline
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonBias(0)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase border cursor-pointer ${
                        Math.abs(comparisonBias) <= 0.2
                          ? 'bg-[#F6F5F1] text-[#101315] border-[#F6F5F1]'
                          : 'border-[#F6F5F1]/15 text-[#9CA3AF] hover:text-[#F6F5F1]'
                      }`}
                    >
                      Split View
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonBias(0.75)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase border cursor-pointer ${
                        comparisonBias > 0.2
                          ? 'bg-[#E85D36] text-[#F6F5F1] border-[#E85D36]'
                          : 'border-[#F6F5F1]/15 text-[#9CA3AF] hover:text-[#F6F5F1]'
                      }`}
                    >
                      Focus Intervention
                    </button>
                  </div>
                </div>

                {/* Right Label: Intervention */}
                <div className="pointer-events-auto bg-[#101315]/90 backdrop-blur-md border-l-2 border-[#2D8A61] border-y border-r border-[#F6F5F1]/15 px-4 py-3 sm:max-w-xs">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#2D8A61] font-semibold">
                      Intervention
                    </span>
                    <span className="font-mono text-[11px] text-[#F6F5F1]">
                      {snapshotB.metrics.avgTravelDelayMin}m delay (-{delaySaved}m)
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-snug">
                    Coordinated rerouting & transit boost stabilize cross-river throughput.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MODE 04: SIMULATE — Compact Collapsible Side Panel & Live Metrics */}
          {heroMode === 'simulate' && (
            <>
              {/* Top-Center Dual Future Live Comparison Strip */}
              <div className="hidden xl:flex absolute top-20 left-1/2 -translate-x-1/2 items-center gap-4 bg-[#101315]/90 backdrop-blur-md border border-[#F6F5F1]/15 px-4 py-2 pointer-events-auto">
                <div className="flex items-center gap-2 border-r border-[#F6F5F1]/12 pr-4">
                  <span className="w-2 h-2 rounded-full bg-[#D94E3E]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                    Baseline:
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#F6F5F1]">
                    {snapshotA.metrics.avgTravelDelayMin}m
                  </span>
                </div>
                <div className="flex items-center gap-2 border-r border-[#F6F5F1]/12 pr-4">
                  <span className="w-2 h-2 rounded-full bg-[#2D8A61]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                    Intervention:
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#2D8A61]">
                    {snapshotB.metrics.avgTravelDelayMin}m
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9CA3AF]">
                  Illustrative simulation
                </span>
              </div>

              {/* Compact Collapsible Simulation Control Drawer (Right Side) */}
              <div
                data-testid="mode-simulate-panel"
                className="absolute top-36 right-4 lg:right-8 w-[calc(100%-2rem)] sm:w-84 pointer-events-auto bg-[#101315]/92 backdrop-blur-md border border-[#F6F5F1]/18"
              >
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F6F5F1]/12">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E85D36] font-semibold">
                      SIMULATION CONTROLS
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-[#F6F5F1]/10 text-[#9CA3AF]">
                      Illustrative simulation
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSimDrawerOpen(!simDrawerOpen)}
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9CA3AF] hover:text-[#F6F5F1] cursor-pointer"
                  >
                    {simDrawerOpen ? 'Minimize' : 'Expand'}
                  </button>
                </div>

                {simDrawerOpen && (
                  <div className="p-4 space-y-3.5 max-h-[calc(100vh-290px)] overflow-y-auto">
                    {/* Mobile Future A / B Focus Switcher */}
                    <div className="flex sm:hidden items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setMobileActiveFuture('A')}
                        className={`flex-1 py-1.5 text-[10px] font-mono uppercase border ${
                          mobileActiveFuture === 'A'
                            ? 'bg-[#D94E3E] text-[#F6F5F1] border-[#D94E3E]'
                            : 'border-[#F6F5F1]/15 text-[#9CA3AF]'
                        }`}
                      >
                        Baseline (A)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileActiveFuture('B')}
                        className={`flex-1 py-1.5 text-[10px] font-mono uppercase border ${
                          mobileActiveFuture === 'B'
                            ? 'bg-[#2D8A61] text-[#F6F5F1] border-[#2D8A61]'
                            : 'border-[#F6F5F1]/15 text-[#9CA3AF]'
                        }`}
                      >
                        Intervention (B)
                      </button>
                    </div>

                    {/* 1. Intervention Selector */}
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.12em] text-[#9CA3AF] mb-1.5">
                        <span>Intervention Policy</span>
                        <button
                          type="button"
                          onClick={() =>
                            setBridgeClosed(!scenarioParams.bridgeClosed)
                          }
                          className={`px-1.5 py-0.5 text-[9px] border cursor-pointer ${
                            scenarioParams.bridgeClosed
                              ? 'border-[#D94E3E]/60 text-[#D94E3E]'
                              : 'border-[#2D8A61]/60 text-[#2D8A61]'
                          }`}
                        >
                          {scenarioParams.bridgeClosed
                            ? 'Bridge: Closed'
                            : 'Bridge: Open'}
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {(
                          [
                            { id: 'reroute_vehicles', label: 'Reroute' },
                            { id: 'increase_transit', label: '+Transit' },
                            { id: 'coordinate_deliveries', label: 'Logistics' },
                          ] as { id: InterventionStrategy; label: string }[]
                        ).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            data-testid={`intervention-btn-${item.id}`}
                            onClick={() => setIntervention(item.id)}
                            className={`py-1.5 px-1.5 text-[10px] font-mono uppercase tracking-[0.08em] border transition-colors cursor-pointer ${
                              scenarioParams.intervention === item.id
                                ? 'bg-[#E85D36] text-[#F6F5F1] border-[#E85D36] font-semibold'
                                : 'bg-[#171A1C] text-[#9CA3AF] border-[#F6F5F1]/15 hover:text-[#F6F5F1]'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Traffic Demand Slider */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono mb-1">
                        <label
                          htmlFor="sim-demand-slider"
                          className="text-[#9CA3AF] uppercase tracking-[0.1em]"
                        >
                          Traffic demand
                        </label>
                        <span className="text-[#F6F5F1] font-semibold">
                          {scenarioParams.trafficDemandPct}%
                        </span>
                      </div>
                      <input
                        id="sim-demand-slider"
                        data-testid="traffic-demand-slider"
                        type="range"
                        min={60}
                        max={160}
                        step={5}
                        value={scenarioParams.trafficDemandPct}
                        onChange={(e) =>
                          setTrafficDemand(Number(e.target.value))
                        }
                        className="w-full par-slider"
                      />
                    </div>

                    {/* 3. Transit Capacity Slider */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono mb-1">
                        <label
                          htmlFor="sim-transit-slider"
                          className="text-[#9CA3AF] uppercase tracking-[0.1em]"
                        >
                          Transit capacity
                        </label>
                        <span className="text-[#F6F5F1] font-semibold">
                          {scenarioParams.transitCapacityPct}%
                        </span>
                      </div>
                      <input
                        id="sim-transit-slider"
                        data-testid="transit-capacity-slider"
                        type="range"
                        min={50}
                        max={150}
                        step={5}
                        value={scenarioParams.transitCapacityPct}
                        onChange={(e) =>
                          setTransitCapacity(Number(e.target.value))
                        }
                        className="w-full par-slider"
                      />
                    </div>

                    {/* 4. Simulated Time Control + Play/Pause + Reset */}
                    <div className="pt-2 border-t border-[#F6F5F1]/12">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            data-testid="sim-play-toggle"
                            onClick={togglePlay}
                            className="px-2.5 py-1 bg-[#F6F5F1] text-[#101315] hover:bg-[#E85D36] hover:text-[#F6F5F1] font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer"
                          >
                            {isPlaying ? 'Pause' : 'Play'}
                          </button>
                          <button
                            type="button"
                            data-testid="sim-reset-btn"
                            onClick={resetSimulation}
                            className="px-2 py-1 border border-[#F6F5F1]/20 text-[#9CA3AF] hover:text-[#F6F5F1] font-mono text-[10px] uppercase tracking-[0.1em] transition-colors cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                        <span
                          data-testid="sim-clock-readout"
                          className="font-mono text-xs font-semibold text-[#E85D36]"
                        >
                          {formatMinutesToClock(simTimeMinutes)}
                        </span>
                      </div>
                      <input
                        aria-label="Simulated time control"
                        data-testid="sim-time-slider"
                        type="range"
                        min={360}
                        max={1320}
                        step={15}
                        value={simTimeMinutes}
                        onChange={(e) =>
                          setSimTimeMinutes(Number(e.target.value))
                        }
                        className="w-full par-slider"
                      />
                    </div>

                    {/* 5. Live Simulation Readouts (Baseline vs Intervention) */}
                    <div className="pt-2.5 border-t border-[#F6F5F1]/12 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-[#171A1C]/90 p-2 border border-[#F6F5F1]/10">
                        <div className="font-mono text-[9px] uppercase text-[#9CA3AF] mb-0.5">
                          Avg Delay
                        </div>
                        <div
                          data-testid="metric-delay-value"
                          className="font-mono text-xs font-semibold text-[#F6F5F1]"
                        >
                          {snapshotB.metrics.avgTravelDelayMin}m
                        </div>
                        <div className="font-mono text-[9px] text-[#2D8A61]">
                          -{delaySaved}m vs A
                        </div>
                      </div>

                      <div className="bg-[#171A1C]/90 p-2 border border-[#F6F5F1]/10">
                        <div className="font-mono text-[9px] uppercase text-[#9CA3AF] mb-0.5">
                          Congestion
                        </div>
                        <div
                          data-testid="metric-congestion-value"
                          className="font-mono text-xs font-semibold text-[#F6F5F1]"
                        >
                          {snapshotB.metrics.congestionIndex}%
                        </div>
                        <div className="font-mono text-[9px] text-[#2D8A61]">
                          -{congestionDeltaPct}% vs A
                        </div>
                      </div>

                      <div className="bg-[#171A1C]/90 p-2 border border-[#F6F5F1]/10">
                        <div className="font-mono text-[9px] uppercase text-[#9CA3AF] mb-0.5">
                          Deliveries
                        </div>
                        <div
                          data-testid="metric-deliveries-value"
                          className="font-mono text-xs font-semibold text-[#F6F5F1]"
                        >
                          {snapshotB.metrics.completedDeliveries}
                        </div>
                        <div className="font-mono text-[9px] text-[#2D8A61]">
                          +{extraDeliveries} vs A
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* MODE 05: EXPLAIN — Causal Chain Sequence Stepper */}
          {heroMode === 'explain' && (
            <div
              data-testid="mode-explain-overlay"
              className="absolute top-36 right-4 lg:right-8 w-[calc(100%-2rem)] sm:w-96 pointer-events-auto bg-[#101315]/92 backdrop-blur-md border border-[#F6F5F1]/18 p-4"
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E85D36] font-semibold">
                  CAUSAL EXPLANATION SEQUENCE
                </span>
                <button
                  type="button"
                  onClick={() => setCutawayMode(!cutawayMode)}
                  className={`px-2 py-0.5 text-[10px] font-mono uppercase border cursor-pointer ${
                    cutawayMode
                      ? 'bg-[#E85D36] text-[#F6F5F1] border-[#E85D36]'
                      : 'border-[#F6F5F1]/20 text-[#9CA3AF] hover:text-[#F6F5F1]'
                  }`}
                >
                  {cutawayMode ? 'Cutaway: ON' : 'Exploded Cutaway'}
                </button>
              </div>

              {/* 5-step breadcrumb chain */}
              <div className="flex flex-wrap items-center gap-1 mb-3">
                {CAUSAL_SEQUENCE.map((step, idx) => {
                  const active = idx === causalStepIndex;
                  return (
                    <React.Fragment key={step.index}>
                      <button
                        type="button"
                        data-testid={`causal-step-btn-${idx}`}
                        onClick={() => setCausalStepIndex(idx)}
                        className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#E85D36] text-[#F6F5F1] font-semibold'
                            : 'bg-[#171A1C] text-[#9CA3AF] hover:text-[#F6F5F1]'
                        }`}
                      >
                        {step.title}
                      </button>
                      {idx < CAUSAL_SEQUENCE.length - 1 && (
                        <span className="text-[#9CA3AF] text-[10px]">→</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="border-t border-[#F6F5F1]/12 pt-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#E85D36] mb-0.5">
                  {causalStep.shortLabel} · {causalStep.locationLabel}
                </div>
                <p className="text-xs text-[#F6F5F1]/90 leading-relaxed mb-3">
                  {causalStep.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setCausalStepIndex(Math.max(0, causalStepIndex - 1))
                    }
                    disabled={causalStepIndex === 0}
                    className="px-3 py-1 text-[10px] font-mono uppercase border border-[#F6F5F1]/20 text-[#F6F5F1] disabled:opacity-35 cursor-pointer"
                  >
                    ← Prev Step
                  </button>
                  <span className="font-mono text-[10px] text-[#9CA3AF]">
                    Step {causalStepIndex + 1} of {CAUSAL_SEQUENCE.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCausalStepIndex(
                        Math.min(
                          CAUSAL_SEQUENCE.length - 1,
                          causalStepIndex + 1
                        )
                      )
                    }
                    disabled={causalStepIndex === CAUSAL_SEQUENCE.length - 1}
                    className="px-3 py-1 text-[10px] font-mono uppercase border border-[#F6F5F1]/20 text-[#F6F5F1] disabled:opacity-35 cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 05: Anchored 3D Causal Callout Pin */}
          {heroMode === 'explain' &&
            projectedLabels.causal_active &&
            projectedLabels.causal_active.visible && (
              <div
                style={{
                  transform: `translate3d(${projectedLabels.causal_active.x}px, ${projectedLabels.causal_active.y}px, 0)`,
                }}
                className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-full hidden md:block bg-[#101315]/92 border border-[#E85D36] px-3 py-1.5"
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#E85D36]">
                  {causalStep.shortLabel}
                </div>
                <div className="text-xs font-medium text-[#F6F5F1] whitespace-nowrap">
                  {causalStep.locationLabel}
                </div>
              </div>
            )}

          {/* MODE 06: OUTCOME — Consolidated Scenario Summary & Demo Action */}
          {heroMode === 'outcome' && (
            <div
              data-testid="mode-outcome-overlay"
              className="absolute top-36 right-4 lg:right-8 w-[calc(100%-2rem)] sm:w-96 pointer-events-auto bg-[#101315]/92 backdrop-blur-md border border-[#F6F5F1]/18 p-5"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#2D8A61] mb-1.5">
                MODE 06 // CONSOLIDATED SCENARIO OUTCOME
              </div>
              <h2 className="font-display font-bold text-lg text-[#F6F5F1] leading-snug mb-1.5">
                Every decision creates a different future.
              </h2>
              <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                Explore the possibilities. Understand the trade-offs. Decide with clarity.
              </p>

              <div className="grid grid-cols-3 gap-2 mb-4 bg-[#171A1C] p-3 border border-[#F6F5F1]/10">
                <div>
                  <div className="font-mono text-[9px] uppercase text-[#9CA3AF]">
                    Delay Saved
                  </div>
                  <div className="font-mono text-sm font-semibold text-[#2D8A61]">
                    -{delaySaved} min
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase text-[#9CA3AF]">
                    Congestion
                  </div>
                  <div className="font-mono text-sm font-semibold text-[#2D8A61]">
                    -{congestionDeltaPct}%
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase text-[#9CA3AF]">
                    Deliveries
                  </div>
                  <div className="font-mono text-sm font-semibold text-[#F6F5F1]">
                    +{extraDeliveries}
                  </div>
                </div>
              </div>

              <button
                type="button"
                data-testid="outcome-request-demo-btn"
                onClick={handleJumpToDemoForm}
                className="w-full py-3 bg-[#E85D36] hover:bg-[#ff6b42] text-[#F6F5F1] font-display font-semibold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
              >
                Request a demo
              </button>
            </div>
          )}

          {/* Selected 3D Entity Inspection Card (Bottom-Left inside Interactive Stage) */}
          {selectedEntity && (
            <div
              data-testid="selected-entity-card"
              className="absolute bottom-24 left-4 lg:left-8 w-76 pointer-events-auto bg-[#101315]/92 backdrop-blur-md border border-[#E85D36]/60 p-3.5"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#E85D36]">
                    {selectedEntity.subtitle}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-[#F6F5F1]">
                    {selectedEntity.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEntity(null)}
                  className="text-xs font-mono text-[#9CA3AF] hover:text-[#F6F5F1] px-1 cursor-pointer"
                >
                  ×
                </button>
              </div>
              <p className="text-[11px] text-[#9CA3AF] leading-snug mb-2">
                {selectedEntity.detail}
              </p>
              <div className="font-mono text-[10px] text-[#F6F5F1] pt-1.5 border-t border-[#F6F5F1]/10">
                {selectedEntity.metric}
              </div>
            </div>
          )}

          {/* Bottom 6-Mode Selector Dock inside Interactive Hero */}
          <div
            data-testid="hero-mode-dock"
            role="tablist"
            aria-label="Simulation Modes"
            className="absolute bottom-4 left-4 right-4 lg:left-8 lg:right-8 z-30 pointer-events-auto bg-[#101315]/92 backdrop-blur-md border border-[#F6F5F1]/18 p-1.5 grid grid-cols-3 sm:grid-cols-6 gap-1"
          >
            {HERO_MODES.map((m) => {
              const active = heroMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-testid={`hero-mode-tab-${m.id}`}
                  onClick={() => setHeroMode(m.id)}
                  className={`px-2.5 py-2 text-left transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#E85D36] text-[#F6F5F1] border-[#E85D36]'
                      : 'bg-[#171A1C]/75 text-[#9CA3AF] border-transparent hover:text-[#F6F5F1] hover:border-[#F6F5F1]/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`font-mono text-[10px] tracking-[0.14em] ${
                        active ? 'text-[#F6F5F1]' : 'text-[#E85D36]'
                      }`}
                    >
                      {m.num}
                    </span>
                    <span className="font-display font-semibold text-xs tracking-tight">
                      {m.label}
                    </span>
                  </div>
                  <div
                    className={`hidden lg:block text-[10px] truncate mt-0.5 ${
                      active ? 'text-[#F6F5F1]/90' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {m.chapterTitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. THE WARM-WHITE CURTAIN REVEAL & ENVIRONMENT B (LIGHT SAAS LANDING PAGE)
             Primary Background: #F6F5F1 | Secondary Surface: #E8E8E3
             Dark Graphite: #171A1C | Body Text: #24282B | Accent: #E85D36
         ===================================================================== */}
      <div
        ref={landingRootRef}
        data-testid="light-landing-curtain"
        className="relative z-20 w-full bg-[#F6F5F1] text-[#171A1C] shadow-[0_-32px_80px_rgba(16,19,21,0.5)]"
      >
        {/* Top architectural curtain hairline & index */}
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 pt-5 pb-3 border-b border-[#171A1C]/12 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-[#666D70]">
          <span>PARALLEL // ARCHITECTURAL DECISION INTELLIGENCE</span>
          <span>SYSTEM BRIEF 01 — 07</span>
        </div>

        {/* -------------------------------------------------------------------
            SECTION 01 — THE MANIFESTO (#manifesto)
           ------------------------------------------------------------------- */}
        <section
          id="manifesto"
          data-testid="section-manifesto"
          className="py-24 lg:py-36 border-b border-[#171A1C]/12"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="max-w-4xl">
              <div className="manifesto-reveal font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-5">
                THE PARALLEL PERSPECTIVE
              </div>

              <h2 className="manifesto-reveal font-display font-bold text-3xl sm:text-5xl lg:text-[62px] text-[#171A1C] tracking-[-0.03em] leading-[1.04] mb-8">
                Complexity is inevitable. Uncertainty doesn&apos;t have to be.
              </h2>

              <div
                aria-hidden="true"
                className="manifesto-rule origin-left h-[2px] w-full max-w-2xl bg-[#E85D36] mb-8"
              />

              <p className="manifesto-reveal text-lg sm:text-xl lg:text-2xl text-[#24282B] leading-relaxed max-w-3xl">
                Every decision travels through a network of consequences. PARALLEL makes those relationships visible, helping organizations explore possibilities before committing to a path.
              </p>
            </div>

            {/* Architectural Quantitative Pillars */}
            <div className="mt-16 pt-10 border-t border-[#171A1C]/12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#666D70] mb-2">
                  01 / CONNECTED TOPOLOGY
                </div>
                <div className="font-display font-bold text-3xl text-[#171A1C] mb-1">
                  3 Coupled Layers
                </div>
                <p className="text-sm text-[#666D70] leading-relaxed">
                  Mobility, energy, and logistics modeled together instead of isolated departmental silos.
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#666D70] mb-2">
                  02 / DETERMINISTIC HORIZON
                </div>
                <div className="font-display font-bold text-3xl text-[#171A1C] mb-1">
                  16-Hour Window
                </div>
                <p className="text-sm text-[#666D70] leading-relaxed">
                  Reproducible BPR impedance and shortest-path propagation from 06:00 through 22:00.
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#666D70] mb-2">
                  03 / CAUSAL TRACEABILITY
                </div>
                <div className="font-display font-bold text-3xl text-[#171A1C] mb-1">
                  100% Explainable
                </div>
                <p className="text-sm text-[#666D70] leading-relaxed">
                  Every projected delay or throughput gain traces directly to underlying network nodes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 02 — HOW PARALLEL WORKS (#how-it-works)
            "UNDERSTAND. SIMULATE. DECIDE." — Interactive 3D Architectural Scale Model
           ------------------------------------------------------------------- */}
        <section
          id="how-it-works"
          data-testid="section-how-it-works"
          className="py-24 lg:py-32 border-b border-[#171A1C]/12"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-3">
                  02 // SYSTEM WORKFLOW
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#171A1C] tracking-[-0.03em] leading-[1.05]">
                  UNDERSTAND. SIMULATE. DECIDE.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#666D70] max-w-md">
                A structured three-stage workflow that turns raw infrastructure topology into actionable operational decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column (~58% width): Interactive 3D Architectural Scale Model */}
              <div className="lg:col-span-7 lg:sticky lg:top-24 bg-[#E8E8E3] border border-[#171A1C]/15 p-4 sm:p-6">
                {/* Top Architectural Stage Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#171A1C]/12">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E85D36]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#171A1C] font-semibold">
                      STAGE {HOW_IT_WORKS_STEPS[activeHowStep].num} //{' '}
                      {HOW_IT_WORKS_STEPS[activeHowStep].stage.toUpperCase()}
                    </span>
                    <span className="hidden sm:inline-block font-mono text-[11px] text-[#666D70]">
                      — {HOW_IT_WORKS_STEPS[activeHowStep].headline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeHowStep === 0 && (
                      <button
                        type="button"
                        data-testid="workflow-replay-assembly-btn"
                        onClick={() => setWorkflowReplayTick((t) => t + 1)}
                        className="px-2.5 py-1 bg-[#F6F5F1] hover:bg-[#171A1C] text-[#171A1C] hover:text-[#F6F5F1] border border-[#171A1C]/18 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E85D36]"
                      >
                        Replay Assembly
                      </button>
                    )}
                    <button
                      type="button"
                      data-testid="workflow-reset-view-btn"
                      onClick={() => {
                        setWorkflowSelectedHubId(null);
                        setWorkflowHoveredHubId(null);
                        setWorkflowResetTick((t) => t + 1);
                      }}
                      className="px-2.5 py-1 bg-[#F6F5F1] hover:bg-[#171A1C] text-[#171A1C] hover:text-[#F6F5F1] border border-[#171A1C]/18 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E85D36]"
                    >
                      Reset View
                    </button>
                  </div>
                </div>

                {/* Interactive 3D Viewport Stage (with 2D SVG Fallback if WebGL unavailable) */}
                <div
                  data-testid="workflow-3d-viewport"
                  className="relative w-full aspect-[16/11] min-h-[340px] sm:min-h-[420px] bg-[#EFECE6] border border-[#171A1C]/14 overflow-hidden"
                >
                  {!(webglFailed || workflowWebglFailed) ? (
                    <>
                      <DeferredScene>
                      <WorkflowTwinCanvas
                        activeStage={activeHowStep as WorkflowStageIndex}
                        selectedHubId={workflowSelectedHubId}
                        hoveredHubId={workflowHoveredHubId}
                        activeLayerFilter={workflowLayerFilter}
                        resetViewTick={workflowResetTick}
                        replayAssemblyTick={workflowReplayTick}
                        onSelectHub={setWorkflowSelectedHubId}
                        onHoverHub={setWorkflowHoveredHubId}
                        onProjectedHubsUpdate={setWorkflowProjectedHubs}
                        onWebGLFailure={() => setWorkflowWebglFailed(true)}
                      />
                      </DeferredScene>

                      {/* Top-Left Studio Scale Metadata Pill (Solid fill, zero backdrop-blur) */}
                      <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between sm:justify-start gap-2">
                        <div className="bg-[#F6F5F1]/95 border border-[#171A1C]/15 px-2 sm:px-2.5 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#171A1C] whitespace-nowrap">
                          <span>MERIDIAN TWIN</span>
                          <span className="hidden sm:inline"> // 1:2500 ARCHITECTURAL MODEL</span>
                        </div>
                        {activeHowStep >= 1 && (
                          <div
                            data-testid="workflow-disruption-badge"
                            className="bg-[#171A1C] border border-[#D94E3E] px-2 sm:px-2.5 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#F6F5F1] flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D94E3E]" />
                            <span>CLOSURE · CENTRAL BRIDGE</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom-Right Subtle Orbit & Hub Instruction */}
                      <div className="pointer-events-none absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 bg-[#F6F5F1]/95 border border-[#171A1C]/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#666D70]">
                        <span>DRAG TO ORBIT · CLICK HUB TO INSPECT</span>
                      </div>

                      {/* Anchored HTML District Hub Labels Projected from 3D World Space */}
                      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                        {WORKFLOW_HUBS.map((hub) => {
                          const coord = workflowProjectedHubs[hub.id];
                          if (!coord || !coord.visible) return null;
                          const isFocused =
                            workflowSelectedHubId === hub.id ||
                            workflowHoveredHubId === hub.id;
                          return (
                            <button
                              key={hub.id}
                              type="button"
                              data-testid={`workflow-hub-badge-${hub.id}`}
                              onClick={() =>
                                setWorkflowSelectedHubId(
                                  workflowSelectedHubId === hub.id ? null : hub.id
                                )
                              }
                              onMouseEnter={() => setWorkflowHoveredHubId(hub.id)}
                              onMouseLeave={() => setWorkflowHoveredHubId(null)}
                              style={{
                                transform: `translate3d(${coord.x}px, ${coord.y}px, 0)`,
                              }}
                              className={`pointer-events-auto absolute top-0 left-0 -translate-x-1/2 -translate-y-full px-2 py-0.5 border font-mono text-[9px] uppercase tracking-[0.12em] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#E85D36] ${
                                isFocused
                                  ? 'bg-[#171A1C] text-[#F6F5F1] border-[#E85D36] font-semibold z-20'
                                  : 'bg-[#F6F5F1]/95 text-[#171A1C] border-[#171A1C]/25 hover:border-[#E85D36]'
                              }`}
                            >
                              <span
                                className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle ${
                                  isFocused ? 'bg-[#E85D36]' : 'bg-[#171A1C]/50'
                                }`}
                              />
                              {hub.label}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    /* Graceful 2D Architectural SVG Fallback when WebGL is unavailable */
                    <div className="w-full h-full bg-[#F6F5F1] p-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 520 300"
                        className="w-full h-full"
                        role="img"
                        aria-label={`System diagram for ${HOW_IT_WORKS_STEPS[activeHowStep].stage}`}
                      >
                        <g stroke="#171A1C" strokeOpacity="0.07" strokeWidth="1">
                          <line x1="0" y1="60" x2="520" y2="60" />
                          <line x1="0" y1="150" x2="520" y2="150" />
                          <line x1="0" y1="240" x2="520" y2="240" />
                          <line x1="130" y1="0" x2="130" y2="300" />
                          <line x1="260" y1="0" x2="260" y2="300" />
                          <line x1="390" y1="0" x2="390" y2="300" />
                        </g>
                        <rect
                          x="0"
                          y="136"
                          width="520"
                          height="28"
                          fill="#171A1C"
                          fillOpacity="0.06"
                        />
                        <text
                          x="14"
                          y="154"
                          fill="#666D70"
                          fontSize="9"
                          fontFamily="IBM Plex Mono, monospace"
                          letterSpacing="2"
                        >
                          MERIDIAN RIVER CORRIDOR
                        </text>
                        <path
                          d="M 90 235 C 90 180, 130 120, 165 65"
                          fill="none"
                          stroke={activeHowStep >= 1 ? '#2D8A61' : '#171A1C'}
                          strokeWidth={activeHowStep === 2 ? '3.5' : '2'}
                          strokeDasharray={activeHowStep === 1 ? '6 4' : 'none'}
                        />
                        <path
                          d="M 260 235 L 260 65"
                          fill="none"
                          stroke={activeHowStep >= 1 ? '#D94E3E' : '#171A1C'}
                          strokeWidth="2.5"
                          strokeDasharray={activeHowStep >= 1 ? '4 4' : 'none'}
                        />
                        <path
                          d="M 410 235 C 410 180, 385 120, 355 65"
                          fill="none"
                          stroke={activeHowStep >= 1 ? '#E85D36' : '#171A1C'}
                          strokeWidth={activeHowStep === 2 ? '3.5' : '2'}
                        />
                        {[
                          { x: 90, y: 235, label: 'WEST HARBOR' },
                          { x: 260, y: 235, label: 'SOUTH PORT' },
                          { x: 410, y: 235, label: 'SOUTH IND' },
                          { x: 165, y: 65, label: 'MIDTOWN' },
                          { x: 260, y: 65, label: 'FINANCIAL CBD' },
                          { x: 355, y: 65, label: 'EAST HUB' },
                        ].map((n, idx) => (
                          <g key={idx}>
                            <circle
                              cx={n.x}
                              cy={n.y}
                              r="7"
                              fill="#F6F5F1"
                              stroke="#171A1C"
                              strokeWidth="2"
                            />
                            <circle cx={n.x} cy={n.y} r="3" fill="#E85D36" />
                            <text
                              x={n.x}
                              y={n.y > 150 ? n.y + 22 : n.y - 14}
                              textAnchor="middle"
                              fill="#171A1C"
                              fontSize="9"
                              fontFamily="IBM Plex Mono, monospace"
                              fontWeight="600"
                            >
                              {n.label}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>
                  )}
                </div>

                {/* Stage-Specific Interactive Controls & Scenario Readouts Below the 3D Stage */}
                <div className="mt-4 pt-3.5 border-t border-[#171A1C]/12">
                  {/* STAGE 01: Analytical Layer Filter Bar */}
                  {activeHowStep === 0 && (
                    <div
                      data-testid="workflow-stage01-layers"
                      className="flex flex-wrap items-center justify-between gap-3"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#666D70]">
                        ELEVATED ANALYTICAL LAYERS:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          data-testid="workflow-layer-filter-all"
                          onClick={() => setWorkflowLayerFilter('all')}
                          className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border transition-colors cursor-pointer ${
                            workflowLayerFilter === 'all'
                              ? 'bg-[#171A1C] text-[#F6F5F1] border-[#171A1C]'
                              : 'bg-[#F6F5F1] text-[#171A1C] border-[#171A1C]/15 hover:border-[#171A1C]/40'
                          }`}
                        >
                          All 3 Layers
                        </button>
                        {WORKFLOW_LAYERS.map((lyr) => {
                          const isSelected = workflowLayerFilter === lyr.id;
                          return (
                            <button
                              key={lyr.id}
                              type="button"
                              data-testid={`workflow-layer-filter-${lyr.id}`}
                              onClick={() => setWorkflowLayerFilter(lyr.id)}
                              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#171A1C] text-[#F6F5F1] border-[#171A1C]'
                                  : 'bg-[#F6F5F1] text-[#171A1C] border-[#171A1C]/15 hover:border-[#171A1C]/40'
                              }`}
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: lyr.colorHex }}
                              />
                              <span>{lyr.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STAGE 02: Dual Alternative Pathway Comparison Legend */}
                  {activeHowStep === 1 && (
                    <div
                      data-testid="workflow-stage02-legend"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <div className="bg-[#F6F5F1] border-l-2 border-[#D94E3E] border-y border-r border-[#171A1C]/12 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#D94E3E]" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#D94E3E] font-semibold">
                            PATHWAY A // BASELINE RESPONSE
                          </span>
                        </div>
                        <p className="text-xs text-[#24282B] leading-snug">
                          Central Bridge closure triggers uncoordinated queue spillback across South Port and collector approaches.
                        </p>
                      </div>

                      <div className="bg-[#F6F5F1] border-l-2 border-[#2D8A61] border-y border-r border-[#171A1C]/12 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-[#2D8A61]" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#2D8A61] font-semibold">
                            PATHWAY B // INTERVENTION RESPONSE
                          </span>
                        </div>
                        <p className="text-xs text-[#24282B] leading-snug">
                          Coordinated bypass distributes cross-river flow across the West Bypass Viaduct and East Innovation Crossing.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STAGE 03: Concise Scenario Decision Labels (No Fabricated Metrics) */}
                  {activeHowStep === 2 && (
                    <div
                      data-testid="workflow-stage03-callouts"
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                    >
                      <div className="bg-[#F6F5F1] border border-[#171A1C]/14 p-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#E85D36] mb-1">
                          Selected intervention
                        </div>
                        <div className="font-display font-semibold text-xs text-[#171A1C] leading-snug">
                          {activeWorkflowChoreo.scenarioCallouts.selectedIntervention}
                        </div>
                      </div>

                      <div className="bg-[#F6F5F1] border border-[#171A1C]/14 p-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#666D70] mb-1">
                          Affected infrastructure
                        </div>
                        <div className="font-display font-semibold text-xs text-[#171A1C] leading-snug">
                          {activeWorkflowChoreo.scenarioCallouts.affectedInfrastructure}
                        </div>
                      </div>

                      <div className="bg-[#F6F5F1] border border-[#171A1C]/14 p-3">
                        <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#2D8A61] mb-1">
                          Scenario comparison
                        </div>
                        <div className="font-display font-semibold text-xs text-[#171A1C] leading-snug">
                          {activeWorkflowChoreo.scenarioCallouts.scenarioComparison}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Active Hub Inspector Strip (When a District Hub is Hovered or Clicked) */}
                  {activeWorkflowHub ? (
                    <div
                      data-testid="workflow-active-hub-inspector"
                      className="mt-3 bg-[#171A1C] text-[#F6F5F1] p-3 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E85D36]">
                          {activeWorkflowHub.code} · {activeWorkflowHub.bank.toUpperCase()} BANK
                        </div>
                        <div className="text-xs text-[#F6F5F1]/90">
                          {activeWorkflowHub.role}
                        </div>
                      </div>
                      {workflowSelectedHubId && (
                        <button
                          type="button"
                          onClick={() => setWorkflowSelectedHubId(null)}
                          className="px-2 py-1 border border-[#F6F5F1]/25 hover:border-[#E85D36] font-mono text-[10px] uppercase tracking-[0.1em] text-[#F6F5F1] cursor-pointer"
                        >
                          Clear Focus
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 text-xs text-[#24282B] leading-relaxed">
                      {HOW_IT_WORKS_STEPS[activeHowStep].detail}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column (~42% width): Three Selectable Workflow Panels */}
              <div
                className="lg:col-span-5 space-y-4"
                role="tablist"
                aria-label="System Workflow Stages"
              >
                {HOW_IT_WORKS_STEPS.map((item, idx) => {
                  const isActive = activeHowStep === idx;
                  return (
                    <div
                      key={item.num}
                      role="tab"
                      tabIndex={0}
                      aria-selected={isActive}
                      data-testid={`how-step-card-${item.num}`}
                      onClick={() => setActiveHowStep(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveHowStep(idx);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setActiveHowStep((idx + 1) % HOW_IT_WORKS_STEPS.length);
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setActiveHowStep(
                            (idx - 1 + HOW_IT_WORKS_STEPS.length) %
                              HOW_IT_WORKS_STEPS.length
                          );
                        }
                      }}
                      className={`p-7 sm:p-8 border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E85D36] ${
                        isActive
                          ? 'bg-[#171A1C] text-[#F6F5F1] border-[#171A1C] shadow-[0_16px_36px_rgba(23,26,28,0.14)]'
                          : 'bg-[#E8E8E3]/65 text-[#171A1C] border-[#171A1C]/12 hover:border-[#171A1C]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-mono text-xs uppercase tracking-[0.18em] ${
                            isActive ? 'text-[#E85D36]' : 'text-[#666D70]'
                          }`}
                        >
                          {item.num} // {item.stage.toUpperCase()}
                        </span>
                        <span
                          className={`font-mono text-[11px] ${
                            isActive ? 'text-[#F6F5F1]/70' : 'text-[#666D70]'
                          }`}
                        >
                          0{idx + 1} / 03
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-2.5">
                        {item.headline}
                      </h3>

                      <p
                        className={`text-sm sm:text-base leading-relaxed mb-4 ${
                          isActive ? 'text-[#F6F5F1]/85' : 'text-[#24282B]'
                        }`}
                      >
                        {item.copy}
                      </p>

                      <div
                        className={`pt-3 border-t flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] ${
                          isActive
                            ? 'border-[#F6F5F1]/15 text-[#E85D36]'
                            : 'border-[#171A1C]/10 text-[#666D70]'
                        }`}
                      >
                        <span>{item.metric}</span>
                        <span>{isActive ? 'ACTIVE VIEW ●' : 'SELECT STAGE →'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 03 — PLATFORM CAPABILITIES (#capabilities)
            "ONE PLATFORM. A CLEARER PICTURE."
           ------------------------------------------------------------------- */}
        <section
          id="capabilities"
          data-testid="section-capabilities"
          className="py-24 lg:py-32 border-b border-[#171A1C]/12"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-3">
                  03 // PLATFORM ARCHITECTURE
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#171A1C] tracking-[-0.03em] leading-[1.05]">
                  ONE PLATFORM. A CLEARER PICTURE.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#666D70] max-w-md">
                Four integrated product capabilities engineered for high-stakes operational and infrastructure planning.
              </p>
            </div>

            {/* 4 Bespoke Product-Interface Compositions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Capability 01: Scenario Modeling */}
              <article className="capability-card bg-[#E8E8E3]/75 border border-[#171A1C]/14 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#E85D36] font-semibold">
                      01 // SCENARIO MODELING
                    </span>
                    <span className="font-mono text-[11px] text-[#666D70]">
                      BRANCHING GRAPH ENGINE
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171A1C] mb-2.5">
                    Scenario Modeling
                  </h3>
                  <p className="text-sm sm:text-base text-[#24282B] leading-relaxed mb-6">
                    Test policy changes, disruptions, demand shifts, and operational responses across connected systems.
                  </p>
                </div>

                {/* Bespoke Branching Scenario Visual */}
                <div className="bg-[#F6F5F1] border border-[#171A1C]/12 p-5">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#666D70] mb-3">
                    <span>ROOT TRIGGER: BRIDGE LOCKDOWN (07:30)</span>
                    <span className="text-[#E85D36]">3 ACTIVE BRANCHES</span>
                  </div>
                  <svg viewBox="0 0 420 120" className="w-full h-28">
                    <path
                      d="M 40 60 C 120 60, 140 24, 240 24"
                      fill="none"
                      stroke="#D94E3E"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    <path
                      d="M 40 60 C 120 60, 140 60, 240 60"
                      fill="none"
                      stroke="#E85D36"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 40 60 C 120 60, 140 96, 240 96"
                      fill="none"
                      stroke="#2D8A61"
                      strokeWidth="2"
                    />
                    <circle cx="40" cy="60" r="6" fill="#171A1C" />
                    <circle cx="240" cy="24" r="5" fill="#D94E3E" />
                    <circle cx="240" cy="60" r="5" fill="#E85D36" />
                    <circle cx="240" cy="96" r="5" fill="#2D8A61" />
                    <text
                      x="254"
                      y="28"
                      fill="#171A1C"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      BASELINE (+29.6m delay)
                    </text>
                    <text
                      x="254"
                      y="64"
                      fill="#171A1C"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="600"
                    >
                      DYNAMIC REROUTE (12.9m)
                    </text>
                    <text
                      x="254"
                      y="100"
                      fill="#171A1C"
                      fontSize="10"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      TRANSIT SURGE (+14.8% share)
                    </text>
                  </svg>
                </div>
              </article>

              {/* Capability 02: Simulation Workspace */}
              <article className="capability-card bg-[#E8E8E3]/75 border border-[#171A1C]/14 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#E85D36] font-semibold">
                      02 // SIMULATION WORKSPACE
                    </span>
                    <span className="font-mono text-[11px] text-[#666D70]">
                      REAL-TIME PARAMETER LAB
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171A1C] mb-2.5">
                    Simulation Workspace
                  </h3>
                  <p className="text-sm sm:text-base text-[#24282B] leading-relaxed mb-6">
                    Adjust variables, compare outcomes, and inspect how systems evolve over time.
                  </p>
                </div>

                {/* Bespoke Parameter & Curve Composition */}
                <div className="bg-[#F6F5F1] border border-[#171A1C]/12 p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#666D70]">TRAFFIC DEMAND SURGE</span>
                    <span className="font-semibold text-[#171A1C]">
                      {scenarioParams.trafficDemandPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#171A1C]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#E85D36]"
                      style={{
                        width: `${Math.min(
                          100,
                          ((scenarioParams.trafficDemandPct - 60) / 100) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                    <span className="text-[#666D70]">TRANSIT CAPACITY ALLOCATION</span>
                    <span className="font-semibold text-[#171A1C]">
                      {scenarioParams.transitCapacityPct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#171A1C]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#2D8A61]"
                      style={{
                        width: `${Math.min(
                          100,
                          scenarioParams.transitCapacityPct - 50
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </article>

              {/* Capability 03: Spatial Intelligence */}
              <article className="capability-card bg-[#E8E8E3]/75 border border-[#171A1C]/14 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#E85D36] font-semibold">
                      03 // SPATIAL INTELLIGENCE
                    </span>
                    <span className="font-mono text-[11px] text-[#666D70]">
                      MULTI-LAYER DIGITAL TWIN
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171A1C] mb-2.5">
                    Spatial Intelligence
                  </h3>
                  <p className="text-sm sm:text-base text-[#24282B] leading-relaxed mb-6">
                    Understand how activity moves across networks, districts, corridors, and critical nodes.
                  </p>
                </div>

                {/* Bespoke Isometric Stack Visual */}
                <div className="bg-[#F6F5F1] border border-[#171A1C]/12 p-5">
                  <div className="grid grid-cols-3 gap-2.5 font-mono text-[11px]">
                    <div className="p-3 border border-[#E85D36]/40 bg-[#E85D36]/5">
                      <div className="text-[10px] text-[#E85D36] mb-1">
                        ELEV +6.0m
                      </div>
                      <div className="font-semibold text-[#171A1C]">
                        Logistics
                      </div>
                      <div className="text-[10px] text-[#666D70] mt-0.5">
                        4 Hub Corridors
                      </div>
                    </div>
                    <div className="p-3 border border-[#171A1C]/20 bg-[#171A1C]/5">
                      <div className="text-[10px] text-[#666D70] mb-1">
                        ELEV +4.4m
                      </div>
                      <div className="font-semibold text-[#171A1C]">
                        Energy Grid
                      </div>
                      <div className="text-[10px] text-[#666D70] mt-0.5">
                        312 MW Feeders
                      </div>
                    </div>
                    <div className="p-3 border border-[#2D8A61]/40 bg-[#2D8A61]/5">
                      <div className="text-[10px] text-[#2D8A61] mb-1">
                        ELEV +2.8m
                      </div>
                      <div className="font-semibold text-[#171A1C]">
                        Mobility
                      </div>
                      <div className="text-[10px] text-[#666D70] mt-0.5">
                        40 Edges
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Capability 04: Explainable Outcomes */}
              <article className="capability-card bg-[#E8E8E3]/75 border border-[#171A1C]/14 p-7 sm:p-9 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#E85D36] font-semibold">
                      04 // EXPLAINABLE OUTCOMES
                    </span>
                    <span className="font-mono text-[11px] text-[#666D70]">
                      CAUSAL PROPAGATION TRACE
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171A1C] mb-2.5">
                    Explainable Outcomes
                  </h3>
                  <p className="text-sm sm:text-base text-[#24282B] leading-relaxed mb-6">
                    Follow the chain of cause and effect behind every simulated result.
                  </p>
                </div>

                {/* Bespoke Causal Trace Visual */}
                <div className="bg-[#F6F5F1] border border-[#171A1C]/12 p-5">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono uppercase">
                    <span className="px-2 py-1.5 bg-[#171A1C] text-[#F6F5F1]">
                      01 Closure
                    </span>
                    <span className="text-[#E85D36]">→</span>
                    <span className="px-2 py-1.5 bg-[#E8E8E3] text-[#171A1C]">
                      02 Capacity
                    </span>
                    <span className="text-[#E85D36]">→</span>
                    <span className="px-2 py-1.5 bg-[#E8E8E3] text-[#171A1C]">
                      03 Reroute
                    </span>
                    <span className="text-[#E85D36]">→</span>
                    <span className="px-2 py-1.5 bg-[#E85D36] text-[#F6F5F1] font-semibold">
                      05 SLA +14.2m
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 04 — PARALLEL FUTURES (#parallel-futures)
            "One decision." -> "Two possible futures."
           ------------------------------------------------------------------- */}
        <section
          id="parallel-futures"
          data-testid="section-parallel-futures"
          className="py-24 lg:py-36 border-b border-[#171A1C]/12 bg-[#E8E8E3]/45"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="futures-reveal font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-3">
                04 // SIDE-BY-SIDE REALITY COMPARISON
              </div>
              <h2 className="futures-reveal font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#171A1C] tracking-[-0.03em] leading-[1.04]">
                One decision.{' '}
                <span className="text-[#E85D36]">Two possible futures.</span>
              </h2>
              <p className="futures-reveal mt-4 text-base sm:text-lg text-[#24282B]">
                Compare how the exact same 07:30 Meridian Central Bridge closure unfolds without action versus with a coordinated response.
              </p>

              {/* Interactive Intervention Switcher for the Split Comparison */}
              <div className="futures-reveal mt-7 inline-flex flex-wrap items-center justify-center gap-2 bg-[#F6F5F1] p-1.5 border border-[#171A1C]/15">
                {(
                  [
                    { id: 'reroute_vehicles', label: 'Dynamic Rerouting' },
                    { id: 'increase_transit', label: 'Transit Capacity Surge' },
                    {
                      id: 'coordinate_deliveries',
                      label: 'Freight Window Slotting',
                    },
                  ] as { id: InterventionStrategy; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIntervention(item.id)}
                    className={`px-3.5 py-2 text-xs font-mono uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                      scenarioParams.intervention === item.id
                        ? 'bg-[#171A1C] text-[#F6F5F1] font-semibold'
                        : 'text-[#666D70] hover:text-[#171A1C]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFuturesSplitSpread(futuresSplitSpread === 1 ? 0 : 1)
                  }
                  className="px-3 py-2 text-xs font-mono uppercase tracking-[0.1em] text-[#E85D36] border-l border-[#171A1C]/12 cursor-pointer"
                >
                  {futuresSplitSpread === 1 ? 'Merge View' : 'Split Futures'}
                </button>
              </div>
            </div>

            {/* Two-Column Split Comparison Cards */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 transition-all duration-500 ${
                futuresSplitSpread === 1 ? 'gap-8 lg:gap-12' : 'gap-2'
              }`}
            >
              {/* Left Side — BASELINE */}
              <div
                data-testid="parallel-future-baseline"
                className="bg-[#F6F5F1] border-t-4 border-[#D94E3E] border-x border-b border-[#171A1C]/14 p-7 sm:p-10"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D94E3E]">
                    BASELINE
                  </span>
                  <span className="font-mono text-xs text-[#666D70]">
                    FUTURE A // UNMITIGATED
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171A1C] mb-6">
                  Without intervention.
                </h3>

                {/* Architectural Corridor Schematic — Baseline */}
                <div className="bg-[#E8E8E3]/70 border border-[#171A1C]/10 p-4 mb-6">
                  <svg viewBox="0 0 400 130" className="w-full h-28">
                    <rect
                      x="0"
                      y="54"
                      width="400"
                      height="22"
                      fill="#171A1C"
                      fillOpacity="0.08"
                    />
                    {/* Overloaded central queue spillback */}
                    <path
                      d="M 80 110 L 200 90 L 320 110"
                      fill="none"
                      stroke="#D94E3E"
                      strokeWidth="4"
                    />
                    <path
                      d="M 80 20 L 200 40 L 320 20"
                      fill="none"
                      stroke="#D94E3E"
                      strokeWidth="3.5"
                    />
                    <line
                      x1="200"
                      y1="25"
                      x2="200"
                      y2="105"
                      stroke="#D94E3E"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />
                    <circle cx="200" cy="65" r="9" fill="#D94E3E" />
                    <text
                      x="200"
                      y="124"
                      textAnchor="middle"
                      fill="#D94E3E"
                      fontSize="9"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="600"
                    >
                      ARTERIAL GRIDLOCK &amp; QUEUE SPILLBACK
                    </text>
                  </svg>
                </div>

                {/* Live Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-[#171A1C]/12">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#666D70]">
                      Travel Delay
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#D94E3E]">
                      {snapshotA.metrics.avgTravelDelayMin}m
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#666D70]">
                      Congestion
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#171A1C]">
                      {snapshotA.metrics.congestionIndex}%
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#666D70]">
                      Deliveries
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#171A1C]">
                      {snapshotA.metrics.completedDeliveries}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-[#24282B]">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#D94E3E]" />
                    <span>Higher congestion across CBD and Harbor collectors</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#D94E3E]" />
                    <span>Longer travel delays during peak commuter windows</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#D94E3E]" />
                    <span>Reduced delivery reliability for hospital &amp; port freight</span>
                  </li>
                </ul>
              </div>

              {/* Right Side — ALTERNATIVE */}
              <div
                data-testid="parallel-future-alternative"
                className="bg-[#F6F5F1] border-t-4 border-[#2D8A61] border-x border-b border-[#171A1C]/14 p-7 sm:p-10"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2D8A61]">
                    ALTERNATIVE
                  </span>
                  <span className="font-mono text-xs text-[#E85D36] font-semibold">
                    FUTURE B // COORDINATED RESPONSE
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#171A1C] mb-6">
                  With a coordinated response.
                </h3>

                {/* Architectural Corridor Schematic — Alternative */}
                <div className="bg-[#E8E8E3]/70 border border-[#171A1C]/10 p-4 mb-6">
                  <svg viewBox="0 0 400 130" className="w-full h-28">
                    <rect
                      x="0"
                      y="54"
                      width="400"
                      height="22"
                      fill="#171A1C"
                      fillOpacity="0.08"
                    />
                    {/* Balanced West & East Bypass Corridors */}
                    <path
                      d="M 85 105 C 85 65, 110 40, 145 22"
                      fill="none"
                      stroke="#2D8A61"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 315 105 C 315 65, 290 40, 255 22"
                      fill="none"
                      stroke="#2D8A61"
                      strokeWidth="3.5"
                    />
                    <circle cx="85" cy="65" r="5" fill="#2D8A61" />
                    <circle cx="315" cy="65" r="5" fill="#2D8A61" />
                    <text
                      x="200"
                      y="124"
                      textAnchor="middle"
                      fill="#2D8A61"
                      fontSize="9"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="600"
                    >
                      DYNAMIC WEST &amp; EAST VIADUCT LOAD BALANCING
                    </text>
                  </svg>
                </div>

                {/* Live Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-[#171A1C]/12">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#666D70]">
                      Travel Delay
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#2D8A61]">
                      {snapshotB.metrics.avgTravelDelayMin}m
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#666D70]">
                      Congestion
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#2D8A61]">
                      {snapshotB.metrics.congestionIndex}%
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#666D70]">
                      Deliveries
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-[#171A1C]">
                      {snapshotB.metrics.completedDeliveries}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-[#24282B]">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#2D8A61]" />
                    <span>Balanced traffic flow across alternate river crossings</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#2D8A61]" />
                    <span>Faster recovery (-{delaySaved} min average travel delay)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#2D8A61]" />
                    <span>Improved system performance (+{extraDeliveries} completed deliveries)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 05 — INDUSTRY SOLUTIONS (#solutions)
            "INTELLIGENCE FOR INTERCONNECTED WORLDS."
           ------------------------------------------------------------------- */}
        <section
          id="solutions"
          data-testid="section-solutions"
          className="py-24 lg:py-32 border-b border-[#171A1C]/12"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-3">
                  05 // DOMAIN APPLICATIONS
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#171A1C] tracking-[-0.03em] leading-[1.05]">
                  INTELLIGENCE FOR INTERCONNECTED WORLDS.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#666D70] max-w-md">
                Designed Like an Architecture Monograph. Built for real-world network operators.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left Column: Large Numbered Editorial Index */}
              <div className="lg:col-span-5 flex flex-col justify-between border-t border-[#171A1C]/15">
                {INDUSTRY_SOLUTIONS.map((item, idx) => {
                  const active = activeIndustryIdx === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-testid={`industry-tab-${item.id.toLowerCase()}`}
                      onClick={() => setActiveIndustryIdx(idx)}
                      onMouseEnter={() => setActiveIndustryIdx(idx)}
                      className={`w-full text-left py-6 px-5 border-b border-[#171A1C]/15 transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        active
                          ? 'bg-[#171A1C] text-[#F6F5F1]'
                          : 'hover:bg-[#E8E8E3]/70 text-[#171A1C]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span
                            className={`font-mono text-xs uppercase tracking-[0.16em] ${
                              active ? 'text-[#E85D36]' : 'text-[#666D70]'
                            }`}
                          >
                            {item.index}
                          </span>
                          <span className="font-display font-bold text-2xl tracking-tight">
                            {item.title}
                          </span>
                        </div>
                        <p
                          className={`text-sm leading-relaxed ${
                            active ? 'text-[#F6F5F1]/85' : 'text-[#666D70]'
                          }`}
                        >
                          {item.copy}
                        </p>
                      </div>
                      <span
                        className={`font-mono text-sm mt-1 ${
                          active ? 'text-[#E85D36]' : 'text-[#666D70]'
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Large Architectural Visual & Telemetry Sheet */}
              <div className="lg:col-span-7 bg-[#E8E8E3] border border-[#171A1C]/15 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#171A1C]/12">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#E85D36] font-semibold">
                      SECTOR {activeIndustry.index} //{' '}
                      {activeIndustry.title.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-[#666D70]">
                      MERIDIAN REFERENCE MODEL
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#171A1C] tracking-tight leading-tight mb-4">
                    {activeIndustry.headline}
                  </h3>

                  <p className="text-base text-[#24282B] leading-relaxed mb-8">
                    {activeIndustry.copy}
                  </p>
                </div>

                {/* Quantified Sector Telemetry */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {activeIndustry.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="bg-[#F6F5F1] border border-[#171A1C]/12 p-4"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#666D70] mb-1">
                          {m.label}
                        </div>
                        <div className="font-display font-bold text-2xl text-[#171A1C]">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#171A1C]/12">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                        KEY NODES:
                      </span>
                      {activeIndustry.focusNodes.map((fn) => (
                        <span
                          key={fn}
                          className="px-2.5 py-1 bg-[#F6F5F1] border border-[#171A1C]/12 font-mono text-[11px] text-[#171A1C]"
                        >
                          {fn}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (activeIndustry.id === 'Mobility')
                          setInvisibleLayer('mobility');
                        if (activeIndustry.id === 'Energy')
                          setInvisibleLayer('energy');
                        if (activeIndustry.id === 'Logistics')
                          setInvisibleLayer('logistics');
                        handleOpenInteractiveSimulation('systems');
                      }}
                      className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#E85D36] hover:text-[#171A1C] transition-colors cursor-pointer"
                    >
                      Inspect {activeIndustry.title} Layer in 3D →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 06 — EXPLAINABILITY (#explainability)
            "EVERY OUTCOME HAS AN EXPLANATION."
           ------------------------------------------------------------------- */}
        <section
          id="explainability"
          data-testid="section-explainability"
          className="py-24 lg:py-32 border-b border-[#171A1C]/12"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="max-w-3xl mb-14">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-3">
                06 // TRANSPARENT CAUSAL GRAPH
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#171A1C] tracking-[-0.03em] leading-[1.05] mb-3">
                EVERY OUTCOME HAS AN EXPLANATION.
              </h2>
              <p className="text-lg sm:text-xl text-[#24282B]">
                Understanding a result means understanding what shaped it.
              </p>
            </div>

            {/* Interactive 5-Node Minimalist Causal Diagram */}
            <div className="bg-[#E8E8E3] border border-[#171A1C]/15 p-6 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
                {EXPLAINABILITY_CHAIN.map((node, idx) => {
                  const isActive = activeExplainIdx === idx;
                  return (
                    <button
                      key={node.step}
                      type="button"
                      data-testid={`explain-diagram-node-${idx}`}
                      onClick={() => setActiveExplainIdx(idx)}
                      onMouseEnter={() => setActiveExplainIdx(idx)}
                      className={`text-left p-4 border transition-all cursor-pointer relative ${
                        isActive
                          ? 'bg-[#171A1C] text-[#F6F5F1] border-[#171A1C]'
                          : 'bg-[#F6F5F1] text-[#171A1C] border-[#171A1C]/15 hover:border-[#E85D36]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                            isActive ? 'text-[#E85D36]' : 'text-[#666D70]'
                          }`}
                        >
                          STEP {node.step}
                        </span>
                        {idx < EXPLAINABILITY_CHAIN.length - 1 && (
                          <span className="font-mono text-xs text-[#E85D36]">
                            →
                          </span>
                        )}
                      </div>
                      <div className="font-display font-bold text-base leading-snug mb-1">
                        {node.label}
                      </div>
                      <div
                        className={`font-mono text-[10px] ${
                          isActive ? 'text-[#F6F5F1]/75' : 'text-[#666D70]'
                        }`}
                      >
                        {node.nodeCode}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Node Detailed Causal Readout */}
              <div className="bg-[#F6F5F1] border border-[#171A1C]/12 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 bg-[#E85D36] text-[#F6F5F1] font-mono text-[10px] uppercase tracking-[0.14em]">
                      STAGE {activeExplainNode.step} // {activeExplainNode.label}
                    </span>
                    <span className="font-mono text-xs text-[#666D70]">
                      {activeExplainNode.location}
                    </span>
                  </div>
                  <p className="text-base text-[#24282B] leading-relaxed">
                    {activeExplainNode.explanation}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#171A1C]/10 w-full lg:w-auto justify-between">
                  <div className="lg:text-right">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                      QUANTIFIED IMPACT
                    </div>
                    <div className="font-mono text-sm font-bold text-[#171A1C]">
                      {activeExplainNode.delta}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCausalStepIndex(activeExplainIdx);
                      handleOpenInteractiveSimulation('explain');
                    }}
                    className="px-4 py-2 bg-[#171A1C] hover:bg-[#E85D36] text-[#F6F5F1] font-mono text-[11px] uppercase tracking-[0.12em] transition-colors cursor-pointer"
                  >
                    Inspect Step in 3D →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 07 — FINAL CALL TO ACTION & DEMO REQUEST FORM (#request-demo)
            "The next move is yours."
           ------------------------------------------------------------------- */}
        <section
          id="request-demo"
          data-testid="section-request-demo"
          className="py-24 lg:py-32 border-b border-[#171A1C]/12"
        >
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Final CTA Narrative & Scenario Brief */}
              <div className="lg:col-span-5">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36] mb-3">
                  07 // NEXT MOVE
                </div>
                <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#171A1C] tracking-[-0.03em] leading-[1.02] mb-5">
                  The next move is yours.
                </h2>
                <p className="text-base sm:text-lg text-[#24282B] leading-relaxed mb-8">
                  Explore possibilities, understand trade-offs, and make your next decision with greater clarity.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 mb-10">
                  <button
                    type="button"
                    onClick={() => fullNameInputRef.current?.focus()}
                    className="px-6 py-3.5 bg-[#171A1C] hover:bg-[#E85D36] text-[#F6F5F1] font-display font-semibold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
                  >
                    Request a demo
                  </button>
                  <button
                    type="button"
                    data-testid="bottom-explore-simulation-cta"
                    onClick={() => handleOpenInteractiveSimulation('simulate')}
                    className="px-6 py-3.5 bg-transparent hover:bg-[#171A1C]/5 text-[#171A1C] border border-[#171A1C]/30 font-display font-semibold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
                  >
                    Explore simulation
                  </button>
                </div>

                {/* Active Scenario Parameters Snapshot Attached to Demo Request */}
                <div className="bg-[#E8E8E3] border border-[#171A1C]/14 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#666D70] mb-3">
                    ACTIVE SIMULATION SNAPSHOT ATTACHED
                  </div>
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[#666D70]">DEMAND</div>
                      <div className="font-semibold text-[#171A1C]">
                        {scenarioParams.trafficDemandPct}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666D70]">TRANSIT</div>
                      <div className="font-semibold text-[#171A1C]">
                        {scenarioParams.transitCapacityPct}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#666D70]">DELAY DELTA</div>
                      <div className="font-semibold text-[#2D8A61]">
                        -{delaySaved} min
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Validated Demo Request Form */}
              <div className="lg:col-span-7 bg-[#E8E8E3] border border-[#171A1C]/15 p-7 sm:p-10">
                {submitted ? (
                  <div
                    data-testid="demo-confirmation-card"
                    className="bg-[#F6F5F1] border border-[#2D8A61] p-8"
                  >
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#2D8A61] mb-2">
                      REQUEST CONFIRMED // BRIEFING QUEUED
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#171A1C] mb-2">
                      Thank you, {formInput.fullName}.
                    </h3>
                    <p className="text-sm text-[#24282B] leading-relaxed mb-6">
                      Our systems architecture team has received your briefing request for{' '}
                      <span className="font-semibold">{formInput.company}</span> (
                      {formInput.industry}) along with your active Meridian scenario parameters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormInput({
                          fullName: '',
                          workEmail: '',
                          company: '',
                          industry: '',
                          modelingGoal: '',
                        });
                        setTouched({});
                      }}
                      className="px-4 py-2 bg-[#171A1C] text-[#F6F5F1] font-mono text-xs uppercase tracking-[0.12em] cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleFormSubmit}
                    noValidate
                    data-testid="demo-request-form"
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="demo-full-name"
                          className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#171A1C] mb-1.5"
                        >
                          Full name *
                        </label>
                        <input
                          ref={fullNameInputRef}
                          id="demo-full-name"
                          data-testid="input-full-name"
                          type="text"
                          value={formInput.fullName}
                          onChange={(e) =>
                            handleFieldChange('fullName', e.target.value)
                          }
                          onBlur={() => handleFieldBlur('fullName')}
                          placeholder="Dr. Elena Rostova"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] border border-[#171A1C]/20 text-sm text-[#171A1C] focus:outline-none focus:border-[#E85D36]"
                        />
                        {touched.fullName && validation.errors.fullName && (
                          <p
                            data-testid="error-full-name"
                            className="mt-1 text-xs text-[#D94E3E] font-mono"
                          >
                            {validation.errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="demo-work-email"
                          className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#171A1C] mb-1.5"
                        >
                          Work email *
                        </label>
                        <input
                          id="demo-work-email"
                          data-testid="input-work-email"
                          type="email"
                          value={formInput.workEmail}
                          onChange={(e) =>
                            handleFieldChange('workEmail', e.target.value)
                          }
                          onBlur={() => handleFieldBlur('workEmail')}
                          placeholder="elena@organization.org"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] border border-[#171A1C]/20 text-sm text-[#171A1C] focus:outline-none focus:border-[#E85D36]"
                        />
                        {touched.workEmail && validation.errors.workEmail && (
                          <p
                            data-testid="error-work-email"
                            className="mt-1 text-xs text-[#D94E3E] font-mono"
                          >
                            {validation.errors.workEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="demo-company"
                          className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#171A1C] mb-1.5"
                        >
                          Company *
                        </label>
                        <input
                          id="demo-company"
                          data-testid="input-company"
                          type="text"
                          value={formInput.company}
                          onChange={(e) =>
                            handleFieldChange('company', e.target.value)
                          }
                          onBlur={() => handleFieldBlur('company')}
                          placeholder="Meridian Urban Systems"
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] border border-[#171A1C]/20 text-sm text-[#171A1C] focus:outline-none focus:border-[#E85D36]"
                        />
                        {touched.company && validation.errors.company && (
                          <p
                            data-testid="error-company"
                            className="mt-1 text-xs text-[#D94E3E] font-mono"
                          >
                            {validation.errors.company}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="demo-industry"
                          className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#171A1C] mb-1.5"
                        >
                          Industry *
                        </label>
                        <select
                          id="demo-industry"
                          data-testid="select-industry"
                          value={formInput.industry}
                          onChange={(e) =>
                            handleFieldChange(
                              'industry',
                              e.target.value as DemoRequestInput['industry']
                            )
                          }
                          onBlur={() => handleFieldBlur('industry')}
                          className="w-full px-3.5 py-2.5 bg-[#F6F5F1] border border-[#171A1C]/20 text-sm text-[#171A1C] focus:outline-none focus:border-[#E85D36]"
                        >
                          <option value="">Select an industry</option>
                          <option value="Mobility">Mobility</option>
                          <option value="Energy">Energy</option>
                          <option value="Logistics">Logistics</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Other">Other</option>
                        </select>
                        {touched.industry && validation.errors.industry && (
                          <p
                            data-testid="error-industry"
                            className="mt-1 text-xs text-[#D94E3E] font-mono"
                          >
                            {validation.errors.industry}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="demo-message"
                        className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#171A1C] mb-1.5"
                      >
                        Optional message
                      </label>
                      <textarea
                        id="demo-message"
                        data-testid="textarea-message"
                        rows={3}
                        value={formInput.modelingGoal}
                        onChange={(e) =>
                          handleFieldChange('modelingGoal', e.target.value)
                        }
                        placeholder="Describe the network, corridors, or scenarios you want to model..."
                        className="w-full px-3.5 py-2.5 bg-[#F6F5F1] border border-[#171A1C]/20 text-sm text-[#171A1C] focus:outline-none focus:border-[#E85D36]"
                      />
                    </div>

                    <button
                      type="submit"
                      data-testid="submit-demo-btn"
                      className="w-full py-3.5 bg-[#E85D36] hover:bg-[#d44d27] text-[#F6F5F1] font-display font-semibold text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer"
                    >
                      Schedule Architecture Demo
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            FOOTER
           ------------------------------------------------------------------- */}
        <footer className="py-12 bg-[#F6F5F1] text-[#666D70]">
          <div className="max-w-[1440px] mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#E85D36] inline-block" />
              <span className="font-display font-bold tracking-[0.18em] text-sm uppercase text-[#171A1C]">
                PARALLEL
              </span>
              <span className="font-mono text-xs text-[#666D70]">
                © 2026 PARALLEL Systems Inc.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-[0.12em]">
              <button
                type="button"
                onClick={() => onScrollToSection('hero')}
                className="hover:text-[#171A1C] cursor-pointer"
              >
                3D Hero
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('manifesto')}
                className="hover:text-[#171A1C] cursor-pointer"
              >
                Perspective
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('how-it-works')}
                className="hover:text-[#171A1C] cursor-pointer"
              >
                How it works
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('capabilities')}
                className="hover:text-[#171A1C] cursor-pointer"
              >
                Capabilities
              </button>
              <button
                type="button"
                onClick={() => onScrollToSection('solutions')}
                className="hover:text-[#171A1C] cursor-pointer"
              >
                Solutions
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
