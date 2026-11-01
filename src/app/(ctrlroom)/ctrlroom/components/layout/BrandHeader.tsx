'use client';
import React, { useRef, useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { CtrlRoomGlyphLogo } from '../icons/PixelSprites';
import { MotionDialog } from '../motion/MotionDialog';
import { scrollToCtrlRoom } from '../motion/tokens';

const NAV_LINKS = [
  ['desktop-stage', 'Desktop OS'],
  ['section-deck-lab', 'Deck Lab'],
  ['section-action-library', 'Action Library'],
  ['section-profiles', 'Profiles'],
  ['section-device-info', 'Stream Deck MK.2'],
] as const;

export const BrandHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingAnchor = useRef<string | null>(null);
  return (
    <header className="cr-header sticky top-0 z-50 flex items-center justify-between gap-3 sm:gap-8 px-4 sm:px-8 py-3.5 bg-[#111A31]/95 backdrop-blur-xs border-b-2 border-[#2858FF]">
      <span aria-hidden="true" className="cr-nav-progress" />
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
        className="cr-header-nav hidden xl:flex items-center gap-6 text-sm font-medium text-[#B6D7F7]"
      >
        {NAV_LINKS.map(([id, label]) => <a key={id} data-cr-nav href={`#${id}`} className="cr-nav-link whitespace-nowrap shrink-0">{label}</a>)}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          data-cr-magnetic
          className="inline-flex items-center gap-2 px-4 py-2 text-xs cr-font-mono-code font-bold text-[#111A31] bg-[#E4FF58] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
        >
          <span className="hidden sm:inline">SEE REAL PRODUCT</span><span className="sm:hidden">PRODUCT</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button type="button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="cr-mobile-navigation"
          onClick={() => setMenuOpen(true)} className="xl:hidden border-2 border-[#2858FF] p-2 text-[#E4FF58]">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      <MotionDialog open={menuOpen} onClose={() => setMenuOpen(false)} onAfterClose={() => {
        if (pendingAnchor.current) { scrollToCtrlRoom(pendingAnchor.current, true); pendingAnchor.current = null; }
      }} label="Navigation" className="cr-nav-dialog">
        <div id="cr-mobile-navigation" className="cr-mobile-navigation">
          <div className="flex items-center justify-between gap-4">
            <span className="cr-font-mono-code text-sm text-[#E4FF58]">C/R OS // NAVIGATION</span>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="p-2 border-2 border-[#2858FF]"><X /></button>
          </div>
          <nav aria-label="Mobile navigation">
            {NAV_LINKS.map(([id, label], index) => <a key={id} data-cr-nav href={`#${id}`}
              style={{ '--cr-item': index } as React.CSSProperties}
              onClick={event => { event.preventDefault(); pendingAnchor.current = id; setMenuOpen(false); history.pushState(null, '', `#${id}`); }}>
              <span>{label}</span><span aria-hidden="true">↗</span>
            </a>)}
          </nav>
        </div>
      </MotionDialog>
      <noscript><nav aria-label="Page sections" className="cr-nojs-nav">{NAV_LINKS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></noscript>
    </header>
  );
};
