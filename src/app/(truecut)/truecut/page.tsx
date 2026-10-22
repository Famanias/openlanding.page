import { Logo } from "./brand/Logo";
import { ScrollFieldLog } from "./motion/ScrollFieldLog";
import { Booking } from "./sections/Booking";
import { Capabilities } from "./sections/Capabilities";
import { FieldReel } from "./sections/FieldReel";
import { Hero } from "./sections/Hero";
import { Method } from "./sections/Method";
import { Projects } from "./sections/Projects";
import { SiteHeader } from "./sections/SiteHeader";

export default function TruecutPage() {
  return (
    <ScrollFieldLog>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Capabilities />
        <FieldReel />
        <Projects />
        <Method />
        <Booking />
      </main>
      <footer className="tc-footer">
        <div className="tc-container tc-footer-inner">
          <Logo compact />
          <p>TRUECUT Works is a fictional conversion template. Media placeholders are ready for your own field photography and short proof reels.</p>
        </div>
      </footer>
    </ScrollFieldLog>
  );
}
