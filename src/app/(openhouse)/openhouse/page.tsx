import { BookingClose } from "./sections/BookingClose";
import { Fit } from "./sections/Fit";
import { Hero } from "./sections/Hero";
import { Outcomes } from "./sections/Outcomes";
import { Process } from "./sections/Process";
import { Logo } from "./brand/Logo";
import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";

export default function OpenhousePage() {
  return (
    <div className="oh-site">
      <a className="oh-skip" href="#main">Skip to content</a>
      <div className="oh-progress" aria-hidden="true" />
      <header className="oh-header">
        <div className="oh-container oh-header-inner">
          <a className="oh-header-logo" href="#top" aria-label="Openhouse home">
            <Logo />
          </a>
          <span className="oh-header-note">Conversion pages for small teams</span>
        </div>
      </header>
      <main id="main">
        <Hero />
        <Outcomes />
        <Fit />
        <Process />
        <BookingClose />
      </main>
      <footer className="oh-footer">
        <div className="oh-container oh-footer-inner">
          <Logo compact />
          <p>Openhouse is a page template. The form is ready for your endpoint; nothing is sent yet.</p>
        </div>
      </footer>
      <Reveals />
      <ScrollVars />
    </div>
  );
}
