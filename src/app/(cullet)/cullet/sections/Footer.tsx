import { Logo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";
import { BackToTop } from "./BackToTop";

const COLUMNS = [
  { title: "Studio", links: [["The sampler", "#sampler"], ["Materials", "#materials"], ["Pricing", "#pricing"], ["Open a seat", "#open"]] },
  { title: "Lab", links: [["Five terms", "#terms"], ["Workflow", "#workflow"], ["The numbers", "#proof"]] },
];

/** The colophon: the lockup, a cut wordmark, the index, and the extension the whole page is about. */
export function Footer() {
  return (
    <footer className="fc-foot" aria-labelledby="fc-foot-title">
      <div className="fc-wrap">
        <div className="fc-foot__top">
          <div className="fc-foot__brand">
            <Logo />
            <p id="fc-foot-title" className="fc-foot__line">A real-time material studio. Designed in glass, rendered everywhere.</p>
          </div>
          <nav className="fc-foot__cols" aria-label="Footer">
            {COLUMNS.map((c) => (
              <div key={c.title} className="fc-foot__col">
                <p className="fc-foot__head">{c.title}</p>
                <ul>
                  {c.links.map(([label, href]) => (
                    <li key={href}><a className="fc-link fc-link--quiet" href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <Reveal variant="cleave" className="fc-foot__word">
          <span aria-hidden="true">
            <svg viewBox="0 0 820 236" className="fc-foot__svg"><text x="-6" y="214">Cullet</text></svg>
          </span>
        </Reveal>
        <div className="fc-foot__base">
          <span>© 2026 Cullet Lab · a fictional brand for a landing-page template</span>
          <span className="fc-mono">KHR_materials_dispersion</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
