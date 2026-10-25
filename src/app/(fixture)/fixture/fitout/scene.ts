import { clamp01, lerp, segment } from "../motion/math";

export type StageId = "shell" | "fixtures" | "wiring" | "signage" | "open";

export type Stage = {
  id: StageId;
  n: string;
  name: string;
  service: string;
  week: string;
  line: string;
  checks: string[];
};

/** The five fit-out stages, in the order the storefront is assembled. */
export const STAGES: Stage[] = [
  {
    id: "shell",
    n: "01",
    name: "Shell",
    service: "Store setup",
    week: "Week 1",
    line: "Domain, payments, shipping zones and tax, wired before anything is decorated.",
    checks: ["Domain + SSL", "Payments in 3 currencies", "Shipping zones", "EU VAT rules"],
  },
  {
    id: "fixtures",
    n: "02",
    name: "Fixtures",
    service: "Theme build",
    week: "Weeks 2–3",
    line: "A theme cut to your catalogue: collection grids, product pages and a cart that never surprises.",
    checks: ["Collection grid", "Product page", "Slide-out cart", "Mobile first"],
  },
  {
    id: "wiring",
    n: "03",
    name: "Wiring",
    service: "App wiring",
    week: "Week 3",
    line: "Only the apps that earn their keep: reviews, subscriptions, bookings and email, tested end to end.",
    checks: ["Reviews", "Subscribe & save", "Bookings", "Email flows"],
  },
  {
    id: "signage",
    n: "04",
    name: "Signage",
    service: "Speed + conversion",
    week: "Week 4",
    line: "Headlines that sell, a free-shipping bar that pays for itself, and a store that loads in a blink.",
    checks: ["Copy pass", "Shipping bar", "Image budget", "Core Web Vitals"],
  },
  {
    id: "open",
    n: "05",
    name: "Open",
    service: "Launch + care",
    week: "Launch day",
    line: "The sign flips. We stay on the floor for launch week, then keep the shop tuned every month.",
    checks: ["Launch-day watch", "Order checks", "Monthly tune-up", "Same-day fixes"],
  },
];

/** Share of the scene spent on the hero (the empty plot) before stage 1 begins. */
export const INTRO = 0.1;
/** Share of the scene each stage holds. The remainder after stage 5 lets "Open" breathe. */
export const STAGE_SPAN = 0.16;

export function stageStart(index: number): number {
  return INTRO + (index - 1) * STAGE_SPAN;
}

/** 0 = the hero's empty plot; 1–5 = the fit-out stages. */
export function stageIndexAt(progress: number): number {
  const p = clamp01(progress);
  if (p < INTRO) return 0;
  return Math.min(STAGES.length, 1 + Math.floor((p - INTRO) / STAGE_SPAN + 1e-9));
}

/** Progress (0–1) inside stage `index`. Stage 0 is complete once anything has scrolled. */
export function stageLocal(progress: number, index: number): number {
  if (index <= 0) return progress > 0 ? 1 : 0;
  const start = stageStart(index);
  return segment(progress, start, start + STAGE_SPAN);
}

export type Readout = { loadSeconds: number; conversion: number; orders: number; checks: number };

const round1 = (n: number) => Math.round(n * 10) / 10;

/** The live numbers beside the storefront: speed improves through fixtures → signage, sales arrive when it opens. */
export function readoutAt(progress: number): Readout {
  const p = clamp01(progress);
  const index = stageIndexAt(p);
  const speed = segment(p, stageStart(2), stageStart(5));
  const opening = stageLocal(p, 5);
  return {
    loadSeconds: round1(lerp(4.1, 1.2, speed)),
    conversion: index < 5 ? 0.9 : round1(lerp(0.9, 2.8, segment(opening, 0, 0.6))),
    orders: index < 5 ? 0 : Math.round(lerp(0, 38, opening)),
    checks: p >= 1 ? STAGES.length : Math.max(0, index - 1),
  };
}

/** Document scroll position that lands a little into stage `index` of a scene at `sceneTop`. */
export function scrollTargetFor(index: number, sceneTop: number, sceneHeight: number, viewportHeight: number): number {
  const travel = Math.max(0, sceneHeight - viewportHeight);
  if (index <= 0) return sceneTop;
  const p = index >= STAGES.length ? 1 : stageStart(index) + STAGE_SPAN * 0.35;
  return Math.round(sceneTop + travel * p);
}
