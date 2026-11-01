'use client';
import React, { useEffect, useState } from 'react';
import { CtrlRoomGlyphLogo } from '../icons/PixelSprites';

interface BootSequenceProps {
  onComplete?: () => void;
}

/**
 * Deterministic 4-strip pixel shutter reveal per Section 4 & Section 6:
 * - Settles in ~650ms so it never blocks navigation.
 * - Immediately bypassed when ?autostart=1, session repeat, or prefers-reduced-motion is active.
 */
export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onComplete?.();
      return;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.();
      return;
    }
    try {
      if (window.sessionStorage.getItem('ctrl_room_booted') === '1') {
        onComplete?.();
        return;
      }
    } catch {
      // Ignore sessionStorage restrictions
    }
    setVisible(true);
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;

    const t1 = window.setTimeout(() => setStep(1), 120);
    const t2 = window.setTimeout(() => setStep(2), 340);
    const t3 = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem('ctrl_room_booted', '1');
      } catch {
        // Ignore
      }
      setVisible(false);
      onComplete?.();
    }, 680);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      onClick={() => setVisible(false)}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] grid grid-rows-4 overflow-hidden"
    >
      {[0, 1, 2, 3].map((stripIdx) => (
        <div
          key={stripIdx}
          style={{
            transform: step >= 2 ? 'translateX(100%)' : 'translateX(0%)',
            transition: `transform 320ms steps(6, end) ${stripIdx * 55}ms`,
          }}
          className="bg-[#111A31] border-b-2 border-[#2858FF] flex items-center justify-between px-8"
        >
          {stripIdx === 1 && (
            <div className="flex items-center gap-3">
              <CtrlRoomGlyphLogo className="w-8 h-8" />
              <span className="cr-font-mono-code text-xs sm:text-sm font-bold text-[#E4FF58] tracking-widest">
                C/R OS — BUILD 01.15 — INITIALIZING 15-KEY SURFACE...
              </span>
            </div>
          )}
          {stripIdx === 2 && (
            <div className="w-full max-w-md h-2 bg-[#1A2747] border border-[#2858FF]">
              <div
                className="h-full bg-[#E4FF58] transition-all duration-200"
                style={{ width: step >= 1 ? '100%' : '35%' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
