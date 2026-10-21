/**
 * The eight stations of the house, in walking order. The light of each room
 * (stops, style, speed) lives in ../light/phenomena.ts, keyed by the same id.
 */

export type RoomId =
  | "foyer"
  | "blue-hour"
  | "aurora"
  | "noctiluca"
  | "alpenglow"
  | "score"
  | "visit"
  | "exit";

export type WallLabel = {
  /** e.g. "Civil twilight" */
  phenomenon: string;
  /** Mono rows on the museum label. */
  rows: [string, string][];
};

export type Room = {
  id: RoomId;
  /** Roman numeral on the door lintel; empty for foyer and exit. */
  numeral: string;
  name: string;
  /** Short name for the depth rail and nav. */
  short: string;
  /** Which side the plaque hangs on in the corridor. */
  side: "left" | "right" | "centre";
  title: string;
  body: string;
  label?: WallLabel;
};

export const ROOMS: Room[] = [
  {
    id: "foyer",
    numeral: "",
    name: "Foyer",
    short: "Foyer",
    side: "centre",
    title: "A house made of moving light.",
    body: "Six rooms in a 1912 pumping station on the Tagus, each tuned to a light the sky only makes for minutes. Walk them at your own pace: about forty minutes, end to end.",
  },
  {
    id: "blue-hour",
    numeral: "I",
    name: "Blue Hour",
    short: "Blue Hour",
    side: "left",
    title: "The twenty minutes after the sun.",
    body: "The sky drains to cobalt and the city comes up to meet it. Outside, it lasts as long as the sun takes to sink six degrees. Here, it lasts as long as you stand still.",
    label: {
      phenomenon: "Civil twilight",
      rows: [
        ["Sun", "0° to −6° below the horizon"],
        ["Peak", "≈ 460 nm"],
        ["Lisbon, June", "21:05 – 21:38"],
        ["Room length", "7.2 m"],
      ],
    },
  },
  {
    id: "aurora",
    numeral: "II",
    name: "Aurora",
    short: "Aurora",
    side: "right",
    title: "Curtains that answer the solar wind.",
    body: "Oxygen a hundred kilometres up glows green; higher, where the air is thinner, it burns red. The curtains in Room II replay the magnetometer trace of a real storm over Tromsø, minute by minute.",
    label: {
      phenomenon: "Aurora borealis",
      rows: [
        ["Green line", "557.7 nm · O at 100 km"],
        ["Red line", "630.0 nm · O above 200 km"],
        ["Trace", "Tromsø, 10 May 2024"],
        ["Room length", "7.2 m"],
      ],
    },
  },
  {
    id: "noctiluca",
    numeral: "III",
    name: "Noctiluca",
    short: "Noctiluca",
    side: "left",
    title: "The sea, lit from inside.",
    body: "Noctiluca scintillans is a single cell that flashes blue when the water around it moves. It's the one room that reacts to you: move, and the walls answer.",
    label: {
      phenomenon: "Bioluminescence",
      rows: [
        ["Organism", "Noctiluca scintillans"],
        ["Emission", "≈ 474 nm"],
        ["Flash", "0.1 s, on disturbance"],
        ["Try", "Move your pointer"],
      ],
    },
  },
  {
    id: "alpenglow",
    numeral: "IV",
    name: "Alpenglow",
    short: "Alpenglow",
    side: "right",
    title: "The mountain keeps the sun after you lose it.",
    body: "When the valley has gone grey, the peaks still catch light that has crossed four hundred kilometres of air, scattered rose by the time it lands. Room IV is the only warm room in the house.",
    label: {
      phenomenon: "Alpenglow",
      rows: [
        ["Sun", "−2° to −4°"],
        ["Peak", "≈ 610 nm"],
        ["Path", "≈ 400 km of atmosphere"],
        ["Room length", "7.2 m"],
      ],
    },
  },
  {
    id: "score",
    numeral: "V",
    name: "The Score Room",
    short: "Score",
    side: "left",
    title: "Compose the next room.",
    body: "Every room in the house runs from a score: a hue, a drift, a bloom. Here the score is yours. Turn the dials and the walls around you follow.",
  },
  {
    id: "visit",
    numeral: "VI",
    name: "Visit",
    short: "Visit",
    side: "left",
    title: "Come in from the street.",
    body: "One group every twenty minutes, so no room ever holds more than a few people.",
  },
  {
    id: "exit",
    numeral: "",
    name: "Exit",
    short: "Exit",
    side: "centre",
    title: "The light keeps moving after you leave.",
    body: "Estação Elevatória nº 4 · Rua da Cozinha Económica 21 · 1300-149 Lisboa",
  },
];

export const ROOM_COUNT = ROOMS.length;

export function roomIndex(id: RoomId): number {
  return ROOMS.findIndex((r) => r.id === id);
}

export function anchorId(id: RoomId): string {
  return `nl-${id}`;
}

/** Hash → station index, or null when the hash isn't a room. */
export function stationForHash(hash: string): number | null {
  const id = hash.replace(/^#/, "");
  const i = ROOMS.findIndex((r) => anchorId(r.id) === id);
  return i === -1 ? null : i;
}
