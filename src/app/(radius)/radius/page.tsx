import { MotionController } from "./motion/MotionController";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Breakdown } from "./sections/Breakdown";
import { Configurator } from "./configurator/Configurator";
import { ExperienceSections } from "./experience/ExperienceSections";

export default function RadiusPage() {
  return (
    <>
      <a className="rd-skip" href="#main">Skip to content</a>
      <MotionController />
      <Header />
      <main id="main">
        <Hero />
        <Breakdown />
        <Configurator />
        <ExperienceSections />
      </main>
    </>
  );
}
