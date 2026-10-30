"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  CameraRigState,
  Vec3,
  computeGeodesicTrajectory,
  projectWorldToScreen,
  screenDragToLaunchRay,
} from '../physics/geodesicMath';
import { gravitationalAudio } from '../audio/gravitationalAudio';

export interface ActivePhotonPulse {
  active: boolean;
  worldPos: Vec3;
}

interface SlingshotOverlayProps {
  rig: CameraRigState;
  active: boolean; // True when in Chapter 4 (The Photon Sphere)
  onPulseUpdate: (pulse: ActivePhotonPulse) => void;
}

interface LaunchedGeodesicRecord {
  id: number;
  points: Vec3[];
  outcome: 'CAPTURED' | 'SLINGSHOT' | 'DEFLECTED';
  impactParameterB: number;
  minRadius: number;
  headIndex: number;
}

export const SlingshotOverlay: React.FC<SlingshotOverlayProps> = ({
  rig,
  active,
  onPulseUpdate,
}) => {
  const [dragState, setDragState] = useState<{
    startX: number;
    startY: number;
    currX: number;
    currY: number;
    impactB: number;
    previewPoints: Vec3[];
    previewOutcome: 'CAPTURED' | 'SLINGSHOT' | 'DEFLECTED';
  } | null>(null);

  const [trails, setTrails] = useState<LaunchedGeodesicRecord[]>([]);
  const animRafRef = useRef<number | null>(null);
  const nextIdRef = useRef(1);

  const aspect =
    typeof window !== 'undefined' ? window.innerWidth / Math.max(1, window.innerHeight) : 16 / 9;

  // Animate active photon pulse along the most recently launched trajectory
  useEffect(() => {
    if (trails.length === 0) {
      onPulseUpdate({ active: false, worldPos: { x: 0, y: 0, z: 0 } });
      return;
    }

    const latest = trails[trails.length - 1];
    if (latest.headIndex >= latest.points.length - 1) {
      onPulseUpdate({ active: false, worldPos: { x: 0, y: 0, z: 0 } });
      return;
    }

    const timer = window.setTimeout(() => {
      setTrails((prev) =>
        prev.map((tr, idx) => {
          if (idx !== prev.length - 1) return tr;
          const nextIdx = Math.min(tr.points.length - 1, tr.headIndex + 4);
          const pt = tr.points[nextIdx];
          onPulseUpdate({
            active: nextIdx < tr.points.length - 1,
            worldPos: pt,
          });
          return { ...tr, headIndex: nextIdx };
        })
      );
    }, 28);

    return () => window.clearTimeout(timer);
  }, [trails]);

  useEffect(() => {
    return () => {
      if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current);
    };
  }, []);

  if (!active) return null;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const normX = e.clientX / Math.max(1, window.innerWidth);
    const normY = e.clientY / Math.max(1, window.innerHeight);

    const { launchOrigin, launchDir, impactParameterB } = screenDragToLaunchRay(
      normX,
      normY,
      0,
      0,
      rig,
      aspect
    );
    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);

    setDragState({
      startX: e.clientX,
      startY: e.clientY,
      currX: e.clientX,
      currY: e.clientY,
      impactB: impactParameterB,
      previewPoints: sim.points,
      previewOutcome: sim.outcome,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState) return;
    const normStartX = dragState.startX / Math.max(1, window.innerWidth);
    const normStartY = dragState.startY / Math.max(1, window.innerHeight);
    const normDx = (e.clientX - dragState.startX) / Math.max(1, window.innerWidth);
    const normDy = (e.clientY - dragState.startY) / Math.max(1, window.innerHeight);

    const { launchOrigin, launchDir, impactParameterB } = screenDragToLaunchRay(
      normStartX,
      normStartY,
      normDx,
      normDy,
      rig,
      aspect
    );
    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);

    setDragState({
      ...dragState,
      currX: e.clientX,
      currY: e.clientY,
      impactB: impactParameterB,
      previewPoints: sim.points,
      previewOutcome: sim.outcome,
    });
  };

  const handlePointerUp = () => {
    if (!dragState) return;
    const normStartX = dragState.startX / Math.max(1, window.innerWidth);
    const normStartY = dragState.startY / Math.max(1, window.innerHeight);
    const normDx = (dragState.currX - dragState.startX) / Math.max(1, window.innerWidth);
    const normDy = (dragState.currY - dragState.startY) / Math.max(1, window.innerHeight);

    const { launchOrigin, launchDir } = screenDragToLaunchRay(
      normStartX,
      normStartY,
      normDx,
      normDy,
      rig,
      aspect
    );
    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);

    gravitationalAudio.triggerGeodesicLaunch(sim.impactParameterB);

    const newRecord: LaunchedGeodesicRecord = {
      id: nextIdRef.current++,
      points: sim.points,
      outcome: sim.outcome,
      impactParameterB: sim.impactParameterB,
      minRadius: sim.minRadius,
      headIndex: 0,
    };

    setTrails((prev) => [...prev.slice(-3), newRecord]);
    setDragState(null);
  };

  const launchPresetGeodesic = (presetType: 'SLINGSHOT' | 'CAPTURED' | 'DEFLECTED') => {
    // Construct launch origin at r ~ 4.2 Rs in camera frame so all 3 regimes are clearly visible
    const dx = rig.camTarget.x - rig.camPos.x;
    const dy = rig.camTarget.y - rig.camPos.y;
    const dz = rig.camTarget.z - rig.camPos.z;
    const fLen = Math.hypot(dx, dy, dz) || 1;
    const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };
    const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
    const rx = worldUp.y * fw.z - worldUp.z * fw.y;
    const ry = worldUp.z * fw.x - worldUp.x * fw.z;
    const rz = worldUp.x * fw.y - worldUp.y * fw.x;
    const rLen = Math.hypot(rx, ry, rz) || 1;
    const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

    // Back up along -fw to r = 5.0 Rs for a dramatic full-screen trajectory arc
    const launchOrigin = {
      x: -fw.x * 5.0 - rt.x * 0.4,
      y: 0.25,
      z: -fw.z * 5.0 - rt.z * 0.4,
    };

    const lateralFactor =
      presetType === 'CAPTURED' ? 0.18 : presetType === 'SLINGSHOT' ? 0.78 : 1.18;

    const launchDir = {
      x: fw.x + rt.x * lateralFactor,
      y: presetType === 'SLINGSHOT' ? 0.08 : -0.03,
      z: fw.z + rt.z * lateralFactor,
    };

    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);
    gravitationalAudio.triggerGeodesicLaunch(sim.impactParameterB);

    const newRecord: LaunchedGeodesicRecord = {
      id: nextIdRef.current++,
      points: sim.points,
      outcome: sim.outcome,
      impactParameterB: sim.impactParameterB,
      minRadius: sim.minRadius,
      headIndex: 0,
    };

    setTrails((prev) => [...prev.slice(-3), newRecord]);
  };

  const buildSvgPath = (pts: Vec3[], limitIdx?: number): string => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const h = typeof window !== 'undefined' ? window.innerHeight : 900;
    const maxI = limitIdx !== undefined ? Math.min(limitIdx, pts.length) : pts.length;
    let d = '';
    for (let i = 0; i < maxI; i++) {
      const p2d = projectWorldToScreen(pts[i], rig, aspect);
      if (p2d.depth <= 0.05) continue;
      const sx = p2d.x * w;
      const sy = p2d.y * h;
      d += d === '' ? `M ${sx.toFixed(1)} ${sy.toFixed(1)}` : ` L ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    }
    return d;
  };

  const latestTrail = trails.length > 0 ? trails[trails.length - 1] : null;

  return (
    <div
      data-testid="slingshot-launcher-surface"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="fixed inset-0 z-20 cursor-crosshair select-none"
    >
      {/* 3D Projected Geodesic Ribbon Trails */}
      <svg className="w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="geodesicRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e6f0ff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ffb36b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Preview Reticle & Geodesic Curve While Dragging */}
        {dragState && (
          <>
            <line
              x1={dragState.startX}
              y1={dragState.startY}
              x2={dragState.currX}
              y2={dragState.currY}
              stroke="rgba(246, 241, 234, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <circle
              cx={dragState.startX}
              cy={dragState.startY}
              r="6"
              fill="none"
              stroke="#ffb36b"
              strokeWidth="1.5"
            />
            <path
              d={buildSvgPath(dragState.previewPoints)}
              fill="none"
              stroke="#ffb36b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.75"
            />
          </>
        )}

        {/* Active Launched 3D Geodesic Trails */}
        {trails.map((tr) => {
          const pathD = buildSvgPath(tr.points, tr.headIndex + 1);
          const headPt = tr.points[Math.min(tr.headIndex, tr.points.length - 1)];
          const headScreen = projectWorldToScreen(headPt, rig, aspect);
          const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
          const h = typeof window !== 'undefined' ? window.innerHeight : 900;

          return (
            <g key={tr.id}>
              <path
                d={pathD}
                fill="none"
                stroke="url(#geodesicRibbonGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {headScreen.visible && (
                <circle
                  cx={headScreen.x * w}
                  cy={headScreen.y * h}
                  r="4.5"
                  fill="#e6f0ff"
                  stroke="#ffb36b"
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Live Reticle Impact Parameter Readout While Dragging */}
      {dragState && (
        <div
          style={{
            left: `${dragState.currX + 16}px`,
            top: `${dragState.currY - 16}px`,
          }}
          className="fixed pointer-events-none bg-black/90 border border-[#f6f1ea]/20 px-3 py-1.5 text-xs font-mono-tech"
        >
          <div className="text-[#f6f1ea]">
            b = {dragState.impactB.toFixed(2)} Rs
          </div>
          <div className="text-[#ffb36b]">
            PREDICTED: {dragState.previewOutcome}
          </div>
        </div>
      )}

      {/* Compact Geodesic Slingshot Telemetry & Calibration Controls */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="fixed bottom-20 right-6 md:right-10 pointer-events-auto bg-black/85 border border-[#f6f1ea]/15 p-4 max-w-xs text-xs"
      >
        <div className="font-mono-tech text-[#ffb36b] tracking-wider uppercase mb-1">
          Geodesic Slingshot Launcher
        </div>
        <p className="text-[#f6f1ea]/70 leading-relaxed mb-3">
          Click and drag anywhere in space to fire a luminous test photon into the Schwarzschild potential, or trigger a calibrated impact parameter:
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            type="button"
            onClick={() => launchPresetGeodesic('SLINGSHOT')}
            className="px-2.5 py-1.5 font-mono-tech text-[11px] border border-[#f6f1ea]/20 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
          >
            Fire Slingshot (b ≈ 2.1 Rs)
          </button>
          <button
            type="button"
            onClick={() => launchPresetGeodesic('CAPTURED')}
            className="px-2.5 py-1.5 font-mono-tech text-[11px] border border-[#f6f1ea]/20 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
          >
            Horizon Capture
          </button>
          <button
            type="button"
            onClick={() => launchPresetGeodesic('DEFLECTED')}
            className="px-2.5 py-1.5 font-mono-tech text-[11px] border border-[#f6f1ea]/20 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
          >
            Disk Deflection
          </button>
        </div>

        {latestTrail && (
          <div
            data-testid="geodesic-outcome-readout"
            className="pt-2.5 border-t border-[#f6f1ea]/15 font-mono-tech flex items-center justify-between text-[11px]"
          >
            <span className="text-[#f6f1ea]/60">
              b = {latestTrail.impactParameterB.toFixed(2)} Rs · r_min = {latestTrail.minRadius.toFixed(2)} Rs
            </span>
            <span className="text-[#e6f0ff] font-medium">{latestTrail.outcome}</span>
          </div>
        )}
      </div>
    </div>
  );
};
