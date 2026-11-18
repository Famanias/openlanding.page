import type { Metadata } from "next";
import { MotionController } from "../motion/MotionController";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { SubpageHeader } from "../sections/SubpageHeader";
import { AccessoryBundles } from "./AccessoryBundles";

export const metadata: Metadata = {
  title: "Modular Accessories & Carry — RADIUS",
  description:
    "Explore the rear rack, front basket, integrated lights, and tread choices built to pair cleanly with the RADIUS chassis.",
  alternates: { canonical: "/templates/radius/accessories" },
};

export default function RadiusAccessoriesPage() {
  return (
    <>
      <a className="rd-skip" href="#main">Skip to accessories</a>
      <MotionController />
      <Header activePage="accessories" />
      <main id="main">
        <SubpageHeader
          tone="ink"
          eyebrow="02 / CARRY & OPTICS"
          title="Built for the load"
          accent="you bring."
          lede="Add a rear rack, front basket, or integrated lights to match your weekday routine. Standalone studio studies paired with interactive build summaries."
          specs={[
            { label: "Carry points", value: "Front & Rear" },
            { label: "Lighting", value: "Integrated" },
            { label: "Presets", value: "3 packs" },
            { label: "Mounts", value: "Frame-direct" },
          ]}
        />
        <AccessoryBundles />
      </main>
      <Footer />
    </>
  );
}
