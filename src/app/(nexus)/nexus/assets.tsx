import { ASSETS } from "./assets.generated";

export function Picture({
  assetKey,
  alt,
  className = "",
}: {
  assetKey: string;
  alt: string;
  className?: string;
}) {
  const asset = ASSETS[assetKey];
  if (!asset) {
    return <div className={className} role="img" aria-label={alt} />;
  }
  return (
    <img
      src={`/templates/nexus/${assetKey}-1600.webp`}
      alt={alt}
      className={className}
      width={asset.w}
      height={asset.h}
    />
  );
}
