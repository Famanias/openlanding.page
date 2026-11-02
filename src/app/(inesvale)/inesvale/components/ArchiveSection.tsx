import React, { useState, useMemo } from 'react';
import { ARCHIVE_PHOTOS, ArchiveCategory, ArchivePhoto } from '../data/portfolioData';
import { filterArchivePhotos, getCategoryCounts } from '../utils/portfolioLogic';

interface ArchiveSectionProps {
  onSelectPhoto: (photo: ArchivePhoto, filteredList: ArchivePhoto[]) => void;
}

const CATEGORIES: ArchiveCategory[] = [
  'All',
  'Portraits',
  'Places',
  'Architecture',
  'Details'
];

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory>('All');
  const [transitioning, setTransitioning] = useState(false);

  const counts = useMemo(() => getCategoryCounts(ARCHIVE_PHOTOS), []);
  const filteredPhotos = useMemo(
    () => filterArchivePhotos(ARCHIVE_PHOTOS, selectedCategory),
    [selectedCategory]
  );

  const handleCategoryChange = (category: ArchiveCategory) => {
    if (category === selectedCategory) return;
    setTransitioning(true);
    setSelectedCategory(category);
    window.setTimeout(() => {
      setTransitioning(false);
    }, 280);
  };

  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      {/* Header & Interactive Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#BFB7AC]">
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-3 tabular-nums">
            03 — ARCHIVE COLLECTION
          </p>
          <h2
            id="archive-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-[#201C19] leading-[0.98]"
          >
            INDEX OF PLATES.
          </h2>
        </div>

        {/* Category Filter Buttons (Clean Editorial Segmented Bar) */}
        <div
          role="group"
          aria-label="Filter archive by photographic subject"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={isActive}
                className={`min-h-[44px] py-2 text-[13px] tracking-[0.05em] uppercase whitespace-nowrap shrink-0 transition-colors flex items-baseline gap-1.5 border-b-2 ${
                  isActive
                    ? 'border-[#A65D46] text-[#201C19] font-medium'
                    : 'border-transparent text-[#79756F] hover:text-[#201C19]'
                }`}
              >
                <span>{category}</span>
                <span className="text-[10.5px] text-[#79756F] tabular-nums">
                  ({counts[category]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Status Readout */}
      <div className="flex items-center justify-between py-4 text-[11px] tracking-[0.06em] uppercase text-[#79756F] tabular-nums">
        <span aria-live="polite">
          SHOWING {filteredPhotos.length} OF {ARCHIVE_PHOTOS.length} ARCHIVAL PLATES ·{' '}
          {selectedCategory.toUpperCase()}
        </span>
        <span>CLICK ANY PLATE TO OPEN LIGHTBOX</span>
      </div>

      {/* Editorial Contact-Sheet & Asymmetric Gallery Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12 pt-6 transition-all duration-300 ${
          transitioning ? 'opacity-75 translate-y-1' : 'opacity-100 translate-y-0'
        }`}
      >
        {filteredPhotos.map((photo) => {
          const gridSpan =
            selectedCategory === 'All' ? photo.spanClass : 'md:col-span-4';

          return (
            <figure
              key={photo.id}
              className={`${gridSpan} flex flex-col justify-between group`}
            >
              <button
                type="button"
                onClick={() => onSelectPhoto(photo, filteredPhotos)}
                aria-label={`Open ${photo.title} (${photo.plateNumber}) in lightbox`}
                className={`relative w-full ${photo.aspectClass} overflow-hidden bg-[#D8D0C5] text-left block focus:outline-none`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Sliding Darkroom Matte Overlay on Hover/Focus */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300 ease-out bg-[#201C19]/90 text-[#F7F4ED] px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] tracking-[0.04em] truncate">
                    {photo.caption}
                  </span>
                  <span className="text-[10px] tracking-[0.08em] uppercase text-[#F7F4ED]/75 whitespace-nowrap shrink-0 tabular-nums">
                    {photo.exif}
                  </span>
                </div>
              </button>

              {/* Unboxed Clean Editorial Metadata Below Plate */}
              <figcaption className="pt-3 flex items-baseline justify-between gap-4 border-b border-[#BFB7AC]/50 pb-2.5">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="text-[10.5px] tracking-[0.07em] uppercase text-[#A65D46] tabular-nums shrink-0">
                    {photo.plateNumber}
                  </span>
                  <span className="font-serif-editorial text-xl text-[#201C19] truncate">
                    {photo.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#79756F] whitespace-nowrap shrink-0 tabular-nums">
                  <span>{photo.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{photo.year}</span>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};
