import { productsIn } from "../products";
import { ColourwaySwap } from "../showcase/ColourwaySwap";
import { FabricZoom } from "../showcase/FabricZoom";
import { SpecSheet } from "../showcase/SpecSheet";
import { Chapter } from "./Chapter";

export function Shells() {
  const [shell] = productsIn("shell");
  return (
    <Chapter camp="c3" className="crn-showcase">
      <h2 className="crn-h2">The outer wall.</h2>
      <p className="crn-lead">
        Camp 3 sits on the Black Pyramid, 7,350 metres up, where the wind decides your day. The {shell.name} is
        the piece we tested hardest: three layers, every seam taped, a hood cut around a helmet.
      </p>
      <div className="crn-showcase__hero">
        <ColourwaySwap product={shell} />
        <div className="crn-showcase__side">
          <h3 className="crn-h3">{shell.name}</h3>
          <p className="crn-showcase__tagline">{shell.tagline}</p>
          <SpecSheet product={shell} />
        </div>
      </div>
      <FabricZoom
        assetKey="fabric-shell"
        alt="Macro of the black three-layer shell fabric with water beading on it"
        caption="3-layer face fabric, 28,000 mm hydrostatic head"
      />
    </Chapter>
  );
}
