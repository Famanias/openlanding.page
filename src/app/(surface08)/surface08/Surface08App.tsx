'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  BackgroundEffect,
  EffectControls,
  EffectId,
  QualityPreset,
  TelemetryStats,
} from './engine/effectTypes';
import { EFFECT_ORDER } from './engine/EffectController';
import { ChromaFluidEffect } from './effects/chroma-fluid/ChromaFluidEffect';
import { FlutedLightEffect } from './effects/fluted-light/FlutedLightEffect';
import { SilkAtmosphereEffect } from './effects/silk-atmosphere/SilkAtmosphereEffect';
import { GlassLensEffect } from './effects/glass-lens/GlassLensEffect';
import { AuroraFieldEffect } from './effects/aurora-field/AuroraFieldEffect';
import { ChromaticRibbonsEffect } from './effects/chromatic-ribbons/ChromaticRibbonsEffect';
import { BokehReactorEffect } from './effects/bokeh-reactor/BokehReactorEffect';
import { RefractionFieldEffect } from './effects/refraction-field/RefractionFieldEffect';
import { WebGLCanvas } from './components/WebGLCanvas';
import { HeaderBar } from './components/HeaderBar';
import { HeroOverlay } from './components/HeroOverlay';
import { BackgroundSwitcher } from './components/BackgroundSwitcher';
import { TunePanel } from './components/TunePanel';
import { InspectOverlay } from './components/InspectOverlay';
import { ExportModal } from './components/ExportModal';
import { getExportBundleForEffect } from './export/componentSourceRegistry';
import { copyTextToClipboard, downloadEffectZipBundle } from './export/exportBundle';

