'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import BotanicalCanvas, { type BotanicalCanvasHandle } from './BotanicalCanvas';
import DeveloperControls from './DeveloperControls';
import { ANIMATION_PHASES, TIMELINE_DURATION_SEC } from '../lib/botanical/timeline';
import type {
  AnimationPhaseInfo,
  DeveloperSettings,
  PlaybackMode,
  PlaybackSpeed,
} from '../lib/botanical/types';

export default function BloomDecayExperience() {
  const canvasHandleRef = useRef<BotanicalCanvasHandle | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  const [settings, setSettings] = useState<DeveloperSettings>({
    isPlaying: true,
    loop: false,
    speed: 1,
    mode: 'auto',
    ambientMotion: true,
    pointerParallax: true,
    inkDiffusion: true,
    flowerGrowth: true,
    paperTexture: true,
    panelOpen: false,
    panelHidden: false,
  });

  const [hud, setHud] = useState<{
    timeSec: number;
    progress: number;
    phase: AnimationPhaseInfo;
    fps: number;
  }>({
    timeSec: 0,
    progress: 0,
    phase: ANIMATION_PHASES[0],
    fps: 60,
  });

  // Respect prefers-reduced-motion media query
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = (matches: boolean) => {
      setReducedMotion(matches);
      if (matches) {
        setSettings((prev) => ({
          ...prev,
          isPlaying: false,
          ambientMotion: false,
        }));
        setHud({
          timeSec: TIMELINE_DURATION_SEC,
          progress: 1,
          phase: ANIMATION_PHASES[7],
          fps: 60,
        });
      }
    };

    apply(mq.matches);
    const listener = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // Optional keyboard shortcuts for smooth developer workflow:
  // Space = play/pause, R = restart, H = hide/show controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.code === 'KeyH') {
        e.preventDefault();
        setSettings((prev) => ({ ...prev, panelHidden: !prev.panelHidden }));
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        setSettings((prev) => ({ ...prev, isPlaying: true }));
        canvasHandleRef.current?.restart();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setSettings((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSyncHud = useCallback(
    (payload: {
      timeSec: number;
      progress: number;
      phase: AnimationPhaseInfo;
      fps: number;
      isPlaying: boolean;
    }) => {
      setHud({
        timeSec: payload.timeSec,
        progress: payload.progress,
        phase: payload.phase,
        fps: payload.fps,
      });
      setSettings((prev) =>
        prev.isPlaying === payload.isPlaying
          ? prev
          : { ...prev, isPlaying: payload.isPlaying }
      );
    },
    []
  );

  const handlePlayPause = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      mode: 'auto',
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const handleRestart = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isPlaying: true,
    }));
    canvasHandleRef.current?.restart();
  }, []);

  const handleJumpCompleted = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isPlaying: false,
    }));
    canvasHandleRef.current?.jumpToCompleted();
  }, []);

  const handleScrub = useCallback((timeSec: number) => {
    setSettings((prev) => ({
      ...prev,
      mode: 'auto',
      isPlaying: false,
    }));
    canvasHandleRef.current?.seekToTime(timeSec, true);
  }, []);

  const handleChangeSpeed = useCallback((speed: PlaybackSpeed) => {
    setSettings((prev) => ({ ...prev, speed }));
  }, []);

  const handleChangeMode = useCallback((mode: PlaybackMode) => {
    setSettings((prev) => ({
      ...prev,
      mode,
      isPlaying: mode === 'auto' ? prev.isPlaying : false,
    }));
    if (mode === 'scroll') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const handleToggleSetting = useCallback(
    (
      key:
        | 'loop'
        | 'ambientMotion'
        | 'pointerParallax'
        | 'inkDiffusion'
        | 'flowerGrowth'
        | 'paperTexture'
        | 'panelOpen'
        | 'panelHidden'
    ) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );

  return (
    <main className="relative min-h-dvh w-full bg-[#E9E1D3]">
      <BotanicalCanvas
        ref={canvasHandleRef}
        settings={settings}
        reducedMotion={reducedMotion}
        onSyncHud={handleSyncHud}
      />
      <DeveloperControls
        settings={settings}
        timeSec={hud.timeSec}
        fps={hud.fps}
        phase={hud.phase}
        reducedMotion={reducedMotion}
        onPlayPause={handlePlayPause}
        onRestart={handleRestart}
        onJumpCompleted={handleJumpCompleted}
        onScrub={handleScrub}
        onChangeSpeed={handleChangeSpeed}
        onChangeMode={handleChangeMode}
        onToggleSetting={handleToggleSetting}
      />
    </main>
  );
}
