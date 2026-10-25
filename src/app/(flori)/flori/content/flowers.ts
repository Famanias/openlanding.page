import type { Feeling } from "../bouquet/model";
export type FlowerFeeling = { id: Feeling; name: string; note: string; description: string; flowers: string; background: string; number: string };
export const FLOWERS: FlowerFeeling[] = [
  { id: "daydream", name: "Daydream", note: "for your soft side", description: "Blush petals, lilac daydreams. A little quiet in a very loud world.", flowers: "Cosmos · sweet peas · seasonal foliage", background: "lilac", number: "01" },
  { id: "sunbeam", name: "Sunbeam", note: "a pocketful of happy", description: "Buttery yellows and apricot pops. The windows-open kind of feeling.", flowers: "Poppies · daisies · seasonal foliage", background: "butter", number: "02" },
  { id: "wildthing", name: "Wild Thing", note: "a little beautifully unruly", description: "Long stems and lovely surprises. For the ones who grow their own way.", flowers: "Scabiosa · bells · seasonal foliage", background: "pistachio", number: "03" },
];
