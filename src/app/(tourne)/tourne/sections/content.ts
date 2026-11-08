export type ProcessStep = { id: string; name: string; duration: string; detail: string };

export const PROCESS: readonly ProcessStep[] = [
  { id: "wedge", name: "Wedge", duration: "40 min", detail: "Air is the enemy. Every ball is cut, slammed and kneaded until it is the same all the way through." },
  { id: "throw", name: "Throw", duration: "4 to 20 min", detail: "Hana or Teo centres the clay and pulls your profile up in three to six lifts, checking it against a brass template." },
  { id: "trim", name: "Trim", duration: "2 days later", detail: "Leather-hard, the foot is carved and your signature mark is pressed into the base." },
  { id: "fire", name: "Glaze and fire", duration: "11 hours", detail: "Bisque at 1,000 °C, then glaze and a second firing to 1,305 °C in a gas kiln that cools for two days." },
];

export type Potter = { id: string; name: string; role: string; line: string; assetKey: string };

export const POTTERS: readonly Potter[] = [
  { id: "hana", name: "Hana Ortiz", role: "Thrower, since 2014", line: "Learned on a kick wheel in Bizen. Has thrown 6,100 of the 11,482.", assetKey: "potter-hana" },
  { id: "teo", name: "Teo Lindqvist", role: "Glazes and firing", line: "Keeps a logbook of every kiln since 2016. Never fires on a Friday.", assetKey: "potter-teo" },
];

export const STUDIO_FACTS = [
  { id: "weeks", value: 5, suffix: " weeks", label: "From order to your door" },
  { id: "glazes", value: 6, suffix: " glazes", label: "Each mixed in the studio" },
  { id: "kg", value: 140, suffix: " kg", label: "Of clay thrown every week" },
] as const;

export const GLAZE_TICKER = ["Celadon", "Wood Ash", "Tenmoku", "Rust Slip", "Soot Ink", "Bare Clay", "Cone 10", "Reduction", "Hand-thrown"] as const;
