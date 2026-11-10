'use client';

import React, { useState } from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

interface MaterialStudy {
  id: string;
  index: string;
  code: string;
  title: string;
  origin: string;
  finish: string;
  description: string;
  textureUrl: string;
  pairedObjectUrl: string;
  pairedObjectCaption: string;
  swatchHex: string;
}

const MATERIAL_STUDIES: MaterialStudy[] = [
  {
    id: 'timber',
    index: '01',
    code: 'MAT-W07',
    title: 'Oiled Quartersawn Walnut & Oak',
    origin: 'FSC-Certified European & North American Timber',
    finish: 'Hand-rubbed plant oil & matte beeswax',
    description:
      'Selected for straight architectural grain and warm honey-to-umber undertones. Left open-pored so the surface deepens in character with light and daily touch.',
    textureUrl: HOLLOWAY_ASSETS.woodTexture,
    pairedObjectUrl: HOLLOWAY_ASSETS.tableAlpha,
    pairedObjectCaption: 'HW-092-T3 · Plinth Low Table in Oiled Walnut',
    swatchHex: '#B88C60',
  },
  {
    id: 'boucle',
    index: '02',
    code: 'MAT-F09',
    title: 'Powder-Blue Architectural Wool Weave',
    origin: '100% Combed Norwegian & New Zealand Virgin Wool',
    finish: 'Two-tone yarn-dyed plain weave (100,000 Martindale)',
    description:
      'Engineered to hold crisp rectilinear tailoring across modular seating while offering breathable domestic softness in every season.',
    textureUrl: HOLLOWAY_ASSETS.fabricTexture,
    pairedObjectUrl: HOLLOWAY_ASSETS.sofaAlpha,
    pairedObjectCaption: 'HW-092-S1 · Atelier 01 Modular Sofa in Powder Blue',
    swatchHex: '#A6BBC7',
  },
  {
    id: 'plaster',
    index: '03',
    code: 'MAT-S08',
    title: 'Warm Mineral Lime & Travertine Finish',
    origin: 'Slaked Dolomitic Lime & Crushed Marble Aggregate',
    finish: 'Matte mineral wash & powder-coated architectural steel',
    description:
      'Provides the quiet, light-diffusing backdrop and structural shelving tone that anchors both warm timber and deep oxblood upholstery.',
    textureUrl: HOLLOWAY_ASSETS.plasterTexture,
    pairedObjectUrl: HOLLOWAY_ASSETS.shelfAlpha,
    pairedObjectCaption: 'HW-092-SH4 · Cadence Open Shelving in Mineral Steel',
    swatchHex: '#E8E2D5',
  },
];

interface FeaturedObjectsProps {
  onSelectForStudio: (moduleId: string) => void;
}

