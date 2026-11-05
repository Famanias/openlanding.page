import React from "react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#16181D] text-[#F5EFEB] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#F5EFEB]/10">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center rounded-xl bg-[#F5EFEB] text-[#121417] w-7 h-7 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 13L8 10.5L3 13L8 2Z" fill="#121417" stroke="#121417" strokeWidth="0.5" />
                  <circle cx="8" cy="10.5" r="1" fill="#1E4F94" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-[-0.03em] text-[#F5EFEB]">
                Waypoint
              </span>
            </div>
            <p className="text-xs text-[#F5EFEB]/70 max-w-sm leading-relaxed mb-6">
              The career outreach pipeline for senior software engineers and product designers. Pitch directly, monitor candidate momentum, and pilot your search to the offer stage.
            </p>
            <div className="text-xs text-[#F5EFEB]/50">
              © 2026 Waypoint Systems. All rights reserved.
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Product
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pipeline" className="hover:text-white transition">Pipeline Deck</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#pitch-drafter" className="hover:text-white transition">Pitch Drafter</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Company
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#manifesto" className="hover:text-white transition">Manifesto</a></li>
                <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Resources
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#guides" className="hover:text-white transition">Outreach Guides</a></li>
                <li><a href="#templates" className="hover:text-white transition">Pitch Templates</a></li>
                <li><a href="#changelog" className="hover:text-white transition">Changelog</a></li>
                <li><a href="#status" className="hover:text-white transition">System Status</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Legal
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#security" className="hover:text-white transition">Security Audit</a></li>
                <li><a href="#gdpr" className="hover:text-white transition">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive Embossed Watermark */}
        <div className="pt-8 select-none pointer-events-none">
          <div className="text-[clamp(4.5rem,14vw,11rem)] font-black text-[#F5EFEB]/[0.05] tracking-[-0.05em] leading-none text-center">
            waypoint
          </div>
        </div>

        <div className="text-[11px] text-[#F5EFEB]/40 text-center pt-4">
          Company marks and logos are depicted for portfolio illustration purposes only.
        </div>
      </div>
    </footer>
  );
}
