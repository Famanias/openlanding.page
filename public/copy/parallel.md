<template slug="parallel" name="PARALLEL">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "zustand": "^5.0.16",
        "gsap": "^3.15.0",
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(parallel)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./parallel/parallel.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PARALLEL — The future isn't singular",
  description:
    "Every decision changes a system. PARALLEL helps organizations model complex systems, explore alternative scenarios, and see what happens next.",
  openGraph: {
    title: "PARALLEL — The future isn't singular",
    description:
      "Every decision changes a system. PARALLEL helps organizations model complex systems, explore alternative scenarios, and see what happens next.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101315",
  colorScheme: "dark",
};

export default function ParallelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="par-body bg-[#101315] text-[#F6F5F1] antialiased selection:bg-[#FF5522] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/App.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useState } from 'react';
import { EditorialInterface } from './components/EditorialInterface';
import { useParallelStore } from './store/useParallelStore';

export function App() {
  const [webglFailed, setWebglFailed] = useState(false);

  const heroState = useParallelStore((s) => s.heroState);
  const heroMode = useParallelStore((s) => s.heroMode);
  const presentationMode = useParallelStore((s) => s.presentationMode);

  const handleWebGLFailure = useCallback(() => {
    setWebglFailed(true);
  }, []);

  useEffect(() => {
    // Support ?autostart=1 to open directly into Simulate mode
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      useParallelStore.getState().setHeroMode('simulate');
    }

    // Keyboard navigation shortcuts (Escape to exit interactive simulation takeover or object inspection)
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') {
        const st = useParallelStore.getState();
        if (st.selectedEntity) {
          st.setSelectedEntity(null);
          st.setHighlightedRoadId(null);
          if (st.presentationMode === 'exploration') {
            st.setPresentationMode('cinematic');
          }
          return;
        }
        if (st.isStageExpanded) {
          st.setStageExpanded(false);
          return;
        }
        if (st.heroState === 'interactive') {
          st.setHeroState('cinematic');
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <main
      data-hero-state={heroState}
      data-hero-mode={heroMode}
      data-presentation-mode={presentationMode}
      className="relative min-h-screen w-full bg-[#101315] text-[#F6F5F1]"
    >
      <EditorialInterface
        webglFailed={webglFailed}
        onWebGLFailure={handleWebGLFailure}
        onScrollToSection={handleScrollToSection}
      />
    </main>
  );
}

export default App;
]]>
    </file>
    <file path="src/app/(parallel)/parallel/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#101315"/>
  <path d="M9 25V14C9 10 12 7 16 7" stroke="#FF5522" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M23 25V14C23 10 20 7 16 7" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="16" cy="7" r="2.2" fill="#F6F5F1"/>
  <circle cx="9" cy="25" r="2" fill="#FF5522"/>
  <circle cx="23" cy="25" r="2" fill="#38BDF8"/>
</svg>
]]>
    </file>
    <file path="src/app/(parallel)/parallel/page.tsx">
<![CDATA[import App from "./App";

export default function Page() {
  return <App />;
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/parallel.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --font-display: var(--font-display, 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif);
    --font-sans: var(--font-sans, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif);
    --font-mono: var(--font-mono, 'IBM Plex Mono', monospace);
  }

  html {
    font-family: var(--font-sans);
    background-color: #101315;
    color: #F6F5F1;
    scroll-behavior: auto;
  }

  h1, h2, h3, h4, .font-display {
    font-family: var(--font-display);
  }

  .font-mono {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
}

/* Custom Range Input Styling for Simulation Controls */
input[type="range"].par-slider,
input[type="range"].parallel-slider {
  -webkit-appearance: none;
  appearance: none;
  background: rgba(246, 245, 241, 0.16);
  height: 4px;
  border-radius: 2px;
}

input[type="range"].par-slider::-webkit-slider-thumb,
input[type="range"].parallel-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: #E85D36;
  cursor: pointer;
  border: 1px solid #F6F5F1;
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

input[type="range"].par-slider::-webkit-slider-thumb:hover,
input[type="range"].parallel-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

input[type="range"].par-slider:focus-visible,
input[type="range"].parallel-slider:focus-visible {
  outline: 2px solid #E85D36;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/components/EditorialInterface.tsx">
<![CDATA['use client';

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
            <span>LIVE SPATIAL ENGINE // 60HZ</span>
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
]]>
    </file>
    <file path="src/app/(parallel)/parallel/components/WebGLFallbackView.tsx">
<![CDATA['use client';

import React from 'react';
import { useParallelStore } from '../store/useParallelStore';

export const WebGLFallbackView: React.FC = () => {
  const { getCurrentSnapshots, scenarioParams, heroMode } = useParallelStore();
  const { snapshotA, snapshotB } = getCurrentSnapshots();

  return (
    <div
      className="absolute inset-0 bg-[#0B0C0E] flex flex-col items-center justify-center p-6 z-0 pointer-events-none overflow-hidden"
      aria-label="Static architectural diagram fallback for Meridian Urban System"
    >
      <div className="max-w-2xl w-full border border-[#F4F1EA]/15 bg-[#12141A] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F4F1EA]/10 pb-3 mb-4">
          <div>
            <p className="text-[11px] font-mono text-[#F4F1EA]/60">
              ARCHITECTURAL SYSTEM DIAGRAM · MODE: {heroMode.toUpperCase()}
            </p>
            <h2 className="text-lg font-semibold text-[#F4F1EA] mt-0.5">
              MODEL 001 / MERIDIAN URBAN SYSTEM
            </h2>
          </div>
          <div className="text-xs font-mono text-[#FF5522]">
            {snapshotB.timeFormatted} · DEMAND: {scenarioParams.trafficDemandPct}%
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[#F4F1EA]/12 bg-[#0B0C0E] p-4">
            <p className="text-xs font-mono text-[#E05A47]">
              BASELINE — NO INTERVENTION
            </p>
            <p className="text-xs text-[#F4F1EA]/80 mt-1.5 leading-relaxed">
              Meridian Central Bridge closed. Uncoordinated queues propagate into CBD and Harbor approaches.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 pt-2.5 border-t border-[#F4F1EA]/10 font-mono text-xs">
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELAY</span>
                <span className="text-sm text-[#E05A47] font-semibold">
                  +{snapshotA.metrics.avgTravelDelayMin}m
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">CONGESTION</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotA.metrics.congestionIndex}/100
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELIVERIES</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotA.metrics.completedDeliveries}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#FF5522]/40 bg-[#0B0C0E] p-4">
            <p className="text-xs font-mono text-[#FF5522]">
              INTERVENTION — COORDINATED RESPONSE
            </p>
            <p className="text-xs text-[#F4F1EA]/80 mt-1.5 leading-relaxed">
              Active intervention ({scenarioParams.intervention.replace(/_/g, ' ')}) rebalances cross-river corridors.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 pt-2.5 border-t border-[#F4F1EA]/10 font-mono text-xs">
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELAY</span>
                <span className="text-sm text-[#FF5522] font-semibold">
                  +{snapshotB.metrics.avgTravelDelayMin}m
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">CONGESTION</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotB.metrics.congestionIndex}/100
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELIVERIES</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotB.metrics.completedDeliveries}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(parallel)/parallel/rendering/ParallelWorldCanvas.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import {
  CAUSAL_SEQUENCE,
  SelectedEntityInfo,
  useParallelStore,
} from '../store/useParallelStore';
import {
  BuildingDefinition,
  CityWorldData,
  DistrictId,
  RoadEdge,
} from '../world/cityGenerator';
import { computeModeChoreography, dampValue } from '../simulation/cameraMath';

interface ParallelWorldCanvasProps {
  onWebGLFailure: () => void;
}

// Pre-allocated scratch math objects to guarantee zero GC inside animation loop
const _scratchVec3 = new THREE.Vector3();
const _scratchVec3B = new THREE.Vector3();
const _scratchMat4 = new THREE.Matrix4();
const _scratchQuat = new THREE.Quaternion();
const _scratchScale = new THREE.Vector3();
const _scratchEuler = new THREE.Euler();
const _scratchColor = new THREE.Color();

function createWindowGridTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#181B20';
  ctx.fillRect(0, 0, 256, 256);

  const cols = 8;
  const rows = 16;
  const padX = 5;
  const padY = 4;
  const cellW = 256 / cols;
  const cellH = 256 / rows;

  // Deterministic pseudo-random pattern for warm architectural interior lighting
  let s = 42;
  const nextRand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const roll = nextRand();
      if (roll > 0.62) {
        ctx.fillStyle = roll > 0.88 ? '#FFE4B5' : '#D9C39E';
      } else if (roll > 0.35) {
        ctx.fillStyle = '#2B303A';
      } else {
        ctx.fillStyle = '#14171C';
      }
      ctx.fillRect(
        c * cellW + padX,
        r * cellH + padY,
        cellW - padX * 2,
        cellH - padY * 2
      );
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createMicroBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 128, 128);

  let s = 1337;
  for (let y = 0; y < 128; y += 2) {
    for (let x = 0; x < 128; x += 2) {
      s = (s * 1664525 + 1013904223) % 4294967296;
      const v = 110 + Math.floor((s / 4294967296) * 36);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/**
 * Custom GLSL Shader for procedural moving flow along curved infrastructure routes
 */
function createFlowShaderMaterial(baseColorHex: number, pulseColorHex: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color(baseColorHex) },
      uPulseColor: { value: new THREE.Color(pulseColorHex) },
      uCongestion: { value: 0.2 },
      uOpacity: { value: 0.85 },
      uClosed: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uBaseColor;
      uniform vec3 uPulseColor;
      uniform float uCongestion;
      uniform float uOpacity;
      uniform float uClosed;
      varying vec2 vUv;

      void main() {
        if (uClosed > 0.5) {
          float stripe = step(0.5, fract(vUv.x * 16.0));
          vec3 closedCol = mix(vec3(0.18, 0.08, 0.07), vec3(0.85, 0.25, 0.18), stripe);
          gl_FragColor = vec4(closedCol, uOpacity * 0.85);
          return;
        }
        float speed = mix(1.6, 0.35, uCongestion);
        float density = mix(5.0, 12.0, uCongestion);
        float wave = fract(vUv.x * density - uTime * speed);
        float pulse = smoothstep(0.65, 0.95, wave) * smoothstep(1.0, 0.92, wave);
        float edgeFade = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
        vec3 col = mix(uBaseColor, uPulseColor, pulse * 0.9 + uCongestion * 0.35);
        float alpha = (0.35 + pulse * 0.65) * edgeFade * uOpacity;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

/**
 * Composite multi-part architectural building generator (merged per material tier for fast draw calls)
 */
function buildCityArchitectureGroup(
  world: CityWorldData,
  materials: {
    porcelainMat: THREE.MeshStandardMaterial;
    mineralGrayMat: THREE.MeshStandardMaterial;
    titaniumMat: THREE.MeshStandardMaterial;
    glassTowerMat: THREE.MeshStandardMaterial;
    plinthMat: THREE.MeshStandardMaterial;
    darkTrimMat: THREE.MeshStandardMaterial;
    waterMat: THREE.MeshStandardMaterial;
    parkGrassMat: THREE.MeshStandardMaterial;
    treeTrunkMat: THREE.MeshStandardMaterial;
    treeCanopyMat: THREE.MeshStandardMaterial;
    amberEdgeMat: THREE.LineBasicMaterial;
  },
  futureId: 'A' | 'B'
): {
  root: THREE.Group;
  infrastructureLayerGroup: THREE.Group;
  mobilityLayerGroup: THREE.Group;
  energyLayerGroup: THREE.Group;
  logisticsLayerGroup: THREE.Group;
  roadGroup: THREE.Group;
  edgeMeshes: Map<string, THREE.Mesh>;
  districtFrames: Map<DistrictId, THREE.LineLoop>;
  bridgeBarrierGroup: THREE.Group;
  carInstanced: THREE.InstancedMesh;
  busInstanced: THREE.InstancedMesh;
  truckInstanced: THREE.InstancedMesh;
  interactables: THREE.Object3D[];
} {
  const root = new THREE.Group();
  root.name = `CityWorld_${futureId}`;
  const interactables: THREE.Object3D[] = [];

  // 1. MULTI-PART ARCHITECTURAL PLINTH (5 distinct parts)
  const plinthGroup = new THREE.Group();
  const pw = world.plinthWidth;
  const pd = world.plinthDepth;

  // Part 1: Main concrete/ceramic plinth slab
  const mainSlab = new THREE.Mesh(
    new THREE.BoxGeometry(pw, 1.4, pd),
    materials.plinthMat
  );
  mainSlab.position.set(0, -0.7, 0);
  mainSlab.receiveShadow = true;
  plinthGroup.add(mainSlab);

  // Part 2: Stepped lower brushed titanium under-chassis
  const subSlab = new THREE.Mesh(
    new THREE.BoxGeometry(pw - 1.6, 0.8, pd - 1.6),
    materials.darkTrimMat
  );
  subSlab.position.set(0, -1.7, 0);
  plinthGroup.add(subSlab);

  // Part 3: Warm illuminated perimeter edge light frame
  const edgePts = [
    new THREE.Vector3(-pw * 0.502, 0.02, -pd * 0.502),
    new THREE.Vector3(pw * 0.502, 0.02, -pd * 0.502),
    new THREE.Vector3(pw * 0.502, 0.02, pd * 0.502),
    new THREE.Vector3(-pw * 0.502, 0.02, pd * 0.502),
  ];
  const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePts);
  const edgeLoop = new THREE.LineLoop(edgeGeo, materials.amberEdgeMat);
  plinthGroup.add(edgeLoop);

  // Part 4: Meridian River channel recessed water plane
  const riverMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(pw - 0.6, 5.4),
    materials.waterMat
  );
  riverMesh.rotation.x = -Math.PI * 0.5;
  riverMesh.position.set(0, 0.04, 0);
  plinthGroup.add(riverMesh);

  // Part 5: River embankment retaining walls (North & South)
  const northQuay = new THREE.Mesh(
    new THREE.BoxGeometry(pw - 0.6, 0.26, 0.45),
    materials.titaniumMat
  );
  northQuay.position.set(0, 0.13, -2.85);
  const southQuay = new THREE.Mesh(
    new THREE.BoxGeometry(pw - 0.6, 0.26, 0.45),
    materials.titaniumMat
  );
  southQuay.position.set(0, 0.13, 2.85);
  plinthGroup.add(northQuay, southQuay);

  root.add(plinthGroup);

  // 2. DISTRICT PLATES & HOVER FRAMES
  const districtFrames = new Map<DistrictId, THREE.LineLoop>();
  for (const dist of world.districts) {
    const dw = dist.bounds.maxX - dist.bounds.minX;
    const dd = dist.bounds.maxZ - dist.bounds.minZ;
    const cx = (dist.bounds.minX + dist.bounds.maxX) * 0.5;
    const cz = (dist.bounds.minZ + dist.bounds.maxZ) * 0.5;

    if (dist.id !== 'central_park') {
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(dw - 0.3, 0.16, dd - 0.3),
        materials.darkTrimMat
      );
      plate.position.set(cx, 0.08, cz);
      plate.receiveShadow = true;
      plate.userData = {
        entityType: 'district',
        id: dist.id,
        title: dist.name,
        subtitle: dist.code,
        detail: dist.purpose,
        metric: `Baseline Load: ${dist.baselineDemandMw} MW`,
        worldPos: { x: cx, y: 1.5, z: cz },
        futureId,
      };
      interactables.push(plate);
      root.add(plate);
    }

    const framePts = [
      new THREE.Vector3(dist.bounds.minX + 0.15, 0.22, dist.bounds.minZ + 0.15),
      new THREE.Vector3(dist.bounds.maxX - 0.15, 0.22, dist.bounds.minZ + 0.15),
      new THREE.Vector3(dist.bounds.maxX - 0.15, 0.22, dist.bounds.maxZ - 0.15),
      new THREE.Vector3(dist.bounds.minX + 0.15, 0.22, dist.bounds.maxZ - 0.15),
    ];
    const frameLoop = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(framePts),
      new THREE.LineBasicMaterial({
        color: 0xff5522,
        transparent: true,
        opacity: 0.18,
      })
    );
    districtFrames.set(dist.id, frameLoop);
    root.add(frameLoop);
  }

  // 3. COMPOSITE BUILDINGS (Merged into 3 material buckets + interactive proxy meshes for landmarks)
  const porcelainGeos: THREE.BufferGeometry[] = [];
  const mineralGeos: THREE.BufferGeometry[] = [];
  const glassGeos: THREE.BufferGeometry[] = [];
  const titaniumGeos: THREE.BufferGeometry[] = [];

  for (const b of world.buildings) {
    const baseY = 0.16;
    // Part 1: Primary architectural volume (or podium)
    const podiumH = b.height * 0.22;
    const podiumGeo = new THREE.BoxGeometry(b.width * 1.06, podiumH, b.depth * 1.06);
    podiumGeo.translate(b.x, baseY + podiumH * 0.5, b.z);
    mineralGeos.push(podiumGeo);

    // Part 2: Main tower shaft
    const shaftH = b.height * 0.78;
    const shaftGeo = new THREE.BoxGeometry(b.width, shaftH, b.depth);
    shaftGeo.translate(b.x, baseY + podiumH + shaftH * 0.5, b.z);

    if (b.family === 'glass_tower' || b.facadeStyle === 'curtain_wall') {
      glassGeos.push(shaftGeo);
    } else if (b.family === 'residential_block' || b.family === 'civic_building') {
      porcelainGeos.push(shaftGeo);
    } else {
      mineralGeos.push(shaftGeo);
    }

    // Part 3: Architectural facade fins / recessed framing + rooftop structures
    const roofBaseY = baseY + b.height;
    if (b.roofType === 'crown_spire') {
      const crownGeo = new THREE.BoxGeometry(b.width * 0.65, 0.65, b.depth * 0.65);
      crownGeo.translate(b.x, roofBaseY + 0.32, b.z);
      titaniumGeos.push(crownGeo);

      const spireGeo = new THREE.CylinderGeometry(0.03, 0.08, 1.3, 6);
      spireGeo.translate(b.x, roofBaseY + 1.25, b.z);
      titaniumGeos.push(spireGeo);
    } else if (b.roofType === 'stepped_terrace') {
      const tier1 = new THREE.BoxGeometry(b.width * 0.76, 0.45, b.depth * 0.76);
      tier1.translate(b.x, roofBaseY + 0.22, b.z);
      porcelainGeos.push(tier1);

      const hvac = new THREE.BoxGeometry(b.width * 0.35, 0.28, b.depth * 0.35);
      hvac.translate(b.x + b.width * 0.1, roofBaseY + 0.58, b.z);
      titaniumGeos.push(hvac);
    } else {
      // Rooftop mechanical unit + parapet
      const mech = new THREE.BoxGeometry(b.width * 0.42, 0.32, b.depth * 0.42);
      mech.translate(b.x, roofBaseY + 0.16, b.z);
      titaniumGeos.push(mech);
    }

    // Add landmark selection proxy for raycasting
    if (b.isLandmark) {
      const proxy = new THREE.Mesh(
        new THREE.BoxGeometry(b.width, b.height, b.depth),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      proxy.position.set(b.x, baseY + b.height * 0.5, b.z);
      proxy.userData = {
        entityType: 'building',
        id: b.id,
        title: b.name,
        subtitle: `${b.family.replace(/_/g, ' ').toUpperCase()} · ${b.districtId.toUpperCase()}`,
        detail: `Facade: ${b.facadeStyle.replace(/_/g, ' ')} | Roof: ${b.roofType.replace(/_/g, ' ')}`,
        metric: `Peak Demand: ${b.energyDemandKw} kW`,
        worldPos: { x: b.x, y: baseY + b.height + 0.8, z: b.z },
        futureId,
      };
      interactables.push(proxy);
      root.add(proxy);
    }
  }

  if (porcelainGeos.length > 0) {
    const mergedPorcelain = BufferGeometryUtils.mergeGeometries(porcelainGeos, false);
    const mesh = new THREE.Mesh(mergedPorcelain, materials.porcelainMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (mineralGeos.length > 0) {
    const mergedMineral = BufferGeometryUtils.mergeGeometries(mineralGeos, false);
    const mesh = new THREE.Mesh(mergedMineral, materials.mineralGrayMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (glassGeos.length > 0) {
    const mergedGlass = BufferGeometryUtils.mergeGeometries(glassGeos, false);
    const mesh = new THREE.Mesh(mergedGlass, materials.glassTowerMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
  if (titaniumGeos.length > 0) {
    const mergedTitanium = BufferGeometryUtils.mergeGeometries(titaniumGeos, false);
    const mesh = new THREE.Mesh(mergedTitanium, materials.titaniumMat);
    mesh.castShadow = true;
    root.add(mesh);
  }

  // 4. MERIDIAN CENTRAL SUSPENSION BRIDGE & VIADUCTS (Multi-part composite landmark)
  const bridgeGroup = new THREE.Group();
  const pylonPositions = [
    { x: -0.95, z: -1.9 },
    { x: 0.95, z: -1.9 },
    { x: -0.95, z: 1.9 },
    { x: 0.95, z: 1.9 },
  ];
  for (const pp of pylonPositions) {
    const pylon = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 3.8, 0.28),
      materials.porcelainMat
    );
    pylon.position.set(pp.x, 1.9, pp.z);
    pylon.castShadow = true;
    bridgeGroup.add(pylon);
  }
  // Crossbeams on pylons
  for (const zPos of [-1.9, 1.9]) {
    const crossBeam = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.22, 0.24),
      materials.titaniumMat
    );
    crossBeam.position.set(0, 3.2, zPos);
    bridgeGroup.add(crossBeam);
  }
  root.add(bridgeGroup);

  // Closure barrier indicator on Meridian Central Bridge
  const bridgeBarrierGroup = new THREE.Group();
  const barrierBeacon = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.48, 0),
    new THREE.MeshBasicMaterial({ color: 0xff5522, wireframe: true })
  );
  barrierBeacon.position.set(0, 2.2, 0);
  const barrierGateN = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.25, 0.18),
    new THREE.MeshBasicMaterial({ color: 0xe05a47 })
  );
  barrierGateN.position.set(0, 1.05, -2.5);
  const barrierGateS = barrierGateN.clone();
  barrierGateS.position.set(0, 1.05, 2.5);
  bridgeBarrierGroup.add(barrierBeacon, barrierGateN, barrierGateS);
  root.add(bridgeBarrierGroup);

  // 5. ROAD GRAPH & CUSTOM SHADER FLOW PATHS
  const roadGroup = new THREE.Group();
  const edgeMeshes = new Map<string, THREE.Mesh>();

  for (const edge of world.edges) {
    // Render physical road geometry once per bidirectional pair, plus shader flow ribbons for each directed edge
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(edge.points[0].x, edge.points[0].y, edge.points[0].z),
      new THREE.Vector3(edge.points[1].x, edge.points[1].y, edge.points[1].z),
      new THREE.Vector3(edge.points[2].x, edge.points[2].y, edge.points[2].z)
    );

    const isFwd = edge.id.endsWith('-FWD');
    const tubeRadius = edge.isBridge ? 0.22 : 0.15;
    const flowGeo = new THREE.TubeGeometry(curve, 20, isFwd ? tubeRadius : tubeRadius * 0.65, 6, false);

    const baseHex = futureId === 'A' ? 0x52433e : 0x3b4954;
    const pulseHex = futureId === 'A' ? 0xe05a47 : 0xff5522;
    const flowMat = createFlowShaderMaterial(baseHex, pulseHex);

    const flowMesh = new THREE.Mesh(flowGeo, flowMat);
    flowMesh.position.y = isFwd ? 0.04 : 0.08;
    flowMesh.userData = {
      entityType: 'road',
      id: edge.id,
      title: edge.name,
      subtitle: edge.isBridge
        ? 'PRIMARY CROSS-RIVER ARTERIAL'
        : edge.isAlternateRoute
        ? 'ALTERNATE BYPASS CORRIDOR'
        : 'URBAN COLLECTOR CORRIDOR',
      detail: `Base Capacity: ${edge.baseCapacity} veh/min · Length: ${edge.length}m`,
      metric: `Corridor ID: ${edge.id}`,
      worldPos: {
        x: edge.points[1].x,
        y: edge.points[1].y + 1.2,
        z: edge.points[1].z,
      },
      futureId,
    };

    if (isFwd) {
      interactables.push(flowMesh);
    }
    edgeMeshes.set(edge.id, flowMesh);
    roadGroup.add(flowMesh);
  }
  root.add(roadGroup);

  // 6. PLANTED TREES (InstancedMesh with composite trunk + canopy)
  const treeCount = Math.max(1, world.trees.length);
  const canopyGeo = new THREE.ConeGeometry(0.28, 0.68, 6);
  canopyGeo.translate(0, 0.52, 0);
  const trunkGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.28, 5);
  trunkGeo.translate(0, 0.14, 0);
  const treeMergedGeo = BufferGeometryUtils.mergeGeometries([trunkGeo, canopyGeo], false);
  const treeInstanced = new THREE.InstancedMesh(
    treeMergedGeo,
    materials.treeCanopyMat,
    treeCount
  );
  for (let i = 0; i < world.trees.length; i++) {
    const t = world.trees[i];
    _scratchVec3.set(t.x, 0.16, t.z);
    _scratchQuat.identity();
    _scratchScale.setScalar(t.scale);
    _scratchMat4.compose(_scratchVec3, _scratchQuat, _scratchScale);
    treeInstanced.setMatrixAt(i, _scratchMat4);
    _scratchColor.setHSL(0.36 + t.tint * 0.15, 0.28, 0.32 + t.tint * 0.2);
    treeInstanced.setColorAt(i, _scratchColor);
  }
  treeInstanced.instanceMatrix.needsUpdate = true;
  if (treeInstanced.instanceColor) treeInstanced.instanceColor.needsUpdate = true;
  treeInstanced.computeBoundingSphere();
  root.add(treeInstanced);

  // 7. COMPOSITE INSTANCED VEHICLES (Cars, Buses, Freight Trucks)
  // Car composite geometry (body + cabin)
  const carHull = new THREE.BoxGeometry(0.26, 0.12, 0.52);
  carHull.translate(0, 0.08, 0);
  const carCabin = new THREE.BoxGeometry(0.22, 0.10, 0.26);
  carCabin.translate(0, 0.18, -0.03);
  const carGeo = BufferGeometryUtils.mergeGeometries([carHull, carCabin], false);

  const busHull = new THREE.BoxGeometry(0.32, 0.24, 0.88);
  busHull.translate(0, 0.14, 0);
  const busRoof = new THREE.BoxGeometry(0.26, 0.06, 0.72);
  busRoof.translate(0, 0.28, 0);
  const busGeo = BufferGeometryUtils.mergeGeometries([busHull, busRoof], false);

  const truckCab = new THREE.BoxGeometry(0.30, 0.24, 0.30);
  truckCab.translate(0, 0.14, 0.32);
  const truckTrailer = new THREE.BoxGeometry(0.32, 0.28, 0.68);
  truckTrailer.translate(0, 0.16, -0.20);
  const truckGeo = BufferGeometryUtils.mergeGeometries([truckCab, truckTrailer], false);

  const carMat = new THREE.MeshStandardMaterial({
    color: futureId === 'A' ? 0xf2d1c9 : 0xf4f1ea,
    roughness: 0.3,
    metalness: 0.2,
  });
  const busMat = new THREE.MeshStandardMaterial({
    color: 0xff5522,
    roughness: 0.35,
    metalness: 0.3,
  });
  const truckMat = new THREE.MeshStandardMaterial({
    color: 0xd9a441,
    roughness: 0.4,
    metalness: 0.25,
  });

  const carInstanced = new THREE.InstancedMesh(carGeo, carMat, 60);
  const busInstanced = new THREE.InstancedMesh(busGeo, busMat, 20);
  const truckInstanced = new THREE.InstancedMesh(truckGeo, truckMat, 25);
  carInstanced.frustumCulled = false;
  busInstanced.frustumCulled = false;
  truckInstanced.frustumCulled = false;
  root.add(carInstanced, busInstanced, truckInstanced);

  // 8. CHAPTER 02 & 05 ELEVATED INFRASTRUCTURE GLASS LAYERS
  const infrastructureLayerGroup = new THREE.Group();
  const mobilityLayerGroup = new THREE.Group();
  const energyLayerGroup = new THREE.Group();
  const logisticsLayerGroup = new THREE.Group();

  const createGlassPlane = (yElev: number, borderColor: number) => {
    const g = new THREE.Group();
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(pw - 2, pd - 2),
      new THREE.MeshBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: 0.045,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = yElev;
    g.add(plane);

    const pts = [
      new THREE.Vector3(-(pw - 2) * 0.5, yElev, -(pd - 2) * 0.5),
      new THREE.Vector3((pw - 2) * 0.5, yElev, -(pd - 2) * 0.5),
      new THREE.Vector3((pw - 2) * 0.5, yElev, (pd - 2) * 0.5),
      new THREE.Vector3(-(pw - 2) * 0.5, yElev, (pd - 2) * 0.5),
    ];
    const border = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: borderColor,
        transparent: true,
        opacity: 0.45,
      })
    );
    g.add(border);
    return g;
  };

  mobilityLayerGroup.add(createGlassPlane(2.8, 0xff5522));
  energyLayerGroup.add(createGlassPlane(4.4, 0x38bdf8));
  logisticsLayerGroup.add(createGlassPlane(6.0, 0xf59e0b));

  // Populate Energy Layer with translucent demand columns and substation links
  for (const dist of world.districts) {
    const colH = Math.max(1.2, dist.baselineDemandMw * 0.085);
    const colMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.65, colH, 16),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      })
    );
    colMesh.position.set(dist.center.x, 4.4 + colH * 0.5, dist.center.z);
    energyLayerGroup.add(colMesh);

    // Feeder line from Substation (6, 4.4, 11) to district center
    const feederPts = [
      new THREE.Vector3(6, 4.4, 11),
      new THREE.Vector3((6 + dist.center.x) * 0.5, 5.2, (11 + dist.center.z) * 0.5),
      new THREE.Vector3(dist.center.x, 4.4, dist.center.z),
    ];
    const feederCurve = new THREE.QuadraticBezierCurve3(
      feederPts[0],
      feederPts[1],
      feederPts[2]
    );
    const feederLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(feederCurve.getPoints(20)),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
    );
    energyLayerGroup.add(feederLine);
  }

  // Populate Logistics Layer with Harbor-to-Hub elevated freight arcs
  const logisticsTargets = [
    { x: 13, z: -13 },
    { x: 2, z: -13 },
    { x: -8, z: -13 },
    { x: 15, z: 12 },
  ];
  for (const lt of logisticsTargets) {
    const arc = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-12, 6.0, 11),
      new THREE.Vector3((-12 + lt.x) * 0.5, 8.2, (11 + lt.z) * 0.5),
      new THREE.Vector3(lt.x, 6.0, lt.z)
    );
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(arc, 24, 0.12, 6, false),
      createFlowShaderMaterial(0x78552b, 0xf59e0b)
    );
    logisticsLayerGroup.add(tube);
  }

  // Infrastructure interactive nodes
  for (const inf of world.infrastructure) {
    const markerGroup = new THREE.Group();
    const yBase =
      inf.layer === 'mobility' ? 2.8 : inf.layer === 'energy' ? 4.4 : 6.0;
    const colorHex =
      inf.layer === 'mobility'
        ? 0xff5522
        : inf.layer === 'energy'
        ? 0x38bdf8
        : 0xf59e0b;

    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.45, 0),
      new THREE.MeshBasicMaterial({ color: colorHex })
    );
    beacon.position.set(inf.x, yBase + 0.5, inf.z);

    // Vertical drop stem connecting elevated layer to physical city node
    const stemPts = [
      new THREE.Vector3(inf.x, 0.25, inf.z),
      new THREE.Vector3(inf.x, yBase + 0.5, inf.z),
    ];
    const stem = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(stemPts),
      new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.55 })
    );

    beacon.userData = {
      entityType: 'infrastructure',
      id: inf.id,
      title: inf.name,
      subtitle: `${inf.layer.toUpperCase()} NODE · ${inf.capacityLabel}`,
      detail: inf.dependencySummary,
      metric: `Connected Nodes: ${inf.connectedNodeIds.join(', ')}`,
      worldPos: { x: inf.x, y: yBase + 0.8, z: inf.z },
      futureId,
    };
    interactables.push(beacon);
    markerGroup.add(beacon, stem);

    if (inf.layer === 'mobility') mobilityLayerGroup.add(markerGroup);
    else if (inf.layer === 'energy') energyLayerGroup.add(markerGroup);
    else logisticsLayerGroup.add(markerGroup);
  }

  infrastructureLayerGroup.add(
    mobilityLayerGroup,
    energyLayerGroup,
    logisticsLayerGroup
  );
  root.add(infrastructureLayerGroup);

  return {
    root,
    infrastructureLayerGroup,
    mobilityLayerGroup,
    energyLayerGroup,
    logisticsLayerGroup,
    roadGroup,
    edgeMeshes,
    districtFrames,
    bridgeBarrierGroup,
    carInstanced,
    busInstanced,
    truckInstanced,
    interactables,
  };
}

