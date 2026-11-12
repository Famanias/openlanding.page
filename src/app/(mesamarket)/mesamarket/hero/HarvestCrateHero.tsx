'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import HarvestSceneCanvas from './HarvestSceneCanvas';
import { fraunces, ibmPlexMono } from './fonts';
import {
  addProduceInstance,
  clearBasketState,
  createInitialBasketState,
  getCuratedAdditions,
  removeProduceInstance,
  type BasketState,
  type ProduceId,
} from './basketState';

export function HarvestCrateHero() {
  const [basketState, setBasketState] = useState<BasketState>(() =>
    createInitialBasketState()
  );

  const staggerTimersRef = useRef<number[]>([]);

  const clearPendingTimers = useCallback(() => {
    for (const id of staggerTimersRef.current) {
      window.clearTimeout(id);
    }
    staggerTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearPendingTimers();
    };
  }, [clearPendingTimers]);

  const handleAddProduce = useCallback(
    (produceId: ProduceId, sourceAnchorId?: string) => {
      setBasketState((prev) => addProduceInstance(prev, produceId, sourceAnchorId).nextState);
    },
    []
  );

  const handleRemoveInstance = useCallback((instanceId: string) => {
    setBasketState((prev) => removeProduceInstance(prev, instanceId).nextState);
  }, []);

  const handleClearBasket = useCallback(() => {
    clearPendingTimers();
    setBasketState((prev) => clearBasketState(prev));
  }, [clearPendingTimers]);

  const handleBuildCuratedBasket = useCallback(() => {
    clearPendingTimers();
    const queue = getCuratedAdditions(basketState);
    queue.forEach((produceId, idx) => {
      const timerId = window.setTimeout(() => {
        setBasketState((prev) => addProduceInstance(prev, produceId).nextState);
      }, idx * 85);
      staggerTimersRef.current.push(timerId);
    });
  }, [basketState, clearPendingTimers]);

  return (
    <section
      id="harvest-hero"
      aria-label="Interactive Harvest Crate Hero"
      className="w-full bg-[#F7F1E5] text-[#1A1714] flex flex-col justify-between overflow-x-hidden border-b-2 border-[#24211D]"
    >
      <div
        data-basket-count={basketState.items.length}
        data-produce-ids={basketState.items.map((i) => i.produceId).join(',')}
        className="flex-1 w-full max-w-[1520px] mx-auto pl-6 sm:pl-10 lg:pl-16 pr-4 sm:pr-8 lg:pr-8 xl:pr-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-0 pt-6 sm:pt-8 lg:pt-10 pb-6 lg:pb-8"
      >
        {/* Left Hero Editorial Copy & Stacked CTAs */}
        <div className="lg:col-span-5 z-10 flex flex-col items-start justify-center pt-2 sm:pt-4 lg:pt-0 lg:pr-4">
          <p
            className={`${ibmPlexMono.className} text-[11px] sm:text-[13px] tracking-[0.07em] uppercase text-[#241F1B] mb-3 sm:mb-5`}
          >
            CAPAY &amp; SONOMA HARVEST CRATE — ILLUSTRATIVE DEMO
          </p>

          <h1
            className={`${fraunces.className} font-bold text-[40px] sm:text-[58px] xl:text-[68px] leading-[1.03] tracking-[-0.028em] text-[#181512] mb-3.5 sm:mb-6`}
          >
            <span className="block">Good things </span>
            <span className="block whitespace-nowrap">come into season.</span>
          </h1>

          <p className="text-[15.5px] sm:text-[18.5px] leading-[1.48] sm:leading-[1.52] text-[#26211C] max-w-[465px] mb-5 sm:mb-8 font-normal">
            Build a farm-to-door box from the best of the week’s harvest —
            vegetables, fruit, and pantry picks sourced for flavor and freshness.
          </p>

          {/* Stacked Primary & Secondary Pill CTAs */}
          <div className="flex flex-col items-start gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={handleBuildCuratedBasket}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D85432] hover:bg-[#C44727] active:scale-[0.98] text-[#FDF9F2] px-6 sm:px-7 py-3 sm:py-3.5 text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1A17]"
            >
              <span>Build Your Basket</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                document.getElementById('mm-shelf')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#1E1A17] bg-transparent hover:bg-[#1E1A17]/5 active:scale-[0.98] text-[#181512] px-6 sm:px-7 py-3 sm:py-3.5 text-[15px] sm:text-[16px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D85432]"
            >
              <span>Browse This Week’s Harvest</span>
              <ArrowUpRight className="w-4 h-4 stroke-[1.8]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Interactive 2.5D Three.js Harvest Crate Scene */}
        <div
          aria-label="Interactive 2.5D Harvest Crate Illustration"
          className="lg:col-span-7 relative w-full h-[335px] sm:h-[540px] lg:h-[670px] xl:h-[720px] lg:w-[calc(100%+1.5rem)] xl:w-[calc(100%+2.5rem)]"
        >
          <HarvestSceneCanvas
            items={basketState.items}
            onAddProduce={handleAddProduce}
            onRemoveInstance={handleRemoveInstance}
          />
        </div>
      </div>
    </section>
  );
}

export default HarvestCrateHero;
