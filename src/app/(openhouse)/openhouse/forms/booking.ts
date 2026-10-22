export type BookingValues = { name: string; email: string; goal: string };

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {};
  if (!values.name.trim()) errors.name = "Add your name so the invitation has a person on it.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Use an email address we can reply to.";
  if (!values.goal) errors.goal = "Choose the work you want the page to do.";
  return errors;
}
