'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  Frame,
  Grid2x2,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export interface SceneDebugDockProps {
  motionEnabled: boolean;
  parallaxEnabled: boolean;
  bloomEnabled: boolean;
  wireframe: boolean;
  showSafeZone: boolean;
  collapsed: boolean;
  onToggleMotion: () => void;
  onToggleParallax: () => void;
  onToggleBloom: () => void;
  onToggleWireframe: () => void;
  onToggleSafeZone: () => void;
  onResetCamera: () => void;
  onToggleCollapsed: () => void;
}

/**
 * Compact, collapsible bottom control dock for inspecting the scenic space
 * background. Uses solid translucent fills (no CSS backdrop-filter over WebGL)
 * and keeps the central viewport 100% unobstructed.
 */
export function SceneDebugDock({
  motionEnabled,
  parallaxEnabled,
  bloomEnabled,
  wireframe,
  showSafeZone,
  collapsed,
  onToggleMotion,
  onToggleParallax,
  onToggleBloom,
  onToggleWireframe,
  onToggleSafeZone,
  onResetCamera,
  onToggleCollapsed,
}: SceneDebugDockProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (event.key.toLowerCase() === 'h' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        onToggleCollapsed();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onToggleCollapsed]);

  const toggleButtonClass = (active: boolean) =>
    `inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[40px] px-2.5 sm:px-3.5 py-2 rounded-lg text-xs font-medium tracking-[0.01em] whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 ${
      active
        ? 'bg-sky-400/18 text-sky-100 border border-sky-300/35'
        : 'bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.09] hover:text-slate-100'
    }`;

  return (
    <aside
      aria-label="Scene controls"
      className="fixed bottom-3 sm:bottom-4 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center max-w-[96vw]"
    >
      {/* Collapse / Expand tab */}
      <button
        type="button"
        onClick={onToggleCollapsed}
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Show controls' : 'Hide controls'}
        className="mb-1.5 sm:mb-2 inline-flex items-center gap-1.5 min-h-[30px] sm:min-h-[32px] px-3 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-slate-100 bg-[#080d1a]/90 border border-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
      >
        {collapsed ? (
          <>
            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Show Controls</span>
          </>
        ) : (
          <>
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Hide Controls</span>
          </>
        )}
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="scene-debug-dock-bar"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-nowrap items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-[96vw] rounded-xl border border-white/10 bg-[#080d1a]/92 p-1.5 sm:p-2 shadow-[0_18px_48px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              onClick={onToggleMotion}
              aria-pressed={motionEnabled}
              aria-label="Motion"
              className={toggleButtonClass(motionEnabled)}
            >
              {motionEnabled ? (
                <Pause className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
              ) : (
                <Play className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              )}
              <span>Motion</span>
            </button>

            <button
              type="button"
              onClick={onToggleParallax}
              aria-pressed={parallaxEnabled}
              aria-label="Parallax"
              className={toggleButtonClass(parallaxEnabled)}
            >
              <MousePointer2
                className={`h-3.5 w-3.5 ${parallaxEnabled ? 'text-sky-300' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              <span>Parallax</span>
            </button>

            <button
              type="button"
              onClick={onToggleBloom}
              aria-pressed={bloomEnabled}
              aria-label="Bloom"
              className={toggleButtonClass(bloomEnabled)}
            >
              <Sparkles
                className={`h-3.5 w-3.5 ${bloomEnabled ? 'text-sky-300' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              <span>Bloom</span>
            </button>

            <button
              type="button"
              onClick={onToggleWireframe}
              aria-pressed={wireframe}
              aria-label="Wireframe"
              className={toggleButtonClass(wireframe)}
            >
              <Grid2x2
                className={`h-3.5 w-3.5 ${wireframe ? 'text-sky-300' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              <span>Wireframe</span>
            </button>

            <button
              type="button"
              onClick={onToggleSafeZone}
              aria-pressed={showSafeZone}
              aria-label="Safe Area"
              className={toggleButtonClass(showSafeZone)}
            >
              <Frame
                className={`h-3.5 w-3.5 ${showSafeZone ? 'text-sky-300' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Safe Area</span>
              <span className="sm:hidden">Safe</span>
            </button>

            <div
              aria-hidden="true"
              className="hidden sm:block h-6 w-px bg-white/10 mx-0.5"
            />

            <button
              type="button"
              onClick={onResetCamera}
              aria-label="Reset Camera"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[40px] px-2.5 sm:px-3.5 py-2 rounded-lg text-xs font-medium tracking-[0.01em] text-slate-200 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:text-white whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-300" aria-hidden="true" />
              <span className="hidden sm:inline">Reset Camera</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
