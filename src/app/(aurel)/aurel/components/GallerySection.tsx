'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  GALLERY_SLIDES,
  getAdjacentGalleryIndex,
  formatGalleryProgress,
} from '../data/collection';
import { useMotionSetting } from './MotionProvider';

export const GallerySection: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const currentSlide = GALLERY_SLIDES[activeIndex];

  const selectSlide = (nextIdx: number, dir?: 'next' | 'prev') => {
    if (nextIdx === activeIndex) return;
    const resolvedDir = dir ?? (nextIdx > activeIndex ? 'next' : 'prev');
    setDirection(resolvedDir);
    setActiveIndex(nextIdx);
  };

  const handleStep = (dir: 'next' | 'prev') => {
    setDirection(dir);
    setActiveIndex((prev) => getAdjacentGalleryIndex(prev, dir));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleStep('next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleStep('prev');
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    if (Math.abs(deltaX) > 42) {
      handleStep(deltaX < 0 ? 'next' : 'prev');
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="gallery"
      onKeyDown={handleKeyDown}
      aria-labelledby="gallery-heading"
      className="relative py-24 md:py-36 bg-[#0A0B0D] border-t border-[#374047]/45 overflow-hidden"
    >
      <div className="aurel-container">
        {/* Top Bar: Eyebrow, Title & Interactive Tab Rail */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#374047]/55">
          <div>
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase mb-3">
              OBJECT / MATERIAL / MOVEMENT
            </p>
            <h2
              id="gallery-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.95]"
              style={{
                fontSize: 'clamp(2.6rem, 5.2vw, 5.6rem)',
                textWrap: 'balance',
              }}
            >
              STUDIES IN MATTER.
            </h2>
          </div>

          {/* 3 Real Interactive Tabs */}
          <div
            role="tablist"
            aria-label="Product Detail Gallery Studies"
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {GALLERY_SLIDES.map((slide, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  id={`gallery-tab-${slide.id}`}
                  aria-selected={isSelected}
                  aria-controls={`gallery-panel-${slide.id}`}
                  type="button"
                  onClick={() => selectSlide(idx)}
                  className={`px-5 py-3 border font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9] ${
                    isSelected
                      ? 'bg-[#F1EEE9] text-[#0A0B0D] border-[#F1EEE9] font-medium'
                      : 'bg-[#111317] text-[#C7CDD2] border-[#374047]/80 hover:border-[#9DB8C9] hover:text-[#F0ECE5]'
                  }`}
                >
                  {slide.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Gallery Stage: Large Image Region + Deliberate Typographic Rail */}
        <div
          id={`gallery-panel-${currentSlide.id}`}
          role="tabpanel"
          aria-labelledby={`gallery-tab-${currentSlide.id}`}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch"
        >
          {/* Large Image Viewport (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-[4/3] w-full bg-[#111317] border border-[#374047]/60 overflow-hidden select-none"
            >
              {GALLERY_SLIDES.map((slide, idx) => {
                const isCurrent = idx === activeIndex;
                const translateClass = reducedMotion
                  ? ''
                  : isCurrent
                  ? 'translate-x-0 scale-100'
                  : direction === 'next'
                  ? '-translate-x-[3%] scale-[1.02]'
                  : 'translate-x-[3%] scale-[1.02]';

                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isCurrent
                        ? 'opacity-100 z-10 pointer-events-auto'
                        : 'opacity-0 z-0 pointer-events-none'
                    } ${translateClass}`}
                  >
                    {!imgErrors[slide.id] ? (
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={2400}
                        height={1792}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [slide.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8 text-center">
                        <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                          {slide.caption}
                        </span>
                      </div>
                    )}

                    {/* Subtle technical frame overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0D]/65 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                );
              })}

              {/* Corner Metrology Overlay */}
              <div className="pointer-events-none absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.2em] text-[#C7CDD2] uppercase">
                <span>{currentSlide.caption}</span>
                <span>{formatGalleryProgress(activeIndex)}</span>
              </div>
            </div>

            {/* Gallery Controls & Progress Bar */}
            <div className="mt-5 flex items-center justify-between gap-6 pt-2">
              <div className="flex items-center gap-4">
                <span className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9]">
                  {formatGalleryProgress(activeIndex)}
                </span>
                <div className="w-32 sm:w-48 h-[1px] bg-[#374047] relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-[#9DB8C9] transition-all duration-500"
                    style={{
                      width: `${((activeIndex + 1) / GALLERY_SLIDES.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStep('prev')}
                  aria-label="Previous gallery study"
                  className="w-11 h-11 border border-[#374047] hover:border-[#9DB8C9] bg-[#111317] text-[#F0ECE5] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep('next')}
                  aria-label="Next gallery study"
                  className="w-11 h-11 border border-[#374047] hover:border-[#9DB8C9] bg-[#111317] text-[#F0ECE5] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Deliberate Typographic Rail (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#374047]/55 pt-8 lg:pt-0 lg:pl-10">
            <div className="space-y-5">
              <p className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9] uppercase">
                {currentSlide.subtitle}
              </p>

              <h3 className="font-display text-3xl md:text-4xl text-[#F0ECE5] font-normal leading-[1.08]">
                {currentSlide.heading}
              </h3>

              <p className="font-sans-ui text-sm md:text-base text-[#C7CDD2] font-light leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            <dl className="mt-10 pt-6 border-t border-[#374047]/55 space-y-5">
              {currentSlide.specs.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <dt className="font-mono-tech text-[10px] tracking-[0.22em] text-[#89919A] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-sans-ui text-sm text-[#F0ECE5]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
