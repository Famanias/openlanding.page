import React, { useState, useRef } from 'react';
import { HERO_SLIDES, CONTACT_SHEET_THUMBNAILS, HeroSlide } from '../data/portfolioData';
import { getNextSlideIndex, formatSlideCounter } from '../utils/portfolioLogic';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onInspectSlide: (slide: HeroSlide) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onInspectSlide
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [wipeDirection, setWipeDirection] = useState<'next' | 'prev'>('next');
  const [animKey, setAnimKey] = useState<number>(0);
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];
  const prevSlide = previousIndex !== null ? HERO_SLIDES[previousIndex] : null;

  const transitionToSlide = (targetIndex: number, dir: 'next' | 'prev') => {
    if (targetIndex === currentIndex) return;
    setPreviousIndex(currentIndex);
    setWipeDirection(dir);
    setCurrentIndex(targetIndex);
    setAnimKey((k) => k + 1);
  };

  const handleStep = (dir: 'next' | 'prev') => {
    const nextIdx = getNextSlideIndex(currentIndex, HERO_SLIDES.length, dir);
    transitionToSlide(nextIdx, dir);
  };

  const handleThumbnailSelect = (slideIndex: number) => {
    if (slideIndex === currentIndex) {
      // Clicking active contact sheet thumbnail returns smoothly to primary cover slide (0)
      transitionToSlide(0, 'prev');
      return;
    }
    const dir = slideIndex > currentIndex ? 'next' : 'prev';
    transitionToSlide(slideIndex, dir);
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

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({
      x: Number((relX * -6).toFixed(2)),
      y: Number((relY * -6).toFixed(2))
    });
  };

  const handlePointerLeave = () => {
    setParallax({ x: 0, y: 0 });
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
      id="hero"
      aria-label="Featured Portfolio Series"
      onKeyDown={handleKeyDown}
      className="w-full px-5 sm:px-8 lg:px-14 pt-2 pb-10 lg:pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch lg:min-h-[735px]">
        {/* Left Editorial Column (46% visual ratio -> 6 of 12 cols with right padding) */}
        <div className="lg:col-span-6 flex flex-col justify-between pt-4 sm:pt-8 lg:pt-11 lg:pr-6">
          {/* Upper Monumental Display Block */}
          <div>
            <h1
              className="font-serif-editorial uppercase text-[#201C19] font-normal tracking-[-0.025em] leading-[0.93] select-none"
              style={{ fontSize: 'clamp(3.25rem, 6.1vw, 5.65rem)' }}
            >
              <span className="block overflow-hidden pb-0.5">
                <span className="block animate-line-reveal-1">THE BEAUTY</span>
              </span>
              <span className="block overflow-hidden pb-0.5">
                <span className="block animate-line-reveal-2">BETWEEN</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="block animate-line-reveal-3">MOMENTS.</span>
              </span>
            </h1>

            {/* Hand-painted Rust Brush Underline */}
            <div className="mt-4 sm:mt-5 mb-6 sm:mb-8" aria-hidden="true">
              <svg
                width="88"
                height="12"
                viewBox="0 0 88 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                <path
                  d="M2 7.2C24.5 5.6 54.2 5.1 85.5 5.8"
                  stroke="#A65D46"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  className="animate-brush-stroke"
                />
                <path
                  d="M4 8.6C31 7.2 61 6.8 83 7.4"
                  stroke="#A65D46"
                  strokeOpacity="0.65"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  className="animate-brush-stroke"
                />
              </svg>
            </div>

            {/* Editorial Lead Copy */}
            <p className="text-[15.5px] sm:text-[17px] leading-[1.48] text-[#201C19]/90 font-normal max-w-[440px]">
              Photographs of fleeting places, quiet emotions,{' '}
              <br className="hidden sm:inline" />
              and everything we almost miss.
            </p>
          </div>

          {/* Lower Editorial Bar: Stacked CTAs + 3-Image Contact Sheet */}
          <div className="mt-10 lg:mt-12 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-8 lg:gap-6">
            {/* Left Bottom CTAs */}
            <div className="w-full sm:w-[215px] shrink-0 pb-1">
              <a
                href="#archive"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('archive');
                }}
                className="group flex items-center justify-between sm:justify-start gap-2 text-[12px] sm:text-[12.5px] tracking-[0.05em] uppercase text-[#201C19] pb-3 min-h-[44px]"
              >
                <span className="ink-link">EXPLORE THE ARCHIVE</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>

              <div className="w-full h-[1px] bg-[#BFB7AC]" />

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="group flex items-center justify-between sm:justify-start gap-2 text-[12px] sm:text-[12.5px] tracking-[0.05em] uppercase text-[#201C19] pt-3 min-h-[44px]"
              >
                <span className="ink-link">THE ARTIST</span>
              </a>
            </div>

            {/* Right Bottom 3-Image Contact Sheet */}
            <div
              role="group"
              aria-label="Featured Series Contact Sheet"
              className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full sm:max-w-[300px]"
            >
              {CONTACT_SHEET_THUMBNAILS.map((item) => {
                const isSelected = currentIndex === item.slideIndex;
                return (
                  <button
                    key={item.serial}
                    type="button"
                    onClick={() => handleThumbnailSelect(item.slideIndex)}
                    aria-pressed={isSelected}
                    aria-label={`Select Serial ${item.serial} featured photograph`}
                    className="group text-left focus:outline-none"
                  >
                    <div
                      className={`relative aspect-[4/4.7] w-full overflow-hidden bg-[#D8D0C5] transition-transform duration-500 ${
                        isSelected
                          ? 'ring-1 ring-[#A65D46] ring-offset-2 ring-offset-[#F2ECE0]'
                          : 'opacity-95 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1.5 text-[9px] tracking-[0.06em] uppercase text-[#201C19]/80 tabular-nums">
                      <span>{item.label}</span>
                      <span>{item.serial}</span>
                    </div>
                    <div
                      className={`h-[1.5px] mt-0.5 transition-all duration-300 ${
                        isSelected
                          ? 'w-full bg-[#A65D46]'
                          : 'w-0 group-hover:w-full bg-[#201C19]/40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Dominant Photographic Frame (54% visual ratio -> 6 of 12 cols) */}
        <div className="lg:col-span-6 flex flex-col">
          <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full h-full min-h-[460px] sm:min-h-[580px] lg:min-h-[735px] overflow-hidden bg-[#4E616D] animate-shutter-entrance select-none group"
          >
            {/* Previous Slide Underlay for Two-Layer Shutter Wipe */}
            {prevSlide && (
              <img
                key={`prev-${prevSlide.id}-${animKey}`}
                src={prevSlide.image}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            )}

            {/* Active Hero Photograph with Directional Shutter Wipe & Subtle Breathing */}
            <div
              key={`active-${currentSlide.id}-${animKey}`}
              className={`absolute inset-0 w-full h-full ${
                animKey > 0
                  ? wipeDirection === 'next'
                    ? 'shutter-wipe-next'
                    : 'shutter-wipe-prev'
                  : ''
              }`}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.alt}
                referrerPolicy="no-referrer"
                onClick={() => onInspectSlide(currentSlide)}
                style={{
                  transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.02)`
                }}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out cursor-zoom-in film-breathe"
              />
            </div>

            {/* Measured Bottom Scrim for WCAG AA Overlay Legibility */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#141210]/85 via-[#141210]/40 to-transparent"
            />

            {/* Top-right subtle inspect trigger on hover/focus */}
            <button
              type="button"
              onClick={() => onInspectSlide(currentSlide)}
              aria-label={`Open ${currentSlide.seriesTitle} in fullscreen viewer`}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 text-[10px] tracking-[0.08em] uppercase text-[#F7F4ED]/90 bg-[#141210]/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
            >
              INSPECT PLATE ↗
            </button>

            {/* Bottom Caption, Counter & Gallery Arrows (Exact Match to Screenshot) */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8 lg:px-9 lg:pb-7 flex items-end justify-between gap-6 text-[#F7F4ED]">
              {/* Left Series Metadata */}
              <div className="max-w-[70%]">
                <p
                  aria-live="polite"
                  className="text-[11.5px] sm:text-[12.5px] tracking-[0.06em] uppercase font-normal text-[#F7F4ED]"
                >
                  {currentSlide.seriesTitle}
                </p>
                <div className="mt-2.5 sm:mt-3 text-[11px] sm:text-[11.5px] leading-[1.35] tracking-[0.05em] uppercase text-[#F7F4ED]/85 tabular-nums">
                  <p>{currentSlide.year}</p>
                  <p>{currentSlide.workType}</p>
                </div>
              </div>

              {/* Right Counter & Slim Gallery Arrows */}
              <div className="w-[116px] sm:w-[126px] shrink-0">
                <div
                  aria-live="polite"
                  className="text-[12px] sm:text-[12.5px] tracking-[0.06em] text-[#F7F4ED] tabular-nums pb-2.5"
                >
                  {formatSlideCounter(currentIndex, HERO_SLIDES.length)}
                </div>

                <div className="w-full h-[1px] bg-[#F7F4ED]/35 mb-1" />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleStep('prev')}
                    aria-label="Previous featured photograph"
                    className="group/btn min-h-[44px] min-w-[44px] -ml-1 flex items-center justify-start text-[#F7F4ED]/80 hover:text-[#F7F4ED] active:scale-95 transition-all"
                  >
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 24 12"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:-translate-x-1"
                    >
                      <path
                        d="M23 6H2M2 6L6.5 1.5M2 6L6.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStep('next')}
                    aria-label="Next featured photograph"
                    className="group/btn min-h-[44px] min-w-[44px] -mr-1 flex items-center justify-end text-[#F7F4ED]/80 hover:text-[#F7F4ED] active:scale-95 transition-all"
                  >
                    <svg
                      width="24"
                      height="12"
                      viewBox="0 0 24 12"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    >
                      <path
                        d="M1 6H22M22 6L17.5 1.5M22 6L17.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
