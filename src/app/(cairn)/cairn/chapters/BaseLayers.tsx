import { Picture } from "../assets";
import { productsIn } from "../products";
import { Chapter } from "./Chapter";
import { SpecList } from "./SpecList";

export function BaseLayers() {
  const [product] = productsIn("base");
  return (
    <Chapter camp="c1" className="crn-feature">
      <h2 className="crn-h2">Start with what touches skin.</h2>
      <p className="crn-lead">
        At 6,050 metres you sweat on the fixed lines and freeze at the anchors. Merino handles both, and it still
        smells like nothing after a week on the mountain.
      </p>
      <div className="crn-feature__product">
        <Picture
          assetKey={product.images.navy!}
          alt={`${product.name} in navy`}
          className="crn-feature__image"
          sizes="(min-width: 900px) 24vw, 100vw"
        />
        <div className="crn-feature__info">
          <p className="crn-label crn-muted">Base layer</p>
          <h3 className="crn-h3">{product.name}</h3>
          <p>{product.tagline}</p>
          <SpecList product={product} />
        </div>
      </div>
    </Chapter>
  );
}
