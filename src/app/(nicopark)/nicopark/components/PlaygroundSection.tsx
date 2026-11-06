"use client";

import React, { useState } from 'react';
import { RotateCcw, Palette, Sparkles, Gauge } from 'lucide-react';
import {
  PLAYGROUND_SWATCHES,
  SwatchItem,
  calculateAsteriskSpokes
} from '../data/portfolioData';

export const PlaygroundSection: React.FC = () => {
  // Experiment 01: CMF Swatch Palette Tray State
  const [selectedSlot, setSelectedSlot] = useState<'shell' | 'dial' | 'accent'>('shell');
  const [cmfAssignment, setCmfAssignment] = useState<{
    shell: SwatchItem;
    dial: SwatchItem;
    accent: SwatchItem;
  }>({
    shell: PLAYGROUND_SWATCHES[0], // Signal Coral
    dial: PLAYGROUND_SWATCHES[3], // Tactile Lilac
    accent: PLAYGROUND_SWATCHES[2] // Apparatus Butter
  });

  // Experiment 02: Parametric Asterisk & Shape Morph Lab State
  const [armCount, setArmCount] = useState<number>(4); // 4 full diameter lines = 8-armed asterisk
  const [strokeWidth, setStrokeWidth] = useState<number>(14);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [roundCaps, setRoundCaps] = useState<boolean>(false);

  // Experiment 03: Tactile Switch Travel & Spring Button Lab State
  const [switchTravelMm, setSwitchTravelMm] = useState<number>(4.0);
  const [springForceG, setSpringForceG] = useState<number>(55);
  const [pressCount, setPressCount] = useState<number>(12);
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

  const spokes = calculateAsteriskSpokes(armCount, rotationDeg, 46);

  const handleAssignSwatch = (swatch: SwatchItem) => {
    setCmfAssignment((prev) => ({
      ...prev,
      [selectedSlot]: swatch
    }));
  };

  const handleResetAll = () => {
    setSelectedSlot('shell');
    setCmfAssignment({
      shell: PLAYGROUND_SWATCHES[0],
      dial: PLAYGROUND_SWATCHES[3],
      accent: PLAYGROUND_SWATCHES[2]
    });
    setArmCount(4);
    setStrokeWidth(14);
    setRotationDeg(0);
    setRoundCaps(false);
    setSwitchTravelMm(4.0);
    setSpringForceG(55);
    setPressCount(0);
  };

  const triggerTactilePress = () => {
    setIsKeyPressed(true);
    setPressCount((c) => c + 1);
    window.setTimeout(() => {
      setIsKeyPressed(false);
    }, 160);
  };

  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Header Row with Explicit Experiment Distinction & Reset Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 06 · STUDIO SANDBOX (NON-CLIENT R&amp;D EXPERIMENTS)
          </p>
          <h2
            id="playground-heading"
            className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
          >
            TACTILE <span className="text-[#FF735D]">PLAYGROUND.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono-tech text-xs text-[#515151]">
            SESSION-LOCAL SANDBOX · KEYBOARD &amp; TOUCH READY
          </span>
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-[#191919] font-condensed font-bold text-sm uppercase tracking-wider hover:bg-[#F7E36B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET EXPERIMENTS</span>
          </button>
        </div>
      </div>

      {/* Three Movable / Interactive Experiment Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
        {/* EXPERIMENT 01: CMF Color Swatch Snap Tray */}
        <div className="bg-white border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#191919]/15">
              <span className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#3049F0]">
                <Palette className="w-4 h-4" />
                <span>EXP 01 · CMF SWATCH TRAY</span>
              </span>
              <span className="font-mono-tech text-xs text-[#515151]">PANTONE / RAL LAB</span>
            </div>

            <h3 className="font-condensed font-extrabold text-[26px] uppercase text-[#191919] leading-tight mb-2">
              Snap Hardware CMF Finishes
            </h3>
            <p className="text-xs text-[#515151] mb-4">
              Select a target hardware part slot below, then click or drag any studio swatch tile to snap it into the enclosure recipe.
            </p>

            {/* Live Mini Hardware CMF Preview Stage */}
            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-4 mb-4 flex items-center justify-between gap-4">
              <svg
                viewBox="0 0 140 120"
                className="w-28 h-24 shrink-0"
                aria-label="Live CMF hardware enclosure preview"
              >
                {/* Main Enclosure Shell */}
                <rect
                  x="16"
                  y="18"
                  width="92"
                  height="88"
                  rx="26"
                  fill={cmfAssignment.shell.hex}
                  stroke="#191919"
                  strokeWidth="3"
                />
                {/* Top Knurled Dial */}
                <rect
                  x="84"
                  y="6"
                  width="26"
                  height="16"
                  rx="4"
                  fill={cmfAssignment.dial.hex}
                  stroke="#191919"
                  strokeWidth="2.5"
                />
                {/* Front Platter Ring */}
                <circle
                  cx="58"
                  cy="58"
                  r="28"
                  fill={cmfAssignment.accent.hex}
                  stroke="#191919"
                  strokeWidth="2.5"
                />
                <circle cx="58" cy="58" r="10" fill="#191919" />
              </svg>

              <div className="flex-1 space-y-1.5 text-xs">
                {(['shell', 'dial', 'accent'] as const).map((slotKey) => {
                  const active = selectedSlot === slotKey;
                  const sw = cmfAssignment[slotKey];
                  return (
                    <button
                      key={slotKey}
                      type="button"
                      onClick={() => setSelectedSlot(slotKey)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const swatchId = e.dataTransfer.getData('text/plain');
                        const found = PLAYGROUND_SWATCHES.find((s) => s.id === swatchId);
                        if (found) {
                          setCmfAssignment((prev) => ({ ...prev, [slotKey]: found }));
                        }
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg border border-[#191919] flex items-center justify-between text-left cursor-pointer ${
                        active ? 'bg-[#F7E36B] font-bold' : 'bg-white'
                      }`}
                    >
                      <span className="uppercase font-mono-tech text-[11px]">
                        {slotKey}: {sw.name}
                      </span>
                      <span
                        style={{ backgroundColor: sw.hex }}
                        className="w-4 h-4 rounded-full border border-[#191919] shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Draggable / Clickable Swatch Grid */}
            <div className="grid grid-cols-3 gap-2">
              {PLAYGROUND_SWATCHES.map((sw) => (
                <button
                  key={sw.id}
                  type="button"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', sw.id)}
                  onClick={() => handleAssignSwatch(sw)}
                  style={{ backgroundColor: sw.hex, color: sw.textColor }}
                  className="p-2.5 rounded-xl border-2 border-[#191919] text-left transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <div className="font-mono-tech text-[10px] opacity-85">{sw.pantoneCode}</div>
                  <div className="font-bold text-xs leading-tight mt-1">{sw.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#191919]/15 font-mono-tech text-xs text-[#515151] flex items-center justify-between">
            <span>TARGET SLOT: {selectedSlot.toUpperCase()}</span>
            <span>{cmfAssignment[selectedSlot].hex}</span>
          </div>
        </div>

        {/* EXPERIMENT 02: Parametric 8-Arm Asterisk & Symbol Morph Builder */}
        <div
          id="asterisk-lab"
          className="bg-[#FF735D] border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#191919]/25">
              <span className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#191919]">
                <Sparkles className="w-4 h-4" />
                <span>EXP 02 · ASTERISK LAB</span>
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#191919]">
                {armCount * 2}-POINT RADIAL
              </span>
            </div>

            <h3 className="font-condensed font-extrabold text-[26px] uppercase text-[#191919] leading-tight mb-2">
              Parametric Brand Symbol Generator
            </h3>
            <p className="text-xs text-[#191919]/85 mb-4">
              Morph the studio’s signature radial asterisk by tuning spoke count, stroke mass, and rotational offset.
            </p>

            {/* Live SVG Asterisk Viewport */}
            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-4 mb-4 flex items-center justify-center h-44 relative">
              <svg
                viewBox="-60 -60 120 120"
                className="w-36 h-36 text-[#191919] transition-transform duration-200"
                aria-label={`${armCount * 2}-pointed parametric asterisk symbol`}
              >
                <g
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeLinecap={roundCaps ? 'round' : 'butt'}
                >
                  {spokes.map((s, idx) => (
                    <line key={idx} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
                  ))}
                </g>
              </svg>
              <button
                type="button"
                onClick={() => setRoundCaps((r) => !r)}
                className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#F7E36B] border border-[#191919] font-mono-tech text-[10px] font-bold uppercase cursor-pointer"
              >
                CAPS: {roundCaps ? 'ROUND' : 'SQUARE'}
              </button>
            </div>

            {/* Parametric Sliders */}
            <div className="space-y-3 bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-3.5 text-xs">
              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="asterisk-arms-slider">SPOKE AXES ({armCount * 2} TIPS)</label>
                  <span>{armCount} AXES</span>
                </div>
                <input
                  id="asterisk-arms-slider"
                  type="range"
                  min={2}
                  max={8}
                  value={armCount}
                  onChange={(e) => setArmCount(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="asterisk-weight-slider">STROKE WEIGHT</label>
                  <span>{strokeWidth}PX</span>
                </div>
                <input
                  id="asterisk-weight-slider"
                  type="range"
                  min={4}
                  max={22}
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="asterisk-rotation-slider">PHASE ROTATION</label>
                  <span>{rotationDeg}°</span>
                </div>
                <input
                  id="asterisk-rotation-slider"
                  type="range"
                  min={0}
                  max={90}
                  value={rotationDeg}
                  onChange={(e) => setRotationDeg(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#191919]/25 font-mono-tech text-xs text-[#191919] flex items-center justify-between">
            <span>GEOMETRY: VECTOR RADIAL</span>
            <span>KINDRED OPEN SPEC</span>
          </div>
        </div>

        {/* EXPERIMENT 03: Tactile Switch & Spring Button Microinteraction Lab */}
        <div className="bg-[#D5C8FC] border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#191919]/20">
              <span className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#191919]">
                <Gauge className="w-4 h-4" />
                <span>EXP 03 · SWITCH PHYSICS LAB</span>
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#3049F0]">
                CYCLES: {pressCount}
              </span>
            </div>

            <h3 className="font-condensed font-extrabold text-[26px] uppercase text-[#191919] leading-tight mb-2">
              Tactile Keycap &amp; Spring Tester
            </h3>
            <p className="text-xs text-[#191919]/85 mb-4">
              Tune actuation travel and spring force, then press the physical test plunger to inspect compression depth.
            </p>

            {/* Physical Plunger Button Stage */}
            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-5 mb-4 flex flex-col items-center justify-center h-44">
              <button
                type="button"
                onClick={triggerTactilePress}
                style={{
                  transform: isKeyPressed
                    ? `translateY(${Math.round(switchTravelMm * 2.2)}px) scale(0.97)`
                    : 'translateY(0px) scale(1)'
                }}
                className="px-8 py-5 rounded-2xl bg-[#F7E36B] border-[3px] border-[#191919] shadow-[0_8px_0_#191919] active:shadow-[0_2px_0_#191919] transition-all duration-150 cursor-pointer"
              >
                <span className="font-display uppercase text-2xl tracking-wider text-[#191919] block">
                  PRESS PLUNGER
                </span>
                <span className="font-mono-tech text-[11px] text-[#515151] block mt-0.5">
                  {switchTravelMm.toFixed(1)}MM TRAVEL · {springForceG}GF
                </span>
              </button>
            </div>

            {/* Travel & Force Sliders */}
            <div className="space-y-3 bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-3.5 text-xs">
              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="switch-travel-slider">ACTUATION TRAVEL</label>
                  <span>{switchTravelMm.toFixed(1)} MM</span>
                </div>
                <input
                  id="switch-travel-slider"
                  type="range"
                  min={1.5}
                  max={6.0}
                  step={0.5}
                  value={switchTravelMm}
                  onChange={(e) => setSwitchTravelMm(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="spring-force-slider">BOTTOM-OUT SPRING FORCE</label>
                  <span>{springForceG} GF</span>
                </div>
                <input
                  id="spring-force-slider"
                  type="range"
                  min={35}
                  max={85}
                  step={5}
                  value={springForceG}
                  onChange={(e) => setSpringForceG(Number(e.target.value))}
                  className="w-full accent-[#FF735D] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#191919]/20 font-mono-tech text-xs text-[#191919] flex items-center justify-between">
            <span>FEEL: {springForceG >= 65 ? 'HEAVY TACTILE' : 'LIGHT DETENT'}</span>
            <span>COUNT: {pressCount} ACTUATIONS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
