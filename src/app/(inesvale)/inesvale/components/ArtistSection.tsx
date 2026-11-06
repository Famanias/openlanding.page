import React, { useState } from 'react';
import { ARTIST_CREDITS } from '../data/portfolioData';

interface ArtistSectionProps {
  onNavigateInquire: () => void;
}

export const ArtistSection: React.FC<ArtistSectionProps> = ({ onNavigateInquire }) => {
  const [approachExpanded, setApproachExpanded] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="artist-heading"
      className="w-full px-5 sm:px-8 lg:px-14 py-20 lg:py-28 border-t border-[#BFB7AC]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Intimate Portrait & Studio Availability */}
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#79756F] mb-4 tabular-nums">
            05 — THE ARTIST
          </p>

          <figure className="bg-[#F7F4ED] border border-[#BFB7AC]/70 p-4 sm:p-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#D8D0C5]">
              <img
                src="/templates/inesvale/artist-portrait.webp"
                alt="Editorial portrait of photographer Ines Vale in natural north window light"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <figcaption className="pt-3.5 flex items-center justify-between text-[11px] tracking-[0.05em] uppercase text-[#79756F]">
              <span>INES VALE · LISBON & PORTO</span>
              <span className="tabular-nums">B. 1991</span>
            </figcaption>
          </figure>

          {/* Studio & Availability Note */}
          <div className="mt-6 pt-5 border-t border-[#BFB7AC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.07em] uppercase text-[#A65D46]">
                STUDIO AVAILABILITY · Q4 2026 / Q1 2027
              </p>
              <p className="text-[13.5px] text-[#201C19]/85 mt-1">
                Available for editorial commissions, architectural monographs, and archival print editions across Europe.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateInquire}
              className="ink-link text-[12px] tracking-[0.07em] uppercase text-[#201C19] whitespace-nowrap shrink-0 min-h-[44px] self-start sm:self-center"
            >
              COMMISSION INQUIRY ↗
            </button>
          </div>
        </div>

        {/* Right Column: Biography, Expandable Approach & Monograph Credits */}
        <div className="lg:col-span-7 lg:pl-6 pt-2 lg:pt-8">
          <h2
            id="artist-heading"
            className="font-serif-editorial text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-[-0.02em] text-[#201C19] leading-[1.02]"
          >
            QUIET OBSERVATION IN MEDIUM FORMAT.
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[15.5px] leading-[1.65] text-[#201C19]/85">
            <p>
              Ines Vale is an independent fine-art and editorial photographer working between Lisbon, Porto, and the North Atlantic littoral. Trained initially in architectural conservation before turning to analog photography, her work examines how weather, lime, stone, and solitary human presence register the passage of time.
            </p>
            <p>
              Working almost exclusively with mechanical medium-format and 4×5 field cameras under natural twilight or north-window illumination, she avoids artificial staging in favor of unhurried sittings and extended coastal residencies.
            </p>
          </div>

          {/* Expandable "READ MY APPROACH" Paper-Sheet Extension */}
          <div className="mt-8 border-t border-b border-[#BFB7AC]">
            <button
              type="button"
              onClick={() => setApproachExpanded((prev) => !prev)}
              aria-expanded={approachExpanded}
              aria-controls="artist-approach-panel"
              className="w-full py-4 min-h-[48px] flex items-center justify-between text-left group"
            >
              <span className="text-[12.5px] tracking-[0.08em] uppercase text-[#201C19] font-medium group-hover:text-[#A65D46] transition-colors">
                {approachExpanded ? 'CLOSE MY APPROACH' : 'READ MY APPROACH'}
              </span>
              <span
                aria-hidden="true"
                className="text-sm text-[#A65D46] tracking-[0.06em] uppercase tabular-nums"
              >
                {approachExpanded ? '— COLLAPSE' : '+ EXPAND'}
              </span>
            </button>

            <div
              id="artist-approach-panel"
              role="region"
              aria-label="Ines Vale Photographic Approach"
              className={`grid transition-all duration-500 ease-out overflow-hidden ${
                approachExpanded ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0">
                <div className="bg-[#F7F4ED] border border-[#BFB7AC]/70 p-6 sm:p-8 space-y-4 text-[15px] leading-[1.65] text-[#201C19]/85">
                  <p className="font-serif-editorial italic text-xl text-[#201C19]">
                    “A photograph succeeds when it leaves room for the viewer’s own silence.”
                  </p>
                  <p>
                    1. <strong>Analog Restraint:</strong> Every project is photographed on 120 roll film or 4×5 sheet film. Having only ten or twelve exposures per roll changes the posture of the photographer from hunter to listener.
                  </p>
                  <p>
                    2. <strong>Natural Luminance Only:</strong> Whether photographing a writer in a Lisbon apartment or a basalt beach in winter fog, no strobes or artificial modifiers are introduced. Shadows are allowed to remain deep and tactile.
                  </p>
                  <p>
                    3. <strong>Tactile Print Permanence:</strong> Digital files are treated only as intermediate notes; every body of work is color-graded and proofed for warm archival cotton rag and hand-bound monograph signatures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Exhibitions & Monographs (Clearly Labeled Illustrative Fictional Content) */}
          <div className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#BFB7AC]/70">
              <h3 className="text-[11.5px] tracking-[0.08em] uppercase text-[#201C19]">
                SELECTED EXHIBITIONS & MONOGRAPHS
              </h3>
              <span className="text-[11px] text-[#79756F] italic">
                ({ARTIST_CREDITS.note})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-[11px] tracking-[0.07em] uppercase text-[#79756F] mb-3">
                  EXHIBITIONS
                </h4>
                <ul className="divide-y divide-[#BFB7AC]/50">
                  {ARTIST_CREDITS.exhibitions.map((ex) => (
                    <li
                      key={ex.title}
                      className="py-2.5 flex items-baseline justify-between gap-4 text-[13.5px]"
                    >
                      <span className="text-[#201C19]">{ex.title}</span>
                      <span className="text-[11.5px] text-[#79756F] whitespace-nowrap shrink-0 tabular-nums">
                        {ex.venue} · {ex.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] tracking-[0.07em] uppercase text-[#79756F] mb-3">
                  PUBLICATIONS
                </h4>
                <ul className="divide-y divide-[#BFB7AC]/50">
                  {ARTIST_CREDITS.publications.map((pub) => (
                    <li
                      key={pub.title}
                      className="py-2.5 flex items-baseline justify-between gap-4 text-[13.5px]"
                    >
                      <span className="text-[#201C19]">{pub.title}</span>
                      <span className="text-[11.5px] text-[#79756F] whitespace-nowrap shrink-0 tabular-nums">
                        {pub.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
