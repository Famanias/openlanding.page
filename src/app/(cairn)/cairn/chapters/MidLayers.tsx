"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Picture } from "../assets";
import { productsIn } from "../products";
import { Chapter } from "./Chapter";
import { LayerDiagram } from "./LayerDiagram";
import { SpecList } from "./SpecList";

/** 0 when the diagram enters from the bottom of the viewport, 1 when it reaches the upper third. */
function useScrollThrough<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const start = window.innerHeight;
      const end = window.innerHeight * 0.3;
      setP(Math.min(1, Math.max(0, (start - r.top) / (start - end))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return [ref, p] as const;
}

export function MidLayers() {
  const [product] = productsIn("mid");
  const reduce = useReducedMotion();
  const [diagramRef, through] = useScrollThrough<HTMLDivElement>();
  const spread = reduce ? 1 : through;
  const active = (spread < 0.34 ? 0 : spread < 0.67 ? 1 : 2) as 0 | 1 | 2;

  return (
    <Chapter camp="c2" className="crn-feature">
      <h2 className="crn-h2">Three layers. One job each.</h2>
      <p className="crn-lead">
        Camp 2 sits above House&rsquo;s Chimney at 6,700 metres. The weather turns in minutes, so the system has to
        adjust as fast as it does: add the mid layer on the ledge, take it off for the chimney.
      </p>
      <div ref={diagramRef}>
        <LayerDiagram active={active} spread={spread} />
      </div>
      <div className="crn-feature__product">
        <Picture
          assetKey={product.images.white!}
          alt={`${product.name} in white`}
          className="crn-feature__image"
          sizes="(min-width: 900px) 24vw, 100vw"
        />
        <div className="crn-feature__info">
          <p className="crn-label crn-muted">Mid layer</p>
          <h3 className="crn-h3">{product.name}</h3>
          <p>{product.tagline}</p>
          <SpecList product={product} />
        </div>
      </div>
    </Chapter>
  );
}
