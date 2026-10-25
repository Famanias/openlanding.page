import { Logo } from "./brand/Logo";
import { HealthConsole } from "./console/HealthConsole";
import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { Booking } from "./sections/Booking";
import { CareTracks } from "./sections/CareTracks";
import { FAQ } from "./sections/FAQ";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Rhythm } from "./sections/Rhythm";
import { WorkLog } from "./sections/WorkLog";

export default function AftercartPage() {
  return (
    <div className="ac-shell">
      <a className="ac-skip" href="#main">Skip to content</a>
      <div className="ac-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <section id="health" className="ac-section ac-health-section" aria-labelledby="health-title">
          <div className="ac-container">
            <div className="ac-section-head" data-ac-reveal="rise">
              <p className="ac-section-note">Store health / 04 signals</p>
              <div><h2 id="health-title">Look at the shop like a customer.</h2><p>Pick the part that feels a little out of tune. The console shows what a care window would look at next.</p></div>
            </div>
            <HealthConsole />
          </div>
        </section>
        <CareTracks />
        <WorkLog />
        <Rhythm />
        <Booking />
        <FAQ />
      </main>
      <footer className="ac-footer">
        <div className="ac-container ac-footer-inner"><Logo compact /><p>AFTERCART is a fictional Shopify care partner template. The form is local-only.</p><span className="ac-footer-meta">© 2026 / Store health, kept human</span></div>
      </footer>
      <Reveals />
      <ScrollVars />
    </div>
  );
}
