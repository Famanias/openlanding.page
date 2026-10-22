import { BookingForm } from "../forms/BookingForm";

export function Hero() {
  return (
    <section className="oh-hero" id="top">
      <div className="oh-container oh-hero-grid">
        <div className="oh-hero-copy">
          <p className="oh-context" data-oh-hero="context">A focused page for owner-led businesses</p>
          <h1 data-oh-hero="headline">Turn more first clicks into good conversations.</h1>
          <p className="oh-lead" data-oh-hero="lead">A clear offer and one next step that feels easy.</p>
          <p className="oh-hero-note" data-oh-hero="note">Book a 20-minute call. Leave with page direction.</p>
        </div>
        <div className="oh-threshold" data-oh-hero="form" id="booking">
          <div className="oh-threshold-light" aria-hidden="true" />
          <div className="oh-threshold-head">
            <span className="oh-threshold-label">The front desk</span>
            <span className="oh-door-status"><i aria-hidden="true" /> Ready when you are</span>
          </div>
          <div className="oh-threshold-copy">
            <h2>Open the right invitation.</h2>
            <p>Tell us what the next page needs to do. We will bring the useful questions.</p>
          </div>
          <BookingForm />
        </div>
      </div>
      <div className="oh-hero-foot oh-container" aria-hidden="true">
        <span>One action</span><span>Short form</span><span>Clear handoff</span>
      </div>
    </section>
  );
}
