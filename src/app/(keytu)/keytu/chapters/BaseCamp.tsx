import { Picture } from "../assets";
import { PRODUCTS } from "../products";
import { Chapter } from "./Chapter";
import { ProductCard } from "./ProductCard";

export function BaseCamp() {
  return (
    <Chapter camp="base" className="crn-basecamp">
      <h2 className="crn-h2">The FW26 collection.</h2>
      <p className="crn-lead">
        Six pieces, one system. We carried every one of them up the Abruzzi Spur and changed what failed. What
        survived is below, ordered by the altitude where it earns its place.
      </p>
      <Picture
        assetKey="basecamp"
        alt="Tents glowing at K2 Base Camp at night, with the mountain behind"
        className="crn-wide"
        sizes="(min-width: 900px) 48vw, 100vw"
      />
      <div className="crn-grid" role="list" aria-label="The FW26 collection">
        {PRODUCTS.map((p) => (
          <div role="listitem" key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </Chapter>
  );
}
