import type { ReactNode } from "react";
import { ASSETS } from "./assets.generated";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `/templates/kazeko/${key}-${width}.${format}` : null;
}
export function Picture({ assetKey, alt, children, className = "" }: { assetKey: string; alt: string; children: ReactNode; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) return <div className={`kz-picture kz-placeholder ${className}`} data-asset={assetKey}>{children}<span className="kz-art-label">Original concept illustration</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <picture className={`kz-picture ${className}`}><source type="image/avif" srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`} sizes="(min-width: 900px) 45vw, 100vw" />
    <img src={src} srcSet={`${src} 800w, ${assetSrc(assetKey, 1600)} 1600w`} sizes="(min-width: 900px) 45vw, 100vw" width={w} height={h} loading="lazy" decoding="async" alt={alt} /></picture>;
}
