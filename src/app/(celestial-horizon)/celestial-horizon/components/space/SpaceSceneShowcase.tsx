'use client';

import React, { useCallback, useState, useSyncExternalStore } from 'react';
import { SpaceHeroBackground } from './SpaceHeroBackground';
import { SceneDebugDock } from './SceneDebugDock';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Full-viewport preview wrapper for the reusable SpaceHeroBackground scene
 * paired with lightweight collapsible debug controls.
 */
export function SpaceSceneShowcase() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const [parallaxOverride, setParallaxOverride] = useState<boolean | null>(null);
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [dockCollapsed, setDockCollapsed] = useState(false);

  const motionEnabled = motionOverride ?? !prefersReducedMotion;
  const parallaxEnabled = parallaxOverride ?? !prefersReducedMotion;

  const handleToggleMotion = useCallback(() => {
    setMotionOverride((prev) => !(prev ?? !prefersReducedMotion));
  }, [prefersReducedMotion]);

  const handleToggleParallax = useCallback(() => {
    setParallaxOverride((prev) => !(prev ?? !prefersReducedMotion));
  }, [prefersReducedMotion]);

  const handleToggleBloom = useCallback(() => {
    setBloomEnabled((prev) => !prev);
  }, []);

  const handleToggleWireframe = useCallback(() => {
    setWireframe((prev) => !prev);
  }, []);

  const handleToggleSafeZone = useCallback(() => {
    setShowSafeZone((prev) => !prev);
  }, []);

  const handleResetCamera = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
  }, []);

  const handleToggleCollapsed = useCallback(() => {
    setDockCollapsed((prev) => !prev);
  }, []);

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-[#04070f]">
      <SpaceHeroBackground
        motionEnabled={motionEnabled}
        parallaxEnabled={parallaxEnabled}
        bloomEnabled={bloomEnabled}
        wireframe={wireframe}
        showSafeZone={showSafeZone}
        resetTrigger={resetTrigger}
      />

      <SceneDebugDock
        motionEnabled={motionEnabled}
        parallaxEnabled={parallaxEnabled}
        bloomEnabled={bloomEnabled}
        wireframe={wireframe}
        showSafeZone={showSafeZone}
        collapsed={dockCollapsed}
        onToggleMotion={handleToggleMotion}
        onToggleParallax={handleToggleParallax}
        onToggleBloom={handleToggleBloom}
        onToggleWireframe={handleToggleWireframe}
        onToggleSafeZone={handleToggleSafeZone}
        onResetCamera={handleResetCamera}
        onToggleCollapsed={handleToggleCollapsed}
      />
    </main>
  );
}
