<template slug="arcsignal" name="Arc & Signal">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(arcsignal)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./arcsignal/arcsignal.css";

const jetBrains_Mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Arc & Signal — Intelligence, in Sync.",
  description: "Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.",
  openGraph: {
    title: "Arc & Signal — Intelligence, in Sync.",
    description: "Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C0F1B",
};

export default function ArcsignalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jetBrains_Mono.variable} ${outfit.variable} ${plus_Jakarta_Sans.variable} scroll-smooth`}>
      <body className="bg-[#0C0F1B] text-[#F3F4FA] antialiased selection:bg-[#A58AFF]/30 selection:text-[#F3F4FA] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/arcsignal.css">
<![CDATA[@import "tailwindcss";

:root {
  --bg: #0C0F1B;
  --bg-abyss: #080b16;
  --bg-deep: #0c1020;
  --bg-elevated: #10172a;
  --bg-violet: #8c72ff;
  --bg-periwinkle: #5d6bff;
  --bg-cyan-subtle: #7fb5d4;
  --bg-field-intensity: 0.36;
  --bg-grid-opacity: 0.11;
  --bg-focus-x: 68%;
  --bg-focus-y: 42%;
  --bg-secondary-x: 74%;
  --bg-secondary-y: 52%;
  --panel: #11172A;
  --panel-raised: #171D32;
  --white: #F3F4FA;
  --steel: #9DA7C7;
  --muted: #9299B4;
  --violet: #A58AFF;
  --cobalt: #5367F9;
  --line: rgba(157, 167, 199, 0.18);
  --signal-core: #D4C9FF;
  --signal-mid: #977FFF;
  --signal-edge: #5367F9;
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-cinematic: cubic-bezier(0.76, 0, 0.24, 1);
}

@layer base {
  html {
    background-color: var(--bg-abyss);
    color: var(--white);
    font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--bg-abyss);
    color: var(--white);
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
}

.font-display {
  font-family: var(--font-outfit), 'Outfit', var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif;
  letter-spacing: -0.02em;
}

.font-mono-tech {
  font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

/* Crisp violet-to-cobalt gradient text matching References 01 & 02 */
.text-signal-gradient {
  background: linear-gradient(92deg, #C4B0FF 0%, #977FFF 45%, #5367F9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Outlined luminous headline treatment for Reference 04 "AS ONE." */
.text-as-one-glow {
  background: linear-gradient(90deg, rgba(165, 138, 255, 0.35) 0%, rgba(83, 103, 249, 0.35) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px #A58AFF;
  filter: drop-shadow(0 0 18px rgba(151, 127, 255, 0.45));
}

/* Primary button matching Reference 01 & 04 */
.btn-signal-primary {
  background: linear-gradient(92deg, #9B82FF 0%, #6D73FC 55%, #5367F9 100%);
  box-shadow: 0 0 24px rgba(151, 127, 255, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  border: 1px solid rgba(212, 201, 255, 0.5);
  transition: transform 220ms var(--ease-editorial), box-shadow 220ms var(--ease-editorial);
}

.btn-signal-primary:hover {
  box-shadow: 0 0 32px rgba(165, 138, 255, 0.62), inset 0 1px 0 rgba(255, 255, 255, 0.52);
}

/* Secondary outlined pill button matching References 01, 02, 03, 04 */
.btn-signal-outline {
  background: rgba(17, 23, 42, 0.65);
  border: 1px solid rgba(157, 167, 199, 0.32);
  box-shadow: inset 0 0 12px rgba(151, 127, 255, 0.06);
  transition: transform 220ms var(--ease-editorial), border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
}

.btn-signal-outline:hover {
  border-color: rgba(165, 138, 255, 0.75);
  background: rgba(23, 29, 50, 0.9);
  box-shadow: 0 0 20px rgba(151, 127, 255, 0.24), inset 0 0 14px rgba(151, 127, 255, 0.14);
}

/* Directional arrow slide on button hover */
.btn-arrow-icon {
  transition: transform 240ms var(--ease-editorial);
}

button:hover .btn-arrow-icon,
a:hover .btn-arrow-icon {
  transform: translate(2.5px, -2.5px);
}

/* Masked typography line container */
.line-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.04em;
}

.line-mask-inner {
  display: block;
  will-change: transform;
  transition: transform 720ms var(--ease-editorial), letter-spacing 820ms var(--ease-editorial);
}

/* Subtle architectural dot grid for canvases */
.bg-dot-matrix {
  background-image: radial-gradient(rgba(157, 167, 199, 0.16) 1px, transparent 1px);
  background-size: 18px 18px;
}

/* Legacy utility kept transparent so #ambient-system owns the continuous viewport environment */
.bg-architectural-grid {
  background-color: transparent;
}

/* ============================================================================
   PERSISTENT LIVING SIGNAL FIELD (#ambient-system)
   One fixed, viewport-sized 7-layer atmospheric world shared across all scenes
   ============================================================================ */
#ambient-system {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  isolation: isolate;
  background-color: var(--bg-abyss);
}

.ambient-system__color,
.ambient-system__volumes,
.ambient-system__structure,
.ambient-system__grid,
.ambient-system__grain,
.ambient-system__reading-guard {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Layer 1: Deep Color Foundation — soft midnight/near-black field with localized focus */
.ambient-system__color {
  background:
    radial-gradient(
      ellipse 58% 66% at var(--bg-focus-x) var(--bg-focus-y),
      rgba(92, 78, 178, calc(var(--bg-field-intensity) * 0.42)) 0%,
      rgba(48, 60, 136, calc(var(--bg-field-intensity) * 0.18)) 44%,
      transparent 74%
    ),
    radial-gradient(
      ellipse 46% 52% at var(--bg-secondary-x) var(--bg-secondary-y),
      rgba(74, 92, 196, calc(var(--bg-field-intensity) * 0.24)) 0%,
      transparent 70%
    ),
    linear-gradient(152deg, var(--bg-abyss) 0%, var(--bg-deep) 58%, #090c18 100%);
}

/* Layer 2: Atmospheric Subsurface Volumes — feathered low-contrast dispersions */
.ambient-system__volumes {
  background:
    radial-gradient(
      ellipse 36% 48% at var(--bg-focus-x) var(--bg-focus-y),
      rgba(130, 108, 235, calc(var(--bg-field-intensity) * 0.28)) 0%,
      rgba(83, 103, 249, calc(var(--bg-field-intensity) * 0.11)) 48%,
      transparent 76%
    ),
    radial-gradient(
      ellipse 52% 42% at 76% 78%,
      rgba(52, 72, 158, calc(var(--bg-field-intensity) * 0.19)) 0%,
      transparent 74%
    );
  transform: translateZ(0);
}

/* Layer 3 & 5: Engineered Structural Field & Ghost Signal Conduits (SVG) */
.ambient-system__structure {
  opacity: 0.92;
  will-change: transform;
}

/* Layer 4: Selective Technical Reference Grid — masked so it never looks like uniform wallpaper */
.ambient-system__grid {
  background-image:
    linear-gradient(to right, rgba(142, 152, 206, 0.085) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(142, 152, 206, 0.085) 1px, transparent 1px);
  background-size: 72px 72px;
  opacity: var(--bg-grid-opacity);
  -webkit-mask-image:
    radial-gradient(
      ellipse 56% 64% at var(--bg-focus-x) var(--bg-focus-y),
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.45) 48%,
      rgba(0, 0, 0, 0.08) 78%,
      transparent 96%
    );
  mask-image:
    radial-gradient(
      ellipse 56% 64% at var(--bg-focus-x) var(--bg-focus-y),
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.45) 48%,
      rgba(0, 0, 0, 0.08) 78%,
      transparent 96%
    );
}

/* Layer 6: Controlled Fine Film Grain / Anti-Banding Dither */
.ambient-system__grain {
  opacity: 0.024;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 180px 180px;
}

/* Layer 7: Reading Protection Vignette — keeps left editorial column & frame perimeter calm and high-contrast */
.ambient-system__reading-guard {
  background:
    linear-gradient(
      90deg,
      rgba(8, 11, 22, 0.78) 0%,
      rgba(8, 11, 22, 0.52) 28%,
      rgba(8, 11, 22, 0.12) 48%,
      rgba(8, 11, 22, 0) 68%
    ),
    radial-gradient(
      ellipse 95% 92% at 52% 50%,
      transparent 58%,
      rgba(6, 9, 18, 0.68) 100%
    );
}

/* Scene 0 opening traveling grid light sweep */
@keyframes gridLightSweep {
  0% {
    transform: translate3d(-35%, -25%, 0) rotate(-18deg);
    opacity: 0;
  }
  25% {
    opacity: 0.85;
  }
  100% {
    transform: translate3d(55%, 35%, 0) rotate(-18deg);
    opacity: 0;
  }
}

.hero-grid-sweep {
  background: radial-gradient(
    ellipse 520px 180px at 50% 50%,
    rgba(165, 138, 255, 0.22) 0%,
    rgba(83, 103, 249, 0.10) 45%,
    rgba(12, 15, 27, 0) 75%
  );
  animation: gridLightSweep 2.1s var(--ease-editorial) 1 forwards;
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .hero-grid-sweep {
    animation: none !important;
    opacity: 0 !important;
  }
}
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/ArcsignalApp.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { PlatformSection } from './components/PlatformSection';
import { FinalCTASection } from './components/FinalCTASection';
import { GlobalSignalSystem } from './components/GlobalSignalSystem';
import { AmbientBackgroundSystem } from './components/AmbientBackgroundSystem';
import { DemoRequestDialog, InfoModal } from './components/Modals';
import { CoreHotspotId, ProjectedCoreAnchors } from './components/HeroCoreCanvas';
import {
  CapabilityId,
  RouteModelId,
  RoutingPreference,
  PipelineSimulationState,
  PipelineAction,
  transitionPipelineState,
  deriveExperienceMode,
  VisibleSectionId,
  getScrollCapabilityForProgress,
  getScrollStageForProgress,
} from './utils/signalLogic';

gsap.registerPlugin(ScrollTrigger);

export default function ArcsignalApp() {
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  // Hero 2.5D Core state
  const [selectedHotspot, setSelectedHotspot] = useState<CoreHotspotId>('models');
  const [hoveredHotspot, setHoveredHotspot] = useState<CoreHotspotId | null>(null);
  const [projectedHeroAnchors, setProjectedHeroAnchors] =
    useState<ProjectedCoreAnchors | null>(null);

  // Capabilities Section state (default 'route' per specification)
  const [selectedCapability, setSelectedCapability] = useState<CapabilityId>('route');
  const [hoveredCapability, setHoveredCapability] = useState<CapabilityId | null>(null);
  const [selectedRouteModel, setSelectedRouteModel] = useState<RouteModelId>('model-2');

  // Platform Walkthrough state (default stage 2 -> '03 / PLAN')
  const [simState, setSimState] = useState<PipelineSimulationState>({
    status: 'idle',
    activeStageIndex: 2,
  });
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(2);
  const [routingPreference, setRoutingPreference] =
    useState<RoutingPreference>('balance');

  // User-interaction lock refs so manual clicks/demo runs are never overridden by passive scroll
  const userLockedCapabilityRef = useRef<boolean>(false);
  const userLockedStageRef = useRef<boolean>(false);
  const simStatusRef = useRef<PipelineSimulationState['status']>('idle');
  simStatusRef.current = simState.status;

  // Shared Experience Clock & Routing Triggers (Priority 4)
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [syncPulseActive, setSyncPulseActive] = useState<boolean>(false);
  const [routeTriggerCount, setRouteTriggerCount] = useState<number>(0);

  // Global & section-level scroll progress & accessibility state
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [heroScrollProgress, setHeroScrollProgress] = useState<number>(0);
  const [capabilitiesScrollProgress, setCapabilitiesScrollProgress] = useState<number>(0);
  const [platformScrollProgress, setPlatformScrollProgress] = useState<number>(0);
  const [ctaScrollProgress, setCtaScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('top');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Modals state
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  const [infoModalTopic, setInfoModalTopic] = useState<
    'resources' | 'documentation' | 'about' | 'privacy' | 'social' | null
  >(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Experience Clock: 1.8s initial boot sequence + periodic 11s system-wide synchronization wave
  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setIsBooting(false);
    }, 1800);

    const syncInterval = window.setInterval(() => {
      setSyncPulseActive(true);
      window.setTimeout(() => {
        setSyncPulseActive(false);
      }, 1500);
    }, 11000);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearInterval(syncInterval);
    };
  }, []);

  // Demo Clock: deterministic timer for the Customer Resolution Pipeline simulation when status === 'running'
  const dispatchSim = useCallback((action: PipelineAction) => {
    if (action.type === 'RESET') {
      userLockedStageRef.current = false;
    } else {
      userLockedStageRef.current = true;
    }
    setSimState((prev) => transitionPipelineState(prev, action));
    setRouteTriggerCount((c) => c + 1);
  }, []);

  useEffect(() => {
    setSelectedStageIndex(simState.activeStageIndex);
  }, [simState.activeStageIndex, simState.status]);

  useEffect(() => {
    if (simState.status !== 'running') return;
    const timer = window.setInterval(() => {
      setSimState((prev) => transitionPipelineState(prev, { type: 'STEP_TICK' }));
    }, 1050);
    return () => window.clearInterval(timer);
  }, [simState.status]);

  // Scroll Clock: Scroll progress & GSAP ScrollTrigger section choreography
  useEffect(() => {
    const computeSectionProgress = (
      el: HTMLElement | null,
      mode: 'hero' | 'section' | 'cta'
    ): number => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      if (mode === 'hero') {
        // 0 at top of page, 1 when hero bottom reaches 20% of viewport height
        const travel = Math.max(1, rect.height - vh * 0.15);
        return Math.min(1, Math.max(0, -rect.top / travel));
      }
      if (mode === 'cta') {
        // 0 when CTA top enters at 85% viewport height, 1 when CTA is centered/settled
        const startY = vh * 0.85;
        const endY = vh * 0.12;
        return Math.min(1, Math.max(0, (startY - rect.top) / Math.max(1, startY - endY)));
      }
      // Standard section: 0 when section top reaches 46% vh, ~0.46 when centered (rect.top ~ 0), 1 when scrolled past -48% vh
      const startTop = vh * 0.46;
      const totalSpan = Math.max(1, vh * 0.96);
      return Math.min(1, Math.max(0, (startTop - rect.top) / totalSpan));
    };

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const prog = Math.min(1, Math.max(0, scrollTop / maxScroll));
      setScrollProgress(prog);

      if (prog < 0.22) setActiveSection('top');
      else if (prog < 0.48) setActiveSection('capabilities');
      else if (prog < 0.78) setActiveSection('platform');
      else setActiveSection('contact');

      const container = pageContainerRef.current;
      if (!container) return;

      const heroEl = container.querySelector('#top') as HTMLElement | null;
      const capEl = container.querySelector('#capabilities') as HTMLElement | null;
      const platEl = container.querySelector('#platform') as HTMLElement | null;
      const ctaEl = container.querySelector('#contact') as HTMLElement | null;

      const heroProg = computeSectionProgress(heroEl, 'hero');
      const capProg = computeSectionProgress(capEl, 'section');
      const platProg = computeSectionProgress(platEl, 'section');
      const ctaProg = computeSectionProgress(ctaEl, 'cta');

      setHeroScrollProgress(heroProg);
      setCapabilitiesScrollProgress(capProg);
      setPlatformScrollProgress(platProg);
      setCtaScrollProgress(ctaProg);

      // Release manual capability lock when user scrolls completely out of #capabilities
      if (capProg <= 0.01 || capProg >= 0.99) {
        userLockedCapabilityRef.current = false;
      } else if (!userLockedCapabilityRef.current && scrollTop > 40) {
        const nextCap = getScrollCapabilityForProgress(capProg);
        setSelectedCapability((prev) => (prev === nextCap ? prev : nextCap));
      }

      // Release manual stage lock when user scrolls completely out of #platform while idle
      if ((platProg <= 0.01 || platProg >= 0.99) && simStatusRef.current === 'idle') {
        userLockedStageRef.current = false;
      } else if (
        !userLockedStageRef.current &&
        simStatusRef.current === 'idle' &&
        platProg > 0.04 &&
        platProg < 0.98
      ) {
        const nextStage = getScrollStageForProgress(platProg);
        setSelectedStageIndex((prev) => (prev === nextStage ? prev : nextStage));
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pageContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: () => {
          updateScroll();
        },
      });
    }, pageContainerRef);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      mm.revert();
      ctx.revert();
    };
  }, []);

  const mappedVisibleSection: VisibleSectionId =
    activeSection === 'top'
      ? 'hero'
      : activeSection === 'capabilities'
      ? 'capabilities'
      : activeSection === 'platform'
      ? 'product'
      : 'cta';

  // Derive shared ExperienceMode across all 4 sections
  const experienceMode = deriveExperienceMode({
    isBooting,
    demoStatus: simState.status,
    isRoutingTransient: Boolean(hoveredHotspot || hoveredCapability),
    visibleSection: mappedVisibleSection,
  });

  // Synchronize Hero hotspot selection with relevant capability & trigger a causal route pulse
  const handleSelectHotspot = (id: CoreHotspotId) => {
    userLockedCapabilityRef.current = true;
    setSelectedHotspot(id);
    setRouteTriggerCount((c) => c + 1);
    if (id === 'models') setSelectedCapability('route');
    if (id === 'agents') setSelectedCapability('orchestrate');
    if (id === 'tools') setSelectedCapability('govern');
    if (id === 'data') setSelectedCapability('observe');
  };

  const handleSelectCapability = (cap: CapabilityId) => {
    userLockedCapabilityRef.current = true;
    setSelectedCapability(cap);
    setRouteTriggerCount((c) => c + 1);
    if (cap === 'route') setSelectedHotspot('models');
    if (cap === 'orchestrate') setSelectedHotspot('agents');
    if (cap === 'govern') setSelectedHotspot('tools');
    if (cap === 'observe') setSelectedHotspot('data');
  };

  return (
    <div
      ref={pageContainerRef}
      data-experience-mode={experienceMode}
      className="relative min-h-screen w-full text-[#F3F4FA] selection:bg-[#A58AFF]/30 selection:text-[#F3F4FA]"
    >
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#A58AFF] focus:px-4 focus:py-2 focus:font-mono-tech focus:text-xs focus:font-semibold focus:text-[#0C0F1B]"
      >
        Skip to main content
      </a>

      {/* Persistent Viewport-Wide Living Signal Field (#ambient-system, z-0) */}
      <AmbientBackgroundSystem
        scrollProgress={scrollProgress}
        heroScrollProgress={heroScrollProgress}
        capabilitiesScrollProgress={capabilitiesScrollProgress}
        platformScrollProgress={platformScrollProgress}
        ctaScrollProgress={ctaScrollProgress}
        selectedCapability={selectedCapability}
        activeStageIndex={
          simState.status === 'idle' ? selectedStageIndex : simState.activeStageIndex
        }
        workflowStatus={simState.status}
        experienceMode={experienceMode}
        syncPulseActive={syncPulseActive}
        reducedMotion={reducedMotion}
      />

      {/* One Continuous Document-Level Multi-Strand Optical Signal System (z-[5]) */}
      <GlobalSignalSystem
        containerRef={pageContainerRef}
        projectedHeroAnchors={projectedHeroAnchors}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        experienceMode={experienceMode}
        selectedCapability={selectedCapability}
        activeStageIndex={
          simState.status === 'idle' ? selectedStageIndex : simState.activeStageIndex
        }
        syncPulseActive={syncPulseActive}
        routeTriggerCount={routeTriggerCount}
      />

      {/* Sticky Top Header */}
      <Header
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenInfoModal={(t) => setInfoModalTopic(t)}
        activeSection={activeSection}
      />

      {/* Main 4-Section Document Flow */}
      <main id="main-content" className="relative z-10">
        {/* SECTION 01: HERO + 2.5D THREE.JS ORCHESTRATION CORE */}
        <HeroSection
          selectedHotspot={selectedHotspot}
          onSelectHotspot={handleSelectHotspot}
          onHoverHotspotChange={(h) => {
            setHoveredHotspot(h);
            if (h) setRouteTriggerCount((c) => c + 1);
          }}
          onOpenDemo={() => setDemoModalOpen(true)}
          scrollProgress={scrollProgress}
          heroScrollProgress={heroScrollProgress}
          reducedMotion={reducedMotion}
          onProjectedAnchorsChange={setProjectedHeroAnchors}
          workflowStatus={simState.status}
          activeStageIndex={
            simState.status === 'idle' ? selectedStageIndex : simState.activeStageIndex
          }
          experienceMode={experienceMode}
          syncPulseActive={syncPulseActive}
          routeTriggerCount={routeTriggerCount}
        />

        {/* SECTION 02: CORE CAPABILITIES (2x2 CONNECTED TOPOLOGY) */}
        <CapabilitiesSection
          selectedCapability={selectedCapability}
          onSelectCapability={handleSelectCapability}
          selectedRouteModel={selectedRouteModel}
          onSelectRouteModel={(m) => {
            userLockedCapabilityRef.current = true;
            setSelectedRouteModel(m);
            setRouteTriggerCount((c) => c + 1);
          }}
          onSyncRoutingPreference={setRoutingPreference}
          onHoverCapabilityChange={setHoveredCapability}
          experienceMode={experienceMode}
          capabilitiesScrollProgress={capabilitiesScrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* SECTION 03: INTERACTIVE PRODUCT WALKTHROUGH */}
        <PlatformSection
          simState={simState}
          onDispatchSim={dispatchSim}
          selectedStageIndex={selectedStageIndex}
          onSelectStageIndex={(idx) => {
            userLockedStageRef.current = true;
            setSelectedStageIndex(idx);
            setRouteTriggerCount((c) => c + 1);
          }}
          routingPreference={routingPreference}
          onSelectRoutingPreference={setRoutingPreference}
          onSyncRouteModel={setSelectedRouteModel}
          experienceMode={experienceMode}
          platformScrollProgress={platformScrollProgress}
          reducedMotion={reducedMotion}
        />

        {/* SECTION 04: FINAL CTA + CONVERGENCE REACTOR + FOOTER */}
        <FinalCTASection
          onOpenDemo={() => setDemoModalOpen(true)}
          onOpenInfoModal={(t) => setInfoModalTopic(t)}
          reducedMotion={reducedMotion}
          experienceMode={experienceMode}
          syncPulseActive={syncPulseActive}
          ctaScrollProgress={ctaScrollProgress}
        />
      </main>

      {/* Accessible Demo Request & Info Modals */}
      <DemoRequestDialog
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <InfoModal
        topic={infoModalTopic}
        onClose={() => setInfoModalTopic(null)}
        onOpenDemo={() => setDemoModalOpen(true)}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/arcsignal";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className }: PictureProps) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div
        className={`arcsignal-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
      </div>
    );
  }
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0C0F1B" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#0C1020" text-anchor="middle">A</text>
</svg>
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Arc & Signal — Intelligence, in Sync.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0C0F1B",
          color: "#0C1020",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>ARC & SIGNAL</span>
          <span style={{ color: "#10172A" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            Arc & Signal — Intelligence, in Sync.
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Connect models, agents, tools, and data in one orchestration layer built for clarity, control, and scale.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#10172A" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/page.tsx">
<![CDATA["use client";

import ArcsignalApp from "./ArcsignalApp";

export default function ArcsignalPage() {
  return <ArcsignalApp />;
}
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/AmbientBackgroundSystem.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  CapabilityId,
  ExperienceMode,
  WorkflowRunStatus,
  computeAmbientFieldState,
  getConvergedStreamCount,
} from '../utils/signalLogic';

export interface AmbientBackgroundSystemProps {
  scrollProgress: number;
  heroScrollProgress: number;
  capabilitiesScrollProgress: number;
  platformScrollProgress: number;
  ctaScrollProgress: number;
  selectedCapability: CapabilityId;
  activeStageIndex: number;
  workflowStatus: WorkflowRunStatus;
  experienceMode: ExperienceMode;
  syncPulseActive: boolean;
  reducedMotion: boolean;
}

interface GhostPacketState {
  id: string;
  x: number;
  y: number;
  opacity: number;
}

const GHOST_CONDUITS = [
  // Conduit A: Upper right orbital approach -> central spine -> lower left
  'M 1460 88 C 1270 165, 1155 280, 1085 415 C 1015 550, 965 695, 1020 885',
  // Conduit B: Mid-right Control Plane collector -> Platform execution -> Reactor core
  'M 1540 310 C 1340 320, 1185 385, 1070 475 C 955 565, 1035 710, 1125 870',
  // Conduit C: Lower right deep telemetry arc bending toward the convergence zone
  'M 1490 675 C 1325 615, 1210 520, 1110 465 C 1010 410, 885 480, 790 610',
];

const LOCATOR_CROSSES = [
  { x: 690, y: 190 },
  { x: 940, y: 165 },
  { x: 1380, y: 210 },
  { x: 740, y: 460 },
  { x: 1020, y: 470 },
  { x: 1340, y: 455 },
  { x: 820, y: 730 },
  { x: 1180, y: 745 },
  { x: 1420, y: 695 },
];

export const AmbientBackgroundSystem: React.FC<AmbientBackgroundSystemProps> = ({
  scrollProgress,
  heroScrollProgress,
  ctaScrollProgress,
  selectedCapability,
  activeStageIndex,
  workflowStatus,
  syncPulseActive,
  reducedMotion,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ghostPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [ghostPackets, setGhostPackets] = useState<GhostPacketState[]>([]);

  const field = computeAmbientFieldState({
    scrollProgress,
    selectedCapability,
    activeStageIndex,
    demoStatus: workflowStatus,
    ctaScrollProgress,
    reducedMotion,
  });

  // Synchronize CSS custom properties on #ambient-system and :root for zero-seam continuous interpolation
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--bg-focus-x', `${field.focusXPercent}%`);
    el.style.setProperty('--bg-focus-y', `${field.focusYPercent}%`);
    el.style.setProperty('--bg-secondary-x', `${field.secondaryXPercent}%`);
    el.style.setProperty('--bg-secondary-y', `${field.secondaryYPercent}%`);
    el.style.setProperty('--bg-field-intensity', String(field.fieldIntensity));
    el.style.setProperty('--bg-grid-opacity', String(field.gridOpacity));
  }, [
    field.focusXPercent,
    field.focusYPercent,
    field.secondaryXPercent,
    field.secondaryYPercent,
    field.fieldIntensity,
    field.gridOpacity,
  ]);

  // Single lightweight RAF loop for ghost conduit packets; pauses when reducedMotion, demo paused, or tab hidden
  useEffect(() => {
    if (field.ghostPacketsPaused) {
      setGhostPackets([]);
      return;
    }

    let rafId = 0;
    let accumulatedTime = 0;
    let lastTime = performance.now();

    const stepGhostPackets = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) * 0.001);
      lastTime = now;

      if (typeof document !== 'undefined' && document.hidden) {
        rafId = requestAnimationFrame(stepGhostPackets);
        return;
      }

      accumulatedTime += dt * field.ghostPacketSpeed;
      const next: GhostPacketState[] = [];

      for (let i = 0; i < GHOST_CONDUITS.length; i++) {
        const pathEl = ghostPathRefs.current[i];
        if (!pathEl) continue;
        try {
          const len = pathEl.getTotalLength();
          if (len <= 0) continue;
          const phase = (accumulatedTime * (0.055 + i * 0.012) + i * 0.33) % 1;
          const pt = pathEl.getPointAtLength(phase * len);
          const edgeFade = Math.sin(phase * Math.PI);
          next.push({
            id: `ghost-pkt-${i}`,
            x: pt.x,
            y: pt.y,
            opacity: Number((edgeFade * (syncPulseActive ? 0.52 : 0.34)).toFixed(3)),
          });
        } catch {
          // ignore if SVG path not ready
        }
      }

      setGhostPackets(next);
      rafId = requestAnimationFrame(stepGhostPackets);
    };

    rafId = requestAnimationFrame(stepGhostPackets);
    return () => cancelAnimationFrame(rafId);
  }, [field.ghostPacketsPaused, field.ghostPacketSpeed, syncPulseActive]);

  // Quadrant coordinates in SVG space (1600x900) for Scene 2 (01 / Control Plane)
  const capQuadrantCenter =
    selectedCapability === 'orchestrate'
      ? { x: 890, y: 315 }
      : selectedCapability === 'route'
      ? { x: 1255, y: 315 }
      : selectedCapability === 'observe'
      ? { x: 890, y: 605 }
      : { x: 1255, y: 605 };

  // Workflow stage X coordinate in SVG space (1600x900) for Scene 3 (02 / Inside the Platform)
  const stageSpectralX = 760 + (Math.min(5, Math.max(0, activeStageIndex)) / 5) * 520;

  // Converged stream count (1..5) for Scene 4 (03 / What's Next)
  const convergedStreams = reducedMotion ? 5 : getConvergedStreamCount(ctaScrollProgress);
  const isFullyConverged = convergedStreams >= 5 && field.convergenceWeight > 0.35;

  // Subtle parallax shifts for distant structural geometry (disabled under reducedMotion)
  const heroParallaxY = reducedMotion ? 0 : heroScrollProgress * -28;
  const structureDriftY = reducedMotion ? 0 : scrollProgress * -36;

  return (
    <div
      id="ambient-system"
      ref={rootRef}
      aria-hidden="true"
      data-testid="ambient-background-system"
      data-active-capability={selectedCapability}
      data-workflow-status={workflowStatus}
    >
      {/* 1. Deep Midnight / Abyssal Color Foundation */}
      <div className="ambient-system__color" />

      {/* 2. Atmospheric Subsurface Volumes */}
      <div className="ambient-system__volumes" />

      {/* 3 & 5. Engineered Structural Field & Ghost Signal Conduits */}
      <svg
        className="ambient-system__structure"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="ambient-orbital-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8C72FF" stopOpacity="0.22" />
            <stop offset="48%" stopColor="#5D6BFF" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#080B16" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ambient-quadrant-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A58AFF" stopOpacity="0.24" />
            <stop offset="52%" stopColor="#5367F9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#080B16" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ambient-stage-wash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7FB5D4" stopOpacity="0.16" />
            <stop offset="45%" stopColor="#8C72FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#080B16" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ambient-ghost-pkt" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F3F4FA" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#D4C9FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8C72FF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ambient-conduit-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5D6BFF" stopOpacity="0.04" />
            <stop offset="45%" stopColor="#A58AFF" stopOpacity="0.18" />
            <stop offset="85%" stopColor="#7FB5D4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#5D6BFF" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* =================================================================
            SCENE A: HERO ORBITAL ECHOES & OUTGOING WAKE
            Fine polar arcs & distant concentric geometry behind right orbit
            ================================================================= */}
        <g
          style={{
            opacity: Math.max(0.08, field.heroWeight * 0.95),
            transform: `translate3d(0, ${heroParallaxY}px, 0)`,
          }}
        >
          <circle
            cx="1115"
            cy="410"
            r="360"
            fill="url(#ambient-orbital-pool)"
          />
          {/* Partial outer polar contour arc */}
          <path
            d="M 820 195 A 365 365 0 0 1 1445 555"
            fill="none"
            stroke="rgba(157, 167, 199, 0.14)"
            strokeWidth="1"
            strokeDasharray="10 14"
            strokeLinecap="round"
          />
          {/* Partial secondary elliptical contour */}
          <path
            d="M 765 490 A 410 410 0 0 0 1395 685"
            fill="none"
            stroke="rgba(140, 114, 255, 0.13)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          {/* Fine inner reference arc */}
          <path
            d="M 935 160 A 275 275 0 0 1 1385 430"
            fill="none"
            stroke="rgba(127, 181, 212, 0.11)"
            strokeWidth="0.9"
            strokeDasharray="3 9"
            strokeLinecap="round"
          />
          {/* Hero outgoing signal wake — intensifies briefly as Hero scrolls out */}
          <path
            d="M 1115 415 C 1045 555, 975 685, 935 865"
            fill="none"
            stroke="rgba(165, 138, 255, 0.22)"
            strokeWidth={1.6 + heroScrollProgress * 1.4}
            strokeLinecap="round"
            opacity={Math.min(0.65, 0.15 + heroScrollProgress * 0.5)}
          />
        </g>

        {/* =================================================================
            SCENE B: 01 / THE CONTROL PLANE — ORGANIZED BRANCHING TRAJECTORIES
            Localized quadrant halo + branching collector arcs behind 2x2 matrix
            ================================================================= */}
        <g
          style={{
            opacity: Math.max(0.04, field.controlPlaneWeight * 0.95),
            transform: `translate3d(0, ${structureDriftY * 0.45}px, 0)`,
          }}
        >
          {/* Localized active module atmospheric halo (follows Orchestrate/Route/Observe/Govern) */}
          <circle
            cx={capQuadrantCenter.x}
            cy={capQuadrantCenter.y}
            r="265"
            fill="url(#ambient-quadrant-halo)"
            style={{
              transition: reducedMotion
                ? 'none'
                : 'cx 420ms cubic-bezier(0.22, 1, 0.36, 1), cy 420ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Faint collector arcs linking central routing spine to the 4 quadrant regions */}
          <path
            d="M 1070 110 C 1070 230, 995 285, 890 315"
            fill="none"
            stroke={
              selectedCapability === 'orchestrate'
                ? 'rgba(165, 138, 255, 0.28)'
                : 'rgba(157, 167, 199, 0.10)'
            }
            strokeWidth={selectedCapability === 'orchestrate' ? '1.6' : '1'}
            strokeLinecap="round"
          />
          <path
            d="M 1070 110 C 1095 230, 1165 285, 1255 315"
            fill="none"
            stroke={
              selectedCapability === 'route'
                ? 'rgba(165, 138, 255, 0.28)'
                : 'rgba(157, 167, 199, 0.10)'
            }
            strokeWidth={selectedCapability === 'route' ? '1.6' : '1'}
            strokeLinecap="round"
          />
          <path
            d="M 1070 455 C 1010 520, 955 565, 890 605"
            fill="none"
            stroke={
              selectedCapability === 'observe'
                ? 'rgba(165, 138, 255, 0.28)'
                : 'rgba(157, 167, 199, 0.10)'
            }
            strokeWidth={selectedCapability === 'observe' ? '1.6' : '1'}
            strokeLinecap="round"
          />
          <path
            d="M 1070 455 C 1135 520, 1190 565, 1255 605"
            fill="none"
            stroke={
              selectedCapability === 'govern'
                ? 'rgba(165, 138, 255, 0.28)'
                : 'rgba(157, 167, 199, 0.10)'
            }
            strokeWidth={selectedCapability === 'govern' ? '1.6' : '1'}
            strokeLinecap="round"
          />
        </g>

        {/* =================================================================
            SCENE C: 02 / INSIDE THE PLATFORM — EXECUTION CALIBRATION FIELD
            Sparse locator crosses, lateral tracks & stage-linked spectral wash
            ================================================================= */}
        <g
          style={{
            opacity: Math.max(0.04, field.platformWeight * 0.95),
          }}
        >
          {/* Spectral wash tracking the active workflow stage (01..06) */}
          <ellipse
            cx={stageSpectralX}
            cy="465"
            rx="240"
            ry="175"
            fill="url(#ambient-stage-wash)"
            style={{
              transition: reducedMotion
                ? 'none'
                : 'cx 360ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Faint horizontal calibration tracks behind the simulator window */}
          <line
            x1="640"
            y1="265"
            x2="1480"
            y2="265"
            stroke="rgba(142, 152, 206, 0.09)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />
          <line
            x1="620"
            y1="665"
            x2="1480"
            y2="665"
            stroke="rgba(142, 152, 206, 0.09)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />

          {/* Sparse technical locator crosses (+) */}
          {LOCATOR_CROSSES.map((c, idx) => (
            <g
              key={idx}
              transform={`translate(${c.x}, ${c.y})`}
              stroke="rgba(157, 167, 199, 0.18)"
              strokeWidth="1"
            >
              <line x1="-4.5" y1="0" x2="4.5" y2="0" />
              <line x1="0" y1="-4.5" x2="0" y2="4.5" />
            </g>
          ))}
        </g>

        {/* =================================================================
            SCENE D & E: 03 / WHAT'S NEXT CONVERGENCE & FOOTER QUIET HORIZON
            5-direction ghost approach vectors + controlled convergence wave
            ================================================================= */}
        <g
          style={{
            opacity: Math.max(0.05, field.convergenceWeight * 0.98 + field.footerWeight * 0.35),
          }}
        >
          {/* Controlled radial illumination behind the Reactor focal core */}
          <circle
            cx="1115"
            cy="465"
            r={240 + convergedStreams * 18}
            fill="url(#ambient-orbital-pool)"
          />

          {/* Single restrained outward wave when all 5 streams synchronize */}
          {isFullyConverged && (
            <circle
              cx="1115"
              cy="465"
              r="310"
              fill="none"
              stroke="rgba(212, 201, 255, 0.18)"
              strokeWidth="1.4"
            />
          )}

          {/* 5 distant approach contours bending toward the Reactor core (1115, 465) */}
          <path
            d="M 895 75 C 975 190, 1065 315, 1115 465"
            fill="none"
            stroke="rgba(165, 138, 255, 0.16)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M 1560 195 C 1385 215, 1225 320, 1115 465"
            fill="none"
            stroke="rgba(93, 107, 255, 0.15)"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M 1580 410 C 1405 415, 1245 435, 1115 465"
            fill="none"
            stroke="rgba(165, 138, 255, 0.14)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M 1545 645 C 1380 595, 1235 530, 1115 465"
            fill="none"
            stroke="rgba(127, 181, 212, 0.13)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M 1435 835 C 1315 715, 1195 575, 1115 465"
            fill="none"
            stroke="rgba(140, 114, 255, 0.14)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          {/* Quiet Footer horizon filament that settles as user reaches the bottom */}
          <line
            x1="120"
            y1="825"
            x2="1480"
            y2="825"
            stroke="rgba(157, 167, 199, 0.10)"
            strokeWidth="1"
            opacity={field.footerWeight}
          />
        </g>

        {/* =================================================================
            PERSISTENT GHOST SIGNAL CONDUITS & SYNCHRONIZED AMBIENT PACKETS
            Echoes the foreground signal route without competing with it
            ================================================================= */}
        <g>
          {GHOST_CONDUITS.map((d, idx) => (
            <path
              key={`ghost-conduit-${idx}`}
              ref={(el) => {
                ghostPathRefs.current[idx] = el;
              }}
              d={d}
              fill="none"
              stroke="url(#ambient-conduit-stroke)"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
          ))}

          {ghostPackets.map((pkt) => (
            <g key={pkt.id} opacity={pkt.opacity}>
              <circle cx={pkt.x} cy={pkt.y} r="11" fill="url(#ambient-ghost-pkt)" />
              <circle cx={pkt.x} cy={pkt.y} r="2.2" fill="#F3F4FA" />
            </g>
          ))}
        </g>
      </svg>

      {/* 4. Selective Technical Reference Grid (masked around active focal region) */}
      <div className="ambient-system__grid" />

      {/* 6. Controlled Fine Film Grain / Anti-Banding Dither */}
      <div className="ambient-system__grain" />

      {/* 7. Left-Column & Perimeter Reading Protection Vignette */}
      <div className="ambient-system__reading-guard" />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/CapabilitiesSection.tsx">
<![CDATA['use client';

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
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/FinalCTASection.tsx">
<![CDATA['use client';

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
                  transform={`translate(365, 235) rotate(${scrollRotorDegrees * 0.35}) translate(-365, -235)`}
                >
                  {Array.from({ length: 36 }).map((_, idx) => {
                    const deg = idx * 10;
                    const rad = (deg * Math.PI) / 180;
                    const innerR = idx % 3 === 0 ? 182 : 186;
                    const outerR = 192;
                    return (
                      <line
                        key={deg}
                        x1={365 + Math.cos(rad) * innerR}
                        y1={235 + Math.sin(rad) * innerR}
                        x2={365 + Math.cos(rad) * outerR}
                        y2={235 + Math.sin(rad) * outerR}
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
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/GlobalSignalSystem.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  buildContinuousSignalPath,
  buildParallelStrandPath,
  SignalAnchorPoint,
  ExperienceMode,
  CapabilityId,
} from '../utils/signalLogic';
import { ProjectedCoreAnchors } from './HeroCoreCanvas';

export interface GlobalSignalSystemProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  projectedHeroAnchors: ProjectedCoreAnchors | null;
  scrollProgress: number;
  reducedMotion: boolean;
  experienceMode?: ExperienceMode;
  selectedCapability?: CapabilityId;
  activeStageIndex?: number;
  syncPulseActive?: boolean;
  routeTriggerCount?: number;
}

interface PacketRenderState {
  id: string;
  progress: number;
  headX: number;
  headY: number;
  tailDashOffset: number;
  tailLength: number;
  intensity: number;
}

export const GlobalSignalSystem: React.FC<GlobalSignalSystemProps> = ({
  containerRef,
  projectedHeroAnchors,
  scrollProgress,
  reducedMotion,
  experienceMode = 'idle',
  selectedCapability = 'route',
  activeStageIndex = 2,
  syncPulseActive = false,
  routeTriggerCount = 0,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [docSize, setDocSize] = useState<{ width: number; height: number }>({
    width: 1440,
    height: 3600,
  });
  const [masterPathD, setMasterPathD] = useState<string>('');
  const [leftStrandD, setLeftStrandD] = useState<string>('');
  const [rightStrandD, setRightStrandD] = useState<string>('');
  const [pathLength, setPathLength] = useState<number>(4800);
  const [junctionPoints, setJunctionPoints] = useState<
    { id: string; x: number; y: number; fraction: number }[]
  >([]);
  const [packets, setPackets] = useState<PacketRenderState[]>([]);
  const [debugSignalEnabled, setDebugSignalEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDebugSignalEnabled(window.location.search.includes('debugSignal=1'));
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    const measureAndBuildPath = () => {
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const width = Math.max(320, container.clientWidth || window.innerWidth);
      const height = Math.max(1200, container.scrollHeight || document.body.scrollHeight);

      setDocSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );

      const getDomAnchor = (name: string): { x: number; y: number } | null => {
        const el = container.querySelector(`[data-signal-anchor="${name}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      };

      const isMobile = width < 768;

      const domHeroExit = getDomAnchor('hero-exit');
      const heroExitX = domHeroExit ? domHeroExit.x : width * 0.62;
      const heroExitY = domHeroExit ? domHeroExit.y : 590;

      const capEntry = getDomAnchor('capabilities-entry') || {
        x: width * 0.68,
        y: height * 0.31,
      };
      const capRoute = getDomAnchor('capabilities-route-node') || {
        x: width * 0.88,
        y: height * 0.31,
      };
      const capExit = getDomAnchor('capabilities-exit') || {
        x: width * 0.48,
        y: height * 0.46,
      };
      const platEntry = getDomAnchor('platform-entry') || {
        x: width * 0.76,
        y: height * 0.54,
      };
      const platNode = getDomAnchor('platform-plan-node') || {
        x: width * 0.66,
        y: height * 0.64,
      };
      const platExit = getDomAnchor('platform-exit') || {
        x: width * 0.42,
        y: height * 0.72,
      };
      const ctaConverge = getDomAnchor('cta-convergence') || {
        x: width * 0.72,
        y: height * 0.86,
      };

      let anchors: SignalAnchorPoint[];

      if (isMobile) {
        const railLeft = Math.max(24, width * 0.14);
        const railRight = Math.min(width - 24, width * 0.84);
        anchors = [
          {
            id: 'hero.coreOutput',
            x: width * 0.5,
            y: heroExitY,
            tangentX: -40,
            tangentY: 110,
          },
          {
            id: 'capabilities.entry',
            x: railLeft,
            y: capEntry.y - 60,
            tangentX: 0,
            tangentY: 140,
          },
          {
            id: 'capabilities.exit',
            x: railRight,
            y: capExit.y,
            tangentX: 0,
            tangentY: 140,
          },
          {
            id: 'product.stage',
            x: railLeft,
            y: platNode.y,
            tangentX: 0,
            tangentY: 140,
          },
          {
            id: 'cta.junction',
            x: ctaConverge.x,
            y: ctaConverge.y,
            tangentX: 0,
            tangentY: 100,
          },
        ];
      } else {
        const midHeroToCapY = (heroExitY + capEntry.y) * 0.5;
        const midCapToPlatY = (capExit.y + platEntry.y) * 0.5;
        const midPlatToCtaY = (platExit.y + ctaConverge.y) * 0.5;

        // Subtle reactive lateral shift when switching capability module or workflow stage
        const capBiasX =
          selectedCapability === 'orchestrate'
            ? -22
            : selectedCapability === 'observe'
            ? -16
            : selectedCapability === 'govern'
            ? 14
            : 0;
        const stageBiasX = (activeStageIndex - 2) * 8;

        anchors = [
          {
            id: 'hero.coreOutput',
            x: heroExitX,
            y: heroExitY,
            tangentX: -95,
            tangentY: 155,
          },
          {
            id: 'hero.capBridge',
            x: heroExitX - 110,
            y: midHeroToCapY,
            tangentX: 90,
            tangentY: 130,
          },
          {
            id: 'capabilities.entry',
            x: capEntry.x + capBiasX * 0.5,
            y: capEntry.y,
            tangentX: 110,
            tangentY: -10,
          },
          {
            id: `capabilities.${selectedCapability}`,
            x: capRoute.x + capBiasX,
            y: capRoute.y,
            tangentX: -30,
            tangentY: 140,
          },
          {
            id: 'capabilities.exit',
            x: capExit.x,
            y: capExit.y,
            tangentX: -65,
            tangentY: 145,
          },
          {
            id: 'cap.platBridge',
            x: (capExit.x + platEntry.x) * 0.5,
            y: midCapToPlatY,
            tangentX: 120,
            tangentY: 95,
          },
          {
            id: 'product.entry',
            x: platEntry.x,
            y: platEntry.y,
            tangentX: -50,
            tangentY: 140,
          },
          {
            id: `product.stage0${activeStageIndex + 1}`,
            x: platNode.x + stageBiasX,
            y: platNode.y,
            tangentX: -85,
            tangentY: 125,
          },
          {
            id: 'product.exit',
            x: platExit.x,
            y: platExit.y,
            tangentX: -40,
            tangentY: 140,
          },
          {
            id: 'plat.ctaBridge',
            x: (platExit.x + ctaConverge.x) * 0.48,
            y: midPlatToCtaY,
            tangentX: 110,
            tangentY: 120,
          },
          {
            id: 'cta.junction',
            x: ctaConverge.x,
            y: ctaConverge.y,
            tangentX: -20,
            tangentY: 120,
          },
        ];
      }

      const d = buildContinuousSignalPath(anchors);
      const leftD = buildParallelStrandPath(anchors, isMobile ? -2.8 : -4.4);
      const rightD = buildParallelStrandPath(anchors, isMobile ? 2.8 : 4.4);

      setMasterPathD(d);
      setLeftStrandD(leftD);
      setRightStrandD(rightD);
      setJunctionPoints(
        anchors.map((a, idx) => ({
          id: a.id,
          x: a.x,
          y: a.y,
          fraction: idx / Math.max(1, anchors.length - 1),
        }))
      );
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureAndBuildPath);
    };

    scheduleMeasure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(container);
    window.addEventListener('resize', scheduleMeasure, { passive: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleMeasure).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [containerRef, projectedHeroAnchors, selectedCapability, activeStageIndex]);

  useEffect(() => {
    if (pathRef.current && masterPathD) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          setPathLength(len);
        }
      } catch {
        // Fallback if SVG getTotalLength is unavailable
      }
    }
  }, [masterPathD]);

  // Traveling light packets along the master optical stream (Priority 2)
  useEffect(() => {
    if (reducedMotion || !masterPathD || !pathRef.current || pathLength <= 0) {
      setPackets([]);
      return;
    }

    let animId = 0;
    const startTime = performance.now();

    const stepPackets = (now: number) => {
      const pathEl = pathRef.current;
      if (!pathEl) return;

      const elapsedSec = (now - startTime) * 0.001;
      const speedMultiplier =
        experienceMode === 'routing'
          ? 1.55
          : experienceMode === 'executing'
          ? 1.38
          : experienceMode === 'converging'
          ? 1.25
          : 1.0;

      // 3 staggered optical packets traveling along the continuous pathway
      const basePhases = [0.0, 0.36, 0.71];
      const nextPackets: PacketRenderState[] = [];

      for (let i = 0; i < basePhases.length; i++) {
        const rawProgress = (elapsedSec * 0.115 * speedMultiplier + basePhases[i]) % 1;
        const dist = rawProgress * pathLength;
        let pt = { x: 0, y: 0 };
        try {
          const svgPt = pathEl.getPointAtLength(dist);
          pt = { x: svgPt.x, y: svgPt.y };
        } catch {
          // ignore
        }

        const tailLen = i === 0 ? 150 : 110;
        nextPackets.push({
          id: `pkt-${i}`,
          progress: rawProgress,
          headX: pt.x,
          headY: pt.y,
          tailDashOffset: Math.max(0, pathLength - dist),
          tailLength: tailLen,
          intensity: i === 0 || syncPulseActive ? 1.0 : 0.78,
        });
      }

      setPackets(nextPackets);
      animId = requestAnimationFrame(stepPackets);
    };

    animId = requestAnimationFrame(stepPackets);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion, masterPathD, pathLength, experienceMode, syncPulseActive, routeTriggerCount]);

  // Ensure the active luminous signal extends continuously through the active viewport (including when zoomed out)
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
  const scrollTop = typeof window !== 'undefined' ? window.scrollY || 0 : 0;
  const visibleDocFraction =
    docSize.height > 0 ? (scrollTop + viewportHeight * 0.9) / docSize.height : 0.35;

  const activeDrawFraction = reducedMotion
    ? 1
    : Math.min(1, Math.max(0.34, scrollProgress * 0.85 + 0.32, visibleDocFraction));
  const dashOffset = Math.max(0, pathLength * (1 - activeDrawFraction));

  // Scroll-scrubbed lead packet: travels deterministically from Hero exit to CTA convergence as user scrolls
  const leadFraction = Math.min(0.995, Math.max(0.02, scrollProgress * 0.94 + 0.04));
  const leadDist = leadFraction * pathLength;
  let leadPt = { x: 0, y: 0, valid: false };
  if (pathRef.current && pathLength > 0 && masterPathD) {
    try {
      const pt = pathRef.current.getPointAtLength(leadDist);
      leadPt = { x: pt.x, y: pt.y, valid: true };
    } catch {
      // Fallback to closest junction point
      if (junctionPoints.length > 0) {
        const idx = Math.min(
          junctionPoints.length - 1,
          Math.floor(leadFraction * junctionPoints.length)
        );
        leadPt = {
          x: junctionPoints[idx].x,
          y: junctionPoints[idx].y,
          valid: true,
        };
      }
    }
  }

  if (!masterPathD) return null;

  return (
    <>
      <svg
        aria-hidden="true"
        data-testid="global-signal-svg"
        viewBox={`0 0 ${docSize.width} ${docSize.height}`}
        width={docSize.width}
        height={docSize.height}
        className="pointer-events-none absolute inset-0 z-[5] overflow-visible"
      >
        <defs>
          <linearGradient id="global-signal-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3F4FA" stopOpacity="0.92" />
            <stop offset="28%" stopColor="#D4C9FF" stopOpacity="0.96" />
            <stop offset="68%" stopColor="#8E72FF" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#F3F4FA" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="global-strand-cobalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5367F9" stopOpacity="0.72" />
            <stop offset="50%" stopColor="#A58AFF" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#5367F9" stopOpacity="0.78" />
          </linearGradient>

          <linearGradient id="global-strand-violet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4C9FF" stopOpacity="0.64" />
            <stop offset="50%" stopColor="#7A65F8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D4C9FF" stopOpacity="0.72" />
          </linearGradient>

          <radialGradient id="packet-head-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#D4C9FF" stopOpacity="0.88" />
            <stop offset="70%" stopColor="#8E72FF" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#0C0F1B" stopOpacity="0" />
          </radialGradient>

          <filter id="signal-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 0. Faint persistent underlying engineering guide track across the entire document */}
        <path
          d={masterPathD}
          fill="none"
          stroke="rgba(157, 167, 199, 0.16)"
          strokeWidth="1.4"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />

        {/* 1. Base Halo Path: wide, low-opacity violet/blue atmospheric glow */}
        <path
          d={masterPathD}
          fill="none"
          stroke={
            syncPulseActive || experienceMode === 'routing'
              ? 'rgba(165, 138, 255, 0.30)'
              : 'rgba(151, 127, 255, 0.20)'
          }
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
            transition: reducedMotion ? 'none' : 'stroke-dashoffset 90ms linear',
          }}
        />

        {/* 2. Mid Luminous Ribbon */}
        <path
          d={masterPathD}
          fill="none"
          stroke="rgba(83, 103, 249, 0.52)"
          strokeWidth="6.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#signal-glow-filter)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
            transition: reducedMotion ? 'none' : 'stroke-dashoffset 90ms linear',
          }}
        />

        {/* 3A. Left Offset Multi-Strand Companion Fiber (Cobalt-Violet) */}
        {leftStrandD && (
          <path
            d={leftStrandD}
            fill="none"
            stroke="url(#global-strand-cobalt)"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: dashOffset,
              transition: reducedMotion ? 'none' : 'stroke-dashoffset 90ms linear',
            }}
          />
        )}

        {/* 3B. Right Offset Multi-Strand Companion Fiber (Electric Violet-Lilac) */}
        {rightStrandD && (
          <path
            d={rightStrandD}
            fill="none"
            stroke="url(#global-strand-violet)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: dashOffset,
              transition: reducedMotion ? 'none' : 'stroke-dashoffset 90ms linear',
            }}
          />
        )}

        {/* 4. Crisp High-Contrast Central Optical Filament (`ref={pathRef}`) */}
        <path
          ref={pathRef}
          data-testid="global-signal-master-path"
          d={masterPathD}
          fill="none"
          stroke="url(#global-signal-gradient)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: dashOffset,
            transition: reducedMotion ? 'none' : 'stroke-dashoffset 90ms linear',
          }}
        />

        {/* 5. Traveling Light Packets & Trailing Comet Glows */}
        {!reducedMotion &&
          packets.map((pkt) => {
            if (pkt.progress > activeDrawFraction + 0.02) return null;
            const dashStart = Math.max(0, pkt.progress * pathLength - pkt.tailLength);
            return (
              <g key={pkt.id}>
                {/* Packet Comet Trail along the exact Bezier path */}
                <path
                  d={masterPathD}
                  fill="none"
                  stroke="#F3F4FA"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeDasharray={`${pkt.tailLength} ${pathLength}`}
                  strokeDashoffset={-dashStart}
                  opacity={pkt.intensity * 0.9}
                />
                {/* Concentrated Packet Head */}
                <circle
                  cx={pkt.headX}
                  cy={pkt.headY}
                  r={13}
                  fill="url(#packet-head-glow)"
                  opacity={pkt.intensity}
                />
                <circle
                  cx={pkt.headX}
                  cy={pkt.headY}
                  r={3.4}
                  fill="#FFFFFF"
                  opacity={pkt.intensity}
                />
              </g>
            );
          })}

        {/* 5B. Scroll-Scrubbed Primary Signal Lead Packet (reversible with scroll) */}
        {leadPt.valid && (
          <g data-testid="global-scroll-lead-packet">
            <path
              d={masterPathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeDasharray={`180 ${pathLength}`}
              strokeDashoffset={-Math.max(0, leadDist - 180)}
              opacity={reducedMotion ? 0.45 : 0.92}
            />
            <circle
              cx={leadPt.x}
              cy={leadPt.y}
              r={18}
              fill="url(#packet-head-glow)"
              opacity={0.96}
            />
            <circle
              cx={leadPt.x}
              cy={leadPt.y}
              r={7.5}
              fill="none"
              stroke="rgba(212, 201, 255, 0.85)"
              strokeWidth="1.3"
            />
            <circle cx={leadPt.x} cy={leadPt.y} r={4.2} fill="#FFFFFF" />
          </g>
        )}

        {/* Active Junction Collars & Arrival Node Blinks along the continuous route */}
        {junctionPoints.map((pt, idx) => {
          const isReached = activeDrawFraction >= pt.fraction * 0.92;
          const packetNear = packets.some(
            (pkt) => Math.abs(pkt.progress - pt.fraction) < 0.045
          );
          const isExcited = packetNear || syncPulseActive;

          return (
            <g key={pt.id || idx}>
              {isExcited && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={15}
                  fill="none"
                  stroke="rgba(212, 201, 255, 0.65)"
                  strokeWidth="1.2"
                />
              )}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isExcited ? 9.5 : isReached ? 7 : 4.2}
                fill={
                  isExcited
                    ? 'rgba(212, 201, 255, 0.42)'
                    : isReached
                    ? 'rgba(165, 138, 255, 0.28)'
                    : 'rgba(157, 167, 199, 0.12)'
                }
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isExcited ? 4 : isReached ? 3 : 1.8}
                fill={isReached ? '#F3F4FA' : 'rgba(157, 167, 199, 0.35)'}
              />
            </g>
          );
        })}

        {/* Optional Developer Debug Anchor Markers (?debugSignal=1) */}
        {debugSignalEnabled &&
          junctionPoints.map((pt) => (
            <g key={`debug-${pt.id}`}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={12}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <rect
                x={pt.x + 14}
                y={pt.y - 10}
                width={158}
                height={20}
                rx={4}
                fill="rgba(7, 10, 20, 0.92)"
                stroke="#38BDF8"
                strokeWidth="0.8"
              />
              <text
                x={pt.x + 20}
                y={pt.y + 3}
                fill="#38BDF8"
                fontSize="9"
                className="font-mono-tech"
              >
                {pt.id} ({Math.round(pt.x)},{Math.round(pt.y)})
              </text>
            </g>
          ))}
      </svg>

      {/* Optional Developer Diagnostic HUD when ?debugSignal=1 is active */}
      {debugSignalEnabled && (
        <div
          data-testid="signal-debug-hud"
          className="fixed bottom-4 left-4 z-50 rounded-xl border border-sky-400/50 bg-[#070A14]/95 px-4 py-3 font-mono-tech text-[11px] text-sky-200 shadow-2xl"
        >
          <div className="font-semibold text-sky-400 mb-1">
            SIGNAL DIAGNOSTIC OVERLAY (?debugSignal=1)
          </div>
          <div>MODE: {experienceMode.toUpperCase()}</div>
          <div>PATH LENGTH: {Math.round(pathLength)}px</div>
          <div>ANCHORS LOCKED: {junctionPoints.length}</div>
          <div>ACTIVE MODULE: {selectedCapability.toUpperCase()}</div>
        </div>
      )}
    </>
  );
};
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/Header.tsx">
<![CDATA['use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export interface HeaderProps {
  onOpenDemo: () => void;
  onOpenInfoModal: (topic: 'resources' | 'documentation' | 'about' | 'privacy') => void;
  activeSection: string;
}

type NavKey = 'platform' | 'capabilities' | 'architecture' | 'resources';

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenInfoModal,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<NavKey | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<NavKey, HTMLElement | null>>({
    platform: null,
    capabilities: null,
    architecture: null,
    resources: null,
  });
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update traveling underline position based on hovered or active navigation item
  useEffect(() => {
    const updateIndicator = () => {
      const navEl = navContainerRef.current;
      if (!navEl) return;
      const activeKey: NavKey | null =
        hoveredNav ||
        (activeSection === 'platform'
          ? 'platform'
          : activeSection === 'capabilities'
          ? 'capabilities'
          : activeSection === 'architecture'
          ? 'architecture'
          : null);

      if (!activeKey) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const targetEl = itemRefs.current[activeKey];
      if (!targetEl) return;

      const navRect = navEl.getBoundingClientRect();
      const itemRect = targetEl.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator, { passive: true });
    return () => window.removeEventListener('resize', updateIndicator);
  }, [hoveredNav, activeSection]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0C0F1B]/95 border-b border-[#9DA7C7]/20 shadow-[0_8px_32px_rgba(6,8,16,0.75)]'
          : 'bg-[#0C0F1B]/75 border-b border-[#9DA7C7]/14'
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-8 px-6 py-4 lg:px-12">
        {/* Zone 1: Brand lockup */}
        <a
          href="#top"
          className="group flex items-center gap-1 text-xl font-semibold tracking-tight text-[#F3F4FA] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] rounded"
          aria-label="Arc & Signal Home"
        >
          <span className="font-display font-semibold tracking-[-0.03em] text-[22px] text-[#F3F4FA]">
            arc<span className="text-[#9DA7C7] font-normal">&amp;</span>signal
          </span>
          <img
            src="/templates/arcsignal/signal-wave.svg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="h-4 w-4 -mt-3 -ml-0.5 transition-transform duration-200 group-hover:scale-110"
          />
        </a>

        {/* Zone 2: Primary navigation links with traveling elastic indicator */}
        <nav
          ref={navContainerRef}
          aria-label="Primary Navigation"
          onMouseLeave={() => setHoveredNav(null)}
          className="relative hidden md:flex items-center gap-9 text-sm font-medium text-[#9DA7C7]"
        >
          <a
            ref={(el) => {
              itemRefs.current.platform = el;
            }}
            href="#platform"
            onMouseEnter={() => setHoveredNav('platform')}
            onFocus={() => setHoveredNav('platform')}
            className={`hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'platform' ? 'text-[#F3F4FA]' : ''
            }`}
          >
            Platform
          </a>
          <a
            ref={(el) => {
              itemRefs.current.capabilities = el;
            }}
            href="#capabilities"
            onMouseEnter={() => setHoveredNav('capabilities')}
            onFocus={() => setHoveredNav('capabilities')}
            className={`hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'capabilities' ? 'text-[#F3F4FA]' : ''
            }`}
          >
            Solutions
          </a>
          <a
            ref={(el) => {
              itemRefs.current.architecture = el;
            }}
            href="#architecture"
            onMouseEnter={() => setHoveredNav('architecture')}
            onFocus={() => setHoveredNav('architecture')}
            className={`hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'architecture' ? 'text-[#F3F4FA]' : ''
            }`}
          >
            Architecture
          </a>
          <button
            ref={(el) => {
              itemRefs.current.resources = el;
            }}
            type="button"
            onClick={() => onOpenInfoModal('resources')}
            onMouseEnter={() => setHoveredNav('resources')}
            onFocus={() => setHoveredNav('resources')}
            className="hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] rounded"
          >
            Resources
          </button>

          {/* Traveling Elastic Signal Underline */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#D4C9FF] via-[#A58AFF] to-[#5367F9] shadow-[0_0_10px_#A58AFF]"
            style={{
              transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              transition:
                'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), width 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease',
            }}
          />
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDemo}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-outline whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
          >
            <span>BOOK A DEMO</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#A58AFF] btn-arrow-icon" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center h-10 w-10 rounded-lg border border-[#9DA7C7]/25 bg-[#11172A] text-[#F3F4FA] hover:border-[#A58AFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden fixed inset-x-0 top-[69px] bottom-0 z-50 bg-[#0C0F1B]/98 border-t border-[#9DA7C7]/20 px-6 py-8 flex flex-col justify-between overflow-y-auto"
        >
          <nav aria-label="Mobile Menu Links" className="flex flex-col gap-5">
            <a
              href="#platform"
              onClick={() => handleNavClick('#platform')}
              className="text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Platform</span>
              <span className="font-mono-tech text-xs text-[#A58AFF]">02</span>
            </a>
            <a
              href="#capabilities"
              onClick={() => handleNavClick('#capabilities')}
              className="text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Solutions</span>
              <span className="font-mono-tech text-xs text-[#A58AFF]">01</span>
            </a>
            <a
              href="#architecture"
              onClick={() => handleNavClick('#architecture')}
              className="text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Architecture</span>
              <span className="font-mono-tech text-xs text-[#A58AFF]">04</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInfoModal('resources');
              }}
              className="text-left text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Resources</span>
              <span className="font-mono-tech text-xs text-[#9DA7C7]">DOCS</span>
            </button>
          </nav>

          <div className="pt-6 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-primary flex items-center justify-center gap-2"
            >
              <span>BOOK A DEMO</span>
              <ArrowUpRight className="h-4 w-4 btn-arrow-icon" aria-hidden="true" />
            </button>
            <p className="font-mono-tech text-[11px] text-center tracking-[0.18em] text-[#9299B4] uppercase">
              ONE CONTROL PLANE. EVERY INTELLIGENT WORKFLOW.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/HeroCoreCanvas.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ExperienceMode } from '../utils/signalLogic';

export type CoreHotspotId = 'models' | 'agents' | 'tools' | 'data';

export interface ProjectedCoreAnchors {
  exitDocX: number;
  exitDocY: number;
  entryDocX: number;
  entryDocY: number;
  centerDocX: number;
  centerDocY: number;
  hotspots: Record<CoreHotspotId, { x: number; y: number }>;
}

export interface HeroCoreCanvasProps {
  selectedHotspot: CoreHotspotId;
  hoveredHotspot: CoreHotspotId | null;
  scrollProgress: number;
  reducedMotion: boolean;
  experienceMode?: ExperienceMode;
  syncPulseActive?: boolean;
  routeTriggerCount?: number;
  onProjectedAnchorsChange?: (anchors: ProjectedCoreAnchors) => void;
}

/**
 * Helper to create a 2D annular sector (segmented ring arc) shape for ExtrudeGeometry.
 */
function createArcRingShape(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
): THREE.Shape {
  const shape = new THREE.Shape();
  const span = Math.abs(endAngle - startAngle);
  if (span >= Math.PI * 1.999) {
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    if (innerRadius > 0.001) {
      const hole = new THREE.Path();
      hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
    return shape;
  }
  shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
  if (innerRadius > 0.001) {
    shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);
  } else {
    shape.lineTo(0, 0);
  }
  shape.closePath();
  return shape;
}

/**
 * Generates a procedural radial brushed gunmetal bump/roughness CanvasTexture.
 */
function createProceduralMetalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#505a7b';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 96; i++) {
      const r = 8 + (i / 96) * 118;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(180,192,230,0.22)' : 'rgba(12,16,32,0.42)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(128, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export const HeroCoreCanvas: React.FC<HeroCoreCanvasProps> = ({
  selectedHotspot,
  hoveredHotspot,
  scrollProgress,
  reducedMotion,
  experienceMode = 'idle',
  syncPulseActive = false,
  routeTriggerCount = 0,
  onProjectedAnchorsChange,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFallback, setWebglFallback] = useState(false);

  const stateRef = useRef({
    selectedHotspot,
    hoveredHotspot,
    scrollProgress,
    reducedMotion,
    experienceMode,
    syncPulseActive,
    routeTriggerCount,
    onProjectedAnchorsChange,
  });

  const lastRouteTriggerRef = useRef(routeTriggerCount);
  const routeEventStartTimeRef = useRef<number>(-10);

  useEffect(() => {
    if (routeTriggerCount !== lastRouteTriggerRef.current) {
      lastRouteTriggerRef.current = routeTriggerCount;
      routeEventStartTimeRef.current = performance.now() / 1000;
    }
    stateRef.current = {
      selectedHotspot,
      hoveredHotspot,
      scrollProgress,
      reducedMotion,
      experienceMode,
      syncPulseActive,
      routeTriggerCount,
      onProjectedAnchorsChange,
    };
  }, [
    selectedHotspot,
    hoveredHotspot,
    scrollProgress,
    reducedMotion,
    experienceMode,
    syncPulseActive,
    routeTriggerCount,
    onProjectedAnchorsChange,
  ]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglFallback(true);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebglFallback(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // Restrained exposure so gunmetal stays dark and only optical edges & packets glow
    renderer.toneMappingExposure = 0.92;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(360, container.clientWidth || 720);
    const height = Math.max(360, container.clientHeight || 620);
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.setAttribute('aria-hidden', 'true');

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(-0.08, 0.04, 9.35);
    camera.lookAt(0, 0, 0);

    // High-contrast architectural lighting: dim warm-neutral key + localized cool rim + deep aperture point light
    const hemiLight = new THREE.HemisphereLight(0x9da7c7, 0x060812, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xeef0fa, 1.55);
    keyLight.position.set(4.5, 5.0, 6.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7c66f5, 2.2);
    rimLight.position.set(-5.2, -3.2, 4.8);
    scene.add(rimLight);

    const coreChamberLight = new THREE.PointLight(0x7e64ff, 2.8, 6.5, 1.6);
    coreChamberLight.position.set(0.0, 0.0, -0.35);
    scene.add(coreChamberLight);

    const coreGroup = new THREE.Group();
    const baseRotX = -0.44;
    const baseRotY = -0.34;
    const baseRotZ = 0.22;
    coreGroup.rotation.set(baseRotX, baseRotY, baseRotZ);
    coreGroup.position.set(0.22, 0.04, 0);
    scene.add(coreGroup);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const bumpTex = createProceduralMetalTexture();
    bumpTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Dark obsidian / gunmetal / titanium material hierarchy (no pale washed-out white rings)
    const matAbyssChamber = new THREE.MeshStandardMaterial({
      color: 0x060913,
      emissive: new THREE.Color(0x03050b),
      emissiveIntensity: 0.2,
      metalness: 0.75,
      roughness: 0.85,
    });
    const matDarkGraphite = new THREE.MeshStandardMaterial({
      color: 0x10162a,
      emissive: new THREE.Color(0x070a16),
      emissiveIntensity: 0.25,
      metalness: 0.78,
      roughness: 0.62,
      bumpMap: bumpTex,
      bumpScale: 0.016,
    });
    const matGunmetalTitanium = new THREE.MeshStandardMaterial({
      color: 0x222c4e,
      emissive: new THREE.Color(0x0d1328),
      emissiveIntensity: 0.28,
      metalness: 0.88,
      roughness: 0.34,
      bumpMap: bumpTex,
      bumpScale: 0.02,
    });
    const matBrushedSteel = new THREE.MeshPhysicalMaterial({
      color: 0x4b5989,
      emissive: new THREE.Color(0x172042),
      emissiveIntensity: 0.26,
      metalness: 0.9,
      roughness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
    });
    const matCobaltStructural = new THREE.MeshStandardMaterial({
      color: 0x2c3b82,
      emissive: new THREE.Color(0x162052),
      emissiveIntensity: 0.38,
      metalness: 0.82,
      roughness: 0.28,
    });
    const matOpticalWaveguide = new THREE.MeshPhysicalMaterial({
      color: 0x6b56d6,
      emissive: new THREE.Color(0x3b2b94),
      emissiveIntensity: 0.42,
      metalness: 0.15,
      roughness: 0.18,
      transparent: true,
      opacity: 0.56,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const matOpticalActive = new THREE.MeshPhysicalMaterial({
      color: 0x9980ff,
      emissive: new THREE.Color(0x5c43d6),
      emissiveIntensity: 0.65,
      metalness: 0.18,
      roughness: 0.14,
      transparent: true,
      opacity: 0.68,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const matRimAccent = new THREE.MeshBasicMaterial({
      color: 0xc8baff,
      transparent: true,
      opacity: 0.78,
    });

    materialsToDispose.push(
      matAbyssChamber,
      matDarkGraphite,
      matGunmetalTitanium,
      matBrushedSteel,
      matCobaltStructural,
      matOpticalWaveguide,
      matOpticalActive,
      matRimAccent
    );

    // =========================================================================
    // LAYER 1–3: RECESSED CENTRAL CHAMBER & MID-DEPTH MECHANICAL APERTURE
    // =========================================================================
    const wellGroup = new THREE.Group();
    coreGroup.add(wellGroup);

    // Deep dark chamber floor disk creating true occlusion tunnel
    const floorGeo = new THREE.CircleGeometry(0.46, 48);
    geometriesToDispose.push(floorGeo);
    const floorMesh = new THREE.Mesh(floorGeo, matAbyssChamber);
    floorMesh.position.z = -1.02;
    wellGroup.add(floorMesh);

    // Subtle deep-well optical core ring (parallax anchor deep inside chamber)
    const innerCoreLensGeo = new THREE.TorusGeometry(0.24, 0.022, 16, 48);
    geometriesToDispose.push(innerCoreLensGeo);
    const innerCoreLensMat = new THREE.MeshBasicMaterial({
      color: 0xa58aff,
      transparent: true,
      opacity: 0.85,
    });
    materialsToDispose.push(innerCoreLensMat);
    const innerCoreLens = new THREE.Mesh(innerCoreLensGeo, innerCoreLensMat);
    innerCoreLens.position.z = -0.88;
    wellGroup.add(innerCoreLens);

    const wellSteps = [
      { rIn: 0.24, rOut: 0.48, depth: 0.22, z: -0.92, mat: matAbyssChamber },
      { rIn: 0.42, rOut: 0.68, depth: 0.26, z: -0.7, mat: matDarkGraphite },
      { rIn: 0.6, rOut: 0.88, depth: 0.28, z: -0.46, mat: matGunmetalTitanium },
      { rIn: 0.78, rOut: 1.08, depth: 0.26, z: -0.22, mat: matDarkGraphite },
    ];
    wellSteps.forEach((step, idx) => {
      const shape = createArcRingShape(step.rIn, step.rOut, 0, Math.PI * 2);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: step.depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.018,
        bevelSegments: 2,
        curveSegments: 48,
      });
      geometriesToDispose.push(geo);
      const mesh = new THREE.Mesh(geo, step.mat);
      mesh.position.z = step.z;
      wellGroup.add(mesh);

      const lipGeo = new THREE.TorusGeometry(step.rIn + 0.02, 0.012, 12, 64);
      geometriesToDispose.push(lipGeo);
      const lipMesh = new THREE.Mesh(
        lipGeo,
        idx === 1 ? matRimAccent : matBrushedSteel
      );
      lipMesh.position.z = step.z + step.depth + 0.01;
      wellGroup.add(lipMesh);
    });

    // Mid-depth mechanical aperture blades (36 instanced dark-steel stator blades)
    const ribCount = 36;
    const ribGeo = new THREE.BoxGeometry(0.22, 0.028, 0.18);
    geometriesToDispose.push(ribGeo);
    const ribInstanced = new THREE.InstancedMesh(ribGeo, matBrushedSteel, ribCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < ribCount; i++) {
      const angle = (i / ribCount) * Math.PI * 2;
      const radius = 0.64;
      dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, -0.32);
      dummy.rotation.set(0, 0, angle + 0.28); // angled turbine iris blades
      dummy.scale.set(1, i % 3 === 0 ? 1.55 : 0.85, 1);
      dummy.updateMatrix();
      ribInstanced.setMatrixAt(i, dummy.matrix);
    }
    ribInstanced.instanceMatrix.needsUpdate = true;
    ribInstanced.computeBoundingSphere();
    wellGroup.add(ribInstanced);

    // =========================================================================
    // LAYER 4–7: OUTER STRUCTURAL GUNMETAL ASSEMBLY (Parts 5-8)
    // =========================================================================
    interface AnimatedRingLayer {
      group: THREE.Group;
      speed: number;
      baseZ: number;
      bootOffsetAngle: number;
      sectorCategory: CoreHotspotId;
      emissiveMat?: THREE.MeshPhysicalMaterial;
      edgeMat?: THREE.LineBasicMaterial;
    }
    const animatedRings: AnimatedRingLayer[] = [];

    const mechanicalArcConfigs: {
      rIn: number;
      rOut: number;
      start: number;
      end: number;
      depth: number;
      z: number;
      mat: THREE.Material;
      speed: number;
      withBevelRim?: boolean;
      category: CoreHotspotId;
    }[] = [
      {
        rIn: 0.92,
        rOut: 1.16,
        start: 0.18,
        end: 2.38,
        depth: 0.24,
        z: -0.02,
        mat: matGunmetalTitanium,
        speed: 0.045,
        withBevelRim: true,
        category: 'models',
      },
      {
        rIn: 0.94,
        rOut: 1.14,
        start: 2.72,
        end: 4.58,
        depth: 0.22,
        z: -0.06,
        mat: matDarkGraphite,
        speed: 0.045,
        withBevelRim: true,
        category: 'data',
      },
      {
        rIn: 0.94,
        rOut: 1.14,
        start: 4.92,
        end: 6.08,
        depth: 0.2,
        z: -0.04,
        mat: matCobaltStructural,
        speed: 0.045,
        category: 'tools',
      },
      {
        rIn: 1.22,
        rOut: 1.54,
        start: -0.32,
        end: 1.82,
        depth: 0.28,
        z: 0.02,
        mat: matDarkGraphite,
        speed: -0.032,
        withBevelRim: true,
        category: 'agents',
      },
      {
        rIn: 1.24,
        rOut: 1.52,
        start: 2.22,
        end: 4.15,
        depth: 0.26,
        z: 0.0,
        mat: matGunmetalTitanium,
        speed: -0.032,
        withBevelRim: true,
        category: 'models',
      },
      {
        rIn: 1.26,
        rOut: 1.48,
        start: 4.48,
        end: 5.62,
        depth: 0.22,
        z: -0.02,
        mat: matBrushedSteel,
        speed: -0.032,
        withBevelRim: true,
        category: 'tools',
      },
      {
        rIn: 1.6,
        rOut: 1.92,
        start: 0.68,
        end: 3.48,
        depth: 0.22,
        z: -0.04,
        mat: matGunmetalTitanium,
        speed: 0.022,
        withBevelRim: true,
        category: 'models',
      },
      {
        rIn: 1.62,
        rOut: 1.9,
        start: 3.92,
        end: 6.38,
        depth: 0.22,
        z: -0.06,
        mat: matDarkGraphite,
        speed: 0.022,
        withBevelRim: true,
        category: 'data',
      },
    ];

    mechanicalArcConfigs.forEach((cfg, idx) => {
      const layerGroup = new THREE.Group();
      const shape = createArcRingShape(cfg.rIn, cfg.rOut, cfg.start, cfg.end);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: cfg.depth,
        bevelEnabled: true,
        bevelThickness: 0.026,
        bevelSize: 0.022,
        bevelSegments: 3,
        curveSegments: 56,
      });
      geometriesToDispose.push(geo);

      const mesh = new THREE.Mesh(geo, cfg.mat);
      layerGroup.add(mesh);

      if (cfg.withBevelRim) {
        const rimShape = createArcRingShape(
          cfg.rOut - 0.018,
          cfg.rOut + 0.004,
          cfg.start + 0.04,
          cfg.end - 0.04
        );
        const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
          depth: 0.012,
          bevelEnabled: false,
          curveSegments: 48,
        });
        geometriesToDispose.push(rimGeo);
        const rimMesh = new THREE.Mesh(rimGeo, matRimAccent);
        rimMesh.position.z = cfg.depth + 0.015;
        layerGroup.add(rimMesh);
      }

      layerGroup.position.z = cfg.z;
      coreGroup.add(layerGroup);
      animatedRings.push({
        group: layerGroup,
        speed: cfg.speed,
        baseZ: cfg.z,
        bootOffsetAngle: (idx % 2 === 0 ? 1 : -1) * (0.28 + idx * 0.05),
        sectorCategory: cfg.category,
      });
    });

    // =========================================================================
    // LAYER 8–9: OPTICAL ROUTING RING & SELECTIVE EMISSIVE WAVEGUIDES
    // =========================================================================
    const glassShellConfigs: {
      rIn: number;
      rOut: number;
      start: number;
      end: number;
      depth: number;
      z: number;
      bright?: boolean;
      speed: number;
      category: CoreHotspotId;
    }[] = [
      {
        rIn: 1.7,
        rOut: 2.08,
        start: 1.28,
        end: 3.45,
        depth: 0.09,
        z: 0.22,
        bright: true,
        speed: 0.018,
        category: 'models',
      },
      {
        rIn: 1.72,
        rOut: 2.1,
        start: 4.55,
        end: 6.38,
        depth: 0.09,
        z: 0.24,
        bright: false,
        speed: -0.016,
        category: 'agents',
      },
      {
        rIn: 1.0,
        rOut: 1.22,
        start: 1.05,
        end: 3.12,
        depth: 0.08,
        z: 0.3,
        bright: true,
        speed: -0.025,
        category: 'models',
      },
      {
        rIn: 1.02,
        rOut: 1.24,
        start: 4.2,
        end: 6.12,
        depth: 0.08,
        z: 0.28,
        bright: false,
        speed: 0.025,
        category: 'tools',
      },
      {
        rIn: 2.16,
        rOut: 2.34,
        start: 1.42,
        end: 3.18,
        depth: 0.045,
        z: 0.12,
        bright: false,
        speed: 0.012,
        category: 'data',
      },
      {
        rIn: 2.16,
        rOut: 2.32,
        start: 4.72,
        end: 6.08,
        depth: 0.045,
        z: 0.12,
        bright: false,
        speed: -0.012,
        category: 'tools',
      },
    ];

    glassShellConfigs.forEach((shell, idx) => {
      const shellGroup = new THREE.Group();
      const shape = createArcRingShape(shell.rIn, shell.rOut, shell.start, shell.end);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: shell.depth,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.012,
        bevelSegments: 2,
        curveSegments: 56,
      });
      geometriesToDispose.push(geo);

      const mat = (shell.bright ? matOpticalActive : matOpticalWaveguide).clone();
      materialsToDispose.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.renderOrder = 10 + idx;
      shellGroup.add(mesh);

      const edgeGeo = new THREE.EdgesGeometry(geo, 22);
      geometriesToDispose.push(edgeGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: shell.bright ? 0xd4c9ff : 0x8f7ef2,
        transparent: true,
        opacity: shell.bright ? 0.85 : 0.48,
      });
      materialsToDispose.push(edgeMat);
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      edgeLines.renderOrder = 12 + idx;
      shellGroup.add(edgeLines);

      shellGroup.position.z = shell.z;
      coreGroup.add(shellGroup);
      animatedRings.push({
        group: shellGroup,
        speed: shell.speed,
        baseZ: shell.z,
        bootOffsetAngle: (idx % 2 === 0 ? -1 : 1) * (0.35 + idx * 0.06),
        sectorCategory: shell.category,
        emissiveMat: mat,
        edgeMat,
      });
    });

    // =========================================================================
    // LAYER 10: CALIBRATION TRACKS & RADIAL GRADUATION TICKS (InstancedMesh)
    // =========================================================================
    const tickCount = 120;
    const tickGeo = new THREE.BoxGeometry(0.07, 0.012, 0.016);
    geometriesToDispose.push(tickGeo);
    const tickMat = new THREE.MeshBasicMaterial({
      color: 0xc2b6f2,
      transparent: true,
      opacity: 0.68,
    });
    materialsToDispose.push(tickMat);
    const tickInstanced = new THREE.InstancedMesh(tickGeo, tickMat, tickCount);
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const r = i % 2 === 0 ? 1.96 : 1.56;
      dummy.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.34);
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(i % 6 === 0 ? 1.85 : 0.95, 1, 1);
      dummy.updateMatrix();
      tickInstanced.setMatrixAt(i, dummy.matrix);
    }
    tickInstanced.instanceMatrix.needsUpdate = true;
    tickInstanced.computeBoundingSphere();
    coreGroup.add(tickInstanced);

    // Fine concentric technical reference rings
    [1.16, 1.58, 2.12, 2.48].forEach((r, idx) => {
      const trackGeo = new THREE.RingGeometry(r, r + 0.01, 96);
      geometriesToDispose.push(trackGeo);
      const trackMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x9b82ff : 0x6c78a4,
        transparent: true,
        opacity: idx >= 2 ? 0.28 : 0.45,
        side: THREE.DoubleSide,
      });
      materialsToDispose.push(trackMat);
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      trackMesh.position.z = idx >= 2 ? -0.08 : 0.14;
      coreGroup.add(trackMesh);
    });

    // =========================================================================
    // LAYER 11–12: PHYSICAL INTAKE / OUTPUT PORTS & CURVED INTERNAL ROUTING MANIFOLD
    // (Routes around the recessed central aperture rather than cutting across the hole!)
    // =========================================================================
    const exitAnchorObj = new THREE.Object3D();
    exitAnchorObj.position.set(-1.32, -2.06, 0.24);
    coreGroup.add(exitAnchorObj);

    const entryAnchorObj = new THREE.Object3D();
    entryAnchorObj.position.set(1.62, 1.42, 0.26);
    coreGroup.add(entryAnchorObj);

    const centerAnchorObj = new THREE.Object3D();
    centerAnchorObj.position.set(0, 0, 0.12);
    coreGroup.add(centerAnchorObj);

    const hotspotAnchors: Record<CoreHotspotId, THREE.Object3D> = {
      models: new THREE.Object3D(),
      agents: new THREE.Object3D(),
      tools: new THREE.Object3D(),
      data: new THREE.Object3D(),
    };
    hotspotAnchors.models.position.set(-0.98, 1.84, 0.28);
    hotspotAnchors.agents.position.set(1.94, 0.44, 0.28);
    hotspotAnchors.tools.position.set(1.42, -1.54, 0.26);
    hotspotAnchors.data.position.set(-0.54, -1.92, 0.24);
    Object.values(hotspotAnchors).forEach((obj) => coreGroup.add(obj));

    // Machined 3D Port Collars at Upper-Right Intake & Lower-Left Output
    const portCollarGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.14, 24);
    portCollarGeo.rotateX(Math.PI / 2);
    geometriesToDispose.push(portCollarGeo);

    const portEmitterGeo = new THREE.SphereGeometry(0.065, 16, 16);
    geometriesToDispose.push(portEmitterGeo);

    const intakePortMat = new THREE.MeshBasicMaterial({
      color: 0xe2d9ff,
      transparent: true,
      opacity: 0.92,
    });
    const outputPortMat = new THREE.MeshBasicMaterial({
      color: 0xf3f4fa,
      transparent: true,
      opacity: 0.95,
    });
    materialsToDispose.push(intakePortMat, outputPortMat);

    const intakePos = new THREE.Vector3(1.24, 1.12, 0.26);
    const outputPos = new THREE.Vector3(-0.92, -1.24, 0.24);

    const intakeCollar = new THREE.Mesh(portCollarGeo, matBrushedSteel);
    intakeCollar.position.copy(intakePos);
    const intakeEmitter = new THREE.Mesh(portEmitterGeo, intakePortMat);
    intakeEmitter.position.copy(intakePos).setZ(0.32);

    const outputCollar = new THREE.Mesh(portCollarGeo, matBrushedSteel);
    outputCollar.position.copy(outputPos);
    const outputEmitter = new THREE.Mesh(portEmitterGeo, outputPortMat);
    outputEmitter.position.copy(outputPos).setZ(0.3);

    coreGroup.add(intakeCollar, intakeEmitter, outputCollar, outputEmitter);

    // Internal curved routing waveguides that wrap AROUND the central chamber (r ~ 0.95..1.35)
    // so streams enter the intake port, route through the left/right ring manifold, and exit the output port!
    const manifoldDefinitions = [
      {
        // Upper-left MODELS / DATA perimeter manifold curve
        pts: [
          intakePos.clone(),
          new THREE.Vector3(0.45, 1.32, 0.26),
          new THREE.Vector3(-0.62, 1.12, 0.26),
          new THREE.Vector3(-1.18, 0.25, 0.25),
          new THREE.Vector3(-1.16, -0.58, 0.24),
          outputPos.clone(),
        ],
        coreRadius: 0.018,
        haloRadius: 0.052,
        color: 0xf3f4fa,
        haloColor: 0x9b82ff,
        category: 'models' as CoreHotspotId,
      },
      {
        // Lower-right AGENTS / TOOLS perimeter manifold curve
        pts: [
          intakePos.clone(),
          new THREE.Vector3(1.38, 0.38, 0.25),
          new THREE.Vector3(1.18, -0.54, 0.24),
          new THREE.Vector3(0.52, -1.18, 0.24),
          new THREE.Vector3(-0.24, -1.32, 0.24),
          outputPos.clone(),
        ],
        coreRadius: 0.015,
        haloRadius: 0.044,
        color: 0xd9ceff,
        haloColor: 0x5367f9,
        category: 'agents' as CoreHotspotId,
      },
    ];

    const pulseMeshes: {
      mesh: THREE.Mesh;
      haloMesh: THREE.Mesh;
      curve: THREE.CatmullRomCurve3;
      offset: number;
      category: CoreHotspotId;
    }[] = [];

    manifoldDefinitions.forEach((def, idx) => {
      const curve = new THREE.CatmullRomCurve3(def.pts);
      const coreTubeGeo = new THREE.TubeGeometry(curve, 72, def.coreRadius, 12, false);
      const haloTubeGeo = new THREE.TubeGeometry(curve, 72, def.haloRadius, 12, false);
      geometriesToDispose.push(coreTubeGeo, haloTubeGeo);

      const coreMat = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.88,
      });
      const haloMat = new THREE.MeshBasicMaterial({
        color: def.haloColor,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
      });
      materialsToDispose.push(coreMat, haloMat);

      const coreMesh = new THREE.Mesh(coreTubeGeo, coreMat);
      const haloMesh = new THREE.Mesh(haloTubeGeo, haloMat);
      coreMesh.renderOrder = 22;
      haloMesh.renderOrder = 21;
      coreGroup.add(coreMesh, haloMesh);

      const beadGeo = new THREE.SphereGeometry(def.coreRadius * 2.3, 14, 14);
      const beadHaloGeo = new THREE.SphereGeometry(def.haloRadius * 1.45, 14, 14);
      geometriesToDispose.push(beadGeo, beadHaloGeo);
      const beadMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.98,
      });
      const beadHaloMat = new THREE.MeshBasicMaterial({
        color: 0xa58aff,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      });
      materialsToDispose.push(beadMat, beadHaloMat);
      const beadMesh = new THREE.Mesh(beadGeo, beadMat);
      const beadHaloMesh = new THREE.Mesh(beadHaloGeo, beadHaloMat);
      beadMesh.renderOrder = 25;
      beadHaloMesh.renderOrder = 24;
      coreGroup.add(beadMesh, beadHaloMesh);
      pulseMeshes.push({
        mesh: beadMesh,
        haloMesh: beadHaloMesh,
        curve,
        offset: idx * 0.48,
        category: def.category,
      });
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (stateRef.current.reducedMotion) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      // Subtle 2-4 degree maximum tilt
      targetPointerX = THREE.MathUtils.clamp(nx, -1, 1) * 0.055;
      targetPointerY = THREE.MathUtils.clamp(ny, -1, 1) * 0.055;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const _worldVec = new THREE.Vector3();
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    let lastAnchorUpdate = 0;
    const projectAnchorsToDoc = (now: number) => {
      const cb = stateRef.current.onProjectedAnchorsChange;
      if (!cb || now - lastAnchorUpdate < 45) return;
      lastAnchorUpdate = now;

      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;

      const toDocAndLocal = (obj: THREE.Object3D) => {
        obj.getWorldPosition(_worldVec);
        _worldVec.project(camera);
        const localX = (_worldVec.x * 0.5 + 0.5) * rect.width;
        const localY = (-_worldVec.y * 0.5 + 0.5) * rect.height;
        return {
          localX,
          localY,
          docX: rect.left + scrollX + localX,
          docY: rect.top + scrollY + localY,
        };
      };

      coreGroup.updateMatrixWorld(true);
      const exitPt = toDocAndLocal(exitAnchorObj);
      const entryPt = toDocAndLocal(entryAnchorObj);
      const centerPt = toDocAndLocal(centerAnchorObj);
      const mPt = toDocAndLocal(hotspotAnchors.models);
      const aPt = toDocAndLocal(hotspotAnchors.agents);
      const tPt = toDocAndLocal(hotspotAnchors.tools);
      const dPt = toDocAndLocal(hotspotAnchors.data);

      cb({
        exitDocX: exitPt.docX,
        exitDocY: exitPt.docY,
        entryDocX: entryPt.docX,
        entryDocY: entryPt.docY,
        centerDocX: centerPt.docX,
        centerDocY: centerPt.docY,
        hotspots: {
          models: { x: mPt.localX, y: mPt.localY },
          agents: { x: aPt.localX, y: aPt.localY },
          tools: { x: tPt.localX, y: tPt.localY },
          data: { x: dPt.localX, y: dPt.localY },
        },
      });
    };

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(300, container.clientWidth);
      const h = Math.max(300, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
      lastAnchorUpdate = 0;
      projectAnchorsToDoc(performance.now());
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    const startTimeMs = performance.now();
    let prevTimeMs = startTimeMs;
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      let polls = 0;
      const poll = () => {
        if (isDisposed) return;
        polls++;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED && polls < 12) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;

      const nowMs = performance.now();
      const dt = Math.min((nowMs - prevTimeMs) / 1000, 0.1);
      prevTimeMs = nowMs;
      const elapsed = (nowMs - startTimeMs) / 1000;

      const {
        selectedHotspot: activeHotspot,
        hoveredHotspot: hoverHotspot,
        scrollProgress: sProg,
        reducedMotion: reduceMot,
        syncPulseActive: isSyncEvent,
      } = stateRef.current;

      if (isVisible) {
        // A. Boot sequence (1.8 seconds): segmented arcs settle from offset angles, aperture initializes
        const bootT = reduceMot ? 1 : Math.min(1, elapsed / 1.8);
        const bootEase = 1 - Math.pow(1 - bootT, 3);

        // C. Route event causal timing window (1.2s after any route/model selection change)
        const routeAge = elapsed - (routeEventStartTimeRef.current - startTimeMs / 1000);
        const isRouteBurst = routeAge >= 0 && routeAge < 1.25;
        const routeBurstIntensity = isRouteBurst ? Math.sin((routeAge / 1.25) * Math.PI) : 0;

        // D. Synchronization event (periodic 11s calm aperture alignment wave)
        const syncWave = isSyncEvent ? 0.5 + 0.5 * Math.sin(elapsed * 4.0) : 0;

        const dampFactor = 1 - Math.exp(-6 * dt);
        currentPointerX += (targetPointerX - currentPointerX) * dampFactor;
        currentPointerY += (targetPointerY - currentPointerY) * dampFactor;

        // F. Scroll handoff: core gently recedes and tilts as hero transitions away
        const scrollTiltX = THREE.MathUtils.clamp(sProg * 0.2, 0, 0.14);
        const scrollShiftY = THREE.MathUtils.clamp(sProg * 0.26, 0, 0.2);
        const scrollRecedeZ = THREE.MathUtils.clamp(sProg * -0.45, -0.35, 0);

        coreGroup.rotation.x = baseRotX + currentPointerY - scrollTiltX;
        coreGroup.rotation.y = baseRotY + currentPointerX;
        coreGroup.rotation.z = baseRotZ + (1 - bootEase) * -0.32;
        coreGroup.position.y = 0.04 + scrollShiftY;
        coreGroup.position.z = scrollRecedeZ;

        const focusTarget = hoverHotspot || activeHotspot;

        // Intake & Output port causal pulse on route event or scroll handoff
        const intakeScale = 1 + routeBurstIntensity * 0.45 + syncWave * 0.2;
        const outputScale =
          1 +
          (isRouteBurst && routeAge > 0.45 ? 0.5 : 0) +
          (sProg > 0.02 && sProg < 0.35 ? 0.35 : 0);
        intakeEmitter.scale.setScalar(intakeScale);
        outputEmitter.scale.setScalar(outputScale);

        // Inner chamber lens subtle breathing
        innerCoreLens.scale.setScalar(0.95 + 0.08 * Math.sin(elapsed * 2.1) + syncWave * 0.12);
        coreChamberLight.intensity = 2.4 + routeBurstIntensity * 1.4 + syncWave * 1.1;

        for (let i = 0; i < animatedRings.length; i++) {
          const item = animatedRings[i];
          const isFocused = item.sectorCategory === focusTarget;
          const targetZ =
            item.baseZ * (0.82 + 0.18 * bootEase) +
            (1 - bootEase) * (0.18 * ((i % 3) - 1)) +
            (isFocused ? 0.055 : 0) +
            syncWave * 0.02;
          item.group.position.z += (targetZ - item.group.position.z) * dampFactor;

          // Modulate optical ring emissive intensity so only focused/routed sector glows brightly
          if (item.emissiveMat) {
            const targetEmissive = isFocused
              ? 0.92 + routeBurstIntensity * 0.55 + syncWave * 0.3
              : 0.32 + syncWave * 0.18;
            item.emissiveMat.emissiveIntensity +=
              (targetEmissive - item.emissiveMat.emissiveIntensity) * dampFactor;
          }
          if (item.edgeMat) {
            const targetOp = isFocused ? 0.95 : 0.42;
            item.edgeMat.opacity += (targetOp - item.edgeMat.opacity) * dampFactor;
          }

          if (!reduceMot) {
            if (bootT < 1) {
              item.group.rotation.z = item.bootOffsetAngle * (1 - bootEase);
            } else if (isSyncEvent) {
              // During synchronization event, rings gently align toward 0 offset
              item.group.rotation.z *= Math.pow(0.4, dt);
            } else {
              const speedMult = isFocused ? 1.35 : 0.55;
              item.group.rotation.z += item.speed * speedMult * dt;
            }
          }
        }

        // Traveling internal manifold light packets from Intake Port -> Sector -> Output Port
        for (let i = 0; i < pulseMeshes.length; i++) {
          const p = pulseMeshes[i];
          const speed = isRouteBurst ? 0.85 : 0.36;
          const u = reduceMot ? 0.5 : (elapsed * speed + p.offset) % 1;
          p.curve.getPointAt(u, _worldVec);
          p.mesh.position.copy(_worldVec);
          p.haloMesh.position.copy(_worldVec);
          const pulseScale = p.category === focusTarget ? 1.25 + routeBurstIntensity * 0.4 : 0.85;
          p.mesh.scale.setScalar(pulseScale);
          p.haloMesh.scale.setScalar(pulseScale);
        }

        renderer.render(scene, camera);
        projectAnchorsToDoc(nowMs);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    renderer.render(scene, camera);
    projectAnchorsToDoc(performance.now());
    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      bumpTex.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglFallback) {
    return (
      <div
        className="relative w-full h-full flex items-center justify-center p-6"
        data-testid="hero-core-fallback"
      >
        <img
          src="/templates/arcsignal/hero-core-fallback.svg"
          alt="Arc & Signal 2.5D Orchestration Core Illustration"
          referrerPolicy="no-referrer"
          className="w-full max-w-[520px] h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      data-testid="hero-core-canvas"
      className="relative z-20 w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[600px]"
    />
  );
};
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/HeroSection.tsx">
<![CDATA['use client';

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
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/Modals.tsx">
<![CDATA['use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, Shield, BookOpen, Layers, Info } from 'lucide-react';
import {
  DemoRequestInput,
  validateDemoRequest,
} from '../utils/signalLogic';

export interface DemoRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoRequestDialog: React.FC<DemoRequestDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState<DemoRequestInput>({
    name: '',
    email: '',
    company: '',
    objective: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DemoRequestInput, string>>>({});
  const [preparedDraft, setPreparedDraft] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateDemoRequest(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedDraft(false);
      return;
    }
    setErrors({});
    setPreparedDraft(true);
  };

  const formattedRequestText = `Arc & Signal — Architecture Walkthrough Request (Demo Mode)
Name: ${form.name.trim()}
Work Email: ${form.email.trim()}
Team / Company: ${form.company.trim()}
Orchestration Objective: ${form.objective.trim()}`;

  const handleCopySummary = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formattedRequestText).catch(() => {});
    }
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const mailtoHref = `mailto:hello@arcandsignal.example?subject=${encodeURIComponent(
    `Arc & Signal Demo Inquiry — ${form.company.trim()}`
  )}&body=${encodeURIComponent(formattedRequestText)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060811]/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#A58AFF]/45 bg-[#11172A] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(151,127,255,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#A58AFF]">
              INTERACTIVE TEMPLATE // DEMO MODE
            </span>
            <h2
              id="demo-dialog-title"
              className="font-display text-2xl font-bold uppercase tracking-tight text-[#F3F4FA] mt-1"
            >
              BOOK AN ARCHITECTURE DEMO
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo request dialog"
            className="rounded-lg border border-[#9DA7C7]/25 bg-[#171D32] p-2 text-[#9DA7C7] hover:text-[#F3F4FA] hover:border-[#A58AFF] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#9DA7C7] mb-6 leading-relaxed">
          Configure your inquiry below. Because Arc &amp; Signal is a concept platform template
          with no external booking backend connected, preparing your request generates a formatted
          brief you can copy or open as an email draft.
        </p>

        {!preparedDraft ? (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="demo-name"
                className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
              >
                Your Name
              </label>
              <input
                id="demo-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Elena Vance"
                className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-rose-300" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="demo-email"
                  className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
                >
                  Work Email
                </label>
                <input
                  id="demo-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="elena@company.example"
                  className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-300" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="demo-company"
                  className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
                >
                  Team / Company
                </label>
                <input
                  id="demo-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Meridian Systems"
                  className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-rose-300" role="alert">
                    {errors.company}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="demo-objective"
                className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#F3F4FA] mb-1.5"
              >
                What would you like to build or orchestrate?
              </label>
              <textarea
                id="demo-objective"
                rows={3}
                value={form.objective}
                onChange={(e) => setForm({ ...form, objective: e.target.value })}
                placeholder="Multi-agent customer resolution pipeline with human review checkpoints..."
                className="w-full rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/30 px-3.5 py-2.5 text-sm text-[#F3F4FA] placeholder-[#9299B4]/50 focus:outline-none focus:border-[#A58AFF]"
              />
              {errors.objective && (
                <p className="mt-1 text-xs text-rose-300" role="alert">
                  {errors.objective}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#9DA7C7] hover:text-[#F3F4FA] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-primary cursor-pointer"
              >
                Prepare Demo Request
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#0C0F1B] border border-[#A58AFF]/40 p-4">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#D4C9FF] mb-2">
                DEMO MODE — REQUEST BRIEF PREPARED (NOT SENT TO EXTERNAL SERVER)
              </div>
              <pre className="font-mono-tech text-xs text-[#F3F4FA] whitespace-pre-wrap leading-relaxed">
                {formattedRequestText}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPreparedDraft(false)}
                className="font-mono-tech text-xs text-[#9DA7C7] hover:text-[#F3F4FA] underline cursor-pointer"
              >
                Edit Details
              </button>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4FA] btn-signal-outline cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#A58AFF]" />
                      <span>Copied Request</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#A58AFF]" />
                      <span>Copy Request</span>
                    </>
                  )}
                </button>

                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4FA] btn-signal-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Create Email Draft</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export interface InfoModalProps {
  topic: 'resources' | 'documentation' | 'about' | 'privacy' | 'social' | null;
  onClose: () => void;
  onOpenDemo: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  topic,
  onClose,
  onOpenDemo,
}) => {
  useEffect(() => {
    if (!topic) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [topic, onClose]);

  if (!topic) return null;

  const contentMap = {
    resources: {
      icon: Layers,
      kicker: 'ARCHITECTURE & RESOURCES',
      title: 'Orchestration Topology Brief',
      paragraphs: [
        'Arc & Signal models intelligence workflows as deterministic, observable execution graphs rather than opaque prompt chains.',
        'Every incoming request passes through four coordinated layers: (01) Multi-Agent Orchestration, (02) Policy-Driven Model Routing, (03) Full-Trace Observability, and (04) Human-in-the-Loop Governance gates.',
      ],
      bullets: [
        'Reference Pipeline: 6-stage Customer Resolution Pipeline with staged CRM dry-run.',
        'Model Routing: Dynamic switching across Fast, Balanced, and Deep Reasoning endpoints.',
        'Zero-Trust Governance: Explicit operator approval before high-impact external mutations.',
      ],
    },
    documentation: {
      icon: BookOpen,
      kicker: 'CONCEPT DOCUMENTATION',
      title: 'Control Plane Specification',
      paragraphs: [
        'This interactive template demonstrates how enterprise AI platforms expose model routing, tool permissions, and execution traces in a unified control plane.',
        'Use the interactive controls in Section 02 (Capabilities) and Section 03 (Inside the Platform) to step through stage executions, test human approval checkpoints, and inspect sample payloads.',
      ],
      bullets: [
        'Interactive Workflow Builder: Click any stage (01–06) to inspect inputs, tools, and policies.',
        'Deterministic Simulation: Click "Run Demo" to step through trigger, retrieval, planning, and human review.',
        'Continuous Signal Architecture: Real-time 2.5D Three.js core linked to a document-spanning SVG signal path.',
      ],
    },
    about: {
      icon: Info,
      kicker: 'ABOUT ARC & SIGNAL',
      title: 'The Intelligence Orchestration Layer',
      paragraphs: [
        'Arc & Signal is a concept enterprise AI orchestration platform designed to bring models, autonomous agents, enterprise tools, and tenant data into synchronization.',
        'All metrics, execution traces, latency figures, and pipeline stages shown in this interface are deterministic client-side demonstrations built for architectural exploration.',
      ],
      bullets: [
        'Visual System: Dark obsidian canvas with engineered violet-to-cobalt routing indicators.',
        '3D Engine: Procedural 2.5D Three.js segmented core with physical materials and studio lighting.',
        'Transparent Demo Policy: No external API calls or hidden background telemetry.',
      ],
    },
    privacy: {
      icon: Shield,
      kicker: 'PRIVACY & DATA NOTICE',
      title: 'Client-Side Concept Environment',
      paragraphs: [
        'This application runs entirely in your browser as a self-contained interactive demonstration.',
        'Information entered into the Demo Request dialog is validated locally in your browser to generate a copyable request summary or mailto draft—it is never transmitted to or stored on an external database.',
      ],
      bullets: [
        'Zero external form transmission or third-party tracking scripts.',
        'All workflow traces and payloads are illustrative local fixtures.',
      ],
    },
    social: {
      icon: Info,
      kicker: 'CONCEPT TEMPLATE LINK',
      title: 'External Profile Placeholder',
      paragraphs: [
        'Arc & Signal is a fictional enterprise product template. External social links (LinkedIn / GitHub) are configured as safe local placeholders rather than linking to unrelated third-party organizations.',
        'You can connect these links to your organization’s repositories or social profiles in FinalCTASection.tsx.',
      ],
      bullets: [
        'Contact placeholder: hello@arcandsignal.example',
        'Ready for custom domain and social profile configuration.',
      ],
    },
  };

  const item = contentMap[topic];
  const Icon = item.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060811]/85"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[#9DA7C7]/35 bg-[#11172A] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-[#171D32] border border-[#A58AFF]/40 flex items-center justify-center text-[#D4C9FF]">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A58AFF]">
                {item.kicker}
              </div>
              <h2
                id="info-modal-title"
                className="font-display text-xl font-bold text-[#F3F4FA]"
              >
                {item.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg border border-[#9DA7C7]/25 bg-[#171D32] p-2 text-[#9DA7C7] hover:text-[#F3F4FA] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3 text-sm text-[#9DA7C7] leading-relaxed mb-5">
          {item.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <ul className="rounded-xl bg-[#0C0F1B] border border-[#9DA7C7]/20 p-4 space-y-2 text-xs text-[#F3F4FA] mb-6">
          {item.bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#A58AFF] font-mono-tech">»</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#9DA7C7] hover:text-[#F3F4FA] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDemo();
            }}
            className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4FA] btn-signal-primary cursor-pointer"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/components/PlatformSection.tsx">
<![CDATA['use client';

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
]]>
    </file>
    <file path="src/app/(arcsignal)/arcsignal/utils/signalLogic.ts">
<![CDATA[export interface SignalAnchorPoint {
  id: string;
  x: number;
  y: number;
  /** Optional tangent direction vector (dx, dy) in document space */
  tangentX?: number;
  tangentY?: number;
}

export type CapabilityId = 'orchestrate' | 'route' | 'observe' | 'govern';

export type RouteModelId = 'model-1' | 'model-2' | 'model-3';

export type RoutingPreference = 'latency' | 'balance' | 'reasoning';

export type WorkflowStageId = 'trigger' | 'context' | 'plan' | 'execute' | 'review' | 'result';

export type WorkflowRunStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'awaiting_approval'
  | 'completed'
  | 'rejected';

export type StageStateBadge =
  | 'Active'
  | 'Pending'
  | 'Awaiting approval'
  | 'Completed'
  | 'Rejected';

export type ExperienceMode = 'booting' | 'idle' | 'routing' | 'executing' | 'converging';

export type VisibleSectionId = 'hero' | 'capabilities' | 'product' | 'cta';

export interface ExperienceState {
  mode: ExperienceMode;
  visibleSection: VisibleSectionId;
  activeCapability: CapabilityId;
  selectedModel: 0 | 1 | 2;
  demoStatus: WorkflowRunStatus;
  activeStage: number; // 0-5
  reducedMotion: boolean;
  syncPulseActive: boolean;
}

/**
 * Pure priority resolver for the page-wide ExperienceMode.
 * Priority rules:
 * 1. Initial boot window -> 'booting'
 * 2. Active user-driven workflow demo ('running' | 'paused' | 'awaiting_approval') -> 'executing'
 * 3. Recent route/capability/model interaction window -> 'routing'
 * 4. Viewing the Final CTA section when demo is not running -> 'converging'
 * 5. Otherwise -> 'idle'
 */
export function deriveExperienceMode(params: {
  isBooting: boolean;
  demoStatus: WorkflowRunStatus;
  isRoutingTransient: boolean;
  visibleSection: VisibleSectionId;
}): ExperienceMode {
  if (params.isBooting) return 'booting';
  if (
    params.demoStatus === 'running' ||
    params.demoStatus === 'paused' ||
    params.demoStatus === 'awaiting_approval'
  ) {
    return 'executing';
  }
  if (params.isRoutingTransient) return 'routing';
  if (params.visibleSection === 'cta') return 'converging';
  return 'idle';
}

export interface WorkflowStageSpec {
  id: WorkflowStageId;
  indexLabel: string;
  shortCode: string;
  title: string;
  subtitle: string;
  agentOrRole: string;
  modelConfig: string;
  durationMs: number;
  inputs: string[];
  tools: string[];
  policies: string[];
  traceLogs: { time: string; message: string }[];
  sampleInputPayload: string;
  sampleOutputPayload: string;
  routingRationale: string;
}

export const WORKFLOW_STAGES: WorkflowStageSpec[] = [
  {
    id: 'trigger',
    indexLabel: '01',
    shortCode: '01 / TRIGGER',
    title: 'Trigger',
    subtitle: 'New support request',
    agentOrRole: 'Ingress Gateway',
    modelConfig: 'DETERMINISTIC / SCHEMA_V2',
    durationMs: 42,
    inputs: ['Webhook payload: ticket_id #AS-8942', 'Customer tier: Enterprise Core', 'Channel: Priority API Ingress'],
    tools: ['Schema Validator', 'PII Redaction Filter', 'Deduplication Queue'],
    policies: ['Zero-retention PII scrubbing active', 'Rate limit: 250 req/sec verified'],
    traceLogs: [
      { time: '10:42:00', message: 'Ingress envelope validated' },
      { time: '10:42:00', message: 'PII redaction mask applied' },
      { time: '10:42:01', message: 'Context lookup dispatched' },
    ],
    sampleInputPayload: '{ "ticket": "AS-8942", "severity": "P1", "region": "eu-central" }',
    sampleOutputPayload: '{ "normalized_id": "req_01H9X", "sanitized": true, "next": "context" }',
    routingRationale: 'Deterministic schema gate requires zero LLM invocation; routed directly to knowledge indexer.',
  },
  {
    id: 'context',
    indexLabel: '02',
    shortCode: '02 / CONTEXT',
    title: 'Context',
    subtitle: 'Retrieve account knowledge',
    agentOrRole: 'Knowledge Retriever',
    modelConfig: 'EMBEDDING / HYBRID-VECTOR',
    durationMs: 118,
    inputs: ['Sanitized request req_01H9X', 'Account graph: Tenant #409', 'Recent incident history (30d)'],
    tools: ['Vector Index Query', 'Entitlements Graph', 'Telemetry Snapshot'],
    policies: ['Tenant boundary isolation enforced', 'Max context window: 16,384 tokens'],
    traceLogs: [
      { time: '10:42:01', message: 'Tenant #409 namespace mounted' },
      { time: '10:42:01', message: 'Retrieved 4 high-relevance runbooks' },
      { time: '10:42:02', message: 'Context bundle signed for planning' },
    ],
    sampleInputPayload: '{ "tenant": "409", "query_vector": "[0.021, -0.084, ...]" }',
    sampleOutputPayload: '{ "chunks_retrieved": 4, "confidence": 0.94, "bundle_id": "ctx_77B" }',
    routingRationale: 'Hybrid lexical + vector retrieval selected for sub-120ms grounding prior to reasoning stage.',
  },
  {
    id: 'plan',
    indexLabel: '03',
    shortCode: '03 / PLAN',
    title: 'Plan',
    subtitle: 'Reasoning agent',
    agentOrRole: 'Reasoning Agent',
    modelConfig: 'AUTO-ROUTED',
    durationMs: 640,
    inputs: ['Context bundle ctx_77B', 'SLA remediation constraints', 'Available tool manifest (6 tools)'],
    tools: ['Dependency Graph Planner', 'Cost & Latency Estimator', 'Policy Pre-check'],
    policies: ['Require human checkpoint for billing credits > $500', 'Deterministic JSON output schema'],
    traceLogs: [
      { time: '10:42:01', message: 'Agent initialized' },
      { time: '10:42:03', message: 'Executing plan' },
      { time: '10:42:04', message: 'Policy verified' },
      { time: '10:42:05', message: 'Action pending' },
    ],
    sampleInputPayload: '{ "context": "ctx_77B", "goal": "Diagnose EU webhook timeout & prepare remedy" }',
    sampleOutputPayload: '{ "steps": ["rebind_route", "issue_sla_credit"], "requires_review": true }',
    routingRationale: 'Multi-constraint root-cause analysis routed to Model B (Balanced) / Model C (Reasoning) per active routing policy.',
  },
  {
    id: 'execute',
    indexLabel: '04',
    shortCode: '04 / EXECUTE',
    title: 'Execute',
    subtitle: 'CRM + support tools',
    agentOrRole: 'Tool Execution Worker',
    modelConfig: 'MODEL B / BALANCED-TOOL',
    durationMs: 290,
    inputs: ['Execution graph plan_92A', 'Scoped OAuth token (read/staging)', 'Dry-run verification flag'],
    tools: ['CRM Case Updater', 'Endpoint Health Probe', 'SLA Credit Calculator'],
    policies: ['Sandboxed dry-run before commit', 'No destructive writes without review token'],
    traceLogs: [
      { time: '10:42:05', message: 'CRM staging draft created' },
      { time: '10:42:06', message: 'Endpoint health verified: 99.98%' },
      { time: '10:42:06', message: 'Staged action awaiting human gate' },
    ],
    sampleInputPayload: '{ "action": "stage_remediation", "dry_run": true }',
    sampleOutputPayload: '{ "crm_draft": "drf_301", "credit_staged": "$750.00", "gate": "review" }',
    routingRationale: 'Structured function-calling endpoint selected for low-latency tool orchestration.',
  },
  {
    id: 'review',
    indexLabel: '05',
    shortCode: '05 / REVIEW',
    title: 'Review',
    subtitle: 'Human approval',
    agentOrRole: 'Governance Checkpoint',
    modelConfig: 'HUMAN-IN-THE-LOOP GATE',
    durationMs: 0,
    inputs: ['Staged CRM draft drf_301', 'Proposed SLA adjustment ($750)', 'Reasoning audit trail'],
    tools: ['Approval Ledger', 'Cryptographic Sign-off', 'Diff Inspector'],
    policies: ['Mandatory human approval for tier-1 account mutations', 'Immutable audit log entry'],
    traceLogs: [
      { time: '10:42:07', message: 'Checkpoint triggered: Policy #GOV-04' },
      { time: '10:42:07', message: 'Operator notification dispatched' },
      { time: '10:42:08', message: 'Awaiting operator Approve / Reject' },
    ],
    sampleInputPayload: '{ "checkpoint": "GOV-04", "staged_diff": "+credit $750, +route_patch" }',
    sampleOutputPayload: '{ "decision": "PENDING_OPERATOR", "audit_hash": "0x9f8c...31a" }',
    routingRationale: 'Execution paused by Governance Policy #GOV-04 until operator explicitly approves or rejects.',
  },
  {
    id: 'result',
    indexLabel: '06',
    shortCode: '06 / RESULT',
    title: 'Result',
    subtitle: 'Resolution prepared',
    agentOrRole: 'Synthesis & Dispatch',
    modelConfig: 'MODEL A / FAST-SYNTHESIS',
    durationMs: 95,
    inputs: ['Signed approval token', 'Executed CRM record', 'Customer communication template'],
    tools: ['Response Synthesizer', 'Telemetry Emitter', 'Audit Archiver'],
    policies: ['Attach verifiable trace ID to response', 'Archive execution snapshot'],
    traceLogs: [
      { time: '10:42:09', message: 'Operator approval token verified' },
      { time: '10:42:09', message: 'Resolution dispatched to customer' },
      { time: '10:42:10', message: 'Pipeline completed in sync' },
    ],
    sampleInputPayload: '{ "approval": "SIGNED", "crm_commit": true }',
    sampleOutputPayload: '{ "status": "RESOLVED", "trace_id": "tr_AS_2026_099", "sync": "COMPLETE" }',
    routingRationale: 'Fast synthesis endpoint formats verified resolution summary with minimal tail latency.',
  },
];

/**
 * Generates a single mathematically continuous cubic Bezier SVG path (`M ... C ...`)
 * through an ordered list of document-space anchors, guaranteeing C0 and C1 continuity
 * at every interior join (zero kinks or disconnected jumps at section boundaries).
 */
export function buildContinuousSignalPath(anchors: SignalAnchorPoint[]): string {
  if (!anchors || anchors.length === 0) return '';
  if (anchors.length === 1) {
    const a = anchors[0];
    return `M ${round2(a.x)} ${round2(a.y)}`;
  }

  const tangents = computeAnchorTangents(anchors);

  let d = `M ${round2(anchors[0].x)} ${round2(anchors[0].y)}`;

  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[i];
    const p1 = anchors[i + 1];
    const t0 = tangents[i];
    const t1 = tangents[i + 1];

    const dist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
    const maxHandle = Math.max(24, dist * 0.48);

    const h0Len = Math.hypot(t0.x, t0.y) || 1;
    const h1Len = Math.hypot(t1.x, t1.y) || 1;

    const scale0 = h0Len > maxHandle ? maxHandle / h0Len : 1;
    const scale1 = h1Len > maxHandle ? maxHandle / h1Len : 1;

    const cp1x = p0.x + t0.x * scale0;
    const cp1y = p0.y + t0.y * scale0;
    const cp2x = p1.x - t1.x * scale1;
    const cp2y = p1.y - t1.y * scale1;

    d += ` C ${round2(cp1x)} ${round2(cp1y)}, ${round2(cp2x)} ${round2(cp2y)}, ${round2(p1.x)} ${round2(p1.y)}`;
  }

  return d;
}

/**
 * Builds a companion fiber-optic strand path offset laterally along the normal of each anchor tangent,
 * tapering to 0 offset at the start and end ports so all strands fuse cleanly into intake/output ports.
 */
export function buildParallelStrandPath(
  anchors: SignalAnchorPoint[],
  normalOffsetPx: number
): string {
  if (!anchors || anchors.length === 0) return '';
  if (anchors.length === 1) return buildContinuousSignalPath(anchors);

  const tangents = computeAnchorTangents(anchors);
  const shifted: SignalAnchorPoint[] = anchors.map((pt, i) => {
    // Taper offset at start and end ports so strands merge into the physical port collar
    const endTaper = i === 0 || i === anchors.length - 1 ? 0.15 : i % 2 === 0 ? 1 : -0.75;
    const t = tangents[i];
    const len = Math.hypot(t.x, t.y) || 1;
    const nx = -t.y / len;
    const ny = t.x / len;
    const offset = normalOffsetPx * endTaper;
    return {
      ...pt,
      x: pt.x + nx * offset,
      y: pt.y + ny * offset,
    };
  });

  return buildContinuousSignalPath(shifted);
}

function computeAnchorTangents(anchors: SignalAnchorPoint[]): { x: number; y: number }[] {
  return anchors.map((pt, i) => {
    if (typeof pt.tangentX === 'number' && typeof pt.tangentY === 'number') {
      return { x: pt.tangentX, y: pt.tangentY };
    }
    if (i === 0) {
      const next = anchors[1];
      return { x: (next.x - pt.x) * 0.35, y: (next.y - pt.y) * 0.35 };
    }
    if (i === anchors.length - 1) {
      const prev = anchors[i - 1];
      return { x: (pt.x - prev.x) * 0.35, y: (pt.y - prev.y) * 0.35 };
    }
    const prev = anchors[i - 1];
    const next = anchors[i + 1];
    const dx = (next.x - prev.x) * 0.28;
    const dy = (next.y - prev.y) * 0.28;
    return { x: dx, y: dy };
  });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Pure state machine transition for the Customer Resolution Pipeline simulation.
 * Ensures that advancing from EXECUTE pauses at REVIEW (`awaiting_approval`),
 * and only an explicit `approve` advances to RESULT (`completed`), while `reject`
 * transitions to `rejected` (never falsely completing).
 */
export interface PipelineSimulationState {
  status: WorkflowRunStatus;
  activeStageIndex: number; // 0..5
}

export type PipelineAction =
  | { type: 'RUN' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'STEP_TICK' }
  | { type: 'APPROVE' }
  | { type: 'REJECT' };

export function transitionPipelineState(
  state: PipelineSimulationState,
  action: PipelineAction
): PipelineSimulationState {
  switch (action.type) {
    case 'RUN': {
      if (state.status === 'completed' || state.status === 'rejected') {
        return { status: 'running', activeStageIndex: 0 };
      }
      if (state.status === 'awaiting_approval') {
        return state;
      }
      return {
        status: 'running',
        activeStageIndex: state.status === 'idle' ? 0 : state.activeStageIndex,
      };
    }
    case 'PAUSE': {
      if (state.status === 'running') {
        return { ...state, status: 'paused' };
      }
      return state;
    }
    case 'RESET': {
      return { status: 'idle', activeStageIndex: 2 }; // Default selected stage is 03 / PLAN (index 2)
    }
    case 'STEP_TICK': {
      if (state.status !== 'running') return state;
      const nextIndex = state.activeStageIndex + 1;
      // Index 4 is 05 / REVIEW — must pause and request human action!
      if (nextIndex === 4) {
        return { status: 'awaiting_approval', activeStageIndex: 4 };
      }
      if (nextIndex >= 5) {
        return { status: 'completed', activeStageIndex: 5 };
      }
      return { status: 'running', activeStageIndex: nextIndex };
    }
    case 'APPROVE': {
      if (state.status !== 'awaiting_approval') return state;
      return { status: 'completed', activeStageIndex: 5 };
    }
    case 'REJECT': {
      if (state.status !== 'awaiting_approval') return state;
      return { status: 'rejected', activeStageIndex: 4 };
    }
    default:
      return state;
  }
}

/**
 * Computes the semantic badge for any stage index (0..5) given the current pipeline simulation state.
 */
export function getStageBadge(
  stageIndex: number,
  sim: PipelineSimulationState
): StageStateBadge {
  if (sim.status === 'idle') {
    if (stageIndex < sim.activeStageIndex) return 'Completed';
    if (stageIndex === sim.activeStageIndex) return 'Active';
    return 'Pending';
  }
  if (sim.status === 'rejected') {
    if (stageIndex < 4) return 'Completed';
    if (stageIndex === 4) return 'Rejected';
    return 'Pending';
  }
  if (sim.status === 'completed') {
    return 'Completed';
  }
  if (sim.status === 'awaiting_approval') {
    if (stageIndex < 4) return 'Completed';
    if (stageIndex === 4) return 'Awaiting approval';
    return 'Pending';
  }
  // running or paused
  if (stageIndex < sim.activeStageIndex) return 'Completed';
  if (stageIndex === sim.activeStageIndex) return 'Active';
  return 'Pending';
}

/**
 * Maps a routing preference ('latency' | 'balance' | 'reasoning') to the recommended model endpoint.
 */
export function getModelForPreference(pref: RoutingPreference): {
  modelId: RouteModelId;
  endpointName: string;
  badge: string;
  latencyLabel: string;
  rationale: string;
} {
  switch (pref) {
    case 'latency':
      return {
        modelId: 'model-1',
        endpointName: 'Model A — Fast',
        badge: 'SUB-80MS STREAM',
        latencyLabel: '64 ms avg (sample)',
        rationale:
          'Routes high-volume classification and synthesis tasks to compact low-latency endpoints with deterministic schema enforcement.',
      };
    case 'reasoning':
      return {
        modelId: 'model-3',
        endpointName: 'Model C — Reasoning',
        badge: 'DEEP VERIFICATION',
        latencyLabel: '820 ms avg (sample)',
        rationale:
          'Allocates multi-step chain-of-thought and policy-sensitive root-cause diagnostics to high-depth reasoning models.',
      };
    case 'balance':
    default:
      return {
        modelId: 'model-2',
        endpointName: 'Model B — Balanced',
        badge: 'OPTIMAL EQUILIBRIUM',
        latencyLabel: '240 ms avg (sample)',
        rationale:
          'Balances structured tool invocation accuracy with responsive latency for multi-agent orchestration pipelines.',
      };
  }
}

export interface DemoRequestInput {
  name: string;
  email: string;
  company: string;
  objective: string;
}

export interface DemoValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof DemoRequestInput, string>>;
}

export function validateDemoRequest(input: DemoRequestInput): DemoValidationResult {
  const errors: Partial<Record<keyof DemoRequestInput, string>> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid work email address.';
  }
  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Please enter your team or company name.';
  }
  if (!input.objective || input.objective.trim().length < 8) {
    errors.objective = 'Briefly describe what you would like to orchestrate (at least 8 characters).';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Scene 2 — Maps normalized Control Plane scroll progress [0..1] to the 4 capability modules:
 * 0.00 - 0.25 -> 'orchestrate'
 * 0.25 - 0.50 -> 'route'
 * 0.50 - 0.75 -> 'observe'
 * 0.75 - 1.00 -> 'govern'
 */
export function getScrollCapabilityForProgress(progress: number): CapabilityId {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped < 0.25) return 'orchestrate';
  if (clamped < 0.5) return 'route';
  if (clamped < 0.75) return 'observe';
  return 'govern';
}

/**
 * Scene 3 — Maps normalized Platform section scroll progress [0..1] to stage index 0..5
 * for reversible scroll-scrubbed preview when the interactive demo is idle.
 */
export function getScrollStageForProgress(progress: number): number {
  const clamped = Math.min(0.9999, Math.max(0, progress));
  return Math.floor(clamped * WORKFLOW_STAGES.length);
}

/**
 * Scene 4 — Maps normalized Convergence Reactor scroll progress [0..1] to 1..5 connected streams.
 */
export function getConvergedStreamCount(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  if (clamped < 0.18) return 1;
  if (clamped < 0.36) return 2;
  if (clamped < 0.54) return 3;
  if (clamped < 0.72) return 4;
  return 5;
}

export interface AmbientFieldInput {
  scrollProgress: number;
  selectedCapability: CapabilityId;
  activeStageIndex: number;
  demoStatus: WorkflowRunStatus;
  ctaScrollProgress: number;
  reducedMotion?: boolean;
}

export interface AmbientFieldState {
  focusXPercent: number;
  focusYPercent: number;
  secondaryXPercent: number;
  secondaryYPercent: number;
  fieldIntensity: number;
  gridOpacity: number;
  heroWeight: number;
  controlPlaneWeight: number;
  platformWeight: number;
  convergenceWeight: number;
  footerWeight: number;
  ghostPacketSpeed: number;
  ghostPacketsPaused: boolean;
}

/**
 * Computes continuous, reversible Living Signal Field parameters across the entire document
 * without abrupt section resets or hard boundaries.
 * Keeps the left editorial headline zones dark (<40% X) and shifts illumination
 * smoothly across the right-hand orchestration structures.
 */
export function computeAmbientFieldState(input: AmbientFieldInput): AmbientFieldState {
  const p = Math.min(1, Math.max(0, input.scrollProgress));

  // Smooth bell/ramp weights for each scene along the document scroll [0..1]
  const smoothstep = (edge0: number, edge1: number, x: number): number => {
    const t = Math.min(1, Math.max(0, (x - edge0) / Math.max(0.0001, edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const heroWeight = 1 - smoothstep(0.08, 0.32, p);
  const controlPlaneWeight =
    smoothstep(0.12, 0.28, p) * (1 - smoothstep(0.46, 0.62, p));
  const platformWeight =
    smoothstep(0.42, 0.56, p) * (1 - smoothstep(0.74, 0.86, p));
  const convergenceWeight =
    smoothstep(0.7, 0.84, p) * (1 - smoothstep(0.93, 0.995, p));
  const footerWeight = smoothstep(0.9, 1.0, p);

  // Capability module local bias inside 01 / Control Plane (always in the right-hand matrix zone)
  const capOffset =
    input.selectedCapability === 'orchestrate'
      ? { dx: -7, dy: -8 }
      : input.selectedCapability === 'route'
      ? { dx: 9, dy: -8 }
      : input.selectedCapability === 'observe'
      ? { dx: -7, dy: 9 }
      : { dx: 9, dy: 9 };

  // Workflow stage horizontal shift inside 02 / Inside the Platform (stages 0..5)
  const clampedStage = Math.min(5, Math.max(0, input.activeStageIndex));
  const stageDx = ((clampedStage - 2.5) / 2.5) * 9;

  // Continuous focal center interpolation (kept in right 56%..82% zone so left headlines stay dark)
  const baseFocusX =
    heroWeight * 71 +
    controlPlaneWeight * (69 + capOffset.dx) +
    platformWeight * (68 + stageDx) +
    convergenceWeight * 70 +
    footerWeight * 58;

  const baseFocusY =
    heroWeight * 42 +
    controlPlaneWeight * (48 + capOffset.dy) +
    platformWeight * 52 +
    convergenceWeight * 46 +
    footerWeight * 76;

  const focusXPercent = Math.min(86, Math.max(52, baseFocusX));
  const focusYPercent = Math.min(84, Math.max(28, baseFocusY));

  const secondaryXPercent = Math.min(88, Math.max(48, focusXPercent + 8 - p * 12));
  const secondaryYPercent = Math.min(88, Math.max(24, focusYPercent + 14 - p * 8));

  // Field intensity: wakes in hero, organizes in control plane, responds to simulator in platform,
  // peaks gently at reactor convergence, and subsides in the footer.
  const simBoost =
    input.demoStatus === 'running'
      ? 0.08
      : input.demoStatus === 'awaiting_approval'
      ? 0.05
      : 0;
  const streamCount = getConvergedStreamCount(input.ctaScrollProgress);
  const convergenceBoost = convergenceWeight * (streamCount / 5) * 0.09;

  const rawIntensity =
    0.34 * heroWeight +
    0.36 * controlPlaneWeight +
    (0.35 + simBoost) * platformWeight +
    (0.41 + convergenceBoost) * convergenceWeight +
    0.18 * footerWeight;

  const fieldIntensity = Number(Math.min(0.56, Math.max(0.16, rawIntensity)).toFixed(3));

  // Selective technical grid opacity: never dominant; slightly more legible in Control Plane & Platform,
  // quieter in Hero & Convergence, and very quiet in Footer.
  const rawGridOpacity =
    0.095 * heroWeight +
    0.125 * controlPlaneWeight +
    0.135 * platformWeight +
    0.09 * convergenceWeight +
    0.055 * footerWeight;

  const gridOpacity = Number(Math.min(0.16, Math.max(0.04, rawGridOpacity)).toFixed(3));

  const ghostPacketsPaused = Boolean(
    input.reducedMotion ||
      input.demoStatus === 'paused' ||
      input.demoStatus === 'rejected'
  );

  const ghostPacketSpeed = ghostPacketsPaused
    ? 0
    : input.demoStatus === 'running'
    ? 1.35
    : 1.0 + convergenceWeight * 0.25;

  return {
    focusXPercent: Number(focusXPercent.toFixed(2)),
    focusYPercent: Number(focusYPercent.toFixed(2)),
    secondaryXPercent: Number(secondaryXPercent.toFixed(2)),
    secondaryYPercent: Number(secondaryYPercent.toFixed(2)),
    fieldIntensity,
    gridOpacity,
    heroWeight: Number(heroWeight.toFixed(3)),
    controlPlaneWeight: Number(controlPlaneWeight.toFixed(3)),
    platformWeight: Number(platformWeight.toFixed(3)),
    convergenceWeight: Number(convergenceWeight.toFixed(3)),
    footerWeight: Number(footerWeight.toFixed(3)),
    ghostPacketSpeed: Number(ghostPacketSpeed.toFixed(2)),
    ghostPacketsPaused,
  };
}


]]>
    </file>
  </files>
</template>
