'use client';
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface SiteHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenWaitlist: () => void;
}

const NAV_ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'optics', label: 'Optics' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'gallery', label: 'Field Notes' },
  { id: 'collection', label: 'K-01' },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenWaitlist,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#121315]/92 backdrop-blur-md border-b border-[#f2efe9]/12'
            : 'bg-gradient-to-b from-[#121315]/80 to-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-4 md:px-10">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#experience"
            onClick={(e) => handleLinkClick(e, 'experience')}
            className="font-display-kairo text-lg font-semibold tracking-[0.18em] text-[#f2efe9] whitespace-nowrap shrink-0 hover:text-[#e68f63] transition-colors"
          >
            KAIRO
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide text-[#f2efe9]/75"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-[#f2efe9]' : 'hover:text-[#f2efe9]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#e68f63] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (+ mobile menu trigger on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="px-4 py-2 text-xs font-semibold tracking-wide text-[#121315] bg-[#f2efe9] hover:bg-[#e68f63] rounded-[2px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join the list
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="kairo-mobile-nav"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex md:hidden items-center justify-center w-10 h-10 text-[#f2efe9] border border-[#f2efe9]/20 rounded-[2px] hover:border-[#e68f63] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="kairo-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 md:hidden bg-[#121315]/96 backdrop-blur-lg flex flex-col justify-between px-6 pt-24 pb-10"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            aria-label="Mobile sections"
            className="flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="flex items-baseline justify-between border-b border-[#f2efe9]/12 pb-4 text-xl font-display-kairo font-medium text-[#f2efe9] hover:text-[#e68f63] transition-colors"
              >
                <span>{item.label}</span>
                <span className="font-mono-kairo text-xs text-[#a8aaa9]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div
            className="flex flex-col gap-4 border-t border-[#f2efe9]/15 pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-[#a8aaa9]">
              KAIRO K-01 · Concept Mirrorless Camera Study
            </p>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="kairo-btn-primary w-full justify-center"
            >
              Join the KAIRO list
            </button>
          </div>
        </div>
      )}
    </>
  );
};
