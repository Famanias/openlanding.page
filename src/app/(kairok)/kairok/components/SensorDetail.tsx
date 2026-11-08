'use client';
import React, { useState } from 'react';
import {
  ENGINEERING_CALLOUTS,
  EngineeringCallout,
  KAIRO_ASSETS,
} from '../lib/assets';

export const SensorDetail: React.FC = () => {
  const [selectedCalloutId, setSelectedCalloutId] =
    useState<EngineeringCallout['id']>('optical-assembly');
  const [sensorClipView, setSensorClipView] = useState<'full' | 'core'>('full');

  const activeCallout =
    ENGINEERING_CALLOUTS.find((c) => c.id === selectedCalloutId) ||
    ENGINEERING_CALLOUTS[0];

  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="kairo-carbon-chapter relative py-20 md:py-32 px-5 md:px-10 border-t border-[#f2efe9]/12"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#f2efe9]/12">
          <div className="lg:col-span-4 flex items-baseline gap-4">
            <span className="font-display-kairo text-6xl md:text-8xl font-semibold tracking-tighter text-[#f2efe9]/15 select-none">
              02
            </span>
            <div>
              <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#e68f63]">
                PRECISION ENGINEERING
              </p>
              <p className="text-xs text-[#a8aaa9] mt-1">
                Internal Optical & Mechanical Architecture
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2
              id="engineering-heading"
              style={{ textWrap: 'balance' }}
              className="font-display-kairo text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.06] tracking-tight text-[#f2efe9]"
            >
              Form meets focus. Every element aligned on a single axis.
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-[#a8aaa9]">
              Inspect the disassembled K-01 architecture. Select an assembly callout
              below or directly on the optical diagram to shift framing across the
              barrel, sensor throat, and milled top plate.
            </p>
          </div>
        </div>

        {/* Accessible Callout Selector Bar */}
        <div
          role="tablist"
          aria-label="Exploded camera assembly callouts"
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          {ENGINEERING_CALLOUTS.map((callout) => {
            const active = callout.id === selectedCalloutId;
            return (
              <button
                key={callout.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCalloutId(callout.id)}
                className={`px-4 py-2.5 text-xs font-mono-kairo rounded-[2px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold'
                    : 'bg-[#1d2024] text-[#f2efe9]/80 border-[#f2efe9]/15 hover:border-[#e68f63]'
                }`}
              >
                {callout.index} · {callout.label}
              </button>
            );
          })}
        </div>

        {/* Dominant Exploded Camera Composition + Interactive Callout Pins */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 relative overflow-hidden rounded-[2px] bg-[#0d0e10] border border-[#f2efe9]/15 min-h-[340px] md:min-h-[480px]">
            <img
              src={KAIRO_ASSETS.exploded}
              alt="Exploded engineering view of the KAIRO K-01 camera showing multi-element lens glass, copper ring, bayonet mount, sensor, and body"
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                objectPosition: `${activeCallout.imagePanXPercent}% 50%`,
                transform: `scale(${activeCallout.imageScale})`,
                transformOrigin: `${activeCallout.xPercent}% ${activeCallout.yPercent}%`,
              }}
              className="kairo-pan-surface w-full h-full object-cover select-none"
            />

            {/* Interactive Callout Pins Anchored to Image Regions */}
            {ENGINEERING_CALLOUTS.map((callout) => {
              const isSelected = callout.id === selectedCalloutId;
              return (
                <button
                  key={callout.id}
                  type="button"
                  aria-label={`Inspect ${callout.label}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCalloutId(callout.id)}
                  style={{
                    left: `${callout.xPercent}%`,
                    top: `${callout.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-[2px] border font-mono-kairo text-[11px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#e68f63] text-[#121315] border-[#e68f63] font-semibold scale-105 shadow-[0_0_24px_rgba(230,143,99,0.5)]'
                      : 'bg-[#121315]/85 text-[#f2efe9] border-[#f2efe9]/35 hover:border-[#e68f63]'
                  }`}
                >
                  <span>{callout.index}</span>
                  <span className="hidden sm:inline"> · {callout.label}</span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono-kairo text-[#a8aaa9] bg-[#121315]/80 backdrop-blur-md px-4 py-2 rounded-[2px] border border-[#f2efe9]/10">
              <span>ACTIVE CALLOUT: {activeCallout.code}</span>
              <span>CONCEPT EXPLODED DIAGRAM</span>
            </div>
          </div>

          {/* Active Callout Engineering Note Panel */}
          <div
            aria-live="polite"
            className="lg:col-span-4 flex flex-col justify-between bg-[#1d2024] p-6 md:p-8 rounded-[2px] border border-[#f2efe9]/12"
          >
            <div>
              <div className="flex items-center justify-between font-mono-kairo text-xs text-[#e68f63]">
                <span>ASSEMBLY NOTE {activeCallout.index}</span>
                <span>{activeCallout.code}</span>
              </div>
              <h3 className="font-display-kairo mt-3 text-2xl font-semibold text-[#f2efe9]">
                {activeCallout.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#f2efe9]/80">
                {activeCallout.summary}
              </p>

              <ul className="mt-6 space-y-3 border-t border-[#f2efe9]/12 pt-5">
                {activeCallout.detailPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs md:text-sm text-[#a8aaa9]"
                  >
                    <span className="font-mono-kairo text-[#e68f63] shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 pt-4 border-t border-[#f2efe9]/10 font-mono-kairo text-[11px] text-[#a8aaa9]">
              Illustrative concept architecture · Static high-resolution study
            </p>
          </div>
        </div>

        {/* Secondary Detail Panel: Sensor & Bayonet Mount (`kairo-05-sensor-detail.webp`) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#181a1e] p-6 md:p-10 rounded-[2px] border border-[#f2efe9]/12">
          <div className="lg:col-span-5">
            <p className="font-mono-kairo text-xs tracking-[0.18em] text-[#e68f63]">
              RECESSED SENSOR CHAMBER
            </p>
            <h3 className="font-display-kairo mt-2 text-2xl md:text-3xl font-semibold text-[#f2efe9]">
              Short-flange mount built around light integrity.
            </h3>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-[#a8aaa9]">
              Removing the mechanical mirror box allows the rear optical element to
              sit millimeters from the imaging plane. Toggle the inspection mask to
              isolate the gold contact throat and anti-reflective sensor surround.
            </p>

            <div
              role="group"
              aria-label="Sensor mount inspection view"
              className="mt-6 inline-flex items-center gap-2 bg-[#121315] p-1.5 rounded-[2px] border border-[#f2efe9]/15"
            >
              <button
                type="button"
                aria-pressed={sensorClipView === 'full'}
                onClick={() => setSensorClipView('full')}
                className={`px-3.5 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors cursor-pointer ${
                  sensorClipView === 'full'
                    ? 'bg-[#f2efe9] text-[#121315] font-semibold'
                    : 'text-[#a8aaa9] hover:text-[#f2efe9]'
                }`}
              >
                Full Mount Assembly
              </button>
              <button
                type="button"
                aria-pressed={sensorClipView === 'core'}
                onClick={() => setSensorClipView('core')}
                className={`px-3.5 py-2 text-xs font-mono-kairo rounded-[2px] transition-colors cursor-pointer ${
                  sensorClipView === 'core'
                    ? 'bg-[#e68f63] text-[#121315] font-semibold'
                    : 'text-[#a8aaa9] hover:text-[#f2efe9]'
                }`}
              >
                Isolate Sensor Plane
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative overflow-hidden rounded-[2px] bg-[#121315] border border-[#f2efe9]/15 h-[300px] md:h-[380px]">
            <img
              src={KAIRO_ASSETS.sensor}
              alt="Macro closeup of the KAIRO K-01 camera sensor plane and machined lens mount"
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{
                transform: sensorClipView === 'core' ? 'scale(1.28)' : 'scale(1.0)',
                clipPath:
                  sensorClipView === 'core'
                    ? 'inset(8% 12% 8% 12% round 2px)'
                    : 'inset(0% 0% 0% 0% round 2px)',
              }}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute bottom-3 right-3 bg-[#121315]/85 backdrop-blur-md px-3 py-1.5 rounded-[2px] border border-[#f2efe9]/15 font-mono-kairo text-[11px] text-[#e68f63]">
              {sensorClipView === 'core'
                ? 'SENSOR PLANE · MICROLENS SURFACE STUDY'
                : 'BAYONET THROAT · FULL MOUNT VIEW'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
