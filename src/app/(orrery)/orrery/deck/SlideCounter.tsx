import { formatCounter } from "./deck-state";

export function SlideCounter({ index, count, tone }: { index: number; count: number; tone: "bone" | "ink" }) {
  return (
    <p className="orr-counter" data-tone={tone} data-testid="slide-counter" aria-live="polite">
      {formatCounter(index, count)}
    </p>
  );
}
