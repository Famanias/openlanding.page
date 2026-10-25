import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Calibration } from "./sections/Calibration";
import { Fitting } from "./sections/Fitting";
import { Footer } from "./sections/Footer";
import { Frames } from "./sections/Frames";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Materials } from "./sections/Materials";
import { Protocol } from "./sections/Protocol";

export default function NuloPage() {
  return (
    <div className="nu-shell">
      <a className="nu-skip" href="#calibrate">Skip to calibration</a>
      <Header />
      <main className="nu-main">
        <Hero />
        <div className="nu-band" aria-label="NULO calibration modes"><div className="nu-band__inner"><div className="nu-band__ticker"><span className="nu-band__item">screen / low glare</span><span className="nu-band__item">street / true colour</span><span className="nu-band__item">night / edge lift</span><span className="nu-band__item">screen / low glare</span><span className="nu-band__item">street / true colour</span><span className="nu-band__item">night / edge lift</span></div></div></div>
        <Calibration />
        <Frames />
        <Materials />
        <Protocol />
        <Fitting />
      </main>
      <Footer />
      <Reveals />
      <ScrollVars />
      <SmoothScroll />
    </div>
  );
}
