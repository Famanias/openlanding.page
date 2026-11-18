"use client";

import Link from "next/link";
import { useRef } from "react";
import { Logo } from "../brand/Logo";

export type RadiusPageId = "home" | "bike" | "accessories" | "journal" | "fit" | "reserve";

const DESKTOP_LINKS: { id: Exclude<RadiusPageId, "home" | "reserve">; href: string; label: string }[] = [
  { id: "bike", href: "/templates/radius/bike", label: "The bike" },
  { id: "accessories", href: "/templates/radius/accessories", label: "Accessories" },
  { id: "journal", href: "/templates/radius/journal", label: "Field notes" },
  { id: "fit", href: "/templates/radius/fit-service", label: "Fit & service" },
];

const MOBILE_LINKS: { id: RadiusPageId; href: string; label: string; n: string }[] = [
  { id: "home", href: "/templates/radius", label: "Overview", n: "01" },
  { id: "bike", href: "/templates/radius/bike", label: "The bike", n: "02" },
  { id: "accessories", href: "/templates/radius/accessories", label: "Accessories", n: "03" },
  { id: "journal", href: "/templates/radius/journal", label: "Field notes", n: "04" },
  { id: "fit", href: "/templates/radius/fit-service", label: "Fit & service", n: "05" },
  { id: "reserve", href: "/templates/radius/reserve", label: "Reserve preview", n: "06" },
];

export function Header({ activePage = "home" }: { activePage?: RadiusPageId }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };

  return (
    <header className="rd-header">
      <Link className="rd-home" href="/templates/radius" aria-label="RADIUS home"><Logo /></Link>
      <nav className="rd-desktop-nav" aria-label="Primary navigation">
        {DESKTOP_LINKS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={activePage === item.id ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="rd-header-cta" href={activePage === "home" ? "#build" : "/templates/radius#build"}>
        Build your ride <span aria-hidden="true">↗</span>
      </Link>
      <details className="rd-mobile-menu" ref={menu} onKeyDown={event => {
        if (event.key === "Escape" && menu.current?.open) {
          closeMenu();
          menu.current.querySelector("summary")?.focus();
        }
      }}>
        <summary aria-label="Menu"><span /><span /><span /></summary>
        <nav aria-label="Mobile navigation">
          {MOBILE_LINKS.map((item) => (
            <Link key={item.id} onClick={closeMenu} href={item.href} aria-current={activePage === item.id ? "page" : undefined}>
              {item.label} <span>{item.n}</span>
            </Link>
          ))}
        </nav>
      </details>
      <div className="rd-progress" aria-hidden="true"><span /></div>
    </header>
  );
}
