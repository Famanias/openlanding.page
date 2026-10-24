import { ASSETS } from "./assets.generated";

const BASE = "/templates/rill";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 70vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`rl-media-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="rl-mono">{assetKey}</span>
      </div>
    );
  }

  const { w, h } = ASSETS[assetKey];
  const set = (format: "webp" | "avif") => `${assetSrc(assetKey, 800, format)} 800w, ${assetSrc(assetKey, 1600, format)} 1600w`;
  return (
    <picture className={className} data-asset={assetKey}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
    </picture>
  );
}

export const CLIPS: Record<string, boolean> = {};

type VideoPlateProps = {
  clipKey: string;
  posterKey?: string;
  label: string;
  className?: string;
};

export function VideoPlate({ clipKey, posterKey, label, className }: VideoPlateProps) {
  if (!CLIPS[clipKey]) {
    return <Picture assetKey={posterKey ?? clipKey} alt={label} className={`rl-video-placeholder ${className ?? ""}`} />;
  }
  return (
    <video className={className} data-clip={clipKey} aria-label={label} muted playsInline loop preload="metadata">
      <source src={`${BASE}/clips/${clipKey}.mp4`} type="video/mp4" />
    </video>
  );
}

