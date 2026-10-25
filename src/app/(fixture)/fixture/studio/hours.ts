export type StudioStatus = { open: boolean; label: string };

const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n: number) => String(n).padStart(2, "0");

function localParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return { day: DAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const isWorkday = (day: number) => day >= 1 && day <= 5;

/** Is the Rotterdam studio open (Mon–Fri 09:00–18:00 local), and when does that change? */
export function studioStatus(date: Date, timeZone = "Europe/Amsterdam"): StudioStatus {
  const { day, minutes } = localParts(date, timeZone);
  const opens = OPEN_HOUR * 60;
  const closes = CLOSE_HOUR * 60;
  if (isWorkday(day) && minutes >= opens && minutes < closes) {
    return { open: true, label: `Open · closes ${pad(CLOSE_HOUR)}:00` };
  }
  if (isWorkday(day) && minutes < opens) {
    return { open: false, label: `Closed · opens ${pad(OPEN_HOUR)}:00` };
  }
  let next = (day + 1) % 7;
  while (!isWorkday(next)) next = (next + 1) % 7;
  return { open: false, label: `Closed · opens ${DAYS[next]} ${pad(OPEN_HOUR)}:00` };
}
