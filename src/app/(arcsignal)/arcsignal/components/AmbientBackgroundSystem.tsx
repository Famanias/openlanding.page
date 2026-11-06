'use client';

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
