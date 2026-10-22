import { ASSETS } from "./assets.generated";
import { VIDEO_ASSETS } from "./videos.generated";
import { VideoPlayer } from "./VideoPlayer";

const BASE = "/templates/truecut";

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

export function Picture({ assetKey, alt, className = "", sizes = "(min-width: 900px) 50vw, 100vw", priority = false }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`tc-media-placeholder ${className}`} role="img" aria-label={`Picture: ${alt}`} data-asset={assetKey}>
        <span className="tc-media-placeholder-grid" aria-hidden="true" />
        <span className="tc-media-placeholder-label">Picture / {assetKey}</span>
      </div>
    );
  }

  const { w, h } = ASSETS[assetKey];
  const set = (format: "webp" | "avif") => `${assetSrc(assetKey, 800, format)} 800w, ${assetSrc(assetKey, 1600, format)} 1600w`;
  return (
    <picture className={`tc-picture ${className}`} data-asset={assetKey}>
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
      />
    </picture>
  );
}

type VideoFrameProps = {
  videoKey: string;
  posterKey?: string;
  posterAlt: string;
  className?: string;
  label?: string;
  priority?: boolean;
};

export function VideoFrame({ videoKey, posterKey, posterAlt, className = "", label = "Field reel", priority = false }: VideoFrameProps) {
  const video = VIDEO_ASSETS[videoKey];
  const poster = posterKey ? <Picture assetKey={posterKey} alt={posterAlt} className="tc-video-poster" priority={priority} sizes={priority ? "100vw" : undefined} /> : <span className="tc-media-placeholder-grid" aria-hidden="true" />;
  if (!video) {
    return (
      <div className={`tc-video-placeholder ${className}`} role="img" aria-label={`Video placeholder: ${label}`} data-video={videoKey}>
        {poster}
        <span className="tc-video-placeholder-overlay">
          <span className="tc-play-mark" aria-hidden="true">▶</span>
          <span><b>Video</b> / {videoKey}.mp4</span>
        </span>
      </div>
    );
  }

  return (
    <VideoPlayer videoKey={videoKey} desktop={`${BASE}/clips/${video.desktop}`} mobile={`${BASE}/clips/${video.mobile}`} label={label} className={className}>
      {poster}
    </VideoPlayer>
  );
}
