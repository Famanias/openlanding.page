'use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';

interface ApproachDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const ApproachDialog: React.FC<ApproachDialogProps> = ({
  isOpen,
  onClose,
  onStartProject,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approach-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[960px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 md:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.85)] my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F2F0EB]/18 pb-5 mb-8">
          <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF]">
            01 / OUR APPROACH — DISCOVER → DEFINE → DESIGN → DELIVER
          </span>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close Approach dialog"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        <h2
          id="approach-dialog-title"
          className="font-editorial text-[2rem] sm:text-[2.75rem] md:text-[3.2rem] leading-[1.04] uppercase text-[#F2F0EB] mb-3"
        >
          HOW AN IDEA GAINS{' '}
          <em className="zeno-accent-italic not-italic font-editorial italic">
            GRAVITY.
          </em>
        </h2>
        <p className="text-[15px] sm:text-[17px] font-grotesk text-[#A89FE0] max-w-[640px] mb-9">
          Every engagement moves through four deliberate stages—connecting strategic conviction with tactile execution.
        </p>

        {/* 4 Steps Grid: Discover -> Define -> Design -> Deliver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {siteConfig.approachSteps.map((step) => (
            <div
              key={step.number}
              className="border border-[#F2F0EB]/16 bg-[#111117]/75 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-grotesk tracking-[0.14em] uppercase text-[#A58AFF] mb-2">
                  <span>
                    {step.number} — {step.phase}
                  </span>
                  <span aria-hidden="true" className="text-[#5367F9]">
                    ●
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-grotesk font-semibold text-[#F2F0EB] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#96939F] leading-relaxed mb-5">
                  {step.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2F0EB]/12 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-grotesk tracking-[0.06em] uppercase text-[#D8CFF2]">
                {step.artifacts.map((art, i) => (
                  <React.Fragment key={art}>
                    {i > 0 && <span aria-hidden="true" className="text-[#A58AFF]">·</span>}
                    <span>{art}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F2F0EB]/18">
          <span className="text-xs font-grotesk tracking-[0.08em] uppercase text-[#96939F]">
            SENIOR-LED PRACTICE // NO HANDOFF DILUTION
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
          >
            DISCUSS YOUR BRIEF ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproachDialog;
