'use client';
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CtrlRoomGlyphLogo } from '../icons/PixelSprites';

export const BrandHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 bg-[#111A31]/95 backdrop-blur-xs border-b-2 border-[#2858FF]">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        className="inline-flex items-center gap-2.5 cr-font-display text-lg sm:text-xl font-bold tracking-tight text-[#E8F0FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E4FF58]"
      >
        <CtrlRoomGlyphLogo className="w-6 h-6" />
        <span>CTRL/ROOM</span>
      </a>

      {/* Zone 2: 5 clean single-line text navigation links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-6 text-sm font-medium text-[#B6D7F7]"
      >
        <a
          href="#desktop-stage"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Desktop OS
        </a>
        <a
          href="#section-deck-lab"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Deck Lab
        </a>
        <a
          href="#section-action-library"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Action Library
        </a>
        <a
          href="#section-profiles"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Profiles
        </a>
        <a
          href="#section-device-info"
          className="hover:text-[#E4FF58] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
        >
          Stream Deck MK.2
        </a>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs cr-font-mono-code font-bold text-[#111A31] bg-[#E4FF58] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
        >
          <span>SEE REAL PRODUCT</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
