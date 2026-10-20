"use client";

import { useRef, useState, type PointerEvent } from "react";
import { ASSETS } from "../assets.generated";
import { Picture, assetSrc } from "../assets";

const ZOOM = 2.5;
const LOUPE = 180;

/**
 * Fabric close-up. With a mouse, a 2.5× loupe follows the pointer; on touch, a tap toggles a full 2.5× zoom
 * centred on the tap. Falls back to the plain placeholder until the image exists.
 */
export function FabricZoom({ assetKey, alt, caption }: { assetKey: string; alt: string; caption: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [loupe, setLoupe] = useState<{ x: number; y: number } | null>(null);
  const [tapZoom, setTapZoom] = useState<{ x: number; y: number } | null>(null);
  const src = assetSrc(assetKey, 1600);
  const dims = ASSETS[assetKey];

  const local = (e: PointerEvent) => {
    const r = boxRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
  };

  const onMove = (e: PointerEvent) => {
    if (!src || e.pointerType !== "mouse") return;
    const { x, y } = local(e);
    setLoupe({ x, y });
  };

  const onTap = (e: PointerEvent) => {
    if (!src || e.pointerType === "mouse") return;
    const { x, y, w, h } = local(e);
    setTapZoom((z) => (z ? null : { x: (x / w) * 100, y: (y / h) * 100 }));
  };

  const box = boxRef.current?.getBoundingClientRect();
  const bgW = box ? box.width * ZOOM : 0;
  const bgH = box && dims ? (box.width * (dims.h / dims.w)) * ZOOM : 0;

  return (
    <figure className="crn-zoom">
      <div
        ref={boxRef}
        className="crn-zoom__box"
        data-zoomed={tapZoom ? "" : undefined}
        style={tapZoom ? ({ "--zx": `${tapZoom.x}%`, "--zy": `${tapZoom.y}%` } as React.CSSProperties) : undefined}
        onPointerMove={onMove}
        onPointerLeave={() => setLoupe(null)}
        onPointerUp={onTap}
      >
        <Picture assetKey={assetKey} alt={alt} className="crn-zoom__image" sizes="(min-width: 900px) 30vw, 100vw" />
        {src && loupe && box ? (
          <div
            className="crn-zoom__loupe"
            aria-hidden="true"
            style={{
              left: loupe.x - LOUPE / 2,
              top: loupe.y - LOUPE / 2,
              backgroundImage: `url(${src})`,
              backgroundSize: `${bgW}px ${bgH}px`,
              backgroundPosition: `${-(loupe.x * ZOOM - LOUPE / 2)}px ${-(loupe.y * ZOOM - LOUPE / 2)}px`,
            }}
          />
        ) : null}
      </div>
      <figcaption className="crn-label crn-muted">
        {caption}
        {src ? <span className="crn-zoom__hint"> · Hover or tap to zoom</span> : null}
      </figcaption>
    </figure>
  );
}
