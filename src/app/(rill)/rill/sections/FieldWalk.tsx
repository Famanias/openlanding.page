import { Reveal } from "../motion/Reveal";
import { FieldWalkForm } from "../forms/FieldWalkForm";

export function FieldWalk() {
  return (
    <section className="rl-section rl-fieldwalk" id="field-walk" aria-labelledby="rl-fieldwalk-title">
      <div className="rl-container rl-fieldwalk__grid">
        <div className="rl-fieldwalk__intro"><Reveal className="rl-eyebrow">06 / FIELD WALK</Reveal><h2 id="rl-fieldwalk-title">Start with the ground you have.</h2><p>Tell us what the field is doing now. We’ll bring a map, a rain gauge and a way to leave the next storm in the soil.</p><p className="rl-mono">No sales deck / just a measured first read.</p></div>
        <FieldWalkForm />
      </div>
    </section>
  );
}

