"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SceneIcon } from "../brand/Icons";
import { Words } from "../motion/Words";
import { SCENES, type SceneId } from "./scenes";
import { sceneAt, sceneOffset, stageProgress } from "./progress";

const PINNED = "(min-width: 60rem) and (prefers-reduced-motion: no-preference)";

function SceneBody({ id }: { id: SceneId }) {
  switch (id) {
    case "inbox":
      return (
        <ul className="nm-threads">
          <li>
            <span className="nm-avatar">M</span>
            <span><b>Maya’s mum</b>Can we move Thursday?</span>
          </li>
          <li>
            <span className="nm-avatar">T</span>
            <span><b>Theo’s dad</b>Thanks for the notes</span>
          </li>
          <li>
            <span className="nm-avatar">P</span>
            <span><b>Priya</b>Slides attached</span>
          </li>
        </ul>
      );
    case "schedule":
      return (
        <>
          <div className="nm-week">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <span key={d} data-on={d === "Tue"}>{d}</span>
            ))}
          </div>
          <ul className="nm-slots">
            <li><span className="nm-mono">4:30 PM</span><b>Algebra with Maya</b></li>
            <li data-free="true"><span className="nm-mono">5:30 PM</span><b>Open</b></li>
            <li><span className="nm-mono">6:15 PM</span><b>Reading with Theo</b></li>
          </ul>
        </>
      );
    case "progress":
      return (
        <>
          <div className="nm-ring">
            <svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
              <circle className="nm-ring-track" cx="40" cy="40" r="32" />
              <circle className="nm-ring-fill" cx="40" cy="40" r="32" pathLength={1} />
            </svg>
            <b className="nm-mono">72%</b>
          </div>
          <ul className="nm-skills">
            {[["Fractions", 0.9], ["Equations", 0.72], ["Graphs", 0.45]].map(([label, v]) => (
              <li key={label as string}>
                <span>{label}</span>
                <i style={{ "--v": v } as CSSProperties} />
              </li>
            ))}
          </ul>
        </>
      );
    case "payments":
      return (
        <ul className="nm-ledger">
          <li><span><b>Invoice 104</b>Maya’s mum</span><em>Paid</em></li>
          <li><span><b>Invoice 103</b>Theo’s dad</span><em>Paid</em></li>
          <li><span><b>Invoice 102</b>Sam’s mum</span><em>Paid</em></li>
        </ul>
      );
  }
}

export function LaunchPhone() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lock = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const pinned = window.matchMedia(PINNED);
    let frame = 0;

    const read = () => {
      frame = 0;
      if (!pinned.matches) return;
      const rect = section.getBoundingClientRect();
      const p = stageProgress({ top: rect.top, height: rect.height, viewport: window.innerHeight });
      section.style.setProperty("--nm-p", p.toFixed(4));
      if (lock.current !== null) {
        if (Math.abs(window.scrollY - lock.current) > 3) return;
        lock.current = null;
      }
      setActive(sceneAt(p, SCENES.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const select = useCallback((index: number) => {
    setActive(index);
    const section = sectionRef.current;
    if (!section || !window.matchMedia(PINNED).matches) return;
    const rect = section.getBoundingClientRect();
    const target = window.scrollY + rect.top + sceneOffset(index, SCENES.length, { height: rect.height, viewport: window.innerHeight });
    lock.current = target;
    window.setTimeout(() => {
      if (lock.current === target) lock.current = null;
    }, 1600);
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const scene = SCENES[active];

  return (
    <section ref={sectionRef} className="nm-launch" id="launch" data-nm-section style={{ "--count": SCENES.length } as CSSProperties}>
      <div className="nm-stage" data-scene={scene.id}>
        <div className="container nm-stage-grid">
          <div className="nm-stage-side">
            <h2 data-nm-reveal="mask"><Words text="One surface. Four calm moments." /></h2>
            <p className="lead" data-nm-reveal="rise">Scroll to unlock the NOMI workspace one capability at a time.</p>
            <div className="nm-rail" style={{ "--active": active } as CSSProperties}>
              <span className="nm-rail-pill" aria-hidden="true" />
              <ol>
                {SCENES.map((s, i) => (
                  <li key={s.id} data-on={i === active}>
                    <button type="button" className="nm-node" aria-pressed={i === active} onClick={() => select(i)}>
                      <SceneIcon id={s.id} />
                      <span>{s.name}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="nm-band">
            <div className="nm-light" aria-hidden="true"><i /><i /><i /></div>
            <div className="nm-phone" style={{ "--active": active } as CSSProperties}>
              <div className="nm-screen">
                <div className="nm-status" aria-hidden="true">
                  <span className="nm-mono">9:41</span>
                  <i />
                  <svg viewBox="0 0 24 12" focusable="false"><rect x="1" y="2" width="19" height="8" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="3.5" y="4.5" width="11" height="3" rx="1" fill="currentColor" /></svg>
                </div>
                <div className="nm-appbar"><b>nomi</b><span className="nm-avatar" aria-hidden="true">E</span></div>
                <p className="nm-greet">Good morning, Eli</p>
                <div className="nm-scenes">
                  {SCENES.map((s, i) => (
                    <div key={s.id} className="nm-scene" data-active={i === active} aria-hidden={i !== active} style={{ "--k": i - active } as CSSProperties}>
                      <p className="nm-scene-title">{s.name}</p>
                      <p className="nm-scene-cue">{s.cue}</p>
                      <SceneBody id={s.id} />
                    </div>
                  ))}
                </div>
                <div className="nm-app-card" key={scene.id}>
                  <strong>{scene.card}</strong>
                  <div className="nm-pips" aria-hidden="true">
                    {SCENES.map((s, i) => (
                      <i key={s.id} data-on={i <= active} />
                    ))}
                  </div>
                </div>
                <div className="nm-home" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
