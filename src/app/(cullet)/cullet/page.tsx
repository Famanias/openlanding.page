import { Hero } from "./hero/Hero";
import { ScrollDirector } from "./motion/ScrollDirector";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Materials } from "./sections/Materials";
import { Open } from "./sections/Open";
import { Pricing } from "./sections/Pricing";
import { Proof } from "./sections/Proof";
import { Studio } from "./sections/Studio";
import { Workflow } from "./sections/Workflow";
import { Terms } from "./terms/Terms";

export default function CulletPage() {
  return (
    <>
      <a className="fc-skip" href="#terms">Skip past the glass</a>
      <Header />
      <main id="main">
        <Hero />
        <Terms />
        <Studio />
        <Workflow />
        <Materials />
        <Proof />
        <Pricing />
        <Open />
      </main>
      <Footer />
      <ScrollDirector />
      <SmoothScroll />
    </>
  );
}
