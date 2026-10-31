import React from 'react';
import { ArrowDownRight } from 'lucide-react';

interface MinimalHeaderProps {
  onFocusForm: () => void;
  onOpenGlassStudio: () => void;
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  onFocusForm,
  onOpenGlassStudio,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch {
        // ignore
      }
    }
  };

  return (
    <header className="lumen-header sticky top-0 z-40 w-full border-b border-white/75 bg-[#F8F9FC]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-3.5 sm:px-10">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const prefersReduced =
              typeof window !== 'undefined' &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
          }}
          className="text-base font-bold tracking-[0.22em] text-[#1E2432] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252C43]"
        >
          LUMEN
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Page sections"
          className="hidden md:flex items-center gap-7 text-xs font-medium text-[#657187]"
        >
          <a
            href="#workspace-hero"
            onClick={(e) => handleNavClick(e, 'workspace-hero')}
            className="hover:text-[#1E2432] transition-colors duration-160 whitespace-nowrap shrink-0"
          >
            Workspace
          </a>
          <a
            href="#inside-playbook"
            onClick={(e) => handleNavClick(e, 'inside-playbook')}
            className="hover:text-[#1E2432] transition-colors duration-160 whitespace-nowrap shrink-0"
          >
            Playbook Preview
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="hover:text-[#1E2432] transition-colors duration-160 whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, 'faq')}
            className="hover:text-[#1E2432] transition-colors duration-160 whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
          <a
            href="/_glass-studio"
            onClick={(e) => {
              e.preventDefault();
              onOpenGlassStudio();
            }}
            className="hover:text-[#1E2432] transition-colors duration-160 whitespace-nowrap shrink-0"
          >
            Glass Studio
          </a>
        </nav>

        {/* Zone 3: 1 primary action anchored to the form */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero-download-form"
            onClick={(e) => {
              e.preventDefault();
              onFocusForm();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#252C43] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1E2432] transition-colors duration-160 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
          >
            <span>Get the free playbook</span>
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
