export type FieldSystem = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  metric: string;
  assetKey: string;
  align: "left" | "center" | "right";
};

export type FieldNote = {
  id: string;
  farm: string;
  region: string;
  acres: number;
  storm: number;
  daysHeld: number;
  assetKey: string;
  note: string;
};

export type SeasonalEntry = {
  month: string;
  code: string;
  title: string;
  detail: string;
  marker: "rain" | "plant" | "hold" | "harvest";
};

export const FIELD_SYSTEMS: FieldSystem[] = [
  { id: "swale", eyebrow: "LAND / 01", title: "Give the ridge somewhere to rest.", copy: "A shallow contour swale slows a storm without asking the soil to become a channel. The line is quiet; the effect is cumulative.", metric: "18% less runoff", assetKey: "systems-swale", align: "left" },
  { id: "shade", eyebrow: "CANOPY / 02", title: "Hold a little shadow.", copy: "Shade rows soften the hottest hours and keep the surface from giving up its water before roots can reach it.", metric: "6.4°C cooler soil", assetKey: "systems-shade", align: "center" },
  { id: "drip", eyebrow: "ROOT / 03", title: "Let pressure stay low.", copy: "A low-pressure line follows the contour and gives each root zone a slower, more useful drink.", metric: "31 days held", assetKey: "systems-drip", align: "right" },
];

export const FIELD_NOTES: FieldNote[] = [
  { id: "cienega", farm: "Cienega Fields", region: "Mojave edge / CA", acres: 14, storm: 42, daysHeld: 31, assetKey: "field-note-01", note: "A first storm stayed in the field long enough to carry the cover crop through the dry week." },
  { id: "marrow", farm: "Marrow Creek", region: "High desert / OR", acres: 28, storm: 36, daysHeld: 24, assetKey: "field-note-02", note: "The orchard kept its shade after the cloud line moved on; the root zone did the quiet work." },
  { id: "lomas", farm: "Las Lomas", region: "Interior valley / NM", acres: 42, storm: 51, daysHeld: 38, assetKey: "field-note-03", note: "A longer contour and a lower pressure line made the same rain useful twice." },
];

export const SEASONAL_LEDGER: SeasonalEntry[] = [
  { month: "JAN", code: "01", title: "Read the ridge", detail: "Mark the contour before the first storm has a chance to choose for you.", marker: "rain" },
  { month: "FEB", code: "02", title: "Catch the first rain", detail: "Open the swale and let the field take the slower route.", marker: "rain" },
  { month: "MAR", code: "03", title: "Plant the cover", detail: "A living surface keeps the next clear day from taking everything back.", marker: "plant" },
  { month: "APR", code: "04", title: "Hold the shade", detail: "Keep the soil under a cooler line as the light gets longer.", marker: "hold" },
  { month: "MAY", code: "05", title: "Tune the pressure", detail: "Give each root zone only what it can use in the hour.", marker: "hold" },
  { month: "JUN", code: "06", title: "Watch the roots", detail: "The field tells you where storage is becoming growth.", marker: "plant" },
  { month: "JUL", code: "07", title: "Keep the long way", detail: "A storm is a route, not a single event.", marker: "rain" },
  { month: "AUG", code: "08", title: "Hold through heat", detail: "The slow line matters most when the sky goes bright.", marker: "hold" },
  { month: "SEP", code: "09", title: "Read again", detail: "Return to the same contour and measure what changed.", marker: "plant" },
  { month: "OCT", code: "10", title: "Make room", detail: "Clear the next path before the rain arrives.", marker: "rain" },
  { month: "NOV", code: "11", title: "Gather the crop", detail: "Harvest from a soil that still has a pulse beneath it.", marker: "harvest" },
  { month: "DEC", code: "12", title: "Leave the ground", detail: "The field rests with its water held in the right places.", marker: "harvest" },
];

