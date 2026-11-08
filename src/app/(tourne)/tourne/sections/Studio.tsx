import { CountUp } from "../motion/CountUp";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { Picture } from "../assets";
import { GLAZE_TICKER, POTTERS, PROCESS, STUDIO_FACTS } from "./content";

export function Studio() {
  return (
    <section id="studio" className="tn-studio" aria-labelledby="tn-studio-title">
      <Marquee items={GLAZE_TICKER} label="Glazes and firings" />

      <div className="tn-section-head">
        <Reveal as="p" variant="slide-left" className="tn-eyebrow">
          04 · The studio
        </Reveal>
        <Reveal as="h2" variant="mask" className="tn-display tn-h2" >
          <span id="tn-studio-title">
            <SplitText text="Two potters. One kiln. No shortcuts." />
          </span>
        </Reveal>
      </div>

      <ol className="tn-process">
        {PROCESS.map((step, i) => (
          <Reveal as="li" key={step.id} variant="rise" index={i} className="tn-process-step">
            <span className="tn-process-rule" aria-hidden="true" />
            <span className="tn-mono tn-process-time">{step.duration}</span>
            <h3 className="tn-display tn-h3">{step.name}</h3>
            <p>{step.detail}</p>
          </Reveal>
        ))}
      </ol>

      <div className="tn-potters">
        {POTTERS.map((potter, i) => (
          <Reveal as="figure" key={potter.id} variant="wipe" index={i} className="tn-potter">
            <Picture assetKey={potter.assetKey} alt={`${potter.name} at work in the studio`} className="tn-potter-image" />
            <figcaption>
              <span className="tn-display tn-h3">{potter.name}</span>
              <span className="tn-mono">{potter.role}</span>
              <span>{potter.line}</span>
            </figcaption>
          </Reveal>
        ))}
        <Reveal variant="unfurl" className="tn-facts">
          {STUDIO_FACTS.map((fact) => (
            <div key={fact.id}>
              <p className="tn-display tn-fact-value">
                <CountUp value={fact.value} suffix={fact.suffix} />
              </p>
              <p className="tn-mono">{fact.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
