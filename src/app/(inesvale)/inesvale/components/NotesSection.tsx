import React from 'react';
import { JOURNAL_NOTES, JournalNote } from '../data/portfolioData';

interface NotesSectionProps {
  onSelectNote: (note: JournalNote) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ onSelectNote }) => {
  const leadNote = JOURNAL_NOTES[0];
  const secondaryNotes = JOURNAL_NOTES.slice(1);

  return (
    <section
      id="notes"
      aria-labelledby="notes-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[#BFB7AC]">
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-3 tabular-nums">
            06 — NOTES & FIELD JOURNAL
          </p>
          <h2
            id="notes-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-[#201C19] leading-[0.98]"
          >
            DARKROOM & FIELD NOTES.
          </h2>
        </div>
        <p className="text-[14.5px] sm:text-[15.5px] leading-[1.55] text-[#201C19]/80 max-w-[390px]">
          Short essays on metering for fog, studio silence, lime architecture, and sequencing photographs on physical paper.
        </p>
      </div>

      {/* Editorial Asymmetric Broadsheet Layout (Lead Note + 3 Indexed Entries) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-12">
        {/* Left Featured Essay */}
        <article className="lg:col-span-6 flex flex-col justify-between bg-[#F7F4ED] border border-[#BFB7AC]/70 p-6 sm:p-8">
          <div>
            <div className="flex items-center justify-between text-[11px] tracking-[0.07em] uppercase text-[#79756F] pb-4 tabular-nums">
              <span className="text-[#A65D46]">{leadNote.issueNumber}</span>
              <span>
                {leadNote.date} · {leadNote.readTime}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectNote(leadNote)}
              aria-label={`Read journal note: ${leadNote.title}`}
              className="group relative aspect-[16/10] w-full overflow-hidden bg-[#D8D0C5] block text-left"
            >
              <img
                src={leadNote.image}
                alt={leadNote.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </button>

            <h3 className="mt-6 font-serif-editorial text-3xl sm:text-4xl font-normal text-[#201C19] leading-[1.08]">
              <button
                type="button"
                onClick={() => onSelectNote(leadNote)}
                className="text-left hover:text-[#A65D46] transition-colors"
              >
                {leadNote.title}
              </button>
            </h3>

            <p className="mt-3 text-[15px] leading-[1.6] text-[#201C19]/80">
              {leadNote.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#BFB7AC]/60 flex items-center justify-between">
            <span className="text-[11.5px] text-[#79756F]">{leadNote.subtitle}</span>
            <button
              type="button"
              onClick={() => onSelectNote(leadNote)}
              className="group inline-flex items-center gap-2 text-[12px] tracking-[0.07em] uppercase text-[#201C19] min-h-[44px] whitespace-nowrap shrink-0"
            >
              <span className="ink-link">READ NOTE</span>
              <span
                aria-hidden="true"
                className="inline-block text-[#A65D46] transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </article>

        {/* Right Stacked Editorial Index */}
        <div className="lg:col-span-6 divide-y divide-[#BFB7AC] flex flex-col justify-between">
          {secondaryNotes.map((note) => (
            <article
              key={note.id}
              className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center group"
            >
              <div className="sm:col-span-4">
                <button
                  type="button"
                  onClick={() => onSelectNote(note)}
                  aria-label={`Read journal note: ${note.title}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#D8D0C5] block"
                >
                  <img
                    src={note.image}
                    alt={note.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </button>
              </div>

              <div className="sm:col-span-8 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[11px] tracking-[0.06em] uppercase text-[#79756F] tabular-nums">
                  <span className="text-[#A65D46]">{note.issueNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.readTime}</span>
                </div>

                <h3 className="mt-1.5 font-serif-editorial text-2xl sm:text-[26px] font-normal text-[#201C19] leading-[1.12]">
                  <button
                    type="button"
                    onClick={() => onSelectNote(note)}
                    className="text-left group-hover:text-[#A65D46] transition-colors"
                  >
                    {note.title}
                  </button>
                </h3>

                <p className="mt-2 text-[14px] leading-[1.55] text-[#201C19]/80 line-clamp-2">
                  {note.excerpt}
                </p>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onSelectNote(note)}
                    className="inline-flex items-center gap-1.5 text-[11.5px] tracking-[0.07em] uppercase text-[#201C19]"
                  >
                    <span className="ink-link">READ ESSAY</span>
                    <span
                      aria-hidden="true"
                      className="inline-block text-[#A65D46] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
