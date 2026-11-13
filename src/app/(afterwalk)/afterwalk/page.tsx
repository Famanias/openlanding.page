import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Intro } from "./sections/Intro";
import { WalkFinder } from "./walks/WalkFinder";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";
import { MotionEffects } from "./motion/MotionEffects";

export default function AfterwalkPage() {
  return <>
    <a className="aw-skip" href="#main">Skip to content</a>
    <MotionEffects />
    <Header />
    <main id="main">
      <Hero />
      <Intro />
      <WalkFinder />
      <FAQ />
    </main>
    <Footer />
  </>;
}
