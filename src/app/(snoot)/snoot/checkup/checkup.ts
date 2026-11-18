import { clamp, lerp, progress } from "../motion/math";

/** Frank is drawn in a 2600 × 640 viewBox, nose at the left, tail at the right. */
export const FRANK_WIDTH = 2600;
export const FRANK_HEIGHT = 640;

export type ChapterId = "nose" | "ears" | "heart" | "belly" | "paws" | "tail";

export type Chapter = {
  id: ChapterId;
  /** Where the chest-piece rests, in Frank's viewBox units. */
  x: number;
  y: number;
  part: string;
  title: string;
  body: string;
  services: string[];
  /** The live readout shown while this part is examined. */
  reading: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "nose",
    x: 96,
    y: 292,
    part: "Nose",
    title: "We start where they start: the snoot.",
    body: "Same-day diagnostics in the building, so a wet nose or a dry one gets an answer before you get home.",
    services: ["Bloods back in 40 minutes", "Digital X-ray and ultrasound", "Dental scale and polish"],
    reading: "Nose · damp, cool, very nosy",
  },
  {
    id: "ears",
    x: 330,
    y: 196,
    part: "Eyes & ears",
    title: "Then a good look, and a good listen.",
    body: "Itchy ears, weepy eyes and mystery scratching are the most common reasons pets visit. We see them most days.",
    services: ["Skin and allergy clinic", "Ear cytology on the spot", "Eye pressure checks"],
    reading: "Ears · clean · eyes · bright",
  },
  {
    id: "heart",
    x: 600,
    y: 340,
    part: "Heart",
    title: "Thirty seconds with a stethoscope says a lot.",
    body: "Every check-up includes a full listen to heart and lungs, with an ECG on the same visit if anything skips.",
    services: ["Wellness exams, nose to tail", "Same-visit ECG", "Senior heart screening"],
    reading: "Heart · 92 bpm · steady",
  },
  {
    id: "belly",
    x: 1220,
    y: 418,
    part: "Belly",
    title: "A gentle press on the belly. Mostly giggles.",
    body: "Weight, diet and digestion, worked out with you rather than handed down. Our nurses run a free weigh-in club.",
    services: ["Nutrition plans", "Free monthly weigh-ins", "Worming and flea care"],
    reading: "Belly · soft · 7.4 kg (ideal)",
  },
  {
    id: "paws",
    x: 1930,
    y: 560,
    part: "Paws",
    title: "Paws, pads, claws and the joints above them.",
    body: "Two theatres on site for everything from a torn dewclaw to cruciate repair, with the same vet before and after.",
    services: ["Soft-tissue and orthopaedic surgery", "Claw trims, no appointment", "Hydrotherapy referrals"],
    reading: "Paws · 4 of 4 · claws trimmed",
  },
  {
    id: "tail",
    x: 2330,
    y: 180,
    part: "Tail",
    title: "And it ends the way every visit should: wagging.",
    body: "A written plan in your inbox before you reach the car, and a nurse who calls two days later to see how it is going.",
    services: ["Written plan, same day", "Two-day follow-up call", "Vaccine reminders that actually remind"],
    reading: "Tail · wagging · all clear",
  },
];

/** The stethoscope's walk: from just in front of the nose to just past the tail tip. */
export const BODY_START = 40;
export const BODY_END = 2420;

/** 0..1 through a pinned section, measured from its real offsets (not raw scroll percentage). */
export function stageProgress(scrollY: number, top: number, height: number, viewport: number): number {
  return progress(scrollY, top, top + Math.max(0, height - viewport));
}

/** The point on Frank's body (viewBox x) under the chest-piece at a given progress. */
export function bodyXAt(p: number): number {
  return lerp(BODY_START, BODY_END, clamp(p));
}

/** The progress that rests the chest-piece exactly on chapter `index` (used by the rail's jump links). */
export function progressForChapter(index: number): number {
  const i = Math.min(CHAPTERS.length - 1, Math.max(0, Math.round(index)));
  return progress(CHAPTERS[i].x, BODY_START, BODY_END);
}

/** The chapter nearest the chest-piece: boundaries sit halfway between neighbouring chapters. */
export function chapterIndexAt(bodyX: number): number {
  for (let i = 0; i < CHAPTERS.length - 1; i++) {
    if (bodyX < (CHAPTERS[i].x + CHAPTERS[i + 1].x) / 2) return i;
  }
  return CHAPTERS.length - 1;
}

/** The chest-piece's height (viewBox y): it rests on each body part and glides linearly between them. */
export function pieceYAt(bodyX: number): number {
  const first = CHAPTERS[0];
  const last = CHAPTERS[CHAPTERS.length - 1];
  if (bodyX <= first.x) return first.y;
  if (bodyX >= last.x) return last.y;
  for (let i = 0; i < CHAPTERS.length - 1; i++) {
    const a = CHAPTERS[i];
    const b = CHAPTERS[i + 1];
    if (bodyX <= b.x) return lerp(a.y, b.y, (bodyX - a.x) / (b.x - a.x));
  }
  return last.y;
}

/** translateX (px) for the track, so the body point `bodyX` sits under an anchor `anchorPx` from the left. */
export function trackOffset(bodyX: number, trackWidthPx: number, anchorPx: number): number {
  return anchorPx - (bodyX / FRANK_WIDTH) * trackWidthPx;
}

/** A flat heartbeat trace with one P-QRS-T blip per spike position. */
export function ecgPath(width: number, baseline: number, spikes: number[]): string {
  const parts = [`M0 ${baseline}`];
  for (const x of [...spikes].sort((a, b) => a - b)) {
    parts.push(
      `L${x - 34} ${baseline}`,
      `L${x - 24} ${baseline - 8}`,
      `L${x - 14} ${baseline}`,
      `L${x - 6} ${baseline + 12}`,
      `L${x} ${baseline - 42}`,
      `L${x + 7} ${baseline + 22}`,
      `L${x + 14} ${baseline}`,
      `L${x + 30} ${baseline - 10}`,
      `L${x + 44} ${baseline}`,
    );
  }
  parts.push(`L${width} ${baseline}`);
  return parts.join(" ");
}

/** The stamp lands once the chest-piece has passed the tail. */
export function isAllClear(p: number): boolean {
  return p >= 0.96;
}
