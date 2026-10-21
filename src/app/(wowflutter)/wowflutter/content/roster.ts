export type Artist = {
  id: string;
  name: string;
  kind: string;
  place: string;
  /** Catalogue number of the record they made with the label. */
  release: number;
  question: string;
  answer: string;
  portrait: string;
  portraitAlt: string;
};

/** The three artists interviewed in Issue 07. */
export const ROSTER: readonly Artist[] = [
  {
    id: "marl",
    name: "Marl Quartet",
    kind: "String quartet",
    place: "Leeds",
    release: 7,
    question: "Why record in a stairwell?",
    answer:
      "A stairwell tells you how long a note lasts, and nobody argues with a stairwell. We stopped fighting the room and tuned to it.",
    portrait: "artist-marl",
    portraitAlt: "Four string players in coats, seated on concrete stairs in a closed swimming baths",
  },
  {
    id: "ines",
    name: "Ines Haverford",
    kind: "Piano and voice",
    place: "Glasgow",
    release: 3,
    question: "What did the heating have to do with it?",
    answer:
      "Radiators tick as they cool, in time with nothing at all. Track four is mostly me trying to play along with one.",
    portrait: "artist-ines",
    portraitAlt: "A woman at an upright piano beside a cast-iron radiator, lit by a single lamp",
  },
  {
    id: "dunmore",
    name: "Dunmore & Ash",
    kind: "Guitar and harmonium",
    place: "Whitby",
    release: 1,
    question: "Nothing since 2019?",
    answer:
      "We made something. We just haven't finished mixing it. It's in the kitchen, and the kitchen keeps being busy.",
    portrait: "artist-dunmore",
    portraitAlt: "Two musicians at a kitchen table with a harmonium and a battered acoustic guitar",
  },
];
