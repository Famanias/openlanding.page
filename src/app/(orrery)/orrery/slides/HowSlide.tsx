import { Eyebrow, rv } from "./Eyebrow";

const STEPS = [
  {
    title: "Describe the work",
    text: "Write the outcome you want in plain language: the inputs, the bar for done, who signs off.",
  },
  {
    title: "Orrery assembles the team",
    text: "The conductor picks specialists, sets their orbits and wires them to one shared memory.",
  },
  {
    title: "Review, approve, ship",
    text: "Every hand-off is logged. You approve the result, or send it back around with a note.",
  },
];

export function HowSlide() {
  return (
    <div className="orr-slide-inner orr-how">
      <Eyebrow n={4}>How it works</Eyebrow>
      <h2 className="orr-h2 orr-how__title orr-reveal" style={rv(1)}>
        Three steps from brief <em>to finished work.</em>
      </h2>
      <ol className="orr-steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="orr-steps__item orr-reveal" style={rv(i + 2)}>
            <span className="orr-steps__n">{i + 1}</span>
            <h3 className="orr-h3">{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
