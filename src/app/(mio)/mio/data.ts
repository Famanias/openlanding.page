export type WorkKey = "last-light" | "cloud-keeper" | "quiet-delivery" | "summer-room";
export type Work = { id: WorkKey; title: string; category: "Worlds" | "Characters"; year: string; description: string; format: string; note: string };
export const WORKS: readonly Work[] = [
  { id: "last-light", title: "Where the light stays", category: "Worlds", year: "2026", description: "A little house at the end of a long summer. An imagined place for the feeling of finally being home.", format: "Environmental illustration", note: "An original world study, with layers of sea air and the last gold of the day." },
  { id: "cloud-keeper", title: "The cloud keeper", category: "Characters", year: "2026", description: "She collects the clouds that get lost on their way to the sea. Her companion is rather less helpful than he thinks.", format: "Original character illustration", note: "Character design, a small story, and a curious little traveling companion." },
  { id: "quiet-delivery", title: "One last delivery", category: "Worlds", year: "2025", description: "The parcels can wait a moment. There's a warm light in the window, and someone has put the kettle on.", format: "Narrative illustration", note: "A quiet vignette about kindness at the end of an ordinary working day." },
  { id: "summer-room", title: "An afternoon, forever", category: "Worlds", year: "2026", description: "An open window, a sleeping cat, and absolutely nowhere else to be. Some adventures are very small.", format: "Interior illustration", note: "A personal study of the everyday places we wish we could keep forever." },
];
export const PACKAGES = [
  { id: "portrait", name: "A familiar face", kind: "Character portrait", price: 120, time: "1–2 weeks", description: "Your character, your favorite person, or a version of you from another world.", includes: ["One character, bust or waist-up", "A simple atmospheric background", "Two sketch revisions", "High-resolution digital file"] },
  { id: "moment", name: "A little moment", kind: "Character + a story", price: 280, time: "2–3 weeks", description: "A character in a place that means something. A memory, a daydream, a small adventure.", includes: ["One full-body character", "An illustrated setting & little details", "Two sketch revisions", "High-resolution digital file"] },
  { id: "world", name: "A world of your own", kind: "Full scene illustration", price: 560, time: "3–5 weeks", description: "Let's build somewhere you've never been, but somehow already miss.", includes: ["An intricate, full illustrated scene", "Up to two characters", "Three sketch revisions", "High-resolution file + wallpaper crop"] },
] as const;
export type PackageId = typeof PACKAGES[number]["id"];
export const PROCESS = [
  { title: "Tell me your daydream", text: "Share your idea, references, and the feeling you're hoping for. A messy description is a perfectly good start." },
  { title: "Find the shape of it", text: "I'll confirm the scope and quote. A 50% deposit reserves your place, then we explore the first sketches." },
  { title: "A little back-and-forth", text: "We refine your favorite sketch together. You'll see the colors take shape before the finishing touches." },
  { title: "A world, all yours", text: "After the remaining balance, your high-resolution artwork arrives, ready to keep, gift, or make your wallpaper." },
] as const;
