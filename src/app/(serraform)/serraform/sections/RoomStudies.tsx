'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PALETTE, PRINT_SPECS, ROOM_STUDIES } from '../fold/config';
import { useFold } from '../fold/FoldProvider';
import { FoldStillCanvas } from '../fold/FoldStillCanvas';
import type { DesignState } from '../fold/state';
import { Reveal } from '../motion/Reveal';

const RoomSceneFrame: React.FC<{
  studyId: (typeof ROOM_STUDIES)[number]['id'];
  opening: number;
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale'>;
  uploadedBitmap?: ImageBitmap | null;
  ariaLabel: string;
}> = ({ studyId, opening, design, uploadedBitmap = null, ariaLabel }) => {
  const width = 960;
  const height = 720;

  return (
    <div
      className="relative w-full h-full bg-[#EFE2DD] overflow-hidden"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Architectural room backdrop layer */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block pointer-events-none"
      >
        <rect width={width} height={height} fill="#EFE2DD" />
        <rect
          x="0"
          y={height * 0.56}
          width={width}
          height={height * 0.44}
          fill={PALETTE.rose}
        />
        <line
          x1="0"
          y1={height * 0.56}
          x2={width}
          y2={height * 0.56}
          stroke={PALETTE.oxblood}
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        {studyId === 'morning' && (
          <polygon
            points={`${width * 0.14},${height * 0.08} ${width * 0.52},${height * 0.08} ${width * 0.76},${height * 0.88} ${width * 0.24},${height * 0.88}`}
            fill={PALETTE.porcelain}
            fillOpacity="0.46"
          />
        )}

        {studyId === 'reading' && (
          <g>
            <rect
              x={width * 0.07}
              y={height * 0.67}
              width={width * 0.13}
              height={height * 0.075}
              rx="4"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.22"
            />
            <rect
              x={width * 0.10}
              y={height * 0.63}
              width={width * 0.07}
              height={height * 0.04}
              rx="2"
              fill={PALETTE.clay}
              fillOpacity="0.65"
            />
            <rect
              x={width * 0.76}
              y={height * 0.48}
              width={width * 0.17}
              height={height * 0.21}
              rx="24"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.24"
            />
            <rect
              x={width * 0.74}
              y={height * 0.58}
              width={width * 0.20}
              height={height * 0.12}
              rx="14"
              fill="#E7D8D3"
              stroke={PALETTE.oxblood}
              strokeOpacity="0.24"
            />
            <line
              x1={width * 0.78}
              y1={height * 0.70}
              x2={width * 0.78}
              y2={height * 0.77}
              stroke={PALETTE.oxblood}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1={width * 0.90}
              y1={height * 0.70}
              x2={width * 0.90}
              y2={height * 0.77}
              stroke={PALETTE.oxblood}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {studyId === 'studio' && (
          <g>
            <rect
              x={width * 0.05}
              y={height * 0.56}
              width={width * 0.24}
              height={9}
              rx="2"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.28"
            />
            <line
              x1={width * 0.08}
              y1={height * 0.56 + 9}
              x2={width * 0.08}
              y2={height * 0.69}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
            <line
              x1={width * 0.26}
              y1={height * 0.56 + 9}
              x2={width * 0.26}
              y2={height * 0.69}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
            <rect
              x={width * 0.70}
              y={height * 0.68}
              width={width * 0.24}
              height={10}
              rx="2"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.28"
            />
            <line
              x1={width * 0.73}
              y1={height * 0.68 + 10}
              x2={width * 0.73}
              y2={height * 0.82}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
            <line
              x1={width * 0.91}
              y1={height * 0.68 + 10}
              x2={width * 0.91}
              y2={height * 0.82}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>

      {/* Live / example textured Fold 16 composite */}
      <div className="absolute inset-x-[6%] top-[6%] bottom-[8%] pointer-events-none">
        <FoldStillCanvas
          opening={opening}
          design={design}
          view="quarter"
          uploadedBitmap={uploadedBitmap}
          showBracket={false}
          background={null}
        />
      </div>
    </div>
  );
};

export const RoomStudies: React.FC = () => {
  const { design, uploadedArt } = useFold();
  const statementRef = useRef<HTMLDivElement>(null);
  const [emphasisProgress, setEmphasisProgress] = useState(0);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setEmphasisProgress(1);
      return;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / (vh * 0.4)));
      setEmphasisProgress(p);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [reading, studio, morning] = ROOM_STUDIES;
  const livePrintSpec = PRINT_SPECS[design.print];
  const liveCaption = `Live study · ${livePrintSpec.name} · ${design.baseHex} at ${reading.opening}%`;

  return (
    <section
      id="rooms"
      className="py-16 lg:py-24 border-b border-[var(--srf-hairline)] scroll-mt-20"
    >
      <div className="srf-container">
        <div className="mb-3 srf-mono-caption text-[var(--srf-mauve)]">
          In a room · Concept room studies
        </div>

        <div ref={statementRef} className="relative mb-12 lg:mb-16 max-w-[900px]">
          <h2 className="srf-h2 text-[var(--srf-oxblood)]">
            <span className="block">Keep the room open.</span>
            <span className="block">Give each moment a place.</span>
          </h2>
          <p
            aria-hidden="true"
            className="srf-h2 text-[var(--srf-clay)] absolute inset-0 pointer-events-none select-none transition-opacity duration-300"
            style={{
              clipPath: `inset(0 ${Math.round((1 - emphasisProgress) * 100)}% 0 0)`,
            }}
          >
            <span className="block">Keep the room open.</span>
            <span className="block">Give each moment a place.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* 1. Live custom user design study */}
          <Reveal role="clip" className="lg:col-span-8">
            <figure data-testid="room-study-live">
              <div className="aspect-[4/3] rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden">
                <RoomSceneFrame
                  studyId={reading.id}
                  opening={reading.opening}
                  design={design}
                  uploadedBitmap={uploadedArt?.bitmap ?? null}
                  ariaLabel={`Concept room study: ${reading.title}, showing your live Fold 16 design (${livePrintSpec.name}, base ${design.baseHex}) at ${reading.opening}% opening`}
                />
              </div>
              <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-medium text-[var(--srf-oxblood)]">
                    {reading.title}
                  </h3>
                  <p className="text-[var(--srf-mauve)] text-base">
                    {reading.copy}
                  </p>
                </div>
                <span className="srf-mono-caption text-[var(--srf-oxblood)] shrink-0">
                  {liveCaption}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* 2. Fixed architectural example study (Stripes) */}
          <Reveal role="clip" delayMs={80} className="lg:col-span-4">
            <figure className="h-full flex flex-col">
              <div className="aspect-[3/4] rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden flex-1">
                <RoomSceneFrame
                  studyId={studio.id}
                  opening={studio.opening}
                  design={studio.fixedDesign}
                  ariaLabel={`Concept room example: ${studio.title}, Fold 16 in Stripes at ${studio.opening}% opening`}
                />
              </div>
              <figcaption className="mt-4">
                <div className="srf-mono-caption text-[var(--srf-mauve)] mb-1">
                  {studio.caption}
                </div>
                <h3 className="text-xl font-medium text-[var(--srf-oxblood)]">
                  {studio.title}
                </h3>
                <p className="text-[var(--srf-mauve)] text-base">
                  {studio.copy}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* 3. Fixed architectural example study (Waves) */}
          <Reveal role="clip" delayMs={120} className="lg:col-span-12 pt-4">
            <figure>
              <div className="aspect-[16/9] lg:aspect-[21/9] rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden">
                <RoomSceneFrame
                  studyId={morning.id}
                  opening={morning.opening}
                  design={morning.fixedDesign}
                  ariaLabel={`Concept room example: ${morning.title}, Fold 16 in Waves at ${morning.opening}% opening`}
                />
              </div>
              <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-medium text-[var(--srf-oxblood)]">
                    {morning.title}
                  </h3>
                  <p className="text-[var(--srf-mauve)] text-base">
                    {morning.copy}
                  </p>
                </div>
                <span className="srf-mono-caption text-[var(--srf-mauve)] shrink-0">
                  {morning.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
