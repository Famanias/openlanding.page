import type { CSSProperties } from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/chinagraph";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

/** Where the "flash" sits on a placeholder, so 28 empty slots don't look identical. */
function lightFor(key: string): CSSProperties {
  let h = 0;
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return { "--ph-x": `${30 + (h % 40)}%`, "--ph-y": `${28 + ((h >> 6) % 30)}%`, "--ph-r": `${46 + ((h >> 11) % 22)}%` } as CSSProperties;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/**
 * A photograph that fills its positioned parent (object-fit: cover). Until the generated still is
 * processed it renders a flash-lit film-frame placeholder labelled with the file it is waiting for.
 */
export function Picture({ assetKey, alt, className, sizes = "100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    // alt="" marks a decorative duplicate (e.g. the enlarger): hide the placeholder from assistive tech too.
    const a11y = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
    return (
      <span className={`cg-ph ${className ?? ""}`} {...a11y} data-asset={assetKey} style={lightFor(assetKey)}>
        <span className="cg-ph__label" aria-hidden="true">
          <span>{assetKey}</span>
          <span>awaiting print</span>
        </span>
      </span>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={`cg-pic ${className ?? ""}`}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
