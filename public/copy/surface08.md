<template slug="surface08" name="SURFACE/08">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(surface08)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import "./surface08/surface08.css";

export const metadata: Metadata = {
  title: "SURFACE/08 — Interactive WebGL Background Laboratory",
  description: "An interactive material study and hero-background laboratory featuring eight real-time GPU-driven Three.js surfaces: Chroma Fluid, Fluted Light, Silk Atmosphere, Glass Lens, Aurora Field, Chromatic Ribbons, Bokeh Reactor, and Refraction Field.",
  openGraph: {
    title: "SURFACE/08 — Interactive WebGL Background Laboratory",
    description: "An interactive material study and hero-background laboratory featuring eight real-time GPU-driven Three.js surfaces: Chroma Fluid, Fluted Light, Silk Atmosphere, Glass Lens, Aurora Field, Chromatic Ribbons, Bokeh Reactor, and Refraction Field.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
};

export default function Surface08Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(surface08)/surface08/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/surface08";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className }: PictureProps) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div
        className={`surface08-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
      </div>
    );
  }
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0B0B0B" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#F4F0E8" text-anchor="middle">S</text>
</svg>
]]>
    </file>
    <file path="src/app/(surface08)/surface08/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SURFACE/08 — Interactive WebGL Background Laboratory";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0B0B0B",
          color: "#F4F0E8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>SURFACE/08</span>
          <span style={{ color: "#A65D46" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            SURFACE/08 — Interactive WebGL Background Laboratory
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            An interactive material study and hero-background laboratory featuring eight real-time GPU-driven Three.js surfaces: Chroma Fluid, Fluted Light, Silk Atmosphere, Glass Lens, Aurora Field, Chromatic Ribbons, Bokeh Reactor, and Refraction Field.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#A65D46" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/page.tsx">
<![CDATA["use client";

import Surface08App from "./Surface08App";

export default function Surface08Page() {
  return <Surface08App />;
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/surface08.css">
<![CDATA[@import "tailwindcss";

]]>
    </file>
    <file path="src/app/(surface08)/surface08/Surface08App.tsx">
<![CDATA['use client';

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
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/BackgroundSwitcher.tsx">
<![CDATA['use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { BackgroundEffect, EffectId } from '../engine/effectTypes';

export interface BackgroundSwitcherProps {
  effects: BackgroundEffect[];
  activeEffectId: EffectId;
  dockCollapsed: boolean;
  dockHighlightPulse: boolean;
  onSelectEffect: (id: EffectId) => void;
  onToggleDockCollapse: () => void;
}

function EffectGlyph({ id, active }: { id: EffectId; active: boolean }) {
  const strokeColor = active ? '#08090d' : 'currentColor';
  switch (id) {
    case 'chroma-fluid':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 10C4.5 6 7 12 9.5 7.5C11.5 4 13 8 14 5"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="5" cy="5" r="1.5" fill={strokeColor} />
        </svg>
      );
    case 'fluted-light':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 2.5V13.5M6.3 2.5V13.5M9.6 2.5V13.5M13 2.5V13.5"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'silk-atmosphere':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 6C5 3 11 9 14 6M2 10.5C5 7.5 11 13.5 14 10.5"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'glass-lens':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <ellipse cx="8" cy="8" rx="5.5" ry="4.5" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M5.5 6.5C6.5 5.3 8.5 5.3 9.5 6.5" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'aurora-field':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 12C5 9 7 11 14 7M3 8.5C6 5.5 9 7.5 13 4"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'chromatic-ribbons':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <path
            d="M2.5 13L13.5 3M2.5 9L9 2.5M7 13.5L13.5 7"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'bokeh-reactor':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="8.5" r="3.5" stroke={strokeColor} strokeWidth="1.4" />
          <circle cx="10.5" cy="6.5" r="2.5" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      );
    case 'refraction-field':
      return (
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
          <polygon points="8,2 14,6 11.5,13.5 4.5,13.5 2,6" stroke={strokeColor} strokeWidth="1.3" />
          <path d="M8 2L8 13.5M2 6L14 6" stroke={strokeColor} strokeWidth="1.1" />
        </svg>
      );
  }
}

export function BackgroundSwitcher({
  effects,
  activeEffectId,
  dockCollapsed,
  dockHighlightPulse,
  onSelectEffect,
  onToggleDockCollapse,
}: BackgroundSwitcherProps) {
  return (
    <section
      aria-label="Material Surface Selector Dock"
      className="relative z-20 mx-auto w-full max-w-[1380px] px-4 sm:px-8 pb-4 sm:pb-6 pointer-events-auto"
      data-ui-interactive="true"
    >
      {/* Top tab to collapse/expand bottom dock for unobstructed Zen inspection */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[11px] font-tech-mono tracking-[0.12em] text-white/60">
          MATERIAL GALLERY · KEYS 1–8 TO SWITCH
        </div>
        <button
          type="button"
          onClick={onToggleDockCollapse}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-tech-mono text-white/75 hover:text-white bg-[#0d1018]/90 border border-white/15 rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Show Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              <span>Hide Dock</span>
            </>
          )}
        </button>
      </div>

      {!dockCollapsed && (
        <div
          className={`rounded-xl border transition-all duration-300 bg-[#0a0c12]/92 p-2 sm:p-2.5 shadow-2xl ${
            dockHighlightPulse ? 'border-[#ff6b4a]' : 'border-white/15'
          }`}
        >
          {/* Responsive selector gallery: horizontal scroll on small screens, 4x2 architectural gallery on tablet/desktop */}
          <div
            role="tablist"
            aria-label="Eight Interactive WebGL Surfaces"
            className="flex md:grid md:grid-cols-4 gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar"
          >
            {effects.map((eff) => {
              const isActive = eff.id === activeEffectId;
              return (
                <button
                  key={eff.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectEffect(eff.id)}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b4a] ${
                    isActive
                      ? 'bg-[#f4f1ea] text-[#08090d] font-semibold shadow-sm'
                      : 'bg-[#121520]/85 text-white/80 hover:bg-[#191d2b] hover:text-white border border-white/10'
                  }`}
                >
                  <EffectGlyph id={eff.id} active={isActive} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-tech-mono leading-tight">
                      <span className={isActive ? 'text-[#08090d]/70 font-bold' : 'text-[#ff9b7a]'}>
                        {eff.indexNumber}
                      </span>
                      <span className="tracking-wider">{eff.label}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/ExportModal.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, FileCode } from 'lucide-react';
import type { BackgroundEffect } from '../engine/effectTypes';
import { getExportBundleForEffect } from '../export/componentSourceRegistry';
import { copyTextToClipboard, downloadEffectZipBundle } from '../export/exportBundle';

export interface ExportModalProps {
  open: boolean;
  activeEffect: BackgroundEffect;
  interaction: number;
  speed: number;
  paletteIndex: number;
  onClose: () => void;
}

