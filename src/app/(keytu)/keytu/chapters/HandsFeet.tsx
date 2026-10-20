import { Picture } from "../assets";
import { productsIn } from "../products";
import { SpecSheet } from "../showcase/SpecSheet";
import { Chapter } from "./Chapter";

export function HandsFeet() {
  const [mitt, gaiter] = productsIn("hands");
  return (
    <Chapter camp="bottleneck" className="crn-showcase">
      <h2 className="crn-h2">Through the Bottleneck.</h2>
      <p className="crn-lead">
        The steepest, most exposed couloir on the route, under a hanging serac, at 8,200 metres. Hands on the
        rope, spindrift at the ankles. Two small pieces matter more here than anywhere.
      </p>
      <Picture
        assetKey={mitt.images.black!}
        alt="Summit mitts and alpine gaiters in black"
        className="crn-wide"
        sizes="(min-width: 900px) 48vw, 100vw"
      />
      <div className="crn-pair">
        <div className="crn-pair__item">
          <p className="crn-showcase__tagline">{mitt.tagline}</p>
          <SpecSheet product={mitt} index={1} />
        </div>
        <div className="crn-pair__item">
          <p className="crn-showcase__tagline">{gaiter.tagline}</p>
          <SpecSheet product={gaiter} index={2} />
        </div>
      </div>
    </Chapter>
  );
}
