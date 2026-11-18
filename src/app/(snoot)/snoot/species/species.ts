export type SpeciesId = "dog" | "cat" | "rabbit" | "small";

export type Species = {
  id: SpeciesId;
  tab: string;
  headline: string;
  body: string;
  seenThisYear: number;
  visits: string[];
  /** The patient photograph (docs/image-prompts/snoot.md). */
  image: string;
  imageAlt: string;
  patient: string;
};

export const SPECIES: Species[] = [
  {
    id: "dog",
    tab: "Dogs",
    headline: "Long ones, loud ones, the ones who hide behind your legs.",
    body: "A separate dog entrance and waiting room, lick mats at every exam, and floor-level checks for anyone who won't hop up.",
    seenThisYear: 3412,
    visits: ["Annual check-ups", "Lumps and bumps", "Eaten something silly", "Cruciate repair"],
    image: "patient-dog",
    imageAlt: "A scruffy terrier sitting on a bright blue exam mat, looking up at the camera",
    patient: "Pip · 6 · terrier · in for a lump check, out with a biscuit",
  },
  {
    id: "cat",
    tab: "Cats",
    headline: "Cat-only hours, because cats have opinions.",
    body: "Tuesday and Thursday mornings are cats only: no barking, synthetic calming pheromones in every room, and carriers set down on raised shelves.",
    seenThisYear: 2186,
    visits: ["Kidney screening", "Dental cleans", "Overgrooming", "Thyroid checks"],
    image: "patient-cat",
    imageAlt: "A ginger cat peering out of an open carrier on a cream towel",
    patient: "Marmalade · 12 · moggy · thyroid bloods, very dignified",
  },
  {
    id: "rabbit",
    tab: "Rabbits",
    headline: "Rabbit-savvy vets, not dog vets who've read the leaflet.",
    body: "Teeth, tummies and the quiet signs rabbits hide well. We keep hay and greens in every room and never fast a bunny before surgery.",
    seenThisYear: 694,
    visits: ["Dental burring", "Gut stasis care", "Neutering", "Myxo and RHD vaccines"],
    image: "patient-rabbit",
    imageAlt: "A lop-eared rabbit nibbling a sprig of parsley on a soft blanket",
    patient: "Dumpling · 3 · mini lop · teeth trimmed, dignity intact",
  },
  {
    id: "small",
    tab: "Small & scaly",
    headline: "Guinea pigs to bearded dragons, with the right lamps on.",
    body: "Dr Arai runs our exotics clinic with heated exam rooms, UV-correct lighting and scales that weigh to a tenth of a gram.",
    seenThisYear: 418,
    visits: ["Shell and skin checks", "Husbandry reviews", "Egg binding", "Beak and nail trims"],
    image: "patient-tortoise",
    imageAlt: "A small tortoise stepping across a sunlit exam table towards a strawberry",
    patient: "Gerald · 41 · Hermann's tortoise · post-hibernation check",
  },
];
