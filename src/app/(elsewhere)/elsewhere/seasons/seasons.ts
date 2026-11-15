/** The valley keeps three seasons. One month ruler picks the plate, the daylight and the nightly rate. */

export type SeasonId = "green" | "amber" | "white";

export type Season = {
  id: SeasonId;
  name: string;
  /** Months 1..12 that belong to the season, in calendar order of the season. */
  months: number[];
  span: string;
  /** The same span, abbreviated for the season buttons. */
  short: string;
  assetKey: string;
  alt: string;
  /** Typical overnight low and afternoon high, °C. */
  low: number;
  high: number;
  /** Minutes on the trail in this season's conditions. */
  trailMinutes: number;
  /** Armloads of wood for a day and a night. */
  stoveLoads: number;
  valley: string;
  bring: string;
  /** Illustrative nightly rate in dollars. */
  rate: number;
};

export const SEASONS: Season[] = [
  {
    id: "green",
    name: "Green",
    months: [4, 5, 6, 7, 8],
    span: "April to August",
    short: "Apr to Aug",
    assetKey: "cabin-green",
    alt: "The cabin in the green season: wet ferns and moss around a dark timber gable with its glass door lit, mist lying in the valley behind.",
    low: 7,
    high: 19,
    trailMinutes: 35,
    stoveLoads: 1,
    valley: "Ferns to the knee, the Hollin Fork running high, and light in the window until ten.",
    bring: "Boots that can get wet, and a book you have already started.",
    rate: 240,
  },
  {
    id: "amber",
    name: "Amber",
    months: [9, 10, 11],
    span: "September to November",
    short: "Sep to Nov",
    assetKey: "cabin-amber",
    alt: "The same cabin in autumn: the ferns and maples have turned amber and gold and fallen leaves cover the wet rock path.",
    low: 2,
    high: 12,
    trailMinutes: 40,
    stoveLoads: 3,
    valley: "The maples go first, then the ferns. Mist sits in the valley until noon and the stove earns its keep.",
    bring: "A second pair of socks. The steps hold the rain.",
    rate: 265,
  },
  {
    id: "white",
    name: "White",
    months: [12, 1, 2, 3],
    span: "December to March",
    short: "Dec to Mar",
    assetKey: "cabin-white",
    alt: "The same cabin under snow: white boughs and ferns, snow on the gable roof and the path, the glass door glowing warm.",
    low: -6,
    high: 3,
    trailMinutes: 55,
    stoveLoads: 5,
    valley: "Snow to the eaves by January. The trail is marked with poles and the only tracks on it are yours.",
    bring: "Traction for the steps. We leave snowshoes at the cedar gate.",
    rate: 285,
  },
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const DEFAULT_MONTH = 5;
/** The cabin's latitude, used for the daylight readout. */
export const LATITUDE = 48.6;

export function clampMonth(month: number): number {
  if (!Number.isFinite(month)) return DEFAULT_MONTH;
  return Math.min(12, Math.max(1, Math.round(month)));
}

export function seasonById(id: SeasonId): Season {
  return SEASONS.find((season) => season.id === id) ?? SEASONS[0];
}

export function seasonForMonth(month: number): Season {
  const m = clampMonth(month);
  return SEASONS.find((season) => season.months.includes(m)) ?? SEASONS[0];
}

/** The month a season button jumps to: the middle of the season. */
export function midMonth(id: SeasonId): number {
  const { months } = seasonById(id);
  return months[Math.floor((months.length - 1) / 2)];
}

/** Position of a season among the three, for directional wipes. */
export function seasonIndex(id: SeasonId): number {
  return SEASONS.findIndex((season) => season.id === id);
}

const MID_MONTH_DAY = [15, 46, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];

/** Hours between sunrise and sunset in the middle of a month, from the sun's declination. */
export function daylightHours(month: number, latitude = LATITUDE): number {
  const day = MID_MONTH_DAY[clampMonth(month) - 1];
  const declination = 23.44 * Math.sin((2 * Math.PI * (284 + day)) / 365);
  const rad = Math.PI / 180;
  const cosHourAngle = -Math.tan(latitude * rad) * Math.tan(declination * rad);
  const hourAngle = Math.acos(Math.min(1, Math.max(-1, cosHourAngle)));
  return (24 / Math.PI) * hourAngle;
}

export function formatDaylight(hours: number): string {
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")} min`;
}

export function formatTemperature(celsius: number): string {
  return `${celsius < 0 ? "−" : ""}${Math.abs(celsius)}°`;
}
