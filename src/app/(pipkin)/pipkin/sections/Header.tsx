"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Marks";
import { useOrder } from "../box/OrderContext";
import { Magnetic } from "../motion/Magnetic";

const LINKS = [
  { id: "trip", label: "The trip" },
  { id: "shelf", label: "Shelf" },
  { id: "box", label: "Build a box" },
  { id: "notes", label: "Notes" },
  { id: "faq", label: "Questions" },
];

/** Sticky header: compresses after 80px and hides on scroll-down (both read from <html> data attributes), sliding nav indicator, full-screen pill menu on small screens. */
export function Header() {
  const { count } = useOrder();
  const [active, setActive] = useState<string>("");
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0, on: false });

  // which section is on screen
  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best = "";
        let bestRatio = 0;
        for (const [id, r] of seen) if (r > bestRatio) { best = id; bestRatio = r; }
        setActive(best);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.1, 0.4, 0.8] },
    );
    for (const l of LINKS) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const place = useCallback(() => {
    const id = hover ?? active;
    const el = id ? navRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`) : null;
    if (!el) return setInd((p) => ({ ...p, on: false }));
    setInd({ x: el.offsetLeft, w: el.offsetWidth, on: true });
  }, [hover, active]);
  useLayoutEffect(place, [place]);
  useEffect(() => {
    window.addEventListener("resize", place, { passive: true });
    return () => window.removeEventListener("resize", place);
  }, [place]);

  // menu: lock scroll, trap focus, Escape closes and returns focus to the toggle
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const nodes = [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a,button") ?? [])].filter(Boolean) as HTMLElement[];
      const i = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); nodes[nodes.length - 1].focus(); }
      else if (!e.shiftKey && i === nodes.length - 1) { e.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className="pk-header" data-menu={open ? "true" : "false"}>
      <div className="pk-header-bar">
        <a href="#top" className="pk-header-logo" aria-label="Pipkin, back to top"><Logo size={36} /></a>
        <nav aria-label="Primary" className="pk-nav">
          <ul ref={navRef} className="pk-nav-list" onPointerLeave={() => setHover(null)}>
            <li className="pk-nav-ind" aria-hidden="true" data-on={ind.on ? "true" : "false"} style={{ "--ix": `${ind.x}px`, "--is": (ind.w / 100).toFixed(3) } as CSSProperties} />
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} data-id={l.id} data-active={active === l.id ? "true" : "false"} className="pk-nav-link" onPointerEnter={() => setHover(l.id)} onFocus={() => setHover(l.id)} onBlur={() => setHover(null)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pk-header-actions">
          <a href="#box" className="pk-cart">
            <span className="pk-cart-label">Box</span>
            <span key={count} className="pk-cart-count" data-bump={count > 0 ? "true" : "false"}>{count}</span>
            <span className="pk-sr">{count === 1 ? "jar" : "jars"} in your box</span>
          </a>
          <span className="pk-header-cta"><Magnetic strength={10}><a href="#box" className="pk-btn pk-btn-primary pk-btn-sm"><span className="pk-btn-label">Order</span><Arrow className="pk-btn-arrow" /></a></Magnetic></span>
          <button ref={toggleRef} type="button" className="pk-menu-toggle" aria-expanded={open} aria-controls="pk-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <span className="pk-menu-bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
      <div id="pk-menu" ref={panelRef} className="pk-menu" data-open={open ? "true" : "false"} aria-hidden={!open} inert={!open}>
        <ul className="pk-menu-list">
          {LINKS.map((l, i) => (
            <li key={l.id} style={{ "--i": i } as CSSProperties}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="pk-menu-link">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#list" onClick={() => setOpen(false)} className="pk-btn pk-btn-primary pk-menu-cta"><span className="pk-btn-label">Join the Friday list</span></a>
      </div>
    </header>
  );
}
