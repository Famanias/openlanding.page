import { berthById } from "../content/berths";

export type BookingInput = {
  departure: string;
  berth: string;
  guests: string;
  name: string;
  email: string;
  notes: string;
};

export type BookingField = keyof BookingInput;
export type BookingErrors = Partial<Record<BookingField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const NOTES_MAX = 280;

/** Client-side rules. `onSale` holds the ids of departures with berths left. */
export function validateBooking(input: BookingInput, onSale: ReadonlySet<string>): BookingErrors {
  const errors: BookingErrors = {};

  if (!input.departure) errors.departure = "Choose a departure.";
  else if (!onSale.has(input.departure)) errors.departure = "That night is full. Choose another departure.";

  const berth = berthById(input.berth);
  if (!berth) errors.berth = "Choose a berth.";

  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 2) errors.guests = "One or two guests per cabin.";
  else if (berth && guests > berth.maxGuests) errors.guests = `The ${berth.name} sleeps one.`;

  if (input.name.trim().length < 2) errors.name = "Add the name for the cabin door.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Add an email address for your ticket.";
  if (input.notes.length > NOTES_MAX) errors.notes = `Keep notes to ${NOTES_MAX} characters.`;

  return errors;
}

export function isValid(errors: BookingErrors): boolean {
  return Object.keys(errors).length === 0;
}

/** Per cabin, per night: dinner and breakfast included, a second guest at no extra charge. */
export function fareFor(berthId: string): number {
  return berthById(berthId)?.price ?? 0;
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}

export function cabinFor(berthId: string, departure: string, email: string): { voiture: number; cabine: number } {
  const berth = berthById(berthId);
  if (!berth) return { voiture: 0, cabine: 0 };
  return { voiture: berth.voiture, cabine: (hash(`${departure}|${email.trim().toLowerCase()}`) % berth.cabins) + 1 };
}

export function ticketNumber(departure: string, email: string): string {
  const [, mm, dd] = departure.split("-");
  const code = hash(`${email.trim().toLowerCase()}|${departure}`).toString(36).toUpperCase().padStart(4, "0").slice(-4);
  return `AU-${mm}${dd}-${code}`;
}
