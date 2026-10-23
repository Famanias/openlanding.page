export type SceneId = "inbox" | "schedule" | "progress" | "payments";

export type Scene = {
  id: SceneId;
  name: string;
  /** The phone's lock line under the scene title. */
  cue: string;
  /** The bottom sheet's headline; also the text the e2e spec reads. */
  card: string;
};

export const SCENES: readonly Scene[] = [
  { id: "inbox", name: "Inbox", cue: "A note from Maya’s mum", card: "You have 3 new threads" },
  { id: "schedule", name: "Schedule", cue: "Tuesday, 4:30 PM", card: "Your week, with room" },
  { id: "progress", name: "Progress", cue: "Algebra, 72% complete", card: "Progress worth sharing" },
  { id: "payments", name: "Payments", cue: "Invoice 104, settled", card: "Everything settled" },
] as const;
