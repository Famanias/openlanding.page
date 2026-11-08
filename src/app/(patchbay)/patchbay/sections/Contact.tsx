import { PROFILE } from "../content/profile";
import { ContactForm } from "../forms/ContactForm";
import { Reveal } from "../motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="pby-section pby-shell" aria-labelledby="pby-contact-title">
      <div className="pby-contact">
        <Reveal as="header" className="pby-section-head">
          <p className="pby-eyebrow pby-mono">06 / Contact</p>
          <h2 id="pby-contact-title" className="pby-h2">
            Plug in. Tell me what you&apos;re building.
          </h2>
          <p className="pby-lede">
            {PROFILE.availability}. This template has no backend, so the form prepares a brief you can download and email to{" "}
            <a className="pby-link" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            .
          </p>
        </Reveal>
        <ContactForm />
      </div>
    </section>
  );
}
