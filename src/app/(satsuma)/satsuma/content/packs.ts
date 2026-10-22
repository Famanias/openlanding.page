export type Pack = {
  id: string;
  name: string;
  /** Wedges in the pack's satsuma: one per reel. */
  segments: number;
  price: number;
  turnaround: string;
  popular?: boolean;
  perks: readonly string[];
};

export const PACKS: readonly Pack[] = [
  { id: "quarter", name: "Quarter", segments: 6, price: 480, turnaround: "5 days", perks: ["One maker, one product", "Captions and a 9:16 cut", "Two rounds of notes"] },
  { id: "half", name: "Half", segments: 12, price: 840, turnaround: "7 days", popular: true, perks: ["Up to two makers", "Hooks A/B tested in the edit", "Raw footage included", "Unlimited rounds of notes"] },
  { id: "whole", name: "Whole", segments: 24, price: 1440, turnaround: "12 days", perks: ["A crew of three makers", "Monthly refresh of every hook", "Raw footage and licensed music", "A named producer"] },
];

export function perReel(pack: Pack): number {
  return pack.price / pack.segments;
}

export function packById(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
