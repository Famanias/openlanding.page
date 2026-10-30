'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  CHAPTERS,
  CameraRigState,
  computeGravitationalRedshift,
  computeTimeDilation,
  getChapter5CalloutPins,
  interpolateTimelineState,
  projectWorldToScreen,
} from '../physics/geodesicMath';
import { BlackHoleCanvas } from './BlackHoleCanvas';
import { HoldInspector, InspectOverrideValues } from './HoldInspector';
import { ActivePhotonPulse, SlingshotOverlay } from './SlingshotOverlay';
import { ObservationConsole } from './ObservationConsole';
import { initMasterScrollTimeline, ScrollControllerHandle } from '../scroll/timeline';
import { gravitationalAudio } from '../audio/gravitationalAudio';

const Volume2Icon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeXIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);

export const Experience: React.FC = () => {
  const initialRig = interpolateTimelineState(0.0);
  const [liveRig, setLiveRig] = useState<CameraRigState>(initialRig);
  const [isInspectLocked, setIsInspectLocked] = useState(false);
  const [hasUsedInspect, setHasUsedInspect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isHeaderSettled, setIsHeaderSettled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollCtrlRef = useRef<ScrollControllerHandle | null>(null);
  const rigRef = useRef<CameraRigState>(initialRig);
  const settleTimerRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0);
  const inspectRef = useRef<InspectOverrideValues>({
    active: false,
    yawDelta: 0,
    targetPitch: null,
    lensingMass: 1.5,
    diskOpacity: 1.0,
  });
  const pulseRef = useRef<ActivePhotonPulse>({
    active: false,
    worldPos: { x: 0, y: 0, z: 0 },
  });
  const polarJetPulseRef = useRef<number>(0);

  const wakeNarrativeHeader = () => {
    setIsHeaderSettled(false);
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      setIsHeaderSettled(true);
    }, 3500);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-perigee-mode', 'experience');
    wakeNarrativeHeader();
    return () => {
      document.documentElement.removeAttribute('data-perigee-mode');
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  // Initialize GSAP ScrollTrigger + Lenis timeline
  useEffect(() => {
    if (!scrollTrackRef.current) return;
    const ctrl = initMasterScrollTimeline(scrollTrackRef.current, {
      onProgress: (progress) => {
        if (Math.abs(progress - lastProgressRef.current) > 0.0005) {
          lastProgressRef.current = progress;
          wakeNarrativeHeader();
        }
        const nextRig = interpolateTimelineState(progress);
        rigRef.current = nextRig;
        setLiveRig((prev) => ({
          ...nextRig,
          lensingMass: inspectRef.current.active ? inspectRef.current.lensingMass : prev.lensingMass,
        }));
      },
      getIsLocked: () => inspectRef.current.active,
    });
    scrollCtrlRef.current = ctrl;

    return () => {
      ctrl.destroy();
      scrollCtrlRef.current = null;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (inspectRef.current.active) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        wakeNarrativeHeader();
        scrollCtrlRef.current?.stepChapter(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        wakeNarrativeHeader();
        scrollCtrlRef.current?.stepChapter(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInspectChange = (nextInspect: InspectOverrideValues) => {
    inspectRef.current = nextInspect;
    setIsInspectLocked(nextInspect.active);
    scrollCtrlRef.current?.setLocked(nextInspect.active);
  };

  const handleToggleSound = () => {
    const enabled = gravitationalAudio.toggleMute();
    setSoundEnabled(enabled);
  };

  const activeChapter = CHAPTERS[liveRig.chapterIndex] || CHAPTERS[0];
  const redshiftZ = computeGravitationalRedshift(liveRig.r);
  const timeDilationGamma = computeTimeDilation(liveRig.r);
  const aspect =
    typeof window !== 'undefined' ? window.innerWidth / Math.max(1, window.innerHeight) : 16 / 9;

  const ch5Callouts =
    activeChapter.id === 5 && !isInspectLocked
      ? getChapter5CalloutPins(liveRig).map((pin) => ({
          ...pin,
          screen: projectWorldToScreen(pin.worldPos, liveRig, aspect),
        }))
      : [];

  const isHeaderDimmed = isHeaderSettled && !isHeaderHovered;

  return (
    <div
      id="perigee-experience-root"
      data-chapter={activeChapter.id}
      data-inspect-locked={isInspectLocked ? 'true' : 'false'}
      className="relative min-h-screen bg-black text-[#f6f1ea] selection:bg-[#ffb36b]/30"
    >
      {/* 1. Fixed Full-Viewport WebGL Raymarched Schwarzschild Black Hole Canvas */}
      <BlackHoleCanvas
        rigRef={rigRef}
        inspectRef={inspectRef}
        pulseRef={pulseRef}
        polarJetPulseRef={polarJetPulseRef}
        onDampedRigUpdate={(dampedRig) => setLiveRig(dampedRig)}
      />

      {/* 2. Invisible Tall Scroll Track Driving Master GSAP Timeline (0 -> 1 across 6 chapters) */}
      <div
        ref={scrollTrackRef}
        aria-hidden="true"
        className="relative w-full h-[600vh] pointer-events-none"
      />

      {/* 3. Austere Astrophysics Instrument Overlay */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-4 pointer-events-none bg-gradient-to-b from-black/80 via-black/35 to-transparent">
        {/* Top-left: small "PERIGEE" wordmark and live Schwarzschild radial distance readout */}
        <div className="flex flex-wrap items-center gap-4 pointer-events-auto bg-black/70 border border-[#f6f1ea]/15 px-3.5 py-1.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              wakeNarrativeHeader();
              scrollCtrlRef.current?.scrollToChapter(0);
            }}
            className="text-sm font-semibold tracking-[0.22em] uppercase text-[#f6f1ea] whitespace-nowrap shrink-0"
          >
            PERIGEE
          </a>
          <span className="text-[#f6f1ea]/25" aria-hidden="true">
            |
          </span>
          <div
            data-testid="telemetry-readout"
            className="text-xs font-mono-tech text-[#f6f1ea]/90 tracking-wide whitespace-nowrap"
          >
            <span>r = {liveRig.r.toFixed(2)} Rs</span>
            <span className="mx-2 text-[#f6f1ea]/30">|</span>
            <span>z = {redshiftZ.toFixed(3)}</span>
            <span className="hidden sm:inline mx-2 text-[#f6f1ea]/30">|</span>
            <span className="hidden sm:inline text-[#ffb36b]">
              γ = {timeDilationGamma.toFixed(2)}×
            </span>
          </div>
        </div>

        {/* Top-right: Synthesized Web Audio API gravitational drone + Geiger photon click toggle */}
        <div className="pointer-events-auto">
          <button
            type="button"
            aria-label={soundEnabled ? 'Mute gravitational telemetry audio' : 'Enable gravitational telemetry audio'}
            aria-pressed={soundEnabled}
            onClick={handleToggleSound}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech border border-[#f6f1ea]/15 bg-black/85 text-[#f6f1ea]/90 hover:border-[#ffb36b]/60 hover:text-[#f6f1ea] transition-colors cursor-pointer whitespace-nowrap"
          >
            {soundEnabled ? (
              <>
                <Volume2Icon className="w-3.5 h-3.5 text-[#ffb36b]" />
                <span>AUDIO TELEMETRY ON</span>
              </>
            ) : (
              <>
                <VolumeXIcon className="w-3.5 h-3.5 text-[#f6f1ea]/50" />
                <span>AUDIO MUTED</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 4. Upper-Center Auto-Dimming Observatory Header Below Top Telemetry Bar */}
      <main
        data-testid="upper-center-narrative-header"
        data-header-dimmed={isHeaderDimmed ? 'true' : 'false'}
        onPointerEnter={() => setIsHeaderHovered(true)}
        onPointerLeave={() => setIsHeaderHovered(false)}
        className={`fixed top-16 left-1/2 -translate-x-1/2 z-20 w-[calc(100vw-2rem)] max-w-xl transition-opacity duration-500 ${
          isInspectLocked
            ? 'opacity-10 pointer-events-none'
            : isHeaderDimmed
            ? 'opacity-25 hover:opacity-100 pointer-events-auto'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className="bg-black/80 border border-[#f6f1ea]/15 px-5 py-3 text-center">
          <div className="text-[11px] font-mono-tech text-[#ffb36b] tracking-widest uppercase mb-1">
            {activeChapter.subtitle}
          </div>

          {activeChapter.headline ? (
            <div className="mb-1">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#f6f1ea] leading-none">
                {activeChapter.headline}
              </h1>
              <p className="font-editorial italic text-sm md:text-base text-[#f6f1ea]/80 mt-0.5">
                At the edge of curved spacetime.
              </p>
            </div>
          ) : (
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#f6f1ea] mb-1 text-balance">
              {activeChapter.title}
            </h1>
          )}

          <p
            data-testid="chapter-narrative-copy"
            className="text-xs md:text-sm text-[#f6f1ea]/90 leading-relaxed max-w-lg mx-auto text-balance"
          >
            {activeChapter.copy}
          </p>
        </div>
      </main>

      {/* 5. Chapter 5 Anatomical Callout Labels (Event Horizon, Photon Sphere, ISCO, Secondary Image) */}
      {activeChapter.id === 5 && !isInspectLocked && (
        <div
          data-testid="chapter-5-callouts"
          className="fixed inset-0 z-20 pointer-events-none"
        >
          {ch5Callouts.map((callout) => (
            <div
              key={callout.id}
              style={{
                left: `${(callout.screen.x * 100).toFixed(2)}%`,
                top: `${(callout.screen.y * 100).toFixed(2)}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="fixed flex items-center gap-2.5"
            >
              <span className="w-2 h-2 bg-[#ffb36b] shrink-0" />
              <div className="bg-black/85 border border-[#f6f1ea]/20 px-3 py-1.5">
                <div className="text-xs font-medium text-[#f6f1ea] whitespace-nowrap">
                  {callout.label}
                </div>
                <div className="text-[11px] font-mono-tech text-[#ffb36b] whitespace-nowrap">
                  {callout.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Hold-to-Inspect Singularity Lensing Inspector (Chapters 1, 3, and 5) */}
      <HoldInspector
        rig={liveRig}
        inspectableChapter={activeChapter.inspectable}
        isInspectLocked={isInspectLocked}
        onInspectChange={handleInspectChange}
        hasUsedInspect={hasUsedInspect}
        onMarkUsed={() => setHasUsedInspect(true)}
      />

      {/* 7. Signature Interaction in Chapter 4: Geodesic Slingshot Launcher */}
      <SlingshotOverlay
        rig={liveRig}
        active={activeChapter.id === 4 && !isInspectLocked}
        onPulseUpdate={(pulse) => {
          pulseRef.current = pulse;
        }}
      />

      {/* 8. Chapter 6: Polar Escape Observation Window / Telemetry Feed Console */}
      <ObservationConsole
        visible={activeChapter.id === 6 && !isInspectLocked}
        onFirePolarPulse={() => {
          polarJetPulseRef.current = 1.0;
        }}
      />

      {/* 9. Bottom-left Chapter Marker & Stepper Navigation */}
      <footer className="fixed bottom-6 left-6 md:left-10 z-30 flex flex-wrap items-center gap-4 pointer-events-auto">
        <div
          data-testid="chapter-marker"
          className="px-3.5 py-2 bg-black/85 border border-[#f6f1ea]/15 text-xs font-mono-tech text-[#f6f1ea] tracking-wider whitespace-nowrap"
        >
          {activeChapter.numberLabel} — {activeChapter.title}
        </div>

        <nav aria-label="Chapter Trajectory Navigation" className="flex items-center gap-1">
          {CHAPTERS.map((ch, idx) => {
            const isCurrent = idx === liveRig.chapterIndex;
            return (
              <button
                key={ch.id}
                type="button"
                aria-label={`Chapter ${ch.numberLabel}: ${ch.title}`}
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => {
                  wakeNarrativeHeader();
                  scrollCtrlRef.current?.scrollToChapter(idx);
                }}
                className={`px-2.5 py-2 text-xs font-mono-tech border transition-colors cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#f6f1ea] text-black border-[#f6f1ea] font-medium'
                    : 'bg-black/80 text-[#f6f1ea]/60 border-[#f6f1ea]/15 hover:text-[#f6f1ea] hover:border-[#f6f1ea]/40'
                }`}
              >
                {ch.numberLabel}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
};
