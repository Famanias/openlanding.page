import type { BunchSize } from "../bouquet/model";
export const PLANS: { id: BunchSize; name: string; stems: string; description: string; note: string }[] = [
  { id: "little", name: "A little bunch", stems: "10–12 stems", description: "A windowsill, a bedside, a small reason to smile.", note: "Small space, big feeling" },
  { id: "lovely", name: "Something lovely", stems: "16–20 stems", description: "The kitchen-table favourite. Just the right kind of full.", note: "The club favourite" },
  { id: "abundant", name: "Full of feeling", stems: "26–30 stems", description: "An all-out, arms-full, you-deserve-this kind of bunch.", note: "A proper armful" },
];
