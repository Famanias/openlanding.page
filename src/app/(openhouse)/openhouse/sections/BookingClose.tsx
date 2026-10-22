import { BookingForm } from "../forms/BookingForm";

export function BookingClose() {
  return (
    <section className="oh-close" id="close">
      <div className="oh-container oh-close-grid">
        <div className="oh-close-copy" data-oh-reveal="mask">
          <h2>Bring the work. We will bring the questions.</h2>
          <p>One short call, then a page your visitors can understand and your team can answer.</p>
        </div>
        <div className="oh-close-card" data-oh-reveal="settle">
          <BookingForm compact />
        </div>
      </div>
      <div className="oh-sticky-cta">
        <div className="oh-container oh-sticky-inner">
          <span>One clear action starts here.</span>
          <a className="oh-button oh-button--primary" href="#booking">Book my 20-minute call <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
