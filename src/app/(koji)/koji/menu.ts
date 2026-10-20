/** The eleven-course omakase, grouped into the five scenes of the food flight. */
export const COURSE_GROUPS = [
  {
    id: "sakizuke",
    label: "Sakizuke",
    jp: "先付",
    courses: [
      { n: 1, name: "Sakizuke", detail: "Sesame tofu, kōji-cured yolk" },
      { n: 2, name: "Hassun", detail: "Ten small pickles of the season" },
    ],
  },
  {
    id: "mukozuke",
    label: "Mukōzuke",
    jp: "向付",
    courses: [
      { n: 3, name: "Mukōzuke", detail: "Shio-kōji sea bream" },
      { n: 4, name: "Mukōzuke", detail: "Aged bluefin, three-year soy" },
    ],
  },
  {
    id: "yakimono",
    label: "Yakimono",
    jp: "焼物",
    courses: [
      { n: 5, name: "Yakimono", detail: "Saikyō-miso black cod" },
      { n: 6, name: "Yakimono", detail: "Binchōtan duck, kōji glaze" },
    ],
  },
  {
    id: "nimono",
    label: "Nimono",
    jp: "煮物",
    courses: [
      { n: 7, name: "Nimono", detail: "Daikon in dashi, white miso" },
      { n: 8, name: "Agemono", detail: "Shiitake tempura, smoked shio" },
      { n: 9, name: "Sunomono", detail: "Cucumber, amazake vinegar" },
    ],
  },
  {
    id: "shokuji",
    label: "Shokuji",
    jp: "食事",
    courses: [
      { n: 10, name: "Shokuji", detail: "Donabe kōji rice, miso soup, tsukemono" },
      { n: 11, name: "Kanmi", detail: "Amazake ice, sake lees" },
    ],
  },
] as const;

export type CourseGroupId = (typeof COURSE_GROUPS)[number]["id"];
