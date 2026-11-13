import { AccessForm } from "../forms/AccessForm";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

export function Access() {
  return (
    <section id="access" className="dt-access" aria-labelledby="dt-access-heading">
      <div className="dt-section-head">
        <Reveal variant="draw" className="dt-hairline-draw" />
        <Reveal variant="rise">
          <p className="dt-eyebrow">05 // SDK BRIEF & WORKSPACE ACCESS</p>
        </Reveal>
        <Reveal variant="mask">
          <h2 id="dt-access-heading" className="dt-display dt-h2">
            <SplitText text="Export your frame specification." />
          </h2>
        </Reveal>
      </div>

      <AccessForm />
    </section>
  );
}
