export type Ritual = {
  time: string;
  title: string;
  body: string;
  field: "claret" | "nuit" | "dawn";
  assetKey: string;
  alt: string;
};

export const RITUALS: Ritual[] = [
  {
    time: "21:30",
    title: "Turndown",
    body: "While you're at dinner, your attendant makes the bed with 400-thread Portuguese percale, lowers the blind, and leaves one square of dark chocolate and tomorrow's timetable on the pillow.",
    field: "claret",
    assetKey: "night-turndown",
    alt: "Gloved hands folding back a white sheet over an indigo blanket at turndown.",
  },
  {
    time: "00:00",
    title: "The quiet hour",
    body: "From midnight the corridor lights dim to a glow and the train runs at its gentlest. Bogies are sprung for sleeping, not speed; we lose nine minutes on purpose between Lausanne and Brig.",
    field: "nuit",
    assetKey: "night-quiet",
    alt: "A dim sleeper corridor at midnight, closed cabin doors and a claret runner.",
  },
  {
    time: "08:15",
    title: "The bell",
    body: "No alarms. A brass hand bell is rung once down each carriage, the blinds go up on the lagoon, and coffee is already at your door.",
    field: "dawn",
    assetKey: "night-bell",
    alt: "A breakfast tray with a brass bell on a bed, dawn light through a half-raised blind.",
  },
];
