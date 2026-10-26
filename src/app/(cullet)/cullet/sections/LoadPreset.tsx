"use client";

/** Sends a material to the sampler and travels there. Without JS it is a link to the studio. */
export function LoadPreset({ id, name }: { id: string; name: string }) {
  return (
    <a
      href="#sampler"
      className="fc-card__load"
      onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("fc:preset", { detail: id })); }}
    >
      <span>Open in studio</span><span className="fc-sr">: {name}</span>
      <svg className="fc-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
    </a>
  );
}
