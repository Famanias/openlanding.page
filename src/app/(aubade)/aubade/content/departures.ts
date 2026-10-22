import { ROUTE } from "./line";

export type DepartureStatus = "open" | "few" | "complet";

export type Departure = {
  /** ISO date, "YYYY-MM-DD". */
  id: string;
  weekday: "Thu" | "Sun";
  day: string;
  monthShort: string;
  berthsLeft: number;
  status: DepartureStatus;
  note?: string;
};

export const DEPARTURE_MONTHS = [
  { year: 2026, month: 10, label: "November" },
  { year: 2026, month: 11, label: "December" },
  { year: 2027, month: 0, label: "January" },
] as const;

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const NOTES: Record<string, { note: string; berthsLeft?: number }> = {
  "2026-12-24": { note: "Réveillon dinner on board", berthsLeft: 2 },
  "2026-12-31": { note: "Arrive for Capodanno", berthsLeft: 0 },
};

export function statusFor(berthsLeft: number): DepartureStatus {
  if (berthsLeft <= 0) return "complet";
  if (berthsLeft <= 6) return "few";
  return "open";
}

/** Small deterministic hash so availability looks lived-in but never changes between renders. */
function seeded(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function berthsFor(id: string): number {
  const h = seeded(id);
  if (h % 9 === 0) return 0;
  return (h >>> 4) % ROUTE.cabins;
}

/** Every Thursday and Sunday departure in a month (month is 0-based, like Date). */
export function departuresIn(year: number, month: number): Departure[] {
  const out: Departure[] = [];
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  for (let d = 1; d <= days; d++) {
    const dow = new Date(Date.UTC(year, month, d)).getUTCDay();
    if (dow !== 0 && dow !== 4) continue;
    const day = String(d).padStart(2, "0");
    const id = `${year}-${String(month + 1).padStart(2, "0")}-${day}`;
    const special = NOTES[id];
    const berthsLeft = special?.berthsLeft ?? berthsFor(id);
    out.push({
      id,
      weekday: dow === 4 ? "Thu" : "Sun",
      day,
      monthShort: MONTHS_SHORT[month],
      berthsLeft,
      status: statusFor(berthsLeft),
      note: special?.note,
    });
  }
  return out;
}

export function allDepartures(): Departure[] {
  return DEPARTURE_MONTHS.flatMap((m) => departuresIn(m.year, m.month));
}

export function departureLabel(d: Departure): string {
  return `${d.weekday} ${d.day} ${d.monthShort}`;
}
