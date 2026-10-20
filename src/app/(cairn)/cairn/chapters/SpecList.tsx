import type { Product } from "../products";

/** Compact spec rows for chapter features (the full gear-label sheet is SpecSheet). */
export function SpecList({ product }: { product: Product }) {
  return (
    <dl className="crn-speclist">
      {product.specs.map((s) => (
        <div key={s.label}>
          <dt className="crn-label">{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
