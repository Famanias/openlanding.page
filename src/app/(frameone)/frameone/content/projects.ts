export type Category = "Nonfiction" | "Fiction" | "Commercial";
export type Project = {
  id: string; title: string; category: Category; year: string; length: string;
  caption: string; synopsis: string; note: string; credits: string; stills: readonly [string, string];
};

export const PROJECTS: readonly Project[] = [
  { id: "breakwater", title: "Where the Breakwater Ends", category: "Nonfiction", year: "2025", length: "04:12", caption: "The morning begins before anyone is watching.", synopsis: "A quiet study of a harbor waking, and the hands that know it by heart.", note: "We waited for the harbor to make the first move. The only direction was to leave the camera running.", credits: "Direction & photography: FRAME/ONE · Fictional study", stills: ["01-film-a-still", "02-film-b-still"] },
  { id: "room", title: "The Room Keeps Light", category: "Fiction", year: "2024", length: "06:38", caption: "Some rooms remember the people who leave.", synopsis: "A woman moves through an apartment as the last of the afternoon changes its shape.", note: "The room needed to feel inhabited, even in the moments when no one was in the frame.", credits: "Direction & photography: FRAME/ONE · Fictional study", stills: ["03-film-c-still", "04-film-d-still"] },
  { id: "daylight", title: "An Object in Daylight", category: "Commercial", year: "2025", length: "00:45", caption: "A little light, held a little longer.", synopsis: "An imagined object study about the texture of ordinary mornings.", note: "The object was never the whole story. We looked for the small rituals that gather around it.", credits: "Direction & photography: FRAME/ONE · Fictional concept", stills: ["05-film-e-still", "06-film-f-still"] },
  { id: "blue-hour", title: "Across the Blue Hour", category: "Fiction", year: "2023", length: "05:24", caption: "There is still time to turn around.", synopsis: "A traveler pauses on an empty coastal road between departure and return.", note: "We kept the camera still and let the changing light carry the scene across the cut.", credits: "Direction & photography: FRAME/ONE · Fictional study", stills: ["07-film-g-still", "08-film-h-still"] },
];
