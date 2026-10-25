import { PRODUCTS } from "../content/products";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { ProductCard } from "../shop/ProductCard";

/** The flash-white room: every look as a piece you can buy. */
export function Shop() {
  return (
    <section id="shop" className="cg-section cg-shop" aria-labelledby="cg-shop-title">
      <div className="cg-container">
        <Reveal kind="rise" className="cg-shop__head">
          <p className="cg-eyebrow"><span>Shop</span><span>Made to the roll, not to order</span></p>
          <h2 id="cg-shop-title" className="cg-h2"><SplitText>{"Six pieces.\nThen it's gone."}</SplitText></h2>
          <p className="cg-lead">Each piece is cut until its cloth runs out. The number left is what this run has; alterations are free in the London studio.</p>
        </Reveal>
        <ul className="cg-shop__grid">
          {PRODUCTS.map((product, index) => (
            <Reveal as="li" key={product.sku} kind="scale" index={index % 3}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
