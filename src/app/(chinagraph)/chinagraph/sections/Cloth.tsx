"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Picture } from "../assets";
import { CLOTH } from "../content/cloth";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { canHoverFinely } from "../motion/useReducedMotion";

const TOTAL = CLOTH.reduce((sum, cloth) => sum + cloth.metres, 0);

/** Fabric macros in a snap strip: native scroll on touch, drag and arrow buttons on fine pointers. */
export function Cloth() {
  const track = useRef<HTMLUListElement | null>(null);
  const [edge, setEdge] = useState<"start" | "middle" | "end">("start");

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const max = node.scrollWidth - node.clientWidth - 2;
      setEdge(node.scrollLeft <= 2 ? "start" : node.scrollLeft >= max ? "end" : "middle");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    node.addEventListener("scroll", onScroll, { passive: true });
    read();

    if (!canHoverFinely()) return () => node.removeEventListener("scroll", onScroll);
    // Fine pointers can drag the strip; snapping resumes on release.
    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    const down = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button")) return;
      dragging = true;
      startX = event.clientX;
      startScroll = node.scrollLeft;
      node.dataset.dragging = "true";
      node.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => { if (dragging) node.scrollLeft = startScroll - (event.clientX - startX); };
    const up = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete node.dataset.dragging;
      node.releasePointerCapture(event.pointerId);
    };
    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
    return () => {
      node.removeEventListener("scroll", onScroll);
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const node = track.current;
    const card = node?.querySelector<HTMLElement>(".cg-cloth__card");
    if (!node || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="cloth" className="cg-section cg-cloth" aria-labelledby="cg-cloth-title">
      <div className="cg-container cg-cloth__head">
        <Reveal kind="rise" className="cg-cloth__intro">
          <p className="cg-eyebrow"><span>Cloth</span><span>All deadstock</span></p>
          <h2 id="cg-cloth-title" className="cg-h2"><SplitText>{"Cut from what\nwas left."}</SplitText></h2>
          <p className="cg-lead">Mill ends, army surplus and tannery seconds, bought by the roll before they were burnt. When a cloth runs out, so does the piece.</p>
        </Reveal>
        <Reveal kind="rise" className="cg-cloth__count" index={1}>
          <CountUp className="cg-cloth__metres" value={TOTAL} from={0} suffix=" m" duration={1400} />
          <p className="cg-mono">of deadstock in Collection 07</p>
        </Reveal>
      </div>
      <ul ref={track} className="cg-cloth__track" aria-label="Cloth in this collection">
        {CLOTH.map((cloth, index) => (
          <Reveal as="li" key={cloth.id} kind="focus" index={index} className="cg-cloth__card">
            <div className="cg-cloth__inner" style={{ "--i": index } as CSSProperties}>
              <span className="cg-cloth__img"><Picture assetKey={cloth.image} alt={cloth.alt} sizes="(min-width: 900px) 30vw, 78vw" /></span>
              <div className="cg-cloth__caption">
                <h3 className="cg-cloth__name">{cloth.name}</h3>
                <p className="cg-mono">{cloth.origin} · {cloth.year} · {cloth.metres} m</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="cg-container cg-cloth__controls">
        <button type="button" className="cg-arrow" onClick={() => step(-1)} disabled={edge === "start"}><span aria-hidden="true">←</span><span className="cg-sr">Previous cloth</span></button>
        <button type="button" className="cg-arrow" onClick={() => step(1)} disabled={edge === "end"}><span aria-hidden="true">→</span><span className="cg-sr">Next cloth</span></button>
      </div>
    </section>
  );
}
