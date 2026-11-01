'use client';
import React, { useRef, useState } from 'react';
import {
  Minus,
  Maximize2,
  Minimize2,
  X,
  Move,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { AppId, OSWindowState } from '../../lib/os/types';
import { AppLauncherPixelIcon } from '../icons/PixelSprites';

interface OSWindowProps {
  windowState: OSWindowState;
  isFocused: boolean;
  condensedMode?: boolean;
  stageRef: React.RefObject<HTMLDivElement | null>;
  onFocus: (appId: AppId) => void;
  onClose: (appId: AppId) => void;
  onMinimize: (appId: AppId) => void;
  onToggleMaximize: (appId: AppId) => void;
  onMove: (appId: AppId, x: number, y: number, stageW: number, stageH: number) => void;
  onNudge: (appId: AppId, dx: number, dy: number, stageW: number, stageH: number) => void;
  children: React.ReactNode;
}

/**
 * Genuine draggable, keyboard-accessible CTRL/ROOM OS window component.
 * Uses direct Pointer Events + requestAnimationFrame batching for zero-latency dragging,
 * plus an explicit keyboard directional move popover for full keyboard-only accessibility.
 */
export const OSWindow: React.FC<OSWindowProps> = ({
  windowState,
  isFocused,
  condensedMode = false,
  stageRef,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onNudge,
  children,
}) => {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [showKeyboardMove, setShowKeyboardMove] = useState(false);
  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    rafId: number | null;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    rafId: null,
  });

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const getStageDimensions = () => {
    const rect = stageRef.current?.getBoundingClientRect();
    return {
      width: rect ? rect.width : 1220,
      height: rect ? rect.height : 640,
    };
  };

  const handlePointerDownTitlebar = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus(windowState.id);
    if (windowState.isMaximized) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: windowState.position.x,
      origY: windowState.position.y,
      rafId: null,
    };
  };

  const handlePointerMoveTitlebar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.dragging) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    const nextX = dragStateRef.current.origX + dx;
    const nextY = dragStateRef.current.origY + dy;

    if (dragStateRef.current.rafId !== null) {
      cancelAnimationFrame(dragStateRef.current.rafId);
    }

    dragStateRef.current.rafId = requestAnimationFrame(() => {
      const { width, height } = getStageDimensions();
      onMove(windowState.id, nextX, nextY, width, height);
    });
  };

  const handlePointerUpTitlebar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.dragging) return;
    dragStateRef.current.dragging = false;
    if (dragStateRef.current.rafId !== null) {
      cancelAnimationFrame(dragStateRef.current.rafId);
      dragStateRef.current.rafId = null;
    }
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer already released
    }
  };

  const triggerNudge = (dx: number, dy: number) => {
    const { width, height } = getStageDimensions();
    onNudge(windowState.id, dx, dy, width, height);
  };

  const style: React.CSSProperties = windowState.isMaximized
    ? {
        left: 8,
        top: 8,
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 56px)',
        zIndex: windowState.zIndex,
      }
    : condensedMode
    ? {
        left: windowState.id === 'deck-lab' ? 40 : 620,
        top: 32,
        width: windowState.id === 'deck-lab' ? 560 : 420,
        height: 460,
        zIndex: windowState.zIndex,
        transform: 'scale(0.96)',
      }
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.position.width,
        maxWidth: 'calc(100% - 16px)',
        height: windowState.position.height,
        maxHeight: 'calc(100% - 52px)',
        zIndex: windowState.zIndex,
      };

  return (
    <section
      ref={windowRef}
      aria-label={windowState.title}
      onMouseDown={() => onFocus(windowState.id)}
      style={style}
      className={`absolute flex flex-col bg-[#111A31] transition-shadow duration-150 ${
        isFocused
          ? 'border-2 border-[#E4FF58] cr-shadow-ctrl-lg'
          : 'border-2 border-[#61728F] cr-shadow-ctrl opacity-95'
      }`}
    >
      {/* Custom Notched Titlebar Handle */}
      <div
        onPointerDown={handlePointerDownTitlebar}
        onPointerMove={handlePointerMoveTitlebar}
        onPointerUp={handlePointerUpTitlebar}
        onPointerCancel={handlePointerUpTitlebar}
        className={`flex items-center justify-between gap-2 px-3 py-2 select-none cursor-grab active:cursor-grabbing border-b-2 ${
          isFocused
            ? 'bg-[#2858FF] text-[#E8F0FF] border-[#E4FF58]'
            : 'bg-[#192544] text-[#B6D7F7] border-[#61728F]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <AppLauncherPixelIcon appId={windowState.id} className="w-4 h-4 shrink-0" />
          <h2 className="cr-font-mono-code text-xs font-bold tracking-wider truncate">
            {windowState.title}
          </h2>
          {isFocused && (
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] cr-font-mono-code font-bold bg-[#111A31] text-[#E4FF58]">
              ACTIVE
            </span>
          )}
        </div>

        {/* Window Controls: Keyboard Move, Minimize, Expand/Restore, Close */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowKeyboardMove((prev) => !prev)}
              aria-label={`Move ${windowState.title} window with keyboard`}
              aria-expanded={showKeyboardMove}
              title="Keyboard Window Move Controls"
              className="p-1 bg-[#111A31] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] border border-[#E8F0FF]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
            >
              <Move className="w-3.5 h-3.5" />
            </button>

            {showKeyboardMove && (
              <div
                role="group"
                aria-label={`Position controls for ${windowState.title}`}
                className="absolute right-0 top-full mt-1 z-50 p-2 bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl w-40"
              >
                <div className="text-[10px] cr-font-mono-code font-bold text-[#E4FF58] mb-1.5">
                  NUDGE WINDOW (24PX)
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div />
                  <button
                    type="button"
                    onClick={() => triggerNudge(0, -24)}
                    aria-label={`Move ${windowState.title} up`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <div />
                  <button
                    type="button"
                    onClick={() => triggerNudge(-24, 0)}
                    aria-label={`Move ${windowState.title} left`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKeyboardMove(false)}
                    aria-label="Done moving window"
                    className="p-1 text-[9px] cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31]"
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerNudge(24, 0)}
                    aria-label={`Move ${windowState.title} right`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div />
                  <button
                    type="button"
                    onClick={() => triggerNudge(0, 24)}
                    aria-label={`Move ${windowState.title} down`}
                    className="p-1.5 bg-[#1B284A] hover:bg-[#2858FF] text-[#E8F0FF] flex justify-center border border-[#61728F]"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <div />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onMinimize(windowState.id)}
            aria-label={`Minimize ${windowState.title}`}
            title="Minimize"
            className="p-1 bg-[#111A31] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] border border-[#E8F0FF]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onToggleMaximize(windowState.id)}
            aria-label={
              windowState.isMaximized
                ? `Restore ${windowState.title}`
                : `Expand ${windowState.title}`
            }
            title={windowState.isMaximized ? 'Restore' : 'Expand'}
            className="p-1 bg-[#111A31] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31] border border-[#E8F0FF]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
          >
            {windowState.isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onClose(windowState.id)}
            aria-label={`Close ${windowState.title}`}
            title="Close"
            className="p-1 bg-[#FC5FA9] text-[#111A31] hover:bg-[#E4FF58] border border-[#111A31] transition-colors focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 bg-[#111A31] text-[#E8F0FF]">
        {children}
      </div>
    </section>
  );
};
