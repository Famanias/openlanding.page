import type { ChapterId } from "../night/clock";

export type Chapter = {
  id: ChapterId;
  /** Short name used by the moon dial, the announcer and the tide table eyebrow. */
  label: string;
  /** The landing-page job this low tide does. */
  job: string;
  /** Revealed by the lantern. */
  headline: string;
  /** Rises when the visitor is still. */
  quietLine: string;
};

export const CHAPTERS: Chapter[] = [
  { id: "hook", label: "High tide", job: "The hook", headline: "Let the tide go out.", quietLine: "A sleep ring for people who can't put the phone down." },
  { id: "problem", label: "First low tide", job: "The problem", headline: "The scroll doesn't end. The night does.", quietLine: "Light sleep is where the phone keeps pulling you back up." },
  { id: "sensors", label: "Second low tide", job: "How it works", headline: "Three pools, read all night.", quietLine: "Heart, warmth and breath, measured on your finger. Nothing to check until morning." },
  { id: "smart-wake", label: "Third low tide", job: "Smart wake", headline: "We wake you on the outgoing tide.", quietLine: "A soft pulse at the lightest point of your last cycle, inside the window you choose." },
  { id: "proof", label: "Fourth low tide", job: "Proof", headline: "Footprints, before the water comes back.", quietLine: "From the first four hundred sleepers on the beta." },
  { id: "reveal", label: "Fifth low tide", job: "The ring", headline: "The moon, on your hand.", quietLine: "Titanium. Seven days a charge. $279, and nothing to subscribe to." },
  { id: "dawn", label: "Dawn", job: "Your night", headline: "Good morning.", quietLine: "Draw your own night, then keep the ring." },
];

export const chapter = (id: ChapterId) => CHAPTERS.find((c) => c.id === id)!;

/** Every figure is real and sourced; the plankton forms `value`. */
export const STATS = [
  {
    value: "1 in 3",
    label: "US adults usually sleep less than seven hours a night.",
    source: "CDC, MMWR 65(6), 2016",
    sourceUrl: "https://www.cdc.gov/mmwr/volumes/65/wr/mm6506a1.htm",
  },
  {
    value: "7h",
    label: "The least sleep adults need each night.",
    source: "CDC, Adult Sleep Facts and Stats",
    sourceUrl: "https://www.cdc.gov/sleep/data-research/facts-stats/adults-sleep-facts-and-stats.html",
  },
  {
    value: "95%",
    label: "use a screen in the hour before bed at least a few nights a week.",
    source: "National Sleep Foundation, Sleep in America poll, 2011 (via Harvard Health)",
    sourceUrl: "https://content.health.harvard.edu/blog/americans-have-screen-time-until-bedtime/",
  },
] as const;

export const SENSORS = [
  { id: "heart", name: "Heart rate", line: "Your resting pulse, beat by beat, tells light sleep from deep." },
  { id: "temperature", name: "Skin temperature", line: "A slow tide of warmth marks when your body is ready to let go." },
  { id: "breathing", name: "Breathing", line: "Breaths per minute, counted while you are under." },
] as const;

export const TESTIMONIALS = [
  { quote: "I stopped taking my phone to bed. There was nothing on the ring to check.", name: "Maya", city: "Lisbon" },
  { quote: "It woke me at 6:41 instead of 7:00 and I felt like I had been somewhere far away.", name: "Tomás", city: "Valparaíso" },
  { quote: "The first sleep tracker that doesn't want my attention back.", name: "Ines", city: "Rotterdam" },
] as const;

export const PRODUCT = {
  name: "LOWTIDE Ring",
  material: "Grade 5 titanium",
  sizes: [6, 7, 8, 9, 10, 11, 12, 13],
  finishes: [
    { id: "moonstone", name: "Moonstone" },
    { id: "tidewater", name: "Tidewater" },
    { id: "driftwood", name: "Driftwood" },
  ],
  batteryDays: 7,
  wakeWindowMin: [10, 30] as const,
  price: 279,
  subscription: false,
  app: "No feed. No notifications.",
} as const;
