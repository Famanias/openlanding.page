import React from 'react';
import { MortaMark, PointedSealOrnament } from './MortaMark';

export const Footer: React.FC = () => {
  return (
    <footer className="morta-atmosphere text-white border-t border-white/25">
      <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/20">
          {/* Brand Reprise & Closing Phrase */}
          <div className="lg:col-span-6 space-y-6">
            <a
              href="#oath"
              className="inline-flex items-center gap-4 text-white hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <MortaMark size={38} />
              <span className="font-display text-2xl sm:text-3xl tracking-[0.34em] uppercase">
                MORTA
              </span>
            </a>

            <p className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
              “Made to outlast the moment.”
            </p>

          </div>

          {/* Working In-Page Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Chapters
            </p>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <a
                  href="#oath"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  I. The Oath
                </a>
              </li>
              <li>
                <a
                  href="#house"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  II. The House
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  III. The Collection (01–03)
                </a>
              </li>
              <li>
                <a
                  href="#craft"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  IV. The Craft &amp; Ring Assembly
                </a>
              </li>
              <li>
                <a
                  href="#commissions"
                  className="hover:text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  V. Bespoke Commissions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Commission / Enquiry Access (No fabricated addresses or fake social links) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Commissions &amp; Enquiries
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              Request custom sizing or a bespoke piece.
            </p>
            <div className="pt-2">
              <a
                href="#commissions"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] border border-white text-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors whitespace-nowrap"
              >
                <span>Open commission form</span>
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/65">
          <div className="flex items-center gap-3">
            <PointedSealOrnament className="w-3 h-4 text-white/65" />
            <span>MORTA · SCULPTURAL STERLING SILVER · 925 FINENESS</span>
          </div>
          <a
            href="#oath"
            className="text-white/80 hover:text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white whitespace-nowrap"
          >
            Return to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
