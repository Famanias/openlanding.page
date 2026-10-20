import { formatCounter } from "./deck-state";

export function SlideCounter({ index, count }: { index: number; count: number }) {
  return (
    <p className="orr-counter" data-testid="slide-counter" aria-live="polite">
      {formatCounter(index, count)}
    </p>
  );
}
