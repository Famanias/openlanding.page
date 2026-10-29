import type { StageRect } from "./director";
import { WORLD_CHAPTERS } from "../logic/chapters";
export const isLandscapeLayout = (width: number, height: number) =>
  width <= 900 && height <= 560 && width >= height * 1.15;
/** Full-viewport worlds use these as virtual object windows, never canvas crops. */
export function worldStageRect(
  progress: number,
  width: number,
  height: number,
): StageRect {
  const slot = (index: number): StageRect => {
    const landscape = isLandscapeLayout(width, height);
    if (width <= 900 && !landscape) {
      const header = 76;
      const stageHeight =
        index === 5
          ? height * (width <= 600 ? 0.14 : 0.16)
          : width <= 600
            ? height <= 740
              ? height * (index === 4 ? 0.22 : 0.3)
              : height * 0.28
            : height * 0.36;
      return {
        left: 12,
        top: header + 8,
        width: width - 24,
        height: stageHeight,
      };
    }
    if (index === 2) return { left: 0, top: 0, width, height };
    if (landscape)
      return {
        left: index === 0 || index === 3 ? width * 0.52 : 12,
        top: 76,
        width: width * 0.46,
        height: Math.max(80, height - 76 - 88 - (index === 4 ? 80 : 0)),
      };
    if (index === 1) {
      const top = Math.max(88, Math.round(height * 0.09));
      return {
        left: 0,
        top,
        width: width * 0.56,
        height: Math.max(160, Math.min(height * 0.6, height - top - 260)),
      };
    }
    const top = Math.max(88, height * 0.11);
    return {
      left: index === 0 || index === 3 ? width * 0.51 : 0,
      top,
      width: width * 0.48,
      height: Math.max(
        120,
        Math.min(height * 0.8, height - top - (index === 4 ? 210 : 110)),
      ),
    };
  };
  let index = 0;
  for (let i = 1; i < WORLD_CHAPTERS.length; i++)
    if (progress >= WORLD_CHAPTERS[i].startProgress) index = i;
  for (let i = 1; i < WORLD_CHAPTERS.length; i++) {
    const boundary = WORLD_CHAPTERS[i].startProgress;
    if (progress >= boundary - 0.015 && progress <= boundary + 0.015) {
      const t = ease((progress - boundary + 0.015) / 0.03);
      return mixRect(slot(i - 1), slot(i), t);
    }
  }
  return slot(index);
}
export type StageTier = "phone" | "tablet" | "compact" | "desktop";
export function stageTier(width: number): StageTier {
  return width <= 600
    ? "phone"
    : width <= 900
      ? "tablet"
      : width <= 1180
        ? "compact"
        : "desktop";
}
export function bandLayout(
  width: number,
  height: number,
  chapter: number,
  pinned = false,
) {
  const tablet = stageTier(width) === "tablet";
  const fraction =
    chapter === 1
      ? tablet
        ? 0.42
        : 0.3
      : chapter === 4 && pinned
        ? tablet
          ? 0.34
          : 0.23
        : tablet
          ? 0.5
          : 0.36;
  const top = chapter === 4 && pinned ? 64 : 70;
  return {
    top,
    height: height * fraction,
    bottom: top + height * fraction + (chapter === 1 ? 154 : 30),
  };
}
export function overlaps(a: StageRect, b: StageRect) {
  return (
    a.left < b.left + b.width &&
    a.left + a.width > b.left &&
    a.top < b.top + b.height &&
    a.top + a.height > b.top
  );
}
const clamp = (value: number, low = 0, high = 1) =>
  Math.max(low, Math.min(high, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRect = (a: StageRect, b: StageRect, t: number): StageRect => ({
  left: mix(a.left, b.left, t),
  top: mix(a.top, b.top, t),
  width: mix(a.width, b.width, t),
  height: mix(a.height, b.height, t),
});
export type StageJourney = {
  start: number;
  end: number;
  outgoingBottom: number;
  incomingTop: number;
  crosses: boolean;
};
/** Document-space copy bounds define the open corridor between chapters. */
export function planStageJourney(
  current: StageRect,
  next: StageRect,
  outgoing: StageRect[],
  incoming: StageRect[],
  start: number,
  end: number,
  viewportHeight: number,
): StageJourney {
  const outgoingBottom = Math.max(
    start,
    ...outgoing.map((r) => r.top + r.height),
  );
  const incomingTop = Math.min(
    end + viewportHeight,
    ...incoming.map((r) => r.top),
  );
  const first = incomingTop - current.top - current.height - 24;
  const last = outgoingBottom - next.top + 24;
  return {
    start: clamp(first - viewportHeight * 0.2, start, end - 1),
    end: clamp(last + viewportHeight * 0.2, start + 1, end),
    outgoingBottom,
    incomingTop,
    crosses:
      Math.abs(current.left + current.width / 2 - next.left - next.width / 2) >
      Math.min(current.width, next.width) * 0.7,
  };
}
/** Resize a same-side slot before approaching copy reaches its vertical span. */
function fitAlongside(
  rect: StageRect,
  obstacles: StageRect[],
  extraHeight: number,
) {
  let left = rect.left,
    right = rect.left + rect.width;
  const center = (left + right) / 2;
  for (const block of obstacles) {
    const gap = Math.max(
      block.top - rect.top - rect.height - extraHeight,
      rect.top - block.top - block.height,
    );
    const influence = 1 - ease(gap / 96);
    if (block.left >= center) {
      right = Math.min(
        right,
        mix(
          rect.left + rect.width,
          Math.max(rect.left + 1, block.left - 24),
          influence,
        ),
      );
    } else if (block.left + block.width <= center) {
      left = Math.max(
        left,
        mix(
          rect.left,
          Math.min(right - 1, block.left + block.width + 24),
          influence,
        ),
      );
    }
  }
  return { ...rect, left, width: Math.max(1, right - left) };
}
/** Reduced motion chooses a clear reserved slot immediately, without a travel path. */
function stillSlot(
  current: StageRect,
  next: StageRect,
  obstacles: StageRect[],
  extraHeight: number,
) {
  const clear = (rect: StageRect) =>
    !obstacles.some((block) =>
      overlaps({ ...rect, height: rect.height + extraHeight }, block),
    );
  if (clear(current)) return current;
  if (clear(next)) return next;
  let gaps = [{ top: current.top, bottom: current.top + current.height }];
  for (const block of obstacles) {
    if (
      block.left >= current.left + current.width ||
      block.left + block.width <= current.left
    )
      continue;
    gaps = gaps
      .flatMap((gap) => [
        {
          top: gap.top,
          bottom: Math.min(gap.bottom, block.top - 24 - extraHeight),
        },
        {
          top: Math.max(gap.top, block.top + block.height + 24),
          bottom: gap.bottom,
        },
      ])
      .filter((gap) => gap.bottom > gap.top);
  }
  const gap = gaps.sort((a, b) => b.bottom - b.top - (a.bottom - a.top))[0];
  return gap
    ? { ...current, top: gap.top, height: gap.bottom - gap.top }
    : current;
}
/** One opaque object glides through the empty space between readable columns. */
export function stageHandoff(
  current: StageRect,
  next: StageRect,
  progress: number,
  obstacles: StageRect[],
  reduced: boolean,
  stacked: boolean,
  extraHeight = 0,
  journey?: StageJourney,
  scroll = 0,
  viewportHeight = 900,
) {
  if (reduced)
    return {
      rect: stacked
        ? current
        : stillSlot(current, next, obstacles, extraHeight),
    };
  if (stacked) return { rect: mixRect(current, next, clamp(progress)) };
  if (!journey?.crosses) {
    return {
      rect: fitAlongside(
        mixRect(current, next, clamp(progress)),
        obstacles,
        extraHeight,
      ),
    };
  }
  const t = clamp(
    (scroll - journey.start) / Math.max(1, journey.end - journey.start),
  );
  if (t === 0) return { rect: current };
  if (t === 1) return { rect: next };
  const ceiling = Math.min(
    viewportHeight - 24,
    journey.incomingTop - scroll - 24,
  );
  const floor = Math.max(56, journey.outgoingBottom - scroll + 24);
  const height = Math.max(
    1,
    Math.min(
      ceiling - floor,
      current.height * 0.55,
      next.height * 0.55,
      viewportHeight * 0.36,
    ),
  );
  const across = ease((t - 0.32) / 0.36);
  const width = Math.min(
    current.width,
    next.width,
    height *
      mix(current.width / current.height, next.width / next.height, across),
  );
  const center = mix(
    current.left + current.width / 2,
    next.left + next.width / 2,
    across,
  );
  const small = {
    left: center - width / 2,
    top: clamp(
      (journey.outgoingBottom + journey.incomingTop) / 2 - scroll - height / 2,
      floor,
      Math.max(floor, ceiling - height),
    ),
    width,
    height,
  };
  if (t < 0.32) {
    const rect = mixRect(current, small, ease(t / 0.32));
    // The outgoing column remains beside us; the incoming column approaches below.
    const bottom = Math.min(
      rect.top + rect.height,
      journey.incomingTop - scroll - 24,
    );
    return { rect: { ...rect, height: Math.max(1, bottom - rect.top) } };
  }
  if (t > 0.68) {
    const rect = mixRect(small, next, ease((t - 0.68) / 0.32));
    const top = Math.max(rect.top, journey.outgoingBottom - scroll + 24);
    return {
      rect: { ...rect, top, height: Math.max(1, rect.top + rect.height - top) },
    };
  }
  return { rect: small };
}
