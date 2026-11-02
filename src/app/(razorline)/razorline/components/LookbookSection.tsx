"use client";

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LOOKBOOK_FRAMES } from '../data/catalog';
import { stepLookbookIndex } from '../utils/storeLogic';

export const LookbookSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentFrame = LOOKBOOK_FRAMES[activeSlide] ?? LOOKBOOK_FRAMES[0];

  const handlePrev = () => {
    setActiveSlide((prev) => stepLookbookIndex(prev, -1, LOOKBOOK_FRAMES.length));
  };

  const handleNext = () => {
    setActiveSlide((prev) => stepLookbookIndex(prev, 1, LOOKBOOK_FRAMES.length));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      id="journal"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-labelledby="lookbook-heading"
      className="relative w-full py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24 bg-[#0B0B0A] border-b border-[#F1F0E9]/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#D3FF35]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header + Gallery Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#F1F0E9]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs tracking-[0.16em] text-[#375CFF] uppercase mb-2">
              05. VISUAL ARCHIVE · LOOKBOOK GALLERY
            </div>
            <h2
              id="lookbook-heading"
              className="font-display italic font-black text-[clamp(2.5rem,5vw,4.25rem)] text-[#F1F0E9] uppercase leading-[0.92]"
            >
              PRODUCT LOOKBOOK
            </h2>
          </div>

          {/* Functional Previous / Next Controls */}
          <div className="flex items-center gap-3">
            <span
              data-testid="lookbook-counter"
              className="font-mono-tech text-sm text-[#D3FF35] mr-2"
            >
              {currentFrame.index}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous lookbook frame"
              className="w-11 h-11 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] hover:text-[#D3FF35] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next lookbook frame"
              className="w-11 h-11 border border-[#F1F0E9]/25 hover:border-[#D3FF35] text-[#F1F0E9] hover:text-[#D3FF35] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Asymmetric Split Lookbook Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Primary Diagonal Image Frame (8 columns) */}
          <div className="lg:col-span-8 bg-[#111210] border border-[#F1F0E9]/15 p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[460px] bg-blueprint-grid">
            <div className="flex items-center justify-between gap-4 z-10">
              <span className="font-mono-tech text-xs text-[#D3FF35] uppercase">
                {currentFrame.aspectLabel}
              </span>
              <span className="font-mono-tech text-xs text-[#777A7A] uppercase">
                {currentFrame.locationCode}
              </span>
            </div>

            <div className="my-6 flex items-center justify-center relative z-10">
              <img
                key={currentFrame.id}
                src={currentFrame.image}
                alt={currentFrame.title}
                width={640}
                height={500}
                referrerPolicy="no-referrer"
                className="max-h-[310px] w-auto object-contain transition-transform duration-300"
              />
            </div>

            <div className="z-10 pt-4 border-t border-[#F1F0E9]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3
                  data-testid="lookbook-frame-title"
                  className="font-display italic font-black text-2xl sm:text-3xl text-[#F1F0E9] uppercase"
                >
                  {currentFrame.title}
                </h3>
                <p className="text-[#F1F0E9]/75 text-sm max-w-xl mt-1">
                  {currentFrame.caption}
                </p>
              </div>
              <span className="font-mono-tech text-xs text-[#D3FF35] shrink-0">
                {currentFrame.modelName}
              </span>
            </div>
          </div>

          {/* Secondary Companion Detail Frame + Direct Frame Selector (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-[#111210] border border-[#F1F0E9]/15 p-5 flex-1 flex flex-col justify-between">
              <div className="font-mono-tech text-xs text-[#777A7A] uppercase mb-3">
                DETAIL CROP // {currentFrame.modelName}
              </div>
              <div className="h-52 overflow-hidden bg-[#0B0B0A] border border-[#F1F0E9]/10 mb-4">
                <img
                  src={currentFrame.secondaryImage}
                  alt={`Macro detail for ${currentFrame.modelName}`}
                  width={600}
                  height={420}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-mono-tech text-xs text-[#F1F0E9]/70 leading-relaxed">
                USE KEYBOARD LEFT/RIGHT ARROWS OR SELECT A FRAME BELOW TO INSPECT FINISH VARIATIONS.
              </p>
            </div>

            {/* Frame Index Selector Buttons */}
            <div
              role="tablist"
              aria-label="Lookbook Frame Selector"
              className="grid grid-cols-4 gap-2"
            >
              {LOOKBOOK_FRAMES.map((frame, idx) => {
                const selected = idx === activeSlide;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-11 font-mono-tech text-xs uppercase transition-colors cursor-pointer ${
                      selected
                        ? 'bg-[#D3FF35] text-[#0B0B0A] font-bold'
                        : 'bg-[#111210] text-[#F1F0E9]/75 border border-[#F1F0E9]/15 hover:border-[#F1F0E9]/50'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
