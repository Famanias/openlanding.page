import { Picture } from "../assets";
import { AppointmentForm } from "../forms/AppointmentForm";
import { Reveal } from "../motion/Reveals";

export function Booking() {
  return (
    <section id="book" className="tc-section tc-booking tc-field-section" data-field-section="book" aria-labelledby="booking-title">
      <div className="tc-container tc-booking-grid">
        <div className="tc-booking-copy">
          <Reveal kind="rise">
            <span className="tc-eyebrow" style={{ color: "var(--tc-oxide)" }}>Book / the next step</span>
            <h2 id="booking-title">Put the site on the board.</h2>
            <p>Give us the short version. We’ll bring the right person, the right questions, and a clear next step to the first conversation.</p>
          </Reveal>
          <Reveal className="tc-booking-proof" kind="wipe">
            <div className="tc-media-frame"><Picture assetKey="credential-grid" alt="Field equipment and blank credential folders arranged as proof" sizes="(min-width: 900px) 25vw, 45vw" /></div>
            <div className="tc-media-frame"><Picture assetKey="project-panel-detail" alt="Close detail of a finished relay panel" sizes="(min-width: 900px) 25vw, 45vw" /></div>
          </Reveal>
        </div>
        <Reveal className="tc-form-card" kind="stagger">
          <div className="tc-form-card-head">
            <h3>Start with the signal.</h3>
            <span className="tc-form-status"><i aria-hidden="true" /> Local / no network</span>
          </div>
          <AppointmentForm />
        </Reveal>
      </div>
    </section>
  );
}
