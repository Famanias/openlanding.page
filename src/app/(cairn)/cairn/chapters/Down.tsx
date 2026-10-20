import { Picture } from "../assets";
import { productsIn } from "../products";
import { FabricZoom } from "../showcase/FabricZoom";
import { SpecSheet } from "../showcase/SpecSheet";
import { Chapter } from "./Chapter";

export function Down() {
  const [suit] = productsIn("down");
  return (
    <Chapter camp="c4" className="crn-showcase">
      <h2 className="crn-h2">Nights on the Shoulder.</h2>
      <p className="crn-lead">
        Camp 4 is the last tent before the summit push, at 7,900 metres. You leave it at midnight, at −30 °C,
        and the only thing between you and the cold is 850-fill down in box-wall baffles.
      </p>
      <div className="crn-showcase__hero">
        <Picture
          assetKey={suit.images.black!}
          alt={`${suit.name} in black`}
          className="crn-showcase__image"
          sizes="(min-width: 900px) 30vw, 100vw"
        />
        <div className="crn-showcase__side">
          <h3 className="crn-h3">{suit.name}</h3>
          <p className="crn-showcase__tagline">{suit.tagline}</p>
          <SpecSheet product={suit} />
        </div>
      </div>
      <FabricZoom
        assetKey="fabric-down"
        alt="Macro of ripstop nylon over down baffles with frost on the surface"
        caption="Box-wall baffles, 850 FP goose down"
      />
    </Chapter>
  );
}
