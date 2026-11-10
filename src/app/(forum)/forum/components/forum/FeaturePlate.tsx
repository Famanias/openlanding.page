'use client';
import React from 'react';
import { ForumAssetEntry } from '../../lib/forum/assets';
import { SignalFilterCategory } from '../../lib/forum/demoData';
import { PointerTiltPlate } from './PointerTiltPlate';
import { ResilientImage } from './ResilientImage';
import { MagneticButton } from './MagneticButton';

export interface FeaturePlateItem {
  id: string;
  number: string;
  title: string;
  description: string;
  asset: ForumAssetEntry;
  demoCategory: SignalFilterCategory;
  capabilities: string[];
  architectureNote: string;
}

interface FeaturePlateProps {
  item: FeaturePlateItem;
  featured?: boolean;
  onExplore: (item: FeaturePlateItem) => void;
}

export const FeaturePlate: React.FC<FeaturePlateProps> = ({
  item,
  featured = false,
  onExplore,
}) => {
  return (
    <article
      aria-labelledby={`feature-title-${item.id}`}
      className="plate-scene-shell h-full flex flex-col"
    >
      <PointerTiltPlate className="flex-1 flex flex-col">
        {/* Top Plate Header Bar */}
        <div className="flex items-center justify-between border-b border-[#B9B28A]/30 bg-[#0E100C] px-4 sm:px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="reg-cross text-[#B9B28A]/80" aria-hidden="true" />
            <span className="font-mono-tech text-xs tracking-[0.16em] text-[#B9B28A] uppercase">
              PLATE // {item.number}
            </span>
          </div>
          <span className="font-mono-tech text-[11px] tracking-[0.14em] text-[#D7D1B8]/70 uppercase">
            {item.architectureNote}
          </span>
        </div>

        {/* Portrait Artwork Viewport (Natural 4:5 / 1792:2400 proportion) */}
        <div
          className={`relative w-full overflow-hidden bg-[#0E100C] border-b border-[#B9B28A]/30 ${
            featured ? 'aspect-[4/4.8] lg:aspect-[4/4.9]' : 'aspect-[4/4.6]'
          }`}
        >
          <div className="plate-image-mask h-full w-full overflow-hidden">
            <ResilientImage
              asset={item.asset}
              className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
          {/* Subtle inner architectural frame line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 border border-[#B9B28A]/20"
          />
        </div>

        {/* Editorial Caption & Action Footer (Never covers primary artwork subject) */}
        <div className="plate-caption-block flex flex-1 flex-col justify-between bg-[#171814] p-5 sm:p-6 lg:p-7">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3
                id={`feature-title-${item.id}`}
                className="font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight"
              >
                {item.title}
              </h3>
              <span className="font-mono-tech text-xs text-[#B9B28A] shrink-0">
                [{item.number}]
              </span>
            </div>
            <p className="font-prose-support text-base sm:text-[17px] leading-relaxed text-[#D7D1B8]">
              {item.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#B9B28A]/20 flex items-center justify-between gap-4">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#B9B28A]/80">
              MODE: {item.demoCategory}
            </span>
            <MagneticButton
              variant="secondary"
              size="sm"
              onClick={() => onExplore(item)}
              ariaLabel={`Explore ${item.title} specification`}
              dataTestId={`explore-${item.id}`}
              icon={<span className="text-xs leading-none">↗</span>}
            >
              EXPLORE
            </MagneticButton>
          </div>
        </div>
      </PointerTiltPlate>
    </article>
  );
};
