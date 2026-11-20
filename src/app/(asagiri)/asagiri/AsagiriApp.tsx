'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { JapaneseScenicBackground } from './components/scene/JapaneseScenicBackground';
import type { ScenicCameraPreset } from './components/scene/ScenicStage';
import { DebugControlsDock } from './components/scene/DebugControlsDock';
import { TextSafeAreaOverlay } from './components/scene/TextSafeAreaOverlay';
import { JapaneseAmbientAudioEngine } from './lib/ambient-audio';

const subscribeNoop = () => () => {};

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function getInitialCyclePhaseSnapshot(): number {
  if (typeof window === 'undefined') return 0;
  const raw = new URLSearchParams(window.location.search).get('cyclePhase');
  if (!raw) return 0;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return 0;
  return ((parsed % 1) + 1) % 1;
}

function getServerCyclePhaseSnapshot(): number {
  return 0;
}

function getCameraPresetSnapshot(): ScenicCameraPreset {
  if (typeof window === 'undefined') return 'default';
  const raw = new URLSearchParams(window.location.search).get('camView');
  if (raw === 'torii' || raw === 'shore' || raw === 'tree') return raw;
  return 'default';
}

function getServerCameraPresetSnapshot(): ScenicCameraPreset {
  return 'default';
}

export default function AsagiriApp() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );
  const initialCyclePhase = useSyncExternalStore(
    subscribeNoop,
    getInitialCyclePhaseSnapshot,
    getServerCyclePhaseSnapshot
  );
  const cameraPreset = useSyncExternalStore(
    subscribeNoop,
    getCameraPresetSnapshot,
    getServerCameraPresetSnapshot
  );

  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const enableMotion = motionOverride ?? !prefersReducedMotion;

  const [enableParallax, setEnableParallax] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const audioEngineRef = useRef<JapaneseAmbientAudioEngine | null>(null);

  // Cleanly dispose Web Audio context on unmount
  useEffect(() => {
    return () => {
      audioEngineRef.current?.dispose();
      audioEngineRef.current = null;
    };
  }, []);

  const handleToggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      if (!audioEngineRef.current) {
        audioEngineRef.current = new JapaneseAmbientAudioEngine();
      }
      if (next) {
        audioEngineRef.current.start();
      } else {
        audioEngineRef.current.stop();
      }
      return next;
    });
  }, []);

  const handleToggleMotion = useCallback(() => {
    setMotionOverride((prev) => !(prev ?? !prefersReducedMotion));
  }, [prefersReducedMotion]);

  const handleResetCamera = useCallback(() => {
    setResetSignal((count) => count + 1);
  }, []);

  return (
    <main
      data-audio={audioEnabled ? 'on' : 'off'}
      className="relative w-screen h-screen overflow-hidden bg-[#1E2B3C]"
    >
      {/* Reusable layered 2.5D Japanese scenic hero background */}
      <JapaneseScenicBackground
        className="absolute inset-0"
        enableMotion={enableMotion}
        enableParallax={enableParallax}
        wireframe={wireframe}
        resetSignal={resetSignal}
        initialCyclePhase={initialCyclePhase}
        cameraPreset={cameraPreset}
      />

      {/* Optional text-safe-area guide overlay */}
      <TextSafeAreaOverlay visible={showSafeArea} />

      {/* Collapsible debug controls dock */}
      <DebugControlsDock
        enableMotion={enableMotion}
        enableParallax={enableParallax}
        wireframe={wireframe}
        showSafeArea={showSafeArea}
        audioEnabled={audioEnabled}
        collapsed={dockCollapsed}
        onToggleMotion={handleToggleMotion}
        onToggleParallax={() => setEnableParallax((v) => !v)}
        onToggleWireframe={() => setWireframe((v) => !v)}
        onToggleSafeArea={() => setShowSafeArea((v) => !v)}
        onToggleAudio={handleToggleAudio}
        onResetCamera={handleResetCamera}
        onToggleCollapsed={() => setDockCollapsed((v) => !v)}
      />
    </main>
  );
}
