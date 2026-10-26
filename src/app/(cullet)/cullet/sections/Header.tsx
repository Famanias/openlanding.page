"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { NAV } from "../content/copy";
import { goto, lockScroll } from "../motion/SmoothScroll";

/**
 * The header that arrives once the slab has cleaved: a glass bar with the lockup, the sections with a
 * pill that slides to the current one, and "Open studio". On phones a menu sheet opens out of the
 * toggle with a clip-path, staggers its links in, traps focus and closes on Escape.
 */
export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<string | null>).detail);
    window.addEventListener("fc:section", on);
    return () => window.removeEventListener("fc:section", on);
  }, []);

  // measure the pill against the active link; transforms only
  useEffect(() => {
    const measure = () => {
      const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      setPill(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const close = useCallback((returnFocus = true) => {
    setMenu(false);
    lockScroll(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menu) return;
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, close]);

  const travel = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (menu) close(false);
    goto(id);
  };

  return (
    <header className="fc-header" data-menu={menu}>
      <div className="fc-header__bar">
        <a href="#cullet" className="fc-header__home" onClick={travel("top")} aria-label="Cullet, back to the top">
          <Logo />
        </a>
        <nav className="fc-header__nav" aria-label="Sections">
          <span className="fc-header__pill" aria-hidden="true" data-on={!!pill}
            style={pill ? { transform: `translateX(${pill.x}px) scaleX(${(pill.w / 100).toFixed(4)})` } : undefined} />
          <ul ref={listRef} className="fc-header__links">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} data-id={n.id} className="fc-header__link" aria-current={active === n.id ? "location" : undefined} onClick={travel(n.id)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#open" className="fc-btn fc-btn--ink fc-btn--sm fc-header__cta" onClick={travel("open")}>
          <span className="fc-btn__label" data-text="Open studio"><span>Open studio</span></span>
        </a>
        <button ref={toggleRef} type="button" className="fc-header__toggle" aria-expanded={menu} aria-controls="fc-menu"
          onClick={() => { const next = !menu; setMenu(next); lockScroll(next); }}>
          <span className="fc-sr">{menu ? "Close menu" : "Open menu"}</span>
          <span className="fc-header__bars" aria-hidden="true"><span /><span /></span>
        </button>
        <span className="fc-header__progress" aria-hidden="true" />
      </div>
      <div ref={sheetRef} id="fc-menu" className="fc-menu" data-open={menu} hidden={!menu}>
        <ul className="fc-menu__list">
          {[...NAV, { id: "open", label: "Open studio" }].map((n, i) => (
            <li key={n.id} style={{ "--i": i } as React.CSSProperties}>
              <a href={`#${n.id}`} className="fc-menu__link" onClick={travel(n.id)} aria-current={active === n.id ? "location" : undefined}>
                <span className="fc-menu__n">{String(i + 1).padStart(2, "0")}</span>{n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
