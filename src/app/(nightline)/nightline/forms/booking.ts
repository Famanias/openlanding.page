export type Booking = { name: string; email: string; city: string };
export type BookingErrors = Partial<Record<keyof Booking, string>>;
export function validateBooking(input: Booking): BookingErrors { const errors: BookingErrors = {}; if (!input.name.trim()) errors.name = "Add your name"; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = "Enter a work email"; if (!input.city.trim()) errors.city = "Choose a departure city"; return errors; }
