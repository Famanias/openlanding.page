import { Logo } from "../brand/Logo";

const COLUMNS = [
  {
    title: "Brands",
    links: [
      ["Makers", "#makers"],
      ["Packs", "#packs"],
      ["Send a brief", "#brief"],
    ],
  },
  {
    title: "Makers",
    links: [
      ["Apply to join", "#brief"],
      ["Rates and payouts", "#packs"],
      ["Our standards", "#how"],
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="sa-footer">
      <div className="sa-wrap sa-footer__grid" data-reveal="cascade">
        <div className="sa-footer__brand" style={{ "--i": 0 } as React.CSSProperties}>
          <Logo />
          <p className="sa-footer__tag">Reels that land, made by hand. Short product clips from handpicked makers, in segments.</p>
          <a className="sa-footer__mail" href="mailto:hello@satsuma.example">
            hello@satsuma.example
          </a>
        </div>
        {COLUMNS.map((c, i) => (
          <nav key={c.title} aria-label={c.title} style={{ "--i": i + 1 } as React.CSSProperties}>
            <h2 className="sa-footer__title">{c.title}</h2>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="sa-wrap sa-footer__fine">© 2026 Satsuma Reels Co. A fictional brand for a landing-page template.</p>
    </footer>
  );
}
