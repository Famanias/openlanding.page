'use client';

import { useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Grid2x2,
  LayoutTemplate,
  Move,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

export interface DebugControlsDockProps {
  enableMotion: boolean;
  enableParallax: boolean;
  wireframe: boolean;
  showSafeArea: boolean;
  audioEnabled: boolean;
  collapsed: boolean;
  onToggleMotion: () => void;
  onToggleParallax: () => void;
  onToggleWireframe: () => void;
  onToggleSafeArea: () => void;
  onToggleAudio: () => void;
  onResetCamera: () => void;
  onToggleCollapsed: () => void;
}

/**
 * Compact, collapsible bottom-center debug control dock.
 * Uses solid translucent rgba backing (never CSS backdrop-filter over WebGL)
 * so rendering stays smooth on every device while leaving the scenic canvas unobstructed.
 */
export function DebugControlsDock({
  enableMotion,
  enableParallax,
  wireframe,
  showSafeArea,
  audioEnabled,
  collapsed,
  onToggleMotion,
  onToggleParallax,
  onToggleWireframe,
  onToggleSafeArea,
  onToggleAudio,
  onResetCamera,
  onToggleCollapsed,
}: DebugControlsDockProps) {
  // Keyboard shortcut 'H' to toggle dock visibility for pure fullscreen inspection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }
      if (event.key.toLowerCase() === 'h') {
        onToggleCollapsed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleCollapsed]);

  const toggleBtnClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D5BC] ${
      active
        ? 'bg-[#F4EFE6] text-[#1A2431]'
        : 'bg-[#212E3E]/90 text-[#DCE2E8] hover:bg-[#2C3C50] hover:text-[#F4EFE6]'
    }`;

  return (
    <aside
      aria-label="Scene debug controls"
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-max max-w-[calc(100vw-1.5rem)]"
    >
      {/* Collapse / Expand toggle */}
      <button
        type="button"
        onClick={onToggleCollapsed}
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Show debug controls' : 'Hide debug controls'}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-1.5 rounded-md bg-[#16202C]/88 border border-[#F4EFE6]/16 text-[11px] font-medium text-[#E4DFD6] hover:bg-[#1E2B3A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D5BC]"
      >
        {collapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Scene Controls</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Hide Controls</span>
          </>
        )}
      </button>

      {!collapsed && (
        <div
          role="toolbar"
          aria-label="Scenic background debug actions"
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg bg-[#16202C]/90 border border-[#F4EFE6]/16 shadow-lg max-w-full"
        >
          <button
            type="button"
            onClick={onToggleMotion}
            aria-pressed={enableMotion}
            className={toggleBtnClass(enableMotion)}
          >
            {enableMotion ? (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>Motion</span>
          </button>

          <button
            type="button"
            onClick={onToggleParallax}
            aria-pressed={enableParallax}
            className={toggleBtnClass(enableParallax)}
          >
            <Move className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Parallax</span>
          </button>

          <button
            type="button"
            onClick={onToggleWireframe}
            aria-pressed={wireframe}
            className={toggleBtnClass(wireframe)}
          >
            <Grid2x2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Wireframe</span>
          </button>

          <button
            type="button"
            onClick={onToggleSafeArea}
            aria-pressed={showSafeArea}
            className={toggleBtnClass(showSafeArea)}
          >
            <LayoutTemplate className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Safe Area</span>
          </button>

          <button
            type="button"
            onClick={onToggleAudio}
            aria-pressed={audioEnabled}
            className={toggleBtnClass(audioEnabled)}
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>Audio</span>
          </button>

          <span aria-hidden="true" className="hidden sm:block w-px h-5 bg-[#F4EFE6]/16 mx-0.5 shrink-0" />

          <button
            type="button"
            onClick={onResetCamera}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 bg-[#212E3E]/90 text-[#DCE2E8] hover:bg-[#2C3C50] hover:text-[#F4EFE6] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D5BC]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Camera</span>
          </button>
        </div>
      )}
    </aside>
  );
}
