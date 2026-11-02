import React from 'react';
import { SELECTED_STORIES, StoryItem } from '../data/portfolioData';

interface SelectedStoriesSectionProps {
  onOpenStory: (story: StoryItem, initialImageIndex?: number) => void;
}

export const SelectedStoriesSection: React.FC<SelectedStoriesSectionProps> = ({
  onOpenStory
}) => {
  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 lg:pb-20 border-b border-[#BFB7AC]/70">
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-3 tabular-nums">
            02 — SELECTED STORIES
          </p>
          <h2
            id="stories-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-[#201C19] leading-[0.98]"
          >
            SEQUENCED MONOGRAPHS.
          </h2>
        </div>
        <p className="text-[14.5px] sm:text-[15.5px] leading-[1.55] text-[#201C19]/80 max-w-[410px]">
          Long-form photographic chapters made on medium- and large-format film across Atlantic coastlines and quiet domestic rooms.
        </p>
      </div>

      {/* Alternating Editorial Story Spreads (No Repeated Card Grids) */}
      <div className="divide-y divide-[#BFB7AC]">
        {SELECTED_STORIES.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article
              key={story.id}
              aria-labelledby={`story-title-${story.id}`}
              className="py-16 lg:py-24"
            >
              {/* Top Story Metadata Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline mb-10 lg:mb-12">
                <div className="lg:col-span-2 flex items-baseline gap-3">
                  <span className="font-serif-editorial text-3xl sm:text-4xl text-[#A65D46] tabular-nums">
                    {story.number}
                  </span>
                  <span className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] tabular-nums">
                    / {story.year}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h3
                    id={`story-title-${story.id}`}
                    className="font-serif-editorial text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-[-0.02em] text-[#201C19] leading-[1.02]"
                  >
                    {story.title}
                  </h3>
                  <p className="mt-2 text-[12px] tracking-[0.04em] text-[#79756F]">
                    {story.locationMood}
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between items-start sm:items-end lg:items-end gap-4">
                  <p className="text-[15px] leading-[1.55] text-[#201C19]/85 max-w-[430px] lg:text-right">
                    {story.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenStory(story, 0)}
                    className="group inline-flex items-center gap-2 text-[12px] tracking-[0.07em] uppercase text-[#201C19] min-h-[44px] pt-1"
                  >
                    <span className="ink-link font-medium">VIEW STORY</span>
                    <span
                      aria-hidden="true"
                      className="inline-block text-[#A65D46] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>

              {/* Varied Multi-Image Editorial Spread */}
              {isEven ? (
                /* Spread Variant A: Wide Dominant Frame + Picture-in-Paper Diptych Side */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-7 flex flex-col">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 0)}
                      aria-label={`View ${story.title} — ${story.images[0].caption}`}
                      className="group relative w-full aspect-[16/11] overflow-hidden bg-[#D8D0C5] text-left"
                    >
                      <img
                        src={story.images[0].src}
                        alt={story.images[0].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>
                    <div className="flex items-center justify-between pt-3 text-[11.5px] text-[#79756F]">
                      <span>{story.images[0].caption}</span>
                      <span className="uppercase tracking-[0.06em] tabular-nums">01 / 03</span>
                    </div>
                  </div>

                  {/* Picture-in-Paper Inset Treatment */}
                  <div className="lg:col-span-5 bg-[#F7F4ED] border border-[#BFB7AC]/60 p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      {story.images.slice(1, 3).map((img, subIdx) => (
                        <div key={img.src} className="flex flex-col">
                          <button
                            type="button"
                            onClick={() => onOpenStory(story, subIdx + 1)}
                            aria-label={`View ${story.title} — ${img.caption}`}
                            className="group relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5]"
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                          </button>
                          <span className="pt-2 text-[11px] text-[#79756F] leading-snug">
                            {img.caption}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#BFB7AC]/60 flex items-center justify-between gap-4 text-[11px] tracking-[0.05em] uppercase text-[#79756F]">
                      <span>{story.technicalSpecs}</span>
                      <button
                        type="button"
                        onClick={() => onOpenStory(story, 0)}
                        className="ink-link text-[#201C19] whitespace-nowrap shrink-0"
                      >
                        READ ESSAY (3 PLATES) ↗
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Spread Variant B: Asymmetric 3-Column Monograph Strip */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-end">
                  <div className="md:col-span-4 bg-[#F7F4ED] border border-[#BFB7AC]/60 p-5 sm:p-6">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 0)}
                      aria-label={`View ${story.title} — ${story.images[0].caption}`}
                      className="group relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5] block"
                    >
                      <img
                        src={story.images[0].src}
                        alt={story.images[0].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </button>
                    <p className="pt-3 text-[11.5px] text-[#79756F]">
                      {story.images[0].caption}
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 1)}
                      aria-label={`View ${story.title} — ${story.images[1].caption}`}
                      className="group relative aspect-[16/11] w-full overflow-hidden bg-[#D8D0C5] block"
                    >
                      <img
                        src={story.images[1].src}
                        alt={story.images[1].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>
                    <div className="flex items-center justify-between pt-3 text-[11.5px] text-[#79756F]">
                      <span>{story.images[1].caption}</span>
                      <span className="uppercase tracking-[0.06em] tabular-nums">02 / 03</span>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <button
                      type="button"
                      onClick={() => onOpenStory(story, 2)}
                      aria-label={`View ${story.title} — ${story.images[2].caption}`}
                      className="group relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5] block"
                    >
                      <img
                        src={story.images[2].src}
                        alt={story.images[2].alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </button>
                    <p className="pt-3 text-[11.5px] text-[#79756F]">
                      {story.images[2].caption}
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
