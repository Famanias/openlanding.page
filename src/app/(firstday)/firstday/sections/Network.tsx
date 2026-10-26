import { Reveal } from "../motion/Reveal";
export function Network() {
  return (
    <section
      id="network"
      className="fd-network fd-wrap"
      aria-label="Our fictional learning network"
    >
      <Reveal variant="draw" className="fd-rule" />
      <div className="fd-network-row">
        <p>
          Good work starts
          <br />
          in good company.
        </p>
        <div className="fd-wordmarks" aria-label="Illustrative studio network">
          <span className="fd-wm-common">
            common
            <br />
            ground®
          </span>
          <span className="fd-wm-orbit">◉ orbit</span>
          <span className="fd-wm-flock">
            flock<span>↗</span>
          </span>
          <span className="fd-wm-north">
            NORTH
            <br />
            <small>COLLECTIVE</small>
          </span>
          <span className="fd-wm-made">madeby.</span>
        </div>
      </div>
      <span className="fd-network-disclaimer">
        An imagined network for a world of possibilities.
      </span>
    </section>
  );
}
