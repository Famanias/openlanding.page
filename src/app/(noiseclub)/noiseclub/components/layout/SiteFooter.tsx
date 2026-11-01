"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const [showColophon, setShowColophon] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="border-t border-[#F1EEE5]/20 bg-[#111313] text-[#F1EEE5] pt-14 pb-16 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F1EEE5]/15">
          {/* Brand & Independent Attribution */}
          <div className="md:col-span-6 space-y-4">
            <div className="font-display text-3xl tracking-tight text-[#F1EEE5]">
              NOISE CLUB® · NC—001
            </div>
            <p className="font-sans-body text-sm text-[#F1EEE5]/80 max-w-xl leading-relaxed">
              An independent fictional creative concept featuring the PO-33 K.O! by Teenage Engineering.
              Not affiliated with or endorsed by Teenage Engineering.
            </p>
            <div className="font-mono-meta text-xs text-[#F1EEE5]/60">
              SOUND CULTURE DEPARTMENT · ISSUE 001 · ORDINARY NOISES ARE UNFINISHED MUSIC
            </div>
          </div>

          {/* Chapter Index */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-wider">
              PUBLICATION INDEX
            </div>
            <ul className="space-y-1.5 font-sans-body text-sm text-[#F1EEE5]/80">
              <li>
                <a href="#the-signal" onClick={(e) => handleNav(e, 'the-signal')} className="hover:text-[#CBFF49] transition-colors">
                  00. The Signal
                </a>
              </li>
              <li>
                <a href="#hear-everything" onClick={(e) => handleNav(e, 'hear-everything')} className="hover:text-[#CBFF49] transition-colors">
                  01. Hear Everything
                </a>
              </li>
              <li>
                <a href="#capture-it" onClick={(e) => handleNav(e, 'capture-it')} className="hover:text-[#CBFF49] transition-colors">
                  02. Capture It
                </a>
              </li>
              <li>
                <a href="#chop-it-up" onClick={(e) => handleNav(e, 'chop-it-up')} className="hover:text-[#CBFF49] transition-colors">
                  03. Chop It Up
                </a>
              </li>
              <li>
                <a href="#build-a-beat" onClick={(e) => handleNav(e, 'build-a-beat')} className="hover:text-[#CBFF49] transition-colors">
                  04. Build a Beat
                </a>
              </li>
              <li>
                <a href="#break-the-rules" onClick={(e) => handleNav(e, 'break-the-rules')} className="hover:text-[#CBFF49] transition-colors">
                  05. Break the Rules
                </a>
              </li>
              <li>
                <a href="#take-the-noise" onClick={(e) => handleNav(e, 'take-the-noise')} className="hover:text-[#CBFF49] transition-colors">
                  06. Take the Noise
                </a>
              </li>
            </ul>
          </div>

          {/* Official Destination & Colophon Toggle */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-mono-meta text-xs text-[#CBFF49] uppercase tracking-wider">
              OFFICIAL HARDWARE SOURCE
            </div>
            <p className="font-sans-body text-xs text-[#F1EEE5]/70 leading-relaxed">
              Verify current technical documentation, regional pricing, and hardware stock directly with the manufacturer.
            </p>
            <a
              href="https://teenage.engineering/store/po-33"
              target="_blank"
              rel="noopener noreferrer"
              className="nc-btn-interactive inline-flex items-center gap-2 px-4 py-2.5 bg-[#F1EEE5] text-[#111313] hover:bg-[#CBFF49] font-sans-body text-xs font-semibold whitespace-nowrap"
            >
              <span>teenage.engineering/store/po-33</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowColophon((prev) => !prev)}
                className="font-mono-meta text-xs text-[#F1EEE5]/70 hover:text-[#CBFF49] underline underline-offset-4"
              >
                {showColophon ? 'Hide Technical Colophon' : 'Read Technical Colophon & Provenance'}
              </button>
            </div>
          </div>
        </div>

        {/* Optional expandable Technical Colophon & Asset Provenance */}
        {showColophon && (
          <div className="mt-8 p-6 bg-[#171A1A] border border-[#F1EEE5]/20 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans-body text-xs text-[#F1EEE5]/80">
            <div>
              <div className="font-mono-meta text-[#CBFF49] mb-1.5">01 · AUDIO & WAVEFORM PROVENANCE</div>
              <p className="leading-relaxed">
                All five field specimens are synthesized in real time via Web Audio API physical modeling buffers (24 kHz 8-bit character). Every waveform silhouette is computed directly from the PCM channel data of the active AudioBuffer. Silent by default; zero copyrighted samples used.
              </p>
            </div>
            <div>
              <div className="font-mono-meta text-[#CBFF49] mb-1.5">02 · HARDWARE SPECIFICATION TRUTH</div>
              <p className="leading-relaxed">
                Represents verified Teenage Engineering PO-33 K.O! specifications: built-in Knowels electret microphone, 3.5mm stereo audio I/O, 40-second sample memory, 8 melodic sample slots, 8 drum slots, 16-step sequencer, and 16 punch-in effects.
              </p>
            </div>
            <div>
              <div className="font-mono-meta text-[#CBFF49] mb-1.5">03 · ACCESSIBILITY & REDUCED MOTION</div>
              <p className="leading-relaxed">
                Full keyboard navigation, screen-reader step status labels, non-audio visual state feedback, and automatic compliance with prefers-reduced-motion.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-meta text-xs text-[#F1EEE5]/55">
          <div>NOISE CLUB® EDITORIAL ARCHIVE · NC—001 / FIELD NOTE 033</div>
          <div>SILENT BY DEFAULT · WEB AUDIO SYNTHESIS ENGINE · NO COOKIES OR TRACKERS</div>
        </div>
      </div>
    </footer>
  );
};
