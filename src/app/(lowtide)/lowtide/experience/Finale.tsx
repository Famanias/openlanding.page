"use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import type { World } from "../engine/types";
import { PreorderForm } from "../forms/PreorderForm";
import type { NightPlan } from "../night/your-night";
import { NightCalculator } from "../tidetable/NightCalculator";

/** Dawn: draw your own night over the water, keep it as an image, then reserve the ring. */
export function Finale({ world, active }: { world: World; active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const times = useRef({ bed: "23:30", wake: "07:00" });
  const drag = useRef<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const tween = gsap.fromTo(el.querySelectorAll(".lt-finale__panel"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.12 });
    return () => {
      tween.kill();
    };
  }, []);

  const onPlan = useCallback(
    (plan: NightPlan | null, t: { bed: string; wake: string }) => {
      times.current = t;
      world.setFinale(plan);
    },
    [world],
  );

  useEffect(() => () => world.setFinale(null), [world]);

  async function keep() {
    setSaving(true);
    try {
      const blob = await world.snapshotFinale();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `lowtide-night-${times.current.bed.replace(":", "")}-${times.current.wake.replace(":", "")}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } finally {
      setSaving(false);
    }
  }

  function washAway() {
    const w = washRef.current;
    if (!w) return;
    gsap.fromTo(w, { yPercent: 105, opacity: 1 }, { yPercent: -105, duration: 1.6, ease: "power2.inOut" });
  }

  return (
    <div ref={rootRef} className="lt-finale" data-lenis-prevent data-active={active} inert={!active}>
      <div
        className="lt-finale__strip"
        tabIndex={0}
        role="group"
        aria-label="Your night, drawn as a shoreline. Drag or use the arrow keys to walk it."
        onPointerDown={(e) => {
          drag.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current === null) return;
          world.panFinale(e.clientX - drag.current);
          drag.current = e.clientX;
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            e.stopPropagation();
            world.panFinale(e.key === "ArrowLeft" ? 60 : -60);
          }
        }}
      >
        <span className="lt-finale__hint">Drag to walk your night</span>
      </div>
      <div className="lt-finale__panels">
        <section className="lt-finale__panel" aria-labelledby="lt-finale-night">
          <p id="lt-finale-night" className="lt-finale__title">Your night</p>
          <NightCalculator onPlan={onPlan} />
          <button type="button" className="lt-btn lt-btn--ghost" onClick={keep} disabled={saving}>
            <span>{saving ? "Drawing…" : "Keep your night"}</span>
          </button>
        </section>
        <section className="lt-finale__panel lt-finale__panel--order" aria-label="Pre-order">
          <PreorderForm onSuccess={washAway} />
          <div ref={washRef} className="lt-finale__wash" aria-hidden="true" />
        </section>
      </div>
    </div>
  );
}
