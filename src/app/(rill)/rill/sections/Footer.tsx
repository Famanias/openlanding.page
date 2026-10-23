import { Logo } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="rl-footer" id="footer">
      <div className="rl-container">
        <div className="rl-footer__grid"><div className="rl-footer__brand"><Logo /><p className="rl-footer__tagline">Keep water in the ground.</p><div className="rl-footer__meta"><span className="rl-mono">34°17' N / 118°23' W</span><span className="rl-mono">RILL / FIELD HYDROLOGY</span></div></div><nav className="rl-footer__links" aria-label="Footer"><a href="#land">Read the land</a><a href="#budget">Water budget</a><a href="#systems">Systems</a><a href="#field-walk">Field walk</a><a href="#top">Back to ridge ↑</a></nav></div>
        <div className="rl-ecosystem"><svg className="rl-ecosystem__diagram" viewBox="0 0 1120 180" role="img" aria-label="An ecosystem line drawing of contour, roots, mycelium and water" xmlns="http://www.w3.org/2000/svg"><path d="M12 50c160-44 266-31 390 4s238 28 350-19c136-56 237-38 356 8" fill="none" stroke="var(--color-riverstone)" strokeWidth="3" strokeLinecap="round"/><path d="M12 64c160-43 266-30 390 4s238 28 350-19c136-56 237-38 356 8" fill="none" stroke="var(--color-riverstone)" strokeWidth="1.5" opacity=".55"/><path d="M120 82c34 12 62 12 95 2M362 86c36 13 67 10 101-3M710 81c38 12 75 10 110-4" fill="none" stroke="var(--color-silt)" strokeWidth="2" strokeLinecap="round"/><path d="M205 135c22-33 33-56 48-87M286 136c20-33 31-55 46-87M792 136c16-34 34-58 54-86" fill="none" stroke="var(--color-lichen)" strokeWidth="3" strokeLinecap="round"/><path d="M168 158c118-18 204-18 309 0 121 21 243 20 450-3" fill="none" stroke="var(--color-limestone)" strokeWidth="2" strokeLinecap="round"/><circle cx="83" cy="42" r="7" fill="var(--color-oxide)"/><circle cx="964" cy="45" r="7" fill="var(--color-oxide)"/><g fill="var(--color-limestone)" fontFamily="var(--font-fira-mono)" fontSize="10" letterSpacing=".14em"><text x="16" y="176">SOIL</text><text x="240" y="176">ROOT</text><text x="542" y="176">MYCELIUM</text><text x="938" y="176">WATER</text></g></svg><div className="rl-ecosystem__caption"><span className="rl-mono">A field is a system, not a surface.</span><span className="rl-mono">RILL / EST. 2026</span></div></div>
      </div>
    </footer>
  );
}

