'use client';

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
