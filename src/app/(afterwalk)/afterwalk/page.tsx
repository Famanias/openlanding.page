import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Intro } from "./sections/Intro";
import { WalkFinder } from "./walks/WalkFinder";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";
import { MotionEffects } from "./motion/MotionEffects";
import { HeroStage } from "./motion/HeroStage";
import { ScrollProgress } from "./motion/ScrollProgress";

export default function AfterwalkPage() {
  return <>
    <a className="aw-skip" href="#main">Skip to content</a>
    <MotionEffects />
    <ScrollProgress />
    <Header />
    <main id="main">
      <HeroStage><Hero /></HeroStage>
      <div className="aw-sheet"><Intro /><WalkFinder /><FAQ /></div>
    </main>
    <Footer />
  </>;
}
