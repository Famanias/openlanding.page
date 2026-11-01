import { RequestForm } from "./forms/RequestForm";
import { Reveals } from "./motion/Reveals";
import { ScrollMotion } from "./motion/ScrollMotion";
import { PointerMotion } from "./motion/PointerMotion";
import { Benefits } from "./sections/Benefits";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { MaterialDeck } from "./sections/MaterialDeck";
import { Process } from "./sections/Process";
import { Proof } from "./sections/Proof";

export default function AssemblagePage() {
  return (
    <div className="as-site">
      <a className="as-skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Benefits />
        <section className="as-tagline" aria-label="Assemblage promise">
          <p className="as-kicker">A material point of view</p>
          <h2>
            {"Good ideas need a surface".split(" ").map((word, index) => <span key={index}><span data-as-word>{word}</span>{index < 4 ? " " : ""}</span>)}
            <br />
            {"before they need a budget.".split(" ").map((word, index) => <span key={index}><span data-as-word>{word}</span>{index < 4 ? " " : ""}</span>)}
          </h2>
        </section>
        <Process />
        <MaterialDeck />
        <Proof />
        <section className="as-objections as-container" id="faq">
          <div className="as-section-intro" data-as-reveal="paper-rise">
            <p className="as-kicker">The practical questions</p>
            <h2>Make room for the messy bit.</h2>
          </div>
          <FAQ />
        </section>
        <section className="as-request as-container" id="request">
          <div className="as-request-copy" data-as-reveal="paper-rise">
            <p className="as-kicker">Start with the scraps</p>
            <h2>Bring the half formed idea.</h2>
            <p>
              Tell us what you have, what feels wrong, and what must survive. We will reply with a useful first question within two working days.
            </p>
            <div className="as-note-card">
              <span className="as-mono">Included</span>
              <strong>One material study, one working session, one launch direction.</strong>
              <span className="as-mono">Usually 2 weeks · £2,400</span>
            </div>
          </div>
          <RequestForm />
        </section>
      </main>
      <Footer />
      <Reveals />
      <ScrollMotion />
      <PointerMotion />
    </div>
  );
}
