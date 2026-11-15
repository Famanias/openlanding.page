import { SmoothScroll } from "./motion/SmoothScroll";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Logbook } from "./sections/Logbook";
import { Room } from "./sections/Room";
import { Seasons } from "./sections/Seasons";
import { Stay } from "./sections/Stay";
import { Threshold } from "./sections/Threshold";
import { WalkIn } from "./sections/WalkIn";
import { StayProvider } from "./stay/StayProvider";
import { WalkEngine } from "./walk/WalkEngine";

export default function ElsewherePage() {
  return (
    <>
      <a className="ew-skip" href="#walk">
        Skip to the walk in
      </a>
      <Header />
      <main className="ew-main">
        {/* the hero stays put while the forest slides up over it */}
        <div className="ew-approach">
          <Hero />
          <WalkIn />
        </div>
        <Threshold />
        <StayProvider>
          <Room />
          <Seasons />
          <Logbook />
          <Stay />
        </StayProvider>
      </main>
      <Footer />
      <WalkEngine />
      <SmoothScroll />
    </>
  );
}
