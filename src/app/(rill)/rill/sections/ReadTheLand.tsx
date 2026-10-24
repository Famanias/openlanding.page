import { Reveal } from "../motion/Reveal";
import { WatershedStage } from "../watershed/WatershedStage";

export function ReadTheLand() {
  return (
    <div>
      <div className="rl-container rl-section rl-section--dark" style={{ paddingBottom: "clamp(56px, 8vw, 96px)" }}>
        <Reveal className="rl-eyebrow">01 / READ THE LAND</Reveal>
        <h2 className="rl-section-title" style={{ marginTop: 18, maxWidth: "8ch" }}>A storm is a route.</h2>
        <p className="rl-section-lead" style={{ marginTop: 20 }}>Follow one drop from ridge to root zone. Scroll the field or take the gauge in your own hands.</p>
      </div>
      <WatershedStage />
    </div>
  );
}

