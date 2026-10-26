import { Reveal } from "../motion/Reveal";
import { Workspace } from "../journey/Workspace";
import { StageControls } from "../journey/StageControls";
import { Arrow } from "../brand/Arrow";
export function Experience() {
  return (
    <section
      className="fd-story"
      id="experience"
      data-stage="0"
      aria-labelledby="fd-experience-title"
    >
      <div className="fd-story-stage fd-wrap">
        <div className="fd-story-copy">
          <Reveal variant="mask">
            <p className="fd-eyebrow">02 / LESS WATCHING. MORE DOING.</p>
            <h2 id="fd-experience-title">
              The best way in?
              <br />
              <span className="fd-soft">Get stuck in.</span>
            </h2>
          </Reveal>
          <StageControls />
          <a className="fd-text-link" href="#begin">
            Your first project is waiting <Arrow diagonal />
          </a>
        </div>
        <Reveal variant="wipe" className="fd-story-visual">
          <div className="fd-story-sticker">
            <span>✳</span> A LITTLE OUT OF YOUR COMFORT ZONE.
            <br /> A LOT CLOSER TO YOUR FUTURE.
          </div>
          {[0, 1, 2].map((stage) => (
            <div className={`fd-scene fd-scene-${stage}`} key={stage}>
              <Workspace stage={stage} />
            </div>
          ))}
          <div className="fd-story-footnote">
            <span className="fd-dot" /> A safe place to try. A good place to
            grow.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
