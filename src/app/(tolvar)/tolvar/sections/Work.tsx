import { Hatch } from "../brand/Marks";
import { Reveal } from "../motion/Reveal";
import { serviceCount } from "../work/services";
import { WorkTabs } from "../work/WorkTabs";

export function Work() {
  return (
    <section className="tv-section tv-work" id="work" aria-labelledby="tv-work-title">
      <div className="tv-wrap">
        <header className="tv-head">
          <Reveal as="p" variant="slide" className="tv-eyebrow tv-gauge">
            The work · {serviceCount()} services
          </Reveal>
          <Reveal as="h2" variant="lines" className="tv-title" id="tv-work-title">
            <span className="tv-line">
              <span>Dirt only moves</span>
            </span>{" "}
            <span className="tv-line">
              <span>four ways.</span>
            </span>
          </Reveal>
          <Reveal as="p" className="tv-lede" delay={120}>
            It gets cut out, filled in, moved aside for pipe, or put on a truck. Everything we do is one of those, so
            that is how the work is sorted.
          </Reveal>
        </header>
        <Reveal variant="rise" delay={80}>
          <WorkTabs />
        </Reveal>
      </div>
      <Hatch kind="earth" />
    </section>
  );
}
