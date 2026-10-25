import { Logo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";

const COLS = [
  { title: "Shop", links: [["The shelf", "#shelf"], ["Build a box", "#box"], ["Friday list", "#list"]] },
  { title: "Kitchen", links: [["The trip", "#trip"], ["Batch day", "#batch"], ["Questions", "#faq"]] },
];

export function Footer() {
  return (
    <footer className="pk-footer">
      <div className="pk-wrap">
        <div className="pk-footer-grid">
          <div>
            <Logo size={44} className="pk-logo--light" />
            <p className="pk-footer-line">Small-batch jam. Two cooks, one pot, a very reliable Friday.</p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="pk-footer-h">{c.title}</p>
              <ul>
                {c.links.map(([label, href]) => <li key={href}><a className="pk-link" href={href}>{label}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <Reveal variant="mask" className="pk-footer-mark"><span aria-hidden="true">pipkin</span></Reveal>
        <p className="pk-footer-small">© Pipkin Preserves. A fictional shop, cooked up as a landing page template.</p>
      </div>
    </footer>
  );
}
