import { SmoothScroll } from "./motion/SmoothScroll";
import { Book } from "./sections/Book";
import { CarePlans } from "./sections/CarePlans";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { PriceList } from "./sections/PriceList";
import { Scene } from "./sections/Scene";
import { Schedule } from "./sections/Schedule";
import { Work } from "./sections/Work";

export default function FixturePage() {
  return (
    <div className="fx-shell" id="top">
      <a href="#main" className="fx-skip">Skip to content</a>
      <SmoothScroll />
      <div className="fx-gridlines" aria-hidden="true"><div className="fx-container"><span /></div></div>
      <Header />
      <main id="main" className="fx-main">
        <Scene />
        <PriceList />
        <Work />
        <Schedule />
        <CarePlans />
        <Faq />
        <Book />
      </main>
      <Footer />
    </div>
  );
}
