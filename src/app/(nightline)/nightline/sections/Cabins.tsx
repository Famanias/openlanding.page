import { Picture } from "../assets";
import { CABINS } from "../content/cabins";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

export function Cabins() {
  return (
    <section id="cabins" className="nli-section nli-cabins">
      <div className="nli-section-head">
        <Reveal type="label">
          <p className="nli-eyebrow">03 / FIND YOUR BERTH</p>
        </Reveal>
        <Reveal type="mask">
          <h2>
            Sleep how<br />
            <em>you travel.</em>
          </h2>
        </Reveal>
        <Reveal type="rise">
          <p>Three ways to make the night yours. Every cabin has a reading light, a clean sheet, and a view that keeps moving.</p>
        </Reveal>
      </div>
      <div className="nli-cabin-grid">
        {CABINS.map((cabin, index) => (
          <TiltCard key={cabin.code}>
            <div className={`nli-cabin nli-cabin--${cabin.tone}`}>
              <div className="nli-cabin__window">
                <Picture
                  assetKey={cabin.assetKey}
                  alt={`${cabin.name} compartment`}
                  className="nli-cabin__pic"
                  sizes="(min-width: 900px) 30vw, 90vw"
                >
                  <span>WINDOW {String(index + 1).padStart(2, "0")}</span>
                  <i />
                </Picture>
              </div>
              <p className="nli-mono">
                {cabin.code} · {cabin.price}
              </p>
              <h3>{cabin.name}</h3>
              <p>{cabin.detail}</p>
              <a href="#book">
                Choose this berth <span>↗</span>
              </a>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
