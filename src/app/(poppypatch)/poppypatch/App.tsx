/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  MUSHROOM_KITS,
  JOURNAL_ARTICLES,
  MushroomKit,
  JournalArticle
} from './data/poppyPatchData';
import {
  BagItem,
  updateBagItems,
  calculateBagSummary
} from './utils/storeLogic';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PurposeStrip } from './components/PurposeStrip';
import { KitsSection } from './components/KitsSection';
import { HowItGrowsSection } from './components/HowItGrowsSection';
import { WhyDifferentSection } from './components/WhyDifferentSection';
import { JournalSection } from './components/JournalSection';
import { CommunitySection } from './components/CommunitySection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import {
  KitDetailModal,
  ArticleReaderModal,
  ShoppingBagDrawer
} from './components/Overlays';

export default function PoppyPatchApp() {
  const [bagItems, setBagItems] = useState<BagItem[]>([
    { kit: MUSHROOM_KITS[0], quantity: 1 }
  ]);
  const [bagDrawerOpen, setBagDrawerOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<MushroomKit | null>(null);
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const bagSummary = calculateBagSummary(bagItems);

  const handleAddToBag = (kit: MushroomKit) => {
    setBagItems((prev) => updateBagItems(prev, kit, 1));
  };

  const handleUpdateQty = (kit: MushroomKit, delta: number) => {
    setBagItems((prev) => updateBagItems(prev, kit, delta));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const scrollToKits = () => {
    const kitsEl = document.getElementById('our-kits');
    if (kitsEl) {
      kitsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close active modal/drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedKit(null);
        setActiveArticle(null);
        setBagDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col paper-surface text-[#4A2E25]">
      <Navbar
        bagCount={bagSummary.totalItems}
        onOpenBag={() => setBagDrawerOpen(true)}
      />

      <main className="flex-1">
        <HeroSection onExploreKits={scrollToKits} />
        <PurposeStrip />
        <KitsSection
          kits={MUSHROOM_KITS}
          onAddToBag={handleAddToBag}
          onSelectKitDetails={(kit) => setSelectedKit(kit)}
        />
        <HowItGrowsSection />
        <WhyDifferentSection />
        <JournalSection
          articles={JOURNAL_ARTICLES}
          onReadArticle={(article) => setActiveArticle(article)}
        />
        <CommunitySection />
        <FaqSection />
        <FinalCtaSection onScrollToKits={scrollToKits} />
      </main>

      <Footer />

      {/* Interactive Modals & Bag Drawer */}
      <KitDetailModal
        kit={selectedKit}
        onClose={() => setSelectedKit(null)}
        onAddToBag={handleAddToBag}
      />

      <ArticleReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      <ShoppingBagDrawer
        isOpen={bagDrawerOpen}
        items={bagItems}
        onClose={() => setBagDrawerOpen(false)}
        onUpdateQty={handleUpdateQty}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
