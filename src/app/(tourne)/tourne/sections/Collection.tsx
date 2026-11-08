import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";
import { FORMS } from "../vessel/forms";
import { VesselSvg } from "../vessel/VesselSvg";
import { specOf } from "../vessel/profile";
import { LoadFormButton } from "./LoadFormButton";

export function Collection() {
  return (
    <section id="collection" className="tn-collection" aria-labelledby="tn-collection-title">
      <div className="tn-section-head">
        <Reveal as="p" variant="slide-left" className="tn-eyebrow">
          05 · Five forms
        </Reveal>
        <Reveal as="h2" variant="mask" className="tn-display tn-h2">
          <span id="tn-collection-title">
            <SplitText text="Start from one we love." />
          </span>
        </Reveal>
        <Reveal as="p" variant="rise" delay={120} className="tn-body-copy">
          Each form is a starting point. Load it on the wheel and change anything you like.
        </Reveal>
      </div>
      <ul className="tn-cards">
        {FORMS.map((form, i) => {
          const spec = specOf(form.params);
          return (
            <Reveal as="li" key={form.id} variant="scale" index={i} className="tn-card-cell">
              <TiltCard as="article" className="tn-card">
                <div className="tn-card-art">
                  <VesselSvg params={form.params} glazeId={form.defaultGlaze} label={`${form.name} in the default glaze`} />
                </div>
                <div className="tn-card-body">
                  <h3 className="tn-display tn-h3">{form.name}</h3>
                  <p className="tn-card-use">{form.use}</p>
                  <p className="tn-card-note">{form.note}</p>
                  <p className="tn-mono tn-card-spec">
                    {spec.heightCm} cm · {spec.volumeMl.toLocaleString("en-US")} ml · ${form.priceUsd}
                  </p>
                  <LoadFormButton formId={form.id} name={form.name} />
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