export default function FeaturedObjects({ onSelectForStudio }: FeaturedObjectsProps) {
  const [activeMaterialId, setActiveMaterialId] = useState<string>('timber');
  const activeMaterial =
    MATERIAL_STUDIES.find((m) => m.id === activeMaterialId) ?? MATERIAL_STUDIES[0];

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#F5F2EA] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Section Datum Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>03 / FEATURED OBJECTS & MATERIAL PALETTE</span>
          <span className="hidden sm:inline">TACTILE HONESTY · SOFTNESS VERSUS STRUCTURE</span>
          <span>ARCHIVE 092-M</span>
        </div>

        {/* Part A: Asymmetrical Editorial Object Studies (Seating, Storage, Illumination) */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
              FORM & PROPORTION
            </p>
            <h2
              id="materials-heading"
              style={{ textWrap: 'balance' }}
              className="mt-3 font-editorial text-[38px] sm:text-[46px] md:text-[54px] font-normal leading-[1.02] tracking-[0.01em] text-[#262824] uppercase"
            >
              SOFTNESS HELD BY STRUCTURE.
            </h2>
            <p className="mt-5 font-ui text-[15px] md:text-[16px] leading-[1.7] text-[#262824]/80">
              Every HOLLOWAY object balances architectural discipline with tactile warmth. Deep
              upholstered volumes rest on slender timber plinths; open shelving frames air and light
              rather than closing off walls.
            </p>
          </div>

          {/* Asymmetrical Diptych: Lounge Chair + Floor Lamp */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 items-end">
            <article className="sm:col-span-7 border border-[#262824]/20 bg-[#ECE7DC] p-5">
              <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974] pb-3 border-b border-[#262824]/15">
                <span>STUDY A · MODULAR SEATING</span>
                <span>820 × 840 MM</span>
              </div>
              <div className="mt-4 aspect-[4/3] overflow-hidden bg-[#F5F2EA]">
                <img
                  src={HOLLOWAY_ASSETS.chairAlpha}
                  alt="HOLLOWAY Vesper Lounge Chair upholstered in muted burgundy wool on a turned walnut base"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-[24px] text-[#262824]">
                    Vesper Lounge Chair
                  </h3>
                  <p className="mt-1 font-ui text-[13.5px] leading-[1.55] text-[#262824]/75">
                    Muted oxblood wool shell with curved acoustic embrace and solid walnut legs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectForStudio('chair')}
                  className="font-drafting text-[10.5px] uppercase tracking-[0.12em] text-[#262824] border-b border-[#262824]/60 pb-0.5 hover:text-[#874C54] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  STUDIO ↗
                </button>
              </div>
            </article>

            <article className="sm:col-span-5 border border-[#262824]/20 bg-[#ECE7DC] p-5">
              <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974] pb-3 border-b border-[#262824]/15">
                <span>STUDY B · ILLUMINATION</span>
                <span>H 1480 MM</span>
              </div>
              <div className="mt-4 aspect-square overflow-hidden bg-[#F5F2EA]">
                <img
                  src={HOLLOWAY_ASSETS.lampAlpha}
                  alt="HOLLOWAY Column Floor Lamp with warm parchment shade and oxblood steel stem"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-[22px] text-[#262824]">
                    Column Floor Lamp
                  </h3>
                  <p className="mt-1 font-ui text-[13px] leading-[1.55] text-[#262824]/75">
                    Hand-laid Washi diffuser casting a warm perimeter glow.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectForStudio('lamp')}
                  className="font-drafting text-[10.5px] uppercase tracking-[0.12em] text-[#262824] border-b border-[#262824]/60 pb-0.5 hover:text-[#874C54] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  STUDIO ↗
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* Part B: Interactive Materiality & Texture Workbench */}
        <div className="mt-20 md:mt-24 border-t border-[#262824]/20 pt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
            <div>
              <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
                TACTILE PALETTE
              </p>
              <h3 className="mt-2 font-editorial text-[32px] md:text-[40px] font-normal text-[#262824] uppercase">
                RAW SURFACES, MEASURED WARMTH.
              </h3>
            </div>
            <p className="font-drafting text-[11px] text-[#777974] uppercase">
              SELECT SWATCH TO INSPECT GRAIN & APPLICATION
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Material Swatch Selector Tabs */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {MATERIAL_STUDIES.map((study) => {
                const isSelected = study.id === activeMaterial.id;
                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => setActiveMaterialId(study.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-5 border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                      isSelected
                        ? 'border-[#262824] bg-[#ECE7DC]'
                        : 'border-[#262824]/15 bg-[#F5F2EA] hover:border-[#262824]/45'
                    }`}
                  >
                    <div className="flex items-center justify-between font-drafting text-[10.5px] text-[#777974]">
                      <span>
                        {study.index} / {study.code}
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-block h-3.5 w-3.5 border border-[#262824]/40"
                        style={{ backgroundColor: study.swatchHex }}
                      />
                    </div>
                    <h4 className="mt-2 font-editorial text-[24px] text-[#262824]">
                      {study.title}
                    </h4>
                    <p className="mt-1 font-drafting text-[10.5px] text-[#777974] uppercase">
                      {study.origin}
                    </p>
                    <p className="mt-2.5 font-ui text-[13.5px] leading-[1.6] text-[#262824]/80">
                      {study.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Macro Texture + Paired Object Comparison */}
            <div className="lg:col-span-7 border border-[#262824]/20 bg-[#ECE7DC] p-6 md:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#262824]/15 pb-3 font-drafting text-[10.5px] text-[#262824] uppercase">
                <span>MACRO SURFACE STUDY · 1:1 GRAIN</span>
                <span>FINISH: {activeMaterial.finish}</span>
              </div>

              <div className="my-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* 1:1 Macro Texture */}
                <div className="sm:col-span-7 relative aspect-square overflow-hidden border border-[#262824]/20 bg-[#F5F2EA]">
                  <img
                    src={activeMaterial.textureUrl}
                    alt={`Macro surface texture of ${activeMaterial.title}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#F5F2EA]/85 backdrop-blur-xs px-3 py-1 font-drafting text-[10px] text-[#262824] border border-[#262824]/20">
                    {activeMaterial.code} — NATURAL DAYLIGHT (5500K)
                  </div>
                </div>

                {/* Paired Furniture Application */}
                <div className="sm:col-span-5 flex flex-col gap-4">
                  <div className="aspect-square overflow-hidden border border-[#262824]/20 bg-[#F5F2EA]">
                    <img
                      src={activeMaterial.pairedObjectUrl}
                      alt={activeMaterial.pairedObjectCaption}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="border-t border-[#262824]/15 pt-3">
                    <p className="font-drafting text-[10px] tracking-[0.1em] text-[#777974] uppercase">
                      APPLIED FORM
                    </p>
                    <p className="mt-1 font-ui text-[13px] font-medium text-[#262824]">
                      {activeMaterial.pairedObjectCaption}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#262824]/15 pt-3 flex items-center justify-between font-drafting text-[10px] text-[#777974]">
                <span>VOC-FREE FINISHES · REPAIRABLE SURFACES</span>
                <span>LONGEVITY SPECIFICATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
