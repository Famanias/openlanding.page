import { BallStage } from "../ball/BallStage";
import { BookingForm } from "../forms/BookingForm";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";
import { CLINIC } from "./content";

export function Book() {
  return (
    <section id="book" className="sn-book" aria-labelledby="sn-book-title">
      <div className="sn-book-inner">
        <div className="sn-book-side">
          <Reveal as="p" variant="slide" className="sn-eyebrow">
            Book a visit
          </Reveal>
          <Reveal as="h2" variant="lines" className="sn-h2" id="sn-book-title">
            <Lines lines={["Fetch an", "appointment."]} />
          </Reveal>
          <Reveal as="p" variant="rise" delay={200} className="sn-sec-lede">
            Two minutes, no account. We text you a time within the hour, or ring {CLINIC.phone} if you&apos;d rather talk to a human.
          </Reveal>
          <Reveal variant="grow" delay={240} className="sn-book-ball">
            <BallStage />
          </Reveal>
        </div>
        <Reveal variant="pop" delay={120} className="sn-book-card">
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
