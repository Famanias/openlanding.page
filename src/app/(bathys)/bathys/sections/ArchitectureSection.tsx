"use client";

import React, { useState } from "react";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

type SubAssembly = {
  id: string;
  name: string;
  code: string;
  headline: string;
  specs: { label: string; value: string }[];
  description: string;
};

const SUB_ASSEMBLIES: SubAssembly[] = [
  {
    id: "hull",
    name: "Titanium Pressure Sphere",
    code: "HULL-TI-64",
    headline: "Grade 5 Titanium Dual-Hemisphere Shell",
    specs: [
      { label: "Material", value: "Ti-6Al-4V Grade 5" },
      { label: "Wall Thickness", value: "64 mm" },
      { label: "Internal Diameter", value: "1,800 mm" },
      { label: "Collapse Pressure", value: "1,650 bar" },
    ],
    description:
      "Precision-machined from two solid forged titanium billets in Brest, diffusion-bonded along the equatorial seam. Houses all core flight compute, inertial guidance, and scientific telemetry payloads in an unpressurized 1-atmosphere internal environment.",
  },
  {
    id: "buoyancy",
    name: "Syntactic Foam Core",
    code: "BUOY-SF-54",
    headline: "Hadal Syntactic Glass Micro-Sphere Matrix",
    specs: [
      { label: "Density", value: "0.54 g/cm³" },
      { label: "Matrix", value: "Epoxy + Borosilicate Bubbles" },
      { label: "Service Depth", value: "12,000 metres" },
      { label: "Water Absorption", value: "<0.08% after 72h" },
    ],
    description:
      "Solid micro-cellular matrix providing positive buoyancy without hollow void spaces. Engineered to eliminate hydrostatic volume compaction under 1,100 bar, guaranteeing stable ascent buoyancy upon magnetic ballast drop.",
  },
  {
    id: "propulsion",
    name: "Magnetic Thruster Pods",
    code: "PROP-MAG-04",
    headline: "Rim-Driven Brushless Magnetic Induction",
    specs: [
      { label: "Configuration", value: "6-Axis Vector Array" },
      { label: "Thrust Output", value: "480 N per pod" },
      { label: "Shaft Seals", value: "None (Magnetic Coupling)" },
      { label: "Cooling", value: "Direct Hadal Ambient 1.8°C" },
    ],
    description:
      "Shaftless rim-driven propulsors eliminating traditional rotary dynamic shaft seals. The propeller blades are integrated directly into a magnetic rotor driven by stator coils isolated within the pressure-compensated shroud.",
  },
  {
    id: "power",
    name: "Pressure-Compensated Battery",
    code: "PWR-LIS-140",
    headline: "Dielectric Fluid-Bathed Lithium-Sulfur Core",
    specs: [
      { label: "Capacity", value: "140 kWh" },
      { label: "Chemistry", value: "Lithium-Sulfur (Li-S)" },
      { label: "Housing", value: "Silicone Oil Ambient Compensated" },
      { label: "Continuous Life", value: "72 hours at 1,100 bar" },
    ],
    description:
      "Subsea battery cells immersed in low-viscosity dielectric silicone oil with a flexible diaphragm reservoir that equalizes internal cell pressure with external hydrostatic load, eliminating heavy battery pressure vessels.",
  },
];

