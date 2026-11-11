'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { prefersReducedMotionNow, scrollToSectionById } from '../../lib/postmark/motion';
import { PaperButton } from './PaperButton';
import { PostalCancellationSeal } from './SVGStamp';

interface PostmarkHeaderProps {
  introReady: boolean;
}

const NAV_ITEMS = [
  { label: 'Features', targetId: 'features' },
  { label: 'Destinations', targetId: 'destinations' },
  { label: 'Journal', targetId: 'journal' },
  { label: 'Download', targetId: 'download' },
] as const;

export const PostmarkHeader: React.FC<PostmarkHeaderProps> = ({ introReady }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sealWrapRef = useRef<HTMLSpanElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!introReady || prefersReducedMotionNow() || !sealWrapRef.current) return;
    gsap.fromTo(
      sealWrapRef.current,
      { scale: 1.24, rotateZ: -14 },
      {
        scale: 1,
        rotateZ: -6,
        duration: 0.48,
        delay: 0.25,
        ease: 'back.out(2.1)',
      }
    );
  }, [introReady]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    firstMobileLinkRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSectionById(targetId);
  };

  const handlePrimaryAction = () => {
    setMobileMenuOpen(false);
    scrollToSectionById('features', '[data-builder-first-control]');
  };

  return (
    <header className="relative z-30 w-full bg-[var(--pm-hero-paper)]">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-5 py-5 sm:px-8 lg:px-12">
        {/* Zone 1: Single wordmark anchor with integrated postal cancellation mark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          aria-label="POSTMARK home"
          className="group relative inline-flex items-center whitespace-nowrap shrink-0 text-[var(--pm-ink)]"
        >
          <span className="font-editorial text-[24px] sm:text-[27px] font-semibold tracking-[0.03em] leading-none">
            POSTMARK
          </span>
          <span
            ref={sealWrapRef}
            aria-hidden="true"
            className="-ml-2.5 inline-flex items-center justify-center text-[var(--pm-brown)]/75 transition-transform duration-200 group-hover:rotate-0"
          >
            <PostalCancellationSeal
              topText="POSTMARK"
              bottomText="ARCHIVE"
              centerText=""
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
          </span>
        </a>

        {/* Zone 2: Clean 4-item single-line desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 lg:gap-10 font-ui text-[15px] font-normal text-[var(--pm-ink)]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="relative py-1 whitespace-nowrap shrink-0 text-[var(--pm-ink)]/90 hover:text-[var(--pm-red-deep)] transition-colors after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-[var(--pm-red)] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA + mobile hamburger button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <PaperButton
              variant="primary"
              size="md"
              onClick={handlePrimaryAction}
            >
              Create Your First Postcard
            </PaperButton>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="pm-mobile-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[var(--pm-brown)]/25 bg-[var(--pm-ivory)] text-[var(--pm-ink)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div
          id="pm-mobile-drawer"
          className="md:hidden border-t border-[var(--pm-brown)]/15 bg-[var(--pm-ivory)] px-6 py-5 shadow-[0_20px_40px_rgba(62,41,26,0.14)]"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.targetId}
                ref={idx === 0 ? firstMobileLinkRef : undefined}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="min-h-[44px] flex items-center justify-between border-b border-[var(--pm-brown)]/10 py-2 font-editorial text-lg text-[var(--pm-ink)]"
              >
                <span>{item.label}</span>
                <span aria-hidden="true" className="font-ui text-xs text-[var(--pm-red)]">
                  ↗
                </span>
              </a>
            ))}
            <div className="pt-3">
              <PaperButton
                variant="primary"
                size="md"
                className="w-full"
                onClick={handlePrimaryAction}
              >
                Create Your First Postcard
              </PaperButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
