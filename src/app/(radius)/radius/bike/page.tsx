import type { Metadata } from "next";
import { MotionController } from "../motion/MotionController";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { SubpageHeader } from "../sections/SubpageHeader";
import { BikeExplorer } from "./BikeExplorer";

export const metadata: Metadata = {
  title: "The Bike & Engineering — RADIUS",
  description:
    "Explore the three RADIUS frame finishes, upright city geometry, cable routing ports, and wheel assemblies.",
  alternates: { canonical: "/templates/radius/bike" },
};

export default function RadiusBikePage() {
  return (
    <>
      <a className="rd-skip" href="#main">Skip to bike architecture</a>
      <MotionController />
      <Header activePage="bike" />
      <main id="main">
        <SubpageHeader
          tone="blue"
          eyebrow="01 / THE MACHINE"
          title="Every street"
          accent="studied."
          lede="Inspect the three standard RADIUS frame finishes and look closely at the weld junctions, routing ports, and tire choices."
          specs={[
            { label: "Finishes", value: "3 coats" },
            { label: "Tread profiles", value: "City / Gravel" },
            { label: "Frame ports", value: "Service-first" },
            { label: "Study", value: "R / 01" },
          ]}
        />
        <BikeExplorer />
      </main>
      <Footer />
    </>
  );
}
