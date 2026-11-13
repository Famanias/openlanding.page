export type Walk = {
  id: string;
  number: string;
  name: string;
  description: string;
  duration: number;
  distance: string;
  time: "morning" | "evening";
  when: string;
  meeting: string;
  terrain: string;
  color: "green" | "peach" | "yellow";
};

export type WalkFilter = "all" | "short" | "evening";

export const WALKS: Walk[] = [
  {
    id: "river",
    number: "01",
    name: "The riverside ramble",
    description: "A little water, a lot of sky, and the long way home.",
    duration: 65,
    distance: "4.2 km",
    time: "evening",
    when: "Wednesdays, 6:15 pm",
    meeting: "The old boathouse",
    terrain: "Mostly flat",
    color: "green",
  },
  {
    id: "park",
    number: "02",
    name: "Park & pastry",
    description: "A little green, a good chat, and something sweet after.",
    duration: 50,
    distance: "3.1 km",
    time: "morning",
    when: "Saturdays, 9:30 am",
    meeting: "The park gates",
    terrain: "Easy paths",
    color: "peach",
  },
  {
    id: "sunset",
    number: "03",
    name: "The long way home",
    description: "For the evenings when you're not quite ready to go in.",
    duration: 60,
    distance: "3.8 km",
    time: "evening",
    when: "Fridays, 5:45 pm",
    meeting: "The corner kiosk",
    terrain: "Gentle slopes",
    color: "yellow",
  },
];

export function filterWalks(walks: readonly Walk[], filter: WalkFilter): Walk[] {
  if (filter === "short") return walks.filter((walk) => walk.duration <= 60);
  if (filter === "evening") return walks.filter((walk) => walk.time === "evening");
  return [...walks];
}

export function makeWalkCard(name: string, walkId: string, walks: readonly Walk[] = WALKS): { name: string; walk: Walk } | null {
  const cleanName = name.trim();
  const walk = walks.find((item) => item.id === walkId);
  if (!cleanName || cleanName.length > 80 || !walk) return null;
  return { name: cleanName, walk };
}
