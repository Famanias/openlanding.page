/** The four scenes of a run, each with its window. The last word of each title is cued. */
export type SceneKind = "lot" | "cast" | "notes" | "reel";
export type RehearsalScene = {
  id: SceneKind;
  n: string;
  act: string;
  milestone: string;
  lead: string;
  cue: string;
  body: string;
  window: string;
  directorNote: string;
};

export const SCENES: RehearsalScene[] = [
  {
    id: "lot",
    n: "Scene 1",
    act: "Act I",
    milestone: "Day 01 · First Call Time",
    lead: "Join a company that runs like a",
    cue: "real one.",
    body: "Eighteen simulated companies with real data, real customers, and a real brief on your desk on day one. No tutorial sandboxes.",
    window: "the lot · parcelpost",
    directorNote: "“You inherit an active codebase with live customer tickets. Your job is to ship solutions, not exercises.”",
  },
  {
    id: "cast",
    n: "Scene 2",
    act: "Act II",
    milestone: "Weeks 02–04 · Daily Standups",
    lead: "Run lines with your",
    cue: "cast.",
    body: "Four to six people rehearse the same company across complementary parts, handling real sprint handoffs the way a product squad does.",
    window: "#checkout-squad",
    directorNote: "“No solo heroes in production. When an address autocomplete breaks mobile conversion, engineering and design solve it in the room together.”",
  },
  {
    id: "notes",
    n: "Scene 3",
    act: "Act III",
    milestone: "Weeks 05–06 · Director Critique",
    lead: "Get notes from your",
    cue: "director.",
    body: "A senior industry director who has managed teams for a decade reviews every line, PR, and readout, holding you to hiring manager standards.",
    window: "readout.doc · 3 notes",
    directorNote: "“My job isn't to praise effort. It's to ensure your work withstands scrutiny from the toughest engineering and product VPs in the industry.”",
  },
  {
    id: "reel",
    n: "Scene 4",
    act: "Act IV",
    milestone: "Weeks 07–08 · Certified Portfolio",
    lead: "Walk out with a",
    cue: "reel.",
    body: "A verified page of everything you shipped, detailing the business numbers you moved and your director's official signed endorsement.",
    window: "understudy.example/maya",
    directorNote: "“Recruiters open reels because they prove verified execution under real pressure, not coursework.”",
  },
];

