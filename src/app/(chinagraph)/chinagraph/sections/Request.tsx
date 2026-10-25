import { Picture } from "../assets";
import { SheetRequestForm } from "../forms/SheetRequestForm";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

export function Request() {
  return (
    <section id="request" className="cg-section cg-request" aria-labelledby="cg-request-title">
      <div className="cg-container cg-request__grid">
        <div className="cg-request__copy">
          <Reveal kind="rise">
            <p className="cg-eyebrow"><span>Request</span><span>Run of 400</span></p>
            <h2 id="cg-request-title" className="cg-h2"><SplitText>{"Get the sheet\nin the post."}</SplitText></h2>
            <p className="cg-lead">The whole roll, printed as an A2 contact sheet on fibre paper, with our marks on it. Free for customers, stockists and press, while the run lasts.</p>
          </Reveal>
          <Reveal kind="wipe" className="cg-request__frame">
            <span className="cg-request__img"><Picture assetKey="roll-08" alt="Model walking away down a tiled tunnel, back to camera" sizes="(min-width: 900px) 36vw, 90vw" /></span>
          </Reveal>
        </div>
        <Reveal kind="wipe" className="cg-request__form">
          <SheetRequestForm />
        </Reveal>
      </div>
    </section>
  );
}
