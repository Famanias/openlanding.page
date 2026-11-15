import type { Bars } from "../walk/trail";

/**
 * Four signal bars. The fill is driven by `data-bars` on this element or any ancestor, so the scroll engine
 * can drop a bar by changing one attribute.
 */
export function SignalBars({ bars, className }: { bars?: Bars; className?: string }) {
  return (
    <span className={`ew-bars ${className ?? ""}`} data-bars={bars} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/** The trail blaze: a painted rectangle, and the brand's one accent. */
export function Blaze({ className }: { className?: string }) {
  return <span className={`ew-blaze ${className ?? ""}`} aria-hidden="true" />;
}
