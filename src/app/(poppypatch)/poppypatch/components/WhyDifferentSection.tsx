import React from 'react';
import { WHY_DIFFERENT_ITEMS } from '../data/poppyPatchData';
import { BotanicalSprig } from './DoodleSvg';

export function WhyDifferentSection() {
  return (
    <section
      id="our-story"
      aria-labelledby="why-different-heading"
      className="py-16 sm:py-24 relative"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Story Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38]">
              OUR STUDIO PHILOSOPHY
            </p>
            <h2
              id="why-different-heading"
              className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,3.8vw,3.1rem)] leading-[1.08] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Why Poppy Patch feels like a tiny studio, not a biology lab.
            </h2>
            <p className="text-[16px] text-[#563A32] leading-relaxed">
              We started Poppy Patch because traditional mushroom kits either looked like sterile plastic science experiments or made wild promises about effortless ten-pound harvests.
            </p>
            <p className="text-[15px] text-[#69493E] leading-relaxed">
              Our boxes are crafted for curious cooks, apartment dwellers, and patient mornings—pairing honest culinary instructions with packaging warm enough to leave out on the counter.
            </p>

            {/* Stamp + Cutout Card */}
            <div className="pt-2 flex items-center gap-5">
              <img
                src="/templates/poppypatch/stamp-grow-happy.png"
                alt="Grow Happy Poppy Patch circular ink stamp"
                width={112}
                height={112}
                referrerPolicy="no-referrer"
                className="w-24 h-24 object-contain shrink-0"
              />
              <div className="text-xs text-[#563A32] space-y-1">
                <p className="font-serif-display font-bold text-base text-[#4A2E25]">
                  Small-batch hardwood blocks
                </p>
                <p>
                  Mixed from clean sawdust, organic oat bran, and spring water—zero synthetic fertilizers or complicated gadgets.
                </p>
              </div>
            </div>
          </div>

          {/* Right 4-Card Editorial Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_DIFFERENT_ITEMS.map((item, idx) => (
              <article
                key={item.id}
                style={{ backgroundColor: item.accent }}
                className={`card-papier p-6 sm:p-7 border border-[#4A2E25]/15 flex flex-col justify-between relative overflow-hidden ${
                  idx % 2 === 1 ? 'sm:translate-y-4' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-serif-display font-bold text-2xl text-[#4A2E25]">
                      {item.number}.
                    </span>
                    <span className="postage-stamp px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#4A2E25] rounded">
                      {item.stamp}
                    </span>
                  </div>

                  <h3 className="font-serif-display font-bold text-xl text-[#4A2E25] leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-[#563A32] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#4A2E25]/10 flex items-center justify-between text-xs font-semibold text-[#69493E]">
                  <span>Poppy Patch Standard</span>
                  <BotanicalSprig className="w-6 h-8 opacity-60" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
