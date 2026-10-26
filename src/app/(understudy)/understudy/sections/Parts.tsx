import { PartsBoard } from "../parts/PartsBoard";

/**
 * Still in the dark house: the parts, on an endless ring of tall cards that drifts right to left,
 * follows the page scroll and can be dragged. A card turns over to show its brief and its Start key.
 */
export function Parts() {
  return (
    <section className="us-parts" id="parts" data-scene="parts" data-tone="dark" aria-labelledby="us-parts-t">
      <div className="us-parts__stage">
        <PartsBoard />
      </div>
    </section>
  );
}