export const ParallelWorldCanvas: React.FC<ParallelWorldCanvasProps> = React.memo(
  ({ onWebGLFailure }) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const onWebGLFailureRef = useRef(onWebGLFailure);
    onWebGLFailureRef.current = onWebGLFailure;

    useEffect(() => {
      const container = mountRef.current;
      if (!container) return;

      // 1. Software-WebGL probe and WebGL2 availability check
      let isSoftwareGl = false;
      try {
        const probeCanvas = document.createElement('canvas');
        const gl =
          probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) {
          onWebGLFailureRef.current();
          return;
        }
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
          gpu
        );
      } catch {
        onWebGLFailureRef.current();
        return;
      }

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !isSoftwareGl,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        });
      } catch {
        onWebGLFailureRef.current();
        return;
      }

      const getStageWidth = () => Math.max(300, container.clientWidth || window.innerWidth);
      const getStageHeight = () => Math.max(300, container.clientHeight || window.innerHeight);

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      );
      renderer.setSize(getStageWidth(), getStageHeight());
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      renderer.domElement.setAttribute('data-testid', 'parallel-webgl-canvas');
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.touchAction = 'pan-y';
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const handleContextLost = (e: Event) => {
        e.preventDefault();
        onWebGLFailureRef.current();
      };
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

      // 2. Scene, Studio RoomEnvironment & Lighting Rig
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101315);
      scene.fog = new THREE.FogExp2(0x101315, 0.0052);

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;
      pmremGenerator.dispose();

      const camera = new THREE.PerspectiveCamera(
        36,
        getStageWidth() / getStageHeight(),
        0.5,
        260
      );
      camera.position.set(-20.5, 14.8, 33.5);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 2.2, -1);
      controls.enableDamping = !isSoftwareGl;
      controls.dampingFactor = 0.06;
      controls.maxPolarAngle = Math.PI * 0.46;
      controls.minPolarAngle = 0.15;
      controls.minDistance = 12;
      controls.maxDistance = 95;
      controls.enableZoom = false; // Never hijack mouse wheel over the hero stage
      controls.update();

    // Balanced 3-point architectural studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xe4eefb, 0x262a34, 1.55);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e0, 3.2);
    keyLight.position.set(28, 46, 28);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 5;
    keyLight.shadow.camera.far = 120;
    const d = 42;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9cb8e8, 1.35);
    fillLight.position.set(-28, 30, 22);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff6a33, 1.45);
    rimLight.position.set(-34, 20, -28);
    scene.add(rimLight);

    // Studio floor with radial contact shadow beneath plinth
    const studioFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(240, 240),
      new THREE.MeshStandardMaterial({
        color: 0x090a0c,
        roughness: 0.88,
        metalness: 0.12,
      })
    );
    studioFloor.rotation.x = -Math.PI * 0.5;
    studioFloor.position.y = -2.4;
    studioFloor.receiveShadow = true;
    scene.add(studioFloor);

    // 3. Shared Procedural Textures & Materials
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const windowTex = createWindowGridTexture(maxAniso);
    const bumpTex = createMicroBumpTexture(maxAniso);

    const materials = {
      porcelainMat: new THREE.MeshStandardMaterial({
        color: 0xd8d3c8,
        roughness: 0.52,
        metalness: 0.15,
        map: windowTex,
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffe4bc),
        emissiveIntensity: 0.38,
        bumpMap: bumpTex,
        bumpScale: 0.015,
      }),
      mineralGrayMat: new THREE.MeshStandardMaterial({
        color: 0xb8c0ca,
        roughness: 0.42,
        metalness: 0.25,
        map: windowTex,
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffd7a8),
        emissiveIntensity: 0.55,
      }),
      titaniumMat: new THREE.MeshStandardMaterial({
        color: 0x8d95a0,
        roughness: 0.25,
        metalness: 0.72,
        emissive: 0x1a1d22,
        emissiveIntensity: 0.25,
      }),
      glassTowerMat: new THREE.MeshStandardMaterial({
        color: 0xe2ecf5,
        roughness: 0.16,
        metalness: 0.65,
        map: windowTex,
        emissiveMap: windowTex,
        emissive: new THREE.Color(0xffe0b5),
        emissiveIntensity: 0.68,
      }),
      plinthMat: new THREE.MeshStandardMaterial({
        color: 0x20242c,
        roughness: 0.65,
        metalness: 0.22,
        bumpMap: bumpTex,
        bumpScale: 0.02,
      }),
      darkTrimMat: new THREE.MeshStandardMaterial({
        color: 0x161920,
        roughness: 0.58,
        metalness: 0.35,
      }),
      waterMat: new THREE.MeshStandardMaterial({
        color: 0x142638,
        roughness: 0.14,
        metalness: 0.6,
        emissive: 0x0b1929,
        emissiveIntensity: 0.45,
      }),
      parkGrassMat: new THREE.MeshStandardMaterial({
        color: 0x2d4238,
        roughness: 0.8,
        metalness: 0.05,
      }),
      treeTrunkMat: new THREE.MeshStandardMaterial({
        color: 0x4a3e33,
        roughness: 0.9,
      }),
      treeCanopyMat: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
        metalness: 0.05,
      }),
      amberEdgeMat: new THREE.LineBasicMaterial({
        color: 0xff5522,
      }),
    };

    // 4. Build Synchronized Dual Cities (Future A & Future B) from identical seeded world
    const storeState = useParallelStore.getState();
    const cityA = buildCityArchitectureGroup(storeState.world, materials, 'A');
    const cityB = buildCityArchitectureGroup(storeState.world, materials, 'B');
    scene.add(cityA.root, cityB.root);

    // 5. Chapter 05 Causal Dependency Arcs Group
    const causalArcGroup = new THREE.Group();
    const causalArcMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < CAUSAL_SEQUENCE.length; i++) {
      const step = CAUSAL_SEQUENCE[i];
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(step.fromPos.x, step.fromPos.y, step.fromPos.z),
        new THREE.Vector3(
          (step.fromPos.x + step.toPos.x) * 0.5,
          Math.max(step.fromPos.y, step.toPos.y) + 3.2,
          (step.fromPos.z + step.toPos.z) * 0.5
        ),
        new THREE.Vector3(step.toPos.x, step.toPos.y, step.toPos.z)
      );
      const arcMat = createFlowShaderMaterial(0x7c2d12, 0xff5522);
      const arcMesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 28, 0.16, 8, false),
        arcMat
      );
      causalArcMeshes.push(arcMesh);
      causalArcGroup.add(arcMesh);
    }
    scene.add(causalArcGroup);

    // Pre-warm shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

      // 6. Pointer Parallax & Raycast Selection
      const raycaster = new THREE.Raycaster();
      const pointerNdc = new THREE.Vector2(0, 0);
      let lastRaycastMs = 0;
      let userOrbiting = false;
      let hasManualOrbit = false;
      let lastCameraResetTick = useParallelStore.getState().cameraResetTick;
      let isHeroInViewport = true;

      const handleControlStart = () => {
        userOrbiting = true;
        hasManualOrbit = true;
      };
      const handleControlEnd = () => {
        userOrbiting = false;
      };
      controls.addEventListener('start', handleControlStart);
      controls.addEventListener('end', handleControlEnd);

      const onPointerMove = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        const now = performance.now();
        if (now - lastRaycastMs < 65) return;
        lastRaycastMs = now;

        raycaster.setFromCamera(pointerNdc, camera);
        const st = useParallelStore.getState();
        const isDualMode =
          st.heroState === 'interactive' &&
          (st.heroMode === 'disrupt' || st.heroMode === 'simulate');
        const targets = isDualMode
          ? [...cityA.interactables, ...cityB.interactables]
          : cityA.interactables;

        const hits = raycaster.intersectObjects(targets, false);
        if (hits.length > 0) {
          const data = hits[0].object.userData;
          if (data.entityType === 'district') {
            st.setHoveredDistrictId(data.id);
          }
          if (data.futureId) {
            st.setHoveredWorld(data.futureId);
          }
          renderer.domElement.style.cursor = 'pointer';
        } else {
          st.setHoveredDistrictId(null);
          st.setHoveredWorld(null);
          renderer.domElement.style.cursor = 'grab';
        }
      };

      const onPointerClick = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointerNdc, camera);
        const st = useParallelStore.getState();
        const isDualMode =
          st.heroState === 'interactive' &&
          (st.heroMode === 'disrupt' || st.heroMode === 'simulate');
        const targets = isDualMode
          ? [...cityA.interactables, ...cityB.interactables]
          : cityA.interactables;

        const hits = raycaster.intersectObjects(targets, false);
        if (hits.length > 0) {
          const data = hits[0].object.userData;
          if (data && data.title) {
            const info: SelectedEntityInfo = {
              type: data.entityType,
              id: data.id,
              title: data.title,
              subtitle: data.subtitle,
              detail: data.detail,
              metric: data.metric,
              worldPos: data.worldPos,
            };
            st.setSelectedEntity(info);
            if (data.entityType === 'road') {
              st.setHighlightedRoadId(data.id);
            }
          }
        }
      };

      const onDoubleClick = () => {
        const st = useParallelStore.getState();
        if (st.selectedEntity) {
          hasManualOrbit = false;
          st.setPresentationMode('exploration');
        }
      };

      renderer.domElement.addEventListener('pointermove', onPointerMove);
      renderer.domElement.addEventListener('click', onPointerClick);
      renderer.domElement.addEventListener('dblclick', onDoubleClick);

      const onResize = () => {
        const w = getStageWidth();
        const h = getStageHeight();
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderer.render(scene, camera);
      };
      window.addEventListener('resize', onResize);

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          onResize();
        });
        resizeObserver.observe(container);
      }

      let intersectionObserver: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              isHeroInViewport = entry.isIntersecting;
            }
          },
          { threshold: 0.02 }
        );
        intersectionObserver.observe(container);
      }

      // 7. Animation & Simulation Loop (with Software-WebGL fenceSync guard & offscreen pause)
      const startTimeMs = performance.now();
      let prevTimeMs = startTimeMs;
      let frameId = 0;
      let simPlayAccumulator = 0;
      let lastLabelSyncTime = -1;

      function afterDraw(cb: () => void) {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (gl && typeof gl.fenceSync === 'function') {
          const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          gl.flush();
          const poll = () => {
            const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
            if (status === gl.UNSIGNALED) {
              frameId = window.setTimeout(poll, 5);
            } else {
              if (sync) gl.deleteSync(sync);
              frameId = window.setTimeout(cb, 80);
            }
          };
          frameId = window.setTimeout(poll, 5);
        } else {
          frameId = window.setTimeout(cb, 80);
        }
      }

      function updateVehiclesForCity(
        cityObj: ReturnType<typeof buildCityArchitectureGroup>,
        vehicles: ReturnType<
          typeof useParallelStore.getState
        >['timeline']['futureA'][0]['vehicles'],
        elapsed: number,
        roadElevOffset: number
      ) {
        let carIdx = 0;
        let busIdx = 0;
        let truckIdx = 0;

        for (let i = 0; i < vehicles.length; i++) {
          const v = vehicles[i];
          const microDrift = ((elapsed * v.speedRatio * 0.45) % 0.6) - 0.3;
          const vx = v.x + Math.sin(v.headingRad) * microDrift;
          const vz = v.z + Math.cos(v.headingRad) * microDrift;
          const vy = v.y + 0.08 + roadElevOffset;

          _scratchVec3.set(vx, vy, vz);
          _scratchEuler.set(0, v.headingRad, 0);
          _scratchQuat.setFromEuler(_scratchEuler);
          _scratchScale.set(1, 1, 1);
          _scratchMat4.compose(_scratchVec3, _scratchQuat, _scratchScale);

          if (v.vehicleType === 'bus' && busIdx < 20) {
            cityObj.busInstanced.setMatrixAt(busIdx++, _scratchMat4);
          } else if (v.vehicleType === 'delivery' && truckIdx < 25) {
            cityObj.truckInstanced.setMatrixAt(truckIdx++, _scratchMat4);
          } else if (carIdx < 60) {
            cityObj.carInstanced.setMatrixAt(carIdx++, _scratchMat4);
          }
        }

        _scratchScale.set(0, 0, 0);
        _scratchMat4.compose(_scratchVec3, _scratchQuat, _scratchScale);
        for (let i = carIdx; i < 60; i++) cityObj.carInstanced.setMatrixAt(i, _scratchMat4);
        for (let i = busIdx; i < 20; i++) cityObj.busInstanced.setMatrixAt(i, _scratchMat4);
        for (let i = truckIdx; i < 25; i++) cityObj.truckInstanced.setMatrixAt(i, _scratchMat4);

        cityObj.carInstanced.instanceMatrix.needsUpdate = true;
        cityObj.busInstanced.instanceMatrix.needsUpdate = true;
        cityObj.truckInstanced.instanceMatrix.needsUpdate = true;
      }

      function tick() {
        const nowMs = performance.now();
        const dt = Math.min(0.45, Math.max(0.016, (nowMs - prevTimeMs) / 1000));
        prevTimeMs = nowMs;

        // Suspend unnecessary GPU & simulation work while hero is scrolled offscreen or covered by the warm-white curtain
        const stCheck = useParallelStore.getState();
        const isCoveredByCurtain =
          !stCheck.isStageExpanded &&
          typeof window !== 'undefined' &&
          window.scrollY > Math.max(600, window.innerHeight * 0.92);
        if (!isHeroInViewport || isCoveredByCurtain) {
          frameId = window.setTimeout(tick, 200);
          return;
        }

        const elapsed = (nowMs - startTimeMs) / 1000;
        const st = useParallelStore.getState();
        const isInteractive = st.heroState === 'interactive';
        const effectiveMode = isInteractive ? st.heroMode : 'explore';

        // Atmospheric opening sequence: ramp architectural window & street illumination over first ~2.0s
        const introAwaken = isSoftwareGl
          ? 1.0
          : Math.min(1.0, 0.35 + (elapsed / 2.0) * 0.65);
        materials.porcelainMat.emissiveIntensity = 0.38 * introAwaken;
        materials.mineralGrayMat.emissiveIntensity = 0.55 * introAwaken;
        materials.glassTowerMat.emissiveIntensity = 0.68 * introAwaken;

        // Clear manual orbit lock when mode changes or Reset View is triggered
        if (st.cameraResetTick !== lastCameraResetTick) {
          lastCameraResetTick = st.cameraResetTick;
          hasManualOrbit = false;
          userOrbiting = false;
        }

        // Advance simulation playback clock if playing
        if (st.isPlaying) {
          simPlayAccumulator += dt * 35;
          if (simPlayAccumulator >= 5) {
            const nextMin = st.simTimeMinutes + Math.floor(simPlayAccumulator);
            simPlayAccumulator = 0;
            if (nextMin >= 1320) {
              st.setSimTimeMinutes(360);
            } else {
              st.setSimTimeMinutes(nextMin);
            }
          }
        }

        const causalStep = CAUSAL_SEQUENCE[st.causalStepIndex];
        const choreo = computeModeChoreography(effectiveMode, {
          heroState: st.heroState,
          inspectionTarget:
            st.presentationMode === 'exploration' && st.selectedEntity
              ? st.selectedEntity.worldPos
              : null,
          causalTarget:
            isInteractive && effectiveMode === 'explain'
              ? causalStep.cameraTarget
              : null,
          comparisonBias: isInteractive ? st.comparisonBias : 0,
          aspectRatio: camera.aspect,
        });

        // Only allow wheel zoom when expanded fullscreen so normal page wheel scrolling is never hijacked
        controls.enableZoom = st.isStageExpanded;
        const camLambda = isSoftwareGl ? 16.0 : 5.2;

        if (!userOrbiting && !hasManualOrbit) {
          // Subtle living drift + pointer parallax
          const driftX = Math.sin(elapsed * 0.22) * 0.45;
          const driftZ = Math.cos(elapsed * 0.18) * 0.35;
          const px = choreo.pose.position.x + pointerNdc.x * 1.15 + driftX;
          const py = choreo.pose.position.y + pointerNdc.y * 0.65;
          const pz = choreo.pose.position.z + driftZ;

          camera.position.x = dampValue(camera.position.x, px, camLambda, dt);
          camera.position.y = dampValue(camera.position.y, py, camLambda, dt);
          camera.position.z = dampValue(camera.position.z, pz, camLambda, dt);

          controls.target.x = dampValue(
            controls.target.x,
            choreo.pose.target.x,
            camLambda,
            dt
          );
          controls.target.y = dampValue(
            controls.target.y,
            choreo.pose.target.y,
            camLambda,
            dt
          );
          controls.target.z = dampValue(
            controls.target.z,
            choreo.pose.target.z,
            camLambda,
            dt
          );
          camera.fov = dampValue(camera.fov, choreo.pose.fov, camLambda, dt);
          camera.updateProjectionMatrix();
        }
        controls.update();

        keyLight.intensity = (1.5 + choreo.studioLightReveal * 1.85) * introAwaken;
        rimLight.intensity = 1.45 * introAwaken;

        // Position Dual Cities (Baseline Future A left, Intervention Future B right)
        const splitDist = 26.5;
        const targetAx = -splitDist * choreo.splitFactor;
        const targetBx = splitDist * choreo.splitFactor;

        cityA.root.position.x = dampValue(
          cityA.root.position.x,
          targetAx,
          camLambda,
          dt
        );
        cityB.root.position.x = dampValue(
          cityB.root.position.x,
          targetBx,
          camLambda,
          dt
        );

        // Show City B during split (Disrupt & Simulate modes) or subtle realignment (Outcome mode)
        cityB.root.visible =
          isInteractive &&
          (choreo.splitFactor > 0.01 || choreo.realignGhostAlpha > 0.02);

        // Mode 02 (Systems) & Mode 05 (Explain Cutaway) vertical layer elevation
        const isLayerMode =
          isInteractive && (effectiveMode === 'systems' || st.cutawayMode);
        cityA.infrastructureLayerGroup.visible = isLayerMode;
        cityB.infrastructureLayerGroup.visible =
          isInteractive && st.cutawayMode && cityB.root.visible;

        const targetLayerScaleY = isLayerMode ? 1.0 : 0.01;
        cityA.infrastructureLayerGroup.scale.y = dampValue(
          cityA.infrastructureLayerGroup.scale.y,
          targetLayerScaleY,
          6.0,
          dt
        );

        // Toggle visibility of specific layers in Systems mode vs all layers in Cutaway mode
        cityA.mobilityLayerGroup.visible =
          st.cutawayMode || st.invisibleLayer === 'mobility';
        cityA.energyLayerGroup.visible =
          st.cutawayMode || st.invisibleLayer === 'energy';
        cityA.logisticsLayerGroup.visible =
          st.cutawayMode || st.invisibleLayer === 'logistics';

        // Exploded cutaway road elevation in Explain mode
        const targetRoadY = isInteractive && st.cutawayMode ? 1.45 : 0;
        cityA.roadGroup.position.y = dampValue(
          cityA.roadGroup.position.y,
          targetRoadY,
          5.5,
          dt
        );

        // Update Causal Dependency Arcs in Mode 05 (Explain)
        causalArcGroup.visible = isInteractive && effectiveMode === 'explain';
        if (causalArcGroup.visible) {
          for (let i = 0; i < causalArcMeshes.length; i++) {
            const m = causalArcMeshes[i];
            const mat = m.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = elapsed;
            const isCurrent = i === st.causalStepIndex;
            const isPast = i < st.causalStepIndex;
            mat.uniforms.uOpacity.value = isCurrent ? 0.95 : isPast ? 0.35 : 0.1;
          }
        }

        // Update Road Shaders, Bridge Closure Beacons & Vehicles from deterministic snapshots
        const { snapshotA, snapshotB } = st.getCurrentSnapshots();
        const isDisruptionActive =
          isInteractive &&
          (effectiveMode === 'disrupt' ||
            effectiveMode === 'simulate' ||
            effectiveMode === 'explain');
        const bridgeClosedNow =
          st.scenarioParams.bridgeClosed &&
          st.simTimeMinutes >= 450 &&
          isDisruptionActive;

        cityA.bridgeBarrierGroup.visible = bridgeClosedNow;
        cityB.bridgeBarrierGroup.visible = bridgeClosedNow;
        if (bridgeClosedNow) {
          cityA.bridgeBarrierGroup.children[0].rotation.y = elapsed * 1.5;
          cityB.bridgeBarrierGroup.children[0].rotation.y = elapsed * 1.5;
        }

        // In Outcome mode, City A displays the optimized Future B flow state on the unified plinth
        const primarySnapshot =
          isInteractive && effectiveMode === 'outcome' ? snapshotB : snapshotA;

        const updateCityEdges = (
          cityObj: ReturnType<typeof buildCityArchitectureGroup>,
          snap: typeof snapshotA
        ) => {
          for (const [edgeId, mesh] of cityObj.edgeMeshes.entries()) {
            const mat = mesh.material as THREE.ShaderMaterial;
            const eState = snap.edgeStates[edgeId];
            mat.uniforms.uTime.value = elapsed;
            if (eState) {
              mat.uniforms.uCongestion.value =
                !isInteractive || effectiveMode === 'explore'
                  ? 0.14
                  : eState.congestionLevel;
              mat.uniforms.uClosed.value =
                eState.closed && isDisruptionActive ? 1.0 : 0.0;
            }
            const isHighlighted =
              isInteractive &&
              (st.highlightedRoadId === edgeId ||
                (effectiveMode === 'explain' &&
                  causalStep.highlightEdgeIds.includes(edgeId)));
            mat.uniforms.uOpacity.value =
              (!isInteractive || effectiveMode === 'explore'
                ? 0.32
                : isHighlighted
                ? 1.0
                : 0.78) * introAwaken;
          }

          for (const [distId, frame] of cityObj.districtFrames.entries()) {
            const mat = frame.material as THREE.LineBasicMaterial;
            const isHovered =
              st.hoveredDistrictId === distId ||
              (isInteractive &&
                effectiveMode === 'explain' &&
                causalStep.highlightDistrictId === distId);
            mat.opacity = isHovered
              ? 0.85
              : !isInteractive || effectiveMode === 'explore'
              ? 0.08
              : 0.16;
          }
        };

        updateCityEdges(cityA, primarySnapshot);
        if (cityB.root.visible) {
          updateCityEdges(cityB, snapshotB);
        }

        updateVehiclesForCity(
          cityA,
          primarySnapshot.vehicles,
          elapsed,
          cityA.roadGroup.position.y
        );
        if (cityB.root.visible) {
          updateVehiclesForCity(
            cityB,
            snapshotB.vehicles,
            elapsed,
            cityB.roadGroup.position.y
          );
        }

        // Throttled World-to-Stage projection for anchored HTML labels (<= 8Hz)
        if (elapsed - lastLabelSyncTime > 0.12) {
          lastLabelSyncTime = elapsed;
          const stageW = getStageWidth();
          const stageH = getStageHeight();
          const nextLabels: Record<string, { x: number; y: number; visible: boolean }> = {};

          const projectPoint = (id: string, wx: number, wy: number, wz: number) => {
            _scratchVec3B.set(wx, wy, wz);
            _scratchVec3B.project(camera);
            const sx = ((_scratchVec3B.x + 1) * 0.5) * stageW;
            const sy = (-(_scratchVec3B.y - 1) * 0.5) * stageH;
            const inBounds =
              _scratchVec3B.z >= -1 &&
              _scratchVec3B.z <= 1 &&
              sx >= 40 &&
              sx <= stageW - 40 &&
              sy >= 55 &&
              sy <= stageH - 130;
            nextLabels[id] = { x: Math.round(sx), y: Math.round(sy), visible: inBounds };
          };

          if (st.selectedEntity) {
            const p = st.selectedEntity.worldPos;
            projectPoint('selected', p.x + cityA.root.position.x, p.y, p.z);
          }

          if (isInteractive && effectiveMode === 'systems') {
            for (const inf of st.world.infrastructure) {
              if (inf.layer === st.invisibleLayer) {
                const yElev =
                  inf.layer === 'mobility' ? 3.3 : inf.layer === 'energy' ? 4.9 : 6.5;
                projectPoint(inf.id, inf.x, yElev, inf.z);
              }
            }
          }

          if (isInteractive && effectiveMode === 'explain') {
            const cs = CAUSAL_SEQUENCE[st.causalStepIndex];
            projectPoint('causal_active', cs.toPos.x, cs.toPos.y + 1.2, cs.toPos.z);
          }

          const prevLabels = st.projectedLabels;
          const nextKeys = Object.keys(nextLabels);
          const prevKeys = Object.keys(prevLabels);
          let labelsChanged = nextKeys.length !== prevKeys.length;
          if (!labelsChanged) {
            for (const k of nextKeys) {
              const a = nextLabels[k];
              const b = prevLabels[k];
              if (
                !b ||
                a.visible !== b.visible ||
                Math.abs(a.x - b.x) > 1 ||
                Math.abs(a.y - b.y) > 1
              ) {
                labelsChanged = true;
                break;
              }
            }
          }
          if (labelsChanged) {
            st.setProjectedLabels(nextLabels);
          }
        }

        renderer.render(scene, camera);

        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      }

      frameId = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
        window.removeEventListener('resize', onResize);
        resizeObserver?.disconnect();
        intersectionObserver?.disconnect();
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('click', onPointerClick);
        renderer.domElement.removeEventListener('dblclick', onDoubleClick);
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        controls.dispose();
        renderer.dispose();
      };
    }, []);

    return (
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden"
        aria-label="Interactive 3D urban simulation model of Meridian City"
      />
    );
  }
);
]]>
    </file>
    <file path="src/app/(parallel)/parallel/rendering/WorkflowTwinCanvas.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  WORKFLOW_CORRIDORS,
  WORKFLOW_HUBS,
  WORKFLOW_LAYERS,
  WorkflowStageIndex,
  computeWorkflowStageChoreography,
} from '../simulation/workflowTwinMath';
import { dampValue } from '../simulation/cameraMath';

