"use client";

import React, { useState } from "react";
import { Reveal } from "../motion/Reveal";

const DOSSIERS = [
  {
    id: "mariana",
    title: "Challenger Deep Sounding",
    trench: "Mariana Trench, Western Pacific",
    depth: "10,928 M",
    pressure: "1,114.2 BAR",
    coordinates: "11°22.4' N · 142°35.5' E",
    hours: "72.4 HRS SUBMERGED",
    achievements: [
      "Continuous 0.05m multibeam bathymetric map across 42 km of trench axis",
      "In-situ Raman spectroscopy detection of mantle serpentinization",
      "Full autonomous acoustic homing and recovery without beacon tether",
    ],
  },
  {
    id: "puerto-rico",
    title: "Milwaukee Deep Fault Survey",
    trench: "Puerto Rico Trench, Atlantic Ocean",
    depth: "8,376 M",
    pressure: "852.0 BAR",
    coordinates: "19°35.0' N · 66°30.0' W",
    hours: "48.0 HRS SUBMERGED",
    achievements: [
      "Subduction zone micro-seismic fracture lineation mapping",
      "Recovery of 12 undisturbed hadal sediment cores under pressure lock",
      "Doppler velocity navigation in 0.8 knot deep benthic current",
    ],
  },
  {
    id: "kermadec",
    title: "Scholl Deep Hydrothermal Sweep",
    trench: "Kermadec Trench, South Pacific",
    depth: "10,047 M",
    pressure: "1,024.5 BAR",
    coordinates: "32°30.0' S · 178°15.0' W",
    hours: "64.2 HRS SUBMERGED",
    achievements: [
      "Detection of deep hydrothermal venting at tectonic trench junction",
      "Magnetometer anomaly characterization along subducting Pacific plate",
      "Bioluminescent optical sensor capture of hadal amphipod colonies",
    ],
  },
];

export function TrenchDossiersSection() {
  const [activeDossier, setActiveDossier] = useState(0);
  const current = DOSSIERS[activeDossier];

  return (
    <section id="dossiers" className="py-24 border-b border-glass relative">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            05 // Field Operations
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Hadal Trench Mission Dossiers
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Verified field records of uncrewed autonomous dives executed in the deepest hadopelagic trenches on Earth.
          </p>
        </Reveal>

        {/* Dossier Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-glass pb-4">
          {DOSSIERS.map((d, index) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDossier(index)}
              className={`bat-btn text-xs py-2 px-4 rounded ${
                activeDossier === index
                  ? "bg-cyan text-trench font-bold"
                  : "bg-navy/70 text-mist border border-glass hover:border-slate"
              }`}
            >
              {d.trench.split(",")[0]}
            </button>
          ))}
        </div>

        {/* Active Mission Dossier Card */}
        <div className="bg-navy border border-glass rounded-xl p-6 sm:p-10 relative overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-glass pb-6 mb-8">
            <div>
              <span className="bat-mono text-xs text-cyan uppercase tracking-wider font-bold">
                {current.trench}
              </span>
              <h3 className="bat-display text-2xl sm:text-4xl font-bold uppercase text-titanium mt-1">
                {current.title}
              </h3>
            </div>
            <div className="text-left sm:text-right bat-mono">
              <span className="text-slate text-xs uppercase block">Coordinates</span>
              <span className="text-amber font-bold text-sm">{current.coordinates}</span>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-glass/40 p-4 rounded-lg border border-glass">
              <span className="bat-mono text-xs text-slate uppercase block">Max Depth Logged</span>
              <span className="bat-mono text-2xl sm:text-3xl font-bold text-titanium mt-1 block">
                {current.depth}
              </span>
            </div>
            <div className="bg-glass/40 p-4 rounded-lg border border-glass">
              <span className="bat-mono text-xs text-slate uppercase block">Hydrostatic Peak Load</span>
              <span className="bat-mono text-2xl sm:text-3xl font-bold text-cyan mt-1 block">
                {current.pressure}
              </span>
            </div>
            <div className="bg-glass/40 p-4 rounded-lg border border-glass">
              <span className="bat-mono text-xs text-slate uppercase block">Mission Duration</span>
              <span className="bat-mono text-2xl sm:text-3xl font-bold text-titanium mt-1 block">
                {current.hours}
              </span>
            </div>
          </div>

          {/* Mission Achievements */}
          <div>
            <h4 className="bat-mono text-xs uppercase tracking-wider text-slate mb-3">
              Operational Deliverables &amp; Scientific Outcomes
            </h4>
            <ul className="space-y-2.5">
              {current.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-mist font-body">
                  <span className="text-cyan font-bold mt-0.5">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
