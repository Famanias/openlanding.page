"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Picture } from "../assets";
import type { Colourway, Product } from "../products";

const LABEL: Record<Colourway, string> = { black: "Black", navy: "Navy", white: "White" };

/**
 * Native radio swatches (arrow keys work for free) that crossfade the product image in 200 ms,
 * with a 2 px blur masking the overlap. Instant under reduced motion.
 */
export function ColourwaySwap({ product }: { product: Product }) {
  const [colour, setColour] = useState<Colourway>(product.colourways[0]);
  const reduce = useReducedMotion();
  const name = useId();
  const key = product.images[colour]!;

  return (
    <div className="crn-swap">
      <div className="crn-swap__image" data-testid="colourway-image">
        <AnimatePresence initial={false}>
          <motion.div
            key={key}
            className="crn-swap__layer"
            initial={reduce ? false : { opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <Picture assetKey={key} alt={`${product.name} in ${LABEL[colour].toLowerCase()}`} sizes="(min-width: 900px) 30vw, 100vw" />
          </motion.div>
        </AnimatePresence>
      </div>
      <fieldset className="crn-swatches" role="radiogroup" aria-label={`${product.name} colourway`}>
        <legend className="crn-label">Colourway · {LABEL[colour]}</legend>
        <div className="crn-swatches__row">
          {product.colourways.map((c) => (
            <label key={c} className="crn-swatch" data-colour={c}>
              <input
                type="radio"
                name={name}
                value={c}
                checked={c === colour}
                onChange={() => setColour(c)}
                aria-label={LABEL[c]}
              />
              <span className="crn-swatch__chip" aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
