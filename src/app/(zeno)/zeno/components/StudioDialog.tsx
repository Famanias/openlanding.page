'use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';
import { ParadoxMark } from './ParadoxMark';

interface StudioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartProject: () => void;
}

export const StudioDialog: React.FC<StudioDialogProps> = ({
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

  const { studioManifesto } = siteConfig;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[920px] bg-[#14141C] border border-[#F2F0EB]/25 p-6 sm:p-10 md:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.85)] my-auto max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#F2F0EB]/18 pb-5 mb-8">
          <div className="flex items-center gap-3">
            <ParadoxMark size={28} />
            <span className="text-[11px] sm:text-[12px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF]">
              {studioManifesto.label}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close Studio dialog"
            className="zeno-focus px-4 py-1.5 text-xs font-grotesk tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF] hover:text-[#A58AFF] transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Manifesto Headline & Copy */}
        <h2
          id="studio-dialog-title"
          className="font-editorial text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] leading-[1.02] uppercase text-[#F2F0EB] mb-6"
        >
          {studioManifesto.headline}
        </h2>

        <p className="text-[17px] sm:text-[19px] font-grotesk text-[#D8CFF2] leading-relaxed mb-6">
          {studioManifesto.lead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14.5px] sm:text-[15.5px] font-grotesk text-[#96939F] leading-relaxed mb-10">
          {studioManifesto.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Studio Principles */}
        <div className="border-t border-[#F2F0EB]/18 pt-7 mb-10">
          <h3 className="text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF] mb-5">
            STUDIO PRINCIPLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {studioManifesto.principles.map((p) => (
              <div key={p.index} className="border-t border-[#F2F0EB]/12 pt-3">
                <span className="text-xs font-grotesk text-[#A58AFF] tracking-[0.14em]">
                  {p.index}
                </span>
                <h4 className="text-base font-grotesk font-semibold text-[#F2F0EB] mt-1 mb-1.5">
                  {p.title}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#96939F] leading-relaxed">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Four Disciplines Summary */}
        <div className="border-t border-[#F2F0EB]/18 pt-7 mb-8">
          <h3 className="text-[11px] font-grotesk tracking-[0.16em] uppercase text-[#A58AFF] mb-4">
            FOUR INTEGRATED DISCIPLINES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {servicesData.map((s) => (
              <div key={s.id} className="p-3.5 border border-[#F2F0EB]/12 bg-[#111117]/60">
                <p className="text-xs font-grotesk font-semibold tracking-[0.06em] uppercase text-[#F2F0EB]">
                  {s.label}
                </p>
                <p className="text-xs text-[#96939F] mt-1">{s.shortDesc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#F2F0EB]/18">
          <span className="text-xs font-grotesk tracking-[0.1em] uppercase text-[#96939F]">
            ZENO. — INDEPENDENT CREATIVE PRACTICE
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="zeno-focus px-6 py-3 rounded-full bg-[#F2F0EB] text-[#111117] text-xs font-grotesk font-semibold tracking-[0.1em] uppercase hover:bg-[#A58AFF] transition-colors cursor-pointer"
          >
            START A PROJECT ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudioDialog;
