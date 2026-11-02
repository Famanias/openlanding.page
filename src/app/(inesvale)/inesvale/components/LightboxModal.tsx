import React, { useEffect, useRef } from 'react';
import { ArchivePhoto } from '../data/portfolioData';
import { formatSlideCounter, getNextSlideIndex } from '../utils/portfolioLogic';

interface LightboxModalProps {
  photos: ArchivePhoto[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onChangeIndex
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photo = photos[currentIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'next'));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'prev'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onChangeIndex]);

  if (!photo) return null;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      onChangeIndex(
        getNextSlideIndex(currentIndex, photos.length, delta < 0 ? 'next' : 'prev')
      );
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Archival Lightbox — ${photo.title}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-[#141210]/95 text-[#F2ECE0] flex flex-col justify-between p-5 sm:p-8 lg:p-12"
    >
      {/* Top Lightbox Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#F2ECE0]/20 pb-4">
        <div className="flex items-center gap-3 text-[11.5px] tracking-[0.08em] uppercase tabular-nums">
          <span className="text-[#A65D46]">{photo.plateNumber}</span>
          <span aria-hidden="true">·</span>
          <span>{photo.series}</span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span className="hidden sm:inline text-[#F2ECE0]/65">{photo.location}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[12px] tracking-[0.06em] tabular-nums text-[#F2ECE0]/80">
            {formatSlideCounter(currentIndex, photos.length)}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close lightbox viewer"
            className="min-h-[44px] px-3 py-1.5 text-[11.5px] tracking-[0.08em] uppercase border border-[#F2ECE0]/35 hover:border-[#A65D46] hover:text-[#A65D46] transition-colors"
          >
            CLOSE [ESC] ✕
          </button>
        </div>
      </div>

      {/* Center Image Stage */}
      <div className="relative my-auto py-6 flex items-center justify-center max-h-[72vh]">
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          referrerPolicy="no-referrer"
          className="max-h-[68vh] w-auto max-w-full object-contain select-none shadow-2xl"
        />
      </div>

      {/* Bottom Caption & Prev/Next Controls */}
      <div className="border-t border-[#F2ECE0]/20 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#F2ECE0] font-normal">
            {photo.title}
          </h3>
          <p className="text-[13.5px] text-[#F2ECE0]/75 mt-0.5">
            {photo.caption}{' '}
            <span className="text-[#F2ECE0]/50 uppercase text-[11px] tracking-[0.06em] ml-2 tabular-nums">
              [{photo.exif}]
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() =>
              onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'prev'))
            }
            aria-label="Previous plate"
            className="min-h-[44px] px-4 py-2 border border-[#F2ECE0]/30 hover:border-[#F2ECE0] text-[12px] tracking-[0.07em] uppercase transition-colors"
          >
            ← PREV
          </button>
          <button
            type="button"
            onClick={() =>
              onChangeIndex(getNextSlideIndex(currentIndex, photos.length, 'next'))
            }
            aria-label="Next plate"
            className="min-h-[44px] px-4 py-2 border border-[#F2ECE0]/30 hover:border-[#F2ECE0] text-[12px] tracking-[0.07em] uppercase transition-colors"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
};
