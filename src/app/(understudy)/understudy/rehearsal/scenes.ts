/** The four scenes of a run, each with its window. The last word of each title is cued. */
export type SceneKind = "lot" | "cast" | "notes" | "reel";
export type RehearsalScene = { id: SceneKind; n: string; lead: string; cue: string; body: string; window: string };

export const SCENES: RehearsalScene[] = [
  { id: "lot", n: "Scene 1", lead: "Join a company that runs like a", cue: "real one.",
    body: "Eighteen simulated companies with real data, real customers and a real brief on your desk on day one.", window: "the lot · parcelpost" },
  { id: "cast", n: "Scene 2", lead: "Run lines with your", cue: "cast.",
    body: "Four to six people rehearse the same company in different parts, so you hand off work the way a team does.", window: "#checkout-squad" },
  { id: "notes", n: "Scene 3", lead: "Get notes from your", cue: "director.",
    body: "Someone who has done the job for years reads every draft and tells you what a hiring manager would.", window: "readout.doc · 3 notes" },
  { id: "reel", n: "Scene 4", lead: "Walk out with a", cue: "reel.",
    body: "A page of everything you shipped, with the numbers you moved and your director's sign-off. Recruiters open it.", window: "understudy.example/maya" },
];
