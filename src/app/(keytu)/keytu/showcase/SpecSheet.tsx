import { KeytuMark } from "../brand/Logo";
import { CATEGORY_LABEL, type Product } from "../products";

const CODE: Record<Product["category"], string> = { base: "BL", mid: "ML", shell: "SH", down: "DN", hands: "HF" };

/** A sewn-in gear label: stitched border, model code, specs in mono. */
export function SpecSheet({ product, index = 1 }: { product: Product; index?: number }) {
  return (
    <div className="crn-spec" role="group" aria-label={`${product.name} specifications`}>
      <div className="crn-spec__head">
        <KeytuMark size={22} />
        <div>
          <p className="crn-spec__brand">KEYTU</p>
          <p className="crn-label crn-spec__code">
            FW26-{CODE[product.category]}-{String(index).padStart(2, "0")} · {CATEGORY_LABEL[product.category]}
          </p>
        </div>
      </div>
      <p className="crn-spec__name">{product.name}</p>
      <dl className="crn-spec__rows">
        {product.specs.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="crn-label crn-spec__foot">Tested on K2 · Abruzzi Spur · 2026</p>
    </div>
  );
}
