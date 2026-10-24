import type { WorkKey } from "./data";
import { AfterRain } from "./art/AfterRain";
import { CloudKeeper } from "./art/CloudKeeper";
import { NightDelivery } from "./art/NightDelivery";
import { SummerRoom } from "./art/SummerRoom";

export function Picture({ assetKey, alt, className = "", prefix = "work" }: { assetKey: WorkKey; alt: string; className?: string; prefix?: string }) {
  return <div className={`mh-picture ${className}`} role="img" aria-label={alt} data-asset={assetKey}>
    {assetKey === "last-light" ? <AfterRain prefix={`${prefix}-light`}/> : assetKey === "cloud-keeper" ? <CloudKeeper/> : assetKey === "quiet-delivery" ? <NightDelivery/> : <SummerRoom/>}
  </div>;
}
