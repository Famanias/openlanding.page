import React, { useState } from 'react';
import { MortaMark } from './MortaMark';

interface HeaderProps {
  scrollProgress: number;
}

export const Header: React.FC<HeaderProps> = ({ scrollProgress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressPercent = Math.round(Math.min(100, Math.max(0, scrollProgress * 100)));

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand mark and widely tracked wordmark (single link element) */}
        <a
          href="#oath"
          onClick={closeMenu}
          aria-label="MORTA — Return to top"
          className="inline-flex items-center gap-2.5 sm:gap-3.5 text-white hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-opacity whitespace-nowrap shrink-0"
        >
          <MortaMark size={28} />
          <span className="font-display text-lg sm:text-xl md:text-2xl font-medium tracking-[0.28em] sm:tracking-[0.34em] uppercase">
            MORTA
          </span>
        </a>

        {/* Zone 2: Primary navigation anchors */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm text-white/80"
        >
          <a
            href="#collection"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Collection
          </a>
          <a
            href="#house"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            House
          </a>
          <a
            href="#craft"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Craft
          </a>
          <a
            href="#commissions"
            className="py-1 hover:text-white border-b border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Commissions
          </a>
        </nav>

        {/* Zone 3: Primary action + Mobile disclosure button */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <a
            href="#commissions"
            className="px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] bg-white text-black border border-white hover:bg-black hover:text-white active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Commission a piece
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="morta-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-10 h-10 inline-flex items-center justify-center border border-white/35 text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  d="M3 3L15 15M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M2 5H16M2 9H16M2 13H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="morta-mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/20 bg-black px-6 py-6"
        >
          <ul className="flex flex-col space-y-4 text-base">
            <li>
              <a
                href="#collection"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white border-b border-white/10"
              >
                Collection
              </a>
            </li>
            <li>
              <a
                href="#house"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white border-b border-white/10"
              >
                House
              </a>
            </li>
            <li>
              <a
                href="#craft"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white border-b border-white/10"
              >
                Craft
              </a>
            </li>
            <li>
              <a
                href="#commissions"
                onClick={closeMenu}
                className="block py-2 text-white/90 hover:text-white"
              >
                Commissions
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* Discreet scroll progress bar */}
      <div
        className="w-full h-[2px] bg-white/10 overflow-hidden"
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
      >
        <div
          className="h-full bg-white origin-left"
          style={{
            transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})`,
          }}
        />
      </div>
    </header>
  );
};
