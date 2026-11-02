import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'archive', label: 'Work' },
  { id: 'stories', label: 'Stories' },
  { id: 'about', label: 'About' },
  { id: 'inquire', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="w-full px-5 sm:px-8 lg:px-14 pt-6 sm:pt-8 pb-2 relative z-40">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#201C19] focus:text-[#F2ECE0] focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:uppercase"
      >
        Skip to content
      </a>

      {/* Top 3-Zone Bar */}
      <div className="flex items-center justify-between gap-8 pb-3.5">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, 'hero')}
          className="font-serif-editorial text-[26px] sm:text-[31px] leading-none tracking-[-0.02em] text-[#201C19] uppercase whitespace-nowrap shrink-0 overflow-hidden"
        >
          <span className="inline-block animate-line-reveal-1">INES VALE</span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-9 lg:gap-11 text-[14.5px] font-normal text-[#201C19]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`ink-link whitespace-nowrap shrink-0 py-1 transition-colors duration-200 ${
                  isActive ? 'ink-link-active text-[#201C19]' : 'text-[#201C19]/85 hover:text-[#201C19]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#inquire"
            onClick={(e) => handleLinkClick(e, 'inquire')}
            className="ink-link text-[12px] sm:text-[12.5px] tracking-[0.06em] uppercase text-[#201C19] whitespace-nowrap shrink-0 py-1.5 inline-flex items-center gap-1.5 group"
          >
            <span>INQUIRE</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-sheet"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden min-h-[44px] min-w-[44px] px-2.5 flex items-center justify-center text-[11px] tracking-[0.08em] uppercase text-[#201C19] border border-[#BFB7AC]/80"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Viewfinder Calibration Rule & Independent Photographer Kicker */}
      <div className="w-full h-[1px] bg-[#BFB7AC] animate-rule-draw" />
      <div className="flex items-center justify-between pt-2">
        <p className="text-[10px] sm:text-[10.5px] tracking-[0.07em] uppercase text-[#201C19]/75 font-normal">
          INDEPENDENT PHOTOGRAPHER
        </p>
      </div>

      {/* Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#201C19]/30 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-navigation-sheet"
            aria-label="Mobile Navigation"
            className="absolute left-5 right-5 top-full mt-2 bg-[#F7F4ED] border border-[#BFB7AC] p-6 z-50 md:hidden shadow-sm"
          >
            <ul className="flex flex-col divide-y divide-[#BFB7AC]/60">
              {NAV_ITEMS.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className="flex items-center justify-between py-3.5 min-h-[44px] text-[#201C19] hover:text-[#A65D46] transition-colors"
                  >
                    <span className="font-serif-editorial text-2xl tracking-tight">
                      {item.label}
                    </span>
                    <span className="text-[11px] tracking-[0.08em] text-[#79756F] tabular-nums">
                      0{idx + 1}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#notes"
                  onClick={(e) => handleLinkClick(e, 'notes')}
                  className="flex items-center justify-between py-3.5 min-h-[44px] text-[#201C19] hover:text-[#A65D46] transition-colors"
                >
                  <span className="font-serif-editorial text-2xl tracking-tight">Notes</span>
                  <span className="text-[11px] tracking-[0.08em] text-[#79756F] tabular-nums">
                    05
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
};
