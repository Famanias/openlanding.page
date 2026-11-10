'use client';

import React from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

interface HollowayFooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

export default function HollowayFooter({
  onNavigateSection,
  onOpenInquiry,
}: HollowayFooterProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigateSection(sectionId);
  };

  const handleInquiryLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOpenInquiry();
  };

  return (
    <footer
      aria-label="HOLLOWAY Editorial Brand Footer"
      className="relative w-full bg-[#F3EFE6] text-[#262824] select-none"
    >
      {/* Top Full-Width Architectural Rule with Measured Vertical Ticks (matching footer-reference) */}
      <div className="relative w-full border-t-[1.5px] border-[#262824]">
        <div
          aria-hidden="true"
          className="mx-auto max-w-[1600px] px-6 md:px-14 flex items-center justify-between"
        >
          {[0, 1, 2, 3, 4].map((tick) => (
            <span
              key={`top-tick-${tick}`}
              className="inline-block h-3.5 w-[1.5px] -mt-[7px] bg-[#262824]"
            />
          ))}
        </div>
      </div>

      {/* Main Editorial Footer Body */}
      <div className="mx-auto max-w-[1600px] px-6 py-8 md:px-14 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Brand Plate: Large HOLLOWAY Wordmark + Descriptor */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <a
              href="#top"
              onClick={(e) => handleNav(e, 'top')}
              className="inline-block font-editorial text-[52px] sm:text-[68px] md:text-[80px] lg:text-[86px] font-medium leading-[0.92] tracking-[0.025em] text-[#262824] uppercase focus-visible:outline-2 focus-visible:outline-[#262824]"
            >
              HOLLOWAY
            </a>
            <p className="mt-2.5 md:mt-3 font-ui text-[12px] sm:text-[13.5px] font-normal tracking-[0.14em] text-[#262824] uppercase">
              OBJECTS FOR THE SPACES WE LIVE IN.
            </p>
          </div>

          {/* Right Multi-Column Navigation: 01 / EXPLORE, 02 / INFORMATION, 03 / CONNECT */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 pt-1">
            {/* Column 01 */}
            <div>
              <h2 className="font-ui text-[13px] md:text-[14px] font-medium tracking-[0.08em] text-[#262824] uppercase mb-3.5">
                01 / EXPLORE
              </h2>
              <ul className="space-y-2 font-ui text-[15px] md:text-[16px] text-[#262824]/90">
                <li>
                  <a
                    href="#collection"
                    onClick={(e) => handleNav(e, 'collection')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Collection
                  </a>
                </li>
                <li>
                  <a
                    href="#room-studio"
                    onClick={(e) => handleNav(e, 'room-studio')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Room Studio
                  </a>
                </li>
                <li>
                  <a
                    href="#materials"
                    onClick={(e) => handleNav(e, 'materials')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Materials
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 02 */}
            <div>
              <h2 className="font-ui text-[13px] md:text-[14px] font-medium tracking-[0.08em] text-[#262824] uppercase mb-3.5">
                02 / INFORMATION
              </h2>
              <ul className="space-y-2 font-ui text-[15px] md:text-[16px] text-[#262824]/90">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Our Approach
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Craft
                  </a>
                </li>
                <li>
                  <a
                    href="#studio-inquiries"
                    onClick={handleInquiryLink}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 03 */}
            <div>
              <h2 className="font-ui text-[13px] md:text-[14px] font-medium tracking-[0.08em] text-[#262824] uppercase mb-3.5">
                03 / CONNECT
              </h2>
              <ul className="space-y-2 font-ui text-[15px] md:text-[16px] text-[#262824]/90">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Journal
                  </a>
                </li>
                <li>
                  <a
                    href="#materials"
                    onClick={(e) => handleNav(e, 'materials')}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#studio-inquiries"
                    onClick={handleInquiryLink}
                    className="hover:text-[#874C54] hover:underline underline-offset-4 transition-colors"
                  >
                    Inquiries
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Material Swatch Strip separated by Measured Hairline with Ticks */}
      <div className="relative w-full border-t border-[#262824]/45">
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto max-w-[1600px] px-6 md:px-14 flex items-center justify-between"
        >
          {[0, 1, 2, 3, 4].map((tick) => (
            <span
              key={`bottom-tick-${tick}`}
              className="inline-block h-2 w-[1px] -mt-[4px] bg-[#262824]/65"
            />
          ))}
        </div>

        <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row items-stretch sm:items-center justify-between pl-6 md:pl-14">
          <div className="flex flex-wrap items-center gap-8 md:gap-14 py-3.5 pr-6 font-ui text-[10.5px] md:text-[11px] font-medium tracking-[0.08em] text-[#262824] uppercase">
            <span>OPENLANDING / 092</span>
            <span>© HOLLOWAY. ALL RIGHTS RESERVED.</span>
          </div>

          {/* 4 Signature Architectural Material Swatch Blocks Flush Bottom-Right (matching footer-reference) */}
          <div
            aria-label="HOLLOWAY Signature Material Palette Swatches"
            className="grid grid-cols-4 h-10 sm:w-[320px] md:w-[380px] shrink-0"
          >
            <div
              title="Charcoal Ink (#262824)"
              className="h-full w-full bg-[#2B2D2B]"
            />
            <div
              title="Natural Oak (#B88C60)"
              className="h-full w-full bg-[#B88C60] bg-cover bg-center"
              style={{ backgroundImage: `url(${HOLLOWAY_ASSETS.woodTexture})` }}
            />
            <div
              title="Powder Blue (#A6BBC7)"
              className="h-full w-full bg-[#B4C5D0]"
            />
            <div
              title="Muted Burgundy (#63313A)"
              className="h-full w-full bg-[#63313A]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
