import { Picture } from "../assets";
import { Reveal } from "../motion/Reveals";

const method = [
  { number: "01", title: "Read the site", body: "We start with the live conditions, the drawings, and the question behind the request." },
  { number: "02", title: "Make the proof", body: "The crew tests, documents, and keeps the signal visible while the work is in motion." },
  { number: "03", title: "Leave the handoff", body: "Your team gets a clean closeout, a clear next step, and someone who owns the follow-through." },
];

export function Method() {
  return (
    <section id="method" className="tc-section tc-section--dark tc-field-section" data-field-section="method" aria-labelledby="method-title">
      <div className="tc-container tc-method-grid">
        <Reveal className="tc-method-media" kind="wipe">
          <div className="tc-media-frame"><Picture assetKey="safety-hands" alt="Gloved hands checking safety equipment before a site walk" sizes="(min-width: 900px) 30vw, 70vw" /></div>
          <div className="tc-media-frame"><Picture assetKey="handoff-drawing" alt="Field engineer pointing at a site drawing beside a completed panel" sizes="(min-width: 900px) 24vw, 60vw" /></div>
        </Reveal>
        <div>
          <Reveal kind="rise">
            <span className="tc-eyebrow">Working method / no theatre</span>
            <h2 id="method-title" style={{ maxWidth: "10ch", margin: "18px 0 0", font: "400 clamp(3.2rem, 6vw, 7rem)/.9 var(--font-tc-display)", letterSpacing: "-.065em" }}>The handoff is part of the work.</h2>
          </Reveal>
          <ol className="tc-method-list">
            {method.map((step, index) => <li className="tc-method-item" key={step.number}><Reveal className="tc-method-reveal" kind="rule" delay={index * 90}><span className="tc-method-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></Reveal></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
