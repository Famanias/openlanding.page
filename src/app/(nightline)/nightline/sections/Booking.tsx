import { Picture } from "../assets";
import { BookingForm } from "../forms/BookingForm";
import { Reveal } from "../motion/Reveal";

export function Booking() {
  return (
    <section id="book" className="nli-section nli-book">
      <div className="nli-book__intro">
        <Reveal type="label">
          <p className="nli-eyebrow">07 / THE NIGHT DESK</p>
        </Reveal>
        <Reveal type="mask">
          <h2>
            Give the day<br />
            <em>back to yourself.</em>
          </h2>
        </Reveal>
        <Reveal type="rise">
          <p>Tell us the city you want to wake in. We&rsquo;ll find the train that gets you there while you sleep.</p>
        </Reveal>
        <Reveal type="rise" index={1}>
          <div className="nli-book__media">
            <Picture
              assetKey="footer-night"
              alt="Nightline sleeper train waiting at the quiet platform under rain"
              sizes="(min-width: 900px) 40vw, 90vw"
            />
          </div>
        </Reveal>
      </div>
      <BookingForm />
    </section>
  );
}
