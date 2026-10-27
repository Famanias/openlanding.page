export type Cabin = {
  code: string;
  name: string;
  detail: string;
  price: string;
  tone: "amber" | "blue" | "rose";
  assetKey?: string;
};

export const CABINS: readonly Cabin[] = [
  { code: "C-04", name: "The couchette", detail: "Six berths · shared hush", price: "from €59", tone: "amber", assetKey: "cabin-couchette" },
  { code: "B-12", name: "The berth", detail: "Two berths · a reading lamp", price: "from €119", tone: "blue", assetKey: "cabin-berth" },
  { code: "S-01", name: "The sleeper", detail: "Private cabin · breakfast", price: "from €189", tone: "rose", assetKey: "cabin-sleeper" },
] as const;