export function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState<string>("hull");
  const activeSub = SUB_ASSEMBLIES.find((s) => s.id === activeTab) ?? SUB_ASSEMBLIES[0];

  return (
    <section id="architecture" className="py-24 border-b border-glass relative overflow-hidden">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            03 // Structural Engineering
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Vehicle Architecture &amp; Pressure Hull
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Engineered from Grade 5 titanium, borosilicate syntactic foam, and magnetic-induction propulsion to withstand 1,114 bar crushing pressure without mechanical failure.
          </p>
        </Reveal>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-glass pb-4" role="tablist">
          {SUB_ASSEMBLIES.map((sub) => (
            <button
              key={sub.id}
              role="tab"
              aria-selected={activeTab === sub.id}
              onClick={() => setActiveTab(sub.id)}
              className={`bat-btn text-xs py-2 px-4 rounded ${
                activeTab === sub.id
                  ? "bg-cyan text-trench font-bold"
                  : "bg-navy/70 text-mist border border-glass hover:border-slate"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Interactive Exploded View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vector Hull Blueprint Graphic */}
          <div className="lg:col-span-7 bg-navy/80 border border-glass rounded-xl p-6 sm:p-8 relative flex items-center justify-center">
            <svg
              viewBox="0 0 500 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-[460px]"
              aria-label="Exploded Subsea Vehicle Schematic"
            >
              {/* Reference Grid */}
              <rect x="10" y="10" width="480" height="340" rx="8" stroke="#122338" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="250" y1="20" x2="250" y2="340" stroke="#122338" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="180" x2="480" y2="180" stroke="#122338" strokeWidth="1" strokeDasharray="3 3" />

              {/* Syntactic Foam Upper Shell */}
              <path
                d="M120 120 C120 70, 380 70, 380 120 L360 150 L140 150 Z"
                fill={activeTab === "buoyancy" ? "rgba(0, 229, 255, 0.25)" : "rgba(18, 35, 56, 0.4)"}
                stroke={activeTab === "buoyancy" ? "#00E5FF" : "#546E8A"}
                strokeWidth={activeTab === "buoyancy" ? "2.5" : "1.5"}
              />
              <text x="250" y="115" fill={activeTab === "buoyancy" ? "#00E5FF" : "#8DA8C2"} fontFamily="var(--font-share-mono, monospace)" fontSize="10" textAnchor="middle">
                SYNTACTIC FOAM FAIRING
              </text>

              {/* Central Titanium Pressure Sphere */}
              <circle
                cx="250"
                cy="190"
                r="70"
                fill={activeTab === "hull" ? "rgba(0, 229, 255, 0.2)" : "rgba(10, 21, 38, 0.9)"}
                stroke={activeTab === "hull" ? "#00E5FF" : "#EDF5FA"}
                strokeWidth={activeTab === "hull" ? "3" : "2"}
              />
              <circle cx="250" cy="190" r="54" stroke="#546E8A" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="180" y1="190" x2="320" y2="190" stroke="#546E8A" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="250" cy="190" r="8" fill="#00E5FF" />
              <text x="250" y="194" fill="#EDF5FA" fontFamily="var(--font-share-mono, monospace)" fontSize="9" textAnchor="middle" dy="16">
                TI-6AL-4V SPHERE
              </text>

              {/* Left / Right Magnetic Thruster Pods */}
              <g
                stroke={activeTab === "propulsion" ? "#00E5FF" : "#546E8A"}
                strokeWidth={activeTab === "propulsion" ? "2" : "1.2"}
                fill={activeTab === "propulsion" ? "rgba(0, 229, 255, 0.2)" : "rgba(18, 35, 56, 0.5)"}
              >
                {/* Left Thruster */}
                <rect x="70" y="170" width="40" height="40" rx="4" />
                <line x1="60" y1="190" x2="70" y2="190" />
                {/* Right Thruster */}
                <rect x="390" y="170" width="40" height="40" rx="4" />
                <line x1="430" y1="190" x2="440" y2="190" />
              </g>

              {/* Lower Battery Tray */}
              <rect
                x="150"
                y="275"
                width="200"
                height="35"
                rx="6"
                fill={activeTab === "power" ? "rgba(0, 229, 255, 0.2)" : "rgba(18, 35, 56, 0.5)"}
                stroke={activeTab === "power" ? "#00E5FF" : "#546E8A"}
                strokeWidth={activeTab === "power" ? "2.5" : "1.5"}
              />
              <text x="250" y="297" fill={activeTab === "power" ? "#00E5FF" : "#8DA8C2"} fontFamily="var(--font-share-mono, monospace)" fontSize="9" textAnchor="middle">
                LITHIUM-SULFUR BATTERY TRAY
              </text>
            </svg>
          </div>

          {/* Right Column: Active Sub-Assembly Specification */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <TiltCard className="p-6">
              <div className="flex items-center justify-between border-b border-glass pb-3 mb-4">
                <span className="bat-mono text-xs text-cyan font-bold">{activeSub.code}</span>
                <span className="bat-mono text-[11px] text-slate">SPECIFICATION DOSSIER</span>
              </div>

              <h3 className="bat-display text-2xl font-bold uppercase text-titanium mb-2">
                {activeSub.headline}
              </h3>

              <p className="text-sm text-mist leading-relaxed font-body mb-6">
                {activeSub.description}
              </p>

              <div className="grid grid-cols-2 gap-3 border-t border-glass pt-4">
                {activeSub.specs.map((s) => (
                  <div key={s.label} className="bg-glass/50 p-3 rounded">
                    <span className="bat-mono text-[10px] text-slate uppercase block">
                      {s.label}
                    </span>
                    <span className="bat-mono text-sm font-bold text-titanium block mt-0.5">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
