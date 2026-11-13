'use client';

import React, { useEffect, useRef } from 'react';
import { CreaseMarker } from '../brand/Logo';
import { Configurator } from '../fold/Configurator';
import { FOLD_CONSTANTS, PRINT_SPECS, STORY_CHAPTERS } from '../fold/config';
import { useFold } from '../fold/FoldProvider';
import { FoldStage } from '../fold/FoldStage';
import { FoldStillCanvas } from '../fold/FoldStillCanvas';
import { storyChapter, storyOpening, storyProgress } from '../fold/story';

export const FoldingExperience: React.FC = () => {
  const { design, view, uploadedArt, env, pushStoryFrame } = useFold();
  const foldSectionRef = useRef<HTMLElement>(null);

  // Subtle non-blocking scroll story across #fold (keeps initial Hero at 50% opening until visitor enters #fold)
  useEffect(() => {
    if (!env.enhancedDesktop) return;
    const sectionEl = foldSectionRef.current;
    if (!sectionEl) return;

    let rafId = 0;
    const syncFromScroll = () => {
      rafId = 0;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const start = window.scrollY + rect.top - vh * 0.55;
      if (window.scrollY <= Math.max(40, start)) {
        pushStoryFrame(FOLD_CONSTANTS.defaultOpening, 0);
        return;
      }
      const end = start + Math.max(320, rect.height);
      const p = storyProgress(window.scrollY, start, end);
      pushStoryFrame(storyOpening(p), storyChapter(p));
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(syncFromScroll);
    };

    syncFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [env.enhancedDesktop, pushStoryFrame]);

  const printName = PRINT_SPECS[design.print].name;

  return (
    <>
      {/* Concise editorial story strip (#fold) without oversized scroll spacers */}
      <section
        id="fold"
        ref={foldSectionRef}
        className="py-12 lg:py-16 border-b border-[var(--srf-hairline)] scroll-mt-20"
      >
        <div className="srf-container">
          <div className="mb-8 max-w-[660px]">
            <div className="mb-2 srf-mono-caption text-[var(--srf-mauve)]">
              The fold
            </div>
            <h2 className="srf-h2 text-[var(--srf-oxblood)] text-balance">
              One continuous surface. Sixteen pleats.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORY_CHAPTERS.map((item) => (
              <article
                key={item.index}
                className="flex flex-col border-t border-[var(--srf-hairline)] pt-4"
              >
                <div className="aspect-[16/10] w-full rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden mb-3.5 bg-[var(--srf-rose)]">
                  <FoldStillCanvas
                    opening={item.sampleOpening}
                    design={design}
                    view={view}
                    uploadedBitmap={uploadedArt?.bitmap ?? null}
                    showBracket={false}
                  />
                </div>
                <CreaseMarker
                  index={item.index}
                  className="text-[var(--srf-mauve)] mb-1.5"
                />
                <h3 className="text-lg font-medium text-[var(--srf-oxblood)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[var(--srf-mauve)]">
                  {item.body}
                </p>
                <span className="mt-2 srf-mono-caption text-[var(--srf-mauve)]">
                  {item.sampleOpening}% open · {printName}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Divider Design Studio workspace (#configure) */}
      <section
        id="configure"
        className="py-10 lg:py-16 border-b border-[var(--srf-hairline)] scroll-mt-20"
      >
        <div className="srf-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Stage: 60% desktop sticky left, tablet normal stacked, mobile 216px sticky below 64px header (disabled <=580px tall) */}
            <div className="lg:col-span-7 srf-studio-stage-wrap">
              <div className="h-full w-full">
                <FoldStage
                  hostId="studio"
                  showStoryBadge={true}
                  showSpanBracket={true}
                />
              </div>
            </div>

            {/* Compact interactive control rail */}
            <div className="lg:col-span-5">
              <Configurator />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
