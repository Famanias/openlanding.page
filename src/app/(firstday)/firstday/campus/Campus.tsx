import { Picture } from "../assets";
import { Arrow } from "../brand/Arrow";
export function Campus() {
  return (
    <div className="fd-campus" data-ambient>
      <div className="fd-campus-image">
        <Picture
          assetKey="campus"
          alt="An original miniature learning campus, with chalk-white studios, a circular forum, and sage-green courtyard gardens."
          priority
        />
      </div>
      <a href="#paths" className="fd-map-pin fd-pin-one">
        <span className="fd-pin-icon">↗</span>Your next chapter
        <Arrow diagonal />
      </a>
      <a href="#experience" className="fd-map-pin fd-pin-two">
        <span className="fd-pin-icon">✳</span>Made for doing
      </a>
      <div className="fd-campus-note">
        <span className="fd-dot" /> A world of possibilities.
        <br />
        <span>Yours to explore.</span>
      </div>
      <div className="fd-campus-coordinate fd-label">
        51°30′N &nbsp; 00°07′W
        <br />
        YOUR STARTING POINT
      </div>
    </div>
  );
}
