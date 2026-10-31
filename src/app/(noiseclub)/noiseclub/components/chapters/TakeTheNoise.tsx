"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SpecimenId } from '../../lib/audio/sampleLibrary';
import { PO33HardwareIllustration } from '../interactive/PO33HardwareIllustration';

interface TakeTheNoiseProps {
  activeSpecimen: SpecimenId;
  onTriggerHardwarePad: (padNumber: number) => void;
}

const VERIFIED_SPECS = [
  {
    code: 'SPEC 01',
    label: 'Built-in Microphone',
    value: 'Knowles electret condenser mic for instant acoustic sampling',
  },
  {
    code: 'SPEC 02',
    label: 'Sample Memory',
    value: '40 seconds total recording memory across 16 sample slots',
  },
  {
    code: 'SPEC 03',
    label: 'Melodic & Drum Banks',
    value: '8 melodic chromatic sample slots + 8 auto-sliced drum kit slots',
  },
  {
    code: 'SPEC 04',
    label: 'Sequencer & Effects',
    value: '16-step sequencer, 16 patterns, and 16 punch-in performance effects',
  },
  {
    code: 'SPEC 05',
    label: 'Audio I/O & Sync',
    value: 'Dual 3.5mm stereo mini-jacks (Line-In, Line-Out, and Jam Sync)',
  },
  {
    code: 'SPEC 06',
    label: 'Portable Power',
    value: 'Powered by 2× AAA batteries with integrated folding wire stand',
  },
];

export const TakeTheNoise: React.FC<TakeTheNoiseProps> = ({
  activeSpecimen,
  onTriggerHardwarePad,
}) => {
  return (
    <section
      id="take-the-noise"
      aria-labelledby="chapter-06-heading"
      className="relative py-24 sm:py-32 px-4 sm:px-8"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 7 Columns: Restrained Final Resolution Copy, Verified Feature Summary, Official CTA */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-widest mb-3">
                06 / TAKE THE NOISE · POCKET OPERATOR PO-33 K.O!
              </div>
              <h2
                id="chapter-06-heading"
                className="font-display text-[clamp(3rem,6.5vw,6.2rem)] text-[#F1EEE5] uppercase leading-[0.9]"
                style={{ textWrap: 'balance' }}
              >
                YOUR NEXT BEAT IS OUT THERE.
              </h2>
            </div>

            <p className="font-sans-body text-base sm:text-lg text-[#F1EEE5]/85 max-w-xl leading-relaxed">
              Everything has a rhythm—you just have to find it. Carry a real micro-sampler in your coat pocket, steal four seconds of city air, and turn ordinary noise into finished music.
            </p>

            {/* Concise Verified Feature Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F1EEE5]/20">
              {VERIFIED_SPECS.map((item) => (
                <div key={item.code} className="p-4 bg-[#151818] border border-[#F1EEE5]/15">
                  <div className="font-mono-meta text-[11px] text-[#CBFF49] mb-1">
                    {item.code} · {item.label.toUpperCase()}
                  </div>
                  <div className="font-sans-body text-xs sm:text-sm text-[#F1EEE5]/85 leading-relaxed">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Official Manufacturer CTA & Unambiguous Attribution */}
            <div className="pt-4 space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://teenage.engineering/store/po-33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group nc-btn-interactive inline-flex items-center gap-3 px-7 py-4 bg-[#CBFF49] text-[#111313] hover:bg-[#F1EEE5] font-sans-body text-sm font-bold tracking-wide whitespace-nowrap shrink-0"
                >
                  <span>DISCOVER THE PO-33</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <span className="font-mono-meta text-xs text-[#F1EEE5]/65">
                  OFFICIAL DESTINATION: TEENAGE.ENGINEERING/STORE/PO-33
                </span>
              </div>

              <p className="font-mono-meta text-xs text-[#F1EEE5]/65 border-t border-[#F1EEE5]/15 pt-4 max-w-xl leading-relaxed">
                An independent fictional creative concept featuring the PO-33 K.O! by Teenage Engineering. Not affiliated with or endorsed by Teenage Engineering.
              </p>
            </div>
          </div>

          {/* Right 5 Columns: Accurate Front Monolith PO-33 Inspection View */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-[#151818] border border-[#F1EEE5]/20">
              <div className="flex items-center justify-between mb-4 font-mono-meta text-xs text-[#F1EEE5]/70">
                <span>TEENAGE ENGINEERING · PO-33 K.O!</span>
                <span className="text-[#CBFF49]">INTERACTIVE SPEC MONOLITH</span>
              </div>
              <PO33HardwareIllustration
                mode="front-monolith"
                activeSpecimen={activeSpecimen}
                onTriggerPad={onTriggerHardwarePad}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
