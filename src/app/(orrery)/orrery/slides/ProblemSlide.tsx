import { Picture } from "../assets";
import { Eyebrow, rv } from "./Eyebrow";

const FAILURES = [
  { title: "It loses the thread.", text: "Long jobs outgrow one context window. Halfway through, the plan is gone." },
  { title: "It does everything at one depth.", text: "Research, writing and review all get the same shallow pass." },
  { title: "Nobody checks its work.", text: "A single agent marks its own homework, and errors ship quietly." },
];

export function ProblemSlide() {
  return (
    <div className="orr-slide-inner orr-problem">
      <Eyebrow n={2}>The problem</Eyebrow>
      <figure className="orr-problem__art orr-reveal" style={rv(1)}>
        <Picture
          assetKey="problem-single"
          alt="A single brass sphere standing alone on an empty sheet of paper"
          className="orr-art orr-art--portrait"
          sizes="(min-width: 900px) 30vw, 100vw"
        />
      </figure>
      <div className="orr-problem__copy">
        <h2 className="orr-h2 orr-reveal" style={rv(1)}>
          One agent <em>isn&rsquo;t</em> a team.
        </h2>
        <ol className="orr-numbered">
          {FAILURES.map((f, i) => (
            <li key={f.title} className="orr-reveal" style={rv(i + 2)}>
              <span className="orr-label orr-numbered__n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="orr-numbered__title">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
