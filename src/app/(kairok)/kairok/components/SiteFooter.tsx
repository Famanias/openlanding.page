'use client';
import React from 'react';
import { KAIRO_ASSETS } from '../lib/assets';

export interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenWaitlist: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onNavigate,
  onOpenWaitlist,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-[#121315] text-[#f2efe9] border-t border-[#f2efe9]/12">
      {/* Section F: Quiet Invitation — Final Frame of a Film */}
      <div className="mx-auto max-w-[1360px] px-5 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="font-mono-kairo text-xs tracking-[0.22em] text-[#e68f63]">
              FINAL FRAME · KAIRO K-01
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="font-display-kairo mt-3 text-[clamp(2.25rem,4.8vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-[#f2efe9]"
            >
              Your next frame starts here.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#a8aaa9]">
              See beyond the expected. Reserve your place on the concept dispatch
              list or return to the optical journey above.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenWaitlist}
                className="kairo-btn-primary"
              >
                Join the KAIRO list
              </button>
              <button
                type="button"
                onClick={() => onNavigate('experience')}
                className="kairo-btn-secondary"
              >
                Replay optical journey
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2px] border border-[#f2efe9]/15 bg-[#16181c]">
              <img
                src={KAIRO_ASSETS.hero}
                alt="KAIRO K-01 mirrorless camera resting in warm studio rim light"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[360px] object-cover"
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono-kairo text-[11px] text-[#f2efe9]/75">
                <span>KAIRO K-01 CONCEPT</span>
                <span>SEE BEYOND THE EXPECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Restrained Footer Bar */}
      <div className="border-t border-[#f2efe9]/12 bg-[#0e0f11]">
        <div className="mx-auto max-w-[1360px] px-5 py-8 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <a
              href="#experience"
              onClick={(e) => handleAnchor(e, 'experience')}
              className="font-display-kairo text-base font-semibold tracking-[0.2em] text-[#f2efe9] hover:text-[#e68f63] transition-colors"
            >
              KAIRO
            </a>
            <p className="mt-1.5 text-xs text-[#a8aaa9] max-w-xl">
              KAIRO and the K-01 mirrorless system are a fictional industrial design
              and interactive optical study created for demonstration purposes. All
              controls and settings represent illustrative concept behaviors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono-kairo text-[#a8aaa9]">
            <a
              href="#experience"
              onClick={(e) => handleAnchor(e, 'experience')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Experience
            </a>
            <a
              href="#optics"
              onClick={(e) => handleAnchor(e, 'optics')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Optics
            </a>
            <a
              href="#engineering"
              onClick={(e) => handleAnchor(e, 'engineering')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Engineering
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleAnchor(e, 'gallery')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              Field Notes
            </a>
            <a
              href="#collection"
              onClick={(e) => handleAnchor(e, 'collection')}
              className="hover:text-[#f2efe9] transition-colors"
            >
              K-01
            </a>
            <button
              type="button"
              aria-pressed={reducedMotion}
              onClick={onToggleReducedMotion}
              className="px-2.5 py-1 rounded-[2px] border border-[#f2efe9]/20 text-[#f2efe9]/85 hover:border-[#e68f63] transition-colors cursor-pointer"
            >
              {reducedMotion ? 'Motion: Reduced' : 'Motion: Standard'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
