'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KirigamiWorld } from './src/components/KirigamiWorld';
import {
  SceneControls,
  SceneControlState,
} from './src/components/SceneControls';
import { clamp01 } from './src/utils/unfoldMath';
import type { CameraFrame, ViewportCategory } from './src/utils/sceneCoordinates';

const DEFAULT_CONTROL_STATE: SceneControlState = {
  unfoldProgress: 1,
  isPlayingUnfold: false,
  ambientMotion: true,
  parallaxEnabled: true,
  petalsEnabled: true,
  shadowsEnabled: true,
  textureEnabled: true,
  outlinesEnabled: false,
  depthVisualization: false,
  interactive: true,
  windIntensity: 1.0,
  parallaxStrength: 1.0,
  shadowIntensity: 1.0,
};

export default function KirigamiApp() {
  const [controls, setControls] = useState<SceneControlState>(DEFAULT_CONTROL_STATE);
  const [panelOpen, setPanelOpen] = useState(false);
  const [uiHidden, setUiHidden] = useState(false);
  const [fps, setFps] = useState(60);
  const [cameraCategory, setCameraCategory] = useState<ViewportCategory>('desktop');
  const [resetToken, setResetToken] = useState(0);

  const playRafRef = useRef<number>(0);

  const handleUpdate = useCallback(
    <K extends keyof SceneControlState>(key: K, value: SceneControlState[K]) => {
      setControls((prev) => ({
        ...prev,
        [key]: value,
        // Scrubbing unfold slider manually pauses active playback
        ...(key === 'unfoldProgress' ? { isPlayingUnfold: false } : {}),
      }));
    },
    []
  );

  // Play / Pause unfolding demonstration sequence (0 -> 1 over 4.2 seconds)
  const handleTogglePlayUnfold = useCallback(() => {
    setControls((prev) => {
      if (prev.isPlayingUnfold) {
        return { ...prev, isPlayingUnfold: false };
      }
      const startProgress = prev.unfoldProgress >= 0.98 ? 0 : prev.unfoldProgress;
      return {
        ...prev,
        unfoldProgress: startProgress,
        isPlayingUnfold: true,
      };
    });
  }, []);

  useEffect(() => {
    if (!controls.isPlayingUnfold) {
      window.cancelAnimationFrame(playRafRef.current);
      return;
    }

    let last = performance.now();
    const durationSec = 4.2;

    const step = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;

      let finished = false;
      setControls((prev) => {
        if (!prev.isPlayingUnfold) return prev;
        const next = clamp01(prev.unfoldProgress + dt / durationSec);
        if (next >= 1) {
          finished = true;
          return { ...prev, unfoldProgress: 1, isPlayingUnfold: false };
        }
        return { ...prev, unfoldProgress: next };
      });

      if (!finished) {
        playRafRef.current = window.requestAnimationFrame(step);
      }
    };

    playRafRef.current = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(playRafRef.current);
  }, [controls.isPlayingUnfold]);

  // Mousewheel demonstration mode for smooth scroll-controlled unfolding
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Allow scrolling inside the control drawer if open and hovered
      if ((e.target as HTMLElement | null)?.closest('aside')) return;
      e.preventDefault();
      // Scrolling down unfolds forward; scrolling up folds back
      const delta = e.deltaY * 0.00055;
      setControls((prev) => ({
        ...prev,
        isPlayingUnfold: false,
        unfoldProgress: clamp01(prev.unfoldProgress + delta),
      }));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Keyboard shortcut 'H' toggles complete UI visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          return;
        }
        setUiHidden((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResetScene = useCallback(() => {
    setControls(DEFAULT_CONTROL_STATE);
    setResetToken((n) => n + 1);
  }, []);

  const handleCameraChange = useCallback((frame: CameraFrame) => {
    setCameraCategory(frame.category);
  }, []);

  return (
    <main className="relative h-dvh w-screen overflow-hidden">
      <KirigamiWorld
        unfoldProgress={controls.unfoldProgress}
        ambientMotion={controls.ambientMotion}
        parallaxEnabled={controls.parallaxEnabled}
        petalsEnabled={controls.petalsEnabled}
        shadowsEnabled={controls.shadowsEnabled}
        textureEnabled={controls.textureEnabled}
        outlinesEnabled={controls.outlinesEnabled}
        depthVisualization={controls.depthVisualization}
        interactive={controls.interactive}
        windIntensity={controls.windIntensity}
        parallaxStrength={controls.parallaxStrength}
        shadowIntensity={controls.shadowIntensity}
        resetToken={resetToken}
        onFpsSample={setFps}
        onCameraChange={handleCameraChange}
      />

      <SceneControls
        state={controls}
        fps={fps}
        cameraCategory={cameraCategory}
        panelOpen={panelOpen}
        uiHidden={uiHidden}
        onTogglePanel={() => setPanelOpen((o) => !o)}
        onHideCompletely={() => {
          setPanelOpen(false);
          setUiHidden(true);
        }}
        onUpdate={handleUpdate}
        onTogglePlayUnfold={handleTogglePlayUnfold}
        onResetScene={handleResetScene}
      />
    </main>
  );
}
