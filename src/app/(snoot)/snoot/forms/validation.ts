export type Booking = {
  petName: string;
  species: string;
  reason: string;
  /** ISO date (yyyy-mm-dd). */
  day: string;
  owner: string;
  contact: string;
};

export type BookingErrors = Partial<Record<keyof Booking, string>>;

export const SPECIES_OPTIONS = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
  { id: "rabbit", label: "Rabbit" },
  { id: "small", label: "Small & scaly" },
] as const;

export const REASONS = [
  { id: "checkup", label: "Check-up" },
  { id: "jabs", label: "Vaccinations" },
  { id: "poorly", label: "Not quite right" },
  { id: "dental", label: "Teeth" },
  { id: "other", label: "Something else" },
] as const;

export function emptyBooking(): Booking {
  return { petName: "", species: "", reason: "", day: "", owner: "", contact: "" };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,}$/;

export function validateBooking(values: Booking): BookingErrors {
  const errors: BookingErrors = {};
  const pet = values.petName.trim();
  if (!pet) errors.petName = "Who's coming in? Add your pet's name.";
  else if (pet.length > 30) errors.petName = "Keep it under 30 letters.";
  if (!SPECIES_OPTIONS.some((s) => s.id === values.species)) errors.species = "Pick the closest match.";
  if (!REASONS.some((r) => r.id === values.reason)) errors.reason = "Tell us roughly why.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.day)) errors.day = "Choose a day that suits.";
  if (!values.owner.trim()) errors.owner = "And your name, please.";
  const contact = values.contact.trim();
  const digits = contact.replace(/\D/g, "");
  if (!(EMAIL.test(contact) || (PHONE.test(contact) && digits.length >= 7))) errors.contact = "An email or phone number we can reach.";
  return errors;
}

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export type DayOption = { id: string; label: string; date: string; month: string };

/** The next `count` days after `from`, skipping Sundays (short hours, emergencies only). */
export function nextDays(from: Date, count: number): DayOption[] {
  const out: DayOption[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (out.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0) continue;
    out.push({ id: iso(cursor), label: WEEKDAY[cursor.getDay()], date: String(cursor.getDate()), month: MONTH[cursor.getMonth()] });
  }
  return out;
}

export function bookingSummary(values: Booking): string {
  const reason = REASONS.find((r) => r.id === values.reason)?.label ?? "Visit";
  const [y, m, d] = values.day.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${values.petName.trim()} · ${reason} · ${WEEKDAY[date.getDay()]} ${d} ${MONTH[m - 1]}`;
}
