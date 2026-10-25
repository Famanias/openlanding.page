"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { BagButton } from "../shop/BagButton";
import { useLastAdded } from "../shop/store";

const LINKS = [
  { id: "sheet", label: "Sheet" },
  { id: "looks", label: "Looks" },
  { id: "cloth", label: "Cloth" },
  { id: "shop", label: "Shop" },
  { id: "request", label: "Request" },
] as const;

type HeaderState = "top" | "compact" | "hidden";

export function Header() {
  const [state, setState] = useState<HeaderState>("top");
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState<string>("sheet");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      setState((current) => (y < 24 ? "top" : delta > 6 && y > 400 ? "hidden" : delta < -6 ? "compact" : current === "top" ? "compact" : current));
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--cg-progress", Math.min(1, y / max).toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  // Adding to the bag brings the header back, so the count's pop is actually seen.
  const lastAdded = useLastAdded();
  useEffect(() => {
    if (lastAdded) setState((current) => (current === "hidden" ? "compact" : current));
  }, [lastAdded]);

  // Which section sits under the header: drives the active link and the light tone over the shop.
  useEffect(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter((node): node is HTMLElement => Boolean(node));
    const band = new IntersectionObserver((entries) => {
      const hit = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit?.target.id) setActive(hit.target.id);
    }, { rootMargin: "-40% 0px -55% 0px" });
    nodes.forEach((node) => band.observe(node));
    const shop = document.getElementById("shop");
    const under = new IntersectionObserver(([entry]) => setTone(entry?.isIntersecting ? "light" : "dark"), { rootMargin: "0px 0px -94% 0px" });
    if (shop) under.observe(shop);
    return () => { band.disconnect(); under.disconnect(); };
  }, []);

  const place = useCallback((id: string | null) => {
    const link = id ? navRef.current?.querySelector<HTMLElement>(`[data-link="${id}"]`) : null;
    setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
  }, []);

  useEffect(() => {
    place(hovered ?? active);
    const onResize = () => place(hovered ?? active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, hovered, place]);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); return; }
      if (event.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const index = items.indexOf(document.activeElement as HTMLElement);
      event.preventDefault();
      items[event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index + 1) % items.length]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <header className="cg-header" data-state={menuOpen ? "compact" : state} data-tone={menuOpen ? "dark" : tone} data-menu={menuOpen ? "open" : "closed"}>
      <div className="cg-container cg-header__inner">
        <a className="cg-header__brand" href="#top" aria-label="Chinagraph, back to top"><Logo /></a>
        <p className="cg-header__counter cg-mono" aria-hidden="true"><span className="cg-dot" /> <span data-frame-counter>Frame 01 / 12</span></p>
        <nav ref={navRef} className="cg-header__nav" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
          {LINKS.map((link, index) => (
            <a key={link.id} data-link={link.id} className="cg-header__link" href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined} onPointerEnter={() => setHovered(link.id)} onFocus={() => setHovered(link.id)} onBlur={() => setHovered(null)} style={{ "--i": index } as CSSProperties}>
              {link.label}
            </a>
          ))}
          <span className="cg-header__indicator" aria-hidden="true" data-visible={indicator ? "true" : "false"} style={indicator ? ({ "--x": `${indicator.x}px`, "--w": indicator.w } as CSSProperties) : undefined} />
        </nav>
        <BagButton />
        <button ref={toggleRef} type="button" className="cg-header__toggle" aria-expanded={menuOpen} aria-controls="cg-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span className="cg-sr">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="cg-header__bars" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <span className="cg-header__progress" aria-hidden="true" />
      <div ref={panelRef} id="cg-menu" className="cg-menu" hidden={!menuOpen}>
        <nav aria-label="Menu">
          {LINKS.map((link, index) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} style={{ "--i": index } as CSSProperties}>
              <span className="cg-mono">{String(index + 1).padStart(2, "0")}</span>{link.label}
            </a>
          ))}
        </nav>
        <p className="cg-mono cg-menu__foot">Collection 07 · Concrete Flash · AW26</p>
      </div>
    </header>
  );
}
