import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenGlassStudio?: () => void;
}

const footerLinkClass =
  'w-fit text-sm font-medium text-[#1E2432] transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252C43]';

export const Footer: React.FC<FooterProps> = ({ onOpenGlassStudio }) => {
  return (
    <footer className="relative isolate overflow-clip text-[#1E2432]">
      <div className="mx-auto max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="font-mono text-xs font-medium tracking-[0.12em] text-[#657187]">
              THE AI WORKFLOW PLAYBOOK / 2026
            </p>
            <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl [text-wrap:balance]">
              Make space for better work.
            </h2>
            <a
              href="#hero-download-form"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#252C43] px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1E2432] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252C43]"
            >
              Get the free playbook
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8">
            <div className="flex flex-col items-start gap-3">
              <p className="mb-2 font-mono text-xs tracking-[0.12em] text-[#657187]">EXPLORE</p>
              <a href="#workspace-hero" className={footerLinkClass}>Workspace</a>
              <a href="#inside-playbook" className={footerLinkClass}>Inside the playbook</a>
              <a href="#how-it-works" className={footerLinkClass}>How it works</a>
              <a href="#faq" className={footerLinkClass}>FAQ</a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className="mb-2 font-mono text-xs tracking-[0.12em] text-[#657187]">MORE</p>
              {onOpenGlassStudio && (
                <a
                  href="/lumen?studio=1"
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenGlassStudio();
                  }}
                  className={`${footerLinkClass} inline-flex items-center gap-1`}
                >
                  Glass Studio <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <a href="#workspace-hero" className={`${footerLinkClass} inline-flex items-center gap-1`}>
                Back to top <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        <div aria-hidden="true" className="lumen-footer-wordmark mt-20 select-none sm:mt-24">
          LUMEN
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[#1E2432]/20 py-5 text-xs text-[#1E2432]">
          <span>© 2026 LUMEN</span>
          <span>A practical guide to working with AI.</span>
        </div>
      </div>
    </footer>
  );
};
