import React from "react";
import { ScrollVars } from "./motion/ScrollVars";
import { SmoothScroll } from "./motion/SmoothScroll";
import { AssetPreviewSection } from "./sections/AssetPreviewSection";
import { CaptureMatrixSection } from "./sections/CaptureMatrixSection";
import { FaqFooterSection } from "./sections/FaqFooterSection";
import { Header } from "./sections/Header";
import { LeadCaptureSection } from "./sections/LeadCaptureSection";
import { SplashGateSection } from "./sections/SplashGateSection";
import { SqueezeSection } from "./sections/SqueezeSection";

export default function ValencePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <SmoothScroll />
      <ScrollVars />
      <Header />
      <main id="valence-main">
        <SplashGateSection />
        <CaptureMatrixSection />
        <SqueezeSection />
        <AssetPreviewSection />
        <LeadCaptureSection />
      </main>
      <FaqFooterSection />
    </div>
  );
}
