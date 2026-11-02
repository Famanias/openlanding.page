"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'playground', label: 'Playground' },
  { id: 'about', label: 'About' },
  { id: 'notes', label: 'Notes' }
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const connectBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || !connectBtnRef.current) return;
    const rect = connectBtnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-6, Math.min(6, (e.clientX - cx) * 0.12));
    const dy = Math.max(-4, Math.min(4, (e.clientY - cy) * 0.15));
    setBtnOffset({ x: dx, y: dy });
  };

  const handlePointerLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-xs border-b border-[#191919]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
        {/* Zone 1: Brand Wordmark with signature 8-spoke burst mark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="group inline-flex items-start text-[#191919] font-extrabold text-[23px] sm:text-[32px] lg:text-[34px] tracking-[-0.04em] leading-none whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
          aria-label="nico park. home"
        >
          <span>nico park.</span>
          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4 sm:w-6 sm:h-6 -mt-0.5 sm:-mt-1 ml-0.5 text-[#191919] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-90"
            aria-hidden="true"
          >
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="16" y1="2" x2="16" y2="8" />
              <line x1="16" y1="24" x2="16" y2="30" />
              <line x1="2" y1="16" x2="8" y2="16" />
              <line x1="24" y1="16" x2="30" y2="16" />
              <line x1="6.1" y1="6.1" x2="10.3" y2="10.3" />
              <line x1="21.7" y1="21.7" x2="25.9" y2="25.9" />
              <line x1="25.9" y1="6.1" x2="21.7" y2="10.3" />
              <line x1="10.3" y1="21.7" x2="6.1" y2="25.9" />
            </g>
          </svg>
        </a>

        {/* Zone 2: Center Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 lg:gap-11"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHighlighted = hoveredNav ? hoveredNav === item.id : isActive;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                className="relative py-1.5 text-[18px] lg:text-[20px] font-medium text-[#191919] whitespace-nowrap shrink-0 transition-colors hover:text-[#3049F0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2.5px] bg-[#3049F0] origin-left transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHighlighted ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Connect Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            ref={connectBtnRef}
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
              transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`
            }}
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-[#3049F0] text-white border-2 border-[#191919] font-condensed font-bold text-[14px] sm:text-[18px] tracking-[0.04em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#243BE0] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
          >
            <span>LET&apos;S CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#191919] text-[#191919] hover:bg-[#F7E36B] transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-label="Mobile navigation"
          className="md:hidden border-b-2 border-[#191919] bg-[#F8F7F2] px-6 py-5 space-y-3"
        >
          <div className="grid grid-cols-2 gap-2.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-4 py-3 rounded-2xl border-2 border-[#191919] font-condensed font-bold text-lg uppercase tracking-wider flex items-center justify-between ${
                  activeSection === item.id ? 'bg-[#F7E36B] text-[#191919]' : 'bg-white text-[#191919]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
