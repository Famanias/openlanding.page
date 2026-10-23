import type { CSSProperties } from "react";
import { Check } from "../brand/Icons";
import { Words } from "../motion/Words";

const INCLUDED = ["Bookings and reminders", "Progress notes for families", "One-tap payment follow-up"];

export function Plans() {
  return (
    <section className="nm-plans" id="plans">
      <div className="container nm-plans-grid">
        <div className="nm-plans-copy">
          <h2 data-nm-reveal="mask"><Words text="Less admin. More attention." /></h2>
          <p className="lead" data-nm-reveal="rise">Start with one studio, invite your team, and let the calm compound.</p>
        </div>

        <div className="nm-offer-wrap" data-nm-reveal="wipe">
          <article className="nm-offer">
            <div className="nm-offer-main">
              <h3>NOMI Studio</h3>
              <p className="nm-price">
                <strong className="num">$39</strong>
                <span>per month, up to 4 tutors</span>
              </p>
              <ul className="nm-checks">
                {INCLUDED.map((item, i) => (
                  <li key={item} style={{ "--i": i } as CSSProperties}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nm-offer-stub">
              <a className="nm-btn nm-btn--primary" href="#demo">Start a conversation</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
