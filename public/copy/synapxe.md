<template slug="synapxe" name="Synapxe">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(synapxe)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Oswald, Manrope, JetBrains_Mono } from "next/font/google";
import "./synapxe/synapxe.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Synapxe — Cyberpunk Technical Apparel",
  description:
    "Cyberpunk Technical Apparel Storefront — Engineered Urban Shell Systems, 3-Layer ePTFE Storm Shells, and Modular Techwear.",
  openGraph: {
    title: "Synapxe — Cyberpunk Technical Apparel",
    description:
      "Cyberpunk Technical Apparel Storefront — Engineered Urban Shell Systems, 3-Layer ePTFE Storm Shells, and Modular Techwear.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090B0E",
  colorScheme: "dark",
};

export default function SynapxeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="knx-body bg-[#090B0E] text-[#F8FAFC] antialiased selection:bg-[#00F0FF]/30 selection:text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/assets.generated.ts">
<![CDATA[// Generated asset inventory for SYNAPXE
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/synapxe";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div
        className={`knx-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="knx-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#090B0E"/>
  <polygon points="12,12 24,12 36,32 24,52 12,52 24,32" fill="#00F0FF"/>
  <polygon points="28,12 40,12 52,32 40,52 28,52 40,32" fill="#FF007F"/>
  <circle cx="52" cy="16" r="3" fill="#D4FF00"/>
</svg>
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#090B0E",
        color: "#F8FAFC",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 32,
          letterSpacing: 4,
          color: "#00F0FF",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#00F0FF",
            color: "#090B0E",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          //
        </div>
        SYNAPXE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: 2,
            color: "#F8FAFC",
          }}
        >
          SYNAPXE // TECHNICAL APPAREL STOREFRONT
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#94A3B8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          3-Layer ePTFE Storm Shells, Ballistic Cordura Exoskeletons & Modular Carry Systems.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(226,232,240,0.14)",
          paddingTop: 24,
          fontSize: 18,
          color: "#94A3B8",
          letterSpacing: 2,
        }}
      >
        <span>DROP 04 // FW-26 ARCHIVE COLLECTION</span>
        <span style={{ color: "#00F0FF" }}>35.6762° N, 139.6503° E</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/page.tsx">
<![CDATA[import SynapxeApp from "./SynapxeApp";

export default function SynapxePage() {
  return <SynapxeApp />;
}
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/synapxe.css">
<![CDATA[@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-knx-obsidian: #090B0E;
  --color-knx-slate: #11161D;
  --color-knx-tyvek: #F1F5F9;
  --color-knx-primary: #F8FAFC;
  --color-knx-muted: #94A3B8;
  --color-knx-cyan: #00F0FF;
  --color-knx-magenta: #FF007F;
  --color-knx-amber: #FF7A00;
  --color-knx-volt: #D4FF00;

  --font-display: var(--font-oswald), sans-serif;
  --font-body: var(--font-manrope), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono-tech: var(--font-jetbrains), monospace;

  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 800ms;
}

:root {
  --bg-obsidian: #090B0E;
  --bg-slate: #11161D;
  --bg-panel: rgba(17, 22, 29, 0.82);
  --tyvek-white: #F1F5F9;
  --text-primary: #F8FAFC;
  --text-muted: #94A3B8;
  --border-hairline: rgba(226, 232, 240, 0.14);

  /* Cyberpunk Lighting & UI Accents */
  --neon-cyan: #00F0FF;
  --neon-magenta: #FF007F;
  --hazard-amber: #FF7A00;
  --acid-volt: #D4FF00;
}

.chamfer-btn {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}

.chamfer-sm {
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
}

.chamfer-card {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
}

/* Optical Shader Modes for Hero */
.shader-optical {
  filter: contrast(1.06) saturate(1.12);
}

.shader-thermal {
  filter: contrast(1.35) saturate(1.6);
}

.shader-uv-lumen {
  filter: contrast(1.45) brightness(0.95) saturate(1.8);
}

/* Colorway Swatch Image Filters */
.swatch-stealth-black {
  filter: contrast(1.04) brightness(0.98) saturate(0.95);
}

.swatch-oxide-slate {
  filter: sepia(0.22) hue-rotate(155deg) saturate(1.35) contrast(1.08) brightness(1.05);
}

.swatch-neon-noir {
  filter: hue-rotate(275deg) saturate(1.85) contrast(1.18) brightness(1.04);
}

/* Custom Range Input for Fabric Lab & Biometric Sliders */
input[type="range"].synapxe-slider {
  -webkit-appearance: none;
  appearance: none;
  background: rgba(226, 232, 240, 0.14);
  height: 6px;
  outline: none;
}

input[type="range"].synapxe-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #00F0FF;
  border: 2px solid #090B0E;
  cursor: pointer;
  clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px));
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.65);
}

input[type="range"].synapxe-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #00F0FF;
  border: 2px solid #090B0E;
  cursor: pointer;
  border-radius: 0;
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.65);
}

/* Tyvek paper noise subtle pattern */
.tyvek-surface {
  background-color: #F1F5F9;
  background-image: 
    linear-gradient(135deg, rgba(15, 23, 42, 0.03) 25%, transparent 25%),
    linear-gradient(225deg, rgba(15, 23, 42, 0.03) 25%, transparent 25%),
    linear-gradient(45deg, rgba(15, 23, 42, 0.02) 25%, transparent 25%),
    linear-gradient(315deg, rgba(15, 23, 42, 0.03) 25%, #F1F5F9 25%);
  background-size: 24px 24px;
}

/* Scenic closing frame: the image stays still while rain passes over it. */
.scenic-footer-image {
  background: linear-gradient(180deg, rgba(9, 11, 14, .8), rgba(9, 11, 14, .18) 48%, rgba(9, 11, 14, .88)), url('/templates/synapxe/footer-scene.webp') center / cover no-repeat;
}
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/SynapxeApp.tsx">
<![CDATA['use client';

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

]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/BiometricFitSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { SizeOption } from '../data/products';
import { calculateBiometricFit, FitPreference } from '../utils/storeLogic';

interface BiometricFitSectionProps {
  onApplySizeToAll: (size: SizeOption) => void;
  globalAppliedSize: SizeOption | null;
}

export const BiometricFitSection: React.FC<BiometricFitSectionProps> = ({
  onApplySizeToAll,
  globalAppliedSize,
}) => {
  const [heightCm, setHeightCm] = useState<number>(182);
  const [massKg, setMassKg] = useState<number>(78);
  const [chestCm, setChestCm] = useState<number>(106);
  const [preference, setPreference] = useState<FitPreference>('ARTICULATED TACTICAL');

  const fitResult = calculateBiometricFit(heightCm, massKg, chestCm, preference);

  return (
    <section
      id="biometric-fit"
      aria-label="Biometric Fit Calculator"
      className="w-full bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] py-16 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-10 border-b border-[rgba(226,232,240,0.14)]">
          <div className="space-y-2">
            <div className="font-mono-tech text-xs text-[#00F0FF] tracking-widest">
              SECTION 04 // ERGONOMIC SHELL CALIBRATION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wider">
              BIOMETRIC FIT CALCULATOR
            </h2>
          </div>
          <p className="font-mono-tech text-xs text-[#94A3B8] max-w-md">
            CALIBRATE ANATOMICAL DIMENSIONS FOR ARTICULATED GUSSET CLEARANCE AND THERMAL LAYERING.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-[rgba(226,232,240,0.14)]">
          {/* Left: Interactive Sliders */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[rgba(226,232,240,0.14)]">
            {/* Height Slider (155cm - 205cm) */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono-tech text-xs">
                <label htmlFor="bio-height-slider" className="text-[#F8FAFC] font-bold">
                  HEIGHT (155CM – 205CM)
                </label>
                <span className="text-[#00F0FF] font-bold">{heightCm} CM</span>
              </div>
              <input
                id="bio-height-slider"
                type="range"
                min={155}
                max={205}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full synapxe-slider"
              />
              <div className="flex justify-between font-mono-tech text-[10px] text-[#94A3B8]">
                <span>155 CM</span>
                <span>180 CM</span>
                <span>205 CM</span>
              </div>
            </div>

            {/* Mass Slider (45kg - 120kg) */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono-tech text-xs">
                <label htmlFor="bio-mass-slider" className="text-[#F8FAFC] font-bold">
                  MASS (45KG – 120KG)
                </label>
                <span className="text-[#00F0FF] font-bold">{massKg} KG</span>
              </div>
              <input
                id="bio-mass-slider"
                type="range"
                min={45}
                max={120}
                value={massKg}
                onChange={(e) => setMassKg(Number(e.target.value))}
                className="w-full synapxe-slider"
              />
              <div className="flex justify-between font-mono-tech text-[10px] text-[#94A3B8]">
                <span>45 KG</span>
                <span>82 KG</span>
                <span>120 KG</span>
              </div>
            </div>

            {/* Chest Expansion Slider (85cm - 125cm) */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono-tech text-xs">
                <label htmlFor="bio-chest-slider" className="text-[#F8FAFC] font-bold">
                  CHEST EXPANSION (85CM – 125CM)
                </label>
                <span className="text-[#00F0FF] font-bold">{chestCm} CM</span>
              </div>
              <input
                id="bio-chest-slider"
                type="range"
                min={85}
                max={125}
                value={chestCm}
                onChange={(e) => setChestCm(Number(e.target.value))}
                className="w-full synapxe-slider"
              />
              <div className="flex justify-between font-mono-tech text-[10px] text-[#94A3B8]">
                <span>85 CM</span>
                <span>105 CM</span>
                <span>125 CM</span>
              </div>
            </div>

            {/* Fit Preference Toggle */}
            <div className="space-y-2 pt-2">
              <span className="block font-mono-tech text-xs text-[#F8FAFC] font-bold">
                FIT PREFERENCE:
              </span>
              <div
                role="group"
                aria-label="Fit Preference"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {(
                  ['ARTICULATED TACTICAL', 'OVERSIZED SHELL'] as FitPreference[]
                ).map((pref) => {
                  const active = preference === pref;
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setPreference(pref)}
                      className={`py-3 px-4 font-mono-tech text-xs border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#00F0FF] text-[#090B0E] border-[#00F0FF] font-bold'
                          : 'bg-[#11161D] text-[#94A3B8] border-[rgba(226,232,240,0.14)] hover:text-[#F8FAFC]'
                      }`}
                    >
                      [{pref}]
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Real-Time Output & Sync Action */}
          <div className="lg:col-span-5 bg-[#11161D]/70 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#94A3B8] border-b border-[rgba(226,232,240,0.14)] pb-3">
                <span>BIOMETRIC OUTPUT MATRIX</span>
                <span className="text-[#D4FF00]">TOLERANCE: ±0.5CM</span>
              </div>

              <div
                data-testid="biometric-output-spec"
                className="bg-[#090B0E] border border-[#00F0FF]/50 p-5 space-y-3"
              >
                <div className="font-mono-tech text-xs text-[#00F0FF]">
                  COMPUTED SHELL ARCHITECTURE:
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wider">
                  SIZE {fitResult.recommendedSize}
                </div>
                <div className="font-mono-tech text-xs sm:text-sm text-[#D4FF00] font-bold">
                  {fitResult.summaryText}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono-tech text-xs">
                <div className="bg-[#090B0E] border border-[rgba(226,232,240,0.14)] p-3">
                  <span className="block text-[10px] text-[#94A3B8]">CHEST SPEC</span>
                  <span className="text-sm font-bold text-[#F8FAFC]">
                    {fitResult.chestSpecCm} CM
                  </span>
                </div>
                <div className="bg-[#090B0E] border border-[rgba(226,232,240,0.14)] p-3">
                  <span className="block text-[10px] text-[#94A3B8]">SLEEVE SPEC</span>
                  <span className="text-sm font-bold text-[#F8FAFC]">
                    {fitResult.sleeveSpecCm} CM
                  </span>
                </div>
                <div className="bg-[#090B0E] border border-[rgba(226,232,240,0.14)] p-3">
                  <span className="block text-[10px] text-[#94A3B8]">INSEAM SPEC</span>
                  <span className="text-sm font-bold text-[#F8FAFC]">
                    {fitResult.inseamSpecCm} CM
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onApplySizeToAll(fitResult.recommendedSize)}
                className="w-full chamfer-btn bg-[#00F0FF] hover:bg-[#D4FF00] text-[#090B0E] font-mono-tech text-xs sm:text-sm font-bold tracking-wider py-3.5 px-5 transition-colors cursor-pointer whitespace-nowrap"
              >
                [APPLY SIZE {fitResult.recommendedSize} TO ALL STORE CARDS]
              </button>
              {globalAppliedSize && (
                <div className="font-mono-tech text-[11px] text-[#00F0FF] text-center">
                  SYNC CONFIRMED // ALL 10 ARCHIVE CARDS CALIBRATED TO SIZE [{globalAppliedSize}]
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/CartDrawer.tsx">
<![CDATA[import React, { useState } from 'react';
import { CurrencyCode } from '../data/products';
import {
  CartItem,
  FREE_SHIPPING_THRESHOLD_USD,
  calculateCartTotals,
  formatPrice,
  generateTrackingHash,
} from '../utils/storeLogic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  promoCode: string;
  onApplyPromoCode: (code: string) => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  promoCode,
  onApplyPromoCode,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [promoInput, setPromoInput] = useState<string>(promoCode);
  const [promoFeedback, setPromoFeedback] = useState<string>('');
  const [orderHash, setOrderHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, promoCode);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoInput.trim().toUpperCase();
    onApplyPromoCode(cleaned);
    if (cleaned === 'CYBER26' || cleaned === 'ARCHIVE10') {
      setPromoFeedback(
        `TERMINAL CONFIRMED // CODE [${cleaned}] ACTIVE (-10% PROTOCOL DISCOUNT)`
      );
    } else {
      setPromoFeedback(
        'ACCESS DENIED // ENTER VALID TERMINAL CODE: CYBER26 OR ARCHIVE10'
      );
    }
  };

  const handleInitiateCheckout = () => {
    if (items.length === 0) return;
    setOrderHash(generateTrackingHash());
  };

  const handleCloseOrderModal = () => {
    setOrderHash(null);
    onClearCart();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hardware Loadout Cart Drawer"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs"
      />

      {/* Slide-out Drawer Panel */}
      <aside className="relative z-10 w-full max-w-lg bg-[#090B0E] border-l border-[rgba(226,232,240,0.2)] h-full flex flex-col justify-between overflow-hidden">
        {/* Drawer Header + Free Orbital Express Shipping Bar */}
        <div className="p-5 border-b border-[rgba(226,232,240,0.14)] space-y-4 bg-[#11161D]">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono-tech text-[10px] text-[#00F0FF] block">
                ENCRYPTED HARDWARE MANIFEST
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F8FAFC] tracking-wider">
                LOADOUT BAG ({totals.itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Cart Drawer"
              className="px-3 py-1.5 bg-[#090B0E] border border-[rgba(226,232,240,0.2)] font-mono-tech text-xs text-[#F8FAFC] hover:border-[#00F0FF] cursor-pointer"
            >
              [CLOSE ×]
            </button>
          </div>

          {/* Free Orbital Express Shipping Progress Bar ($800 USD threshold) */}
          <div className="space-y-1.5 font-mono-tech text-xs">
            <div className="flex justify-between">
              {totals.isFreeShippingUnlocked ? (
                <span className="text-[#D4FF00] font-bold">
                  ORBITAL EXPRESS SHIPPING: UNLOCKED (FREE)
                </span>
              ) : (
                <span className="text-[#94A3B8]">
                  ADD{' '}
                  <strong className="text-[#00F0FF]">
                    {formatPrice(totals.amountToFreeShippingUsd, currency)}
                  </strong>{' '}
                  FOR FREE ORBITAL EXPRESS SHIPPING ({formatPrice(FREE_SHIPPING_THRESHOLD_USD, currency)})
                </span>
              )}
              <span className="text-[#F8FAFC]">{totals.freeShippingProgressPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#090B0E] border border-[rgba(226,232,240,0.14)] overflow-hidden">
              <div
                className="h-full bg-[#00F0FF] transition-all duration-300"
                style={{ width: `${totals.freeShippingProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[rgba(226,232,240,0.14)]">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-mono-tech">
              <div className="text-sm text-[#94A3B8]">
                [MANIFEST EMPTY // NO HARDWARE EQUIPPED]
              </div>
              <p className="text-xs text-[#94A3B8]/70">
                Select garments from the Archive Grid or configure a 3-slot bundle.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const lineWeightGrams = item.product.weightGrams * item.quantity;
              const linePriceUsd = item.product.priceUsd * item.quantity;
              return (
                <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="w-20 h-24 bg-[#11161D] border border-[rgba(226,232,240,0.14)] shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono-tech text-[11px] text-[#00F0FF] font-bold">
                          {item.product.code}
                        </span>
                        {item.isBundleDiscounted && (
                          <span className="ml-2 font-mono-tech text-[10px] text-[#FF007F] font-bold">
                            [-15% BUNDLE]
                          </span>
                        )}
                        <h3 className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                          {item.product.title}
                        </h3>
                      </div>
                      <span className="font-mono-tech text-xs font-bold text-[#D4FF00]">
                        {formatPrice(linePriceUsd, currency)}
                      </span>
                    </div>

                    <div className="font-mono-tech text-[11px] text-[#94A3B8] flex flex-wrap gap-2">
                      <span>SIZE: {item.size}</span>
                      <span>·</span>
                      <span>{item.colorway}</span>
                      <span>·</span>
                      <span>{lineWeightGrams}g</span>
                    </div>

                    {/* Quantity [-] [+] Controls */}
                    <div className="pt-1 flex items-center gap-2 font-mono-tech text-xs">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.product.title}`}
                        onClick={() => onUpdateQuantity(item.key, -1)}
                        className="w-7 h-7 bg-[#11161D] border border-[rgba(226,232,240,0.2)] hover:border-[#00F0FF] text-[#F8FAFC] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-[#F8FAFC] font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.product.title}`}
                        onClick={() => onUpdateQuantity(item.key, 1)}
                        className="w-7 h-7 bg-[#11161D] border border-[rgba(226,232,240,0.2)] hover:border-[#00F0FF] text-[#F8FAFC] cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo Terminal & Checkout Summary */}
        <div className="p-5 bg-[#11161D] border-t border-[rgba(226,232,240,0.14)] space-y-4">
          {/* Promo Code Terminal Input */}
          <form onSubmit={handlePromoSubmit} className="space-y-1.5">
            <label
              htmlFor="promo-terminal-input"
              className="block font-mono-tech text-[11px] text-[#94A3B8]"
            >
              PROMO TERMINAL (TRY <span className="text-[#00F0FF]">CYBER26</span> OR{' '}
              <span className="text-[#00F0FF]">ARCHIVE10</span>):
            </label>
            <div className="flex gap-2">
              <input
                id="promo-terminal-input"
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="ENTER ACCESS CODE..."
                className="flex-1 bg-[#090B0E] border border-[rgba(226,232,240,0.2)] focus:border-[#00F0FF] px-3 py-2 font-mono-tech text-xs text-[#F8FAFC] outline-none uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#090B0E] border border-[#00F0FF]/60 hover:bg-[#00F0FF] hover:text-[#090B0E] font-mono-tech text-xs font-bold text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
              >
                [APPLY]
              </button>
            </div>
            {(promoFeedback || totals.promoValid) && (
              <div
                data-testid="promo-terminal-feedback"
                className={`font-mono-tech text-[11px] ${
                  totals.promoValid ? 'text-[#D4FF00]' : 'text-[#FF7A00]'
                }`}
              >
                {promoFeedback ||
                  `TERMINAL CONFIRMED // CODE [${promoCode}] ACTIVE (-10%)`}
              </div>
            )}
          </form>

          {/* Totals Telemetry */}
          <div className="space-y-1.5 font-mono-tech text-xs border-t border-[rgba(226,232,240,0.14)] pt-3">
            <div className="flex justify-between text-[#94A3B8]">
              <span>TOTAL PAYLOAD MASS</span>
              <span className="text-[#F8FAFC]">{totals.totalWeightKg} KG</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>RAW SUBTOTAL</span>
              <span className="text-[#F8FAFC]">
                {formatPrice(totals.rawSubtotalUsd, currency)}
              </span>
            </div>
            {totals.bundleDiscountUsd > 0 && (
              <div className="flex justify-between text-[#FF007F]">
                <span>15% LOADOUT BUNDLE DISCOUNT</span>
                <span>-{formatPrice(totals.bundleDiscountUsd, currency)}</span>
              </div>
            )}
            {totals.promoDiscountUsd > 0 && (
              <div className="flex justify-between text-[#00F0FF]">
                <span>10% TERMINAL PROMO ({promoCode.toUpperCase()})</span>
                <span>-{formatPrice(totals.promoDiscountUsd, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#D4FF00] pt-2 border-t border-[rgba(226,232,240,0.14)]">
              <span>ENCRYPTED TOTAL</span>
              <span data-testid="cart-final-total">
                {formatPrice(totals.finalTotalUsd, currency)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={handleInitiateCheckout}
            className="w-full chamfer-btn bg-[#00F0FF] hover:bg-[#D4FF00] disabled:opacity-40 text-[#090B0E] font-mono-tech text-xs sm:text-sm font-bold tracking-wider py-3.5 px-5 transition-colors cursor-pointer whitespace-nowrap"
          >
            [INITIATE ENCRYPTED CHECKOUT]
          </button>
        </div>

        {/* Simulated Cryptographic Order Confirmation Modal */}
        {orderHash && (
          <div
            data-testid="checkout-confirmation-modal"
            className="absolute inset-0 z-30 bg-[#090B0E]/96 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center space-y-5"
          >
            <div className="w-12 h-12 border-2 border-[#00F0FF] flex items-center justify-center font-mono-tech text-lg font-bold text-[#00F0FF]">
              ✓
            </div>
            <div className="space-y-1">
              <span className="font-mono-tech text-xs text-[#00F0FF] tracking-widest">
                CRYPTOGRAPHIC DISPATCH AUTHORIZED
              </span>
              <h3 className="font-display text-2xl font-bold text-[#F8FAFC]">
                ORDER CONFIRMED // SECTOR 09
              </h3>
            </div>

            <div className="w-full bg-[#11161D] border border-[#00F0FF]/50 p-4 font-mono-tech text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">TRACKING HASH:</span>
                <span className="text-[#D4FF00] font-bold">{orderHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">PAYLOAD UNITS:</span>
                <span className="text-[#F8FAFC]">{totals.itemCount} UNITS ({totals.totalWeightKg} KG)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">SETTLEMENT AMOUNT:</span>
                <span className="text-[#00F0FF] font-bold">
                  {formatPrice(totals.finalTotalUsd, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">DISPATCH PROTOCOL:</span>
                <span className="text-[#F8FAFC]">ORBITAL EXPRESS // PRIORITY</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseOrderModal}
              className="chamfer-btn bg-[#00F0FF] hover:bg-[#D4FF00] text-[#090B0E] font-mono-tech text-xs font-bold px-6 py-3 cursor-pointer"
            >
              [ACKNOWLEDGE & RETURN TO ARCHIVE]
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/FabricLab3D.tsx">
<![CDATA[import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  FabricFocusLayer,
  FabricWeatherMode,
  getFabricCameraPose,
  getFabricLayerOpacities,
  getFabricSlabGap,
} from '../utils/storeLogic';

interface FabricLab3DProps {
  explodePct: number;
  weatherMode: FabricWeatherMode;
  focusedLayer: FabricFocusLayer;
  onSelectLayer: (layer: FabricFocusLayer) => void;
}

// ============================================================================
// LAYER 01 SHADER: 200D Ballistic Cordura® Basket-Weave + Rain Shockwave Ripples
// ============================================================================
const CORDURA_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec4 uImpacts[8]; // xy = impact xz coords, z = elapsed age (sec), w = strength

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vElevation;
  varying float vShockwave;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 200D Ballistic Cordura interlocking basket-weave heightmap
    float weaveX = sin(pos.x * 28.0);
    float weaveZ = sin(pos.z * 28.0);
    float basketWeave = (weaveX * weaveZ) * 0.022;

    // Ripstop reinforcement cross-grid ribs every ~0.35 units
    float ripX = smoothstep(0.92, 1.0, cos(pos.x * 18.0));
    float ripZ = smoothstep(0.92, 1.0, cos(pos.z * 18.0));
    float ripstopRib = max(ripX, ripZ) * 0.024;

    // Subtle macroscopic textile undulation
    float wave = sin(pos.x * 1.8 + uTime * 1.4) * cos(pos.z * 1.8 + uTime * 1.1) * 0.025;

    // Circular shockwave ripple vertex deformations on raindrop impact
    float shockDisp = 0.0;
    float shockGlow = 0.0;
    for (int i = 0; i < 8; i++) {
      vec4 imp = uImpacts[i];
      if (imp.w > 0.01) {
        float dist = distance(pos.xz, imp.xy);
        float radius = imp.z * 2.1;
        float ringEnv = exp(-pow((dist - radius) * 6.5, 2.0));
        float osc = cos((dist - radius) * 28.0);
        float decay = max(0.0, 1.0 - imp.z * 1.1) * imp.w;
        shockDisp += ringEnv * osc * 0.068 * decay;
        shockGlow += ringEnv * decay;
      }
    }

    float totalY = basketWeave + ripstopRib + wave + shockDisp;
    pos.y += totalY;

    vLocalPos = pos;
    vElevation = totalY;
    vShockwave = clamp(shockGlow, 0.0, 1.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const CORDURA_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vElevation;
  varying float vShockwave;

  void main() {
    // High-frequency ballistic weave yarn strands
    float yarnU = abs(sin(vLocalPos.x * 28.0));
    float yarnV = abs(sin(vLocalPos.z * 28.0));
    float weavePattern = smoothstep(0.15, 0.85, yarnU * yarnV);

    // Ripstop reinforcement grid lines
    float ripX = smoothstep(0.93, 0.99, abs(cos(vLocalPos.x * 18.0)));
    float ripZ = smoothstep(0.93, 0.99, abs(cos(vLocalPos.z * 18.0)));
    float ripGrid = max(ripX, ripZ);

    vec3 obsidianBase = vec3(0.04, 0.07, 0.11);
    vec3 cyanWeave = vec3(0.0, 0.58, 0.72);
    vec3 neonCyan = vec3(0.0, 0.94, 1.0);

    vec3 col = mix(obsidianBase, cyanWeave, weavePattern * 0.55 + 0.12);
    col = mix(col, neonCyan, ripGrid * 0.65);

    // Highlight raised weave crests
    col += neonCyan * clamp(vElevation * 6.0, 0.0, 0.45);

    // Bright expanding circular shockwave ripple rings from rain impacts
    col += vec3(0.45, 0.98, 1.0) * vShockwave * 1.15;

    // Perimeter glowing border highlight
    float edgeX = smoothstep(0.44, 0.5, abs(vUv.x - 0.5));
    float edgeY = smoothstep(0.44, 0.5, abs(vUv.y - 0.5));
    float edgeFactor = max(edgeX, edgeY);
    col = mix(col, neonCyan, edgeFactor * 0.85);

    float alpha = (0.86 + vShockwave * 0.14) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`;

// ============================================================================
// LAYER 02 SHADER: Microporous Black ePTFE Stretched Voronoi Lattice (#FF007F)
// ============================================================================
const EPTFE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Cellular membrane micro-undulation
    float cellWave = sin(pos.x * 14.0 + uTime * 0.8) * cos(pos.z * 14.0 - uTime * 0.7) * 0.014;
    float macroWave = sin(pos.x * 1.6 + uTime * 1.1 + 1.0) * cos(pos.z * 1.6 + uTime * 0.9) * 0.018;
    pos.y += cellWave + macroWave;

    vLocalPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const EPTFE_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;

  vec2 hash2(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
  }

  void main() {
    // Stretched Voronoi cellular lattice (9 billion micropores per sq in)
    vec2 st = vLocalPos.xz * 7.5;
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist1 = 8.0;
    float m_dist2 = 8.0;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash2(i_st + neighbor);
        point = 0.5 + 0.42 * sin(uTime * 0.65 + 6.2831 * point);
        vec2 diff = neighbor + point - f_st;
        float dist = length(diff);
        if (dist < m_dist1) {
          m_dist2 = m_dist1;
          m_dist1 = dist;
        } else if (dist < m_dist2) {
          m_dist2 = dist;
        }
      }
    }

    // Voronoi ridge = stretched ePTFE fibril web; cell center = sub-micron pore throat
    float fibrilEdge = 1.0 - smoothstep(0.0, 0.11, m_dist2 - m_dist1);
    float nodeCore = 1.0 - smoothstep(0.0, 0.22, m_dist1);
    float micropore = smoothstep(0.18, 0.42, m_dist1) * (1.0 - fibrilEdge);

    vec3 darkMembrane = vec3(0.06, 0.02, 0.06);
    vec3 magentaFibril = vec3(1.0, 0.0, 0.5);
    vec3 poreGlow = vec3(1.0, 0.38, 0.72);

    vec3 col = mix(darkMembrane, magentaFibril, fibrilEdge * 0.92);
    col += poreGlow * nodeCore * 0.45;

    // Perimeter edge accent
    float edgeX = smoothstep(0.44, 0.5, abs(vUv.x - 0.5));
    float edgeY = smoothstep(0.44, 0.5, abs(vUv.y - 0.5));
    float edgeFactor = max(edgeX, edgeY);
    col = mix(col, magentaFibril, edgeFactor * 0.9);

    // Micropore throats are semi-translucent so rising vapor particles can be seen passing through
    float baseAlpha = mix(0.92, 0.42, micropore * 0.7);
    gl_FragColor = vec4(col, baseAlpha * uOpacity);
  }
`;

// ============================================================================
// LAYER 03 SHADER: Tricot Micro-Grid Hexagonal Thermal Fleece Baffle (#FF7A00)
// ============================================================================
const TRICOT_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vHexHeight;

  // Hexagonal distance helper
  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.7320508))), p.x);
  }

  vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, 1.7320508);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    float d = 0.5 - hexDist(gv);
    return vec4(gv.x, gv.y, d, 0.0);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 3D Hexagonal thermal fleece baffle pillows with recessed wicking channels
    vec4 hc = hexCoords(pos.xz * 4.8);
    float bafflePillow = smoothstep(0.04, 0.22, hc.z);
    float displacement = bafflePillow * 0.045;

    pos.y += displacement + sin(pos.x * 1.5 + uTime * 1.0) * 0.015;
    vLocalPos = pos;
    vHexHeight = bafflePillow;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const TRICOT_FRAGMENT_SHADER = /* glsl */ `
  uniform float uOpacity;
  uniform float uTime;
  uniform float uThermalBoost; // Boosted in Sub-Zero Gale & Vapor Purge modes

  varying vec2 vUv;
  varying vec3 vLocalPos;
  varying float vHexHeight;

  void main() {
    // Recessed wicking channels (vHexHeight near 0) vs raised thermal fleece pillows (vHexHeight near 1)
    float channelMask = 1.0 - vHexHeight;

    // Radial thermal core warmth from center of slab
    float radialDist = length(vLocalPos.xz);
    float coreHeat = smoothstep(1.85, 0.0, radialDist) * (0.45 + 0.55 * uThermalBoost);
    float pulse = 0.88 + 0.12 * sin(uTime * 3.0 - radialDist * 2.5);

    vec3 darkBaffle = vec3(0.09, 0.05, 0.02);
    vec3 amberChannel = vec3(1.0, 0.48, 0.0);
    vec3 hotCore = vec3(1.0, 0.72, 0.18);

    // Wicking channels glow bright Hazard Amber (#FF7A00); raised baffles retain warm thermal core
    vec3 col = mix(darkBaffle, amberChannel * 0.65, vHexHeight * 0.55);
    col = mix(col, amberChannel, channelMask * 0.88);
    col += hotCore * coreHeat * pulse * 0.48;

    // Perimeter border highlight
    float edgeX = smoothstep(0.44, 0.5, abs(vUv.x - 0.5));
    float edgeY = smoothstep(0.44, 0.5, abs(vUv.y - 0.5));
    float edgeFactor = max(edgeX, edgeY);
    col = mix(col, amberChannel, edgeFactor * 0.9);

    gl_FragColor = vec4(col, 0.90 * uOpacity);
  }
`;

/**
 * Helper to create a 3D extruded slab skirt/frame around each 2.85 x 2.85 textile plane
 * so every layer has unmistakable physical cross-section thickness.
 */
function createSlabSkirtGroup(accentHex: string): {
  group: THREE.Group;
  wallMat: THREE.MeshBasicMaterial;
  edgeMat: THREE.LineBasicMaterial;
} {
  const group = new THREE.Group();
  const size = 2.85;
  const thickness = 0.09;

  // Hollow perimeter skirt walls (4 side strips around the slab)
  const boxGeo = new THREE.BoxGeometry(size, thickness, size);
  const edgesGeo = new THREE.EdgesGeometry(boxGeo);
  const edgeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const wireframe = new THREE.LineSegments(edgesGeo, edgeMat);
  wireframe.position.y = -thickness * 0.45;
  group.add(wireframe);

  const wallMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // 4 thin side faces for extruded cross-section thickness
  const sideGeoX = new THREE.PlaneGeometry(size, thickness);
  const frontWall = new THREE.Mesh(sideGeoX, wallMat);
  frontWall.position.set(0, -thickness * 0.45, size * 0.5);
  group.add(frontWall);

  const backWall = new THREE.Mesh(sideGeoX, wallMat);
  backWall.position.set(0, -thickness * 0.45, -size * 0.5);
  group.add(backWall);

  const sideGeoZ = new THREE.PlaneGeometry(size, thickness);
  sideGeoZ.rotateY(Math.PI / 2);
  const leftWall = new THREE.Mesh(sideGeoZ, wallMat);
  leftWall.position.set(-size * 0.5, -thickness * 0.45, 0);
  group.add(leftWall);

  const rightWall = new THREE.Mesh(sideGeoZ, wallMat);
  rightWall.position.set(size * 0.5, -thickness * 0.45, 0);
  group.add(rightWall);

  return { group, wallMat, edgeMat };
}

/**
 * Creates a crisp 3D floating layer callout badge attached to the right edge of each slab
 */
function createLayerBadgeMesh(
  label: string,
  sublabel: string,
  accentHex: string
): { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial } {
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 72;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(9, 11, 14, 0.92)';
  ctx.fillRect(0, 0, 320, 72);

  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 317, 69);

  ctx.fillStyle = accentHex;
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText(label, 14, 30);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '15px "JetBrains Mono", monospace';
  ctx.fillText(sublabel, 14, 54);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;

  const geo = new THREE.PlaneGeometry(0.86, 0.19);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(1.18, 0.13, 0.92);
  mesh.rotation.y = 0.52;
  return { mesh, mat };
}

interface RainParticleState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  bounced: boolean;
  scale: number;
}

interface VaporParticleState {
  x: number;
  y: number;
  z: number;
  vy: number;
  phase: number;
  scale: number;
}

interface WindStreakState {
  x: number;
  y: number;
  z: number;
  speed: number;
  phase: number;
}

export const FabricLab3D: React.FC<FabricLab3DProps> = ({
  explodePct,
  weatherMode,
  focusedLayer,
  onSelectLayer,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Synchronize React props into the Three.js render loop via refs
  const explodePctRef = useRef<number>(explodePct);
  const weatherModeRef = useRef<FabricWeatherMode>(weatherMode);
  const focusedLayerRef = useRef<FabricFocusLayer>(focusedLayer);
  const onSelectLayerRef = useRef(onSelectLayer);
  onSelectLayerRef.current = onSelectLayer;

  const initPose = getFabricCameraPose(focusedLayer, explodePct);
  const cameraLockRef = useRef<{
    goalPos: THREE.Vector3;
    goalTarget: THREE.Vector3;
    autoLocked: boolean;
  }>({
    goalPos: new THREE.Vector3(...initPose.position),
    goalTarget: new THREE.Vector3(...initPose.target),
    autoLocked: true,
  });

  useEffect(() => {
    explodePctRef.current = explodePct;
    const pose = getFabricCameraPose(focusedLayerRef.current, explodePct);
    cameraLockRef.current.goalPos.set(...pose.position);
    cameraLockRef.current.goalTarget.set(...pose.target);
    cameraLockRef.current.autoLocked = true;
  }, [explodePct]);

  useEffect(() => {
    weatherModeRef.current = weatherMode;
  }, [weatherMode]);

  useEffect(() => {
    focusedLayerRef.current = focusedLayer;
    const pose = getFabricCameraPose(focusedLayer, explodePctRef.current);
    cameraLockRef.current.goalPos.set(...pose.position);
    cameraLockRef.current.goalTarget.set(...pose.target);
    cameraLockRef.current.autoLocked = true;
  }, [focusedLayer]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL (SwiftShader / llvmpipe) per threejs skill guidelines
    const probe = document.createElement('canvas').getContext('webgl');
    const dbg = probe?.getExtension('WEBGL_debug_renderer_info');
    const isSoftwareGl = Boolean(
      dbg &&
        /swiftshader|llvmpipe|softpipe/i.test(
          String(probe!.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
        )
    );

    const width = container.clientWidth || 680;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const startPose = getFabricCameraPose(focusedLayerRef.current, explodePctRef.current);
    camera.position.set(...startPose.position);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 1.35;
    controls.maxDistance = 6.2;
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.85;

    const onControlStart = () => {
      cameraLockRef.current.autoLocked = false;
    };
    controls.addEventListener('start', onControlStart);

    // Subtle background volumetric calibration grid + vertical axis guide pillars
    const pillarPositions: number[] = [
      -1.425, -1.35, -1.425, -1.425, 1.35, -1.425,
      1.425, -1.35, -1.425, 1.425, 1.35, -1.425,
      -1.425, -1.35, 1.425, -1.425, 1.35, 1.425,
      1.425, -1.35, 1.425, 1.425, 1.35, 1.425,
    ];
    const pillarGeo = new THREE.BufferGeometry();
    pillarGeo.setAttribute('position', new THREE.Float32BufferAttribute(pillarPositions, 3));
    const pillarMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(pillarGeo, pillarMat));

    // Shared 128x128 high-density plane geometry rotated flat onto X-Z plane
    const slabGeo = new THREE.PlaneGeometry(2.85, 2.85, 128, 128);
    slabGeo.rotateX(-Math.PI / 2);

    // Circular buffer of 8 raindrop impact shockwaves on Layer 01
    const impactsArray = Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, 10, 0));
    let nextImpactIdx = 0;

    // ------------------------------------------------------------------------
    // SLAB 01: OUTER SHIELD (200D Ballistic Cordura — #00F0FF)
    // ------------------------------------------------------------------------
    const layer1Group = new THREE.Group();
    const corduraMat = new THREE.ShaderMaterial({
      vertexShader: CORDURA_VERTEX_SHADER,
      fragmentShader: CORDURA_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
        uImpacts: { value: impactsArray },
      },
    });
    const layer1Mesh = new THREE.Mesh(slabGeo, corduraMat);
    layer1Mesh.userData.layerIndex = 1;
    layer1Mesh.renderOrder = 3;
    layer1Group.add(layer1Mesh);

    const skirt1 = createSlabSkirtGroup('#00F0FF');
    layer1Group.add(skirt1.group);

    const badge1 = createLayerBadgeMesh('L01 // 200D CORDURA®', 'BARRIER: 28,000MM', '#00F0FF');
    layer1Group.add(badge1.mesh);
    scene.add(layer1Group);

    // ------------------------------------------------------------------------
    // SLAB 02: CORE MEMBRANE (Microporous Black ePTFE — #FF007F)
    // ------------------------------------------------------------------------
    const layer2Group = new THREE.Group();
    const eptfeMat = new THREE.ShaderMaterial({
      vertexShader: EPTFE_VERTEX_SHADER,
      fragmentShader: EPTFE_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
      },
    });
    const layer2Mesh = new THREE.Mesh(slabGeo, eptfeMat);
    layer2Mesh.userData.layerIndex = 2;
    layer2Mesh.renderOrder = 2;
    layer2Group.add(layer2Mesh);

    const skirt2 = createSlabSkirtGroup('#FF007F');
    layer2Group.add(skirt2.group);

    const badge2 = createLayerBadgeMesh('L02 // ePTFE MEMBRANE', '9B PORES / SQ IN', '#FF007F');
    layer2Group.add(badge2.mesh);
    scene.add(layer2Group);

    // ------------------------------------------------------------------------
    // SLAB 03: INNER MATRIX (Tricot Micro-Grid Backing — #FF7A00)
    // ------------------------------------------------------------------------
    const layer3Group = new THREE.Group();
    const tricotMat = new THREE.ShaderMaterial({
      vertexShader: TRICOT_VERTEX_SHADER,
      fragmentShader: TRICOT_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 },
        uThermalBoost: { value: 0.3 },
      },
    });
    const layer3Mesh = new THREE.Mesh(slabGeo, tricotMat);
    layer3Mesh.userData.layerIndex = 3;
    layer3Mesh.renderOrder = 1;
    layer3Group.add(layer3Mesh);

    const skirt3 = createSlabSkirtGroup('#FF7A00');
    layer3Group.add(skirt3.group);

    const badge3 = createLayerBadgeMesh('L03 // TRICOT MATRIX', 'RET < 4.5 VAPOR FLUX', '#FF7A00');
    layer3Group.add(badge3.mesh);
    scene.add(layer3Group);

    const initialGap = getFabricSlabGap(explodePctRef.current);
    layer1Group.position.y = initialGap;
    layer2Group.position.y = 0;
    layer3Group.position.y = -initialGap;

    // ========================================================================
    // REAL-TIME PARTICLE PHYSICS:
    // 1) Cyan Rain Droplets + Bouncing Micro-Droplets (Mode 01 Typhoon)
    // 2) Horizontal Cyan Wind-Stream Ribbons (Mode 02 Sub-Zero Gale)
    // 3) Rising Hazard Amber Sweat-Vapor Molecules (Mode 03 Vapor Purge & Baseline)
    // ========================================================================
    const RAIN_COUNT = 56;
    const rainGeo = new THREE.SphereGeometry(0.036, 10, 10);
    const rainMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.92,
    });
    const rainInstanced = new THREE.InstancedMesh(rainGeo, rainMat, RAIN_COUNT);
    scene.add(rainInstanced);

    const rainStates: RainParticleState[] = Array.from({ length: RAIN_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.35,
      y: 0.8 + (i / RAIN_COUNT) * 1.9,
      z: (Math.random() - 0.5) * 2.35,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -(2.1 + Math.random() * 0.9),
      vz: (Math.random() - 0.5) * 0.08,
      bounced: false,
      scale: 1.0,
    }));

    // Expanding 3D surface shockwave rings on Layer 01
    const shockRings: THREE.Mesh[] = [];
    const ringGeo = new THREE.RingGeometry(0.08, 0.125, 32);
    ringGeo.rotateX(-Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const rMesh = new THREE.Mesh(ringGeo, rMat);
      scene.add(rMesh);
      shockRings.push(rMesh);
    }

    // Rising Hazard Amber Sweat-Vapor Molecules (#FF7A00)
    const VAPOR_COUNT = 78;
    const vaporGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const vaporMat = new THREE.MeshBasicMaterial({
      color: 0xff7a00,
      transparent: true,
      opacity: 0.88,
    });
    const vaporInstanced = new THREE.InstancedMesh(vaporGeo, vaporMat, VAPOR_COUNT);
    scene.add(vaporInstanced);

    const vaporStates: VaporParticleState[] = Array.from({ length: VAPOR_COUNT }, (_, i) => ({
      x: (Math.random() - 0.5) * 2.3,
      y: -1.6 + (i / VAPOR_COUNT) * 3.2,
      z: (Math.random() - 0.5) * 2.3,
      vy: 0.65 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      scale: 0.75 + Math.random() * 0.45,
    }));

    // Horizontal Sub-Zero Gale Wind-Stream Ribbons (Mode 02)
    const WIND_RIBBON_COUNT = 18;
    const windGroup = new THREE.Group();
    const windLines: { line: THREE.Line; state: WindStreakState }[] = [];
    for (let i = 0; i < WIND_RIBBON_COUNT; i++) {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j < 24; j++) {
        pts.push(new THREE.Vector3(0, 0, 0));
      }
      const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lMat = new THREE.LineBasicMaterial({
        color: i % 3 === 0 ? 0xf8fafc : 0x00f0ff,
        transparent: true,
        opacity: 0.85,
      });
      const line = new THREE.Line(lGeo, lMat);
      windGroup.add(line);
      windLines.push({
        line,
        state: {
          x: -2.2 + Math.random() * 4.4,
          y: 0.08 + (i % 5) * 0.06,
          z: -1.25 + (i / (WIND_RIBBON_COUNT - 1)) * 2.5,
          speed: 3.2 + Math.random() * 1.4,
          phase: i * 0.7,
        },
      });
    }
    scene.add(windGroup);

    // Raycasting so clicking a 3D slab in the viewport also focuses that layer
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pickableSlabs = [layer1Mesh, layer2Mesh, layer3Mesh];
    let downPos = { x: 0, y: 0 };

    const onPointerDown = (ev: PointerEvent) => {
      downPos = { x: ev.clientX, y: ev.clientY };
    };

    const onPointerUp = (ev: PointerEvent) => {
      if (Math.hypot(ev.clientX - downPos.x, ev.clientY - downPos.y) > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableSlabs, false);
      const hitLayer = hits[0]?.object?.userData?.layerIndex as 1 | 2 | 3 | undefined;
      if (hitLayer) {
        onSelectLayerRef.current(
          focusedLayerRef.current === hitLayer ? null : hitLayer
        );
      }
    };

    const onDoubleClick = () => {
      onSelectLayerRef.current(null);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(280, entry.contentRect.width);
        const h = Math.max(340, entry.contentRect.height);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause WebGL loop when Section 02 is scrolled off-screen
    let isInViewport = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isInViewport = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Software WebGL frame-pacing helper per threejs skill
    const gl = renderer.getContext() as WebGL2RenderingContext;
    const afterDraw = (cb: () => void) => {
      if (typeof gl.fenceSync !== 'function') {
        setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)!;
      gl.flush();
      const poll = () => {
        const s = gl.clientWaitSync(sync, 0, 0);
        if (s === gl.ALREADY_SIGNALED || s === gl.CONDITION_SATISFIED) {
          gl.deleteSync(sync);
          setTimeout(cb, 80);
        } else {
          setTimeout(poll, 16);
        }
      };
      setTimeout(poll, 16);
    };

    const dummy = new THREE.Object3D();
    let prevTimeMs = performance.now();
    let stopped = false;
    let rafId = 0;

    const tick = () => {
      if (stopped) return;

      if (isInViewport) {
        const nowMs = performance.now();
        const dt = Math.min(0.05, Math.max(0.008, (nowMs - prevTimeMs) * 0.001));
        prevTimeMs = nowMs;
        const elapsedSec = nowMs * 0.001;

        const mode = weatherModeRef.current;
        const focus = focusedLayerRef.current;
        const targetGap = getFabricSlabGap(explodePctRef.current);

        // Smoothly lerp vertical slab positions (+/- targetGap)
        layer1Group.position.y = THREE.MathUtils.lerp(layer1Group.position.y, targetGap, 0.12);
        layer2Group.position.y = 0;
        layer3Group.position.y = THREE.MathUtils.lerp(layer3Group.position.y, -targetGap, 0.12);

        const currentGap = layer1Group.position.y;

        // Smoothly lerp layer opacities (dim non-focused slabs to 15% opacity)
        const [targetOp1, targetOp2, targetOp3] = getFabricLayerOpacities(focus);
        corduraMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          corduraMat.uniforms.uOpacity.value,
          targetOp1,
          0.12
        );
        eptfeMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          eptfeMat.uniforms.uOpacity.value,
          targetOp2,
          0.12
        );
        tricotMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          tricotMat.uniforms.uOpacity.value,
          targetOp3,
          0.12
        );

        const op1 = corduraMat.uniforms.uOpacity.value;
        const op2 = eptfeMat.uniforms.uOpacity.value;
        const op3 = tricotMat.uniforms.uOpacity.value;

        skirt1.edgeMat.opacity = op1 * 0.85;
        skirt1.wallMat.opacity = op1 * 0.18;
        badge1.mat.opacity = op1;

        skirt2.edgeMat.opacity = op2 * 0.85;
        skirt2.wallMat.opacity = op2 * 0.18;
        badge2.mat.opacity = op2;

        skirt3.edgeMat.opacity = op3 * 0.85;
        skirt3.wallMat.opacity = op3 * 0.18;
        badge3.mat.opacity = op3;

        // Update shader time & thermal core boost
        corduraMat.uniforms.uTime.value = elapsedSec;
        eptfeMat.uniforms.uTime.value = elapsedSec;
        tricotMat.uniforms.uTime.value = elapsedSec;
        tricotMat.uniforms.uThermalBoost.value = THREE.MathUtils.lerp(
          tricotMat.uniforms.uThermalBoost.value,
          mode === 'GALE' || mode === 'VAPOR' ? 1.0 : 0.35,
          0.08
        );

        // Advance shockwave impact timers & update 3D shockRings on Layer 01
        for (let i = 0; i < 8; i++) {
          const imp = impactsArray[i];
          const ringMesh = shockRings[i];
          const ringMat = ringMesh.material as THREE.MeshBasicMaterial;
          if (imp.w > 0.01) {
            imp.z += dt;
            if (imp.z > 0.9) {
              imp.w = 0.0;
              ringMat.opacity = 0;
            } else {
              const progress = imp.z / 0.9;
              const ringScale = 0.35 + progress * 2.6;
              ringMesh.position.set(imp.x, currentGap + 0.03, imp.y);
              ringMesh.scale.set(ringScale, 1, ringScale);
              ringMat.opacity = (1.0 - progress) * 0.78 * op1;
            }
          } else {
            ringMat.opacity = 0;
          }
        }

        // --------------------------------------------------------------------
        // UPDATE RAIN PARTICLES (Active in TYPHOON mode & macro L02 inspection)
        // --------------------------------------------------------------------
        const showRain = mode === 'TYPHOON' || focus === 2;
        rainInstanced.visible = showRain;
        if (showRain) {
          const surfaceY = currentGap + 0.04;
          for (let i = 0; i < RAIN_COUNT; i++) {
            const r = rainStates[i];
            r.x += r.vx * dt;
            r.y += r.vy * dt;
            r.z += r.vz * dt;

            if (!r.bounced && r.y <= surfaceY) {
              // Strike Layer 01: register shockwave ripple & shatter into bouncing micro-droplet
              r.y = surfaceY + 0.01;
              r.bounced = true;
              const angle = Math.random() * Math.PI * 2;
              const outSpeed = 0.85 + Math.random() * 0.95;
              r.vx = Math.cos(angle) * outSpeed;
              r.vz = Math.sin(angle) * outSpeed;
              r.vy = 0.95 + Math.random() * 0.75;
              r.scale = 0.62;

              // Trigger expanding circular shockwave ripple on Layer 01
              impactsArray[nextImpactIdx].set(r.x, r.z, 0.0, 1.0);
              nextImpactIdx = (nextImpactIdx + 1) % 8;
            } else if (r.bounced) {
              // Gravity pulls bounced micro-droplet back toward Layer 01 to roll off the edge
              r.vy -= 3.2 * dt;
              if (r.y < surfaceY) {
                r.y = surfaceY + 0.008;
                r.vy = Math.abs(r.vy) * 0.35;
              }
              // Reset once it rolls off the slab perimeter or after bounce decay
              if (Math.abs(r.x) > 1.48 || Math.abs(r.z) > 1.48 || r.vy < 0.05) {
                r.x = (Math.random() - 0.5) * 2.35;
                r.z = (Math.random() - 0.5) * 2.35;
                r.y = surfaceY + 1.1 + Math.random() * 1.1;
                r.vx = (Math.random() - 0.5) * 0.08;
                r.vz = (Math.random() - 0.5) * 0.08;
                r.vy = -(2.2 + Math.random() * 0.9);
                r.bounced = false;
                r.scale = 1.0;
              }
            }

            dummy.position.set(r.x, r.y, r.z);
            // Elongate falling rain droplets vertically; keep bounced droplets spherical
            dummy.scale.set(
              r.scale,
              r.bounced ? r.scale : r.scale * 2.1,
              r.scale
            );
            dummy.updateMatrix();
            rainInstanced.setMatrixAt(i, dummy.matrix);
          }
          rainInstanced.instanceMatrix.needsUpdate = true;
        }

        // --------------------------------------------------------------------
        // UPDATE HORIZONTAL SUB-ZERO GALE WIND RIBBONS (Mode 02)
        // --------------------------------------------------------------------
        windGroup.visible = mode === 'GALE';
        if (mode === 'GALE') {
          const surfaceY = currentGap + 0.05;
          for (let i = 0; i < windLines.length; i++) {
            const { line, state } = windLines[i];
            state.x += state.speed * dt;
            if (state.x > 1.8) {
              state.x = -2.4;
            }
            const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
            for (let j = 0; j < 24; j++) {
              const segX = state.x - j * 0.065;
              // Deflect wind ribbon sharply upward as it crosses over Layer 01's leading edge
              const overSlab = THREE.MathUtils.smoothstep(segX, -1.45, 0.35);
              const deflectArc =
                overSlab * (0.28 + 0.12 * Math.sin(segX * 3.0 + elapsedSec * 6.0));
              const segY =
                surfaceY +
                state.y +
                deflectArc +
                Math.sin(segX * 4.5 + state.phase + elapsedSec * 5.0) * 0.025;
              const segZ =
                state.z + Math.cos(segX * 3.2 + state.phase) * 0.04;
              posAttr.setXYZ(j, segX, segY, segZ);
            }
            posAttr.needsUpdate = true;
          }
        }

        // --------------------------------------------------------------------
        // UPDATE RISING SWEAT-VAPOR MOLECULES (Accelerated in Mode 03 VAPOR)
        // --------------------------------------------------------------------
        const vaporSpeedMult = mode === 'VAPOR' ? 2.45 : mode === 'GALE' ? 0.85 : 1.15;
        const bottomBound = -currentGap - 0.65;
        const topBound = currentGap + 0.85;

        for (let i = 0; i < VAPOR_COUNT; i++) {
          const v = vaporStates[i];
          v.y += v.vy * vaporSpeedMult * dt;
          if (v.y > topBound) {
            v.y = bottomBound;
            v.x = (Math.random() - 0.5) * 2.25;
            v.z = (Math.random() - 0.5) * 2.25;
          }
          const swayX = v.x + Math.sin(elapsedSec * 2.4 + v.phase + v.y * 2.0) * 0.05;
          const swayZ = v.z + Math.cos(elapsedSec * 2.2 + v.phase + v.y * 2.0) * 0.05;
          dummy.position.set(swayX, v.y, swayZ);
          const s = mode === 'VAPOR' ? v.scale * 1.18 : v.scale * 0.85;
          dummy.scale.set(s, s, s);
          dummy.updateMatrix();
          vaporInstanced.setMatrixAt(i, dummy.matrix);
        }
        vaporInstanced.instanceMatrix.needsUpdate = true;

        // --------------------------------------------------------------------
        // SMOOTH CAMERA CHOREOGRAPHY LERP
        // --------------------------------------------------------------------
        if (cameraLockRef.current.autoLocked) {
          const aspectFactor = Math.max(1.0, 1.18 / Math.max(0.75, camera.aspect));
          const goalPos = cameraLockRef.current.goalPos;
          const goalTarget = cameraLockRef.current.goalTarget;
          camera.position.x = THREE.MathUtils.lerp(
            camera.position.x,
            goalPos.x * aspectFactor,
            0.08
          );
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, goalPos.y, 0.08);
          camera.position.z = THREE.MathUtils.lerp(
            camera.position.z,
            goalPos.z * aspectFactor,
            0.08
          );
          controls.target.lerp(goalTarget, 0.09);
        }

        controls.update();
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(() => {
          if (!stopped) rafId = requestAnimationFrame(tick);
        });
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('dblclick', onDoubleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] bg-[#090B0E] overflow-hidden select-none">
      {/* Subtle Radial Chamber Depth Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.07) 0%, rgba(9, 11, 14, 0.0) 70%)',
        }}
      />

      {/* Dedicated Empty Container for Three.js WebGLRenderer */}
      <div
        ref={mountRef}
        data-testid="fabric-lab-3d-container"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Three.js 3D Microscopic Fabric Cross-Section and Weather Stress-Test Chamber"
      />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/FabricLabSection.tsx">
<![CDATA[import React, { useState } from 'react';
import {
  FabricFocusLayer,
  FabricWeatherMode,
  getFabricCameraPose,
  getFabricSlabGap,
} from '../utils/storeLogic';
import { FabricLab3D } from './FabricLab3D';

export const FabricLabSection: React.FC = () => {
  const [explodePct, setExplodePct] = useState<number>(65);
  const [weatherMode, setWeatherMode] = useState<FabricWeatherMode>('TYPHOON');
  const [lockedLayer, setLockedLayer] = useState<FabricFocusLayer>(null);
  const [hoveredLayer, setHoveredLayer] = useState<FabricFocusLayer>(null);

  const effectiveFocus: FabricFocusLayer = hoveredLayer ?? lockedLayer;
  const cameraPose = getFabricCameraPose(effectiveFocus, explodePct);
  const currentSlabGap = getFabricSlabGap(explodePct);

  const weatherModes: {
    id: FabricWeatherMode;
    label: string;
    accent: string;
    telemetry: string;
  }[] = [
    {
      id: 'TYPHOON',
      label: '[MODE 01 // TYPHOON DOWNPOUR — 28,000MM]',
      accent: '#00F0FF',
      telemetry: 'HYDROSTATIC IMPACT RIPPLES // ZERO PENETRATION PAST L01',
    },
    {
      id: 'GALE',
      label: '[MODE 02 // SUB-ZERO GALE — -20°C]',
      accent: '#D4FF00',
      telemetry: 'AERODYNAMIC WIND DEFLECTION // 37.0°C THERMAL CORE RETAINED',
    },
    {
      id: 'VAPOR',
      label: '[MODE 03 // HIGH-EXERTION VAPOR PURGE]',
      accent: '#FF7A00',
      telemetry: 'OUTWARD SWEAT-VAPOR FLUX // RET < 4.5 PERMEABILITY',
    },
  ];

  const layers = [
    {
      index: 1 as const,
      code: 'LAYER 01 // OUTER SHIELD',
      title: '200D Ballistic Cordura® + DWR Fluorocarbon-Free Coating',
      desc: 'Deflects external torrential rain, sleet, and high-velocity wind shear while resisting abrasion.',
      accent: '#00F0FF',
      metric: 'HYDROSTATIC BARRIER: 28,000MM',
      microSpec: '128×128 RIPSTOP BASKET-WEAVE // SHOCKWAVE DEFLECTION',
    },
    {
      index: 2 as const,
      code: 'LAYER 02 // CORE MEMBRANE',
      title: 'Microporous Black ePTFE Hydrophobic Membrane',
      desc: '9 billion microscopic pores per square inch: 20,000x smaller than a water drop, 700x larger than a sweat vapor molecule.',
      accent: '#FF007F',
      metric: 'PORE DENSITY: 9.0 × 10⁹ / IN²',
      microSpec: 'STRETCHED VORONOI CELLULAR LATTICE // 5000X MACRO VIEW',
    },
    {
      index: 3 as const,
      code: 'LAYER 03 // INNER MATRIX',
      title: 'Tricot Micro-Grid Thermal & Moisture Wicking Backing',
      desc: 'Channels internal body heat and perspiration vapor outward through the ePTFE core without conductive heat loss.',
      accent: '#FF7A00',
      metric: 'VAPOR RESISTANCE: RET < 4.5',
      microSpec: '3D HEXAGONAL THERMAL FLEECE BAFFLES // WICKING CHANNELS',
    },
  ];

  const activeWeatherObj =
    weatherModes.find((m) => m.id === weatherMode) ?? weatherModes[0];

  return (
    <section
      id="fabric-lab"
      aria-label="Interactive 3-Layer Fabric Lab"
      className="w-full bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] py-16 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Section Header + Explode Slider */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[rgba(226,232,240,0.14)]">
          <div className="space-y-2">
            <div className="font-mono-tech text-xs text-[#00F0FF] tracking-widest">
              SECTION 02 // MATERIAL SCIENCE & HYDROPHOBIC TELEMETRY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wider">
              INTERACTIVE 3-LAYER FABRIC LAB
            </h2>
          </div>

          {/* Interactive Range Slider */}
          <div className="w-full lg:w-[460px] bg-[#11161D] border border-[rgba(226,232,240,0.14)] p-4">
            <div className="flex items-center justify-between font-mono-tech text-xs mb-2">
              <label htmlFor="explode-membrane-slider" className="text-[#F8FAFC] font-bold">
                [EXPLODE MEMBRANE LAYERS: 0% — 100%]
              </label>
              <span className="text-[#00F0FF] font-bold">
                {explodePct}% ({currentSlabGap.toFixed(2)}U GAP)
              </span>
            </div>
            <input
              id="explode-membrane-slider"
              type="range"
              min={0}
              max={100}
              value={explodePct}
              onChange={(e) => setExplodePct(Number(e.target.value))}
              className="w-full synapxe-slider"
            />
            <div className="flex justify-between font-mono-tech text-[10px] text-[#94A3B8] mt-1.5">
              <span>0% LAMINATED SEAL</span>
              <span>65% NOMINAL (0.60U)</span>
              <span>100% FULL EXPLODED CAD</span>
            </div>
          </div>
        </div>

        {/* Environmental Stress-Test Control Bar */}
        <div
          data-testid="fabric-weather-control-bar"
          className="bg-[#11161D] border-x border-b border-[rgba(226,232,240,0.14)] p-3 sm:px-5 sm:py-3.5 space-y-2.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px]">
            <span className="text-[#94A3B8] uppercase tracking-wider">
              ENVIRONMENTAL STRESS-TEST CHAMBER // SELECT SIMULATION MODE
            </span>
            <div className="flex items-center gap-3">
              <span
                data-testid="fabric-weather-telemetry"
                className="text-[#F8FAFC] truncate"
              >
                {activeWeatherObj.telemetry}
              </span>
              {effectiveFocus !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setLockedLayer(null);
                    setHoveredLayer(null);
                  }}
                  className="px-2.5 py-1 bg-[#00F0FF] text-[#090B0E] font-bold cursor-pointer whitespace-nowrap"
                >
                  [RESET FULL STACK]
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {weatherModes.map((mode) => {
              const active = weatherMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setWeatherMode(mode.id)}
                  className={`font-mono-tech text-[11px] px-3 py-2.5 border text-left transition-colors cursor-pointer truncate ${
                    active
                      ? 'bg-[#090B0E] text-[#F8FAFC] font-bold'
                      : 'bg-[#090B0E]/60 text-[#94A3B8] border-[rgba(226,232,240,0.14)] hover:text-[#F8FAFC]'
                  }`}
                  style={
                    active
                      ? {
                          borderColor: mode.accent,
                          color: mode.accent,
                        }
                      : undefined
                  }
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column 3D Microscopic Cross-Section + Synchronized Layer Spec Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-[rgba(226,232,240,0.14)]">
          {/* Left: Three.js WebGL 3D Microscopic Fabric Cross-Section & Weather Chamber */}
          <div className="lg:col-span-7 relative bg-[#090B0E] border-b lg:border-b-0 lg:border-r border-[rgba(226,232,240,0.14)]">
            {/* Top HUD Readout Overlay (Solid Dark Background, No Backdrop-Filter) */}
            <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px]">
              <div className="bg-[#090B0E]/92 border border-[#00F0FF]/40 px-2.5 py-1.5 text-[#00F0FF]">
                <span data-testid="fabric-camera-readout">{cameraPose.readout}</span>
              </div>
              <div className="bg-[#090B0E]/92 border border-[rgba(226,232,240,0.18)] px-2.5 py-1.5 text-[#94A3B8]">
                {effectiveFocus === null
                  ? 'OPACITY: L01 100% · L02 100% · L03 100%'
                  : `ISOLATED L0${effectiveFocus}: NON-ACTIVE LAYERS DIMMED TO 15%`}
              </div>
            </div>

            <FabricLab3D
              explodePct={explodePct}
              weatherMode={weatherMode}
              focusedLayer={effectiveFocus}
              onSelectLayer={(layer) => setLockedLayer(layer)}
            />

            {/* Bottom Legend Bar inside 3D Chamber (Solid Dark Background, No Backdrop-Filter) */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] bg-[#090B0E]/92 border border-[rgba(226,232,240,0.14)] px-3 py-1.5">
              <div className="flex items-center gap-2 text-[#00F0FF]">
                <span className="w-2 h-2 bg-[#00F0FF]" />
                <span>CYAN: EXTERNAL RAIN / GALE SHEAR (BLOCKED AT L01)</span>
              </div>
              <div className="flex items-center gap-2 text-[#FF7A00]">
                <span className="w-2 h-2 bg-[#FF7A00]" />
                <span>AMBER: INTERNAL SWEAT VAPOR (VENTED L03 → L01)</span>
              </div>
            </div>
          </div>

          {/* Right: 3 Synchronized Layer Specification Cards (Hover & Click Camera Sync) */}
          <div
            onMouseLeave={() => setHoveredLayer(null)}
            className="lg:col-span-5 divide-y divide-[rgba(226,232,240,0.14)] flex flex-col justify-between"
          >
            {layers.map((layer) => {
              const isFocused = effectiveFocus === layer.index;
              const isDimmed = effectiveFocus !== null && effectiveFocus !== layer.index;
              return (
                <button
                  key={layer.index}
                  type="button"
                  data-testid={`fabric-card-${layer.index}`}
                  onMouseEnter={() => setHoveredLayer(layer.index)}
                  onClick={() =>
                    setLockedLayer((prev) =>
                      prev === layer.index ? null : layer.index
                    )
                  }
                  className={`w-full text-left p-6 transition-all cursor-pointer border-l-4 ${
                    isFocused
                      ? 'bg-[#11161D]'
                      : 'bg-[#090B0E] hover:bg-[#11161D]/70'
                  } ${isDimmed ? 'opacity-55' : 'opacity-100'}`}
                  style={{
                    borderLeftColor: isFocused ? layer.accent : 'transparent',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 font-mono-tech text-xs mb-2">
                    <span style={{ color: layer.accent }} className="font-bold">
                      {layer.code}
                    </span>
                    <span className="text-[#94A3B8]">{layer.metric}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F8FAFC] tracking-wide mb-1.5">
                    {layer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-3">
                    {layer.desc}
                  </p>
                  <div className="flex items-center justify-between font-mono-tech text-[10px] pt-2 border-t border-[rgba(226,232,240,0.1)]">
                    <span style={{ color: layer.accent }}>{layer.microSpec}</span>
                    <span className="text-[#F8FAFC]">
                      {isFocused ? '[3D MACRO LOCK ACTIVE]' : '[HOVER / CLICK TO ZOOM]'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/Header.tsx">
<![CDATA[import React, { useEffect, useState } from 'react';
import { CURRENCY_CONFIG, CurrencyCode } from '../data/products';

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  cartCount: number;
  cartWeightKg: string;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  cartCount,
  cartWeightKg,
  onOpenCart,
}) => {
  const [clockText, setClockText] = useState<string>('UTC 16:42:09 // JST 01:42:09');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utc = now.toISOString().slice(11, 19);
      const jstDate = new Date(now.getTime() + 9 * 3600 * 1000);
      const jst = jstDate.toISOString().slice(11, 19);
      setClockText(`UTC ${utc} // JST ${jst}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090B0E]/95 backdrop-blur-md border-b border-[rgba(226,232,240,0.14)]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand wordmark + live system clock and coordinates */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <a
            href="#"
            className="font-display text-lg font-bold tracking-[0.1em] text-[#F8FAFC] whitespace-nowrap flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-[#00F0FF]" />
            synapxe
          </a>
          <div className="hidden xl:flex flex-col border-l border-[rgba(226,232,240,0.14)] pl-3 font-mono-tech text-[10px] leading-tight text-[#94A3B8] whitespace-nowrap">
            <span className="text-[#00F0FF]">{clockText}</span>
            <span>35.6762° N, 139.6503° E // SECTOR 09</span>
          </div>
        </div>

        {/* Center: Navigation anchor links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-3 xl:gap-4 font-mono-tech text-[11px] tracking-wider text-[#94A3B8] shrink-0"
        >
          <a
            href="#shells-grid"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [01 // SHELLS]
          </a>
          <a
            href="#fabric-lab"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [02 // FABRIC LAB]
          </a>
          <a
            href="#loadout-builder"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [03 // LOADOUT BUILDER]
          </a>
          <a
            href="#biometric-fit"
            className="hover:text-[#00F0FF] transition-colors whitespace-nowrap py-1"
          >
            [04 // BIOMETRIC FIT]
          </a>
        </nav>

        {/* Right: Currency selector + Cart Trigger button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            role="group"
            aria-label="Currency Selector"
            className="flex items-center border border-[rgba(226,232,240,0.14)] bg-[#11161D] p-0.5 font-mono-tech text-[11px]"
          >
            {(['USD', 'JPY', 'EUR'] as CurrencyCode[]).map((code) => {
              const active = currency === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-2 py-1 transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {CURRENCY_CONFIG[code].label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="chamfer-btn bg-[#11161D] hover:bg-[#00F0FF] hover:text-[#090B0E] text-[#F8FAFC] border border-[#00F0FF]/50 px-3 py-2 font-mono-tech text-[11px] font-semibold tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>[LOADOUT BAG ({cartCount})]</span>
            <span className="hidden sm:inline text-[10px] opacity-85 border-l border-current/30 pl-2">
              {cartWeightKg} KG
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/HeroSection.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import {
  CurrencyCode,
  HERO_HOTSPOTS,
  HERO_IMAGE_PATH,
  HeroHotspot,
  PRODUCTS,
  ProductSpec,
} from '../data/products';
import { formatPrice } from '../utils/storeLogic';

interface HeroSectionProps {
  currency: CurrencyCode;
  onAddProduct: (product: ProductSpec) => void;
}

type ShaderMode = 'OPTICAL' | 'THERMAL' | 'UV-LUMEN';

interface RainStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  isCyan: boolean;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currency, onAddProduct }) => {
  const [shaderMode, setShaderMode] = useState<ShaderMode>('OPTICAL');
  const [activeHotspotId, setActiveHotspotId] = useState<string>('hotspot-02');
  const [heroImgError, setHeroImgError] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const activeHotspot: HeroHotspot =
    HERO_HOTSPOTS.find((h) => h.id === activeHotspotId) || HERO_HOTSPOTS[1];

  useEffect(() => {
    const canvas = canvasRef.current;
    const sectionEl = sectionRef.current;
    if (!canvas || !sectionEl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let isVisible = true;
    let width = (canvas.width = sectionEl.clientWidth || 1280);
    let height = (canvas.height = sectionEl.clientHeight || 720);

    const handleResize = () => {
      if (!sectionEl || !canvas) return;
      width = canvas.width = sectionEl.clientWidth || 1280;
      height = canvas.height = sectionEl.clientHeight || 720;
    };

    window.addEventListener('resize', handleResize);

    // Pause canvas loop when scrolled out of viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionEl);

    // Initialize diagonal rain streaks (15deg slant)
    const streakCount = 95;
    const streaks: RainStreak[] = Array.from({ length: streakCount }, () => ({
      x: Math.random() * width * 1.2 - width * 0.1,
      y: Math.random() * height,
      length: 16 + Math.random() * 20,
      speed: 9 + Math.random() * 7,
      isCyan: Math.random() > 0.28,
    }));

    const splashes: SplashDroplet[] = [];
    const angleRad = (15 * Math.PI) / 180;
    const sinA = Math.sin(angleRad);
    const cosA = Math.cos(angleRad);

    const spawnSplashes = (x: number, y: number, isCyan: boolean) => {
      const count = 3 + Math.floor(Math.random() * 3); // 3-5 micro-droplets
      for (let i = 0; i < count; i++) {
        splashes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4.5,
          vy: -(2.2 + Math.random() * 3.4), // Upward hydrophobic bounce
          life: 0,
          maxLife: 14 + Math.floor(Math.random() * 10),
          color: isCyan ? 'rgba(0, 240, 255, 0.85)' : 'rgba(255, 0, 127, 0.85)',
        });
      }
    };

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Hydrophobic collision bounding box over figure's shoulders & visor: x: 58% to 84%, y: 18% to 48%
      const boxMinX = width * 0.58;
      const boxMaxX = width * 0.84;
      const boxMinY = height * 0.18;
      const boxMaxY = height * 0.48;

      ctx.lineWidth = 1.25;

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.x += sinA * s.speed;
        s.y += cosA * s.speed;

        const tipX = s.x + sinA * s.length;
        const tipY = s.y + cosA * s.length;

        // Check collision with hydrophobic shoulder/visor zone
        const hitsFigureZone =
          tipX >= boxMinX &&
          tipX <= boxMaxX &&
          tipY >= boxMinY &&
          tipY <= boxMinY + (boxMaxY - boxMinY) * 0.45 &&
          Math.random() < 0.35;

        // Check collision with user cursor
        const dxCursor = tipX - mouseRef.current.x;
        const dyCursor = tipY - mouseRef.current.y;
        const hitsCursor =
          mouseRef.current.active && dxCursor * dxCursor + dyCursor * dyCursor < 48 * 48;

        if (hitsFigureZone || hitsCursor) {
          spawnSplashes(tipX, tipY, s.isCyan);
          s.x = Math.random() * width * 1.2 - width * 0.2;
          s.y = -20 - Math.random() * 60;
          continue;
        }

        if (s.y > height + 30 || s.x > width + 60) {
          s.x = Math.random() * width * 1.2 - width * 0.2;
          s.y = -20 - Math.random() * 40;
        }

        ctx.strokeStyle = s.isCyan
          ? 'rgba(0, 240, 255, 0.32)'
          : 'rgba(255, 0, 127, 0.26)';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
      }

      // Update & draw micro-droplets
      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.life++;

        if (p.life >= p.maxLife) {
          splashes.splice(i, 1);
          continue;
        }

        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color.replace('0.85', (alpha * 0.9).toFixed(2));
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 2.5, 2.5);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleHotspotAdd = (hotspot: HeroHotspot) => {
    const targetProduct =
      PRODUCTS.find((p) => p.id === hotspot.productId) || PRODUCTS[0];
    onAddProduct(targetProduct);
  };

  const shaderClass =
    shaderMode === 'THERMAL'
      ? 'shader-thermal'
      : shaderMode === 'UV-LUMEN'
      ? 'shader-uv-lumen'
      : 'shader-optical';

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Flagship Hero — Drop 04 Archive"
      className="relative w-full min-h-[92vh] bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] overflow-hidden flex items-center"
    >
      {/* Hidden SVG Filter Matrices for Optical Shader Pill Switch */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="thermal-matrix">
            <feColorMatrix
              type="matrix"
              values="1.4 -0.3 0.2 0 0.05
                      0.2 0.3 -0.2 0 0
                      -0.4 0.8 1.3 0 0.05
                      0 0 0 1 0"
            />
          </filter>
          <filter id="uv-lumen-matrix">
            <feColorMatrix
              type="matrix"
              values="0.3 0.1 1.1 0 0
                      0.1 1.4 0.4 0 0
                      0.9 0.3 1.6 0 0.05
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Base Hero Image Layer */}
      <div className={`absolute inset-0 w-full h-full ${shaderClass} transition-all duration-300`}>
        {!heroImgError ? (
          <img
            src={HERO_IMAGE_PATH}
            alt="synapxe Masked Tactical Shell Operator in Rain"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-[#11161D] flex items-center justify-center font-mono-tech text-xs text-[#00F0FF]">
            [CAD WIREFRAME // HERO.PNG — HOSTILE ATMOSPHERE RIG]
          </div>
        )}
        {/* Measured contrast scrim so left-side typography has crisp WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090B0E]/95 via-[#090B0E]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-transparent to-[#090B0E]/40" />
      </div>

      {/* Interactive Overlay 1: Canvas Diagonal Rain & DWR Hydrophobic Physics */}
      <canvas
        ref={canvasRef}
        data-testid="hero-rain-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Corner Registration Marks */}
      <span
        aria-hidden="true"
        className="absolute top-4 left-4 z-20 font-mono-tech text-xs text-[#94A3B8]/60 select-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 z-20 font-mono-tech text-xs text-[#94A3B8]/60 select-none"
      >
        +
      </span>

      {/* Animated SVG Leader Line connecting active reticle to HUD Card on desktop */}
      <svg
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline
          points={`${activeHotspot.xPct},${activeHotspot.yPct} ${
            activeHotspot.xPct - 10
          },${activeHotspot.yPct} 36,66`}
          fill="none"
          stroke="#00F0FF"
          strokeWidth="0.18"
          strokeDasharray="0.7 0.35"
        />
        <circle
          cx={activeHotspot.xPct}
          cy={activeHotspot.yPct}
          r="0.45"
          fill="#00F0FF"
        />
        <circle cx="36" cy="66" r="0.4" fill="#00F0FF" />
      </svg>

      {/* Interactive Overlay 2 — 4 Pinned Garment Reticle Hotspots (Right Side, exact % coordinates on desktop) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
        {HERO_HOTSPOTS.map((spot) => {
          const isSelected = spot.id === activeHotspot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => setActiveHotspotId(spot.id)}
              onMouseEnter={() => setActiveHotspotId(spot.id)}
              aria-label={`Inspect ${spot.title}`}
              style={{
                left: `${spot.xPct}%`,
                top: `${spot.yPct}%`,
              }}
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2 px-2.5 py-1.5 font-mono-tech text-xs transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00F0FF] text-[#090B0E] font-bold shadow-[0_0_20px_rgba(0,240,255,0.85)]'
                  : 'bg-[#090B0E]/90 text-[#F8FAFC] border border-[#00F0FF]/70 hover:border-[#00F0FF]'
              }`}
            >
              <span className="inline-block w-2 h-2 border border-current" />
              <span>[{spot.number}]</span>
              <span className="text-[11px]">{spot.code}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-4 lg:px-8 py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left-Side Hero Typography & CTAs (x: 0% to 48%) */}
        <div className="lg:col-span-6 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-3 font-mono-tech text-xs tracking-[0.18em] text-[#00F0FF] border-b border-[#00F0FF]/40 pb-1">
            <span>DROP 04 // FW-26 ARCHIVE COLLECTION</span>
            <span className="text-[#94A3B8]">·</span>
            <span className="text-[#D4FF00]">DWR ACTIVE</span>
          </div>

          <h1
            className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#F8FAFC] leading-[1.02] tracking-[0.06em]"
            style={{ textWrap: 'balance' }}
          >
            ENGINEERED FOR HOSTILE ATMOSPHERES.
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal max-w-lg">
            3-Layer ePTFE Storm Shells, Ballistic Cordura® Exoskeletons, and Modular Fidlock® Carry Systems.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#shells-grid"
              className="chamfer-btn bg-[#00F0FF] hover:bg-[#F8FAFC] text-[#090B0E] font-mono-tech text-xs font-bold tracking-wider px-5 py-3 transition-colors whitespace-nowrap"
            >
              [EXPLORE ARCHIVE ↓]
            </a>
            <a
              href="#loadout-builder"
              className="chamfer-btn bg-[#11161D]/90 hover:bg-[#FF007F] text-[#F8FAFC] border border-[#FF007F]/70 font-mono-tech text-xs font-semibold tracking-wider px-4 py-3 transition-colors whitespace-nowrap"
            >
              [CONFIGURE FULL LOADOUT — 15% OFF]
            </a>
          </div>

          {/* Mobile Reticle Selector Strip */}
          <div className="lg:hidden pt-2">
            <div className="font-mono-tech text-[11px] text-[#94A3B8] mb-1.5">
              SELECT GARMENT RETICLE TO INSPECT SPECS:
            </div>
            <div className="flex flex-wrap gap-2">
              {HERO_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeHotspot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspotId(spot.id)}
                    className={`px-2.5 py-1.5 font-mono-tech text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                        : 'bg-[#11161D] text-[#F8FAFC] border border-[#00F0FF]/50'
                    }`}
                  >
                    [{spot.number}] {spot.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floating HUD Inspection Card linked to Active Reticle Hotspot */}
          <div
            data-testid="hero-hud-card"
            className="bg-[#11161D]/90 backdrop-blur-md border border-[#00F0FF]/50 p-4 chamfer-card max-w-md space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[rgba(226,232,240,0.14)] pb-1.5">
              <span className="font-mono-tech text-[11px] text-[#00F0FF] tracking-wider">
                RETICLE TARGET // {activeHotspot.code}
              </span>
              {activeHotspot.priceUsd && (
                <span className="font-mono-tech text-sm font-bold text-[#D4FF00]">
                  {formatPrice(activeHotspot.priceUsd, currency)}
                </span>
              )}
            </div>

            <div className="font-display text-base font-bold text-[#F8FAFC] tracking-wider">
              {activeHotspot.title}
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono-tech text-[11px] text-[#94A3B8]">
              <div>
                <span className="block text-[10px] text-[#94A3B8]/70">BARRIER RATING</span>
                <span className="text-[#F8FAFC]">{activeHotspot.waterproofSpec}</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#94A3B8]/70">VAPOR TRANSFER</span>
                <span className="text-[#F8FAFC]">{activeHotspot.breathabilitySpec}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-[rgba(226,232,240,0.08)]">
                <span className="block text-[10px] text-[#94A3B8]/70">ARCHITECTURE</span>
                <span className="text-[#00F0FF]">{activeHotspot.membraneSpec}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between gap-3">
              <span className="font-mono-tech text-[10px] text-[#94A3B8]">
                HYDROPHOBIC COLLISION ZONE: ACTIVE
              </span>
              <button
                type="button"
                onClick={() => handleHotspotAdd(activeHotspot)}
                className="chamfer-sm bg-[#00F0FF] hover:bg-[#D4FF00] text-[#090B0E] font-mono-tech text-xs font-bold px-3.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                + ADD TO LOADOUT
              </button>
            </div>
          </div>

          {/* Interactive Overlay 3 — Bottom-Left Optical Shader Pill Switch */}
          <div className="inline-flex flex-wrap items-center gap-3 bg-[#090B0E]/92 backdrop-blur-md border border-[rgba(226,232,240,0.14)] px-3 py-2">
            <span className="font-mono-tech text-[11px] text-[#94A3B8] tracking-wider">
              OPTICAL SENSOR:
            </span>
            <div
              role="group"
              aria-label="Optical Shader Mode"
              className="flex items-center gap-1 font-mono-tech text-xs"
            >
              {(['OPTICAL', 'THERMAL', 'UV-LUMEN'] as ShaderMode[]).map((mode) => {
                const active = shaderMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setShaderMode(mode)}
                    className={`px-2.5 py-1 transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column Spacer for Figure & Reticles */}
        <div className="hidden lg:block lg:col-span-6 min-h-[520px]" />
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/HologramRig3D.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ProductSpec } from '../data/products';
import {
  HologramCameraZone,
  getAuxPlaneTransform,
  getCameraPoseForZone,
} from '../utils/storeLogic';

export type OpticalMode = 'HOLO-SCAN' | 'TRUE OPTICAL';

interface HologramRig3DProps {
  shell: ProductSpec;
  bottom: ProductSpec;
  gear: ProductSpec;
  activeZone: HologramCameraZone;
  opticalMode: OpticalMode;
  onSelectZone: (zone: HologramCameraZone) => void;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec3 uAccentColor;
  uniform float uTime;
  uniform int uMode;
  uniform float uScanProgress;
  uniform float uActiveBoost;

  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    vec3 bgRef = vec3(0.035, 0.043, 0.055); // #090B0E studio backdrop

    // Auto Background Removal (Luma Key)
    float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float bgLuma = dot(bgRef, vec3(0.299, 0.587, 0.114));
    float colorDist = distance(texColor.rgb, bgRef);
    float dist = max(colorDist, abs(luma - bgLuma) * 1.15);

    // Soft outer border feather so rectangular image edges never clip
    float featherX = smoothstep(0.0, 0.035, vUv.x) * smoothstep(1.0, 0.965, vUv.x);
    float featherY = smoothstep(0.0, 0.035, vUv.y) * smoothstep(1.0, 0.965, vUv.y);
    float borderMask = featherX * featherY;

    float alpha = smoothstep(0.02, 0.09, dist) * borderMask * texColor.a;
    if (alpha < 0.01) discard;

    // Subtle studio shadow recovery so dark stealth fabrics show crisp seam & buckle detail
    vec3 rgb = pow(clamp(texColor.rgb, 0.0, 1.0), vec3(0.86)) * 1.18;

    if (uMode == 1) {
      // TRUE OPTICAL Mode: clean transparent studio cutout composite
      gl_FragColor = vec4(rgb, alpha);
      return;
    }

    // HOLO-SCAN Mode (Default): preserve 85% studio photo detail + 15% hologram chromatic grade
    vec3 holoTint = rgb * 0.82 + uAccentColor * (0.24 + luma * 0.52);
    vec3 finalRgb = mix(rgb, holoTint, 0.15);

    // Fine horizontal CRT/hologram scanlines
    float scanline = 0.92 + 0.08 * sin(vUv.y * 220.0 - uTime * 3.0);
    finalRgb *= scanline;

    // Chromatic edge glow in the slot's accent color
    float edgeBand = smoothstep(0.025, 0.22, dist) * (1.0 - smoothstep(0.22, 0.62, dist));
    finalRgb += uAccentColor * edgeBand * (0.30 + 0.28 * uActiveBoost);

    // Animated vertical laser scan beam (uScanProgress: 0.0 -> 1.0 over 0.65s)
    if (uScanProgress > 0.001 && uScanProgress < 0.999) {
      float beamY = 1.0 - uScanProgress;
      float dBeam = abs(vUv.y - beamY);
      float core = smoothstep(0.032, 0.0, dBeam);
      float halo = smoothstep(0.14, 0.0, dBeam) * 0.45;
      finalRgb += uAccentColor * (core * 1.45 + halo);
      alpha = min(1.0, alpha + core * 0.6);
    }

    gl_FragColor = vec4(finalRgb, alpha * 0.96);
  }
`;

/**
 * Generates a high-resolution procedural CAD fallback texture on #090B0E
 * if any studio image fails to load or before it resolves.
 */
function createCadFallbackTexture(product: ProductSpec, accentHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d')!;

  // Solid #090B0E backdrop so the Luma-Key shader cleanly keys out the background
  ctx.fillStyle = '#090B0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle CAD silhouette fill (above luma threshold so it remains visible)
  ctx.fillStyle = '#18222F';
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 4;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (product.category === 'shells') {
    // Tactical Jacket CAD contour
    ctx.beginPath();
    ctx.moveTo(-85, -210);
    ctx.lineTo(85, -210);
    ctx.lineTo(175, -90);
    ctx.lineTo(140, 140);
    ctx.lineTo(100, 130);
    ctx.lineTo(95, -50);
    ctx.lineTo(90, 200);
    ctx.lineTo(-90, 200);
    ctx.lineTo(-95, -50);
    ctx.lineTo(-100, 130);
    ctx.lineTo(-140, 140);
    ctx.lineTo(-175, -90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (product.category === 'bottoms') {
    // Articulated Cargo Pant CAD contour
    ctx.beginPath();
    ctx.moveTo(-95, -220);
    ctx.lineTo(95, -220);
    ctx.lineTo(115, 220);
    ctx.lineTo(45, 220);
    ctx.lineTo(0, -35);
    ctx.lineTo(-45, 220);
    ctx.lineTo(-115, 220);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    // Modular Pack / Footwear / Visor CAD contour
    ctx.beginPath();
    ctx.roundRect(-110, -150, 220, 300, 18);
    ctx.fill();
    ctx.stroke();
  }

  // Internal CAD crosshairs
  ctx.strokeStyle = 'rgba(248, 250, 252, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-60, 0);
  ctx.lineTo(60, 0);
  ctx.moveTo(0, -120);
  ctx.lineTo(0, 120);
  ctx.stroke();

  // SKU Callout Text
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(product.code, 0, -10);

  ctx.fillStyle = accentHex;
  ctx.font = '16px "JetBrains Mono", monospace';
  ctx.fillText(product.waterproofLabel, 0, 24);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates a crisp 3D HUD SKU callout tag plane texture
 */
function createSkuBadgeTexture(code: string, weightLabel: string, accentHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(9, 11, 14, 0.92)';
  ctx.fillRect(0, 0, 256, 64);

  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(1.5, 1.5, 253, 61);

  ctx.fillStyle = accentHex;
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText(code, 14, 29);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '15px "JetBrains Mono", monospace';
  ctx.fillText(`SPEC // ${weightLabel}`, 14, 51);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Builds corner bracket tick segments + thin bounding frame around a 1x1 plane
 */
function createBracketFrameGroup(accentHex: string): {
  group: THREE.Group;
  frameMat: THREE.LineBasicMaterial;
  cornerMat: THREE.LineBasicMaterial;
} {
  const group = new THREE.Group();

  // Subtle full perimeter wireframe
  const planeGeo = new THREE.PlaneGeometry(1.02, 1.02);
  const edgesGeo = new THREE.EdgesGeometry(planeGeo);
  const frameMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  });
  const perimeterLines = new THREE.LineSegments(edgesGeo, frameMat);
  group.add(perimeterLines);

  // Bold corner bracket L-ticks
  const w = 0.525;
  const h = 0.525;
  const tick = 0.12;
  const pts: number[] = [
    // Top-left
    -w, h - tick, 0.01, -w, h, 0.01,
    -w, h, 0.01, -w + tick, h, 0.01,
    // Top-right
    w - tick, h, 0.01, w, h, 0.01,
    w, h, 0.01, w, h - tick, 0.01,
    // Bottom-right
    w, -h + tick, 0.01, w, -h, 0.01,
    w, -h, 0.01, w - tick, -h, 0.01,
    // Bottom-left
    -w + tick, -h, 0.01, -w, -h, 0.01,
    -w, -h, 0.01, -w, -h + tick, 0.01,
  ];
  const cornerGeo = new THREE.BufferGeometry();
  cornerGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const cornerMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(accentHex),
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  const cornerSegments = new THREE.LineSegments(cornerGeo, cornerMat);
  group.add(cornerSegments);

  return { group, frameMat, cornerMat };
}

/**
 * Builds the 3D wireframe & point-cloud human mannequin core at z = -0.25
 */
function createMannequinCoreGroup(): THREE.Group {
  const group = new THREE.Group();
  group.position.set(0, 0, -0.25);

  // Anatomical wireframe segments (head, neck, shoulders, ribcage, spine, pelvis, legs, arms)
  const segments: number[] = [
    // Head octagon
    -0.14, 1.66, 0, 0.14, 1.66, 0,
    0.14, 1.66, 0, 0.19, 1.48, 0.04,
    0.19, 1.48, 0.04, 0.12, 1.28, 0,
    0.12, 1.28, 0, -0.12, 1.28, 0,
    -0.12, 1.28, 0, -0.19, 1.48, 0.04,
    -0.19, 1.48, 0.04, -0.14, 1.66, 0,
    // Visor bar
    -0.16, 1.50, 0.05, 0.16, 1.50, 0.05,
    // Central spine axis
    0, 1.28, 0, 0, -0.18, 0,
    // Clavicle & shoulders
    -0.54, 1.12, 0, 0.54, 1.12, 0,
    -0.12, 1.28, 0, -0.54, 1.12, 0,
    0.12, 1.28, 0, 0.54, 1.12, 0,
    // Ribcage horizontal ribs
    -0.46, 0.86, 0.05, 0.46, 0.86, 0.05,
    -0.42, 0.62, 0.06, 0.42, 0.62, 0.06,
    -0.36, 0.36, 0.04, 0.36, 0.36, 0.04,
    // Torso lateral contours
    -0.54, 1.12, 0, -0.36, 0.36, 0.04,
    0.54, 1.12, 0, 0.36, 0.36, 0.04,
    -0.36, 0.36, 0.04, -0.32, -0.12, 0,
    0.36, 0.36, 0.04, 0.32, -0.12, 0,
    // Pelvis cradle
    -0.32, -0.12, 0, 0.32, -0.12, 0,
    -0.32, -0.12, 0, -0.24, -0.36, 0,
    0.32, -0.12, 0, 0.24, -0.36, 0,
    -0.24, -0.36, 0, 0.24, -0.36, 0,
    // Arms (left & right)
    -0.54, 1.12, 0, -0.68, 0.52, 0.02,
    -0.68, 0.52, 0.02, -0.62, -0.05, 0.05,
    0.54, 1.12, 0, 0.68, 0.52, 0.02,
    0.68, 0.52, 0.02, 0.62, -0.05, 0.05,
    // Articulated legs (left & right)
    -0.24, -0.36, 0, -0.28, -1.15, 0.03,
    -0.28, -1.15, 0.03, -0.24, -1.98, 0,
    0.24, -0.36, 0, 0.28, -1.15, 0.03,
    0.28, -1.15, 0.03, 0.24, -1.98, 0,
    // Knee & ankle calibration rings
    -0.34, -1.15, 0.03, -0.20, -1.15, 0.03,
    0.20, -1.15, 0.03, 0.34, -1.15, 0.03,
    -0.32, -1.98, 0, -0.16, -1.98, 0,
    0.16, -1.98, 0, 0.32, -1.98, 0,
  ];

  const wireGeo = new THREE.BufferGeometry();
  wireGeo.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3));
  const wireMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
  });
  group.add(new THREE.LineSegments(wireGeo, wireMat));

  // Volumetric point-cloud silhouette along anatomical landmarks
  const pointCoords: number[] = [];
  for (let i = 0; i < 220; i++) {
    const t = i / 220;
    const y = -2.0 + t * 3.68;
    let halfWidth = 0.28;
    if (y > 1.25) halfWidth = 0.16; // head
    else if (y > 0.35) halfWidth = 0.44; // chest
    else if (y > -0.35) halfWidth = 0.32; // waist/pelvis
    else halfWidth = 0.28; // legs

    const angle = i * 2.39996; // golden angle spiral
    const r = Math.sqrt((i % 17) / 17) * halfWidth;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r * 0.35;
    pointCoords.push(x, y, z);
  }

  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute('position', new THREE.Float32BufferAttribute(pointCoords, 3));
  const ptsMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.028,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  group.add(new THREE.Points(ptsGeo, ptsMat));

  return group;
}

export const HologramRig3D: React.FC<HologramRig3DProps> = ({
  shell,
  bottom,
  gear,
  activeZone,
  opticalMode,
  onSelectZone,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredZone, setHoveredZone] = useState<HologramCameraZone | null>(null);

  // Refs to synchronize React state into the Three.js animation loop without recreating the WebGL context
  const activeZoneRef = useRef<HologramCameraZone>(activeZone);
  const hoveredZoneRef = useRef<HologramCameraZone | null>(null);
  const opticalModeRef = useRef<OpticalMode>(opticalMode);
  const gearCodeRef = useRef<string>(gear.code);
  const onSelectZoneRef = useRef(onSelectZone);
  onSelectZoneRef.current = onSelectZone;

  // Store plane shader materials & meshes for live texture / scan updates
  const sceneHandlesRef = useRef<{
    shellMat: THREE.ShaderMaterial;
    bottomMat: THREE.ShaderMaterial;
    gearMat: THREE.ShaderMaterial;
    shellBadgeMat: THREE.MeshBasicMaterial;
    bottomBadgeMat: THREE.MeshBasicMaterial;
    gearBadgeMat: THREE.MeshBasicMaterial;
    gearGroup: THREE.Group;
    leaderGeo: THREE.BufferGeometry;
    leaderLine: THREE.Line;
    frameHandles: {
      zone: HologramCameraZone;
      frameMat: THREE.LineBasicMaterial;
      cornerMat: THREE.LineBasicMaterial;
    }[];
    scanTimers: {
      shellStart: number;
      bottomStart: number;
      gearStart: number;
    };
    cameraGoalPos: THREE.Vector3;
    cameraGoalTarget: THREE.Vector3;
    autoCameraLocked: boolean;
    textureLoader: THREE.TextureLoader;
    loadedTextures: Map<string, THREE.Texture>;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL (SwiftShader / llvmpipe) per threejs skill guidelines
    const probe = document.createElement('canvas').getContext('webgl');
    const dbg = probe?.getExtension('WEBGL_debug_renderer_info');
    const isSoftwareGl = Boolean(
      dbg &&
        /swiftshader|llvmpipe|softpipe/i.test(
          String(probe!.getParameter(dbg.UNMASKED_RENDERER_WEBGL))
        )
    );

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const initAspectFactor = Math.max(1.0, 1.24 / Math.max(0.72, width / height));
    camera.position.set(0, 0.0, 5.2 * initAspectFactor);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 2.1;
    controls.maxDistance = 8.2;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.68;
    controls.minAzimuthAngle = -Math.PI * 0.38;
    controls.maxAzimuthAngle = Math.PI * 0.38;
    controls.target.set(0, -0.05, 0);

    // 1. Holographic Turntable Pedestal (Floor at y = -2.2)
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -2.2, 0);

    const polarGrid = new THREE.PolarGridHelper(1.85, 16, 6, 64, 0x00f0ff, 0x00f0ff);
    const polarMat = polarGrid.material as THREE.Material;
    polarMat.transparent = true;
    polarMat.opacity = 0.18;
    polarMat.depthWrite = false;
    pedestalGroup.add(polarGrid);

    const outerRingGeo = new THREE.RingGeometry(1.74, 1.86, 64);
    outerRingGeo.rotateX(-Math.PI / 2);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    pedestalGroup.add(new THREE.Mesh(outerRingGeo, outerRingMat));

    const innerRingGeo = new THREE.RingGeometry(1.05, 1.09, 48);
    innerRingGeo.rotateX(-Math.PI / 2);
    pedestalGroup.add(new THREE.Mesh(innerRingGeo, outerRingMat));

    scene.add(pedestalGroup);

    // 2. Anatomical Core Reference Grid (Background Layer at z = -0.25)
    const mannequinCore = createMannequinCoreGroup();
    scene.add(mannequinCore);

    // 3. Three Layered 3D Garment Hologram Planes (4:5 aspect ratio)
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = new Map<string, THREE.Texture>();

    const makeShaderMat = (initialProduct: ProductSpec, accentHex: string) =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: createCadFallbackTexture(initialProduct, accentHex) },
          uAccentColor: { value: new THREE.Color(accentHex) },
          uTime: { value: 0 },
          uMode: { value: opticalModeRef.current === 'TRUE OPTICAL' ? 1 : 0 },
          uScanProgress: { value: 0.0 },
          uActiveBoost: { value: 1.0 },
        },
      });

    const shellMat = makeShaderMat(shell, '#00F0FF');
    const bottomMat = makeShaderMat(bottom, '#FF007F');
    const gearMat = makeShaderMat(gear, '#D4FF00');

    const unitPlaneGeo = new THREE.PlaneGeometry(1, 1);

    // Helper to build each garment plane assembly with 3D bracket frame + SKU callout badge
    const buildGarmentAssembly = (
      zone: HologramCameraZone,
      shaderMat: THREE.ShaderMaterial,
      product: ProductSpec,
      accentHex: string,
      scaleX: number,
      scaleY: number
    ) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(unitPlaneGeo, shaderMat);
      mesh.scale.set(scaleX, scaleY, 1);
      mesh.userData.zone = zone;
      group.add(mesh);

      const { group: bracketGroup, frameMat, cornerMat } = createBracketFrameGroup(accentHex);
      bracketGroup.scale.set(scaleX, scaleY, 1);
      group.add(bracketGroup);

      // Floating 3D SKU callout tag at top-right of the bracket frame
      const badgeGeo = new THREE.PlaneGeometry(0.68, 0.17);
      const badgeMat = new THREE.MeshBasicMaterial({
        map: createSkuBadgeTexture(product.code, product.weightLabel, accentHex),
        transparent: true,
        depthWrite: false,
      });
      const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
      badgeMesh.position.set(scaleX * 0.5 - 0.34, scaleY * 0.5 + 0.12, 0.03);
      group.add(badgeMesh);

      return { group, mesh, badgeMat, frameMat, cornerMat };
    };

    // Plane 01 — UPPER SHELL (Slot 01): (0, 0.85, 0.15), scale 1.8 x 2.25
    const shellAssembly = buildGarmentAssembly(
      'UPPER SHELL',
      shellMat,
      shell,
      '#00F0FF',
      1.8,
      2.25
    );
    shellAssembly.group.position.set(0, 0.85, 0.15);
    scene.add(shellAssembly.group);

    // Plane 02 — LOWER SYSTEM (Slot 02): (0, -0.95, 0.05), scale 1.75 x 2.2
    const bottomAssembly = buildGarmentAssembly(
      'LOWER RIG',
      bottomMat,
      bottom,
      '#FF007F',
      1.75,
      2.2
    );
    bottomAssembly.group.position.set(0, -0.95, 0.05);
    scene.add(bottomAssembly.group);

    // Plane 03 — CARRY & AUX (Slot 03): dynamic offset, 4:5 aspect ratio (1.28 x 1.6)
    const gearAssembly = buildGarmentAssembly(
      'CARRY / FOOTWEAR',
      gearMat,
      gear,
      '#D4FF00',
      1.28,
      1.6
    );
    const initialAux = getAuxPlaneTransform(gear.code);
    gearAssembly.group.position.set(...initialAux.position);
    gearAssembly.group.rotation.y = initialAux.rotationY;
    scene.add(gearAssembly.group);

    // 3D Glowing Dashed Leader Line connecting Plane 03 to the Mannequin Core
    const leaderGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...initialAux.position),
      new THREE.Vector3(...initialAux.anchorPoint),
    ]);
    const leaderMat = new THREE.LineDashedMaterial({
      color: 0xd4ff00,
      dashSize: 0.09,
      gapSize: 0.05,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const leaderLine = new THREE.Line(leaderGeo, leaderMat);
    leaderLine.computeLineDistances();
    scene.add(leaderLine);

    const initialPose = getCameraPoseForZone(activeZoneRef.current, gear.code);
    const cameraGoalPos = new THREE.Vector3(...initialPose.position);
    const cameraGoalTarget = new THREE.Vector3(...initialPose.target);

    sceneHandlesRef.current = {
      shellMat,
      bottomMat,
      gearMat,
      shellBadgeMat: shellAssembly.badgeMat,
      bottomBadgeMat: bottomAssembly.badgeMat,
      gearBadgeMat: gearAssembly.badgeMat,
      gearGroup: gearAssembly.group,
      leaderGeo,
      leaderLine,
      frameHandles: [
        {
          zone: 'UPPER SHELL',
          frameMat: shellAssembly.frameMat,
          cornerMat: shellAssembly.cornerMat,
        },
        {
          zone: 'LOWER RIG',
          frameMat: bottomAssembly.frameMat,
          cornerMat: bottomAssembly.cornerMat,
        },
        {
          zone: 'CARRY / FOOTWEAR',
          frameMat: gearAssembly.frameMat,
          cornerMat: gearAssembly.cornerMat,
        },
      ],
      scanTimers: {
        shellStart: performance.now(),
        bottomStart: performance.now(),
        gearStart: performance.now(),
      },
      cameraGoalPos,
      cameraGoalTarget,
      autoCameraLocked: true,
      textureLoader,
      loadedTextures,
    };

    // Release auto camera lerp if the user manually orbits with mouse/touch
    const onControlStart = () => {
      if (sceneHandlesRef.current) {
        sceneHandlesRef.current.autoCameraLocked = false;
      }
    };
    controls.addEventListener('start', onControlStart);

    // Raycasting for hovering and clicking the 3D hologram planes directly
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const mouseParallax = new THREE.Vector2(0, 0);
    const pickableMeshes = [
      shellAssembly.mesh,
      bottomAssembly.mesh,
      gearAssembly.mesh,
    ];

    const updateRayPointer = (ev: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      mouseParallax.set(pointer.x * 0.12, pointer.y * 0.08);
    };

    const onPointerMove = (ev: PointerEvent) => {
      updateRayPointer(ev);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableMeshes, false);
      const hitZone =
        (hits[0]?.object?.userData?.zone as HologramCameraZone | undefined) ?? null;
      if (hitZone !== hoveredZoneRef.current) {
        hoveredZoneRef.current = hitZone;
        setHoveredZone(hitZone);
      }
    };

    let downPos = { x: 0, y: 0 };
    const onPointerDown = (ev: PointerEvent) => {
      downPos = { x: ev.clientX, y: ev.clientY };
    };

    const onPointerUp = (ev: PointerEvent) => {
      const distMoved = Math.hypot(ev.clientX - downPos.x, ev.clientY - downPos.y);
      if (distMoved > 6) return; // Ignore orbit drags
      updateRayPointer(ev);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableMeshes, false);
      const hitZone = hits[0]?.object?.userData?.zone as HologramCameraZone | undefined;
      if (hitZone) {
        onSelectZoneRef.current(hitZone);
      }
    };

    const onDoubleClick = () => {
      onSelectZoneRef.current('FULL RIG');
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);

    // ResizeObserver for crisp responsive rendering
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(260, entry.contentRect.width);
        const h = Math.max(320, entry.contentRect.height);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause WebGL loop when Section 03 is scrolled off-screen
    let isInViewport = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isInViewport = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Software WebGL frame-pacing helper per threejs skill so headless screenshots never stall
    const gl = renderer.getContext() as WebGL2RenderingContext;
    const afterDraw = (cb: () => void) => {
      if (typeof gl.fenceSync !== 'function') {
        setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)!;
      gl.flush();
      const poll = () => {
        const s = gl.clientWaitSync(sync, 0, 0);
        if (s === gl.ALREADY_SIGNALED || s === gl.CONDITION_SATISFIED) {
          gl.deleteSync(sync);
          setTimeout(cb, 80);
        } else {
          setTimeout(poll, 16);
        }
      };
      setTimeout(poll, 16);
    };

    let stopped = false;
    let rafId = 0;

    const tick = () => {
      if (stopped) return;

      if (isInViewport && sceneHandlesRef.current) {
        const now = performance.now();
        const elapsedSec = now * 0.001;
        const handles = sceneHandlesRef.current;

        // Slowly rotate Holographic Turntable Pedestal (0.003 rad/frame)
        pedestalGroup.rotation.y += 0.003;

        // Subtle floating breathing motion on garment planes
        shellAssembly.group.position.y = 0.85 + Math.sin(elapsedSec * 1.6) * 0.018;
        bottomAssembly.group.position.y = -0.95 + Math.sin(elapsedSec * 1.6 + 1.1) * 0.015;

        // Smoothly interpolate Plane 03 (Carry & Aux) to its target offset & tilt
        const desiredAux = getAuxPlaneTransform(gearCodeRef.current);
        handles.gearGroup.position.x = THREE.MathUtils.lerp(
          handles.gearGroup.position.x,
          desiredAux.position[0],
          0.12
        );
        handles.gearGroup.position.y = THREE.MathUtils.lerp(
          handles.gearGroup.position.y,
          desiredAux.position[1] + Math.sin(elapsedSec * 1.8 + 2.2) * 0.02,
          0.12
        );
        handles.gearGroup.position.z = THREE.MathUtils.lerp(
          handles.gearGroup.position.z,
          desiredAux.position[2],
          0.12
        );
        handles.gearGroup.rotation.y = THREE.MathUtils.lerp(
          handles.gearGroup.rotation.y,
          desiredAux.rotationY,
          0.12
        );

        // Update 3D dashed leader line endpoints
        const linePositions = handles.leaderGeo.attributes.position as THREE.BufferAttribute;
        linePositions.setXYZ(
          0,
          handles.gearGroup.position.x,
          handles.gearGroup.position.y,
          handles.gearGroup.position.z - 0.02
        );
        linePositions.setXYZ(
          1,
          desiredAux.anchorPoint[0],
          desiredAux.anchorPoint[1],
          desiredAux.anchorPoint[2]
        );
        linePositions.needsUpdate = true;
        handles.leaderLine.computeLineDistances();

        // Update shader uniforms (time, optical mode, 0.65s vertical laser scan progress, active boost)
        const modeInt = opticalModeRef.current === 'TRUE OPTICAL' ? 1 : 0;
        const calcScan = (startMs: number) => Math.min(1.0, Math.max(0.0, (now - startMs) / 650));

        handles.shellMat.uniforms.uTime.value = elapsedSec;
        handles.shellMat.uniforms.uMode.value = modeInt;
        handles.shellMat.uniforms.uScanProgress.value = calcScan(handles.scanTimers.shellStart);
        handles.shellMat.uniforms.uActiveBoost.value =
          activeZoneRef.current === 'UPPER SHELL' || hoveredZoneRef.current === 'UPPER SHELL'
            ? 1.0
            : 0.35;

        handles.bottomMat.uniforms.uTime.value = elapsedSec;
        handles.bottomMat.uniforms.uMode.value = modeInt;
        handles.bottomMat.uniforms.uScanProgress.value = calcScan(handles.scanTimers.bottomStart);
        handles.bottomMat.uniforms.uActiveBoost.value =
          activeZoneRef.current === 'LOWER RIG' || hoveredZoneRef.current === 'LOWER RIG'
            ? 1.0
            : 0.35;

        handles.gearMat.uniforms.uTime.value = elapsedSec;
        handles.gearMat.uniforms.uMode.value = modeInt;
        handles.gearMat.uniforms.uScanProgress.value = calcScan(handles.scanTimers.gearStart);
        handles.gearMat.uniforms.uActiveBoost.value =
          activeZoneRef.current === 'CARRY / FOOTWEAR' ||
          hoveredZoneRef.current === 'CARRY / FOOTWEAR'
            ? 1.0
            : 0.35;

        // Illuminate 3D Bracket Frames when active or hovered
        for (const fh of handles.frameHandles) {
          const isHighlighted =
            activeZoneRef.current === fh.zone ||
            hoveredZoneRef.current === fh.zone ||
            activeZoneRef.current === 'FULL RIG';
          fh.frameMat.opacity = THREE.MathUtils.lerp(
            fh.frameMat.opacity,
            isHighlighted ? 0.55 : 0.16,
            0.15
          );
          fh.cornerMat.opacity = THREE.MathUtils.lerp(
            fh.cornerMat.opacity,
            isHighlighted ? 1.0 : 0.35,
            0.15
          );
        }

        // Smooth camera zoom & orbit choreography with subtle mouse-parallax sway
        if (handles.autoCameraLocked) {
          const aspectFactor =
            activeZoneRef.current === 'FULL RIG'
              ? Math.max(1.0, 1.24 / Math.max(0.72, camera.aspect))
              : Math.max(1.0, 1.08 / Math.max(0.76, camera.aspect));
          const desiredCamX = handles.cameraGoalPos.x + mouseParallax.x;
          const desiredCamY = handles.cameraGoalPos.y + mouseParallax.y;
          const desiredCamZ = handles.cameraGoalPos.z * aspectFactor;
          camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.08);
          camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.08);
          camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.08);
          controls.target.lerp(handles.cameraGoalTarget, 0.09);
        }

        controls.update();
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(() => {
          if (!stopped) rafId = requestAnimationFrame(tick);
        });
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('dblclick', onDoubleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Load / swap Plane 01 (Shell) texture & trigger 0.65s vertical laser scan beam
  useEffect(() => {
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    handles.scanTimers.shellStart = performance.now();
    handles.shellBadgeMat.map = createSkuBadgeTexture(
      shell.code,
      shell.weightLabel,
      '#00F0FF'
    );
    handles.shellBadgeMat.needsUpdate = true;

    const cached = handles.loadedTextures.get(shell.image);
    if (cached) {
      handles.shellMat.uniforms.uTexture.value = cached;
      return;
    }

    // Immediate CAD fallback until studio PNG resolves
    handles.shellMat.uniforms.uTexture.value = createCadFallbackTexture(shell, '#00F0FF');
    handles.textureLoader.load(
      shell.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        handles.loadedTextures.set(shell.image, tex);
        handles.shellMat.uniforms.uTexture.value = tex;
        handles.scanTimers.shellStart = performance.now();
      },
      undefined,
      () => {
        handles.shellMat.uniforms.uTexture.value = createCadFallbackTexture(shell, '#00F0FF');
      }
    );
  }, [shell]);

  // Load / swap Plane 02 (Bottom) texture & trigger 0.65s vertical laser scan beam
  useEffect(() => {
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    handles.scanTimers.bottomStart = performance.now();
    handles.bottomBadgeMat.map = createSkuBadgeTexture(
      bottom.code,
      bottom.weightLabel,
      '#FF007F'
    );
    handles.bottomBadgeMat.needsUpdate = true;

    const cached = handles.loadedTextures.get(bottom.image);
    if (cached) {
      handles.bottomMat.uniforms.uTexture.value = cached;
      return;
    }

    handles.bottomMat.uniforms.uTexture.value = createCadFallbackTexture(bottom, '#FF007F');
    handles.textureLoader.load(
      bottom.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        handles.loadedTextures.set(bottom.image, tex);
        handles.bottomMat.uniforms.uTexture.value = tex;
        handles.scanTimers.bottomStart = performance.now();
      },
      undefined,
      () => {
        handles.bottomMat.uniforms.uTexture.value = createCadFallbackTexture(bottom, '#FF007F');
      }
    );
  }, [bottom]);

  // Load / swap Plane 03 (Carry & Aux) texture, update dynamic 3D offset, & trigger 0.65s laser scan
  useEffect(() => {
    gearCodeRef.current = gear.code;
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    handles.scanTimers.gearStart = performance.now();
    handles.gearBadgeMat.map = createSkuBadgeTexture(
      gear.code,
      gear.weightLabel,
      '#D4FF00'
    );
    handles.gearBadgeMat.needsUpdate = true;

    // If camera is locked on CARRY / FOOTWEAR, update camera goal to follow the new Aux 3D position
    if (activeZoneRef.current === 'CARRY / FOOTWEAR') {
      const nextPose = getCameraPoseForZone('CARRY / FOOTWEAR', gear.code);
      handles.cameraGoalPos.set(...nextPose.position);
      handles.cameraGoalTarget.set(...nextPose.target);
      handles.autoCameraLocked = true;
    }

    const cached = handles.loadedTextures.get(gear.image);
    if (cached) {
      handles.gearMat.uniforms.uTexture.value = cached;
      return;
    }

    handles.gearMat.uniforms.uTexture.value = createCadFallbackTexture(gear, '#D4FF00');
    handles.textureLoader.load(
      gear.image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        handles.loadedTextures.set(gear.image, tex);
        handles.gearMat.uniforms.uTexture.value = tex;
        handles.scanTimers.gearStart = performance.now();
      },
      undefined,
      () => {
        handles.gearMat.uniforms.uTexture.value = createCadFallbackTexture(gear, '#D4FF00');
      }
    );
  }, [gear]);

  // Sync camera pose choreography when activeZone changes
  useEffect(() => {
    activeZoneRef.current = activeZone;
    const handles = sceneHandlesRef.current;
    if (!handles) return;

    const pose = getCameraPoseForZone(activeZone, gearCodeRef.current);
    handles.cameraGoalPos.set(...pose.position);
    handles.cameraGoalTarget.set(...pose.target);
    handles.autoCameraLocked = true;
  }, [activeZone]);

  // Sync optical mode uniform ('HOLO-SCAN' vs 'TRUE OPTICAL')
  useEffect(() => {
    opticalModeRef.current = opticalMode;
  }, [opticalMode]);

  return (
    <div className="relative w-full h-[460px] sm:h-[510px] bg-[#090B0E] border border-[rgba(226,232,240,0.14)] overflow-hidden select-none">
      {/* Subtle 3D Chamber Radial Depth Vignette (pointer-events-none) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(0, 240, 255, 0.08) 0%, rgba(9, 11, 14, 0.0) 68%)',
        }}
      />

      {/* Dedicated Empty Container for Three.js WebGLRenderer */}
      <div
        ref={mountRef}
        data-testid="hologram-rig-canvas-container"
        className={`w-full h-full ${hoveredZone ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
        aria-label="Three.js 2.5D Volumetric Hologram Chamber"
      />

      {/* Bottom Telemetry Strip inside 3D Chamber (Solid Dark Background, No Backdrop-Filter) */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none flex items-center justify-between font-mono-tech text-[10px] text-[#94A3B8] bg-[#090B0E]/90 border border-[rgba(226,232,240,0.14)] px-2.5 py-1.5">
        <span>DRAG: ORBIT // DBL-CLICK: FULL RIG</span>
        <span className="text-[#00F0FF]">
          SHADER: {opticalMode === 'HOLO-SCAN' ? 'GLSL LUMA-KEY + CRT SCAN' : 'TRUE STUDIO CUTOUT'}
        </span>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/LoadoutBuilderSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { CurrencyCode, PRODUCTS, ProductSpec } from '../data/products';
import {
  HologramCameraZone,
  calculateBundleTelemetry,
  formatPrice,
  getCameraPoseForZone,
} from '../utils/storeLogic';
import { HologramRig3D, OpticalMode } from './HologramRig3D';

interface LoadoutBuilderSectionProps {
  currency: CurrencyCode;
  onDeployBundle: (shell: ProductSpec, bottom: ProductSpec, gear: ProductSpec) => void;
}

type ArmorZone = 'UPPER SHELL' | 'LOWER RIG' | 'CARRY / FOOTWEAR';

export const LoadoutBuilderSection: React.FC<LoadoutBuilderSectionProps> = ({
  currency,
  onDeployBundle,
}) => {
  const shellOptions = PRODUCTS.filter((p) => p.category === 'shells');
  const bottomOptions = PRODUCTS.filter((p) => p.category === 'bottoms');
  const gearOptions = PRODUCTS.filter((p) => p.category === 'gear');

  const [selectedShell, setSelectedShell] = useState<ProductSpec>(shellOptions[0]);
  const [selectedBottom, setSelectedBottom] = useState<ProductSpec>(bottomOptions[0]);
  const [selectedGear, setSelectedGear] = useState<ProductSpec>(gearOptions[0]);
  const [activeZone, setActiveZone] = useState<HologramCameraZone>('FULL RIG');
  const [opticalMode, setOpticalMode] = useState<OpticalMode>('HOLO-SCAN');

  const telemetry = calculateBundleTelemetry(
    selectedShell,
    selectedBottom,
    selectedGear
  );
  const currentPose = getCameraPoseForZone(activeZone, selectedGear.code);

  return (
    <section
      id="loadout-builder"
      aria-label="Loadout Builder Character Inventory Configurator"
      className="w-full bg-[#090B0E] border-b border-[rgba(226,232,240,0.14)] py-16 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-10 border-b border-[rgba(226,232,240,0.14)]">
          <div className="space-y-2">
            <div className="font-mono-tech text-xs text-[#FF007F] tracking-widest">
              SECTION 03 // CHARACTER INVENTORY BUNDLE CONFIGURATOR
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wider">
              MODULAR LOADOUT BUILDER — 15% FULL-SYSTEM DISCOUNT
            </h2>
          </div>
          <div className="font-mono-tech text-xs text-[#D4FF00] bg-[#11161D] border border-[#D4FF00]/40 px-4 py-2">
            ACTIVE SYNERGY: 3-SLOT URBAN EXOSKELETON (-15% BUNDLE RATE)
          </div>
        </div>

        {/* 2-Column Cyberpunk RPG Inventory Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-[rgba(226,232,240,0.14)]">
          {/* Left Column: Three.js 2.5D Volumetric Hologram Chamber */}
          <div className="lg:col-span-5 bg-[#11161D]/40 border-b lg:border-b-0 lg:border-r border-[rgba(226,232,240,0.14)] p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs text-[#94A3B8] border-b border-[rgba(226,232,240,0.14)] pb-3">
              <span>TACTICAL SILHOUETTE // RIG-09</span>
              <span
                data-testid="hologram-zone-readout"
                className="text-[#00F0FF] font-bold"
              >
                {currentPose.readout}
              </span>
            </div>

            {/* Viewport Container with Top-Left HUD Controls */}
            <div className="my-4 relative">
              {/* Top-Left HUD Bar over WebGL Viewport (Solid Dark Background, No Backdrop-Filter) */}
              <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap items-center gap-1.5 font-mono-tech text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveZone('FULL RIG')}
                  className={`px-2.5 py-1.5 border transition-colors cursor-pointer ${
                    activeZone === 'FULL RIG'
                      ? 'bg-[#00F0FF] text-[#090B0E] border-[#00F0FF] font-bold'
                      : 'bg-[#090B0E] text-[#F8FAFC] border-[rgba(226,232,240,0.28)] hover:border-[#00F0FF]'
                  }`}
                >
                  [VIEW: FULL RIG]
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setOpticalMode((prev) =>
                      prev === 'HOLO-SCAN' ? 'TRUE OPTICAL' : 'HOLO-SCAN'
                    )
                  }
                  className={`px-2.5 py-1.5 border transition-colors cursor-pointer ${
                    opticalMode === 'TRUE OPTICAL'
                      ? 'bg-[#D4FF00] text-[#090B0E] border-[#D4FF00] font-bold'
                      : 'bg-[#090B0E] text-[#00F0FF] border-[#00F0FF]/60 hover:border-[#00F0FF]'
                  }`}
                >
                  [{opticalMode === 'HOLO-SCAN' ? 'HOLO-SCAN / TRUE PHOTO' : 'TRUE OPTICAL // ACTIVE'}]
                </button>
              </div>

              <HologramRig3D
                shell={selectedShell}
                bottom={selectedBottom}
                gear={selectedGear}
                activeZone={activeZone}
                opticalMode={opticalMode}
                onSelectZone={(z) => setActiveZone(z)}
              />
            </div>

            {/* Clickable Armor Zone Status Boxes */}
            <div className="grid grid-cols-3 gap-2 font-mono-tech text-[11px]">
              {(
                [
                  { zone: 'UPPER SHELL', code: selectedShell.code, color: '#00F0FF' },
                  { zone: 'LOWER RIG', code: selectedBottom.code, color: '#FF007F' },
                  { zone: 'CARRY / FOOTWEAR', code: selectedGear.code, color: '#D4FF00' },
                ] as { zone: ArmorZone; code: string; color: string }[]
              ).map((item) => (
                <button
                  key={item.zone}
                  type="button"
                  onClick={() => setActiveZone(item.zone)}
                  className={`p-2 border text-left transition-colors cursor-pointer ${
                    activeZone === item.zone
                      ? 'bg-[#11161D] border-[#00F0FF] text-[#F8FAFC]'
                      : 'bg-[#090B0E] border-[rgba(226,232,240,0.14)] text-[#94A3B8] hover:border-[rgba(226,232,240,0.35)]'
                  }`}
                >
                  <span className="block text-[9px] truncate">{item.zone}</span>
                  <span className="font-bold" style={{ color: item.color }}>
                    {item.code}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: 3-Slot Selector + Live Bundle Telemetry */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Slot 01 // Outer Shell */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[#00F0FF] font-bold">
                    SLOT 01 // OUTER SHELL (CHOOSE 1)
                  </span>
                  <span className="text-[#94A3B8]">
                    EQUIPPED: {selectedShell.code} — {selectedShell.weightLabel}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {shellOptions.map((item) => {
                    const active = selectedShell.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedShell(item);
                          setActiveZone('UPPER SHELL');
                        }}
                        className={`p-3 border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#00F0FF]/12 border-[#00F0FF] text-[#F8FAFC]'
                            : 'bg-[#11161D] border-[rgba(226,232,240,0.14)] text-[#94A3B8] hover:text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono-tech text-xs mb-1">
                          <span className="font-bold text-[#00F0FF]">{item.code}</span>
                          <span className="text-[#D4FF00]">
                            {formatPrice(item.priceUsd, currency)}
                          </span>
                        </div>
                        <div className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                          {item.title}
                        </div>
                        <div className="font-mono-tech text-[10px] text-[#94A3B8] mt-1">
                          {item.waterproofLabel} · {item.weightLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot 02 // Lower System */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[#FF007F] font-bold">
                    SLOT 02 // LOWER SYSTEM (CHOOSE 1)
                  </span>
                  <span className="text-[#94A3B8]">
                    EQUIPPED: {selectedBottom.code} — {selectedBottom.weightLabel}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {bottomOptions.map((item) => {
                    const active = selectedBottom.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedBottom(item);
                          setActiveZone('LOWER RIG');
                        }}
                        className={`p-3 border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#FF007F]/12 border-[#FF007F] text-[#F8FAFC]'
                            : 'bg-[#11161D] border-[rgba(226,232,240,0.14)] text-[#94A3B8] hover:text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono-tech text-xs mb-1">
                          <span className="font-bold text-[#FF007F]">{item.code}</span>
                          <span className="text-[#D4FF00]">
                            {formatPrice(item.priceUsd, currency)}
                          </span>
                        </div>
                        <div className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                          {item.title}
                        </div>
                        <div className="font-mono-tech text-[10px] text-[#94A3B8] mt-1">
                          {item.waterproofLabel} · {item.weightLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot 03 // Carry & Aux */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[#D4FF00] font-bold">
                    SLOT 03 // CARRY & AUX (CHOOSE 1)
                  </span>
                  <span className="text-[#94A3B8]">
                    EQUIPPED: {selectedGear.code} — {selectedGear.weightLabel}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {gearOptions.map((item) => {
                    const active = selectedGear.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedGear(item);
                          setActiveZone('CARRY / FOOTWEAR');
                        }}
                        className={`p-3 border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#D4FF00]/12 border-[#D4FF00] text-[#F8FAFC]'
                            : 'bg-[#11161D] border-[rgba(226,232,240,0.14)] text-[#94A3B8] hover:text-[#F8FAFC]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono-tech text-xs mb-1">
                          <span className="font-bold text-[#D4FF00]">{item.code}</span>
                          <span className="text-[#F8FAFC]">
                            {formatPrice(item.priceUsd, currency)}
                          </span>
                        </div>
                        <div className="font-display text-sm font-bold text-[#F8FAFC] truncate">
                          {item.title}
                        </div>
                        <div className="font-mono-tech text-[10px] text-[#94A3B8] mt-1">
                          {item.waterproofLabel} · {item.weightLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Bundle Telemetry & Deploy Button */}
            <div
              data-testid="bundle-telemetry-panel"
              className="bg-[#11161D] border border-[#00F0FF]/50 p-5 space-y-4"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tech text-xs border-b border-[rgba(226,232,240,0.14)] pb-4">
                <div>
                  <span className="block text-[10px] text-[#94A3B8]">TOTAL MASS</span>
                  <span className="text-sm font-bold text-[#F8FAFC]">
                    {telemetry.totalMassKg} KG
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#94A3B8]">HYDROSTATIC RATING</span>
                  <span className="text-sm font-bold text-[#00F0FF]">
                    {telemetry.combinedWaterproofMm}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#94A3B8]">15% BUNDLE SAVINGS</span>
                  <span className="text-sm font-bold text-[#FF007F]">
                    SAVE {formatPrice(telemetry.discountAmountUsd, currency)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#94A3B8]">NET BUNDLE TOTAL</span>
                  <span className="text-base font-bold text-[#D4FF00]">
                    {formatPrice(telemetry.finalBundlePriceUsd, currency)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="font-mono-tech text-xs text-[#94A3B8]">
                  LOADOUT: [{selectedShell.code}] + [{selectedBottom.code}] + [
                  {selectedGear.code}]
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onDeployBundle(selectedShell, selectedBottom, selectedGear)
                  }
                  className="chamfer-btn bg-[#00F0FF] hover:bg-[#D4FF00] text-[#090B0E] font-mono-tech text-xs sm:text-sm font-bold tracking-wider px-6 py-3.5 transition-colors whitespace-nowrap cursor-pointer"
                >
                  [DEPLOY FULL LOADOUT TO CART]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/ProductCard.tsx">
<![CDATA[import React, { useState } from 'react';
import {
  ColorwayOption,
  CurrencyCode,
  ProductSpec,
  SizeOption,
} from '../data/products';
import { formatPrice, getVariantSku } from '../utils/storeLogic';

interface ProductCardProps {
  product: ProductSpec;
  currency: CurrencyCode;
  selectedSize: SizeOption;
  onSelectSize: (productId: number, size: SizeOption) => void;
  onAddToCart: (
    product: ProductSpec,
    size: SizeOption,
    colorway: ColorwayOption
  ) => void;
}

const SIZES: SizeOption[] = ['S', 'M', 'L', 'XL'];
const COLORWAYS: { name: ColorwayOption; dotColor: string; filterClass: string }[] = [
  {
    name: 'STEALTH BLACK',
    dotColor: '#090B0E',
    filterClass: 'swatch-stealth-black',
  },
  {
    name: 'OXIDE SLATE',
    dotColor: '#475569',
    filterClass: 'swatch-oxide-slate',
  },
  {
    name: 'NEON NOIR',
    dotColor: '#FF007F',
    filterClass: 'swatch-neon-noir',
  },
];

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  selectedSize,
  onSelectSize,
  onAddToCart,
}) => {
  const [colorway, setColorway] = useState<ColorwayOption>('STEALTH BLACK');
  const [imageFailed, setImageFailed] = useState(false);

  const currentSwatch =
    COLORWAYS.find((c) => c.name === colorway) || COLORWAYS[0];
  const variantSku = getVariantSku(product.code, colorway, selectedSize);
  const unitsLeft = product.stockBySize[selectedSize];

  return (
    <article
      data-testid={`product-card-${product.code}`}
      className="relative bg-[#090B0E] border border-[rgba(226,232,240,0.14)] flex flex-col justify-between group hover:border-[#00F0FF]/60 transition-colors"
    >
      {/* Corner Crosshair Registration Marks */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-2 z-20 font-mono-tech text-[10px] text-[#94A3B8]/50 select-none pointer-events-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1.5 right-2 z-20 font-mono-tech text-[10px] text-[#94A3B8]/50 select-none pointer-events-none"
      >
        +
      </span>

      <div>
        {/* Top Meta Strip */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2 border-b border-[rgba(226,232,240,0.14)] font-mono-tech text-xs">
          <span className="text-[#00F0FF] font-bold tracking-wider">{variantSku}</span>
          <span className="text-[#94A3B8] uppercase">{product.category}</span>
        </div>

        {/* 4:5 Portrait Studio Image Container with CAD Wireframe Fallback */}
        <div className="relative aspect-[4/5] w-full bg-[#11161D] overflow-hidden border-b border-[rgba(226,232,240,0.14)]">
          {!imageFailed ? (
            <img
              src={product.image}
              alt={`${product.code} ${product.title}`}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className={`w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03] ${currentSwatch.filterClass}`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#11161D] font-mono-tech">
              <svg
                className="w-24 h-24 text-[#00F0FF]/50 mb-3"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <rect x="12" y="12" width="76" height="76" strokeDasharray="4 2" />
                <line x1="12" y1="12" x2="88" y2="88" />
                <line x1="88" y1="12" x2="12" y2="88" />
                <circle cx="50" cy="50" r="22" />
              </svg>
              <span className="text-xs text-[#00F0FF] font-bold">
                CAD WIREFRAME // {product.code}
              </span>
              <span className="text-[10px] text-[#94A3B8] mt-1">
                {product.fallbackImageName}
              </span>
            </div>
          )}

          {/* Subtle bottom spec strip overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#090B0E]/95 via-[#090B0E]/60 to-transparent px-4 py-2.5 flex items-center justify-between font-mono-tech text-[11px] text-[#F8FAFC]">
            <span>{product.waterproofLabel}</span>
            <span className="text-[#94A3B8]">/</span>
            <span>{product.breathabilityLabel}</span>
            <span className="text-[#94A3B8]">/</span>
            <span className="text-[#00F0FF]">{product.weightLabel}</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-[#F8FAFC] leading-snug tracking-wide">
              {product.title}
            </h3>
            <span className="font-mono-tech text-base font-bold text-[#D4FF00] shrink-0">
              {formatPrice(product.priceUsd, currency)}
            </span>
          </div>

          <p className="text-xs text-[#94A3B8] line-clamp-1">{product.composition}</p>

          {/* Colorway Swatch Selector */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between font-mono-tech text-[11px]">
              <span className="text-[#94A3B8]">COLORWAY:</span>
              <span className="text-[#F8FAFC]">{colorway}</span>
            </div>
            <div
              role="group"
              aria-label={`Colorway for ${product.title}`}
              className="grid grid-cols-3 gap-1.5"
            >
              {COLORWAYS.map((c) => {
                const active = colorway === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColorway(c.name)}
                    className={`px-2 py-1 font-mono-tech text-[10px] border transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      active
                        ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#F8FAFC] font-bold'
                        : 'border-[rgba(226,232,240,0.14)] bg-[#11161D] text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 border border-white/40 shrink-0"
                      style={{ backgroundColor: c.dotColor }}
                    />
                    <span className="truncate">{c.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick-Size Matrix: [S] [M] [L] [XL] */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between font-mono-tech text-[11px]">
              <span className="text-[#94A3B8]">SIZE MATRIX:</span>
              <span
                className={
                  unitsLeft <= 2 ? 'text-[#FF7A00] font-semibold' : 'text-[#00F0FF]'
                }
              >
                STATUS: {unitsLeft} UNITS LEFT IN SECTOR
              </span>
            </div>
            <div
              role="group"
              aria-label={`Size selection for ${product.title}`}
              className="grid grid-cols-4 gap-1.5"
            >
              {SIZES.map((sz) => {
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onSelectSize(product.id, sz)}
                    aria-pressed={isSelected}
                    className={`py-1.5 font-mono-tech text-xs border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#00F0FF] text-[#090B0E] border-[#00F0FF] font-bold'
                        : 'bg-[#11161D] text-[#F8FAFC] border-[rgba(226,232,240,0.14)] hover:border-[#00F0FF]/50'
                    }`}
                  >
                    [{sz}]
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Mini Spec Telemetry Progress Bars */}
          <div className="space-y-1.5 pt-2 border-t border-[rgba(226,232,240,0.14)] font-mono-tech text-[10px]">
            <div className="space-y-0.5">
              <div className="flex justify-between text-[#94A3B8]">
                <span>WATERPROOF</span>
                <span className="text-[#F8FAFC]">{product.waterproofLabel}</span>
              </div>
              <div className="w-full h-1 bg-[#11161D] overflow-hidden">
                <div
                  className="h-full bg-[#00F0FF]"
                  style={{ width: `${product.waterproofBarPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[#94A3B8]">
                <span>BREATHABILITY</span>
                <span className="text-[#F8FAFC]">{product.breathabilityLabel}</span>
              </div>
              <div className="w-full h-1 bg-[#11161D] overflow-hidden">
                <div
                  className="h-full bg-[#D4FF00]"
                  style={{ width: `${product.breathabilityBarPct}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[#94A3B8]">
                <span>MASS INDEX</span>
                <span className="text-[#F8FAFC]">{product.weightLabel}</span>
              </div>
              <div className="w-full h-1 bg-[#11161D] overflow-hidden">
                <div
                  className="h-full bg-[#FF7A00]"
                  style={{ width: `${product.weightBarPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Loadout CTA */}
      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={() => onAddToCart(product, selectedSize, colorway)}
          className="w-full chamfer-btn bg-[#11161D] hover:bg-[#00F0FF] text-[#F8FAFC] hover:text-[#090B0E] border border-[#00F0FF]/50 py-2.5 px-4 font-mono-tech text-xs font-bold tracking-wider transition-colors cursor-pointer whitespace-nowrap"
        >
          + ADD TO LOADOUT [{selectedSize}]
        </button>
      </div>
    </article>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/ScenicFooter.tsx">
<![CDATA[import React, { useEffect, useRef } from 'react';

export function ScenicFooter() {
  const sceneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!scene || !canvas || !ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let last = 0;
    const drops = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), speed: 0.35 + Math.random() * 0.45, length: 12 + Math.random() * 20, cyan: Math.random() > 0.3 }));
    const resize = () => {
      width = scene.clientWidth;
      height = scene.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    const draw = (time: number) => {
      const delta = last ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      drops.forEach((drop) => {
        drop.y += drop.speed * delta;
        drop.x += drop.speed * delta * 0.15 * height / width;
        if (drop.y > 1.05 || drop.x > 1.05) { drop.y = -0.05; drop.x = Math.random(); }
        const x = drop.x * width;
        const y = drop.y * height;
        ctx.strokeStyle = drop.cyan ? 'rgba(0, 240, 255, 0.28)' : 'rgba(255, 0, 127, 0.18)';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + drop.length * 0.26, y + drop.length);
        ctx.stroke();
      });
      frame = requestAnimationFrame(draw);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      last = 0;
      ctx.clearRect(0, 0, width, height);
      if (visible && !motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    const sizeObserver = new ResizeObserver(resize);
    resize();
    observer.observe(scene);
    sizeObserver.observe(scene);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return (
    <section ref={sceneRef} aria-label="synapxe closing scene" className="scenic-footer relative overflow-hidden bg-[#090B0E] text-[#F8FAFC]">
      <div className="scenic-footer-image absolute inset-0" aria-hidden="true" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10 min-h-[650px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between flex-wrap gap-3 border-b border-white/30 px-4 lg:px-8 py-4 font-mono-tech text-[10px] tracking-widest"><span>synapxe</span><span>FIELD SYSTEMS / TOKYO 09</span></div>
          <div className="px-4 lg:px-8 py-10 flex flex-wrap justify-between gap-10">
            <div><p className="font-mono-tech text-xs text-[#00F0FF] tracking-wider mb-4">ENGINEERED FOR THE ELEMENTS</p><p className="max-w-xs text-sm leading-relaxed text-[#E2E8F0]">Technical equipment for movement through the city and beyond.</p></div>
            <div className="flex gap-12 sm:gap-20 font-mono-tech text-xs">
              <nav aria-label="Explore archive" className="flex flex-col gap-3"><span className="text-[#94A3B8] mb-2">EXPLORE</span><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#shells-grid">Shop equipment ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#fabric-lab">Fabric lab ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#loadout-builder">Build a loadout ↗</a></nav>
              <nav aria-label="Footer support" className="flex flex-col gap-3"><span className="text-[#94A3B8] mb-2">SUPPORT</span><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#footer-care">Garment care ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#footer-care">Shipping ↗</a><a className="hover:text-[#00F0FF] focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#footer-verifier">Verify garment ↗</a></nav>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-8 pb-10 flex flex-wrap items-end justify-between gap-8"><div><p className="font-mono-tech text-xs text-[#E2E8F0] mb-4 tracking-wider">THE URBAN ENVIRONMENT / 001</p><h2 className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">BEYOND<br />THE FORECAST<span className="text-[#00F0FF]">.</span></h2></div><div className="max-w-xs"><p className="text-sm text-[#E2E8F0] leading-relaxed">Made to move through whatever comes next.</p><a className="inline-block mt-5 font-mono-tech text-xs font-bold text-[#00F0FF] hover:underline focus-visible:outline-2 focus-visible:outline-[#00F0FF]" href="#shells-grid">EXPLORE THE ARCHIVE ↗</a></div></div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/TyvekDividerAndFilterBar.tsx">
<![CDATA[import React, { useEffect, useState } from 'react';
import { FilterCategory, SortOption } from '../utils/storeLogic';

interface TyvekDividerAndFilterBarProps {
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const CATEGORY_TABS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: '[ALL ARCHIVE (10)]' },
  { key: 'shells', label: '[OUTER SHELLS (03)]' },
  { key: 'bottoms', label: '[PANTS & BOTTOMS (03)]' },
  { key: 'gear', label: '[BAGS & FOOTWEAR (04)]' },
];

const SORT_OPTIONS: SortOption[] = [
  'PRICE: LOW-HIGH',
  'WEIGHT: LIGHTEST',
  'WATERPROOF RATING',
];

export const TyvekDividerAndFilterBar: React.FC<TyvekDividerAndFilterBarProps> = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  // Live countdown starting from 04D : 18H : 42M : 19S (= 412939 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(
    4 * 86400 + 18 * 3600 + 42 * 60 + 19
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = String(Math.floor(secondsLeft / 86400)).padStart(2, '0');
  const hours = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <>
      {/* Tyvek Care-Label Seam Divider */}
      <div
        role="region"
        aria-label="Tyvek Industrial Garment Care Tag"
        className="w-full tyvek-surface text-[#090B0E] border-y-2 border-dashed border-[#090B0E]/40 py-3 px-4 lg:px-8 select-none"
      >
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs font-semibold tracking-wider">
          <div className="flex items-center gap-3">
            <span className="bg-[#090B0E] text-[#F1F5F9] px-2 py-0.5 font-bold">
              TYVEK® SPEC-TAG
            </span>
            <span>BATCH_ID: KNX-2026-09 // DO NOT IRON MEMBRANE</span>
          </div>

          {/* ISO Laundry Care SVG Icons */}
          <div className="flex items-center gap-4" aria-label="ISO Care Symbols">
            {/* Wash 30C */}
            <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <path d="M2 6l2 12h16l2-12" />
              <path d="M2 8c3 2 6-2 10 0s7-2 10 0" />
              <text x="7" y="16" fontSize="6.5" fill="#090B0E" stroke="none" fontWeight="bold">
                30
              </text>
            </svg>
            {/* Do Not Bleach (Triangle with X) */}
            <svg width="20" height="18" viewBox="0 0 22 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <polygon points="11,2 20,18 2,18" />
              <line x1="5" y1="6" x2="17" y2="18" />
              <line x1="17" y1="6" x2="5" y2="18" />
            </svg>
            {/* Do Not Iron (Iron with X) */}
            <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <path d="M6 6h10l4 10H3c0-4 2-6 5-6h10" />
              <line x1="6" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="6" y2="18" />
            </svg>
            {/* Do Not Dry Clean (Circle with X) */}
            <svg width="20" height="18" viewBox="0 0 20 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <circle cx="10" cy="10" r="7" />
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </div>

          {/* Batch Barcode & Telemetry */}
          <div className="flex items-center gap-3">
            <svg
              width="96"
              height="20"
              viewBox="0 0 96 20"
              fill="#090B0E"
              aria-hidden="true"
            >
              <rect x="0" y="2" width="3" height="16" />
              <rect x="5" y="2" width="1.5" height="16" />
              <rect x="9" y="2" width="4" height="16" />
              <rect x="15" y="2" width="2" height="16" />
              <rect x="19" y="2" width="1" height="16" />
              <rect x="23" y="2" width="5" height="16" />
              <rect x="30" y="2" width="2" height="16" />
              <rect x="34" y="2" width="1.5" height="16" />
              <rect x="38" y="2" width="3.5" height="16" />
              <rect x="44" y="2" width="1.5" height="16" />
              <rect x="48" y="2" width="4" height="16" />
              <rect x="54" y="2" width="2" height="16" />
              <rect x="58" y="2" width="1" height="16" />
              <rect x="61" y="2" width="4.5" height="16" />
              <rect x="68" y="2" width="2" height="16" />
              <rect x="72" y="2" width="3" height="16" />
              <rect x="77" y="2" width="1.5" height="16" />
              <rect x="81" y="2" width="4" height="16" />
              <rect x="87" y="2" width="2" height="16" />
              <rect x="91" y="2" width="3.5" height="16" />
            </svg>
            <span className="text-[11px]">ISO-811 // ePTFE-3L</span>
          </div>
        </div>
      </div>

      {/* Sticky Filter & Drop Bar */}
      <div className="sticky top-16 z-30 w-full bg-[#090B0E]/95 backdrop-blur-md border-b border-[rgba(226,232,240,0.14)]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Live Countdown Timer */}
          <div className="flex items-center gap-2 font-mono-tech text-xs whitespace-nowrap">
            <span className="text-[#FF7A00] font-bold">
              DROP 04 CLOSES IN: {days}D : {hours}H : {mins}M : {secs}S
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Product Category Filter"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORY_TABS.map((tab) => {
              const active = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => onCategoryChange(tab.key)}
                  className={`px-3 py-1.5 font-mono-tech text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                      : 'bg-[#11161D] text-[#94A3B8] hover:text-[#F8FAFC] border border-[rgba(226,232,240,0.14)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 font-mono-tech text-xs shrink-0">
            <label htmlFor="archive-sort-select" className="text-[#94A3B8] whitespace-nowrap">
              SORT BY:
            </label>
            <select
              id="archive-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-[#11161D] text-[#F8FAFC] border border-[rgba(226,232,240,0.14)] focus:border-[#00F0FF] px-3 py-1.5 font-mono-tech text-xs outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/components/TyvekFooter.tsx">
<![CDATA[import React, { useState } from 'react';
import { ScenicFooter } from './ScenicFooter';
import { PRODUCTS } from '../data/products';
import { NfcVerificationResult, verifyNfcChipCode } from '../utils/storeLogic';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: '01 // HOW DOES 3-LAYER ePTFE MEMBRANE CARE WORK?',
    answer:
      'Machine wash cold (30°C) with liquid technical detergent. Do not use powder detergents, fabric softeners, or bleach. Tumble dry low for 20 minutes to reactivate the fluorocarbon-free DWR outer treatment. Never iron directly on laminated seams.',
  },
  {
    id: 'faq-2',
    question: '02 // ORBITAL EXPRESS SHIPPING & CUSTOMS TELEMETRY',
    answer:
      'All orders over $800 USD qualify for complimentary Orbital Express priority air courier (2–4 business days globally). Duties and import taxes for USD, JPY, and EUR sectors are calculated and cleared at dispatch.',
  },
  {
    id: 'faq-3',
    question: '03 // MODULAR FIDLOCK® & MOLLE HARDWARE COMPATIBILITY',
    answer:
      'Every synapxe outer shell, utility harness, and stabilizer sling utilizes standardized 25mm Fidlock® V-Buckle magnetic-mechanical fasteners and laser-cut hypalon PALS/MOLLE grids for cross-collection attachment.',
  },
];

export const TyvekFooter: React.FC = () => {
  const [nfcInput, setNfcInput] = useState<string>('JKT-01A');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [nfcResult, setNfcResult] = useState<NfcVerificationResult | null>(null);

  const [dispatchEmail, setDispatchEmail] = useState<string>('');
  const [dispatchSubscribed, setDispatchSubscribed] = useState<boolean>(false);

  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const handleVerifyChip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nfcInput.trim()) return;
    setIsScanning(true);
    setNfcResult(null);

    setTimeout(() => {
      const res = verifyNfcChipCode(nfcInput, PRODUCTS);
      setNfcResult(res);
      setIsScanning(false);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchEmail.trim() || !dispatchEmail.includes('@')) return;
    setDispatchSubscribed(true);
  };

  return (
    <footer
      aria-label="Woven Tyvek Specification Care-Tag Footer"
      className="w-full tyvek-surface text-[#090B0E] border-t-2 border-dashed border-[#090B0E]/60"
    >
      {/* Top Sewn Stitch Bar */}
      <div className="border-b border-[#090B0E]/20 py-2.5 px-4 lg:px-8 font-mono-tech text-[11px] flex flex-wrap items-center justify-between gap-4">
        <span className="font-bold tracking-widest">
          SEWN SPECIFICATION LABEL // SYNAPXE CORP. TOKYO-09
        </span>
        <span>SPECIFICATION REF: MIL-DTL-32439 // ISO-9001 CERTIFIED</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Column 1 (5 cols): Interactive NFC Garment Authenticity Verifier */}
        <div id="footer-verifier" className="lg:col-span-5 space-y-5 border border-[#090B0E]/30 bg-white/60 p-6">
          <div className="flex items-center justify-between border-b border-[#090B0E]/20 pb-3 font-mono-tech text-xs">
            <span className="font-bold bg-[#090B0E] text-[#F1F5F9] px-2 py-0.5">
              NFC CHIP REGISTRY
            </span>
            <span>SHA-256 GARMENT VERIFIER</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-[#090B0E] tracking-wide">
            INTERACTIVE NFC GARMENT AUTHENTICITY VERIFIER
          </h3>

          <p className="text-xs text-[#090B0E]/80 font-mono-tech leading-relaxed">
            Enter any garment serial or unit code (e.g., <strong>JKT-01A</strong>,{' '}
            <strong>PNT-05B</strong>, or <strong>KNX-8849</strong>) to query the embedded
            cryptographic NFC tag.
          </p>

          <form onSubmit={handleVerifyChip} className="space-y-3">
            <label htmlFor="nfc-verifier-input" className="sr-only">
              Product Serial or NFC Chip Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="nfc-verifier-input"
                type="text"
                value={nfcInput}
                onChange={(e) => setNfcInput(e.target.value)}
                placeholder="E.G. JKT-01A OR KNX-8849"
                className="flex-1 bg-[#F1F5F9] border-2 border-[#090B0E] px-3.5 py-2.5 font-mono-tech text-xs font-bold text-[#090B0E] uppercase outline-none"
              />
              <button
                type="submit"
                disabled={isScanning}
                className="bg-[#090B0E] hover:bg-[#00F0FF] hover:text-[#090B0E] text-[#F1F5F9] font-mono-tech text-xs font-bold px-5 py-2.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                {isScanning ? '[SCANNING CHIP...]' : '[VERIFY CHIP]'}
              </button>
            </div>
          </form>

          {/* 1.5s Cryptographic Scan Animation or Result Readout */}
          {isScanning && (
            <div
              data-testid="nfc-scan-progress"
              className="p-3 bg-[#090B0E] text-[#00F0FF] font-mono-tech text-xs space-y-2"
            >
              <div className="flex justify-between">
                <span>DECRYPTING NFC PAYLOAD...</span>
                <span>1.5S HANDSHAKE</span>
              </div>
              <div className="w-full h-1.5 bg-[#11161D] overflow-hidden">
                <div className="h-full bg-[#00F0FF] w-3/4 animate-pulse" />
              </div>
            </div>
          )}

          {nfcResult && !isScanning && (
            <div
              data-testid="nfc-verification-result"
              className={`p-3.5 font-mono-tech text-xs border-2 ${
                nfcResult.valid
                  ? 'bg-[#090B0E] text-[#D4FF00] border-[#090B0E]'
                  : 'bg-[#FF7A00]/20 text-[#090B0E] border-[#FF7A00]'
              }`}
            >
              <div className="font-bold">{nfcResult.message}</div>
              <div className="text-[10px] text-[#F1F5F9]/80 mt-1 flex justify-between">
                <span>BATCH: {nfcResult.batchId}</span>
                <span>VERIFIED: {nfcResult.code}</span>
              </div>
            </div>
          )}

          {/* Encrypted Dispatch Newsletter Signup */}
          <div className="pt-4 border-t border-[#090B0E]/20 space-y-2.5">
            <div className="font-mono-tech text-xs font-bold uppercase">
              ENCRYPTED DISPATCH // DROP 05 EARLY ACCESS
            </div>
            {dispatchSubscribed ? (
              <div
                data-testid="newsletter-confirmation"
                className="p-2.5 bg-[#090B0E] text-[#00F0FF] font-mono-tech text-xs font-bold"
              >
                DISPATCH LINK ESTABLISHED // {dispatchEmail.toUpperCase()} REGISTERED
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <label htmlFor="dispatch-email-input" className="sr-only">
                  Encrypted Dispatch Email
                </label>
                <input
                  id="dispatch-email-input"
                  type="email"
                  required
                  value={dispatchEmail}
                  onChange={(e) => setDispatchEmail(e.target.value)}
                  placeholder="OPERATOR@SECTOR09.IO"
                  className="flex-1 bg-[#F1F5F9] border border-[#090B0E] px-3 py-2 font-mono-tech text-xs text-[#090B0E] outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#090B0E] text-[#F1F5F9] hover:bg-[#FF007F] font-mono-tech text-xs font-bold px-4 py-2 transition-colors whitespace-nowrap cursor-pointer"
                >
                  [JOIN DISPATCH]
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 2 (7 cols): Collapsible FAQ/Shipping Accordions + ISO Care Matrix */}
        <div id="footer-care" className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-3">
            <div className="font-mono-tech text-xs font-bold tracking-wider uppercase border-b border-[#090B0E]/30 pb-2">
              TECHNICAL SPECIFICATIONS, SHIPPING & GARMENT CARE PROTOCOLS
            </div>

            <div className="divide-y divide-[#090B0E]/25 border border-[#090B0E]/30 bg-white/50">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      className="w-full px-4 py-3.5 text-left font-mono-tech text-xs font-bold flex items-center justify-between gap-4 hover:bg-[#090B0E]/5 cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <span className="text-sm">{isOpen ? '[-]' : '[+]'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-[#090B0E]/85 leading-relaxed font-mono-tech">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ISO Care Symbols + Monochrome Vector Payment Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#090B0E]/25 font-mono-tech text-xs">
            <div className="space-y-2">
              <span className="font-bold block">ISO 3758 MEMBRANE CARE SYMBOLS</span>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="border border-[#090B0E] px-2 py-1 font-bold">30°C GENTLE</span>
                <span className="border border-[#090B0E] px-2 py-1 font-bold">NO BLEACH</span>
                <span className="border border-[#090B0E] px-2 py-1 font-bold">NO IRON</span>
                <span className="border border-[#090B0E] px-2 py-1 font-bold">DWR LOW DRY</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold block">ENCRYPTED SETTLEMENT NETWORKS</span>
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  VISA // CRYPTO
                </span>
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  MASTERCARD
                </span>
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  AMEX
                </span>
                <span className="bg-[#090B0E] text-[#F1F5F9] px-2.5 py-1 font-bold">
                  JPY PAY-ID
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-[#090B0E]/25 py-4 px-4 lg:px-8 font-mono-tech text-[11px] flex flex-wrap items-center justify-between gap-4">
        <span>
          © 2026 synapxe — ENGINEERED URBAN SHELL SYSTEMS. ALL RIGHTS RESERVED.
        </span>
        <span>LOT #KNX-FW26-09 // PRINTED ON UNBLEACHED DUPONT™ TYVEK®</span>
      </div>
      <ScenicFooter />
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/data/products.ts">
<![CDATA[export type ProductCategory = 'shells' | 'bottoms' | 'gear';
export type SizeOption = 'S' | 'M' | 'L' | 'XL';
export type ColorwayOption = 'STEALTH BLACK' | 'OXIDE SLATE' | 'NEON NOIR';
export type CurrencyCode = 'USD' | 'JPY' | 'EUR';

export interface ProductSpec {
  id: number;
  code: string;
  title: string;
  category: ProductCategory;
  priceUsd: number;
  image: string;
  fallbackImageName: string;
  waterproofLabel: string;
  breathabilityLabel: string;
  weightLabel: string;
  waterproofRatingMm: number; // Numeric rating for sorting & telemetry bars
  breathabilityScore: number; // 0-100 normalized
  weightGrams: number; // Numeric weight in grams for sorting & bundle telemetry
  waterproofBarPct: number;
  breathabilityBarPct: number;
  weightBarPct: number;
  composition: string;
  stockBySize: Record<SizeOption, number>;
}

export interface HeroHotspot {
  id: string;
  number: string;
  title: string;
  code: string;
  priceUsd?: number;
  xPct: number;
  yPct: number;
  waterproofSpec: string;
  breathabilitySpec: string;
  membraneSpec: string;
  productId?: number;
}

export const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'USD $' },
  JPY: { symbol: '¥', rate: 154, label: 'JPY ¥' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR €' },
};

export const HERO_IMAGE_PATH = '/assets/aistudio/hero_1ea255fd.png';

export const HERO_HOTSPOTS: HeroHotspot[] = [
  {
    id: 'hotspot-01',
    number: '01',
    title: '01 // BALLISTIC RESPIRATOR & HUD VISOR',
    code: 'ACC-10B',
    priceUsd: 195,
    xPct: 68,
    yPct: 22,
    waterproofSpec: 'WINDSTOP / IPX6 SEAL',
    breathabilitySpec: 'DUAL HEPA-VALVE EXHAUST',
    membraneSpec: 'POLYCARBONATE ANTI-FOG + WINDSTOPPER®',
    productId: 10,
  },
  {
    id: 'hotspot-02',
    number: '02',
    title: '02 // 3L GORE-TEX® PRO STORM SHELL',
    code: 'JKT-01A',
    priceUsd: 680,
    xPct: 64,
    yPct: 40,
    waterproofSpec: '28,000mm HYDROSTATIC HEAD',
    breathabilitySpec: 'RET < 4.5 VAPOR FLUX',
    membraneSpec: '3-LAYER ePTFE + 200D CORDURA®',
    productId: 1,
  },
  {
    id: 'hotspot-03',
    number: '03',
    title: '03 // FIDLOCK® V-BUCKLE CHEST RIG',
    code: 'VST-03C',
    priceUsd: 460,
    xPct: 72,
    yPct: 52,
    waterproofSpec: '15,000mm DWR SHELL',
    breathabilitySpec: 'RET < 6.0 SPACER MESH',
    membraneSpec: '500D BALLISTIC LASER-CUT MOLLE',
    productId: 3,
  },
  {
    id: 'hotspot-04',
    number: '04',
    title: '04 // REFLECTIVE SEAM & AQUAGUARD® ZIPS',
    code: 'SPEC-04X',
    xPct: 78,
    yPct: 65,
    waterproofSpec: 'YKK® AQUAGUARD® MATTE',
    breathabilitySpec: '14MM ULTRASONIC WELDED TAPE',
    membraneSpec: '3M™ SCOTCHLITE™ 680 LUMEN PIPING',
    productId: 1,
  },
];

export const PRODUCTS: ProductSpec[] = [
  {
    id: 1,
    code: 'JKT-01A',
    title: 'Stealth 3L Gore-Tex Storm Shell',
    category: 'shells',
    priceUsd: 680,
    image: '/assets/aistudio/prod-01_b53ab8b2.png',
    fallbackImageName: 'prod-01.png',
    waterproofLabel: '28,000mm',
    breathabilityLabel: 'RET < 4.5',
    weightLabel: '640g',
    waterproofRatingMm: 28000,
    breathabilityScore: 95,
    weightGrams: 640,
    waterproofBarPct: 98,
    breathabilityBarPct: 94,
    weightBarPct: 56,
    composition: '3L ePTFE Membrane / 80D Micro-Ripstop Nylon',
    stockBySize: { S: 3, M: 5, L: 2, XL: 4 },
  },
  {
    id: 2,
    code: 'JKT-02B',
    title: 'Oxide Slate Modular Field Parka',
    category: 'shells',
    priceUsd: 740,
    image: '/assets/aistudio/prod-02_309a216d.png',
    fallbackImageName: 'prod-02.png',
    waterproofLabel: '28,000mm',
    breathabilityLabel: 'RET < 5.0',
    weightLabel: '820g',
    waterproofRatingMm: 28000,
    breathabilityScore: 90,
    weightGrams: 820,
    waterproofBarPct: 98,
    breathabilityBarPct: 88,
    weightBarPct: 72,
    composition: '3L Gore-Tex Pro / Detachable Storm Hood & Fidlock Array',
    stockBySize: { S: 2, M: 4, L: 3, XL: 1 },
  },
  {
    id: 3,
    code: 'VST-03C',
    title: 'Ballistic Utility Harness & Liner Vest',
    category: 'shells',
    priceUsd: 460,
    image: '/assets/aistudio/prod-03_349d3d07.png',
    fallbackImageName: 'prod-03.png',
    waterproofLabel: '15,000mm',
    breathabilityLabel: 'RET < 6.0',
    weightLabel: '590g',
    waterproofRatingMm: 15000,
    breathabilityScore: 82,
    weightGrams: 590,
    waterproofBarPct: 68,
    breathabilityBarPct: 82,
    weightBarPct: 52,
    composition: '500D Cordura® Ballistic / Primaloft® Gold Active Thermal Core',
    stockBySize: { S: 6, M: 3, L: 4, XL: 2 },
  },
  {
    id: 4,
    code: 'PNT-04A',
    title: 'Articulated Drop-Crotch Cargo Pant',
    category: 'bottoms',
    priceUsd: 420,
    image: '/assets/aistudio/prod-04_170fa82a.png',
    fallbackImageName: 'prod-04.png',
    waterproofLabel: '18,000mm',
    breathabilityLabel: 'RET < 5.5',
    weightLabel: '510g',
    waterproofRatingMm: 18000,
    breathabilityScore: 86,
    weightGrams: 510,
    waterproofBarPct: 75,
    breathabilityBarPct: 86,
    weightBarPct: 45,
    composition: 'Schoeller® Dryskin 4-Way Stretch / 3D Knee Gussets',
    stockBySize: { S: 4, M: 7, L: 3, XL: 5 },
  },
  {
    id: 5,
    code: 'PNT-05B',
    title: 'Cryo-Slate Weatherproof Shell Trouser',
    category: 'bottoms',
    priceUsd: 450,
    image: '/assets/aistudio/prod-05_c11603c5.png',
    fallbackImageName: 'prod-05.png',
    waterproofLabel: '28,000mm',
    breathabilityLabel: 'RET < 4.8',
    weightLabel: '480g',
    waterproofRatingMm: 28000,
    breathabilityScore: 92,
    weightGrams: 480,
    waterproofBarPct: 98,
    breathabilityBarPct: 91,
    weightBarPct: 42,
    composition: '3L ePTFE Taped Shell / Full-Length AquaGuard® Side Gussets',
    stockBySize: { S: 2, M: 5, L: 2, XL: 3 },
  },
  {
    id: 6,
    code: 'PNT-06C',
    title: 'Modular Kilt-Overlay Tactical Pant',
    category: 'bottoms',
    priceUsd: 490,
    image: '/assets/aistudio/prod-06_6d9a4d18.png',
    fallbackImageName: 'prod-06.png',
    waterproofLabel: '20,000mm',
    breathabilityLabel: 'RET < 6.2',
    weightLabel: '670g',
    waterproofRatingMm: 20000,
    breathabilityScore: 80,
    weightGrams: 670,
    waterproofBarPct: 80,
    breathabilityBarPct: 79,
    weightBarPct: 60,
    composition: 'Dyneema® Ripstop Kilt Apron / Cobra® Quick-Release Belt',
    stockBySize: { S: 3, M: 2, L: 4, XL: 2 },
  },
  {
    id: 7,
    code: 'BAG-07A',
    title: '3A-X-Pac® Messenger Stabilizer Sling',
    category: 'gear',
    priceUsd: 290,
    image: '/assets/aistudio/prod-07_d66d70d0.png',
    fallbackImageName: 'prod-07.png',
    waterproofLabel: '100% WP',
    breathabilityLabel: '14L CAP',
    weightLabel: '430g',
    waterproofRatingMm: 30000,
    breathabilityScore: 88,
    weightGrams: 430,
    waterproofBarPct: 100,
    breathabilityBarPct: 84,
    weightBarPct: 38,
    composition: 'VX21 X-Pac® Sailcloth / 3-Point Fidlock® Cross-Body Harness',
    stockBySize: { S: 8, M: 8, L: 6, XL: 6 },
  },
  {
    id: 8,
    code: 'BAG-08B',
    title: 'Hardshell Exo-Spine 24L Daypack',
    category: 'gear',
    priceUsd: 380,
    image: '/assets/aistudio/prof-08_1cd980b6.png',
    fallbackImageName: 'prod-08.png',
    waterproofLabel: '100% WP',
    breathabilityLabel: '24L CAP',
    weightLabel: '1120g',
    waterproofRatingMm: 30000,
    breathabilityScore: 85,
    weightGrams: 1120,
    waterproofBarPct: 100,
    breathabilityBarPct: 80,
    weightBarPct: 95,
    composition: 'Thermoformed Polycarbonate Dorsal Plate / 1000D Cordura®',
    stockBySize: { S: 4, M: 5, L: 3, XL: 4 },
  },
  {
    id: 9,
    code: 'FTW-09A',
    title: 'High-Top Boa® Vibram Exo-Boot',
    category: 'gear',
    priceUsd: 520,
    image: '/assets/aistudio/prod-09_5a47d632.png',
    fallbackImageName: 'prod-09.png',
    waterproofLabel: 'GORE-TEX',
    breathabilityLabel: 'BOA® LACE',
    weightLabel: '940g',
    waterproofRatingMm: 28000,
    breathabilityScore: 89,
    weightGrams: 940,
    waterproofBarPct: 96,
    breathabilityBarPct: 88,
    weightBarPct: 82,
    composition: 'BOA® M4 Steel Dial / Vibram® Arctic Grip Lug Sole',
    stockBySize: { S: 3, M: 4, L: 2, XL: 3 },
  },
  {
    id: 10,
    code: 'ACC-10B',
    title: 'Acoustic Storm Gaiter & Glove Kit',
    category: 'gear',
    priceUsd: 195,
    image: '/assets/aistudio/prod-10_6b125d50.png',
    fallbackImageName: 'prod-10.png',
    waterproofLabel: 'WINDSTOP',
    breathabilityLabel: 'CONDUCTIVE',
    weightLabel: '210g',
    waterproofRatingMm: 16000,
    breathabilityScore: 94,
    weightGrams: 210,
    waterproofBarPct: 72,
    breathabilityBarPct: 94,
    weightBarPct: 22,
    composition: 'Gore-Tex Infinium™ Windstopper / Capacitive Thumb & Index Tips',
    stockBySize: { S: 9, M: 6, L: 5, XL: 4 },
  },
];
]]>
    </file>
    <file path="src/app/(synapxe)/synapxe/utils/storeLogic.ts">
<![CDATA[import {
  CURRENCY_CONFIG,
  ColorwayOption,
  CurrencyCode,
  ProductCategory,
  ProductSpec,
  SizeOption,
} from '../data/products';

export type FilterCategory = 'all' | ProductCategory;
export type SortOption = 'PRICE: LOW-HIGH' | 'WEIGHT: LIGHTEST' | 'WATERPROOF RATING';
export type FitPreference = 'ARTICULATED TACTICAL' | 'OVERSIZED SHELL';

export interface CartItem {
  key: string; // `${productId}-${size}-${colorway}-${isBundle ? 'bundle' : 'std'}`
  product: ProductSpec;
  size: SizeOption;
  colorway: ColorwayOption;
  quantity: number;
  isBundleDiscounted?: boolean; // 15% off from Loadout Builder
}

export function convertCurrency(usdAmount: number, currency: CurrencyCode): number {
  const rate = CURRENCY_CONFIG[currency].rate;
  return Math.round(usdAmount * rate);
}

export function formatPrice(usdAmount: number, currency: CurrencyCode): string {
  const { symbol } = CURRENCY_CONFIG[currency];
  const converted = convertCurrency(usdAmount, currency);
  return `${symbol}${converted.toLocaleString('en-US')}`;
}

export function getVariantSku(code: string, colorway: ColorwayOption, size: SizeOption): string {
  const colorCode =
    colorway === 'STEALTH BLACK' ? 'BLK' : colorway === 'OXIDE SLATE' ? 'OXD' : 'NNR';
  return `${code}-${colorCode}-${size}`;
}

export function filterAndSortProducts(
  products: ProductSpec[],
  category: FilterCategory,
  sortBy: SortOption
): ProductSpec[] {
  const filtered =
    category === 'all' ? [...products] : products.filter((p) => p.category === category);

  return filtered.sort((a, b) => {
    if (sortBy === 'PRICE: LOW-HIGH') {
      return a.priceUsd - b.priceUsd;
    }
    if (sortBy === 'WEIGHT: LIGHTEST') {
      return a.weightGrams - b.weightGrams;
    }
    if (sortBy === 'WATERPROOF RATING') {
      return b.waterproofRatingMm - a.waterproofRatingMm;
    }
    return 0;
  });
}

export interface BundleTelemetry {
  totalMassKg: string;
  totalMassGrams: number;
  combinedWaterproofMm: string;
  baseSubtotalUsd: number;
  discountAmountUsd: number;
  finalBundlePriceUsd: number;
}

export function calculateBundleTelemetry(
  shell: ProductSpec,
  bottom: ProductSpec,
  gear: ProductSpec
): BundleTelemetry {
  const totalMassGrams = shell.weightGrams + bottom.weightGrams + gear.weightGrams;
  const totalMassKg = (totalMassGrams / 1000).toFixed(2);
  const avgWp = Math.round(
    (shell.waterproofRatingMm + bottom.waterproofRatingMm + gear.waterproofRatingMm) / 3
  );
  const baseSubtotalUsd = shell.priceUsd + bottom.priceUsd + gear.priceUsd;
  const discountAmountUsd = Math.round(baseSubtotalUsd * 0.15 * 100) / 100;
  const finalBundlePriceUsd = Math.round((baseSubtotalUsd - discountAmountUsd) * 100) / 100;

  return {
    totalMassKg,
    totalMassGrams,
    combinedWaterproofMm: `${avgWp.toLocaleString('en-US')}mm AVG`,
    baseSubtotalUsd,
    discountAmountUsd,
    finalBundlePriceUsd,
  };
}

export interface BiometricFitResult {
  recommendedSize: SizeOption;
  chestSpecCm: number;
  sleeveSpecCm: number;
  inseamSpecCm: number;
  summaryText: string;
}

export function calculateBiometricFit(
  heightCm: number,
  massKg: number,
  chestCm: number,
  preference: FitPreference
): BiometricFitResult {
  // Composite index combining chest expansion, height, and mass
  const baseIndex =
    (chestCm - 85) * 1.35 + (heightCm - 155) * 0.65 + (massKg - 45) * 0.55;
  const adjustedIndex =
    preference === 'OVERSIZED SHELL' ? baseIndex + 16 : baseIndex;

  let recommendedSize: SizeOption = 'M';
  let chestSpecCm = 108;
  let sleeveSpecCm = 86;
  let inseamSpecCm = 79;

  if (adjustedIndex < 32) {
    recommendedSize = 'S';
    chestSpecCm = 102;
    sleeveSpecCm = 83;
    inseamSpecCm = 76;
  } else if (adjustedIndex < 62) {
    recommendedSize = 'M';
    chestSpecCm = 108;
    sleeveSpecCm = 86;
    inseamSpecCm = 79;
  } else if (adjustedIndex < 92) {
    recommendedSize = 'L';
    chestSpecCm = 114;
    sleeveSpecCm = 89;
    inseamSpecCm = 82;
  } else {
    recommendedSize = 'XL';
    chestSpecCm = 122;
    sleeveSpecCm = 92;
    inseamSpecCm = 85;
  }

  return {
    recommendedSize,
    chestSpecCm,
    sleeveSpecCm,
    inseamSpecCm,
    summaryText: `RECOMMENDED SPEC: SIZE ${recommendedSize} // CHEST ${chestSpecCm}CM // SLEEVE ${sleeveSpecCm}CM`,
  };
}

export interface CartTotals {
  itemCount: number;
  totalWeightGrams: number;
  totalWeightKg: string;
  rawSubtotalUsd: number;
  bundleDiscountUsd: number;
  promoDiscountUsd: number;
  finalTotalUsd: number;
  freeShippingProgressPct: number;
  amountToFreeShippingUsd: number;
  isFreeShippingUnlocked: boolean;
  promoValid: boolean;
}

export const FREE_SHIPPING_THRESHOLD_USD = 800;

export function calculateCartTotals(items: CartItem[], promoCode: string): CartTotals {
  let itemCount = 0;
  let totalWeightGrams = 0;
  let rawSubtotalUsd = 0;
  let bundleDiscountUsd = 0;

  for (const item of items) {
    itemCount += item.quantity;
    totalWeightGrams += item.product.weightGrams * item.quantity;
    const lineRaw = item.product.priceUsd * item.quantity;
    rawSubtotalUsd += lineRaw;
    if (item.isBundleDiscounted) {
      bundleDiscountUsd += lineRaw * 0.15;
    }
  }

  bundleDiscountUsd = Math.round(bundleDiscountUsd * 100) / 100;
  const afterBundleUsd = Math.max(0, rawSubtotalUsd - bundleDiscountUsd);

  const normalizedPromo = promoCode.trim().toUpperCase();
  const promoValid = normalizedPromo === 'CYBER26' || normalizedPromo === 'ARCHIVE10';
  const promoDiscountUsd = promoValid ? Math.round(afterBundleUsd * 0.1 * 100) / 100 : 0;

  const finalTotalUsd = Math.round(Math.max(0, afterBundleUsd - promoDiscountUsd) * 100) / 100;
  const freeShippingProgressPct = Math.min(
    100,
    Math.round((finalTotalUsd / FREE_SHIPPING_THRESHOLD_USD) * 100)
  );
  const amountToFreeShippingUsd = Math.max(
    0,
    Math.round((FREE_SHIPPING_THRESHOLD_USD - finalTotalUsd) * 100) / 100
  );

  return {
    itemCount,
    totalWeightGrams,
    totalWeightKg: (totalWeightGrams / 1000).toFixed(2),
    rawSubtotalUsd,
    bundleDiscountUsd,
    promoDiscountUsd,
    finalTotalUsd,
    freeShippingProgressPct,
    amountToFreeShippingUsd,
    isFreeShippingUnlocked: finalTotalUsd >= FREE_SHIPPING_THRESHOLD_USD,
    promoValid,
  };
}

export interface NfcVerificationResult {
  valid: boolean;
  code: string;
  message: string;
  batchId: string;
  timestamp: string;
}

export function verifyNfcChipCode(input: string, products: ProductSpec[]): NfcVerificationResult {
  const cleaned = input.trim().toUpperCase();
  if (!cleaned) {
    return {
      valid: false,
      code: 'NULL',
      message: 'ERROR // NO SERIAL CODE DETECTED IN NFC BUFFER',
      batchId: 'N/A',
      timestamp: new Date().toISOString(),
    };
  }

  const matchedProduct = products.find(
    (p) => p.code.toUpperCase() === cleaned || cleaned.startsWith(p.code.toUpperCase())
  );
  const isKnxCode = /^KNX-[A-Z0-9-]{3,}$/.test(cleaned);

  if (matchedProduct || isKnxCode) {
    const unitLabel = matchedProduct ? `${matchedProduct.code} (${matchedProduct.title})` : cleaned;
    return {
      valid: true,
      code: cleaned,
      message: `AUTHENTICATED // GENUINE SYNAPXE UNIT — BATCH FW26 [${unitLabel}]`,
      batchId: 'KNX-2026-09-FW26',
      timestamp: new Date().toISOString(),
    };
  }

  // Per spec: "An input box where users can type any product code (e.g., JKT-01A or KNX-8849) and click [VERIFY CHIP] to run a 1.5s cryptographic scan animation returning AUTHENTICATED // GENUINE SYNAPXE UNIT — BATCH FW26"
  if (cleaned.length >= 4) {
    return {
      valid: true,
      code: cleaned,
      message: `AUTHENTICATED // GENUINE SYNAPXE UNIT — BATCH FW26 [${cleaned}]`,
      batchId: 'KNX-2026-09-FW26',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    valid: false,
    code: cleaned,
    message: 'UNRECOGNIZED SIGNATURE // ENTER VALID SERIAL (E.G. JKT-01A OR KNX-8849)',
    batchId: 'ERR-00',
    timestamp: new Date().toISOString(),
  };
}

export function generateTrackingHash(seed = Date.now()): string {
  const hex = ((seed * 2654435761) >>> 0).toString(16).toUpperCase().padStart(8, '0');
  return `0xKNX-FW26-${hex}-SEC09`;
}

export type HologramCameraZone =
  | 'FULL RIG'
  | 'UPPER SHELL'
  | 'LOWER RIG'
  | 'CARRY / FOOTWEAR';

export interface AuxPlaneTransform {
  position: [number, number, number];
  rotationY: number;
  anchorPoint: [number, number, number];
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  readout: string;
}

export function getAuxPlaneTransform(productCode: string): AuxPlaneTransform {
  const code = productCode.trim().toUpperCase();
  if (code.startsWith('FTW-09A') || code.startsWith('FTW')) {
    return {
      position: [0.95, -1.55, 0.45],
      rotationY: 0,
      anchorPoint: [0.22, -1.75, -0.25],
    };
  }
  if (code.startsWith('ACC-10B') || code.startsWith('ACC')) {
    return {
      position: [-0.95, 1.25, 0.45],
      rotationY: 0,
      anchorPoint: [-0.08, 1.38, -0.25],
    };
  }
  // Default: BAG-07A or BAG-08B at upper-right shoulder offset tilted -12deg on Y-axis
  return {
    position: [1.05, 0.65, 0.45],
    rotationY: (-12 * Math.PI) / 180,
    anchorPoint: [0.28, 0.85, -0.25],
  };
}

export function getCameraPoseForZone(
  zone: HologramCameraZone,
  auxProductCode: string
): CameraPose {
  if (zone === 'UPPER SHELL') {
    return {
      position: [-0.35, 0.85, 3.1],
      target: [0, 0.8, 0],
      readout: 'ZONE: UPPER SHELL // 3D LOCK',
    };
  }
  if (zone === 'LOWER RIG') {
    return {
      position: [0.35, -0.9, 3.1],
      target: [0, -0.9, 0],
      readout: 'ZONE: LOWER RIG // 3D LOCK',
    };
  }
  if (zone === 'CARRY / FOOTWEAR') {
    const aux = getAuxPlaneTransform(auxProductCode);
    const [ax, ay, az] = aux.position;
    const camX = ax >= 0 ? ax + 0.25 : ax - 0.25;
    return {
      position: [camX, ay, 2.85],
      target: [ax * 0.85, ay, az * 0.5],
      readout: 'ZONE: CARRY & AUX // 3D LOCK',
    };
  }
  return {
    position: [0, 0.0, 5.2],
    target: [0, -0.05, 0],
    readout: 'ZONE: FULL RIG // OVERVIEW',
  };
}

export type FabricWeatherMode = 'TYPHOON' | 'GALE' | 'VAPOR';
export type FabricFocusLayer = null | 1 | 2 | 3;

export interface FabricCameraPose {
  position: [number, number, number];
  target: [number, number, number];
  readout: string;
}

/**
 * Computes vertical distance between adjacent 3D fabric slabs.
 * At 65% default slider, gap is 0.60 units (per spec).
 * Scales smoothly from 0.14 (0% laminated seal) to 0.88 (100% full exploded CAD).
 */
export function getFabricSlabGap(explodePct: number): number {
  const clamped = Math.max(0, Math.min(100, explodePct));
  // At clamped = 65, 0.145 + (65 / 100) * 0.70 = 0.60
  return Number((0.145 + (clamped / 100) * 0.7).toFixed(3));
}

/**
 * Returns target opacity [layer1, layer2, layer3] based on focused card.
 * When a specific layer is focused, non-focused layers dim to 15% opacity (0.15).
 */
export function getFabricLayerOpacities(focus: FabricFocusLayer): [number, number, number] {
  if (focus === 1) return [1.0, 0.15, 0.15];
  if (focus === 2) return [0.15, 1.0, 0.15];
  if (focus === 3) return [0.15, 0.15, 1.0];
  return [1.0, 1.0, 1.0];
}

/**
 * Computes the 3D camera position and target for the Fabric Lab based on focused layer and current slab gap.
 */
export function getFabricCameraPose(
  focus: FabricFocusLayer,
  explodePct: number
): FabricCameraPose {
  const gap = getFabricSlabGap(explodePct);
  if (focus === 1) {
    // Macro grazing angle over Layer 01 (200D Ballistic Cordura + rain shockwaves)
    return {
      position: [1.55, gap + 0.62, 2.05],
      target: [0, gap + 0.04, 0],
      readout: 'OPTICAL LOCK: L01 // 200D BALLISTIC CORDURA® (GRAZING MACRO)',
    };
  }
  if (focus === 2) {
    // 5000x macro view diving between the slabs to frame Layer 02 ePTFE lattice
    return {
      position: [1.35, 0.12, 1.75],
      target: [0, 0.0, 0],
      readout: 'OPTICAL LOCK: L02 // ePTFE VORONOI LATTICE (5000X INTER-SLAB)',
    };
  }
  if (focus === 3) {
    // Orbit underneath the stack to show hexagonal thermal wicking channels capturing body heat
    return {
      position: [1.5, -gap - 0.58, 2.05],
      target: [0, -gap - 0.04, 0],
      readout: 'OPTICAL LOCK: L03 // TRICOT HEX-BAFFLE MATRIX (SUB-STACK)',
    };
  }
  // Default centered full 3-layer exploded overview stack
  return {
    position: [2.75, 1.35, 3.75],
    target: [0, -0.04, 0],
    readout: 'OPTICAL LOCK: FULL 3-LAYER EXPLODED STACK',
  };
}


]]>
    </file>
  </files>
</template>
