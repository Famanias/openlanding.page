import { SmoothScroll } from "./motion/SmoothScroll";
import { ChamberSection } from "./sections/ChamberSection";
import { Commission } from "./sections/Commission";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Response } from "./sections/Response";
import { Rooms } from "./sections/Rooms";
import { Surfaces } from "./sections/Surfaces";

export default function VolumeZeroPage() {
  return (
    <div className="vz-shell">
      <a href="#vz-main" className="vz-skip">Skip to the field</a>
      <SmoothScroll />
      <Header />
      <main id="vz-main" className="vz-main">
        <Hero />
        <ChamberSection />
        <Surfaces />
        <Rooms />
        <Response />
        <Commission />
      </main>
      <Footer />
    </div>
  );
}
