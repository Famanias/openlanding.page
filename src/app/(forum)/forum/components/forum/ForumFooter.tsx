'use client';
import React from 'react';
import { ForumLogo } from './ForumLogo';
import { scrollToSectionId } from '../../lib/forum/motion';

interface ForumFooterProps {
  onResetDemo: () => void;
}

export const ForumFooter: React.FC<ForumFooterProps> = ({ onResetDemo }) => {
  const handleResetAndScroll = () => {
    onResetDemo();
    scrollToSectionId('demo', '#demo-board-heading');
  };

  return (
    <footer
      aria-label="Site Footer"
      className="w-full bg-[#0E100C] border-t border-[#B9B28A]/38 text-[#F6F3EA]"
    >
      {/* Precision Ruled Navigation Grid (Inspired by 09-footer-mockup.webp, only real in-page links) */}
      <div className="mx-auto max-w-[1920px] border-b border-[#B9B28A]/38">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#B9B28A]/30">
          {/* Column 1: Brand Lockup (Cols 1-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[210px]">
            <div className="flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#B9B28A]/80">
              <div className="flex items-center gap-2">
                <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
                <span>004 / END OF PAGE</span>
              </div>
              <span>CONCEPT ARCHITECTURE</span>
            </div>

            <div className="my-6">
              <ForumLogo size="lg" onClick={() => scrollToSectionId('top')} />
            </div>

            <div className="flex items-center justify-between font-mono-tech text-[11px] text-[#8C876B] uppercase tracking-[0.12em]">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
              <span>CELESTIAL INSTRUMENT FOR REVENUE SIGNALS</span>
            </div>
          </div>

          {/* Column 2: EXPLORE (Cols 6-7) */}
          <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8C876B] uppercase tracking-[0.14em] mb-4">
                <span className="reg-cross text-[#B9B28A]/70" aria-hidden="true" />
                <span>INDEX // 01</span>
              </div>
              <h3 className="font-doto-ui text-sm sm:text-base text-[#F6F3EA] uppercase tracking-[0.12em] mb-4">
                EXPLORE
              </h3>
              <ul className="space-y-2.5 font-mono-tech text-sm text-[#B9B28A]">
                <li>
                  <a
                    href="#platform"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('platform');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Platform
                  </a>
                </li>
                <li>
                  <a
                    href="#intelligence"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('intelligence');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Intelligence
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('demo', '#demo-board-heading');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Workflows
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex justify-end">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
            </div>
          </div>

          {/* Column 3: DISCOVER (Cols 8-10) */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8C876B] uppercase tracking-[0.14em] mb-4">
                <span className="reg-cross text-[#B9B28A]/70" aria-hidden="true" />
                <span>INDEX // 02</span>
              </div>
              <h3 className="font-doto-ui text-sm sm:text-base text-[#F6F3EA] uppercase tracking-[0.12em] mb-4">
                DISCOVER
              </h3>
              <ul className="space-y-2.5 font-mono-tech text-sm text-[#B9B28A]">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('about');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Our Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#vision"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('vision');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    The Wide Field
                  </a>
                </li>
                <li>
                  <a
                    href="#demo"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('demo', '#demo-board-heading');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Live Signal Board
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex justify-end">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
            </div>
          </div>

          {/* Column 4: SYSTEM (Cols 11-12) */}
          <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#8C876B] uppercase tracking-[0.14em] mb-4">
                <span className="reg-cross text-[#B9B28A]/70" aria-hidden="true" />
                <span>INDEX // 03</span>
              </div>
              <h3 className="font-doto-ui text-sm sm:text-base text-[#F6F3EA] uppercase tracking-[0.12em] mb-4">
                SYSTEM
              </h3>
              <ul className="space-y-2.5 font-mono-tech text-sm text-[#B9B28A]">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSectionId('top')}
                    className="hover:text-[#F6F3EA] transition-colors text-left cursor-pointer"
                  >
                    Back to Top ↑
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleResetAndScroll}
                    className="hover:text-[#F6F3EA] transition-colors text-left cursor-pointer"
                  >
                    Reset Demo State
                  </button>
                </li>
                <li>
                  <a
                    href="#final"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSectionId('final');
                    }}
                    className="hover:text-[#F6F3EA] transition-colors"
                  >
                    Final Orbit
                  </a>
                </li>
              </ul>
            </div>

            <div className="pt-6 flex justify-end">
              <span className="reg-cross text-[#B9B28A]/65" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Strip */}
      <div className="mx-auto max-w-[1920px] px-5 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tech text-[11px] sm:text-xs tracking-[0.14em] uppercase">
        <div className="text-[#D7D1B8]">
          FORUM — OPENLANDING CONCEPT EXPERIENCE
        </div>
        <div className="text-[#F6F3EA]">A CLEARER VIEW OF WHAT&apos;S NEXT.</div>
        <div className="text-[#B9B28A]">
          DESIGN STUDY / NOT A LIVE CRM SERVICE
        </div>
      </div>
    </footer>
  );
};
