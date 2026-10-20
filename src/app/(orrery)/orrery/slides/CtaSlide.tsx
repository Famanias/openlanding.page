import { OrreryMark } from "../brand/Logo";
import { DemoForm } from "../forms/DemoForm";
import { Eyebrow, rv } from "./Eyebrow";

export function CtaSlide() {
  return (
    <div className="orr-slide-inner orr-cta">
      <Eyebrow n={10}>Book a demo</Eyebrow>
      <div className="orr-cta__copy">
        <h2 className="orr-display orr-cta__title orr-reveal" style={rv(1)}>
          Put your agents <em>in orbit.</em>
        </h2>
        <p className="orr-lead orr-reveal" style={rv(2)}>
          A 30-minute call with an engineer. Bring one real workflow and we&apos;ll set up its first team of
          agents with you.
        </p>
      </div>
      <div className="orr-cta__form orr-reveal" style={rv(3)}>
        <DemoForm />
      </div>
      <footer className="orr-cta__footer orr-label">
        <OrreryMark size={20} />
        <span>© 2026 Orrery Labs</span>
        <a href="#security">Security</a>
        <a href="#pricing">Pricing</a>
      </footer>
    </div>
  );
}
