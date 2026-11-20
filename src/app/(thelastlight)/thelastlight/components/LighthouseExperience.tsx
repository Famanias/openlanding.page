'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_CONTROLS,
  SimControls,
  TelemetryStats,
} from '../lib/sim/types';
import { DEFAULT_BOAT_ANCHOR } from '../lib/sim/buoyancy';
import { evaluateStormSequence } from '../lib/sim/weather';
import { LighthouseEngine } from '../lib/scene/LighthouseEngine';
import ControlDock from './ControlDock';

const INITIAL_TELEMETRY: TelemetryStats = {
  fps: 60,
  drawCalls: 0,
  triangles: 0,
  geometries: 0,
  isSoftwareGl: false,
  boatX: DEFAULT_BOAT_ANCHOR.x,
  boatZ: DEFAULT_BOAT_ANCHOR.z,
  boatWaveHeight: 0,
  windSpeedKts: 24,
};

export default function LighthouseExperience() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<LighthouseEngine | null>(null);

  const [controls, setControls] = useState<SimControls>(DEFAULT_CONTROLS);
  const [telemetry, setTelemetry] = useState<TelemetryStats>(INITIAL_TELEMETRY);
  const [stormPhase, setStormPhase] = useState<string>('Golden Hour');
  const [dockExpanded, setDockExpanded] = useState<boolean>(false);
  const [uiHidden, setUiHidden] = useState<boolean>(false);
  const [webglError, setWebglError] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      const engine = new LighthouseEngine(container, DEFAULT_CONTROLS, {
        onTelemetry: (stats) => {
          setTelemetry(stats);
        },
        onStormTimeUpdate: (time, phaseName) => {
          setStormPhase(phaseName);
          setControls((prev) =>
            prev.stormActive ? { ...prev, stormTime: time } : prev
          );
        },
      });
      engineRef.current = engine;
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'WebGL rendering is unavailable in this browser.';
      queueMicrotask(() => setWebglError(msg));
    }

    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  const handleUpdateControls = useCallback((patch: Partial<SimControls>) => {
    setControls((prev) => {
      const next = { ...prev, ...patch };
      if (next.stormActive) {
        const seq = evaluateStormSequence(next.stormTime);
        setStormPhase(seq.phaseName);
      }
      engineRef.current?.updateControls(next);
      return next;
    });
  }, []);

  const handleResetCamera = useCallback(() => {
    engineRef.current?.resetCamera();
  }, []);

  const handleResetBoat = useCallback(() => {
    engineRef.current?.resetBoatPosition();
  }, []);

  const handleResetScene = useCallback(() => {
    setControls(DEFAULT_CONTROLS);
    setStormPhase('Golden Hour');
    engineRef.current?.resetScene(DEFAULT_CONTROLS);
  }, []);

  const handleRepositionBoatQuick = useCallback(() => {
    engineRef.current?.repositionBoatSafe();
  }, []);

  // Keyboard shortcuts: H (hide UI), R (reset camera), 1-5 (main camera modes), 6-9 (arch inspection views)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === 'h') {
        setUiHidden((prev) => !prev);
      } else if (key === 'r') {
        engineRef.current?.resetCamera();
      } else if (key === '1') {
        handleUpdateControls({ cameraMode: 'cinematic' });
      } else if (key === '2') {
        handleUpdateControls({ cameraMode: 'orbit' });
      } else if (key === '3') {
        handleUpdateControls({ cameraMode: 'ground' });
      } else if (key === '4') {
        handleUpdateControls({ cameraMode: 'ocean' });
      } else if (key === '5') {
        handleUpdateControls({ cameraMode: 'beacon' });
      } else if (key === '6') {
        handleUpdateControls({ cameraMode: 'front' });
      } else if (key === '7') {
        handleUpdateControls({ cameraMode: 'side' });
      } else if (key === '8') {
        handleUpdateControls({ cameraMode: 'elevated' });
      } else if (key === '9') {
        handleUpdateControls({ cameraMode: 'topdown' });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUpdateControls]);

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-[#070b11]"
      data-camera-mode={controls.cameraMode}
      data-weather={controls.stormActive ? `STORM:${stormPhase}` : controls.weather}
      data-cutaway={String(controls.cutaway)}
      data-door-open={String(controls.doorOpen)}
    >
      {/* Isolated WebGL Canvas Mount Container (never unmounted by HUD updates) */}
      <div
        ref={mountRef}
        data-testid="lighthouse-canvas-container"
        className={`absolute inset-0 w-full h-full ${
          controls.repositionBoatMode ? 'cursor-crosshair' : 'cursor-default'
        }`}
      />

      {/* Graceful fallback if WebGL initialization fails */}
      {webglError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#070b11] p-6 text-center z-30">
          <div className="max-w-md space-y-2 rounded-xl border border-white/10 bg-[#0d141e] p-6">
            <h1 className="text-base font-semibold text-slate-100">
              WebGL Initialization Unavailable
            </h1>
            <p className="text-sm text-slate-400">{webglError}</p>
          </div>
        </div>
      )}

      {/* Subtle reposition mode hint banner */}
      {controls.repositionBoatMode && !uiHidden && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-20 px-3.5 py-2 rounded-lg bg-[#0b1118]/92 border border-sky-400/40 text-xs text-sky-200 flex items-center gap-3">
          <span>Click anywhere in the open cove water to reposition the boat</span>
          <button
            type="button"
            onClick={() => handleUpdateControls({ repositionBoatMode: false })}
            className="text-slate-300 hover:text-white underline cursor-pointer"
          >
            Done
          </button>
        </div>
      )}

      {/* Optional Collapsible & Completely Hideable Bottom Developer Dock */}
      <ControlDock
        controls={controls}
        telemetry={telemetry}
        stormPhase={stormPhase}
        dockExpanded={dockExpanded}
        uiHidden={uiHidden}
        onToggleDock={() => setDockExpanded((prev) => !prev)}
        onToggleHideUi={() => setUiHidden((prev) => !prev)}
        onUpdateControls={handleUpdateControls}
        onResetCamera={handleResetCamera}
        onResetBoat={handleResetBoat}
        onResetScene={handleResetScene}
        onRepositionBoatQuick={handleRepositionBoatQuick}
      />
    </main>
  );
}
