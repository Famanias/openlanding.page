import { Picture } from "./assets";
import { Hanko } from "./brand/Hanko";
import { Noren } from "./brand/Noren";
import { HeroDish } from "./dish/HeroDish";
import { FoodFlight } from "./flight/FoodFlight";
import { Building } from "./sections/Building";
import { Chef } from "./sections/Chef";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Kitchen } from "./sections/Kitchen";
import { Omakase } from "./sections/Omakase";
import { Reservation } from "./sections/Reservation";

export default function KojiPage() {
  return (
    <>
      <header className="kj-topbar">
        <a href="#top" className="kj-topbar__brand" aria-label="KŌJI, back to top">
          <Hanko size={34} />
          <span className="kj-mono">KŌJI 麹</span>
        </a>
        <Noren />
      </header>
      <main id="top">
        <Hero
          dish={
            <HeroDish
              poster={
                <Picture
                  assetKey="hero-dish-poster"
                  alt="A single piece of miso-glazed nigiri on dark speckled stoneware"
                  className="kj-dish-poster"
                  sizes="(min-width: 900px) 40vw, 90vw"
                  priority
                />
              }
            />
          }
        />
        <Kitchen />
        <Omakase flight={<FoodFlight />} />
        <Building />
        <Chef />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
