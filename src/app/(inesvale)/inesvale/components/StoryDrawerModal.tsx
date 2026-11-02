import React, { useEffect, useRef, useState } from 'react';
import { StoryItem, JournalNote } from '../data/portfolioData';

interface StoryDrawerModalProps {
  story: StoryItem | null;
  note: JournalNote | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export const StoryDrawerModal: React.FC<StoryDrawerModalProps> = ({
  story,
  note,
  initialImageIndex = 0,
  onClose
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(initialImageIndex);

  useEffect(() => {
    setActiveImgIdx(initialImageIndex);
  }, [initialImageIndex, story]);

  useEffect(() => {
    if (!story && !note) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [story, note, onClose]);

  if (!story && !note) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={story ? `Story Monograph: ${story.title}` : `Journal Note: ${note?.title}`}
      className="fixed inset-0 z-50 bg-[#201C19]/60 backdrop-blur-[2px] flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#F2ECE0] text-[#201C19] h-full overflow-y-auto p-6 sm:p-10 lg:p-14 border-l border-[#BFB7AC] shadow-2xl flex flex-col justify-between"
      >
        {story ? (
          <div>
            {/* Story Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#BFB7AC]">
              <div className="flex items-center gap-3 text-[11px] tracking-[0.08em] uppercase text-[#79756F] tabular-nums">
                <span className="text-[#A65D46]">STORY {story.number}</span>
                <span aria-hidden="true">·</span>
                <span>{story.year}</span>
                <span aria-hidden="true">·</span>
                <span>{story.locationMood}</span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close story monograph"
                className="min-h-[44px] px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase border border-[#BFB7AC] hover:border-[#201C19] transition-colors"
              >
                CLOSE [ESC] ✕
              </button>
            </div>

            <h2 className="mt-8 font-serif-editorial text-4xl sm:text-5xl text-[#201C19] font-normal tracking-[-0.02em]">
              {story.title}
            </h2>
            <p className="mt-2 text-[12px] tracking-[0.06em] uppercase text-[#A65D46]">
              {story.technicalSpecs}
            </p>

            {/* Primary Selected Plate */}
            <div className="mt-8 bg-[#F7F4ED] border border-[#BFB7AC]/70 p-4 sm:p-6">
              <div className="aspect-[16/11] w-full overflow-hidden bg-[#D8D0C5]">
                <img
                  src={story.images[activeImgIdx]?.src || story.images[0].src}
                  alt={story.images[activeImgIdx]?.alt || story.images[0].alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-[12px] text-[#79756F]">
                <span>{story.images[activeImgIdx]?.caption}</span>
                <span className="tabular-nums uppercase tracking-[0.06em]">
                  PLATE 0{activeImgIdx + 1} / 0{story.images.length}
                </span>
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#BFB7AC]/60">
                {story.images.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    aria-pressed={activeImgIdx === idx}
                    className={`text-left p-1.5 border transition-colors ${
                      activeImgIdx === idx
                        ? 'border-[#A65D46] bg-[#F2ECE0]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#D8D0C5]">
                      <img
                        src={img.src}
                        alt={img.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Monograph Essay Prose */}
            <div className="mt-8 space-y-4 text-[16px] leading-[1.7] text-[#201C19]/90">
              {story.essay.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        ) : note ? (
          <div>
            {/* Note Header */}
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#BFB7AC]">
              <div className="flex items-center gap-3 text-[11px] tracking-[0.08em] uppercase text-[#79756F] tabular-nums">
                <span className="text-[#A65D46]">{note.issueNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{note.date}</span>
                <span aria-hidden="true">·</span>
                <span>{note.readTime}</span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close journal note"
                className="min-h-[44px] px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase border border-[#BFB7AC] hover:border-[#201C19] transition-colors"
              >
                CLOSE [ESC] ✕
              </button>
            </div>

            <h2 className="mt-8 font-serif-editorial text-3xl sm:text-5xl text-[#201C19] font-normal leading-[1.06]">
              {note.title}
            </h2>
            <p className="mt-2 text-[14px] text-[#79756F]">{note.subtitle}</p>

            <div className="mt-8 aspect-[16/10] w-full overflow-hidden bg-[#D8D0C5]">
              <img
                src={note.image}
                alt={note.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-[#201C19]/90">
              {note.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 pt-6 border-t border-[#BFB7AC] flex items-center justify-between text-[11px] tracking-[0.07em] uppercase text-[#79756F]">
          <span>INES VALE — MONOGRAPH ARCHIVE</span>
          <button
            type="button"
            onClick={onClose}
            className="ink-link text-[#201C19]"
          >
            RETURN TO PORTFOLIO
          </button>
        </div>
      </div>
    </div>
  );
};
