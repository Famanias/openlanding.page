'use client';

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
