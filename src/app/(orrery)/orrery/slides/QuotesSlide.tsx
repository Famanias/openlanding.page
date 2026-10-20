import { Picture } from "../assets";
import { Eyebrow, rv } from "./Eyebrow";

const QUOTES = [
  {
    text: "We stopped babysitting one agent and started managing a team. Our overnight queue is empty by 7 a.m.",
    name: "Mara Ilunga",
    role: "Head of Support Operations, Northwind Freight",
  },
  {
    text: "Every change arrives with the reasoning attached. Code review got faster because there's less to argue about.",
    name: "Tomás Reyes",
    role: "VP Engineering, Halden",
  },
  {
    text: "The fact-checking agent catches what our writers miss. It's the colleague who reads the footnotes.",
    name: "Priya Raman",
    role: "Research Lead, Calder Health",
  },
];

export function QuotesSlide() {
  const [lead, ...rest] = QUOTES;
  return (
    <div className="orr-slide-inner orr-quotes">
      <Eyebrow n={7}>Customers</Eyebrow>
      <h2 className="orr-visually-hidden">What teams say</h2>
      <figure className="orr-quotes__lead orr-reveal" style={rv(1)}>
        <Picture assetKey="quote-texture" alt="" className="orr-quotes__texture" sizes="40vw" />
        <blockquote>
          <p className="orr-quotes__big">&ldquo;{lead.text}&rdquo;</p>
        </blockquote>
        <figcaption>
          <span className="orr-quotes__name">{lead.name}</span>
          <span className="orr-label">{lead.role}</span>
        </figcaption>
      </figure>
      <div className="orr-quotes__rest">
        {rest.map((q, i) => (
          <figure key={q.name} className="orr-quotes__small orr-reveal" style={rv(i + 2)}>
            <blockquote>
              <p>&ldquo;{q.text}&rdquo;</p>
            </blockquote>
            <figcaption>
              <span className="orr-quotes__name">{q.name}</span>
              <span className="orr-label">{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
