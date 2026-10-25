"use client";

import { useEffect, useRef, useState } from "react";
import { PRICES, PRODUCTS } from "../content/products";
import { bagCount, bagSubtotal, formatGBP } from "./bag";
import { dispatchBag, useBag, useLastAdded } from "./store";

/** The header bag: a count that pops on add, and a small popover with lines and a subtotal. */
export function BagButton() {
  const bag = useBag();
  const last = useLastAdded();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  const count = bagCount(bag);
  const lastProduct = last ? PRODUCTS.find((product) => product.sku === last.sku) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onDown = (event: PointerEvent) => { if (!wrap.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  return (
    <div ref={wrap} className="cg-bag">
      <button type="button" className="cg-bag__button" aria-expanded={open} aria-controls="cg-bag-panel" onClick={() => setOpen((value) => !value)}>
        Bag <span className="cg-bag__count" key={last?.at ?? 0} data-pop={last ? "true" : undefined}>{count}</span>
      </button>
      <p className="cg-sr" aria-live="polite">{lastProduct && last ? `Added ${lastProduct.name}, size ${last.size}. ${count} in the bag.` : ""}</p>
      <div id="cg-bag-panel" className="cg-bag__panel" data-open={open ? "true" : "false"} hidden={!open}>
        <p className="cg-mono cg-bag__title">Your bag</p>
        {bag.lines.length === 0 ? (
          <p className="cg-bag__empty">Nothing marked yet.</p>
        ) : (
          <ul className="cg-bag__lines">
            {bag.lines.map((line) => {
              const product = PRODUCTS.find((item) => item.sku === line.sku);
              return (
                <li key={`${line.sku}-${line.size}`}>
                  <span>{product?.name} <span className="cg-mono">· {line.size} × {line.qty}</span></span>
                  <button type="button" className="cg-bag__remove" onClick={() => dispatchBag({ type: "remove", sku: line.sku, size: line.size })}>
                    Remove<span className="cg-sr"> one {product?.name}, size {line.size}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p className="cg-bag__total"><span className="cg-mono">Subtotal</span> <span>{formatGBP(bagSubtotal(bag, PRICES))}</span></p>
        <p className="cg-bag__note">Checkout is switched off in this template.</p>
      </div>
    </div>
  );
}
