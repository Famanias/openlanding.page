import { BookingForm } from "../forms/BookingForm";

export function Booking() {
  return (
    <section id="call" className="ac-booking" aria-labelledby="booking-title">
      <div className="ac-container ac-booking-grid">
        <div className="ac-booking-copy" data-ac-reveal="rise">
          <p className="ac-section-note">A better next check</p>
          <h2 id="booking-title">Keep the good parts moving.</h2>
          <p>Tell us what feels a little wobbly. We’ll use the first call to name the next useful pass, not sell you a rebuild.</p>
          <div className="ac-booking-notes"><span>01 / 20 minute call</span><span>02 / one clear care track</span><span>03 / a note you can keep</span></div>
        </div>
        <div className="ac-form-card" data-ac-reveal="scale"><BookingForm /></div>
      </div>
    </section>
  );
}
