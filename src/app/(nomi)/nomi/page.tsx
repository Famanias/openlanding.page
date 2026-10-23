import { Logo } from "./brand/Logo";
import { LaunchPhone } from "./launch/LaunchPhone";
import { GlassBackdrop } from "./motion/GlassBackdrop";
import { Reveals } from "./motion/Reveals";
import { SiteChrome } from "./motion/SiteChrome";
import { Demo } from "./sections/Demo";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Plans } from "./sections/Plans";
import { Studios } from "./sections/Studios";

export default function NomiPage() {
  return (
    <div className="nm-site">
      <GlassBackdrop />
      <a className="nm-skip" href="#main">Skip to content</a>
      <header className="nm-header" data-nm-header data-hidden="false" data-scrolled="false">
        <div className="container nm-header-inner">
          <a className="nm-home-link" href="#top" aria-label="NOMI home"><Logo /></a>
          <nav className="nm-nav" aria-label="Primary" data-nm-nav data-on="false">
            <a href="#launch">Product</a>
            <a href="#studios">Studios</a>
            <a href="#plans">Plans</a>
            <span className="nm-nav-ink" aria-hidden="true" />
          </nav>
          <a className="nm-btn nm-btn--quiet nm-btn--sm" href="#demo">Book a demo</a>
        </div>
      </header>
      <main id="main">
        <Hero />
        <LaunchPhone />
        <Studios />
        <Plans />
        <Demo />
      </main>
      <Footer />
      <Reveals />
      <SiteChrome />
    </div>
  );
}
