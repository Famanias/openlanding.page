export type Section =
  | "cover"
  | "letter"
  | "contents"
  | "feature"
  | "roster"
  | "catalogue"
  | "press"
  | "subscribe"
  | "back";

export type PageInfo = { n: number; section: Section; title: string };

/** Every page of Issue 07, in order. The index is the page number minus one. */
export const PAGES: readonly PageInfo[] = [
  { n: 1, section: "cover", title: "Cover: Issue 07, The Sound of Rooms" },
  { n: 2, section: "letter", title: "Editor's letter" },
  { n: 3, section: "contents", title: "Contents" },
  { n: 4, section: "feature", title: "Feature: the stairwell sessions" },
  { n: 5, section: "feature", title: "Feature: liner notes, part one" },
  { n: 6, section: "feature", title: "Feature: liner notes, part two" },
  { n: 7, section: "roster", title: "Roster: Marl Quartet" },
  { n: 8, section: "roster", title: "Roster: Ines Haverford" },
  { n: 9, section: "roster", title: "Roster: Dunmore & Ash" },
  { n: 10, section: "catalogue", title: "Catalogue: Side A" },
  { n: 11, section: "catalogue", title: "Catalogue: Side B" },
  { n: 12, section: "press", title: "The pressing plant" },
  { n: 13, section: "subscribe", title: "Get the next issue" },
  { n: 14, section: "back", title: "Back cover" },
];

export type ContentsEntry = { label: string; note: string; page: number; section: Section };

/** What the contents page lists. */
export const CONTENTS: readonly ContentsEntry[] = [
  { label: "The stairwell sessions", note: "Liner notes for Low Ceilings", page: 4, section: "feature" },
  { label: "The roster", note: "Three artists, three rooms", page: 7, section: "roster" },
  { label: "The catalogue", note: "WF-001 to WF-008, Side A and Side B", page: 10, section: "catalogue" },
  { label: "The pressing plant", note: "Where Thursdays go", page: 12, section: "press" },
  { label: "Get the next issue", note: "By post or by email", page: 13, section: "subscribe" },
];

export type NavLink = { label: string; page: number };

/** The top bar's links. */
export const NAV: readonly NavLink[] = [
  { label: "Contents", page: 3 },
  { label: "Feature", page: 4 },
  { label: "Roster", page: 7 },
  { label: "Catalogue", page: 10 },
  { label: "Subscribe", page: 13 },
];
