import { ScrollEngine } from "./motion/ScrollEngine";
import { SmoothScroll } from "./motion/SmoothScroll";
import { VesselProvider } from "./vessel/VesselProvider";
import { Collection } from "./sections/Collection";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Order } from "./sections/Order";
import { Studio } from "./sections/Studio";
import { Workshop } from "./sections/Workshop";

export default function TournePage() {
  return (
    <VesselProvider>
      <a href="#main" className="tn-skip">
        Skip to content
      </a>
      <div className="tn-progress" aria-hidden="true" />
      <ScrollEngine />
      <SmoothScroll />
      <Header />
      <main id="main" className="tn-main">
        <Hero />
        <Workshop />
        <Studio />
        <Collection />
        <Order />
      </main>
      <Footer />
    </VesselProvider>
  );
}