export default function Surface08App() {
  // Instantiate metadata catalog of the 8 surfaces
  const effectsCatalog: BackgroundEffect[] = useMemo(
    () => [
      new ChromaFluidEffect(),
      new FlutedLightEffect(),
      new SilkAtmosphereEffect(),
      new GlassLensEffect(),
      new AuroraFieldEffect(),
      new ChromaticRibbonsEffect(),
      new BokehReactorEffect(),
      new RefractionFieldEffect(),
    ],
    []
  );

  // Default to 02 FLUTED LIGHT for maximum reference-aligned architectural glass craft on first paint
  const [activeEffectId, setActiveEffectId] = useState<EffectId>('fluted-light');
  const [interaction, setInteraction] = useState<number>(70);
  const [speed, setSpeed] = useState<number>(45);
  const [paletteIndex, setPaletteIndex] = useState<number>(0);
  const [quality, setQuality] = useState<QualityPreset>('auto');
  const [paused, setPaused] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [introProgress, setIntroProgress] = useState<number>(0.15);
  const [introReady, setIntroReady] = useState<boolean>(false);

  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [tuneOpen, setTuneOpen] = useState<boolean>(false);
  const [inspectOpen, setInspectOpen] = useState<boolean>(false);
  const [exportOpen, setExportOpen] = useState<boolean>(false);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [dockHighlightPulse, setDockHighlightPulse] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [resetSignal, setResetSignal] = useState<number>(0);
  const [fullscreenSupported, setFullscreenSupported] = useState<boolean>(false);

  const [telemetry, setTelemetry] = useState<TelemetryStats>({
    fps: 60,
    frameTimeMs: 16.6,
    activeEffectId: 'fluted-light',
    activeEffectLabel: 'FLUTED LIGHT',
    inTransition: false,
    transitionFamily: 'Viscous Fluted Wipe',
    width: 1440,
    height: 900,
    dpr: 1.5,
    qualityTier: 'auto',
    effectiveQuality: 'high',
    isSoftwareGl: false,
    drawCalls: 2,
    triangles: 4,
    textures: 3,
    geometries: 2,
    pointerUv: [0.62, 0.52],
    pointerSpeed: 0,
  });

  // Detect prefers-reduced-motion, ?autostart=1, and Fullscreen support, plus choreographed intro ramp
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = mediaQuery.matches;
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart') === '1';

    let rafId = 0;
    const start = performance.now();
    const durationMs = 1900;

    const animateIntro = (now: number) => {
      setReducedMotion(prefersReduced);
      setFullscreenSupported(Boolean(document.documentElement.requestFullscreen));
      setIntroReady(true);

      if (prefersReduced || autostart) {
        setIntroProgress(1.0);
        return;
      }

      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setIntroProgress(0.15 + eased * 0.85);
      if (t < 1) {
        rafId = requestAnimationFrame(animateIntro);
      }
    };
    rafId = requestAnimationFrame(animateIntro);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setIntroProgress(1.0);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Numeric keyboard shortcuts 1-8 and H for dock toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.key >= '1' && e.key <= '8') {
        const idx = Number(e.key) - 1;
        const nextId = EFFECT_ORDER[idx];
        if (nextId) {
          setActiveEffectId(nextId);
          setPaletteIndex(0);
        }
      } else if (e.key === 'Escape') {
        setExportOpen(false);
        setTuneOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeEffect = useMemo(
    () => effectsCatalog.find((e) => e.id === activeEffectId) || effectsCatalog[1],
    [effectsCatalog, activeEffectId]
  );

  const activePalette = useMemo(
    () => activeEffect.palettes[paletteIndex % activeEffect.palettes.length] || activeEffect.palettes[0],
    [activeEffect, paletteIndex]
  );

  const controls: EffectControls = useMemo(
    () => ({
      interaction,
      speed,
      paletteIndex,
      quality,
      paused,
      reducedMotion,
      introProgress,
    }),
    [interaction, speed, paletteIndex, quality, paused, reducedMotion, introProgress]
  );

  const handleSelectEffect = useCallback((id: EffectId) => {
    setActiveEffectId(id);
    setPaletteIndex(0);
  }, []);

  const handleExploreMaterials = useCallback(() => {
    setDockCollapsed(false);
    setDockHighlightPulse(true);
    setTimeout(() => setDockHighlightPulse(false), 1200);
    // Cycle to the next living material surface so clicking EXPLORE MATERIALS produces an immediate optical transition
    const currentIndex = EFFECT_ORDER.indexOf(activeEffectId);
    const nextIndex = (currentIndex + 1) % EFFECT_ORDER.length;
    setActiveEffectId(EFFECT_ORDER[nextIndex]);
    setPaletteIndex(0);
  }, [activeEffectId]);

  const handleCopyBackground = useCallback(async () => {
    const bundle = getExportBundleForEffect(activeEffect, interaction, speed, paletteIndex);
    const ok = await copyTextToClipboard(bundle.integrationSnippet);
    if (ok) {
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2400);
    }
  }, [activeEffect, interaction, speed, paletteIndex]);

  const handleDownloadBundle = useCallback(async () => {
    await downloadEffectZipBundle(activeEffect, interaction, speed, paletteIndex);
  }, [activeEffect, interaction, speed, paletteIndex]);

  const handleReset = useCallback(() => {
    setInteraction(70);
    setSpeed(45);
    setPaletteIndex(0);
    setPaused(false);
    setResetSignal((s) => s + 1);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const handleFirstInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return (
    <main
      id="top"
      data-active-effect={activeEffectId}
      className="relative flex flex-col justify-between min-h-[100dvh] w-full overflow-x-hidden select-none"
    >
      {/* Full-bleed Imperative Three.js WebGL2 Canvas */}
      <WebGLCanvas
        activeEffectId={activeEffectId}
        controls={controls}
        resetSignal={resetSignal}
        activePalette={activePalette}
        onFirstInteraction={handleFirstInteraction}
        onTelemetryUpdate={setTelemetry}
      />

      {/* Top Navigation & Live Telemetry Bar */}
      <HeaderBar
        activeEffect={activeEffect}
        telemetry={telemetry}
        inspectOpen={inspectOpen}
        tuneOpen={tuneOpen}
        onToggleInspect={() => setInspectOpen((v) => !v)}
        onToggleTune={() => setTuneOpen((v) => !v)}
        onOpenExport={() => setExportOpen(true)}
        introReady={introReady}
      />

      {/* Left-aligned Editorial Hero Copy & Material Controls */}
      <HeroOverlay
        activeEffect={activeEffect}
        activePalette={activePalette}
        controls={controls}
        hasInteracted={hasInteracted}
        copiedSnippet={copiedSnippet}
        tuneOpen={tuneOpen}
        onExploreMaterials={handleExploreMaterials}
        onCopyBackground={handleCopyBackground}
        onToggleTune={() => setTuneOpen((v) => !v)}
        onSelectPalette={setPaletteIndex}
        onResetSurface={handleReset}
      />

      {/* Bottom 01-08 Material Selector Dock */}
      <BackgroundSwitcher
        effects={effectsCatalog}
        activeEffectId={activeEffectId}
        dockCollapsed={dockCollapsed}
        dockHighlightPulse={dockHighlightPulse}
        onSelectEffect={handleSelectEffect}
        onToggleDockCollapse={() => setDockCollapsed((v) => !v)}
      />

      {/* Expandable Tune Drawer */}
      <TunePanel
        open={tuneOpen}
        activeEffect={activeEffect}
        controls={controls}
        inspectOpen={inspectOpen}
        fullscreenSupported={fullscreenSupported}
        onClose={() => setTuneOpen(false)}
        onChangeInteraction={setInteraction}
        onChangeSpeed={setSpeed}
        onSelectPalette={setPaletteIndex}
        onChangeQuality={setQuality}
        onTogglePause={() => setPaused((p) => !p)}
        onReset={handleReset}
        onToggleInspect={() => setInspectOpen((v) => !v)}
        onToggleFullscreen={handleToggleFullscreen}
        onCopySnippet={handleCopyBackground}
        onDownloadBundle={handleDownloadBundle}
      />

      {/* Live WebGL Telemetry Inspector */}
      <InspectOverlay
        open={inspectOpen}
        telemetry={telemetry}
        onClose={() => setInspectOpen(false)}
      />

      {/* Reusable Source Code & ZIP Bundle Modal */}
      <ExportModal
        open={exportOpen}
        activeEffect={activeEffect}
        interaction={interaction}
        speed={speed}
        paletteIndex={paletteIndex}
        onClose={() => setExportOpen(false)}
      />
    </main>
  );
}
