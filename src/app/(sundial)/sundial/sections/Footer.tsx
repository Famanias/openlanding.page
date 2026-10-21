import { Lockup } from "../brand/Logo";

const HOURS = [
  { day: "Mon – Fri", time: "7:00 – 17:00" },
  { day: "Saturday", time: "8:00 – 16:00" },
  { day: "Sunday", time: "8:00 – 14:00" },
];

const LINKS = [
  { href: "#roast", label: "The Roast" },
  { href: "#lots", label: "Lots" },
  { href: "#brew", label: "Brew bench" },
  { href: "#subscribe", label: "Subscribe" },
  { href: "#wholesale", label: "Wholesale" },
];

export function Footer() {
  return (
    <footer className="sd-footer">
      <div className="sd-wrap">
        <p className="sd-display" style={{ fontSize: "clamp(38px, 7vw, 96px)", margin: "0 0 48px" }}>
          Roasted to the <span className="sd-turn">minute.</span>
        </p>
        <div className="sd-footer__grid">
          <div>
            <Lockup height={22} crease="var(--color-espresso)" tagline="var(--color-husk)" />
            <p style={{ maxWidth: "30ch", color: "var(--color-husk)", margin: "18px 0 0", fontSize: "0.95rem" }}>
              Small lots, read by the curve. 41 Mill Street, on the corner of the old grain
              exchange.
            </p>
          </div>
          <div>
            <p className="sd-mono" style={{ color: "var(--color-husk)", margin: "0 0 12px" }}>
              The counter
            </p>
            <dl className="sd-footer__hours">
              {HOURS.map((row) => (
                <div key={row.day}>
                  <dt>{row.day}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <nav aria-label="Footer">
            <p className="sd-mono" style={{ color: "var(--color-husk)", margin: "0 0 12px" }}>
              Pages
            </p>
            <ul className="sd-footer__links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="sd-mono sd-footer__legal">
          © 2026 SUNDIAL Coffee Roasters — a fictional brand, roasted for the template gallery.
        </p>
      </div>
    </footer>
  );
}
