'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  onNavigate: (targetId: string) => void;
  onOpenContactDialog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileNavOpen,
  onToggleMobileNav,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onNavigate(targetId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#111318]/92 backdrop-blur-md border-b border-[#F2EBE2]/10'
          : 'bg-[#111318]/40 backdrop-blur-xs border-b border-[#F2EBE2]/08'
      }`}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between gap-8 px-6 md:px-12 h-[72px]">
        {/* Wordmark without trailing period */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-2xl tracking-wider text-[#F2EBE2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
        >
          PENUMBRA
        </a>

        {/* Clean, quiet navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase text-[#A6A29F]"
        >
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, 'projects')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Projects
          </a>
          <a
            href="#practice"
            onClick={(e) => handleLinkClick(e, 'practice')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Practice
          </a>
          <a
            href="#process"
            onClick={(e) => handleLinkClick(e, 'process')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Approach
          </a>
          <a
            href="#light-lab"
            onClick={(e) => handleLinkClick(e, 'light-lab')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Light Lab
          </a>
          <a
            href="#journal"
            onClick={(e) => handleLinkClick(e, 'journal')}
            className="hover:text-[#F2EBE2] transition-colors py-1 border-b border-transparent hover:border-[#D7A779] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            Journal
          </a>
        </nav>

        {/* Quiet primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase text-[#F2EBE2] border border-[#F2EBE2]/18 bg-[#1c2027] hover:border-[#D7A779] hover:text-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-4"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D7A779]" strokeWidth={1.5} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#F2EBE2] border border-[#F2EBE2]/18 bg-[#1c2027] hover:border-[#D7A779] transition-colors focus-visible:outline-2 focus-visible:outline-[#E9BB86] focus-visible:outline-offset-2"
          >
            {isMobileNavOpen ? (
              <X className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
