import { ASSETS } from "./assets.generated";
import { CLIPS } from "./videos.generated";

const BASE = "/templates/hiyas";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({
  assetKey,
  alt,
  className,
  priority = false,
}: {
  assetKey: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return (
      <div className={`hy-media-slot ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span>{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  return (
    <picture className={className} data-asset={assetKey}>
      <source
        type="image/avif"
        srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`}
      />
      <img
        src={src}
        srcSet={`${assetSrc(assetKey, 800)} 800w, ${assetSrc(assetKey, 1600)} 1600w`}
        sizes="100vw"
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}

export { CLIPS };

export function VideoPlate({
  clipKey,
  posterKey,
  label,
  className,
  priority = false,
}: {
  clipKey: string;
  posterKey: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`hy-video-plate ${className ?? ""}`} data-clip={clipKey}>
      <Picture assetKey={posterKey} alt={label} priority={priority} className="hy-video-poster" />
      {CLIPS[clipKey] && (
        <video
          autoPlay
          muted
          playsInline
          loop
          preload={priority ? "auto" : "metadata"}
          aria-label={label}
          className="hy-video-element"
        >
          <source src={`${BASE}/clips/${clipKey}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
