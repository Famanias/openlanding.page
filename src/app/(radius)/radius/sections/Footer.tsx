import Link from "next/link";

function PartsIllustration() {
  return (
    <svg viewBox="0 0 760 250" aria-hidden="true" className="rd-parts-illustration">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="130" cy="125" r="91" /><circle cx="130" cy="125" r="75" /><circle cx="130" cy="125" r="10" />
        <path d="M130 34v182M39 125h182M66 61l128 128M194 61 66 189" />
        <path d="M298 33 406 118 298 204 250 118z M298 33v171M250 118h156 M260 101h-30 M397 104l35-29 M427 75h33" />
        <circle cx="298" cy="117" r="13" /><path d="m305 127 25 25m-5-3h18" />
        <path d="M510 62h90l35 45-38 24h-88z M510 62l-20 24v45h19M596 131v51m-30 0h61" />
        <circle cx="687" cy="125" r="35" /><circle cx="687" cy="125" r="24" /><path d="M687 79v-19m0 130v-19m-46-46h-19m130 0h-19" />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="rd-exp-footer">
      <div className="rd-exp-shell">
        <div className="rd-exp-rule"><span>08 / END OF THE LINE</span><span>KEEP MOVING ↗</span></div>
        <div className="rd-exp-footer__top">
          <div><span className="rd-exp-label">A DIFFERENT WAY THROUGH THE CITY</span><p>Every street is yours.</p></div>
          <nav aria-label="Footer navigation">
            <Link href="/templates/radius">Overview</Link>
            <Link href="/templates/radius/bike">The bike</Link>
            <Link href="/templates/radius/accessories">Accessories</Link>
            <Link href="/templates/radius/journal">Field notes</Link>
            <Link href="/templates/radius/fit-service">Fit &amp; care</Link>
            <Link href="/templates/radius/reserve">Interest demo</Link>
          </nav>
        </div>
        <div data-reveal="draw"><PartsIllustration /></div>
        <div className="rd-exp-footer__bottom">
          <strong>RADIUS<span>.</span></strong>
          <span>AN OPENLANDING CONCEPT<br />MADE FOR THE EVERYDAY DETOUR</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}
