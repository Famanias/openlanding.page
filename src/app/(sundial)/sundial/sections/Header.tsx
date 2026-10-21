import { Lockup } from "../brand/Logo";

const LINKS = [
  { href: "#roast", label: "The Roast" },
  { href: "#lots", label: "Lots" },
  { href: "#brew", label: "Brew bench" },
  { href: "#subscribe", label: "Subscribe" },
];

export function Header() {
  return (
    <header className="sd-topbar">
      <div className="sd-topbar__inner">
        <a
          href="#top"
          style={{ textDecoration: "none", color: "var(--color-espresso)", display: "flex" }}
          aria-label="SUNDIAL COFFEE ROASTERS, back to top"
        >
          <Lockup height={22} />
        </a>
        <nav aria-label="Primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="sd-hidden-mobile" style={{ display: "flex", gap: 6 }}>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="sd-navlink">
                {link.label}
              </a>
            ))}
          </span>
          <a href="#subscribe" className="sd-btn sd-btn--tangerine" style={{ minHeight: 44 }}>
            Order bags
          </a>
        </nav>
      </div>
    </header>
  );
}
