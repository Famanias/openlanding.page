export type Feeling = "daydream" | "sunbeam" | "wildthing";
export type BunchSize = "little" | "lovely" | "abundant";
export const FEELINGS: Feeling[] = ["daydream", "sunbeam", "wildthing"];
export const SIZES: BunchSize[] = ["little", "lovely", "abundant"];
export const PRICES: Record<BunchSize, number> = { little: 24, lovely: 34, abundant: 48 };
export const SIZE_LABELS: Record<BunchSize, string> = { little: "A little bunch", lovely: "Something lovely", abundant: "Full of feeling" };
export function selectionFromSearch(search: string): { feeling: Feeling; size: BunchSize } {
  const query = new URLSearchParams(search);
  const feeling = query.get("feeling");
  const size = query.get("size");
  return {
    feeling: FEELINGS.find((item) => item === feeling) ?? "daydream",
    size: SIZES.find((item) => item === size) ?? "little",
  };
}
