import React from 'react';
import { SectionHandoffRule } from './MortaMark';
import { HouseRingStudy3D } from './HouseRingStudy3D';

interface HouseSectionProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

export const HouseSection: React.FC<HouseSectionProps> = ({
  reducedMotion,
}) => {
  return (
    <section
      id="house"
      aria-labelledby="house-heading"
      className="relative morta-atmosphere border-b border-white/20"
    >
      <SectionHandoffRule chapterNumber="CH. II" chapterLabel="The House" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Oversized Editorial Statement & House Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">
              FIRST PRINCIPLE · METAL SHAPED AROUND AN ABSENCE
            </p>

            <h2
              id="house-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Objects of devotion,
              <br />
              made to endure.
            </h2>

            <div className="w-24 h-px bg-white/40" aria-hidden="true" />

            <div className="space-y-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              <p>
                Each MORTA piece gives form to the space it surrounds, from
                the hollow of a signet to the curve of a finger.
              </p>
              <p>
                Cast in solid 925 silver and finished by hand, each form
                gathers the marks of a life worn.
              </p>
            </div>

            {/* Key House Tenets (Unboxed clean metadata grid) */}
            <dl className="pt-8 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                  01 · Materiality
                </dt>
                <dd className="text-sm text-white/90 leading-relaxed">
                  Solid 925 silver, oxidized and burnished by hand.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                  02 · Architecture
                </dt>
                <dd className="text-sm text-white/90 leading-relaxed">
                  Pointed arches and stepped forms frame quiet space.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                  03 · Permanence
                </dt>
                <dd className="text-sm text-white/90 leading-relaxed">
                  Small editions and solitary commissions made to endure.
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Dimensional 3D Material & Form Study of the Reliquary Ring */}
          <div className="lg:col-span-5">
            <HouseRingStudy3D reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
};
