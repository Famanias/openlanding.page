'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ForumLogo } from './ForumLogo';
import { MagneticButton } from './MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToSectionId } from '../../lib/forum/motion';

interface ForumHeaderProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { label: 'PLATFORM', href: '#platform', sectionId: 'platform' },
  { label: 'INTELLIGENCE', href: '#intelligence', sectionId: 'intelligence' },
  { label: 'WORKFLOWS', href: '#demo', sectionId: 'demo' },
  { label: 'ABOUT', href: '#about', sectionId: 'about' },
] as const;

export const ForumHeader: React.FC<ForumHeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavigate = (targetId: string, focusSelector?: string) => {
    setMobileMenuOpen(false);
    scrollToSectionId(targetId, focusSelector);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E100C]/92 backdrop-blur-xs border-b border-[#B9B28A]/38">
      <div className="mx-auto flex h-[72px] lg:h-[80px] max-w-[1920px] items-stretch justify-between">
        {/* Left Zone: Stepped Pixel Monogram + Wordmark + Descriptor */}
        <div className="flex items-center px-4 sm:px-6 lg:px-8 border-r border-[#B9B28A]/38 shrink-0">
          <ForumLogo onClick={() => handleNavigate('top')} />
        </div>

        {/* Center/Right Zone: Desktop Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex flex-1 items-center justify-end px-8 gap-8 xl:gap-11"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive =
              activeSection === item.sectionId ||
              (item.sectionId === 'demo' && activeSection === 'workflows');
            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.18 + idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.sectionId);
                }}
                className={`relative py-2 font-doto-ui text-xs xl:text-[13px] tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F6F3EA] ${
                  isActive
                    ? 'text-[#F6F3EA]'
                    : 'text-[#D7D1B8] hover:text-[#F6F3EA]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B9B28A] transition-transform duration-200 origin-left ${
                    isActive ? 'w-full scale-x-100' : 'w-full scale-x-0'
                  }`}
                />
              </motion.a>
            );
          })}
        </nav>

        {/* Right Zone: Two Compact Rectilinear CTAs (Matching Approved Reference) */}
        <div className="hidden md:flex items-center gap-3 px-4 sm:px-6 lg:px-7 border-l border-[#B9B28A]/38 shrink-0">
          <MagneticButton
            variant="secondary"
            size="sm"
            onClick={() => handleNavigate('platform')}
          >
            EXPLORE PLATFORM
          </MagneticButton>
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => handleNavigate('demo', '#demo-board-heading')}
          >
            VIEW DEMO
          </MagneticButton>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center px-4 border-l border-[#B9B28A]/38">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="forum-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#B9B28A]/45 bg-[#171814] text-[#F6F3EA] hover:border-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="forum-mobile-nav"
            aria-label="Mobile Navigation"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#B9B28A]/38 bg-[#0E100C] px-5 py-6"
          >
            <ul className="flex flex-col divide-y divide-[#B9B28A]/20 border-y border-[#B9B28A]/30">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.sectionId);
                    }}
                    className="flex items-center justify-between py-3.5 font-doto-ui text-sm tracking-[0.14em] text-[#F6F3EA] uppercase hover:text-[#B9B28A]"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tech text-[11px] text-[#B9B28A]">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MagneticButton
                variant="secondary"
                size="md"
                onClick={() => handleNavigate('platform')}
                className="w-full"
              >
                EXPLORE PLATFORM
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => handleNavigate('demo', '#demo-board-heading')}
                className="w-full"
              >
                VIEW DEMO
              </MagneticButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
