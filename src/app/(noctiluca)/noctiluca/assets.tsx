import { ASSETS } from "./assets.generated";

const BASE = "/templates/noctiluca";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

/**
 * Clips encoded into public/templates/noctiluca/clips/ (see docs/image-video-prompts/noctiluca.md).
 * Flip a key to true once its `<key>.mp4` and `<key>-m.mp4` exist.
 */
export const CLIPS: Record<string, boolean> = {
  "noctiluca-shore-loop": true,
  "exterior-dusk-loop": true,
};

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 24vw, 80vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`nl-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="nl-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}

/** A silent loop with its still as poster; the still alone until the clip is encoded. */
export function Clip({ clipKey, posterKey, alt, className }: { clipKey: string; posterKey: string; alt: string; className?: string }) {
  const poster = assetSrc(posterKey, 800);
  if (!CLIPS[clipKey]) return <Picture assetKey={posterKey} alt={alt} className={className} />;
  return (
    <video
      className={`nl-clip ${className ?? ""}`}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster ?? undefined}
      aria-label={alt}
    >
      <source src={`${BASE}/clips/${clipKey}-m.mp4`} type="video/mp4" media="(max-width: 899px)" />
      <source src={`${BASE}/clips/${clipKey}.mp4`} type="video/mp4" />
    </video>
  );
}
