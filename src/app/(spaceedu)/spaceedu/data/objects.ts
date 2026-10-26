export type ObjectKey = "gaia" | "cygnus" | "sgra";

export type SpaceObject = {
  key: ObjectKey;
  name: string;
  mass: number;
  schwarzschildKm: number;
  distanceLy: number;
  companion: string;
  orbit: string;
  state: string;
  palette: [string, string];
  disk: boolean;
  inclination: number;
};

export const OBJECTS: Record<ObjectKey, SpaceObject> = {
  gaia: { key: "gaia", name: "GAIA BH1", mass: 9.6, schwarzschildKm: 28, distanceLy: 1560, companion: "Sun like star", orbit: "186 day orbit", state: "Dormant binary", palette: ["#d7fbff", "#62b9d2"], disk: false, inclination: 80 },
  cygnus: { key: "cygnus", name: "CYGNUS X 1", mass: 21, schwarzschildKm: 63, distanceLy: 7200, companion: "Blue supergiant HDE 226868", orbit: "5.6 day orbit", state: "Feeding X ray binary", palette: ["#e0f7ff", "#4a6dff"], disk: true, inclination: 70 },
  sgra: { key: "sgra", name: "SGR A*", mass: 4_300_000, schwarzschildKm: 12_700_000, distanceLy: 26_700, companion: "None", orbit: "Galactic center", state: "Low luminosity flow", palette: ["#ffd58c", "#cf3f2f"], disk: true, inclination: 70 },
};

export const OBJECT_ORDER: ObjectKey[] = ["gaia", "cygnus", "sgra"];
