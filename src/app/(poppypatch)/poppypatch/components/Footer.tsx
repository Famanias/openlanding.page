import React from 'react';
import { BotanicalSprig } from './DoodleSvg';

export function Footer() {
  return (
    <footer className="bg-[#4A2E25] text-[#F7ECD6] pt-16 pb-12 border-t border-[#4A2E25]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F7ECD6]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="font-serif-display font-bold text-3xl tracking-tight text-[#FAF3E3]">
                poppy patch
              </span>
              <img
                src="/templates/poppypatch/logo-mushroom.png"
                alt=""
                width={32}
                height={34}
                referrerPolicy="no-referrer"
                className="w-7 h-7 object-contain bg-[#FAF3E3] rounded-full p-0.5"
              />
            </div>
            <p className="text-sm text-[#F7ECD6]/80 max-w-[38ch] leading-relaxed">
              Small-batch culinary mushroom starter kits designed for curious kitchens, patient mornings, and warm skillets.
            </p>
            <p className="text-xs text-[#F7ECD6]/65">
              Fictional brand & interactive showcase · Crafted with tactile clay & botanical art direction.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F28B72]">
              The Patch
            </h3>
            <ul className="space-y-2 text-sm text-[#F7ECD6]/85">
              <li>
                <a href="#our-kits" className="hover:text-[#F28B72] transition-colors">
                  Our Kits
                </a>
              </li>
              <li>
                <a href="#how-it-grows" className="hover:text-[#F28B72] transition-colors">
                  How It Grows
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#F28B72] transition-colors">
                  Why It’s Different
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A8B96C]">
              Learn & Cook
            </h3>
            <ul className="space-y-2 text-sm text-[#F7ECD6]/85">
              <li>
                <a href="#the-journal" className="hover:text-[#A8B96C] transition-colors">
                  Growing Journal
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#A8B96C] transition-colors">
                  Care & Storage FAQ
                </a>
              </li>
              <li>
                <a href="#how-it-grows" className="hover:text-[#A8B96C] transition-colors">
                  Conditions Planner
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="flex items-center gap-3 bg-[#5A3A2E] p-3.5 rounded-2xl border border-[#F7ECD6]/12">
              <img
                src="/templates/poppypatch/cutout-coral-oysters.png"
                alt=""
                width={54}
                height={50}
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-contain shrink-0"
              />
              <div className="text-xs text-[#F7ECD6]/90">
                <strong className="block font-serif-display text-sm text-[#FAF3E3]">
                  10–14 Day Typical Cycle
                </strong>
                Just add tap water & indirect kitchen light.
              </div>
            </div>
          </div>
        </div>

        {/* Oversized Wordmark & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-serif-display font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-[#FAF3E3]/15 select-none">
            poppy patch
          </p>
          <div className="flex items-center gap-4 text-xs text-[#F7ECD6]/70">
            <BotanicalSprig className="w-6 h-8" color="#F7ECD6" />
            <span>© {new Date().getFullYear()} Poppy Patch Studio. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
