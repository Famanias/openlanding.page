import { Picture } from "../assets";
import { TiltCard } from "../motion/TiltCard";
import { Reveal } from "../motion/Reveal";
import { FIELD_SYSTEMS } from "../content/field-data";

export function FieldSystems() {
  return (
    <section className="rl-section rl-systems" id="systems" aria-labelledby="rl-systems-title">
      <div className="rl-container">
        <div className="rl-section-head rl-section-head--center"><Reveal className="rl-eyebrow">03 / FIELD SYSTEMS</Reveal><h2 id="rl-systems-title" className="rl-section-title">Small lines. Longer seasons.</h2><p className="rl-section-lead">Three interventions, designed to make the field do less work all at once.</p></div>
        <div className="rl-systems__grid">
          {FIELD_SYSTEMS.map((system, index) => (
            <TiltCard key={system.id} className="rl-system-card" dataAlign={system.align}>
              <div className="rl-system-card__media"><Picture assetKey={system.assetKey} alt={`${system.title} field study`} /></div>
              <div className="rl-system-card__body"><div><Reveal className="rl-mono rl-system-card__eyebrow" index={index}>{system.eyebrow}</Reveal><h3 className="rl-system-card__title">{system.title}</h3><p className="rl-system-card__copy">{system.copy}</p></div><div className="rl-system-card__metric"><span>{system.metric}</span><span aria-hidden="true">↗</span></div></div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

