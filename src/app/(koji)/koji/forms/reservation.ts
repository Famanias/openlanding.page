export type Reservation = { date: string; time: string; guests: number; name: string; email: string };
export type ReservationErrors = Partial<Record<keyof Reservation, string>>;

/** Two seatings a night, each split into two arrival times at the 12-seat counter. */
export const SEATINGS = ["18:00", "18:30", "20:45", "21:15"] as const;
export const MAX_GUESTS = 4;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** `today` is injectable for tests; dates compare as local YYYY-MM-DD strings. */
export function validateReservation(input: Reservation, today: Date = new Date()): ReservationErrors {
  const errors: ReservationErrors = {};
  const todayISO = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
    .map((n, i) => String(n).padStart(i === 0 ? 4 : 2, "0"))
    .join("-");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || input.date < todayISO) errors.date = "Choose a date from today";
  if (!(SEATINGS as readonly string[]).includes(input.time)) errors.time = "Choose one of the four seatings";
  if (!Number.isInteger(input.guests) || input.guests < 1 || input.guests > MAX_GUESTS) errors.guests = "Parties of 1–4 only";
  if (!input.name.trim()) errors.name = "Add your name";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter a valid email";
  return errors;
}
