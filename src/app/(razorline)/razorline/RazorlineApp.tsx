"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { RL01_COLLECTION, ProductModel } from './data/catalog';
import {
  BagItem,
  addToBag,
  updateBagQuantity,
  calculateBagTotals
} from './utils/storeLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeStrip } from './components/MarqueeStrip';
import { CollectionSection } from './components/CollectionSection';
import { BreakawaySection } from './components/BreakawaySection';
import { TechnologySection } from './components/TechnologySection';
import { AthletesSection } from './components/AthletesSection';
import { LookbookSection } from './components/LookbookSection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { LaunchCtaFooter } from './components/LaunchCtaFooter';

export default function RazorlineApp() {
  const [activeHeroModel, setActiveHeroModel] = useState<ProductModel>(RL01_COLLECTION[0]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'rl01-voltage': 10.0,
    'rl01-cobalt': 10.0,
    'rl01-shadow': 10.5
  });
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [quickViewModel, setQuickViewModel] = useState<ProductModel | null>(null);

  const bagTotals = useMemo(() => calculateBagTotals(bagItems), [bagItems]);

  const handleSelectSize = (modelId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [modelId]: size }));
  };

  const handleAddToBag = (model: ProductModel, size: number) => {
    setBagItems((prev) => addToBag(prev, model, size, 1));
    setBagOpen(true);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setBagItems((prev) => updateBagQuantity(prev, key, delta));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F1F0E9] flex flex-col">
      <Navbar
        bagCount={bagTotals.itemCount}
        onOpenBag={() => setBagOpen(true)}
        onShopNow={() => scrollToSection('footwear')}
      />

      <main className="flex-1">
        <HeroSection
          models={RL01_COLLECTION}
          activeHeroModel={activeHeroModel}
          onSelectHeroModel={setActiveHeroModel}
          onExploreCollection={() => scrollToSection('footwear')}
          onDiscoverTech={() => scrollToSection('technology')}
          onQuickInspect={(model) => setQuickViewModel(model)}
        />

        <MarqueeStrip />

        <CollectionSection
          models={RL01_COLLECTION}
          selectedSizes={selectedSizes}
          onSelectSize={handleSelectSize}
          onAddToBag={handleAddToBag}
          onOpenQuickView={(model) => setQuickViewModel(model)}
        />

        <BreakawaySection />

        <TechnologySection />

        <AthletesSection />

        <LookbookSection />

        <LaunchCtaFooter
          onExploreCollection={() => scrollToSection('footwear')}
        />
      </main>

      <QuickViewModal
        model={quickViewModel}
        selectedSize={
          quickViewModel ? selectedSizes[quickViewModel.id] ?? 10.0 : 10.0
        }
        onSelectSize={handleSelectSize}
        onAddToBag={handleAddToBag}
        onClose={() => setQuickViewModel(null)}
      />

      <CartDrawer
        isOpen={bagOpen}
        items={bagItems}
        totals={bagTotals}
        onUpdateQty={handleUpdateQty}
        onClearBag={handleClearBag}
        onClose={() => setBagOpen(false)}
      />
    </div>
  );
}