export function ExportModal({
  open,
  activeEffect,
  interaction,
  speed,
  paletteIndex,
  onClose,
}: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<'snippet' | 'source' | 'readme'>('snippet');
  const [copied, setCopied] = useState(false);
  const [downloadedZipName, setDownloadedZipName] = useState<string | null>(null);

  if (!open) return null;

  const bundle = getExportBundleForEffect(activeEffect, interaction, speed, paletteIndex);

  const displayedCode =
    activeTab === 'snippet'
      ? bundle.integrationSnippet
      : activeTab === 'source'
      ? bundle.standaloneComponentCode
      : bundle.readmeMarkdown;

  const handleCopyCode = async () => {
    const ok = await copyTextToClipboard(displayedCode);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownloadZip = async () => {
    const filename = await downloadEffectZipBundle(
      activeEffect,
      interaction,
      speed,
      paletteIndex
    );
    setDownloadedZipName(filename);
    setTimeout(() => setDownloadedZipName(null), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75"
      data-ui-interactive="true"
    >
      <div className="relative flex flex-col w-full max-w-3xl max-h-[86vh] rounded-xl border border-white/20 bg-[#0b0d14] text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 id="export-modal-title" className="text-base font-semibold text-white">
              Export Reusable Surface · {activeEffect.indexNumber} {activeEffect.label}
            </h2>
            <p className="text-xs text-white/60 mt-0.5">
              Self-contained React + TypeScript + Three.js module (`npm install three @types/three`)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Export Dialog"
            className="p-1.5 text-white/65 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mode Tabs & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#10131e] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('snippet')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'snippet'
                  ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                  : 'text-white/70 hover:text-white bg-white/5'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Integration Snippet</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('source')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'source'
                  ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                  : 'text-white/70 hover:text-white bg-white/5'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>{bundle.componentName}.tsx</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('readme')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'readme'
                  ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                  : 'text-white/70 hover:text-white bg-white/5'
              }`}
            >
              <span>README.md</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#181d2c] hover:bg-[#22293d] border border-white/15 text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadZip}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#ff6b4a] hover:bg-[#ff8164] text-[#08090d] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5" />
              <span>
                {downloadedZipName ? `Saved ${downloadedZipName}` : 'Download .ZIP Bundle'}
              </span>
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-auto p-6 bg-[#07090e]">
          <pre className="text-xs font-tech-mono leading-relaxed text-white/90 overflow-x-auto">
            <code>{displayedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/HeaderBar.tsx">
<![CDATA['use client';

import React from 'react';
import Image from 'next/image';
import type { BackgroundEffect, TelemetryStats } from '../engine/effectTypes';

export interface HeaderBarProps {
  activeEffect: BackgroundEffect;
  telemetry: TelemetryStats;
  inspectOpen: boolean;
  tuneOpen: boolean;
  onToggleInspect: () => void;
  onToggleTune: () => void;
  onOpenExport: () => void;
  introReady: boolean;
}

export function HeaderBar({
  activeEffect,
  telemetry,
  inspectOpen,
  tuneOpen,
  onToggleInspect,
  onToggleTune,
  onOpenExport,
  introReady,
}: HeaderBarProps) {
  return (
    <header
      className={`relative z-20 flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-8 py-4 border-b border-white/10 bg-[#08090d]/70 transition-transform duration-500 ${
        introReady ? 'translate-y-0' : '-translate-y-2'
      }`}
      data-ui-interactive="true"
    >
      {/* Zone 1: Single brand lockup */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
        }}
        className="flex items-center gap-2.5 text-sm sm:text-base font-bold tracking-wider text-[#f4f1ea] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff6b4a]"
      >
        <Image
          src="/templates/surface08/surface08-mark.svg"
          alt="SURFACE/08 Optical Prism Mark"
          width={20}
          height={20}
          className="h-5 w-5 shrink-0"
          referrerPolicy="no-referrer"
        />
        <span className="font-display-face tracking-[0.14em]">SURFACE/08</span>
      </a>

      {/* Zone 2: Clean single-line navigation & telemetry links */}
      <nav
        aria-label="Laboratory Navigation"
        className="hidden md:flex items-center gap-6 text-xs font-medium text-white/70"
      >
        <span className="font-tech-mono text-white/55 whitespace-nowrap shrink-0">
          INTERACTIVE FIELD NOTES · {activeEffect.indexNumber} {activeEffect.label}
        </span>
        <span aria-hidden="true" className="text-white/25">
          /
        </span>
        <span
          className="font-tech-mono text-white/80 whitespace-nowrap shrink-0"
          data-testid="live-fps-readout"
        >
          {telemetry.fps} FPS · {telemetry.effectiveQuality.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onToggleInspect}
          aria-pressed={inspectOpen}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-4 ${
            inspectOpen ? 'text-[#ff8a65] underline' : 'text-white/75'
          }`}
        >
          Inspect Telemetry
        </button>
        <button
          type="button"
          onClick={onToggleTune}
          aria-pressed={tuneOpen}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-4 ${
            tuneOpen ? 'text-[#ff8a65] underline' : 'text-white/75'
          }`}
        >
          Tune Parameters
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenExport}
          className="px-3.5 py-2 text-xs font-medium text-[#08090d] bg-[#f4f1ea] hover:bg-white rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Export Source
        </button>
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/HeroOverlay.tsx">
<![CDATA['use client';

import React from 'react';
import { SlidersHorizontal, Copy, Check, Compass, RotateCcw } from 'lucide-react';
import type {
  BackgroundEffect,
  EffectControls,
  Palette,
} from '../engine/effectTypes';

export interface HeroOverlayProps {
  activeEffect: BackgroundEffect;
  activePalette: Palette;
  controls: EffectControls;
  hasInteracted: boolean;
  copiedSnippet: boolean;
  tuneOpen: boolean;
  onExploreMaterials: () => void;
  onCopyBackground: () => void;
  onToggleTune: () => void;
  onSelectPalette: (index: number) => void;
  onResetSurface: () => void;
}

export function HeroOverlay({
  activeEffect,
  activePalette,
  controls,
  hasInteracted,
  copiedSnippet,
  tuneOpen,
  onExploreMaterials,
  onCopyBackground,
  onToggleTune,
  onSelectPalette,
  onResetSurface,
}: HeroOverlayProps) {
  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-5 sm:pt-8 pb-4 pointer-events-none">
      {/* Upper-left / left third editorial focal anchor; right 55-65% stays an open reactive canvas */}
      <div className="max-w-xl lg:max-w-2xl">
        {/* Eyebrow metadata — clean unboxed text with typographic separators */}
        <div
          className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-tech-mono tracking-[0.16em] text-white/75 animate-mask-right"
          style={{ animationDelay: '0.1s' }}
        >
          <span>AN INTERACTIVE MATERIAL STUDY</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#ff9b7a]" data-testid="active-surface-badge">
            {activeEffect.indexNumber} {activeEffect.label}
          </span>
          <span aria-hidden="true">·</span>
          <span>PALETTE: {activePalette.name}</span>
        </div>

        {/* Architectural horizontal rule sweep */}
        <div className="mt-3 mb-4 h-px w-full max-w-md bg-white/20 animate-frame-sweep" />

        {/* Editorial Headline */}
        <div className="overflow-hidden">
          <h1
            className="font-display-face text-[clamp(2.35rem,5.2vw,4.35rem)] font-bold leading-[0.98] tracking-[-0.03em] text-[#f8f6f0] animate-mask-up"
            style={{ textWrap: 'balance', animationDelay: '0.2s' }}
          >
            THE BACKGROUND IS ALIVE.
          </h1>
        </div>

        {/* Dynamic Material Accent Sub-Headline in Editorial Serif Italic */}
        <div className="mt-2 overflow-hidden">
          <p
            key={activeEffect.id}
            className="font-editorial-serif italic text-2xl sm:text-3xl lg:text-4xl font-medium tracking-wide text-[#ffd2be] animate-mask-right"
            data-testid="active-headline-accent"
          >
            {activeEffect.headlineAccent}
          </p>
        </div>

        {/* Supporting Editorial Copy */}
        <p
          className="mt-3.5 max-w-lg text-sm sm:text-base leading-relaxed text-white/85 animate-mask-up"
          style={{ animationDelay: '0.35s' }}
        >
          Eight experimental surfaces. Move through color, light, glass and motion.{' '}
          <span className="text-white/65">{activeEffect.shortDescription}</span>
        </p>

        {/* Contextual Real Interaction Hint */}
        <div
          key={`hint-${activeEffect.id}`}
          className="mt-3 text-[11px] sm:text-xs font-tech-mono tracking-[0.1em] text-white/70 animate-mask-right"
          data-testid="active-interaction-hint"
        >
          {activeEffect.helpText}
        </div>

        {/* Action Controls Row */}
        <div
          className="mt-5 flex flex-wrap items-center gap-3 pointer-events-auto animate-mask-up"
          style={{ animationDelay: '0.45s' }}
          data-ui-interactive="true"
        >
          <button
            type="button"
            onClick={onExploreMaterials}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#08090d] bg-[#f4f1ea] hover:bg-white rounded-md transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Compass className="h-4 w-4 shrink-0" />
            <span>EXPLORE MATERIALS</span>
          </button>

          <button
            type="button"
            onClick={onCopyBackground}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#12151f]/90 hover:bg-[#1a1f2e] border border-white/20 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {copiedSnippet ? (
              <>
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300">COPIED {activeEffect.label} SNIPPET</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-white/75 shrink-0" />
                <span>COPY THIS BACKGROUND</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleTune}
            aria-expanded={tuneOpen}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              tuneOpen
                ? 'bg-[#ff6b4a] text-[#08090d] border-[#ff6b4a] font-semibold'
                : 'bg-[#12151f]/85 text-white/85 border-white/15 hover:border-white/35 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            <span>TUNE</span>
          </button>

          <button
            type="button"
            onClick={onResetSurface}
            title="Reset active material simulation and controls"
            aria-label="Reset Surface"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-white/75 hover:text-white bg-[#12151f]/80 border border-white/15 hover:border-white/30 rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">RESET</span>
          </button>
        </div>

        {/* Quick Palette Selector Strip for Active Surface */}
        <div
          className="mt-4 flex flex-wrap items-center gap-2 pointer-events-auto"
          data-ui-interactive="true"
        >
          <span className="text-[11px] font-tech-mono text-white/55 mr-1">PALETTE</span>
          {activeEffect.palettes.map((pal, idx) => {
            const isSelected = controls.paletteIndex % activeEffect.palettes.length === idx;
            return (
              <button
                key={pal.id}
                type="button"
                onClick={() => onSelectPalette(idx)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-tech-mono transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-white/15 text-white border-white/45'
                    : 'bg-[#0e1017]/80 text-white/65 border-white/10 hover:border-white/25 hover:text-white/90'
                }`}
              >
                <span className="flex items-center -space-x-1" aria-hidden="true">
                  {pal.swatches.slice(0, 3).map((hex, sIdx) => (
                    <span
                      key={sIdx}
                      className="h-2.5 w-2.5 rounded-full border border-black/40"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </span>
                <span>{pal.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Instructional Cursor Cue — disappears with a directional line-clipped wipe after first real interaction */}
      <div className="mt-4 flex items-center justify-between">
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            hasInteracted
              ? 'max-w-0 opacity-0 -translate-x-4'
              : 'max-w-xs opacity-100 translate-x-0'
          }`}
          aria-live="polite"
        >
          <div className="inline-flex items-center gap-2.5 text-[11px] font-tech-mono tracking-[0.14em] text-white/75 whitespace-nowrap">
            <span className="h-px w-6 bg-[#ff6b4a]" />
            <span className="hidden sm:inline">TRY MOVING OR DRAGGING YOUR CURSOR</span>
            <span className="sm:hidden">DRAG THE SURFACE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/InspectOverlay.tsx">
<![CDATA['use client';

import React from 'react';
import { X } from 'lucide-react';
import type { TelemetryStats } from '../engine/effectTypes';

export interface InspectOverlayProps {
  open: boolean;
  telemetry: TelemetryStats;
  onClose: () => void;
}

export function InspectOverlay({ open, telemetry, onClose }: InspectOverlayProps) {
  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="WebGL Telemetry Inspector"
      className="fixed top-16 right-4 sm:right-8 z-30 w-72 rounded-xl border border-white/15 bg-[#0a0c14]/95 p-4 text-xs font-tech-mono text-white/85 shadow-2xl"
      data-ui-interactive="true"
      data-testid="inspect-telemetry-overlay"
    >
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
        <span className="font-semibold tracking-wider text-white">GPU TELEMETRY INSPECTOR</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Telemetry Inspector"
          className="p-1 text-white/60 hover:text-white rounded cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <dl className="space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <dt className="text-white/55">ACTIVE SURFACE</dt>
          <dd className="text-[#ff9b7a] font-semibold">{telemetry.activeEffectId}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">MEASURED FPS</dt>
          <dd className="text-white font-semibold">
            {telemetry.fps} FPS ({telemetry.frameTimeMs} ms)
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">RENDER BUFFER</dt>
          <dd className="text-white">
            {telemetry.width} × {telemetry.height} px
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">DEVICE PIXEL RATIO</dt>
          <dd className="text-white">
            {telemetry.dpr}x ({telemetry.effectiveQuality.toUpperCase()})
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">DRAW CALLS / TRIS</dt>
          <dd className="text-white">
            {telemetry.drawCalls} calls · {telemetry.triangles} tris
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">VRAM RESOURCES</dt>
          <dd className="text-white">
            {telemetry.textures} tex · {telemetry.geometries} geo
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">POINTER UV / VEL</dt>
          <dd className="text-white">
            ({telemetry.pointerUv[0].toFixed(2)}, {telemetry.pointerUv[1].toFixed(2)}) ·{' '}
            {telemetry.pointerSpeed.toFixed(2)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">TRANSITION PASS</dt>
          <dd className="text-white/80">
            {telemetry.inTransition ? telemetry.transitionFamily : 'SETTLED'}
          </dd>
        </div>
      </dl>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/TunePanel.tsx">
<![CDATA['use client';

import React from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Copy,
  Download,
  Activity,
} from 'lucide-react';
import type {
  BackgroundEffect,
  EffectControls,
  QualityPreset,
} from '../engine/effectTypes';

export interface TunePanelProps {
  open: boolean;
  activeEffect: BackgroundEffect;
  controls: EffectControls;
  inspectOpen: boolean;
  fullscreenSupported: boolean;
  onClose: () => void;
  onChangeInteraction: (value: number) => void;
  onChangeSpeed: (value: number) => void;
  onSelectPalette: (index: number) => void;
  onChangeQuality: (quality: QualityPreset) => void;
  onTogglePause: () => void;
  onReset: () => void;
  onToggleInspect: () => void;
  onToggleFullscreen: () => void;
  onCopySnippet: () => void;
  onDownloadBundle: () => void;
}

const QUALITY_OPTIONS: { id: QualityPreset; label: string }[] = [
  { id: 'auto', label: 'Auto' },
  { id: 'high', label: 'High' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'low', label: 'Low' },
];

export function TunePanel({
  open,
  activeEffect,
  controls,
  inspectOpen,
  fullscreenSupported,
  onClose,
  onChangeInteraction,
  onChangeSpeed,
  onSelectPalette,
  onChangeQuality,
  onTogglePause,
  onReset,
  onToggleInspect,
  onToggleFullscreen,
  onCopySnippet,
  onDownloadBundle,
}: TunePanelProps) {
  if (!open) return null;

  return (
    <aside
      aria-label="Surface Tuning Controls"
      className="fixed bottom-24 left-4 sm:left-8 z-30 w-[calc(100vw-2rem)] max-w-md rounded-xl border border-white/15 bg-[#0b0d14]/96 p-5 shadow-2xl text-white"
      data-ui-interactive="true"
    >
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Tune Surface · {activeEffect.indexNumber} {activeEffect.label}
          </h2>
          <p className="text-[11px] font-tech-mono text-white/55 mt-0.5">
            REAL-TIME GPU UNIFORMS & SIMULATION FORCES
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Tune Panel"
          className="p-1.5 text-white/65 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Interaction Strength Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label htmlFor="slider-interaction" className="font-medium text-white/85">
              Interaction Strength
            </label>
            <span className="font-tech-mono text-white/80" data-testid="interaction-value">
              {controls.interaction}%
            </span>
          </div>
          <input
            id="slider-interaction"
            type="range"
            min={0}
            max={100}
            step={1}
            value={controls.interaction}
            onChange={(e) => onChangeInteraction(Number(e.target.value))}
            className="w-full accent-[#ff6b4a] cursor-pointer"
          />
        </div>

        {/* Motion Speed Slider */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label htmlFor="slider-speed" className="font-medium text-white/85">
              Ambient Motion Speed
            </label>
            <span className="font-tech-mono text-white/80" data-testid="speed-value">
              {controls.speed}%
            </span>
          </div>
          <input
            id="slider-speed"
            type="range"
            min={0}
            max={100}
            step={1}
            value={controls.speed}
            onChange={(e) => onChangeSpeed(Number(e.target.value))}
            className="w-full accent-[#ff6b4a] cursor-pointer"
          />
        </div>

        {/* Authored Palettes */}
        <div>
          <span className="block text-xs font-medium text-white/85 mb-2">
            Material Palette Presets
          </span>
          <div className="grid grid-cols-3 gap-2">
            {activeEffect.palettes.map((pal, idx) => {
              const isSelected = controls.paletteIndex % activeEffect.palettes.length === idx;
              return (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => onSelectPalette(idx)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-start gap-1.5 p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 border-white/55 text-white'
                      : 'bg-[#121622] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {pal.swatches.map((hex, sIdx) => (
                      <span
                        key={sIdx}
                        className="h-3 w-3 rounded-full border border-black/30"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-tech-mono truncate w-full">{pal.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quality Preset */}
        <div>
          <span className="block text-xs font-medium text-white/85 mb-2">
            Render Quality & DPR Target
          </span>
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-lg bg-[#121622] border border-white/10">
            {QUALITY_OPTIONS.map((opt) => {
              const active = controls.quality === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeQuality(opt.id)}
                  aria-pressed={active}
                  className={`py-1.5 px-2 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#f4f1ea] text-[#08090d] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulation State Actions: Pause, Reset, Inspect, Fullscreen */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            type="button"
            onClick={onTogglePause}
            aria-pressed={controls.paused}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-[#151926] hover:bg-[#1d2233] border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
          >
            {controls.paused ? (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-400" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-amber-300" />
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-[#151926] hover:bg-[#1d2233] border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onToggleInspect}
            aria-pressed={inspectOpen}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
              inspectOpen
                ? 'bg-[#ff6b4a]/20 border-[#ff6b4a] text-[#ff9b7a]'
                : 'bg-[#151926] hover:bg-[#1d2233] border-white/15 text-white'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Inspect</span>
          </button>

          {fullscreenSupported && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-xs font-medium bg-[#151926] hover:bg-[#1d2233] border border-white/15 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Fullscreen</span>
            </button>
          )}
        </div>

        {/* Reusable Export Actions */}
        <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCopySnippet}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-medium bg-[#161b29] hover:bg-[#1e2538] border border-white/20 text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Snippet</span>
          </button>

          <button
            type="button"
            onClick={onDownloadBundle}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold bg-[#f4f1ea] hover:bg-white text-[#08090d] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .ZIP</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/components/WebGLCanvas.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type {
  EffectControls,
  EffectId,
  Palette,
  TelemetryStats,
} from '../engine/effectTypes';
import { EffectController } from '../engine/EffectController';
import { InputField } from '../engine/InputField';
import { checkWebGL2Available, QualityManager } from '../engine/QualityManager';

export interface WebGLCanvasProps {
  activeEffectId: EffectId;
  controls: EffectControls;
  resetSignal: number;
  activePalette: Palette;
  onFirstInteraction: () => void;
  onTelemetryUpdate: (stats: TelemetryStats) => void;
}

export function WebGLCanvas({
  activeEffectId,
  controls,
  resetSignal,
  activePalette,
  onFirstInteraction,
  onTelemetryUpdate,
}: WebGLCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  // Store latest props in refs inside effects so React HUD updates never tear down the WebGL context
  const controlsRef = useRef<EffectControls>(controls);
  const activeEffectIdRef = useRef<EffectId>(activeEffectId);
  const controllerRef = useRef<EffectController | null>(null);
  const inputFieldRef = useRef<InputField | null>(null);
  const onFirstInteractionRef = useRef(onFirstInteraction);
  const onTelemetryUpdateRef = useRef(onTelemetryUpdate);

  useEffect(() => {
    controlsRef.current = controls;
    onFirstInteractionRef.current = onFirstInteraction;
    onTelemetryUpdateRef.current = onTelemetryUpdate;
  }, [controls, onFirstInteraction, onTelemetryUpdate]);

  // Trigger effect switch when activeEffectId changes
  useEffect(() => {
    activeEffectIdRef.current = activeEffectId;
    if (controllerRef.current) {
      controllerRef.current.switchTo(activeEffectId, controlsRef.current.reducedMotion);
    }
  }, [activeEffectId]);

  // Trigger reset when resetSignal increments
  useEffect(() => {
    if (resetSignal > 0) {
      controllerRef.current?.resetActive();
      inputFieldRef.current?.reset();
    }
  }, [resetSignal]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!checkWebGL2Available()) {
      const id = requestAnimationFrame(() => setWebglUnavailable(true));
      return () => cancelAnimationFrame(id);
    }

    const qualityManager = new QualityManager();
    const isSoftwareGl = qualityManager.isSoftwareGl;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
        preserveDrawingBuffer: true,
      });
    } catch {
      const id = requestAnimationFrame(() => setWebglUnavailable(true));
      return () => cancelAnimationFrame(id);
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const initialWidth = Math.max(320, container.clientWidth || window.innerWidth);
    const initialHeight = Math.max(320, container.clientHeight || window.innerHeight);

    qualityManager.setPreset(controlsRef.current.quality);
    const initialQuality = qualityManager.getEffectiveSettings(window.devicePixelRatio || 1);

    renderer.setPixelRatio(initialQuality.dpr);
    renderer.setSize(initialWidth, initialHeight);
    renderer.domElement.className = 'block h-full w-full';
    renderer.domElement.setAttribute('data-testid', 'surface08-webgl-canvas');
    container.appendChild(renderer.domElement);

    const controller = new EffectController(activeEffectIdRef.current);
    controller.init({
      renderer,
      width: initialWidth,
      height: initialHeight,
      pixelRatio: initialQuality.dpr,
      isSoftwareGl,
    });
    controllerRef.current = controller;

    const inputField = new InputField(() => {
      onFirstInteractionRef.current();
    });
    inputField.attach(container);
    inputFieldRef.current = inputField;

    let currentDpr = initialQuality.dpr;
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(240, container.clientWidth || window.innerWidth);
      const h = Math.max(240, container.clientHeight || window.innerHeight);
      const q = qualityManager.getEffectiveSettings(window.devicePixelRatio || 1);
      currentDpr = q.dpr;
      renderer.setPixelRatio(currentDpr);
      renderer.setSize(w, h);
      controller.resize(w, h, currentDpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const handleContextRestored = () => {
      setWebglUnavailable(false);
      handleResize();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    let isTabHidden = document.hidden;
    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let frameId = 0;
    let timeoutId = 0;
    let lastTime = performance.now();
    let elapsedSim = 0;
    let lastTelemetryTime = 0;

    // Software WebGL fenceSync pacing so headless Chromium never stalls
    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        timeoutId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (!sync) {
          timeoutId = window.setTimeout(cb, 80);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 80);
        }
      };
      timeoutId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      const now = performance.now();
      const wallDt = Math.max(0.001, Math.min((now - lastTime) / 1000, 0.35));
      const rawDt = Math.max(0.001, Math.min(wallDt, 0.08));
      lastTime = now;

      if (!isTabHidden) {
        const ctrl = controlsRef.current;
        qualityManager.setPreset(ctrl.quality);
        qualityManager.recordFrame(wallDt);

        const qSettings = qualityManager.getEffectiveSettings(window.devicePixelRatio || 1);
        if (Math.abs(qSettings.dpr - currentDpr) > 0.05) {
          currentDpr = qSettings.dpr;
          const w = Math.max(240, container.clientWidth || window.innerWidth);
          const h = Math.max(240, container.clientHeight || window.innerHeight);
          renderer.setPixelRatio(currentDpr);
          renderer.setSize(w, h);
          controller.resize(w, h, currentDpr);
        }

        const inputState = inputField.update(rawDt, ctrl.reducedMotion);
        if (!ctrl.paused && !ctrl.reducedMotion) {
          elapsedSim += rawDt;
        } else if (ctrl.reducedMotion && elapsedSim === 0) {
          elapsedSim = 2.4;
        }

        controller.updateAndRender(renderer, rawDt, elapsedSim, inputState, ctrl, wallDt);

        // Throttle telemetry updates to ~4Hz so React UI stays effortless
        if (now - lastTelemetryTime > 260) {
          lastTelemetryTime = now;
          const { fps, frameTimeMs } = qualityManager.getMeasuredStats();
          const activeEff = controller.getActiveEffect();
          onTelemetryUpdateRef.current({
            fps,
            frameTimeMs,
            activeEffectId: activeEff.id,
            activeEffectLabel: activeEff.label,
            inTransition: controller.isInTransition(),
            transitionFamily: controller.transitionFamilyName,
            width: renderer.domElement.width,
            height: renderer.domElement.height,
            dpr: Math.round(currentDpr * 100) / 100,
            qualityTier: ctrl.quality,
            effectiveQuality: qSettings.effectiveTier,
            isSoftwareGl,
            drawCalls: renderer.info.render.calls,
            triangles: renderer.info.render.triangles,
            textures: renderer.info.memory.textures,
            geometries: renderer.info.memory.geometries,
            pointerUv: [
              Math.round(inputState.x * 100) / 100,
              Math.round(inputState.y * 100) / 100,
            ],
            pointerSpeed: Math.round(inputState.speed * 100) / 100,
          });
        }
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      inputField.detach();
      controller.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden">
      {/* Dedicated empty mount ref for Three.js WebGLRenderer */}
      <div
        ref={mountRef}
        className="h-full w-full"
        aria-label="Interactive Three.js WebGL material background"
      />

      {/* Graceful static fallback if WebGL2 is unavailable or context is lost */}
      {webglUnavailable && (
        <div
          className="absolute inset-0 flex flex-col justify-end p-8 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 68% 45%, ${activePalette.swatches[0]}55 0%, ${activePalette.swatches[1]}44 35%, ${activePalette.swatches[2]}33 65%, ${activePalette.bgHex} 100%)`,
          }}
          data-testid="webgl-fallback"
        >
          <div className="max-w-md rounded-lg border border-white/15 bg-[#0b0d14]/90 p-4 text-xs text-white/80">
            <p className="font-semibold text-white">WebGL2 Hardware Context Unavailable</p>
            <p className="mt-1 text-white/65">
              Displaying calibrated static chromatic fallback for {activePalette.name}. Enable WebGL2
              to interact with the live GPU shader field.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/EffectController.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  EffectId,
  InputState,
} from './effectTypes';
import { selectTransitionFamily } from './math';
import { TransitionPass } from './passes/TransitionPass';
import { ChromaFluidEffect } from '../effects/chroma-fluid/ChromaFluidEffect';
import { FlutedLightEffect } from '../effects/fluted-light/FlutedLightEffect';
import { SilkAtmosphereEffect } from '../effects/silk-atmosphere/SilkAtmosphereEffect';
import { GlassLensEffect } from '../effects/glass-lens/GlassLensEffect';
import { AuroraFieldEffect } from '../effects/aurora-field/AuroraFieldEffect';
import { ChromaticRibbonsEffect } from '../effects/chromatic-ribbons/ChromaticRibbonsEffect';
import { BokehReactorEffect } from '../effects/bokeh-reactor/BokehReactorEffect';
import { RefractionFieldEffect } from '../effects/refraction-field/RefractionFieldEffect';

export const EFFECT_ORDER: EffectId[] = [
  'chroma-fluid',
  'fluted-light',
  'silk-atmosphere',
  'glass-lens',
  'aurora-field',
  'chromatic-ribbons',
  'bokeh-reactor',
  'refraction-field',
];

export class EffectController {
  private effectsMap = new Map<EffectId, BackgroundEffect>();
  private initializedIds = new Set<EffectId>();
  private context!: EffectContext;

  private activeId: EffectId = 'fluted-light';
  private outgoingId: EffectId | null = null;
  private transitionProgress = 1.0;
  private transitionDuration = 0.85;
  private transitionFamilyId = 0;
  public transitionFamilyName = 'Viscous Fluted Wipe';

  private rtOutgoing!: THREE.WebGLRenderTarget;
  private rtIncoming!: THREE.WebGLRenderTarget;
  private transitionPass!: TransitionPass;

  constructor(initialEffectId: EffectId = 'fluted-light') {
    this.activeId = initialEffectId;
    const instances: BackgroundEffect[] = [
      new ChromaFluidEffect(),
      new FlutedLightEffect(),
      new SilkAtmosphereEffect(),
      new GlassLensEffect(),
      new AuroraFieldEffect(),
      new ChromaticRibbonsEffect(),
      new BokehReactorEffect(),
      new RefractionFieldEffect(),
    ];
    for (const effect of instances) {
      this.effectsMap.set(effect.id, effect);
    }
  }

  public getAllEffects(): BackgroundEffect[] {
    return EFFECT_ORDER.map((id) => this.effectsMap.get(id)!);
  }

  public getEffect(id: EffectId): BackgroundEffect {
    return this.effectsMap.get(id)!;
  }

  public getActiveEffect(): BackgroundEffect {
    return this.effectsMap.get(this.activeId)!;
  }

  public isInTransition(): boolean {
    return this.outgoingId !== null && this.transitionProgress < 1.0;
  }

  public init(context: EffectContext): void {
    this.context = context;
    const rtW = Math.max(64, Math.floor(context.width * context.pixelRatio));
    const rtH = Math.max(64, Math.floor(context.height * context.pixelRatio));

    const rtOptions: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: true,
      stencilBuffer: false,
    };

    this.rtOutgoing = new THREE.WebGLRenderTarget(rtW, rtH, rtOptions);
    this.rtIncoming = new THREE.WebGLRenderTarget(rtW, rtH, rtOptions);
    this.transitionPass = new TransitionPass();
    this.transitionPass.resize(context.width, context.height);

    this.ensureEffectInitialized(this.activeId);
  }

  private ensureEffectInitialized(id: EffectId): BackgroundEffect {
    const effect = this.effectsMap.get(id)!;
    if (!this.initializedIds.has(id)) {
      effect.init(this.context);
      effect.resize(this.context.width, this.context.height, this.context.pixelRatio);
      this.initializedIds.add(id);
    }
    return effect;
  }

  public switchTo(nextId: EffectId, reducedMotion = false): void {
    if (nextId === this.activeId && !this.isInTransition()) return;
    if (nextId === this.activeId && this.isInTransition()) {
      this.outgoingId = null;
      this.transitionProgress = 1.0;
      return;
    }

    this.ensureEffectInitialized(nextId);

    if (reducedMotion) {
      this.activeId = nextId;
      this.outgoingId = null;
      this.transitionProgress = 1.0;
      return;
    }

    const spec = selectTransitionFamily(this.activeId, nextId);
    this.outgoingId = this.activeId;
    this.activeId = nextId;
    this.transitionProgress = 0.0;
    this.transitionDuration = spec.durationSec;
    this.transitionFamilyId = spec.id;
    this.transitionFamilyName = spec.name;
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    this.context.width = width;
    this.context.height = height;
    this.context.pixelRatio = pixelRatio;

    const rtW = Math.max(64, Math.floor(width * pixelRatio));
    const rtH = Math.max(64, Math.floor(height * pixelRatio));
    this.rtOutgoing.setSize(rtW, rtH);
    this.rtIncoming.setSize(rtW, rtH);
    this.transitionPass.resize(width, height);

    for (const id of this.initializedIds) {
      this.effectsMap.get(id)?.resize(width, height, pixelRatio);
    }
  }

  public updateAndRender(
    renderer: THREE.WebGLRenderer,
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls,
    wallDt = dt
  ): void {
    const activeEffect = this.ensureEffectInitialized(this.activeId);

    if (this.outgoingId && this.transitionProgress < 1.0) {
      const effectiveDuration = this.context.isSoftwareGl
        ? Math.min(0.45, this.transitionDuration * 0.55)
        : this.transitionDuration;
      this.transitionProgress = Math.min(
        1.0,
        this.transitionProgress + Math.max(dt, wallDt) / Math.max(0.15, effectiveDuration)
      );

      const outgoingEffect = this.ensureEffectInitialized(this.outgoingId);
      // Update both effects with their respective active palette bounds
      const outgoingControls: EffectControls = {
        ...controls,
        paletteIndex: controls.paletteIndex % outgoingEffect.palettes.length,
      };
      outgoingEffect.update(dt, elapsed, input, outgoingControls);
      activeEffect.update(dt, elapsed, input, controls);

      outgoingEffect.render(renderer, this.rtOutgoing);
      activeEffect.render(renderer, this.rtIncoming);

      this.transitionPass.render(
        renderer,
        this.rtOutgoing.texture,
        this.rtIncoming.texture,
        this.transitionProgress,
        this.transitionFamilyId,
        input.x,
        input.y,
        null
      );

      if (this.transitionProgress >= 1.0) {
        this.outgoingId = null;
      }
    } else {
      activeEffect.update(dt, elapsed, input, controls);
      activeEffect.render(renderer, null);
    }
  }

  public resetActive(): void {
    this.getActiveEffect().reset();
  }

  public dispose(): void {
    for (const id of this.initializedIds) {
      this.effectsMap.get(id)?.dispose();
    }
    this.initializedIds.clear();
    this.rtOutgoing?.dispose();
    this.rtIncoming?.dispose();
    this.transitionPass?.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/effectTypes.ts">
<![CDATA[import * as THREE from 'three';

export type EffectId =
  | 'chroma-fluid'
  | 'fluted-light'
  | 'silk-atmosphere'
  | 'glass-lens'
  | 'aurora-field'
  | 'chromatic-ribbons'
  | 'bokeh-reactor'
  | 'refraction-field';

export type QualityPreset = 'auto' | 'high' | 'balanced' | 'low';

export interface Palette {
  id: string;
  name: string;
  swatches: [string, string, string, string];
  colors: [THREE.Color, THREE.Color, THREE.Color, THREE.Color];
  bgHex: string;
}

export interface EffectControls {
  interaction: number; // 0..100 (default 70)
  speed: number; // 0..100 (default 45)
  paletteIndex: number;
  quality: QualityPreset;
  paused: boolean;
  reducedMotion: boolean;
  introProgress: number; // 0..1 during initial ignition
}

export interface SplatImpulse {
  x: number; // 0..1 UV
  y: number; // 0..1 UV (0 bottom, 1 top)
  vx: number; // normalized velocity X
  vy: number; // normalized velocity Y
  strength: number; // 0..1 decays over time
  radius: number;
  colorIndex: number;
  isClick: boolean;
}

export interface InputState {
  x: number; // 0..1 normalized UV X
  y: number; // 0..1 normalized UV Y (bottom = 0, top = 1)
  rawX: number; // CSS px
  rawY: number; // CSS px
  vx: number; // instantaneous clamped UV velocity X
  vy: number; // instantaneous clamped UV velocity Y
  smoothVx: number; // damped UV velocity X
  smoothVy: number; // damped UV velocity Y
  speed: number; // magnitude of smooth velocity
  isPointerInside: boolean;
  isDown: boolean;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  dragOffsetX: number; // spring-damped drag displacement X (-1..1)
  dragOffsetY: number; // spring-damped drag displacement Y (-1..1)
  clickPulse: number; // 0..1 impulse triggered on click/tap, decays smoothly
  clickX: number;
  clickY: number;
  clickCount: number; // increments on every click/tap (e.g. for focal toggle)
  wheelDelta: number; // damped vertical wheel/touch offset
  splats: SplatImpulse[];
  hasInteracted: boolean;
}

export interface EffectContext {
  renderer: THREE.WebGLRenderer;
  width: number;
  height: number;
  pixelRatio: number;
  isSoftwareGl: boolean;
}

export interface BackgroundEffect {
  readonly id: EffectId;
  readonly indexNumber: string;
  readonly label: string;
  readonly headlineAccent: string;
  readonly shortDescription: string;
  readonly helpText: string;
  readonly category: 'fluid' | 'glass' | 'fabric' | 'lens' | 'field' | 'ribbon' | 'bokeh' | 'facet';
  readonly palettes: Palette[];
  init(context: EffectContext): void;
  resize(width: number, height: number, pixelRatio: number): void;
  update(dt: number, elapsed: number, input: InputState, controls: EffectControls): void;
  render(renderer: THREE.WebGLRenderer, output?: THREE.WebGLRenderTarget | null): void;
  reset(): void;
  dispose(): void;
}

export interface TelemetryStats {
  fps: number;
  frameTimeMs: number;
  activeEffectId: EffectId;
  activeEffectLabel: string;
  inTransition: boolean;
  transitionFamily: string;
  width: number;
  height: number;
  dpr: number;
  qualityTier: QualityPreset;
  effectiveQuality: 'high' | 'balanced' | 'low';
  isSoftwareGl: boolean;
  drawCalls: number;
  triangles: number;
  textures: number;
  geometries: number;
  pointerUv: [number, number];
  pointerSpeed: number;
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/InputField.ts">
<![CDATA[import type { InputState, SplatImpulse } from './effectTypes';
import {
  computeClampedVelocity,
  dampValue,
  normalizePointerToUv,
  stepSpring,
  type SpringState,
} from './math';

export class InputField {
  public state: InputState = {
    x: 0.62,
    y: 0.52,
    rawX: 0,
    rawY: 0,
    vx: 0,
    vy: 0,
    smoothVx: 0,
    smoothVy: 0,
    speed: 0,
    isPointerInside: false,
    isDown: false,
    isDragging: false,
    dragStartX: 0.62,
    dragStartY: 0.52,
    dragOffsetX: 0,
    dragOffsetY: 0,
    clickPulse: 0,
    clickX: 0.62,
    clickY: 0.52,
    clickCount: 0,
    wheelDelta: 0,
    splats: [],
    hasInteracted: false,
  };

  private targetElement: HTMLElement | null = null;
  private hasInitialSample = false;
  private prevU = 0.62;
  private prevV = 0.52;
  private targetU = 0.62;
  private targetV = 0.52;
  private rawDragX = 0;
  private rawDragY = 0;
  private dragSpringX: SpringState = { value: 0, velocity: 0 };
  private dragSpringY: SpringState = { value: 0, velocity: 0 };
  private colorCycle = 0;
  private onFirstInteraction?: () => void;

  constructor(onFirstInteraction?: () => void) {
    this.onFirstInteraction = onFirstInteraction;
  }

  public attach(element: HTMLElement): void {
    this.detach();
    this.targetElement = element;
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', this.handlePointerDown, { passive: true });
    window.addEventListener('pointerup', this.handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', this.handlePointerUp, { passive: true });
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    document.addEventListener('mouseleave', this.handlePointerLeave, { passive: true });
  }

  public detach(): void {
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
    window.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('mouseleave', this.handlePointerLeave);
    this.targetElement = null;
  }

  public reset(): void {
    this.state.x = 0.62;
    this.state.y = 0.52;
    this.targetU = 0.62;
    this.targetV = 0.52;
    this.prevU = 0.62;
    this.prevV = 0.52;
    this.state.vx = 0;
    this.state.vy = 0;
    this.state.smoothVx = 0;
    this.state.smoothVy = 0;
    this.state.speed = 0;
    this.state.isDown = false;
    this.state.isDragging = false;
    this.rawDragX = 0;
    this.rawDragY = 0;
    this.dragSpringX = { value: 0, velocity: 0 };
    this.dragSpringY = { value: 0, velocity: 0 };
    this.state.dragOffsetX = 0;
    this.state.dragOffsetY = 0;
    this.state.clickPulse = 0;
    this.state.wheelDelta = 0;
    this.state.splats = [];
    this.hasInitialSample = false;
  }

  public injectSplat(
    u: number,
    v: number,
    vx: number,
    vy: number,
    strength = 1.0,
    radius = 0.085,
    isClick = false
  ): void {
    this.colorCycle = (this.colorCycle + 1) % 4;
    const splat: SplatImpulse = {
      x: u,
      y: v,
      vx,
      vy,
      strength,
      radius,
      colorIndex: this.colorCycle,
      isClick,
    };
    this.state.splats.unshift(splat);
    if (this.state.splats.length > 8) {
      this.state.splats.length = 8;
    }
  }

  private markInteracted(): void {
    if (!this.state.hasInteracted) {
      this.state.hasInteracted = true;
      this.onFirstInteraction?.();
    }
  }

  private isInteractiveUiTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest('button, a, input, select, textarea, [role="dialog"], [data-ui-interactive="true"]')
    );
  }

  private sampleEventUv(clientX: number, clientY: number): { u: number; v: number } {
    if (!this.targetElement) {
      return { u: 0.5, v: 0.5 };
    }
    const rect = this.targetElement.getBoundingClientRect();
    return normalizePointerToUv(clientX, clientY, rect);
  }

  private handlePointerMove = (e: PointerEvent): void => {
    const { u, v } = this.sampleEventUv(e.clientX, e.clientY);
    this.state.rawX = e.clientX;
    this.state.rawY = e.clientY;
    this.state.isPointerInside = true;

    if (!this.hasInitialSample) {
      this.hasInitialSample = true;
      this.prevU = u;
      this.prevV = v;
      this.targetU = u;
      this.targetV = v;
      this.state.x = u;
      this.state.y = v;
      return;
    }

    const du = u - this.targetU;
    const dv = v - this.targetV;
    const dist = Math.hypot(du, dv);
    if (dist > 0.0015) {
      this.markInteracted();
    }

    this.targetU = u;
    this.targetV = v;

    if (this.state.isDown) {
      this.state.isDragging = true;
      this.rawDragX = Math.max(-0.85, Math.min(0.85, (u - this.state.dragStartX) * 1.65));
      this.rawDragY = Math.max(-0.85, Math.min(0.85, (v - this.state.dragStartY) * 1.65));
    }

    if (dist > 0.004) {
      this.injectSplat(
        u,
        v,
        Math.max(-4, Math.min(4, du * 45)),
        Math.max(-4, Math.min(4, dv * 45)),
        Math.min(1.0, dist * 16.0 + (this.state.isDown ? 0.35 : 0.0)),
        this.state.isDown ? 0.1 : 0.07,
        false
      );
    }
  };

  private handlePointerDown = (e: PointerEvent): void => {
    if (this.isInteractiveUiTarget(e.target)) {
      return;
    }
    const { u, v } = this.sampleEventUv(e.clientX, e.clientY);
    this.markInteracted();
    this.hasInitialSample = true;
    this.targetU = u;
    this.targetV = v;
    this.state.isDown = true;
    this.state.isDragging = false;
    this.state.dragStartX = u;
    this.state.dragStartY = v;
    this.state.clickX = u;
    this.state.clickY = v;
    this.state.clickPulse = 1.0;
    this.state.clickCount += 1;

    this.injectSplat(u, v, 0, 0, 1.35, 0.125, true);
  };

  private handlePointerUp = (): void => {
    this.state.isDown = false;
    this.state.isDragging = false;
    this.rawDragX = 0;
    this.rawDragY = 0;
  };

  private handlePointerLeave = (): void => {
    this.state.isPointerInside = false;
    this.state.isDown = false;
    this.state.isDragging = false;
    this.rawDragX = 0;
    this.rawDragY = 0;
  };

  private handleWheel = (e: WheelEvent): void => {
    if (this.isInteractiveUiTarget(e.target)) return;
    const normalizedWheel = Math.max(-1, Math.min(1, e.deltaY * 0.0018));
    this.state.wheelDelta = Math.max(-1.5, Math.min(1.5, this.state.wheelDelta + normalizedWheel));
  };

  public update(dt: number, reducedMotion: boolean): InputState {
    const safeDt = Math.max(0.001, Math.min(dt, 0.05));

    // Smooth pointer position
    const nextX = dampValue(this.state.x, this.targetU, reducedMotion ? 24 : 16, safeDt);
    const nextY = dampValue(this.state.y, this.targetV, reducedMotion ? 24 : 16, safeDt);

    const { vx, vy } = computeClampedVelocity(this.prevU, this.prevV, nextX, nextY, safeDt, 5.5);
    this.prevU = nextX;
    this.prevV = nextY;

    this.state.x = nextX;
    this.state.y = nextY;
    this.state.vx = vx;
    this.state.vy = vy;
    this.state.smoothVx = dampValue(this.state.smoothVx, vx, 12, safeDt);
    this.state.smoothVy = dampValue(this.state.smoothVy, vy, 12, safeDt);
    this.state.speed = Math.hypot(this.state.smoothVx, this.state.smoothVy);

    // Second-order spring kinematics for drag release with damped overshoot
    if (reducedMotion) {
      this.state.dragOffsetX = this.rawDragX * 0.4;
      this.state.dragOffsetY = this.rawDragY * 0.4;
    } else {
      const stiffness = this.state.isDown ? 180 : 95;
      const damping = this.state.isDown ? 18 : 7.5;
      this.dragSpringX = stepSpring(this.dragSpringX, this.rawDragX, stiffness, damping, safeDt);
      this.dragSpringY = stepSpring(this.dragSpringY, this.rawDragY, stiffness, damping, safeDt);
      this.state.dragOffsetX = this.dragSpringX.value;
      this.state.dragOffsetY = this.dragSpringY.value;
    }

    // Decay click impulse and wheel offset
    this.state.clickPulse = dampValue(this.state.clickPulse, 0, 4.2, safeDt);
    if (this.state.clickPulse < 0.002) this.state.clickPulse = 0;

    this.state.wheelDelta = dampValue(this.state.wheelDelta, 0, 3.0, safeDt);

    // Decay recent splats
    for (let i = this.state.splats.length - 1; i >= 0; i--) {
      const s = this.state.splats[i];
      s.x += s.vx * safeDt * 0.14;
      s.y += s.vy * safeDt * 0.14;
      s.vx *= Math.exp(-3.5 * safeDt);
      s.vy *= Math.exp(-3.5 * safeDt);
      s.strength *= Math.exp(-2.6 * safeDt);
      s.radius += (s.isClick ? 0.18 : 0.04) * safeDt;
      if (s.strength < 0.015) {
        this.state.splats.splice(i, 1);
      }
    }

    return this.state;
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/math.ts">
<![CDATA[import * as THREE from 'three';
import type { EffectId, Palette, QualityPreset } from './effectTypes';

/**
 * Frame-rate-independent exponential damping factor: alpha = 1 - exp(-lambda * dt)
 */
export function dampFactor(lambda: number, dt: number): number {
  const safeDt = Math.max(0, Math.min(dt, 0.1));
  return 1 - Math.exp(-Math.max(0, lambda) * safeDt);
}

/**
 * Frame-rate-independent exponential interpolation between current and target.
 */
export function dampValue(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * dampFactor(lambda, dt);
}

export interface SpringState {
  value: number;
  velocity: number;
}

/**
 * Second-order damped harmonic oscillator step for believable physical overshoot & recovery.
 */
export function stepSpring(
  state: SpringState,
  target: number,
  stiffness: number,
  damping: number,
  dt: number
): SpringState {
  const safeDt = Math.max(0, Math.min(dt, 0.05));
  const force = (target - state.value) * stiffness;
  const accel = force - state.velocity * damping;
  const nextVelocity = state.velocity + accel * safeDt;
  const nextValue = state.value + nextVelocity * safeDt;
  return {
    value: nextValue,
    velocity: nextVelocity,
  };
}

/**
 * Normalizes client pointer coordinates against a bounding rect into WebGL UV space [0,1]
 * where (0,0) is bottom-left and (1,1) is top-right.
 */
export function normalizePointerToUv(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): { u: number; v: number } {
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  const rawU = (clientX - rect.left) / w;
  const rawV = 1.0 - (clientY - rect.top) / h;
  return {
    u: Math.max(0, Math.min(1, rawU)),
    v: Math.max(0, Math.min(1, rawV)),
  };
}

/**
 * Computes clamped UV velocity so first entry, tab restore, or resize never explodes simulation forces.
 */
export function computeClampedVelocity(
  prevU: number,
  prevV: number,
  nextU: number,
  nextV: number,
  dt: number,
  maxSpeed = 6.0
): { vx: number; vy: number } {
  const safeDt = Math.max(0.004, Math.min(dt, 0.1));
  let vx = (nextU - prevU) / safeDt;
  let vy = (nextV - prevV) / safeDt;
  const mag = Math.hypot(vx, vy);
  if (mag > maxSpeed && mag > 1e-6) {
    const scale = maxSpeed / mag;
    vx *= scale;
    vy *= scale;
  }
  return { vx, vy };
}

/**
 * Resolves effective quality tier and render scaling parameters from user preset, measured FPS, and software GL flag.
 */
export function resolveQualitySettings(
  preset: QualityPreset,
  measuredFps: number,
  devicePixelRatio: number,
  isSoftwareGl: boolean
): {
  effectiveTier: 'high' | 'balanced' | 'low';
  dpr: number;
  simScale: number;
} {
  if (isSoftwareGl) {
    return {
      effectiveTier: 'low',
      dpr: 1.0,
      simScale: 0.45,
    };
  }

  let effectiveTier: 'high' | 'balanced' | 'low' = 'high';
  if (preset === 'auto') {
    if (measuredFps < 34) {
      effectiveTier = 'low';
    } else if (measuredFps < 50) {
      effectiveTier = 'balanced';
    } else {
      effectiveTier = 'high';
    }
  } else {
    effectiveTier = preset;
  }

  const safeDeviceDpr = Math.max(1, Math.min(devicePixelRatio || 1, 3));
  if (effectiveTier === 'high') {
    return {
      effectiveTier,
      dpr: Math.min(safeDeviceDpr, 1.75),
      simScale: 1.0,
    };
  }
  if (effectiveTier === 'balanced') {
    return {
      effectiveTier,
      dpr: Math.min(safeDeviceDpr, 1.35),
      simScale: 0.72,
    };
  }
  return {
    effectiveTier: 'low',
    dpr: 1.0,
    simScale: 0.5,
  };
}

export interface TransitionFamilySpec {
  id: number;
  name: string;
  durationSec: number;
}

/**
 * Selects one of 4 GPU optical transition families based on outgoing and incoming effect IDs.
 * 0 = Viscous Rib Wipe (Fluid/Glass)
 * 1 = Diagonal Silk Shear (Fabric/Ribbon)
 * 2 = Optical Lens Caustic Iris (Lens/Aurora/Bokeh)
 * 3 = Crystalline Voronoi Melt (Facet/Refraction)
 */
export function selectTransitionFamily(fromId: EffectId, toId: EffectId): TransitionFamilySpec {
  if (toId === 'fluted-light' || fromId === 'fluted-light' || toId === 'chroma-fluid') {
    return { id: 0, name: 'Viscous Fluted Wipe', durationSec: 0.82 };
  }
  if (toId === 'silk-atmosphere' || toId === 'chromatic-ribbons') {
    return { id: 1, name: 'Diagonal Silk Shear', durationSec: 0.85 };
  }
  if (toId === 'glass-lens' || toId === 'aurora-field' || toId === 'bokeh-reactor') {
    return { id: 2, name: 'Optical Caustic Aperture', durationSec: 0.88 };
  }
  return { id: 3, name: 'Faceted Voronoi Melt', durationSec: 0.85 };
}

/**
 * Helper to create a typed Palette object from hex strings.
 */
export function createPalette(
  id: string,
  name: string,
  swatches: [string, string, string, string],
  bgHex: string
): Palette {
  return {
    id,
    name,
    swatches,
    colors: [
      new THREE.Color(swatches[0]),
      new THREE.Color(swatches[1]),
      new THREE.Color(swatches[2]),
      new THREE.Color(swatches[3]),
    ],
    bgHex,
  };
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/QualityManager.ts">
<![CDATA[import type { QualityPreset } from './effectTypes';
import { resolveQualitySettings } from './math';

export function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

export function checkWebGL2Available(): boolean {
  if (typeof document === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export class QualityManager {
  public readonly isSoftwareGl: boolean;
  private frameTimesMs: number[] = [];
  private maxSamples = 40;
  private currentPreset: QualityPreset = 'auto';

  constructor() {
    this.isSoftwareGl = detectSoftwareWebGL();
  }

  public recordFrame(dtSeconds: number): void {
    const ms = Math.max(1, Math.min(250, dtSeconds * 1000));
    this.frameTimesMs.push(ms);
    if (this.frameTimesMs.length > this.maxSamples) {
      this.frameTimesMs.shift();
    }
  }

  public getMeasuredStats(): { fps: number; frameTimeMs: number } {
    if (this.frameTimesMs.length === 0) {
      return { fps: 60, frameTimeMs: 16.6 };
    }
    let sum = 0;
    for (let i = 0; i < this.frameTimesMs.length; i++) {
      sum += this.frameTimesMs[i];
    }
    const avgMs = sum / this.frameTimesMs.length;
    const fps = Math.max(1, Math.min(240, Math.round(1000 / avgMs)));
    return {
      fps,
      frameTimeMs: Math.round(avgMs * 10) / 10,
    };
  }

  public setPreset(preset: QualityPreset): void {
    this.currentPreset = preset;
  }

  public getEffectiveSettings(devicePixelRatio: number): {
    effectiveTier: 'high' | 'balanced' | 'low';
    dpr: number;
    simScale: number;
  } {
    const { fps } = this.getMeasuredStats();
    return resolveQualitySettings(this.currentPreset, fps, devicePixelRatio, this.isSoftwareGl);
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/export/componentSourceRegistry.ts">
<![CDATA[import type { BackgroundEffect, EffectId } from '../engine/effectTypes';

export interface ExportableEffectBundle {
  effectId: EffectId;
  componentName: string;
  integrationSnippet: string;
  standaloneComponentCode: string;
  readmeMarkdown: string;
  packageJson: string;
}

const COMPONENT_NAME_MAP: Record<EffectId, string> = {
  'chroma-fluid': 'ChromaFluidBackground',
  'fluted-light': 'FlutedLightBackground',
  'silk-atmosphere': 'SilkAtmosphereBackground',
  'glass-lens': 'GlassLensBackground',
  'aurora-field': 'AuroraFieldBackground',
  'chromatic-ribbons': 'ChromaticRibbonsBackground',
  'bokeh-reactor': 'BokehReactorBackground',
  'refraction-field': 'RefractionFieldBackground',
};

export function getExportBundleForEffect(
  effect: BackgroundEffect,
  interaction = 70,
  speed = 45,
  paletteIndex = 0
): ExportableEffectBundle {
  const componentName = COMPONENT_NAME_MAP[effect.id];
  const palette = effect.palettes[paletteIndex % effect.palettes.length] || effect.palettes[0];
  const intensityNum = Math.round(interaction) / 100;
  const speedNum = Math.round(speed) / 100;

  const integrationSnippet = `// Requires: npm install three @types/three
import { ${componentName} } from './components/${componentName}';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[${palette.bgHex}] text-white">
      <${componentName}
        intensity={${intensityNum.toFixed(2)}}
        speed={${speedNum.toFixed(2)}}
        palette="${palette.id}"
        swatches={${JSON.stringify(palette.swatches)}}
        bgHex="${palette.bgHex}"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-5xl font-bold tracking-tight">${effect.headlineAccent}</h1>
        <p className="mt-4 max-w-xl text-white/80">
          ${effect.shortDescription}
        </p>
      </div>
    </section>
  );
}`;

  const standaloneComponentCode = `'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ${componentName}Props {
  intensity?: number; // 0.0 to 1.0 (default ${intensityNum.toFixed(2)})
  speed?: number;     // 0.0 to 1.0 (default ${speedNum.toFixed(2)})
  palette?: string;
  swatches?: [string, string, string, string];
  bgHex?: string;
  className?: string;
}

/**
 * SURFACE/08 Standalone Export — ${effect.indexNumber} ${effect.label}
 * ${effect.shortDescription}
 * Dependencies: three (^0.170.0 or compatible)
 */
export function ${componentName}({
  intensity = ${intensityNum.toFixed(2)},
  speed = ${speedNum.toFixed(2)},
  swatches = ${JSON.stringify(palette.swatches)},
  bgHex = '${palette.bgHex}',
  className = 'fixed inset-0 -z-10 h-full w-full pointer-events-none',
}: ${componentName}Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uInteraction: { value: intensity * 1.25 },
      uPointer: { value: new THREE.Vector2(0.62, 0.52) },
      uPointerVel: { value: new THREE.Vector2(0, 0) },
      uClickPulse: { value: 0 },
      uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
      uAspect: { value: (container.clientWidth || window.innerWidth) / Math.max(1, container.clientHeight || window.innerHeight) },
      uColor0: { value: new THREE.Color(swatches[0]) },
      uColor1: { value: new THREE.Color(swatches[1]) },
      uColor2: { value: new THREE.Color(swatches[2]) },
      uColor3: { value: new THREE.Color(swatches[3]) },
      uBgColor: { value: new THREE.Color(bgHex) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      \`,
      fragmentShader: \`
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uInteraction;
        uniform vec2 uPointer;
        uniform vec2 uPointerVel;
        uniform float uClickPulse;
        uniform vec2 uClickPos;
        uniform float uAspect;
        uniform vec3 uColor0;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uBgColor;

        void main() {
          vec2 uv = vUv;
          vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
          float t = uTime * (0.32 + uSpeed * 0.65);

          vec2 dp = (uv - uPointer) * vec2(uAspect, 1.0);
          float dist = length(dp);
          float nearField = exp(-dist * dist * 7.0) * uInteraction;

          // Ribbed / optical surface modulation for ${effect.label}
          float ribFreq = ${effect.id === 'fluted-light' ? '34.0' : '12.0'};
          float xFlute = fract((uv.x + dp.x * nearField * 0.08) * ribFreq) * 2.0 - 1.0;
          float dHdx = -xFlute * 0.85;
          vec2 refractedUv = uv + vec2(dHdx * 0.045, sin(uv.y * 12.0 + t) * 0.015) * (0.7 + nearField * 0.5);

          vec2 rp = (refractedUv - 0.5) * vec2(uAspect, 1.0);
          float w1 = sin(rp.x * 2.4 + t * 0.7 + sin(rp.y * 2.8 - t * 0.5)) * 0.5 + 0.5;
          float w2 = cos(rp.y * 2.6 - t * 0.6 + cos(rp.x * 2.2 + t * 0.4)) * 0.5 + 0.5;

          vec3 col = uBgColor;
          col = mix(col, uColor0, smoothstep(0.2, 0.85, w1));
          col = mix(col, uColor1, smoothstep(0.25, 0.88, w2) * 0.78);
          col = mix(col, uColor2, smoothstep(0.4, 0.92, w1 * w2) * 0.7);
          col += uColor3 * nearField * 0.45;

          if (uClickPulse > 0.01) {
            float cDist = length((uv - uClickPos) * vec2(uAspect, 1.0));
            float wave = exp(-pow((cDist - (1.0 - uClickPulse) * 0.65) / 0.07, 2.0)) * uClickPulse;
            col += mix(uColor1, vec3(1.0), 0.5) * wave * 0.85;
          }

          gl_FragColor = vec4(col, 1.0);
        }
      \`,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetX = 0.62;
    let targetY = 0.52;
    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
      targetY = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / Math.max(1, rect.height)));
    };
    const onPointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      uniforms.uClickPos.value.set(
        Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width))),
        Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / Math.max(1, rect.height)))
      );
      uniforms.uClickPulse.value = 1.0;
    };
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uAspect.value = w / Math.max(1, h);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('resize', onResize);

    let frameId = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value = clock.getElapsedTime();
      const prevX = uniforms.uPointer.value.x;
      const prevY = uniforms.uPointer.value.y;
      const nextX = prevX + (targetX - prevX) * (1 - Math.exp(-14 * dt));
      const nextY = prevY + (targetY - prevY) * (1 - Math.exp(-14 * dt));
      uniforms.uPointer.value.set(nextX, nextY);
      uniforms.uPointerVel.value.set((nextX - prevX) / Math.max(0.004, dt), (nextY - prevY) / Math.max(0.004, dt));
      uniforms.uClickPulse.value *= Math.exp(-4.0 * dt);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity, speed, bgHex, swatches]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
`;

  const readmeMarkdown = `# SURFACE/08 — ${effect.indexNumber} ${effect.label} Bundle

${effect.shortDescription}

## Quick Start

1. Install Three.js in your React + TypeScript project:

\`\`\`bash
npm install three
npm install -D @types/three
\`\`\`

2. Copy \`components/${componentName}.tsx\` into your project's \`src/components/\` folder.

3. Render \`<${componentName} />\` inside your hero container:

\`\`\`tsx
${integrationSnippet}
\`\`\`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`intensity\` | \`number\` | \`${intensityNum.toFixed(2)}\` | Pointer force and refraction displacement multiplier (\`0.0\` to \`1.0\`) |
| \`speed\` | \`number\` | \`${speedNum.toFixed(2)}\` | Autonomous ambient evolution speed (\`0.0\` to \`1.0\`) |
| \`swatches\` | \`[string, string, string, string]\` | \`${JSON.stringify(palette.swatches)}\` | Four hex color stops for the active shader palette |
| \`bgHex\` | \`string\` | \`"${palette.bgHex}"\` | Base atmospheric background color |
`;

  const packageJson = JSON.stringify(
    {
      name: `surface-08-${effect.id}`,
      version: '1.0.0',
      private: true,
      peerDependencies: {
        react: '>=18.0.0',
        'react-dom': '>=18.0.0',
        three: '>=0.160.0',
      },
      devDependencies: {
        '@types/three': '>=0.160.0',
        typescript: '^5.0.0',
      },
    },
    null,
    2
  );

  return {
    effectId: effect.id,
    componentName,
    integrationSnippet,
    standaloneComponentCode,
    readmeMarkdown,
    packageJson,
  };
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/export/exportBundle.ts">
<![CDATA[import JSZip from 'jszip';
import type { BackgroundEffect } from '../engine/effectTypes';
import { getExportBundleForEffect } from './componentSourceRegistry';

export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }
  if (typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export async function downloadEffectZipBundle(
  effect: BackgroundEffect,
  interaction: number,
  speed: number,
  paletteIndex: number
): Promise<string> {
  const bundle = getExportBundleForEffect(effect, interaction, speed, paletteIndex);
  const zip = new JSZip();

  const rootFolder = zip.folder(`surface-08-${effect.id}`);
  if (!rootFolder) {
    throw new Error('Failed to initialize ZIP archive folder.');
  }

  rootFolder.file('README.md', bundle.readmeMarkdown);
  rootFolder.file('package.json', bundle.packageJson);
  rootFolder.file('HeroExample.tsx', bundle.integrationSnippet);
  rootFolder.folder('components')?.file(`${bundle.componentName}.tsx`, bundle.standaloneComponentCode);

  const blob = await zip.generateAsync({ type: 'blob' });
  const filename = `surface-08-${effect.id}-bundle.zip`;

  if (typeof document !== 'undefined') {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  return filename;
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/aurora-field/AuroraFieldEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';

const AURORA_CURTAIN_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vRibbonFold;
  varying float vTravelWave;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform float uLayerIndex;
  uniform float uDepthFactor;
  uniform vec2 uLayerPointer;
  uniform float uClickPulse;
  uniform float uClickX;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float t = uTime * (0.32 + uSpeed * 0.65) + uLayerIndex * 1.45;

    // Smooth correlated spatial functions along the curtain span
    float xNorm = uv.x * 2.0 - 1.0;
    float waveA = sin(xNorm * 3.2 + t * 0.85) * 0.75;
    float waveB = cos(xNorm * 5.4 - t * 0.62 + uLayerIndex) * 0.38;
    float waveC = sin(xNorm * 1.8 - t * 0.4) * 0.55;

    // Magnetic attraction toward depth-lagged pointer
    float ptrX = uLayerPointer.x * 2.0 - 1.0;
    float ptrY = uLayerPointer.y * 2.0 - 1.0;
    float distToPtr = abs(xNorm - ptrX);
    float magPull = exp(-distToPtr * distToPtr * (3.5 + uDepthFactor * 2.5)) *
                    uInteraction * (0.45 + uDepthFactor * 0.95);

    // Traveling soliton wave along the curtain on click
    float clickCenter = (uClickX * 2.0 - 1.0);
    float waveFront = (1.0 - uClickPulse) * 2.2;
    float distWave = abs(abs(xNorm - clickCenter) - waveFront);
    float soliton = exp(-distWave * distWave * 18.0) * uClickPulse * uInteraction * (0.6 + uDepthFactor * 0.6);

    // Top of curtain sways more than base for authentic hanging drapery physics
    float swayProfile = mix(0.35, 1.15, uv.y);
    float displacementY = (waveA + waveB) * 0.45 * swayProfile +
                          (ptrY * 1.2 - pos.y * 0.15) * magPull +
                          sin(xNorm * 14.0 - uTime * 6.0) * soliton * 0.65;
    float displacementZ = (waveC + waveB * 0.6) * 0.85 * swayProfile +
                          magPull * 1.15 +
                          soliton * 0.8;

    pos.y += displacementY;
    pos.z += displacementZ;
    // Slight diagonal tilt across the sky
    pos.y += xNorm * (0.35 - uLayerIndex * 0.14);

    vRibbonFold = (waveA - waveB) * 0.5 + magPull * 0.8;
    vTravelWave = soliton;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const AURORA_CURTAIN_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vRibbonFold;
  varying float vTravelWave;

  uniform float uTime;
  uniform float uLayerIndex;
  uniform float uDepthFactor;
  uniform float uIntro;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorAccent;

  void main() {
    // Sharp lower curtain hem with tall luminous vertical drapery fade
    float bottomHem = smoothstep(0.03, 0.14, vUv.y);
    float lowerIntenseBand = exp(-pow((vUv.y - 0.16) / 0.11, 2.0));
    float topFade = pow(max(0.0, 1.0 - vUv.y), 1.45);
    float verticalProfile = bottomHem * topFade;

    // Horizontal fade near screen edges
    float horizFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);

    // Distinct vertical aurora curtain pleats and magnetic rays
    float rayFreq = 22.0 + uLayerIndex * 5.0;
    float pleat1 = sin(vUv.x * rayFreq + vRibbonFold * 3.2 + uTime * 0.55) * 0.5 + 0.5;
    float pleat2 = cos(vUv.x * (rayFreq * 1.85) - uTime * 0.38 + uLayerIndex * 2.3) * 0.5 + 0.5;
    float rayStriation = pow(pleat1 * 0.65 + pleat2 * 0.35, 1.8);
    float curtainDensity = mix(0.28, 1.0, rayStriation);

    // Rich ionized lower hem transitioning into upper atmospheric curtain
    vec3 col = mix(uColorPrimary, uColorSecondary, smoothstep(0.12, 0.78, vUv.y));
    col = mix(col, uColorAccent * 1.25, lowerIntenseBand * 0.82);

    // Brighten folds and traveling click soliton wave
    float foldGlow = smoothstep(0.08, 0.75, abs(vRibbonFold)) * 0.48;
    col += uColorAccent * (foldGlow + vTravelWave * 1.35);

    float alpha = verticalProfile * horizFade * (curtainDensity * 0.75 + lowerIntenseBand * 0.45) *
                  (0.42 + uDepthFactor * 0.45) * uIntro;
    float leftCalm = mix(0.65, 1.0, smoothstep(0.0, 0.48, vUv.x));

    gl_FragColor = vec4(col * leftCalm * (1.05 + vTravelWave * 0.65), clamp(alpha, 0.0, 0.95));
  }
`;

interface CurtainLayer {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  depthFactor: number; // 0 = far, 1 = near
  springX: SpringState;
  springY: SpringState;
}

export class AuroraFieldEffect implements BackgroundEffect {
  public readonly id = 'aurora-field' as const;
  public readonly indexNumber = '05';
  public readonly label = 'AURORA FIELD';
  public readonly headlineAccent = 'MAGNETIC CURTAINS';
  public readonly shortDescription =
    'Five differentiated-depth 3D luminous ribbon curtains with magnetic pointer attraction, group delay parallax, and traveling soliton waves.';
  public readonly helpText = 'SWEEP TO ATTRACT CURTAINS BY DEPTH · CLICK TO SEND TRAVELING WAVE';
  public readonly category = 'field' as const;

  public readonly palettes: Palette[] = [
    createPalette('borealis', 'BOREALIS', ['#00F5D4', '#3B82F6', '#9D4EDD', '#10B981'], '#030611'),
    createPalette('solar-storm', 'SOLAR STORM', ['#FF2A85', '#7209B7', '#FFB703', '#4361EE'], '#070412'),
    createPalette('cryo', 'CRYO', ['#38BDF8', '#6EE7B7', '#6366F1', '#A5F3FC'], '#020810'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneGeometry;
  private layers: CurtainLayer[] = [];
  private bgColor = new THREE.Color('#030611');

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    const aspect = context.width / Math.max(1, context.height);
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 9.5);

    const segsX = context.isSoftwareGl ? 64 : 130;
    const segsY = context.isSoftwareGl ? 12 : 22;
    this.geometry = new THREE.PlaneGeometry(17.5, 4.6, segsX, segsY);

    const pal = this.palettes[0];
    this.bgColor.set(pal.bgHex);

    const layerCount = 5;
    this.layers = [];

    for (let i = 0; i < layerCount; i++) {
      const depthFactor = i / (layerCount - 1); // 0 (far) .. 1 (near)
      const zPos = -2.8 + depthFactor * 4.4;
      const yPos = 1.15 - depthFactor * 2.15;

      const mat = new THREE.ShaderMaterial({
        vertexShader: AURORA_CURTAIN_VERTEX_SHADER,
        fragmentShader: AURORA_CURTAIN_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uLayerIndex: { value: i },
          uDepthFactor: { value: depthFactor },
          uLayerPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uClickPulse: { value: 0 },
          uClickX: { value: 0.62 },
          uIntro: { value: 1 },
          uColorPrimary: { value: pal.colors[i % 4].clone() },
          uColorSecondary: { value: pal.colors[(i + 1) % 4].clone() },
          uColorAccent: { value: pal.colors[(i + 2) % 4].clone() },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(this.geometry, mat);
      mesh.position.set(0.4, yPos, zPos);
      mesh.renderOrder = i;
      this.scene.add(mesh);

      this.layers.push({
        mesh,
        material: mat,
        depthFactor,
        springX: { value: 0.62, velocity: 0 },
        springY: { value: 0.52, velocity: 0 },
      });
    }
  }

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const alpha = dampValue(0, 1, 8, dt);
    this.bgColor.lerp(new THREE.Color(pal.bgHex), alpha);

    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      // Near layers (depthFactor=1) respond rapidly with high stiffness; far layers respond slowly with lag
      const stiffness = 22 + layer.depthFactor * 95;
      const damping = 6.5 + layer.depthFactor * 5.0;

      layer.springX = stepSpring(layer.springX, input.x, stiffness, damping, dt);
      layer.springY = stepSpring(layer.springY, input.y, stiffness, damping, dt);

      const u = layer.material.uniforms;
      u.uColorPrimary.value.lerp(pal.colors[i % 4], alpha);
      u.uColorSecondary.value.lerp(pal.colors[(i + 1) % 4], alpha);
      u.uColorAccent.value.lerp(pal.colors[(i + 2) % 4], alpha);

      u.uTime.value = elapsed;
      u.uSpeed.value = speedNorm;
      u.uInteraction.value = interactionNorm;
      u.uLayerPointer.value.set(layer.springX.value, layer.springY.value);
      u.uClickPulse.value = input.clickPulse;
      u.uClickX.value = input.clickX;
      u.uIntro.value = controls.introProgress;
    }
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    renderer.setRenderTarget(output);
    renderer.setClearColor(this.bgColor, 1);
    renderer.clear();
    renderer.render(this.scene, this.camera);
  }

  public reset(): void {
    for (const layer of this.layers) {
      layer.springX = { value: 0.62, velocity: 0 };
      layer.springY = { value: 0.52, velocity: 0 };
    }
  }

  public dispose(): void {
    this.geometry.dispose();
    for (const layer of this.layers) {
      layer.material.dispose();
    }
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/bokeh-reactor/BokehReactorEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';

const BOKEH_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  attribute vec3 aInstancePos;
  attribute vec2 aInstanceOffset;
  attribute vec3 aInstanceMeta; // x = scale, y = colorIdx, z = pulseEnergy

  varying vec2 vUv;
  varying float vDepth;
  varying float vColorIdx;
  varying float vPulse;

  uniform float uAspect;
  uniform float uIntro;

  void main() {
    vUv = uv;
    vDepth = aInstancePos.z;
    vColorIdx = aInstanceMeta.y;
    vPulse = aInstanceMeta.z;

    float radius = aInstanceMeta.x * (1.0 + vPulse * 0.28) * mix(0.2, 1.0, uIntro);
    vec2 quadOffset = (uv - 0.5) * 2.0 * radius;
    quadOffset.x /= max(0.5, uAspect);

    vec2 finalXY = (aInstancePos.xy + aInstanceOffset) * 2.0 - 1.0 + quadOffset;
    gl_Position = vec4(finalXY, 0.0, 1.0);
  }
`;

const BOKEH_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying float vDepth;
  varying float vColorIdx;
  varying float vPulse;

  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  vec3 pickColor(float idx) {
    if (idx < 0.5) return uColor0;
    if (idx < 1.5) return uColor1;
    if (idx < 2.5) return uColor2;
    return uColor3;
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;

    // Out-of-focus camera aperture profile: soft interior volume + spherical caustic rim
    float sharpness = mix(2.2, 7.5, vDepth);
    float softDisc = 1.0 - smoothstep(0.35, 1.0, r);
    float apertureRing = exp(-pow((r - 0.78) * sharpness, 2.0)) * (0.45 + vDepth * 0.55);

    vec3 baseCol = pickColor(vColorIdx);
    vec3 rimCol = pickColor(mod(vColorIdx + 1.0, 4.0));

    // Chromatic rim aberration inside the bokeh disc
    float angle = atan(p.y, p.x);
    float directionalCaustic = 0.65 + 0.35 * sin(angle * 2.0 + vDepth * 6.0);

    vec3 col = baseCol * softDisc * 0.68 +
               mix(baseCol, rimCol, 0.55) * apertureRing * directionalCaustic * 1.15 +
               vec3(1.0, 0.96, 0.9) * vPulse * (softDisc * 0.5 + apertureRing * 0.8);

    float alpha = (softDisc * 0.42 + apertureRing * 0.55) * mix(0.28, 0.72, vDepth);
    gl_FragColor = vec4(col, alpha);
  }
`;

interface BokehParticle {
  baseX: number;
  baseY: number;
  depth: number; // 0 (deep blurred) .. 1 (foreground crisp)
  radius: number;
  colorIdx: number;
  phase: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  pulse: number;
}

export class BokehReactorEffect implements BackgroundEffect {
  public readonly id = 'bokeh-reactor' as const;
  public readonly indexNumber = '07';
  public readonly label = 'BOKEH REACTOR';
  public readonly headlineAccent = 'OPTICAL APERTURE';
  public readonly shortDescription =
    'Instanced translucent camera-aperture light lobes with depth-attenuated repulsion physics, shadowed pointer cavity, and radial shockwave pulses.';
  public readonly helpText = 'MOVE TO PART LIGHT VOLUMES · CLICK TO EMIT APERTURE PULSE';
  public readonly category = 'bokeh' as const;

  public readonly palettes: Palette[] = [
    createPalette('chamber', 'CHAMBER', ['#FF9E7D', '#67E8F9', '#3B82F6', '#F43F5E'], '#050B16'),
    createPalette('nebula', 'NEBULA', ['#FBBF24', '#A855F7', '#06B6D4', '#EC4899'], '#080614'),
    createPalette('halide', 'HALIDE', ['#34D399', '#FB7185', '#60A5FA', '#FDE047'], '#040D12'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private geometry!: THREE.InstancedBufferGeometry;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;

  private particles: BokehParticle[] = [];
  private offsetArray!: Float32Array;
  private metaArray!: Float32Array;
  private offsetAttr!: THREE.InstancedBufferAttribute;
  private metaAttr!: THREE.InstancedBufferAttribute;
  private bgColor = new THREE.Color('#050B16');

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const count = 40;
    this.particles = [];
    const posArray = new Float32Array(count * 3);
    this.offsetArray = new Float32Array(count * 2);
    this.metaArray = new Float32Array(count * 3);

    // Deterministic art-directed optical cluster biased toward the right 65%
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const goldenAngle = i * 2.3999632;
      const r = Math.sqrt(t) * 0.44;
      const baseX = THREE.MathUtils.clamp(0.58 + Math.cos(goldenAngle) * r * 1.15, 0.08, 0.95);
      const baseY = THREE.MathUtils.clamp(0.5 + Math.sin(goldenAngle) * r * 0.95, 0.08, 0.92);
      const depth = (i % 7) / 6; // 0..1

      // Fewer large volumes in background, smaller sharper optical lobes in foreground
      const radius = THREE.MathUtils.lerp(0.34, 0.09, depth * 0.85);
      const colorIdx = i % 4;

      this.particles.push({
        baseX,
        baseY,
        depth,
        radius,
        colorIdx,
        phase: i * 1.17,
        offsetX: 0,
        offsetY: 0,
        vx: 0,
        vy: 0,
        pulse: 0,
      });

      posArray[i * 3 + 0] = baseX;
      posArray[i * 3 + 1] = baseY;
      posArray[i * 3 + 2] = depth;

      this.metaArray[i * 3 + 0] = radius;
      this.metaArray[i * 3 + 1] = colorIdx;
      this.metaArray[i * 3 + 2] = 0;
    }

    const basePlane = new THREE.PlaneGeometry(1, 1);
    this.geometry = new THREE.InstancedBufferGeometry();
    this.geometry.index = basePlane.index;
    this.geometry.attributes.position = basePlane.attributes.position;
    this.geometry.attributes.uv = basePlane.attributes.uv;
    this.geometry.instanceCount = count;

    this.geometry.setAttribute('aInstancePos', new THREE.InstancedBufferAttribute(posArray, 3));
    this.offsetAttr = new THREE.InstancedBufferAttribute(this.offsetArray, 2);
    this.metaAttr = new THREE.InstancedBufferAttribute(this.metaArray, 3);
    this.geometry.setAttribute('aInstanceOffset', this.offsetAttr);
    this.geometry.setAttribute('aInstanceMeta', this.metaAttr);

    const pal = this.palettes[0];
    this.bgColor.set(pal.bgHex);

    this.material = new THREE.ShaderMaterial({
      vertexShader: BOKEH_VERTEX_SHADER,
      fragmentShader: BOKEH_FRAGMENT_SHADER,
      uniforms: {
        uAspect: { value: context.width / Math.max(1, context.height) },
        uIntro: { value: 1 },
        uColor0: { value: pal.colors[0].clone() },
        uColor1: { value: pal.colors[1].clone() },
        uColor2: { value: pal.colors[2].clone() },
        uColor3: { value: pal.colors[3].clone() },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  public resize(width: number, height: number): void {
    this.material.uniforms.uAspect.value = width / Math.max(1, height);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const alpha = dampValue(0, 1, 8, dt);
    this.bgColor.lerp(new THREE.Color(pal.bgHex), alpha);

    const u = this.material.uniforms;
    u.uColor0.value.lerp(pal.colors[0], alpha);
    u.uColor1.value.lerp(pal.colors[1], alpha);
    u.uColor2.value.lerp(pal.colors[2], alpha);
    u.uColor3.value.lerp(pal.colors[3], alpha);
    u.uIntro.value = controls.introProgress;

    const safeDt = controls.paused ? 0 : Math.min(dt, 0.04);
    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;
    const aspect = u.uAspect.value;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const depthScale = 0.45 + p.depth * 0.9;

      // Ambient orbital drift
      const driftX = Math.sin(elapsed * (0.28 + speedNorm * 0.5) + p.phase) * 0.045 * depthScale;
      const driftY = Math.cos(elapsed * (0.24 + speedNorm * 0.45) + p.phase * 1.3) * 0.045 * depthScale;

      const curX = p.baseX + p.offsetX;
      const curY = p.baseY + p.offsetY;

      // Pointer repulsion creates a temporary shadowed cavity around the cursor
      const dx = (curX - input.x) * aspect;
      const dy = curY - input.y;
      const dist = Math.hypot(dx, dy);
      const cavityRadius = 0.34;

      let repulseX = 0;
      let repulseY = 0;
      if (dist < cavityRadius && dist > 0.001) {
        const push = Math.pow(1.0 - dist / cavityRadius, 2.0) * 1.85 * interactionNorm * depthScale;
        repulseX = (dx / dist / aspect) * push;
        repulseY = (dy / dist) * push;
      }

      // Click propagating light wave
      if (input.clickPulse > 0.01) {
        const cdx = (curX - input.clickX) * aspect;
        const cdy = curY - input.clickY;
        const cDist = Math.hypot(cdx, cdy);
        const waveFront = (1.0 - input.clickPulse) * 0.95;
        const ring = Math.exp(-Math.pow((cDist - waveFront) / 0.14, 2.0)) * input.clickPulse * interactionNorm;
        p.pulse = Math.max(p.pulse, ring * 1.3);
        if (cDist > 0.001) {
          repulseX += (cdx / cDist / aspect) * ring * 0.95;
          repulseY += (cdy / cDist) * ring * 0.95;
        }
      }

      const stiffness = 28 + p.depth * 45;
      const damping = 5.5 + p.depth * 3.5;
      const forceX = (driftX - p.offsetX) * stiffness + repulseX * 26.0;
      const forceY = (driftY - p.offsetY) * stiffness + repulseY * 26.0;

      p.vx += (forceX - p.vx * damping) * safeDt;
      p.vy += (forceY - p.vy * damping) * safeDt;
      p.offsetX += p.vx * safeDt;
      p.offsetY += p.vy * safeDt;
      p.pulse = dampValue(p.pulse, 0, 4.5, safeDt);

      this.offsetArray[i * 2 + 0] = p.offsetX;
      this.offsetArray[i * 2 + 1] = p.offsetY;
      this.metaArray[i * 3 + 2] = p.pulse;
    }

    this.offsetAttr.needsUpdate = true;
    this.metaAttr.needsUpdate = true;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    renderer.setRenderTarget(output);
    renderer.setClearColor(this.bgColor, 1);
    renderer.clear();
    renderer.render(this.scene, this.camera);
  }

  public reset(): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.offsetX = 0;
      p.offsetY = 0;
      p.vx = 0;
      p.vy = 0;
      p.pulse = 0;
      this.offsetArray[i * 2 + 0] = 0;
      this.offsetArray[i * 2 + 1] = 0;
      this.metaArray[i * 3 + 2] = 0;
    }
    this.offsetAttr.needsUpdate = true;
    this.metaAttr.needsUpdate = true;
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/chroma-fluid/ChromaFluidEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from '../../engine/passes/FullscreenPass';
import { PingPongTargets } from '../../engine/passes/PingPongTargets';

const VELOCITY_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tVelocity;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPrevPointer;
  uniform vec2 uPointerVel;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Distance from point p to segment a-b
  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(0.00001, dot(ba, ba)), 0.0, 1.0);
    return length((pa - ba * h) * vec2(uAspect, 1.0));
  }

  void main() {
    vec2 uv = vUv;
    vec2 prevVel = texture2D(tVelocity, uv).xy;

    // Semi-Lagrangian backtrace of velocity
    vec2 backUv = clamp(uv - prevVel * uDt * 0.65, 0.002, 0.998);
    vec2 v = texture2D(tVelocity, backUv).xy;

    // Neighbor curl / vorticity estimation
    vec2 vL = texture2D(tVelocity, clamp(backUv - vec2(uTexelSize.x, 0.0), 0.0, 1.0)).xy;
    vec2 vR = texture2D(tVelocity, clamp(backUv + vec2(uTexelSize.x, 0.0), 0.0, 1.0)).xy;
    vec2 vB = texture2D(tVelocity, clamp(backUv - vec2(0.0, uTexelSize.y), 0.0, 1.0)).xy;
    vec2 vT = texture2D(tVelocity, clamp(backUv + vec2(0.0, uTexelSize.y), 0.0, 1.0)).xy;

    float curl = ((vR.y - vL.y) - (vT.x - vB.x)) * 0.5;
    vec2 avgNeighbors = (vL + vR + vB + vT) * 0.25;
    // Pressure-like divergence relaxation
    float div = ((vR.x - vL.x) + (vT.y - vB.y)) * 0.25;
    v = mix(v, avgNeighbors, 0.16);
    v -= vec2(div) * 0.15;

    // Autonomous ambient curl field so idle fluid evolves gracefully
    float t = uTime * (0.28 + uSpeed * 0.45);
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    vec2 ambientForce = vec2(
      sin(p.y * 3.4 + t * 1.1) + cos(p.x * 2.7 - t * 0.8),
      cos(p.x * 3.1 - t * 0.9) - sin(p.y * 2.5 + t * 1.2)
    ) * 0.065 * uSpeed;

    v += ambientForce * uDt;

    // Pointer stroke impulse along segment from uPrevPointer to uPointer
    float strokeDist = sdSegment(uv, uPrevPointer, uPointer);
    float strokeRadius = 0.095 + clamp(length(uPointerVel) * 0.02, 0.0, 0.08);
    float strokeInfluence = exp(-pow(strokeDist / strokeRadius, 2.0)) * uInteraction;
    v += uPointerVel * strokeInfluence * 0.48;

    // Add swirl perpendicular to pointer velocity near the tip
    vec2 perpVel = vec2(-uPointerVel.y, uPointerVel.x);
    vec2 tipDelta = (uv - uPointer) * vec2(uAspect, 1.0);
    float side = sign(dot(tipDelta, perpVel));
    v += perpVel * side * strokeInfluence * 0.18;

    // Click radial shockwave impulse
    if (uClickPulse > 0.01) {
      vec2 cd = (uv - uClickPos) * vec2(uAspect, 1.0);
      float cDist = length(cd);
      float ringRadius = (1.0 - uClickPulse) * 0.48 + 0.03;
      float ring = exp(-pow((cDist - ringRadius) / 0.065, 2.0)) * uClickPulse * uInteraction;
      vec2 radialDir = cDist > 0.0001 ? normalize(cd) : vec2(1.0, 0.0);
      vec2 swirlDir = vec2(-radialDir.y, radialDir.x);
      v += (radialDir * 1.15 + swirlDir * 0.65) * ring;
    }

    // Damping / viscosity
    float dissipation = mix(0.992, 0.968, uDt * 18.0);
    v *= dissipation;
    v = clamp(v, vec2(-2.5), vec2(2.5));

    gl_FragColor = vec4(v, curl, 1.0);
  }
`;

const DYE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tDye;
  uniform sampler2D tVelocity;
  uniform float uDt;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPrevPointer;
  uniform vec2 uPointerVel;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(0.00001, dot(ba, ba)), 0.0, 1.0);
    return length((pa - ba * h) * vec2(uAspect, 1.0));
  }

  vec3 sampleBaseReservoir(vec2 uv, float t) {
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float w1 = sin(p.x * 2.2 + t * 0.55 + sin(p.y * 2.6 - t * 0.4)) * 0.5 + 0.5;
    float w2 = cos(p.y * 2.4 - t * 0.48 + cos(p.x * 2.0 + t * 0.35)) * 0.5 + 0.5;
    float w3 = sin((p.x - p.y) * 2.1 + t * 0.65) * 0.5 + 0.5;

    // Emphasize right 65% of canvas while keeping left text zone rich and legible
    float rightBias = smoothstep(-0.55, 0.45, p.x);

    vec3 c = uBgColor;
    c = mix(c, uColor0, smoothstep(0.28, 0.85, w1) * (0.55 + 0.45 * rightBias));
    c = mix(c, uColor1, smoothstep(0.32, 0.88, w2) * 0.72);
    c = mix(c, uColor2, smoothstep(0.45, 0.92, w3 * w1) * (0.5 + 0.5 * rightBias));
    c = mix(c, uColor3, pow(smoothstep(0.55, 0.96, w2 * (1.0 - w1)), 1.5) * 0.65);
    return c;
  }

  void main() {
    vec2 uv = vUv;
    vec3 velData = texture2D(tVelocity, uv).xyz;
    vec2 vel = velData.xy;

    // Advect dye along velocity field
    vec2 backUv = clamp(uv - vel * uDt * 0.78, 0.002, 0.998);
    vec3 advectedDye = texture2D(tDye, backUv).rgb;

    float t = uTime * (0.35 + uSpeed * 0.65);
    vec3 reservoir = sampleBaseReservoir(uv, t);

    // Gently relax toward evolving reservoir so persistent trails linger for several seconds
    float relaxRate = clamp(uDt * (0.28 + uSpeed * 0.18), 0.002, 0.04);
    vec3 dye = mix(advectedDye, reservoir, relaxRate);

    // Inject chromatic pigment along pointer stroke
    float strokeDist = sdSegment(uv, uPrevPointer, uPointer);
    float velMag = length(uPointerVel);
    float splatRadius = 0.08 + clamp(velMag * 0.015, 0.0, 0.06);
    float splat = exp(-pow(strokeDist / splatRadius, 2.0)) * clamp(velMag * 0.55, 0.0, 1.2) * uInteraction;

    // Cycle injected pigment hue smoothly
    float huePhase = uTime * 1.1 + uv.x * 2.5 + uv.y * 1.8;
    vec3 splatColor = mix(
      mix(uColor0, uColor2, sin(huePhase) * 0.5 + 0.5),
      uColor3,
      cos(huePhase * 0.7) * 0.5 + 0.5
    );
    dye = mix(dye, splatColor * 1.22, clamp(splat, 0.0, 0.85));

    // Click pigment bloom
    if (uClickPulse > 0.01) {
      vec2 cd = (uv - uClickPos) * vec2(uAspect, 1.0);
      float cDist = length(cd);
      float ringRadius = (1.0 - uClickPulse) * 0.42 + 0.02;
      float ring = exp(-pow((cDist - ringRadius) / 0.055, 2.0)) * uClickPulse * uInteraction;
      vec3 burstColor = mix(uColor3, uColor0, sin(cDist * 18.0 - uTime * 4.0) * 0.5 + 0.5);
      dye = mix(dye, burstColor * 1.35, clamp(ring * 0.95, 0.0, 0.9));
    }

    gl_FragColor = vec4(dye, 1.0);
  }
`;

const DISPLAY_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tDye;
  uniform sampler2D tVelocity;
  uniform vec2 uTexelSize;
  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec3 dye = texture2D(tDye, uv).rgb;
    vec3 velData = texture2D(tVelocity, uv).xyz;

    // Compute luminance gradient to create sharp optical folds of light along pigment boundaries
    vec3 dyeR = texture2D(tDye, clamp(uv + vec2(uTexelSize.x * 2.0, 0.0), 0.0, 1.0)).rgb;
    vec3 dyeT = texture2D(tDye, clamp(uv + vec2(0.0, uTexelSize.y * 2.0), 0.0, 1.0)).rgb;

    float lumC = dot(dye, vec3(0.299, 0.587, 0.114));
    float lumR = dot(dyeR, vec3(0.299, 0.587, 0.114));
    float lumT = dot(dyeT, vec3(0.299, 0.587, 0.114));

    vec2 grad = vec2(lumR - lumC, lumT - lumC) * 14.0;
    vec3 normal = normalize(vec3(-grad.x, -grad.y, 1.0));
    vec3 lightDir = normalize(vec3(0.45, 0.62, 0.64));
    float spec = pow(max(0.0, dot(normal, lightDir)), 18.0);
    float foldHighlight = smoothstep(0.08, 0.45, length(grad)) * 0.22;

    vec3 col = dye + vec3(1.0, 0.94, 0.9) * (spec * 0.28 + foldHighlight);
    // Subtle vorticity sheen
    col += vec3(0.95, 0.55, 0.75) * clamp(abs(velData.z) * 0.08, 0.0, 0.18);

    // Subtle localized editorial contrast veil on far left for typography legibility
    float leftVeil = smoothstep(0.0, 0.52, uv.x);
    col = mix(mix(uBgColor * 0.75, col, 0.68), col, leftVeil);

    // Choreographed intro ignition sweep
    float introSweep = smoothstep(0.0, 1.0, (uIntro * 1.35) - (1.0 - uv.x) * 0.35);
    col = mix(uBgColor, col, introSweep);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class ChromaFluidEffect implements BackgroundEffect {
  public readonly id = 'chroma-fluid' as const;
  public readonly indexNumber = '01';
  public readonly label = 'CHROMA FLUID';
  public readonly headlineAccent = 'LIQUID COLOR';
  public readonly shortDescription =
    'Multi-pass GPU Navier-Stokes feedback simulation with persistent advected pigment currents and vorticity folds.';
  public readonly helpText = 'SWIPE TO ADVECT PIGMENT · CLICK TO INJECT RADIAL PRESSURE PULSE';
  public readonly category = 'fluid' as const;

  public readonly palettes: Palette[] = [
    createPalette('volt', 'VOLT', ['#FF5238', '#4F2BFF', '#C6FF2E', '#FF2A85'], '#12060A'),
    createPalette('spectral', 'SPECTRAL', ['#00F0FF', '#7B2CBF', '#FF1E6C', '#FFE600'], '#070814'),
    createPalette('ember', 'EMBER', ['#FF6B35', '#F7C548', '#B81D33', '#4A154B'], '#110709'),
  ];

  private velocityTargets!: PingPongTargets;
  private dyeTargets!: PingPongTargets;
  private velocityPass!: FullscreenPass;
  private dyePass!: FullscreenPass;
  private displayPass!: FullscreenPass;

  private simWidth = 512;
  private simHeight = 320;
  private prevPointer = new THREE.Vector2(0.62, 0.52);
  private rendererRef: THREE.WebGLRenderer | null = null;
  private isSeeded = false;

  public init(context: EffectContext): void {
    this.rendererRef = context.renderer;
    const scale = context.isSoftwareGl ? 0.35 : 0.55;
    this.simWidth = Math.max(128, Math.floor(context.width * scale));
    this.simHeight = Math.max(128, Math.floor(context.height * scale));

    const useHalfFloat = !context.isSoftwareGl;
    this.velocityTargets = new PingPongTargets(this.simWidth, this.simHeight, useHalfFloat);
    this.dyeTargets = new PingPongTargets(this.simWidth, this.simHeight, useHalfFloat);

    const pal = this.palettes[0];

    this.velocityPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: VELOCITY_FRAGMENT_SHADER,
        uniforms: {
          tVelocity: { value: null },
          uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
          uDt: { value: 0.016 },
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPrevPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: context.width / Math.max(1, context.height) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.dyePass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: DYE_FRAGMENT_SHADER,
        uniforms: {
          tDye: { value: null },
          tVelocity: { value: null },
          uDt: { value: 0.016 },
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPrevPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: context.width / Math.max(1, context.height) },
          uColor0: { value: pal.colors[0].clone() },
          uColor1: { value: pal.colors[1].clone() },
          uColor2: { value: pal.colors[2].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.displayPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: DISPLAY_FRAGMENT_SHADER,
        uniforms: {
          tDye: { value: null },
          tVelocity: { value: null },
          uTexelSize: { value: new THREE.Vector2(1 / this.simWidth, 1 / this.simHeight) },
          uTime: { value: 0 },
          uIntro: { value: 1 },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.isSeeded = false;
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    const scale = Math.min(0.65, 0.45 * pixelRatio);
    this.simWidth = Math.max(128, Math.floor(width * scale));
    this.simHeight = Math.max(128, Math.floor(height * scale));
    this.velocityTargets.resize(this.simWidth, this.simHeight);
    this.dyeTargets.resize(this.simWidth, this.simHeight);

    const aspect = width / Math.max(1, height);
    this.velocityPass.material.uniforms.uTexelSize.value.set(1 / this.simWidth, 1 / this.simHeight);
    this.velocityPass.material.uniforms.uAspect.value = aspect;
    this.dyePass.material.uniforms.uAspect.value = aspect;
    this.displayPass.material.uniforms.uTexelSize.value.set(1 / this.simWidth, 1 / this.simHeight);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const uDye = this.dyePass.material.uniforms;
    const uVel = this.velocityPass.material.uniforms;
    const uDisp = this.displayPass.material.uniforms;

    const colorLerp = dampValue(0, 1, 8, dt);
    uDye.uColor0.value.lerp(pal.colors[0], colorLerp);
    uDye.uColor1.value.lerp(pal.colors[1], colorLerp);
    uDye.uColor2.value.lerp(pal.colors[2], colorLerp);
    uDye.uColor3.value.lerp(pal.colors[3], colorLerp);
    const targetBg = new THREE.Color(pal.bgHex);
    uDye.uBgColor.value.lerp(targetBg, colorLerp);
    uDisp.uBgColor.value.lerp(targetBg, colorLerp);

    const effectiveDt = controls.paused ? 0.0 : Math.min(dt, 0.033);
    const speedNorm = controls.reducedMotion ? 0.05 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    uVel.uDt.value = effectiveDt;
    uVel.uTime.value = elapsed;
    uVel.uSpeed.value = speedNorm;
    uVel.uInteraction.value = interactionNorm;
    uVel.uPrevPointer.value.copy(this.prevPointer);
    uVel.uPointer.value.set(input.x, input.y);
    uVel.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    uVel.uClickPulse.value = input.clickPulse;
    uVel.uClickPos.value.set(input.clickX, input.clickY);

    uDye.uDt.value = effectiveDt;
    uDye.uTime.value = elapsed;
    uDye.uSpeed.value = speedNorm;
    uDye.uInteraction.value = interactionNorm;
    uDye.uPrevPointer.value.copy(this.prevPointer);
    uDye.uPointer.value.set(input.x, input.y);
    uDye.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    uDye.uClickPulse.value = input.clickPulse;
    uDye.uClickPos.value.set(input.clickX, input.clickY);

    uDisp.uTime.value = elapsed;
    uDisp.uIntro.value = controls.introProgress;

    this.prevPointer.set(input.x, input.y);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    // Seed initial pigment reservoir on first frame so fluid starts vivid immediately
    if (!this.isSeeded) {
      this.isSeeded = true;
      const prevDt = this.dyePass.material.uniforms.uDt.value;
      this.dyePass.material.uniforms.uDt.value = 35.0; // full reservoir blend
      this.dyePass.material.uniforms.tDye.value = this.dyeTargets.read.texture;
      this.dyePass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
      this.dyePass.render(renderer, this.dyeTargets.write);
      this.dyeTargets.swap();
      this.dyePass.material.uniforms.uDt.value = prevDt;
    }

    // Step 1: Velocity advection + curl + pointer forces
    this.velocityPass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
    this.velocityPass.render(renderer, this.velocityTargets.write);
    this.velocityTargets.swap();

    // Step 2: Dye advection + splat injection
    this.dyePass.material.uniforms.tDye.value = this.dyeTargets.read.texture;
    this.dyePass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
    this.dyePass.render(renderer, this.dyeTargets.write);
    this.dyeTargets.swap();

    // Step 3: Final optical fold display
    this.displayPass.material.uniforms.tDye.value = this.dyeTargets.read.texture;
    this.displayPass.material.uniforms.tVelocity.value = this.velocityTargets.read.texture;
    this.displayPass.render(renderer, output);
  }

  public reset(): void {
    if (this.rendererRef) {
      this.velocityTargets.clear(this.rendererRef, new THREE.Color(0, 0, 0), 1);
      this.dyeTargets.clear(this.rendererRef, new THREE.Color(0, 0, 0), 1);
    }
    this.isSeeded = false;
  }

  public dispose(): void {
    this.velocityTargets.dispose();
    this.dyeTargets.dispose();
    this.velocityPass.dispose();
    this.dyePass.dispose();
    this.displayPass.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/chromatic-ribbons/ChromaticRibbonsEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';

const RIBBON_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDepth;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform float uRibbonIndex;
  uniform float uWeaveFactor;
  uniform vec2 uPointer;
  uniform vec2 uDragOffset;
  uniform float uWheelOffset;
  uniform float uClickPulse;
  uniform float uIsShadowPass;

  void main() {
    vUv = uv;
    float s = uv.x * 2.0 - 1.0; // -1..1 along the ribbon length
    float w = uv.y * 2.0 - 1.0; // -1..1 across ribbon width

    float t = uTime * (0.3 + uSpeed * 0.65);
    float idx = uRibbonIndex;

    // Parallel diagonal band layout vs interlaced sculptural weave
    float laneSpacing = 0.92;
    float baseOffset = (idx - 3.0) * laneSpacing;

    // Diagonal sweep angle
    float angle = 0.42 + sin(idx * 1.3) * 0.05;
    float ca = cos(angle);
    float sa = sin(angle);

    // Spline centerline coordinates before rotation
    float pathX = s * 11.5;
    float parallelY = baseOffset + sin(s * 2.4 + t * 0.75 + idx * 0.85) * 0.52;
    float wovenY = baseOffset * 0.65 + sin(s * 3.6 - t * 0.9 + idx * 1.55) * 1.35;
    float pathY = mix(parallelY, wovenY, uWeaveFactor) + uWheelOffset * (0.35 + idx * 0.08);

    // Depth separation and over-under interlacing in Z
    float baseZ = (mod(idx, 3.0) - 1.0) * 0.72;
    float weaveZ = cos(s * 3.6 - t * 0.9 + idx * 1.55) * 0.85 * uWeaveFactor;
    float pathZ = baseZ + weaveZ;

    // Pointer depth-dependent parallax tilt & curvature tightening on click
    vec2 ptrWorld = (uPointer - 0.5) * vec2(12.0, 7.5);
    vec2 approxWorldXY = vec2(pathX * ca - pathY * sa, pathX * sa + pathY * ca);
    float ptrDist = length(approxWorldXY - ptrWorld);
    float nearInfluence = exp(-ptrDist * ptrDist * 0.14) * uInteraction;
    float parallaxScale = 0.55 + (pathZ + 1.5) * 0.45;

    pathY += (uDragOffset.y * 1.6 + (uPointer.y - 0.5) * 0.85) * nearInfluence * parallaxScale;
    pathZ += nearInfluence * 0.95 * parallaxScale + uClickPulse * sin(s * 6.0 + idx) * 0.55;

    // Ribbon width & twist angle along spine
    float ribbonHalfWidth = (0.58 + mod(idx, 2.0) * 0.18) * (1.0 - uClickPulse * 0.2);
    float twist = sin(s * 2.6 + t * 0.6 + idx * 1.1) * 0.48 +
                  nearInfluence * 0.65 * (uPointer.x - 0.5) +
                  uDragOffset.x * 0.55;

    float ct = cos(twist);
    float st = sin(twist);

    // Cross-section offset with subtle bevel thickness curvature
    vec3 widthOffset = vec3(0.0, w * ribbonHalfWidth * ct, w * ribbonHalfWidth * st);
    vec3 localNormal = normalize(vec3(
      -sin(s * 2.4 + t * 0.75 + idx * 0.85) * 0.22,
      -st + w * 0.28,
      ct
    ));

    vec3 spinePos = vec3(pathX, pathY, pathZ) + widthOffset;
    // Rotate diagonally across viewport
    vec3 finalPos = vec3(
      spinePos.x * ca - spinePos.y * sa + 1.15,
      spinePos.x * sa + spinePos.y * ca,
      spinePos.z
    );

    vec3 finalNormal = normalize(vec3(
      localNormal.x * ca - localNormal.y * sa,
      localNormal.x * sa + localNormal.y * ca,
      localNormal.z
    ));

    if (uIsShadowPass > 0.5) {
      // Soft contact shadow projected onto back wall plane at z = -2.35
      float shadowDrop = max(0.1, finalPos.z + 2.35);
      finalPos.x += shadowDrop * 0.32;
      finalPos.y -= shadowDrop * 0.38;
      finalPos.z = -2.35;
    }

    vNormal = finalNormal;
    vec4 worldPos = modelMatrix * vec4(finalPos, 1.0);
    vWorldPos = worldPos.xyz;
    vDepth = finalPos.z;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const RIBBON_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vDepth;

  uniform float uRibbonIndex;
  uniform float uMaterialType; // 0 = satin metal, 1 = tinted architectural glass
  uniform float uIsShadowPass;
  uniform float uIntro;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorEdge;
  uniform vec3 uBgColor;

  void main() {
    if (uIsShadowPass > 0.5) {
      // Soft contact shadow with feathered edges
      float edgeSoft = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
      gl_FragColor = vec4(0.0, 0.0, 0.0, edgeSoft * 0.42 * uIntro);
      return;
    }

    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);

    vec3 keyLight = normalize(vec3(0.65, 0.55, 0.72));
    vec3 fillLight = normalize(vec3(-0.7, -0.35, 0.58));

    float diffKey = max(0.0, dot(N, keyLight));
    float diffFill = max(0.0, dot(N, fillLight));

    vec3 H = normalize(keyLight + V);
    float specPower = uMaterialType > 0.5 ? 42.0 : 16.0;
    float spec = pow(max(0.0, dot(N, H)), specPower);
    float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.6);

    // Beveled edge highlight along ribbon borders (uv.y near 0 or 1)
    float borderDist = min(vUv.y, 1.0 - vUv.y);
    float bevelRim = smoothstep(0.08, 0.0, borderDist);

    // Base color mixing along length and depth
    vec3 baseCol = mix(uColorPrimary, uColorSecondary, smoothstep(-1.0, 1.0, sin(vUv.x * 4.5 + uRibbonIndex)));
    vec3 litCol = baseCol * (0.32 + diffKey * 0.68 + diffFill * 0.25);

    // Add satin metal anisotropy or glass internal sheen
    litCol += mix(uColorEdge, vec3(1.0, 0.97, 0.94), 0.55) * (spec * 0.62 + fresnel * 0.38 + bevelRim * 0.52);

    // Depth atmospheric cue
    float depthShade = clamp((vDepth + 2.0) / 3.8, 0.55, 1.15);
    litCol *= depthShade;

    // Choreographed directional clip along ribbon length on intro
    float introClip = smoothstep(vUv.x - 0.15, vUv.x + 0.15, uIntro * 1.15);
    float alpha = (uMaterialType > 0.5 ? 0.86 : 0.96) * introClip;

    gl_FragColor = vec4(litCol, alpha);
  }
`;

interface RibbonEntry {
  mesh: THREE.Mesh;
  shadowMesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  shadowMaterial: THREE.ShaderMaterial;
}

export class ChromaticRibbonsEffect implements BackgroundEffect {
  public readonly id = 'chromatic-ribbons' as const;
  public readonly indexNumber = '06';
  public readonly label = 'CHROMATIC RIBBONS';
  public readonly headlineAccent = 'SCULPTURAL WEAVE';
  public readonly shortDescription =
    'Seven 2.5D procedural spline ribbons of alternating tinted glass and satin metal with twisted normals, projected contact shadows, and woven interlacing.';
  public readonly helpText = 'MOVE FOR DEPTH PARALLAX · CLICK TO INTERLACE BANDS · SCROLL TO SHIFT';
  public readonly category = 'ribbon' as const;

  public readonly palettes: Palette[] = [
    createPalette('atelier', 'ATELIER', ['#F472B6', '#FDE68A', '#60A5FA', '#FB7185'], '#0B0A10'),
    createPalette('iridium', 'IRIDIUM', ['#38BDF8', '#94A3B8', '#A3E635', '#818CF8'], '#070A12'),
    createPalette('copper-studio', 'COPPER STUDIO', ['#EA580C', '#FBBF24', '#14B8A6', '#F87171'], '#110908'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneGeometry;
  private ribbons: RibbonEntry[] = [];
  private bgColor = new THREE.Color('#0B0A10');
  private weaveSpring: SpringState = { value: 0.35, velocity: 0 };

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    const aspect = context.width / Math.max(1, context.height);
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 10.5);

    const segsX = context.isSoftwareGl ? 64 : 128;
    const segsY = context.isSoftwareGl ? 8 : 16;
    this.geometry = new THREE.PlaneGeometry(1, 1, segsX, segsY);

    const pal = this.palettes[0];
    this.bgColor.set(pal.bgHex);

    const count = 7;
    this.ribbons = [];

    for (let i = 0; i < count; i++) {
      const baseUniforms = {
        uTime: { value: 0 },
        uSpeed: { value: 0.45 },
        uInteraction: { value: 0.7 },
        uRibbonIndex: { value: i },
        uWeaveFactor: { value: 0.35 },
        uPointer: { value: new THREE.Vector2(0.62, 0.52) },
        uDragOffset: { value: new THREE.Vector2(0, 0) },
        uWheelOffset: { value: 0 },
        uClickPulse: { value: 0 },
        uMaterialType: { value: i % 2 },
        uIsShadowPass: { value: 0.0 },
        uIntro: { value: 1 },
        uColorPrimary: { value: pal.colors[i % 4].clone() },
        uColorSecondary: { value: pal.colors[(i + 1) % 4].clone() },
        uColorEdge: { value: pal.colors[(i + 2) % 4].clone() },
        uBgColor: { value: new THREE.Color(pal.bgHex) },
      };

      const shadowUniforms = THREE.UniformsUtils.clone(baseUniforms);
      shadowUniforms.uIsShadowPass.value = 1.0;

      const shadowMat = new THREE.ShaderMaterial({
        vertexShader: RIBBON_VERTEX_SHADER,
        fragmentShader: RIBBON_FRAGMENT_SHADER,
        uniforms: shadowUniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const ribbonMat = new THREE.ShaderMaterial({
        vertexShader: RIBBON_VERTEX_SHADER,
        fragmentShader: RIBBON_FRAGMENT_SHADER,
        uniforms: baseUniforms,
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
      });

      const shadowMesh = new THREE.Mesh(this.geometry, shadowMat);
      shadowMesh.frustumCulled = false;
      shadowMesh.renderOrder = i;

      const mesh = new THREE.Mesh(this.geometry, ribbonMat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 10 + i;

      this.scene.add(shadowMesh);
      this.scene.add(mesh);

      this.ribbons.push({
        mesh,
        shadowMesh,
        material: ribbonMat,
        shadowMaterial: shadowMat,
      });
    }
  }

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const alpha = dampValue(0, 1, 8, dt);
    this.bgColor.lerp(new THREE.Color(pal.bgHex), alpha);

    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    // Choreographed transition between parallel bands and interlaced bands (toggled by click or slow cycle)
    const cycleWeave = Math.sin(elapsed * 0.28) * 0.5 + 0.5;
    const targetWeave = input.clickCount % 2 === 1 ? 1.0 : 0.25 + cycleWeave * 0.45;
    this.weaveSpring = stepSpring(this.weaveSpring, targetWeave, 75, 8.5, dt);

    for (let i = 0; i < this.ribbons.length; i++) {
      const r = this.ribbons[i];
      for (const mat of [r.material, r.shadowMaterial]) {
        const u = mat.uniforms;
        u.uColorPrimary.value.lerp(pal.colors[i % 4], alpha);
        u.uColorSecondary.value.lerp(pal.colors[(i + 1) % 4], alpha);
        u.uColorEdge.value.lerp(pal.colors[(i + 2) % 4], alpha);
        u.uBgColor.value.copy(this.bgColor);

        u.uTime.value = elapsed;
        u.uSpeed.value = speedNorm;
        u.uInteraction.value = interactionNorm;
        u.uWeaveFactor.value = this.weaveSpring.value;
        u.uPointer.value.set(input.x, input.y);
        u.uDragOffset.value.set(input.dragOffsetX, input.dragOffsetY);
        u.uWheelOffset.value = input.wheelDelta;
        u.uClickPulse.value = input.clickPulse;
        u.uIntro.value = controls.introProgress;
      }
    }
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    renderer.setRenderTarget(output);
    renderer.setClearColor(this.bgColor, 1);
    renderer.clear();
    renderer.render(this.scene, this.camera);
  }

  public reset(): void {
    this.weaveSpring = { value: 0.35, velocity: 0 };
  }

  public dispose(): void {
    this.geometry.dispose();
    for (const r of this.ribbons) {
      r.material.dispose();
      r.shadowMaterial.dispose();
    }
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/fluted-light/FlutedLightEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from '../../engine/passes/FullscreenPass';

// Pass 1: Separate luminous color-field scene behind the architectural glass
const BG_FIELD_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float t = uTime * (0.32 + uSpeed * 0.68);

    // Rich diagonal light beams and atmospheric color masses behind the glass
    vec2 centerA = vec2(0.22 + sin(t * 0.7) * 0.24, 0.12 + cos(t * 0.55) * 0.22);
    vec2 centerB = vec2(-0.12 + cos(t * 0.48) * 0.28, -0.18 + sin(t * 0.62) * 0.25);
    vec2 centerC = vec2(0.38 + sin(t * 0.4 - 1.2) * 0.22, -0.08 + cos(t * 0.75) * 0.28);

    float dA = length((p - centerA) * vec2(0.85, 1.15));
    float dB = length((p - centerB) * vec2(1.2, 0.8));
    float dC = length((p - centerC) * vec2(0.95, 0.95));

    float bloomA = exp(-dA * dA * 2.8);
    float bloomB = exp(-dB * dB * 2.2);
    float bloomC = exp(-dC * dC * 3.4);

    // Diagonal luminous architectural horizon band
    float bandAngle = p.x * 0.75 + p.y * 0.65 + sin(p.x * 3.2 + t) * 0.14;
    float warmHorizon = exp(-pow((bandAngle - 0.12) * 2.6, 2.0));

    vec3 col = uBgColor;
    col = mix(col, uColor2, bloomB * 0.88);
    col = mix(col, uColor0, clamp(bloomA + warmHorizon * 0.65, 0.0, 1.0));
    col = mix(col, uColor1, pow(clamp(bloomA * 0.75 + warmHorizon * 0.5, 0.0, 1.0), 1.4) * 0.85);
    col = mix(col, uColor3, bloomC * 0.72);

    // Pointer acts as a moving warm architectural area light behind the glass
    vec2 ptrP = (uPointer - 0.5) * vec2(uAspect, 1.0);
    float ptrDist = length(p - ptrP);
    float areaLight = exp(-ptrDist * ptrDist * 5.5) * uInteraction;
    col += mix(uColor1, vec3(1.0, 0.92, 0.84), 0.5) * areaLight * 0.65;

    // Click emits a luminous wave across the light field
    if (uClickPulse > 0.01) {
      vec2 clkP = (uClickPos - 0.5) * vec2(uAspect, 1.0);
      float cDist = length(p - clkP);
      float waveR = (1.0 - uClickPulse) * 0.85;
      float ring = exp(-pow((cDist - waveR) / 0.09, 2.0)) * uClickPulse * uInteraction;
      col += mix(uColor0, uColor3, 0.5) * ring * 0.95;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Pass 2: Floor-to-ceiling ribbed fluted glass refracting tBackground
const FLUTED_GLASS_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tBackground;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPointerVel;
  uniform vec2 uDragOffset;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform float uIntro;
  uniform vec3 uColor1;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * (0.3 + uSpeed * 0.6);

    // Pointer distance & local wave along ribs
    vec2 deltaPtr = (uv - uPointer) * vec2(uAspect, 1.0);
    float distPtr = length(deltaPtr);
    float nearField = exp(-distPtr * distPtr * 7.5) * uInteraction;

    // Dragging bends groove pitch and shears rib angle with spring recovery
    float dragAngle = uDragOffset.x * 0.18 * uInteraction;
    float dragPitchShift = 1.0 - uDragOffset.y * 0.22 * uInteraction;

    // Outward traveling rib wave from pointer motion and click
    float clickDist = length((uv - uClickPos) * vec2(uAspect, 1.0));
    float clickWave = sin(clickDist * 28.0 - (1.0 - uClickPulse) * 16.0) *
                      exp(-clickDist * 3.5) * uClickPulse * uInteraction;

    float baseRibCount = 34.0 * dragPitchShift;
    // Shear X coordinate slightly by Y when dragged or near pointer
    float shearedX = uv.x + (uv.y - 0.5) * dragAngle +
                     deltaPtr.x * nearField * 0.08 +
                     clickWave * 0.018;

    float ribCoord = shearedX * baseRibCount;
    float ribIndex = floor(ribCoord);
    float ribFract = fract(ribCoord); // 0..1 across a single vertical flute

    // Cylindrical flute profile: x in [-1, 1] across each groove
    float xFlute = ribFract * 2.0 - 1.0;

    // Height profile h(x) = sqrt(1 - x^2 * 0.88) and analytical derivative dh/dx
    float fluteCurve = sqrt(max(0.08, 1.0 - xFlute * xFlute * 0.88));
    float dHdx = (-xFlute * 0.88) / fluteCurve;

    // Subtle vertical undulation inside the glass casting
    float dHdy = sin(uv.y * 14.0 + ribIndex * 0.7 + t * 0.8) * 0.06 +
                 deltaPtr.y * nearField * 0.35;

    // Surface normal of the fluted glass rib
    vec3 normal = normalize(vec3(-dHdx * (0.72 + nearField * 0.35), -dHdy, 1.0));

    // View vector and Snell's Law refraction with RGB chromatic dispersion
    vec3 viewDir = vec3(0.0, 0.0, -1.0);
    float iorBase = 1.48;
    vec3 refractedR = refract(viewDir, normal, 1.0 / (iorBase - 0.025));
    vec3 refractedG = refract(viewDir, normal, 1.0 / iorBase);
    vec3 refractedB = refract(viewDir, normal, 1.0 / (iorBase + 0.025));

    // Scale UV offset so each flute genuinely magnifies/inverts a slice of the background light field
    float glassStrength = 0.068 + nearField * 0.032 + abs(uDragOffset.x) * 0.025;
    vec2 uvR = clamp(uv + refractedR.xy * glassStrength * vec2(1.0, 0.45), 0.002, 0.998);
    vec2 uvG = clamp(uv + refractedG.xy * glassStrength * vec2(1.0, 0.45), 0.002, 0.998);
    vec2 uvB = clamp(uv + refractedB.xy * glassStrength * vec2(1.0, 0.45), 0.002, 0.998);

    // Multi-tap vertical frosted diffusion inside the glass thickness
    vec2 blurStep = vec2(0.0, 0.0065);
    float r = (
      texture2D(tBackground, uvR - blurStep).r +
      texture2D(tBackground, uvR).r * 2.0 +
      texture2D(tBackground, uvR + blurStep).r
    ) * 0.25;
    float g = (
      texture2D(tBackground, uvG - blurStep).g +
      texture2D(tBackground, uvG).g * 2.0 +
      texture2D(tBackground, uvG + blurStep).g
    ) * 0.25;
    float b = (
      texture2D(tBackground, uvB - blurStep).b +
      texture2D(tBackground, uvB).b * 2.0 +
      texture2D(tBackground, uvB + blurStep).b
    ) * 0.25;

    vec3 refractedColor = vec3(r, g, b);

    // Architectural lighting on the glass ribs (moving pointer light + ambient key light)
    vec3 keyLightDir = normalize(vec3(0.55 + sin(t * 0.5) * 0.25, 0.35, 0.75));
    vec3 ptrLightDir = normalize(vec3(
      (uPointer.x - uv.x) * uAspect * 1.8,
      (uPointer.y - uv.y) * 1.8,
      0.55
    ));

    float specKey = pow(max(0.0, dot(normal, keyLightDir)), 28.0);
    float specPtr = pow(max(0.0, dot(normal, ptrLightDir)), 22.0) * nearField * 1.4;

    // Schlick Fresnel glancing highlight along flute ridges
    float cosTheta = clamp(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);
    float fresnel = pow(1.0 - cosTheta, 3.2);

    // Subtle groove seam occlusion at the valley between ribs
    float valleyShadow = smoothstep(0.0, 0.16, 1.0 - abs(xFlute));
    refractedColor *= mix(0.68, 1.04, valleyShadow);

    // Add glancing specular highlights
    vec3 glintColor = mix(uColor1, vec3(1.0, 0.96, 0.92), 0.65);
    vec3 rimTint = mix(uColor3, vec3(0.88, 0.94, 1.0), 0.5);
    vec3 col = refractedColor +
               glintColor * (specKey * 0.32 + specPtr * 0.45) +
               rimTint * fresnel * 0.22;

    // Fine optical micro-grain (extremely subtle architectural glass texture)
    float grain = (hash12(uv * 900.0 + fract(uTime)) - 0.5) * 0.018;
    col += grain;

    // Localized contrast scrim on left third so hero copy stays crisp
    float leftReadability = smoothstep(0.0, 0.54, uv.x);
    col = mix(mix(uBgColor * 0.72, col, 0.68), col, leftReadability);

    // Choreographed center-out refractive wipe during intro
    float centerDist = abs(uv.x - 0.52);
    float introMask = smoothstep(centerDist - 0.15, centerDist + 0.15, uIntro * 0.85);
    col = mix(uBgColor, col, introMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class FlutedLightEffect implements BackgroundEffect {
  public readonly id = 'fluted-light' as const;
  public readonly indexNumber = '02';
  public readonly label = 'FLUTED LIGHT';
  public readonly headlineAccent = 'GLASS IN MOTION';
  public readonly shortDescription =
    'Floor-to-ceiling architectural ribbed glass refracting an offscreen chromatic light-field with Snell dispersion and spring-damped groove shear.';
  public readonly helpText = 'MOVE TO BEND LIGHT · DRAG TO WARP RIBS · CLICK FOR REFRACTIVE WAVE';
  public readonly category = 'glass' as const;

  public readonly palettes: Palette[] = [
    createPalette('afterglow', 'AFTERGLOW', ['#FF6A3D', '#FFB48A', '#7A1C24', '#164E63'], '#0B090E'),
    createPalette('glacier', 'GLACIER', ['#38BDF8', '#818CF8', '#E0E7FF', '#0F172A'], '#060913'),
    createPalette('violet-hour', 'VIOLET HOUR', ['#C084FC', '#FB7185', '#4F46E5', '#1E1B4B'], '#090712'),
  ];

  private bgTarget!: THREE.WebGLRenderTarget;
  private bgPass!: FullscreenPass;
  private glassPass!: FullscreenPass;
  private dragSpringX: SpringState = { value: 0, velocity: 0 };
  private dragSpringY: SpringState = { value: 0, velocity: 0 };

  public init(context: EffectContext): void {
    const rtWidth = Math.max(128, Math.floor(context.width * 0.65));
    const rtHeight = Math.max(128, Math.floor(context.height * 0.65));

    this.bgTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    });

    const pal = this.palettes[0];
    const aspect = context.width / Math.max(1, context.height);

    this.bgPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: BG_FIELD_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: aspect },
          uColor0: { value: pal.colors[0].clone() },
          uColor1: { value: pal.colors[1].clone() },
          uColor2: { value: pal.colors[2].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.glassPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: FLUTED_GLASS_FRAGMENT_SHADER,
        uniforms: {
          tBackground: { value: this.bgTarget.texture },
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uDragOffset: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: aspect },
          uIntro: { value: 1 },
          uColor1: { value: pal.colors[1].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    const scale = Math.min(0.85, 0.55 * pixelRatio);
    this.bgTarget.setSize(
      Math.max(128, Math.floor(width * scale)),
      Math.max(128, Math.floor(height * scale))
    );
    const aspect = width / Math.max(1, height);
    this.bgPass.material.uniforms.uAspect.value = aspect;
    this.glassPass.material.uniforms.uAspect.value = aspect;
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const uBg = this.bgPass.material.uniforms;
    const uGlass = this.glassPass.material.uniforms;

    const alpha = dampValue(0, 1, 8, dt);
    uBg.uColor0.value.lerp(pal.colors[0], alpha);
    uBg.uColor1.value.lerp(pal.colors[1], alpha);
    uBg.uColor2.value.lerp(pal.colors[2], alpha);
    uBg.uColor3.value.lerp(pal.colors[3], alpha);
    const bgCol = new THREE.Color(pal.bgHex);
    uBg.uBgColor.value.lerp(bgCol, alpha);

    uGlass.uColor1.value.lerp(pal.colors[1], alpha);
    uGlass.uColor3.value.lerp(pal.colors[3], alpha);
    uGlass.uBgColor.value.lerp(bgCol, alpha);

    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;
    const interactionNorm = (controls.interaction / 100) * 1.25;

    this.dragSpringX = stepSpring(this.dragSpringX, input.dragOffsetX, 110, 8.5, dt);
    this.dragSpringY = stepSpring(this.dragSpringY, input.dragOffsetY, 110, 8.5, dt);

    uBg.uTime.value = elapsed;
    uBg.uSpeed.value = speedNorm;
    uBg.uInteraction.value = interactionNorm;
    uBg.uPointer.value.set(input.x, input.y);
    uBg.uClickPulse.value = input.clickPulse;
    uBg.uClickPos.value.set(input.clickX, input.clickY);

    uGlass.uTime.value = elapsed;
    uGlass.uSpeed.value = speedNorm;
    uGlass.uInteraction.value = interactionNorm;
    uGlass.uPointer.value.set(input.x, input.y);
    uGlass.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    uGlass.uDragOffset.value.set(this.dragSpringX.value, this.dragSpringY.value);
    uGlass.uClickPulse.value = input.clickPulse;
    uGlass.uClickPos.value.set(input.clickX, input.clickY);
    uGlass.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    // Pass 1: Render luminous gradient field into offscreen texture
    this.bgPass.render(renderer, this.bgTarget);
    // Pass 2: Refract offscreen light field through fluted glass ribs
    this.glassPass.material.uniforms.tBackground.value = this.bgTarget.texture;
    this.glassPass.render(renderer, output);
  }

  public reset(): void {
    this.dragSpringX = { value: 0, velocity: 0 };
    this.dragSpringY = { value: 0, velocity: 0 };
  }

  public dispose(): void {
    this.bgTarget.dispose();
    this.bgPass.dispose();
    this.glassPass.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/glass-lens/GlassLensEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue, stepSpring, type SpringState } from '../../engine/math';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from '../../engine/passes/FullscreenPass';

// Pass 1: Source field with flowing multicolor strata and crisp optical meridian contours
// so magnification and curvature inside the glass lens are unmistakably visible
const LENS_SOURCE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uAspect;
  uniform vec3 uColor0;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float t = uTime * (0.32 + uSpeed * 0.65);

    // Layered chromatic topographic ribbons
    float wave1 = sin(p.x * 3.2 + p.y * 2.1 + t * 0.8 + sin(p.y * 4.2 - t * 0.5) * 0.65);
    float wave2 = cos(p.x * 2.4 - p.y * 3.5 - t * 0.65 + cos(p.x * 3.6 + t * 0.4) * 0.55);
    float orb = exp(-length(p - vec2(0.18 + sin(t * 0.5) * 0.16, 0.04 + cos(t * 0.4) * 0.14)) * 2.4);

    vec3 col = uBgColor;
    col = mix(col, uColor0, smoothstep(-0.35, 0.65, wave1) * 0.85);
    col = mix(col, uColor1, smoothstep(-0.2, 0.75, wave2) * 0.78);
    col = mix(col, uColor2, orb * 0.92);
    col = mix(col, uColor3, smoothstep(0.35, 0.92, wave1 * wave2 + orb * 0.5) * 0.85);

    // Crisp architectural meridian lines & topographic rings (demonstrates lens magnification clearly)
    float contourField = (p.x * 4.5 + p.y * 2.5 + sin(p.y * 5.0 + t * 0.6) * 0.55);
    float contourLine = smoothstep(0.032, 0.0, abs(fract(contourField) - 0.5));
    float orthoGrid = smoothstep(0.015, 0.0, abs(fract(p.x * 3.0) - 0.5)) +
                      smoothstep(0.015, 0.0, abs(fract(p.y * 3.0) - 0.5));

    col += mix(uColor3, vec3(1.0), 0.55) * contourLine * 0.24;
    col += vec3(1.0, 0.96, 0.9) * clamp(orthoGrid, 0.0, 1.0) * 0.09;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Pass 2: Optical Thick-Glass Lens sampling Pass 1 with nonlinear magnification & dispersion
const LENS_OPTICAL_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tSource;
  uniform float uTime;
  uniform float uInteraction;
  uniform vec2 uLensCenter;
  uniform vec2 uLensStretch;
  uniform float uFocalPower;
  uniform float uClickPulse;
  uniform float uAspect;
  uniform float uIntro;
  uniform vec3 uColor0;
  uniform vec3 uColor3;
  uniform vec3 uBgColor;

  void main() {
    vec2 uv = vUv;
    vec3 baseSource = texture2D(tSource, uv).rgb;

    // Relative position to the thick glass lens in aspect-corrected coordinates
    vec2 rel = (uv - uLensCenter) * vec2(uAspect, 1.0);

    // Slight rotation + stretch from pointer drag with spring recovery
    float angle = uLensStretch.x * 0.28 + sin(uTime * 0.35) * 0.06;
    float ca = cos(angle);
    float sa = sin(angle);
    vec2 rotRel = mat2(ca, -sa, sa, ca) * rel;

    // Elliptical organic lens radii (substantial right-side presence)
    vec2 radii = vec2(0.39 + uLensStretch.x * 0.09, 0.33 + uLensStretch.y * 0.08) *
                 mix(0.4, 1.0, uIntro);
    vec2 q = rotRel / max(vec2(0.05), radii);

    // Super-ellipse / capsule-like refined curvature
    float rNorm = pow(pow(abs(q.x), 2.15) + pow(abs(q.y), 2.15), 1.0 / 2.15);

    // Smooth boundary mask of the thick optical element
    float insideMask = 1.0 - smoothstep(0.965, 1.005, rNorm);

    // Spherical/aspheric dome height z = sqrt(1 - r^2) inside the lens
    float clampedR = min(0.995, rNorm);
    float domeZ = sqrt(max(0.01, 1.0 - clampedR * clampedR));

    // Outward 3D surface normal of the curved thick lens
    vec2 domeGrad = (q / max(0.12, domeZ)) * 0.85;
    vec3 normal = normalize(vec3(domeGrad.x, domeGrad.y, 1.0));

    // Nonlinear optical magnification + bevel refraction
    // uFocalPower toggles between convex magnification (+0.36) and concave wide-field (-0.28)
    float radialCurve = mix(1.0, 1.85, clampedR * clampedR);
    vec2 lensOffset = (uv - uLensCenter) * (-uFocalPower * radialCurve);
    vec2 bevelRefract = -normal.xy * (0.045 + 0.055 * pow(clampedR, 2.2)) * uInteraction;
    vec2 totalDisp = lensOffset + bevelRefract;

    // Chromatic aberration (RGB wavelength separation strongest near the thick lens rim)
    float dispersion = (0.004 + 0.014 * pow(clampedR, 2.4)) * (0.7 + 0.3 * uInteraction);
    vec2 dir = length(rel) > 0.0001 ? normalize(rel) : vec2(1.0, 0.0);

    vec2 uvR = clamp(uv + totalDisp + dir * dispersion, 0.002, 0.998);
    vec2 uvG = clamp(uv + totalDisp, 0.002, 0.998);
    vec2 uvB = clamp(uv + totalDisp - dir * dispersion, 0.002, 0.998);

    vec3 lensSample = vec3(
      texture2D(tSource, uvR).r,
      texture2D(tSource, uvG).g,
      texture2D(tSource, uvB).b
    );

    // Optical glass transmittance tint, Fresnel edge reflection, and caustic focal ring
    float fresnel = pow(1.0 - domeZ, 3.0);
    float rimBand = exp(-pow((rNorm - 0.96) / 0.032, 2.0));
    float innerCaustic = exp(-pow((rNorm - 0.82) / 0.07, 2.0)) *
                         (0.5 + 0.5 * sin(atan(rotRel.y, rotRel.x) * 2.0 + uTime * 1.4));

    vec3 lightDir1 = normalize(vec3(-0.55, 0.65, 0.52));
    vec3 lightDir2 = normalize(vec3(0.65, -0.45, 0.61));
    float spec1 = pow(max(0.0, dot(normal, lightDir1)), 36.0);
    float spec2 = pow(max(0.0, dot(normal, lightDir2)), 24.0);

    vec3 glassInterior = lensSample * 1.06 +
                         mix(uColor3, vec3(1.0), 0.6) * fresnel * 0.28 +
                         mix(uColor0, vec3(1.0, 0.95, 0.88), 0.5) * innerCaustic * 0.25 +
                         vec3(1.0, 0.98, 0.95) * (spec1 * 0.55 + spec2 * 0.32);

    // Subtle exterior drop-shadow / caustic halo just outside the lens rim
    float outerShadow = exp(-pow((rNorm - 1.03) / 0.06, 2.0)) * step(1.0, rNorm);
    vec3 outsideColor = baseSource * (1.0 - outerShadow * 0.38);

    vec3 col = mix(outsideColor, glassInterior, insideMask);
    // Crisp specular glass rim edge
    col += mix(uColor3, vec3(1.0), 0.75) * rimBand * (0.48 + uClickPulse * 0.5);

    // Left readability veil
    float leftVeil = smoothstep(0.0, 0.5, uv.x);
    col = mix(mix(uBgColor * 0.74, col, 0.68), col, leftVeil);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class GlassLensEffect implements BackgroundEffect {
  public readonly id = 'glass-lens' as const;
  public readonly indexNumber = '04';
  public readonly label = 'GLASS LENS';
  public readonly headlineAccent = 'SHIFT PERSPECTIVE';
  public readonly shortDescription =
    'Movable thick-glass optical element refracting a separate chromatic meridian pass with spring inertia, rim stretch, and dual focal lengths.';
  public readonly helpText = 'MOVE TO GUIDE LENS · DRAG TO STRETCH RIM · CLICK TO TOGGLE FOCAL POWER';
  public readonly category = 'lens' as const;

  public readonly palettes: Palette[] = [
    createPalette('lagoon', 'LAGOON', ['#06B6D4', '#10B981', '#FF6B4A', '#6366F1'], '#050C14'),
    createPalette('rose-quartz', 'ROSE QUARTZ', ['#F472B6', '#FB923C', '#8B5CF6', '#FDE047'], '#100712'),
    createPalette('dusk', 'DUSK', ['#3B82F6', '#F97316', '#A855F7', '#2DD4BF'], '#070914'),
  ];

  private sourceTarget!: THREE.WebGLRenderTarget;
  private sourcePass!: FullscreenPass;
  private lensPass!: FullscreenPass;

  private centerSpringX: SpringState = { value: 0.65, velocity: 0 };
  private centerSpringY: SpringState = { value: 0.52, velocity: 0 };
  private stretchSpringX: SpringState = { value: 0, velocity: 0 };
  private stretchSpringY: SpringState = { value: 0, velocity: 0 };
  private focalSpring: SpringState = { value: 0.36, velocity: 0 };

  public init(context: EffectContext): void {
    const rtW = Math.max(128, Math.floor(context.width * 0.75));
    const rtH = Math.max(128, Math.floor(context.height * 0.75));

    this.sourceTarget = new THREE.WebGLRenderTarget(rtW, rtH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    });

    const pal = this.palettes[0];
    const aspect = context.width / Math.max(1, context.height);

    this.sourcePass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: LENS_SOURCE_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uAspect: { value: aspect },
          uColor0: { value: pal.colors[0].clone() },
          uColor1: { value: pal.colors[1].clone() },
          uColor2: { value: pal.colors[2].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );

    this.lensPass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: LENS_OPTICAL_FRAGMENT_SHADER,
        uniforms: {
          tSource: { value: this.sourceTarget.texture },
          uTime: { value: 0 },
          uInteraction: { value: 0.7 },
          uLensCenter: { value: new THREE.Vector2(0.65, 0.52) },
          uLensStretch: { value: new THREE.Vector2(0, 0) },
          uFocalPower: { value: 0.36 },
          uClickPulse: { value: 0 },
          uAspect: { value: aspect },
          uIntro: { value: 1 },
          uColor0: { value: pal.colors[0].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    const scale = Math.min(0.9, 0.65 * pixelRatio);
    this.sourceTarget.setSize(
      Math.max(128, Math.floor(width * scale)),
      Math.max(128, Math.floor(height * scale))
    );
    const aspect = width / Math.max(1, height);
    this.sourcePass.material.uniforms.uAspect.value = aspect;
    this.lensPass.material.uniforms.uAspect.value = aspect;
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const uSrc = this.sourcePass.material.uniforms;
    const uLens = this.lensPass.material.uniforms;

    const alpha = dampValue(0, 1, 8, dt);
    uSrc.uColor0.value.lerp(pal.colors[0], alpha);
    uSrc.uColor1.value.lerp(pal.colors[1], alpha);
    uSrc.uColor2.value.lerp(pal.colors[2], alpha);
    uSrc.uColor3.value.lerp(pal.colors[3], alpha);
    const bgCol = new THREE.Color(pal.bgHex);
    uSrc.uBgColor.value.lerp(bgCol, alpha);

    uLens.uColor0.value.lerp(pal.colors[0], alpha);
    uLens.uColor3.value.lerp(pal.colors[3], alpha);
    uLens.uBgColor.value.lerp(bgCol, alpha);

    const interactionNorm = (controls.interaction / 100) * 1.25;
    const speedNorm = controls.reducedMotion ? 0.02 : controls.speed / 100;

    // Target lens center stays within a safe composition zone while tracking pointer with inertia
    const idleX = 0.65 + Math.sin(elapsed * 0.45) * 0.035 * speedNorm;
    const idleY = 0.52 + Math.cos(elapsed * 0.38) * 0.03 * speedNorm;
    const targetX = input.isPointerInside
      ? THREE.MathUtils.clamp(THREE.MathUtils.lerp(0.64, input.x, 0.68 * Math.min(1, interactionNorm)), 0.28, 0.84)
      : idleX;
    const targetY = input.isPointerInside
      ? THREE.MathUtils.clamp(THREE.MathUtils.lerp(0.52, input.y, 0.68 * Math.min(1, interactionNorm)), 0.22, 0.80)
      : idleY;

    this.centerSpringX = stepSpring(this.centerSpringX, targetX, 65, 9.0, dt);
    this.centerSpringY = stepSpring(this.centerSpringY, targetY, 65, 9.0, dt);

    const stretchTargetX = input.dragOffsetX * 1.25 + input.smoothVx * 0.06;
    const stretchTargetY = input.dragOffsetY * 1.25 + input.smoothVy * 0.06;
    this.stretchSpringX = stepSpring(this.stretchSpringX, stretchTargetX, 130, 8.0, dt);
    this.stretchSpringY = stepSpring(this.stretchSpringY, stretchTargetY, 130, 8.0, dt);

    // Tap/click toggles between two optical focal lengths (convex magnification vs wide-angle inversion)
    const targetFocal = input.clickCount % 2 === 0 ? 0.36 : -0.26;
    this.focalSpring = stepSpring(this.focalSpring, targetFocal, 110, 10.0, dt);

    uSrc.uTime.value = elapsed;
    uSrc.uSpeed.value = speedNorm;

    uLens.uTime.value = elapsed;
    uLens.uInteraction.value = interactionNorm;
    uLens.uLensCenter.value.set(this.centerSpringX.value, this.centerSpringY.value);
    uLens.uLensStretch.value.set(this.stretchSpringX.value, this.stretchSpringY.value);
    uLens.uFocalPower.value = this.focalSpring.value;
    uLens.uClickPulse.value = input.clickPulse;
    uLens.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    // Pass 1: Render chromatic meridian source field into offscreen target
    this.sourcePass.render(renderer, this.sourceTarget);
    // Pass 2: Sample source field through the optical thick-glass lens
    this.lensPass.material.uniforms.tSource.value = this.sourceTarget.texture;
    this.lensPass.render(renderer, output);
  }

  public reset(): void {
    this.centerSpringX = { value: 0.65, velocity: 0 };
    this.centerSpringY = { value: 0.52, velocity: 0 };
    this.stretchSpringX = { value: 0, velocity: 0 };
    this.stretchSpringY = { value: 0, velocity: 0 };
    this.focalSpring = { value: 0.36, velocity: 0 };
  }

  public dispose(): void {
    this.sourceTarget.dispose();
    this.sourcePass.dispose();
    this.lensPass.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/refraction-field/RefractionFieldEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from '../../engine/passes/FullscreenPass';

const FACET_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uPointerVel;
  uniform vec2 uDragOffset;
  uniform float uClickPulse;
  uniform vec2 uClickPos;
  uniform float uAspect;
  uniform float uIntro;
  uniform vec3 uColor0; // Copper / Coral
  uniform vec3 uColor1; // Warm Amber
  uniform vec3 uColor2; // Cool Slate
  uniform vec3 uColor3; // Deep Teal
  uniform vec3 uBgColor;

  vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
  }

  // Underlying chromatic gradient field that facets refract
  vec3 sampleBackdrop(vec2 uv, float t) {
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    float g1 = sin(p.x * 2.2 - p.y * 1.8 + t * 0.55) * 0.5 + 0.5;
    float g2 = cos(p.x * 1.7 + p.y * 2.4 - t * 0.45) * 0.5 + 0.5;
    float diag = clamp((uv.x * 0.68 + uv.y * 0.32), 0.0, 1.0);

    vec3 col = mix(uColor3, uColor2, g2);
    col = mix(col, uColor0, smoothstep(0.25, 0.85, diag * g1 + 0.15));
    col = mix(col, uColor1, pow(g1 * g2, 1.8) * 0.78);
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * (0.28 + uSpeed * 0.62);

    // Art-directed asymmetrical polygon tessellation scale (large sculptural glass plates)
    vec2 scaledUv = (uv - 0.5) * vec2(uAspect * 4.8, 4.2);
    // Slight architectural shear so facets are never a boring uniform square grid
    scaledUv.x += scaledUv.y * 0.24;

    vec2 cellId = floor(scaledUv);
    vec2 cellFract = fract(scaledUv);

    float minDist1 = 8.0;
    float minDist2 = 8.0;
    vec2 nearestSeed = vec2(0.0);
    vec2 nearestId = vec2(0.0);
    vec2 nearestRel = vec2(0.0);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 id = cellId + neighbor;
        vec2 rand = hash22(id);
        // Gentle autonomous breath of facet vertices
        vec2 point = neighbor + 0.18 + 0.64 * (0.5 + 0.42 * sin(t * 0.55 + 6.2831 * rand));
        vec2 diff = point - cellFract;
        float dist = length(diff);

        if (dist < minDist1) {
          minDist2 = minDist1;
          minDist1 = dist;
          nearestSeed = rand;
          nearestId = id;
          nearestRel = diff;
        } else if (dist < minDist2) {
          minDist2 = dist;
        }
      }
    }

    // Distance to polygon seam boundary
    float edgeDist = minDist2 - minDist1;

    // World UV center of the winning facet
    vec2 facetCenterScaled = cellId + cellFract + nearestRel;
    facetCenterScaled.x -= facetCenterScaled.y * 0.24;
    vec2 facetCenterUv = facetCenterScaled / vec2(uAspect * 4.8, 4.2) + 0.5;

    // Radial pointer pressure hinges nearby facets outward
    vec2 ptrToFacet = (facetCenterUv - uPointer) * vec2(uAspect, 1.0);
    float ptrDist = length(ptrToFacet);
    float pressure = exp(-ptrDist * ptrDist * 7.5) * uInteraction;

    // Spatially traveling click wave across neighboring facets (not simultaneous)
    vec2 clkToFacet = (facetCenterUv - uClickPos) * vec2(uAspect, 1.0);
    float clkDist = length(clkToFacet);
    float waveFront = (1.0 - uClickPulse) * 0.95;
    float facetWave = sin((clkDist - waveFront) * 24.0) *
                      exp(-pow((clkDist - waveFront) / 0.15, 2.0)) *
                      uClickPulse * uInteraction;

    // Compute per-facet 3D normal from intrinsic crystal orientation + pointer hinge + click wave
    vec2 baseTilt = (nearestSeed - 0.5) * 0.45;
    vec2 hingeDir = ptrDist > 0.001 ? normalize(ptrToFacet) : vec2(1.0, 0.0);
    vec2 waveDir = clkDist > 0.001 ? normalize(clkToFacet) : vec2(0.0, 1.0);

    vec2 facetNormalXY = baseTilt +
                         hingeDir * pressure * 0.85 +
                         uDragOffset * pressure * 0.75 +
                         waveDir * facetWave * 0.8;

    // Bevel chamfer near polygon seams
    vec2 seamGrad = length(nearestRel) > 0.001 ? normalize(nearestRel) : vec2(0.0);
    float bevelFactor = smoothstep(0.11, 0.0, edgeDist);
    vec3 normal = normalize(vec3(facetNormalXY + seamGrad * bevelFactor * 0.55, 1.0));

    // Per-facet thickness & UV refraction with RGB chromatic separation
    float thickness = 0.048 + nearestSeed.x * 0.035 + pressure * 0.03;
    vec2 uvOffset = -normal.xy * thickness;
    vec2 chromaShift = normal.xy * 0.0075 * (1.0 + pressure);

    vec3 refracted = vec3(
      sampleBackdrop(uv + uvOffset + chromaShift, t).r,
      sampleBackdrop(uv + uvOffset, t).g,
      sampleBackdrop(uv + uvOffset - chromaShift, t).b
    );

    // Specular lighting & caustic seam glints
    vec3 light1 = normalize(vec3(0.58, 0.62, 0.52));
    vec3 light2 = normalize(vec3(-0.65, 0.35, 0.67));
    float spec1 = pow(max(0.0, dot(normal, light1)), 28.0);
    float spec2 = pow(max(0.0, dot(normal, light2)), 18.0);
    float fresnel = pow(1.0 - max(0.0, normal.z), 2.5);

    // Crisp luminous caustic seam line between glass polygons
    float seamLine = smoothstep(0.032, 0.004, edgeDist);
    float seamShadow = smoothstep(0.0, 0.07, edgeDist);

    vec3 facetTint = mix(uColor0, uColor2, nearestSeed.y);
    vec3 col = refracted * mix(0.76, 1.06, seamShadow);
    col = mix(col, facetTint, 0.14);
    col += mix(uColor1, vec3(1.0, 0.96, 0.9), 0.6) * (spec1 * 0.48 + spec2 * 0.26 + fresnel * 0.25);
    col += mix(uColor1, uColor0, 0.5) * seamLine * (0.42 + pressure * 0.45 + abs(facetWave) * 0.55);

    // Left text readability scrim
    float leftVeil = smoothstep(0.0, 0.52, uv.x);
    col = mix(mix(uBgColor * 0.74, col, 0.68), col, leftVeil);

    // Choreographed facet-by-facet ignition on initial load
    float facetThreshold = (1.0 - facetCenterUv.x) * 0.45 + nearestSeed.x * 0.35;
    float introMask = smoothstep(facetThreshold, facetThreshold + 0.25, uIntro);
    col = mix(uBgColor, col, introMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class RefractionFieldEffect implements BackgroundEffect {
  public readonly id = 'refraction-field' as const;
  public readonly indexNumber = '08';
  public readonly label = 'REFRACTION FIELD';
  public readonly headlineAccent = 'CRYSTALLINE FACETS';
  public readonly shortDescription =
    'Asymmetrical translucent glass polygon tessellation with per-facet hinge normals, bevel caustics, and spatially traveling pressure waves.';
  public readonly helpText = 'HOVER TO HINGE FACETS · DRAG TO TILT PLATES · CLICK FOR SPATIAL WAVE';
  public readonly category = 'facet' as const;

  public readonly palettes: Palette[] = [
    createPalette('copper-slate', 'COPPER SLATE', ['#E06D53', '#F4A261', '#335C67', '#1D3557'], '#080D14'),
    createPalette('prism-quartz', 'PRISM QUARTZ', ['#F472B6', '#38BDF8', '#818CF8', '#312E81'], '#090714'),
    createPalette('malachite', 'MALACHITE', ['#10B981', '#F59E0B', '#0F766E', '#1E293B'], '#050E10'),
  ];

  private pass!: FullscreenPass;

  public init(context: EffectContext): void {
    const pal = this.palettes[0];
    const aspect = context.width / Math.max(1, context.height);

    this.pass = new FullscreenPass(
      new THREE.ShaderMaterial({
        vertexShader: FULLSCREEN_VERTEX_SHADER,
        fragmentShader: FACET_FRAGMENT_SHADER,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: 0.45 },
          uInteraction: { value: 0.7 },
          uPointer: { value: new THREE.Vector2(0.62, 0.52) },
          uPointerVel: { value: new THREE.Vector2(0, 0) },
          uDragOffset: { value: new THREE.Vector2(0, 0) },
          uClickPulse: { value: 0 },
          uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
          uAspect: { value: aspect },
          uIntro: { value: 1 },
          uColor0: { value: pal.colors[0].clone() },
          uColor1: { value: pal.colors[1].clone() },
          uColor2: { value: pal.colors[2].clone() },
          uColor3: { value: pal.colors[3].clone() },
          uBgColor: { value: new THREE.Color(pal.bgHex) },
        },
        depthTest: false,
        depthWrite: false,
      })
    );
  }

  public resize(width: number, height: number): void {
    this.pass.material.uniforms.uAspect.value = width / Math.max(1, height);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const u = this.pass.material.uniforms;
    const alpha = dampValue(0, 1, 8, dt);

    u.uColor0.value.lerp(pal.colors[0], alpha);
    u.uColor1.value.lerp(pal.colors[1], alpha);
    u.uColor2.value.lerp(pal.colors[2], alpha);
    u.uColor3.value.lerp(pal.colors[3], alpha);
    u.uBgColor.value.lerp(new THREE.Color(pal.bgHex), alpha);

    u.uTime.value = elapsed;
    u.uSpeed.value = controls.reducedMotion ? 0.02 : controls.speed / 100;
    u.uInteraction.value = (controls.interaction / 100) * 1.25;
    u.uPointer.value.set(input.x, input.y);
    u.uPointerVel.value.set(input.smoothVx, input.smoothVy);
    u.uDragOffset.value.set(input.dragOffsetX, input.dragOffsetY);
    u.uClickPulse.value = input.clickPulse;
    u.uClickPos.value.set(input.clickX, input.clickY);
    u.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    this.pass.render(renderer, output);
  }

  public reset(): void {
    this.pass.material.uniforms.uDragOffset.value.set(0, 0);
  }

  public dispose(): void {
    this.pass.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/effects/silk-atmosphere/SilkAtmosphereEffect.ts">
<![CDATA[import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  InputState,
  Palette,
} from '../../engine/effectTypes';
import { createPalette, dampValue } from '../../engine/math';

const SILK_VERTEX_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vFoldHeight;
  varying float vPointerInfluence;

  uniform float uTime;
  uniform float uSpeed;
  uniform float uInteraction;
  uniform vec2 uPointer;
  uniform vec2 uDragOffset;
  uniform float uClickPulse;
  uniform vec2 uClickPos;

  float silkHeight(vec2 uv, float t) {
    // Broad architectural silk folds
    float diag1 = uv.x * 3.8 - uv.y * 2.6 + sin(uv.y * 3.2 + t * 0.55) * 0.85;
    float diag2 = uv.x * 2.1 + uv.y * 4.1 - cos(uv.x * 2.8 - t * 0.42) * 0.75;
    float foldA = sin(diag1) * 0.42 + sin(diag1 * 2.1 + 0.8) * 0.14;
    float foldB = cos(diag2) * 0.32 + sin(diag2 * 1.8 - t * 0.3) * 0.12;
    float h = foldA + foldB;

    // Pointer depression with surrounding rebound ridge
    vec2 dp = uv - uPointer;
    float dist = length(dp);
    float depression = -exp(-dist * dist * 16.0) * 0.55 * uInteraction;
    float reboundRidge = exp(-pow((dist - 0.18) / 0.09, 2.0)) * 0.26 * uInteraction;

    // Drag directional stretch ripple
    float dragWave = sin(dot(dp, uDragOffset) * 24.0) * exp(-dist * 4.5) * length(uDragOffset) * 0.35 * uInteraction;

    // Click traveling wave
    float cDist = length(uv - uClickPos);
    float cRadius = (1.0 - uClickPulse) * 0.75;
    float clickWave = sin((cDist - cRadius) * 28.0) *
                      exp(-pow((cDist - cRadius) / 0.14, 2.0)) *
                      uClickPulse * 0.45 * uInteraction;

    return h + depression + reboundRidge + dragWave + clickWave;
  }

  void main() {
    vUv = uv;
    float t = uTime * (0.35 + uSpeed * 0.75);

    float eps = 0.008;
    float hC = silkHeight(uv, t);
    float hR = silkHeight(uv + vec2(eps, 0.0), t);
    float hT = silkHeight(uv + vec2(0.0, eps), t);

    vec3 pos = position;
    pos.z += hC;
    // Subtle lateral fabric gather toward folds
    pos.x += (hR - hC) * 0.45 + uDragOffset.x * exp(-length(uv - uPointer) * 3.5) * 0.35;
    pos.y += (hT - hC) * 0.45 + uDragOffset.y * exp(-length(uv - uPointer) * 3.5) * 0.35;

    vec3 tangentX = normalize(vec3(eps * 14.0, 0.0, hR - hC));
    vec3 tangentY = normalize(vec3(0.0, eps * 9.0, hT - hC));
    vNormal = normalize(cross(tangentX, tangentY));

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPosition.xyz;
    vFoldHeight = hC;
    vPointerInfluence = exp(-length(uv - uPointer) * 4.2) * uInteraction;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const SILK_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vFoldHeight;
  varying float vPointerInfluence;

  uniform float uTime;
  uniform float uIntro;
  uniform vec3 uColor0; // Warm Parchment / Alabaster
  uniform vec3 uColor1; // Dusty Teal
  uniform vec3 uColor2; // Midnight Petroleum
  uniform vec3 uColor3; // Restrained Gold Highlight
  uniform vec3 uBgColor;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);

    // Oblique grazing warm directional beam + cool sky fill
    vec3 keyLight = normalize(vec3(0.72, 0.42, 0.55));
    vec3 rimLight = normalize(vec3(-0.65, -0.35, 0.68));

    float diffKey = max(0.0, dot(N, keyLight));
    float diffRim = max(0.0, dot(N, rimLight));

    // Anisotropic silk sheen along fold crests
    vec3 H = normalize(keyLight + V);
    float sheen = pow(max(0.0, dot(N, H)), 14.0);
    float fresnel = pow(1.0 - max(0.0, dot(N, V)), 2.8);

    // Subsurface scattering translucency on thin elevated folds
    float sss = smoothstep(-0.35, 0.65, vFoldHeight) * pow(max(0.0, dot(-keyLight, N) + 0.65), 2.0);

    vec3 baseFabric = mix(uColor2, uColor1, smoothstep(-0.45, 0.35, vFoldHeight + diffRim * 0.35));
    baseFabric = mix(baseFabric, uColor0, pow(diffKey, 1.25) * 0.78);

    // Gold grazing highlight on silk crests and around pointer depression
    vec3 highlight = mix(uColor3, uColor0, 0.45) * (sheen * 0.65 + fresnel * 0.42 + sss * 0.25);
    vec3 col = baseFabric + highlight + uColor3 * vPointerInfluence * fresnel * 0.45;

    // Preserve readability on left third
    float leftScrim = smoothstep(0.0, 0.5, vUv.x);
    col = mix(mix(uBgColor * 0.78, col, 0.66), col, leftScrim);

    // Choreographed intro reveal
    float introMask = smoothstep(0.0, 1.0, uIntro * 1.25 - (1.0 - vUv.y) * 0.25);
    col = mix(uBgColor, col, introMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export class SilkAtmosphereEffect implements BackgroundEffect {
  public readonly id = 'silk-atmosphere' as const;
  public readonly indexNumber = '03';
  public readonly label = 'SILK ATMOSPHERE';
  public readonly headlineAccent = 'TRANSLUCENT FOLDS';
  public readonly shortDescription =
    'Deformable 3D tessellated silk heightfield with analytical fold derivatives, grazing oblique beam lighting, and subsurface sheen.';
  public readonly helpText = 'HOVER TO DEPRESS FABRIC · DRAG TO STRETCH FOLDS · CLICK FOR WAVE';
  public readonly category = 'fabric' as const;

  public readonly palettes: Palette[] = [
    createPalette('parchment', 'PARCHMENT', ['#EAE2D3', '#2E6F73', '#0D222B', '#D9A05B'], '#071117'),
    createPalette('obsidian-silk', 'OBSIDIAN SILK', ['#D8D4E8', '#3B2D64', '#120E24', '#E57A54'], '#080612'),
    createPalette('vermilion', 'VERMILION', ['#F2E6DC', '#B83A2A', '#261110', '#E09F5A'], '#110707'),
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private geometry!: THREE.PlaneGeometry;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;

  public init(context: EffectContext): void {
    this.scene = new THREE.Scene();
    const aspect = context.width / Math.max(1, context.height);
    this.camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 100);
    this.camera.position.set(0, -0.65, 9.2);
    this.camera.lookAt(0, 0, 0);

    const segsX = context.isSoftwareGl ? 64 : 136;
    const segsY = context.isSoftwareGl ? 42 : 88;
    this.geometry = new THREE.PlaneGeometry(16.5, 10.2, segsX, segsY);

    const pal = this.palettes[0];
    this.material = new THREE.ShaderMaterial({
      vertexShader: SILK_VERTEX_SHADER,
      fragmentShader: SILK_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0.45 },
        uInteraction: { value: 0.7 },
        uPointer: { value: new THREE.Vector2(0.62, 0.52) },
        uDragOffset: { value: new THREE.Vector2(0, 0) },
        uClickPulse: { value: 0 },
        uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
        uIntro: { value: 1 },
        uColor0: { value: pal.colors[0].clone() },
        uColor1: { value: pal.colors[1].clone() },
        uColor2: { value: pal.colors[2].clone() },
        uColor3: { value: pal.colors[3].clone() },
        uBgColor: { value: new THREE.Color(pal.bgHex) },
      },
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  public resize(width: number, height: number): void {
    const aspect = width / Math.max(1, height);
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    const scaleX = Math.max(1.0, aspect / 1.55);
    this.mesh.scale.set(scaleX, 1.0, 1.0);
  }

  public update(
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls
  ): void {
    const pal = this.palettes[controls.paletteIndex % this.palettes.length];
    const u = this.material.uniforms;
    const alpha = dampValue(0, 1, 8, dt);

    u.uColor0.value.lerp(pal.colors[0], alpha);
    u.uColor1.value.lerp(pal.colors[1], alpha);
    u.uColor2.value.lerp(pal.colors[2], alpha);
    u.uColor3.value.lerp(pal.colors[3], alpha);
    u.uBgColor.value.lerp(new THREE.Color(pal.bgHex), alpha);

    u.uTime.value = elapsed;
    u.uSpeed.value = controls.reducedMotion ? 0.02 : controls.speed / 100;
    u.uInteraction.value = (controls.interaction / 100) * 1.25;
    u.uPointer.value.set(input.x, input.y);
    u.uDragOffset.value.set(input.dragOffsetX, input.dragOffsetY);
    u.uClickPulse.value = input.clickPulse;
    u.uClickPos.value.set(input.clickX, input.clickY);
    u.uIntro.value = controls.introProgress;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    renderer.setRenderTarget(output);
    renderer.setClearColor(this.material.uniforms.uBgColor.value, 1);
    renderer.clear();
    renderer.render(this.scene, this.camera);
  }

  public reset(): void {
    this.material.uniforms.uDragOffset.value.set(0, 0);
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/passes/FullscreenPass.ts">
<![CDATA[import * as THREE from 'three';

export const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export class FullscreenPass {
  public readonly scene: THREE.Scene;
  public readonly camera: THREE.OrthographicCamera;
  public readonly geometry: THREE.PlaneGeometry;
  public readonly mesh: THREE.Mesh;
  public material: THREE.ShaderMaterial;

  constructor(material: THREE.ShaderMaterial) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = material;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  public render(renderer: THREE.WebGLRenderer, target: THREE.WebGLRenderTarget | null = null): void {
    renderer.setRenderTarget(target);
    renderer.render(this.scene, this.camera);
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/passes/PingPongTargets.ts">
<![CDATA[import * as THREE from 'three';

export class PingPongTargets {
  public read: THREE.WebGLRenderTarget;
  public write: THREE.WebGLRenderTarget;
  private width: number;
  private height: number;

  constructor(width: number, height: number, useHalfFloat = true) {
    this.width = Math.max(16, Math.floor(width));
    this.height = Math.max(16, Math.floor(height));

    const options: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: useHalfFloat ? THREE.HalfFloatType : THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    };

    this.read = new THREE.WebGLRenderTarget(this.width, this.height, options);
    this.write = new THREE.WebGLRenderTarget(this.width, this.height, options);
  }

  public swap(): void {
    const tmp = this.read;
    this.read = this.write;
    this.write = tmp;
  }

  public resize(width: number, height: number): void {
    const w = Math.max(16, Math.floor(width));
    const h = Math.max(16, Math.floor(height));
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    this.read.setSize(w, h);
    this.write.setSize(w, h);
  }

  public clear(renderer: THREE.WebGLRenderer, color = new THREE.Color(0, 0, 0), alpha = 1): void {
    const prevColor = new THREE.Color();
    renderer.getClearColor(prevColor);
    const prevAlpha = renderer.getClearAlpha();

    renderer.setClearColor(color, alpha);
    renderer.setRenderTarget(this.read);
    renderer.clear();
    renderer.setRenderTarget(this.write);
    renderer.clear();
    renderer.setRenderTarget(null);

    renderer.setClearColor(prevColor, prevAlpha);
  }

  public dispose(): void {
    this.read.dispose();
    this.write.dispose();
  }
}
]]>
    </file>
    <file path="src/app/(surface08)/surface08/engine/passes/TransitionPass.ts">
<![CDATA[import * as THREE from 'three';
import { FULLSCREEN_VERTEX_SHADER, FullscreenPass } from './FullscreenPass';

const TRANSITION_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tOutgoing;
  uniform sampler2D tIncoming;
  uniform float uProgress;
  uniform int uFamily;
  uniform vec2 uResolution;
  uniform vec2 uPointer;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
      mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(1.0, uResolution.y);
    float t = clamp(uProgress, 0.0, 1.0);
    // Smooth S-curve
    float easeT = t * t * (3.0 - 2.0 * t);
    float boundaryGlow = 0.0;
    float mask = easeT;
    vec2 uvOut = uv;
    vec2 uvIn = uv;

    if (uFamily == 0) {
      // Family 0: Viscous Fluted Rib Wipe (Fluid <-> Glass)
      float ribs = sin(uv.x * 46.0 + sin(uv.y * 5.0) * 1.4) * 0.055;
      float wave = (uv.x * 0.85 + (1.0 - uv.y) * 0.15) + ribs;
      float edge = easeT * 1.35 - 0.175;
      mask = smoothstep(edge - 0.09, edge + 0.09, wave);
      mask = 1.0 - mask;
      boundaryGlow = exp(-pow((wave - edge) * 16.0, 2.0));
      float refractShift = boundaryGlow * 0.045 * sin(uv.x * 90.0);
      uvOut += vec2(refractShift, refractShift * 0.35);
      uvIn -= vec2(refractShift * 0.85, -refractShift * 0.25);
    } else if (uFamily == 1) {
      // Family 1: Diagonal Silk Shear (Glass <-> Silk / Ribbons)
      float diag = (uv.x * 0.72 + uv.y * 0.58) + sin(uv.y * 9.0 - uv.x * 6.0) * 0.07;
      float edge = easeT * 1.55 - 0.12;
      mask = 1.0 - smoothstep(edge - 0.12, edge + 0.12, diag);
      boundaryGlow = exp(-pow((diag - edge) * 12.0, 2.0));
      vec2 shearDir = normalize(vec2(1.0, -0.65));
      uvOut += shearDir * boundaryGlow * 0.06 * (1.0 - easeT);
      uvIn -= shearDir * boundaryGlow * 0.06 * easeT;
    } else if (uFamily == 2) {
      // Family 2: Optical Caustic Aperture (Lens / Aurora / Bokeh)
      vec2 center = mix(vec2(0.58, 0.52), uPointer, 0.35);
      vec2 d = (uv - center) * vec2(aspect, 1.0);
      float dist = length(d);
      float maxR = length(vec2(aspect, 1.0)) * 1.05;
      float radius = easeT * maxR;
      float angle = atan(d.y, d.x);
      float lobe = sin(angle * 4.0 + easeT * 4.0) * 0.035;
      mask = 1.0 - smoothstep(radius - 0.11, radius + 0.11, dist + lobe);
      boundaryGlow = exp(-pow((dist + lobe - radius) * 14.0, 2.0));
      vec2 radialDir = dist > 0.0001 ? normalize(uv - center) : vec2(0.0);
      uvOut -= radialDir * boundaryGlow * 0.065;
      uvIn += radialDir * boundaryGlow * 0.055;
    } else {
      // Family 3: Faceted Voronoi Melt (Refraction Field <-> Any)
      vec2 gridUv = uv * vec2(aspect * 7.0, 7.0);
      float cellNoise = noise2D(floor(gridUv) + vec2(3.7, 9.1));
      float field = uv.x * 0.55 + (1.0 - uv.y) * 0.45 + (cellNoise - 0.5) * 0.28;
      float edge = easeT * 1.45 - 0.22;
      mask = 1.0 - smoothstep(edge - 0.07, edge + 0.07, field);
      boundaryGlow = exp(-pow((field - edge) * 16.0, 2.0));
      vec2 facetShift = (vec2(cellNoise, fract(cellNoise * 17.3)) - 0.5) * 0.08 * boundaryGlow;
      uvOut += facetShift;
      uvIn -= facetShift;
    }

    // Subtle RGB spectral dispersion along the optical seam
    float chromaOffset = boundaryGlow * 0.009;
    vec3 colOut = vec3(
      texture2D(tOutgoing, clamp(uvOut + vec2(chromaOffset, 0.0), 0.0, 1.0)).r,
      texture2D(tOutgoing, clamp(uvOut, 0.0, 1.0)).g,
      texture2D(tOutgoing, clamp(uvOut - vec2(chromaOffset, 0.0), 0.0, 1.0)).b
    );

    vec3 colIn = vec3(
      texture2D(tIncoming, clamp(uvIn + vec2(chromaOffset, 0.0), 0.0, 1.0)).r,
      texture2D(tIncoming, clamp(uvIn, 0.0, 1.0)).g,
      texture2D(tIncoming, clamp(uvIn - vec2(chromaOffset, 0.0), 0.0, 1.0)).b
    );

    vec3 seamCaustic = vec3(1.0, 0.78, 0.64) * boundaryGlow * 0.26 * sin(easeT * 3.14159265);
    vec3 finalColor = mix(colOut, colIn, mask) + seamCaustic;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export class TransitionPass {
  private pass: FullscreenPass;
  private uniforms: {
    tOutgoing: { value: THREE.Texture | null };
    tIncoming: { value: THREE.Texture | null };
    uProgress: { value: number };
    uFamily: { value: number };
    uResolution: { value: THREE.Vector2 };
    uPointer: { value: THREE.Vector2 };
  };

  constructor() {
    this.uniforms = {
      tOutgoing: { value: null },
      tIncoming: { value: null },
      uProgress: { value: 0 },
      uFamily: { value: 0 },
      uResolution: { value: new THREE.Vector2(1440, 900) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: TRANSITION_FRAGMENT_SHADER,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });

    this.pass = new FullscreenPass(material);
  }

  public resize(width: number, height: number): void {
    this.uniforms.uResolution.value.set(width, height);
  }

  public render(
    renderer: THREE.WebGLRenderer,
    outgoingTex: THREE.Texture,
    incomingTex: THREE.Texture,
    progress: number,
    familyId: number,
    pointerX: number,
    pointerY: number,
    output: THREE.WebGLRenderTarget | null = null
  ): void {
    this.uniforms.tOutgoing.value = outgoingTex;
    this.uniforms.tIncoming.value = incomingTex;
    this.uniforms.uProgress.value = progress;
    this.uniforms.uFamily.value = familyId;
    this.uniforms.uPointer.value.set(pointerX, pointerY);
    this.pass.render(renderer, output);
  }

  public dispose(): void {
    this.pass.dispose();
  }
}
]]>
    </file>
  </files>
</template>
