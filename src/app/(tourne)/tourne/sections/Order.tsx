import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { OrderForm } from "../forms/OrderForm";

export function Order() {
  return (
    <section id="order" className="tn-order" aria-labelledby="tn-order-title">
      <div className="tn-section-head">
        <Reveal as="p" variant="slide-left" className="tn-eyebrow">
          06 · Order
        </Reveal>
        <Reveal as="h2" variant="mask" className="tn-display tn-h2">
          <span id="tn-order-title">
            <SplitText text="Yours, from the wheel to your door." />
          </span>
        </Reveal>
      </div>
      <OrderForm />
    </section>
  );
}
