import React, { useState } from 'react';
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
