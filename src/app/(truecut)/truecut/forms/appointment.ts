export type AppointmentValues = { name: string; email: string; service: string };
export type AppointmentErrors = Partial<Record<keyof AppointmentValues, string>>;

export function validateAppointment(values: AppointmentValues): AppointmentErrors {
  const errors: AppointmentErrors = {};
  if (!values.name.trim()) errors.name = "Add your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a work email.";
  if (!values.service) errors.service = "Choose the work you need help with.";
  return errors;
}

export function ticketCode(service: string): string {
  const clean = service.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 4).padEnd(4, "X");
  return `TC-${clean}`;
}
