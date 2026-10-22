import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Brief } from "./sections/Brief";
import { Categories } from "./sections/Categories";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { Makers } from "./sections/Makers";
import { Packs } from "./sections/Packs";

export default function SatsumaPage() {
  return (
    <>
      <a className="sa-skip" href="#how">
        Skip to how it works
      </a>
      <Header />
      <main>
        <Hero />
        <div className="sa-sheet">
          <Categories />
          <HowItWorks />
          <Makers />
          <Packs />
          <Brief />
        </div>
      </main>
      <Footer />
      <Reveals />
      <ScrollVars />
      <SmoothScroll />
    </>
  );
}
