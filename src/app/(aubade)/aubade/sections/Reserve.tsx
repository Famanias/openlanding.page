import { BookingForm } from "../forms/BookingForm";
import { Eyebrow } from "./Eyebrow";

export function Reserve() {
  return (
    <section id="reserve" className="au-reserve" aria-labelledby="reserve-title">
      <div className="au-wrap">
        <div className="au-section-head">
          <Eyebrow>Reserve · Billets de nuit</Eyebrow>
          <h2 id="reserve-title" className="au-h2" data-reveal="mask">
            <span className="au-mask">
              <span>Reserve a berth.</span>
            </span>
          </h2>
          <p className="au-lead" data-reveal="rise">
            Pick a night and a cabin; the ticket fills itself in as you go. We&rsquo;ll hold it for 48 hours while you decide
            about the wine.
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
