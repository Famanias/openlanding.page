"use client";

import React from "react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { ConversionCard } from "./components/ConversionCard";
import { Footer } from "./components/Footer";

export function WaypointApp() {
  return (
    <div className="min-h-screen bg-[#EDE6DF] text-[#121417]">
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <BentoGrid />
        <PricingSection />
        <FaqSection />
        <ConversionCard />
      </main>
      <Footer />
    </div>
  );
}
