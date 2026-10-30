import React, { useState } from 'react';
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
