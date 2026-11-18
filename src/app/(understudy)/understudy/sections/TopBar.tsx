import Link from "next/link";
import { Logo } from "../brand/Logo";
import { LiveCount } from "../motion/LiveCount";

export type UnderstudyPageId = "home" | "parts" | "method" | "casting" | "tuition";

const NAV_ITEMS: { id: Exclude<UnderstudyPageId, "home">; href: string; label: string }[] = [
  { id: "parts", href: "/templates/understudy/parts", label: "Repertoire" },
  { id: "method", href: "/templates/understudy/method", label: "Method" },
  { id: "casting", href: "/templates/understudy/casting", label: "Casting" },
  { id: "tuition", href: "/templates/understudy/tuition", label: "Tuition" },
];

/**
 * The top masthead: brand lockup, multi-page route navigation, live readout,
 * and quick-action audition triggers.
 */
export function TopBar({ activePage = "home" }: { activePage?: UnderstudyPageId }) {
  return (
    <header className="us-top">
      <div className="us-top__brand">
        {activePage === "home" ? (
          <a className="us-top__logo" href="#top" data-us-go="top" aria-label="Understudy home">
            <Logo />
          </a>
        ) : (
          <Link className="us-top__logo" href="/templates/understudy" aria-label="Understudy home">
            <Logo />
          </Link>
        )}
        <span className="us-top__badge us-mono" aria-hidden="true">Season 2026</span>
      </div>

      <nav className="us-top__nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            className="us-top__link"
            href={item.href}
            aria-current={activePage === item.id ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="us-top__actions">
        <p className="us-live" data-ambient>
          <i className="us-live__dot" aria-hidden="true" />
          <span className="us-mono">Rehearsing now</span>
          <LiveCount />
        </p>
        <button type="button" className="us-btn us-btn--cue us-btn--sm us-top__audition" data-us-start>
          <span className="us-roll" data-text="Audition"><span>Audition</span></span>
        </button>
      </div>
    </header>
  );
}
