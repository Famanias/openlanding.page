"use client";

import React from "react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { ConversionCard } from "./components/ConversionCard";
import { Footer } from "./components/Footer";
import { ProductPanorama } from "./components/ProductPanorama";
import { ProductStory } from "./components/ProductStory";
import { PaperTrail } from "./components/PaperTrail";
import { Motion } from "./components/Motion";
import { WorkspaceDialog } from "./components/WorkspaceDialog";

export function WaypointApp() {
  return (
    <Motion>
      <div className="wyp-page min-h-screen bg-[#EDE6DF] text-[#121417]">
        <a className="wyp-skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="overflow-x-hidden w-full max-w-full">
          <Hero />
          <ProductPanorama />
          <ProductStory />
          <BentoGrid />
          <PaperTrail />
          <PricingSection />
          <FaqSection />
          <ConversionCard />
        </main>
        <Footer />
        <WorkspaceDialog />
      </div>
    </Motion>
  );
}
