import { LineSection } from "./line/LineSection";
import { Reveals } from "./motion/Reveals";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Berths } from "./sections/Berths";
import { Departures } from "./sections/Departures";
import { DiningCar } from "./sections/DiningCar";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Reserve } from "./sections/Reserve";
import { TheNight } from "./sections/TheNight";

export default function AubadePage() {
  return (
    <>
      <a className="au-skip" href="#line">
        Skip to the line
      </a>
      <Header />
      <main>
        <Hero />
        <LineSection />
        <Berths />
        <DiningCar />
        <TheNight />
        <Departures />
        <Reserve />
      </main>
      <Footer />
      <Reveals />
      <SmoothScroll />
    </>
  );
}
