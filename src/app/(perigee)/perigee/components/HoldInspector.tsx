"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  CameraRigState,
  clamp,
  computeInspectParametersFromDrag,
  getInspectAnatomicalPins,
  projectWorldToScreen,
} from '../physics/geodesicMath';

export interface InspectOverrideValues {
  active: boolean;
  yawDelta: number;
  targetPitch: number | null;
  lensingMass: number;
  diskOpacity: number;
}

interface HoldInspectorProps {
  rig: CameraRigState;
  inspectableChapter: boolean;
  isInspectLocked: boolean;
  onInspectChange: (state: InspectOverrideValues) => void;
  hasUsedInspect: boolean;
  onMarkUsed: () => void;
}

export const HoldInspector: React.FC<HoldInspectorProps> = ({
  rig,
  inspectableChapter,
  isInspectLocked,
  onInspectChange,
  hasUsedInspect,
  onMarkUsed,
}) => {
  const [holdProgress, setHoldProgress] = useState(0); // 0..1 during 350ms hold
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoldingRing, setIsHoldingRing] = useState(false);
  const [dragMetrics, setDragMetrics] = useState({
    lensingMass: 1.5,
    diskOpacity: 1.0,
    inclinationDeg: (rig.pitch * 180) / Math.PI,
  });

  const holdStartRef = useRef<number | null>(null);
  const holdRafRef = useRef<number | null>(null);
  const pointerDownOriginRef = useRef<{ x: number; y: number } | null>(null);
  const isLockedRef = useRef(false);
  const keyboardNavRef = useRef({ normDx: 0, normDy: 0 });

  useEffect(() => {
    isLockedRef.current = isInspectLocked;
  }, [isInspectLocked]);

  // Project black hole center to screen for proximity check and hint placement
  const aspect = typeof window !== 'undefined' ? window.innerWidth / Math.max(1, window.innerHeight) : 16 / 9;
  const shadowScreen = projectWorldToScreen({ x: 0, y: 0, z: 0 }, rig, aspect);

  // Project the 6 anatomical pins when locked in Inspect mode
  const projectedPins = isInspectLocked
    ? getInspectAnatomicalPins(rig).map((pin) => ({
        ...pin,
        screen: projectWorldToScreen(pin.worldPos, rig, aspect),
      }))
    : [];

  const cancelHoldTimer = () => {
    holdStartRef.current = null;
    if (holdRafRef.current !== null) {
      cancelAnimationFrame(holdRafRef.current);
      holdRafRef.current = null;
    }
    setHoldProgress(0);
    setIsHoldingRing(false);
  };

  const exitInspectMode = () => {
    cancelHoldTimer();
    keyboardNavRef.current = { normDx: 0, normDy: 0 };
    setDragMetrics({
      lensingMass: 1.5,
      diskOpacity: 1.0,
      inclinationDeg: (rig.pitch * 180) / Math.PI,
    });
    onInspectChange({
      active: false,
      yawDelta: 0,
      targetPitch: null,
      lensingMass: 1.5,
      diskOpacity: 1.0,
    });
  };

  const engageInspectMode = (originX: number, originY: number) => {
    cancelHoldTimer();
    onMarkUsed();
    pointerDownOriginRef.current = { x: originX, y: originY };
    setDragMetrics({
      lensingMass: 1.5,
      diskOpacity: 0.75,
      inclinationDeg: (rig.pitch * 180) / Math.PI,
    });
    onInspectChange({
      active: true,
      yawDelta: 0,
      targetPitch: rig.pitch,
      lensingMass: 1.5,
      diskOpacity: 0.75,
    });
  };

  // Pointer handlers on the interactive horizon capture zone
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!inspectableChapter || e.button !== 0) return;

    const clientX = e.clientX;
    const clientY = e.clientY;
    setPointerPos({ x: clientX, y: clientY });
    pointerDownOriginRef.current = { x: clientX, y: clientY };

    if (isInspectLocked) {
      return;
    }

    setIsHoldingRing(true);
    holdStartRef.current = performance.now();

    const tickHold = (now: number) => {
      if (holdStartRef.current === null) return;
      const elapsed = now - holdStartRef.current;
      const p = clamp(elapsed / 350, 0, 1);
      setHoldProgress(p);
      if (p >= 1) {
        engageInspectMode(clientX, clientY);
      } else {
        holdRafRef.current = requestAnimationFrame(tickHold);
      }
    };

    holdRafRef.current = requestAnimationFrame(tickHold);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!pointerDownOriginRef.current) return;
      const dx = e.clientX - pointerDownOriginRef.current.x;
      const dy = e.clientY - pointerDownOriginRef.current.y;

      // If still in the 350ms hold phase and user drags/swipes > 14px, cancel hold so ordinary scroll/swipe never triggers inspect
      if (!isLockedRef.current && holdStartRef.current !== null) {
        if (Math.hypot(dx, dy) > 14) {
          cancelHoldTimer();
          pointerDownOriginRef.current = null;
        }
        return;
      }

      if (isLockedRef.current) {
        setPointerPos({ x: e.clientX, y: e.clientY });
        const normDx = clamp(dx / (window.innerWidth * 0.38), -1, 1);
        const normDy = clamp(dy / (window.innerHeight * 0.38), -1, 1);
        const params = computeInspectParametersFromDrag(normDx, normDy, rig.pitch);

        setDragMetrics({
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
          inclinationDeg: (params.targetPitch * 180) / Math.PI,
        });

        onInspectChange({
          active: true,
          yawDelta: params.yawDelta,
          targetPitch: params.targetPitch,
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
        });
      }
    };

    const handleGlobalPointerUp = () => {
      if (holdStartRef.current !== null) {
        cancelHoldTimer();
      }
      if (isLockedRef.current && pointerDownOriginRef.current !== null) {
        pointerDownOriginRef.current = null;
        exitInspectMode();
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [rig.pitch, inspectableChapter]);

  // Keyboard navigation while Inspect Singularity mode is active
  useEffect(() => {
    if (!isInspectLocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        exitInspectMode();
        return;
      }

      let handled = false;
      if (e.key === 'ArrowRight') {
        keyboardNavRef.current.normDx = clamp(keyboardNavRef.current.normDx + 0.15, -1, 1);
        handled = true;
      } else if (e.key === 'ArrowLeft') {
        keyboardNavRef.current.normDx = clamp(keyboardNavRef.current.normDx - 0.15, -1, 1);
        handled = true;
      } else if (e.key === 'ArrowUp') {
        keyboardNavRef.current.normDy = clamp(keyboardNavRef.current.normDy + 0.15, -1, 1);
        handled = true;
      } else if (e.key === 'ArrowDown') {
        keyboardNavRef.current.normDy = clamp(keyboardNavRef.current.normDy - 0.15, -1, 1);
        handled = true;
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        const params = computeInspectParametersFromDrag(
          keyboardNavRef.current.normDx,
          keyboardNavRef.current.normDy,
          rig.pitch
        );
        setDragMetrics({
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
          inclinationDeg: (params.targetPitch * 180) / Math.PI,
        });
        onInspectChange({
          active: true,
          yawDelta: params.yawDelta,
          targetPitch: params.targetPitch,
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isInspectLocked, rig.pitch]);

  if (!inspectableChapter && !isInspectLocked) {
    return null;
  }

  const shadowCssX = `${(shadowScreen.x * 100).toFixed(2)}%`;
  const shadowCssY = `${(shadowScreen.y * 100).toFixed(2)}%`;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none">
      {/* Interactive Horizon Hold Zone around the Schwarzschild Shadow */}
      <div
        data-testid="horizon-hold-zone"
        onPointerDown={handlePointerDown}
        style={{
          left: shadowCssX,
          top: shadowCssY,
          transform: 'translate(-50%, -50%)',
        }}
        className={`pointer-events-auto absolute w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center transition-opacity duration-300 ${
          isInspectLocked ? 'cursor-grabbing' : 'cursor-crosshair'
        }`}
      >
        {/* Subtle Horizon Hold Hint (fades after first use, hidden in Ch.5 where anatomical callouts are pinned) */}
        {!isInspectLocked && !isHoldingRing && rig.chapterIndex !== 4 && (
          <div
            className={`mt-64 md:mt-72 px-3 py-1.5 border border-[#f6f1ea]/15 bg-black/75 text-[#f6f1ea]/75 text-xs font-mono-tech tracking-wider transition-opacity duration-500 whitespace-nowrap ${
              hasUsedInspect ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            Hold on horizon to inspect spacetime
          </div>
        )}
      </div>

      {/* 350ms Vernier Ring Filling Around Pointer */}
      {isHoldingRing && !isInspectLocked && (
        <div
          style={{
            left: `${pointerPos.x}px`,
            top: `${pointerPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="fixed pointer-events-none z-40 flex flex-col items-center"
        >
          <svg width="68" height="68" viewBox="0 0 68 68" className="-rotate-90">
            <circle
              cx="34"
              cy="34"
              r="28"
              fill="none"
              stroke="rgba(246, 241, 234, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle
              cx="34"
              cy="34"
              r="28"
              fill="none"
              stroke="#ffb36b"
              strokeWidth="2"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - holdProgress)}
            />
          </svg>
          <span className="mt-1.5 text-[11px] font-mono-tech text-[#ffb36b] tracking-widest uppercase bg-black/80 px-2 py-0.5 border border-[#ffb36b]/30">
            LOCKING METRIC {(holdProgress * 100).toFixed(0)}%
          </span>
        </div>
      )}

      {/* 3D-Projected Anatomical Labels when Singularity Inspection Mode is Locked */}
      {isInspectLocked && (
        <>
          {projectedPins.map((pin) => {
            if (!pin.screen.visible) return null;
            return (
              <div
                key={pin.id}
                data-testid={`inspect-pin-${pin.id}`}
                style={{
                  left: `${(pin.screen.x * 100).toFixed(2)}%`,
                  top: `${(pin.screen.y * 100).toFixed(2)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="fixed pointer-events-none transition-transform duration-75"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-[#ffb36b] bg-black/90 shrink-0" />
                  <div className="px-2.5 py-1 bg-black/85 border border-[#f6f1ea]/20 text-left">
                    <div className="text-xs font-medium text-[#f6f1ea] whitespace-nowrap leading-tight">
                      {pin.label}
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#ffb36b] whitespace-nowrap">
                      {pin.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Active Singularity Lensing HUD Bar */}
          <div
            data-testid="singularity-inspect-hud"
            className="fixed top-16 left-1/2 -translate-x-1/2 pointer-events-auto bg-black/90 border border-[#f6f1ea]/20 px-4 py-2.5 flex items-center gap-4 text-xs font-mono-tech whitespace-nowrap max-w-[95vw] overflow-x-auto"
          >
            <div>
              <span className="text-[#f6f1ea]/55">MODE </span>
              <span className="text-[#ffb36b]">SINGULARITY LENSING</span>
            </div>
            <span className="text-[#f6f1ea]/20" aria-hidden="true">·</span>
            <div>
              <span className="text-[#f6f1ea]/55">MASS </span>
              <span className="text-[#f6f1ea]">{dragMetrics.lensingMass.toFixed(2)} M₀</span>
            </div>
            <span className="text-[#f6f1ea]/20" aria-hidden="true">·</span>
            <div>
              <span className="text-[#f6f1ea]/55">DISK OPACITY </span>
              <span className="text-[#f6f1ea]">{(dragMetrics.diskOpacity * 100).toFixed(0)}%</span>
            </div>
            <span className="text-[#f6f1ea]/20" aria-hidden="true">·</span>
            <div>
              <span className="text-[#f6f1ea]/55">INCLINATION </span>
              <span className="text-[#f6f1ea]">{dragMetrics.inclinationDeg.toFixed(1)}°</span>
            </div>
            <button
              type="button"
              onClick={exitInspectMode}
              className="ml-1 px-2.5 py-1 border border-[#f6f1ea]/25 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
            >
              Exit Inspect (Esc)
            </button>
          </div>
        </>
      )}

      {/* Focusable Keyboard-Accessible Inspect Singularity Button */}
      <div className="fixed bottom-6 right-6 pointer-events-auto z-30">
        <button
          type="button"
          aria-pressed={isInspectLocked}
          onClick={() => {
            if (isInspectLocked) {
              exitInspectMode();
            } else {
              engageInspectMode(window.innerWidth * 0.5, window.innerHeight * 0.5);
            }
          }}
          className={`px-3.5 py-2 text-xs font-mono-tech border transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#ffb36b] ${
            isInspectLocked
              ? 'bg-[#ffb36b] text-black border-[#ffb36b] font-medium'
              : 'bg-black/85 text-[#f6f1ea] border-[#f6f1ea]/20 hover:border-[#ffb36b]/70'
          }`}
        >
          {isInspectLocked ? 'Release Singularity Metric' : 'Inspect Singularity'}
        </button>
      </div>
    </div>
  );
};