export interface ProjectedHubCoord {
  x: number;
  y: number;
  visible: boolean;
}

interface WorkflowTwinCanvasProps {
  activeStage: WorkflowStageIndex;
  selectedHubId: string | null;
  hoveredHubId: string | null;
  activeLayerFilter: 'all' | 'mobility' | 'energy' | 'logistics';
  resetViewTick: number;
  replayAssemblyTick: number;
  onSelectHub: (hubId: string | null) => void;
  onHoverHub: (hubId: string | null) => void;
  onProjectedHubsUpdate: (coords: Record<string, ProjectedHubCoord>) => void;
  onWebGLFailure: () => void;
}

const PULSE_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const PULSE_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform float uDensity;
  uniform vec3 uBaseColor;
  uniform vec3 uPulseColor;
  varying vec2 vUv;

  void main() {
    if (uOpacity <= 0.01) discard;
    float wave = fract(vUv.x * uDensity - uTime * uSpeed);
    float pulse = smoothstep(0.0, 0.18, wave) * (1.0 - smoothstep(0.18, 0.52, wave));
    vec3 col = mix(uBaseColor, uPulseColor, pulse * 0.9);
    float alpha = uOpacity * (0.42 + pulse * 0.58);
    gl_FragColor = vec4(col, alpha);
  }
`;

const WATER_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const WATER_FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float ripple1 = sin(vUv.x * 42.0 + uTime * 1.4) * 0.5 + 0.5;
    float ripple2 = cos(vUv.y * 18.0 - uTime * 0.9) * 0.5 + 0.5;
    float band = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    vec3 shallow = vec3(0.74, 0.80, 0.83);
    vec3 channel = vec3(0.60, 0.69, 0.74);
    vec3 highlight = vec3(0.88, 0.91, 0.92);
    vec3 col = mix(shallow, channel, band);
    col = mix(col, highlight, ripple1 * ripple2 * 0.14);
    gl_FragColor = vec4(col, 0.95);
  }
`;

function createMicroStoneBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 128, 128);
    let seed = 42109;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let y = 0; y < 128; y += 2) {
      for (let x = 0; x < 128; x += 2) {
        const v = Math.floor(118 + rand() * 20);
        ctx.fillStyle = `rgb(${v},${v},${v})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
    ctx.strokeStyle = '#6e6e6e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 128; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 5);
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
    grad.addColorStop(0, 'rgba(23, 26, 28, 0.34)');
    grad.addColorStop(0.6, 'rgba(23, 26, 28, 0.14)');
    grad.addColorStop(1, 'rgba(23, 26, 28, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

export const WorkflowTwinCanvas: React.FC<WorkflowTwinCanvasProps> = ({
  activeStage,
  selectedHubId,
  hoveredHubId,
  activeLayerFilter,
  resetViewTick,
  replayAssemblyTick,
  onSelectHub,
  onHoverHub,
  onProjectedHubsUpdate,
  onWebGLFailure,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const activeStageRef = useRef<WorkflowStageIndex>(activeStage);
  activeStageRef.current = activeStage;

  const selectedHubIdRef = useRef<string | null>(selectedHubId);
  selectedHubIdRef.current = selectedHubId;

  const hoveredHubIdRef = useRef<string | null>(hoveredHubId);
  hoveredHubIdRef.current = hoveredHubId;

  const activeLayerFilterRef = useRef(activeLayerFilter);
  activeLayerFilterRef.current = activeLayerFilter;

  const onSelectHubRef = useRef(onSelectHub);
  onSelectHubRef.current = onSelectHub;

  const onHoverHubRef = useRef(onHoverHub);
  onHoverHubRef.current = onHoverHub;

  const onProjectedHubsUpdateRef = useRef(onProjectedHubsUpdate);
  onProjectedHubsUpdateRef.current = onProjectedHubsUpdate;

  const resetCameraFnRef = useRef<(() => void) | null>(null);
  const replayAssemblyFnRef = useRef<(() => void) | null>(null);
  const wakeUpLoopFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    wakeUpLoopFnRef.current?.();
  }, [activeStage, selectedHubId, hoveredHubId, activeLayerFilter]);

  useEffect(() => {
    if (resetViewTick > 0) {
      resetCameraFnRef.current?.();
      wakeUpLoopFnRef.current?.();
    }
  }, [resetViewTick]);

  useEffect(() => {
    if (replayAssemblyTick > 0) {
      replayAssemblyFnRef.current?.();
      wakeUpLoopFnRef.current?.();
    }
  }, [replayAssemblyTick]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      onWebGLFailure();
      return;
    }

    const gl = renderer.getContext();
    if (!gl) {
      onWebGLFailure();
      return;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software/i.test(rendererStr);

    const width = Math.max(320, container.clientWidth || 640);
    const height = Math.max(280, container.clientHeight || 440);

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.cursor = 'grab';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      onWebGLFailure();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    // Studio Scene & Warm Alabaster Atmosphere matching PARALLEL V2 Light Section
    const scene = new THREE.Scene();
    const bgHex = 0xefece6;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.015);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Camera & OrbitControls
    const initialChoreo = computeWorkflowStageChoreography(activeStageRef.current, {
      isMobile: width < 640,
    });
    const camera = new THREE.PerspectiveCamera(
      initialChoreo.fov,
      width / height,
      0.5,
      90
    );
    camera.position.set(
      initialChoreo.cameraPosition.x,
      initialChoreo.cameraPosition.y,
      initialChoreo.cameraPosition.z
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false; // Never hijack vertical page scroll
    controls.enablePan = false;
    controls.minPolarAngle = 0.32;
    controls.maxPolarAngle = 1.28;
    controls.minAzimuthAngle = -0.95;
    controls.maxAzimuthAngle = 0.95;
    controls.target.set(
      initialChoreo.cameraTarget.x,
      initialChoreo.cameraTarget.y,
      initialChoreo.cameraTarget.z
    );
    controls.update();

    let userInteracting = false;
    let userOrbitHoldTimer = 0;
    const onControlStart = () => {
      userInteracting = true;
      userOrbitHoldTimer = 3.2;
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onControlEnd = () => {
      userInteracting = false;
      renderer.domElement.style.cursor = 'grab';
    };
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('end', onControlEnd);

    // Three-Point Architectural Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd8d3c8, 0.95);
    hemiLight.position.set(0, 18, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7eb, 1.45);
    keyLight.position.set(11, 17, 12);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 2;
      keyLight.shadow.camera.far = 38;
      const d = 10.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdbeafe, 0.55);
    rimLight.position.set(-12, 10, -11);
    scene.add(rimLight);

    // Shared Textures & Materials
    const bumpTex = createMicroStoneBumpTexture();
    const shadowDiscTex = createContactShadowTexture();

    const plinthSubBaseMat = new THREE.MeshStandardMaterial({
      color: 0x24282b,
      roughness: 0.78,
      metalness: 0.12,
    });
    const plinthStoneMat = new THREE.MeshStandardMaterial({
      color: 0xd6d2c9,
      roughness: 0.82,
      metalness: 0.05,
      bumpMap: bumpTex,
      bumpScale: 0.015,
    });
    const terraceMat = new THREE.MeshStandardMaterial({
      color: 0xe6e3dc,
      roughness: 0.74,
      metalness: 0.04,
      bumpMap: bumpTex,
      bumpScale: 0.01,
    });
    const porcelainMat = new THREE.MeshStandardMaterial({
      color: 0xfaf8f4,
      roughness: 0.42,
      metalness: 0.06,
    });
    const warmStoneMat = new THREE.MeshStandardMaterial({
      color: 0xe8e4db,
      roughness: 0.68,
      metalness: 0.05,
    });
    const mineralGrayMat = new THREE.MeshStandardMaterial({
      color: 0xd0ccc2,
      roughness: 0.62,
      metalness: 0.1,
    });
    const roofCapMat = new THREE.MeshStandardMaterial({
      color: 0x3b4046,
      roughness: 0.5,
      metalness: 0.22,
    });
    const roadDeckMat = new THREE.MeshStandardMaterial({
      color: 0x2b3036,
      roughness: 0.58,
      metalness: 0.15,
    });
    const bridgePylonMat = new THREE.MeshStandardMaterial({
      color: 0x454c54,
      roughness: 0.45,
      metalness: 0.24,
    });

    // Root Model Group
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    // 1. Soft Studio Table Contact Shadow beneath the Plinth
    const tableShadowGeo = new THREE.PlaneGeometry(18.5, 12.2);
    const tableShadowMat = new THREE.MeshBasicMaterial({
      map: shadowDiscTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const tableShadow = new THREE.Mesh(tableShadowGeo, tableShadowMat);
    tableShadow.rotation.x = -Math.PI / 2;
    tableShadow.position.y = -0.36;
    modelRoot.add(tableShadow);

    // 2. Stepped Architectural Base Plinth + Meridian River Channel
    const plinthGroup = new THREE.Group();
    modelRoot.add(plinthGroup);

    const subBaseGeo = new THREE.BoxGeometry(15.2, 0.16, 9.6);
    const subBaseMesh = new THREE.Mesh(subBaseGeo, plinthSubBaseMat);
    subBaseMesh.position.y = -0.26;
    subBaseMesh.receiveShadow = true;
    plinthGroup.add(subBaseMesh);

    const mainPlinthGeo = new THREE.BoxGeometry(14.8, 0.28, 9.2);
    const mainPlinthMesh = new THREE.Mesh(mainPlinthGeo, plinthStoneMat);
    mainPlinthMesh.position.y = -0.04;
    mainPlinthMesh.receiveShadow = true;
    plinthGroup.add(mainPlinthMesh);

    // North and South Elevated Urban Bank Terraces leaving central river channel (z in [-0.82, 0.82])
    const bankGeo = new THREE.BoxGeometry(14.2, 0.26, 3.6);
    const northBank = new THREE.Mesh(bankGeo, terraceMat);
    northBank.position.set(0, 0.23, -2.62);
    northBank.receiveShadow = true;
    northBank.castShadow = !isSoftwareGl;
    plinthGroup.add(northBank);

    const southBank = new THREE.Mesh(bankGeo, terraceMat);
    southBank.position.set(0, 0.23, 2.62);
    southBank.receiveShadow = true;
    southBank.castShadow = !isSoftwareGl;
    plinthGroup.add(southBank);

    // Embankment retaining walls along river corridor
    const embankmentGeo = new THREE.BoxGeometry(14.24, 0.14, 0.12);
    const northEmbankment = new THREE.Mesh(embankmentGeo, mineralGrayMat);
    northEmbankment.position.set(0, 0.34, -0.84);
    plinthGroup.add(northEmbankment);

    const southEmbankment = new THREE.Mesh(embankmentGeo, mineralGrayMat);
    southEmbankment.position.set(0, 0.34, 0.84);
    plinthGroup.add(southEmbankment);

    // Meridian River Water Shader Surface
    const waterGeo = new THREE.PlaneGeometry(14.2, 1.56);
    const waterMat = new THREE.ShaderMaterial({
      vertexShader: WATER_VERTEX_SHADER,
      fragmentShader: WATER_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, 0.14, 0);
    plinthGroup.add(waterMesh);

    // 3. Six District Hubs & Procedural Multi-Part Building Clusters
    const unitBoxGeo = new THREE.BoxGeometry(1, 1, 1);
    const unitConeGeo = new THREE.ConeGeometry(0.65, 0.45, 4);
    const hubDiskGeo = new THREE.CylinderGeometry(1.42, 1.52, 0.06, 28);
    const hubRingGeo = new THREE.RingGeometry(1.38, 1.48, 32);
    const substationBaseGeo = new THREE.CylinderGeometry(0.24, 0.3, 0.32, 16);
    const substationCoreGeo = new THREE.OctahedronGeometry(0.18, 0);
    const hitProxyGeo = new THREE.CylinderGeometry(1.45, 1.45, 2.6, 16);
    const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });

    interface AnimatedBuildingItem {
      group: THREE.Group;
      targetScaleY: number;
      staggerDelay: number;
    }

    interface HubVisualRecord {
      id: string;
      root: THREE.Group;
      ringMat: THREE.MeshBasicMaterial;
      beaconMat: THREE.MeshStandardMaterial;
      beaconMesh: THREE.Mesh;
      buildings: AnimatedBuildingItem[];
      worldAnchor: THREE.Vector3;
    }

    const hubRecords: HubVisualRecord[] = [];
    const interactables: THREE.Object3D[] = [];

    WORKFLOW_HUBS.forEach((hub, hubIdx) => {
      const hubGroup = new THREE.Group();
      hubGroup.position.set(hub.position.x, hub.position.y, hub.position.z);
      modelRoot.add(hubGroup);

      const hubShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 3.2),
        new THREE.MeshBasicMaterial({
          map: shadowDiscTex,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        })
      );
      hubShadow.rotation.x = -Math.PI / 2;
      hubShadow.position.y = 0.01;
      hubGroup.add(hubShadow);

      const padMesh = new THREE.Mesh(hubDiskGeo, warmStoneMat);
      padMesh.position.y = 0.03;
      padMesh.receiveShadow = true;
      hubGroup.add(padMesh);

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe85d36,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(hubRingGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.07;
      hubGroup.add(ringMesh);

      const subPedestal = new THREE.Mesh(substationBaseGeo, bridgePylonMat);
      subPedestal.position.set(0, 0.2, 0);
      subPedestal.castShadow = !isSoftwareGl;
      hubGroup.add(subPedestal);

      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xe85d36,
        emissive: 0xe85d36,
        emissiveIntensity: 0.35,
        roughness: 0.25,
        metalness: 0.2,
      });
      const beaconMesh = new THREE.Mesh(substationCoreGeo, beaconMat);
      beaconMesh.position.set(0, 0.56, 0);
      hubGroup.add(beaconMesh);

      const hubBuildings: AnimatedBuildingItem[] = [];
      hub.buildings.forEach((bSpec, bIdx) => {
        const bGroup = new THREE.Group();
        bGroup.position.set(bSpec.dx, 0.06, bSpec.dz);

        const bodyMat =
          bSpec.tone === 'porcelain'
            ? porcelainMat
            : bSpec.tone === 'warm_stone'
              ? warmStoneMat
              : mineralGrayMat;

        // Part 1: Podium Collar Base
        const podiumH = Math.min(0.28, bSpec.h * 0.22);
        const podium = new THREE.Mesh(unitBoxGeo, warmStoneMat);
        podium.scale.set(bSpec.w * 1.08, podiumH, bSpec.d * 1.08);
        podium.position.y = podiumH * 0.5;
        podium.castShadow = !isSoftwareGl;
        podium.receiveShadow = true;
        bGroup.add(podium);

        // Part 2: Main Architectural Tower Shaft
        const shaft = new THREE.Mesh(unitBoxGeo, bodyMat);
        shaft.scale.set(bSpec.w, bSpec.h, bSpec.d);
        shaft.position.y = bSpec.h * 0.5;
        shaft.castShadow = !isSoftwareGl;
        shaft.receiveShadow = true;
        bGroup.add(shaft);

        // Part 3: Rooftop Architectural Profile
        if (bSpec.roofStyle === 'stepped_crown') {
          const crownH = 0.22;
          const crown = new THREE.Mesh(unitBoxGeo, porcelainMat);
          crown.scale.set(bSpec.w * 0.68, crownH, bSpec.d * 0.68);
          crown.position.y = bSpec.h + crownH * 0.5;
          bGroup.add(crown);

          const mech = new THREE.Mesh(unitBoxGeo, roofCapMat);
          mech.scale.set(bSpec.w * 0.36, 0.1, bSpec.d * 0.36);
          mech.position.y = bSpec.h + crownH + 0.05;
          bGroup.add(mech);
        } else if (bSpec.roofStyle === 'spire_deck') {
          const tier = new THREE.Mesh(unitBoxGeo, roofCapMat);
          tier.scale.set(bSpec.w * 0.62, 0.16, bSpec.d * 0.62);
          tier.position.y = bSpec.h + 0.08;
          bGroup.add(tier);

          const spire = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          spire.scale.set(0.05, 0.48, 0.05);
          spire.position.set(0, bSpec.h + 0.4, 0);
          bGroup.add(spire);
        } else if (bSpec.roofStyle === 'sawtooth') {
          const roof = new THREE.Mesh(unitConeGeo, roofCapMat);
          roof.scale.set(bSpec.w * 0.85, 0.35, bSpec.d * 0.85);
          roof.rotation.y = Math.PI / 4;
          roof.position.y = bSpec.h + 0.12;
          bGroup.add(roof);
        } else {
          const parapet = new THREE.Mesh(unitBoxGeo, roofCapMat);
          parapet.scale.set(bSpec.w * 0.82, 0.09, bSpec.d * 0.82);
          parapet.position.y = bSpec.h + 0.045;
          bGroup.add(parapet);
        }

        hubGroup.add(bGroup);
        hubBuildings.push({
          group: bGroup,
          targetScaleY: 1,
          staggerDelay: hubIdx * 0.06 + bIdx * 0.035,
        });
      });

      const hitMesh = new THREE.Mesh(hitProxyGeo, hitProxyMat);
      hitMesh.position.y = 1.1;
      hitMesh.userData = { hubId: hub.id };
      hubGroup.add(hitMesh);
      interactables.push(hitMesh);

      hubRecords.push({
        id: hub.id,
        root: hubGroup,
        ringMat,
        beaconMat,
        beaconMesh,
        buildings: hubBuildings,
        worldAnchor: new THREE.Vector3(
          hub.position.x,
          hub.position.y + 1.85,
          hub.position.z
        ),
      });
    });

    // 4. Physical Bridges, Pylons, Supports & Road Corridors
    const roadNetworkGroup = new THREE.Group();
    modelRoot.add(roadNetworkGroup);

    interface CorridorVisualRecord {
      spec: (typeof WORKFLOW_CORRIDORS)[number];
      curve: THREE.CatmullRomCurve3;
      deckMat: THREE.MeshStandardMaterial;
      pulseMat: THREE.ShaderMaterial;
    }

    const corridorRecords: CorridorVisualRecord[] = [];

    WORKFLOW_CORRIDORS.forEach((corr) => {
      const pts = corr.controlPoints.map((p) => new THREE.Vector3(p.x, p.y, p.z));
      const curve = new THREE.CatmullRomCurve3(pts);

      const deckTubeGeo = new THREE.TubeGeometry(
        curve,
        corr.isBridge ? 32 : 20,
        corr.isBridge ? 0.14 : 0.1,
        8,
        false
      );
      const deckMat = roadDeckMat.clone();
      const deckMesh = new THREE.Mesh(deckTubeGeo, deckMat);
      deckMesh.scale.set(1, 0.42, 1);
      deckMesh.castShadow = !isSoftwareGl;
      deckMesh.receiveShadow = true;
      roadNetworkGroup.add(deckMesh);

      const pulsePts = corr.controlPoints.map(
        (p) => new THREE.Vector3(p.x, p.y + 0.07, p.z)
      );
      const pulseCurve = new THREE.CatmullRomCurve3(pulsePts);
      const pulseGeo = new THREE.TubeGeometry(pulseCurve, 28, 0.055, 6, false);
      const pulseMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.75 },
          uSpeed: { value: 0.65 },
          uDensity: { value: 3.0 },
          uBaseColor: { value: new THREE.Color(0x525860) },
          uPulseColor: { value: new THREE.Color(0xe85d36) },
        },
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      roadNetworkGroup.add(pulseMesh);

      if (corr.isBridge) {
        const midPt = curve.getPointAt(0.5);
        const northPierPt = curve.getPointAt(0.32);
        const southPierPt = curve.getPointAt(0.68);

        [northPierPt, southPierPt].forEach((pierPt) => {
          const leftTower = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          leftTower.scale.set(0.11, 1.55, 0.11);
          leftTower.position.set(pierPt.x - 0.24, 0.85, pierPt.z);
          leftTower.castShadow = !isSoftwareGl;
          roadNetworkGroup.add(leftTower);

          const rightTower = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          rightTower.scale.set(0.11, 1.55, 0.11);
          rightTower.position.set(pierPt.x + 0.24, 0.85, pierPt.z);
          rightTower.castShadow = !isSoftwareGl;
          roadNetworkGroup.add(rightTower);

          const crossBeam = new THREE.Mesh(unitBoxGeo, bridgePylonMat);
          crossBeam.scale.set(0.58, 0.08, 0.09);
          crossBeam.position.set(pierPt.x, 1.42, pierPt.z);
          roadNetworkGroup.add(crossBeam);

          const footing = new THREE.Mesh(unitBoxGeo, mineralGrayMat);
          footing.scale.set(0.66, 0.45, 0.28);
          footing.position.set(pierPt.x, 0.25, pierPt.z);
          roadNetworkGroup.add(footing);
        });

        const archLinePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 16; i++) {
          const t = i / 16;
          const p = curve.getPointAt(t);
          const archLift = Math.sin(t * Math.PI) * 0.55;
          archLinePts.push(new THREE.Vector3(p.x, p.y + archLift, p.z));
        }
        const archGeo = new THREE.BufferGeometry().setFromPoints(archLinePts);
        const archLine = new THREE.Line(
          archGeo,
          new THREE.LineBasicMaterial({
            color: 0x666d70,
            transparent: true,
            opacity: 0.65,
          })
        );
        roadNetworkGroup.add(archLine);

        if (corr.isPrimaryDisrupted) {
          const disruptionGroup = new THREE.Group();
          disruptionGroup.position.set(midPt.x, midPt.y + 0.12, midPt.z);
          disruptionGroup.name = 'central-bridge-disruption';
          roadNetworkGroup.add(disruptionGroup);

          const alertRingGeo = new THREE.RingGeometry(0.32, 0.48, 28);
          const alertRingMat = new THREE.MeshBasicMaterial({
            color: 0xd94e3e,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
          });
          const alertRing = new THREE.Mesh(alertRingGeo, alertRingMat);
          alertRing.rotation.x = -Math.PI / 2;
          disruptionGroup.add(alertRing);

          const barrierGeo = new THREE.BoxGeometry(0.46, 0.16, 0.1);
          const barrierMat = new THREE.MeshStandardMaterial({
            color: 0xd94e3e,
            emissive: 0xd94e3e,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0,
          });
          const northBarrier = new THREE.Mesh(barrierGeo, barrierMat);
          northBarrier.position.set(0, 0.08, -0.35);
          disruptionGroup.add(northBarrier);

          const southBarrier = new THREE.Mesh(barrierGeo, barrierMat);
          southBarrier.position.set(0, 0.08, 0.35);
          disruptionGroup.add(southBarrier);

          disruptionGroup.userData = { alertRingMat, barrierMat };
        }
      }

      corridorRecords.push({
        spec: corr,
        curve,
        deckMat,
        pulseMat,
      });
    });

    // 5. Stage 02 & 03 Elevated Scenario Branching Pathways
    const scenarioArcsGroup = new THREE.Group();
    modelRoot.add(scenarioArcsGroup);

    // 5A. Baseline Spillback Pathway (Muted Coral #D94E3E)
    const baselineCurves = [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.55, 3.35),
        new THREE.Vector3(0.0, 1.35, 1.85),
        new THREE.Vector3(0.0, 1.45, 0.55),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.9, 0.55, 3.25),
        new THREE.Vector3(-1.4, 1.15, 3.32),
        new THREE.Vector3(0.0, 1.25, 3.35),
        new THREE.Vector3(1.4, 1.15, 3.32),
        new THREE.Vector3(2.9, 0.55, 3.25),
      ]),
    ];

    const baselinePulseMats: THREE.ShaderMaterial[] = [];
    baselineCurves.forEach((bCurve) => {
      const bGeo = new THREE.TubeGeometry(bCurve, 28, 0.075, 8, false);
      const bMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uSpeed: { value: 0.25 },
          uDensity: { value: 5.0 },
          uBaseColor: { value: new THREE.Color(0x992f24) },
          uPulseColor: { value: new THREE.Color(0xd94e3e) },
        },
      });
      baselinePulseMats.push(bMat);
      scenarioArcsGroup.add(new THREE.Mesh(bGeo, bMat));
    });

    // 5B. Intervention Coordinated Bypass Pathways
    const interventionCurves = [
      // West Bypass Arc: SOUTH_PORT -> WEST_HARBOR -> MIDTOWN -> FINANCIAL_CBD
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.55, 3.35),
        new THREE.Vector3(-2.6, 0.95, 3.25),
        new THREE.Vector3(-5.2, 1.15, 3.1),
        new THREE.Vector3(-4.8, 1.65, 0.0),
        new THREE.Vector3(-4.4, 1.15, -3.05),
        new THREE.Vector3(-2.2, 0.95, -3.25),
        new THREE.Vector3(0.0, 0.65, -3.35),
      ]),
      // East Crossing Arc: SOUTH_PORT -> SOUTH_IND -> EAST_HUB -> FINANCIAL_CBD
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.0, 0.55, 3.35),
        new THREE.Vector3(2.6, 0.95, 3.25),
        new THREE.Vector3(5.2, 1.15, 3.1),
        new THREE.Vector3(4.8, 1.65, 0.0),
        new THREE.Vector3(4.4, 1.15, -3.05),
        new THREE.Vector3(2.2, 0.95, -3.25),
        new THREE.Vector3(0.0, 0.65, -3.35),
      ]),
    ];

    const interventionPulseMats: THREE.ShaderMaterial[] = [];
    interventionCurves.forEach((iCurve, idx) => {
      const iGeo = new THREE.TubeGeometry(iCurve, 44, 0.09, 10, false);
      const iMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0 },
          uSpeed: { value: 0.95 },
          uDensity: { value: 3.5 },
          uBaseColor: {
            value: new THREE.Color(idx === 0 ? 0x2d8a61 : 0xe85d36),
          },
          uPulseColor: {
            value: new THREE.Color(idx === 0 ? 0x6ee7b7 : 0xff8a65),
          },
        },
      });
      interventionPulseMats.push(iMat);
      scenarioArcsGroup.add(new THREE.Mesh(iGeo, iMat));
    });

    // 6. Three Elevated Translucent Analytical Layers (Mobility, Energy, Logistics)
    interface AnalyticalLayerVisual {
      id: 'mobility' | 'energy' | 'logistics';
      group: THREE.Group;
      baseElevationY: number;
      frameMat: THREE.LineBasicMaterial;
      stemMat: THREE.LineBasicMaterial;
      nodeDiscMat: THREE.MeshBasicMaterial;
      pulseMat: THREE.ShaderMaterial;
    }

    const analyticalLayers: AnalyticalLayerVisual[] = [];
    const layerNodeGeo = new THREE.RingGeometry(0.18, 0.34, 24);

    WORKFLOW_LAYERS.forEach((layerSpec, lIdx) => {
      const lGroup = new THREE.Group();
      lGroup.position.y = layerSpec.elevationY;
      modelRoot.add(lGroup);

      const layerColor = new THREE.Color(layerSpec.colorHex);

      const hw = 6.2 - lIdx * 0.22;
      const hd = 3.8 - lIdx * 0.14;
      const framePts = [
        new THREE.Vector3(-hw, 0, -hd),
        new THREE.Vector3(hw, 0, -hd),
        new THREE.Vector3(hw, 0, hd),
        new THREE.Vector3(-hw, 0, hd),
      ];
      const frameGeo = new THREE.BufferGeometry().setFromPoints(framePts);
      const frameMat = new THREE.LineBasicMaterial({
        color: layerColor,
        transparent: true,
        opacity: 0.45,
      });
      const frameLoop = new THREE.LineLoop(frameGeo, frameMat);
      lGroup.add(frameLoop);

      const nodeDiscMat = new THREE.MeshBasicMaterial({
        color: layerColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });

      const stemPositions: number[] = [];
      WORKFLOW_HUBS.forEach((hub) => {
        const disc = new THREE.Mesh(layerNodeGeo, nodeDiscMat);
        disc.rotation.x = -Math.PI / 2;
        disc.position.set(hub.position.x, 0, hub.position.z);
        lGroup.add(disc);

        stemPositions.push(
          hub.position.x,
          0,
          hub.position.z,
          hub.position.x,
          -(layerSpec.elevationY - hub.position.y - 0.5),
          hub.position.z
        );
      });

      const stemGeo = new THREE.BufferGeometry();
      stemGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(stemPositions, 3)
      );
      const stemMat = new THREE.LineBasicMaterial({
        color: layerColor,
        transparent: true,
        opacity: 0.26,
      });
      const stems = new THREE.LineSegments(stemGeo, stemMat);
      lGroup.add(stems);

      const loopCurve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-5.2, 0, 3.1),
          new THREE.Vector3(0.0, 0, 3.35),
          new THREE.Vector3(5.2, 0, 3.1),
          new THREE.Vector3(4.4, 0, -3.05),
          new THREE.Vector3(0.0, 0, -3.35),
          new THREE.Vector3(-4.4, 0, -3.05),
        ],
        true
      );
      const loopTubeGeo = new THREE.TubeGeometry(loopCurve, 48, 0.032, 6, true);
      const pulseMat = new THREE.ShaderMaterial({
        vertexShader: PULSE_VERTEX_SHADER,
        fragmentShader: PULSE_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.65 },
          uSpeed: { value: 0.45 + lIdx * 0.12 },
          uDensity: { value: 4.0 },
          uBaseColor: { value: layerColor.clone().multiplyScalar(0.75) },
          uPulseColor: { value: layerColor },
        },
      });
      const loopTubeMesh = new THREE.Mesh(loopTubeGeo, pulseMat);
      lGroup.add(loopTubeMesh);

      analyticalLayers.push({
        id: layerSpec.id,
        group: lGroup,
        baseElevationY: layerSpec.elevationY,
        frameMat,
        stemMat,
        nodeDiscMat,
        pulseMat,
      });
    });

    // 7. Instanced Animated Flow Vehicles on Physical Corridors
    const vehicleCount = 36;
    const vehicleGeo = new THREE.BoxGeometry(0.22, 0.08, 0.11);
    const vehicleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
    });
    const vehicleInstanced = new THREE.InstancedMesh(
      vehicleGeo,
      vehicleMat,
      vehicleCount
    );
    roadNetworkGroup.add(vehicleInstanced);

    const dummyVehicle = new THREE.Object3D();
    const vehicleColor = new THREE.Color();
    const pointPos = new THREE.Vector3();
    const tangentVec = new THREE.Vector3();

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting setup for Hub Hover & Click
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const updateRaycast = (clientX: number, clientY: number, isClick: boolean) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(interactables, false);
      const hitHubId: string | null =
        hits.length > 0 ? (hits[0].object.userData?.hubId ?? null) : null;

      if (isClick) {
        if (hitHubId) {
          onSelectHubRef.current(
            selectedHubIdRef.current === hitHubId ? null : hitHubId
          );
        }
      } else {
        if (hoveredHubIdRef.current !== hitHubId) {
          onHoverHubRef.current(hitHubId);
        }
        if (!userInteracting) {
          renderer.domElement.style.cursor = hitHubId ? 'pointer' : 'grab';
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (userInteracting) return;
      updateRaycast(e.clientX, e.clientY, false);
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) < 6) {
        updateRaycast(e.clientX, e.clientY, true);
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const onResize = () => {
      if (!container) return;
      const w = Math.max(320, container.clientWidth || 640);
      const h = Math.max(280, container.clientHeight || 440);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let isInViewport = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isInViewport = entries[0].isIntersecting;
        }
      },
      { rootMargin: '160px 0px' }
    );
    observer.observe(container);

    let assemblyClock = 0;
    let lastObservedStage = activeStageRef.current;

    resetCameraFnRef.current = () => {
      userOrbitHoldTimer = 0;
      onSelectHubRef.current(null);
    };

    replayAssemblyFnRef.current = () => {
      assemblyClock = 0;
    };

    let rafId = 0;
    let timeoutId = 0;
    let disposed = false;
    let elapsed = 0;
    let lastFrameTime = performance.now();
    let lastProjectionTime = 0;
    let lastProjectedCache: Record<string, ProjectedHubCoord> = {};
    const scratchProj = new THREE.Vector3();

    const centralDisruptionObj = roadNetworkGroup.getObjectByName(
      'central-bridge-disruption'
    );

    let smoothedLayerVis = initialChoreo.layerVisibility;
    let smoothedBaselineAlpha = initialChoreo.baselineArcAlpha;
    let smoothedInterventionAlpha = initialChoreo.interventionArcAlpha;
    let smoothedResolvedAlpha = initialChoreo.resolvedPathAlpha;
    let smoothedDisruption = initialChoreo.bridgeDisrupted ? 1 : 0;

    function afterDraw(cb: () => void) {
      if (typeof (gl as WebGL2RenderingContext).fenceSync === 'function') {
        const gl2 = gl as WebGL2RenderingContext;
        const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl2.flush();
        const poll = () => {
          if (disposed) return;
          if (!sync) {
            cb();
            return;
          }
          const status = gl2.clientWaitSync(sync, 0, 0);
          if (
            status === gl2.ALREADY_SIGNALED ||
            status === gl2.CONDITION_SATISFIED
          ) {
            gl2.deleteSync(sync);
            cb();
          } else {
            timeoutId = window.setTimeout(poll, 6);
          }
        };
        timeoutId = window.setTimeout(poll, 6);
      } else {
        cb();
      }
    }

    const tick = () => {
      if (disposed) return;

      const now = performance.now();
      const dt = Math.min(0.1, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      if (!isInViewport) {
        timeoutId = window.setTimeout(() => {
          rafId = requestAnimationFrame(tick);
        }, 140);
        return;
      }

      elapsed += dt;
      assemblyClock += dt;

      if (lastObservedStage !== activeStageRef.current) {
        if (activeStageRef.current === 0) {
          assemblyClock = 0.15;
        }
        userOrbitHoldTimer = 0;
        lastObservedStage = activeStageRef.current;
      }

      if (userOrbitHoldTimer > 0 && !userInteracting) {
        userOrbitHoldTimer = Math.max(0, userOrbitHoldTimer - dt);
      }

      const w = container.clientWidth || 640;
      const h = container.clientHeight || 440;
      const activeHubFocus =
        selectedHubIdRef.current || hoveredHubIdRef.current;

      const choreo = computeWorkflowStageChoreography(activeStageRef.current, {
        isMobile: w < 640,
        focusedHubId: activeHubFocus,
      });

      if (!userInteracting && userOrbitHoldTimer <= 0) {
        camera.position.x = dampValue(
          camera.position.x,
          choreo.cameraPosition.x,
          4.5,
          dt
        );
        camera.position.y = dampValue(
          camera.position.y,
          choreo.cameraPosition.y,
          4.5,
          dt
        );
        camera.position.z = dampValue(
          camera.position.z,
          choreo.cameraPosition.z,
          4.5,
          dt
        );
        controls.target.x = dampValue(
          controls.target.x,
          choreo.cameraTarget.x,
          5.0,
          dt
        );
        controls.target.y = dampValue(
          controls.target.y,
          choreo.cameraTarget.y,
          5.0,
          dt
        );
        controls.target.z = dampValue(
          controls.target.z,
          choreo.cameraTarget.z,
          5.0,
          dt
        );
      }
      controls.update();

      smoothedLayerVis = dampValue(
        smoothedLayerVis,
        choreo.layerVisibility,
        5.0,
        dt
      );
      smoothedBaselineAlpha = dampValue(
        smoothedBaselineAlpha,
        choreo.baselineArcAlpha,
        5.0,
        dt
      );
      smoothedInterventionAlpha = dampValue(
        smoothedInterventionAlpha,
        choreo.interventionArcAlpha,
        5.0,
        dt
      );
      smoothedResolvedAlpha = dampValue(
        smoothedResolvedAlpha,
        choreo.resolvedPathAlpha,
        5.0,
        dt
      );
      smoothedDisruption = dampValue(
        smoothedDisruption,
        choreo.bridgeDisrupted ? 1.0 : 0.0,
        5.5,
        dt
      );

      waterMat.uniforms.uTime.value = elapsed;

      const focusedHub = WORKFLOW_HUBS.find((hb) => hb.id === activeHubFocus);

      hubRecords.forEach((hRec) => {
        const isFocused = hRec.id === activeHubFocus;
        const isConnectedInDecide =
          activeStageRef.current === 2 &&
          (hRec.id === 'WEST_HARBOR' ||
            hRec.id === 'MIDTOWN' ||
            hRec.id === 'FINANCIAL_CBD' ||
            hRec.id === 'EAST_HUB' ||
            hRec.id === 'SOUTH_IND');

        hRec.buildings.forEach((bItem) => {
          const localProgress = THREE.MathUtils.clamp(
            (assemblyClock - bItem.staggerDelay) / 0.55,
            0.05,
            1.0
          );
          const eased = 1 - Math.pow(1 - localProgress, 3);
          bItem.group.scale.y = eased;
        });

        hRec.beaconMesh.rotation.y = elapsed * 0.9;
        hRec.ringMat.opacity = isFocused
          ? 0.95
          : isConnectedInDecide
            ? 0.78
            : 0.42;
        hRec.ringMat.color.setHex(
          isFocused
            ? 0xe85d36
            : activeStageRef.current === 2 && isConnectedInDecide
              ? 0x2d8a61
              : 0xe85d36
        );
        hRec.beaconMat.emissiveIntensity = isFocused
          ? 0.9
          : isConnectedInDecide
            ? 0.65
            : 0.32;
      });

      corridorRecords.forEach((cRec) => {
        cRec.pulseMat.uniforms.uTime.value = elapsed;

        const isConnectedToFocusedHub = Boolean(
          focusedHub && focusedHub.connectedCorridors.includes(cRec.spec.id)
        );

        if (cRec.spec.isPrimaryDisrupted) {
          cRec.pulseMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
            0.85,
            0.12,
            smoothedDisruption
          );
          cRec.deckMat.color.setHex(
            smoothedDisruption > 0.5 ? 0x4b3634 : 0x2b3036
          );
        } else {
          const baseOp =
            activeStageRef.current === 2 && cRec.spec.isInterventionRoute
              ? 0.95
              : 0.72;
          cRec.pulseMat.uniforms.uOpacity.value = isConnectedToFocusedHub
            ? 1.0
            : baseOp;
          cRec.pulseMat.uniforms.uPulseColor.value.setHex(
            isConnectedToFocusedHub || smoothedResolvedAlpha > 0.5
              ? 0xe85d36
              : 0xd97706
          );
        }
      });

      if (centralDisruptionObj && centralDisruptionObj.userData) {
        const { alertRingMat, barrierMat } = centralDisruptionObj.userData as {
          alertRingMat: THREE.MeshBasicMaterial;
          barrierMat: THREE.MeshStandardMaterial;
        };
        const pulseWave = 0.65 + 0.35 * Math.sin(elapsed * 4.5);
        alertRingMat.opacity = smoothedDisruption * 0.85 * pulseWave;
        barrierMat.opacity = smoothedDisruption * 0.92;
      }

      baselinePulseMats.forEach((mat) => {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uOpacity.value = smoothedBaselineAlpha;
      });

      interventionPulseMats.forEach((mat, idx) => {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uOpacity.value = smoothedInterventionAlpha;
        mat.uniforms.uSpeed.value =
          smoothedResolvedAlpha > 0.5 ? 1.25 : 0.85;
        if (smoothedResolvedAlpha > 0.5) {
          mat.uniforms.uBaseColor.value.setHex(
            idx === 0 ? 0x2d8a61 : 0xe85d36
          );
        }
      });

      const layerRiseFactor = THREE.MathUtils.smoothstep(
        assemblyClock,
        0.25,
        1.1
      );
      const filter = activeLayerFilterRef.current;

      analyticalLayers.forEach((layer, idx) => {
        const filterMult =
          filter === 'all' ? 1.0 : filter === layer.id ? 1.35 : 0.18;
        const effectiveVis =
          smoothedLayerVis * layerRiseFactor * filterMult;

        layer.group.position.y =
          layer.baseElevationY * (0.45 + 0.55 * layerRiseFactor) +
          Math.sin(elapsed * 1.4 + idx) * 0.03;

        layer.frameMat.opacity = Math.min(0.85, 0.42 * effectiveVis);
        layer.stemMat.opacity = Math.min(0.65, 0.28 * effectiveVis);
        layer.nodeDiscMat.opacity = Math.min(0.95, 0.68 * effectiveVis);
        layer.pulseMat.uniforms.uTime.value = elapsed;
        layer.pulseMat.uniforms.uOpacity.value = Math.min(
          0.95,
          0.72 * effectiveVis
        );
      });

      const openCorridors = corridorRecords.filter(
        (c) => !(c.spec.isPrimaryDisrupted && smoothedDisruption > 0.55)
      );
      if (openCorridors.length > 0) {
        for (let i = 0; i < vehicleCount; i++) {
          const cRec = openCorridors[i % openCorridors.length];
          const speed =
            cRec.spec.isInterventionRoute && smoothedInterventionAlpha > 0.5
              ? 0.24
              : 0.16;
          const u = (elapsed * speed + i / vehicleCount) % 1.0;
          cRec.curve.getPointAt(u, pointPos);
          cRec.curve.getTangentAt(u, tangentVec);

          dummyVehicle.position.set(pointPos.x, pointPos.y + 0.08, pointPos.z);
          dummyVehicle.rotation.set(
            0,
            Math.atan2(tangentVec.x, tangentVec.z) + Math.PI / 2,
            0
          );
          dummyVehicle.updateMatrix();
          vehicleInstanced.setMatrixAt(i, dummyVehicle.matrix);

          if (smoothedResolvedAlpha > 0.5 && cRec.spec.isInterventionRoute) {
            vehicleColor.setHex(i % 2 === 0 ? 0xe85d36 : 0x2d8a61);
          } else {
            vehicleColor.setHex(i % 3 === 0 ? 0xe85d36 : 0xfaf8f4);
          }
          vehicleInstanced.setColorAt(i, vehicleColor);
        }
        vehicleInstanced.instanceMatrix.needsUpdate = true;
        if (vehicleInstanced.instanceColor) {
          vehicleInstanced.instanceColor.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);

      // Project 3D Hub World Anchors to 2D Screen Coordinates (only notify React if coordinates moved >= 2px)
      if (now - lastProjectionTime > 120) {
        lastProjectionTime = now;
        const nextProjected: Record<string, ProjectedHubCoord> = {};
        let changed = false;

        hubRecords.forEach((hRec) => {
          scratchProj.copy(hRec.worldAnchor);
          scratchProj.project(camera);
          const rawX = Math.round((scratchProj.x * 0.5 + 0.5) * w);
          const rawY = Math.round((-(scratchProj.y * 0.5) + 0.5) * h);
          const inBounds =
            scratchProj.z < 1.0 &&
            rawX >= 10 &&
            rawX <= w - 10 &&
            rawY >= 16 &&
            rawY <= h - 12;

          const sx = Math.max(48, Math.min(w - 48, rawX));
          const sy = Math.max(52, Math.min(h - 18, rawY));

          nextProjected[hRec.id] = {
            x: sx,
            y: sy,
            visible: inBounds,
          };

          const prev = lastProjectedCache[hRec.id];
          if (
            !prev ||
            prev.visible !== inBounds ||
            Math.abs(prev.x - sx) >= 2 ||
            Math.abs(prev.y - sy) >= 2
          ) {
            changed = true;
          }
        });

        if (changed) {
          lastProjectedCache = nextProjected;
          onProjectedHubsUpdateRef.current(nextProjected);
        }
      }

      if (isSoftwareGl) {
        const camSettled =
          Math.abs(camera.position.x - choreo.cameraPosition.x) < 0.08 &&
          Math.abs(camera.position.y - choreo.cameraPosition.y) < 0.08 &&
          Math.abs(camera.position.z - choreo.cameraPosition.z) < 0.08 &&
          assemblyClock > 1.3 &&
          !userInteracting;
        const delayMs = camSettled ? 240 : 40;
        afterDraw(() => {
          if (!disposed) {
            timeoutId = window.setTimeout(() => {
              rafId = requestAnimationFrame(tick);
            }, delayMs);
          }
        });
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    wakeUpLoopFnRef.current = () => {
      if (disposed || !isInViewport) return;
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      envTarget.dispose();
      bumpTex.dispose();
      shadowDiscTex.dispose();
      renderer.dispose();
    };
  }, [onWebGLFailure]);

  return (
    <div
      ref={mountRef}
      data-testid="workflow-3d-canvas-container"
      className="w-full h-full relative select-none"
    />
  );
};
]]>
    </file>
    <file path="src/app/(parallel)/parallel/simulation/cameraMath.ts">
<![CDATA[export type HeroMode =
  | 'explore'
  | 'systems'
  | 'disrupt'
  | 'simulate'
  | 'explain'
  | 'outcome';

export type CameraRigMode =
  | 'cinematic_hero'
  | 'macro_low_angle'
  | 'cinematic_overview'
  | 'axonometric_layers'
  | 'symmetrical_dual_split'
  | 'simulation_lab_split'
  | 'causal_isolation'
  | 'district_inspection'
  | 'realigned_studio';

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface CameraPose {
  position: Vec3Tuple;
  target: Vec3Tuple;
  fov: number;
}

export const CAMERA_PRESETS: Record<CameraRigMode, CameraPose> = {
  cinematic_hero: {
    position: { x: -18, y: 12.5, z: 29 },
    target: { x: 0, y: 2.2, z: -1 },
    fov: 36,
  },
  macro_low_angle: {
    position: { x: -24, y: 22, z: 36 },
    target: { x: 0, y: 1.2, z: 0 },
    fov: 38,
  },
  cinematic_overview: {
    position: { x: -20, y: 24, z: 38 },
    target: { x: 0, y: 1.4, z: 0 },
    fov: 40,
  },
  axonometric_layers: {
    position: { x: -22, y: 28, z: 34 },
    target: { x: 0, y: 2.4, z: 0 },
    fov: 38,
  },
  symmetrical_dual_split: {
    position: { x: 0, y: 54, z: 58 },
    target: { x: 0, y: -1.0, z: 1.0 },
    fov: 48,
  },
  simulation_lab_split: {
    position: { x: 0, y: 52, z: 56 },
    target: { x: 0, y: -1.8, z: 1.5 },
    fov: 48,
  },
  causal_isolation: {
    position: { x: 10, y: 18, z: 24 },
    target: { x: 0, y: 1.2, z: 0 },
    fov: 36,
  },
  district_inspection: {
    position: { x: -10, y: 14, z: 18 },
    target: { x: -4, y: 1.5, z: -6 },
    fov: 35,
  },
  realigned_studio: {
    position: { x: 0, y: 23, z: 38 },
    target: { x: 0, y: 1.4, z: 0 },
    fov: 38,
  },
};

export interface ChoreographyState {
  mode: CameraRigMode;
  pose: CameraPose;
  splitFactor: number; // 0 = single world, 1 = separated Future A & Future B
  realignGhostAlpha: number; // > 0 in Outcome mode when unselected future is shown as subtle reference
  studioLightReveal: number; // 0.65 to 1.0
}

/**
 * State-driven camera and world choreography for the cinematic hero and 6 interactive hero modes.
 * Reversible across any mode switch (e.g. Explore -> Simulate -> Systems -> Explain -> Explore).
 */
export function computeModeChoreography(
  heroMode: HeroMode,
  options?: {
    heroState?: 'cinematic' | 'interactive';
    inspectionTarget?: Vec3Tuple | null;
    causalTarget?: Vec3Tuple | null;
    comparisonBias?: number; // -1 (Future A) to +1 (Future B)
    isMobile?: boolean;
    aspectRatio?: number;
  }
): ChoreographyState {
  if (options?.heroState === 'cinematic' && !options?.inspectionTarget) {
    const basePose: CameraPose = {
      position: { ...CAMERA_PRESETS.cinematic_hero.position },
      target: { ...CAMERA_PRESETS.cinematic_hero.target },
      fov: CAMERA_PRESETS.cinematic_hero.fov,
    };
    if (options.aspectRatio && options.aspectRatio < 0.85) {
      basePose.position.y *= 1.15;
      basePose.position.z *= 1.22;
    }
    return {
      mode: 'cinematic_hero',
      pose: basePose,
      splitFactor: 0,
      realignGhostAlpha: 0,
      studioLightReveal: 0.88,
    };
  }

  let mode: CameraRigMode = 'macro_low_angle';
  let basePose: CameraPose = {
    position: { ...CAMERA_PRESETS.macro_low_angle.position },
    target: { ...CAMERA_PRESETS.macro_low_angle.target },
    fov: CAMERA_PRESETS.macro_low_angle.fov,
  };
  let splitFactor = 0;
  let realignGhostAlpha = 0;
  let studioLightReveal = 0.85;

  switch (heroMode) {
    case 'explore':
      mode = 'macro_low_angle';
      basePose = {
        position: { ...CAMERA_PRESETS.macro_low_angle.position },
        target: { ...CAMERA_PRESETS.macro_low_angle.target },
        fov: CAMERA_PRESETS.macro_low_angle.fov,
      };
      splitFactor = 0;
      studioLightReveal = 0.85;
      break;

    case 'systems':
      mode = 'axonometric_layers';
      basePose = {
        position: { ...CAMERA_PRESETS.axonometric_layers.position },
        target: { ...CAMERA_PRESETS.axonometric_layers.target },
        fov: CAMERA_PRESETS.axonometric_layers.fov,
      };
      splitFactor = 0;
      studioLightReveal = 0.92;
      break;

    case 'disrupt':
      mode = 'symmetrical_dual_split';
      basePose = {
        position: { ...CAMERA_PRESETS.symmetrical_dual_split.position },
        target: { ...CAMERA_PRESETS.symmetrical_dual_split.target },
        fov: CAMERA_PRESETS.symmetrical_dual_split.fov,
      };
      splitFactor = 1;
      studioLightReveal = 1.0;
      break;

    case 'simulate':
      mode = 'simulation_lab_split';
      basePose = {
        position: { ...CAMERA_PRESETS.simulation_lab_split.position },
        target: { ...CAMERA_PRESETS.simulation_lab_split.target },
        fov: CAMERA_PRESETS.simulation_lab_split.fov,
      };
      splitFactor = 1;
      studioLightReveal = 1.0;
      break;

    case 'explain':
      mode = 'causal_isolation';
      basePose = {
        position: { ...CAMERA_PRESETS.causal_isolation.position },
        target: { ...CAMERA_PRESETS.causal_isolation.target },
        fov: CAMERA_PRESETS.causal_isolation.fov,
      };
      splitFactor = 0;
      studioLightReveal = 0.95;
      break;

    case 'outcome':
      mode = 'realigned_studio';
      basePose = {
        position: { ...CAMERA_PRESETS.realigned_studio.position },
        target: { ...CAMERA_PRESETS.realigned_studio.target },
        fov: CAMERA_PRESETS.realigned_studio.fov,
      };
      splitFactor = 0;
      realignGhostAlpha = 0.22;
      studioLightReveal = 1.0;
      break;
  }

  // Apply spatial comparison bias in dual-city modes (Disrupt & Simulate)
  if (splitFactor > 0.2 && options?.comparisonBias) {
    const shiftX = options.comparisonBias * 20 * splitFactor;
    basePose = {
      ...basePose,
      position: {
        x: basePose.position.x + shiftX,
        y: basePose.position.y - Math.abs(options.comparisonBias) * 10,
        z: basePose.position.z - Math.abs(options.comparisonBias) * 8,
      },
      target: {
        x: basePose.target.x + shiftX,
        y: basePose.target.y,
        z: basePose.target.z,
      },
    };
  }

  // Apply causal node focus target override in Explain mode
  if (heroMode === 'explain' && options?.causalTarget) {
    basePose = {
      position: {
        x: options.causalTarget.x + 9,
        y: 14,
        z: options.causalTarget.z + 16,
      },
      target: { ...options.causalTarget },
      fov: 34,
    };
  }

  // Apply direct district/object inspection override if active
  if (options?.inspectionTarget) {
    mode = 'district_inspection';
    basePose = {
      position: {
        x: options.inspectionTarget.x - 8,
        y: 12,
        z: options.inspectionTarget.z + 14,
      },
      target: { ...options.inspectionTarget },
      fov: 34,
    };
  }

  // Pull camera slightly back on narrow mobile portrait viewports so dual cities and districts never clip
  if (options?.aspectRatio && options.aspectRatio < 0.85) {
    const scale = splitFactor > 0.2 ? 1.28 : 1.18;
    basePose = {
      ...basePose,
      position: {
        x: basePose.position.x,
        y: basePose.position.y * scale,
        z: basePose.position.z * scale,
      },
    };
  }

  return {
    mode,
    pose: basePose,
    splitFactor: Number(splitFactor.toFixed(4)),
    realignGhostAlpha: Number(realignGhostAlpha.toFixed(3)),
    studioLightReveal: Number(studioLightReveal.toFixed(3)),
  };
}

/**
 * Legacy compatibility wrapper mapping normalized 0..1 progress to the 6 hero modes.
 */
export function computeSceneChoreography(
  scrollProgress: number,
  options?: {
    inspectionTarget?: Vec3Tuple | null;
    causalTarget?: Vec3Tuple | null;
    comparisonBias?: number;
    activeChapter?: number;
  }
): ChoreographyState {
  const p = Math.max(0, Math.min(1, scrollProgress));
  let heroMode: HeroMode = 'explore';
  if (p < 0.16) heroMode = 'explore';
  else if (p < 0.34) heroMode = 'systems';
  else if (p < 0.54) heroMode = 'disrupt';
  else if (p < 0.74) heroMode = 'simulate';
  else if (p < 0.88) heroMode = 'explain';
  else heroMode = 'outcome';

  return computeModeChoreography(heroMode, options);
}

/**
 * Frame-rate independent exponential damping for smooth camera transitions without snaps.
 */
export function dampValue(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return current + (target - current) * (1 - Math.exp(-lambda * Math.max(0, dt)));
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/simulation/engine.ts">
<![CDATA[import {
  CityWorldData,
  DistrictId,
  RoadEdge,
  createSeededRng,
} from '../world/cityGenerator';

export type InterventionStrategy =
  | 'reroute_vehicles'
  | 'increase_transit'
  | 'coordinate_deliveries';

export interface ScenarioParameters {
  trafficDemandPct: number; // 60 to 160
  transitCapacityPct: number; // 50 to 150
  intervention: InterventionStrategy;
  bridgeClosed: boolean;
}

export interface EdgeSimulationState {
  edgeId: string;
  closed: boolean;
  flowRate: number;
  effectiveCapacity: number;
  queueLength: number;
  utilization: number; // 0 to 2.5+
  congestionLevel: number; // 0 to 1 normalized
  travelTimeMin: number;
}

export interface SimulatedVehicle {
  id: string;
  vehicleType: 'car' | 'bus' | 'delivery';
  routeEdgeIds: string[];
  currentEdgeId: string;
  progressOnEdge: number; // 0 to 1
  x: number;
  y: number;
  z: number;
  headingRad: number;
  speedRatio: number;
  isDelayed: boolean;
}

export interface WorldSimulationSnapshot {
  timeMinutes: number; // 360 (06:00) to 1320 (22:00)
  timeFormatted: string;
  futureId: 'A' | 'B';
  edgeStates: Record<string, EdgeSimulationState>;
  districtCongestion: Record<DistrictId, number>;
  vehicles: SimulatedVehicle[];
  metrics: {
    avgTravelDelayMin: number;
    congestionIndex: number; // 0 to 100
    completedDeliveries: number;
    transitSharePct: number;
    gridLoadMw: number;
  };
}

export interface DualSimulationTimeline {
  params: ScenarioParameters;
  checkpointsMinutes: number[];
  futureA: WorldSimulationSnapshot[];
  futureB: WorldSimulationSnapshot[];
}

export function formatSimTime(minutes: number): string {
  const clamped = Math.max(360, Math.min(1320, Math.round(minutes)));
  const hrs = Math.floor(clamped / 60);
  const mins = clamped % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Weighted Dijkstra shortest-path solver on the directed road graph.
 * Respects closed edges (unless allowClosedFallback is set) and edge travel costs.
 */
export function findShortestPath(
  edges: RoadEdge[],
  startNodeId: string,
  endNodeId: string,
  edgeCosts: Record<string, number>,
  closedEdgeIds: Set<string>
): string[] {
  if (startNodeId === endNodeId) return [];

  const adj = new Map<string, RoadEdge[]>();
  for (const edge of edges) {
    if (closedEdgeIds.has(edge.id)) continue;
    const list = adj.get(edge.from) ?? [];
    list.push(edge);
    adj.set(edge.from, list);
  }

  const dist = new Map<string, number>();
  const prevEdge = new Map<string, RoadEdge>();
  const visited = new Set<string>();

  dist.set(startNodeId, 0);

  while (true) {
    let bestNode: string | null = null;
    let bestDist = Infinity;

    for (const [nodeId, d] of dist.entries()) {
      if (!visited.has(nodeId) && d < bestDist) {
        bestDist = d;
        bestNode = nodeId;
      }
    }

    if (!bestNode || bestNode === endNodeId) break;
    visited.add(bestNode);

    const outgoing = adj.get(bestNode) ?? [];
    for (const edge of outgoing) {
      const cost = edgeCosts[edge.id] ?? edge.length / Math.max(1, edge.baseSpeed);
      const nextDist = bestDist + cost;
      if (nextDist < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, nextDist);
        prevEdge.set(edge.to, edge);
      }
    }
  }

  if (!prevEdge.has(endNodeId)) {
    return [];
  }

  const route: string[] = [];
  let curr = endNodeId;
  while (curr !== startNodeId) {
    const edge = prevEdge.get(curr);
    if (!edge) break;
    route.unshift(edge.id);
    curr = edge.from;
  }
  return route;
}

interface ODRouteDemand {
  from: string;
  to: string;
  baseFlow: number;
  isFreight: boolean;
}

const OD_DEMAND_PAIRS: ODRouteDemand[] = [
  { from: 'S-HARBOR-HUB', to: 'N-CBD-NE', baseFlow: 58, isFreight: true },
  { from: 'S-HARBOR-HUB', to: 'N-TECH-N', baseFlow: 46, isFreight: true },
  { from: 'S-HARBOR-E', to: 'N-CBD-SW', baseFlow: 42, isFreight: false },
  { from: 'S-GRID-SUB', to: 'N-CBD-NW', baseFlow: 52, isFreight: false },
  { from: 'S-IND-SE', to: 'N-TECH-N', baseFlow: 38, isFreight: true },
  { from: 'N-RES-NW', to: 'N-CBD-NE', baseFlow: 48, isFreight: false },
  { from: 'N-RES-NW', to: 'S-GRID-SUB', baseFlow: 36, isFreight: false },
  { from: 'N-CBD-NE', to: 'S-HARBOR-HUB', baseFlow: 44, isFreight: true },
  { from: 'N-TECH-N', to: 'S-IND-SE', baseFlow: 34, isFreight: false },
];

function getTimeOfDayDemandCurve(minutes: number): number {
  // Morning peak around 08:30 (510), midday plateau, afternoon peak around 17:30 (1050)
  const morningPeak = Math.exp(-Math.pow((minutes - 525) / 110, 2)) * 0.48;
  const eveningPeak = Math.exp(-Math.pow((minutes - 1035) / 130, 2)) * 0.52;
  const baseDay = 0.62 + 0.18 * Math.sin(((minutes - 360) / 960) * Math.PI);
  return baseDay + morningPeak + eveningPeak;
}

function simulateSingleFutureTimeline(
  world: CityWorldData,
  params: ScenarioParameters,
  futureId: 'A' | 'B',
  checkpoints: number[],
  vehicleCount = 72
): WorldSimulationSnapshot[] {
  const edges = world.edges;
  const edgeMap = new Map(edges.map((e) => [e.id, e]));

  // Persistent queue state across discrete steps
  const queues: Record<string, number> = {};
  for (const e of edges) queues[e.id] = 0;

  let cumulativeDeliveries = 0;
  const snapshots: WorldSimulationSnapshot[] = [];

  // Pre-seed deterministic vehicles
  const rng = createSeededRng(world.seed + (futureId === 'A' ? 101 : 202));
  const baseVehicles = Array.from({ length: vehicleCount }, (_, idx) => {
    const od = OD_DEMAND_PAIRS[idx % OD_DEMAND_PAIRS.length];
    const vType: 'car' | 'bus' | 'delivery' =
      idx % 5 === 0 ? 'delivery' : idx % 7 === 0 ? 'bus' : 'car';
    return {
      id: `VEH-${futureId}-${String(idx + 1).padStart(3, '0')}`,
      od,
      vehicleType: vType,
      phaseOffset: rng(),
      speedSeed: 0.88 + rng() * 0.24,
    };
  });

  for (let stepIdx = 0; stepIdx < checkpoints.length; stepIdx++) {
    const tMin = checkpoints[stepIdx];
    const todFactor = getTimeOfDayDemandCurve(tMin);

    // Bridge disruption occurs from 07:30 (450) onwards if bridgeClosed is true
    const isDisruptionActive = params.bridgeClosed && tMin >= 450;
    const closedSet = new Set<string>();
    if (isDisruptionActive) {
      closedSet.add('EDGE-BRIDGE-CENTRAL-FWD');
      closedSet.add('EDGE-BRIDGE-CENTRAL-REV');
    }

    // Demand & transit adjustments
    const userDemandMult = params.trafficDemandPct / 100;
    const userTransitMult = params.transitCapacityPct / 100;

    // Future A uses baseline static assumptions; Future B applies active intervention
    const activeIntervention = futureId === 'B' ? params.intervention : null;

    let transitAbsorption = 0.16 * userTransitMult;
    if (activeIntervention === 'increase_transit') {
      transitAbsorption = Math.min(0.52, 0.26 * userTransitMult + 0.12);
    } else if (futureId === 'B') {
      transitAbsorption = Math.min(0.42, 0.20 * userTransitMult);
    }

    // Calculate current edge costs for pathfinding
    const edgeCosts: Record<string, number> = {};
    for (const e of edges) {
      const baseTime = e.length / Math.max(1, e.baseSpeed);
      const qPenalty = (queues[e.id] ?? 0) / Math.max(20, e.baseCapacity);

      if (activeIntervention === 'reroute_vehicles') {
        // Coordinated system routes actively penalize congested approaches and favor alternate bridges
        const altBonus = e.isAlternateRoute ? 0.68 : 1.0;
        edgeCosts[e.id] = (baseTime * (1 + qPenalty * 2.4)) * altBonus;
      } else {
        // Baseline Future A has delayed congestion awareness and bottlenecks near central bridge approaches
        edgeCosts[e.id] = baseTime * (1 + qPenalty * 0.45);
      }
    }

    // Inject demand across OD pairs
    const stepFlows: Record<string, number> = {};
    for (const e of edges) stepFlows[e.id] = 8 * todFactor * userDemandMult;

    for (const od of OD_DEMAND_PAIRS) {
      let pairDemand = od.baseFlow * todFactor * userDemandMult;
      if (!od.isFreight) {
        pairDemand *= 1 - transitAbsorption;
      } else if (activeIntervention === 'coordinate_deliveries') {
        // Smooth peak freight surges & prioritize freight corridors
        const isPeak = tMin >= 480 && tMin <= 630;
        pairDemand *= isPeak ? 0.78 : 1.08;
      }

      const route = findShortestPath(edges, od.from, od.to, edgeCosts, closedSet);
      for (const edgeId of route) {
        stepFlows[edgeId] = (stepFlows[edgeId] ?? 0) + pairDemand;
      }

      // In Future A (No Intervention), when the bridge closes, uncoordinated traffic piles up on the immediate approaches
      if (isDisruptionActive && futureId === 'A') {
        stepFlows['EDGE-S-AVE-4-FWD'] = (stepFlows['EDGE-S-AVE-4-FWD'] ?? 0) + pairDemand * 0.42;
        stepFlows['EDGE-N-AVE-5-FWD'] = (stepFlows['EDGE-N-AVE-5-FWD'] ?? 0) + pairDemand * 0.38;
        stepFlows['EDGE-N-AVE-6-REV'] = (stepFlows['EDGE-N-AVE-6-REV'] ?? 0) + pairDemand * 0.35;
      }
    }

    // Update queues and compute edge states
    const edgeStates: Record<string, EdgeSimulationState> = {};
    let totalWeightedDelay = 0;
    let totalFlowWeight = 0;
    let sumCongestion = 0;
    let openEdgeCount = 0;

    for (const e of edges) {
      const isClosed = closedSet.has(e.id);
      let effectiveCap = e.baseCapacity;

      if (activeIntervention === 'reroute_vehicles' && e.isAlternateRoute) {
        effectiveCap *= 1.32; // Signal timing & reversible lane optimization
      }
      if (activeIntervention === 'increase_transit' && e.isTransitCorridor) {
        effectiveCap *= 1.24; // Dedicated busway & high-frequency rail priority
      }
      if (activeIntervention === 'coordinate_deliveries' && e.isDeliveryCorridor) {
        effectiveCap *= 1.26; // Smart loading windows & green-wave freight routing
      }

      if (isClosed) {
        queues[e.id] = 0;
        edgeStates[e.id] = {
          edgeId: e.id,
          closed: true,
          flowRate: 0,
          effectiveCapacity: 0,
          queueLength: 0,
          utilization: 0,
          congestionLevel: 1,
          travelTimeMin: Infinity,
        };
        continue;
      }

      const inflow = stepFlows[e.id] ?? 0;
      const prevQueue = queues[e.id] ?? 0;
      const demandLoad = inflow + prevQueue * 0.55;
      const discharged = Math.min(demandLoad, effectiveCap);
      const nextQueue = Math.max(0, (demandLoad - discharged) * (futureId === 'A' ? 0.92 : 0.62));
      queues[e.id] = Number(nextQueue.toFixed(2));

      const utilization = demandLoad / Math.max(1, effectiveCap);
      const congestionLevel = Math.min(
        1,
        Math.max(0, (utilization - 0.38) / (futureId === 'A' ? 0.95 : 1.15))
      );

      // BPR (Bureau of Public Roads) style travel time formula
      const freeFlowMin = (e.length / Math.max(1, e.baseSpeed)) * 2.2;
      const bprMultiplier = 1 + 0.65 * Math.pow(utilization, 2.6) + nextQueue * 0.025;
      const travelTimeMin = freeFlowMin * bprMultiplier;
      const delayMin = Math.max(0, travelTimeMin - freeFlowMin);

      totalWeightedDelay += delayMin * (inflow + 1);
      totalFlowWeight += inflow + 1;
      sumCongestion += congestionLevel;
      openEdgeCount++;

      edgeStates[e.id] = {
        edgeId: e.id,
        closed: false,
        flowRate: Number(inflow.toFixed(1)),
        effectiveCapacity: Number(effectiveCap.toFixed(1)),
        queueLength: Number(nextQueue.toFixed(1)),
        utilization: Number(utilization.toFixed(2)),
        congestionLevel: Number(congestionLevel.toFixed(3)),
        travelTimeMin: Number(travelTimeMin.toFixed(2)),
      };
    }

    // District congestion aggregation
    const districtAccum: Record<DistrictId, { sum: number; count: number }> = {
      cbd: { sum: 0, count: 0 },
      harbor: { sum: 0, count: 0 },
      north_res: { sum: 0, count: 0 },
      east_tech: { sum: 0, count: 0 },
      south_ind: { sum: 0, count: 0 },
      central_park: { sum: 0, count: 0 },
    };

    for (const e of edges) {
      const st = edgeStates[e.id];
      if (!st || st.closed) continue;
      districtAccum[e.districtId].sum += st.congestionLevel;
      districtAccum[e.districtId].count += 1;
    }

    const districtCongestion: Record<DistrictId, number> = {
      cbd: 0,
      harbor: 0,
      north_res: 0,
      east_tech: 0,
      south_ind: 0,
      central_park: 0,
    };
    for (const dId of Object.keys(districtAccum) as DistrictId[]) {
      const item = districtAccum[dId];
      districtCongestion[dId] = Number(
        (item.count > 0 ? item.sum / item.count : 0).toFixed(2)
      );
    }

    const avgDelay = totalFlowWeight > 0 ? totalWeightedDelay / totalFlowWeight : 0;
    const rawCongestionIdx =
      openEdgeCount > 0 ? (sumCongestion / openEdgeCount) * 100 : 0;
    const congestionIndex = Math.min(99, Math.max(8, Math.round(rawCongestionIdx * 1.25)));

    // Completed deliveries increment per 15-min step based on network fluidity and freight intervention
    const baseStepDeliveries = 26 * todFactor * (0.75 + 0.25 * userDemandMult);
    const delayFriction = Math.max(0.32, 1 - avgDelay * 0.055);
    const coordinationBonus =
      activeIntervention === 'coordinate_deliveries'
        ? 1.28
        : activeIntervention === 'reroute_vehicles'
        ? 1.15
        : activeIntervention === 'increase_transit'
        ? 1.11
        : 1.0;

    if (stepIdx > 0) {
      cumulativeDeliveries += baseStepDeliveries * delayFriction * coordinationBonus;
    } else {
      cumulativeDeliveries = 42;
    }

    // Position vehicles deterministically along their active paths
    const simVehicles: SimulatedVehicle[] = [];
    for (let vIdx = 0; vIdx < baseVehicles.length; vIdx++) {
      const bv = baseVehicles[vIdx];
      const route = findShortestPath(
        edges,
        bv.od.from,
        bv.od.to,
        edgeCosts,
        closedSet
      );
      if (route.length === 0) continue;

      const timeNorm = (tMin - 360) / 960;
      const speedMod =
        bv.speedSeed * (futureId === 'B' ? 1.18 : 0.85) / (1 + avgDelay * 0.08);
      const totalProgress = (bv.phaseOffset + timeNorm * 14 * speedMod) % 1;
      const scaledEdgePos = totalProgress * route.length;
      const edgeChoiceIdx = Math.min(route.length - 1, Math.floor(scaledEdgePos));
      const progressOnEdge = scaledEdgePos - edgeChoiceIdx;

      const activeEdgeId = route[edgeChoiceIdx];
      const edgeObj = edgeMap.get(activeEdgeId);
      if (!edgeObj) continue;

      // Quadratic Bezier interpolation along edgeObj.points[0..2]
      const [p0, p1, p2] = edgeObj.points;
      const invT = 1 - progressOnEdge;
      const x =
        invT * invT * p0.x +
        2 * invT * progressOnEdge * p1.x +
        progressOnEdge * progressOnEdge * p2.x;
      const y =
        invT * invT * p0.y +
        2 * invT * progressOnEdge * p1.y +
        progressOnEdge * progressOnEdge * p2.y;
      const z =
        invT * invT * p0.z +
        2 * invT * progressOnEdge * p1.z +
        progressOnEdge * progressOnEdge * p2.z;

      // Tangent derivative for heading
      const tx = 2 * invT * (p1.x - p0.x) + 2 * progressOnEdge * (p2.x - p1.x);
      const tz = 2 * invT * (p1.z - p0.z) + 2 * progressOnEdge * (p2.z - p1.z);
      const headingRad = Math.atan2(tx, tz);

      const eState = edgeStates[activeEdgeId];
      const isDelayed = (eState?.congestionLevel ?? 0) > 0.58;

      simVehicles.push({
        id: bv.id,
        vehicleType: bv.vehicleType,
        routeEdgeIds: route,
        currentEdgeId: activeEdgeId,
        progressOnEdge: Number(progressOnEdge.toFixed(3)),
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        z: Number(z.toFixed(2)),
        headingRad: Number(headingRad.toFixed(3)),
        speedRatio: Number(Math.max(0.2, 1 - (eState?.congestionLevel ?? 0) * 0.7).toFixed(2)),
        isDelayed,
      });
    }

    const gridLoadMw = Number(
      (
        142 *
        todFactor *
        (0.85 + 0.15 * userDemandMult) *
        (activeIntervention === 'increase_transit' ? 1.06 : 1.0)
      ).toFixed(1)
    );

    snapshots.push({
      timeMinutes: tMin,
      timeFormatted: formatSimTime(tMin),
      futureId,
      edgeStates,
      districtCongestion,
      vehicles: simVehicles,
      metrics: {
        avgTravelDelayMin: Number(avgDelay.toFixed(1)),
        congestionIndex,
        completedDeliveries: Math.round(cumulativeDeliveries),
        transitSharePct: Math.round(transitAbsorption * 100),
        gridLoadMw,
      },
    });
  }

  return snapshots;
}

/**
 * Generates the complete deterministic dual-future simulation timeline
 * from 06:00 (360m) to 22:00 (1320m) in 15-minute checkpoints.
 */
export function runDeterministicSimulation(
  world: CityWorldData,
  params: ScenarioParameters,
  vehicleCount = 72
): DualSimulationTimeline {
  const checkpointsMinutes: number[] = [];
  for (let m = 360; m <= 1320; m += 15) {
    checkpointsMinutes.push(m);
  }

  const futureA = simulateSingleFutureTimeline(
    world,
    params,
    'A',
    checkpointsMinutes,
    vehicleCount
  );
  const futureB = simulateSingleFutureTimeline(
    world,
    params,
    'B',
    checkpointsMinutes,
    vehicleCount
  );

  return {
    params: { ...params },
    checkpointsMinutes,
    futureA,
    futureB,
  };
}

/**
 * Retrieves or interpolates the exact deterministic snapshot at any simulated minute (360..1320).
 * Scrubbing backward or forward always yields the exact reproducible state for that timestamp.
 */
export function getSnapshotAtTime(
  timeline: DualSimulationTimeline,
  futureId: 'A' | 'B',
  targetMinutes: number
): WorldSimulationSnapshot {
  const list = futureId === 'A' ? timeline.futureA : timeline.futureB;
  const clamped = Math.max(360, Math.min(1320, targetMinutes));
  const idxFloat = (clamped - 360) / 15;
  const lowIdx = Math.max(0, Math.min(list.length - 1, Math.floor(idxFloat)));
  const highIdx = Math.max(0, Math.min(list.length - 1, Math.ceil(idxFloat)));
  const alpha = idxFloat - lowIdx;

  if (lowIdx === highIdx || alpha < 0.001) {
    return list[lowIdx];
  }

  const snapLow = list[lowIdx];
  const snapHigh = list[highIdx];

  return {
    ...snapLow,
    timeMinutes: Math.round(clamped),
    timeFormatted: formatSimTime(clamped),
    metrics: {
      avgTravelDelayMin: Number(
        (
          snapLow.metrics.avgTravelDelayMin * (1 - alpha) +
          snapHigh.metrics.avgTravelDelayMin * alpha
        ).toFixed(1)
      ),
      congestionIndex: Math.round(
        snapLow.metrics.congestionIndex * (1 - alpha) +
          snapHigh.metrics.congestionIndex * alpha
      ),
      completedDeliveries: Math.round(
        snapLow.metrics.completedDeliveries * (1 - alpha) +
          snapHigh.metrics.completedDeliveries * alpha
      ),
      transitSharePct: snapLow.metrics.transitSharePct,
      gridLoadMw: Number(
        (
          snapLow.metrics.gridLoadMw * (1 - alpha) +
          snapHigh.metrics.gridLoadMw * alpha
        ).toFixed(1)
      ),
    },
  };
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/simulation/validation.ts">
<![CDATA[export type IndustryCategory =
  | 'Mobility'
  | 'Energy'
  | 'Logistics'
  | 'Infrastructure'
  | 'Other';

export interface DemoRequestInput {
  fullName: string;
  workEmail: string;
  company: string;
  industry: IndustryCategory | '';
  modelingGoal?: string;
}

export interface DemoRequestValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof DemoRequestInput, string>>;
}

export type ValidationResult = DemoRequestValidationResult;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateDemoRequest(
  input: DemoRequestInput
): DemoRequestValidationResult {
  const errors: Partial<Record<keyof DemoRequestInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length === 0) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!input.workEmail || !EMAIL_REGEX.test(input.workEmail.trim())) {
    errors.workEmail = 'Please provide a valid work email address.';
  }

  if (!input.company || input.company.trim().length === 0) {
    errors.company = 'Please specify your organization or agency.';
  }

  if (!input.industry) {
    errors.industry = 'Please select your primary operational domain.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/simulation/workflowTwinMath.ts">
<![CDATA[import { Vec3 } from '../world/cityGenerator';

export type WorkflowStageIndex = 0 | 1 | 2;
export type WorkflowStageId = 'understand' | 'simulate' | 'decide';

export interface WorkflowBuildingSpec {
  dx: number;
  dz: number;
  w: number;
  d: number;
  h: number;
  roofStyle: 'flat_parapet' | 'stepped_crown' | 'sawtooth' | 'spire_deck';
  tone: 'porcelain' | 'warm_stone' | 'mineral_gray';
}

export interface WorkflowHubSpec {
  id: string;
  code: string;
  label: string;
  shortLabel: string;
  role: string;
  bank: 'north' | 'south';
  position: Vec3;
  connectedCorridors: string[];
  buildings: WorkflowBuildingSpec[];
}

export interface WorkflowCorridorSpec {
  id: string;
  label: string;
  fromHubId: string;
  toHubId: string;
  isBridge: boolean;
  isPrimaryDisrupted: boolean;
  isInterventionRoute: boolean;
  controlPoints: Vec3[];
}

export interface WorkflowLayerSpec {
  id: 'mobility' | 'energy' | 'logistics';
  label: string;
  code: string;
  elevationY: number;
  colorHex: string;
  summary: string;
}

export interface WorkflowStageChoreography {
  stageIndex: WorkflowStageIndex;
  stageId: WorkflowStageId;
  headline: string;
  cameraPosition: Vec3;
  cameraTarget: Vec3;
  fov: number;
  layerVisibility: number;
  bridgeDisrupted: boolean;
  baselineArcAlpha: number;
  interventionArcAlpha: number;
  resolvedPathAlpha: number;
  scenarioCallouts: {
    selectedIntervention: string;
    affectedInfrastructure: string;
    scenarioComparison: string;
  };
}

export const WORKFLOW_LAYERS: WorkflowLayerSpec[] = [
  {
    id: 'mobility',
    label: 'Mobility',
    code: 'LYR-01 // MOBILITY',
    elevationY: 2.05,
    colorHex: '#E85D36',
    summary: 'Arterial bridges, transit loops, and signalized commuter corridors',
  },
  {
    id: 'energy',
    label: 'Energy',
    code: 'LYR-02 // ENERGY',
    elevationY: 2.95,
    colorHex: '#38BDF8',
    summary: 'Substation feeders, traction power, and district load distribution',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    code: 'LYR-03 // LOGISTICS',
    elevationY: 3.85,
    colorHex: '#D99B26',
    summary: 'Port container dispatches, freight consolidation, and hospital cold-chain routes',
  },
];

export const WORKFLOW_HUBS: WorkflowHubSpec[] = [
  {
    id: 'WEST_HARBOR',
    code: 'HUB 01 // WEST HARBOR',
    label: 'WEST HARBOR',
    shortLabel: 'West Harbor',
    role: 'Intermodal Container Terminal & West Bypass Gateway',
    bank: 'south',
    position: { x: -5.2, y: 0.36, z: 3.1 },
    connectedCorridors: ['WEST_VIADUCT', 'SOUTH_WEST_COLLECTOR'],
    buildings: [
      { dx: -0.95, dz: 0.35, w: 0.82, d: 0.54, h: 1.25, roofStyle: 'sawtooth', tone: 'mineral_gray' },
      { dx: -0.32, dz: -0.52, w: 0.62, d: 0.62, h: 1.75, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.52, dz: 0.45, w: 0.76, d: 0.52, h: 1.15, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.88, dz: -0.42, w: 0.52, d: 0.48, h: 1.45, roofStyle: 'flat_parapet', tone: 'porcelain' },
      { dx: 0.62, dz: -0.35, w: 0.58, d: 0.52, h: 1.58, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: 0.0, dz: 0.68, w: 0.65, d: 0.46, h: 0.98, roofStyle: 'sawtooth', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'SOUTH_PORT',
    code: 'HUB 02 // SOUTH PORT',
    label: 'SOUTH PORT',
    shortLabel: 'South Port',
    role: 'Central Bridge Approach & 145 MW Traction Substation',
    bank: 'south',
    position: { x: 0.0, y: 0.36, z: 3.35 },
    connectedCorridors: ['CENTRAL_BRIDGE', 'SOUTH_WEST_COLLECTOR', 'SOUTH_EAST_COLLECTOR'],
    buildings: [
      { dx: -0.78, dz: 0.35, w: 0.64, d: 0.58, h: 1.85, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.78, dz: 0.32, w: 0.66, d: 0.56, h: 1.68, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.64, dz: -0.48, w: 0.52, d: 0.5, h: 1.38, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
      { dx: 0.64, dz: -0.45, w: 0.54, d: 0.5, h: 1.52, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.0, dz: 0.82, w: 0.76, d: 0.48, h: 1.25, roofStyle: 'sawtooth', tone: 'warm_stone' },
      { dx: -1.28, dz: -0.08, w: 0.48, d: 0.48, h: 1.12, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'SOUTH_IND',
    code: 'HUB 03 // SOUTH IND',
    label: 'SOUTH IND',
    shortLabel: 'South Industrial',
    role: 'Automated Logistics Consolidation & East Crossing Ramp',
    bank: 'south',
    position: { x: 5.2, y: 0.36, z: 3.1 },
    connectedCorridors: ['EAST_CROSSING', 'SOUTH_EAST_COLLECTOR'],
    buildings: [
      { dx: 0.88, dz: 0.38, w: 0.88, d: 0.58, h: 1.18, roofStyle: 'sawtooth', tone: 'mineral_gray' },
      { dx: -0.62, dz: 0.45, w: 0.72, d: 0.54, h: 1.35, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: 0.45, dz: -0.45, w: 0.6, d: 0.56, h: 1.72, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: -0.52, dz: -0.42, w: 0.56, d: 0.5, h: 1.48, roofStyle: 'flat_parapet', tone: 'porcelain' },
      { dx: 1.15, dz: -0.32, w: 0.54, d: 0.52, h: 1.08, roofStyle: 'sawtooth', tone: 'warm_stone' },
      { dx: 0.05, dz: 0.76, w: 0.68, d: 0.46, h: 1.02, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'MIDTOWN',
    code: 'HUB 04 // MIDTOWN',
    label: 'MIDTOWN',
    shortLabel: 'Midtown',
    role: 'Northern Crosstown Exchange & West Viaduct Terminal',
    bank: 'north',
    position: { x: -4.4, y: 0.36, z: -3.05 },
    connectedCorridors: ['WEST_VIADUCT', 'NORTH_WEST_COLLECTOR'],
    buildings: [
      { dx: -0.74, dz: -0.38, w: 0.62, d: 0.62, h: 2.35, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.64, dz: -0.42, w: 0.58, d: 0.58, h: 2.05, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: -0.62, dz: 0.45, w: 0.54, d: 0.52, h: 1.62, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: 0.62, dz: 0.42, w: 0.56, d: 0.5, h: 1.72, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: -1.26, dz: 0.05, w: 0.52, d: 0.52, h: 1.48, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
      { dx: 0.0, dz: -0.82, w: 0.64, d: 0.52, h: 1.92, roofStyle: 'stepped_crown', tone: 'porcelain' },
    ],
  },
  {
    id: 'FINANCIAL_CBD',
    code: 'HUB 05 // FINANCIAL CBD',
    label: 'FINANCIAL CBD',
    shortLabel: 'Financial CBD',
    role: 'Metropolitan Commercial Core & Central Transit Hub',
    bank: 'north',
    position: { x: 0.0, y: 0.36, z: -3.35 },
    connectedCorridors: ['CENTRAL_BRIDGE', 'NORTH_WEST_COLLECTOR', 'NORTH_EAST_COLLECTOR'],
    buildings: [
      { dx: -0.62, dz: -0.32, w: 0.68, d: 0.68, h: 3.15, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: 0.64, dz: -0.35, w: 0.66, d: 0.64, h: 2.85, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.0, dz: -0.88, w: 0.72, d: 0.62, h: 3.45, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: -1.18, dz: -0.12, w: 0.56, d: 0.56, h: 2.25, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: 1.18, dz: -0.1, w: 0.56, d: 0.56, h: 2.15, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.68, dz: 0.45, w: 0.54, d: 0.5, h: 1.85, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: 0.68, dz: 0.45, w: 0.54, d: 0.5, h: 1.78, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
    ],
  },
  {
    id: 'EAST_HUB',
    code: 'HUB 06 // EAST HUB',
    label: 'EAST HUB',
    shortLabel: 'East Hub',
    role: 'Hospital Cold-Chain Campus & Innovation Crossing Landing',
    bank: 'north',
    position: { x: 4.4, y: 0.36, z: -3.05 },
    connectedCorridors: ['EAST_CROSSING', 'NORTH_EAST_COLLECTOR'],
    buildings: [
      { dx: 0.68, dz: -0.35, w: 0.66, d: 0.6, h: 2.25, roofStyle: 'stepped_crown', tone: 'porcelain' },
      { dx: -0.58, dz: -0.38, w: 0.6, d: 0.58, h: 1.95, roofStyle: 'spire_deck', tone: 'porcelain' },
      { dx: 0.58, dz: 0.42, w: 0.58, d: 0.52, h: 1.58, roofStyle: 'flat_parapet', tone: 'warm_stone' },
      { dx: -0.55, dz: 0.42, w: 0.54, d: 0.5, h: 1.52, roofStyle: 'stepped_crown', tone: 'warm_stone' },
      { dx: 1.24, dz: 0.05, w: 0.54, d: 0.54, h: 1.38, roofStyle: 'flat_parapet', tone: 'mineral_gray' },
      { dx: 0.05, dz: -0.82, w: 0.64, d: 0.52, h: 1.82, roofStyle: 'stepped_crown', tone: 'porcelain' },
    ],
  },
];

export const WORKFLOW_CORRIDORS: WorkflowCorridorSpec[] = [
  {
    id: 'CENTRAL_BRIDGE',
    label: 'Meridian Central Bridge',
    fromHubId: 'SOUTH_PORT',
    toHubId: 'FINANCIAL_CBD',
    isBridge: true,
    isPrimaryDisrupted: true,
    isInterventionRoute: false,
    controlPoints: [
      { x: 0.0, y: 0.42, z: 3.35 },
      { x: 0.0, y: 0.82, z: 1.25 },
      { x: 0.0, y: 0.88, z: 0.0 },
      { x: 0.0, y: 0.82, z: -1.25 },
      { x: 0.0, y: 0.42, z: -3.35 },
    ],
  },
  {
    id: 'WEST_VIADUCT',
    label: 'West Bypass Viaduct',
    fromHubId: 'WEST_HARBOR',
    toHubId: 'MIDTOWN',
    isBridge: true,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: -5.2, y: 0.42, z: 3.1 },
      { x: -5.0, y: 0.78, z: 1.2 },
      { x: -4.8, y: 0.86, z: 0.0 },
      { x: -4.6, y: 0.78, z: -1.2 },
      { x: -4.4, y: 0.42, z: -3.05 },
    ],
  },
  {
    id: 'EAST_CROSSING',
    label: 'East Innovation Crossing',
    fromHubId: 'SOUTH_IND',
    toHubId: 'EAST_HUB',
    isBridge: true,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: 5.2, y: 0.42, z: 3.1 },
      { x: 5.0, y: 0.78, z: 1.2 },
      { x: 4.8, y: 0.86, z: 0.0 },
      { x: 4.6, y: 0.78, z: -1.2 },
      { x: 4.4, y: 0.42, z: -3.05 },
    ],
  },
  {
    id: 'SOUTH_WEST_COLLECTOR',
    label: 'South Harbor Arterial',
    fromHubId: 'WEST_HARBOR',
    toHubId: 'SOUTH_PORT',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: -5.2, y: 0.4, z: 3.1 },
      { x: -2.6, y: 0.42, z: 3.28 },
      { x: 0.0, y: 0.4, z: 3.35 },
    ],
  },
  {
    id: 'SOUTH_EAST_COLLECTOR',
    label: 'South Industrial Arterial',
    fromHubId: 'SOUTH_PORT',
    toHubId: 'SOUTH_IND',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: 0.0, y: 0.4, z: 3.35 },
      { x: 2.6, y: 0.42, z: 3.28 },
      { x: 5.2, y: 0.4, z: 3.1 },
    ],
  },
  {
    id: 'NORTH_WEST_COLLECTOR',
    label: 'Midtown Crosstown Collector',
    fromHubId: 'MIDTOWN',
    toHubId: 'FINANCIAL_CBD',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: -4.4, y: 0.4, z: -3.05 },
      { x: -2.2, y: 0.42, z: -3.25 },
      { x: 0.0, y: 0.4, z: -3.35 },
    ],
  },
  {
    id: 'NORTH_EAST_COLLECTOR',
    label: 'East Civic Collector',
    fromHubId: 'FINANCIAL_CBD',
    toHubId: 'EAST_HUB',
    isBridge: false,
    isPrimaryDisrupted: false,
    isInterventionRoute: true,
    controlPoints: [
      { x: 0.0, y: 0.4, z: -3.35 },
      { x: 2.2, y: 0.42, z: -3.25 },
      { x: 4.4, y: 0.4, z: -3.05 },
    ],
  },
];

export function computeWorkflowStageChoreography(
  stageIndex: number,
  options?: {
    isMobile?: boolean;
    focusedHubId?: string | null;
  }
): WorkflowStageChoreography {
  const clampedStage: WorkflowStageIndex =
    stageIndex <= 0 ? 0 : stageIndex === 1 ? 1 : 2;
  const isMobile = Boolean(options?.isMobile);
  const mobileScale = isMobile ? 1.42 : 1.0;
  const mobileTargetZOffset = isMobile ? 0.65 : 0.0;

  let basePos: Vec3;
  let baseTarget: Vec3;
  let fov = isMobile ? 39 : 34;
  let stageId: WorkflowStageId = 'understand';
  let headline = 'See the whole system.';
  let layerVisibility = 1.0;
  let bridgeDisrupted = false;
  let baselineArcAlpha = 0.0;
  let interventionArcAlpha = 0.0;
  let resolvedPathAlpha = 0.0;

  if (clampedStage === 0) {
    stageId = 'understand';
    headline = 'See the whole system.';
    basePos = {
      x: 0.4 * mobileScale,
      y: 12.6 * mobileScale,
      z: 16.4 * mobileScale,
    };
    baseTarget = { x: 0.0, y: 0.7, z: 0.0 + mobileTargetZOffset };
    layerVisibility = 1.0;
    bridgeDisrupted = false;
    baselineArcAlpha = 0.0;
    interventionArcAlpha = 0.0;
    resolvedPathAlpha = 0.0;
  } else if (clampedStage === 1) {
    stageId = 'simulate';
    headline = 'Explore what could change.';
    basePos = {
      x: -2.0 * mobileScale,
      y: 10.6 * mobileScale,
      z: 14.2 * mobileScale,
    };
    baseTarget = { x: 0.0, y: 0.55, z: 0.1 + mobileTargetZOffset };
    fov = isMobile ? 38 : 33;
    layerVisibility = 0.28;
    bridgeDisrupted = true;
    baselineArcAlpha = 1.0;
    interventionArcAlpha = 1.0;
    resolvedPathAlpha = 0.25;
  } else {
    stageId = 'decide';
    headline = 'Move forward with clarity.';
    basePos = {
      x: 1.8 * mobileScale,
      y: 11.8 * mobileScale,
      z: 15.6 * mobileScale,
    };
    baseTarget = { x: 0.1, y: 0.5, z: 0.0 + mobileTargetZOffset };
    fov = isMobile ? 39 : 34;
    layerVisibility = 0.45;
    bridgeDisrupted = true;
    baselineArcAlpha = 0.16;
    interventionArcAlpha = 1.0;
    resolvedPathAlpha = 1.0;
  }

  // If visitor clicked or hovered a specific district hub, gently bias target toward it
  if (options?.focusedHubId) {
    const hub = WORKFLOW_HUBS.find((h) => h.id === options.focusedHubId);
    if (hub) {
      baseTarget = {
        x: baseTarget.x * 0.65 + hub.position.x * 0.35,
        y: baseTarget.y,
        z: baseTarget.z * 0.65 + hub.position.z * 0.35,
      };
    }
  }

  return {
    stageIndex: clampedStage,
    stageId,
    headline,
    cameraPosition: basePos,
    cameraTarget: baseTarget,
    fov,
    layerVisibility,
    bridgeDisrupted,
    baselineArcAlpha,
    interventionArcAlpha,
    resolvedPathAlpha,
    scenarioCallouts: {
      selectedIntervention: 'West Viaduct + East Crossing Balanced Reroute',
      affectedInfrastructure: 'Meridian Central Bridge · 6 Connected District Hubs',
      scenarioComparison: 'Baseline Spillback vs. Coordinated Multi-Corridor Bypass',
    },
  };
}
]]>
    </file>
    <file path="src/app/(parallel)/parallel/store/useParallelStore.ts">
<![CDATA['use client';

import { create } from 'zustand';
import {
  CityWorldData,
  DistrictId,
  generateCityWorld,
} from '../world/cityGenerator';
import {
  DualSimulationTimeline,
  InterventionStrategy,
  ScenarioParameters,
  WorldSimulationSnapshot,
  getSnapshotAtTime,
  runDeterministicSimulation,
} from '../simulation/engine';
import { HeroMode } from '../simulation/cameraMath';

export type PresentationMode = 'cinematic' | 'exploration' | 'simulation';
export type HeroPresentationState = 'cinematic' | 'interactive';
export type InfrastructureLayerId = 'mobility' | 'energy' | 'logistics';

export interface HeroModeMeta {
  id: HeroMode;
  num: string;
  label: string;
  chapterTitle: string;
  summary: string;
}

export const HERO_MODES: HeroModeMeta[] = [
  {
    id: 'explore',
    num: '01',
    label: 'Explore',
    chapterTitle: 'The World',
    summary: 'Drag to orbit the architectural model or select a district to inspect its role.',
  },
  {
    id: 'systems',
    num: '02',
    label: 'Systems',
    chapterTitle: 'Invisible City',
    summary: 'Inspect the mobility, energy, and logistics layers operating beneath the skyline.',
  },
  {
    id: 'disrupt',
    num: '03',
    label: 'Disrupt',
    chapterTitle: 'The Fracture',
    summary: 'One disruption. Two possible futures: Baseline vs. Coordinated Intervention.',
  },
  {
    id: 'simulate',
    num: '04',
    label: 'Simulate',
    chapterTitle: 'Simulation Lab',
    summary: 'Adjust demand, transit capacity, and intervention rules across the 16-hour timeline.',
  },
  {
    id: 'explain',
    num: '05',
    label: 'Explain',
    chapterTitle: 'Causal Analysis',
    summary: 'Step through the 5-stage causal pathway from initial bridge closure to delivery impact.',
  },
  {
    id: 'outcome',
    num: '06',
    label: 'Outcome',
    chapterTitle: 'Make the Next Move',
    summary: 'Review the consolidated scenario outcome and transition to your decision brief.',
  },
];

export interface SelectedEntityInfo {
  type: 'district' | 'building' | 'road' | 'infrastructure' | 'world';
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  metric: string;
  worldPos: { x: number; y: number; z: number };
}

export interface CausalStepDefinition {
  index: number;
  title: string;
  shortLabel: string;
  locationLabel: string;
  description: string;
  fromPos: { x: number; y: number; z: number };
  toPos: { x: number; y: number; z: number };
  cameraTarget: { x: number; y: number; z: number };
  highlightDistrictId: DistrictId;
  highlightEdgeIds: string[];
}

export const CAUSAL_SEQUENCE: CausalStepDefinition[] = [
  {
    index: 0,
    title: 'Bridge closure',
    shortLabel: '01. Bridge closure',
    locationLabel: 'Meridian Central Bridge (SEC-04)',
    description:
      'At 07:30, an unscheduled structural lockdown closes all 6 lanes of the Meridian Central Bridge, severing the primary arterial link between the South Port and the northern Financial Core.',
    fromPos: { x: 0, y: 1.4, z: 4.5 },
    toPos: { x: 0, y: 1.6, z: -4.5 },
    cameraTarget: { x: 0, y: 1.2, z: 0 },
    highlightDistrictId: 'central_park',
    highlightEdgeIds: ['EDGE-BRIDGE-CENTRAL-FWD', 'EDGE-BRIDGE-CENTRAL-REV'],
  },
  {
    index: 1,
    title: 'Reduced capacity',
    shortLabel: '02. Reduced capacity',
    locationLabel: 'Cross-River Corridor (-42% Capacity)',
    description:
      'Cross-river transport capacity drops by 140 vehicles/min. Commuter and freight queues immediately accumulate along Port-to-Bridge Causeway and Exchange Embankment.',
    fromPos: { x: 0, y: 1.4, z: 0 },
    toPos: { x: -6, y: 1.2, z: 5.5 },
    cameraTarget: { x: -3, y: 1.0, z: 3 },
    highlightDistrictId: 'harbor',
    highlightEdgeIds: ['EDGE-S-AVE-4-FWD', 'EDGE-N-AVE-5-FWD'],
  },
  {
    index: 2,
    title: 'Rerouting',
    shortLabel: '03. Rerouting',
    locationLabel: 'West Viaduct & East Innovation Crossing',
    description:
      'In Future B, PARALLEL dynamically re-weights graph impedances and diverts cross-river flows onto the West Harbor Bypass Viaduct and East Innovation Crossing before gridlock locks in.',
    fromPos: { x: -12, y: 1.4, z: 11 },
    toPos: { x: -18, y: 1.6, z: 0 },
    cameraTarget: { x: -14, y: 1.2, z: 2 },
    highlightDistrictId: 'north_res',
    highlightEdgeIds: ['EDGE-BRIDGE-WEST-FWD', 'EDGE-BRIDGE-EAST-FWD', 'EDGE-S-AVE-1-FWD'],
  },
  {
    index: 3,
    title: 'Congestion',
    shortLabel: '04. Congestion',
    locationLabel: 'CBD & Docklands Arterial Collectors',
    description:
      'Without coordinated signal and transit adaptation (Baseline Future A), diverted queues spill back into Midtown Crosstown and Docklands Arterial, degrading corridor speeds by 58%.',
    fromPos: { x: -8, y: 1.5, z: -4.5 },
    toPos: { x: 2, y: 1.8, z: -13 },
    cameraTarget: { x: -3, y: 1.5, z: -9 },
    highlightDistrictId: 'cbd',
    highlightEdgeIds: ['EDGE-N-AVE-4-FWD', 'EDGE-N-AVE-6-FWD', 'EDGE-N-AVE-7-FWD'],
  },
  {
    index: 4,
    title: 'Delivery impact',
    shortLabel: '05. Delivery impact',
    locationLabel: 'East Civic & Hospital Distribution Hub',
    description:
      'Cold-chain and medical shipments originating at West Harbor reach the East Civic & Hospital Hub 14.2 minutes faster under coordinated dispatch than under unmitigated baseline.',
    fromPos: { x: 2, y: 1.8, z: -13 },
    toPos: { x: 13, y: 1.8, z: -13 },
    cameraTarget: { x: 9, y: 1.4, z: -10 },
    highlightDistrictId: 'east_tech',
    highlightEdgeIds: ['EDGE-N-AVE-8-FWD', 'EDGE-N-AVE-10-FWD'],
  },
];

const MODE_TO_CHAPTER: Record<HeroMode, number> = {
  explore: 1,
  systems: 2,
  disrupt: 3,
  simulate: 4,
  explain: 5,
  outcome: 6,
};

interface ParallelStoreState {
  world: CityWorldData;
  timeline: DualSimulationTimeline;
  heroState: HeroPresentationState;
  heroMode: HeroMode;
  activeChapter: number;
  presentationMode: PresentationMode;
  invisibleLayer: InfrastructureLayerId;
  comparisonBias: number; // -1 (Baseline Future A) to +1 (Intervention Future B)
  mobileActiveFuture: 'A' | 'B';
  scenarioParams: ScenarioParameters;
  simTimeMinutes: number; // 360 to 1320
  isPlaying: boolean;
  causalStepIndex: number; // 0 to 4
  cutawayMode: boolean;
  selectedEntity: SelectedEntityInfo | null;
  hoveredDistrictId: DistrictId | null;
  hoveredWorld: 'A' | 'B' | null;
  highlightedRoadId: string | null;
  isStageExpanded: boolean;
  simDrawerOpen: boolean;
  cameraResetTick: number;
  projectedLabels: Record<string, { x: number; y: number; visible: boolean }>;

  // Actions
  setHeroState: (state: HeroPresentationState) => void;
  setHeroMode: (mode: HeroMode) => void;
  setPresentationMode: (mode: PresentationMode) => void;
  setInvisibleLayer: (layer: InfrastructureLayerId) => void;
  setComparisonBias: (bias: number) => void;
  setMobileActiveFuture: (future: 'A' | 'B') => void;
  setTrafficDemand: (pct: number) => void;
  setTransitCapacity: (pct: number) => void;
  setIntervention: (strategy: InterventionStrategy) => void;
  setBridgeClosed: (closed: boolean) => void;
  setSimTimeMinutes: (minutes: number) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  resetSimulation: () => void;
  setCausalStepIndex: (idx: number) => void;
  setCutawayMode: (enabled: boolean) => void;
  setSelectedEntity: (entity: SelectedEntityInfo | null) => void;
  setHoveredDistrictId: (id: DistrictId | null) => void;
  setHoveredWorld: (world: 'A' | 'B' | null) => void;
  setHighlightedRoadId: (roadId: string | null) => void;
  setStageExpanded: (expanded: boolean) => void;
  setSimDrawerOpen: (open: boolean) => void;
  resetCameraView: () => void;
  setProjectedLabels: (
    labels: Record<string, { x: number; y: number; visible: boolean }>
  ) => void;
  getCurrentSnapshots: () => {
    snapshotA: WorldSimulationSnapshot;
    snapshotB: WorldSimulationSnapshot;
  };
}

const isMobileViewport =
  typeof window !== 'undefined' && window.innerWidth < 768;

const initialWorld = generateCityWorld(20261031, isMobileViewport);

const DEFAULT_PARAMS: ScenarioParameters = {
  trafficDemandPct: 115,
  transitCapacityPct: 100,
  intervention: 'reroute_vehicles',
  bridgeClosed: true,
};

const initialTimeline = runDeterministicSimulation(
  initialWorld,
  DEFAULT_PARAMS,
  isMobileViewport ? 42 : 72
);

export const useParallelStore = create<ParallelStoreState>((set, get) => ({
  world: initialWorld,
  timeline: initialTimeline,
  heroState: 'cinematic',
  heroMode: 'explore',
  activeChapter: 1,
  presentationMode: 'cinematic',
  invisibleLayer: 'mobility',
  comparisonBias: 0,
  mobileActiveFuture: 'B',
  scenarioParams: DEFAULT_PARAMS,
  simTimeMinutes: 540, // 09:00 AM peak disruption window
  isPlaying: false,
  causalStepIndex: 0,
  cutawayMode: false,
  selectedEntity: null,
  hoveredDistrictId: null,
  hoveredWorld: null,
  highlightedRoadId: null,
  isStageExpanded: false,
  simDrawerOpen: true,
  cameraResetTick: 0,
  projectedLabels: {},

  setHeroState: (state) => {
    set({
      heroState: state,
      selectedEntity: state === 'cinematic' ? null : get().selectedEntity,
      highlightedRoadId: state === 'cinematic' ? null : get().highlightedRoadId,
      cutawayMode: state === 'cinematic' ? false : get().cutawayMode,
      presentationMode:
        state === 'cinematic'
          ? 'cinematic'
          : get().heroMode === 'simulate'
          ? 'simulation'
          : 'cinematic',
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setHeroMode: (mode) => {
    const ch = MODE_TO_CHAPTER[mode];
    const nextPres: PresentationMode =
      mode === 'simulate' ? 'simulation' : 'cinematic';

    set({
      heroState: 'interactive',
      heroMode: mode,
      activeChapter: ch,
      presentationMode: nextPres,
      cutawayMode: mode === 'explain' ? get().cutawayMode : false,
      selectedEntity: mode === 'explore' ? get().selectedEntity : null,
      highlightedRoadId: mode === 'explain' ? get().highlightedRoadId : null,
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setPresentationMode: (mode) => {
    set({
      presentationMode: mode,
      selectedEntity: mode === 'cinematic' ? null : get().selectedEntity,
    });
  },

  setInvisibleLayer: (layer) => {
    set({ invisibleLayer: layer });
  },

  setComparisonBias: (bias) => {
    set({ comparisonBias: Math.max(-1, Math.min(1, bias)) });
  },

  setMobileActiveFuture: (future) => {
    set({
      mobileActiveFuture: future,
      comparisonBias: future === 'A' ? -0.85 : 0.85,
    });
  },

  setTrafficDemand: (pct) => {
    const clamped = Math.max(60, Math.min(160, Math.round(pct)));
    const nextParams = { ...get().scenarioParams, trafficDemandPct: clamped };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setTransitCapacity: (pct) => {
    const clamped = Math.max(50, Math.min(150, Math.round(pct)));
    const nextParams = { ...get().scenarioParams, transitCapacityPct: clamped };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setIntervention: (strategy) => {
    const nextParams = { ...get().scenarioParams, intervention: strategy };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setBridgeClosed: (closed) => {
    const nextParams = { ...get().scenarioParams, bridgeClosed: closed };
    const nextTimeline = runDeterministicSimulation(
      get().world,
      nextParams,
      isMobileViewport ? 42 : 72
    );
    set({ scenarioParams: nextParams, timeline: nextTimeline });
  },

  setSimTimeMinutes: (minutes) => {
    const clamped = Math.max(360, Math.min(1320, minutes));
    set({ simTimeMinutes: clamped });
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setIsPlaying: (playing) => {
    set({ isPlaying: playing });
  },

  resetSimulation: () => {
    const nextTimeline = runDeterministicSimulation(
      get().world,
      DEFAULT_PARAMS,
      isMobileViewport ? 42 : 72
    );
    set({
      scenarioParams: DEFAULT_PARAMS,
      timeline: nextTimeline,
      simTimeMinutes: 540,
      isPlaying: false,
      comparisonBias: 0,
      selectedEntity: null,
      highlightedRoadId: null,
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setCausalStepIndex: (idx) => {
    const clamped = Math.max(0, Math.min(CAUSAL_SEQUENCE.length - 1, idx));
    set({ causalStepIndex: clamped });
  },

  setCutawayMode: (enabled) => {
    set({ cutawayMode: enabled });
  },

  setSelectedEntity: (entity) => {
    set({ selectedEntity: entity });
  },

  setHoveredDistrictId: (id) => {
    set({ hoveredDistrictId: id });
  },

  setHoveredWorld: (world) => {
    set({ hoveredWorld: world });
  },

  setHighlightedRoadId: (roadId) => {
    set({ highlightedRoadId: roadId });
  },

  setStageExpanded: (expanded) => {
    set({ isStageExpanded: expanded });
  },

  setSimDrawerOpen: (open) => {
    set({ simDrawerOpen: open });
  },

  resetCameraView: () => {
    set({
      selectedEntity: null,
      highlightedRoadId: null,
      comparisonBias: 0,
      presentationMode:
        get().heroMode === 'simulate' ? 'simulation' : 'cinematic',
      cameraResetTick: get().cameraResetTick + 1,
    });
  },

  setProjectedLabels: (labels) => {
    set({ projectedLabels: labels });
  },

  getCurrentSnapshots: () => {
    const { timeline, simTimeMinutes } = get();
    return {
      snapshotA: getSnapshotAtTime(timeline, 'A', simTimeMinutes),
      snapshotB: getSnapshotAtTime(timeline, 'B', simTimeMinutes),
    };
  },
}));
]]>
    </file>
    <file path="src/app/(parallel)/parallel/world/cityGenerator.ts">
<![CDATA[export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export type DistrictId =
  | 'cbd'
  | 'harbor'
  | 'north_res'
  | 'east_tech'
  | 'south_ind'
  | 'central_park';

export type ArchitecturalFamily =
  | 'glass_tower'
  | 'mid_rise_commercial'
  | 'residential_block'
  | 'industrial_warehouse'
  | 'transit_facility'
  | 'civic_building';

export type RoofType =
  | 'flat_mechanical'
  | 'crown_spire'
  | 'sloped_solar'
  | 'sawtooth'
  | 'arch_vault'
  | 'stepped_terrace';

export type FacadeStyle =
  | 'curtain_wall'
  | 'vertical_fins'
  | 'recessed_grid'
  | 'brushed_panel'
  | 'masonry_ribbed';

export interface DistrictDefinition {
  id: DistrictId;
  name: string;
  code: string;
  purpose: string;
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  center: { x: number; z: number };
  baseElevation: number;
  baselineDemandMw: number;
  primaryFamily: ArchitecturalFamily;
}

export interface BuildingDefinition {
  id: string;
  name: string;
  districtId: DistrictId;
  family: ArchitecturalFamily;
  roofType: RoofType;
  facadeStyle: FacadeStyle;
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  rotationY: number;
  energyDemandKw: number;
  windowDensity: number;
  seed: number;
  isLandmark: boolean;
}

export interface RoadNode {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  districtId: DistrictId;
  nodeType: 'intersection' | 'bridge_anchor' | 'substation' | 'logistics_hub' | 'transit_station';
  description: string;
}

export interface RoadEdge {
  id: string;
  name: string;
  from: string;
  to: string;
  districtId: DistrictId;
  length: number;
  baseCapacity: number;
  baseSpeed: number; // units per minute
  isBridge: boolean;
  isAlternateRoute: boolean;
  isTransitCorridor: boolean;
  isDeliveryCorridor: boolean;
  elevation: number;
  points: Array<{ x: number; y: number; z: number }>;
}

export interface InfrastructureNode {
  id: string;
  name: string;
  layer: 'mobility' | 'energy' | 'logistics';
  districtId: DistrictId;
  x: number;
  y: number;
  z: number;
  capacityLabel: string;
  dependencySummary: string;
  connectedNodeIds: string[];
}

export interface TreeInstance {
  id: string;
  x: number;
  z: number;
  scale: number;
  tint: number;
}

export interface CityWorldData {
  seed: number;
  plinthWidth: number;
  plinthDepth: number;
  riverZ: number;
  districts: DistrictDefinition[];
  buildings: BuildingDefinition[];
  nodes: RoadNode[];
  edges: RoadEdge[];
  infrastructure: InfrastructureNode[];
  trees: TreeInstance[];
}

/**
 * Deterministic 32-bit PRNG (Mulberry32)
 */
export function createSeededRng(seed: number): () => number {
  let a = seed >>> 0;
  return function rng() {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DISTRICTS: DistrictDefinition[] = [
  {
    id: 'cbd',
    name: 'Central Business District',
    code: 'SEC-01 / FINANCIAL CORE',
    purpose: 'High-density commercial towers, regional transit hub, and primary peak electrical demand sink.',
    bounds: { minX: -14, maxX: 6, minZ: -17, maxZ: -3 },
    center: { x: -4, z: -10 },
    baseElevation: 0.2,
    baselineDemandMw: 48.5,
    primaryFamily: 'glass_tower',
  },
  {
    id: 'east_tech',
    name: 'East Innovation & Civic Quarter',
    code: 'SEC-02 / CIVIC & MED-TECH',
    purpose: 'Municipal emergency services, university hospital, and high-reliability research laboratories.',
    bounds: { minX: 7, maxX: 22, minZ: -17, maxZ: -3 },
    center: { x: 14.5, z: -10 },
    baseElevation: 0.2,
    baselineDemandMw: 31.0,
    primaryFamily: 'civic_building',
  },
  {
    id: 'north_res',
    name: 'Northside Residential Quarter',
    code: 'SEC-03 / HIGH-DENSITY HOUSING',
    purpose: 'Mixed-income perimeter courtyard blocks generating morning outbound and evening inbound commuter waves.',
    bounds: { minX: -22, maxX: -15, minZ: -17, maxZ: -3 },
    center: { x: -18.5, z: -10 },
    baseElevation: 0.2,
    baselineDemandMw: 22.4,
    primaryFamily: 'residential_block',
  },
  {
    id: 'central_park',
    name: 'Meridian River & Transit Commons',
    code: 'SEC-04 / ARTERIAL CROSSING',
    purpose: 'Hydrological channel spanned by the Meridian Central Bridge, North Viaduct, and Elevated Rail Corridor.',
    bounds: { minX: -22, maxX: 22, minZ: -2.8, maxZ: 2.8 },
    center: { x: 0, z: 0 },
    baseElevation: 0.0,
    baselineDemandMw: 8.2,
    primaryFamily: 'transit_facility',
  },
  {
    id: 'harbor',
    name: 'West Harbor & Logistics Terminal',
    code: 'SEC-05 / INTERMODAL PORT',
    purpose: 'Automated container berths, cold-chain consolidation warehouses, and urban freight dispatch.',
    bounds: { minX: -22, maxX: -2, minZ: 3.2, maxZ: 17 },
    center: { x: -12, z: 10 },
    baseElevation: 0.15,
    baselineDemandMw: 36.8,
    primaryFamily: 'industrial_warehouse',
  },
  {
    id: 'south_ind',
    name: 'South Grid & Clean Energy Park',
    code: 'SEC-06 / SUBSTATION & SOLAR',
    purpose: '220kV primary step-down substation, utility-scale battery storage, and mid-rise commercial distribution.',
    bounds: { minX: -1, maxX: 22, minZ: 3.2, maxZ: 17 },
    center: { x: 10.5, z: 10 },
    baseElevation: 0.18,
    baselineDemandMw: 19.5,
    primaryFamily: 'mid_rise_commercial',
  },
];

function createRoadGraph(): { nodes: RoadNode[]; edges: RoadEdge[] } {
  const nodes: RoadNode[] = [
    // North bank nodes (z < 0)
    {
      id: 'N-RES-NW',
      label: 'Northside West Junction',
      x: -18,
      y: 0.25,
      z: -13,
      districtId: 'north_res',
      nodeType: 'intersection',
      description: 'Residential collector feeding commuter avenues.',
    },
    {
      id: 'N-RES-SW',
      label: 'West Viaduct Approach (North)',
      x: -18,
      y: 0.25,
      z: -4.5,
      districtId: 'north_res',
      nodeType: 'bridge_anchor',
      description: 'Northern approach to the West Harbor Bypass Viaduct.',
    },
    {
      id: 'N-CBD-NW',
      label: 'Financial Plaza North',
      x: -8,
      y: 0.25,
      z: -13,
      districtId: 'cbd',
      nodeType: 'intersection',
      description: 'High-volume intersection serving commercial towers.',
    },
    {
      id: 'N-CBD-NE',
      label: 'Central Transit Hub',
      x: 2,
      y: 0.25,
      z: -13,
      districtId: 'cbd',
      nodeType: 'transit_station',
      description: 'Multimodal rail and bus rapid transit interchange.',
    },
    {
      id: 'N-CBD-SW',
      label: 'Exchange Square',
      x: -8,
      y: 0.25,
      z: -4.5,
      districtId: 'cbd',
      nodeType: 'intersection',
      description: 'Western gateway to the Central Business District.',
    },
    {
      id: 'N-BRIDGE-N',
      label: 'Meridian Bridge North Anchor',
      x: 0,
      y: 0.35,
      z: -4.5,
      districtId: 'cbd',
      nodeType: 'bridge_anchor',
      description: 'Primary northern landing of the 6-lane Meridian Central Bridge.',
    },
    {
      id: 'N-TECH-N',
      label: 'Science Park North',
      x: 13,
      y: 0.25,
      z: -13,
      districtId: 'east_tech',
      nodeType: 'intersection',
      description: 'Access node for the Medical Center and Civic Campus.',
    },
    {
      id: 'N-TECH-S',
      label: 'East Crossing Approach (North)',
      x: 14,
      y: 0.3,
      z: -4.5,
      districtId: 'east_tech',
      nodeType: 'bridge_anchor',
      description: 'Northern approach to the East Tech Span.',
    },

    // South bank nodes (z > 0)
    {
      id: 'S-HARBOR-NW',
      label: 'West Viaduct Approach (South)',
      x: -18,
      y: 0.25,
      z: 4.5,
      districtId: 'harbor',
      nodeType: 'bridge_anchor',
      description: 'Southern landing of the West Harbor Bypass Viaduct.',
    },
    {
      id: 'S-HARBOR-HUB',
      label: 'Port Logistics Gate A',
      x: -12,
      y: 0.25,
      z: 11,
      districtId: 'harbor',
      nodeType: 'logistics_hub',
      description: 'Primary intermodal freight dispatch terminal (340 trucks/hr capacity).',
    },
    {
      id: 'S-HARBOR-E',
      label: 'Docklands Arterial',
      x: -6,
      y: 0.25,
      z: 5.5,
      districtId: 'harbor',
      nodeType: 'intersection',
      description: 'Connector linking container berths to Meridian Bridge.',
    },
    {
      id: 'S-BRIDGE-S',
      label: 'Meridian Bridge South Anchor',
      x: 0,
      y: 0.35,
      z: 4.5,
      districtId: 'south_ind',
      nodeType: 'bridge_anchor',
      description: 'Primary southern landing of the Meridian Central Bridge.',
    },
    {
      id: 'S-GRID-SUB',
      label: 'Meridian 220kV Substation',
      x: 6,
      y: 0.25,
      z: 11,
      districtId: 'south_ind',
      nodeType: 'substation',
      description: 'Primary high-voltage step-down transformer feeding CBD & Harbor.',
    },
    {
      id: 'S-IND-NE',
      label: 'East Crossing Approach (South)',
      x: 14,
      y: 0.3,
      z: 4.5,
      districtId: 'south_ind',
      nodeType: 'bridge_anchor',
      description: 'Southern landing of the East Tech Span.',
    },
    {
      id: 'S-IND-SE',
      label: 'Solar Park & South Depot',
      x: 15,
      y: 0.25,
      z: 12,
      districtId: 'south_ind',
      nodeType: 'logistics_hub',
      description: 'Regional distribution annex and battery storage complex.',
    },
  ];

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  function buildEdge(
    id: string,
    name: string,
    from: string,
    to: string,
    opts: {
      baseCapacity: number;
      baseSpeed: number;
      isBridge?: boolean;
      isAlternateRoute?: boolean;
      isTransitCorridor?: boolean;
      isDeliveryCorridor?: boolean;
      elevation?: number;
      midOffset?: { x?: number; y?: number; z?: number };
    }
  ): RoadEdge {
    const a = nodeMap.get(from)!;
    const b = nodeMap.get(to)!;
    const elev = opts.elevation ?? 0.25;
    const midX = (a.x + b.x) * 0.5 + (opts.midOffset?.x ?? 0);
    const midY = Math.max(a.y, b.y, elev) + (opts.midOffset?.y ?? 0);
    const midZ = (a.z + b.z) * 0.5 + (opts.midOffset?.z ?? 0);

    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const length = Math.hypot(dx, dz);

    return {
      id,
      name,
      from,
      to,
      districtId: a.districtId,
      length: Number(length.toFixed(2)),
      baseCapacity: opts.baseCapacity,
      baseSpeed: opts.baseSpeed,
      isBridge: Boolean(opts.isBridge),
      isAlternateRoute: Boolean(opts.isAlternateRoute),
      isTransitCorridor: Boolean(opts.isTransitCorridor),
      isDeliveryCorridor: Boolean(opts.isDeliveryCorridor),
      elevation: elev,
      points: [
        { x: a.x, y: a.y, z: a.z },
        { x: midX, y: midY, z: midZ },
        { x: b.x, y: b.y, z: b.z },
      ],
    };
  }

  const rawPairs: Array<{
    idBase: string;
    name: string;
    u: string;
    v: string;
    baseCapacity: number;
    baseSpeed: number;
    isBridge?: boolean;
    isAlternateRoute?: boolean;
    isTransitCorridor?: boolean;
    isDeliveryCorridor?: boolean;
    elevation?: number;
    midOffset?: { x?: number; y?: number; z?: number };
  }> = [
    // Primary Central Bridge (Can be closed in disruption)
    {
      idBase: 'EDGE-BRIDGE-CENTRAL',
      name: 'Meridian Central Bridge',
      u: 'S-BRIDGE-S',
      v: 'N-BRIDGE-N',
      baseCapacity: 140,
      baseSpeed: 12,
      isBridge: true,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
      elevation: 0.75,
      midOffset: { y: 0.45 },
    },
    // West Harbor Bypass Viaduct (Alternate crossing 1)
    {
      idBase: 'EDGE-BRIDGE-WEST',
      name: 'West Harbor Bypass Viaduct',
      u: 'S-HARBOR-NW',
      v: 'N-RES-SW',
      baseCapacity: 85,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
      elevation: 0.65,
      midOffset: { y: 0.35 },
    },
    // East Tech Span (Alternate crossing 2)
    {
      idBase: 'EDGE-BRIDGE-EAST',
      name: 'East Innovation Crossing',
      u: 'S-IND-NE',
      v: 'N-TECH-S',
      baseCapacity: 95,
      baseSpeed: 11,
      isAlternateRoute: true,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
      elevation: 0.65,
      midOffset: { y: 0.35 },
    },

    // North bank avenues
    {
      idBase: 'EDGE-N-AVE-1',
      name: 'Northside Arterial',
      u: 'N-RES-NW',
      v: 'N-RES-SW',
      baseCapacity: 80,
      baseSpeed: 9,
      isAlternateRoute: true,
    },
    {
      idBase: 'EDGE-N-AVE-2',
      name: 'Boulevard West',
      u: 'N-RES-NW',
      v: 'N-CBD-NW',
      baseCapacity: 95,
      baseSpeed: 10,
      isTransitCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-3',
      name: 'Riverfront West',
      u: 'N-RES-SW',
      v: 'N-CBD-SW',
      baseCapacity: 90,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-4',
      name: 'Financial Spine West',
      u: 'N-CBD-SW',
      v: 'N-CBD-NW',
      baseCapacity: 110,
      baseSpeed: 9,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-5',
      name: 'Exchange Embankment',
      u: 'N-CBD-SW',
      v: 'N-BRIDGE-N',
      baseCapacity: 120,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-6',
      name: 'Meridian Financial Avenue',
      u: 'N-BRIDGE-N',
      v: 'N-CBD-NE',
      baseCapacity: 130,
      baseSpeed: 11,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-7',
      name: 'Midtown Crosstown',
      u: 'N-CBD-NW',
      v: 'N-CBD-NE',
      baseCapacity: 115,
      baseSpeed: 10,
      isTransitCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-8',
      name: 'Innovation Parkway',
      u: 'N-CBD-NE',
      v: 'N-TECH-N',
      baseCapacity: 105,
      baseSpeed: 11,
      isTransitCorridor: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-N-AVE-9',
      name: 'East Embankment',
      u: 'N-BRIDGE-N',
      v: 'N-TECH-S',
      baseCapacity: 100,
      baseSpeed: 10,
      isAlternateRoute: true,
    },
    {
      idBase: 'EDGE-N-AVE-10',
      name: 'Civic Connector',
      u: 'N-TECH-S',
      v: 'N-TECH-N',
      baseCapacity: 95,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },

    // South bank avenues
    {
      idBase: 'EDGE-S-AVE-1',
      name: 'Harbor West Quay',
      u: 'S-HARBOR-HUB',
      v: 'S-HARBOR-NW',
      baseCapacity: 95,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-2',
      name: 'Terminal Express',
      u: 'S-HARBOR-HUB',
      v: 'S-HARBOR-E',
      baseCapacity: 120,
      baseSpeed: 10,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-3',
      name: 'North Dock Link',
      u: 'S-HARBOR-NW',
      v: 'S-HARBOR-E',
      baseCapacity: 85,
      baseSpeed: 9,
      isAlternateRoute: true,
    },
    {
      idBase: 'EDGE-S-AVE-4',
      name: 'Port-to-Bridge Causeway',
      u: 'S-HARBOR-E',
      v: 'S-BRIDGE-S',
      baseCapacity: 125,
      baseSpeed: 10,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-5',
      name: 'Substation Ring Road',
      u: 'S-HARBOR-HUB',
      v: 'S-GRID-SUB',
      baseCapacity: 90,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-6',
      name: 'South Grid Collector',
      u: 'S-BRIDGE-S',
      v: 'S-GRID-SUB',
      baseCapacity: 105,
      baseSpeed: 10,
      isTransitCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-7',
      name: 'South Riverfront East',
      u: 'S-BRIDGE-S',
      v: 'S-IND-NE',
      baseCapacity: 100,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-8',
      name: 'Energy Park Way',
      u: 'S-GRID-SUB',
      v: 'S-IND-NE',
      baseCapacity: 95,
      baseSpeed: 10,
      isAlternateRoute: true,
      isDeliveryCorridor: true,
    },
    {
      idBase: 'EDGE-S-AVE-9',
      name: 'Solar Annex Spur',
      u: 'S-GRID-SUB',
      v: 'S-IND-SE',
      baseCapacity: 85,
      baseSpeed: 9,
    },
    {
      idBase: 'EDGE-S-AVE-10',
      name: 'East Logistics Expressway',
      u: 'S-IND-SE',
      v: 'S-IND-NE',
      baseCapacity: 95,
      baseSpeed: 10,
      isDeliveryCorridor: true,
    },
  ];

  const edges: RoadEdge[] = [];
  for (const pair of rawPairs) {
    edges.push(
      buildEdge(`${pair.idBase}-FWD`, pair.name, pair.u, pair.v, pair),
      buildEdge(`${pair.idBase}-REV`, `${pair.name} (Inbound)`, pair.v, pair.u, pair)
    );
  }

  return { nodes, edges };
}

function isNearRoadOrRiver(x: number, z: number, edges: RoadEdge[]): boolean {
  // Keep river channel clear (-3.1 to +3.1)
  if (Math.abs(z) < 3.2) return true;
  // Check distance to road segments
  for (const edge of edges) {
    if (!edge.id.endsWith('-FWD')) continue;
    const p0 = edge.points[0];
    const p2 = edge.points[2];
    const dx = p2.x - p0.x;
    const dz = p2.z - p0.z;
    const lenSq = dx * dx + dz * dz;
    if (lenSq === 0) continue;
    const t = Math.max(0, Math.min(1, ((x - p0.x) * dx + (z - p0.z) * dz) / lenSq));
    const projX = p0.x + t * dx;
    const projZ = p0.z + t * dz;
    const dist = Math.hypot(x - projX, z - projZ);
    if (dist < 0.92) return true;
  }
  return false;
}

export function generateCityWorld(seed = 20261031, isMobile = false): CityWorldData {
  const rng = createSeededRng(seed);
  const { nodes, edges } = createRoadGraph();

  const targetBuildingCount = isMobile ? 115 : 215;
  const buildings: BuildingDefinition[] = [];

  const roofTypes: RoofType[] = [
    'flat_mechanical',
    'crown_spire',
    'sloped_solar',
    'sawtooth',
    'arch_vault',
    'stepped_terrace',
  ];
  const facadeStyles: FacadeStyle[] = [
    'curtain_wall',
    'vertical_fins',
    'recessed_grid',
    'brushed_panel',
    'masonry_ribbed',
  ];

  // Guarantee at least several buildings of every architectural family
  const families: ArchitecturalFamily[] = [
    'glass_tower',
    'mid_rise_commercial',
    'residential_block',
    'industrial_warehouse',
    'transit_facility',
    'civic_building',
  ];

  let attempts = 0;
  const maxAttempts = 8000;

  while (buildings.length < targetBuildingCount && attempts < maxAttempts) {
    attempts++;

    // Pick a district (excluding central river except for a few transit/park pavilions)
    const districtRoll = rng();
    let district: DistrictDefinition;
    if (districtRoll < 0.28) district = DISTRICTS[0]; // cbd
    else if (districtRoll < 0.48) district = DISTRICTS[1]; // east_tech
    else if (districtRoll < 0.64) district = DISTRICTS[2]; // north_res
    else if (districtRoll < 0.82) district = DISTRICTS[4]; // harbor
    else if (districtRoll < 0.97) district = DISTRICTS[5]; // south_ind
    else district = DISTRICTS[3]; // central_park pavilions

    const x =
      district.bounds.minX +
      0.5 +
      rng() * (district.bounds.maxX - district.bounds.minX - 1.0);
    const z =
      district.bounds.minZ +
      0.5 +
      rng() * (district.bounds.maxZ - district.bounds.minZ - 1.0);

    if (district.id !== 'central_park' && isNearRoadOrRiver(x, z, edges)) {
      continue;
    }
    if (district.id === 'central_park' && (Math.abs(z) < 2.2 || Math.abs(x) < 4)) {
      continue;
    }

    // Choose architectural family based on district with controlled diversity
    let family: ArchitecturalFamily = district.primaryFamily;
    if (buildings.length < families.length * 4) {
      family = families[buildings.length % families.length];
    } else if (rng() < 0.25) {
      family = families[Math.floor(rng() * families.length)];
    }

    // Determine footprint & height by family
    let width = 0.78 + rng() * 0.55;
    let depth = 0.78 + rng() * 0.55;
    let height = 2.0 + rng() * 3.0;
    let roofType: RoofType = roofTypes[Math.floor(rng() * roofTypes.length)];
    let facadeStyle: FacadeStyle = facadeStyles[Math.floor(rng() * facadeStyles.length)];

    if (family === 'glass_tower') {
      width = 0.85 + rng() * 0.65;
      depth = 0.85 + rng() * 0.65;
      const distFromCbdCenter = Math.hypot(x - -4, z - -10);
      const cbdBoost = Math.max(0.35, 1.4 - distFromCbdCenter * 0.08);
      height = (5.2 + rng() * 6.8) * cbdBoost;
      roofType = rng() < 0.45 ? 'crown_spire' : 'stepped_terrace';
      facadeStyle = rng() < 0.6 ? 'curtain_wall' : 'vertical_fins';
    } else if (family === 'mid_rise_commercial') {
      width = 0.85 + rng() * 0.65;
      depth = 0.82 + rng() * 0.62;
      height = 2.4 + rng() * 3.2;
      roofType = rng() < 0.5 ? 'flat_mechanical' : 'stepped_terrace';
      facadeStyle = 'recessed_grid';
    } else if (family === 'residential_block') {
      width = 0.75 + rng() * 0.65;
      depth = 0.72 + rng() * 0.58;
      height = 1.8 + rng() * 2.6;
      roofType = rng() < 0.5 ? 'sloped_solar' : 'flat_mechanical';
      facadeStyle = 'masonry_ribbed';
    } else if (family === 'industrial_warehouse') {
      width = 1.15 + rng() * 0.85;
      depth = 0.95 + rng() * 0.75;
      height = 1.1 + rng() * 1.3;
      roofType = rng() < 0.65 ? 'sawtooth' : 'sloped_solar';
      facadeStyle = 'brushed_panel';
    } else if (family === 'transit_facility') {
      width = 1.05 + rng() * 0.7;
      depth = 0.85 + rng() * 0.55;
      height = 1.4 + rng() * 1.5;
      roofType = 'arch_vault';
      facadeStyle = 'vertical_fins';
    } else if (family === 'civic_building') {
      width = 0.95 + rng() * 0.75;
      depth = 0.9 + rng() * 0.7;
      height = 2.6 + rng() * 3.0;
      roofType = 'stepped_terrace';
      facadeStyle = 'vertical_fins';
    }

    // Overlap check against existing buildings
    let overlaps = false;
    for (const other of buildings) {
      const minSepX = (width + other.width) * 0.5 + 0.14;
      const minSepZ = (depth + other.depth) * 0.5 + 0.14;
      if (Math.abs(x - other.x) < minSepX && Math.abs(z - other.z) < minSepZ) {
        overlaps = true;
        break;
      }
    }
    if (overlaps) continue;

    const idx = buildings.length + 1;
    const isLandmark = height > 8.2 || idx <= 6;
    const energyDemandKw = Math.round(width * depth * height * (family === 'glass_tower' ? 42 : 28));

    buildings.push({
      id: `BLD-${String(idx).padStart(3, '0')}`,
      name: isLandmark
        ? `${district.name.split(' ')[0]} Tower ${idx}`
        : `${district.code.split(' ')[0]} Block ${idx}`,
      districtId: district.id,
      family,
      roofType,
      facadeStyle,
      x: Number(x.toFixed(2)),
      z: Number(z.toFixed(2)),
      width: Number(width.toFixed(2)),
      depth: Number(depth.toFixed(2)),
      height: Number(height.toFixed(2)),
      rotationY: rng() < 0.85 ? 0 : Math.PI * 0.5,
      energyDemandKw,
      windowDensity: Number((0.45 + rng() * 0.45).toFixed(2)),
      seed: Math.floor(rng() * 100000),
      isLandmark,
    });
  }

  const infrastructure: InfrastructureNode[] = [
    {
      id: 'INF-MOB-BRIDGE',
      name: 'Meridian Central Bridge',
      layer: 'mobility',
      districtId: 'central_park',
      x: 0,
      y: 1.4,
      z: 0,
      capacityLabel: '140 veh/min · 6 Lanes + Transit Deck',
      dependencySummary: 'Carries 54% of cross-river commuter & freight flow between Harbor, South Grid, and CBD.',
      connectedNodeIds: ['N-BRIDGE-N', 'S-BRIDGE-S'],
    },
    {
      id: 'INF-MOB-HUB',
      name: 'Central Multimodal Station',
      layer: 'mobility',
      districtId: 'cbd',
      x: 2,
      y: 2.2,
      z: -13,
      capacityLabel: '48,000 pax/hr · Elevated Rail & BRT',
      dependencySummary: 'Absorbs diverted commuter demand when transit capacity scales above baseline.',
      connectedNodeIds: ['N-CBD-NE', 'N-TECH-N'],
    },
    {
      id: 'INF-NRG-SUB',
      name: 'Meridian 220kV Primary Substation',
      layer: 'energy',
      districtId: 'south_ind',
      x: 6,
      y: 1.8,
      z: 11,
      capacityLabel: '185 MW Peak Rating · Dual Busbar',
      dependencySummary: 'Supplies high-voltage feeders under the river to CBD towers and Cold-Chain Port.',
      connectedNodeIds: ['S-GRID-SUB', 'N-BRIDGE-N', 'S-HARBOR-HUB'],
    },
    {
      id: 'INF-NRG-SOLAR',
      name: 'South Grid Solar & Megapack Array',
      layer: 'energy',
      districtId: 'south_ind',
      x: 15,
      y: 1.5,
      z: 12,
      capacityLabel: '64 MWh Dispatchable Storage',
      dependencySummary: 'Buffers afternoon commercial peak and stabilizes electrified transit load.',
      connectedNodeIds: ['S-IND-SE', 'S-GRID-SUB'],
    },
    {
      id: 'INF-LOG-PORT',
      name: 'West Harbor Intermodal Terminal',
      layer: 'logistics',
      districtId: 'harbor',
      x: -12,
      y: 1.9,
      z: 11,
      capacityLabel: '340 TEU/hr · Cold-Chain & Medical Freight',
      dependencySummary: 'Origin of time-critical hospital & commercial deliveries crossing to North Bank.',
      connectedNodeIds: ['S-HARBOR-HUB', 'S-HARBOR-E', 'S-HARBOR-NW'],
    },
    {
      id: 'INF-LOG-MED',
      name: 'East Civic & Hospital Distribution Hub',
      layer: 'logistics',
      districtId: 'east_tech',
      x: 13,
      y: 2.0,
      z: -13,
      capacityLabel: 'Priority SLA Tier-1 Destination',
      dependencySummary: 'Sensitive to cross-river transit delays; depends on East Crossing when Central Bridge closes.',
      connectedNodeIds: ['N-TECH-N', 'N-TECH-S'],
    },
  ];

  // Generate planted trees along riverbanks, parks, and avenues
  const trees: TreeInstance[] = [];
  const treeTarget = isMobile ? 70 : 140;
  let treeAttempts = 0;
  while (trees.length < treeTarget && treeAttempts < 1200) {
    treeAttempts++;
    const tx = -21 + rng() * 42;
    const tz = -16 + rng() * 32;
    // Prefer river promenades (2.3 < |z| < 3.6) or park/residential pockets
    const onPromenade = Math.abs(tz) > 2.2 && Math.abs(tz) < 3.4 && Math.abs(tx) > 1.8;
    if (!onPromenade && isNearRoadOrRiver(tx, tz, edges)) continue;

    let insideBuilding = false;
    for (const b of buildings) {
      if (
        Math.abs(tx - b.x) < b.width * 0.5 + 0.45 &&
        Math.abs(tz - b.z) < b.depth * 0.5 + 0.45
      ) {
        insideBuilding = true;
        break;
      }
    }
    if (insideBuilding) continue;

    trees.push({
      id: `TREE-${trees.length + 1}`,
      x: Number(tx.toFixed(2)),
      z: Number(tz.toFixed(2)),
      scale: Number((0.85 + rng() * 0.3).toFixed(2)),
      tint: Number((rng() * 0.2 - 0.1).toFixed(2)),
    });
  }

  return {
    seed,
    plinthWidth: 48,
    plinthDepth: 38,
    riverZ: 0,
    districts: DISTRICTS,
    buildings,
    nodes,
    edges,
    infrastructure,
    trees,
  };
}
]]>
    </file>
  </files>
</template>
