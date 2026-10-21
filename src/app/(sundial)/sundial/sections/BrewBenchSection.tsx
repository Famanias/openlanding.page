import { BrewBench } from "../brew/BrewBench";
import { Picture } from "../assets";
import { Eyebrow } from "./Eyebrow";

export function BrewBenchSection() {
  return (
    <section id="brew" className="sd-section sd-section--green sd-dark">
      <div className="sd-wrap">
        <div className="sd-chapter__head sd-chapter__head--mirror">
          <figure className="sd-photo sd-photo--32 sd-chapter__media">
            <Picture
              assetKey="pour-over"
              alt="A gooseneck kettle pouring over a blooming V60 bed, steam catching the morning light"
              sizes="(min-width: 900px) 42vw, 100vw"
            />
          </figure>
          <div>
            <Eyebrow>§ 04 — The bench</Eyebrow>
            <h2 className="sd-display" style={{ fontSize: "clamp(34px, 5vw, 64px)", margin: "0 0 12px", maxWidth: "22ch" }}>
              The curve ends in your cup. Here&apos;s how we get it there.
            </h2>
            <p style={{ maxWidth: "54ch", color: "var(--color-oat)", margin: "0" }}>
              Three recipes we actually use at the counter — one per brewer, dialled in for
              this week&apos;s lots. Pick a method; the numbers come with it.
            </p>
          </div>
        </div>
        <BrewBench />
      </div>
    </section>
  );
}
