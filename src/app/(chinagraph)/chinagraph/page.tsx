import { SmoothScroll } from "./motion/SmoothScroll";
import { Cloth } from "./sections/Cloth";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Looks } from "./sections/Looks";
import { Request } from "./sections/Request";
import { Sheet } from "./sections/Sheet";
import { Shop } from "./sections/Shop";

export default function ChinagraphPage() {
  return (
    <div className="cg-shell" id="top">
      <a href="#main" className="cg-skip">Skip to content</a>
      <SmoothScroll />
      <span className="cg-grain" aria-hidden="true" />
      <Header />
      <main id="main" className="cg-main">
        <Sheet />
        <Looks />
        <Cloth />
        <Shop />
        <Request />
      </main>
      <Footer />
    </div>
  );
}
