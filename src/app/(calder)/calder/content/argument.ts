/** The four stages of the brief: the mechanic's data. Each stage is one clause of the memorandum. */
export type Clause = {
  id: string;
  /** The stage as the visitor reads it in the left-hand list. */
  stage: string;
  /** Short line under the stage name. */
  gist: string;
  /** Clause heading on the sheet. */
  heading: string;
  /** The clause body, written word by word as the page scrolls. */
  body: string;
  /** The gold margin note that slides in beside the clause. */
  note: string;
};

export const CLAUSES: Clause[] = [
  {
    id: "facts",
    stage: "Intake",
    gist: "A partner hears the whole story first.",
    heading: "Statement of facts",
    body: "You tell us what happened. We listen first, ask for the few documents that matter, and write the facts down before anyone offers an opinion.",
    note: "Your call is answered by a partner.",
  },
  {
    id: "issues",
    stage: "Analysis",
    gist: "Two or three points the matter turns on.",
    heading: "Questions presented",
    body: "We separate what the law says from what the other side hopes it says, and name the two or three points on which the whole matter will turn.",
    note: "Usually two or three issues, rarely more.",
  },
  {
    id: "position",
    stage: "Position",
    gist: "A written recommendation in plain English.",
    heading: "Recommended course",
    body: "You receive a written position: the strongest path, what it will cost, where the risk sits, and the alternatives we rejected and why.",
    note: "Fixed-fee quote included.",
  },
  {
    id: "resolution",
    stage: "Resolution",
    gist: "Negotiated if possible, tried if necessary.",
    heading: "Disposition",
    body: "We negotiate first and try the matter if we must. You hear from us the moment the picture changes, and before you have to ask.",
    note: "A status note every Friday.",
  },
];
