"use client";

import React from "react";
import { useParallax } from "../hooks/useParallax";
import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  const parallaxOffset = useParallax(110, 0.22);

  return (
    <section
      id="top"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#EDE6DF] to-[#E5DDD4] text-center"
    >
      {/* Subtle warm atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle at 50% 20%, #FAF8F5 0%, rgba(237,230,223,0) 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md border border-[#121417]/08 shadow-xs text-xs font-semibold text-[#2B2F38] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#216143]" />
          <span>Direct career outreach &amp; pipeline tracking</span>
          <span className="text-[#666E7D]">•</span>
          <span className="text-[#1E4F94]">Free to start</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-[#121417] leading-[1.08] mb-6 max-w-4xl mx-auto">
          Pitch with intention.
          <br />
          <span className="text-[#121417]">Land the offer.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#2B2F38] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Waypoint turns unstructured job hunting into an automated flight deck. Personalize outreach to engineering leaders, track replies in real time, and pilot every application from first note to signed contract.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <a
            href="#get-started"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-bold bg-[#121417] text-[#F5EFEB] px-7 py-3.5 rounded-full shadow-md hover:bg-[#2B2F38] hover:shadow-lg transition-all"
          >
            Start your pipeline →
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-semibold bg-[#FFFFFF] text-[#121417] px-6 py-3.5 rounded-full border border-[#D8D0C5] shadow-xs hover:bg-[#FAF8F5] transition-all"
          >
            See the flight deck
          </a>
        </div>

        {/* Social Proof Avatars */}
        <div className="flex items-center justify-center gap-3 text-xs text-[#666E7D] mb-12">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#DBE8FA] text-[#1E4F94] font-bold text-[10px] leading-7 text-center">
              AK
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#D8EADF] text-[#216143] font-bold text-[10px] leading-7 text-center">
              MR
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#FCE8DC] text-[#8A3E1B] font-bold text-[10px] leading-7 text-center">
              ST
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#EDE6DF] bg-[#ECE6F6] text-[#4B3878] font-bold text-[10px] leading-7 text-center">
              JL
            </div>
          </div>
          <span>Trusted by 3,400+ engineers and designers searching this month</span>
        </div>
      </div>

      {/* Half-shown Dashboard peaking at the fold with Parallax */}
      <div className="relative px-4 sm:px-6 mt-4">
        <HeroDashboard parallaxOffset={parallaxOffset} />
      </div>
    </section>
  );
}
