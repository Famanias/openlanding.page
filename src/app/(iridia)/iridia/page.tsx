import { GradientCanvas } from "./spectrum/GradientCanvas";
import { AtmosphericBackdrop } from "./background/AtmosphericBackdrop";
import { SpatialViewport } from "./spatial/SpatialViewport";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Chambers } from "./sections/Chambers";
import { DissectionSection } from "./sections/DissectionSection";
import { SynthesizerSection } from "./sections/SynthesizerSection";
import { Installations } from "./sections/Installations";
import { CommissionSection } from "./sections/CommissionSection";
import { Footer } from "./sections/Footer";

export default function IridiaPage() {
  return (
    <main className="relative min-h-screen selection:bg-[#00F0FF] selection:text-[#0A0B10] overflow-x-clip">
      {/* 1. Live WebGL2 Navier-Stokes Gradient Shader Backdrop */}
      <GradientCanvas />

      {/* 2. Atmospheric Optical Backdrops (Coordinate Grid, Caustic Pools, Rays) */}
      <AtmosphericBackdrop />

      {/* 3. Fixed Navigation */}
      <Nav />

      {/* 4. 3D Spatial Coordinate Stage */}
      <div className="relative z-10">
        <SpatialViewport>
          <Hero />
          <Chambers />
          <DissectionSection />
          <SynthesizerSection />
          <Installations />
          <CommissionSection />
          <Footer />
        </SpatialViewport>
      </div>
    </main>
  );
}
