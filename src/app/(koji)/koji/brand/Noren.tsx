const PANELS = [
  { href: "#kitchen", label: "Kitchen", jp: "厨房" },
  { href: "#omakase", label: "Omakase", jp: "献立" },
  { href: "#building", label: "Building", jp: "塔" },
  { href: "#chef", label: "Chef", jp: "板前" },
  { href: "#reserve", label: "Reserve", jp: "予約" },
];

/** The noren curtain: five hanging panels split by slits, each one a navigation link. */
export function Noren() {
  return (
    <nav className="kj-noren" aria-label="Sections">
      {PANELS.map((p) => (
        <a key={p.href} href={p.href} className="kj-noren__panel">
          <span className="kj-noren__jp" aria-hidden="true">
            {p.jp}
          </span>
          <span className="kj-noren__label">{p.label}</span>
        </a>
      ))}
    </nav>
  );
}
