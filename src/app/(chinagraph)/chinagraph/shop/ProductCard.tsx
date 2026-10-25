"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Picture } from "../assets";
import { LOOKS } from "../content/looks";
import type { Product } from "../content/products";
import { formatGBP } from "./bag";
import { dispatchBag } from "./store";

type Phase = "idle" | "adding" | "added";

/**
 * A flat lay that wipes to the on-model frame (hover on fine pointers, or the "On model" toggle anywhere),
 * native radio size chips, and an add button that walks idle → adding → in the bag.
 */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const look = LOOKS.find((item) => item.n === product.look)!;
  const [size, setSize] = useState("");
  const [onModel, setOnModel] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const id = product.sku.toLowerCase();

  useEffect(() => {
    if (phase === "idle") return;
    const timer = window.setTimeout(() => {
      if (phase === "adding") {
        dispatchBag({ type: "add", sku: product.sku, size });
        setPhase("added");
      } else {
        setPhase("idle");
      }
    }, phase === "adding" ? 450 : 2200);
    return () => window.clearTimeout(timer);
  }, [phase, product.sku, size]);

  const label = phase === "adding" ? "Adding" : phase === "added" ? "In the bag ✓" : size ? `Add to bag · ${formatGBP(product.price)}` : "Pick a size";

  return (
    <article id={`product-${id}`} className="cg-product" data-on-model={onModel ? "true" : "false"} style={{ "--i": index } as CSSProperties} aria-labelledby={`${id}-name`}>
      <div className="cg-product__media">
        <span className="cg-product__flat"><Picture assetKey={product.flat} alt={product.flatAlt} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" /></span>
        <span className="cg-product__model"><Picture assetKey={look.image} alt={`On model: ${product.name}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" /></span>
        <button type="button" className="cg-product__toggle" aria-pressed={onModel} onClick={() => setOnModel((value) => !value)}>
          <span className="cg-sr">Show </span>On model
        </button>
        <span className="cg-mono cg-product__look">Look {String(look.n).padStart(2, "0")}</span>
      </div>
      <div className="cg-product__body">
        <div className="cg-product__row">
          <h3 id={`${id}-name`} className="cg-product__name">{product.name}</h3>
          <p className="cg-product__price">{formatGBP(product.price)}</p>
        </div>
        <p className="cg-mono cg-product__origin">{look.origin} · {product.left} left</p>
        <fieldset className="cg-sizes">
          <legend className="cg-sr">Size for {product.name}</legend>
          {product.sizes.map((option) => (
            <label key={option.label} className="cg-size" data-sold-out={option.soldOut ? "true" : undefined}>
              <input type="radio" name={`size-${id}`} value={option.label} disabled={option.soldOut} checked={size === option.label} onChange={() => setSize(option.label)} />
              <span>{option.label}{option.soldOut ? <span className="cg-sr"> (sold out)</span> : null}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="cg-button cg-button--ink cg-product__add" data-phase={phase} disabled={!size || phase !== "idle"} onClick={() => setPhase("adding")}>
          <span className="cg-button__fill" aria-hidden="true" />
          <span className="cg-product__add-label">{label}</span>
        </button>
      </div>
    </article>
  );
}
