import { WalkthroughForm } from "../forms/WalkthroughForm";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

const STEPS = [
  { n: "01", t: "You send the brief", d: "Two minutes. Your store, what feels broken, a rough budget." },
  { n: "02", t: "We walk the store with you", d: "30 minutes on video. We screen-share your shop, front and admin." },
  { n: "03", t: "You get a fit-out sheet", d: "Within two working days: stages, prices, dates. Free, and yours to keep." },
];

export function Book() {
  return (
    <section id="book" className="fx-section fx-book" aria-labelledby="fx-book-title">
      <div className="fx-container fx-book__grid">
        <div className="fx-book__copy">
          <Reveal kind="rise">
            <p className="fx-eyebrow"><span>Book</span><span>Free · 30 minutes</span></p>
            <h2 id="fx-book-title"><SplitText>{"Book a store\nwalk-through."}</SplitText></h2>
            <p className="fx-section-lead">Tell us about the shop. We&apos;ll walk through it with you and send back a fit-out sheet, whether or not you hire us.</p>
          </Reveal>
          <ol className="fx-book__steps">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.n} kind="slide" index={index}>
                <span className="fx-mono">{step.n}</span>
                <div>
                  <p className="fx-book__step-title">{step.t}</p>
                  <p>{step.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal kind="wipe" className="fx-book__form">
          <WalkthroughForm />
        </Reveal>
      </div>
    </section>
  );
}
