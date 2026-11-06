import React, { useState } from 'react';
import { GROW_STAGES } from '../data/poppyPatchData';
import { estimateCountertopConditions } from '../utils/storeLogic';
import { SparkleStar } from './DoodleSvg';

export function HowItGrowsSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [roomTempF, setRoomTempF] = useState<number>(68);
  const [mistsPerDay, setMistsPerDay] = useState<1 | 2 | 3>(2);

  const activeStage = GROW_STAGES[activeStageIndex];
  const conditionEstimate = estimateCountertopConditions(roomTempF, mistsPerDay);

  return (
    <section
      id="how-it-grows"
      aria-labelledby="how-it-grows-heading"
      className="py-16 sm:py-24 relative border-t border-[#4A2E25]/10 bg-[#FAF3E3]/45"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
            FROM BOX TO SKILLET IN FOUR CHAPTERS
          </p>
          <h2
            id="how-it-grows-heading"
            className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            How it grows: open, mist, watch, harvest.
          </h2>
          <p className="mt-3 text-[16px] text-[#5E4137] leading-relaxed">
            No soil to pot, no grow lights to wire. Follow our continuous four-step countertop vine—or test how your kitchen temperature shapes the timeline below.
          </p>
        </div>

        {/* Continuous Botanical Vine Step Selector */}
        <div className="relative mb-12">
          {/* Hand-drawn SVG vine connecting the 4 chapters on desktop */}
          <svg
            viewBox="0 0 1200 44"
            fill="none"
            className="hidden md:block w-full h-11 mb-2 pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M40 24 C 240 6, 380 40, 600 22 C 820 4, 980 38, 1160 20"
              stroke="#4A2E25"
              strokeOpacity="0.2"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M40 24 C 240 6, 380 40, 600 22 C 820 4, 980 38, 1160 20"
              stroke="#A8B96C"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="1200"
              strokeDashoffset={1200 - ((activeStageIndex + 1) / 4) * 1200}
              className="transition-all duration-500 ease-out"
            />
          </svg>

          <div
            role="tablist"
            aria-label="Four stages of mushroom growth"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5"
          >
            {GROW_STAGES.map((stage, idx) => {
              const isSelected = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  id={`tab-${stage.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${stage.id}`}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25] ${
                    isSelected
                      ? 'bg-[#4A2E25] text-[#FAF3E3] border-[#4A2E25] shadow-[0_8px_20px_rgba(74,46,37,0.2)] -translate-y-0.5'
                      : 'bg-[#FAF3E3] hover:bg-[#F3E6CC] text-[#4A2E25] border-[#4A2E25]/18'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-xs font-bold tracking-widest uppercase ${
                        isSelected ? 'text-[#F28B72]' : 'text-[#8A4D38]'
                      }`}
                    >
                      STEP {stage.stepNumber}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        isSelected ? 'text-[#FAF3E3]/80' : 'text-[#69493E]'
                      }`}
                    >
                      {stage.daysWindow.split('·')[0].trim()}
                    </span>
                  </div>
                  <p className="font-serif-display font-bold text-xl sm:text-2xl tracking-tight">
                    {stage.verb}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Story Panel + Sticky Visual Cutout */}
        <div
          id={`panel-${activeStage.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeStage.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-14"
        >
          {/* Left: Tactile Stage Visual Card */}
          <div
            style={{ backgroundColor: activeStage.accentBg }}
            className="lg:col-span-5 card-papier p-7 sm:p-9 border border-[#4A2E25]/15 flex flex-col items-center justify-between relative overflow-hidden"
          >
            <div className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#4A2E25]">
              <span>CHAPTER {activeStage.stepNumber} · {activeStage.verb}</span>
              <span>{activeStage.daysWindow}</span>
            </div>

            <div className="my-6 w-full max-w-[300px] aspect-square rounded-3xl bg-[#FAF3E3]/80 border border-[#4A2E25]/12 flex items-center justify-center p-6 shadow-inner">
              <img
                src={activeStage.image}
                alt={`${activeStage.verb}: ${activeStage.title}`}
                width={320}
                height={320}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(90,54,40,0.2)] transition-transform duration-300"
              />
            </div>

            <p className="text-xs font-medium text-[#4A2E25]/85 text-center max-w-[36ch]">
              Illustrated with our tactile clay reference model · Results vary with home humidity & temperature.
            </p>
          </div>

          {/* Right: Stage Instructions & Timeline */}
          <div className="lg:col-span-7 card-papier bg-[#FAF3E3] p-7 sm:p-10 border border-[#4A2E25]/15 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#8A4D38] mb-3">
                <SparkleStar className="w-4 h-4" />
                <span>{activeStage.daysWindow}</span>
              </div>

              <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#4A2E25] leading-tight mb-4">
                {activeStage.title}
              </h3>

              <p className="text-base sm:text-lg font-medium text-[#4A2E25] leading-relaxed mb-4">
                {activeStage.summary}
              </p>

              <p className="text-[15px] text-[#5E4137] leading-relaxed mb-6">
                {activeStage.detail}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7ECD6] border border-[#4A2E25]/15">
                <p className="text-xs font-bold uppercase tracking-wider text-[#4A2E25] mb-1">
                  Countertop Field Note
                </p>
                <p className="text-sm text-[#563A32] leading-relaxed">
                  {activeStage.conditionTip}
                </p>
              </div>
            </div>

            {/* Chapter Navigation Footer */}
            <div className="mt-8 pt-5 border-t border-[#4A2E25]/12 flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-[#69493E]">
                Showing stage {activeStageIndex + 1} of {GROW_STAGES.length}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      prev === 0 ? GROW_STAGES.length - 1 : prev - 1
                    )
                  }
                  className="px-4 py-2 rounded-xl border border-[#4A2E25]/25 text-xs font-bold uppercase tracking-wider text-[#4A2E25] hover:bg-[#F2E3C6] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Previous Stage
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStageIndex((prev) =>
                      prev === GROW_STAGES.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-[#E58267] hover:bg-[#D97255] text-xs font-bold uppercase tracking-wider text-[#4A2E25] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Countertop Conditions Estimator */}
        <div className="card-papier bg-[#EFE0F0]/75 border border-[#4A2E25]/15 p-6 sm:p-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#6B3F69] mb-1">
                  INTERACTIVE GROWING PLANNER
                </p>
                <h3 className="font-serif-display font-bold text-xl sm:text-2xl text-[#4A2E25]">
                  Check how your kitchen conditions shape growth
                </h3>
                <p className="text-sm text-[#563A32] mt-1">
                  Adjust your typical room temperature and daily spritz routine to preview a realistic timeline.
                </p>
              </div>

              {/* Room Temperature Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold text-[#4A2E25]">
                  <label htmlFor="kitchen-temp-slider">Average Kitchen Temperature</label>
                  <span className="font-serif-display text-lg tabular-nums">{roomTempF}°F</span>
                </div>
                <input
                  id="kitchen-temp-slider"
                  type="range"
                  min={58}
                  max={78}
                  step={1}
                  value={roomTempF}
                  onChange={(e) => setRoomTempF(Number(e.target.value))}
                  className="w-full accent-[#E58267] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-medium text-[#69493E]">
                  <span>58°F (Cool Pantry)</span>
                  <span>68°F (Ideal Counter)</span>
                  <span>78°F (Warm Summer Kitchen)</span>
                </div>
              </div>

              {/* Daily Misting Frequency Selector */}
              <div>
                <span className="block text-sm font-semibold text-[#4A2E25] mb-2">
                  Daily Spritz Routine
                </span>
                <div className="inline-flex p-1 rounded-xl bg-[#FAF3E3] border border-[#4A2E25]/15 gap-1">
                  {([1, 2, 3] as const).map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMistsPerDay(count)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                        mistsPerDay === count
                          ? 'bg-[#4A2E25] text-[#FAF3E3]'
                          : 'text-[#4A2E25] hover:bg-[#F1E4CA]'
                      }`}
                    >
                      {count}× Daily ({count === 1 ? 'Light' : count === 2 ? 'Standard' : 'Extra Humid'})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimator Output Card */}
            <div className="lg:col-span-6 bg-[#FAF3E3] rounded-2xl p-6 border border-[#4A2E25]/15 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#4A2E25]/12">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A5447]">
                    First Baby Pins
                  </span>
                  <p className="font-serif-display font-bold text-xl text-[#4A2E25] tabular-nums mt-0.5">
                    {conditionEstimate.pinningDays}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A5447]">
                    Estimated First Harvest
                  </span>
                  <p className="font-serif-display font-bold text-xl text-[#B85338] tabular-nums mt-0.5">
                    {conditionEstimate.harvestWindowDays}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#4A2E25]">
                <p>
                  <strong className="font-semibold">Expected cap character:</strong>{' '}
                  {conditionEstimate.capTextureNote}
                </p>
                <p className="text-[#5E4137]">
                  <strong className="font-semibold text-[#4A2E25]">Gardener’s tip:</strong>{' '}
                  {conditionEstimate.careRecommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
