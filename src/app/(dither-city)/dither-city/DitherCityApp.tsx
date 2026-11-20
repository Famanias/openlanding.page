'use client';

import React, { useCallback, useState } from 'react';
import DitherCityBackground from './components/DitherCityBackground';
import HeroOverlay from './components/HeroOverlay';
import SceneDebugPanel from './components/SceneDebugPanel';
import {
  DEFAULT_CITY_SETTINGS,
  DitherCitySettings,
  RenderStats,
} from './lib/cityConfig';

export default function DitherCityApp() {
  const [settings, setSettings] = useState<DitherCitySettings>(DEFAULT_CITY_SETTINGS);
  const [heroVisible, setHeroVisible] = useState(true);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [resetCameraToken, setResetCameraToken] = useState(0);
  const [stats, setStats] = useState<RenderStats>({
    fps: 0,
    drawCalls: 0,
    triangles: 0,
  });

  const handleUpdateSettings = useCallback((patch: Partial<DitherCitySettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleResetCamera = useCallback(() => {
    setSettings((prev) => ({ ...prev, scrollProgress: 0 }));
    setResetCameraToken((n) => n + 1);
  }, []);

  const handleStatsUpdate = useCallback((next: RenderStats) => {
    setStats(next);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0B09]">
      {/* Reusable Full-Bleed Interactive 2.5D Sci-Fi Megacity Canvas */}
      <DitherCityBackground
        motionEnabled={settings.motionEnabled}
        parallaxEnabled={settings.parallaxEnabled}
        scrollProgress={settings.scrollProgress}
        ditherEnabled={settings.ditherEnabled}
        halftoneEnabled={settings.halftoneEnabled}
        wireframe={settings.wireframe}
        ditherIntensity={settings.ditherIntensity}
        ditherResolution={settings.ditherResolution}
        halftoneScale={settings.halftoneScale}
        contrast={settings.contrast}
        grainIntensity={settings.grainIntensity}
        accentIntensity={settings.accentIntensity}
        fogDensity={settings.fogDensity}
        quality={settings.quality}
        resetCameraToken={resetCameraToken}
        onStatsUpdate={handleStatsUpdate}
      />

      {/* Minimal Left-Zone Accessible HTML Hero Preview */}
      <HeroOverlay
        visible={heroVisible}
        onToggleVisible={() => setHeroVisible((v) => !v)}
        onPrimaryAction={() => setInspectorOpen(true)}
      />

      {/* Collapsible Developer & Shader Inspection Dock */}
      <SceneDebugPanel
        open={inspectorOpen}
        onToggleOpen={() => setInspectorOpen((v) => !v)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        heroVisible={heroVisible}
        onToggleHeroVisible={() => setHeroVisible((v) => !v)}
        onResetCamera={handleResetCamera}
        stats={stats}
      />
    </div>
  );
}
