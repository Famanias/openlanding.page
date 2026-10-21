import { WholesaleForm } from "../forms/WholesaleForm";
import { Picture } from "../assets";
import { Eyebrow } from "./Eyebrow";

export function Wholesale() {
  return (
    <section id="wholesale" className="sd-section sd-beanground sd-dark">
      <div className="sd-wrap sd-wholesale">
        <div>
          <Eyebrow>§ 06 — Wholesale</Eyebrow>
          <h2 className="sd-display" style={{ fontSize: "clamp(34px, 5vw, 60px)", margin: "0 0 14px", maxWidth: "16ch" }}>
            Cafés, kitchens and studios: we roast for you too.
          </h2>
          <p style={{ maxWidth: "46ch", color: "var(--color-oat)", margin: "0 0 24px" }}>
            Wholesale partners get the same logs as retail — every delivery ships with the
            batch curves it came from, plus dial-in support at your bar.
          </p>
          <ul className="sd-wholesale__perks">
            <li className="sd-chip" style={{ color: "var(--color-crema)", borderColor: "color-mix(in srgb, var(--color-crema) 45%, transparent)" }}>
              Delivery within 12 h of drop
            </li>
            <li className="sd-chip" style={{ color: "var(--color-crema)", borderColor: "color-mix(in srgb, var(--color-crema) 45%, transparent)" }}>
              Free dial-in visits
            </li>
            <li className="sd-chip" style={{ color: "var(--color-crema)", borderColor: "color-mix(in srgb, var(--color-crema) 45%, transparent)" }}>
              Curve cards for your menu
            </li>
          </ul>
          <figure className="sd-photo sd-photo--32 sd-wholesale__media">
            <Picture
              assetKey="counter-scene"
              alt="A modern roastery counter: kraft bags on an oak shelf, a brass scoop and a small steel roasting drum"
              sizes="(min-width: 900px) 40vw, 100vw"
            />
          </figure>
        </div>
        <WholesaleForm />
      </div>
    </section>
  );
}
