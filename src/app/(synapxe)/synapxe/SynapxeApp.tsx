'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  ColorwayOption,
  CurrencyCode,
  PRODUCTS,
  ProductSpec,
  SizeOption,
} from './data/products';
import {
  CartItem,
  FilterCategory,
  SortOption,
  calculateCartTotals,
  filterAndSortProducts,
} from './utils/storeLogic';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TyvekDividerAndFilterBar } from './components/TyvekDividerAndFilterBar';
import { ProductCard } from './components/ProductCard';
import { FabricLabSection } from './components/FabricLabSection';
import { LoadoutBuilderSection } from './components/LoadoutBuilderSection';
import { BiometricFitSection } from './components/BiometricFitSection';
import { CartDrawer } from './components/CartDrawer';
import { TyvekFooter } from './components/TyvekFooter';

export default function SynapxeApp() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('PRICE: LOW-HIGH');

  // Per-card size state (defaults to 'M' for each of the 10 products)
  const [selectedSizes, setSelectedSizes] = useState<Record<number, SizeOption>>(() => {
    const initial: Record<number, SizeOption> = {};
    for (const p of PRODUCTS) {
      initial[p.id] = 'M';
    }
    return initial;
  });
  const [globalAppliedSize, setGlobalAppliedSize] = useState<SizeOption | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      key: '1-L-STEALTH BLACK-std',
      product: PRODUCTS[0],
      size: 'L',
      colorway: 'STEALTH BLACK',
      quantity: 1,
      isBundleDiscounted: false,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');

  const filteredProducts = useMemo(
    () => filterAndSortProducts(PRODUCTS, activeCategory, sortBy),
    [activeCategory, sortBy]
  );

  const cartTotals = useMemo(
    () => calculateCartTotals(cartItems, promoCode),
    [cartItems, promoCode]
  );

  const handleSelectSize = (productId: number, size: SizeOption) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleApplySizeToAll = (size: SizeOption) => {
    const updated: Record<number, SizeOption> = {};
    for (const p of PRODUCTS) {
      updated[p.id] = size;
    }
    setSelectedSizes(updated);
    setGlobalAppliedSize(size);
  };

  const handleAddToCart = (
    product: ProductSpec,
    size: SizeOption = 'L',
    colorway: ColorwayOption = 'STEALTH BLACK',
    isBundleDiscounted = false
  ) => {
    const itemKey = `${product.id}-${size}-${colorway}-${
      isBundleDiscounted ? 'bundle' : 'std'
    }`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.key === itemKey);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + 1,
        };
        return copy;
      }
      return [
        ...prev,
        {
          key: itemKey,
          product,
          size,
          colorway,
          quantity: 1,
          isBundleDiscounted,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleDeployBundle = (
    shell: ProductSpec,
    bottom: ProductSpec,
    gear: ProductSpec
  ) => {
    const bundleItems = [shell, bottom, gear];
    setCartItems((prev) => {
      let next = [...prev];
      for (const prod of bundleItems) {
        const sz = selectedSizes[prod.id] || 'L';
        const key = `${prod.id}-${sz}-STEALTH BLACK-bundle`;
        const idx = next.findIndex((i) => i.key === key);
        if (idx > -1) {
          next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        } else {
          next.push({
            key,
            product: prod,
            size: sz,
            colorway: 'STEALTH BLACK',
            quantity: 1,
            isBundleDiscounted: true,
          });
        }
      }
      return next;
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-[#F8FAFC] flex flex-col">
      {/* SECTION 1: Sticky Top System Telemetry Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cartTotals.itemCount}
        cartWeightKg={cartTotals.totalWeightKg}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* SECTION 2: The Flagship Hero */}
        <HeroSection
          currency={currency}
          onAddProduct={(prod) =>
            handleAddToCart(prod, selectedSizes[prod.id] || 'L', 'STEALTH BLACK')
          }
        />

        {/* SECTION 3 & 4: Tyvek Care-Label Seam Divider, Sticky Filter Bar & Modular Loadout Product Grid */}
        <div id="shells-grid" className="scroll-mt-16">
          <TyvekDividerAndFilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <section
            aria-label="Modular Loadout Archive Product Grid"
            className="w-full bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] py-12 lg:py-16"
          >
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono-tech text-xs text-[#00F0FF] tracking-widest block">
                    SECTION 01 // FIELD-READY TECHNICAL GARMENTS
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wider">
                    MODULAR LOADOUT ARCHIVE ({filteredProducts.length} UNITS)
                  </h2>
                </div>
                <div className="font-mono-tech text-xs text-[#94A3B8]">
                  SHOWING: <span className="text-[#F8FAFC] uppercase">{activeCategory}</span> //{' '}
                  <span className="text-[#00F0FF]">{sortBy}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    selectedSize={selectedSizes[product.id] || 'M'}
                    onSelectSize={handleSelectSize}
                    onAddToCart={(prod, sz, col) =>
                      handleAddToCart(prod, sz, col, false)
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION 5: Interactive 3-Layer Fabric Lab */}
        <FabricLabSection />

        {/* SECTION 6: The "Loadout Builder" (Character Inventory Bundle Configurator) */}
        <LoadoutBuilderSection
          currency={currency}
          onDeployBundle={handleDeployBundle}
        />

        {/* SECTION 7: Biometric Fit Calculator */}
        <BiometricFitSection
          onApplySizeToAll={handleApplySizeToAll}
          globalAppliedSize={globalAppliedSize}
        />
      </main>

      {/* SECTION 8: Slide-Out Hardware Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        promoCode={promoCode}
        onApplyPromoCode={setPromoCode}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCartItems([])}
      />

      {/* SECTION 9: The Woven Tyvek Care-Tag Footer */}
      <TyvekFooter />
    </div>
  );
}

