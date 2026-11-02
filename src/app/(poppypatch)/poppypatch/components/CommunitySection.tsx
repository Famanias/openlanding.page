import React from 'react';
import { COMMUNITY_VIGNETTES } from '../data/poppyPatchData';
import { SparkleStar } from './DoodleSvg';

export function CommunitySection() {
  return (
    <section
      aria-labelledby="community-heading"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
              COUNTERTOP STORIES
            </p>
            <h2
              id="community-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Little moments of magic from happy growers.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#69493E] max-w-[44ch] bg-[#FAF3E3] px-4 py-3 rounded-2xl border border-[#4A2E25]/12">
            <strong className="text-[#4A2E25]">Editorial studio note:</strong> The stories below are fictional example vignettes created for the Poppy Patch concept world to illustrate typical countertop growing moments.
          </p>
        </div>

        {/* 4-Card Editorial Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {COMMUNITY_VIGNETTES.map((item) => (
            <article
              key={item.id}
              style={{ backgroundColor: item.bgTint }}
              className="card-papier p-6 sm:p-8 border border-[#4A2E25]/15 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
            >
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#69493E]">
                  <span>{item.kitUsed}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.daysToHarvest}</span>
                </div>

                <blockquote className="font-serif-display text-lg sm:text-[19px] text-[#4A2E25] leading-relaxed">
                  {item.quote}
                </blockquote>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#563A32]">
                  <SparkleStar className="w-3.5 h-3.5 shrink-0" />
                  <strong className="font-bold text-[#4A2E25]">{item.growerName}</strong>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>Spot: {item.countertopSpot}</span>
                </div>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FAF3E3]/85 border border-[#4A2E25]/12 p-3 shrink-0 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={`Mushroom cluster for ${item.growerName}'s story`}
                  width={112}
                  height={112}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_8px_12px_rgba(90,54,40,0.18)]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
