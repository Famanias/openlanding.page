'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_SCENE_CONTROLS,
  clamp,
  type SceneControlState,
} from './utils/sceneLayout';
import { useScrollProgress } from './hooks/useScrollProgress';
import { SolsticeBackground } from './components/SolsticeBackground';
import { DebugControls } from './components/DebugControls';

export default function SolsticeApp() {
  const [controls, setControls] = useState<SceneControlState>(
    DEFAULT_SCENE_CONTROLS
  );
  const [controlsOpen, setControlsOpen] = useState(false);
  const [liveScrollProgress, setLiveScrollProgress] = useState(0);
  const [liveRevealProgress, setLiveRevealProgress] = useState(0);
  const [fps, setFps] = useState(60);

  // Optional query params (?skipReveal=1 or ?reveal=0.38) for deterministic testing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('skipReveal') !== '1' && !params.has('reveal')) return;

    const rafId = window.requestAnimationFrame(() => {
      if (params.get('skipReveal') === '1') {
        setControls((prev) => ({
          ...prev,
          revealProgress: 1,
          revealManualScrub: true,
        }));
        setLiveRevealProgress(1);
      } else if (params.has('reveal')) {
        const val = clamp(parseFloat(params.get('reveal') || '0'), 0, 1);
        setControls((prev) => ({
          ...prev,
          revealProgress: val,
          revealManualScrub: true,
        }));
        setLiveRevealProgress(val);
      }
    });
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useScrollProgress(
    controls.manualScrollOverride,
    controls.scrollProgress,
    setLiveScrollProgress
  );

  const handleUpdate = useCallback((patch: Partial<SceneControlState>) => {
    setControls((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleReplayOpening = useCallback(() => {
    setControls((prev) => ({
      ...prev,
      ambientPlaying: true,
      revealProgress: 0,
      revealManualScrub: false,
      revealReplayToken: prev.revealReplayToken + 1,
    }));
    setLiveRevealProgress(0);
  }, []);

  const handleSkipOpening = useCallback(() => {
    setControls((prev) => ({
      ...prev,
      revealProgress: 1,
      revealManualScrub: true,
    }));
    setLiveRevealProgress(1);
  }, []);

  const handleReset = useCallback(() => {
    setControls((prev) => ({
      ...DEFAULT_SCENE_CONTROLS,
      revealReplayToken: prev.revealReplayToken + 1,
    }));
    setLiveScrollProgress(0);
    setLiveRevealProgress(0);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const activeScrollProgress = controls.manualScrollOverride
    ? controls.scrollProgress
    : liveScrollProgress;

  return (
    <main className="relative min-h-[320vh] w-full bg-[#F3E9DA]">
      {/* Full-bleed living interactive painted desert environment */}
      <SolsticeBackground
        controls={controls}
        scrollProgress={activeScrollProgress}
        controlsOpen={controlsOpen}
        onFpsSample={setFps}
        onRevealSample={setLiveRevealProgress}
      />

      {/* Hideable developer control panel for testing opening creation & living motion */}
      <DebugControls
        open={controlsOpen}
        onOpenChange={setControlsOpen}
        controls={controls}
        liveScrollProgress={liveScrollProgress}
        liveRevealProgress={liveRevealProgress}
        fps={fps}
        onUpdate={handleUpdate}
        onReplayOpening={handleReplayOpening}
        onSkipOpening={handleSkipOpening}
        onReset={handleReset}
      />
    </main>
  );
}
