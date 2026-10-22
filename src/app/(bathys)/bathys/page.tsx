import React from "react";
import { HeaderHUD } from "./sections/HeaderHUD";
import { Hero } from "./sections/Hero";
import { OceanAmbient } from "./sections/OceanAmbient";
import { SubmersibleScene } from "./scene/SubmersibleScene";
import { DeepLife } from "./life/DeepLife";
import { DescentSection } from "./descent/DescentSection";
import { ArchitectureSection } from "./sections/ArchitectureSection";
import { SensorSuiteSection } from "./sections/SensorSuiteSection";
import { TrenchDossiersSection } from "./sections/TrenchDossiersSection";
import { CharterFormSection } from "./forms/CharterFormSection";
import { Footer } from "./sections/Footer";

export default function BathysPage() {
  return (
    <main className="min-h-screen bg-trench text-titanium flex flex-col relative isolate">
      <OceanAmbient />
      <DeepLife />
      <SubmersibleScene />
      <HeaderHUD />
      <Hero />
      <DescentSection />
      <ArchitectureSection />
      <SensorSuiteSection />
      <TrenchDossiersSection />
      <CharterFormSection />
      <Footer />
    </main>
  );
}
