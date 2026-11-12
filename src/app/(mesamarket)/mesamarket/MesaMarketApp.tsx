'use client';

import React, { useReducer, useState, useRef } from 'react';
import {
  INITIAL_BASKET_STATE,
  basketReducer,
  calculateBasketTotals,
  ProduceCategory,
  ProduceId,
} from './basket/model';
import { Header } from './sections/Header';
import { HarvestCrateHero } from './hero/HarvestCrateHero';
import { HeroStall } from './sections/HeroStall';
import { ProduceShelf } from './sections/ProduceShelf';
import { MealKits } from './sections/MealKits';
import { ProducerRoute } from './sections/ProducerRoute';
import { ReceiptSection } from './sections/ReceiptSection';
import { Footer } from './sections/Footer';
import { BasketPill } from './sections/BasketPill';
import { BasketDrawer } from './sections/BasketDrawer';

export function MesaMarketApp() {
  const [basketState, dispatch] = useReducer(basketReducer, INITIAL_BASKET_STATE);
  const [activeCategory, setActiveCategory] = useState<ProduceCategory>('all');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const basketPillRef = useRef<HTMLButtonElement | null>(null);

  const totals = calculateBasketTotals(basketState.quantities);

  const handleAddProduce = (productId: ProduceId) => {
    dispatch({ type: 'ADD', productId });
    setJustAddedId(productId);
    window.setTimeout(() => setJustAddedId(null), 350);
  };

  const handleAddKit = (kitId: string) => {
    dispatch({ type: 'ADD_KIT', kitId });
    setDrawerOpen(true);
  };

  return (
    <div id="top" className="mesa-root min-h-screen overflow-x-hidden selection:bg-[#D94C32] selection:text-[#FDF5E7]">
      <a
        href="#mm-shelf"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D94C32] focus:text-[#FDF5E7] focus:font-bold focus:rounded-md"
      >
        Skip to market shelf
      </a>

      {/* 00: 2.5D Interactive Harvest Crate Hero (1:1 from mesa-hero) */}
      <HarvestCrateHero />

      {/* Market Signage Header */}
      <Header
        totalCount={totals.totalCount}
        sampleSubtotal={totals.sampleSubtotal}
        onOpenBasket={() => setDrawerOpen(true)}
      />

      <main id="main">
        {/* 01: Flat-Lay Market Stall Collage Showcase (Moved Down) */}
        <HeroStall
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddProduce={handleAddProduce}
        />

        {/* 02: Live Category Filter & Interactive Produce Shelf */}
        <ProduceShelf
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          quantities={basketState.quantities}
          onAdd={handleAddProduce}
          onDecrement={(id) => dispatch({ type: 'DECREMENT', productId: id })}
          justAddedId={justAddedId}
          lastAnnouncement={basketState.lastAnnouncement}
        />

        {/* 03: Seasonal Meal Kit Explorer */}
        <MealKits onAddKit={handleAddKit} />

        {/* 04: Producer Story Comic Strip & Illustrated SVG Delivery Loop */}
        <ProducerRoute />

        {/* 05: Sample Order Review / Receipt Card */}
        <ReceiptSection
          lines={totals.lines}
          totalCount={totals.totalCount}
          sampleSubtotal={totals.sampleSubtotal}
        />
      </main>

      {/* Grocery-Receipt Footer */}
      <Footer />

      {/* Floating Persistent Basket Pill */}
      <BasketPill
        buttonRef={basketPillRef}
        totalCount={totals.totalCount}
        sampleSubtotal={totals.sampleSubtotal}
        onOpen={() => setDrawerOpen(true)}
      />

      {/* Accessible Basket Drawer */}
      <BasketDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lines={totals.lines}
        totalCount={totals.totalCount}
        sampleSubtotal={totals.sampleSubtotal}
        onAdd={handleAddProduce}
        onDecrement={(id) => dispatch({ type: 'DECREMENT', productId: id })}
        onRemove={(id) => dispatch({ type: 'REMOVE', productId: id })}
        onClear={() => dispatch({ type: 'CLEAR' })}
        basketPillRef={basketPillRef}
      />
    </div>
  );
}
