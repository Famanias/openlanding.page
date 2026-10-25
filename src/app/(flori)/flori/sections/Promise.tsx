import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Promise() {
  return <section className="fl-promise fl-scallop" aria-label="The Flori promise"><Reveal className="fl-promise-inner"><span>Seasonal by nature</span><Flower /><span>Thoughtfully gathered</span><Flower /><span>A happier little home</span><Flower /><span>Always a lovely surprise</span></Reveal></section>;
}
