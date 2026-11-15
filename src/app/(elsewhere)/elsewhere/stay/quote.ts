/** Stay state shared by the season ruler and the booking panel, and the illustrative quote built from it. */
import { DEFAULT_MONTH, MONTHS, clampMonth, midMonth, seasonForMonth, type Season, type SeasonId } from "../seasons/seasons";

export const MIN_NIGHTS = 2;
export const MAX_NIGHTS = 7;
export const MAX_GUESTS = 2;
/** One flat charge per stay: split wood by the door and washed linen. */
export const WOOD_AND_LINEN = 45;

export type StayState = { month: number; nights: number; guests: number };

export const INITIAL_STAY: StayState = { month: DEFAULT_MONTH, nights: 3, guests: 2 };

export type StayAction =
  | { type: "month"; month: number }
  | { type: "season"; season: SeasonId }
  | { type: "nights"; nights: number }
  | { type: "step-nights"; delta: number }
  | { type: "guests"; guests: number };

export function clampNights(nights: number): number {
  if (!Number.isFinite(nights)) return MIN_NIGHTS;
  return Math.min(MAX_NIGHTS, Math.max(MIN_NIGHTS, Math.round(nights)));
}

export function clampGuests(guests: number): number {
  if (!Number.isFinite(guests)) return 1;
  return Math.min(MAX_GUESTS, Math.max(1, Math.round(guests)));
}

export function stayReducer(state: StayState, action: StayAction): StayState {
  switch (action.type) {
    case "month":
      return { ...state, month: clampMonth(action.month) };
    case "season":
      // stay put if the ruler is already inside the season that was asked for
      return seasonForMonth(state.month).id === action.season ? state : { ...state, month: midMonth(action.season) };
    case "nights":
      return { ...state, nights: clampNights(action.nights) };
    case "step-nights":
      return { ...state, nights: clampNights(state.nights + action.delta) };
    case "guests":
      return { ...state, guests: clampGuests(action.guests) };
    default:
      return state;
  }
}

export type QuoteLine = { label: string; amount: number };

export type Quote = {
  season: Season;
  monthName: string;
  nightly: number;
  nights: number;
  guests: number;
  lodging: number;
  total: number;
  lines: QuoteLine[];
};

export function quote(state: StayState): Quote {
  const month = clampMonth(state.month);
  const nights = clampNights(state.nights);
  const guests = clampGuests(state.guests);
  const season = seasonForMonth(month);
  const lodging = season.rate * nights;
  return {
    season,
    monthName: MONTHS[month - 1],
    nightly: season.rate,
    nights,
    guests,
    lodging,
    total: lodging + WOOD_AND_LINEN,
    lines: [
      { label: `${nights} nights at ${formatMoney(season.rate)}`, amount: lodging },
      { label: "Wood and linen", amount: WOOD_AND_LINEN },
    ],
  };
}

export function formatMoney(dollars: number): string {
  return `$${Math.round(dollars).toLocaleString("en-US")}`;
}

/** One line for the summary and the confirmation: "3 nights in May, for two". */
export function staySummary(state: StayState): string {
  const q = quote(state);
  return `${q.nights} nights in ${q.monthName}, for ${q.guests === 1 ? "one" : "two"}`;
}
