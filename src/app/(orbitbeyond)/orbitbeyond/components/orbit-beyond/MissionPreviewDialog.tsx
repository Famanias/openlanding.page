'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Download, RotateCcw, X } from 'lucide-react';
import {
  deriveMissionDetails,
  formatMissionBriefText,
  type MissionPlan,
} from '../../lib/orbit-beyond/mission';
import { GlassButton } from './GlassButton';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface MissionPreviewDialogProps {
  open: boolean;
  plan: MissionPlan;
  onClose: () => void;
  onReset: () => void;
}

export function MissionPreviewDialog({
  open,
  plan,
  onClose,
  onReset,
}: MissionPreviewDialogProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [copiedState, setCopiedState] = useState<'idle' | 'copied'>('idle');
  const [downloadedState, setDownloadedState] = useState<'idle' | 'downloaded'>('idle');

  const details = deriveMissionDetails(plan);
  const briefText = formatMissionBriefText(plan);

  useEffect(() => {
    if (!open) {
      setCopiedState('idle');
      setDownloadedState('idle');
      return;
    }

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleCopyBrief = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(briefText);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = briefText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textArea);
      }
    }
    setCopiedState('copied');
    window.setTimeout(() => setCopiedState('idle'), 3000);
  };

  const handleDownloadBrief = () => {
    const blob = new Blob([briefText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orbit-beyond-2045-${details.styleCode.toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedState('downloaded');
    window.setTimeout(() => setDownloadedState('idle'), 3000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mission-preview-dialog-title"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030812]/88 p-4 sm:p-6 backdrop-blur-xl overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { scale: 1 } : { scale: 0.96, y: 12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass relative my-auto w-full max-w-3xl rounded-[32px] p-6 sm:p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-hud-mono text-[11px] font-semibold tracking-[0.2em] text-[#8DE9FF] uppercase">
                    CONCEPT DEMO / NO BOOKING CREATED
                  </span>
                  <span aria-hidden="true" className="text-white/25">·</span>
                  <span className="font-hud-mono text-[11px] text-[#F6C98C]">
                    {details.styleCode}
                  </span>
                </div>
                <h3
                  id="mission-preview-dialog-title"
                  className="mt-1.5 font-display-sans text-2xl sm:text-3xl font-bold text-[#EDF6FD] uppercase"
                >
                  MISSION DOSSIER: {details.styleLabel}
                </h3>
                <p className="mt-1 text-xs font-hud-mono tracking-[0.14em] text-[#AAB7C4] uppercase">
                  ILLUSTRATIVE MISSION PLANNER — NO REAL FLIGHTS OR BOOKINGS.
                </p>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close mission preview dialog"
                onClick={onClose}
                className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[#EDF6FD] hover:border-[#8DE9FF]/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Selected Configuration Summary Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  MISSION STYLE
                </span>
                <span className="mt-1 block text-base font-bold text-[#EDF6FD]">
                  {details.styleLabel}
                </span>
                <span className="mt-0.5 block text-xs text-[#8DE9FF]">
                  {details.surfaceSector}
                </span>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  EXPEDITION PARTY
                </span>
                <span className="mt-1 block text-base font-bold text-[#EDF6FD]">
                  {details.partyLabel}
                </span>
                <span className="mt-0.5 block text-xs text-[#F6C98C]">
                  {details.cabinAllocation}
                </span>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  STAY DURATION
                </span>
                <span className="mt-1 block text-base font-bold text-[#EDF6FD]">
                  {details.durationLabel}
                </span>
                <span className="mt-0.5 block text-xs text-[#AAB7C4]">
                  {details.orbitalApogee}
                </span>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <span className="block font-hud-mono text-[10px] tracking-[0.18em] text-[#AAB7C4] uppercase">
                  GUIDED ROVER WALK
                </span>
                <span className="mt-1 block text-base font-bold text-[#8DE9FF]">
                  {plan.roverWalk ? 'ENABLED (4.2 KM ESCARPMENT)' : 'NOT SELECTED (DOME FOCUS)'}
                </span>
                <span className="mt-0.5 block text-xs text-[#AAB7C4]">
                  {details.roverLabel}
                </span>
              </div>
            </div>

            {/* Schedule Outline */}
            <div className="mt-6 rounded-[22px] border border-white/10 bg-[#030812]/70 p-5">
              <p className="font-hud-mono text-xs font-semibold tracking-[0.18em] text-[#8DE9FF] uppercase">
                CONFIGURED CONCEPT SCHEDULE
              </p>
              <ol className="mt-3 space-y-2.5">
                {details.scheduleOutline.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-[#EDF6FD]/90">
                    <span className="font-hud-mono text-xs text-[#8DE9FF] shrink-0">
                      0{index + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Live region for copy/download status */}
            <div className="sr-only" aria-live="polite">
              {copiedState === 'copied' ? 'Mission brief copied to clipboard.' : ''}
              {downloadedState === 'downloaded' ? 'Mission brief text file downloaded.' : ''}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <GlassButton
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => {
                  onReset();
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>RESET TO DEFAULTS</span>
              </GlassButton>

              <div className="flex flex-wrap items-center gap-3">
                <GlassButton
                  type="button"
                  variant="glass"
                  size="sm"
                  onClick={handleDownloadBrief}
                >
                  <Download className="h-3.5 w-3.5 text-[#8DE9FF]" />
                  <span>
                    {downloadedState === 'downloaded' ? 'BRIEF DOWNLOADED' : 'DOWNLOAD BRIEF'}
                  </span>
                </GlassButton>

                <GlassButton
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleCopyBrief}
                >
                  {copiedState === 'copied' ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>COPIED (CONCEPT DEMO)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY MISSION BRIEF</span>
                    </>
                  )}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
