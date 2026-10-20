import { Picture } from "../assets";
import { CATEGORY_LABEL, type Product } from "../products";

export function ProductCard({ product }: { product: Product }) {
  const first = product.colourways[0];
  const weight = product.specs.find((s) => s.label === "Weight")?.value;
  return (
    <article className="crn-card">
      <Picture
        assetKey={product.images[first]!}
        alt={`${product.name} in ${first}`}
        className="crn-card__image"
        sizes="(min-width: 900px) 22vw, 50vw"
      />
      <div className="crn-card__body">
        <p className="crn-label crn-card__cat">{CATEGORY_LABEL[product.category]}</p>
        <h3 className="crn-h3">{product.name}</h3>
        <p className="crn-label crn-card__meta">
          {weight} · {product.colourways.length} {product.colourways.length === 1 ? "colour" : "colours"}
        </p>
      </div>
    </article>
  );
}
