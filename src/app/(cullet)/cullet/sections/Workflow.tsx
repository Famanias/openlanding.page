import type { CSSProperties } from "react";
import { STEPS } from "../content/copy";
import { MaskLine, Reveal } from "../motion/Reveal";

const LAYERS = [
  { name: "Clearcoat", v: "rough 0.08" },
  { name: "Thin film", v: "280–680 nm" },
  { name: "Volume", v: "1.4 cm" },
  { name: "Body", v: "IOR 1.54" },
];

const RENDERERS = [
  { name: "three.js", ms: "1.6" },
  { name: "Babylon.js", ms: "1.8" },
  { name: "model-viewer", ms: "1.7" },
];

function CutMock() {
  return (
    <ol className="fc-mock fc-mock--layers" aria-label="Material layers">
      {LAYERS.map((l, i) => (
        <li key={l.name} className="fc-mock__layer" style={{ "--i": i } as CSSProperties}>
          <span className="fc-mock__grip" aria-hidden="true" />
          <span>{l.name}</span>
          <span className="fc-mono">{l.v}</span>
        </li>
      ))}
    </ol>
  );
}

function PreviewMock() {
  return (
    <ul className="fc-mock fc-mock--tiles" aria-label="Renderer previews">
      {RENDERERS.map((r) => (
        <li key={r.name} className="fc-mock__tile">
          <svg viewBox="0 0 60 48" aria-hidden="true" className="fc-mock__gem">
            <path d="M30 6 50 20 30 44 10 20Z" />
            <path d="M10 20H50M30 6 22 20 30 44 38 20Z" />
          </svg>
          <span className="fc-mock__tile-name">{r.name}</span>
          <span className="fc-mono">{r.ms} ms</span>
        </li>
      ))}
    </ul>
  );
}

function ShipMock() {
  return (
    <pre className="fc-mock fc-mock--code" aria-label="Export code example">
      <code>
        <span className="fc-code__k">import</span> {"{ cullet }"} <span className="fc-code__k">from</span> <span className="fc-code__s">&quot;@cullet/three&quot;</span>;{"\n\n"}
        <span className="fc-code__k">const</span> glass = <span className="fc-code__k">await</span> cullet(<span className="fc-code__s">&quot;frosted-quartz&quot;</span>);{"\n"}
        bottle.material = glass;{"\n"}
        <span className="fc-code__c">{"// 4.1 kB · KHR_materials_dispersion"}</span>
      </code>
    </pre>
  );
}

const MOCKS = [CutMock, PreviewMock, ShipMock];

/** Chapter 03: cut, preview, ship. Three steps joined by a drawn line, each with its own working surface. */
export function Workflow() {
  return (
    <section className="fc-flow" id="workflow" aria-labelledby="fc-flow-title">
      <div className="fc-wrap">
        <header className="fc-head fc-head--split">
          <div>
            <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 03 · The workflow</Reveal>
            <h2 id="fc-flow-title" className="fc-h2">
              <MaskLine>Cut. Preview.</MaskLine> <MaskLine index={1}>Ship.</MaskLine>
            </h2>
          </div>
          <Reveal as="p" className="fc-lead" index={1}>
            No baking, no turntable renders, no &quot;looks different in the app&quot;. One material, authored once, rendered the same by every viewer that reads glTF.
          </Reveal>
        </header>
        <div className="fc-flow__steps">
          <Reveal variant="draw" className="fc-flow__line"><span /></Reveal>
          {STEPS.map((s, i) => {
            const Mock = MOCKS[i];
            return (
              <Reveal as="article" key={s.n} variant="scale" index={i} className="fc-step" id={`fc-step-${s.verb.toLowerCase()}`}>
                <div className="fc-step__node" aria-hidden="true"><span>{s.n}</span></div>
                <p className="fc-step__verb">{s.verb}</p>
                <h3 className="fc-step__title">{s.title}</h3>
                <p className="fc-step__body">{s.body}</p>
                <div className="fc-step__mock"><Mock /></div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
