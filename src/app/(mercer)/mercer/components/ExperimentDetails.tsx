import { ArrowUpRight } from "lucide-react";
import { AppletCode } from "./HudCards";
import TorusKnotFallback from "./TorusKnotFallback";

export default function ExperimentDetails({ onReturn }: { onReturn: () => void }) {
  return (
    <div className="jm-experiment-detail">
      <div className="jm-experiment-intro">
        <h2 id="jm-dialog-title">A knot of <br /><span>possibilities.</span></h2>
        <p>One continuous curve. A little mathematics. An exploration of what happens when code takes shape.</p>
      </div>
      <div className="jm-experiment-body">
        <figure className="jm-experiment-study">
          <div className="jm-experiment-preview">
            <TorusKnotFallback />
            <span className="jm-study-mark jm-mono" aria-hidden="true">FIG. 001 / CONTINUOUS FORM</span>
          </div>
          <figcaption className="jm-sr-only">A static study of the cyan and chartreuse interwoven torus knot.</figcaption>
          <dl className="jm-experiment-specs jm-mono">
            <div><dt>FORM</dt><dd>(2, 3) TORUS KNOT</dd></div>
            <div><dt>SURFACE</dt><dd>LIGHT / LATTICE / MEMBRANE</dd></div>
            <div><dt>INTERACTION</dt><dd>POINTER PARALLAX</dd></div>
          </dl>
        </figure>
        <section className="jm-experiment-source" aria-labelledby="jm-source-title">
          <div className="jm-source-head jm-mono"><h3 id="jm-source-title">APPLET SKETCH</h3><span>applet.ts</span></div>
          <pre className="jm-experiment-code" aria-label="Illustrative TypeScript animation sketch"><AppletCode /></pre>
          <p className="jm-source-caption">A sketch of the idea. The live experiment adds light, a particle envelope and a response to your pointer.</p>
        </section>
      </div>
      <div className="jm-experiment-end">
        <span className="jm-mono">WRITTEN IN CODE. <br />MADE TO BE EXPLORED.</span>
        <button type="button" className="jm-button jm-button-primary" onClick={onReturn}>RETURN TO EXPERIMENT <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
