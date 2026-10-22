export type BerthId = "couchette" | "cabine" | "grand-lit";

export type Berth = {
  id: BerthId;
  voiture: number;
  name: string;
  title: string;
  blurb: string;
  specs: { label: string; value: string }[];
  /** Per cabin, per night, dinner and breakfast included. */
  price: number;
  maxGuests: 1 | 2;
  cabins: number;
  assetKey: string;
  alt: string;
};

export const BERTHS: Berth[] = [
  {
    id: "couchette",
    voiture: 3,
    name: "Couchette Privée",
    title: "A berth of your own",
    blurb: "One bed, one lamp, one door that locks. The cabin for people who travel alone and sleep well.",
    specs: [
      { label: "Bed", value: "190 × 80 cm" },
      { label: "Wash", value: "Basin in cabin" },
      { label: "Guests", value: "1" },
    ],
    price: 390,
    maxGuests: 1,
    cabins: 12,
    assetKey: "berth-couchette",
    alt: "A single sleeper berth made up in white linen, a brass reading lamp lit beside it.",
  },
  {
    id: "cabine",
    voiture: 5,
    name: "Cabine",
    title: "Two, stacked",
    blurb: "Upper and lower berths, a fold-down table for the nightcap, and a window seat for Stresa.",
    specs: [
      { label: "Beds", value: "2 × 190 × 80 cm" },
      { label: "Wash", value: "Basin in cabin" },
      { label: "Guests", value: "1–2" },
    ],
    price: 640,
    maxGuests: 2,
    cabins: 16,
    assetKey: "berth-cabine",
    alt: "A two-berth sleeper cabin with bunks, a fold-down table and claret curtains.",
  },
  {
    id: "grand-lit",
    voiture: 7,
    name: "Grand Lit",
    title: "The double",
    blurb: "A real double bed, a private shower, and breakfast brought to the cabin as the train leaves Padova.",
    specs: [
      { label: "Bed", value: "200 × 140 cm" },
      { label: "Wash", value: "Private shower" },
      { label: "Guests", value: "1–2" },
    ],
    price: 1180,
    maxGuests: 2,
    cabins: 10,
    assetKey: "berth-grandlit",
    alt: "A turned-down double bed with a claret velvet headboard and two lit brass lamps.",
  },
];

export function berthById(id: string): Berth | undefined {
  return BERTHS.find((b) => b.id === id);
}

export function formatEuro(amount: number): string {
  return `€${amount.toLocaleString("en-GB")}`;
}
