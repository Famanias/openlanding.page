'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig, NavItem } from '../data/siteConfig';
import { Wordmark } from './Wordmark';
import { MobileMenu } from './MobileMenu';

interface SiteHeaderProps {
  onOpenStudio: () => void;
  onOpenContact: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  onOpenStudio,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [keylineReady, setKeylineReady] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setKeylineReady(true));
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.action === 'studio-dialog') {
      e.preventDefault();
      onOpenStudio();
    } else if (item.action === 'contact-dialog') {
      e.preventDefault();
      onOpenContact();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#111117]/92 backdrop-blur-md py-3.5 md:py-4'
            : 'bg-[#111117]/75 backdrop-blur-[2px] py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1920px] w-full mx-auto px-[clamp(22px,3.125%,60px)] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark + Paradox Symbol */}
          <Wordmark size={scrolled ? 'sm' : 'md'} />

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-4 lg:gap-5 text-[15px] lg:text-[16px] font-normal text-[#96939F] ml-auto mr-4 lg:mr-8"
          >
            {siteConfig.navItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[#96939F]/50 select-none text-xs"
                  >
                    •
                  </span>
                )}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className="zeno-focus whitespace-nowrap shrink-0 text-[#B8B5C3] hover:text-[#F2F0EB] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#A58AFF] after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* Zone 3: Primary Action Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenContact();
              }}
              className="zeno-focus hidden sm:inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full border border-[#F2F0EB]/45 text-[#F2F0EB] text-[12px] lg:text-[13px] font-medium tracking-[0.11em] uppercase whitespace-nowrap shrink-0 hover:border-[#A58AFF] hover:bg-[#A58AFF]/10 transition-all duration-200 group"
            >
              <span>START A PROJECT</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              className="zeno-focus md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F2F0EB]/35 text-xs font-medium tracking-[0.14em] uppercase text-[#F2F0EB] whitespace-nowrap shrink-0"
            >
              <span>MENU</span>
              <span aria-hidden="true" className="text-[#A58AFF]">
                +
              </span>
            </button>
          </div>
        </div>

        {/* Bottom extending hairline divider */}
        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-[1px] bg-[#F2F0EB]/22 transition-all duration-1000 ease-out ${
            keylineReady ? 'w-full' : 'w-0'
          } ${scrolled ? 'bg-[#F2F0EB]/30' : 'bg-[#F2F0EB]/20'}`}
        />
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenStudio={onOpenStudio}
        onOpenContact={onOpenContact}
      />
    </>
  );
};

export default SiteHeader;
