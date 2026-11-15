/** Typed copy for the sections. ELSEWHERE is fictional: every stay, date, rate and logbook entry is illustrative. */

export type NavItem = { id: string; label: string };

/** In-page sections, in scroll order. The header highlights whichever one the reader is in. */
export const NAV: NavItem[] = [
  { id: "walk", label: "The walk in" },
  { id: "room", label: "The room" },
  { id: "seasons", label: "Three seasons" },
  { id: "stay", label: "Stay" },
];

export type Fact = { value: number; suffix?: string; label: string };

export const HERO_FACTS: Fact[] = [
  { value: 1900, suffix: " m", label: "on foot from the road" },
  { value: 35, suffix: " min", label: "at a walking pace" },
  { value: 0, label: "bars of signal at the door" },
];

export type InventoryItem = { name: string; note: string };

/** Everything in the room. There is one of most things. */
export const INVENTORY: InventoryItem[] = [
  { name: "A stove", note: "Cast iron, 5 kW. It heats the room in twenty minutes and holds until morning." },
  { name: "A window", note: "2.1 m of glass, square to the valley. It is the only screen." },
  { name: "A sofa", note: "Linen, deep enough to sleep on. It folds out to a bed for two." },
  { name: "A stool", note: "Three legs, turned from the cedar that came down for the footings." },
  { name: "A blanket", note: "Undyed wool, woven 60 km down the valley. Heavier than it looks." },
  { name: "Two mugs", note: "Speckled stoneware. The kettle lives on the stove top." },
  { name: "Forty logs", note: "Split, dry and stacked by the hearth before you arrive." },
  { name: "A logbook", note: "On the windowsill, with a pencil. Write the weather down." },
];

/** What was left out on purpose. */
export const NOT_HERE: string[] = ["A router", "A television", "A clock", "A doorbell", "A mirror bigger than your face"];

export const ROOM_FACTS: Fact[] = [
  { value: 23, suffix: " m²", label: "of pine, floor to ridge" },
  { value: 1, label: "window worth the walk" },
  { value: 40, label: "logs by the hearth" },
  { value: 2, label: "people, at most" },
];

export type LogEntry = { date: string; weather: string; nights: number; text: string; initials: string };

/** Entries from the logbook on the windowsill. Invented guests, invented weather. */
export const LOGBOOK: LogEntry[] = [
  {
    date: "14 May",
    weather: "Rain until four, then none",
    nights: 3,
    text: "Reached for my phone eleven times on the first evening. Twice on the second. On the third I couldn't have told you where it was.",
    initials: "R. A.",
  },
  {
    date: "2 October",
    weather: "Mist to the windowsill",
    nights: 2,
    text: "We watched the valley appear and disappear for a whole afternoon and called it a good use of a Saturday. The stove ate three armloads.",
    initials: "M. & J. O.",
  },
  {
    date: "19 January",
    weather: "Snow, 40 cm, still falling",
    nights: 4,
    text: "Fifty-five minutes up in snowshoes and I was cross for all of them. Then the door, and the light already on. I've stopped being cross.",
    initials: "T. K.",
  },
];

/** The drifting band between the room and the seasons. */
export const BAND: string[] = ["No road", "No router", "No clock", "One window", "One stove", "One trail in"];

export const DISCLAIMER =
  "ELSEWHERE is a fictional cabin made for this template. The valley, the stays, the dates and the rates are illustrative, and nothing on this page is sent, booked or charged.";
