/** Opening hours by weekday (0 = Sunday), in minutes since midnight. */
export const HOURS: { day: string; open: number; close: number }[] = [
  { day: "Sun", open: 10 * 60, close: 14 * 60 },
  { day: "Mon", open: 8 * 60, close: 20 * 60 },
  { day: "Tue", open: 8 * 60, close: 20 * 60 },
  { day: "Wed", open: 8 * 60, close: 20 * 60 },
  { day: "Thu", open: 8 * 60, close: 20 * 60 },
  { day: "Fri", open: 8 * 60, close: 20 * 60 },
  { day: "Sat", open: 9 * 60, close: 17 * 60 },
];

const SOON = 45;

export type ClinicStatus = { open: boolean; label: string; detail: string };

const hhmm = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export function clinicStatus(now: Date): ClinicStatus {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = HOURS[day];

  if (minutes >= today.open && minutes < today.close) {
    return {
      open: true,
      label: today.close - minutes <= SOON ? "Closing soon" : "Open now",
      detail: `Doors close at ${hhmm(today.close)}`,
    };
  }
  if (minutes < today.open) {
    return { open: false, label: "Night vet on call", detail: `Doors open ${hhmm(today.open)} today` };
  }
  const tomorrow = HOURS[(day + 1) % 7];
  return { open: false, label: "Night vet on call", detail: `Doors open ${hhmm(tomorrow.open)} tomorrow` };
}
