import { Hatch } from "../brand/Marks";
import { JobLog } from "../joblog/JobLog";
import { JOBS } from "../joblog/jobs";
import { Reveal } from "../motion/Reveal";

export function JobLogSection() {
  return (
    <section className="tv-section tv-log tv-dark" id="log" aria-labelledby="tv-log-title">
      <div className="tv-wrap">
        <header className="tv-head">
          <Reveal as="p" variant="slide" className="tv-eyebrow tv-gauge">
            Job log · {JOBS.length} tickets
          </Reveal>
          <Reveal as="h2" variant="lines" className="tv-title" id="tv-log-title">
            <span className="tv-line">
              <span>Shot from the cab,</span>
            </span>{" "}
            <span className="tv-line">
              <span>not a studio.</span>
            </span>
          </Reveal>
          <Reveal as="p" className="tv-lede" delay={120}>
            Every photo here was taken by somebody on the crew, usually with a phone and one glove off. No two days are
            the same job, which is most of why we still like it.
          </Reveal>
        </header>
        <Reveal variant="rise" delay={80}>
          <JobLog />
        </Reveal>
      </div>
      <Hatch kind="gravel" />
    </section>
  );
}
