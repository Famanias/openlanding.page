import { Picture } from "../assets";
import { Blaze } from "../brand/Signal";

/**
 * The signature moment: through the glass. With motion allowed and scripting on, the stage pins and the
 * scroll engine dollies the exterior into its doorway while the interior takes over (threshold/geometry.ts).
 * Without either, the same markup reads as two captioned photographs: outside, then inside.
 */
export function Threshold() {
  return (
    <section className="ew-threshold" id="door" data-ew-threshold aria-labelledby="ew-door-title">
      <div className="ew-th-stage" data-ew-stage data-beat="0">
        <div className="ew-th-world">
          <Picture
            assetKey="cabin-green"
            sizes="(min-aspect-ratio: 16/9) 100vw, 180vh"
            alt="The cabin up close: dark vertical timber, a steep gable and black stovepipe, and a sliding glass door lit warm from inside. Wet ferns and mossy rock in front, mist in the valley behind."
          />
        </div>

        <div className="ew-th-caption" data-for="0">
          <p className="ew-post">
            <Blaze /> 1,900 m · the door
          </p>
          <h2 id="ew-door-title" className="ew-display ew-th-title">
            The light is already on.
          </h2>
          <p>We lay the stove and leave the lamp lit before you set out. From the last step it is the only warm thing in the valley.</p>
        </div>

        <div className="ew-th-caption" data-for="1">
          <p className="ew-post">
            <Blaze /> On the step
          </p>
          <p className="ew-display ew-th-title">Leave the day outside.</p>
          <p>Boots on the slab, coat on the peg. The door slides. Nothing in here needs charging.</p>
        </div>

        <div className="ew-th-interior">
          <div className="ew-th-interior-in">
            <Picture
              assetKey="interior"
              sizes="(min-aspect-ratio: 16/9) 100vw, 180vh"
              alt="Inside, looking through the open door: pale pine boards on every surface, a linen sofa, a woven rug, a three-legged stool, a black wood stove, and one large window full of misty forest."
            />
          </div>
        </div>

        <div className="ew-th-caption" data-for="2">
          <p className="ew-post">
            <Blaze /> Inside · 23 m²
          </p>
          <p className="ew-display ew-th-title">Now sit down.</p>
          <p>One room of pine, one stove, one window. The valley you just walked through is on the other side of the glass.</p>
        </div>

        <div className="ew-th-boughs" aria-hidden="true">
          <Picture assetKey="boughs" alt="" sizes="(min-aspect-ratio: 16/9) 100vw, 180vh" />
        </div>

        <p className="ew-th-hint ew-post" aria-hidden="true">
          Keep walking
        </p>
      </div>
    </section>
  );
}
