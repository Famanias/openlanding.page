"use client";

import React from "react";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

const SENSORS = [
  {
    code: "SNS-SAS-120",
    name: "Synthetic Aperture Sonar",
    metric: "0.05 M Resolution",
    band: "120 kHz High-Frequency Chirp",
    description:
      "Wide-swath bathymetric interferometer generating real-time centimeter-accurate 3D point clouds of the hadal seafloor, sub-bottom strata, and trench scarp formations.",
  },
  {
    code: "SNS-CTD-04",
    name: "Ultra-Deep CTD Probe",
    metric: "±0.001 °C Accuracy",
    band: "Titanium Bulkhead Penetrator",
    description:
      "Calibrated oceanographic sensor measuring Conductivity, Temperature, and Depth. Captures in-situ salinity gradients and physical sound velocity profiles down to 10,928 metres.",
  },
  {
    code: "SNS-RAMAN-532",
    name: "Laser Raman Spectrometer",
    metric: "532 nm Nd:YAG Laser",
    band: "Non-Destructive In-Situ Assay",
    description:
      "Deep-sea optical spectrometer focusing a green laser beam through a sapphire window to identify mineral crystal lattices, dissolved gas phases, and hadal hydrothermal chemistry.",
  },
  {
    code: "SNS-CORE-HYP",
    name: "Isobaric Benthic Sampler",
    metric: "4 × 500 mm Sediment Core",
    band: "Hydraulic Seal Lock",
    description:
      "Articulated hydraulic rotary corer engineered to recover trench-floor sediment and benthic microorganisms while retaining ambient hydrostatic pressure during ascent to surface.",
  },
];

export function SensorSuiteSection() {
  return (
    <section id="sensors" className="py-24 border-b border-glass bg-navy/30 relative">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            04 // Oceanographic Instrumentation
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Hadal Bathymetric Sensor Suite
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Equipped with multi-sensor payloads calibrated for extreme hydrostatic pressures, delivering sub-decimeter topographical mapping and in-situ chemical spectroscopy.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SENSORS.map((sensor, idx) => (
            <Reveal key={sensor.code} variant="rise" index={idx} delay={idx * 60}>
              <TiltCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-glass pb-3 mb-4">
                    <span className="bat-mono text-xs text-cyan font-bold">{sensor.code}</span>
                    <span className="bat-mono text-[11px] text-amber font-semibold">{sensor.metric}</span>
                  </div>
                  <h3 className="bat-display text-xl font-bold uppercase text-titanium mb-2">
                    {sensor.name}
                  </h3>
                  <p className="text-sm text-mist leading-relaxed font-body mb-4">
                    {sensor.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-glass flex items-center justify-between bat-mono text-[11px] text-slate">
                  <span>SPECIFICATION</span>
                  <span className="text-titanium">{sensor.band}</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
