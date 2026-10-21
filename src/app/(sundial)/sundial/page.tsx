import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { RoastSection } from "./roast/RoastSection";
import { Lots } from "./sections/Lots";
import { BrewBenchSection } from "./sections/BrewBenchSection";
import { Subscribe } from "./sections/Subscribe";
import { Wholesale } from "./sections/Wholesale";
import { Footer } from "./sections/Footer";

export default function SundialPage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <RoastSection />
        <Lots />
        <BrewBenchSection />
        <Subscribe />
        <Wholesale />
      </main>
      <Footer />
    </>
  );
}
