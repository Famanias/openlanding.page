export const BOOKING_FOCUS = ["conversion", "merchandising", "speed", "retention"] as const;

export type BookingFocus = (typeof BOOKING_FOCUS)[number];

export type BookingValues = {
  name: string;
  email: string;
  shop: string;
  focus: string;
};

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {};

  if (!values.name.trim()) errors.name = "Add your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a work email.";
  if (!values.shop.trim()) errors.shop = "Add your shop name.";
  if (!BOOKING_FOCUS.includes(values.focus as BookingFocus)) {
    errors.focus = "Choose the area that needs care.";
  }

  return errors;
}
