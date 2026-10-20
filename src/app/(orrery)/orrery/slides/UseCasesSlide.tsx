import { Picture } from "../assets";
import { Eyebrow, rv } from "./Eyebrow";

const CASES = [
  {
    key: "usecase-1",
    title: "Customer operations",
    text: "Triage, research and reply agents clear the queue overnight. People handle the conversations that need a person.",
    alt: "Index cards connected by fine ultramarine ink lines",
  },
  {
    key: "usecase-2",
    title: "Research and analysis",
    text: "One agent gathers sources, another checks every claim, a third writes the brief your team actually reads.",
    alt: "A brass magnifying lens over a printed star chart",
  },
  {
    key: "usecase-3",
    title: "Software engineering",
    text: "Planning, coding and review agents work the same ticket in turn, and every change arrives with its reasoning.",
    alt: "Brass clock gears on gridded drafting paper",
  },
];

export function UseCasesSlide() {
  return (
    <div className="orr-slide-inner orr-cases">
      <Eyebrow n={5}>Use cases</Eyebrow>
      <h2 className="orr-h2 orr-cases__title orr-reveal" style={rv(1)}>
        Where teams put <em>it to work.</em>
      </h2>
      <ul className="orr-cases__list">
        {CASES.map((c, i) => (
          <li key={c.key} className="orr-cases__item orr-reveal" style={rv(i + 2)}>
            <Picture assetKey={c.key} alt={c.alt} className="orr-art orr-art--card" sizes="(min-width: 900px) 28vw, 100vw" />
            <h3 className="orr-h3">{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
