"use client";

import { useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { Picture } from "../assets";
import { PRODUCTS } from "../products";

export type LookbookFrame = {
  key: string;
  caption: string;
  hotspots: { x: number; y: number; productId: string }[];
};

/**
 * Horizontal expedition lookbook: native overflow scrolling with scroll-snap, mouse drag-to-scroll,
 * prev/next buttons, and hotspot buttons that open a small product card.
 */
export function Lookbook({ frames }: { frames: LookbookFrame[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [open, setOpen] = useState<string | null>(null); // `${frame}:${index}`

  const page = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || (e.target as HTMLElement).closest("button")) return;
    const track = trackRef.current!;
    drag.current = { x: e.clientX, left: track.scrollLeft };
    track.dataset.dragging = ""; // turns scroll-snap off so the strip follows the pointer
    track.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    trackRef.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = () => {
    const track = trackRef.current;
    if (!drag.current || !track) return;
    drag.current = null;
    // Settle on the nearest frame, then hand control back to scroll-snap.
    const frame = track.firstElementChild as HTMLElement | null;
    const step = frame ? frame.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0) : track.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: Math.round(track.scrollLeft / step) * step, behavior: reduce ? "auto" : "smooth" });
    window.setTimeout(() => delete track.dataset.dragging, reduce ? 0 : 350);
  };

  return (
    <div className="crn-lookbook" data-testid="lookbook">
      <div className="crn-lookbook__bar">
        <p className="crn-label crn-muted">Expedition lookbook · {frames.length} frames</p>
        <div className="crn-lookbook__nav">
          <button type="button" className="crn-iconbtn" onClick={() => page(-1)} aria-label="Previous frames">
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button type="button" className="crn-iconbtn" onClick={() => page(1)} aria-label="Next frames">
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="crn-lookbook__track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {frames.map((frame) => (
          <figure key={frame.key} className="crn-lookbook__frame">
            <div className="crn-lookbook__media">
              <Picture assetKey={frame.key} alt={frame.caption} className="crn-lookbook__image" sizes="(min-width: 900px) 40vw, 85vw" />
              {frame.hotspots.map((h, i) => {
                const product = PRODUCTS.find((p) => p.id === h.productId)!;
                const id = `${frame.key}:${i}`;
                const isOpen = open === id;
                return (
                  <div key={id} className="crn-hotspot" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                    <button
                      type="button"
                      className="crn-hotspot__dot"
                      aria-label={`Show ${product.name}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : id)}
                    />
                    {isOpen ? (
                      <div className="crn-hotspot__card" role="dialog" aria-label={product.name}>
                        <h4 className="crn-h3">{product.name}</h4>
                        <p className="crn-label crn-muted">
                          {product.specs.find((s) => s.label === "Weight")?.value} · {product.colourways.join(" / ")}
                        </p>
                        <button type="button" className="crn-hotspot__close" onClick={() => setOpen(null)} aria-label="Close">
                          <X size={14} aria-hidden />
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <figcaption className="crn-label crn-muted">{frame.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
